export function pointPoint(ax: number, ay: number, bx: number, by: number): boolean {
  if (ax === bx && ay === by) {
    return true;
  }
  return false;
}

export function pointCircle(px: number, py: number, cx: number, cy: number, cr: number): boolean {
  const xDistance = px - cx;
  const yDistance = py - cy;

  return xDistance * xDistance + yDistance * yDistance <= cr * cr;
}
