import { Cell } from "./cell";

export class Grid {
  private rows: number;
  private cols: number;
  private data: Cell[][] = [];

  constructor(_rows: number, _cols: number) {
    this.rows = _rows;
    this.cols = _cols;

    this.setupData();
    this.setupNeighbors();
  }

  private setupData() {
    for (let x = 0; x < this.rows; x++) {
      this.data.push([]);
      for (let y = 0; y < this.cols; y++) {
        const cell = new Cell(x, y);
        this.data[x].push(cell);
      }
    }
  }

  private setupNeighbors() {
    for (let x = 0; x < this.rows; x++) {
      for (let y = 0; y < this.cols; y++) {
        const cell = this.data[x][y];

        const north = this.get(x, y - 1);
        const northEast = this.get(x + 1, y - 1);
        const east = this.get(x + 1, y);
        const southEast = this.get(x + 1, y + 1);
        const south = this.get(x, y + 1);
        const southWest = this.get(x - 1, y + 1);
        const west = this.get(x - 1, y);
        const northWest = this.get(x - 1, y - 1);

        cell.setNeighbors([north, northEast, east, southEast, south, southWest, west, northWest]);
      }
    }
  }

  private isValidCoordinate(x: number, y: number) {
    return x >= 0 && x < this.rows && y >= 0 && y < this.cols;
  }

  get(x: number, y: number) {
    return this.isValidCoordinate(x, y) ? this.data[x][y] : null;
  }
}
