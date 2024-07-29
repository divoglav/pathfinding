import "./styles/reset.css";
import "./styles/style.css";
import * as input from "./input";
import * as controller from "./controller";
import config from "./config";
import { Display } from "./display";
import { AStar } from "./aStar";
import { Grid } from "./grid";

function createCanvas() {
  const canvas = document.createElement("canvas");
  canvas.width = config.canvas.width;
  canvas.height = config.canvas.height;
  document.body.appendChild(canvas);
  return canvas;
}

function main() {
  const grid = new Grid(config.map.rows, config.map.columns);
  grid.createCells();
  grid.setupNeighbors();
  grid.generateBlocks(config.map.blocks.type);

  const cells = grid.getCells();
  const startCell = cells[0][0];
  grid.unblockCellRecursive(startCell, config.map.unblockSpawnLayers);
  const endCell = cells[config.map.rows - 1][config.map.columns - 1];
  grid.unblockCellRecursive(endCell, config.map.unblockSpawnLayers);

  const canvas = createCanvas();
  const bcr = canvas.getBoundingClientRect();
  const context = canvas.getContext("2d");
  const display = new Display(context!);

  input.setup();
  controller.setup(bcr);

  const aStar = new AStar(startCell, endCell);
  grid.calculateAllDistancesTo(endCell);

  const pathfindingInterval = 1000 / config.pathfinding.IPS;
  const pathfindingLoop = () => {
    aStar.iterate();
  };

  const displayInterval = 1000 / config.display.FPS;
  const displayLoop = () => {
    display.drawCells(cells);

    if (input.isClicked()) {
      controller.toggleAt(grid, input.getX(), input.getY());
    }
  };

  setInterval(pathfindingLoop, pathfindingInterval);
  setInterval(displayLoop, displayInterval);
}

main();
