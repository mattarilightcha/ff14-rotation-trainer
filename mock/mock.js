// 木人練習 UI モック（侍・ナイト・白魔道士）
// - 名称・アイコン・詠唱・リキャスト・コンボ元・射程・範囲は mock-data.js（クライアント抽出データ）から読む
// - ここは共通の仕組み（時間・GCD・硬直・先行入力・詠唱・コンボ・リキャスト・ステータス・ダメージ・画面）。
//   ジョブごとの決まり（ボタンの変化・使える条件・効果・ゲージ）は jobs.js
// - ゲームデータにない値は POLICY と arena.js の POL にまとめ、「仮」として扱う（docs/SPEC.md §10）
// - 画面: 戦闘は 3D の斜め見下ろし（arena3d.js。WebGL が使えないときだけ arena.js の真上の 2D）、HUD は FF14 風。ジョブゲージは抽出した ULD とテクスチャ
(() => {
  'use strict';
  // ジョブ: URL の ?job=PLD、なければ保存した設定、なければ侍。切り替えはページを読み直す
  const MD = window.MOCK_DATA;
  const JOB = (() => {
    const q = new URLSearchParams(location.search).get('job');
    if (q && MD.jobs[q]) return q;
    try { const v = JSON.parse(localStorage.getItem('ff14rt:mock:v3') ?? 'null'); if (v?.OPT?.job && MD.jobs[v.OPT.job]) return v.OPT.job; } catch { /* 読めなければ既定 */ }
    return 'SAM';
  })();
  const D = { ...MD, ...MD.jobs[JOB], hud: { ...MD.hud, gauges: MD.jobs[JOB].gauges } };
  const A = D.actions;
  // 役割: melee（相方のタンクは設定で出し入れ）/ tank（あなたが敵を引きつけ、相方はヒーラー）/ healer（相方のタンクを回復する）
  const ROLE = D.job.role;
  const NPC = ROLE === 'tank' ? D.npc.healer : D.npc.tank;
  const Au = window.MockAudio, GM = window.MockGameMode, Arena = window.MockArena;

  // ---- 仮の値（ゲームデータにない。アプリの方針値 / 未確認） ----
  // 硬直・先行入力・滑り撃ちは、サーバー側の値でクライアントのデータにない。コミュニティの解析と検証（定説）から置いた仮の値（docs/SPEC.md §6.1・§10）
  const POLICY = {
    animLockMs: 600, // 詠唱のない技の硬直。実際はこれに応答の遅れ（OPT.latency）が足される（GAME-04）
    castLockAfterMs: 100, // 詠唱完了の後の硬直。応答の遅れは足されない（GAME-04, 07）
    queueMs: 500, // 先行入力: そのアクション自身のリキャストの残りがこの時間以下なら受け付ける（GAME-05）
    comboWindowMs: 30000, // コンボ受付時間（GAME-06）
    countdownMs: 3000,
    weaveWarn: 3, // GCD 間のアビリティがこの数に達したら警告（DESIGN-01）
    padTrigger: 0.5,
    slideMs: 500, // 詠唱の残りがこの時間を切ったら、動いても中断しない（滑り撃ち）。効果もこの時点で決まる（GAME-55）
  };
  const COMBO_HAS_NEXT = new Set(Object.values(A).flatMap((a) => a.comboFrom));
  const POS_JA = { rear: '背面', flank: '側面', front: '正面' };

  // アクションの変化（置き換え）: 元のボタン → 変化先。split[base] が true なら「変化させない（別ボタン）」（CFG-11）
  const GROUPS = D.replaceGroups;
  const TARGET_BASE = {};
  for (const [base, ts] of Object.entries(GROUPS)) for (const t of ts) (TARGET_BASE[t] ??= []).push(Number(base));
  const split = Object.fromEntries((D.splitDetected ?? []).map((b) => [b, true]));
  // バーごとに「ジョブ専用 / 共有」のどちらを使うか（CFG-08 未解読のため既定は推定。設定で切り替え可）
  let barSource = Object.fromEntries(Object.entries(D.bars).map(([k, v]) => [k, v.defaultSource]));

  // ジョブの決まり（jobs.js）。R はジョブの決まりに渡す道具（状態・ステータスの付与・ログ・回復）
  const R = {
    get S() { return S; }, A, D, get OPT() { return OPT; },
    has: (k) => has(k), buff: (k, ms, stacks) => buff(k, ms, stacks), remove: (k) => remove(k),
    addLog: (c, t) => addLog(c, t), ev: (k, o) => ev(k, o), TARGET_BASE,
    heal: (who, frac) => Arena.heal(who, frac), hot: (who, frac, sec) => Arena.hot(who, frac, sec),
    shield: (who, frac, sec) => Arena.shield(who, frac, sec), mitigate: (who, pct, sec) => Arena.mitigate(who, pct, sec),
    npcDown: () => Arena.isNpcDown(), raise: () => Arena.raiseNpc(),
    // 設置型の技（白魔道士のアサイラム・リタージー・オブ・ベル）
    zone: (kind, o) => Arena.placeZone(kind, { ...o, at: placeAt ?? undefined }), zoneHeal: (kind, frac, style) => Arena.zoneHeal(kind, frac, style), zoneEnd: (kind) => Arena.endZone(kind),
  };
  const J = window.MockJobs[JOB].create(R);
  const STATUS = J.STATUS;
  const TRACKED = J.tracked.map(([, k]) => k); // 維持率を見るステータス（結果のタイムラインにも出す）
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
    hpMode: 'inf', // 敵の体力: inf 無限（木人） / set 決めた値 / last 前回の与ダメージと同じ
    hp: 60000, // hpMode が set のときの体力（ダメージの単位）
    dmgScale: 1, // ダメージ = 威力 × この値（1 なら威力そのまま）
    lastDamage: 0, // 前回の与ダメージ（hpMode が last のとき使う）
    tankSkill: 'good', // タンクの腕前: good 上手 / normal ふつう / bad 下手
    stage: 'dojo', // ステージ（stages.js）
    markers: null, // フィールドマーカー: null = ステージの初期値 / true / false
    camSpeed: 1, // カメラを回す速さ（マウス・キー・右スティック共通の倍率）
    camInvX: false, camInvY: false, // カメラの左右・上下の反転
    job: JOB, // 練習するジョブ（切り替えるとページを読み直す）
    latency: 50, // 応答の遅れ（ms）。詠唱のない技の硬直に足す（実機の硬直は 0.6 秒＋応答の遅れ: GAME-04）
  };

  // ---------------- 状態 ----------------
  let S;
  function reset() {
    S = {
      phase: 'idle', t: -POLICY.countdownMs,
      gcdStart: null, gcdEnd: null, lockUntil: -Infinity, lastOgcdLockEnd: null, weaves: 0,
      cast: null, cds: {}, combo: null, comboUntil: 0, chain: null, chainUntil: 0, st: {}, queue: null,
      stats: {
        gcds: 0, idleMs: 0, clipMs: 0, cutMs: 0, comboBreaks: 0, rejected: 0,
        uptime: Object.fromEntries(TRACKED.map((k) => [k, 0])),
        pos: { rear: { n: 0, ok: 0 }, flank: { n: 0, ok: 0 } },
        hits: 0, downs: 0, interrupts: 0, outOfRange: 0, whiffs: 0, movingMs: 0, movingIdleMs: 0, outRangeMs: 0,
        tankDowns: 0, tankHpSum: 0, tankLowMs: 0, // 回復役: 相方のタンクの HP（平均を出すための合計）と、30% を切っていた時間
        queueIgnored: 0, // 先行入力が入っている間に押して、無視された入力
      },
      // 結果画面のタイムライン用の記録
      tl: { gcd: [], ogcd: [], gaps: [], buffs: Object.fromEntries(TRACKED.map((k) => [k, []])), move: [], hits: [], pos: [] },
      hinted: false, moving: false, mech: null,
      // ダメージと敵の体力（ダメージ = 説明文の威力 × 与ダメージ上昇 × OPT.dmgScale）
      events: [], dmg: 0, pot: 0, dot: null, killT: null,
      hpMax: OPT.hpMode === 'set' ? OPT.hp : OPT.hpMode === 'last' ? OPT.lastDamage : 0,
    };
    S.hp = S.hpMax;
    J.initState(S);
    cancelAim();
    $('log').innerHTML = '';
    $('result').hidden = true;
    Arena.reset(arenaOpts());
    Arena.castEnd();
    Gauge.reset(S);
    clearStatuses();
    $('startOverlay').hidden = false;
    addLog('sys', `Space（パッドは Start）で開始。移動 ${keyLabel(D.move?.fore)}${keyLabel(D.move?.left)}${keyLabel(D.move?.back)}${keyLabel(D.move?.right)}・ジャンプ ${keyLabel(D.move?.jump) || 'なし'}`);
  }
  const arenaOpts = () => ({ tank: OPT.tank, mech: OPT.mech, guide: OPT.guide, seed: OPT.seed, durationMs: OPT.durationMs, tankSkill: OPT.tankSkill, stage: OPT.stage, markers: OPT.markers, role: D.job.role, job: JOB });
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

  // ---------------- 行動の記録（結果の CSV・ミスの一覧に使う）----------------
  function ev(kind, o = {}) {
    S.events.push({ t: S.t, kind, gauge: J.gaugeCols.map(([, f]) => f(S)), hp: S.hpMax ? Math.round(S.hp) : '', pos: POS_JA[Arena.positional()], dist: +Arena.edgeDistance().toFixed(1), ...o });
  }

  // ---------------- ダメージ（説明文の威力。クリティカル・ダイレクトヒットは入れない）----------------
  const statusByName = Object.fromEntries(Object.entries(STATUS).map(([k, v]) => [v.name, k]));
  const DMG_UP = Object.entries(D.dmgUp ?? {}); // [ステータス名, %]（例: 風月 13）
  function dmgMult() {
    let m = 1;
    for (const [name, pctUp] of DMG_UP) { const k = statusByName[name]; if (k && has(k)) m *= 1 + pctUp / 100; }
    return m;
  }
  // 威力: 通常・コンボ時・背面／側面（方向指定が成功したとき）・「〜時威力」（そのステータス中）
  function potencyOf(a, ok, pos) {
    const p = a.pot;
    if (!p || p.base == null) return 0;
    const combo = ok && a.comboFrom.length > 0;
    let v = combo && p.combo != null ? p.combo : p.base;
    if (pos?.ok && pos.need === 'rear') v = combo ? p.comboRear ?? v : p.rear ?? v;
    if (pos?.ok && pos.need === 'flank') v = combo ? p.comboFlank ?? v : p.flank ?? v;
    // 「〜時威力」は説明文に先に書かれたものを優先（ホーリースピリット「両方が付与されている場合は、神聖魔法効果アップの効果が優先」）
    for (const c of p.cond ?? []) { const k = statusByName[c.status]; if (k && has(k)) { v = c.potency; break; } }
    return v;
  }
  function dealDamage(potency, mult = dmgMult()) {
    const dmg = Math.round(potency * mult * OPT.dmgScale);
    S.pot += potency; S.dmg += dmg;
    if (S.hpMax > 0 && S.killT == null) {
      S.hp = Math.max(0, S.hp - dmg);
      if (S.hp <= 0) S.killT = S.t;
    }
    return dmg;
  }

  // ---------------- ルール ----------------
  const has = (k) => S.st[k] && S.st[k].until > S.t;
  // 詠唱時間とリキャスト（ジョブの決まりの倍率: 侍の風花、白魔道士の神速魔。詠唱時間無しの効果: ナイトの神聖魔法効果アップ・レクイエスカット、迅速魔）
  const castTimeOf = (a) => { const base = Math.round(a.castMs * J.speed(a)); return J.castMs ? J.castMs(a, base) : base; };
  const gcdRecast = (a) => Math.round(a.recastMs * J.speed(a));
  const ownCd = (a) => (a.cooldownGroup !== 58 && a.cooldownGroup ? a.cooldownGroup : null);
  const maxCh = (a) => J.charges[a.id] ?? Math.max(1, a.maxCharges);

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
    if (ownCd(a) != null && !J.freeUse?.(a.id)) r = Math.max(r, cdReadyAt(a));
    return r;
  }
  // 先行入力の条件に使う「そのアクション自身のリキャストの残り」: GCD なら GCD の残り、固有のリキャストがあればその残り（チャージ制は次のチャージまで）。
  // 硬直や詠唱の残りは含めない（GAME-05）
  function recastLeft(a) {
    let r = 0;
    if (a.isGcd && S.gcdEnd != null) r = Math.max(r, S.gcdEnd - S.t);
    if (ownCd(a) != null && !J.freeUse?.(a.id)) r = Math.max(r, cdReadyAt(a) - S.t);
    return r;
  }
  // 詠唱のない技の硬直: 0.6 秒（ジョブの決まりで長い技: 侍の必殺剣・夜天 0.8 秒）＋応答の遅れ（GAME-04 仮）
  const animLockOf = (a) => (J.animLockMs?.[a.id] ?? POLICY.animLockMs) + (OPT.latency ?? 0);

  // ボタン（ホットバーに入っている ID）→ 今実行されるアクション（置き換え。ジョブの決まり: GAME-15 をツールチップから）
  const resolve = (id) => J.resolve(id);

  // 使用条件（満たさなければ理由を返す）
  function blocked(id) {
    if (!A[id].forJob) return `${A[id].name}は${D.job.name}では使えません（共有バーに残っているアクション）`;
    if (S.phase === 'countdown' && !J.prepull.has(id)) return 'カウントダウン中は使えません（プリプルの条件は未確認）';
    const jb = J.blocked(id);
    if (jb) return jb;
    const a = A[id];
    if (ownCd(a) != null && !J.freeUse?.(id) && charges(a) === 0 && cdReadyAt(a) - S.t > POLICY.queueMs) {
      return maxCh(a) > 1 ? `${a.name}のチャージがありません` : `${a.name}はリキャスト中です（残り ${((cdReadyAt(a) - S.t) / 1000).toFixed(1)} 秒）`;
    }
    return null;
  }

  // 射程（抽出データ: range -1 は近接＝仮の値 POL.melee、正の値は m。自分中心の範囲技は射程なし）
  const rangeOf = (a) => (!a.hostile || a.shape === 2 ? null : a.range === -1 ? Arena.POL.melee : a.range > 0 ? a.range : null);
  // 位置の条件（戦闘不能・射程）。kind は集計用。
  // 移動中に詠唱のある技を押すと、詠唱は始まり、すぐに中断される（実機でエラーの文言が見つからず、中断されるという記述があるため: GAME-55 仮）
  function placeBlock(a) {
    if (Arena.isDown()) return { msg: '戦闘不能中です', kind: 'down' };
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

  function buff(k, ms, stacks) {
    const iv = S.tl.buffs[k];
    if (iv) { const last = iv[iv.length - 1]; if (!last || last.to != null) iv.push({ from: Math.max(0, S.t), to: null }); }
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
    // コンボを切らない技（抽出データの preservesCombo）どうしのコンボ（ナイトのコンフィテオル → ブレード・オブ・フェイス → …）は、
    // 通常のコンボとは別に数える（どちらも途切れない。仮 GAME-63）
    if (a.preservesCombo) {
      if (a.comboFrom.length) {
        const ok = S.chain != null && a.comboFrom.includes(S.chain) && at <= S.chainUntil;
        S.chain = ok && COMBO_HAS_NEXT.has(a.id) ? a.id : null; S.chainUntil = at + POLICY.comboWindowMs;
        return ok;
      }
      if (COMBO_HAS_NEXT.has(a.id)) { S.chain = a.id; S.chainUntil = at + POLICY.comboWindowMs; }
      return false;
    }
    if (a.comboFrom.length) {
      const ok = J.comboFree() || (S.combo != null && a.comboFrom.includes(S.combo) && at <= S.comboUntil);
      if (!ok) { S.stats.comboBreaks++; addLog('ng', `コンボ切れ: ${a.name}の前段がありません`); ev('ミス', { action: a.name, result: 'コンボ切れ', note: '前段がない' }); }
      S.combo = ok && COMBO_HAS_NEXT.has(a.id) ? a.id : null;
      S.comboUntil = at + POLICY.comboWindowMs;
      return ok;
    }
    if (J.comboStarters.has(a.id)) {
      if (S.combo != null) { S.stats.comboBreaks++; addLog('ng', 'コンボ切れ: 途中で始動技を使いました'); ev('ミス', { action: a.name, result: 'コンボ切れ', note: '途中で始動技' }); }
      S.combo = a.id; S.comboUntil = at + POLICY.comboWindowMs;
      return true;
    }
    if (S.combo != null) {
      S.stats.comboBreaks++; addLog('ng', `コンボ切れ: ${a.name}でコンボが途切れました`); ev('ミス', { action: a.name, result: 'コンボ切れ', note: 'コンボ以外の GCD' });
      S.combo = null;
    }
    return false;
  }

  // 方向指定（説明文の「背面攻撃時」「側面攻撃時」）。トゥルーノース中は向きを問わない
  function positionalOf(a) {
    if (!a.positional) return null;
    const tn = J.positional?.(); // 方向を問わない効果（侍のトゥルーノース）の名前
    const got = Arena.positional();
    const ok = !!tn || got === a.positional;
    const st = S.stats.pos[a.positional];
    st.n++; if (ok) st.ok++;
    S.tl.pos.push({ t: S.t, ok });
    if (!ok) ev('ミス', { action: a.name, result: '方向指定ミス', note: `${POS_JA[a.positional]}から（今は${POS_JA[got]}）` });
    addLog(ok ? 'ok' : 'ng', ok ? `方向指定 ○ ${a.name}（${tn || POS_JA[got]}）` : `方向指定ミス: ${a.name}は${POS_JA[a.positional]}から（今は${POS_JA[got]}）`);
    return { need: a.positional, ok };
  }
  function whiff(a) {
    S.stats.whiffs++;
    ev('使用', { action: a.name, result: '空振り', note: `範囲 ${a.effectRange}m に敵がいない` });
    if (a.isGcd && S.combo != null && !a.preservesCombo) S.combo = null;
    addLog('ng', `${a.name}: 範囲内に敵がいません（空振り。範囲 ${a.effectRange}m）`);
  }
  // 当たったあとの共通処理（効果・方向指定・移動技・演出）
  // snap: 詠唱のある技は、滑り撃ちの時点（詠唱終了の 0.5 秒前）の与ダメージ上昇で計算する（効果はその時点で決まる: GAME-55）
  function land(id, ok, snap) {
    const a = A[id];
    if (!reaches(a)) { whiff(a); playFx(id, false, null, false, 0); return; }
    const pos = positionalOf(a);
    // ダメージは効果（バフの付与・消費）の前に計算する（燕飛効果アップは使うと消える、風月は付いてから効く）
    const potency = potencyOf(a, ok, pos);
    const mult = snap?.mult ?? dmgMult();
    const dmg = potency > 0 ? dealDamage(potency, mult) : 0;
    if (a.pot?.dot) S.dot = { next: S.t + 3000, until: S.t + a.pot.dot.sec * 1000, potency: a.pot.dot.potency, mult, name: a.name };
    J.effects(id, ok);
    const combo = ok && a.comboFrom.length > 0;
    addLog('ok', `${a.name}${combo ? '（コンボ）' : ''}${dmg ? `  ${dmg.toLocaleString('ja-JP')}` : ''}`);
    ev('使用', { action: a.name, result: [a.isGcd ? 'GCD' : 'アビリティ', combo ? 'コンボ' : '', pos ? (pos.ok ? '方向指定○' : '方向指定×') : ''].filter(Boolean).join('・'), potency: potency || '', dmg: dmg || '' });
    if (a.dash) { Arena.dashToTarget(); Au?.whoosh(); }
    if (a.backstep) { Arena.backstep(a.backstep); Au?.whoosh(); }
    playFx(id, ok, pos, true, dmg);
  }

  function execute(id, at) {
    const a = A[id];
    const free = !!J.freeUse?.(id); // リキャストを待たずに使える使い方（リタージー・オブ・ベルの再使用）: リキャストも始めない
    const prevT = S.t;
    S.t = at;
    let ok = false;
    if (a.isGcd) {
      if (S.gcdEnd != null) {
        const gap = at - S.gcdEnd;
        if (gap > 20) {
          // クリップ: 最後のアビリティの硬直のうち、GCD が戻った後（または止まっていた後に押したアビリティなら、押した後）にはみ出た分
          const clip = S.lastOgcdLockEnd != null ? Math.max(0, Math.min(at, S.lastOgcdLockEnd) - Math.max(S.gcdEnd, S.lastOgcdAt ?? -Infinity)) : 0;
          const idle = gap - clip;
          S.stats.clipMs += clip; S.stats.idleMs += idle;
          if (clip > 20) S.tl.gaps.push({ from: S.gcdEnd, to: S.gcdEnd + clip, kind: 'clip' });
          if (idle > 20) S.tl.gaps.push({ from: S.gcdEnd + clip, to: at, kind: 'idle' });
          if (clip > 20) addLog('warn', `アビリティの挟みすぎで GCD が ${(clip / 1000).toFixed(2)} 秒遅れました`);
          if (idle > 100) addLog('warn', `GCD が ${(idle / 1000).toFixed(2)} 秒止まりました`);
          if (clip > 20) ev('ミス', { result: 'クリップ', note: `${(clip / 1000).toFixed(2)} 秒`, gapMs: clip });
          if (idle > 100) ev('ミス', { result: '止まり', note: `${(idle / 1000).toFixed(2)} 秒`, gapMs: idle });
        }
      } else if (at > 0 && S.phase === 'combat') {
        S.stats.idleMs += at;
        S.tl.gaps.push({ from: 0, to: at, kind: 'idle' });
      }
      // 詠唱時間がリキャスト以上の GCD（レイズなど）は、詠唱完了＋硬直 0.1 秒のあとに次が使える（キャスターの 0.1 秒: GAME-04）
      const ct0 = castTimeOf(a);
      S.gcdStart = at; S.gcdEnd = at + Math.max(gcdRecast(a), ct0 > 0 ? ct0 + POLICY.castLockAfterMs : 0);
      S.tl.gcd.push({ t: at, id, end: S.gcdEnd });
      S.weaves = 0; S.lastOgcdLockEnd = null; S.stats.gcds++;
      ok = castTimeOf(a) > 0 || reaches(a) ? combo(a, at) : false;
    } else {
      S.tl.ogcd.push({ t: at, id });
      S.weaves++;
      if (S.weaves === POLICY.weaveWarn) addLog('warn', `GCD の間に ${S.weaves} つ目のアビリティ（クリップしやすい）`);
    }
    if (ownCd(a) != null && !free) S.cds[ownCd(a)] = Math.max(S.cds[ownCd(a)] ?? -Infinity, at) + a.recastMs;
    const ct = castTimeOf(a);
    if (ct > 0) {
      S.cast = { id, start: at, end: at + ct, ok, moving: Arena.isMoving() || Arena.isJumping(), snap: null };
      S.lockUntil = at + ct + POLICY.castLockAfterMs;
      addLog('ok', `${a.name} の詠唱開始`);
      ev('詠唱開始', { action: a.name });
      Arena.castStart(J.castColor(id), ct, J.castPower ?? 1); Au?.cast(ct);
    } else {
      S.lockUntil = at + animLockOf(a);
      if (!a.isGcd) { S.lastOgcdLockEnd = S.lockUntil; S.lastOgcdAt = at; }
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
    ev('ミス', { action: a.name, result: '詠唱中断', note: why });
    Au?.error();
  }

  function reject(msg, kind) {
    S.stats.rejected++;
    if (kind === 'range') S.stats.outOfRange++;
    ev('受け付けず', { result: kind === 'range' ? '射程外' : kind === 'early' ? '早すぎ' : kind === 'down' ? '戦闘不能' : '', note: msg });
    Au?.error();
    addLog('ng', msg);
  }

  // 地面指定の技（アサイラム・リタージー・オブ・ベルなど）: 押すとマウスの位置にターゲットサークルが出て、クリックした所に置く（ゲームと同じ）。
  // もう一度押してもマウスの位置に置く。右クリック・Esc でやめる。パッドから押したときは自動の場所に置く
  let aiming = null, placeAt = null, mousePos = null;
  const aimRadius = (a) => Number(/周囲(\d+)m/.exec(a.desc ?? '')?.[1] ?? 0) || a.effectRange || 5;
  function aimPos() {
    if (!aiming || !mousePos) return null;
    const g = Arena.groundAt(mousePos.x, mousePos.y);
    if (!g) return null;
    const p = Arena.debug().player, d = Math.hypot(g.x - p.x, g.y - p.y);
    return { x: g.x, y: g.y, ok: d <= (aiming.range || 30) + 0.001 };
  }
  function updateAim() {
    const q = aimPos();
    Arena.setAim(aiming && q ? { ...q, r: aiming.r } : null);
  }
  function cancelAim(msg) { if (!aiming) return; aiming = null; Arena.setAim(null); if (msg) addLog('sys', msg); }
  function confirmAim() {
    const q = aimPos(), cur = aiming;
    if (!cur) return;
    if (!q) return;
    if (!q.ok) { reject(`${A[cur.id].name}: 射程外です（射程 ${cur.range}m）`, 'range'); return; }
    cancelAim();
    placeAt = { x: q.x, y: q.y };
    try { press(cur.baseId, 'place'); } finally { placeAt = null; }
  }
  function press(baseId, src) {
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
    // 先行入力が入っている間は、ほかの入力は無視される（先に押したものが出る。同じボタンを押し直しても変わらない: GAME-05）
    if (S.queue) {
      if (S.queue.baseId !== baseId && !S.queue.noted) {
        S.queue.noted = true; S.stats.queueIgnored++;
        addLog('sys', `先行入力中（${A[resolve(S.queue.baseId)]?.name ?? ''}）のため、${a.name}は無視されました`);
      }
      return;
    }
    const why = blocked(id);
    if (why) { reject(why); return; }
    const pb = placeBlock(a);
    if (pb) { reject(pb.msg, pb.kind); return; }
    if (a.ground && src !== 'pad' && src !== 'place') {
      if (aiming && aiming.baseId === baseId) { confirmAim(); return; }
      aiming = { baseId, id, r: aimRadius(a), range: a.range > 0 ? a.range : 30 };
      updateAim();
      addLog('sys', `${a.name}: 置く場所をクリック（右クリック・Esc でやめる）`);
      return;
    }
    const ra = readyAt(a);
    if (ra <= S.t) { execute(id, S.t); return; }
    // 先行入力: そのアクション自身のリキャストの残りが 0.5 秒以下なら入れておき、使えるようになった瞬間に出す。
    // 硬直や詠唱の残りは問わない（その間に押したアビリティは、終わった瞬間に出る）。地面指定のアクションは入らない
    const rc = recastLeft(a);
    if (a.ground) { reject(`${a.name}: 地面指定のアクションは先行入力できません（使えるようになってから押す）`); return; }
    if (rc <= POLICY.queueMs) { S.queue = { baseId, at: S.t }; return; }
    const left = `GCD の残り ${(rc / 1000).toFixed(2)} 秒。先行入力は残り ${POLICY.queueMs / 1000} 秒から`;
    reject(S.cast ? `詠唱中のため使用できません（${left}）` : `このアクションはまだ使用できません（${left}）`, 'early');
  }

  // ---------------- 時間の進行 ----------------
  const gcdIdleNow = () => !S.cast && (S.gcdEnd == null || S.gcdEnd <= S.t);
  function step(dt) {
    if (!live()) return;
    const t0 = S.t;
    const t1 = S.t + dt;
    if (S.phase === 'countdown') { const b = Math.ceil(-t0 / 1000), af = Math.ceil(-t1 / 1000); if (af !== b && af > 0) Au?.tick(); }
    // 移動・ジャンプによる詠唱の中断（詠唱の残りが POLICY.slideMs より長いときだけ。短ければ滑り撃ちで完了する）
    if (S.cast && (Arena.isMoving() || Arena.isJumping()) && S.cast.end - t0 > POLICY.slideMs) interruptCast(S.cast.moving ? '移動中に詠唱を始めた' : Arena.isJumping() ? 'ジャンプした' : '移動した');
    // 滑り撃ちの時点: 効果（与ダメージ上昇）がここで決まり、以後は動いても倒れても詠唱は完了する
    if (S.cast && !S.cast.snap && t1 >= S.cast.end - POLICY.slideMs) { S.t = Math.max(t0, S.cast.end - POLICY.slideMs); S.cast.snap = { mult: dmgMult() }; S.t = t0; }
    // 詠唱完了（予定時刻で処理）
    if (S.cast && S.cast.end <= t1) {
      const c = S.cast; S.cast = null;
      S.t = c.end; Arena.castEnd(); land(c.id, c.ok, c.snap);
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
    // 継続ダメージ（3 秒ごと。間隔は仮 GAME-56。付けたときのバフで計算）
    if (S.dot && S.t >= S.dot.next && S.dot.next <= S.dot.until && S.phase === 'combat') {
      const dmg = dealDamage(S.dot.potency, S.dot.mult);
      S.dot.next += 3000;
      Arena.dotTick(dmg); Au?.dot();
      ev('継続ダメージ', { action: S.dot.name, potency: S.dot.potency, dmg });
    }
    // ステータスの期限切れ
    for (const [k, v] of Object.entries(S.st)) {
      if (v.until <= S.t) {
        delete S.st[k];
        const iv = S.tl.buffs[k]; if (iv?.length && iv[iv.length - 1].to == null) iv[iv.length - 1].to = v.until;
        if (STATUS[k].tracked && S.phase === 'combat') { addLog('ng', `${STATUS[k].name}が切れました`); ev('ミス', { result: '効果切れ', note: `${STATUS[k].name}が切れた` }); }
        if (k === 'tsubame') S.lastIai = null;
      }
    }
    J.tick?.(dt);
    // コンボ期限切れ
    if (S.combo != null && S.t > S.comboUntil) { S.combo = null; S.stats.comboBreaks++; addLog('ng', 'コンボの受付時間が切れました'); }
    if (S.chain != null && S.t > S.chainUntil) { S.stats.comboBreaks++; addLog('ng', `${A[S.chain].name}の続きの受付時間が切れました`); ev('ミス', { action: A[S.chain].name, result: 'コンボ切れ', note: '続きの技を使わなかった' }); S.chain = null; }
    // 回復役: 相方のタンクの HP を集計する
    if (ROLE === 'healer' && S.phase === 'combat') { const th = Arena.tankHp(); S.stats.tankHpSum += th * dt; if (th < 0.3) S.stats.tankLowMs += dt; }
    // フェーズ
    if (S.phase === 'countdown' && S.t >= 0) { S.phase = 'combat'; addLog('sys', '戦闘開始'); Au?.go(); }
    if (S.phase === 'combat' && S.killT != null) { Arena.kill(); Au?.kill?.(); finish(true); }
    else if (S.phase === 'combat' && S.t >= OPT.durationMs) finish(false);
  }

  // 敵の技・被弾（arena.js から）
  Arena.on('mech', (name, hint, castMs) => {
    if (!S || S.phase !== 'combat') return;
    S.mech = { name, hint, until: S.t + Math.max(castMs, 2600) };
    addLog('warn', `敵の技: ${name}${OPT.hints && hint ? `（${hint}）` : ''}`);
    ev('敵の技', { action: name, note: hint ?? '' });
    if (castMs > 0) Au?.warn();
  });
  Arena.on('hit', (name) => {
    if (!S) return;
    S.stats.hits++; S.tl.hits.push(S.t);
    addLog('ng', `被弾: ${name}`);
    ev('ミス', { action: name, result: '被弾' });
    Au?.hurt();
  });
  Arena.on('down', (name) => {
    if (!S) return;
    S.stats.downs++;
    ev('ミス', { action: name, result: '戦闘不能' });
    if (S.cast && S.cast.end - S.t > POLICY.slideMs) interruptCast('戦闘不能'); // 滑り撃ちの時点を過ぎていれば完了する
    S.queue = null;
    addLog('ng', `戦闘不能: ${name}（3 秒後に起き上がります）`);
  });
  Arena.on('revive', () => { if (S && live()) addLog('sys', '起き上がりました（HP 60%）'); });
  // 回復役: 相方のタンクが倒れた・起き上がった
  Arena.on('tankdown', () => {
    if (!S || S.phase !== 'combat') return;
    S.stats.tankDowns++;
    addLog('ng', 'タンクが戦闘不能になりました（レイズで起こせます。20 秒たつと自分で起き上がります・仮）');
    ev('ミス', { action: NPC.name, result: 'タンク戦闘不能', note: '回復が間に合わなかった' });
    Au?.hurt();
  });
  Arena.on('tankrevive', (how) => { if (S && live()) addLog('sys', how === 'raise' ? 'タンクを蘇生しました（HP 50%）' : 'タンクが起き上がりました（HP 50%）'); });
  Arena.on('boom', () => Au?.boom(0.8)); // 敵の範囲攻撃の発動
  // 自分がダメージを受けた（リタージー・オブ・ベルが鳴る）・全体攻撃
  Arena.on('hurt', () => { if (S && live()) J.onHurt?.(); });
  Arena.on('raid', (name) => {
    if (!S || S.phase !== 'combat') return;
    addLog('warn', `${name}: 全員が攻撃を受けた（よけられない）`);
    ev('敵の技', { action: name, note: '全体攻撃（よけられない）' });
    Au?.hurt();
  });
  Arena.setBellStacks(() => S?.bell ?? 0);

  // ---------------- 結果 ----------------
  function finish(killed) {
    if (S.phase === 'ended') return;
    const endT = killed ? S.killT : OPT.durationMs;
    S.t = endT;
    S.phase = 'ended';
    S.cast = null; S.queue = null; Arena.castEnd();
    if (S.gcdEnd != null && S.gcdEnd < S.t) { S.stats.idleMs += S.t - S.gcdEnd; S.tl.gaps.push({ from: S.gcdEnd, to: S.t, kind: 'idle' }); }
    if (S.gcdEnd == null) S.stats.idleMs = S.t;
    for (const iv of [...Object.values(S.tl.buffs), S.tl.move]) if (iv.length && iv[iv.length - 1].to == null) iv[iv.length - 1].to = S.t;
    if (killed) ev('撃破', { note: `撃破時間 ${fmt(endT)}` });
    OPT.lastDamage = S.dmg;
    save();
    const R = buildReport(killed, endT);
    window.MockResult.show($('result'), R, { onRetry: start, onClose: () => { $('result').hidden = true; }, scale: stageScale });
    addLog('sys', killed ? `撃破（${fmt(endT)}）` : '戦闘終了');
  }

  function buildReport(killed, endT) {
    const st = S.stats, dur = Math.max(1, endT);
    const pct = (ms) => (ms / dur) * 100;
    const sec = (ms) => `${(ms / 1000).toFixed(1)} 秒`;
    const num = (v) => Math.round(v).toLocaleString('ja-JP');
    const lossMs = st.idleMs + st.clipMs + st.cutMs;
    const gcdPct = Math.max(0, (1 - lossMs / dur) * 100);
    const up = (k) => Math.min(100, pct(st.uptime[k]));
    const buffPct = TRACKED.length ? TRACKED.reduce((x, k) => x + up(k), 0) / TRACKED.length : 100;
    const comboPct = Math.max(0, 100 - st.comboBreaks * 10);
    const JR = J.report(S); // ジョブの指標（剣気のあふれ・リリーのあふれなど）
    const overPct = JR.overPct;
    const posN = st.pos.rear.n + st.pos.flank.n, posOk = st.pos.rear.ok + st.pos.flank.ok;
    // 方向指定のないジョブ: 回復役はその枠でタンクの守り（戦闘不能・HP 30% 未満の時間）を見る（重みは仮）
    const tankAvg = ROLE === 'healer' ? (st.tankHpSum / dur) * 100 : null;
    const carePct = ROLE === 'healer' ? Math.max(0, 100 - st.tankDowns * 40 - pct(st.tankLowMs) * 2) : null;
    const posPct = carePct ?? (posN ? (posOk / posN) * 100 : 100);
    const dodgePct = OPT.mech === 'off' ? 100 : Math.max(0, 100 - st.hits * 15 - st.downs * 25);
    const moveGcdPct = st.movingMs > 1000 ? Math.max(0, (1 - st.movingIdleMs / st.movingMs) * 100) : null;
    // モックの採点（重みは仮。本実装は docs/SPEC.md §7）
    const score = Math.round(gcdPct * 0.4 + buffPct * 0.15 + comboPct * 0.1 + posPct * 0.15 + dodgePct * 0.1 + overPct * 0.1);
    const grade = score >= 95 ? 'S' : score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : 'D';
    const frac = (o) => (o.n ? `${o.ok}/${o.n}` : '—');
    const dps = S.dmg / (dur / 1000), pps = S.pot / (dur / 1000);

    // 直すと良いところ（点数への影響が大きい順）
    const issues = [];
    const add = (loss, r, title, advice) => issues.push({ loss, rate: r, title, advice });
    if (gcdPct < 98) add((100 - gcdPct) * 0.4, gcdPct < 90 ? 'bad' : 'ok', `GCD が合計 ${sec(lossMs)} 止まった`, `止まり ${sec(st.idleMs)}・クリップ ${sec(st.clipMs)}・詠唱中断 ${sec(st.cutMs)}。GCD が戻ったらすぐ次の GCD、アビリティは GCD の間に 2 つまで`);
    if (posN && posOk < posN) add((100 - posPct) * 0.15, posPct < 80 ? 'bad' : 'ok', `方向指定ミス ${posN - posOk} 回`, `背面 ${frac(st.pos.rear)}・側面 ${frac(st.pos.flank)}。${JR.posAdvice}`);
    if (st.hits) add(Math.min(100, st.hits * 15 + st.downs * 25) * 0.1, st.downs ? 'bad' : 'ok', `被弾 ${st.hits} 回${st.downs ? `（戦闘不能 ${st.downs} 回）` : ''}`, '予兆が出たらすぐ範囲の外へ。ウェポンスキルを押した直後に動くと GCD が止まりにくい');
    for (const [name, k, , advice] of J.tracked) {
      const u = up(k);
      if (u < 90) add(((100 - u) / TRACKED.length) * 0.15, u < 75 ? 'bad' : 'ok', `${name}の維持 ${u.toFixed(1)}%`, advice);
    }
    for (const it of JR.issues) issues.push(it);
    if (st.comboBreaks) add(Math.min(100, st.comboBreaks * 10) * 0.1, st.comboBreaks > 2 ? 'bad' : 'ok', `コンボ切れ ${st.comboBreaks} 回`, JR.comboAdvice ?? '光っている技を順に');
    if (st.interrupts) add(st.interrupts * 3, 'ok', `詠唱の中断 ${st.interrupts} 回`, `${JR.castAdvice}（残り ${POLICY.slideMs / 1000} 秒からは動いても完了。仮）`);
    if (st.outRangeMs > 3000) add(pct(st.outRangeMs) * 0.3, pct(st.outRangeMs) > 10 ? 'bad' : 'ok', `射程外にいた時間 ${sec(st.outRangeMs)}`, JR.rangeAdvice);
    if (st.whiffs) add(st.whiffs * 2, 'ok', `空振り ${st.whiffs} 回`, '自分中心の範囲技は、敵の輪に届く距離で');
    if (ROLE === 'healer' && st.tankDowns) add(st.tankDowns * 40 * 0.15, 'bad', `タンクの戦闘不能 ${st.tankDowns} 回`, 'タンクの HP が半分を切ったら回復。リリー（ハート・オブ・ソラス）やテトラグラマトンなど詠唱のない回復は、動きながらでも使える');
    else if (ROLE === 'healer' && st.tankLowMs > 3000) add(pct(st.tankLowMs) * 2 * 0.15, 'ok', `タンクの HP が 30% を切っていた時間 ${sec(st.tankLowMs)}`, '早めに回復する（リジェネを切らさない）');
    issues.sort((x, y) => y.loss - x.loss);
    const goods = [];
    if (gcdPct >= 97) goods.push(`GCD 稼働率 ${gcdPct.toFixed(1)}%`);
    if (posN && posPct === 100) goods.push(`方向指定 ${posN} 回すべて成功`);
    if (OPT.mech !== 'off' && !st.hits) goods.push('敵の範囲攻撃をすべてよけた');
    if (moveGcdPct != null && moveGcdPct >= 95) goods.push(`移動中も GCD を ${moveGcdPct.toFixed(1)}% 維持`);
    if (ROLE === 'healer' && !st.tankDowns && tankAvg >= 60) goods.push(`タンクを最後まで守った（HP 平均 ${tankAvg.toFixed(0)}%）`);
    for (const g of JR.goods) goods.push(g);
    if (killed) goods.unshift(`${fmt(endT)} で撃破`);

    // 大事な数字 4 つ
    const big = [
      { label: 'GCD 稼働率', value: `${gcdPct.toFixed(1)}%`, rate: gcdPct, sub: `止まった時間 ${sec(lossMs)}` },
      ROLE === 'healer'
        ? { label: 'タンクの HP', value: `平均 ${tankAvg.toFixed(0)}%`, rate: carePct, sub: `戦闘不能 ${st.tankDowns} 回・30% 未満 ${sec(st.tankLowMs)}` }
        : { label: '方向指定', value: posN ? `${posOk}/${posN}` : '—', rate: posN ? posPct : null, sub: posN ? `背面 ${frac(st.pos.rear)}・側面 ${frac(st.pos.flank)}` : 'このジョブは方向指定なし' },
      { label: '被弾', value: OPT.mech === 'off' ? '—' : `${st.hits} 回`, rate: OPT.mech === 'off' ? null : dodgePct, sub: OPT.mech === 'off' ? '敵の攻撃なし' : `戦闘不能 ${st.downs} 回` },
      S.hpMax > 0
        ? { label: killed ? '撃破時間' : '敵の残り HP', value: killed ? fmt(endT).replace(/^0/, '') : `${((S.hp / S.hpMax) * 100).toFixed(1)}%`, rate: killed ? 100 : 100 - (S.hp / S.hpMax) * 100, sub: `与ダメージ ${num(S.dmg)}・毎秒 ${num(dps)}` }
        : { label: '与ダメージ', value: num(S.dmg), rate: null, sub: `毎秒 ${num(dps)}（威力 ${num(pps)}/秒）` },
    ];
    const metrics = [
      { label: 'GCD 稼働率', value: `${gcdPct.toFixed(1)}%`, rate: gcdPct },
      { label: 'GCD の回数', value: `${st.gcds} 回`, rate: null },
      ...(ROLE === 'healer' ? [{ label: 'タンクの HP（平均）', value: `${tankAvg.toFixed(1)}%`, rate: tankAvg }, { label: 'タンクの戦闘不能', value: `${st.tankDowns} 回`, rate: carePct }] : []),
      { label: '止まり / クリップ / 詠唱中断', value: `${sec(st.idleMs)} / ${sec(st.clipMs)} / ${sec(st.cutMs)}`, rate: 100 - pct(lossMs) * 4 },
      { label: '方向指定（背面）', value: frac(st.pos.rear), rate: st.pos.rear.n ? (st.pos.rear.ok / st.pos.rear.n) * 100 : null },
      { label: '方向指定（側面）', value: frac(st.pos.flank), rate: st.pos.flank.n ? (st.pos.flank.ok / st.pos.flank.n) * 100 : null },
      ...J.tracked.map(([name, k]) => ({ label: `${name}の維持`, value: `${up(k).toFixed(1)}%`, rate: up(k) })),
      { label: 'コンボ切れ', value: `${st.comboBreaks} 回`, rate: comboPct },
      ...JR.metrics,
      { label: '被弾 / 戦闘不能', value: OPT.mech === 'off' ? '敵の攻撃なし' : `${st.hits} 回 / ${st.downs} 回`, rate: OPT.mech === 'off' ? null : dodgePct },
      { label: '移動中の GCD 稼働率', value: moveGcdPct == null ? 'ほぼ移動なし' : `${moveGcdPct.toFixed(1)}%（移動 ${sec(st.movingMs)}）`, rate: moveGcdPct },
      { label: '射程外にいた時間', value: sec(st.outRangeMs), rate: 100 - pct(st.outRangeMs) * 3 },
      { label: '詠唱の中断', value: `${st.interrupts} 回`, rate: 100 - st.interrupts * 20 },
      { label: '空振り', value: `${st.whiffs} 回`, rate: st.whiffs ? 80 : 100 },
      { label: '受け付けなかった入力', value: `${st.rejected} 回（うち射程外 ${st.outOfRange}）`, rate: null },
      { label: '与ダメージ', value: `${num(S.dmg)}（威力の合計 ${num(S.pot)}）`, rate: null },
      { label: '毎秒のダメージ / 威力', value: `${num(dps)} / ${num(pps)}`, rate: null },
    ];
    if (S.hpMax > 0) metrics.push({ label: '敵の体力', value: killed ? `${num(S.hpMax)}（${fmt(endT)} で撃破）` : `${num(S.hp)} / ${num(S.hpMax)} 残り`, rate: killed ? 100 : null });

    // 使ったアクション（回数・与ダメージ）
    const uses = new Map();
    for (const e of S.events) {
      if (e.kind !== '使用' && e.kind !== '継続ダメージ') continue;
      const id = Object.values(A).find((x) => x.name === e.action)?.id;
      if (!id) continue;
      const u = uses.get(id) ?? { id, name: A[id].name, icon: A[id].icon, n: 0, dmg: 0 };
      if (e.kind === '使用') u.n++;
      u.dmg += Number(e.dmg) || 0;
      uses.set(id, u);
    }
    // ミスの一覧とタイムラインの印
    const KIND = { 止まり: 'idle', クリップ: 'clip', 詠唱中断: 'cut', 方向指定ミス: 'pos', 被弾: 'hit', 戦闘不能: 'hit', コンボ切れ: 'combo', あふれ: 'over', 効果切れ: 'buff', 射程外: 'range' };
    const misses = [];
    for (const e of S.events) {
      // 小さな止まり・クリップ（0.5 秒・0.2 秒未満）は一覧に出さない（合計には含む）
      if (e.gapMs != null && e.gapMs < (e.result === '止まり' ? 500 : 200)) continue;
      if (e.kind === 'ミス' || (e.kind === '受け付けず' && e.result === '射程外')) {
        misses.push({ t: e.t, kind: KIND[e.result] ?? 'other', label: e.result || e.kind, text: [e.action, e.note].filter(Boolean).join(' — ') });
      }
    }
    const markColor = { pos: '#ff6a5a', hit: '#ff4a6a', combo: '#ffb05a', over: '#ff9a5a', buff: '#e8c77a', range: '#9ab0ff', cut: '#b77cff' };
    const tl = {
      dur,
      gcd: S.tl.gcd.map((g) => ({ t: g.t, end: Math.min(g.end, dur), cut: !!g.cut, color: J.gcdColor(g.id) ?? '#7d9bc9' })),
      gaps: S.tl.gaps.filter((g) => g.to - g.from > 20),
      ogcd: S.tl.ogcd.map((o) => ({ t: o.t, hot: J.hotOgcd(o.id) })),
      buffs: J.tracked.map(([name, k, color]) => ({ name, color, iv: S.tl.buffs[k].map((iv) => ({ from: iv.from, to: iv.to ?? dur })) })),
      marks: misses.filter((m) => !['idle', 'clip'].includes(m.kind)).map((m) => ({ t: m.t, color: markColor[m.kind] })),
      all: [
        ...S.events.filter((e) => e.kind === '使用').map((e) => ({ t: e.t, kind: 'use', text: `${e.action}${e.dmg ? `  ${Number(e.dmg).toLocaleString('ja-JP')}` : ''}` })),
        ...misses.map((m) => ({ t: m.t, kind: 'miss', text: `${m.label}: ${m.text}` })),
      ].sort((x, y) => x.t - y.t),
    };

    const now = new Date();
    const stamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;
    const MECH_JA2 = { off: 'なし', easy: '少なめ', normal: 'ふつう', hard: '多め' };
    const TANK_JA = { good: '上手', normal: 'ふつう', bad: '下手' };
    const settings = [
      ['時間', `${OPT.durationMs / 1000} 秒`], ['敵の範囲攻撃', MECH_JA2[OPT.mech]],
      ROLE === 'tank' ? ['タンク', 'あなた（相方はヒーラー）'] : ['タンク', Arena.hasNpc() ? `いる（${TANK_JA[OPT.tankSkill] ?? ''}）` : 'いない'],
      ['敵の体力', S.hpMax > 0 ? num(S.hpMax) : '無限（木人）'], ['技の並び（種）', OPT.seed],
    ];
    const summary = [
      ['ジョブ', `${D.job.name} Lv${D.job.level}`], ['日時', now.toLocaleString('ja-JP')], ...settings,
      ['総合点', score], ['ランク', grade], ['終了', killed ? `撃破 ${fmt(endT)}` : `時間切れ ${fmt(endT)}`],
      ...metrics.map((m) => [m.label, m.value]),
    ];
    return {
      jobIcon: D.job.icon,
      subtitle: `${D.job.name} Lv${D.job.level}・${settings.map(([k, v]) => `${k} ${v}`).join('・')}`,
      grade, score, endLabel: killed ? `${fmt(endT)} で撃破` : `${fmt(endT)} まで`,
      big, issues, goods, metrics, uses: [...uses.values()].sort((x, y) => y.n - x.n || y.dmg - x.dmg), misses, tl,
      events: S.events, summary, gaugeCols: J.gaugeCols.map(([h]) => h), fileName: `ff14-rotation-${D.job.abbr}-${stamp}.csv`,
      note: `採点の重みは仮です（GCD 40% / バフ・DoT 15% / ${ROLE === 'healer' ? 'タンクの守り' : '方向指定'} 15% / コンボ 10% / 回避 10% / あふれ 10%）。ダメージは説明文の威力 × 与ダメージ上昇 × 係数で、クリティカルなどは入れていません。移動速度・射程・方向指定の角度・回復量の換算などは仮の値です（設定 → 練習）。`,
    };
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
  const Gauge = J.gaugeUI(D);
  const gaugeBoxes = Gauge.windows.map((w) => {
    const box = document.createElement('div');
    box.className = 'gauge-win';
    box.title = w.label;
    box.appendChild(w.el);
    $('gauges').appendChild(box);
    return { w, box };
  });
  // ADDON.DAT に配置が見つからないときの置き場所（仮）
  const GAUGE_DEFAULT = J.gaugeDefault;
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

  // ---- HUD の部品を ADDON.DAT の位置に置く（部品は識別値で特定: cfg-parse.js の HUD_KINDS）----
  // 各部品はゲームと同じ等倍の大きさ（1080p・HUD 100% の px）で組み、倍率は zoom で掛ける（小さくしても文字がぼやけない）
  const hudEls = () => D.hud?.elements ?? SAMPLE.hud.elements ?? {};
  const HUD_PLACES = () => {
    const split = (VIEW.targetMode ?? 'split') === 'split';
    return [
      { el: document.querySelector('.buffs'), kind: (VIEW.statusMode ?? 'split') === 'split' ? 'statusEnh' : 'statusAll' },
      { el: $('castbar'), kind: 'castBar' },
      { el: $('param'), kind: 'parameterBar' },
      { el: document.querySelector('.target'), kind: split ? 'targetHp' : 'targetBar' },
      { el: $('bossCastBox'), kind: split ? 'targetCast' : null },
      { el: $('targetStatusBox'), kind: split ? 'targetStatus' : null },
      { el: document.querySelector('.party'), kind: 'partyList' },
    ];
  };
  function hudRectOf(p) {
    const W = STAGE.w, H = STAGE.h, k = hudK();
    const bw = p.w * p.scale * k, bh = p.h * p.scale * k;
    const [ax, ay] = ANCHOR(p.anchor);
    return { x: (p.x / 100) * W - (bw * ax) / 2, y: (p.y / 100) * H - (bh * ay) / 2, w: bw, h: bh, s: p.scale * k };
  }
  function placeHudParts() {
    // ターゲット情報: 分割なら、キャストバーとステータスをそれぞれの置き場所へ。まとめるなら窓の中へ戻す
    const split = (VIEW.targetMode ?? 'split') === 'split';
    const target = document.querySelector('.target');
    if (split) { $('bossCastBox').appendChild($('bossCast')); $('targetStatusBox').appendChild($('targetStatus')); }
    else { target.insertBefore($('bossCast'), $('mechAlert')); target.appendChild($('targetStatus')); }
    const els = hudEls();
    for (const { el, kind } of HUD_PLACES()) {
      const p = kind ? els[kind] : null;
      el.classList.toggle('placed', !!p);
      el.style.cssText = '';
      if (!p) continue;
      const r = hudRectOf(p);
      // zoom を掛けた要素の left / top も zoom 倍されるので、倍率で割っておく
      Object.assign(el.style, { zoom: String(r.s), left: `${r.x / r.s}px`, top: `${r.y / r.s}px`, width: `${p.w}px`, height: `${p.h}px` });
      el.dataset.kind = kind;
    }
    // 枠の表示（どの部品がどこか確かめる用）
    const fr = $('hudFrames');
    fr.hidden = !VIEW.showHudFrames;
    fr.innerHTML = '';
    if (VIEW.showHudFrames) {
      const used = new Set(HUD_PLACES().map((x) => x.kind).filter(Boolean));
      const all = [...Object.entries(els), ...Object.entries(D.hud?.gauges ?? {}).map(([k, v]) => [k, { ...v, visible: true }])];
      for (const [kind, rec] of all) {
        if (!rec.visible && !used.has(kind)) continue;
        const r = hudRectOf(rec);
        const d = document.createElement('div');
        d.className = `hud-frame${used.has(kind) ? ' used' : ''}`;
        Object.assign(d.style, { left: `${r.x}px`, top: `${r.y}px`, width: `${r.w}px`, height: `${r.h}px` });
        d.textContent = rec.name ?? kind;
        fr.appendChild(d);
      }
    }
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
    if (a.comboFrom.length && S.chain != null && S.t <= S.chainUntil && a.comboFrom.includes(S.chain)) return true;
    const st = J.procStatus[a.proc];
    if (st && has(st)) return J.highlightOk(id, st);
    return !!J.glow?.(id); // ジョブの決まりで光るもの（ナイトのホーリースピリットなど）
  }
  // 方向指定のガイド: 次に使う（光っている）方向指定の技の向き。明鏡止水中はまだ持っていない閃の技
  function guideNeed() {
    if (!OPT.guide || !live()) return null;
    return J.guide(highlight);
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
      if (ownCd(a) != null && !(active && J.freeUse?.(id))) {
        const ch = charges(a), m = maxCh(a);
        if (ch < m) {
          const full = S.cds[ownCd(a)];
          const next = (full - S.t) % a.recastMs || a.recastMs;
          if (ch === 0) { frac = Math.max(frac, next / a.recastMs); num = Math.ceil(next / 1000); }
        }
        r.chg.textContent = m > 1 ? ch : '';
      }
      r.cd.style.background = frac > 0 ? `conic-gradient(transparent 0 ${(1 - frac) * 360}deg, rgba(0,0,0,.7) 0)` : 'none';
      r.el.classList.toggle('cooling', frac > 0); // リキャスト中はアイコン全体も少し暗く
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

    // 敵の体力
    const hpFrac = S.hpMax > 0 ? S.hp / S.hpMax : 1;
    $('bossHpFill').style.width = `${hpFrac * 100}%`;
    $('bossHpText').textContent = S.hpMax > 0 ? `${Math.ceil(S.hp).toLocaleString('ja-JP')}（${(hpFrac * 100).toFixed(1)}%）` : S.dmg > 0 ? `与ダメージ ${S.dmg.toLocaleString('ja-JP')}` : '100%';
    // 敵の詠唱
    const bc = S.phase === 'combat' ? Arena.bossCast(S.t) : null;
    $('bossCast').hidden = !bc;
    if (bc) { $('bossCastName').textContent = bc.name; $('bossCastFill').style.width = `${bc.p * 100}%`; }
    const mech = S.mech && S.t < S.mech.until && OPT.hints ? S.mech : null;
    $('mechAlert').hidden = !mech;
    if (mech) { $('mechName').textContent = mech.name; $('mechHint').textContent = mech.hint ?? ''; }

    // パーティリスト・HP バー
    const hp = Arena.hp(), down = Arena.isDown();
    $('pmHp').style.width = `${hp * 100}%`;
    $('pmHpV').textContent = down ? '戦闘不能' : `${Math.round(hp * 100)}%`;
    $('param').classList.toggle('low', hp < 0.35);
    $('ptSelfHp').style.width = `${hp * 100}%`;
    $('ptSelfNum').textContent = down ? '戦闘不能' : String(Math.round(hp * 100));
    $('ptSelf').classList.toggle('low', hp < 0.35);
    $('ptSelf').classList.toggle('down', down);
    $('ptTank').hidden = !Arena.hasNpc();
    $('ptTank').classList.toggle('down', Arena.isNpcDown());
    const th = Arena.tankHp();
    $('ptTankHp').style.width = `${th * 100}%`;
    $('ptTankNum').textContent = Arena.isNpcDown() ? '戦闘不能' : String(Math.round(th * 100));
    $('ptTank').classList.toggle('low', th < 0.35 && !Arena.isNpcDown());

    Arena.setGuide(guideNeed());
  }

  // ---------------- 演出・ツールチップ ----------------
  // 範囲の形はゲームデータ（castType: 1 単体 / 2 自分の周囲 / 3 前方扇 / 4 前方直線）、敵に使えるか（canTargetHostile）から決める
  function fxFor(id, ok) {
    const a = A[id];
    // 自分にかけるもの: 敵を対象にできず、範囲でもない（自分の周囲の範囲攻撃も敵を対象にしないため、形で見分ける）
    // 回復・バリアの技: 自分の光ではなく、相手の足元に回復の光（healNow）。詠唱の動きだけ
    if (!a.hostile && (a.eff?.heal != null || a.eff?.hot || /バリア/.test(a.desc ?? '')) && a.shape !== 7) return { kind: 'heal', color: 'heal', name: a.name };
    if (!a.hostile && a.shape <= 1) return { kind: 'buff', color: J.fxColor(id) === 'steel' ? 'buff' : J.fxColor(id), name: a.name };
    // 地面に置く技（castType 7）: 置いたものの演出は練習場が出す（アサイラム・リタージー・オブ・ベルなど）
    if (a.shape === 7 && !a.hostile) return { kind: 'place', color: J.fxColor(id), name: a.name };
    const color = J.fxColor(id);
    // 魔法（種類 2）は、敵の頭上からの光（spell）。射程の長い単体の技は飛び道具
    const kind = a.shape === 2 ? 'circle' : a.shape === 3 ? 'cone' : a.shape === 4 ? 'line'
      : a.dash ? 'dash' : a.category === 2 ? 'spell' : a.range >= 15 ? 'projectile' : 'slash';
    const power = J.fxPower(id, a, ok);
    return { kind, color, crit: a.crit, power, count: J.fxCount(id), name: a.name, combo: ok && a.comboFrom.length > 0, range: a.effectRange || a.range };
  }
  function playFx(id, ok, pos, hit, dmg) {
    const info = fxFor(id, ok);
    if (!hit) { Arena.flyText('空振り', 'miss'); Au?.slash(0.6); return; }
    if (pos) info.pos = pos;
    if (dmg) info.dmg = dmg;
    Arena.play(info);
    if (!Au) return;
    J.sfx(id, info, Au); // 効果音はジョブごと（侍: 居合術は抜刀、剣気の技は赤い閃光、閃の締めは色ごとの鈴）
  }
  function pressFx(el) { el.classList.add('pressed'); setTimeout(() => el.classList.remove('pressed'), 90); }
  function showTip(el, id) {
    const a = A[id];
    if (!a) return;
    const tip = $('tooltip');
    const kind = a.category === 2 ? '魔法' : a.isGcd ? 'ウェポンスキル' : 'アビリティ';
    const sec = (ms) => (ms ? `${(ms / 1000).toFixed(2)}秒` : '即時');
    const rg = rangeOf(a);
    const area = a.shape === 2 && a.effectRange ? `自分の周囲 ${a.effectRange}m` : a.shape === 3 ? `前方扇 ${a.effectRange}m` : a.shape === 4 ? `直線 ${a.effectRange}m` : '';
    tip.innerHTML = `<div class="tt-head"><img alt=""><div><b></b><div class="kind"></div></div></div><div class="meta"></div><div class="body"></div><div class="hl-note"></div>`;
    tip.querySelector('img').src = a.icon;
    tip.querySelector('b').textContent = a.name;
    tip.querySelector('.kind').textContent = kind + (a.forJob ? '' : '（このジョブでは使えません）');
    const tipCast = J.tipCastMs?.(a);
    tip.querySelector('.meta').innerHTML = `<span>詠唱時間<b>${sec(tipCast ?? a.castMs)}${tipCast != null ? '（特性・仮）' : ''}</b></span><span>リキャスト<b>${sec(a.recastMs)}</b></span>${maxCh(a) > 1 ? `<span>チャージ<b>${maxCh(a)}</b></span>` : ''}${J.tipCost(id) ? `<span>${J.tipCost(id)[0]}<b>${J.tipCost(id)[1]}</b></span>` : ''}${rg != null ? `<span>射程<b>${rg}m${a.range === -1 ? '（近接・仮）' : ''}</b></span>` : ''}${area ? `<span>範囲<b>${area}</b></span>` : ''}`;
    tip.querySelector('.body').textContent = a.desc;
    const notes = [];
    if (a.comboFrom.length) notes.push(`光る: ${a.comboFrom.map((c) => A[c]?.name ?? D.known[c]?.[0]).filter(Boolean).join(' / ')} の直後（コンボ）`);
    if (J.procStatus[a.proc]) notes.push(`光る: 「${STATUS[J.procStatus[a.proc]].name}」の間`);
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
    addLog('sys', `カウントダウン開始（${D.job.name}・${OPT.durationMs / 1000} 秒・敵の攻撃: ${MECH_JA[OPT.mech]}・${ROLE === 'tank' ? 'あなたがタンク' : `タンク${Arena.hasNpc() ? 'あり' : 'なし'}`}）`);
  }
  const MECH_JA = { off: 'なし', easy: '少なめ', normal: 'ふつう', hard: '多め' };

  // 移動キー（KEYBIND.DAT の MOVE_FORE など）。「前」は画面の奥（カメラの向き）。3D でカメラを回すと、向きもそれに合わせて変わる
  const held = new Set();
  const MOVE = {
    up: [...(D.move?.fore ?? [])],
    down: [...(D.move?.back ?? [])],
    left: [...(D.move?.left ?? []), ...(D.move?.strafeL ?? [])],
    right: [...(D.move?.right ?? []), ...(D.move?.strafeR ?? [])],
  };
  const ARROWS = { up: 'ArrowUp', down: 'ArrowDown', left: 'ArrowLeft', right: 'ArrowRight' };
  // 矢印キーでの移動: カメラ操作に割り当てられた矢印（サンプルは ←→）は除く
  const arrowMoves = () => (OPT.arrows ? Object.values(ARROWS).filter((c) => !camCodes().has(c)) : []);
  const moveCodes = () => new Set([...MOVE.up, ...MOVE.down, ...MOVE.left, ...MOVE.right, ...arrowMoves()]);
  const keyName = (code) => code.replace(/^Key/, '').replace(/^Digit/, '').replace(/^Arrow/, '').replace('Space', 'Space');
  const keyLabel = (codes) => (codes ?? []).map(keyName).join('/');
  let padMove = null;
  function moveInput() {
    const arrows = arrowMoves();
    const on = (dir) => MOVE[dir].some((c) => held.has(c)) || (arrows.includes(ARROWS[dir]) && held.has(ARROWS[dir]));
    let x = (on('right') ? 1 : 0) - (on('left') ? 1 : 0);
    let y = (on('down') ? 1 : 0) - (on('up') ? 1 : 0);
    if (padMove) { x += padMove.x; y += padMove.y; }
    if ((mouse.buttons & 3) === 3) y -= 1; // マウスの左右同時押しで前進（PC 版と同じ）
    Arena.setInput(live() && !paused() ? x : 0, live() && !paused() ? y : 0);
  }

  window.addEventListener('pointerdown', () => Au?.unlock(), { once: true });
  window.addEventListener('keydown', (e) => {
    Au?.unlock();
    GM?.guardKey(e);
    if (UI.isOpen()) { if (e.code === 'Escape') { e.preventDefault(); UI.close(); } return; }
    const tag = e.target?.tagName;
    if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return;
    const kid = keyId({ code: e.code, shift: e.shiftKey, ctrl: e.ctrlKey, alt: e.altKey });
    const camAct = !keymap.has(kid) && camKeyOf(e);
    if (camAct) {
      e.preventDefault();
      if (camAct === 'reset') { if (!e.repeat) Arena.camera.reset('behind'); } else camHeld.set(e.code, camAct);
      return;
    }
    if (moveCodes().has(e.code) && !keymap.has(kid)) {
      e.preventDefault(); held.add(e.code);
      return;
    }
    if (D.move?.jump?.includes(e.code) && live()) { e.preventDefault(); if (!e.repeat && !paused()) { Arena.jump(); Au?.whoosh(); } return; }
    if (e.code === 'Space') { e.preventDefault(); if (!e.repeat && !live()) start(); return; }
    if (e.code === 'Escape') { if (aiming) { cancelAim('置くのをやめました'); return; } reset(); return; }
    const hit = keymap.get(keyId({ code: e.code, shift: e.shiftKey, ctrl: e.ctrlKey, alt: e.altKey }));
    if (hit) {
      e.preventDefault();
      if (e.repeat) return; // 押しっぱなしでは連打にならない（実機に合わせる: GAME-05 不確か）
      if (hit.el) pressFx(hit.el);
      press(hit.base);
    }
  });
  window.addEventListener('keyup', (e) => { held.delete(e.code); camHeld.delete(e.code); });
  window.addEventListener('blur', () => { held.clear(); camHeld.clear(); mouse.buttons = 0; });

  // ---------------- カメラ（3D のとき）----------------
  // マウス: 左ドラッグ・右ドラッグで回す、左右同時押しで前進、ホイールで近づける・離す（PC 版 FF14 と同じ）。
  // キーボード: KEYBIND.DAT のカメラ操作（サンプルは ←→ で左右、Ctrl+↑↓ で上下、Ctrl+Shift+End で自分の後ろへ）。パッド: 右スティック
  const CAM_RATE = { yaw: 2.4, pitch: 45, zoom: 1.9 }; // キー・スティックでの速さ（ラジアン/秒・度/秒・倍/秒）
  const camBinds = () => IMPORTED?.camera ?? D.camera ?? {};
  const camCodes = () => new Set(Object.values(camBinds()).flat().filter((b) => !b.shift && !b.ctrl && !b.alt).map((b) => b.code));
  function camKeyOf(e) {
    for (const [act, binds] of Object.entries(camBinds())) {
      if (binds.some((b) => b.code === e.code && b.shift === e.shiftKey && b.ctrl === e.ctrlKey && b.alt === e.altKey)) return act;
    }
    return null;
  }
  const camHeld = new Map();
  const mouse = { buttons: 0 };
  let padLook = null;
  const camSign = () => ({ x: OPT.camInvX ? -1 : 1, y: OPT.camInvY ? -1 : 1 });
  function cameraInput(dtMs) {
    const dt = dtMs / 1000, k = OPT.camSpeed, sg = camSign();
    let yaw = 0, pitch = 0, zoom = 0;
    for (const act of camHeld.values()) {
      if (act === 'left') yaw -= 1; else if (act === 'right') yaw += 1;
      else if (act === 'up') pitch -= 1; else if (act === 'down') pitch += 1;
      else if (act === 'zoomIn') zoom -= 1; else if (act === 'zoomOut') zoom += 1;
    }
    if (padLook) { yaw += padLook.x; pitch += padLook.y; }
    if (yaw || pitch) Arena.camera.rotate(yaw * CAM_RATE.yaw * k * dt * sg.x, pitch * CAM_RATE.pitch * k * dt * sg.y);
    if (zoom) Arena.camera.zoom(Math.pow(CAM_RATE.zoom, zoom * dt));
  }
  // マウスの位置（舞台の px。地面指定のターゲットサークルに使う）
  window.addEventListener('pointermove', (e) => {
    const r = stage.getBoundingClientRect();
    mousePos = { x: ((e.clientX - r.left) / r.width) * STAGE.w, y: ((e.clientY - r.top) / r.height) * STAGE.h };
  });
  for (const cv of [$('arena'), $('arena3d')]) {
    cv.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'mouse') return;
      Au?.unlock();
      if (aiming) { e.preventDefault(); if (e.button === 0) confirmAim(); else cancelAim('置くのをやめました'); return; }
      mouse.buttons = e.buttons;
      cv.setPointerCapture(e.pointerId);
      cv.classList.add('dragging');
      e.preventDefault();
    });
    cv.addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse' || !mouse.buttons) return;
      mouse.buttons = e.buttons; // 2 つ目のボタンは pointerdown ではなく pointermove で届く
      if (!e.buttons) { cv.classList.remove('dragging'); return; }
      if (paused()) return;
      const k = OPT.camSpeed, sg = camSign();
      Arena.camera.rotate(e.movementX * 0.0058 * k * sg.x, e.movementY * 0.26 * k * sg.y);
    });
    const up = (e) => { mouse.buttons = e.buttons; if (!e.buttons) { cv.classList.remove('dragging'); if (cv.hasPointerCapture(e.pointerId)) cv.releasePointerCapture(e.pointerId); } };
    cv.addEventListener('pointerup', up);
    cv.addEventListener('pointercancel', up);
    cv.addEventListener('contextmenu', (e) => e.preventDefault());
    cv.addEventListener('wheel', (e) => { e.preventDefault(); if (!paused()) Arena.camera.zoom(Math.exp(Math.max(-200, Math.min(200, e.deltaY)) * 0.0012)); }, { passive: false });
  }
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
    if (!gp) { padMove = null; padLook = null; return; }
    // 左スティック（遊びは FFXIV.cfg の DeadArea。設定で変えられる）
    const ax = gp.axes[0] ?? 0, ay = gp.axes[1] ?? 0, m = Math.hypot(ax, ay), dz = OPT.deadzone;
    padMove = m > dz ? { x: (ax / m) * Math.min(1, (m - dz) / (1 - dz)), y: (ay / m) * Math.min(1, (m - dz) / (1 - dz)) } : null;
    // 右スティックでカメラ
    const rx = gp.axes[2] ?? 0, ry = gp.axes[3] ?? 0, rm = Math.hypot(rx, ry);
    padLook = rm > dz ? { x: (rx / rm) * Math.min(1, (rm - dz) / (1 - dz)), y: (ry / rm) * Math.min(1, (rm - dz) / (1 - dz)) } : null;
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
    if (hit) { pressFx(hit.el); press(hit.base, 'pad'); }
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
      OPT.job = JOB; // URL の ?job= で開いたときも、今のジョブを覚える
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
          // 練習できるジョブすべてのバーを読んでおく（ジョブを切り替えてもそのまま使える）
          next.hotbarSets = window.CfgParse.parseHotbar(buf, [0, ...MD.jobList.map((j) => MD.jobs[j.abbr].jobSet)]);
          next.files['HOTBAR.DAT'] = `${MD.jobList.map((j) => `${j.name} ${Object.keys(next.hotbarSets[MD.jobs[j.abbr].jobSet] ?? {}).length}`).join('・')} 本・共有 ${Object.keys(next.hotbarSets[0] ?? {}).length} 本`;
        } else if (name === 'KEYBIND.DAT') {
          const kb = window.CfgParse.parseKeybind(buf);
          next.keybind = kb.hotbar; next.move = kb.move;
          next.files['KEYBIND.DAT'] = `ホットバー ${Object.keys(kb.hotbar).length} 本分のキー・移動キー ${['fore', 'left', 'back', 'right'].map((k) => keyLabel(kb.move?.[k])).join('')}`;
        } else if (name === 'ADDON.DAT') {
          const a = window.CfgParse.parseAddon(buf);
          next.hud = {
            hotbars: a.hotbars,
            // ジョブゲージの位置は、練習できるジョブすべての分を読んでおく
            gauges: Object.assign({}, ...MD.jobList.map((j) => ({ ...window.CfgParse.findGauges(a.records, MD.jobs[j.abbr].gauge.sizes), ...window.CfgParse.jobGaugeElements(a.records, j.abbr, MD.jobs[j.abbr].gauge.sizes) }))),
            elements: window.CfgParse.hudElements(a.records),
          };
          next.files['ADDON.DAT'] = `ホットバー ${Object.keys(a.hotbars).length} 本・ジョブゲージ ${Object.keys(next.hud.gauges).length} 個・HUD の部品 ${Object.keys(next.hud.elements).length} 個の配置`;
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

  // ジョブの切り替え: ページを読み直す（技・ゲージ・ホットバーが全部変わるため）。URL に ?job= があれば書き換える
  function switchJob(abbr) {
    if (abbr === JOB || !MD.jobs[abbr]) return;
    OPT.job = abbr; save();
    const u = new URL(location.href);
    if (u.searchParams.has('job')) u.searchParams.set('job', abbr);
    location.replace(u.toString());
  }
  const jobChoice = (k) => k.choice(MD.jobList.map((j) => [j.abbr, j.name]), JOB, (v) => switchJob(v));
  // 相方の設定（近接はタンクの出し入れ、回復役は相方のタンクの腕前、タンクは固定の相方）
  function npcRows(row, k, full) {
    if (ROLE === 'melee') {
      row('タンク', k.toggle(OPT.tank, (v) => { OPT.tank = v; applyPractice(); UI.refresh(); }, ['いる', 'いない']), 'いると敵はタンクの方を向く。いないと敵があなたを追いかけ、正面を向けてきます');
    } else if (ROLE === 'tank') {
      row('相方', k.text(`ヒーラー（${NPC.name}）`), 'あなたが敵を引きつけます。敵の通常攻撃はあなたに来て、相方がときどき回復します');
    } else {
      row('相方', k.text(`タンク（${NPC.name}）`), 'タンクが敵を引きつけます。敵の通常攻撃でタンクの HP が減るので、回復してください');
    }
    if (full && ROLE !== 'tank') row('タンクの腕前', k.choice([['good', '上手'], ['normal', 'ふつう'], ['bad', '下手']], OPT.tankSkill, (v) => { OPT.tankSkill = v; applyPractice(); }), '上手: 敵の向きをほとんど変えず、範囲攻撃もすぐよける。ふつう: ときどき向きや位置を変える。下手: よく向きを変え、よけるのも遅い（方向指定の取り直しの練習）');
  }

  UI.tab('practice', '練習', (pane, k) => {
    const sj = k.section(pane, 'ジョブ', '切り替えるとページを読み直します（練習の設定・読み込んだ設定ファイルはそのまま）。');
    k.row(sj, 'ジョブ', jobChoice(k), `${D.job.name}: ${J.howto}`);
    const s0 = k.section(pane, 'ステージ', '練習用に作った場所です（ゲームの特定の場所ではありません）。形と広さが変わると、動ける範囲と敵の範囲攻撃の切れ目も変わります。');
    const stages = Arena.stages();
    k.row(s0, 'ステージ', k.choice(stages.map((st) => [st.id, st.name]), OPT.stage, (v) => { OPT.stage = v; applyPractice(); UI.refresh(); }), stages.find((st) => st.id === OPT.stage)?.note ?? '');
    const mkDef = stages.find((st) => st.id === OPT.stage)?.markers ?? false;
    k.row(s0, 'フィールドマーカー', k.toggle(OPT.markers ?? mkDef, (v) => { OPT.markers = v; applyPractice(); }), '床に A〜D・1〜4 の印を置きます（A が北）。カメラを回したときの目印になります');
    const s1 = k.section(pane, '練習の内容');
    k.row(s1, '時間', k.choice([[60000, '60 秒'], [120000, '120 秒'], [180000, '180 秒'], [300000, '300 秒']], OPT.durationMs, (v) => { OPT.durationMs = v; applyPractice(); }));
    k.row(s1, '敵の範囲攻撃', k.choice([['off', 'なし'], ['easy', '少なめ'], ['normal', 'ふつう'], ['hard', '多め']], OPT.mech, (v) => { OPT.mech = v; applyPractice(); }), '予兆（橙色の範囲）が満ちたら発動。範囲の中にいると被弾');
    npcRows((label, ctl, note) => k.row(s1, label, ctl, note), k, true);
    const hpIn = k.number(OPT.hp, 1000, 99999999, (v) => { OPT.hp = v; applyPractice(); }, 110);
    k.row(s1, '敵の体力', [k.choice([['inf', '無限（木人）'], ['set', '決める'], ['last', '前回の与ダメージ']], OPT.hpMode, (v) => { OPT.hpMode = v; applyPractice(); }), hpIn],
      `0 になると撃破して終わり、結果に撃破時間が出ます。「前回の与ダメージ」は前回 ${OPT.lastDamage ? OPT.lastDamage.toLocaleString('ja-JP') : '（まだなし）'} を体力にします（同じ回しでぴったり倒せる量）`);
    k.row(s1, 'ダメージの係数', k.number(OPT.dmgScale, 1, 1000, (v) => { OPT.dmgScale = v; applyPractice(); }, 70), 'ダメージ = 説明文の威力 × 与ダメージ上昇（風月など）× この値。1 なら威力そのまま。クリティカル・ダイレクトヒットは入れません');
    k.row(s1, '方向指定のガイド', k.toggle(OPT.guide, (v) => { OPT.guide = v; save(); }), '敵の足元に背面（緑）・側面（黄）を色分けし、次に使う方向指定の技の向きを濃くします');
    k.row(s1, '敵の技の予告', k.toggle(OPT.hints, (v) => { OPT.hints = v; save(); }), '技の名前とよけ方を、ターゲット窓の敵の詠唱バーの下に出します（ゲームにはない補助）');
    const seedIn = k.number(OPT.seed, 1, 99999, (v) => { OPT.seed = v; applyPractice(); });
    k.row(s1, '技の並び（種）', [seedIn, k.button('ランダム', () => { OPT.seed = 1 + Math.floor(Math.random() * 99999); seedIn.value = OPT.seed; applyPractice(); })], '同じ種なら毎回同じ順番・同じ時間に技が来ます');
    const s2 = k.section(pane, '判定に使う仮の値', 'ゲームデータにない値です。実機で確かめて直します（docs/SPEC.md §10 GAME-04・05・50〜55）。');
    k.row(s2, '応答の遅れ', k.choice([[0, '0ms'], [50, '50ms'], [100, '100ms'], [150, '150ms']], OPT.latency ?? 50, (v) => { OPT.latency = Number(v); save(); }), '詠唱のない技の硬直は「0.6 秒＋応答の遅れ（サーバーまでの往復と処理）」です。大きいほどアビリティを挟みにくくなります');
    const P = Arena.POL;
    for (const [label, v] of [['移動速度', `${P.run} m/秒`], ['近接の射程（射程 -1 の技）', `敵の当たり判定の外側から ${P.melee} m`], ['敵の当たり判定の半径', `${P.hitbox} m`], ['方向指定の角度', `背面 = 真後ろから ±${180 - P.rearDeg}°、正面 = ±${P.frontDeg}°、その間が側面`], ['詠唱の終わりの猶予（滑り撃ち）', `残り ${POLICY.slideMs / 1000} 秒からは動いても中断しない。効果もこの時点で決まる`], ['先行入力', `そのアクションのリキャストの残りが ${POLICY.queueMs / 1000} 秒以下なら受け付け、使えるようになった瞬間に出す。入れておけるのは 1 つで、先に押したものが優先`], ['硬直', `詠唱のない技 ${POLICY.animLockMs / 1000} 秒＋応答の遅れ・詠唱のあと ${POLICY.castLockAfterMs / 1000} 秒`], ...(ROLE !== 'melee' ? [['回復量の換算', '回復力 100 = 最大 HP の 4%（ケアル 20%・ケアルラ 32%。DESIGN-06）'], ['敵の通常攻撃', `2.8 秒ごと。${ROLE === 'tank' ? 'あなた' : 'タンク'}の HP を ${ROLE === 'tank' ? 4 : 6}% 減らす`]] : [])]) k.row(s2, label, k.text(v));
  });

  UI.tab('control', '操作', (pane, k) => {
    const s1 = k.section(pane, '移動（KEYBIND.DAT）', '「前」は画面の奥（カメラの向き）です。カメラを回すと、移動の向きもそれに合わせて変わります（ゲームの「レガシー」に近い動き）。移動した方向を向き、攻撃すると敵の方を向きます。');
    for (const [label, dir] of [['前へ', 'up'], ['後ろへ', 'down'], ['左へ', 'left'], ['右へ', 'right']]) k.row(s1, label, MOVE[dir].length ? MOVE[dir].map((c) => k.keycap(keyName(c))) : k.text('割り当てなし'));
    k.row(s1, 'ジャンプ', (D.move?.jump ?? []).length ? D.move.jump.map((c) => k.keycap(keyName(c))) : k.text('割り当てなし'), '開始前の Space は「開始」になります');
    k.row(s1, '矢印キーでも移動', k.toggle(OPT.arrows, (v) => { OPT.arrows = v; save(); }), 'ホットバーとカメラ操作に割り当てたキーが優先です');
    const sc = k.section(pane, 'カメラ（3D のとき）', 'PC 版 FF14 と同じく、マウスのドラッグで回し、ホイールで近づける・離します。キーは KEYBIND.DAT のカメラ操作のとおりです。');
    k.row(sc, 'マウス', k.text('左ドラッグ・右ドラッグで回す / 左右のボタンを同時に押すと前進 / ホイールで近づける・離す'));
    const CAM_JA = [['left', '左に回す'], ['right', '右に回す'], ['up', '上に傾ける'], ['down', '下に傾ける'], ['zoomIn', '近づける'], ['zoomOut', '離す'], ['reset', '自分の後ろへ戻す']];
    const combo = (b) => [b.ctrl && 'Ctrl', b.shift && 'Shift', b.alt && 'Alt', keyName(b.code)].filter(Boolean).join('+');
    for (const [act, label] of CAM_JA) { const bs = camBinds()[act] ?? []; if (bs.length) k.row(sc, label, bs.map((b) => k.keycap(combo(b)))); }
    k.row(sc, 'パッド', k.text('右スティックで回す'));
    k.row(sc, '回す速さ', k.range(0.3, 2.5, 0.1, OPT.camSpeed, (v) => { OPT.camSpeed = v; save(); }, (v) => `${Math.round(v * 100)}%`));
    k.row(sc, '反転', [k.toggle(OPT.camInvX, (v) => { OPT.camInvX = v; save(); }, ['左右を反転', '左右そのまま']), k.toggle(OPT.camInvY, (v) => { OPT.camInvY = v; save(); }, ['上下を反転', '上下そのまま'])]);
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
    const s4 = k.section(pane, 'HUD の部品（ADDON.DAT）', `HUD レイアウトで動かせる部品（ゲームの HUD シートの 112 種）のうち、この設定ファイルで見つかったもの ${Object.keys(hudEls()).length} 個を、識別値で特定して置いています。ステータス情報とターゲット情報は、ゲームで分割表示にしているかどうかが設定ファイルから分からないため、ここで選んでください。`);
    k.row(s4, 'ステータス情報（自分のバフ）', k.choice([['split', '分割（強化・弱体…）'], ['all', 'まとめる']], VIEW.statusMode ?? 'split', (v) => { VIEW.statusMode = v; save(); placeHudParts(); }), '分割なら「ステータス情報（強化）」の位置、まとめるなら「ステータス情報」の位置');
    k.row(s4, 'ターゲット情報', k.choice([['split', '分割（HP・キャストバー・ステータス）'], ['all', 'まとめる']], VIEW.targetMode ?? 'split', (v) => { VIEW.targetMode = v; save(); placeHudParts(); }));
    k.row(s4, '枠を表示', k.toggle(!!VIEW.showHudFrames, (v) => { VIEW.showHudFrames = v; save(); placeHudParts(); }), '設定を閉じると、表示中の HUD の部品の枠と名前が画面に出ます（使っている部品は金色）');
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
    const s0 = k.section(pane, '練習場の表示', Arena.error3d() ? `この環境では 3D で表示できません（${Arena.error3d()}）。予備の真上の 2D で表示しています。` : '床と明かりを立体で描き、人物はドット絵の板で立たせます（カメラを回せます）。');
    k.row(s0, '画質', k.choice([['high', '高'], ['mid', '標準'], ['low', '軽い']], VIEW.quality ?? 'high', (v) => { VIEW.quality = v; Arena.setView('3d', v); save(); }), '高: 光のにじみ・ピントのぼかし・周辺減光あり。標準: ぼかしなし・解像度を少し下げる。軽い: 後処理なし');
    k.row(s0, 'カメラ', k.button('北が上に戻す', () => Arena.camera.reset('north')), 'カメラの向き・角度・距離を初期に戻します');
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
    k.row(s1, '試しに鳴らす（技）', [
      k.button('斬撃', () => { Au?.slash(1); Au?.hit(1); }), k.button('雪', () => { Au?.slash(1.15); Au?.finisher('setsu'); Au?.hit(1.15); }),
      k.button('月', () => { Au?.slash(1.15); Au?.finisher('getsu'); Au?.hit(1.15); }), k.button('花', () => { Au?.slash(1.15); Au?.finisher('ka'); Au?.hit(1.15); }),
      k.button('居合術', () => { Au?.cast(1300); setTimeout(() => Au?.iai(3), 1300); }), k.button('剣気', () => { Au?.kenki(); Au?.slash(1.25); Au?.hit(1.25); }),
      k.button('明鏡止水', () => Au?.water()), k.button('意気衝天', () => Au?.surge()),
    ]);
    k.row(s1, '試しに鳴らす（ほか）', [
      k.button('予兆', () => Au?.warn()), k.button('範囲攻撃', () => Au?.boom(1)), k.button('被弾', () => Au?.hurt()),
      k.button('開始', () => Au?.go()), k.button('撃破', () => Au?.kill()), k.button('使えない', () => Au?.error()),
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
    row('ジョブ', jobChoice(k));
    row('敵の範囲攻撃', k.choice([['off', 'なし'], ['easy', '少なめ'], ['normal', 'ふつう'], ['hard', '多め']], OPT.mech, (v) => { OPT.mech = v; applyPractice(); }));
    npcRows((label, ctl) => row(label, ctl), k, false);
    if (ROLE === 'melee') row('方向指定のガイド', k.toggle(OPT.guide, (v) => { OPT.guide = v; save(); }));
    const howto = [
      `移動は ${keyLabel(MOVE.up)}${keyLabel(MOVE.left)}${keyLabel(MOVE.down)}${keyLabel(MOVE.right)}（読み込んだ KEYBIND.DAT）・パッドは左スティック。攻撃は射程内で（近接は敵の輪の外側から ${Arena.POL.melee}m・仮）。`,
      'カメラはマウスのドラッグで回し、ホイールで近づけます。左右のボタンを同時に押すと前へ進みます。キーボードは KEYBIND.DAT のカメラ操作、パッドは右スティックです。',
      J.howto,
      `敵の範囲攻撃は、橙色の予兆が満ちると発動します。詠唱中に動くと中断します（残り ${POLICY.slideMs / 1000} 秒を切っていれば、動いても完了します: 滑り撃ち）。`,
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
    // transform で拡大すると、動く文字や canvas が拡大前の画素数で描かれてからぼやけて引き伸ばされる。zoom なら拡大後の画素数で描かれる
    stage.style.zoom = String(s);
    stage.style.transform = '';
    Arena.resize(STAGE.w, STAGE.h, s * (window.devicePixelRatio || 1));
    placeGauges();
    placeHudParts();
  }
  // 舞台の 1px が画面の何 px か（zoom の値。canvas を高画質で描くのに使う）
  const stageScale = () => stage.getBoundingClientRect().width / STAGE.w;
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
    if (!paused()) cameraInput(dt);
    Arena.update(run ? dt : 0, S.t, run ? S.phase : 'idle', paused() ? 0 : dt);
    if (run) step(Math.round(dt));
    if (aiming) { if (!live()) cancelAim(); else updateAim(); }
    Arena.render(S.t, S.phase);
    render();
    requestAnimationFrame(loop);
  }

  // 動作確認用のフック（ブラウザのコンソールや自動テストから状態を見る）
  window.MockDebug = { state: () => S, opt: OPT, arena: Arena, press, start };

  document.title = `${D.job.name} 木人練習 UI モック`;
  $('startJobIcon').src = D.job.icon;
  $('startJobName').textContent = `${D.job.name} Lv${D.job.level}`;
  $('ptSelfIcon').src = D.job.icon;
  $('ptTankIcon').src = NPC.icon;
  $('ptTank').querySelector('.pt-name').lastChild.textContent = ROLE === 'tank' ? 'ヒーラー' : 'タンク';
  loadSaved();
  Arena.init({ canvas: $('arena'), canvas3d: $('arena3d'), overlay: $('overlay'), view: '3d', quality: VIEW.quality ?? 'high' }); // 表示は 3D だけ（2D は WebGL が使えないときの予備）
  reset();
  if (Arena.error3d()) addLog('sys', `3D で表示できないため 2D にしました（${Arena.error3d()}）`);
  buildStart();
  fit();
  setMode(VIEW.mode ?? 'hud');
  requestAnimationFrame(loop);
})();
