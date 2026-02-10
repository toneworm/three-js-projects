import { useTexture } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";

import { createMainRafterGeo } from "@/lib/geometry/bodies/rafter";
import { clampRafterDimensions } from "@/lib/validation/clamp-dimensions";
import { resolveRafterGeometry } from "@/lib/geometry/utils/resolve-rafter-geometry";

type WithRunAndRise = { run: number; rise: number; angle?: never };
type WithRunAndAngle = { run: number; angle: number; rise?: never };
type WithRiseAndAngle = { rise: number; angle: number; run?: never };

export type RafterGeometryProps =
  | WithRunAndRise
  | WithRunAndAngle
  | WithRiseAndAngle;

type RafterBaseProps = {
  height: number;
  depth: number;
  cheekAngle?: number;
};

export default function Rafter({
  height: rawHeight,
  depth: rawDepth,
  cheekAngle: rawCheekAngle = 0,
  rise: rawRise,
  run: rawRun,
  angle: rawAngle,
  ...meshProps
}: RafterBaseProps & RafterGeometryProps & JSX.IntrinsicElements["mesh"]) {
  // const texture = useTexture("/textures/oak_veneer_01_diff_1k.jpg");
  const texture = useTexture("/textures/uv_texture_color.webp");
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;

  // Validate/clamp dimensions
  const { height, depth, cheekAngle, clampedRise, clampedRun, clampedAngle } =
    clampRafterDimensions(
      rawHeight,
      rawDepth,
      rawCheekAngle,
      rawRise,
      rawRun,
      rawAngle,
    );

  const { run, rise, angle, length } = resolveRafterGeometry({
    run: clampedRun,
    rise: clampedRise,
    angle: clampedAngle,
  } as RafterGeometryProps);

  // console.log({ run, rise, angle, length });

  const { geometry, materials } = useMemo(() => {
    // Main rafter
    const mainRafterGeo = createMainRafterGeo(
      height,
      depth,
      angle,
      cheekAngle,
      run,
      rise,
      length,
    );
    // mainRafterGeo.rotateZ(angle);

    // prettier-ignore
    // biome-ignore reason: want to switch these on and off easily
    const merged = mergeGeometries([
      mainRafterGeo,
    ]);
    merged.computeBoundingSphere();
    merged.computeBoundingBox();

    // materials
    // clear and set new groups
    merged.clearGroups();
    merged.addGroup(0, mainRafterGeo.attributes.position.count, 0);
    // merged.addGroup(
    //   mainRafterGeo.attributes.position.count,
    //   topPostGeo.attributes.position.count,
    //   1,
    // );
    // merged.addGroup(
    //   mainRafterGeo.attributes.position.count +
    //     topPostGeo.attributes.position.count,
    //   bottomPostGeo.attributes.position.count,
    //   2,
    // );

    const bodyTexture = texture.clone();

    return {
      geometry: merged,
      materials: [new THREE.MeshStandardMaterial({ map: bodyTexture })],
    };
  }, [length, height, depth, texture, angle, rise, run, cheekAngle]);

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
