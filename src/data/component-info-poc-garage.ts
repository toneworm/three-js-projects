import type { ComponentInfo } from "@/types";

export const componentData: Record<string, ComponentInfo> = {
  Two_Bay_Garage: {
    name: "Two Bay Garage Structure",
    dimensions: "Variable",
    description:
      "Main structural frame of the two-bay garage including walls, posts, beams, and floor",
  },

  Two_Bay_Garage_Screws: {
    name: "Fixings",
    dimensions: "Various",
    description:
      "Metal screws and fixings used throughout the garage structure for joining timber components",
  },

  Window_Dormer: {
    name: "Dormer Window",
    dimensions: "Standard dormer",
    description:
      "Vertical window protruding from the roof slope, creating additional headroom and natural light",
  },

  Window_Velux: {
    name: "Velux Roof Window",
    dimensions: "Standard roof window",
    description:
      "Flush-mounted roof window installed in the plane of the roof, provides natural light without altering roofline",
  },

  Window_Velux_Glass: {
    name: "Velux Window Glass",
    dimensions: "Standard roof window",
    description: "Glass panel for the Velux roof window",
  },

  Log_Store: {
    name: "Log Store",
    dimensions: "Variable",
    description: "Storage area for logs and firewood",
  },

  Half_Hip_Roof_No_Window: {
    name: "Half Hip Roof (No Window)",
    dimensions: "Variable pitch",
    description:
      "Roof with hipped ends that are cut short, creating a small gable at the top. This variant has no window opening",
  },

  Half_Hip_Roof_With_Window: {
    name: "Half Hip Roof (With Window)",
    dimensions: "Variable pitch",
    description:
      "Roof with hipped ends that are cut short, creating a small gable at the top. This variant includes a window opening",
  },

  Hip_Roof: {
    name: "Hip Roof",
    dimensions: "Variable pitch",
    description:
      "Roof with all sides sloping down to the walls, without any vertical ends. Does not support window installation",
  },

  Gable_Roof_No_Window: {
    name: "Gable Roof (No Window)",
    dimensions: "Variable pitch",
    description:
      "Traditional roof with two sloping sides meeting at a ridge, creating triangular gables at each end. This variant has no window opening",
  },

  Gable_Roof_With_Window: {
    name: "Gable Roof (With Window)",
    dimensions: "Variable pitch",
    description:
      "Traditional roof with two sloping sides meeting at a ridge, creating triangular gables at each end. This variant includes a window opening",
  },

  Cladding: {
    name: "Cladding",
    dimensions: "Variable",
    description:
      "External cladding panels, available in multiple finishes / materials (softwood, larch, black, oak)",
  },
};
