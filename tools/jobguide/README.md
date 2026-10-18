# 公式ジョブガイドのダンプ

公式サイトのジョブガイド（日本語 `jp.finalfantasyxiv.com/jobguide/<job>/`・英語 `na.finalfantasyxiv.com/jobguide/<job>/`）を、バトルジョブ 21 種＋バトルの入口ページ（`battle`）について丸ごと取ったもの。
リミテッドジョブ（青魔道士・魔獣使い）は入れていない。取得日は 2026-10-18（日本語版は 9/21 に取った物と同じ中身で、それ以降の更新は無い）。

ゲームデータ（`src/data/ffxiv/actions.json` ほか）に無い物 ── 公式の説明文そのまま・特性の文・コンボの道筋と狙い・ジョブ HUD の説明・PvP のアクション ── を確かめるときに使う。

## 中身

| 場所 | 中身 |
|---|---|
| `tools/jobguide/raw/{ja,en}/<job>.html` | 取ったページそのまま |
| `src/data/ffxiv/jobguide/{ja,en}/<job>.json` | 読み解いた物（下） |
| `src/data/ffxiv/jobguide/index.json` | ジョブごとの表の行数・取得時刻 |

`<job>.json` の形:

- `sections[]` … 表 1 つが 1 件。`mode`（`pve`／`pvp`）、`anchor`（`anchor__onlyaction` 専用アクション・`anchor__rollcommonaction` ロールアクション・`anchor__onlytrait` 特性・`anchor__rollcommontrait` ロール特性・`anchor__pvp_onlyaction`・`anchor__pvp_limitbreak`・`anchor__pvp_commononlyaction`・`anchor__pvp_roleaction`）、`columns`（表の見出し）、`rows[]`
- `rows[]` … `rowId`（`pve_action__01`・`trait_action__01`・`pvp_action__01` など。日本語版と英語版で同じ ID が同じ行）、`name`、`icon`、`level`、`acquired`（修得するクラス・ジョブ）、`skillCellText`（名前の下の書き添え。「ジョブクエスト」「クラスクエスト」など）、`type`（ウェポンスキル・魔法・アビリティ）、`cast`、`recast`、`cost`、`range`（射程）、`radius`（範囲）、`description`（`<br>` を改行にした文）、`descriptionHtml`（色付きの文字などを含む元の HTML）
- `combo` … `routes[].steps[]`（技の名前とアイコン。括弧は特性を覚える前の技）と `effect`、`intro`、`allText`
- `hud` … ジョブ HUD の説明。`blocks[]`（見出しと絵）、`allText`、`allHtml`、`images`
- `contentBlocks[]` … 節ごとの全文（表・コンボ・HUD に入らなかった物の取りこぼし防止）
- `pageText` … ページ全体の文字

## 取り直す

```bash
pip install beautifulsoup4 lxml
python tools/jobguide/jobguide.py fetch --force   # 2 秒おきに 44 枚
python tools/jobguide/jobguide.py parse
```

ページの入れ子が壊れている（閉じ `</div>` が多い）ので、`html.parser` では表の行が落ちる。必ず `lxml` で読む。

文章・アイコンの権利は © SQUARE ENIX。
