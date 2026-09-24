// UI モック用のデータを作る。
// 第 1 層（src/data/ffxiv/*.json）から、モックで練習できるジョブ（JOBS）の Lv100 の分を取り出し、
// mock/mock-data.js（file:// でも読めるよう window に載せる形）を書き出す。
// ジョブごとの分は MOCK_DATA.jobs[略称]、共通の分（キー・HUD の配置・画面）は MOCK_DATA の直下に置く。
// 実行: node mock/build-mock-data.mjs
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));

const actions = read('src/data/ffxiv/actions.json');
const statuses = read('src/data/ffxiv/statuses.json');
// 全件（敵へのデバフ・食事なども入る）。説明文の「」の名前が statuses.json にないとき（燕飛効果アップなど）に引く
const statusesAll = read('src/data/ffxiv/statuses-all.json');
// モックのジョブの決まり（mock/jobs.js の STATUS）に書いたステータスの名前。説明文に「」で出てこないもの（ケアルラ効果アップなど）もアイコンを引けるように
const MOCK_STATUS_NAMES = new Set([...readFileSync(new URL('./jobs.js', import.meta.url), 'utf8').matchAll(/\{ name: '([^']+)'/g)].map((m) => m[1]));
const jobs = read('src/data/ffxiv/jobs.json');
const meta = read('src/data/ffxiv/meta.json');
const jobGauges = read('src/data/ffxiv/job-gauges.json');
const CfgParse = createRequire(import.meta.url)('./cfg-parse.js');
const sample = (name) => readFileSync(join(root, 'samples/hotbar-hud', name));
const byId = new Map(actions.map((a) => [a.id, a]));

// 練習できるジョブ（略称・レベル）。増やすときはここに足し、jobs.js にジョブの決まりを書く
const JOBS = [['SAM', 100], ['PLD', 100], ['WHM', 100], ['AST', 100], ['BLM', 100], ['BRD', 100], ['SMN', 100]];

// サンプルの設定ファイルを「読み込み済み」の状態として解析する（画面の「設定ファイルを読み込む」と同じ処理）
const keybind = CfgParse.parseKeybind(sample('KEYBIND.DAT'));
const addon = CfgParse.parseAddon(sample('ADDON.DAT'));
const cfg = CfgParse.parseCfg(sample('FFXIV.cfg'));
const JOB_SETS = JOBS.map(([abbr]) => jobs.find((j) => j.abbreviation.en === abbr).id); // HOTBAR.DAT のセット番号 = ClassJob の ID（CONFIG_FORMAT §2.2）
const parsedHotbar = CfgParse.parseHotbar(sample('HOTBAR.DAT'), [0, ...JOB_SETS]);

// アクションのアイコン: ファンキット（public/fankit/battle-pve。ホットバーの枠付き）を英語名で引く。無ければ抽出したアイコン
const FANKIT_DIR = join(root, 'public/fankit/battle-pve');
const normName = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
const fankit = new Map(); // "ジョブ略称|英語名" → URL
for (const dir of readdirSync(FANKIT_DIR, { withFileTypes: true })) {
  if (!dir.isDirectory()) continue;
  const job = dir.name.split('_')[1];
  for (const sub of ['', 'Role_Actions']) {
    let files = [];
    try { files = readdirSync(join(FANKIT_DIR, dir.name, sub)); } catch { continue; }
    for (const f of files) {
      if (!f.endsWith('.png')) continue;
      const url = ['../public/fankit/battle-pve', dir.name, sub, f].filter(Boolean).map((x, i) => (i ? encodeURIComponent(x) : x)).join('/');
      fankit.set(`${job}|${normName(f.slice(0, -4))}`, url);
      if (!fankit.has(`*|${normName(f.slice(0, -4))}`)) fankit.set(`*|${normName(f.slice(0, -4))}`, url); // 他ジョブのアクション（共有バーに残っているもの）用
    }
  }
}

// 威力（説明文から。例「威力：140」「コンボ時威力：300」「背面攻撃時威力：210」「コンボ時かつ背面攻撃時威力：420」
// 「燕飛効果アップ時威力：270」「レクイエスカット時威力：700」「継続ダメージを付与する。 威力：50　効果時間：60秒」）。ダメージ計算に使う
const POS_KEYS = { コンボ: 'combo', 背面攻撃: 'rear', 側面攻撃: 'flank', コンボ時かつ背面攻撃: 'comboRear', コンボ時かつ側面攻撃: 'comboFlank' };
function parsePotency(desc) {
  const d = desc.replace(/\r?\n/g, ' / ');
  const out = {};
  const base = /(?<!時)威力：(\d+)/.exec(d);
  if (base) out.base = Number(base[1]);
  for (const m of d.matchAll(/([^\s　/：。]+?)時威力：(\d+)/g)) {
    const key = POS_KEYS[m[1]];
    if (key) out[key] = Number(m[2]);
    else (out.cond ??= []).push({ status: m[1], potency: Number(m[2]) });
  }
  const dot = /継続ダメージ[^/]*\/\s*威力：(\d+)[　 ]*効果時間：(\d+)秒/.exec(d);
  if (dot) out.dot = { potency: Number(dot[1]), sec: Number(dot[2]) };
  return Object.keys(out).length ? out : null;
}
// 与ダメージを上げるステータス（例「風月効果：自身の与ダメージを13％上昇させる」）→ { 風月: 13 }。
// 技そのものが上げるもの（「一定時間、自身の与ダメージを25％上昇させる」）は、技の名前をステータスの名前にする
function parseDamageUp(list) {
  const out = {};
  for (const a of list) {
    for (const m of a.description.ja.matchAll(/([^\s　/「」：。]+?)効果：自身の与ダメージを(\d+)％上昇/g)) out[m[1]] = Number(m[2]);
    const self = /一定時間、自身の与ダメージを(\d+)％上昇させる/.exec(a.description.ja);
    if (self) out[a.name.ja] = Number(self[1]);
  }
  return out;
}
// 効果（説明文から。ジョブの決まり jobs.js が使う）
//   grant: 「自身に（N スタックの）「X」を付与する。 / 効果時間：M秒」（前に「コンボボーナス：」があればコンボ時だけ）
//   requires: 「発動条件：「X」効果中」、cost: 「発動条件：「X」N」（N が無ければ 1。剣気・オウス・ブラッドリリー・ヒーリングリリー）
//   dmgUp: 「一定時間、自身の与ダメージをN％上昇させる。 / 効果時間：M秒」、haste: 「魔法のキャストタイムとリキャストタイムをN％短縮させる。 / 効果時間：M秒」
//   heal: 最初の「回復力：N」（「ＨＰを全回復」は full）、hot: 「継続回復する。 / 回復力：N　効果時間：M秒」、party: 自分と周囲を回復する
function parseEffects(desc) {
  const d = desc.replace(/\r?\n/g, ' / ');
  const out = {};
  const grant = [];
  for (const m of d.matchAll(/(コンボボーナス：|追加効果：)?自身に(?:(\d+)スタックの)?「([^」]+)」を付与する。(?:[\s/　]*効果時間：(\d+)秒)?/g)) {
    grant.push({ status: m[3], sec: m[4] ? Number(m[4]) : null, stacks: m[2] ? Number(m[2]) : null, combo: m[1] === 'コンボボーナス：' });
  }
  if (grant.length) out.grant = grant;
  for (const m of d.matchAll(/発動条件：「([^」]+)」(効果中|\d+)?/g)) {
    if (m[2] === '効果中') out.requires = m[1];
    else out.cost = { gauge: m[1], n: m[2] ? Number(m[2]) : 1 };
  }
  const up = /自身の与ダメージを(\d+)％上昇させる。[\s/　]*効果時間：(\d+)秒/.exec(d);
  if (up) out.dmgUp = { pct: Number(up[1]), sec: Number(up[2]) };
  const haste = /魔法のキャストタイムとリキャストタイムを(\d+)％短縮させる。[\s/　]*効果時間：(\d+)秒/.exec(d);
  if (haste) out.haste = { pct: Number(haste[1]), sec: Number(haste[2]) };
  const hot = /継続回復する。[\s/　]*回復力：(\d+)[　 ]*効果時間：(\d+)秒/.exec(d);
  if (hot) out.hot = { potency: Number(hot[1]), sec: Number(hot[2]) };
  const heal = /ＨＰを回復する。[\s/　]*回復力：(\d+)/.exec(d);
  if (heal) out.heal = Number(heal[1]);
  if (/ＨＰを全回復/.test(d)) out.heal = 'full';
  if (out.heal != null) out.party = /自身と周囲のパーティメンバー|周囲のパーティメンバーのＨＰ/.test(d);
  return Object.keys(out).length ? out : null;
}

const BAR_NAMES = [...Array(10)].map((_, i) => `hb${i + 1}`).concat([...Array(8)].map((_, i) => `xhb${i + 1}`));

// ---------------- ジョブごとのデータ ----------------
function buildJob(JOB, LEVEL) {
  const job = jobs.find((j) => j.abbreviation.en === JOB);
  const jobIds = new Set(job.actionIds);

  // 下位版 → 上位版（対象レベルで使えるもの）
  // upgradesFrom は系統の元の技を指す（サンダガもハイサンダーも「サンダー」）。同じ元を持つ技はまとめて、
  // 対象レベルで使える一番レベルの高い技に変える（サンダー・サンダガ → ハイサンダー）
  const upgrade = {};
  const lines = new Map();
  for (const a of actions) {
    if (!a.upgradesFrom || !jobIds.has(a.id) || a.level > LEVEL) continue;
    if (!lines.has(a.upgradesFrom)) lines.set(a.upgradesFrom, []);
    lines.get(a.upgradesFrom).push(a);
  }
  for (const [base, list] of lines) {
    const top = list.reduce((m, a) => (a.level > m.level ? a : m));
    upgrade[base] = top.id;
    for (const a of list) if (a.id !== top.id) upgrade[a.id] = top.id;
  }
  const resolve = (id) => {
    let cur = id;
    while (upgrade[cur]) cur = upgrade[cur];
    return cur;
  };

  // ホットバーのスロット → 表示するアクション
  const used = new Set();
  const toCell = (s) => {
    if (!s) return null;
    if (s.type === 7) return { kind: 'macro', no: s.id }; // マクロ（中身はサンプルの MACRO.DAT から。下の macros）
    if (s.type !== 1) return { kind: 'other', type: s.type };
    if (!byId.has(s.id)) return { kind: 'missing', id: s.id };
    const id = resolve(s.id);
    used.add(id);
    return { kind: 'action', id, from: id !== s.id ? s.id : undefined };
  };
  // バーごとに「ジョブ専用」と「共有（セット 0）」の両方を持つ。どちらを使うかの設定は未解読（CFG-08）なので、
  // 既定は「ジョブ専用のバーに中身があればジョブ専用、なければ共有」とし、モックの画面で切り替えられるようにする
  const JOB_SET = job.id;
  const hotbar = { job: parsedHotbar[JOB_SET] ?? {}, shared: parsedHotbar[0] ?? {} };

  // ジョブゲージ（ui/uld/JobHud*.uld）: パーツの切り出し座標・ノードの配置と、参照しているテクスチャ（アトラスのまま）
  const gaugeNames = jobGauges.jobs[JOB] ?? [];
  const gaugeTex = new Set();
  const slimNode = ({ visible, ...n }) => n; // visible はゲーム側が実行時に切り替えるため使わない（ULD では全部 false）
  const gauge = {
    names: gaugeNames,
    layouts: Object.fromEntries(gaugeNames.map((name) => {
      const L = jobGauges.layouts[name];
      for (const pl of L.partLists) for (const p of pl.parts) if (p.texture) gaugeTex.add(p.texture);
      return [name, {
        partLists: L.partLists.map((pl) => ({ id: pl.id, parts: pl.parts.map(({ texture, u, v, w, h }) => ({ texture, u, v, w, h })) })),
        components: L.components.filter((c) => c.nodes.length).map((c) => ({ id: c.id, type: c.type, nodes: c.nodes.map(slimNode) })),
        nodes: L.nodes.map(slimNode),
      }];
    })),
    textures: {},
    // 一番外側のノードの大きさ（ADDON.DAT の配置レコードを見つけるのに使う）
    sizes: Object.fromEntries(gaugeNames.map((name) => {
      const r = jobGauges.layouts[name].nodes.find((n) => n.parent === 0);
      return [name, [r.w, r.h]];
    })),
  };
  for (const k of gaugeTex) {
    const t = jobGauges.textures[k];
    gauge.textures[k] = { path: `../public${t.path}`, w: t.width, h: t.height, scale: t.scale };
  }

  const bars = {};
  for (const bar of BAR_NAMES) {
    const j = hotbar.job[bar]?.map(toCell) ?? null;
    const shared = hotbar.shared[bar]?.map(toCell) ?? null;
    if (!j && !shared) continue;
    bars[bar] = { job: j, shared, defaultSource: j ? 'job' : 'shared' };
  }

  // アクションの変化（ボタン置き換え）のグループ。「変化させない」設定（CFG-11）のときは、変化先を別のボタンにする
  const replaceGroups = {};
  for (const a of actions) {
    for (const base of a.replacesAction ?? []) {
      if (!jobIds.has(base) || a.level > LEVEL) continue;
      (replaceGroups[base] ??= []).push(a.id);
    }
  }
  if (JOB === 'SAM') for (const a of actions) if (a.id === 25782) (replaceGroups[25781] ??= []).push(a.id); // 奥義波切「このアクションを実行すると「返し波切」に変化する」
  // 召喚士: サモン・フェニックス（25831）・サモン・ソルバハムート（36992）は抽出データでは「プレイヤーのアクション」ではないが、
  // 説明文「発動条件を満たすとサモン・バハムートがサモン・フェニックス（ソルバハムート）に変化する」のとおりサモン・バハムートのボタンが変わる
  if (JOB === 'SMN') for (const id of [25831, 36992]) if (byId.get(id)?.level <= LEVEL) (replaceGroups[7427] ??= []).push(id);
  // アストラルフレア・煉獄の炎・アンブラルフレアは、データではアウトバースト（16511）の変化先。Lv74 でアウトバーストはトライディザスターに
  // なるので（説明文「発動条件を満たすとトライディザスターがアストラルフレアに変化する」）、トライディザスターの変化先にする
  if (JOB === 'SMN') for (const id of [25821, 16515, 36995]) if (byId.get(id)?.level <= LEVEL) (replaceGroups[25826] ??= []).push(id);

  // ゲーム内のアクション一覧にあるのにホットバーに置かれていないもの（INPUT_HUD §5.3「未配置」）
  const unplaced = job.actionIds
    .map((id) => byId.get(id))
    .filter((a) => a && a.inActionList && a.isPlayerAction !== false && !a.isRoleAction && a.level <= LEVEL && !upgrade[a.id] && !used.has(a.id))
    .filter((a) => !(a.replacesAction?.length) && a.category !== 9)
    .map((a) => a.id);
  for (const id of unplaced) used.add(id);
  // 召喚士: サンプルの HOTBAR.DAT は古い配置（今はないアクション）で、主な技が未配置になる。1 本目のバーの空きに未配置の技を順に置く
  if (JOB === 'SMN' && bars.hb1?.job) {
    const cells = bars.hb1.job;
    for (let i = 0; i < cells.length && unplaced.length; i++) if (!cells[i]) cells[i] = { kind: 'action', id: unplaced.shift() };
  }
  // 召喚士のペット（デミ・バハムートなど）が自動で使う技: ボタンにはしないが、威力・効果を説明文から読むためにデータへ入れる
  if (JOB === 'SMN') for (const id of [7428, 16519, 36993, 16517]) used.add(id);
  // このジョブのボタンになりうるアクション全部（読み込んだホットバーに無いものを「未配置」に出すため）
  const buttonsAll = job.actionIds
    .map((id) => byId.get(id))
    .filter((a) => a && a.inActionList && a.isPlayerAction !== false && !a.isRoleAction && a.level <= LEVEL && !upgrade[a.id])
    .filter((a) => !(a.replacesAction?.length) && a.category !== 9)
    .map((a) => a.id);
  // このジョブが使えるロールアクション（読み込んだホットバーに置かれていても表示できるように）
  for (const a of actions) if (a.isRoleAction && a.jobs?.includes(JOB) && a.level <= LEVEL && !upgrade[a.id]) used.add(a.id);

  // 置き換え先も含めて、モックで使うアクションを集める
  for (const [base, targets] of Object.entries(replaceGroups)) if (used.has(Number(base))) targets.forEach((id) => used.add(id));

  const fankitOf = (a) => fankit.get(`${JOB}|${normName(a.name.en)}`) ?? fankit.get(`*|${normName(a.name.en)}`);
  const iconOf = (a) => fankitOf(a) ?? (a.iconPath ? `../public${a.iconPath}` : null);

  const pick = (a) => ({
    id: a.id,
    name: a.name.ja,
    desc: a.description.ja,
    icon: iconOf(a), // ファンキット（枠付き）。無ければ抽出したアイコン
    iconFramed: !!fankitOf(a),
    isGcd: a.isGcd,
    castMs: Math.round(a.cast * 1000),
    recastMs: Math.round(a.recast * 1000),
    cooldownGroup: a.cooldownGroup,
    maxCharges: a.maxCharges,
    comboFrom: a.comboFrom ? [a.comboFrom, upgrade[a.comboFrom]].filter(Boolean) : [],
    preservesCombo: a.preservesCombo,
    level: a.level,
    forJob: a.jobs?.includes(JOB) ?? false, // 他ジョブのアクション（共有バーに残っているもの）は使えない
    isRole: !!a.isRoleAction,
    // 種類（2 魔法 / 3 ウェポンスキル / 4 アビリティ）。レクイエスカットの「魔法」などの判定に使う
    category: a.category,
    // 光る条件: ActionProcStatus（このステータス中に光る）。行番号と、行が指すステータス ID（再抽出後に入る）
    proc: a.actionProcStatus ?? null,
    procStatus: a.actionProcStatusId ?? null,
    // 演出用: 範囲の形（castType 1 単体 / 2 自分の周囲 / 3 前方扇 / 4 前方直線。説明文の「前方扇範囲」などと一致を確認済み）
    shape: a.castType,
    hostile: a.canTargetHostile,
    // 対象にできるもの（自分・味方）。ターゲットの決め方に使う（敵にしか使えない技は敵のターゲットが要る）
    toSelf: !!a.canTargetSelf, toParty: !!a.canTargetParty,
    // 消費 MP（Action の一次コスト。型 3 と 76 は値 × 100、型 4 は「MP 全部」= -1。黒魔道士の MP の計算に使う）
    mp: a.primaryCost?.type === 3 || a.primaryCost?.type === 76 ? a.primaryCost.value * 100 : a.primaryCost?.type === 4 ? -1 : 0,
    range: a.range,
    crit: /必ずクリティカルヒット/.test(a.description.ja), // 説明文「このアクションは必ずクリティカルヒットする」
    effectRange: a.effectRange, // 範囲の大きさ（m）。自分の周囲の範囲なら半径
    ground: !!a.targetArea, // 地面指定（先行入力されない: docs/SPEC.md GAME-05）
    // 方向指定: 説明文「背面攻撃時威力」「側面攻撃時威力」から
    positional: /背面攻撃時/.test(a.description.ja) ? 'rear' : /側面攻撃時/.test(a.description.ja) ? 'flank' : null,
    // 移動を伴う技: 説明文「対象に急接近」「N m後方へ（に）飛び退く」「自身の N m前方に向かって素早く移動」
    // 「対象の目前まで素早く移動」「黒魔紋の中心へ素早く移動」から
    dash: /対象に急接近/.test(a.description.ja),
    backstep: Number(/(\d+)m後方[へに]飛び退く/.exec(a.description.ja)?.[1] ?? 0),
    forward: Number(/自身の(\d+)m前方に向かって素早く移動/.exec(a.description.ja)?.[1] ?? 0),
    toAlly: /対象の目前まで素早く移動/.test(a.description.ja),
    toZone: /黒魔紋の中心へ素早く移動/.test(a.description.ja) ? 'ley' : null,
    pot: parsePotency(a.description.ja),
    eff: parseEffects(a.description.ja),
    replaces: a.replacesAction ?? [],
  });

  const role = { 1: 'tank', 2: 'melee', 3: 'ranged', 4: 'healer' }[job.role] ?? 'melee';
  return {
    job: { abbr: JOB, name: job.name.ja, icon: `../public${job.iconPath}`, level: LEVEL, role },
    actions: Object.fromEntries([...used].sort((a, b) => a - b).map((id) => [id, pick(byId.get(id))])),
    statuses: Object.fromEntries(
      statuses
        .filter((s) => [3856, 2959, 3855].includes(s.id))
        .map((s) => [s.id, { id: s.id, name: s.name.ja, icon: `../public${s.iconPath}` }]),
    ),
    // ステータスのアイコンを名前で引く表（再抽出で風月・風花などが statuses.json に入れば自動で使われる）。
    // 同じ名前が複数あるときは、このジョブのアクションが参照しているもの（mentionedStatuses など）を優先する
    statusIcons: (() => {
      const ref = new Set();
      const names = new Set();
      for (const a of actions) {
        if (!a.jobs?.includes(JOB)) continue;
        for (const v of [a.actionProcStatusId, a.statusGainSelf, ...(a.mentionedStatuses ?? [])]) if (v) ref.add(v);
        // コストの値がステータスを指す型だけ（二次コスト 32・46、一次コスト 10。CONFIG と GAME_DATA §2 の調査より）
        if (a.secondaryCost && [32, 46].includes(a.secondaryCost.type)) ref.add(a.secondaryCost.value);
        if (a.primaryCost && a.primaryCost.type === 10) ref.add(a.primaryCost.value);
        for (const m of a.description.ja.matchAll(/「([^」]+)」/g)) names.add(m[1]);
      }
      // ステータスのジョブ（statuses.json の jobs。抽出ツールがアクション・ClassJobCategory・同名のアクションから付ける）も使う。
      // 同じ名前が複数あるとき（PvP 用など）は、アクションが参照するもの → ID の小さいもの を選ぶ
      const out = {};
      const rank = (st) => (ref.has(st.id) ? 0 : 1) * 1e6 + st.id;
      for (const st of statuses) {
        if (!st.iconPath || /^PvP/.test(st.name.ja)) continue;
        if (!(ref.has(st.id) || names.has(st.name.ja) || st.jobs?.includes(JOB))) continue;
        const name = st.name.ja;
        if (!out[name] || rank(st) < rank(out[name].st)) out[name] = { st };
      }
      for (const st of statusesAll) {
        const name = st.name?.ja;
        if (!name || out[name] || !(names.has(name) || MOCK_STATUS_NAMES.has(name)) || !st.iconPath || /^PvP/.test(name)) continue;
        out[name] = { st };
      }
      return Object.fromEntries(Object.entries(out).map(([k, v]) => [k, v.st.maxStacks > 1 ? { icon: `../public${v.st.iconPath}`, max: v.st.maxStacks, base: v.st.icon } : `../public${v.st.iconPath}`]));
    })(),
    bars,
    gauges: { ...CfgParse.findGauges(addon.records, gauge.sizes), ...CfgParse.jobGaugeElements(addon.records, JOB, gauge.sizes) },
    gauge,
    // 与ダメージ上昇のステータス（名前 → %）。説明文から
    dmgUp: parseDamageUp(actions.filter((a) => a.jobs?.includes(JOB))),
    upgrade,
    jobSet: JOB_SET,
    buttonsAll,
    unplaced,
    replaceGroups: Object.fromEntries(Object.entries(replaceGroups).filter(([b]) => used.has(Number(b)))),
    // 変化先（本来ホットバーに登録できないアクション）がホットバーに直接置かれていたら、そのグループは「変化させない」設定と推定する（INPUT_HUD §5.4）
    splitDetected: Object.keys(replaceGroups).filter((base) =>
      Object.values(bars).some((v) => [...(v.job ?? []), ...(v.shared ?? [])].some((c) => c?.kind === 'action' && c.id !== Number(base) && replaceGroups[base].includes(c.id))),
    ),
  };
}

const jobData = Object.fromEntries(JOBS.map(([abbr, lv]) => [abbr, buildJob(abbr, lv)]));
const jobInfo = (abbr) => { const t = jobs.find((j) => j.abbreviation.en === abbr); return { abbr, name: t.name.ja, icon: `../public${t.iconPath}` }; };
const out = {
  gameVersion: meta.gameVersion.ffxiv,
  extractedAt: meta.extractedAt,
  jobList: JOBS.map(([abbr]) => ({ ...jobInfo(abbr), role: jobData[abbr].job.role })),
  jobs: jobData,
  // 練習場の相方（見た目とパーティリスト）: 自分がタンクでなければナイト、タンクなら白魔道士
  npc: { tank: jobInfo('PLD'), healer: jobInfo('WHM') },
  keybind: keybind.hotbar,
  // サンプルのマクロ（samples/hotbar-hud/MACRO.DAT）。/ac の行のアクション ID・対象・待ち時間だけ（題名や文は入れない）
  macros: (() => {
    if (!existsSync(join(root, 'samples/hotbar-hud/MACRO.DAT'))) return null;
    const jobIdSet = new Set(JOBS.flatMap(([abbr]) => jobs.find((j) => j.abbreviation.en === abbr).actionIds));
    const byName = new Map();
    for (const a of actions) if (a.name?.ja && (!byName.has(a.name.ja) || jobIdSet.has(a.id))) byName.set(a.name.ja, a.id);
    return { chr: CfgParse.parseMacro(sample('MACRO.DAT'), (n) => byName.get(n) ?? null).macros };
  })(),
  move: keybind.move, // 移動・ジャンプのキー（KEYBIND.DAT）
  camera: keybind.camera, // カメラ操作のキー（KEYBIND.DAT。修飾キー付き）
  target: keybind.target, // ターゲットのキー（KEYBIND.DAT。パーティの 1〜8 人目・次の敵など）
  hud: {
    hotbars: addon.hotbars,
    // HUD レイアウトで動かせる部品（キャストバー・ターゲット情報・パラメーターバー・ステータス情報・パーティリストなど）
    elements: CfgParse.hudElements(addon.records),
  },
  display: { width: cfg.width, height: cfg.height, mode: cfg.mode, uiScale: cfg.uiScale, uiHighScale: cfg.uiHighScale, deadArea: cfg.deadArea, pad: cfg.pad },
  // ブラウザで別の設定ファイルを読み込んだときに使う: アクション ID → [名前, 使えるジョブ（略称をカンマ区切り）]
  known: Object.fromEntries(actions.filter((a) => a.isPlayerAction !== false).map((a) => [a.id, [a.name.ja, (a.jobs ?? []).join(',')]])),
};

writeFileSync(
  join(root, 'mock/mock-data.js'),
  `// 自動生成: node mock/build-mock-data.mjs（手で編集しない）\nwindow.MOCK_DATA = ${JSON.stringify(out, null, 1)};\n`,
);
for (const [abbr, d] of Object.entries(jobData)) {
  console.log(`${abbr}: actions ${Object.keys(d.actions).length}, bars ${Object.entries(d.bars).map(([k, v]) => `${k}(${v.defaultSource})`).join(' ')}, gauges ${Object.keys(d.gauges).join(',') || 'なし'}`);
  console.log('  replaceGroups:', JSON.stringify(d.replaceGroups), 'splitDetected:', JSON.stringify(d.splitDetected));
}
