import { useTexture } from "@react-three/drei";
import * as THREE from "three";

type PostDimensions = {
  width: number;
  height: number;
  depth: number;
};

// not sure how best to do this...
const minWidth = 0.05;
const maxWidth = 0.3;
const minDepth = 0.05;
const maxDepth = 0.3;
const minHeight = 1.5;
const maxHeight = 5.0;

export default function Post({ width, height, depth }: PostDimensions) {
  const texture = useTexture("/textures/oak_veneer_01_diff_1k.jpg");

  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  if (width < minWidth || width > maxWidth) {
    width = Math.min(Math.max(width, minWidth), maxWidth);
    console.warn(`Post width ${width} out of bounds (${minWidth}-${maxWidth})`);
  }

  if (depth < minDepth || depth > maxDepth) {
    depth = Math.min(Math.max(depth, minDepth), maxDepth);
    console.warn(`Post depth ${depth} out of bounds (${minDepth}-${maxDepth})`);
  }

  if (height < minHeight || height > maxHeight) {
    height = Math.min(Math.max(height, minHeight), maxHeight);
    console.warn(
      `Post height ${height} out of bounds (${minHeight}-${maxHeight})`,
    );
  }

  return (
    <mesh>
      <primitive object={generatePostGeometry({ width, height, depth })} />
      {/* <meshStandardMaterial color="orange" flatShading /> */}
      <meshStandardMaterial map={texture} flatShading />
    </mesh>
  );
}

function generatePostGeometry({ width, height, depth }: PostDimensions) {
  const geometry = new THREE.BufferGeometry();

  const w = width / 2;
  const d = depth / 2;

  // prettier-ignore
  // All start top left and go anti-clockwise round
  // biome-ignore format: vertex array should not be formatted
  const triangles = new Float32Array([
    // Front face
    -w, height, d, -w, 0, d, w, 0, d,
    w, 0, d, w, height, d, -w, height, d,

    // Right face
    w, height, d, w, 0, d, w, 0, -d,
    w, 0, -d, w, height, -d, w, height, d,

    // Back face
    w, height, -d, w, 0, -d, -w, 0, -d,
    -w, 0, -d, -w, height, -d, w, height, -d,

    // Left face
    -w, height, -d, -w, 0, -d, -w, 0, d,
    -w, 0, d, -w, height, d, -w, height, -d,

    // Top face (lean over)
    -w, height, -d, -w, height, d, w, height, d,
    w, height, d, w, height, -d, -w, height, -d,

    // Bottom face (lean under)
    -w, 0, d, -w, 0, -d, w, 0, -d,
    w, 0, -d, w, 0, d, -w, 0, d,
  ]);

  const perimeter = 2 * (width + depth);
  const uFront = width / perimeter;
  const uRight = (width + depth) / perimeter;
  const uBack = (2 * width + depth) / perimeter;
  const uLeft = 1;

  const h = height;

  // prettier-ignore
  // biome-ignore format: vertex array should not be formatted
  const uvs = new Float32Array([
    // Front face
    0, h, 0, 0, uFront, 0,
    uFront, 0, uFront, h, 0, h,

    // Right face
    uFront, h, uFront, 0, uRight, 0,
    uRight, 0, uRight, h, uFront, h,
    
    // Back face
    uRight, h, uRight, 0, uBack, 0,
    uBack, 0, uBack, h, uRight, h,

    // Left face
    uBack, h, uBack, 0, uLeft, 0,
    uLeft, 0, uLeft, h, uBack, h,

    // Top face
    0, depth, 0, 0, width, 0,
    width, 0, width, depth, 0, depth,

    // Bottom face
    0, 0, 0, depth, width, depth,
    width, depth, width, 0, 0, 0,
  ]);

  geometry.setAttribute("position", new THREE.BufferAttribute(triangles, 3));
  geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
  geometry.computeVertexNormals();

  return geometry;
}
