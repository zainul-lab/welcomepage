// jest.config.js
module.exports = {
  testEnvironment: 'jsdom', // For DOM testing
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // For custom matchers
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1', // Adjust for aliases (if used)
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Use Babel for transformation
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
};