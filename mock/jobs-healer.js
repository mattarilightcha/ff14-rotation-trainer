// ジョブの決まり（ヒーラー: 学者・賢者）。書き方は jobs.js と同じ（create(R) で作る。R は mock.js が渡す道具）。
// 共通の部品（説明文の効果を読む tooltipBlocked など）は jobs.js の window.MockJobs.lib。
// 値は説明文（抽出データの description と、build-mock-data.mjs が読み取った eff / pot）から。説明文にない決まりは「仮」と書き、docs/SPEC.md §10 に載せる。
(function () {
  'use strict';
  const { tooltipBlocked, tooltipResolve, HEAL_K, descCharges, support, actorTickPhase, mpTicks, naturalMp } = window.MockJobs.lib;
  const MP_MAX = 10000;
  const isSpell = (a) => a?.category === 2;
  // 説明文の「回復量のN％分のダメージを軽減」（鼓舞・コンソレイションのバリア）
  const barrierPct = (a) => Number(/回復量の(\d+)％分のダメージを軽減/.exec(a?.desc ?? '')?.[1] ?? 0);
  // 説明文の「被ダメージをN％軽減」
  const mitPct = (a) => Number(/被ダメージを(\d+)％軽減/.exec(a?.desc ?? '')?.[1] ?? 0);
  // 継続ダメージ（自分で持つ。3 秒ごと）: 付ける・進める
  function dotOn(R, key, a, name) {
    const s = R.S, d = a.pot.dot;
    s.dots[key] = { until: s.t + d.sec * 1000, next: s.t + 3000, potency: d.potency, mult: R.mult, name: name ?? a.name };
  }
  function dotsTick(R) {
    const s = R.S;
    for (const k of Object.keys(s.dots)) {
      const dd = s.dots[k];
      while (dd.next <= s.t && dd.next <= dd.until) { dd.next += 3000; if (s.phase === 'combat') R.dotTick(dd.potency, dd.mult, dd.name); }
      if (dd.until < s.t) delete s.dots[k];
    }
  }
  // 味方の対象: 選んだ相手（R.who）か、HP の低い方
  const pickWho = (R) => R.who ?? (R.hpOf('npc') > 0 && R.hpOf('npc') <= R.hpOf('self') ? 'npc' : 'self');

  // ---------------- 学者 ----------------
  // 説明文から:
  //   エーテルフロー: MP を最大 MP の 20% 回復し、エーテルフロー 3（最大スタック）。戦闘中だけ
  //   エナジードレイン・生命活性法・野戦治療の陣・不撓不屈の策・深謀遠慮の策: エーテルフローを 1 使い、フェイエーテル +10
  //     （フェイエーテルは、戦闘中にフェアリーかセラフィムがいるとき、エーテルフローを使う技で増える）
  //   鼓舞激励の策 / マニフェステーション / 意気軒昂の策: 回復と、回復量の 180% のバリア（鼓舞・30 秒）。クリティカルなら激励（同じく 180%）も付く
  //   秘策: 次の鼓舞激励の策・意気軒昂の策・不撓不屈の策・深謀遠慮の策 1 回は、MP もエーテルフローも使わず、必ずクリティカル
  //   応急戦術: 次の鼓舞・激励を伴う回復魔法 1 回は、バリアの分を回復にする
  //   展開戦術: 対象に付けた鼓舞を周囲に広げる（残りの時間のまま）。付けていなければ効果なし
  //   転化: フェアリーを帰して、エーテルフロー 3・回復魔法の効果 +20%（30 秒）。終わるとフェアリーが戻る
  //   サモン・セラフィム: フェアリーの代わりにセラフィム（22 秒）。コンソレイション（回復力 250 ＋回復量の 100% のバリア）が使える
  //   エーテルパクト: フェアリーがフェイユニオン（回復力 300 の継続回復。フェイエーテルを 10 ずつ使う）。再使用で解除
  //   深謀遠慮の策: HP が 50% 以下になるか 45 秒たつと、回復力 800
  //   連環計: 対象の被クリティカル +10%（20 秒）と埋伏の毒実行可（30 秒）
  //   セラフィズム: 20 秒、自分と周囲を回復力 100 で継続回復。鼓舞激励の策がマニフェステーションに変わり、応急戦術のリキャストが 1 秒になる
  // 仮（説明文にない: GAME-75）: フェアリー（エオス）は戦闘前に召喚済み。フェアリーの自動の回復（光の癒し・セラフィックヴェール）は
  //   回復力 120・3 秒ごと（セラフィムは同じ量のバリアも）。フェイユニオンは 3 秒ごと。フェイエーテルの上限は 100。
  //   クリティカルは秘策のときだけ（回復量の上乗せはしない）。フェイイルミネーションの被魔法ダメージ 5% 軽減は、練習場の攻撃すべてに効かせる。
  //   連環計の被クリティカル上昇は、与ダメージに入れない（クリティカルを扱っていないため）
  const SCH = {
    abbr: 'SCH',
    create(R) {
      const { A } = R;
      const ID = {
        BROIL: 25865, RUIN2: 17870, BIO: 16540, AOW: 25866, DRAIN: 167, FLOW: 166, CHAIN: 7436, BANEFUL: 37012, DISSIPATION: 3587,
        ADLO: 185, MANI: 37015, CONCIT: 37013, PHYSICK: 190, LUSTRATE: 189, INDOM: 3583, EXCOG: 7434, SOIL: 188, DEPLOY: 3585, EMERG: 3586,
        RECIT: 16542, PROTRACTION: 25867, EXPEDIENT: 25868, WHISPER: 16537, ILLUM: 16538, BLESSING: 16543, PACT: 7437, SERAPH: 16545,
        CONSOLATION: 16546, SERAPHISM: 37014, EOS: 17215, RESURRECTION: 173, SWIFT: 7561, LUCID: 7562, SURECAST: 7559,
      };
      const STATUS = {
        bio: { name: '蠱毒法', target: true, tracked: true },
        baneful: { name: '埋伏の毒', target: true },
        chain: { name: '連環計', target: true, tracked: true },
        banefulReady: { name: '埋伏の毒実行可' },
        flow: { name: 'エーテルフロー' },
        dissipation: { name: '転化' },
        recitation: { name: '秘策' },
        emergency: { name: '応急戦術' },
        seraphism: { name: 'セラフィズム' },
        seraph: { name: 'サモン・セラフィム' },
        illum: { name: 'フェイイルミネーション' },
        illumS: { name: 'セラフィックイルミネーション' },
        swift: { name: '迅速魔' },
        lucid: { name: 'ルーシッドドリーム' },
        surecast: { name: '堅実魔' },
      };
      const S = () => R.S;
      const has = R.has;
      const Au = () => window.MockAudio;
      const FEY_MAX = 100; // 仮（GAME-75）
      const FAIRY_MS = 3000, FAIRY_HEAL = 120; // フェアリーの自動の回復（仮 GAME-75）
      const UNION_MS = 3000; // フェイユニオンの間隔（仮 GAME-75）
      const RECIT_SET = new Set([ID.ADLO, ID.CONCIT, ID.INDOM, ID.EXCOG]); // 秘策が効く技（説明文）
      const GALV_SET = new Set([ID.ADLO, ID.MANI, ID.CONCIT]); // 鼓舞を付ける回復魔法
      const FLOW_COST = (a) => (a?.eff?.cost?.gauge === 'エーテルフロー' ? a.eff.cost.n : 0);
      const reciFree = (id) => RECIT_SET.has(id) && has('recitation');
      const mpCost = (a) => (reciFree(a.id) ? 0 : a.mp ?? 0);
      const gauges = { エーテルフロー: { get: () => S().flow, set: (v) => setFlow(v), max: 3 } };
      const seraphOn = () => { const s = S(); return !!s.seraph && s.seraph.until > s.t; };
      const fairyHere = () => S().fairy && !has('dissipation') && !seraphOn(); // 説明文の「フェアリーが存在する」（セラフィムの間はいない）
      const petHere = () => fairyHere() || seraphOn();
      // エーテルフロー（ステータスのスタックとしても出す）
      function setFlow(v) {
        const s = S();
        s.flow = Math.max(0, Math.min(3, v));
        if (s.flow > 0) R.buff('flow', 1e9, s.flow); else R.remove('flow');
      }
      function refillFlow(why) {
        const s = S();
        if (s.flow > 0) { s.stats.flowLost += s.flow; R.addLog('warn', `${why}: エーテルフロー ${s.flow} つを使わずに上書きしました`); R.ev('ミス', { result: '上書き', note: `エーテルフロー ${s.flow} つ` }); }
        setFlow(3);
      }
      function feyGain(n) {
        const s = S();
        if (s.phase !== 'combat' || !petHere()) return;
        const over = Math.max(0, s.fey + n - FEY_MAX);
        if (over > 0) { s.stats.feyOver += over; R.addLog('warn', `フェイエーテルがあふれました（+${over}）`); }
        s.fey = Math.min(FEY_MAX, s.fey + n);
      }
      // 自分の回復魔法の倍率: 転化 +20%、フェイイルミネーション +10%（説明文「回復魔法」。アビリティには掛けない）
      const healUp = (a) => (isSpell(a) ? (has('dissipation') ? 1.2 : 1) * (has('illum') || has('illumS') ? 1.1 : 1) : 1);
      function endUnion(why) {
        const s = S();
        if (!s.union) return;
        R.unmark?.(s.union.who, 'フェイユニオン');
        R.addLog('sys', `フェイユニオンが終わりました（${why}）`);
        s.union = null;
      }
      // 鼓舞（クリティカルなら激励も）。応急戦術のときはバリアの分も回復にする
      function galvanize(a, who, crit) {
        const s = S(), heal = (a.eff?.heal ?? 0) * HEAL_K * healUp(a), shield = heal * (barrierPct(a) / 100) * (crit ? 2 : 1);
        if (has('emergency')) {
          R.remove('emergency');
          R.heal(who, heal + shield);
          R.addLog('ok', `${a.name}: 応急戦術（バリアの分も回復）`);
          return;
        }
        R.heal(who, heal);
        R.shield(who, shield, 30, '鼓舞');
        s.galv = { who, until: s.t + 30000 };
        if (crit) R.addLog('ok', `${a.name}: クリティカル（激励も付与）`);
      }
      const J = {
        ids: ID, STATUS,
        charges: descCharges(A), // コンソレイション「最大チャージ数：2」
        prepull: new Set([ID.BROIL, ID.EOS, ID.SWIFT, ID.ADLO, ID.CONCIT, ID.PHYSICK, ID.RECIT, ID.SURECAST]),
        comboStarters: new Set(),
        procStatus: { 183: 'banefulReady' },
        ownDots: true, // 蠱毒法と埋伏の毒の 2 つを持つ
        initState(s) {
          s.mp = MP_MAX; s.mpTick = actorTickPhase(R); s.flow = 0; s.fey = 0; s.fairy = true; s.seraph = null; s.union = null; s.excog = null; s.galv = null;
          s.dots = {}; s.fairyNext = 0; s.dissip = false; s.banefulPending = false;
          s.stats.flowLost = 0; s.stats.feyOver = 0; s.stats.banefulLost = 0; s.stats.drains = 0; s.stats.fairyHeals = 0; s.stats.unionTicks = 0;
        },
        gaugeCols: [['MP', (s) => Math.floor(s.mp)], ['エーテルフロー', (s) => s.flow], ['フェイエーテル', (s) => s.fey], ['フェアリー', (s) => (s.seraph && s.seraph.until > s.t ? 'セラフィム' : s.fairy && !R.has('dissipation') ? 'エオス' : '')]],
        tracked: [['蠱毒法', 'bio', '#b8f070', '切れる前（残り 3 秒ほど）に付け直す'], ['連環計', 'chain', '#ffd27a', '120 秒ごと。埋伏の毒もこの中で']],
        speed: () => 1,
        comboFree: () => false,
        resolve: (id) => tooltipResolve(R, J, id), // 鼓舞激励の策 → マニフェステーション（セラフィズム中）
        blocked(id) {
          const s = S(), a = A[id];
          if (!a) return null;
          // マニフェステーションの発動条件（セラフィズム）は使っても消えない。エーテルフローは秘策なら不要
          const t = tooltipBlocked(R, J, a, reciFree(id) ? {} : gauges);
          if (t) return t;
          if (isSpell(a) && mpCost(a) > s.mp) return `MP が足りません（必要 ${mpCost(a)} / 現在 ${Math.floor(s.mp)}）`;
          if ([ID.FLOW, ID.DISSIPATION, ID.SERAPHISM].includes(id) && s.phase !== 'combat') return '戦闘中だけ使えます';
          if ([ID.WHISPER, ID.ILLUM, ID.SERAPHISM].includes(id) && !petHere()) return 'フェアリーもセラフィムもいません';
          if ([ID.BLESSING, ID.SERAPH, ID.DISSIPATION].includes(id) && !fairyHere()) return seraphOn() ? 'セラフィムの召喚中です（フェアリーがいません）' : 'フェアリーがいません';
          if (id === ID.PACT && !s.union) {
            if (!fairyHere()) return 'フェアリーがいません';
            if (s.fey < 10) return `フェイエーテルが足りません（必要 10 / 現在 ${s.fey}）`;
          }
          if (id === ID.CONSOLATION && !seraphOn()) return 'セラフィムがいません';
          if (id === ID.DISSIPATION && has('seraphism')) return '転化はセラフィズムと同時に付与されません';
          if (id === ID.SERAPHISM && has('dissipation')) return 'セラフィズムは転化と同時に付与されません';
          if (id === ID.EOS) {
            if (has('dissipation')) return '転化の効果中はサモン・エオスを使えません';
            if (s.fairy || seraphOn()) return 'フェアリーを召喚しています';
          }
          if (id === ID.RESURRECTION && !R.npcDown()) return '戦闘不能の味方がいません';
          return null;
        },
        // 迅速魔: 次の 1 回の魔法の詠唱時間なし
        castMs: (a, base) => (base && isSpell(a) && has('swift') ? 0 : base),
        // 蠱毒法・埋伏の毒は継続ダメージだけ（使ったときの攻撃は無い）
        noHit: (id) => id === ID.BIO || id === ID.BANEFUL,
        effects(id) {
          const a = A[id], s = S();
          const reci = reciFree(id);
          if (isSpell(a) && a.castMs > 0 && has('swift')) R.remove('swift');
          if (isSpell(a)) s.mp = Math.max(0, s.mp - mpCost(a));
          // エーテルフローを使う技: 1 つ使い、フェイエーテル +10（秘策なら使わない）
          const fc = FLOW_COST(a);
          if (fc && !reci) setFlow(s.flow - fc);
          if (fc) feyGain(10);
          if (reci) R.remove('recitation');
          if (id === ID.FLOW) { s.mp = Math.min(MP_MAX, s.mp + MP_MAX * 0.2); refillFlow('エーテルフロー'); }
          if (id === ID.DRAIN) s.stats.drains++;
          if (id === ID.BIO) { dotOn(R, 'bio', a); R.buff('bio', a.pot.dot.sec * 1000); }
          if (id === ID.CHAIN) { R.buff('chain', 20000); R.buff('banefulReady', (a.eff?.grant?.[0]?.sec ?? 30) * 1000); s.banefulPending = true; }
          if (id === ID.BANEFUL) { R.remove('banefulReady'); s.banefulPending = false; dotOn(R, 'baneful', a); R.buff('baneful', a.pot.dot.sec * 1000); }
          // 回復
          if (GALV_SET.has(id)) galvanize(a, id === ID.CONCIT ? 'party' : 'low', reci);
          if ([ID.PHYSICK, ID.LUSTRATE, ID.INDOM, ID.BLESSING].includes(id)) support(R, a, { healUp: healUp(a) });
          if (id === ID.EXCOG) { const w = pickWho(R); s.excog = { who: w, until: s.t + 45000 }; R.mark(w, '深謀遠慮の策', 45); }
          if (id === ID.SOIL) {
            // 野戦治療の陣: 地面に置く（中の味方の被ダメージ 10% 軽減と継続回復）
            const hot = a.eff.hot;
            R.zone('soil', { r: a.effectRange || 15, sec: hot.sec, frac: hot.potency * HEAL_K, mit: mitPct(a) / 100, ring: true, col: ['#f6ffd8', '#8ad860'] });
            Au()?.water();
          }
          if (id === ID.DEPLOY) {
            // 展開戦術: 対象の鼓舞を周囲に広げる（残りの時間のまま）
            const w = R.who ?? 'self', sh = R.shieldOf?.(w);
            if (sh && sh.name === '鼓舞' && sh.frac > 0) { R.shield('party', sh.frac, sh.left, '鼓舞'); R.addLog('ok', `展開戦術: 鼓舞を広げた（残り ${sh.left.toFixed(0)} 秒）`); }
            else R.addLog('warn', '展開戦術: 対象に鼓舞が付いていません（効果なし）');
          }
          if (id === ID.EMERG) { R.buff('emergency', 15000); if (has('seraphism')) R.cdShift(ID.EMERG, a.recastMs - 1000); } // セラフィズム中はリキャスト 1 秒
          if (id === ID.RECIT) R.buff('recitation', 15000);
          if (id === ID.PROTRACTION) { const w = R.who ?? 'self'; R.heal(w, 0.1); R.mark(w, '生命回生法', 10, { healUp: 0.1 }); }
          if (id === ID.EXPEDIENT) R.mitigate('party', 0.1, 20, '怒濤の計');
          // フェアリー・セラフィムの技
          if (id === ID.WHISPER) { R.hot('party', a.eff.hot.potency * HEAL_K, a.eff.hot.sec, seraphOn() ? '光輝の囁き' : '光の囁き'); R.pet('act'); }
          if (id === ID.ILLUM) { const k = seraphOn() ? 'illumS' : 'illum'; R.buff(k, 20000); R.mitigate('party', 0.05, 20, STATUS[k].name); R.pet('act'); }
          if (id === ID.BLESSING) R.pet('act');
          if (id === ID.CONSOLATION) {
            const heal = (a.eff?.heal ?? 0) * HEAL_K;
            R.heal('party', heal); R.shield('party', heal * (barrierPct(a) / 100), 30, 'コンソレイション'); R.pet('act');
          }
          if (id === ID.PACT) {
            if (s.union) endUnion('解除');
            else { const w = pickWho(R); s.union = { who: w, next: s.t + UNION_MS }; R.mark(w, 'フェイユニオン', 9999); R.pet('act'); }
          }
          if (id === ID.SERAPH) {
            endUnion('セラフィムを召喚');
            s.seraph = { until: s.t + 22000 }; R.buff('seraph', 22000); R.pet('seraph', 22);
            R.addLog('ok', 'セラフィムを召喚（22 秒）'); Au()?.surge();
          }
          if (id === ID.SERAPHISM) {
            R.buff('seraphism', 20000); R.hot('party', a.eff.hot.potency * HEAL_K, a.eff.hot.sec, 'セラフィズム');
            R.cdShift(ID.EMERG, 1e9); // 応急戦術のリキャストをリセット
            Au()?.surge();
          }
          if (id === ID.DISSIPATION) {
            endUnion('転化');
            refillFlow('転化'); R.buff('dissipation', 30000); s.dissip = true; R.pet(null, 0);
            R.addLog('ok', '転化: フェアリーが帰還（30 秒後に戻る）');
          }
          if (id === ID.EOS) { s.fairy = true; R.pet('eos', 0); }
          if (id === ID.RESURRECTION && R.npcDown()) R.raise();
          if (id === ID.SWIFT) R.buff('swift', 10000);
          if (id === ID.LUCID) R.buff('lucid', 21000);
          if (id === ID.SURECAST) R.buff('surecast', 6000);
        },
        tick(dt) {
          const s = S();
          dotsTick(R);
          // 転化の終わり: フェアリーが戻る
          if (s.dissip && !has('dissipation')) { s.dissip = false; if (s.fairy) { R.pet('eos', 0); R.addLog('sys', '転化が終わり、フェアリーが戻りました'); } }
          if (s.seraph && s.seraph.until <= s.t) { s.seraph = null; R.addLog('sys', 'セラフィムが帰還しました（フェアリーが戻る）'); }
          if (s.galv && s.galv.until <= s.t) s.galv = null;
          if (s.banefulPending && !has('banefulReady')) { s.banefulPending = false; s.stats.banefulLost++; R.addLog('warn', '埋伏の毒実行可を使わずに切らしました'); }
          // 深謀遠慮の策: HP が 50% 以下か、45 秒たつと回復
          if (s.excog && (R.hpOf(s.excog.who) <= 0.5 || s.t >= s.excog.until)) {
            const w = s.excog.who; s.excog = null;
            R.unmark?.(w, '深謀遠慮の策');
            R.heal(w, (A[ID.EXCOG]?.desc.match(/回復力：(\d+)/)?.[1] ?? 800) * HEAL_K);
            R.addLog('ok', '深謀遠慮の策が発動');
          }
          if (s.phase !== 'combat' && s.phase !== 'countdown') return;
          // MP の自然回復（actor tick）と、ルーシッドドリーム（同じ周期で 550: 召喚士と同じ）
          for (let n = mpTicks(s, dt); n > 0; n--) s.mp = Math.min(MP_MAX, s.mp + naturalMp(s) + (has('lucid') ? 550 : 0));
          if (s.phase !== 'combat') return;
          // フェイユニオン: 3 秒ごとにフェイエーテルを 10 使い、回復力 300（仮の間隔）
          if (s.union) {
            if (!fairyHere()) endUnion('フェアリーがいない');
            while (s.union && s.union.next <= s.t) {
              s.union.next += UNION_MS;
              if (s.fey < 10) { endUnion('フェイエーテルが尽きた'); break; }
              s.fey -= 10; s.stats.unionTicks++;
              R.heal(s.union.who, 300 * HEAL_K, 'tick');
            }
          }
          // フェアリー・セラフィムの自動の回復（HP の減った味方に。仮 GAME-75）
          if (s.t >= s.fairyNext) {
            s.fairyNext = s.t + FAIRY_MS;
            const who = R.hpOf('npc') > 0 && R.hpOf('npc') < R.hpOf('self') ? 'npc' : 'self';
            if (petHere() && !s.union && R.hpOf(who) < 0.995) {
              R.heal(who, FAIRY_HEAL * HEAL_K, 'tick');
              if (seraphOn()) R.shield(who, FAIRY_HEAL * HEAL_K, 30, 'セラフィックヴェール');
              s.stats.fairyHeals++; R.pet('act');
            }
          }
        },
        highlightOk: () => true,
        glow(id) {
          const s = S();
          if (id === ID.FLOW) return s.phase === 'combat' && s.flow === 0;
          if (id === ID.DRAIN) return s.flow > 0;
          if (id === ID.BIO) return !s.dots.bio || s.dots.bio.until - s.t < 3000;
          if (id === ID.CONSOLATION) return seraphOn();
          if (id === ID.MANI) return has('seraphism');
          if (id === ID.EOS) return !s.fairy && !has('dissipation');
          return false;
        },
        guide: () => null,
        positional: () => null,
        fxColor: (id) => (id === ID.BIO || id === ID.BANEFUL ? 'setsu' : A[id]?.eff?.heal != null || A[id]?.eff?.hot ? 'heal' : id === ID.CHAIN ? 'kenki' : 'getsu'),
        fxPower: (id) => (id === ID.BANEFUL || id === ID.CHAIN || id === ID.SERAPH ? 1.4 : 1),
        fxCount: () => 1,
        castColor: (id) => (A[id]?.eff?.heal != null ? 'heal' : 'getsu'),
        castPower: 0.4,
        gcdColor: (id) => (id === ID.BROIL ? '#ffd9a0' : id === ID.BIO ? '#b8f070' : A[id]?.eff?.heal != null ? '#8fe8a8' : null),
        hotOgcd: (id) => id === ID.CHAIN || id === ID.BANEFUL || id === ID.SERAPH,
        weapon: 'blunt', magicTone: 'aether',
        sfxKind: (id) => (id === ID.EOS || id === ID.SERAPH ? { g: 'boost', v: 'summon' } : null),
        tipCost: (id) => (A[id] && isSpell(A[id]) && (A[id].mp ?? 0) > 0 ? ['MP', A[id].mp] : FLOW_COST(A[id]) ? ['エーテルフロー', FLOW_COST(A[id])] : id === ID.PACT ? ['フェイエーテル', 10] : null),
        report(s) {
          const issues = [], metrics = [], goods = [];
          if (s.stats.flowLost) issues.push({ loss: s.stats.flowLost * 3, rate: 'bad', title: `エーテルフローの上書き ${s.stats.flowLost}`, advice: 'エーテルフロー・転化の前に、エナジードレインか回復のアビリティでエーテルフローを使い切る' });
          if (s.stats.feyOver) issues.push({ loss: Math.min(10, s.stats.feyOver / 10), rate: s.stats.feyOver > 30 ? 'bad' : 'ok', title: `フェイエーテルのあふれ ${s.stats.feyOver}`, advice: '100 近くたまったら、エーテルパクト（フェイユニオン）で相方を回復しながら使う' });
          if (s.stats.banefulLost) issues.push({ loss: s.stats.banefulLost * 4, rate: 'bad', title: `埋伏の毒の使い忘れ ${s.stats.banefulLost} 回`, advice: '連環計のあと 30 秒以内に、光っている埋伏の毒を使う' });
          metrics.push({ label: 'エーテルフローの上書き', value: `${s.stats.flowLost}`, rate: Math.max(0, 100 - s.stats.flowLost * 15) });
          metrics.push({ label: 'エナジードレイン', value: `${s.stats.drains} 回`, rate: null });
          metrics.push({ label: 'フェアリーの自動の回復', value: `${s.stats.fairyHeals} 回`, rate: null });
          metrics.push({ label: 'フェイユニオンの回復', value: `${s.stats.unionTicks} 回`, rate: null });
          metrics.push({ label: 'MP（終了時）', value: `${Math.floor(s.mp)}`, rate: null });
          if (!s.stats.flowLost && s.stats.gcds > 10) goods.push('エーテルフローの上書きなし');
          return { issues, metrics, goods, overPct: Math.max(0, 100 - s.stats.flowLost * 10 - s.stats.banefulLost * 10), posAdvice: '', comboAdvice: '光っている技（埋伏の毒・エーテルフロー・エナジードレイン）を', castAdvice: '極炎法・鼓舞激励の策の詠唱中は動かない（詠唱の終わり際は動いても完了する: 滑り撃ち）。動くときはルインラ・蠱毒法・アビリティ', rangeAdvice: '魔法の射程（25m）の中にいる。回復は味方から 30m 以内で',
            careAdvice: 'タンクの HP が半分を切ったら回復。生命活性法・深謀遠慮の策・エーテルパクトなどのアビリティは、動きながらでも使える', lowAdvice: '早めに回復する（深謀遠慮の策を先に付けておく・タンクを野戦治療の陣の中に入れる）' };
        },
        howto: '学者: 極炎法を撃ち続け、蠱毒法を切らさない。エーテルフロー（60 秒ごと）の 3 つは、次のエーテルフローまでに回復のアビリティかエナジードレインで使い切る。連環計（120 秒ごと）のあとは埋伏の毒。回復は生命活性法・不撓不屈の策・深謀遠慮の策・野戦治療の陣と、フェアリーの技（光の囁き・フェイブレッシング・エーテルパクト）で。タンクの HP も見て回復してください。',
        gaugeUI: (D) => window.MockGauge2.create(D.gauge, 'SCH'),
        gaugeDefault: { JobHudSCH0: { x: 66, y: 64, anchor: 4, scale: 1 }, JobHudSCH1: { x: 78, y: 64, anchor: 4, scale: 1 } },
      };
      return J;
    },
  };

  Object.assign(window.MockJobs, { SCH });
})();
