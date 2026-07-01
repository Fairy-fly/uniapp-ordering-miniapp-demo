<template>
  <view class="page">
    <view class="success card">
      <view class="check">✓</view>
      <text class="title">支付成功</text>
      <text class="desc">订单已生成，支付过程为课程 mock 演示。</text>
      <view v-if="order" class="order-info">
        <text>订单号：{{ order.orderNo }}</text>
        <text>实付款：¥{{ order.payAmount }}</text>
        <text>状态：{{ order.statusText }}</text>
      </view>
      <button class="primary-btn" @tap="goDetail">查看订单详情</button>
      <button class="ghost-btn home-btn" @tap="goHome">返回首页</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      orderId: ''
    }
  },
  computed: {
    order() {
      return this.$store.state.order.currentOrder
    }
  },
  onLoad(options) {
    this.orderId = options.id || ''
    if (this.orderId) {
      this.$store.dispatch('order/fetchOrderDetail', this.orderId)
    }
  },
  methods: {
    goDetail() {
      uni.redirectTo({
        url: `/pages/myorder/detail?id=${this.orderId}`
      })
    },
    goHome() {
      uni.switchTab({
        url: '/pages/index/index'
      })
    }
  }
}
</script>

<style scoped>
.success {
  padding: 56rpx 34rpx;
  text-align: center;
}

.check {
  width: 132rpx;
  height: 132rpx;
  margin: 0 auto 24rpx;
  border-radius: 50%;
  background: #27ae60;
  color: #ffffff;
  font-size: 82rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title {
  display: block;
  font-size: 40rpx;
  font-weight: 800;
}

.desc {
  display: block;
  margin-top: 18rpx;
  color: #6d5e56;
}

.order-info {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
  margin: 32rpx 0;
  padding: 22rpx;
  border-radius: 16rpx;
  background: #f8f2ed;
  color: #5c5048;
  text-align: left;
  font-size: 26rpx;
}

.home-btn {
  width: 100%;
  margin-top: 18rpx;
}
</style>
