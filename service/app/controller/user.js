'use strict'

const crypto = require('crypto')
const Controller = require('egg').Controller

class UserController extends Controller {
  /**
   * @description 用户注册
   * @return {JSON} 返回结果
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
    // 验证通过后拿到用户提交的数据以便后续操作
    const { username, password } = ctx.request.body
    // 用户是否存在
    ;(await app.model.User.findOne({ where: { username } })) && ctx.apiError({ code: 10000, msg: '用户名已存在' })
    // 新建用户
    const user = await app.model.User.create({ username, password })
    !user && ctx.apiError({ code: 10000, msg: '注册失败' })

    // 注册成功返回用户信息
    return ctx.apiSuccess({ data: user })
  }

  /**
   * @description 用户登入
   * @return {JSON} 返回结果
   * @memberof UserController
   */
  async login() {
    const { app, ctx } = this
    // 参数验证
    ctx.validate({
      username: {
        required: true,
        type: 'string',
        desc: '用户名',
      },
      password: {
        required: true,
        type: 'string',
        desc: '密码',
      },
    })
    const { username, password } = ctx.request.body
    // 验证用户是否存在
    let user = await app.model.User.findOne({
      where: { username },
    })
    !user && ctx.apiError({ code: 10000, msg: '用户不存在' })
    // 验证密码
    await this.checkPassword(password, user.password)
    // 因为不知道查出来的 user 是什么样的数据结构,所以要先转为json字符串后再解析成json对象
    user = JSON.parse(JSON.stringify(user))
    delete user.password
    // 生成token
    const token = ctx.getToken(user)
    user.token = token
    // 将token存入redis
    !(await this.service.cache.set('user_' + user.id, token)) && ctx.apiError({ code: 10000, msg: '登入失败' })

    // 登入成功返回用户信息
    return ctx.apiSuccess({ data: user })
  }

  /**
   * @description 用户退出
   * @return {JSON} 返回结果
   * @memberof UserController
   */
  async logout() {
    const { ctx, service } = this
    // 拿到当前用户id
    const user_id = ctx.authUser.id
    // 移除redis 中的当前用户信息
    !(await service.cache.remove('user_' + user_id)) && ctx.apiError({ code: 10000, msg: '退出失败' })

    return ctx.apiSuccess({ msg: '退出成功' })
  }

  /**
   * @description 校验密码
   * @param {String} password 待验证密码
   * @param {String} hash_pass 数据库中的密码
   * @return {Boolean} 返回结果
   * @memberof UserController
   */
  async checkPassword(password, hash_pass) {
    // 先对需要验证的密码进行加密
    const hmac = crypto.createHash('sha256', this.app.config.crypto.secret)
    hmac.update(password)
    password = hmac.digest('hex')
    // 然后和数据库中保存的密码进行比对
    !(password === hash_pass) && this.ctx.apiError({ code: 400, msg: '密码错误' })
    // 验证通过
    return true
  }
}

module.exports = UserController
