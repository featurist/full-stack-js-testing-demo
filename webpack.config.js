/* eslint filenames/match-exported: 0 */

const webpack = require('webpack')
const ManifestPlugin = require('webpack-manifest-plugin')
const path = require('path')

const plugins = [
  new ManifestPlugin(),
  new webpack.EnvironmentPlugin({
    DEBUG: false
  }),
]

const entry = {
  app: './browser/index.jsx',
  liveReload: './browser/liveReload.js'
}

const webpackConfig = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry,
  output: {
    filename: '[name].bundle.js',
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

module.exports = webpackConfig
