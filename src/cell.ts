export class Cell {
  private _x: number;
  private _y: number;
  private _neighbors: Neighbor[] = [];

  private _isBlock: boolean = false;

  // TODO: use the boolean flags for quick
  // lookup while still using the lists.

  private _inOpenList: boolean = false;
  private _inClosedList: boolean = false;

  private _moveCost: number = 0; // G
  private _distanceCost: number = 0; // H
  private _score: number = 0; // F

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

  setBlock(isBlock: boolean) {
    this._isBlock = isBlock;
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
