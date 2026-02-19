export const TIMBER_TEXEL_SCALE = 0.15;

// ============================================================================
// DIMENSION CONSTRAINTS (mins and maxes for clamping)
// ============================================================================

// Post dimension constraints
export const POST_WIDTH_MIN = 0.05;
export const POST_WIDTH_MAX = 0.3;
export const POST_DEPTH_MIN = 0.05;
export const POST_DEPTH_MAX = 0.3;
export const POST_HEIGHT_MIN = 1;
export const POST_HEIGHT_MAX = 5.0;

// Plate dimension constraints
export const PLATE_LENGTH_MIN = 1.0;
export const PLATE_LENGTH_MAX = 10.0;
export const PLATE_DEPTH_MIN = 0.01;
export const PLATE_DEPTH_MAX = 0.3;
export const PLATE_HEIGHT_MIN = 0.01;
export const PLATE_HEIGHT_MAX = 0.3;

// Rafter dimension constraints
export const RAFTER_DEPTH_MIN = 0.015;
export const RAFTER_DEPTH_MAX = 0.3;
export const RAFTER_HEIGHT_MIN = 0.05;
export const RAFTER_HEIGHT_MAX = 0.5;
export const RAFTER_MOUTH_SIZE_MIN = 0;
export const RAFTER_MOUTH_SIZE_MAX = 0.25;
export const RAFTER_CHEEK_ANGLE_MIN = -Math.PI / 3; // -60 degrees
export const RAFTER_CHEEK_ANGLE_MAX = Math.PI / 4; // 45 degrees
export const RAFTER_ANGLE_MIN = 0;
export const RAFTER_ANGLE_MAX = Math.PI / 3; // 60 degrees
export const RAFTER_RISE_MIN = 0.5;
export const RAFTER_RUN_MIN = 0.5;

// Joint/End constraints
export const END_SIZE_MIN_MATERIAL = 0.05; // Minimum material on either side of joint
export const TENON_MAX_RATIO = 0.8; // Tenon max 80% of post dimension

// ============================================================================
// DEFAULT VALUES (used in components)
// ============================================================================

// General defaults
export const DEFAULT_BEVEL_OFFSET = 0.015;

// Post defaults
export const POST_DEFAULT_WIDTH = 0.2;
export const POST_DEFAULT_HEIGHT = 2.4;
export const POST_DEFAULT_DEPTH = 0.2;
export const POST_DEFAULT_END_SIZE = 0.15;
export const POST_DEFAULT_BEVEL_OFFSET = DEFAULT_BEVEL_OFFSET;
export const POST_DEFAULT_TENON_HEIGHT = 0.1;
export const POST_DEFAULT_TENON_WIDTH = 0.1;
export const POST_DEFAULT_TENON_DEPTH = 0.08;

// Plate defaults
export const PLATE_DEFAULT_LENGTH = 3;
export const PLATE_DEFAULT_HEIGHT = 0.15;
export const PLATE_DEFAULT_DEPTH = 0.2;
export const PLATE_DEFAULT_JOINT_SIZE = 0.15;
export const PLATE_DEFAULT_BEVEL_OFFSET = DEFAULT_BEVEL_OFFSET;

// Rafter defaults
export const RAFTER_DEFAULT_HEIGHT = 0.25;
export const RAFTER_DEFAULT_DEPTH = 0.05;
export const RAFTER_DEFAULT_RUN = 2.25;
export const RAFTER_DEFAULT_RISE = 1.25;
export const RAFTER_DEFAULT_CHEEK_ANGLE = Math.PI / 4;
export const RAFTER_DEFAULT_MOUTH_SIZE = 0.25;
export const RAFTER_DEFAULT_UV_SCALE = 0.2;
export const BIRDSMOUTH_MAX_RATIO = 0.75;

// Plinth dimension constraints
export const PLINTH_WIDTH_MIN = 5;
export const PLINTH_WIDTH_MAX = 20;

// Plinth fixed dimensions (constants)
export const PLINTH_DEPTH = 5.85;
export const PLINTH_THICKNESS = 0.15;
export const PLINTH_HEIGHT = 0.3;

// Plinth defaults
export const PLINTH_DEFAULT_WIDTH = 10;
