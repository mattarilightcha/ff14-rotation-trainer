// 抽出したデータの点検。node tools/ffxiv-extract/verify.mjs
// 1) 形の点検（参照切れ・アイコンの有無・重複）
// 2) 既知の値の点検（黄金のレガシー 7.x 時点のゲーム内表記と照らした代表アクション）
//    パッチで値が変わったら、ゲーム内のツールチップを見てここの期待値を直す。
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const load = (f) => JSON.parse(readFileSync(join(root, "src/data/ffxiv", f), "utf8"));
const actions = load("actions.json");
const jobs = load("jobs.json");
const statuses = load("statuses.json");
const meta = load("meta.json");
const byId = new Map(actions.map((a) => [a.id, a]));
const statusById = new Map(statuses.map((s) => [s.id, s]));

let errors = 0;
const fail = (m) => { errors++; console.log("NG  " + m); };

// ---- 形 ----
if (byId.size !== actions.length) fail("actions.json に重複 id");
for (const a of actions) {
  if (!a.name.ja || !a.name.en) fail(`${a.id} 名前が空`);
  if (a.iconPath && !existsSync(join(root, "public", a.iconPath))) fail(`${a.id} アイコンが無い ${a.iconPath}`);
  if (a.comboFrom && !byId.has(a.comboFrom)) fail(`${a.id} ${a.name.en} の comboFrom ${a.comboFrom} が actions.json に無い`);
  for (const n of a.comboNext ?? []) if (!byId.has(n)) fail(`${a.id} の comboNext ${n} が無い`);
  if (a.upgradesFrom && !byId.has(a.upgradesFrom)) fail(`${a.id} の upgradesFrom ${a.upgradesFrom} が無い`);
  if (a.statusGainSelf && !statusById.has(a.statusGainSelf)) fail(`${a.id} の statusGainSelf ${a.statusGainSelf} が statuses.json に無い`);
  if (a.jobs.length === 0) fail(`${a.id} ${a.name.en} 使えるジョブが無い`);
}
for (const s of statuses)
  if (s.iconPath && !existsSync(join(root, "public", s.iconPath))) fail(`status ${s.id} アイコンが無い`);
for (const j of jobs) {
  if (!existsSync(join(root, "public", j.iconPath))) fail(`${j.abbreviation.en} アイコンが無い`);
  if (j.actionIds.length === 0) fail(`${j.abbreviation.en} アクションが 0 件`);
  for (const id of j.actionIds) if (!byId.has(id)) fail(`${j.abbreviation.en} の actionIds ${id} が無い`);
}

// ---- 既知の値 ----
// [id, 英名, 期待値]
const expected = [
  // タンク
  [9, "Fast Blade", { isGcd: true, recast: 2.5, level: 1 }],
  [15, "Riot Blade", { isGcd: true, comboFrom: 9 }],
  [3539, "Royal Authority", { comboFrom: 15, level: 60 }],
  [20, "Fight or Flight", { isGcd: false, recast: 60 }],
  [31, "Heavy Swing", { isGcd: true, recast: 2.5 }],
  [37, "Maim", { comboFrom: 31 }],
  [42, "Storm's Path", { comboFrom: 37 }],
  [52, "Infuriate", { recast: 60, maxCharges: 2 }],
  [7389, "Inner Release", { recast: 60 }],
  [16138, "No Mercy", { recast: 60 }],
  [16146, "Gnashing Fang", { isGcd: true, recast: 30 }],
  // ヒーラー
  [25859, "Glare III", { isGcd: true, cast: 1.5, recast: 2.5 }],
  [136, "Presence of Mind", { recast: 120 }],
  [3571, "Assize", { recast: 40 }],
  [7436, "Chain Stratagem", { recast: 120 }],
  [16552, "Divination", { recast: 120 }],
  // メレー
  [85, "Lance Charge", { recast: 60 }],
  [3557, "Battle Litany", { recast: 120 }],
  [7396, "Brotherhood", { recast: 120 }],
  [7477, "Hakaze", { isGcd: true, recast: 2.5 }],
  [7478, "Jinpu", { comboFrom: 7477 }],
  [7487, "Midare Setsugekka", { isGcd: true, cast: 1.8 }],
  [24405, "Arcane Circle", { recast: 120 }],
  [2259, "Ten", { maxCharges: 2, recast: 20 }],
  // レンジ
  [101, "Raging Strikes", { recast: 120 }],
  [118, "Battle Voice", { recast: 120 }],
  [2878, "Wildfire", { recast: 120 }],
  [16498, "Drill", { isGcd: true, recast: 20 }],
  [15997, "Standard Step", { isGcd: true, recast: 30 }],
  [15998, "Technical Step", { isGcd: true, recast: 120 }],
  [16011, "Devilment", { recast: 120 }],
  // キャスター
  [3577, "Fire IV", { isGcd: true, cast: 2 }],
  [3573, "Ley Lines", { recast: 120 }],
  [25801, "Searing Light", { recast: 120 }],
  [7520, "Embolden", { recast: 120 }],
  [34675, "Starry Muse", { recast: 120 }],
  // ロールアクション
  [7561, "Swiftcast", { isRoleAction: true, recast: 60 }],
  [7562, "Lucid Dreaming", { isRoleAction: true, recast: 60 }],
  [7546, "True North", { isRoleAction: true, recast: 45, maxCharges: 2 }],
  [7531, "Rampart", { isRoleAction: true, recast: 90 }],
  [7535, "Reprisal", { isRoleAction: true, recast: 60 }],
  [7549, "Feint", { isRoleAction: true, recast: 90 }],
  [7560, "Addle", { isRoleAction: true, recast: 90 }],
];
let ok = 0;
for (const [id, en, exp] of expected) {
  const a = byId.get(id);
  if (!a) { fail(`${id} ${en} が無い`); continue; }
  if (a.name.en !== en) fail(`${id} 名前が違う: ${a.name.en}（期待 ${en}）`);
  for (const [k, v] of Object.entries(exp)) {
    if (a[k] !== v) fail(`${id} ${en}（${a.name.ja}）の ${k} = ${a[k]}（期待 ${v}）`);
    else ok++;
  }
}

console.log(`game ${meta.gameVersion.ffxiv} / jobs ${jobs.length} / actions ${actions.length} / statuses ${statuses.length}`);
console.log(`既知の値 ${ok} 件一致、NG ${errors} 件`);
process.exit(errors ? 1 : 0);
