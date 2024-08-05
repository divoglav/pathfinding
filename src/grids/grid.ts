import * as noise from "../libs/noise/noise";
import * as utils from "../utils"; import config from "../config";
import { IGrid } from "../interfaces/grid.interface";
import { ICell } from "../interfaces/cell.interface";
import { Cell } from "../cell";

export abstract class Grid implements IGrid {
  protected readonly _rows: number;
  protected readonly _cols: number;
  protected readonly _cells: ICell[][] = [];

  constructor(rows: number, cols: number) {
    this._rows = rows;
    this._cols = cols;
  }

  createCells() {
    for (let x = 0; x < this._rows; x++) {
      this._cells.push([]);
      for (let y = 0; y < this._cols; y++) {
        const cell = new Cell(x, y);
        this._cells[x].push(cell);
      }
    }
  }

  abstract setupNeighbors(): void;

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

  protected isValidCoordinate(x: number, y: number) {
    return x >= 0 && x < this._rows && y >= 0 && y < this._cols;
  }

  protected getCell(x: number, y: number) {
    return this.isValidCoordinate(x, y) ? this._cells[x][y] : null;
  }

  protected generateRandomBlocks() {
    const percent = config.map.blocks.random.percent;
    for (let x = 0; x < this._rows; x++) {
      for (let y = 0; y < this._cols; y++) {
        const cell = this._cells[x][y];
        if (Math.random() < percent) {
          cell.setBlock();
          cell.skipAnimation();
        }
      }
    }
  }

  protected generateNoiseBlocks() {
    const percent = config.map.blocks.noise.percent;
    const scalar = config.map.blocks.noise.scalar;
    for (let x = 0; x < this._rows; x++) {
      for (let y = 0; y < this._cols; y++) {
        const cell = this._cells[x][y];
        if (noise.get(x, y, scalar) < percent) {
          cell.setBlock();
          cell.skipAnimation();
        }
      }
    }
  }

  getCells() {
    return this._cells;
  }

  calculateAllDistancesTo(target: ICell) {
    const distanceMethod = config.pathfinding.distanceMethod;

    for (let x = 0; x < this._rows; x++) {
      for (let y = 0; y < this._cols; y++) {
        const cell = this._cells[x][y];
        if (distanceMethod === "manhattan") cell.setH(utils.manhattanDistance(cell, target));
        else if (distanceMethod === "euclidean") cell.setH(utils.euclideanDistance(cell, target));
      }
    }
  }

  unblockCellRecursive(cell: ICell, recursions: number = 0) {
    cell.setEmpty();

    const neighbors = cell.getNeighbors();
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
