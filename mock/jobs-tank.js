// ジョブの決まり（タンク: 戦士・暗黒騎士・ガンブレイカー）。書き方は jobs.js と同じ（create(R) で作る。R は mock.js が渡す道具）。
// 共通の部品（説明文の効果を読む tooltipEffects など）は jobs.js の window.MockJobs.lib。
// 値は説明文（抽出データの description と、build-mock-data.mjs が読み取った eff / pot）から。説明文にない決まりは「仮」と書き、docs/SPEC.md §10 に載せる。
(function () {
  'use strict';
  const { tooltipEffects, tooltipBlocked, tooltipResolve, HEAL_K, descCharges, descGain, extendBuff, support, actorTickPhase, mpTicks, naturalMp } = window.MockJobs.lib;

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
            for (const name of ['ダムネーション', '原初の血気']) R.unmitigate('self', name); // 練習場に付けた軽減も外す（原初の血潮は別のステータスなので残る）
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
        // ダムネーションの威力 55 は反撃の分なので、使ったときには攻撃しない
        noHit: (id) => id === ID.DAMNATION,
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

  // ---------------- 暗黒騎士 ----------------
  // 説明文から:
  //   ブラックブラッド: ソウルイーター・ストルワートソウル +20（コンボ時）。ブラッドスピラー・クワイタスは 50 を使う
  //   暗黒（与ダメージ 10%）: 漆黒の剣 / 漆黒の波動で 30 秒。付いていれば 30 秒延長（最大 60 秒）。シャドウブリンガーは暗黒の間だけ
  //   漆黒の剣・漆黒の波動・ブラックナイトは MP 3000（Action の消費 MP）。ブラックナイトのバリア（最大 HP の 25%・7 秒）が全部吸収されると
  //     ダークアーツ（MP の代わりにダークアーツで漆黒の剣 / 漆黒の波動を出せる）
  //   ブラッドデリリアム: ブラッドデリリアム・ブラッドウェポン（3 スタック・15 秒）。ブラッドスピラーがレッドデリリアム → カマパンス → トアクリーバー、
  //     クワイタスがインペイルメントに変わる（スタックを 1 つ使う）。ブラッドウェポン: ウェポンスキル・魔法が当たると MP 回復とブラックブラッド +10
  //   影身具現: 英雄の影身が 22 秒戦う（攻撃の威力 420、シャドウブリンガー 570、ディセスティーム 620）＋ディセスティーム実行可（30 秒）
  //   ソルトアース: 足元の範囲（威力 50・15 秒）。ソルト・アンド・ダークはソルトアースの効果中に、範囲の中の敵へ（威力 500）
  //   シャドウヴィジル: 被ダメージ 40%（15 秒）＋シャドウヴィジル［被］（20 秒。HP 50% 未満か時間切れで回復力 1200）。アンメンドはシャドウストライドのリキャスト −5 秒
  // 仮（説明文にない: GAME-73）: ブラックブラッドの上限は 100。MP の回復量（サイフォンストライク・ストルワートソウルのコンボ時・カーヴ・アンド・スピット・
  //   アビサルドレイン・ブラッドウェポンは 600、レッドデリリアム以降とインペイルメントは 200）。ダークアーツは使うまで消えない。
  //   英雄の影身の攻撃は、具現から 3 秒後に始まり 2.2 秒ごとに 6 回（420・420・シャドウブリンガー 570・420・420・ディセスティーム 620）。
  //   リビングデッドは、練習では 10 秒間の被ダメージ 100% 軽減とみなす（HP が 0 にならないため）。ダークマインドは被物理（10%）、ダークミッショナリーは被魔法（10%）の値を使う
  const DRK = {
    abbr: 'DRK',
    create(R) {
      const { A } = R;
      const ID = {
        HARD: 3617, SYPHON: 3623, SOULEATER: 3632, UNLEASH: 3621, STALWART: 16468, UNMEND: 3624, GRIT: 3629, DARK_MIND: 3634, LIVING_DEAD: 3638,
        SALTED: 3639, DRAIN: 3641, CARVE: 3643, DELIRIUM: 7390, QUIETUS: 7391, SPILLER: 7392, TBN: 7393, RAMPART: 7531, EDGE: 16470, FLOOD: 16469,
        MISSIONARY: 16471, SHADOW: 16472, OBLATION: 25754, SALT_DARK: 25755, BRINGER: 25757, STRIDE: 36926, VIGIL: 36927,
        SCARLET: 36928, COMEUPPANCE: 36929, TORCLEAVER: 36930, IMPALEMENT: 36931, DISESTEEM: 36932,
      };
      const STATUS = {
        darkside: { name: '暗黒', tracked: true },
        darkArts: { name: 'ダークアーツ' },
        delirium: { name: 'ブラッドデリリアム' },
        bloodWeapon: { name: 'ブラッドウェポン' },
        grit: { name: 'グリットスタンス' },
        tbn: { name: 'ブラックナイト' },
        livingDead: { name: 'リビングデッド' },
        saltEarth: { name: 'ソルトアース' },
        disesteemReady: { name: 'ディセスティーム実行可' },
        vigil: { name: 'シャドウヴィジル' },
        vigilProc: { name: 'シャドウヴィジル［被］' },
        darkMind: { name: 'ダークマインド' },
        oblation: { name: 'オブレーション' },
        rampart: { name: 'ランパート' },
      };
      const S = () => R.S;
      const has = R.has;
      const MP_MAX = 10000, BLOOD_MAX = 100; // ブラックブラッドの上限は仮（GAME-73）
      const MP_GAIN = { [ID.SYPHON]: 600, [ID.STALWART]: 600, [ID.CARVE]: 600, [ID.DRAIN]: 600, [ID.SCARLET]: 200, [ID.COMEUPPANCE]: 200, [ID.TORCLEAVER]: 200, [ID.IMPALEMENT]: 200 }; // 仮（GAME-73）
      const COMBO_MP = new Set([ID.SYPHON, ID.STALWART]); // 「コンボボーナス：自身のＭＰを回復する」
      const BW_MP = 600; // ブラッドウェポンの MP 回復（仮 GAME-73）
      const BW_BLOOD = Number(/ブラッドウェポン効果：[^]*?「ブラックブラッド」を(\d+)上昇/.exec(A[ID.DELIRIUM]?.desc ?? '')?.[1] ?? 10); // ブラッドウェポンの「ブラックブラッド」を10上昇
      const DELIRIUM_OF = { [ID.SPILLER]: ID.SCARLET, [ID.QUIETUS]: ID.IMPALEMENT };
      const SHADOW_HITS = [[420, '英雄の影身'], [420, '英雄の影身'], [570, 'シャドウブリンガー（影身）'], [420, '英雄の影身'], [420, '英雄の影身'], [620, 'ディセスティーム（影身）']]; // 仮（GAME-73）
      const isSpell = (a) => a.category === 2;
      const isWs = (a) => a.category === 3;
      const mpCost = (a) => ((a.id === ID.EDGE || a.id === ID.FLOOD) && has('darkArts') ? 0 : a.mp ?? 0);
      function blood(n) {
        const s = S(), v = s.blood + n;
        if (v > BLOOD_MAX) {
          const over = v - BLOOD_MAX;
          s.stats.bloodOver += over;
          R.addLog('warn', `ブラックブラッドが ${over} あふれました`);
          R.ev('ミス', { result: 'あふれ', note: `ブラックブラッドが ${over} あふれた` });
        }
        s.blood = Math.max(0, Math.min(BLOOD_MAX, v));
      }
      const mp = (n) => { const s = S(); s.mp = Math.max(0, Math.min(MP_MAX, s.mp + n)); };
      const gauges = {
        ブラックブラッド: { get: () => S().blood, set: (v) => { S().blood = Math.max(0, Math.min(BLOOD_MAX, v)); }, max: BLOOD_MAX },
        // ブラッドデリリアムのスタック（説明文「発動条件：「ブラッドデリリアム」」= 1 つ使う）
        ブラッドデリリアム: { get: () => (has('delirium') ? S().st.delirium.stacks ?? 1 : 0), set: (v) => { if (v <= 0) R.remove('delirium'); else S().st.delirium.stacks = v; }, max: 3 },
      };
      const J = {
        ids: ID, STATUS,
        charges: descCharges(A), // シャドウストライド・オブレーション・シャドウブリンガー「最大チャージ数：2」
        prepull: new Set([ID.GRIT, ID.TBN]), // スタンスと自分へのバリアは戦闘前に入れる（自己バフのため仮で許可: GAME-30）
        comboStarters: new Set([ID.HARD, ID.UNLEASH]),
        // 光る条件: ActionProcStatus の行 → ステータス（54 ブラッドスピラー・クワイタス = ブラッドデリリアム、154 インペイルメント、155 ディセスティーム）
        procStatus: { 54: 'delirium', 154: 'delirium', 155: 'disesteemReady' },
        ownDots: true, // ソルトアースの範囲は自分で持つ
        initState(s) {
          s.mp = MP_MAX; s.mpTick = actorTickPhase(R); s.blood = 0; s.tbn = null; s.shadow = null; s.vigil = false; s.dots = {};
          s.stats.bloodOver = 0; s.stats.edges = 0; s.stats.darkArtsUsed = 0; s.stats.tbnBroken = 0; s.stats.delirium = 0;
        },
        gaugeCols: [['ブラックブラッド', (s) => s.blood], ['MP', (s) => Math.floor(s.mp)], ['暗黒（秒）', (s) => (s.st.darkside && s.st.darkside.until > s.t ? Math.ceil((s.st.darkside.until - s.t) / 1000) : 0)]],
        tracked: [['暗黒', 'darkside', '#b07aff', '切れる前に漆黒の剣（最大 60 秒まで延長できる）']],
        speed: () => 1,
        comboFree: () => false,
        resolve(id) {
          // ブラッドデリリアムの間: ブラッドスピラー → レッドデリリアム（→ カマパンス → トアクリーバー）、クワイタス → インペイルメント
          if (DELIRIUM_OF[id] && has('delirium')) { const t = tooltipResolve(R, J, id); return t !== id ? t : DELIRIUM_OF[id]; }
          if (DELIRIUM_OF[id]) return id;
          return tooltipResolve(R, J, id);
        },
        blocked(id) {
          const s = S(), a = A[id];
          if (!a) return null;
          if ((id === ID.EDGE || id === ID.FLOOD || id === ID.TBN) && s.mp < mpCost(a)) return `MP が足りません（必要 ${mpCost(a)} / 現在 ${Math.floor(s.mp)}）`;
          if (id === ID.SALT_DARK && !has('saltEarth')) return '「ソルトアース」の効果中ではありません';
          return tooltipBlocked(R, J, a, gauges);
        },
        castMs: (a, base) => base,
        effects(id, ok) {
          const a = A[id], s = S();
          // 説明文の効果（発動条件のステータス・付与・ゲージの消費）。暗黒は延長の決まりがあるので除いて下で付ける。
          // ブラックナイトのダークアーツは「バリアがダメージを完全に吸収して消滅すると」付くので除く（tick で付ける）。
          // シャドウブリンガー（暗黒の間）とソルト・アンド・ダーク（ソルトアースの間）は、発動条件のステータスを使わない
          const keep = id === ID.BRINGER || id === ID.SALT_DARK;
          const eff = a.eff ? { ...a, eff: { ...a.eff, grant: a.eff.grant?.filter((g) => g.status !== '暗黒' && g.status !== 'ダークアーツ'), requires: keep ? undefined : a.eff.requires } } : a;
          tooltipEffects(R, J, eff, ok, gauges);
          // MP
          const cost = mpCost(a);
          if ((id === ID.EDGE || id === ID.FLOOD) && has('darkArts')) { R.remove('darkArts'); s.stats.darkArtsUsed++; R.addLog('ok', 'ダークアーツを使いました（MP なし）'); }
          else if (cost > 0) mp(-cost);
          if (MP_GAIN[id] && (!COMBO_MP.has(id) || ok)) mp(MP_GAIN[id]);
          // ブラックブラッド（説明文「「ブラックブラッド」を20上昇」。コンボ時）。ブラッドデリリアムの説明文の +10 はブラッドウェポンの分なので除く
          if (id !== ID.DELIRIUM) blood(descGain(a, 'ブラックブラッド', ok));
          // 暗黒: 付与と延長（説明文「既に付与されている場合は、その効果時間を30秒延長する。最大60秒まで」）
          if (id === ID.EDGE || id === ID.FLOOD) { extendBuff(R, 'darkside', 30000, 60000, 30000); s.stats.edges++; }
          // ブラッドウェポン: ウェポンスキル・魔法が当たるたびに MP と ブラックブラッド（スタックを 1 つ使う。仮）
          if ((isWs(a) || isSpell(a)) && has('bloodWeapon')) {
            mp(BW_MP); blood(BW_BLOOD);
            const st = s.st.bloodWeapon; if ((st.stacks ?? 1) > 1) st.stacks -= 1; else R.remove('bloodWeapon');
          }
          if (id === ID.DELIRIUM) { R.buff('delirium', 15000, 3); R.buff('bloodWeapon', 15000, 3); s.stats.delirium++; }
          // 回復（ソウルイーター「コンボボーナス：自身のＨＰを回復する」・アビサルドレイン・カーヴ・アンド・スピット）。
          // リビングデッドの回復力 1500 はウォーキングデッドの間の分なので、ここでは回復しない
          if ([ID.SOULEATER, ID.DRAIN, ID.CARVE].includes(id) && a.eff?.heal > 0 && (id !== ID.SOULEATER || ok)) R.heal('self', a.eff.heal * HEAL_K);
          if (id === ID.UNMEND) R.cdShift(ID.STRIDE, 5000); // アンメンド「シャドウストライドのリキャストタイムを5秒短縮する」
          // 防御
          if (id === ID.TBN) {
            const who = R.who ?? 'self';
            R.shield(who, 0.25, 7, 'ブラックナイト');
            s.tbn = { who, until: s.t + 7000 };
            if (who === 'self') R.buff('tbn', 7000);
          }
          if (id === ID.DARK_MIND) { R.mitigate('self', 0.1, 10, 'ダークマインド'); R.buff('darkMind', 10000); } // 被物理 10%（仮 GAME-73）
          if (id === ID.MISSIONARY) R.mitigate('party', 0.1, 15, 'ダークミッショナリー'); // 被魔法 10%（仮 GAME-73）
          if (id === ID.OBLATION) { const who = R.who ?? 'self'; R.mitigate(who, 0.1, 10, 'オブレーション'); if (who === 'self') R.buff('oblation', 10000); }
          if (id === ID.RAMPART) { support(R, a); R.buff('rampart', 20000); }
          if (id === ID.LIVING_DEAD) R.mitigate('self', 1, 10, 'リビングデッド'); // 仮（GAME-73）
          if (id === ID.VIGIL) { R.mitigate('self', 0.4, 15, 'シャドウヴィジル'); R.buff('vigil', 15000); s.vigil = true; }
          if (id === ID.GRIT) toggleStance(R, 'grit');
          // ソルトアース: 足元に範囲（15 秒）。範囲の中の敵に 3 秒ごとに威力 50
          if (id === ID.SALTED) {
            const sec = Number(/効果時間：(\d+)秒/.exec(a.desc)?.[1] ?? 15);
            R.zone('salt', { r: a.effectRange || 5, sec, ring: true, self: true, col: ['#f0dcff', '#8a40d0'] });
            R.buff('saltEarth', sec * 1000);
            s.dots.salt = { until: s.t + sec * 1000, next: s.t + 3000, potency: a.pot?.base ?? 50, mult: R.mult, name: a.name };
          }
          // ソルト・アンド・ダーク: ソルトアースの範囲に敵がいるときだけ当たる（威力は説明文のとおり上で計算済み）
          if (id === ID.SALT_DARK && !R.zoneHitsBoss('salt')) R.addLog('warn', 'ソルト・アンド・ダーク: ソルトアースの範囲に敵がいません');
          // 影身具現: 英雄の影身が 22 秒（攻撃の予定は仮 GAME-73）
          if (id === ID.SHADOW) {
            s.shadow = { at: s.t, until: s.t + 22000, i: 0 };
            R.pet('shadow', 22);
            R.addLog('ok', '英雄の影身を具現化（22 秒）');
          }
        },
        // 使ったときには攻撃しない技: 影身具現（威力は影身の攻撃）・ソルトアース（威力は範囲の 1 回分）。
        // ソルト・アンド・ダークは、ソルトアースの範囲に敵がいないと当たらない
        noHit: (id) => id === ID.SHADOW || id === ID.SALTED || (id === ID.SALT_DARK && !R.zoneHitsBoss('salt')),
        tick(dt) {
          const s = S();
          // ブラックナイトのバリアを全部吸収した → ダークアーツ（説明文）
          if (s.tbn) {
            if (R.shieldLeft(s.tbn.who) <= 0.0005 && s.t < s.tbn.until) {
              R.buff('darkArts', 1e9); s.stats.tbnBroken++; s.tbn = null;
              R.addLog('ok', 'ブラックナイトのバリアが吸収されて消えました → ダークアーツ');
            } else if (s.t >= s.tbn.until) s.tbn = null;
          }
          // シャドウヴィジル［被］: HP 50% 未満か時間切れで回復力 1200
          if (s.vigil && has('vigilProc') && R.hpOf('self') < 0.5) { R.heal('self', 1200 * HEAL_K); R.remove('vigilProc'); s.vigil = false; }
          if (s.vigil && !has('vigilProc')) { R.heal('self', 1200 * HEAL_K); s.vigil = false; }
          // ソルトアースの範囲（3 秒ごと。範囲の中に敵がいるときだけ）
          const d = s.dots.salt;
          if (d) {
            while (d.next <= s.t && d.next <= d.until) { d.next += 3000; if (s.phase === 'combat' && R.zoneHitsBoss('salt')) R.dotTick(d.potency, d.mult, d.name); }
            if (d.until < s.t) delete s.dots.salt;
          }
          // 英雄の影身の攻撃
          const sh = s.shadow;
          if (sh) {
            while (sh.i < SHADOW_HITS.length && s.t >= sh.at + 3000 + sh.i * 2200) {
              const [pot, name] = SHADOW_HITS[sh.i++];
              if (s.phase === 'combat') { R.hit(pot, name); R.pet('act'); }
            }
            if (s.t >= sh.until) s.shadow = null;
          }
          if (s.phase !== 'combat' && s.phase !== 'countdown') return;
          // MP の自然回復（ジョブ共通の 3 秒周期）
          for (let n = mpTicks(s, dt); n > 0; n--) mp(naturalMp(s));
        },
        highlightOk: (id, st) => st !== 'delirium' || has('delirium'),
        // 光る: 暗黒の間のシャドウブリンガー、ソルトアースの間のソルト・アンド・ダーク、ダークアーツの漆黒の剣
        glow: (id) => (id === ID.BRINGER ? has('darkside') : id === ID.SALT_DARK ? has('saltEarth') : (id === ID.EDGE || id === ID.FLOOD) ? has('darkArts') : false),
        guide: () => null,
        positional: () => null,
        fxColor: (id) => ([ID.EDGE, ID.FLOOD, ID.BRINGER, ID.SALT_DARK, ID.DISESTEEM, ID.UNMEND, ID.UNLEASH, ID.STALWART, ID.DRAIN, ID.SALTED, ID.SHADOW].includes(id) ? 'shoha' : [ID.SPILLER, ID.QUIETUS, ID.SCARLET, ID.COMEUPPANCE, ID.TORCLEAVER, ID.IMPALEMENT, ID.CARVE].includes(id) ? 'blood' : id === ID.DELIRIUM ? 'blood' : 'steel'),
        fxPower: (id, a, ok) => ([ID.DISESTEEM, ID.TORCLEAVER, ID.BRINGER].includes(id) ? 1.5 : [ID.SPILLER, ID.SCARLET, ID.COMEUPPANCE, ID.EDGE].includes(id) ? 1.25 : ok && a.comboFrom.length ? 1.15 : 1),
        fxCount: () => 1,
        castColor: () => 'shoha',
        gcdColor: (id) => ([ID.SCARLET, ID.COMEUPPANCE, ID.TORCLEAVER, ID.IMPALEMENT].includes(id) ? '#ff3b5a' : id === ID.SPILLER || id === ID.QUIETUS ? '#ff7a6a' : id === ID.DISESTEEM ? '#c08aff' : null),
        hotOgcd: (id) => [ID.EDGE, ID.FLOOD, ID.BRINGER, ID.CARVE, ID.DRAIN, ID.SALT_DARK, ID.SHADOW, ID.DELIRIUM].includes(id),
        // 効果音: 両手剣の斬撃、無属性の魔法（漆黒の剣など）は闇
        weapon: 'slash', magicTone: 'dark',
        sfxKind: (id) => (id === ID.DELIRIUM ? { g: 'boost', v: 'self' } : id === ID.SHADOW ? { g: 'boost', v: 'summon' } : null),
        tipCost: (id) => (id === ID.EDGE || id === ID.FLOOD ? ['MP', has('darkArts') ? '0（ダークアーツ）' : 3000] : id === ID.TBN ? ['MP', 3000] : id === ID.SPILLER || id === ID.QUIETUS ? ['ブラックブラッド', 50] : null),
        report(s) {
          const issues = [], metrics = [], goods = [];
          if (s.stats.bloodOver) issues.push({ loss: Math.min(100, s.stats.bloodOver * 2) * 0.1, rate: s.stats.bloodOver > 30 ? 'bad' : 'ok', title: `ブラックブラッドが ${s.stats.bloodOver} あふれた`, advice: '50 以上たまったらブラッドスピラーで使う。ブラッドデリリアムの前には使っておく' });
          metrics.push({ label: 'ブラックブラッドのあふれ', value: `${s.stats.bloodOver}`, rate: Math.max(0, 100 - s.stats.bloodOver * 2) });
          metrics.push({ label: '漆黒の剣・漆黒の波動', value: `${s.stats.edges} 回（ダークアーツ ${s.stats.darkArtsUsed} 回）`, rate: null });
          metrics.push({ label: 'MP（終了時）', value: `${Math.floor(s.mp)}`, rate: null });
          if (!s.stats.bloodOver && s.stats.gcds > 5) goods.push('ブラックブラッドのあふれなし');
          return { issues, metrics, goods, overPct: Math.max(0, 100 - s.stats.bloodOver * 2), posAdvice: '', castAdvice: '', rangeAdvice: '敵が動いたらすぐ追いかける。離れたらシャドウストライド・アンメンド', comboAdvice: 'ハードスラッシュ → サイフォンストライク → ソウルイーターの順に。ブラッドスピラーや漆黒の剣はコンボを切らない' };
        },
        howto: '暗黒騎士: ハードスラッシュ→サイフォンストライク→ソウルイーター。漆黒の剣（MP 3000）で「暗黒」を切らさない。ブラックブラッド 50 でブラッドスピラー。ブラッドデリリアムの間はレッドデリリアム→カマパンス→トアクリーバー。影身具現のあとディセスティーム。ブラックナイトのバリアが全部吸収されるとダークアーツ（MP なしで漆黒の剣）。あなたが敵を引きつけます。',
        gaugeUI: (D) => window.MockGauge2.create(D.gauge, 'DRK'),
        gaugeDefault: { JobHudDRK0: { x: 66, y: 62, anchor: 4, scale: 1 }, JobHudDRK1: { x: 78, y: 62, anchor: 4, scale: 1 } },
      };
      return J;
    },
  };

  // ---------------- ガンブレイカー ----------------
  // 説明文から:
  //   ソイル: ソリッドバレル・デーモンスローターのコンボ時に 1 つ。ビートファング・バーストストライク・フェイテッドサークルは 1、ダブルダウンは 2 を使う。
  //     ブラッドソイル: ソイルの最大スタック数を 6 に増やし、ソイル 3 つ（30 秒）＋ハートコンボ実行可（30 秒）
  //   ビートファング（固有のリキャスト 30 秒・チャージ 2）→ サベッジクロウ → ウィケッドタロン（コンボ条件を満たした場合のみ）。
  //     それぞれジャギュラーリップ / アブドメンテアー / アイガウジ実行可、バーストストライクでハイパーヴェロシティ実行可、フェイテッドサークルでフェイテッドブランド実行可（10 秒）。
  //     どれも「ウェポンスキルを実行すると解除される」。コンティニュエーションが実行可のものに変わる
  //   ノー・マーシー: 与ダメージ 20%（20 秒）＋ソニックブレイク実行可（30 秒）。ソニックブレイク・バウショックは継続ダメージ（15 秒）
  //   ライズ・オブ・ハート（ハートコンボ実行可）→ ルーラー・オブ・ハート → エンド・オブ・ハート
  //   ブルータルシェル: コンボ時に回復力 200 と、回復量の 100% のバリア（30 秒）。ハート・オブ・コランダム: 被ダメージ 15%（8 秒）・
  //     クラリティー・オブ・コランダム 15%（4 秒）・カタルシス・オブ・コランダム（20 秒。HP 50% 以下か時間切れで回復力 900）
  // 仮（説明文にない: GAME-74）: ソイルの上限はふだん 3（ブラッドソイルの 30 秒が過ぎたら 3 を超えた分は消える）。継続ダメージは 3 秒ごと。
  //   ボーライドの「HP を 50% にする」は入れず、10 秒間の被ダメージ 100% 軽減だけ。ハート・オブ・ライトは被魔法の 10% を使う。
  //   ライズ・オブ・ハートはサンプルのホットバーに無いので「未配置」のボタン。続きのルーラー / エンド・オブ・ハートは、抽出データのとおり
  //   ブラッドソイルのボタンが変わる（ライズ・オブ・ハートのボタンを押しても続きが出るようにした）
  const GNB = {
    abbr: 'GNB',
    create(R) {
      const { A } = R;
      const ID = {
        KEEN: 16137, BRUTAL: 16139, SOLID: 16145, SLICE: 16141, SLAUGHTER: 16149, LIGHTNING: 16143, NO_MERCY: 16138, CAMO: 16140, GUARD: 16142,
        GNASH: 16146, SAVAGE: 16147, WICKED: 16150, SONIC: 16153, CONT: 16155, RIP: 16156, TEAR: 16157, GOUGE: 16158, HYPER: 25759, BRAND: 36936,
        BOW: 16159, LIGHT: 16160, BURST: 16162, FATED: 16163, BLOODFEST: 16164, ZONE: 16165, AURORA: 16151, BOLIDE: 16152, CORUNDUM: 25758,
        DOUBLE: 25760, TRAJECTORY: 36934, NEBULA: 36935, REIGN: 36937, NOBLE: 36938, LION: 36939, RAMPART: 7531,
      };
      const STATUS = {
        noMercy: { name: 'ノー・マーシー', tracked: true },
        sonicReady: { name: 'ソニックブレイク実行可' },
        rip: { name: 'ジャギュラーリップ実行可' },
        tear: { name: 'アブドメンテアー実行可' },
        gouge: { name: 'アイガウジ実行可' },
        hyper: { name: 'ハイパーヴェロシティ実行可' },
        brand: { name: 'フェイテッドブランド実行可' },
        reignReady: { name: 'ハートコンボ実行可' },
        guard: { name: 'ロイヤルガード' },
        sonic: { name: 'ソニックブレイク', target: true, tracked: true },
        bow: { name: 'バウショック', target: true },
        camo: { name: 'カモフラージュ' },
        nebula: { name: 'グレートネビュラ' },
        bolide: { name: 'ボーライド' },
        corundum: { name: 'ハート・オブ・コランダム' },
        catharsis: { name: 'カタルシス・オブ・コランダム' },
        brutal: { name: 'ブルータルシェル' },
        rampart: { name: 'ランパート' },
      };
      const S = () => R.S;
      const has = R.has;
      const READIES = ['rip', 'tear', 'gouge', 'hyper', 'brand'];
      const SOIL_BASE = 3; // 仮（GAME-74）
      const soilMax = () => (S().soilBig && S().soilBig > S().t ? 6 : SOIL_BASE);
      function soil(n) {
        const s = S(), mx = soilMax(), v = s.soil + n;
        if (v > mx) {
          s.stats.soilOver += v - mx;
          R.addLog('warn', `ソイルが ${v - mx} あふれました`);
          R.ev('ミス', { result: 'あふれ', note: `ソイルが ${v - mx} あふれた` });
        }
        s.soil = Math.max(0, Math.min(mx, v));
      }
      const gauges = { ソイル: { get: () => S().soil, set: (v) => { S().soil = Math.max(0, Math.min(soilMax(), v)); }, max: 6 } };
      const isWs = (a) => a.category === 3;
      const DOTS = { [ID.SONIC]: 'sonic', [ID.BOW]: 'bow' };
      const J = {
        ids: ID, STATUS,
        charges: descCharges(A), // ビートファング・オーロラ・トラジェクトリー「最大チャージ数：2」
        prepull: new Set([ID.GUARD]), // スタンスは戦闘前に入れる（自己バフのため仮で許可: GAME-30）
        comboStarters: new Set([ID.KEEN, ID.SLICE]),
        // 光る条件: ActionProcStatus の行 → ステータス
        procStatus: { 33: 'rip', 34: 'tear', 35: 'gouge', 52: 'hyper', 156: 'brand', 157: 'reignReady', 210: 'sonicReady' },
        ownDots: true, // 継続ダメージが 2 つ（ソニックブレイク・バウショック）
        initState(s) { s.soil = 0; s.soilBig = 0; s.dots = {}; s.corundum = null; s.stats.soilOver = 0; s.stats.gnash = 0; s.stats.contUsed = 0; s.stats.contLost = 0; },
        gaugeCols: [['ソイル', (s) => s.soil]],
        tracked: [['ノー・マーシー', 'noMercy', '#ffb45a', '60 秒ごとに。ビートファングの 3 連・ダブルダウン・ソニックブレイクをこの中に'], ['ソニックブレイク', 'sonic', '#7fd0ff', '']],
        speed: () => 1,
        comboFree: () => false,
        resolve(id) {
          const s = S();
          // ライズ・オブ・ハートのボタン: 続き（ルーラー → エンド）も出す（仮。データではブラッドソイルのボタンが変わる）
          if (id === ID.REIGN && s.chain != null && s.t <= s.chainUntil) { if (s.chain === ID.REIGN) return ID.NOBLE; if (s.chain === ID.NOBLE) return ID.LION; }
          return tooltipResolve(R, J, id);
        },
        blocked(id) {
          const s = S(), a = A[id];
          if (!a) return null;
          if (id === ID.CONT) return 'コンティニュエーションの変化先がありません（ビートファング・バーストストライクなどの後に使う）';
          if ((id === ID.SAVAGE || id === ID.WICKED || id === ID.NOBLE || id === ID.LION) && !(a.comboFrom.includes(s.chain) && s.t <= s.chainUntil)) return 'コンボ条件を満たしていません';
          return tooltipBlocked(R, J, a, gauges);
        },
        castMs: (a, base) => base,
        effects(id, ok) {
          const a = A[id], s = S();
          // 「この効果はウェポンスキルを実行すると解除される」: 前の実行可を消してから、この技の分を付ける
          if (isWs(a)) for (const k of READIES) if (has(k)) { R.remove(k); s.stats.contLost++; R.addLog('warn', `${STATUS[k].name}を使わずにウェポンスキルを実行しました`); }
          // ソイル: コンボ時に 1 つ（説明文の付与。あふれを数えるため、ここで足す）
          const eff = a.eff?.grant ? { ...a, eff: { ...a.eff, grant: a.eff.grant.filter((g) => g.status !== 'ソイル') } } : a;
          tooltipEffects(R, J, eff, ok, gauges);
          if (ok && a.eff?.grant?.some((g) => g.status === 'ソイル' && g.combo)) soil(1);
          if (id === ID.BLOODFEST) { s.soilBig = s.t + 30000; soil(3); }
          if ([ID.RIP, ID.TEAR, ID.GOUGE, ID.HYPER, ID.BRAND].includes(id)) s.stats.contUsed++;
          if (id === ID.GNASH) s.stats.gnash++;
          // 継続ダメージ（付けたときの与ダメージ上昇で計算）
          if (DOTS[id] && a.pot?.dot) { const k = DOTS[id]; s.dots[k] = { until: s.t + a.pot.dot.sec * 1000, next: s.t + 3000, potency: a.pot.dot.potency, mult: R.mult, name: a.name }; R.buff(k, a.pot.dot.sec * 1000); }
          // 防御
          if (id === ID.BRUTAL && ok) { R.heal('self', (a.eff?.heal ?? 200) * HEAL_K); R.shield('self', (a.eff?.heal ?? 200) * HEAL_K, 30, 'ブルータルシェル'); R.buff('brutal', 30000); }
          if (id === ID.CAMO) { R.mitigate('self', 0.1, 20, 'カモフラージュ'); R.buff('camo', 20000); }
          if (id === ID.NEBULA) { R.mitigate('self', 0.4, 15, 'グレートネビュラ'); R.heal('self', 0.2); R.buff('nebula', 15000); }
          if (id === ID.BOLIDE) { R.mitigate('self', 1, 10, 'ボーライド'); R.buff('bolide', 10000); } // 仮（GAME-74）
          if (id === ID.LIGHT) R.mitigate('party', 0.1, 15, 'ハート・オブ・ライト'); // 被魔法 10%（仮 GAME-74）
          if (id === ID.CORUNDUM) {
            const who = R.who ?? 'self';
            R.mitigate(who, 0.15, 8, 'ハート・オブ・コランダム'); R.mitigate(who, 0.15, 4, 'クラリティー・オブ・コランダム');
            s.corundum = { who, until: s.t + 20000 };
            if (who === 'self') { R.buff('corundum', 8000); R.buff('catharsis', 20000); }
          }
          if (id === ID.AURORA) support(R, a);
          if (id === ID.RAMPART) { support(R, a); R.buff('rampart', 20000); }
          if (id === ID.GUARD) toggleStance(R, 'guard');
        },
        tick() {
          const s = S();
          // ブラッドソイルの 30 秒が過ぎたら、3 を超えた分は消える（仮）
          if (s.soilBig && s.t >= s.soilBig) { s.soilBig = 0; if (s.soil > SOIL_BASE) { R.addLog('warn', `ソイルが ${s.soil - SOIL_BASE} 消えました（ブラッドソイルの時間切れ）`); s.stats.soilOver += s.soil - SOIL_BASE; s.soil = SOIL_BASE; } }
          // カタルシス・オブ・コランダム: HP 50% 以下か時間切れで回復力 900
          if (s.corundum && (R.hpOf(s.corundum.who) <= 0.5 || s.t >= s.corundum.until)) { R.heal(s.corundum.who, 900 * HEAL_K); R.remove('catharsis'); s.corundum = null; }
          // 継続ダメージ（3 秒ごと）
          for (const k of Object.keys(s.dots)) {
            const d = s.dots[k];
            while (d.next <= s.t && d.next <= d.until) { d.next += 3000; if (s.phase === 'combat') R.dotTick(d.potency, d.mult, d.name); }
            if (d.until < s.t) delete s.dots[k];
          }
        },
        highlightOk: () => true,
        guide: () => null,
        positional: () => null,
        fxColor: (id) => ([ID.GNASH, ID.SAVAGE, ID.WICKED, ID.DOUBLE, ID.ZONE].includes(id) ? 'kenki' : [ID.RIP, ID.TEAR, ID.GOUGE, ID.HYPER, ID.BRAND].includes(id) ? 'iai' : [ID.REIGN, ID.NOBLE, ID.LION].includes(id) ? 'namikiri' : [ID.SONIC, ID.BOW].includes(id) ? 'setsu' : id === ID.BURST || id === ID.FATED ? 'kenki' : id === ID.NO_MERCY || id === ID.BLOODFEST ? 'kenki' : 'steel'),
        fxPower: (id, a, ok) => ([ID.DOUBLE, ID.LION, ID.ZONE, ID.WICKED].includes(id) ? 1.5 : [ID.GNASH, ID.SAVAGE, ID.BURST, ID.NOBLE, ID.REIGN].includes(id) ? 1.25 : ok && a.comboFrom.length ? 1.15 : 1),
        fxCount: (id) => ([ID.RIP, ID.TEAR, ID.GOUGE, ID.HYPER].includes(id) ? 2 : 1),
        castColor: () => 'kenki',
        gcdColor: (id) => ([ID.GNASH, ID.SAVAGE, ID.WICKED].includes(id) ? '#ffb45a' : id === ID.DOUBLE ? '#ff7a5a' : [ID.REIGN, ID.NOBLE, ID.LION].includes(id) ? '#7fe8ff' : id === ID.BURST ? '#ffd27a' : id === ID.SONIC ? '#7fd0ff' : null),
        hotOgcd: (id) => [ID.ZONE, ID.BOW, ID.RIP, ID.TEAR, ID.GOUGE, ID.HYPER, ID.BRAND, ID.NO_MERCY, ID.BLOODFEST].includes(id),
        // 効果音: ガンブレードの斬撃（コンティニュエーションは撃ち出す音を重ねる）。ノー・マーシーは自分の強化
        weapon: 'slash',
        sfxKind: (id) => (id === ID.NO_MERCY || id === ID.BLOODFEST ? { g: 'boost', v: 'self' } : null),
        tipCost: (id) => (A[id]?.eff?.cost?.gauge === 'ソイル' ? ['ソイル', A[id].eff.cost.n] : null),
        report(s) {
          const issues = [], metrics = [], goods = [];
          if (s.stats.soilOver) issues.push({ loss: s.stats.soilOver * 3, rate: s.stats.soilOver > 2 ? 'bad' : 'ok', title: `ソイルのあふれ ${s.stats.soilOver}`, advice: 'ソイルが 3 つのときにソリッドバレルを使う前に、バーストストライクで使う。ブラッドソイルの前は 0 にしておく' });
          if (s.stats.contLost) issues.push({ loss: s.stats.contLost * 3, rate: 'bad', title: `コンティニュエーションの使い忘れ ${s.stats.contLost} 回`, advice: 'ビートファング・バーストストライクなどの後は、次のウェポンスキルの前にコンティニュエーション（光る）' });
          metrics.push({ label: 'ソイルのあふれ', value: `${s.stats.soilOver}`, rate: Math.max(0, 100 - s.stats.soilOver * 20) });
          metrics.push({ label: 'コンティニュエーション', value: `${s.stats.contUsed} 回（使い忘れ ${s.stats.contLost}）`, rate: Math.max(0, 100 - s.stats.contLost * 20) });
          if (!s.stats.soilOver && !s.stats.contLost && s.stats.gcds > 5) goods.push('ソイルのあふれ・コンティニュエーションの使い忘れなし');
          return { issues, metrics, goods, overPct: Math.max(0, 100 - s.stats.soilOver * 15 - s.stats.contLost * 15), posAdvice: '', castAdvice: '', rangeAdvice: '敵が動いたらすぐ追いかける。離れたらトラジェクトリー・サンダーバレット', comboAdvice: 'キーンエッジ → ブルータルシェル → ソリッドバレルの順に。ビートファング → サベッジクロウ → ウィケッドタロンは通常のコンボを切らない' };
        },
        howto: 'ガンブレイカー: キーンエッジ→ブルータルシェル→ソリッドバレル（ソイル +1）。ノー・マーシーの間にビートファング→サベッジクロウ→ウィケッドタロン、ダブルダウン、ソニックブレイク。ビートファング・バーストストライクなどの後はすぐコンティニュエーション（次のウェポンスキルで消える）。ブラッドソイルのあとライズ・オブ・ハート→ルーラー→エンド・オブ・ハート。あなたが敵を引きつけます。',
        gaugeUI: (D) => window.MockGauge2.create(D.gauge, 'GNB'),
        gaugeDefault: { JobHudGNB0: { x: 70, y: 62, anchor: 4, scale: 1 } },
      };
      return J;
    },
  };

  Object.assign(window.MockJobs, { WAR, DRK, GNB });
})();
