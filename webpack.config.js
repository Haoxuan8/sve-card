const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const nodeEnv = process.env.NODE_ENV;
const isProduction = nodeEnv === "production";

module.exports = {
    mode: nodeEnv,
    entry: "./src/index.js",
    output: {
        path: isProduction ? `${__dirname}/dist` : `${__dirname}/examples`,
        filename: "svecard.min.js",
        library: {
            name: "SVECard",
            type: "umd",
        },
        globalObject: "this",
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {from: `${__dirname}/src/asset`, to: isProduction ? `${__dirname}/dist/asset` : `${__dirname}/examples/asset`},
                !isProduction && {from: `${__dirname}/node_modules/kuromoji/dict`, to: `${__dirname}/examples/kuromoji/dict`},
            ].filter(Boolean),
          }),
    ].filter(Boolean),
    resolve: {
        fallback: {
            "path": require.resolve("path-browserify"),
        },
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
