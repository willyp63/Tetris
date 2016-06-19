const Tetris = require("./tetris.js");

function Block (grid, color, pos, game) {
  this.grid = grid;
  this.color = color;
  this.pos = pos;
  this.game = game;
}

Block.randomBlock = function (pos, game) {
  const i = Math.floor(Math.random() * Tetris.BLOCKS.length);
  const grid = Tetris.BLOCKS[i].slice();
  const color = Tetris.BLOCK_COLORS[i];
  return new Block (grid, color, pos, game);
};

Block.prototype.occupiedCells = function () {
  const cells = [];
  for (let i = 0; i < this.grid.length; i++) {
    for (let j = 0; j < this.grid[i].length; j++) {
      if (this.grid[i][j]) {
        cells.push([i + this.pos[0], j + this.pos[1]]);
      }
    }
  }
  return cells;
};

Block.prototype.validPos = function () {
  const cells = this.occupiedCells();
  for (let i = 0; i < cells.length; i++) {
    const y = cells[i][0], x = cells[i][1];
    const boardGrid = this.game.board.grid;
    if (x < 0 || x >= Tetris.NUM_COLS || y >= Tetris.NUM_ROWS || boardGrid[y][x]){
      return false
    }
  }
  return true;
}

Block.prototype.rotate = function (dir) {
  const rotated = [];
  for (let i = 0; i < this.grid.length; i++) {
    rotated.push([]);
    for (let j = 0; j < this.grid.length; j++) {
      if (dir) {
        rotated[i].push(this.grid[this.grid.length - j - 1][i]);
      } else {
        rotated[i].push(this.grid[j][this.grid.length - i - 1]);
      }
    }
  }
  this.grid = rotated;
}

module.exports = Block;
