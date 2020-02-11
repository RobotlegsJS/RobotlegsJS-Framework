const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ConcatPlugin = require("webpack-concat-plugin");
const SimpleProgressPlugin = require("webpack-simple-progress-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const concatPluginConfigGenerator = (name, files) => {
  return {
    uglify: false,
    sourceMap: false,
    name: name,
    fileName: "[name].[hash].js",
    filesToConcat: files,
    injectType: "none"
  };
};

module.exports = options => {
  return {
    mode: "development",

    entry: {
      main: path.resolve("example/index.ts")
    },

    output: {
      path: __dirname + "/dist",
      filename: "game.[hash].js"
    },

    devtool: "source-map",

    module: {
      rules: [{ test: /\.ts$/, loader: "ts-loader" }]
    },

    plugins: [
      new CleanWebpackPlugin(),

      new HtmlWebpackPlugin({
        template: path.resolve("static/index.html"),
        inject: false
      }),

      /*
      new ConcatPlugin(concatPluginConfigGenerator("openfl", [
        path.resolve(__dirname, "./node_modules/openfl/dist/openfl.min.js")
      ]))
      */

      new SimpleProgressPlugin()
    ],

    resolve: {
      alias: {
        openfl: path.resolve(__dirname, "node_modules/openfl/lib/openfl")
      },
      extensions: [".ts", ".js", ".json"]
    },

    devServer: {
      host: "0.0.0.0",
      contentBase: path.join(__dirname, "static"),
      hot: true,
      disableHostCheck: true,
      inline: false
    }
  };
};
