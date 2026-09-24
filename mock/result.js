// 結果画面（全画面・すっきり・高画質）。mock.js が集計した report（R）を受け取って表示する。
// 上: ランクと点数・大事な数字 4 つ・直すと良いところ。下: タブ（タイムライン / すべての指標 / 使ったアクション / ミスの一覧）。
// タイムラインの canvas は、画面の拡大率 × 端末の画素密度で描く（引き伸ばしてぼやけないように）。
(function () {
  'use strict';
  const h = (tag, cls, text) => {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    if (text != null) el.textContent = text;
    return el;
  };
  const rate = (p) => (p == null ? '' : p >= 90 ? 'good' : p >= 70 ? 'ok' : 'bad');
  const clock = (ms) => `${Math.floor(ms / 60000)}:${((ms % 60000) / 1000).toFixed(1).padStart(4, '0')}`;
  const num = (v) => Math.round(v).toLocaleString('ja-JP');

  let current = null;

  function show(root, R, o) {
    current = { R, o };
    root.innerHTML = '';
    root.hidden = false;

    // ---- 見出し ----
    const head = h('header', 'rs-head');
    const title = h('div', 'rs-title');
    const ic = h('img', 'rs-job');
    ic.src = R.jobIcon; ic.alt = '';
    const tt = h('div');
    tt.append(h('h2', null, '結果'), h('div', 'rs-sub', R.subtitle));
    title.append(ic, tt);
    const btns = h('div', 'rs-btns');
    const retry = h('button', 'rs-btn primary');
    retry.type = 'button'; retry.innerHTML = 'もう一度 <kbd>Space</kbd>';
    retry.addEventListener('click', () => o.onRetry());
    const csvBtn = h('button', 'rs-btn', 'CSV で保存');
    csvBtn.type = 'button';
    csvBtn.addEventListener('click', () => download(R));
    const close = h('button', 'rs-btn', '閉じる');
    close.type = 'button';
    close.addEventListener('click', () => o.onClose());
    btns.append(retry, csvBtn, close);
    head.append(title, btns);

    // ---- 上段: ランク・大事な数字・直すと良いところ ----
    const top = h('section', 'rs-top');
    const left = h('div', 'rs-score');
    const badge = h('div', `rs-grade g-${R.grade}`, R.grade);
    const sc = h('div', 'rs-points');
    sc.append(h('b', null, String(R.score)), h('span', null, '点'));
    const scWrap = h('div', 'rs-scorebox');
    scWrap.append(badge, sc, h('div', 'rs-end', R.endLabel));
    left.appendChild(scWrap);
    const tiles = h('div', 'rs-tiles');
    for (const t of R.big) {
      const d = h('div', `rs-tile ${rate(t.rate)}`);
      d.append(h('div', 'rs-tile-label', t.label), h('div', 'rs-tile-value', t.value), h('div', 'rs-tile-sub', t.sub ?? ''));
      tiles.appendChild(d);
    }
    left.appendChild(tiles);
    const right = h('div', 'rs-advice');
    right.appendChild(h('h3', null, '直すと良いところ'));
    const ul = h('ul', 'rs-issues');
    if (!R.issues.length) ul.appendChild(h('li', 'rs-none', '特になし。この調子で！'));
    for (const it of R.issues.slice(0, 3)) {
      const li = h('li', it.rate);
      const adv = h('span', null, it.advice);
      adv.title = it.advice;
      li.append(h('b', null, it.title), adv);
      ul.appendChild(li);
    }
    right.appendChild(ul);
    if (R.goods.length) {
      right.appendChild(h('h3', 'rs-good-h', '良かったところ'));
      const gl = h('ul', 'rs-goods');
      for (const g of R.goods.slice(0, 2)) gl.appendChild(h('li', null, g));
      right.appendChild(gl);
    }
    top.append(left, right);

    // ---- 下段: タブ ----
    const tabs = h('nav', 'rs-tabs');
    const body = h('section', 'rs-body');
    const pages = [
      ['timeline', 'タイムライン', () => pageTimeline(body, R, o)],
      ['metrics', 'すべての指標', () => pageMetrics(body, R)],
      ['uses', '使ったアクション', () => pageUses(body, R)],
      ['misses', `ミスの一覧（${R.misses.length}）`, () => pageMisses(body, R)],
    ];
    const open = (id) => {
      for (const b of tabs.children) b.classList.toggle('on', b.dataset.id === id);
      body.innerHTML = '';
      pages.find((p) => p[0] === id)[2]();
    };
    for (const [id, label] of pages) {
      const b = h('button', 'rs-tab', label);
      b.type = 'button'; b.dataset.id = id;
      b.addEventListener('click', () => open(id));
      tabs.appendChild(b);
    }
    root.append(head, top, tabs, body);
    root.appendChild(h('div', 'rs-note', R.note));
    open('timeline');
  }

  // ---------------- タイムライン ----------------
  function pageTimeline(body, R, o) {
    const wrap = h('div', 'rs-tl');
    const cv = h('canvas', 'rs-tl-canvas');
    const tip = h('div', 'rs-tl-tip');
    tip.hidden = true;
    wrap.append(cv, tip);
    const legend = h('div', 'rs-legend');
    for (const [col, text] of [['#e05548', '止まり'], ['#f0a040', 'クリップ'], ['#b77cff', '詠唱中断'], ['#ff6a5a', 'ミス（方向指定・被弾など）']]) {
      const s = h('span');
      const dot = h('i');
      dot.style.background = col;
      s.append(dot, text);
      legend.appendChild(s);
    }
    body.append(wrap, legend);
    requestAnimationFrame(() => drawTimeline(cv, R, o));
    const lay = () => cv._lay;
    cv.addEventListener('mousemove', (e) => {
      const L = lay(); if (!L) return;
      const r = cv.getBoundingClientRect();
      const x = (e.clientX - r.left) / L.k;
      if (x < L.left || x > L.right) { tip.hidden = true; return; }
      const t = ((x - L.left) / (L.right - L.left)) * R.tl.dur;
      const near = R.tl.all.filter((ev) => Math.abs(ev.t - t) <= (R.tl.dur / (L.right - L.left)) * 6).slice(0, 6);
      if (!near.length) { tip.hidden = true; return; }
      tip.innerHTML = '';
      tip.appendChild(h('b', null, clock(t)));
      for (const ev of near) tip.appendChild(h('div', ev.kind === 'miss' ? 'miss' : '', `${clock(ev.t)}  ${ev.text}`));
      tip.hidden = false;
      tip.style.left = `${Math.min(x + 12, L.right - 220)}px`;
      tip.style.top = `${(e.clientY - r.top) / L.k + 14}px`;
    });
    cv.addEventListener('mouseleave', () => { tip.hidden = true; });
  }

  function drawTimeline(cv, R, o) {
    const k = o.scale(); // 画面の拡大率（舞台の 1px が画面の何 px か）
    const dpr = window.devicePixelRatio || 1;
    const rect = cv.getBoundingClientRect();
    const w = rect.width / k, hgt = rect.height / k;
    cv.width = Math.round(rect.width * dpr); cv.height = Math.round(rect.height * dpr);
    const c = cv.getContext('2d');
    c.setTransform(k * dpr, 0, 0, k * dpr, 0, 0);
    const left = 112, right = w - 16, dur = R.tl.dur;
    cv._lay = { k, left, right };
    const X = (t) => left + (Math.max(0, Math.min(dur, t)) / dur) * (right - left);
    const lanes = [
      { key: 'gcd', label: 'ウェポンスキル', y: 12, h: 28 },
      { key: 'ogcd', label: 'アビリティ', y: 52, h: 18 },
      ...R.tl.buffs.map((b, i) => ({ key: `buff${i}`, label: b.name, y: 84 + i * 16, h: 10, buff: b })),
      { key: 'miss', label: 'ミス', y: 84 + R.tl.buffs.length * 16 + 10, h: 18 },
    ];
    const axisY = lanes[lanes.length - 1].y + 34;
    c.font = '600 13px "Zen Kaku Gothic New", "Hiragino Kaku Gothic ProN", "Yu Gothic UI", "Meiryo", sans-serif';
    c.textBaseline = 'middle';
    // 段の背景と名前
    for (const L of lanes) {
      c.fillStyle = 'rgba(255,255,255,.035)';
      c.fillRect(left, L.y, right - left, L.h);
      c.fillStyle = '#aab0bb';
      c.textAlign = 'right';
      c.fillText(L.label, left - 10, L.y + L.h / 2);
    }
    // 10 秒ごとの目盛り
    c.textAlign = 'center';
    const step = dur > 180000 ? 30000 : 10000;
    for (let t = 0; t <= dur + 1; t += step) {
      const x = X(t);
      c.strokeStyle = 'rgba(255,255,255,.07)';
      c.beginPath(); c.moveTo(x + 0.5, 8); c.lineTo(x + 0.5, axisY - 6); c.stroke();
      c.fillStyle = '#8c929c';
      c.fillText(`${Math.round(t / 1000)}`, x, axisY + 4);
    }
    // ウェポンスキル（色は技の種類）と、止まり・クリップ・中断
    const G = lanes[0];
    for (const g of R.tl.gcd) {
      c.fillStyle = g.color;
      c.globalAlpha = g.cut ? 0.35 : 1;
      c.fillRect(X(g.t) + 0.5, G.y + 3, Math.max(1.5, X(g.end) - X(g.t) - 1.5), G.h - 6);
    }
    c.globalAlpha = 1;
    const gapCol = { idle: '#e05548', clip: '#f0a040', cut: '#b77cff' };
    for (const g of R.tl.gaps) {
      c.fillStyle = gapCol[g.kind];
      c.fillRect(X(g.from), G.y + G.h - 3, Math.max(2, X(g.to) - X(g.from)), 5);
    }
    // アビリティ
    const O = lanes[1];
    for (const a of R.tl.ogcd) {
      const x = X(a.t), y = O.y + O.h / 2;
      c.fillStyle = a.hot ? '#ff7a5a' : '#f2d27a';
      c.beginPath(); c.moveTo(x, y - 7); c.lineTo(x + 6, y); c.lineTo(x, y + 7); c.lineTo(x - 6, y); c.closePath(); c.fill();
    }
    // バフ・デバフの維持
    for (const L of lanes.filter((l) => l.buff)) {
      c.fillStyle = L.buff.color;
      for (const iv of L.buff.iv) c.fillRect(X(iv.from), L.y, Math.max(1.5, X(iv.to) - X(iv.from)), L.h);
    }
    // ミス
    const M = lanes[lanes.length - 1];
    for (const m of R.tl.marks) {
      const x = X(m.t), y = M.y + M.h / 2;
      c.fillStyle = m.color ?? '#ff6a5a';
      c.beginPath(); c.moveTo(x - 6, y - 7); c.lineTo(x + 6, y - 7); c.lineTo(x, y + 7); c.closePath(); c.fill();
    }
    cv.style.height = `${axisY + 18}px`;
    if (Math.abs(rect.height / k - (axisY + 18)) > 1) requestAnimationFrame(() => drawTimeline(cv, R, o)); // 高さが変わったら描き直す
  }

  // ---------------- すべての指標 ----------------
  function pageMetrics(body, R) {
    const grid = h('div', 'rs-metrics');
    for (const m of R.metrics) {
      const row = h('div', `rs-m ${rate(m.rate)}`);
      row.append(h('span', 'rs-m-label', m.label), h('span', 'rs-m-value', m.value));
      grid.appendChild(row);
    }
    body.appendChild(grid);
  }

  // ---------------- 使ったアクション ----------------
  function pageUses(body, R) {
    const grid = h('div', 'rs-uses');
    for (const u of R.uses) {
      const d = h('div', 'rs-use');
      const img = h('img');
      img.src = u.icon; img.alt = '';
      const t = h('div', 'rs-use-t');
      t.append(h('b', null, u.name), h('span', null, u.dmg ? `${u.n} 回・${num(u.dmg)}` : `${u.n} 回`));
      d.append(img, t);
      grid.appendChild(d);
    }
    body.appendChild(grid);
  }

  // ---------------- ミスの一覧 ----------------
  function pageMisses(body, R) {
    const list = h('ol', 'rs-misses');
    if (!R.misses.length) list.appendChild(h('li', 'rs-none', 'ミスはありませんでした'));
    for (const m of R.misses) {
      const li = h('li');
      li.append(h('time', null, clock(m.t)), h('span', `rs-kind k-${m.kind}`, m.label), h('span', 'rs-text', m.text));
      list.appendChild(li);
    }
    body.appendChild(list);
  }

  // ---------------- CSV ----------------
  // Excel でも文字化けしないよう、UTF-8 の BOM を付ける。1 行目からまとめ、空行のあとに行動の記録
  const cell = (v) => {
    const s = v == null ? '' : String(v);
    return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  function csv(R) {
    const lines = [];
    lines.push(['項目', '値'].join(','));
    for (const [k, v] of R.summary) lines.push([cell(k), cell(v)].join(','));
    lines.push('');
    const cols = ['時刻(秒)', '種類', 'アクション', '結果', '威力', 'ダメージ', '敵のHP', '剣気', '閃', '剣圧', '敵から見た位置', '敵との距離(m)', 'メモ'];
    lines.push(cols.join(','));
    for (const e of R.events) {
      lines.push([(e.t / 1000).toFixed(2), e.kind, e.action ?? '', e.result ?? '', e.potency ?? '', e.dmg ?? '', e.hp ?? '', e.kenki, e.sen, e.med, e.pos ?? '', e.dist ?? '', e.note ?? ''].map(cell).join(','));
    }
    return lines.join('\r\n') + '\r\n';
  }
  function download(R) {
    const blob = new Blob(['﻿', csv(R)], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = R.fileName;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }

  // 画面の大きさが変わったら、タイムラインを描き直す
  window.addEventListener('resize', () => {
    const cv = document.querySelector('.rs-tl-canvas');
    if (cv && current) drawTimeline(cv, current.R, current.o);
  });

  window.MockResult = { show, csv, download };
})();
