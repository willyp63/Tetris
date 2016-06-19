const path = require("path");

module.exports = {
  context: __dirname,
  entry: "./app/assets/javascripts/tetris/main.js",
  output: {
    path: path.join(__dirname, 'app', 'assets', 'javascripts'),
    filename: "bundle.js",
  },
  devtool: 'source-map'
};
