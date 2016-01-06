const path = require('path')
const webpack = require('webpack')

const config = require('../config')

const rootPath = path.join(__dirname, '..')

const webpackConfig = {
  devtool: 'source-map',
  entry: [
    path.join(rootPath, '/common/app.js')
  ],
  output: {
    path: path.join(rootPath, '/dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  progress: true,
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      '__API_SERVER__': `${config.API_HOST}:${config.API_PORT}`
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: [ 'babel' ],
      exclude: /node_modules/,
      include: rootPath
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.scss$/,
      loader: 'style-loader!css-loader!sass-loader'
      // loaders: ['style', 'css', 'sass']
    }]
  }
}

module.exports = webpackConfig