import type { ComponentInfo } from "@/types";

export const componentData: Record<string, ComponentInfo> = {
  Wall_Brick_Plinth: {
    name: "Brick Plinth",
    dimensions: "215mm thick x 300mm high",
    description:
      "Load-bearing brick base that the entire structure sits on, runs around the perimeter",
  },

  Joist: {
    name: "Floor Joist",
    dimensions: "150mm x 50mm",
    description:
      "Horizontal beams sitting on brick wall that support the floor, spaced at regular intervals",
  },

  Post_Front: {
    name: "Front Oak Post",
    dimensions: "150mm x 150mm x 2100mm",
    description:
      "Main vertical load-bearing posts at the front, full height from ground",
  },

  Post_Side: {
    name: "Side Post",
    dimensions: "150mm x 150mm x 1800mm",
    description:
      "Vertical support posts sitting on brick plinth, slightly shorter than front posts",
  },

  Post_Corner: {
    name: "Corner Post",
    dimensions: "150mm x 150mm x 1800mm",
    description:
      "Vertical support posts sitting on brick plinth, slightly shorter than front posts",
  },

  Post_Inner: {
    name: "Inner Post",
    dimensions: "150mm x 150mm",
    description: "Internal structural posts providing additional support",
  },

  Plate_Front: {
    name: "Front Wall Plate",
    dimensions: "150mm x 150mm",
    description:
      "Horizontal beams connecting front posts at top, joined with halving joints",
  },

  Plate_Side: {
    name: "Side Wall Plate",
    dimensions: "150mm x 150mm",
    description:
      "Long horizontal beams running along sides, connect to posts with mortise and tenon",
  },

  Plate_Back: {
    name: "Back Wall Plate",
    dimensions: "150mm x 150mm",
    description: "Horizontal beams spanning back of structure",
  },

  Rafter_Common: {
    name: "Common Rafter",
    dimensions: "150mm x 50mm",
    description:
      "Standard angled roof beams at 27° pitch, run perpendicular to walls with bird's mouth joints",
  },

  Rafter_Hip: {
    name: "Hip Rafter",
    dimensions: "150mm x 50mm",
    description:
      "Diagonal corner rafters at ~20° pitch with angled cheek cuts, run from corners to ridge",
  },

  Rise: {
    name: "Ridge Board",
    dimensions: "150mm x 50mm",
    description: "Peak beam where rafters meet at top of roof",
  },

  Brace_Knee: {
    name: "Knee Brace",
    dimensions: "Curved, variable",
    description:
      "Curved diagonal corner supports between posts and plates, typically at 45°, secured with dowels",
  },

  Studs_Vertical: {
    name: "Vertical Studwork",
    dimensions: "100mm x 50mm",
    description: "Lighter vertical wall framing members for infill",
  },

  Studs_Bracing: {
    name: "Diagonal Bracing",
    dimensions: "100mm x 50mm",
    description: "Angled support members for lateral stability",
  },
};
