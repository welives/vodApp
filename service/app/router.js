'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app
  router.get('/', controller.home.index)

  router.post('/reg', controller.user.reg)
  router.post('/login', controller.user.login)
  router.post('/logout', controller.user.logout)

  // 分类列表
  router.get('/category', controller.category.index)

  // 指定用户的作品列表
  router.get('/video_list/:page', controller.video.index)
  // 添加作品
  router.post('/video', controller.video.save)
  // 删除作品
  router.get('/video/destroy/:id', controller.video.destroy)
  // 更新作品
  router.post('/video/:id', controller.video.update)
  // 查看作品详情
  router.get('/video_read/:id', controller.video.read)
  // 指定分类下的作品列表
  router.get('/category/:category_id/video/:page', controller.video.list)
  // 指定作品的评论
  router.get('/video_comment/:id', controller.video.comment)
  // 添加视频
  router.post('/video_detail', controller.videoDetail.save)
  // 删除视频
  router.get('/video_detail/destroy/:id', controller.videoDetail.destroy)
  // 更新视频
  router.post('/video_detail/:id', controller.videoDetail.update)
  // 指定作品下的所有视频
  router.get('/video_detail/:video_id', controller.videoDetail.index)
  // 收藏/取消收藏 视频
  router.post('/collect/video', controller.collect.video)
  // 用户的收藏列表
  router.get('/collect/list/:page', controller.collect.list)

  // 评论
  router.post('/comment', controller.comment.save)
  // 关注||取消关注 用户
  router.post('/user/follow', controller.user.follow)
  // 关注列表
  router.get('/user/follows/:page', controller.user.followList)
  // 粉丝列表
  router.get('/user/fans/:page', controller.user.fansList)

  // 上传文件
  router.post('/upload', controller.file.upload)

  // 统计用户相关数据
  router.get('/user/statistics', controller.user.statistics)
  // 获取用户相关信息
  router.get('/user/info', controller.user.userInfo)
}
