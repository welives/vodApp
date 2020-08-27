<template>
  <view @touchmove.stop.prevent="() => {}">
    <navigator v-if="!user" url="../login/login">
      <view class="p-3 flex align-center">
        <image
          class="rounded-circle flex-shrink"
          src="/static/demo/6.jpg"
          style="width: 120rpx; height: 120rpx;"
        ></image>
        <view class="pl-3 flex flex-column flex-1">
          <view class="font-md text-main">
            请先登入
          </view>
        </view>
      </view>
    </navigator>
    <view v-else class="p-3 flex align-center">
      <navigator :url="'../user-space/user-space?user_id=' + user.id">
        <image
          class="rounded-circle flex-shrink"
          :src="user.avatar || '/static/demo/6.jpg'"
          style="width: 120rpx; height: 120rpx;"
        ></image>
      </navigator>
      <view class="pl-3 flex flex-column flex-1">
        <view class="font-md text-dark">
          {{ user.nickname || user.username }}
          <text class="font-sm text-light-muted ml-3">{{ user.sex }}</text>
        </view>
        <text class="font-sm text-light-muted">{{ user.desc || '这个人很懒,什么都没写' }}</text>
      </view>
    </view>
    <view class="f-divider"></view>
    <block v-if="user">
      <f-list-item
        icon="iconshipin"
        title="我的作品"
        :rightText="videoCount + '个'"
        :showRightIcon="false"
        @click="navigateTo('user-video')"
      ></f-list-item>
      <f-list-item icon="iconshoucang" title="收藏" @click="navigateTo('user-collect')"></f-list-item>
      <f-list-item
        icon="iconguanzhu"
        title="关注"
        :rightText="followCount"
        @click="navigateTo('user-follow')"
      ></f-list-item>
      <f-list-item icon="iconlishi" title="历史记录" @click="navigateTo('user-history')"></f-list-item>
      <!-- #ifdef MP -->
      <f-list-item icon="iconshezhi" title="我的设置" @click="navigateTo('user-set')"></f-list-item>
      <!-- #endif -->
      <view class="f-divider"></view>
      <view class="px-3 py-2">
        <main-big-button @click="add">立即投稿</main-big-button>
      </view>
    </block>
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
              @click="navigateTo('create')"
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
import { mapState } from 'vuex'
export default {
  components: {
    fListItem,
    mainBigButton,
    fPopup,
  },
  data() {
    return {
      followCount: 0,
      fansCount: 0,
      videoCount: 0,
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
    }),
  },
  onShow() {
    this.$req.get('/user/statistics', { token: true, noJump: true, toast: false }).then((res) => {
      this.followCount = res.followCount
      this.videoCount = res.videoCount
    })
  },
  onNavigationBarButtonTap(e) {
    if (e.index === 0) {
      uni.navigateTo({
        url: '../user-set/user-set',
      })
    }
  },
  methods: {
    add() {
      this.$refs.popup.show()
    },
    hidePopup() {
      this.$refs.popup.hide()
    },
    navigateTo(path) {
      this.authJump({
        url: `/pages/${path}/${path}`,
      })
      this.hidePopup()
    },
  },
}
</script>

<style scoped></style>
