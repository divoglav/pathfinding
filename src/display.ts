// TODO: Optimize

import config from "./config";
import { Cell } from "./structures/cell";

export class Display {
  private _context: CanvasRenderingContext2D;

  constructor(context: CanvasRenderingContext2D) {
    this._context = context;
  }

  displayCells(cells: Cell[][]) {
    const displayWidth = config.canvas.width / config.grid.rows;
    const displayHeight = config.canvas.height / config.grid.columns;
    const border = config.display.border;

    for (let x = 0; x < cells.length; x++) {
      for (let y = 0; y < cells[x].length; y++) {
        const cell = cells[x][y];

        if (cell.isBlock()) {
          this._context.fillStyle = config.display.colors.block;
        } else {
          this._context.fillStyle = config.display.colors.cell;
        }

        this._context.fillRect(x * displayWidth, y * displayHeight, displayWidth - border, displayHeight - border);
      }
    }
  }
}
