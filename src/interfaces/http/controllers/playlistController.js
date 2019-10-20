const di = require('../../../di')
const service = di.resolve('playlistService')

async function generate(ctx) {
  const { query } = ctx
  const { length } = query

  const playlist = service.generate(length)

  ctx.status = 200
  ctx.set('X-Total-Count', String(playlist.length))
  ctx.body = playlist
}

module.exports = { generate }
