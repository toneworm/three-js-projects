// components/building/Base.tsx
"use client";

import { useEffect, useMemo } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

import {
  BASE_DEFAULT_DEPTH,
  BASE_DEPTH_MAX,
  BASE_DEPTH_MIN,
  BASE_HEIGHT,
  BASE_WIDTH_MAX,
  BASE_WIDTH_MIN,
} from "@/lib/constants";
import type { BaseProps } from "@/types/building";

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export default function Base({
  width: rawWidth,
  depth: rawDepth,
  ...meshProps
}: BaseProps & JSX.IntrinsicElements["mesh"]) {
  const diffuse = useTexture("/textures/brushed_concrete_rough_1k.jpg");

  diffuse.wrapS = diffuse.wrapT = THREE.RepeatWrapping;
  diffuse.colorSpace = THREE.SRGBColorSpace;

  const width = clamp(rawWidth, BASE_WIDTH_MIN, BASE_WIDTH_MAX);
  const depth = clamp(rawDepth ?? BASE_DEFAULT_DEPTH, BASE_DEPTH_MIN, BASE_DEPTH_MAX);
  const height = BASE_HEIGHT;

  // shrink texture down a bit
  diffuse.repeat.set(width / 2, depth / 2);

  const { geometry, material } = useMemo(() => {
    const geo = new THREE.BoxGeometry(width, height, depth);
    geo.translate(0, -height / 2, 0);

    const mat = new THREE.MeshStandardMaterial({
      map: diffuse,
      roughness: 0.9,
      metalness: 0,
    });

    return { geometry: geo, material: mat };
  }, [width, diffuse]);

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  return <mesh geometry={geometry} material={material} {...meshProps} />;
}
