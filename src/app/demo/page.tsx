"use client";

import { Suspense, useRef, useState } from "react";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

import { CollectionRenderer } from "@/components/collections/collection-renderer";
import { Loader } from "@/components/general/loader";
import { Button } from "@/components/ui/button";
import type { DemoItem } from "@/data/demo-manifest";
import { DEMO_GROUPS, DEMO_ITEMS } from "@/data/demo-manifest";
import { cn } from "@/lib/utils";
import type { Collection, Vec3 } from "@/types/building";

interface CameraPreset {
  position: Vec3;
  target: Vec3;
}

const CAMERA_PRESETS: Record<1 | 2 | 3 | 4 | 5, CameraPreset> = {
  1: { position: [-6.3, 6.74, 17.34], target: [0.4, 1.23, 0.15] },
  2: { position: [-9.02, 7.28, 19.02], target: [0.12, 1.04, 0.0] },
  3: { position: [-10.47, 8.04, 22.18], target: [-0.21, 1.41, 1.31] },
  4: { position: [-11.57, 10.67, 27.77], target: [0.19, 0.86, -0.03] },
  5: { position: [-14.24, 11.84, 32.06], target: [0.04, 1.35, -0.29] },
};

export default function DemoPage() {
  const [selected, setSelected] = useState<DemoItem>(DEMO_ITEMS[0]);
  const camera = CAMERA_PRESETS[selected.bays];

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      {/* Canvas */}
      <div className="relative w-full shrink-0" style={{ height: "55%" }}>
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
            <Scene collection={selected.collection} target={camera.target} />
          </Suspense>
        </Canvas>

        <div className="absolute bottom-3 left-4 pointer-events-none">
          <span className="text-xs text-muted-foreground">
            {selected.bays}-bay · {selected.pitchLabel} · {selected.endLabel}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-6 pt-4">
        <div className="flex flex-col gap-2">
          {DEMO_GROUPS.map((group) => (
            <div key={group.bays}>
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">
                {group.label}
              </h2>
              <div className="grid grid-cols-3 gap-1.5 lg:grid-cols-9 border-b border-muted pb-4">
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
                      <span className="block leading-tight opacity-75">
                        {item.endLabel}
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
}: {
  collection: Collection;
  target: Vec3;
}) {
  const controlsRef = useRef<OrbitControlsImpl>(null);

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
