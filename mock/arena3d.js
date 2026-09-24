// 3D の斜め見下ろし（three.js。vendor/three.min.js）。arena.js の状態を描くだけで、判定はしない。
// 夜の稽古場: 床と縁石は 3D、灯籠・松・人物はドット絵の板（いつもカメラの方を向く）で立たせる（HD-2D 風）。
// 敵の範囲攻撃の予兆と敵の足元の輪は、床に貼った板にシェーダーで形を描く。後処理で光のにじみ・ティルトシフト・周辺減光を掛ける。
// 座標: ワールドの (x, y)（y は南が +）→ three の (x, 高さ, y)
(function () {
  'use strict';
  const T = window.THREE;
  if (!T) return;
  const DEG = Math.PI / 180;

  // ---------------- シェーダー ----------------
  // ドット絵の板: 足元を基準に、カメラの右と上の向きへ広げる（どの角度から見ても縦の長さが変わらない）
  const SPRITE_VS = `
    uniform vec4 uRect; uniform vec2 uSize; uniform vec2 uAnchor; uniform float uFlip; uniform float uRot;
    varying vec2 vUv;
    #include <fog_pars_vertex>
    void main() {
      vec2 q = position.xy + 0.5;
      vec2 l = vec2((q.x - uAnchor.x) * uSize.x, (q.y - uAnchor.y) * uSize.y);
      float c = cos(uRot), s = sin(uRot);
      l = vec2(c * l.x - s * l.y, s * l.x + c * l.y);
      vec3 right = vec3(viewMatrix[0][0], viewMatrix[1][0], viewMatrix[2][0]);
      vec3 up = vec3(viewMatrix[0][1], viewMatrix[1][1], viewMatrix[2][1]);
      vec3 base = (modelMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
      vec3 wpos = base + right * l.x + up * l.y;
      float u = uFlip > 0.5 ? 1.0 - q.x : q.x;
      vUv = vec2(uRect.x + u * uRect.z, uRect.y + q.y * uRect.w);
      vec4 mvPosition = viewMatrix * vec4(wpos, 1.0);
      gl_Position = projectionMatrix * mvPosition;
      #include <fog_vertex>
    }`;
  // 拡大してもドットがにじまず、縁だけ 1 画素なめらかにする読み方（sharp bilinear）
  const SPRITE_FS = `
    uniform sampler2D map; uniform sampler2D emap; uniform vec2 texSize;
    uniform vec3 uTint; uniform vec4 uFlash; uniform float uOpacity; uniform float uEmit;
    varying vec2 vUv;
    #include <fog_pars_fragment>
    void main() {
      vec2 px = vUv * texSize;
      vec2 seam = floor(px + 0.5);
      vec2 fw = max(fwidth(px), vec2(1e-4));
      px = seam + clamp((px - seam) / fw, -0.5, 0.5);
      vec2 uv = px / texSize;
      vec4 c = texture2D(map, uv);
      if (c.a < 0.03) discard;
      vec3 col = c.rgb * uTint;
      col = mix(col, uFlash.rgb, uFlash.a);
      col += texture2D(emap, uv).rgb * uEmit;
      gl_FragColor = vec4(col, c.a * uOpacity);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
      #include <fog_fragment>
    }`;
  // 床に貼る板（ワールドの xz を渡す）
  const DECAL_VS = `
    varying vec2 vW;
    void main() {
      vec4 w = modelMatrix * vec4(position, 1.0);
      vW = w.xz;
      gl_Position = projectionMatrix * viewMatrix * w;
    }`;
  const ANG = `
    float angDiff(float a, float b) { float d = a - b; return atan(sin(d), cos(d)); }`;
  // 敵の範囲攻撃の予兆（FF14 の橙色の範囲）と、発動の演出。形ごとに「縁までの距離（内側が +）」を出して塗る。
  // 予兆: 縁の二重線（外は明るく、終わり際は速く脈打つ）、縁に近いほど濃い内側、ゆっくり流れる模様、満ちていく先頭の光。
  // 発動（uBoomT 0→1）: 白い閃光 → 形に沿って広がる衝撃の前線と縁の光 → 焦げ跡と燃えさし。明るさは 1 を超えてよい（光のにじみになる）
  const TELE_FS = `
    uniform int uKind; uniform vec2 uC; uniform float uDir; uniform float uA; uniform float uB; uniform float uBack; uniform float uSide;
    uniform float uP; uniform float uTime; uniform float uBoomT; uniform float uArena; uniform float uSq;
    varying vec2 vW;
    ${ANG}
    float sd(vec2 p, float k) {
      vec2 d = p - uC; float r = length(d);
      if (uKind == 0) return uA * k - r;
      if (uKind == 1) return min(r - max(uA, uB - (uB - uA) * k), uB - r);
      if (uKind == 2) { float a = abs(angDiff(atan(d.y, d.x), uDir)); return min(uB * k - r, r * sin(clamp(uA - a, -1.5, 1.5))); }
      if (uKind == 3) { vec2 f = vec2(cos(uDir), sin(uDir)); float al = dot(d, f); float pe = abs(-d.x * f.y + d.y * f.x); return min(min(al + uBack, uB * k - al), uA * 0.5 - pe); }
      float side = d.x * -sin(uDir) + d.y * cos(uDir);
      return min(uSide * side, 60.0 * k - uSide * side);
    }
    float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
    float noise(vec2 p) {
      vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
      return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
    }
    void main() {
      float arena = uSq > 0.5 ? min(uArena - abs(vW.x), uArena - abs(vW.y)) : uArena - length(vW);
      float s = min(sd(vW, 1.0), arena);
      if (s < -0.08) discard;
      float aa = smoothstep(-0.07, 0.0, s);
      vec3 col; float a;
      if (uBoomT < 0.0) {
        float p = uP;
        float urgent = smoothstep(0.62, 1.0, p);
        float pulse = 0.5 + 0.5 * sin(uTime * mix(5.0, 19.0, urgent));
        float rim = 1.0 - smoothstep(0.02, 0.13, abs(s));
        float rim2 = 1.0 - smoothstep(0.0, 0.045, abs(s - 0.42));
        float inner = smoothstep(3.2, 0.0, s);
        float fillSd = min(sd(vW, max(p, 0.001)), arena);
        float filled = step(0.0, fillSd);
        float front = (1.0 - smoothstep(0.0, 0.32, abs(fillSd))) * step(0.02, p) * (1.0 - step(0.995, p));
        float n = noise(vW * 0.8 + vec2(uTime * 0.35, -uTime * 0.22)) * 0.6 + noise(vW * 2.4 - vec2(uTime * 0.5)) * 0.4;
        vec3 deep = vec3(0.92, 0.25, 0.04), warm = vec3(1.0, 0.5, 0.14), hot = vec3(1.0, 0.84, 0.56);
        a = 0.14 + 0.2 * inner + 0.09 * filled + 0.08 * n * (0.5 + 0.5 * filled);
        col = mix(deep, warm, 0.35 * inner + 0.3 * filled + 0.25 * n);
        float rimK = rim * (0.8 + 0.2 * pulse * (0.35 + urgent));
        col = mix(col, hot * (1.3 + 0.9 * urgent * pulse), rimK);
        a = max(a, rimK * 0.95);
        col = mix(col, hot, rim2 * 0.55); a = max(a, rim2 * 0.5);
        col += hot * front * 0.9; a = max(a, front * 0.65);
        a += urgent * pulse * 0.07;
      } else {
        float t = uBoomT;
        float flash = 1.0 - smoothstep(0.0, 0.16, t);
        float frontSd = min(sd(vW, clamp(t / 0.24, 0.001, 1.0)), arena);
        float front = (1.0 - smoothstep(0.0, 0.55, abs(frontSd))) * (1.0 - smoothstep(0.12, 0.32, t));
        float rim = (1.0 - smoothstep(0.0, 0.22, abs(s))) * (1.0 - smoothstep(0.06, 0.45, t));
        float scorch = smoothstep(0.1, 0.22, t) * (1.0 - smoothstep(0.35, 1.0, t));
        float n = noise(vW * 1.6) * 0.7 + noise(vW * 5.0) * 0.3;
        float ember = step(0.9, noise(vW * 6.0 + 7.0)) * scorch * (1.0 - smoothstep(0.3, 0.7, t)) * (0.55 + 0.45 * sin(uTime * 9.0 + n * 20.0));
        col = vec3(0.05, 0.035, 0.03); a = 0.5 * scorch * (0.55 + 0.45 * n);
        col = mix(col, vec3(2.0, 0.8, 0.25), ember); a = max(a, ember * 0.7);
        col = mix(col, vec3(2.2, 2.0, 1.7), flash); a = max(a, flash * 0.5);
        float fr = max(front, rim);
        col = mix(col, vec3(2.6, 1.6, 0.7), fr); a = max(a, fr * 0.95);
      }
      a *= aa;
      if (a < 0.003) discard;
      gl_FragColor = vec4(col, a);
      #include <colorspace_fragment>
    }`;
  // 敵の足元の輪: 当たり判定の円・正面の矢印・方向指定の区切り。ガイドがオンなら背面（緑）と側面（黄）
  const RING_FS = `
    uniform vec2 uC; uniform float uFace; uniform float uR; uniform float uGuide; uniform float uNeed; uniform float uTime; uniform float uAlpha;
    varying vec2 vW;
    ${ANG}
    void main() {
      vec2 d = vW - uC; float r = length(d); float a = angDiff(atan(d.y, d.x), uFace); float aa = abs(a);
      vec4 c = vec4(0.0);
      if (uGuide > 0.5 && r > uR * 0.35 && r < uR + 1.7) {
        float fall = smoothstep(uR + 1.7, uR + 0.2, r) * smoothstep(uR * 0.35, uR * 0.85, r);
        float pulse = 0.72 + 0.28 * sin(uTime * 5.0);
        if (aa > 2.3562) c = vec4(0.40, 1.0, 0.56, (uNeed == 1.0 ? 0.46 * pulse : 0.15) * fall);
        else if (aa > 0.7854) c = vec4(1.0, 0.85, 0.32, (uNeed == 2.0 ? 0.44 * pulse : 0.13) * fall);
      }
      vec3 red = vec3(1.0, 0.30, 0.18);
      float ring = 1.0 - smoothstep(0.045, 0.10, abs(r - uR));
      float glow = (1.0 - smoothstep(0.0, 0.5, abs(r - uR))) * 0.30;
      c.rgb = mix(c.rgb, red, max(ring, glow * (1.0 - c.a)));
      c.a = max(c.a, max(ring * 0.95, glow));
      // 区切りの印（±45°・±135°）
      float notch = min(abs(aa - 0.7854), abs(aa - 2.3562)) * r;
      if (notch < 0.13 && r > uR - 0.32 && r < uR + 0.42) c = vec4(1.0, 0.72, 0.55, 1.0);
      // 正面の矢印
      float t = (r - uR - 0.12) / 0.85;
      if (t > 0.0 && t < 1.0 && aa * r < 0.42 * (1.0 - t)) c = vec4(1.0, 0.36, 0.22, 1.0);
      if (c.a < 0.004) discard;
      gl_FragColor = vec4(c.rgb, c.a * uAlpha);
      #include <colorspace_fragment>
    }`;
  // 床の演出（加算）: 0 広がる輪 / 1 扇の波 / 2 直線の波 / 3 丸い光
  const GFX_FS = `
    uniform int uKind; uniform vec2 uC; uniform float uDir; uniform float uR; uniform float uW; uniform float uP; uniform vec3 uC0; uniform vec3 uC1; uniform float uFade;
    varying vec2 vW;
    ${ANG}
    void main() {
      vec2 d = vW - uC; float r = length(d);
      float a = 0.0; vec3 col = uC1;
      if (uKind == 0) { float k = 1.0 - smoothstep(0.0, uW, abs(r - uR)); a = k; col = mix(uC1, uC0, k * k); }
      else if (uKind == 1) { float aa = abs(angDiff(atan(d.y, d.x), uDir)); if (aa > 0.62 || r > uR) discard; a = 0.35 + 0.65 * smoothstep(uR - 1.2, uR, r); col = mix(uC1, uC0, smoothstep(uR - 0.5, uR, r)); }
      else if (uKind == 2) { vec2 f = vec2(cos(uDir), sin(uDir)); float al = dot(d, f); float pe = abs(-d.x * f.y + d.y * f.x); if (al < 0.0 || al > uR) discard; float k = 1.0 - smoothstep(0.0, uW, pe); a = k; col = mix(uC1, uC0, k * k); }
      else { a = pow(max(0.0, 1.0 - r / uR), 2.0); }
      a *= uFade;
      if (a < 0.003) discard;
      gl_FragColor = vec4(col * 1.4, a);
      #include <colorspace_fragment>
    }`;
  // 設置型の技の床（加算）: 0 アサイラムの床（ドームの縁の明るい輪・うっすら青い内側・氷のような模様）/
  // 1 リタージー・オブ・ベル（届く 20m の流れる点線の輪、足元の水色の光の輪。鳴ると内側が光る）
  const ZONE_FS = `
    uniform int uKind; uniform vec2 uC; uniform float uR; uniform float uTime; uniform float uAlpha; uniform float uPulse; uniform vec3 uC0; uniform vec3 uC1;
    varying vec2 vW;
    float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
    float noise(vec2 p) {
      vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
      return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
    }
    void main() {
      vec2 d = vW - uC; float r = length(d), a = atan(d.y, d.x);
      if (r > uR + 0.8) discard;
      float x = r / uR;
      float edge = 1.0 - smoothstep(0.0, 0.22, abs(r - uR + 0.05));
      vec3 col; float al;
      if (uKind == 0) {
        float ice = smoothstep(0.66, 0.82, noise(vW * 0.55 + 4.0)) * 0.18 + smoothstep(0.7, 0.9, noise(vW * 1.4)) * 0.1;
        float halo = smoothstep(0.7, 1.0, x) * 0.16;
        al = 0.05 + halo + ice * (1.0 - x * 0.4) + edge * (0.85 + 0.15 * sin(uTime * 1.6));
        al += uPulse * (1.0 - smoothstep(0.0, 0.16, abs(x - (1.0 - uPulse)))) * 0.35;
        col = mix(uC1, uC0, clamp(edge + ice, 0.0, 1.0));
      } else if (uKind == 2) {
        // 置く場所のターゲットサークル（流れる破線の縁・うっすらした内側・中心の点）
        float dash = step(0.4, fract((a - uTime * 0.25) / 6.2832 * 40.0));
        al = edge * (0.55 + 0.45 * dash) + 0.1 + (1.0 - smoothstep(0.0, 0.25, r)) * 0.8;
        col = mix(uC1, uC0, edge);
      } else {
        float dash = step(0.5, fract((a + uTime * 0.05) / 6.2832 * 72.0));
        float base = (1.0 - smoothstep(0.0, 2.3, r)) * 0.32;
        float rings = (1.0 - smoothstep(0.0, 0.07, abs(r - 1.1 - 0.12 * sin(uTime * 2.0)))) * 0.55 + (1.0 - smoothstep(0.0, 0.06, abs(r - 1.85))) * 0.35;
        al = edge * dash * 0.4 + smoothstep(0.8, 1.0, x) * 0.03 + base + rings;
        al += uPulse * 0.22 * (1.0 - x * 0.8);
        col = mix(uC1, uC0, clamp(edge + rings, 0.0, 1.0));
      }
      al *= uAlpha;
      if (al < 0.004) discard;
      gl_FragColor = vec4(col * 1.3, al);
      #include <colorspace_fragment>
    }`;
  // アサイラムのドーム（加算。半球を平たくしたもの）: 縁ほど明るいガラス（フレネル）、氷のような面の模様、上の方に青から橙へ揺らめく炎、床との境の光
  const DOME_VS = `
    uniform float uFlat;
    varying vec3 vN; varying vec3 vV; varying vec3 vL;
    void main() {
      vL = position;
      vec4 w = modelMatrix * vec4(position, 1.0);
      vN = normalize(vec3(position.x, position.y / uFlat, position.z));
      vV = cameraPosition - w.xyz;
      gl_Position = projectionMatrix * viewMatrix * w;
    }`;
  const DOME_FS = `
    uniform float uTime; uniform float uAlpha; uniform float uPulse;
    varying vec3 vN; varying vec3 vV; varying vec3 vL;
    float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
    float noise(vec2 p) {
      vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
      return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
    }
    void main() {
      vec3 n = normalize(vN), v = normalize(vV);
      float fres = pow(1.0 - abs(dot(n, v)), 3.0);
      float h = clamp(vL.y, 0.0, 1.0);
      // 面の模様は、ドームの上の位置（xz）で取る（上から見ても放射状の筋にならない）
      float facets = smoothstep(0.64, 0.8, noise(vL.xz * 6.0 + h * 3.0 + 11.0)) * 0.16;
      float fl = noise(vL.xz * 2.6 + vec2(sin(uTime * 0.3) * 0.6, uTime * 0.22));
      float wisp = smoothstep(0.6, 0.83, fl) * smoothstep(0.3, 0.8, h);
      vec3 blue = vec3(0.4, 0.64, 1.0), white = vec3(0.9, 0.96, 1.0), orange = vec3(1.0, 0.6, 0.26);
      vec3 col = mix(blue, white, fres * 0.8);
      col = mix(col, mix(vec3(0.5, 0.8, 1.0), orange, smoothstep(0.45, 0.9, fl)), wisp);
      float base = (1.0 - smoothstep(0.0, 0.05, h)) * 0.45;
      float a = 0.022 + fres * 0.28 + facets * (0.3 + fres) + wisp * 0.3 + base;
      a *= uAlpha * (1.0 + uPulse * 0.6);
      gl_FragColor = vec4(col * 1.1, a);
      #include <colorspace_fragment>
    }`;
  // 光の絵の板（加算。いつもカメラの方を向く。SPRITE_VS と組み合わせる）
  const BILL_FS = `
    uniform sampler2D map; uniform float uOpacity; uniform vec3 uColor;
    varying vec2 vUv;
    void main() {
      vec4 c = texture2D(map, vUv);
      float a = c.a * uOpacity;
      if (a < 0.004) discard;
      gl_FragColor = vec4(c.rgb * uColor, a);
      #include <colorspace_fragment>
    }`;
  // 斬撃の弧（加算）: u = 弧に沿った位置、v = 幅の向き
  const ARC_VS = `
    uniform float uA0; uniform float uSpan; uniform float uR; uniform float uW;
    varying vec2 vUv;
    void main() {
      float a = uA0 + uSpan * uv.x;
      float taper = 0.25 + 0.75 * sin(3.14159 * clamp(uv.x, 0.0, 1.0));
      float rr = uR + (uv.y - 0.5) * uW * taper;
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(cos(a) * rr, 0.0, sin(a) * rr, 1.0);
    }`;
  const ARC_FS = `
    uniform vec3 uC0; uniform vec3 uC1; uniform float uHead; uniform float uTail; uniform float uFade;
    varying vec2 vUv;
    void main() {
      if (vUv.x > uHead || vUv.x < uTail) discard;
      float along = (vUv.x - uTail) / max(0.001, uHead - uTail);
      float core = 1.0 - abs(vUv.y - 0.5) * 2.0;
      vec3 c = mix(uC1, uC0, smoothstep(0.3, 0.95, core)) * (1.3 + 1.7 * pow(core, 3.0));
      float a = (0.3 + 0.7 * pow(along, 1.3)) * smoothstep(0.0, 0.3, core) * uFade;
      gl_FragColor = vec4(c, a);
      #include <colorspace_fragment>
    }`;
  // 粒子（四角いドット）
  const PART_VS = `
    attribute float aSize; attribute float aAlpha; attribute vec3 aColor; attribute float aShape; attribute float aRot;
    uniform float uScale;
    varying vec3 vC; varying float vA; varying float vS; varying float vR;
    void main() {
      vC = aColor; vA = aAlpha; vS = aShape; vR = aRot;
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = max(1.5, aSize * uScale / -mv.z);
      gl_Position = projectionMatrix * mv;
    }`;
  const PART_FS = `
    varying vec3 vC; varying float vA; varying float vS; varying float vR;
    void main() {
      if (vS > 0.5) {
        vec2 q = gl_PointCoord - 0.5;
        float c = cos(vR), s = sin(vR); q = vec2(c * q.x - s * q.y, s * q.x + c * q.y);
        if (vS < 1.5) { float e = q.x * q.x / 0.2 + q.y * q.y / 0.06; if (e > 1.0 || (q.x > 0.3 && abs(q.y) < 0.05)) discard; } // 花びら
        else if (abs(q.x) * 1.15 + abs(q.y) * 3.2 > 0.55) discard; // かけら（細いひし形）
      }
      gl_FragColor = vec4(vC * 1.7, vA);
      #include <colorspace_fragment>
    }`;
  // 光の柱（バフ）
  const PILLAR_VS = `
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
  const PILLAR_FS = `
    uniform vec3 uC0; uniform vec3 uC1; uniform float uFade; uniform float uTime;
    varying vec2 vUv;
    void main() {
      float h = vUv.y;
      float stripe = 0.75 + 0.25 * sin(vUv.x * 50.0 + uTime * 6.0 - h * 8.0);
      float a = pow(1.0 - h, 1.6) * stripe * uFade * 0.55;
      gl_FragColor = vec4(mix(uC1, uC0, 1.0 - h) * 0.9, a);
      #include <colorspace_fragment>
    }`;
  // ティルトシフト（ピントの帯 uBand の外だけ、離れるほどぼかす。縦・横の 2 回に分けて掛ける）
  const TILT = (dirX) => ({
    uniforms: { tDiffuse: { value: null }, uStep: { value: 1 / 1280 }, uFocus: { value: 0.5 }, uBand: { value: 0.22 } },
    vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: `
      uniform sampler2D tDiffuse; uniform float uStep; uniform float uFocus; uniform float uBand;
      varying vec2 vUv;
      void main() {
        float k = uStep * max(0.0, abs(uFocus - vUv.y) - uBand) * 4.0;
        vec2 d = ${dirX ? 'vec2(k, 0.0)' : 'vec2(0.0, k)'};
        vec4 s = texture2D(tDiffuse, vUv) * 0.2270270270;
        s += texture2D(tDiffuse, vUv + d * 1.3846153846) * 0.3162162162;
        s += texture2D(tDiffuse, vUv - d * 1.3846153846) * 0.3162162162;
        s += texture2D(tDiffuse, vUv + d * 3.2307692308) * 0.0702702703;
        s += texture2D(tDiffuse, vUv - d * 3.2307692308) * 0.0702702703;
        gl_FragColor = s;
      }`,
  });
  // 空（上は濃い藍、地平は霧の色）
  const SKY_VS = `
    varying vec3 vDir;
    void main() { vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
  const SKY_FS = `
    uniform vec3 uTop; uniform vec3 uHorizon; uniform vec3 uBottom;
    varying vec3 vDir;
    void main() {
      float h = vDir.y;
      vec3 c = h > 0.0 ? mix(uHorizon, uTop, pow(h, 0.45)) : mix(uHorizon, uBottom, pow(-h, 0.35));
      gl_FragColor = vec4(c, 1.0);
      #include <colorspace_fragment>
    }`;

  // ---------------- 絵（canvas）----------------
  function canvas(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; }
  const hash = (x, y) => { let h = (Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263)) | 0; h = Math.imul(h ^ (h >>> 13), 1274126177); return ((h ^ (h >>> 16)) >>> 0) / 4294967296; };
  // 床（96m 四方、1m = 16 ドット）。ステージの floor（内側）・outside（外側）ごとに 1 ドットずつ塗る。lights: 床にたまる明かりの位置
  const GROUND = { size: 96, ppm: 16 };
  const FLOORS = {
    // 石畳（2m 角の石を半分ずらし。ひびと苔）
    tiles(px, py, n) {
      const TILE = 32, row = Math.floor(py / TILE), off = row & 1 ? TILE / 2 : 0;
      const col = Math.floor((px + off) / TILE), tx = (px + off) % TILE, ty = py % TILE;
      const h0 = hash(col * 7 + 3, row * 13 + 5), h1 = hash(col * 11 + 1, row * 3 + 9);
      let v = 84 + h0 * 22 + (n - 0.5) * 7;
      if (tx === 0 || ty === 0) v = 44 + n * 6;
      else if (tx === 1 || ty === 1) v += 16;
      else if (tx === TILE - 1 || ty === TILE - 1) v -= 13;
      if (h1 < 0.16 && tx > 3 && ty > 3) { const k = (tx - ty * (0.6 + h0)) - (h1 * 60 % 20); if (Math.abs(k) < 0.8 && tx < 26) v -= 24; }
      if ((tx < 3 || ty < 3) && n < 0.22) return [52, 72, 50];
      return [v * 0.88, v * 0.9, v * 1.02];
    },
    // 大きな石板（4m 角。明るい石に薄い筋）
    slabs(px, py, n) {
      const TILE = 64, col = Math.floor(px / TILE), row = Math.floor(py / TILE), tx = px % TILE, ty = py % TILE;
      const h0 = hash(col * 5 + 1, row * 9 + 2), h1 = hash(col * 3 + 7, row * 7 + 4);
      let v = 176 + h0 * 20 + (n - 0.5) * 6;
      if (tx === 0 || ty === 0) v = 112 + n * 8;
      else if (tx === 1 || ty === 1) v += 10;
      else if (tx === TILE - 1 || ty === TILE - 1) v -= 12;
      if (h1 < 0.5 && Math.abs(Math.sin((tx + ty * 0.6) * 0.09 + h1 * 9) * 14 + h1 * 36 - ty) < 0.7) v -= 18; // 石の筋
      return [v, v * 0.95, v * 0.86];
    },
    // 崩れた石の床（石が欠け、すき間に草）
    ruins(px, py, n) {
      const TILE = 32, row = Math.floor(py / TILE), off = row & 1 ? TILE / 2 : 0;
      const col = Math.floor((px + off) / TILE), tx = (px + off) % TILE, ty = py % TILE;
      const h0 = hash(col * 13 + 5, row * 5 + 1), h1 = hash(col * 2 + 9, row * 11 + 3);
      if (h1 < 0.13) return n < 0.3 ? [96, 104, 50] : [92 + n * 20, 72 + n * 14, 52 + n * 10]; // 欠けた所（土と草）
      let v = 112 + h0 * 26 + (n - 0.5) * 8;
      if (tx === 0 || ty === 0) return n < 0.4 ? [104, 112, 54] : [70, 58, 50];
      if (tx === 1 || ty === 1) v += 14;
      else if (tx === TILE - 1 || ty === TILE - 1) v -= 14;
      if (h1 < 0.3 && Math.abs((tx - ty * (0.5 + h0)) - h1 * 40) < 0.8) v -= 26;
      return [v * 0.97, v * 0.9, v * 0.86];
    },
  };
  // 外側（base は遠くの地面の色）
  const OUTSIDES = {
    grass: { base: '#1a2620', paint(px, py, n) { const m = hash(px >> 5, py >> 5) * 0.5 + hash(px >> 3, py >> 3) * 0.5, v = 0.8 + m * 0.4; if (n > 0.965) return [58, 86, 56]; if (n < 0.012) return [70, 64, 50]; return [(24 + n * 8) * v, (38 + n * 12) * v, (30 + n * 7) * v]; } },
    sand: { base: '#9a8a6c', paint(px, py, n) { const m = hash(px >> 4, py >> 4) * 0.4 + 0.8; if (n > 0.985) return [120, 108, 90]; return [(150 + n * 22) * m, (134 + n * 18) * m, (104 + n * 14) * m]; } },
    field: { base: '#3e3a2a', paint(px, py, n) { const m = hash(px >> 5, py >> 5) * 0.5 + hash(px >> 2, py >> 2) * 0.3 + 0.6; if (n > 0.95) return [140, 138, 76]; return [(74 + n * 18) * m, (72 + n * 16) * m, (46 + n * 10) * m]; } },
  };
  function groundCanvas(st, lights) {
    const { size, ppm } = GROUND, N = size * ppm, R = st.size, sq = st.shape === 'square';
    const c = canvas(N, N), g = c.getContext('2d');
    const img = g.createImageData(N, N), d = img.data;
    const paint = FLOORS[st.floor] ?? FLOORS.tiles, out = (OUTSIDES[st.outside] ?? OUTSIDES.grass).paint;
    for (let py = 0; py < N; py++) {
      const wy = (py + 0.5) / ppm - size / 2;
      for (let px = 0; px < N; px++) {
        const wx = (px + 0.5) / ppm - size / 2, n = hash(px, py);
        const edge = R - (sq ? Math.max(Math.abs(wx), Math.abs(wy)) : Math.hypot(wx, wy)); // 縁までの距離（内側が +）
        let rgb;
        if (edge > 0.02) rgb = paint(px, py, n);
        else if (edge > -1.1) { const v = 50 + n * 22; rgb = st.edge === 'wall' ? [v * 1.1, v * 1.05, v] : [v * 0.9, v * 0.86, v * 0.8]; } // 縁の砂利・壁の足元
        else rgb = out(px, py, n);
        const i = (py * N + px) * 4;
        d[i] = rgb[0]; d[i + 1] = rgb[1]; d[i + 2] = rgb[2]; d[i + 3] = 255;
      }
    }
    g.putImageData(img, 0, 0);
    const P = (w) => (w + size / 2) * ppm;
    // 中央の紋（刻んだ線）
    const groove = (draw, a) => {
      g.lineWidth = 2;
      g.strokeStyle = `rgba(20,18,30,${a * 1.6})`; g.save(); g.translate(0, 1); draw(); g.restore();
      g.strokeStyle = `rgba(240,230,200,${a})`; draw();
    };
    if (st.floor === 'slabs') {
      const r0 = R * 0.42 * ppm;
      groove(() => { g.beginPath(); g.arc(P(0), P(0), r0, 0, Math.PI * 2); g.stroke(); g.beginPath(); g.arc(P(0), P(0), r0 * 0.3, 0, Math.PI * 2); g.stroke(); }, 0.22);
      groove(() => { for (let i = 0; i < 8; i++) { const a = (i / 8) * Math.PI * 2; g.beginPath(); g.moveTo(P(0) + Math.cos(a) * r0 * 0.3, P(0) + Math.sin(a) * r0 * 0.3); g.lineTo(P(0) + Math.cos(a) * r0 * (i % 2 ? 0.8 : 1.15), P(0) + Math.sin(a) * r0 * (i % 2 ? 0.8 : 1.15)); g.stroke(); } }, 0.2);
    } else if (st.floor === 'ruins') {
      groove(() => { for (let i = 0; i < 6; i++) { const a0 = i * 1.05 + 0.2; g.beginPath(); g.arc(P(0), P(0), R * 0.5 * ppm, a0, a0 + 0.6); g.stroke(); } }, 0.16);
    } else {
      groove(() => { g.beginPath(); g.arc(P(0), P(0), R * 0.55 * ppm, 0, Math.PI * 2); g.stroke(); g.beginPath(); g.arc(P(0), P(0), R * 0.2 * ppm, 0, Math.PI * 2); g.stroke(); }, 0.16);
    }
    // 床にたまる明かり（灯籠・かがり火）
    g.globalCompositeOperation = 'lighter';
    for (const l of lights) {
      const gr = g.createRadialGradient(P(l.x), P(l.y), 0, P(l.x), P(l.y), 7 * ppm);
      gr.addColorStop(0, 'rgba(255,170,90,0.55)'); gr.addColorStop(0.4, 'rgba(255,140,70,0.18)'); gr.addColorStop(1, 'rgba(255,120,60,0)');
      g.fillStyle = gr; g.fillRect(P(l.x) - 7 * ppm, P(l.y) - 7 * ppm, 14 * ppm, 14 * ppm);
    }
    g.globalCompositeOperation = 'source-over';
    return c;
  }
  // フィールドマーカー（床に置く印と、上に浮かぶ札）
  function markerCanvas(m, floating) {
    const N = floating ? 64 : 128, c = canvas(N, N), g = c.getContext('2d'), h = N / 2;
    g.lineWidth = floating ? 5 : 7; g.strokeStyle = m.color; g.fillStyle = m.color;
    g.shadowColor = m.color; g.shadowBlur = floating ? 6 : 12;
    g.beginPath();
    if (m.shape === 'square') g.rect(h - N * 0.36, h - N * 0.36, N * 0.72, N * 0.72); else g.arc(h, h, N * 0.38, 0, Math.PI * 2);
    g.globalAlpha = floating ? 0.85 : 0.22; g.fill();
    g.globalAlpha = 1; g.stroke();
    g.shadowBlur = 0;
    g.fillStyle = floating ? '#ffffff' : m.color;
    g.font = `900 ${Math.round(N * 0.44)}px Cinzel, "Zen Kaku Gothic New", sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText(m.id, h, h + N * 0.03);
    return c;
  }
  function stoneCanvas() {
    const c = canvas(32, 16), g = c.getContext('2d'), img = g.createImageData(32, 16);
    for (let i = 0; i < 32 * 16; i++) { const n = hash(i, 77), v = 150 + n * 50; img.data.set([v, v, v * 1.06, 255], i * 4); }
    g.putImageData(img, 0, 0);
    return c;
  }
  function glowCanvas(size = 64) {
    const c = canvas(size, size), g = c.getContext('2d');
    const gr = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.25, 'rgba(255,255,255,.55)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = gr; g.fillRect(0, 0, size, size);
    return c;
  }
  function shadowCanvas() {
    const c = canvas(64, 64), g = c.getContext('2d');
    const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, 'rgba(0,0,0,.62)'); gr.addColorStop(0.55, 'rgba(0,0,0,.45)'); gr.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
    return c;
  }
  // 詠唱の陣（居合の構えで足元に出る）
  function sigilCanvas() {
    const N = 256, c = canvas(N, N), g = c.getContext('2d'), m = N / 2;
    g.strokeStyle = '#fff'; g.fillStyle = '#fff';
    g.lineWidth = 3; g.beginPath(); g.arc(m, m, 120, 0, Math.PI * 2); g.stroke();
    g.lineWidth = 1.5; g.beginPath(); g.arc(m, m, 108, 0, Math.PI * 2); g.stroke();
    g.beginPath(); g.arc(m, m, 60, 0, Math.PI * 2); g.stroke();
    for (let i = 0; i < 36; i++) { const a = (i / 36) * Math.PI * 2; g.fillRect(m + Math.cos(a) * 113 - 2, m + Math.sin(a) * 113 - 2, 4, 4); }
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * Math.PI * 2 - Math.PI / 2;
      g.beginPath(); g.arc(m + Math.cos(a) * 84, m + Math.sin(a) * 84, 16, 0, Math.PI * 2); g.stroke();
      g.beginPath(); g.moveTo(m + Math.cos(a) * 60, m + Math.sin(a) * 60); g.lineTo(m + Math.cos(a) * 108, m + Math.sin(a) * 108); g.stroke();
    }
    return c;
  }

  // ---------------- 本体 ----------------
  function create(cv, S) {
    let renderer;
    try {
      renderer = new T.WebGLRenderer({ canvas: cv, antialias: false, powerPreference: 'high-performance' });
    } catch (e) { throw new Error(`WebGL が使えません（${e?.message ?? e}）`); }
    renderer.setClearColor(0x0c1118, 1);
    const maxAniso = renderer.capabilities.getMaxAnisotropy();
    const scene = new T.Scene();
    const FOG = new T.Color(0x121823);
    scene.fog = new T.Fog(FOG, 55, 170);
    const camera = new T.PerspectiveCamera(34, 16 / 9, 0.3, 900);
    let W = 1280, H = 720, RATIO = 1, quality = 'high', time = 0;
    const colorCache = new Map();
    const col = (h) => { let c = colorCache.get(h); if (!c) { c = new T.Color(h); colorCache.set(h, c); } return c; };
    const texOf = (canvasEl, pixel) => {
      const t = new T.CanvasTexture(canvasEl);
      t.colorSpace = T.SRGBColorSpace;
      if (pixel === 'sprite') { t.magFilter = T.LinearFilter; t.minFilter = T.LinearFilter; t.generateMipmaps = false; }
      else if (pixel === 'nearest') { t.magFilter = T.NearestFilter; t.minFilter = T.LinearMipmapLinearFilter; t.anisotropy = maxAniso; }
      return t;
    };
    // ---- 光（色と強さはステージごと）----
    const hemi = new T.HemisphereLight(0xb4c2ff, 0x40344a, 1.9); scene.add(hemi);
    const sun = new T.DirectionalLight(0xe4ebff, 1.35); scene.add(sun);
    const flashLight = new T.PointLight(0xffffff, 0, 16, 1.4); scene.add(flashLight);
    const castLight = new T.PointLight(0xffc640, 0, 10, 1.5); scene.add(castLight);

    // ---- 空と星 ----
    const skyMat = new T.ShaderMaterial({
      uniforms: { uTop: { value: new T.Color() }, uHorizon: { value: new T.Color() }, uBottom: { value: new T.Color() } },
      vertexShader: SKY_VS, fragmentShader: SKY_FS, side: T.BackSide, depthWrite: false, fog: false,
    });
    const sky = new T.Mesh(new T.SphereGeometry(500, 32, 16), skyMat);
    sky.renderOrder = -10; scene.add(sky);
    let stars;
    {
      const n = 500, pos = new Float32Array(n * 3), rnd = window.MockPixel.rng(99);
      for (let i = 0; i < n; i++) {
        const a = rnd() * Math.PI * 2, h = 0.06 + Math.pow(rnd(), 0.7) * 0.94, rr = Math.sqrt(1 - h * h);
        pos.set([Math.cos(a) * rr * 460, h * 460, Math.sin(a) * rr * 460], i * 3);
      }
      const geo = new T.BufferGeometry(); geo.setAttribute('position', new T.BufferAttribute(pos, 3));
      stars = new T.Points(geo, new T.PointsMaterial({ color: 0xcfdcff, size: 1.6, sizeAttenuation: false, fog: false, transparent: true, opacity: 0.8, depthWrite: false }));
      stars.renderOrder = -9;
      sky.add(stars);
    }

    // ---- ドット絵の板 ----
    const SPR = S.SPR;
    const setTex = (set) => ({ map: texOf(set.atlas, 'sprite'), emap: texOf(set.emit, 'sprite'), size: new T.Vector2(set.atlas.width, set.atlas.height) });
    // 人物の組（侍・タンク・白魔道士・木人）と小物。自分と相方の見た目はジョブで変わるので、組ごとに作っておく
    const TEX = Object.fromEntries(Object.entries(SPR).filter(([, v]) => v?.atlas).map(([k, v]) => [k, setTex(v)]));
    const quad = new T.PlaneGeometry(1, 1);
    function spriteMesh(tex, parent = scene) {
      const uniforms = Object.assign(T.UniformsUtils.clone(T.UniformsLib.fog), {
        map: { value: tex.map }, emap: { value: tex.emap }, texSize: { value: tex.size },
        uRect: { value: new T.Vector4(0, 0, 1, 1) }, uSize: { value: new T.Vector2(1, 1) }, uAnchor: { value: new T.Vector2(0.5, 0.1) },
        uFlip: { value: 0 }, uRot: { value: 0 }, uTint: { value: new T.Color(1, 1, 1) }, uFlash: { value: new T.Vector4(1, 1, 1, 0) },
        uOpacity: { value: 1 }, uEmit: { value: 1 },
      });
      const m = new T.Mesh(quad, new T.ShaderMaterial({ uniforms, vertexShader: SPRITE_VS, fragmentShader: SPRITE_FS, transparent: true, depthWrite: false, fog: true }));
      m.frustumCulled = false; m.renderOrder = 2;
      parent.add(m);
      return m;
    }
    // アトラスの 1 コマを板に貼る（fr: { x, y, w, h, flip }、set: { ax, ay, m }）
    function setFrame(mesh, texSize, fr, set, m = set.m) {
      const u = mesh.material.uniforms;
      u.uRect.value.set(fr.x / texSize.x, 1 - (fr.y + fr.h) / texSize.y, fr.w / texSize.x, fr.h / texSize.y);
      u.uSize.value.set(fr.w * m, fr.h * m);
      u.uAnchor.value.set((set.ax ?? fr.ax) / fr.w, (fr.h - (set.ay ?? fr.ay)) / fr.h);
      u.uFlip.value = fr.flip ? 1 : 0;
    }
    const PROPS = SPR.props.frames;
    const glowTex = texOf(glowCanvas(64));

    // ---- ステージ（床・縁・小物・空と明かり・漂う粒・フィールドマーカー）。替えるときは組ごと作り直す ----
    let STG = null, stageGroup = null, glows = [], braziers = [], motes = [], moteStyle = 'firefly', markerSet = [];
    const baseTint = new T.Color(0.93, 0.95, 1.0);
    function disposeGroup(g) {
      g.traverse((o) => {
        if (o.geometry && o.geometry !== quad) o.geometry.dispose();
        const mats = Array.isArray(o.material) ? o.material : o.material ? [o.material] : [];
        for (const m of mats) {
          for (const v of Object.values(m.uniforms ?? {})) if (v?.value?.isTexture && ![TEX.props.map, TEX.props.emap, glowTex].includes(v.value)) v.value.dispose();
          if (m.map && ![TEX.props.map, glowTex].includes(m.map)) m.map.dispose();
          m.dispose();
        }
      });
      scene.remove(g);
    }
    // 小物の置き場所（stages.js の props の書き方から）
    function propSpots(st, p, rnd) {
      const R0 = st.size, pts = [];
      if (p.ring != null) for (let i = 0; i < p.count; i++) { const a = (i / p.count) * Math.PI * 2 + Math.PI / p.count; pts.push([Math.cos(a) * (R0 + p.ring), Math.sin(a) * (R0 + p.ring)]); }
      if (p.band) for (let i = 0; i < p.count; i++) {
        const d = p.band[0] + rnd() * (p.band[1] - p.band[0]);
        if (st.shape === 'square') {
          const side = Math.floor(rnd() * 4), v = (rnd() * 2 - 1) * (R0 + d), e = R0 + d;
          pts.push(side === 0 ? [v, -e] : side === 1 ? [e, v] : side === 2 ? [v, e] : [-e, v]);
        } else { const a = rnd() * Math.PI * 2; pts.push([Math.cos(a) * (R0 + d), Math.sin(a) * (R0 + d)]); }
      }
      if (p.every) for (let v = -R0; v <= R0 + 0.01; v += p.every) for (const q of [[v, -R0 - p.out], [v, R0 + p.out], [-R0 - p.out, v], [R0 + p.out, v]]) pts.push(q);
      if (p.corners) for (const [dx, dy] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) pts.push([dx * (R0 + p.out), dy * (R0 + p.out)]);
      return pts;
    }
    function buildStage(st) {
      if (stageGroup) disposeGroup(stageGroup);
      STG = st; stageGroup = new T.Group(); scene.add(stageGroup);
      glows = []; braziers = []; markerSet = [];
      const R0 = st.size, rnd = window.MockPixel.rng(31);
      // 空・霧・明かり
      skyMat.uniforms.uTop.value.set(st.sky[0]); skyMat.uniforms.uHorizon.value.set(st.sky[1]); skyMat.uniforms.uBottom.value.set(st.sky[2]);
      const top = new T.Color(st.sky[0]), lum = 0.2126 * top.r + 0.7152 * top.g + 0.0722 * top.b;
      stars.material.opacity = Math.max(0, Math.min(0.85, (0.06 - lum) * 16));
      stars.visible = stars.material.opacity > 0.02;
      scene.fog.color.set(st.fog[0]); scene.fog.near = st.fog[1]; scene.fog.far = st.fog[2];
      renderer.setClearColor(st.fog[0], 1);
      hemi.color.set(st.light.hemi[0]); hemi.groundColor.set(st.light.hemi[1]); hemi.intensity = st.light.hemi[2];
      sun.color.set(st.light.sun[0]); sun.intensity = st.light.sun[1]; sun.position.set(...st.light.sun[2]);
      bloom.threshold = st.bloom ?? 0.82;
      baseTint.setRGB(...(st.tint ?? [0.93, 0.95, 1.0]));
      // 小物の場所を先に決める（灯籠・かがり火の明かりを床に焼き込むため）
      const spots = (st.props ?? []).map((p) => ({ p, pts: propSpots(st, p, rnd) }));
      const lights = spots.filter((x) => x.p.kind === 'lantern' || x.p.kind === 'brazier').flatMap((x) => x.pts.map(([x0, y0]) => ({ x: x0, y: y0 })));
      // 床と、遠くの地面
      const ground = new T.Mesh(new T.PlaneGeometry(GROUND.size, GROUND.size), new T.MeshLambertMaterial({ map: texOf(groundCanvas(st, lights), 'nearest') }));
      ground.rotation.x = -Math.PI / 2; stageGroup.add(ground);
      const far = new T.Mesh(new T.PlaneGeometry(1400, 1400), new T.MeshLambertMaterial({ color: (OUTSIDES[st.outside] ?? OUTSIDES.grass).base }));
      far.rotation.x = -Math.PI / 2; far.position.y = -0.02; stageGroup.add(far);
      // 縁（円: 縁石 / 崩れた縁石、四角: 石の壁）
      {
        const m4 = new T.Matrix4(), q = new T.Quaternion(), sc = new T.Vector3(), ps = new T.Vector3(), up = new T.Vector3(0, 1, 0);
        const blocks = [];
        if (st.shape === 'square') {
          for (const side of [0, 1, 2, 3]) for (let v = -R0 - 1; v < R0 + 1; v += 2) {
            const h = 1.0 + rnd() * 0.12, c = v + 1, e = R0 + 0.75;
            const [x, y, rot] = side === 0 ? [c, -e, 0] : side === 1 ? [e, c, Math.PI / 2] : side === 2 ? [c, e, 0] : [-e, c, Math.PI / 2];
            blocks.push({ x, y, rot, len: 1.96, h, dep: 1.1 });
          }
        } else {
          const n = Math.round(R0 * 4.2);
          for (let i = 0; i < n; i++) {
            if (st.edge === 'broken' && rnd() < 0.28) continue;
            const a = ((i + 0.5) / n) * Math.PI * 2, h = st.edge === 'broken' ? 0.12 + rnd() * 0.4 : 0.3 + rnd() * 0.06;
            blocks.push({ x: Math.cos(a) * (R0 + 0.32), y: Math.sin(a) * (R0 + 0.32), rot: -a + Math.PI / 2 + (rnd() - 0.5) * (st.edge === 'broken' ? 0.25 : 0.03), len: ((Math.PI * 2 * (R0 + 0.32)) / n) - 0.07, h, dep: 0.62 });
          }
        }
        const curb = new T.InstancedMesh(new T.BoxGeometry(1, 1, 1), new T.MeshLambertMaterial({ map: texOf(stoneCanvas(), 'nearest') }), blocks.length);
        const tone = st.edge === 'wall' ? [1.0, 0.96, 0.88] : [0.95, 0.95, 1.0];
        blocks.forEach((b, i) => {
          ps.set(b.x, b.h / 2, b.y); q.setFromAxisAngle(up, b.rot); sc.set(b.len, b.h, b.dep);
          curb.setMatrixAt(i, m4.compose(ps, q, sc));
          const v = 0.78 + rnd() * 0.22; curb.setColorAt(i, new T.Color(v * tone[0], v * tone[1], v * tone[2]));
        });
        stageGroup.add(curb);
      }
      // 小物
      const tintOut = new T.Color(...(st.tint ?? [0.9, 0.9, 0.95])).multiplyScalar(0.85);
      for (const { p, pts } of spots) {
        for (const [x, y] of pts) {
          const variant = Math.floor(rnd() * 3);
          const name = { lantern: 'lantern', pillar: 'pillar', pine: `pine${variant}`, rock: `rock${variant}`, pillarBroken: `pillarBroken${variant}`, brazier: 'brazier0', grass: `grass${variant}` }[p.kind];
          const f = PROPS[name];
          if (!f) continue;
          const mesh = spriteMesh(TEX.props, stageGroup);
          const scale = p.kind === 'pine' ? 0.9 + rnd() * 0.45 : p.kind === 'rock' ? 0.8 + rnd() * 0.7 : p.kind === 'grass' ? 0.8 + rnd() * 0.6 : 1;
          setFrame(mesh, TEX.props.size, f, f, f.m * scale);
          mesh.position.set(x, 0, y);
          mesh.material.uniforms.uTint.value.copy(tintOut);
          if (p.kind === 'lantern' || p.kind === 'brazier') {
            mesh.material.uniforms.uEmit.value = 2.2;
            const glow = new T.Sprite(new T.SpriteMaterial({ map: glowTex, color: 0xffb870, transparent: true, opacity: 0.55, blending: T.AdditiveBlending, depthWrite: false }));
            const gh = p.kind === 'lantern' ? 1.1 : 0.95;
            glow.scale.set(2.6, 2.6, 1); glow.position.set(x, gh, y); glow.renderOrder = 3;
            stageGroup.add(glow); glows.push(glow);
            if (p.kind === 'brazier') braziers.push(mesh);
          }
        }
      }
      // フィールドマーカー（床の印と、上に浮かぶ札）
      for (const mk of window.MockStages.MARKERS) {
        const at = window.MockStages.markerPos(st, mk);
        const decal = new T.Mesh(new T.PlaneGeometry(2.8, 2.8), new T.MeshBasicMaterial({ map: texOf(markerCanvas(mk, false)), transparent: true, depthWrite: false, fog: true }));
        decal.rotation.x = -Math.PI / 2; decal.position.set(at.x, 0.025, at.y); decal.renderOrder = 0.9;
        const sign = new T.Sprite(new T.SpriteMaterial({ map: texOf(markerCanvas(mk, true)), transparent: true, depthWrite: false }));
        sign.scale.set(1.05, 1.05, 1); sign.position.set(at.x, 2.4, at.y); sign.renderOrder = 2;
        stageGroup.add(decal, sign);
        markerSet.push({ decal, sign, mk, ph: markerSet.length * 0.8 });
      }
      // 漂う粒（蛍 / 塵 / 火の粉）
      moteStyle = st.motes ?? 'firefly';
      motes = [];
      const mr = window.MockPixel.rng(5), count = moteStyle === 'dust' ? 60 : 90;
      for (let i = 0; i < count; i++) {
        const a = mr() * Math.PI * 2, r = Math.sqrt(mr()) * (R0 + 10);
        motes.push({ x: Math.cos(a) * r, y: Math.sin(a) * r, z: 0.3 + mr() * 3.2, ph: mr() * 10, sp: 0.2 + mr() * 0.5, warm: mr() < 0.55 });
      }
    }

    // ---- 人物（影・板・残像）----
    const shadowTex = texOf(shadowCanvas());
    function shadowMesh(r) {
      const m = new T.Mesh(new T.PlaneGeometry(r * 2, r * 2), new T.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false }));
      m.rotation.x = -Math.PI / 2; m.renderOrder = 1; scene.add(m);
      return m;
    }
    const ENT = {
      boss: { mesh: spriteMesh(TEX.boss), tex: TEX.boss, shadow: shadowMesh(2.4), op: 1 },
      tank: { mesh: spriteMesh(TEX.tank), tex: TEX.tank, shadow: shadowMesh(0.95), op: 1 },
      player: { mesh: spriteMesh(TEX.player), tex: TEX.player, shadow: shadowMesh(0.9), op: 1 },
    };
    ENT.boss.mesh.material.uniforms.uEmit.value = 1.8;
    const trails = Array.from({ length: 6 }, () => spriteMesh(TEX.player));

    // ---- 敵の足元の輪 ----
    const ringMat = new T.ShaderMaterial({
      uniforms: { uC: { value: new T.Vector2() }, uFace: { value: 0 }, uR: { value: S.POL.hitbox }, uGuide: { value: 1 }, uNeed: { value: 0 }, uTime: { value: 0 }, uAlpha: { value: 1 } },
      vertexShader: DECAL_VS, fragmentShader: RING_FS, transparent: true, depthWrite: false,
    });
    const ring = new T.Mesh(new T.PlaneGeometry((S.POL.hitbox + 2) * 2, (S.POL.hitbox + 2) * 2), ringMat);
    ring.rotation.x = -Math.PI / 2; ring.position.y = 0.03; ring.renderOrder = 1; ring.frustumCulled = false; scene.add(ring);

    // ---- 使い回す部品の置き場 ----
    function pool(make) {
      const items = []; let used = 0;
      return {
        take() { if (used >= items.length) items.push(make()); const m = items[used++]; m.visible = true; return m; },
        begin() { used = 0; },
        end() { for (let i = used; i < items.length; i++) items[i].visible = false; },
      };
    }
    const KIND = { circle: 0, donut: 1, cleave: 2, line: 3, half: 4 };
    const teleGeo = new T.PlaneGeometry(64, 64); // どのステージも覆う大きさ（形の外はシェーダーで切る）
    const telePool = pool(() => {
      const m = new T.Mesh(teleGeo, new T.ShaderMaterial({
        uniforms: { uKind: { value: 0 }, uC: { value: new T.Vector2() }, uDir: { value: 0 }, uA: { value: 0 }, uB: { value: 0 }, uBack: { value: 0 }, uSide: { value: 1 }, uP: { value: 0 }, uTime: { value: 0 }, uBoomT: { value: -1 }, uArena: { value: 20 }, uSq: { value: 0 } },
        vertexShader: DECAL_VS, fragmentShader: TELE_FS, transparent: true, depthWrite: false,
      }));
      m.rotation.x = -Math.PI / 2; m.position.y = 0.02; m.renderOrder = 1; m.frustumCulled = false; scene.add(m);
      return m;
    });
    const gfxGeo = new T.PlaneGeometry(1, 1);
    const gfxPool = pool(() => {
      const m = new T.Mesh(gfxGeo, new T.ShaderMaterial({
        uniforms: { uKind: { value: 0 }, uC: { value: new T.Vector2() }, uDir: { value: 0 }, uR: { value: 1 }, uW: { value: 0.3 }, uP: { value: 0 }, uC0: { value: new T.Color() }, uC1: { value: new T.Color() }, uFade: { value: 1 } },
        vertexShader: DECAL_VS, fragmentShader: GFX_FS, transparent: true, depthWrite: false, blending: T.AdditiveBlending,
      }));
      m.rotation.x = -Math.PI / 2; m.position.y = 0.04; m.renderOrder = 3; m.frustumCulled = false; scene.add(m);
      return m;
    });
    const arcGeo = (() => {
      const n = 40, pos = [], uv = [], idx = [];
      for (let i = 0; i <= n; i++) for (let j = 0; j < 2; j++) { pos.push(0, 0, 0); uv.push(i / n, j); }
      for (let i = 0; i < n; i++) { const a = i * 2; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
      const g = new T.BufferGeometry();
      g.setAttribute('position', new T.Float32BufferAttribute(pos, 3)); g.setAttribute('uv', new T.Float32BufferAttribute(uv, 2)); g.setIndex(idx);
      return g;
    })();
    const arcPool = pool(() => {
      const m = new T.Mesh(arcGeo, new T.ShaderMaterial({
        uniforms: { uA0: { value: 0 }, uSpan: { value: 1 }, uR: { value: 1 }, uW: { value: 0.3 }, uC0: { value: new T.Color() }, uC1: { value: new T.Color() }, uHead: { value: 1 }, uTail: { value: 0 }, uFade: { value: 1 } },
        vertexShader: ARC_VS, fragmentShader: ARC_FS, transparent: true, depthWrite: false, blending: T.AdditiveBlending, side: T.DoubleSide,
      }));
      m.renderOrder = 3; m.frustumCulled = false; scene.add(m);
      return m;
    });
    const pillarGeo = new T.CylinderGeometry(0.75, 0.55, 3.4, 24, 1, true); pillarGeo.translate(0, 1.7, 0);
    const pillarPool = pool(() => {
      const m = new T.Mesh(pillarGeo, new T.ShaderMaterial({
        uniforms: { uC0: { value: new T.Color() }, uC1: { value: new T.Color() }, uFade: { value: 1 }, uTime: { value: 0 } },
        vertexShader: PILLAR_VS, fragmentShader: PILLAR_FS, transparent: true, depthWrite: false, blending: T.AdditiveBlending, side: T.DoubleSide,
      }));
      m.renderOrder = 3; scene.add(m);
      return m;
    });
    const glowPool = pool(() => {
      const s = new T.Sprite(new T.SpriteMaterial({ map: glowTex, transparent: true, blending: T.AdditiveBlending, depthWrite: false }));
      s.renderOrder = 3; scene.add(s);
      return s;
    });
    // 設置型の技（アサイラムの床・ベルの届く範囲・ベルの足元の花・鐘）
    const zonePool = pool(() => {
      const m = new T.Mesh(new T.PlaneGeometry(1, 1), new T.ShaderMaterial({
        uniforms: { uKind: { value: 0 }, uC: { value: new T.Vector2() }, uR: { value: 1 }, uTime: { value: 0 }, uAlpha: { value: 1 }, uPulse: { value: 0 }, uC0: { value: new T.Color() }, uC1: { value: new T.Color() } },
        vertexShader: DECAL_VS, fragmentShader: ZONE_FS, transparent: true, depthWrite: false, blending: T.AdditiveBlending,
      }));
      m.rotation.x = -Math.PI / 2; m.position.y = 0.025; m.renderOrder = 1; m.frustumCulled = false; scene.add(m);
      return m;
    });
    const DOME_FLAT = 0.55; // ドームの高さ（半径に対して）
    const domeGeo = new T.SphereGeometry(1, 56, 20, 0, Math.PI * 2, 0, Math.PI / 2);
    const domePool = pool(() => {
      const m = new T.Mesh(domeGeo, new T.ShaderMaterial({
        uniforms: { uTime: { value: 0 }, uAlpha: { value: 1 }, uPulse: { value: 0 }, uFlat: { value: DOME_FLAT } },
        vertexShader: DOME_VS, fragmentShader: DOME_FS, transparent: true, depthWrite: false, blending: T.AdditiveBlending, side: T.DoubleSide,
      }));
      m.renderOrder = 5; m.frustumCulled = false; scene.add(m);
      return m;
    });
    // リタージー・オブ・ベルの光の絵（sprites.js の vfx）
    const VFX = SPR.vfx, vfxTex = { heart: texOf(VFX.lilyHeart), flower: texOf(VFX.lilyFlower), bubble: texOf(VFX.lilyBubble), star: texOf(VFX.star) };
    function billMesh(tex) {
      const uniforms = {
        map: { value: tex }, uRect: { value: new T.Vector4(0, 0, 1, 1) }, uSize: { value: new T.Vector2(1, 1) }, uAnchor: { value: new T.Vector2(0.5, 0.5) },
        uFlip: { value: 0 }, uRot: { value: 0 }, uOpacity: { value: 1 }, uColor: { value: new T.Color(1, 1, 1) },
      };
      const m = new T.Mesh(quad, new T.ShaderMaterial({ uniforms, vertexShader: SPRITE_VS, fragmentShader: BILL_FS, transparent: true, depthWrite: false, blending: T.AdditiveBlending }));
      m.frustumCulled = false; m.renderOrder = 4; scene.add(m);
      return m;
    }
    const heartPool = pool(() => billMesh(vfxTex.heart)), flowerPool = pool(() => billMesh(vfxTex.flower)), bubblePool = pool(() => billMesh(vfxTex.bubble)), starPool = pool(() => billMesh(vfxTex.star));
    const camRight = new T.Vector3(), camUp2 = new T.Vector3();
    // 詠唱の陣
    const sigil = new T.Mesh(new T.PlaneGeometry(4.4, 4.4), new T.MeshBasicMaterial({ map: texOf(sigilCanvas()), transparent: true, blending: T.AdditiveBlending, depthWrite: false, color: 0xffc640 }));
    sigil.rotation.x = -Math.PI / 2; sigil.position.y = 0.05; sigil.renderOrder = 3; sigil.visible = false; scene.add(sigil);

    // ---- 粒子 ----
    const MAXP = 1600;
    const pGeo = new T.BufferGeometry();
    const pPos = new Float32Array(MAXP * 3), pCol = new Float32Array(MAXP * 3), pSize = new Float32Array(MAXP), pAlpha = new Float32Array(MAXP), pShape = new Float32Array(MAXP), pRot = new Float32Array(MAXP);
    pGeo.setAttribute('position', new T.BufferAttribute(pPos, 3));
    pGeo.setAttribute('aColor', new T.BufferAttribute(pCol, 3));
    pGeo.setAttribute('aSize', new T.BufferAttribute(pSize, 1));
    pGeo.setAttribute('aAlpha', new T.BufferAttribute(pAlpha, 1));
    pGeo.setAttribute('aShape', new T.BufferAttribute(pShape, 1));
    pGeo.setAttribute('aRot', new T.BufferAttribute(pRot, 1));
    const pMat = new T.ShaderMaterial({ uniforms: { uScale: { value: 1 } }, vertexShader: PART_VS, fragmentShader: PART_FS, transparent: true, depthWrite: false, blending: T.AdditiveBlending });
    const points = new T.Points(pGeo, pMat); points.frustumCulled = false; points.renderOrder = 4; scene.add(points);
    // ---- 後処理 ----
    const composer = new T.EffectComposer(renderer);
    composer.addPass(new T.RenderPass(scene, camera));
    const bloom = new T.UnrealBloomPass(new T.Vector2(1280, 720), 0.62, 0.42, 0.82);
    composer.addPass(bloom);
    const tsH = new T.ShaderPass(TILT(true)), tsV = new T.ShaderPass(TILT(false));
    composer.addPass(tsH); composer.addPass(tsV);
    const vig = new T.ShaderPass(T.VignetteShader);
    vig.uniforms.offset.value = 0.9; vig.uniforms.darkness.value = 1.2;
    composer.addPass(vig);
    composer.addPass(new T.OutputPass());

    function setQuality(q) {
      quality = q === 'low' || q === 'mid' ? q : 'high';
      bloom.enabled = quality !== 'low';
      tsH.enabled = tsV.enabled = quality === 'high';
      vig.enabled = quality !== 'low';
      resize(W, H, RATIO);
    }
    function resize(w, h, ratio = 1) {
      W = w; H = h; RATIO = ratio;
      const pr = quality === 'low' ? 1 : Math.min(ratio, quality === 'mid' ? 1.25 : 2);
      renderer.setPixelRatio(pr);
      renderer.setSize(w, h, false);
      cv.style.width = `${w}px`; cv.style.height = `${h}px`;
      camera.aspect = w / h; camera.updateProjectionMatrix();
      composer.setPixelRatio(pr); composer.setSize(w, h);
      tsH.uniforms.uStep.value = 1 / (w * pr) * 3; tsV.uniforms.uStep.value = 1 / (h * pr) * 3;
      pMat.uniforms.uScale.value = (h * pr) / (2 * Math.tan((camera.fov * DEG) / 2)) * 0.09;
    }

    const v3 = new T.Vector3(), camUp = new T.Vector3();
    // 画面の位置（舞台の px）。高さ z は、人物の板と同じく「カメラの上の向き」にとる（名前やフライテキストが、傾いた板の頭の上に来るように）
    // 画面の位置 → 床（高さ 0）の位置
    const ray = new T.Raycaster(), ndc = new T.Vector2(), floorPlane = new T.Plane(new T.Vector3(0, 1, 0), 0), hit = new T.Vector3();
    function ground(px, py) {
      ndc.set((px / W) * 2 - 1, 1 - (py / H) * 2);
      ray.setFromCamera(ndc, camera);
      return ray.ray.intersectPlane(floorPlane, hit) ? { x: hit.x, y: hit.z } : null;
    }
    // 画面の位置の人物（クリックでターゲットにする）: 足元から頭までの縦長の枠で当たりを見る。重なっていれば手前
    function pick(px, py) {
      let best = null;
      for (const kind of ['player', 'boss', ...(S.hasNpc() ? ['tank'] : [])]) {
        const e = S[kind], h = S.HEAD[kind], a = project(e.x, e.y, 0), b = project(e.x, e.y, h);
        const w = Math.max(18, Math.abs(a.y - b.y) * (kind === 'boss' ? 0.42 : 0.3));
        if (px < a.x - w || px > a.x + w || py < b.y - 10 || py > a.y + 10) continue;
        const d = camera.position.distanceTo(v3.set(e.x, 0, e.y));
        if (!best || d < best.d) best = { kind, d };
      }
      return best?.kind ?? null;
    }
    function project(x, y, z = 0) {
      camUp.setFromMatrixColumn(camera.matrixWorld, 1);
      v3.set(x, 0, y).addScaledVector(camUp, z).project(camera);
      return { x: ((v3.x + 1) / 2) * W, y: ((1 - v3.y) / 2) * H, ok: v3.z > -1 && v3.z < 1 };
    }

    // ---------------- 毎フレーム ----------------
    const WHITE = new T.Color(1, 1, 1), RED = new T.Color(1, 0.25, 0.2);
    let last = performance.now();
    function render(simT) {
      const now = performance.now(), dt = Math.min(0.1, (now - last) / 1000); last = now;
      time += dt;
      const { cam, player, boss, tank } = S;

      // カメラ（自分の少し前・少し上を見る。自分は画面のやや下に来る。揺れは位置だけずらす）
      const yaw = cam.yaw, pitch = cam.pitch * DEG, dd = cam.dist;
      const ahead = 1.6 * Math.cos(pitch);
      const tx = cam.x + Math.cos(yaw) * ahead, tz = cam.y + Math.sin(yaw) * ahead, ty = 1.3;
      const sh = cam.shake * 0.02;
      camera.position.set(tx - Math.cos(yaw) * dd * Math.cos(pitch) + (Math.random() - 0.5) * sh, ty + dd * Math.sin(pitch) + (Math.random() - 0.5) * sh, tz - Math.sin(yaw) * dd * Math.cos(pitch) + (Math.random() - 0.5) * sh);
      camera.lookAt(tx, ty, tz);
      camera.updateMatrixWorld();
      sky.position.copy(camera.position);

      // 光の明滅（直近の命中の光）
      let fl = 0, flc = WHITE, flp = null;
      for (const e of S.fx) if (e.type === 'flash' && e.t >= 0) { const k = (1 - e.t / e.dur) ** 2 * (e.power ?? 1); if (k > fl) { fl = k; flc = col(e.col[1]); flp = e.at; } }
      flashLight.intensity = fl * 60;
      if (flp) { flashLight.position.set(flp.x, flp.z ?? 2, flp.y); flashLight.color.copy(flc); }
      const cg = S.castGlow;
      castLight.intensity = cg ? (18 + 30 * Math.min(1, cg.t / cg.dur)) * (cg.power ?? 1) : 0;
      if (cg) { castLight.color.copy(col(cg.col[1])); castLight.position.set(player.x, 1.2, player.y); }
      for (const g of glows) g.material.opacity = 0.5 + 0.08 * Math.sin(time * 7 + g.position.x) + 0.05 * Math.sin(time * 13.7 + g.position.z);
      const bf = PROPS[`brazier${Math.floor(time * 9) % 3}`];
      for (const m of braziers) setFrame(m, TEX.props.size, bf, bf);
      // フィールドマーカー
      const showMk = !!S.markers;
      markerSet.forEach((mk) => { mk.decal.visible = mk.sign.visible = showMk; mk.sign.position.y = 2.4 + Math.sin(time * 1.6 + mk.ph) * 0.12; });

      // 人物
      const tintAt = (x, y, out) => {
        out.copy(baseTint);
        if (fl > 0 && flp) { const k = fl * Math.max(0, 1 - Math.hypot(flp.x - x, flp.y - y) / 10) * 0.5; out.r += flc.r * k; out.g += flc.g * k; out.b += flc.b * k; }
        if (cg) { const k = 0.35 * (cg.power ?? 1) * Math.min(1, cg.t / cg.dur) * Math.max(0, 1 - Math.hypot(player.x - x, player.y - y) / 6); const c = col(cg.col[1]); out.r += c.r * k; out.g += c.g * k; out.b += c.b * k; }
        return out;
      };
      for (const kind of ['boss', 'tank', 'player']) {
        const E = ENT[kind], e = S[kind], m = E.mesh, u = m.material.uniforms;
        const show = kind !== 'tank' || S.hasNpc();
        m.visible = show; E.shadow.visible = show;
        if (!show) continue;
        const P = S.poseOf(kind, yaw);
        // 見た目の組が変わったら（ジョブの切り替え）、貼る絵を差し替える
        if (E.tex !== TEX[P.name]) { E.tex = TEX[P.name]; u.map.value = E.tex.map; u.emap.value = E.tex.emap; u.texSize.value = E.tex.size; }
        setFrame(m, E.tex.size, P.fr, P.set);
        u.uRot.value = P.rot;
        let z = e.z ?? 0, op = 1;
        if (kind === 'boss' && boss.dead) { const k = Math.max(0, boss.dead - 1); op = 1 - k; z = -k * 1.2; }
        if (kind === 'player' && player.down > 0) op = 0.65;
        E.op += ((E.hide ? 0.42 : 1) * op - E.op) * Math.min(1, dt * 10);
        u.uOpacity.value = E.op;
        m.visible = E.op > 0.01;
        m.position.set(e.x, z, e.y);
        tintAt(e.x, e.y, u.uTint.value);
        // 当たったときの光は控えめに（光のにじみで絵が消えないよう、白は少し落とす）
        const flash = kind === 'boss' ? Math.max(boss.flash * 0.38, boss.dead ? (2 - boss.dead) * 0.6 : 0) : kind === 'tank' ? tank.flash * 0.3 : 0;
        const hurt = kind === 'boss' ? 0 : e.hurt * 0.6;
        if (hurt > flash) u.uFlash.value.set(RED.r, RED.g, RED.b, hurt); else u.uFlash.value.set(0.78, 0.78, 0.78, flash);
        E.shadow.position.set(e.x, 0.012, e.y);
        const ss = kind === 'player' ? 1 - player.z * 0.25 : 1;
        E.shadow.scale.set(ss, ss, ss);
        E.shadow.material.opacity = kind === 'boss' && boss.dead ? Math.max(0, 2 - boss.dead) : 1;
      }
      // 自分が手前の人物（敵・タンク）に隠れたら、隠している方を薄くする（背面を取りに敵の後ろへ回ったとき）
      const rect = (kind) => { const e = S[kind], h = S.HEAD[kind], a = project(e.x, e.y, 0), b = project(e.x, e.y, h), w = Math.abs(a.y - b.y) * (kind === 'boss' ? 0.42 : 0.26); return { x0: a.x - w, x1: a.x + w, y0: b.y, y1: a.y, d: camera.position.distanceTo(v3.set(e.x, 0, e.y)) }; };
      const rb = rect('boss'), rp = rect('player'), rt = S.hasNpc() ? rect('tank') : null;
      const covers = (f, b) => b && f && f.d < b.d && f.x0 < b.x1 && f.x1 > b.x0 && f.y0 < b.y1 && f.y1 > b.y0;
      ENT.boss.hide = covers(rb, rp);
      ENT.tank.hide = covers(rt, rp);
      // 残像
      const pn = S.setName('player'), pset = S.SPR[pn], ptex = TEX[pn];
      trails.forEach((m, i) => {
        const t = player.trail[i];
        m.visible = !!t;
        if (!t) return;
        const dir = ['right', 'down', 'left', 'up'][Math.round((((t.face - yaw - Math.PI / 2) % (Math.PI * 2)) + Math.PI * 4) % (Math.PI * 2) / (Math.PI / 2)) % 4];
        const u = m.material.uniforms;
        if (u.map.value !== ptex.map) { u.map.value = ptex.map; u.emap.value = ptex.emap; u.texSize.value = ptex.size; }
        setFrame(m, ptex.size, window.MockSprites.frame(pset, 'run', dir, 0.1), pset);
        m.position.set(t.x, 0, t.y);
        u.uOpacity.value = (t.life / t.max) * 0.45; u.uFlash.value.set(0.6, 0.85, 1, 0.6); u.uTint.value.setRGB(1, 1, 1);
      });

      // 設置型の技
      zonePool.begin(); domePool.begin(); heartPool.begin(); flowerPool.begin(); bubblePool.begin(); starPool.begin();
      camRight.setFromMatrixColumn(camera.matrixWorld, 0); camUp2.setFromMatrixColumn(camera.matrixWorld, 1);
      for (const z of S.zones) {
        const fade = (z.dying ? Math.max(0, 1 - (S.clock - z.endAt) / 0.7) : 1) * Math.min(1, (S.clock - z.born) / 0.4);
        const pulse = Math.max(0, 1 - (S.clock - z.ringAt) / 0.7);
        const d = zonePool.take(), u = d.material.uniforms;
        d.position.x = z.x; d.position.z = z.y; d.scale.set(z.r * 2 + 1.8, z.r * 2 + 1.8, 1);
        u.uKind.value = z.kind === 'asylum' ? 0 : 1; u.uC.value.set(z.x, z.y); u.uR.value = z.r; u.uTime.value = time; u.uAlpha.value = fade; u.uPulse.value = pulse;
        if (z.kind === 'asylum') {
          u.uC0.value.copy(col('#f0f8ff')); u.uC1.value.copy(col('#6aa8ff'));
          // 透明なドーム（立ち上がるときは下から伸びる）
          const dm = domePool.take(), du = dm.material.uniforms, rise = Math.min(1, (S.clock - z.born) / 0.6);
          dm.position.set(z.x, 0, z.y); dm.scale.set(z.r, z.r * DOME_FLAT * (1 - Math.pow(1 - rise, 3)), z.r);
          du.uTime.value = time; du.uAlpha.value = fade; du.uPulse.value = pulse;
          continue;
        }
        if (z.kind === 'ley') {
          // 黒魔紋: 足元の紫の輪（範囲の輪の描き方）
          u.uC0.value.copy(col('#f2e8ff')); u.uC1.value.copy(col('#8a5cff'));
          continue;
        }
        if (z.kind === 'star') {
          // アーサリースター: 床に範囲の輪、上に星図の玉が浮かんでゆっくり回る。巨星は金で大きく、脈打つ
          const giant = !!z.giant, gk = giant ? Math.min(1, (S.clock - (z.giantAt ?? S.clock)) / 0.6) : 0;
          u.uC0.value.copy(col(giant ? '#fff6dc' : '#eef4ff')); u.uC1.value.copy(col(giant ? '#ffb84a' : '#5a8cff'));
          const grow = Math.min(1, (S.clock - z.born) / 0.5), sz = (2.6 + gk * 1.4) * (1 - Math.pow(1 - grow, 3)) * (1 + Math.sin(time * (giant ? 5 : 2.5)) * 0.04);
          const sm = starPool.take(), su = sm.material.uniforms;
          sm.position.set(z.x, 1.6 + Math.sin(time * 1.4) * 0.12, z.y);
          su.uSize.value.set(sz, sz); su.uAnchor.value.set(0.5, 0.5); su.uOpacity.value = fade * (giant ? 0.75 : 0.8); su.uRot.value = time * 0.4;
          if (giant) su.uColor.value.setRGB(1.05, 0.8, 0.42); else su.uColor.value.setRGB(0.72, 0.8, 1);
          continue;
        }
        u.uC0.value.copy(col('#f0ffff')); u.uC1.value.copy(col('#50d8d0'));
        // リタージー・オブ・ベル: 伸びて少し行き過ぎて戻るように生え、中央の花が脈打ち、鈴の花（ガラス玉）が揺れる
        const L = VFX.LILY, grow = Math.min(1, (S.clock - z.born) / 0.5), k = grow < 1 ? 1 - Math.pow(1 - grow, 3) * (1 - grow * 1.6) : 1;
        const place = (m, dx, dy, w, h, ax, ay, op) => {
          const mu = m.material.uniforms;
          m.position.set(z.x, 0, z.y).addScaledVector(camRight, dx).addScaledVector(camUp2, dy);
          mu.uSize.value.set(w, h); mu.uAnchor.value.set(ax, ay); mu.uOpacity.value = op;
        };
        place(heartPool.take(), 0, 0, L.w * k, L.h * k, 0.5, 0, fade);
        const [fx0, fy0, fs0] = L.flower, fsz = fs0 * k * (1 + pulse * 0.25);
        place(flowerPool.take(), fx0 * k, fy0 * k, fsz, fsz, 0.5, 0.5, fade * (0.85 + 0.15 * Math.sin(time * 3)));
        const left = S.bellStacks?.() ?? 0;
        L.bubbles.forEach(([x, y, sz], i) => {
          const pop = z.pops[i] != null ? (S.clock - z.pops[i]) / 0.45 : null;
          if (i >= left && (pop == null || pop >= 1)) return;
          const appear = Math.min(1, Math.max(0, (S.clock - z.born - 0.3 - i * 0.08) / 0.25));
          const sc = (pop != null ? 1 + pop * 0.8 : appear) * sz * k, a = pop != null ? 1 - pop : appear;
          const bm = bubblePool.take();
          place(bm, x * k, (y + Math.sin(S.clock * 2 + i * 1.3) * 0.06) * k, sc, sc, 0.5, 0.5, fade * a);
          bm.material.uniforms.uColor.value.setRGB(1.5, 1.65, 1.75); // ガラス玉は少し明るく（小さくても見えるように）
        });
      }
      if (S.aim) {
        const am = zonePool.take(), au = am.material.uniforms, A2 = S.aim;
        am.position.x = A2.x; am.position.z = A2.y; am.scale.set(A2.r * 2 + 1.8, A2.r * 2 + 1.8, 1);
        au.uKind.value = 2; au.uC.value.set(A2.x, A2.y); au.uR.value = A2.r; au.uTime.value = time; au.uAlpha.value = 1; au.uPulse.value = 0;
        au.uC0.value.copy(col(A2.ok ? '#f4fcff' : '#ffd0c8')); au.uC1.value.copy(col(A2.ok ? '#6ac8ff' : '#ff5a4a'));
      }
      zonePool.end(); domePool.end(); heartPool.end(); flowerPool.end(); bubblePool.end(); starPool.end();

      // 敵の足元の輪
      ring.visible = !boss.dead;
      ring.position.x = boss.x; ring.position.z = boss.y;
      ringMat.uniforms.uC.value.set(boss.x, boss.y);
      ringMat.uniforms.uFace.value = boss.face;
      ringMat.uniforms.uGuide.value = S.opts.guide ? 1 : 0;
      ringMat.uniforms.uNeed.value = S.guideNeed === 'rear' ? 1 : S.guideNeed === 'flank' ? 2 : 0;
      ringMat.uniforms.uTime.value = time;

      // 予兆（詠唱中）と、発動の光
      telePool.begin();
      const teleOf = (tg, boom) => {
        const m = telePool.take(), u = m.material.uniforms;
        u.uKind.value = KIND[tg.kind]; u.uC.value.set(tg.c.x, tg.c.y); u.uDir.value = tg.dir ?? 0;
        u.uA.value = tg.kind === 'circle' ? tg.r : tg.kind === 'donut' ? tg.inner : tg.kind === 'cleave' ? tg.half : tg.kind === 'line' ? tg.w : 0;
        u.uB.value = tg.kind === 'donut' ? tg.outer : tg.kind === 'cleave' ? tg.r : tg.kind === 'line' ? tg.len : 0;
        u.uBack.value = tg.back ?? 0; u.uSide.value = tg.side === 'left' ? -1 : 1;
        u.uP.value = boom >= 0 ? 1 : Math.min(1, Math.max(0, (simT - tg.start) / (tg.end - tg.start)));
        u.uTime.value = time; u.uBoomT.value = boom;
        u.uArena.value = STG.size; u.uSq.value = STG.shape === 'square' ? 1 : 0;
      };
      for (const tg of S.telegraphs) if (!tg.done && tg.kind !== 'raid' && simT >= tg.start && (!tg.follow || tg.placed)) teleOf(tg, -1);
      for (const e of S.fx) if (e.type === 'boom' && e.t >= 0) teleOf(e.tg, Math.min(1, e.t / e.dur));
      telePool.end();

      // 演出
      arcPool.begin(); gfxPool.begin(); pillarPool.begin(); glowPool.begin();
      for (const e of S.fx) {
        if (e.t < 0) continue;
        const p = e.t / e.dur;
        if (e.type === 'arc') {
          const m = arcPool.take(), u = m.material.uniforms;
          m.position.set(e.target.x, e.h, e.target.y);
          m.rotation.set(e.tilt, 0, e.tilt * 0.4, 'YXZ');
          u.uA0.value = e.a0; u.uSpan.value = e.span; u.uR.value = e.r; u.uW.value = e.w ?? 0.35;
          u.uHead.value = Math.min(1, p * 2.2); u.uTail.value = Math.max(0, p * 1.6 - 0.6); u.uFade.value = 1 - p * 0.5;
          u.uC0.value.copy(col(e.col[0])); u.uC1.value.copy(col(e.col[1]));
        } else if (e.type === 'ring') {
          const m = gfxPool.take(), u = m.material.uniforms;
          const r = e.r0 + (e.r1 - e.r0) * (1 - Math.pow(1 - p, 3));
          m.position.set(e.at.x, 0.05, e.at.y); m.scale.set(r * 2 + 2, r * 2 + 2, 1);
          u.uKind.value = 0; u.uC.value.set(e.at.x, e.at.y); u.uR.value = r; u.uW.value = e.thick ? 0.5 : 0.28; u.uFade.value = 1 - p;
          u.uC0.value.copy(col(e.col[0])); u.uC1.value.copy(col(e.col[1]));
        } else if (e.type === 'cone' || e.type === 'line') {
          const m = gfxPool.take(), u = m.material.uniforms;
          const dir = Math.atan2(boss.y - player.y, boss.x - player.x);
          const len = e.type === 'cone' ? (e.r + S.POL.hitbox) * Math.min(1, p * 1.8) : e.len * Math.min(1, p * 3);
          m.position.set(player.x, 0.05, player.y); m.scale.set(len * 2 + 2, len * 2 + 2, 1);
          u.uKind.value = e.type === 'cone' ? 1 : 2; u.uC.value.set(player.x, player.y); u.uDir.value = dir; u.uR.value = len; u.uW.value = e.type === 'line' ? Math.max(0.2, 1 - p) : 0.3; u.uFade.value = (1 - p) * 0.8;
          u.uC0.value.copy(col(e.col[0])); u.uC1.value.copy(col(e.col[1]));
        } else if (e.type === 'pillar') {
          const m = pillarPool.take(), u = m.material.uniforms;
          m.position.set(e.at.x, 0, e.at.y); const k = Math.min(1, p * 3); m.scale.set(1 + p * 0.6, k, 1 + p * 0.6);
          u.uFade.value = 1 - p; u.uTime.value = time; u.uC0.value.copy(col(e.col[0])); u.uC1.value.copy(col(e.col[1]));
        } else if (e.type === 'erupt') {
          // 地面から噴き出す光の柱（細く高く、すぐ消える）
          const m = pillarPool.take(), u = m.material.uniforms;
          const k = Math.min(1, p * 3.5);
          m.position.set(e.at.x, 0, e.at.y); m.scale.set(0.42 + p * 0.3, (e.h / 3.4) * k, 0.42 + p * 0.3);
          u.uFade.value = (1 - p) * 1.6; u.uTime.value = time; u.uC0.value.copy(col(e.col[0])); u.uC1.value.copy(col(e.col[1]));
        } else if (e.type === 'proj') {
          const s = glowPool.take();
          s.position.set(player.x + (boss.x - player.x) * p, 1.5, player.y + (boss.y - player.y) * p); s.scale.set(1.2, 1.2, 1);
          s.material.color.copy(col(e.col[1])); s.material.opacity = 1;
        } else if (e.type === 'flash') {
          const s = glowPool.take();
          s.position.set(e.at.x, e.at.z ?? 2, e.at.y); const sc = (2.5 + p * 3) * (e.power ?? 1); s.scale.set(sc, sc, 1);
          s.material.color.copy(col(e.col[0])); s.material.opacity = (1 - p) * 0.7;
        }
      }
      // リタージー・オブ・ベル: ハートの中の青い光のもや
      for (const z of S.zones) {
        if (z.kind !== 'bell' || z.dying) continue;
        const s3 = glowPool.take(), pl = 0.8 + 0.2 * Math.sin(time * 3);
        s3.position.set(z.x, S.BELL_H, z.y); s3.scale.set(3.6 * pl, 3.6 * pl, 1); s3.material.color.copy(col('#5fd0ff')); s3.material.opacity = 0.32;
      }
      // 敵の詠唱中: 胸の芯が脈打って光る
      if (boss.casting && !boss.dead) {
        const s2 = glowPool.take(), pl = 0.75 + 0.25 * Math.sin(time * 9);
        s2.position.set(boss.x, 2.3, boss.y); s2.scale.set(3.4 * pl, 3.4 * pl, 1);
        s2.material.color.copy(col('#ff9a4a')); s2.material.opacity = 0.55 * pl;
      }
      arcPool.end(); gfxPool.end(); pillarPool.end(); glowPool.end();
      // 詠唱の陣
      sigil.visible = !!cg;
      if (cg) {
        const k = Math.min(1, cg.t / cg.dur);
        sigil.position.x = player.x; sigil.position.z = player.y; sigil.rotation.z = time * 0.9;
        sigil.material.color.copy(col(cg.col[1])); sigil.material.opacity = (0.35 + 0.55 * k) * Math.min(1, (cg.power ?? 1) * 1.3);
        const sc = 1.15 - 0.25 * k; sigil.scale.set(sc, sc, 1);
      }

      // 粒子
      let n = 0;
      for (const q of S.parts) {
        if (n >= MAXP - motes.length) break;
        pPos[n * 3] = q.x; pPos[n * 3 + 1] = q.z; pPos[n * 3 + 2] = q.y;
        const c = col(q.col), k = q.dim ? 0.3 : 1; pCol[n * 3] = c.r * k; pCol[n * 3 + 1] = c.g * k; pCol[n * 3 + 2] = c.b * k;
        pSize[n] = q.size ?? 1; pAlpha[n] = Math.min(1, (q.life / q.max) * 1.4);
        pShape[n] = q.shape ?? 0; pRot[n] = q.rot ?? 0;
        n++;
      }
      for (const mo of motes) {
        const t = time * mo.sp + mo.ph;
        let z = mo.z + Math.sin(t * 1.3) * 0.4, c, k = 0.5, a = 0.35 + 0.35 * Math.sin(t * 2.3), size = 0.8;
        if (moteStyle === 'ember') { z = ((time * mo.sp * 0.8 + mo.ph) % 5) + 0.2; c = mo.warm ? col('#ff8a4a') : col('#ffcf7a'); k = 0.7; a = 0.6 * (1 - z / 5.2); }
        else if (moteStyle === 'dust') { c = col('#fff4e0'); k = 0.3; a = 0.25 + 0.15 * Math.sin(t * 1.1); size = 0.6; }
        else c = mo.warm ? col('#ffcf7a') : col('#9fe0ff');
        pPos[n * 3] = mo.x + Math.sin(t * 0.7) * 1.2; pPos[n * 3 + 1] = z; pPos[n * 3 + 2] = mo.y + Math.cos(t * 0.6) * 1.2;
        pCol[n * 3] = c.r * k; pCol[n * 3 + 1] = c.g * k; pCol[n * 3 + 2] = c.b * k;
        pSize[n] = size; pAlpha[n] = Math.max(0, a); pShape[n] = 0; pRot[n] = 0;
        n++;
      }
      pGeo.setDrawRange(0, n);
      for (const k of ['position', 'aColor', 'aSize', 'aAlpha', 'aShape', 'aRot']) pGeo.attributes[k].needsUpdate = true;

      // ティルトシフトのピント: 自分と敵のあいだ（帯の幅は、2 人の画面上の離れ具合に合わせて広げる）
      const fp = project(player.x, player.y, 1), fb = project(boss.x, boss.y, 2);
      const ya = 1 - fp.y / H, yb = 1 - fb.y / H;
      tsH.uniforms.uFocus.value = tsV.uniforms.uFocus.value = Math.max(0.15, Math.min(0.85, (ya + yb) / 2));
      tsH.uniforms.uBand.value = tsV.uniforms.uBand.value = Math.min(0.45, 0.2 + Math.abs(ya - yb) / 2);

      placeTgtRing();
      if (quality === 'low') renderer.render(scene, camera);
      else composer.render();
    }

    // 味方をターゲットしたときの足元の輪（敵は当たり判定の輪がそのまま目印）
    const tgtRing = new T.Mesh(new T.RingGeometry(0.78, 1, 48), new T.MeshBasicMaterial({ color: 0x7fd4ff, transparent: true, opacity: 0.85, depthWrite: false, side: T.DoubleSide, blending: T.AdditiveBlending }));
    tgtRing.rotation.x = -Math.PI / 2; tgtRing.renderOrder = 3; tgtRing.visible = false;
    scene.add(tgtRing);
    const placeTgtRing = () => {
      const k = S.target;
      tgtRing.visible = k === 'player' || (k === 'tank' && S.hasNpc());
      if (!tgtRing.visible) return;
      const e = S[k], pulse = 1 + Math.sin(time * 4) * 0.05;
      tgtRing.position.set(e.x, 0.03, e.y); tgtRing.scale.setScalar(1.25 * pulse);
    };

    buildStage(S.stage);
    setQuality('high');
    // 同梱のフォント（Cinzel）が読み込まれたら、マーカーの文字を描き直す（canvas の文字は、描いた時点のフォントのまま）
    document.fonts?.load('900 56px Cinzel').then(() => {
      for (const m of markerSet) {
        for (const [obj, floating] of [[m.decal, false], [m.sign, true]]) {
          const tex = obj.material.map, c = markerCanvas(m.mk, floating);
          tex.image.getContext('2d').clearRect(0, 0, tex.image.width, tex.image.height);
          tex.image.getContext('2d').drawImage(c, 0, 0);
          tex.needsUpdate = true;
        }
      }
    }).catch(() => {});
    return {
      render, resize, project, ground, pick, setQuality, setStage: buildStage,
      debug: () => ({ stage: STG.id, calls: renderer.info.render.calls, tris: renderer.info.render.triangles, quality, cam: camera.position.toArray().map((v) => +v.toFixed(2)) }),
    };
  }

  window.MockArena3D = { create };
})();
