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
  const context = createCanvas().getContext("2d");

  const grid = new Grid(config.grid.rows, config.grid.columns);

  display.main(context!, grid);

  console.log("grid:");
  console.log(grid);

  console.log("x3 y0");
  console.log(grid.getCell(3, 0));
}

main();
