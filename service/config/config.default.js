/* eslint valid-jsdoc: "off" */

'use strict'

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {})

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1597161537435_8722'

  // 配置全局中间件
  config.middleware = ['errorHandler', 'auth', 'getUser']

  // 配置auth中间件生效的路由
  config.auth = {
    match: [
      '/logout',
      '/video',
      '/video_detail',
      '/vod/sign',
      '/comment',
      '/collect',
      '/user/follow',
      '/user/follows',
      '/user/fans',
      '/user/statistics',
      '/upload',
    ],
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  }

  config.security = {
    // 关闭CSRF
    csrf: {
      enable: false,
    },
    // 跨域白名单
    domainWhiteList: [],
  }

  // 文件上传配置
  config.multipart = {
    fileSize: '50mb',
    mode: 'stream',
    fileExtensions: ['.xls', '.txt', '.jpg', '.png', '.gif', '.jpeg'],
  }

  // 跨域配置
  config.cors = {
    origin: '*',
    allowMethods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH'],
  }

  // 数据库配置
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    username: 'root',
    password: 'root',
    port: 3306,
    database: 'vodApp',
    // 中国时区
    timezone: '+08:00',
    define: {
      // 取消数据表名复数
      freezeTableName: true,
      // 自动写入时间戳 created_at updated_at
      timestamps: true,
      // 字段生成软删除时间戳 deleted_at
      // paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      // deletedAt: 'deleted_at',
      // 所有驼峰命名格式化
      underscored: true,
    },
  }

  // 参数验证配置
  config.valparams = {
    locale: 'zh-cn',
    throwError: true,
  }
  // 数据加密包配置
  config.crypto = {
    secret: '6pe2t$Po@T*_U@Whm%zsSdFhAqvhP6kA',
  }

  // JWT
  config.jwt = {
    expire: 3600 * 24 * 7,
    secret: '3HwZtE@6xGNLUpVHJGF#NZj*5teCwMpX',
  }

  // redis存储配置
  config.redis = {
    client: {
      port: 6379, // Redis port
      host: '127.0.0.1', // Redis host
      password: '',
      db: 0,
    },
  }

  return {
    ...config,
    ...userConfig,
  }
}
