const Koa = require('koa')
const json = require('koa-json')
const di = require('./di')
const app = new Koa()
const router = require('./interfaces/http/routes')

module.exports = async function ({ libraryFile, port }) {
  await di.resolve('trackRepository').loadFromFile(libraryFile)

  app.use(json({ pretty: false, param: 'pretty' }))
  app.use(router.routes())
  app.use(router.allowedMethods())

  app.listen(port, () => console.log(`Server listen on port ${port}`))
}
