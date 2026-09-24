// ドット絵の素材（高画質版）: 侍・タンク（ナイト）・白魔道士・からくり木人。画像ファイルは使わず、図形（楕円・太線・多角形）を組み合わせて描く。
// 部品ごとに「光が左上から当たる」として陰影を自動で付け、部品の重なりには線、外側には輪郭を付ける。
// 1 コマは等倍のドット（侍・タンク・白魔道士 64×64、木人 96×96）。2D の画面でも 3D の画面でも、同じアトラス（全コマを並べた画像）を使う。
(function () {
  'use strict';

  // ---------------- 色（素材ごとに 5 段: 0 明るい → 3 影 → 4 線）----------------
  const MAT = {
    skin: ['#fff0dc', '#f7d3ae', '#e8ae86', '#c07a62', '#7e4a48'],
    hair: ['#6e6680', '#4a4358', '#322c40', '#221d2e', '#15111d'],
    red: ['#ffa58a', '#ee5c4c', '#c93a3e', '#91263a', '#5a1832'],
    white: ['#ffffff', '#f4efe6', '#dcd3c6', '#b0a49a', '#6f6470'],
    hakama: ['#6c7294', '#4c5274', '#363b58', '#252a42', '#171a2c'],
    gold: ['#fff5c0', '#f6d77a', '#dcae4a', '#a57a30', '#634520'],
    black: ['#6a6474', '#474250', '#302c38', '#201d26', '#121016'],
    blade: ['#ffffff', '#eef7ff', '#c9d8ea', '#8ea2bc', '#56688a'],
    smear: ['#ffffff', '#f6fcff', '#e2f3ff', '#c4e6ff', '#a0d4ff'],
    steel: ['#ffffff', '#e2eaf4', '#b4c2d4', '#7c8aa2', '#4a5470'],
    blue: ['#a8d0ff', '#5c96e8', '#3a6cc0', '#284a8c', '#1a2e5c'],
    leather: ['#e0b080', '#b88458', '#8e5e3c', '#663f2a', '#3e241a'],
    wood: ['#f2cc96', '#cf9c64', '#a87444', '#7a4c2c', '#4c2e1c'],
    woodD: ['#b88458', '#8c5e38', '#664026', '#462a18', '#2a180e'],
    brass: ['#fff2b8', '#f4cc66', '#cc9a30', '#8e6620', '#563a14'],
    iron: ['#c4c8d4', '#9296a4', '#6a6e7c', '#4a4e5a', '#2c2e38'],
    glow: ['#ffffff', '#fff2c8', '#ffc864', '#ff9234', '#d8561a'],
    stone: ['#e4e6ec', '#b0b6c2', '#848a98', '#5a5f6e', '#363a48'],
    pine: ['#7fbf72', '#4c8a52', '#336a42', '#22492f', '#132b1d'],
    marble: ['#fffdf6', '#efe6d4', '#cfc2a8', '#a09078', '#6a5c4a'],
    grassY: ['#eee49a', '#c2b862', '#949040', '#64642c', '#3a3a1a'],
    aura: ['#ffffff', '#f0fff6', '#c4f7d6', '#7fe0a2', '#3fae72'], // 白魔道士の杖の玉
  };
  // 3D で光らせる素材（光のにじみの対象）
  const EMIT = new Set(['glow', 'smear', 'aura']);
  const OUTLINE = [18, 14, 22];

  const MATS = Object.keys(MAT);
  const MID = Object.fromEntries(MATS.map((k, i) => [k, i]));
  const hex = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
  const RGB = MATS.map((k) => MAT[k].map(hex));

  // ---------------- 形（1 ドット = 1 画素の塗り分け。画素の中心が形の内側なら塗る）----------------
  class Mask {
    constructor(w, h) { this.w = w; this.h = h; this.a = new Uint8Array(w * h); this.v = 1; }
    put(x, y) { if (x >= 0 && y >= 0 && x < this.w && y < this.h) this.a[y * this.w + x] = this.v; }
    cut() { this.v = 0; return this; } // 以降の図形は「消す」
    add() { this.v = 1; return this; }
    rect(x, y, w, h) {
      for (let j = Math.round(y); j < Math.round(y + h); j++) for (let i = Math.round(x); i < Math.round(x + w); i++) this.put(i, j);
      return this;
    }
    ellipse(cx, cy, rx, ry = rx) {
      for (let y = Math.floor(cy - ry) - 1; y <= Math.ceil(cy + ry); y++) for (let x = Math.floor(cx - rx) - 1; x <= Math.ceil(cx + rx); x++) {
        const dx = (x + 0.5 - cx) / rx, dy = (y + 0.5 - cy) / ry;
        if (dx * dx + dy * dy <= 1) this.put(x, y);
      }
      return this;
    }
    // 太さのある線（端は丸い。r0 → r1 に太さが変わる）
    capsule(x0, y0, x1, y1, r0, r1 = r0) {
      const R = Math.max(r0, r1) + 1;
      const dx = x1 - x0, dy = y1 - y0, L2 = dx * dx + dy * dy || 1e-6;
      for (let y = Math.floor(Math.min(y0, y1) - R); y <= Math.ceil(Math.max(y0, y1) + R); y++) {
        for (let x = Math.floor(Math.min(x0, x1) - R); x <= Math.ceil(Math.max(x0, x1) + R); x++) {
          const px = x + 0.5, py = y + 0.5;
          const t = Math.max(0, Math.min(1, ((px - x0) * dx + (py - y0) * dy) / L2));
          const qx = x0 + dx * t - px, qy = y0 + dy * t - py, r = r0 + (r1 - r0) * t;
          if (qx * qx + qy * qy <= r * r) this.put(x, y);
        }
      }
      return this;
    }
    // 多角形（[x0, y0, x1, y1, ...]。偶奇の規則）
    poly(p) {
      let minx = Infinity, maxx = -Infinity, miny = Infinity, maxy = -Infinity;
      for (let i = 0; i < p.length; i += 2) { minx = Math.min(minx, p[i]); maxx = Math.max(maxx, p[i]); miny = Math.min(miny, p[i + 1]); maxy = Math.max(maxy, p[i + 1]); }
      const n = p.length / 2;
      for (let y = Math.floor(miny); y <= Math.ceil(maxy); y++) {
        const py = y + 0.5;
        for (let x = Math.floor(minx); x <= Math.ceil(maxx); x++) {
          const px = x + 0.5;
          let inside = false;
          for (let i = 0, j = n - 1; i < n; j = i++) {
            const xi = p[i * 2], yi = p[i * 2 + 1], xj = p[j * 2], yj = p[j * 2 + 1];
            if ((yi > py) !== (yj > py) && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) inside = !inside;
          }
          if (inside) this.put(x, y);
        }
      }
      return this;
    }
    // 1 ドットの線
    line(x0, y0, x1, y1) {
      x0 = Math.round(x0); y0 = Math.round(y0); x1 = Math.round(x1); y1 = Math.round(y1);
      const dx = Math.abs(x1 - x0), dy = -Math.abs(y1 - y0), sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1;
      let e = dx + dy;
      for (;;) {
        this.put(x0, y0);
        if (x0 === x1 && y0 === y1) break;
        const e2 = 2 * e;
        if (e2 >= dy) { e += dy; x0 += sx; }
        if (e2 <= dx) { e += dx; y0 += sy; }
      }
      return this;
    }
    dot(x, y) { this.put(Math.round(x), Math.round(y)); return this; }
    // 斬撃の残像（三日月）: 中心 cx, cy・半径 r の円（sy で縦につぶし、rot で傾ける）に沿って、角度 a0（尾）→ a1（刃の側）。
    // 刃の側ほど太い（thick）。尾は細く消える
    crescent(cx, cy, r, thick, a0, a1, sy = 1, rot = 0) {
      const cr = Math.cos(-rot), sr = Math.sin(-rot), span = a1 - a0;
      for (let y = Math.floor(cy - r) - 2; y <= Math.ceil(cy + r) + 2; y++) for (let x = Math.floor(cx - r) - 2; x <= Math.ceil(cx + r) + 2; x++) {
        const px = x + 0.5 - cx, py = y + 0.5 - cy;
        const lx = px * cr - py * sr, ly = (px * sr + py * cr) / sy;
        const rr = Math.hypot(lx, ly);
        if (rr > r) continue;
        let a = Math.atan2(ly, lx), u = (a - a0) / span;
        for (let k = 0; k < 2 && (u < 0 || u > 1); k++) { a += span > 0 ? Math.PI * 2 : -Math.PI * 2; u = (a - a0) / span; }
        if (u < 0 || u > 1) continue;
        if (rr >= r - thick * Math.pow(u, 1.25)) this.put(x, y);
      }
      return this;
    }
    // 円弧の帯（中心 cx, cy、半径 r0〜r1、角度 a0〜a1）
    band(cx, cy, r0, r1, a0, a1) {
      const lo = Math.min(a0, a1), hi = Math.max(a0, a1);
      for (let y = Math.floor(cy - r1) - 1; y <= Math.ceil(cy + r1); y++) for (let x = Math.floor(cx - r1) - 1; x <= Math.ceil(cx + r1); x++) {
        const px = x + 0.5 - cx, py = y + 0.5 - cy, r = Math.hypot(px, py);
        if (r < r0 || r > r1) continue;
        let a = Math.atan2(py, px);
        while (a < lo) a += Math.PI * 2;
        if (a <= hi) this.put(x, y);
      }
      return this;
    }
  }

  // ---------------- 1 コマ（部品を重ねて描き、最後に色にする）----------------
  const LIGHT = (() => { const v = [-0.5, -0.78, 0.62], l = Math.hypot(...v); return v.map((x) => x / l); })();
  class Frame {
    constructor(w, h) {
      this.w = w; this.h = h;
      const n = w * h;
      this.part = new Int16Array(n).fill(-1); this.mat = new Int8Array(n).fill(-1); this.sh = new Int8Array(n);
      this.lines = []; this.np = 0;
    }
    // 部品を塗る。o: { k: 丸み, dark: 全体を暗く（段数）, flat: 平ら, line: 後ろの部品との境に線を引くか }
    fill(mat, draw, o = {}) {
      const m = new Mask(this.w, this.h);
      draw(m);
      const s = shade(m, o);
      const id = this.np++;
      this.last = id;
      this.lines[id] = o.line !== false;
      const mi = MID[mat];
      if (mi == null) throw new Error(`色がない: ${mat}`);
      for (let i = 0; i < m.a.length; i++) if (m.a[i]) { this.part[i] = id; this.mat[i] = mi; this.sh[i] = s[i]; }
      return this;
    }
    // 模様（陰影を付けず、指定の段で塗る。すでに塗った所だけ。o.only: その部品の上だけ）
    deco(mat, step, draw, o = {}) {
      const m = new Mask(this.w, this.h);
      draw(m);
      const mi = MID[mat];
      for (let i = 0; i < m.a.length; i++) {
        if (!m.a[i]) continue;
        if (o.only != null && this.part[i] !== o.only) continue;
        if (this.part[i] < 0) { if (!o.any) continue; this.part[i] = this.np - 1; }
        this.mat[i] = mi; this.sh[i] = step;
      }
      return this;
    }
    // 色にする → { rgba, emit }（どちらも w*h*4）
    pixels() {
      const { w, h, part, mat, sh, lines } = this;
      const rgba = new Uint8ClampedArray(w * h * 4), emit = new Uint8ClampedArray(w * h * 4);
      const at = (x, y) => (x < 0 || y < 0 || x >= w || y >= h ? -1 : part[y * w + x]);
      for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
        const i = y * w + x, p = part[i];
        let c;
        if (p < 0) {
          // 外側の輪郭: 上下左右に絵があれば塗る（絵の左上側は、その部品の線の色で柔らかく）
          const r = at(x + 1, y), d = at(x, y + 1), l = at(x - 1, y), u = at(x, y - 1);
          if (r < 0 && d < 0 && l < 0 && u < 0) continue;
          const soft = r >= 0 ? i + 1 : d >= 0 ? i + w : -1;
          c = soft >= 0 && l < 0 && u < 0 ? RGB[mat[soft]][4] : OUTLINE;
        } else {
          let s = sh[i];
          // 手前の部品との境には線（後ろの部品の暗い色）
          for (const [nx, ny] of [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]]) {
            const q = at(nx, ny);
            if (q > p && lines[q] && mat[ny * w + nx] !== -1) { s = 4; break; }
          }
          c = RGB[mat[i]][s];
          if (EMIT.has(MATS[mat[i]])) { emit[i * 4] = c[0]; emit[i * 4 + 1] = c[1]; emit[i * 4 + 2] = c[2]; emit[i * 4 + 3] = 255; }
        }
        rgba[i * 4] = c[0]; rgba[i * 4 + 1] = c[1]; rgba[i * 4 + 2] = c[2]; rgba[i * 4 + 3] = 255;
      }
      return { rgba, emit };
    }
  }

  // 陰影: 形の内側の「縁からの距離」を高さとみなして傾きを出し、左上からの光との角度で 5 段に分ける
  function shade(m, o) {
    const { w, h, a } = m;
    const out = new Int8Array(w * h);
    let x0 = w, x1 = -1, y0 = h, y1 = -1;
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (a[y * w + x]) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    if (x1 < 0) return out;
    const bx = Math.max(0, x0 - 1), by = Math.max(0, y0 - 1), ex = Math.min(w - 1, x1 + 1), ey = Math.min(h - 1, y1 + 1);
    const BW = ex - bx + 1, BH = ey - by + 1;
    const d = new Float32Array(BW * BH);
    const In = (x, y) => x >= 0 && y >= 0 && x < w && y < h && a[y * w + x];
    for (let y = 0; y < BH; y++) for (let x = 0; x < BW; x++) d[y * BW + x] = In(x + bx, y + by) ? 1e6 : 0;
    const D = (x, y) => (x < 0 || y < 0 || x >= BW || y >= BH ? 0 : d[y * BW + x]);
    for (let y = 0; y < BH; y++) for (let x = 0; x < BW; x++) {
      const i = y * BW + x; if (!d[i]) continue;
      d[i] = Math.min(d[i], D(x - 1, y) + 3, D(x, y - 1) + 3, D(x - 1, y - 1) + 4, D(x + 1, y - 1) + 4);
    }
    for (let y = BH - 1; y >= 0; y--) for (let x = BW - 1; x >= 0; x--) {
      const i = y * BW + x; if (!d[i]) continue;
      d[i] = Math.min(d[i], D(x + 1, y) + 3, D(x, y + 1) + 3, D(x + 1, y + 1) + 4, D(x - 1, y + 1) + 4);
    }
    const cap = o.cap ?? 5, k = o.flat ? 0.7 : o.k ?? 1.7;
    const Z = (x, y) => Math.sqrt(Math.min(D(x, y) / 3, cap));
    const dark = o.dark ?? 0;
    for (let y = 0; y < BH; y++) for (let x = 0; x < BW; x++) {
      if (!d[y * BW + x]) continue;
      const gx = (Z(x + 1, y) - Z(x - 1, y)) / 2, gy = (Z(x, y + 1) - Z(x, y - 1)) / 2;
      let nx = -gx * k, ny = -gy * k, nz = 1;
      const l = Math.hypot(nx, ny, nz); nx /= l; ny /= l; nz /= l;
      const v = nx * LIGHT[0] + ny * LIGHT[1] + nz * LIGHT[2] + (o.bias ?? 0);
      let s = v > 0.93 ? 0 : v > 0.76 ? 1 : v > 0.36 ? 2 : v > -0.12 ? 3 : 4;
      if (o.noHi && s < 1) s = 1;
      s = Math.max(0, Math.min(4, s + dark));
      out[(y + by) * w + (x + bx)] = s;
    }
    return out;
  }

  // ---------------- 小物 ----------------
  const V = (x, y) => ({ x, y });
  const add = (p, d, k) => V(p.x + d.x * k, p.y + d.y * k);
  const unit = (x, y) => { const l = Math.hypot(x, y) || 1; return V(x / l, y / l); };
  const perp = (d) => V(-d.y, d.x);

  // 刀（手の位置 h、刃の向き dir、長さ len）。反りは刃の中ほどで 1 ドット
  function katana(F, h, dir, len, o = {}) {
    const n = perp(dir);
    const t0 = add(h, dir, -4), t1 = add(h, dir, 1.2), g = add(h, dir, 2);
    const b0 = add(h, dir, 2.8), bm = add(add(h, dir, 2.8 + len * 0.55), n, o.curve ?? 0.8), b1 = add(h, dir, 2.8 + len);
    F.fill('black', (m) => m.capsule(t0.x, t0.y, t1.x, t1.y, 1.05), { k: 1.2 });
    F.deco('gold', 2, (m) => { const p = add(h, dir, -1.5); m.dot(p.x, p.y); });
    F.fill('blade', (m) => { m.capsule(b0.x, b0.y, bm.x, bm.y, 1.0, 0.95); m.capsule(bm.x, bm.y, b1.x, b1.y, 0.95, 0.55); }, { k: 1.1 });
    // 刃の光る筋
    F.deco('blade', 0, (m) => { const a = add(b0, n, -0.35), c = add(bm, n, 0.1), e = add(b1, dir, -1.5); m.line(a.x, a.y, c.x, c.y); m.line(c.x, c.y, e.x, e.y); });
    F.fill('gold', (m) => m.ellipse(g.x, g.y, 1.6, 1.6), { k: 1.3 });
  }
  // 残像: 三日月を塗り、外側の縁を白く
  function smear(F, c) {
    F.fill('smear', (m) => m.crescent(...c), { flat: true, line: false, noHi: true });
    const [cx, cy, r, , a0, a1, sy, rot] = c;
    F.deco('smear', 0, (m) => m.crescent(cx, cy, r, 1.4, a0, a1, sy, rot));
  }
  // 鞘（口 a → 先 b）
  function saya(F, a, b, o = {}) {
    F.fill('black', (m) => m.capsule(a.x, a.y, b.x, b.y, 1.35, 1.15), { k: 1.4, dark: o.dark ?? 0 });
    F.deco('gold', 1, (m) => { m.dot(a.x, a.y); const e = add(b, unit(a.x - b.x, a.y - b.y), 0.6); m.dot(e.x, e.y); });
    if (o.hilt) {
      // 納刀中の柄（口から手前に）
      const d = unit(a.x - b.x, a.y - b.y), t1 = add(a, d, 5), g = add(a, d, 0.9);
      F.fill('gold', (m) => m.ellipse(g.x, g.y, 1.5, 1.5), { k: 1.3 });
      F.fill('black', (m) => m.capsule(g.x + d.x, g.y + d.y, t1.x, t1.y, 1.05), { k: 1.2 });
    }
  }
  // 腕（肩 s → 手 h。着物の袖は幅広）。bend: 肘の張り出し（+ で外側）
  function kimonoArm(F, s, h, bend, mat = 'red', o = {}) {
    const mid = V((s.x + h.x) / 2, (s.y + h.y) / 2), d = unit(h.x - s.x, h.y - s.y), n = perp(d);
    const e = add(mid, n, bend);
    F.fill(mat, (m) => {
      m.capsule(s.x, s.y, e.x, e.y, 2.6, 2.4);
      m.capsule(e.x, e.y, h.x - d.x * 1.2, h.y - d.y * 1.2, 2.4, 2.1);
      // 垂れた袖
      if (o.sleeve !== false) m.poly([e.x - 2.2, e.y - 1, e.x + 2.2, e.y - 1, e.x + 2.8 + (o.sway ?? 0), e.y + 4.5, e.x - 2.4 + (o.sway ?? 0), e.y + 4.5]);
    }, { k: 1.5, dark: o.dark ?? 0 });
    F.fill('skin', (m) => m.ellipse(h.x, h.y, 1.8, 1.7), { k: 1.3, dark: o.dark ?? 0 });
  }

  // ---------------- 侍（64×64、足元 y=59）----------------
  // p: { bob, crouch, fl, fr, sway, arm, free, smear, tail, lean, headDy, jump }
  const SAM_ARM = {
    // 刀を持つ腕（正面から見て左 = 本人の右手）: 手の位置（肩からの相対）・刃の向き・長さ
    low: { h: [-2, 12], dir: [-0.78, 0.62], len: 19 },
    raise: { h: [11, -5], dir: [0.42, -0.9], len: 18 },
    // smear: [中心の x（刀の腕の肩からの相対。正面では体の中心になる値）, 中心の y, 半径, 太さ, 尾の角度, 刃の角度, 縦のつぶれ, 傾き]
    swing: { h: [4, 8], dir: [-1, 0.08], len: 20, smear: [7.5, 6, 21, 6, 0.15, 2.7, 0.5, -0.55] },
    follow: { h: [-4, 13], dir: [-0.72, 0.7], len: 19, smear: [7.5, 6, 21, 3.5, 1.2, 3.0, 0.5, -0.55] },
    iaiOut: { h: [-9, 5], dir: [-1, -0.04], len: 20, smear: [7.5, 10, 22, 4.5, 0.12, 3.0, 0.3, 0] },
    up: { h: [1, -7], dir: [0.08, -1], len: 17 },
    hurt: { h: [-7, 8], dir: [-0.35, 0.94], len: 18 },
    sheath: null,
  };
  function samFB(F, p, back) {
    const c = p.crouch ?? 0, b = p.bob ?? 0, cx = 32, jump = p.jump ?? 0;
    const hipY = 38 + c - jump, sy = 26 + b + c * 0.8 - jump, hy = 17 + b + c * 0.8 + (p.headDy ?? 0) - jump;
    const sway = p.sway ?? 0, tail = p.tail ?? 0;
    const armSide = back ? 1 : -1; // 刀を持つ腕の側（正面: 画面の左、背面: 画面の右）
    const A = SAM_ARM[p.arm ?? 'low'];
    // 鉢巻の尻尾（頭の後ろ）
    if (!back) F.fill('white', (m) => { m.capsule(cx + 6, hy - 3.5, cx + 10 + tail, hy - 1.5 + tail * 0.6, 0.75, 0.55); m.capsule(cx + 6, hy - 3, cx + 9 + tail * 0.6, hy + 2, 0.75, 0.5); }, { dark: 1, k: 1 });
    // 鞘（本人の左腰 = 正面では画面の右）。背面では画面の左
    const sx = back ? -1 : 1;
    if (p.arm !== 'sheath') saya(F, V(cx + sx * 6, hipY + 1), V(cx + sx * 16, hipY + 9), { dark: back ? 0 : 1 });
    // 足（足袋）
    const footY = 58 - jump * 0.3;
    F.fill('black', (m) => { m.ellipse(cx - 5 + sway, footY - (p.fl ?? 0), 2.6, 1.6); m.ellipse(cx + 5 + sway, footY - (p.fr ?? 0), 2.6, 1.6); }, { k: 1.2 });
    // 袴（左右の脚）。裾は足に合わせて上がる
    const hem = 56 - jump * 0.3;
    const leg = (s, lift) => (m) => m.poly([cx + s * 1, hipY, cx + s * 8.5, hipY, cx + s * (10.5 + c * 0.6) + sway, hem - lift, cx + s * 0.6 + sway * 0.6, hem - lift]);
    F.fill('hakama', leg(-1, p.fl ?? 0), { k: 1.2 });
    F.deco('hakama', 3, (m) => { m.line(cx - 4, hipY + 3, cx - 5 + sway, hem - 1 - (p.fl ?? 0)); m.line(cx - 7, hipY + 4, cx - 8.5 + sway, hem - 1 - (p.fl ?? 0)); });
    F.fill('hakama', leg(1, p.fr ?? 0), { k: 1.2 });
    F.deco('hakama', 3, (m) => { m.line(cx + 4, hipY + 3, cx + 5 + sway, hem - 1 - (p.fr ?? 0)); m.line(cx + 7, hipY + 4, cx + 8.5 + sway, hem - 1 - (p.fr ?? 0)); });
    // 上着
    F.fill('red', (m) => m.poly([cx - 8.5, sy + 1.5, cx - 6, sy - 0.5, cx + 6, sy - 0.5, cx + 8.5, sy + 1.5, cx + 7.5, hipY + 0.5, cx - 7.5, hipY + 0.5]), { k: 1.3 });
    if (!back) {
      // 襟（白）と金の縁
      F.fill('white', (m) => m.poly([cx - 3.2, sy - 0.5, cx + 3.2, sy - 0.5, cx, sy + 6]), { line: false, k: 1 });
      F.deco('gold', 1, (m) => { m.line(cx - 4, sy - 0.5, cx - 0.5, sy + 6.5); m.line(cx + 4, sy - 0.5, cx + 0.5, sy + 6.5); });
    } else {
      // 背中の紋
      F.deco('white', 2, (m) => { m.ellipse(cx, sy + 5.5, 2.4, 2.4); });
      F.deco('red', 3, (m) => { m.dot(cx, sy + 5); m.dot(cx - 1, sy + 6); m.dot(cx, sy + 6); });
    }
    // 帯
    F.fill('black', (m) => m.rect(cx - 8, hipY - 1.5, 16, 3), { k: 1, flat: true });
    F.deco('gold', 2, (m) => m.line(cx - 7, hipY - 0.5, cx + 7, hipY - 0.5));
    if (!back) F.fill('red', (m) => m.rect(cx + 2, hipY - 1.5, 2, 3), { k: 1 });
    // 刀を持たない腕（本人の左手。鞘に添える）
    const fs = V(cx - armSide * 7.5, sy + 1.5);
    const fh = p.arm === 'sheath' ? V(cx - armSide * 4, hipY + 1) : p.free === 'up' ? V(cx - armSide * 11, sy - 3) : V(cx - armSide * 9.5, hipY + 0.5 + (p.freeDy ?? 0));
    kimonoArm(F, fs, fh, -armSide * 1.5, 'red', { sway: -armSide * 0.5 });
    // 刀を持つ腕と刀
    const ks = V(cx + armSide * 7.5, sy + 1.5);
    if (p.arm === 'sheath') {
      // 居合の構え: 刀は鞘の中。右手は柄に（手前の腰）
      saya(F, V(cx - armSide * 3, hipY + 1), V(cx - armSide * 15, hipY + 7), { hilt: true, dark: 0 });
      kimonoArm(F, ks, V(cx - armSide * 1, hipY - 2), armSide * 1.2, 'red', {});
    } else {
      const hx = ks.x + A.h[0] * -armSide * -1 * (back ? -1 : 1) * (back ? 1 : 1), hy2 = ks.y + A.h[1];
      const hand = V(back ? ks.x - A.h[0] : ks.x + A.h[0], hy2);
      void hx;
      const dir = unit(back ? -A.dir[0] : A.dir[0], A.dir[1]);
      if (p.smear && A.smear) {
        // 正面の定義を、背面では左右反転して使う（角度は π − a、傾きは −rot）
        const [ox, oy, r, th, a0, a1, sqy, rot] = A.smear;
        const c0 = back ? [ks.x - ox, ks.y + oy, r, th, Math.PI - a0, Math.PI - a1, sqy, -rot] : [ks.x + ox, ks.y + oy, r, th, a0, a1, sqy, rot];
        smear(F, c0);
      }
      if (back) katana(F, hand, dir, A.len);
      kimonoArm(F, ks, hand, armSide * 1.5, 'red', { sleeve: p.arm !== 'raise' && p.arm !== 'up' });
      if (!back) katana(F, hand, dir, A.len);
    }
    // 頭
    if (!back) {
      F.fill('hair', (m) => m.ellipse(cx, hy - 1, 7.6, 7.8), { k: 1.6 });
      F.fill('skin', (m) => { m.ellipse(cx, hy + 1.2, 6.1, 6.4); m.rect(cx - 1.5, hy + 6, 3, 3); }, { k: 1.8 });
      // 前髪（ぎざぎざ）と横の髪
      F.fill('hair', (m) => {
        m.ellipse(cx, hy - 3.2, 7.3, 4.8);
        m.cut().rect(0, hy - 1.5, 64, 20).add();
        m.poly([cx - 7, hy - 2, cx - 4.5, hy - 2, cx - 5.5, hy + 1.5]);
        m.poly([cx - 4, hy - 2, cx - 0.5, hy - 2, cx - 2.5, hy + 0.6]);
        m.poly([cx + 0.5, hy - 2, cx + 4, hy - 2, cx + 2.2, hy + 0.8]);
        m.poly([cx + 4.5, hy - 2, cx + 7, hy - 2, cx + 5.8, hy + 1.8]);
        m.capsule(cx - 6.6, hy - 2, cx - 6.4, hy + 4.5, 1.2, 0.8);
        m.capsule(cx + 6.6, hy - 2, cx + 6.4, hy + 4.5, 1.2, 0.8);
      }, { k: 1.5 });
      // 目・眉・口
      F.deco('black', 4, (m) => { m.rect(cx - 3.5, hy + 1, 1, 2); m.rect(cx + 2.5, hy + 1, 1, 2); });
      F.deco('white', 0, (m) => { m.dot(cx - 2.5, hy + 1); m.dot(cx + 3.5, hy + 1); });
      F.deco('hair', 2, (m) => { m.line(cx - 4.5, hy - 0.4, cx - 2.5, hy - 0.4); m.line(cx + 2, hy - 0.4, cx + 4, hy - 0.4); });
      F.deco('skin', 3, (m) => { m.line(cx - 0.5, hy + 4.5, cx + 0.5, hy + 4.5); });
      F.deco('red', 1, (m) => { m.dot(cx - 4.5, hy + 3); m.dot(cx + 4.5, hy + 3); });
    } else {
      F.fill('hair', (m) => { m.ellipse(cx, hy - 0.5, 7.6, 8); m.capsule(cx - 5.5, hy + 2, cx - 5, hy + 7, 1.6, 1); m.capsule(cx + 5.5, hy + 2, cx + 5, hy + 7, 1.6, 1); }, { k: 1.6 });
      F.deco('hair', 3, (m) => { m.line(cx - 2, hy - 4, cx - 3, hy + 5); m.line(cx + 2, hy - 4, cx + 3, hy + 5); });
    }
    // 髷（まげ）と赤い紐
    F.fill('hair', (m) => { m.ellipse(cx, hy - 9, 3, 2.5); m.capsule(cx, hy - 9, cx + (back ? 0 : 0), hy - 6.5, 1.6); }, { k: 1.4 });
    F.deco('red', 1, (m) => m.line(cx - 1.5, hy - 7.2, cx + 1.5, hy - 7.2));
    // 鉢巻（額に白い帯）
    F.fill('white', (m) => m.rect(cx - 7.4, hy - 3.8, 14.8, 1.5), { k: 0.8, line: false, dark: 1 });
    if (back) {
      // 結び目と尻尾（後ろに垂れて、なびく）
      F.fill('white', (m) => { m.ellipse(cx + 0.5, hy - 3, 1.5, 1.3); m.capsule(cx + 0.5, hy - 2.5, cx - 2 + tail, hy + 6, 0.75, 0.55); m.capsule(cx + 1, hy - 2.5, cx + 3 + tail * 0.7, hy + 5, 0.75, 0.5); }, { k: 1, dark: 1 });
    }
  }

  function samSide(F, p) {
    const c = p.crouch ?? 0, b = p.bob ?? 0, cx = 31 + (p.lean ?? 0) * 0.3, jump = p.jump ?? 0;
    const hipY = 38 + c - jump, sy = 26 + b + c * 0.8 - jump, hy = 17 + b + c * 0.8 + (p.headDy ?? 0) - jump;
    const lean = p.lean ?? 0, tail = p.tail ?? 0;
    const A = SAM_ARM[p.arm ?? 'low'];
    const ux = cx + lean; // 上半身の中心
    // 鉢巻の尻尾（後ろ = 左へなびく）
    F.fill('white', (m) => { m.capsule(ux - 6, hy - 3, ux - 11 - tail, hy - 1 - tail * 0.5, 0.75, 0.55); m.capsule(ux - 6, hy - 2.5, ux - 10 - tail * 0.6, hy + 3 - tail * 0.4, 0.75, 0.5); }, { k: 1, dark: 1 });
    // 奥の腕（左手）
    const fsh = V(ux - 1, sy + 1.5);
    const fh = p.arm === 'sheath' ? V(ux + 3, hipY + 1) : p.free === 'up' ? V(ux - 2, sy - 6) : V(ux - 3 + (p.freeSwing ?? 0), hipY + 1);
    kimonoArm(F, fsh, fh, -1.2, 'red', { dark: 1 });
    // 鞘（奥の腰から後ろへ）
    if (p.arm !== 'sheath') saya(F, V(ux - 1, hipY), V(ux - 13, hipY + 5), { dark: 1 });
    // 足（前後に開く）
    const fA = p.fa ?? 0, fB = p.fb ?? 0; // 前足・後ろ足の x のずれ
    const footY = 58 - jump * 0.3;
    F.fill('black', (m) => m.ellipse(cx + 1 + fB, footY - (p.lb ?? 0), 2.8, 1.5), { k: 1.2, dark: 1 });
    // 袴（横から: 前と後ろの裾が足に合わせて開く）
    const hem = 56 - jump * 0.3;
    F.fill('hakama', (m) => m.poly([ux - 6.5, hipY, ux + 5.5, hipY, cx + 7 + Math.max(fA, fB) * 1.1, hem - Math.min(p.la ?? 0, p.lb ?? 0) * 0.6, cx - 7 + Math.min(fA, fB) * 1.1, hem - Math.max(p.la ?? 0, p.lb ?? 0) * 0.6]), { k: 1.2 });
    F.deco('hakama', 3, (m) => { m.line(ux - 1, hipY + 3, cx + fB * 0.8, hem - 1); m.line(ux + 2, hipY + 3, cx + 3 + fA * 0.9, hem - 1); });
    F.fill('black', (m) => m.ellipse(cx + 2 + fA, footY - (p.la ?? 0), 2.8, 1.5), { k: 1.2 });
    // 上着
    F.fill('red', (m) => m.poly([ux - 6.5, sy + 1, ux - 3.5, sy - 0.8, ux + 3.5, sy - 0.8, ux + 6.5, sy + 1.5, ux + 6, hipY + 0.5, ux - 6.5, hipY + 0.5]), { k: 1.3 });
    F.fill('white', (m) => m.poly([ux + 2, sy - 0.8, ux + 4.2, sy - 0.6, ux + 3.2, sy + 5]), { line: false, k: 1 });
    F.deco('gold', 1, (m) => m.line(ux + 1.5, sy - 0.5, ux + 3, sy + 6));
    F.fill('black', (m) => m.rect(ux - 6.5, hipY - 1.5, 13, 3), { k: 1, flat: true });
    F.deco('gold', 2, (m) => m.line(ux - 6, hipY - 0.5, ux + 5.5, hipY - 0.5));
    // 頭（横顔）
    F.fill('hair', (m) => m.ellipse(ux - 1, hy - 0.5, 7.2, 7.8), { k: 1.6 });
    F.fill('skin', (m) => { m.ellipse(ux + 1.8, hy + 1.4, 5, 6.2); m.rect(ux + 5.5, hy + 1.5, 1.2, 1.4); m.rect(ux - 0.5, hy + 6, 3, 3); }, { k: 1.8 });
    F.fill('hair', (m) => {
      m.ellipse(ux - 0.5, hy - 3, 7, 4.8);
      m.cut().rect(ux + 1, hy - 1.2, 20, 20).add();
      m.poly([ux + 2, hy - 2.5, ux + 6.5, hy - 2.5, ux + 5, hy + 0.5]);
      m.poly([ux - 1, hy - 2, ux + 2.5, hy - 2, ux + 1.2, hy + 3]);
      m.ellipse(ux - 3.2, hy + 1.5, 3.8, 5.6);
    }, { k: 1.5 });
    F.deco('black', 4, (m) => m.rect(ux + 3.5, hy + 1, 1, 2));
    F.deco('white', 0, (m) => m.dot(ux + 4.5, hy + 1));
    F.deco('hair', 2, (m) => m.line(ux + 2.5, hy - 0.5, ux + 4.5, hy - 0.5));
    F.deco('skin', 3, (m) => m.dot(ux + 5, hy + 4.5));
    F.fill('hair', (m) => m.ellipse(ux - 3, hy - 8.6, 2.8, 2.4), { k: 1.4 });
    F.deco('red', 1, (m) => m.line(ux - 1.5, hy - 7.8, ux - 0.5, hy - 6.5));
    F.fill('white', (m) => { m.poly([ux - 7.5, hy - 4.1, ux + 6, hy - 4.1, ux + 6, hy - 2.7, ux - 7.5, hy - 2.5]); }, { k: 0.8, line: false, dark: 1 });
    F.fill('white', (m) => m.ellipse(ux - 7, hy - 3, 1.4, 1.2), { k: 1, dark: 1 });
    // 手前の腕（右手）と刀
    const ks = V(ux + 0.5, sy + 1.8);
    if (p.arm === 'sheath') {
      saya(F, V(ux + 3, hipY + 0.5), V(ux - 11, hipY + 5), { hilt: true });
      kimonoArm(F, ks, V(ux + 6, hipY - 2), 1.2, 'red', {});
    } else {
      const S = SIDE_ARM[p.arm ?? 'low'];
      const hand = V(ks.x + S.h[0], ks.y + S.h[1]), dir = unit(S.dir[0], S.dir[1]);
      if (p.smear && S.smear) { const [ox, oy, ...rest] = S.smear; smear(F, [ks.x + ox, ks.y + oy, ...rest]); }
      kimonoArm(F, ks, hand, 1.4, 'red', { sleeve: p.arm !== 'raise' && p.arm !== 'up', sway: -0.6 });
      katana(F, hand, dir, S.len);
    }
  }
  // 横向きの刀の腕（右向き。手の位置は肩からの相対）
  const SIDE_ARM = {
    low: { h: [5, 10], dir: [0.8, 0.6], len: 19 },
    raise: { h: [-5, -6], dir: [-0.55, -0.83], len: 18 },
    swing: { h: [9, 3], dir: [1, -0.1], len: 20, smear: [2, 3, 21, 6, -1.9, 0.1, 1, 0] },
    follow: { h: [7, 11], dir: [0.72, 0.7], len: 19, smear: [2, 3, 21, 4, -1.2, 0.8, 1, 0] },
    iaiOut: { h: [11, 1], dir: [1, 0.02], len: 20, smear: [3, 9, 19, 4, 2.9, 0.1, 0.28, 0] },
    up: { h: [1, -8], dir: [0.1, -1], len: 17 },
    hurt: { h: [-6, 8], dir: [-0.4, 0.9], len: 18 },
  };

  // ---------------- 動きの定義（コマごとの姿勢）----------------
  // 侍: dir ごとに姿勢の並びを返す
  const RUN6 = [0, 1, 2, 3, 4, 5];
  const SAM_ANIMS = {
    idle: { fps: 5, loop: true, poses: [{ tail: 0 }, { tail: 0.6 }, { bob: 1, tail: 1 }, { bob: 1, tail: 0.4 }] },
    run: {
      fps: 12, loop: true,
      poses: RUN6.map((i) => {
        const ph = (i / 6) * Math.PI * 2, s = Math.sin(ph), c2 = Math.cos(ph);
        return {
          fb: { fl: Math.max(0, s) * 4.5, fr: Math.max(0, -s) * 4.5, sway: s * 1.2, bob: Math.abs(c2) > 0.5 ? 1 : 0, tail: 1.5 + s * 1.2, freeDy: -s * 2.5 },
          side: { fa: c2 * 6.5, fb: -c2 * 6.5, la: Math.max(0, s) * 4, lb: Math.max(0, -s) * 4, bob: Math.abs(c2) > 0.5 ? 1 : 0, lean: 2.5, tail: 2.5 + s, freeSwing: -c2 * 4 },
        };
      }),
    },
    slash: { fps: 16, loop: false, poses: [{ arm: 'raise', tail: 0.5 }, { arm: 'swing', smear: true, crouch: 1, tail: 1.5 }, { arm: 'follow', smear: true, crouch: 1, tail: 2 }, { arm: 'follow', crouch: 1, tail: 1 }] },
    cast: { fps: 6, loop: true, poses: [{ arm: 'sheath', crouch: 2, headDy: 1, tail: 0.5 }, { arm: 'sheath', crouch: 2, headDy: 1, tail: 1 }] },
    iai: { fps: 18, loop: false, poses: [{ arm: 'iaiOut', smear: true, crouch: 2, tail: 2 }, { arm: 'iaiOut', smear: true, crouch: 1, tail: 2.5 }, { arm: 'iaiOut', crouch: 1, tail: 1.5 }] },
    hurt: { fps: 1, loop: false, poses: [{ arm: 'hurt', headDy: -1, bob: -1, tail: -1 }] },
    jump: { fps: 1, loop: false, poses: [{ jump: 3, fl: 3, fr: 3, la: 3, lb: 3, fa: 3, fb: -3, tail: -1.5, free: 'up' }, { jump: 1, fl: 1, fr: 2, la: 1, lb: 2, tail: -0.5 }] },
    buff: { fps: 8, loop: false, poses: [{ arm: 'up', free: 'up', tail: 1 }, { arm: 'up', free: 'up', tail: 1.8, bob: -1 }] },
  };

  // ---------------- タンク（ナイト風。64×64）----------------
  function tankFB(F, p, back) {
    const b = p.bob ?? 0, cx = 32, c = p.crouch ?? 0;
    const hipY = 37 + c, sy = 24 + b + c * 0.8, hy = 16 + b + c * 0.8;
    const sway = p.sway ?? 0;
    const sh = back ? -1 : 1; // 盾の側（本人の左腕 = 正面では画面の右）
    // マント（背中）
    F.fill('red', (m) => m.poly([cx - 8, sy, cx + 8, sy, cx + 10 + (p.cape ?? 0), 55, cx - 10 + (p.cape ?? 0), 55]), { k: 1.2, dark: back ? 0 : 1 });
    // 盾（背面では体の奥）
    const shield = () => {
      const sc = V(cx + sh * 11, sy + 10 + (p.shieldDy ?? 0));
      F.fill('gold', (m) => m.poly([sc.x - 6, sc.y - 8, sc.x + 6, sc.y - 8, sc.x + 6, sc.y + 2, sc.x, sc.y + 10, sc.x - 6, sc.y + 2]), { k: 1.3 });
      if (!back) {
        F.fill('blue', (m) => m.poly([sc.x - 4.6, sc.y - 6.6, sc.x + 4.6, sc.y - 6.6, sc.x + 4.6, sc.y + 1.5, sc.x, sc.y + 8, sc.x - 4.6, sc.y + 1.5]), { k: 1.2, line: false });
        F.deco('white', 1, (m) => { m.rect(sc.x - 0.5, sc.y - 5, 2, 10); m.rect(sc.x - 3, sc.y - 2, 7, 2); });
      } else F.deco('leather', 2, (m) => { m.rect(sc.x - 3, sc.y - 4, 7, 2); m.rect(sc.x - 3, sc.y + 1, 7, 2); });
    };
    if (back) shield();
    // 脚（すね当て）
    const leg = (s, lift) => F.fill('steel', (m) => { m.capsule(cx + s * 4 + sway, hipY + 2, cx + s * 4.5 + sway, 55 - lift, 2.6, 2.3); m.ellipse(cx + s * 4.8 + sway, 57 - lift, 3, 1.8); }, { k: 1.5 });
    leg(-1, p.fl ?? 0); leg(1, p.fr ?? 0);
    // 胴（鎧）と陣羽織（青）
    F.fill('steel', (m) => m.poly([cx - 8, sy + 1, cx - 6, sy - 1, cx + 6, sy - 1, cx + 8, sy + 1, cx + 7, hipY + 2, cx - 7, hipY + 2]), { k: 1.6 });
    F.fill('blue', (m) => m.poly([cx - 5.5, sy + 3, cx + 5.5, sy + 3, cx + 6, hipY + 9, cx - 6, hipY + 9]), { k: 1.3 });
    F.deco('gold', 1, (m) => { m.line(cx - 5.5, sy + 3, cx - 6, hipY + 8.5); m.line(cx + 5.5, sy + 3, cx + 6, hipY + 8.5); m.line(cx - 6, hipY + 8.5, cx + 6, hipY + 8.5); });
    if (!back) F.deco('gold', 2, (m) => { m.rect(cx - 0.5, sy + 6, 2, 6); m.rect(cx - 2.5, sy + 8, 6, 2); });
    F.fill('leather', (m) => m.rect(cx - 7.5, hipY - 1, 15, 2.5), { k: 1, flat: true });
    F.deco('gold', 1, (m) => m.rect(cx - 1, hipY - 1, 2, 2));
    // 肩当て
    F.fill('steel', (m) => { m.ellipse(cx - 8.5, sy + 1.5, 4.2, 3.4); m.ellipse(cx + 8.5, sy + 1.5, 4.2, 3.4); }, { k: 1.8 });
    F.deco('gold', 1, (m) => { m.line(cx - 12, sy + 3.5, cx - 5, sy + 3.5); m.line(cx + 5, sy + 3.5, cx + 12, sy + 3.5); });
    // 剣の腕（本人の右 = 正面では画面の左）
    const as = back ? 1 : -1;
    const hand = p.atk === 1 ? V(cx + as * 5, sy - 6) : p.atk === 2 ? V(cx - as * 4, hipY + 2) : V(cx + as * 10, hipY + 1);
    const sw = p.atk === 1 ? unit(-as * 0.3, -1) : p.atk === 2 ? unit(-as * 0.9, 0.4) : unit(as * 0.25, 1);
    const swordDraw = () => {
      const g = add(hand, sw, 1.5), b0 = add(hand, sw, 2.5), b1 = add(hand, sw, 17);
      F.fill('steel', (m) => { m.capsule(b0.x, b0.y, b1.x, b1.y, 1.3, 0.7); }, { k: 1.1 });
      F.deco('steel', 0, (m) => m.line(b0.x, b0.y, b1.x - sw.x * 2, b1.y - sw.y * 2));
      const n = perp(sw);
      F.fill('gold', (m) => m.capsule(g.x - n.x * 3, g.y - n.y * 3, g.x + n.x * 3, g.y + n.y * 3, 0.9), { k: 1 });
    };
    if (back) swordDraw();
    F.fill('steel', (m) => { m.capsule(cx + as * 8.5, sy + 3, hand.x, hand.y, 2.3, 2); }, { k: 1.6 });
    F.fill('leather', (m) => m.ellipse(hand.x, hand.y, 2, 2), { k: 1.3 });
    if (!back) swordDraw();
    // 盾の腕
    F.fill('steel', (m) => m.capsule(cx - as * 8.5, sy + 3, cx - as * 10, sy + 10 + (p.shieldDy ?? 0), 2.3, 2), { k: 1.6 });
    // 兜
    F.fill('steel', (m) => { m.ellipse(cx, hy, 7, 7.4); m.rect(cx - 6, hy, 12, 6); }, { k: 1.8 });
    if (!back) {
      F.fill('black', (m) => m.rect(cx - 4.5, hy + 0.5, 9, 2), { k: 1, flat: true, line: false });
      F.deco('steel', 1, (m) => m.line(cx, hy - 6, cx, hy + 5));
    }
    F.fill('red', (m) => { m.capsule(cx, hy - 7, cx - (p.plume ?? 0) * (back ? -1 : 1) * 0 + 1, hy - 11, 1.8, 1.4); m.capsule(cx + 1, hy - 11, cx + 5 + (p.plume ?? 0), hy - 8, 1.4, 0.8); }, { k: 1.3 });
    if (!back) shield();
  }
  function tankSide(F, p) {
    const b = p.bob ?? 0, cx = 31, c = p.crouch ?? 0;
    const hipY = 37 + c, sy = 24 + b + c * 0.8, hy = 16 + b + c * 0.8, lean = p.lean ?? 0, ux = cx + lean;
    // マント
    F.fill('red', (m) => m.poly([ux - 3, sy, ux + 1, sy, ux - 5 + (p.cape ?? 0), 54, ux - 10 + (p.cape ?? 0) * 1.5, 53]), { k: 1.2, dark: 1 });
    // 奥の脚・手前の脚
    F.fill('steel', (m) => { m.capsule(cx + (p.fb ?? 0) * 0.6, hipY + 2, cx + (p.fb ?? 0), 55 - (p.lb ?? 0), 2.5, 2.2); m.ellipse(cx + 1.5 + (p.fb ?? 0), 57 - (p.lb ?? 0), 3.2, 1.8); }, { k: 1.5, dark: 1 });
    F.fill('steel', (m) => { m.capsule(cx + (p.fa ?? 0) * 0.6, hipY + 2, cx + (p.fa ?? 0), 55 - (p.la ?? 0), 2.5, 2.2); m.ellipse(cx + 1.5 + (p.fa ?? 0), 57 - (p.la ?? 0), 3.2, 1.8); }, { k: 1.5 });
    // 剣の腕（奥 = 本人の右。右向きでは奥）
    const hand = p.atk === 1 ? V(ux - 3, sy - 7) : p.atk === 2 ? V(ux + 11, sy + 6) : V(ux + 2, hipY + 1);
    const sw = p.atk === 1 ? unit(-0.5, -0.9) : p.atk === 2 ? unit(1, 0.25) : unit(0.9, 0.45);
    F.fill('steel', (m) => m.capsule(ux, sy + 3, hand.x, hand.y, 2.2, 2), { k: 1.6, dark: 1 });
    const b0 = add(hand, sw, 2.5), b1 = add(hand, sw, 17);
    F.fill('steel', (m) => m.capsule(b0.x, b0.y, b1.x, b1.y, 1.3, 0.7), { k: 1.1 });
    F.deco('steel', 0, (m) => m.line(b0.x, b0.y, b1.x - sw.x * 2, b1.y - sw.y * 2));
    const n = perp(sw), g = add(hand, sw, 1.5);
    F.fill('gold', (m) => m.capsule(g.x - n.x * 3, g.y - n.y * 3, g.x + n.x * 3, g.y + n.y * 3, 0.9), { k: 1 });
    // 胴
    F.fill('steel', (m) => m.poly([ux - 5, sy + 1, ux - 3, sy - 1, ux + 4, sy - 1, ux + 6, sy + 1, ux + 5, hipY + 2, ux - 5, hipY + 2]), { k: 1.6 });
    F.fill('blue', (m) => m.poly([ux + 1, sy + 3, ux + 5.5, sy + 3, ux + 6, hipY + 9, ux + 0.5, hipY + 9]), { k: 1.3 });
    F.deco('gold', 1, (m) => { m.line(ux + 5.5, sy + 3, ux + 6, hipY + 8.5); m.line(ux + 0.5, hipY + 8.5, ux + 6, hipY + 8.5); });
    F.fill('leather', (m) => m.rect(ux - 5, hipY - 1, 11, 2.5), { k: 1, flat: true });
    F.fill('steel', (m) => m.ellipse(ux - 0.5, sy + 1.5, 4.4, 3.6), { k: 1.8 });
    // 兜
    F.fill('steel', (m) => { m.ellipse(ux, hy, 6.8, 7.4); m.rect(ux - 5.5, hy, 11, 6); }, { k: 1.8 });
    F.fill('black', (m) => m.rect(ux + 2.5, hy + 0.5, 4, 2), { k: 1, flat: true, line: false });
    F.fill('red', (m) => { m.capsule(ux, hy - 7, ux - 1, hy - 11, 1.8, 1.4); m.capsule(ux - 1, hy - 11, ux - 6 - (p.plume ?? 0), hy - 8, 1.4, 0.8); }, { k: 1.3 });
    // 盾（手前 = 本人の左腕。右向きでは手前）
    const sc = V(ux + 6 + (p.block ? 2 : 0), sy + 9 + (p.shieldDy ?? 0));
    F.fill('steel', (m) => m.capsule(ux + 0.5, sy + 3, sc.x - 2, sc.y, 2.3, 2), { k: 1.6 });
    F.fill('gold', (m) => m.poly([sc.x - 2.2, sc.y - 8, sc.x + 2.2, sc.y - 8, sc.x + 2.2, sc.y + 2, sc.x, sc.y + 9, sc.x - 2.2, sc.y + 2]), { k: 1.3 });
    F.fill('blue', (m) => m.poly([sc.x - 1, sc.y - 6.5, sc.x + 1, sc.y - 6.5, sc.x + 1, sc.y + 1.5, sc.x, sc.y + 6.5, sc.x - 1, sc.y + 1.5]), { k: 1, line: false });
  }
  const TANK_ANIMS = {
    idle: { fps: 4, loop: true, poses: [{}, { cape: 0.5 }, { bob: 1, cape: 1 }, { bob: 1, cape: 0.5 }] },
    run: {
      fps: 11, loop: true,
      poses: RUN6.map((i) => {
        const ph = (i / 6) * Math.PI * 2, s = Math.sin(ph), c2 = Math.cos(ph);
        return {
          fb: { fl: Math.max(0, s) * 3, fr: Math.max(0, -s) * 3, bob: Math.abs(c2) > 0.5 ? 0 : 1, cape: -1.5 + s * 0.5, plume: 1 },
          side: { fa: c2 * 5, fb: -c2 * 5, la: Math.max(0, s) * 3, lb: Math.max(0, -s) * 3, bob: Math.abs(c2) > 0.5 ? 0 : 1, lean: 1.5, cape: -2 + s * 0.8, plume: 1.5 },
        };
      }),
    },
    slash: { fps: 12, loop: false, poses: [{ atk: 1 }, { atk: 2, crouch: 1 }, { atk: 2, crouch: 1 }, { atk: 0 }] },
    hurt: { fps: 1, loop: false, poses: [{ bob: -1, shieldDy: -3, block: true }] },
    // 自分がナイトのとき: 詠唱（剣を掲げる）・魔法（振り下ろす）・強化（剣と盾を掲げる）・ジャンプ
    cast: { fps: 6, loop: true, poses: [{ atk: 1, cape: 0.5 }, { atk: 1, bob: 1, cape: 1 }] },
    spell: { fps: 12, loop: false, poses: [{ atk: 1, crouch: -1 }, { atk: 2, crouch: 1 }, { atk: 2, crouch: 1 }, { atk: 0 }] },
    buff: { fps: 8, loop: false, poses: [{ atk: 1, shieldDy: -4 }, { atk: 1, shieldDy: -5, bob: -1 }] },
    jump: { fps: 1, loop: false, poses: [{ fl: 3, fr: 3, la: 3, lb: 3, fa: 3, fb: -3, bob: -1, cape: -2 }, { fl: 1, fr: 2, la: 1, lb: 2, cape: -1 }] },
  };

  // ---------------- 白魔道士（白いフードのローブと杖。64×64、足元 y=59）----------------
  // p: { bob, sway, fl, fr, staff, free, orb（杖の玉の光）, tail（フードの先の揺れ）, jump, headDy }
  // 杖を持つ腕: 手の位置（肩からの相対。正面の向きで書き、背面では左右反転）・杖の向き（手 → 先）・先までの長さ・石突きまでの長さ
  const WHM_STAFF = {
    rest: { h: [-3, 12], dir: [0.04, -1], up: 27, down: 17 },
    raise: { h: [-2, -5], dir: [0.1, -1], up: 14, down: 14 },
    forward: { h: [-8, 2], dir: [-0.5, -0.87], up: 17, down: 10 },
    up: { h: [1, -10], dir: [0, -1], up: 12, down: 12 },
    hurt: { h: [-6, 8], dir: [-0.4, -0.92], up: 22, down: 12 },
  };
  const WHM_SIDE = {
    rest: { h: [3, 11], dir: [0.05, -1], up: 27, down: 17 },
    raise: { h: [6, -4], dir: [0.25, -0.97], up: 14, down: 12 },
    forward: { h: [10, 0], dir: [0.8, -0.6], up: 14, down: 8 },
    up: { h: [2, -9], dir: [0.05, -1], up: 12, down: 12 },
    hurt: { h: [-4, 8], dir: [-0.4, -0.9], up: 22, down: 12 },
  };
  // 杖（手 h、先への向き dir）。先に金の輪と光る玉
  function staff(F, h, dir, up, down, o = {}) {
    const b = add(h, dir, -down), t = add(h, dir, up), head = add(t, dir, 2.6);
    F.fill('wood', (m) => m.capsule(b.x, b.y, t.x, t.y, 0.9, 1.0), { k: 1.1 });
    const r = 1.9 + (o.orb ?? 0) * 0.8;
    F.fill('aura', (m) => m.ellipse(head.x, head.y, r, r), { flat: true, line: false, k: 1 });
    F.fill('gold', (m) => {
      m.ellipse(head.x, head.y, 3.3, 3.3); m.cut().ellipse(head.x, head.y, 2.0, 2.0).add();
      m.capsule(t.x, t.y, head.x - dir.x * 2.6, head.y - dir.y * 2.6, 1.1);
      m.capsule(b.x, b.y, b.x + dir.x * 1.5, b.y + dir.y * 1.5, 1.05);
    }, { k: 1.3 });
  }
  // ローブの腕（肩 s → 手 h）。袖は手に向かって広がり、袖口が赤い。手は杖を描いた後に別に描く
  function robeArm(F, s, h, bend, o = {}) {
    const mid = V((s.x + h.x) / 2, (s.y + h.y) / 2), d = unit(h.x - s.x, h.y - s.y), n = perp(d);
    const e = add(mid, n, bend), c = add(h, d, -1.3);
    F.fill('white', (m) => { m.capsule(s.x, s.y, e.x, e.y, 2.4, 2.6); m.capsule(e.x, e.y, c.x, c.y, 2.6, 3.2); }, { k: 1.5, dark: o.dark ?? 0 });
    const id = F.last, q = add(c, d, 0.2);
    F.deco('red', 2 + (o.dark ?? 0), (m) => m.capsule(q.x - n.x * 4, q.y - n.y * 4, q.x + n.x * 4, q.y + n.y * 4, 0.9), { only: id });
  }
  const hand = (F, h, dark = 0) => F.fill('skin', (m) => m.ellipse(h.x, h.y, 1.7, 1.6), { k: 1.3, dark });
  // 裾の赤い三角模様
  const hemTri = (m, x0, x1, hem) => { m.rect(x0, hem - 0.6, x1 - x0, 1.2); for (let x = x0 + 1.2; x < x1 - 0.6; x += 2.4) m.poly([x - 1.2, hem + 0.2, x + 1.2, hem + 0.2, x, hem - 2.6]); };

  function whmFB(F, p, back) {
    const b = p.bob ?? 0, cx = 32, jump = p.jump ?? 0, sway = p.sway ?? 0, tail = p.tail ?? 0;
    const hipY = 38 - jump, sy = 26 + b - jump, hy = 17 + b + (p.headDy ?? 0) - jump;
    const armSide = back ? 1 : -1, mir = back ? -1 : 1; // 杖を持つ腕（本人の右手。正面では画面の左）
    const S = WHM_STAFF[p.staff ?? 'rest'];
    const ks = V(cx + armSide * 7, sy + 1.5);
    const hd = V(ks.x + S.h[0] * mir, ks.y + S.h[1]), dir = unit(S.dir[0] * mir, S.dir[1]);
    // 背面: 杖は体の奥
    if (back) { staff(F, hd, dir, S.up, S.down, p); }
    // 靴
    const footY = 58 - jump * 0.3;
    F.fill('leather', (m) => { m.ellipse(cx - 4 + sway, footY - (p.fl ?? 0), 2.4, 1.5); m.ellipse(cx + 4 + sway, footY - (p.fr ?? 0), 2.4, 1.5); }, { k: 1.2, dark: 1 });
    // ローブ（裾が広がる）
    const hem = 56.5 - jump * 0.3 - Math.max(p.fl ?? 0, p.fr ?? 0) * 0.35;
    F.fill('white', (m) => m.poly([cx - 7, sy - 0.5, cx + 7, sy - 0.5, cx + 11 + sway, hem, cx - 11 + sway, hem]), { k: 1.2 });
    const robe = F.last;
    F.deco('red', 2, (m) => hemTri(m, cx - 11 + sway, cx + 11 + sway, hem - 0.6), { only: robe });
    if (!back) F.deco('red', 2, (m) => m.line(cx, sy + 7, cx + sway * 0.6, hem - 2), { only: robe });
    else F.deco('red', 2, (m) => { m.poly([cx - 3.5, sy + 9, cx + 3.5, sy + 9, cx, sy + 14]); }, { only: robe });
    // 腰の紐（金）
    F.deco('gold', 1, (m) => { m.line(cx - 7, hipY - 1, cx + 7, hipY - 1); if (!back) { m.line(cx + 2, hipY - 1, cx + 2.5, hipY + 4); m.dot(cx + 2.5, hipY + 5); } }, { only: robe });
    // 杖を持たない腕（本人の左手）
    const fs = V(cx - armSide * 7, sy + 1.5);
    const fh = p.free === 'up' ? V(cx - armSide * 11, sy - 7) : p.free === 'forward' ? V(cx - armSide * 12.5, sy + 1) : p.free === 'chest' ? V(cx - armSide * 2.5, sy + 6) : V(cx - armSide * 9, hipY + 1 + (p.freeDy ?? 0));
    robeArm(F, fs, fh, -armSide * 1.5);
    hand(F, fh);
    // フード（頭の後ろと肩に掛かる部分。先が少しとがる）
    F.fill('white', (m) => {
      m.ellipse(cx, hy - 0.5, 8.4, 8.8);
      m.poly([cx - 8, hy + 1, cx + 8, hy + 1, cx + 9.5, sy + 3, cx - 9.5, sy + 3]);
      m.poly([cx - 3, hy - 7.5, cx + 3, hy - 7.5, cx + 1.5 + tail * 0.4, hy - 10.5]);
    }, { k: 1.5 });
    const hood = F.last;
    if (!back) {
      // 顔と前髪
      F.fill('skin', (m) => m.ellipse(cx, hy + 1.8, 5.4, 5.7), { k: 1.8 });
      F.fill('leather', (m) => {
        m.ellipse(cx, hy - 2, 5.7, 3.2); m.cut().rect(0, hy - 0.2, 64, 20).add();
        m.poly([cx - 5.2, hy - 1, cx - 2, hy - 1, cx - 3.9, hy + 2]);
        m.poly([cx + 2, hy - 1, cx + 5.2, hy - 1, cx + 3.9, hy + 2]);
        m.poly([cx - 1.6, hy - 1, cx + 1.6, hy - 1, cx, hy + 0.9]);
      }, { k: 1.4 });
      // フードの縁（赤）
      F.deco('red', 2, (m) => m.band(cx, hy + 1.8, 5.9, 7.3, Math.PI * 0.96, Math.PI * 2.04), { only: hood });
      F.deco('red', 3, (m) => { m.line(cx - 7.2, hy + 2, cx - 8.6, sy + 2.5); m.line(cx + 7.2, hy + 2, cx + 8.6, sy + 2.5); }, { only: hood });
      // 目・口・頬
      F.deco('black', 4, (m) => { m.rect(cx - 3, hy + 2, 1, 2); m.rect(cx + 2, hy + 2, 1, 2); });
      F.deco('white', 0, (m) => { m.dot(cx - 2, hy + 2); m.dot(cx + 3, hy + 2); });
      F.deco('skin', 3, (m) => m.line(cx - 0.5, hy + 5.3, cx + 0.5, hy + 5.3));
      F.deco('red', 0, (m) => { m.dot(cx - 3.8, hy + 4); m.dot(cx + 3.8, hy + 4); });
    } else {
      // 背面: フードの先が背中に垂れる（赤の縁取り）
      F.fill('white', (m) => m.poly([cx - 4.5, hy + 3, cx + 4.5, hy + 3, cx + 1 + tail * 0.6, sy + 11, cx - 1 + tail * 0.6, sy + 11]), { k: 1.3 });
      const flap = F.last;
      F.deco('red', 2, (m) => { m.line(cx - 4.5, hy + 3, cx - 1 + tail * 0.6, sy + 11); m.line(cx + 4.5, hy + 3, cx + 1 + tail * 0.6, sy + 11); m.line(cx - 1 + tail * 0.6, sy + 11, cx + 1 + tail * 0.6, sy + 11); }, { only: flap });
      F.deco('white', 3, (m) => m.line(cx, hy - 7, cx, hy + 2), { only: hood });
    }
    // 杖を持つ腕と杖（正面: 杖は体の手前）
    robeArm(F, ks, hd, armSide * 1.2);
    if (!back) staff(F, hd, dir, S.up, S.down, p);
    hand(F, hd);
  }

  function whmSide(F, p) {
    const b = p.bob ?? 0, jump = p.jump ?? 0, lean = p.lean ?? 0, tail = p.tail ?? 0;
    const cx = 31, ux = cx + lean;
    const hipY = 38 - jump, sy = 26 + b - jump, hy = 17 + b + (p.headDy ?? 0) - jump;
    const S = WHM_SIDE[p.staff ?? 'rest'];
    const ks = V(ux + 0.5, sy + 1.8);
    const hd = V(ks.x + S.h[0], ks.y + S.h[1]), dir = unit(S.dir[0], S.dir[1]);
    // 奥の腕（左手）
    const fsh = V(ux - 1, sy + 1.5);
    const fh = p.free === 'up' ? V(ux - 1, sy - 8) : p.free === 'forward' ? V(ux + 11, sy + 1) : p.free === 'chest' ? V(ux + 5, sy + 6) : V(ux - 3 + (p.freeSwing ?? 0), hipY + 1);
    robeArm(F, fsh, fh, -1.2, { dark: 1 });
    hand(F, fh, 1);
    // 足（前後に開く）
    const fA = p.fa ?? 0, fB = p.fb ?? 0, footY = 58 - jump * 0.3;
    F.fill('leather', (m) => m.ellipse(cx + 1 + fB, footY - (p.lb ?? 0), 2.6, 1.4), { k: 1.2, dark: 2 });
    F.fill('leather', (m) => m.ellipse(cx + 2 + fA, footY - (p.la ?? 0), 2.6, 1.4), { k: 1.2, dark: 1 });
    // ローブ（横から。裾は足に合わせて前後に広がる）
    const hem = 56.5 - jump * 0.3;
    const x0 = cx - 8 + Math.min(fA, fB, 0) * 0.7, x1 = cx + 8 + Math.max(fA, fB, 0) * 0.7;
    F.fill('white', (m) => m.poly([ux - 5.5, sy - 0.5, ux + 4.5, sy - 0.5, x1, hem - Math.max(p.la ?? 0, 0) * 0.4, x0, hem - Math.max(p.lb ?? 0, 0) * 0.4]), { k: 1.2 });
    const robe = F.last;
    F.deco('red', 2, (m) => hemTri(m, x0, x1, hem - 0.6), { only: robe });
    F.deco('red', 2, (m) => m.line(ux + 4, sy + 6, x1 - 2, hem - 2), { only: robe });
    F.deco('gold', 1, (m) => m.line(ux - 5.5, hipY - 1, ux + 5, hipY - 1), { only: robe });
    // 頭（横顔）とフード
    F.fill('white', (m) => {
      m.ellipse(ux - 0.5, hy - 0.3, 7.6, 8.4);
      m.poly([ux - 6.5, hy - 1, ux - 3, hy + 6, ux - 8.5 - tail * 0.6, hy + 10 + tail * 0.3]);
      m.poly([ux - 6, hy + 2, ux + 4, hy + 2, ux + 5, sy + 3, ux - 7, sy + 3]);
      m.poly([ux - 3.5, hy - 7, ux + 1.5, hy - 8, ux - 3 - tail * 0.4, hy - 10]);
    }, { k: 1.5 });
    const hood = F.last;
    F.fill('skin', (m) => { m.ellipse(ux + 2.6, hy + 1.8, 4.2, 5.4); m.rect(ux + 5.8, hy + 2, 1.1, 1.3); }, { k: 1.8 });
    F.fill('leather', (m) => { m.ellipse(ux + 2.5, hy - 2, 4.6, 2.8); m.cut().rect(0, hy - 0.2, 64, 20).add(); m.poly([ux + 3, hy - 1.5, ux + 6.6, hy - 1.5, ux + 5.3, hy + 1.6]); }, { k: 1.4 });
    F.deco('red', 2, (m) => m.band(ux + 2.6, hy + 1.8, 5.0, 6.3, Math.PI * 0.55, Math.PI * 1.9), { only: hood });
    F.deco('white', 3, (m) => m.line(ux - 5, hy + 1, ux - 7.5 - tail * 0.6, hy + 9), { only: hood });
    F.deco('black', 4, (m) => m.rect(ux + 4, hy + 2, 1, 2));
    F.deco('white', 0, (m) => m.dot(ux + 5, hy + 2));
    F.deco('red', 0, (m) => m.dot(ux + 3.6, hy + 4.3));
    // 手前の腕（右手）と杖
    robeArm(F, ks, hd, 1.2);
    staff(F, hd, dir, S.up, S.down, p);
    hand(F, hd);
  }
  const WHM_ANIMS = {
    idle: { fps: 4, loop: true, poses: [{ tail: 0 }, { tail: 0.5, orb: 0.15 }, { bob: 1, tail: 1, orb: 0.3 }, { bob: 1, tail: 0.5, orb: 0.15 }] },
    run: {
      fps: 11, loop: true,
      poses: RUN6.map((i) => {
        const ph = (i / 6) * Math.PI * 2, s = Math.sin(ph), c2 = Math.cos(ph);
        return {
          fb: { fl: Math.max(0, s) * 3.5, fr: Math.max(0, -s) * 3.5, sway: s * 1, bob: Math.abs(c2) > 0.5 ? 1 : 0, tail: 1.5 + s, freeDy: -s * 2 },
          side: { fa: c2 * 5.5, fb: -c2 * 5.5, la: Math.max(0, s) * 3, lb: Math.max(0, -s) * 3, bob: Math.abs(c2) > 0.5 ? 1 : 0, lean: 1.5, tail: 2 + s, freeSwing: -c2 * 3 },
        };
      }),
    },
    cast: { fps: 6, loop: true, poses: [{ staff: 'raise', free: 'chest', orb: 0.8, tail: 0.5 }, { staff: 'raise', free: 'chest', orb: 1.4, bob: 1, tail: 1 }] },
    spell: { fps: 12, loop: false, poses: [{ staff: 'raise', free: 'chest', orb: 1.2 }, { staff: 'forward', free: 'forward', orb: 2, tail: 1.5 }, { staff: 'forward', free: 'forward', orb: 1.2, tail: 1 }, { staff: 'forward', orb: 0.5 }] },
    buff: { fps: 8, loop: false, poses: [{ staff: 'up', free: 'up', orb: 1 }, { staff: 'up', free: 'up', orb: 1.8, bob: -1 }] },
    hurt: { fps: 1, loop: false, poses: [{ staff: 'hurt', headDy: -1, bob: -1, tail: -1 }] },
    jump: { fps: 1, loop: false, poses: [{ jump: 3, fl: 3, fr: 3, la: 3, lb: 3, fa: 3, fb: -3, tail: -1.5, free: 'up' }, { jump: 1, fl: 1, fr: 2, la: 1, lb: 2, tail: -0.5 }] },
  };

  // ---------------- からくり木人（96×96、足元 y=90）----------------
  function dummy(F, p, view) {
    const cx = 48, b = p.bob ?? 0, hipY = 66 + b, sy = 40 + b, hy = 25 + b;
    const arm = p.arm ?? 0; // 0 下ろす / 1 振り上げ / 2 叩きつけ
    const side = view === 'right';
    const back = view === 'up';
    // 脚
    const legs = (s, dark) => F.fill('woodD', (m) => { m.capsule(cx + s * (side ? 3 : 9), hipY, cx + s * (side ? 4 : 10), 86, 4.2, 3.6); }, { k: 1.4, dark });
    const feet = (s, dark) => F.fill('brass', (m) => m.ellipse(cx + s * (side ? 5 : 10.5), 88, 6, 3), { k: 1.3, dark });
    if (side) { legs(-1, 1); feet(-1, 1); }
    // 腕（太い木の棍）
    const armAt = (s, dark) => {
      const shx = cx + s * (side ? 2 : 17), shy = sy + 4;
      const hand = arm === 1 ? V(shx + s * 6, shy - 20) : arm === 2 ? V(shx + s * 4, shy + 22) : V(shx + s * 5 + (p.sway ?? 0) * s, shy + 16);
      F.fill('woodD', (m) => m.capsule(shx, shy, hand.x, hand.y, 4.6, 4), { k: 1.5, dark });
      F.fill('brass', (m) => m.ellipse(shx, shy, 5.5, 5.2), { k: 1.7, dark });
      F.fill('wood', (m) => m.ellipse(hand.x, hand.y, 6.5, 6.5), { k: 1.8, dark });
      F.deco('brass', 2, (m) => { m.line(hand.x - 6, hand.y, hand.x + 6, hand.y); });
    };
    if (!side) armAt(back ? 1 : -1, back ? 1 : 0);
    if (side) armAt(-1, 1);
    if (!side) { legs(-1, 0); legs(1, 0); feet(-1, 0); feet(1, 0); }
    // 胴（樽）
    F.fill('wood', (m) => { m.ellipse(cx, (sy + hipY) / 2 + 2, side ? 14 : 19, 17); m.rect(cx - (side ? 13 : 18), sy, side ? 26 : 36, hipY - sy); }, { k: 2 });
    for (const x of side ? [-6, 0, 6] : [-12, -6, 0, 6, 12]) F.deco('wood', 3, (m) => m.line(cx + x, sy + 1, cx + x * 1.05, hipY + 3));
    F.fill('brass', (m) => { m.rect(cx - (side ? 14 : 19.5), sy + 5, side ? 28 : 39, 3.5); m.rect(cx - (side ? 14 : 19.5), hipY - 6, side ? 28 : 39, 3.5); }, { k: 1.4 });
    F.deco('brass', 0, (m) => { for (const x of side ? [-9, 9] : [-15, -5, 5, 15]) { m.dot(cx + x, sy + 6); m.dot(cx + x, hipY - 5); } });
    // 胸の歯車（光る芯）
    if (!back) {
      const gx = side ? cx + 9 : cx, gy = (sy + hipY) / 2 + 1;
      F.fill('brass', (m) => { m.ellipse(gx, gy, side ? 3.5 : 7, 7); for (let i = 0; i < 8; i++) { const a = (i / 8) * Math.PI * 2 + (p.gear ?? 0); m.ellipse(gx + Math.cos(a) * (side ? 3.5 : 7.5), gy + Math.sin(a) * 7.5, 1.6, 1.6); } }, { k: 1.6 });
      F.fill('glow', (m) => m.ellipse(gx, gy, side ? 2 : 3.6 + (p.core ?? 0), 3.6 + (p.core ?? 0)), { k: 1.5, flat: true });
    } else {
      F.fill('iron', (m) => m.rect(cx - 7, sy + 11, 14, 14), { k: 1.3 });
      F.deco('iron', 3, (m) => { m.line(cx - 5, sy + 14, cx + 5, sy + 14); m.line(cx - 5, sy + 18, cx + 5, sy + 18); m.line(cx - 5, sy + 22, cx + 5, sy + 22); });
    }
    // 首と頭
    F.fill('brass', (m) => m.rect(cx - 4, hy + 10, 8, 6), { k: 1.2 });
    F.fill('wood', (m) => { m.ellipse(cx, hy, side ? 11 : 13, 12); }, { k: 2 });
    F.fill('brass', (m) => { m.rect(cx - (side ? 11 : 13), hy - 2, side ? 22 : 26, 3); m.ellipse(cx, hy - 12, 4, 2.5); }, { k: 1.3 });
    if (!back) {
      const ex = side ? [cx + 7] : [cx - 5.5, cx + 5.5];
      for (const x of ex) F.fill('glow', (m) => m.ellipse(x, hy + 4, 2.2 + (p.core ?? 0) * 0.4, 2.2 + (p.core ?? 0) * 0.4), { flat: true, k: 1 });
      F.deco('woodD', 2, (m) => m.line(side ? cx + 5 : cx - 3, hy + 9, side ? cx + 9 : cx + 3, hy + 9));
    } else {
      F.deco('wood', 3, (m) => { m.line(cx - 6, hy - 6, cx - 6, hy + 8); m.line(cx + 6, hy - 6, cx + 6, hy + 8); });
    }
    if (side) { legs(1, 0); feet(1, 0); armAt(1, 0); }
    if (!side && !back) armAt(1, 0);
    if (back) armAt(-1, 0);
  }
  const DUMMY_ANIMS = {
    idle: { fps: 4, loop: true, poses: [{ gear: 0, core: 0 }, { gear: 0.2, core: 0.4, sway: 0.5 }, { gear: 0.4, core: 0.8, bob: 1, sway: 1 }, { gear: 0.6, core: 0.4, bob: 1, sway: 0.5 }] },
    cast: { fps: 8, loop: true, poses: [{ arm: 1, core: 1.4, gear: 0 }, { arm: 1, core: 2, gear: 0.4, bob: -1 }] },
    slam: { fps: 10, loop: false, poses: [{ arm: 1, core: 2 }, { arm: 2, core: 1.2, bob: 2 }, { arm: 2, core: 0.6, bob: 1 }] },
  };

  // ---------------- アトラス（全コマを 1 枚に並べる）----------------
  function canvas(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; }
  // def: { fw, fh, ax, ay, m: 1 ドットの大きさ（m）, draw: { fb(F, p, back), side(F, p) } | view(F, p, view), anims }
  function buildSet(def) {
    const views = ['down', 'up', 'right'];
    const list = [];
    const anims = {};
    for (const [name, A] of Object.entries(def.anims)) {
      anims[name] = { fps: A.fps, loop: A.loop, frames: {} };
      for (const view of views) {
        anims[name].frames[view] = A.poses.map((pose) => {
          const pp = view === 'right' ? (pose.side ?? pose) : (pose.fb ?? pose);
          list.push({ view, pose: pp });
          return list.length - 1;
        });
      }
    }
    const cols = Math.min(16, list.length), rows = Math.ceil(list.length / cols);
    const W = cols * def.fw, H = rows * def.fh;
    const atlas = canvas(W, H), emit = canvas(W, H);
    const ga = atlas.getContext('2d'), ge = emit.getContext('2d');
    const img = ga.createImageData(W, H), eim = ge.createImageData(W, H);
    list.forEach((it, i) => {
      const F = new Frame(def.fw, def.fh);
      def.draw(F, it.pose, it.view);
      const { rgba, emit: em } = F.pixels();
      const ox = (i % cols) * def.fw, oy = Math.floor(i / cols) * def.fh;
      for (let y = 0; y < def.fh; y++) {
        img.data.set(rgba.subarray(y * def.fw * 4, (y + 1) * def.fw * 4), ((oy + y) * W + ox) * 4);
        eim.data.set(em.subarray(y * def.fw * 4, (y + 1) * def.fw * 4), ((oy + y) * W + ox) * 4);
      }
    });
    ga.putImageData(img, 0, 0); ge.putImageData(eim, 0, 0);
    // 白い影（命中・被弾の光に使う。2D 用）
    const flash = canvas(W, H), gf = flash.getContext('2d');
    gf.drawImage(atlas, 0, 0); gf.globalCompositeOperation = 'source-in'; gf.fillStyle = '#ffffff'; gf.fillRect(0, 0, W, H);
    return { fw: def.fw, fh: def.fh, ax: def.ax, ay: def.ay, m: def.m, cols, rows, count: list.length, atlas, emit, flash, anims };
  }
  // コマの番号と、アトラス上の位置（左向きは右向きを左右反転）
  function frame(set, anim, dir, t) {
    const A = set.anims[anim] ?? set.anims.idle;
    const view = dir === 'left' ? 'right' : dir;
    const fr = A.frames[view] ?? A.frames.down;
    let k = Math.floor(t * A.fps);
    k = A.loop ? ((k % fr.length) + fr.length) % fr.length : Math.min(fr.length - 1, Math.max(0, k));
    const i = fr[k];
    return { i, x: (i % set.cols) * set.fw, y: Math.floor(i / set.cols) * set.fh, w: set.fw, h: set.fh, flip: dir === 'left' };
  }
  // 動きの長さ（秒）。ループしないもの
  const duration = (set, anim) => { const A = set.anims[anim]; return A ? A.frames.down.length / A.fps : 0; };

  // ---------------- 稽古場の小物（3D の画面に立てる）----------------
  // 石灯籠（32×56、足元 y=54）。火袋の窓が光る
  function lantern(F) {
    const cx = 16;
    F.fill('stone', (m) => m.rect(cx - 7, 49, 14, 5), { k: 1.3 });
    F.fill('stone', (m) => m.rect(cx - 5, 46, 10, 3), { k: 1.2 });
    F.fill('stone', (m) => m.rect(cx - 2.5, 30, 5, 16), { k: 1.6 });
    F.deco('stone', 3, (m) => { m.line(cx - 2, 36, cx + 2, 36); m.line(cx - 2, 41, cx + 2, 41); });
    F.fill('stone', (m) => m.poly([cx - 7, 26, cx + 7, 26, cx + 6, 30, cx - 6, 30]), { k: 1.3 });
    F.fill('stone', (m) => m.rect(cx - 5.5, 16, 11, 10), { k: 1.4 });
    F.fill('glow', (m) => m.rect(cx - 3.5, 18, 7, 6), { flat: true, line: false });
    F.deco('stone', 3, (m) => m.line(cx, 18, cx, 23));
    F.fill('stone', (m) => m.poly([cx - 11, 16, cx - 8, 12.5, cx + 8, 12.5, cx + 11, 16, cx + 12, 14.5, cx + 11.5, 17, cx - 11.5, 17, cx - 12, 14.5]), { k: 1.4 });
    F.fill('stone', (m) => { m.ellipse(cx, 11, 3, 2); m.ellipse(cx, 8, 1.8, 2.2); }, { k: 1.5 });
  }
  // 松（64×96、足元 y=94）
  function pine(F, v) {
    const cx = 32 + (v % 2 ? 1 : -1);
    F.fill('woodD', (m) => { m.capsule(cx, 93, cx + 1, 50, 3.4, 2.2); m.capsule(cx + 1, 62, cx + 9, 52, 1.6, 1); m.capsule(cx, 70, cx - 9, 62, 1.6, 1); }, { k: 1.5 });
    const blobs = [[0, 22, 17, 8], [-10, 34, 13, 7], [11, 36, 13, 7], [-3, 44, 19, 8], [-15, 52, 10, 6], [14, 55, 11, 6], [2, 12, 10, 6]];
    for (const [dx, y, rx, ry] of blobs) F.fill('pine', (m) => m.ellipse(cx + dx + (v % 3) - 1, y + (v % 2), rx, ry), { k: 1.9 });
    F.deco('pine', 0, (m) => { for (const [dx, y, rx] of blobs) { m.line(cx + dx - rx * 0.6, y - 4, cx + dx - rx * 0.1, y - 5); } });
  }
  // 岩（32×24、足元 y=22）
  function rock(F, v) {
    F.fill('stone', (m) => { m.ellipse(16, 16, 11 + (v % 2) * 2, 6.5); m.ellipse(13 + (v % 3), 13, 7, 6); }, { k: 2.1, dark: 1 });
    F.fill('pine', (m) => m.ellipse(12 + (v % 3), 8.5, 4, 1.6), { k: 1.2 });
  }
  // 石の柱（40×128、足元 y=126）。溝の彫られた柱身と、上下の台
  function pillar(F) {
    const cx = 20;
    F.fill('marble', (m) => m.rect(cx - 16, 116, 32, 10), { k: 1.3 });
    F.fill('marble', (m) => m.rect(cx - 13, 110, 26, 6), { k: 1.2 });
    F.fill('marble', (m) => m.rect(cx - 10, 22, 20, 88), { k: 2.2, cap: 8 });
    F.deco('marble', 3, (m) => { for (const x of [-6, -2, 2, 6]) m.line(cx + x, 24, cx + x, 108); });
    F.fill('marble', (m) => m.poly([cx - 15, 20, cx + 15, 20, cx + 12, 14, cx - 12, 14]), { k: 1.3 });
    F.fill('marble', (m) => m.rect(cx - 16, 8, 32, 6), { k: 1.2 });
  }
  // 崩れた柱（40×80、足元 y=78）。上がぎざぎざで、苔が付く
  function pillarBroken(F, v) {
    const cx = 20, top = 26 + v * 9;
    F.fill('stone', (m) => m.rect(cx - 16, 68, 32, 10), { k: 1.3 });
    F.fill('stone', (m) => m.poly([cx - 10, 68, cx + 10, 68, cx + 10, top + 4, cx + 5, top - 2, cx + 1, top + 5, cx - 4, top - 4 + v * 2, cx - 10, top + 2]), { k: 2.2, cap: 8 });
    F.deco('stone', 3, (m) => { for (const x of [-5, 0, 5]) m.line(cx + x, top + 8, cx + x, 66); });
    F.fill('pine', (m) => { m.ellipse(cx - 6, 66, 6, 2.2); m.ellipse(cx + 7, top + 10 + v * 3, 3, 1.6); }, { k: 1.2 });
    F.fill('stone', (m) => { m.ellipse(cx + 14, 74, 5, 3); m.ellipse(cx - 15, 75, 3.5, 2.4); }, { k: 1.8, dark: 1 });
  }
  // かがり火（32×48、足元 y=46）。火は 3 コマ
  function brazier(F, v) {
    const cx = 16;
    F.fill('iron', (m) => { m.line(cx - 7, 46, cx - 2, 28); m.line(cx + 7, 46, cx + 2, 28); m.line(cx, 46, cx, 28); }, { k: 1 });
    F.fill('iron', (m) => { m.capsule(cx - 7, 46, cx - 2, 29, 0.9); m.capsule(cx + 7, 46, cx + 2, 29, 0.9); }, { k: 1.2 });
    F.fill('iron', (m) => m.poly([cx - 9, 22, cx + 9, 22, cx + 6, 30, cx - 6, 30]), { k: 1.5 });
    F.deco('brass', 1, (m) => m.line(cx - 8, 23, cx + 8, 23));
    const fl = [[0, 0, 0], [1, -2, 1], [-1, -1, -1]][v];
    F.fill('glow', (m) => { m.ellipse(cx + fl[0], 18, 6.5, 5); m.poly([cx - 6 + fl[0], 18, cx + fl[1], 3 + fl[2], cx + 6 + fl[0], 18]); m.poly([cx - 7, 19, cx - 5 + fl[2], 9, cx - 1, 17]); m.poly([cx + 1, 17, cx + 5 + fl[1], 8, cx + 7, 19]); }, { flat: true, line: false, bias: 0.25 });
    F.deco('glow', 0, (m) => m.ellipse(cx + fl[0] * 0.5, 17, 3, 2.5));
  }
  // 草むら（24×16、足元 y=15）
  function grass(F, v) {
    const blades = [[-8, 5], [-5, 1], [-2, 4], [1, 0], [4, 3], [7, 6], [-6, 8], [5, 9]];
    F.fill('grassY', (m) => { for (const [dx, h] of blades) m.capsule(12 + dx * 0.9, 15, 12 + dx + (v - 1) * 1.5, h + v, 1.1, 0.4); }, { k: 1.2, dark: v === 2 ? 1 : 0 });
  }
  function buildProps() {
    const defs = [
      ['lantern', 32, 56, 16, 54, 0.05, (F) => lantern(F)],
      ...[0, 1, 2].map((v) => [`pine${v}`, 64, 96, 32, 94, 0.07, (F) => pine(F, v)]),
      ...[0, 1, 2].map((v) => [`rock${v}`, 32, 24, 16, 22, 0.06, (F) => rock(F, v)]),
      ['pillar', 40, 128, 20, 126, 0.06, (F) => pillar(F)],
      ...[0, 1, 2].map((v) => [`pillarBroken${v}`, 40, 80, 20, 78, 0.07, (F) => pillarBroken(F, v)]),
      ...[0, 1, 2].map((v) => [`brazier${v}`, 32, 48, 16, 46, 0.055, (F) => brazier(F, v)]),
      ...[0, 1, 2].map((v) => [`grass${v}`, 24, 16, 12, 15, 0.06, (F) => grass(F, v)]),
    ];
    const W = defs.reduce((a, d) => a + d[1], 0), H = Math.max(...defs.map((d) => d[2]));
    const atlas = canvas(W, H), emit = canvas(W, H);
    const ga = atlas.getContext('2d'), ge = emit.getContext('2d');
    const frames = {};
    let x = 0;
    for (const [name, fw, fh, ax, ay, m, draw] of defs) {
      const F = new Frame(fw, fh);
      draw(F);
      const { rgba, emit: em } = F.pixels();
      ga.putImageData(new ImageData(rgba, fw, fh), x, 0);
      ge.putImageData(new ImageData(em, fw, fh), x, 0);
      frames[name] = { x, y: 0, w: fw, h: fh, ax, ay, m };
      x += fw;
    }
    return { atlas, emit, frames };
  }

  // ---------------- 演出の絵（canvas。ドット絵ではなく光の演出として描く。2D と 3D で同じ絵を使う）----------------
  // リタージー・オブ・ベル（ゲーム内の見た目に合わせる）: 緑がかった水色のガラスの線でできた大きなハート（下で 2 本が交差する）、
  // 中に白く光る大きな花、まわりにガラス玉のような鈴の花。アイコン（002649）の絵柄とも同じ
  const LILY = { w: 4.6, h: 5.3, flower: [0, 2.7, 1.8], bubbles: [[-1.38, 4.0, 0.62], [1.35, 4.05, 0.6], [-1.05, 2.75, 0.52], [1.08, 2.82, 0.54], [0.03, 4.32, 0.46]] }; // m（左右・高さ・大きさ）
  function lilyHeartCanvas() {
    const W = 256, H = 294, c = canvas(W, H), g = c.getContext('2d'), cx = W / 2;
    // 片側の葉の線（下の交差から外へふくらみ、上の山を回って中央のくぼみへ）
    const path = (side, k = 1) => {
      g.beginPath();
      g.moveTo(cx - side * 30, 290);
      g.bezierCurveTo(cx + side * 12 * k, 236, cx + side * 122 * k, 170, cx + side * 108 * k, 74);
      g.bezierCurveTo(cx + side * 98 * k, 18, cx + side * 22, 20, cx + side * 3, 82);
    };
    for (const side of [-1, 1]) {
      g.save(); g.shadowColor = 'rgba(70,235,215,0.95)'; g.shadowBlur = 16;
      path(side); g.strokeStyle = 'rgba(60,190,185,0.5)'; g.lineWidth = 10; g.stroke(); g.restore();
      path(side); g.strokeStyle = 'rgba(140,255,230,0.85)'; g.lineWidth = 4; g.stroke();
      path(side); g.strokeStyle = 'rgba(255,255,255,0.95)'; g.lineWidth = 1.6; g.stroke();
      // 内側の細い線（ガラスの葉の厚み）
      g.save(); g.translate(cx, 150); g.scale(0.86, 0.88); g.translate(-cx, -150);
      path(side, 0.97); g.strokeStyle = 'rgba(150,255,240,0.45)'; g.lineWidth = 2; g.stroke(); g.restore();
    }
    // 葉の中の、波のような模様（下の方）
    g.strokeStyle = 'rgba(120,220,255,0.35)'; g.lineWidth = 1.2;
    for (let i = 0; i < 7; i++) {
      const y = 170 + i * 13, w = 60 - i * 7;
      for (const side of [-1, 1]) { g.beginPath(); for (let x = 0; x <= w; x += 4) g.lineTo(cx + side * (18 + x), y + Math.sin(x * 0.35 + i) * 2.2 - x * 0.35); g.stroke(); }
    }
    return c;
  }
  // 中央の大きな花（白く光る。花びら 6 枚、芯は淡い紫）
  function lilyFlowerCanvas() {
    const N = 160, c = canvas(N, N), g = c.getContext('2d'), m = N / 2;
    const gr = g.createRadialGradient(m, m, 0, m, m, m);
    gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.25, 'rgba(225,240,255,0.8)'); gr.addColorStop(0.6, 'rgba(140,200,255,0.25)'); gr.addColorStop(1, 'rgba(120,180,255,0)');
    g.fillStyle = gr; g.fillRect(0, 0, N, N);
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
      g.save(); g.translate(m + Math.cos(a) * 20, m + Math.sin(a) * 20); g.rotate(a);
      const pg = g.createLinearGradient(-22, 0, 22, 0);
      pg.addColorStop(0, 'rgba(255,255,255,0.95)'); pg.addColorStop(1, 'rgba(200,225,255,0.35)');
      g.fillStyle = pg; g.beginPath(); g.ellipse(0, 0, 24, 13, 0, 0, Math.PI * 2); g.fill();
      g.restore();
    }
    const core = g.createRadialGradient(m, m, 0, m, m, 16);
    core.addColorStop(0, 'rgba(255,255,255,1)'); core.addColorStop(0.5, 'rgba(235,205,255,0.9)'); core.addColorStop(1, 'rgba(200,170,255,0)');
    g.fillStyle = core; g.fillRect(m - 16, m - 16, 32, 32);
    return c;
  }
  // 鈴の花（ガラス玉。縁と映り込みが光り、中は透ける。上に小さな柄）
  function lilyBubbleCanvas() {
    const N = 64, c = canvas(N, N), g = c.getContext('2d'), m = N / 2, r = 24;
    const fill = g.createRadialGradient(m - 6, m - 8, 2, m, m, r);
    fill.addColorStop(0, 'rgba(230,255,255,0.35)'); fill.addColorStop(0.7, 'rgba(120,210,255,0.12)'); fill.addColorStop(1, 'rgba(160,240,255,0.5)');
    g.fillStyle = fill; g.beginPath(); g.arc(m, m + 2, r, 0, Math.PI * 2); g.fill();
    g.strokeStyle = 'rgba(210,255,255,0.85)'; g.lineWidth = 2; g.stroke();
    g.fillStyle = 'rgba(255,255,255,0.95)'; g.beginPath(); g.ellipse(m - 9, m - 8, 6, 3.5, -0.6, 0, Math.PI * 2); g.fill();
    g.fillStyle = 'rgba(255,255,255,0.6)'; g.beginPath(); g.arc(m + 10, m + 12, 2.5, 0, Math.PI * 2); g.fill();
    g.strokeStyle = 'rgba(170,255,230,0.8)'; g.lineWidth = 1.5; g.beginPath(); g.moveTo(m, m - r + 2); g.quadraticCurveTo(m + 3, m - r - 5, m - 1, 1); g.stroke();
    return c;
  }
  // きらめき（十字の光）
  function glintCanvas() {
    const N = 32, c = canvas(N, N), g = c.getContext('2d'), m = N / 2;
    const gr = g.createRadialGradient(m, m, 0, m, m, m);
    gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.2, 'rgba(255,255,255,0.5)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = gr; g.fillRect(0, 0, N, N);
    g.fillStyle = 'rgba(255,255,255,0.9)'; g.fillRect(m - 0.75, 0, 1.5, N); g.fillRect(0, m - 0.75, N, 1.5);
    return c;
  }

  let cache = null;
  function build() {
    if (cache) return cache;
    const t0 = performance.now();
    cache = {
      player: buildSet({ fw: 64, fh: 64, ax: 32, ay: 59, m: 0.05, draw: (F, p, v) => (v === 'right' ? samSide(F, p) : samFB(F, p, v === 'up')), anims: SAM_ANIMS }),
      tank: buildSet({ fw: 64, fh: 64, ax: 32, ay: 59, m: 0.05, draw: (F, p, v) => (v === 'right' ? tankSide(F, p) : tankFB(F, p, v === 'up')), anims: TANK_ANIMS }),
      whm: buildSet({ fw: 64, fh: 64, ax: 32, ay: 59, m: 0.05, draw: (F, p, v) => (v === 'right' ? whmSide(F, p) : whmFB(F, p, v === 'up')), anims: WHM_ANIMS }),
      boss: buildSet({ fw: 96, fh: 96, ax: 48, ay: 90, m: 0.055, draw: (F, p, v) => dummy(F, p, v), anims: DUMMY_ANIMS }),
      props: buildProps(),
      vfx: { lilyHeart: lilyHeartCanvas(), lilyFlower: lilyFlowerCanvas(), lilyBubble: lilyBubbleCanvas(), glint: glintCanvas(), LILY },
    };
    cache.ms = Math.round(performance.now() - t0);
    return cache;
  }

  window.MockSprites = { build, frame, duration, MAT };
})();
