import { Cell } from "./cell";
import config from "./config";

const rows = config.map.rows;
const cols = config.map.columns;
const cellWidth = config.canvas.width / rows;
const cellHeight = config.canvas.height / cols;
const colors = config.display.colors;

export class Display {
  private readonly markedCells: Cell[] = [];

  constructor(private readonly context: CanvasRenderingContext2D) {
    context.textRendering = "optimizeSpeed";
    context.textBaseline = "middle";
    context.textAlign = "center";
    context.font = `${cellWidth / 4}px Ubuntu`;
    context.strokeStyle = config.display.colors.border;
    context.lineWidth = config.display.lineWidth > 0 ? config.display.lineWidth : 0.1;
  }

  clear() {
    this.context.fillStyle = config.display.colors.background;
    this.context.fillRect(0, 0, config.canvas.width, config.canvas.height);
  }

  drawCells(cells: Cell[][]) {
    this.markedCells.length = 0;
    for (let x = 0; x < rows; x++) {
      for (let y = 0; y < cols; y++) {
        const cell: Cell = cells[x][y];
        if (cell.hasState(Cell.TO_DISPLAY)) this.markedCells.push(cell);
      }
    }

    // Separating different color groups for performance
    this.drawCellBatch(Cell.EMPTY, colors.cells.empty);
    this.drawCellBatch(Cell.BLOCK, colors.cells.block);
    this.drawCellBatch(Cell.OPEN, colors.cells.open);
    this.drawCellBatch(Cell.CLOSED, colors.cells.closed);
    this.drawCellBatch(Cell.PATH, colors.cells.path);
  }

  private drawCellBatch(cellState: number, color: string) {
    this.context.fillStyle = color;
    const count = this.markedCells.length;
    for (let i = 0; i < count; i++) {
      const cell = this.markedCells[i];
      if (cell.hasState(cellState)) this.drawCell(cell);
    }
  }

  private drawCell(cell: Cell) {
    const x = cell.x * cellWidth;
    const y = cell.y * cellHeight;
    this.context.fillRect(x, y, cellWidth, cellHeight);
    this.context.strokeRect(x, y, cellWidth, cellHeight);
    cell.removeState(Cell.TO_DISPLAY);
  }
}
