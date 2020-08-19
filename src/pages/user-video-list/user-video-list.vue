<template>
  <view style="min-height: 100vh;">
    <block v-for="(item, index) in list" :key="index">
      <!-- 不处于编辑状态 -->
      <view v-if="!item.isEdit" class="bg-white">
        <video :src="item.video" style="height: 350rpx; width: 100%;" controls></video>
        <form-item label="标题">
          <text class="font">{{ item.title }}</text>
        </form-item>
        <view class="flex text-center" style="height: 100rpx;">
          <view class="flex-1" hover-class="bg-light" style="line-height: 100rpx;" @click="changeEdit(item)">修改</view>
          <view class="flex-1" hover-class="bg-light" style="line-height: 100rpx;" @click="deleteItem(index)"
            >删除</view
          >
        </view>
      </view>
      <!-- 处于编辑状态 -->
      <view v-else class="bg-white">
        <view class="bg-light position-relative" hover-class="bg-hover-light" style="height: 350rpx;">
          <video v-if="item.video" :src="item.video" style="height: 350rpx; width: 100%;" controls></video>
          <view
            v-if="!item.video"
            class="flex flex-column align-center justify-center position-absolute left-0 right-0 top-0 bottom-0"
            style="background-color: rgba(255,255,255,0.2);"
            @click="upload(item)"
          >
            <text class="iconfont iconjia" style="font-size: 50rpx;"></text>
            <text class="font text-dark">点击添加视频</text>
          </view>
        </view>
        <view
          v-if="item.video"
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
            v-if="item.video"
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
      list: [
        {
          video:
            'https://douyinzcmcss.oss-cn-shenzhen.aliyuncs.com/%E8%AF%BE%E6%97%B61.%20%E9%A1%B9%E7%9B%AE%E4%BB%8B%E7%BB%8D.mp4',
          title: '测试视频',
          desc: '测试',
          isEdit: false,
        },
      ],
    }
  },
  computed: {
    showButton() {
      return this.list.filter((item) => item.isEdit).length
    },
  },
  methods: {
    // 提交到后端
    submit(item) {
      item.isEdit = false
    },
    changeEdit(item) {
      item.isEdit = !item.isEdit
    },
    // 删除
    deleteItem(index) {
      uni.showModal({
        content: '是否要删除该视频？',
        success: (res) => {
          if (res.confirm) {
            this.list.splice(index, 1)
          }
        },
      })
    },
    // 添加章节
    add() {
      this.list.push({ video: '', title: '', desc: '', isEdit: true })
    },
    // 上传视频
    upload(item) {
      uni.chooseVideo({
        count: 1,
        sourceType: ['camera', 'album'],
        success: (res) => {
          item.video = res.tempFilePath
        },
      })
    },
  },
}
</script>

<style scoped></style>
