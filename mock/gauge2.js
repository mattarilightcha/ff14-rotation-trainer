// ジョブゲージ（ナイト・白魔道士）: 侍（gauge.js）と同じく、クライアントから抽出した ULD とテクスチャ（アトラスのまま）で
// ゲームのゲージを組み立て、状態に合わせて動かす。
// - ナイト = JobHudPLD0.uld（オウスゲージ）、白魔道士 = JobHudWHM0.uld（ヒーリングゲージ）
// - どのノードが何を表すかは、ULD のパーツ（アトラスの絵）・並び・初期値から判断した。
//   光り方などの動きは、ゲームのアニメーション定義（ULD のタイムライン）を抽出していないため仮（docs/SPEC.md §10 UI-01）
(function () {
  'use strict';
  const U = window.MockUld;
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  const set = (el, props) => { if (el) for (const [k, v] of Object.entries(props)) el.style[k] = v; };
  const anim = (el, frames, o) => (el && !reduce ? el.animate(frames, { easing: 'ease-out', ...o }) : null);
  const clipW = (w, full) => `inset(0 ${Math.max(0, full - w)}px 0 0)`;
  // 画像のノードの絵を、同じアトラスの別のパーツに差し替える
  function usePart(img, tex, p) {
    if (!img || !tex || !p) return;
    img.style.width = `${p.w}px`; img.style.height = `${p.h}px`;
    img.style.backgroundImage = `url("${tex.path}")`;
    img.style.backgroundSize = `${tex.w / tex.scale}px ${tex.h / tex.scale}px`;
    img.style.backgroundPosition = `${-p.u}px ${-p.v}px`;
  }
  const partsOf = (layout, id) => layout.partLists.find((pl) => pl.id === id)?.parts ?? [];

  // ---------------- ナイト: オウスゲージ（0〜100）とアイアンウィル ----------------
  // #7 = 通常表示（#8: 数字 #9・数字の台 #10・棒 #11・枠 #12、#13: 翼の付いた盾）
  // #14 = シンプル表示（#15: 小さな盾のアイコン、#17: 数字、#18: 棒）
  // #3〜#6 と盾の中の #2 の子（翼・大きな紋章）は、光る演出の部品（最初は隠す）
  const PN = { normal: 7, simple: 14, num: 9, bar: 11, shield: 13, sIcon: 15, sNum: 17, sBar: 18, fx: [3, 4, 5, 6] };
  const OATH_W = 168; // 棒（#11）の幅
  const SBAR_W = 160; // シンプル表示の棒（#18）の幅
  function pld(G) {
    const L = G.layouts.JobHudPLD0;
    const K = U.build(L, G.textures);
    const k = (id) => K.get(id);
    const P1 = partsOf(L, 1), tex = G.textures.JobHudPLD;
    let simple = false, prev = { oath: 0, iw: false };

    for (const id of PN.fx) set(k(id), { opacity: 0 });
    for (const id of ['13/3', '13/4', '13/5']) set(k(id), { opacity: 0 });
    // 棒の中: #2 端の光（部品）・#3 塗り・#4 増えた分の明るい塗り・#5 減った分の暗い塗り・#6 地
    set(k(`${PN.bar}/4`), { opacity: 0 }); set(k(`${PN.bar}/5`), { opacity: 0 });
    set(k(`${PN.bar}/2/3`), { opacity: 0 });
    k(PN.num).classList.add('g2-num');
    k(`${PN.sNum}/2`)?.classList.add('g2-snum');
    // 盾の石: アイアンウィルが付いていれば橙の石（パーツ 15）、なければ暗い石（ULD の初期のパーツ 14）
    const gem = K.img(`${PN.shield}/9`);
    // シンプル表示の棒（Parameter_Gauge）: #4 塗り（橙）・#5・#6 は増減の演出の層（隠す）
    set(k(`${PN.sBar}/5`), { opacity: 0 }); set(k(`${PN.sBar}/6`), { opacity: 0 });
    k(PN.simple).hidden = true;

    function oath(a, b, instant) {
      const w = Math.round((OATH_W * b) / 100), wa = Math.round((OATH_W * a) / 100);
      k(PN.num).textContent = String(b);
      set(k(`${PN.bar}/3`), { clipPath: clipW(w, OATH_W) });
      set(k(`${PN.bar}/2`), { left: `${w}px`, visibility: b > 0 && b < 100 ? 'visible' : 'hidden' });
      const sn = k(`${PN.sNum}/2`); if (sn) sn.textContent = String(b);
      set(k(`${PN.sBar}/4`), { clipPath: clipW(Math.round((SBAR_W * b) / 100), SBAR_W) });
      K.el.classList.toggle('o-full', b >= 100);
      if (instant) return;
      if (b > a) {
        // 増えた分を明るく光らせてから消す
        set(k(`${PN.bar}/4`), { clipPath: `inset(0 ${OATH_W - w}px 0 ${wa}px)` });
        anim(k(`${PN.bar}/4`), [{ opacity: 1 }, { opacity: 0.9, offset: 0.35 }, { opacity: 0 }], { duration: 650 });
        anim(k(`${PN.bar}/2/2`), [{ filter: 'brightness(2.2)' }, { filter: 'brightness(1)' }], { duration: 500 });
        anim(k(`${PN.sBar}/4`), [{ filter: 'brightness(1.9)' }, { filter: 'brightness(1)' }], { duration: 420 });
        if (b >= 100 && a < 100) anim(k(4), [{ opacity: 0 }, { opacity: 0.9, offset: 0.3 }, { opacity: 0 }], { duration: 700 });
      } else {
        // 使った分: 暗い塗りが残ってから消える
        set(k(`${PN.bar}/5`), { clipPath: `inset(0 ${OATH_W - wa}px 0 ${w}px)` });
        anim(k(`${PN.bar}/5`), [{ opacity: 1 }, { opacity: 1, offset: 0.3 }, { opacity: 0 }], { duration: 600, easing: 'ease-in' });
      }
    }
    function ironWill(on, instant) {
      usePart(gem, tex, P1[on ? 15 : 14]);
      set(k(`${PN.shield}/7`), { opacity: on ? 0.55 : 0 });
      set(k(`${PN.sIcon}/2`), { opacity: on ? 1 : 0 });
      if (instant || !on) return;
      anim(k(`${PN.shield}/5`), [{ opacity: 0, transform: 'scale(0.6)' }, { opacity: 0.85, transform: 'scale(1)', offset: 0.3 }, { opacity: 0, transform: 'scale(1.15)' }], { duration: 700 });
      for (const w of ['13/3', '13/4']) anim(k(w), [{ opacity: 0, transform: 'scale(0.4)' }, { opacity: 1, transform: 'scale(1)', offset: 0.4 }, { opacity: 0, transform: 'scale(1.1)' }], { duration: 650 });
      anim(k(`${PN.sIcon}/2`), [{ opacity: 0, transform: 'scale(2)' }, { opacity: 1, transform: 'none' }], { duration: 260 });
    }
    function apply(st, instant) {
      const v = Math.max(0, Math.min(100, Math.round(st.oath ?? 0))), iw = !!st.st?.ironWill && st.st.ironWill.until > st.t;
      if (instant || v !== prev.oath) oath(prev.oath, v, instant);
      if (instant || iw !== prev.iw) ironWill(iw, instant);
      prev = { oath: v, iw };
    }
    function setSimple(v) { simple = !!v; k(PN.normal).hidden = simple; k(PN.simple).hidden = !simple; }
    apply(prev, true);
    return {
      windows: [{ name: 'JobHudPLD0', label: 'オウスゲージ', el: K.el, w: K.w, h: K.h }],
      update: (st) => apply(st, false), reset: (st) => apply({ ...st, oath: st.oath ?? 0 }, true), setSimple, isSimple: () => simple,
    };
  }

  // ---------------- 白魔道士: ヒーリングゲージ（リリー 3 つ・ブラッドリリー・リリーの時間）----------------
  // #3 = 通常表示: #5〜#7 リリーの置き場（下から順に 1〜3 つ目）、#8 ブラッドリリー、#16 つるの枠、
  //   #17〜#26 つるに沿って光る青い筋（10 枚。リリーが増えるまでの時間に合わせて順に出す。仮）、#13・#15 は光の演出
  // #27 = シンプル表示: #30〜#32 リリー、#34〜#36 ブラッドリリー、#38 時間の棒
  const WN = { normal: 3, simple: 27, lilies: [5, 6, 7], wisps: [17, 18, 19, 20, 21, 22, 23, 24, 25, 26], sLilies: [30, 31, 32], sBlood: [34, 35, 36], sBar: 38 };
  const TIMER_W = 160;
  function whm(G) {
    const L = G.layouts.JobHudWHM0;
    const K = U.build(L, G.textures);
    const k = (id) => K.get(id);
    const P3 = partsOf(L, 3), tex = G.textures.JobHudWHM;
    let simple = false, prev = { lily: 0, blood: 0, seg: 0 };

    for (const id of [13, 15]) set(k(id), { opacity: 0 });
    // リリーの置き場（部品 1005）: #3 後光・#4 #5 星・#6 #8 青い光（演出）、#9 小さな飾り、#10 リリーの結晶
    for (const s of WN.lilies) for (const c of [3, 4, 5, 6, 8]) set(k(`${s}/${c}`), { opacity: 0 });
    // ブラッドリリー（#8 の子。部品ではないのでノード番号のまま）: #9 後光（演出）・#10 花（段階でパーツ 8 → 9 → 10）・#11 赤い光
    set(k(9), { opacity: 0 });
    const bloodImg = K.img('10');
    for (const w of WN.wisps) set(k(w), { opacity: 0 });
    k(WN.simple).hidden = true;

    function lily(i, on, instant) {
      const s = WN.lilies[i];
      set(k(`${s}/10`), { opacity: on ? 1 : 0 });
      set(k(`${s}/6`), { opacity: on ? 0.35 : 0 });
      set(k(`${WN.sLilies[i]}/2`), { opacity: on ? 1 : 0, transform: 'none' });
      if (instant) return;
      if (on) {
        anim(k(`${s}/10`), [{ opacity: 0, transform: 'scale(1.5)' }, { opacity: 1, transform: 'none' }], { duration: 320 });
        anim(k(`${s}/3`), [{ opacity: 0.9, transform: 'scale(0.6)' }, { opacity: 0, transform: 'scale(1.4)' }], { duration: 600 });
        anim(k(`${s}/5`), [{ opacity: 0 }, { opacity: 1, offset: 0.3 }, { opacity: 0 }], { duration: 700 });
        anim(k(`${WN.sLilies[i]}/2`), [{ opacity: 0, transform: 'scale(2.2)' }, { opacity: 1, transform: 'none' }], { duration: 260 });
      } else {
        anim(k(`${s}/10`), [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'scale(1.3)' }], { duration: 360 });
        anim(k(`${s}/4`), [{ opacity: 0.9 }, { opacity: 0 }], { duration: 420 });
      }
    }
    function blood(a, b, instant) {
      set(k('10'), { opacity: b > 0 ? 1 : 0 });
      if (b > 0) usePart(bloodImg, tex, P3[7 + b]); // 1 = つぼみ（パーツ 8）、2 = 半開き（9）、3 = 満開（10）
      set(k('11'), { opacity: b >= 3 ? 0.9 : 0, transform: b >= 3 ? 'scale(1)' : 'scale(0.33)' });
      WN.sBlood.forEach((s, i) => set(k(`${s}/2`), { opacity: i < b ? 1 : 0, transform: 'none' }));
      K.el.classList.toggle('b-full', b >= 3);
      if (instant || b <= a) return;
      anim(k(9), [{ opacity: 0.9, transform: 'scale(0.8)' }, { opacity: 0, transform: 'scale(1.6)' }], { duration: 650 });
      anim(k('10'), [{ transform: 'scale(1.35)' }, { transform: 'none' }], { duration: 300 });
      if (b >= 3) anim(k(13), [{ opacity: 0 }, { opacity: 0.8, offset: 0.25 }, { opacity: 0 }], { duration: 800 });
    }
    // リリーが増えるまでの時間（0〜1）: つるの青い筋を順に出し、シンプル表示は棒で見せる
    function timer(p) {
      const seg = Math.max(0, Math.min(WN.wisps.length, Math.floor(p * WN.wisps.length + 1e-6)));
      if (seg !== prev.seg) WN.wisps.forEach((w, i) => set(k(w), { opacity: i < seg ? 1 : 0 }));
      set(k(`${WN.sBar}/3`), { clipPath: clipW(Math.round(TIMER_W * p), TIMER_W) });
      return seg;
    }
    function apply(st, instant) {
      const n = Math.max(0, Math.min(3, st.lily ?? 0)), b = Math.max(0, Math.min(3, st.blood ?? 0));
      for (let i = 0; i < 3; i++) if (instant || (i < n) !== (i < prev.lily)) lily(i, i < n, instant);
      if (instant || b !== prev.blood) blood(prev.blood, b, instant);
      const p = n >= 3 ? 1 : Math.min(1, (st.lilyT ?? 0) / (st.lilyMs ?? 20000));
      prev = { lily: n, blood: b, seg: timer(p) };
    }
    function setSimple(v) { simple = !!v; k(WN.normal).hidden = simple; k(WN.simple).hidden = !simple; }
    apply({ lily: 0, blood: 0, lilyT: 0 }, true);
    return {
      windows: [{ name: 'JobHudWHM0', label: 'ヒーリングゲージ', el: K.el, w: K.w, h: K.h }],
      update: (st) => apply(st, false), reset: (st) => apply(st, true), setSimple, isSimple: () => simple,
    };
  }

  const JOBS = { PLD: pld, WHM: whm };
  window.MockGauge2 = { create: (G, abbr) => JOBS[abbr](G) };
})();
