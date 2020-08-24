<template>
  <view style="line-height: 0;">
    <!-- #ifndef APP-PLUS-NVUE -->
    <video :src="detail.src" :poster="detail.poster" style="height: 225px; width: 100%;" controls></video>
    <!-- #endif -->
    <scroll-view scroll-y :style="`height:${scrollHeight}px`">
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
          <image src="/static/demo/6.jpg" class="rounded-circle mr-3" style="height: 80rpx; width: 80rpx;"></image>
          <view class="flex flex-column">
            <text class="text-main font">昵称</text>
            <text class="font-sm text-muted">123 粉丝</text>
          </view>
          <view class="rounded bg-main text-white ml-auto px-2 py-1" hover-class="bg-main-hover">
            <text>关注</text>
          </view>
        </view>

        <view class="px-3 font-md">视频标题</view>
        <view class="px-3 flex align-center text-muted">
          <view class="flex align-center">
            <text class="iconfont iconbofangshu font-md mr-1"></text>
            <text class="font-sm">123</text>
          </view>
          <view class="mx-2 flex align-center">
            <text class="iconfont icondanmushu font-md mr-1"></text>
            <text class="font-sm">123</text>
          </view>
          <text class="font-sm">今日14:07</text>
        </view>

        <view class="px-3 py-2 border-top border-bottom border-light-secondary">
          <view class="flex align-center justify-between">
            <text class="font-md">选集</text>
            <view class="text-light-muted font" @click="openPopup">
              共9集
              <text class="iconfont iconjinru ml-1"></text>
            </view>
          </view>
          <scroll-view scroll-x class="scroll-row mt-2">
            <view
              v-for="(item, index) in 10"
              :key="index"
              class="scroll-row-item rounded border mx-1 p-2"
              :class="index === 0 ? 'border-main text-main' : 'border-light-secondary text-light-muted'"
              style="width: 340rpx;"
              hover-class="bg-light"
            >
              <text>第一集</text>
              <view class="font text-ellipsis">uni-app视频点播app&小程序项目实战</view>
            </view>
          </scroll-view>
        </view>

        <view class="px-2" v-for="(item, index) in list" :key="index">
          <media-list :item="item" :index="index"></media-list>
        </view>
      </view>
      <!-- 简介 结束 -->

      <!-- 评论 -->
      <view v-else class="px-3 py-1">
        <view class="uni-comment-list">
          <view class="uni-comment-face">
            <image src="/static/demo/6.jpg" class="rounded-circle mr-3" style="height: 80rpx; width: 80rpx;"></image>
          </view>
          <view class="uni-comment-body">
            <view class="uni-comment-top">
              <text class="font text-main">昵称1</text>
            </view>
            <view class="uni-comment-date">
              <text class="font-sm text-muted">15:38</text>
            </view>
            <view class="uni-comment-content">评论内容</view>
            <!-- 回复 -->
            <view class="flex flex-wrap p-1 bg-light rounded">
              <text class="font text-main">昵称2：</text>
              测试
            </view>
          </view>
        </view>
        <view
          class="position-fixed flex align-center justify-center bg-main rounded-circle animate__animated"
          hover-class="bg-main-hover animate__pulse"
          style="width: 100rpx; height: 100rpx; right: 50rpx; bottom: 50rpx;"
          @click="openComment"
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
              <view class="p-2" style="width: 50%;" v-for="(item, index) in 10" :key="index">
                <view
                  class="rounded border p-2"
                  :class="index === 0 ? 'border-main text-main' : 'border-light-secondary text-light-muted'"
                  hover-class="bg-light"
                >
                  <text>第一集</text>
                  <view class="font text-ellipsis">uni-app视频点播app&小程序项目实战</view>
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
            placeholder="说点什么吧"
            placeholder-class="text-light-muted"
          />
          <view class="rounded bg-main text-white px-2 py-1" hover-class="bg-main-hover">
            <text>回复</text>
          </view>
        </view>
      </view>
    </f-popup>
  </view>
</template>

<script>
import mediaList from '@/components/common/media-list'
import fPopup from '@/components/common/f-popup'
export default {
  components: {
    mediaList,
    fPopup,
  },
  data() {
    return {
      scrollHeight: 500,
      tabIndex: 0,
      tabBars: [{ name: '简介' }, { name: '评论' }],
      detail: {
        src:
          'https://douyinzcmcss.oss-cn-shenzhen.aliyuncs.com/%E8%AF%BE%E6%97%B61.%20%E9%A1%B9%E7%9B%AE%E4%BB%8B%E7%BB%8D.mp4',
        poster: 'https://ss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/1696374343.jpg',
      },
      list: [
        {
          cover: '/static/demo/list2/1.jpg',
          title: 'uni-app视频点播app&小程序项目实战',
          created_time: '今天 01:06',
          play_count: 0,
          danmu_count: 0,
        },
        {
          cover: '/static/demo/list2/1.jpg',
          title: 'uni-app视频点播app&小程序项目实战',
          created_time: '今天 01:06',
          play_count: 0,
          danmu_count: 0,
        },
        {
          cover: '/static/demo/list2/1.jpg',
          title: 'uni-app视频点播app&小程序项目实战',
          created_time: '今天 01:06',
          play_count: 0,
          danmu_count: 0,
        },
        {
          cover: '/static/demo/list2/1.jpg',
          title: 'uni-app视频点播app&小程序项目实战',
          created_time: '今天 01:06',
          play_count: 0,
          danmu_count: 0,
        },
        {
          cover: '/static/demo/list2/1.jpg',
          title: 'uni-app视频点播app&小程序项目实战',
          created_time: '今天 01:06',
          play_count: 0,
          danmu_count: 0,
        },
      ],
    }
  },
  onLoad() {
    let res = uni.getSystemInfoSync()
    this.scrollHeight = res.windowHeight - 225
  },
  methods: {
    openPopup() {
      this.$refs.popup.show()
    },
    hidePopup() {
      this.$refs.popup.hide()
    },
    openComment() {
      this.$refs.comment.show()
    },
  },
}
</script>

<style scoped></style>
