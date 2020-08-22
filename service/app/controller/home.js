'use strict'

const Controller = require('egg').Controller

class HomeController extends Controller {
  async index() {
    const { ctx } = this
    const res = { code: 0, msg: 'ok', data: [{ id: 1, username: 'jandan' }] }
    ctx.apiSuccess(res)
  }
}

module.exports = HomeController
