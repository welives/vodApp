'use strict'

const Controller = require('egg').Controller

const rules = {
  title: { type: 'string', required: true, desc: '视频标题' },
  url: { type: 'string', required: true, desc: '视频链接' },
  video_id: { type: 'int', required: true, desc: '所属作品id' },
  desc: { type: 'string', required: false, desc: '简介' },
}

class VideoDetailController extends Controller {
  /**
   * @description 添加视频
   * @return {JSON} 返回结果
   * @memberof VideoDetailController
   */
  async save() {
    const { ctx, app } = this
    const user_id = ctx.authUser.id
    ctx.validate(rules)
    const { title, url, video_id, desc } = ctx.request.body
    const video = await app.model.Video.findOne({ where: { id: video_id, user_id } })
    !video && ctx.apiError({ msg: '所属作品不存在' })
    const res = await app.model.VideoDetail.create({ title, url, video_id, desc })
    return ctx.apiSuccess({ data: res })
  }

  /**
   * @description 更新视频
   * @return {JSON} 返回结果
   * @memberof VideoDetailController
   */
  async update() {
    const { ctx, app } = this
    const user_id = ctx.authUser.id
    ctx.validate({
      id: { type: 'int', required: true, desc: '视频id' },
      ...rules,
    })
    const { title, url, video_id, desc } = ctx.request.body
    // 检查所属作品是否存在
    const video = await app.model.Video.findOne({ where: { id: video_id, user_id } })
    !video && ctx.apiError({ msg: '所属作品不存在' })
    const detail = await app.model.VideoDetail.findOne({ where: { id: ctx.params.id, video_id } })
    !detail && ctx.apiError({ msg: '该记录不存在' })
    const res = await detail.update({ title, url, video_id, desc })

    return ctx.apiSuccess({ data: res })
  }

  /**
   * @description 删除视频
   * @return {JSON} 返回结果
   * @memberof VideoDetailController
   */
  async destroy() {
    const { ctx, app } = this
    const user_id = ctx.authUser.id
    ctx.validate({
      id: { type: 'int', required: true, desc: '视频id' },
    })
    const { id } = ctx.request.body
    const video = await app.model.VideoDetail.findOne({
      where: { id },
      // 关联查询
      include: [
        {
          model: app.model.Video,
          where: { user_id },
        },
      ],
    })
    !video && ctx.apiError({ msg: '该记录不存在' })
    await video.destroy()

    return ctx.apiSuccess()
  }
}

module.exports = VideoDetailController
