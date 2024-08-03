import { Cell } from "./cell";
import config from "./config";

// cache
const rows = config.map.rows;
const cols = config.map.columns;
const cellWidth = config.canvas.width / rows;
const cellHeight = config.canvas.height / cols;
const cellColors = config.display.colors.cells;

export class Display {
  private _lastFillColor: string = "";

  constructor(private readonly _context: CanvasRenderingContext2D) {
    _context.textRendering = "optimizeSpeed";
    _context.textBaseline = "middle";
    _context.textAlign = "center";
    _context.font = `${cellWidth / 4}px Ubuntu`;
    _context.strokeStyle = config.display.colors.border;
    _context.lineWidth = config.display.lineWidth > 0 ? config.display.lineWidth : 0.1;
  }

  clear() {
    this._context.fillStyle = config.display.colors.background;
    this._context.fillRect(0, 0, config.canvas.width, config.canvas.height);
  }

  drawCells(cells: Cell[][]) {
    for (let x = 0; x < rows; x++) {
      for (let y = 0; y < cols; y++) {
        const cell: Cell = cells[x][y];
        if (cell.display) {
          const color = this.getCellColor(cell);
          this.drawCell(cell, color);
        }
      }
    }
  }

  private getCellColor(cell: Cell): string {
    if (cell.isEmpty) {
      return cellColors.empty;
    } else if (cell.isBlock) {
      return cellColors.block;
    } else if (cell.isOpen) {
      return cellColors.open;
    } else if (cell.isClosed) {
      return cellColors.closed;
    } else if (cell.isPath) {
      return cellColors.path;
    }
    return cellColors.debug;
  }

  private drawCell(cell: Cell, color: string) {
    const x = cell.x * cellWidth;
    const y = cell.y * cellHeight;

    if (this._lastFillColor !== color) {
      this._context.fillStyle = color;
      this._lastFillColor = color;
    }

    this._context.fillRect(x, y, cellWidth, cellHeight);
    this._context.strokeRect(x, y, cellWidth, cellHeight);

    cell.setDisplay(false);
  }
}
