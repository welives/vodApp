'use strict'

const Controller = require('egg').Controller

class CommentController extends Controller {
  /**
   * @description 发表评论
   * @return {JSON} 返回结果
   * @memberof CommentController
   */
  async save() {
    const { ctx, app } = this
    const user_id = ctx.authUser.id
    ctx.validate({
      content: { type: 'string', required: true, desc: '评论内容' },
      video_id: { type: 'int', required: true, desc: '作品id' },
      reply_id: { type: 'int', required: true, desc: '回复id' },
      reply_user_id: { type: 'int', required: true, desc: '回复用户id' },
    })
    const { content, video_id, reply_id, reply_user_id } = ctx.request.body
    // reply_id === 0 时是单纯的对作品进行评论, > 0 时则表示对某条评论进行回复
    if (reply_id > 0) {
      if (reply_user_id === 0) ctx.apiError({ msg: '回复用户id参数错误' })
      // 判断被回复评论是否存在
      const c = app.model.Comment.findOne({ where: { id: reply_id } })
      !c && ctx.apiError({ msg: '被回复的评论不存在' })
    }
    const video = await app.model.Video.findOne({ where: { id: video_id } })
    !video && ctx.apiError({ msg: '作品不存在' })
    const res = await app.model.Comment.create({ content, video_id, reply_id, reply_user_id, user_id })

    return ctx.apiSuccess({ data: res })
  }
}

module.exports = CommentController
