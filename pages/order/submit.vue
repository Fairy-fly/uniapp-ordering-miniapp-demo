<template>
  <view class="page submit-page">
    <view class="card block">
      <text class="block-title">配送地址</text>
      <textarea v-model="address" class="address" placeholder="请输入配送地址" />
    </view>

    <view class="card block">
      <text class="block-title">商品清单</text>
      <view v-if="items.length">
        <view v-for="item in items" :key="item.shopId + item.id" class="goods-row">
          <text class="goods-name">{{ item.name }}</text>
          <text class="goods-count">x{{ item.count }}</text>
          <text class="goods-price">¥{{ item.price * item.count }}</text>
        </view>
      </view>
      <empty-state v-else title="购物车为空" desc="请先返回点餐页选择菜品" />
    </view>

    <view class="card block">
      <text class="block-title">订单备注</text>
      <textarea v-model="remark" class="remark" placeholder="例如：少辣、放门口" />
    </view>

    <view class="card block">
      <view class="amount-row">
        <text>商品金额</text>
        <text>¥{{ goodsAmount }}</text>
      </view>
      <view class="amount-row">
        <text>配送费</text>
        <text>¥{{ deliveryFee }}</text>
      </view>
      <view class="amount-row pay">
        <text>实付款</text>
        <text>¥{{ payAmount }}</text>
      </view>
      <text class="tip">说明：课程项目为 mock 支付，真实项目金额应由服务器计算。</text>
    </view>

    <button class="primary-btn submit-btn" @tap="submitOrder">提交订单并模拟支付</button>
  </view>
</template>

<script>
import EmptyState from '@/components/empty-state/index.vue'
import { requireLogin } from '@/utils/auth'

export default {
  components: {
    EmptyState
  },
  data() {
    return {
      address: '广东省广州市大学城东路 88 号 6 栋 301',
      remark: '',
      deliveryFee: 3
    }
  },
  computed: {
    items() {
      return this.$store.state.cart.items
    },
    goodsAmount() {
      return this.$store.getters['cart/totalPrice']
    },
    payAmount() {
      return Number((this.goodsAmount + this.deliveryFee).toFixed(2))
    },
    shop() {
      return this.items[0] ? this.items[0].shop : null
    }
  },
  onLoad() {
    requireLogin('/pages/order/submit')
  },
  methods: {
    async submitOrder() {
      if (!requireLogin('/pages/order/submit')) return
      if (!this.items.length) {
        uni.showToast({
          title: '购物车为空',
          icon: 'none'
        })
        return
      }
      const order = await this.$store.dispatch('order/createOrder', {
        items: this.items,
        shop: this.shop,
        address: this.address,
        remark: this.remark,
        deliveryFee: this.deliveryFee
      })
      await this.$store.dispatch('cart/clearCart')
      uni.redirectTo({
        url: `/pages/order/success?id=${order.id}`
      })
    }
  }
}
</script>

<style scoped>
.submit-page {
  padding-bottom: 130rpx;
}

.block {
  padding: 24rpx;
  margin-bottom: 22rpx;
}

.block-title {
  display: block;
  margin-bottom: 18rpx;
  font-size: 30rpx;
  font-weight: 700;
}

.address,
.remark {
  width: 100%;
  min-height: 120rpx;
  padding: 18rpx;
  border-radius: 16rpx;
  background: #f8f2ed;
  color: #2e2520;
  font-size: 26rpx;
}

.remark {
  min-height: 96rpx;
}

.goods-row,
.amount-row {
  display: flex;
  align-items: center;
  gap: 16rpx;
  padding: 16rpx 0;
  color: #5c5048;
  font-size: 26rpx;
}

.goods-name {
  flex: 1;
}

.goods-count {
  color: #8a7b72;
}

.goods-price {
  min-width: 110rpx;
  text-align: right;
  color: #ef3f28;
}

.amount-row {
  justify-content: space-between;
}

.pay {
  color: #ef3f28;
  font-size: 32rpx;
  font-weight: 700;
}

.tip {
  display: block;
  margin-top: 12rpx;
  color: #a59890;
  font-size: 22rpx;
}

.submit-btn {
  position: fixed;
  left: 24rpx;
  right: 24rpx;
  bottom: calc(24rpx + env(safe-area-inset-bottom));
}
</style>
