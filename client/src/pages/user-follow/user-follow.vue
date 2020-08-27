<template>
  <view>
    <block v-for="(item, index) in list" :key="index">
      <uni-swipe-action>
        <uni-swipe-action-item :options="options" @click="unFollow(item.id)">
          <f-list-item :title="item.name" :showRightIcon="false">
            <image
              slot="icon"
              class="rounded-circle mr-2"
              :src="item.avatar || '/static/demo/6.jpg'"
              style="width: 80rpx; height: 80rpx;"
            ></image>
          </f-list-item>
        </uni-swipe-action-item>
      </uni-swipe-action>
    </block>
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
import fListItem from '@/components/common/f-list-item'
export default {
  components: {
    fListItem,
    uniSwipeAction,
    uniSwipeActionItem,
  },
  mixins: [common],
  data() {
    return {
      page: 1,
      list: [],
      options: [
        {
          text: '取消关注',
          style: {
            backgroundColor: 'rgb(255,58,49)',
          },
        },
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
        .get(`/user/follows/${this.page}`, { token: true })
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
    unFollow(follow_id) {
      this.$req.post('/user/follow', { follow_id }, { token: true }).then((res) => {
        let index = this.list.findIndex((v) => v.id === follow_id)
        this.list.splice(index, 1)
        uni.showToast({
          title: '取消关注',
          icon: 'none',
        })
      })
    },
  },
}
</script>

<style scoped></style>
