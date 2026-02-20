import * as THREE from "three";

export function createStaddleStoneGeo(
  length: number,
  height: number,
  depth: number,
  taperRatio: number,
) {
  const geometry = new THREE.BufferGeometry();

  // Base dimensions (bottom)
  const l = length / 2;
  const d = depth / 2;
  const h = height;

  // Top dimensions (tapered)
  const lt = l * taperRatio;
  const dt = d * taperRatio;

  // Calculate perimeter for UV mapping
  const perimeter = 2 * length + 2 * depth;
  const uFront = length / perimeter;
  const uRight = (length + depth) / perimeter;
  const uBack = (2 * length + depth) / perimeter;
  const uLeft = 1;

  // prettier-ignore
  // biome-ignore format: buffer array
  const tris = new Float32Array([
    // Bottom face (y = 0)
    -l, 0, -d,   l, 0, -d,   l, 0, d,
     l, 0, d,   -l, 0, d,   -l, 0, -d,

    // Top face (y = h, tapered)
    -lt, h, -dt,  -lt, h, dt,   lt, h, dt,
     lt, h, dt,   lt, h, -dt,  -lt, h, -dt,

    // Front face (z = d at bottom, z = dt at top)
    -l, 0, d,    l, 0, d,     lt, h, dt,
    lt, h, dt,  -lt, h, dt,   -l, 0, d,

    // Back face (z = -d at bottom, z = -dt at top)
     l, 0, -d,   -l, 0, -d,   -lt, h, -dt,
    -lt, h, -dt,  lt, h, -dt,   l, 0, -d,

    // Right face (x = l at bottom, x = lt at top)
    l, 0, d,     l, 0, -d,    lt, h, -dt,
    lt, h, -dt,  lt, h, dt,    l, 0, d,

    // Left face (x = -l at bottom, x = -lt at top)
    -l, 0, -d,   -l, 0, d,    -lt, h, dt,
    -lt, h, dt,  -lt, h, -dt,  -l, 0, -d,
  ]);

  // UV coordinates - wrap texture around the sides
  // prettier-ignore
  // biome-ignore format: buffer array
  const UVs = new Float32Array([
    // Bottom face
    0, 0,   1, 0,   1, 1,
    1, 1,   0, 1,   0, 0,

    // Top face
    0, 0,   0, 1,   1, 1,
    1, 1,   1, 0,   0, 0,

    // Front face
    0, 0,         uFront, 0,         uFront, h,
    uFront, h,    0, h,              0, 0,

    // Back face
    uRight, 0,    uBack, 0,          uBack, h,
    uBack, h,     uRight, h,         uRight, 0,

    // Right face
    uFront, 0,    uRight, 0,         uRight, h,
    uRight, h,    uFront, h,         uFront, 0,

    // Left face
    uBack, 0,     uLeft, 0,          uLeft, h,
    uLeft, h,     uBack, h,          uBack, 0,
  ]);

  geometry.setAttribute("position", new THREE.BufferAttribute(tris, 3));
  geometry.setAttribute("uv", new THREE.BufferAttribute(UVs, 2));
  geometry.computeVertexNormals();

  return geometry;
}
