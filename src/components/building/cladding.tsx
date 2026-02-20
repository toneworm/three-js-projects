import { useEffect, useMemo } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

import { createCladdingGeo } from "@/lib/geometry/bodies/cladding";
import { resolveCladdingGeometry } from "@/lib/geometry/utils/resolve-geometry";
import type { CladdingProps } from "@/types/building";

export default function Cladding({
  height: rawHeight,
  thickness: rawThickness,
  length: rawLength,
  count: rawCount,
  materialUrl: rawMaterialUrl,
  ...meshProps
}: CladdingProps & JSX.IntrinsicElements["mesh"]) {
  const { height, thickness, length, count, materialUrl } =
    resolveCladdingGeometry({
      height: rawHeight,
      thickness: rawThickness,
      length: rawLength,
      count: rawCount,
      materialUrl: rawMaterialUrl,
    });

  console.log("Cladding count:", count);

  const texture = useTexture(`/textures/${materialUrl}`);

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
