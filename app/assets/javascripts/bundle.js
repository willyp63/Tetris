/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const View = __webpack_require__(1);
	
	$(() => {
	  const $tetris = $(".tetris");
	  if ($tetris.length === 1){
	    new View($tetris);
	  }
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Tetris = __webpack_require__(2);
	const Game = __webpack_require__(3);
	
	const STEP_INTERVAL = 150;
	
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


/***/ },
/* 2 */
/***/ function(module, exports) {

	const Tetris = {};
	
	Tetris.BLOCKS = [
	  [[0, 0, 0, 0],
	   [0, 0, 0, 0],
	   [1, 1, 1, 1],
	   [0, 0, 0, 0]],
	
	 [[0, 0, 0, 0],
	  [1, 0, 0, 0],
	  [1, 1, 1, 0],
	  [0, 0, 0, 0]],
	
	  [[0, 0, 0, 0],
	   [1, 1, 1, 0],
	   [1, 0, 0, 0],
	   [0, 0, 0, 0]],
	
	  [[0, 0, 0, 0],
	   [0, 1, 0, 0],
	   [1, 1, 1, 0],
	   [0, 0, 0, 0]],
	
	 [[0, 0, 0, 0],
	  [1, 1, 0, 0],
	  [0, 1, 1, 0],
	  [0, 0, 0, 0]],
	
	  [[0, 0, 0, 0],
	   [0, 1, 1, 0],
	   [1, 1, 0, 0],
	   [0, 0, 0, 0]],
	
	  [[0, 0, 0, 0],
	   [0, 1, 1, 0],
	   [0, 1, 1, 0],
	   [0, 0, 0, 0]]
	];
	
	Tetris.BLOCK_COLORS = ["red",
	                      "green", "yellow",
	                      "blue", "orange",
	                      "purple", "pink"];
	
	Tetris.NUM_COLS = 10;
	Tetris.NUM_ROWS = 22;
	
	module.exports = Tetris;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Block = __webpack_require__(4);
	const Board = __webpack_require__(5);
	const Tetris = __webpack_require__(2);
	
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


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const Tetris = __webpack_require__(2);
	
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


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(6);
	const Tetris = __webpack_require__(2);
	
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


/***/ },
/* 6 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map