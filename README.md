# ff14-rotation-trainer

FF14 のスキル回しをブラウザ上で練習するための Web アプリ（非公式ファンツール）。

## データとアイコン

ジョブ・アクションのデータ（`src/data/ffxiv/*.json`）とアイコン（`public/icons/`）は、
手元の FF14 クライアントのゲームデータから抽出して作る（公開 API は使わない）。

```powershell
powershell -ExecutionPolicy Bypass -File scripts/extract-ffxiv-data.ps1
```

前提は .NET SDK 8 以上と Node.js。仕組み・出力の項目・パッチ後の更新は [docs/ffxiv-data.md](docs/ffxiv-data.md)。
