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
      comment: '视频标题',
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
      comment: '视频简介',
    },
    created_at: DATE,
    updated_at: DATE,
  })

  // 关联关系
  VideoDetail.associate = function (models) {
    // 关联作品
    VideoDetail.belongsTo(app.model.Video)
  }

  return VideoDetail
}
