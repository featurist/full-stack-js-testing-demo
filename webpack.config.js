/* eslint filenames/match-exported: 0 */

const webpack = require('webpack')
const ManifestPlugin = require('webpack-manifest-plugin')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const path = require('path')

const mode = process.env.NODE_ENV === 'production'
  ? 'production'
  : 'development'

const plugins = [
  new ManifestPlugin(),
  new webpack.EnvironmentPlugin({
    NODE_ENV: mode,
    DEBUG: false
  }),
]

const filename = mode === 'production'
  ? '[name].[contenthash].bundle.js'
  : '[name].bundle.js'

const devtool = mode === 'production'
  ? 'source-map'
  : 'eval-source-map'

const entry = {
  app: './browser/index.js',
  liveReload: './browser/liveReload.js'
}

const webpackConfig = {
  mode,
  devtool,
  entry,
  output: {
    filename,
    path: path.resolve(__dirname, 'browser', 'dist')
  },
  plugins,
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader'
      },
    ]
  }
}

if (mode === 'production') {
  webpackConfig.optimization = {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      })
    ]
  }
}

module.exports = webpackConfig
