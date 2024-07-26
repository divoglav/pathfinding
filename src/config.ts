const config = {
  canvas: {
    width: 700,
    height: 700,
  },

  grid: {
    rows: 40,
    columns: 40,
  },

  cell: {
    blockChance: 0.3,
  },

  display: {
    FPS: 60,
    info: false,

    colors: {
      background: "#000000",
      info: "#000000",

      cells: {
        empty: "gray",
        block: "black",
        open: "green",
        closed: "teal",
        path: "orange",
      },
    },

    border: 0.5,
  },

  pathfinding: {
    // Scales the G value.
    heuristic: 0.2,
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
