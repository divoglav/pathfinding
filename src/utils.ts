import { ICell } from "./interfaces/cell.interface";

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
