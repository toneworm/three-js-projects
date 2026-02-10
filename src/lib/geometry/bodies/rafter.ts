import * as THREE from "three";

export function createMainRafterGeo(
  height: number,
  depth: number,
  plumbAngle: number,
  cheekAngle: number,
  run: number,
  rise: number,
  length: number,
) {
  const geometry = new THREE.BufferGeometry();

  const d = depth / 2;
  const l = run / 2;
  const h = height;
  const r = rise;
  const rh = rise + height;

  const c = -Math.tan(cheekAngle) * d;
  const co = (c / run) * rise;

  const perimeter = 2 * (depth + height);
  const uLength = length / perimeter;
  const uDepth = depth / perimeter;

  const uTop = depth / perimeter;
  const uBack = (depth + height) / perimeter;
  const uBottom = (2 * depth + height) / perimeter;
  const uFront = 1;
  const uRise = rise / perimeter;
  const uRun = run / perimeter;
  const uC = c / perimeter;

  const uOffset = Math.tan(plumbAngle) * (height / perimeter);

  console.log(rh);

  console.log("deg angle", (cheekAngle / (2 * Math.PI)) * 360);

  // prettier-ignore
  // biome-ignore format: buffer array
  const tris = new Float32Array([
    // Top face
    -l, h, -d,        -l, h, d,     l+c, rh+co, d,
    l+c, rh+co, d,  l-c, rh-co, -d,  -l, h, -d,

    // Back face
    -l, 0, -d,        -l, h, -d,    l-c, rh-co, -d,
    l-c, rh-co, -d,   l-c, r-co, -d,   -l, 0, -d,

    // Bottom face
    -l, 0, d, -l, 0, -d, l-c, r-co, -d,
    l-c, r-co, -d, l+c, r+co, d, -l, 0, d,

    // Front face
    -l, h, d, -l, 0, d, l+c, r+co, d,
    l+c, r+co, d, l+c, rh+co, d, -l, h, d,

    // End face
    l+c, rh + co, d, l+c, r + co, d, l-c, r - co, -d,
    l-c, r - co, -d, l-c, rh - co, -d, l+c, rh + co, d

  ]);

  // prettier-ignore
  // biome-ignore format: buffer array
  const UVs = new Float32Array([
    // Top face
    uTop, uLength,   0, uLength,    0, -uC,
    0, -uC,           uTop, uC,      uTop, uLength,

    // Back face
    uBack, uLength,  uTop, uLength - uOffset,    uTop, 0,
    uTop, 0,           uBack, uOffset,     uBack, uLength,
    
    // Bottom face
    uBottom, uLength,  uBack, uLength,   uBack, uC,
    uBack, uC,         uBottom, -uC,      uBottom, uLength,

    // Front face
    uFront, uLength, uBottom, uLength + uOffset,    uBottom, c,
    uBottom, c,     uFront, -uOffset,    uFront, uLength,

    // End face
    0, 0, run, 0, run, uBack,
    run, uBack, 0, uBack, 0, 0,
  ]);

  geometry.setAttribute("position", new THREE.BufferAttribute(tris, 3));
  geometry.setAttribute("uv", new THREE.BufferAttribute(UVs, 2));
  geometry.computeVertexNormals();

  return geometry;
}
