'use strict'

// Polyfills

// import 'ie-shim' // Internet Explorer
// import 'es6-shim'
// import 'es6-promise'
// import 'es7-reflect-metadata'

// Prefer CoreJS over the polyfills above
require('zone.js/dist/zone')
import 'reflect-metadata'
import 'core-js/es6'
import 'core-js/es7/reflect'

// Typescript emit helpers polyfill
import 'ts-helpers'

if ('production' === ENV) {
  // Production


} else {
  // Development

  // Error.stackTraceLimit = Infinity

  require('zone.js/dist/long-stack-trace-zone')
}