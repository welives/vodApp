module.exports = {
  /**
   * @description 请求成功的返回
   * @param {object} [response={}] 返回信息
   * @param {number} [code=200] http状态码
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
   * @param {object} [response={}] 返回信息
   * @param {number} [code=400] http状态码
   */
  apiFail(response = {}, code = 400) {
    // this.body = response
    // this.status = code
    this.throw(code, response)
  },
}
