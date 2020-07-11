module.export = {
    transform: {
        "^.+\\.jsx?$": "babel-jest"
      },
    collectCoverage: true,
    collectCoverageFrom: ["**/*.{js, jsx}", "!**/node_modules/**"],
    coveragePathIgnorePatterns: ["/node_modules", "/public"]
    // testURL: "localhost:8888.html"
  };