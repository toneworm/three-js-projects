import * as THREE from "three";

export function createStuddingGeo(
  width: number,
  height: number,
  thickness: number,
  bottomAngle: number,
  topAngle: number,
): THREE.BufferGeometry {
  const geometry = new THREE.BufferGeometry();

  const w = width / 2;
  const t = thickness / 2;
  const h = height;
  // Angles now affect left/right (X direction) instead of back/front (Z)
  const bo = Math.tan(bottomAngle) * w;
  const to = Math.tan(topAngle) * w;

  // Bottom Y values vary from left (-w) to right (+w)
  const bottomLeftY = -bo;
  const bottomRightY = bo;

  // Top Y values vary from left (-w) to right (+w)
  const topLeftY = h - to;
  const topRightY = h + to;

  // UV calculations based on perimeter wrapping (like post)
  const perimeter = 2 * (width + thickness);
  const uFront = width / perimeter;
  const uRight = (width + thickness) / perimeter;
  const uBack = (2 * width + thickness) / perimeter;

  // Calculate UV v coordinates accounting for actual face heights
  const leftHeight = Math.abs(topLeftY - bottomLeftY);
  const rightHeight = Math.abs(topRightY - bottomRightY);

  const vFront = h / perimeter;
  const vBack = h / perimeter;
  const vLeft = leftHeight / perimeter;
  const vRight = rightHeight / perimeter;

  // prettier-ignore
  // biome-ignore format: buffer array
  const tris = new Float32Array([
    // Front face (-z to +z is forward) - angles affect left/right
    -w, topLeftY, t,        -w, bottomLeftY, t,     w, bottomRightY, t,
    w, bottomRightY, t,     w, topRightY, t,        -w, topLeftY, t,

    // Right face - constant height on right side
    w, topRightY, t,        w, bottomRightY, t,     w, bottomRightY, -t,
    w, bottomRightY, -t,    w, topRightY, -t,       w, topRightY, t,

    // Back face - angles affect left/right (mirrored)
    w, topRightY, -t,       w, bottomRightY, -t,    -w, bottomLeftY, -t,
    -w, bottomLeftY, -t,    -w, topLeftY, -t,       w, topRightY, -t,

    // Left face - constant height on left side
    -w, topLeftY, -t,       -w, bottomLeftY, -t,    -w, bottomLeftY, t,
    -w, bottomLeftY, t,     -w, topLeftY, t,        -w, topLeftY, -t,

    // Top face (angled from left to right based on topPlumbCutAngle)
    -w, topLeftY, -t,       -w, topLeftY, t,        w, topRightY, t,
    w, topRightY, t,        w, topRightY, -t,       -w, topLeftY, -t,

    // Bottom face (angled from left to right based on bottomPlumbCutAngle)
    -w, bottomLeftY, t,     -w, bottomLeftY, -t,    w, bottomRightY, -t,
    w, bottomRightY, -t,    w, bottomRightY, t,     -w, bottomLeftY, t,
  ]);

  // TODO: fix this texture when angles are adjusted (calculate heights correctly for each face)

  // prettier-ignore
  // biome-ignore format: buffer array
  const uvs = new Float32Array([
    // Front face
    0, vFront,    0, 0,         uFront, 0,
    uFront, 0,    uFront, vFront,  0, vFront,

    // Right face
    uFront, vRight,  uFront, 0,    uRight, 0,
    uRight, 0,       uRight, vRight, uFront, vRight,

    // Back face
    uRight, vBack,   uRight, 0,    uBack, 0,
    uBack, 0,        uBack, vBack,  uRight, vBack,

    // Left face
    uBack, vLeft,    uBack, 0,     1, 0,
    1, 0,            1, vLeft,     uBack, vLeft,

    // Top face (end grain - use simple planar projection)
    0, 0,            0, 1,         1, 1,
    1, 1,            1, 0,         0, 0,

    // Bottom face (end grain - use simple planar projection)
    0, 0,            0, 1,         1, 1,
    1, 1,            1, 0,         0, 0,
  ]);

  geometry.setAttribute("position", new THREE.BufferAttribute(tris, 3));
  geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
  geometry.computeVertexNormals();

  return geometry;
}
