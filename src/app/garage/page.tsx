"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { Suspense } from "react";
import { Loader } from "@/components/general/loader"; // Add this import

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
        className="bg-background"
      >
        <Suspense fallback={<Loader />}>
          {/* Changed from fallback={null} */}
          <Environment
            files="/hdris/green-lake-bluesky-cloud_0_5K_0c043645-9b9d-43e3-9db5-616be256f73a.exr"
            background={false}
          />
          <BasePlane />
          <GarageModel />
          <OrbitControls />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Add preload for faster loading
useGLTF.preload("/models/garage_002.glb");
