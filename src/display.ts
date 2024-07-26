import config from "./config";
import { Cell } from "./cell";

export class Display {
  // Cache for faster usage
  private readonly _width = config.canvas.width / config.grid.rows;
  private readonly _height = config.canvas.height / config.grid.columns;
  private readonly _adjustedWidth = this._width - config.display.border;
  private readonly _adjustedHeight = this._height - config.display.border;
  private readonly _halfWidth = this._width / 2;
  private readonly _halfHeight = this._height / 2;
  private readonly _quarterHeight = this._height / 4;
  private readonly _colors = config.display.colors;

  constructor(private readonly _context: CanvasRenderingContext2D) {
    _context.textRendering = "optimizeSpeed";
    _context.textBaseline = "middle";
    _context.textAlign = "center";
    _context.font = `${this._width / 4}px Ubuntu`;
  }

  private clear() {
    this._context.fillStyle = this._colors.background;
    this._context.fillRect(0, 0, config.canvas.width, config.canvas.height);
  }

  private displayCell(x: number, y: number) {
    this._context.fillRect(x * this._width, y * this._height, this._adjustedWidth, this._adjustedHeight);
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

  displayCellInfo(cells: Cell[][]) {
    const rows = config.grid.rows;
    const cols = config.grid.columns;

    this._context.fillStyle = this._colors.info;

    for (let x = 0; x < rows; x++) {
      for (let y = 0; y < cols; y++) {
        const cell = cells[x][y];
        if (cell.hasState(Cell.BLOCK)) continue;

        this._context.fillText(
          cell.getG().toString(),
          cell.x * this._width + this._halfWidth,
          cell.y * this._height + this._halfHeight - this._quarterHeight,
        );

        this._context.fillText(
          cell.getH().toFixed(2).toString(),
          cell.x * this._width + this._halfWidth,
          cell.y * this._height + this._halfHeight,
        );

        this._context.fillText(
          cell.getF().toFixed(2).toString(),
          cell.x * this._width + this._halfWidth,
          cell.y * this._height + this._halfHeight + this._quarterHeight,
        );
      }
    }
  }
}
