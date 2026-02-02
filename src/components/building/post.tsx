import { useTexture } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

type PostProps = {
  width: number;
  height: number;
  depth: number;
  showTenon?: boolean;
  showBevel?: boolean;
};

// not sure how best to do this...
const minWidth = 0.05;
const maxWidth = 0.3;
const minDepth = 0.05;
const maxDepth = 0.3;
const minHeight = 1.5;
const maxHeight = 5.0;

const tenonHeight = 0.1;
const tenonWidthFactor = 0.4;
const tenonDepthFactor = 0.6;
const bevelOffset = 0.015;

export default function Post({
  width,
  height,
  depth,
  showTenon = false,
  showBevel = false,
}: PostProps) {
  const texture = useTexture("/textures/oak_veneer_01_diff_1k.jpg");

  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  if (width < minWidth || width > maxWidth) {
    console.warn(`Post width ${width} out of bounds (${minWidth}-${maxWidth})`);
    width = Math.min(Math.max(width, minWidth), maxWidth);
  }

  if (depth < minDepth || depth > maxDepth) {
    console.warn(`Post depth ${depth} out of bounds (${minDepth}-${maxDepth})`);
    depth = Math.min(Math.max(depth, minDepth), maxDepth);
  }

  if (height < minHeight || height > maxHeight) {
    console.warn(
      `Post height ${height} out of bounds (${minHeight}-${maxHeight})`,
    );
    height = Math.min(Math.max(height, minHeight), maxHeight);
  }

  // reduce height with tenon
  if (showTenon) {
    height -= tenonHeight / 2;
  }

  return (
    <group>
      <mesh
        geometry={generatePostGeometry({ width, height, depth, showBevel })}
      >
        <meshStandardMaterial map={texture} flatShading />
      </mesh>

      <mesh visible={showTenon} position={[0, height, 0]}>
        <boxGeometry
          args={[
            width * tenonWidthFactor,
            tenonHeight,
            depth * tenonDepthFactor,
          ]}
        />
        <meshStandardMaterial map={texture} flatShading />
      </mesh>
    </group>
  );
}

