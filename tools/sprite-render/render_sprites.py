"""3D モデル + アニメ FBX/GLB から、4方向のスプライト連番 PNG をレンダリングする。

使い方（bpy を入れた Python か、Blender 本体のどちらでも可）:
    python render_sprites.py --config characters.json [--character knight] [--out out/frames]
    blender -b -P render_sprites.py -- --config characters.json

出力: <out>/<character>/<animation>/<direction>_<frame:03d>.png
"""
from __future__ import annotations

import argparse
import json
import math
import sys
from pathlib import Path

import bpy
from mathutils import Vector

# Blender は「モデルの正面 = -Y」で、カメラを -Y に置くと正面(down)が見える。
# キャラを Z 軸で回して向きを作る。
DIRECTION_YAW = {"down": 0.0, "left": -90.0, "right": 90.0, "up": 180.0}


def parse_args() -> argparse.Namespace:
    argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else sys.argv[1:]
    p = argparse.ArgumentParser()
    p.add_argument("--config", required=True)
    p.add_argument("--character", help="指定したキャラだけ描画（省略で全員）")
    p.add_argument("--animation", help="指定したアニメだけ描画")
    p.add_argument("--out", default="out/frames")
    p.add_argument("--max-frames", type=int, help="動作確認用にフレーム数を制限")
    return p.parse_args(argv)


def reset_scene() -> bpy.types.Scene:
    bpy.ops.wm.read_factory_settings(use_empty=True)
    return bpy.context.scene


def import_model(path: Path) -> list[bpy.types.Object]:
    before = set(bpy.data.objects)
    ext = path.suffix.lower()
    if ext == ".fbx":
        bpy.ops.import_scene.fbx(filepath=str(path))
    elif ext in (".glb", ".gltf"):
        bpy.ops.import_scene.gltf(filepath=str(path))
    else:
        raise SystemExit(f"未対応の形式: {path}（.fbx / .glb / .gltf）")
    return [o for o in bpy.data.objects if o not in before]


def mesh_bounds(scene, meshes) -> tuple[Vector, Vector]:
    """評価済み（アーマチュア変形後）メッシュのワールド座標 bbox。"""
    dg = bpy.context.evaluated_depsgraph_get()
    lo = Vector((math.inf,) * 3)
    hi = Vector((-math.inf,) * 3)
    for o in meshes:
        ev = o.evaluated_get(dg)
        me = ev.to_mesh()
        for v in me.vertices:
            w = ev.matrix_world @ v.co
            lo = Vector(map(min, lo, w))
            hi = Vector(map(max, hi, w))
        ev.to_mesh_clear()
    return lo, hi


def apply_material_colors(meshes, colors: dict) -> None:
    """{"マテリアル名の一部": [r,g,b]} で色を上書き（ジョブ別の色替え用）。"""
    for o in meshes:
        for slot in o.material_slots:
            m = slot.material
            if not m:
                continue
            for key, rgb in colors.items():
                if key.lower() in m.name.lower():
                    m.use_nodes = True
                    bsdf = m.node_tree.nodes.get("Principled BSDF")
                    if bsdf:
                        for link in list(bsdf.inputs["Base Color"].links):
                            m.node_tree.links.remove(link)
                        bsdf.inputs["Base Color"].default_value = (*rgb, 1.0)


def setup_camera(scene, height: float, cfg: dict) -> None:
    elev = math.radians(cfg.get("camera_elevation", 30))
    dist = 30.0
    cam_data = bpy.data.cameras.new("cam")
    cam_data.type = "ORTHO"
    cam_data.ortho_scale = height * cfg.get("frame_margin", 1.45)
    cam = bpy.data.objects.new("cam", cam_data)
    scene.collection.objects.link(cam)
    target = Vector((0, 0, height * 0.5))
    cam.location = target + Vector((0, -dist * math.cos(elev), dist * math.sin(elev)))
    cam.rotation_euler = (math.pi / 2 - elev, 0, 0)
    scene.camera = cam


def setup_lights(scene) -> None:
    sun_data = bpy.data.lights.new("sun", "SUN")
    sun_data.energy = 3.0
    sun = bpy.data.objects.new("sun", sun_data)
    sun.rotation_euler = (math.radians(50), 0, math.radians(-30))  # カメラ基準で固定（キャラだけ回す）
    scene.collection.objects.link(sun)
    world = bpy.data.worlds.new("w")
    world.use_nodes = True
    world.node_tree.nodes["Background"].inputs["Color"].default_value = (0.8, 0.85, 1.0, 1)
    world.node_tree.nodes["Background"].inputs["Strength"].default_value = 0.8
    scene.world = world


