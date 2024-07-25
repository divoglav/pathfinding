import { Cell, Neighbors } from "./cell";

export class Grid {
  private data: Cell[][];

  constructor(rows: number, cols: number) {
    this.data = [];

    for (let r = 0; r < rows; r++) {
      this.data.push([]);

      for (let c = 0; c < cols; c++) {
        const cell = new Cell(r, c);
        this.data[r].push(cell);
      }
    }

    for (let x = 0; x < this.data.length; x++) {
      for (let y = 0; y < this.data.length; y++) {
        const cell = this.data[x][y];

        const north = 0;
        const northEast = 0;
        const east = 0;
        const southEast = 0;
        const south = 0;
        const southWest = 0;
        const west = 0;
        const northWest = 0;
      }
    }
  }

  get(x: number, y: number) {
    return this.data[x][y];
  }
}
