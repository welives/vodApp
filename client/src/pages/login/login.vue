<template>
  <view>
    <!-- 动态设置状态栏高度 -->
    <view :style="'height:' + statusBarHeight + 'px;'"></view>
    <view class="flex align-center" style="height: 44px;" @click="back">
      <view
        class="flex align-center justify-center animate__animated animate__fast"
        hover-class="text-main animate__pulse"
        style="width: 44px; height: 44px;"
      >
        <text class="iconfont iconguanbi font-lg"></text>
      </view>
    </view>
    <!-- 登入表单 -->
    <view
      class="flex align-center justify-center font-lg font-weight-bold"
      style="margin-top: 100rpx; margin-bottom: 80rpx;"
      >欢迎回来</view
    >
    <view class="px-4">
      <input
        type="text"
        name="username"
        class="uni-input mb-4 bg-light rounded"
        placeholder="手机号/用户名/邮箱"
        placeholder-class="text-light-muted"
      />
      <input
        type="password"
        name="password"
        class="uni-input mb-4 bg-light rounded"
        placeholder="请输入密码"
        placeholder-class="text-light-muted"
      />
      <input
        v-if="type === 'reg'"
        type="password"
        name="repassword"
        class="uni-input mb-4 bg-light rounded"
        placeholder="请输入确认密码"
        placeholder-class="text-light-muted"
      />
    </view>
    <view class="px-4">
      <main-big-button>{{ type === 'login' ? '登入' : '注册' }}</main-big-button>
    </view>
    <view class="flex px-4 mt-4">
      <text class="ml-auto px-2 text-light-muted" @click="type = type === 'login' ? 'reg' : 'login'">{{
        type === 'login' ? '还没账号？去注册' : '已有账号，去登入'
      }}</text>
    </view>
    <view class="flex align-center justify-center py-5">
      <view class="" style="width: 100rpx; height: 2rpx; background-color: #e3e1dd;"></view>
      <view class="text-muted mx-2">社交账号登入</view>
      <view class="" style="width: 100rpx; height: 2rpx; background-color: #e3e1dd;"></view>
    </view>
    <view class="flex px-5">
      <view class="flex-1 flex align-center justify-center">
        <view
          class="rounded-circle bg-light flex align-center justify-center"
          style="width: 100rpx; height: 100rpx;"
          @click="socialLogin('wechat')"
        >
          <text class="iconfont iconweixin" style="font-size: 40rpx;"></text>
        </view>
      </view>
      <view class="flex-1 flex align-center justify-center">
        <view
          class="rounded-circle bg-light flex align-center justify-center"
          style="width: 100rpx; height: 100rpx;"
          @click="socialLogin('qq')"
        >
          <text class="iconfont iconQQ" style="font-size: 40rpx;"></text>
        </view>
      </view>
      <view class="flex-1 flex align-center justify-center">
        <view
          class="rounded-circle bg-light flex align-center justify-center"
          style="width: 100rpx; height: 100rpx;"
          @click="socialLogin('sina')"
        >
          <text class="iconfont iconxinlangweibo" style="font-size: 40rpx;"></text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import mainBigButton from '@/components/common/main-big-button'
export default {
  components: {
    mainBigButton,
  },
  data() {
    return {
      type: 'login',
      statusBarHeight: 0,
    }
  },
  onLoad() {
    this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight
  },
  methods: {
    socialLogin(type) {
      console.log(type)
    },
    back() {
      uni.navigateBack({
        delta: 1,
      })
    },
  },
}
</script>

<style scoped></style>
