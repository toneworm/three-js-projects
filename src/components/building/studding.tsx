import { useEffect, useMemo } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

import {
  STUDDING_DEFAULT_BOTTOM_PLUMB_CUT_ANGLE,
  STUDDING_DEFAULT_TOP_PLUMB_CUT_ANGLE,
} from "@/lib/constants";
import { createStuddingGeo } from "@/lib/geometry/bodies/studding";
import { resolveStuddingGeometry } from "@/lib/geometry/utils/resolve-geometry";
import type { StuddingProps } from "@/types/building";

export default function Studding({
  width: rawWidth,
  height: rawHeight,
  thickness: rawThickness,
  bottomPlumbCutAngle:
    rawBottomPlumbCutAngle = STUDDING_DEFAULT_BOTTOM_PLUMB_CUT_ANGLE,
  topPlumbCutAngle: rawTopPlumbCutAngle = STUDDING_DEFAULT_TOP_PLUMB_CUT_ANGLE,
  randomiseTextureOffset = true,
  ...meshProps
}: StuddingProps & JSX.IntrinsicElements["mesh"]) {
  const texture = useTexture("/textures/oak_texture_1k.png");

  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;

  const textureOffset = useMemo(
    () => ({
      x: randomiseTextureOffset ? Math.random() : 0,
      y: randomiseTextureOffset ? Math.random() : 0,
    }),
    [randomiseTextureOffset],
  );

  const { width, height, thickness, bottomPlumbCutAngle, topPlumbCutAngle } =
    resolveStuddingGeometry({
      width: rawWidth,
      height: rawHeight,
      thickness: rawThickness,
      bottomPlumbCutAngle: rawBottomPlumbCutAngle,
      topPlumbCutAngle: rawTopPlumbCutAngle,
    });

  const { geometry, material } = useMemo(() => {
    const geo = createStuddingGeo(
      width,
      height,
      thickness,
      bottomPlumbCutAngle,
      topPlumbCutAngle,
    );

    geo.computeBoundingSphere();
    geo.computeBoundingBox();

    const clonedTexture = texture.clone();
    if (randomiseTextureOffset) {
      clonedTexture.offset.set(textureOffset.x, textureOffset.y);
    }

    return {
      geometry: geo,
      material: new THREE.MeshStandardMaterial({ map: clonedTexture }),
    };
  }, [
    width,
    height,
    thickness,
    bottomPlumbCutAngle,
    topPlumbCutAngle,
    randomiseTextureOffset,
    textureOffset,
    texture,
  ]);

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
