var path = require('path');

module.exports = {
  entry: './index.js',
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'loco-js-model.js',
    library: 'Loco'
  }
};