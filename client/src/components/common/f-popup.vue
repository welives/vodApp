<template>
  <view
    v-if="isShow"
    class="position-fixed top-0 left-0 right-0 bottom-0 animate__animated animate__faster animate__fadeIn"
    style="background-color: rgba(0,0,0,0.3); z-index: 1000;"
    @click.stop="hide"
  >
    <slot></slot>
  </view>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
    }
  },
  methods: {
    show() {
      this.isShow = true
    },
    hide() {
      this.isShow = false
    },
  },
}
</script>

<style scoped></style>
