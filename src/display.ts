import config from "./config";
import { Cell } from "./cell";

export class Display {
  private readonly _cellWidth = config.canvas.width / config.grid.rows;
  private readonly _cellHeight = config.canvas.height / config.grid.columns;
  private readonly _cellAdjustedWidth = this._cellWidth - config.display.border;
  private readonly _cellAdjustedHeight = this._cellHeight - config.display.border;
  private readonly _colors = config.display.colors;

  constructor(private readonly _context: CanvasRenderingContext2D) {
    _context.textRendering = "optimizeSpeed";
    _context.textBaseline = "middle";
    _context.textAlign = "center";
    _context.font = "15px Ubuntu";
  }

  private clear() {
    this._context.fillStyle = this._colors.background;
    this._context.fillRect(0, 0, config.canvas.width, config.canvas.height);
  }

  private displayCell(x: number, y: number) {
    this._context.fillRect(
      x * this._cellWidth,
      y * this._cellHeight,
      this._cellAdjustedWidth,
      this._cellAdjustedHeight,
    );
  }

  displayAllCells(cells: Cell[][]) {
    const rows = config.grid.rows;
    const cols = config.grid.columns;

    this.clear();

    // Separating different color groups for performance

    const drawCellsBatch = (cellState: number, color: string) => {
      this._context.fillStyle = color;
      for (let x = 0; x < rows; x++) {
        for (let y = 0; y < cols; y++) {
          if (cells[x][y].hasState(cellState)) this.displayCell(x, y);
        }
      }
    };

    drawCellsBatch(Cell.EMPTY, this._colors.cells.empty);
    drawCellsBatch(Cell.BLOCK, this._colors.cells.block);
    drawCellsBatch(Cell.OPEN, this._colors.cells.open);
    drawCellsBatch(Cell.CLOSED, this._colors.cells.closed);
    drawCellsBatch(Cell.PATH, this._colors.cells.path);
  }

  displayCellValues(cells: Cell[][]) {
    const rows = config.grid.rows;
    const cols = config.grid.columns;

    const halfWidth = this._cellWidth / 2;
    const halfHeight = this._cellHeight / 2;
    const quarterHeight = this._cellHeight / 4;

    this._context.fillStyle = this._colors.info;

    for (let x = 0; x < rows; x++) {
      for (let y = 0; y < cols; y++) {
        const cell = cells[x][y];
        if (cell.hasState(Cell.BLOCK)) continue;

        this._context.fillText(
          cell.g.toFixed(2).toString(),
          cell.x * this._cellWidth + halfWidth,
          cell.y * this._cellHeight + halfHeight - quarterHeight,
        );

        this._context.fillText(
          cell.h.toFixed(2).toString(),
          cell.x * this._cellWidth + halfWidth,
          cell.y * this._cellHeight + halfHeight,
        );

        this._context.fillText(
          cell.f.toFixed(2).toString(),
          cell.x * this._cellWidth + halfWidth,
          cell.y * this._cellHeight + halfHeight + quarterHeight,
        );
      }
    }
  }
}
