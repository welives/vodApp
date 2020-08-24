<template>
  <view>
    <!-- 动态设置状态栏高度 -->
    <view :style="`height:${statusBarHeight}px;`"></view>
    <view class="flex align-center" style="height: 44px;" @click="back()">
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
        v-model="form.username"
      />
      <input
        type="password"
        name="password"
        class="uni-input mb-4 bg-light rounded"
        placeholder="请输入密码"
        placeholder-class="text-light-muted"
        v-model="form.password"
      />
      <input
        v-if="type === 'reg'"
        type="password"
        name="repassword"
        class="uni-input mb-4 bg-light rounded"
        placeholder="请输入确认密码"
        placeholder-class="text-light-muted"
        v-model="form.repassword"
      />
    </view>
    <view class="px-4">
      <main-big-button @click="submit">
        <text class="font-md">{{ type === 'login' ? '登 入' : '注 册' }}</text>
      </main-big-button>
    </view>
    <view class="flex px-4 mt-4">
      <text
        class="ml-auto px-2 text-light-muted"
        @click="changeType"
        v-html="
          type === 'login'
            ? `还没账号？<text class='text-main'>去注册</text>`
            : `已有账号，<text class='text-main'>去登入</text>`
        "
      ></text>
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
import common from '@/common/mixins/common'
import mainBigButton from '@/components/common/main-big-button'
export default {
  components: {
    mainBigButton,
  },
  mixins: [common],
  data() {
    return {
      type: 'login',
      statusBarHeight: 0,
      form: { username: '', password: '', repassword: '' },
    }
  },
  onLoad() {
    this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight
  },
  methods: {
    changeType() {
      this.type = this.type === 'login' ? 'reg' : 'login'
      this.form = { username: '', password: '', repassword: '' }
    },
    // 注册||登入
    submit() {
      let msg = this.type === 'reg' ? '注册' : '登入'
      this.$req.post('/' + this.type, this.form).then((res) => {
        if (this.type === 'reg') {
          this.changeType()
        } else {
          this.$store.dispatch('user/login', res)
          this.back()
        }
        uni.showToast({
          title: msg + '成功',
          icon: 'none',
        })
      })
    },
    // 第三方登入
    socialLogin(type) {
      console.log(type)
    },
  },
}
</script>

<style scoped></style>
