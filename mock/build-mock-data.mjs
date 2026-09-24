// UI モック用のデータを作る。
// 第 1 層（src/data/ffxiv/*.json）から侍 Lv100 の分だけを取り出し、
// mock/mock-data.js（file:// でも読めるよう window に載せる形）を書き出す。
// 実行: node mock/build-mock-data.mjs
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));

const actions = read('src/data/ffxiv/actions.json');
const statuses = read('src/data/ffxiv/statuses.json');
const jobs = read('src/data/ffxiv/jobs.json');
const meta = read('src/data/ffxiv/meta.json');
const jobGauges = read('src/data/ffxiv/job-gauges.json');
const CfgParse = createRequire(import.meta.url)('./cfg-parse.js');
const sample = (name) => readFileSync(join(root, 'samples/hotbar-hud', name));

const JOB = 'SAM';
const LEVEL = 100;
const job = jobs.find((j) => j.abbreviation.en === JOB);
const byId = new Map(actions.map((a) => [a.id, a]));
const jobIds = new Set(job.actionIds);

// 下位版 → 上位版（対象レベルで使えるもの）
const upgrade = {};
for (const a of actions) {
  if (a.upgradesFrom && jobIds.has(a.id) && a.level <= LEVEL) upgrade[a.upgradesFrom] = a.id;
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
  if (s.type !== 1) return { kind: 'other', type: s.type };
  if (!byId.has(s.id)) return { kind: 'missing', id: s.id };
  const id = resolve(s.id);
  used.add(id);
  return { kind: 'action', id, from: id !== s.id ? s.id : undefined };
};
const BAR_NAMES = [...Array(10)].map((_, i) => `hb${i + 1}`).concat([...Array(8)].map((_, i) => `xhb${i + 1}`));
// バーごとに「ジョブ専用」と「共有（セット 0）」の両方を持つ。どちらを使うかの設定は未解読（CFG-08）なので、
// 既定は「ジョブ専用のバーに中身があればジョブ専用、なければ共有」とし、モックの画面で切り替えられるようにする
// サンプルの設定ファイルを「読み込み済み」の状態として解析する（画面の「設定ファイルを読み込む」と同じ処理）
const JOB_SET = job.id; // HOTBAR.DAT のセット番号 = ClassJob の ID（CONFIG_FORMAT §2.2）
const parsedHotbar = CfgParse.parseHotbar(sample('HOTBAR.DAT'), [0, JOB_SET]);
const hotbar = { job: parsedHotbar[JOB_SET] ?? {}, shared: parsedHotbar[0] ?? {} };
const keybind = CfgParse.parseKeybind(sample('KEYBIND.DAT'));
const addon = CfgParse.parseAddon(sample('ADDON.DAT'));
const cfg = CfgParse.parseCfg(sample('FFXIV.cfg'));

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
  const job = hotbar.job[bar]?.map(toCell) ?? null;
  const shared = hotbar.shared[bar]?.map(toCell) ?? null;
  if (!job && !shared) continue;
  bars[bar] = { job, shared, defaultSource: job ? 'job' : 'shared' };
}

// アクションの変化（ボタン置き換え）のグループ。「変化させない」設定（CFG-11）のときは、変化先を別のボタンにする
const replaceGroups = {};
for (const a of actions) {
  for (const base of a.replacesAction ?? []) {
    if (!jobIds.has(base) || a.level > LEVEL) continue;
    (replaceGroups[base] ??= []).push(a.id);
  }
}
for (const a of actions) if (a.id === 25782) (replaceGroups[25781] ??= []).push(a.id); // 奥義波切「このアクションを実行すると「返し波切」に変化する」

// ゲーム内のアクション一覧にあるのにホットバーに置かれていないもの（INPUT_HUD §5.3「未配置」）
const unplaced = job.actionIds
  .map((id) => byId.get(id))
  .filter((a) => a && a.inActionList && !a.isRoleAction && a.level <= LEVEL && !upgrade[a.id] && !used.has(a.id))
  .filter((a) => !(a.replacesAction?.length) && a.category !== 9)
  .map((a) => a.id);
for (const id of unplaced) used.add(id);
// このジョブのボタンになりうるアクション全部（読み込んだホットバーに無いものを「未配置」に出すため）
const buttonsAll = job.actionIds
  .map((id) => byId.get(id))
  .filter((a) => a && a.inActionList && !a.isRoleAction && a.level <= LEVEL && !upgrade[a.id])
  .filter((a) => !(a.replacesAction?.length) && a.category !== 9)
  .map((a) => a.id);
// このジョブが使えるロールアクション（読み込んだホットバーに置かれていても表示できるように）
for (const a of actions) if (a.isRoleAction && a.jobs?.includes(JOB) && a.level <= LEVEL && !upgrade[a.id]) used.add(a.id);

// 置き換え先も含めて、モックで使うアクションを集める
for (const [base, targets] of Object.entries(replaceGroups)) if (used.has(Number(base))) targets.forEach((id) => used.add(id));

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
const fankitOf = (a) => fankit.get(`${JOB}|${normName(a.name.en)}`) ?? fankit.get(`*|${normName(a.name.en)}`);
const iconOf = (a) => fankitOf(a) ?? (a.iconPath ? `../public${a.iconPath}` : null);

