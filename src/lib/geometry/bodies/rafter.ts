import * as THREE from "three";

export function createMainRafterGeo(
  length: number,
  height: number,
  depth: number,
  angle: number,
) {
  const geometry = new THREE.BufferGeometry();

  const d = depth / 2;
  const l = length / 2;
  const h = height;
  const o = h * Math.tan(angle); // plumb cut offset

  const circumference = 2 * (depth + height);
  const uTop = depth / circumference;
  const uBack = (depth + height) / circumference;
  const uBottom = (2 * depth + height) / circumference;
  const uFront = 1;
  const uL = length / circumference;

  // prettier-ignore
  // biome-ignore format: buffer array
  const tris = new Float32Array([
    // Top face — top verts shifted by +o
    -l+o, h, -d,   -l+o, h,  d,   l+o, h,  d,
     l+o, h,  d,    l+o, h, -d,  -l+o, h, -d,

    // Back face
    -l, 0, -d,   -l+o, h, -d,   l+o, h, -d,
    l+o, h, -d,    l, 0, -d,    -l, 0, -d,

    // Bottom face — bottom verts unchanged
    -l, 0,  d,   -l, 0, -d,   l, 0, -d,
     l, 0, -d,    l, 0,  d,  -l, 0,  d,

    // Front face
    -l+o, h,  d,  -l, 0,  d,   l, 0,  d,
     l, 0,  d,    l+o, h,  d,  -l+o, h,  d,
  ]);

  // prettier-ignore
  // biome-ignore format: buffer array
  const UVs = new Float32Array([
    // Top face
    uTop, uL,   0, uL,    0, 0,
    0, 0,           uTop, 0,      uTop, uL,

    // Back face
    uBack, uL,  uTop, uL,    uTop, 0,
    uTop, 0,           uBack, 0,     uBack, uL,
    
    // Bottom face
    uBottom, uL,  uBack, uL,   uBack, 0,
    uBack, 0,         uBottom, 0,      uBottom, uL,

    // Front face
    uFront, uL, uBottom, uL,    uBottom, 0,
    uBottom, 0,     uFront, 0,    uFront, uL,
  ]);

  geometry.setAttribute("position", new THREE.BufferAttribute(tris, 3));
  geometry.setAttribute("uv", new THREE.BufferAttribute(UVs, 2));
  geometry.computeVertexNormals();

  return geometry;
}
