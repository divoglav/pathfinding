import { ICell } from "../interfaces/cell.interface";
import { IPathfinder } from "../interfaces/pathfinder.interface";
import { Utilities } from "../libs/utils/utilities";

export class AStar implements IPathfinder {
  private readonly _open: ICell[] = [];
  private readonly _closed = new Set<ICell>();

  private _ended: boolean = false;

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

  private reconstructPathFrom(cell: ICell) {
    let current: ICell | null = cell;
    while (current) {
      current.setPath();
      current = current.getParent();
    }
  }

  hasEnded(): boolean {
    return this._ended;
  }

  end() {
    this._ended = true;
  }

  iterate() {
    if (this._ended) return;

    if (this._open.length <= 0) {
      this.end();
      return;
    }

    let current = this.getBestFromOpen();

    if (current.equals(this.target)) {
      this.end();
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
      if (neighbor.isBlock() || neighbor.isClosed()) continue;
      const neighborMoveCost = exists.moveCost;

      const gSum = current.getG() + neighborMoveCost;

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
