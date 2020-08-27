'use strict'

module.exports = (app) => {
  const { INTEGER, STRING, DATE, TEXT } = app.Sequelize
  const Video = app.model.define('video', {
    id: {
      type: INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: STRING(100),
      allowNull: false,
      defaultValue: '',
      comment: '作品标题',
    },
    cover: {
      type: STRING,
      allowNull: false,
      defaultValue: '',
      comment: '作品封面',
    },
    category_id: {
      type: INTEGER(10).UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: '分类id',
      // 外键关联
      references: {
        model: 'category', // 对应表名称
        key: 'id', // 对应表的主键
      },
      onUpdate: 'restrict', // 更新时操作
      onDelete: 'cascade', // 删除时操作
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
      onDelete: 'cascade', // 删除时操作
    },
    duration: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '总时长',
    },
    desc: {
      type: TEXT,
      allowNull: false,
      defaultValue: '',
      comment: '作品简介',
    },
    play_count: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '播放量',
    },
    danmu_count: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '弹幕量',
    },
    created_at: {
      type: DATE,
      // 获取器
      get() {
        // this.getDataValue('field') 获取原始值
        return new Date(this.getDataValue('created_at')).getTime()
      },
    },
    updated_at: DATE,
  })

  // 关联关系
  Video.associate = function (models) {
    // 关联作者,一个作品对应一个作者,即一对一,反过来则是一对多
    Video.belongsTo(app.model.User)
    // 关联子视频,一个作品可以有若干个章节的视频,即一对多
    Video.hasMany(app.model.VideoDetail)
    // 关联分类
    Video.belongsTo(app.model.Category)
  }

  return Video
}
