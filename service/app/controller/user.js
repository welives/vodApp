'use strict'

const Controller = require('egg').Controller

class UserController extends Controller {
  /**
   * @description 注册
   * @memberof UserController
   */
  async reg() {
    const { app, ctx } = this
    // 参数验证
    ctx.validate(
      {
        username: {
          required: true,
          type: 'string',
          range: { min: 4, max: 20 },
          desc: '用户名',
        },
        password: {
          required: true,
          type: 'string',
          range: { min: 6, max: 32 },
          desc: '密码',
        },
        repassword: {
          required: true,
          type: 'string',
          range: { min: 6, max: 32 },
          desc: '确认密码',
        },
      },
      { equals: [['password', 'repassword']] },
    )
    const { username, password } = ctx.request.body
    // 用户是否存在
    if (
      await app.model.User.findOne({
        where: { username },
      })
    ) {
      ctx.apiFail({ msg: '用户名已存在' })
    }

    // 创建用户
    const user = await app.model.User.create({ username, password })
    if (!user) ctx.apiFail({ msg: '注册失败' })

    ctx.apiSuccess({ data: user })
  }
}

module.exports = UserController
