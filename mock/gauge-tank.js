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

  // ---------------- 暗黒騎士: ブラッドゲージ（JobHudDRK0）と暗黒ゲージ（JobHudDRK1）----------------
  // DRK0 #2 = 通常表示: #13 棒（部品 1001: #2 とげの枠・#3 赤い塗り・#4 増えた分の明るい赤・#5 青・#6 地）、#4 左の結晶
  //   （#7 灰色の結晶・#8 青い光・#5 輪の光・#9 枠）、#10 の子は煙（#11）と紫の稲妻（#12）。#3 は大きさのない文字（使わない）
  //   左の結晶はダークアーツの印（ブラックナイトのバリアが消えると青く光る。仮）。煙はブラックブラッド 50 以上、稲妻はブラッドデリリアムの間（仮）
  // DRK0 #14 = シンプル表示: #15 青い光のアイコン（ダークアーツ）、#17 数字、#18 棒（Parameter_Gauge: #4 赤い塗り。#5・#6 は演出の層）
  // DRK1 #2 = 通常表示: #9 の子 #14 兜の紋章（いつも）・#11 紫紅の紋・#12 #16 赤い玉・#13 #8 紫の渦（暗黒の間）・#10 暗黒の残り秒、
  //   #17 の子 #19 赤い悪魔・#18 残り秒（影身具現の間）、#3 の子 #7 黒いとげ（いつも）・#6 赤いとげ・#5 橙の光（影身具現の間）
  // DRK1 #20 = シンプル表示: #21（#22 赤い悪魔のアイコン・#23 数字。影身具現の間）、#24 ひし形（#4 が点いた絵。暗黒の間）、#26 数字・#27 棒（暗黒の残り。60 秒で満タン）
  // どの部品が何を表すかは、絵と並びからの推定（仮。UI-01）
  const DN = { normal: 2, simple: 14, bar: 13, sIcon: 15, sNum: 17, sBar: 18 };
  const BLOOD_W = 173; // シンプル表示の棒の幅（SBAR_W）は戦士と同じ
  function drk(G) {
    const L0 = G.layouts.JobHudDRK0, L1 = G.layouts.JobHudDRK1;
    const K = U.build(L0, G.textures), K1 = U.build(L1, G.textures);
    const k = (id) => K.get(id), k1 = (id) => K1.get(id);
    let simple = false, prev = {};
    set(k(3), { opacity: 0 });
    for (const c of [4, 5]) set(k(`${DN.bar}/${c}`), { opacity: 0 });
    for (const c of [5, 6]) set(k(`${DN.sBar}/${c}`), { opacity: 0 });
    set(k(5), { opacity: 0 }); // 結晶のまわりの輪の光（入れ子のノードは番号だけで指す。部品の中だけが「置いたノード/中のノード」）
    for (const id of [11, 12]) set(k(id), { opacity: 0 });
    k(`${DN.sNum}/2`)?.classList.add('g2-snum');
    k(DN.simple).hidden = true;
    for (const id of [5, 6, 8, 11, 12, 13, 15, 16, 19]) set(k1(id), { opacity: 0 });
    for (const id of [10, 18]) { const n = k1(id); if (n) { n.classList.add('g2-num'); n.style.width = '40px'; n.style.marginLeft = '-10px'; n.style.textAlign = 'center'; } }
    k1('23/2')?.classList.add('g2-snum'); k1('26/2')?.classList.add('g2-snum');
    set(k1('24/4'), { opacity: 0 }); // ひし形の点いた絵（暗黒の間に出す）
    set(k1('27/3'), { opacity: 0 });
    k1(20).hidden = true;
    function bloodBar(a, b, instant) {
      const w = Math.round((BLOOD_W * b) / 100), wa = Math.round((BLOOD_W * a) / 100);
      set(k(`${DN.bar}/3`), { clipPath: clipW(w, BLOOD_W) });
      set(k(`${DN.sBar}/4`), { clipPath: clipW(Math.round((SBAR_W * b) / 100), SBAR_W) });
      const sn = k(`${DN.sNum}/2`); if (sn) sn.textContent = String(b);
      set(k(11), { opacity: b >= 50 ? 0.6 : 0 });
      if (instant) return;
      if (b > a) {
        set(k(`${DN.bar}/4`), { clipPath: `inset(0 ${BLOOD_W - w}px 0 ${wa}px)` });
        anim(k(`${DN.bar}/4`), [{ opacity: 1 }, { opacity: 0.9, offset: 0.35 }, { opacity: 0 }], { duration: 600 });
        anim(k(`${DN.bar}/3`), [{ filter: 'brightness(1.8)' }, { filter: 'brightness(1)' }], { duration: 450 });
      } else {
        set(k(`${DN.bar}/5`), { clipPath: `inset(0 ${BLOOD_W - wa}px 0 ${w}px)` });
        anim(k(`${DN.bar}/5`), [{ opacity: 1 }, { opacity: 1, offset: 0.3 }, { opacity: 0 }], { duration: 600, easing: 'ease-in' });
      }
    }
    function darkArts(on, instant) {
      set(k(8), { opacity: on ? 1 : 0 });
      set(k(7), { filter: on ? 'brightness(1.35) saturate(1.2)' : 'brightness(0.75)' });
      set(k(`${DN.sIcon}/2`), { opacity: on ? 1 : 0 });
      if (!instant && on) anim(k(6), [{ transform: 'scale(1.25)', filter: 'brightness(2)' }, { transform: 'none', filter: 'none' }], { duration: 500 });
    }
    function apply(st, instant) {
      const t = st.t ?? 0, has = (key) => !!st.st?.[key] && st.st[key].until > t;
      const b = Math.max(0, Math.min(100, Math.round(st.blood ?? 0)));
      if (instant || b !== prev.b) bloodBar(prev.b ?? 0, b, instant);
      const da = has('darkArts');
      if (instant || da !== prev.da) darkArts(da, instant);
      const del = has('delirium');
      if (instant || del !== prev.del) set(k(12), { opacity: del ? 0.85 : 0 });
      // 暗黒
      const dk = has('darkside'), left = dk ? Math.ceil((st.st.darkside.until - t) / 1000) : 0;
      if (instant || dk !== prev.dk) {
        for (const id of [11, 13, 16]) set(k1(id), { opacity: dk ? 1 : 0 });
        set(k1(12), { opacity: dk ? 0.8 : 0 }); set(k1(8), { opacity: dk ? 0.55 : 0 });
        set(k1(14), { filter: dk ? 'none' : 'brightness(0.6) saturate(0.6)' });
        set(k1('24/4'), { opacity: dk ? 1 : 0 });
        if (!instant && dk) anim(k1(11), [{ transform: 'scale(1.3)', filter: 'brightness(2)' }, { transform: 'none', filter: 'none' }], { duration: 500 });
      }
      if (instant || left !== prev.left) {
        const n = k1(10); if (n) n.textContent = dk ? String(left) : '';
        const sn = k1('26/2'); if (sn) sn.textContent = dk ? String(left) : '';
        set(k1('27/4'), { clipPath: clipW(Math.round((SBAR_W * Math.min(60, left)) / 60), SBAR_W) });
      }
      // 影身具現（英雄の影身）
      const sh = st.shadow && st.shadow.until > t ? Math.ceil((st.shadow.until - t) / 1000) : 0;
      if (instant || !!sh !== !!prev.sh) {
        for (const id of [19, 6]) set(k1(id), { opacity: sh ? 1 : 0 });
        set(k1(5), { opacity: sh ? 0.6 : 0 });
        set(k1(21), { opacity: sh ? 1 : 0 });
        if (!instant && sh) anim(k1(19), [{ transform: 'scale(1.2)', filter: 'brightness(2)' }, { transform: 'none', filter: 'none' }], { duration: 500 });
      }
      if (instant || sh !== prev.sh) { const n = k1(18); if (n) n.textContent = sh ? String(sh) : ''; const sn = k1('23/2'); if (sn) sn.textContent = sh ? String(sh) : ''; }
      prev = { b, da, del, dk, left, sh };
    }
    function setSimple(v) { simple = !!v; k(DN.normal).hidden = simple; k(DN.simple).hidden = !simple; k1(2).hidden = simple; k1(20).hidden = !simple; }
    apply({ blood: 0, st: {}, t: 0 }, true);
    return {
      windows: [
        { name: 'JobHudDRK0', label: 'ブラッドゲージ', el: K.el, w: K.w, h: K.h },
        { name: 'JobHudDRK1', label: '暗黒ゲージ', el: K1.el, w: K1.w, h: K1.h },
      ],
      update: (st) => apply(st, false), reset: (st) => apply(st, true), setSimple, isSimple: () => simple,
    };
  }

  // ---------------- ガンブレイカー: パウダーゲージ（JobHudGNB0。ソイル）----------------
  // #2 = 通常表示: 回転式の弾倉。#16〜#18 が弾の穴（部品 1001: #10 の子 #12 青い玉・#11 白い光 = 弾が入っている、#13 金の輪、
  //   #2〜#9 は撃ったときの煙・火花・光の演出）。#7 の子 #8 橙の紋章（ロイヤルガード。仮）・#10 赤い玉・#11 黒い紋章・#13 枠
  //   穴は 3 つしかないので、ブラッドソイルで 4〜6 になった分は、穴の金の輪で見せる（仮）
  // #22 = シンプル表示: #24・#26・#27 ひし形（部品 1003: #2 金のひし形 = 弾、#3 は光の演出の層）、#28 赤い紋章のアイコン（ロイヤルガード）
  const GN = { normal: 2, simple: 22, slots: [16, 17, 18], sSlots: [24, 26, 27], emblem: 8, sIcon: 28 };
  function gnb(G) {
    const L = G.layouts.JobHudGNB0;
    const K = U.build(L, G.textures);
    const k = (id) => K.get(id);
    let simple = false, prev = {};
    for (const sl of GN.slots) for (const c of [2, 3, 4, 5, 6, 7, 8, 9, 13]) set(k(`${sl}/${c}`), { opacity: 0 });
    for (const id of [8, 9]) set(k(id), { opacity: 0 });
    for (const sl of GN.sSlots) set(k(`${sl}/3`), { opacity: 0 });
    k(GN.simple).hidden = true;
    function apply(st, instant) {
      const t = st.t ?? 0, n = Math.max(0, Math.min(6, st.soil ?? 0));
      const guard = !!st.st?.guard && st.st.guard.until > t;
      if (instant || n !== prev.n) {
        GN.slots.forEach((sl, i) => {
          const on = i < Math.min(3, n), extra = i < n - 3;
          set(k(`${sl}/12`), { opacity: on ? 1 : 0.15, filter: on ? 'none' : 'grayscale(1) brightness(0.5)' });
          set(k(`${sl}/11`), { opacity: on ? 1 : 0 });
          set(k(`${sl}/13`), { opacity: extra ? 1 : 0 });
          // 使った: 撃ち出す火花と煙 / 増えた: 光る
          if (!instant && (prev.n ?? 0) > n && i >= Math.min(3, n) && i < Math.min(3, prev.n)) { for (const c of [6, 4]) anim(k(`${sl}/${c}`), [{ opacity: 0.9 }, { opacity: 0 }], { duration: 420 }); anim(k(`${sl}/3`), [{ opacity: 0.6 }, { opacity: 0 }], { duration: 700 }); }
          if (!instant && n > (prev.n ?? 0) && i === Math.min(3, n) - 1) anim(k(`${sl}/10`), [{ transform: 'scale(1.35)', filter: 'brightness(2)' }, { transform: 'none', filter: 'none' }], { duration: 400 });
        });
        GN.sSlots.forEach((sl, i) => set(k(`${sl}/2`), { opacity: i < Math.min(3, n) ? 1 : 0, filter: i < n - 3 ? 'brightness(1.5) hue-rotate(-25deg)' : 'none' }));
      }
      if (instant || guard !== prev.guard) {
        set(k(GN.emblem), { opacity: guard ? 1 : 0 });
        set(k(`${GN.sIcon}/2`), { opacity: guard ? 1 : 0.25 });
        if (!instant && guard) anim(k(9), [{ opacity: 0.9, transform: 'scale(0.8)' }, { opacity: 0, transform: 'scale(1.3)' }], { duration: 600 });
      }
      prev = { n, guard };
    }
    function setSimple(v) { simple = !!v; k(GN.normal).hidden = simple; k(GN.simple).hidden = !simple; }
    apply({ soil: 0, st: {}, t: 0 }, true);
    return {
      windows: [{ name: 'JobHudGNB0', label: 'パウダーゲージ', el: K.el, w: K.w, h: K.h }],
      update: (st) => apply(st, false), reset: (st) => apply(st, true), setSimple, isSimple: () => simple,
    };
  }

  window.MockGauge2.add({ WAR: war, DRK: drk, GNB: gnb });
})();
