<template>
  <view class="flex align-center py-2 border-bottom" style="width: 100%;" @click="open">
    <image
      class="rounded-lg mx-1 flex-shrink"
      :src="item.cover"
      mode="aspectFill"
      style="width: 260rpx; height: 160rpx;"
    ></image>
    <view class="flex flex-column flex-1 mx-1">
      <text class="font line-h">{{ item.title }}</text>
      <text class="font-sm text-light-muted my-1">{{ item.created_at | formatTime }}</text>
      <view class="flex align-center justify-between text-muted line-h">
        <view class="line-h flex align-center">
          <text class="iconfont iconbofangshu font-md mx-1"></text>
          <text class="font-sm">{{ item.play_count }}</text>
        </view>
        <view class="line-h flex align-center">
          <text class="iconfont icondanmushu font-md mx-1"></text>
          <text class="font-sm">{{ item.danmu_count }}</text>
        </view>
        <text class="iconfont icongengduo"></text>
      </view>
    </view>
  </view>
</template>

<script>
import common from '@/common/mixins/common'
export default {
  props: {
    item: Object,
    index: [Number, String],
  },
  mixins: [common],
  methods: {
    // 数组置顶
    toFirst(arr, index) {
      if (index != 0) {
        arr.unshift(arr.splice(index, 1)[0])
      }
      return arr
    },
    open() {
      // 存储到历史记录中
      let list = uni.getStorageSync('history')
      list = list ? JSON.parse(list) : []
      let index = list.findIndex((v) => v.id === this.item.id)
      index === -1 ? list.unshift(this.item) : this.toFirst(list, index)
      uni.setStorage({
        key: 'history',
        data: JSON.stringify(list),
      })
      this.$emit('click')
    },
  },
}
</script>

<style scoped></style>
