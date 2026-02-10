import { type RafterGeometryProps } from "@/components/building/rafter";

type ResolvedRafterGeometry = {
  run: number;
  rise: number;
  angle: number;
  length: number; // hypotenuse — always derived
};

export function resolveRafterGeometry({
  run: rawRun,
  rise: rawRise,
  angle: rawAngle,
}: RafterGeometryProps): ResolvedRafterGeometry {
  if (rawRun !== undefined && rawRise !== undefined) {
    // run + rise → derive angle and length
    const angle = Math.atan2(rawRise, rawRun);
    const length = Math.sqrt(rawRun ** 2 + rawRise ** 2);
    return { run: rawRun, rise: rawRise, angle, length };
  }

  if (rawRun !== undefined && rawAngle !== undefined) {
    // run + angle → derive rise and length
    const rise = rawRun * Math.tan(rawAngle);
    const length = rawRun / Math.cos(rawAngle);
    return { run: rawRun, rise, angle: rawAngle, length };
  }

  // rise + angle → derive run and length
  const run = rawRise / Math.tan(rawAngle);
  const length = rawRise / Math.sin(rawAngle);
  return { run, rise: rawRise, angle: rawAngle, length };
}
