module.exports = {
  clearMocks: true,
  extensionsToTreatAsEsm: ['.ts'],
  moduleFileExtensions: ['js', 'mjs', 'ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.+)\\.js$': '$1'
  },
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  testRunner: 'jest-circus/runner',
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: 'tsconfig.test.json'
      }
    ]
  },
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/*.ts', '!src/constants.ts']
}
