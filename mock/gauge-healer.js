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
  //   フェイユニオン中: 棒の青い光（#7）と光の帯（#11）
  //   #19 はノードの幅と高さがパーツと縦横逆（188×76 と 76×188）。パーツの大きさで描き、回転で横にする
  //   シンプル表示（#26）: #29 アイコン・#30 数字・#31 セラフィムの残り秒・#32 棒（部品 1001: #6 を塗りにする）
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
        for (const id of [4, '30/2']) { const n = k1(id); if (n) n.textContent = String(fey); }
        if (!instant && fey > (prev.fey ?? 0)) anim(k1(20), [{ filter: 'brightness(1.8)' }, { filter: 'none' }], { duration: 400 });
      }
      // フェアリー: eos / seraph / null（転化中・召喚していない）
      const ser = st.seraph && st.seraph.until > t ? st.seraph : null;
      const dissip = (st.st?.dissipation?.until ?? 0) > t;
      const who = ser ? 'seraph' : st.fairy && !dissip ? 'eos' : null;
      if (instant || who !== prev.who) {
        for (const id of [13, 14]) set(k1(id), { opacity: who === 'eos' ? 1 : 0 });
        for (const id of [18, 19]) set(k1(id), { opacity: who === 'seraph' ? 1 : 0 });
        set(k1(16), { opacity: who === 'seraph' ? 1 : 0 });
        set(k1(29), { filter: who ? 'none' : 'brightness(0.35) saturate(0.3)' });
        set(k1(31), { opacity: who === 'seraph' ? 1 : 0 });
        set(k1(20), { filter: who ? 'none' : 'saturate(0.35) brightness(0.7)' });
        if (!instant && who) {
          anim(k1(who === 'seraph' ? 19 : 14), [{ opacity: 0, transform: 'scale(0.6)' }, { opacity: 1, transform: 'none' }], { duration: 450 });
          anim(k1(10), [{ opacity: 0.9 }, { opacity: 0 }], { duration: 700 });
        }
      }
      const left = ser ? String(Math.ceil((ser.until - t) / 1000)) : '';
      if (left !== prev.left) for (const id of [16, '31/2']) { const n = k1(id); if (n) n.textContent = left; }
      // フェイユニオン
      const uni = !!st.union;
      if (instant || uni !== prev.uni) {
        set(k1(7), { opacity: uni ? 0.85 : 0 }); set(k1(11), { opacity: uni ? 0.75 : 0 });
        if (uni && !instant) anim(k1(11), [{ opacity: 0.2 }, { opacity: 0.75 }], { duration: 500 });
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

  window.MockGauge2.add({ SCH: sch });
})();
