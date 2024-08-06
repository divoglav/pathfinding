import config from "../config";
import { Grid } from "./grid";

const diagonals: boolean = config.map.squareDiagonals;

export class SquareGrid extends Grid {
  setupNeighbors() {
    for (let x = 0; x < this._cols; x++) {
      for (let y = 0; y < this._rows; y++) {
        const cell = this._cells[x][y];

        if (diagonals) {
          const north = this.getCell(x, y - 1);
          const northEast = this.getCell(x + 1, y - 1);
          const east = this.getCell(x + 1, y);
          const southEast = this.getCell(x + 1, y + 1);
          const south = this.getCell(x, y + 1);
          const southWest = this.getCell(x - 1, y + 1);
          const west = this.getCell(x - 1, y);
          const northWest = this.getCell(x - 1, y + 1);

          cell.setNeighbors([
            this.createNeighbor(north),
            this.createNeighbor(northEast),
            this.createNeighbor(east),
            this.createNeighbor(southEast),
            this.createNeighbor(south),
            this.createNeighbor(southWest),
            this.createNeighbor(west),
            this.createNeighbor(northWest),
          ]);
        } else {
          const north = this.getCell(x, y - 1);
          const east = this.getCell(x + 1, y);
          const south = this.getCell(x, y + 1);
          const west = this.getCell(x - 1, y);

          cell.setNeighbors([
            this.createNeighbor(north),
            this.createNeighbor(east),
            this.createNeighbor(south),
            this.createNeighbor(west),
          ]);
        }
      }
    }
  }
}
