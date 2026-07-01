<template>
  <view class="shop-list">
    <view
      v-for="shop in list"
      :key="shop.id"
      class="shop-card card"
      @tap="goGoods(shop)"
    >
      <image class="shop-image" :src="shop.image" mode="aspectFill" />
      <view class="shop-content">
        <view class="shop-head">
          <text class="shop-name">{{ shop.name }}</text>
          <text class="distance">{{ shop.distance }}</text>
        </view>
        <view class="meta">
          <text>评分 {{ shop.score }}</text>
          <text>月售 {{ shop.monthlySales }}</text>
        </view>
        <view class="meta">
          <text>起送 ¥{{ shop.minPrice }}</text>
          <text>配送 ¥{{ shop.deliveryFee }}</text>
        </view>
        <view class="tags">
          <text v-for="tag in shop.tags" :key="tag" class="tag">{{ tag }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'ShopList',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    goGoods(shop) {
      this.$emit('select', shop)
      uni.navigateTo({
        url: `/pages/goods/index?shopId=${shop.id}`
      })
    }
  }
}
</script>

<style scoped>
.shop-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.shop-card {
  display: flex;
  padding: 20rpx;
}

.shop-image {
  width: 168rpx;
  height: 168rpx;
  border-radius: 16rpx;
  background: #fff1e8;
  flex-shrink: 0;
}

.shop-content {
  flex: 1;
  min-width: 0;
  padding-left: 20rpx;
}

.shop-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18rpx;
}

.shop-name {
  font-size: 32rpx;
  font-weight: 700;
  color: #2e2520;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.distance {
  color: #8a7b72;
  font-size: 24rpx;
  flex-shrink: 0;
}

.meta {
  display: flex;
  gap: 18rpx;
  margin-top: 12rpx;
  color: #7d6f68;
  font-size: 24rpx;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10rpx;
  margin-top: 16rpx;
}

.tag {
  padding: 6rpx 12rpx;
  border-radius: 18rpx;
  background: #fff1e8;
  color: #f05a28;
  font-size: 22rpx;
}
</style>
