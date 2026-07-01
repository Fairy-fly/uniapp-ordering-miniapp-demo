<template>
  <view class="page">
    <view v-if="orders.length" class="order-list">
      <view v-for="order in orders" :key="order.id" class="order-card card" @tap="goDetail(order)">
        <view class="order-head">
          <text class="shop-name">{{ order.shop.name }}</text>
          <text class="status">{{ order.statusText }}</text>
        </view>
        <view class="goods-line">
          <text>{{ order.items.map((item) => item.name).join('、') }}</text>
        </view>
        <view class="order-foot">
          <text>{{ formatDateTime(order.createdAt) }}</text>
          <text class="amount">¥{{ order.payAmount }}</text>
        </view>
      </view>
    </view>
    <empty-state v-else title="暂无已付款订单" desc="提交订单后会显示在这里" />
  </view>
</template>

<script>
import EmptyState from '@/components/empty-state/index.vue'
import { formatDateTime } from '@/utils/format'

export default {
  components: {
    EmptyState
  },
  computed: {
    orders() {
      return this.$store.state.order.list
    }
  },
  onShow() {
    this.$store.dispatch('order/loadOrdersFromStorage')
  },
  methods: {
    formatDateTime,
    goDetail(order) {
      uni.navigateTo({
        url: `/pages/myorder/detail?id=${order.id}`
      })
    }
  }
}
</script>

<style scoped>
.order-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.order-card {
  padding: 24rpx;
}

.order-head,
.order-foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 18rpx;
}

.shop-name {
  font-size: 30rpx;
  font-weight: 700;
}

.status {
  color: #27ae60;
  font-size: 24rpx;
}

.goods-line {
  margin: 18rpx 0;
  color: #6d5e56;
  font-size: 26rpx;
  line-height: 1.5;
}

.order-foot {
  color: #8a7b72;
  font-size: 24rpx;
}

.amount {
  color: #ef3f28;
  font-size: 30rpx;
  font-weight: 700;
}
</style>
