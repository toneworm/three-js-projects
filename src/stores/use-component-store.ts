"use client";

import { create } from "zustand";

import { COMPONENT_DEFAULTS } from "@/config/component-defaults";
import type {
  ComponentType,
  PlateProps,
  PostProps,
  RafterProps,
} from "@/types/building";

type ComponentProps = PostProps | PlateProps | RafterProps;

interface ComponentStore {
  componentType: ComponentType;
  props: ComponentProps;
  setComponent: (type: ComponentType, props: ComponentProps) => void;
  updateProps: (partial: Partial<ComponentProps>) => void;
}

const useComponentStore = create<ComponentStore>()((set) => ({
  componentType: "post",
  props: COMPONENT_DEFAULTS.post,

  setComponent: (type, props) => set({ componentType: type, props }),

  updateProps: (partial) =>
    set((state) => {
      if (!state.props) return state;
      return { props: { ...state.props, ...partial } };
    }),

  resetProps: () =>
    set((state) => ({ props: COMPONENT_DEFAULTS[state.componentType] })),
}));

export default useComponentStore;
