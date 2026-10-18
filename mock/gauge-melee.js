// ジョブゲージ（近接: モンク・竜騎士・忍者・リーパー・ヴァイパー）。gauge2.js と同じく、クライアントから抽出した ULD とテクスチャ（アトラスのまま）で
// ゲームのゲージを組み立て、状態に合わせて動かす。どのノードが何を表すかは、ULD のパーツ（アトラスの絵）・並び・初期値と、公式ジョブガイドの HUD の説明から判断した。
// 光り方などの動きは、ゲームのアニメーション定義（ULD のタイムライン）を抽出していないため仮（docs/SPEC.md §10 UI-01）
(function () {
  'use strict';
  const { U, set, anim, clipW, usePart, partsOf } = window.MockGauge2.lib;
  const pop = (el) => anim(el, [{ transform: 'scale(1.5)', filter: 'brightness(2)' }, { transform: 'none', filter: 'none' }], { duration: 380 });

  // ---------------- モンク: 象形拳シンボル（JobHudMNK0）と闘気シンボル（JobHudMNK1）----------------
  // 象形拳シンボル（通常 #2）:
  //   功力: #4 魔猿（玉 #5）・#7 走竜（#8）・#11 猛虎（#12・#13）。部品 1005 の #5 の中の #6 が功力の玉・#4 が空の玉。
  //     玉の色は型ごと（パーツ 6/5 桃・6/6 紫・6/7 緑。ジョブガイドの HUD の絵と同じ）。走竜の #9・猛虎の #14 は使わない（功力の上限が 1 / 2）
  //   陰陽の闘気: #25 陰・#26 陽の輪（部品 1001）と、#21 青・#23 橙の炎（#19 の組）。無いときは #27・#28 の暗い玉
  //   チャクラ（踏鳴）: #31〜#33（部品 1002 の #6 の中の #7。パーツ 1/3 魔猿・1/4 猛虎・1/5 走竜）。#34 は枠
  //   シンプル表示（#38）: 功力 #41 / #44 / #48・#49（部品 1004 の #3 が点いた菱形）、陰陽 #54・#57、チャクラ #61〜#63（部品 1003 の #4 にパーツ 3/1〜3）
  // 闘気シンボル（通常 #2）: 虎の頭の 5 つの穴に闘気の玉（#7〜#11。部品 1001 の #5 = パーツ 1/2）。6 つ目からは玉をパーツ 1/3（強い玉）に替えて数える。
  //   桃園結義（上限 10）の間は輪（#5 パーツ 1/1）を出す。シンプル表示（#19）: #22〜#26（部品 1002 の #3 の組: #5 橙・6 つ目からは #4 赤）
  const MNK_FURY = { opo: { slots: [5], s: [41] }, raptor: { slots: [8], s: [44] }, coeurl: { slots: [12, 13], s: [48, 49] } };
  const MNK_ORB = { opo: 5, raptor: 6, coeurl: 7 };
  const MNK_BEAST = { opo: 3, coeurl: 4, raptor: 5 }, MNK_SBEAST = { opo: 1, coeurl: 2, raptor: 3 };
  const MNK_CH = [7, 8, 9, 10, 11], MNK_SCH = [22, 23, 24, 25, 26];
  function mnk(G) {
    const L0 = G.layouts.JobHudMNK0, L1 = G.layouts.JobHudMNK1;
    const K = U.build(L0, G.textures), K1 = U.build(L1, G.textures);
    const k = (id) => K.get(id), k1 = (id) => K1.get(id);
    const tex0 = G.textures.JobHudMNK0, tex1 = G.textures.JobHudMNK1;
    const P1 = partsOf(L0, 1), P3 = partsOf(L0, 3), P6 = partsOf(L0, 6), Q1 = partsOf(L1, 1);
    let simple = false, prev = {};
    // 功力: 玉の色を型ごとに。光の部品と、使わない枠は隠す
    // 玉の加算色（ULD の値）は桃の玉に合わせたものなので、紫・緑の玉では外す
    for (const [f, o] of Object.entries(MNK_FURY)) for (const q of o.slots) { usePart(K.img(`${q}/6`), tex0, P6[MNK_ORB[f]]); if (f !== 'opo') K.img(`${q}/6`).style.filter = 'none'; set(k(`${q}/2`), { opacity: 0 }); set(k(`${q}/3`), { opacity: 0 }); }
    for (const q of [9, 14, 45, 50]) set(k(q), { opacity: 0 });
    // 陰陽: 炎の組 #19 は見えるように（ULD の初期値はほぼ透明）。輪の光は隠す
    set(k(19), { opacity: 1 }); for (const id of [20, 22, 29]) set(k(id), { opacity: 0 });
    for (const q of [25, 26]) for (const c of [2, 3]) set(k(`${q}/${c}`), { opacity: 0 });
    // チャクラ: 稲妻（部品の #2〜#5）は隠す
    for (const q of [31, 32, 33]) for (const c of [2, 3, 4, 5]) set(k(`${q}/${c}`), { opacity: 0 });
    for (const id of [35, 65]) set(k(id), { opacity: 0 });
    // 闘気シンボル: 演出の部品は隠す
    for (const q of MNK_CH) for (const c of [2, 3, 4, 6, 7, 8]) set(k1(`${q}/${c}`), { opacity: 0 });
    for (const id of [3, 4, 5, 12, 13, 14, 15, 17, 21]) set(k1(id), { opacity: 0 });
    for (const q of MNK_SCH) set(k1(`${q}/4`), { opacity: 0 });
    k(38).hidden = true; k1(19).hidden = true;
    function apply(st, instant) {
      const t = st.t ?? 0;
      const on = (key) => { const v = st.st?.[key]; return !!v && v.until > t; }; // 時刻は開始前（カウントダウン）に負になるので、無いときは 0 と比べない
      // 功力
      const fury = { opo: on('opoFury') ? 1 : 0, raptor: on('raptorFury') ? 1 : 0, coeurl: on('coeurlFury') ? (st.st.coeurlFury.stacks ?? 1) : 0 };
      const fk = `${fury.opo}${fury.raptor}${fury.coeurl}`;
      if (instant || fk !== prev.fk) {
        for (const [f, o] of Object.entries(MNK_FURY)) {
          o.slots.forEach((q, i) => {
            const lit = i < fury[f];
            set(k(`${q}/5`), { opacity: lit ? 1 : 0 }); set(k(`${q}/4`), { opacity: lit ? 0 : 1 });
            if (!instant && lit && i >= (prev.fury?.[f] ?? 0)) pop(k(`${q}/5`));
          });
          // シンプル表示: 点いた菱形（#3）の手前に空の菱形（#2）があるので、点いたら #2 を隠す
          o.s.forEach((q, i) => { const lit = i < fury[f]; set(k(`${q}/3`), { opacity: lit ? 1 : 0, transform: 'none' }); set(k(`${q}/2`), { opacity: lit ? 0 : 1 }); });
        }
      }
      // 陰陽の闘気
      const lunar = !!st.lunar, solar = !!st.solar;
      if (instant || lunar !== prev.lunar || solar !== prev.solar) {
        set(k(25), { opacity: lunar ? 1 : 0 }); set(k(21), { opacity: lunar ? 1 : 0 }); set(k(27), { opacity: lunar ? 0 : 1 });
        set(k(26), { opacity: solar ? 1 : 0 }); set(k(23), { opacity: solar ? 1 : 0 }); set(k(28), { opacity: solar ? 0 : 1 });
        set(k(54), { opacity: lunar ? 1 : 0, transform: 'none' }); set(k(57), { opacity: solar ? 1 : 0, transform: 'none' });
        if (!instant && lunar && !prev.lunar) pop(k(25));
        if (!instant && solar && !prev.solar) pop(k(26));
      }
      // チャクラ（踏鳴）
      const beast = st.beast ?? [], bk = beast.join(',');
      if (instant || bk !== prev.bk) {
        [31, 32, 33].forEach((q, i) => {
          const b = beast[i], sq = [61, 62, 63][i];
          set(k(`${q}/6`), { opacity: b ? 1 : 0, transform: 'none' }); set(k(`${sq}/2`), { opacity: b ? 1 : 0 });
          if (b) { usePart(K.img(`${q}/7`), tex0, P1[MNK_BEAST[b]]); usePart(K.img(`${sq}/4`), tex0, P3[MNK_SBEAST[b]]); }
          if (!instant && b && i >= (prev.nb ?? 0)) pop(k(`${q}/6`));
        });
      }
      // 闘気（6 つ目からは強い玉）
      const ch = st.chakra ?? 0, bh = on('bhChakra');
      if (instant || ch !== prev.ch || bh !== prev.bh) {
        MNK_CH.forEach((q, i) => {
          const lit = i < ch, strong = i < ch - 5;
          set(k1(`${q}/5`), { opacity: lit ? 1 : 0, transform: 'none' });
          usePart(K1.img(`${q}/5`), tex1, Q1[strong ? 3 : 2]);
          if (!instant && lit && i >= (prev.ch ?? 0) % 5 && ch > (prev.ch ?? 0)) pop(k1(`${q}/5`));
        });
        MNK_SCH.forEach((q, i) => { const lit = i < ch, strong = i < ch - 5; set(k1(`${q}/3`), { opacity: lit ? 1 : 0, transform: 'none' }); set(k1(`${q}/4`), { opacity: strong ? 1 : 0 }); set(k1(`${q}/5`), { opacity: strong ? 0 : 1 }); });
        set(k1(5), { opacity: bh ? 0.55 : 0 });
      }
      prev = { fk, fury, lunar, solar, bk, nb: beast.length, ch, bh };
    }
    function setSimple(v) { simple = !!v; k(2).hidden = simple; k(38).hidden = !simple; k1(2).hidden = simple; k1(19).hidden = !simple; }
    apply({ t: 0, chakra: 0, beast: [] }, true);
    return {
      windows: [
        { name: 'JobHudMNK0', label: '象形拳シンボル', el: K.el, w: K.w, h: K.h },
        { name: 'JobHudMNK1', label: '闘気シンボル', el: K1.el, w: K1.w, h: K1.h },
      ],
      update: (st) => apply(st, false), reset: (st) => apply(st, true), setSimple, isSimple: () => simple,
    };
  }


  // ---------------- 忍者: 忍気ゲージ（JobHudNIN0）と風纏シンボル（JobHudNIN1）----------------
  // 忍気ゲージ（通常 #2）: 巻物 #13 の上の棒（#14。部品 1002 の #2 が紫の塗り・#5 が暗い下地）。忍気 50 以上（使える）ときは文字の光（#6・#8）を出す。
  //   右の筒（#15）は以前の風遁の残り時間の表示で、今は使わない（ジョブガイドの HUD の説明に無い）。シンプル表示（#16）: #19 棒（部品 1003 の #4）・#18 数字
  // 風纏シンボル（通常 #2）: 5 本のクナイ（#4〜#8。部品 1002 の #5 が光るクナイ・#4 が光）。空は #11〜#15 の暗いクナイ。
  //   背景の渦（#9・#10）はゲームでは型抜き（JobHudNIN1Mask）で切り抜くもので、型抜きを再現できないので出さない。シンプル表示（#17）: #19〜#23（部品 1004 の #4）
  const NIN_BAR_W = 174, NIN_SBAR_W = 160, NIN_KUNAI = [4, 5, 6, 7, 8], NIN_EMPTY = [11, 12, 13, 14, 15], NIN_SK = [19, 20, 21, 22, 23];
  function nin(G) {
    const L0 = G.layouts.JobHudNIN0, L1 = G.layouts.JobHudNIN1;
    const K = U.build(L0, G.textures), K1 = U.build(L1, G.textures);
    const k = (id) => K.get(id), k1 = (id) => K1.get(id);
    let simple = false, prev = {};
    for (const id of [3, 4, 5, 6, 8, 9, 10, 11, 12]) set(k(id), { opacity: 0 });
    for (const c of [3, 4]) set(k(`14/${c}`), { opacity: 0 });
    for (const c of [3, 4, 5]) set(k(`15/${c}`), { opacity: 0 });
    for (const c of [5, 6]) set(k(`19/${c}`), { opacity: 0 });
    const n18 = k('18/2'); if (n18) n18.classList.add('g2-snum');
    for (const q of NIN_KUNAI) for (const c of [2, 3, 4, 5]) set(k1(`${q}/${c}`), { opacity: 0 });
    for (const id of [9, 10, 16]) set(k1(id), { opacity: 0 });
    k(16).hidden = true; k1(17).hidden = true;
    function apply(st, instant) {
      const ninki = Math.max(0, Math.min(100, st.ninki ?? 0));
      if (instant || ninki !== prev.ninki) {
        set(k('14/2'), { clipPath: clipW(Math.round((NIN_BAR_W * ninki) / 100), NIN_BAR_W) });
        set(k('19/4'), { clipPath: clipW(Math.round((NIN_SBAR_W * ninki) / 100), NIN_SBAR_W) });
        const n = k('18/2'); if (n) n.textContent = String(ninki);
        const ok = ninki >= 50;
        set(k(6), { opacity: ok ? 0.75 : 0 }); set(k(8), { opacity: ok ? 0.35 : 0 });
        if (!instant && ok && (prev.ninki ?? 0) < 50) anim(k(13), [{ filter: 'brightness(1.8)' }, { filter: 'none' }], { duration: 450 });
      }
      const kaze = Math.max(0, Math.min(5, st.kaze ?? 0));
      if (instant || kaze !== prev.kaze) {
        NIN_KUNAI.forEach((q, i) => {
          const lit = i < kaze;
          set(k1(`${q}/5`), { opacity: lit ? 1 : 0 }); set(k1(NIN_EMPTY[i]), { opacity: lit ? 0 : 1 });
          set(k1(`${NIN_SK[i]}/4`), { opacity: lit ? 1 : 0 });
          if (!instant && lit && i >= (prev.kaze ?? 0)) anim(k1(`${q}/4`), [{ opacity: 0.9 }, { opacity: 0 }], { duration: 450 });
        });
      }
      prev = { ninki, kaze };
    }
    function setSimple(v) { simple = !!v; k(2).hidden = simple; k(16).hidden = !simple; k1(2).hidden = simple; k1(17).hidden = !simple; }
    apply({ ninki: 0, kaze: 0 }, true);
    return {
      windows: [
        { name: 'JobHudNIN0', label: '忍気ゲージ', el: K.el, w: K.w, h: K.h },
        { name: 'JobHudNIN1', label: '風纏シンボル', el: K1.el, w: K1.w, h: K1.h },
      ],
      update: (st) => apply(st, false), reset: (st) => apply(st, true), setSimple, isSimple: () => simple,
    };
  }

  window.MockGauge2.add({ MNK: mnk, NIN: nin });
})();
