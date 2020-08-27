<template>
  <view>
    <!-- #ifdef MP -->
    <!-- 自定义导航栏 -->
    <view class="flex align-center fixed-top bg-white" style="height: 44px;">
      <!-- 搜索框 -->
      <view
        class="flex align-center flex-1 ml-2 px-1 rounded"
        style="background-color: #F6F7F8; color: #959FA0;"
        @click="navigateTo('search')"
      >
        <text class="iconfont iconsousuokuang"></text>
        <text class="ml-1">uni-app视频点播app&小程序项目实战</text>
      </view>
      <view class="flex align-center px-2" style="color: #959FA0;" @click="navigateTo('cate')">分类</view>
    </view>
    <view style="height: 44px;"></view>
    <!-- #endif -->

    <!-- 轮播组件 -->
    <view class="p-2">
      <swiper-dot :info="swipers" :current="current">
        <swiper
          :current="current"
          circular
          autoplay
          :interval="3000"
          :duration="150"
          style="height: 250rpx;"
          @change="changeSwiper"
        >
          <swiper-item v-for="(item, index) in swipers" :key="index">
            <image
              :src="item.cover"
              mode="aspectFill"
              class="rounded-lg"
              style="height: 250rpx; width: 100%;"
              @click="openDetail(item.video_id)"
            ></image>
          </swiper-item>
        </swiper>
      </swiper-dot>
    </view>
    <!-- 列表样式一 -->
    <card title="为你推荐">
      <view class="f-list">
        <view
          v-for="(item, index) in list"
          :key="index"
          class="rounded-lg border position-relative"
          style="margin: 15rpx; width: 328rpx; min-height: 5rpx;"
          @click="openDetail(item.id)"
        >
          <image
            class="rounded-top-lg"
            :src="item.cover"
            mode="aspectFill"
            style="width: 100%; height: 220rpx;"
          ></image>
          <view
            class="flex align-center text-white"
            style="height: 65rpx; background-image: linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.7));position: absolute; left: 0; right: 0; top: 155rpx;"
          >
            <text class="iconfont iconbofangshu font-md mx-1"></text>
            <text class="font-sm">{{ item.play_count }}</text>
            <text class="iconfont icondanmushu font-md mx-1"></text>
            <text class="font-sm">{{ item.danmu_count }}</text>
          </view>
          <view class="px-1" style="margin-top: -10rpx;">
            <view class="font">{{ item.title }}</view>
            <view class="flex align-center justify-between text-light-muted">
              <text class="font">{{ item.category.title }}</text>
              <text class="iconfont icongengduo"></text>
            </view>
          </view>
        </view>
      </view>
    </card>
    <view class="f-divider"></view>
    <!-- 列表样式二 -->
    <card title="为你推荐">
      <view class="f-list">
        <view
          v-for="(item, index) in list"
          :key="index"
          class="position-relative"
          style="margin: 15rpx; width: 210rpx; min-height: 5rpx;"
          @click="openDetail(item.id)"
        >
          <image class="rounded-lg" :src="item.cover" mode="aspectFill" style="width: 100%; height: 280rpx;"></image>
          <view
            class="flex align-center text-white rounded-bottom-lg"
            style="height: 65rpx; background-image: linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.7));position: absolute; left: 0; right: 0; top: 215rpx;"
          >
            <text class="iconfont iconbofangshu font-md mx-1"></text>
            <text class="font-sm">{{ item.play_count }}</text>
          </view>
          <view class="px-1 font" style="margin-top: -10rpx;">
            {{ item.title }}
          </view>
        </view>
      </view>
    </card>
    <view class="f-divider"></view>
    <!-- 列表样式三 -->
    <card title="为你推荐">
      <view class="px-2" v-for="(item, index) in list" :key="index">
        <media-list :item="item" :index="index" @click="openDetail(item.id)"></media-list>
      </view>
    </card>
  </view>
</template>

<script>
import swiperDot from '@/components/common/swiper-dot'
import card from '@/components/common/card'
import mediaList from '@/components/common/media-list'
export default {
  components: {
    swiperDot,
    card,
    mediaList,
  },
  data() {
    return {
      scrollHeight: 0,
      current: 0,
      swipers: [],
      list: [],
    }
  },
  onLoad() {
    let res = uni.getSystemInfoSync()
    this.scrollHeight = res.windowHeight
    this.$req.get('/index_data').then((res) => {
      this.list = res
    })
    this.$req.get('/banner_list').then((res) => {
      this.swipers = res
    })
  },
  onNavigationBarSearchInputClicked() {
    uni.navigateTo({
      url: '../search/search',
    })
  },
  onNavigationBarButtonTap(e) {
    uni.switchTab({
      url: '../cate/cate',
    })
  },
  methods: {
    changeSwiper(e) {
      this.current = e.detail.current
    },
    openDetail(id) {
      uni.navigateTo({
        url: '../video-detail/video-detail?id=' + id,
      })
    },
    navigateTo(path) {
      switch (path) {
        case 'index':
          break
        case 'cate':
          uni.switchTab({
            url: '../cate/cate',
          })
          break
        case 'mine':
          break
        default:
          uni.navigateTo({
            url: `../${path}/${path}`,
          })
          break
      }
    },
  },
}
</script>

<style scoped>
.f-list {
  display: flex;
  flex-wrap: wrap;
  padding-left: 15rpx;
  padding-right: 15rpx;
}
</style>
