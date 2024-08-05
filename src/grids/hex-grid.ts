import { Grid } from "./grid";

export class HexGrid extends Grid {
  setupNeighbors() {
    for (let x = 0; x < this._rows; x++) {
      for (let y = 0; y < this._cols; y++) {
        const cell = this._cells[x][y];

        const isEven = y % 2 === 0;

        const northEast = this.getCell(isEven ? x : x + 1, y - 1);
        const east = this.getCell(x + 1, y);
        const southEast = this.getCell(isEven ? x : x + 1, y + 1);
        const southWest = this.getCell(isEven ? x - 1 : x, y + 1);
        const west = this.getCell(x - 1, y);
        const northWest = this.getCell(isEven ? x - 1 : x, y - 1);

        cell.setNeighbors([northEast, east, southEast, southWest, west, northWest]);
      }
    }
  }
}
