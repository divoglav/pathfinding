const config = {
  canvas: {
    width: 700,
    height: 700,
  },

  map: {
    rows: 40,
    columns: 40,

    unblockSpawnLayers: 4,

    blocks: {
      // random, noise, none
      type: "random",

      noise: {
        percent: 0.36,
        scalar: 0.14,
      },

      random: {
        percent: 0.2,
      },
    },
  },

  display: {
    FPS: 60,

    lineWidth: 0.2,

    cellAnimation: true,

    colors: {
      border: "#888",
      background: "#888",

      cells: {
        empty: "#888",
        block: "#333",
        open: "green",
        closed: "teal",
        path: "orange",
        debug: "magenta",
      },
    },
  },

  pathfinding: {
    // manhattan, euclidean
    distanceMethod: "euclidean",
    gScalar: 0.3,
  },
};

Object.freeze(config);

export default config;
