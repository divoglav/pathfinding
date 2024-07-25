export function bool(): boolean {
  return Math.random() > 0.5;
}

export function range(from: number, to: number): number {
  return from + Math.random() * (to - from);
}
