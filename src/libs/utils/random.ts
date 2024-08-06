export class Random {
  static bool(): boolean {
    return Math.random() > 0.5;
  }

  static range(from: number, to: number): number {
    return from + Math.random() * (to - from);
  }
}
