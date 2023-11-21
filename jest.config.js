module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  roots: ['<rootDir>'],
  coverageDirectory: "./coverage/",
  testPathIgnorePatterns: ['node_modules', 'e2e'],
  coverageReporters: ["json", "lcov", "text", "clover"],
  verbose: true,
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  }
};
