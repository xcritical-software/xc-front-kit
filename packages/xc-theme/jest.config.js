module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],
  roots: [
    "<rootDir>/src"
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  modulePathIgnorePatterns: ['<rootDir>/.publish/', '<rootDir>/node_modules/'],
  moduleFileExtensions: ['ts', 'tsx', 'json', 'js', 'jsx', 'node'],
  globals: {
    'ts-jest': {
      babelConfig: false,
    }
  },
  collectCoverage: true,
  testResultsProcessor: "jest-teamcity-reporter",
  verbose: true,
  displayName: {
    name: '@xcritical/xc-theme',
    color: 'blue',
  },
  errorOnDeprecated: true,
};