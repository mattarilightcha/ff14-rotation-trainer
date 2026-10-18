// ジョブの決まり（近接: モンク・竜騎士・忍者・リーパー・ヴァイパー）。書き方は jobs.js と同じ（create(R) で作る。R は mock.js が渡す道具）。
// 共通の部品は jobs.js の window.MockJobs.lib。値は説明文（抽出データの description と、build-mock-data.mjs が読み取った eff / pot）と
// 公式ジョブガイドのダンプ（特性・ジョブ HUD の説明）から。どちらにもない決まりは「仮」と書き、docs/SPEC.md §10 に載せる。
(function () {
  'use strict';
  const { tooltipBlocked, descCharges, guideTrait, numIn } = window.MockJobs.lib;
  // クリティカルの代わり（仮 GAME-77）: クリティカルの発動率。乱数は「敵の技の並び」の種から作る（同じ種なら毎回同じ）
  const CRIT_RATE = 0.25;
  const seeded = (R, salt) => window.MockPixel?.rng?.(((R.OPT.seed ?? 1) * 104729 + salt) | 0) ?? Math.random;

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
      function addChakra(n, why) {
        const s = S(), max = chakraMax();
        const over = Math.max(0, s.chakra + n - max);
        if (over > 0 && s.phase === 'combat') s.stats.chakraOver += over;
        s.chakra = Math.min(max, s.chakra + n);
        void why;
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
          s.chakra = 5; s.beast = []; s.lunar = false; s.solar = false; s.roeHot = false; s.rng = seeded(R, 7);
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
          // 闘気: ウェポンスキルのクリティカル（クリティカルの代わりに発動率の乱数。六合星導脚は付かない）と、桃園結義の間はウェポンスキルが当たるたび
          if (a.isGcd && a.pot?.base && id !== ID.SSS) {
            const crit = s.critOpo || s.rng() < CRIT_RATE;
            if (crit && s.rng() < WS_CRIT_RATE) addChakra(1, 'crit');
            if (has('bhChakra')) addChakra(1, 'bh');
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
          if (id === ID.STEELED || id === ID.INSPIRITED) addChakra(s.phase === 'combat' ? 1 : 5, 'meditate');
          if (id === ID.TFC || id === ID.ENLIGHTEN) { s.chakra -= 5; s.stats.tfc++; }
          if (id === ID.SSS) s.chakra = 0;
          if (id === ID.PB) R.buff('pb', 20000, 3);
          if (id === ID.ROF) { R.buff('rof', 20000); R.buff('fireReady', 20000); }
          if (id === ID.FIRE) { R.remove('fireReady'); setForm(null); R.buff('formless', 30000); }
          if (id === ID.BH) { R.buff('bh', 20000); R.buff('bhChakra', 20000); }
          if (id === ID.ROW) { R.buff('row', 15000); R.buff('windReady', 15000); }
          if (id === ID.WIND) R.remove('windReady');
          if (id === ID.ROE) { R.mitigate('self', 0.2, 10, '金剛の極意'); R.buff('roe', 10000); R.buff('earthReady', 30000); s.roeHot = false; }
          if (id === ID.EARTH) { R.remove('earthReady'); R.heal('party', numIn(a.desc, s.roeHot ? /金剛の決意効果中回復力：(\d+)/ : /回復力：(\d+)/, 300) * 0.0004); }
          if (id === ID.MANTRA) R.mark('party', 'マントラ', 15, { healUp: 0.1 });
          if (id === ID.SECONDWIND) R.heal('self', 800 * 0.0004);
          if (id === ID.BLOODBATH) R.buff('bloodbath', 20000);
          if (id === ID.TN) R.buff('tn', 10000);
        },
        // 金剛の極意の間にダメージを受けると金剛の決意（継続回復 回復力 100・15 秒）
        onHurt() {
          const s = S();
          if (has('roe') && !s.roeHot) { s.roeHot = true; R.hot('self', 100 * 0.0004, 15, '金剛の決意'); }
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
        howto: 'モンク: 壱の型（双竜脚 / 猿舞連撃）→ 弐の型（双掌打 / 竜頷正拳撃）→ 参の型（破砕拳 = 背面 / 虎襲崩拳 = 側面）を回す。功力のある技が光る。踏鳴の間は型を無視して 3 回でチャクラ 3 つ → 必殺技。闘気 5 で陰陽闘気斬。紅蓮の極意と桃園結義は 120 秒・60 秒ごと。',
        gaugeUI: (D) => window.MockGauge2.create(D.gauge, 'MNK'),
        gaugeDefault: { JobHudMNK0: { x: 64, y: 64, anchor: 4, scale: 1 }, JobHudMNK1: { x: 78, y: 64, anchor: 4, scale: 1 } },
      };
      return J;
    },
  };

  Object.assign(window.MockJobs, { MNK });
})();
