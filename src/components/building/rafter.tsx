import { useEffect, useMemo } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";

import {
  RAFTER_DEFAULT_CHEEK_ANGLE,
  RAFTER_DEFAULT_MOUTH_SIZE,
  RAFTER_DEFAULT_UV_SCALE,
} from "@/lib/constants";
import { createMainRafterGeo } from "@/lib/geometry/bodies/rafter";
import { createBirdsMouthEndGeo } from "@/lib/geometry/caps-joints/birds-mouth-cap";
import { applyPlanarUVs } from "@/lib/geometry/utils/uv-utils";
import { resolveRafterGeometry } from "@/lib/geometry/utils/resolve-geometry";
import type { RafterProps, ResolvedRafterGeometry } from "@/types/building";

export default function Rafter({
  height: rawHeight,
  depth: rawDepth,
  cheekAngle: rawCheekAngle = RAFTER_DEFAULT_CHEEK_ANGLE,
  mouthSize: rawMouthSize = RAFTER_DEFAULT_MOUTH_SIZE,
  rise: rawRise,
  run: rawRun,
  angle: rawAngle,
  randomiseTextureOffset = true,
  ...meshProps
}: RafterProps & JSX.IntrinsicElements["mesh"]) {
  const texture = useTexture("/textures/oak_texture_1k.png");
  // const texture = useTexture("/textures/uv_texture_color.webp");

  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;

  const textureOffset = useMemo(
    () => ({
      x: randomiseTextureOffset ? Math.random() : 0,
      y: randomiseTextureOffset ? Math.random() : 0,
    }),
    [randomiseTextureOffset],
  );

  const { run, rise, angle, depth, height, cheekAngle, mouthSize } =
    resolveRafterGeometry({
      run: rawRun,
      rise: rawRise,
      angle: rawAngle,
      depth: rawDepth,
      height: rawHeight,
      cheekAngle: rawCheekAngle,
      mouthSize: rawMouthSize,
    } as ResolvedRafterGeometry);

  const { geometry, materials } = useMemo(() => {
    // Main rafter
    const mainRafterGeo = createMainRafterGeo(
      height,
      depth,
      cheekAngle,
      run,
      rise,
    );

    const birdsMouthGeo = createBirdsMouthEndGeo(
      mouthSize,
      height,
      depth,
      run,
      rise,
    );
    birdsMouthGeo.translate(-mouthSize, 0, 0);

    // prettier-ignore
    // biome-ignore format: want to switch these on and off easily
    const merged = mergeGeometries([
      mainRafterGeo,
      birdsMouthGeo,
    ]);

    applyPlanarUVs(
      merged,
      RAFTER_DEFAULT_UV_SCALE,
      new THREE.Vector3(Math.cos(angle), Math.sin(angle), 0),
      { side: { flipV: true, swapUV: true } },
    );

    merged.computeBoundingSphere();
    merged.computeBoundingBox();

    // materials
    // clear and set new groups
    merged.clearGroups();
    merged.addGroup(0, mainRafterGeo.attributes.position.count, 0);
    merged.addGroup(
      mainRafterGeo.attributes.position.count,
      birdsMouthGeo.attributes.position.count,
      1,
    );

    const bodyTexture = texture.clone();
    const birdsMouthTexture = texture.clone();

    // random offsets to vary the grain
    if (randomiseTextureOffset) {
      bodyTexture.offset.set(textureOffset.x, textureOffset.y);
      birdsMouthTexture.offset.set(textureOffset.x, textureOffset.y);
    }

    return {
      geometry: merged,
      materials: [
        new THREE.MeshStandardMaterial({ map: bodyTexture }),
        new THREE.MeshStandardMaterial({ map: birdsMouthTexture }),
      ],
    };
  }, [
    height,
    depth,
    angle,
    rise,
    run,
    cheekAngle,
    mouthSize,
    randomiseTextureOffset,
    textureOffset,
    texture,
  ]);

  // dispose of cloned textures on updates
  useEffect(() => {
    return () => {
      geometry.dispose();
      materials.forEach((mat) => {
        if (mat.map && mat.map !== texture) {
          mat.map.dispose();
        }
        mat.dispose();
      });
    };
  }, [geometry, materials, texture]);

  return <mesh geometry={geometry} {...meshProps} material={materials} />;
}
