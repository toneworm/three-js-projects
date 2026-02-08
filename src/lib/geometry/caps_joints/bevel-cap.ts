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

  const uWidth = width / perimeter;
  const uDepth = depth / perimeter;
  const uHeight = endSize / perimeter;
  const uBv = bevelOffset / perimeter;

  const uFront = uWidth;
  const uRight = (width + depth) / perimeter;
  const uBack = (2 * width + depth) / perimeter;
  const uLeft = 1;

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
    0, uHeight, 0, 0, uFront, 0,
    uFront, 0, uFront, uHeight, 0, uHeight,

    // Right strip UVs
    uFront, uHeight, uFront, 0, uRight, 0,
    uRight, 0, uRight, uHeight, uFront, uHeight,

    // Back strip UVs
    uRight, uHeight, uRight, 0, uBack, 0,
    uBack, 0, uBack, uHeight, uRight, uHeight,

    // Left strip UVs
    uBack, uHeight, uBack, 0, uLeft, 0,
    uLeft, 0, uLeft, uHeight, uBack, uHeight,

    // Front bevel UVs
    uBv, uBv, 0, 0, uFront, 0,
    uFront, 0, uFront - uBv, uBv, uBv, uBv,
    
    // Right bevel UVs
    uFront + uBv, uBv, uFront, 0, uRight, 0,
    uRight, 0, uRight - uBv, uBv, uFront + uBv, uBv,

    // Back bevel UVs
    uRight + uBv, uBv, uRight, 0, uBack, 0,
    uBack, 0, uBack - uBv, uBv, uRight + uBv, uBv,

    // Left bevel UVs
    uBack + uBv, uBv, uBack, 0, uLeft, 0,
    uLeft, 0, uLeft - uBv, uBv, uBack + uBv, uBv,

    // Top face UVs
    0, uDepth, 0, 0, uWidth, 0,
    uWidth, 0, uWidth, uDepth, 0, uDepth,
  ]);

  geometry.setAttribute("position", new THREE.BufferAttribute(tris, 3));
  geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
  geometry.computeVertexNormals();

  return geometry;
}
