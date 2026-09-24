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
        charges: {},
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
      const ID = { GLARE3: 25859, GLARE4: 37009, DIA: 16532, ASSIZE: 3571, POM: 136, MISERY: 16535, SOLACE: 16531, RAPTURE: 16534, SWIFT: 7561, HOLY3: 25860, THIN: 7430, TEMPERANCE: 16536, CARESS: 37011, LILYBELL: 25862, RAISE: 125, ASYLUM: 3569 };
      const STATUS = {
        pom: { name: '神速魔', tracked: true },
        glare4: { name: 'グレアジャ実行可', sid: 3879 },
        swift: { name: '迅速魔' },
        dia: { name: 'ディア', target: true, tracked: true },
        temperance: { name: 'テンパランス' },
        caressReady: { name: 'ディヴァインカレス実行可' },
        lilybell: { name: 'リタージー・オブ・ベル' },
        surecast: { name: '堅実魔' },
      };
      const S = () => R.S;
      const has = R.has;
      const gauges = {
        ヒーリングリリー: { get: () => S().lily, set: (v) => { S().lily = Math.max(0, Math.min(3, v)); }, max: 3 },
        ブラッドリリー: { get: () => S().blood, set: (v) => { S().blood = Math.max(0, Math.min(3, v)); }, max: 3 },
      };
      const isSpell = (a) => a.category === 2;
      const HEAL_K = 0.00025; // 回復力 1 = 最大 HP の 0.025%（仮 DESIGN-06）
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
        charges: {},
        prepull: new Set([ID.SWIFT]),
        comboStarters: new Set(),
        procStatus: { 181: 'glare4', 182: 'caressReady' },
        dot: { key: 'dia' },
        initState(s) { s.lily = 0; s.blood = 0; s.lilyT = 0; s.stats.lilyOver = 0; s.bell = 0; s.bellNext = 0; },
        // リタージー・オブ・ベルの効果時間中の再使用（残りのスタックで回復して消える）は、リキャストを待たずに使える（説明文「効果時間中に再使用すると」）
        freeUse: (id) => id === ID.LILYBELL && S().bell > 0,
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
          // 回復（パーティ）
          const e = a.eff;
          if (e?.heal != null) {
            const frac = e.heal === 'full' ? 1 : e.heal * HEAL_K;
            R.heal(e.party ? 'party' : 'low', frac);
          }
          if (id === ID.ASYLUM) {
            // アサイラム: 地面に回復の範囲を置く（範囲は抽出データの effectRange。3 秒ごとに中の味方を回復）
            R.zone('asylum', { r: a.effectRange || 15, sec: e.hot.sec, frac: e.hot.potency * HEAL_K });
            Au()?.water();
          } else if (e?.hot) R.hot(e.party ? 'party' : 'low', e.hot.potency * HEAL_K, e.hot.sec);
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
        castColor: () => 'holy',
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

  window.MockJobs = { SAM, PLD, WHM };
})();
