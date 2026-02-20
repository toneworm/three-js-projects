import { useEffect, useMemo } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

import { CLADDING_TEXTURES, CLADDING_DEFAULT_MATERIAL } from "@/lib/constants";
import { createCladdingGeo } from "@/lib/geometry/bodies/cladding";
import { resolveCladdingGeometry } from "@/lib/geometry/utils/resolve-geometry";
import type { CladdingProps } from "@/types/building";

export default function Cladding({
  height: rawHeight,
  thickness: rawThickness,
  length: rawLength,
  count: rawCount,
  textureKey = CLADDING_DEFAULT_MATERIAL,
  ...meshProps
}: CladdingProps & JSX.IntrinsicElements["mesh"]) {
  const { height, thickness, length, count } = resolveCladdingGeometry({
    height: rawHeight,
    thickness: rawThickness,
    length: rawLength,
    count: rawCount,
  });

  console.log("Cladding count:", count);

  console.log(textureKey);

  const texture = useTexture(CLADDING_TEXTURES[textureKey]);

  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;

  const { geometry, material } = useMemo(() => {
    const geo = createCladdingGeo(length, height, thickness);

    geo.computeBoundingSphere();
    geo.computeBoundingBox();

    return {
      geometry: geo,
      material: new THREE.MeshStandardMaterial({ map: texture }),
    };
  }, [length, height, thickness, texture]);

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
