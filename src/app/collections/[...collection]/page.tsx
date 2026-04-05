"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { CollectionRenderer } from "@/components/collections/collection-renderer";
import { Loader } from "@/components/general/loader";
import type { Collection } from "@/types/building";

export default function CollectionPage() {
  const params = useParams();
  const collectionSegments = params.collection as string[];
  const collection = collectionSegments.join("/");
  const [data, setData] = useState<Collection | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCollection() {
      try {
        const json = await import(`@/data/collections/${collection}.json`);
        console.log(`Collection "${collection}":`, json.default);
        setData(json.default);
      } catch (error) {
        console.error(`Failed to load collection "${collection}":`, error);
        setError(`Failed to load collection "${collection}"`);
      }
    }

    if (collection) {
      fetchCollection();
    }
  }, [collection]);

  return (
    <div className="h-[calc(100vh-3.5rem)] w-full relative">
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <span className="text-sm text-muted-foreground">
          {error ? error : `Collection: ${collection}`}
        </span>
      </div>
      <Canvas
        camera={{ position: [-8.77, 5.68, 11.23], fov: 50 }}
        className="bg-background"
      >
        <Suspense fallback={<Loader />}>
          <Suspense fallback={null}>
            <Environment preset="sunset" background={false} />
          </Suspense>

          <Scene data={data} />

          <OrbitControls target={[0, 1.6, -0.3]} />
        </Suspense>
      </Canvas>
    </div>
  );
}

function Scene({ data }: { data: Collection | null }) {
  if (!data) return null;
  return <CollectionRenderer collection={data} />;
}
