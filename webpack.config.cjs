const path = require("path");

module.exports = {
  entry: "./src/plugins/test.js",
  output: {
    path: path.resolve(__dirname),
    filename: "squarecraft-widget.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: ["file-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  mode: "production",
};
