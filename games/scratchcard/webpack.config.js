const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (options) => {
  if (!options) options = { production: false };

  let mode = options.production ? "production" : "development";

  return {
    mode,

    entry: {
      main: path.resolve("src/index.ts")
    },

    output: {
      path: __dirname + "/dist",
      filename: "bundle.js"
    },

    devtool: options.production ? undefined : "source-map",

    module: {
      rules: [{ test: /\.ts$/, loader: "ts-loader" }]
    },

    plugins: options.production ? [] : [new webpack.ProgressPlugin(), new HtmlWebpackPlugin()],

    optimization: options.production
      ? {
          concatenateModules: true,
          minimize: true,
          minimizer: [
            new TerserPlugin({
              parallel: 4,
              extractComments: false,
              terserOptions: {
                format: {
                  comments: false
                }
              }
            })
          ]
        }
      : {},

    resolve: {
      extensions: [".ts", ".js", ".json"]
    }
  };
};
