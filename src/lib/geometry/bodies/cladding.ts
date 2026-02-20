import { CLADDING_WEDGE_RATIO } from "@/lib/constants";
import * as THREE from "three";

export function createCladdingGeo(
  length: number,
  height: number,
  thickness: number,
) {
  const geometry = new THREE.BufferGeometry();

  const t = thickness / 2;
  const l = length / 2;
  const h = height;
  const wedgeThickness = CLADDING_WEDGE_RATIO * thickness; // wedge thickness
  const tw = -t + wedgeThickness;

  const perimeter = wedgeThickness + thickness + 2 * height;
  const uTop = wedgeThickness / perimeter;
  const uBack = (wedgeThickness + height) / perimeter;
  const uBottom = (wedgeThickness + height + thickness) / perimeter;
  const uFront = 1;
  const uL = length / perimeter;
  const uH = height / perimeter;
  const uT = thickness / perimeter;

  // prettier-ignore
  // biome-ignore format: buffer array
  const tris = new Float32Array([
    // Top face
    -l, h, -t,  -l, h, tw,   l, h, tw,
    l, h, tw,    l, h, -t,   -l, h, -t,

    // Back face
    -l, 0, -t,  -l, h, -t,  l, h, -t,
    l, h, -t,   l, 0, -t,   -l, 0, -t,

    // Bottom face
    -l, 0, t,   -l, 0, -t,  l, 0, -t,
    l, 0, -t,   l, 0, t,    -l, 0, t,

    // Front face
    -l, h, tw,   -l, 0, t,   l, 0, t,
    l, 0, t,    l, h, tw,    -l, h, tw,

    // Left face
    -l, h, -t,  -l, 0, -t,    -l, 0, t,
    -l, 0, t,   -l, h, tw,   -l, h, -t,

    // Right face
    l, h, tw,   l, 0, t,     l, 0, -t,
    l, 0, -t,   l, h, -t,    l, h, tw,
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

    // Left face
    0, uH,    0, 0,     uT, 0,
    uT, 0,    uTop, uH, 0, uH,

    // Right face
    uTop, uH,    uTop, 0,     uT, 0,
    uT, 0,       uT, uH,      uTop, uH
  ]);

  geometry.setAttribute("position", new THREE.BufferAttribute(tris, 3));
  geometry.setAttribute("uv", new THREE.BufferAttribute(UVs, 2));
  geometry.computeVertexNormals();

  return geometry;
}
