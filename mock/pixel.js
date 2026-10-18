// 2D 表示（真上から）の床と、固定の種の乱数。人物のドット絵は sprites.js、ステージの定義は stages.js。
// 画像ファイルは使わず、コードで描いて canvas に焼き込む。
(function () {
  'use strict';

  function canvas(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; }

  // 乱数は固定の種で作る（毎回同じ見た目）
  function rng(seed) { return () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

  // 床の色（ステージの floor / outside ごと）
  const INSIDE = {
    tiles: { tile: 2, base: [62, 62, 74], spread: 18, top: 14, moss: '#34453a' },
    slabs: { tile: 4, base: [150, 138, 116], spread: 16, top: 12, moss: null },
    ruins: { tile: 2, base: [96, 82, 80], spread: 22, top: 12, moss: '#4a5a36', gaps: 0.1 },
  };
  const OUTSIDE = {
    grass: { base: '#1c2a22', dots: ['#233629', '#162219'], tuft: '#2f4a34' },
    sand: { base: '#8a7a5e', dots: ['#958567', '#7c6d52'], tuft: '#6e6048' },
    field: { base: '#3a3226', dots: ['#443a2c', '#30291f'], tuft: '#5a5a30' },
  };

  // 床: sizeY（m）四方、1m = ppy ドット。st はステージ（stages.js）
  function floor(sizeY, ppy, st) {
    const N = Math.round(sizeY * ppy), c = canvas(N, N), g = c.getContext('2d');
    const rnd = rng(1337), cx = N / 2, cy = N / 2, R = st.size * ppy;
    const O = OUTSIDE[st.outside] ?? OUTSIDE.grass, I = INSIDE[st.floor] ?? INSIDE.tiles;
    const inArena = (x, y, m = 0) => (st.shape === 'square' ? Math.abs(x - cx) <= R - m && Math.abs(y - cy) <= R - m : Math.hypot(x - cx, y - cy) <= R - m);
    // 外側
    g.fillStyle = O.base; g.fillRect(0, 0, N, N);
    for (let i = 0; i < N * N * 0.05; i++) {
      const x = (rnd() * N) | 0, y = (rnd() * N) | 0;
      g.fillStyle = rnd() < 0.5 ? O.dots[0] : O.dots[1]; g.fillRect(x, y, 1, 1);
    }
    for (let i = 0, n = Math.round((260 * N * N) / (320 * 320)); i < n; i++) { // 草むら・小石（広さに比例）
      const x = (rnd() * N) | 0, y = (rnd() * N) | 0;
      if (inArena(x, y, -8)) continue;
      g.fillStyle = O.tuft; g.fillRect(x, y, 1, 2); g.fillRect(x + 1, y - 1, 1, 2); g.fillRect(x + 2, y, 1, 2);
    }
    // 床の石（半分ずらし）
    const T = ppy * I.tile;
    for (let ty = -1; ty * T < N; ty++) for (let tx = -1; tx * T < N; tx++) {
      const x = tx * T + ((ty & 1) ? T / 2 : 0), y = ty * T;
      if (!inArena(x + T / 2, y + T / 2, 1)) continue;
      if (I.gaps && rnd() < I.gaps) continue; // 欠けた石
      const v = (rnd() * I.spread) | 0, [r0, g0, b0] = I.base;
      g.fillStyle = `rgb(${r0 + v},${g0 + v},${b0 + v})`; g.fillRect(x + 1, y + 1, T - 1, T - 1);
      g.fillStyle = `rgb(${r0 + v + I.top},${g0 + v + I.top},${b0 + v + I.top})`; g.fillRect(x + 1, y + 1, T - 1, 1);
      if (I.moss && rnd() < 0.18) { g.fillStyle = I.moss; g.fillRect(x + 2 + ((rnd() * (T - 4)) | 0), y + 2 + ((rnd() * (T - 4)) | 0), 2, 2); }
      if (rnd() < 0.08) { g.fillStyle = 'rgba(0,0,0,.25)'; g.fillRect(x + 3, y + 5, 6, 1); g.fillRect(x + 8, y + 6, 1, 4); }
    }
    // 縁（円は縁石、四角は壁の上端）
    g.fillStyle = '#8a8494';
    if (st.shape === 'square') {
      g.fillRect(cx - R - 3, cy - R - 3, R * 2 + 6, 3); g.fillRect(cx - R - 3, cy + R, R * 2 + 6, 3);
      g.fillRect(cx - R - 3, cy - R - 3, 3, R * 2 + 6); g.fillRect(cx + R, cy - R - 3, 3, R * 2 + 6);
    } else {
      for (let a = 0; a < Math.PI * 2; a += 1 / (R + 4)) {
        if (st.edge === 'broken' && Math.sin(a * 9) > 0.7) continue; // 崩れた縁
        for (let r = R - 1; r < R + 4; r++) {
          const x = Math.round(cx + Math.cos(a) * r), y = Math.round(cy + Math.sin(a) * r);
          g.fillStyle = r < R + 1 ? '#8a8494' : '#4a4652'; g.fillRect(x, y, 1, 1);
        }
      }
    }
    // 小物の目印（真上から見た灯籠・かがり火・柱）
    for (const p of st.props ?? []) {
      const pts = [];
      if (p.ring != null) for (let i = 0; i < p.count; i++) { const a = (i / p.count) * Math.PI * 2 + Math.PI / p.count; pts.push([cx + Math.cos(a) * (R + p.ring * ppy), cy + Math.sin(a) * (R + p.ring * ppy)]); }
      if (p.every) for (let v = -st.size; v <= st.size; v += p.every) for (const [dx, dy] of [[v, -st.size - p.out], [v, st.size + p.out], [-st.size - p.out, v], [st.size + p.out, v]]) pts.push([cx + dx * ppy, cy + dy * ppy]);
      if (p.corners) for (const [dx, dy] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) pts.push([cx + dx * (R + p.out * ppy), cy + dy * (R + p.out * ppy)]);
      for (const [x, y] of pts) {
        if (p.kind === 'lantern' || p.kind === 'brazier') {
          const glow = g.createRadialGradient(x, y - 2, 0, x, y - 2, 24); glow.addColorStop(0, 'rgba(255,190,110,.45)'); glow.addColorStop(1, 'rgba(255,190,110,0)');
          g.fillStyle = glow; g.fillRect(x - 24, y - 26, 48, 48);
          g.fillStyle = '#56585e'; g.fillRect(x - 4, y - 2, 9, 4); g.fillStyle = '#ffcf8a'; g.fillRect(x - 2, y - 6, 5, 4);
        } else if (p.kind === 'pillar' || p.kind === 'pillarBroken') {
          g.fillStyle = '#6a6470'; g.beginPath(); g.arc(x, y, 1.1 * ppy, 0, Math.PI * 2); g.fill();
          g.fillStyle = '#9a94a0'; g.beginPath(); g.arc(x - 2, y - 2, 0.7 * ppy, 0, Math.PI * 2); g.fill();
        }
      }
    }
    // 中央の紋（練習場の印）
    g.strokeStyle = 'rgba(200,180,140,.18)'; g.lineWidth = 1;
    g.beginPath(); g.arc(cx, cy, R * 0.55, 0, Math.PI * 2); g.stroke();
    g.beginPath(); g.arc(cx, cy, R * 0.2, 0, Math.PI * 2); g.stroke();
    return c;
  }

  window.MockPixel = { floor, rng };
})();
