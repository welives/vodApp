'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE, TEXT } = Sequelize
    await queryInterface.createTable(
      'video',
      {
        id: {
          type: INTEGER(10).UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        title: {
          type: STRING(100),
          allowNull: false,
          defaultValue: '',
          comment: '视频标题',
        },
        cover: {
          type: STRING,
          allowNull: false,
          defaultValue: '',
          comment: '视频封面',
        },
        category_id: {
          type: INTEGER(10).UNSIGNED,
          allowNull: false,
          defaultValue: 0,
          comment: '分类id',
          // 外键关联
          references: {
            model: 'category', // 对应表名称
            key: 'id', // 对应表的主键
          },
          onUpdate: 'restrict', // 更新时操作
          onDelete: 'cascade', // 删除时操作
        },
        user_id: {
          type: INTEGER(10).UNSIGNED,
          allowNull: false,
          defaultValue: 0,
          comment: '用户id',
          references: {
            model: 'user',
            key: 'id',
          },
          onUpdate: 'restrict', // 更新时操作
          onDelete: 'cascade', // 删除时操作
        },
        duration: {
          type: INTEGER,
          allowNull: false,
          defaultValue: 0,
          comment: '总时长',
        },
        desc: {
          type: TEXT,
          allowNull: false,
          defaultValue: '',
          comment: '视频描述',
        },
        play_count: {
          type: INTEGER,
          allowNull: false,
          defaultValue: 0,
          comment: '播放量',
        },
        danmu_count: {
          type: INTEGER,
          allowNull: false,
          defaultValue: 0,
          comment: '弹幕量',
        },
        created_at: DATE,
        updated_at: DATE,
      },
      {
        // engine: 'MYISAM', // default: 'InnoDB'
        // charset: 'utf8mb4', // default: null
        // schema: 'public', // default: public, PostgreSQL only.
        comment: '视频作品表', // comment for table
        // collate: 'utf8mb4_unicode_ci', // collation, MYSQL only
      },
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('video')
  },
}
