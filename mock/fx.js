// UI モックの演出: 木人の揺れ・ヒットエフェクト・詠唱の光・フライテキスト・背景の花びら・画面の揺れ。
// 見た目だけを担当し、判定には関わらない。画像は使わず canvas と CSS で描く。
// 動きを減らす設定（prefers-reduced-motion）では、揺れ・花びら・大きな演出を控える。
(function () {
  'use strict';

  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  const rand = (a, b) => a + Math.random() * (b - a);
  const clamp01 = (v) => Math.max(0, Math.min(1, v));

  // 色: [芯, 光]
  const COLORS = {
    steel: ['#ffffff', '#bfe0ff'],
    setsu: ['#f0fdff', '#62d2ff'],
    getsu: ['#f3efff', '#8f7dff'],
    ka: ['#fff2f8', '#ff78b6'],
    kenki: ['#fff3ea', '#ff5a36'],
    iai: ['#fffbe9', '#ffc640'],
    namikiri: ['#f2ffff', '#4fe3ff'],
    shoha: ['#f6efff', '#b070ff'],
    buff: ['#fffbe3', '#ffd46b'],
    blood: ['#ffecec', '#ff3b3b'],
    water: ['#f0fbff', '#7fd8ff'],
  };

  let cv = null, ctx = null, scene = null, fly = null, dummyBody = null, dummyWrap = null;
  let W = 1280, H = 720, px = 1;
  const P = { dummy: { x: 640, y: 290, top: 170, ground: 430 }, player: { x: 640, y: 560 } };
  const fx = []; // 形のある演出
  const parts = []; // 粒子
  const petals = []; // 背景の花びら
  const spring = { a: 0, v: 0, x: 0, vx: 0, flash: 0 };
  let shake = 0;
  let cast = null; // 詠唱中の光

  function init(opts) {
    cv = opts.canvas; ctx = cv.getContext('2d');
    scene = opts.scene; fly = opts.flyLayer; dummyBody = opts.dummyBody; dummyWrap = opts.dummyWrap;
    if (!reduce) for (let i = 0; i < 16; i++) petals.push(newPetal(true));
  }

  function resize(w, h, pixelScale) {
    W = w; H = h; px = Math.max(1, pixelScale);
    cv.width = Math.round(w * px); cv.height = Math.round(h * px);
    cv.style.width = `${w}px`; cv.style.height = `${h}px`;
  }

  function setAnchors(a) { Object.assign(P.dummy, a.dummy ?? {}); Object.assign(P.player, a.player ?? {}); }

  // ---------------- 演出の登録 ----------------
  // info: { kind: 'slash'|'circle'|'cone'|'line'|'projectile'|'dash'|'buff', color, crit, power, count, name, combo }
  function play(info) {
    const col = COLORS[info.color] ?? COLORS.steel;
    const power = info.power ?? 1;
    const delayHit = { slash: 60, circle: 90, cone: 170, line: 120, projectile: 190, dash: 150 }[info.kind] ?? 60;
    switch (info.kind) {
      case 'buff': buffFx(col, info); return;
      case 'slash': {
        const n = info.count ?? 1;
        for (let i = 0; i < n; i++) addSlash(col, { delay: i * 95, width: (info.crit ? 22 : 16) * (n > 1 ? 1.1 : 1), len: rand(190, 250) * (info.crit ? 1.15 : 1) });
        break;
      }
      case 'circle': fx.push({ type: 'ring', col, t: 0, dur: 520, r0: 30, r1: 230 }); addSlash(col, { delay: 40, width: 14, len: 220 }); break;
      case 'cone': fx.push({ type: 'cone', col, t: 0, dur: 520 }); break;
      case 'line': fx.push({ type: 'line', col, t: 0, dur: 460 }); break;
      case 'projectile': fx.push({ type: 'proj', col, t: 0, dur: 190 }); break;
      case 'dash': fx.push({ type: 'dash', col, t: 0, dur: 200 }); break;
      default: addSlash(col, {});
    }
    // 命中の瞬間: 光・火花・木人の揺れ・画面の揺れ・フライテキスト
    fx.push({ type: 'impact', col, t: -delayHit, dur: info.crit ? 420 : 300, big: !!info.crit || power > 1.3 });
    setTimeout(() => {
      burst(P.dummy.x + rand(-10, 10), P.dummy.y + rand(-24, 16), col, info.crit ? 34 : 18, info.crit ? 1.5 : 1);
      if (info.color === 'ka' || info.color === 'iai') petalBurst(info.color === 'iai' ? 16 : 10);
      kick(power * (info.crit ? 1.5 : 1));
      if (!reduce && (info.crit || power > 1.3)) shake = Math.max(shake, info.crit ? 9 : 6);
      if (info.name) flyText(info.name, info.crit ? 'crit' : info.combo ? 'combo' : '', col);
    }, Math.max(0, delayHit));
  }

  function addSlash(col, o) {
    const d = P.dummy;
    const ang = o.angle ?? (rand(-0.95, 0.95) + (Math.random() < 0.5 ? 0 : Math.PI));
    const len = o.len ?? rand(180, 240);
    const cx = d.x + rand(-12, 12), cy = d.y + rand(-34, 18);
    const dx = (Math.cos(ang) * len) / 2, dy = (Math.sin(ang) * len) / 2;
    const nl = Math.hypot(dx, dy) || 1;
    const bul = rand(0.16, 0.3) * len * (Math.random() < 0.5 ? 1 : -1);
    fx.push({
      type: 'slash', col, t: -(o.delay ?? 0), dur: 300, sweep: 95, w: o.width ?? 16,
      p0: { x: cx - dx, y: cy - dy }, p1: { x: cx + dx, y: cy + dy },
      c: { x: cx + (-dy / nl) * bul, y: cy + (dx / nl) * bul },
    });
  }

  function buffFx(col, info) {
    fx.push({ type: 'aura', col, t: 0, dur: 900 });
    for (let i = 0; i < 22; i++) {
      parts.push({ kind: 'mote', x: P.player.x + rand(-60, 60), y: P.player.y + rand(-6, 10), vx: rand(-10, 10), vy: rand(-120, -50), g: -10, drag: 0.6, life: 0, max: rand(0.6, 1.1), size: rand(1.5, 3), col });
    }
    if (info.name) flyText(`+${info.name}`, 'buff', col, P.player.x, P.player.y - 70);
  }

  function castStart(color, durMs) { cast = { col: COLORS[color] ?? COLORS.iai, t: 0, dur: durMs }; }
  function castEnd() { cast = null; }

  function dotTick() {
    burst(P.dummy.x + rand(-20, 20), P.dummy.y + rand(-40, 20), COLORS.blood, 6, 0.6);
    spring.flash = Math.min(1, spring.flash + 0.15);
  }

  function burst(x, y, col, n, speed) {
    for (let i = 0; i < n; i++) {
      const a = rand(0, Math.PI * 2), sp = rand(120, 420) * speed;
      parts.push({ kind: 'spark', x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp * 0.75 - 60, g: 520, drag: 2.2, life: 0, max: rand(0.22, 0.5), size: rand(1.2, 2.6), col });
    }
  }

  function petalBurst(n) {
    for (let i = 0; i < n; i++) {
      const a = rand(0, Math.PI * 2), sp = rand(60, 220);
      parts.push({ kind: 'petal', x: P.dummy.x, y: P.dummy.y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 40, g: 60, drag: 1.2, life: 0, max: rand(0.9, 1.6), size: rand(4, 7), rot: rand(0, 6), vr: rand(-6, 6) });
    }
  }

  function kick(power) {
    const dir = Math.random() < 0.5 ? -1 : 1;
    spring.v += dir * 55 * power;
    spring.vx += dir * 60 * power;
    spring.flash = Math.min(1, spring.flash + 0.55 * power);
  }

  function flyText(text, cls, col, x, y) {
    if (!fly) return;
    const el = document.createElement('div');
    el.className = `fly ${cls}`;
    el.textContent = text;
    el.style.left = `${(x ?? P.dummy.x) + rand(-28, 28)}px`;
    el.style.top = `${y ?? P.dummy.y - 96 + rand(-8, 8)}px`;
    el.style.setProperty('--glow', col[1]);
    el.addEventListener('animationend', () => el.remove());
    fly.appendChild(el);
    while (fly.children.length > 12) fly.firstChild.remove();
  }

  // ---------------- 毎フレームの更新と描画 ----------------
  function frame(dtMs) {
    if (!ctx) return;
    const dt = Math.min(0.05, dtMs / 1000);

    // 木人のばね（傾きと横ずれ）
    const k = 150, c = 7.5;
    spring.v += (-k * spring.a - c * spring.v) * dt; spring.a += spring.v * dt;
    spring.vx += (-k * spring.x - c * spring.vx) * dt; spring.x += spring.vx * dt;
    spring.flash = Math.max(0, spring.flash - dt * 3.2);
    const a = reduce ? 0 : Math.max(-14, Math.min(14, spring.a)), x = reduce ? 0 : Math.max(-10, Math.min(10, spring.x * 0.15));
    if (dummyBody) dummyBody.style.transform = `translateX(${x.toFixed(2)}px) rotate(${a.toFixed(2)}deg)`;
    if (dummyWrap) dummyWrap.style.setProperty('--flash', spring.flash.toFixed(3));

    // 画面の揺れ（HUD は揺らさない）
    if (scene) {
      if (shake > 0.05) { scene.style.transform = `translate(${rand(-shake, shake).toFixed(1)}px, ${rand(-shake, shake).toFixed(1)}px)`; shake *= Math.pow(0.001, dt); }
      else if (shake) { shake = 0; scene.style.transform = ''; }
    }

    ctx.setTransform(px, 0, 0, px, 0, 0);
    ctx.clearRect(0, 0, W, H);

    drawPetals(dt);
    if (cast) drawCast(dt);

    ctx.globalCompositeOperation = 'lighter';
    for (let i = fx.length - 1; i >= 0; i--) {
      const e = fx[i];
      e.t += dtMs;
      if (e.t > e.dur) { fx.splice(i, 1); continue; }
      if (e.t < 0) continue;
      DRAW[e.type]?.(e);
    }
    drawParts(dt);
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1; ctx.shadowBlur = 0;
  }

  const quad = (e, u) => {
    const iu = 1 - u;
    return { x: iu * iu * e.p0.x + 2 * iu * u * e.c.x + u * u * e.p1.x, y: iu * iu * e.p0.y + 2 * iu * u * e.c.y + u * u * e.p1.y };
  };

  function ribbon(e, tail, head, wMul) {
    const N = 26, up = [], dn = [];
    for (let i = 0; i <= N; i++) {
      const u = tail + ((head - tail) * i) / N;
      const p = quad(e, u), q = quad(e, Math.min(1, u + 0.01)), r = quad(e, Math.max(0, u - 0.01));
      let tx = q.x - r.x, ty = q.y - r.y; const tl = Math.hypot(tx, ty) || 1; tx /= tl; ty /= tl;
      const w = e.w * wMul * Math.sin(Math.PI * clamp01(u)) * (0.35 + 0.65 * ((i / N)));
      up.push([p.x - ty * w, p.y + tx * w]); dn.push([p.x + ty * w * 0.25, p.y - tx * w * 0.25]);
    }
    ctx.beginPath();
    ctx.moveTo(up[0][0], up[0][1]);
    for (const [x, y] of up) ctx.lineTo(x, y);
    for (let i = dn.length - 1; i >= 0; i--) ctx.lineTo(dn[i][0], dn[i][1]);
    ctx.closePath();
  }

  const DRAW = {
    slash(e) {
      const head = clamp01(e.t / e.sweep);
      const tail = clamp01((e.t - e.sweep * 0.45) / (e.dur - e.sweep * 0.45));
      if (tail >= head) return;
      const fade = 1 - tail;
      ctx.shadowColor = e.col[1]; ctx.shadowBlur = 22;
      ctx.globalAlpha = 0.55 * fade; ctx.fillStyle = e.col[1]; ribbon(e, tail, head, 1); ctx.fill();
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 0.95 * fade; ctx.fillStyle = e.col[0]; ribbon(e, tail, head, 0.38); ctx.fill();
    },
    impact(e) {
      const p = e.t / e.dur;
      const r = (e.big ? 150 : 95) * (0.35 + p * 0.9);
      const g = ctx.createRadialGradient(P.dummy.x, P.dummy.y, 0, P.dummy.x, P.dummy.y, r);
      g.addColorStop(0, e.col[0]); g.addColorStop(0.25, e.col[1]); g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.globalAlpha = (1 - p) * (e.big ? 0.75 : 0.5); ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(P.dummy.x, P.dummy.y, r, 0, Math.PI * 2); ctx.fill();
      if (e.big) {
        // 星形の光（クリティカル）
        ctx.globalAlpha = (1 - p) * 0.9; ctx.strokeStyle = e.col[0]; ctx.lineWidth = 2.2;
        for (let i = 0; i < 8; i++) {
          const a = (i / 8) * Math.PI * 2 + 0.2, L = (i % 2 ? 60 : 120) * (0.4 + p);
          ctx.beginPath(); ctx.moveTo(P.dummy.x + Math.cos(a) * 12, P.dummy.y + Math.sin(a) * 12); ctx.lineTo(P.dummy.x + Math.cos(a) * L, P.dummy.y + Math.sin(a) * L); ctx.stroke();
        }
      }
    },
    ring(e) {
      const p = e.t / e.dur, ease = 1 - Math.pow(1 - p, 3);
      const r = e.r0 + (e.r1 - e.r0) * ease;
      const cx = P.dummy.x, cy = P.dummy.ground - 8;
      ctx.globalAlpha = (1 - p) * 0.9; ctx.strokeStyle = e.col[1]; ctx.lineWidth = 12 * (1 - p) + 1.5;
      ctx.shadowColor = e.col[1]; ctx.shadowBlur = 18;
      ctx.beginPath(); ctx.ellipse(cx, cy, r, r * 0.3, 0, 0, Math.PI * 2); ctx.stroke();
      ctx.shadowBlur = 0; ctx.strokeStyle = e.col[0]; ctx.lineWidth = 3 * (1 - p) + 0.5;
      const sweep = p * Math.PI * 3;
      ctx.beginPath(); ctx.ellipse(cx, cy - 40, r * 0.8, r * 0.26, 0, sweep, sweep + 1.6); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(cx, cy - 40, r * 0.8, r * 0.26, 0, sweep + Math.PI, sweep + Math.PI + 1.6); ctx.stroke();
    },
    cone(e) {
      const p = e.t / e.dur;
      const o = P.player, d = P.dummy;
      const ang = Math.atan2(d.y - o.y, d.x - o.x), half = 0.62;
      const R = (Math.hypot(d.x - o.x, d.y - o.y) + 160) * Math.min(1, p * 1.7);
      const band = 70;
      ctx.globalAlpha = (1 - p) * 0.85;
      const g = ctx.createRadialGradient(o.x, o.y, Math.max(0, R - band), o.x, o.y, R);
      g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(0.7, e.col[1]); g.addColorStop(1, e.col[0]);
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.moveTo(o.x, o.y); ctx.arc(o.x, o.y, R, ang - half, ang + half); ctx.closePath(); ctx.fill();
      ctx.globalAlpha = (1 - p) * 0.35; ctx.fillStyle = e.col[1];
      ctx.beginPath(); ctx.moveTo(o.x, o.y); ctx.arc(o.x, o.y, R * 0.98, ang - half, ang + half); ctx.closePath(); ctx.fill();
    },
    line(e) {
      const p = e.t / e.dur;
      const o = P.player, d = P.dummy;
      const ang = Math.atan2(d.y - o.y, d.x - o.x);
      const L = (Math.hypot(d.x - o.x, d.y - o.y) + 110) * Math.min(1, p * 3);
      const w = 30 * (1 - p) + 2;
      ctx.save(); ctx.translate(o.x, o.y); ctx.rotate(ang);
      ctx.globalAlpha = (1 - p) * 0.8; ctx.fillStyle = e.col[1]; ctx.shadowColor = e.col[1]; ctx.shadowBlur = 20;
      ctx.fillRect(0, -w / 2, L, w);
      ctx.shadowBlur = 0; ctx.globalAlpha = (1 - p); ctx.fillStyle = e.col[0];
      ctx.fillRect(0, -w * 0.15, L, w * 0.3);
      ctx.restore();
    },
    proj(e) {
      const p = clamp01(e.t / e.dur), o = P.player, d = P.dummy;
      const x = o.x + (d.x - o.x) * p, y = o.y + (d.y - o.y) * p;
      ctx.globalAlpha = 0.9; ctx.strokeStyle = e.col[0]; ctx.lineWidth = 4; ctx.shadowColor = e.col[1]; ctx.shadowBlur = 16;
      ctx.beginPath(); ctx.arc(x, y + 18, 22, Math.PI * 1.15, Math.PI * 1.85); ctx.stroke();
      ctx.shadowBlur = 0;
      for (let i = 1; i < 6; i++) {
        const q = Math.max(0, p - i * 0.06);
        ctx.globalAlpha = 0.18 * (6 - i) / 6; ctx.beginPath();
        ctx.arc(o.x + (d.x - o.x) * q, o.y + (d.y - o.y) * q + 18, 22, Math.PI * 1.15, Math.PI * 1.85); ctx.stroke();
      }
    },
    dash(e) {
      const p = e.t / e.dur, o = P.player, d = P.dummy;
      ctx.strokeStyle = e.col[1]; ctx.lineWidth = 2;
      for (let i = 0; i < 9; i++) {
        const off = (i - 4) * 14, s = clamp01(p * 1.4 - i * 0.03);
        ctx.globalAlpha = (1 - p) * 0.7;
        ctx.beginPath(); ctx.moveTo(o.x + off, o.y); ctx.lineTo(o.x + off + (d.x - o.x) * s, o.y + (d.y - o.y) * s); ctx.stroke();
      }
    },
    aura(e) {
      const p = e.t / e.dur, o = P.player;
      const g = ctx.createLinearGradient(o.x, o.y, o.x, o.y - 190);
      g.addColorStop(0, e.col[1]); g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.globalAlpha = Math.sin(Math.PI * p) * 0.45; ctx.fillStyle = g;
      ctx.fillRect(o.x - 58, o.y - 190, 116, 190);
      ctx.globalAlpha = (1 - p) * 0.9; ctx.strokeStyle = e.col[0]; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.ellipse(o.x, o.y, 40 + p * 90, (40 + p * 90) * 0.28, 0, 0, Math.PI * 2); ctx.stroke();
    },
  };

  function drawCast(dt) {
    cast.t += dt * 1000;
    const p = clamp01(cast.t / cast.dur), o = P.player;
    ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = 0.25 + 0.35 * p; ctx.strokeStyle = cast.col[1]; ctx.lineWidth = 2 + 2 * p;
    ctx.beginPath(); ctx.ellipse(o.x, o.y, 70 - 30 * p, (70 - 30 * p) * 0.3, 0, 0, Math.PI * 2); ctx.stroke();
    if (Math.random() < 0.8) {
      const a = rand(0, Math.PI * 2), r = rand(80, 140);
      parts.push({ kind: 'mote', x: o.x + Math.cos(a) * r, y: o.y - 30 + Math.sin(a) * r * 0.5, tx: o.x, ty: o.y - 30, vx: 0, vy: 0, g: 0, drag: 0, life: 0, max: 0.35, size: rand(1.5, 2.8), col: cast.col, seek: true });
    }
    ctx.globalCompositeOperation = 'source-over';
  }

  function drawParts(dt) {
    for (let i = parts.length - 1; i >= 0; i--) {
      const q = parts[i];
      q.life += dt;
      if (q.life > q.max) { parts.splice(i, 1); continue; }
      if (q.seek) { q.x += (q.tx - q.x) * Math.min(1, dt * 7); q.y += (q.ty - q.y) * Math.min(1, dt * 7); }
      else {
        q.vx *= Math.exp(-q.drag * dt); q.vy = q.vy * Math.exp(-q.drag * dt) + q.g * dt;
        q.x += q.vx * dt; q.y += q.vy * dt;
      }
      const f = 1 - q.life / q.max;
      if (q.kind === 'petal') {
        ctx.globalCompositeOperation = 'source-over';
        drawPetal(q.x, q.y, q.size, (q.rot += q.vr * dt), f * 0.9);
        ctx.globalCompositeOperation = 'lighter';
        continue;
      }
      ctx.globalAlpha = f; ctx.fillStyle = q.kind === 'spark' ? q.col[0] : q.col[1];
      if (q.kind === 'spark') {
        ctx.strokeStyle = q.col[1]; ctx.lineWidth = q.size;
        ctx.beginPath(); ctx.moveTo(q.x, q.y); ctx.lineTo(q.x - q.vx * 0.025, q.y - q.vy * 0.025); ctx.stroke();
      } else {
        ctx.beginPath(); ctx.arc(q.x, q.y, q.size, 0, Math.PI * 2); ctx.fill();
      }
    }
  }

  function newPetal(anywhere) {
    return { x: rand(-40, W + 40), y: anywhere ? rand(-20, H * 0.7) : rand(-60, -10), vx: rand(12, 36), vy: rand(14, 30), rot: rand(0, 6), vr: rand(-1.5, 1.5), size: rand(3, 5.5), a: rand(0.25, 0.55), sway: rand(0, 6) };
  }
  function drawPetals(dt) {
    for (let i = 0; i < petals.length; i++) {
      const q = petals[i];
      q.sway += dt; q.x += (q.vx + Math.sin(q.sway * 1.3) * 14) * dt; q.y += q.vy * dt; q.rot += q.vr * dt;
      if (q.y > H * 0.78 || q.x > W + 60) petals[i] = newPetal(false);
      drawPetal(q.x, q.y, q.size, q.rot, q.a);
    }
  }
  function drawPetal(x, y, s, rot, alpha) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.globalAlpha = alpha;
    ctx.fillStyle = '#ffc3dc';
    ctx.beginPath(); ctx.moveTo(0, -s); ctx.quadraticCurveTo(s * 0.9, -s * 0.2, 0, s); ctx.quadraticCurveTo(-s * 0.9, -s * 0.2, 0, -s); ctx.fill();
    ctx.fillStyle = '#ff9cc4'; ctx.globalAlpha = alpha * 0.6;
    ctx.beginPath(); ctx.ellipse(0, 0, s * 0.18, s * 0.6, 0, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }

  window.MockFx = { init, resize, setAnchors, play, castStart, castEnd, dotTick, flyText: (t, cls, color, x, y) => flyText(t, cls, COLORS[color] ?? COLORS.buff, x, y), frame, reduce };
})();
