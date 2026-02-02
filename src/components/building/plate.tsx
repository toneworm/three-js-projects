import { Float, useTexture } from "@react-three/drei";
import { join } from "path";
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
  // const texture = useTexture("/textures/uv_texture.jpg");

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

    // Left end cap - rotate to face -X, then translate
    const endPlateLeftGeo = createBlockEndGeometry(height, depth, jointSize);
    endPlateLeftGeo.rotateZ(Math.PI / 2); // Rotate to point along -X
    endPlateLeftGeo.translate(-length / 2 + jointSize, height / 2, 0);

    // Right end cap - rotate to face +X, then translate
    const endPlateRightGeo = createBlockEndGeometry(height, depth, jointSize);
    endPlateRightGeo.rotateZ(-Math.PI / 2); // Rotate to point along +X
    endPlateRightGeo.translate(length / 2 - jointSize, height / 2, 0);

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
  const uL = (length - 2 * jointSize) / circumference;

  console.log({ uTop, uBack, uBottom, uFront, uL, circumference });

  // prettier-ignore
  // biome-ignore format: buffer array
  const tris = new Float32Array([
    // Top face
    -l, h, -d,  -l, h, d,   l, h, d,
    l, h, d,    l, h, -d,   -l, h, -d,

    // Back face
    -l, 0, -d,  -l, h, -d,  l, h, -d,
    l, h, -d,   l, 0, -d,   -l, 0, -d,

    // Bottom face
    -l, 0, d,   -l, 0, -d,  l, 0, -d,
    l, 0, -d,   l, 0, d,    -l, 0, d,

    // Front face
    -l, h, d,   -l, 0, d,   l, 0, d,
    l, 0, d,    l, h, d,    -l, h, d,
  ]);

  // prettier-ignore
  // biome-ignore format: buffer array
  const UVs = new Float32Array([
    // Top face
    uTop, uL,   0, uL,    0, 0,
    0, 0,           uTop, 0,      uTop, uL,

    // Back face
    uBack, uL,  uTop, uL,    uTop, 0,
    uTop, 0,           uBack, 0,     uBack, uL,
    
    // Bottom face
    uBottom, uL,  uBack, uL,   uBack, 0,
    uBack, 0,         uBottom, 0,      uBottom, uL,

    // Front face
    uFront, uL, uBottom, uL,    uBottom, 0,
    uBottom, 0,     uFront, 0,    uFront, uL,
  ]);

  geometry.setAttribute("position", new THREE.BufferAttribute(tris, 3));
  geometry.setAttribute("uv", new THREE.BufferAttribute(UVs, 2));
  geometry.computeVertexNormals();

  return geometry;
}

function createBlockEndGeometry(
  height: number, // Width when standing upright (X-axis)
  depth: number, // Depth (Z-axis)
  jointSize: number, // Height when standing upright
) {
  const geometry = new THREE.BufferGeometry();

  console.log({ jointSize, depth, height });

  const w = height / 2; // Half-width
  const d = depth / 2; // Half-depth
  const j = jointSize; // Full height

  const circumference = 2 * (height + depth);
  const uFront = depth / circumference;
  const uRight = (depth + height) / circumference;
  const uBack = (2 * depth + height) / circumference;
  const uLeft = 1; // Full wrap
  const vTop = jointSize / circumference;

  // prettier-ignore
  // biome-ignore format: buffer array
  const tris = new Float32Array([
    // Front face (+Z)
    w, j, d,   -w, j, d,   -w, 0, d,   // TR, TL, BL
    -w, 0, d,   w, 0, d,    w, j, d,   // BL, BR, TR

    // Right face (+X)
    w, j, -d,   w, j, d,   w, 0, d,    // TR, TL, BL
    w, 0, d,    w, 0, -d,  w, j, -d,   // BL, BR, TR

    // Back face (-Z)
    -w, j, -d,   w, j, -d,   w, 0, -d,  // TR, TL, BL
    w, 0, -d,   -w, 0, -d,  -w, j, -d,  // BL, BR, TR

    // Left face (-X)
    -w, j, d,   -w, j, -d,   -w, 0, -d,  // TR, TL, BL
    -w, 0, -d,  -w, 0, d,    -w, j, d,   // BL, BR, TR

    // Top face (+Y, end grain)
    w, j, -d,   -w, j, -d,   -w, j, d,   // TR, TL, BL
    -w, j, d,  w, j, d,   w, j, -d,    // BL, BR, TR
  ]);

  // prettier-ignore
  // biome-ignore format: buffer array
  const UVs = new Float32Array([
    // Front face
    uFront, vTop,  0, vTop,       0, 0,
    0, 0,          uFront, 0,     uFront, vTop,

    // Right face
    uRight, vTop,  uFront, vTop,  uFront, 0,
    uFront, 0,     uRight, 0,     uRight, vTop,

    // Back face
    uBack, vTop,   uRight, vTop,  uRight, 0,
    uRight, 0,     uBack, 0,      uBack, vTop,

    // Left face
    uLeft, vTop,   uBack, vTop,   uBack, 0,
    uBack, 0,      uLeft, 0,      uLeft, vTop,

    // Top face (end grain)
    0.25, 0.25,   0, 0.25,   0, 0,
    0, 0,         0.25, 0,   0.25, 0.25,
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
