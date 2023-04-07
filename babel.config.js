module.exports = function (api) {
    api.cache(true);

    return {
        presets: [
            [
                "@babel/preset-env",
                {
                    useBuiltIns: false,
                    corejs: 3,
                    targets: {
                        chrome: "69",
                        safari: "11",
                    },
                },
            ],
        ],
    };
};
