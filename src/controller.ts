import { Cell } from "./cell";
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
  console.log(`xCoordinate: ${xCoordinate}, bcrLeft: ${bcrLeft}`);
  console.log(`yCoordinate: ${yCoordinate}, bcrTop: ${bcrTop}`);

  const cell = grid.getCell(x, y);
  if (!cell) return;

  if (!cell.hasState(Cell.BLOCK)) {
    cell.addState(Cell.BLOCK);
    cell.addState(Cell.TO_DISPLAY);
  }
}
