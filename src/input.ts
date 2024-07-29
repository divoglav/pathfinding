type Vector = {
  x: number;
  y: number;
};

export const coordinates: Vector = {
  x: 0,
  y: 0,
};

export function setup() {
  window.addEventListener("pointermove", (event: PointerEvent) => {
    coordinates.x = event.x;
    coordinates.y = event.y;
  });
}
