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
        cell.addState(Cell.TO_DISPLAY);
        this._cells[x].push(cell);
      }
    }
  }

  generateRandomBlocks() {
    const percent = config.map.blocks.random.percent;
    for (let x = 0; x < this._rows; x++) {
      for (let y = 0; y < this._cols; y++) {
        const cell = this._cells[x][y];
        if (Math.random() < percent) {
          cell.removeState(Cell.EMPTY);
          cell.addState(Cell.BLOCK);
        }
      }
    }
  }

  generateNoiseBlocks() {
    const percent = config.map.blocks.noise.percent;
    const scalar = config.map.blocks.noise.scalar;
    for (let x = 0; x < this._rows; x++) {
      for (let y = 0; y < this._cols; y++) {
        const cell = this._cells[x][y];
        if (noise.get(x, y, scalar) < percent) {
          cell.removeState(Cell.EMPTY);
          cell.addState(Cell.BLOCK);
        }
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

  private isValidCoordinate(x: number, y: number) {
    return x >= 0 && x < this._rows && y >= 0 && y < this._cols;
  }

  getCell(x: number, y: number) {
    return this.isValidCoordinate(x, y) ? this._cells[x][y] : null;
  }

  getCells() {
    return this._cells;
  }

  resetCells() {
    for (let x = 0; x < this._rows; x++) {
      for (let y = 0; y < this._cols; y++) {
        this._cells[x][y].reset();
      }
    }
  }

  calculateAllDistancesTo(target: Cell) {
    for (let x = 0; x < this._rows; x++) {
      for (let y = 0; y < this._cols; y++) {
        this._cells[x][y].calculateHTo(target);
      }
    }
  }

  unblockCellRecursive(cell: Cell, recursions: number = 0) {
    cell.removeState(Cell.BLOCK);
    cell.addState(Cell.EMPTY);

    const neighbors = cell.getNeighbors();
    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];
      if (!neighbor) continue;

      neighbor.removeState(Cell.BLOCK);
      neighbor.addState(Cell.EMPTY);

      if (recursions > 0) {
        this.unblockCellRecursive(neighbor, recursions - 1);
      }
    }
  }
}
