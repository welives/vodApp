'use strict'

const Controller = require('egg').Controller

class CategoryController extends Controller {
  async index() {
    const { ctx, app } = this
    const cates = await app.model.Category.findAll()
    ctx.apiSuccess({ data: cates })
  }
}

module.exports = CategoryController
