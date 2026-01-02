"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { Loader } from "@/components/general/loader";
import {
  explosionGroupOffsets,
  explosionIndividualOffsets,
} from "@/data/positions";
import { Button } from "@/components/ui/button";
import * as THREE from "three";
import { useLogPartNames } from "@/hooks/useLogPartNames";
import { useSearchParams } from "next/navigation";
import { CameraLogger } from "@/hooks/camera-logger";

const garageModelUrl = "/models/garage_004.glb";
const explosionMultiplier = 1.2;

// Helper function to find offset based on prefix matching
function getExplosionOffset(name: string): [number, number, number] | null {
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

function GarageModel({
  isExploded,
  testMode,
}: {
  isExploded: boolean;
  testMode: boolean;
}) {
  const { scene } = useGLTF(garageModelUrl);

  // Log all part names once on mount (only in test mode)
  useLogPartNames(scene, testMode);

  // Apply materials once on mount
  useEffect(() => {
    if (!scene) return;

    // Define materials
    const woodMaterial = new THREE.MeshStandardMaterial({
      color: "#c9a86a", // Desaturated, faded yellow/orange wood
      roughness: 0.8,
      metalness: 0.1,
    });

    const brickMaterial = new THREE.MeshStandardMaterial({
      color: "#8b4a3a", // Red brick color
      roughness: 0.9,
      metalness: 0.0,
    });

    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;

        // Apply red brick material to wall plinth
        if (mesh.name.toLowerCase().includes("plinth")) {
          mesh.material = brickMaterial;
        } else {
          // Apply wood material to all other components
          mesh.material = woodMaterial;
        }
      }
    });
  }, [scene]);

  // Animate each part based on explosion state
  useEffect(() => {
    if (!scene) return;

    scene.traverse((child) => {
      if (child.name) {
        const offset = getExplosionOffset(child.name);

        if (offset) {
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
            const eased =
              progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;

            mesh.position.lerpVectors(startPosition, targetPosition, eased);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          animate();
        }
      }
    });
  }, [scene, isExploded]);

  return <primitive object={scene} />;
}

function BasePlane() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[9, 6]} />
      <meshStandardMaterial color="#96886A" roughness={0.9} metalness={0.1} />
    </mesh>
  );
}

function GarageScene() {
  const [isExploded, setIsExploded] = useState(false);
  const searchParams = useSearchParams();
  const testMode = searchParams.get("test") === "true";

  return (
    <div className="h-[calc(100vh-3.5rem)] w-full relative">
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <Button
          onClick={() => setIsExploded(!isExploded)}
          variant="default"
          size="lg"
        >
          {isExploded ? "Collapse" : "Explode"}
        </Button>
        {testMode && (
          <div className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold">
            TEST MODE
          </div>
        )}
      </div>
      <Canvas
        camera={{ position: [-10.43, 6.88, 13.47], fov: 50 }}
        className="bg-background"
      >
        <Suspense fallback={<Loader />}>
          {testMode && <CameraLogger />}
          {/* <Environment
            files="/hdris/green-lake-bluesky-cloud_0_5K_0c043645-9b9d-43e3-9db5-616be256f73a.exr"
            background={false}
          /> */}
          <hemisphereLight
            args={["#87CEEB", "#8B7355", 4]}
            position={[0, 10, 0]}
          />
          <BasePlane />
          <GarageModel isExploded={isExploded} testMode={testMode} />
          <OrbitControls maxPolarAngle={Math.PI / 2 - 0.1} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default function InteractiveGaragePage() {
  return (
    <Suspense fallback={<Loader />}>
      <GarageScene />
    </Suspense>
  );
}

// Add preload for faster loading
// useGLTF.preload(garageModelUrl);
