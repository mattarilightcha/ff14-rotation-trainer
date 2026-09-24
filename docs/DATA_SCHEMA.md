# DATA_SCHEMA — データスキーマ設計

- 文書ステータス: Draft v0.1
- 前提: [SPEC.md](./SPEC.md), [STATE_MACHINE.md](./STATE_MACHINE.md)

## 0. 方針

1. **ゲームデータはコードに書かない。** アクション名・数値・開幕回しはすべて `src/data/` 以下のデータファイルに置く。エンジン・UI・採点コードに特定アクションの ID や数値が現れたらテストで失敗させる（[TEST_PLAN.md](./TEST_PLAN.md) S-02）。
2. **形式は JSON。** 型は TypeScript で定義し、読み込み時に `zod` スキーマで実行時検証する（JSON は非エンジニアでも編集・レビューしやすく、共有形式とも揃えられるため）。
3. **未確認の値は `null` で表す。** 推測値を入れない。`null` を含むデータは「ドラフト」として扱い、アプリではそのジョブを選択不可（「データ未整備」表示）にする。
4. **出典と検証状態をデータに持つ。** 各ファイル・各アクションに `verification` を持ち、確認済みの値には出典（`DataSource`）を記録する。
5. **エンジン開発・テストは架空ジョブで行う。** 侍のデータ確定を待たずに実装を進めるため、明らかに架空と分かる名称・値のテスト用ジョブ（`_testjob`）を用意する。このデータはゲーム仕様を表さない。

---

## 1. ディレクトリ構成（予定）

```
src/data/
├─ schema/                     zod スキーマと型（ゲーム値を含まない）
│   ├─ job.ts
│   ├─ opener.ts
│   ├─ scoring.ts
│   └─ share.ts
├─ jobs/
│   ├─ index.ts                ジョブ一覧（ID → JSON の import）
│   ├─ sam/
│   │   └─ lv100/
│   │       ├─ job.json        アクション・ステータス・リソース・ボタン定義
│   │       ├─ scoring.json    採点プロファイル
│   │       └─ openers/
│   │           └─ *.json      開幕回し（出典ごとに 1 ファイル）
│   └─ _testjob/               テスト・開発専用の架空ジョブ（本番 UI には出さない）
│       └─ lv1/...
└─ loader.ts                   読込・検証・ドラフト判定
```

## 2. ジョブデータ（`job.json`）

### 2.1 JobData（ルート）

```ts
interface JobData {
  schemaVersion: 1;
  dataVersion: string;            // 例 "sam-lv100-draft-1"。共有 URL の互換判定に使う
  job: {
    id: string;                   // アプリ内部 ID（例 "sam"）
    nameJa: string | null;        // TODO(GAME-10)
    level: number;                // 100
  };
  gameVersion: string | null;     // 準拠するパッチ。TODO
  system: SystemParams;
  resources: ResourceDef[];
  statuses: StatusDef[];
  cooldownGroups: CooldownGroupDef[];
  actions: ActionDef[];
  buttons: ButtonDef[];
  sources: DataSource[];
  verification: Verification;
}
```

### 2.2 Action

```ts
type ActionId = string;           // アプリ内部 ID。ゲーム内名称とは独立（表示は nameJa）

interface ActionDef {
  id: ActionId;
  nameJa: string | null;          // 日本語クライアント表記。TODO(GAME-10)
  label: string;                  // 仮アイコンに表示する 1〜2 文字（アプリが決める。ゲーム仕様ではない）
  category: 'weaponskill' | 'spell' | 'ability';
  isGcd: boolean;

  // --- 時間（ms）。null = 未確認 ---
  gcdRecastMs?: number | 'useBase' | null; // GCD のみ指定（oGCD では省略）。'useBase' = system.gcdBaseMs を使う
  cooldownGroupId: string | null; // oGCD やリキャスト共有。null = GCD のみに従う
  castMs: number | null;          // 0 = 即時
  animationLockMs: number | null; // null の場合 system.animationLockMs
  speedAffects: { gcdRecast: boolean; cast: boolean; cooldown: boolean } | null; // TODO(GAME-08)

  // --- 使用条件とコスト ---
  conditions: Condition[];        // すべて満たせば使用可
  cost: ResourceDelta[];          // 使用時に消費（足りなければ使用不可）

  // --- コンボ ---
  combo: {
    from: ActionId[];             // これらの直後なら「コンボ成立」
    bypassedByStatus: string[];   // これらのステータス中はコンボ成立扱い TODO(GAME-16)
    effectsOnCombo: Effect[];     // コンボ成立時のみの追加効果
  } | null;
  startsCombo: boolean;           // コンボ始動技か
  breaksCombo: boolean;           // 使用時に既存のコンボを切るか（GCD のみ意味あり）TODO(GAME-06)

  effects: Effect[];              // 常に適用される効果（詠唱ありなら詠唱完了時）
  prepullAllowed: boolean;        // カウントダウン中に使用可能か TODO(GAME-30)
  tags: string[];                 // 採点・UI 用（例 "key"）。ゲーム仕様ではない
  verification: Verification;
}
```

