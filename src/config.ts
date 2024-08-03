const config = {
  canvas: {
    width: 700,
    height: 700,
  },

  map: {
    rows: 60,
    columns: 60,

    unblockSpawnLayers: 4,

    blocks: {
      // random, noise, none
      type: "noise",

      noise: {
        percent: 0.4,
        scalar: 0.12,
      },

      random: {
        percent: 0.3,
      },
    },
  },

  display: {
    FPS: 60,

    lineWidth: 0.2,

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
