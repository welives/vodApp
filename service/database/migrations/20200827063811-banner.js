'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE } = Sequelize
    await queryInterface.createTable(
      'banner',
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
          comment: '广告标题',
        },
        cover: {
          type: STRING,
          allowNull: false,
          defaultValue: '',
          comment: '广告图链接',
        },
        video_id: {
          type: INTEGER(10).UNSIGNED,
          allowNull: false,
          defaultValue: 0,
          comment: '所属作品id',
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
        comment: '广告表', // comment for table
        // collate: 'utf8mb4_unicode_ci', // collation, MYSQL only
      },
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('banner')
  },
}
