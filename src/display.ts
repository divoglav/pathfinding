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

  displayCells(cells: Cell[][]) {
    const rows = config.grid.rows;
    const cols = config.grid.columns;

    // cell batch
    this._context.fillStyle = config.display.colors.cell;
    for (let x = 0; x < rows; x++) {
      for (let y = 0; y < cols; y++) {
        if (cells[x][y].isBlock) continue;
        this.displayCell(x, y);
      }
    }

    // block batch
    this._context.fillStyle = config.display.colors.block;
    for (let x = 0; x < rows; x++) {
      for (let y = 0; y < cols; y++) {
        if (!cells[x][y].isBlock) continue;
        this.displayCell(x, y);
      }
    }
  }
}
