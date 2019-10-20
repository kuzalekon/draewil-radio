
async function handleError(ctx, next) {
  try {
    await next()
  } catch (error) {
    ctx.status = error.status || 500
    ctx.body = { error: error.message }
  }
}

module.exports = handleError
