import * as THREE from "three";

export function createMainPostGeo(
  width: number,
  height: number,
  depth: number,
  endSize: number,
): THREE.BufferGeometry {
  const geometry = new THREE.BufferGeometry();

  const w = width / 2;
  const d = depth / 2;
  const h = height;

  const perimeter = 2 * (width + depth);
  const uFront = width / perimeter;
  const uRight = (width + depth) / perimeter;
  const uBack = (2 * width + depth) / perimeter;
  const uLeft = 1;

  // All start top left and go anti-clockwise round
  // prettier-ignore
  // biome-ignore format: buffer array
  const tris = new Float32Array([
    // Front face
    -w, h, d, -w, endSize, d, w, endSize, d,
    w, endSize, d, w, h, d, -w, h, d,

    // Right face
    w, h, d, w, endSize, d, w, endSize, -d,
    w, endSize, -d, w, h, -d, w, h, d,

    // Back face
    w, h, -d, w, endSize, -d, -w, endSize, -d,
    -w, endSize, -d, -w, h, -d, w, h, -d,

    // Left face
    -w, h, -d, -w, endSize, -d, -w, endSize, d,
    -w, endSize, d, -w, h, d, -w, h, -d,
  ]);

  // prettier-ignore
  // biome-ignore format: buffer array
  // Use the same UVs for bevel and non-bevelled ends
  const uvs = new Float32Array([
    // Front face
    0, h, 0, endSize, uFront, endSize,
    uFront, endSize, uFront, h, 0, h,

    // Right face
    uFront, h, uFront, endSize, uRight, endSize,
    uRight, endSize, uRight, h, uFront, h,

    // Back face
    uRight, h, uRight, endSize, uBack, endSize,
    uBack, endSize, uBack, h, uRight, h,

    // Left face
    uBack, h, uBack, endSize, uLeft, endSize,
    uLeft, endSize, uLeft, h, uBack, h,
  ])

  geometry.setAttribute("position", new THREE.BufferAttribute(tris, 3));
  geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
  geometry.computeVertexNormals();

  return geometry;
}