def setup_render(scene, cfg: dict) -> None:
    size = cfg.get("size", 128)
    scene.render.engine = cfg.get("engine", "CYCLES")  # GPU なし環境でも動く。速くしたい場合のみ BLENDER_EEVEE
    if scene.render.engine == "CYCLES":
        scene.cycles.device = "CPU"
        scene.cycles.samples = cfg.get("samples", 16)
        scene.cycles.use_denoising = False  # ノイズ除去はにじむので切る
        scene.cycles.filter_width = 0.5
    scene.render.resolution_x = scene.render.resolution_y = size
    scene.render.resolution_percentage = 100
    scene.render.film_transparent = True
    scene.render.image_settings.file_format = "PNG"
    scene.render.image_settings.color_mode = "RGBA"
    scene.view_settings.view_transform = "Standard"
    if cfg.get("outline", True):
        scene.render.use_freestyle = True
        vl = scene.view_layers[0]
        vl.use_freestyle = True
        # 空シーンにも linestyle なしの既定 LineSet があり、放置すると描画時に例外になる
        lines = vl.freestyle_settings.linesets
        ls = lines[0] if len(lines) else lines.new("outline")
        style = bpy.data.linestyles.new("outline")
        style.color = (0.05, 0.05, 0.08)
        style.thickness = cfg.get("outline_thickness", 1.5)
        ls.linestyle = style


def animation_frames(scene, armatures, anim_cfg: dict, global_cfg: dict) -> list[float]:
    """描画するソース側フレーム番号のリストを返す。"""
    start, end = scene.frame_start, scene.frame_end
    for a in armatures:
        ad = a.animation_data
        if ad and ad.action:
            start, end = (int(round(v)) for v in ad.action.frame_range)
            break
    scene.frame_start, scene.frame_end = start, end
    src_fps = anim_cfg.get("source_fps", global_cfg.get("source_fps", 30))
    fps = anim_cfg.get("fps", global_cfg.get("fps", 12))
    span = end - start
    n = max(1, round(span / src_fps * fps))
    if not anim_cfg.get("loop", True):
        n += 1  # 非ループは最終ポーズまで含める
    frames = [start + span * i / (n if anim_cfg.get("loop", True) else max(n - 1, 1)) for i in range(n)]
    if "max_frames" in anim_cfg:
        frames = frames[: anim_cfg["max_frames"]]
    return frames


def render_animation(char_id: str, char: dict, anim_name: str, anim: dict, cfg: dict, out: Path,
                     max_frames: int | None) -> dict:
    scene = reset_scene()
    setup_render(scene, cfg)
    setup_lights(scene)

    objs = import_model(Path(char["dir"]) / anim["file"] if "dir" in char else Path(anim["file"]))
    meshes = [o for o in objs if o.type == "MESH"]
    armatures = [o for o in objs if o.type == "ARMATURE"]
    if not meshes:
        raise SystemExit(f"メッシュが見つからない: {anim['file']}")
    if char.get("colors"):
        apply_material_colors(meshes, char["colors"])

    # yaw（向き回転）> pivot（スケールと足元の原点合わせ）> インポートしたオブジェクト
    yaw = bpy.data.objects.new("yaw", None)
    pivot = bpy.data.objects.new("pivot", None)
    scene.collection.objects.link(yaw)
    scene.collection.objects.link(pivot)
    pivot.parent = yaw
    for o in objs:
        if o.parent is None or o.parent not in objs:
            o.parent = pivot
    # ルートモーションを止める（Mixamo は "In Place" 推奨。それでも動く場合の保険）
    frames = animation_frames(scene, armatures, anim, cfg)
    if max_frames:
        frames = frames[:max_frames]

    scene.frame_set(int(frames[0]))
    height = char.get("height", 1.8)
    lo, hi = mesh_bounds(scene, meshes)
    s = height / max(hi.z - lo.z, 1e-6)
    pivot.scale = (s, s, s)
    bpy.context.view_layer.update()
    lo, hi = mesh_bounds(scene, meshes)
    center = (lo + hi) / 2
    pivot.location = (-center.x, -center.y, -lo.z)
    yaw.rotation_euler = (0, 0, 0)
    setup_camera(scene, height, {**cfg, **char.get("camera", {})})

    facing_offset = char.get("facing_offset_deg", 0)  # モデルが -Y 以外を向いている場合の補正
    dirs = cfg.get("directions", ["down", "left", "right", "up"])
    for d in dirs:
        yaw.rotation_euler = (0, 0, math.radians(DIRECTION_YAW[d] + facing_offset))
        for i, f in enumerate(frames):
            scene.frame_set(int(f), subframe=f - int(f))
            d_out = out / char_id / anim_name
            d_out.mkdir(parents=True, exist_ok=True)
            scene.render.filepath = str(d_out / f"{d}_{i:03d}.png")
            bpy.ops.render.render(write_still=True)
    return {"frames": len(frames), "loop": anim.get("loop", True)}


def main() -> None:
    args = parse_args()
    cfg_path = Path(args.config).resolve()
    cfg = json.loads(cfg_path.read_text(encoding="utf-8"))
    base = cfg_path.parent
    out = Path(args.out)
    for cid, char in cfg["characters"].items():
        if args.character and cid != args.character:
            continue
        char = {**char, "dir": str((base / char.get("dir", ".")).resolve())}
        info = {}
        for aname, anim in char["animations"].items():
            if args.animation and aname != args.animation:
                continue
            print(f"[render] {cid}/{aname}", flush=True)
            info[aname] = render_animation(cid, char, aname, anim, cfg, out, args.max_frames)
        (out / cid).mkdir(parents=True, exist_ok=True)
        (out / cid / "render-info.json").write_text(
            json.dumps({"height": char.get("height", 1.8), "animations": info}, indent=2), encoding="utf-8")


if __name__ == "__main__":
    main()
