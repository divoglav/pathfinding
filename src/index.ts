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

function main() {
  const context = createCanvas().getContext("2d");

  display.main(context!);
}

main();
