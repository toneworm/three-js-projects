"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { Loader } from "@/components/general/loader";
import { explosionOffsets } from "@/data/positions";
import { Button } from "@/components/ui/button";
import * as THREE from "three";

function GarageModel({ isExploded }: { isExploded: boolean }) {
  const { scene } = useGLTF("/models/garage_002.glb");

  // Log all part names once on mount
  useEffect(() => {
    if (!scene) return;

    const partNames: string[] = [];

    scene.traverse((child) => {
      if (child.name && child.name !== "Scene") {
        partNames.push(child.name);
      }
    });

    console.log("=== All Part Names ===");
    console.log(partNames);

    // Output as ready-to-use object structure
    console.log("\n=== Copy-paste ready format ===");
    const explosionMap = partNames.reduce((acc, name) => {
      acc[name] = [0, 0, 0]; // Default offset
      return acc;
    }, {} as Record<string, [number, number, number]>);
    console.log(JSON.stringify(explosionMap, null, 2));
  }, [scene]);

  // Animate each part based on explosion state
  useEffect(() => {
    if (!scene) return;

    scene.traverse((child) => {
      if (child.name && explosionOffsets[child.name]) {
        const offset = explosionOffsets[child.name];
        const mesh = child as THREE.Object3D;

        // Store original position if not already stored
        if (!mesh.userData.originalPosition) {
          mesh.userData.originalPosition = mesh.position.clone();
        }

        const targetPosition = isExploded
          ? new THREE.Vector3(
              mesh.userData.originalPosition.x + offset[0],
              mesh.userData.originalPosition.y + offset[1],
              mesh.userData.originalPosition.z + offset[2]
            )
          : mesh.userData.originalPosition;

        // Animate the position
        const startPosition = mesh.position.clone();
        const duration = 1000; // 1 second
        const startTime = Date.now();

        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);

          // Ease in-out cubic
          const eased = progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

          mesh.position.lerpVectors(startPosition, targetPosition, eased);

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        animate();
      }
    });
  }, [scene, isExploded]);

  return <primitive object={scene} />;
}

function BasePlane() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[9, 6]} />
      <meshStandardMaterial color="#808080" />
    </mesh>
  );
}

export default function InteractiveGaragePage() {
  const [isExploded, setIsExploded] = useState(false);

  return (
    <div className="h-[calc(100vh-3.5rem)] w-full relative">
      <div className="absolute top-4 left-4 z-10">
        <Button
          onClick={() => setIsExploded(!isExploded)}
          variant="default"
          size="lg"
        >
          {isExploded ? "Collapse" : "Explode"}
        </Button>
      </div>
      <Canvas
        camera={{ position: [5, 5, 5], fov: 50 }}
        className="bg-background"
      >
        <Suspense fallback={<Loader />}>
          {/* Changed from fallback={null} */}
          <Environment
            files="/hdris/green-lake-bluesky-cloud_0_5K_0c043645-9b9d-43e3-9db5-616be256f73a.exr"
            background={false}
          />
          <BasePlane />
          <GarageModel isExploded={isExploded} />
          <OrbitControls />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Add preload for faster loading
useGLTF.preload("/models/garage_002.glb");
