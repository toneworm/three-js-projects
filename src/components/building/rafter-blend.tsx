import { useGLTF, useTexture } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import { text } from "stream/consumers";
import * as THREE from "three";

type RafterBlendProps = {
  width: number;
  length: number;
  depth: number;
  angle: number;
  birdsMouthSeat: number;
  birdsMouthDepth: number;
};

const BASE_WIDTH = 0.3;
const BASE_DEPTH = 0.5;
const SOME_THRESHOLD = 0.5;

export default function RafterBlend({
  width,
  length,
  depth,
  angle,
  birdsMouthSeat,
  birdsMouthDepth,
  ...meshProps
}: RafterBlendProps & JSX.IntrinsicElements["mesh"]) {
  // Load your base rafter model from Blender
  const { scene } = useGLTF("/models/rafter_test_001.glb");

  const texture = useTexture("/textures/uv_texture_color.webp");
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  const geometry = useMemo(() => {
    // Clone the geometry from the imported model
    const mesh = scene.children[0] as THREE.Mesh;
    const geo = mesh.geometry.clone();

    // Access vertex positions
    const positions = geo.attributes.position;
    const posArray = positions.array as Float32Array;

    const vertexColorGroup = geo.attributes.color_1;

    console.log(vertexColorGroup);

    for (let i = 0; i < vertexColorGroup.count; i++) {
      const r = vertexColorGroup.getX(i); // birds_mouth weight
      const g = vertexColorGroup.getY(i); // top_end weight
      const b = vertexColorGroup.getZ(i); // bottom_end weight

      if (r > 0.5) {
        // This vertex is in birds_mouth group
        console.log("birds_mouth vertex");
      }
      if (g > 0.5) {
        console.log("top_end vertex");
        // This vertex is in top_end group
      }
      if (b > 0.5) {
        console.log("bottom_end vertex");
        // This vertex is in bottom_end group
      }
      // etc...
    }

    // Example: Adjust vertices based on parameters
    // You'll need to identify which vertices correspond to which parts
    // for (let i = 0; i < positions.count; i++) {
    //   const x = posArray[i * 3];
    //   const y = posArray[i * 3 + 1];
    //   const z = posArray[i * 3 + 2];

    //   // Scale to match width/depth
    //   posArray[i * 3] = x * (width / BASE_WIDTH);
    //   posArray[i * 3 + 2] = z * (depth / BASE_DEPTH);

    //   // Adjust height based on length and angle
    //   // This is where you'd calculate the angled top
    //   if (y > SOME_THRESHOLD) {
    //     const distanceAlongRafter = z;
    //     const heightAdjustment = Math.tan(angle) * distanceAlongRafter;
    //     posArray[i * 3 + 1] = y + heightAdjustment;
    //   }

    //   // Adjust bird's mouth vertices
    //   // You'd need to identify these vertices in Blender first
    //   // Maybe use vertex groups or naming conventions
    // }

    // positions.needsUpdate = true;
    geo.computeVertexNormals();
    geo.computeBoundingBox();
    geo.computeBoundingSphere();

    return geo;
  }, [width, length, depth, angle, birdsMouthSeat, birdsMouthDepth]);

  useEffect(() => {
    return () => {
      geometry.dispose();
    };
  }, [geometry]);

  return (
    <mesh geometry={geometry} {...meshProps}>
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

// Preload the model
useGLTF.preload("/models/rafter_test_001.glb");
