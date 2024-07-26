const config = {
  canvas: {
    width: 900,
    height: 600,
  },

  grid: {
    rows: 9,
    columns: 6,
  },

  cell: {
    blockChance: 0,
  },

  display: {
    FPS: 30,
    info: true,

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
