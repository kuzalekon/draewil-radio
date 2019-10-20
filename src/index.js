(async function () {
  const config = require('config')
  const initApp = require('./app')

  await initApp({
    libraryFile: process.argv[2] || config.get('libraryFile'),
    port: process.env.PORT || config.get('port')
  })
}())
