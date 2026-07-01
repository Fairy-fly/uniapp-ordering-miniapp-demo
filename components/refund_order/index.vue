<template>
  <view class="refund card">
    <view class="head">
      <text class="title">退款申请</text>
      <text class="status">{{ submitted ? '已提交' : '可申请' }}</text>
    </view>
    <view class="reason-list">
      <text
        v-for="item in reasons"
        :key="item"
        :class="['reason', reason === item ? 'active' : '']"
        @tap="reason = item"
      >
        {{ item }}
      </text>
    </view>
    <button class="primary-btn refund-btn" @tap="submitRefund">
      {{ submitted ? '查看退款订单' : '提交退款申请' }}
    </button>
  </view>
</template>

<script>
export default {
  name: 'RefundOrder',
  props: {
    order: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      submitted: false,
      reason: '临时有事不需要了',
      reasons: ['临时有事不需要了', '商家出餐太慢', '地址填写有误']
    }
  },
  methods: {
    submitRefund() {
      if (this.submitted) {
        uni.showToast({
          title: '退款订单为 mock 状态',
          icon: 'none'
        })
        return
      }
      this.submitted = true
      uni.showToast({
        title: '退款申请已提交',
        icon: 'success'
      })
    }
  }
}
</script>

<style scoped>
.refund {
  padding: 24rpx;
  margin-top: 24rpx;
}

.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title {
  font-size: 30rpx;
  font-weight: 700;
}

.status {
  color: #f05a28;
  font-size: 24rpx;
}

.reason-list {
  display: flex;
  flex-wrap: wrap;
  gap: 14rpx;
  margin-top: 20rpx;
}

.reason {
  padding: 14rpx 18rpx;
  border-radius: 28rpx;
  background: #f7f0ea;
  color: #6d5e56;
  font-size: 24rpx;
}

.reason.active {
  background: #fff1e8;
  color: #f05a28;
}

.refund-btn {
  margin-top: 22rpx;
  height: 78rpx;
  font-size: 28rpx;
}
</style>
