import config from "../config";
import { ICell } from "../interfaces/cell.interface";
import { IDisplay } from "../interfaces/display.interface";
import { Utils } from "../utils";

export abstract class Display implements IDisplay {
  protected _lastFillColor: string = "";

  protected readonly _cols = config.map.columns;
  protected readonly _rows = Utils.calculateRowsCount(
    config.canvas.width,
    config.canvas.height,
    config.map.columns,
    config.map.grid === "hex",
  );
  protected readonly _maxWidth = config.canvas.width / this._cols;
  protected readonly _cellColors = config.display.colors.cells;
  protected readonly _animationIncrement = config.display.animation.increment;

  constructor(protected readonly _context: CanvasRenderingContext2D) {
    _context.textRendering = "optimizeSpeed";
    _context.textBaseline = "middle";
    _context.textAlign = "center";
    _context.font = `${this._maxWidth / 4}px Ubuntu`;
    _context.strokeStyle = config.display.colors.border;
    _context.lineWidth = config.display.lineWidth > 0 ? config.display.lineWidth : 0.1;
  }

  protected _getCellColor(cell: ICell): string {
    if (cell.isEmpty()) {
      return this._cellColors.empty;
    } else if (cell.isBlock()) {
      return this._cellColors.block;
    } else if (cell.isOpen()) {
      return this._cellColors.open;
    } else if (cell.isClosed()) {
      return this._cellColors.closed;
    } else if (cell.isPath()) {
      return this._cellColors.path;
    }
    return this._cellColors.debug;
  }

  protected _easeFunction(value: number) {
    return value * value * value;
  }

  protected abstract _drawCell(cell: ICell, color: string): void;

  drawCells(cells: ICell[][]) {
    for (let x = 0; x < this._cols; x++) {
      for (let y = 0; y < this._rows; y++) {
        const cell: ICell = cells[x][y];
        if (cell.shouldDisplay()) {
          const color = this._getCellColor(cell);
          this._drawCell(cell, color);
        }
      }
    }
  }

  clear() {
    this._context.fillStyle = config.display.colors.background;
    this._context.fillRect(0, 0, config.canvas.width, config.canvas.height);
  }
}
