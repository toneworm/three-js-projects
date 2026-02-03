import { useTexture } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";

import { createMainPostGeo } from "@/lib/geometry/bodies/post";
import { createBevelEndGeo } from "@/lib/geometry/caps/bevel-cap";
import { createTenonEndGeo } from "@/lib/geometry/caps/tenon-cap";

import {
  clampTenonDimensions,
  clampPostDimensions,
} from "@/lib/validation/clamp-dimensions";
import { createBlockCapGeo } from "@/lib/geometry/caps/block-cap";

type PostProps = {
  width: number;
  height: number;
  depth: number;
  showTenon?: boolean;
  showBevel?: boolean;
  endSize?: number;
  bevelOffset?: number;
  tenonHeight?: number;
  tenonWidth?: number;
  tenonDepth?: number;
};

export default function Post({
  width: rawWidth,
  height: rawHeight,
  depth: rawDepth,
  showTenon = false,
  showBevel = false,
  endSize = 0.15,
  bevelOffset = 0.015,
  tenonHeight = 0.1,
  tenonWidth: rawTenonWidth = 0.1,
  tenonDepth: rawTenonDepth = 0.1,
  ...meshProps
}: PostProps & JSX.IntrinsicElements["mesh"]) {
  const texture = useTexture("/textures/oak_veneer_01_diff_1k.jpg");
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  // Validate/clamp dimensions
  const { width, height, depth } = clampPostDimensions(
    rawWidth,
    rawHeight,
    rawDepth,
  );

  const { tenonWidth, tenonDepth } = clampTenonDimensions(
    width,
    depth,
    rawTenonWidth,
    rawTenonDepth,
    0.8, // Max 80% of post dimensions
  );

  const geometry = useMemo(() => {
    const geometries: THREE.BufferGeometry[] = [];

    // Main post body
    const mainPostGeo = createMainPostGeo(width, height, depth, endSize);

    // Bottom cap (bevel or block)
    const bottomPostGeo = showBevel
      ? createBevelEndGeo(width, endSize, depth, bevelOffset)
      : createBlockCapGeo(width, endSize, depth);

    // Top cap (tenon or block)
    const topPostGeo = showTenon
      ? createTenonEndGeo(
          width,
          endSize,
          depth,
          tenonHeight,
          tenonWidth,
          tenonDepth,
        )
      : showBevel
        ? createBlockCapGeo(width, endSize, depth)
        : bottomPostGeo.clone();
    topPostGeo.translate(0, height, 0);

    // Bottom cap needs flipping if it's a block end
    if (!showBevel) {
      bottomPostGeo.rotateZ(Math.PI);
      bottomPostGeo.translate(0, endSize, 0);
    }

    // prettier-ignore
    // biome-ignore reason: want to switch these on and off easily
    const merged = mergeGeometries([
      mainPostGeo,
      topPostGeo,
      bottomPostGeo
    ]);
    merged.computeBoundingSphere();
    merged.computeBoundingBox();

    return merged;
  }, [
    width,
    height,
    depth,
    endSize,
    bevelOffset,
    tenonHeight,
    tenonWidth,
    tenonDepth,
    showTenon,
    showBevel,
  ]);

  return (
    <mesh geometry={geometry} {...meshProps}>
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}
