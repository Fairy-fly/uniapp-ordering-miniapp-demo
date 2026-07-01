<template>
  <view class="page">
    <view class="profile-card card">
      <image class="avatar" :src="userAvatar" mode="aspectFit" />
      <view class="profile-main">
        <text class="nickname">{{ isLogin ? userInfo.nickname : '未登录会员' }}</text>
        <text class="phone">{{ isLogin && userInfo.cellphone ? userInfo.cellphone : '登录后可查看订单和资料' }}</text>
      </view>
      <button v-if="!isLogin" class="ghost-btn login-btn" @tap="goLogin">登录</button>
    </view>

    <view class="grid card">
      <view class="grid-item" @tap="goOrders">
        <text class="num">{{ orders.length }}</text>
        <text>已付款订单</text>
      </view>
      <view class="grid-item" @tap="goProfile">
        <text class="num">资料</text>
        <text>个人中心</text>
      </view>
      <view class="grid-item" @tap="goBind">
        <text class="num">手机</text>
        <text>绑定入口</text>
      </view>
    </view>

    <view class="menu card">
      <view class="menu-row" @tap="goOrders">
        <text>我的订单</text>
        <view class="menu-chevron"></view>
      </view>
      <view class="menu-row" @tap="goProfile">
        <text>修改个人资料</text>
        <view class="menu-chevron"></view>
      </view>
      <view class="menu-row" @tap="goBind">
        <text>绑定手机号</text>
        <view class="menu-chevron"></view>
      </view>
      <view v-if="isLogin" class="menu-row danger" @tap="logout">
        <text>安全退出登录</text>
        <view class="menu-chevron"></view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo || {}
    },
    isLogin() {
      return this.$store.getters['user/isLogin']
    },
    userAvatar() {
      return this.userInfo.avatar || '/static/images/avatar.svg'
    },
    orders() {
      return this.$store.state.order.list
    }
  },
  onShow() {
    this.$store.dispatch('user/loadUserFromStorage')
    this.$store.dispatch('order/loadOrdersFromStorage')
  },
  methods: {
    goLogin() {
      uni.navigateTo({
        url: '/pages/login/index?redirect=%2Fpages%2Fmy%2Findex'
      })
    },
    goOrders() {
      uni.navigateTo({
        url: '/pages/myorder/index'
      })
    },
    goProfile() {
      uni.navigateTo({
        url: '/pages/profile/index'
      })
    },
    goBind() {
      uni.navigateTo({
        url: '/pages/bind_cellphone/index'
      })
    },
    logout() {
      this.$store.dispatch('user/logout')
      uni.showToast({
        title: '已退出登录',
        icon: 'success'
      })
    }
  }
}
</script>

<style scoped>
.profile-card {
  display: flex;
  align-items: center;
  gap: 20rpx;
  padding: 28rpx;
}

.avatar {
  width: 118rpx;
  height: 118rpx;
  border-radius: 50%;
  background: #fff1e8;
  flex-shrink: 0;
}

.profile-main {
  flex: 1;
  min-width: 0;
}

.nickname {
  display: block;
  font-size: 34rpx;
  font-weight: 800;
}

.phone {
  display: block;
  margin-top: 10rpx;
  color: #8a7b72;
  font-size: 24rpx;
}

.login-btn {
  width: 112rpx;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 24rpx;
  padding: 24rpx 0;
}

.grid-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10rpx;
  color: #6d5e56;
  font-size: 24rpx;
}

.num {
  color: #f05a28;
  font-size: 32rpx;
  font-weight: 800;
}

.menu {
  margin-top: 24rpx;
  padding: 0 24rpx;
}

.menu-row {
  min-height: 96rpx;
  border-bottom: 1rpx solid #f0e5dd;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #2e2520;
  font-size: 28rpx;
}

.menu-row:last-child {
  border-bottom: 0;
}

.menu-chevron {
  width: 18rpx;
  height: 18rpx;
  border-top: 3rpx solid #b3a69f;
  border-right: 3rpx solid #b3a69f;
  transform: rotate(45deg);
  flex-shrink: 0;
}

.danger {
  color: #e64340;
}
</style>
