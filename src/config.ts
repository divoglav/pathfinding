const config = {
  canvas: {
    width: 600,
    height: 600,
  },

  map: {
    grid: "hex", // square, hex
    rows: 40,
    columns: 40,

    unblockSpawnLayers: 4,

    blocks: {
      type: "noise", // random, noise, none

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

  display: {
    FPS: 60,

    lineWidth: 0.2,

    animation: {
      active: true,
      increment: 0.1
    },

    colors: {
      border: "#313244",
      background: "#313244",

      cells: {
        empty: "#313244",
        //empty: "teal",
        block: "#11111b",
        open: "#89b4fa",
        closed: "#b4befe",
        path: "#f38ba8",
        debug: "magenta",
      },
    },
  },

  pathfinding: {
    distanceMethod: "euclidean", // manhattan, euclidean
    gScalar: 0.3,
  },
};

Object.freeze(config);

export default config;
