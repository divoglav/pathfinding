export class Cell {
  static readonly EMPTY = 1 << 0; // 00001
  static readonly BLOCK = 1 << 1; // 00010
  static readonly OPEN = 1 << 2; // 00100
  static readonly CLOSED = 1 << 3; // 01000
  static readonly PATH = 1 << 4; // 10000

  private _state = Cell.EMPTY;

  private _neighbors: Neighbor[] = [];

  g: number = 0; // move score
  h: number = 0; // distance score
  f: number = 0; // total score

  parent: Cell | null = null;

  constructor(
    readonly x: number,
    readonly y: number,
  ) {}

  reset() {
    this._state = Cell.EMPTY;
    this.g = this.h = this.f = 0;
    this.parent = null;
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

  setNeighbors(neighbors: Neighbor[]) {
    this._neighbors = neighbors;
  }

  getNeighbor(neighbor: Neighbors) {
    return this._neighbors[neighbor];
  }

  getNeighbors() {
    return this._neighbors;
  }

  calculateDistanceTo(target: Cell) {
    const xd = this.x - target.x;
    const yd = this.y - target.y;
    this.h = Math.sqrt(xd * xd + yd * yd);
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
