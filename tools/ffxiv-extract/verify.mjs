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

// ---- ステータス（全件・ジョブとの結びつき） ----
const statusesAll = load("statuses-all.json");
// ゲームのデータにアイコンの画像が無いもの（Status 701 戦闘能力低下 の 215049）
const knownMissingIcons = new Set(["/icons/statuses/215049.png"]);
for (const s of statusesAll)
  for (const p of [s.iconPath, ...(s.stackIconPaths ?? [])])
    if (p && !knownMissingIcons.has(p) && !existsSync(join(root, "public", p))) fail(`status ${s.id} ${s.name.ja} のアイコンが無い ${p}`);
for (const s of statuses) if (!s.jobs?.length) fail(`statuses.json の ${s.id} ${s.name.ja} にジョブが無い`);
// 二次コストの値を誤ってステータス番号として拾っていないこと（石化 #1・スタン #2 など）
for (const id of [1, 2, 3, 218]) if (statusById.has(id)) fail(`statuses.json に無関係のステータス ${id} が入っている`);
const statusNamesOf = (ab) => new Set(jobs.find((j) => j.abbreviation.en === ab).statusIds.map((id) => statusById.get(id).name.ja));
const expectedStatuses = {
  PLD: ["ファイト・オア・フライト", "インビンシブル"], WAR: ["原初の魂", "ホルムギャング"], DRK: ["ブラッドウェポン", "リビングデッド"],
  GNB: ["ノー・マーシー", "ネビュラ"], WHM: ["ディア", "テンパランス"], SCH: ["鼓舞", "バイオラ"], AST: ["ディヴィネーション"],
  SGE: ["エウクラシア・ドシス"], MNK: ["踏鳴"], DRG: ["ランスチャージ", "バトルリタニー"], NIN: ["印", "かくれる"],
  SAM: ["彼岸花", "明鏡止水"], RPR: ["アルケインサークル"], VPR: [], BRD: ["ストームバイト", "コースティックバイト"],
  MCH: ["ワイルドファイア"], DNC: ["テクニカルステップ", "攻めのタンゴ"], BLM: ["ハイサンダー", "黒魔紋"],
  // ステータス名はアクション名と違うことがある（サーチングライト → シアリングライト、スターリーミューズ → イマジンスカイ）
  SMN: ["シアリングライト"], RDM: ["エンボルデン"], PCT: ["イマジンスカイ", "ハンマーコンボ実行可"],
};
let statusOk = 0;
for (const [ab, names] of Object.entries(expectedStatuses)) {
  const have = statusNamesOf(ab);
  for (const n of names) have.has(n) ? statusOk++ : fail(`${ab} のステータスに「${n}」が無い`);
}

// ---- ジョブゲージ ----
const gauges = load("job-gauges.json");
for (const j of jobs.filter((j) => j.isJob)) {
  const ab = j.abbreviation.en;
  if (!gauges.jobs[ab] && !gauges.noGauge.includes(ab)) fail(`${ab} のジョブゲージが job-gauges.json に無い`);
}
for (const [ab, names] of Object.entries(gauges.jobs))
  for (const n of names) if (!gauges.layouts[n]) fail(`${ab} の ${n} が layouts に無い`);
for (const [k, t] of Object.entries(gauges.textures))
  if (!existsSync(join(root, "public", t.path))) fail(`ゲージ画像が無い ${k}`);
let gaugeParts = 0;
const liveLayouts = Object.values(gauges.jobs).flat();
for (const n of liveLayouts) {
  const L = gauges.layouts[n];
  const allNodes = [...L.nodes, ...L.components.flatMap((c) => c.nodes)];
  const used = new Set(allNodes.filter((x) => x.partListId != null).map((x) => `${x.partListId}/${x.partId}`));
  for (const pl of L.partLists)
    pl.parts.forEach((p, i) => {
      const t = gauges.textures[p.texture];
      if (!t) { fail(`${n} パーツリスト ${pl.id} の画像 ${p.texture} が無い`); return; }
      gaugeParts++;
      // ULD の座標は等倍、HD 画像は scale 倍。ゲームのデータには 1px の端数（JobHudPLD0）や、
      // どのノードも使わない古いパーツ（JobHudSCH0・SMN0）のはみ出しがあるので、使われるものだけを 1px の余裕で見る
      if (!used.has(`${pl.id}/${i}`)) return;
      if ((p.u + p.w - 1) * t.scale > t.width || (p.v + p.h - 1) * t.scale > t.height)
        fail(`${n} パーツ ${pl.id}/${i} (${p.u},${p.v},${p.w},${p.h}) が ${p.texture} (${t.width}x${t.height}/${t.scale}) からはみ出す`);
    });
  const partListIds = new Set(L.partLists.map((p) => p.id));
  for (const node of allNodes)
    if (node.partListId != null && node.partListId !== 0 && !partListIds.has(node.partListId))
      fail(`${n} ノード ${node.id} の partListId ${node.partListId} が無い`);
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
console.log(`statuses-all ${statusesAll.length} / ジョブの代表ステータス ${statusOk} 件一致`);
console.log(`job gauges ${Object.keys(gauges.jobs).length} / layouts ${liveLayouts.length} / parts ${gaugeParts} / textures ${Object.keys(gauges.textures).length}`);
console.log(`既知の値 ${ok} 件一致、NG ${errors} 件`);
process.exit(errors ? 1 : 0);
