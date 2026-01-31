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
        camera={{ position: [2, 6, 1], fov: 50 }}
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

          <Post width={0.15} depth={0.15} height={2.4} showTenon />

          <group position={[0.5, 0, 0]}>
            <Post width={0.15} depth={0.15} height={1.9} showTenon />
          </group>

          <group position={[-0.5, 1, 0]}>
            <Post width={0.2} depth={0.05} height={1.4} showTenon showBevel />
          </group>

          <group position={[-1, 1.5, 0]}>
            <Post width={0.2} depth={0.2} height={0.5} showTenon showBevel />
          </group>

          {/* <OrbitControls maxPolarAngle={Math.PI / 2 - 0.1} /> */}
          <OrbitControls />
        </Suspense>
      </Canvas>
    </div>
  );
}
