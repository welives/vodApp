'use strict'

const Controller = require('egg').Controller

const rules = {
  title: { type: 'string', required: true, desc: '视频标题' },
  cover: { type: 'string', required: true, desc: '封面' },
  category_id: { type: 'int', required: true, desc: '分类' },
  desc: { type: 'string', required: true, desc: '视频简介' },
}
class VideoController extends Controller {
  /**
   * @description 添加作品
   * @return {JSON} 返回结果
   * @memberof VideoController
   */
  async save() {
    const { ctx, app } = this
    const user_id = ctx.authUser.id
    ctx.validate(rules)
    const { title, cover, category_id, desc } = ctx.request.body
    const video = await app.model.Video.create({ title, cover, category_id, desc, user_id })

    return ctx.apiSuccess(video)
  }

  /**
   * @description 指定用户的作品列表
   * @return {JSON} 返回结果
   * @memberof VideoController
   */
  async index() {
    const { ctx, app } = this
    ctx.validate({
      user_id: { type: 'int', required: true, desc: '用户id' },
      page: { type: 'int', required: true, desc: '页码' },
      limit: { type: 'int', required: false, desc: '每页显示条数' },
    })
    const user_id = ctx.query.user_id
    const res = await ctx.page(app.model.Video, { user_id })

    return ctx.apiSuccess({ data: res })
  }

  /**
   * @description 更新作品
   * @return {JSON} 返回结果
   * @memberof VideoController
   */
  async update() {
    const { ctx, app } = this
    const user_id = ctx.authUser.id
    ctx.validate({
      id: { type: 'int', required: true, desc: '作品id' },
      ...rules,
    })
    const { title, cover, category_id, desc } = ctx.request.body
    const video = await app.model.Video.findOne({
      where: {
        id: ctx.params.id,
        user_id,
      },
    })
    !video && ctx.apiError({ msg: '该记录不存在' })
    const res = await video.update({ title, cover, category_id, desc })

    return ctx.apiSuccess({ data: res })
  }

  /**
   * @description 指定分类下的作品列表
   * @return {JSON} 返回结果
   * @memberof VideoController
   */
  async list() {
    const { ctx, app } = this
    ctx.validate({
      page: { type: 'int', required: true, desc: '页码' },
      category_id: { type: 'int', required: true, desc: '分类id' },
    })
    const res = await ctx.page(app.model.Video, { category_id: ctx.params.category_id })

    return ctx.apiSuccess({ data: res })
  }

  /**
   * @description 指定作品的评论列表
   * @return {JSON} 返回结果
   * @memberof VideoController
   */
  async comment() {
    const { ctx, app } = this
    ctx.validate({
      id: { type: 'int', required: true, desc: '作品id' },
    })
    const id = ctx.params.id
    const res = await app.model.Comment.findAll({
      where: {
        video_id: id,
        reply_id: 0,
      },
      include: [
        // 关联回复
        {
          model: app.model.Comment,
          include: [
            // 回复发布人
            {
              model: app.model.User,
              as: 'send_user',
              attributes: ['id', 'username', 'nickname', 'avatar'],
            },
            // 回复目标人
            {
              model: app.model.User,
              as: 'reply_user',
              attributes: ['id', 'username', 'nickname', 'avatar'],
            },
          ],
        },
        // 一级评论发布人
        {
          model: app.model.User,
          as: 'send_user',
          attributes: ['id', 'username', 'nickname', 'avatar'],
        },
        // 回复目标人
        {
          model: app.model.User,
          as: 'reply_user',
          attributes: ['id', 'username', 'nickname', 'avatar'],
        },
      ],
    })

    return ctx.apiSuccess({ data: res })
  }
}

module.exports = VideoController
