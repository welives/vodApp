<template>
  <view class="flex border-bottom border-light-secondary" style="min-height: 100rpx;">
    <view class="flex align-center justify-center font-md" style="width: 120rpx; height: 100rpx;">{{ label }}</view>
    <view class="flex flex-1 align-center">
      <slot></slot>
    </view>
    <view v-if="rightIcon" class="flex align-center justify-center" style="width: 80rpx; height: 100rpx">
      <text class="iconfont iconjinru text-muted"></text>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: '标题',
    },
    rightIcon: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped></style>
