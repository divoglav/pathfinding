export class Cell {
  static readonly EMPTY = 1 << 0; // 00001
  static readonly BLOCK = 1 << 1; // 00010
  static readonly OPEN = 1 << 2; // 00100
  static readonly CLOSED = 1 << 3; // 01000
  static readonly PATH = 1 << 4; // 10000

  private _x: number;
  private _y: number;

  private _state = Cell.EMPTY;

  private _neighbors: Neighbor[] = [];

  g: number = 0; // move score
  h: number = 0; // distance score
  f: number = 0; // total score

  parent: Cell | null = null;

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  hasState(cellState: number): boolean {
    return (this._state & cellState) !== 0;
  }

  addState(cellState: number) {
    this._state |= cellState;
  }

  removeState(cellState: number) {
    this._state &= ~cellState;
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

  getNeighbors() {
    return this._neighbors;
  }
}

export type Neighbor = Cell | null;
export enum Neighbors {
  North,
  //NorthEast,
  East,
  //SouthEast,
  South,
  //SouthWest,
  West,
  //NorthWest,
}
