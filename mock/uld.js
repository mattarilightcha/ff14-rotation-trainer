// ULD（ゲームの UI 部品の定義。ui/uld/*.uld をクライアントから抽出したもの）を DOM で組み立てる。
// - テクスチャは切り分けない。アトラス（1 枚絵）のまま、CSS の background-position でパーツを切り出す
// - 高解像度のテクスチャ（scale 2）は background-size を 1/scale にして、ULD の座標（等倍）のまま扱う
// - 兄弟ノードは、ULD で先に書かれたものほど手前に描く（剣気ゲージの数字のノードが先頭にあることから判断）
// - 回転は度。拡大・回転の中心はノードの原点（originX / originY）
// - 加算色・乗算色（add / multiply）は SVG の feColorMatrix で再現する（add はゲームの -255〜255 を RGB に足す）
// - 九分割（NineGrid）は 9 枚に分け、四隅は等倍・辺と中央は伸ばす
// - ノードがパーツより小さいときは右下を切り取る（ゲージの塗りと同じ扱い。ラップ方式は抽出データに無い）
// - ノードの visible は使わない（ゲーム側が実行時に切り替えるため、ULD ではほぼ全部 false）。表示は呼び出し側が決める
(function (root) {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';
  let svgHost = null;
  const filterUrls = new Map();

  function colorFilter(add, mul) {
    const key = `${add ?? ''}|${mul ?? ''}`;
    if (filterUrls.has(key)) return filterUrls.get(key);
    if (!svgHost) {
      svgHost = document.createElementNS(NS, 'svg');
      svgHost.setAttribute('width', '0'); svgHost.setAttribute('height', '0');
      svgHost.setAttribute('aria-hidden', 'true');
      svgHost.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
      document.body.appendChild(svgHost);
    }
    const id = `uld-color-${filterUrls.size}`;
    const f = document.createElementNS(NS, 'filter');
    f.setAttribute('id', id);
    f.setAttribute('color-interpolation-filters', 'sRGB');
    const [mr, mg, mb] = (mul ?? [100, 100, 100]).map((v) => v / 100);
    const [ar, ag, ab] = (add ?? [0, 0, 0]).map((v) => v / 255);
    const m = document.createElementNS(NS, 'feColorMatrix');
    m.setAttribute('type', 'matrix');
    m.setAttribute('values', `${mr} 0 0 0 ${ar}  0 ${mg} 0 0 ${ag}  0 0 ${mb} 0 ${ab}  0 0 0 1 0`);
    f.appendChild(m);
    svgHost.appendChild(f);
    filterUrls.set(key, `url(#${id})`);
    return filterUrls.get(key);
  }

  // パーツ（アトラスの矩形）を、dw×dh の大きさで描く背景の指定
  function partBg(el, tex, p, sx, sy, sw, sh, dw, dh) {
    const kx = dw / sw, ky = dh / sh;
    el.style.backgroundImage = `url("${tex.path}")`;
    el.style.backgroundRepeat = 'no-repeat';
    el.style.backgroundSize = `${(tex.w / tex.scale) * kx}px ${(tex.h / tex.scale) * ky}px`;
    el.style.backgroundPosition = `${-(p.u + sx) * kx}px ${-(p.v + sy) * ky}px`;
  }

  function build(layout, textures) {
    const lists = new Map(layout.partLists.map((pl) => [pl.id, pl.parts]));
    const comps = new Map((layout.components ?? []).map((c) => [c.id, c]));
    const els = new Map(); // "12" → 要素、部品の中のノードは "20/6"（部品を置いたノード / 部品の中のノード）
    const imgs = new Map(); // 画像ノードの絵の要素（塗りの幅を変えるときに使う）
    const partOf = (n) => lists.get(n.partListId)?.[n.partId];

    function nodeEl(n, path) {
      const el = document.createElement('div');
      el.className = n.type > 1000 ? `uld uld-c uld-c${n.type}` : `uld uld-t${n.type}`;
      el.dataset.node = path;
      const s = el.style;
      s.left = `${n.x}px`; s.top = `${n.y}px`; s.width = `${n.w}px`; s.height = `${n.h}px`;
      s.transformOrigin = `${n.originX}px ${n.originY}px`;
      const tf = [];
      if (n.rotation) tf.push(`rotate(${n.rotation}deg)`);
      if (n.scaleX !== 1 || n.scaleY !== 1) tf.push(`scale(${n.scaleX}, ${n.scaleY})`);
      if (tf.length) s.transform = tf.join(' ');
      if (n.alpha !== 255) s.opacity = String(n.alpha / 255);
      const p = partOf(n), tex = p && textures[p.texture];
      if (n.type === 2 && tex) {
        const img = document.createElement('div');
        img.className = 'uld-img';
        const w = Math.min(n.w, p.w), h = Math.min(n.h, p.h);
        img.style.width = `${w}px`; img.style.height = `${h}px`;
        partBg(img, tex, p, 0, 0, p.w, p.h, p.w, p.h);
        const fl = [n.flipH ? -1 : 1, n.flipV ? -1 : 1];
        if (fl[0] < 0 || fl[1] < 0) img.style.transform = `scale(${fl[0]}, ${fl[1]})`;
        if (n.add || n.multiply) img.style.filter = colorFilter(n.add, n.multiply);
        el.appendChild(img);
        imgs.set(path, img);
      } else if (n.type === 4 && tex) {
        const [t, b, l, r] = n.nineGrid ?? [0, 0, 0, 0];
        const xs = [[0, l, 0, l], [l, p.w - r, l, n.w - r], [p.w - r, p.w, n.w - r, n.w]];
        const ys = [[0, t, 0, t], [t, p.h - b, t, n.h - b], [p.h - b, p.h, n.h - b, n.h]];
        const box = document.createElement('div');
        box.className = 'uld-img';
        box.style.width = `${n.w}px`; box.style.height = `${n.h}px`;
        for (const [sy0, sy1, dy0, dy1] of ys) {
          for (const [sx0, sx1, dx0, dx1] of xs) {
            const sw = sx1 - sx0, sh = sy1 - sy0, dw = dx1 - dx0, dh = dy1 - dy0;
            if (sw <= 0 || sh <= 0 || dw <= 0 || dh <= 0) continue;
            const piece = document.createElement('div');
            piece.className = 'uld-piece';
            piece.style.cssText = `left:${dx0}px;top:${dy0}px;width:${dw}px;height:${dh}px`;
            partBg(piece, tex, p, sx0, sy0, sw, sh, dw, dh);
            box.appendChild(piece);
          }
        }
        if (n.add || n.multiply) box.style.filter = colorFilter(n.add, n.multiply);
        el.appendChild(box);
        imgs.set(path, box);
      } else if (n.type === 3) {
        el.classList.add('uld-text');
      }
      return el;
    }

    // nodes の木を作る。prefix は部品の中のノードの道筋
    function makeTree(nodes, prefix) {
      const kids = new Map();
      for (const n of nodes) {
        if (!kids.has(n.parent)) kids.set(n.parent, []);
        kids.get(n.parent).push(n);
      }
      const make = (n) => {
        const path = prefix ? `${prefix}/${n.id}` : String(n.id);
        const el = nodeEl(n, path);
        els.set(path, el);
        const comp = n.type > 1000 ? comps.get(n.type) : null;
        const ch = kids.get(n.id) ?? [];
        // 先に書かれたノードほど手前 → 後ろのノードから順に追加する
        for (let i = ch.length - 1; i >= 0; i--) el.appendChild(make(ch[i]));
        if (comp) {
          const inner = makeTree(comp.nodes, path);
          for (const c of inner) el.insertBefore(c, el.firstChild);
        }
        return el;
      };
      const roots = kids.get(0) ?? [];
      return roots.map(make).reverse();
    }

    const tops = makeTree(layout.nodes, '');
    const top = layout.nodes.find((n) => n.parent === 0);
    const wrap = document.createElement('div');
    wrap.className = 'uld-root';
    wrap.style.width = `${top?.w ?? 0}px`; wrap.style.height = `${top?.h ?? 0}px`;
    for (const t of tops) wrap.appendChild(t);
    return {
      el: wrap,
      w: top?.w ?? 0,
      h: top?.h ?? 0,
      get: (path) => els.get(String(path)),
      img: (path) => imgs.get(String(path)),
      tex: (p) => p && textures[p.texture],
      part: (path) => {
        const [first, ...rest] = String(path).split('/');
        let list = layout.nodes;
        let n = list.find((x) => String(x.id) === first);
        for (const id of rest) { list = comps.get(n.type)?.nodes ?? []; n = list.find((x) => String(x.id) === id); }
        return n && partOf(n);
      },
      paths: () => [...els.keys()],
    };
  }

  // パーツの形（アトラスのアルファ）をマスクにする。演出の光を刀身や鍔の形の内側だけに出すのに使う
  function mask(el, tex, p) {
    const v = {
      Image: `url("${tex.path}")`,
      Size: `${tex.w / tex.scale}px ${tex.h / tex.scale}px`,
      Position: `${-p.u}px ${-p.v}px`,
      Repeat: 'no-repeat',
    };
    for (const [k, val] of Object.entries(v)) { el.style[`mask${k}`] = val; el.style[`webkitMask${k}`] = val; }
    el.style.width = `${p.w}px`; el.style.height = `${p.h}px`;
  }

  root.MockUld = { build, colorFilter, mask };
})(typeof window !== 'undefined' ? window : globalThis);
