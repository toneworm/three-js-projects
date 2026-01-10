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
import { Loader } from "@/components/general/loader";
import { getComponentInfoPoc } from "@/lib/utils";
import { ComponentInfoPanel } from "@/components/general/component-info-panel";
import { ConfigurablePanel } from "@/components/general/configurable-panel";
import { useLogPartNames } from "@/hooks/use-log-part-names";
import { garagePocConfig } from "@/data/poc-garage-config";
import { resolveGarageComponents } from "@/lib/poc-garage-resolver";
import { MATERIAL_COLORS } from "@/lib/material-constants";
import {
  GarageFormState,
  GarageComponent,
  GarageComponentWithMaterial,
  MaterialType,
} from "@/types";

const garageModelUrl = "/models/garage_poc_v3.glb";

interface GarageMeshProps {
  geometry: THREE.BufferGeometry;
  material: THREE.Material;
  name: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  isSelected?: boolean;
  isHovered?: boolean;
  onPointerOver?: (e: ThreeEvent<PointerEvent>) => void;
  onPointerOut?: () => void;
  onClick?: (e: ThreeEvent<MouseEvent>) => void;
}

function GarageMesh({
  name,
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

  // Only apply shadows to cladding
  const isCladding = name.toLowerCase().includes("cladding");

  return (
    <mesh
      geometry={geometry}
      material={displayMaterial}
      position={position}
      rotation={rotation}
      scale={scale}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      onClick={onClick}
      castShadow={isCladding}
      receiveShadow={isCladding}
    >
      {(isSelected || isHovered) && (
        <Outlines
          screenspace={true}
          thickness={isSelected ? 0.012 : 0.012}
          color={isSelected ? "white" : "#eeff1a"}
          angle={0}
        />
      )}
    </mesh>
  );
}

function GarageModel({
  selectedComponent,
  setSelectedComponent,
  hoveredComponent,
  setHoveredComponent,
  visibleComponents,
}: {
  selectedComponent: string;
  setSelectedComponent: React.Dispatch<React.SetStateAction<string>>;
  hoveredComponent: string;
  setHoveredComponent: React.Dispatch<React.SetStateAction<string>>;
  visibleComponents: GarageComponentWithMaterial[];
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
        // default material
        const material = new THREE.MeshStandardMaterial({
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

  // Create a map of component names to their materials
  const componentMaterialMap = new Map<GarageComponent, MaterialType>();
  visibleComponents.forEach((comp) => {
    componentMaterialMap.set(comp.name, comp.material);
  });

  // Filter meshes to only show visible components and apply correct materials
  const filteredMeshes = meshes
    .filter((mesh) => componentMaterialMap.has(mesh.name as GarageComponent))
    .map((mesh) => {
      const materialType =
        componentMaterialMap.get(mesh.name as GarageComponent) || "default";

      let material = mesh.material;

      // Cladding materials
      if (["softwood", "larch", "black", "oak"].includes(materialType)) {
        const color = MATERIAL_COLORS[materialType];

        material = new THREE.MeshStandardMaterial({
          color: color,
          roughness: 0.8,
          metalness: 0.1,
        });
      }

      // other materials
      if (materialType === "metal") {
        material = new THREE.MeshStandardMaterial({
          color: "#aaaaaa",
          roughness: 0.4,
          metalness: 1.0,
        });
      }

      if (materialType === "brick") {
        material = new THREE.MeshStandardMaterial({
          color: "#733a25",
          roughness: 0.9,
          metalness: 0.0,
        });
      }

      if (materialType === "glass") {
        // material = new THREE.MeshStandardMaterial({
        //   color: "#a0c8f0",
        //   roughness: 0.1,
        //   metalness: 0.0,
        //   transparent: true,
        //   opacity: 0.6,
        // });

        material = new THREE.MeshPhysicalMaterial({
          color: "#fff",
          roughness: 0.1,
          metalness: 0.0,
          transparent: true,
          opacity: 0.6,
          transmission: 0.9,
          clearcoat: 1.0,
          clearcoatRoughness: 0.1,
        });
      }

      if (materialType === "default") {
        material = new THREE.MeshStandardMaterial({
          color: "#c9a86a",
          roughness: 0.8,
          metalness: 0.1,
        });
      }

      return {
        ...mesh,
        material: material,
      };
    });

  return (
    <group>
      {filteredMeshes.map((mesh) => (
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
  const [visibleComponents, setVisibleComponents] = useState<
    GarageComponentWithMaterial[]
  >([]);

  const handleResolvedChange = (resolved: GarageComponentWithMaterial[]) => {
    setVisibleComponents(resolved);

    console.log("Visible Components:", resolved);
  };

  return (
    <div className="h-[calc(100vh-3.5rem)] w-full relative">
      {/* Hide for now */}
      <ComponentInfoPanel
        info={getComponentInfoPoc(selectedComponent)}
        className="absolute top-4 right-4 w-48 sm:w-64 z-10"
      />
      <ConfigurablePanel<GarageFormState, GarageComponentWithMaterial[]>
        config={garagePocConfig}
        className="absolute top-4 left-4 w-48 sm:w-48 z-10"
        resolver={resolveGarageComponents}
        onResolvedChange={handleResolvedChange}
      />

      {/* Debug display for visible components */}
      {/* {visibleComponents.length > 0 && (
        <div className="absolute bottom-4 left-4 bg-background border border-border p-4 z-10">
          <h3 className="text-sm font-semibold mb-2">Visible Components:</h3>
          <ul className="text-xs space-y-1">
            {visibleComponents.map((component) => (
              <li key={component.name}>
                {component.name} - {component.material}
              </li>
            ))}
          </ul>
        </div>
      )} */}

      <Canvas
        camera={{ position: [-10.43, 6.88, 13.47], fov: 50 }}
        className="bg-background"
        shadows
        onPointerMissed={() => setSelectedComponent("")}
      >
        <Suspense fallback={<Loader />}>
          <Suspense fallback={null}>
            <Environment preset="sunset" background={false} />
          </Suspense>
          <Lighting />
          <GarageModel
            selectedComponent={selectedComponent}
            setSelectedComponent={setSelectedComponent}
            hoveredComponent={hoveredComponent}
            setHoveredComponent={setHoveredComponent}
            visibleComponents={visibleComponents}
          />
          <FloorPlane />
          <OrbitControls
            maxPolarAngle={Math.PI / 2 - 0.05}
            target={[-0.5, 0, 0]}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

function FloorPlane() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[10, 5.2]} />
      <meshStandardMaterial color="#211700" roughness={1} />
    </mesh>
  );
}

function Lighting() {
  return (
    <>
      <directionalLight
        position={[-5, 10, 5]}
        intensity={1.5}
        color="#a7aedb"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.0001}
      />
      <ambientLight intensity={0.3} />
    </>
  );
}
