import { useEffect, useMemo } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

import { STADDLE_STONE_TEXTURES, STADDLE_STONE_DEFAULT_TEXTURE } from "@/lib/constants";
import { createStaddleStoneGeo } from "@/lib/geometry/bodies/staddle-stone";
import { resolveStaddleStoneGeometry } from "@/lib/geometry/utils/resolve-geometry";
import type { StaddleStoneProps } from "@/types/building";

export default function StaddleStone({
  height: rawHeight,
  depth: rawDepth,
  length: rawLength,
  taperRatio: rawTaperRatio,
  textureKey = STADDLE_STONE_DEFAULT_TEXTURE,
  ...meshProps
}: StaddleStoneProps & JSX.IntrinsicElements["mesh"]) {
  const { height, depth, length, taperRatio } = resolveStaddleStoneGeometry({
    height: rawHeight,
    depth: rawDepth,
    length: rawLength,
    taperRatio: rawTaperRatio,
  });

  const texture = useTexture(STADDLE_STONE_TEXTURES[textureKey]);

  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;

  const { geometry, material } = useMemo(() => {
    const geo = createStaddleStoneGeo(length, height, depth, taperRatio);

    geo.computeBoundingSphere();
    geo.computeBoundingBox();

    return {
      geometry: geo,
      material: new THREE.MeshStandardMaterial({ map: texture }),
    };
  }, [length, height, depth, taperRatio, texture]);

  useEffect(() => {
    return () => {
      geometry.dispose();
      if (material.map && material.map !== texture) {
        material.map.dispose();
      }
      material.dispose();
    };
  }, [geometry, material, texture]);

  return <mesh geometry={geometry} {...meshProps} material={material} />;
}
