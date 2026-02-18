import {
  BIRDSMOUTH_MAX_RATIO,
  END_SIZE_MIN_MATERIAL,
  PLATE_DEFAULT_BEVEL_OFFSET,
  PLATE_DEFAULT_JOINT_SIZE,
  PLATE_DEPTH_MAX,
  PLATE_DEPTH_MIN,
  PLATE_HEIGHT_MAX,
  PLATE_HEIGHT_MIN,
  PLATE_LENGTH_MAX,
  PLATE_LENGTH_MIN,
  PLINTH_DEPTH,
  PLINTH_HEIGHT,
  PLINTH_THICKNESS,
  PLINTH_WIDTH_MAX,
  PLINTH_WIDTH_MIN,
  POST_DEPTH_MAX,
  POST_DEPTH_MIN,
  POST_HEIGHT_MAX,
  POST_HEIGHT_MIN,
  POST_WIDTH_MAX,
  POST_WIDTH_MIN,
  RAFTER_ANGLE_MAX,
  RAFTER_ANGLE_MIN,
  RAFTER_CHEEK_ANGLE_MAX,
  RAFTER_CHEEK_ANGLE_MIN,
  RAFTER_DEFAULT_CHEEK_ANGLE,
  RAFTER_DEFAULT_MOUTH_SIZE,
  RAFTER_DEPTH_MAX,
  RAFTER_DEPTH_MIN,
  RAFTER_HEIGHT_MAX,
  RAFTER_HEIGHT_MIN,
  RAFTER_MOUTH_SIZE_MAX,
  RAFTER_MOUTH_SIZE_MIN,
  RAFTER_RISE_MIN,
  RAFTER_RUN_MIN,
  TENON_MAX_RATIO,
} from "@/lib/constants";
import type {
  PlateEndStyle,
  PlateProps,
  PlinthProps,
  PostEndStyle,
  PostProps,
  RafterProps,
  ResolvedPlateGeometry,
  ResolvedPlinthGeometry,
  ResolvedPostGeometry,
  ResolvedRafterGeometry,
} from "@/types/building";
import { clamp } from "./general";

export function resolvePostGeometry(raw: PostProps): ResolvedPostGeometry {
  // ── Step 1: Primary dimensions (no dependencies) ──
  const width = clamp(raw.width, POST_WIDTH_MIN, POST_WIDTH_MAX);
  const height = clamp(raw.height, POST_HEIGHT_MIN, POST_HEIGHT_MAX);
  const depth = clamp(raw.depth, POST_DEPTH_MIN, POST_DEPTH_MAX);

  // ── Step 2: End styles ──
  const topEnd: PostEndStyle = raw.topEnd ?? "block";
  const bottomEnd: PostEndStyle = raw.bottomEnd ?? "block";

  // ── Step 3: End size (depends on height) ──
  const maxEndSize = height / 2 - END_SIZE_MIN_MATERIAL;
  const endSize = clamp(raw.endSize!, 0, maxEndSize);

  // ── Step 4: Tenon (depends on body dims + endSize) ──
  const tenonWidth = clamp(raw.tenonWidth!, 0, width * TENON_MAX_RATIO);
  const tenonDepth = clamp(raw.tenonDepth!, 0, depth * TENON_MAX_RATIO);
  const tenonHeight = clamp(raw.tenonHeight!, 0, endSize);

  // ── Step 5: Bevel — 0 (square block) to half the narrowest face ──
  const maxBevel = Math.min(width, depth) / 2;
  const bevelOffset = clamp(raw.bevelOffset ?? 0, 0, maxBevel);

  return {
    width,
    height,
    depth,
    topEnd,
    bottomEnd,
    endSize,
    tenonWidth,
    tenonDepth,
    tenonHeight,
    bevelOffset,
  };
}

