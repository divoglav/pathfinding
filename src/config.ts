const config = {
  canvas: {
    width: 700,
    height: 700,
  },

  grid: {
    rows: 60,
    columns: 60,
  },

  blocks: {
    value: 0.3,
    noise: {
      active: true,
      scalar: 0.12,
    },
    unblockLayers: 3,
  },

  display: {
    FPS: 60,
    debug: false,
    lineWidth: 0.5,

    colors: {
      stroke: "#888",
      debug: "#000",

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
    gScale: 0.3,
  },
};

Object.freeze(config);
Object.freeze(config.canvas);
Object.freeze(config.grid);
Object.freeze(config.blocks);
Object.freeze(config.blocks.noise);
Object.freeze(config.display);
Object.freeze(config.display.colors);
Object.freeze(config.display.colors.cells);
Object.freeze(config.pathfinding);

export default config;
