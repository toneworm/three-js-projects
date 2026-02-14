// lib/geometry/uvUtils.ts

import { BufferAttribute, type BufferGeometry, Vector3 } from "three";

interface FaceUVConfig {
  swapUV?: boolean; // swap U and V axes (90 deg rotation)
  flipU?: boolean; // mirror horizontally
  flipV?: boolean; // mirror vertically
}

interface UVProjectionConfig {
  end?: FaceUVConfig; // plumb cut / seat cut faces
  top?: FaceUVConfig; // top and bottom faces
  side?: FaceUVConfig; // long side faces
}

function applyFaceConfig(
  rawU: number,
  rawV: number,
  faceConfig: FaceUVConfig = {},
): [number, number] {
  let u = faceConfig.swapUV ? rawV : rawU;
  let v = faceConfig.swapUV ? rawU : rawV;
  if (faceConfig.flipU) u = -u;
  if (faceConfig.flipV) v = -v;
  return [u, v];
}

export function applyPlanarUVs(
  geometry: BufferGeometry,
  texelScale: number = 0.05,
  grainAxis: Vector3 = new Vector3(1, 0, 0),
  config: UVProjectionConfig = {},
): BufferGeometry {
  const positions = geometry.attributes.position.array as Float32Array;
  const vertexCount = positions.length / 3;
  const uvs = new Float32Array(vertexCount * 2);

  // Build a coordinate frame that belongs to the timber
  // grainAxis = along the length, grainPerp = out the side, grainUp = out the top
  const up =
    Math.abs(grainAxis.y) < 0.99 ? new Vector3(0, 1, 0) : new Vector3(0, 0, 1);

  const grainPerp = new Vector3().crossVectors(grainAxis, up).normalize();
  const grainUp = new Vector3().crossVectors(grainPerp, grainAxis).normalize();

  for (let i = 0; i < vertexCount; i += 3) {
    const i9 = i * 3;

    const ax = positions[i9],
      ay = positions[i9 + 1],
      az = positions[i9 + 2];
    const bx = positions[i9 + 3],
      by = positions[i9 + 4],
      bz = positions[i9 + 5];
    const cx = positions[i9 + 6],
      cy = positions[i9 + 7],
      cz = positions[i9 + 8];

    // Two edges of this triangle
    const ex = bx - ax,
      ey = by - ay,
      ez = bz - az;
    const fx = cx - ax,
      fy = cy - ay,
      fz = cz - az;

    // Cross product of those edges gives the face normal
    const fn = new Vector3(
      ey * fz - ez * fy,
      ez * fx - ex * fz,
      ex * fy - ey * fx,
    ).normalize();

    // Dot the face normal against each timber axis
    // The highest value tells us which face type this is
    const alongGrain = Math.abs(fn.dot(grainAxis)); // high = end grain face
    const acrossGrain = Math.abs(fn.dot(grainPerp)); // high = side face
    const upGrain = Math.abs(fn.dot(grainUp)); // high = top/bottom face

    const isEndFace = alongGrain > acrossGrain && alongGrain > upGrain;
    const isTopFace = !isEndFace && upGrain >= acrossGrain;

    for (let j = 0; j < 3; j++) {
      const vi = i + j;
      const v = new Vector3(
        positions[vi * 3],
        positions[vi * 3 + 1],
        positions[vi * 3 + 2],
      );

      let u: number, uv: number;

      if (isEndFace) {
        [u, uv] = applyFaceConfig(
          v.dot(grainPerp) / texelScale,
          v.dot(grainUp) / texelScale,
          config.end,
        );
      } else if (isTopFace) {
        [u, uv] = applyFaceConfig(
          v.dot(grainAxis) / texelScale,
          v.dot(grainPerp) / texelScale,
          config.top,
        );
      } else {
        [u, uv] = applyFaceConfig(
          v.dot(grainAxis) / texelScale,
          v.dot(grainUp) / texelScale,
          config.side,
        );
      }

      uvs[vi * 2] = u;
      uvs[vi * 2 + 1] = uv;
    }
  }

  geometry.setAttribute("uv", new BufferAttribute(uvs, 2));
  return geometry;
}
