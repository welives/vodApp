<template>
  <view style="line-height: 0;">
    <block v-for="(item, index) in list" :key="index">
      <!-- 不处于编辑状态 -->
      <view v-if="!item.isEdit" class="bg-white">
        <video :src="item.url" style="height: 350rpx; width: 100%;" controls></video>
        <form-item label="标题">
          <text class="font">{{ item.title }}</text>
        </form-item>
        <view class="flex text-center" style="height: 100rpx;">
          <view class="flex-1" hover-class="bg-light" style="line-height: 100rpx;" @click="changeEdit(item)">修改</view>
          <view class="flex-1" hover-class="bg-light" style="line-height: 100rpx;" @click="deleteItem(item)">删除</view>
        </view>
      </view>
      <!-- 处于编辑状态 -->
      <view v-else class="bg-white">
        <view class="bg-light position-relative" hover-class="bg-hover-light" style="height: 350rpx;">
          <video v-if="item.url" :src="item.url" style="height: 350rpx; width: 100%;" controls></video>
          <view
            v-if="!item.url"
            class="flex flex-column align-center justify-center position-absolute left-0 right-0 top-0 bottom-0"
            style="background-color: rgba(255,255,255,0.2);"
            @click="upload(item)"
          >
            <text class="iconfont iconjia" style="font-size: 50rpx;"></text>
            <text class="font text-dark">点击添加视频</text>
          </view>
        </view>
        <view
          v-if="item.url"
          class="flex align-center justify-center"
          hover-class="bg-light"
          style="height: 100rpx;"
          @click="upload(item)"
          >点击更换视频</view
        >
        <form-item label="标题">
          <input
            class="mr-5 w-100"
            type="text"
            placeholder="请填写标题"
            placeholder-class="text-light-muted"
            v-model="item.title"
          />
        </form-item>
        <form-item label="简介">
          <textarea
            class="mr-5 py-3 w-100"
            placeholder="请填写简介"
            placeholder-class="text-light-muted"
            v-model="item.desc"
          ></textarea>
        </form-item>
        <view class="flex text-center" style="height: 100rpx;">
          <view
            class="flex-1 bg-main text-white"
            hover-class="bg-main-hover"
            style="line-height: 100rpx;"
            @click="submit(item)"
            >完成</view
          >
          <view
            v-if="item.url"
            class="flex-1"
            hover-class="bg-light"
            style="line-height: 100rpx;"
            @click="changeEdit(item)"
            >取消</view
          >
          <view v-else class="flex-1" hover-class="bg-light" style="line-height: 100rpx;" @click="list.splice(index, 1)"
            >取消</view
          >
        </view>
      </view>
      <view class="f-divider"></view>
    </block>
    <!-- 添加视频 -->
    <view
      v-if="!showButton"
      class="flex align-center justify-center bg-main text-white"
      hover-class="bg-main-hover"
      style="height: 100rpx;"
      @click="add"
    >
      <text class="iconfont iconjia mr-1"></text>
      添加新章节
    </view>
  </view>
</template>

<script>
import formItem from '@/components/common/form-item'
export default {
  components: {
    formItem,
  },
  data() {
    return {
      id: 0,
      list: [],
    }
  },
  computed: {
    showButton() {
      return this.list.filter((item) => item.isEdit).length
    },
  },
  onLoad(e) {
    if (!e.id) {
      uni.navigateBack({
        delta: 1,
      })
      uni.showToast({
        title: '非法参数',
        icon: 'none',
      })
    }
    e.id && (this.id = e.id)
    this.getData()
  },
  methods: {
    getData() {
      let url = `/video_detail/${this.id}`
      uni.showLoading({ title: '加载中...' })
      return this.$req.get(url, { token: true }).then((res) => {
        uni.hideLoading()
        this.list = res.map((item) => {
          item.isEdit = false
          return item
        })
      })
    },
    // 提交到后端
    submit(item) {
      let url = item.id ? `/video_detail/${item.id}` : `/video_detail`
      let msg = item.id ? '修改' : '创建'
      item.url =
        'https://douyinzcmcss.oss-cn-shenzhen.aliyuncs.com/%E8%AF%BE%E6%97%B61.%20%E9%A1%B9%E7%9B%AE%E4%BB%8B%E7%BB%8D.mp4'
      this.$req
        .post(
          url,
          {
            title: item.title,
            url: item.url,
            video_id: this.id,
            desc: item.desc,
          },
          { token: true },
        )
        .then((res) => {
          item.isEdit = false
          uni.showToast({
            title: msg + '成功',
            icon: 'none',
          })
          this.getData()
        })
    },
    changeEdit(item) {
      item.isEdit = !item.isEdit
    },
    // 删除
    deleteItem(item) {
      uni.showModal({
        content: '是否要删除该视频？',
        success: (res) => {
          if (res.confirm) {
            this.$req.get(`/video_detail/destroy/${item.id}`, { token: true }).then((res) => {
              uni.showToast({
                title: '删除成功',
                icon: 'none',
              })
              let index = this.list.findIndex((v) => v.id === item.id)
              this.list.splice(index, 1)
            })
          }
        },
      })
    },
    // 添加章节
    add() {
      this.list.push({ url: '', title: '', desc: '', isEdit: true })
    },
    // 上传视频
    upload(item) {
      uni.chooseVideo({
        count: 1,
        sourceType: ['camera', 'album'],
        success: (res) => {
          item.url = res.tempFilePath
        },
      })
    },
  },
}
</script>

<style scoped></style>
