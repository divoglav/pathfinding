const config = {
  canvas: {
    width: 900,
    height: 600,
  },

  grid: {
    rows: 30,
    columns: 20,
  },

  cell: {
    blockChance: 0.3,
  },

  display: {
    FPS: 30,
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

    border: 2,
  },

  pathfinding: {
    // Scales the G value.
    heuristic: 0.5,
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
