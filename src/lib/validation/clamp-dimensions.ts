export function clampTenonDimensions(
  postWidth: number,
  postDepth: number,
  tenonWidth: number,
  tenonDepth: number,
  maxRatio = 0.8, // 80% of post dimension
): { tenonWidth: number; tenonDepth: number } {
  const maxTenonWidth = postWidth * maxRatio;
  const maxTenonDepth = postDepth * maxRatio;

  const clampedWidth = Math.min(tenonWidth, maxTenonWidth);
  const clampedDepth = Math.min(tenonDepth, maxTenonDepth);

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

  return { tenonWidth: clampedWidth, tenonDepth: clampedDepth };
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

export function clampJointSize(length: number, jointSize: number): number {
  const maxJointSize = length / 2 - 0.05; // Ensure at least 5cm of material on either side
  const clampedJointSize = Math.min(jointSize, maxJointSize);

  if (jointSize !== clampedJointSize) {
    console.warn(
      `Joint size ${jointSize} clamped to ${clampedJointSize} (max ${maxJointSize})`,
    );
  }

  return clampedJointSize;
}
