const Tetris = require("./tetris.js");
const Game = require("./game.js");

const STEP_INTERVAL = 250;

function View ($tetris) {
  this.$board = $tetris.find(".board");
  this.$infoPane = $tetris.find(".info-pane");
  this.$highscores = $tetris.find(".highscores");

  this.$next = this.$infoPane.find(".next");
  this.$save = this.$infoPane.find(".save");
  this.$score = this.$infoPane.find(".score");

  this.setup();
}

View.prototype.setup = function () {
  // setup board
  for (let i = 0; i < Tetris.NUM_COLS  * Tetris.NUM_ROWS; i++) {
    this.$board.append($('<li>'));
  }

  //setup next and save mini boards
  const blockSize = Tetris.BLOCKS[0].length;
  for (let i = 0; i < Math.pow(blockSize, 2); i++) {
    this.$next.append($('<li>'));
  }
  for (let i = 0; i < Math.pow(blockSize, 2); i++) {
    this.$save.append($('<li>'));
  }

  // init game
  this.game = new Game(score => {
    alert(`Game over, your score: ${score}`);
  });

  // start game
  this.timerId = setInterval(this.step.bind(this), STEP_INTERVAL);
};

View.prototype.step = function () {
  this.game.step();
  this.render();
};

View.prototype.render = function () {
  //score
  this.$score.html(`Score: ${this.game.score}`);

  //next block
  let $cells = this.$next.find("li");
  $cells.css("background-color", "white");

  let block = this.game.nextBlock;
  for (let i = 0; i < block.grid.length; i++){
    for (let j = 0; j < block.grid[i].length; j++){
      if (block.grid[i][j]){
        $cells.eq(i * block.grid.length + j).css("background-color", block.color);
      }
    }
  }

  //save block
  if (this.game.saveBlock){
    $cells = this.$save.find("li");
    $cells.css("background-color", "white");

    let block = this.game.saveBlock;
    for (let i = 0; i < block.grid.length; i++){
      for (let j = 0; j < block.grid[i].length; j++){
        if (block.grid[i][j]){
          $cells.eq(i * block.grid.length + j).css("background-color", block.color);
        }
      }
    }
  }

  // board cells
  $cells = this.$board.find("li");
  $cells.css("background-color", "white");

  // curr block
  this.game.currBlock.occupiedCells().forEach(cell => {
    $cells.eq(cell[0] * Tetris.NUM_COLS  + cell[1]).css("background-color", this.game.currBlock.color);
  });

  // board
  for (let i = 0; i < this.game.board.grid.length; i++) {
    const row = this.game.board.grid[i];
    for (let j = 0; j < row.length; j++) {
      $cells.eq(i * Tetris.NUM_COLS + j).css("background-color", row[j]);
    }
  }
};

module.exports = View;
