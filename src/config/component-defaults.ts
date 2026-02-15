// src/config/component-defaults.ts
import type {
  PostProps,
  PlateProps,
  RafterProps,
  ComponentType,
} from "@/types/building";
import {
  POST_DEFAULT_WIDTH,
  POST_DEFAULT_HEIGHT,
  POST_DEFAULT_DEPTH,
  PLATE_DEFAULT_LENGTH,
  PLATE_DEFAULT_HEIGHT,
  PLATE_DEFAULT_DEPTH,
  RAFTER_DEFAULT_HEIGHT,
  RAFTER_DEFAULT_DEPTH,
  RAFTER_DEFAULT_RUN,
  RAFTER_DEFAULT_RISE,
} from "@/lib/constants";

export const DEFAULT_POST_PROPS: PostProps = {
  width: POST_DEFAULT_WIDTH,
  height: POST_DEFAULT_HEIGHT,
  depth: POST_DEFAULT_DEPTH,
  topEnd: "block",
  bottomEnd: "block",
};

export const DEFAULT_PLATE_PROPS: PlateProps = {
  length: PLATE_DEFAULT_LENGTH,
  height: PLATE_DEFAULT_HEIGHT,
  depth: PLATE_DEFAULT_DEPTH,
  leftEnd: "block",
  rightEnd: "block",
};

export const DEFAULT_RAFTER_PROPS: RafterProps = {
  height: RAFTER_DEFAULT_HEIGHT,
  depth: RAFTER_DEFAULT_DEPTH,
  run: RAFTER_DEFAULT_RUN,
  rise: RAFTER_DEFAULT_RISE,
};

export const COMPONENT_DEFAULTS: Record<
  ComponentType,
  PostProps | PlateProps | RafterProps
> = {
  post: DEFAULT_POST_PROPS,
  plate: DEFAULT_PLATE_PROPS,
  rafter: DEFAULT_RAFTER_PROPS,
};
