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

  // add your middleware config here
  config.middleware = ['errorHandler']

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

  // 跨域配置
  config.cors = {
    origin: '*',
    allowMethods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH'],
  }

  // 数据库配置
  config.sequelize = {
    dialect: 'mysql',
    host: '192.168.131.101',
    username: 'vodApp',
    password: 'GEDiL7LWNNBhnrWf',
    port: 3306,
    database: 'vodApp',
    timezone: '+08:00',
    define: {
      // 取消数据表名复数
      freezeTableName: true,
      // 自动写入时间戳 created_at updated_at
      timestamps: true,
      // 字段生成软删除时间戳 deleted_at
      // paranoid: true,
      createdAt: 'created_time',
      updatedAt: 'updated_time',
      // deletedAt: 'deleted_time',
      // 所有驼峰命名格式化
      underscored: true,
    },
  }

  // 参数验证配置
  config.valparams = {
    locale: 'zh-cn',
    throwError: true,
  }
  // 加密包配置
  config.crypto = {
    secret: '6pe2t$Po@T*_U@Whm%zsSdFhAqvhP6kA',
  }

  return {
    ...config,
    ...userConfig,
  }
}
