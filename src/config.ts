const config = {
  canvas: {
    width: 600,
    height: 400,
  },

  grid: {
    rows: 9,
    columns: 6,
  },

  cell: {
    blockChance: 0.2,
  },

  display: {
    FPS: 60,

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
};

Object.freeze(config);
Object.freeze(config.canvas);
Object.freeze(config.grid);
Object.freeze(config.cell);
Object.freeze(config.display);
Object.freeze(config.display.colors);
Object.freeze(config.display.colors.cells);

export default config;
