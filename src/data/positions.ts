// Define offset groups - objects starting with these prefixes get these offsets
export const explosionGroupOffsets: Record<string, [number, number, number]> = {
  // Foundation
  Wall_Brick_Plinth: [0, 0, 0],

  // Floor level
  Joist_Side: [-1.5, 0, 0],
  Joist_Back: [0, 0, -1.5],

  // Posts - grouped by type, all instances move same way
  Post_Front: [0, 0.3, 1.8],
  Post_Side: [-2.2, 0.3, 0],
  Post_Corner: [-1.8, 0.3, 1.2],
  Post_Inner: [0, 0.3, 0],

  // Plates
  Plate_Front: [0, 0.8, 1.8],
  Plate_Side: [-2.5, 0.8, 0],
  Plate_Back: [0, 0.8, -1.8],

  // Roof
  Rise: [0, 2, 0],
  Rafter_Common: [0, 1.5, 0],
  Rafter_Hip: [0, 1.8, 0],

  // Walls
  Studs_Vertical: [0, 0.5, 2.2],
  Studs_Bracing: [0, 0.5, 2],

  // Braces
  Brace_Knee: [0, 0.6, 1.8],
};
