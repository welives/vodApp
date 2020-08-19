<template>
  <view>
    <block v-for="(item, index) in list" :key="index">
      <uni-swipe-action>
        <uni-swipe-action-item :options="options" @click="bindClick($event, item)">
          <media-list class="px-1" :item="item" :index="index"></media-list>
        </uni-swipe-action-item>
      </uni-swipe-action>
    </block>
  </view>
</template>

<script>
import uniSwipeAction from '@/components/uni-ui/uni-swipe-action/uni-swipe-action'
import uniSwipeActionItem from '@/components/uni-ui/uni-swipe-action-item/uni-swipe-action-item'
import mediaList from '@/components/common/media-list'
export default {
  components: {
    mediaList,
    uniSwipeAction,
    uniSwipeActionItem,
  },
  data() {
    return {
      options: [
        {
          text: '取消收藏',
          style: {
            backgroundColor: 'rgb(255,58,49)',
          },
        },
      ],
      list: [
        {
          id: 1,
          cover: '/static/demo/list2/1.jpg',
          title: 'uni-app视频点播app&小程序项目实战',
          created_time: '今天 01:06',
          play_count: 0,
          danmu_count: 0,
        },
        {
          id: 2,
          cover: '/static/demo/list2/2.jpg',
          title: 'uni-app视频点播app&小程序项目实战',
          created_time: '今天 01:06',
          play_count: 0,
          danmu_count: 0,
        },
        {
          id: 3,
          cover: '/static/demo/list2/3.jpg',
          title: 'uni-app视频点播app&小程序项目实战',
          created_time: '今天 01:06',
          play_count: 0,
          danmu_count: 0,
        },
        {
          id: 4,
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
    bindClick(e, item) {
      console.log(item)
      uni.showToast({
        title: `点击了${e.content.text}按钮`,
        icon: 'none',
      })
    },
  },
}
</script>

<style scoped></style>
