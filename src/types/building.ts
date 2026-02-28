// types/building.ts

export type Vec3 = [number, number, number];

// --- Shared enums ---

export type PostEnd = "top" | "bottom";
export type PostEndStyle = "block" | "bevel" | "tenon";
export type PlateEnd = "left" | "right";
export type PlateEndStyle = "top" | "bottom" | "block" | "bevel";

export enum Texture {
  Oak = "oak",
  UVCheck = "uv-check",
  RedBrick = "red-brick",
  BrushedConcrete = "brushed-concrete",
}

export type CladdingTexture = Texture.Oak | Texture.UVCheck;
export type StaddleStoneTexture = Texture.RedBrick | Texture.BrushedConcrete;

// --- Component props ---
export type ComponentType =
  | "post"
  | "plate"
  | "rafter"
  | "plinth"
  | "base"
  | "knee-brace"
  | "studding"
  | "cladding"
  | "staddle-stone";
export type ComponentProps =
  | PostProps
  | PlateProps
  | RafterProps
  | PlinthProps
  | BaseProps
  | KneeBraceProps
  | StuddingProps
  | CladdingProps
  | StaddleStoneProps;

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

export type StuddingProps = {
  thickness: number;
  depth: number;
  height: number;
  bottomPlumbCutAngle?: number;
  topPlumbCutAngle?: number;
  randomiseTextureOffset?: boolean;
};

export type CladdingProps = {
  height: number;
  thickness: number;
  length: number;
  count: number;
  textureKey?: CladdingTexture;
  randomiseTextureOffset?: boolean;
};

export type StaddleStoneProps = {
  height: number;
  depth: number;
  length: number;
  taperRatio?: number;
  textureKey?: StaddleStoneTexture;
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

export type ResolvedStuddingGeometry = {
  thickness: number;
  depth: number;
  height: number;
  bottomPlumbCutAngle: number;
  topPlumbCutAngle: number;
};

export type ResolvedCladdingGeometry = {
  height: number;
  thickness: number;
  length: number;
  count: number;
};

export type ResolvedStaddleStoneGeometry = {
  height: number;
  depth: number;
  length: number;
  taperRatio: number;
};

// --- Collection configs (props + type discriminant) ---

export type PostConfig = { type: "post" } & PostProps;
export type PlateConfig = { type: "plate" } & PlateProps;
export type RafterConfig = { type: "rafter" } & RafterProps;
export type PlinthConfig = { type: "plinth" } & PlinthProps;
export type BaseConfig = { type: "base" } & BaseProps;
export type KneeBraceConfig = { type: "knee-brace" } & KneeBraceProps;
export type StuddingConfig = { type: "studding" } & StuddingProps;
export type CladdingConfig = { type: "cladding" } & CladdingProps;
export type StaddleStoneConfig = { type: "staddle-stone" } & StaddleStoneProps;

export type ComponentConfig =
  | PostConfig
  | PlateConfig
  | RafterConfig
  | PlinthConfig
  | BaseConfig
  | KneeBraceConfig
  | StuddingConfig
  | CladdingConfig
  | StaddleStoneConfig;

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
