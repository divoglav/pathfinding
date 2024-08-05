import * as math from "../libs/utils/math";
import config from "../config";
import { ICell } from "../interfaces/cell.interface";
import { Display } from "./display";

const rows = config.map.rows;
const cols = config.map.columns;
//const diameter = config.canvas.width / rows;
//const outerRadius = diameter / 2;
//const innerRadius = outerRadius * math.COS_30;
const maxWidth = config.canvas.width / rows;
const maxHeight = config.canvas.height / cols;
const halfWidth = maxWidth / 2;
const halfHeight = maxHeight / 2;
const cellColors = config.display.colors.cells;

export class SquareDisplay extends Display {
  protected drawCell(cell: ICell, color: string) {
    const xCenter = cell.x * maxWidth + halfWidth;
    const yCenter = cell.y * maxHeight + halfHeight;

    const step = this.easeFunction(cell.incrementAnimation(animationIncrement));

    const width = math.lerp(0, maxWidth, step);
    const height = math.lerp(0, maxHeight, step);

    const x = xCenter - width / 2;
    const y = yCenter - height / 2;

    if (this._lastFillColor !== color) {
      this._context.fillStyle = color;
      this._lastFillColor = color;
    }

    this._context.fillRect(x, y, width, height);
    this._context.strokeRect(x, y, width, height);
  }
}
