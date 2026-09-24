// UI モックの効果音。Web Audio API でその場で合成する（ゲームの音声は使わない）。
// ブラウザの自動再生の制限があるため、最初のキー入力やクリックのあとで鳴り始める。
(function () {
  'use strict';
  const KEY = 'ff14rt:mock:audio';
  let ctx = null, master = null, noiseBuf = null;
  let enabled = true, volume = 0.45;
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? 'null');
    if (v) { enabled = !!v.enabled; volume = Number(v.volume) || volume; }
  } catch { /* 保存がなくても動く */ }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify({ enabled, volume })); } catch { /* 無視 */ } };

  function ensure() {
    if (!enabled) return false;
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return false;
      ctx = new AC();
      const comp = ctx.createDynamicsCompressor();
      comp.threshold.value = -14; comp.ratio.value = 4;
      master = ctx.createGain(); master.gain.value = volume;
      master.connect(comp); comp.connect(ctx.destination);
      noiseBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
      const d = noiseBuf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    }
    if (ctx.state === 'suspended') ctx.resume();
    return true;
  }

  function env(g, t0, attack, peak, decay) {
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0002, peak), t0 + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + attack + decay);
  }
  function noise(t0, dur, type, f0, f1, q, peak, attack = 0.004) {
    const src = ctx.createBufferSource(); src.buffer = noiseBuf;
    const f = ctx.createBiquadFilter(); f.type = type; f.Q.value = q;
    f.frequency.setValueAtTime(f0, t0); f.frequency.exponentialRampToValueAtTime(f1, t0 + attack + dur);
    const g = ctx.createGain(); env(g, t0, attack, peak, dur);
    src.connect(f); f.connect(g); g.connect(master);
    src.start(t0, Math.random() * 0.5); src.stop(t0 + attack + dur + 0.05);
  }
  function tone(t0, type, f0, f1, dur, peak, attack = 0.004) {
    const o = ctx.createOscillator(); o.type = type;
    o.frequency.setValueAtTime(f0, t0);
    if (f1) o.frequency.exponentialRampToValueAtTime(f1, t0 + attack + dur);
    const g = ctx.createGain(); env(g, t0, attack, peak, dur);
    o.connect(g); g.connect(master);
    o.start(t0); o.stop(t0 + attack + dur + 0.05);
  }
  const now = () => ctx.currentTime + 0.005;

  const api = {
    unlock() { ensure(); },
    // 斬撃（風切り音＋刃鳴り）
    slash(power = 1) {
      if (!ensure()) return; const t = now();
      noise(t, 0.14, 'bandpass', 4200, 1100, 1.4, 0.55 * power);
      tone(t + 0.01, 'triangle', 1900, 700, 0.08, 0.07 * power);
    },
    // 命中（低い打撃音）
    hit(power = 1) {
      if (!ensure()) return; const t = now() + 0.05;
      tone(t, 'sine', 150, 52, 0.2, 0.6 * power);
      noise(t, 0.07, 'lowpass', 2600, 500, 0.8, 0.35 * power);
    },
    // クリティカル（明るい響き）
    crit() {
      if (!ensure()) return; const t = now() + 0.06;
      tone(t, 'triangle', 1568, 1568, 0.35, 0.09);
      tone(t + 0.03, 'triangle', 2093, 2093, 0.4, 0.07);
      tone(t, 'sine', 110, 45, 0.35, 0.7);
    },
    // 範囲技（うねる風）
    wave() {
      if (!ensure()) return; const t = now();
      noise(t, 0.45, 'bandpass', 500, 2600, 0.9, 0.5, 0.03);
      tone(t + 0.08, 'sine', 90, 40, 0.4, 0.5);
    },
    // 詠唱（上がっていく音）
    cast(durMs) {
      if (!ensure()) return; const t = now(), d = Math.max(0.3, durMs / 1000);
      tone(t, 'sine', 330, 880, d * 0.95, 0.06, 0.05);
      tone(t, 'triangle', 660, 1320, d * 0.95, 0.025, 0.08);
    },
    // バフ（鈴の音）
    buff() {
      if (!ensure()) return; const t = now();
      tone(t, 'sine', 1175, 1175, 0.4, 0.09);
      tone(t + 0.07, 'sine', 1760, 1760, 0.45, 0.07);
    },
    dot() { if (!ensure()) return; noise(now(), 0.05, 'bandpass', 900, 600, 2, 0.12); },
    // カウントダウン
    tick() { if (!ensure()) return; tone(now(), 'square', 880, 880, 0.07, 0.05); },
    go() {
      if (!ensure()) return; const t = now();
      [523, 659, 784, 1047].forEach((f, i) => tone(t + i * 0.035, 'triangle', f, f, 0.5, 0.06));
      tone(t, 'sine', 98, 60, 0.6, 0.5);
    },
    // 使えない入力
    error() { if (!ensure()) return; const t = now(); tone(t, 'square', 196, 150, 0.08, 0.05); },
    setEnabled(v) { enabled = !!v; save(); if (enabled) ensure(); },
    isEnabled: () => enabled,
    setVolume(v) { volume = Math.max(0, Math.min(1, v)); if (master) master.gain.value = volume; save(); },
    getVolume: () => volume,
  };
  window.MockAudio = api;
})();
