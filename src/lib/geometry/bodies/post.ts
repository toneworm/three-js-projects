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
  const h = height - endSize;

  const perimeter = 2 * (width + depth);
  const uFront = width / perimeter;
  const uRight = (width + depth) / perimeter;
  const uBack = (2 * width + depth) / perimeter;
  const uLeft = 1;
  const uHeight = (h - endSize) / perimeter;

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
    0, uHeight, 0, 0, uFront, 0,
    uFront, 0, uFront, uHeight, 0, uHeight,

    // Right face
    uFront, uHeight, uFront, 0, uRight, 0,
    uRight, 0, uRight, uHeight, uFront, uHeight,

    // Back face
    uRight, uHeight, uRight, 0, uBack, 0,
    uBack, 0, uBack, uHeight, uRight, uHeight,

    // Left face
    uBack, uHeight, uBack, 0, uLeft, 0,
    uLeft, 0, uLeft, uHeight, uBack, uHeight,
  ])

  geometry.setAttribute("position", new THREE.BufferAttribute(tris, 3));
  geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
  geometry.computeVertexNormals();

  return geometry;
}
