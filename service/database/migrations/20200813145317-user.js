'use strict'

module.exports = {
  // 在执行数据库升级时调用的函数，创建 user 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE, ENUM, TEXT } = Sequelize
    await queryInterface.createTable(
      'user',
      {
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
      },
      {
        // engine: 'MYISAM', // default: 'InnoDB'
        // charset: 'utf8mb4', // default: null
        // schema: 'public', // default: public, PostgreSQL only.
        comment: '用户表', // comment for table
        // collate: 'utf8mb4_unicode_ci', // collation, MYSQL only
      },
    )
  },

  // 在执行数据库降级时调用的函数，删除 user 表
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user')
  },
}
