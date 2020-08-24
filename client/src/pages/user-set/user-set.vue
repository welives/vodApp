<template>
  <view class="px-4">
    <main-big-button v-if="user" @click="logout">
      <text class="font-md">退出</text>
    </main-big-button>
  </view>
</template>

<script>
import { mapState } from 'vuex'
import mainBigButton from '@/components/common/main-big-button'
export default {
  components: {
    mainBigButton,
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
    }),
  },
  methods: {
    logout() {
      this.$store.dispatch('user/logout').then((res) => {
        uni.switchTab({
          url: '../mine/mine',
        })
        uni.showToast({
          title: '退出成功',
          icon: 'none',
        })
      })
    },
  },
}
</script>

<style scoped></style>
