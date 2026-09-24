// 練習場のステージ（形・広さ・床・小物・空と明かり）。ゲームの特定の場所ではなく、練習用に作ったもの（DESIGN-04）。
// 判定（arena.js）は shape と size だけを使う。見た目（arena3d.js・pixel.js）は残りを使う。
// 増やすときは、ここに 1 つ足す（床・小物の種類は arena3d.js の FLOORS・PROPS と sprites.js の小物にあるもの）。
(function () {
  'use strict';

  const STAGES = [
    {
      id: 'dojo', name: '夜の稽古場', note: '円形・半径 20m。石畳と灯籠、まわりは松林',
      shape: 'circle', size: 20, // circle: 半径（m）/ square: 中心から辺までの距離（m）
      floor: 'tiles', edge: 'curb', outside: 'grass',
      sky: ['#060a18', '#121823', '#0a0e12'], // 空の上・地平・下
      fog: ['#121823', 55, 170], // 霧の色・始まり・終わり（m）
      light: { hemi: ['#b4c2ff', '#40344a', 1.9], sun: ['#e4ebff', 1.35, [-20, 40, 12]] },
      tint: [0.93, 0.95, 1.0], // 人物の板の明るさ（空の明かりに合わせる）
      bloom: 0.82, motes: 'firefly',
      props: [
        { kind: 'lantern', ring: 2.8, count: 8 }, // ring: 縁から外へ何 m の輪に並べるか
        { kind: 'pine', count: 26, band: [6, 22] }, // band: 縁から外へ何 m の帯に散らすか
        { kind: 'rock', count: 16, band: [1.8, 11] },
      ],
      markers: false, // フィールドマーカーの初期表示
    },
    {
      id: 'colosseum', name: '昼の闘技場', note: '四角・40m 四方。レイド風の石の床。床にフィールドマーカー',
      shape: 'square', size: 20,
      floor: 'slabs', edge: 'wall', outside: 'sand',
      sky: ['#2f6fcf', '#d4e6f2', '#9a8a74'],
      fog: ['#d4e6f2', 90, 320],
      light: { hemi: ['#e6f2ff', '#8a7a60', 1.45], sun: ['#fff1d6', 2.6, [18, 42, 26]] },
      tint: [1.0, 0.99, 0.96],
      bloom: 0.97, motes: 'dust',
      props: [
        { kind: 'pillar', every: 8, out: 2.6 }, // every: 辺に沿って何 m ごとに立てるか
        { kind: 'brazier', corners: true, out: 1.3 },
      ],
      markers: true,
    },
    {
      id: 'ruins', name: '夕暮れの遺跡', note: '円形・半径 22m。崩れた石の床と柱、夕焼け',
      shape: 'circle', size: 22,
      floor: 'ruins', edge: 'broken', outside: 'field',
      sky: ['#241c48', '#e88a66', '#2a1c2c'],
      fog: ['#6e5462', 55, 200],
      light: { hemi: ['#f2d8c4', '#4a3a4c', 1.45], sun: ['#ffb27a', 1.55, [-40, 18, -6]] },
      tint: [1.0, 0.92, 0.88],
      bloom: 0.86, motes: 'ember',
      props: [
        { kind: 'pillarBroken', ring: 2.2, count: 10 },
        { kind: 'rock', count: 20, band: [1.5, 14] },
        { kind: 'grass', count: 110, band: [0.4, 20] },
      ],
      markers: false,
    },
  ];

  // フィールドマーカー（FF14 のフィールドマーカーの形と色。置き方はレイドでよくある「A が北、1 が北東」の並び）
  const MARKERS = [
    { id: 'A', shape: 'circle', color: '#ff5a5a', at: [0, -1] }, { id: 'B', shape: 'circle', color: '#ffd84a', at: [1, 0] },
    { id: 'C', shape: 'circle', color: '#5ab4ff', at: [0, 1] }, { id: 'D', shape: 'circle', color: '#c77dff', at: [-1, 0] },
    { id: '1', shape: 'square', color: '#ff5a5a', at: [0.707, -0.707] }, { id: '2', shape: 'square', color: '#ffd84a', at: [0.707, 0.707] },
    { id: '3', shape: 'square', color: '#5ab4ff', at: [-0.707, 0.707] }, { id: '4', shape: 'square', color: '#c77dff', at: [-0.707, -0.707] },
  ];

  // 形に合わせた判定の小物（m）
  const inside = (st, x, y, margin = 0) => (st.shape === 'square' ? Math.abs(x) <= st.size - margin && Math.abs(y) <= st.size - margin : Math.hypot(x, y) <= st.size - margin);
  function clamp(st, p, margin = 0) {
    const s = st.size - margin;
    if (st.shape === 'square') { p.x = Math.max(-s, Math.min(s, p.x)); p.y = Math.max(-s, Math.min(s, p.y)); return p; }
    const r = Math.hypot(p.x, p.y);
    if (r > s) { p.x *= s / r; p.y *= s / r; }
    return p;
  }
  // マーカーの位置（中心から、縁の 6 割の距離）
  const markerPos = (st, m) => ({ x: m.at[0] * st.size * 0.6, y: m.at[1] * st.size * 0.6 });

  window.MockStages = { list: STAGES, get: (id) => STAGES.find((s) => s.id === id) ?? STAGES[0], MARKERS, inside, clamp, markerPos };
})();
