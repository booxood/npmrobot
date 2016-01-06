var configLoader = require('require-by-env')
var config = configLoader({
  base: __dirname,
  filename: 'config.NODE_ENV'
})

module.exports = config
