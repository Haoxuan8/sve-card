const TerserPlugin = require("terser-webpack-plugin");
const nodeEnv = process.env.NODE_ENV;
const isProduction = nodeEnv === "production";

module.exports = {
    mode: nodeEnv,
    entry: ["./src/index.js"],
    output: {
        path: isProduction ? `${__dirname}/dist` : `${__dirname}/examples`,
        filename: "index.js",
        library: {
            name: "SVECard",
            type: "umd",
        },
        globalObject: "this",
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
            }),
        ],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
        ],
    },
    devServer: {
        open: true,
        static: ["examples"],
        port: 8080,
        historyApiFallback: true,
    },
};
