// UI モックの効果音。Web Audio API でその場で合成する（ゲームの音声ファイルは使わない）。
// FF14 の侍の手ざわりに寄せて、斬撃は「風切り＋刀の金属の鳴り」、命中は「低い衝撃」、居合術は「溜め → 鋭い抜刀 → 重い衝撃」。
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
    ratios.forEach((r, i) => tone(t0, 'sine', base * r, base * r * (o.bend ?? 0.995), dur / (1 + i * 0.7), peak / (1 + i * 0.8), { attack: 0.002, pan: o.pan, send: o.send ?? 0.4 }));
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
    setEnabled(v) { enabled = !!v; save(); if (enabled) ensure(); },
    isEnabled: () => enabled,
    setVolume(v) { volume = Math.max(0, Math.min(1, v)); if (master) master.gain.value = volume; save(); },
    getVolume: () => volume,
  };
  window.MockAudio = api;
})();
