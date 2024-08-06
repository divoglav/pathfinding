export class Mathematics {
  static readonly PI = 3.141592653589793;
  static readonly TAU = 6.283185307179586;

  static readonly SQRT_2 = 1.4142135623730951;

  static readonly SIN_60 = 0.8660254037844386;
  static readonly COS_60 = 0.5;
  static readonly SIN_45 = 0.7071067811865476;
  static readonly COS_45 = 0.7071067811865476;
  static readonly SIN_30 = 0.5;
  static readonly COS_30 = 0.8660254037844386;

  static degreesToRadians(degrees: number): number {
    return degrees * (this.TAU / 360);
  }

  static radiansToDegrees(radians: number): number {
    return radians * (360 / this.TAU);
  }

  static lerp(a: number, b: number, step: number): number {
    return a + step * (b - a);
  }

  static manhattanDistance(x1: number, y1: number, x2: number, y2: number) {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
  }
}
