const NOTFOUND = 404

module.exports = (option, app) => {
  // 自定义异常处理
  return async function errorHandler(ctx, next) {
    try {
      // 中间件入栈
      await next()
      // 接口的404处理,当一个接口走完之后如果没有任何返回时,则默认会被当成404错误
      if (ctx.status === NOTFOUND && !ctx.body) {
        ctx.body = { code: NOTFOUND, msg: 'Not Found' }
      }
    } catch (err) {
      // 记录错误日志
      app.emit('error', err, ctx)
      // http状态码
      const status = err.status || 500
      // 返回错误码
      const code = err.code || err.statusCode || err.status
      // 生产环境时 500 错误的详细错误信息不返回给客户端, 因为可能包含敏感信息
      let error = status === 500 && app.config.env === 'prod' ? 'Internal Server Error' : err.message

      // 参数验证异常
      if (status === 422 && err.message === 'Validation Failed') {
        if (err.errors && Array.isArray(err.errors)) {
          error = err.errors[0].err[0] ? err.errors[0].err[0] : err.errors[0].err[1]
        }
      }
      // 返回错误消息
      const msg = err.msg || error || 'fail'
      ctx.body = { code, msg, data: null }
      ctx.status = status
    }
  }
}
