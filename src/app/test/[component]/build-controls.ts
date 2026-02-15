// In your page.tsx, above the component

import type { Schema } from "leva/dist/declarations/src/types";
import type {
  ComponentType,
  PlateProps,
  PostProps,
  PostEndStyle,
  PlateEndStyle,
  RafterProps,
} from "@/types/building";
import {
  // Post constraints
  POST_WIDTH_MIN,
  POST_WIDTH_MAX,
  POST_DEPTH_MIN,
  POST_DEPTH_MAX,
  POST_HEIGHT_MIN,
  POST_HEIGHT_MAX,
  // Plate constraints
  PLATE_LENGTH_MIN,
  PLATE_LENGTH_MAX,
  PLATE_DEPTH_MIN,
  PLATE_DEPTH_MAX,
  PLATE_HEIGHT_MIN,
  PLATE_HEIGHT_MAX,
  // Rafter constraints
  RAFTER_DEPTH_MIN,
  RAFTER_DEPTH_MAX,
  RAFTER_HEIGHT_MIN,
  RAFTER_HEIGHT_MAX,
  RAFTER_MOUTH_SIZE_MIN,
  RAFTER_MOUTH_SIZE_MAX,
  RAFTER_RISE_MIN,
  RAFTER_RUN_MIN,
  // Defaults
  RAFTER_DEFAULT_RUN,
  RAFTER_DEFAULT_RISE,
  RAFTER_DEFAULT_MOUTH_SIZE,
} from "@/lib/constants";

type ComponentProps = PostProps | PlateProps | RafterProps;

export function buildControls(
  componentType: ComponentType,
  props: ComponentProps,
  updateProps: (partial: Partial<ComponentProps>) => void,
): Schema {
  const num = (
    key: string,
    value: number,
    min: number,
    max: number,
    step = 0.01,
  ) => ({
    value,
    min,
    max,
    step,
    onChange: (v: number) => updateProps({ [key]: v }),
  });

  switch (componentType) {
    case "post": {
      const p = props as PostProps;
      return {
        height: num("height", p.height, POST_HEIGHT_MIN, POST_HEIGHT_MAX),
        depth: num("depth", p.depth, POST_DEPTH_MIN, POST_DEPTH_MAX),
        width: num("width", p.width, POST_WIDTH_MIN, POST_WIDTH_MAX),
        topEnd: {
          value: p.topEnd ?? "block",
          options: ["block", "bevel", "tenon"] as PostEndStyle[],
          onChange: (v: PostEndStyle) => updateProps({ topEnd: v }),
        },
        bottomEnd: {
          value: p.bottomEnd ?? "block",
          options: ["block", "bevel", "tenon"] as PostEndStyle[],
          onChange: (v: PostEndStyle) => updateProps({ bottomEnd: v }),
        },
      };
    }
    case "plate": {
      const p = props as PlateProps;
      return {
        height: num("height", p.height, PLATE_HEIGHT_MIN, PLATE_HEIGHT_MAX),
        depth: num("depth", p.depth, PLATE_DEPTH_MIN, PLATE_DEPTH_MAX),
        length: num("length", p.length, PLATE_LENGTH_MIN, PLATE_LENGTH_MAX),
        leftEnd: {
          value: p.leftEnd ?? "block",
          options: ["block", "bevel", "top", "bottom"] as PlateEndStyle[],
          onChange: (v: PlateEndStyle) => updateProps({ leftEnd: v }),
        },
        rightEnd: {
          value: p.rightEnd ?? "block",
          options: ["block", "bevel", "top", "bottom"] as PlateEndStyle[],
          onChange: (v: PlateEndStyle) => updateProps({ rightEnd: v }),
        },
      };
    }
    case "rafter": {
      const p = props as RafterProps;
      return {
        height: num("height", p.height, RAFTER_HEIGHT_MIN, RAFTER_HEIGHT_MAX),
        depth: num("depth", p.depth, RAFTER_DEPTH_MIN, RAFTER_DEPTH_MAX),
        run: num("run", p.run ?? RAFTER_DEFAULT_RUN, RAFTER_RUN_MIN, 10),
        rise: num("rise", p.rise ?? RAFTER_DEFAULT_RISE, RAFTER_RISE_MIN, 5),
        mouthSize: num("mouthSize", p.mouthSize ?? RAFTER_DEFAULT_MOUTH_SIZE, RAFTER_MOUTH_SIZE_MIN, RAFTER_MOUTH_SIZE_MAX),
      };
    }
  }
}
