import * as THREE from "three";

export function createMainPlinthGeo(
  width: number,
  depth: number,
  thickness: number,
  height: number,
): THREE.BufferGeometry {
  const geometry = new THREE.BufferGeometry();

  const w = width / 2;
  const d = depth / 2;
  const t = thickness;
  const h = height;
  const wt = w - t;
  const dt = -d + t;

  // const perimeter = 2 * (height + depth);
  // const uFront = depth / perimeter;
  // const uBottom = (depth + height) / perimeter;
  // const uBack = (2 * depth + height) / perimeter;
  // const uTop = 1;
  // const vWidth = width / perimeter;

  // prettier-ignore
  // biome-ignore format: buffer array
  const mainTris = [
    // Front face
    -wt, h, dt,   -wt, 0, dt,   wt, 0, dt,
    wt, 0, dt,    wt, h, dt,    -wt, h, dt,

    // Top face
    -wt, h, -d,   -wt, h, dt,   wt, h, dt,
    wt, h, dt,    wt, h, -d,    -wt, h, -d,

    // Back face
    -wt, 0, -d,   -wt, h, -d,   wt, h, -d,
    wt, h, -d,    wt, 0, -d,    -wt, 0, -d,
  ];

  // prettier-ignore
  // biome-ignore format: buffer array
  const leftTris = [
    // Right face
    -wt, h, d,    -wt, 0, d,   -wt, 0, -d,
    -wt, 0, -d,   -wt, h, -d,   -wt, h, d,

    // Top face
    -w, h, d,     -wt, h, d,    -wt, h, -d,
    -wt, h, -d,   -w, h, -d,    -w, h, d,

    // Left face
    -w, 0, d,     -w, h, d,    -w, h, -d,
    -w, h, -d,   -w, 0, -d,    -w, 0, d,

    // Front face
    -w, h, d,   -w, 0, d,   -wt, 0, d,
    -wt, 0, d,   -wt, h, d,   -w, h, d,

    // Back face
    -wt, h, -d,  -wt, 0, -d,  -w, 0, -d,
    -w, 0, -d,   -w, h, -d,   -wt, h, -d,
  ]

  // prettier-ignore
  // biome-ignore format: buffer array
  const rightTris = [
    // Right face
    w, h, d,    w, 0, d,   w, 0, -d,
    w, 0, -d,   w, h, -d,   w, h, d,

    // Top face
    wt, h, d,   w, h, d,   w, h, -d,
    w, h, -d,   wt, h, -d,   wt, h, d,

    // Left face
    wt, 0, d,   wt, h, d,   wt, h, -d,
    wt, h, -d,  wt, 0, -d,  wt, 0, d,

    // Front face
    wt, h, d,   wt, 0, d,   w, 0, d,
    w, 0, d,    w, h, d,    wt, h, d,

    // Back face
    w, h, -d,   w, 0, -d,   wt, 0, -d,
    wt, 0, -d,   wt, h, -d,   w, h, -d,
  ]

  // UVs
  // prettier-ignore
  // biome-ignore format: buffer array
  const uvs = new Float32Array([
    
  ]);

  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(
      new Float32Array([...mainTris, ...leftTris, ...rightTris]),
      3,
    ),
  );
  geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
  geometry.computeVertexNormals();

  return geometry;
}
