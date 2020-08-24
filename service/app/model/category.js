'use strict'

module.exports = (app) => {
  const { INTEGER, STRING, DATE, TEXT } = app.Sequelize
  const Category = app.model.define('category', {
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
  })

  return Category
}
