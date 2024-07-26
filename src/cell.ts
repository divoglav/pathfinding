import config from "./config";

export class Cell {
  static readonly EMPTY = 1 << 0;
  static readonly BLOCK = 1 << 1;
  static readonly OPEN = 1 << 2;
  static readonly CLOSED = 1 << 3;
  static readonly PATH = 1 << 4;
  static readonly TO_DISPLAY = 1 << 5;

  private _state = Cell.EMPTY;

  private _g: number = 0; // move
  private _h: number = 0; // distance
  private _f: number = 0; // total

  private _neighbors: Neighbor[] = [];

  private _parent: Cell | null = null;

  constructor(
    readonly x: number,
    readonly y: number,
  ) {}

  reset() {
    this._state = Cell.EMPTY;
    this._g = this._h = this._f = 0;
    this._parent = null;
  }

  // ----------------------------: State

  hasState(cellState: number): boolean {
    return (this._state & cellState) !== 0;
  }

  addState(cellState: number) {
    this._state |= cellState;
  }

  removeState(cellState: number) {
    this._state &= ~cellState;
  }

  // ----------------------------: AD

  getG() {
    return this._g;
  }

  setG(value: number) {
    this._g = value;
    this.updateF();
  }

  getH() {
    return this._h;
  }

  calculateHTo(target: Cell) {
    const xd = this.x - target.x;
    const yd = this.y - target.y;
    this._h = Math.sqrt(xd * xd + yd * yd);
  }

  getF() {
    return this._f;
  }

  private updateF() {
    this._f = this._g * config.pathfinding.gScale + this._h;
  }

  // ----------------------------: Parent

  getParent() {
    return this._parent;
  }

  setParent(cell: Cell) {
    this._parent = cell;
  }

  // ----------------------------: Neighbors

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
  East,
  South,
  West,
}
