import { createNoise2D } from "./simplex-noise";

const noise = createNoise2D();

export function get(x: number, y: number, scalar: number = 1) {
  return (noise(x * scalar, y * scalar) + 1) * 0.5;
}
