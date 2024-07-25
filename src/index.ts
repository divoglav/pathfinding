import "./styles/reset.css";
import "./styles/style.css";
import config from "./config";
import { Grid } from "./structures/grid";
import { Display } from "./display";

function createCanvas() {
  const canvas = document.createElement("canvas");
  canvas.width = config.canvas.width;
  canvas.height = config.canvas.height;
  document.body.appendChild(canvas);
  return canvas;
}

function main() {
  const context = createCanvas().getContext("2d");
  const display = new Display(context!);

  const grid = new Grid(config.grid.rows, config.grid.columns);
  const cells = grid.getCells();

  display.displayCells(cells);

  console.log("grid:");
  console.log(grid);
}

main();
