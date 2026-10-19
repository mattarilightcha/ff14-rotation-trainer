// ジョブゲージ（ヒーラー: 学者・賢者）。gauge2.js と同じく、クライアントから抽出した ULD とテクスチャ（アトラスのまま）で
// ゲームのゲージを組み立て、状態に合わせて動かす。どのノードが何を表すかは、ULD のパーツ（アトラスの絵）・並び・初期値から判断した。
// 光り方などの動きは、ゲームのアニメーション定義（ULD のタイムライン）を抽出していないため仮（docs/SPEC.md §10 UI-01）
(function () {
  'use strict';
  const { U, set, anim, clipW, usePart, partsOf } = window.MockGauge2.lib;

  // ---------------- 学者: エーテルフロー（JobHudSCH0）とフェアリーゲージ（JobHudSCH1）----------------
  // エーテルフロー（通常 #2）: #3〜#5 が 1 つずつ（部品 1001: 緑の結晶 #6 と青い煙 #5・#3 の組 #4、光 #2）。#6 は枠（空の台座 3 つ）
  //   シンプル表示（#7）: #8〜#10（部品 1002: 点いた菱形の組 #2。ULD の初期値は拡大・透明なので、点いたら等倍・不透明にする）
  // フェアリーゲージ（通常 #2）: 棒（#20 塗り・#21 暗い下地）・数字（#3 の文字 #4）・枠 #24（暗いフェアリーの影が描いてある）
  //   エオス: 黄緑のフェアリー（#13）と葉の翼（#14）。セラフィム: 白いセラフィム（#18）と青い羽根（#19）、残り秒（文字 #16）
  //   フェイユニオン中: 黄緑に光る翼と光の帯（#11 をパーツ 2/3 に替える。ULD の 2/8 は青緑）。棒は加算色を外した薄い緑。
  //     公式ジョブガイドの HUD の絵（public/jobguide/hud/scholar/02.png。シンプル表示の「フェイユニオン実行中」の棒も黄緑）に合わせた
  //   #19 はノードの幅と高さがパーツと縦横逆（188×76 と 76×188）。パーツの大きさで描き、回転で横にする
  //   シンプル表示（#26）: #31 が数字（フェイエーテル）、#32 が棒（部品 1001 の #6）。棒の色は公式の絵に合わせる: ふだん青緑・フェイユニオン中は黄緑・
  //     セラフィムの間は白。セラフィムの間だけ左上に羽のアイコン（#29）と残り秒（#30）を出す
  const SCH_FLOW = [3, 4, 5], SCH_SFLOW = [8, 9, 10];
  const FEY_W = 174, SCH_SBAR_W = 160;
  function sch(G) {
    const L0 = G.layouts.JobHudSCH0, L1 = G.layouts.JobHudSCH1;
    const K = U.build(L0, G.textures), K1 = U.build(L1, G.textures);
    const k = (id) => K.get(id), k1 = (id) => K1.get(id);
    let simple = false, prev = {};
    // エーテルフロー: 光（部品の #2）は隠す。シンプル表示の菱形の組は等倍に
    for (const q of SCH_FLOW) set(k(`${q}/2`), { opacity: 0 });
    for (const q of SCH_SFLOW) set(k(`${q}/2`), { transform: 'none', opacity: 0 });
    k(7).hidden = true;
    // フェアリーゲージ: 演出の部品は隠す
    for (const id of [5, 6, 7, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 22, 23, 25]) set(k1(id), { opacity: 0 });
    usePart(K1.img('19'), G.textures.JobHudSCH1, partsOf(L1, 2)[10]);
    for (const id of [4, 16]) { const n = k1(id); if (n) { n.classList.add('g2-num'); n.style.textAlign = 'center'; } }
    for (const id of ['30/2', '31/2']) k1(id)?.classList.add('g2-snum');
    for (const id of [4, 5]) set(k1(`32/${id}`), { opacity: 0 });
    k1(26).hidden = true;
    const C = window.MockUld.colorFilter, P2 = partsOf(L1, 2), tex1 = G.textures.JobHudSCH1;
    const look = { bar: K1.img(20)?.style.filter ?? '', sbar: C([-20, 30, -60]), sbarUnion: C([170, 80, -220]), sbarSeraph: C([215, 120, 10]) };
    usePart(K1.img(11), tex1, P2[3]);
    function apply(st, instant) {
      const t = st.t ?? 0;
      // エーテルフロー
      const flow = st.flow ?? 0;
      if (instant || flow !== prev.flow) {
        SCH_FLOW.forEach((q, i) => {
          const on = i < flow;
          // 青い煙（#3・#5）は結晶に重なって暗くなるので薄く（ゲームでは揺らめく演出: 仮）
          set(k(`${q}/3`), { opacity: on ? 0.25 : 0 }); set(k(`${q}/4`), { opacity: on ? 1 : 0 }); set(k(`${q}/5`), { opacity: 0.3 });
          set(k(`${SCH_SFLOW[i]}/2`), { opacity: on ? 1 : 0 });
          if (!instant && on && i >= (prev.flow ?? 0)) {
            anim(k(`${q}/4`), [{ transform: 'scale(1.3)', filter: 'brightness(2)' }, { transform: 'none', filter: 'none' }], { duration: 420, delay: (i - (prev.flow ?? 0)) * 90 });
            anim(k(`${q}/2`), [{ opacity: 1 }, { opacity: 0 }], { duration: 500, delay: (i - (prev.flow ?? 0)) * 90 });
          }
          if (!instant && !on && i < (prev.flow ?? 0)) anim(k(`${q}/2`), [{ opacity: 0.9 }, { opacity: 0 }], { duration: 380 });
        });
      }
      // フェイエーテル（棒と数字）
      const fey = Math.max(0, Math.min(100, st.fey ?? 0));
      if (instant || fey !== prev.fey) {
        const w = Math.round((FEY_W * fey) / 100);
        set(k1(20), { clipPath: clipW(w, FEY_W) });
        set(k1('32/6'), { clipPath: clipW(Math.round((SCH_SBAR_W * fey) / 100), SCH_SBAR_W) });
        for (const id of [4, '31/2']) { const n = k1(id); if (n) n.textContent = String(fey); }
        if (!instant && fey > (prev.fey ?? 0)) anim(k1(20), [{ filter: 'brightness(1.8)' }, { filter: 'none' }], { duration: 400 });
      }
      // フェアリー: eos / seraph / null（転化中・召喚していない）
      const ser = st.seraph && st.seraph.until > t ? st.seraph : null;
      const dissip = !!st.st?.dissipation && st.st.dissipation.until > t;
      const who = ser ? 'seraph' : st.fairy && !dissip ? 'eos' : null;
      if (instant || who !== prev.who) {
        for (const id of [13, 14]) set(k1(id), { opacity: who === 'eos' ? 1 : 0 });
        for (const id of [18, 19]) set(k1(id), { opacity: who === 'seraph' ? 1 : 0 });
        set(k1(16), { opacity: who === 'seraph' ? 1 : 0 });
        set(k1(28), { opacity: who === 'seraph' ? 1 : 0 });
        set(k1(20), { filter: who ? 'none' : 'saturate(0.35) brightness(0.7)' });
        if (!instant && who) {
          anim(k1(who === 'seraph' ? 19 : 14), [{ opacity: 0, transform: 'scale(0.6)' }, { opacity: 1, transform: 'none' }], { duration: 450 });
          anim(k1(10), [{ opacity: 0.9 }, { opacity: 0 }], { duration: 700 });
        }
      }
      const left = ser ? String(Math.ceil((ser.until - t) / 1000)) : '';
      if (left !== prev.left) for (const id of [16, '30/2']) { const n = k1(id); if (n) n.textContent = left; }
      // フェイユニオン
      const uni = !!st.union;
      if (instant || uni !== prev.uni || who !== prev.who) {
        set(k1(11), { opacity: uni ? 1 : 0 });
        if (K1.img(20)) K1.img(20).style.filter = uni ? 'none' : look.bar;
        if (K1.img('32/6')) K1.img('32/6').style.filter = who === 'seraph' ? look.sbarSeraph : uni ? look.sbarUnion : look.sbar;
        if (uni && !instant) anim(k1(11), [{ opacity: 0.2 }, { opacity: 1 }], { duration: 500 });
      }
      prev = { flow, fey, who, left, uni };
    }
    function setSimple(v) { simple = !!v; k(2).hidden = simple; k(7).hidden = !simple; k1(2).hidden = simple; k1(26).hidden = !simple; }
    apply({ t: 0, fairy: true }, true);
    return {
      windows: [
        { name: 'JobHudSCH0', label: 'エーテルフロー', el: K.el, w: K.w, h: K.h },
        { name: 'JobHudSCH1', label: 'フェアリーゲージ', el: K1.el, w: K1.w, h: K1.h },
      ],
      update: (st) => apply(st, false), reset: (st) => apply(st, true), setSimple, isSimple: () => simple,
    };
  }


  // ---------------- 賢者: エウクラシア（JobHudGFF0）とアダーガルゲージ（JobHudGFF1）----------------
  // エウクラシア（通常 #2）: 中央の紋章（#15: #16 青く光る / #17 暗い）と、まわりの 4 枚のノウリス（#8〜#11 暗い / #4〜#7 青く光る。部品 1001 の #5 と稲妻 #2〜#4）。
  //   #12 青い光の輪・#13・#14 灰色の輪（左右の半分）・#3 中央の青い輪。シンプル表示は中央の紋章（#15）だけ
  // アダーガルゲージ（通常 #2）: 上のアダーガル 3 つ（#4〜#6。部品 1002: #13 の中の #15 が青い宝石・#16 が空の暗い宝石・#11 が枠）、
  //   公式ジョブガイドの HUD の絵（public/jobguide/hud/sage/）に合わせ、空の宝石は加算色（ULD の値では白くなる）を外して黒く、点いた宝石は明るい水色にする。
  //   次のアダーガルまでの棒（#8: #19 塗り・#20 暗い下地・#9 塗りの先の光）、下のアダースティング 3 つ（#22〜#24。部品 1001: #6 の中の #8 が紫の菱形・#9 が空）、#7 は枠。
  //   シンプル表示（#25）: #27〜#29 アダーガル・#31〜#33 アダースティング（点いた菱形の組 #2）・#35 棒（部品 1003 の #3）
  const GALL_Q = [4, 5, 6], STING_Q = [22, 23, 24], GALL_S = [27, 28, 29], STING_S = [31, 32, 33];
  const GALL_BAR_W = 144, GALL_SBAR_W = 160;
  function sge(G) {
    const L0 = G.layouts.JobHudGFF0, L1 = G.layouts.JobHudGFF1;
    const K = U.build(L0, G.textures), K1 = U.build(L1, G.textures);
    const k = (id) => K.get(id), k1 = (id) => K1.get(id);
    let simple = false, prev = {};
    // エウクラシア: 光る部品は隠しておく
    for (const q of [4, 5, 6, 7]) { set(k(q), { opacity: 0 }); for (const c of [2, 3, 4]) set(k(`${q}/${c}`), { opacity: 0 }); }
    // アダーガル・アダースティング: 演出の部品は隠す
    const C = window.MockUld.colorFilter;
    for (const q of GALL_Q) {
      for (const c of [2, 3, 4, 5, 6, 7, 8, 9, 10, 12]) set(k1(`${q}/${c}`), { opacity: 0 });
      set(k1(`${q}/14`), { opacity: 0 });
      if (K1.img(`${q}/16`)) K1.img(`${q}/16`).style.filter = 'none';
      if (K1.img(`${q}/15`)) K1.img(`${q}/15`).style.filter = C([60, 110, 60]);
    }
    if (K1.img(19)) K1.img(19).style.filter = 'none'; // 棒の塗り（ULD の加算色 -20 を外して、公式の絵の明るさに）
    for (const q of STING_Q) { for (const c of [2, 3, 4, 5, 7]) set(k1(`${q}/${c}`), { opacity: 0 }); }
    for (const q of STING_S) set(k1(`${q}/2`), { transform: 'none', opacity: 0 });
    set(k1(18), { opacity: 0 });
    k1(25).hidden = true;
    function apply(st, instant) {
      const t = st.t ?? 0;
      // エウクラシア
      const eu = !!st.st?.eukrasia && st.st.eukrasia.until > t;
      if (instant || eu !== prev.eu) {
        set(k(16), { opacity: eu ? 1 : 0 }); set(k(17), { opacity: eu ? 0 : 1 });
        for (const q of [4, 5, 6, 7]) set(k(q), { opacity: eu ? 1 : 0 });
        for (const q of [8, 9, 10, 11]) set(k(q), { opacity: eu ? 0 : 1 });
        set(k(12), { opacity: eu ? 0.9 : 0 }); set(k(3), { opacity: eu ? 1 : 0 });
        if (!instant && eu) {
          anim(k(15), [{ transform: 'scale(1.35)', filter: 'brightness(2)' }, { transform: 'none', filter: 'none' }], { duration: 380 });
          for (const q of [4, 5, 6, 7]) anim(k(`${q}/2`), [{ opacity: 0.9 }, { opacity: 0 }], { duration: 450 });
        }
      }
      // アダーガル
      const gall = st.gall ?? 0;
      if (instant || gall !== prev.gall) {
        GALL_Q.forEach((q, i) => {
          const on = i < gall;
          set(k1(`${q}/13`), { opacity: on ? 1 : 0 }); set(k1(`${q}/16`), { opacity: on ? 0 : 1 });
          set(k1(`${GALL_S[i]}/2`), { opacity: on ? 1 : 0 });
          if (!instant && on && i >= (prev.gall ?? 0)) anim(k1(`${q}/13`), [{ transform: 'scale(1.4)', filter: 'brightness(2)' }, { transform: 'none', filter: 'none' }], { duration: 420 });
          if (!instant && !on && i < (prev.gall ?? 0)) anim(k1(`${q}/3`), [{ opacity: 1 }, { opacity: 0 }], { duration: 400 });
        });
      }
      // 次のアダーガルまで（20 秒）。3 つあるときは満タンのまま
      const p = gall >= 3 ? 1 : Math.max(0, Math.min(1, (st.gallT ?? 0) / (st.gallMs ?? 20000)));
      const w = Math.round(GALL_BAR_W * p);
      if (instant || w !== prev.w) {
        set(k1(19), { clipPath: clipW(w, GALL_BAR_W) });
        set(k1(9), { transform: `translateX(${w}px)`, opacity: w > 2 && w < GALL_BAR_W ? 1 : 0 });
        set(k1('35/3'), { clipPath: clipW(Math.round(GALL_SBAR_W * p), GALL_SBAR_W) });
      }
      // アダースティング
      const sting = st.sting ?? 0;
      if (instant || sting !== prev.sting) {
        STING_Q.forEach((q, i) => {
          const on = i < sting;
          set(k1(`${q}/6`), { opacity: on ? 1 : 0 }); set(k1(`${q}/9`), { opacity: on ? 0 : 1 });
          set(k1(`${STING_S[i]}/2`), { opacity: on ? 1 : 0 });
          if (!instant && on && i >= (prev.sting ?? 0)) anim(k1(`${q}/6`), [{ transform: 'translateY(-10px)', filter: 'brightness(2)' }, { transform: 'none', filter: 'none' }], { duration: 420 });
        });
      }
      prev = { eu, gall, w, sting };
    }
    function setSimple(v) { simple = !!v; k(2).hidden = simple; k1(2).hidden = simple; k1(25).hidden = !simple; }
    apply({ t: 0, gall: 3 }, true);
    return {
      windows: [
        { name: 'JobHudGFF0', label: 'エウクラシア', el: K.el, w: K.w, h: K.h },
        { name: 'JobHudGFF1', label: 'アダーガルゲージ', el: K1.el, w: K1.w, h: K1.h },
      ],
      update: (st) => apply(st, false), reset: (st) => apply(st, true), setSimple, isSimple: () => simple,
    };
  }

  window.MockGauge2.add({ SCH: sch, SGE: sge });
})();
