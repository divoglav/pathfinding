export class Cell {
  private x: number;
  private y: number;

  private neighbors: Cell[] = [];

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  setNeighbors(neighbors: Cell[]) {
    this.neighbors = neighbors;
  }

  getNeighbor(neighbor: Neighbors) {
    return this.neighbors[neighbor];
  }
}

export enum Neighbors {
  North,
  NorthEast,
  East,
  SouthEast,
  South,
  SouthWest,
  West,
  NorthWest,
}
