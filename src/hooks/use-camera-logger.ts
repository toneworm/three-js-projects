// hooks/use-camera-logger.ts
import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

export function useCameraLogger(
  controlsRef: React.RefObject<OrbitControlsImpl | null>,
  label?: string,
) {
  const camera = useThree((s) => s.camera);

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    const r = (n: number) => Math.round(n * 100) / 100;

    const log = () => {
      const p = camera.position;
      const t = controls.target;
      const tag = label ? `${label}: ` : "";
      console.log(
        `${tag}{ position: [${r(p.x)}, ${r(p.y)}, ${r(p.z)}], target: [${r(t.x)}, ${r(t.y)}, ${r(t.z)}] },`,
      );
    };

    controls.addEventListener("end", log);
    return () => controls.removeEventListener("end", log);
  }, [camera, controlsRef, label]);
}
