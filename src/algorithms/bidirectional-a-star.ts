import config from "../config";
import { IBidirectionalAStar } from "../interfaces/bidirectionalAStar.interface";
import { ICell } from "../interfaces/cell.interface";
import { IPathfinder } from "../interfaces/pathfinder.interface";
import { Utilities } from "../libs/utils/utilities";
import { Utils } from "../utils";

const euclideanDistance: boolean = config.pathfinding.distanceMethod === "euclidean";

export class BidirectionalAStar implements IPathfinder, IBidirectionalAStar {
  private readonly _open: ICell[] = [];
  private readonly _closed = new Set<ICell>();

  private _ended: boolean = false;

  private _archon: IBidirectionalAStar | null = null;

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
    while (current) {
      current.setPath();
      current = current.getParent();
    }
  }

  setArchon(archon: IBidirectionalAStar) {
    this._archon = archon;
  }

  hasEnded(): boolean {
    return this._ended;
  }

  end() {
    this._ended = true;
  }

  containsCell(cell: ICell): boolean {
    let inClosed: boolean = this._closed.has(cell);

    let inOpen: boolean = false;
    for (let i = 0; i < this._open.length; i++) {
      if (this._open[i].equals(cell)) inOpen = true;
    }

    return inClosed || inOpen;
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
      const neighborMoveCost = exists.moveCost;

      if (neighbor.isBlock()) continue;

      if (this._archon && this._archon.containsCell(neighbor)) {
        this.end();
        this._archon.end();
        this.reconstructPathFrom(current);
        this._archon.reconstructPathFrom(neighbor);
        return;
      }

      if (neighbor.isClosed()) continue;

      const gSum = current.getG() + neighborMoveCost;
      if (neighbor.getH() <= 0) {
        euclideanDistance
          ? neighbor.setH(Utils.euclideanDistance(neighbor, this.target))
          : neighbor.setH(Utils.manhattanDistance(neighbor, this.target));
      }

      if (!neighbor.isOpen()) {
        this._open.push(neighbor);
        neighbor.setOpen();
        neighbor.setParent(current);
        neighbor.setG(gSum);
      } else if (gSum < neighbor.getG()) {
        neighbor.setParent(current);
        neighbor.setG(gSum);
      }
    }

    return;
  }
}
