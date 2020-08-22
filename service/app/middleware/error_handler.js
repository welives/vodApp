module.exports = (option, app) => {
  // 自定义异常处理
  return async function errorHandler(ctx, next) {
    try {
      await next()
      // 404处理
      if (ctx.status === 404 && !ctx.body) {
        ctx.body = {
          msg: 'fail',
          data: '404错误',
        }
      }
    } catch (err) {
      console.log(err)
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
      // 从 error 对象上读出各个属性,设置到响应中
      // ctx.body = { code, msg: 'fail', data: error }

      // 返回错误消息
      const msg = err.msg || error || 'fail'
      ctx.body = { code, msg }
      ctx.status = status
    }
  }
}
