// UI モックを、サーバーにそのまま置ける 1 つのフォルダ（dist-mock/）にまとめる。
// - mock-data.js を作り直し、アイコンの参照を ../public/icons/ → icons/ に書き換える
// - 使っているアイコン・ジョブゲージのテクスチャだけをコピーする（全部だと 13MB あるため）
// - 検索エンジンに載らないよう noindex を付ける（仮の公開のため）
// 実行: node mock/package.mjs
import { execFileSync } from 'node:child_process';
import { copyFileSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'dist-mock');

execFileSync(process.execPath, [join(root, 'mock/build-mock-data.mjs')], { stdio: 'inherit' });

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

// アイコン: mock-data.js が参照するものだけ（抽出したアイコン・ジョブゲージのテクスチャ・ファンキット）。
// ファンキットのファイル名は URL として符号化してあるので、コピーするときは元に戻す
let data = readFileSync(join(root, 'mock/mock-data.js'), 'utf8');
const icons = [...new Set([...data.matchAll(/"\.\.\/public\/((?:icons|fankit)\/[^"]+)"/g)].map((m) => decodeURIComponent(m[1])))];
for (const rel of icons) {
  mkdirSync(join(out, dirname(rel)), { recursive: true });
  copyFileSync(join(root, 'public', rel), join(out, rel));
}
data = data.replaceAll('"../public/icons/', '"icons/').replaceAll('"../public/fankit/', '"fankit/');
writeFileSync(join(out, 'mock-data.js'), data);

for (const f of ['mock.js', 'mock.css', 'cfg-parse.js', 'audio.js', 'gamemode.js', 'pixel.js', 'arena.js', 'uld.js', 'gauge.js', 'settings.js', 'result.js']) copyFileSync(join(root, 'mock', f), join(out, f));

const commit = process.env.GITHUB_SHA?.slice(0, 7) ?? 'local';
const html = readFileSync(join(root, 'mock/index.html'), 'utf8')
  .replace('<meta charset="utf-8">', '<meta charset="utf-8">\n<meta name="robots" content="noindex, nofollow">')
  // 更新がすぐ反映されるよう、読み込むファイルに版を付ける
  .replace(/(src|href)="([\w-]+\.(?:js|css))"/g, `$1="$2?v=${commit}"`);
writeFileSync(join(out, 'index.html'), html);
writeFileSync(join(out, 'robots.txt'), 'User-agent: *\nDisallow: /\n');

console.log(`dist-mock/ を作成しました（アイコン ${icons.length} 枚、版 ${commit}）`);
