"""公式ジョブガイド（jp / na.finalfantasyxiv.com/jobguide/）の全ジョブを取り、JSON に読み解く。

  python tools/jobguide/jobguide.py fetch   # raw/{ja,en}/<job>.html を取り直す（2 秒おき。既にあるファイルは --force で上書き）
  python tools/jobguide/jobguide.py parse   # raw → src/data/ffxiv/jobguide/{ja,en}/<job>.json と index.json

要るもの: Python 3.9+、beautifulsoup4、lxml（ページの入れ子が壊れているので html.parser では行が落ちる）。
"""
import json, os, re, sys, time, urllib.request
from datetime import datetime, timezone

from bs4 import BeautifulSoup, NavigableString

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
RAW = os.path.join(HERE, "raw")
OUT = os.path.join(ROOT, "src", "data", "ffxiv", "jobguide")

JOBS = ("battle paladin warrior darkknight gunbreaker whitemage scholar astrologian sage monk dragoon ninja "
        "samurai reaper viper bard machinist dancer blackmage summoner redmage pictomancer").split()  # リミテッドジョブ（青魔道士・魔獣使い）は入れない
HOSTS = {"ja": "jp.finalfantasyxiv.com", "en": "na.finalfantasyxiv.com"}


def url(lang, job):
    return "https://%s/jobguide/%s/" % (HOSTS[lang], job)


def fetch(force=False):
    for lang in HOSTS:
        os.makedirs(os.path.join(RAW, lang), exist_ok=True)
        for job in JOBS:
            p = os.path.join(RAW, lang, job + ".html")
            if os.path.exists(p) and not force:
                continue
            req = urllib.request.Request(url(lang, job), headers={"User-Agent": "Mozilla/5.0", "Accept-Language": lang})
            body = urllib.request.urlopen(req, timeout=60).read()
            open(p, "wb").write(body)
            print(lang, job, len(body), flush=True)
            time.sleep(2)


def text(el):
    """<br> を改行にした文字列。連続する空白は 1 つに。"""
    if el is None:
        return ""
    parts = []
    for node in el.descendants:
        if isinstance(node, NavigableString):
            parts.append(str(node))
        elif node.name == "br":
            parts.append("\n")
    s = "".join(parts)
    s = re.sub(r"[ \t\r\f\v]+", " ", s)
    s = re.sub(r" *\n *", "\n", s)
    s = re.sub(r"\n{3,}", "\n\n", s)
    return s.strip()


def inner_html(el):
    return "".join(str(c) for c in el.contents).strip() if el is not None else ""


def img(el):
    i = el.find("img") if el is not None else None
    return i.get("src") if i is not None else None


def parse_row(tr):
    row = {"rowId": tr.get("id")}
    for td in tr.find_all("td", recursive=False):
        cls = (td.get("class") or [""])[0]
        if cls == "skill":
            row["name"] = text(td.find("strong")) or text(td)
            row["icon"] = img(td)
            extra = "\n".join(l for l in text(td).split("\n") if l)
            if extra != row["name"]:
                row["skillCellText"] = extra  # 名前のほかに書き添えがあるとき（ペット名・PvP 専用など）
        elif cls == "jobclass":
            row["acquired"] = [{"class": i.get("data-tooltip"), "icon": i.get("src")} for i in td.find_all("img")]
            lv = re.search(r"Lv\s*(\d+)", td.get_text())
            row["level"] = int(lv.group(1)) if lv else None
            row["jobclassText"] = text(td)
        elif cls == "classification":
            row["type"] = text(td).replace("\n", "")
        elif cls == "cast":
            row["cast"] = text(td)
        elif cls == "recast":
            row["recast"] = text(td)
        elif cls == "cost":
            row["cost"] = text(td)
        elif cls == "distant_range":
            vals = [v.strip() for v in text(td).split("\n") if v.strip()]
            row["range"] = vals[0] if vals else None
            row["radius"] = vals[1] if len(vals) > 1 else None
        elif cls == "content":
            row["description"] = text(td)
            row["descriptionHtml"] = inner_html(td)
        else:
            row.setdefault("otherCells", []).append({"class": cls, "text": text(td), "html": inner_html(td)})
    return row


