var configLoader = require('require-by-env')
var config = configLoader({
  base: __dirname,
  filename: 'config.ENV'
})

module.exports = config
