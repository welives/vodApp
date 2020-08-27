<template>
  <view style="line-height: 0;">
    <image src="/static/demo/list2/3.jpg" mode="aspectFill" style="width: 100%; height: 160px;"></image>
    <view class="border-bottom" style="height: 180px;">
      <view class="flex align-center justify-between px-3 py-1">
        <image
          :src="user.avatar || '/static/demo/6.jpg'"
          class="rounded-circle"
          style="width: 130rpx; height: 130rpx; margin-top: -80rpx;"
        ></image>
        <view
          v-if="user.id !== user_id"
          class="flex align-center justify-center rounded line-h"
          :class="isFollow ? 'bg-light text-dark' : 'bg-main text-white'"
          :hover-class="isFollow ? 'bg-hover-light' : 'bg-main-hover'"
          @click="doFollow(user.id)"
        >
          <text class="px-2 py-1">{{ isFollow ? '取消关注' : '关注' }}</text>
        </view>
      </view>
      <view class="flex align-center px-3 my-1">
        <view class="font-md font-weight-bold text-main">{{ user.nickname || user.username }}</view>
        <text class="font-sm text-light-muted ml-2">UID: {{ user.id }}</text>
      </view>
      <view class="flex align-center px-3 my-1">
        <view class="rounded font-sm bg-main text-white px-1">年度大会员</view>
      </view>
      <view class="flex align-center px-3 my-1">
        <view class="font text-main flex align-center mr-3"
          >{{ followCount }}<text class="ml-1 font-sm text-light-muted">关注</text></view
        >
        <view class="font text-main flex align-center"
          >{{ fansCount }}<text class="ml-1 font-sm text-light-muted">粉丝</text></view
        >
      </view>
      <view class="px-3 my-1">
        <view class="font-sm text-light-muted text-ellipsis" style="line-height: 1.5;">{{
          user.desc || '这个人很懒,什么都没有写'
        }}</view>
      </view>
    </view>
    <scroll-view scroll-y :style="'height:' + scrollHeight + 'px;'" style="position: relative;">
      <!-- 选项卡 开始 -->
      <view
        class="flex align-center bg-white position-absolute"
        style="height: 44px; top: 0; left: 0; right: 0; z-index: 100;"
      >
        <view
          class="flex-1 flex align-center justify-center"
          v-for="(item, index) in tabBars"
          :key="index"
          @click="tabIndex = index"
        >
          <text class="font" :class="tabIndex === index ? 'text-main' : ''">{{ item.name }}</text>
        </view>
      </view>
      <!-- 选项卡 结束 -->
      <swiper
        :current="tabIndex"
        :duration="300"
        @change="changeSwiper"
        style="position: absolute; top: 44px; width: 100%;"
        :style="'height:' + (scrollHeight - 44) + 'px;'"
      >
        <swiper-item v-for="(tab, tabI) in tabBars" :key="tabI">
          <scroll-view scroll-y style="height: 100%;" @scrolltolower="scrolltolower(tabI)">
            <view class="f-divider"></view>
            <view class="px-1" v-for="(item, index) in list[tabI].data" :key="index">
              <media-list :item="item" :index="index"></media-list>
            </view>
            <!-- 无数据提示 -->
            <view
              v-if="list[tabI].data.length === 0"
              class="flex align-center justify-center text-light-muted"
              style="height: 200rpx;"
              >暂无数据...</view
            >
            <!-- 上拉加载 -->
            <view
              v-else-if="list[tabI].data.length > 10"
              class="flex align-center justify-center text-light-muted"
              hover-class="bg-light"
              style="height: 80rpx;"
              >{{ tab.loadText }}</view
            >
          </scroll-view>
        </swiper-item>
      </swiper>
    </scroll-view>
  </view>
</template>

<script>
import { mapState } from 'vuex'
import mediaList from '@/components/common/media-list'
export default {
  components: {
    mediaList,
  },
  data() {
    return {
      id: 0,
      user: {
        avatar: '',
        desc: '',
        email: '',
        id: 0,
        nickname: '',
        phone: '',
        sex: '未知',
        username: '',
      },
      followCount: 0,
      fansCount: 0,
      isFollow: false,
      tabIndex: 0,
      tabBars: [
        {
          url: 'video_list',
          name: '作品',
          page: 1,
          loadText: '上拉加载更多...',
        },
      ],
      scrollHeight: 0,
      list: [{ data: [] }],
    }
  },
  computed: {
    ...mapState({
      // 当前登入用户id
      user_id: (state) => state.user.user.id,
    }),
    tab() {
      return this.tabBars[this.tabIndex]
    },
    url() {
      let t = this.tab
      return `/${t.url}/${t.page}/?user_id=${this.id}`
    },
  },
  onLoad(e) {
    if (!e.user_id) {
      uni.showToast({
        title: '非法参数',
        icon: 'none',
      })
      return uni.navigateBack({
        delta: 1,
      })
    }
    this.id = e.user_id
    this.getUserInfo(e.user_id)
    this.getData()
    let res = uni.getSystemInfoSync()
    this.scrollHeight = res.windowHeight - res.statusBarHeight - 44
  },
  methods: {
    getUserInfo(user_id) {
      return this.$req.get(`/user/info?user_id=${user_id}`, { token: true, noJump: true, toast: false }).then((res) => {
        this.user = res.user
        this.followCount = res.followCount
        this.fansCount = res.fansCount
        this.isFollow = res.isFollow
      })
    },
    getData() {
      let index = this.tabIndex
      let page = this.tabBars[index].page
      return this.$req
        .get(this.url)
        .then((res) => {
          this.list[index].data = page === 1 ? res : [...this.list[index].data, ...res]
          this.tabBars[index].loadText = res.length === 10 ? '上拉加载更多...' : '真的一滴都没有了'
        })
        .catch((err) => {
          if (page > 1) {
            this.tabBars[index].page--
          }
          this.tabBars[index].loadText = '上拉加载更多...'
        })
    },
    changeSwiper(e) {
      this.tabIndex = e.detail.current
      this.tabBars[this.tabIndex].page = 1
      this.getData()
    },
    // scroll-view组件的触底事件
    scrolltolower(index) {
      this.tabBars[index].page++
      this.getData()
    },
    doFollow(follow_id) {
      if (!this.user_id) {
        return uni.showToast({
          title: '请先登入',
          icon: 'none',
        })
      }
      this.$req.post(`/user/follow`, { follow_id }, { token: true }).then((res) => {
        this.isFollow = !this.isFollow
        uni.showToast({
          title: res.isFollow ? '关注成功' : '取消关注',
          icon: 'none',
        })
      })
    },
  },
}
</script>

<style scoped></style>
