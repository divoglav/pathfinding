const config = {
  canvas: {
    width: 700,
    height: 700,
  },

  map: {
    grid: "hex", // square, hex
    squareDiagonals: false,

    columns: 40,

    unblockSpawnLayers: 4,

    blocks: {
      type: "random", // none, noise, random

      noise: {
        percent: 0.36,
        //percent: 0,
        scalar: 0.14,
      },

      random: {
        percent: 0.3,
      },
    },
  },

  pathfinding: {
    distanceMethod: "euclidean", // manhattan, euclidean
    gScalar: 0.3,
  },

  display: {
    FPS: 60,

    lineWidth: 0.2,

    animation: {
      active: true,
      increment: 0.1,
    },

    colors: {
      border: "#313244",
      background: "#313244",

      cells: {
        empty: "#313244",
        //empty: "teal",
        block: "#11111b",
        open: "#89b4fa",
        //closed: "#b4befe",
        closed: "darkgreen",
        path: "#f38ba8",
        debug: "magenta",
      },
    },
  },
};

Object.freeze(config);

export default config;
