<template>
  <view>
    <view class="flex align-center py-2 px-3">
      <text class="font-md font-weight-bold">{{ title }}</text>
    </view>
    <slot></slot>
    <view
      v-if="showRefresh"
      @click="$emit('refresh')"
      class="flex align-center justify-center py-2 text-main"
      hover-class="text-main-hover"
    >
      <text class="iconfont iconshuaxin"></text>换一批
    </view>
  </view>
</template>

<script>
export default {
  props: {
    title: String,
    showRefresh: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style scoped></style>
