const nextJest = require('next/jest');
module.exports=nextJest({dir:'./'})({testEnvironment:'jsdom',setupFilesAfterEnv:['<rootDir>/jest.setup.js'],testMatch:['**/*.test.tsx']});
