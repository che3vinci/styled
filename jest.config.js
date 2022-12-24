/**
 * @type {Config.InitialOptions}
 */
const config = {
  verbose: true,
  transform: {
    '\\.[tj]sx?$': 'babel-jest',
  },

  testRegex: '\\.test\\.(jsx?|tsx?)$',

  testEnvironment: 'node',

  resetMocks: false,
  // setupFiles: ['jest-localstorage-mock'],

  onlyChanged: true,

  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'lcov', 'text'],
  watchPathIgnorePatterns: ['/node_modules/', '/dist/', '/.git/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  rootDir: __dirname,
};

module.exports = config