### 2.3 Condition / Effect

```ts
type Target = 'self' | 'enemy';

type Condition =
  | { type: 'statusActive';   statusId: string; target: Target; minStacks?: number }
  | { type: 'statusInactive'; statusId: string; target: Target }
  | { type: 'resourceAtLeast'; resourceId: string; value: number }
  | { type: 'resourceAtMost';  resourceId: string; value: number }
  | { type: 'resourceCount';   resourceIds: string[]; op: 'eq' | 'gte'; count: number } // フラグの個数など
  | { type: 'lastActionIn';    actionIds: ActionId[] }   // 直前に実行したアクション（GCD/oGCD 問わず）
  | { type: 'lastGcdIn';       actionIds: ActionId[] }
  | { type: 'phase';           phase: 'countdown' | 'combat' };

type Effect = { when?: Condition[] } & (
  | { type: 'applyStatus';   statusId: string; target: Target; durationMs?: number; stacks?: number }
  | { type: 'removeStatus';  statusId: string; target: Target }
  | { type: 'consumeStack';  statusId: string; target: Target; count: number }
  | { type: 'gainResource';  resourceId: string; amount: number }
  | { type: 'setResource';   resourceId: string; value: number }
  | { type: 'clearResources'; resourceIds: string[] }
  | { type: 'reduceCooldown'; cooldownGroupId: string; ms: number }
  | { type: 'resetCooldown';  cooldownGroupId: string }
);

interface ResourceDelta { resourceId: string; amount: number }
```

- 条件や効果の種類が足りない場合は **型を追加する**（アクション固有の分岐をエンジンに書かない）。追加時は本書を更新する。
- 侍の仕様がこの表現で表せるかは、データ入力 PR で検証する（表せない場合は TODO(GAME-15) 等に追記して型を拡張）。

### 2.4 Status / Resource / CooldownGroup / Button

```ts
interface StatusDef {
  id: string;
  nameJa: string | null;                 // TODO(GAME-11)
  label: string;                         // 仮アイコン文字
  target: Target;
  kind: 'buff' | 'debuff' | 'dot';
  durationMs: number | null;
  maxDurationMs: number | null;          // extend 時の上限
  maxStacks: number | null;              // スタックなし = 1
  refreshMode: 'replace' | 'extend' | 'ignore' | null;
  modifiers: StatusModifier[];           // 例: GCD 短縮（ヘイスト）。TODO(GAME-03)
  verification: Verification;
}

type StatusModifier =
  | { type: 'gcdRecastMultiplier'; value: number }   // 例 0.9 → 10% 短縮（値は未確認）
  | { type: 'castMultiplier';      value: number };

interface ResourceDef {
  id: string;
  nameJa: string | null;                 // TODO(GAME-12〜14)
  label: string;
  kind: 'gauge' | 'stack' | 'flag';
  max: number | null;                    // flag は 1
  initial: number;                       // 戦闘開始時の値（通常 0）
  displayOrder: number;
  verification: Verification;
}

interface CooldownGroupDef {
  id: string;
  recastMs: number | null;               // TODO(GAME-10)
  maxCharges: number | null;             // チャージなし = 1
  verification: Verification;
}

// 画面上の 1 ボタン。状態によって実アクションが置き換わる（アイコン置き換え）
interface ButtonDef {
  id: string;
  slots: { actionId: ActionId; when: Condition[] }[]; // 上から評価し最初に条件を満たしたもの。最後は when: []
  defaultKey: string | null;             // KeyboardEvent.code（例 "Digit1"）
  group: 'gcd' | 'ogcd' | 'utility';     // レイアウト用
}
```

### 2.5 SystemParams

```ts
interface SystemParams {
  gcdBaseMs: number | null;        // TODO(GAME-01, 02)
  animationLockMs: number | null;  // TODO(GAME-04)
  castLockAfterMs: number | null;  // 詠唱完了後の追加ロック TODO(GAME-04, 07)
  queueWindowMs: number | null;    // TODO(GAME-05)
  comboWindowMs: number | null;    // TODO(GAME-06)
}
```

ユーザーは練習設定（`PracticeConfig.timing`）で `gcdBaseMs` / `animationLockMs` / `queueWindowMs` を上書きできる。上書きした試行は結果に明記する。

### 2.6 開幕回し（`openers/*.json`）

