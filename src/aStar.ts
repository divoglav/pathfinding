import { Cell, CellOrNull } from "./cell";
import * as generalUtils from "./utils/general";

export class AStar {
  private readonly open: Cell[] = [];
  private readonly closed = new Set<Cell>();

  constructor(
    start: Cell,
    private readonly target: Cell,
  ) {
    this.open.push(start);
    start.setOpen();
  }

  private getBestFromOpen() {
    let minFCell = this.open[0];
    for (let i = 1; i < this.open.length; i++) {
      const cell = this.open[i];
      if (cell.f < minFCell.f) minFCell = cell;
    }
    return minFCell;
  }

  private reconstructPath(cell: Cell) {
    let current: CellOrNull = cell;
    while (current) {
      current.setPath();
      current.setDisplay();
      current = current.parent;
    } }

  iterate(): boolean {
    if (this.open.length <= 0) return true;

    let current = this.getBestFromOpen();

    if (current === this.target) {
      this.open.length = 0;
      this.reconstructPath(current);
      return true;
    }

    generalUtils.removeFromArray(this.open, current);
    this.closed.add(current);
    current.setClosed();

    current.setDisplay();

    const neighbors = current.neighbors;
    for (let n = 0; n < neighbors.length; n++) {
      const neighbor = neighbors[n];
      if (!neighbor || neighbor.isClosed || neighbor.isBlock) continue;


      const gSum = current.g + 1;

      if (neighbor.isOpen) {
        if (gSum < neighbor.g) {
          neighbor.setParent(current);
          neighbor.setG(gSum);
        }
      } else {
        this.open.push(neighbor);
        neighbor.setOpen();
        neighbor.setParent(current);
        neighbor.setG(gSum);
      }
      neighbor.setDisplay();
    }

    return false;
  }
}
