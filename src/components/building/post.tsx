import { useMemo } from "react";
import * as THREE from "three";

type PostDimensions = {
  width: number;
  height: number;
  depth: number;
};

export default function Post() {
  return (
    <mesh>
      <primitive object={generatePostGeometry()} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

function generatePostGeometry(
  { width, height, depth }: PostDimensions = {
    width: 0.1,
    height: 2,
    depth: 0.1,
  },
) {
  const geometry = useMemo(
    () => new THREE.BoxGeometry(width, height, depth),
    [width, height, depth],
  );

  return geometry;
}
