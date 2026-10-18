# ff14-rotation-trainer

FF14 のスキル回しをブラウザ上で練習するための Web アプリ（非公式ファンツール）。

> 現在は **設計段階** です。アプリのコードはまだありません。

## 設計書

| 文書 | 内容 |
|------|------|
| [docs/SPEC.md](docs/SPEC.md) | 仕様書（目的・スコープ・機能・採点・未確認ゲーム仕様の TODO 一覧） |
| [docs/GAME_DATA.md](docs/GAME_DATA.md) | ゲームデータの 2 層構成（クライアント抽出データ＋出典付き補足データ）と合成ルール |
| [docs/INPUT_HUD.md](docs/INPUT_HUD.md) | キーボード・ゲームパッド入力、FF14 設定ファイルの読み込みと HUD 配置のクローン |
| [docs/STATE_MACHINE.md](docs/STATE_MACHINE.md) | 状態遷移（セッション / GCD・ロック / コンボ / リキャスト / ゲージ / バフ / ガイド / 入力処理） |
| [docs/DATA_SCHEMA.md](docs/DATA_SCHEMA.md) | ゲームデータ・共有形式・localStorage のスキーマ |
| [docs/TEST_PLAN.md](docs/TEST_PLAN.md) | テスト計画 |
| [docs/SCREENS.md](docs/SCREENS.md) | 画面構成図（PC / スマートフォン） |
| [docs/DEV_PLAN.md](docs/DEV_PLAN.md) | 小さな Pull Request に分けた開発計画 |
| [docs/DEPLOY.md](docs/DEPLOY.md) | nettoge.com への設置（デプロイ方式・サーバー設定・ブログとの連携） |

## 最初の対象

- ジョブ: 侍 Lv100 / 戦闘時間 120 秒 / 単体木人
- モード: ガイド練習・自由練習

## データとアイコン

ジョブ・アクションのデータ（`src/data/ffxiv/*.json`）とアイコン（`public/icons/`）は、
手元の FF14 クライアントのゲームデータから抽出して作る（公開 API は使わない）。

```powershell
powershell -ExecutionPolicy Bypass -File scripts/extract-ffxiv-data.ps1
```

前提は .NET SDK 8 以上と Node.js。仕組み・出力の項目・パッチ後の更新は [docs/ffxiv-data.md](docs/ffxiv-data.md)。
抽出データにない値（ゲージ量・効果時間など）の持ち方は [docs/GAME_DATA.md](docs/GAME_DATA.md)。

## 技術構成（予定）

React / TypeScript / Vite / Vitest。バックエンドなし（localStorage のみ）。ブログ [nettoge.com](https://nettoge.com/) のサーバーに静的ファイルとして設置（[docs/DEPLOY.md](docs/DEPLOY.md)）。

## 注意

- 本ツールは非公式のファンツールであり、株式会社スクウェア・エニックスとは関係ありません。
- アイコン・名称・説明文の権利は株式会社スクウェア・エニックスにあります。

(C) SQUARE ENIX CO., LTD. All Rights Reserved.
