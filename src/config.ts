const config = {
  canvas: {
    width: 700,
    height: 700,
  },

  map: {
    rows: 60,
    columns: 60,

    unblockSpawnLayers: 5,

    blocks: {
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

export default config;
