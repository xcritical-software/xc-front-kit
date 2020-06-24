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
    "@typescript-eslint/no-empty-function": 0,
    "@typescript-eslint/no-unnecessary-condition": "warn",
    "@typescript-eslint/ban-tslint-comment": 0,
    "@typescript-eslint/no-confusing-non-null-assertion": 0,
    "@typescript-eslint/no-loss-of-precision": 0,
    "prefer-destructuring": ["error", {
      "array": false,
      "object": true
    }, {
        "enforceForRenamedProperties": false
      }]
  },
};
