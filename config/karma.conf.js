'use strict'

module.exports = (config) => {
  const testWebpackConfig = require('./webpack.test.js')

  config.set({
    basePath: '',
    frameworks: ['jasmine', 'sinon', 'faker'],
    exclude: [ ],
    files: [ { pattern: './config/spec-bundle.js', watched: false } ],
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
    // singleRun: false
  })
}
