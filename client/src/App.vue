<script>
export default {
  onLaunch: function() {
    console.log('App Launch')
    this.$store.dispatch('user/initUser')
  },
  onShow: function() {
    console.log('App Show')
  },
  onHide: function() {
    console.log('App Hide')
  },
}
</script>

<style>
/* #ifndef APP-PLUS-NVUE */
/* 引入官方样式库 */
@import url(./common/uni.css);
/* 引入animate动画库 */
@import url(./common/animate.min.css);
/* #endif */

/* 引入第三方UI样式库 */
@import url(./common/free.css);
/* 引入项目自定义全局样式库 */
@import url(./common/common.css);

/* #ifndef APP-PLUS-NVUE */
/* 引入自定义图标库 */
@import url(./common/iconfont.css);
/* #endif */
</style>
