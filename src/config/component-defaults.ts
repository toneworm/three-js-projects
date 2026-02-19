// src/config/component-defaults.ts

import {
  BASE_DEFAULT_WIDTH,
  PLATE_DEFAULT_BEVEL_OFFSET,
  PLATE_DEFAULT_DEPTH,
  PLATE_DEFAULT_HEIGHT,
  PLATE_DEFAULT_JOINT_SIZE,
  PLATE_DEFAULT_LENGTH,
  PLINTH_DEFAULT_WIDTH,
  POST_DEFAULT_BEVEL_OFFSET,
  POST_DEFAULT_DEPTH,
  POST_DEFAULT_END_SIZE,
  POST_DEFAULT_HEIGHT,
  POST_DEFAULT_TENON_DEPTH,
  POST_DEFAULT_TENON_HEIGHT,
  POST_DEFAULT_TENON_WIDTH,
  POST_DEFAULT_WIDTH,
  RAFTER_DEFAULT_DEPTH,
  RAFTER_DEFAULT_HEIGHT,
  RAFTER_DEFAULT_RISE,
  RAFTER_DEFAULT_RUN,
} from "@/lib/constants";
import type {
  BaseProps,
  ComponentType,
  PlateProps,
  PlinthProps,
  PostProps,
  RafterProps,
} from "@/types/building";

export const DEFAULT_POST_PROPS: PostProps = {
  width: POST_DEFAULT_WIDTH,
  height: POST_DEFAULT_HEIGHT,
  depth: POST_DEFAULT_DEPTH,
  topEnd: "tenon",
  bottomEnd: "bevel",
  endSize: POST_DEFAULT_END_SIZE,
  tenonHeight: POST_DEFAULT_TENON_HEIGHT,
  tenonWidth: POST_DEFAULT_TENON_WIDTH,
  tenonDepth: POST_DEFAULT_TENON_DEPTH,
  bevelOffset: POST_DEFAULT_BEVEL_OFFSET,
};

export const DEFAULT_PLATE_PROPS: PlateProps = {
  length: PLATE_DEFAULT_LENGTH,
  height: PLATE_DEFAULT_HEIGHT,
  depth: PLATE_DEFAULT_DEPTH,
  leftEnd: "top",
  rightEnd: "bottom",
  jointSize: PLATE_DEFAULT_JOINT_SIZE,
  bevelOffset: PLATE_DEFAULT_BEVEL_OFFSET,
};

export const DEFAULT_RAFTER_PROPS: RafterProps = {
  height: RAFTER_DEFAULT_HEIGHT,
  depth: RAFTER_DEFAULT_DEPTH,
  run: RAFTER_DEFAULT_RUN,
  rise: RAFTER_DEFAULT_RISE,
};

export const DEFAULT_PLINTH_PROPS: PlinthProps = {
  width: PLINTH_DEFAULT_WIDTH,
};

export const DEFAULT_BASE_PROPS: BaseProps = {
  width: BASE_DEFAULT_WIDTH,
};

export const COMPONENT_DEFAULTS: Record<
  ComponentType,
  PostProps | PlateProps | RafterProps | PlinthProps | BaseProps
> = {
  post: DEFAULT_POST_PROPS,
  plate: DEFAULT_PLATE_PROPS,
  rafter: DEFAULT_RAFTER_PROPS,
  plinth: DEFAULT_PLINTH_PROPS,
  base: DEFAULT_BASE_PROPS,
};
