const Util = {};

Util.emptyGrid = function (numRows, numCols) {
  const grid = [];
  for (let i = 0; i < numRows; i++) {
    grid[i] = [];
    for (let j = 0; j < numCols; j++) {
      grid[i].push(null);
    }
  }
  return grid;
};

module.exports = Util;
