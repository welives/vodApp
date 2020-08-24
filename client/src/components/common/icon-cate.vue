<template>
  <view class="icon-cate">
    <image class="bg-light rounded" :src="item.icon" mode="" style="width: 70rpx; height: 70rpx;"></image>
    <text class="text-muted font mt-1">{{ item.title }}</text>
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

<style scoped>
.icon-cate {
  width: 187.5rpx;
  height: 187.5rpx;
  line-height: 1;
  display: inline-flex !important;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
