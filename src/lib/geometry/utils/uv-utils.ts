// lib/geometry/utils/uv-utils.ts

import { BufferAttribute, type BufferGeometry, Vector3 } from "three";

// ─── Types ───────────────────────────────────────────────────────────────────

interface FaceUVConfig {
  swapUV?: boolean; // 90° rotation
  flipU?: boolean; // mirror horizontally
  flipV?: boolean; // mirror vertically
}

interface UVProjectionConfig {
  end?: FaceUVConfig; // plumb cut / seat cut / front+back wall faces
  top?: FaceUVConfig; // top faces
  side?: FaceUVConfig; // long side faces
}

interface UVScales {
  uScale: number; // horizontal repeat in metres
  vScale: number; // vertical repeat in metres
}

// ─── Internal helpers ────────────────────────────────────────────────────────

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

// ─── Core triplanar function ──────────────────────────────────────────────────

/**
 * Applies triplanar UV projection using explicit orthonormal axes.
 * Face classification is done by dotting each face normal against the three
 * provided axes — the winning axis determines projection plane.
 *
 * @param primaryAxis  The axis face normals align with for "end" faces
 *                     (grain direction for timber, world Z for brick walls)
 * @param perpAxis     The axis face normals align with for "side" faces
 * @param upAxis       The axis face normals align with for "top" faces
 * @param scales       Separate U and V tiling scales in metres
 */
export function applyTriplanarUVs(
  geometry: BufferGeometry,
  primaryAxis: Vector3,
  perpAxis: Vector3,
  upAxis: Vector3,
  scales: UVScales,
  config: UVProjectionConfig = {},
): BufferGeometry {
  const positions = geometry.attributes.position.array as Float32Array;
  const vertexCount = positions.length / 3;
  const uvs = new Float32Array(vertexCount * 2);

  // Reusable vectors — allocated once to avoid GC pressure in the hot loop
  const vertexA = new Vector3();
  const vertexB = new Vector3();
  const vertexC = new Vector3();
  const edgeAB = new Vector3();
  const edgeAC = new Vector3();
  const faceNormal = new Vector3();
  const vertex = new Vector3();

  const { uScale, vScale } = scales;

  for (let i = 0; i < vertexCount; i += 3) {
    const i9 = i * 3;

    vertexA.fromArray(positions, i9);
    vertexB.fromArray(positions, i9 + 3);
    vertexC.fromArray(positions, i9 + 6);

    edgeAB.subVectors(vertexB, vertexA);
    edgeAC.subVectors(vertexC, vertexA);

    faceNormal.crossVectors(edgeAB, edgeAC).normalize();

    // Classify face by which axis its normal most aligns with
    const primaryDot = faceNormal.dot(primaryAxis);
    const perpDot = faceNormal.dot(perpAxis);
    const upDot = faceNormal.dot(upAxis);

    const alongPrimary = Math.abs(primaryDot);
    const alongPerp = Math.abs(perpDot);
    const alongUp = Math.abs(upDot);

    const isEndFace = alongPrimary > alongPerp && alongPrimary > alongUp;
    const isTopFace = !isEndFace && alongUp >= alongPerp;

    // Sign tells us which direction the face is pointing
    // Negative-facing faces need U flipped so texture reads correctly from outside
    const primarySign = primaryDot >= 0 ? 1 : -1;
    const perpSign = perpDot >= 0 ? 1 : -1;

    for (let j = 0; j < 3; j++) {
      const vi = i + j;
      vertex.fromArray(positions, vi * 3);

      let u: number, v: number;

      if (isEndFace) {
        [u, v] = applyFaceConfig(
          (vertex.dot(perpAxis) / uScale) * primarySign,
          vertex.dot(upAxis) / vScale,
          config.end,
        );
      } else if (isTopFace) {
        [u, v] = applyFaceConfig(
          vertex.dot(primaryAxis) / uScale,
          vertex.dot(perpAxis) / uScale,
          config.top,
        );
      } else {
        [u, v] = applyFaceConfig(
          (vertex.dot(primaryAxis) / uScale) * perpSign,
          vertex.dot(upAxis) / vScale,
          config.side,
        );
      }

      uvs[vi * 2] = u;
      uvs[vi * 2 + 1] = v;
    }
  }

  geometry.setAttribute("uv", new BufferAttribute(uvs, 2));
  return geometry;
}

// ─── Timber wrapper ───────────────────────────────────────────────────────────

