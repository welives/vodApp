<template>
  <view>
    <view class="px-1" v-for="(item, index) in list" :key="index">
      <media-list :item="item" :index="index"></media-list>
      <view class="flex text-center" style="height: 80rpx;">
        <view class="flex-1 my-auto" hover-class="bg-light" @click="detail(item)">详情</view>
        <view class="flex-1 my-auto" hover-class="bg-light">修改</view>
        <view class="flex-1 my-auto" hover-class="bg-light">删除</view>
      </view>
      <view class="f-divider"></view>
    </view>
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
      list: [
        {
          cover: '/static/demo/list2/1.jpg',
          title: 'uni-app视频点播app&小程序项目实战',
          created_time: '今天 01:06',
          play_count: 0,
          danmu_count: 0,
        },
        {
          cover: '/static/demo/list2/2.jpg',
          title: 'uni-app视频点播app&小程序项目实战',
          created_time: '今天 01:06',
          play_count: 0,
          danmu_count: 0,
        },
        {
          cover: '/static/demo/list2/3.jpg',
          title: 'uni-app视频点播app&小程序项目实战',
          created_time: '今天 01:06',
          play_count: 0,
          danmu_count: 0,
        },
        {
          cover: '/static/demo/list2/4.jpg',
          title: 'uni-app视频点播app&小程序项目实战',
          created_time: '今天 01:06',
          play_count: 0,
          danmu_count: 0,
        },
      ],
    }
  },
  methods: {
    detail(item) {
      uni.navigateTo({
        url: '../user-video-list/user-video-list',
      })
    },
  },
}
</script>

<style scoped></style>
