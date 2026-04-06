"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { CollectionRenderer } from "@/components/collections/collection-renderer";
import { Loader } from "@/components/general/loader";
import type { Collection } from "@/types/building";

interface CombinationData {
  name: string;
  description: string;
  collections: string[];
}

export default function CombinationPage() {
  const params = useParams();
  const combinationSegments = params.combination as string[];
  const combination = combinationSegments.join("/");
  const [data, setData] = useState<Collection | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [combinationInfo, setCombinationInfo] =
    useState<CombinationData | null>(null);

  useEffect(() => {
    async function fetchCombination() {
      try {
        // Load the combination definition
        const combinationJson = await import(
          `@/data/combinations/${combination}.json`
        );
        const combinationData: CombinationData = combinationJson.default;
        setCombinationInfo(combinationData);

        console.log(`Combination "${combination}":`, combinationData);

        // Load all collections referenced in the combination
        const collectionPromises = combinationData.collections.map(
          async (collectionPath) => {
            try {
              const collectionJson = await import(
                `@/data/collections/${collectionPath}.json`
              );
              return collectionJson.default;
            } catch (error) {
              console.error(
                `Failed to load collection "${collectionPath}":`,
                error,
              );
              return null;
            }
          },
        );

        const collections = await Promise.all(collectionPromises);
        const validCollections = collections.filter(
          (c): c is Collection => c !== null,
        );

        // Merge all components from all collections
        const mergedComponents = validCollections.flatMap(
          (collection) => collection.components || [],
        );

        // Create merged collection
        const mergedCollection: Collection = {
          name: combinationData.name,
          description: combinationData.description,
          components: mergedComponents,
        };

        console.log(
          `Merged collection with ${mergedComponents.length} components`,
        );
        setData(mergedCollection);
      } catch (error) {
        console.error(`Failed to load combination "${combination}":`, error);
        setError(`Failed to load combination "${combination}"`);
      }
    }

    if (combination) {
      fetchCombination();
    }
  }, [combination]);

  return (
    <div className="h-[calc(100vh-3.5rem)] w-full relative">
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-1">
        <span className="text-sm text-muted-foreground">
          {error ? error : `Combination: ${combination}`}
        </span>
        {combinationInfo && (
          <span className="text-xs text-muted-foreground">
            {combinationInfo.description}
          </span>
        )}
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
