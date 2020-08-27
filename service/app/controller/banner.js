'use strict'

const Controller = require('egg').Controller

class BannerController extends Controller {
  // 添加广告
  async save() {
    const { ctx, app } = this
    ctx.validate({
      title: { type: 'string', required: true, desc: '广告标题' },
      cover: { type: 'string', required: true, desc: '广告封面' },
      video_id: { type: 'int', required: true, desc: '作品id' },
    })
    const { title, cover, video_id } = ctx.request.body
    const res = await app.model.Banner.create({ title, cover, video_id })
    return ctx.apiSuccess({ data: res })
  }

  // 广告列表
  async list() {
    const { ctx, app } = this
    const res = await app.model.Banner.findAll({ limit: 5 })
    return ctx.apiSuccess({ data: res })
  }
}

module.exports = BannerController
