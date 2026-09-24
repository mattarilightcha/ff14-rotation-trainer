// UI モックの効果音。Web Audio API でその場で合成する（ゲームの音声ファイルは使わない）。
// FF14 の手ざわりに寄せて、斬撃は「風切り＋刀の金属の鳴り」、命中は「低い衝撃」、居合術は「溜め → 鋭い抜刀 → 重い衝撃」。
// 攻撃・回復・強化は、ジャンル別の共通の音（phys / spell / heal / boost）で全ジョブをそろえる。
// 全体に短い残響（部屋の響き）を足す。ブラウザの自動再生の制限があるため、最初のキー入力やクリックのあとで鳴り始める。
(function () {
  'use strict';
  const KEY = 'ff14rt:mock:audio';
  let ctx = null, master = null, verb = null, noiseBuf = null;
  let enabled = true, volume = 0.45;
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? 'null');
    if (v) { enabled = !!v.enabled; volume = Number(v.volume) || volume; }
  } catch { /* 保存がなくても動く */ }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify({ enabled, volume })); } catch { /* 無視 */ } };

  // 残響: 指数的に減衰する雑音で作ったインパルス応答（左右で別の雑音にして広がりを出す）
  function impulse(sec, decay) {
    const n = Math.round(ctx.sampleRate * sec), b = ctx.createBuffer(2, n, ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const d = b.getChannelData(ch);
      for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, decay) * (i < ctx.sampleRate * 0.012 ? i / (ctx.sampleRate * 0.012) : 1);
    }
    return b;
  }

  function ensure() {
    if (!enabled) return false;
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return false;
      ctx = new AC();
      const comp = ctx.createDynamicsCompressor();
      comp.threshold.value = -16; comp.ratio.value = 4; comp.attack.value = 0.004; comp.release.value = 0.2;
      master = ctx.createGain(); master.gain.value = volume;
      master.connect(comp); comp.connect(ctx.destination);
      // 残響の送り先
      const conv = ctx.createConvolver();
      conv.buffer = impulse(1.7, 3.2);
      verb = ctx.createGain(); verb.gain.value = 0.28;
      verb.connect(conv); conv.connect(master);
      noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
      const d = noiseBuf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    }
    if (ctx.state === 'suspended') ctx.resume();
    return true;
  }

  // 出口: 音量 → 定位 → 本線と残響
  function out(node, pan = 0, send = 0.25) {
    const p = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
    if (p) { p.pan.value = pan; node.connect(p); node = p; }
    node.connect(master);
    if (send > 0) { const s = ctx.createGain(); s.gain.value = send; node.connect(s); s.connect(verb); }
  }
  function env(g, t0, attack, peak, decay, curve = 'exp') {
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0002, peak), t0 + attack);
    if (curve === 'exp') g.gain.exponentialRampToValueAtTime(0.0001, t0 + attack + decay);
    else g.gain.linearRampToValueAtTime(0.0001, t0 + attack + decay);
  }
  // 帯域を絞った雑音（風切り・衝撃・爆発の元）
  function noise(t0, dur, type, f0, f1, q, peak, o = {}) {
    const src = ctx.createBufferSource(); src.buffer = noiseBuf;
    const f = ctx.createBiquadFilter(); f.type = type; f.Q.value = q;
    const a = o.attack ?? 0.004;
    f.frequency.setValueAtTime(f0, t0); f.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t0 + a + dur);
    const g = ctx.createGain(); env(g, t0, a, peak, dur);
    src.connect(f); f.connect(g); out(g, o.pan ?? 0, o.send ?? 0.25);
    src.start(t0, Math.random() * 1.5); src.stop(t0 + a + dur + 0.05);
  }
  function tone(t0, type, f0, f1, dur, peak, o = {}) {
    const osc = ctx.createOscillator(); osc.type = type;
    const a = o.attack ?? 0.004;
    osc.frequency.setValueAtTime(f0, t0);
    if (f1) osc.frequency.exponentialRampToValueAtTime(f1, t0 + a + dur);
    const g = ctx.createGain(); env(g, t0, a, peak, dur);
    let node = osc;
    if (o.lp) { const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = o.lp; osc.connect(f); node = f; }
    node.connect(g); out(g, o.pan ?? 0, o.send ?? 0.25);
    osc.start(t0); osc.stop(t0 + a + dur + 0.05);
  }
  // 金属の鳴り（刀・鈴）: 整数倍でない倍音を重ね、高い倍音ほど早く消える
  function metal(t0, base, dur, peak, o = {}) {
    const ratios = o.ratios ?? [1, 2.32, 4.25, 6.63, 9.1];
    // 聞こえる上限（標本化周波数の半分）を超える倍音は鳴らさない
    ratios.forEach((r, i) => base * r < ctx.sampleRate * 0.45 && tone(t0, 'sine', base * r, base * r * (o.bend ?? 0.995), dur / (1 + i * 0.7), peak / (1 + i * 0.8), { attack: 0.002, pan: o.pan, send: o.send ?? 0.4 }));
  }
  const now = () => ctx.currentTime + 0.005;
  const rnd = (a, b) => a + Math.random() * (b - a);

  const api = {
    unlock() { ensure(); },
    // 斬撃: 風切り（高い雑音が下がる）＋刀の「シャン」
    slash(power = 1) {
      if (!ensure()) return; const t = now(), pan = rnd(-0.25, 0.25);
      noise(t, 0.13, 'bandpass', 6200, 1300, 1.3, 1.3 * power, { pan, send: 0.15 });
      noise(t + 0.01, 0.06, 'highpass', 7000, 4000, 0.7, 0.45 * power, { pan, send: 0.1 });
      metal(t + 0.02, rnd(2300, 2700), 0.32, 0.14 * power, { pan });
    },
    // 命中: 低い衝撃＋ざらついた当たり＋小さな弾け
    hit(power = 1) {
      if (!ensure()) return; const t = now() + 0.045;
      tone(t, 'sine', 160, 48, 0.22, 0.75 * power, { send: 0.2 });
      noise(t, 0.09, 'lowpass', 3000, 380, 0.9, 0.42 * power, { send: 0.2 });
      noise(t, 0.02, 'highpass', 5000, 3000, 0.7, 0.2 * power, { send: 0.05 });
    },
    // クリティカル: 明るいきらめき＋高い金属音
    crit() {
      if (!ensure()) return; const t = now() + 0.06;
      metal(t, 3100, 0.5, 0.06, { ratios: [1, 1.5, 2.01, 3.2] });
      tone(t, 'sine', 120, 40, 0.4, 0.8, { send: 0.3 });
    },
    // 閃のコンボの締め: 雪（氷の鈴）・月（柔らかい鐘）・花（明るいはじき）
    finisher(kind) {
      if (!ensure()) return; const t = now() + 0.05;
      if (kind === 'setsu') { metal(t, 2349, 0.7, 0.13, { ratios: [1, 1.33, 2.66, 4.1], send: 0.55 }); metal(t + 0.06, 3136, 0.6, 0.09, { ratios: [1, 2.1, 3.9], send: 0.55 }); }
      else if (kind === 'getsu') { metal(t, 880, 1.1, 0.15, { ratios: [1, 1.5, 2.5, 3.6], send: 0.6 }); noise(t, 0.5, 'bandpass', 1500, 3200, 2, 0.12, { attack: 0.08, send: 0.5 }); }
      else if (kind === 'ka') { [1047, 1319, 1568].forEach((f, i) => metal(t + i * 0.045, f, 0.45, 0.11, { ratios: [1, 2, 3.01], send: 0.5 })); }
    },
    // 範囲技（うねる風）
    wave() {
      if (!ensure()) return; const t = now();
      noise(t, 0.42, 'bandpass', 420, 3000, 0.9, 0.5, { attack: 0.03 });
      tone(t + 0.08, 'sine', 95, 38, 0.42, 0.55);
    },
    // 詠唱（居合術の構え）: 鞘の「カチッ」＋低いうなり＋気が満ちていく雑音
    cast(durMs) {
      if (!ensure()) return; const t = now(), d = Math.max(0.3, durMs / 1000);
      noise(t, 0.03, 'bandpass', 4200, 3800, 6, 0.8, { send: 0.3 });
      tone(t + 0.02, 'sine', 2400, 2300, 0.05, 0.12, { send: 0.3 });
      tone(t, 'sine', 70, 110, d * 0.95, 0.22, { attack: 0.25, send: 0.2 });
      noise(t, d * 0.9, 'lowpass', 300, 2600, 1.2, 0.2, { attack: d * 0.8, send: 0.3 });
    },
    // 居合術の抜刀: 鋭い一閃（何回斬るか）→ 重い衝撃
    iai(count = 1) {
      if (!ensure()) return; const t = now();
      for (let i = 0; i < count; i++) {
        const ti = t + i * 0.11;
        noise(ti, 0.07, 'bandpass', 9000, 1800, 1.6, 0.55, { pan: rnd(-0.3, 0.3), send: 0.2 });
        metal(ti + 0.015, rnd(1900, 2300), 0.4, 0.13);
      }
      const tl = t + count * 0.11 + 0.03;
      tone(tl, 'sine', 130, 34, 0.5, 0.9, { send: 0.35 });
      noise(tl, 0.35, 'lowpass', 2400, 120, 0.8, 0.5, { send: 0.4 });
    },
    // 剣気を使う技: 赤い閃光（上がる唸り）＋斬撃
    kenki() {
      if (!ensure()) return; const t = now();
      tone(t, 'sawtooth', 320, 1300, 0.14, 0.16, { lp: 2600, send: 0.2 });
      noise(t, 0.12, 'bandpass', 2000, 7000, 1.4, 0.9, { attack: 0.02 });
    },
    // バフ（鈴の音。上がっていく 2 音）
    buff() {
      if (!ensure()) return; const t = now();
      metal(t, 1175, 0.5, 0.13, { ratios: [1, 2, 3], send: 0.5 });
      metal(t + 0.08, 1568, 0.6, 0.12, { ratios: [1, 2, 3], send: 0.5 });
    },
    // 明鏡止水（水滴＋鈴）
    water() {
      if (!ensure()) return; const t = now();
      tone(t, 'sine', 1500, 520, 0.12, 0.35, { send: 0.5 });
      tone(t + 0.14, 'sine', 1300, 600, 0.1, 0.22, { send: 0.5 });
      metal(t + 0.1, 1760, 0.9, 0.1, { ratios: [1, 2.4, 3.9], send: 0.6 });
    },
    // 意気衝天（気が満ちる: 上がる唸り＋鐘）
    surge() {
      if (!ensure()) return; const t = now();
      tone(t, 'sawtooth', 110, 440, 0.45, 0.12, { lp: 1800, attack: 0.05, send: 0.3 });
      noise(t, 0.45, 'bandpass', 400, 2600, 1, 0.25, { attack: 0.3, send: 0.4 });
      metal(t + 0.4, 330, 1.2, 0.14, { ratios: [1, 2.01, 2.99, 4.2], send: 0.6 });
    },
    dot() { if (!ensure()) return; noise(now(), 0.07, 'bandpass', 900, 500, 1.5, 0.45, { send: 0.15 }); },
    // カウントダウン（木を打つ音）と戦闘開始（和音＋衝撃）
    tick() { if (!ensure()) return; const t = now(); tone(t, 'sine', 1150, 1100, 0.07, 0.4, { send: 0.3 }); tone(t, 'triangle', 2300, 2200, 0.03, 0.1, { send: 0.2 }); },
    go() {
      if (!ensure()) return; const t = now();
      [262, 330, 392, 523].forEach((f, i) => tone(t + i * 0.03, 'sawtooth', f, f, 0.7, 0.035, { lp: 2200, attack: 0.02, send: 0.5 }));
      tone(t, 'sine', 98, 50, 0.6, 0.6, { send: 0.3 });
    },
    // 使えない入力（低く短い 2 音）
    error() { if (!ensure()) return; const t = now(); tone(t, 'square', 180, 170, 0.05, 0.09, { lp: 1200, send: 0.1 }); tone(t + 0.07, 'square', 150, 140, 0.06, 0.09, { lp: 1200, send: 0.1 }); },
    // 敵の範囲攻撃の予兆（魔法の詠唱: うねりながら上がる）
    warn() {
      if (!ensure()) return; const t = now();
      noise(t, 0.9, 'bandpass', 300, 1800, 3, 0.35, { attack: 0.2, send: 0.5 });
      tone(t, 'triangle', 220, 330, 0.8, 0.1, { attack: 0.15, send: 0.5 });
    },
    // 範囲攻撃の発動（重い爆発）
    boom(power = 1) {
      if (!ensure()) return; const t = now();
      noise(t, 0.6, 'lowpass', 1400, 70, 0.7, 0.55 * power, { send: 0.45 });
      tone(t, 'sine', 70, 28, 0.6, 0.7 * power, { send: 0.3 });
    },
    // 自分の被弾（鈍い衝撃）
    hurt() {
      if (!ensure()) return; const t = now();
      noise(t, 0.22, 'lowpass', 1800, 240, 0.7, 0.6, { send: 0.2 });
      tone(t, 'sine', 90, 38, 0.3, 0.8, { send: 0.2 });
    },
    // ジャンプ・移動技（短い風音）
    whoosh() { if (!ensure()) return; noise(now(), 0.18, 'bandpass', 800, 3400, 1.2, 0.75, { attack: 0.02, send: 0.15 }); },
    // 撃破（崩れる音＋締めの和音）
    kill() {
      if (!ensure()) return; const t = now();
      for (let i = 0; i < 6; i++) noise(t + i * 0.09, 0.2, 'lowpass', 2200 - i * 250, 150, 0.8, 0.35 - i * 0.04, { send: 0.4 });
      [523, 659, 784, 1047].forEach((f, i) => metal(t + 0.5 + i * 0.09, f, 1.4, 0.1, { ratios: [1, 2, 3.01], send: 0.6 }));
    },
    // ---------------- ジャンル別の音（全ジョブ共通。ジョブは「武器」と「魔法の色」を決めるだけ）----------------
    // FF14 の手ざわりに寄せた合成音（ゲームの音声ファイルは使わない）:
    //   斬撃 = 風切り＋刃の鳴り＋当たり / 打撃 = 低く重い衝撃とざらつき（金属音なし）/ 射撃 = 弦の「ビン」→ 矢の風切り → 刺さる音
    //   魔法 = 属性ごとの着弾音（火: 燃え上がる轟き・氷: 砕ける結晶・雷: 破裂音と放電・風: 渦巻く風・土: 岩の地響き・水: 泡としぶき・
    //          聖: 明るい鐘と「シャン」・星: 星のきらめき・エーテル: うなる魔力・闇: 低いうねり）
    //   回復 = 上がっていくきらめき（範囲は左右に広がる和音）/ バリア = ガラスの響き＋包む風 / 強化 = 鈴の 2 音（全体は和音）
    // o.aoe: 範囲（音を厚く）、o.big: 大技（重い衝撃を足す）
    phys(kind = 'slash', power = 1, o = {}) {
      if (!ensure()) return; const t = now(), pan = rnd(-0.25, 0.25);
      if (kind === 'slash') { api.slash(power); api.hit(power); }
      else if (kind === 'blunt') {
        const ti = t + 0.03;
        tone(ti, 'sine', 130, 40, 0.28, 0.95 * power, { send: 0.22 });
        noise(ti, 0.14, 'lowpass', 1400, 160, 0.9, 0.75 * power, { pan, send: 0.2 });
        noise(ti, 0.05, 'bandpass', 900, 500, 1.2, 0.5 * power, { pan, send: 0.1 });
        noise(t, 0.08, 'bandpass', 700, 2200, 1, 0.35 * power, { attack: 0.02, pan, send: 0.1 }); // 振りかぶる風
      } else if (kind === 'pierce') {
        tone(t, 'triangle', 196, 188, 0.2, 0.32 * power, { lp: 1600, send: 0.2, pan });
        tone(t, 'sawtooth', 392, 380, 0.06, 0.06 * power, { lp: 2400, send: 0.1, pan });
        noise(t + 0.02, 0.12, 'bandpass', 2400, 5200, 1.4, 0.55 * power, { attack: 0.01, pan: pan * 0.5, send: 0.1 });
        const ti = t + 0.13;
        noise(ti, 0.05, 'bandpass', 1900, 600, 1.2, 0.7 * power, { send: 0.15 });
        tone(ti, 'sine', 240, 90, 0.12, 0.55 * power, { send: 0.15 });
      }
      if (o.aoe) api.wave();
      if (o.big) tone(t + 0.05, 'sine', 90, 30, 0.6, 0.8 * power, { send: 0.35 });
    },
    spell(el = 'aether', power = 1, o = {}) {
      if (!ensure()) return; const t = now() + 0.03, p = power, pan = rnd(-0.2, 0.2);
      switch (el) {
        case 'fire':
          noise(t, 0.1, 'lowpass', 500, 3000, 0.8, 0.35 * p, { attack: 0.04, send: 0.2 });
          noise(t + 0.1, 0.5, 'bandpass', 1100, 260, 0.8, 0.8 * p, { send: 0.35 });
          tone(t + 0.1, 'sine', 95, 38, 0.45, 0.7 * p, { send: 0.3 });
          for (let i = 0; i < 9; i++) noise(t + 0.12 + rnd(0, 0.45), 0.015, 'highpass', 3000, 2500, 0.7, rnd(0.12, 0.3) * p, { pan: rnd(-0.5, 0.5), send: 0.1 });
          break;
        case 'ice':
          noise(t, 0.3, 'highpass', 7000, 3000, 0.8, 0.45 * p, { send: 0.35 });
          for (let i = 0; i < 7; i++) metal(t + rnd(0, 0.12), rnd(2600, 5400), rnd(0.25, 0.5), 0.07 * p, { ratios: [1, 1.52, 2.7], pan: rnd(-0.5, 0.5), send: 0.55 });
          tone(t, 'sine', 2100, 1300, 0.3, 0.12 * p, { send: 0.5 });
          tone(t, 'sine', 120, 50, 0.3, 0.45 * p, { send: 0.2 });
          break;
        case 'thunder':
          noise(t, 0.035, 'highpass', 2500, 1800, 0.7, 1.3 * p, { send: 0.3 });
          tone(t + 0.01, 'sawtooth', 1600, 140, 0.26, 0.2 * p, { lp: 4500, send: 0.3 });
          tone(t + 0.02, 'square', 70, 45, 0.18, 0.08 * p, { lp: 900, send: 0.2 });
          noise(t + 0.03, 0.7, 'lowpass', 700, 60, 0.7, 0.55 * p, { send: 0.5 });
          break;
        case 'wind':
          noise(t, 0.35, 'bandpass', 450, 2800, 2.2, 0.55 * p, { attack: 0.08, pan: -0.4, send: 0.35 });
          noise(t + 0.12, 0.35, 'bandpass', 2600, 700, 2.2, 0.5 * p, { attack: 0.06, pan: 0.4, send: 0.35 });
          tone(t + 0.25, 'sine', 140, 60, 0.3, 0.4 * p, { send: 0.2 });
          break;
        case 'earth':
          tone(t, 'sine', 75, 32, 0.55, 0.95 * p, { send: 0.3 });
          noise(t, 0.45, 'lowpass', 900, 90, 0.7, 0.75 * p, { send: 0.35 });
          for (let i = 0; i < 6; i++) noise(t + 0.05 + rnd(0, 0.3), 0.04, 'bandpass', rnd(500, 1300), 300, 1.5, 0.3 * p, { pan: rnd(-0.4, 0.4), send: 0.15 });
          break;
        case 'water':
          for (let i = 0; i < 5; i++) tone(t + i * 0.04 + rnd(0, 0.02), 'sine', rnd(500, 900), rnd(1100, 1800), 0.06, 0.18 * p, { pan: rnd(-0.4, 0.4), send: 0.4 });
          noise(t + 0.05, 0.35, 'bandpass', 1800, 500, 1, 0.55 * p, { send: 0.35 });
          tone(t + 0.05, 'sine', 110, 50, 0.3, 0.45 * p, { send: 0.25 });
          break;
        case 'holy':
          [1760, 2637, 3520].forEach((f, i) => metal(t + i * 0.02, f, 0.7, 0.07 * p, { ratios: [1, 2.01, 3.02], send: 0.6, pan: (i - 1) * 0.3 }));
          noise(t, 0.3, 'highpass', 4000, 9000, 0.7, 0.4 * p, { attack: 0.02, send: 0.5 });
          tone(t + 0.03, 'sine', 140, 55, 0.5, 0.75 * p, { send: 0.35 });
          break;
        case 'astral':
          [1319, 1976, 2637].forEach((f, i) => metal(t + i * 0.05, f, 0.8, 0.07 * p, { ratios: [1, 2.4, 3.9], send: 0.6, pan: (i - 1) * 0.35 }));
          noise(t + 0.02, 0.45, 'bandpass', 3000, 6000, 1.5, 0.25 * p, { attack: 0.05, send: 0.55 });
          tone(t + 0.04, 'sine', 120, 50, 0.45, 0.65 * p, { send: 0.3 });
          break;
        case 'dark':
          tone(t, 'sawtooth', 95, 55, 0.5, 0.18 * p, { lp: 700, send: 0.35 });
          tone(t, 'sawtooth', 98, 57, 0.5, 0.18 * p, { lp: 700, send: 0.35 });
          noise(t, 0.4, 'lowpass', 1200, 120, 0.8, 0.5 * p, { send: 0.35 });
          break;
        default: // aether（無属性の魔力）
          tone(t, 'sawtooth', 700, 150, 0.28, 0.16 * p, { lp: 2200, send: 0.35, pan });
          noise(t, 0.22, 'bandpass', 2600, 700, 1.4, 0.55 * p, { send: 0.3, pan });
          tone(t + 0.04, 'sine', 180, 60, 0.4, 0.7 * p, { send: 0.3 });
          metal(t + 0.02, 1175, 0.4, 0.05 * p, { ratios: [1, 1.5, 2.25], send: 0.5 });
      }
      if (o.aoe) noise(t + 0.08, 0.5, 'lowpass', 1600, 120, 0.8, 0.35 * p, { send: 0.45 });
      if (o.big) { tone(t + 0.06, 'sine', 70, 26, 0.8, 0.9 * p, { send: 0.45 }); noise(t + 0.06, 0.8, 'lowpass', 1800, 60, 0.7, 0.5 * p, { send: 0.5 }); }
    },
    heal(kind = 'single') {
      if (!ensure()) return; const t = now();
      if (kind === 'hot') { metal(t, rnd(2400, 2900), 0.35, 0.035, { ratios: [1, 2.76], send: 0.6 }); return; }
      if (kind === 'shield') {
        noise(t, 0.35, 'bandpass', 400, 2600, 1.6, 0.35, { attack: 0.08, send: 0.45 });
        metal(t + 0.08, 1397, 0.9, 0.08, { ratios: [1, 1.5, 2.99], send: 0.6 });
        metal(t + 0.12, 2093, 0.8, 0.05, { ratios: [1, 2.01], send: 0.6 });
        tone(t, 'sine', 220, 330, 0.6, 0.1, { attack: 0.1, send: 0.4 });
        return;
      }
      if (kind === 'raise') {
        [392, 523, 659, 784].forEach((f, i) => tone(t + i * 0.12, 'sine', f, f * 1.003, 1.4, 0.07, { attack: 0.3, send: 0.6 }));
        for (let i = 0; i < 8; i++) metal(t + 0.2 + i * 0.09, rnd(2000, 4200), 0.5, 0.04, { ratios: [1, 2.5], pan: rnd(-0.6, 0.6), send: 0.6 });
        return;
      }
      const aoe = kind === 'aoe';
      // 上がっていくきらめき（範囲は左右から）＋柔らかい和音
      const notes = [1568, 2093, 2637, 3136];
      for (const side of aoe ? [-0.5, 0.5] : [0]) notes.forEach((f, i) => metal(t + i * 0.055 + (side > 0 ? 0.03 : 0), f, 0.55, 0.06, { ratios: [1, 2.76], pan: side, send: 0.6 }));
      noise(t + 0.05, 0.5, 'highpass', 5000, 9000, 0.7, 0.18, { attack: 0.12, send: 0.5 });
      (aoe ? [523, 659, 784] : [784, 1047]).forEach((f) => tone(t, 'sine', f, f * 1.01, aoe ? 1 : 0.6, aoe ? 0.06 : 0.07, { attack: 0.08, send: 0.55 }));
    },
    // 強化: self 自分（鈴の 2 音）/ party 全体（和音の鐘）/ song 歌（竪琴の上がる音）/ summon 召喚（湧き上がる轟きと鐘）
    boost(kind = 'self') {
      if (!ensure()) return; const t = now();
      if (kind === 'self') { api.buff(); return; }
      if (kind === 'party') {
        [587, 740, 880, 1175].forEach((f, i) => metal(t + i * 0.03, f, 1.1, 0.07, { ratios: [1, 2, 3.01], send: 0.6, pan: (i - 1.5) * 0.25 }));
        noise(t, 0.5, 'bandpass', 500, 3000, 1, 0.22, { attack: 0.25, send: 0.5 });
        return;
      }
      if (kind === 'song') { [523, 659, 784, 1047, 1319].forEach((f, i) => tone(t + i * 0.06, 'triangle', f, f, 0.5, 0.08, { lp: 3500, send: 0.5, pan: (i - 2) * 0.2 })); return; }
      if (kind === 'summon') {
        noise(t, 0.6, 'lowpass', 200, 3200, 0.9, 0.45, { attack: 0.45, send: 0.5 });
        tone(t, 'sawtooth', 55, 130, 0.6, 0.12, { lp: 1200, attack: 0.4, send: 0.4 });
        tone(t + 0.6, 'sine', 80, 30, 0.7, 0.9, { send: 0.4 });
        metal(t + 0.6, 440, 1.4, 0.12, { ratios: [1, 2.01, 2.99, 4.2], send: 0.6 });
      }
    },
    // 魔法の詠唱: 属性の色の柔らかいうなり（詠唱の長さだけ）
    castMagic(durMs, el = 'aether') {
      if (!ensure()) return; const t = now(), d = Math.max(0.3, durMs / 1000);
      const f = { fire: 220, ice: 660, thunder: 330, wind: 440, earth: 165, water: 392, holy: 523, astral: 587, dark: 147, aether: 294 }[el] ?? 294;
      tone(t, 'triangle', f, f * 1.5, d * 0.95, 0.05, { attack: d * 0.6, lp: 2400, send: 0.5 });
      tone(t, 'sine', f / 2, f * 0.75, d * 0.95, 0.12, { attack: d * 0.5, send: 0.3 });
      noise(t, d * 0.9, 'bandpass', f * 2, f * 6, 2, 0.12, { attack: d * 0.7, send: 0.5 });
      metal(t, f * 4, 0.3, 0.025, { ratios: [1, 2], send: 0.5 });
    },
    setEnabled(v) { enabled = !!v; save(); if (enabled) ensure(); },
    isEnabled: () => enabled,
    setVolume(v) { volume = Math.max(0, Math.min(1, v)); if (master) master.gain.value = volume; save(); },
    getVolume: () => volume,
  };
  window.MockAudio = api;
})();
