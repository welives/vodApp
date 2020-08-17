<template>
  <view>
    <!-- #ifdef MP -->
    <!-- 自定义导航栏 -->
    <view class="flex align-center fixed-top" style="height: 44px;">
      <!-- 搜索框 -->
      <view
        class="flex align-center flex-1 ml-1 px-1"
        style="background-color: #F6F7F8; color: #959FA0; border-radius: 6px;"
      >
        <text class="iconfont iconsousuokuang"></text>
        <text class="ml-1">uni-app视频点播app&小程序项目实战</text>
      </view>
      <view class="flex align-center px-1" style="color: #959FA0;">分类</view>
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
            <image :src="item.src" mode="aspectFill" class="rounded-lg" style="height: 250rpx; width: 100%;"></image>
          </swiper-item>
        </swiper>
      </swiper-dot>
    </view>
    <!-- 列表样式一 -->
    <card title="为你推荐">
      <view class="f-list">
        <view
          v-for="(item, index) in 4"
          :key="index"
          class="rounded-lg border position-relative"
          style="margin: 15rpx; width: 328rpx; min-height: 5rpx;"
        >
          <image
            class="rounded-top-lg"
            src="/static/demo/list2/1.jpg"
            mode="aspectFill"
            style="width: 100%; height: 220rpx;"
          ></image>
          <view
            class="flex align-center text-white"
            style="height: 65rpx; background-image: linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.7));position: absolute; left: 0; right: 0; top: 155rpx;"
          >
            <text class="iconfont iconbofangshu font-md mx-1"></text>
            <text class="font-sm">1234</text>
            <text class="iconfont icondanmushu font-md mx-1"></text>
            <text class="font-sm">5678</text>
          </view>
          <view class="px-1" style="margin-top: -10rpx;">
            <view class="font">标题</view>
            <view class="flex align-center justify-between text-light-muted">
              <text class="font">恶搞</text>
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
          v-for="(item, index) in 6"
          :key="index"
          class="position-relative"
          style="margin: 15rpx; width: 210rpx; min-height: 5rpx;"
        >
          <image
            class="rounded-lg"
            src="/static/demo/list3/1.webp"
            mode="aspectFill"
            style="width: 100%; height: 280rpx;"
          ></image>
          <view
            class="flex align-center text-white rounded-bottom-lg"
            style="height: 65rpx; background-image: linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.7));position: absolute; left: 0; right: 0; top: 215rpx;"
          >
            <text class="iconfont iconbofangshu font-md mx-1"></text>
            <text class="font-sm">1234</text>
          </view>
          <view class="px-1 font" style="margin-top: -10rpx;">
            标题
          </view>
        </view>
      </view>
    </card>
    <view class="f-divider"></view>
    <!-- 列表样式三 -->
    <card title="为你推荐">
      <view class="f-list">
        <view v-for="(item, index) in 4" :key="index" class="flex align-center py-2 border-bottom" style="width: 100%;">
          <image
            class="rounded-lg mx-2 flex-shrink"
            src="/static/demo/list2/1.jpg"
            mode="aspectFill"
            style="width: 260rpx; height: 160rpx;"
          ></image>
          <view class="flex flex-column flex-1">
            <text class="font line-h">uni-app视频点播app&小程序项目实战</text>
            <text class="font-sm text-light-muted">今天 01:06</text>
            <view class="flex align-center justify-between text-muted line-h">
              <view class="line-h">
                <text class="iconfont iconbofangshu font-md mx-1"></text>
                <text class="font-sm">1234</text>
              </view>
              <view class="line-h">
                <text class="iconfont icondanmushu font-md mx-1"></text>
                <text class="font-sm">5678</text>
              </view>
              <text class="iconfont icongengduo"></text>
            </view>
          </view>
        </view>
      </view>
    </card>
  </view>
</template>

<script>
import swiperDot from '@/components/common/swiper-dot'
import card from '@/components/common/card'
export default {
  components: {
    swiperDot,
    card,
  },
  data() {
    return {
      current: 0,
      swipers: [
        {
          src: '/static/demo/swiper/1.jpg',
          title: 'uni-app视频点播app&小程序项目实战',
        },
        {
          src: '/static/demo/swiper/2.jpg',
          title: 'uni-app社区交友app&小程序项目实战',
        },
        {
          src: '/static/demo/swiper/3.jpg',
          title: 'uni-app商城app&小程序项目实战',
        },
      ],
    }
  },
  onLoad() {},
  onNavigationBarSearchInputClicked() {
    console.log('点击了搜索框')
  },
  onNavigationBarButtonTap() {
    console.log('点击了按钮')
  },
  methods: {
    changeSwiper(e) {
      this.current = e.detail.current
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