def wrapper_of(el):
    return el.find_parent("div", class_="job__content__wrapper")


def parse_page(html, lang, job):
    s = BeautifulSoup(html, "lxml")
    title = s.title.get_text(strip=True) if s.title else ""
    page = {"job": job, "lang": lang, "url": url(lang, job), "pageTitle": title}

    # ジョブの見出し（名前・ロール・説明文）
    head = s.select_one("header.job__header")
    if head is not None:
        page["header"] = {"text": text(head), "images": [i.get("src") for i in head.find_all("img")]}

    # 表の節（専用アクション・ロールアクション・特性・PvP ほか）。tr[id] のある表をすべて拾う
    sections, seen = [], set()
    for tb in s.find_all("table"):
        trs = tb.select("tr[id]")
        if not trs or id(tb) in seen:
            continue
        seen.add(id(tb))
        h = tb.find_previous(["h3", "h2"], class_=re.compile(r"job__sub_title|job__title"))
        mode = "pvp" if tb.find_parent("div", class_="js__select--pvp") is not None else "pve"
        heads = [text(th).replace("\n", "") for th in tb.select("thead th")]
        sections.append({
            "anchor": h.get("id") if h is not None else None,
            "title": text(h) if h is not None else None,
            "mode": mode,
            "columns": heads,
            "rows": [parse_row(tr) for tr in trs],
        })
    page["sections"] = sections

    # コンボ
    c = s.find(id="anchor__pve_combo")
    if c is not None:
        w = wrapper_of(c)
        combos = []
        for r in w.select("div.job__combo__root"):
            steps = []
            for st in r.find_all("div", class_=re.compile(r"job__combo__root__skill")):
                steps.append({"name": text(st), "icon": img(st)})
            combos.append({"class": " ".join(r.get("class")), "steps": steps,
                           "effect": text(r.select_one("div.job__combo__root__effect"))})
        page["combo"] = {"intro": text(w.select_one("p.job__combo__text")), "routes": combos, "allText": text(w)}

    # ジョブ HUD（ゲージの説明）
    hud = s.find(id="anchor__hud")
    if hud is not None:
        w = wrapper_of(hud)
        page["hud"] = {
            "blocks": [{"title": text(t), "images": [i.get("src") for i in
                        (t.find_next_sibling("table") or t).find_all("img")]} for t in w.select("h3.job__hud__title")],
            "allText": text(w), "allHtml": inner_html(w), "images": [i.get("src") for i in w.find_all("img")],
        }

    # 表・コンボ・HUD に入らなかった物も落とさないように、本文の節ごとの文字を全部残す
    page["contentBlocks"] = []
    for w in s.select("div.job__content__wrapper"):
        h = w.find(["h2", "h3"])
        page["contentBlocks"].append({"heading": text(h) if h else None, "anchor": (h.get("id") if h else None),
                                      "text": text(w)})
    page["pageText"] = text(s.body) if s.body else ""
    return page


def parse():
    stamp = {}
    index = {"source": "公式ジョブガイド（© SQUARE ENIX）", "hosts": HOSTS, "jobs": []}
    for lang in HOSTS:
        os.makedirs(os.path.join(OUT, lang), exist_ok=True)
        for job in JOBS:
            p = os.path.join(RAW, lang, job + ".html")
            html = open(p, encoding="utf-8").read()
            page = parse_page(html, lang, job)
            page["fetchedAt"] = datetime.fromtimestamp(os.path.getmtime(p), timezone.utc).strftime("%Y-%m-%dT%H:%MZ")
            json.dump(page, open(os.path.join(OUT, lang, job + ".json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
            counts = {"%s:%s" % (sec["mode"], sec["anchor"]): len(sec["rows"]) for sec in page["sections"]}
            stamp.setdefault(job, {})[lang] = {"title": page["pageTitle"], "fetchedAt": page["fetchedAt"], "rows": counts}
            print(lang, job, sum(counts.values()), "rows")
    index["jobs"] = [{"job": j, **stamp[j]} for j in JOBS]
    json.dump(index, open(os.path.join(OUT, "index.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)


if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else ""
    if cmd == "fetch":
        fetch(force="--force" in sys.argv)
    elif cmd == "parse":
        parse()
    else:
        print(__doc__)
