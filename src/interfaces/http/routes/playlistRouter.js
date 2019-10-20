const KoaRouter = require('koa-router')
const router = new KoaRouter()
const { playlistController } = require('../controllers')

router.get('/playlist', playlistController.generate)

module.exports = router
