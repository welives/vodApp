module.exports = (option, app) => {
  return async function getUser(ctx, next) {
    // 1. 获取 header 头中的token
    const token = ctx.header.token || ctx.query.token
    if (token) {
      // 2. 根据token解密，换取用户信息
      let user = {}
      try {
        user = ctx.checkToken(token)
      } catch (err) {
        console.log(err)
      }
      // 3. 判断当前用户是否登录
      if (user && user.id) {
        const t = await ctx.service.cache.get('user_' + user.id)
        if (t && t === token) {
          user = await app.model.User.findByPk(user.id)
          delete user.password
          ctx.authUser = user
        }
      }
    }
    await next()
  }
}
