import {
  POST_WIDTH_MIN,
  POST_WIDTH_MAX,
  POST_DEPTH_MIN,
  POST_DEPTH_MAX,
  POST_HEIGHT_MIN,
  POST_HEIGHT_MAX,
  PLATE_LENGTH_MIN,
  PLATE_LENGTH_MAX,
  PLATE_DEPTH_MIN,
  PLATE_DEPTH_MAX,
  PLATE_HEIGHT_MIN,
  PLATE_HEIGHT_MAX,
  RAFTER_DEPTH_MIN,
  RAFTER_DEPTH_MAX,
  RAFTER_HEIGHT_MIN,
  RAFTER_HEIGHT_MAX,
  RAFTER_MOUTH_SIZE_MIN,
  RAFTER_MOUTH_SIZE_MAX,
  RAFTER_CHEEK_ANGLE_MIN,
  RAFTER_CHEEK_ANGLE_MAX,
  RAFTER_ANGLE_MIN,
  RAFTER_ANGLE_MAX,
  RAFTER_RISE_MIN,
  RAFTER_RUN_MIN,
  END_SIZE_MIN_MATERIAL,
  TENON_MAX_RATIO,
} from "@/lib/constants";

export function clampTenonDimensions(
  bodyWidth: number,
  bodyDepth: number,
  endSize: number,
  tenonWidth: number,
  tenonDepth: number,
  tenonHeight: number,
  maxRatio = TENON_MAX_RATIO,
): { tenonWidth: number; tenonDepth: number; tenonHeight: number } {
  const maxTenonWidth = bodyWidth * maxRatio;
  const maxTenonDepth = bodyDepth * maxRatio;
  const maxTenonHeight = endSize;

  const clampedWidth = Math.min(tenonWidth, maxTenonWidth);
  const clampedDepth = Math.min(tenonDepth, maxTenonDepth);
  const clampedHeight = Math.min(tenonHeight, maxTenonHeight);

  if (tenonWidth !== clampedWidth) {
    console.warn(
      `Tenon width ${tenonWidth} clamped to ${clampedWidth} (max ${maxRatio * 100}% of post width)`,
    );
  }
  if (tenonDepth !== clampedDepth) {
    console.warn(
      `Tenon depth ${tenonDepth} clamped to ${clampedDepth} (max ${maxRatio * 100}% of post depth)`,
    );
  }
  if (tenonHeight !== clampedHeight) {
    console.warn(
      `Tenon height ${tenonHeight} clamped to ${clampedHeight} (max ${maxTenonHeight})`,
    );
  }

  return {
    tenonWidth: clampedWidth,
    tenonDepth: clampedDepth,
    tenonHeight: clampedHeight,
  };
}

export function clampPostDimensions(
  width: number,
  height: number,
  depth: number,
): { width: number; height: number; depth: number } {
  const clampedWidth = Math.min(Math.max(width, POST_WIDTH_MIN), POST_WIDTH_MAX);
  const clampedDepth = Math.min(Math.max(depth, POST_DEPTH_MIN), POST_DEPTH_MAX);
  const clampedHeight = Math.min(Math.max(height, POST_HEIGHT_MIN), POST_HEIGHT_MAX);

  if (width !== clampedWidth) {
    console.warn(`Post width ${width} clamped to ${clampedWidth} (${POST_WIDTH_MIN} - ${POST_WIDTH_MAX})`);
  }
  if (depth !== clampedDepth) {
    console.warn(`Post depth ${depth} clamped to ${clampedDepth} (${POST_DEPTH_MIN} - ${POST_DEPTH_MAX})`);
  }
  if (height !== clampedHeight) {
    console.warn(
      `Post height ${height} clamped to ${clampedHeight} (${POST_HEIGHT_MIN} - ${POST_HEIGHT_MAX})`,
    );
  }

  return { width: clampedWidth, height: clampedHeight, depth: clampedDepth };
}

