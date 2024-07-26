const config = {
  canvas: {
    width: 600,
    height: 400,
  },

  grid: {
    rows: 30,
    columns: 20,
  },

  cell: {
    blockChance: 0.1,
  },

  display: {
    FPS: 60,

    colors: {
      cell: "green",
      block: "black",
    },

    border: 1,
  },
};

Object.freeze(config);
Object.freeze(config.canvas);
Object.freeze(config.grid);
Object.freeze(config.cell);
Object.freeze(config.display);
Object.freeze(config.display.colors);

export default config;
