<template>
  <view style="line-height: 0;">
    <!-- #ifndef APP-PLUS -->
    <video id="myVideo" :src="src" :poster="poster" style="height: 225px; width: 100%;" controls></video>
    <!-- #endif -->
    <scroll-view scroll-y :style="'height:' + scrollHeight + 'px;'">
      <!-- 选项卡 开始 -->
      <view
        class="border-bottom border-light-secondary bg-white flex align-stretch position-fixed"
        style="height: 80rpx; left: 0; right: 0; z-index: 100;"
      >
        <block v-for="(tab, index) in tabBars" :key="index">
          <view class="flex-1 flex align-center justify-center" @click="tabIndex = index">
            <text
              class="font py-1"
              :class="index === tabIndex ? 'text-main border-main' : ''"
              :style="index === tabIndex ? 'border-bottom: 5rpx solid' : ''"
              >{{ tab.name }}</text
            >
          </view>
        </block>
      </view>
      <view style="height: 80rpx;"></view>
      <!-- 选项卡 结束 -->

      <!-- 简介 开始 -->
      <view v-if="tabIndex === 0">
        <view class="px-3 py-2 flex align-center">
          <image
            :src="detail.user.avatar || '/static/demo/6.jpg'"
            class="rounded-circle mr-3"
            style="height: 80rpx; width: 80rpx;"
          ></image>
          <view class="flex flex-column">
            <text class="text-main font">{{ detail.user.nickname || detail.user.username }}</text>
            <text class="font-sm text-muted">{{ fansCount }} 粉丝</text>
          </view>
          <view
            v-if="user_id !== detail.user.id"
            class="rounded ml-auto px-2 py-1"
            :class="isFollow ? 'bg-light text-dark' : 'bg-main text-white'"
            @click="doFollow(detail.user.id)"
          >
            <text>{{ isFollow ? '取消关注' : '关注' }}</text>
          </view>
        </view>

        <view class="px-3 font-md">{{ detail.title }}</view>
        <view class="px-3 flex align-center justify-between text-muted">
          <view class="flex">
            <view class="flex align-center">
              <text class="iconfont iconbofangshu font-md mr-1"></text>
              <text class="font-sm">{{ detail.play_count }}</text>
            </view>
            <view class="mx-2 flex align-center">
              <text class="iconfont icondanmushu font-md mr-1"></text>
              <text class="font-sm">{{ detail.danmu_count }}</text>
            </view>
            <text class="flex align-center font-sm">{{ detail.created_at | formatTime }}</text>
          </view>
          <view class="flex align-center justify-center" style="width: 40px;" @click="doCollect(detail.id)">
            <text class="iconfont iconshoucang font-md" :class="isCollect ? 'text-main' : ''"></text>
          </view>
        </view>

        <view class="px-3 py-2 border-top border-bottom border-light-secondary">
          <view class="flex align-center justify-between">
            <text class="font">第 {{ activeIndex + 1 }} 集</text>
            <view class="text-light-muted font" @click="openPopup">
              共 {{ videos.length }} 集
              <text class="iconfont iconjinru ml-1"></text>
            </view>
          </view>
          <scroll-view scroll-x class="scroll-row mt-2">
            <view
              v-for="(item, index) in videos"
              :key="index"
              class="scroll-row-item rounded border mx-1 p-2"
              :class="activeIndex === index ? 'border-main text-main' : 'border-light-secondary text-light-muted'"
              style="width: 340rpx;"
              hover-class="bg-light"
              @click="changeVideo(item, index)"
            >
              <text>第 {{ index + 1 }} 集</text>
              <view class="font text-ellipsis">{{ item.title }}</view>
            </view>
          </scroll-view>
        </view>

        <!-- 热门视频 开始 -->
        <view class="px-2" v-for="(item, index) in hot" :key="index">
          <media-list :item="item" :index="index"></media-list>
        </view>
        <!-- 热门视频 结束 -->
      </view>
      <!-- 简介 结束 -->

      <!-- 评论 -->
      <view v-else class="px-3 py-1">
        <view class="uni-comment-list" v-for="(item, index) in comments" :key="index">
          <view class="uni-comment-face">
            <image
              :src="item.send_user.avatar || '/static/demo/6.jpg'"
              class="rounded-circle mr-3"
              style="height: 80rpx; width: 80rpx;"
            ></image>
          </view>
          <view class="uni-comment-body">
            <view class="uni-comment-top">
              <text class="font">{{ item.send_user.nickname || item.send_user.username }}</text>
            </view>
            <view class="uni-comment-date">
              <text class="font-sm text-muted">{{ item.created_at | formatTime }}</text>
            </view>
            <view class="uni-comment-content" @click="openComment(item.id, item.send_user)">{{ item.content }}</view>
            <!-- 回复 -->
            <view
              class="flex flex-wrap p-1 bg-light rounded"
              v-for="(reply, idx) in item.comments"
              :key="idx"
              @click="openComment(item.id, reply.send_user)"
            >
              <text class="font text-main">{{ reply.send_user.nickname || reply.send_user.username }}</text>
              <text class="font text-light-muted">@</text>
              <text class="font text-light-muted">{{ reply.reply_user.nickname || reply.reply_user.username }}</text>
              <text class="font text-dark">：</text>
              {{ reply.content }}
            </view>
          </view>
        </view>
        <view
          class="position-fixed flex align-center justify-center bg-main rounded-circle animate__animated"
          hover-class="bg-main-hover animate__pulse"
          style="width: 100rpx; height: 100rpx; right: 50rpx; bottom: 50rpx;"
          @click="openComment()"
        >
          <text class="text-white iconfont iconjia"></text>
        </view>
      </view>
    </scroll-view>

    <f-popup ref="popup">
      <view class="position-absolute bottom-0 left-0 right-0 bg-white" @click.stop="() => {}">
        <view style="height: 600rpx;">
          <view class="flex align-center justify-between">
            <text class="font-md ml-3">选集</text>
            <view
              class="flex align-center justify-center"
              hover-class="bg-light"
              style="width: 80rpx; height: 80rpx;"
              @click="hidePopup"
            >
              <text class="iconfont iconguanbi text-muted"></text>
            </view>
          </view>
          <scroll-view scroll-y style="height: 520rpx;">
            <view class="flex flex-wrap">
              <view class="p-2" style="width: 50%;" v-for="(item, index) in videos" :key="index">
                <view
                  class="rounded border p-2"
                  :class="activeIndex === index ? 'border-main text-main' : 'border-light-secondary text-light-muted'"
                  hover-class="bg-light"
                  @click="changeVideo(item, index)"
                >
                  <text>第 {{ index + 1 }} 集</text>
                  <view class="font text-ellipsis">{{ item.title }}</view>
                </view>
              </view>
            </view>
          </scroll-view>
        </view>
      </view>
    </f-popup>

    <f-popup ref="comment">
      <view class="position-absolute bottom-0 left-0 right-0 bg-white" @click.stop="() => {}">
        <view class="flex align-center px-3" style="height: 160rpx;">
          <input
            type="text"
            class="bg-light rounded mr-3 px-2 flex-1"
            style="height: 60rpx;"
            :placeholder="reply_user.id ? '@' + reply_user.name : '说点什么吧'"
            placeholder-class="text-light-muted"
            v-model="content"
          />
          <view class="rounded bg-main text-white px-2 py-1" hover-class="bg-main-hover" @click="sendComment">
            <text>回复</text>
          </view>
        </view>
      </view>
    </f-popup>
  </view>
