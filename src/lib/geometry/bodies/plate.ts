import * as THREE from "three";

export function createMainPlateGeo(
  length: number,
  height: number,
  depth: number,
  jointSize: number,
) {
  const geometry = new THREE.BufferGeometry();

  const d = depth / 2;
  const l = length / 2 - jointSize;
  const h = height;

  const circumference = 2 * (depth + height);
  const uTop = depth / circumference;
  const uBack = (depth + height) / circumference;
  const uBottom = (2 * depth + height) / circumference;
  const uFront = 1;
  const uL = (length - 2 * jointSize) / circumference;

  // prettier-ignore
  // biome-ignore format: buffer array
  const tris = new Float32Array([
    // Top face
    -l, h, -d,  -l, h, d,   l, h, d,
    l, h, d,    l, h, -d,   -l, h, -d,

    // Back face
    -l, 0, -d,  -l, h, -d,  l, h, -d,
    l, h, -d,   l, 0, -d,   -l, 0, -d,

    // Bottom face
    -l, 0, d,   -l, 0, -d,  l, 0, -d,
    l, 0, -d,   l, 0, d,    -l, 0, d,

    // Front face
    -l, h, d,   -l, 0, d,   l, 0, d,
    l, 0, d,    l, h, d,    -l, h, d,
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
