import { useTexture } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";

import { createMainPlateGeo } from "@/lib/geometry/bodies/plate";
import { createBevelEndGeo } from "@/lib/geometry/caps_joints/bevel-cap";
import { createBlockCapGeo } from "@/lib/geometry/caps_joints/block-cap";
import { createHalfLapJoint } from "@/lib/geometry/caps_joints/half-lap-joint";
import {
  clampPlateDimensions,
  clampJointSize,
} from "@/lib/validation/clamp-dimensions";

type PlateProps = {
  length: number;
  height: number;
  depth: number;
  leftEnd?: PlateEndStyle;
  rightEnd?: PlateEndStyle;
  jointSize?: number;
  bevelOffset?: number;
};

type PlateEnd = "left" | "right";
type PlateEndStyle = "top" | "bottom" | "block" | "bevel";

export default function Plate({
  length: rawLength,
  height: rawHeight,
  depth: rawDepth,
  leftEnd = "block",
  rightEnd = "block",
  jointSize: rawJointSize = 0.05,
  bevelOffset = 0.015,
  ...meshProps
}: PlateProps & JSX.IntrinsicElements["mesh"]) {
  const texture = useTexture("/textures/oak_veneer_01_diff_1k.jpg");
  // const texture = useTexture("/textures/uv_texture.jpg");

  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  // Validate/clamp dimensions
  const { length, height, depth } = clampPlateDimensions(
    rawLength,
    rawHeight,
    rawDepth,
  );

  const jointSize = clampJointSize(length, rawJointSize);

  const geometry = useMemo(() => {
    const mainPlateGeo = createMainPlateGeo(length, height, depth, jointSize);

    // Left end cap
    const endPlateLeftGeo = createEndGeo(
      leftEnd,
      height,
      depth,
      jointSize,
      bevelOffset,
    );
    applyEndGeoTransformations(
      endPlateLeftGeo,
      leftEnd,
      "left",
      length,
      height,
      jointSize,
    );

    const endPlateRightGeo = createEndGeo(
      rightEnd,
      height,
      depth,
      jointSize,
      bevelOffset,
    );
    applyEndGeoTransformations(
      endPlateRightGeo,
      rightEnd,
      "right",
      length,
      height,
      jointSize,
    );

    const merged = mergeGeometries([
      mainPlateGeo,
      endPlateLeftGeo,
      endPlateRightGeo,
    ]);

    merged.computeBoundingSphere();
    merged.computeBoundingBox();

    return merged;
  }, [length, height, depth, jointSize, leftEnd, rightEnd, bevelOffset]);

  return (
    <mesh geometry={geometry} {...meshProps}>
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

function createEndGeo(
  style: PlateEndStyle,
  height: number,
  depth: number,
  jointSize: number,
  bevelOffset: number,
): THREE.BufferGeometry {
  switch (style) {
    case "block":
      return createBlockCapGeo(height, jointSize, depth);
    case "top":
    case "bottom":
      return createHalfLapJoint(height, jointSize, depth);
    case "bevel":
      return createBevelEndGeo(height, jointSize, depth, bevelOffset);
  }
}

function applyEndGeoTransformations(
  geometry: THREE.BufferGeometry,
  style: PlateEndStyle,
  end: PlateEnd,
  length: number,
  height: number,
  jointSize: number,
) {
  switch (style) {
    case "block":
      if (end === "left") {
        geometry.rotateZ(Math.PI / 2);
        geometry.translate(-length / 2 + jointSize, height / 2, 0);
      } else {
        geometry.rotateZ(-Math.PI / 2);
        geometry.translate(length / 2 - jointSize, height / 2, 0);
      }
      break;
    case "top":
      if (end === "left") {
        geometry.rotateY(-Math.PI / 2);
        geometry.rotateZ(Math.PI / 2);
        geometry.translate(-length / 2 + jointSize, height / 2, 0);
      } else {
        geometry.rotateY(Math.PI / 2);
        geometry.rotateZ(-Math.PI / 2);
        geometry.translate(length / 2 - jointSize, height / 2, 0);
      }
      break;
    case "bottom":
      if (end === "left") {
        geometry.rotateY(Math.PI / 2);
        geometry.rotateZ(Math.PI / 2);
        geometry.translate(-length / 2 + jointSize, height / 2, 0);
      } else {
        geometry.rotateY(-Math.PI / 2);
        geometry.rotateZ(-Math.PI / 2);
        geometry.translate(length / 2 - jointSize, height / 2, 0);
      }
      break;
    case "bevel":
      if (end === "left") {
        geometry.rotateZ(Math.PI / 2);
        geometry.translate(-length / 2 + jointSize, height / 2, 0);
      } else {
        geometry.rotateZ(-Math.PI / 2);
        geometry.translate(length / 2 - jointSize, height / 2, 0);
      }
      break;
  }
}

function createBottomJointGeo(
  depth: number,
  height: number,
  jointSize: number,
) {
  const geometry = new THREE.BufferGeometry();

  return geometry;
}
