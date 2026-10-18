// FF14 の設定ファイル（*.DAT）の隠された中身（0x31 の XOR）を戻し、読める文字列を一覧にする。
// 公開リポジトリに入れる前に、キャラクター名などが入っていないかを**自分の PC で**確かめるための道具。
// 出力は画面に出すだけで、どこにも送らない。
//
// 使い方: node tools/cfg-diff/check-strings.mjs ADDON.DAT
import { readFileSync } from 'node:fs';

const path = process.argv[2];
if (!path) {
  console.error('使い方: node tools/cfg-diff/check-strings.mjs <ファイル>');
  process.exit(1);
}
const buf = readFileSync(path);
const size = buf.readUInt32LE(8);
const data = Buffer.alloc(Math.min(size, buf.length - 16));
for (let i = 0; i < data.length; i++) data[i] = buf[16 + i] ^ 0x31;

// ASCII（英字の名前）と UTF-8（日本語）の両方で、4 文字以上続く読める部分を探す
const found = new Map();
const add = (s) => { if (s.trim().length >= 4) found.set(s, (found.get(s) ?? 0) + 1); };
for (const m of data.toString('latin1').matchAll(/[\x20-\x7e]{4,}/g)) add(m[0]);
for (const m of data.toString('utf8').matchAll(/[぀-ヿ一-鿿＀-￯]{2,}[぀-ヿ一-鿿＀-￯\w ]*/g)) add(m[0]);

// 同じ文字の繰り返し（0 埋めを XOR した跡など）は除く
const list = [...found.entries()].filter(([s]) => new Set(s).size > 2);
console.log(`${path}: 有効データ ${size} バイト / 読める文字列 ${list.length} 種類`);
for (const [s, n] of list.slice(0, 300)) console.log(`  ${JSON.stringify(s)}${n > 1 ? ` ×${n}` : ''}`);
if (list.length > 300) console.log(`  …ほか ${list.length - 300} 種類`);
console.log('\n人の名前・フレンド・会話などが含まれていたら、そのファイルは公開リポジトリに入れないでください。');
