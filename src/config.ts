const config = {
  canvas: {
    width: 600,
    height: 400,
  },

  grid: {
    rows: 15,
    columns: 10,
  },

  cell: {
    blockChance: 0.2,
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
};

Object.freeze(config);
Object.freeze(config.canvas);
Object.freeze(config.grid);
Object.freeze(config.cell);
Object.freeze(config.display);
Object.freeze(config.display.colors);
Object.freeze(config.display.colors.cells);

export default config;
