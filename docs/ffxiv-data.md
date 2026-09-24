# FF14 のデータとアイコンの抽出

ロテーション練習 UI が使うジョブ・アクションのデータとアイコンは、**このPCにインストールしてある FF14 クライアントのゲームデータ（sqpack）から直接読み出して**作る。
公開 API（XIVAPI など）は使わない。読み取りだけで、ゲームのファイルを書き換えたり、ゲームサーバーへ通信したりはしない。

ゲームのファイル（`sqpack` 以下）はリポジトリにコピー・コミットしない。リポジトリに入れるのは、抽出した JSON と PNG だけ。

## 使っているもの

| もの | 役目 |
|---|---|
| [.NET SDK](https://dotnet.microsoft.com/) 8 以上（このPCは 10.0） | 抽出プログラム `tools/ffxiv-extract` を動かす |
| [Lumina](https://github.com/NotAdam/Lumina)（NuGet `Lumina` 7.7.1） | sqpack の読み取り（Excel シート・テクスチャ） |
| [Lumina.Excel](https://github.com/NotAdam/Lumina)（NuGet `Lumina.Excel` 7.5.0） | Action・ClassJob などのシートの列定義 |
| Node.js 18 以上 | 点検スクリプト `tools/ffxiv-extract/verify.mjs` |

Lumina は Dalamud・FFXIV Teamcraft などが使っている読み取り専用のライブラリで、SaintCoinach の後を継ぐ位置づけのもの。
NuGet から入るので、別途インストールする物は .NET SDK だけ（初回の `dotnet run` でパッケージが入る）。
SaintCoinach は列定義の更新が止まりがちで、Python・Node の読み取りライブラリは列定義を自前で持つ必要があるため選ばなかった。

.NET SDK が無い場合: `winget install Microsoft.DotNet.SDK.8`（または 10）。

## 実行

```powershell
# 抽出 → 点検まで（既定のインストール先を読む）
powershell -ExecutionPolicy Bypass -File scripts/extract-ffxiv-data.ps1

# インストール先が違うとき（インストール先・game・sqpack のどれを渡してもよい）
powershell -ExecutionPolicy Bypass -File scripts/extract-ffxiv-data.ps1 -Game "D:\SquareEnix\FINAL FANTASY XIV - A Realm Reborn"
# または環境変数 FFXIV_GAME_PATH

# 直接
dotnet run --project tools/ffxiv-extract -c Release -- [--game <path>] [--out <repoRoot>] [--level <n>] [--no-icons]
node tools/ffxiv-extract/verify.mjs
```

既定のインストール先は `C:\Program Files (x86)\SquareEnix\FINAL FANTASY XIV - A Realm Reborn`。
パッチでクライアントが更新されたら、同じコマンドをもう一度走らせれば出力がすべて作り直される（アイコンのフォルダも作り直すので、消えたアイコンは残らない）。
ビルド後の実行は 10 秒ほど（初回はパッケージの取得とビルドが加わる）。

### パッチ後に止まったとき

`PanicOnSheetChecksumMismatch` を有効にしてあるので、Lumina.Excel の列定義がクライアントと合わなくなると
`MismatchedColumnHashException` で止まる（列がずれた値を黙って出さないため）。
その場合は `tools/ffxiv-extract/FfxivExtract.csproj` の `Lumina` / `Lumina.Excel` を新しい版に上げてから走らせ直す
（Lumina.Excel はパッチの数日後に更新されることが多い）。

新しいジョブが増えたときは、Lumina.Excel が名前を付けていない列（`Unknown0` など）でも ClassJob の行番号の順で引くので、そのまま拾える（2026-09 時点の魔獣使い BST がこれ）。

## 出力

| ファイル | 中身 | 件数（2026-09-24、ゲーム 2026.09.15） |
|---|---|---|
| `src/data/ffxiv/meta.json` | ゲームの版（ffxiv・ex1〜ex5）、抽出日時、Lumina の版、件数 | |
| `src/data/ffxiv/jobs.json` | 戦闘クラス・ジョブ（ロール、親クラス、LB、使えるアクションの id 一覧） | 32 |
| `src/data/ffxiv/actions.json` | PvE のプレイヤーアクション（ロールアクション・LB・コンボ派生・忍術などの置き換え先を含む） | 1,055 |
| `src/data/ffxiv/statuses.json` | アクションが自分に付与するステータス（＝バフ/デバフのアイコン一覧） | 184 |
| `src/data/ffxiv/job-gauges.json` | ジョブゲージの UI 画像（ジョブごとのページ一覧） | 17 ジョブ・26 枚 |
| `public/icons/actions/<アイコン番号6桁>.png` | アクションのアイコン（HD 版 80×80） | 1,014 |
| `public/icons/statuses/<アイコン番号6桁>.png` | ステータス（バフ/デバフ）のアイコン | 176 |
| `public/icons/jobs/<略称>.png` | ジョブのアイコン（`062100 + ClassJob id`） | 32 |
| `public/icons/job-gauges/<略称>/<ページ番号>.png` | ジョブゲージの UI 画像（`ui/uld/JobHud<略称>*.tex`） | 17 ジョブ・26 枚 |

JSON のアイコンの場所（`iconPath`）は `/icons/...` から始まるので、Vite の `public/` 配下としてそのまま `<img src>` に使える。
名前・説明文は `{ ja, en }` の両方を持つ。

### actions.json の主な項目

| 項目 | 元 | 意味 |
|---|---|---|
| `id` | Action の行番号 | |
| `name` / `description` | Action.Name / ActionTransient.Description | 説明文は条件式（ジョブ・レベル）を `meta.descriptionLevel`（最大レベル）とそのアクションのジョブで評価した文。色指定は捨てている |
| `icon` / `iconPath` | Action.Icon | |
| `classJob` / `jobs` | Action.ClassJob / ClassJobCategory | `jobs` は使えるクラス・ジョブの略称。ロールアクションは複数 |
| `level` | ClassJobLevel | 習得レベル |
| `category` | ActionCategory | 2 魔法 / 3 ウェポンスキル / 4 アビリティ / 9 リミットブレイク |
| `isGcd` | CooldownGroup / AdditionalCooldownGroup が 58 | GCD（共通リキャスト）に乗るか |
| `cast` / `recast` | Cast100ms / Recast100ms ÷ 10 | 秒。GCD の 2.5 秒はスキル・スペルスピード補正前 |
| `cooldownGroup` / `additionalCooldownGroup` | | 同じ番号どうしはリキャストを共有する。58 が GCD |
| `maxCharges` | MaxCharges | **シートの基本値**。特性で増えるもの（ドリルの 2 チャージなど）は反映されない。説明文には最大レベルでの数が出る |
| `comboFrom` / `comboNext` | Action.ActionCombo と、その逆引き | コンボの前後 |
| `preservesCombo` | | 間に挟んでもコンボが切れない |
| `upgradesFrom` | ClassJobActionUI.BaseAction | レベルで置き換わる元（例: 原初の魂 → フェルクリーヴ、刃風 → 暁風） |
| `replacesAction` | ActionIndirection | 条件を満たすとボタンがこれに変わる元（例: ロイエ → ゲベート） |
| `inActionList` | ClassJobActionUI に載っているか | ゲーム内のジョブのアクション一覧に出るもの。ロールアクションと青魔道士は別枠なので false |
| `primaryCost` / `secondaryCost` | Primary/SecondaryCostType・Value | `type` 3 が MP。ほかはジョブゲージ・条件（ステータス要求など）でジョブごとに意味が違うので生の値のまま |
| `statusGainSelf` / `actionProcStatus` | | 自分に付くステータス（statuses.json の id） |
| `range` / `effectRange` / `castType` / `xAxisModifier` | | 射程・効果範囲・範囲の形 |

練習 UI でジョブのアクションを並べるときは、`jobs.json` の `actionIds` から `inActionList || isRoleAction` のものを使うと、
ゲーム内の一覧と同じ顔ぶれになる（今は使えない旧アクションが Action シートに残っている場合もこれで除ける。例: 応急戦術）。

### バフ/デバフアイコンの範囲について

`statuses.json`（＝バフアイコン）は、Action シートの `StatusGainSelf`（自分に付与するステータス）と、
二次コストがステータスを指すもの（一部のジョブゲージ条件）だけを拾っている。これは「自分のロテーションで
自分に付くバフ」を機械的に集めたもので、ロテーション練習用途としては妥当な範囲。

一方、敵に付ける DoT・デバフ（例: バイオ、コンバスト、疾風脚など）は Action シート自体に「対象に付与する
ステータス」の列が無く（`StatusGainSelf` は自分向けのみ）、アクションのエフェクト定義（Excel シートでは
表現されないバイナリのタイムライン）を別途解析しないと機械的には拾えない。今回は見送っているので、
対象へのデバフのアイコンが要る場合は別途 `statuses.json` に無い ID を個別に足す必要がある。

### job-gauges.json（ジョブゲージ UI）の範囲について

`ui/uld/JobHud<略称>*.tex`（ページが無いジョブは `JobHud<略称>.tex` 単体、複数ページのジョブは
`JobHud<略称>0.tex` `JobHud<略称>1.tex` …）という命名で、23 ジョブ中 17 ジョブ分が見つかった。

見つからなかった 6 ジョブ（賢者 SGE・リーパー RPR・ヴァイパー VPR・獣使い BST・ピクトマンサー PCT・
青魔道士 BLU）は、`JobHud` 以外の命名・番号の付け方を何十通りか試しても見つからなかった。これらは
2026-09 時点でいずれも比較的新しいジョブで、ゲージ UI が個別テクスチャではなく共有パーツを組み立てる
別方式になっている可能性がある（未調査）。追加調査が要るときは `tools/ffxiv-extract/JobGaugeExporter.cs`
のコメントと、命名の探り方は git 履歴のこのコミットの前後を参照。

## 点検

`node tools/ffxiv-extract/verify.mjs` が次を確かめる。

- 参照切れが無いこと（コンボ元・置き換え元・ステータス・ジョブの actionIds）、アイコンの PNG がすべてあること
- 代表アクション 43 件・68 項目の値がゲームの仕様と合うこと（GCD か、リキャスト、詠唱、チャージ数、コンボ元。タンク・ヒーラー・メレー・レンジ・キャスター・ロールアクションから）

2026-09-24 の抽出で NG 0 件。パッチで仕様が変わった項目は、ゲーム内のツールチップを見て `verify.mjs` の期待値を直す
（例: ガンブレイカーの「ブラッドソイル」はこのクライアントでリキャスト 60 秒と出た。記憶していた値（120 秒）と違い、ゲーム内でまだ確かめていないので期待値から外してある）。

## 残っていること

- 説明文の条件式のうち、プレイヤー変数 `gnum110〜112` の意味が分からず 0 として評価している（全体で 2 か所ずつ）。`meta.json` の `unknownDescriptionParams` に件数が出る
- ジョブゲージの種類（`primaryCost.type` の 3 以外）を名前に引く表は作っていない
- ステータスの効果時間は Status シートに無い（説明文・アクションの説明文にある）ので出していない
- アイコンと文言の権利は株式会社スクウェア・エニックスにある。非公式のファンツールとして使う

(C) SQUARE ENIX CO., LTD. All Rights Reserved.
