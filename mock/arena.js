// 練習場: 自分・タンク・敵の位置と動き、敵の範囲攻撃（予兆と被弾）、方向指定、演出の発生、カメラ。
// 描画は 2 通り。3D の斜め見下ろし（arena3d.js。three.js）と、真上から見た 2D（このファイルの R2D）。どちらも同じ状態を描く。
// 判定（GCD・コンボ・ゲージ）は mock.js、位置と見た目はこのファイルが受け持つ。
// ゲームデータにない値（移動速度・当たり判定の大きさ・近接の射程・方向指定の角度）は POL にまとめた「仮」の値。
(function () {
  'use strict';

  // ステージ（形・広さ。stages.js）。判定の端はステージの形に合わせる
  const ST = window.MockStages;
  let STG = ST.get('dojo');
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
  // 頭の高さ（m。名前とフライテキストの位置）
  const HEAD = { player: 2.7, tank: 2.8, boss: 4.6 };

  const rand = (a, b) => a + Math.random() * (b - a);
  const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  const angDiff = (a, b) => { let d = a - b; while (d > Math.PI) d -= Math.PI * 2; while (d < -Math.PI) d += Math.PI * 2; return d; };
  // 画面に対する向き → 4 方向（right = 画面の右、down = 手前、up = 奥、left = 画面の左）
  const dirOf = (a) => {
    const d = ((a % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    if (d < Math.PI / 4 || d >= (Math.PI * 7) / 4) return 'right';
    if (d < (Math.PI * 3) / 4) return 'down';
    if (d < (Math.PI * 5) / 4) return 'left';
    return 'up';
  };

  // ---------------- カメラ ----------------
  // yaw: カメラが向いている方角（ワールドの角度。-π/2 = 北 = 画面の上）、pitch: 見下ろす角度（度。90 で真上）、dist: 自分からの距離（m）。
  // 2D は北が上で固定（回転しない）
  const CAM0 = { yaw: -Math.PI / 2, pitch: 52, dist: 30 };
  const CAM_LIM = { pitch: [10, 86], dist: [7, 60] };
  const cam = { x: 0, y: 2, yaw: CAM0.yaw, pitch: CAM0.pitch, dist: CAM0.dist, shake: 0 };

  // ---------------- 状態 ----------------
  const player = { x: 0, y: 3.8, z: 0, face: -Math.PI / 2, mx: 0, my: 0, moving: false, walkT: 0, hp: 1, down: 0, jumpT: -1, hurt: 0, trail: [], act: null };
  const boss = { x: 0, y: -2, face: -Math.PI / 2, flash: 0, goal: null, dead: 0, act: null, casting: false };
  // タンクは敵の斜め前（真上だと敵の体に隠れて見えないため、少し左に寄せる）
  const TANK_ANGLE = -Math.PI / 2 - 0.55;
  const tank = { x: 0, y: -6.2, angle: TANK_ANGLE, face: Math.PI / 2, walkT: 0, moving: false, atkT: 0, hitT: 1.4, flash: 0, hp: 1, hurt: 0, wanderT: 0, hits: 0, act: null };
  let opts = { tank: true, mech: 'normal', guide: true, seed: 1, durationMs: 120000, tankSkill: 'good', stage: 'dojo', markers: null };
  let rndTank = Math.random;
  let schedule = [], telegraphs = [], fx = [], parts = [];
  let castGlow = null, guideNeed = null, clock = 0;
  const handlers = {};
  const emit = (ev, ...a) => handlers[ev]?.(...a);
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

  let SPR = null;
  let overlay = null, bossName = null, tankName = null;
  let view = '3d', quality = 'high', R3 = null, r3err = null, canvas2d = null, canvas3d = null;
  let stageW = 1280, stageH = 720, pixelRatio = 1;

  function init(o) {
    canvas2d = o.canvas; canvas3d = o.canvas3d ?? null;
    overlay = o.overlay;
    SPR = window.MockSprites.build();
    R2D.init(canvas2d);
    bossName = document.createElement('div'); bossName.className = 'wname boss'; bossName.innerHTML = '<span class="cursor">▼</span>からくり木人';
    tankName = document.createElement('div'); tankName.className = 'wname tank'; tankName.textContent = 'タンク';
    overlay.append(bossName, tankName);
    setView(o.view ?? view, o.quality ?? quality);
  }

  // 描き方の切り替え: '3d'（WebGL が使えないときは 2D になる）/ '2d'
  function setView(v, q = quality) {
    view = v === '2d' ? '2d' : '3d'; quality = q;
    if (view === '3d' && !R3 && !r3err && canvas3d && window.MockArena3D) {
      try { R3 = window.MockArena3D.create(canvas3d, STATE); } catch (e) { r3err = String(e?.message ?? e); R3 = null; }
      if (R3) R3.resize(stageW, stageH, pixelRatio);
    }
    R3?.setQuality?.(quality);
    const use3 = view3d();
    if (canvas3d) canvas3d.hidden = !use3;
    canvas2d.hidden = use3;
    overlay.classList.toggle('v3d', use3);
  }
  const view3d = () => view === '3d' && !!R3;

  function resize(w, h, ratio = 1) {
    stageW = w; stageH = h; pixelRatio = ratio;
    R2D.resize(w, h);
    R3?.resize(w, h, ratio);
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
    if (STG.id !== opts.stage) {
      STG = ST.get(opts.stage);
      R2D.setStage(STG);
      R3?.setStage?.(STG);
    }
    Object.assign(player, { x: 0, y: 3.8, z: 0, face: -Math.PI / 2, mx: 0, my: 0, moving: false, walkT: 0, hp: 1, down: 0, jumpT: -1, hurt: 0, trail: [], act: null });
    Object.assign(boss, { x: 0, y: -2, face: -Math.PI / 2, flash: 0, goal: null, dead: 0, act: null, casting: false });
    Object.assign(tank, { angle: TANK_ANGLE, walkT: 0, moving: false, atkT: 0, hitT: 1.4, flash: 0, hp: 1, hurt: 0, wanderT: 0, hits: 0, act: null });
    rndTank = window.MockPixel.rng((opts.seed ?? 1) * 7919 + 13);
    placeTank(true);
    if (!opts.tank) boss.face = Math.PI / 2;
    cam.x = player.x; cam.y = player.y - 2; cam.shake = 0;
    schedule = buildSchedule(); telegraphs = []; fx = []; parts = []; castGlow = null;
    for (const f of flies) f.el.remove();
    flies = [];
  }

  function placeTank(snap) {
    const gx = boss.x + Math.cos(tank.angle) * (POL.hitbox + POL.tankGap), gy = boss.y + Math.sin(tank.angle) * (POL.hitbox + POL.tankGap);
    if (snap) { tank.x = gx; tank.y = gy; }
    return { x: gx, y: gy };
  }

  // ---------------- 入力 ----------------
  // mx, my: 画面に対する入力（右 +x、手前 +y）。3D ではカメラの向きに合わせてワールドの向きに直す（「前」は画面の奥）
  function setInput(mx, my) {
    const l = Math.hypot(mx, my);
    player.mx = l > 1 ? mx / l : mx; player.my = l > 1 ? my / l : my;
  }
  function jump() { if (player.jumpT < 0 && player.down <= 0) player.jumpT = 0; }
  const viewYaw = () => (view3d() ? cam.yaw : CAM0.yaw);

  // カメラの操作（3D のときだけ）: dyaw（ラジアン。+ で右を向く）、dpitch（度。+ で見下ろす）
  const camera = {
    rotate(dyaw, dpitch = 0) {
      if (!view3d()) return;
      cam.yaw += dyaw;
      cam.pitch = Math.max(CAM_LIM.pitch[0], Math.min(CAM_LIM.pitch[1], cam.pitch + dpitch));
    },
    zoom(k) { if (view3d()) cam.dist = Math.max(CAM_LIM.dist[0], Math.min(CAM_LIM.dist[1], cam.dist * k)); },
    // how: 'north'（北が上・初期の角度と距離）/ 'behind'（自分の後ろから。FF14 のカメラのリセットと同じ）
    reset(how = 'north') {
      cam.yaw = how === 'behind' ? player.face : CAM0.yaw;
      cam.pitch = CAM0.pitch; cam.dist = CAM0.dist;
    },
    get: () => ({ yaw: cam.yaw, pitch: cam.pitch, dist: cam.dist }),
    set(o) { if (o?.pitch != null) cam.pitch = o.pitch; if (o?.dist != null) cam.dist = o.dist; if (o?.yaw != null) cam.yaw = o.yaw; },
    LIM: CAM_LIM, DEFAULT: CAM0,
  };

  // ---------------- 更新 ----------------
  // dtMs: 試合の時間（一時停止中は 0）、vdtMs: 見た目の時間（演出・カメラ。一時停止中だけ 0）
  function update(dtMs, simT, phase, vdtMs = dtMs) {
    const dt = Math.min(0.1, dtMs / 1000), vdt = Math.min(0.1, vdtMs / 1000);
    const live = phase === 'countdown' || phase === 'combat';
    clock += vdt;

    // 自分の移動（入力をカメラの向きでワールドの向きに直す）
    const canMove = live && player.down <= 0;
    const mv = canMove ? Math.hypot(player.mx, player.my) : 0;
    player.moving = mv > 0.05 && dt > 0;
    if (player.moving) {
      const yaw = viewYaw(), fx0 = Math.cos(yaw), fy0 = Math.sin(yaw); // 前（画面の奥）
      const wx = -fy0 * player.mx + fx0 * -player.my, wy = fx0 * player.mx + fy0 * -player.my;
      player.x += wx * POL.run * dt; player.y += wy * POL.run * dt;
      ST.clamp(STG, player, 0.6);
      player.face = Math.atan2(wy, wx);
      player.walkT += dt;
    }
    if (player.jumpT >= 0) { player.jumpT += dt / 0.5; if (player.jumpT >= 1) player.jumpT = -1; }
    player.z = player.jumpT >= 0 ? Math.sin(Math.PI * player.jumpT) * 1.1 : 0;
    if (player.down > 0) { player.down -= dtMs; if (player.down <= 0) { player.hp = 0.6; emit('revive'); } }
    else if (live) player.hp = Math.min(1, player.hp + POL.regen * dt);
    player.hurt = Math.max(0, player.hurt - vdt * 2.5);
    player.trail = player.trail.filter((t) => (t.life -= vdt) > 0);

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
    boss.casting = telegraphs.some((tg) => !tg.done && !tg.puddle && simT >= tg.start);
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
      tank.moving = d > 0.15 && dt > 0;
      if (d > 0.15) { const s = Math.min(d, POL.run * dt); tank.x += ((goal.x - tank.x) / d) * s; tank.y += ((goal.y - tank.y) / d) * s; tank.walkT += dt; }
      tank.face = Math.atan2(boss.y - tank.y, boss.x - tank.x);
      if (lock) turnBossTo(lock.dir, dt);
      else turnBossTo(Math.atan2(tank.y - boss.y, tank.x - boss.x), dt);
      if (live) tank.hp = Math.min(1, tank.hp + POL.regen * 1.5 * dt);
      if (live && phase === 'combat' && !boss.dead) {
        // 敵の通常攻撃（見た目だけ）: 敵が腕を振り下ろし、タンクが盾で受ける
        tank.atkT -= dt;
        if (tank.atkT <= 0) {
          tank.atkT = 2.8;
          if (!boss.casting) act(boss, 'slam');
          setTimeout(() => { tank.flash = 1; act(tank, 'hurt', 0.25); addArc(tank, COLORS.kenki, 0.6, 1.2, 1.4); }, 180);
        }
        // タンクの攻撃（見た目だけ）
        tank.hitT -= dt;
        if (tank.hitT <= 0) { tank.hitT = 2.5; act(tank, 'slash'); setTimeout(() => sparks(boss, COLORS.steel, 5, 0.7), 170); }
      }
    } else if (lock) {
      turnBossTo(lock.dir, dt);
    } else {
      turnBossTo(Math.atan2(player.y - boss.y, player.x - boss.x), dt);
    }
    tank.hurt = Math.max(0, tank.hurt - vdt * 2.5);
    tank.flash = Math.max(0, tank.flash - vdt * 4);
    boss.flash = Math.max(0, boss.flash - vdt * 5);
    if (boss.dead) boss.dead = Math.min(2, boss.dead + vdt / 0.9);
    for (const e of [player, tank, boss]) if (e.act && (e.act.t += vdt) > e.act.dur) e.act = null;

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

    // 演出と粒子（見た目の時間で進める）
    for (let i = fx.length - 1; i >= 0; i--) { const e = fx[i]; e.t += vdtMs; if (e.t > e.dur) fx.splice(i, 1); }
    if (castGlow) { castGlow.t += vdtMs; castParticles(vdt); }
    for (let i = parts.length - 1; i >= 0; i--) {
      const q = parts[i];
      q.life -= vdt;
      if (q.life <= 0) { parts.splice(i, 1); continue; }
      const k = Math.exp(-(q.drag ?? 1) * vdt);
      q.vx *= k; q.vy *= k; q.vz = q.vz * k - (q.g ?? 0) * vdt;
      q.x += q.vx * vdt; q.y += q.vy * vdt; q.z += q.vz * vdt;
      if (q.z < 0) { q.z = 0; q.vz *= -0.3; q.vx *= 0.6; q.vy *= 0.6; }
    }

    // カメラ（自分を追う）
    const k = 1 - Math.exp(-vdt * 6);
    const ty = view3d() ? player.y : player.y - 2; // 2D は上のターゲット窓と敵の名前が重ならないよう、自分を画面のやや下に置く
    cam.x += (player.x - cam.x) * k; cam.y += (ty - cam.y) * k;
    cam.shake = Math.max(0, cam.shake - vdt * 18);
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
        if (!ST.inside(STG, q.x, q.y, 1)) continue;
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
    if (!tg.puddle) act(boss, 'slam');
    // 見た目: 地面からはじける
    for (let i = 0; i < 40; i++) {
      const p = samplePoint(tg);
      if (p) spark({ x: p.x, y: p.y, z: 0.05, vx: rand(-1.2, 1.2), vy: rand(-1.2, 1.2), vz: rand(2.5, 6.5), g: 11, drag: 1.5, life: rand(0.3, 0.7), max: 0.7, col: i % 3 ? '#ffb46a' : '#fff1c9', size: i % 5 ? 1 : 2 });
    }
    fx.push({ type: 'boom', tg, t: 0, dur: 420 });
    if (opts.tank && inside(tg, tank)) { tank.hp = Math.max(0.1, tank.hp - (tg.puddle ? 0.2 : 0.35)); tank.hurt = 1; tank.hits++; act(tank, 'hurt', 0.4); flyText('被弾', 'hurt tank', tank, 0.2); }
    if (player.down > 0 || !inside(tg, player)) return;
    const dmg = tg.puddle ? 0.3 : 0.45;
    player.hp -= dmg; player.hurt = 1;
    act(player, 'hurt', 0.45);
    if (!reduce) cam.shake = 5;
    flyText('被弾', 'hurt', player, 0.2);
    if (player.hp <= 0) { player.hp = 0; player.down = 3000; flyText('戦闘不能', 'hurt', player, 0.6); emit('down', tg.name); }
    emit('hit', tg.name);
    void simT;
  }

  function samplePoint(tg) {
    for (let i = 0; i < 12; i++) {
      const p = { x: tg.c.x + rand(-26, 26), y: tg.c.y + rand(-26, 26) };
      if (ST.inside(STG, p.x, p.y) && inside(tg, p)) return p;
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
    ST.clamp(STG, player, 0.6);
  }
  // 残像（移動の前の位置に、薄い自分を残す）
  function trailFrom() { for (let i = 0; i < 4; i++) player.trail.push({ x: player.x, y: player.y, face: player.face, life: 0.25 + i * 0.05, max: 0.45 }); }

  function bossCast(simT) {
    const tg = telegraphs.filter((t) => !t.done && !t.puddle).sort((a, b) => a.end - b.end)[0];
    if (!tg) return null;
    return { name: tg.name, p: Math.min(1, (simT - tg.start) / (tg.end - tg.start)), left: tg.end - simT };
  }

  // ---------------- 演出 ----------------
  // 動作（ドット絵のアニメーション）: 1 回だけの動き。hold は最後のコマで止めておく時間（秒）
  function act(e, name, hold = 0.12) {
    const set = e === player ? SPR?.player : e === tank ? SPR?.tank : SPR?.boss;
    const d = set ? window.MockSprites.duration(set, name) : 0.3;
    e.act = { name, t: 0, dur: d + hold };
  }
  function spark(o) {
    parts.push(Object.assign({ x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, g: 0, drag: 1, life: 0.5, max: 0.5, col: '#ffffff', size: 1 }, o));
    if (parts.length > 1200) parts.splice(0, parts.length - 1200);
  }
  // 敵に当たったときの火花
  function sparks(at, col, n, pow = 1) {
    const h = at === boss ? 2.2 : 1.4;
    for (let i = 0; i < n; i++) {
      const a = rand(0, Math.PI * 2), e = rand(-0.4, 1.1), sp = rand(4, 11) * pow;
      spark({ x: at.x + rand(-0.6, 0.6), y: at.y + rand(-0.6, 0.6), z: h + rand(-0.6, 0.8), vx: Math.cos(a) * Math.cos(e) * sp, vy: Math.sin(a) * Math.cos(e) * sp, vz: Math.sin(e) * sp, g: 7, drag: 4.5, life: rand(0.2, 0.5), max: 0.5, col: i % 3 ? col[1] : col[0], size: pow > 1.2 && i % 3 === 0 ? 2 : 1 });
    }
  }
  function castParticles(dt) {
    const n = Math.round(dt * 70 + Math.random());
    for (let i = 0; i < n; i++) {
      const a = rand(0, Math.PI * 2), r = rand(1.6, 3.2);
      spark({ x: player.x + Math.cos(a) * r, y: player.y + Math.sin(a) * r, z: rand(0.1, 1.6), vx: -Math.cos(a) * r * 2.2, vy: -Math.sin(a) * r * 2.2, vz: rand(0.4, 1.4), g: 0, drag: 0.5, life: 0.35, max: 0.35, col: castGlow.col[0], size: 1 });
    }
  }

  // info: { kind, color, crit, power, count, name, combo, pos: { need, ok }, dmg, range }
  function play(info) {
    const col = COLORS[info.color] ?? COLORS.steel;
    if (info.kind !== 'buff') faceTarget();
    const draw = info.color === 'iai' || info.color === 'blood' || info.color === 'namikiri';
    switch (info.kind) {
      case 'buff':
        act(player, 'buff', 0.2);
        for (let i = 0; i < 26; i++) {
          const a = rand(0, Math.PI * 2), r = rand(0.3, 1.3);
          spark({ x: player.x + Math.cos(a) * r, y: player.y + Math.sin(a) * r, z: rand(0.1, 1.2), vz: rand(1.5, 4), g: 0, drag: 1.2, life: rand(0.5, 0.95), max: 0.95, col: i % 2 ? col[0] : col[1], size: i % 4 ? 1 : 2 });
        }
        fx.push({ type: 'ring', at: player, col, t: 0, dur: 520, r0: 0.6, r1: 2.8 });
        fx.push({ type: 'pillar', at: player, col, t: 0, dur: 600 });
        flyText(`+${info.name}`, 'buff', player, 0.2);
        return;
      case 'circle': fx.push({ type: 'ring', at: player, col, t: 0, dur: 420, r0: 1, r1: (info.range ?? 5) + 0.5, thick: true }); break;
      case 'cone': fx.push({ type: 'cone', col, t: 0, dur: 420, r: info.range ?? 8 }); break;
      case 'line': fx.push({ type: 'line', col, t: 0, dur: 380, len: (info.range ?? 10) + POL.hitbox }); break;
      case 'projectile': fx.push({ type: 'proj', col, t: 0, dur: 180 }); break;
      default: break;
    }
    act(player, draw ? 'iai' : 'slash');
    const n = info.count ?? 1;
    const delay = { projectile: 180, cone: 120, line: 90 }[info.kind] ?? 0;
    for (let i = 0; i < n; i++) addArc(boss, col, info.crit ? 1.25 : 1, POL.hitbox + 0.4, draw ? 2.0 : 1.4 + rand(0, 1.2), delay + i * 90, draw);
    setTimeout(() => {
      boss.flash = 1;
      sparks(boss, col, info.crit ? 26 : 14, info.crit ? 1.4 : 1);
      fx.push({ type: 'flash', at: { x: boss.x, y: boss.y, z: 2 }, col, t: 0, dur: 260, power: info.crit ? 1.6 : draw ? 1.3 : 0.8 });
      if (!reduce && (info.crit || (info.power ?? 1) > 1.3)) cam.shake = Math.max(cam.shake, info.crit ? 4 : 2.5);
      if (info.name) flyText(info.name, info.crit ? 'crit' : info.combo ? 'combo' : '', boss, 0.2, col, info.dmg);
      if (info.pos) flyText(info.pos.ok ? `${info.pos.need === 'rear' ? '背面' : '側面'} ○` : '方向指定ミス', info.pos.ok ? 'pos-ok' : 'pos-ng', boss, -0.6);
    }, delay);
  }

  // 斬撃の弧: 対象のまわり（高さ h m、半径 r m）に、傾いた円の一部を描く
  function addArc(target, col, scale, radius, h, delay = 0, flat = false) {
    const a0 = rand(0, Math.PI * 2);
    fx.push({ type: 'arc', target, col, t: -delay, dur: flat ? 260 : 220, a0, span: rand(1.8, 2.6) * (Math.random() < 0.5 ? 1 : -1), r: radius * scale, h: h ?? 1.4, tilt: flat ? rand(-0.12, 0.12) : rand(-0.7, 0.7), w: flat ? 0.75 : 0.5 });
  }

  function castStart(color, ms) { castGlow = { col: COLORS[color] ?? COLORS.iai, t: 0, dur: ms }; }
  function castEnd() { castGlow = null; }
  function dotTick(dmg) {
    for (let i = 0; i < 6; i++) spark({ x: boss.x + rand(-1, 1), y: boss.y + rand(-1, 1), z: rand(0.5, 3.4), vx: rand(-0.6, 0.6), vy: rand(-0.6, 0.6), vz: rand(0.6, 2), g: 0, drag: 1, life: 0.5, max: 0.5, col: '#ff4a3c', size: 1 });
    if (dmg) flyText('', 'dot', boss, -0.4, null, dmg);
  }
  // 撃破: 敵が崩れて消える
  function kill() {
    if (boss.dead) return;
    boss.dead = 1;
    for (let i = 0; i < 90; i++) {
      const a = rand(0, Math.PI * 2), sp = rand(2, 9);
      spark({ x: boss.x + rand(-1.2, 1.2), y: boss.y + rand(-1.2, 1.2), z: rand(0.2, 4.2), vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, vz: rand(1, 7), g: 6, drag: 1.6, life: rand(0.6, 1.4), max: 1.4, col: i % 3 ? '#ffd28a' : '#fff4d8', size: i % 4 ? 1 : 2 });
    }
    fx.push({ type: 'flash', at: { x: boss.x, y: boss.y, z: 2.4 }, col: COLORS.iai, t: 0, dur: 900, power: 2.4 });
    fx.push({ type: 'ring', at: { x: boss.x, y: boss.y }, col: COLORS.iai, t: 0, dur: 900, r0: 1, r1: 12, thick: true });
    flyText('撃破', 'kill', boss, 0.4);
    telegraphs = []; schedule = [];
  }

  // ---------------- 名前とフライテキスト（HTML。描き方に合わせて毎フレーム位置を直す）----------------
  let flies = [];
  const project = (x, y, z) => (view3d() ? R3.project(x, y, z) : R2D.project(x, y, z));
  function flyText(text, cls, at, lift = 0.2, col, dmg) {
    if (!overlay) return;
    const el = document.createElement('div');
    el.className = `fly ${cls}`;
    if (dmg) {
      // 技名とダメージを 1 行に（ゲームのフライテキストと同じ並び）
      if (text) { const n = document.createElement('span'); n.className = 'fn'; n.textContent = text; el.appendChild(n); }
      const d = document.createElement('span'); d.className = 'fd'; d.textContent = Math.round(dmg).toLocaleString('ja-JP'); el.appendChild(d);
    } else el.textContent = text;
    // 同じ相手に続けて出るときは、前の文字の上に積む（ゲームのフライテキストと同じ）
    const now = performance.now();
    const same = flies.filter((f) => f.at === at && now - f.t < 650).length;
    const who = at === boss ? 'boss' : at === tank ? 'tank' : 'player';
    const f = { el, at, z: HEAD[who] + lift, dx: (at === boss ? 54 : 0) + rand(-6, 6), dy: -40 - same * 26, t: now };
    if (col) el.style.setProperty('--glow', col[1]);
    el.addEventListener('animationend', () => { el.remove(); flies = flies.filter((q) => q !== f); });
    flies.push(f);
    overlay.appendChild(el);
    placeFly(f);
    while (flies.length > 14) { flies[0].el.remove(); flies.shift(); }
  }
  function placeFly(f) {
    const s = project(f.at.x, f.at.y, f.z);
    f.el.style.left = `${s.x + f.dx}px`;
    f.el.style.top = `${s.y + f.dy}px`;
    f.el.style.visibility = s.ok ? '' : 'hidden';
  }
  function placeName(el, e, z) {
    const s = project(e.x, e.y, z);
    el.style.left = `${s.x}px`; el.style.top = `${s.y}px`;
    el.style.visibility = s.ok ? '' : 'hidden';
  }

  // ---------------- 描画 ----------------
  // 人物のコマ: 動作 → ジャンプ → 詠唱 → 走り → 待機 の順に決める。yaw はカメラの向き（画面に対する向きでコマを選ぶ）
  function poseOf(kind, yaw) {
    const e = kind === 'boss' ? boss : kind === 'tank' ? tank : player;
    const set = SPR[kind];
    const dir = dirOf(e.face - yaw - Math.PI / 2);
    let anim = 'idle', t = clock + (kind === 'tank' ? 0.37 : kind === 'boss' ? 0.71 : 0), rot = 0;
    if (kind === 'player') {
      if (player.down > 0) { anim = 'hurt'; t = 0; rot = Math.PI / 2; }
      else if (player.act) { anim = player.act.name; t = player.act.t; }
      else if (player.jumpT >= 0) { anim = 'jump'; t = player.jumpT < 0.5 ? 0 : 1.01; }
      else if (castGlow) { anim = 'cast'; t = castGlow.t / 1000; }
      else if (player.moving) { anim = 'run'; t = player.walkT; }
    } else if (kind === 'tank') {
      if (tank.act) { anim = tank.act.name; t = tank.act.t; }
      else if (tank.moving) { anim = 'run'; t = tank.walkT; }
    } else if (boss.act) { anim = boss.act.name; t = boss.act.t; }
    else if (boss.casting) { anim = 'cast'; t = clock; }
    return { set, fr: window.MockSprites.frame(set, anim, dir, t), rot, dir };
  }

  function render(simT, phase) {
    if (view3d()) R3.render(simT);
    else R2D.render(simT);
    // 名前とフライテキスト
    placeName(bossName, boss, HEAD.boss + 0.7);
    bossName.hidden = boss.dead >= 2;
    placeName(tankName, tank, HEAD.tank + 0.35);
    tankName.hidden = !opts.tank;
    for (const f of flies) placeFly(f);
    void phase;
  }

  // 描画に渡す状態（配列は入れ替わるので getter で渡す）
  const STATE = {
    player, boss, tank, cam, POL, COLORS, HEAD,
    get stage() { return STG; }, get markers() { return opts.markers ?? STG.markers; },
    get opts() { return opts; }, get telegraphs() { return telegraphs; }, get fx() { return fx; }, get parts() { return parts; },
    get castGlow() { return castGlow; }, get guideNeed() { return guideNeed; }, get clock() { return clock; }, get SPR() { return SPR; },
    poseOf, inside, angDiff,
  };

  // ---------------- 2D（真上から。ドット絵を 2 倍で描く）----------------
  const R2D = (() => {
    const PX = 2, PPY = 10, Z2 = 2, FLOOR_Y = 120; // Z2: 高さの見え方（ドット絵の 1 ドットを 0.1m として描くため、高さも 2 倍）
    let cv = null, g = null, W = 640, H = 360, floorImg = null;
    const tint = new Map();
    let ox = 0, oy = 0;
    const sx = (x) => ox + x * PPY, sy = (y) => oy + y * PPY;
    function init(canvas) { cv = canvas; g = cv.getContext('2d'); setStage(STG); }
    function setStage(st) { if (g) floorImg = window.MockPixel.floor(FLOOR_Y, PPY, st); }
    // ステージの形で切り抜く
    function clipArena() {
      g.beginPath();
      if (STG.shape === 'square') g.rect(sx(-STG.size), sy(-STG.size), STG.size * 2 * PPY, STG.size * 2 * PPY);
      else g.arc(sx(0), sy(0), STG.size * PPY, 0, Math.PI * 2);
      g.clip();
    }
    function resize(w, h) {
      W = Math.round(w / PX); H = Math.round(h / PX);
      cv.width = W; cv.height = H;
      cv.style.width = `${W * PX}px`; cv.style.height = `${H * PX}px`;
    }
    const project = (x, y, z = 0) => ({ x: sx(x) * PX, y: (sy(y) - z * PPY * Z2) * PX, ok: true });
    // 色付きの影（被弾の赤）
    function tinted(set, color) {
      const key = `${set.fw}|${set.count}|${color}`;
      if (!tint.has(key)) {
        const c = document.createElement('canvas'); c.width = set.atlas.width; c.height = set.atlas.height;
        const t = c.getContext('2d'); t.drawImage(set.atlas, 0, 0); t.globalCompositeOperation = 'source-in'; t.fillStyle = color; t.fillRect(0, 0, c.width, c.height);
        tint.set(key, c);
      }
      return tint.get(key);
    }
    function drawFrame(set, fr, x, y, z, alpha = 1, img = set.atlas, rot = 0) {
      g.save();
      g.globalAlpha = alpha;
      g.translate(Math.round(sx(x)), Math.round(sy(y) - z * PPY * Z2));
      if (rot) g.rotate(-rot);
      if (fr.flip) g.scale(-1, 1);
      g.drawImage(img, fr.x, fr.y, fr.w, fr.h, -set.ax, -set.ay, fr.w, fr.h);
      g.restore();
    }
    function drawChar(kind) {
      const e = kind === 'boss' ? boss : kind === 'tank' ? tank : player;
      const P = poseOf(kind, CAM0.yaw);
      let alpha = 1, z = e.z ?? 0;
      if (kind === 'player' && player.down > 0) alpha = 0.6;
      if (kind === 'boss' && boss.dead) { const k = boss.dead - 1; if (k >= 1) return; alpha = 1 - k; z = -k * 1.5; }
      drawFrame(P.set, P.fr, e.x, e.y, z, alpha, P.set.atlas, P.rot);
      const flash = kind === 'boss' ? boss.flash * 0.85 : kind === 'tank' ? tank.flash * 0.5 : 0;
      if (flash > 0.02) drawFrame(P.set, P.fr, e.x, e.y, z, flash, P.set.flash, P.rot);
      const hurt = kind === 'boss' ? 0 : e.hurt;
      if (hurt > 0.02) drawFrame(P.set, P.fr, e.x, e.y, z, hurt * 0.75, tinted(P.set, '#ff4a3c'), P.rot);
      if (kind === 'boss' && boss.dead) drawFrame(P.set, P.fr, e.x, e.y, z, (2 - boss.dead) * 0.8, P.set.flash);
    }
    function render(simT) {
      if (!g) return;
      const sh = cam.shake > 0 ? [Math.round(rand(-cam.shake, cam.shake)), Math.round(rand(-cam.shake, cam.shake))] : [0, 0];
      ox = Math.round(W / 2 - cam.x * PPY) + sh[0]; oy = Math.round(H * 0.5 - cam.y * PPY) + sh[1];
      g.imageSmoothingEnabled = false;
      g.globalAlpha = 1; g.globalCompositeOperation = 'source-over';
      g.fillStyle = '#0e1712'; g.fillRect(0, 0, W, H);
      g.drawImage(floorImg, Math.round(ox - floorImg.width / 2), Math.round(oy - floorImg.height / 2));

      if (STATE.markers) drawMarkers();
      for (const tg of telegraphs) drawTelegraph(tg, simT);
      for (const e of fx) if (e.type === 'boom' && e.t >= 0) drawBoom(e);
      drawTargetRing();

      // 影と人物（奥から順に）
      const ents = [{ kind: 'boss', y: boss.y }, ...(opts.tank ? [{ kind: 'tank', y: tank.y }] : []), { kind: 'player', y: player.y }].sort((a, b) => a.y - b.y);
      for (const e of ents) drawShadow(e.kind);
      for (const t of player.trail) {
        const fr = window.MockSprites.frame(SPR.player, 'run', dirOf(t.face), 0.1);
        drawFrame(SPR.player, fr, t.x, t.y, 0, (t.life / t.max) * 0.5);
      }
      for (const e of ents) drawChar(e.kind);

      // 演出（加算）
      g.globalCompositeOperation = 'lighter';
      if (castGlow) drawCast();
      for (const e of fx) if (e.t >= 0) DRAW[e.type]?.(e);
      for (const q of parts) {
        g.globalAlpha = Math.min(1, (q.life / q.max) * 1.4);
        g.fillStyle = q.col;
        const s = (q.size ?? 1) * 2;
        g.fillRect(Math.round(sx(q.x) - s / 2), Math.round(sy(q.y) - q.z * PPY * Z2 - s / 2), s, s);
      }
      g.globalCompositeOperation = 'source-over'; g.globalAlpha = 1;
    }

    // フィールドマーカー（丸は A〜D、四角は 1〜4）
    function drawMarkers() {
      g.save();
      g.font = 'bold 22px sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
      for (const m of ST.MARKERS) {
        const p = ST.markerPos(STG, m), x = sx(p.x), y = sy(p.y), r = 1.3 * PPY;
        g.globalAlpha = 0.9; g.strokeStyle = m.color; g.lineWidth = 3;
        g.beginPath();
        if (m.shape === 'square') g.rect(x - r, y - r, r * 2, r * 2); else g.arc(x, y, r, 0, Math.PI * 2);
        g.stroke();
        g.globalAlpha = 0.18; g.fillStyle = m.color; g.fill();
        g.globalAlpha = 1; g.fillStyle = m.color; g.fillText(m.id, x, y + 1);
      }
      g.restore();
    }
    function drawShadow(kind) {
      const e = kind === 'boss' ? boss : kind === 'tank' ? tank : player;
      if (kind === 'boss' && boss.dead >= 2) return;
      const w = kind === 'boss' ? 26 : 12, h = kind === 'boss' ? 8 : 4;
      const shrink = kind === 'player' && player.z > 0 ? 1 - player.z * 0.25 : 1;
      g.fillStyle = 'rgba(0,0,0,.38)';
      g.beginPath(); g.ellipse(Math.round(sx(e.x)), Math.round(sy(e.y)), w * shrink, h * shrink, 0, 0, Math.PI * 2); g.fill();
    }

    // 敵のターゲットサークル: 当たり判定の円・正面の矢印・方向指定の区切り。ガイドがオンなら背面と側面を色分けする
    function drawTargetRing() {
      if (boss.dead) return;
      const cx = sx(boss.x), cy = sy(boss.y), R = POL.hitbox * PPY;
      if (opts.guide) {
        const zone = (a0, a1, col) => { g.fillStyle = col; g.beginPath(); g.moveTo(cx, cy); g.arc(cx, cy, R + 14, a0, a1); g.closePath(); g.fill(); };
        const f = boss.face, q = Math.PI / 4;
        const need = guideNeed;
        zone(f + Math.PI - q, f + Math.PI + q, need === 'rear' ? 'rgba(110,255,150,.32)' : 'rgba(110,255,150,.10)');
        zone(f + q, f + 3 * q, need === 'flank' ? 'rgba(255,220,90,.30)' : 'rgba(255,220,90,.09)');
        zone(f - 3 * q, f - q, need === 'flank' ? 'rgba(255,220,90,.30)' : 'rgba(255,220,90,.09)');
      }
      g.strokeStyle = 'rgba(255,90,60,.95)'; g.lineWidth = 2;
      g.beginPath(); g.arc(cx, cy, R, 0, Math.PI * 2); g.stroke();
      g.fillStyle = '#ff5a3c';
      for (const k of [1, 3, 5, 7]) {
        const a = boss.face + (k * Math.PI) / 4;
        g.fillRect(Math.round(cx + Math.cos(a) * R) - 2, Math.round(cy + Math.sin(a) * R) - 2, 4, 4);
      }
      // 正面の矢印
      const a = boss.face, tip = R + 8;
      g.beginPath();
      g.moveTo(cx + Math.cos(a) * tip, cy + Math.sin(a) * tip);
      g.lineTo(cx + Math.cos(a + 0.28) * (R + 1), cy + Math.sin(a + 0.28) * (R + 1));
      g.lineTo(cx + Math.cos(a - 0.28) * (R + 1), cy + Math.sin(a - 0.28) * (R + 1));
      g.closePath(); g.fill();
    }

    function tgPath(tg, scale) {
      const cx = sx(tg.c.x), cy = sy(tg.c.y);
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
          const c = Math.cos(tg.dir), s = Math.sin(tg.dir), sgn = tg.side === 'right' ? 1 : -1, F = 400;
          const nx = -s * sgn, ny = c * sgn; // 危ない側への向き
          g.moveTo(cx - c * F, cy - s * F); g.lineTo(cx + c * F, cy + s * F);
          g.lineTo(cx + c * F + nx * F * scale, cy + s * F + ny * F * scale); g.lineTo(cx - c * F + nx * F * scale, cy - s * F + ny * F * scale); g.closePath();
          break;
        }
        default: break;
      }
    }
    function drawTelegraph(tg, simT) {
      if (simT < tg.start || tg.done) return;
      if (tg.follow && !tg.placed) return;
      const p = Math.min(1, (simT - tg.start) / (tg.end - tg.start));
      g.save();
      clipArena(); // 練習場の外には描かない
      g.fillStyle = 'rgba(255,120,40,.22)'; tgPath(tg, 1); g.fill('evenodd');
      g.fillStyle = 'rgba(255,150,70,.28)'; tgPath(tg, p); g.fill('evenodd'); // 詠唱の進み具合で満ちていく
      g.strokeStyle = 'rgba(255,196,130,.95)'; g.lineWidth = 2; tgPath(tg, 1); g.stroke();
      g.restore();
    }
    function drawBoom(e) {
      const k = 1 - e.t / e.dur;
      g.save();
      clipArena();
      g.fillStyle = `rgba(255,236,190,${0.55 * k})`; tgPath(e.tg, 1); g.fill('evenodd');
      g.restore();
    }

    function drawCast() {
      const p = Math.min(1, castGlow.t / castGlow.dur), cx = sx(player.x), cy = sy(player.y);
      g.globalAlpha = 0.35 + 0.4 * p; g.strokeStyle = castGlow.col[1]; g.lineWidth = 2;
      g.beginPath(); g.ellipse(cx, cy, 18 - 8 * p, 7 - 3 * p, 0, 0, Math.PI * 2); g.stroke();
      g.globalAlpha = 1;
    }

    const DRAW = {
      arc(e) {
        const p = e.t / e.dur, cx = sx(e.target.x), cy = sy(e.target.y) - e.h * PPY * Z2 * 0.6;
        const head = Math.min(1, p * 2.2), tail = Math.max(0, p * 1.6 - 0.6);
        const steps = 26;
        for (let i = 0; i <= steps; i++) {
          const u = tail + ((head - tail) * i) / steps;
          const a = e.a0 + e.span * u, r = e.r * PPY;
          const x = Math.round(cx + Math.cos(a) * r), y = Math.round(cy + Math.sin(a) * r * 0.55 + Math.cos(a) * r * e.tilt * 0.3);
          g.globalAlpha = (1 - p) * (0.4 + 0.6 * (i / steps));
          g.fillStyle = e.col[1]; g.fillRect(x - 2, y - 2, 5, 5);
          g.fillStyle = e.col[0]; g.fillRect(x - 1, y - 1, 2, 2);
        }
      },
      ring(e) {
        const p = e.t / e.dur, at = e.at, cx = sx(at.x), cy = sy(at.y);
        const r = (e.r0 + (e.r1 - e.r0) * (1 - Math.pow(1 - p, 3))) * PPY;
        g.globalAlpha = (1 - p) * 0.9; g.strokeStyle = e.col[1]; g.lineWidth = e.thick ? 4 : 2;
        g.beginPath(); g.ellipse(cx, cy, r, r, 0, 0, Math.PI * 2); g.stroke();
        g.lineWidth = 1;
      },
      pillar(e) {
        const p = e.t / e.dur, cx = sx(e.at.x), cy = sy(e.at.y);
        g.globalAlpha = (1 - p) * 0.5; g.fillStyle = e.col[1];
        g.fillRect(cx - 10, cy - 60 * Math.min(1, p * 3), 20, 60 * Math.min(1, p * 3));
      },
      cone(e) {
        const p = e.t / e.dur, cx = sx(player.x), cy = sy(player.y);
        const dir = Math.atan2(boss.y - player.y, boss.x - player.x), R = (e.r + POL.hitbox) * PPY * Math.min(1, p * 1.8);
        g.globalAlpha = (1 - p) * 0.55; g.fillStyle = e.col[1];
        g.beginPath(); g.moveTo(cx, cy); g.arc(cx, cy, R, dir - 0.62, dir + 0.62); g.closePath(); g.fill();
        g.globalAlpha = (1 - p) * 0.9; g.strokeStyle = e.col[0]; g.lineWidth = 2;
        g.beginPath(); g.arc(cx, cy, R, dir - 0.62, dir + 0.62); g.stroke();
      },
      line(e) {
        const p = e.t / e.dur, cx = sx(player.x), cy = sy(player.y);
        const dir = Math.atan2(boss.y - player.y, boss.x - player.x), L = e.len * PPY * Math.min(1, p * 3), w = Math.max(2, 10 * (1 - p));
        g.save(); g.translate(cx, cy); g.rotate(dir);
        g.globalAlpha = (1 - p) * 0.7; g.fillStyle = e.col[1]; g.fillRect(0, -w, L, w * 2);
        g.globalAlpha = 1 - p; g.fillStyle = e.col[0]; g.fillRect(0, -2, L, 4);
        g.restore();
      },
      proj(e) {
        const p = Math.min(1, e.t / e.dur);
        const x = sx(player.x + (boss.x - player.x) * p), y = sy(player.y + (boss.y - player.y) * p) - 24;
        g.globalAlpha = 1; g.fillStyle = e.col[1]; g.fillRect(Math.round(x) - 6, Math.round(y) - 2, 12, 5);
        g.fillStyle = e.col[0]; g.fillRect(Math.round(x) - 2, Math.round(y), 5, 2);
      },
      flash(e) {
        const p = e.t / e.dur, cx = sx(e.at.x), cy = sy(e.at.y) - e.at.z * PPY * Z2 * 0.5;
        const r = 30 * (e.power ?? 1) * (0.6 + p);
        const gr = g.createRadialGradient(cx, cy, 0, cx, cy, r);
        gr.addColorStop(0, e.col[0]); gr.addColorStop(1, 'rgba(0,0,0,0)');
        g.globalAlpha = (1 - p) * 0.35; g.fillStyle = gr; g.fillRect(cx - r, cy - r, r * 2, r * 2);
      },
    };
    return { init, resize, project, render, setStage };
  })();

  window.MockArena = {
    init, resize, reset, setInput, jump, update, render, setView,
    view: () => (view3d() ? '3d' : '2d'), error3d: () => r3err, camera,
    edgeDistance, positional, faceTarget, dashToTarget, backstep, bossCast,
    isMoving: () => player.moving, isDown: () => player.down > 0, hp: () => player.hp,
    tankHp: () => (opts.tank ? Math.max(0, tank.hp - tank.flash * 0.04) : 0), // タンクの HP（範囲攻撃で減り、少しずつ戻る。通常攻撃で少し揺れる）
    setGuide: (need) => { guideNeed = need; },
    play, castStart, castEnd, dotTick, kill, flyText: (t, cls) => flyText(t, cls, player, 0.2),
    on: (ev, fn) => { handlers[ev] = fn; },
    options: () => ({ ...opts }), POL, MECH,
    // 動作確認用
    stage: () => STG, stages: () => ST.list,
    debug: () => ({ stage: STG.id, tankHits: tank.hits, tank: { x: tank.x, y: tank.y }, boss: { x: boss.x, y: boss.y, face: boss.face }, player: { x: player.x, y: player.y, face: player.face }, telegraphs: telegraphs.length, view: view3d() ? '3d' : '2d', cam: { ...cam }, r3: R3?.debug?.() ?? null }),
  };
})();
