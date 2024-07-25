import config from "./config";
import { Cell } from "./structures/cell";

export function main(context: CanvasRenderingContext2D, cells: Cell[][]) {
  displayCells(context, cells);
}

function displayCells(context: CanvasRenderingContext2D, cells: Cell[][]) {
  const displayWidth = config.canvas.width / config.grid.rows;
  const displayHeight = config.canvas.height / config.grid.columns;
  const border = config.display.border;

  const cellColor = config.display.colors.cell;
  const blockColor = config.display.colors.block;

  for (let x = 0; x < cells.length; x++) {
    for (let y = 0; y < cells[x].length; y++) {
      const cell = cells[x][y];

      if (cell.isBlock()) {
        context.fillStyle = blockColor;
      } else {
        context.fillStyle = cellColor;
      }

      context.fillRect(x * displayWidth, y * displayHeight, displayWidth - border, displayHeight - border);
    }
  }
}
