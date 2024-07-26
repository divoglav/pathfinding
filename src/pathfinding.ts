import { Cell } from "./cell";
import config from "./config";

export function aStar(start: Cell, target: Cell, all: Cell[][]) {
  setDistanceScores(all, target);

  const open: Cell[] = [];
  const closed = new Set<Cell>();

  addToOpen(open, start);

  while (open.length > 0) {
    let current = getLowestScore(open);

    if (current === target) {
      const path = reconstructPath(current);
      for (let i = 0; i < path.length; i++) {
        path[i].addState(Cell.PATH);
      }
      return;
    }

    removeFromList(open, current);
    current.removeState(Cell.OPEN);
    closed.add(current);
    current.addState(Cell.CLOSED);

    const neighbors = current.getNeighbors();
    for (let n = 0; n < neighbors.length; n++) {
      const neighbor = neighbors[n];
      if (!neighbor || neighbor.hasState(Cell.CLOSED) || neighbor.hasState(Cell.BLOCK)) continue;

      const gTentative = current.g + 1;

      if (!neighbor.hasState(Cell.OPEN)) addToOpen(open, neighbor);
      else if (gTentative >= neighbor.g) continue;

      neighbor.parent = current;
      neighbor.g = gTentative;
      neighbor.f = neighbor.g + neighbor.h;
    }
  }
}

function setDistanceScores(cells: Cell[][], target: Cell) {
  const rows = config.grid.rows;
  const cols = config.grid.columns;

  const xTarget = target.getX();
  const yTarget = target.getY();

  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      const cell = cells[x][y];
      if (cell.hasState(Cell.BLOCK)) continue;

      const xDifference = cell.getX() - xTarget;
      const yDifference = cell.getY() - yTarget;

      cell.h = Math.sqrt(xDifference * xDifference + yDifference * yDifference);
    }
  }
}

function addToOpen(open: Cell[], cell: Cell) {
  open.push(cell);
  cell.addState(Cell.OPEN);
}

function removeFromList(open: Cell[], cell: Cell) {
  const indexToRemove = open.indexOf(cell);
  if (indexToRemove !== -1) open.splice(indexToRemove, 1);
}

function getLowestScore(list: Cell[]) {
  let minScoreCell = list[0];

  for (let i = 1; i < list.length; i++) {
    if (list[i].f < minScoreCell.f) minScoreCell = list[i];
  }

  return minScoreCell;
}

function reconstructPath(cell: Cell) {
  const path: Cell[] = [];

  let current: Cell | null = cell;
  while (current) {
    path.push(current);
    current = current.parent;
  }

  return path;
}
