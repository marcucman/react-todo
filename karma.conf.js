var webpackConfig = require('./webpack.config.js');

module.exports = function (config) {
  config.set({
    browsers: ['Chrome'],
    singleRun: true,
    frameworks: ['mocha'],
    files: [
      'node_modules/jquery/dist/jquery.min.js', // use script-loader npm module
      'node_modules/foundation-sites/dist/foundation.min.js', // use script-loader npm module
      'app/tests/**/*.test.jsx'
    ], // globbing patterns
    preprocessors: { // for the specified files, run these things
      'app/tests/**/*.test.jsx': ['webpack', 'sourcemap']
    },
    reporters: ['mocha'],
    client: {
      mocha: {
        timeout: '5000' // if a test isn't finished in 5 seconds, call it a failure
      }
    },
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    }
  });
};
// THIS IS INSANE
