import { useEffect, useMemo } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

import { CLADDING_TEXTURES, CLADDING_DEFAULT_TEXTURE } from "@/lib/constants";
import { createCladdingGeo } from "@/lib/geometry/bodies/cladding";
import { resolveCladdingGeometry } from "@/lib/geometry/utils/resolve-geometry";
import type { CladdingProps } from "@/types/building";
import { CLADDING_OVERLAP, CLADDING_TILT } from "@/lib/constants";

export default function Cladding({
  height: rawHeight,
  thickness: rawThickness,
  length: rawLength,
  count: rawCount,
  textureKey = CLADDING_DEFAULT_TEXTURE,
  randomiseTextureOffset = true,
  position,
  ...meshProps
}: CladdingProps & JSX.IntrinsicElements["mesh"]) {
  const { height, thickness, length, count } = resolveCladdingGeometry({
    height: rawHeight,
    thickness: rawThickness,
    length: rawLength,
    count: rawCount,
  });

  const texture = useTexture(CLADDING_TEXTURES[textureKey]);

  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;

  const { geometry, materials } = useMemo(() => {
    const geo = createCladdingGeo(length, height, thickness);
    geo.computeBoundingSphere();
    geo.computeBoundingBox();

    const mats = Array.from({ length: count }, () => {
      const clonedTexture = texture.clone();
      if (randomiseTextureOffset) {
        clonedTexture.offset.set(Math.random(), Math.random());
      }
      return new THREE.MeshStandardMaterial({ map: clonedTexture });
    });

    return { geometry: geo, materials: mats };
  }, [length, height, thickness, texture, count, randomiseTextureOffset]);

  useEffect(() => {
    return () => {
      geometry.dispose();
      materials.forEach((mat) => {
        mat.map?.dispose();
        mat.dispose();
      });
    };
  }, [geometry, materials]);

  const [baseX, baseY, baseZ] = Array.isArray(position)
    ? [position[0] ?? 0, position[1] ?? 0, position[2] ?? 0]
    : [0, 0, 0];

  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <mesh
          key={i}
          geometry={geometry}
          material={materials[i]}
          position={[baseX, baseY + i * height * CLADDING_OVERLAP, baseZ]}
          rotation={[CLADDING_TILT, 0, 0]}
          {...meshProps}
        />
      ))}
    </>
  );
}
