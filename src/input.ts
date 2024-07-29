let x: number = 0;
let y: number = 0;
let clicked: boolean = false;

export function getX(): number {
  return x;
}

export function getY(): number {
  return y;
}

export function isClicked(): boolean {
  return clicked;
}

export function setup() {
  window.addEventListener("pointermove", (event: PointerEvent) => {
    x = event.x;
    y = event.y;
  });

  window.addEventListener("pointerdown", () => {
    clicked = true;
  });

  window.addEventListener("pointerup", () => {
    clicked = false;
  });

  window.addEventListener("blur", () => {
    clicked = false;
  });
}
