'use strict'

const Controller = require('egg').Controller
const fs = require('fs')
const path = require('path')
const md5 = require('md5')
// 异步二进制写入流
const awaitWriteStream = require('await-stream-ready').write
// 管道读入一个虫洞
const sendToWormhole = require('stream-wormhole')
const dayjs = require('dayjs')

// 创建文件夹
function mkdirSync(dirname) {
  if (fs.existsSync(dirname)) {
    return true
  } else {
    if (mkdirSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname)
      return true
    }
  }
}

class FileController extends Controller {
  /**
   * @description 上传文件
   * @return {JSON} 返回结果
   * @memberof FileController
   */
  async upload() {
    const { ctx, app } = this
    // 获取文件流
    const stream = await ctx.getFileStream()
    // 检查文件后缀名是否合法
    const i = app.config.multipart.fileExtensions.findIndex(
      (v) => v === path.extname(stream.filename).toLocaleLowerCase(),
    )
    // 如果不是合法后缀名,则关闭管道并终止执行
    if (i === -1) {
      await sendToWormhole(stream)
      ctx.apiError({ msg: '不支持的文件类型' })
    }
    // 基础目录
    const uploadBasePath = 'app/public/uploads'
    // 生成文件名
    const filename =
      md5(`${Date.now()}${Number.parseInt(Math.random() * 1000)}`) + path.extname(stream.filename).toLocaleLowerCase()
    // 生成文件夹
    const dirname = dayjs().format('YYYY/MM/DD')
    mkdirSync(path.join(uploadBasePath, dirname))
    // 生成写入路径
    const target = path.join(uploadBasePath, dirname, filename)
    // 写入流
    const writeStream = fs.createWriteStream(target)
    try {
      // 异步写入文件流
      await awaitWriteStream(stream.pipe(writeStream))
    } catch (err) {
      // 如果出现错误,关闭管道
      await sendToWormhole(stream)
      // ctx.throw(500, err)
      ctx.apiError({ msg: err }, 500)
    }
    // 拿到协议和主域名
    const { protocol, host } = ctx.request
    let url = path.join('/public/uploads', dirname, filename).replace(/\\|\//g, '/')
    url = protocol + '://' + host + url

    return ctx.apiSuccess({ data: { url } })
  }
}

module.exports = FileController
