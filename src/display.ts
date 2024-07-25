import config from "./config";
import { Cell } from "./structures/cell";
import { Grid } from "./structures/grid";

export function main(context: CanvasRenderingContext2D, grid: Grid) {
  const cells = grid.getCells();

  displayCells(context, cells);
}

function displayCells(context: CanvasRenderingContext2D, cells: Cell[][]) {
  const displayWidth = config.canvas.width / config.grid.rows;
  const displayHeight = config.canvas.height / config.grid.columns;
  const border = config.display.border;

  context.fillStyle = config.display.colors.cell;

  for (let x = 0; x < cells.length; x++) {
    for (let y = 0; y < cells[x].length; y++) {
      context.fillRect(x * displayWidth, y * displayHeight, displayWidth - border, displayHeight - border);
    }
  }
}
