import config from "./config";
import { Cell } from "./cell";

export class Display {
  private readonly _cellDisplayWidth = config.canvas.width / config.grid.rows;
  private readonly _cellDisplayHeight = config.canvas.height / config.grid.columns;
  private readonly _cellAdjustedWidth = this._cellDisplayHeight - config.display.border;
  private readonly _cellAdjustedHeight = this._cellDisplayHeight - config.display.border;

  constructor(private readonly _context: CanvasRenderingContext2D) {}

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

    // Separating different color groups for performance

    const drawCellsBatch = (cellState: number, color: string) => {
      this._context.fillStyle = color;
      for (let x = 0; x < rows; x++) {
        for (let y = 0; y < cols; y++) {
          if (cells[x][y].hasState(cellState)) this.displayCell(x, y);
        }
      }
    };

    drawCellsBatch(Cell.EMPTY, config.display.colors.empty);
    drawCellsBatch(Cell.BLOCK, config.display.colors.block);
    drawCellsBatch(Cell.OPEN, config.display.colors.open);
    drawCellsBatch(Cell.CLOSED, config.display.colors.closed);
    drawCellsBatch(Cell.PATH, config.display.colors.path);
  }
}
