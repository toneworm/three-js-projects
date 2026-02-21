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
  const tw = tenonWidth / 2;
  const td = tenonDepth / 2;
  const th = endSize - tenonHeight;

  const perimeter = 2 * (width + depth);

  const uFront = width / perimeter;
  const uRight = (width + depth) / perimeter;
  const uBack = (2 * width + depth) / perimeter;
  const uLeft = 1;
  const uHeight = th / perimeter;
  const uEndSize = endSize / perimeter;
  const uTenonBase = th / perimeter;

  const uTw = tw / perimeter;
  const uTd = (td * 1.5) / perimeter; // i don't know why but this works...

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
    0, uHeight, 0, 0, uFront, 0,
    uFront, 0, uFront, uHeight, 0, uHeight,

    // Right strip UVs
    uFront, uHeight, uFront, 0, uRight, 0,
    uRight, 0, uRight, uHeight, uFront, uHeight,

    // Back strip UVs
    uRight, uHeight, uRight, 0, uBack, 0,
    uBack, 0, uBack, uHeight, uRight, uHeight,
    
    // Left strip UVs
    uBack, uHeight, uBack, 0, uLeft, 0,
    uLeft, 0, uLeft, uHeight, uBack, uHeight,

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
    uTw, uEndSize, uTw, uTenonBase, uFront - uTw, uTenonBase,
    uFront - uTw, uTenonBase, uFront - uTw, uEndSize, uTw, uEndSize,

    // Tenon right face UVs
    uFront + uTd, uEndSize, uFront + uTd, uTenonBase, uRight - uTd, uTenonBase,
    uRight - uTd, uTenonBase, uRight - uTd, uEndSize, uFront + uTd, uEndSize,

    // Tenon back face UVs
    uRight + uTw, uEndSize, uRight + uTw, uTenonBase, uBack - uTw, uTenonBase,
    uBack - uTw, uTenonBase, uBack - uTw, uEndSize, uRight + uTw, uEndSize,

    // Tenon left face UVs
    uBack + uTd, uEndSize, uBack + uTd, uTenonBase, uLeft - uTd, uTenonBase,
    uLeft - uTd, uTenonBase, uLeft - uTd, uEndSize, uBack + uTd, uEndSize,

    // Tenon top face UVs
    -tw, -td, -tw, td, tw, td,
    tw, td, tw, -td, -tw, -td,
  ]);

  geometry.setAttribute("position", new THREE.BufferAttribute(tris, 3));
  geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
  geometry.computeVertexNormals();

  return geometry;
}
