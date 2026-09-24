// 侍 木人練習 UI モック
// - 名称・アイコン・詠唱・リキャスト・コンボ元は mock-data.js（クライアント抽出データ）から読む
// - 動き（剣気・閃・バフ）はツールチップの記述をもとにした簡易版。値の出典をコメントに書く
// - ゲームデータにない値は POLICY にまとめ、「仮」として扱う
(() => {
  'use strict';
  const D = window.MOCK_DATA;
  const A = D.actions;

  // ---- 仮の値（ゲームデータにない。アプリの方針値 / 未確認） ----
  const POLICY = {
    animLockMs: 600, // アニメーションロック（GAME-04）
    castLockAfterMs: 100, // 詠唱後の追加ロック（GAME-04, 07）
    queueMs: 500, // 先行入力の受付時間（GAME-05）
    comboWindowMs: 30000, // コンボ受付時間（GAME-06）
    kenkiMax: 100, // 剣気の上限（GAME-12）
    countdownMs: 3000,
    durationMs: 120000,
    weaveWarn: 3, // GCD 間のアビリティがこの数に達したら警告（DESIGN-01）
    padTrigger: 0.5,
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

  const STATUS = {
    fugetsu: { name: '風月', tracked: true },
    fuka: { name: '風花', tracked: true },
    meikyo: { name: '明鏡止水' },
    tendo: { name: '天道', sid: 3856 },
    tsubame: { name: '燕返し実行可' },
    namikiriReady: { name: '奥義波切実行可', sid: 2959 },
    zanshinReady: { name: '残心実行可', sid: 3855 },
    tn: { name: 'トゥルーノース' },
    enpi: { name: '燕飛効果アップ' },
    higanbana: { name: '彼岸花', target: true, tracked: true },
  };

  const $ = (id) => document.getElementById(id);
  const stage = $('stage');

  // ---------------- 状態 ----------------
  let S;
  function reset() {
    S = {
      phase: 'idle', t: -POLICY.countdownMs,
      gcdStart: null, gcdEnd: null, lockUntil: -Infinity, lastOgcdLockEnd: null, weaves: 0,
      cast: null, cds: {}, combo: null, comboUntil: 0,
      kenki: 0, sen: { setsu: 0, getsu: 0, ka: 0 }, med: 0, st: {},
      lastIai: null, lastIaiTendo: false, kaeshiNami: false, queue: null,
      stats: { gcds: 0, idleMs: 0, clipMs: 0, comboBreaks: 0, kenkiOver: 0, rejected: 0, uptime: { fugetsu: 0, fuka: 0, higanbana: 0 } },
    };
    $('log').innerHTML = '';
    $('result').hidden = true;
    addLog('sys', 'Space（パッドは Start）で開始。1〜0,-,= / Shift / Alt + 数字でホットバー 1〜3');
  }

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
    if (id === ID.NAMIKIRI && S.kaeshiNami) return ID.K_NAMI;
    return id;
  }

  // 使用条件（満たさなければ理由を返す）
  function blocked(id) {
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
          if (clip > 20) addLog('warn', `アビリティの挟みすぎで GCD が ${(clip / 1000).toFixed(2)} 秒遅れました`);
          if (idle > 100) addLog('warn', `GCD が ${(idle / 1000).toFixed(2)} 秒止まりました`);
        }
      } else if (at > 0 && S.phase === 'combat') {
        S.stats.idleMs += at;
      }
      S.gcdStart = at; S.gcdEnd = at + gcdRecast();
      S.weaves = 0; S.lastOgcdLockEnd = null; S.stats.gcds++;
      ok = combo(a, at);
    } else {
      S.weaves++;
      if (S.weaves === POLICY.weaveWarn) addLog('warn', `GCD の間に ${S.weaves} つ目のアビリティ（クリップしやすい）`);
    }
    if (ownCd(a) != null) S.cds[ownCd(a)] = Math.max(S.cds[ownCd(a)] ?? -Infinity, at) + a.recastMs;
    if (a.castMs > 0) {
      const ct = Math.round(a.castMs * mult());
      S.cast = { id, start: at, end: at + ct, ok };
      S.lockUntil = at + ct + POLICY.castLockAfterMs;
      addLog('ok', `${a.name} の詠唱開始`);
    } else {
      S.lockUntil = at + POLICY.animLockMs;
      if (!a.isGcd) S.lastOgcdLockEnd = S.lockUntil;
      effects(id, ok);
      addLog('ok', `${a.name}${ok && a.comboFrom.length ? '（コンボ）' : ''}`);
      hitFx();
    }
    S.t = Math.max(prevT, at);
  }

  function press(baseId, source) {
    if (S.phase === 'idle' || S.phase === 'ended') { addLog('sys', 'Space で開始してください'); return; }
    const id = resolve(baseId);
    const a = A[id];
    const why = blocked(id);
    if (why) { S.stats.rejected++; addLog('ng', why); return; }
    const ra = readyAt(a);
    if (ra <= S.t) execute(id, S.t);
    else if (ra - S.t <= POLICY.queueMs) S.queue = { baseId, source };
    else {
      S.stats.rejected++;
      const inGcd = a.isGcd && S.gcdEnd != null && S.gcdEnd > S.t;
      addLog('ng', inGcd ? `GCD のリキャスト中（残り ${((S.gcdEnd - S.t) / 1000).toFixed(1)} 秒）` : 'アニメーション硬直・詠唱中です');
    }
  }

  // ---------------- 時間の進行 ----------------
  function step(dt) {
    if (S.phase !== 'countdown' && S.phase !== 'combat') return;
    const t0 = S.t;
    const t1 = S.t + dt;
    // 詠唱完了（予定時刻で処理）
    if (S.cast && S.cast.end <= t1) {
      const c = S.cast; S.cast = null;
      S.t = c.end; effects(c.id, c.ok); addLog('ok', `${A[c.id].name}`); hitFx();
    }
    // 先行入力の実行（実行可能になった時刻で処理）
    if (S.queue) {
      S.t = t0;
      const id = resolve(S.queue.baseId);
      const ra = readyAt(A[id]);
      if (ra <= t1) { const q = S.queue; S.queue = null; S.t = Math.max(t0, ra); if (!blocked(id)) execute(id, S.t); else addLog('ng', blocked(id)); }
    }
    S.t = t1;
    // 稼働時間の集計
    if (S.phase === 'combat') for (const k of Object.keys(S.stats.uptime)) if (has(k)) S.stats.uptime[k] += dt;
    // ステータスの期限切れ
    for (const [k, v] of Object.entries(S.st)) {
      if (v.until <= S.t) {
        delete S.st[k];
        if (STATUS[k].tracked && S.phase === 'combat') addLog('ng', `${STATUS[k].name}が切れました`);
        if (k === 'tsubame') S.lastIai = null;
      }
    }
    // コンボ期限切れ
    if (S.combo != null && S.t > S.comboUntil) { S.combo = null; S.stats.comboBreaks++; addLog('ng', 'コンボの受付時間が切れました'); }
    // フェーズ
    if (S.phase === 'countdown' && S.t >= 0) { S.phase = 'combat'; addLog('sys', '戦闘開始'); }
    if (S.phase === 'combat' && S.t >= POLICY.durationMs) finish();
  }

  function finish() {
    S.t = POLICY.durationMs;
    S.phase = 'ended';
    S.cast = null; S.queue = null;
    if (S.gcdEnd != null && S.gcdEnd < S.t) S.stats.idleMs += S.t - S.gcdEnd;
    if (S.gcdEnd == null) S.stats.idleMs = S.t;
    const st = S.stats;
    const pct = (ms) => `${((ms / POLICY.durationMs) * 100).toFixed(1)}%`;
    const uptime = 1 - (st.idleMs + st.clipMs) / POLICY.durationMs;
    const r = $('result');
    r.innerHTML = `<h2>結果（モック）</h2><table>
      <tr><td>GCD 稼働率</td><td>${(Math.max(0, uptime) * 100).toFixed(1)}%</td></tr>
      <tr><td>GCD 回数</td><td>${st.gcds}</td></tr>
      <tr><td>GCD 停止（合計）</td><td>${(st.idleMs / 1000).toFixed(2)} 秒</td></tr>
      <tr><td>クリップ（合計）</td><td>${(st.clipMs / 1000).toFixed(2)} 秒</td></tr>
      <tr><td>コンボ切れ</td><td>${st.comboBreaks} 回</td></tr>
      <tr><td>剣気のあふれ</td><td>${st.kenkiOver}</td></tr>
      <tr><td>風月 / 風花 / 彼岸花 の維持</td><td>${pct(st.uptime.fugetsu)} / ${pct(st.uptime.fuka)} / ${pct(st.uptime.higanbana)}</td></tr>
      <tr><td>受け付けなかった入力</td><td>${st.rejected} 回</td></tr>
    </table><div class="note">採点の重み付けと、お手本との比較は未実装です。Space でリトライ。</div>`;
    r.hidden = false;
    addLog('sys', '戦闘終了');
  }

  // ---------------- 描画 ----------------
  const slotEls = [];
  const iconOf = (id) => A[id]?.icon;

  function makeSlot(cell, keyLabel) {
    const el = document.createElement('div');
    el.className = 'slot';
    if (!cell) { el.classList.add('empty'); return el; }
    if (cell.kind === 'other') { el.classList.add('empty', 'other'); el.title = `アクション以外（種類 ${cell.type}）`; return el; }
    if (cell.kind === 'missing') { el.classList.add('empty', 'missing'); el.title = `今は存在しないアクション（ID ${cell.id}）`; return el; }
    el.innerHTML = `<img alt=""><div class="cd"></div><div class="frame"></div><div class="num"></div><div class="chg"></div>${keyLabel ? `<div class="key">${keyLabel}</div>` : ''}`;
    const rec = { el, base: cell.id, img: el.querySelector('img'), cd: el.querySelector('.cd'), num: el.querySelector('.num'), chg: el.querySelector('.chg'), shown: null, wasCd: false };
    el.addEventListener('pointerdown', (e) => { e.preventDefault(); pressFx(el); press(cell.id, 'pointer'); });
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

  function buildBars() {
    const wrap = $('hotbars');
    for (const bar of ['hb1', 'hb2', 'hb3', 'hb4']) {
      const cells = D.bars[bar] ?? [];
      const row = document.createElement('div');
      row.className = 'bar';
      row.innerHTML = `<span class="bar-label">${bar.toUpperCase()}</span>`;
      cells.forEach((cell, i) => {
        const mod = BAR_MODS[bar];
        const label = mod == null ? '' : `${mod}${KEY_LABELS[i]}`;
        row.appendChild(makeSlot(cell, label));
        if (mod != null && cell && cell.kind === 'action') keymap.set(`${mod}|${KEY_CODES[i]}`, { base: cell.id, el: row.lastChild });
      });
      wrap.appendChild(row);
    }
    if (D.unplaced.length) {
      const row = document.createElement('div');
      row.className = 'bar unplaced';
      row.innerHTML = '<span class="bar-label" title="ホットバーに置かれていないアクション">未配置</span>';
      D.unplaced.forEach((id) => row.appendChild(makeSlot({ kind: 'action', id }, '')));
      wrap.appendChild(row);
    }
    // クロスホットバー（スロット順とボタンの対応は仮: 0-3 十字キー上右下左、4-7 △○×□。CFG 未確認）
    const x = $('xhb');
    ['xhb1'].forEach((bar, n) => {
      const cells = D.bars[bar] ?? [];
      const set = document.createElement('div');
      set.className = `xset${n ? ' dim' : ''}`;
      set.dataset.bar = bar;
      set.innerHTML = `<div class="x-title">クロスホットバー ${n + 1}${n ? '（表示のみ）' : ''}</div>`;
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
            const lab = n ? '' : `${half ? 'R' : 'L'}${q ? ['△', '○', '×', '□'][k] : ['↑', '→', '↓', '←'][k]}`;
            cross.appendChild(makeSlot(cells[idx], lab));
            if (!n && cells[idx]?.kind === 'action') padMap.set(`${half}|${q}|${k}`, { base: cells[idx].id, el: cross.lastChild });
          }
          g.appendChild(cross);
        }
        pair.appendChild(g);
      }
      set.appendChild(pair);
      x.appendChild(set);
    });
  }

  function statusEl(k, v, debuff) {
    const meta = STATUS[k];
    const icon = meta.sid && D.statuses[meta.sid] ? `<img src="${D.statuses[meta.sid].icon}" alt="">` : meta.name.slice(0, 2);
    const left = Math.ceil((v.until - S.t) / 1000);
    return `<div class="st${debuff ? ' debuff' : ''}${left <= 5 ? ' low' : ''}" title="${meta.name}"><div class="ic${meta.sid ? '' : ' txt'}">${icon}</div>${v.stacks ? `<div class="stk">${v.stacks}</div>` : ''}<div class="t">${left}</div></div>`;
  }

  function highlight(id) {
    if (A[id].comboFrom.length && (has('meikyo') || (S.combo != null && A[id].comboFrom.includes(S.combo)))) return true;
    if ([ID.HIGAN, ID.TENKA, ID.MIDARE, ID.TENDO_GOKEN, ID.TENDO_SETSU, ID.K_GOKEN, ID.K_SETSU, ID.TK_GOKEN, ID.TK_SETSU, ID.K_NAMI].includes(id)) return true;
    if (id === ID.NAMIKIRI && has('namikiriReady')) return true;
    if (id === ID.ZANSHIN && has('zanshinReady') && S.kenki >= 50) return true;
    if (id === ID.SHOHA && S.med >= 3) return true;
    if (id === ID.ENPI && has('enpi')) return true;
    return false;
  }

  let lastStatusHtml = '';
  function render() {
    const active = S.phase === 'countdown' || S.phase === 'combat';
    $('timer').innerHTML = `${fmt(Math.max(0, Math.min(S.t, POLICY.durationMs)))} <span class="dim">/ ${fmt(POLICY.durationMs)}</span>`;
    const cd = $('countdown');
    if (S.phase === 'countdown') { cd.hidden = false; cd.className = 'countdown'; cd.textContent = Math.ceil(-S.t / 1000); }
    else if (S.phase === 'combat' && S.t < 800) { cd.hidden = false; cd.className = 'countdown go'; cd.textContent = '戦闘開始！'; }
    else cd.hidden = true;

    for (const r of slotEls) {
      const id = resolve(r.base);
      const a = A[id];
      if (r.shown !== id) { r.img.src = iconOf(id); r.shown = id; }
      let frac = 0, num = '';
      if (a.isGcd && S.gcdEnd != null && S.gcdEnd > S.t) frac = (S.gcdEnd - S.t) / (S.gcdEnd - S.gcdStart);
      if (ownCd(a) != null) {
        const ch = charges(a), m = maxCh(a);
        if (ch < m) {
          const full = S.cds[ownCd(a)];
          const next = (full - S.t) % a.recastMs || a.recastMs;
          if (ch === 0) { frac = Math.max(frac, next / a.recastMs); num = Math.ceil(next / 1000); }
          else if (!a.isGcd) frac = Math.max(frac, 0);
        }
        r.chg.textContent = m > 1 ? ch : '';
      }
      r.cd.style.background = frac > 0 ? `conic-gradient(transparent 0 ${(1 - frac) * 360}deg, rgba(0,0,0,.62) 0)` : 'none';
      r.num.textContent = num;
      if (r.wasCd && frac === 0) { r.el.classList.remove('ready-flash'); void r.el.offsetWidth; r.el.classList.add('ready-flash'); }
      r.wasCd = frac > 0;
      const unusable = active && blocked(id) != null && !(ownCd(a) != null && charges(a) === 0);
      r.el.classList.toggle('unusable', unusable);
      r.el.classList.toggle('hl', active && !unusable && highlight(id));
    }

    // ゲージ
    $('kenkiFill').style.width = `${(S.kenki / POLICY.kenkiMax) * 100}%`;
    $('kenkiNum').textContent = S.kenki;
    $('senSetsu').classList.toggle('on', !!S.sen.setsu);
    $('senGetsu').classList.toggle('on', !!S.sen.getsu);
    $('senKa').classList.toggle('on', !!S.sen.ka);
    [...$('meditation').children].forEach((i, n) => i.classList.toggle('on', n < S.med));

    // ステータス
    const self = Object.entries(S.st).filter(([k]) => !STATUS[k].target).map(([k, v]) => statusEl(k, v)).join('');
    const tgt = Object.entries(S.st).filter(([k]) => STATUS[k].target).map(([k, v]) => statusEl(k, v, true)).join('');
    const html = self + '|' + tgt;
    if (html !== lastStatusHtml) { $('selfStatus').innerHTML = self; $('targetStatus').innerHTML = tgt; lastStatusHtml = html; }

    // キャストバー
    const cb = $('castbar');
    if (S.cast) {
      cb.hidden = false;
      $('castName').textContent = A[S.cast.id].name;
      const p = (S.t - S.cast.start) / (S.cast.end - S.cast.start);
      $('castFill').style.width = `${Math.min(100, p * 100)}%`;
      $('castTime').textContent = ((S.cast.end - S.t) / 1000).toFixed(2);
    } else cb.hidden = true;

    // GCD
    const g = S.gcdEnd != null && S.gcdEnd > S.t ? (S.gcdEnd - S.t) / (S.gcdEnd - S.gcdStart) : 0;
    $('gcdFill').style.width = `${(1 - g) * 100}%`;
  }

  // ---------------- 演出・ツールチップ ----------------
  function hitFx() {
    const d = document.querySelector('.dummy');
    d.classList.remove('hit'); void d.offsetWidth; d.classList.add('hit');
  }
  function pressFx(el) { el.classList.add('pressed'); setTimeout(() => el.classList.remove('pressed'), 90); }
  function showTip(el, id) {
    const a = A[id];
    const tip = $('tooltip');
    const kind = a.isGcd ? 'ウェポンスキル' : 'アビリティ';
    tip.innerHTML = '';
    const b = document.createElement('b'); b.textContent = a.name;
    const meta = document.createElement('div'); meta.className = 'meta';
    meta.textContent = `${kind} / 詠唱 ${a.castMs ? (a.castMs / 1000).toFixed(1) + '秒' : '即時'} / リキャスト ${(a.recastMs / 1000).toFixed(1)}秒${maxCh(a) > 1 ? ` / チャージ ${maxCh(a)}` : ''}`;
    const body = document.createElement('div'); body.textContent = a.desc;
    tip.append(b, meta, body);
    tip.hidden = false;
    const sr = stage.getBoundingClientRect(), er = el.getBoundingClientRect(), sc = sr.width / 1280;
    const x = (er.left - sr.left) / sc, y = (er.top - sr.top) / sc;
    tip.style.left = `${Math.min(1280 - 310, Math.max(10, x - 130))}px`;
    tip.style.top = '0px';
    tip.style.top = `${Math.max(10, y - tip.offsetHeight - 10)}px`;
  }
  function hideTip() { $('tooltip').hidden = true; }

  // ---------------- 入力 ----------------
  function start() {
    reset();
    S.phase = 'countdown';
    addLog('sys', 'カウントダウン開始');
  }
  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') { e.preventDefault(); if (!e.repeat) start(); return; }
    if (e.code === 'Escape') { reset(); return; }
    const mod = e.shiftKey ? 's' : e.altKey ? 'a' : '';
    const hit = keymap.get(`${mod}|${e.code}`);
    if (hit) {
      e.preventDefault();
      if (!e.repeat) pressFx(hit.el);
      press(hit.base, 'keyboard');
    }
  });
  $('btnStart').addEventListener('click', start);
  $('btnReset').addEventListener('click', reset);
  let mode = 'keyboard';
  function setMode(m) {
    mode = m;
    $('hotbars').hidden = m !== 'keyboard';
    $('xhb').hidden = m !== 'pad';
    $('btnMode').textContent = `表示: ${m === 'pad' ? 'パッド（クロスホットバー）' : 'キーボード'}`;
  }
  $('btnMode').addEventListener('click', () => setMode(mode === 'pad' ? 'keyboard' : 'pad'));

  // ゲームパッド（Gamepad API をフレームごとに読む。INPUT_HUD §4）
  const padMap = new Map();
  let padPrev = [];
  window.addEventListener('gamepadconnected', (e) => { addLog('sys', `パッドを検出: ${e.gamepad.id}`); setMode('pad'); });
  function pollPad() {
    const gp = [...(navigator.getGamepads?.() ?? [])].find(Boolean);
    if (!gp) return;
    const down = gp.buttons.map((b) => b.pressed || b.value > POLICY.padTrigger);
    const edge = (i) => down[i] && !padPrev[i];
    if (edge(9)) start();
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
    }
    padPrev = down;
  }
  let padLast = null;
  function padPress(half, q, k) {
    const hit = padMap.get(`${half}|${q}|${k}`);
    if (hit) { pressFx(hit.el); press(hit.base, 'gamepad'); }
  }

  // ---------------- ループと拡大縮小 ----------------
  function fit() {
    const s = Math.min(innerWidth / 1280, innerHeight / 720);
    stage.style.transform = `scale(${s})`;
  }
  window.addEventListener('resize', fit);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && (S.phase === 'combat' || S.phase === 'countdown')) addLog('sys', 'タブが非表示になりました（モックでは一時停止は未実装）');
  });

  let last = performance.now();
  function loop(now) {
    const dt = Math.min(100, now - last);
    last = now;
    pollPad();
    step(Math.round(dt));
    render();
    requestAnimationFrame(loop);
  }

  $('jobIcon').src = D.job.icon;
  reset();
  buildBars();
  setMode('keyboard');
  fit();
  requestAnimationFrame(loop);
})();