function generatePostGeometry({ width, height, depth, showBevel }: PostProps) {
  const geometry = new THREE.BufferGeometry();

  const w = width / 2;
  const d = depth / 2;
  const h = height;

  const perimeter = 2 * (width + depth);
  const uFront = width / perimeter;
  const uRight = (width + depth) / perimeter;
  const uBack = (2 * width + depth) / perimeter;
  const uLeft = 1;

  // prettier-ignore
  // All start top left and go anti-clockwise round
  // biome-ignore format: buffer array
  const mainTris = [
    // Front face
    -w, h, d, -w, bevelOffset, d, w, bevelOffset, d,
    w, bevelOffset, d, w, h, d, -w, h, d,

    // Right face
    w, h, d, w, bevelOffset, d, w, bevelOffset, -d,
    w, bevelOffset, -d, w, h, -d, w, h, d,

    // Back face
    w, h, -d, w, bevelOffset, -d, -w, bevelOffset, -d,
    -w, bevelOffset, -d, -w, h, -d, w, h, -d,

    // Left face
    -w, h, -d, -w, bevelOffset, -d, -w, bevelOffset, d,
    -w, bevelOffset, d, -w, h, d, -w, h, -d,

    // Top face (lean over)
    -w, h, -d, -w, h, d, w, h, d,
    w, h, d, w, h, -d, -w, h, -d,
  ]

  // prettier-ignore
  // biome-ignore format: buffer array
  const mainUVs = [
    // Front face
    0, h, 0, bevelOffset, uFront, bevelOffset,
    uFront, bevelOffset, uFront, h, 0, h,

    // Right face
    uFront, h, uFront, bevelOffset, uRight, bevelOffset,
    uRight, bevelOffset, uRight, h, uFront, h,

    // Back face
    uRight, h, uRight, bevelOffset, uBack, bevelOffset,
    uBack, bevelOffset, uBack, h, uRight, h,

    // Left face
    uBack, h, uBack, bevelOffset, uLeft, bevelOffset,
    uLeft, bevelOffset, uLeft, h, uBack, h,

    // Top face
    0, h, 0, 0, uFront, 0,
    uFront, 0, uFront, h, 0, h,
  ]

  // prettier-ignore
  // biome-ignore format: buffer array
  const endTris = [
    // Front strip
    -w, bevelOffset, d, -w, 0, d, w, 0, d,
    w, 0, d, w, bevelOffset, d, -w, bevelOffset, d,

    // Right strip
    w, bevelOffset, d, w, 0, d, w, 0, -d,
    w, 0, -d, w, bevelOffset, -d, w, bevelOffset, d,

    // Back strip
    w, bevelOffset, -d, w, 0, -d, -w, 0, -d,
    -w, 0, -d, -w, bevelOffset, -d, w, bevelOffset, -d,

    // Left strip
    -w, bevelOffset, -d, -w, 0, -d, -w, 0, d,
    -w, 0, d, -w, bevelOffset, d, -w, bevelOffset, -d,

    // Bottom face (lean under)
    -w, 0, d, -w, 0, -d, w, 0, -d,
    w, 0, -d, w, 0, d, -w, 0, d,
  ]

  // prettier-ignore
  // biome-ignore format: buffer array
  const bevelEndTris = [
    // Front Bevel
    -w, bevelOffset, d, -w + bevelOffset, 0, d - bevelOffset, w - bevelOffset, 0, d - bevelOffset,
    w - bevelOffset, 0, d - bevelOffset, w, bevelOffset, d, -w, bevelOffset, d,

    // Right Bevel
    w, bevelOffset, d, w - bevelOffset, 0, d - bevelOffset, w - bevelOffset, 0, -d + bevelOffset,
    w - bevelOffset, 0, -d + bevelOffset, w, bevelOffset, -d, w, bevelOffset, d,

    // Back Bevel
    w, bevelOffset, -d, w - bevelOffset, 0, -d + bevelOffset, -w + bevelOffset, 0, -d + bevelOffset,
    -w + bevelOffset, 0, -d + bevelOffset, -w, bevelOffset, -d, w, bevelOffset, -d,

    // Left Bevel
    -w, bevelOffset, -d, -w + bevelOffset, 0, -d + bevelOffset, -w + bevelOffset, 0, d - bevelOffset,
    -w + bevelOffset, 0, d - bevelOffset, -w, bevelOffset, d, -w, bevelOffset, -d,

    // Bottom face (lean under)
    -w + bevelOffset, 0, d - bevelOffset, -w + bevelOffset, 0, -d + bevelOffset, w - bevelOffset, 0, -d + bevelOffset,
    w - bevelOffset, 0, -d + bevelOffset, w - bevelOffset, 0, d - bevelOffset, -w + bevelOffset, 0, d - bevelOffset,
  ];

  // prettier-ignore
  // biome-ignore format: buffer array
  // Use the same UVs for bevel and non-bevelled ends
  const endUVs = [
    // Front strip UVs
    0, bevelOffset, 0, 0, uFront, 0,
    uFront, 0, uFront, bevelOffset, 0, bevelOffset,
    
    // Right strip UVs
    uFront, bevelOffset, uFront, 0, uRight, 0,
    uRight, 0, uRight, bevelOffset, uFront, bevelOffset,

    // Back strip UVs
    uRight, bevelOffset, uRight, 0, uBack, 0,
    uBack, 0, uBack, bevelOffset, uRight, bevelOffset,

    // Left strip UVs
    uBack, bevelOffset, uBack, 0, uLeft, 0,
    uLeft, 0, uLeft, bevelOffset, uBack, bevelOffset,

    // Bottom face UVs
    0, 0, 0, depth, width, depth,
    width, depth, width, 0, 0, 0,
  ]

  const triangles = showBevel
    ? new Float32Array([...mainTris, ...bevelEndTris])
    : new Float32Array([...mainTris, ...endTris]);

  const uvs = new Float32Array([...mainUVs, ...endUVs]);

  geometry.setAttribute("position", new THREE.BufferAttribute(triangles, 3));
  geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
  geometry.computeVertexNormals();

  return geometry;
}
