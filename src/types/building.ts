// types/building.ts

export type Vec3 = [number, number, number];

// --- Shared enums ---

export type PostEnd = "top" | "bottom";
export type PostEndStyle = "block" | "bevel" | "tenon";
export type PlateEnd = "left" | "right";
export type PlateEndStyle = "top" | "bottom" | "block" | "bevel";

// --- Component props ---
export type ComponentType = "post" | "plate" | "rafter" | "plinth" | "base" | "knee-brace";
export type ComponentProps = PostProps | PlateProps | RafterProps | PlinthProps | BaseProps | KneeBraceProps;

export type PostProps = {
  width: number;
  height: number;
  depth: number;
  topEnd?: PostEndStyle;
  bottomEnd?: PostEndStyle;
  endSize?: number;
  bevelOffset?: number;
  tenonHeight?: number;
  tenonWidth?: number;
  tenonDepth?: number;
  randomiseTextureOffset?: boolean;
};

export type PlateProps = {
  length: number;
  height: number;
  depth: number;
  leftEnd?: PlateEndStyle;
  rightEnd?: PlateEndStyle;
  jointSize?: number;
  bevelOffset?: number;
  randomiseTextureOffset?: boolean;
};

export type RafterProps = {
  height: number;
  depth: number;
  run?: number;
  rise?: number;
  angle?: number;
  cheekAngle?: number;
  mouthSize?: number;
  randomiseTextureOffset?: boolean;
};

export type PlinthProps = {
  width: number;
  randomiseTextureOffset?: boolean;
};

export type BaseProps = {
  width: number;
};

export type KneeBraceProps = {
  scale?: number;
};

// Resolved props (after clamping and calculations)

export type ResolvedPostGeometry = {
  width: number;
  height: number;
  depth: number;
  topEnd: PostEndStyle;
  bottomEnd: PostEndStyle;
  endSize: number;
  tenonWidth: number;
  tenonDepth: number;
  tenonHeight: number;
  bevelOffset: number;
};

export type ResolvedPlateGeometry = {
  length: number;
  height: number;
  depth: number;
  leftEnd: PlateEndStyle;
  rightEnd: PlateEndStyle;
  jointSize: number;
  bevelOffset: number;
};

export type ResolvedRafterGeometry = {
  run: number;
  rise: number;
  angle: number;
  length: number;
  height: number;
  depth: number;
  cheekAngle: number;
  mouthSize: number;
};

export type ResolvedPlinthGeometry = {
  width: number;
  depth: number;
  thickness: number;
  height: number;
};

// --- Collection configs (props + type discriminant) ---

export type PostConfig = { type: "post" } & PostProps;
export type PlateConfig = { type: "plate" } & PlateProps;
export type RafterConfig = { type: "rafter" } & RafterProps;
export type PlinthConfig = { type: "plinth" } & PlinthProps;
export type BaseConfig = { type: "base" } & BaseProps;
export type KneeBraceConfig = { type: "knee-brace" } & KneeBraceProps;

export type ComponentConfig = PostConfig | PlateConfig | RafterConfig | PlinthConfig | BaseConfig | KneeBraceConfig;

// --- Collection item: config + placement ---

export type CollectionItem = {
  id: string;
  position: Vec3;
  rotation?: Vec3;
} & ComponentConfig;

// --- Collection ---

export type Collection = {
  name: string;
  description?: string;
  components: CollectionItem[];
};
