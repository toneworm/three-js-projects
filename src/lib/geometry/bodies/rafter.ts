import * as THREE from "three";

export function createMainRafterGeo(
  height: number,
  depth: number,
  cheekAngle: number,
  run: number,
  rise: number,
) {
  const geometry = new THREE.BufferGeometry();

  const d = depth / 2;
  const l = run;
  const h = height;
  const r = rise;
  const rh = rise + height;

  const c = -Math.tan(cheekAngle) * d;
  const co = (c / run) * rise;

  // prettier-ignore
  // biome-ignore format: buffer array
  const tris = new Float32Array([
    // Top face
    0, h, -d,        0, h, d,     l+c, rh+co, d,
    l+c, rh+co, d,  l-c, rh-co, -d,  0, h, -d,

    // Back face
    0, 0, -d,        0, h, -d,    l-c, rh-co, -d,
    l-c, rh-co, -d,   l-c, r-co, -d,   0, 0, -d,

    // Bottom face
    0, 0, d, 0, 0, -d, l-c, r-co, -d,
    l-c, r-co, -d, l+c, r+co, d, 0, 0, d,

    // Front face
    0, h, d, 0, 0, d, l+c, r+co, d,
    l+c, r+co, d, l+c, rh+co, d, 0, h, d,

    // End face
    l+c, rh+co, d, l+c, r+co, d, l-c, r - co, -d,
    l-c, r - co, -d, l-c, rh - co, -d, l+c, rh+co, d
  ]);

  geometry.setAttribute("position", new THREE.BufferAttribute(tris, 3));
  geometry.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(), 2));
  geometry.computeVertexNormals();

  return geometry;
}
