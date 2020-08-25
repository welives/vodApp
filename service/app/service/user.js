'use strict'

const Service = require('egg').Service

class UserService extends Service {
  /**
   * @description 检查用户是否存在
   * @param {Number} user_id 用户id
   * @return {Boolean} 返回结果
   * @memberof UserService
   */
  async exist(user_id) {
    return !!(await this.app.model.User.findOne({ where: { id: user_id } }))
  }

  /**
   * @description 获取指定用户的关注数
   * @param {Number} user_id 用户id
   * @return {Number} 返回结果
   * @memberof UserService
   */
  async getFollowCount(user_id) {
    return await this.app.model.Follow.count({ where: { user_id } })
  }

  /**
   * @description 获取指定用户的粉丝数
   * @param {Number} user_id 用户id
   * @return {Number} 返回结果
   * @memberof UserService
   */
  async getFansCount(user_id) {
    return await this.app.model.Follow.count({ where: { follow_id: user_id } })
  }

  /**
   * @description 获取指定用户的作品数
   * @param {Number} user_id 用户id
   * @return {Number} 返回结果
   * @memberof UserService
   */
  async getVideoCount(user_id) {
    return await this.app.model.Video.count({ where: { user_id } })
  }

  /**
   * @description 当前用户是否关注某用户
   * @param {Number} user_id 当前用户
   * @param {Number} follow_id 关注的用户
   * @return {boolean} 返回结果
   * @memberof UserService
   */
  async isFollow(user_id, follow_id) {
    return !!(await this.app.model.Follow.findOne({ where: { user_id, follow_id } }))
  }

  /**
   * @description 获取用户相关信息
   * @param {Number} user_id 用户id
   * @return {Object} 返回结果
   * @memberof UserService
   */
  async getUserInfo(user_id) {
    return await this.app.model.User.findOne({ where: { id: user_id }, attributes: { exclude: ['password'] } })
  }
}

module.exports = UserService
