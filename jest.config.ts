export default {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'jsdom',
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/components/**/*.{tsx,ts}',
    'src/utilities/**/*.{tsx,ts}',
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(gif|ttf|eot|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  coveragePathIgnorePatterns: [
    '<rootDir>/App.tsx',
    '<rootDir>/main.tsx',
    '<rootDir>/node_modules',
  ],
};
