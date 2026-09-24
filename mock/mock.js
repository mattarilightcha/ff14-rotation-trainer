// 侍 木人練習 UI モック
// - 名称・アイコン・詠唱・リキャスト・コンボ元・射程・範囲は mock-data.js（クライアント抽出データ）から読む
// - 動き（剣気・閃・バフ）はツールチップの記述をもとにした簡易版。値の出典をコメントに書く
// - ゲームデータにない値は POLICY と arena.js の POL にまとめ、「仮」として扱う（docs/SPEC.md §10）
// - 画面: 戦闘は見下ろし 2D のドット絵（arena.js）、HUD は FF14 風。ジョブゲージは抽出した ULD とテクスチャ（gauge.js）
(() => {
  'use strict';
  const D = window.MOCK_DATA;
  const A = D.actions;
  const Au = window.MockAudio, GM = window.MockGameMode, Arena = window.MockArena;

  // ---- 仮の値（ゲームデータにない。アプリの方針値 / 未確認） ----
  const POLICY = {
    animLockMs: 600, // アニメーションロック（GAME-04）
    castLockAfterMs: 100, // 詠唱後の追加ロック（GAME-04, 07）
    queueMs: 500, // 先行入力の受付時間（GAME-05）
    comboWindowMs: 30000, // コンボ受付時間（GAME-06）
    kenkiMax: 100, // 剣気の上限（GAME-12）
    countdownMs: 3000,
    weaveWarn: 3, // GCD 間のアビリティがこの数に達したら警告（DESIGN-01）
    padTrigger: 0.5,
    slideMs: 500, // 詠唱の残りがこの時間より短ければ、動いても中断しない（GAME-55）
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
  const CHARGES = { 7499: 2, 7546: 2 }; // 明鏡止水・トゥルーノース「最大チャージ数：2」（シートの基本値は 1）

  const ID = {
    GYOFU: 36963, JINPU: 7478, SHIFU: 7479, YUKIKAZE: 7480, GEKKO: 7481, KASHA: 7482,
    FUKO: 25780, MANGETSU: 7484, OKA: 7485, ENPI: 7486,
    IAI: 7867, HIGAN: 7489, TENKA: 7488, MIDARE: 7487, TENDO_GOKEN: 36965, TENDO_SETSU: 36966,
    TSUBAME: 16483, K_GOKEN: 16485, K_SETSU: 16486, TK_GOKEN: 36967, TK_SETSU: 36968,
    SHINTEN: 7490, KYUTEN: 7491, GYOTEN: 7492, YATEN: 7493, HAGAKURE: 7495, GUREN: 7496, SENEI: 16481,
    MEDITATE: 7497, MEIKYO: 7499, TN: 7546, IKISHOTEN: 16482, SHOHA: 16487,
    NAMIKIRI: 25781, K_NAMI: 25782, ZANSHIN: 36964,
  };
  // 剣気を消費するアクション（ツールチップ「発動条件：「剣気」N」。震天はシートの primaryCost 39/25 とも一致）
  const KENKI_COST = { 7490: 25, 7491: 25, 7492: 10, 7493: 10, 7496: 25, 16481: 25, 36964: 50 };
  // 明鏡止水のスタックを消費するウェポンスキル（「居合術および奥義波切を除くウェポンスキル」を簡易に解釈）
  const MEIKYO_CONSUMERS = new Set([ID.GYOFU, ID.JINPU, ID.SHIFU, ID.YUKIKAZE, ID.GEKKO, ID.KASHA, ID.FUKO, ID.MANGETSU, ID.OKA, ID.ENPI]);
  const COMBO_STARTERS = new Set([ID.GYOFU, ID.FUKO]);
  const COMBO_HAS_NEXT = new Set(Object.values(A).flatMap((a) => a.comboFrom));
  // カウントダウン中に使ってよいもの（GAME-30 未確認のため、自己バフのみ仮で許可）
  const PREPULL = new Set([ID.MEIKYO, ID.TN]);

  // アクションの変化（置き換え）: 元のボタン → 変化先。split[base] が true なら「変化させない（別ボタン）」（CFG-11）
  const GROUPS = D.replaceGroups;
  const TARGET_BASE = {};
  for (const [base, ts] of Object.entries(GROUPS)) for (const t of ts) (TARGET_BASE[t] ??= []).push(Number(base));
  const split = Object.fromEntries((D.splitDetected ?? []).map((b) => [b, true]));
  // バーごとに「ジョブ専用 / 共有」のどちらを使うか（CFG-08 未解読のため既定は推定。設定で切り替え可）
  let barSource = Object.fromEntries(Object.entries(D.bars).map(([k, v]) => [k, v.defaultSource]));

  // 光る条件（ハイライト）: ゲームデータ ActionProcStatus の行 → モックのステータス。
  // 行が指すステータス ID は再抽出で確定する（DATA-04）。対応づけは各アクションの説明文の「発動条件」から。
  const PROC_STATUS = { 14: 'enpi', 72: 'namikiriReady', 166: 'zanshinReady', 222: 'tsubame', 223: 'tsubame', 224: 'tsubame', 225: 'tsubame' };
  // 演出の色（見た目だけ。ゲームの値ではない）
  const FX_COLOR = {
    [ID.YUKIKAZE]: 'setsu', [ID.GEKKO]: 'getsu', [ID.KASHA]: 'ka', [ID.MANGETSU]: 'getsu', [ID.OKA]: 'ka', [ID.HIGAN]: 'blood',
    [ID.TENKA]: 'iai', [ID.MIDARE]: 'iai', [ID.TENDO_GOKEN]: 'iai', [ID.TENDO_SETSU]: 'iai',
    [ID.K_GOKEN]: 'iai', [ID.K_SETSU]: 'iai', [ID.TK_GOKEN]: 'iai', [ID.TK_SETSU]: 'iai',
    [ID.NAMIKIRI]: 'namikiri', [ID.K_NAMI]: 'namikiri', [ID.SHOHA]: 'shoha', [ID.MEIKYO]: 'water', [ID.IKISHOTEN]: 'kenki',
  };
  const TRIPLE = new Set([ID.MIDARE, ID.TENDO_SETSU, ID.K_SETSU, ID.TK_SETSU]);
  const POS_JA = { rear: '背面', flank: '側面', front: '正面' };

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
  // アイコン: 抽出データのステータスを名前で引く（再抽出で風月などが入れば自動で画像になる。なければ文字の札）
  const statusIcon = (meta) => D.statusIcons?.[meta.name] ?? (meta.sid ? D.statuses[meta.sid]?.icon : null) ?? null;

  const $ = (id) => document.getElementById(id);
  const stage = $('stage');

  // ---------------- 練習の設定（設定画面で変える。ブラウザに保存） ----------------
  const OPT = {
    durationMs: 120000,
    mech: 'normal', // 敵の範囲攻撃: off / easy / normal / hard
    tank: true, // タンクが敵を引きつける（敵の向きが固定され、背面・側面を取りやすい）
    guide: true, // 敵の足元に背面・側面を色分けする
    hints: true, // 敵の技の名前とよけ方を出す
    seed: 1, // 敵の技の並び（同じ種なら毎回同じ）
    arrows: true, // 矢印キーでも移動
    deadzone: Math.min(0.9, Math.max(0.05, D.display?.deadArea ?? 0.25)), // パッドのスティックの遊び（FFXIV.cfg の DeadArea）
    gaugeSimple: false, // ジョブゲージのシンプル表示
  };

  // ---------------- 状態 ----------------
  let S;
  function reset() {
    S = {
      phase: 'idle', t: -POLICY.countdownMs,
      gcdStart: null, gcdEnd: null, lockUntil: -Infinity, lastOgcdLockEnd: null, weaves: 0,
      cast: null, cds: {}, combo: null, comboUntil: 0,
      kenki: 0, sen: { setsu: 0, getsu: 0, ka: 0 }, med: 0, st: {},
      lastIai: null, lastIaiTendo: false, kaeshiNami: false, queue: null,
      stats: {
        gcds: 0, idleMs: 0, clipMs: 0, cutMs: 0, comboBreaks: 0, kenkiOver: 0, rejected: 0,
        uptime: { fugetsu: 0, fuka: 0, higanbana: 0 },
        pos: { rear: { n: 0, ok: 0 }, flank: { n: 0, ok: 0 } },
        hits: 0, downs: 0, interrupts: 0, outOfRange: 0, whiffs: 0, movingMs: 0, movingIdleMs: 0, outRangeMs: 0,
      },
      // 結果画面のタイムライン用の記録
      tl: { gcd: [], ogcd: [], gaps: [], buffs: { fugetsu: [], fuka: [], higanbana: [] }, move: [], hits: [], pos: [] },
      dotNext: null, hinted: false, moving: false, mech: null,
    };
    $('log').innerHTML = '';
    $('result').hidden = true;
    Arena.reset(arenaOpts());
    Arena.castEnd();
    Gauge.reset(S);
    clearStatuses();
    $('startOverlay').hidden = false;
    addLog('sys', `Space（パッドは Start）で開始。移動 ${keyLabel(D.move?.fore)}${keyLabel(D.move?.left)}${keyLabel(D.move?.back)}${keyLabel(D.move?.right)}・ジャンプ ${keyLabel(D.move?.jump) || 'なし'}`);
  }
  const arenaOpts = () => ({ tank: OPT.tank, mech: OPT.mech, guide: OPT.guide, seed: OPT.seed, durationMs: OPT.durationMs });
  const live = () => S.phase === 'countdown' || S.phase === 'combat';

  const fmt = (ms) => {
    const neg = ms < 0; ms = Math.abs(ms);
    const m = Math.floor(ms / 60000), s = (ms % 60000) / 1000;
    return `${neg ? '-' : ''}${String(m).padStart(2, '0')}:${s.toFixed(1).padStart(4, '0')}`;
  };
  function addLog(cls, text) {
    const li = document.createElement('li');
    li.innerHTML = `<span class="ts">${S ? fmt(S.t) : ''}</span>`;
    const span = document.createElement('span');
    span.className = cls; span.textContent = text;
    li.appendChild(span);
    const log = $('log');
    log.prepend(li);
    while (log.children.length > 60) log.lastChild.remove();
  }

  // ---------------- ルール ----------------
  const has = (k) => S.st[k] && S.st[k].until > S.t;
  const senCount = () => S.sen.setsu + S.sen.getsu + S.sen.ka;
  const mult = () => (has('fuka') ? TIP.fukaMult : 1);
  const gcdRecast = () => Math.round(A[ID.GYOFU].recastMs * mult());
  const ownCd = (a) => (a.cooldownGroup !== 58 && a.cooldownGroup ? a.cooldownGroup : null);
  const maxCh = (a) => CHARGES[a.id] ?? Math.max(1, a.maxCharges);

  function charges(a) {
    const full = S.cds[ownCd(a)] ?? -Infinity;
    const m = maxCh(a);
    return Math.max(0, m - Math.ceil(Math.max(0, full - S.t) / a.recastMs));
  }
  function cdReadyAt(a) {
    const full = S.cds[ownCd(a)] ?? -Infinity;
    return charges(a) > 0 ? S.t : full - (maxCh(a) - 1) * a.recastMs;
  }
  function readyAt(a) {
    let r = Math.max(S.lockUntil, S.cast ? S.cast.end : -Infinity);
    if (a.isGcd && S.gcdEnd != null) r = Math.max(r, S.gcdEnd);
    if (ownCd(a) != null) r = Math.max(r, cdReadyAt(a));
    return r;
  }

  // ボタン（ホットバーに入っている ID）→ 今実行されるアクション（置き換え。GAME-15 をツールチップから）
  function resolve(id) {
    if (id === ID.IAI) {
      const n = senCount();
      if (n === 1) return ID.HIGAN;
      if (n === 2) return has('tendo') ? ID.TENDO_GOKEN : ID.TENKA;
      if (n === 3) return has('tendo') ? ID.TENDO_SETSU : ID.MIDARE;
      return ID.IAI;
    }
    if (id === ID.TSUBAME && has('tsubame')) {
      if (S.lastIai === 'goken') return S.lastIaiTendo ? ID.TK_GOKEN : ID.K_GOKEN;
      if (S.lastIai === 'setsu') return S.lastIaiTendo ? ID.TK_SETSU : ID.K_SETSU;
    }
    if (id === ID.TSUBAME && S.kaeshiNami) return ID.K_NAMI; // 返し波切の replacesAction は燕返し（抽出データ）
    if (id === ID.NAMIKIRI && S.kaeshiNami) return ID.K_NAMI; // 奥義波切「実行すると「返し波切」に変化する」
    return id;
  }

  // 使用条件（満たさなければ理由を返す）
  function blocked(id) {
    if (!A[id].forJob) return `${A[id].name}は侍では使えません（共有バーに残っているアクション）`;
    if (S.phase === 'countdown' && !PREPULL.has(id)) return 'カウントダウン中は使えません（プリプルの条件は未確認）';
    if (id === ID.IAI) return '閃がありません';
    if (id === ID.TSUBAME) return '「燕返し実行可」の効果中ではありません';
    const c = KENKI_COST[id];
    if (c && S.kenki < c) return `剣気が足りません（必要 ${c} / 現在 ${S.kenki}）`;
    if (id === ID.ZANSHIN && !has('zanshinReady')) return '「残心実行可」の効果中ではありません';
    if (id === ID.NAMIKIRI && !has('namikiriReady')) return '「奥義波切実行可」の効果中ではありません';
    if (id === ID.SHOHA && S.med < 3) return `剣圧が足りません（${S.med}/3）`;
    if (id === ID.HAGAKURE && senCount() === 0) return '閃がありません';
    if (id === ID.IKISHOTEN && S.phase !== 'combat') return '戦闘中のみ使えます';
    const a = A[id];
    if (ownCd(a) != null && charges(a) === 0 && cdReadyAt(a) - S.t > POLICY.queueMs) {
      return maxCh(a) > 1 ? `${a.name}のチャージがありません` : `${a.name}はリキャスト中です（残り ${((cdReadyAt(a) - S.t) / 1000).toFixed(1)} 秒）`;
    }
    return null;
  }

  // 射程（抽出データ: range -1 は近接＝仮の値 POL.melee、正の値は m。自分中心の範囲技は射程なし）
  const rangeOf = (a) => (!a.hostile || a.shape === 2 ? null : a.range === -1 ? Arena.POL.melee : a.range > 0 ? a.range : null);
  // 位置の条件（戦闘不能・移動中の詠唱・射程）。kind は集計用
  function placeBlock(a) {
    if (Arena.isDown()) return { msg: '戦闘不能中です', kind: 'down' };
    if (a.castMs > 0 && Arena.isMoving()) return { msg: `移動中は詠唱できません（${a.name}）`, kind: 'moving' };
    const r = rangeOf(a);
    if (r != null) {
      const d = Arena.edgeDistance();
      if (d > r + 0.001) return { msg: `ターゲットが射程外です（${a.name}: 射程 ${r}m、あと ${(d - r).toFixed(1)}m）`, kind: 'range' };
    }
    return null;
  }
  // 当たるか: 自分中心の範囲技は範囲（effectRange）に敵の当たり判定が入っているか、単体は射程内か
  function reaches(a) {
    if (!a.hostile && a.shape === 2 && a.effectRange > 0) return Arena.edgeDistance() <= a.effectRange;
    const r = rangeOf(a);
    return r == null || Arena.edgeDistance() <= r + 0.001;
  }

  function kenki(n) {
    const v = S.kenki + n;
    if (v > POLICY.kenkiMax) {
      const over = v - POLICY.kenkiMax;
      S.stats.kenkiOver += over;
      addLog('warn', `剣気が ${over} あふれました`);
    }
    S.kenki = Math.max(0, Math.min(POLICY.kenkiMax, v));
  }
  function addSen(k, label) {
    if (S.sen[k]) addLog('warn', `${label}の閃が重複しました`);
    S.sen[k] = 1;
  }
  function addMed() {
    if (S.med >= 3) addLog('warn', '剣圧があふれました');
    S.med = Math.min(3, S.med + 1);
  }
  function buff(k, ms, stacks) {
    const iv = S.tl.buffs[k];
    if (iv) { const last = iv[iv.length - 1]; if (!last || last.to != null) iv.push({ from: Math.max(0, S.t), to: null }); }
    if (k === 'higanbana') S.dotNext = S.t + 3000;
    const cur = S.st[k];
    if (cur && cur.until > S.t && STATUS[k].tracked) {
      const left = cur.until - S.t;
      if (left > 10000) addLog('warn', `${STATUS[k].name}を早めに更新（残り ${(left / 1000).toFixed(1)} 秒を無駄に）`);
    }
    S.st[k] = { until: S.t + ms, stacks };
  }
  const remove = (k) => { delete S.st[k]; };

  // コンボ判定（GCD 実行時）。コンボボーナスが付くなら true
  function combo(a, at) {
    const meikyo = has('meikyo');
    if (a.comboFrom.length) {
      const ok = meikyo || (S.combo != null && a.comboFrom.includes(S.combo) && at <= S.comboUntil);
      if (!ok) { S.stats.comboBreaks++; addLog('ng', `コンボ切れ: ${a.name}の前段がありません`); }
      S.combo = ok && COMBO_HAS_NEXT.has(a.id) ? a.id : null;
      S.comboUntil = at + POLICY.comboWindowMs;
      return ok;
    }
    if (COMBO_STARTERS.has(a.id)) {
      if (S.combo != null) { S.stats.comboBreaks++; addLog('ng', 'コンボ切れ: 途中で始動技を使いました'); }
      S.combo = a.id; S.comboUntil = at + POLICY.comboWindowMs;
      return true;
    }
    if (!a.preservesCombo && S.combo != null) {
      S.stats.comboBreaks++; addLog('ng', `コンボ切れ: ${a.name}でコンボが途切れました`);
      S.combo = null;
    }
    return false;
  }

  function iai(kind, tendo) {
    S.sen = { setsu: 0, getsu: 0, ka: 0 };
    addMed();
    if (kind !== 'higan') { buff('tsubame', TIP.tsubameMs); S.lastIai = kind; S.lastIaiTendo = tendo; }
    if (tendo) remove('tendo');
  }

  // 効果（ツールチップの記述から）
  function effects(id, ok) {
    const meikyo = has('meikyo');
    switch (id) {
      case ID.GYOFU: kenki(5); break; // 暁風「剣気を5上昇」
      case ID.JINPU: if (ok) { buff('fugetsu', TIP.fuMs); kenki(5); } break;
      case ID.SHIFU: if (ok) { buff('fuka', TIP.fuMs); kenki(5); } break;
      case ID.YUKIKAZE: if (ok) { kenki(15); addSen('setsu', '雪'); } break;
      case ID.GEKKO: if (ok) { kenki(10); addSen('getsu', '月'); if (meikyo) buff('fugetsu', TIP.fuMs); } break;
      case ID.KASHA: if (ok) { kenki(10); addSen('ka', '花'); if (meikyo) buff('fuka', TIP.fuMs); } break;
      case ID.FUKO: kenki(10); break; // 風光「剣気を10上昇」
      case ID.MANGETSU: if (ok) { kenki(10); addSen('getsu', '月'); buff('fugetsu', TIP.fuMs); } break;
      case ID.OKA: if (ok) { kenki(10); addSen('ka', '花'); buff('fuka', TIP.fuMs); } break;
      case ID.ENPI: kenki(10); remove('enpi'); break;
      case ID.HIGAN: iai('higan', false); buff('higanbana', TIP.higanMs); break;
      case ID.TENKA: iai('goken', false); break;
      case ID.TENDO_GOKEN: iai('goken', true); break;
      case ID.MIDARE: iai('setsu', false); break;
      case ID.TENDO_SETSU: iai('setsu', true); break;
      case ID.K_GOKEN: case ID.K_SETSU: case ID.TK_GOKEN: case ID.TK_SETSU: remove('tsubame'); break;
      case ID.SHINTEN: case ID.KYUTEN: case ID.GUREN: case ID.SENEI: case ID.GYOTEN: kenki(-KENKI_COST[id]); break;
      case ID.YATEN: kenki(-10); buff('enpi', TIP.enpiMs); break;
      case ID.ZANSHIN: kenki(-50); remove('zanshinReady'); break;
      case ID.HAGAKURE: kenki(10 * senCount()); S.sen = { setsu: 0, getsu: 0, ka: 0 }; break;
      case ID.IKISHOTEN: kenki(50); buff('namikiriReady', TIP.ikiMs); buff('zanshinReady', TIP.ikiMs); break;
      case ID.NAMIKIRI: remove('namikiriReady'); addMed(); S.kaeshiNami = true; break;
      case ID.K_NAMI: S.kaeshiNami = false; break;
      case ID.SHOHA: S.med = 0; break;
      case ID.MEIKYO: buff('meikyo', TIP.meikyoMs, 3); buff('tendo', TIP.tendoMs); break;
      case ID.MEDITATE: S.med = 3; addLog('sys', '黙想: モックでは剣圧を即座に 3 にしています'); break;
      case ID.TN: buff('tn', TIP.tnMs); break;
      default: break;
    }
    if (meikyo && MEIKYO_CONSUMERS.has(id)) {
      const m = S.st.meikyo;
      m.stacks -= 1;
      if (m.stacks <= 0) remove('meikyo');
    }
  }

  // 方向指定（説明文の「背面攻撃時」「側面攻撃時」）。トゥルーノース中は向きを問わない
  function positionalOf(a) {
    if (!a.positional) return null;
    const tn = has('tn');
    const got = Arena.positional();
    const ok = tn || got === a.positional;
    const st = S.stats.pos[a.positional];
    st.n++; if (ok) st.ok++;
    S.tl.pos.push({ t: S.t, ok });
    addLog(ok ? 'ok' : 'ng', ok ? `方向指定 ○ ${a.name}（${tn ? 'トゥルーノース' : POS_JA[got]}）` : `方向指定ミス: ${a.name}は${POS_JA[a.positional]}から（今は${POS_JA[got]}）`);
    return { need: a.positional, ok };
  }
  function whiff(a) {
    S.stats.whiffs++;
    if (a.isGcd && S.combo != null && !a.preservesCombo) S.combo = null;
    addLog('ng', `${a.name}: 範囲内に敵がいません（空振り。範囲 ${a.effectRange}m）`);
  }
  // 当たったあとの共通処理（効果・方向指定・移動技・演出）
  function land(id, ok) {
    const a = A[id];
    if (!reaches(a)) { whiff(a); playFx(id, false, null, false); return; }
    effects(id, ok);
    const pos = positionalOf(a);
    addLog('ok', `${a.name}${ok && a.comboFrom.length ? '（コンボ）' : ''}`);
    if (a.dash) { Arena.dashToTarget(); Au?.whoosh(); }
    if (a.backstep) { Arena.backstep(a.backstep); Au?.whoosh(); }
    playFx(id, ok, pos, true);
  }

  function execute(id, at) {
    const a = A[id];
    const prevT = S.t;
    S.t = at;
    let ok = false;
    if (a.isGcd) {
      if (S.gcdEnd != null) {
        const gap = at - S.gcdEnd;
        if (gap > 20) {
          const clip = S.lastOgcdLockEnd != null ? Math.max(0, Math.min(at, S.lastOgcdLockEnd) - S.gcdEnd) : 0;
          const idle = gap - clip;
          S.stats.clipMs += clip; S.stats.idleMs += idle;
          if (clip > 20) S.tl.gaps.push({ from: S.gcdEnd, to: S.gcdEnd + clip, kind: 'clip' });
          if (idle > 20) S.tl.gaps.push({ from: S.gcdEnd + clip, to: at, kind: 'idle' });
          if (clip > 20) addLog('warn', `アビリティの挟みすぎで GCD が ${(clip / 1000).toFixed(2)} 秒遅れました`);
          if (idle > 100) addLog('warn', `GCD が ${(idle / 1000).toFixed(2)} 秒止まりました`);
        }
      } else if (at > 0 && S.phase === 'combat') {
        S.stats.idleMs += at;
        S.tl.gaps.push({ from: 0, to: at, kind: 'idle' });
      }
      S.gcdStart = at; S.gcdEnd = at + gcdRecast();
      S.tl.gcd.push({ t: at, id, end: S.gcdEnd });
      S.weaves = 0; S.lastOgcdLockEnd = null; S.stats.gcds++;
      ok = a.castMs > 0 || reaches(a) ? combo(a, at) : false;
    } else {
      S.tl.ogcd.push({ t: at, id });
      S.weaves++;
      if (S.weaves === POLICY.weaveWarn) addLog('warn', `GCD の間に ${S.weaves} つ目のアビリティ（クリップしやすい）`);
    }
    if (ownCd(a) != null) S.cds[ownCd(a)] = Math.max(S.cds[ownCd(a)] ?? -Infinity, at) + a.recastMs;
    if (a.castMs > 0) {
      const ct = Math.round(a.castMs * mult());
      S.cast = { id, start: at, end: at + ct, ok };
      S.lockUntil = at + ct + POLICY.castLockAfterMs;
      addLog('ok', `${a.name} の詠唱開始`);
      Arena.castStart(FX_COLOR[id] ?? 'iai', ct); Au?.cast(ct);
    } else {
      S.lockUntil = at + POLICY.animLockMs;
      if (!a.isGcd) S.lastOgcdLockEnd = S.lockUntil;
      land(id, ok);
    }
    S.t = Math.max(prevT, at);
  }

  // 詠唱の中断（移動・戦闘不能）。効果は出ず、GCD のリキャストは戻る（GAME-55 仮）
  function interruptCast(why) {
    const c = S.cast;
    if (!c) return;
    S.cast = null;
    Arena.castEnd();
    S.lockUntil = S.t;
    const a = A[c.id];
    if (a.isGcd) {
      S.gcdEnd = S.t;
      const g = S.tl.gcd[S.tl.gcd.length - 1];
      if (g && g.id === c.id) { g.end = S.t; g.cut = true; }
      S.stats.cutMs += S.t - c.start;
      S.tl.gaps.push({ from: c.start, to: S.t, kind: 'cut' });
    }
    S.stats.interrupts++;
    addLog('ng', `${a.name}の詠唱が中断されました（${why}）`);
    Au?.error();
  }

  function reject(msg, kind) {
    S.stats.rejected++;
    if (kind === 'range') S.stats.outOfRange++;
    Au?.error();
    addLog('ng', msg);
  }

  function press(baseId) {
    if (!live()) {
      // 開始前・終了後の入力は案内を 1 回だけ出す
      if (!S.hinted) { S.hinted = true; addLog('sys', 'Space（または「開始」）で練習を始めてください'); }
      return;
    }
    if (paused()) return;
    let id;
    if (TARGET_BASE[baseId]) {
      // 変化先のボタン（「変化させない」設定で別ボタンになったもの）
      id = baseId;
      if (!TARGET_BASE[baseId].some((b) => resolve(b) === id)) { reject(`${A[id].name}の発動条件を満たしていません`); return; }
    } else id = resolve(baseId);
    const a = A[id];
    const why = blocked(id);
    if (why) { reject(why); return; }
    const pb = placeBlock(a);
    if (pb) { reject(pb.msg, pb.kind); return; }
    const ra = readyAt(a);
    if (ra <= S.t) execute(id, S.t);
    else if (ra - S.t <= POLICY.queueMs) S.queue = { baseId };
    else {
      reject(a.isGcd && S.gcdEnd != null && S.gcdEnd > S.t ? `GCD のリキャスト中（残り ${((S.gcdEnd - S.t) / 1000).toFixed(1)} 秒）` : 'アニメーション硬直・詠唱中です');
    }
  }

  // ---------------- 時間の進行 ----------------
  const gcdIdleNow = () => !S.cast && (S.gcdEnd == null || S.gcdEnd <= S.t);
  function step(dt) {
    if (!live()) return;
    const t0 = S.t;
    const t1 = S.t + dt;
    if (S.phase === 'countdown') { const b = Math.ceil(-t0 / 1000), af = Math.ceil(-t1 / 1000); if (af !== b && af > 0) Au?.tick(); }
    // 移動による詠唱の中断（詠唱の残りが POLICY.slideMs より長いときだけ）
    if (S.cast && Arena.isMoving() && S.cast.end - t0 > POLICY.slideMs) interruptCast('移動した');
    // 詠唱完了（予定時刻で処理）
    if (S.cast && S.cast.end <= t1) {
      const c = S.cast; S.cast = null;
      S.t = c.end; Arena.castEnd(); land(c.id, c.ok);
    }
    // 先行入力の実行（実行可能になった時刻で処理）
    if (S.queue) {
      S.t = t0;
      const id = resolve(S.queue.baseId);
      const ra = readyAt(A[id]);
      if (ra <= t1) {
        S.queue = null; S.t = Math.max(t0, ra);
        const why = blocked(id), pb = placeBlock(A[id]);
        if (!why && !pb) execute(id, S.t); else reject(why ?? pb.msg, pb?.kind);
      }
    }
    S.t = t1;
    if (S.phase === 'combat') {
      // 稼働時間・移動の集計
      for (const k of Object.keys(S.stats.uptime)) if (has(k)) S.stats.uptime[k] += dt;
      const mv = Arena.isMoving();
      if (mv) { S.stats.movingMs += dt; if (gcdIdleNow() && !Arena.isDown()) S.stats.movingIdleMs += dt; }
      if (mv !== S.moving) {
        S.moving = mv;
        if (mv) S.tl.move.push({ from: S.t, to: null });
        else { const m = S.tl.move[S.tl.move.length - 1]; if (m && m.to == null) m.to = S.t; }
      }
      if (!Arena.isDown() && Arena.edgeDistance() > Arena.POL.melee) S.stats.outRangeMs += dt;
    }
    // 継続ダメージの演出（3 秒ごと。見た目だけ）
    if (S.dotNext != null && has('higanbana') && S.t >= S.dotNext) { S.dotNext += 3000; Arena.dotTick(); Au?.dot(); }
    // ステータスの期限切れ
    for (const [k, v] of Object.entries(S.st)) {
      if (v.until <= S.t) {
        delete S.st[k];
        const iv = S.tl.buffs[k]; if (iv?.length && iv[iv.length - 1].to == null) iv[iv.length - 1].to = v.until;
        if (STATUS[k].tracked && S.phase === 'combat') addLog('ng', `${STATUS[k].name}が切れました`);
        if (k === 'tsubame') S.lastIai = null;
      }
    }
    // コンボ期限切れ
    if (S.combo != null && S.t > S.comboUntil) { S.combo = null; S.stats.comboBreaks++; addLog('ng', 'コンボの受付時間が切れました'); }
    // フェーズ
    if (S.phase === 'countdown' && S.t >= 0) { S.phase = 'combat'; addLog('sys', '戦闘開始'); Au?.go(); }
    if (S.phase === 'combat' && S.t >= OPT.durationMs) finish();
  }

  // 敵の技・被弾（arena.js から）
  Arena.on('mech', (name, hint, castMs) => {
    if (!S || S.phase !== 'combat') return;
    S.mech = { name, hint, until: S.t + Math.max(castMs, 2600) };
    addLog('warn', `敵の技: ${name}${OPT.hints && hint ? `（${hint}）` : ''}`);
    if (castMs > 0) Au?.warn();
  });
  Arena.on('hit', (name) => {
    if (!S) return;
    S.stats.hits++; S.tl.hits.push(S.t);
    addLog('ng', `被弾: ${name}`);
    Au?.hurt();
  });
  Arena.on('down', (name) => {
    if (!S) return;
    S.stats.downs++;
    if (S.cast) interruptCast('戦闘不能');
    S.queue = null;
    addLog('ng', `戦闘不能: ${name}（3 秒後に起き上がります）`);
  });
  Arena.on('revive', () => { if (S && live()) addLog('sys', '起き上がりました（HP 60%）'); });

  // ---------------- 結果 ----------------
  function finish() {
    S.t = OPT.durationMs;
    S.phase = 'ended';
    S.cast = null; S.queue = null; Arena.castEnd();
    if (S.gcdEnd != null && S.gcdEnd < S.t) { S.stats.idleMs += S.t - S.gcdEnd; S.tl.gaps.push({ from: S.gcdEnd, to: S.t, kind: 'idle' }); }
    if (S.gcdEnd == null) S.stats.idleMs = S.t;
    for (const iv of [...Object.values(S.tl.buffs), S.tl.move]) if (iv.length && iv[iv.length - 1].to == null) iv[iv.length - 1].to = S.t;
    const st = S.stats, dur = OPT.durationMs;
    const pct = (ms) => (ms / dur) * 100;
    const gcdPct = Math.max(0, (1 - (st.idleMs + st.clipMs + st.cutMs) / dur) * 100);
    const buffPct = (pct(st.uptime.fugetsu) + pct(st.uptime.fuka) + pct(st.uptime.higanbana)) / 3;
    const comboPct = Math.max(0, 100 - st.comboBreaks * 10);
    const overPct = Math.max(0, 100 - st.kenkiOver * 2);
    const posN = st.pos.rear.n + st.pos.flank.n, posOk = st.pos.rear.ok + st.pos.flank.ok;
    const posPct = posN ? (posOk / posN) * 100 : 100;
    const dodgePct = OPT.mech === 'off' ? 100 : Math.max(0, 100 - st.hits * 15 - st.downs * 25);
    const moveGcdPct = st.movingMs > 1000 ? Math.max(0, (1 - st.movingIdleMs / st.movingMs) * 100) : null;
    // モックの採点（重みは仮。本実装は docs/SPEC.md §7）
    const score = Math.round(gcdPct * 0.4 + buffPct * 0.15 + comboPct * 0.1 + posPct * 0.15 + dodgePct * 0.1 + overPct * 0.1);
    const grade = score >= 95 ? 'S' : score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : 'D';
    const metric = (label, text, p) => `<div class="metric"><div class="row"><span>${label}</span><span class="v">${text}</span></div><div class="bar-bg"><div class="bar-fg ${p >= 90 ? '' : p >= 70 ? 'mid' : 'low'}" style="width:${Math.max(2, Math.min(100, p))}%"></div></div></div>`;
    const frac = (o) => (o.n ? `${o.ok}/${o.n}` : '—');
    const uses = {};
    for (const e of [...S.tl.gcd, ...S.tl.ogcd]) uses[e.id] = (uses[e.id] ?? 0) + 1;
    const useHtml = Object.entries(uses).sort((a, b) => b[1] - a[1]).map(([id, n]) => `<span class="use" title="${A[id].name}"><img src="${A[id].icon}" alt="">×${n}</span>`).join('');
    const r = $('result');
    r.innerHTML = `
      <div class="result-head"><div class="grade g-${grade}">${grade}</div>
        <div><h2>結果（モック採点）</h2><div class="score">総合 ${score} 点 ・ GCD ${st.gcds} 回 ・ 受け付けなかった入力 ${st.rejected} 回（うち射程外 ${st.outOfRange}）</div></div></div>
      <div class="metrics">
        ${metric('GCD 稼働率', `${gcdPct.toFixed(1)}%`, gcdPct)}
        ${metric('クリップ / 止まり / 詠唱中断', `${(st.clipMs / 1000).toFixed(1)} / ${(st.idleMs / 1000).toFixed(1)} / ${(st.cutMs / 1000).toFixed(1)} 秒`, 100 - pct(st.clipMs + st.idleMs + st.cutMs) * 4)}
        ${metric('方向指定（背面 / 側面）', `${frac(st.pos.rear)} ・ ${frac(st.pos.flank)}`, posPct)}
        ${metric('移動中の GCD 稼働率', moveGcdPct == null ? 'ほぼ移動なし' : `${moveGcdPct.toFixed(1)}%（移動 ${(st.movingMs / 1000).toFixed(1)} 秒）`, moveGcdPct ?? 100)}
        ${metric('被弾 / 戦闘不能', OPT.mech === 'off' ? '敵の攻撃なし' : `${st.hits} 回 / ${st.downs} 回`, dodgePct)}
        ${metric('射程外にいた時間', `${(st.outRangeMs / 1000).toFixed(1)} 秒`, 100 - pct(st.outRangeMs) * 3)}
        ${metric('風月の維持', `${pct(st.uptime.fugetsu).toFixed(1)}%`, pct(st.uptime.fugetsu))}
        ${metric('風花の維持', `${pct(st.uptime.fuka).toFixed(1)}%`, pct(st.uptime.fuka))}
        ${metric('彼岸花の維持', `${pct(st.uptime.higanbana).toFixed(1)}%`, pct(st.uptime.higanbana))}
        ${metric('コンボ切れ / 空振り', `${st.comboBreaks} 回 / ${st.whiffs} 回`, comboPct)}
        ${metric('剣気のあふれ', `${st.kenkiOver}`, overPct)}
        ${metric('詠唱の中断', `${st.interrupts} 回`, 100 - st.interrupts * 20)}
      </div>
      <canvas class="timeline" id="tlCanvas"></canvas>
      <div class="uses">${useHtml}</div>
      <div class="note">採点の重みは仮です（GCD 40% / バフ・DoT 15% / 方向指定 15% / コンボ 10% / 回避 10% / あふれ 10%）。移動速度・射程・方向指定の角度などは仮の値です（設定 → 練習）。</div>
      <div class="actions"><button type="button" id="btnRetry">リトライ <kbd>Space</kbd></button><button type="button" id="btnCloseResult">閉じる</button></div>`;
    r.hidden = false;
    $('btnRetry').addEventListener('click', start);
    $('btnCloseResult').addEventListener('click', () => { r.hidden = true; });
    drawTimeline($('tlCanvas'));
    addLog('sys', '戦闘終了');
  }

  // 結果のタイムライン: GCD（技の色）・止まり（赤）・クリップ（橙）・詠唱中断（紫）・アビリティ・方向指定・バフと DoT・移動・被弾
  function drawTimeline(cv) {
    const w = cv.clientWidth || 640, h = cv.clientHeight || 190, dpr = window.devicePixelRatio || 1;
    cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
    const c = cv.getContext('2d');
    c.scale(dpr, dpr);
    const L = 60, R = w - 10, dur = OPT.durationMs;
    const X = (t) => L + (Math.max(0, Math.min(dur, t)) / dur) * (R - L);
    const lanes = [['GCD', 8, 18], ['アビリティ', 34, 12], ['方向指定', 50, 10], ['風月', 66, 8], ['風花', 78, 8], ['彼岸花', 90, 8], ['移動', 104, 8], ['被弾', 116, 10]];
    c.font = '10px sans-serif'; c.textBaseline = 'middle';
    for (const [name, y, hh] of lanes) {
      c.fillStyle = 'rgba(255,255,255,.04)'; c.fillRect(L, y, R - L, hh);
      c.fillStyle = '#a9a293'; c.fillText(name, 6, y + hh / 2);
    }
    const color = (id) => ({ setsu: '#6fd3ff', getsu: '#8d86ff', ka: '#ff86c0', iai: '#ffc640', blood: '#ff5a4a', namikiri: '#4fe3ff' }[FX_COLOR[id]] ?? '#8aa4c8');
    for (const g of S.tl.gcd) { c.fillStyle = color(g.id); c.globalAlpha = g.cut ? 0.35 : 1; c.fillRect(X(g.t) + 0.5, 8, Math.max(1, X(g.end) - X(g.t) - 1), 18); }
    c.globalAlpha = 1;
    const gapCol = { clip: '#ffa53a', idle: '#ff4a4a', cut: '#c070ff' };
    for (const g of S.tl.gaps) { c.fillStyle = gapCol[g.kind]; c.fillRect(X(g.from), 26, Math.max(1.5, X(g.to) - X(g.from)), 4); }
    for (const o of S.tl.ogcd) {
      const x = X(o.t); c.fillStyle = KENKI_COST[o.id] ? '#ff7a5a' : '#ffe29a';
      c.beginPath(); c.moveTo(x, 34); c.lineTo(x + 4, 40); c.lineTo(x, 46); c.lineTo(x - 4, 40); c.closePath(); c.fill();
    }
    for (const p of S.tl.pos) { c.fillStyle = p.ok ? '#7fe0a0' : '#ff5a4a'; c.beginPath(); c.arc(X(p.t), 55, 3.5, 0, Math.PI * 2); c.fill(); }
    [['fugetsu', 66, '#7fe0a0'], ['fuka', 78, '#9ff0c0'], ['higanbana', 90, '#ff6a5a']].forEach(([k, y, col]) => {
      c.fillStyle = col;
      for (const iv of S.tl.buffs[k]) c.fillRect(X(iv.from), y, Math.max(1, X(iv.to ?? dur) - X(iv.from)), 8);
    });
    c.fillStyle = '#8fb8ff';
    for (const m of S.tl.move) c.fillRect(X(m.from), 104, Math.max(1, X(m.to ?? dur) - X(m.from)), 8);
    c.fillStyle = '#ff4a4a';
    for (const t of S.tl.hits) { const x = X(t); c.beginPath(); c.moveTo(x, 116); c.lineTo(x + 4, 126); c.lineTo(x - 4, 126); c.closePath(); c.fill(); }
    c.strokeStyle = 'rgba(255,255,255,.15)'; c.fillStyle = '#a9a293'; c.textAlign = 'center';
    const stepS = dur > 180000 ? 30 : 10;
    for (let s = 0; s <= dur / 1000; s += stepS) {
      const x = X(s * 1000);
      c.beginPath(); c.moveTo(x, 130); c.lineTo(x, 136); c.stroke();
      c.fillText(`${s}`, x, 144);
    }
    c.textAlign = 'left';
    const legend = [['#ff4a4a', '止まり'], ['#ffa53a', 'クリップ'], ['#c070ff', '詠唱中断'], ['#7fe0a0', '方向指定 ○'], ['#ff5a4a', '× / 被弾'], ['#8fb8ff', '移動']];
    let lx = L;
    for (const [col, text] of legend) { c.fillStyle = col; c.fillRect(lx, 160, 7, 7); c.fillStyle = '#a9a293'; c.fillText(text, lx + 10, 164); lx += c.measureText(text).width + 26; }
    c.fillText('◆ アビリティ（赤は剣気を使うもの）', L, 180);
  }

  // ---------------- 描画 ----------------
  let mode = 'hud';
  const slotEls = [];
  const padMap = new Map();
  const iconOf = (id) => A[id]?.icon;

  function makeSlot(cell, keyLabel) {
    const el = document.createElement('div');
    el.className = 'slot';
    if (!cell) { el.classList.add('empty'); return el; }
    if (cell.kind === 'other') { el.classList.add('empty', 'other'); el.title = `アクション以外（種類 ${cell.type}）`; return el; }
    if (cell.kind === 'missing') { el.classList.add('empty', 'missing'); el.title = `今は存在しないアクション（ID ${cell.id}）`; return el; }
    if (cell.kind === 'foreign') { el.classList.add('empty', 'foreign'); el.dataset.ch = cell.name.slice(0, 1); el.title = `${cell.name}（このジョブでは使えないアクション）`; if (keyLabel) el.insertAdjacentHTML('beforeend', `<div class="key">${keyLabel}</div>`); return el; }
    el.innerHTML = `<img alt=""><div class="cd"></div><div class="frame"></div><div class="num"></div><div class="chg"></div>${keyLabel ? `<div class="key">${keyLabel}</div>` : ''}`;
    const rec = { el, base: cell.id, img: el.querySelector('img'), cd: el.querySelector('.cd'), num: el.querySelector('.num'), chg: el.querySelector('.chg'), shown: null, wasCd: false };
    el.addEventListener('pointerdown', (e) => { e.preventDefault(); pressFx(el); press(cell.id); });
    el.addEventListener('pointerenter', () => showTip(el, resolve(cell.id)));
    el.addEventListener('pointerleave', hideTip);
    slotEls.push(rec);
    return el;
  }

  const KEY_CODES = ['Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal'];
  const KEY_LABELS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='];
  // ホットバー → 修飾キー（Ctrl+数字はブラウザのタブ切り替えと衝突するため使わない。INPUT_HUD §3）
  const BAR_MODS = { hb1: '', hb2: 's', hb3: 'a' };
  const keymap = new Map();
  const keyId = (k) => `${k.shift ? 1 : 0}${k.ctrl ? 1 : 0}${k.alt ? 1 : 0}|${k.code}`;
  // スロットのキー: 読み込んだ KEYBIND.DAT があればそれ、なければ既定（1〜= / Shift / Alt）
  function keysOf(bar, i) {
    const kb = D.keybind?.[bar]?.[i];
    if (kb) return kb.filter((k) => k.code);
    const mod = BAR_MODS[bar];
    if (mod == null || D.keybind) return [];
    return [{ code: KEY_CODES[i], shift: mod === 's', ctrl: false, alt: mod === 'a', label: `${mod}${KEY_LABELS[i]}` }];
  }
  function bindSlot(bar, i, cell) {
    const keys = keysOf(bar, i);
    if (cell && cell.kind === 'action') for (const k of keys) keymap.set(keyId(k), { base: cell.id, el: null });
    return keys;
  }

  const barCells = (bar) => D.bars[bar]?.[barSource[bar]] ?? D.bars[bar]?.job ?? D.bars[bar]?.shared ?? [];
  let xhbSet = 'xhb1';

  function placeKeys(el, keys, cell) {
    for (const k of keys) { const m = keymap.get(keyId(k)); if (m && cell?.kind === 'action' && m.base === cell.id) m.el = el; }
    const label = keys.map((k) => k.label).join('/');
    if (label && !el.classList.contains('foreign')) el.insertAdjacentHTML('beforeend', `<div class="key${label.length > 3 ? ' long' : ''}">${label}</div>`);
  }

  function barRow(bar, cells, bind, small) {
    const row = document.createElement('div');
    row.className = `bar${small ? ' small' : ''}`;
    const lab = document.createElement('span');
    lab.className = 'bar-label';
    lab.textContent = `${bar.toUpperCase()}${barSource[bar] === 'shared' ? ' 共' : ''}`;
    row.appendChild(lab);
    cells.forEach((cell, i) => {
      const el = makeSlot(cell, '');
      if (bind) placeKeys(el, bindSlot(bar, i, cell), cell);
      row.appendChild(el);
    });
    return row;
  }

  function rebuild() {
    slotEls.length = 0; keymap.clear(); padMap.clear();
    const wrap = $('hotbars'); wrap.innerHTML = '';
    const side = $('sidebars'); side.innerHTML = '';
    const hud = $('hud'); hud.innerHTML = '';
    if (mode === 'hud' && D.hud) buildHud(hud);
    else for (const bar of ['hb1', 'hb2', 'hb3', 'hb4']) wrap.appendChild(barRow(bar, barCells(bar), true, false));
    // 変化先を別ボタンにしたグループ
    const splitIds = Object.entries(GROUPS).filter(([b]) => split[b]).flatMap(([, ts]) => ts).filter((v, i, a) => a.indexOf(v) === i);
    if (splitIds.length) {
      const row = barRow('split', splitIds.map((id) => ({ kind: 'action', id })), false, false);
      row.classList.add('unplaced');
      row.firstChild.textContent = '変化先';
      wrap.appendChild(row);
    }
    if (D.unplaced.length) {
      const row = barRow('unplaced', D.unplaced.map((id) => ({ kind: 'action', id })), false, false);
      row.classList.add('unplaced');
      row.firstChild.textContent = '未配置';
      wrap.appendChild(row);
    }
    if (mode !== 'hud') for (const bar of ['hb5', 'hb6', 'hb7', 'hb8', 'hb9', 'hb10']) if (D.bars[bar]) side.appendChild(barRow(bar, barCells(bar), true, true));
    $('hotbars').classList.toggle('in-hud', mode === 'hud');

    // クロスホットバー（スロット順とボタンの対応は仮: 0-3 十字キー上右下左、4-7 △○×□。CFG 未確認）
    const x = $('xhb'); x.innerHTML = '';
    const sets = Object.keys(D.bars).filter((b) => b.startsWith('xhb'));
    const tabs = document.createElement('div');
    tabs.className = 'xtabs';
    for (const b of sets) {
      const t = document.createElement('button');
      t.type = 'button';
      t.className = `xtab${b === xhbSet ? ' on' : ''}`;
      t.textContent = `セット${b.slice(3)}${barSource[b] === 'shared' ? '（共）' : ''}`;
      t.addEventListener('click', () => { xhbSet = b; rebuild(); });
      tabs.appendChild(t);
    }
    const set = document.createElement('div');
    set.className = 'xset';
    const cells = barCells(xhbSet);
    const pair = document.createElement('div');
    pair.className = 'xpair';
    for (const half of [0, 1]) {
      const g = document.createElement('div');
      g.className = 'xpair';
      g.style.gap = '6px';
      for (const q of [0, 1]) {
        const cross = document.createElement('div');
        cross.className = 'cross';
        for (let k = 0; k < 4; k++) {
          const idx = half * 8 + q * 4 + k;
          const lab = `${half ? 'R' : 'L'}${q ? ['△', '○', '×', '□'][k] : ['↑', '→', '↓', '←'][k]}`;
          cross.appendChild(makeSlot(cells[idx], lab));
          if (cells[idx]?.kind === 'action') padMap.set(`${half}|${q}|${k}`, { base: cells[idx].id, el: cross.lastChild });
        }
        g.appendChild(cross);
      }
      pair.appendChild(g);
    }
    set.appendChild(pair);
    x.append(tabs, set);
  }

  // ADDON.DAT のとおりにホットバーとジョブゲージを置く（INPUT_HUD §6）。座標は画面に対する %、大きさは 1080 を基準とした px × 倍率
  const ANCHOR = (a) => [a % 3, Math.floor(a / 3)]; // 0 左上 1 上 2 右上 3 左 4 中央 5 右 6 左下 7 下 8 右下
  const hudK = () => (STAGE.h / VIEW.gameH) * VIEW.uiScale * VIEW.hudScale;
  function buildHud(hud) {
    // 大きさ: ゲーム画面の px（= 倍率 1 の大きさ × HUD の大きさ設定）を舞台の大きさに縮める
    const W = STAGE.w, H = STAGE.h, k = hudK();
    for (const [bar, h] of Object.entries(D.hud.hotbars)) {
      if (!h.visible || !D.bars[bar]) continue;
      const bw = h.w * h.scale * k, bh = h.h * h.scale * k;
      const [ax, ay] = ANCHOR(h.anchor);
      const box = document.createElement('div');
      box.className = 'hud-bar';
      box.style.left = `${(h.x / 100) * W - (bw * ax) / 2}px`;
      box.style.top = `${(h.y / 100) * H - (bh * ay) / 2}px`;
      box.style.width = `${bw}px`; box.style.height = `${bh}px`;
      const size = Math.min(bw / h.cols, bh / h.rows) * 0.9;
      box.style.setProperty('--slot', `${size}px`);
      box.style.gridTemplateColumns = `repeat(${h.cols}, ${size}px)`;
      box.style.fontSize = `${Math.max(7, size * 0.24)}px`;
      const lab = document.createElement('span');
      lab.className = 'hud-label';
      lab.textContent = `${bar.slice(2)}${barSource[bar] === 'shared' ? '共' : ''}`;
      lab.title = `ホットバー ${bar.slice(2)}（${barSource[bar] === 'shared' ? '共有' : 'ジョブ専用'}。設定 → ホットバー・HUD で切り替え）`;
      box.appendChild(lab);
      barCells(bar).forEach((cell, i) => {
        const el = makeSlot(cell, '');
        placeKeys(el, bindSlot(bar, i, cell), cell);
        box.appendChild(el);
      });
      hud.appendChild(box);
    }
  }

  // ---- ジョブゲージ ----
  const Gauge = window.MockGauge.create(D.gauge);
  const gaugeBoxes = Gauge.windows.map((w) => {
    const box = document.createElement('div');
    box.className = 'gauge-win';
    box.title = w.label;
    box.appendChild(w.el);
    $('gauges').appendChild(box);
    return { w, box };
  });
  // ADDON.DAT に配置が見つからないときの置き場所（仮）
  const GAUGE_DEFAULT = { JobHudSAM0: { x: 68, y: 66, anchor: 4, scale: 1 }, JobHudSAM1: { x: 84, y: 66, anchor: 4, scale: 1 } };
  function placeGauges() {
    const W = STAGE.w, H = STAGE.h, k = hudK();
    for (const { w, box } of gaugeBoxes) {
      const p = D.hud?.gauges?.[w.name] ?? SAMPLE.hud.gauges?.[w.name] ?? GAUGE_DEFAULT[w.name];
      const sc = (p.scale ?? 1) * k, bw = w.w * sc, bh = w.h * sc;
      const [ax, ay] = ANCHOR(p.anchor ?? 4);
      box.style.transform = `translate(${(p.x / 100) * W - (bw * ax) / 2}px, ${(p.y / 100) * H - (bh * ay) / 2}px) scale(${sc})`;
    }
    Gauge.setSimple(OPT.gaugeSimple);
  }

  // ---- ステータス（要素を作り置きし、残り秒だけ書き換える。毎秒作り直すと点滅して見えるため）----
  const stEls = new Map();
  function clearStatuses() { for (const r of stEls.values()) r.el.remove(); stEls.clear(); }
  function makeStatus(k) {
    const meta = STATUS[k];
    const icon = statusIcon(meta);
    const el = document.createElement('div');
    el.className = `st${meta.target ? ' debuff' : ''}`;
    el.title = meta.name;
    const ic = document.createElement('div');
    ic.className = icon ? 'ic' : `ic txt ${meta.cls ?? ''}`;
    if (icon) { const img = document.createElement('img'); img.src = icon; img.alt = ''; ic.appendChild(img); } else ic.textContent = meta.name.slice(0, 2);
    const stk = document.createElement('span'); stk.className = 'stk';
    ic.appendChild(stk);
    const t = document.createElement('div'); t.className = 't';
    el.append(ic, t);
    return { el, t, stk, left: null, stacks: null };
  }
  function renderStatuses() {
    const alive = new Set();
    for (const [k, v] of Object.entries(S.st)) {
      if (v.until <= S.t) continue;
      alive.add(k);
      let r = stEls.get(k);
      if (!r) { r = makeStatus(k); stEls.set(k, r); (STATUS[k].target ? $('targetStatus') : $('selfStatus')).appendChild(r.el); }
      const left = Math.ceil((v.until - S.t) / 1000);
      if (left !== r.left) { r.left = left; r.t.textContent = left; r.el.classList.toggle('low', left <= 5); }
      const stacks = v.stacks ?? '';
      if (stacks !== r.stacks) { r.stacks = stacks; r.stk.textContent = stacks; }
    }
    for (const [k, r] of stEls) if (!alive.has(k)) { r.el.remove(); stEls.delete(k); }
  }

  // 光る条件（ゲームデータに基づく）
  // 1. コンボ（ActionCombo）: 直前のコンボ技を受付時間内に使っていれば、その次の技が光る
  // 2. ActionProcStatus: 指定のステータスが付いている間光る（燕飛・返し技・奥義波切・残心）。燕返しの 4 種は実際に出せる 1 つだけ
  // 居合術の変化先・照破・明鏡止水中の技には、この 2 つの指定がないので光らせない
  function highlight(id) {
    const a = A[id];
    if (!a || !a.forJob) return false;
    if (a.comboFrom.length && S.combo != null && S.t <= S.comboUntil && a.comboFrom.includes(S.combo)) return true;
    const st = PROC_STATUS[a.proc];
    if (st && has(st)) return st !== 'tsubame' || !!TARGET_BASE[id]?.some((b) => resolve(b) === id);
    return false;
  }
  // 方向指定のガイド: 次に使う（光っている）方向指定の技の向き。明鏡止水中はまだ持っていない閃の技
  function guideNeed() {
    if (!OPT.guide || !live()) return null;
    const cands = [ID.GEKKO, ID.KASHA].filter((id) => highlight(id) || (has('meikyo') && !S.sen[id === ID.GEKKO ? 'getsu' : 'ka']));
    const needs = [...new Set(cands.map((id) => A[id].positional))];
    return needs.length === 1 ? needs[0] : null;
  }

  let lastCd = null;
  function render() {
    const active = live();
    $('timer').innerHTML = `${fmt(Math.max(0, Math.min(S.t, OPT.durationMs)))} <span class="dim">/ ${fmt(OPT.durationMs)}</span>`;
    const cd = $('countdown');
    const cdText = S.phase === 'countdown' ? String(Math.ceil(-S.t / 1000)) : S.phase === 'combat' && S.t < 900 ? '戦闘開始！' : '';
    if (cdText !== lastCd) {
      lastCd = cdText;
      cd.hidden = !cdText;
      if (cdText) { cd.textContent = cdText; cd.className = ''; void cd.offsetWidth; cd.className = `countdown${S.phase === 'combat' ? ' go' : ''}`; }
    }
    $('startOverlay').hidden = S.phase !== 'idle' || UI.isOpen();
    $('pauseBadge').hidden = !(active && paused() && !UI.isOpen());

    const far = active ? Arena.edgeDistance() : 0;
    for (const r of slotEls) {
      const isTarget = !!TARGET_BASE[r.base];
      const id = isTarget ? r.base : split[r.base] ? r.base : resolve(r.base);
      const live1 = isTarget ? TARGET_BASE[r.base].some((b) => resolve(b) === r.base) : resolve(r.base);
      const a = A[id];
      if (r.shown !== id) { r.img.src = iconOf(id); r.shown = id; r.el.classList.toggle('framed', !!a.iconFramed); }
      let frac = 0, num = '';
      if (a.isGcd && S.gcdEnd != null && S.gcdEnd > S.t) frac = (S.gcdEnd - S.t) / (S.gcdEnd - S.gcdStart);
      if (ownCd(a) != null) {
        const ch = charges(a), m = maxCh(a);
        if (ch < m) {
          const full = S.cds[ownCd(a)];
          const next = (full - S.t) % a.recastMs || a.recastMs;
          if (ch === 0) { frac = Math.max(frac, next / a.recastMs); num = Math.ceil(next / 1000); }
        }
        r.chg.textContent = m > 1 ? ch : '';
      }
      r.cd.style.background = frac > 0 ? `conic-gradient(transparent 0 ${(1 - frac) * 360}deg, rgba(0,0,0,.62) 0)` : 'none';
      r.num.textContent = num;
      // 固有のリキャストが明けたときだけ光らせる（GCD の回復では光らせない）
      const ownFrac = ownCd(a) != null && charges(a) === 0 ? 1 : 0;
      if (r.wasCd && !ownFrac) { r.el.classList.remove('ready-flash'); void r.el.offsetWidth; r.el.classList.add('ready-flash'); }
      r.wasCd = !!ownFrac;
      const useId = isTarget ? r.base : live1;
      const ua = A[useId];
      const unusable = !ua.forJob || (active && ((isTarget && !live1) || (blocked(useId) != null && !(ownCd(ua) != null && charges(ua) === 0))));
      r.el.classList.toggle('unusable', unusable);
      // 射程外（ゲームと同じく、アイコンを赤くする）
      const rg = rangeOf(ua);
      r.el.classList.toggle('far', active && rg != null && far > rg + 0.001);
      // 「変化させない」設定の元ボタンは、変化先ではなく元のアクションとして光るかを見る
      r.el.classList.toggle('hl', active && highlight(split[r.base] ? r.base : useId));
      r.el.classList.toggle('queued', !!S.queue && S.queue.baseId === r.base);
    }

    Gauge.update(S);
    renderStatuses();

    // キャストバー
    const cb = $('castbar');
    if (S.cast) {
      cb.hidden = false;
      $('castName').textContent = A[S.cast.id].name;
      if ($('castIcon').dataset.id !== String(S.cast.id)) { $('castIcon').src = A[S.cast.id].icon; $('castIcon').dataset.id = String(S.cast.id); }
      const p = (S.t - S.cast.start) / (S.cast.end - S.cast.start);
      $('castFill').style.width = `${Math.min(100, p * 100)}%`;
      $('castTime').textContent = ((S.cast.end - S.t) / 1000).toFixed(2);
      cb.classList.toggle('slide', S.cast.end - S.t <= POLICY.slideMs);
    } else cb.hidden = true;

    // 敵の詠唱
    const bc = S.phase === 'combat' ? Arena.bossCast(S.t) : null;
    $('bossCast').hidden = !bc;
    if (bc) { $('bossCastName').textContent = bc.name; $('bossCastFill').style.width = `${bc.p * 100}%`; }
    const mech = S.mech && S.t < S.mech.until && OPT.hints ? S.mech : null;
    $('mechAlert').hidden = !mech;
    if (mech) { $('mechName').textContent = mech.name; $('mechHint').textContent = mech.hint ?? ''; }

    // パーティリスト
    const hp = Arena.hp(), down = Arena.isDown();
    $('ptSelfHp').style.width = `${hp * 100}%`;
    $('ptSelfNum').textContent = down ? '戦闘不能' : String(Math.round(hp * 100));
    $('ptSelf').classList.toggle('low', hp < 0.35);
    $('ptSelf').classList.toggle('down', down);
    $('ptTank').hidden = !OPT.tank;
    const th = Arena.tankHp();
    $('ptTankHp').style.width = `${th * 100}%`;
    $('ptTankNum').textContent = String(Math.round(th * 100));

    Arena.setGuide(guideNeed());
  }

  // ---------------- 演出・ツールチップ ----------------
  // 範囲の形はゲームデータ（castType: 1 単体 / 2 自分の周囲 / 3 前方扇 / 4 前方直線）、敵に使えるか（canTargetHostile）から決める
  function fxFor(id, ok) {
    const a = A[id];
    // 自分にかけるもの: 敵を対象にできず、範囲でもない（自分の周囲の範囲攻撃も敵を対象にしないため、形で見分ける）
    if (!a.hostile && a.shape <= 1) return { kind: 'buff', color: FX_COLOR[id] ?? 'buff', name: a.name };
    const color = FX_COLOR[id] ?? (KENKI_COST[id] ? 'kenki' : 'steel');
    const kind = a.shape === 2 ? 'circle' : a.shape === 3 ? 'cone' : a.shape === 4 ? 'line'
      : a.dash ? 'dash' : a.range >= 15 ? 'projectile' : 'slash';
    const power = a.crit ? 1.5 : KENKI_COST[id] ? 1.25 : ok && a.comboFrom.length ? 1.15 : 1;
    return { kind, color, crit: a.crit, power, count: TRIPLE.has(id) ? 3 : 1, name: a.name, combo: ok && a.comboFrom.length > 0, range: a.effectRange || a.range };
  }
  function playFx(id, ok, pos, hit) {
    const info = fxFor(id, ok);
    if (!hit) { Arena.flyText('空振り', 'miss'); Au?.slash(0.6); return; }
    if (pos) info.pos = pos;
    Arena.play(info);
    if (!Au) return;
    if (info.kind === 'buff') { Au.buff(); return; }
    if (info.kind === 'circle' || info.kind === 'cone' || info.kind === 'line') Au.wave();
    else for (let i = 0; i < info.count; i++) setTimeout(() => Au.slash(info.power), i * 95);
    if (info.crit) Au.crit(); else Au.hit(info.power);
  }
  function pressFx(el) { el.classList.add('pressed'); setTimeout(() => el.classList.remove('pressed'), 90); }
  function showTip(el, id) {
    const a = A[id];
    if (!a) return;
    const tip = $('tooltip');
    const kind = a.isGcd ? 'ウェポンスキル' : 'アビリティ';
    const sec = (ms) => (ms ? `${(ms / 1000).toFixed(2)}秒` : '即時');
    const rg = rangeOf(a);
    const area = a.shape === 2 && a.effectRange ? `自分の周囲 ${a.effectRange}m` : a.shape === 3 ? `前方扇 ${a.effectRange}m` : a.shape === 4 ? `直線 ${a.effectRange}m` : '';
    tip.innerHTML = `<div class="tt-head"><img alt=""><div><b></b><div class="kind"></div></div></div><div class="meta"></div><div class="body"></div><div class="hl-note"></div>`;
    tip.querySelector('img').src = a.icon;
    tip.querySelector('b').textContent = a.name;
    tip.querySelector('.kind').textContent = kind + (a.forJob ? '' : '（このジョブでは使えません）');
    tip.querySelector('.meta').innerHTML = `<span>詠唱時間<b>${sec(a.castMs)}</b></span><span>リキャスト<b>${sec(a.recastMs)}</b></span>${maxCh(a) > 1 ? `<span>チャージ<b>${maxCh(a)}</b></span>` : ''}${KENKI_COST[id] ? `<span>剣気<b>${KENKI_COST[id]}</b></span>` : ''}${rg != null ? `<span>射程<b>${rg}m${a.range === -1 ? '（近接・仮）' : ''}</b></span>` : ''}${area ? `<span>範囲<b>${area}</b></span>` : ''}`;
    tip.querySelector('.body').textContent = a.desc;
    const notes = [];
    if (a.comboFrom.length) notes.push(`光る: ${a.comboFrom.map((c) => A[c]?.name ?? D.known[c]?.[0]).filter(Boolean).join(' / ')} の直後（コンボ）`);
    if (PROC_STATUS[a.proc]) notes.push(`光る: 「${STATUS[PROC_STATUS[a.proc]].name}」の間`);
    if (a.positional) notes.push(`方向指定: ${POS_JA[a.positional]}（トゥルーノース中は不要）`);
    tip.querySelector('.hl-note').textContent = notes.join('\n');
    tip.hidden = false;
    const sr = stage.getBoundingClientRect(), er = el.getBoundingClientRect(), sc = sr.width / STAGE.w;
    const x = (er.left - sr.left) / sc, y = (er.top - sr.top) / sc;
    tip.style.left = `${Math.min(STAGE.w - 330, Math.max(10, x - 140))}px`;
    tip.style.top = '0px';
    tip.style.top = `${Math.max(10, y - tip.offsetHeight - 10)}px`;
  }
  function hideTip() { $('tooltip').hidden = true; }

  // ---------------- 入力 ----------------
  function start() {
    UI.close();
    reset();
    S.phase = 'countdown';
    $('startOverlay').hidden = true;
    Au?.tick();
    addLog('sys', `カウントダウン開始（${OPT.durationMs / 1000} 秒・敵の攻撃: ${MECH_JA[OPT.mech]}・タンク${OPT.tank ? 'あり' : 'なし'}）`);
  }
  const MECH_JA = { off: 'なし', easy: '少なめ', normal: 'ふつう', hard: '多め' };

  // 移動キー（KEYBIND.DAT の MOVE_FORE など。見下ろし視点なので「前」は画面の上）
  const held = new Set();
  const MOVE = {
    up: [...(D.move?.fore ?? [])],
    down: [...(D.move?.back ?? [])],
    left: [...(D.move?.left ?? []), ...(D.move?.strafeL ?? [])],
    right: [...(D.move?.right ?? []), ...(D.move?.strafeR ?? [])],
  };
  const ARROWS = { up: 'ArrowUp', down: 'ArrowDown', left: 'ArrowLeft', right: 'ArrowRight' };
  const moveCodes = () => new Set([...MOVE.up, ...MOVE.down, ...MOVE.left, ...MOVE.right, ...(OPT.arrows ? Object.values(ARROWS) : [])]);
  const keyName = (code) => code.replace(/^Key/, '').replace(/^Digit/, '').replace(/^Arrow/, '').replace('Space', 'Space');
  const keyLabel = (codes) => (codes ?? []).map(keyName).join('/');
  let padMove = null;
  function moveInput() {
    const on = (dir) => MOVE[dir].some((c) => held.has(c)) || (OPT.arrows && held.has(ARROWS[dir]));
    let x = (on('right') ? 1 : 0) - (on('left') ? 1 : 0);
    let y = (on('down') ? 1 : 0) - (on('up') ? 1 : 0);
    if (padMove) { x += padMove.x; y += padMove.y; }
    Arena.setInput(live() && !paused() ? x : 0, live() && !paused() ? y : 0);
  }

  window.addEventListener('pointerdown', () => Au?.unlock(), { once: true });
  window.addEventListener('keydown', (e) => {
    Au?.unlock();
    GM?.guardKey(e);
    if (UI.isOpen()) { if (e.code === 'Escape') { e.preventDefault(); UI.close(); } return; }
    const tag = e.target?.tagName;
    if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return;
    if (moveCodes().has(e.code) && !keymap.has(keyId({ code: e.code, shift: e.shiftKey, ctrl: e.ctrlKey, alt: e.altKey }))) {
      e.preventDefault(); held.add(e.code);
      return;
    }
    if (D.move?.jump?.includes(e.code) && live()) { e.preventDefault(); if (!e.repeat && !paused()) { Arena.jump(); Au?.whoosh(); } return; }
    if (e.code === 'Space') { e.preventDefault(); if (!e.repeat && !live()) start(); return; }
    if (e.code === 'Escape') { reset(); return; }
    const hit = keymap.get(keyId({ code: e.code, shift: e.shiftKey, ctrl: e.ctrlKey, alt: e.altKey }));
    if (hit) {
      e.preventDefault();
      if (!e.repeat && hit.el) pressFx(hit.el);
      press(hit.base);
    }
  });
  window.addEventListener('keyup', (e) => held.delete(e.code));
  window.addEventListener('blur', () => held.clear());
  $('btnStart').addEventListener('click', start);
  $('btnReset').addEventListener('click', reset);
  $('btnSettings').addEventListener('click', () => (UI.isOpen() ? UI.close() : UI.open()));
  const MODES = { hud: 'HUD 再現', keyboard: '一覧', pad: 'パッド（クロスホットバー）' };
  function setMode(m) {
    if (m === 'hud' && !D.hud) m = 'keyboard';
    mode = m;
    $('hotbars').hidden = m === 'pad';
    $('sidebars').hidden = m !== 'keyboard';
    $('xhb').hidden = m !== 'pad';
    $('hud').hidden = m !== 'hud';
    rebuild();
  }

  // ゲームモード（全画面＋キーボードロック）
  async function enterGame() {
    const r = await GM.enter();
    if (!r.ok) addLog('warn', r.reason);
    else addLog('sys', r.locked ? 'ゲームモード: ブラウザのショートカットもゲーム側で受け取ります（Esc 長押しで解除）' : 'ゲームモード: 全画面にしました（このブラウザはキーボードロック非対応のため、一部のキーはブラウザが受け取ります）');
    return r.ok;
  }
  GM?.setBusyCheck(() => live());
  GM?.onChange((st) => {
    $('btnGame').textContent = st.active ? 'ゲームモード: 入' : 'ゲームモード';
    $('btnGame').classList.toggle('on', st.active);
    $('gameBadge').hidden = !st.active;
    $('gameBadge').textContent = st.locked ? 'ゲームモード中 ・ Esc 長押しで解除' : 'ゲームモード中（全画面のみ）・ Esc で解除';
    UI.refresh();
  });
  $('btnGame').addEventListener('click', () => (GM.isActive() ? GM.exit() : enterGame()));
  $('btnGameStart').addEventListener('click', async () => { await enterGame(); start(); });
  $('btnPlainStart').addEventListener('click', start);
  const GAME_NOTE = GM?.canLock
    ? 'ゲームモードは全画面にして、Ctrl+W・Ctrl+数字・F5・Alt などのキーもゲーム側で受け取ります（Chrome / Edge）。解除は Esc の長押し。'
    : GM?.canFull ? 'このブラウザはキーボードロックに対応していないため、ゲームモードは全画面表示のみです（Ctrl+数字などはブラウザが先に受け取ります）。Chrome / Edge を推奨します。'
    : 'このブラウザは全画面表示に対応していません。';
  $('gameNote').textContent = GAME_NOTE;

  // 音
  const syncSound = () => { $('btnSound').textContent = `音: ${Au?.isEnabled() ? '入' : '切'}`; };
  $('btnSound').addEventListener('click', () => { Au?.setEnabled(!Au.isEnabled()); syncSound(); if (Au?.isEnabled()) Au.buff(); UI.refresh(); });
  syncSound();

  // ゲームパッド（Gamepad API をフレームごとに読む。INPUT_HUD §4）
  // ボタン番号は標準配置: 0 ×(A) 1 ○(B) 2 □(X) 3 △(Y) 4 L1 5 R1 6 L2 7 R2 8 Select 9 Start 12〜15 十字キー
  const PAD_INDEX = { Cross: 0, Circle: 1, Square: 2, Triangle: 3, L1: 4, R1: 5, L2: 6, R2: 7, Select: 8, Start: 9 };
  const PAD_MARK = ['×', '○', '□', '△', 'L1', 'R1', 'L2', 'R2', 'Select', 'Start'];
  const padJump = PAD_INDEX[Object.entries(D.display?.pad ?? {}).find(([, v]) => v === 'Jump')?.[0]] ?? 3; // FFXIV.cfg の PadButton_*（既定は △）
  let padPrev = [];
  let padLast = null;
  window.addEventListener('gamepadconnected', (e) => { addLog('sys', `パッドを検出: ${e.gamepad.id}（左スティックで移動）`); setMode('pad'); });
  function pollPad() {
    const gp = [...(navigator.getGamepads?.() ?? [])].find(Boolean);
    if (!gp) { padMove = null; return; }
    // 左スティック（遊びは FFXIV.cfg の DeadArea。設定で変えられる）
    const ax = gp.axes[0] ?? 0, ay = gp.axes[1] ?? 0, m = Math.hypot(ax, ay), dz = OPT.deadzone;
    padMove = m > dz ? { x: (ax / m) * Math.min(1, (m - dz) / (1 - dz)), y: (ay / m) * Math.min(1, (m - dz) / (1 - dz)) } : null;
    const down = gp.buttons.map((b) => b.pressed || b.value > POLICY.padTrigger);
    const edge = (i) => down[i] && !padPrev[i];
    if (edge(9) && !live()) start();
    if (edge(5)) { const sets = Object.keys(D.bars).filter((b) => b.startsWith('xhb')); xhbSet = sets[(sets.indexOf(xhbSet) + 1) % sets.length]; rebuild(); } // R1 でセット切り替え（仮）
    const lt = down[6], rt = down[7];
    const half = lt && !rt ? 0 : rt && !lt ? 1 : lt && rt ? (padLast === 7 ? 1 : 0) : null;
    if (edge(6)) padLast = 6;
    if (edge(7)) padLast = 7;
    document.querySelectorAll('.xset')[0]?.classList.toggle('active', half != null);
    if (half != null) {
      const dpad = [12, 15, 13, 14]; // 上 右 下 左
      const face = [3, 1, 0, 2]; // △(Y) ○(B) ×(A) □(X)
      dpad.forEach((b, k) => { if (edge(b)) padPress(half, 0, k); });
      face.forEach((b, k) => { if (edge(b)) padPress(half, 1, k); });
    } else if (edge(padJump) && live() && !paused()) { Arena.jump(); Au?.whoosh(); }
    padPrev = down;
  }
  function padPress(half, q, k) {
    const hit = padMap.get(`${half}|${q}|${k}`);
    if (hit) { pressFx(hit.el); press(hit.base); }
  }

  // ---------------- 設定ファイルの読み込み（INPUT_HUD §5）----------------
  // ファイルはブラウザの中だけで解析し、送信しない。保存するのは解析結果（アクション ID・キー・座標）だけ
  const STORE = 'ff14rt:mock:v3';
  const DISP = D.display ?? {};
  const VIEW = { gameW: DISP.width ?? 1920, gameH: DISP.height ?? 1080, uiScale: DISP.uiScale ?? 1, hudScale: 1, mode: 'hud' };
  const SAMPLE_VIEW = { ...VIEW };
  const SAMPLE = { bars: D.bars, keybind: D.keybind, hud: D.hud };
  const save = () => {
    try { localStorage.setItem(STORE, JSON.stringify({ VIEW, OPT, split, imported: IMPORTED, importLog: IMPORT_LOG })); } catch { /* 保存できなくても動作は続ける */ }
  };
  let IMPORTED = null; // { hotbarSets, keybind, hud, files: { 名前: 説明 } }
  let IMPORT_LOG = '';

  function toCell(s) {
    if (!s) return null;
    if (s.type !== 1) return { kind: 'other', type: s.type };
    const known = D.known[s.id];
    if (!known) return { kind: 'missing', id: s.id };
    let id = s.id;
    while (D.upgrade[id]) id = D.upgrade[id];
    if (!A[id]) return { kind: 'foreign', id, name: (D.known[id] ?? known)[0] };
    return { kind: 'action', id };
  }
  function barsFromSets(sets) {
    const job = sets[D.jobSet] ?? {}, shared = sets[0] ?? {};
    const out = {};
    for (const bar of window.CfgParse.BAR_NAMES) {
      const j = job[bar]?.map(toCell) ?? null, sh = shared[bar]?.map(toCell) ?? null;
      if (j || sh) out[bar] = { job: j, shared: sh, defaultSource: j ? 'job' : 'shared' };
    }
    return out;
  }
  function applyData() {
    D.bars = IMPORTED?.hotbarSets ? barsFromSets(IMPORTED.hotbarSets) : SAMPLE.bars;
    D.keybind = IMPORTED?.keybind ?? SAMPLE.keybind;
    D.hud = IMPORTED?.hud ?? SAMPLE.hud;
    if (IMPORTED?.move) Object.assign(MOVE, { up: IMPORTED.move.fore ?? [], down: IMPORTED.move.back ?? [], left: [...(IMPORTED.move.left ?? []), ...(IMPORTED.move.strafeL ?? [])], right: [...(IMPORTED.move.right ?? []), ...(IMPORTED.move.strafeR ?? [])] });
    barSource = Object.fromEntries(Object.entries(D.bars).map(([k, v]) => [k, v.defaultSource]));
    const onBars = new Set(Object.values(D.bars).flatMap((v) => [...(v.job ?? []), ...(v.shared ?? [])]).filter((c) => c?.kind === 'action').map((c) => c.id));
    D.unplaced = D.buttonsAll.filter((id) => !onBars.has(id));
    const xs = Object.keys(D.bars).filter((b) => b.startsWith('xhb'));
    if (!xs.includes(xhbSet)) xhbSet = xs[0] ?? 'xhb1';
  }
  function loadSaved() {
    try {
      const v = JSON.parse(localStorage.getItem(STORE) ?? 'null') ?? JSON.parse(localStorage.getItem('ff14rt:mock:v2') ?? 'null');
      if (v?.VIEW) Object.assign(VIEW, v.VIEW);
      if (v?.OPT) Object.assign(OPT, v.OPT);
      if (v?.split) Object.assign(split, v.split);
      if (v?.imported) IMPORTED = v.imported;
      if (v?.importLog) IMPORT_LOG = v.importLog;
    } catch { /* 壊れていたら使わない */ }
    applyData();
  }

  async function importFiles(files) {
    const results = [];
    const next = { ...(IMPORTED ?? {}), files: { ...(IMPORTED?.files ?? {}) } };
    for (const f of files) {
      const name = f.name.toUpperCase();
      try {
        if (f.size > 4 * 1024 * 1024) throw new Error('大きすぎます');
        const buf = new Uint8Array(await f.arrayBuffer());
        if (name === 'HOTBAR.DAT') {
          next.hotbarSets = window.CfgParse.parseHotbar(buf, [0, D.jobSet]);
          next.files['HOTBAR.DAT'] = `侍のバー ${Object.keys(next.hotbarSets[D.jobSet] ?? {}).length} 本・共有 ${Object.keys(next.hotbarSets[0] ?? {}).length} 本`;
        } else if (name === 'KEYBIND.DAT') {
          const kb = window.CfgParse.parseKeybind(buf);
          next.keybind = kb.hotbar; next.move = kb.move;
          next.files['KEYBIND.DAT'] = `ホットバー ${Object.keys(kb.hotbar).length} 本分のキー・移動キー ${['fore', 'left', 'back', 'right'].map((k) => keyLabel(kb.move?.[k])).join('')}`;
        } else if (name === 'ADDON.DAT') {
          const a = window.CfgParse.parseAddon(buf);
          next.hud = { hotbars: a.hotbars, gauges: window.CfgParse.findGauges(a.records, D.gauge.sizes) };
          next.files['ADDON.DAT'] = `ホットバー ${Object.keys(a.hotbars).length} 本・ジョブゲージ ${Object.keys(next.hud.gauges).length} 個の配置`;
        } else if (name === 'FFXIV.CFG') {
          const c = window.CfgParse.parseCfg(buf);
          if (c.width && c.height) { VIEW.gameW = c.width; VIEW.gameH = c.height; }
          if (c.uiScale) VIEW.uiScale = c.uiScale;
          if (c.deadArea != null) OPT.deadzone = Math.min(0.9, Math.max(0.05, c.deadArea));
          next.files['FFXIV.cfg'] = c.width ? `解像度 ${c.width}×${c.height}・HUD の大きさ ${c.uiScale ? c.uiScale * 100 + '%' : '不明'}・スティックの遊び ${c.deadArea ?? '不明'}` : '解像度の項目が見つかりません';
        } else {
          results.push(`${f.name} − 読みません（対象は HOTBAR.DAT / KEYBIND.DAT / ADDON.DAT / FFXIV.cfg）`);
          continue;
        }
        results.push(`${f.name} ✓`);
      } catch (err) {
        results.push(`${f.name} ✕ ${err.message}`);
      }
    }
    IMPORTED = next;
    IMPORT_LOG = results.join('\n');
    applyData(); save(); fit(); setMode(mode);
    addLog('sys', '設定ファイルを読み込みました');
    UI.refresh();
  }

  // ---------------- 設定画面 ----------------
  const UI = window.MockSettings.create($('settingsHost'), {
    title: '設定',
    footNote: '設定はこのブラウザに保存されます。練習の内容は次の開始から反映されます。',
    onOpen: () => { hideTip(); if (live()) addLog('sys', '一時停止（設定を閉じると再開）'); },
    onClose: () => { save(); },
  });
  const applyPractice = () => { save(); if (!live()) reset(); };

  UI.tab('practice', '練習', (pane, k) => {
    const s1 = k.section(pane, '練習の内容');
    k.row(s1, '時間', k.choice([[60000, '60 秒'], [120000, '120 秒'], [180000, '180 秒'], [300000, '300 秒']], OPT.durationMs, (v) => { OPT.durationMs = v; applyPractice(); }));
    k.row(s1, '敵の範囲攻撃', k.choice([['off', 'なし'], ['easy', '少なめ'], ['normal', 'ふつう'], ['hard', '多め']], OPT.mech, (v) => { OPT.mech = v; applyPractice(); }), '予兆（橙色の範囲）が満ちたら発動。範囲の中にいると被弾');
    k.row(s1, 'タンク', k.toggle(OPT.tank, (v) => { OPT.tank = v; applyPractice(); }, ['いる', 'いない']), 'いると敵はタンクの方を向く（途中で向きや位置を変えます）。いないと敵があなたを追いかけ、正面を向けてきます');
    k.row(s1, '方向指定のガイド', k.toggle(OPT.guide, (v) => { OPT.guide = v; save(); }), '敵の足元に背面（緑）・側面（黄）を色分けし、次に使う方向指定の技の向きを濃くします');
    k.row(s1, '敵の技の予告', k.toggle(OPT.hints, (v) => { OPT.hints = v; save(); }), '技の名前とよけ方を、ターゲット窓の敵の詠唱バーの下に出します（ゲームにはない補助）');
    const seedIn = k.number(OPT.seed, 1, 99999, (v) => { OPT.seed = v; applyPractice(); });
    k.row(s1, '技の並び（種）', [seedIn, k.button('ランダム', () => { OPT.seed = 1 + Math.floor(Math.random() * 99999); seedIn.value = OPT.seed; applyPractice(); })], '同じ種なら毎回同じ順番・同じ時間に技が来ます');
    const s2 = k.section(pane, '判定に使う仮の値', 'ゲームデータにない値です。実機で確かめて直します（docs/SPEC.md §10 GAME-50〜55）。');
    const P = Arena.POL;
    for (const [label, v] of [['移動速度', `${P.run} m/秒`], ['近接の射程（射程 -1 の技）', `敵の当たり判定の外側から ${P.melee} m`], ['敵の当たり判定の半径', `${P.hitbox} m`], ['方向指定の角度', `背面 = 真後ろから ±${180 - P.rearDeg}°、正面 = ±${P.frontDeg}°、その間が側面`], ['詠唱の終わりの猶予', `残り ${POLICY.slideMs / 1000} 秒からは動いても中断しない`]]) k.row(s2, label, k.text(v));
  });

  UI.tab('control', '操作', (pane, k) => {
    const s1 = k.section(pane, '移動（KEYBIND.DAT）', '見下ろし視点なので「前」は画面の上です。移動した方向を向き、攻撃すると敵の方を向きます。');
    for (const [label, dir] of [['前へ', 'up'], ['後ろへ', 'down'], ['左へ', 'left'], ['右へ', 'right']]) k.row(s1, label, MOVE[dir].length ? MOVE[dir].map((c) => k.keycap(keyName(c))) : k.text('割り当てなし'));
    k.row(s1, 'ジャンプ', (D.move?.jump ?? []).length ? D.move.jump.map((c) => k.keycap(keyName(c))) : k.text('割り当てなし'), '開始前の Space は「開始」になります');
    k.row(s1, '矢印キーでも移動', k.toggle(OPT.arrows, (v) => { OPT.arrows = v; save(); }), 'ホットバーに割り当てたキーが優先です');
    const s2 = k.section(pane, 'ゲームパッド');
    k.row(s2, 'スティックの遊び', k.range(0.05, 0.9, 0.05, OPT.deadzone, (v) => { OPT.deadzone = v; save(); }, (v) => `${Math.round(v * 100)}%`), `左スティックで移動。初期値は FFXIV.cfg の DeadArea（${DISP.deadArea ?? '不明'}）`);
    k.row(s2, 'ジャンプ', k.keycap(PAD_MARK[padJump] ?? '△'), 'FFXIV.cfg の PadButton の割り当てから');
    k.row(s2, 'クロスホットバー', k.text('L2 / R2 を押しながら十字キー・ボタン。R1 でセット切り替え（仮）'));
    const s3 = k.section(pane, 'ホットバーのキー', 'KEYBIND.DAT のとおりです。Ctrl を使うキーはブラウザのショートカットと重なるため、ゲームモードで使ってください。');
    k.row(s3, '開始 / リセット', [k.keycap('Space'), k.keycap('Esc')]);
  });

  UI.tab('hud', 'ホットバー・HUD', (pane, k) => {
    const s1 = k.section(pane, '表示');
    k.row(s1, 'ホットバーの表示', k.choice([['hud', 'HUD 再現'], ['keyboard', '一覧'], ['pad', 'クロスホットバー']], mode, (v) => { VIEW.mode = v; setMode(v); save(); }), 'HUD 再現は ADDON.DAT の配置どおり');
    k.row(s1, 'ジョブゲージ', k.choice([[false, '通常'], [true, 'シンプル']], OPT.gaugeSimple, (v) => { OPT.gaugeSimple = v; Gauge.setSimple(v); save(); }), 'どちらもゲームの UI 定義（ULD）から組み立てています');
    const s2 = k.section(pane, 'ホットバーの中身（ジョブ専用 / 共有）', 'HOTBAR.DAT にはバーごとの「共有」設定の場所がまだ分からないため、中身から推定しています（CFG-08）。');
    for (const bar of Object.keys(D.bars)) {
      const info = D.bars[bar];
      const label = bar.startsWith('xhb') ? `クロスホットバー ${bar.slice(3)}` : `ホットバー ${bar.slice(2)}`;
      if (info.job && info.shared) k.row(s2, label, k.choice([['job', 'ジョブ専用'], ['shared', '共有']], barSource[bar], (v) => { barSource[bar] = v; rebuild(); }));
      else k.row(s2, label, k.text(info.job ? 'ジョブ専用のみ' : '共有のみ'));
    }
    const s3 = k.section(pane, 'HUD の大きさ');
    k.row(s3, 'ゲームの HUD の大きさ', k.select([[1, '100%'], [1.5, '150%'], [2, '200%'], [3, '300%']], VIEW.uiScale, (v) => { VIEW.uiScale = Number(v); save(); fit(); rebuild(); }), 'FFXIV.cfg の UiHighScale から（対応は推定）');
    k.row(s3, '微調整', k.range(0.5, 2, 0.05, VIEW.hudScale, (v) => { VIEW.hudScale = v; save(); fit(); rebuild(); }, (v) => `${Math.round(v * 100)}%`));
  });

  UI.tab('replace', 'アクションの変化', (pane, k) => {
    const s1 = k.section(pane, 'アクションの変化（ゲームの設定に合わせる）', `ゲームの「キャラクターコンフィグ → ホットバー設定 → アクションの変化」に合わせます。ホットバーに変化先が直接置かれていれば「変化させない」と自動で判定します（今回の設定ファイル: ${D.splitDetected?.length ? '該当あり' : '該当なし'}）。設定ファイル上の保存場所は未解読（CFG-11）。`);
    for (const base of Object.keys(GROUPS)) {
      const names = GROUPS[base].map((t) => A[t]?.name).filter(Boolean).join('・');
      k.row(s1, A[base].name, k.toggle(!split[base], (v) => { split[base] = !v; rebuild(); save(); }, ['変化する', '別ボタン']), `変化先: ${names}`);
    }
  });

  UI.tab('files', '設定ファイル', (pane, k) => {
    const s1 = k.section(pane, '読み込み', 'ファイルはこのブラウザの中だけで読み取り、どこにも送信しません。場所: ドキュメント\\My Games\\FINAL FANTASY XIV - A Realm Reborn\\FFXIV_CHR…（FFXIV.cfg は 1 つ上のフォルダ）');
    const drop = k.el('label', 'cfg-drop');
    drop.innerHTML = '<b>ここにファイルをドロップ</b><span>またはクリックして選ぶ（複数可）</span>';
    const input = k.el('input');
    input.type = 'file'; input.multiple = true; input.accept = '.dat,.DAT,.cfg';
    input.addEventListener('change', () => importFiles([...input.files]));
    drop.appendChild(input);
    drop.addEventListener('dragover', (e) => { e.preventDefault(); drop.classList.add('over'); });
    drop.addEventListener('dragleave', () => drop.classList.remove('over'));
    drop.addEventListener('drop', (e) => { e.preventDefault(); drop.classList.remove('over'); importFiles([...e.dataTransfer.files]); });
    s1.appendChild(drop);
    const files = [
      ['HOTBAR.DAT', 'ホットバーの中身'], ['KEYBIND.DAT', 'キー（ホットバー・移動）'], ['ADDON.DAT', 'HUD の配置（ホットバー・ジョブゲージ）'], ['FFXIV.cfg', '解像度・HUD の大きさ・パッド'],
    ];
    const cards = k.el('div', 'cfg-files');
    for (const [name, what] of files) {
      const got = IMPORTED?.files?.[name];
      const c = k.el('div', `cfg-file${got ? ' on' : ''}`);
      c.append(k.el('b', null, name), k.el('span', 'what', what), k.el('span', 'state', got ? `読み込み済み: ${got}` : 'サンプル（あなたの設定ファイル）を使用中'));
      cards.appendChild(c);
    }
    s1.appendChild(cards);
    if (IMPORT_LOG) s1.appendChild(k.el('pre', 'cfg-log', IMPORT_LOG));
    k.row(s1, 'サンプルに戻す', k.button('戻す', () => {
      IMPORTED = null; IMPORT_LOG = ''; Object.assign(VIEW, SAMPLE_VIEW);
      Object.assign(MOVE, { up: [...(D.move?.fore ?? [])], down: [...(D.move?.back ?? [])], left: [...(D.move?.left ?? [])], right: [...(D.move?.right ?? [])] });
      applyData(); save(); fit(); setMode(mode); UI.refresh();
    }), '読み込んだ内容を消して、同梱のサンプルに戻します');
    const s2 = k.section(pane, '読まないもの');
    k.row(s2, 'UISAVE.DAT など', k.text('他のプレイヤーの名前などが入るため読み込みません'));
  });

  UI.tab('screen', '画面', (pane, k) => {
    const s1 = k.section(pane, 'ゲームの画面', '舞台（1280 幅）をゲームの縦横比で作り、HUD の大きさをゲームの解像度に合わせて縮めます。');
    const w = k.number(VIEW.gameW, 640, 7680, (v) => { VIEW.gameW = v; save(); fit(); rebuild(); }, 80);
    const h = k.number(VIEW.gameH, 360, 4320, (v) => { VIEW.gameH = v; save(); fit(); rebuild(); }, 80);
    k.row(s1, 'ゲームの解像度', [w, k.text('×', 'cfg-x2'), h], 'FFXIV.cfg から（全画面系なら FullScreenWidth / Height）');
    k.row(s1, 'この PC の画面に合わせる', k.button('合わせる', () => {
      VIEW.gameW = Math.round(screen.width * devicePixelRatio); VIEW.gameH = Math.round(screen.height * devicePixelRatio);
      save(); fit(); rebuild(); UI.refresh();
    }));
    const s = Math.min(innerWidth / STAGE.w, innerHeight / STAGE.h);
    k.row(s1, '今の表示', k.text(`PC の画面 ${screen.width}×${screen.height}（拡大率 ${devicePixelRatio}）/ ブラウザ ${innerWidth}×${innerHeight} / 表示倍率 ${(s * 100).toFixed(0)}%`));
  });

  UI.tab('sound', '音', (pane, k) => {
    const s1 = k.section(pane, '効果音', 'FF14 の効果音は使わず、ブラウザでその場で合成しています。');
    k.row(s1, '効果音', k.toggle(Au?.isEnabled() ?? false, (v) => { Au?.setEnabled(v); syncSound(); if (v) Au?.buff(); }));
    k.row(s1, '音量', k.range(0, 1, 0.05, Au?.getVolume() ?? 0.45, (v) => { Au?.setVolume(v); }, (v) => `${Math.round(v * 100)}%`));
    k.row(s1, '試しに鳴らす', [
      k.button('斬撃', () => { Au?.slash(1); Au?.hit(1); }), k.button('クリティカル', () => { Au?.slash(1.5); Au?.crit(); }),
      k.button('詠唱', () => Au?.cast(1500)), k.button('予兆', () => Au?.warn()), k.button('被弾', () => Au?.hurt()),
    ]);
  });

  UI.tab('game', 'ゲームモード', (pane, k) => {
    const s1 = k.section(pane, 'ゲームモード', GAME_NOTE);
    k.row(s1, '状態', k.text(GM?.isActive() ? (GM.isLocked() ? '入（キーボードロック中）' : '入（全画面のみ）') : '切'));
    k.row(s1, '切り替え', k.button(GM?.isActive() ? '解除する' : 'ゲームモードにする', async () => { if (GM.isActive()) await GM.exit(); else await enterGame(); UI.refresh(); }));
    k.row(s1, '開始前の確認', k.text('練習中にタブを閉じる・再読み込みしようとすると確認が出ます'));
  });

  // 開始画面の簡単な設定と説明
  function buildStart() {
    const k = window.MockSettings.kit;
    const box = $('startOpts');
    box.innerHTML = '';
    const row = (label, ctl) => { const r = k.el('div', 'so-row'); r.append(k.el('span', 'so-label', label), ctl); box.appendChild(r); };
    row('敵の範囲攻撃', k.choice([['off', 'なし'], ['easy', '少なめ'], ['normal', 'ふつう'], ['hard', '多め']], OPT.mech, (v) => { OPT.mech = v; applyPractice(); }));
    row('タンク', k.toggle(OPT.tank, (v) => { OPT.tank = v; applyPractice(); }, ['いる', 'いない']));
    row('方向指定のガイド', k.toggle(OPT.guide, (v) => { OPT.guide = v; save(); }));
    const howto = [
      `移動は ${keyLabel(MOVE.up)}${keyLabel(MOVE.left)}${keyLabel(MOVE.down)}${keyLabel(MOVE.right)}（読み込んだ KEYBIND.DAT）・パッドは左スティック。攻撃は射程内で（近接は敵の輪の外側から ${Arena.POL.melee}m・仮）。`,
      '月光は背面、花車は側面から。敵の足元の緑が背面・黄が側面です。トゥルーノース中は向きを問いません。',
      '敵の範囲攻撃は、橙色の予兆が満ちると発動します。詠唱中（居合術など）に動くと中断します。',
      'ホットバーの中身・キー・配置・ジョブゲージの位置は、あなたの設定ファイル（サンプル）のとおりです。「設定」で差し替えられます。',
    ];
    $('howto').innerHTML = '';
    for (const t of howto) $('howto').appendChild(k.el('li', null, t));
  }

  // ---------------- ループと拡大縮小 ----------------
  // 画面の大きさ: ゲームの解像度（設定または FFXIV.cfg）の縦横比で舞台を作り、ブラウザの表示領域に合わせて拡大縮小する
  const STAGE = { w: 1280, h: 720 };
  function fit() {
    STAGE.h = Math.round((1280 * VIEW.gameH) / VIEW.gameW);
    stage.style.height = `${STAGE.h}px`;
    const s = Math.min(innerWidth / STAGE.w, innerHeight / STAGE.h);
    stage.style.transform = `scale(${s})`;
    Arena.resize(STAGE.w, STAGE.h);
    placeGauges();
  }
  window.addEventListener('resize', fit);
  // 一時停止: 設定を開いている間と、タブが隠れている間
  let hiddenPause = false;
  const paused = () => UI.isOpen() || hiddenPause;
  document.addEventListener('visibilitychange', () => {
    hiddenPause = document.hidden;
    if (document.hidden && live()) addLog('sys', 'タブが隠れたので一時停止しました');
    held.clear();
  });

  // 動作確認用: ?speed=10 のように付けると時間を速める（通常は 1）
  const SPEED = Math.max(0.1, Math.min(50, Number(new URLSearchParams(location.search).get('speed')) || 1));
  let last = performance.now();
  function loop(now) {
    const dt = Math.min(100, now - last) * SPEED;
    last = now;
    pollPad();
    moveInput();
    const run = live() && !paused();
    Arena.update(run ? dt : 0, S.t, run ? S.phase : 'idle');
    if (run) step(Math.round(dt));
    Arena.render(S.t, S.phase);
    render();
    requestAnimationFrame(loop);
  }

  // 動作確認用のフック（ブラウザのコンソールや自動テストから状態を見る）
  window.MockDebug = { state: () => S, opt: OPT, arena: Arena, press, start };

  Arena.init({ canvas: $('arena'), overlay: $('overlay') });
  $('startJobIcon').src = D.job.icon;
  $('ptSelfIcon').src = D.job.icon;
  $('ptTankIcon').src = D.tank.icon;
  loadSaved();
  reset();
  buildStart();
  fit();
  setMode(VIEW.mode ?? 'hud');
  requestAnimationFrame(loop);
})();
