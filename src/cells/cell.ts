export abstract class Cell {
  abstract isEmpty(): boolean;
  abstract setEmpty(): void;

  abstract isBlock(): boolean;
  abstract setBlock(): void;

  abstract isOpen(): boolean;
  abstract setOpen(): void;

  abstract isClosed(): boolean;
  abstract setClosed(): void;

  abstract isPath(): boolean;
  abstract setPath(): void;

  abstract getG(): number;
  abstract setG(value: number): void;
  abstract setH(value: number): void;
  abstract getF(): number;

  abstract getParent(): Cell | null;
  abstract setParent(cell: Cell): void;

  abstract getNeighbors(): (Cell | null)[];
  abstract setNeighbors(neighbors: (Cell | null)[]): void;

  abstract shouldDisplay(): boolean;
  abstract unmarkDisplay(): void;

  abstract incrementAnimation(value: number): void;
  abstract skipAnimation(): void;
}
