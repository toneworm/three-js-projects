import * as THREE from "three";

export function createTenonEndGeo(
  width: number,
  endSize: number,
  depth: number,
  tenonHeight: number,
  tenonWidth: number,
  tenonDepth: number,
): THREE.BufferGeometry {
  const geometry = new THREE.BufferGeometry();

  const w = width / 2;
  const d = depth / 2;
  const tw = w - tenonWidth / 2;
  const td = d - tenonDepth / 2;
  const th = endSize - tenonHeight;

  const perimeter = 2 * (width + depth);
  const uFront = width / perimeter;
  const uRight = (width + depth) / perimeter;
  const uBack = (2 * width + depth) / perimeter;
  const uLeft = 1;

  // prettier-ignore
  // biome-ignore format: buffer array
  const tris = new Float32Array([
    // Front strip
    -w, th, d, -w, 0, d, w, 0, d,
    w, 0, d, w, th, d, -w, th, d,

    // Right strip
    w, th, d, w, 0, d, w, 0, -d,
    w, 0, -d, w, th, -d, w, th, d,

    // Back strip
    w, th, -d, w, 0, -d, -w, 0, -d,
    -w, 0, -d, -w, th, -d, w, th, -d,

    // Left strip
    -w, th, -d, -w, 0, -d, -w, 0, d,
    -w, 0, d, -w, th, d, -w, th, -d,

    // Tenon front base
    -tw, th, td, -w, th, d, w, th, d,
    w, th, d, tw, th, td, -tw, th, td,

    // Tenon right base
    tw, th, td, w, th, d, w, th, -d,
    w, th, -d, tw, th, -td, tw, th, td,

    // Tenon back base
    tw, th, -td, w, th, -d, -w, th, -d,
    -w, th, -d, -tw, th, -td, tw, th, -td,

    // Tenon left base
    -tw, th, -td, -w, th, -d, -w, th, d,
    -w, th, d, -tw, th, td, -tw, th, -td,

    // Tenon front face
    -tw, endSize, td, -tw, th, td, tw, th, td,
    tw, th, td, tw, endSize, td, -tw, endSize, td,

    // Tenon right face
    tw, endSize, td, tw, th, td, tw, th, -td,
    tw, th, -td, tw, endSize, -td, tw, endSize, td,

    // Tenon back face
    tw, endSize, -td, tw, th, -td, -tw, th, -td,
    -tw, th, -td, -tw, endSize, -td, tw, endSize, -td,

    // Tenon left face
    -tw, endSize, -td, -tw, th, -td, -tw, th, td,
    -tw, th, td, -tw, endSize, td, -tw, endSize, -td,

    // Tenon top face
    -tw, endSize, -td, -tw, endSize, td, tw, endSize, td,
    tw, endSize, td, tw, endSize, -td, -tw, endSize, -td,
  ]);

  // prettier-ignore
  // biome-ignore format: buffer array
  const uvs = new Float32Array([
    // Front strip UVs
    0, th, 0, 0, uFront, 0,
    uFront, 0, uFront, th, 0, th,

    // Right strip UVs
    uFront, th, uFront, 0, uRight, 0,
    uRight, 0, uRight, th, uFront, th,

    // Back strip UVs
    uRight, th, uRight, 0, uBack, 0,
    uBack, 0, uBack, th, uRight, th,
    
    // Left strip UVs
    uBack, th, uBack, 0, uLeft, 0,
    uLeft, 0, uLeft, th, uBack, th,

    // Tenon front base UVs
    -tw, td, -w, d, w, d,
    w, d, tw, td, -tw, td,

    // Tenon right base UVs
    tw, td, w, d, w, -d,
    w, -d, tw, -td, tw, td,
    
    // Tenon back base UVs
    tw, -td, w, -d, -w, -d,
    -w, -d, -tw, -td, tw, -td,

    // Tenon left base UVs
    -tw, -td, -w, -d, -w, d,
    -w, d, -tw, td, -tw, -td,

    // Tenon front face UVs
    (uFront + uRight) / 2, endSize, (uFront + uRight) / 2, th, (uFront) / 2, th,
    (uFront) / 2, th, (uFront) / 2, endSize, (uFront + uRight) / 2, endSize,

    // Tenon right face UVs
    (uFront) / 2, endSize, (uFront) / 2, th, (uRight) / 2, th,
    (uRight) / 2, th, (uRight) / 2, endSize, (uFront) / 2, endSize,
    
    // Tenon back face UVs
    (uRight) / 2, endSize, (uRight) / 2, th, (uBack) / 2, th,
    (uBack) / 2, th, (uBack) / 2, endSize, (uRight) / 2, endSize,
    
    // Tenon left face UVs
    (uBack) / 2, endSize, (uBack) / 2, th, (uLeft) / 2, th,
    (uLeft) / 2, th, (uLeft) / 2, endSize, (uBack) / 2, endSize,

    // Tenon top face UVs
    -tw, -td, -tw, td, tw, td,
    tw, td, tw, -td, -tw, -td,
  ]);

  geometry.setAttribute("position", new THREE.BufferAttribute(tris, 3));
  geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
  geometry.computeVertexNormals();

  return geometry;
}
