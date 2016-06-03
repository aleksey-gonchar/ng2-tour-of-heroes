const helpers = require('./helpers')

const ProvidePlugin = require('webpack/lib/ProvidePlugin')
const DefinePlugin = require('webpack/lib/DefinePlugin')
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin

const ENV = process.env.ENV = process.env.NODE_ENV = 'test'

module.exports = {
  // devtool: 'inline-source-map',
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.ts', '.js'],
    root: helpers.root('src'),
  },

  module: {
    preLoaders: [
      // {
      //   test: /\.ts$/,
      //   loader: 'tslint-loader',
      //   exclude: [helpers.root('node_modules')]
      // },
      {
        test: /\.js$/,
        loader: 'source-map',
        exclude: [
          // these packages have problems with their sourcemaps
          helpers.root('node_modules/rxjs'),
          helpers.root('node_modules/@angular'),
          helpers.root('node_modules/@ngrx')
        ]
      },
      // {
      //   test: /\.js$/,
      //   loader: 'babel-istanbul',
      //   query: {
      //     cacheDirectory: true
      //   }
      // }
    ],
    loaders: [
      // {
      //   test: /\.js$/,
      //   include: helpers.root('src'),
      //   loader: 'babel',
      //   query: {
      //     cacheDirectory: true,
      //     presets: ['es2015']
      //   }
      // },
      {
        test: /\.ts$/,
        loader: 'awesome-typescript',
        query: {
          compilerOptions: {
            removeComments: true
          }
        },
        exclude: [/\.(spec|e2e)\.ts$/]
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'raw',
        exclude: [helpers.root('src/index.html')]
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.scss/,
        loader: 'raw!postcss?sourceMap!sass?sourceMap',
        include: helpers.root('src/app/components')
      },
      {
        test: /main\.scss/,
        loader: 'style!css!postcss!sass',
      },
      {
        test: /\.css/,
        loader: 'style!css!postcss'
      },
    ],
    postLoaders: [
      {
        test: /\.(js|ts)$/, loader: 'istanbul-instrumenter',
        include: helpers.root('src'),
        exclude: [
          /\.(e2e|spec)\.ts$/,
          /node_modules/
        ]
      }
    ]
  },

  plugins: [
    new ForkCheckerPlugin(),
    new DefinePlugin({
      'ENV': JSON.stringify(ENV),
      'HMR': false,
      'process.env': {
        'ENV': JSON.stringify(ENV),
        'NODE_ENV': JSON.stringify(ENV),
        'HMR': false,
      }
    }),
  ],
  tslint: {
    emitErrors: false,
    failOnHint: false,
    resourcePath: 'src'
  },
  node: {
    global: 'window',
    process: false,
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
}
