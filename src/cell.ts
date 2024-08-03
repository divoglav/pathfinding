import config from "./config";

const gScalar = config.pathfinding.gScalar;
const animation = config.display.animation.active ? 0 : 1;

export type CellOrNull = Cell | null;

export class Cell {
  private _isEmpty: boolean = false;
  private _isBlock: boolean = false;
  private _isOpen: boolean = false;
  private _isClosed: boolean = false;
  private _isPath: boolean = false;

  private _g: number = 0; // movement
  private _h: number = 0; // distance
  private _f: number = 0; // total

  private _neighbors: CellOrNull[] = [];

  private _parent: CellOrNull = null;

  private _display: boolean = false;
  private _animation: number = 0;

  constructor(
    readonly x: number,
    readonly y: number,
  ) { }

  private resetState() {
    this._isEmpty = false;
    this._isBlock = false;
    this._isOpen = false;
    this._isClosed = false;
    this._isPath = false;
  }

  get isEmpty() { return this._isEmpty; }
  setEmpty() { this.resetState(); this._isEmpty = true; this.setDisplay(); }

  get isBlock() { return this._isBlock; }
  setBlock() { this.resetState(); this._isBlock = true; this.setDisplay(); }

  get isOpen() { return this._isOpen; }
  setOpen() { this.resetState(); this._isOpen = true; this.setDisplay(); }

  get isClosed() { return this._isClosed; }
  setClosed() { this.resetState(); this._isClosed = true; this.setDisplay(); }

  get isPath() { return this._isPath; }
  setPath() { this.resetState(); this._isPath = true; this.setDisplay(); }

  resetAnimation() { this._animation = animation; }
  incrementAnimation(value: number) {
    this._animation += value;
    if(this._animation >= 1) {
      this.unsetDisplay();
      this._animation = 1;
    }
    return this._animation;
  }

  get display() { return this._display; }
  private setDisplay() { this._display = true; this.resetAnimation(); }
  unsetDisplay() { this._display = false; }

  private updateF() { this._f = this._g * gScalar + this._h; }

  get g() { return this._g; }
  setG(value: number) { this._g = value; this.updateF(); }

  setH(value: number) { this._h = value; }

  get f() { return this._f; }

  get parent() { return this._parent; }
  setParent(cell: Cell) { this._parent = cell; }

  get neighbors() { return this._neighbors; }
  setNeighbors(neighbors: CellOrNull[]) { this._neighbors = neighbors; }
}
