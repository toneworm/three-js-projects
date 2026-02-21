import * as THREE from "three";

export function createHalfLapJoint(
  width: number,
  endSize: number,
  depth: number,
): THREE.BufferGeometry {
  const geometry = new THREE.BufferGeometry();

  const w = width / 2;
  const d = depth / 2;

  const perimeter = 2 * (width + depth);

  const uWidth = width / perimeter;
  const uDepth = depth / perimeter;

  const uFront = uWidth;
  const uRight = (width + depth) / perimeter;
  const uBack = (2 * width + depth) / perimeter;
  const uFrontOffset = (uFront + uRight) / 2;
  const uBackOffset = (uBack + 1) / 2;

  const uHeight = endSize / perimeter;

  // prettier-ignore
  // biome-ignore format: buffer array
  const tris = new Float32Array([
    // Front joint face
    -w, endSize, 0, -w, 0, 0, w, 0, 0,
    w, 0, 0, w, endSize, 0, -w, endSize, 0,

    // Right joint face
    w, endSize, 0, w, 0, 0, w, 0, -d,
    w, 0, -d, w, endSize, -d, w, endSize, 0,

    // Back joint face
    w, endSize, -d, w, 0, -d, -w, 0, -d,
    -w, 0, -d, -w, endSize, -d, w, endSize, -d,

    // Left joint face
    -w, endSize, -d, -w, 0, -d, -w, 0, 0,
    -w, 0, 0, -w, endSize, 0, -w, endSize, -d,

    // End joint face (top)
    -w, endSize, -d, -w, endSize, 0, w, endSize, 0,
    w, endSize, 0, w, endSize, -d, -w, endSize, -d,

    // End joint face (bottom)
    -w, 0, 0, -w, 0, d, w, 0, d,
    w, 0, d, w, 0, 0, -w, 0, 0,
  ]);

  // prettier-ignore
  // biome-ignore format: buffer array
  const uvs = new Float32Array([
    // Front joint face UVs
    0, uHeight, 0, 0, uFront, 0,
    uFront, 0, uFront, uHeight, 0, uHeight,

    // Right joint face UVs
    uFrontOffset, uHeight, uFrontOffset, 0, uRight, 0,
    uRight, 0, uRight, uHeight, uFrontOffset, uHeight,

    // Back joint face UVs
    uRight, uHeight, uRight, 0, uBack, 0,
    uBack, 0, uBack, uHeight, uRight, uHeight,

    // Left joint face UVs
    uBack, uHeight, uBack, 0, uBackOffset, 0,
    uBackOffset, 0, uBackOffset, uHeight, uBack, uHeight,

    // End joint face UVs (top)
    0, uDepth, 0, uDepth / 2, uWidth, uDepth / 2,
    uWidth, uDepth / 2, uWidth, uDepth, 0, uDepth,

    // End joint face UVs (bottom)
    0, uDepth / 2, 0, 0, uWidth, 0,
    uWidth, 0, uWidth, uDepth / 2, 0, uDepth / 2,
  ]);

  geometry.setAttribute("position", new THREE.BufferAttribute(tris, 3));
  geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
  geometry.computeVertexNormals();

  return geometry;
}
