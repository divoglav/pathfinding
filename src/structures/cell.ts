export class Cell {
  private x: number;
  private y: number;
  private neighbors: Neighbor[] = [];

  constructor(_x: number, _y: number) {
    this.x = _x;
    this.y = _y;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  setNeighbors(neighbors: Neighbor[]) {
    this.neighbors = neighbors;
  }

  getNeighbor(neighbor: Neighbors) {
    return this.neighbors[neighbor];
  }
}

export type Neighbor = Cell | null;
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
