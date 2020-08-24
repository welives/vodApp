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

  router.post('/category', controller.category.index)
}
