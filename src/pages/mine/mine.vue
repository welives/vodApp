<template>
  <view>
    <view class="p-3 flex align-center">
      <navigator url="../user-space/user-space">
        <image
          class="rounded-circle flex-shrink"
          src="/static/demo/6.jpg"
          mode=""
          style="width: 120rpx; height: 120rpx;"
        ></image>
      </navigator>
      <view class="pl-3 flex flex-column flex-1">
        <view class="font-md text-dark">
          jandan
          <text class="font-sm text-muted ml-3">广西 南宁</text>
        </view>
        <text class="font-sm text-muted">菜鸡前端</text>
      </view>
    </view>
    <view class="f-divider"></view>
    <f-list-item
      icon="iconshipin"
      title="我的作品"
      rightText="26个"
      :showRightIcon="false"
      @click="navigateTo('user-video')"
    ></f-list-item>
    <f-list-item icon="iconshoucang1" title="收藏" @click="navigateTo('user-collect')"></f-list-item>
    <f-list-item icon="iconguanzhu" title="关注" rightText="365"></f-list-item>
    <f-list-item icon="iconlishi" title="历史记录"></f-list-item>
    <view class="f-divider"></view>
    <view class="px-3 py-2">
      <main-big-button @click="add">立即投稿</main-big-button>
    </view>
    <!-- 弹框 -->
    <f-popup ref="popup">
      <view class="position-absolute left-0 bottom-0 right-0 bg-white" @click.stop="() => {}">
        <view class="flex" style="height: 200rpx;">
          <view class="flex-1 flex align-center justify-center flex-column" hover-class="bg-light">
            <text
              class="iconfont icondingdanwenjian bg-primary text-white rounded-circle flex align-center justify-center"
              style="width: 80rpx; height: 80rpx;"
              @click="navigateTo('create')"
            >
            </text>
            <text class="font mt-1 text-muted">单集</text>
          </view>
          <view class="flex-1 flex align-center justify-center flex-column" hover-class="bg-light">
            <text
              class="iconfont icon918caidan_wenjian bg-main text-white rounded-circle flex align-center justify-center"
              style="width: 80rpx; height: 80rpx;"
            ></text>
            <text class="font mt-1 text-muted">连载</text>
          </view>
        </view>
        <view class="f-divider"></view>
        <view
          class="py-2 flex align-center justify-center font-md text-muted"
          hover-class="bg-light"
          @click.stop="hidePopup"
          >取消</view
        >
      </view>
    </f-popup>
  </view>
</template>

<script>
import fListItem from '@/components/common/f-list-item'
import mainBigButton from '@/components/common/main-big-button'
import fPopup from '@/components/common/f-popup'
export default {
  components: {
    fListItem,
    mainBigButton,
    fPopup,
  },
  data() {
    return {}
  },
  methods: {
    add() {
      this.$refs.popup.show()
    },
    hidePopup() {
      this.$refs.popup.hide()
    },
    navigateTo(path) {
      uni.navigateTo({
        url: `/pages/${path}/${path}`,
      })
      this.hidePopup()
    },
  },
}
</script>

<style scoped></style>
