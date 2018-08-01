const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",

    entry: {
        main: path.join(__dirname, "example/index.ts")
    },

    output: {
        path: path.join(__dirname, "dist-example"),
        filename: "bundle.js"
    },

    devtool: "source-map",

    module: {
        rules: [{ test: /\.ts$/, loader: "ts-loader?configFile=tsconfig.example.json" }]
    },

    plugins: [new HtmlWebpackPlugin()],

    resolve: {
        extensions: [".ts", ".js", ".json"]
    }
};
