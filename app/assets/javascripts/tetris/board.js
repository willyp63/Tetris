const Util = require("./util.js");
const Tetris = require("./tetris.js");

function Board (game) {
  this.game = game;
  this.grid = Util.emptyGrid(Tetris.NUM_ROWS, Tetris.NUM_COLS);
}

Board.prototype.addBlock = function (block) {
  block.occupiedCells().forEach(cell => {
    const y = cell[0], x = cell[1];
    this.grid[y][x] = block.color;
  });
};

Board.prototype.clearRows = function () {
  const rowsToClear = [];
  for (let i = 0; i < this.grid.length; i++) {
    if (Board.rowCleared(this.grid[i])){
      rowsToClear.push(i);
    }
  }

  rowsToClear.forEach(i => {
    this.grid.splice(i, 1);
    const emptyRow = new Array(Tetris.NUM_COLS).map(n => null);
    this.grid.unshift(emptyRow);
  });

  return rowsToClear.length;
};

Board.rowCleared = function (row) {
  for (let i = 0; i < row.length; i++) {
    if (!row[i]) { return false; }
  }
  return true;
};

module.exports = Board;
