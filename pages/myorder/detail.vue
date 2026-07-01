<template>
  <view class="page detail-page">
    <view v-if="order">
      <view class="card block">
        <view class="detail-head">
          <text class="status">{{ order.statusText }}</text>
          <text class="order-no">{{ order.orderNo }}</text>
        </view>
        <text class="time">{{ order.createdAt }}</text>
      </view>

      <view class="card block">
        <text class="shop">{{ order.shop.name }}</text>
        <view v-for="item in order.items" :key="item.id" class="goods-row">
          <image class="goods-image" :src="item.image" mode="aspectFill" />
          <view class="goods-main">
            <text class="goods-name">{{ item.name }}</text>
            <text class="count">x{{ item.count }}</text>
          </view>
          <text class="price">¥{{ item.price * item.count }}</text>
        </view>
      </view>

      <view class="card block">
        <view class="info-line">
          <text>配送地址</text>
          <text>{{ order.address }}</text>
        </view>
        <view class="info-line">
          <text>备注</text>
          <text>{{ order.remark }}</text>
        </view>
        <view class="info-line pay">
          <text>实付款</text>
          <text>¥{{ order.payAmount }}</text>
        </view>
      </view>

      <refund-order :order="order" />
    </view>
    <empty-state v-else title="订单加载中" desc="请稍候" />
  </view>
</template>

<script>
import EmptyState from '@/components/empty-state/index.vue'
import RefundOrder from '@/components/refund_order/index.vue'

export default {
  components: {
    EmptyState,
    RefundOrder
  },
  computed: {
    order() {
      return this.$store.state.order.currentOrder
    }
  },
  onLoad(options) {
    this.$store.dispatch('order/fetchOrderDetail', options.id || 'order_demo_001')
  }
}
</script>

<style scoped>
.detail-page {
  padding-bottom: 36rpx;
}

.block {
  padding: 24rpx;
  margin-bottom: 22rpx;
}

.detail-head {
  display: flex;
  justify-content: space-between;
  gap: 18rpx;
}

.status {
  color: #27ae60;
  font-size: 34rpx;
  font-weight: 800;
}

.order-no,
.time {
  color: #8a7b72;
  font-size: 24rpx;
}

.time {
  display: block;
  margin-top: 14rpx;
}

.shop {
  display: block;
  margin-bottom: 18rpx;
  font-size: 30rpx;
  font-weight: 700;
}

.goods-row {
  display: flex;
  align-items: center;
  gap: 16rpx;
  padding: 16rpx 0;
  border-top: 1rpx solid #f0e5dd;
}

.goods-image {
  width: 96rpx;
  height: 96rpx;
  border-radius: 14rpx;
  background: #fff1e8;
}

.goods-main {
  flex: 1;
  min-width: 0;
}

.goods-name {
  display: block;
  color: #2e2520;
  font-size: 26rpx;
}

.count {
  display: block;
  margin-top: 8rpx;
  color: #8a7b72;
  font-size: 22rpx;
}

.price {
  color: #ef3f28;
  font-size: 26rpx;
}

.info-line {
  display: flex;
  justify-content: space-between;
  gap: 20rpx;
  padding: 14rpx 0;
  color: #6d5e56;
  font-size: 26rpx;
}

.info-line text:last-child {
  max-width: 470rpx;
  text-align: right;
}

.pay {
  color: #ef3f28;
  font-size: 30rpx;
  font-weight: 700;
}
</style>
