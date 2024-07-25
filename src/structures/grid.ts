import { Cell } from "./cell";

export class Grid {
  private rows: number;
  private cols: number;
  private cells: Cell[][] = [];

  constructor(_rows: number, _cols: number) {
    this.rows = _rows;
    this.cols = _cols;

    this.createCells();
    this.setupNeighbors();
  }

  private createCells() {
    for (let x = 0; x < this.rows; x++) {
      this.cells.push([]);
      for (let y = 0; y < this.cols; y++) {
        const cell = new Cell(x, y);
        if (Math.random() < 0.1) cell.setBlock(true);
        this.cells[x].push(cell);
      }
    }
  }

  private setupNeighbors() {
    for (let x = 0; x < this.rows; x++) {
      for (let y = 0; y < this.cols; y++) {
        const cell = this.cells[x][y];

        const north = this.getCell(x, y - 1);
        const northEast = this.getCell(x + 1, y - 1);
        const east = this.getCell(x + 1, y);
        const southEast = this.getCell(x + 1, y + 1);
        const south = this.getCell(x, y + 1);
        const southWest = this.getCell(x - 1, y + 1);
        const west = this.getCell(x - 1, y);
        const northWest = this.getCell(x - 1, y - 1);

        cell.setNeighbors([north, northEast, east, southEast, south, southWest, west, northWest]);
      }
    }
  }

  private isValidCoordinate(x: number, y: number) {
    return x >= 0 && x < this.rows && y >= 0 && y < this.cols;
  }

  getCell(x: number, y: number) {
    return this.isValidCoordinate(x, y) ? this.cells[x][y] : null;
  }

  getCells() {
    return this.cells;
  }
}
