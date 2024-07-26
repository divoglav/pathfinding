export class Cell {
  private _x: number;
  private _y: number;
  private _neighbors: Neighbor[] = [];

  isBlock: boolean = false;

  inOpenList: boolean = false;
  inClosedList: boolean = false;

  g: number = 0; // move score
  h: number = 0; // distance score
  f: number = 0; // total score

  parent: Cell | null = null;

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
