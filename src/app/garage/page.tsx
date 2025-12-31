"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense } from "react";

function GarageModel() {
  const { scene } = useGLTF("/models/garage_002.glb");
  return <primitive object={scene} />;
}

export default function InteractiveGaragePage() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <h1 className="text-2xl font-bold p-4">Interactive Garage</h1>
      <div className="flex-1">
        <Canvas
          camera={{ position: [5, 5, 5], fov: 50 }}
          className="bg-gray-900"
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <GarageModel />
            <OrbitControls />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
