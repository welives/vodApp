<template>
  <view>
    <!-- #ifdef MP -->
    <!-- 导航栏 -->
    <view class="flex align-center fixed-top bg-white" style="height: 44px;">
      <!-- 搜索框 -->
      <input
        v-model="keyword"
        class="flex align-center flex-1 ml-2 px-1 py-1 rounded"
        style="background-color: #F6F7F8;color: #959FA0;"
        type="text"
        placeholder="请输入"
      />
      <view class="flex align-center px-2" style="color: #959FA0;" @click="search">搜索</view>
    </view>
    <view style="height: 44px;"></view>
    <!-- #endif -->
    <view class="px-1" v-for="(item, index) in list" :key="index">
      <media-list class="w-100" :item="item" :index="index" @click="detail(item)"></media-list>
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
      page: 1,
      keyword: '',
      list: [],
    }
  },
  onNavigationBarButtonTap(e) {
    if (this.keyword === '') {
      return uni.showToast({
        title: '请输入关键字',
        icon: 'none',
      })
    }
    this.page = 1
    this.search()
  },
  onNavigationBarSearchInputChanged(e) {
    this.keyword = e.text
  },
  onReachBottom(e) {
    if (this.load.type !== 2) {
      if (this.load.type === 1) return
      // 加这层延迟是为了测试时的反馈更明显
      setTimeout(() => {
        this.load.type = 1
        this.page++
        this.search()
      }, 250)
    }
  },
  methods: {
    search() {
      uni.showLoading({ title: '加载中...' })
      return this.$req
        .get(`/video_search/${this.page}?keyword=${this.keyword}`)
        .then((res) => {
          uni.hideLoading()
          this.list = this.page === 1 ? res : [...this.list, ...res]
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
    detail(item) {
      uni.navigateTo({
        url: '../video-detail/video-detail?id=' + item.id,
      })
    },
  },
}
</script>

<style scoped></style>
