export class Utilities {
  static wait(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  static removeFromArray(array: unknown[], element: unknown): void {
    const indexToRemove = array.indexOf(element);
    if (indexToRemove !== -1) array.splice(indexToRemove, 1);
  }
}
