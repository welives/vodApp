'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE } = Sequelize
    return queryInterface.createTable(
      'video_play',
      {
        id: {
          type: INTEGER(10).UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        ip: {
          type: STRING(50),
          allowNull: false,
          defaultValue: 0,
          comment: 'ip地址',
        },
        video_id: {
          type: INTEGER(10).UNSIGNED,
          allowNull: false,
          defaultValue: 0,
          comment: '视频id',
          references: {
            model: 'video',
            key: 'id',
          },
          onUpdate: 'restrict', // 更新时操作
          onDelete: 'cascade',
        },
        created_at: DATE,
        updated_at: DATE,
      },
      {
        // engine: 'MYISAM', // default: 'InnoDB'
        // charset: 'utf8mb4', // default: null
        // schema: 'public', // default: public, PostgreSQL only.
        comment: '视频播放记录表', // comment for table
        // collate: 'utf8mb4_unicode_ci', // collation, MYSQL only
      },
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('video_play')
  },
}
