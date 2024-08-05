import { Grid } from "./grid";

export class SquareGrid extends Grid {
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
}
