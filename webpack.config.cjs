const path = require("path");

module.exports = {
  entry: "./src/plugins/test.js", // Entry point for your code
  output: {
    path: path.resolve(__dirname, "dist"), // Output directory
    filename: "squarecraft-widget.js", // Bundled output file
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
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
