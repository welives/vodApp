'use strict'

const Controller = require('egg').Controller

class CollectController extends Controller {
  /**
   * @description 收藏||取消收藏 视频
   * @return {JSON} 返回结果
   * @memberof CollectController
   */
  async video() {
    const { ctx, app } = this
    const user_id = ctx.authUser.id
    ctx.validate({
      video_id: {
        type: 'int',
        required: true,
        desc: '作品id',
      },
    })
    const { video_id } = ctx.request.body
    const collect = await app.model.Collect.findOne({ where: { user_id, video_id } })
    // 如果之前已经收藏过,则取消收藏
    if (collect) {
      collect.destroy()
      return ctx.apiSuccess({ msg: '取消收藏' })
    }
    const video = await app.model.Video.findOne({ where: { id: video_id } })
    !video && ctx.apiError({ msg: '视频不存在' })

    return (await app.model.Collect.create({ user_id, video_id })) && ctx.apiSuccess({ msg: '收藏成功' })
  }

  /**
   * @description 用户的收藏列表
   * @return {JSON} 返回结果
   * @memberof CollectController
   */
  async list() {
    const { ctx, app } = this
    const user_id = ctx.authUser.id
    ctx.validate({
      page: { type: 'int', required: true, desc: '页码' },
    })
    let res = await ctx.page(app.model.Collect, { user_id }, { include: [{ model: app.model.Video }] })
    res = res.map((item) => {
      return {
        id: item.video.id,
        title: item.video.title,
        cover: item.video.cover,
        category_id: item.video.category_id,
        user_id: item.video.user_id,
        duration: item.video.duration,
        desc: item.video.desc,
        play_count: item.video.play_count,
        danmu_count: item.video.danmu_count,
        created_at: item.video.created_at,
      }
    })

    return ctx.apiSuccess({ data: res })
  }
}

module.exports = CollectController
