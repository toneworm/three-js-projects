export type GarageFormState = {
  roofType: "gable" | "halfHip" | "hip";
  windowType: "none" | "dormer" | "velux";
  logStoreLeft: boolean;
  logStoreRight: boolean;
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
  | "Half_Hip_Roof_With_Window";

export function resolveGarageComponents(
  state: GarageFormState
): GarageComponent[] {
  const components: GarageComponent[] = ["Two_Bay_Garage"];

  // Determine roof based on type and windows
  const hasWindows = state.windowType !== "none" && state.roofType !== "hip";

  if (state.roofType === "gable") {
    components.push(
      hasWindows ? "Gable_Roof_With_Window" : "Gable_Roof_No_Window"
    );
  } else if (state.roofType === "halfHip") {
    components.push(
      hasWindows ? "Half_Hip_Roof_With_Window" : "Half_Hip_Roof_No_Window"
    );
  } else if (state.roofType === "hip") {
    components.push("Hip_Roof");
  }

  // Add windows if applicable
  if (hasWindows) {
    if (state.windowType === "dormer") {
      components.push("Window_Dormer");
    } else if (state.windowType === "velux") {
      components.push("Window_Velux");
    }
  }

  // Add log stores
  if (state.logStoreLeft) components.push("Log_Store_L");
  if (state.logStoreRight) components.push("Log_Store_R");

  return components;
}
