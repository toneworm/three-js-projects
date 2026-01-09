export type GarageFormState = {
  roofType: "gable" | "halfHip" | "hip";
  windowType: "none" | "dormer" | "velux";
  logStoreLeft: boolean;
  logStoreRight: boolean;
  claddingType: "none" | "softwood" | "larch" | "black" | "oak";
};

export type GarageComponent =
  | "Two_Bay_Garage"
  | "Window_Dormer"
  | "Window_Velux"
  | "Log_Store_R"
  | "Log_Store_L"
  | "Half_Hip_Roof_No_Window"
  | "Hip_Roof"
  | "Gable_Roof_No_Window"
  | "Gable_Roof_With_Window"
  | "Half_Hip_Roof_With_Window"
  | "Cladding_L"
  | "Cladding_R"
  | "Cladding_Posts_L"
  | "Cladding_Posts_R";

export type MaterialType = "default" | "softwood" | "larch" | "black" | "oak";

export type GarageComponentWithMaterial = {
  name: GarageComponent;
  material: MaterialType;
};

export function resolveGarageComponents(
  state: GarageFormState
): GarageComponentWithMaterial[] {
  const components: GarageComponentWithMaterial[] = [
    { name: "Two_Bay_Garage", material: "default" },
  ];

  // Determine roof based on type and windows
  const hasWindows = state.windowType !== "none" && state.roofType !== "hip";

  if (state.roofType === "gable") {
    components.push({
      name: hasWindows ? "Gable_Roof_With_Window" : "Gable_Roof_No_Window",
      material: "default",
    });
  } else if (state.roofType === "halfHip") {
    components.push({
      name: hasWindows ? "Half_Hip_Roof_With_Window" : "Half_Hip_Roof_No_Window",
      material: "default",
    });
  } else if (state.roofType === "hip") {
    components.push({ name: "Hip_Roof", material: "default" });
  }

  // Add windows if applicable
  if (hasWindows) {
    if (state.windowType === "dormer") {
      components.push({ name: "Window_Dormer", material: "default" });
    } else if (state.windowType === "velux") {
      components.push({ name: "Window_Velux", material: "default" });
    }
  }

  // Add log stores
  if (state.logStoreLeft)
    components.push({ name: "Log_Store_L", material: "default" });
  if (state.logStoreRight)
    components.push({ name: "Log_Store_R", material: "default" });

  // Add cladding if not 'none' - use the selected cladding material
  if (state.claddingType !== "none") {
    const claddingMaterial = state.claddingType as MaterialType;
    components.push({ name: "Cladding_L", material: claddingMaterial });
    components.push({ name: "Cladding_R", material: claddingMaterial });
    components.push({ name: "Cladding_Posts_L", material: claddingMaterial });
    components.push({ name: "Cladding_Posts_R", material: claddingMaterial });
  }

  return components;
}
