import "./styles/reset.css";
import "./styles/style.css";
import config from "./config";
import { Grid } from "./grid";
import { Display } from "./display";
import { AStar } from "./aStar";

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
  display.clear();

  const grid = new Grid(config.grid.rows, config.grid.columns);
  const cells = grid.getCells();

  const topLeft = cells[0][0];
  grid.unblockCellRecursive(topLeft, config.blocks.unblockLayers);

  const bottomRight = cells[config.grid.rows - 1][config.grid.columns - 1];
  grid.unblockCellRecursive(bottomRight, config.blocks.unblockLayers);

  const aStar = new AStar(topLeft, bottomRight);
  grid.calculateAllDistancesTo(bottomRight);

  const loop = setInterval(() => {
    if (aStar.iterate()) clearInterval(loop);
    display.displayFlaggedCells(cells);
    if (config.display.debug) display.displayAllCellsInfo(cells);
  }, 1000 / config.display.FPS);
}

main();
