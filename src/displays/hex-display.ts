import * as math from "../libs/utils/math";
import config from "../config";
import { ICell } from "../interfaces/cell.interface";
import { Display } from "./display";

export class HexDisplay extends Display {
  private readonly _diameter = config.canvas.width / this._rows;
  private readonly _outerRadius = this._diameter / 2;
  private readonly _innerRadius = this._outerRadius * math.COS_30;

  protected drawCell(cell: ICell, color: string) {
    const xOffset = cell.y % 2 === 0 ? 0 : this._innerRadius;
    const xCenter = this._outerRadius * 2 + xOffset + cell.x * (2 * this._innerRadius);
    const yCenter = this._outerRadius * 2 + cell.y * (1.5 * this._outerRadius);

    const step = this.easeFunction(cell.incrementAnimation(this._animationIncrement));
    const animationRadius = this._outerRadius * step;

    if (this._lastFillColor !== color) {
      this._context.fillStyle = color;
      this._lastFillColor = color;
    }

    this._context.beginPath();
    this._context.moveTo(xCenter + animationRadius * hexCosines[0], yCenter + animationRadius * hexSines[0]);
    for (let i = 1; i < 6; i++) {
      this._context.lineTo(xCenter + animationRadius * hexCosines[i], yCenter + animationRadius * hexSines[i]);
    }
    this._context.closePath();
    this._context.fill();
  }
}
