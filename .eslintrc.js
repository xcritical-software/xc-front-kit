const overrides = require('@xcritical/eslint-plugin-xc-front-lint/overrides/typescript');

module.exports = {
  extends: ['plugin:@xcritical/eslint-plugin-xc-front-lint/base'],
  settings: {
    'import/resolver': {
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
    "no-console": [1, { allow: ["error"] }]
  },
  overrides,
};