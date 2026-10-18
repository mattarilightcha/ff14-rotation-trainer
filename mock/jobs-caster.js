// ジョブの決まり（キャスター: 赤魔道士・ピクトマンサー）。書き方は jobs.js と同じ（create(R) で作る。R は mock.js が渡す道具）。
// 共通の部品は jobs.js の window.MockJobs.lib。値は説明文（抽出データの description と、build-mock-data.mjs が読み取った eff / pot）と
// 公式ジョブガイドのダンプ（特性・ジョブ HUD の説明）から。どちらにもない決まりは「仮」と書き、docs/SPEC.md §10 に載せる。
(function () {
  'use strict';
  const { tooltipBlocked, tooltipEffects, descCharges, numIn, support, actorTickPhase, mpTicks, naturalMp, secAfter, HEAL_K } = window.MockJobs.lib;
  // 発動確率のある効果の乱数は「敵の技の並び」の種から作る（同じ種なら毎回同じ）
  const seeded = (R, salt) => window.MockPixel?.rng?.(((R.OPT.seed ?? 1) * 104729 + salt) | 0) ?? Math.random;
  const MP_MAX = 10000;
  const isSpell = (a) => a?.category === 2;

  // ---------------- 赤魔道士 ----------------
  // 説明文から:
  //   ホワイトマナ・ブラックマナ（0〜100）: 「「ブラックマナ」をN上昇」「「ブラックマナ」と「ホワイトマナ」をN上昇」の値
  //     （ヴァルサンダガ 黒 6・ヴァルエアロガ 白 6・ヴァルファイア 黒 5・ヴァルストーン 白 5・ジョルガ 両方 2・インパクト / ノーブルインパクト 両方 3・
  //     ヴァルサンダラ 黒 7・ヴァルエアロラ 白 7・ヴァルフレア 黒 11・ヴァルホーリー 白 11・スコーチ / レゾリューション 両方 4）
  //   エン〜の技（エンリポスト 20・エンツヴェルクハウ 15・エンルドゥブルマン 15・エンムーリネ・アン 20・ドゥ 15・トロワ 15・エンルプリーズ 5）:
  //     両方のマナがその値以上でボタンが変わり、両方を使う。魔法剣コンボ実行可（マナフィケーション）があれば、マナを使わずに 1 スタック使う（エンルプリーズを除く）
  //   マナスタック（最大 3）: エンリポスト・エンツヴェルクハウ・エンルドゥブルマン・エンムーリネ・アン / ドゥ / トロワの命中で 1 つ。
  //     3 つでヴァルサンダガ・ヴァルサンダラ → ヴァルフレア、ヴァルエアロガ・ヴァルエアロラ → ヴァルホーリー（3 つ使う）。
  //     そのあとジョルガ・インパクトのボタンがスコーチ → レゾリューション（コンボ）
  //   ヴァルサンダガ / ヴァルエアロガ: 50% でヴァルファイア / ヴァルストーン実行可（30 秒）。アクセラレーションのときは必ず
  //   ヴァルフレア / ヴァルホーリー: 20% で実行可。使う前に反対の色のマナが多ければ 100%
  //   アクセラレーション（2 チャージ）: 次の 1 回のヴァルサンダガ・ヴァルエアロガ・インパクトを詠唱なし（20 秒。インパクトは威力 260）、
  //     ノーブルインパクト実行可（30 秒。ジョルガ・インパクトのボタンがノーブルインパクトに）
  //   エンボルデン: 自分の与魔法ダメージ +10%（20 秒）、ブライヤー・クロゼ実行可（30 秒）
  //   マナフィケーション（戦闘中だけ）: 魔法剣コンボ実行可 3 スタック・プリフルジェンス実行可（ボタンがプリフルジェンスに）・エン〜の近接技の射程 25m（30 秒）。コンボを中断する
  // 公式ジョブガイドから: 連続魔（詠唱時間のある魔法を詠唱すると、次の魔法が詠唱なし。15 秒。オートアタックとアビリティ以外の技で消える）。
  //   マナの差が一定以上になると、少ない方のゲージの上昇量が下がる（上の結晶の色が変わる）。マナスタックは魔法カテゴリのアクションを実行すると消える
  // 仮（GAME-84）: 偏りは差 30 以上で、少ない方の上昇は半分（切り捨て）。詠唱なしの効果を使う順は 連続魔 → アクセラレーション → 迅速魔
  //   （アクセラレーションの「必ず実行可」は、アクセラレーションを使ったときだけ）。近接の技（射程 -1）は近接の射程
  const RDM = {
    abbr: 'RDM',
    create(R) {
      const { A } = R;
      const ID = {
        RIPOSTE: 7504, E_RIPOSTE: 7527, ZWERCH: 7512, E_ZWERCH: 7528, REDOUBLEMENT: 7516, E_REDOUBLEMENT: 7529,
        MOULINET: 7513, E_MOULINET: 7530, E_MOULINET2: 37002, E_MOULINET3: 37003, REPRISE: 16529, E_REPRISE: 16528,
        JOLT3: 37004, VT3: 25855, VA3: 25856, VT2: 16524, VA2: 16525, VERFIRE: 7510, VERSTONE: 7511, IMPACT: 16526, GRAND_IMPACT: 37006,
        VERFLARE: 7525, VERHOLY: 7526, SCORCH: 16530, RESOLUTION: 25858,
        CORPS: 7506, DISPLACEMENT: 7515, ENGAGEMENT: 16527, FLECHE: 7517, CONTRE: 7519, ACCEL: 7518, EMBOLDEN: 7520, VICE: 37005,
        MANAFICATION: 7521, PREFULGENCE: 37007, VERCURE: 7514, VERRAISE: 7523, MAGICK_BARRIER: 25857,
        SWIFT: 7561, LUCID: 7562, SURECAST: 7559, ADDLE: 7560, SLEEP: 25880,
      };
      const STATUS = {
        dualcast: { name: '連続魔' },
        verfire: { name: 'ヴァルファイア実行可' }, verstone: { name: 'ヴァルストーン実行可' },
        accel: { name: 'アクセラレーション' }, grandImpact: { name: 'ノーブルインパクト実行可' },
        embolden: { name: 'エンボルデン' }, vice: { name: 'ブライヤー・クロゼ実行可' },
        manafication: { name: 'マナフィケーション' }, swordplay: { name: '魔法剣コンボ実行可' }, prefulgence: { name: 'プリフルジェンス実行可' },
        swift: { name: '迅速魔' }, lucid: { name: 'ルーシッドドリーム' }, surecast: { name: '堅実魔' }, barrier: { name: 'バマジク' },
      };
      const S = () => R.S;
      const has = R.has;
      const Au = () => window.MockAudio;
      let rngFn = null;
      const rng = () => (rngFn ??= seeded(R, 84))();
      // エン〜の技のマナ（説明文「発動条件：「ブラックマナ」20と「ホワイトマナ」20」）
      const ENCH = Object.fromEntries([ID.E_RIPOSTE, ID.E_ZWERCH, ID.E_REDOUBLEMENT, ID.E_MOULINET, ID.E_MOULINET2, ID.E_MOULINET3, ID.E_REPRISE]
        .map((id) => [id, numIn(A[id]?.desc, /「ブラックマナ」(\d+)と/, A[id]?.eff?.cost?.n ?? 20)]));
      const STACK_GAIN = new Set([ID.E_RIPOSTE, ID.E_ZWERCH, ID.E_REDOUBLEMENT, ID.E_MOULINET, ID.E_MOULINET2, ID.E_MOULINET3]); // マナスタックが付く
      const ACCEL_SET = new Set([ID.VT3, ID.VA3, ID.IMPACT]); // アクセラレーションで詠唱なしになる魔法
      const MANA_RANGE = new Set([ID.E_RIPOSTE, ID.E_ZWERCH, ID.E_REDOUBLEMENT]); // マナフィケーションで射程 25m
      const MELEE = new Set([ID.RIPOSTE, ID.E_RIPOSTE, ID.ZWERCH, ID.E_ZWERCH, ID.REDOUBLEMENT, ID.E_REDOUBLEMENT, ID.MOULINET, ID.E_MOULINET, ID.E_MOULINET2, ID.E_MOULINET3, ID.REPRISE, ID.E_REPRISE]);
      const DUAL_MS = numIn(R.D.guide?.traits?.find((t) => t.en === 'Dualcast')?.desc, /効果時間：(\d+)秒/, 15) * 1000;
      const EMB_UP = numIn(A[ID.EMBOLDEN]?.desc, /与魔法ダメージを(\d+)％上昇/, 10);
      const IMBALANCE = 30; // 仮（GAME-84）
      const chance = (id) => numIn(A[id]?.desc, /発動確率(\d+)％/, 50) / 100;
      // 説明文のマナの上昇: { w, b }
      function manaOf(a) {
        const d = a?.desc ?? '';
        const both = numIn(d, /「ブラックマナ」と「ホワイトマナ」を(\d+)上昇/, 0);
        if (both) return { w: both, b: both };
        return { w: numIn(d, /「ホワイトマナ」を(\d+)上昇/, 0), b: numIn(d, /「ブラックマナ」を(\d+)上昇/, 0) };
      }
      // マナを足す。差が 30 以上なら少ない方の上昇は半分（仮）。100 を超えた分はあふれ
      function addMana(w, b) {
        const s = S();
        if (Math.abs(s.white - s.black) >= IMBALANCE) {
          if (s.white < s.black && w) { s.stats.imbalanceLost += w - Math.floor(w / 2); w = Math.floor(w / 2); }
          if (s.black < s.white && b) { s.stats.imbalanceLost += b - Math.floor(b / 2); b = Math.floor(b / 2); }
        }
        const nw = s.white + w, nb = s.black + b;
        if (s.phase === 'combat') s.stats.manaOver += Math.max(0, nw - 100) + Math.max(0, nb - 100);
        s.white = Math.min(100, nw); s.black = Math.min(100, nb);
      }
      function grantProc(k) {
        const s = S();
        if (has(k) && s.phase === 'combat') { s.stats.procLost++; R.addLog('warn', `${STATUS[k].name}を上書きしました`); }
        R.buff(k, 30000);
      }
      const en = (n) => has('swordplay') || (S().white >= n && S().black >= n);
      const comboIs = (...ids) => { const s = S(); return s.combo != null && s.t <= s.comboUntil && ids.includes(s.combo); };
      const J = {
        ids: ID, STATUS,
        charges: descCharges(A), // コル・ア・コル・デプラスマン / アンガジェマン・アクセラレーション「最大チャージ数：2」
        prepull: new Set([ID.VT3, ID.VA3, ID.JOLT3, ID.SWIFT, ID.ACCEL, ID.VERCURE, ID.SURECAST]),
        comboStarters: new Set([ID.RIPOSTE, ID.E_RIPOSTE, ID.E_MOULINET, ID.VERFLARE, ID.VERHOLY]),
        // ヴァルファイア実行可・ヴァルストーン実行可・ノーブルインパクト実行可で光る（抽出データの ActionProcStatus）
        procStatus: { 15: 'verfire', 16: 'verstone', 180: 'grandImpact' },
        initState(s) {
          s.mp = MP_MAX; s.mpTick = actorTickPhase(R); s.white = 0; s.black = 0; s.stacks = 0; rngFn = null;
          Object.assign(s.stats, { manaOver: 0, imbalanceLost: 0, stacksLost: 0, finishers: 0, dualLost: 0, procLost: 0, hardcasts: 0, dualcasts: 0, emboldens: 0, manafications: 0 });
        },
        gaugeCols: [['MP', (s) => Math.floor(s.mp)], ['ホワイトマナ', (s) => s.white], ['ブラックマナ', (s) => s.black], ['マナスタック', (s) => s.stacks]],
        tracked: [],
        speed: () => 1,
        comboFree: () => false,
        // 近接の技（射程 -1）は近接の射程。マナフィケーションの間はエンリポスト・エンツヴェルクハウ・エンルドゥブルマンが 25m
        meleeAuto: (a) => !(MANA_RANGE.has(a.id) && has('manafication')),
        resolve(id) {
          const s = S();
          if (id === ID.RIPOSTE) return en(ENCH[ID.E_RIPOSTE]) ? ID.E_RIPOSTE : id;
          if (id === ID.ZWERCH) return en(ENCH[ID.E_ZWERCH]) ? ID.E_ZWERCH : id;
          if (id === ID.REDOUBLEMENT) return en(ENCH[ID.E_REDOUBLEMENT]) ? ID.E_REDOUBLEMENT : id;
          if (id === ID.MOULINET) {
            if (comboIs(ID.E_MOULINET) && en(ENCH[ID.E_MOULINET2])) return ID.E_MOULINET2;
            if (comboIs(ID.E_MOULINET2) && en(ENCH[ID.E_MOULINET3])) return ID.E_MOULINET3;
            return en(ENCH[ID.E_MOULINET]) ? ID.E_MOULINET : id;
          }
          if (id === ID.REPRISE) return s.white >= ENCH[ID.E_REPRISE] && s.black >= ENCH[ID.E_REPRISE] ? ID.E_REPRISE : id;
          if (id === ID.VT3 || id === ID.VT2) return s.stacks >= 3 ? ID.VERFLARE : id;
          if (id === ID.VA3 || id === ID.VA2) return s.stacks >= 3 ? ID.VERHOLY : id;
          if (id === ID.JOLT3 || id === ID.IMPACT) {
            if (comboIs(ID.SCORCH)) return ID.RESOLUTION;
            if (comboIs(ID.VERFLARE, ID.VERHOLY)) return ID.SCORCH;
            if (has('grandImpact')) return ID.GRAND_IMPACT;
            return id;
          }
          if (id === ID.MANAFICATION && has('prefulgence')) return ID.PREFULGENCE;
          return id;
        },
        blocked(id) {
          const s = S(), a = A[id];
          if (!a) return null;
          if (ENCH[id] && !(has('swordplay') && id !== ID.E_REPRISE)) {
            const n = ENCH[id];
            if (s.white < n || s.black < n) return `マナが足りません（必要 ホワイト ${n}・ブラック ${n} / 現在 ${s.white}・${s.black}）`;
          }
          if ((id === ID.VERFLARE || id === ID.VERHOLY) && s.stacks < 3) return `マナスタックが足りません（${s.stacks} / 3）`;
          if (id === ID.MANAFICATION && s.phase !== 'combat') return '戦闘中だけ使えます';
          if ([ID.VERFIRE, ID.VERSTONE, ID.GRAND_IMPACT, ID.VICE, ID.PREFULGENCE].includes(id)) { const t = tooltipBlocked(R, J, a, {}); if (t) return t; }
          if (isSpell(a) && (a.mp ?? 0) > 0 && s.mp < a.mp) return `MP が足りません（必要 ${a.mp} / 現在 ${Math.floor(s.mp)}）`;
          return null;
        },
        // 詠唱時間: 連続魔・迅速魔は次の 1 回の魔法、アクセラレーションはヴァルサンダガ・ヴァルエアロガ・インパクトを詠唱なし
        castMs(a, base) {
          if (!base || !isSpell(a)) return base;
          if (has('dualcast') || has('swift')) return 0;
          if (ACCEL_SET.has(a.id) && has('accel')) return 0;
          return base;
        },
        // エンボルデン: 与魔法ダメージ +10%（エン〜の技は「無属性魔法攻撃」）
        potMult: (a) => (a.magic && has('embolden') ? 1 + EMB_UP / 100 : 1),
        // インパクト: アクセラレーション時威力（説明文の「〜時威力」。倍率をかけるためにここで返す）
        potOverride: (a) => (a.id === ID.IMPACT && has('accel') ? a.pot?.cond?.[0]?.potency ?? null : null),
        effects(id, ok) {
          const a = A[id], s = S();
          // 連続魔・アクセラレーション・迅速魔（GCD だけ。アビリティでは消えない）
          let accelUsed = false;
          if (a.isGcd) {
            if (isSpell(a) && a.castMs > 0) {
              if (has('dualcast')) { R.remove('dualcast'); s.stats.dualcasts++; }
              else if (ACCEL_SET.has(id) && has('accel')) { R.remove('accel'); accelUsed = true; }
              else if (has('swift')) R.remove('swift');
              else { R.buff('dualcast', DUAL_MS); s.stats.hardcasts++; }
            } else if (has('dualcast')) {
              R.remove('dualcast');
              if (s.phase === 'combat') { s.stats.dualLost++; R.addLog('warn', `${a.name}で連続魔が消えました（次は詠唱のある魔法を詠唱なしで）`); }
            }
          }
          const before = { w: s.white, b: s.black };
          // エン〜の技: マナか魔法剣コンボ実行可を使う
          if (ENCH[id]) {
            if (has('swordplay') && id !== ID.E_REPRISE) { const c = s.st.swordplay; if (c.stacks > 1) c.stacks -= 1; else R.remove('swordplay'); }
            else { s.white = Math.max(0, s.white - ENCH[id]); s.black = Math.max(0, s.black - ENCH[id]); }
          }
          // マナスタック: 魔法カテゴリのアクションで消える（ヴァルフレア・ヴァルホーリーは 3 つ使う）
          if (id === ID.VERFLARE || id === ID.VERHOLY) { s.stacks = 0; s.stats.finishers++; }
          else if (isSpell(a) && s.stacks > 0) { if (s.phase === 'combat') { s.stats.stacksLost += s.stacks; R.addLog('warn', `${a.name}でマナスタック ${s.stacks} つが消えました`); } s.stacks = 0; }
          if (STACK_GAIN.has(id)) s.stacks = Math.min(3, s.stacks + 1);
          // マナ
          const g = manaOf(a);
          if (g.w || g.b) addMana(g.w, g.b);
          // 実行可
          if (id === ID.VT3 || id === ID.VA3) { if (accelUsed || rng() < chance(id)) grantProc(id === ID.VT3 ? 'verfire' : 'verstone'); }
          if (id === ID.VERFLARE || id === ID.VERHOLY) {
            const sure = id === ID.VERFLARE ? before.w > before.b : before.b > before.w;
            if (sure || rng() < chance(id)) grantProc(id === ID.VERFLARE ? 'verfire' : 'verstone');
          }
          if ([ID.VERFIRE, ID.VERSTONE, ID.GRAND_IMPACT, ID.VICE, ID.PREFULGENCE].includes(id)) tooltipEffects(R, J, a, ok, {});
          if (id === ID.ACCEL) { R.buff('accel', secAfter(a.desc ?? '', 0) * 1000); tooltipEffects(R, J, a, ok, {}); }
          if (id === ID.EMBOLDEN) { R.buff('embolden', secAfter(a.desc ?? '', 0) * 1000); tooltipEffects(R, J, a, ok, {}); s.stats.emboldens++; Au()?.buff(); }
          if (id === ID.MANAFICATION) {
            if (s.combo != null) { s.combo = null; s.stats.comboBreaks++; R.addLog('ng', 'コンボ切れ: マナフィケーションでコンボが中断されました'); }
            R.buff('manafication', secAfter(a.desc ?? '', 0) * 1000); tooltipEffects(R, J, a, ok, {}); s.stats.manafications++; Au()?.surge();
          }
          if (id === ID.SWIFT) R.buff('swift', 10000);
          if (id === ID.LUCID) R.buff('lucid', 21000);
          if (id === ID.SURECAST) R.buff('surecast', 6000);
          if (id === ID.MAGICK_BARRIER) { R.mitigate('party', 0.1, 10, 'バマジク'); R.buff('barrier', 10000); }
          if (id === ID.VERCURE) support(R, a);
          if (id === ID.VERRAISE && R.npcDown()) R.raise();
          if (isSpell(a) && (a.mp ?? 0) > 0) s.mp = Math.max(0, s.mp - a.mp);
        },
        tick(dt) {
          const s = S();
          if (s.phase !== 'combat' && s.phase !== 'countdown') return;
          // MP の自然回復（actor tick）と、ルーシッドドリーム（同じ周期で 550）
          for (let n = mpTicks(s, dt); n > 0; n--) s.mp = Math.min(MP_MAX, s.mp + naturalMp(s) + (has('lucid') ? 550 : 0));
        },
        highlightOk: () => true,
        glow(id) {
          const s = S();
          if (id === ID.VERFLARE || id === ID.VERHOLY) return s.stacks >= 3;
          if (id === ID.SCORCH || id === ID.RESOLUTION) return true;
          if (id === ID.VICE) return has('vice');
          if (id === ID.PREFULGENCE) return has('prefulgence');
          // マナスタックが 3 つたまる前の、エン〜の近接（マナが 50 / 50 を超えたら始める目安）
          if (id === ID.E_RIPOSTE) return s.stacks === 0 && (has('swordplay') || (s.white >= 50 && s.black >= 50));
          if (id === ID.E_REPRISE) return false;
          return false;
        },
        guide: () => null,
        positional: () => null,
        fxColor: (id) => (id === ID.VT3 || id === ID.VT2 ? 'getsu' : id === ID.VA3 || id === ID.VA2 ? 'setsu' : id === ID.VERFIRE || id === ID.VERFLARE ? 'kenki' : id === ID.VERSTONE ? 'iai'
          : id === ID.VERHOLY || id === ID.RESOLUTION || id === ID.GRAND_IMPACT || id === ID.PREFULGENCE ? 'holy' : id === ID.SCORCH || id === ID.VICE ? 'ka'
            : MELEE.has(id) ? (ENCH[id] ? 'blood' : 'steel') : 'getsu'),
        fxPower: (id) => (id === ID.VERFLARE || id === ID.VERHOLY || id === ID.RESOLUTION || id === ID.PREFULGENCE ? 1.6 : id === ID.SCORCH || id === ID.GRAND_IMPACT || id === ID.VICE ? 1.4 : 1),
        fxCount: (id) => (id === ID.E_REDOUBLEMENT || id === ID.E_ZWERCH ? 2 : 1),
        castColor: (id) => (id === ID.VA3 || id === ID.VA2 || id === ID.VERSTONE ? 'setsu' : id === ID.VT3 || id === ID.VT2 || id === ID.VERFIRE ? 'kenki' : 'getsu'),
        castPower: 0.5,
        gcdColor: (id) => (ENCH[id] ? '#ff8a8a' : id === ID.VERFLARE || id === ID.VERHOLY || id === ID.SCORCH || id === ID.RESOLUTION ? '#ffd0a0' : id === ID.GRAND_IMPACT ? '#fff0a8' : null),
        hotOgcd: (id) => [ID.EMBOLDEN, ID.MANAFICATION, ID.ACCEL].includes(id),
        // 効果音: 近接の技は刺突（レイピア）。無属性の魔法はエーテル、属性の魔法はデータの属性
        weapon: 'pierce', magicTone: 'aether',
        tipCost: (id) => (ENCH[id] ? ['マナ', `${ENCH[id]} / ${ENCH[id]}`] : A[id] && isSpell(A[id]) && (A[id].mp ?? 0) > 0 ? ['MP', A[id].mp] : null),
        report(s) {
          const issues = [], metrics = [], goods = [];
          if (s.stats.manaOver) issues.push({ loss: Math.min(60, s.stats.manaOver) * 0.15, rate: s.stats.manaOver > 20 ? 'bad' : 'ok', title: `マナが ${s.stats.manaOver} あふれた`, advice: 'マナが 50 / 50 を超えたら、あふれる前にエンリポスト → エンツヴェルクハウ → エンルドゥブルマン' });
          if (s.stats.imbalanceLost) issues.push({ loss: Math.min(40, s.stats.imbalanceLost) * 0.1, rate: s.stats.imbalanceLost > 10 ? 'bad' : 'ok', title: `マナの偏りで減った上昇 ${s.stats.imbalanceLost}`, advice: '少ない方の色の魔法（ヴァルサンダガ / ヴァルエアロガ・実行可）を使い、差を 30 未満に保つ' });
          if (s.stats.stacksLost) issues.push({ loss: s.stats.stacksLost * 3, rate: 'bad', title: `消えたマナスタック ${s.stats.stacksLost}`, advice: '近接のコンボのあとは、ほかの魔法の前にヴァルフレア / ヴァルホーリー' });
          if (s.stats.dualLost) issues.push({ loss: s.stats.dualLost * 2, rate: s.stats.dualLost > 2 ? 'bad' : 'ok', title: `無駄にした連続魔 ${s.stats.dualLost} 回`, advice: '詠唱のある魔法のあとは、ヴァルサンダガ・ヴァルエアロガ（詠唱 5 秒）を連続魔で詠唱なしに' });
          if (s.stats.procLost) issues.push({ loss: s.stats.procLost * 2, rate: 'ok', title: `上書きした実行可 ${s.stats.procLost}`, advice: 'ヴァルファイア実行可・ヴァルストーン実行可は、次の実行可が付く前に使う' });
          metrics.push({ label: 'ヴァルフレア / ヴァルホーリー', value: `${s.stats.finishers} 回`, rate: Math.min(100, s.stats.finishers * 20) });
          const dc = s.stats.hardcasts ? Math.round((s.stats.dualcasts / s.stats.hardcasts) * 100) : null;
          if (dc != null) metrics.push({ label: '連続魔を使った割合', value: `${dc}%（詠唱 ${s.stats.hardcasts} 回 → 連続魔 ${s.stats.dualcasts} 回）`, rate: Math.min(100, dc) });
          if (!s.stats.manaOver && !s.stats.stacksLost && s.stats.gcds > 10) goods.push('マナのあふれ・マナスタックの消失なし');
          return { issues, metrics, goods, overPct: Math.max(0, 100 - Math.min(40, s.stats.manaOver / 2) - s.stats.stacksLost * 8 - s.stats.dualLost * 3), posAdvice: '', comboAdvice: 'エンリポスト → エンツヴェルクハウ → エンルドゥブルマン → ヴァルフレア / ヴァルホーリー → スコーチ → レゾリューションの順に', castAdvice: 'ジョルガなど詠唱のある魔法を詠唱したら、次は連続魔で詠唱 5 秒の魔法を。動くときは連続魔・迅速魔・アクセラレーション・近接の技', rangeAdvice: '魔法は射程（25m）の中で。近接のコンボは敵の目の前で（コル・ア・コルで近づき、デプラスマンで離れる）' };
        },
        howto: '赤魔道士: 詠唱のある魔法（ジョルガ・ヴァルファイア / ヴァルストーン）を詠唱すると連続魔が付き、次の魔法が詠唱なしになる。その連続魔でヴァルサンダガ / ヴァルエアロガを撃ち、ホワイトマナとブラックマナを差 30 未満でためる。50 / 50 を超えたら近づいて エンリポスト → エンツヴェルクハウ → エンルドゥブルマン（マナスタック 3）→ ヴァルフレア / ヴァルホーリー（少ない方の色）→ スコーチ → レゾリューション。エンボルデンとマナフィケーション（マナを使わずに近接のコンボ）は 2 分ごと。',
        gaugeUI: (D) => window.MockGauge2.create(D.gauge, 'RDM'),
        gaugeDefault: { JobHudRDM0: { x: 70, y: 60, anchor: 4, scale: 1 } },
      };
      return J;
    },
  };

  // ---------------- ピクトマンサー ----------------
  // 説明文から:
  //   色魔法: レッドファイア → グリーンエアロ → ブルーウォータ（範囲はファイラ → エアロラ → ウォタラ）。色魔法2実行可・色魔法3実行可（30 秒。単体と範囲で共通）で次へ。
  //     ブルーウォータ / ウォタラでパレットゲージ +25 とホワイトペイント +1（最大 5）。サブトラクティブパレットの間は使えない
  //   サブトラクティブパレット（パレット 50。サブトラクティブパレット実行可なら使わない）: 3 スタック＋色調反転。
  //     シアンブリザド → イエローストーン → マゼンタサンダー（範囲も。詠唱 2.3 秒・リキャスト 3.3 秒）を 1 スタックずつ。色魔法2 / 3 実行可は普通の色魔法と同じ。マゼンタでホワイトペイント +1
  //   ホワイトホーリー: ホワイトペイント 1（色調反転の間は使えない）。ブラックコメット: 色調反転の間、ペイント 1 つ（ブラックペイント）
  //   モチーフ（詠唱 3 秒・GCD 4 秒。戦闘外は詠唱なし）: キャンバスが空のときに描く。ピクトアニマルはポンポン → ウィング → クロー → ファングの順
  //   イマジンアニマル（3 チャージ）: 描いたアニマルの技。アニマルシンボルが付き、ポンポンとウィングでモーグリシンボル（モーグリストリーム）、
  //     4 つそろうとシンボルが消えてマディーンシンボル（マディーンレトリビューション）
  //   イマジンハンマー（戦闘中・2 チャージ）: ハンマーコンボ実行可 3 スタック（30 秒）。ハンマースタンプ → ブラッシュ → ポリッシュ（コンボ。色魔法などはコンボを切らない）
  //   イマジンスカイ（戦闘中・120 秒）: 空間アート。与ダメージ +5%（20 秒）、サブトラクティブパレット実行可（30 秒）、インスタレーション 5 スタック（30 秒）、スタープリズム実行可（20 秒）。
  //     インスタレーション: 空間アートの中で、色魔法・ホワイトホーリー・ブラックコメット・スタープリズムの詠唱とリキャスト −25%（1 回で 1 スタック）。
  //     5 スタック全部使うとレインボードリップ効果アップ（30 秒。レインボードリップが詠唱なし・リキャスト短縮）
  //   レインボードリップ（詠唱 4 秒・GCD 6 秒）: ホワイトペイント +1。テンペラコート: 自分に最大 HP の 20% のバリア（10 秒。吸収しきるとリキャスト −60 秒）。
  //     テンペラグラッサ: コートを外し、自分と周囲に 10% のバリア（自分の分を吸収しきるとコートのリキャスト −30 秒）
  // 公式ジョブガイドから: ブラックペイントは、ホワイトペイントがあって色調反転の間（1 つだけ黒くなる）
  // 利用者の調べ（GAME-70）: 戦闘開始時（コンテンツ突入・全滅後）はモチーフが描いてある前提で、練習は 3 つのキャンバスが描いてある状態で始める（アニマルはポンポン）
  // 仮（GAME-85）: ブラックコメットで色調反転が消える。サブトラクティブパレット・色調反転・モーグリ / マディーンシンボルは使うまで消えない。
  //   空間アートは自分の足元に 20 秒、範囲はイマジンスカイの効果範囲（30m）。レインボードリップ効果アップのリキャストは 2.5 秒。
  //   ハンマーの技の「必ずクリティカルかつダイレクトヒット」は扱わない（クリティカルなどを計算しない）
  const PCT = {
    abbr: 'PCT',
    create(R) {
      const { A } = R;
      const ID = {
        FIRE: 34650, AERO: 34651, WATER: 34652, FIRE2: 34656, AERO2: 34657, WATER2: 34658,
        CYAN: 34653, YELLOW: 34654, MAGENTA: 34655, CYAN2: 34659, YELLOW2: 34660, MAGENTA2: 34661,
        HOLY: 34662, COMET: 34663, SUBTRACTIVE: 34683, RAINBOW: 34688, STAR_PRISM: 34681,
        CREATURE_MOTIF: 34689, POM_MOTIF: 34664, WING_MOTIF: 34665, CLAW_MOTIF: 34666, FANG_MOTIF: 34667,
        LIVING_MUSE: 35347, POM_MUSE: 34670, WING_MUSE: 34671, CLAW_MUSE: 34672, FANG_MUSE: 34673, MOG: 34676, MADEEN: 34677,
        WEAPON_MOTIF: 34690, HAMMER_MOTIF: 34668, STRIKING_MUSE: 35348, HAMMER_MUSE: 34674, STAMP: 34678, BRUSH: 34679, POLISH: 34680,
        LANDSCAPE_MOTIF: 34691, SKY_MOTIF: 34669, SCENIC_MUSE: 35349, STARRY_MUSE: 34675,
        TEMPERA: 34685, GRASSA: 34686, SMUDGE: 34684, SWIFT: 7561, LUCID: 7562, SURECAST: 7559, ADDLE: 7560, SLEEP: 25880,
      };
      const STATUS = {
        aether2: { name: '色魔法2実行可' }, aether3: { name: '色魔法3実行可' },
        subtractive: { name: 'サブトラクティブパレット' }, subReady: { name: 'サブトラクティブパレット実行可' }, monochrome: { name: '色調反転' },
        starry: { name: 'イマジンスカイ' }, hyper: { name: 'インスタレーション' }, rainbow: { name: 'レインボードリップ効果アップ' }, starstruck: { name: 'スタープリズム実行可' },
        hammer: { name: 'ハンマーコンボ実行可' }, moogle: { name: 'モーグリシンボル' }, madeen: { name: 'マディーンシンボル' },
        tempera: { name: 'テンペラコート' }, grassa: { name: 'テンペラグラッサ' }, smudge: { name: 'スマッジ' },
        swift: { name: '迅速魔' }, lucid: { name: 'ルーシッドドリーム' }, surecast: { name: '堅実魔' },
      };
      const S = () => R.S;
      const has = R.has;
      const Au = () => window.MockAudio;
      const FOREVER = 999999999;
      const CREATURES = ['pom', 'wing', 'claw', 'fang'];
      const MOTIF_OF = { pom: ID.POM_MOTIF, wing: ID.WING_MOTIF, claw: ID.CLAW_MOTIF, fang: ID.FANG_MOTIF };
      const MUSE_OF = { pom: ID.POM_MUSE, wing: ID.WING_MUSE, claw: ID.CLAW_MUSE, fang: ID.FANG_MUSE };
      const KIND_OF = Object.fromEntries([...Object.entries(MOTIF_OF), ...Object.entries(MUSE_OF)].map(([k, v]) => [v, k]));
      const MOTIFS = new Set([...Object.values(MOTIF_OF), ID.CREATURE_MOTIF, ID.WEAPON_MOTIF, ID.HAMMER_MOTIF, ID.LANDSCAPE_MOTIF, ID.SKY_MOTIF]);
      const MUSES = new Set(Object.values(MUSE_OF));
      const STEP1 = new Set([ID.FIRE, ID.FIRE2, ID.CYAN, ID.CYAN2]), STEP2 = new Set([ID.AERO, ID.AERO2, ID.YELLOW, ID.YELLOW2]), STEP3 = new Set([ID.WATER, ID.WATER2, ID.MAGENTA, ID.MAGENTA2]);
      const BASE_COLORS = new Set([ID.FIRE, ID.AERO, ID.WATER, ID.FIRE2, ID.AERO2, ID.WATER2]), SUB_COLORS = new Set([ID.CYAN, ID.YELLOW, ID.MAGENTA, ID.CYAN2, ID.YELLOW2, ID.MAGENTA2]);
      const HAMMERS = new Set([ID.STAMP, ID.BRUSH, ID.POLISH]);
      // インスタレーションで速くなる魔法（説明文「インスタレーションを1スタック消費する」）
      const HYPER_SET = new Set(Object.values(A).filter((a) => /インスタレーションを1スタック消費/.test(a.desc ?? '')).map((a) => a.id));
      const HYPER_K = 1 - numIn(A[ID.STARRY_MUSE]?.desc, /リキャストタイムを(\d+)％短縮/, 25) / 100;
      const PALETTE_UP = numIn(A[ID.WATER]?.desc, /「パレットゲージ」を(\d+)上昇/, 25);
      const PAINT_MAX = numIn(A[ID.WATER]?.desc, /最大スタック数：(\d+)/, 5);
      const STARRY_UP = numIn(A[ID.STARRY_MUSE]?.desc, /与ダメージを(\d+)％上昇/, 5);
      const SKY_R = A[ID.STARRY_MUSE]?.effectRange || 30; // 仮（GAME-85）
      const RAINBOW_FAST_MS = 2500; // 仮（GAME-85）
      const comboIs = (...ids) => { const s = S(); return s.combo != null && s.t <= s.comboUntil && ids.includes(s.combo); };
      const useStack = (k) => { const c = R.S.st[k]; if (!c) return; if (c.stacks > 1) c.stacks -= 1; else R.remove(k); };
      const hyperOn = (a) => HYPER_SET.has(a?.id) && has('hyper') && R.inZone('sky');
      function addPaint(n) {
        const s = S();
        if (s.paint + n > PAINT_MAX && s.phase === 'combat') { s.stats.paintOver += s.paint + n - PAINT_MAX; R.addLog('warn', 'ホワイトペイントがあふれました（5 つのまま）'); }
        s.paint = Math.min(PAINT_MAX, s.paint + n);
      }
      // 詠唱なしで出る（迅速魔を使わない）: 戦闘外のモチーフ・レインボードリップ効果アップのレインボードリップ
      const freeCast = (a) => (MOTIFS.has(a.id) && S().phase !== 'combat') || (a.id === ID.RAINBOW && has('rainbow'));
      const J = {
        ids: ID, STATUS,
        charges: descCharges(A), // イマジンアニマル 3・イマジンハンマー 2（説明文「最大チャージ数」）
        prepull: new Set([ID.RAINBOW, ID.FIRE, ID.FIRE2, ID.SWIFT, ID.TEMPERA, ID.SMUDGE, ...MOTIFS, ID.POM_MUSE, ID.WING_MUSE, ID.CLAW_MUSE, ID.FANG_MUSE, ID.LIVING_MUSE]),
        comboStarters: new Set([ID.STAMP]),
        // 光る（抽出データの ActionProcStatus）: ハンマー・スタープリズム・サブトラクティブパレット・レインボードリップ・テンペラグラッサ・ブラックコメット
        procStatus: { 142: 'hammer', 143: 'starstruck', 193: 'subReady', 144: 'rainbow', 145: 'tempera', 192: 'monochrome' },
        initState(s) {
          s.mp = MP_MAX; s.mpTick = actorTickPhase(R); s.palette = 0; s.paint = 0;
          // 戦闘開始時はモチーフを描いてある（GAME-70）
          s.canvas = { creature: 'pom', weapon: true, landscape: true }; s.nextCreature = 1; s.symbols = [];
          Object.assign(s.stats, { paletteOver: 0, paintOver: 0, hyperLeft: 0, muses: 0, portraits: 0, hammers: 0, comets: 0, starry: 0 });
        },
        gaugeCols: [['MP', (s) => Math.floor(s.mp)], ['パレット', (s) => s.palette], ['ペイント', (s) => s.paint], ['キャンバス', (s) => [s.canvas.creature ?? '', s.canvas.weapon ? 'hammer' : '', s.canvas.landscape ? 'sky' : ''].filter(Boolean).join('/')]],
        tracked: [],
        // イマジンスカイは自分の足元に空間アートを置く（抽出データは地面指定だが、置く場所は選ばない: 黒魔紋と同じ）
        instantNow: (id) => id === ID.STARRY_MUSE,
        // インスタレーション（空間アートの中）: 詠唱とリキャスト −25%
        speed: (a) => (hyperOn(a) ? HYPER_K : 1),
        // GCD の長さ: レインボードリップ効果アップのレインボードリップは短い（仮 2.5 秒）
        gcdMs: (a) => (a.id === ID.RAINBOW && has('rainbow') ? RAINBOW_FAST_MS : null),
        comboFree: () => false,
        resolve(id) {
          const s = S();
          if (id === ID.FIRE || id === ID.FIRE2 || id === ID.CYAN || id === ID.CYAN2) {
            const row = { [ID.FIRE]: [ID.FIRE, ID.AERO, ID.WATER], [ID.FIRE2]: [ID.FIRE2, ID.AERO2, ID.WATER2], [ID.CYAN]: [ID.CYAN, ID.YELLOW, ID.MAGENTA], [ID.CYAN2]: [ID.CYAN2, ID.YELLOW2, ID.MAGENTA2] }[id];
            return has('aether3') ? row[2] : has('aether2') ? row[1] : row[0];
          }
          if (id === ID.CREATURE_MOTIF) return MOTIF_OF[CREATURES[s.nextCreature]];
          if (id === ID.LIVING_MUSE) return s.canvas.creature ? MUSE_OF[s.canvas.creature] : id;
          if (id === ID.WEAPON_MOTIF) return ID.HAMMER_MOTIF;
          if (id === ID.STRIKING_MUSE) return s.canvas.weapon ? ID.HAMMER_MUSE : id;
          if (id === ID.LANDSCAPE_MOTIF) return ID.SKY_MOTIF;
          if (id === ID.SCENIC_MUSE) return s.canvas.landscape ? ID.STARRY_MUSE : id;
          if (id === ID.STAMP) return comboIs(ID.BRUSH) ? ID.POLISH : comboIs(ID.STAMP) ? ID.BRUSH : id;
          if (id === ID.MOG) return has('madeen') ? ID.MADEEN : id;
          return id;
        },
        blocked(id) {
          const s = S(), a = A[id];
          if (!a) return null;
          if (BASE_COLORS.has(id) && has('subtractive')) return '「サブトラクティブパレット」の効果中です';
          if (SUB_COLORS.has(id) && !has('subtractive')) return '「サブトラクティブパレット」の効果中ではありません';
          if (STEP2.has(id) && !has('aether2')) return '「色魔法2実行可」の効果中ではありません';
          if (STEP3.has(id) && !has('aether3')) return '「色魔法3実行可」の効果中ではありません';
          if (id === ID.HOLY) { if (s.paint <= 0) return 'ホワイトペイントがありません'; if (has('monochrome')) return '「色調反転」の効果中です（ブラックコメットを使う）'; }
          if (id === ID.COMET && (!has('monochrome') || s.paint <= 0)) return 'ブラックペイントがありません';
          if (id === ID.SUBTRACTIVE) {
            if (has('subtractive')) return '「サブトラクティブパレット」の効果中です';
            if (!has('subReady') && s.palette < 50) return `パレットゲージが足りません（必要 50 / 現在 ${s.palette}）`;
          }
          if (KIND_OF[id] && !MUSES.has(id) && s.canvas.creature) return 'アニマルキャンバスに絵素が描かれています';
          if (KIND_OF[id] && !MUSES.has(id) && KIND_OF[id] !== CREATURES[s.nextCreature]) return `次に描くのは${A[MOTIF_OF[CREATURES[s.nextCreature]]]?.name ?? ''}です`;
          if (id === ID.HAMMER_MOTIF) { if (s.canvas.weapon) return 'ウェポンキャンバスに絵素が描かれています'; if (has('hammer')) return '「ハンマーコンボ実行可」の効果中です'; }
          if (id === ID.SKY_MOTIF) { if (s.canvas.landscape) return 'スケープキャンバスに絵素が描かれています'; if (has('starry')) return '「イマジンスカイ」の効果中です'; }
          if (MUSES.has(id) || id === ID.LIVING_MUSE) { if (!s.canvas.creature) return 'アニマルキャンバスに絵素が描かれていません'; if (MUSES.has(id) && KIND_OF[id] !== s.canvas.creature) return `キャンバスに描いてあるのは${A[MOTIF_OF[s.canvas.creature]]?.name ?? ''}です`; }
          if (id === ID.HAMMER_MUSE || id === ID.STRIKING_MUSE) { if (s.phase !== 'combat') return '戦闘中だけ使えます'; if (!s.canvas.weapon) return 'ウェポンキャンバスに絵素が描かれていません'; }
          if (id === ID.STARRY_MUSE || id === ID.SCENIC_MUSE) { if (s.phase !== 'combat') return '戦闘中だけ使えます'; if (!s.canvas.landscape) return 'スケープキャンバスに絵素が描かれていません'; }
          if (HAMMERS.has(id) || [ID.MOG, ID.MADEEN, ID.STAR_PRISM, ID.GRASSA].includes(id)) { const t = tooltipBlocked(R, J, a, {}); if (t) return t; }
          if (isSpell(a) && (a.mp ?? 0) > 0 && s.mp < a.mp) return `MP が足りません（必要 ${a.mp} / 現在 ${Math.floor(s.mp)}）`;
          return null;
        },
        // 詠唱時間: 迅速魔は次の 1 回の魔法、戦闘外のモチーフとレインボードリップ効果アップのレインボードリップは詠唱なし
        castMs(a, base) {
          if (!base || !isSpell(a)) return base;
          if (freeCast(a) || has('swift')) return 0;
          return base;
        },
        dmgMult: () => (has('starry') ? 1 + STARRY_UP / 100 : 1),
        effects(id, ok) {
          const a = A[id], s = S();
          if (isSpell(a) && a.castMs > 0 && !freeCast(a) && has('swift')) R.remove('swift');
          // インスタレーション: 1 回で 1 スタック。全部使うとレインボードリップ効果アップ
          if (hyperOn(a)) {
            useStack('hyper');
            if (!has('hyper')) { R.buff('rainbow', 30000); R.addLog('ok', 'インスタレーションを使い切りました → レインボードリップ効果アップ'); }
          }
          // 色魔法
          if (SUB_COLORS.has(id)) useStack('subtractive');
          if (STEP1.has(id)) { R.remove('aether3'); R.buff('aether2', 30000); }
          if (STEP2.has(id)) { R.remove('aether2'); R.buff('aether3', 30000); }
          if (STEP3.has(id)) {
            R.remove('aether3'); addPaint(1);
            if (id === ID.WATER || id === ID.WATER2) { const v = s.palette + PALETTE_UP; if (v > 100 && s.phase === 'combat') s.stats.paletteOver += v - 100; s.palette = Math.min(100, v); }
          }
          if (id === ID.HOLY) s.paint = Math.max(0, s.paint - 1);
          if (id === ID.COMET) { s.paint = Math.max(0, s.paint - 1); R.remove('monochrome'); s.stats.comets++; }
          if (id === ID.SUBTRACTIVE) {
            if (has('subReady')) R.remove('subReady'); else s.palette -= 50;
            R.buff('subtractive', FOREVER, 3); R.buff('monochrome', FOREVER);
          }
          // モチーフ
          if (KIND_OF[id] && !MUSES.has(id)) { s.canvas.creature = KIND_OF[id]; s.nextCreature = (CREATURES.indexOf(KIND_OF[id]) + 1) % 4; }
          if (id === ID.HAMMER_MOTIF) s.canvas.weapon = true;
          if (id === ID.SKY_MOTIF) s.canvas.landscape = true;
          // イマジン系
          if (MUSES.has(id)) {
            const k = KIND_OF[id];
            s.canvas.creature = null; s.stats.muses++;
            if (!s.symbols.includes(k)) s.symbols.push(k);
            if (k === 'wing' && s.symbols.includes('pom')) R.buff('moogle', FOREVER);
            if (k === 'fang' && CREATURES.every((c) => s.symbols.includes(c))) { s.symbols = []; R.buff('madeen', FOREVER); }
            R.pet(k === 'pom' || k === 'wing' ? 'moogle' : 'madeen', 2.5); // ポンポン・ウィングはモーグリ、クロー・ファングはマディーンの絵素
          }
          if (id === ID.MOG || id === ID.MADEEN) { tooltipEffects(R, J, a, ok, {}); s.stats.portraits++; R.pet(id === ID.MOG ? 'moogle' : 'madeen', 3); Au()?.surge(); }
          if (id === ID.HAMMER_MUSE) { s.canvas.weapon = false; R.buff('hammer', 30000, 3); }
          if (HAMMERS.has(id)) { useStack('hammer'); s.stats.hammers++; }
          if (id === ID.STARRY_MUSE) {
            s.canvas.landscape = false; s.stats.starry++;
            R.buff('starry', secAfter(a.desc ?? '', 0) * 1000); R.buff('subReady', 30000); R.buff('hyper', 30000, 5); R.buff('starstruck', 20000);
            R.zone('sky', { r: SKY_R, sec: secAfter(a.desc ?? '', 0), ring: true, self: true, col: ['#fff4c8', '#7a8cff'] });
            Au()?.buff();
          }
          // スタープリズム: 対象の周囲 30m のパーティメンバーを回復（回復力 400）
          if (id === ID.STAR_PRISM) { R.remove('starstruck'); if (a.eff?.heal) R.heal('party', a.eff.heal * HEAL_K); }
          if (id === ID.RAINBOW) { addPaint(1); if (has('rainbow')) R.remove('rainbow'); }
          if (id === ID.TEMPERA) { R.shieldSelf(0.2, 10, 'テンペラコート'); R.buff('tempera', 10000); s.coat = { until: s.t + 10000, cut: 60000 }; }
          if (id === ID.GRASSA) {
            R.remove('tempera'); R.unshield?.('self');
            R.shield('party', 0.1, 10, 'テンペラグラッサ'); R.buff('grassa', 10000); s.coat = { until: s.t + 10000, cut: 30000 };
          }
          if (id === ID.SMUDGE) R.buff('smudge', 5000);
          if (id === ID.SWIFT) R.buff('swift', 10000);
          if (id === ID.LUCID) R.buff('lucid', 21000);
          if (id === ID.SURECAST) R.buff('surecast', 6000);
          if (isSpell(a) && (a.mp ?? 0) > 0) s.mp = Math.max(0, s.mp - a.mp);
        },
        tick(dt) {
          const s = S();
          if (!has('starry')) R.zoneEnd('sky');
          // テンペラコート / グラッサ: 自分のバリアを吸収しきったらコートのリキャストを縮める
          if (s.coat) {
            if (s.t >= s.coat.until) s.coat = null;
            else if (R.shieldLeft('self') <= 0.0005) { R.cdShift(ID.TEMPERA, s.coat.cut); R.addLog('ok', `バリアを吸収しきりました（テンペラコートのリキャスト −${s.coat.cut / 1000} 秒）`); s.coat = null; R.remove('tempera'); }
          }
          // 残したインスタレーション（時間切れで消えたスタック）
          if (s.hyperPrev && !has('hyper') && s.t >= s.hyperPrev.until - 30 && s.phase === 'combat') s.stats.hyperLeft += s.hyperPrev.stacks ?? 0;
          s.hyperPrev = has('hyper') ? { stacks: s.st.hyper.stacks, until: s.st.hyper.until } : null;
          if (s.phase !== 'combat' && s.phase !== 'countdown') return;
          for (let n = mpTicks(s, dt); n > 0; n--) s.mp = Math.min(MP_MAX, s.mp + naturalMp(s) + (has('lucid') ? 550 : 0));
        },
        // ブラックコメットはペイントがあるときだけ光る
        highlightOk: (id) => (id === ID.COMET ? S().paint > 0 : true),
        glow(id) {
          const s = S();
          if (STEP2.has(id) || STEP3.has(id)) return true; // 色魔法の続き（ボタンが変わったもの）
          if (id === ID.MOG) return has('moogle');
          if (id === ID.MADEEN) return has('madeen');
          if (id === ID.HOLY) return s.paint >= PAINT_MAX && !has('monochrome');
          if (id === ID.HAMMER_MUSE) return s.phase === 'combat' && !has('hammer');
          if (id === ID.STARRY_MUSE) return s.phase === 'combat';
          if (MUSES.has(id)) return true;
          if (id === ID.SUBTRACTIVE) return !has('subtractive') && (has('subReady') || s.palette >= 50);
          return false;
        },
        guide: () => null,
        positional: () => null,
        fxColor: (id) => ({ [ID.FIRE]: 'kenki', [ID.FIRE2]: 'kenki', [ID.AERO]: 'heal', [ID.AERO2]: 'heal', [ID.WATER]: 'water', [ID.WATER2]: 'water', [ID.CYAN]: 'namikiri', [ID.CYAN2]: 'namikiri', [ID.YELLOW]: 'iai', [ID.YELLOW2]: 'iai', [ID.MAGENTA]: 'ka', [ID.MAGENTA2]: 'ka', [ID.HOLY]: 'holy', [ID.COMET]: 'shoha', [ID.RAINBOW]: 'star', [ID.STAR_PRISM]: 'giant', [ID.MOG]: 'ka', [ID.MADEEN]: 'heal' }[id] ?? (HAMMERS.has(id) ? 'iai' : MUSES.has(id) ? 'getsu' : 'getsu')),
        fxPower: (id) => (id === ID.STAR_PRISM || id === ID.MADEEN || id === ID.MOG || id === ID.COMET || id === ID.RAINBOW ? 1.6 : HAMMERS.has(id) || SUB_COLORS.has(id) ? 1.3 : 1),
        fxCount: () => 1,
        castColor: (id) => ({ [ID.FIRE]: 'kenki', [ID.FIRE2]: 'kenki', [ID.AERO]: 'heal', [ID.AERO2]: 'heal', [ID.WATER]: 'water', [ID.WATER2]: 'water', [ID.CYAN]: 'namikiri', [ID.CYAN2]: 'namikiri', [ID.YELLOW]: 'iai', [ID.YELLOW2]: 'iai', [ID.MAGENTA]: 'ka', [ID.MAGENTA2]: 'ka', [ID.RAINBOW]: 'star' }[id] ?? 'getsu'),
        castPower: 0.5,
        gcdColor: (id) => (STEP1.has(id) ? '#ff9a7a' : STEP2.has(id) ? '#9af0a8' : STEP3.has(id) ? '#8ad0ff' : id === ID.COMET ? '#c89aff' : id === ID.HOLY ? '#fff0b0' : HAMMERS.has(id) ? '#ffd27a' : MOTIFS.has(id) ? '#d8c8ff' : null),
        hotOgcd: (id) => [ID.STARRY_MUSE, ID.HAMMER_MUSE, ID.MOG, ID.MADEEN, ID.SUBTRACTIVE].includes(id),
        weapon: 'blunt', magicTone: 'aether',
        tipCost: (id) => (A[id] && isSpell(A[id]) && (A[id].mp ?? 0) > 0 ? ['MP', A[id].mp] : id === ID.SUBTRACTIVE ? ['パレット', 50] : null),
        report(s) {
          const issues = [], metrics = [], goods = [];
          if (s.stats.paletteOver) issues.push({ loss: Math.min(75, s.stats.paletteOver) * 0.12, rate: s.stats.paletteOver > 25 ? 'bad' : 'ok', title: `パレットゲージが ${s.stats.paletteOver} あふれた`, advice: 'パレットゲージが 50 以上になったら、あふれる前にサブトラクティブパレット' });
          if (s.stats.paintOver) issues.push({ loss: s.stats.paintOver * 2, rate: s.stats.paintOver > 1 ? 'bad' : 'ok', title: `ホワイトペイントのあふれ ${s.stats.paintOver}`, advice: 'ペイントが 5 つになる前にホワイトホーリー（動くときにも便利）' });
          if (s.stats.hyperLeft) issues.push({ loss: s.stats.hyperLeft * 2, rate: 'bad', title: `使わずに消えたインスタレーション ${s.stats.hyperLeft}`, advice: 'イマジンスカイのあとは空間アートの中で色魔法を 5 回（レインボードリップ効果アップを取る）' });
          metrics.push({ label: 'イマジンアニマル', value: `${s.stats.muses} 回（モーグリ / マディーン ${s.stats.portraits} 回）`, rate: Math.min(100, s.stats.muses * 20) });
          metrics.push({ label: 'ハンマー', value: `${s.stats.hammers} 回`, rate: Math.min(100, s.stats.hammers * 17) });
          metrics.push({ label: 'ブラックコメット', value: `${s.stats.comets} 回`, rate: Math.min(100, s.stats.comets * 25) });
          if (!s.stats.paletteOver && !s.stats.paintOver && s.stats.gcds > 10) goods.push('パレットゲージ・ペイントのあふれなし');
          return { issues, metrics, goods, overPct: Math.max(0, 100 - Math.min(40, s.stats.paletteOver / 3) - s.stats.paintOver * 8 - s.stats.hyperLeft * 5), posAdvice: '', comboAdvice: 'レッドファイア → グリーンエアロ → ブルーウォータ（サブトラクティブパレットの間はシアン → イエロー → マゼンタ）、ハンマースタンプ → ブラッシュ → ポリッシュの順に', castAdvice: '動くときは詠唱のない技（ホワイトホーリー・ブラックコメット・ハンマー・スタープリズム）か迅速魔。モチーフは止まっている間か戦闘の前に描く', rangeAdvice: '魔法の射程（25m）の中にいる。イマジンスカイの空間アートの中で色魔法を詠唱する' };
        },
        howto: 'ピクトマンサー: レッドファイア → グリーンエアロ → ブルーウォータの色魔法でパレットゲージとホワイトペイントをためる。パレット 50 でサブトラクティブパレット（シアン → イエロー → マゼンタの強い色魔法と、ブラックコメット）。キャンバスに描いたモチーフをイマジン系で使う: アニマル（4 種の順。そろうとモーグリストリーム / マディーンレトリビューション）・ハンマー（スタンプ → ブラッシュ → ポリッシュ）・スカイ（2 分ごと。空間アートの中で色魔法を 5 回 → レインボードリップ効果アップ・スタープリズム）。空いたキャンバスは手の空いたときにモチーフで描き直す。',
        gaugeUI: (D) => window.MockGauge2.create(D.gauge, 'PCT'),
        gaugeDefault: { JobHudRPM0: { x: 66, y: 58, anchor: 4, scale: 1 }, JobHudRPM1: { x: 76, y: 66, anchor: 4, scale: 1 } },
      };
      return J;
    },
  };

  Object.assign(window.MockJobs, { RDM, PCT });
})();
