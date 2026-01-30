"use client";

import { Suspense } from "react";
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import Post from "@/components/building/post";
import { Loader } from "@/components/general/loader";

export default function ConfiguratorPage() {
  return (
    <div className="h-[calc(100vh-3.5rem)] w-full relative">
      <div className="absolute top-4 left-4 z-10 flex gap-2">...</div>
      <Canvas
        camera={{ position: [2, 1, 2], fov: 80 }}
        className="bg-background"
      >
        <Suspense fallback={<Loader />}>
          <Suspense fallback={null}>
            <Environment preset="sunset" background={false} />
          </Suspense>

          {/* <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="hotpink" />
          </mesh> */}

          <Post />

          <OrbitControls maxPolarAngle={Math.PI / 2 - 0.1} />
        </Suspense>
      </Canvas>
    </div>
  );
}
