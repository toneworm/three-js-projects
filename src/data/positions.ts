// Individual overrides (checked first)
export const explosionIndividualOffsets: Record<
  string,
  [number, number, number]
> = {
  // Foundation
  Wall_Brick_Plinth: [0, 0, 0],

  // Floor Joists
  Joist_Side: [-0.1, 0.1, 0],
  Joist_Side001: [0, 0.1, -0.1],
  Joist_Back: [0.1, 0.1, 0],

  // Posts - Front
  Post_Front_1M_Oak: [0, 0, 0],
  Post_Front_1M_Oak001: [0, 0, 0],
  Post_Front_2M_Oak: [0, 0, 0],
  Post_Front_3M_Oak: [0, 0, 0],

  // Posts - Side
  Post_Side: [0, 0.2, 0],
  Post_Side001: [0, 0.2, 0],
  Post_Side002: [0, 0.2, 0],
  Post_Side_1M: [0, 0.2, 0],

  // Posts - Corner
  Post_Corner: [0, 0.2, 0],
  Post_Corner001: [0, 0.2, 0],

  // Posts - Inner
  Post_Inner: [0, 0, 0],
  Post_Inner_2M: [0, 0, 0],

  // Plates - Front
  Plate_Front_A: [-0.25, 0.5, 0],
  Plate_Front_Z: [0, 0.5, 0],
  Plate_Front_Z001: [0.25, 0.5, 0],

  // Plates - Side
  Plate_Side_T: [-0.8, 0.9, 0],
  Plate_Side_T001: [-0.3, 0.9, 0],
  Plate_Side_T002: [0.3, 0.9, 0],
  Plate_Side_T003: [0.8, 0.9, 0],

  // Plates - Back
  Plate_Back_A: [-0.25, 0.5, 0],
  Plate_Back_Z: [0, 0.5, 0],
  Plate_Back_Z001: [0.25, 0.5, 0],

  // Ridge
  Rise: [0, 1.6, 0],

  // Rafters - Common Middle
  Rafter_Common_Middle: [-0.2, 1.35, 0],
  Rafter_Common_Middle001: [0.2, 1.35, 0],

  // Rafters - Common Outer
  Rafter_Common_Outer: [-0.2, 1.35, 0],
  Rafter_Common_Outer001: [-0.2, 1.35, 0],
  Rafter_Common_Outer002: [0.2, 1.35, 0],
  Rafter_Common_Outer003: [0.2, 1.35, 0],

  // Rafters - Common Outer Middle
  Rafter_Common_Outer_Middle: [-0.2, 1.35, 0],
  Rafter_Common_Outer_Middle001: [-0.2, 1.35, 0],
  Rafter_Common_Outer_Middle002: [0.2, 1.35, 0],
  Rafter_Common_Outer_Middle003: [0.2, 1.35, 0],

  // Rafters - Common Outer Small
  Rafter_Common_Outer_Small: [-0.2, 1.35, 0],
  Rafter_Common_Outer_Small001: [-0.2, 1.35, 0],
  Rafter_Common_Outer_Small002: [0.2, 1.35, 0],
  Rafter_Common_Outer_Small003: [0.2, 1.35, 0],

  // Rafters - Hip
  Rafter_Hip: [-0.2, 1.35, 0.4],
  Rafter_Hip001: [-0.2, 1.35, -0.4],
  Rafter_Hip002: [0.2, 1.35, 0.4],
  Rafter_Hip003: [0.2, 1.35, -0.4],

  // Studs - Vertical
  Studs_Vertical: [0.05, 0.5, -0.35],
  Studs_Vertical001: [0.05, 0.5, 0.35],
  Studs_Vertical002: [0.05, 0.5, 0.35],
  Studs_Vertical003: [0.05, 0.5, -0.35],

  // Studs - Vertical Short
  Studs_Vertical_Short: [0.05, 0.15, 0],
  Studs_Vertical_Short001: [0.05, 0.15, 0],

  // Studs - Vertical Long
  Studs_Vertical_Long: [0.05, 0.45, 0],
  Studs_Vertical_Long001: [0.05, 0.45, 0],

  // Studs - Bracing Diagonal
  Studs_Bracing_Diagonal: [0.05, 0.2, 0.15],
  Studs_Bracing_Diagonal001: [0.05, 0.2, -0.15],

  // Knee Braces
  Brace_Knee: [0.2, 0.2, 0],
  Brace_Knee001: [-0.2, 0.2, 0],
  Brace_Knee002: [0.2, 0.2, 0],
  Brace_Knee003: [-0.2, 0.2, 0],
  Brace_Knee004: [0.2, 0.2, 0],
  Brace_Knee005: [-0.2, 0.2, 0],
  Brace_Knee006: [0, 0.2, -0.2],
  Brace_Knee007: [0, 0.2, 0.2],
  Brace_Knee008: [0, 0.2, -0.2],
  Brace_Knee009: [0, 0.2, 0.2],
};

// Group fallbacks (checked if no individual match)
export const explosionGroupOffsets: Record<string, [number, number, number]> = {
  // Empty for now - add groups as needed
};
