"use client";

import { Suspense, useState } from "react";
import * as THREE from "three";
import { Canvas, ThreeEvent } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Environment,
  Outlines,
} from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/general/loader";
import { getComponentInfo, getExplosionOffset } from "@/lib/utils";
import { ComponentInfoPanel } from "@/components/general/component-info-panel";
import { useSpring, animated } from "@react-spring/three";

const garageModelUrl = "/models/garage_004.glb";

interface GarageMeshV2Props {
  geometry: THREE.BufferGeometry;
  material: THREE.Material;
  name: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  isExploded: boolean;
  isSelected: boolean;
  isHovered: boolean;
  onPointerOver: (e: ThreeEvent<PointerEvent>) => void;
  onPointerOut: () => void;
  onClick: (e: ThreeEvent<MouseEvent>) => void;
}

function GarageMeshV2({
  geometry,
  material,
  name,
  position,
  rotation,
  scale,
  isExploded,
  isSelected,
  isHovered,
  onPointerOver,
  onPointerOut,
  onClick,
}: GarageMeshV2Props) {
  const offset = getExplosionOffset(name) || [0, 0, 0];

  const explodedPosition: [number, number, number] = [
    position[0] + offset[0],
    position[1] + offset[1],
    position[2] + offset[2],
  ];

  // Animated position with ease-in-out cubic
  const { animatedPosition } = useSpring({
    animatedPosition: isExploded ? explodedPosition : position,
    config: {
      duration: 1000,
      easing: (t: number) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
    },
  });

  // Clone material and apply emissive based on state
  const displayMaterial = (material as THREE.MeshStandardMaterial).clone();

  if (isSelected) {
    displayMaterial.emissive = new THREE.Color(0xffffff);
    displayMaterial.emissiveIntensity = 0.3;
  } else if (isHovered) {
    displayMaterial.emissive = new THREE.Color(0xffff00);
    displayMaterial.emissiveIntensity = 0.2;
  }

  return (
    <animated.mesh
      geometry={geometry}
      material={displayMaterial}
      // @ts-ignore - react-spring types issue
      position={animatedPosition}
      rotation={rotation}
      scale={scale}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      onClick={onClick}
    >
      {(isSelected || isHovered) && (
        <Outlines
          thickness={isSelected ? 0.03 : 0.02}
          color={isSelected ? "white" : "yellow"}
          angle={0}
        />
      )}
    </animated.mesh>
  );
}

function GarageModelV2({
  isExploded,
  selectedComponent,
  setSelectedComponent,
  hoveredComponent,
  setHoveredComponent,
}: {
  isExploded: boolean;
  selectedComponent: string;
  setSelectedComponent: React.Dispatch<React.SetStateAction<string>>;
  hoveredComponent: string;
  setHoveredComponent: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { scene } = useGLTF(garageModelUrl);

  // Extract all meshes from the scene with their properties
  const meshes: Array<{
    name: string;
    geometry: THREE.BufferGeometry;
    material: THREE.Material;
    position: [number, number, number];
    rotation: [number, number, number];
    scale: [number, number, number];
  }> = [];

  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      if (mesh.name && mesh.name !== "Scene") {
        // Apply custom materials
        let material;

        if (mesh.name.toLowerCase().includes("plinth")) {
          material = new THREE.MeshStandardMaterial({
            color: "#8b4a3a",
            roughness: 0.9,
            metalness: 0.0,
          });
        } else {
          material = new THREE.MeshStandardMaterial({
            color: "#c9a86a",
            roughness: 0.8,
            metalness: 0.1,
          });
        }

        meshes.push({
          name: mesh.name,
          geometry: mesh.geometry,
          material: material,
          position: [mesh.position.x, mesh.position.y, mesh.position.z],
          rotation: [mesh.rotation.x, mesh.rotation.y, mesh.rotation.z],
          scale: [mesh.scale.x, mesh.scale.y, mesh.scale.z],
        });
      }
    }
  });

  const handlePointerOver = (name: string) => (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    document.body.style.cursor = "pointer";
    setHoveredComponent(name);
  };

  const handlePointerOut = () => {
    document.body.style.cursor = "default";
    setHoveredComponent("");
  };

  const handleClick = (name: string) => (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    setSelectedComponent(name === selectedComponent ? "" : name);
  };

  return (
    <group>
      {meshes.map((mesh) => (
        <GarageMeshV2
          key={mesh.name}
          {...mesh}
          isExploded={isExploded}
          isSelected={mesh.name === selectedComponent}
          isHovered={mesh.name === hoveredComponent}
          onPointerOver={handlePointerOver(mesh.name)}
          onPointerOut={handlePointerOut}
          onClick={handleClick(mesh.name)}
        />
      ))}
    </group>
  );
}

function BasePlaneV2() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[9, 6]} />
      <meshStandardMaterial color="#96886A" roughness={0.9} metalness={0.1} />
    </mesh>
  );
}

export default function InteractiveGarageV2Page() {
  const [isExploded, setIsExploded] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<string>("");
  const [hoveredComponent, setHoveredComponent] = useState<string>("");

  return (
    <div className="h-[calc(100vh-3.5rem)] w-full relative">
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <Button
          onClick={() => setIsExploded(!isExploded)}
          variant="default"
          size="lg"
          className="px-4 uppercase tracking-widest rounded-none"
        >
          {isExploded ? "Collapse" : "Explode"}
        </Button>
      </div>
      <ComponentInfoPanel info={getComponentInfo(selectedComponent)} />
      <Canvas
        camera={{ position: [-10.43, 6.88, 13.47], fov: 50 }}
        className="bg-background"
      >
        <Suspense fallback={<Loader />}>
          <Suspense fallback={null}>
            <Environment preset="sunset" background={false} />
          </Suspense>
          <BasePlaneV2 />
          <GarageModelV2
            isExploded={isExploded}
            selectedComponent={selectedComponent}
            setSelectedComponent={setSelectedComponent}
            hoveredComponent={hoveredComponent}
            setHoveredComponent={setHoveredComponent}
          />
          <OrbitControls maxPolarAngle={Math.PI / 2 - 0.1} />
        </Suspense>
      </Canvas>
    </div>
  );
}
