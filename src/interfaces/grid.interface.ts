import { ICell } from "./cell.interface";

export interface IGrid {
  createCells(): void;
  setupNeighbors(): void;
  generateBlocks(type: string): void;
  getCell(x: number, y: number): ICell | null;
  getCells(): ICell[] | ICell[][];
}
