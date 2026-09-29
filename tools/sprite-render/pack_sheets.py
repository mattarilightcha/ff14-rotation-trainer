"""render_sprites.py の連番 PNG を、キャラごとのスプライトシート + manifest.json にまとめる。

    python pack_sheets.py --frames out/frames --out ../../public/sprites [--pixelate 2] [--colors 32]

シート構成: 1行 = 1アニメ × 1方向、列 = フレーム。行順は manifest の rows を参照。
--pixelate N : 1/N に縮小してから最近傍で N 倍に戻す（ドット絵風。N=1 で無効）
--colors  K  : パレットを K 色に減色（ドット絵風。0 で無効）
"""
from __future__ import annotations

import argparse
import json
from pathlib import Path

from PIL import Image

DIRECTIONS = ["down", "left", "right", "up"]


def stylize(img: Image.Image, pixelate: int, colors: int) -> Image.Image:
    if pixelate > 1:
        w, h = img.size
        img = img.resize((w // pixelate, h // pixelate), Image.BOX)
        # 半透明のフチを消してドットをくっきりさせる
        a = img.getchannel("A").point(lambda v: 255 if v >= 128 else 0)
        img.putalpha(a)
        img = img.resize((w, h), Image.NEAREST)
    if colors > 0:
        a = img.getchannel("A")
        q = img.convert("RGB").quantize(colors=colors, method=Image.MEDIANCUT, dither=Image.NONE).convert("RGB")
        img = q.convert("RGBA")
        img.putalpha(a)
    return img


def pack_character(cdir: Path, out_root: Path, pixelate: int, colors: int) -> None:
    info = json.loads((cdir / "render-info.json").read_text(encoding="utf-8"))
    anims = info["animations"]
    sample = next(cdir.glob("*/down_000.png"))
    fw, fh = Image.open(sample).size
    cols = max(a["frames"] for a in anims.values())
    rows, manifest_anims = [], {}
    for aname, a in anims.items():
        manifest_anims[aname] = {"frames": a["frames"], "loop": a["loop"], "rows": {}}
        for d in DIRECTIONS:
            manifest_anims[aname]["rows"][d] = len(rows)
            rows.append((aname, d, a["frames"]))
    sheet = Image.new("RGBA", (fw * cols, fh * len(rows)), (0, 0, 0, 0))
    for r, (aname, d, n) in enumerate(rows):
        for i in range(n):
            frame = Image.open(cdir / aname / f"{d}_{i:03d}.png").convert("RGBA")
            sheet.paste(stylize(frame, pixelate, colors), (i * fw, r * fh))
    dest = out_root / cdir.name
    dest.mkdir(parents=True, exist_ok=True)
    sheet.save(dest / "sheet.png", optimize=True)
    manifest = {"frameWidth": fw, "frameHeight": fh, "height": info["height"],
                "sheet": "sheet.png", "animations": manifest_anims}
    (dest / "manifest.json").write_text(json.dumps(manifest, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"[pack] {cdir.name}: {sheet.size[0]}x{sheet.size[1]} -> {dest}")


def main() -> None:
    p = argparse.ArgumentParser()
    p.add_argument("--frames", default="out/frames")
    p.add_argument("--out", default="../../public/sprites")
    p.add_argument("--pixelate", type=int, default=1)
    p.add_argument("--colors", type=int, default=0)
    a = p.parse_args()
    for cdir in sorted(Path(a.frames).iterdir()):
        if (cdir / "render-info.json").exists():
            pack_character(cdir, Path(a.out), a.pixelate, a.colors)


if __name__ == "__main__":
    main()