</template>

<script>
import { mapState } from 'vuex'
import common from '@/common/mixins/common'
import mediaList from '@/components/common/media-list'
import fPopup from '@/components/common/f-popup'
let videoCtx = null
export default {
  components: {
    mediaList,
    fPopup,
  },
  mixins: [common],
  data() {
    return {
      id: 0,
      scrollHeight: 500,
      tabIndex: 0,
      tabBars: [{ name: '简介' }, { name: '评论' }],
      src: '',
      poster: '',
      // 作品信息
      detail: {
        id: 0,
        category_id: 0,
        title: '',
        cover: '',
        desc: '',
        duration: 0,
        play_count: 0,
        danmu_count: 0,
        created_at: '',
        // 发布人信息
        user: { id: 0, username: '', nickname: '', avatar: '' },
      },
      // 视频信息
      videos: [],
      activeIndex: 0,
      // 热门视频
      hot: [],
      comments: [],
      fansCount: 0,
      isFollow: false,
      isCollect: false,
      content: '',
      reply_id: 0,
      reply_user: {},
    }
  },
  computed: {
    ...mapState({
      // 当前登入用户的id
      user_id: (state) => {
        return state.user.user ? state.user.user.id : 0
      },
    }),
  },
  onLoad(e) {
    let res = uni.getSystemInfoSync()
    this.scrollHeight = res.windowHeight - 225
    if (!e.id) {
      this.back()
      uni.showToast({
        title: '非法参数',
        icon: 'none',
      })
    }
    // 拿到上一个页面传递过来的作品id
    this.id = e.id
    // 请求作品信息
    this.$req.get(`/video_read/${e.id}`, { token: true, noJump: true, toast: false }).then((res) => {
      this.hot = res.hotVideos || []
      this.detail = res.video || {}
      this.videos = res.video.video_details || []
      this.src = res.video.video_details[0] ? res.video.video_details[0].url : ''
      this.poster = res.video.cover || ''
      this.isFollow = res.isFollow
      this.isCollect = res.isCollect
      this.getAuthorInfo()
      uni.$emit('video', {
        type: 'init',
        params: {
          poster: this.poster,
          videos: this.videos,
          videoIndex: this.activeIndex,
        },
      })
    })
    // 请求作品的评论
    this.getComments()
    uni.$on('nvueVideo', this.handleVideoEvent)
  },
  onReady() {
    videoCtx = uni.createVideoContext('myVideo', this)
    // 监听软件盘高度变化
    uni.onKeyboardHeightChange((res) => {
      if (res.height === 0) {
        uni.pageScrollTo({
          scrollTop: 0,
          duration: 0,
        })
      }
    })
  },
  onUnload() {
    uni.$off('nvueVideo', this.handleVideoEvent)
  },
  methods: {
    // nvue通信
    handleVideoEvent(e) {
      switch (e.type) {
        case 'change':
          this.activeIndex = e.params.activeIndex
          break
      }
    },
    // 获取作者信息
    getAuthorInfo() {
      return this.$req.get(`/user/info/?user_id=1`).then((res) => {
        this.fansCount = res.fansCount
      })
    },
    // 获取评论
    getComments() {
      return this.$req.get(`/video_comment/${this.id}`).then((res) => {
        this.comments = res
      })
    },
    openPopup() {
      this.$refs.popup.show()
    },
    hidePopup() {
      this.$refs.popup.hide()
    },
    // 打开评论框
    openComment(reply_id = 0, reply_user = { id: 0, nickname: '', username: '' }) {
      // 记录层主评论id
      this.reply_id = reply_id
      // 记录要回复的人的信息
      this.reply_user = { id: reply_user.id, name: reply_user.nickname || reply_user.username }
      this.content = ''
      this.$refs.comment.show()
    },
    // 关注||取消关注
    doFollow(follow_id) {
      if (!this.user_id) return
      this.$req.post('/user/follow', { follow_id }, { token: true }).then((res) => {
        this.isFollow = !this.isFollow
        uni.showToast({
          title: res.isFollow ? '关注成功' : '取消关注',
          icon: 'none',
        })
      })
    },
    // 收藏||取消收藏
    doCollect(video_id) {
      if (!this.user_id) return
      this.$req.post('/collect/video', { video_id }, { token: true }).then((res) => {
        this.isCollect = !this.isCollect
        uni.showToast({
          title: res.isCollect ? '收藏成功' : '取消收藏',
          icon: 'none',
        })
      })
    },
    // 发表评论
    sendComment() {
      if (!this.user_id) {
        this.$refs.comment.hide()
        return uni.showToast({
          title: '请先登入',
          icon: 'none',
        })
      }
      this.$req
        .post(
          '/comment',
          {
            content: this.content,
            video_id: this.id,
            reply_id: this.reply_id,
            reply_user_id: this.reply_user.id,
          },
          { token: true },
        )
        .then((res) => {
          console.log(this.content)
          this.getComments()
          this.$refs.comment.hide()
        })
        .catch((err) => {
          this.$refs.comment.hide()
        })
    },
    changeVideo(item, index) {
      videoCtx.pause()
      this.activeIndex = index
      this.src = item.url
      // #ifndef APP-PLUS
      setTimeout(() => {
        videoCtx.play()
      }, 200)
      // #endif
      // #ifdef APP-PLUS
      uni.$emit('video', {
        type: 'change',
        params: {
          videoIndex: this.activeIndex,
        },
      })
      // #endif
      this.hidePopup()
    },
  },
}
</script>

<style scoped></style>
