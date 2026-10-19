"""パイプライン動作確認用の仮モデル（ボーン付き人型 + 剣）を作り、idle / attack を別 GLB に出力する。

    python make_test_model.py --out samples/test-knight
"""
from __future__ import annotations

import argparse
import math
import sys
from pathlib import Path

import bpy


def mat(name, rgb):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    m.node_tree.nodes["Principled BSDF"].inputs["Base Color"].default_value = (*rgb, 1)
    return m


def part(name, kind, loc, scale, bone, arm, material):
    if kind == "sphere":
        bpy.ops.mesh.primitive_uv_sphere_add(location=loc, segments=16, ring_count=8)
    else:
        bpy.ops.mesh.primitive_cube_add(location=loc)
    o = bpy.context.active_object
    o.name = name
    o.scale = scale
    bpy.ops.object.transform_apply(scale=True)
    o.data.materials.append(material)
    vg = o.vertex_groups.new(name=bone)
    vg.add([v.index for v in o.data.vertices], 1.0, "REPLACE")
    o.parent = arm
    mod = o.modifiers.new("arm", "ARMATURE")
    mod.object = arm
    return o


def build() -> bpy.types.Object:
    bpy.ops.object.armature_add(location=(0, 0, 0))
    arm = bpy.context.active_object
    arm.name = "Armature"
    bpy.ops.object.mode_set(mode="EDIT")
    eb = arm.data.edit_bones
    eb.remove(eb[0])

    def bone(name, head, tail, parent=None):
        b = eb.new(name)
        b.head, b.tail = head, tail
        if parent:
            b.parent = eb[parent]
        return b

    bone("hips", (0, 0, 0.9), (0, 0, 1.0))
    bone("spine", (0, 0, 1.0), (0, 0, 1.4), "hips")
    bone("head", (0, 0, 1.4), (0, 0, 1.7), "spine")
    bone("armL", (0.25, 0, 1.35), (0.25, 0, 0.95), "spine")
    bone("armR", (-0.25, 0, 1.35), (-0.25, 0, 0.95), "spine")
    bone("legL", (0.12, 0, 0.9), (0.12, 0, 0.0), "hips")
    bone("legR", (-0.12, 0, 0.9), (-0.12, 0, 0.0), "hips")
    bpy.ops.object.mode_set(mode="OBJECT")

    body, skin, metal = mat("Armor", (0.2, 0.35, 0.8)), mat("Skin", (0.9, 0.7, 0.55)), mat("Metal", (0.8, 0.8, 0.85))
    part("torso", "cube", (0, 0, 1.2), (0.22, 0.13, 0.28), "spine", arm, body)
    part("hips", "cube", (0, 0, 0.95), (0.2, 0.12, 0.1), "hips", arm, body)
    part("head", "sphere", (0, 0, 1.58), (0.13, 0.13, 0.14), "head", arm, skin)
    part("nose", "cube", (0, -0.13, 1.56), (0.03, 0.03, 0.03), "head", arm, skin)  # -Y = 正面の目印
    part("armL", "cube", (0.3, 0, 1.15), (0.05, 0.05, 0.22), "armL", arm, skin)
    part("armR", "cube", (-0.3, 0, 1.15), (0.05, 0.05, 0.22), "armR", arm, skin)
    part("sword", "cube", (-0.3, -0.25, 1.0), (0.025, 0.3, 0.025), "armR", arm, metal)
    part("legL", "cube", (0.12, 0, 0.45), (0.07, 0.07, 0.45), "legL", arm, body)
    part("legR", "cube", (-0.12, 0, 0.45), (0.07, 0.07, 0.45), "legR", arm, body)
    return arm


def key(arm, bone, frame, x=0.0, y=0.0, z=0.0):
    pb = arm.pose.bones[bone]
    pb.rotation_mode = "XYZ"
    pb.rotation_euler = (math.radians(x), math.radians(y), math.radians(z))
    pb.keyframe_insert("rotation_euler", frame=frame)


def make_action(arm, name, keys, end):
    act = bpy.data.actions.new(name)
    arm.animation_data_create()
    arm.animation_data.action = act
    bpy.context.view_layer.objects.active = arm
    bpy.ops.object.mode_set(mode="POSE")
    for frame, poses in keys:
        for b, rot in poses.items():
            key(arm, b, frame, *rot)
    bpy.ops.object.mode_set(mode="OBJECT")
    act.frame_start, act.frame_end = 1, end
    return act


def export(arm, act, path: Path):
    arm.animation_data.action = act
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.export_scene.gltf(filepath=str(path), export_format="GLB", export_animation_mode="ACTIVE_ACTIONS",
                              export_apply=False)


def main():
    argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else sys.argv[1:]
    p = argparse.ArgumentParser()
    p.add_argument("--out", required=True)
    out = Path(p.parse_args(argv).out)
    out.mkdir(parents=True, exist_ok=True)

    bpy.ops.wm.read_factory_settings(use_empty=True)
    arm = build()

    # idle: 呼吸（30f ループ）
    idle = make_action(arm, "idle", [
        (1, {"spine": (0, 0, 0), "armL": (0, 0, 0), "armR": (0, 0, 0)}),
        (15, {"spine": (4, 0, 0), "armL": (0, 0, -5), "armR": (0, 0, 5)}),
        (31, {"spine": (0, 0, 0), "armL": (0, 0, 0), "armR": (0, 0, 0)}),
    ], 31)
    # attack: 振りかぶり → 斬り下ろし → 戻り（24f）
    attack = make_action(arm, "attack", [
        (1, {"armR": (0, 0, 0), "spine": (0, 0, 0), "hips": (0, 0, 0)}),
        (7, {"armR": (-140, 0, 0), "spine": (-8, 0, 15), "hips": (0, 0, 10)}),
        (12, {"armR": (30, 0, 0), "spine": (12, 0, -20), "hips": (0, 0, -15)}),
        (24, {"armR": (0, 0, 0), "spine": (0, 0, 0), "hips": (0, 0, 0)}),
    ], 24)
    for act in (idle, attack):
        export(arm, act, out / f"{act.name}.glb")
        print("wrote", out / f"{act.name}.glb")


if __name__ == "__main__":
    main()
