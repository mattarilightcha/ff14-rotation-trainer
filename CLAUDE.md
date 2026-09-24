# CLAUDE.md

## 応答のルール（最優先）

- ユーザーへの応答は、**中間報告・進捗の一言・質問・最終報告を含めて、すべて日本語**で書く。
- 英語で書き始めてしまったら、その場で日本語に直す。コードの識別子・コマンド・ファイル名はそのままでよい。
- 設計書（`docs/`）とコード中のコメントも日本語で書く。

## このリポジトリについて

- FF14 のスキル回しをブラウザで練習する Web アプリ（非公式ファンツール）。最初の対象は侍 Lv100。
- 設計書: `docs/`（入口は `README.md` の表）。ゲームデータの持ち方は `docs/GAME_DATA.md`、設定ファイルの形式は `docs/CONFIG_FORMAT.md`。
- UI モック: `mock/`。`node mock/package.mjs` で `dist-mock/` を作る。`mock/**` を変更して push すると GitHub Actions（`deploy-mock.yml`）が https://nettoge.com/tools/ff14-rotation-trainer-mock/ に自動で置く。

## 守ること

- **ゲームの値を推測で埋めない。** 値はクライアント抽出データ（`src/data/ffxiv/`）か、その説明文を出典にする。どちらにもない値は「仮」と明記し、`docs/SPEC.md` §10 の TODO に載せる。
- `src/data/ffxiv/` と `public/icons/` は抽出スクリプトの出力なので手で編集しない（再抽出は FF14 クライアントのある PC で管理者が行う）。
- **公開リポジトリなので、個人情報を含むファイルをコミットしない。** FF14 の設定ファイル（`*.DAT`）は隠された中身に他のプレイヤーの名前などを含むことがある。コミット前に `node tools/cfg-diff/check-strings.mjs <ファイル>` で確認する。`UISAVE.DAT` は入れない。`FFXIV.cfg` は画面とパッドの項目だけを抜き出す。
