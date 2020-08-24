'use strict'

module.exports = (app) => {
  const { INTEGER, STRING, DATE, TEXT } = app.Sequelize
  const VideoDetail = app.model.define('video_detail', {
    id: {
      type: INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: STRING(100),
      allowNull: false,
      defaultValue: '',
      comment: '子标题',
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
    url: {
      type: STRING,
      allowNull: false,
      defaultValue: '',
      comment: '视频链接',
    },
    desc: {
      type: TEXT,
      allowNull: false,
      defaultValue: '',
      comment: '子描述',
    },
    created_at: DATE,
    updated_at: DATE,
  })

  // 关联关系
  VideoDetail.associate = function (models) {
    // 关联视频
    VideoDetail.belongsTo(app.model.Video)
  }

  return VideoDetail
}
