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
    holy: ['#fffbe8', '#ffe08a'], heal: ['#f0fff4', '#6fe89a'],
    lily: ['#f4ffff', '#6fe6e0'], dome: ['#eef8ff', '#7ab8ff'], // リタージー・オブ・ベル（水色のガラス）・アサイラム（青白いドーム）
    star: ['#f4f8ff', '#7aa8ff'], giant: ['#fff8e0', '#ffc86a'], // アーサリースター（青い星 → 巨星は金）
  };
  const MECH = {
    circle: { name: '大旋風', hint: '敵の周囲に円形範囲。離れる' },
    donut: { name: '月輪', hint: 'ドーナツ範囲。敵に近づく' },
    cleave: { name: '薙ぎ払い', hint: '敵の前方に扇範囲。背面・側面へ' },
    puddle: { name: '地裂き', hint: '足元に続けて円。動き続ける' },
    line: { name: '一閃', hint: 'あなたへ向けた直線範囲。横へよける' },
    half: { name: '半月斬', hint: '敵の左右どちらか半面。反対側へ' },
    raid: { name: '全体攻撃', hint: 'よけられない全体への攻撃。HP を戻しておく（リタージー・オブ・ベルが鳴る）' },
    turn: { name: '（タンクが敵の向きを変える）' },
    relocate: { name: '（タンクが敵を移動させる）' },
  };
  // 頭の高さ（m。名前とフライテキストの位置）
  const HEAD = { player: 2.7, tank: 2.8, boss: 4.6 };
  // 役割（自分のジョブのロール）: melee（侍）/ tank（ナイト。敵はあなたを狙い、相方は回復役）/ healer（白魔道士。相方のタンクを回復する）。
  // 相方（npc）の見た目: タンクならナイト、回復役なら白魔道士。数値は練習用の仮（DESIGN-06）
  const ROLE_POL = { bossHit: 0.04, npcHeal: 0.08, tankHit: 0.06 }; // 敵の通常攻撃で減る HP・相方の回復量（最大 HP に対して）

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
  const boss = { x: 0, y: -2, face: -Math.PI / 2, flash: 0, goal: null, dead: 0, act: null, casting: false, atkT: 0 };
  // タンクは敵の斜め前（真上だと敵の体に隠れて見えないため、少し左に寄せる）
  const TANK_ANGLE = -Math.PI / 2 - 0.55;
  const tank = { x: 0, y: -6.2, angle: TANK_ANGLE, face: Math.PI / 2, walkT: 0, moving: false, hitT: 1.4, flash: 0, hp: 1, hurt: 0, wanderT: 0, hits: 0, deaths: 0, down: 0, act: null };
  let opts = { tank: true, mech: 'normal', guide: true, seed: 1, durationMs: 120000, tankSkill: 'good', stage: 'dojo', markers: null, role: 'melee', job: 'SAM' };
  let hots = []; // 継続回復（リジェネなど）: { e（かけた相手）, frac, until, next, name }
  // 設置型の技（白魔道士のアサイラム・リタージー・オブ・ベル）: { kind, x, y, r, until（試合の時刻）, frac, next, dying, endAt, ringAt, pops（弾けた鈴の花の時刻）}
  let zones = [], simNow = 0;
  let aim = null; // 地面指定の技を置く場所を選んでいる間のターゲットサークル: { x, y, r, ok }
  const BELL_H = 2.7; // リタージー・オブ・ベルの花の中心の高さ（m。見た目。sprites.js の LILY と合わせる）
  // 見た目の組（sprites.js）: 自分はジョブ、相方は役割で決まる
  const PLAYER_SET = { SAM: 'player', PLD: 'tank', WHM: 'whm', AST: 'ast', BLM: 'blm' };
  const setName = (kind) => (kind === 'boss' ? 'boss' : kind === 'player' ? PLAYER_SET[opts.job] ?? 'player' : npcHealer() ? 'whm' : 'tank');
  const npcHealer = () => opts.role === 'tank'; // 自分がタンクなら、相方は回復役
  const hasNpc = () => opts.role !== 'melee' || opts.tank; // 回復役・タンクのときは相方がいつもいる
  let rndTank = Math.random;
  let schedule = [], telegraphs = [], fx = [], parts = [];
  let castGlow = null, guideNeed = null, clock = 0;
  const handlers = {};
  const emit = (ev, ...a) => handlers[ev]?.(...a);
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

  let SPR = null;
  let overlay = null, bossName = null, tankName = null, selfName = null;
  // ターゲット: 'boss'（敵）/ 'player'（自分）/ 'tank'（相方）/ null。名前の上の ▼ と、味方なら足元の輪で示す
  let target = 'boss';
  let view = '3d', quality = 'high', R3 = null, r3err = null, canvas2d = null, canvas3d = null;
  let stageW = 1280, stageH = 720, pixelRatio = 1;

  function init(o) {
    canvas2d = o.canvas; canvas3d = o.canvas3d ?? null;
    overlay = o.overlay;
    SPR = window.MockSprites.build();
    R2D.init(canvas2d);
    bossName = document.createElement('div'); bossName.className = 'wname boss'; bossName.innerHTML = '<span class="cursor">▼</span>からくり木人';
    tankName = document.createElement('div'); tankName.className = 'wname tank'; tankName.innerHTML = '<span class="cursor">▼</span><span class="nm">タンク</span>';
    selfName = document.createElement('div'); selfName.className = 'wname self'; selfName.innerHTML = '<span class="cursor">▼</span><span class="nm">あなた</span>';
    overlay.append(bossName, tankName, selfName);
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
    if (opts.role === 'healer') {
      // 回復役の練習: よけられない全体攻撃（練習用に作ったもの。DESIGN-02）。ほかの技の並びは変えない（乱数は最後に使う）
      for (let t = 15000; t < opts.durationMs - 6000; t += 23000 + Math.floor(rnd() * 6000)) out.push({ t, kind: 'raid', cast: 3000 });
    }
    if (bossHasTank()) {
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
    Object.assign(boss, { x: 0, y: -2, face: -Math.PI / 2, flash: 0, goal: null, dead: 0, act: null, casting: false, atkT: 0 });
    Object.assign(tank, { angle: TANK_ANGLE, walkT: 0, moving: false, hitT: 1.4, flash: 0, hp: 1, hurt: 0, wanderT: 0, hits: 0, deaths: 0, down: 0, act: null });
    rndTank = window.MockPixel.rng((opts.seed ?? 1) * 7919 + 13);
    hots = []; zones = []; target = 'boss';
    for (const e of [player, tank]) { e.shield = 0; e.shieldUntil = 0; e.mits = []; e.marks = []; }
    placeTank(true);
    if (!bossHasTank()) boss.face = Math.PI / 2;
    tankName.querySelector('.nm').textContent = npcHealer() ? 'ヒーラー' : 'タンク';
    cam.x = player.x; cam.y = player.y - 2; cam.shake = 0;
    schedule = buildSchedule(); telegraphs = []; fx = []; parts = []; castGlow = null;
    for (const f of flies) f.el.remove();
    flies = [];
  }

  // 敵を引きつける相方がいるか（相方がタンクのとき）
  const bossHasTank = () => hasNpc() && !npcHealer() && !(tank.down > 0);
  function placeTank(snap) {
    if (npcHealer()) {
      // 回復役の相方: 自分（タンク）の後ろ、敵から 11m ほどの所に立つ
      const a = Math.atan2(player.y - boss.y, player.x - boss.x), r = Math.max(9, Math.hypot(player.x - boss.x, player.y - boss.y) + 6);
      const g = { x: boss.x + Math.cos(a + 0.5) * r, y: boss.y + Math.sin(a + 0.5) * r };
      ST.clamp(STG, g, 1.5);
      if (snap) { tank.x = g.x; tank.y = g.y; }
      return g;
    }
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
    else if (live && opts.role === 'melee') player.hp = Math.min(1, player.hp + POL.regen * dt); // 近接: ヒーラーの回復の代わりに少しずつ戻る
    // 継続回復（リジェネなど。3 秒ごと）
    // かけた相手に固定（かけた後で HP の低い方に移ったりしない）。回復のたびに小さく「+N%」を出す
    for (const h of hots) {
      while (h.next <= clock && h.next <= h.until) { h.next += 3; healOne(h.e, h.frac, 'tick'); }
      // かかっている間、足元から緑の粒がときどき昇る（リジェネがかかっていると分かるように）
      if (h.until > clock && Math.random() < vdt * 6) {
        const a = rand(0, Math.PI * 2), r = rand(0.3, 0.9);
        spark({ x: h.e.x + Math.cos(a) * r, y: h.e.y + Math.sin(a) * r, z: rand(0, 0.4), vz: rand(0.8, 1.6), g: 0, drag: 0.6, life: rand(0.7, 1.1), max: 1.1, col: Math.random() < 0.5 ? '#b9ffc8' : '#5fe08a', size: 1, shape: 2, rot: rand(0, 6.28), spin: rand(-2, 2) });
      }
    }
    simNow = simT;
    updateZones(simT, live, vdt);
    hots = hots.filter((h) => h.next <= h.until);
    player.hurt = Math.max(0, player.hurt - vdt * 2.5);
    player.trail = player.trail.filter((t) => (t.life -= vdt) > 0);

    // 敵とタンク
    if (boss.goal) {
      const d = dist(boss, boss.goal);
      if (d < 0.1) boss.goal = null;
      else { const s = Math.min(d, POL.bossSpeed * dt); boss.x += ((boss.goal.x - boss.x) / d) * s; boss.y += ((boss.goal.y - boss.y) / d) * s; }
    } else if (!bossHasTank() && live && player.down <= 0) {
      // タンクがいないとき（自分がタンクのときも）は、敵が自分を追いかける
      const d = dist(boss, player);
      if (d > POL.hitbox + 1.8) { const s = Math.min(d - POL.hitbox - 1.8, POL.bossSpeed * dt); boss.x += ((player.x - boss.x) / d) * s; boss.y += ((player.y - boss.y) / d) * s; }
    }
    // 向きのある技（扇・直線・半面）を詠唱している間は、敵はその向きのまま
    const lock = telegraphs.find((tg) => !tg.done && tg.lockFace && simT >= tg.start);
    boss.casting = telegraphs.some((tg) => !tg.done && !tg.puddle && simT >= tg.start);
    if (bossHasTank()) {
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
      walkTo(tank, goal, 0.15, dt);
      tank.face = Math.atan2(boss.y - tank.y, boss.x - tank.x);
      if (lock) turnBossTo(lock.dir, dt);
      else turnBossTo(Math.atan2(tank.y - boss.y, tank.x - boss.x), dt);
      // タンクの HP: 回復役があなたなら自然には戻らない（あなたの回復が要る）。それ以外は少しずつ戻る
      if (live && opts.role !== 'healer') tank.hp = Math.min(1, tank.hp + POL.regen * 1.5 * dt);
      // タンクの攻撃（見た目だけ）
      if (live && phase === 'combat' && !boss.dead) {
        tank.hitT -= dt;
        if (tank.hitT <= 0) { tank.hitT = 2.5; act(tank, 'slash'); setTimeout(() => sparks(boss, COLORS.steel, 5, 0.7), 170); }
      }
    } else if (lock) {
      turnBossTo(lock.dir, dt);
    } else {
      turnBossTo(Math.atan2(player.y - boss.y, player.x - boss.x), dt);
    }
    if (npcHealer()) {
      // 回復役の相方: 自分の後ろについて歩き、範囲攻撃をよけ、ときどき回復してくれる
      let goal = placeTank(false);
      if (telegraphs.some((tg) => !tg.done && simT >= tg.start + 600 && (!tg.follow || tg.placed) && (inside(tg, goal) || inside(tg, tank)))) goal = safeNear(goal) ?? goal;
      walkTo(tank, goal, 0.3, dt);
      tank.face = Math.atan2(player.y - tank.y, player.x - tank.x);
      if (live && phase === 'combat' && !boss.dead) {
        tank.hitT -= dt;
        if (tank.hitT <= 0) { tank.hitT = 3; if (player.hp < 0.9 && player.down <= 0) { act(tank, 'spell'); setTimeout(() => healNow('self', ROLE_POL.npcHeal), 300); } }
      }
    }
    // 相方のタンクが倒れている（回復が間に合わなかった）: レイズで起こせる。起こさなくても 20 秒で起き上がる（練習を続けるための仮の動き）
    if (tank.down > 0) { tank.down -= dtMs; if (tank.down <= 0) { tank.hp = 0.5; flyText('復帰', 'buff', tank, 0.2); emit('tankrevive', 'self'); } }
    // 敵の通常攻撃: 敵が腕を振り下ろす。相手はタンク（相方）か、自分がタンクのとき・相方のタンクが倒れているときは自分
    if (live && phase === 'combat' && !boss.dead) {
      boss.atkT -= dt;
      if (boss.atkT <= 0) {
        boss.atkT = 2.8;
        const target = bossHasTank() ? tank : npcHealer() || tank.down > 0 ? player : null;
        if (target) {
          if (!boss.casting) act(boss, 'slam');
          setTimeout(() => autoHit(target), 180);
        }
      }
    }
    tank.hurt = Math.max(0, tank.hurt - vdt * 2.5);
    tank.flash = Math.max(0, tank.flash - vdt * 4);
    boss.flash = Math.max(0, boss.flash - vdt * 5);
    if (boss.dead) boss.dead = Math.min(2, boss.dead + vdt / 0.9);
    // 敵の詠唱中: まわりから光の粒が集まる
    if (boss.casting && !boss.dead && vdt > 0) {
      const n = Math.round(vdt * 55 + Math.random() * 0.6);
      for (let i = 0; i < n; i++) {
        const a = rand(0, Math.PI * 2), r = rand(3.2, 5.5), h = rand(0.2, 3.6);
        const tx = boss.x, ty = boss.y, tz = 2.4, k = 1 / 0.55;
        spark({ x: boss.x + Math.cos(a) * r, y: boss.y + Math.sin(a) * r, z: h, vx: (tx - (boss.x + Math.cos(a) * r)) * k, vy: (ty - (boss.y + Math.sin(a) * r)) * k, vz: (tz - h) * k, g: 0, drag: 0, life: 0.5, max: 0.5, col: i % 3 ? '#ff9a4a' : '#ffe0a0', size: 1 });
      }
    }
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
      if (q.spin) q.rot = (q.rot ?? 0) + q.spin * vdt;
      if (q.sway) { q.vx += Math.sin(clock * 3 + q.rot) * q.sway * vdt; q.vz = Math.max(q.vz, -0.9); }
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

  // 回復役の相方がよける先: 今の立ち位置の近くで、予兆の外
  function safeNear(home) {
    let best = null, bestScore = Infinity;
    for (const r of [0, 2, 4, 6, 8, 11, 14]) {
      for (let k = 0; k < (r ? 16 : 1); k++) {
        const a = (k / 16) * Math.PI * 2, q = { x: home.x + Math.cos(a) * r, y: home.y + Math.sin(a) * r };
        if (!ST.inside(STG, q.x, q.y, 1)) continue;
        if (telegraphs.some((tg) => !tg.done && (!tg.follow || tg.placed) && inside(tg, q))) continue;
        const score = r + dist(q, tank) * 0.5;
        if (score < bestScore) { bestScore = score; best = q; }
      }
    }
    return best;
  }
  function walkTo(e, goal, eps, dt) {
    const d = dist(e, goal);
    e.moving = d > eps && dt > 0 && !(e.down > 0);
    if (!e.moving) return;
    const s = Math.min(d, POL.run * dt);
    e.x += ((goal.x - e.x) / d) * s; e.y += ((goal.y - e.y) / d) * s; e.walkT += dt;
  }
  // 敵の通常攻撃が当たる（相方のタンクは盾で受ける。回復役があなたなら HP が減る）
  function autoHit(target) {
    if (target === tank) {
      if (tank.down > 0) return;
      tank.flash = 1; act(tank, 'hurt', 0.25); addArc(tank, COLORS.kenki, 0.6, 1.2, 1.4);
      if (opts.role === 'healer') {
        tank.hp = Math.max(0, tank.hp - soak(tank, ROLE_POL.tankHit));
        if (tank.hp <= 0) { tank.down = 20000; tank.deaths++; flyText('戦闘不能', 'hurt tank', tank, 0.4); emit('tankdown'); }
      }
      return;
    }
    if (player.down > 0) return;
    hurtPlayer(ROLE_POL.bossHit, '通常攻撃', null, 0.05, false);
    player.hurt = 0.5;
    addArc(player, COLORS.kenki, 0.6, 1.2, 1.4);
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
      case 'raid': Object.assign(tg, { c: { x: boss.x, y: boss.y } }); break; // 床に予兆は出ない（敵の詠唱バーだけ）
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
      case 'raid': return true;
      default: return false;
    }
  }

  function resolve(tg, simT) {
    tg.done = true;
    emit('boom', tg.kind);
    if (!tg.puddle) act(boss, 'slam');
    if (tg.kind === 'raid') {
      // 全体攻撃: 全員が受ける（被弾の数には入れない）
      raidFx();
      hurtNpc(0.2);
      hurtPlayer(0.18, tg.name, '全体攻撃');
      emit('raid', tg.name);
      return;
    }
    boomFx(tg);
    if (hasNpc() && tank.hp > 0 && !(tank.down > 0) && inside(tg, tank)) { tank.hp = Math.max(0.1, tank.hp - soak(tank, tg.puddle ? 0.2 : 0.35)); tank.hurt = 1; tank.hits++; act(tank, 'hurt', 0.4); flyText('被弾', 'hurt tank', tank, 0.2); }
    if (player.down > 0 || !inside(tg, player)) return;
    if (!reduce) cam.shake = 5;
    hurtPlayer(tg.puddle ? 0.3 : 0.45, tg.name, '被弾');
    emit('hit', tg.name);
    void simT;
  }
  // 自分が攻撃を受ける（範囲攻撃・全体攻撃・敵の通常攻撃）。'hurt' を出す（リタージー・オブ・ベルが鳴る）
  function hurtPlayer(frac, name, text, floor = 0, anim = true) {
    if (player.down > 0) return;
    frac = soak(player, frac);
    player.hp = Math.max(floor, player.hp - frac); player.hurt = 1;
    if (anim) act(player, 'hurt', 0.45);
    if (text) flyText(text, 'hurt', player, 0.2);
    emit('hurt', frac);
    if (player.hp <= 0) { player.hp = 0; player.down = 3000; flyText('戦闘不能', 'hurt', player, 0.6); emit('down', name); }
  }
  // 相方が攻撃を受ける（全体攻撃）。回復役の練習では、相方のタンクが倒れることがある
  function hurtNpc(frac) {
    if (!hasNpc() || tank.down > 0 || tank.hp <= 0) return;
    const f2 = soak(tank, frac);
    tank.hp = Math.max(opts.role === 'healer' ? 0 : 0.1, tank.hp - f2); tank.hurt = 1; act(tank, 'hurt', 0.4);
    flyText(`-${Math.round(f2 * 100)}%`, 'hurt tank', tank, 0.2);
    if (tank.hp <= 0) { tank.down = 20000; tank.deaths++; flyText('戦闘不能', 'hurt tank', tank, 0.4); emit('tankdown'); }
  }
  // 全体攻撃の演出: 敵から赤い衝撃の輪が練習場の端まで広がる
  function raidFx() {
    const c = { x: boss.x, y: boss.y };
    fx.push({ type: 'flash', at: { x: c.x, y: c.y, z: 2.4 }, col: ['#ffe6d6', '#ff5a3a'], t: 0, dur: 700, power: 2.2 });
    for (let i = 0; i < 3; i++) fx.push({ type: 'ring', at: c, col: ['#ffd9c0', '#ff4a2a'], t: -i * 140, dur: 950, r0: 2, r1: STG.size * 1.45, thick: true });
    fx.push({ type: 'pillar', at: c, col: ['#fff0e6', '#ff5a3a'], t: 0, dur: 700, big: true });
    for (let i = 0; i < 70; i++) {
      const a = rand(0, Math.PI * 2), sp = rand(6, 16);
      spark({ x: c.x + Math.cos(a) * 2, y: c.y + Math.sin(a) * 2, z: rand(0.3, 2.5), vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, vz: rand(0, 3), g: 4, drag: 1.4, life: rand(0.5, 1.1), max: 1.1, col: i % 3 ? '#ff7a4a' : '#ffe0c8', size: i % 5 ? 1 : 2 });
    }
    if (!reduce) cam.shake = Math.max(cam.shake, 4);
  }

  // ---------------- 回復（白魔道士の回復・相方の回復役）----------------
  // who: 'party'（自分と相方）/ 'low'（HP の低い方）/ 'self'。frac は最大 HP に対する割合
  function healNow(who, frac, quiet) {
    for (const e of partyOf(who)) healOne(e, frac, quiet);
  }
  // 被ダメージ軽減（アクアヴェール・テンパランスなど）とバリア（ディヴァインベニゾンなど）を通したダメージ
  function soak(e, frac) {
    e.mits = (e.mits ?? []).filter((m) => m.until > clock);
    for (const m of e.mits) frac *= 1 - m.pct;
    if (e.shield > 0 && e.shieldUntil > clock) {
      const used = Math.min(e.shield, frac);
      e.shield -= used; frac -= used;
      if (used > 0.001) flyText('バリア', 'buff', e, 0.35);
    }
    return frac;
  }
  // 相手: 'party' 全員 / 'self' 自分 / 'npc' 相方（マクロの <2> など）/ それ以外 HP の低い方
  function partyOf(who) { return who === 'party' ? [player, ...(hasNpc() ? [tank] : [])] : who === 'self' ? [player] : who === 'npc' ? (hasNpc() ? [tank] : [player]) : [lowest()]; }
  // name: ステータスの名前（パーティリストのアイコン表示に使う）
  function shieldOn(who, frac, sec, name = 'バリア') {
    for (const e of partyOf(who)) {
      if (!e || (e === tank && tank.down > 0)) continue;
      e.shield = Math.max(e.shield > 0 && e.shieldUntil > clock ? e.shield : 0, frac); e.shieldUntil = clock + sec; e.shieldName = name;
      fx.push({ type: 'ring', at: e, col: ['#f4fbff', '#8fd0ff'], t: 0, dur: 600, r0: 0.4, r1: 1.8, thick: true });
      flyText('バリア', 'buff', e, 0.2);
    }
  }
  function mitigateOn(who, pct, sec, name = '被ダメージ軽減') {
    for (const e of partyOf(who)) {
      if (!e || (e === tank && tank.down > 0)) continue;
      e.mits = (e.mits ?? []).filter((m) => m.until > clock && m.name !== name); // 同じ効果はかけ直し
      e.mits.push({ pct, until: clock + sec, name });
      fx.push({ type: 'ring', at: e, col: ['#fffbe8', '#b8e0ff'], t: 0, dur: 520, r0: 0.3, r1: 1.4 });
    }
  }
  // quiet: true = 表示なし、'tick' = 継続回復の 1 回（小さい数字と粒）
  function hotOn(who, frac, sec, name = '継続回復') {
    for (const e of partyOf(who)) {
      if (!e || (e === tank && (tank.hp <= 0 || tank.down > 0))) continue;
      hots = hots.filter((h) => !(h.e === e && h.name === name)); // かけ直しは上書き
      hots.push({ e, frac, until: clock + sec, next: clock + 3, name });
      fx.push({ type: 'ring', at: e, col: COLORS.heal, t: 0, dur: 600, r0: 0.3, r1: 1.6 });
      flyText(name, 'buff', e, 0.2);
    }
  }
  // パーティリストに出す、相方・自分に付いている回復役の効果（継続回復・バリア・軽減）。until は秒（練習場の時計）
  // 味方に付けた効果（カードの与ダメージ上昇・受ける回復アップなど）。o.healUp: 受ける回復の割合の上乗せ
  function markOn(who, name, sec, o = {}) {
    for (const e of partyOf(who)) {
      if (!e || (e === tank && tank.down > 0)) continue;
      e.marks = (e.marks ?? []).filter((m) => m.until > clock && m.name !== name);
      e.marks.push({ name, until: clock + sec, ...o });
      fx.push({ type: 'ring', at: e, col: COLORS.buff, t: 0, dur: 600, r0: 0.3, r1: 1.6 });
      flyText(name, 'buff', e, 0.2);
    }
  }
  function partyStatus(which) {
    const e = which === 'npc' ? tank : player;
    const out = [];
    for (const m of e.marks ?? []) if (m.until > clock) out.push({ name: m.name, left: m.until - clock, kind: 'buff' });
    for (const h of hots) if (h.e === e && h.until > clock) out.push({ name: h.name, left: h.until - clock, kind: 'hot' });
    if (e.shield > 0.001 && e.shieldUntil > clock) out.push({ name: e.shieldName ?? 'バリア', left: e.shieldUntil - clock, kind: 'shield' });
    for (const m of e.mits ?? []) if (m.until > clock) out.push({ name: m.name, left: m.until - clock, kind: 'mit' });
    return out;
  }
  function healOne(e, frac, quiet) {
    if (!e || (e === player && player.down > 0) || (e === tank && (tank.hp <= 0 || tank.down > 0))) return false;
    // アサイラムの中にいると、受ける回復が 10% 上がる（説明文「受けるＨＰ回復効果が10％上昇する」）
    if (zones.some((z) => z.kind === 'asylum' && !z.dying && Math.hypot(e.x - z.x, e.y - z.y) <= z.r)) frac *= 1.1;
    for (const m of e.marks ?? []) if (m.until > clock && m.healUp) frac *= 1 + m.healUp; // オシュオンの矢（受ける回復 +10%）
    const before = e.hp;
    e.hp = Math.min(1, e.hp + frac);
    healFx(e, quiet);
    if (quiet === 'tick' && e.hp - before > 0.0005) flyText(`+${Math.round((e.hp - before) * 1000) / 10}%`, 'heal hot', e, 0.05);
    if (!quiet) { flyText(`+${Math.round((e.hp - before) * 100)}%`, 'heal', e, 0.1); fx.push({ type: 'pillar', at: e, col: COLORS.heal, t: 0, dur: 650 }); }
    return true;
  }
  const lowest = () => (hasNpc() && tank.hp > 0 && !(tank.down > 0) && tank.hp < player.hp ? tank : player);
  // ---------------- 設置型の技 ----------------
  // 置き場所: ゲームでは地面を選ぶ。モックは、自分と相方の両方が入る所（2 人の間。遠ければ相方寄り）に置く
  function zonePlace(r) {
    if (hasNpc() && !(tank.down > 0)) {
      const d = dist(player, tank);
      if (d / 2 <= r * 0.8) return ST.clamp(STG, { x: (player.x + tank.x) / 2, y: (player.y + tank.y) / 2 }, 1);
      const k = (r * 0.8) / d;
      return ST.clamp(STG, { x: tank.x + (player.x - tank.x) * k, y: tank.y + (player.y - tank.y) * k }, 1);
    }
    return { x: player.x, y: player.y };
  }
  // 自分の横（敵の方を向いて左）に d m
  function besidePlayer(d) {
    const a = Math.atan2(boss.y - player.y, boss.x - player.x);
    return ST.clamp(STG, { x: player.x + Math.cos(a - Math.PI / 2) * d, y: player.y + Math.sin(a - Math.PI / 2) * d }, 1);
  }
  // o: { r（範囲 m）, sec（効果時間）, frac（アサイラムの 1 回の回復。最大 HP に対して）}
  function placeZone(kind, o = {}) {
    for (const z of zones) if (z.kind === kind && !z.dying) { z.dying = true; z.endAt = clock; } // 置き直すと前のものは消える
    // リタージー・オブ・ベルは自分の横（自分が攻撃を受けると鳴り、20m 以内を回復するため）。アサイラムは自分と相方の間
    // o.at: クリックで選んだ場所（なければ自動: パッドなど）
    const r = o.r ?? 10, at = o.at ? ST.clamp(STG, { x: o.at.x, y: o.at.y }, 1) : kind === 'bell' ? besidePlayer(2.6) : kind === 'star' ? ST.clamp(STG, { x: (player.x + boss.x) / 2, y: (player.y + boss.y) / 2 }, 1) : zonePlace(r);
    const z = { kind, x: at.x, y: at.y, r, until: simNow + (o.sec ?? 20) * 1000, frac: o.frac ?? 0, next: simNow + 3000, born: clock, dying: false, endAt: 0, ringAt: -9, pops: [] };
    zones.push(z);
    const col = kind === 'bell' ? COLORS.lily : kind === 'star' ? COLORS.star : COLORS.dome;
    fx.push({ type: 'ring', at: { x: z.x, y: z.y }, col, t: 0, dur: 750, r0: 0.5, r1: kind === 'bell' ? 4 : r, thick: true });
    if (kind === 'bell') {
      // すずらんが生える: 足元から水色の光の粒が噴き上がる
      fx.push({ type: 'flash', at: { x: z.x, y: z.y, z: BELL_H }, col, t: 0, dur: 600, power: 1.4 });
      for (let i = 0; i < 48; i++) {
        const a = rand(0, Math.PI * 2), rr = rand(0, 1.4);
        spark({ x: z.x + Math.cos(a) * rr, y: z.y + Math.sin(a) * rr, z: 0.1, vx: Math.cos(a) * rand(0, 1), vy: Math.sin(a) * rand(0, 1), vz: rand(2, 5.5), g: 1.2, drag: 1.4, life: rand(0.7, 1.3), max: 1.3, col: i % 3 ? '#9ff6ff' : '#ffffff', size: i % 4 ? 1 : 2, shape: 2, rot: rand(0, 6.28), spin: rand(-4, 4) });
      }
    } else {
      // ドームが立ち上がる: 縁から光の粒が昇る
      for (let i = 0; i < 60; i++) {
        const a = rand(0, Math.PI * 2);
        spark({ x: z.x + Math.cos(a) * r, y: z.y + Math.sin(a) * r, z: 0.1, vz: rand(1.5, 4), g: 0, drag: 1, life: rand(0.6, 1.2), max: 1.2, col: i % 2 ? '#dff4ff' : '#8fc8ff', size: i % 4 ? 1 : 2 });
      }
    }
    return z;
  }
  // 範囲の中の味方を回復する。style: 'tick'（アサイラムの毎回・静か）/ 'ring'（ベルが鳴る）/ 'burst'（ベルの最後）
  function zoneHeal(kind, frac, style) {
    const z = zones.find((q) => q.kind === kind && !q.dying);
    if (!z) return 0;
    let n = 0;
    for (const e of [player, ...(hasNpc() ? [tank] : [])]) if (Math.hypot(e.x - z.x, e.y - z.y) <= z.r && healOne(e, frac, style === 'tick')) n++;
    if (kind === 'bell') {
      // 鈴の花（ガラス玉）が鳴って弾け、澄んだ光の輪が 20m まで広がる。最後はいくつも一度に
      z.ringAt = clock;
      const big = style === 'burst', left = STATE.bellStacks?.() ?? 0;
      const popped = big ? [0, 1, 2, 3, 4].filter((i) => z.pops[i] == null) : [left];
      for (const i of popped) z.pops[i] = clock;
      fx.push({ type: 'ring', at: { x: z.x, y: z.y }, col: COLORS.lily, t: 0, dur: big ? 1100 : 850, r0: 1, r1: z.r, thick: true });
      if (big) fx.push({ type: 'ring', at: { x: z.x, y: z.y }, col: COLORS.heal, t: -160, dur: 1100, r0: 1, r1: z.r, thick: true });
      fx.push({ type: 'flash', at: { x: z.x, y: z.y, z: BELL_H }, col: COLORS.lily, t: 0, dur: big ? 700 : 450, power: big ? 2 : 1.2 });
      for (let i = 0; i < (big ? 60 : 26); i++) {
        const a = rand(0, Math.PI * 2), sp = rand(2, 6);
        spark({ x: z.x, y: z.y, z: BELL_H + rand(-0.6, 1.2), vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, vz: rand(-1, 2.5), g: 1.2, drag: 1.5, life: rand(0.6, 1.2), max: 1.2, col: i % 2 ? '#ffffff' : '#9ff6ff', size: i % 3 ? 1 : 2, shape: 2, rot: rand(0, 6.28), spin: rand(-6, 6) });
      }
    } else if (kind === 'star') {
      // アーサリースターの爆発: 星が弾け、光の輪が範囲の端まで広がる（巨星は金で大きく）
      const c = z.giant ? COLORS.giant : COLORS.star;
      z.ringAt = clock;
      fx.push({ type: 'ring', at: { x: z.x, y: z.y }, col: c, t: 0, dur: 1000, r0: 1, r1: z.r, thick: true });
      fx.push({ type: 'flash', at: { x: z.x, y: z.y, z: 1.6 }, col: c, t: 0, dur: 700, power: z.giant ? 2.4 : 1.6 });
      for (let i = 0; i < (z.giant ? 80 : 50); i++) {
        const a = rand(0, Math.PI * 2), sp = rand(2, z.giant ? 8 : 6);
        spark({ x: z.x, y: z.y, z: 1.6 + rand(-0.4, 0.8), vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, vz: rand(-1, 3), g: 1, drag: 1.4, life: rand(0.6, 1.3), max: 1.3, col: i % 2 ? '#ffffff' : c[1], size: i % 3 ? 1 : 2, shape: 2, rot: rand(0, 6.28), spin: rand(-6, 6) });
      }
    } else if (style === 'tick') {
      z.ringAt = clock;
    }
    return n;
  }
  function endZone(kind) {
    for (const z of zones) if (z.kind === kind && !z.dying) { z.dying = true; z.endAt = clock; }
  }
  // 毎フレーム: アサイラムは 3 秒ごとに回復し、時間が来たら消える。光の粒を出す
  function updateZones(simT, live, vdt) {
    for (const z of zones) {
      if (z.dying) continue;
      if (z.kind === 'asylum') {
        while (live && z.next <= simT && z.next <= z.until) { z.next += 3000; zoneHeal('asylum', z.frac, 'tick'); }
        if (simT >= z.until) { z.dying = true; z.endAt = clock; continue; }
      }
      if (vdt <= 0) continue;
      if (z.kind === 'asylum') {
        const n = Math.round(vdt * 16 + Math.random() * 0.6);
        for (let i = 0; i < n; i++) {
          const a = rand(0, Math.PI * 2), rr = Math.sqrt(Math.random()) * z.r * 0.95;
          spark({ x: z.x + Math.cos(a) * rr, y: z.y + Math.sin(a) * rr, z: 0.05, vz: rand(0.5, 1.4), g: 0, drag: 0.2, life: rand(1.2, 2), max: 2, col: i % 3 ? '#b8ffd0' : '#ffffff', size: 1, sway: 0.4, rot: rand(0, 6.28) });
        }
      } else if (z.kind === 'star') {
        // 星のまわりを回る光の粒（巨星は金）
        const n = Math.round(vdt * (z.giant ? 18 : 10) + Math.random() * 0.6), c = z.giant ? '#ffd88a' : '#9cc4ff';
        for (let i = 0; i < n; i++) {
          const a = rand(0, Math.PI * 2), rr = rand(0.6, z.giant ? 2.6 : 1.8);
          spark({ x: z.x + Math.cos(a) * rr, y: z.y + Math.sin(a) * rr, z: rand(0.6, 2.8), vx: -Math.sin(a) * 1.2, vy: Math.cos(a) * 1.2, vz: rand(-0.2, 0.4), g: 0, drag: 0.4, life: rand(0.7, 1.3), max: 1.3, col: i % 3 ? c : '#ffffff', size: i % 5 ? 1 : 2, shape: 2, rot: rand(0, 6.28), spin: rand(-3, 3) });
        }
      } else {
        // すずらんのまわりのきらめき（水色と白。ゆっくり漂う）
        const n = Math.round(vdt * 10 + Math.random() * 0.6);
        for (let i = 0; i < n; i++) {
          const a = rand(0, Math.PI * 2), rr = rand(0.2, 1.9);
          spark({ x: z.x + Math.cos(a) * rr, y: z.y + Math.sin(a) * rr, z: rand(0.3, 3.8), vx: rand(-0.2, 0.2), vy: rand(-0.2, 0.2), vz: rand(0.1, 0.6), g: 0, drag: 0.3, life: rand(0.8, 1.6), max: 1.6, col: i % 3 ? '#a8f4ff' : '#ffffff', size: i % 5 ? 1 : 2, shape: 2, rot: rand(0, 6.28), spin: rand(-2, 2) });
        }
      }
    }
    zones = zones.filter((z) => !z.dying || clock - z.endAt < 0.7);
  }

  // 蘇生（白魔道士のレイズ）: 倒れている相方を HP 50% で起こす
  function raiseNpc() {
    if (!(tank.down > 0)) return false;
    tank.down = 0; tank.hp = 0.5;
    healFx(tank, false); fx.push({ type: 'pillar', at: tank, col: COLORS.holy, t: 0, dur: 700 });
    flyText('蘇生', 'buff', tank, 0.2); emit('tankrevive', 'raise');
    return true;
  }
  function healFx(e, small) {
    for (let i = 0; i < (small ? 8 : 22); i++) {
      const a = rand(0, Math.PI * 2), r = rand(0.2, 1.1);
      spark({ x: e.x + Math.cos(a) * r, y: e.y + Math.sin(a) * r, z: rand(0.1, 1.6), vz: rand(1.2, 3), g: 0, drag: 1.4, life: rand(0.5, 0.9), max: 0.9, col: i % 2 ? '#e8ffe8' : '#6fe89a', size: i % 4 ? 1 : 2, shape: i % 5 ? 0 : 2 });
    }
    if (!small) fx.push({ type: 'ring', at: e, col: COLORS.heal, t: 0, dur: 520, r0: 0.5, r1: 2.2 });
  }

  // 発動の演出: 形の中が白く光り、衝撃の前線が広がり、地面から光の柱と火の粉が噴き出す。焦げ跡がしばらく残る
  function boomFx(tg) {
    fx.push({ type: 'boom', tg, t: 0, dur: 1600 });
    const big = tg.puddle ? 0.6 : tg.kind === 'half' || tg.kind === 'donut' ? 1.4 : 1;
    const c = tg.kind === 'cleave' || tg.kind === 'line' ? { x: tg.c.x + Math.cos(tg.dir) * 7, y: tg.c.y + Math.sin(tg.dir) * 7 } : tg.kind === 'half' ? { x: tg.c.x - Math.sin(tg.dir) * (tg.side === 'right' ? -8 : 8), y: tg.c.y + Math.cos(tg.dir) * (tg.side === 'right' ? -8 : 8) } : tg.c;
    fx.push({ type: 'flash', at: { x: c.x, y: c.y, z: 1 }, col: ['#fff4d8', '#ff8a3c'], t: 0, dur: 520, power: 1.6 * big });
    const n = Math.round(10 * big);
    for (let i = 0; i < n; i++) {
      const p = samplePoint(tg);
      if (p) fx.push({ type: 'erupt', at: p, col: ['#fff1c9', '#ff7a2a'], t: -rand(0, 200), dur: rand(320, 460), h: rand(2.2, 4.6) });
    }
    for (let i = 0; i < 70 * big; i++) {
      const p = samplePoint(tg);
      if (p) spark({ x: p.x, y: p.y, z: 0.05, vx: rand(-1.5, 1.5), vy: rand(-1.5, 1.5), vz: rand(3, 8.5), g: 12, drag: 1.4, life: rand(0.35, 0.9), max: 0.9, col: i % 3 ? '#ffb46a' : '#fff1c9', size: i % 5 ? 1 : 2 });
    }
    // 土煙（地面を這って外へ）
    for (let i = 0; i < 26 * big; i++) {
      const p = samplePoint(tg);
      if (!p) continue;
      const a = Math.atan2(p.y - tg.c.y, p.x - tg.c.x) + rand(-0.4, 0.4), sp = rand(2, 5);
      spark({ x: p.x, y: p.y, z: 0.15, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, vz: rand(0.2, 0.8), g: 0, drag: 2.2, life: rand(0.5, 1.0), max: 1.0, col: '#8a7a6a', size: 2, dim: true });
    }
    if (!reduce) cam.shake = Math.max(cam.shake, inside(tg, player) ? 6 : Math.hypot(player.x - c.x, player.y - c.y) < 16 ? 2.6 : 1.2);
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
    const set = SPR?.[setName(e === player ? 'player' : e === tank ? 'tank' : 'boss')];
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
    const n = Math.round(dt * 70 * (castGlow.power ?? 1) + Math.random() * 0.8);
    for (let i = 0; i < n; i++) {
      const a = rand(0, Math.PI * 2), r = rand(1.6, 3.2);
      spark({ x: player.x + Math.cos(a) * r, y: player.y + Math.sin(a) * r, z: rand(0.1, 1.6), vx: -Math.cos(a) * r * 2.2, vy: -Math.sin(a) * r * 2.2, vz: rand(0.4, 1.4), g: 0, drag: 0.5, life: 0.35, max: 0.35, col: castGlow.col[0], size: 1 });
    }
  }

  // info: { kind, color, crit, power, count, name, combo, pos: { need, ok }, dmg, range }
  function play(info) {
    const col = COLORS[info.color] ?? COLORS.steel;
    if (info.kind === 'place') { act(player, 'spell'); flyText(info.name, 'buff', player, 0.2); return; } // 置いたものの演出は placeZone が出す
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
    if (info.kind === 'heal') { act(player, 'spell'); return; } // 回復の光は相手の足元に出す（healNow）
    if (info.kind === 'spell') {
      // 魔法: 敵の頭上から光が落ちる
      act(player, 'spell');
      setTimeout(() => {
        boss.flash = 1;
        fx.push({ type: 'pillar', at: boss, col, t: 0, dur: 520, big: true });
        fx.push({ type: 'ring', at: boss, col, t: 0, dur: 520, r0: 1.5, r1: POL.hitbox + 2.5, thick: true });
        fx.push({ type: 'flash', at: { x: boss.x, y: boss.y, z: 2.4 }, col, t: 0, dur: 300, power: info.power ?? 1 });
        sparks(boss, col, 16, 1);
        if (info.name) flyText(info.name, info.crit ? 'crit' : '', boss, 0.2, col, info.dmg);
      }, 120);
      return;
    }
    act(player, draw ? 'iai' : 'slash');
    finisherFx(info.color, info.count ?? 1, info.crit);
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

  // 技ごとの演出: 雪 = 氷のかけら、月 = 大きな三日月、花 = 花びら、居合 = 金の一文字、波切 = 水しぶき
  function finisherFx(color, count, crit) {
    const at = (dz = 2.2) => ({ x: boss.x + rand(-0.6, 0.6), y: boss.y + rand(-0.6, 0.6), z: dz + rand(-0.8, 0.8) });
    const burst = (n, cols, o) => {
      for (let i = 0; i < n; i++) {
        const a = rand(0, Math.PI * 2), e = rand(-0.2, 1.2), sp = rand(o.sp[0], o.sp[1]);
        spark({ ...at(), vx: Math.cos(a) * Math.cos(e) * sp, vy: Math.sin(a) * Math.cos(e) * sp, vz: Math.sin(e) * sp, g: o.g, drag: o.drag, life: rand(o.life[0], o.life[1]), max: o.life[1], col: cols[i % cols.length], size: o.size, shape: o.shape, rot: rand(0, 6.28), spin: rand(-8, 8), sway: o.sway ?? 0 });
      }
    };
    if (color === 'setsu') burst(24, ['#f4feff', '#9fe4ff', '#62d2ff'], { sp: [4, 10], g: 9, drag: 1.8, life: [0.5, 1.0], size: 2.2, shape: 2 });
    else if (color === 'ka') burst(34, ['#ffd6e8', '#ff9cc8', '#ffffff'], { sp: [2.5, 6], g: 1.2, drag: 2.2, life: [1.1, 1.8], size: 2.6, shape: 1, sway: 1.4 });
    else if (color === 'getsu') {
      fx.push({ type: 'arc', target: boss, col: ['#f6f0ff', '#8f7dff'], t: -40, dur: 360, a0: rand(0, 6.28), span: 3.6 * (Math.random() < 0.5 ? 1 : -1), r: POL.hitbox + 1.4, h: 2.4, tilt: rand(-0.25, 0.25), w: 1.3 });
      burst(14, ['#ffffff', '#cfc4ff'], { sp: [2, 5], g: 0, drag: 2, life: [0.5, 0.9], size: 1.4, shape: 2 });
    } else if (color === 'iai') {
      // 金の一文字（水平に長く、太い）
      fx.push({ type: 'arc', target: boss, col: ['#fffbe9', '#ffc640'], t: -60, dur: 300, a0: rand(0, 6.28), span: 4.4, r: POL.hitbox + 1.8, h: 1.9, tilt: 0, w: 1.6 });
      if (count >= 3) { burst(20, ['#f4feff', '#9fe4ff'], { sp: [4, 9], g: 9, drag: 1.8, life: [0.5, 1.0], size: 2.2, shape: 2 }); burst(26, ['#ffd6e8', '#ff9cc8'], { sp: [2.5, 6], g: 1.2, drag: 2.2, life: [1.1, 1.8], size: 2.6, shape: 1, sway: 1.4 }); }
    } else if (color === 'namikiri') burst(30, ['#f2ffff', '#4fe3ff', '#8ff0ff'], { sp: [4, 11], g: 12, drag: 1.2, life: [0.4, 0.9], size: 1.4, shape: 0 });
    else if (color === 'blood') burst(18, ['#ffecec', '#ff3b3b'], { sp: [3, 8], g: 8, drag: 2, life: [0.4, 0.8], size: 1.6, shape: 2 });
    void crit;
  }

  // 斬撃の弧: 対象のまわり（高さ h m、半径 r m）に、傾いた円の一部を描く
  function addArc(target, col, scale, radius, h, delay = 0, flat = false) {
    const a0 = rand(0, Math.PI * 2);
    fx.push({ type: 'arc', target, col, t: -delay, dur: flat ? 260 : 220, a0, span: rand(1.8, 2.6) * (Math.random() < 0.5 ? 1 : -1), r: radius * scale, h: h ?? 1.4, tilt: flat ? rand(-0.12, 0.12) : rand(-0.7, 0.7), w: flat ? 0.75 : 0.5 });
  }

  // power: 詠唱の光の強さ（ジョブごと。詠唱の多いジョブは控えめ）
  function castStart(color, ms, power = 1) { castGlow = { col: COLORS[color] ?? COLORS.iai, t: 0, dur: ms, power }; }
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
    const name = setName(kind), set = SPR[name];
    const dir = dirOf(e.face - yaw - Math.PI / 2);
    let anim = 'idle', t = clock + (kind === 'tank' ? 0.37 : kind === 'boss' ? 0.71 : 0), rot = 0;
    if (kind === 'player') {
      if (player.down > 0) { anim = 'hurt'; t = 0; rot = Math.PI / 2; }
      else if (player.act) { anim = player.act.name; t = player.act.t; }
      else if (player.jumpT >= 0) { anim = 'jump'; t = player.jumpT < 0.5 ? 0 : 1.01; }
      else if (castGlow) { anim = 'cast'; t = castGlow.t / 1000; }
      else if (player.moving) { anim = 'run'; t = player.walkT; }
    } else if (kind === 'tank') {
      if (tank.down > 0) { anim = 'hurt'; t = 0; rot = Math.PI / 2; }
      else if (tank.act) { anim = tank.act.name; t = tank.act.t; }
      else if (tank.moving) { anim = 'run'; t = tank.walkT; }
    } else if (boss.act) { anim = boss.act.name; t = boss.act.t; }
    else if (boss.casting) { anim = 'cast'; t = clock; }
    return { set, name, fr: window.MockSprites.frame(set, anim, dir, t), rot, dir };
  }

  function render(simT, phase) {
    if (view3d()) R3.render(simT);
    else R2D.render(simT);
    // 名前とフライテキスト
    placeName(bossName, boss, HEAD.boss + 0.7);
    bossName.hidden = boss.dead >= 2;
    placeName(tankName, tank, HEAD.tank + 0.35);
    tankName.hidden = !hasNpc();
    placeName(selfName, player, HEAD.player + 0.35 + player.z);
    selfName.hidden = target !== 'player';
    bossName.classList.toggle('tgt', target === 'boss'); tankName.classList.toggle('tgt', target === 'tank'); selfName.classList.toggle('tgt', target === 'player');
    for (const f of flies) placeFly(f);
    void phase;
  }

  // 描画に渡す状態（配列は入れ替わるので getter で渡す）
  const STATE = {
    player, boss, tank, cam, POL, COLORS, HEAD,
    get stage() { return STG; }, get markers() { return opts.markers ?? STG.markers; },
    get opts() { return opts; }, get telegraphs() { return telegraphs; }, get fx() { return fx; }, get parts() { return parts; },
    get castGlow() { return castGlow; }, get guideNeed() { return guideNeed; }, get clock() { return clock; }, get SPR() { return SPR; },
    get zones() { return zones; }, BELL_H, get aim() { return aim; }, get target() { return target; },
    poseOf, inside, angDiff, hasNpc, setName,
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
    const ground = (px, py) => ({ x: (px / PX - ox) / PPY, y: (py / PX - oy) / PPY });
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
      for (const z of zones) drawZoneFloor(z);
      if (aim) drawAim();
      for (const tg of telegraphs) drawTelegraph(tg, simT);
      for (const e of fx) if (e.type === 'boom' && e.t >= 0) drawBoom(e);
      drawTargetRing();

      // 影と人物（奥から順に）
      const ents = [{ kind: 'boss', y: boss.y }, ...(hasNpc() ? [{ kind: 'tank', y: tank.y }] : []), { kind: 'player', y: player.y }].sort((a, b) => a.y - b.y);
      for (const e of ents) drawShadow(e.kind);
      const ps = SPR[setName('player')];
      for (const t of player.trail) {
        const fr = window.MockSprites.frame(ps, 'run', dirOf(t.face), 0.1);
        drawFrame(ps, fr, t.x, t.y, 0, (t.life / t.max) * 0.5);
      }
      for (const e of ents) drawChar(e.kind);
      for (const z of zones) if (z.kind === 'bell') drawBell(z);

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

    // 設置型の技（真上から）: アサイラム = 青白い透明なドーム（縁が明るい円）、ベル = 届く範囲の点線と、立っているガラスのすずらん
    function zoneFade(z) { const k = z.dying ? Math.max(0, 1 - (clock - z.endAt) / 0.7) : 1; return k * Math.min(1, (clock - z.born) / 0.4); }
    function drawZoneFloor(z) {
      const cx = sx(z.x), cy = sy(z.y), R = z.r * PPY, f = zoneFade(z);
      const pulse = Math.max(0, 1 - (clock - z.ringAt) / 0.6);
      g.save();
      if (z.kind === 'asylum') {
        const gr = g.createRadialGradient(cx, cy, R * 0.2, cx, cy, R);
        gr.addColorStop(0, `rgba(140,190,255,${0.05 * f})`); gr.addColorStop(0.8, `rgba(150,200,255,${(0.12 + pulse * 0.08) * f})`); gr.addColorStop(1, `rgba(220,240,255,${0.35 * f})`);
        g.fillStyle = gr; g.beginPath(); g.arc(cx, cy, R, 0, Math.PI * 2); g.fill();
        g.globalAlpha = f; g.strokeStyle = 'rgba(230,245,255,.9)'; g.lineWidth = 2; g.stroke();
        // ドームの丸み（上から見た光の映り込み）
        g.strokeStyle = 'rgba(200,230,255,.35)'; g.lineWidth = 3;
        g.beginPath(); g.arc(cx - R * 0.18, cy - R * 0.2, R * 0.62, Math.PI * 1.05, Math.PI * 1.6); g.stroke();
      } else {
        g.globalAlpha = f * 0.8;
        g.setLineDash([6, 6]); g.lineDashOffset = -clock * 6;
        g.strokeStyle = `rgba(160,245,240,${0.4 + pulse * 0.45})`; g.lineWidth = 1.5;
        g.beginPath(); g.arc(cx, cy, R, 0, Math.PI * 2); g.stroke();
        g.setLineDash([]);
        const gr = g.createRadialGradient(cx, cy, 0, cx, cy, 22);
        gr.addColorStop(0, `rgba(170,255,240,${0.5 * f})`); gr.addColorStop(1, 'rgba(120,230,220,0)');
        g.fillStyle = gr; g.fillRect(cx - 22, cy - 22, 44, 44);
      }
      g.restore();
    }
    // 置く場所のターゲットサークル（範囲の外なら赤）
    function drawAim() {
      const cx = sx(aim.x), cy = sy(aim.y), R = aim.r * PPY;
      g.save();
      g.fillStyle = aim.ok ? 'rgba(160,230,255,.14)' : 'rgba(255,110,90,.14)';
      g.beginPath(); g.arc(cx, cy, R, 0, Math.PI * 2); g.fill();
      g.strokeStyle = aim.ok ? 'rgba(210,245,255,.95)' : 'rgba(255,140,120,.95)'; g.lineWidth = 2;
      g.setLineDash([8, 5]); g.lineDashOffset = -clock * 10; g.stroke(); g.setLineDash([]);
      g.beginPath(); g.arc(cx, cy, 3, 0, Math.PI * 2); g.fillStyle = '#fff'; g.fill();
      g.restore();
    }
    // リタージー・オブ・ベル（sprites.js の vfx）: ハート・中央の花・鈴の花のガラス玉（残りのスタックの数）を加算で重ねる。1m = 20 画素（人物と同じ縮尺）
    function drawBell(z) {
      const V = SPR.vfx, L = V.LILY, M = 20, f = zoneFade(z);
      const grow = Math.min(1, (clock - z.born) / 0.5), k = grow < 1 ? 1 - Math.pow(1 - grow, 3) * (1 - grow * 1.6) : 1; // 伸びて少し行き過ぎて戻る
      const bx = sx(z.x), by = sy(z.y), pulse = Math.max(0, 1 - (clock - z.ringAt) / 0.5);
      g.save();
      g.imageSmoothingEnabled = true;
      g.globalCompositeOperation = 'lighter';
      g.globalAlpha = f;
      const w = L.w * M * k, h = L.h * M * k;
      g.drawImage(V.lilyHeart, bx - w / 2, by - h, w, h);
      const [, fy, fs] = L.flower, fsz = fs * M * k * (1 + pulse * 0.25);
      g.globalAlpha = f * (0.85 + 0.15 * Math.sin(clock * 3));
      g.drawImage(V.lilyFlower, bx - fsz / 2, by - fy * M * k - fsz / 2, fsz, fsz);
      const left = STATE.bellStacks?.() ?? 0;
      L.bubbles.forEach(([x, y, s], i) => {
        const pop = z.pops[i] != null ? (clock - z.pops[i]) / 0.45 : null;
        if (i >= left && (pop == null || pop >= 1)) return;
        const appear = Math.min(1, Math.max(0, (clock - z.born - 0.3 - i * 0.08) / 0.25));
        const sc = (pop != null ? 1 + pop * 0.8 : appear) * s * M * k, a = pop != null ? 1 - pop : appear;
        const yy = y + Math.sin(clock * 2 + i * 1.3) * 0.06;
        g.globalAlpha = f * a;
        g.drawImage(V.lilyBubble, bx + x * M * k - sc / 2, by - yy * M * k - sc / 2, sc, sc);
      });
      g.restore();
    }

    // フィールドマーカー（丸は A〜D、四角は 1〜4）
    function drawMarkers() {
      g.save();
      g.font = '700 22px Cinzel, "Zen Kaku Gothic New", sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
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
      if (simT < tg.start || tg.done || tg.kind === 'raid') return;
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
      const k = 1 - Math.min(1, e.t / 420);
      if (k <= 0) return;
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
      erupt(e) {
        const p = e.t / e.dur, cx = sx(e.at.x), cy = sy(e.at.y), h = e.h * PPY * Z2 * Math.min(1, p * 4);
        g.globalAlpha = (1 - p) * 0.7; g.fillStyle = e.col[1]; g.fillRect(cx - 3, cy - h, 6, h);
        g.globalAlpha = 1 - p; g.fillStyle = e.col[0]; g.fillRect(cx - 1, cy - h, 2, h);
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
    return { init, resize, project, ground, render, setStage };
  })();

  window.MockArena = {
    init, resize, reset, setInput, jump, update, render, setView,
    view: () => (view3d() ? '3d' : '2d'), error3d: () => r3err, camera,
    edgeDistance, positional, faceTarget, dashToTarget, backstep, bossCast,
    isMoving: () => player.moving, isJumping: () => player.jumpT >= 0, isDown: () => player.down > 0, hp: () => player.hp,
    tankHp: () => (hasNpc() ? Math.max(0, tank.hp - (opts.role === 'healer' ? 0 : tank.flash * 0.04)) : 0), // 相方の HP（範囲攻撃・通常攻撃で減る。回復役があなたでなければ少しずつ戻る）
    hasNpc, npcHealer, isNpcDown: () => hasNpc() && tank.down > 0, raiseNpc,
    // ターゲット（'boss' / 'player' / 'tank' / null）。pickAt: 画面の位置の人物
    setTarget: (k) => { target = k === 'tank' && !hasNpc() ? null : k; }, target: () => target,
    pickAt: (px, py) => (view3d() ? R3.pick(px, py) : null),
    screenOf: (k) => { const e = { player, tank, boss }[k]; return project(e.x, e.y, HEAD[k] * 0.25); }, // 動作確認用: 人物の腰の画面位置（舞台の px）
    distTo: (k) => (k === 'tank' ? dist(player, tank) : k === 'boss' ? Math.max(0, dist(player, boss) - POL.hitbox) : 0),
    heal: (who, frac) => healNow(who, frac), shield: shieldOn, mitigate: mitigateOn, hot: hotOn, mark: markOn, partyStatus,
    // 設置型の技の状態を変える（アーサリースターの巨星化など）・範囲の中に敵がいるか
    zoneSet: (kind, o) => { const z = zones.find((q) => q.kind === kind && !q.dying); if (z) { if (o.giant && !z.giant) { z.giantAt = clock; fx.push({ type: 'flash', at: { x: z.x, y: z.y, z: 1.6 }, col: COLORS.giant, t: 0, dur: 600, power: 1.6 }); } Object.assign(z, o); } return !!z; },
    zoneHitsBoss: (kind) => { const z = zones.find((q) => q.kind === kind && !q.dying); return !!z && Math.hypot(boss.x - z.x, boss.y - z.y) <= z.r + POL.hitbox; },
    // ジョブの決まりが出すダメージ（アーサリースターの爆発など）: 敵の上に技名とダメージ
    hitText: (name, dmg) => flyText(name, '', boss, 0.1, null, dmg),
    hpOf: (who) => (who === 'npc' ? (hasNpc() ? tank.hp : 0) : player.hp),
    placeZone, zoneHeal, endZone, setAim: (o) => { aim = o; },
    // 画面の位置（舞台の px）→ 床の位置（m）
    groundAt: (px, py) => (view3d() ? R3.ground(px, py) : R2D.ground(px, py)), zones: () => zones.filter((z) => !z.dying).map((z) => ({ kind: z.kind, x: z.x, y: z.y, r: z.r })),
    setBellStacks: (fn) => { STATE.bellStacks = fn; }, // ベルの残りスタック（光の玉の数）を教える関数
    setGuide: (need) => { guideNeed = need; },
    play, castStart, castEnd, dotTick, kill, flyText: (t, cls) => flyText(t, cls, player, 0.2),
    on: (ev, fn) => { handlers[ev] = fn; },
    options: () => ({ ...opts }), POL, MECH,
    // 動作確認用
    stage: () => STG, stages: () => ST.list,
    testMech: (kind, simT, cast = 3000) => startMech({ kind, cast, side: 'left', r1: 0.3, r2: 0.5 }, simT), // 動作確認用: 敵の技をすぐ出す
    debug: () => ({ stage: STG.id, tankHits: tank.hits, tankDeaths: tank.deaths, tankHp: tank.hp, tank: { x: tank.x, y: tank.y }, boss: { x: boss.x, y: boss.y, face: boss.face }, player: { x: player.x, y: player.y, face: player.face }, telegraphs: telegraphs.length, view: view3d() ? '3d' : '2d', cam: { ...cam }, r3: R3?.debug?.() ?? null }),
  };
})();
