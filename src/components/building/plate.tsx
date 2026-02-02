import { Float, useTexture } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";

type PlateProps = {
  length: number;
  height: number;
  depth: number;
  left?: PlateEndStyle;
  right?: PlateEndStyle;
  jointSize?: number;
};

type PlateEnd = "left" | "right";
type PlateEndStyle = "top" | "bottom" | "block" | "bevel";

const minLength = 1.0;
const maxLength = 5.0;
const minDepth = 0.05;
const maxDepth = 0.3;
const minHeight = 0.05;
const maxHeight = 0.3;

const bevelOffset = 0.015;
const jointSizeDefault = 0.05;

export default function Plate({
  length,
  height,
  depth,
  left = "block",
  right = "block",
  jointSize = jointSizeDefault,
}: PlateProps) {
  const texture = useTexture("/textures/oak_veneer_01_diff_1k.jpg");

  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  if (length < minLength || length > maxLength) {
    console.warn(
      `Post length ${length} out of bounds (${minLength}-${maxLength})`,
    );
    length = Math.min(Math.max(length, minLength), maxLength);
  }

  if (depth < minDepth || depth > maxDepth) {
    console.warn(`Post depth ${depth} out of bounds (${minDepth}-${maxDepth})`);
    depth = Math.min(Math.max(depth, minDepth), maxDepth);
  }

  if (height < minHeight || height > maxHeight) {
    console.warn(
      `Post height ${height} out of bounds (${minHeight}-${maxHeight})`,
    );
    height = Math.min(Math.max(height, minHeight), maxHeight);
  }

  const geometry = useMemo(() => {
    const mainPlateGeo = createMainPlateGeometry(
      length,
      height,
      depth,
      jointSize,
    );

    const endPlateLeftGeo = createEndGeometry(
      "block",
      height,
      depth,
      jointSize,
    );

    endPlateLeftGeo.translate(-(length / 2 - jointSize / 2), 0, 0);

    const endPlateRightGeo = createEndGeometry(
      "block",
      height,
      depth,
      jointSize,
    );

    endPlateRightGeo.rotateY(Math.PI);
    endPlateRightGeo.translate(length / 2 - jointSize / 2, 0, 0);

    const merged = mergeGeometries([
      mainPlateGeo,
      endPlateLeftGeo,
      endPlateRightGeo,
    ]);

    merged.computeBoundingSphere();
    merged.computeBoundingBox();

    return merged;
  }, [length, height, depth, jointSize]);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

function createEndGeometry(
  style: PlateEndStyle,
  height: number,
  depth: number,
  jointSize: number,
): THREE.BufferGeometry {
  switch (style) {
    case "block":
      return createBlockEndGeometry(height, depth, jointSize);
    case "top":
      return createTopJointGeometry(height, depth, jointSize);
    case "bottom":
      return createBottomJointGeometry(height, depth, jointSize);
    case "bevel":
      return createBevelEndGeometry(height, depth, jointSize);
  }
}

function createMainPlateGeometry(
  length: number,
  height: number,
  depth: number,
  jointSize: number,
) {
  const geometry = new THREE.BufferGeometry();

  const d = depth / 2;
  const l = length / 2 - jointSize;
  const h = height;

  const circumference = 2 * (depth + height);
  const uTop = depth / circumference;
  const uBack = (depth + height) / circumference;
  const uBottom = (2 * depth + height) / circumference;
  const uFront = 1;

  // prettier-ignore
  // biome-ignore format: buffer array
  const tris = new Float32Array([
    // Top face
    -l, h, -d, -l, h, d, l, h, d,
    l, h, d, l, h, -d, -l, h, -d,

    // Back face
    -l, 0, -d, -l, h, -d, l, h, -d,
    l, h, -d, l, 0, -d, -l, 0, -d,

    // Bottom face
    -l, 0, d, -l, 0, -d, l, 0, -d,
    l, 0, -d, l, 0, d, -l, 0, d,

    // Front face
    -l, h, d, -l, 0, d, l, 0, d,
    l, 0, d, l, h, d, -l, h, d,
  ]);

  // prettier-ignore
  // biome-ignore format: buffer array
  const UVs = new Float32Array([
    // Top face
    uTop, length, 0, length, 0, 0,
    0, 0, uTop, 0, uTop, length,

    // Back face
    uBack, length, 0, length, 0, 0,
    0, 0, uBack, 0, uBack, length,
    
    // Bottom face
    uBottom, length, 0, length, 0, 0,
    0, 0, uBottom, 0, uBottom, length,

    // Front face
    uFront, length, 0, length, 0, 0,
    0, 0, uFront, 0, uFront, length,
  ]);

  geometry.setAttribute("position", new THREE.BufferAttribute(tris, 3));
  geometry.setAttribute("uv", new THREE.BufferAttribute(UVs, 2));
  geometry.computeVertexNormals();

  return geometry;
}

function createBlockEndGeometry(
  depth: number,
  height: number,
  jointSize: number,
) {
  const geometry = new THREE.BufferGeometry();

  const d = depth / 2;
  const h = height;
  const j = jointSize / 2;

  const circumference = 2 * (depth + height);
  const uTop = depth / circumference;
  const uBack = (depth + height) / circumference;
  const uBottom = (2 * depth + height) / circumference;
  const uFront = 1;

  // prettier-ignore
  // biome-ignore format: buffer array
  const tris = new Float32Array([
    // Top face
    -j, h, -d,  -j, h, d,   j, h, d,
    j, h, d,    j, h, -d,   -j, h, -d,

    // Back face
    -j, 0, -d,  -j, h, -d,  j, h, -d,
    j, h, -d,   j, 0, -d,   -j, 0, -d,

    // Bottom face
    -j, 0, d,   -j, 0, -d,  j, 0, -d,
    j, 0, -d,   j, 0, d,    -j, 0, d,

    // Front face
    -j, h, d,   -j, 0, d,   j, 0, d,
    j, 0, d,    j, h, d,    -j, h, d,

    // End face (facing -X direction)
    -j, h, -d,  -j, 0, -d,  -j, 0, d,
    -j, 0, d,   -j, h, d,   -j, h, -d,
  ]);

  // prettier-ignore
  // biome-ignore format: buffer array
  const UVs = new Float32Array([
    // Top face
    uTop, jointSize,  0, jointSize,  0, 0,
    0, 0,             uTop, 0,       uTop, jointSize,

    // Back face
    uBack, jointSize, 0, jointSize,  0, 0,
    0, 0,             uBack, 0,      uBack, jointSize,
    
    // Bottom face
    uBottom, jointSize, 0, jointSize,  0, 0,
    0, 0,               uBottom, 0,    uBottom, jointSize,

    // Front face
    uFront, jointSize, 0, jointSize,  0, 0,
    0, 0,              uFront, 0,     uFront, jointSize,

    // End face
    0, h,      0, 0,      depth, 0,
    depth, 0,  depth, h,  0, h,
  ]);

  geometry.setAttribute("position", new THREE.BufferAttribute(tris, 3));
  geometry.setAttribute("uv", new THREE.BufferAttribute(UVs, 2));
  geometry.computeVertexNormals();

  return geometry;
}

function createTopJointGeometry(
  depth: number,
  height: number,
  jointSize: number,
) {
  const geometry = new THREE.BufferGeometry();

  return geometry;
}

function createBottomJointGeometry(
  depth: number,
  height: number,
  jointSize: number,
) {
  const geometry = new THREE.BufferGeometry();

  return geometry;
}

function createBevelEndGeometry(
  depth: number,
  height: number,
  jointSize: number,
) {
  const geometry = new THREE.BufferGeometry();

  return geometry;
}
