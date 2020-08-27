<template>
  <view style="line-height: 0;">
    <view class="px-1" v-for="(item, index) in list" :key="index">
      <media-list :item="item" :index="index" @click="detail(item)"></media-list>
      <view class="flex text-center" style="height: 80rpx;">
        <view class="flex-1 my-auto" hover-class="bg-light" @click="detail(item)">详情</view>
        <view class="flex-1 my-auto" hover-class="bg-light" @click="edit(item)">修改</view>
        <view class="flex-1 my-auto" hover-class="bg-light" @click="del(item)">删除</view>
      </view>
      <view class="f-divider"></view>
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
import { mapState } from 'vuex'
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
      list: [],
    }
  },
  computed: {
    ...mapState({
      user_id: (state) => state.user.user.id,
    }),
  },
  // 页面加载
  onShow() {
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
      let url = `/video_list/${this.page}?user_id=${this.user_id}`
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
    detail(item) {
      uni.navigateTo({
        url: '../user-video-list/user-video-list?id=' + item.id,
      })
    },
    edit(item) {
      uni.navigateTo({
        url: '../create/create?title=修改作品&data=' + encodeURIComponent(JSON.stringify(item)),
      })
    },
    del(item) {
      uni.showModal({
        content: '是否要删除该作品？',
        success: (res) => {
          if (res.confirm) {
            this.$req.get(`/video/destroy/${item.id}`, { token: true }).then((res) => {
              uni.showToast({
                title: '删除成功',
                icon: 'none',
              })
              let index = this.list.findIndex((v) => v.id === item.id)
              this.list.splice(index, 1)
            })
          }
        },
      })
    },
  },
}
</script>

<style scoped></style>
