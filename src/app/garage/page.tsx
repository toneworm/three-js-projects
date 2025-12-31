"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense } from "react";

function GarageModel() {
  const { scene } = useGLTF("/models/garage_002.glb");
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
  return (
    <div className="h-[calc(100vh-3.5rem)] w-full">
      <Canvas
        camera={{ position: [5, 5, 5], fov: 50 }}
        className="bg-gray-900"
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <BasePlane />
          <GarageModel />
          <OrbitControls />
        </Suspense>
      </Canvas>
    </div>
  );
}
