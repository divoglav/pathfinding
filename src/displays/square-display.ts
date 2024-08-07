import config from "../config";
import { Mathematics } from "../libs/utils/mathematics";
import { ICell } from "../interfaces/cell.interface";
import { Display } from "./display";

export class SquareDisplay extends Display {
  protected readonly _maxHeight = config.canvas.height / this._rows;
  protected readonly _halfWidth = this._maxWidth / 2;
  protected readonly _halfHeight = this._maxHeight / 2;

  protected _drawCell(cell: ICell, color: string) {
    const xCenter = cell.x * this._maxWidth + this._halfWidth;
    const yCenter = cell.y * this._maxHeight + this._halfHeight;

    const step = this._easeFunction(cell.incrementAnimation(this._animationIncrement));

    const width = Mathematics.lerp(0, this._maxWidth, step);
    const height = Mathematics.lerp(0, this._maxHeight, step);

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
