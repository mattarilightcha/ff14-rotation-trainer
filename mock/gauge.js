// ジョブゲージ（侍）: クライアントから抽出した ULD とテクスチャ（アトラスのまま）でゲームのゲージを組み立て、状態に合わせて動かす。
// - 剣気・剣圧 = JobHudSAM0.uld、閃 = JobHudSAM1.uld。下のノード番号はこの 2 つの ULD のもの
// - どのノードを出すか・塗りの幅は、ゲームの状態（剣気・閃・剣圧）から決める
// - 光り方などの動きは、ゲームのアニメーション定義（ULD のタイムライン）を抽出していないため仮。
//   ULD に入っている各ノードの初期値（拡大率・透明度 = 動きの始まりの形）を手がかりにしている（docs/SPEC.md §10 UI-01）
// - 演出の光は、刀身・鍔・菱形のパーツの形（アトラスのアルファ）をマスクにして、形の内側だけに出す
(function () {
  'use strict';
  const U = window.MockUld;
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

  // ---- 剣気・剣圧（JobHudSAM0）----
  const KN = {
    normal: 2, simple: 24, sword: 3,
    num: 4, edgeGlow: 5, slashA: 6, slashB: 7, star: 8, streak: 9, tassel: 10, blade: 11, tip: 12,
    fill: 13, gain: 14, lost: 15, steel: 16, hilt: 17, numBg: 18,
    med: 19, gems: [20, 21, 22], medFrame: 23,
    sStacks: [26, 27, 28], sNum: 30, sBar: 31,
  };
  const BLADE_W = 276; // 刀身のノード（#13〜#16）の幅
  const BLADE_X = 93; // 刀身の左端（#11 の中の座標）
  const BAR_W = 160; // シンプル表示の棒（#31）の幅
  // ---- 閃（JobHudSAM1）: 雪・月・花ごとのノード ----
  // breath = 点灯中にゆっくり明滅する入れ物（中に色付きの字 bGlyph と後光 bAura）/ glow = 色付きの字 / glyph = 白い字
  // fxA・fxB = 粒や輪（点いた瞬間に散る）/ burst = 後光（点いた瞬間に広がる）/ orb = 中心の白い光 / lit・unlit = 点灯・消灯の鍔
  const SN = {
    setsu: { root: 3, breath: 4, bGlyph: 5, bAura: 6, glow: 7, glyph: 8, fxA: 9, fxB: 10, burst: 11, orb: 12, lit: 13, unlit: 14, sIcon: 42 },
    getsu: { root: 15, breath: 16, bGlyph: 17, bAura: 18, glow: 19, glyph: 20, fxA: 21, fxB: 22, burst: 23, orb: 24, lit: 25, unlit: 26, sIcon: 46 },
    ka: { root: 27, breath: 28, bGlyph: 29, bAura: 30, glow: 31, glyph: 32, fxA: 33, fxB: 34, burst: 35, orb: 36, lit: 37, unlit: 38, sIcon: 50 },
  };
  const SEN_KEYS = ['setsu', 'getsu', 'ka'];

  const set = (el, props) => { if (el) for (const [k, v] of Object.entries(props)) el.style[k] = v; };
  const anim = (el, frames, o) => (el && !reduce ? el.animate(frames, { easing: 'ease-out', ...o }) : null);
  const div = (cls) => { const d = document.createElement('div'); d.className = cls; return d; };

  function create(G) {
    const K = U.build(G.layouts.JobHudSAM0, G.textures);
    const S = U.build(G.layouts.JobHudSAM1, G.textures);
    const k = (id) => K.get(id), s = (id) => S.get(id);
    let simple = false;
    let prev = { kenki: 0, sen: { setsu: 0, getsu: 0, ka: 0 }, med: 0 };

    // ---------- 初期の表示: 効果のノードは隠し、土台だけ出す ----------
    for (const id of [KN.slashA, KN.slashB, KN.star, KN.streak, KN.gain, KN.lost, `${KN.tip}/3`]) set(k(id), { opacity: 0 });
    set(k(KN.edgeGlow), { opacity: 0.125 }); // ULD の値（alpha 32）のまま、塗った部分だけに出す
    for (const g of KN.gems) {
      for (const c of [2, 3, 4, 6]) set(k(`${g}/${c}`), { opacity: 0 });
    }
    k(KN.simple).hidden = true;
    const fillImg = K.img(KN.fill), gainImg = K.img(KN.gain), lostImg = K.img(KN.lost), edgeImg = K.img(KN.edgeGlow);
    fillImg.classList.add('k-fill');
    k(KN.tip).classList.add('k-tip');
    k(KN.num).classList.add('k-num');

    // 刀身の形でマスクした光の層（増えたときに刀身を走る）
    const bladeMask = div('gfx-mask k-sweep');
    U.mask(bladeMask, K.tex(K.part(KN.steel)), K.part(KN.steel));
    set(bladeMask, { left: `${BLADE_X}px`, top: '24px' });
    const bladeBand = div('gfx-band');
    bladeMask.appendChild(bladeBand);
    k(KN.blade).appendChild(bladeMask);
    // 剣圧の菱形の形でマスクした光（点いた瞬間に白く光る）
    const gemFlash = KN.gems.map((g) => {
      const m = div('gfx-mask');
      U.mask(m, K.tex(K.part(`${g}/6`)), K.part(`${g}/6`));
      m.appendChild(div('gfx-fill'));
      k(`${g}/1`).appendChild(m);
      set(m, { opacity: 0 });
      return m;
    });

    // 閃: 消灯の鍔だけ出す
    const senMask = {};
    for (const key of SEN_KEYS) {
      const n = SN[key];
      for (const id of [n.breath, n.glow, n.glyph, n.fxA, n.fxB, n.burst, n.orb, n.lit]) set(s(id), { opacity: 0 });
      set(s(n.unlit), { opacity: 1, transform: 'none' });
      // 鍔の形でマスクした光（点いたときに斜めに走る）
      const m = div('gfx-mask s-sweep');
      U.mask(m, S.tex(S.part(n.lit)), S.part(n.lit));
      m.appendChild(div('gfx-band'));
      s(n.root).appendChild(m);
      senMask[key] = m;
      set(s(n.sIcon), { opacity: 0 });
    }
    s(39).hidden = true;

    // ---------- 剣気 ----------
    const kw = (v) => Math.round((BLADE_W * v) / 100);
    function kenki(a, b, instant) {
      const wa = kw(a), wb = kw(b);
      k(KN.num).textContent = String(b);
      fillImg.style.transitionDelay = b > a && !instant ? '.1s' : '0s';
      fillImg.style.width = `${wb}px`;
      set(k(KN.tip), { left: `${BLADE_X + wb}px`, visibility: b > 0 && b < 100 ? 'visible' : 'hidden' });
      edgeImg.style.clipPath = `inset(0 ${278 - wb}px 0 0)`;
      bladeMask.style.clipPath = `inset(0 ${BLADE_W - wb}px 0 0)`;
      K.el.classList.toggle('k-full', b >= 100);
      // シンプル表示の数字と棒
      const sn = k(`${KN.sNum}/2`);
      if (sn) sn.textContent = String(b);
      set(k(`${KN.sBar}/5`), { clipPath: `inset(0 ${BAR_W - Math.round((BAR_W * b) / 100)}px 0 0)` });
      set(k(`${KN.sBar}/4`), { clipPath: `inset(0 ${BAR_W - Math.round((BAR_W * Math.max(a, b)) / 100)}px 0 0)`, opacity: instant ? 0 : 1 });
      set(k(`${KN.sBar}/6`), { opacity: 0 });
      if (instant) return;
      if (b > a) {
        // 増えた分: 明るく焼けた刀身を先に出し、赤い塗りが後から追いつく
        gainImg.style.width = `${wb}px`;
        gainImg.style.clipPath = `inset(0 0 0 ${wa}px)`;
        anim(k(KN.gain), [{ opacity: 1 }, { opacity: 1, offset: 0.4 }, { opacity: 0 }], { duration: 700 });
        anim(bladeBand, [{ transform: `translateX(${wa - 70}px)`, opacity: 0 }, { opacity: 1, offset: 0.25 }, { transform: `translateX(${wb + 10}px)`, opacity: 0 }], { duration: 520, easing: 'cubic-bezier(.3,.6,.4,1)' });
        anim(k(`${KN.tip}/3`), [{ opacity: 0, transform: 'scale(0.2, 1.1)' }, { opacity: 1, transform: 'scale(1.1, 1.15)', offset: 0.3 }, { opacity: 0, transform: 'scale(0.3, 1.1)' }], { duration: 460 });
        anim(k(KN.streak), [{ opacity: 0, transform: `translateX(${108 + wb - 201}px) scale(0.17, 1)` }, { opacity: 0.85, transform: `translateX(${108 + wb - 201}px) scale(0.55, 1)`, offset: 0.35 }, { opacity: 0, transform: `translateX(${108 + wb - 201}px) scale(0.1, 1)` }], { duration: 420 });
        anim(k(KN.edgeGlow), [{ opacity: 0.75 }, { opacity: 0.125 }], { duration: 600 });
        if (b >= 100 && a < 100) anim(k(KN.star), [{ opacity: 0, transform: 'scale(0.6)' }, { opacity: 1, transform: 'scale(2.2)', offset: 0.3 }, { opacity: 0, transform: 'scale(3.2)' }], { duration: 650 });
        anim(k(`${KN.sBar}/5`), [{ filter: 'brightness(2)' }, { filter: 'brightness(1)' }], { duration: 400 });
      } else {
        // 減った分: 暗く冷えた刀身が残ってから消える（#6・#7 の斜めの光は使いどころが分からないため出さない）
        lostImg.style.width = `${wa}px`;
        lostImg.style.clipPath = `inset(0 0 0 ${wb}px)`;
        anim(k(KN.lost), [{ opacity: 1 }, { opacity: 1, offset: 0.3 }, { opacity: 0 }], { duration: 650, easing: 'ease-in' });
        anim(k(`${KN.sBar}/4`), [{ opacity: 1 }, { opacity: 0 }], { duration: 600, fill: 'forwards' });
      }
    }

    // ---------- 剣圧 ----------
    function med(a, b, instant) {
      KN.gems.forEach((g, i) => {
        const on = i < b, was = i < a;
        set(k(`${g}/6`), { opacity: on ? 1 : 0, transform: 'none' });
        set(k(`${g}/4`), { opacity: on ? 1 : 0 });
        set(k(`${g}/5`), { opacity: 0.35, transform: 'scale(0.9)' });
        set(k(`${KN.sStacks[i]}/2`), { opacity: on ? 1 : 0 });
        if (instant || on === was) return;
        if (on) {
          anim(k(`${g}/6`), [{ opacity: 0, transform: 'scale(2)' }, { opacity: 1, transform: 'none' }], { duration: 240 });
          anim(k(`${g}/2`), [{ opacity: 0, transform: 'scale(0.6)' }, { opacity: 0.95, transform: 'scale(1.1)', offset: 0.3 }, { opacity: 0, transform: 'scale(1.6)' }], { duration: 560 });
          anim(k(`${g}/3`), [{ opacity: 0, transform: 'scale(0.1, 0.4)' }, { opacity: 0.9, transform: 'scale(0.5, 0.4)', offset: 0.35 }, { opacity: 0, transform: 'scale(0.7, 0.3)' }], { duration: 480 });
          anim(gemFlash[i], [{ opacity: 1 }, { opacity: 0 }], { duration: 380, delay: 120 });
          anim(k(`${KN.sStacks[i]}/2`), [{ opacity: 0, transform: 'scale(1.8)' }, { opacity: 1, transform: 'none' }], { duration: 260 });
        } else {
          anim(k(`${g}/6`), [{ opacity: 1 }, { opacity: 0 }], { duration: 300 });
          anim(k(`${g}/2`), [{ opacity: 0.7, transform: 'scale(1)' }, { opacity: 0, transform: 'scale(1.5)' }], { duration: 420 });
        }
      });
      K.el.classList.toggle('m-full', b >= 3);
    }

    // ---------- 閃 ----------
    function sen(key, on, instant) {
      const n = SN[key];
      set(s(n.unlit), { opacity: 1 });
      set(s(n.lit), { opacity: on ? 1 : 0, transform: 'none' });
      set(s(n.glyph), { opacity: on ? 0.95 : 0, transform: 'none' });
      set(s(n.glow), { opacity: on ? 0.3 : 0, transform: 'none' });
      set(s(n.breath), { opacity: on ? 1 : 0 });
      set(s(n.bGlyph), { opacity: 0.35 });
      set(s(n.bAura), { opacity: 0.55, transform: 'none' });
      s(n.breath).classList.toggle('s-breath', on);
      set(s(n.sIcon), { opacity: on ? 1 : 0, transform: 'none' });
      if (instant) return;
      if (on) {
        anim(s(n.lit), [{ opacity: 0, transform: 'scale(1.125)' }, { opacity: 1, transform: 'none' }], { duration: 320 });
        anim(s(n.glyph), [{ opacity: 0, transform: 'scale(1.25)' }, { opacity: 0.95, transform: 'none' }], { duration: 380, delay: 60, fill: 'backwards' });
        anim(s(n.glow), [{ opacity: 0.95, transform: 'scale(1.2)' }, { opacity: 0.3, transform: 'none' }], { duration: 700 });
        anim(s(n.burst), [{ opacity: 0.9, transform: 'scale(1)' }, { opacity: 0, transform: 'scale(1.4)' }], { duration: 650 });
        anim(s(n.orb), [{ opacity: 0.9, transform: 'scale(0.6)' }, { opacity: 0, transform: 'scale(2)' }], { duration: 520 });
        for (const fx of [n.fxA, n.fxB]) anim(s(fx), [{ opacity: 1, transform: 'scale(0.9)' }, { opacity: 0, transform: 'translateY(-6px) scale(1.3)' }], { duration: 850 });
        anim(senMask[key].firstChild, [{ transform: 'translate(-60px, -60px) rotate(45deg)', opacity: 0 }, { opacity: 1, offset: 0.3 }, { transform: 'translate(60px, 60px) rotate(45deg)', opacity: 0 }], { duration: 560, delay: 120 });
        anim(s(n.sIcon), [{ opacity: 0, transform: 'scale(2.5)' }, { opacity: 1, transform: 'none' }], { duration: 260 });
      } else {
        anim(s(n.lit), [{ opacity: 1 }, { opacity: 0 }], { duration: 420 });
        anim(s(n.glyph), [{ opacity: 0.95, transform: 'none' }, { opacity: 0, transform: 'scale(1.18)' }], { duration: 360 });
        anim(s(n.orb), [{ opacity: 0.7, transform: 'scale(1)' }, { opacity: 0, transform: 'scale(1.6)' }], { duration: 420 });
        anim(s(n.sIcon), [{ opacity: 1 }, { opacity: 0 }], { duration: 300 });
      }
    }

    function apply(st, instant) {
      const kv = Math.max(0, Math.min(100, Math.round(st.kenki)));
      if (instant || kv !== prev.kenki) kenki(prev.kenki, kv, instant);
      for (const key of SEN_KEYS) if (instant || !!st.sen[key] !== !!prev.sen[key]) sen(key, !!st.sen[key], instant);
      if (instant || st.med !== prev.med) med(prev.med, st.med, instant);
      prev = { kenki: kv, sen: { ...st.sen }, med: st.med };
    }

    function setSimple(v) {
      simple = !!v;
      k(KN.normal).hidden = simple; k(KN.simple).hidden = !simple;
      s(2).hidden = simple; s(39).hidden = !simple;
    }

    apply(prev, true);
    return {
      windows: [
        { name: 'JobHudSAM0', label: '剣気ゲージ', el: K.el, w: K.w, h: K.h },
        { name: 'JobHudSAM1', label: '閃ゲージ', el: S.el, w: S.w, h: S.h },
      ],
      update: (st) => apply(st, false),
      reset: (st) => apply(st, true),
      setSimple,
      isSimple: () => simple,
    };
  }

  window.MockGauge = { create };
})();
