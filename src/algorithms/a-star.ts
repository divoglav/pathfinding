import config from "../config";
import { ICell } from "../interfaces/cell.interface";
import { Utilities } from "../libs/utils/utilities";
import { Utils } from "../utils";

export class BidirectionalAStar {
  private readonly _open: ICell[] = [];
  private readonly _closed = new Set<ICell>();

  private _ended: boolean = false;
  private _success: boolean = false;

  public otherAStar: BidirectionalAStar | null = null;

  constructor(
    start: ICell,
    private readonly target: ICell,
  ) {
    this._open.push(start);
    start.setOpen();
  }

  private getBestFromOpen() {
    let minFCell = this._open[0];
    for (let i = 1; i < this._open.length; i++) {
      const cell = this._open[i];
      if (cell.getF() < minFCell.getF()) minFCell = cell;
    }
    return minFCell;
  }

  reconstructPathFrom(cell: ICell) {
    let current: ICell | null = cell;
    let count = config.map.columns ** 2;
    while (current && count > 0) {
      count--;
      current.setPath();
      current = current.getParent();
    }
    if (count <= 0) console.error("Infinite Reconstruct");
  }

  hasEnded(): boolean {
    return this._ended;
  }

  setEnd() {
    this._ended = true;
  }

  isSuccess(): boolean {
    return this._success;
  }

  private openContains(cell: ICell): boolean {
    for (let i = 0; i < this._open.length; i++) {
      if (this._open[i].equals(cell)) return true;
    }
    return false;
  }

  private closedContains(cell: ICell): boolean {
    if (this._closed.has(cell)) return true;
    return false;
  }

  contains(cell: ICell): boolean {
    if (this.openContains(cell) || this.closedContains(cell)) return true;
    return false;
  }

  iterate() {
    if (this._ended) return;

    if (this._open.length <= 0) {
      this._ended = true;
      this._success = false;
      return;
    }

    let current = this.getBestFromOpen();

    if (current.equals(this.target)) {
      this._ended = true;
      this._success = true;
      this._open.length = 0;
      this.reconstructPathFrom(current);
      return;
    }

    Utilities.removeFromArray(this._open, current);
    this._closed.add(current);
    current.setClosed();

    const neighbors = current.getNeighbors();
    for (let n = 0; n < neighbors.length; n++) {
      const exists = neighbors[n];
      if (!exists) continue;

      const neighbor = exists.cell;
      const neighborMoveCost = exists.moveCost;

      if (neighbor.isBlock()) continue;

      if (this.otherAStar && this.otherAStar.contains(neighbor)) {
        this._ended = true;
        this._success = true;
        this.otherAStar.setEnd();
        this.otherAStar.reconstructPathFrom(neighbor);
        this.reconstructPathFrom(current);
        return;
      }

      if (neighbor.isClosed()) continue;

      const gSum = current.getG() + neighborMoveCost;
      if (neighbor.getH() <= 0) neighbor.setH(Utils.euclideanDistance(neighbor, this.target));

      if (neighbor.isOpen()) {
        if (gSum < neighbor.getG()) {
          neighbor.setParent(current);
          neighbor.setG(gSum);
        }
      } else {
        this._open.push(neighbor);
        neighbor.setOpen();
        neighbor.setParent(current);
        neighbor.setG(gSum);
      }
    }

    return;
  }
}
