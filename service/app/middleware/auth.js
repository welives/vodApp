module.exports = (option, app) => {
  // 权限验证中间件
  return async (ctx, next) => {
    // 1. 获取 header 头中的token
    const { token } = ctx.header
    !token && ctx.apiError({ code: 10000, msg: '您没有权限访问该接口' })
    // 2. 根据token解密，换取用户信息
    let user = {}
    try {
      // 如果验证不通过,jwt抛出的错误会被下面捕获
      user = ctx.checkToken(token)
    } catch (err) {
      const fail = err.name === 'TokenExpiredError' ? 'token 已过期! 请重新获取令牌' : 'Token 令牌不合法!'
      ctx.apiError({ code: 10000, msg: fail })
    }
    // 3. 判断当前用户是否登录
    const t = await ctx.service.cache.get('user_' + user.id)
    ;(!t || t !== token) && ctx.apiError({ code: 10000, msg: 'Token 令牌不合法!' })
    // 4. 获取当前用户，验证当前用户是否存在
    user = await app.model.User.findByPk(user.id)
    !user && ctx.apiError({ code: 10000, msg: '用户不存在' })
    // 5. 把 user 信息挂载到全局ctx上
    delete user.password
    ctx.authUser = user
    await next()
  }
}
