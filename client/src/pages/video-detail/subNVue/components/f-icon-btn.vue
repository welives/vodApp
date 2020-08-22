<template>
  <view class="video-btn" @click="$emit('click')">
    <text class="iconfont text-white" :style="`font-size:${size}px;`">{{ icon }}</text>
  </view>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: '',
    },
    size: {
      type: [String, Number],
      default: 20,
    },
  },
}
</script>

<style scoped>
.video-btn {
  width: 44px;
  height: 44px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
