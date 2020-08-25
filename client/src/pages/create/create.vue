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
          v-model="categoryTitle"
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
      id: 0,
      form: { cover: '', title: '', category_id: 0, desc: '' },
      category: [],
      range: [],
    }
  },
  computed: {
    categoryTitle() {
      let index = this.category.findIndex((item) => item.id === this.form.category_id)
      if (index === -1) return ''
      return this.category[index].title
    },
  },
  onLoad(e) {
    e.title &&
      uni.setNavigationBarTitle({
        title: e.title,
      })
    if (e.data) {
      let item = JSON.parse(decodeURIComponent(e.data))
      this.id = item.id
      this.form = { cover: item.cover, title: item.title, category_id: item.category_id, desc: item.desc }
    }
    this.$req.get('/category').then((res) => {
      this.category = res
      this.range = res.map((item) => item.title)
    })
  },
  onNavigationBarButtonTap() {
    this.submit()
  },
  methods: {
    // 上传封面
    upload() {
      uni.chooseImage({
        count: 1, //默认9
        sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
        success: (res) => {
          uni.showLoading({ title: '上传中...' })
          this.$req.upload('/upload', { filePath: res.tempFilePaths[0] }).then((res) => {
            uni.hideLoading()
            this.form.cover = res.url
            uni.showToast({
              title: '上传成功',
              icon: 'none',
            })
          })
        },
      })
    },
    // 选择分类
    change(e) {
      this.form.category_id = this.category[e.detail.value].id
    },
    // 发布
    submit() {
      let url = this.id === 0 ? '/video' : `/video/${this.id}`
      let msg = this.id === 0 ? '发布' : '修改'
      this.$req.post(url, this.form, { token: true }).then((res) => {
        uni.showToast({
          title: msg + '成功',
          icon: 'none',
        })
        uni.navigateBack({ delta: 1 })
      })
    },
  },
}
</script>

<style scoped></style>
