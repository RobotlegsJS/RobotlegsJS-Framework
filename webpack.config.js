const webpack = require('webpack');
const path = require('path');

module.exports = function(options) {
  return {
    entry: {
      main: path.join(__dirname, "src/index.ts")
    },

    output: {
      path: path.join(__dirname, "dist"),
      filename: "signals.min.js",

      libraryTarget: "var",
      library: "SignalsJS"
    },

    devtool: 'inline-source-map',

    module: {
      rules: [
        { test: /\.ts$/, loader: "ts-loader" },
        {
          test: ((options.production) /* disable this loader for production builds */
            ? /^$/
            : /^(.(?!\.test))*\.ts$/),
          loader: "istanbul-instrumenter-loader",
          query: {
            embedSource: true
          },
          enforce: "post"
        }
      ]
    },

    plugins: (
      (options.production)
        ? [ new webpack.optimize.UglifyJsPlugin({ sourceMap: false }) ]
        : [ new webpack.SourceMapDevToolPlugin({ test: /\.ts$/i }) ]
    ),

    resolve: {
      extensions: ['.ts', '.js', '.json']
    }
  }
};
