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
import { getComponentInfo } from "@/lib/utils";
import { ComponentInfoPanel } from "@/components/general/component-info-panel";
import { ConfigurablePanel } from "@/components/general/configurable-panel";
import { useSpring, animated } from "@react-spring/three";
import { useLogPartNames } from "@/hooks/use-log-part-names";
import { garagePocConfig } from "@/data/poc-garage-config";

const garageModelUrl = "/models/garage_poc.glb";

interface GarageMeshProps {
  geometry: THREE.BufferGeometry;
  material: THREE.Material;
  name: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  isSelected: boolean;
  isHovered: boolean;
  onPointerOver: (e: ThreeEvent<PointerEvent>) => void;
  onPointerOut: () => void;
  onClick: (e: ThreeEvent<MouseEvent>) => void;
}

function GarageMesh({
  geometry,
  material,
  position,
  rotation,
  scale,
  isSelected,
  isHovered,
  onPointerOver,
  onPointerOut,
  onClick,
}: GarageMeshProps) {
  // Clone material and apply emissive based on state
  const displayMaterial = (material as THREE.MeshStandardMaterial).clone();

  if (isSelected) {
    displayMaterial.emissive = new THREE.Color(0xffffff);
    displayMaterial.emissiveIntensity = 0.3;
  } else if (isHovered) {
    displayMaterial.emissive = new THREE.Color(0xeeff1a);
    displayMaterial.emissiveIntensity = 0.2;
  }

  return (
    <animated.mesh
      geometry={geometry}
      material={displayMaterial}
      position={position}
      rotation={rotation}
      scale={scale}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      onClick={onClick}
    >
      {(isSelected || isHovered) && (
        <Outlines
          screenspace={true}
          thickness={isSelected ? 0.012 : 0.012}
          color={isSelected ? "white" : "#eeff1a"}
          angle={0}
        />
      )}
    </animated.mesh>
  );
}

function GarageModel({
  selectedComponent,
  setSelectedComponent,
  hoveredComponent,
  setHoveredComponent,
}: {
  selectedComponent: string;
  setSelectedComponent: React.Dispatch<React.SetStateAction<string>>;
  hoveredComponent: string;
  setHoveredComponent: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { scene } = useGLTF(garageModelUrl);

  useLogPartNames(scene);

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

        // if (mesh.name.toLowerCase().includes("plinth")) {
        //   material = new THREE.MeshStandardMaterial({
        //     color: "#8b4a3a",
        //     roughness: 0.9,
        //     metalness: 0.0,
        //   });
        // } else {
        //   material = new THREE.MeshStandardMaterial({
        //     color: "#c9a86a",
        //     roughness: 0.8,
        //     metalness: 0.1,
        //   });
        // }

        material = new THREE.MeshStandardMaterial({
          color: "#c9a86a",
          roughness: 0.8,
          metalness: 0.1,
        });

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
        <GarageMesh
          key={mesh.name}
          {...mesh}
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

export default function InteractiveGaragePage() {
  const [selectedComponent, setSelectedComponent] = useState<string>("");
  const [hoveredComponent, setHoveredComponent] = useState<string>("");

  return (
    <div className="h-[calc(100vh-3.5rem)] w-full relative">
      <ComponentInfoPanel
        info={getComponentInfo(selectedComponent)}
        className="absolute top-4 right-4 w-48 sm:w-64 z-10"
      />
      <ConfigurablePanel
        config={garagePocConfig}
        className="absolute top-4 left-4 w-48 sm:w-64 z-10"
      />

      <Canvas
        camera={{ position: [-10.43, 6.88, 13.47], fov: 50 }}
        className="bg-background"
      >
        <Suspense fallback={<Loader />}>
          <Suspense fallback={null}>
            <Environment preset="sunset" background={false} />
          </Suspense>
          <GarageModel
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
