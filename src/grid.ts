import { Cell } from "./cell";
import config from "./config";
import * as noise from "./libs/noise/noise";

export class Grid {
  private readonly _rows: number;
  private readonly _cols: number;
  private readonly _cells: Cell[][] = [];

  constructor(rows: number, cols: number) {
    this._rows = rows;
    this._cols = cols;
  }

  createCells() {
    for (let x = 0; x < this._rows; x++) {
      this._cells.push([]);
      for (let y = 0; y < this._cols; y++) {
        const cell = new Cell(x, y);
        cell.setEmpty();
        cell.setDisplay();
        this._cells[x].push(cell);
      }
    }
  }

  setupNeighbors() {
    for (let x = 0; x < this._rows; x++) {
      for (let y = 0; y < this._cols; y++) {
        const cell = this._cells[x][y];

        const north = this.getCell(x, y - 1);
        const east = this.getCell(x + 1, y);
        const south = this.getCell(x, y + 1);
        const west = this.getCell(x - 1, y);

        cell.setNeighbors([north, east, south, west]);
      }
    }
  }

  generateBlocks(type: string) {
    switch (type) {
      case "random":
        this.generateRandomBlocks();
        break;
      case "noise":
        this.generateNoiseBlocks();
        break;
      default:
        break;
    }
  }

  getCell(x: number, y: number) {
    return this.isValidCoordinate(x, y) ? this._cells[x][y] : null;
  }

  getCells() {
    return this._cells;
  }

  private generateRandomBlocks() {
    const percent = config.map.blocks.random.percent;
    for (let x = 0; x < this._rows; x++) {
      for (let y = 0; y < this._cols; y++) {
        const cell = this._cells[x][y];
        if (Math.random() < percent) cell.setBlock();
      }
    }
  }

  private generateNoiseBlocks() {
    const percent = config.map.blocks.noise.percent;
    const scalar = config.map.blocks.noise.scalar;
    for (let x = 0; x < this._rows; x++) {
      for (let y = 0; y < this._cols; y++) {
        const cell = this._cells[x][y];
        if (noise.get(x, y, scalar) < percent) cell.setBlock();
      }
    }
  }

  private isValidCoordinate(x: number, y: number) {
    return x >= 0 && x < this._rows && y >= 0 && y < this._cols;
  }

  calculateAllDistancesTo(target: Cell) {
    const distanceMethod = config.pathfinding.distanceMethod;

    for (let x = 0; x < this._rows; x++) {
      for (let y = 0; y < this._cols; y++) {
        const cell = this._cells[x][y];
        if (distanceMethod === "manhattan") cell.setH(this.manhattanDistance(cell, target));
        else if (distanceMethod === "euclidean") cell.setH(this.euclideanDistance(cell, target));
      }
    }
  }

  private euclideanDistance(from: Cell, to: Cell) {
    const xDifference = from.x - to.x;
    const yDifference = from.y - to.y;
    return Math.sqrt(xDifference * xDifference + yDifference * yDifference);
  }

  private manhattanDistance(from: Cell, to: Cell) {
    return Math.abs(from.x - to.x) + Math.abs(from.y - to.y);
  }

  unblockCellRecursive(cell: Cell, recursions: number = 0) {
    cell.setEmpty();

    const neighbors = cell.neighbors;
    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];
      if (!neighbor) continue;

      neighbor.setEmpty();

      if (recursions > 0) {
        this.unblockCellRecursive(neighbor, recursions - 1);
      }
    }
  }
}
