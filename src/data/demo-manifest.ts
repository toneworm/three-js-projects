// This is a hard-coded demo file and won't change (number of bays and variants are fixed and have been for years)

import base1Catslide from "@/data/collections/bases/1-bay_catslide_base.json";
// ─── Bases ────────────────────────────────────────────────────────────────────
import base1Standard from "@/data/collections/bases/1-bay_standard_base.json";
import base2Catslide from "@/data/collections/bases/2-bay_catslide_base.json";
import base2Standard from "@/data/collections/bases/2-bay_standard_base.json";
import base3Catslide from "@/data/collections/bases/3-bay_catslide_base.json";
import base3Standard from "@/data/collections/bases/3-bay_standard_base.json";
import base4Catslide from "@/data/collections/bases/4-bay_catslide_base.json";
import base4Standard from "@/data/collections/bases/4-bay_standard_base.json";
import base5Catslide from "@/data/collections/bases/5-bay_catslide_base.json";
import base5Standard from "@/data/collections/bases/5-bay_standard_base.json";
// ─── Roofs: 1-bay ─────────────────────────────────────────────────────────────
import roof1Bay4mGable from "@/data/collections/roofs/1-bay/1-bay_4m_gable_roof.json";
import roof1Bay4mHalfHipped from "@/data/collections/roofs/1-bay/1-bay_4m_half-hipped_roof.json";
import roof1Bay4mHipped from "@/data/collections/roofs/1-bay/1-bay_4m_hipped_roof.json";
import roof1Bay45degGable from "@/data/collections/roofs/1-bay/1-bay_45deg_gable_roof.json";
import roof1Bay45degHalfHipped from "@/data/collections/roofs/1-bay/1-bay_45deg_half-hipped_roof.json";
import roof1Bay45degHipped from "@/data/collections/roofs/1-bay/1-bay_45deg_hipped_roof.json";
import roof1BayCatslideGable from "@/data/collections/roofs/1-bay/1-bay_catslide_gable_roof.json";
import roof1BayCatslideHalfHipped from "@/data/collections/roofs/1-bay/1-bay_catslide_half-hipped_roof.json";
import roof1BayCatslideHipped from "@/data/collections/roofs/1-bay/1-bay_catslide_hipped_roof.json";
// ─── Roofs: 2-bay ─────────────────────────────────────────────────────────────
import roof2Bay4mGable from "@/data/collections/roofs/2-bay/2-bay_4m_gable_roof.json";
import roof2Bay4mHalfHipped from "@/data/collections/roofs/2-bay/2-bay_4m_half-hipped_roof.json";
import roof2Bay4mHipped from "@/data/collections/roofs/2-bay/2-bay_4m_hipped_roof.json";
import roof2Bay45degGable from "@/data/collections/roofs/2-bay/2-bay_45deg_gable_roof.json";
import roof2Bay45degHalfHipped from "@/data/collections/roofs/2-bay/2-bay_45deg_half-hipped_roof.json";
import roof2Bay45degHipped from "@/data/collections/roofs/2-bay/2-bay_45deg_hipped_roof.json";
import roof2BayCatslideGable from "@/data/collections/roofs/2-bay/2-bay_catslide_gable_roof.json";
import roof2BayCatslideHalfHipped from "@/data/collections/roofs/2-bay/2-bay_catslide_half-hipped_roof.json";
import roof2BayCatslideHipped from "@/data/collections/roofs/2-bay/2-bay_catslide_hipped_roof.json";
// ─── Roofs: 3-bay ─────────────────────────────────────────────────────────────
import roof3Bay4mGable from "@/data/collections/roofs/3-bay/3-bay_4m_gable_roof.json";
import roof3Bay4mHalfHipped from "@/data/collections/roofs/3-bay/3-bay_4m_half-hipped_roof.json";
import roof3Bay4mHipped from "@/data/collections/roofs/3-bay/3-bay_4m_hipped_roof.json";
import roof3Bay45degGable from "@/data/collections/roofs/3-bay/3-bay_45deg_gable_roof.json";
import roof3Bay45degHalfHipped from "@/data/collections/roofs/3-bay/3-bay_45deg_half-hipped_roof.json";
import roof3Bay45degHipped from "@/data/collections/roofs/3-bay/3-bay_45deg_hipped_roof.json";
import roof3BayCatslideGable from "@/data/collections/roofs/3-bay/3-bay_catslide_gable_roof.json";
import roof3BayCatslideHalfHipped from "@/data/collections/roofs/3-bay/3-bay_catslide_half-hipped_roof.json";
import roof3BayCatslideHipped from "@/data/collections/roofs/3-bay/3-bay_catslide_hipped_roof.json";
// ─── Roofs: 4-bay ─────────────────────────────────────────────────────────────
import roof4Bay4mGable from "@/data/collections/roofs/4-bay/4-bay_4m_gable_roof.json";
import roof4Bay4mHalfHipped from "@/data/collections/roofs/4-bay/4-bay_4m_half-hipped_roof.json";
import roof4Bay4mHipped from "@/data/collections/roofs/4-bay/4-bay_4m_hipped_roof.json";
import roof4Bay45degGable from "@/data/collections/roofs/4-bay/4-bay_45deg_gable_roof.json";
import roof4Bay45degHalfHipped from "@/data/collections/roofs/4-bay/4-bay_45deg_half-hipped_roof.json";
import roof4Bay45degHipped from "@/data/collections/roofs/4-bay/4-bay_45deg_hipped_roof.json";
import roof4BayCatslideGable from "@/data/collections/roofs/4-bay/4-bay_catslide_gable_roof.json";
import roof4BayCatslideHalfHipped from "@/data/collections/roofs/4-bay/4-bay_catslide_half-hipped_roof.json";
import roof4BayCatslideHipped from "@/data/collections/roofs/4-bay/4-bay_catslide_hipped_roof.json";
// ─── Roofs: 5-bay ─────────────────────────────────────────────────────────────
import roof5Bay4mGable from "@/data/collections/roofs/5-bay/5-bay_4m_gable_roof.json";
import roof5Bay4mHalfHipped from "@/data/collections/roofs/5-bay/5-bay_4m_half-hipped_roof.json";
import roof5Bay4mHipped from "@/data/collections/roofs/5-bay/5-bay_4m_hipped_roof.json";
import roof5Bay45degGable from "@/data/collections/roofs/5-bay/5-bay_45deg_gable_roof.json";
import roof5Bay45degHalfHipped from "@/data/collections/roofs/5-bay/5-bay_45deg_half-hipped_roof.json";
import roof5Bay45degHipped from "@/data/collections/roofs/5-bay/5-bay_45deg_hipped_roof.json";
import roof5BayCatslideGable from "@/data/collections/roofs/5-bay/5-bay_catslide_gable_roof.json";
import roof5BayCatslideHalfHipped from "@/data/collections/roofs/5-bay/5-bay_catslide_half-hipped_roof.json";
import roof5BayCatslideHipped from "@/data/collections/roofs/5-bay/5-bay_catslide_hipped_roof.json";
import type { Collection } from "@/types/building";

