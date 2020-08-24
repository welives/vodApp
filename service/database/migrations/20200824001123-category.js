'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE, TEXT } = Sequelize
    await queryInterface.createTable(
      'category',
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
          comment: '分类名称',
        },
        icon: {
          type: STRING,
          allowNull: false,
          defaultValue: '',
          comment: '分类图标',
        },
        desc: {
          type: TEXT,
          allowNull: false,
          defaultValue: '',
          comment: '分类描述',
        },
        created_at: DATE,
        updated_at: DATE,
      },
      {
        // engine: 'MYISAM', // default: 'InnoDB'
        // charset: 'utf8mb4', // default: null
        // schema: 'public', // default: public, PostgreSQL only.
        comment: '分类表', // comment for table
        // collate: 'utf8mb4_unicode_ci', // collation, MYSQL only
      },
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('category')
  },
}
