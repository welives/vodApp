export default {
  filters: {
    // 格式化视频时长
    formatVideoTime(data) {
      let hours = Math.floor(data / 3600) < 10 ? '0' + Math.floor(data / 3600) : Math.floor(data / 3600),
        minutes = Math.floor((data / 60) % 60) < 10 ? '0' + Math.floor((data / 60) % 60) : Math.floor((data / 60) % 60),
        seconds = Math.floor(data % 60) < 10 ? '0' + Math.floor(data % 60) : Math.floor(data % 60)
      return data > 3600 ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`
    },
    formatQuality(value) {
      let quality = {
        SD: '标清',
        HD: '高清',
        FHD: '超清',
      }
      return quality[value]
    },
  },
  methods: {
    // 返回上一页
    back(step = 1) {
      uni.navigateBack({
        delta: step,
      })
    },
  },
}
