'use strict'

module.exports = (app) => {
  const { INTEGER, STRING, DATE } = app.Sequelize
  const VideoPlay = app.model.define('video_play', {
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
  })

  return VideoPlay
}
