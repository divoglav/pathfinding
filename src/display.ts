import { SquareCell } from "./cells/squareCell";
import config from "./config";
import * as math from "./utils/math";
// cache
const rows = config.map.rows;
const cols = config.map.columns;
const maxWidth = config.canvas.width / rows;
const maxHeight = config.canvas.height / cols;
const halfWidth = maxWidth / 2;
const halfHeight = maxHeight / 2;
const cellColors = config.display.colors.cells;
const animationIncrement = config.display.animation.increment;

export class Display {
  private _lastFillColor: string = "";

  constructor(private readonly _context: CanvasRenderingContext2D) {
    _context.textRendering = "optimizeSpeed";
    _context.textBaseline = "middle";
    _context.textAlign = "center";
    _context.font = `${maxWidth / 4}px Ubuntu`;
    _context.strokeStyle = config.display.colors.border;
    _context.lineWidth = config.display.lineWidth > 0 ? config.display.lineWidth : 0.1;
  }

  clear() {
    this._context.fillStyle = config.display.colors.background;
    this._context.fillRect(0, 0, config.canvas.width, config.canvas.height);
  }

  drawCells(cells: SquareCell[][]) {
    let counter = 0;
    for (let x = 0; x < rows; x++) {
      for (let y = 0; y < cols; y++) {
        const cell: SquareCell = cells[x][y];
        if (cell.shouldDisplay()) {
          counter++;
          const color = this.getCellColor(cell);
          this.drawCell(cell, color);
        }
      }
    }

    console.log(counter);
  }

  private getCellColor(cell: SquareCell): string {
    if (cell.isEmpty()) {
      return cellColors.empty;
    } else if (cell.isBlock()) {
      return cellColors.block;
    } else if (cell.isOpen()) {
      return cellColors.open;
    } else if (cell.isClosed()) {
      return cellColors.closed;
    } else if (cell.isPath()) {
      return cellColors.path;
    }
    return cellColors.debug;
  }

  private easeFunction(value: number) {
    return value * value * value;
  }

  private drawCell(cell: SquareCell, color: string) {
    const xCenter = cell.x * maxWidth + halfWidth;
    const yCenter = cell.y * maxHeight + halfHeight;

    const step = this.easeFunction(cell.incrementAnimation(animationIncrement));

    const width = math.lerp(0, maxWidth, step);
    const height = math.lerp(0, maxHeight, step);

    const x = xCenter - width / 2;
    const y = yCenter - height / 2;

    if (this._lastFillColor !== color) {
      this._context.fillStyle = color;
      this._lastFillColor = color;
    }

    this._context.fillRect(x, y, width, height);
    this._context.strokeRect(x, y, width, height);
  }
}
