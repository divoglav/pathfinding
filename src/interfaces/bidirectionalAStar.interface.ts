import { ICell } from "./cell.interface";
import { IPathfinder } from "./pathfinder.interface";

export interface IBidirectionalAStar extends IPathfinder {
  end(): void;

  setArchon(archon: IBidirectionalAStar): void;

  containsCell(cell: ICell): boolean;

  reconstructPathFrom(cell: ICell): void;
}
