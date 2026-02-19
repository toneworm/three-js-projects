// lib/geometry/bodies/plinth.ts

import * as THREE from "three";

export interface PlinthGeoResult {
  geometry: THREE.BufferGeometry;
  sideVertexCount: number;
  topVertexCount: number;
}

export function createMainPlinthGeo(
  width: number,
  depth: number,
  thickness: number,
  height: number,
): PlinthGeoResult {
  const w = width / 2;
  const d = depth / 2;
  const t = thickness;
  const h = height;
  const wt = w - t;
  const dt = -d + t;

  // prettier-ignore
  // biome-ignore format: buffer array
  const mainSideTris = [
    // Front face
    -wt, h, dt,   -wt, 0, dt,   wt, 0, dt,
     wt, 0, dt,    wt, h, dt,  -wt, h, dt,
    // Back face
    -wt, 0, -d,  -wt, h, -d,   wt, h, -d,
     wt, h, -d,   wt, 0, -d,  -wt, 0, -d,
  ];

  // prettier-ignore
  // biome-ignore format: buffer array
  const mainTopTris = [
    // Top face
    -wt, h, -d,  -wt, h, dt,   wt, h, dt,
     wt, h, dt,   wt, h, -d,  -wt, h, -d,
  ];

  // prettier-ignore
  // biome-ignore format: buffer array
  const leftSideTris = [
    // Inner right face
    -wt, h, d,   -wt, 0, d,  -wt, 0, -d,
    -wt, 0, -d,  -wt, h, -d,  -wt, h, d,
    // Outer left face
    -w, 0, d,    -w, h, d,   -w, h, -d,
    -w, h, -d,   -w, 0, -d,  -w, 0, d,
    // Front face
    -w, h, d,    -w, 0, d,   -wt, 0, d,
    -wt, 0, d,   -wt, h, d,   -w, h, d,
    // Back face
    -wt, h, -d,  -wt, 0, -d,  -w, 0, -d,
    -w,  0, -d,  -w,  h, -d,  -wt, h, -d,
  ];

  // prettier-ignore
  // biome-ignore format: buffer array
  const leftTopTris = [
    // Top face
    -w, h, d,    -wt, h, d,   -wt, h, -d,
    -wt, h, -d,  -w,  h, -d,  -w,  h, d,
  ];

  // prettier-ignore
  // biome-ignore format: buffer array
  const rightSideTris = [
    // Outer right face
    w, h, d,    w, 0, d,    w, 0, -d,
    w, 0, -d,   w, h, -d,   w, h, d,
    // Inner left face
    wt, 0, d,   wt, h, d,   wt, h, -d,
    wt, h, -d,  wt, 0, -d,  wt, 0, d,
    // Front face
    wt, h, d,   wt, 0, d,   w, 0, d,
    w,  0, d,   w,  h, d,   wt, h, d,
    // Back face
    w,  h, -d,  w,  0, -d,  wt, 0, -d,
    wt, 0, -d,  wt, h, -d,  w,  h, -d,
  ];

  // prettier-ignore
  // biome-ignore format: buffer array
  const rightTopTris = [
    // Top face
    wt, h, d,    w, h, d,    w, h, -d,
    w,  h, -d,   wt, h, -d,  wt, h, d,
  ];

  // Side faces first, top faces second — keeps material groups contiguous
  const sideTris = [...mainSideTris, ...leftSideTris, ...rightSideTris];
  const topTris = [...mainTopTris, ...leftTopTris, ...rightTopTris];

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(new Float32Array([...sideTris, ...topTris]), 3),
  );

  geometry.computeVertexNormals();

  return {
    geometry,
    sideVertexCount: sideTris.length / 3,
    topVertexCount: topTris.length / 3,
  };
}
