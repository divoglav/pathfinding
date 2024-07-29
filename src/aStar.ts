import { Cell } from "./cell";
import * as generalUtils from "./utils/general";

export class AStar {
  private readonly open: Cell[] = [];
  private readonly closed = new Set<Cell>();

  constructor(
    start: Cell,
    private readonly target: Cell,
  ) {
    this.open.push(start);
    start.addState(Cell.OPEN);
  }

  private getBestFromOpen() {
    let minFCell = this.open[0];
    for (let i = 1; i < this.open.length; i++) {
      const cell = this.open[i];
      if (cell.getF() < minFCell.getF()) minFCell = cell;
    }
    return minFCell;
  }

  private reconstructPath(cell: Cell) {
    let current: Cell | null = cell;
    while (current) {
      current.addState(Cell.PATH);
      current.addState(Cell.TO_DISPLAY);
      current = current.getParent();
    }
  }

  iterate(): boolean {
    if (this.open.length <= 0) return true;

    let current = this.getBestFromOpen();

    if (current === this.target) {
      this.reconstructPath(current);
      return true;
    }

    generalUtils.removeFromArray(this.open, current);
    current.removeState(Cell.OPEN);
    this.closed.add(current);
    current.addState(Cell.CLOSED);

    current.addState(Cell.TO_DISPLAY);

    const neighbors = current.getNeighbors();
    for (let n = 0; n < neighbors.length; n++) {
      const neighbor = neighbors[n];
      if (!neighbor || neighbor.hasState(Cell.CLOSED) || neighbor.hasState(Cell.BLOCK)) continue;

      neighbor.addState(Cell.TO_DISPLAY);

      const gSum = current.getG() + 1;

      if (neighbor.hasState(Cell.OPEN)) {
        if (gSum < neighbor.getG()) {
          neighbor.setParent(current);
          neighbor.setG(gSum);
        }
      } else {
        this.open.push(neighbor);
        neighbor.addState(Cell.OPEN);

        neighbor.setParent(current);
        neighbor.setG(gSum);
      }
    }

    return false;
  }
}
