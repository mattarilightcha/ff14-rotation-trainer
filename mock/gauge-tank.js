// ジョブゲージ（タンク: 戦士・暗黒騎士・ガンブレイカー）: gauge2.js と同じく、クライアントから抽出した ULD とテクスチャ（アトラスのまま）で
// ゲームのゲージを組み立て、状態に合わせて動かす。共通の部品は gauge2.js（window.MockGauge2.lib）。
// - どのノードが何を表すかは、ULD のパーツ（アトラスの絵）・並び・初期値から判断した。
//   光り方などの動きは、ゲームのアニメーション定義（ULD のタイムライン）を抽出していないため仮（docs/SPEC.md §10 UI-01）
(function () {
  'use strict';
  const { U, set, anim, clipW } = window.MockGauge2.lib;

  // ---------------- 戦士: インナービーストゲージ（JobHudWAR0。インナービースト 0〜100 とディフェンダー）----------------
  // #2 = 通常表示: #10 枠（鎖の付いた棒）、#11 棒（部品 1002: #2 塗り・#3 明るい塗り・#4 減った分の暗い塗り・#5 地）、#9 数字、
  //   #12 中央の紋章（部品 1001: #8 黒い鉄の紋章・#7 赤い結晶・#6 黄色い光・#3 #4 上下の角の光）。#4〜#7 は煙の演出の部品（最初は隠す）
  //   赤い結晶はディフェンダー（ナイトの盾の石と同じく、スタンスの印。仮）。上下の角はゲージの外（上 80px・下 164px）に置かれた
  //   動きの部品で、止めた絵では外にはみ出すので使わない。原初の解放の間は、紋章の後ろの光と煙を出す（仮）
  // #13 = シンプル表示: #14 小さな紋章のアイコン（ディフェンダーで明るく）、#16 数字、#17 棒（Parameter_Gauge: #5 橙の塗り。#4・#6 は演出の層）
  const WN = { normal: 2, simple: 13, num: 9, bar: 11, crest: 12, fx: [4, 5, 6, 7], sIcon: 14, sNum: 16, sBar: 17 };
  const BEAST_W = 172, SBAR_W = 160;
  function war(G) {
    const L = G.layouts.JobHudWAR0;
    const K = U.build(L, G.textures);
    const k = (id) => K.get(id);
    let simple = false, prev = { v: 0, def: false, ir: false };
    for (const id of WN.fx) set(k(id), { opacity: 0 });
    for (const c of [3, 4, 6, 7]) set(k(`${WN.crest}/${c}`), { opacity: 0 });
    set(k(`${WN.bar}/3`), { opacity: 0 }); set(k(`${WN.bar}/4`), { opacity: 0 });
    for (const c of [4, 6]) set(k(`${WN.sBar}/${c}`), { opacity: 0 });
    k(WN.num)?.classList.add('g2-num');
    k(`${WN.sNum}/2`)?.classList.add('g2-snum');
    k(WN.simple).hidden = true;

    function beast(a, b, instant) {
      const w = Math.round((BEAST_W * b) / 100), wa = Math.round((BEAST_W * a) / 100);
      const n = k(WN.num); if (n) n.textContent = String(b);
      const sn = k(`${WN.sNum}/2`); if (sn) sn.textContent = String(b);
      set(k(`${WN.bar}/2`), { clipPath: clipW(w, BEAST_W) });
      set(k(`${WN.sBar}/5`), { clipPath: clipW(Math.round((SBAR_W * b) / 100), SBAR_W) });
      K.el.classList.toggle('o-full', b >= 100);
      if (instant) return;
      if (b > a) {
        anim(k(`${WN.bar}/2`), [{ filter: 'brightness(1.9)' }, { filter: 'brightness(1)' }], { duration: 500 });
        anim(k(`${WN.sBar}/5`), [{ filter: 'brightness(1.9)' }, { filter: 'brightness(1)' }], { duration: 420 });
        if (b >= 50 && a < 50) anim(k(`${WN.crest}/8`), [{ filter: 'brightness(1.8)' }, { filter: 'brightness(1)' }], { duration: 500 });
        if (b >= 100 && a < 100) anim(k(5), [{ opacity: 0 }, { opacity: 0.8, offset: 0.3 }, { opacity: 0 }], { duration: 700 });
      } else {
        // 使った分: 暗い塗りが残ってから消える
        set(k(`${WN.bar}/4`), { clipPath: `inset(0 ${BEAST_W - wa}px 0 ${w}px)` });
        anim(k(`${WN.bar}/4`), [{ opacity: 1 }, { opacity: 1, offset: 0.3 }, { opacity: 0 }], { duration: 600, easing: 'ease-in' });
      }
    }
    function defiance(on, instant) {
      set(k(`${WN.crest}/7`), { opacity: on ? 1 : 0 });
      set(k(`${WN.sIcon}/2`), { opacity: on ? 1 : 0.25 });
      if (instant || !on) return;
      anim(k(`${WN.crest}/7`), [{ filter: 'brightness(2.2)', transform: 'scale(1.15)' }, { filter: 'brightness(1)', transform: 'none' }], { duration: 450 });
      anim(k(`${WN.sIcon}/2`), [{ opacity: 0, transform: 'scale(2)' }, { opacity: 1, transform: 'none' }], { duration: 260 });
    }
    // 原初の解放の間: 紋章の後ろの光と、まわりの煙（仮）
    function inner(on, instant) {
      set(k(`${WN.crest}/6`), { opacity: on ? 0.6 : 0 });
      set(k(6), { opacity: on ? 0.55 : 0 }); set(k(4), { opacity: on ? 0.35 : 0 });
      if (!instant && on) anim(k(`${WN.crest}/6`), [{ opacity: 0, transform: 'scale(0.6)' }, { opacity: 0.95, transform: 'scale(1.1)', offset: 0.35 }, { opacity: 0.6, transform: 'none' }], { duration: 650 });
    }
    function apply(st, instant) {
      const t = st.t ?? 0, v = Math.max(0, Math.min(100, Math.round(st.beast ?? 0)));
      const def = !!st.st?.defiance && st.st.defiance.until > t, ir = !!st.st?.ir && st.st.ir.until > t;
      if (instant || v !== prev.v) beast(prev.v, v, instant);
      if (instant || def !== prev.def) defiance(def, instant);
      if (instant || ir !== prev.ir) inner(ir, instant);
      prev = { v, def, ir };
    }
    function setSimple(v) { simple = !!v; k(WN.normal).hidden = simple; k(WN.simple).hidden = !simple; }
    apply({ beast: 0, st: {}, t: 0 }, true);
    return {
      windows: [{ name: 'JobHudWAR0', label: 'インナービーストゲージ', el: K.el, w: K.w, h: K.h }],
      update: (st) => apply(st, false), reset: (st) => apply(st, true), setSimple, isSimple: () => simple,
    };
  }

  window.MockGauge2.add({ WAR: war });
})();
