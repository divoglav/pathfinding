import { Cell } from "./cell";

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
  }

  get(x: number, y: number) {
    return this.data[x][y];
  }
}