export function resolvePlateGeometry(raw: PlateProps): ResolvedPlateGeometry {
  const length = clamp(raw.length, PLATE_LENGTH_MIN, PLATE_LENGTH_MAX);
  const height = clamp(raw.height, PLATE_HEIGHT_MIN, PLATE_HEIGHT_MAX);
  const depth = clamp(raw.depth, PLATE_DEPTH_MIN, PLATE_DEPTH_MAX);

  // End styles
  const leftEnd: PlateEndStyle = raw.leftEnd ?? "block";
  const rightEnd: PlateEndStyle = raw.rightEnd ?? "block";

  const maxJointSize = length / 2 - END_SIZE_MIN_MATERIAL;
  const jointSize = clamp(
    raw.jointSize ?? PLATE_DEFAULT_JOINT_SIZE,
    0,
    maxJointSize,
  );

  const maxBevel = Math.min(height, depth) / 2;
  const bevelOffset = clamp(
    raw.bevelOffset ?? PLATE_DEFAULT_BEVEL_OFFSET,
    0,
    maxBevel,
  );

  return { length, height, depth, leftEnd, rightEnd, jointSize, bevelOffset };
}

export function resolveRafterGeometry({
  run: rawRun,
  rise: rawRise,
  angle: rawAngle,
  height: rawHeight,
  depth: rawDepth,
  cheekAngle: rawCheekAngle = RAFTER_DEFAULT_CHEEK_ANGLE,
  mouthSize: rawMouthSize = RAFTER_DEFAULT_MOUTH_SIZE,
}: RafterProps): ResolvedRafterGeometry {
  // ── Step 1: Resolve the triangle (your existing 3-case logic) ──
  let run: number;
  let rise: number;
  let angle: number;

  if (rawRun !== undefined && rawRise !== undefined) {
    run = rawRun;
    rise = rawRise;
    angle = Math.atan2(rise, run);
  } else if (rawRun !== undefined && rawAngle !== undefined) {
    run = rawRun;
    angle = rawAngle;
    rise = run * Math.tan(angle);
  } else if (rawRise !== undefined && rawAngle !== undefined) {
    rise = rawRise;
    angle = rawAngle;
    run = rise / Math.tan(angle);
  } else {
    throw new Error(
      "At least two of run, rise, and angle must be provided to resolve rafter geometry.",
    );
  }

  // ── Step 2: Clamp angle, preserve run, re-derive rise ──
  const clampedAngle = clamp(angle, RAFTER_ANGLE_MIN, RAFTER_ANGLE_MAX);

  if (clampedAngle !== angle) {
    angle = clampedAngle;
    // Run is architecturally primary (bay spacing), so rise absorbs the correction
    rise = run * Math.tan(angle);
  }

  // ── Step 3: Enforce run/rise minimums ──
  run = Math.max(run, RAFTER_RUN_MIN);
  rise = Math.max(rise, RAFTER_RISE_MIN);

  // Re-derive angle from authoritative run/rise, then re-clamp
  // (edge case: if both minimums kicked in, the ratio may have shifted)
  angle = Math.atan2(rise, run);
  angle = clamp(angle, RAFTER_ANGLE_MIN, RAFTER_ANGLE_MAX);

  // If angle got clamped again, rise adjusts one final time
  rise = run * Math.tan(angle);

  const length = Math.sqrt(run ** 2 + rise ** 2);

  // ── Step 4: Cross-section (independent) ──
  const height = clamp(rawHeight, RAFTER_HEIGHT_MIN, RAFTER_HEIGHT_MAX);
  const depth = clamp(rawDepth, RAFTER_DEPTH_MIN, RAFTER_DEPTH_MAX);

  // ── Step 5: Birdsmouth — dynamic max from resolved height ──
  const maxMouthSize = Math.min(
    Math.tan(Math.PI / 2 - angle) * height * BIRDSMOUTH_MAX_RATIO,
    RAFTER_MOUTH_SIZE_MAX,
  );

  const mouthSize = clamp(rawMouthSize, RAFTER_MOUTH_SIZE_MIN, maxMouthSize);

  // ── Step 6: Cheek angle (isolated, top end) ──
  const cheekAngle = clamp(
    rawCheekAngle,
    RAFTER_CHEEK_ANGLE_MIN,
    RAFTER_CHEEK_ANGLE_MAX,
  );

  return { run, rise, angle, length, height, depth, mouthSize, cheekAngle };
}

export function resolvePlinthGeometry(raw: PlinthProps): ResolvedPlinthGeometry {
  // Width is the only dynamic dimension, clamped between 5 and 20
  const width = clamp(raw.width, PLINTH_WIDTH_MIN, PLINTH_WIDTH_MAX);

  // Fixed dimensions
  const depth = PLINTH_DEPTH;
  const thickness = PLINTH_THICKNESS;
  const height = PLINTH_HEIGHT;

  return { width, depth, thickness, height };
}
