import { useEffect, useMemo } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

import {
  CLADDING_DEFAULT_TEXTURE,
  CLADDING_OVERLAP,
  CLADDING_TEXTURES,
  CLADDING_TILT,
} from "@/lib/constants";
import { createCladdingGeo } from "@/lib/geometry/bodies/cladding";
import { resolveCladdingGeometry } from "@/lib/geometry/utils/resolve-geometry";
import type { CladdingProps } from "@/types/building";

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

    // test in Affinity to see different layer effects then update
    const paintColor = new THREE.Color("#1a1a1a");
    const paintOpacity = 0.25;

    const mats = Array.from({ length: count }, () => {
      const clonedTexture = texture.clone();
      if (randomiseTextureOffset) {
        clonedTexture.offset.set(Math.random(), Math.random());
      }

      const mat = new THREE.MeshStandardMaterial({ map: clonedTexture });

      mat.onBeforeCompile = (shader) => {
        shader.uniforms.paintColor = { value: paintColor };
        shader.uniforms.paintOpacity = { value: paintOpacity };

        shader.fragmentShader = `
          uniform vec3 paintColor;
          uniform float paintOpacity;
          ${shader.fragmentShader}
        `.replace(
          "#include <map_fragment>",
          `
            #include <map_fragment>
            diffuseColor.rgb = mix(diffuseColor.rgb, paintColor, paintOpacity);
          `,
        );
      };

      return mat;
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
