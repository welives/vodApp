'use strict'

/** @type Egg.EggPlugin */
module.exports = {
  // 跨域插件
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  // Sequelize插件
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  // 参数验证插件
  valparams: {
    enable: true,
    package: 'egg-valparams',
  },
}
