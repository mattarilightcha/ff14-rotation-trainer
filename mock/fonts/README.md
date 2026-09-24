# モックのフォント

画面の文字に使うフォント。どれも SIL Open Font License 1.1（予約フォント名の指定なし）で、モックで使う文字だけに絞った WOFF2 を置いている（`build-fonts.py` で作成）。

| ファイル | フォント | 使う所 | 出典 |
|---------|---------|-------|------|
| `zen-kaku-gothic-new-400/500/700.woff2` | Zen Kaku Gothic New | 画面の文字（ログ・設定・HUD の文言） | https://github.com/googlefonts/zen-kakugothic（Google Fonts の `ofl/zenkakugothicnew`） |
| `shippori-mincho-b1-700/800.woff2` | しっぽり明朝 B1 | 見出し・フライテキストの日本語・ランク | https://github.com/fontdasu/ShipporiMincho（`ofl/shipporiminchob1`） |
| `cinzel.woff2` | Cinzel（可変） | 見出し・フライテキストの英数字 | https://github.com/NDISCOVER/Cinzel（`ofl/cinzel`） |

- ライセンス文: `OFL-*.txt`。
- 取り出した文字の一覧: `chars.txt`（`mock/*.js`・`index.html`・`mock.css` の文字＋かな・記号）。技の名前や画面の文言が増えたら `python3 mock/fonts/build-fonts.py <元の TTF のフォルダ>` で作り直す。足りない文字は端末のフォントで表示される（`mock/package.mjs` が警告する）。
