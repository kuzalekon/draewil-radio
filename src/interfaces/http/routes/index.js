const KoaRouter = require('koa-router')
const router = new KoaRouter()
const { handleError } = require('../middlewares')
const playlistRouter = require('./playlistRouter')

router.use(handleError)
router.use(playlistRouter.routes())

module.exports = router
