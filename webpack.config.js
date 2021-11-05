const { ESBuildMinifyPlugin } = require("esbuild-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve, join } = require("path");

const target = "es2015";

module.exports = {
  entry: "./src/index.tsx",
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: resolve(__dirname, "build"),
    filename: "bundle.js",
  },
  devServer: {
    static: join(__dirname, "build"),
    compress: true,
    port: 4000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "esbuild-loader",
        options: {
          loader: "jsx",
          target,
        },
      },
      {
        test: /\.tsx?$/,
        loader: "esbuild-loader",
        options: {
          loader: "tsx",
          target,
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      new ESBuildMinifyPlugin({
        target,
      }),
    ],
  },
};
