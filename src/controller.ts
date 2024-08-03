import config from "./config";
import { Grid } from "./grid";

let bcrTop: number = 0;
let bcrLeft: number = 0;

const rows = config.map.rows;
const cols = config.map.columns;
const cellWidth = config.canvas.width / rows;
const cellHeight = config.canvas.height / cols;
const cellHalfWidth = cellWidth / 2;
const cellHalfHeight = cellHeight / 2;

export function setup(_bcr: DOMRect) {
  bcrLeft = _bcr.left;
  bcrTop = _bcr.top;
}

export function toggleAt(grid: Grid, xCoordinate: number, yCoordinate: number) {
  const x = Math.round((xCoordinate - bcrLeft - cellHalfWidth) / cellWidth);
  const y = Math.round((yCoordinate - bcrTop - cellHalfHeight) / cellHeight);

  const cell = grid.getCell(x, y);
  if (!cell) return;

  if (!cell.isBlock) {
    cell.setBlock();
    cell.setDisplay(true);
  }
}
