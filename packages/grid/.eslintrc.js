module.exports = {
  extends: ['plugin:@xcritical/eslint-plugin-xc-front-lint/typescript'],
  settings: {
    'import/resolver': {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      },
      alias: {
        map: [
          ['@xcritical/xc-theme', './packages/xc-theme/src'],
        ],
        extensions: ['.ts', '.js', '.jsx', '.json']
      }
    },
  },
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".tsx", ".jsx"] }],
    "no-console": [1, { allow: ["error"] }],
    "@typescript-eslint/no-unnecessary-condition": 0
  },
};
