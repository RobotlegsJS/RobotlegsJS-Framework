const webpack = require("webpack");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (env) => {
  if (!env) env = { production: false, karma: false };

  let mode = env.production ? "production" : "development";
  let tsconfig = !env.karma ? "tsconfig.json" : "tsconfig.test.json";
  let output = env.production ? "dist" : "dist-test";
  let filename = env.karma
    ? "[name].[hash].js"
    : env.production
    ? "robotlegs-openfl.min.js"
    : "robotlegs-openfl.js";

  return {
    mode: mode,

    entry: {
      main: path.join(__dirname, "src/index.ts")
    },

    output: {
      path: path.join(__dirname, output),
      filename: filename,

      libraryTarget: "var",
      library: "RobotlegsJSOpenFL"
    },

    devtool: env.production ? undefined : "inline-source-map",

    module: {
      rules: [
        {
          test: /\.ts$/,
          use: [{ loader: "ts-loader", options: { configFile: tsconfig } }]
        },
        {
          test: env.production /* disable this loader for production builds */
            ? /^$/
            : /^.*(src).*\.ts$/,
          loader: "istanbul-instrumenter-loader",
          enforce: "post"
        }
      ]
    },

    plugins: env.production ? [] : [new webpack.SourceMapDevToolPlugin({ test: /\.ts$/i })],

    optimization: env.production
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
      alias: {
        openfl: path.resolve(__dirname, "node_modules/openfl/lib/openfl")
      },
      extensions: [".ts", ".js", ".json"]
    }
  };
};
