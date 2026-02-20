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
  const bo = Math.tan(bottomAngle) * t;
  const to = Math.tan(topAngle) * t;

  const bottomFrontY = bo;
  const bottomBackY = -bo;

  // Top vertices (y = height, adjusted for top plumb cut)
  const topFrontY = h + to;
  const topBackY = h - to;

  // UV calculations based on perimeter wrapping (like post)
  const perimeter = 2 * (width + thickness);
  const uFront = width / perimeter;
  const uRight = (width + thickness) / perimeter;
  const uBack = (2 * width + thickness) / perimeter;

  // Calculate UV v coordinates accounting for actual face heights
  // Front face height varies due to plumb cuts
  const frontHeight = Math.abs(topFrontY - bo);
  const backHeight = Math.abs(topBackY + bo);

  const vFront = frontHeight / perimeter;
  const vBack = backHeight / perimeter;
  const vSide = h / perimeter;

  // prettier-ignore
  // biome-ignore format: buffer array
  const tris = new Float32Array([
    // Front face (-z to +z is forward)
    -w, topFrontY, t,       -w, bottomFrontY, t,    w, bottomFrontY, t,
    w, bottomFrontY, t,     w, topFrontY, t,        -w, topFrontY, t,

    // Right face
    w, topFrontY, t,        w, bottomFrontY, t,     w, bottomBackY, -t,
    w, bottomBackY, -t,     w, topBackY, -t,        w, topFrontY, t,

    // Back face
    w, topBackY, -t,        w, bottomBackY, -t,     -w, bottomBackY, -t,
    -w, bottomBackY, -t,    -w, topBackY, -t,       w, topBackY, -t,

    // Left face
    -w, topBackY, -t,       -w, bottomBackY, -t,    -w, bottomFrontY, t,
    -w, bottomFrontY, t,    -w, topFrontY, t,       -w, topBackY, -t,

    // Top face (angled based on topPlumbCutAngle)
    -w, topBackY, -t,       -w, topFrontY, t,       w, topFrontY, t,
    w, topFrontY, t,        w, topBackY, -t,        -w, topBackY, -t,

    // Bottom face (angled based on bottomPlumbCutAngle)
    -w, bottomFrontY, t,    -w, bottomBackY, -t,    w, bottomBackY, -t,
    w, bottomBackY, -t,     w, bottomFrontY, t,     -w, bottomFrontY, t,
  ]);

  // prettier-ignore
  // biome-ignore format: buffer array
  const uvs = new Float32Array([
    // Front face
    0, vFront,    0, 0,         uFront, 0,
    uFront, 0,    uFront, vFront,  0, vFront,

    // Right face
    uFront, vSide,   uFront, 0,    uRight, 0,
    uRight, 0,       uRight, vSide, uFront, vSide,

    // Back face
    uRight, vBack,   uRight, 0,    uBack, 0,
    uBack, 0,        uBack, vBack,  uRight, vBack,

    // Left face
    uBack, vSide,    uBack, 0,     1, 0,
    1, 0,            1, vSide,     uBack, vSide,

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
