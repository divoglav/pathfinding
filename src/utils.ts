import { ICell } from "./interfaces/cell.interface";
import { SIN_60 } from "./libs/utils/math";

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
  if (!hex) {
    let ratio = height / width;
    return Math.floor(columns * ratio);
  } else {
    // Height of a pointy-topped hexagon is approximately 0.866 times the width
    const hexHeightFactor = 0.866;
    // Calculate the width of one hexagon based on the number of columns
    let hexWidth = width / columns;
    // Calculate the height of one hexagon
    let hexHeight = hexWidth * hexHeightFactor;
    // Calculate the number of rows by dividing the total height by the height of one hexagon
    return Math.floor(height / hexHeight);
  }
}
