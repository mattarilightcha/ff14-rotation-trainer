// 設定画面（FF14 のキャラクターコンフィグ風）: 左にカテゴリ、右に「見出し・項目名・操作」の行を並べる。
// 中身（どの項目を出すか）は mock.js が tab() で渡す。開くたびに作り直すので、表示は常に今の値になる。
(function () {
  'use strict';
  const h = (tag, cls, text) => {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    if (text != null) el.textContent = text;
    return el;
  };
  let uid = 0;

  // ---- 操作の部品（どれも要素を返す）----
  const kit = {
    section(pane, title, note) {
      const s = h('div', 'cfg-section');
      s.appendChild(h('div', 'cfg-head', title));
      if (note) s.appendChild(h('div', 'cfg-note', note));
      pane.appendChild(s);
      return s;
    },
    // 1 行: 左に項目名（と補足）、右に操作
    row(sec, label, control, note) {
      const r = h('div', 'cfg-row');
      const l = h('div', 'cfg-label');
      l.appendChild(h('span', null, label));
      if (note) l.appendChild(h('small', null, note));
      const c = h('div', 'cfg-ctl');
      for (const x of [].concat(control)) if (x) c.appendChild(x);
      r.append(l, c);
      sec.appendChild(r);
      return r;
    },
    toggle(value, onChange, labels = ['入', '切']) {
      const b = h('button', `cfg-toggle${value ? ' on' : ''}`);
      b.type = 'button';
      b.setAttribute('role', 'switch');
      b.setAttribute('aria-checked', String(!!value));
      b.innerHTML = '<i></i><span></span>';
      const sync = () => { b.classList.toggle('on', value); b.setAttribute('aria-checked', String(value)); b.lastChild.textContent = value ? labels[0] : labels[1]; };
      sync();
      b.addEventListener('click', () => { value = !value; sync(); onChange(value); });
      return b;
    },
    // 並んだボタンから 1 つ選ぶ
    choice(options, value, onChange) {
      const g = h('div', 'cfg-choice');
      g.setAttribute('role', 'radiogroup');
      for (const [v, text] of options) {
        const b = h('button', v === value ? 'on' : '', text);
        b.type = 'button';
        b.setAttribute('role', 'radio');
        b.setAttribute('aria-checked', String(v === value));
        b.addEventListener('click', () => {
          for (const x of g.children) { x.classList.toggle('on', x === b); x.setAttribute('aria-checked', String(x === b)); }
          onChange(v);
        });
        g.appendChild(b);
      }
      return g;
    },
    select(options, value, onChange) {
      const s = h('select', 'cfg-select');
      for (const [v, text] of options) {
        const o = h('option', null, text);
        o.value = String(v);
        if (String(v) === String(value)) o.selected = true;
        s.appendChild(o);
      }
      s.addEventListener('change', () => onChange(s.value));
      return s;
    },
    range(min, max, step, value, onChange, fmt = (v) => String(v)) {
      const w = h('div', 'cfg-range');
      const i = h('input');
      i.type = 'range'; i.min = min; i.max = max; i.step = step; i.value = value;
      i.id = `cfg-r${++uid}`;
      const out = h('output', null, fmt(Number(value)));
      out.htmlFor = i.id;
      i.addEventListener('input', () => { out.textContent = fmt(Number(i.value)); onChange(Number(i.value)); });
      w.append(i, out);
      return w;
    },
    number(value, min, max, onChange, width = 72) {
      const i = h('input', 'cfg-number');
      i.type = 'number'; i.min = min; i.max = max; i.step = 1; i.value = value;
      i.style.width = `${width}px`;
      i.addEventListener('change', () => { const v = Number(i.value); if (v >= min && v <= max) onChange(v); else i.value = value; });
      return i;
    },
    button(text, onClick, cls = '') {
      const b = h('button', `cfg-btn ${cls}`.trim(), text);
      b.type = 'button';
      b.addEventListener('click', onClick);
      return b;
    },
    text(text, cls = 'cfg-value') { return h('span', cls, text); },
    keycap(label) { return h('kbd', 'cfg-key', label); },
    el: h,
  };

  // ---- 窓 ----
  function create(host, o) {
    const back = h('div', 'cfg-back');
    back.hidden = true;
    const win = h('section', 'cfg-win');
    win.setAttribute('role', 'dialog');
    win.setAttribute('aria-modal', 'true');
    win.setAttribute('aria-label', o.title);
    const bar = h('div', 'cfg-titlebar');
    bar.appendChild(h('span', 'cfg-title', o.title));
    const x = h('button', 'cfg-x', '×');
    x.type = 'button';
    x.setAttribute('aria-label', '閉じる');
    bar.appendChild(x);
    const body = h('div', 'cfg-body');
    const nav = h('nav', 'cfg-nav');
    const pane = h('div', 'cfg-pane');
    body.append(nav, pane);
    const foot = h('div', 'cfg-foot');
    const foot1 = h('div', 'cfg-foot-note', o.footNote ?? '');
    const close = kit.button('閉じる', () => api.close(), 'primary');
    foot.append(foot1, close);
    win.append(bar, body, foot);
    back.appendChild(win);
    host.appendChild(back);

    const tabs = [];
    let current = null;
    function show(id) {
      current = id;
      for (const t of tabs) t.btn.classList.toggle('on', t.id === id);
      pane.innerHTML = '';
      const t = tabs.find((x) => x.id === id);
      if (t) { pane.appendChild(h('h2', 'cfg-pane-title', t.label)); t.build(pane, kit); }
      pane.scrollTop = 0;
    }
    x.addEventListener('click', () => api.close());
    back.addEventListener('pointerdown', (e) => { if (e.target === back) api.close(); });

    const api = {
      tab(id, label, build) {
        const btn = h('button', 'cfg-tab', label);
        btn.type = 'button';
        btn.addEventListener('click', () => show(id));
        nav.appendChild(btn);
        tabs.push({ id, label, build, btn });
      },
      open(id) {
        back.hidden = false;
        show(id ?? current ?? tabs[0]?.id);
        o.onOpen?.();
        close.focus();
      },
      close() {
        if (back.hidden) return;
        back.hidden = true;
        o.onClose?.();
      },
      refresh() { if (!back.hidden) { const top = pane.scrollTop; show(current); pane.scrollTop = top; } },
      isOpen: () => !back.hidden,
      current: () => current,
    };
    return api;
  }

  window.MockSettings = { create, kit };
})();
