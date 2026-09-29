# キャラスプライト制作手順（3D → 4方向スプライト）

ツール本体は `tools/sprite-render/`。ここは **手元でやる作業の手順書**。

## 全体の流れ

```
VRoid でキャラ作成 → Blender で FBX 化 → Mixamo でアニメ付与
  → characters.json に登録 → render_sprites.py → pack_sheets.py
  → public/sprites/<id>/sheet.png + manifest.json
```

## 0. 準備（1回だけ）

- Python 3.11 を用意する
- Blender 本体は不要（`pip install bpy` で入る）
- 入れるもの: [VRoid Studio](https://vroid.com/studio)（無料）、[Blender](https://www.blender.org/)（VRM 変換用）、Adobe アカウント（Mixamo 用・無料）

```bash
cd tools/sprite-render
python3.11 -m venv venv
venv/bin/pip install -r requirements.txt
```

動作確認（仮モデルで一通り動くか）:

```bash
venv/bin/python make_test_model.py --out models/knight
cp characters.example.json characters.json
venv/bin/python render_sprites.py --config characters.json
venv/bin/python pack_sheets.py --frames out/frames --out ../../public/sprites
```

## 1. ベース体型を作る（VRoid）

- **体型は 2〜3 種で足りる**（例: 標準 / 大柄 / 小柄）。全ジョブ分は作らない
- 服・髪は簡素にする（Mixamo のリグが安定し、色替えもしやすい）
- VRM で書き出す。利用条件（商用可など）を確認しておく

## 2. VRM → FBX（Blender）

1. Blender に [VRM アドオン](https://vrm-addon-for-blender.info/) を入れる
2. VRM をインポート
3. FBX で書き出す（テクスチャは埋め込み）

## 3. アニメを付ける（Mixamo）

1. [mixamo.com](https://www.mixamo.com/) に FBX をアップロード（自動リグ）
2. 下の一覧のアニメを選んでダウンロード
3. 設定は毎回これ:
   - Format: **FBX Binary (.fbx)**
   - Skin: **With Skin**
   - FPS: **30**
   - **In Place: ON**（ONにしないと歩いて画面外に出る）
4. `tools/sprite-render/models/<キャラID>/` に置く

### 最低限そろえるアニメ

| 名前 | 用途 | ループ |
|---|---|---|
| `idle` | 待機 | ○ |
| `walk` | 移動 | ○ |
| `attack_melee` | 近接攻撃（斬る・殴る） | × |
| `attack_ranged` | 弓・銃 | × |
| `cast` | 詠唱・魔法 | × |
| `hit` | 被ダメージ | × |
| `die` | 戦闘不能 | × |

ジョブごとに使う攻撃モーション（近接 / 遠距離 / 詠唱）を決めて割り当てる。

## 4. characters.json に登録する

`characters.example.json` をコピーして編集する。

```json
{
  "size": 128,
  "fps": 12,
  "characters": {
    "pld": {
      "dir": "models/body_standard",
      "height": 1.8,
      "colors": { "Armor": [0.2, 0.35, 0.8] },
      "animations": {
        "idle":   { "file": "idle.fbx",   "loop": true },
        "attack": { "file": "attack_melee.fbx", "loop": false }
      }
    }
  }
}
```

- 同じ `dir` のキャラを複数書けば、`colors` を変えて量産できる
- 召喚獣は `height` を大きくする（例: バハムート `6.0`）

## 5. レンダリング → シート化

```bash
venv/bin/python render_sprites.py --config characters.json --character pld   # 1体だけ
venv/bin/python render_sprites.py --config characters.json                   # 全員
venv/bin/python pack_sheets.py --frames out/frames --out ../../public/sprites
```

ドット絵風にしたい場合:

```bash
venv/bin/python pack_sheets.py --frames out/frames --out ../../public/sprites --pixelate 3 --colors 24
```

- 出力は 4 方向（`down` `left` `right` `up`）
- `manifest.json` の `animations.<名前>.rows.<方向>` が、シート上の行番号

## 6. 人型でないキャラ

| キャラ | 方法 |
|---|---|
| 機工士のロボ | 人型なら Mixamo で通常どおり |
| バハムート等の召喚獣 | Mixamo は不可。アニメ付き CC0 モデル（Quaternius / Kenney など）を GLB で取得するか、Blender で自作 |

`characters.json` には GLB/FBX を並べるだけで、以降は同じ手順。

## 7. うまくいかないとき

| 症状 | 対処 |
|---|---|
| 向きが逆・横向きになる | キャラの `facing_offset_deg` を `90` / `180` / `-90` で調整 |
| キャラが小さい・切れる | `height` を調整、または `frame_margin`（既定 1.45）を変更 |
| 歩いて枠から出る | Mixamo で In Place をONにして落とし直す |
| 色替えが効かない | `colors` のキーがマテリアル名に含まれているか確認（Principled BSDF のみ対応。VRoid のテクスチャ服は効かない場合あり） |
| 線がガタつく | `size` を上げる、または `outline_thickness` を調整 |
| 遅い | `samples` を下げる（既定 16）、`--max-frames 1` で確認 |

## 8. 注意

- **FF14 のゲームモデルは使わない**。ジョブは服装・武器・色で表現する
- Mixamo のアニメは商用利用可だが再配布は不可。配るのはレンダリング済みスプライトだけにする
- `models/` `out/` `venv/` `characters.json` は git 管理外

## 未実装（今後）

- 武器をボーンに付ける機能
- ゲーム側でのシート再生
