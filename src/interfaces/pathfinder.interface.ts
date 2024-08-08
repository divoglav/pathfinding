export interface IPathfinder {
  end(): void;
  hasEnded(): boolean;
  iterate(): void;
}
