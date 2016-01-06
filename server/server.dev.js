import path from 'path'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import Express from 'express'

import webpackConfig from '../webpack/config.dev'

const app = new Express()
const port = 4000
const compiler = webpack(webpackConfig)

const serverOptions = {
  // contentBase: 'http://' + host + ':' + port,
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  headers: {'Access-Control-Allow-Origin': '*'},
  stats: {colors: true}
}

app.use(require('webpack-dev-middleware')(compiler, serverOptions))
app.use(require('webpack-hot-middleware')(compiler))

app.use(function(req, res) {
  res.sendFile(path.join(__dirname, '../client/index.html'))
})

app.listen(port, function onAppListening(err) {
  if (err) {
    console.error(err)
  } else {
    console.info('==> Webpack development server listening on port %s', port)
  }
})
