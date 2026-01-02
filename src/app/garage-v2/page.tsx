"use client";

import { Suspense, useEffect, useState } from "react";
import * as THREE from "three";
import { Canvas, ThreeEvent } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/general/loader";
import { getComponentInfo, getExplosionOffset } from "@/lib/utils";
import { ComponentInfoPanel } from "@/components/general/component-info-panel";

const garageModelUrl = "/models/garage_004.glb";

function GarageModelV2({
  isExploded,
  onHover,
  onSelect,
  selectedName,
  hoveredName,
}: {
  isExploded: boolean;
  onHover: (name: string) => void;
  onSelect: (name: string) => void;
  selectedName: string;
  hoveredName: string;
}) {
  const { scene } = useGLTF(garageModelUrl);

  // Apply materials once on mount
  useEffect(() => {
    if (!scene) return;

    const woodMaterial = new THREE.MeshStandardMaterial({
      color: "#c9a86a",
      roughness: 0.8,
      metalness: 0.1,
    });

    const brickMaterial = new THREE.MeshStandardMaterial({
      color: "#8b4a3a",
      roughness: 0.9,
      metalness: 0.0,
    });

    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;

        // Apply materials
        if (mesh.name.toLowerCase().includes("plinth")) {
          mesh.material = brickMaterial;
        } else {
          mesh.material = woodMaterial;
        }
      }
    });
  }, [scene]);

  // Apply hover/selection highlighting
  useEffect(() => {
    if (!scene) return;

    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;

        // Reset emissive
        if (
          mesh.material &&
          (mesh.material as THREE.MeshStandardMaterial).emissive
        ) {
          (mesh.material as THREE.MeshStandardMaterial).emissive.setHex(
            0x000000
          );
          (mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 0;
        }

        // Apply highlight
        if (mesh.name === selectedName) {
          (mesh.material as THREE.MeshStandardMaterial).emissive.setHex(
            0xffffff
          );
          (mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.3;
        } else if (mesh.name === hoveredName) {
          (mesh.material as THREE.MeshStandardMaterial).emissive.setHex(
            0xffff00
          );
          (mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.2;
        }
      }
    });
  }, [scene, selectedName, hoveredName]);

  // Animate each part based on explosion state
  useEffect(() => {
    if (!scene) return;

    scene.traverse((child) => {
      if (child.name) {
        const offset = getExplosionOffset(child.name);

        if (offset) {
          const mesh = child as THREE.Object3D;

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

          const startPosition = mesh.position.clone();
          const duration = 1000;
          const startTime = Date.now();

          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

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

  // Handle pointer events
  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    document.body.style.cursor = "pointer";
    if (e.object.name && e.object.name !== "Scene") {
      onHover(e.object.name);
    }
  };

  const handlePointerOut = () => {
    document.body.style.cursor = "default";
    onHover("");
  };

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    const name = e.object.name;
    if (name && name !== "Scene") {
      onSelect(name === selectedName ? "" : name);
    }
  };

  return (
    <primitive
      object={scene}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    />
  );
}

function BasePlane() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[9, 6]} />
      <meshStandardMaterial color="#96886A" roughness={0.9} metalness={0.1} />
    </mesh>
  );
}

export default function InteractiveGarageV2Page() {
  const [isExploded, setIsExploded] = useState(false);
  const [selectedName, setSelectedName] = useState<string>("");
  const [hoveredName, setHoveredName] = useState<string>("");

  return (
    <div className="h-[calc(100vh-3.5rem)] w-full relative">
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <Button
          onClick={() => setIsExploded(!isExploded)}
          variant="default"
          size="lg"
          className="font-bold"
        >
          {isExploded ? "Collapse" : "Explode"}
        </Button>
      </div>
      <div className="absolute top-24 right-4 z-10 bg-green-900 p-20">
        <ComponentInfoPanel info={getComponentInfo(selectedName)} />
      </div>
      <Canvas
        camera={{ position: [-10.43, 6.88, 13.47], fov: 50 }}
        className="bg-background"
      >
        <Suspense fallback={<Loader />}>
          <Suspense fallback={null}>
            <Environment preset="sunset" background={false} />
          </Suspense>
          <BasePlane />
          <GarageModelV2
            isExploded={isExploded}
            onHover={setHoveredName}
            onSelect={setSelectedName}
            selectedName={selectedName}
            hoveredName={hoveredName}
          />
          <OrbitControls maxPolarAngle={Math.PI / 2 - 0.1} />
        </Suspense>
      </Canvas>
    </div>
  );
}
