import { Cell } from "../cells/cell";

export abstract class Grid {
  abstract createCells(): void;
  abstract setupNeighbors(): void;
  abstract generateBlocks(type: string): void;
  abstract getCell(x: number, y: number): Cell | null;
  abstract getCells(): Cell[];
}
