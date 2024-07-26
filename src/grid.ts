import config from "./config";
import { Cell } from "./cell";

export class Grid {
  private _rows: number;
  private _cols: number;
  private _cells: Cell[][] = [];

  constructor(rows: number, cols: number) {
    this._rows = rows;
    this._cols = cols;

    this.createCells();
    this.setupNeighbors();
  }

  private createCells() {
    const blockChance = config.cell.blockChance;

    for (let x = 0; x < this._rows; x++) {
      this._cells.push([]);

      for (let y = 0; y < this._cols; y++) {
        const cell = new Cell(x, y);

        if (Math.random() < blockChance) cell.addState(Cell.BLOCK);

        this._cells[x].push(cell);
      }
    }
  }

  private setupNeighbors() {
    for (let x = 0; x < this._rows; x++) {
      for (let y = 0; y < this._cols; y++) {
        const cell = this._cells[x][y];

        const north = this.getCell(x, y - 1);
        //const northEast = this.getCell(x + 1, y - 1);
        const east = this.getCell(x + 1, y);
        //const southEast = this.getCell(x + 1, y + 1);
        const south = this.getCell(x, y + 1);
        //const southWest = this.getCell(x - 1, y + 1);
        const west = this.getCell(x - 1, y);
        //const northWest = this.getCell(x - 1, y - 1);

        //cell.setNeighbors([north, northEast, east, southEast, south, southWest, west, northWest]);
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
}
