<template>
  <view
    class="py-2 rounded-circle bg-main flex align-center justify-center text-white"
    hover-class="bg-main-hover"
    @click="$emit('click')"
  >
    <slot></slot>
  </view>
</template>

<script>
export default {}
</script>

<style scoped></style>
