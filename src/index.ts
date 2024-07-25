import "./styles/reset.css";
import "./styles/style.css";
import config from "./config";
import * as display from "./display";
import { Grid } from "./structures/grid";

function createCanvas() {
  const canvas = document.createElement("canvas");
  canvas.width = config.canvas.width;
  canvas.height = config.canvas.height;
  document.body.appendChild(canvas);
  return canvas;
}

function main() {
  const grid = new Grid(config.grid.rows, config.grid.columns);
  const cells = grid.getCells();

  const context = createCanvas().getContext("2d");
  display.main(context!, cells);

  console.log("grid:");
  console.log(grid);
}

main();
