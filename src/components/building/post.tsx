import { useEffect, useMemo } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";

import {
  POST_DEFAULT_BEVEL_OFFSET,
  POST_DEFAULT_END_SIZE,
  POST_DEFAULT_TENON_DEPTH,
  POST_DEFAULT_TENON_HEIGHT,
  POST_DEFAULT_TENON_WIDTH,
  TENON_MAX_RATIO,
} from "@/lib/constants";
import { createMainPostGeo } from "@/lib/geometry/bodies/post";
import { createBevelEndGeo } from "@/lib/geometry/caps_joints/bevel-cap";
import { createBlockCapGeo } from "@/lib/geometry/caps_joints/block-cap";
import { createTenonEndGeo } from "@/lib/geometry/caps_joints/tenon-cap";
import {
  clampEndSize,
  clampPostDimensions,
  clampTenonDimensions,
} from "@/lib/validation/clamp-dimensions";
import type { PostEnd, PostEndStyle, PostProps } from "@/types/building";

export default function Post({
  width: rawWidth,
  height: rawHeight,
  depth: rawDepth,
  topEnd = "block",
  bottomEnd = "block",
  endSize: rawEndSize = POST_DEFAULT_END_SIZE,
  bevelOffset = POST_DEFAULT_BEVEL_OFFSET,
  tenonHeight: rawTenonHeight = POST_DEFAULT_TENON_HEIGHT,
  tenonWidth: rawTenonWidth = POST_DEFAULT_TENON_WIDTH,
  tenonDepth: rawTenonDepth = POST_DEFAULT_TENON_DEPTH,
  randomiseTextureOffset = true,
  ...meshProps
}: PostProps & JSX.IntrinsicElements["mesh"]) {
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

  // Validate/clamp dimensions
  const { width, height, depth } = clampPostDimensions(
    rawWidth,
    rawHeight,
    rawDepth,
  );

  const endSize = clampEndSize(height, rawEndSize);

  const { tenonWidth, tenonDepth, tenonHeight } = clampTenonDimensions(
    width,
    depth,
    endSize,
    rawTenonWidth,
    rawTenonDepth,
    rawTenonHeight,
    TENON_MAX_RATIO,
  );

  const { geometry, materials } = useMemo(() => {
    // Main post body
    const mainPostGeo = createMainPostGeo(width, height, depth, endSize);

    // Top cap (tenon or block)
    const topPostGeo = createEndGeo(
      topEnd,
      width,
      endSize,
      depth,
      bevelOffset,
      tenonHeight,
      tenonWidth,
      tenonDepth,
    );
    applyEndGeoTransformations(topPostGeo, topEnd, "top", height, endSize);

    // Bottom cap (bevel or block)
    const bottomPostGeo = createEndGeo(
      bottomEnd,
      width,
      endSize,
      depth,
      bevelOffset,
      tenonHeight,
      tenonWidth,
      tenonDepth,
    );
    applyEndGeoTransformations(
      bottomPostGeo,
      bottomEnd,
      "bottom",
      height,
      endSize,
    );

    // prettier-ignore
    // biome-ignore format: want to switch these on and off easily
    const merged = mergeGeometries([
      mainPostGeo,
      topPostGeo,
      bottomPostGeo
    ]);
    merged.computeBoundingSphere();
    merged.computeBoundingBox();

    // materials
    // clear and set new groups
    merged.clearGroups();
    merged.addGroup(0, mainPostGeo.attributes.position.count, 0);
    merged.addGroup(
      mainPostGeo.attributes.position.count,
      topPostGeo.attributes.position.count,
      1,
    );
    merged.addGroup(
      mainPostGeo.attributes.position.count +
        topPostGeo.attributes.position.count,
      bottomPostGeo.attributes.position.count,
      2,
    );

    const bodyTexture = texture.clone();

    const topCapTexture = applyEndTextures(
      texture,
      topEnd,
      "top",
      width,
      height,
      depth,
      endSize,
    );

    const bottomCapTexture = applyEndTextures(
      texture,
      bottomEnd,
      "bottom",
      width,
      height,
      depth,
      endSize,
    );

    // apply random offsets to texture
    if (randomiseTextureOffset) {
      bodyTexture.offset.set(textureOffset.x, textureOffset.y);
      topCapTexture.offset.set(
        textureOffset.x + topCapTexture.offset.x,
        textureOffset.y + topCapTexture.offset.y,
      );
      bottomCapTexture.offset.set(
        textureOffset.x + bottomCapTexture.offset.x,
        textureOffset.y + bottomCapTexture.offset.y,
      );
    }

    return {
      geometry: merged,
      materials: [
        new THREE.MeshStandardMaterial({ map: bodyTexture }),
        new THREE.MeshStandardMaterial({ map: topCapTexture }),
        new THREE.MeshStandardMaterial({ map: bottomCapTexture }),
      ],
    };
  }, [
    width,
    height,
    depth,
    endSize,
    bevelOffset,
    tenonHeight,
    tenonWidth,
    tenonDepth,
    topEnd,
    bottomEnd,
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
  style: PostEndStyle,
  width: number,
  endSize: number,
  depth: number,
  bevelOffset: number,
  tenonHeight: number,
  tenonWidth: number,
  tenonDepth: number,
): THREE.BufferGeometry {
  switch (style) {
    case "block":
      return createBlockCapGeo(width, endSize, depth);
    case "bevel":
      return createBevelEndGeo(width, endSize, depth, bevelOffset);
    case "tenon":
      return createTenonEndGeo(
        width,
        endSize,
        depth,
        tenonHeight,
        tenonWidth,
        tenonDepth,
      );
  }
}

function applyEndGeoTransformations(
  geometry: THREE.BufferGeometry,
  style: PostEndStyle,
  end: PostEnd,
  height: number,
  endSize: number,
) {
  switch (style) {
    // TODO: lots of repetition here can probs be done better
    case "block":
      if (end === "top") {
        geometry.translate(0, height - endSize, 0);
      } else {
        geometry.rotateZ(Math.PI);
        geometry.translate(0, endSize, 0);
      }
      break;
    case "bevel":
      if (end === "top") {
        geometry.translate(0, height - endSize, 0);
      } else {
        geometry.rotateZ(Math.PI);
        geometry.translate(0, endSize, 0);
      }
      break;
    case "tenon":
      if (end === "top") {
        geometry.translate(0, height - endSize, 0);
      } else {
        geometry.rotateZ(Math.PI);
        geometry.translate(0, endSize, 0);
      }
      break;
  }
}

function applyEndTextures(
  texture: THREE.Texture,
  style: PostEndStyle,
  end: PostEnd,
  width: number,
  height: number,
  depth: number,
  endSize: number,
): THREE.Texture {
  const clonedTexture = texture.clone();

  const perimeter = 2 * width + 2 * depth;
  const uTop = (height - 2 * endSize) / perimeter;

  switch (style) {
    case "block":
      if (end === "top") {
        clonedTexture.offset.set(0, uTop);
      } else {
        clonedTexture.offset.set(0.25, 0);
        clonedTexture.rotation = Math.PI;
      }
      break;
    case "bevel":
      if (end === "top") {
        clonedTexture.offset.set(0, uTop);
      } else {
        clonedTexture.offset.set(0.25, 0);
        clonedTexture.rotation = Math.PI;
      }
      break;
    case "tenon":
      if (end === "top") {
        clonedTexture.offset.set(0, uTop);
      } else {
        clonedTexture.offset.set(0.25, 0);
        clonedTexture.rotation = Math.PI;
      }
      break;
  }

  return clonedTexture;
}
