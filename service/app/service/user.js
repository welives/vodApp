'use strict'

const Service = require('egg').Service

class UserService extends Service {
  /**
   * @description 检查用户是否存在
   * @param {Number} user_id 用户id
   * @return {Object} 返回结果
   * @memberof UserService
   */
  async exist(user_id) {
    const { app } = this
    return await app.model.User.findOne({ where: { id: user_id } })
  }
}

module.exports = UserService
