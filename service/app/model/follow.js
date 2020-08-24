'use strict'

module.exports = (app) => {
  const { INTEGER, DATE } = app.Sequelize
  const Follow = app.model.define('follow', {
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
    follow_id: {
      type: INTEGER(10).UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: '关注的用户id',
      references: {
        model: 'user',
        key: 'id',
      },
      onUpdate: 'restrict', // 更新时操作
      onDelete: 'cascade',
    },
    created_at: DATE,
    updated_at: DATE,
  })

  // 关联关系
  Follow.associate = function (models) {
    // 关联关注目标
    Follow.belongsTo(app.model.User, {
      as: 'user_follow',
      foreignKey: 'follow_id',
    })
    // 关联粉丝
    Follow.belongsTo(app.model.User, {
      as: 'user_fans',
      foreignKey: 'user_id',
    })
  }

  return Follow
}
