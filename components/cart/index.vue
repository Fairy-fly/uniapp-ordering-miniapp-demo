<template>
  <view>
    <view v-if="showPanel" class="cart-mask" @tap="showPanel = false">
      <view class="cart-panel card" @tap.stop>
        <view class="panel-head">
          <text class="panel-title">购物车</text>
          <button class="clear" @tap="clearCart">清空</button>
        </view>
        <view v-if="items.length">
          <view v-for="item in items" :key="item.shopId + item.id" class="cart-item">
            <view class="item-main">
              <text class="item-name">{{ item.name }}</text>
              <text class="item-price">¥{{ item.price }}</text>
            </view>
            <view class="stepper">
              <button class="step-btn minus" @tap="remove(item)">-</button>
              <text class="count">{{ item.count }}</text>
              <button class="step-btn plus" @tap="add(item)">+</button>
            </view>
          </view>
        </view>
        <empty-state v-else title="购物车为空" desc="先去选几道菜吧" />
      </view>
    </view>

    <view class="cart-bar">
      <view class="summary" @tap="showPanel = true">
        <view class="bag">
          <text>购</text>
          <text v-if="totalCount" class="badge">{{ totalCount }}</text>
        </view>
        <view>
          <text class="amount">¥{{ totalPrice }}</text>
          <text class="hint">另需配送费，以提交页为准</text>
        </view>
      </view>
      <button class="submit" :class="{ disabled: !totalCount }" @tap="submitOrder">去结算</button>
    </view>
  </view>
</template>

<script>
import EmptyState from '@/components/empty-state/index.vue'

export default {
  name: 'CartBox',
  components: {
    EmptyState
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    totalCount: {
      type: Number,
      default: 0
    },
    totalPrice: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      showPanel: false
    }
  },
  methods: {
    add(item) {
      this.$store.dispatch('cart/addGoods', item)
    },
    remove(item) {
      this.$store.dispatch('cart/removeGoods', item)
    },
    clearCart() {
      this.$store.dispatch('cart/clearCart')
      this.showPanel = false
    },
    submitOrder() {
      if (!this.totalCount) {
        uni.showToast({
          title: '请先选择菜品',
          icon: 'none'
        })
        return
      }
      uni.navigateTo({
        url: '/pages/order/submit'
      })
    }
  }
}
</script>

<style scoped>
.cart-mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 112rpx;
  z-index: 12;
  background: rgba(46, 37, 32, 0.42);
  display: flex;
  align-items: flex-end;
}

.cart-panel {
  width: 100%;
  max-height: 620rpx;
  padding: 24rpx;
  border-radius: 28rpx 28rpx 0 0;
  overflow-y: auto;
}

.panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 16rpx;
  border-bottom: 1rpx solid #f0e5dd;
}

.panel-title {
  font-size: 32rpx;
  font-weight: 700;
}

.clear {
  color: #8a7b72;
  font-size: 26rpx;
}

.cart-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22rpx 0;
  border-bottom: 1rpx solid #f4ece6;
}

.item-main {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.item-name {
  color: #2e2520;
  font-size: 28rpx;
  font-weight: 600;
}

.item-price {
  color: #ef3f28;
  font-size: 26rpx;
}

.stepper {
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.step-btn {
  width: 44rpx;
  height: 44rpx;
  border-radius: 50%;
  color: #ffffff;
  font-size: 32rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.plus {
  background: #f05a28;
}

.minus {
  background: #d8c8bd;
}

.count {
  min-width: 32rpx;
  text-align: center;
}

.cart-bar {
  position: fixed;
  left: 24rpx;
  right: 24rpx;
  bottom: calc(24rpx + env(safe-area-inset-bottom));
  z-index: 15;
  height: 96rpx;
  border-radius: 48rpx;
  background: #2e2520;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  box-shadow: 0 12rpx 30rpx rgba(46, 37, 32, 0.22);
}

.summary {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 18rpx;
  padding-left: 22rpx;
  color: #ffffff;
}

.bag {
  position: relative;
  width: 62rpx;
  height: 62rpx;
  border-radius: 50%;
  background: #ff7a32;
  display: flex;
  align-items: center;
  justify-content: center;
}

.badge {
  position: absolute;
  right: -8rpx;
  top: -8rpx;
  min-width: 32rpx;
  height: 32rpx;
  padding: 0 8rpx;
  border-radius: 16rpx;
  background: #ef3f28;
  color: #ffffff;
  font-size: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.amount {
  display: block;
  font-size: 32rpx;
  font-weight: 700;
}

.hint {
  display: block;
  margin-top: 4rpx;
  color: #e8d7cd;
  font-size: 20rpx;
}

.submit {
  width: 190rpx;
  height: 96rpx;
  background: #f05a28;
  color: #ffffff;
  font-size: 30rpx;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.submit.disabled {
  background: #8a7b72;
}
</style>
