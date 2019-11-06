module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  roots: [
    '<rootDir>/packages',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  modulePathIgnorePatterns: ['<rootDir>/.publish/', '<rootDir>/node_modules/'],
  moduleFileExtensions: ['ts', 'tsx', 'json', 'js', 'jsx', 'node'],
  globals: {
    'ts-jest': {
      babelConfig: false,
    },
  },
  collectCoverage: true,
  verbose: true,
  name: '@xcritical/xc-front-kit',
  displayName: {
    name: '@xcritical/xc-front-kit',
    color: 'blue',
  },
  errorOnDeprecated: true,
};
