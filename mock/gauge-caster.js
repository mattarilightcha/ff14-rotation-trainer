// ジョブゲージ（キャスター: 赤魔道士・ピクトマンサー）。書き方は gauge2.js と同じ（ULD の木を組み立てて、状態で部品を出し入れする）。
// 色や位置は ULD のタイムライン（未抽出）で動くものが多いので、公式ジョブガイドの HUD の絵（public/jobguide/hud/）に合わせる。
(function () {
  'use strict';
  const { U, set, anim, clipW, usePart, partsOf } = window.MockGauge2.lib;
  const filt = (add, mul) => window.MockUld.colorFilter(add, mul);

  // ---------------- 赤魔道士 ----------------
  // バランスゲージ（JobHudRDM0）: 通常表示（#2）は左がホワイトマナ（#19 の白い結晶 #2）、右がブラックマナ（#20 の青い結晶 #2）。
  //   どちらも下から上へ伸びる（ULD で上下を反転した絵の上側を見せる）。数字は下（#4 = ホワイト、#5 = ブラック）。
  //   上の結晶（#17）はバランスの印: そろっていれば赤（赤い縁 #16 も出す）、ホワイトが多ければ白、ブラックが多ければ青。
  //   そろっている間は棒の後ろ（#23）が深紅、偏ると紺（公式の絵 01〜03.png）。
  //   マナスタック（#3）: 3 つの菱形（#5〜#7。付いたものは #4 の赤い星）。
  // シンプル表示（#24）: 棒 2 本（#38 = ホワイト・#39 = ブラック）、数字（上 #25 = ホワイト・下 #26 = ブラック）、
  //   右端のバランスの菱形（#36: 赤 / 白 / 青）、下のマナスタックの菱形（#28〜#30。付いたものは橙）（公式の絵 04〜07.png）
  // 仮（GAME-84）: 差が 30 以上で偏り（絵の 59 / 26・9 / 42・60 / 22・22 / 55 は偏り、50 / 50・80 / 80・83 / 83 はそろい）
  const RDM_BAR = 124, RDM_SBAR = 160, RDM_STACK = [5, 6, 7], RDM_SSTACK = [28, 29, 30];
  const RDM_IMBALANCE = 30;
  function rdm(G) {
    const L = G.layouts.JobHudRDM0;
    const K = U.build(L, G.textures);
    const k = (id) => K.get(id);
    let simple = false, prev = {};
    // 演出の部品（きらめき・血しぶき・光の筋）は隠す
    for (const id of [6, 15]) set(k(id), { opacity: 0 });
    for (const b of [19, 20]) for (const c of [3, 4]) set(k(`${b}/${c}`), { opacity: 0 });
    for (const id of ['3/3', '3/4']) set(k(id), { opacity: 0 });
    for (const q of RDM_STACK) for (const c of [3, 5, 6]) set(k(`3/${q}/${c}`), { opacity: 0 });
    if (K.img('20/2')) K.img('20/2').style.filter = filt([30, 30, 20]); // 青い結晶は少し明るく（公式の絵の藤色がかった青）
    for (const id of [4, 5]) { const n = k(id); if (n) { n.classList.add('g2-num'); set(n, { justifyContent: 'center' }); } }
    // シンプル表示: 数字の台（#3）は隠す。棒の演出の層（#5・#6）は隠す
    // 数字は棒の右寄りの上下に大きく（公式の絵 04〜07.png）
    for (const id of [25, 26]) { set(k(`${id}/3`), { opacity: 0 }); set(k(id), { left: '100px' }); const n = k(`${id}/2`); if (n) { n.classList.add('g2-snum'); set(n, { justifyContent: 'center', fontSize: '21px' }); } }
    for (const b of [38, 39]) for (const c of [5, 6]) set(k(`${b}/${c}`), { opacity: 0 });
    for (const id of [31]) set(k(id), { opacity: 0 });
    function apply(st, instant) {
      const w = Math.max(0, Math.min(100, Math.round(st.white ?? 0))), b = Math.max(0, Math.min(100, Math.round(st.black ?? 0)));
      const stacks = Math.max(0, Math.min(3, st.stacks ?? 0));
      const bal = Math.abs(w - b) < RDM_IMBALANCE ? 'even' : w > b ? 'white' : 'black';
      if (instant || w !== prev.w || b !== prev.b) {
        for (const [bar, v] of [[19, w], [20, b]]) set(k(`${bar}/2`), { clipPath: `inset(0 0 ${RDM_BAR - Math.round((RDM_BAR * v) / 100)}px 0)` });
        set(k('38/4'), { clipPath: clipW(Math.round((RDM_SBAR * w) / 100), RDM_SBAR) });
        set(k('39/4'), { clipPath: clipW(Math.round((RDM_SBAR * b) / 100), RDM_SBAR) });
        for (const [id, v] of [[4, w], ['25/2', w], [5, b], ['26/2', b]]) { const n = k(id); if (n) n.textContent = String(v); }
        if (!instant) for (const [bar, v, pv] of [[19, w, prev.w], [20, b, prev.b]]) if (v > (pv ?? 0)) anim(k(`${bar}/2`), [{ filter: 'brightness(1.7)' }, { filter: 'none' }], { duration: 380 });
      }
      if (instant || bal !== prev.bal) {
        // 上の結晶: そろい = 赤・ホワイト多め = 白・ブラック多め = 青
        const crystal = { even: filt([90, -60, -60], [100, 40, 40]), white: filt([75, 75, 75]), black: filt([-20, -10, 80], [80, 90, 130]) }[bal];
        if (K.img(17)) K.img(17).style.filter = crystal;
        set(k(16), { opacity: bal === 'even' ? 0.85 : 0 });
        if (K.img(23)) K.img(23).style.filter = bal === 'even' ? filt([150, 0, 30]) : filt([0, 10, 40]);
        const sd = { even: filt([50, -150, -150]), white: 'none', black: filt([-60, -40, 40]) }[bal];
        if (K.img('36/4')) K.img('36/4').style.filter = sd;
        if (!instant) anim(k(17), [{ filter: 'brightness(2)' }, { filter: 'none' }], { duration: 420 });
      }
      if (instant || stacks !== prev.stacks) {
        // 付いたマナスタック: 星を白っぽく光らせ、下に赤い光（#6）を出す（公式の絵 03.png）
        RDM_STACK.forEach((q, i) => {
          set(k(`3/${q}/4`), { opacity: i < stacks ? 1 : 0, filter: 'brightness(1.6) saturate(0.55)', transform: 'scale(1.3)' });
          set(k(`3/${q}/6`), { opacity: i < stacks ? 0.6 : 0, transform: 'translateY(5px) scale(1.4)' });
        });
        RDM_SSTACK.forEach((q, i) => { set(k(`${q}/4`), { opacity: i < stacks ? 1 : 0 }); if (K.img(`${q}/4`)) K.img(`${q}/4`).style.filter = filt([90, -20, -150]); });
        if (!instant && stacks > (prev.stacks ?? 0)) anim(k(`3/${RDM_STACK[stacks - 1]}/4`), [{ filter: 'brightness(2.2)', transform: 'scale(1.3)' }, { filter: 'none', transform: 'none' }], { duration: 380 });
      }
      prev = { w, b, bal, stacks };
    }
    function setSimple(v) { simple = !!v; k(2).hidden = simple; k(24).hidden = !simple; }
    setSimple(false);
    apply({ white: 0, black: 0, stacks: 0 }, true);
    return {
      windows: [{ name: 'JobHudRDM0', label: 'バランスゲージ', el: K.el, w: K.w, h: K.h }],
      update: (st) => apply(st, false), reset: (st) => apply(st, true), setSimple, isSimple: () => simple,
    };
  }

  // ---------------- ピクトマンサー ----------------
  // キャンバス（JobHudRPM0）: 通常表示（#2）は 3 つの画架。左がアニマル（#3: 上の巻物 #4 にアニマルシンボルの玉 #5 ポンポン・#6 ウィング・#7 クロー、
  //   絵 #11 ポンポン・#12 ウィング・#13 クロー・#14 ファング、空のキャンバスは #15 と飾り）、まん中がウェポン（#19: ハンマーの絵 #21）、右がスケープ（#23: スカイの絵 #25）。
  //   モーグリシンボル・マディーンシンボルの間は巻物の上に肖像（#17 モーグリ・#18 マディーン）が出て、シンボルの玉は隠れる（公式の絵 01〜04.png）。
  //   シンプル表示（#27）は、アニマル・ウェポン・スケープの枠に描いた絵のアイコン（#37・#40・#43）、アニマルの上にシンボルの枠（#31）と肖像のアイコン（#30）
  // パレットゲージ（JobHudRPM1）: パレットの上にペイントの玉 5 つ（#5〜#9。白はホワイトペイント #8、色調反転の 1 つはブラックペイント #17）、
  //   虹の筆あと（#21。左から満ちる。サブトラクティブパレットの間は淡い色 #23）と数字（#11。サブトラクティブパレットの間は虹色の台 #13）。
  //   シンプル表示（#28）は棒（#40）とペイントの菱形（#30〜#34）・数字（#36）（公式の絵 05〜11.png）
  const PCT_CREATURE = { pom: 11, wing: 12, claw: 14, fang: 13 }, PCT_SYM = { pom: 5, wing: 6, claw: 7 };
  const PCT_SICON = { pom: 25, wing: 23, claw: 26, fang: 27 }, PCT_SSYM = { pom: 28, wing: 29, claw: 30 };
  const PCT_ORBS = [5, 6, 7, 8, 9], PCT_SDIA = [30, 31, 32, 33, 34], PCT_SWIRL = 140, PCT_SBAR = 160;
  function pct(G) {
    const L0 = G.layouts.JobHudRPM0, L1 = G.layouts.JobHudRPM1;
    const K = U.build(L0, G.textures), K1 = U.build(L1, G.textures);
    const k = (id) => K.get(id), k1 = (id) => K1.get(id);
    const P0 = partsOf(L0, 1), P1 = partsOf(L1, 1), tex0 = G.textures.JobHudRPM0, tex1 = G.textures.JobHudRPM1;
    let simple = false, prev = {};
    // キャンバス: 描く・具現化の演出（しぶき・きらめき・光）は隠す。絵の上の飾り（#5）は空のときだけ
    for (const c of [...Object.values(PCT_CREATURE), 21, 25]) for (const n of [2, 3, 4]) set(k(`${c}/${n}`), { opacity: 0 });
    // シンボルの玉は巻物の中の同じ高さに（ULD のウィング・クローは出てくる動きの始めで上にずれている）
    for (const q of Object.values(PCT_SYM)) { for (const n of [2, 3, 5]) set(k(`${q}/${n}`), { opacity: 0 }); set(k(`${q}/4`), { opacity: 0, transform: 'none', top: '-3px' }); }
    // 肖像: ULD は縦の拡大率 0（出てくる動きの始め）。出すときは 1 にする
    for (const id of ['17/3', '17/4', '17/5', '17/6', '18/3', '18/6', '18/7']) set(k(id), { transform: 'none' });
    // マディーンは両腕を上げる（公式の絵 03.png）。モーグリのぼんぼりは頭に付ける
    set(k('18/4'), { transform: 'rotate(58deg)' }); set(k('18/5'), { transform: 'rotate(-58deg)' }); set(k('17/6'), { top: '-7px' }); set(k(17), { top: '1px' });
    // 肖像の横の音符（モーグリ）と「！」の光（マディーン）: ULD の #2 の絵を差し替える（公式の絵 02・03.png）
    if (K.img('17/2')) usePart(K.img('17/2'), tex0, P0[20]);
    if (K.img('18/2')) usePart(K.img('18/2'), tex0, P0[17]);
    set(k('17/2'), { opacity: 0.8, left: '76px', top: '-10px', transform: 'scale(0.7)' }); set(k('18/2'), { opacity: 1, left: '80px', top: '-10px', transform: 'scale(0.9)' });
    set(k(16), { opacity: 0 });
    // シンプル表示: シンボル（#32〜#34 の #2 は出てくる動きの始め）
    for (const q of [32, 33, 34]) set(k(`${q}/2`), { opacity: 0, transform: 'none' });
    // パレット: 玉の演出は隠す（#3・#4・#6・#7・#10〜#12・#14〜#16）
    for (const q of PCT_ORBS) {
      for (const n of [3, 4, 6, 7, 10, 11, 12, 13, 14, 15, 16]) set(k1(`${q}/${n}`), { opacity: 0 });
      set(k1(`${q}/8`), { transform: 'none' });
    }
    // 筆あと: 光の層（#15〜#19）は隠す。塗りは筆あとの形（#24 の白い筆あと）で切り抜いた虹（#22）/ 淡い色（#23）を左から
    for (const id of [15, 16, 17, 18, 19, 24]) set(k1(id), { opacity: 0 });
    for (const id of ['22/3', '23/3']) set(k1(id), { left: '0px' });
    if (k1(21) && tex1) window.MockUld.mask(k1(21), tex1, P1[10]);
    // 虹・淡い色の流れ方は ULD のタイムライン（未抽出）で動くので、公式の絵の止め絵に寄せる: 虹は左端が紫（色相を少し戻す）、
    // 淡い色は半分のときに桃 → 藤 → 水色（絵を左へ 70 ずらして横に繰り返す）。空の筆あとは灰色（公式の絵 05.png）
    if (K1.img('22/3')) K1.img('22/3').style.filter = 'hue-rotate(-60deg)';
    const pastel = K1.img('23/3');
    if (pastel) { pastel.style.backgroundRepeat = 'repeat-x'; pastel.style.backgroundPositionX = '-70px'; }
    if (K1.img(25)) K1.img(25).style.filter = filt([-190, -190, -190]);
    for (const id of [12, 37]) { const n = k1(id); if (n) { n.classList.add('g2-snum'); set(n, { justifyContent: 'center', fontSize: '21px' }); } }
    for (const id of ['40/5', '40/6']) set(k1(id), { opacity: 0 });
    // シンプル表示: 数字の台は棒の右端に重ね、ペイントの菱形は棒の左端の下から（公式の絵 09〜11.png）
    set(k1(36), { left: '89px' }); set(k1(29), { left: '-2px' });
    // 棒の塗り（九分割の絵）: サブトラクティブパレットの間は淡い色（pl1/12。虹 pl1/11 の 20 下）に、切れ端ごとに絵の位置をずらす
    const sbar = K1.img('40/4');
    const sbarPieces = sbar ? [...sbar.children].map((el) => [el, parseFloat(el.style.backgroundPositionY) || 0]) : [];
    const sbarPart = (pastel) => { for (const [el, y0] of sbarPieces) el.style.backgroundPositionY = `${y0 - (pastel ? 20 : 0)}px`; };
    function canvas(st) {
      const c = st.canvas ?? {}, sym = st.symbols ?? [], t = st.t ?? 0;
      const moogle = !!st.st?.moogle && st.st.moogle.until > t, madeen = !!st.st?.madeen && st.st.madeen.until > t;
      // アニマル: 描いた絵（なければ空のキャンバスと飾り）
      for (const [kind, q] of Object.entries(PCT_CREATURE)) {
        const on = c.creature === kind, blank = !c.creature && kind === 'pom';
        set(k(q), { opacity: on || blank ? 1 : 0 });
        set(k(`${q}/7`), { opacity: on ? 1 : 0 }); set(k(`${q}/5`), { opacity: on ? 0 : 1 });
      }
      for (const [id, on] of [[21, c.weapon], [25, c.landscape]]) { set(k(`${id}/7`), { opacity: on ? 1 : 0 }); set(k(`${id}/5`), { opacity: on ? 0 : 1 }); }
      // シンボルの玉: 1 つなら巻物のまん中、2 つなら左右、3 つなら左・まん中・右（肖像の間は隠す）
      const shown = moogle || madeen ? [] : sym.filter((x) => PCT_SYM[x]);
      const xs = shown.length === 1 ? [39] : shown.length === 2 ? [22, 55] : [7, 38, 71];
      for (const [kind, q] of Object.entries(PCT_SYM)) {
        const i = shown.indexOf(kind);
        set(k(q), { left: `${i >= 0 ? xs[i] : 39}px` }); set(k(`${q}/4`), { opacity: i >= 0 ? 1 : 0 });
      }
      set(k(16), { opacity: moogle || madeen ? 1 : 0 });
      set(k(17), { opacity: moogle && !madeen ? 1 : 0 }); set(k(18), { opacity: madeen ? 1 : 0 });
      // シンプル表示
      set(k('37/2'), { opacity: c.creature ? 1 : 0 }); if (c.creature && K.img('37/3')) usePart(K.img('37/3'), tex0, P0[PCT_SICON[c.creature]]);
      set(k('40/2'), { opacity: c.weapon ? 1 : 0 }); if (K.img('40/3')) usePart(K.img('40/3'), tex0, P0[22]);
      set(k('43/2'), { opacity: c.landscape ? 1 : 0 }); if (K.img('43/3')) usePart(K.img('43/3'), tex0, P0[24]);
      [32, 33, 34].forEach((q, i) => { const kind = shown[i]; set(k(`${q}/2`), { opacity: kind ? 1 : 0 }); if (kind && K.img(`${q}/3`)) usePart(K.img(`${q}/3`), tex0, P0[PCT_SSYM[kind]]); });
      set(k(30), { opacity: moogle || madeen ? 1 : 0 }); if (K.img('30/3')) usePart(K.img('30/3'), tex0, P0[madeen ? 36 : 35]);
      set(k('30/2'), { opacity: 1 });
    }
    function palette(st, instant) {
      const t = st.t ?? 0, v = Math.max(0, Math.min(100, st.palette ?? 0)), paint = Math.max(0, Math.min(5, st.paint ?? 0));
      const sub = !!st.st?.subtractive && st.st.subtractive.until > t, mono = !!st.st?.monochrome && st.st.monochrome.until > t;
      set(k1(22), { opacity: sub ? 0 : 1 }); set(k1(23), { opacity: sub ? 1 : 0 });
      set(k1(21), { clipPath: clipW(Math.round((PCT_SWIRL * v) / 100), PCT_SWIRL) });
      const n = k1(12); if (n) n.textContent = String(v);
      set(k1(13), { opacity: sub ? 1 : 0 }); set(k1(14), { opacity: sub ? 0 : 1 });
      const ns = k1(37); if (ns) ns.textContent = String(v);
      set(k1(38), { opacity: sub ? 1 : 0 }); set(k1(39), { opacity: sub ? 0 : 1 });
      sbarPart(sub);
      set(k1('40/4'), { clipPath: clipW(Math.round((PCT_SBAR * v) / 100), PCT_SBAR) });
      // ペイント: 色調反転の間は最後の 1 つが黒（ブラックペイント）
      PCT_ORBS.forEach((q, i) => {
        const on = i < paint, black = on && mono && i === paint - 1;
        set(k1(`${q}/8`), { opacity: on && !black ? 1 : 0 }); set(k1(`${q}/9`), { opacity: black ? 1 : 0 });
      });
      PCT_SDIA.forEach((q, i) => {
        const on = i < paint, black = on && mono && i === paint - 1;
        set(k1(`${q}/4`), { opacity: on ? 1 : 0 });
        if (K1.img(`${q}/4`)) K1.img(`${q}/4`).style.filter = black ? filt([10, -60, 10], [65, 30, 65]) : filt([-255, 50, 100]);
      });
      if (!instant && v > (prev.v ?? 0)) anim(k1(21), [{ filter: 'brightness(1.6)' }, { filter: 'none' }], { duration: 420 });
      if (!instant && paint > (prev.paint ?? 0)) anim(k1(PCT_ORBS[paint - 1]), [{ filter: 'brightness(2)', transform: 'scale(1.25)' }, { filter: 'none', transform: 'none' }], { duration: 380 });
      prev.v = v; prev.paint = paint;
    }
    function apply(st, instant) {
      const key = JSON.stringify([st.canvas, st.symbols, !!st.st?.moogle && st.st.moogle.until > (st.t ?? 0), !!st.st?.madeen && st.st.madeen.until > (st.t ?? 0)]);
      if (instant || key !== prev.key) {
        if (!instant && prev.key) for (const id of [3, 19, 23]) anim(k(id), [{ filter: 'brightness(1.5)' }, { filter: 'none' }], { duration: 360 });
        canvas(st); prev.key = key;
      }
      palette(st, instant);
    }
    function setSimple(v) { simple = !!v; k(2).hidden = simple; k(27).hidden = !simple; k1(2).hidden = simple; k1(28).hidden = !simple; }
    setSimple(false);
    apply({ t: 0, canvas: {}, symbols: [], palette: 0, paint: 0, st: {} }, true);
    return {
      windows: [
        { name: 'JobHudRPM0', label: 'キャンバス', el: K.el, w: K.w, h: K.h },
        { name: 'JobHudRPM1', label: 'パレットゲージ', el: K1.el, w: K1.w, h: K1.h },
      ],
      update: (st) => apply(st, false), reset: (st) => apply(st, true), setSimple, isSimple: () => simple,
    };
  }

  window.MockGauge2.add({ RDM: rdm, PCT: pct });
})();
