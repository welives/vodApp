<template>
  <view>
    <view class="px-1" v-for="(item, index) in list" :key="index">
      <media-list :item="item" :index="index"></media-list>
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
import mediaList from '@/components/common/media-list'
export default {
  components: {
    mediaList,
  },
  mixins: [common],
  data() {
    return {
      category_id: 0,
      page: 1,
      list: [],
    }
  },
  // 页面加载
  onLoad(e) {
    e.id && (this.category_id = e.id)
    e.title &&
      uni.setNavigationBarTitle({
        title: e.title,
      })
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
      let url = `/category/${this.category_id}/video/${this.page}`
      uni.showLoading({ title: '加载中...' })
      return this.$req
        .get(url)
        .then((res) => {
          uni.hideLoading()
          if (this.page === 1) {
            this.list = res
          } else {
            this.list = [...this.list, ...res]
          }
          this.load.type = res.length > 0 ? 0 : 2
        })
        .catch((err) => {
          uni.hideLoading()
          if (this.page > 1) {
            this.page--
          }
          this.load.type = 0
        })
    },
  },
}
</script>

<style scoped></style>
