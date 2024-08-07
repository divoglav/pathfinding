import { ICell, Neighbor } from "./interfaces/cell.interface";
import config from "./config";

const gWeight = config.pathfinding.weights.g;
const tWeight = config.pathfinding.weights.t;
const hWeight = config.pathfinding.weights.h;
const animation = config.display.animation.active ? 0 : 1;

export class Cell implements ICell {
  private _isEmpty: boolean = false;
  private _isBlock: boolean = false;
  private _isTerrain: boolean = false;
  private _isOpen: boolean = false;
  private _isClosed: boolean = false;
  private _isPath: boolean = false;

  private _g: number = 0; // movement
  private _t: number = 0; // terrain
  private _h: number = 0; // distance
  private _f: number = 0; // total

  private _neighbors: Neighbor[] = [];

  private _parent: Cell | null = null;

  private _displayMark: boolean = false;
  private _animationStep: number = 0;

  constructor(
    readonly x: number,
    readonly y: number,
  ) {}

  // State:

  private _resetState() {
    this._isEmpty = false;
    this._isBlock = false;
    this._isTerrain = false;
    this._isOpen = false;
    this._isClosed = false;
    this._isPath = false;
  }

  isEmpty() {
    return this._isEmpty;
  }
  setEmpty() {
    this._resetState();
    this._isEmpty = true;
    this._markDisplay();
    this.skipAnimation();
  }

  isBlock() {
    return this._isBlock;
  }
  setBlock() {
    this._resetState();
    this._isBlock = true;
    this._markDisplay();
  }

  isTerrain() {
    return this._isTerrain;
  }
  setTerrain() {
    this._resetState();
    this._isTerrain = true;
    this._markDisplay();
  }

  isOpen() {
    return this._isOpen;
  }
  setOpen() {
    this._resetState();
    this._isOpen = true;
    this._markDisplay();
  }

  isClosed() {
    return this._isClosed;
  }
  setClosed() {
    this._resetState();
    this._isClosed = true;
    this._markDisplay();
  }

  isPath() {
    return this._isPath;
  }
  setPath() {
    this._resetState();
    this._isPath = true;
    this._markDisplay();
  }

  // Heuristics:

  private _updateF() { this._f = this._g * gWeight + this._t * tWeight + this._h * hWeight; }

  getG() { return this._g; }
  setG(value: number) { this._g = value; this._updateF(); }
  getT() { return this._t; }
  setT(value: number) { this._t = value; this._updateF(); }
  getH(): number { return this._h; }
  setH(value: number) { this._h = value; this._updateF(); }
  getF() { return this._f; }

  // Connections:

  getParent() { return this._parent; }
  setParent(cell: Cell) { this._parent = cell as Cell; }

  getNeighbors() { return this._neighbors; }
  setNeighbors(neighbors: Neighbor[]) { this._neighbors = neighbors; }

  // Display:

  shouldDisplay() { return this._displayMark; }
  private _markDisplay() { this._displayMark = true; this._resetAnimation(); }
  unmarkDisplay() { this._displayMark = false; }

  private _resetAnimation() { this._animationStep = animation; }
  incrementAnimation(value: number) {
    this._animationStep += value;
    if (this._animationStep >= 1) {
      this.unmarkDisplay();
      this._animationStep = 1;
    }
    return this._animationStep;
  }
  skipAnimation() { this._animationStep = 1; }

  // Misc:

  equals(otherCell: ICell): boolean {
    if (this.x === otherCell.x && this.y === otherCell.y) return true;
    return false;
  }
}
