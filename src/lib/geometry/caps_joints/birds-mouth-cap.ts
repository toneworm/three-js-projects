import * as THREE from "three";

export function createBirdsMouthEndGeo(
  mouthSize: number,
  height: number,
  depth: number,
  angle: number,
  run: number,
  rise: number,
) {
  const geometry = new THREE.BufferGeometry();

  const d = depth / 2;
  const slopeRatio = rise / run;
  const l = mouthSize;
  const h = height;
  const ho = l * slopeRatio;
  const hs = h - ho;
  const hsl = hs - h;

  const lm = mouthSize / 2;
  const hm = h - (lm + l) * slopeRatio;
  const hml = hm - h;
  const he = h - 2 * l * slopeRatio;

  console.log({
    hs,
    ho,
    hsl,
    h,
    slopeRatio,
    l,
    angle,
    run,
    rise,
    mouthSize,
  });

  // prettier-ignore
  // biome-ignore format: buffer array
  const trisMouth = [
    // Back face
    0, 0, -d,   0, hs, -d,  l, h, -d,
    l, h, -d,   l, 0, -d,   0, 0, -d,

    // Bottom face
    0, 0, d,    0, 0, -d,   l, 0, -d,
    l, 0, -d,   l, 0, d,    0, 0, d,

    // Front face
    0, hs, d,   0, 0, d,   l, 0, d,
    l, 0, d,   l, h, d,   0, hs, d,
  ];

  // prettier-ignore
  // biome-ignore format: buffer array
  const trisMiddle = [
    // Back face
    -lm, hml, -d,   -lm, hm, -d,  0, hs, -d,
    0, hs, -d,   0, hsl, -d,   -lm, hml, -d,

    // Bottom face
    -lm, hml, d,   -lm, hml, -d,  0, hsl, -d,
    0, hsl, -d,  0, hsl, d,  -lm, hml, d,

    // Front face
    -lm, hm, d, -lm, hml, d,  0, hsl, d,
    0, hsl, d,  0, hs, d,  -lm, hm, d,

    // Right face
    0, 0, d,    0, hsl, d,  0, hsl, -d,
    0, hsl, -d,  0, 0, -d,  0, 0, d,
  ];

  // prettier-ignore
  // biome-ignore format: buffer array
  const trisEnd: number[] = [
    // Back face
    -l, hml, -d,  -l, he, -d,   -lm, hm, -d,
    -lm, hm, -d,  -lm, hml, -d, -l, hml, -d,
    
    // Bottom face
    -l, hml, d,   -l, hml, -d,  -lm, hml, -d,
    -lm, hml, -d,  -lm, hml, d,  -l, hml, d,

    // Front face
    -l, he, d,    -l, hml, d,  -lm, hml, d,
    -lm, hml, d,  -lm, hm, d,  -l, he, d,

    // End face
    -l, he, -d,   -l, hml, -d, -l, hml, d,
    -l, hml, d,   -l, he, d,   -l, he, -d,
  ];

  // prettier-ignore
  // biome-ignore format: buffer array
  const trisTop = [
    // Top face over all of birds mouth cap
    -l, he, -d,   -l, he, d,   l, h, d,
    l, h, d,   l, h, -d,   -l, he, -d,
  ]

  const perimeter = 2 * (depth + height);
  const uLength = mouthSize / perimeter;
  const uTop = depth / perimeter;
  const uBack = (depth + height) / perimeter;
  const uBottom = (2 * depth + height) / perimeter;
  const uFront = 1;
  const uRise = rise / perimeter;
  const uRun = run / perimeter;
  const uOffset = Math.tan(angle) * (height / perimeter);

  const uH = h / perimeter;
  const uHo = ho / perimeter;
  const uHs = hs / perimeter;
  const uHsl = hsl / perimeter;

  const uLm = lm / perimeter;
  const uHm = hm / perimeter;
  const uHml = hml / perimeter;
  const uHe = he / perimeter;

  const uSlope1 = Math.sqrt((h - hs) ** 2 + l ** 2) / perimeter;

  // prettier-ignore
  // biome-ignore format: buffer array
  const uvsMouth = [
    // Back face
    uBack, uSlope1, uBack + 0.05, uSlope1 + 0.05, uBottom, uSlope1 / 4,
    // uBottom, uSlope1 / 3, uBack + 0.05, uSlope1 + 0.05, uBack, uSlope1,

    // Bottom face
    

    // Front face
  ];

  // prettier-ignore
  // biome-ignore format: buffer array
  const uvsMiddle: number[] = [];

  // prettier-ignore
  // biome-ignore format: buffer array
  const uvsEnd: number[] = [];

  // prettier-ignore
  // biome-ignore format: buffer array
  const uvsTop: number[] = [];

  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(
      new Float32Array([...trisMouth, ...trisMiddle, ...trisEnd, ...trisTop]),
      3,
    ),
  );
  geometry.setAttribute(
    "uv",
    new THREE.BufferAttribute(
      new Float32Array([...uvsMouth, ...uvsMiddle, ...uvsEnd, ...uvsTop]),
      2,
    ),
  );
  geometry.computeVertexNormals();

  return geometry;
}
