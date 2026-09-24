// ゲームモード: 全画面表示＋キーボードロックで、Ctrl+W・Ctrl+数字・F5・Alt などのブラウザ操作をゲーム側で受け取る。
// - キーボードロック（navigator.keyboard.lock）は Chrome / Edge の全画面表示中のみ有効。Firefox / Safari は全画面だけになる
// - 解除は Esc の長押し（ブラウザの仕様）。短く押した Esc はゲーム側に届く
// - 右クリックメニュー、Ctrl+ホイールの拡大、練習中のページ移動も止める
(function () {
  'use strict';
  const canLock = !!(navigator.keyboard && navigator.keyboard.lock);
  const canFull = !!document.documentElement.requestFullscreen;
  let active = false, locked = false;
  const listeners = [];
  let isBusy = () => false; // 練習中か（ページを離れる確認に使う）

  const notify = () => listeners.forEach((fn) => fn({ active, locked, canLock, canFull }));

  async function enter() {
    if (!canFull) return { ok: false, reason: 'このブラウザは全画面表示に対応していません' };
    try {
      if (!document.fullscreenElement) await document.documentElement.requestFullscreen({ navigationUI: 'hide' });
    } catch {
      return { ok: false, reason: '全画面表示にできませんでした（ボタンを押して開始してください）' };
    }
    locked = false;
    if (canLock) { try { await navigator.keyboard.lock(); locked = true; } catch { locked = false; } }
    active = true; notify();
    return { ok: true, locked };
  }

  async function exit() {
    try { navigator.keyboard?.unlock?.(); } catch { /* 無視 */ }
    if (document.fullscreenElement) { try { await document.exitFullscreen(); } catch { /* 無視 */ } }
    active = false; locked = false; notify();
  }

  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement && active) {
      try { navigator.keyboard?.unlock?.(); } catch { /* 無視 */ }
      active = false; locked = false; notify();
    }
  });

  // ゲームモード中は、入力欄以外でのキーのブラウザ動作を止める（Esc は全画面解除の長押しのために止めない）
  function guardKey(e) {
    const tag = e.target?.tagName;
    if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return;
    if (active) { if (e.code !== 'Escape') e.preventDefault(); return; }
    // 通常時も、ゲームで使うことが多いキーのブラウザ動作は止める
    if (/^F([1-9]|10)$/.test(e.code) || e.code === 'Tab' || e.key === 'Alt' || e.code === 'Space' || (e.altKey && /^Key|^Digit/.test(e.code))) e.preventDefault();
  }

  window.addEventListener('contextmenu', (e) => { if (e.target.closest?.('#stage')) e.preventDefault(); });
  window.addEventListener('wheel', (e) => { if (active && e.ctrlKey) e.preventDefault(); }, { passive: false });
  window.addEventListener('keyup', (e) => { if (e.key === 'Alt' || active) e.preventDefault(); });
  window.addEventListener('beforeunload', (e) => { if (isBusy()) { e.preventDefault(); e.returnValue = ''; } });

  window.MockGameMode = {
    enter, exit, guardKey,
    isActive: () => active,
    isLocked: () => locked,
    canLock, canFull,
    onChange: (fn) => listeners.push(fn),
    setBusyCheck: (fn) => { isBusy = fn; },
  };
})();
