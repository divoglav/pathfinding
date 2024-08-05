import "./styles/reset.css";
import "./styles/style.css";
import * as utils from "./utils";
import config from "./config";
import { IGrid } from "./interfaces/grid.interface";
import { IDisplay } from "./interfaces/display.interface";
import { SquareGrid } from "./grids/square-grid";
import { SquareDisplay } from "./displays/square-display";
import { HexGrid } from "./grids/hex-grid";
import { HexDisplay } from "./displays/hex-display";
import { AStar } from "./algorithms/a-star";

// Grid:

const rows = utils.calculateRowsCount(config.canvas.width, config.canvas.height, config.map.columns, config.map.grid === "hex");

let grid: IGrid;
if (config.map.grid === "hex") grid = new HexGrid(config.map.columns, rows);
else grid = new SquareGrid(config.map.columns, rows);

grid.createCells();
grid.setupNeighbors();
grid.generateBlocks(config.map.blocks.type);

// Cells:

const cells = grid.getCells();
const startCell = cells[0][0];
const endCell = cells[config.map.columns - 1][rows - 1];
grid.unblockCellRecursive(startCell, config.map.unblockSpawnLayers);
grid.unblockCellRecursive(endCell, config.map.unblockSpawnLayers);

// Canvas:

const canvas = document.createElement("canvas");
canvas.width = config.canvas.width;
canvas.height = config.canvas.height;
document.body.appendChild(canvas);
const context = canvas.getContext("2d");

// Display:

let display: IDisplay;
if (config.map.grid === "hex") display = new HexDisplay(context!);
else display = new SquareDisplay(context!);
display.clear();

// Algorithm:

const aStar = new AStar(startCell, endCell);
grid.calculateAllDistancesTo(endCell);

// Loop:
const displayInterval = 1000 / config.display.FPS;
setInterval(() => {
  aStar.iterate();
  display.drawCells(cells);
}, displayInterval);
