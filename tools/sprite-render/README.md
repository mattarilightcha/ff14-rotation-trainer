# sprite-render

3D モデル + アニメを、**4方向スプライトシート**（`public/sprites/<id>/sheet.png` + `manifest.json`）に変換するパイプライン。

```
モデル(GLB/FBX) + アニメ ──render_sprites.py──▶ 連番PNG ──pack_sheets.py──▶ シート + manifest
```

## セットアップ

```bash
python3.11 -m venv venv && venv/bin/pip install -r requirements.txt   # bpy = Blender 本体(pip版)
```

- GPU なしで動く（Cycles CPU）。EEVEE/Workbench は GPU が要るので使わない。
- Blender 本体でも可: `blender -b -P render_sprites.py -- --config ...`

## 動作確認（仮モデル）

```bash
venv/bin/python make_test_model.py --out models/knight        # 仮キャラ: idle / attack
cp characters.example.json characters.json
venv/bin/python render_sprites.py --config characters.json     # → out/frames/
venv/bin/python pack_sheets.py --frames out/frames --out ../../public/sprites
# ドット絵風: pack_sheets.py に --pixelate 3 --colors 24 を追加
```

## 本番キャラの作り方

### 人型（全ジョブ）
1. **VRoid Studio** でベース体型を作る（髪・服は簡素に。体型は 2〜3 種で足りる）
2. VRM → Blender（VRM アドオン）→ FBX 書き出し
3. **Mixamo** にアップロード（自動リグ）→ アニメを **"With Skin" / "In Place" ON** で FBX ダウンロード
   - 最低限: `idle` `walk` `attack`（近接/遠距離/詠唱の 3 系統）`hit` `die`
4. `characters.json` にアニメ FBX を登録して実行

### ジョブの差別化（32 ジョブ分を作りすぎない）
- **ベース体型 × 色替え（`colors`）× 武器**で量産。体型 2〜3 種 + ジョブ別の色・武器
- 武器はアニメの手のボーンに付ける（今後、`render_sprites.py` に追加予定）

### 人型でないもの（バハムート等の召喚獣、機工士のロボ）
- Mixamo は人型専用なので使えない。
- ロボが人型なら Mixamo でそのまま可。
- ドラゴン等は、**アニメ付きの CC0 モデル**（Quaternius / Kenney など）を GLB で使うか、Blender で簡易アニメを自作。
- 出力形式は同じ（`characters.json` に GLB を並べるだけ）。

## 設定（characters.json）

| キー | 意味 |
|---|---|
| `size` | 1フレームの px（正方形） |
| `fps` / `source_fps` | 出力 fps（12 前後が自然）/ 元アニメの fps（Mixamo は 30） |
| `camera_elevation` | カメラ仰角（度）。30 前後がRPG風 |
| `outline` | 輪郭線（Freestyle） |
| キャラ `height` | 正規化後の身長 [m]。召喚獣は大きくする |
| キャラ `colors` | `{"マテリアル名の一部": [r,g,b]}` で色替え |
| キャラ `facing_offset_deg` | モデルが正面(-Y)以外を向くときの補正 |
| アニメ `loop` | ループ（idle/walk）か、1回きり（attack） |

## 注意
- **FF14 のゲームモデルは使わない**（スクエニの素材利用ガイドライン上リスクが高いため）。キャラは自作/フリー素材で、ジョブは服装・武器・色で表現する。
- VRoid モデルは利用規約を確認。Mixamo のアニメは商用利用可（再配布は不可なので、配るのはレンダリング済みスプライトのみ）。
- `models/` `out/` `venv/` は git 管理外。
