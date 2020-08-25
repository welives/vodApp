<template>
  <view class="flex align-center py-2 border-bottom" style="width: 100%;" @click="$emit('click')">
    <image
      class="rounded-lg mx-1 flex-shrink"
      :src="item.cover"
      mode="aspectFill"
      style="width: 260rpx; height: 160rpx;"
    ></image>
    <view class="flex flex-column flex-1 mx-1">
      <text class="font line-h">{{ item.title }}</text>
      <text class="font-sm text-light-muted my-1">{{ item.created_at }}</text>
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
export default {
  props: {
    item: Object,
    index: [Number, String],
  },
}
</script>

<style scoped></style>
