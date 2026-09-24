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
      0x25: 'ArrowLeft', 0x26: 'ArrowUp', 0x27: 'ArrowRight', 0x28: 'ArrowDown',
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
    const move = {};
    const camera = {};
    // 移動・ジャンプ（MOVE_FORE / MOVE_BACK / MOVE_LEFT / MOVE_RIGHT / MOVE_STRIFE_L / MOVE_STRIFE_R / JUMP）
    const MOVE_CMDS = { MOVE_FORE: 'fore', MOVE_BACK: 'back', MOVE_LEFT: 'left', MOVE_RIGHT: 'right', MOVE_STRIFE_L: 'strafeL', MOVE_STRIFE_R: 'strafeR', JUMP: 'jump' };
    // カメラ（左右に回す・上下に傾ける・近づける / 離す・元に戻す）。修飾キー付きで持つ（サンプルは Ctrl+↑↓ で傾ける）
    const CAM_CMDS = { CAMERA_LEFT: 'left', CAMERA_RIGHT: 'right', CAM_TILT_UP: 'up', CAM_TILT_DOWN: 'down', CAMERA_ZOOMIN: 'zoomIn', CAMERA_ZOOMOUT: 'zoomOut', CAMERA_RESET: 'reset' };
    for (const m of text.matchAll(re)) {
      if (CAM_CMDS[m[1]]) {
        const keys = m[2].split(',').filter(Boolean).map((p) => {
          const [k, mod] = p.split('.').map((x) => parseInt(x, 16));
          const code = k ? vkToCode(k) : null;
          return code ? { code, shift: !!(mod & 1), ctrl: !!(mod & 2), alt: !!(mod & 4) } : null;
        }).filter(Boolean);
        if (keys.length) camera[CAM_CMDS[m[1]]] = keys;
        continue;
      }
      if (MOVE_CMDS[m[1]]) {
        const keys = m[2].split(',').filter(Boolean).map((p) => {
          const [k, mod] = p.split('.').map((x) => parseInt(x, 16));
          return k ? { code: vkToCode(k), vk: k, mod } : null;
        }).filter((k) => k && k.code);
        if (keys.length) move[MOVE_CMDS[m[1]]] = keys.map((k) => k.code);
        continue;
      }
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
    return { hotbar, move, camera };
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
    return { hotbars, others, records: recs, count: recs.length };
  }

  // ---- HUD レイアウトで動かせる部品（ゲームデータの HUD シートの行 0〜111）----
  // ADDON.DAT のレコードの +0 はこの識別値（CONFIG_FORMAT §7）。出典: Dalamud のプラグイン HUD Manager（zacharied/FFXIV-Plugin-HudManager）の
  // ElementKind（値はサンプルのホットバー 1〜10・剣気ゲージ・閃ゲージで一致を確認）。日本語の名前はモックで付けたもの（HUD シートの名前は未抽出）
  const HUD_KINDS = {
    0xC48D3605: ['hb1', 'ホットバー1'], 0xFB7B6E1E: ['hb2', 'ホットバー2'], 0xF93DD047: ['hb3', 'ホットバー3'], 0xF8FFBA70: ['hb4', 'ホットバー4'],
    0xFDB0ACF5: ['hb5', 'ホットバー5'], 0xFC72C6C2: ['hb6', 'ホットバー6'], 0xFE34789B: ['hb7', 'ホットバー7'], 0xFFF612AC: ['hb8', 'ホットバー8'],
    0xF4AA5591: ['hb9', 'ホットバー9'], 0xF5683FA6: ['hb10', 'ホットバー10'], 0xD8D188FF: ['petHotbar', 'ペットホットバー'],
    0xBA81E8D1: ['crossHotbar', 'クロスホットバー'], 0x6665735D: ['wxhbL', 'Wクロスホットバー（左）'], 0x70DDFD27: ['wxhbR', 'Wクロスホットバー（右）'],
    0xECB29811: ['castBar', 'キャストバー'],
    0x913EC97D: ['targetBar', 'ターゲット情報'], 0xBD128377: ['targetHp', 'ターゲット情報（HP）'], 0xCB54A2EF: ['targetCast', 'ターゲット情報（キャストバー）'], 0x076F596B: ['targetStatus', 'ターゲット情報（ステータス）'],
    0xC292F05F: ['focusTarget', 'フォーカスターゲット'], 0x3D425039: ['partyList', 'パーティリスト'], 0x2943729A: ['alliance1', 'アライアンスリスト1'], 0x2B05CCC3: ['alliance2', 'アライアンスリスト2'],
    0xB8BD6685: ['enemyList', 'エネミーリスト'], 0x981EC49E: ['parameterBar', 'パラメーターバー'], 0x21E53CCE: ['expBar', '経験値バー'],
    0x4A569616: ['statusAll', 'ステータス情報'], 0x1F4230B4: ['statusEnh', 'ステータス情報（強化）'], 0x1D048EED: ['statusCond', 'ステータス情報（条件付き強化）'],
    0x1E805A83: ['statusEnf', 'ステータス情報（弱体）'], 0x1CC6E4DA: ['statusOther', 'ステータス情報（その他）'],
    0x7159021B: ['minimap', 'ミニマップ'], 0xDF217364: ['notices', '通知'], 0x8AF95A70: ['mainMenu', 'メインメニュー'], 0xA29100D2: ['dutyList', 'ToDo リスト'],
    0xCDA89776: ['serverInfo', 'サーバー情報'], 0x43161AA2: ['gil', '所持金'], 0x1C15E20F: ['inventory', '所持品'], 0x42CBE75F: ['itemHelp', 'アイテムヘルプ'],
    0x4661EACA: ['actionHelp', 'アクションヘルプ'], 0xC79F450A: ['limitGauge', 'リミットゲージ'], 0x81394395: ['dutyGauge', 'コンテンツのゲージ'],
    0x54B8C68A: ['dutyAction', 'コンテンツアクション'], 0x88EE6357: ['scenarioGuide', 'シナリオガイド'],
  };
  // ジョブゲージ（識別値 → [ジョブ略称, 名前]）。どの ULD（JobHud*0 / 1）かは大きさで決める
  const JOB_GAUGE_KINDS = {
    0xEFBAFE40: ['PLD', 'オウスゲージ'], 0x7F5D020A: ['WAR', 'ビーストゲージ'], 0xF04E8778: ['DRK', 'ブラッドゲージ'], 0xF18CED4F: ['DRK', 'ダークサイドゲージ'],
    0xAEC2C0DF: ['GNB', 'パウダーゲージ'], 0x7A3727B2: ['WHM', 'ヒーリングゲージ'], 0xCADD58CB: ['SCH', 'エーテルフローゲージ'], 0xA1A8A487: ['SCH', 'フェイエーテルゲージ'],
    0x959978B2: ['AST', 'アルカナゲージ'], 0x11D01C49: ['SGE', 'エウクラシアゲージ'], 0x1012767E: ['SGE', 'アダーガルゲージ'],
    0x7393C604: ['MNK', 'チャクラゲージ'], 0x7251AC33: ['MNK', 'マスターゲージ'], 0xBA9838C0: ['DRG', 'ドラゴンゲージ'], 0x713BF2BF: ['NIN', '忍気ゲージ'], 0x6CD4313E: ['NIN', '風魔ゲージ'],
    0xECB607D5: ['SAM', '剣気ゲージ'], 0xED746DE2: ['SAM', '閃ゲージ'], 0xA2D9B660: ['RPR', 'ソウルゲージ'], 0xA31BDC57: ['RPR', 'デスゲージ'],
    0xB7694B56: ['VPR', 'ヴァイパーサイト'], 0xB6AB2161: ['VPR', 'サーペントオファリングゲージ'], 0x7E747433: ['BRD', 'ソングゲージ'], 0x9874C76C: ['MCH', 'ヒートゲージ'],
    0x90EAD514: ['DNC', 'ステップゲージ'], 0x9128BF23: ['DNC', 'フェザーゲージ'], 0xDCAC125A: ['BLM', 'エレメンタルゲージ'], 0xDD6E786D: ['BLM', 'アストラルゲージ'],
    0x3BF3453A: ['SMN', 'エーテルフローゲージ'], 0x3A312F0D: ['SMN', 'トランスゲージ'], 0xEF0A5B00: ['RDM', 'ブラックマナ・ホワイトマナゲージ'],
    0x7A6A6A42: ['PCT', 'キャンバス'], 0x7BA80075: ['PCT', 'パレットゲージ'], 0xC1D18DC6: ['BST', 'TP ゲージ'], 0xC013E7F1: ['BST', 'インナーコンパス'],
  };
  // レコード一覧 → 識別できた部品 { key: { index, name, x, y, scale, anchor, w, h, visible } }
  function hudElements(records) {
    const out = {};
    for (const r of records) {
      const k = HUD_KINDS[r.hash];
      if (!k || out[k[0]]) continue;
      out[k[0]] = { index: r.index, name: k[1], x: r.x, y: r.y, scale: r.scale, anchor: r.anchor, w: r.w, h: r.h, visible: r.flags === 0xff };
    }
    return out;
  }
  // あるジョブのゲージのレコード（識別値で絞り、ULD の大きさで名前を決める）。sizes: { JobHudSAM0: [330, 88], ... }
  function jobGaugeElements(records, job, sizes) {
    const out = {};
    for (const r of records) {
      const k = JOB_GAUGE_KINDS[r.hash];
      if (!k || k[0] !== job) continue;
      const uld = Object.entries(sizes).find(([, [w, h]]) => w === r.w && h === r.h)?.[0];
      if (uld) out[uld] = { index: r.index, name: k[1], x: r.x, y: r.y, scale: r.scale, anchor: r.anchor, w: r.w, h: r.h };
    }
    return out;
  }

  // ジョブゲージの配置: レコードの大きさ（w×h）が ULD の一番外側のノードの大きさと一致するものを探す（CONFIG_FORMAT §5.3）
  // sizes: { JobHudSAM0: [330, 88], ... } → { JobHudSAM0: { x, y, scale, anchor, w, h }, ... }
  function findGauges(records, sizes) {
    const out = {};
    for (const [name, [w, h]] of Object.entries(sizes)) {
      const hits = records.filter((r) => r.w === w && r.h === h && r.scale > 0.2 && r.scale < 4 && r.anchor <= 8);
      if (hits.length === 1) out[name] = { x: hits[0].x, y: hits[0].y, scale: hits[0].scale, anchor: hits[0].anchor, w, h };
    }
    return out;
  }

  // ---- FFXIV.cfg（テキスト。「キー<TAB>値」の行）----
  // ScreenMode: 0 ウィンドウ / 1 フルスクリーン / 2 仮想フルスクリーン（推定）。フルスクリーン系は FullScreenWidth/Height を使う
  // UiHighScale: HUD の大きさ（高解像度 UI）。0=100% 1=150% 2=200% 3=300% と推定（CONFIG_FORMAT §8）
  const UI_HIGH_SCALE = { 0: 1, 1: 1.5, 2: 2, 3: 3 };
  function parseCfg(buf) {
    const text = new TextDecoder('utf-8').decode(u8(buf));
    const found = {};
    const pad = {};
    for (const line of text.split(/\r?\n/)) {
      const m = /^\s*([A-Za-z0-9_]+)\t(.*)$/.exec(line);
      if (!m) continue;
      if (/^PadButton_/.test(m[1])) pad[m[1].slice(10)] = m[2].trim();
      else if (/Screen|Scale|Width|Height|DeadArea/i.test(m[1]) && /^-?[0-9.]+$/.test(m[2].trim())) found[m[1]] = Number(m[2]);
    }
    const mode = found.ScreenMode;
    const full = mode === 1 || mode === 2;
    const pick = (...keys) => keys.map((k) => found[k]).find((v) => v > 0);
    const width = full ? pick('FullScreenWidth', 'ScreenWidth') : pick('ScreenWidth', 'FullScreenWidth');
    const height = full ? pick('FullScreenHeight', 'ScreenHeight') : pick('ScreenHeight', 'FullScreenHeight');
    const uiScale = UI_HIGH_SCALE[found.UiHighScale] ?? null;
    return { width, height, mode, uiScale, uiHighScale: found.UiHighScale, uiBaseScale: found.UiBaseScale, deadArea: found.DeadArea ?? null, pad, found };
  }

  const api = { parseHotbar, parseKeybind, parseAddon, findGauges, hudElements, jobGaugeElements, parseCfg, vkToCode, BAR_NAMES, LAYOUTS, HUD_KINDS, JOB_GAUGE_KINDS };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.CfgParse = api;
})(typeof window !== 'undefined' ? window : globalThis);
