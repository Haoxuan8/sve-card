module.exports = function (api) {
    api.cache(true);

    return {
        presets: [
            [
                "@babel/preset-env",
                {
                    targets: {
                        chrome: "69",
                        safari: "11",
                    },
                },
            ],
        ],
    };
};
