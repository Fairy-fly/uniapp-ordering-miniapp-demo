<template>
  <view v-if="shop" class="shop-info card">
    <view class="top-row">
      <image class="shop-image" :src="shop.image" mode="aspectFill" />
      <view class="content">
        <text class="name">{{ shop.name }}</text>
        <view class="line">
          <text>评分 {{ shop.score }}</text>
          <text>月售 {{ shop.monthlySales }}</text>
        </view>
        <text class="notice">{{ shop.notice }}</text>
      </view>
    </view>
    <view class="info-line">
      <text class="label">地址</text>
      <text class="value">{{ shop.address }}</text>
    </view>
    <view class="info-line">
      <text class="label">电话</text>
      <text class="value">{{ shop.phone }}</text>
    </view>
    <view class="info-line">
      <text class="label">营业</text>
      <text class="value">{{ shop.openTime }}</text>
    </view>
    <view class="actions">
      <button class="ghost-btn action-btn" @tap="callShop">拨打电话</button>
      <button class="ghost-btn action-btn" @tap="openMap">查看位置</button>
    </view>
  </view>
</template>

<script>
export default {
  name: 'ShopInfo',
  props: {
    shop: {
      type: Object,
      default: null
    }
  },
  methods: {
    callShop() {
      if (!this.shop) return
      uni.makePhoneCall({
        phoneNumber: this.shop.phone,
        fail: () => {
          uni.showToast({
            title: `模拟拨打 ${this.shop.phone}`,
            icon: 'none'
          })
        }
      })
    },
    openMap() {
      if (!this.shop) return
      uni.navigateTo({
        url: `/pages/map/index?shopId=${this.shop.id}`
      })
    }
  }
}
</script>

<style scoped>
.shop-info {
  padding: 22rpx;
}

.top-row {
  display: flex;
  gap: 18rpx;
}

.shop-image {
  width: 136rpx;
  height: 136rpx;
  border-radius: 16rpx;
  background: #fff1e8;
  flex-shrink: 0;
}

.content {
  flex: 1;
  min-width: 0;
}

.name {
  display: block;
  font-size: 34rpx;
  font-weight: 700;
  color: #2e2520;
}

.line {
  display: flex;
  gap: 18rpx;
  margin-top: 12rpx;
  color: #7d6f68;
  font-size: 24rpx;
}

.notice {
  display: block;
  margin-top: 12rpx;
  color: #f05a28;
  font-size: 24rpx;
  line-height: 1.5;
}

.info-line {
  display: flex;
  gap: 18rpx;
  padding-top: 18rpx;
  margin-top: 18rpx;
  border-top: 1rpx solid #f0e5dd;
  font-size: 26rpx;
}

.label {
  color: #8a7b72;
  width: 72rpx;
  flex-shrink: 0;
}

.value {
  color: #3b3029;
  flex: 1;
}

.actions {
  display: flex;
  gap: 18rpx;
  margin-top: 22rpx;
}

.action-btn {
  flex: 1;
}
</style>
