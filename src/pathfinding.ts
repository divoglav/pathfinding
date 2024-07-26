import { Cell } from "./cell";
import * as utils from "./utils/general";

const open: Cell[] = [];
const closed = new Set<Cell>();

function getLowestScore(array: Cell[]) {
  let minScoreCell = array[0];
  // TODO i = 1
  for (let i = 0; i < array.length; i++) {
    if (array[i]._f < minScoreCell._f) minScoreCell = array[i];
  }
  return minScoreCell;
}

function reconstructPath(cell: Cell) {
  const path: Cell[] = [];
  let current: Cell | null = cell;
  while (current) {
    path.push(current);
    current = current._parent;
  }
  return path;
}

function success(current: Cell) {
  const path = reconstructPath(current);
  for (let i = 0; i < path.length; i++) {
    path[i].addState(Cell.PATH);
  }
}

export function aStar(start: Cell, target: Cell) {
  open.push(start);
  start.addState(Cell.OPEN);

  const SADCOUNT = 53;
  for (let i = 0; i < SADCOUNT; i++) {
    if (open.length > 0) {
      iterate(target);
    }
  }
}

function iterate(target: Cell) {
  let current = getLowestScore(open);

  if (current === target) {
    success(current);
    return;
  }

  utils.removeFromArray(open, current);
  current.removeState(Cell.OPEN);
  closed.add(current);
  current.addState(Cell.CLOSED);

  const neighbors = current.getNeighbors();
  for (let n = 0; n < neighbors.length; n++) {
    const neighbor = neighbors[n];
    if (!neighbor || neighbor.hasState(Cell.CLOSED) || neighbor.hasState(Cell.BLOCK)) continue;

    const moveCostToThisNeighbor = 1;
    const gSum = current.getG() + moveCostToThisNeighbor;

    if (neighbor.hasState(Cell.OPEN)) {
      if (gSum < neighbor.getG()) {
        neighbor.setParent(current);
        neighbor.setG(gSum);
      }
    } else {
      open.push(neighbor);
      neighbor.addState(Cell.OPEN);

      neighbor.setParent(current);
      neighbor.setG(gSum);
    }
  }
}
