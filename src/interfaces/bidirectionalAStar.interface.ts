import { ICell } from "./cell.interface";

export interface IBidirectionalAStar {
  end(): void;
  hasEnded(): boolean;

  setArchon(archon: IBidirectionalAStar): void;

  containsCell(cell: ICell): boolean;

  reconstructPathFrom(cell: ICell): void;
}
