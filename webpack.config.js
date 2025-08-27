const path = require("path");

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
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "loco-model.js",
    library: { name: "LocoModel", type: "umd", umdNamedDefine: true },
    globalObject: "window",
    clean: true,
  },
};
