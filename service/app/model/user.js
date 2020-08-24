'use strict'
// 引入加密包
const crypto = require('crypto')

module.exports = (app) => {
  const { INTEGER, STRING, DATE, ENUM, TEXT } = app.Sequelize
  const User = app.model.define('user', {
    id: {
      type: INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: STRING(30),
      allowNull: false,
      defaultValue: '',
      comment: '用户名',
      unique: true,
    },
    nickname: {
      type: STRING(30),
      allowNull: false,
      defaultValue: '',
      comment: '昵称',
    },
    email: {
      type: STRING(160),
      allowNull: false,
      defaultValue: '',
      comment: '邮箱',
    },
    password: {
      type: STRING,
      allowNull: false,
      defaultValue: '',
      comment: '密码',
      // 修改器
      set(val) {
        const hmac = crypto.createHash('sha256', app.config.crypto.secret)
        hmac.update(val)
        // this.setDataValue('field') 设置原始值
        this.setDataValue('password', hmac.digest('hex'))
      },
    },
    avatar: {
      type: STRING,
      allowNull: false,
      defaultValue: '',
      comment: '头像',
    },
    phone: {
      type: STRING(11),
      allowNull: false,
      defaultValue: '',
      comment: '手机',
    },
    sex: {
      type: ENUM,
      values: ['男', '女', '保密'],
      allowNull: false,
      defaultValue: '男',
      comment: '性别',
    },
    desc: {
      type: TEXT,
      allowNull: false,
      defaultValue: '',
      comment: '个性签名',
    },
    created_at: DATE,
    updated_at: DATE,
  })

  return User
}