export function clampPlateDimensions(
  length: number,
  height: number,
  depth: number,
): { length: number; height: number; depth: number } {
  const clampedLength = Math.min(Math.max(length, PLATE_LENGTH_MIN), PLATE_LENGTH_MAX);
  const clampedDepth = Math.min(Math.max(depth, PLATE_DEPTH_MIN), PLATE_DEPTH_MAX);
  const clampedHeight = Math.min(Math.max(height, PLATE_HEIGHT_MIN), PLATE_HEIGHT_MAX);

  if (length !== clampedLength) {
    console.warn(
      `Plate length ${length} clamped to ${clampedLength} (${PLATE_LENGTH_MIN} - ${PLATE_LENGTH_MAX})`,
    );
  }
  if (depth !== clampedDepth) {
    console.warn(
      `Plate depth ${depth} clamped to ${clampedDepth} (${PLATE_DEPTH_MIN} - ${PLATE_DEPTH_MAX})`,
    );
  }
  if (height !== clampedHeight) {
    console.warn(
      `Plate height ${height} clamped to ${clampedHeight} (${PLATE_HEIGHT_MIN} - ${PLATE_HEIGHT_MAX})`,
    );
  }

  return { length: clampedLength, height: clampedHeight, depth: clampedDepth };
}

export function clampEndSize(length: number, endSize: number): number {
  const maxEndSize = length / 2 - END_SIZE_MIN_MATERIAL;
  const clampedEndSize = Math.min(endSize, maxEndSize);

  if (endSize !== clampedEndSize) {
    console.warn(
      `End / Joint size ${endSize} clamped to ${clampedEndSize} (max ${maxEndSize})`,
    );
  }

  return clampedEndSize;
}

export function clampRafterDimensions(
  height: number,
  depth: number,
  cheekAngle: number,
  mouthSize: number,
  rise?: number,
  run?: number,
  angle?: number,
): {
  height: number;
  depth: number;
  cheekAngle: number;
  mouthSize: number;
  clampedRise?: number;
  clampedRun?: number;
  clampedAngle?: number;
} {
  const clampedDepth = Math.min(Math.max(depth, RAFTER_DEPTH_MIN), RAFTER_DEPTH_MAX);
  const clampedHeight = Math.min(Math.max(height, RAFTER_HEIGHT_MIN), RAFTER_HEIGHT_MAX);
  const clampedCheekAngle = Math.min(
    Math.max(cheekAngle, RAFTER_CHEEK_ANGLE_MIN),
    RAFTER_CHEEK_ANGLE_MAX,
  );
  // TODO: needs to take angle into consideration (deeper will need a smaller maximum)
  const clampedMouthSize = Math.min(Math.max(mouthSize, RAFTER_MOUTH_SIZE_MIN), RAFTER_MOUTH_SIZE_MAX);
  const clampedRise = rise !== undefined ? Math.max(rise, RAFTER_RISE_MIN) : undefined;
  const clampedRun = run !== undefined ? Math.max(run, RAFTER_RUN_MIN) : undefined;
  const clampedAngle =
    angle !== undefined ? Math.min(Math.max(angle, RAFTER_ANGLE_MIN), RAFTER_ANGLE_MAX) : undefined;

  if (depth !== clampedDepth) {
    console.warn(
      `Rafter depth ${depth} clamped to ${clampedDepth} (${RAFTER_DEPTH_MIN} - ${RAFTER_DEPTH_MAX})`,
    );
  }
  if (height !== clampedHeight) {
    console.warn(
      `Rafter height ${height} clamped to ${clampedHeight} (${RAFTER_HEIGHT_MIN} - ${RAFTER_HEIGHT_MAX})`,
    );
  }
  if (cheekAngle !== clampedCheekAngle) {
    console.warn(
      `Rafter cheek angle ${cheekAngle} clamped to ${clampedCheekAngle} (${RAFTER_CHEEK_ANGLE_MIN} - ${RAFTER_CHEEK_ANGLE_MAX})`,
    );
  }
  if (mouthSize !== clampedMouthSize) {
    console.warn(
      `Rafter mouth size ${mouthSize} clamped to ${clampedMouthSize} (${RAFTER_MOUTH_SIZE_MIN} - ${RAFTER_MOUTH_SIZE_MAX})`,
    );
  }
  if (rise !== clampedRise) {
    console.warn(`Rafter rise ${rise} clamped to ${clampedRise} (min ${RAFTER_RISE_MIN})`);
  }
  if (run !== clampedRun) {
    console.warn(`Rafter run ${run} clamped to ${clampedRun} (min ${RAFTER_RUN_MIN})`);
  }
  if (angle !== clampedAngle) {
    console.warn(
      `Rafter angle ${angle} clamped to ${clampedAngle} (${RAFTER_ANGLE_MIN} - ${RAFTER_ANGLE_MAX})`,
    );
  }

  return {
    height: clampedHeight,
    depth: clampedDepth,
    cheekAngle: clampedCheekAngle,
    mouthSize: clampedMouthSize,
    clampedRise,
    clampedRun,
    clampedAngle,
  };
}
