'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, TEXT } = Sequelize
    await queryInterface.createTable(
      'comment',
      {
        id: {
          type: INTEGER(10).UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        content: {
          type: TEXT,
          allowNull: false,
          defaultValue: '',
          comment: '评论内容',
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
          onDelete: 'cascade',
        },
        video_id: {
          type: INTEGER(10).UNSIGNED,
          allowNull: false,
          defaultValue: 0,
          comment: '作品id',
          references: {
            model: 'video',
            key: 'id',
          },
          onUpdate: 'restrict', // 更新时操作
          onDelete: 'cascade',
        },
        reply_id: {
          type: INTEGER(10).UNSIGNED,
          allowNull: false,
          defaultValue: 0,
          comment: '回复id',
        },
        reply_user_id: {
          type: INTEGER(10).UNSIGNED,
          allowNull: false,
          defaultValue: 0,
          comment: '回复用户id',
        },
        created_at: DATE,
        updated_at: DATE,
      },
      {
        // engine: 'MYISAM', // default: 'InnoDB'
        // charset: 'utf8mb4', // default: null
        // schema: 'public', // default: public, PostgreSQL only.
        comment: '用户评论表', // comment for table
        // collate: 'utf8mb4_unicode_ci', // collation, MYSQL only
      },
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('comment')
  },
}
