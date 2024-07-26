import "./styles/reset.css";
import "./styles/style.css";
import config from "./config";
import { Grid } from "./grid";
import { Display } from "./display";
import * as pathfinding from "./pathfinding";
import { Cell } from "./cell";

function createCanvas() {
  const canvas = document.createElement("canvas");
  canvas.width = config.canvas.width;
  canvas.height = config.canvas.height;
  document.body.appendChild(canvas);
  return canvas;
}

function main() {
  const context = createCanvas().getContext("2d");
  const display = new Display(context!);

  const grid = new Grid(config.grid.rows, config.grid.columns);
  const cells = grid.getCells();

  // -------------------------------- //

  const startCell = cells[0][0];
  startCell.removeState(Cell.BLOCK);
  startCell.addState(Cell.EMPTY);

  const targetCell = cells[config.grid.rows - 1][config.grid.columns - 1];
  targetCell.removeState(Cell.BLOCK);
  targetCell.addState(Cell.EMPTY);

  grid.calculateAllDistancesTo(targetCell);

  pathfinding.aStar(startCell, targetCell);

  // -------------------------------- //

  setInterval(() => {
    display.displayAllCells(cells);
  }, 1000 / config.display.FPS);
}

main();
