import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ComponentInfo } from "@/types";
import { componentData } from "@/data/component-info";
import {
  explosionGroupOffsets,
  explosionIndividualOffsets,
  explosionMultiplier,
} from "@/data/positions";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper to find component info by prefix matching
export function getComponentInfo(name: string): ComponentInfo | null {
  if (!name) return null;

  // Direct match first
  if (componentData[name]) {
    return componentData[name];
  }

  // Prefix match
  for (const [prefix, info] of Object.entries(componentData)) {
    if (name.startsWith(prefix)) {
      return info;
    }
  }

  return null;
}

// Helper function to find offset based on prefix matching
export function getExplosionOffset(
  name: string
): [number, number, number] | null {
  // Check individual overrides first
  if (explosionIndividualOffsets[name]) {
    return explosionIndividualOffsets[name].map(
      (val) => val * explosionMultiplier
    ) as [number, number, number];
  }

  // Fall back to group matching
  for (const [prefix, offset] of Object.entries(explosionGroupOffsets)) {
    if (name.startsWith(prefix)) {
      return offset.map((val) => val * explosionMultiplier) as [
        number,
        number,
        number
      ];
    }
  }

  return null;
}
