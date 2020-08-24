'use strict'

const Controller = require('egg').Controller

class CategoryController extends Controller {
  /**
   * @description 获取分类列表
   * @return {JSON} 返回结果
   * @memberof CategoryController
   */
  async index() {
    const { ctx, app } = this
    const cates = await app.model.Category.findAll()

    return ctx.apiSuccess({ data: cates })
  }
}

module.exports = CategoryController
