const nextJest = require("next/jest");

const createJestConfig = nextJest({
    dir: "./",
    match: '**/__test__/*.{test,spec}.?(c|m)[jt]s?(x)'
});

const customJestConfig = {
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1"
    },
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
    },
    testPathIgnorePatterns: [
        "<rootDir>/tests/",
        "<rootDir>/tests-examples/"
    ]
};

module.exports = createJestConfig(customJestConfig);