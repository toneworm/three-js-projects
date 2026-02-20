// In your page.tsx, above the component

import type { Schema } from "leva/dist/declarations/src/types";

import {
  // Base constraints
  BASE_WIDTH_MAX,
  BASE_WIDTH_MIN,
  // Cladding constraints
  CLADDING_COUNT_MAX,
  CLADDING_COUNT_MIN,
  CLADDING_DEFAULT_COUNT,
  CLADDING_DEFAULT_HEIGHT,
  CLADDING_DEFAULT_LENGTH,
  CLADDING_DEFAULT_MATERIAL_URL,
  CLADDING_DEFAULT_THICKNESS,
  CLADDING_HEIGHT_MAX,
  CLADDING_HEIGHT_MIN,
  CLADDING_LENGTH_MAX,
  CLADDING_LENGTH_MIN,
  CLADDING_THICKNESS_MAX,
  CLADDING_THICKNESS_MIN,
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
  // Studding constraints
  STUDDING_DEFAULT_BOTTOM_PLUMB_CUT_ANGLE,
  STUDDING_DEFAULT_HEIGHT,
  STUDDING_DEFAULT_THICKNESS,
  STUDDING_DEFAULT_TOP_PLUMB_CUT_ANGLE,
  STUDDING_DEFAULT_WIDTH,
  STUDDING_HEIGHT_MAX,
  STUDDING_HEIGHT_MIN,
  STUDDING_PLUMB_CUT_ANGLE_MAX,
  STUDDING_PLUMB_CUT_ANGLE_MIN,
  STUDDING_THICKNESS_MAX,
  STUDDING_THICKNESS_MIN,
  STUDDING_WIDTH_MAX,
  STUDDING_WIDTH_MIN,
} from "@/lib/constants";
import type {
  BaseProps,
  CladdingProps,
  ComponentType,
  ComponentProps,
  KneeBraceProps,
  PlateEndStyle,
  PlateProps,
  PlinthProps,
  PostEndStyle,
  PostProps,
  RafterProps,
  StuddingProps,
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
    case "studding": {
      const p = props as StuddingProps;
      return {
        width: num(
          "width",
          p.width ?? STUDDING_DEFAULT_WIDTH,
          STUDDING_WIDTH_MIN,
          STUDDING_WIDTH_MAX,
        ),
        height: num(
          "height",
          p.height ?? STUDDING_DEFAULT_HEIGHT,
          STUDDING_HEIGHT_MIN,
          STUDDING_HEIGHT_MAX,
        ),
        thickness: num(
          "thickness",
          p.thickness ?? STUDDING_DEFAULT_THICKNESS,
          STUDDING_THICKNESS_MIN,
          STUDDING_THICKNESS_MAX,
        ),
        bottomPlumbCutAngle: num(
          "bottomPlumbCutAngle",
          p.bottomPlumbCutAngle ?? STUDDING_DEFAULT_BOTTOM_PLUMB_CUT_ANGLE,
          STUDDING_PLUMB_CUT_ANGLE_MIN,
          STUDDING_PLUMB_CUT_ANGLE_MAX,
        ),
        topPlumbCutAngle: num(
          "topPlumbCutAngle",
          p.topPlumbCutAngle ?? STUDDING_DEFAULT_TOP_PLUMB_CUT_ANGLE,
          STUDDING_PLUMB_CUT_ANGLE_MIN,
          STUDDING_PLUMB_CUT_ANGLE_MAX,
        ),
      };
    }
    case "cladding": {
      const p = props as CladdingProps;
      return {
        height: num(
          "height",
          p.height ?? CLADDING_DEFAULT_HEIGHT,
          CLADDING_HEIGHT_MIN,
          CLADDING_HEIGHT_MAX,
        ),
        thickness: num(
          "thickness",
          p.thickness ?? CLADDING_DEFAULT_THICKNESS,
          CLADDING_THICKNESS_MIN,
          CLADDING_THICKNESS_MAX,
        ),
        length: num(
          "length",
          p.length ?? CLADDING_DEFAULT_LENGTH,
          CLADDING_LENGTH_MIN,
          CLADDING_LENGTH_MAX,
        ),
        count: num(
          "count",
          p.count ?? CLADDING_DEFAULT_COUNT,
          CLADDING_COUNT_MIN,
          CLADDING_COUNT_MAX,
          1,
        ),
        materialUrl: {
          value: p.materialUrl ?? CLADDING_DEFAULT_MATERIAL_URL,
          onChange: (v: string) => updateProps({ materialUrl: v }),
        },
      };
    }
  }
}
