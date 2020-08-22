<template>
  <view class="px-3 py-2 flex align-center" hover-class="bg-light" @click="$emit('click')">
    <text v-if="icon" class="iconfont mr-3" :class="icon"></text>
    <view class="mr-auto font">{{ title }}</view>
    <view class="text-muted font-sm"
      >{{ rightText }}<text v-if="showRightIcon" class="iconfont iconjinru ml-1 text-light-muted"></text>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    icon: String,
    title: String,
    rightText: String,
    showRightIcon: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style scoped></style>