// 威力（説明文から。例「威力：140」「コンボ時威力：300」「背面攻撃時威力：210」「コンボ時かつ背面攻撃時威力：420」
// 「燕飛効果アップ時威力：270」「継続ダメージを付与する。 威力：50　効果時間：60秒」）。ダメージ計算に使う
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
// 与ダメージを上げるステータス（例「風月効果：自身の与ダメージを13％上昇させる」）→ { 風月: 13 }
function parseDamageUp(list) {
  const out = {};
  for (const a of list) for (const m of a.description.ja.matchAll(/([^\s　/「」：。]+?)効果：自身の与ダメージを(\d+)％上昇/g)) out[m[1]] = Number(m[2]);
  return out;
}

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
  // 光る条件: ActionProcStatus（このステータス中に光る）。行番号と、行が指すステータス ID（再抽出後に入る）
  proc: a.actionProcStatus ?? null,
  procStatus: a.actionProcStatusId ?? null,
  // 演出用: 範囲の形（castType 1 単体 / 2 自分の周囲 / 3 前方扇 / 4 前方直線。説明文の「前方扇範囲」などと一致を確認済み）
  shape: a.castType,
  hostile: a.canTargetHostile,
  range: a.range,
  crit: /必ずクリティカルヒット/.test(a.description.ja), // 説明文「このアクションは必ずクリティカルヒットする」
  category: a.category,
  effectRange: a.effectRange, // 範囲の大きさ（m）。自分の周囲の範囲なら半径
  // 方向指定: 説明文「背面攻撃時威力」「側面攻撃時威力」から
  positional: /背面攻撃時/.test(a.description.ja) ? 'rear' : /側面攻撃時/.test(a.description.ja) ? 'flank' : null,
  // 移動を伴う技: 説明文「対象に急接近」「N m後方へ飛び退く」から
  dash: /対象に急接近/.test(a.description.ja),
  backstep: Number(/(\d+)m後方へ飛び退く/.exec(a.description.ja)?.[1] ?? 0),
  pot: parsePotency(a.description.ja),
});

const out = {
  gameVersion: meta.gameVersion.ffxiv,
  extractedAt: meta.extractedAt,
  job: { abbr: JOB, name: job.name.ja, icon: `../public${job.iconPath}`, level: LEVEL },
  // 練習場のタンク役（見た目とパーティリストのみ。盾を持つナイトにしている）
  tank: (() => { const t = jobs.find((j) => j.abbreviation.en === 'PLD'); return { abbr: 'PLD', name: t.name.ja, icon: `../public${t.iconPath}` }; })(),
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
    for (const a of actions) {
      if (!a.jobs?.includes(JOB)) continue;
      for (const v of [a.actionProcStatusId, a.statusGainSelf, ...(a.mentionedStatuses ?? [])]) if (v) ref.add(v);
      // コストの値がステータスを指す型だけ（二次コスト 32・46、一次コスト 10。CONFIG と GAME_DATA §2 の調査より）
      if (a.secondaryCost && [32, 46].includes(a.secondaryCost.type)) ref.add(a.secondaryCost.value);
      if (a.primaryCost && a.primaryCost.type === 10) ref.add(a.primaryCost.value);
    }
    const out = {};
    for (const st of statuses) {
      if (!st.iconPath || !ref.has(st.id)) continue;
      const name = st.name.ja;
      if (!out[name] || (ref.has(st.id) && !out[name].ref)) out[name] = { icon: `../public${st.iconPath}`, id: st.id, ref: ref.has(st.id) };
    }
    return Object.fromEntries(Object.entries(out).map(([k, v]) => [k, v.icon]));
  })(),
  bars,
  keybind: keybind.hotbar,
  move: keybind.move, // 移動・ジャンプのキー（KEYBIND.DAT）
  camera: keybind.camera, // カメラ操作のキー（KEYBIND.DAT。修飾キー付き）
  hud: {
    hotbars: addon.hotbars,
    // ジョブゲージ: 識別値で見つけ、ULD の大きさでどのゲージか決める（見つからなければ大きさだけで探す）
    gauges: { ...CfgParse.findGauges(addon.records, gauge.sizes), ...CfgParse.jobGaugeElements(addon.records, JOB, gauge.sizes) },
    // HUD レイアウトで動かせる部品（キャストバー・ターゲット情報・パラメーターバー・ステータス情報・パーティリストなど）
    elements: CfgParse.hudElements(addon.records),
  },
  gauge,
  // 与ダメージ上昇のステータス（名前 → %）。説明文から
  dmgUp: parseDamageUp(actions.filter((a) => a.jobs?.includes(JOB))),
  display: { width: cfg.width, height: cfg.height, mode: cfg.mode, uiScale: cfg.uiScale, uiHighScale: cfg.uiHighScale, deadArea: cfg.deadArea, pad: cfg.pad },
  // ブラウザで別の設定ファイルを読み込んだときに使う: アクション ID → 名前・このジョブで使えるか・上位版
  known: Object.fromEntries(actions.filter((a) => a.isPlayerAction !== false).map((a) => [a.id, [a.name.ja, a.jobs?.includes(JOB) ? 1 : 0]])),
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

writeFileSync(
  join(root, 'mock/mock-data.js'),
  `// 自動生成: node mock/build-mock-data.mjs（手で編集しない）\nwindow.MOCK_DATA = ${JSON.stringify(out, null, 1)};\n`,
);
console.log(`actions: ${Object.keys(out.actions).length}, bars: ${Object.entries(bars).map(([k, v]) => `${k}(${v.defaultSource})`).join(', ')}`);
console.log('replaceGroups:', out.replaceGroups, 'splitDetected:', out.splitDetected);
