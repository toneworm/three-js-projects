"use client";

import { Suspense } from "react";
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useControls, button } from "leva";

import Post from "@/components/building/post";
import Plate from "@/components/building/plate";
import Rafter from "@/components/building/rafter";
import { Loader } from "@/components/general/loader";
import RafterBlend from "@/components/building/rafter-blend";
import RafterCSG from "@/components/building/rafter-csg";

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

  // TODO: set up leva to move about objects...

  return (
    <>
      {Array(12)
        .fill(null)
        .map((_, i) => (
          <Rafter
            key={i}
            height={0.1}
            depth={0.015}
            angle={Math.PI / 5}
            // rise={1.5}
            run={1.5}
            cheekAngle={Math.PI / 4}
            position={[0, 0, i * 0.15 - 0.35]}
            mouthSize={0.05}
          />
        ))}

      <Plate
        length={2}
        height={0.1}
        depth={0.1}
        leftEnd="bevel"
        rightEnd="bevel"
        position={[0, -0.1, 0.5]}
        rotation-y={Math.PI / 2}
      />

      {/* <mesh
        position={[1.075, 0.84, 0.075]}
        rotation-x={Math.PI / 2}
        rotation-z={Math.PI / 4}
      >
        <boxGeometry args={[0.2, 2, 0.2]} />
        <meshStandardMaterial color="sandybrown" />
      </mesh> */}

      {/* <group position={[-0.5, 0, 0]}>
        <RafterCSG length={2} height={0.15} depth={0.15} />
      </group>

      <RafterBlend
        width={1.2}
        length={2}
        depth={2}
        angle={Math.PI / 6}
        birdsMouthSeat={0.1}
        birdsMouthDepth={0.1}
        scale={[10, 20, 10]}
      /> */}

      <Plate
        length={2}
        height={0.1}
        depth={0.3}
        leftEnd="block"
        rightEnd="block"
        position={[-1, 1, 0]}
        randomiseTextureOffset={false}
      />

      {/* <Post
        width={0.15}
        depth={0.15}
        height={2.1}
        endSize={0.35}
        position={[-3, 0.5, 1]}
        topEnd="tenon"
        bottomEnd="tenon"
        tenonHeight={0.12}
      />

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
        leftEnd="bottom"
        rightEnd="bottom"
        position={[0, 2, 1]}
      />

      <group visible={true}>
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
      </group>

      <Post
        width={0.15}
        depth={0.15}
        height={2.098}
        position={[-1.925, 0, 1]}
        topEnd="tenon"
      />

      <Post
        width={0.15}
        depth={0.15}
        height={2.098}
        position={[1.925, 0, 1]}
        topEnd="tenon"
      />

      <group position={[0, 0, -2]} visible={true}>
        <Post width={0.15} depth={0.15} height={2.4} />

        <Post width={0.15} depth={0.15} height={1.9} position={[0.5, 0, 0]} />

        <Post width={0.2} depth={0.05} height={1.5} position={[-0.5, 1, 0]} />

        <Post width={0.2} depth={0.2} height={1.5} position={[-1, 1.5, 0]} />
      </group>*/}
    </>
  );
}
