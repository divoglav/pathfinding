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

  const grid = new Grid(config.grid.rows, config.grid.columns);
  const cells = grid.getCells();

  const startCell = cells[0][0];
  grid.unblockCellAndNeighbors(startCell);

  const targetCell = cells[config.grid.rows - 1][config.grid.columns - 1];
  grid.unblockCellAndNeighbors(targetCell);

  grid.calculateAllDistancesTo(targetCell);

  const aStar = new AStar(startCell, targetCell);

  display.clear();
  const loop = setInterval(() => {
    console.log(1);
    if (aStar.iterate()) clearInterval(loop);

    display.displayFlaggedCells(cells);
    if (config.display.info) display.displayAllCellsInfo(cells);
  }, 1000 / config.display.FPS);
}

main();
