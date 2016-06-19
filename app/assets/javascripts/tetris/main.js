const View = require("./view.js");

$(() => {
  const $tetris = $(".tetris");
  if ($tetris.length === 1){
    new View($tetris);
  }
});
