module.exports = {
  extends: ['plugin:@xcritical/eslint-plugin-xcritical/typescript'],
  settings: {
    'import/resolver': {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      },
      alias: {
        map: [
          ['@xcritical/theme', './packages/xc-theme/src'],
        ],
        extensions: ['.ts', '.js', '.jsx', '.json']
      }
    },
  },
  "rules": {
    "react/jsx-filename-extension": [1, {
      "extensions": [".tsx", ".jsx"]
    }],
    "react/prop-types": 0,
    "no-console": [1, {
      allow: ["error"]
    }],
    "react/prop-types": 0,
    "@typescript-eslint/no-unnecessary-condition": 0,
    '@typescript-eslint/quotes': ["error", "single"],
    "react/jsx-props-no-spreading": 0,
    "import/no-extraneous-dependencies": ["error", {
      "devDependencies": ["**/stories/**/*.tsx", "**/stories/**/*.ts"]
    }],
    "@typescript-eslint/explicit-function-return-type": [1, {
      allowExpressions: true,
      allowTypedFunctionExpressions: true,
      allowHigherOrderFunctions: true
    }]
  },
};
