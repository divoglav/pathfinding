import { Grid } from "./grid";

export class HexGrid extends Grid {
  setupNeighbors() {
    for (let x = 0; x < this._cols; x++) {
      for (let y = 0; y < this._rows; y++) {
        const cell = this._cells[x][y];

        const isEven = y % 2 === 0;

        const northEast = this._getCell(isEven ? x : x + 1, y - 1);
        const east = this._getCell(x + 1, y);
        const southEast = this._getCell(isEven ? x : x + 1, y + 1);
        const southWest = this._getCell(isEven ? x - 1 : x, y + 1);
        const west = this._getCell(x - 1, y);
        const northWest = this._getCell(isEven ? x - 1 : x, y - 1);

        cell.setNeighbors([
          this._createNeighbor(northEast),
          this._createNeighbor(east),
          this._createNeighbor(southEast),
          this._createNeighbor(southWest),
          this._createNeighbor(west),
          this._createNeighbor(northWest),
        ]);
      }
    }
  }
}
