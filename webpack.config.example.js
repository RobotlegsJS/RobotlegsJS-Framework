const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        main: path.join(__dirname, "example/index.ts")
    },

    output: {
        path: path.join(__dirname, "dist"),
        filename: "bundle.js"
    },

    devtool: "source-map",

    module: {
        rules: [{ test: /\.ts$/, loader: "ts-loader" }]
    },

    plugins: [new HtmlWebpackPlugin()],

    resolve: {
        extensions: [".ts", ".js", ".json"]
    }
};
