"use client";

import { create } from "zustand";

import { COMPONENT_DEFAULTS } from "@/config/component-defaults";
import type { ComponentProps, ComponentType } from "@/types/building";

interface ComponentStore {
  componentType: ComponentType;
  props: ComponentProps;
  setComponent: (type: ComponentType, props: ComponentProps) => void;
  updateProps: (partial: Partial<ComponentProps>) => void;
  resetProps: () => void;
}

const useComponentStore = create<ComponentStore>()((set) => ({
  componentType: "post",
  props: COMPONENT_DEFAULTS.post,

  setComponent: (type, props) => set({ componentType: type, props }),

  updateProps: (partial) =>
    set((state) => {
      if (!state.props) return state;
      return { props: { ...state.props, ...partial } as ComponentProps };
    }),

  resetProps: () =>
    set((state) => ({ props: COMPONENT_DEFAULTS[state.componentType] })),
}));

export default useComponentStore;
