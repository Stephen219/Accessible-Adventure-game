// const nextJest = require('next/jest')
 
// /** @type {import('jest').Config} */
// const createJestConfig = nextJest({
//   // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
//   dir: './',
// })
 
// // Add any custom config to be passed to Jest
// const config = {
//   coverageProvider: 'v8',
//   testEnvironment: 'jsdom',
//   // Add more setup options before each test is run
//   // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
// }
 
// // createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
// module.exports = createJestConfig(config)

const nextJest = require('next/jest');

/** @type {import('jest').Config} */
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',


  // Map path aliases to their actual paths (from your `jsconfig.json` or `tsconfig.json`)
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  // Optional: Ignore certain paths from being transformed (if necessary)
  transformIgnorePatterns: ['/node_modules/'],

  
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(config);
