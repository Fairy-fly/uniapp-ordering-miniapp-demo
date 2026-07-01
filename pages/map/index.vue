<template>
  <view class="page">
    <view v-if="shop" class="map-card card">
      <view class="mock-map">
        <view class="road road-a"></view>
        <view class="road road-b"></view>
        <view class="marker">
          <text>店</text>
        </view>
      </view>
      <view class="info">
        <text class="name">{{ shop.name }}</text>
        <text class="address">{{ shop.address }}</text>
        <view class="coord">
          <text>纬度：{{ shop.latitude }}</text>
          <text>经度：{{ shop.longitude }}</text>
        </view>
        <button class="primary-btn" @tap="simulateOpenMap">模拟打开地图</button>
      </view>
    </view>
    <empty-state v-else title="正在获取位置" desc="地图页使用 mock 经纬度展示" />
  </view>
</template>

<script>
import EmptyState from '@/components/empty-state/index.vue'

export default {
  components: {
    EmptyState
  },
  computed: {
    shop() {
      return this.$store.state.shop.detail
    }
  },
  onLoad(options) {
    this.$store.dispatch('shop/fetchShop', options.shopId || 'shop_001')
  },
  methods: {
    simulateOpenMap() {
      uni.showToast({
        title: '已展示模拟地图位置',
        icon: 'none'
      })
    }
  }
}
</script>

<style scoped>
.map-card {
  overflow: hidden;
}

.mock-map {
  position: relative;
  height: 560rpx;
  background: linear-gradient(135deg, #f8efe8, #e9f5ef);
}

.road {
  position: absolute;
  background: rgba(255, 255, 255, 0.85);
}

.road-a {
  left: -80rpx;
  top: 250rpx;
  width: 880rpx;
  height: 70rpx;
  transform: rotate(-12deg);
}

.road-b {
  left: 300rpx;
  top: -60rpx;
  width: 72rpx;
  height: 760rpx;
  transform: rotate(18deg);
}

.marker {
  position: absolute;
  left: 330rpx;
  top: 224rpx;
  width: 92rpx;
  height: 92rpx;
  border-radius: 50% 50% 50% 0;
  background: #f05a28;
  color: #ffffff;
  transform: rotate(-45deg);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 12rpx 24rpx rgba(240, 90, 40, 0.28);
}

.marker text {
  transform: rotate(45deg);
  font-weight: 700;
}

.info {
  padding: 28rpx;
}

.name {
  display: block;
  font-size: 36rpx;
  font-weight: 700;
}

.address {
  display: block;
  margin-top: 14rpx;
  color: #6d5e56;
  line-height: 1.5;
}

.coord {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
  margin: 20rpx 0 28rpx;
  color: #8a7b72;
  font-size: 24rpx;
}
</style>
