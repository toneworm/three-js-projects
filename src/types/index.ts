export interface ComponentInfo {
  name: string;
  dimensions: string;
  description: string;
}

// Configuration Types
export interface Option {
  value: string;
  label: string;
}

export interface Control {
  id: string;
  label?: string;
  defaultValue: string | boolean;
  options?: Option[]; // If options exist, it's a choice. If not, it's a boolean
}

export interface Group {
  id: string;
  label: string;
  controls: Control[];
}

export interface Config {
  groups: Group[];
}

export type GarageFormState = {
  roofType: "gable" | "halfHip" | "hip";
  windowType: "none" | "dormer" | "velux";
  logStoreLeft: boolean;
  logStoreRight: boolean;
  claddingType: "none" | "softwood" | "larch" | "black" | "oak";
};

export type GarageComponent =
  | "Two_Bay_Garage"
  | "Two_Bay_Garage_Screws"
  | "Two_Bay_Garage_Wall"
  | "Window_Dormer"
  | "Window_Velux"
  | "Window_Velux_Glass"
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

export type MaterialType =
  | "default"
  | "softwood"
  | "larch"
  | "black"
  | "oak"
  | "metal"
  | "glass"
  | "brick";

export type GarageComponentWithMaterial = {
  name: GarageComponent;
  material: MaterialType;
};
