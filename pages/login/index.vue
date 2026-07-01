<template>
  <view class="page login-page">
    <view class="login-card card">
      <image class="avatar" src="/static/images/avatar.svg" mode="aspectFit" />
      <text class="title">会员登录</text>
      <text class="desc">本课程项目模拟微信登录，登录后可提交订单、查看个人中心和绑定手机号。</text>
      <button class="primary-btn" :loading="loading" @tap="login">微信登录模拟</button>
      <button class="ghost-btn bind-entry" @tap="goBind">手机号绑定入口</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      redirect: ''
    }
  },
  computed: {
    loading() {
      return this.$store.state.user.loading
    }
  },
  onLoad(options) {
    this.redirect = options.redirect ? decodeURIComponent(options.redirect) : ''
  },
  methods: {
    async login() {
      await this.$store.dispatch('user/login')
      uni.showToast({
        title: '登录成功',
        icon: 'success'
      })
      setTimeout(() => {
        if (this.redirect) {
          if (this.redirect === '/pages/my/index') {
            uni.switchTab({ url: this.redirect })
          } else {
            uni.redirectTo({ url: this.redirect })
          }
          return
        }
        uni.switchTab({
          url: '/pages/my/index'
        })
      }, 500)
    },
    goBind() {
      uni.navigateTo({
        url: '/pages/bind_cellphone/index'
      })
    }
  }
}
</script>

<style scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-card {
  width: 100%;
  padding: 56rpx 36rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.avatar {
  width: 156rpx;
  height: 156rpx;
  border-radius: 50%;
  margin-bottom: 24rpx;
}

.title {
  font-size: 40rpx;
  font-weight: 800;
}

.desc {
  margin: 20rpx 0 36rpx;
  color: #6d5e56;
  line-height: 1.6;
  text-align: center;
}

.bind-entry {
  width: 100%;
  margin-top: 18rpx;
}
</style>
