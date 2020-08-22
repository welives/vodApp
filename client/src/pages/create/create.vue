<template>
  <view>
    <view class="bg-light position-relative" hover-class="bg-hover-light" style="height: 350rpx;" @click="upload">
      <image v-if="form.cover" :src="form.cover" mode="aspectFill" style="width: 100%; height: 350rpx;"></image>
      <view
        class="flex flex-column align-center justify-center position-absolute left-0 right-0 top-0 bottom-0"
        style="background-color: rgba(255,255,255,0.2);"
      >
        <text v-if="!form.cover" class="iconfont iconjia" style="font-size: 50rpx;"></text>
        <text class="font text-dark">点击{{ form.cover ? '切换' : '添加' }}封面图</text>
      </view>
    </view>
    <form-item label="标题">
      <input
        class="mr-5 w-100"
        type="text"
        placeholder="请填写标题"
        placeholder-class="text-light-muted"
        v-model="form.title"
      />
    </form-item>
    <picker mode="selector" :range="range" @change="change">
      <form-item label="分类" rightIcon>
        <input
          class="mr-5 w-100"
          type="text"
          placeholder="请选择分类"
          placeholder-class="text-light-muted"
          disabled
          v-model="form.category"
        />
      </form-item>
    </picker>
    <form-item label="简介">
      <textarea
        class="mr-5 py-3 w-100"
        placeholder="请填写简介"
        placeholder-class="text-light-muted"
        v-model="form.desc"
      ></textarea>
    </form-item>
    <!-- #ifdef MP -->
    <view class="py-3 px-2">
      <main-big-button @click="submit">发布</main-big-button>
    </view>
    <!-- #endif -->
  </view>
</template>

<script>
import formItem from '@/components/common/form-item'
import mainBigButton from '@/components/common/main-big-button'
export default {
  components: {
    formItem,
    mainBigButton,
  },
  data() {
    return {
      form: { cover: '', title: '', category: '', desc: '' },
      range: ['分类1', '分类2', '分类3'],
    }
  },
  methods: {
    upload() {
      uni.chooseImage({
        count: 1, //默认9
        sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
        success: (res) => {
          this.form.cover = res.tempFilePaths[0]
        },
      })
    },
    change(e) {
      console.log(e)
      this.form.category = this.range[e.detail.value]
    },
    submit() {
      console.log('发布')
    },
  },
}
</script>

<style scoped></style>
