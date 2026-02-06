import * as THREE from "three";

export function createBevelEndGeo(
  width: number,
  endSize: number,
  depth: number,
  bevelOffset: number,
): THREE.BufferGeometry {
  const geometry = new THREE.BufferGeometry();

  const w = width / 2;
  const d = depth / 2;

  const perimeter = 2 * (width + depth);
  const uFront = width / perimeter;
  const uRight = (width + depth) / perimeter;
  const uBack = (2 * width + depth) / perimeter;
  const uLeft = 1;
  const uBv = bevelOffset / width;

  // prettier-ignore
  // biome-ignore format: buffer array
  const tris = new Float32Array([
    // Front strip
    -w, endSize, d, -w, 0, d, w, 0, d,
    w, 0, d, w, endSize, d, -w, endSize, d,

    // Right strip
    w, endSize, d, w, 0, d, w, 0, -d,
    w, 0, -d, w, endSize, -d, w, endSize, d,
    
    // Back strip
    w, endSize, -d, w, 0, -d, -w, 0, -d,
    -w, 0, -d, -w, endSize, -d, w, endSize, -d,

    // Left strip
    -w, endSize, -d, -w, 0, -d, -w, 0, d,
    -w, 0, d, -w, endSize, d, -w, endSize, -d,

    // Front bevel
    -w + bevelOffset, endSize + bevelOffset, d - bevelOffset, -w, endSize, d, w, endSize, d,
    w, endSize, d, w - bevelOffset, endSize + bevelOffset, d - bevelOffset, -w + bevelOffset, endSize + bevelOffset, d - bevelOffset,
    
    // Right bevel
    w - bevelOffset, endSize + bevelOffset, d - bevelOffset, w, endSize, d, w, endSize, -d,
    w, endSize, -d, w - bevelOffset, endSize + bevelOffset, -d + bevelOffset, w - bevelOffset, endSize + bevelOffset, d - bevelOffset,

    // Back bevel
    w - bevelOffset, endSize + bevelOffset, -d + bevelOffset, w, endSize, -d, -w, endSize, -d,
    -w, endSize, -d, -w + bevelOffset, endSize + bevelOffset, -d + bevelOffset, w - bevelOffset, endSize + bevelOffset, -d + bevelOffset,

    // Left bevel
    -w + bevelOffset, endSize + bevelOffset, -d + bevelOffset, -w, endSize, -d, -w, endSize, d,
    -w, endSize, d, -w + bevelOffset, endSize + bevelOffset, d - bevelOffset, -w + bevelOffset, endSize + bevelOffset, -d + bevelOffset,

    // Top face
    -w + bevelOffset, endSize + bevelOffset, -d + bevelOffset, -w + bevelOffset, endSize + bevelOffset, d - bevelOffset, w - bevelOffset, endSize + bevelOffset, d - bevelOffset,
    w - bevelOffset, endSize + bevelOffset, d - bevelOffset, w - bevelOffset, endSize + bevelOffset, -d + bevelOffset, -w + bevelOffset, endSize + bevelOffset, -d + bevelOffset,
    
  ]);

  // prettier-ignore
  // biome-ignore format: buffer array
  const uvs = new Float32Array([
    // Front strip UVs
    0, endSize, 0, 0, uFront, 0,
    uFront, 0, uFront, endSize, 0, endSize,

    // Right strip UVs
    uFront, endSize, uFront, 0, uRight, 0,
    uRight, 0, uRight, endSize, uFront, endSize,

    // Back strip UVs
    uRight, endSize, uRight, 0, uBack, 0,
    uBack, 0, uBack, endSize, uRight, endSize,

    // Left strip UVs
    uBack, endSize, uBack, 0, uLeft, 0,
    uLeft, 0, uLeft, endSize, uBack, endSize,

    // Front bevel UVs
    0, uBv, 0, 0, uFront, 0,
    uFront, 0, uFront, uBv, 0, uBv,
    
    // Right bevel UVs
    uFront, uBv, uFront, 0, uRight, 0,
    uRight, 0, uRight, uBv, uFront, uBv,

    // Back bevel UVs
    uRight, uBv, uRight, 0, uBack, 0,
    uBack, 0, uBack, uBv, uRight, uBv,

    // Left bevel UVs
    uBack, uBv, uBack, 0, uLeft, 0,
    uLeft, 0, uLeft, uBv, uBack, uBv,

    // Bottom face UVs
    0, 0, 0, depth, width, depth,
    width, depth, width, 0, 0, 0,
  ]);

  geometry.setAttribute("position", new THREE.BufferAttribute(tris, 3));
  geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
  geometry.computeVertexNormals();

  return geometry;
}
