// UI モックを、サーバーにそのまま置ける 1 つのフォルダ（dist-mock/）にまとめる。
// - mock-data.js を作り直し、アイコンの参照を ../public/icons/ → icons/ に書き換える
// - 使っているアイコン・ジョブゲージのテクスチャだけをコピーする（全部だと 13MB あるため）
// - 検索エンジンに載らないよう noindex を付ける（仮の公開のため）
// 実行: node mock/package.mjs
import { execFileSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
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
// 重ねがけのあるステータスは、スタック数 n のアイコン（元の番号 + n − 1）も画面で使うので一緒に入れる
for (const m of data.matchAll(/\{\s*"icon":\s*"\.\.\/public\/(icons\/statuses\/)\d{6}\.png",\s*"max":\s*(\d+),\s*"base":\s*(\d+)\s*\}/g)) {
  for (let n = 1; n < Number(m[2]); n++) {
    const rel = `${m[1]}${String(Number(m[3]) + n).padStart(6, '0')}.png`;
    if (existsSync(join(root, 'public', rel)) && !icons.includes(rel)) icons.push(rel);
  }
}
for (const rel of icons) {
  mkdirSync(join(out, dirname(rel)), { recursive: true });
  copyFileSync(join(root, 'public', rel), join(out, rel));
}
data = data.replaceAll('"../public/icons/', '"icons/').replaceAll('"../public/fankit/', '"fankit/');
writeFileSync(join(out, 'mock-data.js'), data);

for (const f of ['mock.js', 'mock.css', 'cfg-parse.js', 'audio.js', 'gamemode.js', 'stages.js', 'pixel.js', 'sprites.js', 'arena.js', 'arena3d.js', 'uld.js', 'gauge.js', 'gauge2.js', 'jobs.js', 'settings.js', 'result.js']) copyFileSync(join(root, 'mock', f), join(out, f));
// index.html が読むスクリプトが全部コピーされているか確かめる（足し忘れ防止）
for (const [, f] of readFileSync(join(root, 'mock/index.html'), 'utf8').matchAll(/<script src="([\w./-]+\.js)"/g)) {
  if (!f.startsWith('vendor/')) readFileSync(join(out, f));
}
// フォント（mock/fonts。使う文字だけに絞った WOFF2 とライセンス）。足りない文字があれば警告する
mkdirSync(join(out, 'fonts'), { recursive: true });
for (const f of readdirSync(join(root, 'mock/fonts'))) if (/\.(woff2|txt)$/.test(f) && f !== 'chars.txt') copyFileSync(join(root, 'mock/fonts', f), join(out, 'fonts', f));
{
  const have = new Set(readFileSync(join(root, 'mock/fonts/chars.txt'), 'utf8'));
  const srcs = [...readdirSync(join(root, 'mock')).filter((f) => f.endsWith('.js')).map((f) => join(root, 'mock', f)), join(root, 'mock/index.html'), join(root, 'mock/mock.css')];
  const miss = new Set();
  for (const f of srcs) for (const ch of readFileSync(f, 'utf8')) if (ch.codePointAt(0) >= 0x80 && !have.has(ch) && /\p{L}|\p{N}|\p{P}|\p{S}/u.test(ch)) miss.add(ch);
  if (miss.size) console.warn(`警告: フォントに無い文字が ${miss.size} 個あります（${[...miss].slice(0, 30).join('')}…）。python3 mock/fonts/build-fonts.py で作り直してください`);
}
// three.js（mock/vendor/build-three.mjs でまとめたもの）とライセンス
mkdirSync(join(out, 'vendor'), { recursive: true });
for (const f of ['three.min.js', 'LICENSE-three.txt']) copyFileSync(join(root, 'mock/vendor', f), join(out, 'vendor', f));

const commit = process.env.GITHUB_SHA?.slice(0, 7) ?? 'local';
const html = readFileSync(join(root, 'mock/index.html'), 'utf8')
  .replace('<meta charset="utf-8">', '<meta charset="utf-8">\n<meta name="robots" content="noindex, nofollow">')
  // 更新がすぐ反映されるよう、読み込むファイルに版を付ける
  .replace(/(src|href)="([\w./-]+\.(?:js|css))"/g, `$1="$2?v=${commit}"`);
writeFileSync(join(out, 'index.html'), html);
writeFileSync(join(out, 'robots.txt'), 'User-agent: *\nDisallow: /\n');

console.log(`dist-mock/ を作成しました（アイコン ${icons.length} 枚、版 ${commit}）`);
