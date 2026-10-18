// ジョブゲージ（遠隔物理: 機工士・踊り子）。書き方は gauge2.js と同じ（ULD の木を組み立てて、状態で部品を出し入れする）。
// 色や位置は ULD のタイムライン（未抽出）で動くものが多いので、公式ジョブガイドの HUD の絵（public/jobguide/hud/）に合わせる。
(function () {
  'use strict';
  const { U, set, anim, clipW, usePart, partsOf } = window.MockGauge2.lib;

  // ---------------- 機工士 ----------------
  // ヒートゲージ（JobHudMCH0）: 上がヒート（#3: 管の棒 #8・数字 #7・ダイヤル #11 と針 #10・オーバーヒートの札 #13）、
  //   下がバッテリー（#17: 棒 #24・数字 #23・クイーンのダイヤル #31 と光る輪 #30・クイーンの残り秒 #19）。
  //   オーバーヒートの間は札が赤く（パーツ 0 → 1）、残り秒を出す（公式の絵 02.png）。シンプル表示（#33）は棒 2 本と数字、アイコンと残り秒
  const MCH_BAR = 148, MCH_SBAR = 160;
  function mch(G) {
    const L = G.layouts.JobHudMCH0;
    const K = U.build(L, G.textures);
    const k = (id) => K.get(id);
    const P1 = partsOf(L, 1), tex = G.textures.JobHudMCH0;
    let simple = false, prev = {};
    // 演出の部品（湯気・稲妻・光）は隠す
    for (const id of [4, 5, 6, 9, 20, 21, 22, 26, 27, 28]) set(k(id), { opacity: 0 });
    set(k('8/3'), { opacity: 0 }); set(k('24/4'), { opacity: 0 });
    // 空の棒の中: ULD の暗い光（加算 -100）のままでは明るいので薄くする（公式の絵 02.png は黒に近い）
    set(k('8/4'), { opacity: 0.3 }); set(k('24/5'), { opacity: 0.12 });
    for (const id of ['7/2', '23/2']) k(id)?.classList.add('g2-snum');
    for (const id of ['37/2', '42/2', '35/2', '40/2']) k(id)?.classList.add('g2-snum');
    const ohText = k(14), qText = k(19);
    if (ohText) { ohText.classList.add('g2-snum'); set(ohText, { justifyContent: 'center' }); }
    if (qText) { qText.classList.add('g2-snum'); set(qText, { justifyContent: 'center' }); }
    // シンプル表示の棒: ヒートは赤茶 → 橙（#3）、バッテリーは淡い水色（#4）。公式の絵（05.png）の色
    for (const id of ['38/4', '38/5', '43/5', '43/6']) set(k(id), { opacity: 0 });
    // オーバーヒート・クイーンの残り秒はアイコンのすぐ右（公式の絵 05・06.png）
    set(k(35), { left: '16px' }); set(k(40), { left: '16px' });
    if (K.img('43/4')) K.img('43/4').style.filter = window.MockUld.colorFilter([40, 160, 190]);
    set(k(37), { left: '107px' }); set(k(42), { left: '107px' });
    for (const id of ['37/2', '42/2', '35/2', '40/2']) set(k(id), { fontSize: '21px' });
    function apply(st, instant) {
      const t = st.t ?? 0;
      const heat = Math.max(0, Math.min(100, st.heat ?? 0)), bat = Math.max(0, Math.min(100, st.battery ?? 0));
      const oh = st.st?.overheated, ohOn = !!oh && oh.until > t, ohSec = ohOn ? Math.ceil((oh.until - t) / 1000) : 0;
      const q = st.queen, qOn = !!q, qSec = qOn ? Math.max(0, Math.ceil(((q.until ?? t) - t) / 1000)) : 0;
      if (instant || heat !== prev.heat) {
        set(k('8/2'), { clipPath: clipW(Math.round((MCH_BAR * heat) / 100), MCH_BAR) });
        set(k('38/3'), { clipPath: clipW(Math.round((MCH_SBAR * heat) / 100), MCH_SBAR) });
        for (const id of ['7/2', '37/2']) { const n = k(id); if (n) n.textContent = String(heat); }
        if (!instant && heat > (prev.heat ?? 0)) anim(k('8/2'), [{ filter: 'brightness(1.8)' }, { filter: 'none' }], { duration: 360 });
      }
      if (instant || bat !== prev.bat) {
        set(k('24/3'), { clipPath: clipW(Math.round((MCH_BAR * bat) / 100), MCH_BAR) });
        set(k('43/4'), { clipPath: clipW(Math.round((MCH_SBAR * bat) / 100), MCH_SBAR) });
        for (const id of ['23/2', '42/2']) { const n = k(id); if (n) n.textContent = String(bat); }
        if (!instant && bat > (prev.bat ?? 0)) anim(k('24/3'), [{ filter: 'brightness(1.8)' }, { filter: 'none' }], { duration: 360 });
      }
      if (instant || ohOn !== prev.ohOn || ohSec !== prev.ohSec) {
        usePart(K.img(16), tex, P1[ohOn ? 1 : 0]);
        if (ohText) ohText.textContent = ohOn ? String(ohSec) : '';
        set(k(36), { opacity: ohOn ? 1 : 0 }); set(k(35), { opacity: ohOn ? 1 : 0 });
        const n = k('35/2'); if (n) n.textContent = ohOn ? String(ohSec) : '';
        if (!instant && ohOn && !prev.ohOn) anim(k(13), [{ filter: 'brightness(2)' }, { filter: 'none' }], { duration: 420 });
      }
      if (instant || qOn !== prev.qOn || qSec !== prev.qSec) {
        set(k(30), { opacity: qOn ? 1 : 0 }); set(k(29), { opacity: qOn ? 0.6 : 0 });
        if (qText) qText.textContent = qOn ? String(qSec) : '';
        set(k(41), { opacity: qOn ? 1 : 0 }); set(k(40), { opacity: qOn ? 1 : 0 });
        const n = k('40/2'); if (n) n.textContent = qOn ? String(qSec) : '';
      }
      prev = { heat, bat, ohOn, ohSec, qOn, qSec };
    }
    function setSimple(v) { simple = !!v; k(2).hidden = simple; k(33).hidden = !simple; }
    setSimple(false);
    apply({ t: 0, heat: 0, battery: 0 }, true);
    return {
      windows: [{ name: 'JobHudMCH0', label: 'ヒートゲージ', el: K.el, w: K.w, h: K.h }],
      update: (st) => apply(st, false), reset: (st) => apply(st, true), setSimple, isSimple: () => simple,
    };
  }

  // ---------------- 踊り子 ----------------
  // ステップシンボル（JobHudDNC0）: 通常は飾り（#38）。ダンスモードの間は輪の枠（#37: テクニカルは 4 つの輪 pl1/0、スタンダードは 2 つの輪 pl1/1）と
  //   ステップの玉（#17〜#20。絵はステップの種類: 薔薇 / 小鳥 / 緑葉 / 金冠。踏んだものは暗い絵 pl1/18〜21、次に踏むものは光る）。
  //   フィニッシュのあとは飾りの下に効果の残り秒（#21: 星 #25 と数字 #22。テクニカルは桃色の星 pl1/12）。
  //   シンプル表示（#2）は菱形の枠（#12: 4 つ pl2/5・2 つ pl2/4）とステップの絵（#3〜#6）、次のステップの水色の縁（各 #2）
  // 幻扇シンボル（JobHudDNC1）: 扇（#26。左半分の絵を反転して右に足す）と羽根（#22〜#25。幻扇の数だけ）、エスプリは扇の上の半円（#19 の #3 を回して、
  //   上半分だけ見せる。0 で -180 度、100 で 0 度）と数字（#15）。シンプル表示（#2）は菱形（#4〜#7）とエスプリの棒（#10）・数字（#8）
  const DNC_STEP = { 15999: 0, 16000: 1, 16001: 2, 16002: 3 }; // 薔薇のアンボワテ・小鳥のアントルシャ・緑葉のジュテ・金冠のピルエッテ
  const DNC_ORBS = [17, 18, 19, 20], DNC_SDIA = [3, 4, 5, 6], DNC_FEATHERS = [22, 23, 24, 25], DNC_SFEATHERS = [4, 5, 6, 7], DNC_SBAR = 160;
  function dnc(G) {
    const L0 = G.layouts.JobHudDNC0, L1 = G.layouts.JobHudDNC1;
    const K = U.build(L0, G.textures), K1 = U.build(L1, G.textures);
    const k = (id) => K.get(id), k1 = (id) => K1.get(id);
    const P1 = partsOf(L0, 1), P2 = partsOf(L0, 2), tex0 = G.textures.JobHudDNC0;
    let simple = false, prev = {};
    // 左半分の絵を左右反転して右半分に足す（扇・枠の金の弧）
    for (const id of [26, 17, 18]) {
      const im = K1.img(id); if (!im) continue;
      const mirror = im.cloneNode(true);
      mirror.style.left = `${parseFloat(im.style.width)}px`; mirror.style.position = 'absolute'; mirror.style.top = '0'; mirror.style.transform = 'scaleX(-1)';
      im.parentElement.appendChild(mirror);
    }
    // ステップシンボル: 演出の部品は隠す
    for (const id of [26, 37]) set(k(id), { opacity: 0 });
    for (const q of DNC_ORBS) { for (const c of [2, 3, 4, 5, 6, 8, 12]) set(k(`${q}/${c}`), { opacity: 0 }); set(k(q), { opacity: 0 }); }
    for (const id of [22, 23, 24]) set(k(id), { opacity: 0 });
    k(22)?.classList.add('g2-snum'); set(k(22), { justifyContent: 'center' });
    set(k(24), { transform: 'none' });
    for (const q of DNC_SDIA) { set(k(`${q}/2`), { opacity: 0 }); set(k(q), { opacity: 0 }); }
    for (const id of [8, 10, 11, 12, 14, 15]) set(k(id), { opacity: 0 });
    k(10)?.classList.add('g2-snum'); set(k(10), { justifyContent: 'center' });
    set(k(8), { transform: 'none' });
    // 幻扇シンボル: 羽根の光・きらめきは隠す。エスプリの弧は上半分だけ見せる
    for (const q of DNC_FEATHERS) for (const c of [2, 3, 4, 6, 7]) set(k1(`${q}/${c}`), { opacity: 0 });
    for (const c of [2, 4, 6]) set(k1(`19/${c}`), { overflow: 'hidden' });
    set(k1('19/5'), { opacity: 0 }); set(k1('19/7'), { opacity: 0 });
    // 唐草の金の弧（#18）はエスプリを覚える前（Lv76 未満）の扇の縁。Lv100 は細い金の縁（#17）と暗い帯（#20）にエスプリを入れる（公式の絵 04.png）
    set(k1(18), { opacity: 0 });
    // エスプリの色: 公式の絵の山吹色（ULD の加算 120,0,-190 では橙が濃い）
    if (K1.img('19/3')) K1.img('19/3').style.filter = window.MockUld.colorFilter([140, 40, -190], [70, 70, 70]);
    k1(15)?.classList.add('g2-num'); set(k1(15), { justifyContent: 'center' });
    k1('8/2')?.classList.add('g2-snum');
    for (const q of DNC_SFEATHERS) set(k1(`${q}/3`), { opacity: 0, transform: 'none' });
    // シンプル表示の菱形は棒の左端の下、数字はその右（公式の絵 08.png）
    set(k1(3), { left: '1px' }); set(k1(8), { left: '98px' });
    if (K1.img('10/4')) K1.img('10/4').style.filter = window.MockUld.colorFilter([150, 110, -60], [80, 60, 50]); // 棒の山吹色（公式の絵 08.png）
    for (const id of ['10/5', '10/6']) set(k1(id), { opacity: 0 });
    function orbs(dance) {
      const four = dance?.kind === 'technical', n = dance ? dance.seq.length : 0;
      // 輪の枠: テクニカルは 4 つ、スタンダードは 2 つ（真ん中の 2 つの位置）
      set(k(37), { opacity: dance ? 0.6 : 0, left: four ? '0px' : '44px', width: four ? '184px' : '96px' });
      if (K.img(37)) usePart(K.img(37), tex0, P1[four ? 0 : 1]);
      set(k(38), { opacity: dance ? 0 : 1 });
      const slots = four ? DNC_ORBS : [18, 19], sslots = four ? DNC_SDIA : [4, 5];
      for (const q of DNC_ORBS) set(k(q), { opacity: slots.includes(q) && dance ? 1 : 0 });
      for (const q of DNC_SDIA) set(k(q), { opacity: sslots.includes(q) && dance ? 1 : 0 });
      set(k(12), { opacity: dance ? 1 : 0, left: four ? '17px' : '53px', width: four ? '150px' : '78px' });
      if (K.img(12)) usePart(K.img(12), tex0, P2[four ? 5 : 4]);
      set(k(13), { opacity: dance ? 0 : 1 });
      set(k(15), { opacity: dance && four ? 0.4 : 0 }); set(k(14), { opacity: dance && !four ? 0.4 : 0 });
      for (let i = 0; i < n; i++) {
        const step = DNC_STEP[dance.seq[i]] ?? 0, done = i < dance.done, cur = i === dance.done;
        const q = slots[i], sq = sslots[i];
        if (K.img(`${q}/11`)) usePart(K.img(`${q}/11`), tex0, P1[(done ? 18 : 4) + step]);
        // 次に踏むステップ: 白金の光（#12 を大きく）・きらめき・白い輪（公式の絵 02.png）
        set(k(`${q}/12`), { opacity: cur ? 1 : 0, transform: cur ? 'scale(1.1)' : 'scale(0.6)', filter: cur ? 'brightness(1.6)' : 'none' });
        set(k(`${q}/6`), { opacity: cur ? 1 : 0 }); set(k(`${q}/3`), { opacity: cur ? 0.8 : 0 });
        set(k(`${q}/10`), { opacity: done ? 0.75 : 1 });
        if (K.img(`${sq}/4`)) usePart(K.img(`${sq}/4`), tex0, P2[step]);
        set(k(`${sq}/2`), { opacity: cur ? 1 : 0 }); set(k(`${sq}/3`), { opacity: done ? 0.55 : 1 });
      }
    }
    function apply(st, instant) {
      const t = st.t ?? 0, dance = st.dance ?? null;
      const key = dance ? `${dance.kind}:${dance.seq.join(',')}:${dance.done}` : '';
      if (instant || key !== prev.key) orbs(dance);
      // フィニッシュの効果の残り秒（テクニカルを先に）
      const tf = st.st?.technicalFinish, sf = st.st?.standardFinish;
      const fin = tf && tf.until > t ? ['t', tf] : sf && sf.until > t ? ['s', sf] : null;
      const sec = fin && !dance ? Math.ceil((fin[1].until - t) / 1000) : 0, kind = fin && !dance ? fin[0] : '';
      if (instant || sec !== prev.sec || kind !== prev.kind) {
        set(k(24), { opacity: kind ? 1 : 0 }); set(k(22), { opacity: kind ? 1 : 0 });
        if (K.img(25)) usePart(K.img(25), tex0, P1[kind === 't' ? 12 : 13]);
        set(k(8), { opacity: kind ? 1 : 0 }); set(k(10), { opacity: kind ? 1 : 0 });
        if (K.img(9)) usePart(K.img(9), tex0, P1[kind === 't' ? 12 : 13]);
        for (const id of [22, 10]) { const n = k(id); if (n) n.textContent = kind ? String(sec) : ''; }
      }
      // 幻扇・エスプリ
      const fe = Math.max(0, Math.min(4, st.feathers ?? 0)), es = Math.max(0, Math.min(100, st.esprit ?? 0));
      if (instant || fe !== prev.fe) {
        DNC_FEATHERS.forEach((q, i) => set(k1(q), { opacity: i < fe ? 1 : 0 }));
        // 空の菱形は縁だけ（暗い中身。公式の絵 07・08.png）
        DNC_SFEATHERS.forEach((q, i) => { set(k1(`${q}/3`), { opacity: i < fe ? 1 : 0 }); set(k1(`${q}/2`), { opacity: 0 }); });
        if (!instant && fe > (prev.fe ?? 0)) anim(k1(DNC_FEATHERS[fe - 1]), [{ filter: 'brightness(2.2)' }, { filter: 'none' }], { duration: 380 });
      }
      if (instant || es !== prev.es) {
        set(k1('19/3'), { transform: `rotate(${-180 + es * 1.8}deg)` });
        const n = k1(15); if (n) n.textContent = String(es);
        const ns = k1('8/2'); if (ns) ns.textContent = String(es);
        set(k1('10/4'), { clipPath: clipW(Math.round((DNC_SBAR * es) / 100), DNC_SBAR) });
      }
      prev = { key, sec, kind, fe, es };
    }
    function setSimple(v) { simple = !!v; k(16).hidden = simple; k(2).hidden = !simple; k1(11).hidden = simple; k1(2).hidden = !simple; }
    setSimple(false);
    apply({ t: 0, feathers: 0, esprit: 0 }, true);
    return {
      windows: [
        { name: 'JobHudDNC0', label: 'ステップシンボル', el: K.el, w: K.w, h: K.h },
        { name: 'JobHudDNC1', label: '幻扇シンボル', el: K1.el, w: K1.w, h: K1.h },
      ],
      update: (st) => apply(st, false), reset: (st) => apply(st, true), setSimple, isSimple: () => simple,
    };
  }

  window.MockGauge2.add({ MCH: mch, DNC: dnc });
})();
