import config from "../config";
import { Mathematics } from "../libs/utils/mathematics";
import { Grid } from "./grid";

const diagonals: boolean = config.map.squareDiagonals;

export class SquareGrid extends Grid {
  setupNeighbors() {
    for (let x = 0; x < this._cols; x++) {
      for (let y = 0; y < this._rows; y++) {
        const cell = this._cells[x][y];

        if (diagonals) {
          const north = this._getCell(x, y - 1);
          const northEast = this._getCell(x + 1, y - 1);
          const east = this._getCell(x + 1, y);
          const southEast = this._getCell(x + 1, y + 1);
          const south = this._getCell(x, y + 1);
          const southWest = this._getCell(x - 1, y + 1);
          const west = this._getCell(x - 1, y);
          const northWest = this._getCell(x - 1, y + 1);

          cell.setNeighbors([
            this._createNeighbor(north, 1),
            this._createNeighbor(northEast, Mathematics.SQRT_2),
            this._createNeighbor(east, 1),
            this._createNeighbor(southEast, Mathematics.SQRT_2),
            this._createNeighbor(south, 1),
            this._createNeighbor(southWest, Mathematics.SQRT_2),
            this._createNeighbor(west, 1),
            this._createNeighbor(northWest, Mathematics.SQRT_2),
          ]);
        } else {
          const north = this._getCell(x, y - 1);
          const east = this._getCell(x + 1, y);
          const south = this._getCell(x, y + 1);
          const west = this._getCell(x - 1, y);

          cell.setNeighbors([
            this._createNeighbor(north, 1),
            this._createNeighbor(east, 1),
            this._createNeighbor(south, 1),
            this._createNeighbor(west, 1),
          ]);
        }
      }
    }
  }
}
