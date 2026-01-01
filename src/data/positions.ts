export const explosionOffsets: Record<string, [number, number, number]> = {
  // Foundation - moves down
  Wall_Brick_Plinth: [0, -0.5, 0],

  // Floor Joists - spread outward at floor level
  Joist_Side: [-1.5, 0, 0],
  Joist_Side001: [1.5, 0, 0],
  Joist_Back: [0, 0, -1.5],

  // Posts - Front Oak - move forward and spread
  Post_Front_Oak: [-1, 0.3, 1.5],
  Post_Front_Oak001: [-0.3, 0.3, 1.5],
  Post_Front_Oak002: [0.3, 0.3, 1.5],
  Post_Front_Oak003: [1, 0.3, 1.5],

  // Posts - Sides & Corners - spread to sides
  Post_Side: [-2, 0.3, 0.5],
  Post_Side001: [-2, 0.3, -0.5],
  Post_Side002: [2, 0.3, 0.5],
  Post_Side003: [2, 0.3, -0.5],
  Post_Corner: [-1.8, 0.3, 1.2],
  Post_Corner001: [1.8, 0.3, 1.2],

  // Posts - Inner - slight outward movement
  Post_Inner: [-0.5, 0.3, 0],
  Post_Inner001: [0.5, 0.3, 0],

  // Plates - Front - move forward with height
  Plate_Front_A: [0, 0.8, 1.8],
  Plate_Front_Z: [-0.8, 0.8, 1.8],
  Plate_Front_Z001: [0.8, 0.8, 1.8],

  // Plates - Sides - spread to sides with height
  Plate_Side_T: [-2.2, 0.8, 0.8],
  Plate_Side_T001: [-2.2, 0.8, -0.8],
  Plate_Side_T002: [2.2, 0.8, 0.8],
  Plate_Side_T003: [2.2, 0.8, -0.8],

  // Plates - Back - move backward with height
  Plate_Back_A: [0, 0.8, -1.8],
  Plate_Back_Z: [-0.8, 0.8, -1.8],
  Plate_Back_Z001: [0.8, 0.8, -1.8],

  // Ridge & Rafters - roof elements move up and outward
  Rise: [0, 2, 0],
  Rafter_Common_Middle: [0, 1.5, 0.5],
  Rafter_Common_Middle001: [0, 1.5, -0.5],
  Rafter_Common_Outer: [-1.5, 1.5, 1],
  Rafter_Common_Outer001: [1.5, 1.5, 1],
  Rafter_Common_Outer002: [-1.5, 1.5, -1],
  Rafter_Common_Outer003: [1.5, 1.5, -1],
  Rafter_Common_Outer_Middle: [-1, 1.5, 0.8],
  Rafter_Common_Outer_Middle001: [1, 1.5, 0.8],
  Rafter_Common_Outer_Middle002: [-1, 1.5, -0.8],
  Rafter_Common_Outer_Middle003: [1, 1.5, -0.8],
  Rafter_Common_Outer_Small: [-0.7, 1.5, 1.2],
  Rafter_Common_Outer_Small001: [0.7, 1.5, 1.2],
  Rafter_Common_Outer_Small002: [-0.7, 1.5, -1.2],
  Rafter_Common_Outer_Small003: [0.7, 1.5, -1.2],
  Rafter_Hip: [-1.8, 1.8, 1.3],
  Rafter_Hip001: [1.8, 1.8, 1.3],
  Rafter_Hip002: [-1.8, 1.8, -1.3],
  Rafter_Hip003: [1.8, 1.8, -1.3],

  // Studwork - wall framing spreads outward
  Studs_Vertical: [0, 0.5, 2],
  Studs_Vertical001: [-2.5, 0.5, 0],
  Studs_Vertical002: [2.5, 0.5, 0],
  Studs_Vertical003: [0, 0.5, -2],
  Studs_Vertical_Short: [-1.2, 0.5, 1.5],
  Studs_Vertical_Short001: [1.2, 0.5, 1.5],
  Studs_Vertical_Long: [-1.8, 0.5, -1.2],
  Studs_Vertical_Long001: [1.8, 0.5, -1.2],
  Studs_Bracing_Diagonal: [-1.5, 0.5, 1.8],
  Studs_Bracing_Diagonal001: [1.5, 0.5, 1.8],

  // Knee Braces - structural supports spread with posts
  Brace_Knee: [-1.2, 0.6, 1.8],
  Brace_Knee001: [-0.5, 0.6, 1.8],
  Brace_Knee002: [0.5, 0.6, 1.8],
  Brace_Knee003: [1.2, 0.6, 1.8],
  Brace_Knee004: [-2.3, 0.6, 0.7],
  Brace_Knee005: [-2.3, 0.6, -0.7],
  Brace_Knee006: [2.3, 0.6, 0.7],
  Brace_Knee007: [2.3, 0.6, -0.7],
  Brace_Knee008: [-1.2, 0.6, -1.8],
  Brace_Knee009: [1.2, 0.6, -1.8],
};
