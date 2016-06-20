const webpack = require('webpack')
const helpers = require('./helpers')

const autoprefixer = require('autoprefixer')
var CopyWebpackPlugin = (CopyWebpackPlugin = require('copy-webpack-plugin'), CopyWebpackPlugin.default || CopyWebpackPlugin);
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin

const METADATA = {
  title: 'Tour of heroes',
  baseUrl: '/'
}

module.exports = {
  metadata: METADATA,
  // target: 'web',
  cache: true,
  entry: {
    'vendor': './src/vendor.ts',
    'polyfills': './src/polyfills.ts',
    'app': './src/main.ts'
  },

  resolve: {
    extensions: ['', '.ts', '.js', '.scss'],
    root: helpers.root('src'),
    modulesDirectories: ['node_modules', 'src'],
    alias: {
      // legacy imports pre-rc releases
      'angular2': helpers.root('node_modules/@angularclass/angular2-beta-to-rc-alias/dist/beta-17')
    }
  },

  module: {
    preLoaders: [
      /*
       * Tslint loader support for *.ts files
       *
       * See: https://github.com/wbuchwalter/tslint-loader
       */
      // { test: /\.ts$/, loader: 'tslint-loader', exclude: [ helpers.root('node_modules') ] },

      {
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          helpers.root('node_modules/rxjs'),
          helpers.root('node_modules/@angular'),
          helpers.root('node_modules/@ngrx')
        ]
      }
    ],
    loaders: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript',
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
      }
    ]
  },

  plugins: [
    new ForkCheckerPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html',
      chunksSortMode: 'dependency'
    })
  ],
  node: {
    global: 'window',
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  },
  postcss: [
    autoprefixer({ browsers: ['last 3 versions'] })
  ],
  sassLoader: {
    outputStyle: 'compressed',
    precision: 10,
    sourceComments: false
  }
}