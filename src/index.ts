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

  // -------------- start -------------- //

  const startCell = cells[0][0];
  startCell.isBlock = false;

  const targetCell = cells[config.grid.rows - 1][config.grid.columns - 1];
  targetCell.isBlock = false;

  pathfinding.aStar(startCell, targetCell, cells);

  setInterval(() => {
    display.displayCells(cells);
  }, 1000 / config.display.FPS);
}

main();
