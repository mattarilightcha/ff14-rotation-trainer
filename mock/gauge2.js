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

  // ---------------- 占星術師: アルカナゲージ（プレイ I〜III とマイナーアルカナのカード）----------------
  // #2 = 通常表示: #6・#7・#8 プレイ I・II・III のカードの枠、#9 マイナーアルカナ（月の上）。
  //   枠（部品 1001）の中: #3/#4 カードの絵（パーツリスト 2）・#5 枠の地・#8〜#12 きらめき（引いた直後の演出）・#13〜#17 光の演出
  // #23 = シンプル表示: #25〜#28 に同じ並び（部品 1011。#3/#4 がカードの絵）
  // 次のドロー（アストラル / アンブラル）は、コンパスの輪の色（#17〜#19）を青 / 金で見せる（仮）
  const AN = { normal: 2, simple: 23, slots: [6, 7, 8, 9], sSlots: [25, 26, 27, 28], rings: [17, 18, 19] };
  const CARD_PART = { balance: 0, bole: 1, arrow: 2, spear: 3, spire: 4, ewer: 5, lady: 6, lord: 7 };
  const SLOTS = ['p1', 'p2', 'p3', 'minor'];
  // 枠の色（ゲーム内の画面）: アストラルドローのカード = 水色、アンブラルドローのカード = ピンク（ULD の枠の色のまま）
  const ASTRAL_CARDS = new Set(['balance', 'arrow', 'spire', 'lord']);
  function ast(G) {
    const L = G.layouts.JobHudAST0;
    const K = U.build(L, G.textures);
    const k = (id) => K.get(id);
    const P2 = partsOf(L, 2), tex = G.textures.JobHudAST0;
    let simple = false, prev = { cards: {}, next: null };
    for (const sl of AN.slots) for (const c of [8, 9, 10, 11, 12, 13, 14, 15, 16, 17]) set(k(`${sl}/${c}`), { opacity: 0 });
    for (const id of [20, 21, 22]) set(k(id), { opacity: 0 });
    k(AN.simple).hidden = true;
    function card(i, c, instant) {
      const sl = AN.slots[i], ss = AN.sSlots[i];
      for (const [node, simple2] of [[sl, false], [ss, true]]) {
        const img = K.img(`${node}/4`);
        if (c) usePart(img, tex, P2[CARD_PART[c]]);
        // 絵の置き場（#3）は枠より 10px 上にあるので、枠の真ん中へ下げる（通常表示）
        set(k(`${node}/3`), { opacity: c ? 1 : 0, translate: simple2 ? '0 0' : '0 10px', scale: simple2 ? '1' : '0.86' });
        const cyan = c && ASTRAL_CARDS.has(c);
        set(k(`${node}/5`), { opacity: c ? 1 : 0.7, filter: cyan ? 'hue-rotate(-122deg) saturate(1.3) brightness(1.15)' : 'none' });
        if (simple2) set(k(`${node}/6`), { filter: cyan ? 'hue-rotate(-122deg) saturate(1.3)' : 'none' });
      }
      if (instant || !c) return;
      // 引いた: カードが表を向いて現れ、きらめきが散る
      anim(k(`${sl}/3`), [{ opacity: 0, transform: 'scaleX(0.1)' }, { opacity: 1, transform: 'none' }], { duration: 320 });
      for (const sp of [8, 9, 10, 11, 12]) anim(k(`${sl}/${sp}`), [{ opacity: 0 }, { opacity: 1, offset: 0.3 }, { opacity: 0 }], { duration: 700 + sp * 30 });
      anim(k(`${sl}/15`), [{ opacity: 0, transform: 'scale(0.6)' }, { opacity: 0.8, offset: 0.3 }, { opacity: 0, transform: 'scale(1.2)' }], { duration: 650 });
    }
    function used(i) {
      const sl = AN.slots[i];
      anim(k(`${sl}/16`), [{ opacity: 0.9, transform: 'scale(0.8)' }, { opacity: 0, transform: 'scale(1.4)' }], { duration: 500 });
    }
    function apply(st, instant) {
      const cards = st.cards ?? {};
      SLOTS.forEach((s2, i) => {
        const c = cards[s2] ?? null, was = prev.cards[s2] ?? null;
        if (instant || c !== was) { if (!instant && was && !c) used(i); card(i, c, instant); }
      });
      const next = st.nextDraw ?? 'astral';
      if (instant || next !== prev.next) {
        // 次のドローの色: アストラル = 青、アンブラル = 金（仮）
        const hue = next === 'umbral' ? 'hue-rotate(200deg) saturate(1.4)' : 'none';
        for (const r of AN.rings) set(k(r), { filter: hue });
      }
      prev = { cards: { ...cards }, next };
    }
    function setSimple(v) { simple = !!v; k(AN.normal).hidden = simple; k(AN.simple).hidden = !simple; }
    apply({ cards: {}, nextDraw: 'astral' }, true);
    return {
      windows: [{ name: 'JobHudAST0', label: 'アルカナゲージ', el: K.el, w: K.w, h: K.h }],
      update: (st) => apply(st, false), reset: (st) => apply(st, true), setSimple, isSimple: () => simple,
    };
  }

  // ---------------- 黒魔道士: エレメンタルゲージ（JobHudBLM0）とアストラルソウル（JobHudBLM1）----------------
  // BLM0 #2 = 通常表示: #13 中央の玉（黒 = なし。パーツ 1 青 = UB、2 赤 = AF に差し替え）、#15〜#17 段階の結晶
  //   （部品 1009: #2 の子 = AF の橙、#7 の子 = UB の水色）、#19〜#21 アンブラルハート（部品 1006: #4 青い針）、
  //   #6〜#8 ポリグロット（部品 1001: #3/#5 紫の宝石）、#29 ポリグロットが増えるまでの紫の弧、#10/#11 残り秒
  // BLM0 #33 = シンプル表示: #39〜#41 段階、#43〜#45 ハート、#50〜#52 ポリグロット（部品 1008: #3 が点いた印）、#47 残り秒
  // BLM1 #2 = アストラルソウルの六芒星: #8〜#13 の玉（部品 1002: #4 点いた玉・#2 赤い光）、#3・#4 は 6 つそろったときの炎
  // BLM1 #15 = シンプル表示: #16〜#21（部品 1001: #3 が点いた印）
  const BN = { normal: 2, simple: 33, orb: 13, crystals: [15, 16, 17], hearts: [19, 20, 21], poly: [6, 7, 8], arc: 29, num: 11,
    sStacks: [39, 40, 41], sHearts: [43, 44, 45], sPoly: [50, 51, 52], sNum: 47,
    souls: [8, 9, 10, 11, 12, 13], soulFx: [3, 4, 5, 6], sSouls: [16, 17, 18, 19, 20, 21], lance: 23 };
  function blm(G) {
    const L0 = G.layouts.JobHudBLM0, L1 = G.layouts.JobHudBLM1;
    const K = U.build(L0, G.textures), K1 = U.build(L1, G.textures);
    const k = (id) => K.get(id), k1 = (id) => K1.get(id);
    const P1 = partsOf(L0, 1), tex = G.textures.JobHudBLM0;
    const orbImg = K.img(String(BN.orb)), orbBlack = P1[24];
    let simple = false, prev = {};
    set(k(27), { opacity: 0 });
    for (const c of BN.crystals) for (const n of [4, 5, 6, 9, 10, 11]) set(k(`${c}/${n}`), { opacity: 0 });
    for (const h of BN.hearts) set(k(`${h}/3`), { opacity: 0 });
    for (const q of BN.poly) set(k(`${q}/4`), { opacity: 0 });
    for (const q of BN.soulFx) set(k1(q), { opacity: 0 });
    k(BN.simple).hidden = true; k1(15).hidden = true;
    // ポリグロットの弧: 絵の左上が円の中心。ULD には −90° の回転が入っているが、回すとゲーム内の画面（蜘蛛の巣の右側）より上にずれるので回さない。
    // 右（3 時）から時計回りに下へ伸ばす
    const arcEl = k(`${BN.arc}/3`);
    if (arcEl) arcEl.style.transform = 'none';
    set(k(10), { opacity: 0 }); // 通常表示の数字の枠（ゲーム内の画面では出ていない。時間は針で見せる）
    // ポリグロットの針（#3。玉から右に伸びる黒い針）: 時計の針のように玉の中心（#3 から見て 14, 8）を軸に
    // 右から真下まで 30 秒で 90° 回る。回りきるとポリグロットが 1 つたまり、右に戻る（依頼主の説明とゲーム内の画面から）
    const hand = k(3);
    if (hand) hand.style.transformOrigin = '14px 8px';
    // パラドックスの槍（#23。部品 1007）: 絵を灰色（パーツ 26）と色付き（27）で切り替え、光（#8）と火花（#2〜#7）はパラドックスのときだけ
    const lanceImgs = [K.img(`${BN.lance}/10`), K.img(`${BN.lance}/12`)];
    function apply(st, instant) {
      const af = st.af ?? 0, ub = st.ub ?? 0, hearts = st.hearts ?? 0, poly = st.poly ?? 0, soul = st.soul ?? 0;
      const aspect = af > 0 ? 'af' : ub > 0 ? 'ub' : null, stage = af || ub;
      if (instant || aspect !== prev.aspect) {
        usePart(orbImg, tex, aspect === 'af' ? P1[2] : aspect === 'ub' ? P1[1] : orbBlack);
        if (!instant && aspect) anim(k(BN.orb), [{ filter: 'brightness(2.2)', transform: 'scale(1.15)' }, { filter: 'brightness(1)', transform: 'none' }], { duration: 400 });
      }
      if (instant || aspect !== prev.aspect || stage !== prev.stage) {
        BN.crystals.forEach((c, i) => {
          const on = i < stage;
          set(k(`${c}/6`), { opacity: on && aspect === 'af' ? 1 : 0 }); set(k(`${c}/5`), { opacity: on && aspect === 'af' ? 0.6 : 0 });
          set(k(`${c}/11`), { opacity: on && aspect === 'ub' ? 1 : 0 }); set(k(`${c}/10`), { opacity: on && aspect === 'ub' ? 0.6 : 0 });
        });
        BN.sStacks.forEach((c, i) => { set(k(`${c}/3`), { opacity: i < stage ? 1 : 0, filter: aspect === 'ub' ? 'hue-rotate(190deg)' : 'none' }); });
      }
      if (instant || hearts !== prev.hearts) {
        BN.hearts.forEach((h, i) => set(k(`${h}/4`), { opacity: i < hearts ? 1 : 0 })); // ないときは出さない（ゲーム内の画面）
        BN.sHearts.forEach((h, i) => set(k(`${h}/3`), { opacity: i < hearts ? 1 : 0, filter: 'hue-rotate(190deg)' }));
      }
      if (instant || poly !== prev.poly) {
        BN.poly.forEach((q, i) => { set(k(`${q}/5`), { opacity: i < poly ? 1 : 0.15 }); if (!instant && i === poly - 1 && poly > (prev.poly ?? 0)) anim(k(`${q}/4`), [{ opacity: 1, transform: 'scale(1.4)' }, { opacity: 0, transform: 'none' }], { duration: 500 }); });
        BN.sPoly.forEach((q, i) => set(k(`${q}/3`), { opacity: i < poly ? 1 : 0, filter: 'hue-rotate(250deg)' }));
      }
      // ポリグロットの時間（AF / UB の間だけ進む）
      const p = aspect ? Math.min(1, (st.polyT ?? 0) / 30000) : 0;
      if (arcEl) arcEl.style.webkitMask = arcEl.style.mask = `conic-gradient(from 90deg at 0% 0%, #000 ${p * 90}deg, transparent ${p * 90}deg)`;
      if (hand) hand.style.transform = `rotate(${p * 90}deg)`; // 針の色はそのまま（紫になるのは後ろの弧）
      const sec = aspect ? String(Math.ceil((30000 - (st.polyT ?? 0)) / 1000)) : '';
      if (sec !== prev.sec) { const n = k(BN.num); if (n) n.textContent = sec; const sn = k(BN.sNum); if (sn) sn.textContent = sec; }
      if (instant || soul !== prev.soul) {
        BN.souls.forEach((q, i) => { set(k1(`${q}/4`), { opacity: i < soul ? 1 : 0 }); set(k1(`${q}/2`), { opacity: i < soul ? 0.5 : 0 }); });
        BN.sSouls.forEach((q, i) => set(k1(`${q}/3`), { opacity: i < soul ? 1 : 0 }));
        for (const f of BN.soulFx) set(k1(f), { opacity: soul >= 6 ? (f === 6 ? 0.8 : 0.45) : 0 });
        if (!instant && soul >= 6 && (prev.soul ?? 0) < 6) anim(k1(3), [{ opacity: 0, transform: 'scale(0.7)' }, { opacity: 0.9, offset: 0.3 }, { opacity: 0.55, transform: 'none' }], { duration: 600 });
      }
      const px = !!st.paradox;
      if (instant || px !== prev.px) {
        for (const im of lanceImgs) usePart(im, tex, P1[px ? 27 : 26]);
        set(k(`${BN.lance}/8`), { opacity: px ? 0.7 : 0 });
        for (const n of [2, 3, 4, 5, 6, 7]) set(k(`${BN.lance}/${n}`), { opacity: px ? 0.8 : 0 });
        if (!instant && px) anim(k(`${BN.lance}/8`), [{ opacity: 1, filter: 'brightness(2)' }, { opacity: 0.7, filter: 'none' }], { duration: 500 });
      }
      prev = { aspect, stage, hearts, poly, soul, sec, px };
    }
    function setSimple(v) { simple = !!v; k(BN.normal).hidden = simple; k(BN.simple).hidden = !simple; k1(2).hidden = simple; k1(15).hidden = !simple; }
    apply({}, true);
    return {
      windows: [
        { name: 'JobHudBLM0', label: 'エレメンタルゲージ', el: K.el, w: K.w, h: K.h },
        { name: 'JobHudBLM1', label: 'アストラルソウル', el: K1.el, w: K1.w, h: K1.h },
      ],
      update: (st) => apply(st, false), reset: (st) => apply(st, true), setSimple, isSimple: () => simple,
    };
  }

  // ---------------- 吟遊詩人: 詩歌ゲージ（JobHudBRD0）----------------
  // ゲーム内の画面（歌ごと・歌なし）を見て合わせた:
  //   五線譜（#73 金の五線）: 歌の経過時間の分だけ、左から五線が歌の色に染まる（#71 に五線の絵を歌の色で重ねる）。残り秒は #4
  //   左の竪琴（#74 の子 #75）: メヌエット = 翼の竪琴（パーツ 2）・バラード = 月の竪琴（0）・パイオン = 一角獣の竪琴（1）。歌がないときは #72（合わせた絵）
  //   詩心: メヌエットは青白い矢じり 3 つ（#60〜#62。部品 1009 の #5 が点いた絵）、パイオンは金の音符 4 つ（#55〜#58。部品 1008 の #6）
  //   コーダ（#7 の S 字の枠）: #18 バラード・#19 パイオン・#20 メヌエット。付いていればパーツリスト 4 の 3〜5（ピンク・橙・緑の宝石）
  //   ソウルボイス（#30 の塗り #3・#4 を 124px で切る。数字 #24）
  const SONG_COLOR = { wm: 'sepia(1) saturate(5) hue-rotate(55deg) brightness(1.05)', mb: 'sepia(1) saturate(4) hue-rotate(235deg) brightness(1.15)', ap: 'sepia(1) saturate(7) hue-rotate(-12deg) brightness(1.15)' };
  const LYRE = { wm: 2, mb: 0, ap: 1 };
  const CODA = { mb: { node: 18, lit: 3, dark: 22 }, ap: { node: 19, lit: 4, dark: 23 }, wm: { node: 20, lit: 5, dark: 24 } };
  const RN = { normal: 2, simple: 77, fill: 71, staff: 73, num: 4, wmMarks: [60, 61, 62], apMarks: [55, 56, 57, 58], sv: 30, svNum: 24 };
  const SONG_W = 160, SV_W = 124;
  function brd(G) {
    const L = G.layouts.JobHudBRD0;
    const K = U.build(L, G.textures);
    const k = (id) => K.get(id);
    const P1 = partsOf(L, 1), P4 = partsOf(L, 4), tex = G.textures.JobHudBRD0;
    const fillImg = K.img(String(RN.fill)), lyreImg = K.img('75');
    let simple = false, prev = {};
    // 演出用の光・線は隠し、形の部品だけ見せる
    // #32（五線の上の白い音符）は歌い始めの演出の部品なので隠す
    for (const id of [3, 5, 6, 31, 32, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 59, 63, 65, 76, 9, 10, 11, 12, 13, 14]) set(k(id), { opacity: 0 });
    for (const id of [64, 41, 74]) set(k(id), { opacity: 1 });
    set(k(RN.staff), { opacity: 1 });
    for (const n of RN.wmMarks) for (const c of [2, 3, 4, 6]) set(k(`${n}/${c}`), { opacity: 0 });
    for (const n of RN.apMarks) for (const c of [2, 3, 4, 5, 7]) set(k(`${n}/${c}`), { opacity: 0 });
    for (const c of Object.values(CODA)) { const f = c.node - 3; for (const q of [3, 4, 5, 6]) set(k(`${f}/${q}`), { opacity: 0 }); }
    usePart(fillImg, tex, P1[6]);
    const num = k(RN.num); if (num) { set(num, { opacity: 1 }); num.classList.add('g2-num'); }
    k(RN.simple).hidden = true;
    function apply(st, instant) {
      const song = st.song?.k ?? null, left = song ? Math.max(0, st.song.until - st.t) : 0, el = song ? Math.min(1, 1 - left / 45000) : 0;
      set(k(RN.fill), { clipPath: clipW(Math.round(SONG_W * el), SONG_W), opacity: song ? 1 : 0, filter: song ? `${SONG_COLOR[song]} drop-shadow(0 0 2px rgba(255,255,255,.6))` : 'none' });
      const sec = song ? String(Math.ceil(left / 1000)) : '';
      if (sec !== prev.sec && num) num.textContent = sec;
      if (instant || song !== prev.song) {
        if (song) usePart(lyreImg, tex, P1[LYRE[song]]);
        set(k(75), { opacity: song ? 1 : 0 }); set(k(72), { opacity: song ? 0 : 1 });
        if (!instant && song) anim(k(75), [{ transform: 'scale(1.12)', filter: 'brightness(1.8)' }, { transform: 'none', filter: 'none' }], { duration: 500 });
      }
      const rep = st.rep ?? 0;
      if (instant || rep !== prev.rep || song !== prev.song) {
        RN.wmMarks.forEach((n, i) => { set(k(n), { opacity: song === 'wm' ? 1 : 0 }); set(k(`${n}/5`), { opacity: i < rep ? 1 : 0 }); set(k(`${n}/7`), { opacity: 1 }); });
        RN.apMarks.forEach((n, i) => { set(k(n), { opacity: song === 'ap' ? 1 : 0 }); set(k(`${n}/6`), { opacity: i < rep ? 1 : 0 }); set(k(`${n}/8`), { opacity: 1 }); });
      }
      const sv = Math.max(0, Math.min(100, st.sv ?? 0));
      if (instant || sv !== prev.sv) {
        const w = Math.round((SV_W * sv) / 100);
        for (const c of [3, 4]) set(k(`${RN.sv}/${c}`), { clipPath: clipW(w, SV_W) });
        set(k(`${RN.sv}/2`), { opacity: 0 });
        const n2 = k(`${RN.svNum}/2`); if (n2) n2.textContent = String(sv);
        if (!instant && sv > (prev.sv ?? 0)) anim(k(`${RN.sv}/3`), [{ filter: 'brightness(1.8)' }, { filter: 'none' }], { duration: 350 });
      }
      const codas = st.codas ?? {};
      const ck = ['wm', 'mb', 'ap'].map((c) => (codas[c] ? 1 : 0)).join('');
      if (instant || ck !== prev.ck) {
        for (const [c, d] of Object.entries(CODA)) {
          const img = K.img(String(d.node)), on = !!codas[c];
          usePart(img, tex, on ? P4[d.lit] : P1[d.dark]);
          if (img) { img.style.left = on ? '3px' : '0'; img.style.top = on ? '3px' : '0'; img.style.position = 'absolute'; }
          set(k(d.node), { opacity: on ? 1 : 0.45 });
          if (!instant && on && !(prev.codas ?? {})[c]) anim(k(d.node), [{ transform: 'scale(1.6)', filter: 'brightness(2)' }, { transform: 'none', filter: 'none' }], { duration: 450 });
        }
      }
      prev = { song, rep, sv, ck, sec, codas: { ...codas } };
    }
    function setSimple(v) { simple = !!v; }
    apply({ t: 0 }, true);
    return {
      windows: [{ name: 'JobHudBRD0', label: '詩歌ゲージ', el: K.el, w: K.w, h: K.h }],
      update: (st) => apply(st, false), reset: (st) => apply(st, true), setSimple, isSimple: () => simple,
    };
  }

  const JOBS = { PLD: pld, WHM: whm, AST: ast, BLM: blm, BRD: brd };
  window.MockGauge2 = { create: (G, abbr) => JOBS[abbr](G) };
})();
