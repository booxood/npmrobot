const path = require('path')
const webpack = require('webpack')

const config = require('../config')

const rootPath = path.join(__dirname, '..')

const webpackConfig = {
  devtool: 'inline-source-map',
  entry: [
    'webpack-hot-middleware/client',
    path.join(rootPath, '/common/app.js')
  ],
  output: {
    path: path.join(rootPath, '/dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      '__API_SERVER__': JSON.stringify(`${config.API_HOST}:${config.API_PORT}`)
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