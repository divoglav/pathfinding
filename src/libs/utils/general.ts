export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function removeFromArray(array: any[], element: any) {
  const indexToRemove = array.indexOf(element);
  if (indexToRemove !== -1) array.splice(indexToRemove, 1);
}
