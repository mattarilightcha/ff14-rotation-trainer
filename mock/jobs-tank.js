// ジョブの決まり（タンク: 戦士・暗黒騎士・ガンブレイカー）。書き方は jobs.js と同じ（create(R) で作る。R は mock.js が渡す道具）。
// 共通の部品（説明文の効果を読む tooltipEffects など）は jobs.js の window.MockJobs.lib。
// 値は説明文（抽出データの description と、build-mock-data.mjs が読み取った eff / pot）から。説明文にない決まりは「仮」と書き、docs/SPEC.md §10 に載せる。
(function () {
  'use strict';
  const { byName, tooltipEffects, tooltipBlocked, tooltipResolve, HEAL_K, descCharges, descGain, extendBuff, support } = window.MockJobs.lib;

  // タンクのスタンス（ディフェンダーなど）: 説明文「再使用で解除する。効果時間：永続」
  const toggleStance = (R, k) => { if (R.has(k)) R.remove(k); else R.buff(k, 1e9); };

  // ---------------- 戦士 ----------------
  // 説明文から:
  //   インナービースト: メイム +10・シュトルムヴィント +20・シュトルムブレハ +10・ミスリルテンペスト +20（コンボ時）、ウォークライ +50。
  //     フェルクリーヴ・デシメートは 50 を使う。原初の解放（3 スタック）の間はゲージを使わずに撃てる
  //   戦嵐（与ダメージ 10%）: シュトルムブレハ・ミスリルテンペストで 30 秒。付いていれば 30 秒延長（最大 60 秒）。原初の解放で 10 秒延長
  //   原初の解放: 原初の解放 3・原初の覚悟（15 秒）・プライマルレンド実行可（30 秒）。効果中にフェルクリーヴ / デシメートを当てると原初の鼓動（最大 3、30 秒）。
  //     3 つで原初の激震実行可になり、原初の解放が原初の激震に変わる。プライマルレンドでルイネーター実行可（20 秒）
  //   ウォークライ: 原初の混沌（30 秒）。混沌中かつインナービースト 50 以上で、フェルクリーヴがインナーカオス・デシメートがカオティックサイクロンに。
  //     インナーカオス / カオティックサイクロンはウォークライのリキャストを 5 秒縮める
  //   原初の血気 / 原初の猛り: 被ダメージ 10%（8 秒）・原初の血潮 10%（4 秒）・原初の血煙（バリア 回復力 400・20 秒）。効果中、ウェポンスキルが当たるたびに回復力 400
  //   ダムネーション: 被ダメージ 40%（15 秒）。物理攻撃を受けると反撃（威力 55）。ダメージを受けるか時間切れで ダムネーション［被］（継続回復 回復力 300・15 秒）
  //   シェイクオフ: バリア（最大 HP の 15%）。スリル・オブ・バトル・ダムネーション・原初の血気を解除し、1 つにつき +2%
  // 仮（説明文にない: GAME-72）: インナービーストの上限は 100（あふれは数える）。インナーカオス / カオティックサイクロンもインナービースト 50 を使う（発動条件の 50）。
  //   原初の激震実行可の効果時間は 30 秒（原初の鼓動の効果時間のまま）。ホルムギャング（HP が 1 より減らない）は、練習では被ダメージ 100% 軽減とみなす
  const WAR = {
    abbr: 'WAR',
    create(R) {
      const { A } = R;
      const ID = {
        HEAVY: 31, MAIM: 37, PATH: 42, EYE: 45, OVERPOWER: 41, TEMPEST: 16462, FELL: 3549, DECIMATE: 3550, CHAOS: 16465, CYCLONE: 16463,
        INFURIATE: 52, IR: 7389, WRATH: 36924, REND: 25753, RUIN: 36925, UPHEAVAL: 7387, OROGENY: 25752, ONSLAUGHT: 7386, TOMAHAWK: 46,
        DEFIANCE: 48, THRILL: 40, HOLMGANG: 43, EQUI: 3552, SHAKE: 7388, BLOOD: 25751, NASCENT: 16464, DAMNATION: 36923, RAMPART: 7531,
      };
      const STATUS = {
        surging: { name: '戦嵐', tracked: true },
        ir: { name: '原初の解放' },
        irGuard: { name: '原初の覚悟' },
        rendReady: { name: 'プライマルレンド実行可' },
        fury: { name: '原初の鼓動' },
        wrathful: { name: '原初の激震実行可' },
        ruinReady: { name: 'ルイネーター実行可' },
        chaos: { name: '原初の混沌' },
        defiance: { name: 'ディフェンダー' },
        blood: { name: '原初の血気' },
        bloodSurge: { name: '原初の血潮' },
        nascent: { name: '原初の猛り' },
        thrill: { name: 'スリル・オブ・バトル' },
        holmgang: { name: 'ホルムギャング' },
        damnation: { name: 'ダムネーション' },
        rampart: { name: 'ランパート' },
      };
      const S = () => R.S;
      const has = R.has;
      const BEAST_MAX = 100; // 仮（GAME-72）
      const IR_SPENDERS = new Set([ID.FELL, ID.DECIMATE]);
      const CHAOS_OF = { [ID.FELL]: ID.CHAOS, [ID.DECIMATE]: ID.CYCLONE };
      const isWs = (a) => a.category === 3;
      function beast(n) {
        const s = S(), v = s.beast + n;
        if (v > BEAST_MAX) {
          const over = v - BEAST_MAX;
          s.stats.beastOver += over;
          R.addLog('warn', `インナービーストが ${over} あふれました`);
          R.ev('ミス', { result: 'あふれ', note: `インナービーストが ${over} あふれた` });
        }
        s.beast = Math.max(0, Math.min(BEAST_MAX, v));
      }
      const gauges = { インナービースト: { get: () => S().beast, set: (v) => { S().beast = Math.max(0, Math.min(BEAST_MAX, v)); }, max: BEAST_MAX } };
      // 戦嵐の付与と延長（シュトルムブレハ・ミスリルテンペストのコンボ時: 30 秒、付いていれば 30 秒延長・最大 60 秒）
      const surging = (addMs) => extendBuff(R, 'surging', 30000, 60000, addMs);
      const J = {
        ids: ID, STATUS,
        charges: descCharges(A), // オンスロート「最大チャージ数：3」（シートの基本値は 2）・ウォークライ 2
        prepull: new Set([ID.DEFIANCE]), // タンクのスタンスは戦闘前に入れる（自己バフのため仮で許可: GAME-30）
        comboStarters: new Set([ID.HEAVY, ID.OVERPOWER]),
        // 光る条件: ActionProcStatus の行 → ステータス（61 プライマルレンド・152 原初の激震・153 ルイネーター・189 インナーカオス / カオティックサイクロン）
        procStatus: { 61: 'rendReady', 152: 'wrathful', 153: 'ruinReady', 189: 'chaos' },
        initState(s) { s.beast = 0; s.damn = null; s.stats.beastOver = 0; s.stats.irFell = 0; s.stats.wrath = 0; },
        gaugeCols: [['インナービースト', (s) => s.beast]],
        tracked: [['戦嵐', 'surging', '#ff9a5a', '切れる前にシュトルムブレハ（最大 60 秒まで延長できる）']],
        speed: () => 1,
        comboFree: () => false,
        resolve(id) {
          // 原初の混沌の間、インナービースト 50 以上でフェルクリーヴ → インナーカオス、デシメート → カオティックサイクロン（説明文）
          if (CHAOS_OF[id] && has('chaos') && S().beast >= 50) return CHAOS_OF[id];
          if (CHAOS_OF[id]) return id;
          return tooltipResolve(R, J, id);
        },
        blocked(id) {
          const s = S(), a = A[id];
          if (IR_SPENDERS.has(id) && !has('ir') && s.beast < 50) return `インナービーストが足りません（必要 50 / 現在 ${s.beast}）`;
          if (IR_SPENDERS.has(id)) return null;
          if ((id === ID.CHAOS || id === ID.CYCLONE) && (!has('chaos') || s.beast < 50)) return !has('chaos') ? '「原初の混沌」の効果中ではありません' : `インナービーストが足りません（必要 50 / 現在 ${s.beast}）`;
          if (id === ID.REND && !has('rendReady')) return '「プライマルレンド実行可」の効果中ではありません';
          if (id === ID.INFURIATE && s.phase !== 'combat') return '戦闘中のみ使えます';
          return tooltipBlocked(R, J, a, gauges);
        },
        castMs: (a, base) => base,
        effects(id, ok) {
          const a = A[id], s = S();
          const irUse = IR_SPENDERS.has(id) && has('ir');
          // 説明文の効果: 発動条件のステータスを使う・付与（原初の解放・原初の混沌・ルイネーター実行可など）・ゲージの消費（原初の解放の間は使わない）。
          // 戦嵐は付与ではなく延長の決まりがあるので、ここでは除いて下で付ける
          const eff = a.eff?.grant ? { ...a, eff: { ...a.eff, grant: a.eff.grant.filter((g) => g.status !== '戦嵐') } } : a;
          tooltipEffects(R, J, eff, ok, irUse ? {} : gauges);
          // 戦嵐: シュトルムブレハ・ミスリルテンペストのコンボ時（説明文「既に付与されている場合は、その効果時間を30秒延長する。最大60秒まで」）
          if ((id === ID.EYE || id === ID.TEMPEST) && ok) surging(30000);
          beast(descGain(a, 'インナービースト', ok));
          if (id === ID.CHAOS || id === ID.CYCLONE) { gauges.インナービースト.set(s.beast - 50); R.cdShift(ID.INFURIATE, 5000); } // 仮（GAME-72）・説明文
          if (irUse) {
            // 原初の解放のスタックを使い、原初の鼓動を 1 つ足す。3 つで原初の激震実行可（説明文）
            const st = s.st.ir; if (st.stacks > 1) st.stacks -= 1; else R.remove('ir');
            s.stats.irFell++;
            const n = (has('fury') ? s.st.fury.stacks ?? 1 : 0) + 1;
            if (n >= 3) { R.remove('fury'); R.buff('wrathful', 30000); R.addLog('ok', '原初の激震実行可（原初の解放が原初の激震に変わりました）'); } // 効果時間は仮（GAME-72）
            else R.buff('fury', 30000, n);
          }
          if (id === ID.IR && has('surging')) extendBuff(R, 'surging', 0, 60000, 10000); // 原初の解放「戦嵐の効果時間を10秒延長する」（付いていなければ何もしない）
          if (id === ID.REND) R.remove('rendReady'); // 発動条件「プライマルレンド実行可」効果中（使うと消える）
          if (id === ID.WRATH) s.stats.wrath++;
          // シュトルムヴィント「コンボボーナス：自身のＨＰを回復する。回復力：250」
          if (ok && a.eff?.heal > 0 && /コンボボーナス：自身のＨＰを回復/.test(a.desc)) R.heal('self', a.eff.heal * HEAL_K);
          // 防御: 説明文の被ダメージ軽減・バリア・回復（原初の血潮は 4 秒・バリアの書き方が「バリア量：回復力N相当」なので、ここで読む）
          const barrier = Number(/バリア量：回復力(\d+)相当/.exec(a.desc)?.[1] ?? 0);
          if (id === ID.BLOOD) {
            R.mitigate('self', 0.1, 8, '原初の血気'); R.mitigate('self', 0.1, 4, '原初の血潮'); R.shield('self', barrier * HEAL_K, 20, '原初の血煙');
            R.buff('blood', 8000);
          }
          if (id === ID.NASCENT) {
            const who = R.who ?? 'npc';
            R.buff('nascent', 8000);
            R.mitigate(who, 0.1, 8, '原初の猛り［被］'); R.mitigate(who, 0.1, 4, '原初の血潮'); R.shield(who, barrier * HEAL_K, 20, '原初の血煙');
          }
          if (id === ID.THRILL) { R.heal('self', 0.2); R.buff('thrill', 10000); } // 最大 HP の 20% を回復（最大 HP の上昇は練習では入れない）
          if (id === ID.HOLMGANG) { R.mitigate('self', 1, 10, 'ホルムギャング'); R.buff('holmgang', 10000); } // 仮（GAME-72）
          if (id === ID.DAMNATION) { R.mitigate('self', 0.4, 15, 'ダムネーション'); R.buff('damnation', 15000); s.damn = { hot: false }; }
          if (id === ID.RAMPART) { support(R, a); R.buff('rampart', 20000); }
          if (id === ID.EQUI) support(R, a);
          if (id === ID.SHAKE) {
            // 解除したステータス 1 つにつき、バリアを最大 HP の 2% ずつ上乗せ（説明文）
            const n = ['thrill', 'damnation', 'blood'].filter((k) => has(k)).length;
            for (const k of ['thrill', 'damnation', 'blood']) R.remove(k);
            support(R, a);
            if (n) R.shield('party', (15 + 2 * n) / 100, 30, 'シェイクオフ');
          }
          if (id === ID.DEFIANCE) toggleStance(R, 'defiance');
          // 原初の血気・原初の猛りの効果中は、ウェポンスキルが当たるたびに回復（回復力 400。原初の猛りは相手も同じ量）
          if (isWs(a) && (has('blood') || has('nascent'))) {
            R.heal('self', 400 * HEAL_K);
            if (has('nascent')) R.heal('npc', 400 * HEAL_K);
          }
        },
        tick() {
          const s = S();
          // ダムネーション［被］: ダメージを受けずに効果時間が過ぎたとき（受けたときは onHurt で付けている）
          if (s.damn && !has('damnation')) {
            if (!s.damn.hot) R.hot('self', 300 * HEAL_K, 15, 'ダムネーション［被］');
            s.damn = null;
          }
        },
        // 自分がダメージを受けたとき: ダムネーションの反撃（威力 55）と、最初の 1 回でダムネーション［被］（継続回復 回復力 300・15 秒）
        onHurt() {
          const s = S();
          if (!has('damnation')) return;
          R.hit(A[ID.DAMNATION]?.pot?.base ?? 55, 'ダムネーション');
          if (s.damn && !s.damn.hot) { s.damn.hot = true; R.hot('self', 300 * HEAL_K, 15, 'ダムネーション［被］'); }
        },
        highlightOk: (id, st) => st !== 'chaos' || S().beast >= 50,
        guide: () => null,
        positional: () => null,
        fxColor: (id) => ([ID.FELL, ID.DECIMATE, ID.CHAOS, ID.CYCLONE, ID.UPHEAVAL, ID.OROGENY].includes(id) ? 'blood' : [ID.REND, ID.RUIN, ID.WRATH, ID.IR, ID.INFURIATE].includes(id) ? 'kenki' : id === ID.EYE ? 'kenki' : 'steel'),
        fxPower: (id, a, ok) => ([ID.CHAOS, ID.CYCLONE, ID.REND, ID.RUIN, ID.WRATH].includes(id) ? 1.5 : IR_SPENDERS.has(id) ? 1.25 : ok && a.comboFrom.length ? 1.15 : 1),
        fxCount: () => 1,
        castColor: () => 'kenki',
        gcdColor: (id) => (id === ID.CHAOS || id === ID.CYCLONE ? '#ff3b3b' : IR_SPENDERS.has(id) ? '#ff7a6a' : id === ID.REND || id === ID.RUIN ? '#ffb45a' : id === ID.EYE ? '#ffd27a' : null),
        hotOgcd: (id) => [ID.UPHEAVAL, ID.OROGENY, ID.WRATH, ID.INFURIATE, ID.IR].includes(id),
        // 効果音: 斧の斬撃。原初の解放・ウォークライは自分の強化
        weapon: 'slash',
        sfxKind: (id) => (id === ID.IR || id === ID.INFURIATE ? { g: 'boost', v: 'self' } : null),
        tipCost: (id) => (IR_SPENDERS.has(id) ? ['インナービースト', has('ir') ? '0（原初の解放）' : 50] : id === ID.CHAOS || id === ID.CYCLONE ? ['インナービースト', 50] : null),
        report(s) {
          const issues = [], metrics = [], goods = [];
          if (s.stats.beastOver) issues.push({ loss: Math.min(100, s.stats.beastOver * 2) * 0.1, rate: s.stats.beastOver > 30 ? 'bad' : 'ok', title: `インナービーストが ${s.stats.beastOver} あふれた`, advice: '50 以上たまったらフェルクリーヴで使う。ウォークライ（+50）の前に使っておく' });
          metrics.push({ label: 'インナービーストのあふれ', value: `${s.stats.beastOver}`, rate: Math.max(0, 100 - s.stats.beastOver * 2) });
          metrics.push({ label: '原初の解放中のフェルクリーヴ・デシメート', value: `${s.stats.irFell} 回`, rate: null });
          metrics.push({ label: '原初の激震', value: `${s.stats.wrath} 回`, rate: null });
          if (!s.stats.beastOver && s.stats.gcds > 5) goods.push('インナービーストのあふれなし');
          return { issues, metrics, goods, overPct: Math.max(0, 100 - s.stats.beastOver * 2), posAdvice: '', castAdvice: '', rangeAdvice: '敵が動いたらすぐ追いかける。離れたらオンスロート・トマホーク', comboAdvice: 'ヘヴィスウィング → メイム → シュトルムブレハ / シュトルムヴィントの順に。フェルクリーヴや原初の解放の技はコンボを切らない' };
        },
        howto: '戦士: ヘヴィスウィング→メイム→シュトルムブレハ（戦嵐を切らさない）/シュトルムヴィント。インナービースト 50 でフェルクリーヴ。原初の解放の間はフェルクリーヴを 3 回（ゲージを使わない）→原初の激震、プライマルレンド→ルイネーター。ウォークライのあとはインナーカオス。あなたが敵を引きつけます。',
        gaugeUI: (D) => window.MockGauge2.create(D.gauge, 'WAR'),
        gaugeDefault: { JobHudWAR0: { x: 70, y: 66, anchor: 4, scale: 1 } },
      };
      return J;
    },
  };

  Object.assign(window.MockJobs, { WAR });
})();
