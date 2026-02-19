// components/building/Plinth.tsx
"use client";

import { useEffect, useMemo } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

import { createMainPlinthGeo } from "@/lib/geometry/bodies/plinth";
import { resolvePlinthGeometry } from "@/lib/geometry/utils/resolve-geometry";
import { applyBrickUVs } from "@/lib/geometry/utils/uv-utils";
import type { PlinthProps } from "@/types/building";

export default function Plinth({
  width: rawWidth,
  randomiseTextureOffset = false,
  ...meshProps
}: PlinthProps & JSX.IntrinsicElements["mesh"]) {
  const diffuse = useTexture("/textures/red_brick_diff_1k.jpg");
  const normal = useTexture("/textures/red_brick_nor_gl_1k.jpg");
  const arm = useTexture("/textures/red_brick_arm_1k.jpg");

  // Diffuse is colour data — needs sRGB
  // Normal and ARM are data maps — LinearSRGBColorSpace (no gamma correction)
  for (const tex of [diffuse, normal, arm]) {
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  }
  diffuse.colorSpace = THREE.SRGBColorSpace;
  normal.colorSpace = THREE.LinearSRGBColorSpace;
  arm.colorSpace = THREE.LinearSRGBColorSpace;

  const textureOffset = useMemo(
    () => ({
      x: randomiseTextureOffset ? Math.random() : 0,
      y: randomiseTextureOffset ? Math.random() : 0,
    }),
    [randomiseTextureOffset],
  );

  const { width, depth, thickness, height } = resolvePlinthGeometry({
    width: rawWidth,
  });

  const { geometry, materials } = useMemo(() => {
    const { geometry, sideVertexCount, topVertexCount } = createMainPlinthGeo(
      width,
      depth,
      thickness,
      height,
    );

    applyBrickUVs(geometry);

    // aoMap requires uv1 — just mirror the same UVs
    geometry.setAttribute("uv1", geometry.attributes.uv);

    geometry.computeBoundingSphere();
    geometry.computeBoundingBox();

    geometry.clearGroups();
    geometry.addGroup(0, sideVertexCount, 0);
    geometry.addGroup(sideVertexCount, topVertexCount, 1);

    const sideDiffuse = diffuse.clone();
    const sideNormal = normal.clone();
    const sideArm = arm.clone();

    if (randomiseTextureOffset) {
      for (const tex of [sideDiffuse, sideNormal, sideArm]) {
        tex.offset.set(textureOffset.x, textureOffset.y);
      }
    }

    return {
      geometry,
      materials: [
        new THREE.MeshStandardMaterial({
          map: sideDiffuse,
          normalMap: sideNormal,
          normalScale: new THREE.Vector2(1, 1),
          aoMap: sideArm,
          roughnessMap: sideArm,
          metalnessMap: sideArm,
          roughness: 1,
          metalness: 0,
          aoMapIntensity: 1,
        }),
        new THREE.MeshStandardMaterial({
          color: new THREE.Color(0x522a1a),
          roughness: 0.9,
          metalness: 0,
        }),
      ],
    };
  }, [
    width,
    depth,
    thickness,
    height,
    randomiseTextureOffset,
    textureOffset,
    diffuse,
    normal,
    arm,
  ]);

  useEffect(() => {
    return () => {
      geometry.dispose();
      materials.forEach((mat) => {
        for (const map of [mat.map, mat.normalMap, mat.aoMap]) {
          if (map && map !== diffuse && map !== normal && map !== arm) {
            map.dispose();
          }
        }
        mat.dispose();
      });
    };
  }, [geometry, materials, diffuse, normal, arm]);

  return <mesh geometry={geometry} material={materials} {...meshProps} />;
}
