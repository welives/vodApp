'use strict'

module.exports = (app) => {
  const { INTEGER, DATE } = app.Sequelize
  const Collect = app.model.define('collect', {
    id: {
      type: INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
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
    created_at: DATE,
    updated_at: DATE,
  })

  // 关联关系
  Collect.associate = function (models) {
    // 关联作者
    Collect.belongsTo(app.model.User)
    // 关联作品
    Collect.belongsTo(app.model.Video)
  }

  return Collect
}
