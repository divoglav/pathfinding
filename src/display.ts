import config from "./config";

export function main(context: CanvasRenderingContext2D) {
  context.fillStyle = "teal";
  context.fillRect(0, 0, config.canvas.width, config.canvas.height);

  context.fillStyle = "orange";
  context.fillRect(100, 100, 200, 200);
}
