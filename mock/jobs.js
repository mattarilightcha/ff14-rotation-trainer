// ジョブの決まり（練習できるジョブごとの、ボタンの変化・使える条件・効果・ゲージ・方向指定のガイド・結果の指標）。
// 共通の仕組み（時間・GCD・硬直・先行入力・詠唱・コンボ・リキャスト・ステータス・ダメージ・ログ）は mock.js が持ち、
// ここの関数を呼ぶ。値は説明文（抽出データの description と、build-mock-data.mjs が読み取った eff / pot）から。
// 説明文にない決まりは「仮」と書き、docs/SPEC.md §10 に載せる。
//
// 各ジョブは create(R) で作る。R は mock.js が渡す道具:
//   R.S（状態）・R.A（アクション）・R.D（データ）・R.OPT・R.has(k)・R.buff(k, ms, stacks)・R.remove(k)・R.addLog(cls, text)・R.ev(kind, o)
//   R.TARGET_BASE（変化先 → 元のボタン）・R.heal(target, frac)・R.hot(target, potency, sec)（回復。白魔道士）
(function () {
  'use strict';

  // ---------------- 共通の小物 ----------------
  // 説明文の「〜時威力」「発動条件」に出てくるステータス名 → そのジョブのステータスのキー
  const byName = (STATUS) => Object.fromEntries(Object.entries(STATUS).map(([k, v]) => [v.name, k]));
  // 説明文の効果（eff）をそのまま使う: 発動条件のステータスを使う・ステータスを付与する・与ダメージ上昇・ヘイスト・ゲージの消費
  // gauges: { ゲージ名: { get, set, max } }。付与や消費の相手がゲージならゲージを増減する
  function tooltipEffects(R, J, a, ok, gauges = {}) {
    const e = a.eff;
    if (!e) return;
    const names = byName(J.STATUS);
    if (e.requires) {
      const k = names[e.requires];
      const cur = k && R.S.st[k];
      if (cur) { if (cur.stacks > 1) cur.stacks -= 1; else R.remove(k); }
    }
    if (e.cost && gauges[e.cost.gauge]) { const g = gauges[e.cost.gauge]; g.set(g.get() - e.cost.n); }
    for (const g of e.grant ?? []) {
      if (g.combo && !ok) continue;
      if (gauges[g.status]) { const gg = gauges[g.status]; gg.set(Math.min(gg.max, gg.get() + 1)); continue; }
      const k = names[g.status];
      if (k) R.buff(k, (g.sec ?? 30) * 1000, g.stacks ?? undefined);
    }
    if (e.dmgUp) { const k = names[a.name]; if (k) R.buff(k, e.dmgUp.sec * 1000); }
    if (e.haste) { const k = names[a.name]; if (k) R.buff(k, e.haste.sec * 1000); }
  }
  // 発動条件（説明文）を満たしているか
  function tooltipBlocked(R, J, a, gauges = {}) {
    const e = a.eff;
    if (!e) return null;
    if (e.requires) {
      const k = byName(J.STATUS)[e.requires];
      if (!k || !R.has(k)) return `「${e.requires}」の効果中ではありません`;
    }
    if (e.cost && gauges[e.cost.gauge] && gauges[e.cost.gauge].get() < e.cost.n) return `${e.cost.gauge}が足りません（必要 ${e.cost.n} / 現在 ${gauges[e.cost.gauge].get()}）`;
    return null;
  }
  // 変化のグループ（元のボタン → 変化先）で、今使える変化先を返す。変化先の条件: 発動条件のステータスか、コンボの前段
  function tooltipResolve(R, J, id) {
    const targets = R.D.replaceGroups?.[id];
    if (!targets) return id;
    const names = byName(J.STATUS);
    for (const t of [...targets].reverse()) {
      const a = R.A[t];
      if (!a) continue;
      if (a.eff?.requires && names[a.eff.requires] && R.has(names[a.eff.requires])) return t;
      if (a.comboFrom?.length && R.S.combo != null && a.comboFrom.includes(R.S.combo) && R.S.t <= R.S.comboUntil) return t;
      // コンボを切らない技どうしのコンボ（コンフィテオル → ブレード・オブ・フェイス…）は別に数えている（mock.js の combo）
      if (a.comboFrom?.length && R.S.chain != null && a.comboFrom.includes(R.S.chain) && R.S.t <= R.S.chainUntil) return t;
    }
    return id;
  }

  // ---------------- 回復・バリア・軽減（説明文から。ナイト・白魔道士で共通）----------------
  // 回復力 → 最大 HP の割合（仮 DESIGN-06）。回復力 500（ケアル）= 20%、800（ケアルラ）= 32%
  const HEAL_K = 0.0004;
  // 最大チャージ数（説明文「最大チャージ数：N」。シートの値は特性の前）
  const descCharges = (A) => Object.fromEntries(Object.values(A).map((a) => [a.id, Number(/最大チャージ数：(\d+)/.exec(a.desc ?? '')?.[1] ?? 0)]).filter(([, n]) => n > 1));
  // 効果時間: 語のあとで最初に出てくる「効果時間：N秒」
  const secAfter = (d, i) => Number(/効果時間：(\d+)秒/.exec(d.slice(i))?.[1] ?? 10);
  // 相手: 「自身と周囲」「範囲内」→ 全員、「自身の」→ 自分、それ以外（「対象の」）→ HP の低い方
  function supportWho(d, i, party) {
    const head = d.slice(Math.max(0, d.lastIndexOf('。', i) + 1), i + 1);
    if (party || /自身と周囲|周囲のパーティメンバー|範囲内/.test(head)) return 'party';
    if (/自身の/.test(head) && !/対象/.test(head)) return 'self';
    return 'low';
  }
  // o.healUp: 回復量の倍率（テンパランスなど）、o.skipHot: 継続回復は別に扱う（アサイラム）
  function support(R, a, o = {}) {
    const d = a.desc ?? '', e = a.eff ?? {};
    const up = o.healUp ?? 1;
    if (e.heal != null) {
      const i = d.search(/ＨＰを(全)?回復/);
      R.heal(supportWho(d, i, e.party), e.heal === 'full' ? 1 : e.heal * HEAL_K * up);
    }
    if (e.hot && !o.skipHot) R.hot(supportWho(d, d.indexOf('継続回復'), e.party), e.hot.potency * HEAL_K * up, e.hot.sec, a.name);
    // バリア:「回復力N相当のダメージを軽減」「最大ＨＰのN％分のダメージを軽減」
    let m = /回復力(\d+)相当のダメージを軽減/.exec(d);
    if (m) R.shield(supportWho(d, d.indexOf('バリア'), false), Number(m[1]) * HEAL_K * up, secAfter(d, m.index), a.name);
    m = /最大ＨＰの(\d+)％分のダメージを軽減/.exec(d);
    if (m) R.shield(supportWho(d, d.indexOf('バリア'), false), Number(m[1]) / 100, secAfter(d, m.index), a.name);
    // 被ダメージ軽減（ステータスの付与はそのまま。練習場の被ダメージを減らす）
    const re = /被ダメージを(\d+)％軽減/g;
    let r;
    while ((r = re.exec(d))) {
      if (/効果：対象の被ダメージ/.test(d.slice(Math.max(0, r.index - 12), r.index + 4))) continue; // 別のステータスの説明（ナイトの堅守など）
      R.mitigate(supportWho(d, r.index, false), Number(r[1]) / 100, secAfter(d, r.index), a.name);
    }
  }

  // ---------------- 侍 ----------------
  const SAM = {
    abbr: 'SAM',
    create(R) {
      const { A } = R;
      const ID = {
        GYOFU: 36963, JINPU: 7478, SHIFU: 7479, YUKIKAZE: 7480, GEKKO: 7481, KASHA: 7482,
        FUKO: 25780, MANGETSU: 7484, OKA: 7485, ENPI: 7486,
        IAI: 7867, HIGAN: 7489, TENKA: 7488, MIDARE: 7487, TENDO_GOKEN: 36965, TENDO_SETSU: 36966,
        TSUBAME: 16483, K_GOKEN: 16485, K_SETSU: 16486, TK_GOKEN: 36967, TK_SETSU: 36968,
        SHINTEN: 7490, KYUTEN: 7491, GYOTEN: 7492, YATEN: 7493, HAGAKURE: 7495, GUREN: 7496, SENEI: 16481,
        MEDITATE: 7497, MEIKYO: 7499, TN: 7546, IKISHOTEN: 16482, SHOHA: 16487,
        NAMIKIRI: 25781, K_NAMI: 25782, ZANSHIN: 36964,
      };
      // ---- ツールチップ（第 1 層の説明文）から読んだ値 ----
      const TIP = {
        fukaMult: 0.87, // 士風「風花効果：…キャストタイムとリキャストタイムを13％短縮」
        fuMs: 40000, // 陣風・士風「効果時間：40秒」
        meikyoMs: 20000, // 明鏡止水「効果時間：20秒」「ウェポンスキルを3回実行すると効果が切れる」
        tendoMs: 30000, // 明鏡止水「天道…効果時間：30秒」
        tsubameMs: 30000, // 天下五剣・乱れ雪月花「燕返し実行可…効果時間：30秒」
        ikiMs: 30000, // 意気衝天「奥義波切実行可…30秒」「残心実行可…30秒」
        higanMs: 60000, // 彼岸花「効果時間：60秒」
        tnMs: 10000, // トゥルーノース「効果時間：10秒」
        enpiMs: 15000, // 必殺剣・夜天「燕飛効果アップ…効果時間：15秒」
      };
      const KENKI_MAX = 100; // 剣気の上限（GAME-12 仮）
      // 剣気を消費するアクション（ツールチップ「発動条件：「剣気」N」。震天はシートの primaryCost 39/25 とも一致）
      const KENKI_COST = { 7490: 25, 7491: 25, 7492: 10, 7493: 10, 7496: 25, 16481: 25, 36964: 50 };
      // 明鏡止水のスタックを消費するウェポンスキル（「居合術および奥義波切を除くウェポンスキル」を簡易に解釈）
      const MEIKYO_CONSUMERS = new Set([ID.GYOFU, ID.JINPU, ID.SHIFU, ID.YUKIKAZE, ID.GEKKO, ID.KASHA, ID.FUKO, ID.MANGETSU, ID.OKA, ID.ENPI]);
      const FX_COLOR = {
        [ID.YUKIKAZE]: 'setsu', [ID.GEKKO]: 'getsu', [ID.KASHA]: 'ka', [ID.MANGETSU]: 'getsu', [ID.OKA]: 'ka', [ID.HIGAN]: 'blood',
        [ID.TENKA]: 'iai', [ID.MIDARE]: 'iai', [ID.TENDO_GOKEN]: 'iai', [ID.TENDO_SETSU]: 'iai',
        [ID.K_GOKEN]: 'iai', [ID.K_SETSU]: 'iai', [ID.TK_GOKEN]: 'iai', [ID.TK_SETSU]: 'iai',
        [ID.NAMIKIRI]: 'namikiri', [ID.K_NAMI]: 'namikiri', [ID.SHOHA]: 'shoha', [ID.MEIKYO]: 'water', [ID.IKISHOTEN]: 'kenki',
      };
      const TRIPLE = new Set([ID.MIDARE, ID.TENDO_SETSU, ID.K_SETSU, ID.TK_SETSU]);
      // 居合術と奥義波切の詠唱時間: Lv74 の特性「居合術効果アップ」で 1.3 秒（風花・スキルスピードでは短くならない）。
      // 抽出データの cast は基本値の 1.8 秒。特性の説明文（Trait シート）は未抽出のため仮（GAME-64）
      const IAI_CAST_MS = 1300;
      const IAI_FIXED = new Set([ID.IAI, ID.HIGAN, ID.TENKA, ID.MIDARE, ID.TENDO_GOKEN, ID.TENDO_SETSU, ID.NAMIKIRI]);
      const STATUS = {
        fugetsu: { name: '風月', tracked: true, cls: 'fu' },
        fuka: { name: '風花', tracked: true, cls: 'fu' },
        meikyo: { name: '明鏡止水', cls: 'mk' },
        tendo: { name: '天道', sid: 3856 },
        tsubame: { name: '燕返し実行可' },
        namikiriReady: { name: '奥義波切実行可', sid: 2959 },
        zanshinReady: { name: '残心実行可', sid: 3855 },
        tn: { name: 'トゥルーノース' },
        enpi: { name: '燕飛効果アップ' },
        higanbana: { name: '彼岸花', target: true, tracked: true },
      };
      const S = () => R.S;
      const has = R.has;
      const senCount = () => S().sen.setsu + S().sen.getsu + S().sen.ka;
      function kenki(n) {
        const s = S(), v = s.kenki + n;
        if (v > KENKI_MAX) {
          const over = v - KENKI_MAX;
          s.stats.kenkiOver = (s.stats.kenkiOver ?? 0) + over;
          R.addLog('warn', `剣気が ${over} あふれました`);
          R.ev('ミス', { result: 'あふれ', note: `剣気が ${over} あふれた` });
        }
        s.kenki = Math.max(0, Math.min(KENKI_MAX, v));
      }
      function addSen(k, label) {
        if (S().sen[k]) R.addLog('warn', `${label}の閃が重複しました`);
        S().sen[k] = 1;
      }
      function addMed() {
        if (S().med >= 3) R.addLog('warn', '剣圧があふれました');
        S().med = Math.min(3, S().med + 1);
      }
      function iai(kind, tendo) {
        S().sen = { setsu: 0, getsu: 0, ka: 0 };
        addMed();
        if (kind !== 'higan') { R.buff('tsubame', TIP.tsubameMs); S().lastIai = kind; S().lastIaiTendo = tendo; }
        if (tendo) R.remove('tendo');
      }
      const J = {
        ids: ID, STATUS,
        charges: { 7499: 2, 7546: 2 }, // 明鏡止水・トゥルーノース「最大チャージ数：2」（シートの基本値は 1）
        prepull: new Set([ID.MEIKYO, ID.TN]), // カウントダウン中に使ってよいもの（GAME-30 未確認のため、自己バフのみ仮で許可）
        comboStarters: new Set([ID.GYOFU, ID.FUKO]),
        // 光る条件: ゲームデータ ActionProcStatus の行 → ステータス（行が指すステータス ID は再抽出で確定する: DATA-04）
        procStatus: { 14: 'enpi', 72: 'namikiriReady', 166: 'zanshinReady', 222: 'tsubame', 223: 'tsubame', 224: 'tsubame', 225: 'tsubame' },
        dot: { key: 'higanbana' },
        initState(s) { Object.assign(s, { kenki: 0, sen: { setsu: 0, getsu: 0, ka: 0 }, med: 0, lastIai: null, lastIaiTendo: false, kaeshiNami: false }); s.stats.kenkiOver = 0; },
        // 結果の CSV と記録に出すゲージ
        gaugeCols: [['剣気', (s) => s.kenki], ['閃', (s) => (s.sen.setsu ? '雪' : '') + (s.sen.getsu ? '月' : '') + (s.sen.ka ? '花' : '') || '-'], ['剣圧', (s) => s.med]],
        tracked: [['風月', 'fugetsu', '#6fd49a', '残り 10 秒を切ったら陣風コンボで更新'], ['風花', 'fuka', '#a8e8b8', '残り 10 秒を切ったら士風コンボで更新'], ['彼岸花', 'higanbana', '#ff7a6a', '切れたら閃 1 つの居合術（彼岸花）で付け直す']],
        speed: () => (has('fuka') ? TIP.fukaMult : 1), // キャストタイムとリキャストタイムの倍率
        castMs: (a, base) => (IAI_FIXED.has(a.id) ? IAI_CAST_MS : base),
        tipCastMs: (a) => (IAI_FIXED.has(a.id) ? IAI_CAST_MS : null), // ツールチップに出す詠唱時間（特性を反映した値）
        // 硬直の長い技: 必殺剣・夜天（後ろへ飛び退く）は 0.8 秒（解析資料の値。仮 GAME-04）
        animLockMs: { [ID.YATEN]: 800 },
        comboFree: () => has('meikyo'), // 明鏡止水中はコンボ条件を満たす
        resolve(id) {
          if (id === ID.IAI) {
            const n = senCount();
            if (n === 1) return ID.HIGAN;
            if (n === 2) return has('tendo') ? ID.TENDO_GOKEN : ID.TENKA;
            if (n === 3) return has('tendo') ? ID.TENDO_SETSU : ID.MIDARE;
            return ID.IAI;
          }
          if (id === ID.TSUBAME && has('tsubame')) {
            if (S().lastIai === 'goken') return S().lastIaiTendo ? ID.TK_GOKEN : ID.K_GOKEN;
            if (S().lastIai === 'setsu') return S().lastIaiTendo ? ID.TK_SETSU : ID.K_SETSU;
          }
          if (id === ID.TSUBAME && S().kaeshiNami) return ID.K_NAMI; // 返し波切の replacesAction は燕返し（抽出データ）
          if (id === ID.NAMIKIRI && S().kaeshiNami) return ID.K_NAMI; // 奥義波切「実行すると「返し波切」に変化する」
          return id;
        },
        blocked(id) {
          if (id === ID.IAI) return '閃がありません';
          if (id === ID.TSUBAME) return '「燕返し実行可」の効果中ではありません';
          const c = KENKI_COST[id];
          if (c && S().kenki < c) return `剣気が足りません（必要 ${c} / 現在 ${S().kenki}）`;
          if (id === ID.ZANSHIN && !has('zanshinReady')) return '「残心実行可」の効果中ではありません';
          if (id === ID.NAMIKIRI && !has('namikiriReady')) return '「奥義波切実行可」の効果中ではありません';
          if (id === ID.SHOHA && S().med < 3) return `剣圧が足りません（${S().med}/3）`;
          if (id === ID.HAGAKURE && senCount() === 0) return '閃がありません';
          if (id === ID.IKISHOTEN && S().phase !== 'combat') return '戦闘中のみ使えます';
          return null;
        },
        // 効果（ツールチップの記述から）
        effects(id, ok) {
          const meikyo = has('meikyo');
          switch (id) {
            case ID.GYOFU: kenki(5); break; // 暁風「剣気を5上昇」
            case ID.JINPU: if (ok) { R.buff('fugetsu', TIP.fuMs); kenki(5); } break;
            case ID.SHIFU: if (ok) { R.buff('fuka', TIP.fuMs); kenki(5); } break;
            case ID.YUKIKAZE: if (ok) { kenki(15); addSen('setsu', '雪'); } break;
            case ID.GEKKO: if (ok) { kenki(10); addSen('getsu', '月'); if (meikyo) R.buff('fugetsu', TIP.fuMs); } break;
            case ID.KASHA: if (ok) { kenki(10); addSen('ka', '花'); if (meikyo) R.buff('fuka', TIP.fuMs); } break;
            case ID.FUKO: kenki(10); break; // 風光「剣気を10上昇」
            case ID.MANGETSU: if (ok) { kenki(10); addSen('getsu', '月'); R.buff('fugetsu', TIP.fuMs); } break;
            case ID.OKA: if (ok) { kenki(10); addSen('ka', '花'); R.buff('fuka', TIP.fuMs); } break;
            case ID.ENPI: kenki(10); R.remove('enpi'); break;
            case ID.HIGAN: iai('higan', false); R.buff('higanbana', TIP.higanMs); break;
            case ID.TENKA: iai('goken', false); break;
            case ID.TENDO_GOKEN: iai('goken', true); break;
            case ID.MIDARE: iai('setsu', false); break;
            case ID.TENDO_SETSU: iai('setsu', true); break;
            case ID.K_GOKEN: case ID.K_SETSU: case ID.TK_GOKEN: case ID.TK_SETSU: R.remove('tsubame'); break;
            case ID.SHINTEN: case ID.KYUTEN: case ID.GUREN: case ID.SENEI: case ID.GYOTEN: kenki(-KENKI_COST[id]); break;
            case ID.YATEN: kenki(-10); R.buff('enpi', TIP.enpiMs); break;
            case ID.ZANSHIN: kenki(-50); R.remove('zanshinReady'); break;
            case ID.HAGAKURE: kenki(10 * senCount()); S().sen = { setsu: 0, getsu: 0, ka: 0 }; break;
            case ID.IKISHOTEN: kenki(50); R.buff('namikiriReady', TIP.ikiMs); R.buff('zanshinReady', TIP.ikiMs); break;
            case ID.NAMIKIRI: R.remove('namikiriReady'); addMed(); S().kaeshiNami = true; break;
            case ID.K_NAMI: S().kaeshiNami = false; break;
            case ID.SHOHA: S().med = 0; break;
            case ID.MEIKYO: R.buff('meikyo', TIP.meikyoMs, 3); R.buff('tendo', TIP.tendoMs); break;
            case ID.MEDITATE: S().med = 3; R.addLog('sys', '黙想: モックでは剣圧を即座に 3 にしています'); break;
            case ID.TN: R.buff('tn', TIP.tnMs); break;
            default: break;
          }
          if (meikyo && MEIKYO_CONSUMERS.has(id)) {
            const m = S().st.meikyo;
            m.stacks -= 1;
            if (m.stacks <= 0) R.remove('meikyo');
          }
        },
        // 燕返しの 4 種は、実際に出せる 1 つだけ光らせる
        highlightOk: (id, st) => st !== 'tsubame' || !!R.TARGET_BASE[id]?.some((b) => J.resolve(b) === id),
        // 方向指定のガイド: 次に使う（光っている）方向指定の技の向き。明鏡止水中はまだ持っていない閃の技
        guide(highlight) {
          const cands = [ID.GEKKO, ID.KASHA].filter((id) => highlight(id) || (has('meikyo') && !S().sen[id === ID.GEKKO ? 'getsu' : 'ka']));
          const needs = [...new Set(cands.map((id) => A[id].positional))];
          return needs.length === 1 ? needs[0] : null;
        },
        positional: () => has('tn') && 'トゥルーノース',
        // 演出
        fxColor: (id) => FX_COLOR[id] ?? (KENKI_COST[id] ? 'kenki' : 'steel'),
        fxPower: (id, a, ok) => (a.crit ? 1.5 : KENKI_COST[id] ? 1.25 : ok && a.comboFrom.length ? 1.15 : 1),
        fxCount: (id) => (TRIPLE.has(id) ? 3 : 1),
        castColor: (id) => FX_COLOR[id] ?? 'iai',
        gcdColor: (id) => ({ setsu: '#7fd6ff', getsu: '#9c90ff', ka: '#ff8fc4', iai: '#ffc640', blood: '#ff7a6a', namikiri: '#4fe3ff' })[FX_COLOR[id]],
        hotOgcd: (id) => !!KENKI_COST[id],
        sfx(id, info, Au) {
          if (info.kind === 'buff') { if (id === ID.MEIKYO) Au.water(); else if (id === ID.IKISHOTEN) Au.surge(); else Au.buff(); return; }
          const color = FX_COLOR[id];
          const draw = color === 'iai' || color === 'blood' || color === 'namikiri';
          if (draw) Au.iai(info.count);
          else if (KENKI_COST[id]) { Au.kenki(); Au.slash(info.power); }
          else if (info.kind === 'circle' || info.kind === 'cone' || info.kind === 'line') Au.wave();
          else for (let i = 0; i < info.count; i++) setTimeout(() => Au.slash(info.power), i * 95);
          if (color === 'setsu' || color === 'getsu' || color === 'ka') Au.finisher(color);
          if (info.crit) Au.crit();
          else if (!draw) Au.hit(info.power);
        },
        tipCost: (id) => (KENKI_COST[id] ? ['剣気', KENKI_COST[id]] : null),
        // 結果: ジョブの指標・直すと良いところ・良かったところ
        report(s, h) {
          const issues = [], metrics = [], goods = [];
          if (s.stats.kenkiOver) issues.push({ loss: Math.min(100, s.stats.kenkiOver * 2) * 0.1, rate: s.stats.kenkiOver > 30 ? 'bad' : 'ok', title: `剣気が ${s.stats.kenkiOver} あふれた`, advice: '剣気が 50 を超えたら必殺剣・震天で使う' });
          metrics.push({ label: '剣気のあふれ', value: `${s.stats.kenkiOver}`, rate: Math.max(0, 100 - s.stats.kenkiOver * 2) });
          if (!s.stats.kenkiOver && s.stats.gcds > 5) goods.push('剣気のあふれなし');
          return { issues, metrics, goods, overPct: Math.max(0, 100 - s.stats.kenkiOver * 2), posAdvice: '月光は背面、花車は側面。足元の色を見て先に回り込む。間に合わないときはトゥルーノース', castAdvice: '居合術の詠唱中は動かない', rangeAdvice: '敵が動いたらすぐ追いかける。離れたら燕飛や必殺剣・暁天', comboAdvice: '光っている技を順に。居合術やアビリティはコンボを切らない' };
        },
        howto: '月光は背面、花車は側面から。敵の足元の緑が背面・黄が側面です。トゥルーノース中は向きを問いません。',
        gaugeUI: (D) => window.MockGauge.create(D.gauge),
        gaugeDefault: { JobHudSAM0: { x: 68, y: 66, anchor: 4, scale: 1 }, JobHudSAM1: { x: 84, y: 66, anchor: 4, scale: 1 } },
      };
      return J;
    },
  };

  // ---------------- ナイト ----------------
  // 説明文の効果（付与・発動条件・コンボ）をそのまま使う。説明文にない決まり（仮）:
  //   レクイエスカットのスタックは、魔法（種類 2）とコンフィテオル以降の技を使うたびに 1 つ減る（GAME-60）
  //   オウスは戦闘中 2.5 秒ごとに 5 増える（オートアタックの代わり。GAME-61）
  const PLD = {
    abbr: 'PLD',
    create(R) {
      const { A } = R;
      const ID = {
        FAST: 9, RIOT: 15, ROYAL: 3539, FOF: 20, GORING: 3538, ATONE: 16460, SUPP: 36918, SEPUL: 36919,
        IMPERATOR: 36921, CONF: 16459, FAITH: 25748, TRUTH: 25749, VALOR: 25750, HONOR: 36922,
        HOLY: 7384, HCIRCLE: 16458, CLEMENCY: 3541, EXPI: 25747, CIRCLE: 23, INTERVENE: 16461, TOTAL: 7381, PROM: 16457, IRONWILL: 28,
      };
      const STATUS = {
        fof: { name: 'ファイト・オア・フライト', tracked: true },
        goringReady: { name: 'ゴアブレード実行可', sid: 3847 },
        atonement: { name: 'ロイエ実行可', sid: 1902 },
        supplication: { name: 'ゲベート実行可', sid: 3827 },
        sepulchre: { name: 'グラブカッマー実行可', sid: 3828 },
        divineMight: { name: '神聖魔法効果アップ' },
        requiescat: { name: 'レクイエスカット' },
        confiteorReady: { name: 'コンフィテオル実行可', sid: 3019 },
        honorReady: { name: 'ブレード・オブ・オナー実行可' },
        rampart: { name: 'ランパート' },
        circleDot: { name: 'サークル・オブ・ドゥーム', target: true },
        ironWill: { name: 'アイアンウィル' },
      };
      const S = () => R.S;
      const has = R.has;
      const OATH_MAX = 100;
      const gauges = { オウス: { get: () => S().oath, set: (v) => { S().oath = Math.max(0, Math.min(OATH_MAX, v)); }, max: OATH_MAX } };
      const isSpell = (a) => a.category === 2;
      const CONF_CHAIN = new Set([ID.CONF, ID.FAITH, ID.TRUTH, ID.VALOR]);
      const J = {
        ids: ID, STATUS,
        charges: descCharges(A),
        prepull: new Set([ID.IRONWILL]), // タンクのスタンスは戦闘前に入れる（自己バフのため仮で許可: GAME-30）
        comboStarters: new Set([ID.FAST, ID.TOTAL]),
        procStatus: { 36: 'atonement', 149: 'supplication', 150: 'sepulchre', 151: 'honorReady', 209: 'goringReady', 46: 'confiteorReady' },
        dot: { key: 'circleDot' },
        initState(s) { s.oath = 0; s.oathT = 0; },
        gaugeCols: [['オウス', (s) => s.oath]],
        tracked: [['ファイト・オア・フライト', 'fof', '#ffb45a', '60 秒ごとに。ゴアブレード・コンフィテオル以降をこの中に']],
        speed: () => 1,
        comboFree: () => false,
        resolve: (id) => tooltipResolve(R, J, id),
        blocked: (id) => tooltipBlocked(R, J, A[id], gauges),
        // 詠唱時間: 神聖魔法効果アップ（次の 1 回のホーリースピリット・ホーリーサークル）とレクイエスカット（魔法）は詠唱時間無し
        castMs(a, base) {
          if (!base) return 0;
          if ((a.id === ID.HOLY || a.id === ID.HCIRCLE) && has('divineMight')) return 0;
          if (isSpell(a) && has('requiescat')) return 0;
          return base;
        },
        // 使った瞬間に消えるもの（詠唱時間無しにした効果）。威力の計算より後に呼ぶ
        effects(id, ok) {
          const a = A[id];
          const dm = (id === ID.HOLY || id === ID.HCIRCLE) && has('divineMight');
          tooltipEffects(R, J, a, ok, gauges);
          if (dm) R.remove('divineMight');
          else if ((isSpell(a) || CONF_CHAIN.has(id)) && has('requiescat')) {
            const st = S().st.requiescat; if (st.stacks > 1) st.stacks -= 1; else R.remove('requiescat'); // 仮（GAME-60）
          }
          if (id === ID.CIRCLE) R.buff('circleDot', (a.pot?.dot?.sec ?? 15) * 1000);
          support(R, a); // ホーリースピリット・コンフィテオルの自分の回復、クレメンシー、ディヴァインヴェール、ホーリーシェルトロンなど
          // アイアンウィル「再使用で解除する。効果時間：永続」
          if (id === ID.IRONWILL) { if (has('ironWill')) R.remove('ironWill'); else R.buff('ironWill', 1e9); }
        },
        tick(dt) {
          const s = S();
          if (s.phase !== 'combat') return;
          s.oathT += dt;
          while (s.oathT >= 2500) { s.oathT -= 2500; gauges.オウス.set(s.oath + 5); } // 仮（GAME-61）
        },
        highlightOk: () => true,
        // ホーリースピリット・ホーリーサークルは、神聖魔法効果アップかレクイエスカットの間光る（ゲーム内の表示。ActionProcStatus の指定は抽出データにない: GAME-65）
        glow: (id) => (id === ID.HOLY || id === ID.HCIRCLE) && (has('divineMight') || has('requiescat')),
        castPower: 0.55,
        guide: () => null,
        positional: () => null,
        fxColor: (id) => (CONF_CHAIN.has(id) || id === ID.HONOR || id === ID.IMPERATOR ? 'holy' : id === ID.HOLY || id === ID.HCIRCLE ? 'holy' : id === ID.GORING ? 'blood' : id === ID.FOF ? 'buff' : 'steel'),
        fxPower: (id, a, ok) => (CONF_CHAIN.has(id) || id === ID.HONOR ? 1.4 : ok && a.comboFrom.length ? 1.15 : 1),
        fxCount: () => 1,
        castColor: () => 'holy',
        gcdColor: (id) => (CONF_CHAIN.has(id) || id === ID.HONOR ? '#9ad8ff' : id === ID.HOLY ? '#ffe39a' : id === ID.GORING ? '#ff7a6a' : [ID.ATONE, ID.SUPP, ID.SEPUL].includes(id) ? '#ffd27a' : null),
        hotOgcd: (id) => id === ID.EXPI || id === ID.CIRCLE || id === ID.IMPERATOR,
        sfx(id, info, Au) {
          if (info.kind === 'buff') { Au.buff(); return; }
          if (A[id].category === 2 || CONF_CHAIN.has(id) || id === ID.HONOR) { Au.finisher('setsu'); Au.hit(info.power); return; }
          if (info.kind === 'circle') Au.wave();
          else Au.slash(info.power);
          Au.hit(info.power);
        },
        tipCost: (id) => (A[id]?.eff?.cost ? [A[id].eff.cost.gauge, A[id].eff.cost.n] : null),
        report(s) {
          return { issues: [], metrics: [{ label: 'オウス（終了時）', value: `${s.oath}`, rate: null }], goods: [], overPct: 100, posAdvice: '', castAdvice: 'ホーリースピリットは、神聖魔法効果アップかレクイエスカットの間に使うと詠唱なしで撃てる', rangeAdvice: '敵が動いたらすぐ追いかける。離れたらインターヴィーン', comboAdvice: 'ファストブレード → ライオットソード → ロイヤルアソリティの順に。ホーリースピリット・ロイエ・コンフィテオル以降はコンボを切らない' };
        },
        howto: 'ナイト: ファストブレード→ライオットソード→ロイヤルアソリティ、ロイエ→ゲベート→グラブカッマー。ファイト・オア・フライトの間にゴアブレードとインペラトル→コンフィテオル以降。あなたが敵を引きつけます。',
        gaugeUI: (D) => window.MockGauge2.create(D.gauge, 'PLD'),
        gaugeDefault: { JobHudPLD0: { x: 70, y: 66, anchor: 4, scale: 1 } },
      };
      return J;
    },
  };

  // ---------------- 白魔道士 ----------------
  // 説明文にない決まり（仮）:
  //   ヒーリングリリーは戦闘中 20 秒ごとに 1 つ増える（上限 3。特性の説明文が未抽出: GAME-62）
  //   回復力 → HP の割合は 回復力 1 = 最大 HP の 0.025%（回復力 800 で 20%）とみなす（DESIGN-06）
  const WHM = {
    abbr: 'WHM',
    create(R) {
      const { A } = R;
      const ID = { GLARE3: 25859, GLARE4: 37009, DIA: 16532, ASSIZE: 3571, POM: 136, MISERY: 16535, SOLACE: 16531, RAPTURE: 16534, SWIFT: 7561, HOLY3: 25860, THIN: 7430, TEMPERANCE: 16536, CARESS: 37011, LILYBELL: 25862, RAISE: 125, ASYLUM: 3569, CURE: 120, CURE2: 135, PLENARY: 7433 };
      // インドゥルゲンティアの追加の回復が出る技（説明文「メディカ、ケアルガ、メディガ、ハート・オブ・ラプチャー」）
      const PLENARY_HEALS = new Set([124, 131, 37010, 16534]);
      const STATUS = {
        pom: { name: '神速魔', tracked: true },
        glare4: { name: 'グレアジャ実行可', sid: 3879 },
        swift: { name: '迅速魔' },
        dia: { name: 'ディア', target: true, tracked: true },
        temperance: { name: 'テンパランス' },
        caressReady: { name: 'ディヴァインカレス実行可' },
        lilybell: { name: 'リタージー・オブ・ベル' },
        surecast: { name: '堅実魔' },
        freecure: { name: 'ケアルラ効果アップ' }, // ゲーム内の名前（英語 Freecure）
        plenary: { name: 'インドゥルゲンティア' },
        thinAir: { name: 'シンエアー' },
      };
      const S = () => R.S;
      const has = R.has;
      const gauges = {
        ヒーリングリリー: { get: () => S().lily, set: (v) => { S().lily = Math.max(0, Math.min(3, v)); }, max: 3 },
        ブラッドリリー: { get: () => S().blood, set: (v) => { S().blood = Math.max(0, Math.min(3, v)); }, max: 3 },
      };
      const isSpell = (a) => a.category === 2;
      // リタージー・オブ・ベル（説明文）:「周囲20m以内」「回復力：400」「この効果は、発動後1秒間は再発動しない」「回復力：200×残りスタック数」
      const BELL = { r: 20, heal: 400, lockMs: 1000, burst: 200 };
      const Au = () => window.MockAudio;
      // ベルの最後: 残りのスタックの分だけ回復して消える（時間切れ・再使用）
      function bellEnd(why) {
        const n = S().bell;
        S().bell = 0; R.remove('lilybell');
        if (n > 0) R.zoneHeal('bell', BELL.burst * n * HEAL_K, 'burst');
        R.zoneEnd('bell');
        R.addLog('ok', `リタージー・オブ・ベル: ${why}（残り ${n} 回分をまとめて回復）`);
        Au()?.finisher('getsu');
      }
      const J = {
        ids: ID, STATUS,
        charges: descCharges(A), // テトラグラマトン・ディヴァインベニゾン・シンエアー「最大チャージ数：2」
        prepull: new Set([ID.SWIFT]),
        comboStarters: new Set(),
        procStatus: { 181: 'glare4', 182: 'caressReady', 2: 'freecure' }, // 2 = ケアルラ（ケアルラ効果アップの間光る）
        dot: { key: 'dia' },
        initState(s) { s.lily = 0; s.blood = 0; s.lilyT = 0; s.stats.lilyOver = 0; s.bell = 0; s.bellNext = 0; },
        // リタージー・オブ・ベルの効果時間中の再使用（残りのスタックで回復して消える）は、リキャストを待たずに使える（説明文「効果時間中に再使用すると」）
        freeUse: (id) => id === ID.LILYBELL && S().bell > 0,
        instantNow: (id) => id === ID.LILYBELL && S().bell > 0,
        gaugeCols: [['リリー', (s) => s.lily], ['ブラッドリリー', (s) => s.blood]],
        tracked: [['ディア', 'dia', '#9ad8ff', '切れる前（残り 3 秒ほど）に付け直す'], ['神速魔', 'pom', '#fff0a8', '120 秒ごとに。グレアジャ 3 回をこの中に']],
        // 神速魔: 魔法のキャストタイムとリキャストタイムを 20% 短縮（説明文）
        speed: (a) => (a && isSpell(a) && has('pom') ? 1 - (A[ID.POM]?.eff?.haste?.pct ?? 20) / 100 : 1),
        comboFree: () => false,
        resolve: (id) => tooltipResolve(R, J, id),
        blocked: (id) => (id === ID.RAISE && !R.npcDown() ? '戦闘不能の味方がいません' : tooltipBlocked(R, J, A[id], gauges)),
        // 詠唱時間: 迅速魔（次の 1 回の魔法）は詠唱時間無し
        castMs(a, base) {
          if (!base) return 0;
          if (isSpell(a) && has('swift')) return 0;
          return base;
        },
        effects(id, ok) {
          const a = A[id];
          if (id === ID.SWIFT) { R.buff('swift', 10000); return; } // 迅速魔「効果時間：10秒」
          if (id === ID.LILYBELL && S().bell > 0) { bellEnd('再使用'); return; }
          const swiftUsed = isSpell(a) && a.castMs > 0 && has('swift');
          tooltipEffects(R, J, a, ok, gauges);
          if (swiftUsed) R.remove('swift');
          if (id === ID.SOLACE || id === ID.RAPTURE) { /* ブラッドリリーは説明文の付与で +1（ゲージ） */ }
          if (a.pot?.dot) R.buff('dia', a.pot.dot.sec * 1000);
          if (id === ID.RAISE) R.raise(); // レイズ: 倒れている相方を起こす（HP は仮で 50%）
          const e = a.eff;
          // 回復・継続回復・バリア・軽減（説明文から）。テンパランス中は回復魔法の回復量 +20%（説明文）
          const up = isSpell(a) && has('temperance') ? 1.2 : 1;
          support(R, a, { healUp: up, skipHot: id === ID.ASYLUM });
          if (PLENARY_HEALS.has(id) && has('plenary')) R.heal('party', 200 * HEAL_K * up); // インドゥルゲンティアの追加の回復「回復力：200」
          if (id === ID.TEMPERANCE) R.buff('temperance', 20000);
          if (id === ID.PLENARY) R.buff('plenary', 10000);
          if (id === ID.THIN) R.buff('thinAir', 12000);
          if (id === ID.CURE && Math.random() < 0.15) { R.buff('freecure', 15000); R.addLog('ok', 'ケアルラ効果アップ（次のケアルラの消費 MP が 0）'); } // 発動確率15％
          if (id === ID.CURE2) R.remove('freecure');
          if (id === ID.ASYLUM) {
            // アサイラム: 地面に回復の範囲を置く（範囲は抽出データの effectRange。3 秒ごとに中の味方を回復）
            R.zone('asylum', { r: a.effectRange || 15, sec: e.hot.sec, frac: e.hot.potency * HEAL_K });
            Au()?.water();
          }
          if (id === ID.LILYBELL) {
            // リタージー・オブ・ベル: 鐘を置く（ステータスの 5 スタックは説明文の付与で付いている）
            S().bell = S().st.lilybell?.stacks ?? 5; S().bellNext = 0;
            R.zone('bell', { r: BELL.r, sec: (a.eff?.grant?.[0]?.sec ?? 20) });
            Au()?.finisher('ka');
          }
        },
        // 自分がダメージを受けたとき: ベルが鳴り、スタックを 1 つ使って周囲 20m を回復する（1 秒に 1 回まで）
        onHurt() {
          const s = S();
          if (s.bell <= 0 || s.t < s.bellNext || !has('lilybell')) return;
          s.bell -= 1; s.bellNext = s.t + BELL.lockMs;
          if (s.st.lilybell) s.st.lilybell.stacks = s.bell;
          R.zoneHeal('bell', BELL.heal * HEAL_K, 'ring');
          R.addLog('ok', `リタージー・オブ・ベルが鳴った（残り ${s.bell}）`);
          Au()?.finisher('setsu');
          if (s.bell <= 0) { R.remove('lilybell'); R.zoneEnd('bell'); }
        },
        tick(dt) {
          const s = S();
          if (s.bell > 0 && !has('lilybell')) bellEnd('時間切れ');
          if (s.phase !== 'combat') return;
          s.lilyT += dt;
          while (s.lilyT >= 20000) {
            s.lilyT -= 20000;
            if (s.lily >= 3) { s.stats.lilyOver++; R.addLog('warn', 'ヒーリングリリーがあふれました（3 つのまま）'); R.ev('ミス', { result: 'あふれ', note: 'ヒーリングリリーが 3 つのまま' }); }
            gauges.ヒーリングリリー.set(s.lily + 1); // 仮（GAME-62）
          }
        },
        highlightOk: () => true,
        guide: () => null,
        positional: () => null,
        fxColor: (id) => (id === ID.MISERY ? 'blood' : id === ID.GLARE4 ? 'holy' : A[id]?.eff?.heal != null || A[id]?.eff?.hot ? 'heal' : id === ID.DIA ? 'water' : id === ID.ASSIZE ? 'holy' : 'holy'),
        fxPower: (id) => (id === ID.MISERY || id === ID.GLARE4 ? 1.4 : 1),
        fxCount: () => 1,
        castColor: (id) => (A[id]?.eff?.heal != null ? 'heal' : 'holy'),
        castPower: 0.35, // 詠唱の光（床の陣・光源）を控えめに（詠唱が多いジョブのため）
        gcdColor: (id) => (id === ID.GLARE3 ? '#dff4ff' : id === ID.GLARE4 ? '#fff0a8' : id === ID.DIA ? '#9ad8ff' : id === ID.MISERY ? '#ff7a8a' : A[id]?.eff?.heal != null ? '#8fe8a8' : null),
        hotOgcd: (id) => id === ID.ASSIZE,
        sfx(id, info, Au) {
          if (info.kind === 'buff') { if (id === ID.POM) Au.surge(); else Au.buff(); return; }
          if (A[id]?.eff?.heal != null || A[id]?.eff?.hot) { Au.water(); return; }
          Au.finisher(id === ID.MISERY ? 'ka' : 'setsu'); Au.hit(info.power);
        },
        tipCost: (id) => (A[id]?.eff?.cost ? [A[id].eff.cost.gauge, A[id].eff.cost.n] : null),
        report(s) {
          const issues = [], metrics = [], goods = [];
          if (s.stats.lilyOver) issues.push({ loss: s.stats.lilyOver * 3, rate: s.stats.lilyOver > 2 ? 'bad' : 'ok', title: `ヒーリングリリーのあふれ ${s.stats.lilyOver} 回`, advice: 'リリーが 3 つになる前に、ハート・オブ・ソラスかラプチャーで使う（ブラッドリリーも溜まる）' });
          metrics.push({ label: 'ヒーリングリリーのあふれ', value: `${s.stats.lilyOver} 回`, rate: Math.max(0, 100 - s.stats.lilyOver * 20) });
          if (!s.stats.lilyOver && s.stats.gcds > 10) goods.push('リリーのあふれなし');
          return { issues, metrics, goods, overPct: Math.max(0, 100 - s.stats.lilyOver * 20), posAdvice: '', comboAdvice: '光っている技を順に', castAdvice: 'グレアガの詠唱中は動かない（詠唱の終わり際は動いても完了する: 滑り撃ち）。動くときは迅速魔・グレアジャ・ディア・ハート・オブ・ミゼリ', rangeAdvice: '魔法の射程（25m）の中にいる' };
        },
        howto: '白魔道士: グレアガを撃ち続け、ディアを切らさない。神速魔の間にグレアジャ 3 回。リリーはハート・オブ・ソラス / ラプチャーで使い、3 回でハート・オブ・ミゼリ。タンクの HP も見て回復してください。',
        gaugeUI: (D) => window.MockGauge2.create(D.gauge, 'WHM'),
        gaugeDefault: { JobHudWHM0: { x: 70, y: 66, anchor: 4, scale: 1 } },
      };
      return J;
    },
  };

  // ---------------- 占星術師 ----------------
  // 説明文から:
  //   アストラルドロー → プレイI〜III・マイナーアルカナがアーゼマの均衡・オシュオンの矢・ビエルゴの塔・クラウンロードに変わる。
  //   使うとアンブラルドロー（ハルオーネの槍・世界樹の幹・サリャクの水瓶・クラウンレディ）に変わる。リキャストは共有（55 秒）
  //   アーゼマの均衡: 近接攻撃が主体なら与ダメージ 6%、それ以外 3%（15 秒）/ ハルオーネの槍: 遠隔攻撃が主体なら 6%、それ以外 3%
  //   ディヴィネーション: 自分と周囲の与ダメージ 6%（20 秒）＋オラクル実行可（30 秒）
  //   アーサリースター: 置くと星の支配者（10 秒）。時間が過ぎると巨星の支配者（10 秒）。再使用か巨星の時間切れで爆発
  //   マクロコスモス: 15 秒のあいだ受けたダメージを溜め、終わり（かミクロコスモス）で 回復力 200 ＋ 溜めた分の 50% を回復
  // 仮（説明文にない）: 占星術師自身は「遠隔攻撃が主体」とみなす（均衡 3%・槍 6%）。相方のタンクは「近接攻撃が主体」。
  //   運命の輪は、置いた場所に留まる効果を省き、実行時の軽減と継続回復だけ（GAME-67）。ベネフィクの「次のベネフィラが必ずクリティカル」は未対応
  const AST = {
    abbr: 'AST',
    create(R) {
      const { A } = R;
      const ID = {
        MALEFIC: 25871, COMBUST: 16554, GRAVITY: 25872, BENEFIC: 3594, BENEFIC2: 3610, ASPB: 3595, HELIOS: 3600, CHELIOS: 37030, ASCEND: 3603,
        LIGHTSPEED: 3606, DIGNITY: 3614, SYNASTRY: 3612, COLLECTIVE: 3613, STAR: 7439, DIVINATION: 16552, OPPOSITION: 16553, INTERSECTION: 16556,
        HOROSCOPE: 16557, NEUTRAL: 16559, EXALT: 25873, MACRO: 25874, MICRO: 25875, ADRAW: 37017, UDRAW: 37018, PLAY1: 37019, PLAY2: 37020, PLAY3: 37021, MINOR: 37022,
        BALANCE: 37023, ARROW: 37024, SPIRE: 37025, SPEAR: 37026, BOLE: 37027, EWER: 37028, LORD: 7444, LADY: 7445, ORACLE: 37029, SUNSIGN: 37031, SWIFT: 7561,
      };
      // カード（ゲージの絵の番号はパーツリスト 2 の並び: 0 均衡・1 幹・2 矢・3 槍・4 塔・5 水瓶・6 レディ・7 ロード）
      const DRAWS = {
        astral: { p1: 'balance', p2: 'arrow', p3: 'spire', minor: 'lord' },
        umbral: { p1: 'spear', p2: 'bole', p3: 'ewer', minor: 'lady' },
      };
      const CARD_ID = { balance: ID.BALANCE, arrow: ID.ARROW, spire: ID.SPIRE, spear: ID.SPEAR, bole: ID.BOLE, ewer: ID.EWER, lord: ID.LORD, lady: ID.LADY };
      const SLOT_OF = { [ID.PLAY1]: 'p1', [ID.PLAY2]: 'p2', [ID.PLAY3]: 'p3', [ID.MINOR]: 'minor' };
      const CARD_SLOT = Object.fromEntries(Object.entries(DRAWS).flatMap(([, d]) => Object.entries(d).map(([slot, c]) => [CARD_ID[c], slot])));
      const STATUS = {
        combust: { name: 'コンバガ', target: true, tracked: true },
        lightspeed: { name: 'ライトスピード' },
        divination: { name: 'ディヴィネーション', tracked: true },
        oracleReady: { name: 'オラクル実行可' },
        neutral: { name: 'ニュートラルセクト' },
        sunsignReady: { name: 'サンサイン実行可' },
        swift: { name: '迅速魔' },
        surecast: { name: '堅実魔' },
        lucid: { name: 'ルーシッドドリーム' },
        earthly: { name: '星の支配者' },
        giant: { name: '巨星の支配者' },
        horoscope: { name: 'ホロスコープ' },
        horoscopeH: { name: 'ホロスコープ・ヘリオス' },
        macro: { name: 'マクロコスモス' },
        synastry: { name: 'シナストリー' },
        balance: { name: 'アーゼマの均衡' },
        spear: { name: 'ハルオーネの槍' },
      };
      const S = () => R.S;
      const has = R.has;
      const isSpell = (a) => a.category === 2;
      const Au = () => window.MockAudio;
      const STAR = { r: A[ID.STAR]?.effectRange || 20, dmg: [205, 310], heal: [540, 720], ms: 10000 };
      // 味方への回復量の倍率: ニュートラルセクト（回復魔法 +20%）
      const healUp = (a) => (isSpell(a) && has('neutral') ? 1.2 : 1);
      // アーサリースターの爆発（再使用・巨星の時間切れ）
      function starBurst(why) {
        const s = S(), st = s.star;
        if (!st) return;
        const g = st.giant ? 1 : 0;
        s.star = null; R.remove('earthly'); R.remove('giant');
        R.zoneHeal('star', STAR.heal[g] * HEAL_K, 'burst');
        if (R.zoneHitsBoss('star')) R.hit(STAR.dmg[g], g ? 'ステラエクスプロージョン' : 'ステラバースト');
        R.zoneEnd('star');
        R.addLog('ok', `アーサリースター: ${why}（${g ? 'ステラエクスプロージョン' : 'ステラバースト'}）`);
        if (!g) { s.stats.starEarly++; }
        Au()?.finisher(g ? 'ka' : 'setsu');
      }
      // ホロスコープの回復（再使用・時間切れ）: ホロスコープ 回復力 200 / ホロスコープ・ヘリオス 400
      function horoscopeHeal(why, kind) {
        const hh = kind ? kind === 'hh' : has('horoscopeH');
        if (!kind && !hh && !has('horoscope')) return;
        S().horo = null;
        R.remove('horoscope'); R.remove('horoscopeH');
        R.heal('party', (hh ? 400 : 200) * HEAL_K);
        R.addLog('ok', `ホロスコープ: ${why}（回復力 ${hh ? 400 : 200}）`);
      }
      function macroEnd(why) {
        const s = S(), m = s.macroC;
        if (!m) return;
        s.macroC = null; R.remove('macro');
        for (const who of ['self', 'npc']) {
          const lost = Math.max(0, (m.hp[who] ?? 0) - R.hpOf(who));
          R.heal(who, 200 * HEAL_K + lost * 0.5);
        }
        R.addLog('ok', `マクロコスモス: ${why}（回復力 200 ＋ 受けたダメージの 50%）`);
      }
      const J = {
        ids: ID, STATUS,
        charges: descCharges(A), // ライトスピード 2・ディグニティ 3・星天交差 2
        prepull: new Set([ID.ADRAW, ID.UDRAW, ID.SWIFT, ID.LIGHTSPEED, ID.STAR]),
        comboStarters: new Set(),
        procStatus: {},
        dot: { key: 'combust' },
        initState(s) { s.cards = { p1: null, p2: null, p3: null, minor: null }; s.nextDraw = 'astral'; s.star = null; s.macroC = null; s.exalt = []; s.synastry = null; s.stats.cardsPlayed = 0; s.stats.cardsLost = 0; s.stats.starEarly = 0; s.horo = null; },
        // 効果時間中の再使用: アーサリースター（爆発）・ホロスコープ（回復）はリキャストを待たない
        freeUse: (id) => (id === ID.STAR && !!S().star) || (id === ID.HOROSCOPE && (has('horoscope') || has('horoscopeH'))),
        instantNow: (id) => id === ID.STAR && !!S().star,
        noHit: (id) => id === ID.STAR, // 置いたとき・再使用のときは攻撃しない（爆発で攻撃する）
        gaugeCols: [['カード', (s) => Object.values(s.cards).filter(Boolean).join('/')], ['次のドロー', (s) => s.nextDraw]],
        tracked: [['コンバガ', 'combust', '#ffd88a', '切れる前（残り 3 秒ほど）に付け直す'], ['ディヴィネーション', 'divination', '#b8c8ff', '120 秒ごとに。オラクルも忘れずに']],
        // 自分の与ダメージ: ディヴィネーション 6%・自分に使ったカード（均衡 3%・槍 6%）
        dmgMult: () => (has('divination') ? 1.06 : 1) * (has('balance') ? 1.03 : 1) * (has('spear') ? 1.06 : 1),
        speed: () => 1,
        comboFree: () => false,
        resolve(id) {
          const s = S();
          if (id === ID.ADRAW || id === ID.UDRAW) return s.nextDraw === 'umbral' ? ID.UDRAW : ID.ADRAW;
          const slot = SLOT_OF[id];
          if (slot) return s.cards[slot] ? CARD_ID[s.cards[slot]] : id;
          if (id === ID.MACRO && s.macroC) return ID.MICRO;
          return tooltipResolve(R, J, id);
        },
        blocked(id) {
          if (SLOT_OF[id]) return 'カードを引いていません（アストラルドロー / アンブラルドローで引く）';
          if (CARD_SLOT[id] && !S().cards[CARD_SLOT[id]]) return 'そのカードは引いていません';
          if (id === ID.MICRO && !S().macroC) return '「マクロコスモス」の効果中ではありません';
          if (id === ID.ASCEND && !R.npcDown()) return '戦闘不能の味方がいません';
          return tooltipBlocked(R, J, A[id]);
        },
        // 詠唱時間: 迅速魔は無し、ライトスピードは 2.5 秒短縮（説明文）
        castMs(a, base) {
          if (!base) return 0;
          if (isSpell(a) && has('swift')) return 0;
          if (isSpell(a) && has('lightspeed')) return Math.max(0, base - 2500);
          return base;
        },
        effects(id, ok) {
          const a = A[id], s = S();
          if (id === ID.STAR && s.star) { starBurst('再使用'); return; }
          if (id === ID.HOROSCOPE && (has('horoscope') || has('horoscopeH'))) { horoscopeHeal('再使用'); return; }
          const swiftUsed = isSpell(a) && a.castMs > 0 && has('swift');
          tooltipEffects(R, J, a, ok, {});
          if (swiftUsed) R.remove('swift');
          if (a.pot?.dot) R.buff('combust', a.pot.dot.sec * 1000);
          // ドロー: 前のカードは消える（使っていなければ数える）。次は反対のドロー
          if (id === ID.ADRAW || id === ID.UDRAW) {
            const lost = Object.values(s.cards).filter(Boolean).length;
            if (lost) { s.stats.cardsLost += lost; R.addLog('warn', `使っていないカード ${lost} 枚が消えました`); R.ev('ミス', { result: 'カードの使い忘れ', note: `${lost} 枚` }); }
            const kind = id === ID.ADRAW ? 'astral' : 'umbral';
            s.cards = { ...DRAWS[kind] }; s.nextDraw = kind === 'astral' ? 'umbral' : 'astral';
            return;
          }
          // カード: 引いた札を使う（与ダメージ・受ける回復・バリア・軽減・継続回復・範囲攻撃・範囲回復）
          if (CARD_SLOT[id]) {
            s.cards[CARD_SLOT[id]] = null; s.stats.cardsPlayed++;
            const who = R.who ?? 'self';
            if (id === ID.BALANCE || id === ID.SPEAR) {
              // 近接（相方のタンク）: 均衡 6%・槍 3%。自分（遠隔とみなす・仮）: 均衡 3%・槍 6%
              const melee = who === 'npc', pct = (id === ID.BALANCE) === melee ? 6 : 3;
              if (who === 'self') R.buff(id === ID.BALANCE ? 'balance' : 'spear', 15000);
              else R.mark(who, a.name, 15, { dmgUp: pct / 100 });
              R.addLog('ok', `${a.name}: ${who === 'npc' ? '相方' : '自分'}の与ダメージ ${pct}%`);
            } else if (id === ID.ARROW) R.mark(who, a.name, 15, { healUp: 0.1 });
            else if (id === ID.SPIRE) R.shield(who, 400 * HEAL_K, 30, a.name);
            else if (id === ID.BOLE) R.mitigate(who, 0.1, 15, a.name);
            else if (id === ID.EWER) R.hot(who, 200 * HEAL_K, 15, a.name);
            else if (id === ID.LADY) R.heal('party', 400 * HEAL_K);
            return; // クラウンロードは威力（説明文）で攻撃する
          }
          // 回復・継続回復・バリア・軽減（説明文から）
          const up = healUp(a);
          if (id === ID.DIGNITY) {
            // 対象の残り HP が低いほど回復力が上がる（400〜900、30% 以下で最大）。間は直線とみなす（仮）
            const hp = R.hpOf(R.who ?? 'self'), k = Math.max(0, Math.min(1, (1 - hp) / 0.7));
            R.heal('low', (400 + 500 * k) * HEAL_K);
          } else if (id === ID.INTERSECTION) {
            R.heal('low', 200 * HEAL_K); R.shield('low', 400 * HEAL_K, 30, a.name); // バリアは回復量の 200%
          } else if (id === ID.EXALT) {
            R.mitigate('low', 0.1, 8, a.name); s.exalt.push({ who: R.who ?? 'self', at: s.t + 8000 }); // 終わりに回復力 500
          } else if (id === ID.COLLECTIVE) {
            R.mitigate('party', 0.1, 10, a.name); R.hot('party', 100 * HEAL_K, 15, a.name);
          } else if (id === ID.SUNSIGN) {
            R.mitigate('party', 0.1, 15, a.name);
          } else if (id !== ID.MACRO && id !== ID.MICRO) support(R, a, { healUp: up });
          // ニュートラルセクト中: アスペクト・ベネフィク（回復量の 250%）・コンジャンクション・ヘリオス（125%）にバリア
          if (has('neutral') && id === ID.ASPB) R.shield('low', 250 * HEAL_K * up * 2.5, 30, 'ニュートラルセクト');
          if (has('neutral') && id === ID.CHELIOS) R.shield('party', 250 * HEAL_K * up * 1.25, 30, 'ニュートラルセクト');
          // シナストリー: 単体回復魔法の回復量の 40% を、シナストリーの相手にも
          if (has('synastry') && s.synastry && isSpell(a) && a.eff?.heal != null && !a.eff.party) R.heal(s.synastry, a.eff.heal * HEAL_K * up * 0.4);
          if (id === ID.SYNASTRY) { s.synastry = R.who ?? 'npc'; R.buff('synastry', 20000); }
          if (id === ID.SWIFT) R.buff('swift', 10000);
          if (id === ID.LIGHTSPEED) R.buff('lightspeed', 15000);
          if (id === ID.DIVINATION) R.buff('divination', 20000);
          if (id === ID.NEUTRAL) R.buff('neutral', 20000);
          if (id === ID.HOROSCOPE) R.buff('horoscope', 10000);
          if ((id === ID.HELIOS || id === ID.CHELIOS) && (has('horoscope') || has('horoscopeH'))) { R.remove('horoscope'); R.buff('horoscopeH', 30000); }
          if (id === ID.STAR) {
            s.star = { at: s.t, giant: false };
            R.remove('giant'); R.buff('earthly', STAR.ms); // 説明文の付与で両方付くので、巨星は時間が来てから
            R.zone('star', { r: STAR.r, sec: 20 });
            Au()?.buff();
          }
          if (id === ID.MACRO) { s.macroC = { at: s.t, hp: { self: R.hpOf('self'), npc: R.hpOf('npc') } }; R.buff('macro', 15000); }
          if (id === ID.MICRO) macroEnd('ミクロコスモス');
          if (id === ID.ASCEND) R.raise();
        },
        tick() {
          const s = S();
          // アーサリースター: 10 秒で巨星に、さらに 10 秒で爆発
          if (s.star && !s.star.giant && s.t >= s.star.at + STAR.ms) {
            s.star.giant = true; R.remove('earthly'); R.buff('giant', STAR.ms);
            R.zoneSet('star', { giant: true });
            R.addLog('ok', 'アーサリースターが巨星になりました（再使用でステラエクスプロージョン）');
          }
          if (s.star?.giant && s.t >= s.star.at + STAR.ms * 2) starBurst('時間切れ');
          // ホロスコープの時間切れ（付いていた種類で回復）
          if (s.horo && !has('horoscope') && !has('horoscopeH')) horoscopeHeal('時間切れ', s.horo);
          if (has('horoscopeH')) s.horo = 'hh'; else if (has('horoscope')) s.horo = 'h';
          if (s.macroC && s.t >= s.macroC.at + 15000) macroEnd('時間切れ');
          for (const e of s.exalt.filter((x) => s.t >= x.at)) R.heal(e.who, 500 * HEAL_K);
          s.exalt = s.exalt.filter((x) => s.t < x.at);
        },
        highlightOk: () => true,
        // 光る: 引いたカード（プレイ I〜III・マイナーアルカナ）、オラクル・サンサイン（実行可の間）、巨星のアーサリースター
        glow: (id) => (CARD_SLOT[id] ? !!S().cards[CARD_SLOT[id]] : id === ID.ORACLE ? has('oracleReady') : id === ID.SUNSIGN ? has('sunsignReady') : id === ID.STAR ? !!S().star?.giant : id === ID.MICRO ? !!S().macroC : false),
        guide: () => null,
        positional: () => null,
        fxColor: (id) => (A[id]?.eff?.heal != null || A[id]?.eff?.hot || id === ID.LADY ? 'heal' : id === ID.COMBUST ? 'holy' : id === ID.LORD || id === ID.ORACLE ? 'blood' : 'water'),
        fxPower: (id) => (id === ID.ORACLE || id === ID.LORD ? 1.4 : 1),
        fxCount: () => 1,
        castColor: (id) => (A[id]?.eff?.heal != null ? 'heal' : 'water'),
        castPower: 0.35,
        gcdColor: (id) => (id === ID.MALEFIC ? '#cfe0ff' : id === ID.COMBUST ? '#ffd88a' : A[id]?.eff?.heal != null ? '#8fe8a8' : null),
        hotOgcd: (id) => id === ID.ORACLE || id === ID.LORD || id === ID.DIVINATION,
        sfx(id, info, Au) {
          if (info.kind === 'buff') { if (id === ID.DIVINATION) Au.surge(); else Au.buff(); return; }
          if (A[id]?.eff?.heal != null || A[id]?.eff?.hot) { Au.water(); return; }
          Au.finisher(id === ID.ORACLE || id === ID.LORD ? 'ka' : 'getsu'); Au.hit(info.power);
        },
        tipCost: () => null,
        report(s) {
          const issues = [], metrics = [], goods = [];
          if (s.stats.cardsLost) issues.push({ loss: s.stats.cardsLost * 3, rate: s.stats.cardsLost > 2 ? 'bad' : 'ok', title: `使わずに消えたカード ${s.stats.cardsLost} 枚`, advice: '次のドローの前に、プレイ I〜III とマイナーアルカナを使い切る（均衡・槍は相方に、ロードは敵に）' });
          if (s.stats.starEarly) issues.push({ loss: s.stats.starEarly * 2, rate: 'ok', title: `アーサリースターを巨星になる前に爆発 ${s.stats.starEarly} 回`, advice: '置いてから 10 秒待つと巨星になり、威力と回復量が上がる' });
          metrics.push({ label: '使ったカード', value: `${s.stats.cardsPlayed} 枚`, rate: Math.max(0, 100 - s.stats.cardsLost * 20) });
          if (!s.stats.cardsLost && s.stats.cardsPlayed > 3) goods.push('カードを使い切った');
          return { issues, metrics, goods, overPct: Math.max(0, 100 - s.stats.cardsLost * 20), posAdvice: '', comboAdvice: '光っている技（引いたカード・オラクル）を使う', castAdvice: 'フォールマレフィクの詠唱中は動かない（詠唱の終わり際は動いても完了する: 滑り撃ち）。動くときはライトスピード・迅速魔・コンバガ', rangeAdvice: '魔法の射程（25m）の中にいる' };
        },
        howto: '占星術師: フォールマレフィクを撃ち続け、コンバガを切らさない。アストラルドロー / アンブラルドローで引いたカードは、アーゼマの均衡を相方に、ハルオーネの槍を自分に、クラウンロードを敵に。ディヴィネーションの後にオラクル。回復は相方をクリック（またはパーティリスト）でターゲットして。',
        gaugeUI: (D) => window.MockGauge2.create(D.gauge, 'AST'),
        gaugeDefault: { JobHudAST0: { x: 70, y: 66, anchor: 4, scale: 1 } },
      };
      return J;
    },
  };

  // ---------------- 黒魔道士 ----------------
  // 説明文から: アストラルファイア（AF）とアンブラルブリザード（UB）の入れ替え（ファイア系で AF、ブリザド系で UB。逆の属性は解除）、
  //   ファイガ・ハイファイラ・フレア・デスペアは AF を最大に、ブリザガ・ハイブリザラは UB を最大に。トランスは逆の 1 段階目に。
  //   アンブラルハート（ブリザジャ・フリーズ・マナフォントで 3 つ）: ファイア系の AF による消費 MP の増加を防ぐ。フレアは全部使って消費 MP 2/3
  //   サンダー系魔法実行可: AF / UB が無い状態でどちらかになったとき、またはもう一方に変わったとき。ファイア（40%）とパラドックス（AF 時）でファイガ効果アップ
  //   ファイジャで アストラルソウル +1、フレアで +3。最大（6）でフレアスター。AF が切れるとなくなる
  //   パラドックス: パラドックスシンボルが必要。UB 時は消費 MP 0。マナフォントで付く。ファイアとブリザドがパラドックスに変わる
  //   黒魔紋: 自身の足元に。魔法のキャストタイムとリキャストタイムを 15% 短縮（中にいる間）。三連魔: 3 回まで詠唱なし
  // 特性の説明（公式ジョブガイド。特性のシートは未抽出: DATA-05）から:
  //   極性マスタリー: AF1/2/3 = 火の威力 +40/60/80%・氷の威力 −10/20/30%・火の消費 MP ×2・氷の消費 MP 0・MP の自然回復 0
  //     UB1/2/3 = 火の威力 −10/20/30%・火と氷の消費 MP 0・氷の命中で MP +2500/5000/10000。AF3 で氷、UB3 で火の詠唱時間が半分
  //   エノキアン: AF か UB の間、与魔法ダメージ +27%。30 秒続くごとにポリグロット（最大 3）
  //   極性マスタリー V: AF か UB が最大で、アンブラルハートも最大の状態で反対の属性に変わるとパラドックスシンボル（属性が消えると消える）
  //   アストラルファイア効果アップ: デスペアは詠唱時間なし
  // 仮（GAME-68）: AF・UB の外の MP の自然回復は 3 秒ごとに 200
  const BLM = {
    abbr: 'BLM',
    create(R) {
      const { A } = R;
      const ID = {
        FIRE: 141, BLIZZ: 142, TRANSPOSE: 149, THUNDER: 36986, THUNDER2: 36987, FIRE3: 152, BLIZZ3: 154, FIRE4: 3577, BLIZZ4: 3576, FREEZE: 159, FLARE: 162,
        HFIRE2: 25794, HBLIZZ2: 25795, DESPAIR: 16505, FLARESTAR: 36989, PARADOX: 25797, FOUL: 7422, XENO: 16507, USOUL: 16506, MANAFONT: 158, AMPLIFIER: 25796,
        LEY: 3573, BTL: 7419, RETRACE: 36988, TRIPLE: 7421, SWIFT: 7561, MANAWARD: 157, SCATHE: 156, AETHERIAL: 155,
      };
      const FIRE_SET = new Set([ID.FIRE, 147, ID.FIRE3, ID.FIRE4, ID.HFIRE2, ID.FLARE, ID.DESPAIR, ID.FLARESTAR]);
      const ICE_SET = new Set([ID.BLIZZ, 25793, ID.BLIZZ3, ID.BLIZZ4, ID.HBLIZZ2, ID.FREEZE]);
      const STATUS = {
        thunderhead: { name: 'サンダー系魔法実行可' },
        firestarter: { name: 'ファイガ効果アップ' },
        thunderDot: { name: 'ハイサンダー', target: true, tracked: true },
        triple: { name: '三連魔' },
        swift: { name: '迅速魔' },
        ley: { name: '黒魔紋', tracked: true },
        manaward: { name: 'マバリア' },
        surecast: { name: '堅実魔' },
      };
      const S = () => R.S;
      const has = R.has;
      const Au = () => window.MockAudio;
      const MP_MAX = 10000;
      const isSpell = (a) => a.category === 2;
      // 仮の倍率（GAME-68）
      const FIRE_UP = [1, 1.4, 1.6, 1.8], ICE_IN_AF = [1, 0.9, 0.8, 0.7], FIRE_IN_UB = [1, 0.9, 0.8, 0.7];
      const UB_MP_ON_ICE = [0, 2500, 5000, 10000]; // 氷の命中で回復する MP（UB1/2/3）
      const ENOCHIAN = 1.27;
      function mpCost(a) {
        const s = S();
        if (a.id === ID.PARADOX && s.ub > 0) return 0; // 説明文「アンブラルブリザード時: この魔法の消費ＭＰが0」
        if (a.id === ID.FIRE3 && has('firestarter')) return 0; // ファイガ効果アップ
        if (a.mp === -1) return a.id === ID.FLARE && s.hearts > 0 ? Math.floor((s.mp * 2) / 3) : s.mp; // フレア・デスペア: MP 全部（フレアはハートで 2/3）
        let c = a.mp ?? 0;
        if (FIRE_SET.has(a.id)) { if (s.af > 0 && s.hearts <= 0) c *= 2; if (s.ub > 0) c = 0; }
        if (ICE_SET.has(a.id) && (s.af > 0 || s.ub > 0)) c = 0; // 氷は AF でも UB でも消費 MP 0
        return Math.round(c);
      }
      const minMp = (a) => (a.mp === -1 ? 800 : mpCost(a)); // デスペア・フレアは 800 以上ないと使えない（仮）
      function setAF(n) { const s = S(), was = s.af > 0 ? 'af' : s.ub > 0 ? 'ub' : null; if (was !== 'af') onSwap(was, 'af'); s.af = n; s.ub = 0; }
      function setUB(n) {
        const s = S(), was = s.af > 0 ? 'af' : s.ub > 0 ? 'ub' : null;
        if (was !== 'ub') onSwap(was, 'ub');
        s.ub = n; if (s.af) { s.af = 0; } s.soul = 0;
      }
      // 属性が変わった: サンダー系魔法実行可（説明文）。AF3 ↔ UB3 の入れ替えでパラドックスシンボル（仮）
      function onSwap(from, to) {
        const s = S();
        R.buff('thunderhead', 999999);
        if (((from === 'ub' && s.ub >= 3) || (from === 'af' && s.af >= 3)) && s.hearts >= 3) s.paradox = true;
        if (!from) s.paradox = false;
        if (to === 'ub') s.soul = 0;
      }
      const J = {
        ids: ID, STATUS,
        charges: descCharges(A), // 黒魔紋・三連魔「最大チャージ数：2」
        prepull: new Set([ID.FIRE3, ID.BLIZZ3, ID.USOUL, ID.LEY, ID.SWIFT, ID.TRIPLE, ID.MANAWARD, ID.TRANSPOSE]),
        comboStarters: new Set(),
        procStatus: {},
        dot: { key: 'thunderDot' },
        initState(s) { s.mp = MP_MAX; s.af = 0; s.ub = 0; s.hearts = 0; s.poly = 0; s.polyT = 0; s.soul = 0; s.paradox = false; s.mpTick = 0; s.stats.polyOver = 0; s.stats.flareStar = 0; s.stats.f4 = 0; },
        // 黒魔紋は自分の足元に置く（地面を選ばない）
        instantNow: (id) => id === ID.LEY || id === ID.RETRACE,
        gaugeCols: [['MP', (s) => Math.floor(s.mp)], ['AF', (s) => s.af], ['UB', (s) => s.ub], ['ハート', (s) => s.hearts], ['ポリグロット', (s) => s.poly], ['ソウル', (s) => s.soul]],
        tracked: [['ハイサンダー', 'thunderDot', '#c8a8ff', '切れる前に、サンダー系魔法実行可で付け直す'], ['黒魔紋', 'ley', '#b890ff', '120 秒ごと。中に立って詠唱する']],
        potMult(a) {
          const s = S();
          const en = isSpell(a) && (s.af > 0 || s.ub > 0) ? ENOCHIAN : 1; // エノキアン（与魔法ダメージ）
          if (FIRE_SET.has(a.id)) return en * (s.af > 0 ? FIRE_UP[s.af] : s.ub > 0 ? FIRE_IN_UB[s.ub] : 1);
          if (ICE_SET.has(a.id)) return en * (s.af > 0 ? ICE_IN_AF[s.af] : 1);
          return en;
        },
        // 黒魔紋の中: 魔法のキャストタイムとリキャストタイム 15% 短縮（説明文）
        speed: (a) => (a && isSpell(a) && has('ley') && R.inZone('ley') ? 0.85 : 1),
        comboFree: () => false,
        resolve(id) {
          const s = S();
          if ((id === ID.FIRE || id === ID.BLIZZ) && s.paradox && (s.af > 0 || s.ub > 0)) return ID.PARADOX;
          if (id === ID.LEY && has('ley')) return ID.RETRACE;
          return tooltipResolve(R, J, id);
        },
        blocked(id) {
          const s = S(), a = A[id];
          if ([ID.FIRE4, ID.FLARE, ID.DESPAIR, ID.MANAFONT].includes(id) && s.af <= 0) return '「アストラルファイア」の効果中ではありません';
          if ([ID.BLIZZ4, ID.FREEZE, ID.USOUL].includes(id) && s.ub <= 0) return '「アンブラルブリザード」の効果中ではありません';
          if (id === ID.FLARESTAR && s.soul < 6) return `アストラルソウルが足りません（${s.soul} / 6）`;
          if ((id === ID.XENO || id === ID.FOUL) && s.poly <= 0) return 'ポリグロットがありません';
          if (id === ID.PARADOX && !s.paradox) return '「パラドックスシンボル」がありません';
          if (id === ID.AMPLIFIER && s.af <= 0 && s.ub <= 0) return '「アストラルファイア」か「アンブラルブリザード」の効果中ではありません';
          if (id === ID.TRANSPOSE && s.af <= 0 && s.ub <= 0) return '「アストラルファイア」か「アンブラルブリザード」の効果中ではありません';
          if ((id === ID.THUNDER || id === ID.THUNDER2) && !has('thunderhead')) return '「サンダー系魔法実行可」の効果中ではありません';
          if (id === ID.RETRACE && !has('ley')) return '「黒魔紋」の効果中ではありません';
          if (id === ID.BTL && !has('ley')) return '「黒魔紋」の効果中ではありません';
          if (a && isSpell(a) && (a.mp ?? 0) !== 0 && s.mp < minMp(a)) { return `MP が足りません（必要 ${minMp(a)} / 現在 ${Math.floor(s.mp)}）`; }
          return null;
        },
        // 詠唱時間: 迅速魔・三連魔・ファイガ効果アップ（ファイガ）は無し。AF3 の氷・UB3 の火は半分（説明文）
        castMs(a, base) {
          if (!base) return 0;
          const s = S();
          if (isSpell(a) && (has('swift') || has('triple'))) return 0;
          if (a.id === ID.FIRE3 && has('firestarter')) return 0;
          if (a.id === ID.DESPAIR) return 0; // アストラルファイア効果アップ: デスペアは詠唱時間なし
          if (ICE_SET.has(a.id) && s.af >= 3) return base / 2;
          if (FIRE_SET.has(a.id) && s.ub >= 3) return base / 2;
          return base;
        },
        effects(id, ok) {
          const a = A[id], s = S();
          // 詠唱なしの消費: 三連魔（1 回）→ 迅速魔の順（詠唱のある魔法だけ）
          if (isSpell(a) && a.castMs > 0 && !(id === ID.FIRE3 && has('firestarter'))) {
            if (has('triple')) { const t = s.st.triple; if (t.stacks > 1) t.stacks -= 1; else R.remove('triple'); }
            else if (has('swift')) R.remove('swift');
          }
          // MP
          const cost = isSpell(a) ? mpCost(a) : 0;
          if (cost) s.mp = Math.max(0, s.mp - cost);
          if (FIRE_SET.has(id) && s.af > 0 && s.hearts > 0 && id !== ID.FLARE && id !== ID.DESPAIR && id !== ID.FLARESTAR && !(id === ID.FIRE3 && has('firestarter'))) s.hearts -= 1;
          if (id === ID.FIRE3 && has('firestarter')) R.remove('firestarter');
          // 属性
          if (id === ID.FIRE) { if (s.ub > 0) { s.ub = 0; } else setAF(Math.min(3, s.af + 1)); if (Math.random() < 0.4) R.buff('firestarter', 999999); }
          if (id === ID.BLIZZ) { if (s.af > 0) { s.af = 0; s.soul = 0; } else setUB(Math.min(3, s.ub + 1)); }
          if (id === ID.FIRE3 || id === ID.HFIRE2 || id === ID.DESPAIR) setAF(3);
          if (id === ID.BLIZZ3 || id === ID.HBLIZZ2) setUB(3);
          if (id === ID.FLARE) { setAF(3); s.hearts = 0; s.soul = Math.min(6, s.soul + 3); }
          if (id === ID.FIRE4) { s.soul = Math.min(6, s.soul + 1); s.stats.f4++; }
          if (id === ID.BLIZZ4 || id === ID.FREEZE) s.hearts = 3;
          // UB 中の氷の命中: MP 回復（付いた後の段階で）
          if (ICE_SET.has(id) && s.ub > 0) s.mp = Math.min(MP_MAX, s.mp + UB_MP_ON_ICE[s.ub]);
          if (id === ID.FLARESTAR) { s.soul = 0; s.stats.flareStar++; }
          if (id === ID.PARADOX) { s.paradox = false; if (s.af > 0) R.buff('firestarter', 999999); }
          if (id === ID.TRANSPOSE) { if (s.af > 0) setUB(1); else if (s.ub > 0) setAF(1); }
          if (s.af <= 0 && s.ub <= 0) { s.paradox = false; s.soul = 0; } // 属性が消えるとパラドックスシンボル・アストラルソウルも消える
          if (id === ID.USOUL) { setUB(Math.min(3, s.ub + 1)); s.hearts = Math.min(3, s.hearts + 1); }
          if (id === ID.MANAFONT) { s.mp = MP_MAX; setAF(3); R.buff('thunderhead', 999999); s.hearts = 3; s.paradox = true; }
          if (id === ID.AMPLIFIER) { if (s.poly >= 3) { s.stats.polyOver++; R.addLog('warn', 'ポリグロットがあふれました（3 つのまま）'); } s.poly = Math.min(3, s.poly + 1); }
          if (id === ID.XENO || id === ID.FOUL) s.poly -= 1;
          if (id === ID.THUNDER || id === ID.THUNDER2) { R.remove('thunderhead'); if (a.pot?.dot) R.buff('thunderDot', a.pot.dot.sec * 1000); }
          if (id === ID.TRIPLE) R.buff('triple', 15000, 3);
          if (id === ID.SWIFT) R.buff('swift', 10000);
          if (id === ID.MANAWARD) { R.shieldSelf(0.3, 20, 'マバリア'); R.buff('manaward', 20000); }
          if (id === ID.LEY) { R.buff('ley', 20000); R.zone('ley', { r: 3, sec: 20, at: null }); Au()?.buff(); }
          if (id === ID.RETRACE) { R.zoneEnd('ley'); R.zone('ley', { r: 3, sec: (s.st.ley.until - s.t) / 1000, at: null }); }
          if (id === ID.BTL) R.addLog('sys', 'ラインズステップ: 黒魔紋の中心へ移動（練習場の移動は未対応）');
          if (id === ID.AETHERIAL) R.addLog('sys', 'エーテリアルステップ: 味方の前へ移動（練習場の移動は未対応）');
        },
        tick(dt) {
          const s = S();
          if (!has('ley')) R.zoneEnd('ley');
          if (s.phase !== 'combat' && s.phase !== 'countdown') return;
          // MP の回復（3 秒ごと。仮 GAME-68）
          s.mpTick += dt;
          while (s.mpTick >= 3000) {
            s.mpTick -= 3000;
            if (s.af <= 0) s.mp = Math.min(MP_MAX, s.mp + 200); // 仮（GAME-68）
          }
          // ポリグロット（AF / UB の間 30 秒ごと。仮 GAME-68）
          if (s.phase === 'combat' && (s.af > 0 || s.ub > 0)) {
            s.polyT += dt;
            while (s.polyT >= 30000) {
              s.polyT -= 30000;
              if (s.poly >= 3) { s.stats.polyOver++; R.addLog('warn', 'ポリグロットがあふれました（3 つのまま）'); R.ev('ミス', { result: 'あふれ', note: 'ポリグロットが 3 つのまま' }); }
              s.poly = Math.min(3, s.poly + 1);
            }
          }
        },
        highlightOk: () => true,
        // 光る: ファイガ効果アップ中のファイガ、実行可のサンダー、パラドックス、フレアスター（ソウル 6）、ゼノグロシー（ポリグロットがある）、デスペア（MP が 800 以上で残り少ない）
        glow(id) {
          const s = S();
          if (id === ID.FIRE3) return has('firestarter');
          if (id === ID.THUNDER || id === ID.THUNDER2) return has('thunderhead');
          if (id === ID.PARADOX) return s.paradox;
          if (id === ID.FLARESTAR) return s.soul >= 6;
          if (id === ID.XENO || id === ID.FOUL) return s.poly > 0;
          if (id === ID.DESPAIR) return s.af > 0 && s.mp >= 800 && s.mp < 1600 + 800;
          return false;
        },
        guide: () => null,
        positional: () => null,
        fxColor: (id) => (FIRE_SET.has(id) ? 'kenki' : ICE_SET.has(id) ? 'setsu' : id === ID.THUNDER || id === ID.THUNDER2 ? 'getsu' : id === ID.XENO || id === ID.FOUL ? 'shoha' : id === ID.PARADOX ? 'holy' : 'getsu'),
        fxPower: (id) => (id === ID.FLARESTAR || id === ID.XENO || id === ID.DESPAIR ? 1.5 : 1),
        fxCount: () => 1,
        castColor: (id) => (ICE_SET.has(id) ? 'setsu' : FIRE_SET.has(id) ? 'kenki' : 'getsu'),
        castPower: 0.5,
        gcdColor: (id) => (FIRE_SET.has(id) ? '#ff9a6a' : ICE_SET.has(id) ? '#9ad8ff' : id === ID.XENO ? '#c8a8ff' : id === ID.PARADOX ? '#fff0a8' : null),
        hotOgcd: (id) => id === ID.MANAFONT || id === ID.AMPLIFIER,
        sfx(id, info, Au) {
          if (info.kind === 'buff') { if (id === ID.LEY) Au.surge(); else Au.buff(); return; }
          Au.finisher(FIRE_SET.has(id) ? 'ka' : ICE_SET.has(id) ? 'setsu' : 'getsu'); Au.hit(info.power);
        },
        tipCost: (id) => (A[id] && (A[id].mp ?? 0) !== 0 ? ['MP', A[id].mp === -1 ? '全部' : mpCost(A[id])] : null),
        report(s) {
          const issues = [], metrics = [], goods = [];
          if (s.stats.polyOver) issues.push({ loss: s.stats.polyOver * 4, rate: s.stats.polyOver > 1 ? 'bad' : 'ok', title: `ポリグロットのあふれ ${s.stats.polyOver} 回`, advice: '3 つたまる前にゼノグロシーを撃つ（移動のときにも便利）' });
          metrics.push({ label: 'フレアスター', value: `${s.stats.flareStar} 回`, rate: Math.min(100, s.stats.flareStar * 30) });
          metrics.push({ label: 'ファイジャ', value: `${s.stats.f4} 回`, rate: Math.min(100, s.stats.f4 * 5) });
          if (!s.stats.polyOver && s.stats.gcds > 10) goods.push('ポリグロットのあふれなし');
          return { issues, metrics, goods, overPct: Math.max(0, 100 - s.stats.polyOver * 20), posAdvice: '', comboAdvice: '光っている技（パラドックス・フレアスター・ファイガ効果アップ）を', castAdvice: '詠唱中は動かない（詠唱の終わり際は動いても完了する: 滑り撃ち）。動くときは三連魔・迅速魔・ゼノグロシー・パラドックス・サンダー', rangeAdvice: '魔法の射程（25m）の中にいる。黒魔紋の中で詠唱する' };
        },
        howto: '黒魔道士: ファイガでアストラルファイア、ファイジャを撃ち、MP がなくなる前にデスペア → フレアスター。ブリザガでアンブラルブリザード、ブリザジャでハート 3 つ、パラドックスのあと ファイガで戻る。ハイサンダーを切らさず、ポリグロットはゼノグロシーで。',
        gaugeUI: (D) => window.MockGauge2.create(D.gauge, 'BLM'),
        gaugeDefault: { JobHudBLM0: { x: 70, y: 62, anchor: 4, scale: 1 }, JobHudBLM1: { x: 78, y: 62, anchor: 4, scale: 1 } },
      };
      return J;
    },
  };

  // ---------------- 吟遊詩人 ----------------
  // 説明文から:
  //   歌（旅神のメヌエット・賢人のバラード・軍神のパイオン）: 45 秒。歌っている間「詩心」が継続的に付く（発動確率 80%）。歌うと「〜のコーダ」
  //     メヌエットの詩心: ピッチパーフェクト（詩心 1/2/3 で威力 100/220/360。最大 3）
  //     バラードの詩心: ハートブレイクショット（レイン・オブ・デス）のリキャスト −7.5 秒
  //     パイオンの詩心: ウェポンスキルのリキャスト 4% 短縮（最大 4）
  //   エンピリアルアロー: 歌っていれば詩心が付く。エイペックスアロー: ソウルボイス 20 以上。威力 140〜700（消費量が多いほど）、80 以上でブラストアロー実行可
  //   ホークアイ（バーストショット・コースティックバイト・ストームバイト・アイアンジョー 35%）でリフルジェントアロー。
  //   乱れ撃ち: リフルジェントアローが 3 回分のダメージ＋レゾナンスアロー実行可。アイアンジョー: 2 つの継続ダメージを付け直す
  //   光神のフィナーレ: コーダの種類 1/2/3 で与ダメージ 2/4/6%（20 秒）＋光神のアンコール実行可（威力 700/800/1100）
  // 仮（説明文に数値がない: GAME-69）: 詩心の判定は 3 秒ごと。詩心 1 回でソウルボイス +5（最大 100）。継続ダメージは 3 秒ごと。
  //   ダイレクトヒット・クリティカル（バトルボイス・旅神のメヌエット・軍神のパイオンの発動率）は計算しない
  const BRD = {
    abbr: 'BRD',
    create(R) {
      const { A } = R;
      const ID = {
        BURST: 16495, REFULGENT: 7409, CAUSTIC: 7406, STORM: 7407, IRONJAWS: 3560, APEX: 16496, BLAST: 25784, WM: 3559, MB: 114, AP: 116,
        PITCH: 7404, EMPYREAL: 3558, SIDEWINDER: 3562, HEARTBREAK: 36975, RAIN: 117, RAGING: 101, BARRAGE: 107, BV: 118, FINALE: 25785,
        RESONANT: 36976, ENCORE: 36977, LADON: 25783, SHADOWBITE: 16494, TROUBADOUR: 7405, MINNE: 7408,
      };
      const SONGS = { [ID.WM]: 'wm', [ID.MB]: 'mb', [ID.AP]: 'ap' };
      const SONG_NAME = { wm: '旅神のメヌエット', mb: '賢人のバラード', ap: '軍神のパイオン' };
      const DOTS = { [ID.CAUSTIC]: 'caustic', [ID.STORM]: 'storm' };
      const STATUS = {
        caustic: { name: 'コースティックバイト', target: true, tracked: true },
        storm: { name: 'ストームバイト', target: true, tracked: true },
        hawk: { name: 'ホークアイ' },
        raging: { name: '猛者の撃', tracked: true },
        barrage: { name: '乱れ撃ち' },
        bv: { name: 'バトルボイス' },
        finale: { name: '光神のフィナーレ' },
        resonantReady: { name: 'レゾナンスアロー実行可' },
        encoreReady: { name: '光神のアンコール実行可' },
        blastReady: { name: 'ブラストアロー実行可' },
        wm: { name: '旅神のメヌエット' },
        mb: { name: '賢人のバラード' },
        ap: { name: '軍神のパイオン' },
        troubadour: { name: 'トルバドゥール' },
        minne: { name: '地神のミンネ' },
        ethos: { name: '軍神の加護' },
        muse: { name: '軍神の契約' },
      };
      const S = () => R.S;
      const has = R.has;
      const Au = () => window.MockAudio;
      const SONG_MS = 45000, TICK = 3000;
      const hawkProc = (id) => (id === ID.BURST || id === ID.CAUSTIC || id === ID.STORM || id === ID.IRONJAWS || id === ID.LADON ? 0.35 : 0);
      // 詩心（歌の継続的な効果・エンピリアルアロー）
      function repertoire(why) {
        const s = S(), song = s.song?.k;
        if (!song) return;
        if (s.sv >= 100) s.stats.svOver += 5;
        s.sv = Math.min(100, s.sv + 5);
        if (song === 'wm') { if (s.rep >= 3) { s.stats.repOver++; R.addLog('warn', '詩心があふれました（ピッチパーフェクトを 3 で撃つ）'); } s.rep = Math.min(3, s.rep + 1); }
        if (song === 'ap') s.rep = Math.min(4, s.rep + 1);
        if (song === 'mb') R.cdShift(ID.HEARTBREAK, 7500);
        void why;
      }
      // 軍神のパイオン効果アップ（特性）: 詩心 1/2/3/4 で 1/2/4/12% のヘイスト
      const ETHOS = [0, 1, 2, 4, 12];
      // 歌の終わり。next: 次に歌う歌（時間切れなら null）
      function endSong(next) {
        const s = S();
        if (!s.song) return;
        // パイオン中（詩心あり）に別の歌を歌う → 軍神の加護（10 秒）。歌わずに時間切れ → 軍神の契約（30 秒。次の歌で加護）
        if (s.song.k === 'ap' && s.rep > 0) {
          s.ethosPct = ETHOS[Math.min(4, s.rep)];
          if (next) R.buff('ethos', 10000); else R.buff('muse', 30000);
        }
        R.remove(s.song.k); s.song = null; s.rep = 0;
      }
      const J = {
        ids: ID, STATUS,
        charges: descCharges(A), // ハートブレイクショット「最大チャージ数：3」
        prepull: new Set([ID.RAGING, ID.BV]),
        comboStarters: new Set(),
        procStatus: {},
        dot: { key: 'caustic' },
        ownDots: true, // 継続ダメージが 2 つ（コースティックバイト・ストームバイト）なので自分で持つ
        initState(s) { s.song = null; s.rep = 0; s.sv = 0; s.codas = { wm: false, mb: false, ap: false }; s.encore = 0; s.dots = {}; s.songT = 0; s.stats.repOver = 0; s.stats.svOver = 0; s.stats.hawkLost = 0; },
        gaugeCols: [['歌', (s) => s.song?.k ?? ''], ['詩心', (s) => s.rep], ['ソウルボイス', (s) => s.sv], ['コーダ', (s) => Object.entries(s.codas).filter(([, v]) => v).map(([k]) => k).join('/')]],
        tracked: [['コースティックバイト', 'caustic', '#c8f0a0', 'アイアンジョーで 2 つまとめて付け直す'], ['ストームバイト', 'storm', '#a0e0ff', ''], ['猛者の撃', 'raging', '#ffb080', '120 秒ごと']],
        // 軍神のパイオンの詩心: ウェポンスキルのリキャスト 4% × 詩心
        speed: (a) => (a && a.isGcd ? (S().song?.k === 'ap' ? 1 - 0.04 * S().rep : 1) * (has('ethos') ? 1 - (S().ethosPct ?? 0) / 100 : 1) : 1),
        comboFree: () => false,
        // 旅神のメヌエットを歌っている間は、メヌエットのボタンがピッチパーフェクトに変わる
        resolve: (id) => (id === ID.WM && S().song?.k === 'wm' ? ID.PITCH : tooltipResolve(R, J, id)),
        blocked(id) {
          const s = S();
          if ((id === ID.REFULGENT || id === ID.SHADOWBITE) && !has('hawk') && !has('barrage')) return '「ホークアイ」か「乱れ撃ち」の効果中ではありません';
          if (id === ID.PITCH && (s.song?.k !== 'wm' || s.rep < 1)) return '旅神のメヌエットの詩心がありません';
          if (id === ID.APEX && s.sv < 20) return `ソウルボイスが足りません（必要 20 / 現在 ${s.sv}）`;
          if (id === ID.BLAST && !has('blastReady')) return '「ブラストアロー実行可」の効果中ではありません';
          if (id === ID.RESONANT && !has('resonantReady')) return '「レゾナンスアロー実行可」の効果中ではありません';
          if (id === ID.ENCORE && !has('encoreReady')) return '「光神のアンコール実行可」の効果中ではありません';
          if (id === ID.FINALE && !Object.values(s.codas).some(Boolean)) return 'コーダシンボルがありません（歌うと付く）';
          if (SONGS[id] && s.phase !== 'combat') return '戦闘中ではありません';
          return null;
        },
        castMs: () => 0,
        // 威力が状態で変わる技（説明文）
        potOverride(a) {
          const s = S();
          if (a.id === ID.PITCH) return [0, 100, 220, 360][s.rep] ?? 0;
          if (a.id === ID.APEX) return Math.round(140 + (Math.max(20, s.sv) - 20) / 80 * 560);
          if (a.id === ID.ENCORE) return [0, 700, 800, 1100][s.encore] ?? 700;
          if (a.id === ID.REFULGENT && has('barrage')) return (a.pot?.base ?? 280) * 3; // 乱れ撃ち: 3 回分のダメージ
          if (a.id === ID.SHADOWBITE && has('barrage')) return 300;
          return null;
        },
        dmgMult: () => (has('finale') ? 1 + S().finalePct / 100 : 1),
        effects(id) {
          const a = A[id], s = S();
          tooltipEffects(R, J, a, true, {});
          // ホークアイ（リフルジェントアロー・シャドウバイトは、ホークアイがあれば使い、なければ乱れ撃ちを使う）
          if (id === ID.REFULGENT || id === ID.SHADOWBITE) { if (has('barrage')) R.remove('barrage'); else R.remove('hawk'); }
          const pr = hawkProc(id);
          if (pr && Math.random() < pr) { if (has('hawk')) s.stats.hawkLost++; R.buff('hawk', 30000); }
          // 継続ダメージ（付けたときの与ダメージ上昇で計算）
          if (DOTS[id]) { const k = DOTS[id]; s.dots[k] = { until: s.t + a.pot.dot.sec * 1000, next: s.t + TICK, potency: a.pot.dot.potency, mult: R.mult, name: a.name }; R.buff(k, a.pot.dot.sec * 1000); }
          if (id === ID.IRONJAWS) for (const k of ['caustic', 'storm']) if (s.dots[k] && s.dots[k].until > s.t) { const d = A[k === 'caustic' ? ID.CAUSTIC : ID.STORM].pot.dot; s.dots[k].until = s.t + d.sec * 1000; s.dots[k].mult = R.mult; R.buff(k, d.sec * 1000); }
          // 歌
          if (SONGS[id]) {
            endSong(SONGS[id]);
            if (has('muse')) { R.remove('muse'); R.buff('ethos', 10000); }
            const k = SONGS[id];
            s.song = { k, until: s.t + SONG_MS }; s.songT = 0; s.codas[k] = true; s.rep = 0;
            R.buff(k, SONG_MS);
            Au()?.surge();
          }
          if (id === ID.EMPYREAL) repertoire('エンピリアルアロー');
          if (id === ID.PITCH) s.rep = 0;
          if (id === ID.APEX) { if (s.sv >= 80) R.buff('blastReady', 10000); s.sv = 0; }
          if (id === ID.BLAST) R.remove('blastReady');
          if (id === ID.BARRAGE) { R.buff('barrage', 10000); R.buff('resonantReady', 30000); }
          if (id === ID.RESONANT) R.remove('resonantReady');
          if (id === ID.FINALE) {
            const n = Object.values(s.codas).filter(Boolean).length;
            s.finalePct = [0, 2, 4, 6][n]; s.encore = n; s.codas = { wm: false, mb: false, ap: false };
            R.buff('finale', 20000); R.buff('encoreReady', 30000);
            R.addLog('ok', `光神のフィナーレ: コーダ ${n} 種類（与ダメージ ${s.finalePct}%）`);
          }
          if (id === ID.ENCORE) R.remove('encoreReady');
          if (id === ID.BV) R.buff('bv', 20000);
          if (id === ID.TROUBADOUR) { R.mitigate('party', 0.15, 15, a.name); R.buff('troubadour', 15000); }
          if (id === ID.MINNE) { R.mark('party', a.name, 15, { healUp: 0.15 }); R.buff('minne', 15000); }
        },
        tick(dt) {
          const s = S();
          // 継続ダメージ
          for (const k of Object.keys(s.dots)) {
            const d = s.dots[k];
            while (d.next <= s.t && d.next <= d.until) { d.next += TICK; if (s.phase === 'combat') R.dotTick(d.potency, d.mult, d.name); }
            if (d.until < s.t) delete s.dots[k];
          }
          // 歌の終わりと詩心（3 秒ごとに 80%）
          if (s.song) {
            if (s.t >= s.song.until) { R.addLog('sys', `${SONG_NAME[s.song.k]}が終わりました`); endSong(null); return; }
            s.songT += dt;
            while (s.songT >= TICK) { s.songT -= TICK; if (Math.random() < 0.8) repertoire('歌'); }
          }
        },
        highlightOk: () => true,
        glow(id) {
          const s = S();
          if (id === ID.REFULGENT || id === ID.SHADOWBITE) return has('hawk') || has('barrage');
          if (id === ID.PITCH) return s.song?.k === 'wm' && s.rep >= 3;
          if (id === ID.APEX) return s.sv >= 80;
          if (id === ID.BLAST) return has('blastReady');
          if (id === ID.RESONANT) return has('resonantReady');
          if (id === ID.ENCORE) return has('encoreReady');
          if (id === ID.IRONJAWS) return ['caustic', 'storm'].some((k) => s.dots[k] && s.dots[k].until - s.t < 6000);
          return false;
        },
        guide: () => null,
        positional: () => null,
        fxColor: (id) => (id === ID.APEX || id === ID.BLAST ? 'namikiri' : id === ID.CAUSTIC ? 'shoha' : id === ID.STORM ? 'setsu' : id === ID.ENCORE || id === ID.FINALE ? 'holy' : id === ID.REFULGENT || id === ID.RESONANT ? 'iai' : 'steel'),
        fxPower: (id) => (id === ID.BLAST || id === ID.ENCORE || id === ID.RESONANT ? 1.5 : 1),
        fxCount: () => 1,
        castColor: () => 'steel',
        castPower: 0.4,
        gcdColor: (id) => (id === ID.REFULGENT ? '#ffe08a' : id === ID.APEX || id === ID.BLAST ? '#8ff0ff' : id === ID.IRONJAWS ? '#c8f0a0' : null),
        hotOgcd: (id) => id === ID.PITCH || id === ID.EMPYREAL || id === ID.HEARTBREAK || id === ID.SIDEWINDER,
        sfx(id, info, Au) {
          if (info.kind === 'buff') { if (SONGS[id] || id === ID.FINALE) Au.surge(); else Au.buff(); return; }
          Au.finisher(id === ID.APEX || id === ID.BLAST ? 'setsu' : 'getsu'); Au.hit(info.power);
        },
        tipCost: (id) => (id === ID.APEX ? ['ソウルボイス', 20] : null),
        report(s) {
          const issues = [], metrics = [], goods = [];
          if (s.stats.repOver) issues.push({ loss: s.stats.repOver * 2, rate: s.stats.repOver > 2 ? 'bad' : 'ok', title: `詩心のあふれ ${s.stats.repOver} 回`, advice: 'メヌエット中は詩心 3 でピッチパーフェクトを撃つ' });
          if (s.stats.svOver) issues.push({ loss: Math.round(s.stats.svOver / 5), rate: s.stats.svOver > 20 ? 'bad' : 'ok', title: `ソウルボイスのあふれ ${s.stats.svOver}`, advice: '100 になる前にエイペックスアロー（80 以上ならブラストアローも）' });
          if (s.stats.hawkLost) issues.push({ loss: s.stats.hawkLost * 2, rate: 'ok', title: `ホークアイの上書き ${s.stats.hawkLost} 回`, advice: 'ホークアイが付いたら、次の GCD でリフルジェントアロー' });
          metrics.push({ label: '詩心のあふれ', value: `${s.stats.repOver} 回`, rate: Math.max(0, 100 - s.stats.repOver * 20) });
          if (!s.stats.repOver && s.stats.gcds > 10) goods.push('詩心のあふれなし');
          return { issues, metrics, goods, overPct: Math.max(0, 100 - s.stats.repOver * 10 - s.stats.svOver), posAdvice: '', comboAdvice: '光っている技（リフルジェントアロー・ピッチパーフェクト 3・アイアンジョー）を', castAdvice: '', rangeAdvice: '射程（25m）の中にいる' };
        },
        howto: '吟遊詩人: 旅神のメヌエット → 賢人のバラード → 軍神のパイオンの順に歌う。バーストショットを撃ち、ホークアイ（光る）でリフルジェントアロー。2 つの毒はアイアンジョーでまとめて付け直す。メヌエットの詩心 3 でピッチパーフェクト、ソウルボイス 80 以上でエイペックスアロー → ブラストアロー。',
        gaugeUI: (D) => window.MockGauge2.create(D.gauge, 'BRD'),
        gaugeDefault: { JobHudBRD0: { x: 70, y: 66, anchor: 4, scale: 1 } },
      };
      return J;
    },
  };

  window.MockJobs = { SAM, PLD, WHM, AST, BLM, BRD };
})();
