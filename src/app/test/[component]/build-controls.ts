// In your page.tsx, above the component

import type { Schema } from "leva/dist/declarations/src/types";

import {
  // Base constraints
  BASE_WIDTH_MAX,
  BASE_WIDTH_MIN,
  END_SIZE_MIN_MATERIAL,
  // Knee brace constraints
  KNEE_BRACE_DEFAULT_SCALE,
  KNEE_BRACE_SCALE_MAX,
  KNEE_BRACE_SCALE_MIN,
  PLATE_DEPTH_MAX,
  PLATE_DEPTH_MIN,
  PLATE_HEIGHT_MAX,
  PLATE_HEIGHT_MIN,
  PLATE_DEFAULT_JOINT_SIZE,
  PLATE_LENGTH_MAX,
  // Plate constraints
  PLATE_LENGTH_MIN,
  // Plinth constraints
  PLINTH_WIDTH_MAX,
  PLINTH_WIDTH_MIN,
  POST_DEPTH_MAX,
  POST_DEPTH_MIN,
  POST_HEIGHT_MAX,
  POST_HEIGHT_MIN,
  POST_WIDTH_MAX,
  // Post constraints
  POST_WIDTH_MIN,
  RAFTER_DEFAULT_MOUTH_SIZE,
  RAFTER_DEFAULT_RISE,
  // Defaults
  RAFTER_DEFAULT_RUN,
  RAFTER_DEPTH_MAX,
  // Rafter constraints
  RAFTER_DEPTH_MIN,
  RAFTER_HEIGHT_MAX,
  RAFTER_HEIGHT_MIN,
  RAFTER_MOUTH_SIZE_MAX,
  RAFTER_MOUTH_SIZE_MIN,
  RAFTER_RISE_MIN,
  RAFTER_RUN_MIN,
} from "@/lib/constants";
import type {
  BaseProps,
  ComponentType,
  ComponentProps,
  KneeBraceProps,
  PlateEndStyle,
  PlateProps,
  PlinthProps,
  PostEndStyle,
  PostProps,
  RafterProps,
} from "@/types/building";

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
        endSize: num(
          "endSize",
          p.endSize ?? END_SIZE_MIN_MATERIAL,
          END_SIZE_MIN_MATERIAL,
          POST_HEIGHT_MAX / 2,
        ),
        tenonHeight: num(
          "tenonHeight",
          p.tenonHeight ?? END_SIZE_MIN_MATERIAL,
          END_SIZE_MIN_MATERIAL,
          POST_HEIGHT_MAX / 2,
        ),
        tenonWidth: num(
          "tenonWidth",
          p.tenonWidth ?? END_SIZE_MIN_MATERIAL,
          END_SIZE_MIN_MATERIAL,
          POST_WIDTH_MAX / 2,
        ),
        tenonDepth: num(
          "tenonDepth",
          p.tenonDepth ?? END_SIZE_MIN_MATERIAL,
          END_SIZE_MIN_MATERIAL,
          POST_DEPTH_MAX / 2,
        ),
        bevelOffset: num(
          "bevelOffset",
          p.bevelOffset ?? 0,
          0,
          Math.min(p.width, p.depth) / 2,
        ),
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
        jointSize: num(
          "jointSize",
          p.jointSize ?? PLATE_DEFAULT_JOINT_SIZE,
          END_SIZE_MIN_MATERIAL,
          PLATE_LENGTH_MAX,
        ),
        bevelOffset: num(
          "bevelOffset",
          p.bevelOffset ?? 0,
          0,
          Math.min(p.length, p.depth) / 2,
        ),
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
        // angle: num("angle", p.angle ?? RAFTER_DEFAULT_ANGLE, RAFTER_ANGLE_MIN, RAFTER_ANGLE_MAX),
        mouthSize: num(
          "mouthSize",
          p.mouthSize ?? RAFTER_DEFAULT_MOUTH_SIZE,
          RAFTER_MOUTH_SIZE_MIN,
          RAFTER_MOUTH_SIZE_MAX,
        ),
      };
    }
    case "plinth": {
      const p = props as PlinthProps;
      return {
        width: num("width", p.width, PLINTH_WIDTH_MIN, PLINTH_WIDTH_MAX, 0.1),
      };
    }
    case "base": {
      const p = props as BaseProps;
      return {
        width: num("width", p.width, BASE_WIDTH_MIN, BASE_WIDTH_MAX, 0.1),
      };
    }
    case "knee-brace": {
      const p = props as KneeBraceProps;
      return {
        scale: num(
          "scale",
          p.scale ?? KNEE_BRACE_DEFAULT_SCALE,
          KNEE_BRACE_SCALE_MIN,
          KNEE_BRACE_SCALE_MAX,
          0.1,
        ),
      };
    }
  }
}
