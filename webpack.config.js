const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  devtool: "source-map",
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "loco-model.js",
    library: "LocoModel",
    libraryTarget: "umd",
  },
};
