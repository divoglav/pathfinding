const config = {
  canvas: {
    width: 300,
    height: 900,
  },

  map: {
    rows: 30,
    columns: 90,

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
    debug: false,

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
      },
    },
  },

  pathfinding: {
    IPS: 60,
    // manhattan, euclidean
    distanceMethod: "euclidean",
    gScalar: 0.3
  },
};

Object.freeze(config);

export default config;
