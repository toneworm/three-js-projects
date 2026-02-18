import * as THREE from "three";

/**
 * Creates a plinth geometry (cuboid with no ends - open on left and right sides)
 * The plinth has 4 faces: front, back, top, bottom (no left/right end caps)
 */
export function createMainPlinthGeo(
  width: number,
  depth: number,
  thickness: number,
  height: number,
): THREE.BufferGeometry {
  const geometry = new THREE.BufferGeometry();

  const w = width / 2;
  const d = depth / 2;
  const t = thickness / 2;

  // UV calculations based on perimeter of cross-section (height x depth)
  const perimeter = 2 * (height + depth);
  const uFront = depth / perimeter;
  const uBottom = (depth + height) / perimeter;
  const uBack = (2 * depth + height) / perimeter;
  const uTop = 1;
  const vWidth = width / perimeter;

  // 4 faces: front, bottom, back, top (no ends)
  // Each face has 2 triangles = 6 vertices
  // prettier-ignore
  // biome-ignore format: buffer array
  const tris = new Float32Array([
    // Front face (facing +z)
    -w, 0, d,  w, 0, d,  w, height, d,
    w, height, d,  -w, height, d,  -w, 0, d,

    // Bottom face (facing -y)
    -w, 0, -d,  w, 0, -d,  w, 0, d,
    w, 0, d,  -w, 0, d,  -w, 0, -d,

    // Back face (facing -z)
    w, 0, -d,  -w, 0, -d,  -w, height, -d,
    -w, height, -d,  w, height, -d,  w, 0, -d,

    // Top face (facing +y)
    -w, height, d,  w, height, d,  w, height, -d,
    w, height, -d,  -w, height, -d,  -w, height, d,
  ]);

  // UVs - grain runs along the width (x-axis)
  // prettier-ignore
  // biome-ignore format: buffer array
  const uvs = new Float32Array([
    // Front face
    0, 0,  vWidth, 0,  vWidth, uFront,
    vWidth, uFront,  0, uFront,  0, 0,

    // Bottom face
    0, uFront,  vWidth, uFront,  vWidth, uBottom,
    vWidth, uBottom,  0, uBottom,  0, uFront,

    // Back face
    0, uBottom,  vWidth, uBottom,  vWidth, uBack,
    vWidth, uBack,  0, uBack,  0, uBottom,

    // Top face
    0, uBack,  vWidth, uBack,  vWidth, uTop,
    vWidth, uTop,  0, uTop,  0, uBack,
  ]);

  geometry.setAttribute("position", new THREE.BufferAttribute(tris, 3));
  geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
  geometry.computeVertexNormals();

  return geometry;
}
