import config from "./config";

const gScalar = config.pathfinding.gScalar;

export class Cell {
  static readonly EMPTY = 1 << 0;
  static readonly BLOCK = 1 << 1;
  static readonly OPEN = 1 << 2;
  static readonly CLOSED = 1 << 3;
  static readonly PATH = 1 << 4;
  static readonly TO_DISPLAY = 1 << 5;

  private state = Cell.EMPTY;

  private g: number = 0; // movement
  private h: number = 0; // distance
  private f: number = 0; // total

  private neighbors: Neighbor[] = [];

  private parent: Cell | null = null;

  constructor(
    readonly x: number,
    readonly y: number,
  ) {}

  reset() {
    this.state = Cell.EMPTY;
    this.g = this.h = this.f = 0;
    this.parent = null;
  }

  hasState(cellState: number): boolean {
    return (this.state & cellState) !== 0;
  }

  addState(cellState: number) {
    this.state |= cellState;
  }

  removeState(cellState: number) {
    this.state &= ~cellState;
  }

  getG() {
    return this.g;
  }

  setG(value: number) {
    this.g = value;
    this.updateF();
  }

  calculateHTo(target: Cell) {
    const xDifference = this.x - target.x;
    const yDifference = this.y - target.y;
    this.h = Math.sqrt(xDifference * xDifference + yDifference * yDifference);
  }

  getF() {
    return this.f;
  }

  private updateF() {
    this.f = this.g * gScalar + this.h;
  }

  getParent() {
    return this.parent;
  }

  setParent(cell: Cell) {
    this.parent = cell;
  }

  setNeighbors(neighbors: Neighbor[]) {
    this.neighbors = neighbors;
  }

  getNeighbors() {
    return this.neighbors;
  }
}

type Neighbor = Cell | null;
