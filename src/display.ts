import config from "./config";
import { Cell, CellType } from "./cell";

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

  displayCells(cells: Cell[][]) {
    const rows = config.grid.rows;
    const cols = config.grid.columns;

    this._context.fillStyle = config.display.colors.empty;
    for (let x = 0; x < rows; x++) {
      for (let y = 0; y < cols; y++) {
        if (cells[x][y].getType() === CellType.Empty) {
          this.displayCell(x, y);
        }
      }
    }

    this._context.fillStyle = config.display.colors.block;
    for (let x = 0; x < rows; x++) {
      for (let y = 0; y < cols; y++) {
        if (cells[x][y].getType() === CellType.Block) {
          this.displayCell(x, y);
        }
      }
    }

    this._context.fillStyle = config.display.colors.open;
    for (let x = 0; x < rows; x++) {
      for (let y = 0; y < cols; y++) {
        if (cells[x][y].getType() === CellType.Open) {
          this.displayCell(x, y);
        }
      }
    }

    this._context.fillStyle = config.display.colors.closed;
    for (let x = 0; x < rows; x++) {
      for (let y = 0; y < cols; y++) {
        if (cells[x][y].getType() === CellType.Closed) {
          this.displayCell(x, y);
        }
      }
    }

    this._context.fillStyle = config.display.colors.path;
    for (let x = 0; x < rows; x++) {
      for (let y = 0; y < cols; y++) {
        if (cells[x][y].getType() === CellType.Path) {
          this.displayCell(x, y);
        }
      }
    }
  }
}
