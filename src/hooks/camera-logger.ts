import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";

export function CameraLogger() {
  const { camera } = useThree();
  const lastLogTime = useRef(0);

  useFrame(() => {
    const now = Date.now();
    // Log every 500ms to avoid spam
    if (now - lastLogTime.current > 500) {
      console.log(
        `Camera position: [${camera.position.x.toFixed(
          2
        )}, ${camera.position.y.toFixed(2)}, ${camera.position.z.toFixed(2)}]`
      );
      lastLogTime.current = now;
    }
  });

  return null;
}
