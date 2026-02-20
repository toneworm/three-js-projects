import { CladdingMaterial } from "@/types/building";

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

// Base dimension constraints (same as plinth width)
export const BASE_WIDTH_MIN = 5;
export const BASE_WIDTH_MAX = 20;

// Base fixed dimensions
export const BASE_DEPTH = 5.85;
export const BASE_HEIGHT = 0.05;

// Base defaults
export const BASE_DEFAULT_WIDTH = 10;

// Knee brace scale constraints
export const KNEE_BRACE_SCALE_MIN = 0.8;
export const KNEE_BRACE_SCALE_MAX = 2;

// Knee brace defaults
export const KNEE_BRACE_DEFAULT_SCALE = 1;

// Studding dimension constraints
export const STUDDING_WIDTH_MIN = 0.025;
export const STUDDING_WIDTH_MAX = 0.15;
export const STUDDING_HEIGHT_MIN = 0.3;
export const STUDDING_HEIGHT_MAX = 4.0;
export const STUDDING_THICKNESS_MIN = 0.015;
export const STUDDING_THICKNESS_MAX = 0.1;
export const STUDDING_PLUMB_CUT_ANGLE_MIN = -Math.PI / 4;
export const STUDDING_PLUMB_CUT_ANGLE_MAX = Math.PI / 4;

// Studding defaults
export const STUDDING_DEFAULT_WIDTH = 0.1;
export const STUDDING_DEFAULT_HEIGHT = 1.5;
export const STUDDING_DEFAULT_THICKNESS = 0.015;
export const STUDDING_DEFAULT_BOTTOM_PLUMB_CUT_ANGLE = 0;
export const STUDDING_DEFAULT_TOP_PLUMB_CUT_ANGLE = 0;

// Cladding dimension constraints
export const CLADDING_HEIGHT_MIN = 0.1;
export const CLADDING_HEIGHT_MAX = 0.1;
export const CLADDING_THICKNESS_MIN = 0.005;
export const CLADDING_THICKNESS_MAX = 0.025;
export const CLADDING_LENGTH_MIN = 0.5;
export const CLADDING_LENGTH_MAX = 5.0;
export const CLADDING_COUNT_MIN = 1;
export const CLADDING_COUNT_MAX = 10;
export const CLADDING_WEDGE_RATIO = 0.4;

// Cladding defaults
export const CLADDING_DEFAULT_HEIGHT = 0.05;
export const CLADDING_DEFAULT_THICKNESS = 0.01;
export const CLADDING_DEFAULT_LENGTH = 2.0;
export const CLADDING_DEFAULT_COUNT = 1;

// Cladding material texture paths (full paths for useTexture)
export const CLADDING_TEXTURES: Record<CladdingMaterial, string> = {
  [CladdingMaterial.Oak]: "/textures/oak_texture_1k.png",
  [CladdingMaterial.UVCheck]: "/textures/uv_texture_color.webp",
};

// Default cladding material (use the enum value string)
export const CLADDING_DEFAULT_MATERIAL: CladdingMaterial = CladdingMaterial.Oak;
