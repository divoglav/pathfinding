export type Neighbor = {
  cell: ICell;
  moveCost: number;
} | null;

export interface ICell {
  readonly x: number;
  readonly y: number;

  isEmpty(): boolean;
  setEmpty(): void;
  isBlock(): boolean;
  setBlock(): void;
  isTerrain(): boolean;
  setTerrain(): void;
  isOpen(): boolean;
  setOpen(): void;
  isClosed(): boolean;
  setClosed(): void;
  isPath(): boolean;
  setPath(): void;

  getG(): number;
  setG(value: number): void;
  getT(): number;
  setT(value: number): void;
  getH(): number;
  setH(value: number): void;
  getF(): number;

  getParent(): ICell | null;
  setParent(cell: ICell): void;

  getNeighbors(): Neighbor[];
  setNeighbors(neighbors: Neighbor[]): void;

  shouldDisplay(): boolean;
  unmarkDisplay(): void;
  incrementAnimation(value: number): number;
  skipAnimation(): void;

  equals(otherCell: ICell): boolean;
}
