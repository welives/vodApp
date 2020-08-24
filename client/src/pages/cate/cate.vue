<template>
  <view>
    <!-- #ifdef MP -->
    <!-- 自定义导航栏 -->
    <view class="flex align-center fixed-top bg-white" style="height: 44px;">
      <!-- 搜索框 -->
      <view class="flex align-center flex-1 mx-2 px-1 rounded" style="background-color: #F6F7F8; color: #959FA0;">
        <text class="iconfont iconsousuokuang"></text>
        <text class="ml-1">uni-app视频点播app&小程序项目实战</text>
      </view>
    </view>
    <view style="height: 44px;"></view>
    <!-- #endif -->

    <card title="热门分类" :showRefresh="false">
      <scroll-view scroll-x class="scroll-row">
        <icon-cate v-for="(item, index) in list" :key="index" :item="item" :index="index"></icon-cate>
      </scroll-view>
    </card>
    <view class="f-divider"></view>
    <card title="全部分类" :showRefresh="false">
      <icon-cate v-for="(item, index) in list" :key="index" :item="item" :index="index"></icon-cate>
    </card>
  </view>
</template>

<script>
import card from '@/components/common/card'
import iconCate from '@/components/common/icon-cate'
export default {
  components: {
    card,
    iconCate,
  },
  data() {
    return {
      list: [],
    }
  },
  onLoad() {
    this.getData()
  },
  // 监听下拉刷新事件
  onPullDownRefresh() {
    this.getData()
      .then((res) => {
        uni.stopPullDownRefresh()
        uni.showToast({
          title: '刷新成功',
          icon: 'none',
        })
      })
      .catch((err) => {
        uni.stopPullDownRefresh()
      })
  },
  methods: {
    getData() {
      uni.showLoading({ title: '加载中...' })
      return this.$req
        .get('/category')
        .then((res) => {
          uni.hideLoading()
          this.list = res
        })
        .catch((err) => {
          uni.hideLoading()
        })
    },
  },
}
</script>

<style></style>
