'use strict'

module.exports = (app) => {
  const { INTEGER, DATE, TEXT } = app.Sequelize
  const Comment = app.model.define('comment', {
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
  })

  // 关联关系
  Comment.associate = function (models) {
    // 关联作者
    Comment.belongsTo(app.model.User, {
      foreignKey: 'user_id',
      as: 'send_user',
    })
    // 关联被回复人
    Comment.belongsTo(app.model.User, {
      foreignKey: 'reply_user_id',
      as: 'reply_user',
    })
    // 关联作品
    Comment.belongsTo(app.model.Video)

    // 关联回复
    Comment.hasMany(app.model.Comment, {
      foreignKey: 'reply_id',
    })
  }

  return Comment
}
