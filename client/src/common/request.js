import $store from '../store'

export default {
  // 全局配置
  common: {
    // #ifndef H5
    baseUrl: 'http://192.168.5.5:7001',
    // #endif
    // #ifdef H5
    baseUrl: '/api',
    // #endif
    header: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: {},
    method: 'GET',
    dataType: 'json',
    token: false,
  },
  // 请求 返回promise
  request(options = {}) {
    // 组织参数
    options.url = this.common.baseUrl + options.url
    options.header = options.header || this.common.header
    options.data = options.data || this.common.data
    options.method = options.method || this.common.method
    options.dataType = options.dataType || this.common.dataType
    options.token = options.token === true ? true : this.common.token

    // 请求
    return new Promise((res, rej) => {
      // 请求之前验证...
      // token验证
      if (options.token) {
        let token = $store.state.user.token
        // 往header头中添加token
        options.header.token = token

        // 二次验证
        if (!token && options.noJump !== true) {
          uni.showToast({ title: '请先登录', icon: 'none' })
          // token不存在时跳转
          uni.navigateTo({
            url: '/pages/login/login',
          })
          return rej('请先登录')
        }
      }

      // 请求中...
      uni.request({
        ...options,
        // 请求成功
        success: (result) => {
          // 返回原始数据
          if (options.native) {
            return res(result)
          }
          // 请求成功,但未通过服务端验证
          if (result.statusCode !== 200) {
            if (options.toast !== false) {
              uni.showToast({
                title: result.data.msg || '服务端失败',
                icon: 'none',
              })
            }
            // token不合法，直接退出登录
            if (result.data.msg === 'Token 令牌不合法!') {
              $store.dispatch('user/logout')
            }
            return rej(result.data)
          }
          // 其他验证...
          // 请求成功,通过服务端所有验证
          res(result.data.data)
        },
        // 请求失败,与服务端通信失败
        fail: (error) => {
          uni.showToast({ title: error.errMsg || '请求失败', icon: 'none' })
          return rej(error)
        },
      })
    })
  },
  // get请求
  get(url, options = {}) {
    options.url = url
    options.data = {}
    options.method = 'GET'
    return this.request(options)
  },
  // post请求
  post(url, data = {}, options = {}) {
    options.url = url
    options.data = data
    options.method = 'POST'
    return this.request(options)
  },
  // delete请求
  del(url, data = {}, options = {}) {
    options.url = url
    options.data = data
    options.method = 'DELETE'
    return this.request(options)
  },
  // 上传文件
  upload(url, data, onProgress = false) {
    return new Promise((result, reject) => {
      // 上传之前验证
      let token = uni.getStorageSync('token')
      if (!token) {
        uni.showToast({ title: '请先登录', icon: 'none' })
        // token不存在时跳转
        return uni.navigateTo({
          url: '/pages/login/login',
        })
      }

      const uploadTask = uni.uploadFile({
        url: this.common.baseUrl + url,
        filePath: data.filePath,
        name: data.name || 'files',
        header: { token },
        success: (res) => {
          if (res.statusCode !== 200) {
            result(false)
            return uni.showToast({
              title: '上传失败',
              icon: 'none',
            })
          }
          let message = JSON.parse(res.data)
          result(message.data)
        },
        fail: (err) => {
          console.log(err)
          reject(err)
        },
      })

      uploadTask.onProgressUpdate((res) => {
        if (typeof onProgress === 'function') {
          onProgress(res.progress)
        }
      })
    })
  },
}
