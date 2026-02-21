// components/building/KneeBrace.tsx
"use client";

import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";

import {
  KNEE_BRACE_DEFAULT_SCALE,
  KNEE_BRACE_SCALE_MAX,
  KNEE_BRACE_SCALE_MIN,
} from "@/lib/constants";
import type { KneeBraceProps } from "@/types/building";

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export default function KneeBrace({
  scale: rawScale = KNEE_BRACE_DEFAULT_SCALE,
  ...groupProps
}: KneeBraceProps & JSX.IntrinsicElements["group"]) {
  const { scene } = useGLTF("/models/knee_brace.glb");

  const clonedScene = useMemo(() => scene.clone(), [scene]);

  const scale = clamp(rawScale, KNEE_BRACE_SCALE_MIN, KNEE_BRACE_SCALE_MAX);

  return (
    <primitive
      object={clonedScene}
      scale={[scale, scale, scale]}
      {...groupProps}
    />
  );
}

useGLTF.preload("/models/knee_brace.glb");
