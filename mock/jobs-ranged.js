// ジョブの決まり（遠隔物理: 機工士・踊り子）。書き方は jobs.js と同じ（create(R) で作る。R は mock.js が渡す道具）。
// 共通の部品は jobs.js の window.MockJobs.lib。値は説明文（抽出データの description と、build-mock-data.mjs が読み取った eff / pot）と
// 公式ジョブガイドのダンプ（特性・ジョブ HUD の説明）から。どちらにもない決まりは「仮」と書き、docs/SPEC.md §10 に載せる。
(function () {
  'use strict';
  const { tooltipBlocked, tooltipResolve, tooltipEffects, descCharges, descGain, numIn, guideTrait, HEAL_K, seeded } = window.MockJobs.lib;

  // ---------------- 機工士 ----------------
  // 説明文から:
  //   ヒート: ヒートスプリットショット +5、ヒートスラッグショット・ヒートクリーンショット（コンボ時）+5、スキャッターガン +10
  //   バッテリー: ヒートクリーンショット（コンボ時）+10、エアアンカー・回転のこぎり・エクスカベーター +20
  //   ハイパーチャージ（ヒート 50。ハイパーチャージ実行可なら消費なし）: オーバーヒート 5 スタック（10 秒）。
  //     オーバーヒート中は単体のウェポンスキルの威力 +20、ブレイズショット・オートボウガン（GCD 1.5 秒）が使える（1 回でスタック 1 つ）。
  //     ブレイズショットはダブルチェック・チェックメイトのリキャストを 15 秒縮める
  //   ワイルドファイア: 10 秒の間に当てたウェポンスキルの数（最大 6）× 240 を、時間切れかデトネーターで与える
  //   バレルヒーター（戦闘中）: ハイパーチャージ実行可・フルメタルバースト実行可（30 秒）。回転のこぎり: エクスカベーター実行可（30 秒）
  //   オートマトン・クイーン（バッテリー 50 以上を全部使う。稼働 12 秒）: 威力は使ったバッテリーで変わる（クイーン・ローラーダッシュ 240〜480・
  //     クイーン・アームパンチ 120〜240・クイーン・パイルバンカー 340〜680・クイーン・コレダー 390〜780。抽出データのクイーンの技の説明文）。
  //     オーバードライブ・クイーンで、すぐにパイルバンカー → 帰還
  //   整備: 次のウェポンスキルが必ずクリティカルかつダイレクトヒット（5 秒）。フルメタルバーストには効かない
  //   フレイムスロアー: 10 秒、毎秒 120。動く・ほかの技を使うと止まる
  // 公式ジョブガイドの特性から: クイーン・パイルバンカーのあとにクイーン・コレダーを撃って帰る（Queen's Gambit）
  // 仮（GAME-82）: クリティカル・ダイレクトヒットは扱わないので、整備はダメージを変えない（整備を乗せた技は結果に出す）。
  //   クイーンの動き — 起動 1.5 秒後にローラーダッシュ、そのあと 1.5 秒ごとにアームパンチ、稼働時間の終わり（かオーバードライブ）にパイルバンカー、
  //   その 1.5 秒後にコレダー。威力はバッテリー 50 → 100 で最小 → 最大に比例。稼働時間はバッテリーによらず 12 秒（説明文の値）
  const MCH = {
    abbr: 'MCH',
    create(R) {
      const { A } = R;
      const ID = {
        SPLIT: 7411, SLUG: 7412, CLEAN: 7413, HYPERCHARGE: 17209, WILDFIRE: 2878, DETONATOR: 16766, AUTO_CROSSBOW: 16497, TACTICIAN: 16889,
        DRILL: 16498, DISMANTLE: 2887, BARREL: 7414, BLAZING: 36978, FLAMETHROWER: 7418, BIOBLAST: 16499, AIR_ANCHOR: 16500,
        QUEEN: 16501, OVERDRIVE: 16502, SCATTERGUN: 25786, CHAINSAW: 25788, DOUBLE_CHECK: 36979, CHECKMATE: 36980, EXCAVATOR: 36981, FMF: 36982,
        REASSEMBLE: 2876, SECONDWIND: 7541, ARMS: 7548,
        Q_PILE: 16503, Q_PUNCH: 16504, Q_DASH: 17206, Q_COLLIDER: 25787,
      };
      const STATUS = {
        overheated: { name: 'オーバーヒート' },
        hyperReady: { name: 'ハイパーチャージ実行可' },
        fmfReady: { name: 'フルメタルバースト実行可' },
        excavatorReady: { name: 'エクスカベーター実行可' },
        reassembled: { name: '整備' },
        wildfire: { name: 'ワイルドファイア', target: true },
        tactician: { name: 'タクティシャン' },
      };
      const S = () => R.S;
      const has = R.has;
      const Au = () => window.MockAudio;
      const OH_UP = numIn(A[ID.HYPERCHARGE]?.desc, /威力を(\d+)上昇/, 20);
      const OH_SINGLE = new Set([ID.SPLIT, ID.SLUG, ID.CLEAN, ID.DRILL, ID.AIR_ANCHOR, ID.BLAZING]); // オーバーヒートで威力が上がる単体のウェポンスキル
      const WF_PER = numIn(A[ID.WILDFIRE]?.desc, /1回ごとの威力：(\d+)/, 240), WF_MAX = numIn(A[ID.WILDFIRE]?.desc, /最大(\d+)回分/, 6);
      const QUEEN_MS = numIn(A[ID.QUEEN]?.desc, /稼働時間：(\d+)秒/, 12) * 1000, Q_STEP = 1500;
      // クイーンの技の威力の幅（説明文「威力：120～240」）
      const qPot = (id, k) => { const d = R.D.petActions?.[id]?.desc ?? A[id]?.desc ?? ''; const lo = numIn(d, /威力：(\d+)～/, 0), hi = numIn(d, /～(\d+)/, lo); return Math.round(lo + (hi - lo) * k); };
      const QUEEN_ACT = { [ID.Q_PILE]: 'クイーン・パイルバンカー', [ID.Q_PUNCH]: 'クイーン・アームパンチ', [ID.Q_DASH]: 'クイーン・ローラーダッシュ', [ID.Q_COLLIDER]: 'クイーン・コレダー' };
      const BIG = new Set([ID.DRILL, ID.AIR_ANCHOR, ID.CHAINSAW, ID.EXCAVATOR]); // 整備を乗せたい技
      function gain(key, n, overKey) {
        const s = S(), v = s[key] + n;
        if (v > 100 && s.phase === 'combat') s.stats[overKey] += v - 100;
        s[key] = Math.min(100, v);
      }
      const gauges = {
        ヒート: { get: () => S().heat, set: (v) => { S().heat = Math.max(0, Math.min(100, v)); }, max: 100 },
        バッテリー: { get: () => S().battery, set: (v) => { S().battery = Math.max(0, Math.min(100, v)); }, max: 100 },
      };
      const queenOn = () => !!S().queen;
      function queenHit(id) {
        const q = S().queen, pot = qPot(id, q.k);
        if (S().phase === 'combat') { R.hit(pot, R.D.petActions?.[id]?.name ?? QUEEN_ACT[id]); R.pet('act'); }
      }
      function stopFlame(why) {
        const s = S();
        if (!s.flame) return;
        if (s.t < s.flame.until - 50) R.addLog('warn', `フレイムスロアーが止まりました（${why}）`);
        s.flame = null;
      }
      const J = {
        ids: ID, STATUS,
        charges: descCharges(A), // 整備 2・ドリル / バイオブラスト 2・ダブルチェック 3・チェックメイト 3（説明文「最大チャージ数」）
        prepull: new Set([ID.REASSEMBLE]),
        comboStarters: new Set([ID.SPLIT]),
        procStatus: {},
        initState(s) {
          s.heat = 0; s.battery = 0; s.wf = null; s.queen = null; s.flame = null;
          s.stats.heatOver = 0; s.stats.batteryOver = 0; s.stats.wfHits = []; s.stats.blazing = 0; s.stats.queens = []; s.stats.reassembleOn = []; s.stats.ohWasted = 0;
        },
        gaugeCols: [['ヒート', (s) => s.heat], ['バッテリー', (s) => s.battery], ['オーバーヒート', (s) => (R.has('overheated') ? s.st.overheated.stacks ?? '' : '')]],
        tracked: [],
        speed: () => 1,
        // ブレイズショット・オートボウガンの GCD 1.5 秒は、表のリキャスト（a.recastMs）がそのまま使われる
        // （説明文「実行すると他のウェポンスキルと魔法にこのアクションと同じリキャストタイムが発生する」。gcdMs は不要）
        comboFree: () => false,
        resolve: (id) => tooltipResolve(R, J, id),
        blocked(id) {
          const s = S(), a = A[id];
          if (!a) return null;
          if (id === ID.HYPERCHARGE) {
            if (has('overheated')) return '「オーバーヒート」の効果中です';
            if (!has('hyperReady') && s.heat < 50) return `ヒートが足りません（必要 50 / 現在 ${s.heat}）`;
            return null;
          }
          if (id === ID.QUEEN) {
            if (queenOn()) return 'オートマトン・クイーンが稼働中です';
            if (s.battery < 50) return `バッテリーが足りません（必要 50 / 現在 ${s.battery}）`;
            return null;
          }
          if (id === ID.OVERDRIVE && !(queenOn() && !s.queen.ending)) return 'オートマトン・クイーンがいません';
          if (id === ID.BARREL && s.phase !== 'combat') return '戦闘中だけ使えます';
          if ([ID.BLAZING, ID.AUTO_CROSSBOW, ID.DETONATOR, ID.EXCAVATOR, ID.FMF].includes(id)) return tooltipBlocked(R, J, a, {});
          return null;
        },
        castMs: (a, base) => base,
        // 攻撃しない技（威力は別に出す）: ワイルドファイア（付けるだけ）・デトネーター（ワイルドファイアの爆発で出す）・クイーンの起動とオーバードライブ・フレイムスロアー（毎秒）
        noHit: (id) => [ID.WILDFIRE, ID.DETONATOR, ID.QUEEN, ID.OVERDRIVE, ID.FLAMETHROWER].includes(id),
        potAdd: (a) => (OH_SINGLE.has(a.id) && has('overheated') ? OH_UP : 0),
        dmgMult: () => 1,
        effects(id, ok) {
          const a = A[id], s = S();
          if (id !== ID.FLAMETHROWER) stopFlame(a.name);
          // ワイルドファイア: 当てたウェポンスキルを数える
          if (s.wf && a.category === 3 && id !== ID.FLAMETHROWER && a.pot?.base) s.wf.n = Math.min(WF_MAX, s.wf.n + 1);
          // 整備: 次のウェポンスキルで使う（フルメタルバーストには効かない）
          if (a.category === 3 && has('reassembled') && id !== ID.FMF) { R.remove('reassembled'); s.stats.reassembleOn.push(a.name); }
          // ゲージ（説明文の「「ヒート」をN上昇」「「バッテリー」をN上昇」。コンボボーナスはコンボ時だけ）
          const hg = descGain(a, 'ヒート', ok); if (hg) gain('heat', hg, 'heatOver');
          const bg = descGain(a, 'バッテリー', ok); if (bg) gain('battery', bg, 'batteryOver');
          if (id === ID.HYPERCHARGE) {
            if (has('hyperReady')) R.remove('hyperReady'); else s.heat -= 50;
            R.buff('overheated', 10000, 5); Au()?.surge();
          }
          if (id === ID.BLAZING || id === ID.AUTO_CROSSBOW) {
            tooltipEffects(R, J, a, ok, {}); // オーバーヒートを 1 つ使う
            if (id === ID.BLAZING) { s.stats.blazing++; R.cdShift(ID.DOUBLE_CHECK, 15000); R.cdShift(ID.CHECKMATE, 15000); }
          }
          if (id === ID.WILDFIRE) { R.buff('wildfire', 10000); s.wf = { n: 0, until: s.t + 10000 }; }
          if (id === ID.DETONATOR && s.wf) { R.remove('wildfire'); J.wfBurst(); }
          if (id === ID.BARREL || id === ID.CHAINSAW) tooltipEffects(R, J, { ...a, eff: { ...(a.eff ?? {}), cost: null } }, ok, {});
          if (id === ID.EXCAVATOR || id === ID.FMF) tooltipEffects(R, J, a, ok, {});
          if (id === ID.REASSEMBLE) R.buff('reassembled', 5000);
          if (id === ID.QUEEN) {
            const b = s.battery; s.battery = 0;
            s.queen = { b, k: Math.max(0, Math.min(1, (b - 50) / 50)), at: s.t, until: s.t + QUEEN_MS, next: s.t + Q_STEP, first: true, ending: null };
            s.stats.queens.push(b);
            R.pet('queen', (QUEEN_MS + Q_STEP * 2.5) / 1000); Au()?.surge();
          }
          if (id === ID.OVERDRIVE && s.queen && !s.queen.ending) { s.queen.until = s.t; s.queen.next = s.t; }
          if (id === ID.FLAMETHROWER) s.flame = { next: s.t + 1000, until: s.t + 10000, mult: R.mult };
          if (id === ID.TACTICIAN) { R.mitigate('party', 0.15, 15, 'タクティシャン'); R.buff('tactician', 15000); }
          if (id === ID.SECONDWIND) R.heal('self', 800 * HEAL_K);
        },
        // ワイルドファイアの爆発（時間切れかデトネーター）
        wfBurst() {
          const s = S(), n = s.wf?.n ?? 0;
          if (s.phase === 'combat' || s.wf) { R.hit(WF_PER * n, `ワイルドファイア（${n} 回）`); s.stats.wfHits.push(n); }
          s.wf = null;
        },
        tick() {
          const s = S();
          if (s.wf && s.t >= s.wf.until) { R.remove('wildfire'); J.wfBurst(); }
          // クイーンの攻撃: ローラーダッシュ → アームパンチ… → パイルバンカー → コレダー → 帰還
          const q = s.queen;
          if (q) {
            while (q && s.t >= q.next) {
              if (q.ending === 'collider') { queenHit(ID.Q_COLLIDER); s.queen = null; R.pet(null, 0); break; } // 帰還
              if (q.ending === 'pile' || s.t >= q.until) { queenHit(ID.Q_PILE); q.ending = 'collider'; q.next = s.t + Q_STEP; continue; }
              queenHit(q.first ? ID.Q_DASH : ID.Q_PUNCH); q.first = false; q.next += Q_STEP;
              if (q.next > q.until) { q.next = q.until; }
            }
          }
          // フレイムスロアー: 毎秒。動くと止まる
          const f = s.flame;
          if (f) {
            if (R.moving()) stopFlame('移動した');
            else {
              while (s.flame && f.next <= s.t && f.next <= f.until) { f.next += 1000; if (s.phase === 'combat') R.dotTick(A[ID.FLAMETHROWER]?.pot?.base ?? 120, f.mult, 'フレイムスロアー'); }
              if (s.flame && s.t >= f.until) s.flame = null;
            }
          }
          // オーバーヒートの残しすぎ（時間切れで消えたスタック）
          if (s.ohPrev && !has('overheated')) { const left = s.ohPrev.stacks ?? 0; if (left > 0 && s.t >= s.ohPrev.until - 30 && s.phase === 'combat') s.stats.ohWasted += left; }
          s.ohPrev = has('overheated') ? { stacks: s.st.overheated.stacks, until: s.st.overheated.until } : null;
        },
        highlightOk: () => true,
        glow(id) {
          const s = S();
          if (id === ID.HYPERCHARGE) return !has('overheated') && (s.heat >= 50 || has('hyperReady'));
          if (id === ID.BLAZING || id === ID.AUTO_CROSSBOW) return has('overheated');
          if (id === ID.EXCAVATOR) return has('excavatorReady');
          if (id === ID.FMF) return has('fmfReady');
          if (id === ID.QUEEN) return !queenOn() && s.battery >= 90;
          return false;
        },
        guide: () => null,
        positional: () => null,
        fxColor: (id) => (id === ID.BLAZING || id === ID.AUTO_CROSSBOW ? 'kenki' : id === ID.WILDFIRE || id === ID.DETONATOR || id === ID.FLAMETHROWER ? 'blood' : id === ID.FMF || id === ID.CHAINSAW || id === ID.EXCAVATOR ? 'namikiri' : id === ID.DRILL || id === ID.AIR_ANCHOR ? 'iai' : 'steel'),
        fxPower: (id) => (id === ID.FMF || id === ID.DETONATOR ? 1.6 : BIG.has(id) ? 1.3 : 1),
        fxCount: () => 1,
        castColor: () => 'steel',
        gcdColor: (id) => (id === ID.BLAZING || id === ID.AUTO_CROSSBOW ? '#ff9a52' : BIG.has(id) ? '#8ff0ff' : null),
        hotOgcd: (id) => [ID.WILDFIRE, ID.HYPERCHARGE, ID.BARREL, ID.QUEEN].includes(id),
        weapon: 'pierce',
        tipCost: (id) => (id === ID.HYPERCHARGE ? ['ヒート', 50] : id === ID.QUEEN ? ['バッテリー', 50] : null),
        report(s) {
          const issues = [], metrics = [], goods = [];
          if (s.stats.heatOver) issues.push({ loss: Math.min(100, s.stats.heatOver) * 0.1, rate: s.stats.heatOver > 20 ? 'bad' : 'ok', title: `ヒートが ${s.stats.heatOver} あふれた`, advice: 'ヒートが 50 以上になったら、あふれる前にハイパーチャージ' });
          if (s.stats.batteryOver) issues.push({ loss: Math.min(100, s.stats.batteryOver) * 0.1, rate: s.stats.batteryOver > 20 ? 'bad' : 'ok', title: `バッテリーが ${s.stats.batteryOver} あふれた`, advice: 'バッテリーが 80 を超えたら、エアアンカー・回転のこぎりの前にオートマトン・クイーン' });
          if (s.stats.ohWasted) issues.push({ loss: s.stats.ohWasted * 2, rate: 'bad', title: `使わずに消えたオーバーヒート ${s.stats.ohWasted}`, advice: 'ハイパーチャージのあとはブレイズショットを 5 回（間にダブルチェック・チェックメイト）' });
          const wf = s.stats.wfHits;
          if (wf.length) metrics.push({ label: 'ワイルドファイア', value: `${wf.join(' / ')} 回（最大 ${WF_MAX}）`, rate: Math.round((wf.reduce((x, y) => x + y, 0) / (wf.length * WF_MAX)) * 100) });
          if (s.stats.queens.length) metrics.push({ label: 'オートマトン・クイーン', value: `バッテリー ${s.stats.queens.join(' / ')}`, rate: null });
          if (s.stats.reassembleOn.length) metrics.push({ label: '整備', value: s.stats.reassembleOn.join('・'), rate: Math.round((s.stats.reassembleOn.filter((n) => [...BIG].some((i) => A[i]?.name === n)).length / s.stats.reassembleOn.length) * 100) });
          if (wf.length && wf.every((n) => n >= WF_MAX)) goods.push(`ワイルドファイアに毎回 ${WF_MAX} 回当てた`);
          return { issues, metrics, goods, overPct: Math.max(0, 100 - Math.min(40, (s.stats.heatOver + s.stats.batteryOver) / 3) - s.stats.ohWasted * 5), posAdvice: '', castAdvice: 'フレイムスロアーは動くと止まる', rangeAdvice: '射程（25m）の中にいる', comboAdvice: 'ヒートスプリットショット → ヒートスラッグショット → ヒートクリーンショット の順に。ドリル・ブレイズショットなどはコンボを切らない' };
        },
        howto: '機工士: ヒートスプリットショット → ヒートスラッグショット → ヒートクリーンショット でヒートとバッテリーをためる。ドリル・エアアンカー・回転のこぎり（→ エクスカベーター）は整備を乗せて使う。ヒート 50 でハイパーチャージ → ブレイズショット 5 回（間にダブルチェック・チェックメイト）。120 秒ごとにワイルドファイア（中にウェポンスキル 6 回）とバレルヒーター（ハイパーチャージ・フルメタルバースト）。バッテリー 50 以上でオートマトン・クイーン。',
        gaugeUI: (D) => window.MockGauge2.create(D.gauge, 'MCH'),
        gaugeDefault: { JobHudMCH0: { x: 70, y: 64, anchor: 4, scale: 1 } },
      };
      return J;
    },
  };

  // ---------------- 踊り子 ----------------
  // 説明文から:
  //   カスケード → ファウンテン（コンボ）、ウィンドミル → ブレードシャワー（コンボ）。カスケード・ウィンドミルで対称投擲、ファウンテン・ブレードシャワー（コンボ時）で
  //     非対称投擲（発動確率 50%・30 秒）。対称投擲でリバースカスケード / ライジングウィンドミル、非対称投擲でファウンテンフォール / ブラッドシャワー（幻扇 50%）
  //   扇の舞い【序】【破】（幻扇 1）: 扇の舞い【急】実行可 50%。【急】【終】は実行可の間
  //   スタンダードステップ（30 秒）/ テクニカルステップ（120 秒）: ダンスモード 15 秒。カスケード系の 4 つのボタンがステップ（薔薇のアンボワテ・小鳥のアントルシャ・
  //     緑葉のジュテ・金冠のピルエッテ）に変わり、ダンスシンボルの順に踏んだ数でフィニッシュの威力と効果量が変わる
  //     （スタンダード: 0〜2 回で威力 360 / 540 / 850・与ダメージ 2 / 5%・60 秒、テクニカル: 0〜4 回で威力 350〜1300・1〜5%・20 秒）。
  //     ダンスモードの間は、ステップ・フィニッシュ・アン・アヴァン・癒やしのワルツ・守りのサンバ・ロールアクションしか使えない
  //   エスプリ（スタンダード / テクニカルフィニッシュのエスプリの間）: カスケード系 +5、リバースカスケード系 +10（特性）。剣の舞い 50
  //   ティラナ（テクニカルフィニッシュのあと）: エスプリ +50。暁の舞い: エスプリ 50 と暁の舞い実行可。ラストダンス: スタンダードフィニッシュ / フィニシングムーブのあと
  //   フラリッシュ（戦闘中）: 対称投擲：フラリッシュ・非対称投擲：フラリッシュ・扇の舞い【急】【終】実行可・フィニシングムーブ実行可（30 秒）
  //   攻めのタンゴ: 流星の舞い実行可（20 秒）。インプロビゼーション: 3 秒ごとに踊りの熱情（最大 4）、フィニッシュのバリアが 5〜10%
  // 公式ジョブガイドの特性から: 幻扇の最大 4。テクニカルフィニッシュ成功でティラナ実行可・暁の舞い実行可、スタンダードフィニッシュ成功でラストダンス実行可。
  //   パーティメンバーのエスプリ効果: 味方がウェポンスキル・魔法を当てると自分のエスプリ +10（発動確率はジョブごと）
  // 仮（GAME-83）: ステップの順は、スタンダードは 4 つから違う 2 つ、テクニカルは 4 つを並べ替えた順（種から決める）。順と違うステップは数えない。
  //   ステップ・テクニカルステップを踏み出す GCD は 1.5 秒。リバースカスケード系は、対称投擲と対称投擲：フラリッシュの両方を消す（非対称も同じ）。
  //   味方のエスプリ: テクニカルフィニッシュの間は 1.25 秒ごとに 50% で +10（8 人パーティの目安）、スタンダードフィニッシュの間はクローズドポジションの相手から
  //   2.5 秒ごとに 30% で +10。成功（1 回以上踏んだ）フィニッシュだけ、ラストダンス・ティラナ・暁の舞い実行可が付く
  const DNC = {
    abbr: 'DNC',
    create(R) {
      const { A } = R;
      const ID = {
        CASCADE: 15989, FOUNTAIN: 15990, REV_CASCADE: 15991, FOUNTAINFALL: 15992, WINDMILL: 15993, BLADESHOWER: 15994, RISING: 15995, BLOODSHOWER: 15996,
        STANDARD_STEP: 15997, TECHNICAL_STEP: 15998, EMBOITE: 15999, ENTRECHAT: 16000, JETE: 16001, PIROUETTE: 16002, STANDARD_FINISH: 16003, TECHNICAL_FINISH: 16004,
        SABER: 16005, CLOSED: 16006, FAN1: 16007, FAN2: 16008, FAN3: 16009, EN_AVANT: 16010, DEVILMENT: 16011, SAMBA: 16012, FLOURISH: 16013,
        IMPROV: 16014, WALTZ: 16015, IMPROV_FINISH: 25789, TILLANA: 25790, FAN4: 25791, STARFALL: 25792, LAST_DANCE: 36983, FINISHING_MOVE: 36984, DAWN: 36985,
        SECONDWIND: 7541, ARMS: 7548, PELOTON: 7557, HEAD_GRAZE: 7551, LEG_GRAZE: 7554, FOOT_GRAZE: 7553,
      };
      const STATUS = {
        symmetry: { name: '対称投擲' }, flow: { name: '非対称投擲' },
        fSymmetry: { name: '対称投擲：フラリッシュ' }, fFlow: { name: '非対称投擲：フラリッシュ' },
        threefold: { name: '扇の舞い【急】実行可' }, fourfold: { name: '扇の舞い【終】実行可' }, finishingReady: { name: 'フィニシングムーブ実行可' },
        standardStep: { name: 'スタンダードステップ' }, technicalStep: { name: 'テクニカルステップ' },
        standardFinish: { name: 'スタンダードフィニッシュ', tracked: true }, technicalFinish: { name: 'テクニカルフィニッシュ' },
        esprit: { name: 'エスプリ' },
        lastDance: { name: 'ラストダンス実行可' }, tillana: { name: 'ティラナ実行可' }, dawn: { name: '暁の舞い実行可' },
        devilment: { name: '攻めのタンゴ' }, starfall: { name: '流星の舞い実行可' },
        closed: { name: 'クローズドポジション' }, improv: { name: '踊りの熱情' }, samba: { name: '守りのサンバ' },
      };
      const S = () => R.S;
      const has = R.has;
      const Au = () => window.MockAudio;
      const STEPS = [ID.EMBOITE, ID.ENTRECHAT, ID.JETE, ID.PIROUETTE];
      // ダンスモードのボタン: カスケード系 → ステップ（説明文「ダンスモード中は「薔薇のアンボワテ」に変化する」）
      const STEP_OF = {
        [ID.CASCADE]: ID.EMBOITE, [ID.WINDMILL]: ID.EMBOITE, [ID.FOUNTAIN]: ID.ENTRECHAT, [ID.BLADESHOWER]: ID.ENTRECHAT,
        [ID.REV_CASCADE]: ID.JETE, [ID.RISING]: ID.JETE, [ID.FOUNTAINFALL]: ID.PIROUETTE, [ID.BLOODSHOWER]: ID.PIROUETTE,
      };
      const BASIC = new Set([ID.CASCADE, ID.FOUNTAIN, ID.WINDMILL, ID.BLADESHOWER]), PROCS = new Set([ID.REV_CASCADE, ID.FOUNTAINFALL, ID.RISING, ID.BLOODSHOWER]);
      const SYM = new Set([ID.REV_CASCADE, ID.RISING]), FLOW = new Set([ID.FOUNTAINFALL, ID.BLOODSHOWER]);
      const DANCE_OK = new Set([...STEPS, ID.STANDARD_FINISH, ID.TECHNICAL_FINISH, ID.EN_AVANT, ID.WALTZ, ID.SAMBA]);
      const FEATHER_MAX = numIn(guideTrait(R, 'Fourfold Fantasy'), /最大スタック数：(\d+)/, 4);
      const chance = (id) => numIn(A[id]?.desc, /発動確率(\d+)％/, 50) / 100;
      // フィニッシュの威力と効果量（説明文「成功回数がN回のとき：威力X および効果量Y％」）
      function finishTable(id) {
        const out = [];
        for (const m of (A[id]?.desc ?? '').matchAll(/成功回数が(\d)回のとき：威力(\d+)(?:および効果量(\d+)％)?/g)) out[Number(m[1])] = { pot: Number(m[2]), pct: Number(m[3] ?? 0) };
        return out;
      }
      const SF_TABLE = finishTable(ID.STANDARD_FINISH), TF_TABLE = finishTable(ID.TECHNICAL_FINISH);
      const FM_PCT = numIn(A[ID.FINISHING_MOVE]?.desc, /効果量：(\d+)％/, 5);
      const IMPROV_PCT = (() => { const t = []; for (const m of (A[ID.IMPROV_FINISH]?.desc ?? '').matchAll(/スタック数が(\d)のとき：対象の最大ＨＰの(\d+)％/g)) t[Number(m[1])] = Number(m[2]); return t.length ? t : [5, 6, 7, 8, 10]; })();
      const dancing = () => !!S().dance && (has('standardStep') || has('technicalStep'));
      let rng = null;
      const rand = () => (rng ??= seeded(R, 77))();
      function gain(key, n, max, overKey) {
        const s = S(), v = s[key] + n;
        if (v > max && s.phase === 'combat') s.stats[overKey] += v - max;
        s[key] = Math.min(max, v);
      }
      const gauges = {
        幻扇: { get: () => S().feathers, set: (v) => { S().feathers = Math.max(0, Math.min(FEATHER_MAX, v)); }, max: FEATHER_MAX },
        エスプリ: { get: () => S().esprit, set: (v) => { S().esprit = Math.max(0, Math.min(100, v)); }, max: 100 },
      };
      function startDance(kind) {
        const s = S(), n = kind === 'standard' ? 2 : 4, pool = [...STEPS], seq = [];
        while (seq.length < n) seq.push(pool.splice(Math.floor(rand() * pool.length), 1)[0]);
        s.dance = { kind, seq, done: 0 };
        s.stats.dances++;
      }
      function stopImprov(why) {
        const s = S();
        if (!s.improv) return;
        if (why) R.addLog('warn', `インプロビゼーションが終わりました（${why}）`);
        s.improv = null; R.remove('improv');
      }
      const J = {
        ids: ID, STATUS,
        charges: descCharges(A), // アン・アヴァン 3（説明文「最大チャージ数」）
        prepull: new Set([ID.CLOSED, ID.STANDARD_STEP, ...STEPS, ID.PELOTON]),
        comboStarters: new Set([ID.CASCADE, ID.WINDMILL]),
        procStatus: {},
        initState(s) {
          s.feathers = 0; s.esprit = 0; s.dance = null; s.sfPct = 0; s.tfPct = 0; s.improv = null; s.partyEsprit = null; s.partnerEsprit = null; s.espritNext = 0;
          s.stats.featherOver = 0; s.stats.espritOver = 0; s.stats.dances = 0; s.stats.stepMiss = 0; s.stats.danceLost = 0; s.stats.finishes = []; s.stats.procLost = 0; s.stats.sabers = 0;
          rng = null;
        },
        gaugeCols: [['幻扇', (s) => s.feathers], ['エスプリ', (s) => s.esprit], ['ステップ', (s) => (s.dance ? `${s.dance.done}/${s.dance.seq.length}` : '')]],
        tracked: [['スタンダードフィニッシュ', 'standardFinish', '#ff9ad8', '60 秒。切れる前にスタンダードステップ（フィニシングムーブ）で付け直す']],
        speed: () => 1,
        // ステップは 1 秒、フィニッシュは 1.5 秒（説明文「実行すると他のウェポンスキルと魔法にこのアクションと同じリキャストタイムが発生する」）。
        // スタンダードステップ・テクニカルステップを踏み出す GCD は 1.5 秒（仮）
        gcdMs: (a) => (STEPS.includes(a.id) || a.id === ID.STANDARD_FINISH || a.id === ID.TECHNICAL_FINISH ? a.recastMs : a.id === ID.STANDARD_STEP || a.id === ID.TECHNICAL_STEP ? 1500 : null),
        comboFree: () => false,
        resolve(id) {
          const s = S();
          if (dancing()) {
            if (STEP_OF[id]) return STEP_OF[id];
            if (id === ID.STANDARD_STEP && s.dance.kind === 'standard') return ID.STANDARD_FINISH;
            if (id === ID.TECHNICAL_STEP && s.dance.kind === 'technical') return ID.TECHNICAL_FINISH;
            return id;
          }
          if (id === ID.STANDARD_STEP && has('finishingReady')) return ID.FINISHING_MOVE;
          if (id === ID.TECHNICAL_STEP && has('tillana')) return ID.TILLANA;
          if (id === ID.SABER && has('dawn') && s.esprit >= 50) return ID.DAWN;
          if (id === ID.IMPROV && s.improv) return ID.IMPROV_FINISH;
          return id;
        },
        blocked(id) {
          const s = S(), a = A[id];
          if (!a) return null;
          if (dancing() && !DANCE_OK.has(id) && !a.isRole) return 'ダンスモード中は使えません（ステップとフィニッシュを先に）';
          if (STEPS.includes(id) && !dancing()) return 'ダンスモード中だけ使えます';
          if ((id === ID.STANDARD_FINISH || id === ID.TECHNICAL_FINISH) && !dancing()) return 'ダンスモード中だけ使えます';
          if (SYM.has(id) && !(has('symmetry') || has('fSymmetry'))) return '「対称投擲」の効果中ではありません';
          if (FLOW.has(id) && !(has('flow') || has('fFlow'))) return '「非対称投擲」の効果中ではありません';
          if ((id === ID.FAN1 || id === ID.FAN2) && s.feathers < 1) return '「幻扇」がありません';
          if (id === ID.SABER && s.esprit < 50) return `エスプリが足りません（必要 50 / 現在 ${s.esprit}）`;
          if (id === ID.DAWN && !(s.esprit >= 50 && has('dawn'))) return '「エスプリ」50 かつ「暁の舞い実行可」の効果中ではありません';
          if (id === ID.FLOURISH && s.phase !== 'combat') return '戦闘中だけ使えます';
          if (id === ID.IMPROV_FINISH && !s.improv) return 'インプロビゼーション中ではありません';
          if ([ID.FAN3, ID.FAN4, ID.STARFALL, ID.LAST_DANCE, ID.TILLANA, ID.FINISHING_MOVE].includes(id)) return tooltipBlocked(R, J, a, {});
          return null;
        },
        castMs: (a, base) => base,
        // 威力: フィニッシュは踏んだステップの数
        potOverride(a) {
          const s = S();
          if (a.id === ID.STANDARD_FINISH) return SF_TABLE[Math.min(2, s.dance?.done ?? 0)]?.pot ?? null;
          if (a.id === ID.TECHNICAL_FINISH) return TF_TABLE[Math.min(4, s.dance?.done ?? 0)]?.pot ?? null;
          return null;
        },
        noHit: (id) => STEPS.includes(id) || id === ID.STANDARD_STEP || id === ID.TECHNICAL_STEP,
        dmgMult: () => (has('standardFinish') ? 1 + S().sfPct / 100 : 1) * (has('technicalFinish') ? 1 + S().tfPct / 100 : 1),
        effects(id, ok) {
          const a = A[id], s = S();
          if (id !== ID.IMPROV && id !== ID.IMPROV_FINISH) stopImprov(s.improv ? a.name : null);
          // エスプリ（エスプリの間。カスケード系 +5、リバースカスケード系 +10）
          if (has('esprit') && (BASIC.has(id) || PROCS.has(id))) gain('esprit', PROCS.has(id) ? 10 : 5, 100, 'espritOver');
          // 投擲（発動確率）
          if (id === ID.CASCADE || id === ID.WINDMILL) { if (rand() < chance(id)) { if (has('symmetry')) s.stats.procLost++; R.buff('symmetry', 30000); } }
          if ((id === ID.FOUNTAIN || id === ID.BLADESHOWER) && ok) { if (rand() < chance(id)) { if (has('flow')) s.stats.procLost++; R.buff('flow', 30000); } }
          if (SYM.has(id)) { R.remove('symmetry'); R.remove('fSymmetry'); }
          if (FLOW.has(id)) { R.remove('flow'); R.remove('fFlow'); }
          if (PROCS.has(id) && rand() < chance(id)) gain('feathers', 1, FEATHER_MAX, 'featherOver');
          if (id === ID.FAN1 || id === ID.FAN2) { s.feathers -= 1; if (rand() < chance(id)) { if (has('threefold')) s.stats.procLost++; R.buff('threefold', 30000); } }
          if (id === ID.FAN3) R.remove('threefold');
          if (id === ID.FAN4) R.remove('fourfold');
          // ダンス
          if (STEPS.includes(id) && s.dance) {
            if (s.dance.seq[s.dance.done] === id) s.dance.done++;
            else { s.stats.stepMiss++; R.addLog('ng', `ステップの順が違います（次は ${A[s.dance.seq[s.dance.done]]?.name ?? 'フィニッシュ'}）`); R.ev('ミス', { action: a.name, result: 'ステップ違い', note: 'ダンスシンボルの順と違う' }); }
          }
          if (id === ID.STANDARD_STEP) { R.buff('standardStep', 15000); startDance('standard'); }
          if (id === ID.TECHNICAL_STEP) { R.buff('technicalStep', 15000); startDance('technical'); }
          if (id === ID.STANDARD_FINISH) {
            const n = Math.min(2, s.dance?.done ?? 0), pct = SF_TABLE[n]?.pct ?? 0;
            if (n > 0) { s.sfPct = pct; R.buff('standardFinish', 60000); R.buff('esprit', Math.max(60000, (s.st.esprit?.until ?? 0) - s.t)); s.partnerEsprit = { until: s.t + 60000 }; R.buff('lastDance', 30000); }
            s.stats.finishes.push(`スタンダード ${n}/2`);
            R.remove('standardStep'); s.dance = null; Au()?.surge();
          }
          if (id === ID.TECHNICAL_FINISH) {
            const n = Math.min(4, s.dance?.done ?? 0), pct = TF_TABLE[n]?.pct ?? 0;
            if (n > 0) { s.tfPct = pct; R.buff('technicalFinish', 20000); R.buff('esprit', Math.max(20000, (s.st.esprit?.until ?? 0) - s.t)); s.partyEsprit = { until: s.t + 20000 }; R.buff('tillana', 30000); R.buff('dawn', 30000); }
            s.stats.finishes.push(`テクニカル ${n}/4`);
            R.remove('technicalStep'); s.dance = null; Au()?.surge();
          }
          if (id === ID.FINISHING_MOVE) {
            R.remove('finishingReady'); s.sfPct = FM_PCT; R.buff('standardFinish', 60000); R.buff('esprit', Math.max(60000, (s.st.esprit?.until ?? 0) - s.t)); s.partnerEsprit = { until: s.t + 60000 }; R.buff('lastDance', 30000);
          }
          if (id === ID.TILLANA) { R.remove('tillana'); const g = descGain(a, 'エスプリ', ok); if (g) gain('esprit', g, 100, 'espritOver'); }
          if (id === ID.SABER) { s.esprit -= 50; s.stats.sabers++; }
          if (id === ID.DAWN) { s.esprit -= 50; R.remove('dawn'); s.stats.sabers++; }
          if (id === ID.LAST_DANCE) R.remove('lastDance');
          if (id === ID.STARFALL) R.remove('starfall');
          if (id === ID.FLOURISH) { for (const k of ['fSymmetry', 'fFlow', 'threefold', 'fourfold', 'finishingReady']) R.buff(k, 30000); Au()?.surge(); }
          if (id === ID.DEVILMENT) { R.buff('devilment', 20000); R.buff('starfall', 20000); Au()?.surge(); }
          if (id === ID.CLOSED) { if (has('closed')) R.remove('closed'); else R.buff('closed', 1e9); }
          if (id === ID.WALTZ) R.heal('party', 300 * HEAL_K);
          if (id === ID.SAMBA) { R.mitigate('party', 0.15, 15, '守りのサンバ'); R.buff('samba', 15000); }
          if (id === ID.IMPROV) { s.improv = { at: s.t, until: s.t + 15000 }; R.buff('improv', 15000, 0); R.hot('party', 100 * HEAL_K, 15, 'インプロビゼーション'); }
          if (id === ID.IMPROV_FINISH && s.improv) {
            const n = Math.min(4, Math.floor((s.t - s.improv.at) / 3000));
            R.shield('party', (IMPROV_PCT[n] ?? 5) / 100, 30, 'インプロビゼーション・フィニッシュ');
            stopImprov(null);
          }
          if (id === ID.SECONDWIND) R.heal('self', 800 * HEAL_K);
        },
        tick() {
          const s = S();
          // ダンスモードの時間切れ（フィニッシュを使わずに 15 秒）
          if (s.dance && !has('standardStep') && !has('technicalStep')) { s.dance = null; if (s.phase === 'combat') { s.stats.danceLost++; R.addLog('ng', 'フィニッシュを使わずにダンスモードが切れました'); } }
          // インプロビゼーション: 3 秒ごとに踊りの熱情。動くと終わる
          if (s.improv) {
            if (R.moving()) stopImprov('移動した');
            else if (s.t >= s.improv.until) stopImprov(null);
            else { const n = Math.min(4, Math.floor((s.t - s.improv.at) / 3000)); if (s.st.improv) s.st.improv.stacks = n; }
          }
          // 味方からのエスプリ（仮）: テクニカルフィニッシュの間は 1.25 秒ごとに 50%、スタンダードフィニッシュの間はクローズドポジションの相手から 2.5 秒ごとに 30%
          if (s.phase === 'combat') {
            if (s.t >= s.espritNext) {
              s.espritNext = s.t + 1250;
              const party = s.partyEsprit && s.t < s.partyEsprit.until, partner = s.partnerEsprit && s.t < s.partnerEsprit.until && has('closed');
              if (party && rand() < 0.5) gain('esprit', 10, 100, 'espritOver');
              else if (!party && partner && Math.floor(s.t / 1250) % 2 === 0 && rand() < 0.3) gain('esprit', 10, 100, 'espritOver');
            }
          }
        },
        highlightOk: () => true,
        glow(id) {
          const s = S();
          if (dancing()) {
            const next = s.dance.seq[s.dance.done];
            if (STEPS.includes(id)) return id === next;
            if (id === ID.STANDARD_FINISH || id === ID.TECHNICAL_FINISH) return next == null;
            return false;
          }
          if (SYM.has(id)) return has('symmetry') || has('fSymmetry');
          if (FLOW.has(id)) return has('flow') || has('fFlow');
          if (id === ID.FAN1 || id === ID.FAN2) return s.feathers >= FEATHER_MAX || (s.feathers > 0 && has('technicalFinish'));
          if (id === ID.FAN3) return has('threefold');
          if (id === ID.FAN4) return has('fourfold');
          if (id === ID.SABER || id === ID.DAWN) return s.esprit >= (has('technicalFinish') ? 50 : 80);
          // ティラナ・フィニシングムーブはボタンが変わったときだけ出る。ラストダンス・流星の舞いは自分のボタンなので、実行可の間だけ
          if (id === ID.TILLANA || id === ID.FINISHING_MOVE) return true;
          if (id === ID.LAST_DANCE) return has('lastDance');
          if (id === ID.STARFALL) return has('starfall');
          return false;
        },
        guide: () => null,
        positional: () => null,
        fxColor: (id) => (STEPS.includes(id) ? 'holy' : id === ID.STANDARD_FINISH || id === ID.FINISHING_MOVE || id === ID.LAST_DANCE ? 'getsu' : id === ID.TECHNICAL_FINISH || id === ID.TILLANA || id === ID.DAWN ? 'namikiri' : id === ID.SABER || id === ID.STARFALL ? 'kenki' : id === ID.FAN3 || id === ID.FAN4 ? 'iai' : 'steel'),
        fxPower: (id) => (id === ID.TECHNICAL_FINISH || id === ID.DAWN || id === ID.STARFALL ? 1.6 : id === ID.STANDARD_FINISH || id === ID.TILLANA || id === ID.SABER ? 1.3 : 1),
        fxCount: (id) => (id === ID.TECHNICAL_FINISH ? 3 : 1),
        castColor: () => 'steel',
        gcdColor: (id) => (STEPS.includes(id) ? '#ffd27a' : id === ID.SABER || id === ID.DAWN ? '#ff9ad8' : null),
        hotOgcd: (id) => [ID.DEVILMENT, ID.FLOURISH, ID.FAN4].includes(id),
        weapon: 'pierce',
        tipCost: (id) => (id === ID.SABER || id === ID.DAWN ? ['エスプリ', 50] : id === ID.FAN1 || id === ID.FAN2 ? ['幻扇', 1] : null),
        report(s) {
          const issues = [], metrics = [], goods = [];
          if (s.stats.featherOver) issues.push({ loss: s.stats.featherOver * 2, rate: 'bad', title: `幻扇が ${s.stats.featherOver} あふれた`, advice: '幻扇が 4 のときは、リバースカスケードなどの前に扇の舞い【序】' });
          if (s.stats.espritOver) issues.push({ loss: Math.min(100, s.stats.espritOver) * 0.1, rate: s.stats.espritOver > 20 ? 'bad' : 'ok', title: `エスプリが ${s.stats.espritOver} あふれた`, advice: 'エスプリが 80 を超えたら剣の舞い' });
          if (s.stats.stepMiss) issues.push({ loss: s.stats.stepMiss * 3, rate: 'bad', title: `ステップの順の違い ${s.stats.stepMiss} 回`, advice: 'ステップゲージ（ダンスシンボル）の順に、光っているステップを' });
          if (s.stats.danceLost) issues.push({ loss: s.stats.danceLost * 5, rate: 'bad', title: `フィニッシュを使わずに切れたダンス ${s.stats.danceLost} 回`, advice: 'ステップを踏み終えたらすぐフィニッシュ（15 秒以内）' });
          if (s.stats.procLost) issues.push({ loss: s.stats.procLost, rate: 'ok', title: `上書きした投擲・扇の舞い【急】実行可 ${s.stats.procLost} 回`, advice: '投擲が付いているときは、先にリバースカスケード・ファウンテンフォールを' });
          if (s.stats.finishes.length) metrics.push({ label: 'フィニッシュ', value: s.stats.finishes.join('・'), rate: null });
          metrics.push({ label: '剣の舞い・暁の舞い', value: `${s.stats.sabers} 回`, rate: null });
          if (!s.stats.stepMiss && !s.stats.danceLost && s.stats.dances > 0) goods.push('ステップを全部順に踏めた');
          return { issues, metrics, goods, overPct: Math.max(0, 100 - s.stats.stepMiss * 5 - s.stats.danceLost * 10 - s.stats.featherOver * 3), posAdvice: '', castAdvice: 'インプロビゼーションは動くと終わる', rangeAdvice: '射程（25m）の中にいる。フィニッシュは自分のまわり 15m', comboAdvice: 'カスケード → ファウンテン（範囲はウィンドミル → ブレードシャワー）。ステップの間はコンボが止まる' };
        },
        howto: '踊り子: カスケード → ファウンテン。投擲が付いたらリバースカスケード・ファウンテンフォール（光る）、幻扇は扇の舞い【序】。スタンダードステップ（30 秒ごと）・テクニカルステップ（120 秒ごと）はステップゲージの順にステップを踏んでからフィニッシュ。テクニカルのあとはティラナ・攻めのタンゴ（流星の舞い）・フラリッシュ・剣の舞い（エスプリ 50）。',
        gaugeUI: (D) => window.MockGauge2.create(D.gauge, 'DNC'),
        gaugeDefault: { JobHudDNC0: { x: 66, y: 60, anchor: 4, scale: 1 }, JobHudDNC1: { x: 66, y: 68, anchor: 4, scale: 1 } },
      };
      return J;
    },
  };

  Object.assign(window.MockJobs, { MCH, DNC });
})();
