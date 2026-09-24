// ドット絵の素材: 侍・タンク・からくり木人のスプライトと、稽古場の床。
// 画像ファイルは使わず、文字の地図（1 文字 = 1 ドット）とコードで描き、読み込み時に canvas へ焼き込む。
// 輪郭線は自動で付ける（不透明なドットに隣接する透明なドットを暗い色で塗る）。
(function () {
  'use strict';

  const PAL = {
    // 侍
    h: '#2b2233', H: '#52436a', r: '#d2463b', R: '#8f2c26',
    s: '#f0c8a0', S: '#c99372', e: '#231a2b',
    w: '#efeae0', W: '#c9c1b3', b: '#3b5ea8', B: '#283f73',
    g: '#6c6e7e', G: '#4a4c5a', K: '#2a2530', y: '#e2b45a', Y: '#9a7328',
    // タンク
    m: '#d4dbe4', M: '#8d97a6', v: '#3a3f4a', c: '#3f7fd0', C: '#28508a', p: '#ffffff',
  };
  const OUTLINE = '#141019';

  // ---------------- 侍（12×16）----------------
  const SAM = {
    down: [
      '....rhhr....',
      '...hhHHhh...',
      '..hhhhhhhh..',
      '..hHhhhhhh..',
      '..hssssssh..',
      '..ssessess..',
      '..ssssssss..',
      '...SssssS...',
      '..wwbbbbww..',
      '.bbwwbbwwbb.',
      '.bbbbwwbbbb.',
      '.sbrrrrrrbs.',
      '..gggggggyK.',
      '..gggGGggg.K',
      '..ggg..ggg..',
      '..GG....GG..',
    ],
    up: [
      '....rHHr....',
      '...hhHHhh...',
      '..hhhhhhhh..',
      '..hhhhHhhh..',
      '..hhhhhhhh..',
      '..hhhhhhhh..',
      '..Shhhhhhs..',
      '...ssssss...',
      '..bbbbbbbb..',
      '.bbbbbbbbbb.',
      '.bbbBBBBbbb.',
      '.sbrrrrrrbs.',
      '.Kgggggggg..',
      'K.gggGGggg..',
      '..ggg..ggg..',
      '..GG....GG..',
    ],
    right: [
      '...rhh......',
      '..hhHhh.....',
      '..hhhhhhh...',
      '..hhhhhhhh..',
      '..hhhhssss..',
      '..hhhsssess.',
      '..hhhsssss..',
      '...hSssss...',
      '...bbbwww...',
      '..bbbbwbb...',
      '..bbbbbbbs..',
      '..brrrrryK..',
      '...gggggg.K.',
      '...gggGgg...',
      '...gg..gg...',
      '...GG..GG...',
    ],
  };
  // 歩き: 足の 2 行を差し替える
  const SAM_WALK = {
    down: [['..ggg..gg...', '..GG.....G..'], ['...gg..ggg..', '...G....GG..']],
    up: [['..ggg..gg...', '..GG.....G..'], ['...gg..ggg..', '...G....GG..']],
    right: [['..gg....gg..', '..GG....GG..'], ['....gggg....', '....GGGG....']],
  };

  // ---------------- タンク（12×16。盾と剣はコードで重ねる）----------------
  const TANK = {
    down: [
      '.....rr.....',
      '...MmmmmM...',
      '..MmmmmmmM..',
      '..MvvvvvvM..',
      '..MmmmmmmM..',
      '...MmmmmM...',
      '.mmMccccMmm.',
      '.mMccccccMm.',
      '.mMccyyccMm.',
      '.mMccccccMm.',
      '..MccccccM..',
      '..MMyyyyMM..',
      '..mmmMMmmm..',
      '..mmm..mmm..',
      '..MMM..MMM..',
      '..vv....vv..',
    ],
    up: [
      '.....rr.....',
      '...MmmmmM...',
      '..MmmmmmmM..',
      '..MmmmmmmM..',
      '..MmmmmmmM..',
      '...MmmmmM...',
      '.mmCccccCmm.',
      '.mCccccccCm.',
      '.mCccccccCm.',
      '.mCccccccCm.',
      '..CccccccC..',
      '..MMyyyyMM..',
      '..mmmMMmmm..',
      '..mmm..mmm..',
      '..MMM..MMM..',
      '..vv....vv..',
    ],
    right: [
      '....rr......',
      '...MmmmM....',
      '..MmmmmmM...',
      '..MmmmvvvM..',
      '..MmmmmmM...',
      '...MmmmM....',
      '..mmccccm...',
      '..mMcccccm..',
      '..mMccyccm..',
      '..mMcccccm..',
      '...Mccccc...',
      '...MyyyyM...',
      '...mmMMmm...',
      '...mm..mm...',
      '...MM..MM...',
      '...vv..vv...',
    ],
  };
  const TANK_WALK = {
    down: [['..mmm..mm...', '..MMM...MM..'], ['...mm..mmm..', '...MM..MMM..']],
    up: [['..mmm..mm...', '..MMM...MM..'], ['...mm..mmm..', '...MM..MMM..']],
    right: [['..mm....mm..', '..MM....MM..'], ['....mmmm....', '....MMMM....']],
  };

  function canvas(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; }

  // 文字の地図 → canvas（輪郭線付き。1 ドットの余白を足す）
  function fromMap(rows, extra) {
    const h = rows.length, w = rows[0].length;
    const c = canvas(w + 2, h + 2), g = c.getContext('2d');
    rows.forEach((row, y) => {
      if (row.length !== w) throw new Error(`スプライトの幅が不揃い: ${row}`);
      for (let x = 0; x < w; x++) { const col = PAL[row[x]]; if (col) { g.fillStyle = col; g.fillRect(x + 1, y + 1, 1, 1); } }
    });
    if (extra) extra(g);
    outline(c);
    return c;
  }

  function outline(c) {
    const g = c.getContext('2d');
    const img = g.getImageData(0, 0, c.width, c.height), d = img.data, W = c.width, H = c.height;
    const solid = (x, y) => x >= 0 && y >= 0 && x < W && y < H && d[(y * W + x) * 4 + 3] > 0;
    const marks = [];
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      if (solid(x, y)) continue;
      if (solid(x - 1, y) || solid(x + 1, y) || solid(x, y - 1) || solid(x, y + 1)) marks.push([x, y]);
    }
    g.fillStyle = OUTLINE;
    for (const [x, y] of marks) g.fillRect(x, y, 1, 1);
  }

  function flipX(src) {
    const c = canvas(src.width, src.height), g = c.getContext('2d');
    g.translate(src.width, 0); g.scale(-1, 1); g.drawImage(src, 0, 0);
    return c;
  }

  // 被弾・命中時の白い影
  function silhouette(src, color) {
    const c = canvas(src.width, src.height), g = c.getContext('2d');
    g.drawImage(src, 0, 0);
    g.globalCompositeOperation = 'source-in';
    g.fillStyle = color; g.fillRect(0, 0, c.width, c.height);
    return c;
  }

  function withWalk(base, walk) {
    const n = base.length;
    return [base, [...base.slice(0, n - 2), ...walk[0]], [...base.slice(0, n - 2), ...walk[1]]];
  }

  // 方向ごとの 3 コマ（立ち・歩き A・歩き B）。left は right の左右反転
  function charSet(maps, walks, extras = {}) {
    const out = {};
    for (const dir of ['down', 'up', 'right']) out[dir] = withWalk(maps[dir], walks[dir]).map((m) => fromMap(m, extras[dir]));
    out.left = out.right.map(flipX);
    out.flash = {};
    for (const dir of ['down', 'up', 'right', 'left']) out.flash[dir] = out[dir].map((c) => silhouette(c, '#ffffff'));
    out.hurt = {};
    for (const dir of ['down', 'up', 'right', 'left']) out.hurt[dir] = out[dir].map((c) => silhouette(c, '#ff4a3c'));
    return out;
  }

  // タンクの盾（向きによって位置が変わる）
  const shield = (x, y) => (g) => {
    g.fillStyle = PAL.y; g.fillRect(x, y, 4, 6);
    g.fillStyle = PAL.c; g.fillRect(x + 1, y + 1, 2, 4);
    g.fillStyle = PAL.p; g.fillRect(x + 1, y + 2, 2, 1);
  };

  // ---------------- からくり木人（24×28。コードで描く）----------------
  const WOOD = '#8a5a32', WOOD_D = '#5e3b1f', WOOD_L = '#b98a55', BRASS = '#e0b050', BRASS_D = '#9a7328', GLOW = '#ff8a3c', GLOW_L = '#ffd27a';
  function boss(dir) {
    const c = canvas(26, 30), g = c.getContext('2d');
    const R = (x, y, w, h, col) => { g.fillStyle = col; g.fillRect(x + 1, y + 1, w, h); };
    // 脚
    R(7, 22, 4, 5, WOOD_D); R(13, 22, 4, 5, WOOD_D); R(6, 26, 6, 2, BRASS_D); R(12, 26, 6, 2, BRASS_D);
    // 胴（樽）
    R(5, 10, 14, 13, WOOD); R(4, 12, 16, 9, WOOD);
    for (const x of [7, 10, 13, 16]) R(x, 11, 1, 11, WOOD_D);
    R(5, 11, 14, 1, WOOD_L);
    R(4, 13, 16, 2, BRASS); R(4, 19, 16, 2, BRASS); R(4, 14, 16, 1, BRASS_D); R(4, 20, 16, 1, BRASS_D);
    // 腕
    const side = dir === 'left' || dir === 'right';
    if (!side) { R(0, 12, 5, 4, WOOD_D); R(19, 12, 5, 4, WOOD_D); R(0, 16, 4, 4, BRASS); R(20, 16, 4, 4, BRASS); R(1, 13, 3, 1, WOOD_L); R(20, 13, 3, 1, WOOD_L); }
    else { R(dir === 'right' ? 16 : 3, 12, 5, 4, WOOD_D); R(dir === 'right' ? 18 : 3, 16, 4, 4, BRASS); }
    // 首と頭
    R(10, 8, 4, 2, BRASS_D);
    R(7, 1, 10, 8, WOOD_L); R(6, 2, 12, 6, WOOD_L); R(7, 1, 10, 1, '#d8b07a');
    R(6, 7, 12, 1, WOOD); R(9, 0, 6, 1, BRASS);
    // 顔（向き）
    if (dir === 'down') {
      R(8, 4, 2, 2, GLOW); R(14, 4, 2, 2, GLOW); R(8, 4, 1, 1, GLOW_L); R(14, 4, 1, 1, GLOW_L);
      R(10, 6, 4, 1, WOOD_D);
      // 胸の歯車（光る芯）
      R(10, 15, 4, 4, BRASS); R(11, 16, 2, 2, GLOW); R(11, 16, 1, 1, GLOW_L);
    } else if (dir === 'up') {
      R(9, 3, 6, 1, WOOD_D); R(9, 5, 6, 1, WOOD_D);
      R(9, 14, 6, 6, BRASS_D); R(10, 15, 4, 4, BRASS); R(11, 16, 2, 2, BRASS_D);
    } else {
      const ex = dir === 'right' ? 14 : 8;
      R(ex, 4, 2, 2, GLOW); R(ex, 4, 1, 1, GLOW_L);
      R(dir === 'right' ? 18 : 5, 3, 1, 3, BRASS);
    }
    outline(c);
    return c;
  }
  function bossSet() {
    const out = {};
    for (const d of ['down', 'up', 'left', 'right']) out[d] = boss(d);
    out.flash = {};
    for (const d of ['down', 'up', 'left', 'right']) out.flash[d] = silhouette(out[d], '#fff4dc');
    return out;
  }

  // ---------------- 床（稽古場）----------------
  // 乱数は固定の種で作る（毎回同じ見た目）
  function rng(seed) { return () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  function floor(sizeY, ppy, arenaR) {
    const N = Math.round(sizeY * ppy), c = canvas(N, N), g = c.getContext('2d');
    const rnd = rng(1337), cx = N / 2, cy = N / 2, R = arenaR * ppy;
    // 外側: 夜の草地
    g.fillStyle = '#1c2a22'; g.fillRect(0, 0, N, N);
    for (let i = 0; i < N * N * 0.05; i++) {
      const x = (rnd() * N) | 0, y = (rnd() * N) | 0;
      g.fillStyle = rnd() < 0.5 ? '#233629' : '#162219'; g.fillRect(x, y, 1, 1);
    }
    for (let i = 0, n = Math.round((260 * N * N) / (320 * 320)); i < n; i++) { // 草むら（広さに比例）
      const x = (rnd() * N) | 0, y = (rnd() * N) | 0;
      if (Math.hypot(x - cx, y - cy) < R + 8) continue;
      g.fillStyle = '#2f4a34'; g.fillRect(x, y, 1, 2); g.fillRect(x + 1, y - 1, 1, 2); g.fillRect(x + 2, y, 1, 2);
    }
    // 稽古場の石畳（2m 角の石）
    const T = ppy * 2;
    for (let ty = -1; ty * T < N; ty++) for (let tx = -1; tx * T < N; tx++) {
      const x = tx * T + ((ty & 1) ? T / 2 : 0), y = ty * T;
      const mx = x + T / 2, my = y + T / 2;
      if (Math.hypot(mx - cx, my - cy) > R - 1) continue;
      const v = (rnd() * 18) | 0;
      g.fillStyle = `rgb(${62 + v},${62 + v},${74 + v})`; g.fillRect(x + 1, y + 1, T - 1, T - 1);
      g.fillStyle = `rgb(${76 + v},${76 + v},${88 + v})`; g.fillRect(x + 1, y + 1, T - 1, 1);
      if (rnd() < 0.18) { g.fillStyle = '#34453a'; g.fillRect(x + 2 + ((rnd() * (T - 4)) | 0), y + 2 + ((rnd() * (T - 4)) | 0), 1, 1); }
      if (rnd() < 0.08) { g.fillStyle = '#4a4a58'; g.fillRect(x + 2, y + 3, 3, 1); g.fillRect(x + 4, y + 4, 1, 2); }
    }
    // 縁石
    for (let a = 0; a < Math.PI * 2; a += 1 / (R + 4)) {
      for (let r = R - 1; r < R + 3; r++) {
        const x = Math.round(cx + Math.cos(a) * r), y = Math.round(cy + Math.sin(a) * r);
        g.fillStyle = r < R + 1 ? '#8a8494' : '#4a4652'; g.fillRect(x, y, 1, 1);
      }
    }
    // 灯籠（8 方向）
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2 + Math.PI / 8, x = Math.round(cx + Math.cos(a) * (R + 7)), y = Math.round(cy + Math.sin(a) * (R + 7));
      const glow = g.createRadialGradient(x, y - 2, 0, x, y - 2, 12); glow.addColorStop(0, 'rgba(255,190,110,.45)'); glow.addColorStop(1, 'rgba(255,190,110,0)');
      g.fillStyle = glow; g.fillRect(x - 12, y - 14, 24, 24);
      g.fillStyle = '#56585e'; g.fillRect(x - 2, y - 1, 5, 2); g.fillRect(x - 1, y - 5, 3, 4);
      g.fillStyle = '#ffcf8a'; g.fillRect(x - 1, y - 4, 3, 2);
      g.fillStyle = '#6a6c72'; g.fillRect(x - 2, y - 6, 5, 1);
    }
    // 中央の紋（稽古場の印）
    g.strokeStyle = 'rgba(200,180,140,.18)'; g.lineWidth = 1;
    g.beginPath(); g.arc(cx, cy, R * 0.55, 0, Math.PI * 2); g.stroke();
    g.beginPath(); g.arc(cx, cy, R * 0.2, 0, Math.PI * 2); g.stroke();
    return c;
  }

  let cache = null;
  function sprites() {
    if (cache) return cache;
    cache = {
      player: charSet(SAM, SAM_WALK),
      tank: charSet(TANK, TANK_WALK, { down: shield(9, 7), up: null, right: shield(9, 7) }),
      boss: bossSet(),
    };
    return cache;
  }

  window.MockPixel = { sprites, floor, rng, PAL };
})();
