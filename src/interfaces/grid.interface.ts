import { ICell } from "./cell.interface";

export interface IGrid {
  createCells(): void;
  setupNeighbors(): void;
  generateBlocks(type: string): void;
  getCells(): ICell[] | ICell[][];
}
