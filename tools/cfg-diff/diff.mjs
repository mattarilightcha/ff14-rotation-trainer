// FF14 の設定ファイル（*.DAT）を 2 つ比べ、変わったバイトの「位置と値」だけを出す。
// 中身の文字列（キャラクター名など）は出力しないので、結果をそのまま共有できる。
//
// 使い方（ゲーム内で設定を 1 つだけ変える前後のファイルを用意する）:
//   node tools/cfg-diff/diff.mjs 変更前/UISAVE.DAT 変更後/UISAVE.DAT
//
// 形式は docs/CONFIG_FORMAT.md §1（16 バイトのヘッダー、有効データは 0x31 で XOR）。
import { readFileSync } from 'node:fs';

const [a, b] = process.argv.slice(2);
if (!a || !b) {
  console.error('使い方: node tools/cfg-diff/diff.mjs <変更前のファイル> <変更後のファイル>');
  process.exit(1);
}

function decode(path) {
  const buf = readFileSync(path);
  if (buf.length < 16) throw new Error(`${path}: 短すぎます`);
  const version = buf.readUInt16LE(0);
  const size = buf.readUInt32LE(8);
  if (16 + size > buf.length) throw new Error(`${path}: ヘッダーの長さが合いません`);
  const data = Buffer.alloc(size);
  for (let i = 0; i < size; i++) data[i] = buf[16 + i] ^ 0x31;
  return { version, size, data };
}

const A = decode(a);
const B = decode(b);
console.log(`版: ${A.version} → ${B.version} / 有効データ長: ${A.size} → ${B.size}`);
if (A.size !== B.size) console.log('※ 長さが違うため、途中から位置がずれている可能性があります（先頭から比べます）');

const n = Math.min(A.size, B.size);
const diffs = [];
for (let i = 0; i < n; i++) if (A.data[i] !== B.data[i]) diffs.push(i);

// 連続した差分をまとめる
const runs = [];
for (const i of diffs) {
  const last = runs[runs.length - 1];
  if (last && i - last.end <= 4) last.end = i;
  else runs.push({ start: i, end: i });
}

const LIMIT = 50;
console.log(`変わったバイト: ${diffs.length} 個 / まとまり: ${runs.length} 個${runs.length > LIMIT ? `（先頭 ${LIMIT} 個を表示）` : ''}`);
for (const r of runs.slice(0, LIMIT)) {
  const len = r.end - r.start + 1;
  if (len > 16) {
    console.log(`  0x${r.start.toString(16).padStart(6, '0')} から ${len} バイト（長いので値は省略）`);
    continue;
  }
  const hex = (d) => [...d.subarray(r.start, r.end + 1)].map((x) => x.toString(16).padStart(2, '0')).join(' ');
  console.log(`  0x${r.start.toString(16).padStart(6, '0')}: ${hex(A.data)} → ${hex(B.data)}`);
}
