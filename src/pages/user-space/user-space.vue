<template>
  <view style="line-height: 0;">
    <image src="/static/demo/list2/3.jpg" mode="aspectFill" style="width: 100%; height: 160px;"></image>
    <view class="border-bottom" style="height: 180px;">
      <view class="flex align-center justify-between px-3 py-1">
        <image
          src="/static/demo/6.jpg"
          class="rounded-circle"
          style="width: 130rpx; height: 130rpx; margin-top: -80rpx;"
        ></image>
        <view class="flex align-center justify-center rounded bg-main text-white py-1" hover-class="bg-main-hover">
          <text class="font px-3">关注</text>
        </view>
      </view>
      <view class="flex align-center px-3 my-1">
        <view class="font-md font-weight-bold text-main">昵称</view>
        <text class="font-sm text-light-muted ml-2">UID: 12345</text>
      </view>
      <view class="flex align-center px-3 my-1">
        <view class="rounded font-sm bg-main text-white px-1">年度大会员</view>
      </view>
      <view class="flex align-center px-3 my-1">
        <view class="font text-dark flex align-center mr-3"
          >21<text class="ml-1 font-sm text-light-muted">关注</text></view
        >
        <view class="font text-dark flex align-center">45<text class="ml-1 font-sm text-light-muted">粉丝</text></view>
      </view>
      <view class="px-3 my-1">
        <view class="font-sm text-light-muted text-ellipsis" style="line-height: 1.5;"
          >固定流速的话，用45℃的次氯酸钠冲洗牙髓腔效果最佳</view
        >
      </view>
    </view>
    <scroll-view scroll-y :style="`height:${scrollHeight}px`" style="position: relative;">
      <!-- 选项卡 开始 -->
      <view
        class="flex align-center bg-white position-absolute"
        style="height: 44px; top: 0; left: 0; right: 0; z-index: 100;"
      >
        <view
          class="flex-1 flex align-center justify-center"
          v-for="(item, index) in tabBars"
          :key="index"
          @click="tabIndex = index"
        >
          <text class="font" :class="tabIndex === index ? 'text-main' : ''">{{ item.name }}</text>
        </view>
      </view>
      <!-- 选项卡 结束 -->
      <swiper
        :current="tabIndex"
        :duration="300"
        @change="changeSwiper"
        style="position: absolute; top: 44px; width: 100%;"
        :style="`height:${scrollHeight - 44}px`"
      >
        <swiper-item v-for="(tab, tabI) in tabBars" :key="tabI">
          <scroll-view scroll-y style="height: 100%;">
            <view class="f-divider"></view>
            <view class="px-1" v-for="(item, index) in list" :key="index">
              <media-list :item="item" :index="index"></media-list>
            </view>
          </scroll-view>
        </swiper-item>
      </swiper>
    </scroll-view>
  </view>
</template>

<script>
import mediaList from '@/components/common/media-list'
export default {
  components: {
    mediaList,
  },
  data() {
    return {
      tabIndex: 0,
      tabBars: [
        {
          name: '主页',
        },
        {
          name: '动态',
        },
        {
          name: '作品',
        },
        {
          name: '收藏',
        },
      ],
      scrollHeight: 0,
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
    this.scrollHeight = res.windowHeight - res.statusBarHeight - 44
  },
  methods: {
    changeSwiper(e) {
      this.tabIndex = e.detail.current
    },
  },
}
</script>

<style scoped></style>
