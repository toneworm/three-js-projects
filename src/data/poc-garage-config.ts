import { Config } from "@/types";

export const garagePocConfig: Config = {
  groups: [
    {
      id: "roof",
      label: "Roof Type",
      controls: [
        {
          id: "roofType",
          defaultValue: "gable",
          options: [
            { value: "gable", label: "Gable" },
            { value: "halfHip", label: "Half Hip" },
            { value: "hip", label: "Hip" },
          ],
        },
      ],
    },
    {
      id: "windows",
      label: "Windows",
      controls: [
        {
          id: "windowType",
          defaultValue: "none",
          options: [
            { value: "none", label: "None" },
            { value: "dormer", label: "Dormer" },
            { value: "velux", label: "Velux" },
          ],
        },
      ],
    },
    {
      id: "logStore",
      label: "Log Store",
      controls: [
        {
          id: "logStoreLeft",
          label: "Left Side",
          defaultValue: false,
        },
        {
          id: "logStoreRight",
          label: "Right Side",
          defaultValue: false,
        },
      ],
    },
    {
      id: "cladding",
      label: "Cladding",
      controls: [
        {
          id: "claddingType",
          defaultValue: "none",
          options: [
            { value: "none", label: "None" },
            { value: "softwood", label: "Softwood" },
            { value: "larch", label: "Larch" },
            { value: "black", label: "Black" },
            { value: "oak", label: "Oak" },
          ],
        },
      ],
    },
  ],
};

// [
//   "Two_Bay_Garage",
//   "Window_Dormer",
//   "Window_Velux",
//   "Log_Store_R",
//   "Log_Store_L",
//   "Half_Hip_Roof_No_Window",
//   "Hip_Roof",
//   "Gable_Roof_No_Window",
//   "Gable_Roof_With_Window",
//   "Half_Hip_Roof_With_Window",
//   "Cladding_L",
//   "Cladding_R",
//   "Cladding_Posts_L",
//   "Cladding_Posts_R",
// ];
