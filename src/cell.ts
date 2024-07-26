export class Cell {
  private _x: number;
  private _y: number;
  private _neighbors: Neighbor[] = [];

  private _type: CellType = CellType.Empty;

  g: number = 0; // move score
  h: number = 0; // distance score
  f: number = 0; // total score

  parent: Cell | null = null;

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  setType(type: CellType) {
    this._type = type;
  }

  getType() {
    return this._type;
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

export enum CellType {
  Empty,
  Block,
  Open,
  Closed,
  Path,
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
