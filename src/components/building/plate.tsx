import { useTexture } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";

import { createMainPlateGeo } from "@/lib/geometry/bodies/plate";
import { createBevelEndGeo } from "@/lib/geometry/caps_joints/bevel-cap";
import { createBlockCapGeo } from "@/lib/geometry/caps_joints/block-cap";
import { createHalfLapJoint } from "@/lib/geometry/caps_joints/half-lap-joint";
import {
  clampPlateDimensions,
  clampEndSize,
} from "@/lib/validation/clamp-dimensions";
import { type PlateProps, PlateEndStyle, PlateEnd } from "@/types/building";

export default function Plate({
  length: rawLength,
  height: rawHeight,
  depth: rawDepth,
  leftEnd = "block",
  rightEnd = "block",
  jointSize: rawJointSize = 0.05,
  bevelOffset = 0.015,
  randomiseTextureOffset = true,
  ...meshProps
}: PlateProps & JSX.IntrinsicElements["mesh"]) {
  const texture = useTexture("/textures/oak_texture_1k.png");
  // const texture = useTexture("/textures/uv_texture_color.webp");

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

  // Validate/clamp dimensions
  const { length, height, depth } = clampPlateDimensions(
    rawLength,
    rawHeight,
    rawDepth,
  );

  const jointSize = clampEndSize(length, rawJointSize);

  const { geometry, materials } = useMemo(() => {
    // geometry
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

    // materials

    // clear groups
    merged.clearGroups();
    merged.addGroup(0, mainPlateGeo.attributes.position.count, 0);
    merged.addGroup(
      mainPlateGeo.attributes.position.count,
      endPlateLeftGeo.attributes.position.count,
      1,
    );
    merged.addGroup(
      mainPlateGeo.attributes.position.count +
        endPlateLeftGeo.attributes.position.count,
      endPlateRightGeo.attributes.position.count,
      2,
    );

    const bodyTexture = texture.clone();

    const leftCapTexture = applyEndTextures(
      texture,
      leftEnd,
      "left",
      length,
      height,
      depth,
      jointSize,
    );

    const rightCapTexture = applyEndTextures(
      texture,
      rightEnd,
      "right",
      length,
      height,
      depth,
      jointSize,
    );

    // apply random offsets to texture
    if (randomiseTextureOffset) {
      bodyTexture.offset.set(textureOffset.x, textureOffset.y);
      leftCapTexture.offset.set(
        textureOffset.x + leftCapTexture.offset.x,
        textureOffset.y + leftCapTexture.offset.y,
      );
      rightCapTexture.offset.set(
        textureOffset.x + rightCapTexture.offset.x,
        textureOffset.y + rightCapTexture.offset.y,
      );
    }

    return {
      geometry: merged,
      materials: [
        new THREE.MeshStandardMaterial({ map: bodyTexture }),
        new THREE.MeshStandardMaterial({ map: leftCapTexture }),
        new THREE.MeshStandardMaterial({ map: rightCapTexture }),
      ],
    };
  }, [
    length,
    height,
    depth,
    jointSize,
    leftEnd,
    rightEnd,
    bevelOffset,
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
    // TODO: lots of repetition here can probs be done better
    case "block":
      if (end === "left") {
        geometry.rotateZ(Math.PI / 2);
        geometry.translate(-length / 2 + jointSize, height / 2, 0);
      } else {
        geometry.rotateY(Math.PI * 2);
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
        geometry.rotateY(Math.PI / 2);
        geometry.rotateZ(Math.PI / 2);
        geometry.translate(-length / 2 + jointSize, height / 2, 0);
      } else {
        geometry.rotateZ(-Math.PI / 2);
        geometry.translate(length / 2 - jointSize, height / 2, 0);
      }
      break;
  }
}

function applyEndTextures(
  texture: THREE.Texture,
  style: PlateEndStyle,
  end: PlateEnd,
  length: number,
  height: number,
  depth: number,
  jointSize: number,
): THREE.Texture {
  const clonedTexture = texture.clone();

  const circumference = 2 * height + 2 * depth;

  switch (style) {
    case "block":
      if (end === "left") {
        clonedTexture.offset.set(
          -height / circumference,
          ((length - jointSize * 2) / circumference) % 1,
        );
        // console.log({ length, height, depth, jointSize, circumference });

        // console.log(0.167 * circumference);
        // clonedTexture.offset.set(-0.167, 0.167);
      } else {
        clonedTexture.rotation = Math.PI;
      }
      break;
    case "top":
      if (end === "left") {
        clonedTexture.offset.set(
          0.5,
          ((length - jointSize * 2) / circumference) % 1,
        );
      } else {
        clonedTexture.rotation = Math.PI;
        clonedTexture.offset.set(0.75, 1);
      }
      break;
    case "bottom":
      if (end === "left") {
        clonedTexture.offset.set(
          0,
          ((length - jointSize * 2) / circumference) % 1,
        );
      } else {
        clonedTexture.rotation = Math.PI;
      }
      break;
    case "bevel":
      if (end === "left") {
        clonedTexture.offset.set(
          0,
          ((length - jointSize * 2) / circumference) % 1,
        );
      } else {
        clonedTexture.rotation = Math.PI;
      }
      break;
  }

  return clonedTexture;
}