```ts
interface OpenerDefinition {
  schemaVersion: 1;
  id: string;
  jobId: string;
  level: number;
  dataVersion: string;             // 対応する job.json の dataVersion
  nameJa: string;
  description: string;
  prepull: { buttonId: string; atMs: number }[];  // atMs は負（カウントダウン中）TODO(GAME-30)
  steps: { actionId: ActionId; note?: string }[]; // 戦闘開始後の順序 TODO(GAME-31)
  source: DataSource | null;
  verification: Verification;
}
```

- お手本時刻は保持しない。エンジンで最速入力をシミュレーションして算出する（[SPEC.md §8.1](./SPEC.md#81-生成)）。
- ユーザー作成の開幕回しも同じ型で localStorage に保存する（`source: null`, `verification.status: 'user'`）。

### 2.7 出典と検証状態

```ts
interface DataSource {
  id: string;
  title: string;
  url: string | null;
  publisher: 'official' | 'community' | 'self';
  gameVersion: string | null;      // 準拠パッチ
  accessedAt: string;              // ISO 日付
  note?: string;
}

interface Verification {
  status: 'unverified' | 'verified' | 'placeholder' | 'user';
  sourceIds: string[];             // DataSource.id
  todo: string[];                  // 例 ["GAME-10"]
  verifiedAt?: string;
}
```

| status | 意味 | 本番 UI での扱い |
|--------|------|-----------------|
| `unverified` | 値が未確認（`null` を含みうる） | ジョブ選択不可「データ未整備」 |
| `verified` | 出典付きで確認済み | 利用可 |
| `placeholder` | 架空値（テストジョブ専用） | 本番では非表示。開発ビルドのみ表示 |
| `user` | ユーザー作成 | 利用可。「ユーザー作成」バッジ |

`loader.ts` はジョブ単位で「全エントリが `verified` かつ `null` なし」を満たす場合のみ `JobData`（厳密型）へ変換する。満たさない場合は不足項目の一覧（TODO ID 付き）を返し、`Setup` 画面で表示する。

## 3. 採点プロファイル（`scoring.json`）

採点の **ポリシー**（ゲーム仕様ではない）を定義する。

```ts
type MetricId =
  | 'gcdUptime' | 'sequence' | 'comboBreaks' | 'clipping'
  | 'statusUptime' | 'overcap' | 'keyActions' | 'openerDeviation';

interface ScoringProfile {
  schemaVersion: 1;
  id: string;
  jobId: string;
  weights: Record<MetricId, number>;          // 合計は任意（正規化する）
  trackedStatuses: { statusId: string; target: Target; graceMs: number }[];
  keyActions: { actionId: ActionId; expectedCount: number | null }[]; // null = リキャストから理論最大を算出 TODO(GAME-41)
  thresholds: {
    clipMsToScore: { maxMs: number; score: number }[];   // 段階テーブル DESIGN-01
    idleMsToScore: { maxMs: number; score: number }[];
    comboBreakPenalty: number;
    weaveWarnCount: number;                  // GCD 間の oGCD 数がこれ以上で警告
    earlyRefreshWarnMs: number;
    chargesCappedGraceMs: number;
    countIdleBeforeFirstGcd: boolean;
  };
  ranks: { minScore: number; label: string }[];
}
```

## 4. ランタイム型（エンジン内部）

```ts
interface SimState {
  t: number;
  phase: 'countdown' | 'combat' | 'ended';
  gcd: { readyAt: number; lastStartAt: number | null; lastRecastMs: number };
  lock: { until: number; kind: 'none' | 'animation' | 'cast'; causedBy: 'gcd' | 'ogcd' | null; castingActionId: ActionId | null };
  ogcdLockEndSinceLastGcd: number | null;   // クリップ判定用（STATE_MACHINE §3.1.1）
  weavesSinceLastGcd: number;
  combo: { lastComboActionId: ActionId | null; expiresAt: number | null };
  lastActionId: ActionId | null;
  lastGcdId: ActionId | null;
  cooldowns: Record<string, { charges: number; maxCharges: number; nextChargeAt: number | null }>;
  resources: Record<string, number>;
  statuses: Record<string, { target: Target; expiresAt: number; stacks: number }>; // key = `${target}:${statusId}`
  queue: { buttonId: string; inputAt: number } | null;
  pendingEffects: { at: number; actionId: ActionId; effects: Effect[] } | null;
  guide: { stepIndex: number; blocked: boolean } | null;
  events: SimEvent[];
}

type InputLogEntry = { t: number; buttonId: string };  // 入力ログはボタン単位（置き換え解決は再シミュレーションで再現）
```

- `SimState` はシリアライズ可能なプレーンオブジェクトに限定する（`Map` / クラス不使用）。
- エンジンは `ResolvedJobData`（`null` を含まない厳密型、`PracticeConfig.timing` の上書き適用済み）のみを受け取る。

## 5. 共有フォーマット

### 5.1 PracticeConfig（練習設定）

```ts
interface PracticeConfig {
  v: 1;
  jobId: string;
  level: number;
  dataVersion: string;
  mode: 'guide' | 'free';
  durationSec: number;                  // 既定 120、範囲 30〜600
  openerId: string | null;              // 同梱の開幕回し
  customOpener?: OpenerDefinition;      // ユーザー作成の開幕回しを埋め込む場合
  guide: {
    onWrong: 'block' | 'continue';
    lookahead: number;                  // 再同期の先読み手数
    previewCount: number;
    speed: 0.5 | 0.75 | 1;
  };
  timing: {                             // ユーザー上書き（未指定はデータ既定値）
    gcdBaseMs?: number;
    animationLockMs?: number;
    queueWindowMs?: number;
  };
  scoringProfileId: string;
}
```

### 5.2 SharePayload

```ts
type SharePayload =
  | { kind: 'config'; config: PracticeConfig }
  | {
      kind: 'replay';
      config: PracticeConfig;
      buttons: string[];                // 入力ログで使うボタン ID の辞書
      log: [number, number][];          // [前入力からの経過 ms, buttons のインデックス]（差分符号化）
      summary?: { total: number; metrics: Partial<Record<MetricId, number>> }; // 表示用。受信側では再計算値を正とする
    };
```

### 5.3 URL 形式

```
https://<owner>.github.io/ff14-rotation-trainer/#/share?d=<encoded>
```

- `encoded` = `z.` + base64url(deflate-raw(UTF-8 JSON))。`CompressionStream` 非対応環境では `j.` + base64url(JSON)。
- ハッシュ部に置くため、共有内容はサーバーに送信されない（GitHub Pages のアクセスログにも残らない）。
- URL 長の目安: 設定のみ < 500 文字、リプレイ付き < 8,000 文字。超える場合は JSON ファイルでの共有を案内。

### 5.4 JSON ファイル形式

```json
{
  "format": "ff14-rotation-trainer/share",
  "version": 1,
  "payload": { "kind": "config", "config": { "...": "..." } }
}
```

### 5.5 読み込み時の検証（信頼しない入力として扱う）

- `zod` で厳密に検証。未知のプロパティは破棄。
- サイズ上限: デコード後 64KB、ログ 5,000 件、`customOpener.steps` 500 件。
- `dataVersion` が現在のデータと異なる場合: 設定は読み込むが「データ版が異なるため結果が変わる可能性」を警告。リプレイは再生せず結果のみ表示可否を選ばせる。
- 表示は必ずテキストとして描画し、HTML として解釈しない（`dangerouslySetInnerHTML` 禁止）。

## 6. localStorage スキーマ

| キー | 内容 | 上限 |
|------|------|------|
| `ff14rt:meta` | `{ schemaVersion: 1 }` | — |
| `ff14rt:v1:settings` | 表示設定（テーマ、ミス理由表示、音、`prefers-reduced-motion` 上書き） | — |
| `ff14rt:v1:lastConfig` | 最後に使った `PracticeConfig` | — |
| `ff14rt:v1:keybinds:<jobId>` | `Record<buttonId, KeyboardEvent.code>` | — |
| `ff14rt:v1:history:<jobId>` | 試行結果の配列（新しい順） | 50 件（超過分は古いものから削除） |
| `ff14rt:v1:customOpeners:<jobId>` | `OpenerDefinition[]`（status `user`） | 20 件 |

```ts
interface HistoryEntry {
  id: string;                     // crypto.randomUUID()
  at: string;                     // ISO
  config: PracticeConfig;
  total: number;
  metrics: Record<MetricId, number>;
  flags: { paused: boolean; timingOverridden: boolean; speed: number };
  replay?: SharePayload;          // 自己ベストのみ保持（容量節約）
}
```

- すべての読み書きは `storage.ts` 経由。`try/catch` で失敗（容量超過・プライベートモード）を握りつぶさずに UI へ通知し、アプリはメモリ上で動作継続。
- 読み込み時に `zod` 検証。失敗したキーは `ff14rt:backup:<key>:<timestamp>` に退避して初期化。
- `schemaVersion` が上がる場合は `migrations[from]` 関数で逐次移行する。

## 7. 未確定事項（本書由来）

| ID | 内容 |
|----|------|
| GAME-08 | `speedAffects` の各フラグ（どのアクションのどの時間がスキルスピード/ヘイストの影響を受けるか） |
| GAME-15 | 侍のアイコン置き換えを `ButtonDef.slots` で表現しきれるか |
| GAME-41 | `keyActions.expectedCount` の値、または理論最大算出の条件 |
| SCHEMA-01 | Condition / Effect の型が侍の全仕様を表せるか（データ入力 PR で検証） |
