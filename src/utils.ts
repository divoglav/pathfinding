import { ICell } from "./interfaces/cell.interface";
import { COS_30, SIN_60 } from "./libs/utils/math";

// TODO: this shouldn't be accurate just based on grid
// coordinates. Calculate real values.
export function euclideanDistance(from: ICell, to: ICell) {
  const xDifference = from.x - to.x;
  const yDifference = from.y - to.y;
  return Math.sqrt(xDifference * xDifference + yDifference * yDifference);
}

export function manhattanDistance(from: ICell, to: ICell) {
  return Math.abs(from.x - to.x) + Math.abs(from.y - to.y);
}

export function calculateRowsCount(width: number, height: number, columns: number, hex: boolean = false) {
  const ratio = height / width;

  if (hex) return Math.floor(columns * ratio * (1 / COS_30));
  return Math.floor(columns * ratio);
}
