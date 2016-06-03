'use strict'

module.exports = (config) => {
  const testWebpackConfig = require('./webpack.test.js')

  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    exclude: [ ],
    /*
     * list of files / patterns to load in the browser
     * we are building the test environment in ./spec-bundle.js
     */
    files: [ { pattern: './config/spec-bundle.js', watched: false } ],
    // preprocessors: { './config/spec-bundle.js': ['coverage', 'webpack', 'sourcemap'] },
    preprocessors: { './config/spec-bundle.js': ['webpack'] },
    webpack: testWebpackConfig,
    coverageReporter: {
      dir : 'coverage/',
      reporters: [
        { type: 'text-summary' },
        { type: 'json' },
        { type: 'html' }
      ]
    },
    webpackServer: { noInfo: true },
    reporters: [ 'mocha', 'coverage' ],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: [
      // 'Chrome',
      'PhantomJS'
    ],
    singleRun: true
  })
}
