// three.js をモック用に 1 つのファイル（three.min.js。読み込むと window.THREE ができる）にまとめる。
// モックは <script> で順に読み込む作りなので、ES モジュールのままではなく即時関数の形にする（file:// で開いても動く）。
//
// 使い方（three と esbuild を入れた作業用フォルダで実行する。リポジトリには node_modules を置かない）:
//   mkdir /tmp/three-build && cd /tmp/three-build && npm init -y && npm i three@0.186.0 esbuild@0.25
//   node <リポジトリ>/mock/vendor/build-three.mjs
import { createRequire } from 'node:module';
import { writeFileSync, readFileSync, copyFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const cwd = process.cwd();
const require = createRequire(join(cwd, 'package.json'));
const esbuild = require('esbuild');
const threeDir = join(cwd, 'node_modules', 'three');
const threePkg = JSON.parse(readFileSync(join(threeDir, 'package.json'), 'utf8'));

// モックで使う追加部品（後処理: 光のにじみ・ティルトシフト・周辺減光）
const entry = `
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { HorizontalTiltShiftShader } from 'three/examples/jsm/shaders/HorizontalTiltShiftShader.js';
import { VerticalTiltShiftShader } from 'three/examples/jsm/shaders/VerticalTiltShiftShader.js';
import { VignetteShader } from 'three/examples/jsm/shaders/VignetteShader.js';
window.THREE = Object.assign({}, THREE, { EffectComposer, RenderPass, UnrealBloomPass, ShaderPass, OutputPass, HorizontalTiltShiftShader, VerticalTiltShiftShader, VignetteShader });
`;
const entryPath = join(cwd, 'three-entry.mjs');
writeFileSync(entryPath, entry);
const out = join(here, 'three.min.js');
await esbuild.build({
  entryPoints: [entryPath], bundle: true, minify: true, format: 'iife', target: 'es2020', outfile: out, absWorkingDir: cwd,
  legalComments: 'none',
  banner: { js: `/* three.js r${threePkg.version.split('.')[1]} (${threePkg.version}) + 後処理の部品。MIT License / Copyright © 2010-2026 three.js authors / https://github.com/mrdoob/three.js — mock/vendor/build-three.mjs で作成 */` },
});
copyFileSync(join(threeDir, 'LICENSE'), join(here, 'LICENSE-three.txt'));
console.log(`書き出し: ${out}（three ${threePkg.version}）`);
