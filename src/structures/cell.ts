export class Cell {
  private _x: number;
  private _y: number;

  private _neighbors: Neighbor[] = [];

  private _isBlock: boolean = false;

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  getX() {
    return this._x;
  }

  getY() {
    return this._y;
  }

  setNeighbors(neighbors: Neighbor[]) {
    this._neighbors = neighbors;
  }

  getNeighbor(neighbor: Neighbors) {
    return this._neighbors[neighbor];
  }

  isBlock() {
    return this._isBlock;
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
