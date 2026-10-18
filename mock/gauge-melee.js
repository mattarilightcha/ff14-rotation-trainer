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
  //     玉の色は公式ジョブガイドの HUD の絵（public/jobguide/hud/monk/）に合わせた: 魔猿・走竜は ULD のまま（桃）、猛虎は水色（玉に加算色を足す）。
  //     走竜の #9・猛虎の #14 は使わない（功力の上限が 1 / 2）
  //   陰陽の闘気: #25 陰・#26 陽（部品 1001 の #5 の中の #6 = 暗い玉に紫の加算色）。陰は ULD のまま紫、陽は白（公式の絵）。無いときは #27・#28 の暗い玉。#19 の炎は出さない
  //   #35 の数字（#36）は公式の絵（踏鳴のチャクラが 3 つのとき）に出ているが、何の数かの説明が無いので出さない
  //   チャクラ（踏鳴）: #31〜#33（部品 1002 の #6 の中の #7。パーツ 1/3 魔猿・1/4 猛虎・1/5 走竜）。#34 は枠
  //   シンプル表示（#38）: 功力 #41 / #44 / #48・#49（部品 1004 の #3 が点いた菱形。魔猿は ULD のまま桃・走竜は紫・猛虎は水色: 公式の絵）、陰陽 #54・#57、
  //     チャクラ #61〜#63（部品 1003 の #4 にパーツ 3/1〜3）
  // 闘気シンボル（通常 #2）: 虎の頭の 5 つの穴に闘気の玉（#7〜#11。部品 1001 の #5 = パーツ 1/2）。6 つ目からは玉をパーツ 1/3（強い玉）に替えて数える。
  //   桃園結義（上限 10）の間は輪（#5 パーツ 1/1）を出す。シンプル表示（#19）: #22〜#26（部品 1002 の #3 の組: #5 橙・6 つ目からは #4 赤）
  const MNK_FURY = { opo: { slots: [5], s: [41] }, raptor: { slots: [8], s: [44] }, coeurl: { slots: [12, 13], s: [48, 49] } };
  const MNK_BEAST = { opo: 3, coeurl: 4, raptor: 5 }, MNK_SBEAST = { opo: 1, coeurl: 2, raptor: 3 };
  const MNK_CH = [7, 8, 9, 10, 11], MNK_SCH = [22, 23, 24, 25, 26];
  function mnk(G) {
    const L0 = G.layouts.JobHudMNK0, L1 = G.layouts.JobHudMNK1;
    const K = U.build(L0, G.textures), K1 = U.build(L1, G.textures);
    const k = (id) => K.get(id), k1 = (id) => K1.get(id);
    const tex0 = G.textures.JobHudMNK0, tex1 = G.textures.JobHudMNK1;
    const P1 = partsOf(L0, 1), P3 = partsOf(L0, 3), Q1 = partsOf(L1, 1);
    let simple = false, prev = {};
    // 功力: 玉の色（公式の絵）。光の部品と、使わない枠は隠す
    const C = window.MockUld.colorFilter;
    const FURY_LOOK = { coeurl: C([-60, 150, 100]) }, SFURY_LOOK = { raptor: C([-50, -70, 150]), coeurl: C([-170, 90, 70]) };
    for (const [f, o] of Object.entries(MNK_FURY)) {
      for (const q of o.slots) { if (FURY_LOOK[f]) K.img(`${q}/6`).style.filter = FURY_LOOK[f]; set(k(`${q}/2`), { opacity: 0 }); set(k(`${q}/3`), { opacity: 0 }); }
      for (const q of o.s) if (SFURY_LOOK[f]) K.img(`${q}/5`).style.filter = SFURY_LOOK[f];
    }
    for (const q of [9, 14, 45, 50]) set(k(q), { opacity: 0 });
    // 陰陽: 玉（#25・#26 の #5）を出し、陽は白に。輪の光と炎（#19）は隠す
    for (const id of [19, 29]) set(k(id), { opacity: 0 });
    for (const q of [25, 26]) { for (const c of [2, 3]) set(k(`${q}/${c}`), { opacity: 0 }); set(k(`${q}/5`), { opacity: 1 }); }
    K.img('26/6').style.filter = C([170, 170, 170]);
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
        set(k(25), { opacity: lunar ? 1 : 0 }); set(k(27), { opacity: lunar ? 0 : 1 });
        set(k(26), { opacity: solar ? 1 : 0 }); set(k(28), { opacity: solar ? 0 : 1 });
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
  // 忍気ゲージ（通常 #2）: 巻物 #13 の上の棒（#14。部品 1002 の #2 が紫の塗り・#4 が赤橙の塗り・#5 が暗い下地）。右下の #3 が数字。
  //   公式ジョブガイドの HUD の絵（public/jobguide/hud/ninja/）: 忍気が使えるとき（50 以上。シンプル表示の絵の「使用可能時」）は文字が赤橙になり、
  //   右の筒（#15。縦の棒の部品 1001 の #3 が橙の塗り）が光る。筒をいっぱいに光らせるのは仮（絵は忍気 100 の 1 枚だけ）。
  //   赤橙の塗り（#4）の色は公式の絵に合わせて明るくする。文字の光（#6・#8）は巻物が赤く濁るので出さない
  //   シンプル表示（#16）: #19 棒（部品 1003 の #4。使えるときは赤）・#18 数字
  // 風纏シンボル（通常 #2）: 5 本のクナイ（#4〜#8。部品 1002 の #5 が光るクナイ・#4 が光）。空は #11〜#15 の暗いクナイ。
  //   後ろの渦は #16（パーツ 2/1 の紫の渦。公式の絵）。風纏が無いときは暗い渦（パーツ 2/0）にする（仮）。
  //   公式の絵ではクナイが渦の真ん中を横切る位置にあるので、クナイ（#4〜#8・#11〜#15）を左下へずらす（ULD の位置のタイムラインは抽出していない）
  //   渦の中を流れる光（#9・#10）はゲームでは型抜き（JobHudNIN1Mask）で切り抜く演出なので出さない。シンプル表示（#17）: #19〜#23（部品 1004 の #4）
  const NIN_BAR_W = 174, NIN_SBAR_W = 160, NIN_KUNAI = [4, 5, 6, 7, 8], NIN_EMPTY = [11, 12, 13, 14, 15], NIN_SK = [19, 20, 21, 22, 23];
  function nin(G) {
    const L0 = G.layouts.JobHudNIN0, L1 = G.layouts.JobHudNIN1;
    const K = U.build(L0, G.textures), K1 = U.build(L1, G.textures);
    const k = (id) => K.get(id), k1 = (id) => K1.get(id);
    const C = window.MockUld.colorFilter, tex1 = G.textures.JobHudNIN1, Q2 = partsOf(L1, 2);
    let simple = false, prev = {};
    const sbar = { normal: K.img('19/4')?.style.filter ?? '', ready: C([150, -40, -50], [100, 45, 40]) };
    for (const id of [4, 5, 6, 8, 9, 10, 11, 12]) set(k(id), { opacity: 0 });
    for (const c of [3, 4]) set(k(`14/${c}`), { opacity: 0 });
    if (K.img('14/4')) K.img('14/4').style.filter = C([150, -120, -160]);
    for (const c of [3, 4, 5]) set(k(`15/${c}`), { opacity: 0 });
    for (const c of [5, 6]) set(k(`19/${c}`), { opacity: 0 });
    const num = k(3); if (num) { num.classList.add('g2-num'); set(num, { textShadow: '0 0 2px #000, 0 0 2px #000, 0 1px 3px #000, 0 0 8px rgba(180, 120, 255, .8)' }); }
    const n18 = k('18/2'); if (n18) n18.classList.add('g2-snum');
    for (const q of NIN_KUNAI) for (const c of [2, 3, 4, 5]) set(k1(`${q}/${c}`), { opacity: 0 });
    for (const id of [9, 10]) set(k1(id), { opacity: 0 });
    set(k1(16), { opacity: 1 }); if (K1.img(16)) K1.img(16).style.filter = 'none';
    for (const q of [...NIN_KUNAI, ...NIN_EMPTY]) set(k1(q), { transform: 'translate(-19px, 30px)' });
    k(16).hidden = true; k1(17).hidden = true;
    function apply(st, instant) {
      const ninki = Math.max(0, Math.min(100, st.ninki ?? 0));
      if (instant || ninki !== prev.ninki) {
        const ok = ninki >= 50, clip = clipW(Math.round((NIN_BAR_W * ninki) / 100), NIN_BAR_W);
        set(k('14/2'), { clipPath: clip, opacity: ok ? 0 : 1 }); set(k('14/4'), { clipPath: clip, opacity: ok ? 1 : 0 });
        set(k('15/3'), { opacity: ok ? 1 : 0 });
        set(k('19/4'), { clipPath: clipW(Math.round((NIN_SBAR_W * ninki) / 100), NIN_SBAR_W) }); if (K.img('19/4')) K.img('19/4').style.filter = ok ? sbar.ready : sbar.normal;
        const n = k('18/2'); if (n) n.textContent = String(ninki);
        if (num) num.textContent = String(ninki);
        if (!instant && ok && (prev.ninki ?? 0) < 50) anim(k(13), [{ filter: 'brightness(1.8)' }, { filter: 'none' }], { duration: 450 });
      }
      const kaze = Math.max(0, Math.min(5, st.kaze ?? 0));
      if (instant || kaze !== prev.kaze) {
        usePart(K1.img(16), tex1, Q2[kaze > 0 ? 1 : 0]);
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

  // ---------------- 竜騎士: 竜血ゲージ（JobHudDRG0）----------------
  // 公式ジョブガイドの HUD の絵（public/jobguide/hud/dragoon/01〜06.png）に合わせた:
  //   ふだん: 青い竜（#29 の線画・#30 の影）・槍（#26 = パーツ 2/15）・矢羽根の模様（#27 = 2/16）・天竜眼の枠（#13）
  //   紅の竜血の間: 竜が赤くなる（#30 の青い影の代わりに #32 の赤い影。#29 の線画も赤く）。槍と模様の代わりに棘の付いた枠が出て、
  //     その中の棒（#28。部品 1003 の #2 が塗り・#4 が地、幅 152）が残り時間。左の黒い棘の上に残り秒の数字（#4）。
  //     色は公式の絵に合わせた（ULD の加算色のままだと、竜の影は薄い桃色・棒は青。ゲームはアニメーションで色を変えていると見られる）
  //     棘の枠は上下 2 つのパーツ（2/2 が上・2/14 が下。アトラスで隣り合う 244×80 の 1 枚絵）で、#26・#27 と同じ大きさ（244×40）なので、この 2 つのパーツを差し替えて上下に並べる。
  //     枠の位置（左上 23,45）は公式の絵から測った（ULD の位置のタイムラインは抽出していない）
  //   天竜眼: 枠（#13）の中の紫の玉 #11・#12（パーツ 7/1・7/2）。公式の絵では点いた玉は明るい桃色で、枠の縁も桃色がかるので、その色を足す。増えたときに #9・#10 の光
  //   竜の目（#20 の組）・目の上の炎（#14〜#17）・#7・#8・#18・#19 は公式の絵に無い（以前の版の部品）ので出さない
  // シンプル表示（#33）: 天竜眼は #39・#40（部品 1002 の #2 が点いた菱形）、紅の竜血は #43 の棒（部品 1004 の #3、幅 160。赤にする）と #42 の数字（残り秒）。
  //   紅の竜血でないときは数字（#42）を出さない。#36・#37（部品 1001）は公式の絵に無いので隠す
  const DRG_BAR_W = 152, DRG_SBAR_W = 160, DRG_FOCUS = [11, 12], DRG_SFOCUS = [39, 40];
  const DRG_FRAME = { x: 23, y: 45 };
  function drg(G) {
    const L = G.layouts.JobHudDRG0;
    const K = U.build(L, G.textures);
    const k = (id) => K.get(id);
    const tex = G.textures.JobHudDRG0, P2 = partsOf(L, 2);
    let simple = false, prev = {};
    const LOTD_MS = 20000;
    const C = window.MockUld.colorFilter;
    const paint = (el, f) => { if (el) el.style.filter = f; };
    const look = {
      blue: { lines: K.img(29)?.style.filter ?? '', bar: K.img('28/2')?.style.filter ?? '', sbar: K.img('43/3')?.style.filter ?? '' },
      red: { lines: C([60, -120, -80]), bar: C([198, 14, 5], [23, 59, 55]), sbar: C([110, -20, -25], [60, 45, 40]) },
    };
    paint(K.img(32), C([150, -255, -255])); // 紅の竜血の竜の影（ULD の加算色 100,-20,-20 では薄い桃色になる）
    const focusLook = { orb: C([80, 10, 50]), rim: C([30, -30, -10]) };
    for (const q of DRG_FOCUS) paint(K.img(q), focusLook.orb);
    // 槍・模様と棘の枠の差し替え（位置も）
    const spear = { el: k(26), part: P2[15], x: 30, y: 64 }, marks = { el: k(27), part: P2[16], x: 44, y: 64 };
    function frame(on) {
      usePart(K.img(26), tex, on ? P2[2] : spear.part); usePart(K.img(27), tex, on ? P2[14] : marks.part);
      set(spear.el, { left: `${on ? DRG_FRAME.x : spear.x}px`, top: `${on ? DRG_FRAME.y : spear.y}px` });
      set(marks.el, { left: `${on ? DRG_FRAME.x : marks.x}px`, top: `${on ? DRG_FRAME.y + 40 : marks.y}px` });
    }
    for (const id of [7, 8, 9, 10, 14, 15, 16, 17, 18, 19, 20, 32]) set(k(id), { opacity: 0 });
    set(k('28/3'), { opacity: 0 }); set(k('43/4'), { opacity: 0 }); set(k(35), { opacity: 0 });
    // 数字（#4）: 左の黒い棘の上に、右寄せで。公式の絵の数字は横に広いので、横に伸ばす
    const num = k(4);
    if (num) {
      num.classList.add('g2-num');
      set(num, { left: '18px', top: '74px', width: '55px', height: '22px', justifyContent: 'flex-end', fontSize: '18px', letterSpacing: '3px', transform: 'scaleX(1.35)', transformOrigin: 'right center', textShadow: '0 0 2px #000, 0 0 2px #000, 0 1px 3px #000' });
    }
    const n42 = k('42/2'); if (n42) { n42.classList.add('g2-snum'); set(n42, { fontSize: '19px', letterSpacing: '2px', transform: 'scaleX(1.3)' }); }
    k(33).hidden = true;
    function apply(st, instant) {
      const t = st.t ?? 0;
      const lotdSt = st.st?.lotd, lotd = !!lotdSt && lotdSt.until > t;
      const left = lotd ? Math.max(0, lotdSt.until - t) : 0, frac = Math.min(1, left / LOTD_MS);
      if (instant || lotd !== prev.lotd) {
        const lk = lotd ? look.red : look.blue;
        set(k(30), { opacity: lotd ? 0 : 1 }); set(k(32), { opacity: lotd ? 1 : 0 });
        paint(K.img(29), lk.lines); paint(K.img('28/2'), lk.bar); paint(K.img('43/3'), lk.sbar);
        frame(lotd);
        set(k(28), { opacity: lotd ? 1 : 0 }); set(num, { opacity: lotd ? 1 : 0 }); set(k(42), { opacity: lotd ? 1 : 0 });
        if (!instant && lotd) anim(k(3), [{ filter: 'brightness(1.8)' }, { filter: 'none' }], { duration: 600 });
      }
      const w = Math.round(DRG_BAR_W * frac), sw = Math.round(DRG_SBAR_W * frac), sec = Math.ceil(left / 1000);
      if (instant || w !== prev.w || sec !== prev.sec) {
        set(k('28/2'), { clipPath: clipW(w, DRG_BAR_W) });
        set(k('43/3'), { clipPath: clipW(sw, DRG_SBAR_W) });
        if (num) num.textContent = String(sec);
        const n = k('42/2'); if (n) n.textContent = String(sec);
      }
      const focus = Math.max(0, Math.min(2, st.focus ?? 0));
      if (instant || focus !== prev.focus) {
        paint(K.img(13), focus > 0 ? focusLook.rim : '');
        DRG_FOCUS.forEach((q, i) => {
          const lit = i < focus;
          set(k(q), { opacity: lit ? 1 : 0, transform: 'none' });
          set(k(`${DRG_SFOCUS[i]}/2`), { opacity: lit ? 1 : 0, transform: 'none' });
          if (!instant && lit && i >= (prev.focus ?? 0)) { pop(k(q)); anim(k(q === 11 ? 9 : 10), [{ opacity: 0.9 }, { opacity: 0 }], { duration: 500 }); }
        });
      }
      prev = { lotd, w, sec, focus };
    }
    function setSimple(v) { simple = !!v; k(2).hidden = simple; k(33).hidden = !simple; }
    apply({ t: 0, focus: 0 }, true);
    return {
      windows: [{ name: 'JobHudDRG0', label: '竜血ゲージ', el: K.el, w: K.w, h: K.h }],
      update: (st) => apply(st, false), reset: (st) => apply(st, true), setSimple, isSimple: () => simple,
    };
  }

  // ---------------- リーパー: ソウルゲージ（JobHudRRP0）とレムールシンボル（JobHudRRP1）----------------
  // 公式ジョブガイドの HUD の絵（public/jobguide/hud/reaper/）に合わせた:
  // ソウルゲージ（通常 #3）: 大鎌の刃（#38）と柄（#37）の中に 2 本の棒。上がソウル（#23: #25 赤の塗り・#28 暗い地・#24 塗りの先の光）、
  //   下がシュラウド（#29: #31 水色の塗り・#34 地・#30 先の光）。数字は右の #16（ソウル）・#17（シュラウド）。
  //   枠は 2 本用の高い方（#20・#22・#36）を使い、1 本用（#19・#21・#35）は隠す（Lv80 からシュラウドの棒が出る）。#18 は 2 本の棒の間の線。
  //   #5〜#15 の光（ゲージが増えたときの演出）は出さない
  //   シンプル表示（#39）: #42 ソウルの棒（部品 1003 の #3）と #41 数字、#45 シュラウドの棒（部品 1004 の #3）と #44 数字
  // レムールシンボル（通常 #2）: 暗いアヴァターの影（#12）の右に 5 つの炎（#3〜#7。部品 1001: #11 の組 = レムールソウルの青い炎、#2 の組 = ヴォイドソウルの紫の炎）。
  //   ヴォイドソウルは上（#3）から、レムールソウルは下（#7）から並ぶ（絵の「13 秒・紫 2・青 3」）。レムールの間は赤く光るアヴァター（#9）と残り秒（#8）を出す
  //   シンプル表示（#13）: #15 アイコン・#16 残り秒・#17〜#21 菱形（部品 1002 の #3 の組。レムールソウルは左（#21）から水色、ヴォイドソウルは右（#17）から桃色）
  const RPR_BAR_W = 184, RPR_SBAR_W = 160, RPR_FLAMES = [3, 4, 5, 6, 7], RPR_SDIA = [21, 20, 19, 18, 17];
  function rpr(G) {
    const L0 = G.layouts.JobHudRRP0, L1 = G.layouts.JobHudRRP1;
    const K = U.build(L0, G.textures), K1 = U.build(L1, G.textures);
    const k = (id) => K.get(id), k1 = (id) => K1.get(id);
    const C = window.MockUld.colorFilter;
    let simple = false, prev = {};
    for (const id of [5, 9, 10, 15, 19, 21, 35, 26, 27, 32, 33]) set(k(id), { opacity: 0 });
    for (const id of [16, 17]) { const n = k(`${id}/2`); if (n) n.classList.add('g2-snum'); }
    for (const id of ['41/2', '44/2']) k(id)?.classList.add('g2-snum');
    for (const c of [4, 5]) { set(k(`42/${c}`), { opacity: 0 }); set(k(`45/${c}`), { opacity: 0 }); }
    k(39).hidden = true;
    // レムールシンボル: 炎の置き場は ULD の値で薄い（a25）ので、点いた炎は不透明に。演出の部品は隠す
    for (const q of RPR_FLAMES) {
      for (const c of [3, 7, 8, 9, 12, 13, 16, 17, 18]) set(k1(`${q}/${c}`), { opacity: 0 });
      if (K1.img(`${q}/10`)) K1.img(`${q}/10`).style.filter = 'none'; // ヴォイドソウルの玉: ULD の加算色（+150）では白くなるので外す（絵は濃い紫）
    }
    for (const id of [9, 10, 11]) set(k1(id), { opacity: 0, transform: 'none' });
    const n8 = k1('8/2'); if (n8) n8.classList.add('g2-num');
    const n16 = k1('16/2'); if (n16) n16.classList.add('g2-snum');
    // 菱形の色: ULD では入れ物（#3）の加算色 -60,-10,190 と絵（#4）の -100,0,-50 を重ねる（入れ物の色はこの組み立てでは掛からないので足して付ける）。
    // ヴォイドソウルは絵（08.png）の濃い桃色
    const SLEM = C([-160, -10, 140]), SVOID = C([40, -170, 90]);
    for (const q of RPR_SDIA) set(k1(`${q}/3`), { opacity: 0 });
    k1(13).hidden = true;
    function apply(st, instant) {
      const t = st.t ?? 0;
      const soul = Math.max(0, Math.min(100, st.soul ?? 0)), shroud = Math.max(0, Math.min(100, st.shroud ?? 0));
      if (instant || soul !== prev.soul || shroud !== prev.shroud) {
        const ws = Math.round((RPR_BAR_W * soul) / 100), wh = Math.round((RPR_BAR_W * shroud) / 100);
        set(k(25), { clipPath: clipW(ws, RPR_BAR_W) }); set(k(31), { clipPath: clipW(wh, RPR_BAR_W) });
        set(k(24), { transform: `translateX(${ws}px)`, opacity: ws > 2 && ws < RPR_BAR_W ? 1 : 0 });
        set(k(30), { transform: `translateX(${wh}px)`, opacity: wh > 2 && wh < RPR_BAR_W ? 1 : 0 });
        for (const [id, v] of [['16/2', soul], ['17/2', shroud], ['41/2', soul], ['44/2', shroud]]) { const n = k(id); if (n) n.textContent = String(v); }
        set(k('42/3'), { clipPath: clipW(Math.round((RPR_SBAR_W * soul) / 100), RPR_SBAR_W) });
        set(k('45/3'), { clipPath: clipW(Math.round((RPR_SBAR_W * shroud) / 100), RPR_SBAR_W) });
        if (!instant && soul > (prev.soul ?? 0)) anim(k(25), [{ filter: 'brightness(1.8)' }, { filter: 'none' }], { duration: 380 });
        if (!instant && shroud > (prev.shroud ?? 0)) anim(k(31), [{ filter: 'brightness(1.8)' }, { filter: 'none' }], { duration: 380 });
      }
      const es = st.st?.enshroud, on = !!es && es.until > t;
      const lem = on ? Math.max(0, Math.min(5, st.lemure ?? 0)) : 0, vd = on ? Math.max(0, Math.min(5 - lem, st.void ?? 0)) : 0;
      const sec = on ? Math.ceil((es.until - t) / 1000) : 0;
      if (instant || on !== prev.on || lem !== prev.lem || vd !== prev.vd) {
        RPR_FLAMES.forEach((q, i) => {
          const isVoid = i < vd, isLem = i >= 5 - lem;
          set(k1(q), { opacity: isVoid || isLem ? 1 : 0.25 });
          set(k1(`${q}/2`), { opacity: isVoid ? 1 : 0 }); set(k1(`${q}/11`), { opacity: isLem || !(isVoid) ? 1 : 0 });
        });
        RPR_SDIA.forEach((q, i) => {
          const isLem = i < lem, isVoid = i >= 5 - vd;
          set(k1(`${q}/3`), { opacity: isLem || isVoid ? 1 : 0 });
          if (K1.img(`${q}/4`)) K1.img(`${q}/4`).style.filter = isVoid ? SVOID : SLEM;
        });
        set(k1(9), { opacity: on ? 1 : 0 }); set(k1(11), { opacity: on ? 0.8 : 0 });
        set(k1(8), { opacity: on ? 1 : 0 }); set(k1(16), { opacity: on ? 1 : 0 });
        if (!instant && on && !prev.on) anim(k1(9), [{ opacity: 0, transform: 'scale(0.7)' }, { opacity: 1, transform: 'none' }], { duration: 500 });
      }
      if (instant || sec !== prev.sec) { for (const id of ['8/2', '16/2']) { const n = k1(id); if (n) n.textContent = on ? String(sec) : ''; } }
      prev = { soul, shroud, on, lem, vd, sec };
    }
    function setSimple(v) { simple = !!v; k(2).hidden = simple; k(39).hidden = !simple; k1(2).hidden = simple; k1(13).hidden = !simple; }
    apply({ t: 0, soul: 0, shroud: 0 }, true);
    return {
      windows: [
        { name: 'JobHudRRP0', label: 'ソウルゲージ', el: K.el, w: K.w, h: K.h },
        { name: 'JobHudRRP1', label: 'レムールシンボル', el: K1.el, w: K1.w, h: K1.h },
      ],
      update: (st) => apply(st, false), reset: (st) => apply(st, true), setSimple, isSimple: () => simple,
    };
  }

  window.MockGauge2.add({ MNK: mnk, NIN: nin, DRG: drg, RPR: rpr });
})();
