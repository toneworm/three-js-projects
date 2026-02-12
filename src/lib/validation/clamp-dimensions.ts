export function clampTenonDimensions(
  bodyWidth: number,
  bodyDepth: number,
  endSize: number,
  tenonWidth: number,
  tenonDepth: number,
  tenonHeight: number,
  maxRatio = 0.8, // 80% of post dimension
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
  const clampedWidth = Math.min(Math.max(width, 0.05), 0.3);
  const clampedDepth = Math.min(Math.max(depth, 0.05), 0.3);
  const clampedHeight = Math.min(Math.max(height, 1.5), 5.0);

  if (width !== clampedWidth) {
    console.warn(`Post width ${width} clamped to ${clampedWidth} (0.05 - 0.3)`);
  }
  if (depth !== clampedDepth) {
    console.warn(`Post depth ${depth} clamped to ${clampedDepth} (0.05 - 0.3)`);
  }
  if (height !== clampedHeight) {
    console.warn(
      `Post height ${height} clamped to ${clampedHeight} (1.5 - 5.0)`,
    );
  }

  return { width: clampedWidth, height: clampedHeight, depth: clampedDepth };
}

export function clampPlateDimensions(
  length: number,
  height: number,
  depth: number,
): { length: number; height: number; depth: number } {
  const clampedLength = Math.min(Math.max(length, 1.0), 5.0);
  const clampedDepth = Math.min(Math.max(depth, 0.05), 0.3);
  const clampedHeight = Math.min(Math.max(height, 0.05), 0.3);

  if (length !== clampedLength) {
    console.warn(
      `Plate length ${length} clamped to ${clampedLength} (1.0 - 5.0)`,
    );
  }
  if (depth !== clampedDepth) {
    console.warn(
      `Plate depth ${depth} clamped to ${clampedDepth} (0.05 - 0.3)`,
    );
  }
  if (height !== clampedHeight) {
    console.warn(
      `Plate height ${height} clamped to ${clampedHeight} (0.05 - 0.3)`,
    );
  }

  return { length: clampedLength, height: clampedHeight, depth: clampedDepth };
}

export function clampEndSize(length: number, endSize: number): number {
  const maxEndSize = length / 2 - 0.05; // Ensure at least 5cm of material on either side
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
  const clampedDepth = Math.min(Math.max(depth, 0.015), 0.3);
  const clampedHeight = Math.min(Math.max(height, 0.05), 0.5);
  const clampedCheekAngle = Math.min(
    Math.max(cheekAngle, -Math.PI / 3),
    Math.PI / 4,
  );
  // TODO: needs to take angle into consideration (deeper will need a smaller maximum)
  const clampedMouthSize = Math.min(Math.max(mouthSize, 0), 0.15);
  const clampedRise = rise !== undefined ? Math.max(rise, 0) : undefined;
  const clampedRun = run !== undefined ? Math.max(run, 0) : undefined;
  const clampedAngle =
    angle !== undefined ? Math.min(Math.max(angle, 0), Math.PI / 3) : undefined;

  if (depth !== clampedDepth) {
    console.warn(
      `Rafter depth ${depth} clamped to ${clampedDepth} (0.015 - 0.3)`,
    );
  }
  if (height !== clampedHeight) {
    console.warn(
      `Rafter height ${height} clamped to ${clampedHeight} (0.05 - 0.5)`,
    );
  }
  if (cheekAngle !== clampedCheekAngle) {
    console.warn(
      `Rafter cheek angle ${cheekAngle} clamped to ${clampedCheekAngle} (-${Math.PI / 3} - ${Math.PI / 4})`,
    );
  }
  if (mouthSize !== clampedMouthSize) {
    console.warn(
      `Rafter mouth size ${mouthSize} clamped to ${clampedMouthSize} (0 - 0.15)`,
    );
  }
  if (rise !== clampedRise) {
    console.warn(`Rafter rise ${rise} clamped to ${clampedRise} (min 0)`);
  }
  if (run !== clampedRun) {
    console.warn(`Rafter run ${run} clamped to ${clampedRun} (min 0)`);
  }
  if (angle !== clampedAngle) {
    console.warn(
      `Rafter angle ${angle} clamped to ${clampedAngle} (0 - ${Math.PI / 3})`,
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
