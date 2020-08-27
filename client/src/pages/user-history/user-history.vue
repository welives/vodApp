<template>
  <view>
    <view class="px-1 flex" v-for="(item, index) in list" :key="index">
      <uni-swipe-action class="w-100">
        <uni-swipe-action-item :options="options" @click="remove(item)">
          <media-list class="w-100" :item="item" :index="index"></media-list>
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
      options: [
        {
          text: '删除记录',
          style: {
            backgroundColor: 'rgb(255,58,49)',
          },
        },
      ],
      list: [],
    }
  },
  onLoad() {
    this.getData()
  },
  onNavigationBarButtonTap() {
    uni.removeStorage({
      key: 'history',
      success: (res) => {
        uni.showToast({
          title: '清除成功',
          icon: 'none',
        })
        this.list = []
      },
    })
  },
  methods: {
    getData() {
      let list = uni.getStorageSync('history')
      this.list = list ? JSON.parse(list) : []
    },
    remove(item) {
      let index = this.list.findIndex((v) => v.id === item.id)
      if (index !== -1) {
        this.list.splice(index, 1)
        uni.setStorage({
          key: 'history',
          data: JSON.stringify(this.list),
        })
        uni.showToast({
          title: '删除成功',
          icon: 'none',
        })
      }
    },
  },
}
</script>

<style scoped></style>
