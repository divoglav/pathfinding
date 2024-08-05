import * as math from "../libs/utils/math";
import config from "../config";
import { ICell } from "../interfaces/cell.interface";
import { Display } from "./display";

export class SquareDisplay extends Display {
  protected readonly _maxHeight = config.canvas.height / this._cols;
  protected readonly _halfWidth = this._maxWidth / 2;
  protected readonly _halfHeight = this._maxHeight / 2;

  protected drawCell(cell: ICell, color: string) {
    const xCenter = cell.x * this._maxWidth + this._halfWidth;
    const yCenter = cell.y * this._maxHeight + this._halfHeight;

    const step = this.easeFunction(cell.incrementAnimation(this._animationIncrement));

    const width = math.lerp(0, this._maxWidth, step);
    const height = math.lerp(0, this._maxHeight, step);

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
