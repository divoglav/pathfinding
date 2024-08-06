import { ICell } from "../interfaces/cell.interface";
import { Utilities } from "../libs/utils/utilities";

export class AStar {
  private readonly open: ICell[] = [];
  private readonly closed = new Set<ICell>();

  constructor(
    start: ICell,
    private readonly target: ICell,
  ) {
    this.open.push(start);
    start.setOpen();
  }

  private getBestFromOpen() {
    let minFCell = this.open[0];
    for (let i = 1; i < this.open.length; i++) {
      const cell = this.open[i];
      if (cell.getF() < minFCell.getF()) minFCell = cell;
    }
    return minFCell;
  }

  private reconstructPath(cell: ICell) {
    let current: ICell | null = cell;
    while (current) {
      current.setPath();
      current = current.getParent();
    }
  }

  iterate(): boolean {
    if (this.open.length <= 0) return true;

    let current = this.getBestFromOpen();

    if (current === this.target) {
      this.open.length = 0;
      this.reconstructPath(current);
      return true;
    }

    Utilities.removeFromArray(this.open, current);

    this.closed.add(current);
    current.setClosed();

    const neighbors = current.getNeighbors();
    for (let n = 0; n < neighbors.length; n++) {
      const exists = neighbors[n];
      if (!exists) continue;
      const neighbor = exists.cell;
      if (neighbor.isClosed() || neighbor.isBlock()) continue;
      const neighborMoveCost = exists.moveCost;

      const gSum = current.getG() + neighborMoveCost;

      if (neighbor.isOpen()) {
        if (gSum < neighbor.getG()) {
          neighbor.setParent(current);
          neighbor.setG(gSum);
        }
      } else {
        this.open.push(neighbor);
        neighbor.setOpen();
        neighbor.setParent(current);
        neighbor.setG(gSum);
      }
    }

    return false;
  }
}
