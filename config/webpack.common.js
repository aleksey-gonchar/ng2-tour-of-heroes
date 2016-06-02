const webpack = require('webpack')
const helpers = require('./helpers')

var CopyWebpackPlugin = (CopyWebpackPlugin = require('copy-webpack-plugin'), CopyWebpackPlugin.default || CopyWebpackPlugin);
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
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
      },
      // {
      //   test: /\.scss/,
      //   loader: 'import-glob-loader'
      // }
    ],
    loaders: [
      /*
       * Typescript loader support for .ts and Angular 2 async routes via .async.ts
       *
       * See: https://github.com/s-panferov/awesome-typescript-loader
       */
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        exclude: [/\.(spec|e2e)\.ts$/]

      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: [helpers.root('src/index.html')]
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.scss/,
        loader: 'style!css?sourceMap!sass?sourceMap'
      },
      {
        test: /\.css/,
        loader: 'style!css?sourceMap!cssnext'
      },

      // {
      //   test: /\.css$/,
      //   exclude: helpers.root('src', 'app'),
      //   loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
      // },
      // {
      //   test: /\.css$/,
      //   include: helpers.root('src', 'app'),
      //   loader: 'raw'
      // }
    ],
    // noParse: [
    //   /zone\.js\/dist\/zone-microtask\.js/,
    //   /zone\.js\/dist\/long-stack-trace-zone\.js/,
    //   /zone\.js\/dist\/jasmine-patch\.js/,
    //   /es6-shim/,
    //   /reflect-metadata/,
    //   /web-animations/,
    //   /.+angular2\/bundles\/.+/
    // ]
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
  cssnext: {
    browsers: 'last 2 versions'
  }
}