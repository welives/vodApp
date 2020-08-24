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
  // 更新作品
  router.post('/video/:id', controller.video.update)
  // 指定分类下的作品列表
  router.get('/category/:category_id/video/:page', controller.video.list)
  // 添加视频
  router.post('/video_detail', controller.videoDetail.save)
  // 删除视频
  router.post('/video_detail/destroy', controller.videoDetail.destroy)
  // 更新视频
  router.post('/video_detail/:id', controller.videoDetail.update)

  // 上传文件
  router.post('/upload', controller.file.upload)
}
