const config = {
  canvas: {
    width: 700,
    height: 700,
  },

  grid: {
    rows: 30,
    columns: 30,
  },

  cell: {
    blockChance: 0.3,
  },

  display: {
    FPS: 60,
    info: false,
    lineWidth: 0.5,

    colors: {
      stroke: "#666",
      info: "#000",

      cells: {
        empty: "#888",
        block: "#333",
        open: "green",
        closed: "teal",
        path: "orange",
      },
    },
  },

  pathfinding: {
    gScale: 0.2,
  },
};

Object.freeze(config);
Object.freeze(config.canvas);
Object.freeze(config.grid);
Object.freeze(config.cell);
Object.freeze(config.display);
Object.freeze(config.display.colors);
Object.freeze(config.display.colors.cells);
Object.freeze(config.pathfinding);

export default config;
