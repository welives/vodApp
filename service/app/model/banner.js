'use strict'

module.exports = (app) => {
  const { INTEGER, STRING, DATE } = app.Sequelize
  const Banner = app.model.define('banner', {
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
  })

  return Banner
}
