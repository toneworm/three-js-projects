"use client";

import { Suspense } from "react";
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useControls, button } from "leva";

import Post from "@/components/building/post";
import Plate from "@/components/building/plate";
import { Loader } from "@/components/general/loader";

export default function ConfiguratorPage() {
  return (
    <div className="h-[calc(100vh-3.5rem)] w-full relative">
      <div className="absolute top-4 left-4 z-10 flex gap-2">...</div>
      <Canvas
        camera={{ position: [-2.77, 3.68, 6.23], fov: 50 }}
        className="bg-background"
      >
        <Suspense fallback={<Loader />}>
          <Suspense fallback={null}>
            <Environment preset="sunset" background={false} />
          </Suspense>

          <Scene />

          {/* <OrbitControls maxPolarAngle={Math.PI / 2 - 0.1} /> */}
          <OrbitControls target={[0, 1.6, -0.3]} />
        </Suspense>
      </Canvas>
    </div>
  );
}

function Scene() {
  // const { camera, controls } = useThree();

  // useControls("Camera Debug", {
  //   "Copy Camera Setup": button(() => {
  //     const pos = camera.position.toArray().map((n) => n.toFixed(2));
  //     const tgt = ((controls as any)?.target?.toArray() || [0, 0, 0]).map(
  //       (n: number) => n.toFixed(2),
  //     );

  //     console.log(`camera={{ position: [${pos.join(", ")}], fov: 50 }}`);
  //     console.log(`target={[${tgt.join(", ")}]}`);
  //   }),
  // });

  return (
    <>
      <Plate
        length={2}
        height={0.1}
        depth={0.1}
        leftEnd="bottom"
        rightEnd="top"
        position={[-1, 0, 0]}
      />

      <Plate
        length={2}
        height={0.1}
        depth={0.1}
        leftEnd="bottom"
        rightEnd="top"
        position={[1, 0, 0]}
      />

      <Plate
        length={4}
        height={0.15}
        depth={0.15}
        jointSize={0.15}
        leftEnd="block"
        rightEnd="block"
        position={[0, 2, 1]}
      />

      <Plate
        length={4}
        height={0.15}
        depth={0.15}
        jointSize={0.15}
        leftEnd="top"
        rightEnd="top"
        position={[0, 2.6, 1.5]}
        rotation-y={Math.PI / 7}
      />

      <Plate
        length={4}
        height={0.15}
        depth={0.15}
        jointSize={0.15}
        leftEnd="block"
        rightEnd="block"
        position={[0, 3, 1]}
        rotation-y={Math.PI / 3}
      />

      <Plate
        length={4}
        height={0.15}
        depth={0.15}
        jointSize={0.15}
        leftEnd="bevel"
        rightEnd="bevel"
        position={[-2, 3, 1]}
        rotation-y={Math.PI / 2}
      />

      <Post
        width={0.15}
        depth={0.15}
        height={1.95}
        showTenon
        position={[-1.925, 0, 1]}
      />

      <Post
        width={0.15}
        depth={0.15}
        height={1.95}
        showTenon
        position={[1.925, 0, 1]}
      />

      <group position={[0, 0, -2]}>
        <Post width={0.15} depth={0.15} height={2.4} showTenon />

        <Post
          width={0.15}
          depth={0.15}
          height={1.9}
          showTenon
          position={[0.5, 0, 0]}
        />

        <Post
          width={0.2}
          depth={0.05}
          height={1.5}
          showTenon
          showBevel
          position={[-0.5, 1, 0]}
        />

        <Post
          width={0.2}
          depth={0.2}
          height={1.5}
          showTenon
          showBevel
          position={[-1, 1.5, 0]}
        />
      </group>
    </>
  );
}
