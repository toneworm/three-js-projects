import * as THREE from "three";

export function createBlockCapGeo(
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
  const uHeight = endSize / perimeter;

  // prettier-ignore
  // biome-ignore format: buffer array
  const tris = new Float32Array([
    // Front face
    -w, endSize, d, -w, 0, d, w, 0, d,
    w, 0, d, w, endSize, d, -w, endSize, d,

    // Right face
    w, endSize, d, w, 0, d, w, 0, -d,
    w, 0, -d, w, endSize, -d, w, endSize, d,

    // Back face
    w, endSize, -d, w, 0, -d, -w, 0, -d,
    -w, 0, -d, -w, endSize, -d, w, endSize, -d,

    // Left face
    -w, endSize, -d, -w, 0, -d, -w, 0, d,
    -w, 0, d, -w, endSize, d, -w, endSize, -d,

    // End face (top)
    -w, endSize, d, w, endSize, d, w, endSize, -d,
    w, endSize, -d, -w, endSize, -d, -w, endSize, d,
  ]);

  // prettier-ignore
  // biome-ignore format: buffer array
  const uvs = new Float32Array([
    // Front face UVs
    0, uHeight, 0, 0, uFront, 0,
    uFront, 0, uFront, uHeight, 0, uHeight,

    // Right face UVs
    uFront, uHeight, uFront, 0, uRight, 0,
    uRight, 0, uRight, uHeight, uFront, uHeight,

    // Back face UVs
    uRight, uHeight, uRight, 0, uBack, 0,
    uBack, 0, uBack, uHeight, uRight, uHeight,

    // Left face UVs
    uBack, uHeight, uBack, 0, 1, 0,
    1, 0, 1, uHeight, uBack, uHeight,

    // End face UVs
    0, 0, uWidth, 0, uWidth, uDepth,
    uWidth, uDepth, 0, uDepth, 0, 0,
  ]);

  geometry.setAttribute("position", new THREE.BufferAttribute(tris, 3));
  geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
  geometry.computeVertexNormals();

  return geometry;
}
