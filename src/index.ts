import "./styles/reset.css";
import "./styles/style.css";
import config from "./config";
import * as display from "./display";

function createCanvas() {
  const canvas = document.createElement("canvas");
  canvas.width = config.canvas.width;
  canvas.height = config.canvas.height;
  document.body.appendChild(canvas);
  return canvas;
}

class Grid<T> {
  private data: T[][];

  constructor() {
    this.data = [];
  }

  get(x: number, y: number) {
    return this.data[x][y];
  }
}

function main() {
  const context = createCanvas().getContext("2d");

  display.main(context!);

  const grid = new Grid();
  console.log(grid);
}

main();
