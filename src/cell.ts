import { ICell, Neighbor } from "./interfaces/cell.interface";
import config from "./config";

const gScalar = config.pathfinding.gScalar;
const animation = config.display.animation.active ? 0 : 1;

export class Cell implements ICell  {
  private _isEmpty: boolean = false;
  private _isBlock: boolean = false;
  private _isOpen: boolean = false;
  private _isClosed: boolean = false;
  private _isPath: boolean = false;

  private _g: number = 0; // movement
  private _h: number = 0; // distance
  private _f: number = 0; // total

  private _neighbors: Neighbor[] = [];

  private _parent: Cell | null = null;

  private _displayMark: boolean = false;
  private _animationStep: number = 0;

  constructor(readonly x: number, readonly y: number) {}

  // State:

  private resetState() {
    this._isEmpty = false;
    this._isBlock = false;
    this._isOpen = false;
    this._isClosed = false;
    this._isPath = false;
  }

  isEmpty() { return this._isEmpty; }
  setEmpty() {
    this.resetState();
    this._isEmpty = true;
    this.markDisplay();
    this.skipAnimation();
  }

  isBlock() { return this._isBlock; }
  setBlock() {
    this.resetState();
    this._isBlock = true;
    this.markDisplay();
  }

  isOpen() { return this._isOpen; }
  setOpen() {
    this.resetState();
    this._isOpen = true;
    this.markDisplay();
  }

  isClosed() { return this._isClosed; }
  setClosed() {
    this.resetState();
    this._isClosed = true;
    this.markDisplay();
  }

  isPath() { return this._isPath; }
  setPath() {
    this.resetState();
    this._isPath = true;
    this.markDisplay();
  }

  // Costs:

  private updateF() { this._f = this._g * gScalar + this._h; }

  getG() { return this._g; }
  setG(value: number) { this._g = value; this.updateF(); }
  setH(value: number) { this._h = value; }
  getF() { return this._f; }

  // Connections:

  getParent() { return this._parent; }
  setParent(cell: Cell) { this._parent = cell as Cell; }

  getNeighbors() { return this._neighbors; }
  setNeighbors(neighbors: Neighbor[]) { this._neighbors = neighbors; }

  // Display:

  shouldDisplay() { return this._displayMark; }
  private markDisplay() { this._displayMark = true; this.resetAnimation(); }
  unmarkDisplay() { this._displayMark = false; }

  private resetAnimation() { this._animationStep = animation; }
  incrementAnimation(value: number) {
    this._animationStep += value;
    if (this._animationStep >= 1) {
      this.unmarkDisplay();
      this._animationStep = 1;
    }
    return this._animationStep;
  }
  skipAnimation() { this._animationStep = 1; }
}
