<template>
  <view
    class="flex align-center position-relative"
    style="height: 44px;"
    @touchstart.stop="touchStart"
    @touchmove.stop="touchMove"
    @touchend.stop="touchEnd"
    @touchcancels.stop="touchCancel"
  >
    <view class="flex-1 rounded" style="height: 3px; background-color: rgba(255, 255, 255, 0.5);">
      <!-- 已播放的进度,通过 width 控制 -->
      <view class="bg-main" style="height: 3px;" :style="`width:${activeWidth}px;`"></view>
    </view>
    <!-- 当前进度位置,通过 left 控制 -->
    <view
      class="rounded-circle bg-main position-absolute"
      style="width: 15px; height: 15px;"
      :style="`left:${activeWidth}px;`"
    ></view>
  </view>
</template>

<script>
export default {
  inject: ['v'],
  props: {
    currentTime: {
      type: Number,
      default: 0,
    },
    duration: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      // 当前播放位置的进度条长度
      activeWidth: 0,
      // 进度条总长度
      totalWidth: 0,
      left: 0,
      // 进度条拖拽状态
      moveStatus: false,
    }
  },
  computed: {
    // 当前播放进度
    current() {
      return this.totalWidth ? (this.activeWidth / this.totalWidth) * this.duration : 0
    },
  },
  created() {
    this.left = 44
    // 全屏
    if (this.v.isFullScreen) {
      this.totalWidth = this.v.windowHeight - this.left - 44 * 3 - 80 - 15
    } else {
      // 非全屏
      this.totalWidth = this.v.windowWidth - this.left - 44 - 80 - 15
    }
    this.active()
  },
  watch: {
    currentTime(newValue, oldValue) {
      !this.moveStatus && this.active()
    },
  },
  methods: {
    // 计算当前的进度条长度
    active() {
      this.activeWidth = this.duration ? (this.currentTime / this.duration) * this.totalWidth : 0
    },
    touchStart(e) {
      if (!this.duration) return
      this.moveStatus = true
      if (this.v.isFullScreen) {
        this.activeWidth = e.changedTouches[0].screenY - this.left
      } else {
        this.activeWidth = e.changedTouches[0].screenX - this.left
      }
    },
    touchMove(e) {
      if (!this.duration) return
      let d = null
      if (this.v.isFullScreen) {
        d = e.changedTouches[0].screenY - this.left
      } else {
        d = e.changedTouches[0].screenX - this.left
      }
      d <= 0
        ? (this.activeWidth = 0)
        : d >= this.totalWidth
        ? (this.activeWidth = this.totalWidth)
        : (this.activeWidth = d)
      this.$emit('update', this.current)
    },
    touchEnd(e) {
      if (!this.duration) return
      this.moveStatus = false
      this.$emit('update', this.current)
    },
    touchCancel(e) {
      this.touchEnd(e)
    },
  },
}
</script>

<style scoped>
</style>
