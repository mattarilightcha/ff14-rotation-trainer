// FF14 の設定ファイル（HOTBAR.DAT / KEYBIND.DAT / ADDON.DAT / FFXIV.cfg）の解析。
// ブラウザ（window.CfgParse）と Node（require）の両方で使う。形式は docs/CONFIG_FORMAT.md。
// 読み取るのは練習に必要な値だけ（アクション ID・キー・座標）。文字列などの中身は返さない。
(function (root) {
  'use strict';

  const u8 = (buf) => (buf instanceof Uint8Array ? buf : new Uint8Array(buf));
  const view = (b) => new DataView(b.buffer, b.byteOffset, b.byteLength);

  // 共通ヘッダー（16 バイト）の後の有効データを取り出し、XOR を戻す
  function payload(buf, key) {
    const b = u8(buf);
    if (b.length < 16) throw new Error('ファイルが短すぎます');
    const size = view(b).getUint32(8, true);
    if (16 + size > b.length) throw new Error('ヘッダーの長さが合いません');
    const out = new Uint8Array(size);
    for (let i = 0; i < size; i++) out[i] = b[16 + i] ^ key;
    return out;
  }

  // ---- HOTBAR.DAT（XOR 0x31、8 バイトのレコード: ID u32 / セット u8 / バー u8 / スロット u8 / 種類 u8）----
  const BAR_NAMES = [...Array(10)].map((_, i) => `hb${i + 1}`).concat([...Array(8)].map((_, i) => `xhb${i + 1}`));
  function parseHotbar(buf, setIds) {
    const d = payload(buf, 0x31);
    if (d.length % 8) throw new Error('HOTBAR.DAT の長さが 8 の倍数ではありません');
    const dv = view(d);
    const sets = {};
    for (let o = 0; o < d.length; o += 8) {
      const id = dv.getUint32(o, true), set = d[o + 4], bar = d[o + 5], slot = d[o + 6], type = d[o + 7];
      if (!setIds.includes(set) || bar >= 18) continue;
      const name = BAR_NAMES[bar];
      const n = bar < 10 ? 12 : 16;
      if (slot >= n) continue;
      const bars = (sets[set] ??= {});
      (bars[name] ??= Array(n).fill(null))[slot] = type === 0 ? null : { type, id };
    }
    for (const bars of Object.values(sets)) for (const k of Object.keys(bars)) if (!bars[k].some(Boolean)) delete bars[k];
    return sets;
  }

  // ---- KEYBIND.DAT（XOR 0x73。「T 長さ 名前\0 C 長さ 値\0」の並び。値は「キー.修飾,キー.修飾,」の 16 進）----
  // キーは Windows の仮想キーコード。修飾のビット 1=Shift 2=Ctrl 4=Alt は推定（CONFIG_FORMAT §6）
  function vkToCode(vk) {
    if (vk >= 0x30 && vk <= 0x39) return `Digit${vk - 0x30}`;
    if (vk >= 0x41 && vk <= 0x5a) return `Key${String.fromCharCode(vk)}`;
    if (vk >= 0x60 && vk <= 0x69) return `Numpad${vk - 0x60}`;
    if (vk >= 0x70 && vk <= 0x87) return `F${vk - 0x6f}`;
    return {
      0x6a: 'NumpadMultiply', 0x6b: 'NumpadAdd', 0x6d: 'NumpadSubtract', 0x6e: 'NumpadDecimal', 0x6f: 'NumpadDivide',
      0xba: 'Semicolon', 0xbb: 'Equal', 0xbc: 'Comma', 0xbd: 'Minus', 0xbe: 'Period', 0xbf: 'Slash', 0xc0: 'Backquote',
      0xdb: 'BracketLeft', 0xdc: 'Backslash', 0xdd: 'BracketRight', 0xde: 'Quote', 0xe2: 'IntlBackslash',
      0x20: 'Space', 0x09: 'Tab', 0x2d: 'Insert', 0x2e: 'Delete', 0x24: 'Home', 0x23: 'End', 0x21: 'PageUp', 0x22: 'PageDown',
    }[vk] ?? null;
  }
  function keyLabel(code, vk) {
    if (!code) return `?${vk.toString(16)}`;
    return code.replace(/^Digit|^Key/, '').replace(/^Numpad/, 'N').replace('Multiply', '*').replace('Subtract', '-').replace('Divide', '/').replace('Add', '+').replace('Decimal', '.');
  }
  const SLOT_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'A', 'B'];
  function parseKeybind(buf) {
    const d = payload(buf, 0x73);
    const text = new TextDecoder('latin1').decode(d);
    const re = /T[\s\S]\x00([A-Z0-9_]+)\x00C[\s\S]\x00([0-9A-Fa-f.,]*)\x00/g;
    const hotbar = {};
    for (const m of text.matchAll(re)) {
      const hm = /^HOTBAR_(\d+)_([0-9AB])$/.exec(m[1]);
      if (!hm) continue;
      const bar = `hb${hm[1]}`, slot = SLOT_KEYS.indexOf(hm[2]);
      const binds = m[2].split(',').filter(Boolean).map((p) => {
        const [k, mod] = p.split('.').map((x) => parseInt(x, 16));
        if (!k) return null;
        const code = vkToCode(k);
        const mods = { shift: !!(mod & 1), ctrl: !!(mod & 2), alt: !!(mod & 4) };
        const pre = (mods.shift ? 's' : '') + (mods.ctrl ? 'c' : '') + (mods.alt ? 'a' : '');
        return { code, vk: k, ...mods, label: pre + keyLabel(code, k) };
      }).filter(Boolean);
      if (binds.length) (hotbar[bar] ??= Array(12).fill(null))[slot] = binds;
    }
    return { hotbar };
  }

  // ---- ADDON.DAT（XOR なし。"ADDN" の後、32 バイトのレコード: 名前のハッシュ / X% / Y% / 倍率 / 識別 / 幅 / 高さ / 基準点と表示）----
  // ホットバーは「識別」の下位バイト = ホットバー番号 0〜9、次のバイト = 並び（1=12×1 … 6=1×12）で見分けられる
  const LAYOUTS = { 1: [12, 1], 2: [6, 2], 3: [4, 3], 4: [3, 4], 5: [2, 6], 6: [1, 12] };
  function parseAddon(buf) {
    const b = u8(buf);
    const off = 16;
    const dv = view(b);
    const magic = String.fromCharCode(...b.subarray(off, off + 4));
    if (magic !== 'ADDN') throw new Error('ADDON.DAT の形式ではありません（ADDN がありません）');
    const count = dv.getUint32(off + 0x50, true);
    const recs = [];
    for (let i = 0; i < count; i++) {
      const o = off + 0x60 + i * 32;
      if (o + 32 > b.length) break;
      recs.push({
        index: i,
        hash: dv.getUint32(o, true),
        x: dv.getFloat32(o + 4, true),
        y: dv.getFloat32(o + 8, true),
        scale: dv.getFloat32(o + 12, true),
        tag: dv.getUint32(o + 16, true),
        w: dv.getUint16(o + 20, true),
        h: dv.getUint16(o + 22, true),
        anchor: b[o + 24],
        flags: b[o + 27],
      });
    }
    const hotbars = {};
    for (const r of recs) {
      const idx = r.tag & 0xff, lay = (r.tag >> 8) & 0xff;
      if (r.tag >> 16 || idx > 9 || !LAYOUTS[lay] || !(r.flags === 0xff || r.flags === 0xee)) continue;
      // 1 スロットあたりの大きさが妥当なものだけ（他の部品が同じ識別値を持つことがあるため）
      const [cols, rows] = LAYOUTS[lay];
      if (r.w / cols < 40 || r.w / cols > 80 || r.h / rows < 50 || r.h / rows > 90) continue;
      const name = `hb${idx + 1}`;
      if (hotbars[name]) continue;
      hotbars[name] = { x: r.x, y: r.y, scale: r.scale, w: r.w, h: r.h, anchor: r.anchor, cols: LAYOUTS[lay][0], rows: LAYOUTS[lay][1], visible: r.flags === 0xff };
    }
    // ホットバー以外の HUD 部品（どれが何かは未特定。位置と大きさだけ）
    const others = recs.filter((r) => r.index >= 437 && !Object.values(hotbars).some((h) => h.x === r.x && h.y === r.y));
    return { hotbars, others, count: recs.length };
  }

  // ---- FFXIV.cfg（テキスト。「キー<TAB>値」の行）----
  // どのキーが画面の大きさかは未確認のため、候補を拾って返す（CONFIG_FORMAT §7）
  function parseCfg(buf) {
    const text = new TextDecoder('utf-8').decode(u8(buf));
    const found = {};
    for (const line of text.split(/\r?\n/)) {
      const m = /^\s*([A-Za-z0-9_]+)\s+(-?[0-9.]+)\s*$/.exec(line);
      if (m && /Screen|Resolution|Width|Height|Scale|Uhd|FullScreen|Window/i.test(m[1])) found[m[1]] = Number(m[2]);
    }
    const pick = (...keys) => keys.map((k) => found[k]).find((v) => v > 0);
    const mode = found.ScreenMode;
    const full = mode === 1 || mode === 2;
    const width = full ? pick('FullScreenWidth', 'ScreenWidth') : pick('ScreenWidth', 'FullScreenWidth');
    const height = full ? pick('FullScreenHeight', 'ScreenHeight') : pick('ScreenHeight', 'FullScreenHeight');
    return { width, height, found };
  }

  const api = { parseHotbar, parseKeybind, parseAddon, parseCfg, vkToCode, BAR_NAMES, LAYOUTS };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.CfgParse = api;
})(typeof window !== 'undefined' ? window : globalThis);
