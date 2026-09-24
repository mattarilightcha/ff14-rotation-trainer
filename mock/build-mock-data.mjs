// UI モック用のデータを作る。
// 第 1 層（src/data/ffxiv/*.json）から侍 Lv100 の分だけを取り出し、
// mock/mock-data.js（file:// でも読めるよう window に載せる形）を書き出す。
// 実行: node mock/build-mock-data.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));

const actions = read('src/data/ffxiv/actions.json');
const statuses = read('src/data/ffxiv/statuses.json');
const jobs = read('src/data/ffxiv/jobs.json');
const meta = read('src/data/ffxiv/meta.json');
const hotbar = read('mock/sam-hotbar-sample.json');

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

// 置き換え先も含めて、モックで使うアクションを集める
for (const [base, targets] of Object.entries(replaceGroups)) if (used.has(Number(base))) targets.forEach((id) => used.add(id));

const pick = (a) => ({
  id: a.id,
  name: a.name.ja,
  desc: a.description.ja,
  icon: a.iconPath ? `../public${a.iconPath}` : null,
  isGcd: a.isGcd,
  castMs: Math.round(a.cast * 1000),
  recastMs: Math.round(a.recast * 1000),
  cooldownGroup: a.cooldownGroup,
  maxCharges: a.maxCharges,
  comboFrom: a.comboFrom ? [a.comboFrom, upgrade[a.comboFrom]].filter(Boolean) : [],
  preservesCombo: a.preservesCombo,
  level: a.level,
  forJob: a.jobs?.includes(JOB) ?? false, // 他ジョブのアクション（共有バーに残っているもの）は使えない
});

const out = {
  gameVersion: meta.gameVersion.ffxiv,
  extractedAt: meta.extractedAt,
  job: { abbr: JOB, name: job.name.ja, icon: `../public${job.iconPath}`, level: LEVEL },
  actions: Object.fromEntries([...used].sort((a, b) => a - b).map((id) => [id, pick(byId.get(id))])),
  statuses: Object.fromEntries(
    statuses
      .filter((s) => [3856, 2959, 3855].includes(s.id))
      .map((s) => [s.id, { id: s.id, name: s.name.ja, icon: `../public${s.iconPath}` }]),
  ),
  bars,
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
