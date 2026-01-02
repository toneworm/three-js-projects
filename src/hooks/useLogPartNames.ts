import { useEffect } from "react";
import * as THREE from "three";

export function useLogPartNames(scene: THREE.Group | null) {
  useEffect(() => {
    if (!scene) return;

    const partNames: string[] = [];

    scene.traverse((child) => {
      if (child.name && child.name !== "Scene") {
        partNames.push(child.name);
      }
    });

    console.log("=== All Part Names ===");
    console.log(JSON.stringify(partNames, null, 2));
  }, [scene]);
}
