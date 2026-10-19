// ジョブの決まり（近接: モンク・竜騎士・忍者・リーパー・ヴァイパー）。書き方は jobs.js と同じ（create(R) で作る。R は mock.js が渡す道具）。
// 共通の部品は jobs.js の window.MockJobs.lib。値は説明文（抽出データの description と、build-mock-data.mjs が読み取った eff / pot）と
// 公式ジョブガイドのダンプ（特性・ジョブ HUD の説明）から。どちらにもない決まりは「仮」と書き、docs/SPEC.md §10 に載せる。
(function () {
  'use strict';
  const { tooltipBlocked, tooltipResolve, tooltipEffects, descCharges, descGain, extendBuff, guideTrait, numIn, HEAL_K, seeded } = window.MockJobs.lib;
  // クリティカルの代わり（仮 GAME-77）: クリティカルの発動率。乱数は「敵の技の並び」の種から作る（同じ種なら毎回同じ）
  const CRIT_RATE = 0.25;

  // ---------------- モンク ----------------
  // 説明文から:
  //   型: 壱の型（猿舞連撃・双竜脚・壊神脚）→ 弐の型（竜頷正拳撃・双掌打・四面脚）→ 参の型（虎襲崩拳・破砕拳・地烈斬）→ 壱の型。
  //     弐・参の技は、その型の間か、零の型（型を無視して追加効果も出る）・踏鳴の間だけ使える
  //   功力: 双竜脚（壱の型の間）で壱の功力 → 猿舞連撃 +200。双掌打で弐の功力 → 竜頷正拳撃 +200。破砕拳で参の功力 2 → 虎襲崩拳 +150（1 つずつ）
  //   猿舞連撃・壊神脚は壱の型の間なら必ずクリティカル
  //   踏鳴（3 スタック）: 型を無視でき、型を付ける技でチャクラが付く（壱の型を付ける技 = 猛虎、弐 = 魔猿、参 = 走竜）。チャクラ 3 つで必殺技:
  //     同じ 3 つ = 真空波（陰の闘気）、異なる 3 つ = 鳳凰の舞（陽の闘気）、それ以外 = 天宙脚（陰、あれば陽）、陰と陽がそろっていれば夢幻闘舞（両方を使う）。
  //     必殺技のあとは零の型
  //   闘気（最大 5。桃園結義の間は 10）: 陰陽闘気斬・万象闘気圏が 5 使う。六合星導脚は全部使い、1 つにつき威力 +80
  //   紅蓮の極意: 与ダメージ 15%（20 秒）と乾坤闘気弾実行可。桃園結義: 与ダメージ 5%（20 秒）と、ウェポンスキルが当たるたびに闘気
  // 公式ジョブガイドの特性から: 闘気はウェポンスキルのクリティカルで 1 つ（Lv74 で 100%）。疾風迅雷でリキャスト 20% 短縮（表の 2 秒に込み）
  // 前提・仮（GAME-77）: 戦闘前に陰陽闘気で闘気 5（非戦闘状態なら 5 スタック）。クリティカルは扱わないので、闘気は発動率 25% の乱数で決める
  //   （必ずクリティカルの技は必ず 1 つ）。踏鳴の間は型が付かない。零の型は型の技を使うと消える。功力の上限は壱・弐が 1、参が 2
  const MNK = {
    abbr: 'MNK',
    create(R) {
      const { A } = R;
      const ID = {
        OPO: 36945, DRAGON: 74, RAPTOR: 36946, TWIN: 61, COEURL: 36947, DEMOLISH: 66, SHADOW: 25767, FOURPT: 16473, ROCK: 70,
        BLITZ: 25764, ELIXIR: 36948, PHOENIX: 25768, CELESTIAL: 25765, PHANTOM: 25769,
        STEELED: 36942, INSPIRITED: 36943, TFC: 3547, ENLIGHTEN: 16474, SSS: 16476, FORMSHIFT: 4262, PB: 69,
        ROF: 7395, BH: 7396, ROW: 25766, ROE: 7394, EARTH: 36944, WIND: 36949, FIRE: 36950, MANTRA: 65, CLAP: 25762,
        SECONDWIND: 7541, BLOODBATH: 7542, TN: 7546, ARMS: 7548, FEINT: 7549, SWEEP: 7863,
      };
      const STATUS = {
        opoForm: { name: '壱の型' }, raptorForm: { name: '弐の型' }, coeurlForm: { name: '参の型' }, formless: { name: '零の型' },
        opoFury: { name: '壱の功力' }, raptorFury: { name: '弐の功力' }, coeurlFury: { name: '参の功力' },
        pb: { name: '踏鳴' },
        rof: { name: '紅蓮の極意', tracked: true },
        bh: { name: '桃園結義：攻撃' },
        bhChakra: { name: '桃園結義：闘気' },
        row: { name: '疾風の極意' },
        roe: { name: '金剛の極意' },
        earthReady: { name: '金剛周天実行可' }, windReady: { name: '絶空拳実行可' }, fireReady: { name: '乾坤闘気弾実行可' },
        tn: { name: 'トゥルーノース' },
        bloodbath: { name: 'ブラッドバス' },
      };
      const S = () => R.S;
      const has = R.has;
      const Au = () => window.MockAudio;
      const FORM_KEY = { opo: 'opoForm', raptor: 'raptorForm', coeurl: 'coeurlForm' };
      const FORM_JA = { opo: '壱の型', raptor: '弐の型', coeurl: '参の型' };
      // 型の技: その技の型と、使ったあとに付く型（説明文の「自身に「◯の型」を付与する」）
      const FORM_ACT = {
        [ID.OPO]: { form: 'opo', next: 'raptor' }, [ID.DRAGON]: { form: 'opo', next: 'raptor' }, [ID.SHADOW]: { form: 'opo', next: 'raptor' },
        [ID.RAPTOR]: { form: 'raptor', next: 'coeurl' }, [ID.TWIN]: { form: 'raptor', next: 'coeurl' }, [ID.FOURPT]: { form: 'raptor', next: 'coeurl' },
        [ID.COEURL]: { form: 'coeurl', next: 'opo' }, [ID.DEMOLISH]: { form: 'coeurl', next: 'opo' }, [ID.ROCK]: { form: 'coeurl', next: 'opo' },
      };
      // チャクラ（踏鳴の間）: 型の技の型 → チャクラ（壱の型を付ける技 = 参の技 → 猛虎、弐 = 壱の技 → 魔猿、参 = 弐の技 → 走竜）
      const BEAST_JA = { opo: '魔猿', raptor: '走竜', coeurl: '猛虎' };
      const BLITZ_SET = new Set([ID.ELIXIR, ID.PHOENIX, ID.CELESTIAL, ID.PHANTOM]);
      const CRIT_OPO = new Set([ID.OPO, ID.SHADOW]); // 壱の型の間は必ずクリティカル
      const WS_CRIT_RATE = numIn(guideTrait(R, 'Deep Meditation II'), /確率が(\d+)％/, 100) / 100; // クリティカルのときに闘気が付く確率（特性）
      const chakraMax = () => (has('bhChakra') ? 10 : 5);
      function addChakra(n) {
        const s = S(), max = chakraMax();
        const over = Math.max(0, s.chakra + n - max);
        if (over > 0 && s.phase === 'combat') s.stats.chakraOver += over;
        s.chakra = Math.min(max, s.chakra + n);
      }
      const formNow = () => (has('opoForm') ? 'opo' : has('raptorForm') ? 'raptor' : has('coeurlForm') ? 'coeurl' : null);
      function setForm(f) { for (const k of Object.values(FORM_KEY)) R.remove(k); if (f) R.buff(FORM_KEY[f], 30000); }
      // おすすめの次の型の技（光らせる・方向指定のガイド）
      function nextFormAct() {
        const s = S();
        if (has('pb')) return null;
        const f = has('formless') ? null : formNow();
        if (f === 'raptor') return has('raptorFury') ? ID.RAPTOR : ID.TWIN;
        if (f === 'coeurl') return (s.st.coeurlFury?.stacks ?? 0) > 0 ? ID.COEURL : ID.DEMOLISH;
        return has('opoFury') ? ID.OPO : ID.DRAGON;
      }
      const J = {
        ids: ID, STATUS,
        charges: descCharges(A), // 踏鳴・トゥルーノース「最大チャージ数：2」、抜重歩法「最大チャージ数：3」
        prepull: new Set([ID.FORMSHIFT, ID.STEELED, ID.INSPIRITED, ID.TN, ID.CLAP, ID.MANTRA, ID.ROE]),
        comboStarters: new Set(),
        procStatus: { 158: 'earthReady', 159: 'windReady', 160: 'fireReady' },
        initState(s) {
          s.chakra = 5; s.beast = []; s.lunar = false; s.solar = false; s.roeHot = false; s.roeHotUntil = 0; s.rng = seeded(R, 7);
          s.stats.chakraOver = 0; s.stats.blitz = 0; s.stats.phantom = 0; s.stats.furyLost = 0; s.stats.formLost = 0; s.stats.tfc = 0;
        },
        gaugeCols: [['闘気', (s) => s.chakra], ['チャクラ', (s) => s.beast.map((b) => BEAST_JA[b]).join('')], ['陰陽', (s) => (s.lunar ? '陰' : '') + (s.solar ? '陽' : '')], ['型', () => (formNow() ? FORM_JA[formNow()] : R.has('formless') ? '零' : '')]],
        tracked: [['紅蓮の極意', 'rof', '#ff9a52', '60 秒ごと。中に必殺技と六合星導脚以外の強い技を入れる']],
        speed: () => 1, // 疾風迅雷の短縮は、ジョブガイドの表のリキャスト（2 秒）に入っている
        comboFree: () => false,
        resolve(id) {
          const s = S();
          if (id === ID.BLITZ && s.beast.length >= 3) {
            if (s.lunar && s.solar) return ID.PHANTOM;
            const kinds = new Set(s.beast).size;
            return kinds === 1 ? ID.ELIXIR : kinds === 3 ? ID.PHOENIX : ID.CELESTIAL;
          }
          return id;
        },
        blocked(id) {
          const s = S(), a = A[id];
          if (!a) return null;
          const fa = FORM_ACT[id];
          if (fa && fa.form !== 'opo' && !has(FORM_KEY[fa.form]) && !has('formless') && !has('pb')) return `「${FORM_JA[fa.form]}」の効果中ではありません`;
          if (id === ID.BLITZ) return `チャクラが 3 つ必要です（現在 ${s.beast.length}）`;
          if ((id === ID.TFC || id === ID.ENLIGHTEN) && s.chakra < 5) return `闘気が足りません（必要 5 / 現在 ${s.chakra}）`;
          if ((id === ID.TFC || id === ID.ENLIGHTEN || id === ID.PB) && s.phase !== 'combat') return '戦闘中だけ使えます';
          if ((id === ID.STEELED || id === ID.INSPIRITED) && s.chakra >= 5) return '闘気が 5 あります';
          if (id === ID.PB && s.beast.length > 0) return 'チャクラが付いている間は使えません';
          if ([ID.EARTH, ID.WIND, ID.FIRE].includes(id)) return tooltipBlocked(R, J, a);
          return null;
        },
        castMs: (a, base) => base,
        // 威力: 虎襲崩拳は「参の功力時かつ側面攻撃時」がある。六合星導脚は闘気 1 つにつき +80
        potOverride(a) {
          if (a.id === ID.COEURL && has('coeurlFury')) { const c = a.pot.cond ?? []; const both = c.find((x) => /側面/.test(x.status)), fury = c.find((x) => !/側面/.test(x.status)); return (R.posNow() === 'flank' || has('tn')) ? both?.potency ?? 520 : fury?.potency ?? 460; }
          if (a.id === ID.SSS) return (a.pot?.base ?? 780) + numIn(a.desc, /上乗せ威力：(\d+)/, 80) * S().chakra;
          return null;
        },
        effects(id) {
          const a = A[id], s = S();
          const fa = FORM_ACT[id];
          if (fa) {
            const pb = has('pb'), formless = has('formless'), bonus = formNow() === fa.form || formless; // 型の追加効果（零の型でも出る）
            // 功力
            if (id === ID.DRAGON && bonus) { if (has('opoFury')) s.stats.furyLost++; R.buff('opoFury', 1e9); }
            if (id === ID.OPO) R.remove('opoFury');
            if (id === ID.TWIN) { if (has('raptorFury')) s.stats.furyLost++; R.buff('raptorFury', 1e9); }
            if (id === ID.RAPTOR) R.remove('raptorFury');
            if (id === ID.DEMOLISH) { s.stats.furyLost += s.st.coeurlFury?.stacks ?? 0; R.buff('coeurlFury', 1e9, 2); }
            if (id === ID.COEURL) { const c = s.st.coeurlFury; if (c) { if ((c.stacks ?? 1) > 1) c.stacks -= 1; else R.remove('coeurlFury'); } }
            s.critOpo = CRIT_OPO.has(id) && bonus; // 壱の型の猿舞連撃・壊神脚は必ずクリティカル
            // 型とチャクラ
            if (pb) {
              s.beast.push(fa.form);
              const p = s.st.pb; if ((p.stacks ?? 1) > 1) p.stacks -= 1; else R.remove('pb');
              setForm(null);
            } else setForm(fa.next);
            if (formless) R.remove('formless');
          }
          // 闘気: ウェポンスキルのクリティカル（クリティカルの代わりに発動率の乱数）と、桃園結義の間はウェポンスキルが当たるたび。
          // 六合星導脚は「実行時に「闘気」の効果が切れる」「クリティカルヒットしても「闘気」が付与されない」（説明文）: 先に闘気を 0 にし、桃園結義の分だけ足す
          if (id === ID.SSS) s.chakra = 0;
          if (a.isGcd && a.pot?.base) {
            if (id !== ID.SSS && (s.critOpo || s.rng() < CRIT_RATE) && s.rng() < WS_CRIT_RATE) addChakra(1);
            if (has('bhChakra')) addChakra(1);
          }
          s.critOpo = false;
          // 必殺技
          if (BLITZ_SET.has(id)) {
            s.stats.blitz++;
            if (id === ID.PHANTOM) { s.lunar = false; s.solar = false; s.stats.phantom++; }
            if (id === ID.ELIXIR) s.lunar = true;
            if (id === ID.PHOENIX) s.solar = true;
            if (id === ID.CELESTIAL) { if (!s.lunar) s.lunar = true; else s.solar = true; }
            s.beast = []; setForm(null); R.buff('formless', 30000);
            Au()?.surge();
          }
          if (id === ID.FORMSHIFT) { setForm(null); R.buff('formless', 30000); }
          if (id === ID.STEELED || id === ID.INSPIRITED) addChakra(s.phase === 'combat' ? 1 : 5);
          if (id === ID.TFC || id === ID.ENLIGHTEN) { s.chakra -= 5; s.stats.tfc++; }
          if (id === ID.PB) R.buff('pb', 20000, 3);
          if (id === ID.ROF) { R.buff('rof', 20000); R.buff('fireReady', 20000); }
          if (id === ID.FIRE) { R.remove('fireReady'); setForm(null); R.buff('formless', 30000); }
          if (id === ID.BH) { R.buff('bh', 20000); R.buff('bhChakra', 20000); }
          if (id === ID.ROW) { R.buff('row', 15000); R.buff('windReady', 15000); }
          if (id === ID.WIND) R.remove('windReady');
          if (id === ID.ROE) { R.mitigate('self', 0.2, 10, '金剛の極意'); R.buff('roe', 10000); R.buff('earthReady', 30000); s.roeHot = false; }
          // 金剛周天「金剛の決意効果中回復力：500」: 金剛の決意（継続回復 15 秒）が付いている間だけ
          if (id === ID.EARTH) { R.remove('earthReady'); R.heal('party', numIn(a.desc, s.t < s.roeHotUntil ? /金剛の決意効果中回復力：(\d+)/ : /回復力：(\d+)/, 300) * HEAL_K); }
          if (id === ID.MANTRA) R.mark('party', 'マントラ', 15, { healUp: 0.1 });
          if (id === ID.SECONDWIND) R.heal('self', 800 * HEAL_K);
          if (id === ID.BLOODBATH) R.buff('bloodbath', 20000);
          if (id === ID.TN) R.buff('tn', 10000);
        },
        // 金剛の極意の間にダメージを受けると金剛の決意（継続回復 回復力 100・15 秒）
        onHurt() {
          const s = S();
          if (has('roe') && !s.roeHot) { s.roeHot = true; s.roeHotUntil = s.t + 15000; R.hot('self', 100 * HEAL_K, 15, '金剛の決意'); }
        },
        tick() {},
        highlightOk: () => true,
        glow(id) {
          const s = S();
          if (id === ID.BLITZ || BLITZ_SET.has(id)) return s.beast.length >= 3;
          if (id === ID.TFC || id === ID.ENLIGHTEN) return s.chakra >= 5 && s.phase === 'combat';
          if (FORM_ACT[id] && s.beast.length < 3) return id === nextFormAct();
          return false;
        },
        // 方向指定のガイド: 次の参の型の技（破砕拳 = 背面・虎襲崩拳 = 側面）
        guide(highlight) {
          for (const id of [ID.DEMOLISH, ID.COEURL]) if (highlight(id)) return A[id].positional;
          return null;
        },
        positional: () => has('tn') && 'トゥルーノース',
        dmgMult: () => (has('bh') ? 1.05 : 1), // 桃園結義：攻撃「与ダメージを5％上昇」（紅蓮の極意は説明文の与ダメージ上昇で mock.js が掛ける）
        fxColor: (id) => (BLITZ_SET.has(id) || id === ID.FIRE ? 'kenki' : id === ID.TFC || id === ID.ENLIGHTEN || id === ID.SSS ? 'shoha' : FORM_ACT[id]?.form === 'opo' ? 'ka' : FORM_ACT[id]?.form === 'raptor' ? 'getsu' : FORM_ACT[id]?.form === 'coeurl' ? 'setsu' : 'steel'),
        fxPower: (id) => (BLITZ_SET.has(id) || id === ID.SSS || id === ID.FIRE ? 1.5 : id === ID.TFC ? 1.3 : 1),
        fxCount: (id) => (id === ID.PHANTOM ? 3 : BLITZ_SET.has(id) ? 2 : 1),
        castColor: () => 'kenki',
        gcdColor: (id) => ({ opo: '#ff8fc4', raptor: '#b08cff', coeurl: '#7fe0a0' })[FORM_ACT[id]?.form] ?? (BLITZ_SET.has(id) ? '#ffc640' : null),
        hotOgcd: (id) => id === ID.TFC || id === ID.ROF || id === ID.BH,
        weapon: 'blunt',
        tipCost: (id) => (id === ID.TFC || id === ID.ENLIGHTEN ? ['闘気', 5] : null),
        report(s) {
          const issues = [], metrics = [], goods = [];
          if (s.stats.chakraOver) issues.push({ loss: s.stats.chakraOver * 1.5, rate: s.stats.chakraOver > 4 ? 'bad' : 'ok', title: `闘気のあふれ ${s.stats.chakraOver}`, advice: '闘気が 5 たまったら陰陽闘気斬で使う（桃園結義の間は 10 まで）' });
          if (s.stats.furyLost) issues.push({ loss: s.stats.furyLost * 2, rate: 'ok', title: `使わずに上書きした功力 ${s.stats.furyLost}`, advice: '双竜脚・双掌打・破砕拳のあとは、同じ型の猿舞連撃・竜頷正拳撃・虎襲崩拳で功力を使ってから付け直す（光っている技を）' });
          metrics.push({ label: '必殺技', value: `${s.stats.blitz} 回（夢幻闘舞 ${s.stats.phantom}）`, rate: null });
          metrics.push({ label: '陰陽闘気斬・万象闘気圏', value: `${s.stats.tfc} 回`, rate: null });
          metrics.push({ label: '闘気のあふれ', value: `${s.stats.chakraOver}`, rate: Math.max(0, 100 - s.stats.chakraOver * 10) });
          if (!s.stats.chakraOver && s.stats.gcds > 10) goods.push('闘気のあふれなし');
          return { issues, metrics, goods, overPct: Math.max(0, 100 - s.stats.chakraOver * 5 - s.stats.furyLost * 5), posAdvice: '破砕拳は背面、虎襲崩拳は側面。足元の色を見て先に回り込む。間に合わないときはトゥルーノース', castAdvice: '', rangeAdvice: '敵が動いたらすぐ追いかける。離れたら抜重歩法', comboAdvice: '型の順（壱 → 弐 → 参）に。光っている技（功力のある方）を使う' };
        },
        howto: 'モンク: 壱の型（双竜脚 / 猿舞連撃）→ 弐の型（双掌打 / 竜頷正拳撃）→ 参の型（破砕拳 = 背面 / 虎襲崩拳 = 側面）を回す。功力のある技が光る。踏鳴の間は型を無視して 3 回でチャクラ 3 つ → 必殺技。闘気 5 で陰陽闘気斬。紅蓮の極意と桃園結義は 60 秒・120 秒ごと。',
        gaugeUI: (D) => window.MockGauge2.create(D.gauge, 'MNK'),
        gaugeDefault: { JobHudMNK0: { x: 64, y: 64, anchor: 4, scale: 1 }, JobHudMNK1: { x: 78, y: 64, anchor: 4, scale: 1 } },
      };
      return J;
    },
  };

  // ---------------- 忍者 ----------------
  // 説明文から:
  //   印（天・地・人。チャージ 2・20 秒を共有）を結んでから忍術: 印 1 つ = 風魔手裏剣、2 つ = 最後が天なら火遁・地なら雷遁・人なら氷遁、
  //     3 つ = 最後が天なら風遁・地なら土遁・人なら水遁。同じ印を 2 回結ぶと失敗。印の効果時間は 6 秒
  //   活殺自在: 印のリキャストに関わらず忍術 1 回・威力 +30%。火遁 → 劫火滅却の術、氷遁 → 氷晶乱流の術
  //   天地人: 6 秒、天・地・人のボタンが忍術に変わり、押すたびに別の忍術（最大 3 種類）。忍術以外は使えない。天理人道実行可（30 秒）
  //   雷遁: 月影雷獣実行可（最大 3・30 秒。ウェポンスキルの近接攻撃で消える）→ 月影雷獣爪 / 牙
  //   風纏: 強甲破点突（コンボ）で 2（最大 5）。旋風刃の威力 +100（1 つ使う）
  //   忍気（最大 100 は仮: GAME-78。説明文・特性に上限の数がない）: 大蝦蟇・六道輪廻・分身の術が 50 使う。毒盛の術 +40（秘技実行可 → 是生滅法・蝦蟇仙）・命水 +50（忍隠を使う。次の六道輪廻 / 是生滅法の威力が上がる）
  //   風遁・水遁で忍隠（20 秒。かくれていなくても百雷銃・命水を 1 回使える）。毒盛の術: 被ダメージ +5%（20 秒）、百雷銃: 自分からの被ダメージ +10%（15 秒）
  //   分身の術（5 スタック・30 秒）: ウェポンスキルのたびに分身が追撃（威力 160、範囲は 80）し、忍気 +5。残影鎌鼬実行可（45 秒）
  // 公式ジョブガイドの特性から: GCD 2.12 秒（攻撃速度アップ込みの表の値）
  // 仮（GAME-78）: 印・忍術のあとの GCD は 0.5 秒（印）/ 1.5 秒（忍術。表の値）。印の途中で忍術以外の技を使うと失敗（うさぎ）。天地人の間は動いても止まらない。
  //   夢幻三段の威力は 3 回分（180 × 3）。土遁は自分の足元に置く
  const NIN = {
    abbr: 'NIN',
    create(R) {
      const { A } = R;
      const ID = {
        SPIN: 2240, GUST: 2242, AEOLIAN: 2255, ARMOR: 3563, DAGGER: 2247, BLOSSOM: 2254, HAKKE: 16488,
        TEN: 2259, CHI: 2261, JIN: 2263, NINJUTSU: 2260, FUMA: 2265, KATON: 2266, RAITON: 2267, HYOTON: 2268, HUTON: 2269, DOTON: 2270, SUITON: 2271,
        GOKA: 16491, HYOSHO: 16492, KASSATSU: 2264, TCJ: 7403, TENRI: 36961, FORKED: 25777, FLEETING: 25778,
        HELLFROG: 7401, BHAVA: 7402, DEATHFROG: 36959, ZESHO: 36960, BUNSHIN: 16493, KAMAITACHI: 25774, MUG: 36957, KUNAI: 36958, MEISUI: 16489,
        DREAM: 3566, HIDE: 2245, SHUKUCHI: 2262, SHADE: 2241,
        SECONDWIND: 7541, BLOODBATH: 7542, TN: 7546, ARMS: 7548, FEINT: 7549, SWEEP: 7863,
      };
      const STATUS = {
        mudra: { name: '印' },
        kassatsu: { name: '活殺自在' },
        tcj: { name: '天地人' },
        tenriReady: { name: '天理人道実行可' },
        raiju: { name: '月影雷獣実行可' },
        shadowWalker: { name: '忍隠' },
        hidden: { name: 'かくれる' },
        meisui: { name: '命水' },
        higi: { name: '秘技実行可' },
        bunshin: { name: '分身の術' },
        kamaitachiReady: { name: '残影鎌鼬実行可' },
        mug: { name: '毒盛の術', target: true, tracked: true },
        kunai: { name: '百雷銃', target: true },
        doton: { name: '土遁の術' },
        shade: { name: '残影' },
        tn: { name: 'トゥルーノース' },
        bloodbath: { name: 'ブラッドバス' },
      };
      const S = () => R.S;
      const has = R.has;
      const Au = () => window.MockAudio;
      const MUDRA = { [ID.TEN]: 'ten', [ID.CHI]: 'chi', [ID.JIN]: 'jin' };
      const MUDRA_JA = { ten: '天', chi: '地', jin: '人' };
      const JUTSU = new Set([ID.FUMA, ID.KATON, ID.RAITON, ID.HYOTON, ID.HUTON, ID.DOTON, ID.SUITON, ID.GOKA, ID.HYOSHO]);
      // 2 つ目・3 つ目の忍術は最後の印で決まる（jutsuFor の逆）。天地人で使った印を、出た忍術から決めるのに使う
      const LAST_MUDRA = { [ID.KATON]: 'ten', [ID.HUTON]: 'ten', [ID.RAITON]: 'chi', [ID.DOTON]: 'chi', [ID.HYOTON]: 'jin', [ID.SUITON]: 'jin' };
      const MELEE_WS = new Set([ID.SPIN, ID.GUST, ID.AEOLIAN, ID.ARMOR, ID.BLOSSOM, ID.HAKKE]); // 月影雷獣実行可が消える近接のウェポンスキル
      // 分身の追撃が範囲（威力 80）になる。残影鎌鼬（抽出データでウェポンスキル・範囲）で追撃が出るかは未確認（仮 GAME-78）
      const AOE_WS = new Set([ID.BLOSSOM, ID.HAKKE, ID.KAMAITACHI]);
      const KASSATSU_UP = 1 + numIn(A[ID.KASSATSU]?.desc, /威力を(\d+)％上昇/, 30) / 100;
      const KAZE_ADD = numIn(A[ID.AEOLIAN]?.desc, /全ての威力が(\d+)上昇/, 100);
      const gauges = { 忍気: { get: () => S().ninki, set: (v) => setNinki(v), max: 100 } };
      function setNinki(v) {
        const s = S(), over = Math.max(0, v - 100);
        if (over > 0 && s.phase === 'combat') s.stats.ninkiOver += over;
        s.ninki = Math.max(0, Math.min(100, v));
      }
      // 印の並び → 忍術（同じ印が 2 回なら失敗 = 'rabbit'）
      function jutsuFor(seq) {
        if (!seq.length) return null;
        if (new Set(seq).size !== seq.length) return 'rabbit';
        const last = seq[seq.length - 1], kas = has('kassatsu');
        if (seq.length === 1) return ID.FUMA;
        if (seq.length === 2) return last === 'ten' ? (kas ? ID.GOKA : ID.KATON) : last === 'chi' ? ID.RAITON : (kas ? ID.HYOSHO : ID.HYOTON);
        return last === 'ten' ? ID.HUTON : last === 'chi' ? ID.DOTON : ID.SUITON;
      }
      const tcjOn = () => { const s = S(); return !!s.tcj && s.tcj.until > s.t; };
      function endTcj() { const s = S(); s.tcj = null; R.remove('tcj'); }
      function failMudra(why) {
        const s = S();
        s.mudras = []; R.remove('mudra'); s.stats.rabbit++;
        R.addLog('ng', `忍術失敗（${why}）`); R.ev('ミス', { result: '忍術失敗', note: why });
      }
      const J = {
        ids: ID, STATUS,
        charges: descCharges(A), // 印・トゥルーノース・縮地「最大チャージ数：2」
        prepull: new Set([ID.TEN, ID.CHI, ID.JIN, ID.NINJUTSU, ...JUTSU, ID.HIDE, ID.TN, ID.SHUKUCHI]), // 忍術のボタンは変化後の忍術（水遁など）で判定される
        comboStarters: new Set([ID.SPIN, ID.BLOSSOM]),
        procStatus: { 58: 'raiju', 163: 'shadowWalker', 164: 'higi', 165: 'tenriReady' },
        ownDots: true, // 土遁の範囲は自分で持つ
        initState(s) {
          s.ninki = 0; s.kaze = 0; s.mudras = []; s.tcj = null; s.dots = {};
          s.stats.ninkiOver = 0; s.stats.kazeOver = 0; s.stats.kazeUsed = 0; s.stats.rabbit = 0; s.stats.jutsu = 0; s.stats.raijuLost = 0; s.stats.bunshinHits = 0;
        },
        gaugeCols: [['忍気', (s) => s.ninki], ['風纏', (s) => s.kaze], ['印', (s) => s.mudras.map((m) => MUDRA_JA[m]).join('')]],
        tracked: [['毒盛の術', 'mug', '#c890ff', '120 秒ごと。中に強い技（是生滅法・天理人道など）を入れる']],
        speed: () => 1, // 攻撃速度アップの短縮は、ジョブガイドの表のリキャスト（2.12 秒）に入っている
        // 印のあとの GCD は 0.5 秒（仮 GAME-78）。天地人の忍術は表の 1.5 秒
        gcdMs: (a) => (MUDRA[a.id] ? 500 : null),
        // 印の硬直: 応答の遅れ（既定 50ms）と合わせて印の GCD（0.5 秒）と同じになるように（仮 GAME-78）
        animLockMs: { [ID.TEN]: 450, [ID.CHI]: 450, [ID.JIN]: 450 },
        comboFree: () => false,
        resolve(id) {
          const s = S();
          if (MUDRA[id] && tcjOn()) {
            const seq = [...s.tcj.used, MUDRA[id]];
            const j = jutsuFor(seq);
            return typeof j === 'number' ? j : id;
          }
          if (id === ID.NINJUTSU) { const j = jutsuFor(s.mudras); return typeof j === 'number' ? j : id; }
          if (id === ID.TCJ && has('tenriReady') && !tcjOn()) return ID.TENRI;
          if (id === ID.BHAVA && has('higi')) return ID.ZESHO;
          if (id === ID.HELLFROG && has('higi')) return ID.DEATHFROG;
          return id;
        },
        blocked(id) {
          const s = S(), a = A[id];
          if (!a) return null;
          if (tcjOn() && !JUTSU.has(id) && !MUDRA[id]) return '天地人の間は忍術以外を使えません';
          if (MUDRA[id] && tcjOn() && s.tcj.used.includes(MUDRA[id])) return `天地人: ${MUDRA_JA[MUDRA[id]]}の印は使いました`;
          if (id === ID.NINJUTSU && !s.mudras.length) return '印を結んでいません';
          if (id === ID.TCJ && has('kassatsu')) return '活殺自在の効果中は使えません';
          if (id === ID.HIDE && s.phase === 'combat') return '戦闘中は使えません';
          if (id === ID.KUNAI && !has('hidden') && !has('shadowWalker')) return '「かくれる」か「忍隠」の効果中ではありません';
          if (id === ID.MEISUI && (!has('shadowWalker') || s.phase !== 'combat')) return '「忍隠」の効果中ではありません（戦闘中だけ使えます）';
          if ((id === ID.FORKED || id === ID.FLEETING) && !has('raiju')) return '「月影雷獣実行可」の効果中ではありません';
          if (id === ID.KAMAITACHI && !has('kamaitachiReady')) return '「残影鎌鼬実行可」の効果中ではありません';
          if (id === ID.TENRI && !has('tenriReady')) return '「天理人道実行可」の効果中ではありません';
          const c = a.eff?.cost;
          if (c?.gauge === '忍気' && s.ninki < c.n) return `忍気が足りません（必要 ${c.n} / 現在 ${s.ninki}）`;
          return null;
        },
        // 2 つ目からの印・活殺自在の間の印・天地人の忍術は、印のチャージを使わない
        freeUse: (id) => (MUDRA[id] ? S().mudras.length > 0 || has('kassatsu') || tcjOn() : false),
        castMs: (a, base) => base,
        // 威力: 夢幻三段は 3 回分、活殺自在の忍術は +30%
        potOverride: (a) => (a.id === ID.DREAM ? (a.pot?.base ?? 180) * 3 : null),
        potMult: (a) => (JUTSU.has(a.id) && has('kassatsu') ? KASSATSU_UP : 1),
        potAdd: (a, ok) => (a.id === ID.AEOLIAN && S().kaze > 0 ? KAZE_ADD : 0),
        dmgMult: () => (has('mug') ? 1.05 : 1) * (has('kunai') ? 1.1 : 1),
        // 失敗した忍術（うさぎ）は攻撃しない。分身の術も自分は攻撃しない（説明文の威力 160 は分身の追撃）。
        // 土遁の術は範囲を置くだけ（「範囲内に入った対象に…ダメージ」: 3 秒ごとに tick で。暗黒騎士のソルトアースと同じ）
        noHit: (id) => id === ID.NINJUTSU || id === ID.BUNSHIN || id === ID.DOTON,
        effects(id, ok) {
          const a = A[id], s = S();
          // かくれる「スプリント以外のアクションを実行するか再使用で解除する」（印も含む）
          if (id !== ID.HIDE && id !== ID.KUNAI && has('hidden')) R.remove('hidden');
          // 印
          if (MUDRA[id] && !tcjOn()) {
            s.mudras.push(MUDRA[id]); R.buff('mudra', 6000);
            if (s.mudras.length > 3) failMudra('印が多すぎる');
            return;
          }
          if (id === ID.NINJUTSU) { failMudra(s.mudras.length ? '印の順番' : '印なし'); return; }
          // 印の途中で忍術以外を使うと失敗
          if (s.mudras.length && !JUTSU.has(id)) failMudra(`印の途中で${a.name}`);
          // 忍術
          if (JUTSU.has(id)) {
            s.stats.jutsu++;
            if (tcjOn()) {
              // 1 つ目（風魔手裏剣）はどの印からでも出るので押した印のボタンで、2 つ目からは出た忍術で決める
              // （「変化させない」設定で別に置いた忍術のボタンを押したときも、正しい印が使用済みになるように）
              const m = LAST_MUDRA[id] ?? MUDRA[s.pressBase] ?? ['ten', 'chi', 'jin'].find((x) => !s.tcj.used.includes(x));
              s.tcj.used.push(m);
              if (s.tcj.used.length >= 3) endTcj();
            }
            else { s.mudras = []; R.remove('mudra'); }
            if (has('kassatsu') && !tcjOn()) R.remove('kassatsu');
            if (id === ID.RAITON) { const r = s.st.raiju; R.buff('raiju', 30000, Math.min(3, (r && r.until > s.t ? r.stacks ?? 1 : 0) + 1)); }
            if (id === ID.HUTON || id === ID.SUITON) R.buff('shadowWalker', (a.eff?.grant?.[0]?.sec ?? 20) * 1000);
            if (id === ID.DOTON) {
              R.zone('doton', { r: a.effectRange || 5, sec: 18, ring: true, self: true, col: ['#f4e0b0', '#a8783a'] });
              s.dots.doton = { until: s.t + 18000, next: s.t + 3000, potency: a.pot?.base ?? 80, mult: R.mult, name: a.name };
              R.buff('doton', 18000);
            }
            Au()?.surge();
          }
          // 忍気（説明文の「「忍気」をN上昇」。コンボボーナスはコンボ時だけ）。分身の術の +5 は分身の攻撃の命中の分（下の追撃で足す）
          const g = id === ID.BUNSHIN ? 0 : descGain(a, '忍気', ok);
          if (g) setNinki(s.ninki + g);
          if (a.eff?.cost?.gauge === '忍気') setNinki(s.ninki - a.eff.cost.n);
          // 風纏
          if (id === ID.ARMOR && ok) { const over = Math.max(0, s.kaze + 2 - 5); s.stats.kazeOver += over; s.kaze = Math.min(5, s.kaze + 2); }
          if (id === ID.AEOLIAN && s.kaze > 0) { s.kaze -= 1; s.stats.kazeUsed++; }
          // 月影雷獣
          if (MELEE_WS.has(id) && has('raiju')) { s.stats.raijuLost += s.st.raiju.stacks ?? 1; R.remove('raiju'); R.addLog('warn', '月影雷獣実行可が近接のウェポンスキルで消えました'); }
          if (id === ID.FORKED || id === ID.FLEETING) { const r = s.st.raiju; if (r) { if ((r.stacks ?? 1) > 1) r.stacks -= 1; else R.remove('raiju'); } }
          // 分身の術の追撃（ウェポンスキルのたび）
          if (a.isGcd && !JUTSU.has(id) && a.pot?.base && has('bunshin')) {
            const b = s.st.bunshin;
            R.hit(AOE_WS.has(id) ? 80 : 160, '分身の術'); R.pet('act'); setNinki(s.ninki + 5); s.stats.bunshinHits++;
            if ((b.stacks ?? 1) > 1) b.stacks -= 1; else R.remove('bunshin');
          }
          if (id === ID.BUNSHIN) { R.buff('bunshin', 30000, 5); R.buff('kamaitachiReady', 45000); R.pet('bunshin', 30); }
          if (id === ID.KAMAITACHI) { R.remove('kamaitachiReady'); R.pet('act'); }
          if (id === ID.KASSATSU) R.buff('kassatsu', 15000);
          if (id === ID.TCJ) { s.tcj = { until: s.t + 6000, used: [] }; R.buff('tcj', 6000); R.buff('tenriReady', 30000); s.mudras = []; R.remove('mudra'); Au()?.surge(); }
          if (id === ID.TENRI) R.remove('tenriReady');
          if (id === ID.MUG) { R.buff('mug', 20000); R.buff('higi', 30000); }
          if (id === ID.ZESHO || id === ID.DEATHFROG) R.remove('higi');
          if (id === ID.BHAVA || id === ID.ZESHO) R.remove('meisui');
          if (id === ID.KUNAI) { R.buff('kunai', 15000); if (has('hidden')) R.remove('hidden'); else R.remove('shadowWalker'); }
          if (id === ID.MEISUI) { R.remove('shadowWalker'); R.buff('meisui', 30000); }
          if (id === ID.HIDE) { R.buff('hidden', 1e9); R.cdShift(ID.TEN, 1e9); }
          if (id === ID.SHADE) R.shieldSelf(0.2, 20, '残影');
          if (id === ID.SECONDWIND) R.heal('self', 800 * HEAL_K);
          if (id === ID.BLOODBATH) R.buff('bloodbath', 20000);
          if (id === ID.TN) R.buff('tn', 10000);
        },
        tick() {
          const s = S();
          if (s.mudras.length && !has('mudra')) { s.mudras = []; R.addLog('warn', '印の効果時間が切れました'); }
          if (s.tcj && s.tcj.until <= s.t) endTcj();
          // 土遁（3 秒ごと。敵が範囲の中にいる間）
          for (const k of Object.keys(s.dots)) {
            const d = s.dots[k];
            while (d.next <= s.t && d.next <= d.until) { d.next += 3000; if (s.phase === 'combat' && R.zoneHitsBoss('doton')) R.dotTick(d.potency, d.mult, d.name); }
            if (d.until < s.t) delete s.dots[k];
          }
        },
        highlightOk: () => true,
        glow(id) {
          const s = S();
          if (id === ID.NINJUTSU || JUTSU.has(id)) return s.mudras.length > 0 && typeof jutsuFor(s.mudras) === 'number';
          if (MUDRA[id] && tcjOn()) return !s.tcj.used.includes(MUDRA[id]);
          if (id === ID.KAMAITACHI) return has('kamaitachiReady');
          if ((id === ID.BHAVA || id === ID.ZESHO) && s.ninki >= 50) return s.ninki >= 85 || has('higi');
          return false;
        },
        // 方向指定のガイド: 風断ちのあと。風纏が少なければ強甲破点突（側面）、多ければ旋風刃（背面）
        guide(highlight) {
          if (highlight(ID.AEOLIAN) || highlight(ID.ARMOR)) return S().kaze <= 1 ? A[ID.ARMOR].positional : A[ID.AEOLIAN].positional;
          return null;
        },
        positional: () => has('tn') && 'トゥルーノース',
        fxColor: (id) => (id === ID.KATON || id === ID.GOKA || id === ID.HELLFROG || id === ID.DEATHFROG ? 'kenki' : id === ID.RAITON || id === ID.FORKED || id === ID.FLEETING ? 'getsu' : id === ID.HYOTON || id === ID.HYOSHO || id === ID.SUITON ? 'setsu' : id === ID.HUTON || id === ID.KAMAITACHI ? 'shoha' : id === ID.TENRI || id === ID.ZESHO || id === ID.BHAVA ? 'holy' : 'steel'),
        fxPower: (id) => (JUTSU.has(id) || id === ID.TENRI || id === ID.ZESHO ? 1.4 : 1),
        fxCount: (id) => (id === ID.DREAM ? 3 : 1),
        castColor: () => 'steel',
        gcdColor: (id) => (JUTSU.has(id) ? '#ffd27a' : id === ID.FORKED || id === ID.FLEETING ? '#9c90ff' : null),
        hotOgcd: (id) => id === ID.ZESHO || id === ID.BHAVA || id === ID.TENRI || id === ID.MUG,
        weapon: 'slash',
        tipCost: (id) => (A[id]?.eff?.cost?.gauge === '忍気' ? ['忍気', A[id].eff.cost.n] : null),
        report(s) {
          const issues = [], metrics = [], goods = [];
          if (s.stats.ninkiOver) issues.push({ loss: Math.min(100, s.stats.ninkiOver) * 0.1, rate: s.stats.ninkiOver > 30 ? 'bad' : 'ok', title: `忍気が ${s.stats.ninkiOver} あふれた`, advice: '忍気が 50 を超えたら六道輪廻で使う。毒盛の術（+40）・命水（+50）の前は 50 以下にしておく' });
          if (s.stats.rabbit) issues.push({ loss: s.stats.rabbit * 4, rate: 'bad', title: `忍術の失敗 ${s.stats.rabbit} 回`, advice: '印は同じものを 2 回結ばない。印の途中でほかの技を使わない' });
          if (s.stats.raijuLost) issues.push({ loss: s.stats.raijuLost * 3, rate: 'bad', title: `使わずに消えた月影雷獣 ${s.stats.raijuLost}`, advice: '雷遁のあとは、双刃旋などの近接の技より先に月影雷獣牙（爪）を使う' });
          metrics.push({ label: '忍術', value: `${s.stats.jutsu} 回（失敗 ${s.stats.rabbit}）`, rate: null });
          metrics.push({ label: '風纏', value: `${s.stats.kazeUsed} 回使った（あふれ ${s.stats.kazeOver}）`, rate: null });
          metrics.push({ label: '分身の追撃', value: `${s.stats.bunshinHits} 回`, rate: null });
          if (!s.stats.rabbit && s.stats.jutsu > 2) goods.push('忍術の失敗なし');
          return { issues, metrics, goods, overPct: Math.max(0, 100 - s.stats.rabbit * 15 - Math.min(50, s.stats.ninkiOver / 2)), posAdvice: '旋風刃は背面、強甲破点突は側面。風纏が 1 以下なら強甲破点突で足す', castAdvice: '', rangeAdvice: '敵が動いたらすぐ追いかける。離れたら月影雷獣爪（急接近）や投刃', comboAdvice: '双刃旋 → 風断ち → 旋風刃 / 強甲破点突の順に。印と忍術はコンボを切らない' };
        },
        howto: '忍者: 双刃旋 → 風断ち → 旋風刃（背面）/ 強甲破点突（側面。風纏 +2）。印を結んで忍術（天地 = 雷遁、地天 = 火遁、天地人 = 水遁）。雷遁のあとは月影雷獣牙。忍気 50 で六道輪廻、毒盛の術のあとは是生滅法。天地人は 3 つの忍術を続けて。',
        gaugeUI: (D) => window.MockGauge2.create(D.gauge, 'NIN'),
        gaugeDefault: { JobHudNIN0: { x: 66, y: 64, anchor: 4, scale: 1 }, JobHudNIN1: { x: 80, y: 64, anchor: 4, scale: 1 } },
      };
      return J;
    },
  };

  // ---------------- 竜騎士 ----------------
  // 説明文から:
  //   コンボ 2 本: トゥルースラスト → スラストラッシュ → ヘヴンスラスト → 竜牙竜爪（側面）→ 雲蒸竜変
  //               トゥルースラスト → スパイラルブロウ（竜槍）→ 桜華繚乱（背面・継続ダメージ）→ 竜尾大車輪（背面）→ 雲蒸竜変
  //     雲蒸竜変は、竜牙竜爪・竜尾大車輪をコンボで使った直後に、そのボタンが変わる。コンボボーナスで竜眼（30 秒）
  //   範囲: ドゥームスパイク → ソニックスラスト（竜槍）→ クルザントーメント（竜眼）
  //   竜眼の間はトゥルースラストが竜眼雷電、ドゥームスパイクが竜眼蒼穹に変わる（竜眼を使い、天竜眼 +1。最大 2）。天竜点睛は天竜眼 2 を使う
  //   竜槍: 与ダメージ 10%（30 秒）。ランスチャージ: 10%（20 秒）。ゲイルスコグル: 紅の竜血（与ダメージ 15%・20 秒）とナーストレンド実行可（20 秒）
  //   スターダイバー: 紅の竜血の間だけ。スタークロッサー実行可（20 秒。紅の竜血が切れると消える）
  //   ハイジャンプ → ミラージュダイブ実行可（15 秒）。ドラゴンダイブ → ドラゴンライズ実行可（30 秒）
  //   イルーシブジャンプ: 15m 後ろへ跳び、ピアシングタロン効果アップ（15 秒。ピアシングタロンの威力 350）
  //   ライフサージ: 次のウェポンスキル 1 回が必ずクリティカル（5 秒）。バトルリタニー: クリティカル発動率 +10%（20 秒）
  // 公式ジョブガイドの特性から（ランスマスタリー）: 竜眼は「ウェポンスキルによる近接攻撃を実行すると解除される」
  // 前提・仮（GAME-79）: クリティカルは扱わないので、ライフサージ・バトルリタニーはダメージを変えない（ライフサージを乗せた技は結果に出す）。
  //   竜眼が消える近接のウェポンスキルは、竜眼雷電・竜眼蒼穹（竜眼を使う）とピアシングタロン（遠隔）以外のウェポンスキル。
  //   ナーストレンド・ドラゴンライズ・スタークロッサーは、抽出データに変化元が無く、サンプルのホットバーにも無いので「未配置」のボタン
  const DRG = {
    abbr: 'DRG',
    create(R) {
      const { A } = R;
      const ID = {
        TRUE: 75, LANCE_BARRAGE: 36954, HEAVENS: 25771, SPIRAL: 36955, CHAOTIC: 25772, FANG: 3554, WHEELING: 3556, DRAKESBANE: 36952, RAIDEN: 16479,
        DOOM: 86, SONIC: 7397, COERTHAN: 16477, DRACONIAN: 25770, PIERCING: 90,
        LIFE_SURGE: 83, LANCE_CHARGE: 85, LITANY: 3557, GEIRSKOGUL: 3555, NASTROND: 7400, HIGH_JUMP: 16478, MIRAGE: 7399,
        DRAGONFIRE: 96, RISE: 36953, STARDIVER: 16480, STARCROSS: 36956, WYRMWIND: 25773, ELUSIVE: 94, WINGED: 36951,
        SECONDWIND: 7541, BLOODBATH: 7542, TN: 7546, ARMS: 7548, FEINT: 7549, SWEEP: 7863,
      };
      const STATUS = {
        lanceCharge: { name: 'ランスチャージ' },
        powerSurge: { name: '竜槍', tracked: true },
        lotd: { name: '紅の竜血' },
        draconianFire: { name: '竜眼' },
        nastrondReady: { name: 'ナーストレンド実行可' },
        starcrossReady: { name: 'スタークロッサー実行可' },
        mirageReady: { name: 'ミラージュダイブ実行可' },
        riseReady: { name: 'ドラゴンライズ実行可' },
        talonUp: { name: 'ピアシングタロン効果アップ' },
        lifeSurge: { name: 'ライフサージ' },
        litany: { name: 'バトルリタニー' },
        chaotic: { name: '桜華繚乱', target: true, tracked: true },
        tn: { name: 'トゥルーノース' },
        bloodbath: { name: 'ブラッドバス' },
      };
      const S = () => R.S;
      const has = R.has;
      const Au = () => window.MockAudio;
      // 付与の効果時間（説明文の「自身に「◯」を付与する。効果時間：N秒」）
      const grantMs = (id, st, d) => (A[id]?.eff?.grant?.find((g) => g.status === st)?.sec ?? d) * 1000;
      const LOTD_MS = numIn(A[ID.GEIRSKOGUL]?.desc, /「紅の竜血」状態に変化する。\s*効果時間：(\d+)秒/, 20) * 1000;
      const SURGE_MS = numIn(A[ID.LIFE_SURGE]?.desc, /効果時間：(\d+)秒/, 5) * 1000;
      const FOCUS_MAX = numIn(guideTrait(R, 'Lance Mastery III'), /最大スタック数：(\d+)/, 2);
      // ライフサージを乗せるとよい技: ウェポンスキルで一番威力の高いもの（ヘヴンスラスト 460・雲蒸竜変 460）
      const wsPot = (a) => Math.max(a.pot?.base ?? 0, a.pot?.combo ?? 0);
      const TOP_POT = Math.max(...Object.values(A).filter((a) => a.forJob && a.isGcd).map(wsPot));
      const SURGE_BEST = new Set(Object.values(A).filter((a) => a.forJob && a.isGcd && wsPot(a) === TOP_POT).map((a) => a.id));
      // 使わずに切れたら数える実行可（と竜眼）
      const PROCS = ['nastrondReady', 'starcrossReady', 'mirageReady', 'riseReady', 'draconianFire'];
      const gauges = { 天竜眼: { get: () => S().focus, set: (v) => { S().focus = v; }, max: FOCUS_MAX } };
      const comboAt = (...ids) => { const s = S(); return s.combo != null && ids.includes(s.combo) && s.t <= s.comboUntil; };
      function grant(k, ms) { R.buff(k, ms); S().procOn[k] = true; }
      function consume(k) { S().procOn[k] = false; R.remove(k); }
      const J = {
        ids: ID, STATUS,
        charges: descCharges(A), // ライフサージ・ウィンググライド・トゥルーノース「最大チャージ数：2」
        prepull: new Set([ID.TN, ID.ELUSIVE]),
        comboStarters: new Set([ID.TRUE, ID.RAIDEN, ID.DOOM, ID.DRACONIAN]),
        procStatus: { 6: 'talonUp', 13: 'mirageReady', 32: 'draconianFire', 161: 'riseReady', 162: 'starcrossReady', 187: 'nastrondReady' },
        ownDots: true, // 桜華繚乱の継続ダメージは「コンボボーナス」なので、コンボのときだけ付ける
        initState(s) {
          s.focus = 0; s.procOn = {};
          s.stats.focusOver = 0; s.stats.fireLost = 0; s.stats.procLost = 0; s.stats.surge = 0; s.stats.surgeGood = 0; s.stats.wyrmwind = 0; s.stats.lotd = 0;
        },
        gaugeCols: [['天竜眼', (s) => s.focus], ['紅の竜血', (s) => (R.has('lotd') ? `${Math.ceil((s.st.lotd.until - s.t) / 1000)} 秒` : '')]],
        tracked: [['竜槍', 'powerSurge', '#7fb4ff', '切れる前にスパイラルブロウのコンボで更新（30 秒）'], ['桜華繚乱', 'chaotic', '#ff7a6a', 'スパイラルブロウ → 桜華繚乱のコンボで付け直す（24 秒）']],
        speed: () => 1,
        comboFree: () => false,
        // 竜眼の間はトゥルースラスト → 竜眼雷電・ドゥームスパイク → 竜眼蒼穹。竜牙竜爪・竜尾大車輪をコンボで使った直後は雲蒸竜変
        resolve: (id) => tooltipResolve(R, J, id),
        blocked(id) {
          const a = A[id];
          if (!a) return null;
          if (id === ID.DRAKESBANE && !comboAt(ID.FANG, ID.WHEELING)) return '竜牙竜爪か竜尾大車輪をコンボで使った直後だけ使えます';
          if (id === ID.MIRAGE && !has('mirageReady')) return '「ミラージュダイブ実行可」の効果中ではありません';
          if ([ID.RAIDEN, ID.DRACONIAN, ID.NASTROND, ID.RISE, ID.STARCROSS, ID.STARDIVER, ID.WYRMWIND].includes(id)) return tooltipBlocked(R, J, a, gauges);
          return null;
        },
        castMs: (a, base) => base,
        effects(id, ok) {
          const a = A[id], s = S();
          // ライフサージ: 次のウェポンスキル 1 回
          if (a.isGcd && a.pot?.base && has('lifeSurge')) {
            R.remove('lifeSurge'); s.stats.surge++;
            if (SURGE_BEST.has(id)) s.stats.surgeGood++;
            else R.addLog('warn', `ライフサージを${a.name}に使いました（${[...SURGE_BEST].map((x) => A[x].name).join('・')}がおすすめ）`);
          }
          // 竜眼: 竜眼雷電・竜眼蒼穹で使う。ほかの近接のウェポンスキルでは消える
          if (a.isGcd && id !== ID.PIERCING && has('draconianFire')) {
            if (id !== ID.RAIDEN && id !== ID.DRACONIAN) { s.stats.fireLost++; R.addLog('warn', `竜眼が${a.name}で消えました（先に竜眼雷電を）`); R.ev('ミス', { action: a.name, result: '竜眼を無駄に', note: '竜眼雷電の前に別のウェポンスキル' }); }
            consume('draconianFire');
          }
          if ((id === ID.DRAKESBANE || id === ID.COERTHAN) && ok) grant('draconianFire', grantMs(id, '竜眼', 30));
          if ((id === ID.SPIRAL || id === ID.SONIC) && ok) R.buff('powerSurge', grantMs(id, '竜槍', 30));
          if (id === ID.RAIDEN || id === ID.DRACONIAN) {
            if (s.focus >= FOCUS_MAX) { s.stats.focusOver++; R.addLog('warn', '天竜眼があふれました（2 つで天竜点睛）'); }
            s.focus = Math.min(FOCUS_MAX, s.focus + 1);
          }
          if (id === ID.WYRMWIND) { s.focus -= A[id].eff?.cost?.n ?? 2; s.stats.wyrmwind++; }
          // 桜華繚乱の継続ダメージ（コンボボーナス）
          if (id === ID.CHAOTIC && ok && a.pot?.dot) {
            s.dot = { next: s.t + 3000, until: s.t + a.pot.dot.sec * 1000, potency: a.pot.dot.potency, mult: R.mult, name: a.name };
            R.buff('chaotic', a.pot.dot.sec * 1000);
          }
          // アビリティ
          if (id === ID.LANCE_CHARGE) R.buff('lanceCharge', (a.eff?.dmgUp?.sec ?? 20) * 1000);
          if (id === ID.LITANY) R.buff('litany', numIn(a.desc, /効果時間：(\d+)秒/, 20) * 1000);
          if (id === ID.LIFE_SURGE) R.buff('lifeSurge', SURGE_MS);
          if (id === ID.GEIRSKOGUL) { R.buff('lotd', LOTD_MS); grant('nastrondReady', grantMs(id, 'ナーストレンド実行可', 20)); s.stats.lotd++; Au()?.surge(); }
          if (id === ID.NASTROND) consume('nastrondReady');
          if (id === ID.STARDIVER) { grant('starcrossReady', grantMs(id, 'スタークロッサー実行可', 20)); R.leap?.(3.2, 1); Au()?.surge(); }
          if (id === ID.STARCROSS) consume('starcrossReady');
          if (id === ID.HIGH_JUMP) { grant('mirageReady', grantMs(id, 'ミラージュダイブ実行可', 15)); R.leap?.(2.4, 0.8); }
          if (id === ID.MIRAGE) consume('mirageReady');
          if (id === ID.DRAGONFIRE) { grant('riseReady', grantMs(id, 'ドラゴンライズ実行可', 30)); R.leap?.(2.8, 0.9); }
          if (id === ID.RISE) consume('riseReady');
          if (id === ID.ELUSIVE) { R.buff('talonUp', grantMs(id, 'ピアシングタロン効果アップ', 15)); R.leap?.(1.6, 0.6); }
          if (id === ID.PIERCING) R.remove('talonUp');
          if (id === ID.SECONDWIND) R.heal('self', 800 * HEAL_K);
          if (id === ID.BLOODBATH) R.buff('bloodbath', 20000);
          if (id === ID.TN) R.buff('tn', 10000);
        },
        tick() {
          const s = S();
          if (!has('lotd') && has('starcrossReady')) R.remove('starcrossReady'); // 紅の竜血が切れると消える
          // 使わずに切れた実行可
          for (const k of PROCS) {
            if (!s.procOn[k] || has(k)) continue;
            s.procOn[k] = false;
            if (s.phase !== 'combat') continue;
            if (k === 'draconianFire') s.stats.fireLost++; else s.stats.procLost++;
            R.addLog('ng', `${STATUS[k].name}を使わずに切らしました`); R.ev('ミス', { result: '効果切れ', note: `${STATUS[k].name}を使わなかった` });
          }
        },
        highlightOk: () => true,
        glow: (id) => id === ID.WYRMWIND && S().focus >= FOCUS_MAX,
        // 方向指定のガイド: 次の方向指定の技（竜牙竜爪 = 側面、桜華繚乱・竜尾大車輪 = 背面）。ヘヴンスラストの次は竜牙竜爪なので側面
        guide(highlight) {
          for (const id of [ID.CHAOTIC, ID.WHEELING, ID.FANG]) if (highlight(id)) return A[id].positional;
          if (highlight(ID.HEAVENS)) return A[ID.FANG].positional;
          return null;
        },
        positional: () => has('tn') && 'トゥルーノース',
        fxColor: (id) => ([ID.GEIRSKOGUL, ID.NASTROND, ID.STARDIVER, ID.STARCROSS, ID.DRAGONFIRE, ID.RISE].includes(id) ? 'kenki' : [ID.RAIDEN, ID.DRACONIAN, ID.WYRMWIND].includes(id) ? 'shoha' : [ID.CHAOTIC, ID.DRAKESBANE].includes(id) ? 'ka' : [ID.HIGH_JUMP, ID.MIRAGE].includes(id) ? 'setsu' : 'steel'),
        fxPower: (id) => (id === ID.STARCROSS || id === ID.STARDIVER ? 1.6 : id === ID.NASTROND || id === ID.RISE || id === ID.WYRMWIND ? 1.4 : 1),
        fxCount: (id) => (id === ID.STARCROSS ? 3 : id === ID.STARDIVER ? 2 : 1),
        castColor: () => 'steel',
        gcdColor: (id) => (id === ID.RAIDEN || id === ID.DRACONIAN ? '#b070ff' : id === ID.DRAKESBANE ? '#ff78b6' : null),
        hotOgcd: (id) => [ID.LANCE_CHARGE, ID.LITANY, ID.GEIRSKOGUL, ID.STARDIVER].includes(id),
        weapon: 'slash',
        tipCost: (id) => (id === ID.WYRMWIND ? ['天竜眼', A[id].eff?.cost?.n ?? 2] : null),
        report(s) {
          const issues = [], metrics = [], goods = [];
          const best = [...SURGE_BEST].map((x) => A[x].name).join('・');
          if (s.stats.fireLost) issues.push({ loss: s.stats.fireLost * 3, rate: 'bad', title: `使わずに消えた竜眼 ${s.stats.fireLost}`, advice: '雲蒸竜変のあとの GCD は竜眼雷電（トゥルースラストのボタン）。ほかのウェポンスキルを先に使うと消える' });
          if (s.stats.procLost) issues.push({ loss: s.stats.procLost * 3, rate: 'bad', title: `使わずに切らした実行可 ${s.stats.procLost}`, advice: '紅の竜血の間にナーストレンドとスターダイバー → スタークロッサー。ハイジャンプのあとはミラージュダイブ、ドラゴンダイブのあとはドラゴンライズ' });
          if (s.stats.focusOver) issues.push({ loss: s.stats.focusOver * 2, rate: 'ok', title: `天竜眼のあふれ ${s.stats.focusOver}`, advice: '天竜眼が 2 つたまったら天竜点睛（光っている）を使う' });
          if (s.stats.surge > s.stats.surgeGood) issues.push({ loss: (s.stats.surge - s.stats.surgeGood) * 1.5, rate: 'ok', title: `ライフサージを弱い技に ${s.stats.surge - s.stats.surgeGood} 回`, advice: `ライフサージは${best}の直前に使う` });
          metrics.push({ label: 'ライフサージ', value: `${s.stats.surge} 回（${best} ${s.stats.surgeGood}）`, rate: null });
          metrics.push({ label: '天竜点睛', value: `${s.stats.wyrmwind} 回（あふれ ${s.stats.focusOver}）`, rate: null });
          metrics.push({ label: '紅の竜血', value: `${s.stats.lotd} 回`, rate: null });
          if (!s.stats.fireLost && !s.stats.procLost && s.stats.gcds > 10) goods.push('竜眼・実行可を無駄にしていない');
          return { issues, metrics, goods, overPct: Math.max(0, 100 - s.stats.fireLost * 10 - s.stats.procLost * 10 - s.stats.focusOver * 5), posAdvice: '竜牙竜爪は側面、桜華繚乱・竜尾大車輪は背面。ヘヴンスラストの間に側面へ、スパイラルブロウの間に背面へ回っておく。間に合わないときはトゥルーノース', castAdvice: '', rangeAdvice: '離れたらピアシングタロン（イルーシブジャンプのあとは威力が上がる）でつなぎ、ウィンググライドで戻る', comboAdvice: 'スラストラッシュ → ヘヴンスラスト → 竜牙竜爪 → 雲蒸竜変 と、スパイラルブロウ → 桜華繚乱 → 竜尾大車輪 → 雲蒸竜変 を交互に（始めはトゥルースラスト / 竜眼雷電）' };
        },
        howto: '竜騎士: トゥルースラスト（竜眼の間は竜眼雷電）から 2 本のコンボを交互に。スラストラッシュ → ヘヴンスラスト → 竜牙竜爪（側面）、スパイラルブロウ → 桜華繚乱（背面）→ 竜尾大車輪（背面）。最後は雲蒸竜変（竜牙竜爪・竜尾大車輪のボタンが変わる）。天竜眼 2 で天竜点睛。ゲイルスコグルで紅の竜血 → ナーストレンド・スターダイバー → スタークロッサー。ハイジャンプ → ミラージュダイブ、ドラゴンダイブ → ドラゴンライズ。',
        gaugeUI: (D) => window.MockGauge2.create(D.gauge, 'DRG'),
        gaugeDefault: { JobHudDRG0: { x: 66, y: 64, anchor: 4, scale: 1 } },
      };
      return J;
    },
  };

  // ---------------- リーパー ----------------
  // 説明文から:
  //   コンボ: スライス → ワクシングスライス → インファナルスライス（範囲: スピニングサイズ → ナイトメアサイズ）。ソウルゲージ +10 ずつ（2 段目からはコンボ時）
  //   ソウルスライス / ソウルサイズ: ソウル +50（固有のリキャスト 30 秒・チャージ 2）。ハルパー・ハーベストムーン: ソウル +10
  //   ソウル 50: ストークスウェーズ / シーフスウェーズ → 妖異の鎌（1 スタック・30 秒）。グラトニー（60 秒）→ 処刑人（2 スタック・30 秒）。妖異の鎌と処刑人は同時に付かない
  //   妖異の鎌でジビトゥ（側面）/ ギャロウズ（背面）/ ギロティン、処刑人でエクスジビトゥ / エクスギャロウズ / エクスギロティン。シュラウド +10。
  //     ジビトゥ → ギャロウズ効果アップ（ストークスウェーズがギャロウズクロウに）、ギャロウズ → ジビトゥ効果アップ（60 秒）
  //   シュラウド 50: レムールシュラウド → レムール（30 秒。レムールソウル 5）とサクリフィキウム実行可。レムールの間はボタンが変わる:
  //     ジビトゥ → ヴォイドリーパー・ギャロウズ → クロスリーパー・ギロティン → グリムリーパー（レムールソウル 1 → ヴォイドソウル 1。GCD 1.5 秒）、
  //     ストークスウェーズ → レムールスライス（ヴォイドソウル 2）、グラトニー → サクリフィキウム、コムニオ（レムールの最後。レムールが切れる）
  //   シャドウ・オブ・デス: デスデザイン（与ダメージ +10%・30 秒。最大 60 秒まで延長）
  //   アルケインサークル: 与ダメージ +3%（20 秒）と死の供儀（6 秒）。死の供物（最大 8）でプレンティフルハーベスト（威力 720〜1000）
  //     → レムールシュラウド実行可（シュラウドなしでレムール）とペルフェクティオ待機（コムニオ → ペルフェクティオ実行可 → ペルフェクティオ）
  //   ソウルソウ（詠唱 5 秒。戦闘外は詠唱なし）→ ハーベストムーン。ヘルズイングレス / イーグレス: 15m 移動・ハルパー効果アップ（ハルパーが詠唱なし）・
  //     リターン（ヘルズゲートへ戻る）。アルケインクレスト: 最大 HP 10% のバリア（5 秒）。吸収しきると活性のクレスト（継続回復 回復力 50・15 秒）
  // 公式ジョブガイドの特性から: 妖異の鎌と処刑人は「ウェポンスキルや魔法を実行すると解除される」。イングレスのあとはイーグレスが、
  //   イーグレスのあとはイングレスがリターンに変わる。レムールになるとペルフェクティオ実行可が消える。レムールソウルの最大 5（ステータスの最大スタック数）
  // 仮（GAME-80）: 死の供物は、8 人パーティが供儀のサークルの間に攻撃を当てた想定で、アルケインサークルのときに 8 スタック付ける（練習場の味方は 1 人のため）。
  //   プレンティフルハーベストの威力は死の供物 1 つで 720、1 つ増えるごとに +40（8 つで 1000）。レムールの間はソウルスライス・ソウルサイズを使えない。
  //   レムールソウルが 0 になるとレムールが切れ、ヴォイドソウルも消える。ヴォイドソウルの最大は 5
  const RPR = {
    abbr: 'RPR',
    create(R) {
      const { A } = R;
      const ID = {
        SLICE: 24373, WAXING: 24374, INFERNAL: 24375, SPINNING: 24376, NIGHTMARE: 24377, SHADOW: 24378, WHORL: 24379, SOUL_SLICE: 24380, SOUL_SCYTHE: 24381,
        GIBBET: 24382, GALLOWS: 24383, GUILLOTINE: 24384, PLENTIFUL: 24385, HARPE: 24386, SOULSOW: 24387, HARVEST: 24388,
        BLOOD_STALK: 24389, GIBBET_CLAW: 24390, GALLOWS_CLAW: 24391, GRIM_SWATHE: 24392, GLUTTONY: 24393, ENSHROUD: 24394,
        VOID: 24395, CROSS: 24396, GRIM: 24397, COMMUNIO: 24398, LEMURE_SLICE: 24399, LEMURE_SCYTHE: 24400,
        INGRESS: 24401, EGRESS: 24402, RETURN: 24403, CREST: 24404, CIRCLE: 24405, SACRIFICIUM: 36969,
        EXEC_GIBBET: 36970, EXEC_GALLOWS: 36971, EXEC_GUILLOTINE: 36972, PERFECTIO: 36973,
        SECONDWIND: 7541, BLOODBATH: 7542, TN: 7546, ARMS: 7548, FEINT: 7549, SWEEP: 7863,
      };
      const STATUS = {
        deathsDesign: { name: 'デスデザイン', target: true, tracked: true },
        soulReaver: { name: '妖異の鎌' },
        executioner: { name: '処刑人' },
        enhGibbet: { name: 'ジビトゥ効果アップ' }, enhGallows: { name: 'ギャロウズ効果アップ' },
        enhVoid: { name: 'ヴォイドリーパー効果アップ' }, enhCross: { name: 'クロスリーパー効果アップ' },
        enshroud: { name: 'レムール' },
        oblatio: { name: 'サクリフィキウム実行可' },
        idealHost: { name: 'レムールシュラウド実行可' },
        perfectioOcculta: { name: 'ペルフェクティオ待機' }, perfectioParata: { name: 'ペルフェクティオ実行可' },
        soulsow: { name: 'ソウルソウ' },
        enhHarpe: { name: 'ハルパー効果アップ' },
        returnReady: { name: 'リターン実行可' },
        circle: { name: 'アルケインサークル' },
        circleSacrifice: { name: '死の供儀' },
        immortal: { name: '死の供物' },
        crest: { name: '守護のクレスト' },
        tn: { name: 'トゥルーノース' },
        bloodbath: { name: 'ブラッドバス' },
      };
      const S = () => R.S;
      const has = R.has;
      const Au = () => window.MockAudio;
      const LEMURE_MAX = 5, VOID_MAX = 5;
      const SOUL_REAVER = new Set([ID.GIBBET, ID.GALLOWS, ID.GUILLOTINE]); // 妖異の鎌を使う
      const EXEC = new Set([ID.EXEC_GIBBET, ID.EXEC_GALLOWS, ID.EXEC_GUILLOTINE]); // 処刑人を使う
      const REAPING = new Set([ID.VOID, ID.CROSS, ID.GRIM]);
      const AVATAR = new Set([ID.BLOOD_STALK, ID.GRIM_SWATHE, ID.GIBBET_CLAW, ID.GALLOWS_CLAW, ID.GLUTTONY]); // アヴァターを呼び出す
      const DD_MS = 30000, DD_MAX = numIn(A[ID.SHADOW]?.desc, /最大(\d+)秒まで延長/, 60) * 1000;
      const CIRCLE_UP = 1 + numIn(A[ID.CIRCLE]?.desc, /与ダメージを(\d+)％上昇/, 3) / 100;
      const DD_UP = 1 + numIn(A[ID.SHADOW]?.desc, /ダメージを(\d+)％上昇/, 10) / 100;
      const PH_MIN = numIn(A[ID.PLENTIFUL]?.desc, /威力：(\d+)～/, 720), PH_MAX = numIn(A[ID.PLENTIFUL]?.desc, /～(\d+)/, 1000);
      const IMMORTAL_MAX = numIn(A[ID.CIRCLE]?.desc, /最大スタック数：(\d+)/, 8);
      function gain(key, n, overKey) {
        const s = S(), v = s[key] + n, over = Math.max(0, v - 100);
        if (over > 0 && s.phase === 'combat') s.stats[overKey] += over;
        s[key] = Math.max(0, Math.min(100, v));
      }
      // ソウル・シュラウドの上限 100 は仮（GAME-80。説明文・特性に上限の数がない）
      const gauges = {
        ソウルゲージ: { get: () => S().soul, set: (v) => { S().soul = Math.max(0, Math.min(100, v)); }, max: 100 },
        シュラウドゲージ: { get: () => S().shroud, set: (v) => { S().shroud = Math.max(0, Math.min(100, v)); }, max: 100 },
        レムールソウル: { get: () => S().lemure, set: (v) => { S().lemure = Math.max(0, v); }, max: LEMURE_MAX },
        ヴォイドソウル: { get: () => S().void, set: (v) => { S().void = Math.max(0, Math.min(VOID_MAX, v)); }, max: VOID_MAX },
      };
      const enshrouded = () => has('enshroud');
      function endEnshroud() { const s = S(); R.remove('enshroud'); s.lemure = 0; s.void = 0; }
      const J = {
        ids: ID, STATUS,
        charges: descCharges(A), // ソウルスライス・ソウルサイズ・トゥルーノース「最大チャージ数：2」
        prepull: new Set([ID.SOULSOW, ID.TN, ID.CREST]),
        comboStarters: new Set([ID.SLICE, ID.SPINNING]),
        procStatus: { 56: 'enhHarpe', 57: 'soulsow', 47: 'returnReady', 167: 'oblatio', 169: 'perfectioParata' },
        initState(s) {
          s.soul = 0; s.shroud = 0; s.lemure = 0; s.void = 0; s.gateFrom = null; s.crest = null;
          s.stats.soulOver = 0; s.stats.shroudOver = 0; s.stats.reaverLost = 0; s.stats.enshrouds = 0; s.stats.communio = 0; s.stats.perfectio = 0; s.stats.ph = 0;
        },
        gaugeCols: [['ソウル', (s) => s.soul], ['シュラウド', (s) => s.shroud], ['レムール', (s) => (R.has('enshroud') ? `${s.lemure}/${s.void}` : '')]],
        tracked: [['デスデザイン', 'deathsDesign', '#c86aff', '切れる前にシャドウ・オブ・デスで延長する（最大 60 秒）']],
        speed: () => 1,
        // ヴォイドリーパー・クロスリーパー・グリムリーパーの GCD 1.5 秒は、表のリキャスト（a.recastMs）がそのまま使われる
        // （説明文「実行すると他のウェポンスキルと魔法にこのアクションと同じリキャストタイムが発生する」。gcdMs は不要）
        comboFree: () => false,
        resolve(id) {
          const s = S();
          if (enshrouded()) {
            if (id === ID.GIBBET) return ID.VOID;
            if (id === ID.GALLOWS) return ID.CROSS;
            if (id === ID.GUILLOTINE) return ID.GRIM;
            if (id === ID.BLOOD_STALK) return ID.LEMURE_SLICE;
            if (id === ID.GRIM_SWATHE) return ID.LEMURE_SCYTHE;
            if (id === ID.GLUTTONY && has('oblatio')) return ID.SACRIFICIUM;
          }
          if (id === ID.SOULSOW && has('soulsow')) return ID.HARVEST;
          // リターン: イングレスのあとはイーグレスのボタン、イーグレスのあとはイングレスのボタンが変わる（特性）
          if (has('returnReady') && ((id === ID.EGRESS && s.gateFrom === ID.INGRESS) || (id === ID.INGRESS && s.gateFrom === ID.EGRESS))) return ID.RETURN;
          if (id === ID.INGRESS || id === ID.EGRESS) return id;
          return tooltipResolve(R, J, id);
        },
        blocked(id) {
          const s = S(), a = A[id];
          if (!a) return null;
          if ((id === ID.SOUL_SLICE || id === ID.SOUL_SCYTHE) && enshrouded()) return 'レムールの間は使えません';
          if ((id === ID.BLOOD_STALK || id === ID.GRIM_SWATHE || id === ID.GLUTTONY || id === ID.ENSHROUD) && enshrouded()) return 'レムールの間は使えません';
          if ((id === ID.GIBBET_CLAW || id === ID.GALLOWS_CLAW) && s.soul < 50) return `ソウルゲージが足りません（必要 50 / 現在 ${s.soul}）`;
          if (id === ID.ENSHROUD) return has('idealHost') || s.shroud >= 50 ? null : `シュラウドゲージが足りません（必要 50 / 現在 ${s.shroud}）`;
          if ((REAPING.has(id) || id === ID.COMMUNIO) && (!enshrouded() || s.lemure < 1)) return '「レムールソウル」がありません';
          if ((id === ID.LEMURE_SLICE || id === ID.LEMURE_SCYTHE) && s.void < 2) return `ヴォイドソウルが足りません（必要 2 / 現在 ${s.void}）`;
          if (id === ID.SACRIFICIUM && !(enshrouded() && has('oblatio'))) return '「レムール」かつ「サクリフィキウム実行可」の効果中ではありません';
          if (id === ID.HARVEST && !has('soulsow')) return '「ソウルソウ」の効果中ではありません';
          if (id === ID.SOULSOW && has('soulsow')) return '「ソウルソウ」の効果中です';
          if (id === ID.PLENTIFUL) {
            if (has('circleSacrifice')) return '「死の供儀」の効果中は使えません';
            if (!has('immortal')) return '「死の供物」がありません';
          }
          if (id === ID.RETURN && !has('returnReady')) return '「リターン実行可」の効果中ではありません';
          if ([...SOUL_REAVER, ...EXEC, ID.BLOOD_STALK, ID.GRIM_SWATHE, ID.GLUTTONY, ID.GIBBET_CLAW, ID.GALLOWS_CLAW, ID.PERFECTIO].includes(id)) return tooltipBlocked(R, J, a, gauges);
          return null;
        },
        // ソウルソウは戦闘外なら詠唱なし。ハルパーはハルパー効果アップで詠唱なし
        castMs: (a, base) => ((a.id === ID.SOULSOW && S().phase !== 'combat') || (a.id === ID.HARPE && has('enhHarpe')) ? 0 : base),
        instantNow: (id) => id === ID.RETURN, // リターンはヘルズゲートの中心へ動くだけ（データは地面指定だが、置く場所は選ばない）
        // 威力: ジビトゥ・ギャロウズは「効果アップかつ方向指定」がある。プレンティフルハーベストは死の供物の数
        potOverride(a) {
          const pair = { [ID.GIBBET]: ['enhGibbet', 'flank'], [ID.EXEC_GIBBET]: ['enhGibbet', 'flank'], [ID.GALLOWS]: ['enhGallows', 'rear'], [ID.EXEC_GALLOWS]: ['enhGallows', 'rear'] }[a.id];
          if (pair) {
            const [enh, dir] = pair, posOk = R.posNow() === dir || has('tn'), c = a.pot.cond ?? [];
            if (!has(enh)) return null; // 効果アップがなければ通常の計算（方向指定の威力）
            return posOk ? c.find((x) => /かつ/.test(x.status))?.potency ?? a.pot.base : c.find((x) => !/かつ/.test(x.status))?.potency ?? a.pot.base;
          }
          if (a.id === ID.PLENTIFUL) { const n = Math.max(1, Math.min(IMMORTAL_MAX, S().st.immortal?.stacks ?? 1)); return PH_MIN + ((PH_MAX - PH_MIN) * (n - 1)) / (IMMORTAL_MAX - 1); }
          return null;
        },
        dmgMult: () => (has('deathsDesign') ? DD_UP : 1) * (has('circle') ? CIRCLE_UP : 1),
        effects(id, ok) {
          const a = A[id], s = S();
          // 妖異の鎌・処刑人: 対応する技で 1 つ使う。ほかのウェポンスキル・魔法では解除される（特性）
          if (a.isGcd) {
            for (const [k, set] of [['soulReaver', SOUL_REAVER], ['executioner', EXEC]]) {
              const cur = s.st[k];
              if (!cur || cur.until <= s.t) continue;
              if (set.has(id)) { if ((cur.stacks ?? 1) > 1) cur.stacks -= 1; else R.remove(k); }
              else { s.stats.reaverLost += cur.stacks ?? 1; R.remove(k); R.addLog('warn', `${STATUS[k].name}が${a.name}で解除されました`); R.ev('ミス', { action: a.name, result: `${STATUS[k].name}を無駄に`, note: 'ジビトゥ・ギャロウズ・ギロティンの前に別の技' }); }
            }
          }
          // ゲージ（説明文の「「ソウルゲージ」をN上昇」「「シュラウドゲージ」をN上昇」。コンボボーナスはコンボ時だけ）
          const sg = descGain(a, 'ソウルゲージ', ok); if (sg) gain('soul', sg, 'soulOver');
          const hg = descGain(a, 'シュラウドゲージ', ok); if (hg) gain('shroud', hg, 'shroudOver');
          // 消費と付与（説明文）。効果アップは使うと消える
          if (id === ID.GIBBET || id === ID.EXEC_GIBBET) R.remove('enhGibbet');
          if (id === ID.GALLOWS || id === ID.EXEC_GALLOWS) R.remove('enhGallows');
          if (id === ID.VOID) R.remove('enhVoid');
          if (id === ID.CROSS) R.remove('enhCross');
          // ジビトゥクロウ・ギャロウズクロウの効果アップは発動条件（使わない）。続くジビトゥ・ギャロウズが使う
          if (AVATAR.has(id)) {
            if (a.eff?.cost?.gauge === 'ソウルゲージ' || id === ID.GIBBET_CLAW || id === ID.GALLOWS_CLAW) s.soul -= 50;
            if (id === ID.GLUTTONY) { R.remove('soulReaver'); R.buff('executioner', 30000, 2); }
            else { R.remove('executioner'); R.buff('soulReaver', 30000, 1); }
            R.pet('avatar', 1.6);
          }
          if ([...SOUL_REAVER, ...EXEC, ...REAPING, ID.COMMUNIO, ID.LEMURE_SLICE, ID.LEMURE_SCYTHE, ID.SACRIFICIUM, ID.PERFECTIO, ID.HARVEST, ID.PLENTIFUL].includes(id)) {
            if (id === ID.PLENTIFUL) { R.remove('immortal'); s.stats.ph++; }
            if (id === ID.HARVEST) R.remove('soulsow');
            if (id === ID.SACRIFICIUM) R.remove('oblatio');
            if (id === ID.PERFECTIO) { R.remove('perfectioParata'); s.stats.perfectio++; }
            tooltipEffects(R, J, { ...a, eff: { ...(a.eff ?? {}), cost: a.eff?.cost && gauges[a.eff.cost.gauge] ? a.eff.cost : null, requires: null } }, ok, gauges);
          }
          if (id === ID.COMMUNIO) {
            s.stats.communio++;
            if (has('perfectioOcculta')) { R.remove('perfectioOcculta'); R.buff('perfectioParata', 30000); }
            endEnshroud();
          }
          if (REAPING.has(id) && s.lemure <= 0) endEnshroud();
          if (id === ID.ENSHROUD) {
            if (has('idealHost')) R.remove('idealHost'); else s.shroud -= 50;
            R.buff('enshroud', 30000); s.lemure = LEMURE_MAX; s.void = 0; s.stats.enshrouds++;
            R.buff('oblatio', 30000); R.remove('perfectioParata');
            R.pet('avatar', 1.2); Au()?.surge();
          }
          if (id === ID.SHADOW || id === ID.WHORL) extendBuff(R, 'deathsDesign', DD_MS, DD_MAX);
          if (id === ID.CIRCLE) { R.buff('circle', 20000); R.buff('circleSacrifice', 6000); R.buff('immortal', 30000, IMMORTAL_MAX); Au()?.surge(); }
          if (id === ID.SOULSOW) R.buff('soulsow', 1e9);
          if (id === ID.HARPE && has('enhHarpe')) { R.remove('enhHarpe'); R.cdShift(ID.INGRESS, 5000); }
          if (id === ID.INGRESS || id === ID.EGRESS) {
            R.zone('gate', { r: 1.2, sec: 10, ring: true, self: true, col: ['#ff9ad8', '#8a2a6a'] });
            s.gateFrom = id; R.buff('returnReady', 10000); R.buff('enhHarpe', 10000);
          }
          if (id === ID.RETURN) { R.remove('returnReady'); if (R.toZone('gate')) Au()?.whoosh?.(); R.zoneEnd('gate'); }
          if (id === ID.CREST) { R.shieldSelf(0.1, 5, '守護のクレスト'); R.buff('crest', 5000); s.crest = { until: s.t + 5000 }; }
          if (id === ID.SECONDWIND) R.heal('self', 800 * HEAL_K);
          if (id === ID.BLOODBATH) R.buff('bloodbath', 20000);
          if (id === ID.TN) R.buff('tn', 10000);
        },
        tick() {
          const s = S();
          if (s.lemure > 0 && !enshrouded()) { s.lemure = 0; s.void = 0; } // レムールの時間切れ
          // 守護のクレストを吸収しきった → 活性のクレスト（継続回復）
          if (s.crest) {
            if (R.shieldLeft('self', '守護のクレスト') <= 0.0005 && s.t < s.crest.until) { R.hot('party', 50 * HEAL_K, 15, '活性のクレスト'); R.remove('crest'); s.crest = null; R.addLog('ok', '守護のクレストが吸収されて消えました → 活性のクレスト'); }
            else if (s.t >= s.crest.until) s.crest = null;
          }
        },
        highlightOk: () => true,
        glow(id) {
          const s = S();
          if (id === ID.GIBBET || id === ID.EXEC_GIBBET) return (has('soulReaver') || has('executioner')) && !has('enhGallows');
          if (id === ID.GALLOWS || id === ID.EXEC_GALLOWS) return (has('soulReaver') || has('executioner')) && has('enhGallows');
          if (id === ID.VOID) return enshrouded() && s.lemure > 1 && !has('enhCross');
          if (id === ID.CROSS) return enshrouded() && s.lemure > 1 && has('enhCross');
          if (id === ID.COMMUNIO) return enshrouded() && s.lemure === 1;
          if (id === ID.LEMURE_SLICE) return s.void >= 2;
          if (id === ID.ENSHROUD) return !enshrouded() && (s.shroud >= 50 || has('idealHost'));
          if (id === ID.PLENTIFUL) return has('immortal') && !has('circleSacrifice');
          return false;
        },
        // 方向指定のガイド: 次のジビトゥ（側面）/ ギャロウズ（背面）。効果アップの付いている方
        guide(highlight) {
          if (!(has('soulReaver') || has('executioner')) && !highlight(ID.BLOOD_STALK)) return null;
          return has('enhGallows') ? A[ID.GALLOWS].positional : A[ID.GIBBET].positional;
        },
        positional: () => has('tn') && 'トゥルーノース',
        fxColor: (id) => (REAPING.has(id) || id === ID.COMMUNIO || id === ID.LEMURE_SLICE || id === ID.SACRIFICIUM ? 'shoha' : EXEC.has(id) || SOUL_REAVER.has(id) || id === ID.PERFECTIO ? 'kenki' : id === ID.HARVEST || id === ID.PLENTIFUL ? 'holy' : AVATAR.has(id) ? 'getsu' : 'steel'),
        fxPower: (id) => (id === ID.COMMUNIO || id === ID.PERFECTIO || id === ID.PLENTIFUL ? 1.6 : EXEC.has(id) || id === ID.SACRIFICIUM ? 1.4 : 1),
        fxCount: (id) => (id === ID.PERFECTIO || id === ID.COMMUNIO ? 3 : 1),
        castColor: () => 'shoha',
        gcdColor: (id) => (REAPING.has(id) ? '#c86aff' : EXEC.has(id) || SOUL_REAVER.has(id) ? '#ff5a7a' : null),
        hotOgcd: (id) => [ID.CIRCLE, ID.GLUTTONY, ID.ENSHROUD, ID.SACRIFICIUM].includes(id),
        weapon: 'slash', magicTone: 'dark',
        tipCost: (id) => (A[id]?.eff?.cost?.gauge && gauges[A[id].eff.cost.gauge] ? [A[id].eff.cost.gauge, A[id].eff.cost.n] : null),
        report(s) {
          const issues = [], metrics = [], goods = [];
          if (s.stats.soulOver) issues.push({ loss: Math.min(100, s.stats.soulOver) * 0.1, rate: s.stats.soulOver > 30 ? 'bad' : 'ok', title: `ソウルゲージが ${s.stats.soulOver} あふれた`, advice: 'ソウルが 50 以上でソウルスライスを使う前に、ストークスウェーズ（グラトニー）で使う' });
          if (s.stats.shroudOver) issues.push({ loss: Math.min(100, s.stats.shroudOver) * 0.1, rate: s.stats.shroudOver > 30 ? 'bad' : 'ok', title: `シュラウドゲージが ${s.stats.shroudOver} あふれた`, advice: 'シュラウドが 90 を超える前にレムールシュラウド' });
          if (s.stats.reaverLost) issues.push({ loss: s.stats.reaverLost * 3, rate: 'bad', title: `使わずに消えた妖異の鎌・処刑人 ${s.stats.reaverLost}`, advice: 'ストークスウェーズ・グラトニーのあとは、ほかのウェポンスキルより先にジビトゥ / ギャロウズを使う' });
          metrics.push({ label: 'レムールシュラウド', value: `${s.stats.enshrouds} 回（コムニオ ${s.stats.communio}）`, rate: null });
          metrics.push({ label: 'プレンティフルハーベスト', value: `${s.stats.ph} 回（ペルフェクティオ ${s.stats.perfectio}）`, rate: null });
          if (!s.stats.reaverLost && s.stats.gcds > 10) goods.push('妖異の鎌・処刑人を無駄にしていない');
          return { issues, metrics, goods, overPct: Math.max(0, 100 - s.stats.reaverLost * 10 - Math.min(40, (s.stats.soulOver + s.stats.shroudOver) / 3)), posAdvice: 'ジビトゥは側面、ギャロウズは背面。効果アップの付いている方（光っている方）を使う。間に合わないときはトゥルーノース', castAdvice: 'ハルパー・ソウルソウ・コムニオは詠唱がある。動く前にヘルズイングレス（ハルパー効果アップ）を使う', rangeAdvice: '離れたらハーベストムーンかハルパーでつなぐ', comboAdvice: 'スライス → ワクシングスライス → インファナルスライス の順に。ソウルスライス・ジビトゥなどはコンボを切らない' };
        },
        howto: 'リーパー: スライス → ワクシングスライス → インファナルスライス でソウルをためる。ソウル 50 でストークスウェーズ → ジビトゥ（側面）/ ギャロウズ（背面）を光っている方から。シュラウド 50 でレムールシュラウド → ヴォイドリーパー / クロスリーパーを交互に 4 回 → コムニオ。デスデザインは切らさない。120 秒ごとにアルケインサークル → プレンティフルハーベスト。',
        gaugeUI: (D) => window.MockGauge2.create(D.gauge, 'RPR'),
        gaugeDefault: { JobHudRRP0: { x: 64, y: 64, anchor: 4, scale: 1 }, JobHudRRP1: { x: 78, y: 64, anchor: 4, scale: 1 } },
      };
      return J;
    },
  };

  // ---------------- ヴァイパー ----------------
  // 説明文から:
  //   二刀のコンボ: 壱の牙【咬創】/【穿裂】→ 弐の牙【猛襲】/【疾速】（どちらの壱のあとでも）→ 参の牙。猛襲のあとは参の牙【側撃】/【側裂】（側面）、
  //     疾速のあとは参の牙【背撃】/【背裂】（背面）。ボタンは説明文の「発動条件を満たすとXがYに変化する」のとおり:
  //     咬創のボタン → 弐の牙【猛襲】→ 参の牙【側撃】（猛襲のあと）/ 参の牙【背撃】（疾速のあと）、穿裂のボタン → 弐の牙【疾速】→ 参の牙【側裂】/【背裂】。
  //     範囲も同じ（壱の大牙 → 弐の大牙 → 参の大牙【乱撃】（咬創のボタン）/【乱裂】（穿裂のボタン）。参はどちらの弐のあとでも）
  //   蛇鋭牙: 壱の牙【咬創】で蛇鋭牙【穿裂】（穿裂の威力 +100）、穿裂で蛇鋭牙【咬創】。同時に付かない。範囲の壱の大牙も同じ（+20）
  //   猛襲: 与ダメージ +10%（40 秒）。疾速: ウェポンスキルのリキャスト 15% 短縮（40 秒）
  //   鋭牙: 参の牙を使うと、別の参の牙が +100（側撃 → 鋭牙【背撃】、背撃 → 【側裂】、側裂 → 【背裂】、背裂 → 【側撃】）。
  //     大鋭牙: 参の大牙の乱撃 ↔ 乱裂 で +40。鋭牙と大鋭牙はどれか 1 つだけ付く
  //   霊力ゲージ: 参の牙・参の大牙で +10、弐の蛇・弐の大蛇で +5。参の牙のあとは蛇尾術が蛇尾撃、参の大牙のあとは蛇尾閃
  //   壱の蛇【強砕】（40 秒・2 チャージ。壱の大蛇と共有）→ 弐の蛇【猛襲】（側面）/【疾速】（背面）を 1 回ずつ（もう一方の弐の蛇のあとにも使える）。
  //     弐の蛇のあとは双牙連術・双牙乱術が双牙連撃・双牙乱撃に変わり、1 回ずつ使える。猛襲の直後の双牙連撃で双鋭牙【乱撃】、疾速の直後の双牙乱撃で双鋭牙【連撃】
  //   飛蛇の尾（飛蛇の魂 1）: 双牙連術・双牙乱術が飛蛇連尾撃・飛蛇乱尾撃に。飛鋭尾【連尾】→ 飛蛇連尾撃 → 飛鋭尾【乱尾】→ 飛蛇乱尾撃
  //   祖霊降ろし（霊力ゲージ 50。祖霊降ろし実行可なら消費なし）: 霊力 5（30 秒）。咬創・穿裂・弐の蛇【猛襲】・弐の蛇【疾速】（と範囲のもの）のボタンが
  //     祖霊の牙【壱〜肆】、祖霊降ろしのボタンが祖霊の大蛇牙に変わる。祖霊の牙は順に使うと威力 680（順でなければ 480）。
  //     祖霊の牙のあとは蛇尾術が祖霊の蛇【壱〜肆】。祖霊の大蛇牙で祖霊降ろしが切れる
  //   蛇の霊気（戦闘中だけ）: 飛蛇の魂 +1 と祖霊降ろし実行可（30 秒）
  // 公式ジョブガイドの特性・ジョブ HUD の説明から: 壱の蛇・壱の大蛇で飛蛇の魂 +1（最大 3）。霊力の最大 5。蛇行の最大チャージ 3。
  //   ヴァイパーサイトは、ホットバーで光っているコンボの技の側（咬創の側 = 左、穿裂の側 = 右）の刀身が光り、刀身の中のゲージがコンボの段階を表す
  // 仮（GAME-81）: 光る技 — 壱は蛇鋭牙の付いている方、弐は鋭牙の付いている参の牙へ続く方（鋭牙がなければ、猛襲・疾速の残りの短い方）、参は鋭牙の付いている方。
  //   蛇尾術・双牙の続きは、次のウェポンスキルを使うと消える。壱の蛇のあとの弐の蛇は 30 秒以内。祖霊の牙はどの順でも使える（威力だけ変わる）
  const VPR = {
    abbr: 'VPR',
    create(R) {
      const { A } = R;
      const ID = {
        STEEL: 34606, REAVING: 34607, HUNTERS_STING: 34608, SWIFTSKINS_STING: 34609, FLANKSTING: 34610, FLANKSBANE: 34611, HINDSTING: 34612, HINDSBANE: 34613,
        STEEL_MAW: 34614, REAVING_MAW: 34615, HUNTERS_BITE: 34616, SWIFTSKINS_BITE: 34617, JAGGED_MAW: 34618, BLOODIED_MAW: 34619,
        VICEWINDER: 34620, HUNTERS_COIL: 34621, SWIFTSKINS_COIL: 34622, VICEPIT: 34623, HUNTERS_DEN: 34624, SWIFTSKINS_DEN: 34625,
        REAWAKEN: 34626, GEN1: 34627, GEN2: 34628, GEN3: 34629, GEN4: 34630, OUROBOROS: 34631, SNAP: 34632, UNCOILED: 34633,
        DEATH_RATTLE: 34634, LAST_LASH: 34635, TWINFANG_BITE: 34636, TWINBLOOD_BITE: 34637, TWINFANG_THRESH: 34638, TWINBLOOD_THRESH: 34639,
        LEGACY1: 34640, LEGACY2: 34641, LEGACY3: 34642, LEGACY4: 34643, U_TWINFANG: 34644, U_TWINBLOOD: 34645, SLITHER: 34646, IRE: 34647,
        TAIL: 35920, TWINFANG: 35921, TWINBLOOD: 35922,
        SECONDWIND: 7541, BLOODBATH: 7542, TN: 7546, ARMS: 7548, FEINT: 7549, SWEEP: 7863,
      };
      const STATUS = {
        honedSteel: { name: '蛇鋭牙【咬創】' }, honedReavers: { name: '蛇鋭牙【穿裂】' },
        hunters: { name: '猛襲', tracked: true }, swift: { name: '疾速', tracked: true },
        vFlankstung: { name: '鋭牙【側撃】' }, vFlanksbane: { name: '鋭牙【側裂】' }, vHindstung: { name: '鋭牙【背撃】' }, vHindsbane: { name: '鋭牙【背裂】' },
        vGrimhunter: { name: '大鋭牙【乱撃】' }, vGrimskin: { name: '大鋭牙【乱裂】' },
        hVenom: { name: '双鋭牙【連撃】' }, sVenom: { name: '双鋭牙【乱撃】' }, fhVenom: { name: '双鋭牙【連閃】' }, fsVenom: { name: '双鋭牙【乱閃】' },
        poisedFang: { name: '飛鋭尾【連尾】' }, poisedBlood: { name: '飛鋭尾【乱尾】' },
        reawakened: { name: '祖霊降ろし' }, readyReawaken: { name: '祖霊降ろし実行可' },
        tn: { name: 'トゥルーノース' },
        bloodbath: { name: 'ブラッドバス' },
      };
      const S = () => R.S;
      const has = R.has;
      const Au = () => window.MockAudio;
      const COIL_MAX = numIn(A[ID.VICEWINDER]?.desc, /最大スタック数：(\d+)/, 3);
      const TRIBUTE_MAX = numIn(A[ID.REAWAKEN]?.desc, /(\d+)スタックの「霊力」/, 5);
      const SWIFT = 1 - numIn(A[ID.SWIFTSKINS_STING]?.desc, /リキャストタイムを(\d+)％短縮/, 15) / 100;
      const GEN_UP = numIn(A[ID.GEN1]?.desc, /威力が(\d+)に上昇/, 680);
      const DUAL1 = new Set([ID.STEEL, ID.REAVING]), DUAL2 = new Set([ID.HUNTERS_STING, ID.SWIFTSKINS_STING]);
      const MAW1 = new Set([ID.STEEL_MAW, ID.REAVING_MAW]), MAW2 = new Set([ID.HUNTERS_BITE, ID.SWIFTSKINS_BITE]);
      const FINISHERS = new Set([ID.FLANKSTING, ID.FLANKSBANE, ID.HINDSTING, ID.HINDSBANE]), MAW3 = new Set([ID.JAGGED_MAW, ID.BLOODIED_MAW]);
      const GENS = [ID.GEN1, ID.GEN2, ID.GEN3, ID.GEN4];
      const GEN_PREV = { [ID.GEN1]: ID.REAWAKEN, [ID.GEN2]: ID.GEN1, [ID.GEN3]: ID.GEN2, [ID.GEN4]: ID.GEN3 };
      // 参の牙・参の大牙と、それを強める鋭牙・大鋭牙（説明文「〜が付与されている場合は（全ての）威力がN上昇する」）
      const VENOM_OF = { [ID.FLANKSTING]: 'vFlankstung', [ID.FLANKSBANE]: 'vFlanksbane', [ID.HINDSTING]: 'vHindstung', [ID.HINDSBANE]: 'vHindsbane', [ID.JAGGED_MAW]: 'vGrimhunter', [ID.BLOODIED_MAW]: 'vGrimskin' };
      const VENOMS = Object.values(VENOM_OF);
      const VENOM_TARGET = Object.fromEntries(Object.entries(VENOM_OF).map(([id, k]) => [k, Number(id)]));
      const venomUp = (id) => numIn(A[id]?.desc, /付与されている場合は(?:全ての)?威力が(\d+)上昇/, 0);
      // 続き（オフ GCD）: 参の牙 → 蛇尾撃、参の大牙 → 蛇尾閃、祖霊の牙 → 祖霊の蛇
      const TAIL_OF = { [ID.GEN1]: ID.LEGACY1, [ID.GEN2]: ID.LEGACY2, [ID.GEN3]: ID.LEGACY3, [ID.GEN4]: ID.LEGACY4 };
      for (const f of FINISHERS) TAIL_OF[f] = ID.DEATH_RATTLE;
      for (const f of MAW3) TAIL_OF[f] = ID.LAST_LASH;
      const TAILS = new Set(Object.values(TAIL_OF));
      const LEGACIES = new Set([ID.LEGACY1, ID.LEGACY2, ID.LEGACY3, ID.LEGACY4]);
      // 双牙の続き: 弐の蛇 → 双牙連撃・双牙乱撃、弐の大蛇 → 双牙連閃・双牙乱閃、飛蛇の尾 → 飛蛇連尾撃・飛蛇乱尾撃
      const TWIN_OF = {
        [ID.HUNTERS_COIL]: [ID.TWINFANG_BITE, ID.TWINBLOOD_BITE], [ID.SWIFTSKINS_COIL]: [ID.TWINFANG_BITE, ID.TWINBLOOD_BITE],
        [ID.HUNTERS_DEN]: [ID.TWINFANG_THRESH, ID.TWINBLOOD_THRESH], [ID.SWIFTSKINS_DEN]: [ID.TWINFANG_THRESH, ID.TWINBLOOD_THRESH],
        [ID.UNCOILED]: [ID.U_TWINFANG, ID.U_TWINBLOOD],
      };
      // 双牙の技 → 強める双鋭牙・飛鋭尾、「〜の直後に実行すると」付く双鋭牙（説明文）
      const TWIN_VENOM = { [ID.TWINFANG_BITE]: 'hVenom', [ID.TWINBLOOD_BITE]: 'sVenom', [ID.TWINFANG_THRESH]: 'fhVenom', [ID.TWINBLOOD_THRESH]: 'fsVenom', [ID.U_TWINFANG]: 'poisedFang', [ID.U_TWINBLOOD]: 'poisedBlood' };
      const TWIN_NEXT = { [ID.TWINFANG_BITE]: [ID.HUNTERS_COIL, 'sVenom'], [ID.TWINBLOOD_BITE]: [ID.SWIFTSKINS_COIL, 'hVenom'], [ID.TWINFANG_THRESH]: [ID.HUNTERS_DEN, 'fsVenom'], [ID.TWINBLOOD_THRESH]: [ID.SWIFTSKINS_DEN, 'fhVenom'] };
      const DREAD = { [ID.VICEWINDER]: [ID.HUNTERS_COIL, ID.SWIFTSKINS_COIL], [ID.VICEPIT]: [ID.HUNTERS_DEN, ID.SWIFTSKINS_DEN] };
      const COILS = new Set([ID.HUNTERS_COIL, ID.SWIFTSKINS_COIL, ID.HUNTERS_DEN, ID.SWIFTSKINS_DEN]);
      const COMBO_MS = 30000;
      // 霊力ゲージの上限 100 は仮（GAME-81。説明文・特性に上限の数がない）
      const gauges = {
        霊力ゲージ: { get: () => S().offering, set: (v) => { S().offering = Math.max(0, Math.min(100, v)); }, max: 100 },
        飛蛇の魂: { get: () => S().coil, set: (v) => { S().coil = Math.max(0, Math.min(COIL_MAX, v)); }, max: COIL_MAX },
        霊力: { get: () => S().tribute, set: (v) => { S().tribute = Math.max(0, Math.min(TRIBUTE_MAX, v)); }, max: TRIBUTE_MAX },
      };
      const reawakened = () => has('reawakened') && S().tribute > 0;
      const comboNow = () => { const s = S(); return s.combo != null && s.t <= s.comboUntil ? s.combo : null; };
      const venomNow = () => VENOMS.find((k) => has(k)) ?? null;
      const left = (k) => Math.max(0, (S().st[k]?.until ?? 0) - S().t);
      // 弐の牙のどちらを光らせるか: 鋭牙の付いている参の牙へ続く方（側撃・側裂 → 猛襲、背撃・背裂 → 疾速）。なければ（範囲の弐の大牙も）猛襲・疾速の残りの短い方
      function secondPick(hunter, swift, routed) {
        const v = routed ? venomNow() : null;
        if (v === 'vFlankstung' || v === 'vFlanksbane') return hunter;
        if (v === 'vHindstung' || v === 'vHindsbane') return swift;
        return left('hunters') <= left('swift') ? hunter : swift;
      }
      function gainCoil(n) {
        const s = S(), v = s.coil + n;
        if (v > COIL_MAX && s.phase === 'combat') s.stats.coilOver += v - COIL_MAX;
        s.coil = Math.min(COIL_MAX, v);
      }
      function gainOffering(n) {
        const s = S(), v = s.offering + n;
        if (v > 100 && s.phase === 'combat') s.stats.offeringOver += v - 100;
        s.offering = Math.min(100, v);
      }
      // 次のウェポンスキルで消える続き（蛇尾術・双牙）を数える
      function dropFollowUps(a) {
        const s = S();
        if (s.tail) { s.stats.followLost++; R.addLog('warn', `${A[s.tail.id].name}を使わずに${a.name}を使いました`); R.ev('ミス', { action: a.name, result: `${A[s.tail.id].name}を使わずに次のウェポンスキル`, note: '蛇尾術の続き' }); s.tail = null; }
        if (s.twin && (s.twin.fang || s.twin.blood)) {
          const n = (s.twin.fang ? 1 : 0) + (s.twin.blood ? 1 : 0);
          s.stats.followLost += n; R.addLog('warn', `双牙の続き ${n} つを使わずに${a.name}を使いました`); R.ev('ミス', { action: a.name, result: `双牙の続き ${n} つを使わずに次のウェポンスキル`, note: '双牙連術・双牙乱術' });
        }
        s.twin = null;
      }
      const J = {
        ids: ID, STATUS,
        charges: descCharges(A), // 壱の蛇【強砕】2・蛇行 3・トゥルーノース 2（説明文「最大チャージ数」）
        prepull: new Set([ID.TN]),
        comboStarters: new Set([ID.STEEL, ID.REAVING, ID.STEEL_MAW, ID.REAVING_MAW]),
        procStatus: {},
        initState(s) {
          s.offering = 0; s.coil = 0; s.tribute = 0; s.tail = null; s.twin = null; s.dread = null; s.lastGen = null;
          s.stats.offeringOver = 0; s.stats.coilOver = 0; s.stats.followLost = 0; s.stats.venomMiss = 0; s.stats.genMiss = 0; s.stats.tributeLost = 0; s.stats.reawakens = 0;
        },
        gaugeCols: [['霊力ゲージ', (s) => s.offering], ['飛蛇の魂', (s) => s.coil], ['霊力', (s) => (R.has('reawakened') ? s.tribute : '')]],
        tracked: [['猛襲', 'hunters', '#ff9a52', '40 秒。弐の牙【猛襲】・弐の蛇【猛襲】で付け直す'], ['疾速', 'swift', '#6ad0f0', '40 秒。弐の牙【疾速】・弐の蛇【疾速】で付け直す']],
        // 疾速: ウェポンスキルのリキャスト（と詠唱）が 15% 短い
        speed: () => (has('swift') ? SWIFT : 1),
        comboFree: () => false,
        resolve(id) {
          const s = S(), c = comboNow();
          if (reawakened()) {
            const gen = { [ID.STEEL]: ID.GEN1, [ID.STEEL_MAW]: ID.GEN1, [ID.REAVING]: ID.GEN2, [ID.REAVING_MAW]: ID.GEN2, [ID.HUNTERS_COIL]: ID.GEN3, [ID.HUNTERS_DEN]: ID.GEN3, [ID.SWIFTSKINS_COIL]: ID.GEN4, [ID.SWIFTSKINS_DEN]: ID.GEN4, [ID.REAWAKEN]: ID.OUROBOROS }[id];
            if (gen) return gen;
          }
          if (id === ID.STEEL) return c === ID.HUNTERS_STING ? ID.FLANKSTING : c === ID.SWIFTSKINS_STING ? ID.HINDSTING : DUAL1.has(c) ? ID.HUNTERS_STING : id;
          if (id === ID.REAVING) return c === ID.HUNTERS_STING ? ID.FLANKSBANE : c === ID.SWIFTSKINS_STING ? ID.HINDSBANE : DUAL1.has(c) ? ID.SWIFTSKINS_STING : id;
          if (id === ID.STEEL_MAW) return MAW2.has(c) ? ID.JAGGED_MAW : MAW1.has(c) ? ID.HUNTERS_BITE : id;
          if (id === ID.REAVING_MAW) return MAW2.has(c) ? ID.BLOODIED_MAW : MAW1.has(c) ? ID.SWIFTSKINS_BITE : id;
          if (id === ID.TAIL) return s.tail?.id ?? id;
          if (id === ID.TWINFANG) return s.twin?.fang ?? id;
          if (id === ID.TWINBLOOD) return s.twin?.blood ?? id;
          return id;
        },
        blocked(id) {
          const s = S(), a = A[id];
          if (!a) return null;
          if (id === ID.TAIL || id === ID.TWINFANG || id === ID.TWINBLOOD) return `${a.name}は、変化先の発動条件を満たしたときだけ使えます`;
          if (COILS.has(id) && !(s.dread?.left.includes(id) && s.t <= s.dread.until)) return `${A[id === ID.HUNTERS_COIL || id === ID.SWIFTSKINS_COIL ? ID.VICEWINDER : ID.VICEPIT].name}のあとに使えます`;
          if (id === ID.UNCOILED && s.coil < 1) return '「飛蛇の魂」がありません';
          if (id === ID.REAWAKEN && !has('readyReawaken') && s.offering < 50) return `霊力ゲージが足りません（必要 50 / 現在 ${s.offering}）`;
          if ((GENS.includes(id) || id === ID.OUROBOROS) && !reawakened()) return '「霊力」がありません';
          if (id === ID.IRE && s.phase !== 'combat') return '戦闘中だけ使えます';
          return null;
        },
        castMs: (a, base) => base,
        // 威力: 参の牙・参の大牙は鋭牙・大鋭牙で上乗せ。祖霊の牙は順に使うと上がる
        potOverride(a) {
          if (GENS.includes(a.id)) return S().lastGen === GEN_PREV[a.id] ? GEN_UP : a.pot?.base ?? 480;
          return null;
        },
        potAdd: (a) => (VENOM_OF[a.id] && has(VENOM_OF[a.id]) ? venomUp(a.id) : 0),
        dmgMult: () => 1,
        effects(id, ok) {
          const a = A[id], s = S();
          if (a.isGcd) {
            dropFollowUps(a);
            if (!GENS.includes(id) && id !== ID.REAWAKEN) s.lastGen = null;
          }
          // 霊力ゲージ（説明文「「霊力ゲージ」をN上昇させる」）
          const og = descGain(a, '霊力ゲージ', ok); if (og) gainOffering(og);
          // 蛇鋭牙: 壱の牙・壱の大牙で付け替える
          if (id === ID.STEEL || id === ID.STEEL_MAW) { R.remove('honedSteel'); R.buff('honedReavers', 60000); }
          if (id === ID.REAVING || id === ID.REAVING_MAW) { R.remove('honedReavers'); R.buff('honedSteel', 60000); }
          // 猛襲・疾速（弐の牙・弐の大牙・弐の蛇・弐の大蛇）と、双鋭牙（弐の蛇・弐の大蛇）・飛鋭尾（飛蛇の尾）: 説明文の付与
          if (DUAL2.has(id) || MAW2.has(id) || COILS.has(id) || id === ID.UNCOILED) tooltipEffects(R, J, { ...a, eff: { ...(a.eff ?? {}), cost: null, requires: null } }, ok, {});
          // 参の牙・参の大牙: 今の鋭牙を使って（消して）、次の鋭牙を付ける。強めていない参の牙を使ったら数える
          if (FINISHERS.has(id) || MAW3.has(id)) {
            const v = venomNow();
            if (v && v !== VENOM_OF[id] && FINISHERS.has(VENOM_TARGET[v]) === FINISHERS.has(id)) { s.stats.venomMiss++; R.ev('ミス', { action: a.name, result: '鋭牙の付いていない参の牙', note: `${STATUS[v].name}が付いていた` }); }
            for (const k of VENOMS) R.remove(k);
            for (const g of a.eff?.grant ?? []) { const k = Object.keys(STATUS).find((x) => STATUS[x].name === g.status); if (k) R.buff(k, (g.sec ?? 60) * 1000); }
          }
          if (TAIL_OF[id]) s.tail = { id: TAIL_OF[id] };
          if (TAILS.has(id)) s.tail = null;
          // 壱の蛇・壱の大蛇: 飛蛇の魂 +1（特性）と、弐の蛇・弐の大蛇を 1 回ずつ
          if (DREAD[id]) { gainCoil(1); s.dread = { left: [...DREAD[id]], until: s.t + COMBO_MS }; }
          // 2 つ目の弐の蛇で終わり（共通のコンボの続き（S.chain）も消す。残すと受付時間切れをコンボ切れと数えてしまう）
          if (COILS.has(id) && s.dread) { s.dread.left = s.dread.left.filter((x) => x !== id); if (!s.dread.left.length) { s.dread = null; s.chain = null; } }
          if (TWIN_OF[id]) s.twin = { fang: TWIN_OF[id][0], blood: TWIN_OF[id][1], from: id, first: true };
          if (TWIN_VENOM[id]) {
            const t = s.twin;
            R.remove(TWIN_VENOM[id]);
            if (TWIN_NEXT[id] && t?.first && t.from === TWIN_NEXT[id][0]) R.buff(TWIN_NEXT[id][1], 30000);
            if (id === ID.U_TWINFANG) R.buff('poisedBlood', 60000);
            if (t) { if (t.fang === id) t.fang = null; if (t.blood === id) t.blood = null; t.first = false; if (!t.fang && !t.blood) s.twin = null; }
          }
          if (id === ID.UNCOILED) s.coil -= 1;
          // 祖霊降ろし: 霊力 5。祖霊の牙・祖霊の大蛇牙で 1 つずつ使う
          if (id === ID.REAWAKEN) {
            if (has('readyReawaken')) R.remove('readyReawaken'); else s.offering -= 50;
            R.buff('reawakened', 30000); s.tribute = TRIBUTE_MAX; s.lastGen = ID.REAWAKEN; s.stats.reawakens++;
            Au()?.surge();
          }
          if (GENS.includes(id)) {
            if (s.lastGen !== GEN_PREV[id]) { s.stats.genMiss++; R.ev('ミス', { action: a.name, result: '祖霊の牙の順番違い', note: '威力が下がる' }); }
            s.tribute -= 1; s.lastGen = id;
          }
          if (id === ID.OUROBOROS) { s.tribute = 0; R.remove('reawakened'); s.lastGen = null; }
          if (id === ID.IRE) { gainCoil(1); R.buff('readyReawaken', 30000); Au()?.surge(); }
          if (id === ID.SECONDWIND) R.heal('self', 800 * HEAL_K);
          if (id === ID.BLOODBATH) R.buff('bloodbath', 20000);
          if (id === ID.TN) R.buff('tn', 10000);
        },
        tick() {
          const s = S();
          if (s.tribute > 0 && !has('reawakened')) { if (s.phase === 'combat') s.stats.tributeLost += s.tribute; s.tribute = 0; s.lastGen = null; } // 祖霊降ろしの時間切れ
          if (s.dread && s.t > s.dread.until) s.dread = null;
          s.sight = J.sight(); // ヴァイパーサイト（ゲージ）に出すコンボの段階と光る側
        },
        highlightOk: () => true,
        // コンボの次の技のうち光らせるもの（ヴァイパーサイトの刀身の光と同じ）
        comboHighlight(id) {
          const s = S(), c = comboNow();
          if (DUAL2.has(id)) return DUAL1.has(c) ? secondPick(ID.HUNTERS_STING, ID.SWIFTSKINS_STING, true) === id : false;
          if (FINISHERS.has(id)) {
            if (!DUAL2.has(c)) return false;
            const v = venomNow(), mine = id === ID.FLANKSTING || id === ID.FLANKSBANE ? c === ID.HUNTERS_STING : c === ID.SWIFTSKINS_STING;
            return mine && (v ? VENOM_OF[id] === v : id === (c === ID.HUNTERS_STING ? ID.FLANKSTING : ID.HINDSTING));
          }
          if (MAW2.has(id)) return MAW1.has(c) ? secondPick(ID.HUNTERS_BITE, ID.SWIFTSKINS_BITE, false) === id : false;
          if (MAW3.has(id)) return MAW2.has(c) ? (has('vGrimskin') ? id === ID.BLOODIED_MAW : id === ID.JAGGED_MAW) : false;
          if (COILS.has(id)) return !!(s.dread?.left.includes(id) && s.t <= s.dread.until);
          return null;
        },
        glow(id) {
          const s = S(), c = comboNow();
          if (reawakened()) {
            const next = [null, ID.OUROBOROS, ID.GEN4, ID.GEN3, ID.GEN2, ID.GEN1][Math.min(5, s.tribute)];
            if (GENS.includes(id) || id === ID.OUROBOROS) return id === next;
          }
          if (TAILS.has(id)) return s.tail?.id === id;
          // 双牙の続き: 双鋭牙・飛鋭尾の付いている方。どちらにも付いていなければ両方
          if (TWIN_VENOM[id]) {
            const t = s.twin;
            if (!t || (t.fang !== id && t.blood !== id)) return false;
            const boosted = [t.fang, t.blood].filter((x) => x && has(TWIN_VENOM[x]));
            return !boosted.length || boosted.includes(id);
          }
          if (c == null || !(DUAL1.has(c) || DUAL2.has(c) || MAW1.has(c) || MAW2.has(c))) {
            if (id === ID.STEEL) return has('honedSteel');
            if (id === ID.REAVING) return has('honedReavers');
          }
          if (id === ID.REAWAKEN) return !reawakened() && (s.offering >= 50 || has('readyReawaken'));
          return false;
        },
        // 方向指定のガイド: 光っている参の牙・弐の蛇の向き。弐の牙の段では、その先の参の牙の向き（猛襲 → 側面、疾速 → 背面）
        guide(highlight) {
          for (const id of [ID.FLANKSTING, ID.FLANKSBANE, ID.HINDSTING, ID.HINDSBANE, ID.HUNTERS_COIL, ID.SWIFTSKINS_COIL]) if (highlight(id)) return A[id].positional;
          if (highlight(ID.HUNTERS_STING)) return 'flank';
          if (highlight(ID.SWIFTSKINS_STING)) return 'rear';
          return null;
        },
        positional: () => has('tn') && 'トゥルーノース',
        // ヴァイパーサイト（ゲージ）用: コンボの段階（0〜2）・範囲か・光る側（'L' / 'R' / 'LR' / ''）
        sight() {
          const s = S(), c = comboNow(), hl = (x) => J.comboHighlight(x) || J.glow(x);
          const stage = DUAL2.has(c) || MAW2.has(c) ? 2 : DUAL1.has(c) || MAW1.has(c) ? 1 : 0;
          const aoe = MAW1.has(c) || MAW2.has(c);
          if (reawakened()) return { stage: 0, aoe: false, side: '' };
          let L = false, Rt = false;
          // 弐の蛇の待ちは、二刀のコンボの途中でないときだけ光らせる（コンボの途中はコンボの技の側）
          if (stage === 0 && s.dread && s.t <= s.dread.until) { L = s.dread.left.includes(DREAD[ID.VICEWINDER][0]) || s.dread.left.includes(DREAD[ID.VICEPIT][0]); Rt = s.dread.left.includes(DREAD[ID.VICEWINDER][1]) || s.dread.left.includes(DREAD[ID.VICEPIT][1]); }
          else if (stage === 0) { L = hl(ID.STEEL); Rt = hl(ID.REAVING); }
          else if (aoe) { L = hl(stage === 1 ? ID.HUNTERS_BITE : ID.JAGGED_MAW); Rt = hl(stage === 1 ? ID.SWIFTSKINS_BITE : ID.BLOODIED_MAW); }
          else if (stage === 1) { L = hl(ID.HUNTERS_STING); Rt = hl(ID.SWIFTSKINS_STING); }
          else { L = hl(ID.FLANKSTING) || hl(ID.HINDSTING); Rt = hl(ID.FLANKSBANE) || hl(ID.HINDSBANE); }
          return { stage, aoe, side: `${L ? 'L' : ''}${Rt ? 'R' : ''}` };
        },
        fxColor: (id) => (GENS.includes(id) || id === ID.OUROBOROS || LEGACIES.has(id) ? 'getsu' : COILS.has(id) || TWIN_VENOM[id] || id === ID.UNCOILED ? 'shoha' : FINISHERS.has(id) || MAW3.has(id) ? 'kenki' : 'steel'),
        fxPower: (id) => (id === ID.OUROBOROS ? 1.6 : GENS.includes(id) || id === ID.REAWAKEN ? 1.3 : 1),
        fxCount: (id) => (TWIN_VENOM[id] ? 2 : 1),
        castColor: () => 'shoha',
        gcdColor: (id) => (GENS.includes(id) || id === ID.OUROBOROS || id === ID.REAWAKEN ? '#6ad0f0' : COILS.has(id) || id === ID.UNCOILED ? '#ff7a5a' : null),
        hotOgcd: (id) => [ID.IRE].includes(id),
        weapon: 'slash', magicTone: 'dark',
        tipCost: (id) => (A[id]?.eff?.cost?.gauge && gauges[A[id].eff.cost.gauge] ? [A[id].eff.cost.gauge, A[id].eff.cost.n] : null),
        report(s) {
          const issues = [], metrics = [], goods = [];
          if (s.stats.offeringOver) issues.push({ loss: Math.min(100, s.stats.offeringOver) * 0.1, rate: s.stats.offeringOver > 30 ? 'bad' : 'ok', title: `霊力ゲージが ${s.stats.offeringOver} あふれた`, advice: '霊力ゲージが 50 以上なら、あふれる前に祖霊降ろし' });
          if (s.stats.coilOver) issues.push({ loss: s.stats.coilOver * 3, rate: 'bad', title: `飛蛇の魂が ${s.stats.coilOver} あふれた`, advice: '飛蛇の魂が 3 のときは、壱の蛇【強砕】・蛇の霊気の前に飛蛇の尾で使う' });
          if (s.stats.followLost) issues.push({ loss: s.stats.followLost * 2, rate: 'bad', title: `使わずに消えた続き（蛇尾術・双牙）${s.stats.followLost}`, advice: '参の牙・弐の蛇・祖霊の牙のあとは、次のウェポンスキルの前に蛇尾術・双牙連術・双牙乱術を使う' });
          if (s.stats.venomMiss) issues.push({ loss: s.stats.venomMiss * 2, rate: 'bad', title: `鋭牙の付いていない参の牙 ${s.stats.venomMiss} 回`, advice: '弐の牙は光っている方（ヴァイパーサイトの光る刀身の側）を選び、参の牙も光っている方を使う' });
          if (s.stats.genMiss) issues.push({ loss: s.stats.genMiss * 2, rate: 'bad', title: `祖霊の牙の順番違い ${s.stats.genMiss} 回`, advice: '祖霊降ろしのあとは 壱 → 弐 → 参 → 肆 → 祖霊の大蛇牙 の順に' });
          if (s.stats.tributeLost) issues.push({ loss: s.stats.tributeLost * 3, rate: 'bad', title: `使わずに消えた霊力 ${s.stats.tributeLost}`, advice: '祖霊降ろしの 30 秒のうちに、祖霊の牙 4 つと祖霊の大蛇牙を使い切る' });
          metrics.push({ label: '祖霊降ろし', value: `${s.stats.reawakens} 回`, rate: null });
          if (!s.stats.venomMiss && !s.stats.followLost && s.stats.gcds > 10) goods.push('鋭牙の参の牙と続きの技を無駄にしていない');
          return { issues, metrics, goods, overPct: Math.max(0, 100 - s.stats.venomMiss * 5 - s.stats.followLost * 5 - Math.min(40, (s.stats.offeringOver) / 3)), posAdvice: '参の牙【側撃】・【側裂】と弐の蛇【猛襲】は側面、参の牙【背撃】・【背裂】と弐の蛇【疾速】は背面。弐の牙を選んだ時点で次の向きが決まる。間に合わないときはトゥルーノース', castAdvice: 'ヴァイパーに詠唱はない', rangeAdvice: '離れたら飛蛇の尾（飛蛇の魂）か飛蛇の牙でつなぐ。蛇行で近づく', comboAdvice: '壱の牙 → 弐の牙 → 参の牙 の順に。壱の蛇・祖霊降ろしなどはコンボを切らない' };
        },
        howto: 'ヴァイパー: 壱の牙 → 弐の牙 → 参の牙 を光っている方から（ヴァイパーサイトの光る刀身の側）。参の牙は側面か背面。参の牙のあとは蛇尾術（蛇尾撃）。猛襲と疾速を切らさない。壱の蛇【強砕】→ 弐の蛇【猛襲】/【疾速】→ 双牙連術・双牙乱術。霊力ゲージ 50 で祖霊降ろし → 祖霊の牙 壱・弐・参・肆（それぞれ蛇尾術）→ 祖霊の大蛇牙。',
        gaugeUI: (D) => window.MockGauge2.create(D.gauge, 'VPR'),
        gaugeDefault: { JobHudRDB0: { x: 62, y: 64, anchor: 4, scale: 1 }, JobHudRDB1: { x: 78, y: 64, anchor: 4, scale: 1 } },
      };
      return J;
    },
  };

  Object.assign(window.MockJobs, { MNK, NIN, DRG, RPR, VPR });
})();
