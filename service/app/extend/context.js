module.exports = {
  /**
   * @description 请求成功的返回
   * @param {Object} [response={}] 返回信息
   * @param {Number} [code=200] http状态码
   */
  apiSuccess(response = {}, code = 200) {
    response.code = response.code || 0
    response.msg = response.msg || 'ok'
    response.data = response.data || null

    this.body = response
    this.status = code
  },

  /**
   * @description 请求失败的返回
   * @param {Object} [response={}] 返回信息
   * @param {Number} [code=400] http状态码
   */
  apiFail(response = {}, code = 400) {
    response.msg = response.msg || 'fail'
    response.data = response.data || null

    this.body = response
    this.status = code
  },

  /**
   * @description 请求失败并抛出错误
   * @param {Object} [response={}] 返回信息
   * @param {Number} [code=400] http状态码
   */
  apiError(response = {}, code = 400) {
    this.throw(code, response)
  },

  /**
   * @description 生成token
   * @param {Object} value 需要加密的数据
   * @return {String} 返回token
   */
  getToken(value) {
    return this.app.jwt.sign(value, this.app.config.jwt.secret)
  },

  /**
   * @description 验证token
   * @param {String} token 需要验证的token
   * @return {Object} 返回用户信息
   */
  checkToken(token) {
    return this.app.jwt.verify(token, this.app.config.jwt.secret)
  },
}
