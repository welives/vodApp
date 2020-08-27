<template>
  <view style="line-height: 0;">
    <view class="px-1 flex" v-for="(item, index) in list" :key="index">
      <uni-swipe-action>
        <uni-swipe-action-item :options="options" @click="removeCollect(item)">
          <media-list :item="item" :index="index"></media-list>
        </uni-swipe-action-item>
      </uni-swipe-action>
    </view>
    <!-- 无数据提示 -->
    <view v-if="list.length === 0" class="flex align-center justify-center text-light-muted" style="height: 200rpx;"
      >暂无数据...</view
    >
    <!-- 上拉加载 -->
    <view
      v-else-if="list.length > 10"
      class="flex align-center justify-center text-light-muted"
      hover-class="bg-light"
      style="height: 80rpx;"
      >{{ load.text[load.type] }}</view
    >
  </view>
</template>

<script>
import common from '@/common/mixins/common'
import uniSwipeAction from '@/components/uni-ui/uni-swipe-action/uni-swipe-action'
import uniSwipeActionItem from '@/components/uni-ui/uni-swipe-action-item/uni-swipe-action-item'
import mediaList from '@/components/common/media-list'
export default {
  components: {
    mediaList,
    uniSwipeAction,
    uniSwipeActionItem,
  },
  mixins: [common],
  data() {
    return {
      page: 1,
      options: [
        {
          text: '取消收藏',
          style: {
            backgroundColor: 'rgb(255,58,49)',
          },
        },
      ],
      list: [
        // {
        //   id: 1,
        //   cover: '/static/demo/list2/1.jpg',
        //   title: 'uni-app视频点播app&小程序项目实战',
        //   created_time: '今天 01:06',
        //   play_count: 0,
        //   danmu_count: 0,
        // },
      ],
    }
  },
  onLoad() {
    this.getData()
  },
  // 监听下拉刷新事件
  onPullDownRefresh() {
    this.page = 1
    this.getData()
      .then((res) => {
        uni.stopPullDownRefresh()
        uni.showToast({
          title: '刷新成功',
          icon: 'none',
        })
      })
      .catch((err) => {
        uni.stopPullDownRefresh()
      })
  },
  // 监听页面滚动到底部的事件
  onReachBottom(e) {
    if (this.load.type !== 2) {
      if (this.load.type === 1) return
      // 加这层延迟是为了测试时的反馈更明显
      setTimeout(() => {
        this.load.type = 1
        this.page++
        this.getData()
      }, 250)
    }
  },
  methods: {
    getData() {
      uni.showLoading({ title: '加载中...' })
      return this.$req
        .get(`/collect/list/${this.page}`, { token: true })
        .then((res) => {
          uni.hideLoading()
          if (this.page === 1) {
            this.list = res
          } else {
            this.list = [...this.list, ...res]
          }
          this.load.type = res.length === 10 ? 0 : 2
        })
        .catch((err) => {
          uni.hideLoading()
          if (this.page > 1) {
            this.page--
          }
          this.load.type = 0
        })
    },
    removeCollect(item) {
      this.$req.post('/collect/video', { video_id: item.id }, { token: true }).then((res) => {
        let i = this.list.findIndex((v) => v.id === item.id)
        i !== -1 && this.list.splice(i, 1)
        uni.showToast({
          title: '取消收藏',
          icon: 'none',
        })
      })
    },
  },
}
</script>

<style scoped></style>
