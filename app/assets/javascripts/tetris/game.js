const Block = require("./block.js");
const Board = require("./board.js");
const Tetris = require("./tetris.js");

const blockStartPos =  [-1, Math.floor(Tetris.NUM_COLS / 2) - 2];

function Game(gameOver) {
  this.gameOver = gameOver;

  // add key listeners
  $(window).on("keydown", this.handleKey.bind(this));

  this.reset();
}

Game.prototype.newBlock = function () {
  return Block.randomBlock(blockStartPos.slice().slice(), this);
};

Game.prototype.reset = function () {
  this.board = new Board(this);
  this.currBlock = this.newBlock();
  this.nextBlock = this.newBlock();
  this.saveBlock = null;

  this.hasSaved = false;
  this.score = 0;
};

Game.prototype.newTurn = function () {
  this.board.addBlock(this.currBlock);
  this.currBlock = this.nextBlock;
  this.nextBlock = this.newBlock();

  // clear rows and increment score
  const rowsCleared = this.board.clearRows();
  if (rowsCleared) {
    this.score += Math.pow(10, rowsCleared);
  }

  this.hasSaved = false;

  // check for game over
  if (!this.currBlock.validPos()){
    this.gameOver(this.score);
    this.reset();
  }
};

Game.prototype.step = function () {
  this.currBlock.pos[0]++;

  // check for end of turn
  if (!this.currBlock.validPos()){
    this.currBlock.pos[0]--;
    this.newTurn();
  }
};

Game.prototype.save = function () {
  // dont allow multiple saves on same turn
  if (this.hasSaved) { return; }

  const prevSavedBlock = this.storeBlock(this.currBlock);
  if (prevSavedBlock) {
    this.currBlock = prevSavedBlock;
    this.hasSaved = true;
  } else {
    this.currBlock = this.nextBlock;
    this.nextBlock = this.newBlock();
    // allow user to save again if this was first save
  }
};

Game.prototype.storeBlock = function (block) {
  const temp = this.saveBlock;
  this.saveBlock = block;
  this.saveBlock.pos = blockStartPos.slice();
  return temp;
};

Game.prototype.handleKey = function (event) {
  const kc = event.keyCode;
  switch (kc) {
    case 37:
      this.move(-1);
      break;
    case 39:
      this.move(1);
      break;
    case 90:
      this.rotate(1);
      break;
    case 88:
      this.rotate(0);
      break;
    case 83:
      this.save();
      break;
  }
};

Game.prototype.move = function (dir) {
  this.currBlock.pos[1] += dir;
  if (!this.currBlock.validPos()){
    this.currBlock.pos[1] -= dir;
  }
};

Game.prototype.rotate = function (dir) {
  this.currBlock.rotate(dir);
  if (!this.currBlock.validPos()){
    this.currBlock.rotate(!dir);
  }
};

module.exports = Game;
