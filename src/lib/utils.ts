import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { componentData as componentDataV1 } from "@/data/component-info-garage-v1";
import { componentData as componentDataPoc } from "@/data/component-info-poc-garage";
import {
  explosionGroupOffsets,
  explosionIndividualOffsets,
  explosionMultiplier,
} from "@/data/positions";
import type { ComponentInfo } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// THESE NEED TO BE MADE GENERIC
// Helper to find component info by prefix matching
export function getComponentInfoV1(name: string): ComponentInfo | null {
  if (!name) return null;

  // Direct match first
  if (componentDataV1[name]) {
    return componentDataV1[name];
  }

  // Prefix match
  for (const [prefix, info] of Object.entries(componentDataV1)) {
    if (name.startsWith(prefix)) {
      return info;
    }
  }

  return null;
}

export function getComponentInfoPoc(name: string): ComponentInfo | null {
  if (!name) return null;

  // Direct match first
  if (componentDataPoc[name]) {
    return componentDataPoc[name];
  }

  // Prefix match
  for (const [prefix, info] of Object.entries(componentDataPoc)) {
    if (name.startsWith(prefix)) {
      return info;
    }
  }

  return null;
}

// Helper function to find offset based on prefix matching
export function getExplosionOffset(
  name: string,
): [number, number, number] | null {
  // Check individual overrides first
  if (explosionIndividualOffsets[name]) {
    return explosionIndividualOffsets[name].map(
      (val) => val * explosionMultiplier,
    ) as [number, number, number];
  }

  // Fall back to group matching
  for (const [prefix, offset] of Object.entries(explosionGroupOffsets)) {
    if (name.startsWith(prefix)) {
      return offset.map((val) => val * explosionMultiplier) as [
        number,
        number,
        number,
      ];
    }
  }

  return null;
}
