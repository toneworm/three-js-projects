// src/config/component-defaults.ts
import type {
  PostProps,
  PlateProps,
  RafterProps,
  ComponentType,
} from "@/types/building";

export const DEFAULT_POST_PROPS: PostProps = {
  width: 0.2,
  height: 2.4,
  depth: 0.2,
  topEnd: "block",
  bottomEnd: "block",
};

export const DEFAULT_PLATE_PROPS: PlateProps = {
  length: 3,
  height: 0.2,
  depth: 0.2,
  leftEnd: "block",
  rightEnd: "block",
};

export const DEFAULT_RAFTER_PROPS: RafterProps = {
  height: 0.15,
  depth: 0.1,
  run: 2,
  rise: 1,
};

export const COMPONENT_DEFAULTS: Record<
  ComponentType,
  PostProps | PlateProps | RafterProps
> = {
  post: DEFAULT_POST_PROPS,
  plate: DEFAULT_PLATE_PROPS,
  rafter: DEFAULT_RAFTER_PROPS,
};
