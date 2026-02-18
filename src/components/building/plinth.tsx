import { useEffect, useMemo } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

import { createMainPlinthGeo } from "@/lib/geometry/bodies/plinth";
import { resolvePlinthGeometry } from "@/lib/geometry/utils/resolve-geometry";
import type { PlinthProps } from "@/types/building";

export default function Plinth({
  width: rawWidth,
  randomiseTextureOffset = false,
  ...meshProps
}: PlinthProps & JSX.IntrinsicElements["mesh"]) {
  const texture = useTexture("/textures/oak_texture_1k.png");

  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;

  const textureOffset = useMemo(
    () => ({
      x: randomiseTextureOffset ? Math.random() : 0,
      y: randomiseTextureOffset ? Math.random() : 0,
    }),
    [randomiseTextureOffset],
  );

  // Resolve Geometry
  const { width, depth, thickness, height } = resolvePlinthGeometry({
    width: rawWidth,
  });

  const { geometry, material } = useMemo(() => {
    const plinthGeo = createMainPlinthGeo(width, depth, thickness, height);

    plinthGeo.computeBoundingSphere();
    plinthGeo.computeBoundingBox();

    const bodyTexture = texture.clone();

    if (randomiseTextureOffset) {
      bodyTexture.offset.set(textureOffset.x, textureOffset.y);
    }

    return {
      geometry: plinthGeo,
      material: new THREE.MeshStandardMaterial({ map: bodyTexture }),
    };
  }, [width, depth, thickness, height, randomiseTextureOffset, textureOffset, texture]);

  // Dispose of geometry and material on updates
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