/**
 * Builds a timber-oriented coordinate frame from the grain direction,
 * then delegates to applyTriplanarUVs. Used for rafters, posts, beams etc.
 * Single texelScale maps to both U and V (wood grain tiles uniformly).
 */
export function applyPlanarUVs(
  geometry: BufferGeometry,
  texelScale: number = 0.05,
  grainAxis: Vector3 = new Vector3(1, 0, 0),
  config: UVProjectionConfig = {},
): BufferGeometry {
  // Bootstrap vector — switch to Z if grainAxis is nearly vertical
  // to avoid a degenerate (near-zero) cross product
  const worldUp =
    Math.abs(grainAxis.y) < 0.99 ? new Vector3(0, 1, 0) : new Vector3(0, 0, 1);

  const grainPerp = new Vector3().crossVectors(grainAxis, worldUp).normalize();
  const grainUp = new Vector3().crossVectors(grainPerp, grainAxis).normalize();

  return applyTriplanarUVs(
    geometry,
    grainAxis,
    grainPerp,
    grainUp,
    { uScale: texelScale, vScale: texelScale },
    config,
  );
}

// ─── Brick UV projection ──────────────────────────────────────────────────────

// Each entry defines a face direction and the correct U/V projection axes
// as seen from outside the geometry looking in.
// This avoids the sign-patching problem — each of the 6 face directions
// gets its own explicitly correct axes rather than trying to derive them.
const BRICK_FACE_PROJECTIONS = [
  {
    normal: new Vector3(0, 0, 1),
    uDir: new Vector3(1, 0, 0),
    vDir: new Vector3(0, 1, 0),
  }, // front  +Z
  {
    normal: new Vector3(0, 0, -1),
    uDir: new Vector3(-1, 0, 0),
    vDir: new Vector3(0, 1, 0),
  }, // back   -Z
  {
    normal: new Vector3(1, 0, 0),
    uDir: new Vector3(0, 0, -1),
    vDir: new Vector3(0, 1, 0),
  }, // right  +X
  {
    normal: new Vector3(-1, 0, 0),
    uDir: new Vector3(0, 0, 1),
    vDir: new Vector3(0, 1, 0),
  }, // left   -X
  {
    normal: new Vector3(0, 1, 0),
    uDir: new Vector3(1, 0, 0),
    vDir: new Vector3(0, 0, -1),
  }, // top    +Y
  {
    normal: new Vector3(0, -1, 0),
    uDir: new Vector3(1, 0, 0),
    vDir: new Vector3(0, 0, 1),
  }, // bottom -Y
] as const;

/**
 * Applies brick UV projection using explicit per-face-direction axes.
 * Each of the 6 world-facing directions has its own correct U/V axes defined
 * upfront — no sign patching, no mirroring artifacts.
 * texelScale controls tiling density — tune until one brick repeat = one real brick.
 */
export function applyBrickUVs(
  geometry: BufferGeometry,
  texelScale: number = 1,
): BufferGeometry {
  const positions = geometry.attributes.position.array as Float32Array;
  const vertexCount = positions.length / 3;
  const uvs = new Float32Array(vertexCount * 2);

  const vertexA = new Vector3();
  const vertexB = new Vector3();
  const vertexC = new Vector3();
  const edgeAB = new Vector3();
  const edgeAC = new Vector3();
  const faceNormal = new Vector3();
  const vertex = new Vector3();

  for (let i = 0; i < vertexCount; i += 3) {
    const i9 = i * 3;

    vertexA.fromArray(positions, i9);
    vertexB.fromArray(positions, i9 + 3);
    vertexC.fromArray(positions, i9 + 6);

    edgeAB.subVectors(vertexB, vertexA);
    edgeAC.subVectors(vertexC, vertexA);

    faceNormal.crossVectors(edgeAB, edgeAC).normalize();

    // Find which of the 6 face directions this triangle most aligns with
    let bestDot = -Infinity;
    let bestFace = BRICK_FACE_PROJECTIONS[0];

    for (const face of BRICK_FACE_PROJECTIONS) {
      const d = faceNormal.dot(face.normal);
      if (d > bestDot) {
        bestDot = d;
        bestFace = face;
      }
    }

    for (let j = 0; j < 3; j++) {
      const vi = i + j;
      vertex.fromArray(positions, vi * 3);

      uvs[vi * 2] = vertex.dot(bestFace.uDir) / texelScale;
      uvs[vi * 2 + 1] = vertex.dot(bestFace.vDir) / texelScale;
    }
  }

  geometry.setAttribute("uv", new BufferAttribute(uvs, 2));
  return geometry;
}
