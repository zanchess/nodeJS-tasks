const config = {
  collectCoverage: true,
  collectCoverageFrom: ['task3/**/user.js', 'task3/**/group.js'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
};

module.exports = config;
