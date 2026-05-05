"use client";

import { Suspense, useRef, useState } from "react";
import Link from "next/link";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { cn } from "@/lib/utils";

import { CollectionRenderer } from "@/components/collections/collection-renderer";
import { Loader } from "@/components/general/loader";
import { Button } from "@/components/ui/button";
import type { DemoItem } from "@/data/demo-manifest";
import { DEMO_GROUPS, DEMO_ITEMS } from "@/data/demo-manifest";
import type { Collection, Vec3 } from "@/types/building";
import { useCameraLogger } from "@/hooks/use-camera-logger";

interface CameraPreset {
  position: Vec3;
  target: Vec3;
}

const FRONT_LEFT_PRESETS: Record<1 | 2 | 3 | 4 | 5, CameraPreset> = {
  1: { position: [-11.01, 7.28, 18.14], target: [0.4, 1.23, 0.15] },
  2: { position: [-12.92, 7.95, 20.55], target: [0.12, 1.04, 0.0] },
  3: { position: [-14.54, 9.01, 23.91], target: [-0.21, 1.41, 1.31] },
  4: { position: [-18.62, 10.83, 29.62], target: [0.19, 0.86, -0.03] },
  5: { position: [-21.81, 12.94, 34.17], target: [0.04, 1.35, -0.29] },
};

const BACK_RIGHT_PRESETS: Record<1 | 2 | 3 | 4 | 5, CameraPreset> = {
  1: { position: [16.58, 13.37, -8.87], target: [0.4, 1.23, 0.15] },
  2: { position: [18.56, 14.9, -10.23], target: [0.12, 1.04, 0.0] },
  3: { position: [20.13, 16.57, -10.26], target: [-0.21, 1.41, 1.31] },
  4: { position: [26.83, 20.99, -14.92], target: [0.19, 0.86, -0.03] },
  5: { position: [30.97, 24.69, -17.58], target: [0.04, 1.35, -0.29] },
};

type ViewMode = "front-left" | "back-right";

function buildCombinationUrl(item: DemoItem) {
  const slug = (s: string) =>
    s
      .toLowerCase()
      .replace(/°/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  const combo = `${item.bays}-bay_${slug(item.pitchLabel)}_${slug(item.endLabel)}`;
  return `/combinations/${item.bays}-bay/${combo}`;
}

export default function DemoPage() {
  const [selected, setSelected] = useState<DemoItem>(DEMO_ITEMS[0]);

  const [viewMode, setViewMode] = useState<ViewMode>("front-left");
  const presets =
    viewMode === "front-left" ? FRONT_LEFT_PRESETS : BACK_RIGHT_PRESETS;
  const camera = presets[selected.bays];

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      <div className="fixed top-8 left-4 w-80 h-20 flex items-center z-100 gap-2">
        <span className="text-xs text-muted-foreground pointer-events-none">
          {selected.bays}-bay · {selected.pitchLabel} · {selected.endLabel}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            setViewMode((v) =>
              v === "front-left" ? "back-right" : "front-left",
            )
          }
          className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
        >
          {viewMode === "front-left" ? "Front-left ↺" : "Back-right ↺"}
        </Button>
        <Link
          href={buildCombinationUrl(selected)}
          target="_blank"
          className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2"
        >
          Open →
        </Link>
      </div>
      {/* Canvas */}
      <div className="relative w-full shrink-0" style={{ height: "85%" }}>
        <Canvas
          className="bg-background"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <Suspense fallback={<Loader />}>
            <PerspectiveCamera
              makeDefault
              position={camera.position}
              fov={20}
            />
            <Environment preset="sunset" background={false} />
            <Scene
              collection={selected.collection}
              target={camera.target}
              logLabel={`${selected.bays}-bay`}
            />
          </Suspense>
        </Canvas>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-6 pt-4 fixed bottom-0 w-full h-60">
        <div className="flex flex-col gap-2">
          {DEMO_GROUPS.map((group) => (
            <div
              key={group.bays}
              className="border-b border-muted pb-4 last:border-0 last:pb-0"
            >
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">
                {group.label}
              </h2>
              <div className="grid grid-cols-3 gap-1.5 lg:grid-cols-9">
                {group.items.map((item) => {
                  const isSelected = item.key === selected.key;
                  return (
                    <Button
                      key={item.key}
                      variant="outline"
                      onClick={() => setSelected(item)}
                      className={cn(
                        "h-auto px-2 py-2 text-left text-xs justify-start",
                        isSelected
                          ? "border-primary bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      <span className="block leading-tight">
                        {item.pitchLabel}
                      </span>
                      <span className="block leading-tight opacity-75 diagonal-fractions">
                        {item.endLabel === "Half-Hipped"
                          ? "1/2 Hip"
                          : item.endLabel}
                      </span>
                    </Button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Scene({
  collection,
  target,
  logLabel,
}: {
  collection: Collection;
  target: Vec3;
  logLabel: string;
}) {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  useCameraLogger(controlsRef, logLabel);

  return (
    <>
      <CollectionRenderer collection={collection} />
      <OrbitControls
        ref={controlsRef}
        target={target}
        enableZoom={false}
        maxPolarAngle={Math.PI / 2}
      />
    </>
  );
}
