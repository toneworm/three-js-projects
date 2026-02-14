// In your page.tsx, above the component

import type {
  ComponentType,
  PlateProps,
  PostProps,
  PostEndStyle,
  PlateEndStyle,
  RafterProps,
} from "@/types/building";

type ComponentProps = PostProps | PlateProps | RafterProps;

export function buildControls(
  componentType: ComponentType,
  props: ComponentProps,
  updateProps: (partial: Partial<ComponentProps>) => void,
) {
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

  const shared = {
    height: num("height", props.height, 0.05, 5),
    depth: num("depth", props.depth, 0.05, 1),
  };

  switch (componentType) {
    case "post": {
      const p = props as PostProps;
      return {
        ...shared,
        width: num("width", p.width, 0.05, 1),
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
        ...shared,
        length: num("length", p.length, 0.5, 10),
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
        ...shared,
        run: num("run", p.run ?? 2, 0.5, 10),
        rise: num("rise", p.rise ?? 1, 0.1, 5),
        mouthSize: num("mouthSize", p.mouthSize ?? 0.1, 0, 0.5),
      };
    }
  }
}
