import "./styles/reset.css";
import "./styles/style.css";
import config from "./config";
import { Display } from "./display";
import { AStar } from "./algorithms/a-star";
//import { SquareGrid } from "./grids/square-grid";
import { HexGrid } from "./grids/hex-grid";

const grid = new HexGrid(config.map.rows, config.map.columns);
grid.createCells();
grid.setupNeighbors();
grid.generateBlocks(config.map.blocks.type);

const cells = grid.getCells();
const startCell = cells[0][0];
grid.unblockCellRecursive(startCell, config.map.unblockSpawnLayers);
const endCell = cells[config.map.rows - 1][config.map.columns - 1];
grid.unblockCellRecursive(endCell, config.map.unblockSpawnLayers);

const canvas = document.createElement("canvas");
canvas.width = config.canvas.width;
canvas.height = config.canvas.height;
document.body.appendChild(canvas);
const context = canvas.getContext("2d");

const display = new Display(context!);
display.clear();

const aStar = new AStar(startCell, endCell);
grid.calculateAllDistancesTo(endCell);

const displayInterval = 1000 / config.display.FPS;
setInterval(() => {
  aStar.iterate();
  display.drawCells(cells);
}, displayInterval);
