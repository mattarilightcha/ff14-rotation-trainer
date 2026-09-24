#!/usr/bin/env python3
# モック用のフォントを、モックで使う文字だけに絞って WOFF2 にする（日本語フォントは全部入りだと 2〜15MB あるため）。
#
# 使い方:
#   pip install fonttools brotli
#   python3 mock/fonts/build-fonts.py <元の TTF を置いたフォルダ>
# 元の TTF は Google Fonts のリポジトリ（https://github.com/google/fonts）の ofl/ から取る（下の FONTS の src）。
# 画面の文言や技の名前（mock-data.js）が増えたら作り直す。足りない文字は、端末のフォントで表示される
# （mock/package.mjs が、足りない文字があれば警告を出す）。
import pathlib
import sys

from fontTools import subset

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parents[1]

# （元のファイル名, 書き出す名前, 取り出す文字: 'all' = モックの文字すべて / 'latin' = 英数字と記号だけ）
FONTS = [
    ('ZenKakuGothicNew-Regular.ttf', 'zen-kaku-gothic-new-400.woff2', 'all'),  # ofl/zenkakugothicnew
    ('ZenKakuGothicNew-Medium.ttf', 'zen-kaku-gothic-new-500.woff2', 'all'),
    ('ZenKakuGothicNew-Bold.ttf', 'zen-kaku-gothic-new-700.woff2', 'all'),
    ('ShipporiMinchoB1-Bold.ttf', 'shippori-mincho-b1-700.woff2', 'all'),  # ofl/shipporiminchob1
    ('ShipporiMinchoB1-ExtraBold.ttf', 'shippori-mincho-b1-800.woff2', 'all'),
    ('Cinzel[wght].ttf', 'cinzel.woff2', 'latin'),  # ofl/cinzel（太さを変えられる可変フォント）
]


def mock_chars():
    """モックの文字（画面の文言・技の名前と説明文・ログ）と、よく使う記号・かなをまとめる"""
    files = [p for p in (ROOT / 'mock').glob('*.js')] + [ROOT / 'mock' / 'index.html', ROOT / 'mock' / 'mock.css']
    chars = set()
    for p in files:
        chars |= set(p.read_text(encoding='utf-8'))
    chars |= {chr(c) for c in range(0x20, 0x7F)}  # 英数字
    chars |= {chr(c) for c in range(0x3000, 0x3040)}  # 句読点・かっこ
    chars |= {chr(c) for c in range(0x3041, 0x3097)}  # ひらがな
    chars |= {chr(c) for c in range(0x30A0, 0x3100)}  # カタカナ
    chars |= {chr(c) for c in range(0xFF01, 0xFF5F)}  # 全角の英数字・記号
    chars |= set('○●◎◇◆□■△▲▽▼☆★※→←↑↓×÷±…‥―‐–—‘’“”%‰℃・〜')
    return sorted(c for c in chars if c.isprintable() and c not in '﻿')


def main():
    src = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else '.')
    chars = mock_chars()
    (HERE / 'chars.txt').write_text(''.join(chars), encoding='utf-8')
    latin = [c for c in chars if ord(c) < 0x250 or c in '…–—‘’“”·•']
    for name, out, which in FONTS:
        opts = subset.Options()
        opts.flavor = 'woff2'
        opts.layout_features = ['*']
        opts.hinting = False
        opts.name_IDs = ['*']  # 著作権表示などの名前を残す
        opts.notdef_outline = True
        font = subset.load_font(str(src / name), opts)
        s = subset.Subsetter(options=opts)
        s.populate(text=''.join(chars if which == 'all' else latin))
        s.subset(font)
        subset.save_font(font, str(HERE / out), opts)
        print(f'{out}: {(HERE / out).stat().st_size // 1024} KB')
    print(f'文字の数: {len(chars)}')


if __name__ == '__main__':
    main()
