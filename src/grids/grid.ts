import * as noise from "../libs/noise/noise";
import config from "../config";
import { Utils } from "../utils";
import { IGrid } from "../interfaces/grid.interface";
import { ICell, Neighbor } from "../interfaces/cell.interface";
import { Cell } from "../cell";

export abstract class Grid implements IGrid {
  protected readonly _cols: number;
  protected readonly _rows: number;
  protected readonly _cells: ICell[][] = [];

  constructor(cols: number, rows: number) {
    this._cols = cols;
    this._rows = rows;
  }

  createCells() {
    for (let x = 0; x < this._cols; x++) {
      this._cells.push([]);
      for (let y = 0; y < this._rows; y++) {
        const cell = new Cell(x, y);
        this._cells[x].push(cell);
      }
    }
  }

  protected createNeighbor(cell: ICell | null, moveCost: number = 1): Neighbor {
    if (!cell) return null;
    return { cell: cell, moveCost: moveCost };
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
    return x >= 0 && x < this._cols && y >= 0 && y < this._rows;
  }

  protected getCell(x: number, y: number) {
    return this.isValidCoordinate(x, y) ? this._cells[x][y] : null;
  }

  protected generateRandomBlocks() {
    const percent = config.map.blocks.random.percent;
    for (let x = 0; x < this._cols; x++) {
      for (let y = 0; y < this._rows; y++) {
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
    for (let x = 0; x < this._cols; x++) {
      for (let y = 0; y < this._rows; y++) {
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

    for (let x = 0; x < this._cols; x++) {
      for (let y = 0; y < this._rows; y++) {
        const cell = this._cells[x][y];
        if (distanceMethod === "manhattan") cell.setH(Utils.manhattanDistance(cell, target));
        else if (distanceMethod === "euclidean") cell.setH(Utils.euclideanDistance(cell, target));
      }
    }
  }

  unblockCellRecursive(cell: ICell, recursions: number = 0) {
    cell.setEmpty();

    const neighbors = cell.getNeighbors();
    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];
      if (!neighbor) continue;

      neighbor.cell.setEmpty();

      if (recursions > 0) {
        this.unblockCellRecursive(neighbor.cell, recursions - 1);
      }
    }
  }
}
