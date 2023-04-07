const eslintrc = {
    extends: ["eslint:recommended"],
    env: {
        browser: true,
        node: true,
        jest: true,
        es6: true,
    },
    parser: "@babel/eslint-parser",
    plugins: [
        "babel",
    ],
    rules: {
        "func-names": 0,
        "arrow-body-style": 0,
        "import/extensions": 0,
        "import/no-unresolved": 0,
        "import/no-extraneous-dependencies": 0,
        "prefer-destructuring": 0,
        "no-param-reassign": 0,
        "no-return-assign": 0,
        "max-len": 0,
        "consistent-return": 0,
        "no-redeclare": 0,
        "comma-dangle": ["error", "always-multiline"],
        "function-paren-newline": 0,
        "object-curly-newline": 0,
        "no-restricted-globals": 0,
        "prefer-promise-reject-errors": 0,
        "no-mixed-operators": 0,
        "no-plusplus": 0,
        "no-continue": 0,

        quotes: [
            2, "double", {
                allowTemplateLiterals: true,
            },
        ],
        eqeqeq: [2, "always", {null: "ignore"}],
        "operator-linebreak": [2, "before"],
        "multiline-ternary": [2, "always-multiline"],
        "object-curly-spacing": [2, "never"],
        "no-trailing-spaces": [
            2, {
                skipBlankLines: true,
                ignoreComments: true,
            },
        ],
        "no-underscore-dangle": [0],
        "no-unused-vars": [0],
        "no-nested-ternary": [0],
        "no-lonely-if": [0],
        "class-methods-use-this": [0],
        "arrow-parens": [0],
        "no-else-return": [0],
        "dot-notation": [0],
        "padded-blocks": [0],
        "no-bitwise": [0],
        "no-use-before-define": [0],
        "semi": ["error", "always"],
    },
};

module.exports = eslintrc;
