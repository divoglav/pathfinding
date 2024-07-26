import "./styles/reset.css";
import "./styles/style.css";
import config from "./config";
import { Grid } from "./grid";
import { Display } from "./display";
import * as pathfinding from "./pathfinding";

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
  grid.unblockCellAndNeighbors(startCell);

  const targetCell = cells[config.grid.rows - 1][config.grid.columns - 1];
  grid.unblockCellAndNeighbors(targetCell);

  grid.calculateAllDistancesTo(targetCell);

  pathfinding.aStar(startCell, targetCell);

  // -------------------------------- //

  setInterval(() => {
    display.displayAllCells(cells);
    display.displayCellValues(cells);
  }, 1000 / config.display.FPS);
}

main();
