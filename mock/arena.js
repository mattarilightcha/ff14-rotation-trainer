// 見下ろし 2D（ドット絵）の戦闘画面: 移動・タンクと敵の向き・敵の範囲攻撃（予兆と被弾）・方向指定・ヒット演出。
// 判定（GCD・コンボ・ゲージ）は mock.js、位置と見た目はこのファイルが受け持つ。
// ゲームデータにない値（移動速度・当たり判定の大きさ・近接の射程・方向指定の角度）は POL にまとめた「仮」の値。
(function () {
  'use strict';

  const PX = 4; // 1 ドット = 画面の 4px
  const PPY = 5; // 1m = 5 ドット
  const ARENA_R = 20; // 稽古場の半径（m）
  const FLOOR_Y = 120; // 床の画像の大きさ（m）。カメラが稽古場の端まで動いても画面の外まで床がある大きさ
  // 仮の値（GAME-50〜54。docs/SPEC.md §10）
  const POL = {
    run: 6, // 移動速度（m/秒）
    hitbox: 3, // 敵の当たり判定の半径（m）
    melee: 3, // 近接攻撃の射程（当たり判定の外側から m）
    frontDeg: 45, rearDeg: 135, // 方向指定: 正面 ±45°、背面 ±45°（= 135° より後ろ）、その間が側面
    tankGap: 1.2, bossSpeed: 4, turn: Math.PI * 2.5,
    regen: 0.05, // 被弾後の回復（毎秒、最大 HP に対して。ヒーラーの回復の代わり）
  };
  // タンクの腕前（練習用の設定。ゲームの値ではない）: react = 予兆が出てから動き出すまで（ms）、miss = よけ損ねる確率、
  // wander = 敵の向きがふらつく幅（度）
  const TANK_SKILL = {
    good: { react: 250, miss: 0, wander: 0, events: [] },
    normal: { react: 900, miss: 0.1, wander: 0, events: [0.45, 0.75] },
    bad: { react: 1700, miss: 0.35, wander: 25, events: [0.2, 0.35, 0.5, 0.62, 0.78, 0.9] },
  };
  const COLORS = {
    steel: ['#ffffff', '#9fd4ff'], setsu: ['#f0fdff', '#62d2ff'], getsu: ['#f3efff', '#8f7dff'], ka: ['#fff2f8', '#ff78b6'],
    kenki: ['#fff3ea', '#ff5a36'], iai: ['#fffbe9', '#ffc640'], namikiri: ['#f2ffff', '#4fe3ff'], shoha: ['#f6efff', '#b070ff'],
    buff: ['#fffbe3', '#ffd46b'], blood: ['#ffecec', '#ff3b3b'], water: ['#f0fbff', '#7fd8ff'],
  };
  const MECH = {
    circle: { name: '大旋風', hint: '敵の周囲に円形範囲。離れる' },
    donut: { name: '月輪', hint: 'ドーナツ範囲。敵に近づく' },
    cleave: { name: '薙ぎ払い', hint: '敵の前方に扇範囲。背面・側面へ' },
    puddle: { name: '地裂き', hint: '足元に続けて円。動き続ける' },
    line: { name: '一閃', hint: 'あなたへ向けた直線範囲。横へよける' },
    half: { name: '半月斬', hint: '敵の左右どちらか半面。反対側へ' },
    turn: { name: '（タンクが敵の向きを変える）' },
    relocate: { name: '（タンクが敵を移動させる）' },
  };

  const rand = (a, b) => a + Math.random() * (b - a);
  const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  const angDiff = (a, b) => { let d = a - b; while (d > Math.PI) d -= Math.PI * 2; while (d < -Math.PI) d += Math.PI * 2; return d; };
  const dirOf = (a) => {
    const d = ((a % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    if (d < Math.PI / 4 || d >= (Math.PI * 7) / 4) return 'right';
    if (d < (Math.PI * 3) / 4) return 'down';
    if (d < (Math.PI * 5) / 4) return 'left';
    return 'up';
  };

  let cv = null, g = null, W = 320, H = 180, floorImg = null, SPR = null;
  let overlay = null, bossName = null, tankName = null;
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

  const cam = { x: 0, y: 2 };
  const player = { x: 0, y: 3.8, face: -Math.PI / 2, mx: 0, my: 0, moving: false, walkT: 0, hp: 1, down: 0, jumpT: -1, hurt: 0, trail: [] };
  const boss = { x: 0, y: -2, face: -Math.PI / 2, flash: 0, goal: null };
  // タンクは敵の斜め前（真上だと敵の体に隠れて見えないため、少し左に寄せる）
  const TANK_ANGLE = -Math.PI / 2 - 0.55;
  const tank = { x: 0, y: -6.2, angle: TANK_ANGLE, face: Math.PI / 2, walkT: 0, moving: false, atkT: 0, flash: 0, hp: 1, hurt: 0, wanderT: 0 };
  let opts = { tank: true, mech: 'normal', guide: true, seed: 1, durationMs: 120000, tankSkill: 'good' };
  let rndTank = Math.random;
  let schedule = [], telegraphs = [], fx = [], parts = [];
  let castGlow = null, shake = 0, guideNeed = null;
  const handlers = {};
  const emit = (ev, ...a) => handlers[ev]?.(...a);

  function init(o) {
    cv = o.canvas; g = cv.getContext('2d');
    overlay = o.overlay;
    SPR = window.MockPixel.sprites();
    floorImg = window.MockPixel.floor(FLOOR_Y, PPY, ARENA_R);
    bossName = document.createElement('div'); bossName.className = 'wname boss'; bossName.innerHTML = '<span class="cursor">▼</span>からくり木人';
    tankName = document.createElement('div'); tankName.className = 'wname tank'; tankName.textContent = 'タンク';
    overlay.append(bossName, tankName);
  }

  function resize(stageW, stageH) {
    W = Math.round(stageW / PX); H = Math.round(stageH / PX);
    cv.width = W; cv.height = H;
    cv.style.width = `${W * PX}px`; cv.style.height = `${H * PX}px`;
  }

  // ---------------- 敵の技の予定（固定の種で作るので、同じ設定なら毎回同じ） ----------------
  function buildSchedule() {
    if (opts.mech === 'off') return [];
    const rnd = window.MockPixel.rng(opts.seed);
    const cfg = {
      easy: { gap: 17000, cast: 4200, kinds: ['circle', 'cleave', 'puddle', 'line'] },
      normal: { gap: 11500, cast: 3400, kinds: ['circle', 'donut', 'cleave', 'puddle', 'line', 'half'] },
      hard: { gap: 8200, cast: 2800, kinds: ['circle', 'donut', 'cleave', 'puddle', 'line', 'half'] },
    }[opts.mech] ?? null;
    if (!cfg) return [];
    const out = [];
    let last = null;
    for (let t = 9000; t < opts.durationMs - 5000; t += cfg.gap + Math.floor(rnd() * 2500)) {
      let kind = cfg.kinds[Math.floor(rnd() * cfg.kinds.length)];
      if (kind === last) kind = cfg.kinds[(cfg.kinds.indexOf(kind) + 1) % cfg.kinds.length];
      last = kind;
      out.push({ t, kind, cast: cfg.cast, side: rnd() < 0.5 ? 'left' : 'right', r1: rnd(), r2: rnd() });
    }
    if (opts.tank) {
      // タンクが敵の向きを変える・移動させる（腕前が「上手」ならしない。方向指定の取り直しの練習）
      const frac = (TANK_SKILL[opts.tankSkill] ?? TANK_SKILL.good).events;
      frac.forEach((f, i) => out.push({ t: Math.round(opts.durationMs * f), kind: i % 2 ? 'relocate' : 'turn', r1: rnd(), r2: rnd() }));
    }
    return out.sort((a, b) => a.t - b.t);
  }

  function reset(o) {
    Object.assign(opts, o ?? {});
    Object.assign(player, { x: 0, y: 3.8, face: -Math.PI / 2, mx: 0, my: 0, moving: false, walkT: 0, hp: 1, down: 0, jumpT: -1, hurt: 0, trail: [] });
    Object.assign(boss, { x: 0, y: -2, face: -Math.PI / 2, flash: 0, goal: null });
    Object.assign(tank, { angle: TANK_ANGLE, walkT: 0, moving: false, atkT: 0, flash: 0, hp: 1, hurt: 0, wanderT: 0, hits: 0 });
    boss.dead = 0;
    rndTank = window.MockPixel.rng((opts.seed ?? 1) * 7919 + 13);
    placeTank(true);
    if (!opts.tank) boss.face = Math.PI / 2;
    cam.x = player.x; cam.y = player.y - 2;
    schedule = buildSchedule(); telegraphs = []; fx = []; parts = []; castGlow = null; shake = 0;
  }

  function placeTank(snap) {
    const gx = boss.x + Math.cos(tank.angle) * (POL.hitbox + POL.tankGap), gy = boss.y + Math.sin(tank.angle) * (POL.hitbox + POL.tankGap);
    if (snap) { tank.x = gx; tank.y = gy; }
    return { x: gx, y: gy };
  }

  // ---------------- 入力 ----------------
  function setInput(mx, my) {
    const l = Math.hypot(mx, my);
    player.mx = l > 1 ? mx / l : mx; player.my = l > 1 ? my / l : my;
  }
  function jump() { if (player.jumpT < 0 && player.down <= 0) player.jumpT = 0; }

  // ---------------- 更新 ----------------
  let frameDt = 16.7;
  function update(dtMs, simT, phase) {
    frameDt = Math.min(100, dtMs);
    const dt = Math.min(0.1, dtMs / 1000);
    const live = phase === 'countdown' || phase === 'combat';

    // 自分の移動
    const canMove = live && player.down <= 0;
    const mv = canMove ? Math.hypot(player.mx, player.my) : 0;
    player.moving = mv > 0.05;
    if (player.moving) {
      player.x += player.mx * POL.run * dt; player.y += player.my * POL.run * dt;
      const r = Math.hypot(player.x, player.y);
      if (r > ARENA_R - 0.6) { player.x *= (ARENA_R - 0.6) / r; player.y *= (ARENA_R - 0.6) / r; }
      player.face = Math.atan2(player.my, player.mx);
      player.walkT += dt;
    }
    if (player.jumpT >= 0) { player.jumpT += dt / 0.5; if (player.jumpT >= 1) player.jumpT = -1; }
    if (player.down > 0) { player.down -= dtMs; if (player.down <= 0) { player.hp = 0.6; emit('revive'); } }
    else if (live) player.hp = Math.min(1, player.hp + POL.regen * dt);
    player.hurt = Math.max(0, player.hurt - dt * 2.5);
    player.trail = player.trail.filter((t) => (t.life -= dt) > 0);

    // 敵とタンク
    if (boss.goal) {
      const d = dist(boss, boss.goal);
      if (d < 0.1) boss.goal = null;
      else { const s = Math.min(d, POL.bossSpeed * dt); boss.x += ((boss.goal.x - boss.x) / d) * s; boss.y += ((boss.goal.y - boss.y) / d) * s; }
    } else if (!opts.tank && live && player.down <= 0) {
      // タンクがいないときは、敵が自分を追いかける
      const d = dist(boss, player);
      if (d > POL.hitbox + 1.8) { const s = Math.min(d - POL.hitbox - 1.8, POL.bossSpeed * dt); boss.x += ((player.x - boss.x) / d) * s; boss.y += ((player.y - boss.y) / d) * s; }
    }
    // 向きのある技（扇・直線・半面）を詠唱している間は、敵はその向きのまま
    const lock = telegraphs.find((tg) => !tg.done && tg.lockFace && simT >= tg.start);
    if (opts.tank) {
      const skill = TANK_SKILL[opts.tankSkill] ?? TANK_SKILL.good;
      // 下手なタンクは、敵の向きがふらつく
      if (skill.wander && live && phase === 'combat') {
        tank.wanderT -= dt;
        if (tank.wanderT <= 0) { tank.wanderT = 3 + rndTank() * 4; tank.angle += ((rndTank() * 2 - 1) * skill.wander * Math.PI) / 180; }
      }
      let goal = placeTank(false);
      // 範囲攻撃をよける: 立ち位置が、まだ発動していない予兆の中なら、近くの安全な所へ（近接の距離と敵の向きはなるべく保つ）
      const threat = telegraphs.find((tg) => !tg.done && !tg.tankMiss && simT >= tg.start + skill.react && (!tg.follow || tg.placed) && inside(tg, goal));
      if (threat) goal = safeSpot(goal) ?? goal;
      const d = dist(tank, goal);
      tank.moving = d > 0.15;
      if (tank.moving) { const s = Math.min(d, POL.run * dt); tank.x += ((goal.x - tank.x) / d) * s; tank.y += ((goal.y - tank.y) / d) * s; tank.walkT += dt; }
      tank.face = Math.atan2(boss.y - tank.y, boss.x - tank.x);
      if (lock) turnBossTo(lock.dir, dt);
      else turnBossTo(Math.atan2(tank.y - boss.y, tank.x - boss.x), dt);
      if (live) tank.hp = Math.min(1, tank.hp + POL.regen * 1.5 * dt);
      // 敵の通常攻撃（見た目だけ）
      if (live && phase === 'combat' && !boss.dead) { tank.atkT -= dt; if (tank.atkT <= 0) { tank.atkT = 2.8; tank.flash = 1; addArc(tank, COLORS.kenki, 0.6, 5); } }
    } else if (lock) {
      turnBossTo(lock.dir, dt);
    } else {
      turnBossTo(Math.atan2(player.y - boss.y, player.x - boss.x), dt);
    }
    tank.hurt = Math.max(0, tank.hurt - dt * 2.5);
    tank.flash = Math.max(0, tank.flash - dt * 4);
    boss.flash = Math.max(0, boss.flash - dt * 5);

    // 敵の技
    if (phase === 'combat') {
      while (schedule.length && schedule[0].t <= simT) startMech(schedule.shift(), simT);
      for (const tg of telegraphs) {
        // 追いかけてくる円は、出る瞬間の自分の位置に置く
        if (tg.follow && !tg.placed && simT >= tg.start) { tg.placed = true; tg.c = { x: player.x, y: player.y }; }
        if (!tg.done && simT >= tg.end) resolve(tg, simT);
      }
      telegraphs = telegraphs.filter((tg) => !tg.done || simT - tg.end < 350);
    }

    // カメラ（自分を追う。上のターゲット窓と敵の名前が重ならないよう、自分を画面のやや下に置く）
    const k = 1 - Math.exp(-dt * 5);
    cam.x += (player.x - cam.x) * k; cam.y += (player.y - 2 - cam.y) * k;
    shake = Math.max(0, shake - dt * 18);
  }

  // タンクがよける先: 敵のまわりの輪の上から、予兆の外で、今の立ち位置に近く、敵の向きが変わりにくく、自分（侍）の方へ敵を向けない所
  function safeSpot(home) {
    const homeAng = Math.atan2(home.y - boss.y, home.x - boss.x);
    const pAng = Math.atan2(player.y - boss.y, player.x - boss.x);
    let best = null, bestScore = Infinity;
    for (const r of [POL.hitbox + 0.9, POL.hitbox + 1.6, POL.hitbox + 2.6, 7, 9, 11, 13.5]) {
      for (let k = -12; k <= 12; k++) {
        const a = homeAng + (k * Math.PI) / 12;
        const q = { x: boss.x + Math.cos(a) * r, y: boss.y + Math.sin(a) * r };
        if (Math.hypot(q.x, q.y) > ARENA_R - 1) continue;
        if (telegraphs.some((tg) => !tg.done && (!tg.follow || tg.placed) && inside(tg, q))) continue;
        const faceP = Math.abs(angDiff(a, pAng)) < Math.PI / 3 ? 6 : 0; // 敵を自分の方へ向けない
        const score = dist(q, tank) + (r > POL.hitbox + 3 ? 3 : 0) + Math.abs(angDiff(a, homeAng)) * 2.2 + faceP;
        if (score < bestScore) { bestScore = score; best = q; }
      }
    }
    return best;
  }

  function turnBossTo(target, dt) {
    const d = angDiff(target, boss.face);
    const s = Math.min(Math.abs(d), POL.turn * dt);
    boss.face += Math.sign(d) * s;
  }

  function startMech(m, simT) {
    const cast = m.cast ?? 3000;
    const tg = { kind: m.kind, name: MECH[m.kind].name, start: simT, end: simT + cast, done: false };
    switch (m.kind) {
      case 'circle': Object.assign(tg, { c: { x: boss.x, y: boss.y }, r: POL.hitbox + 7 }); break;
      case 'donut': Object.assign(tg, { c: { x: boss.x, y: boss.y }, inner: POL.hitbox + 2.2, outer: 34 }); break;
      case 'cleave': Object.assign(tg, { c: { x: boss.x, y: boss.y }, dir: boss.face, half: Math.PI / 3, r: 24, lockFace: true }); break;
      case 'line': {
        const dir = Math.atan2(player.y - boss.y, player.x - boss.x);
        Object.assign(tg, { c: { x: boss.x, y: boss.y }, dir, w: 6, len: 44, back: 4, lockFace: true });
        break;
      }
      case 'half': Object.assign(tg, { c: { x: boss.x, y: boss.y }, dir: boss.face, side: m.side, lockFace: true }); break;
      case 'puddle': {
        // 足元に 3 回。1 つ目はすぐ、以降は 1.2 秒ごとに、その時点の自分の位置へ
        for (let i = 0; i < 3; i++) {
          const t0 = simT + i * 1200;
          telegraphs.push({ kind: 'circle', name: tg.name, start: t0, end: t0 + 2300, done: false, follow: i > 0, c: { x: player.x, y: player.y }, r: 3.5, puddle: true });
        }
        emit('mech', tg.name, MECH.puddle.hint, 2300);
        return;
      }
      case 'turn': {
        tank.angle += (m.r1 < 0.5 ? 1 : -1) * Math.PI / 2;
        emit('mech', MECH.turn.name, '敵の向きが変わる。背面・側面を取り直す', 0);
        return;
      }
      case 'relocate': {
        const a = m.r1 * Math.PI * 2, r = 4 + m.r2 * 7;
        boss.goal = { x: Math.cos(a) * r, y: Math.sin(a) * r };
        emit('mech', MECH.relocate.name, '敵が移動する。追いかける', 0);
        return;
      }
      default: return;
    }
    tg.tankMiss = rndTank() < (TANK_SKILL[opts.tankSkill] ?? TANK_SKILL.good).miss;
    telegraphs.push(tg);
    emit('mech', tg.name, MECH[m.kind].hint, cast);
  }

  function inside(tg, p) {
    const dx = p.x - tg.c.x, dy = p.y - tg.c.y, d = Math.hypot(dx, dy);
    switch (tg.kind) {
      case 'circle': return d <= tg.r;
      case 'donut': return d >= tg.inner && d <= tg.outer;
      case 'cleave': return d <= tg.r && Math.abs(angDiff(Math.atan2(dy, dx), tg.dir)) <= tg.half;
      case 'line': {
        const along = dx * Math.cos(tg.dir) + dy * Math.sin(tg.dir), perp = -dx * Math.sin(tg.dir) + dy * Math.cos(tg.dir);
        return along >= -tg.back && along <= tg.len && Math.abs(perp) <= tg.w / 2;
      }
      case 'half': {
        const side = dx * -Math.sin(tg.dir) + dy * Math.cos(tg.dir); // 正 = 敵から見て右
        return tg.side === 'right' ? side > 0 : side < 0;
      }
      default: return false;
    }
  }

  function resolve(tg, simT) {
    tg.done = true;
    emit('boom', tg.kind);
    // 見た目: はじける
    for (let i = 0; i < 26; i++) {
      const p = samplePoint(tg);
      if (p) parts.push({ x: p.x, y: p.y, vx: rand(-2, 2), vy: rand(-5, -1), life: rand(0.25, 0.6), max: 0.6, col: i % 3 ? '#ffb46a' : '#fff1c9', size: 1 });
    }
    if (opts.tank && inside(tg, tank)) { tank.hp = Math.max(0.1, tank.hp - (tg.puddle ? 0.2 : 0.35)); tank.hurt = 1; tank.hits++; flyText('被弾', 'hurt tank', tank, 18); }
    if (player.down > 0 || !inside(tg, player)) return;
    const dmg = tg.puddle ? 0.3 : 0.45;
    player.hp -= dmg; player.hurt = 1;
    if (!reduce) shake = 5;
    flyText('被弾', 'hurt', player, 18);
    if (player.hp <= 0) { player.hp = 0; player.down = 3000; flyText('戦闘不能', 'hurt', player, 28); emit('down', tg.name); }
    emit('hit', tg.name);
    void simT;
  }

  function samplePoint(tg) {
    for (let i = 0; i < 12; i++) {
      const p = { x: tg.c.x + rand(-26, 26), y: tg.c.y + rand(-26, 26) };
      if (Math.hypot(p.x, p.y) < ARENA_R && inside(tg, p)) return p;
    }
    return null;
  }

  // ---------------- 問い合わせ（mock.js から）----------------
  const edgeDistance = () => Math.max(0, dist(player, boss) - POL.hitbox);
  function positional() {
    const rel = Math.abs(angDiff(Math.atan2(player.y - boss.y, player.x - boss.x), boss.face)) * 180 / Math.PI;
    return rel <= POL.frontDeg ? 'front' : rel >= POL.rearDeg ? 'rear' : 'flank';
  }
  function faceTarget() { player.face = Math.atan2(boss.y - player.y, boss.x - player.x); }
  function dashToTarget() {
    const d = dist(player, boss); if (d < 0.01) return;
    const keep = POL.hitbox + 1;
    if (d <= keep) return;
    trailFrom();
    player.x = boss.x + ((player.x - boss.x) / d) * keep; player.y = boss.y + ((player.y - boss.y) / d) * keep;
    faceTarget();
  }
  function backstep(m) {
    const d = dist(player, boss) || 1;
    trailFrom();
    player.x += ((player.x - boss.x) / d) * m; player.y += ((player.y - boss.y) / d) * m;
    const r = Math.hypot(player.x, player.y);
    if (r > ARENA_R - 0.6) { player.x *= (ARENA_R - 0.6) / r; player.y *= (ARENA_R - 0.6) / r; }
  }
  function trailFrom() { for (let i = 0; i < 4; i++) player.trail.push({ x: player.x, y: player.y, life: 0.25 + i * 0.05, dir: dirOf(player.face) }); }

  function bossCast(simT) {
    const tg = telegraphs.filter((t) => !t.done && !t.puddle).sort((a, b) => a.end - b.end)[0];
    if (!tg) return null;
    return { name: tg.name, p: Math.min(1, (simT - tg.start) / (tg.end - tg.start)), left: tg.end - simT };
  }

  // ---------------- 演出 ----------------
  // info: { kind, color, crit, power, count, name, combo, pos: { need, ok } }
  function play(info) {
    const col = COLORS[info.color] ?? COLORS.steel;
    if (info.kind !== 'buff') faceTarget();
    switch (info.kind) {
      case 'buff':
        for (let i = 0; i < 16; i++) parts.push({ x: player.x + rand(-1.2, 1.2), y: player.y + rand(-0.4, 0.4), vx: 0, vy: rand(-4, -1.5), life: rand(0.5, 0.9), max: 0.9, col: i % 2 ? col[0] : col[1], size: 1, rise: true });
        fx.push({ type: 'ring', at: player, col, t: 0, dur: 450, r0: 0.5, r1: 2.2 });
        flyText(`+${info.name}`, 'buff', player, 22);
        return;
      case 'circle': fx.push({ type: 'ring', at: player, col, t: 0, dur: 420, r0: 1, r1: (info.range ?? 5) + 0.5, thick: true }); break;
      case 'cone': fx.push({ type: 'cone', col, t: 0, dur: 420, r: info.range ?? 8 }); break;
      case 'line': fx.push({ type: 'line', col, t: 0, dur: 380, len: (info.range ?? 10) + POL.hitbox }); break;
      case 'projectile': fx.push({ type: 'proj', col, t: 0, dur: 180 }); break;
      case 'dash': break;
      default: break;
    }
    const n = info.count ?? 1;
    const delay = { projectile: 180, cone: 120, line: 90 }[info.kind] ?? 0;
    for (let i = 0; i < n; i++) addArc(boss, col, info.crit ? 1.25 : 1, POL.hitbox + 0.4, delay + i * 90);
    setTimeout(() => {
      boss.flash = 1;
      for (let i = 0; i < (info.crit ? 22 : 12); i++) {
        const a = rand(0, Math.PI * 2), sp = rand(4, 11) * (info.crit ? 1.4 : 1);
        parts.push({ x: boss.x + rand(-0.8, 0.8), y: boss.y - 1.6 + rand(-0.8, 0.6), vx: Math.cos(a) * sp, vy: Math.sin(a) * sp * 0.7, life: rand(0.2, 0.45), max: 0.45, col: i % 3 ? col[1] : col[0], size: info.crit ? 2 : 1, drag: 5 });
      }
      if (!reduce && (info.crit || (info.power ?? 1) > 1.3)) shake = Math.max(shake, info.crit ? 4 : 2.5);
      if (info.name) flyText(info.name, info.crit ? 'crit' : info.combo ? 'combo' : '', boss, 40, col, info.dmg);
      if (info.pos) flyText(info.pos.ok ? `${info.pos.need === 'rear' ? '背面' : '側面'} ○` : '方向指定ミス', info.pos.ok ? 'pos-ok' : 'pos-ng', boss, 24);
    }, delay);
  }

  function addArc(target, col, scale, radius, delay = 0) {
    const a0 = rand(0, Math.PI * 2);
    fx.push({ type: 'arc', target, col, t: -delay, dur: 190, a0, span: rand(1.6, 2.4) * (Math.random() < 0.5 ? 1 : -1), r: radius * scale });
  }

  function castStart(color, ms) { castGlow = { col: COLORS[color] ?? COLORS.iai, t: 0, dur: ms }; }
  function castEnd() { castGlow = null; }
  function dotTick(dmg) {
    for (let i = 0; i < 5; i++) parts.push({ x: boss.x + rand(-1, 1), y: boss.y - rand(0.5, 3), vx: rand(-1, 1), vy: rand(-3, -1), life: 0.4, max: 0.4, col: '#ff4a3c', size: 1 });
    if (dmg) flyText('', 'dot', boss, 26, null, dmg);
  }
  // 撃破: 敵が崩れて消える
  function kill() {
    if (boss.dead) return;
    boss.dead = 1;
    for (let i = 0; i < 60; i++) {
      const a = rand(0, Math.PI * 2), sp = rand(2, 9);
      parts.push({ x: boss.x + rand(-1.2, 1.2), y: boss.y - rand(0, 4), vx: Math.cos(a) * sp, vy: Math.sin(a) * sp * 0.7 - 2, life: rand(0.5, 1.2), max: 1.2, col: i % 3 ? '#ffd28a' : '#fff4d8', size: i % 4 ? 1 : 2, drag: 2 });
    }
    flyText('撃破', 'kill', boss, 44);
    telegraphs = []; schedule = [];
  }

  let flyStack = [];
  function flyText(text, cls, at, lift = 30, col, dmg) {
    if (!overlay) return;
    const s = toStage(at.x, at.y);
    const el = document.createElement('div');
    el.className = `fly ${cls}`;
    if (dmg) {
      // 技名とダメージを 1 行に（ゲームのフライテキストと同じ並び）
      if (text) { const n = document.createElement('span'); n.className = 'fn'; n.textContent = text; el.appendChild(n); }
      const d = document.createElement('span'); d.className = 'fd'; d.textContent = Math.round(dmg).toLocaleString('ja-JP'); el.appendChild(d);
    } else el.textContent = text;
    // 同じ場所に続けて出るときは、前の文字の上に積む（ゲームのフライテキストと同じ）
    const now = performance.now();
    flyStack = flyStack.filter((f) => now - f.t < 650 && f.el.isConnected);
    const same = flyStack.filter((f) => f.at === at).length;
    el.style.left = `${s.x + (at === boss ? 54 : 0) + rand(-6, 6)}px`;
    el.style.top = `${s.y - lift * PX * 0.6 - 40 - same * 26}px`;
    flyStack.push({ el, at, t: now });
    if (col) el.style.setProperty('--glow', col[1]);
    el.addEventListener('animationend', () => el.remove());
    overlay.appendChild(el);
    while (overlay.querySelectorAll('.fly').length > 14) overlay.querySelector('.fly').remove();
  }

  // ---------------- 描画 ----------------
  let ox = 0, oy = 0;
  const sx = (x) => ox + x * PPY, sy = (y) => oy + y * PPY;
  function toStage(x, y) { return { x: sx(x) * PX, y: sy(y) * PX }; }

  function render(simT, phase) {
    if (!g) return;
    const sh = shake > 0 ? [Math.round(rand(-shake, shake)), Math.round(rand(-shake, shake))] : [0, 0];
    ox = Math.round(W / 2 - cam.x * PPY) + sh[0]; oy = Math.round(H * 0.5 - cam.y * PPY) + sh[1];
    g.imageSmoothingEnabled = false;
    g.globalAlpha = 1; g.globalCompositeOperation = 'source-over';
    g.fillStyle = '#0e1712'; g.fillRect(0, 0, W, H);
    g.drawImage(floorImg, Math.round(ox - floorImg.width / 2), Math.round(oy - floorImg.height / 2));

    for (const tg of telegraphs) drawTelegraph(tg, simT);
    drawTargetRing();

    // 影と人物（奥から順に）
    const ents = [
      { kind: 'boss', y: boss.y },
      ...(opts.tank ? [{ kind: 'tank', y: tank.y }] : []),
      { kind: 'player', y: player.y },
    ].sort((a, b) => a.y - b.y);
    for (const e of ents) drawShadow(e.kind);
    for (const t of player.trail) drawSprite(SPR.player[t.dir][0], player.x, player.y, 0, t.life * 2.4);
    for (const e of ents) {
      if (e.kind === 'boss') drawBoss();
      else if (e.kind === 'tank') drawChar(SPR.tank, tank, tank.moving, tank.walkT, 0, tank.flash * 0.6, tank.hurt);
      else drawChar(SPR.player, player, player.moving, player.walkT, jumpOffset(), 0, player.hurt, player.down > 0);
    }

    // 演出（加算）
    g.globalCompositeOperation = 'lighter';
    if (castGlow) drawCast();
    for (let i = fx.length - 1; i >= 0; i--) {
      const e = fx[i];
      e.t += frameDt;
      if (e.t > e.dur) { fx.splice(i, 1); continue; }
      if (e.t >= 0) DRAW[e.type]?.(e);
    }
    for (let i = parts.length - 1; i >= 0; i--) {
      const q = parts[i];
      const pdt = frameDt / 1000;
      q.life -= pdt;
      if (q.life <= 0) { parts.splice(i, 1); continue; }
      q.vx *= Math.exp(-(q.drag ?? 1) * pdt); q.vy *= Math.exp(-(q.drag ?? 1) * pdt);
      q.x += q.vx * pdt; q.y += q.vy * pdt;
      g.globalAlpha = Math.min(1, q.life / q.max * 1.4);
      g.fillStyle = q.col;
      g.fillRect(Math.round(sx(q.x)), Math.round(sy(q.y)), q.size, q.size);
    }
    g.globalCompositeOperation = 'source-over'; g.globalAlpha = 1;

    // 名前（HTML）
    placeName(bossName, boss.x, boss.y, 31);
    placeName(tankName, tank.x, tank.y, 19);
    tankName.hidden = !opts.tank;
    void phase;
  }

  function placeName(el, x, y, up) {
    el.style.left = `${sx(x) * PX}px`;
    el.style.top = `${(sy(y) - up) * PX - 18}px`;
  }

  const jumpOffset = () => (player.jumpT >= 0 ? Math.round(Math.sin(Math.PI * player.jumpT) * 7) : 0);

  function drawShadow(kind) {
    const e = kind === 'boss' ? boss : kind === 'tank' ? tank : player;
    const w = kind === 'boss' ? 12 : 5, h = kind === 'boss' ? 4 : 2;
    const shrink = kind === 'player' && player.jumpT >= 0 ? 0.7 : 1;
    g.fillStyle = 'rgba(0,0,0,.38)';
    g.beginPath(); g.ellipse(Math.round(sx(e.x)), Math.round(sy(e.y)), w * shrink, h * shrink, 0, 0, Math.PI * 2); g.fill();
  }

  function drawSprite(img, x, y, lift, alpha = 1) {
    g.globalAlpha = alpha;
    g.drawImage(img, Math.round(sx(x) - img.width / 2), Math.round(sy(y) - img.height + 2 - lift));
    g.globalAlpha = 1;
  }

  function drawChar(set, e, moving, walkT, lift, flash, hurt, dead) {
    const dir = dirOf(e.face);
    const frame = moving ? (Math.floor(walkT * 8) % 2 ? 1 : 2) : 0;
    if (dead) g.globalAlpha = 0.45;
    drawSprite(set[dir][frame], e.x, e.y, lift, dead ? 0.45 : 1);
    if (flash > 0.02) drawSprite(set.flash[dir][frame], e.x, e.y, lift, flash);
    if (hurt > 0.02) drawSprite(set.hurt[dir][frame], e.x, e.y, lift, hurt * 0.8);
    g.globalAlpha = 1;
  }

  function drawBoss() {
    const dir = dirOf(boss.face);
    if (boss.dead) {
      boss.dead = Math.min(2, boss.dead + frameDt / 900);
      const k = boss.dead - 1;
      if (k >= 1) return;
      drawSprite(SPR.boss[dir], boss.x, boss.y, -k * 10, 1 - k);
      drawSprite(SPR.boss.flash[dir], boss.x, boss.y, -k * 10, (1 - k) * 0.8);
      return;
    }
    drawSprite(SPR.boss[dir], boss.x, boss.y, 0);
    if (boss.flash > 0.02) drawSprite(SPR.boss.flash[dir], boss.x, boss.y, 0, boss.flash * 0.85);
  }

  // 敵のターゲットサークル: 当たり判定の円・正面の矢印・方向指定の区切り。ガイドがオンなら背面と側面を色分けする
  function drawTargetRing() {
    const cx = sx(boss.x), cy = sy(boss.y), R = POL.hitbox * PPY;
    if (opts.guide) {
      const zone = (a0, a1, col) => { g.fillStyle = col; g.beginPath(); g.moveTo(cx, cy); g.arc(cx, cy, R + 7, a0, a1); g.closePath(); g.fill(); };
      const f = boss.face, q = Math.PI / 4;
      const need = guideNeed;
      zone(f + Math.PI - q, f + Math.PI + q, need === 'rear' ? 'rgba(110,255,150,.32)' : 'rgba(110,255,150,.10)');
      zone(f + q, f + 3 * q, need === 'flank' ? 'rgba(255,220,90,.30)' : 'rgba(255,220,90,.09)');
      zone(f - 3 * q, f - q, need === 'flank' ? 'rgba(255,220,90,.30)' : 'rgba(255,220,90,.09)');
    }
    g.strokeStyle = 'rgba(255,90,60,.95)'; g.lineWidth = 1;
    g.beginPath(); g.arc(cx, cy, R, 0, Math.PI * 2); g.stroke();
    g.fillStyle = '#ff5a3c';
    for (const k of [1, 3, 5, 7]) {
      const a = boss.face + (k * Math.PI) / 4;
      g.fillRect(Math.round(cx + Math.cos(a) * R) - 1, Math.round(cy + Math.sin(a) * R) - 1, 2, 2);
    }
    // 正面の矢印
    const a = boss.face, tip = R + 4;
    g.beginPath();
    g.moveTo(cx + Math.cos(a) * tip, cy + Math.sin(a) * tip);
    g.lineTo(cx + Math.cos(a + 0.28) * (R + 0.5), cy + Math.sin(a + 0.28) * (R + 0.5));
    g.lineTo(cx + Math.cos(a - 0.28) * (R + 0.5), cy + Math.sin(a - 0.28) * (R + 0.5));
    g.closePath(); g.fill();
  }

  function drawTelegraph(tg, simT) {
    if (simT < tg.start) return;
    if (tg.follow && !tg.placed) return;
    const p = Math.min(1, (simT - tg.start) / (tg.end - tg.start));
    const flash = tg.done ? 1 - (simT - tg.end) / 350 : 0;
    const cx = sx(tg.c.x), cy = sy(tg.c.y);
    g.save();
    // 稽古場の外には描かない
    g.beginPath(); g.arc(sx(0), sy(0), ARENA_R * PPY, 0, Math.PI * 2); g.clip();
    const path = (scale = 1) => {
      g.beginPath();
      switch (tg.kind) {
        case 'circle': g.arc(cx, cy, tg.r * PPY * scale, 0, Math.PI * 2); break;
        case 'donut': g.arc(cx, cy, tg.outer * PPY, 0, Math.PI * 2); g.arc(cx, cy, Math.max(tg.inner, tg.outer - (tg.outer - tg.inner) * scale) * PPY, 0, Math.PI * 2, true); break;
        case 'cleave': g.moveTo(cx, cy); g.arc(cx, cy, tg.r * PPY * scale, tg.dir - tg.half, tg.dir + tg.half); g.closePath(); break;
        case 'line': {
          const c = Math.cos(tg.dir), s = Math.sin(tg.dir), w = (tg.w / 2) * PPY, b = tg.back * PPY, L = tg.len * PPY * scale;
          g.moveTo(cx - c * b - s * w, cy - s * b + c * w); g.lineTo(cx + c * L - s * w, cy + s * L + c * w);
          g.lineTo(cx + c * L + s * w, cy + s * L - c * w); g.lineTo(cx - c * b + s * w, cy - s * b - c * w); g.closePath();
          break;
        }
        case 'half': {
          const c = Math.cos(tg.dir), s = Math.sin(tg.dir), sgn = tg.side === 'right' ? 1 : -1, F = 200;
          const nx = -s * sgn, ny = c * sgn; // 危ない側への向き
          g.moveTo(cx - c * F, cy - s * F); g.lineTo(cx + c * F, cy + s * F);
          g.lineTo(cx + c * F + nx * F * scale, cy + s * F + ny * F * scale); g.lineTo(cx - c * F + nx * F * scale, cy - s * F + ny * F * scale); g.closePath();
          break;
        }
        default: break;
      }
    };
    if (tg.done) {
      g.fillStyle = `rgba(255,236,190,${0.55 * flash})`; path(1); g.fill('evenodd');
    } else {
      g.fillStyle = 'rgba(255,120,40,.22)'; path(1); g.fill('evenodd');
      g.fillStyle = 'rgba(255,150,70,.28)'; path(p); g.fill('evenodd'); // 詠唱の進み具合で満ちていく
      g.strokeStyle = 'rgba(255,196,130,.95)'; g.lineWidth = 1; path(1); g.stroke();
    }
    g.restore();
  }

  function drawCast() {
    castGlow.t += frameDt;
    const p = Math.min(1, castGlow.t / castGlow.dur), cx = sx(player.x), cy = sy(player.y);
    g.globalAlpha = 0.35 + 0.4 * p; g.strokeStyle = castGlow.col[1];
    g.beginPath(); g.ellipse(cx, cy, 9 - 4 * p, 3.5 - 1.5 * p, 0, 0, Math.PI * 2); g.stroke();
    if (Math.random() < 0.7) {
      const a = rand(0, Math.PI * 2), r = rand(2, 4);
      parts.push({ x: player.x + Math.cos(a) * r, y: player.y - 1 + Math.sin(a) * r * 0.5, vx: -Math.cos(a) * r * 3, vy: -Math.sin(a) * r * 1.5, life: 0.3, max: 0.3, col: castGlow.col[0], size: 1, drag: 0 });
    }
    g.globalAlpha = 1;
  }

  const DRAW = {
    arc(e) {
      const p = e.t / e.dur, cx = sx(e.target.x), cy = sy(e.target.y) - 8;
      const head = Math.min(1, p * 2.2), tail = Math.max(0, p * 1.6 - 0.6);
      const steps = 22;
      for (let i = 0; i <= steps; i++) {
        const u = tail + ((head - tail) * i) / steps;
        const a = e.a0 + e.span * u, r = e.r * PPY;
        const x = Math.round(cx + Math.cos(a) * r), y = Math.round(cy + Math.sin(a) * r * 0.75);
        g.globalAlpha = (1 - p) * (0.4 + 0.6 * (i / steps));
        g.fillStyle = e.col[1]; g.fillRect(x - 1, y - 1, 3, 3);
        g.fillStyle = e.col[0]; g.fillRect(x, y, 1, 1);
      }
    },
    ring(e) {
      const p = e.t / e.dur, cx = sx(e.at.x), cy = sy(e.at.y);
      const r = (e.r0 + (e.r1 - e.r0) * (1 - Math.pow(1 - p, 3))) * PPY;
      g.globalAlpha = (1 - p) * 0.9; g.strokeStyle = e.col[1]; g.lineWidth = e.thick ? 2 : 1;
      g.beginPath(); g.ellipse(cx, cy, r, r * 0.75, 0, 0, Math.PI * 2); g.stroke();
      g.lineWidth = 1;
    },
    cone(e) {
      const p = e.t / e.dur, cx = sx(player.x), cy = sy(player.y) - 4;
      const dir = Math.atan2(boss.y - player.y, boss.x - player.x), R = (e.r + POL.hitbox) * PPY * Math.min(1, p * 1.8);
      g.globalAlpha = (1 - p) * 0.55; g.fillStyle = e.col[1];
      g.beginPath(); g.moveTo(cx, cy); g.arc(cx, cy, R, dir - 0.62, dir + 0.62); g.closePath(); g.fill();
      g.globalAlpha = (1 - p) * 0.9; g.strokeStyle = e.col[0];
      g.beginPath(); g.arc(cx, cy, R, dir - 0.62, dir + 0.62); g.stroke();
    },
    line(e) {
      const p = e.t / e.dur, cx = sx(player.x), cy = sy(player.y) - 4;
      const dir = Math.atan2(boss.y - player.y, boss.x - player.x), L = e.len * PPY * Math.min(1, p * 3), w = Math.max(1, 5 * (1 - p));
      g.save(); g.translate(cx, cy); g.rotate(dir);
      g.globalAlpha = (1 - p) * 0.7; g.fillStyle = e.col[1]; g.fillRect(0, -w, L, w * 2);
      g.globalAlpha = 1 - p; g.fillStyle = e.col[0]; g.fillRect(0, -1, L, 2);
      g.restore();
    },
    proj(e) {
      const p = Math.min(1, e.t / e.dur);
      const x = sx(player.x + (boss.x - player.x) * p), y = sy(player.y + (boss.y - player.y) * p) - 6;
      g.globalAlpha = 1; g.fillStyle = e.col[1]; g.fillRect(Math.round(x) - 3, Math.round(y) - 1, 6, 3);
      g.fillStyle = e.col[0]; g.fillRect(Math.round(x) - 1, Math.round(y), 3, 1);
    },
  };

  window.MockArena = {
    init, resize, reset, setInput, jump, update, render,
    edgeDistance, positional, faceTarget, dashToTarget, backstep, bossCast,
    isMoving: () => player.moving, isDown: () => player.down > 0, hp: () => player.hp,
    tankHp: () => (opts.tank ? Math.max(0, tank.hp - tank.flash * 0.04) : 0), // タンクの HP（範囲攻撃で減り、少しずつ戻る。通常攻撃で少し揺れる）
    setGuide: (need) => { guideNeed = need; },
    play, castStart, castEnd, dotTick, kill, flyText: (t, cls) => flyText(t, cls, player, 22),
    on: (ev, fn) => { handlers[ev] = fn; },
    options: () => ({ ...opts }), POL, MECH,
    // 動作確認用
    debug: () => ({ tankHits: tank.hits, tank: { x: tank.x, y: tank.y }, boss: { x: boss.x, y: boss.y, face: boss.face }, telegraphs: telegraphs.length }),
  };
})();
