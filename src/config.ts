const config = {
  canvas: {
    width: 634,
    height: 634,
  },

  pathfinding: {
    distanceMethod: "euclidean", // manhattan, euclidean
    weights: {
      g: 2,
      t: 40,
      h: 10,
    },
    bidirectional: false,
  },

  map: {
    grid: "square", // square, hex
    squareDiagonals: false,

    columns: 50,

    unblockSpawnLayers: 4,

    blocks: {
      type: "noise", // none, noise, random

      noise: {
        percent: 0.28,
        //percent: 0,
        scalar: 0.10,
      },

      random: {
        percent: 0.3,
      },
    },

    terrain: {
      type: "noise", // none, noise, random

      noise: {
        percent: 0.36,
        scalar: 0.06,
        offsetFromBlocks: {
          random: true,
          x: 1,
          y: 1,
        },
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
      increment: 0.1,
    },

    colors: {
      border: "#313244",
      background: "#313244",

      cells: {
        empty: "#313244",
        block: "#11111b",
        terrain: "darkgreen",
        open: "#89b4fa",
        closed: "#b4befe",
        path: "#f38ba8",
        debug: "magenta",
      },
    },
  },
};

Object.freeze(config);

export default config;