// ─── Types ────────────────────────────────────────────────────────────────────

export type Pitch = "4m" | "45deg" | "catslide";
export type EndStyle = "gable" | "half-hipped" | "hipped";

export interface DemoItem {
  key: string;
  bays: 1 | 2 | 3 | 4 | 5;
  pitch: Pitch;
  end: EndStyle;
  pitchLabel: string;
  endLabel: string;
  collection: Collection;
}

export type DemoGroup = {
  bays: 1 | 2 | 3 | 4 | 5;
  label: string;
  items: DemoItem[];
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const PITCH_LABELS: Record<Pitch, string> = {
  "4m": "4m",
  "45deg": "45°",
  catslide: "Catslide",
};

const END_LABELS: Record<EndStyle, string> = {
  gable: "Gable",
  "half-hipped": "Half-Hipped",
  hipped: "Hipped",
};

function merge(
  base: { components?: unknown[] },
  roof: { name: string; components?: unknown[] },
  bays: number,
  pitch: Pitch,
  end: EndStyle,
): Collection {
  return {
    name: `${bays}-bay ${PITCH_LABELS[pitch]} ${END_LABELS[end]}`,
    components: [
      ...((base.components ?? []) as Collection["components"]),
      ...((roof.components ?? []) as Collection["components"]),
    ],
  };
}

function item(
  bays: 1 | 2 | 3 | 4 | 5,
  pitch: Pitch,
  end: EndStyle,
  base: { components?: unknown[] },
  roof: { name: string; components?: unknown[] },
): DemoItem {
  return {
    key: `${bays}-bay_${pitch}_${end}`,
    bays,
    pitch,
    end,
    pitchLabel: PITCH_LABELS[pitch],
    endLabel: END_LABELS[end],
    collection: merge(base, roof, bays, pitch, end),
  };
}

// ─── Manifest ─────────────────────────────────────────────────────────────────

const PITCHES: Pitch[] = ["4m", "45deg", "catslide"];
const ENDS: EndStyle[] = ["gable", "half-hipped", "hipped"];

type BaseMap = Record<
  1 | 2 | 3 | 4 | 5,
  { standard: typeof base1Standard; catslide: typeof base1Catslide }
>;
type RoofMap = Record<
  1 | 2 | 3 | 4 | 5,
  Record<Pitch, Record<EndStyle, { name: string; components?: unknown[] }>>
>;

const BASES: BaseMap = {
  1: { standard: base1Standard, catslide: base1Catslide },
  2: { standard: base2Standard, catslide: base2Catslide },
  3: { standard: base3Standard, catslide: base3Catslide },
  4: { standard: base4Standard, catslide: base4Catslide },
  5: { standard: base5Standard, catslide: base5Catslide },
};

const ROOFS: RoofMap = {
  1: {
    "4m": {
      gable: roof1Bay4mGable,
      "half-hipped": roof1Bay4mHalfHipped,
      hipped: roof1Bay4mHipped,
    },
    "45deg": {
      gable: roof1Bay45degGable,
      "half-hipped": roof1Bay45degHalfHipped,
      hipped: roof1Bay45degHipped,
    },
    catslide: {
      gable: roof1BayCatslideGable,
      "half-hipped": roof1BayCatslideHalfHipped,
      hipped: roof1BayCatslideHipped,
    },
  },
  2: {
    "4m": {
      gable: roof2Bay4mGable,
      "half-hipped": roof2Bay4mHalfHipped,
      hipped: roof2Bay4mHipped,
    },
    "45deg": {
      gable: roof2Bay45degGable,
      "half-hipped": roof2Bay45degHalfHipped,
      hipped: roof2Bay45degHipped,
    },
    catslide: {
      gable: roof2BayCatslideGable,
      "half-hipped": roof2BayCatslideHalfHipped,
      hipped: roof2BayCatslideHipped,
    },
  },
  3: {
    "4m": {
      gable: roof3Bay4mGable,
      "half-hipped": roof3Bay4mHalfHipped,
      hipped: roof3Bay4mHipped,
    },
    "45deg": {
      gable: roof3Bay45degGable,
      "half-hipped": roof3Bay45degHalfHipped,
      hipped: roof3Bay45degHipped,
    },
    catslide: {
      gable: roof3BayCatslideGable,
      "half-hipped": roof3BayCatslideHalfHipped,
      hipped: roof3BayCatslideHipped,
    },
  },
  4: {
    "4m": {
      gable: roof4Bay4mGable,
      "half-hipped": roof4Bay4mHalfHipped,
      hipped: roof4Bay4mHipped,
    },
    "45deg": {
      gable: roof4Bay45degGable,
      "half-hipped": roof4Bay45degHalfHipped,
      hipped: roof4Bay45degHipped,
    },
    catslide: {
      gable: roof4BayCatslideGable,
      "half-hipped": roof4BayCatslideHalfHipped,
      hipped: roof4BayCatslideHipped,
    },
  },
  5: {
    "4m": {
      gable: roof5Bay4mGable,
      "half-hipped": roof5Bay4mHalfHipped,
      hipped: roof5Bay4mHipped,
    },
    "45deg": {
      gable: roof5Bay45degGable,
      "half-hipped": roof5Bay45degHalfHipped,
      hipped: roof5Bay45degHipped,
    },
    catslide: {
      gable: roof5BayCatslideGable,
      "half-hipped": roof5BayCatslideHalfHipped,
      hipped: roof5BayCatslideHipped,
    },
  },
};

function buildGroups(): DemoGroup[] {
  return ([1, 2, 3, 4, 5] as const).map((bays) => ({
    bays,
    label: `${bays}-Bay`,
    items: PITCHES.flatMap((pitch) =>
      ENDS.map((end) => {
        const base =
          pitch === "catslide" ? BASES[bays].catslide : BASES[bays].standard;
        const roof = ROOFS[bays][pitch][end];
        return item(bays, pitch, end, base, roof);
      }),
    ),
  }));
}

export const DEMO_GROUPS: DemoGroup[] = buildGroups();
export const DEMO_ITEMS: DemoItem[] = DEMO_GROUPS.flatMap((g) => g.items);
