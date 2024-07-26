import config from "./config";
import { Cell } from "./cell";

export class Display {
  private _context: CanvasRenderingContext2D;

  private _cellDisplayWidth = config.canvas.width / config.grid.rows;
  private _cellDisplayHeight = config.canvas.height / config.grid.columns;
  private _cellAdjustedWidth = this._cellDisplayHeight - config.display.border;
  private _cellAdjustedHeight = this._cellDisplayHeight - config.display.border;

  constructor(context: CanvasRenderingContext2D) {
    this._context = context;
  }

  displayCell(x: number, y: number) {
    this._context.fillRect(
      x * this._cellDisplayWidth,
      y * this._cellDisplayHeight,
      this._cellAdjustedWidth,
      this._cellAdjustedHeight,
    );
  }

  displayAllCells(cells: Cell[][]) {
    const rows = config.grid.rows;
    const cols = config.grid.columns;

    // Separating different color batches for performance

    this._context.fillStyle = config.display.colors.empty;
    for (let x = 0; x < rows; x++) {
      for (let y = 0; y < cols; y++) {
        if (cells[x][y].hasState(Cell.EMPTY)) {
          this.displayCell(x, y);
        }
      }
    }

    this._context.fillStyle = config.display.colors.block;
    for (let x = 0; x < rows; x++) {
      for (let y = 0; y < cols; y++) {
        if (cells[x][y].hasState(Cell.BLOCK)) {
          this.displayCell(x, y);
        }
      }
    }

    this._context.fillStyle = config.display.colors.open;
    for (let x = 0; x < rows; x++) {
      for (let y = 0; y < cols; y++) {
        if (cells[x][y].hasState(Cell.OPEN)) {
          this.displayCell(x, y);
        }
      }
    }

    this._context.fillStyle = config.display.colors.closed;
    for (let x = 0; x < rows; x++) {
      for (let y = 0; y < cols; y++) {
        if (cells[x][y].hasState(Cell.CLOSED)) {
          this.displayCell(x, y);
        }
      }
    }

    this._context.fillStyle = config.display.colors.path;
    for (let x = 0; x < rows; x++) {
      for (let y = 0; y < cols; y++) {
        if (cells[x][y].hasState(Cell.PATH)) {
          this.displayCell(x, y);
        }
      }
    }
  }
}
