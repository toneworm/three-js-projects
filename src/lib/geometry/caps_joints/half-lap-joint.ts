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
  const uFront = width / perimeter;
  const uRight = (width + depth) / perimeter;
  const uBack = (2 * width + depth) / perimeter;

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
    -w, endSize, 0, w, endSize, 0, w, endSize, -d,
    w, endSize, -d, -w, endSize, -d, -w, endSize, 0,

    // End joint face (bottom)
    -w, 0, 0, -w, 0, d, w, 0, d,
    w, 0, d, w, 0, 0, -w, 0, 0,
  ]);

  // prettier-ignore
  // biome-ignore format: buffer array
  const uvs = new Float32Array([
    // Front joint face UVs
    0, endSize, 0, 0, uFront, 0,
    uFront, 0, uFront, endSize, 0, endSize,

    // Right joint face UVs
    uFront, endSize, uFront, 0, uRight, 0,
    uRight, 0, uRight, endSize, uFront, endSize,

    // Back joint face UVs
    uRight, endSize, uRight, 0, uBack, 0,
    uBack, 0, uBack, endSize, uRight, endSize,

    // Left joint face UVs
    uBack, endSize, uBack, 0, 1, 0,
    1, 0, 1, endSize, uBack, endSize,

    // End joint face UVs (top)
    0, 0, width, 0, width, depth,
    width, depth, 0, depth, 0, 0,

    // End joint face UVs (bottom)
    0, 0, 0, depth, width, depth,
    width, depth, width, 0, 0, 0,
  ]);

  geometry.setAttribute("position", new THREE.BufferAttribute(tris, 3));
  geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
  geometry.computeVertexNormals();

  return geometry;
}
