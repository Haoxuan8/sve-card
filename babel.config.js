module.exports = function (api) {
    return {
        presets: [
            [
                "@babel/preset-env",
                {
                    useBuiltIns: false,
                    targets: {
                        chrome: "69",
                        safari: "11",
                    },
                    modules: api.env("es") ? false : "auto",
                },
            ],
        ],
    };
};
