<template>
  <view v-if="visible && goods" class="mask" @tap="$emit('close')">
    <view class="panel card" @tap.stop>
      <image class="cover" :src="goods.image" mode="aspectFill" />
      <view class="content">
        <view class="title-row">
          <text class="name">{{ goods.name }}</text>
          <button class="close" @tap="$emit('close')">×</button>
        </view>
        <text class="desc">{{ goods.desc }}</text>
        <view class="meta">
          <text>月售 {{ goods.sales }}</text>
          <text>库存 {{ goods.stock }}</text>
        </view>
        <view class="bottom">
          <text class="price">¥{{ goods.price }}</text>
          <button class="primary-btn add-btn" @tap="$emit('add', goods)">加入购物车</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'GoodsDetail',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    goods: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped>
.mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 20;
  display: flex;
  align-items: flex-end;
  background: rgba(46, 37, 32, 0.45);
}

.panel {
  width: 100%;
  overflow: hidden;
  border-radius: 28rpx 28rpx 0 0;
}

.cover {
  width: 100%;
  height: 360rpx;
  background: #fff1e8;
}

.content {
  padding: 28rpx;
}

.title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20rpx;
}

.name {
  font-size: 36rpx;
  font-weight: 700;
  color: #2e2520;
}

.close {
  width: 54rpx;
  height: 54rpx;
  border-radius: 50%;
  background: #f2e8df;
  color: #7d6f68;
  font-size: 38rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.desc {
  display: block;
  margin-top: 18rpx;
  color: #6d5e56;
  font-size: 26rpx;
  line-height: 1.6;
}

.meta {
  display: flex;
  gap: 20rpx;
  margin-top: 16rpx;
  color: #8a7b72;
  font-size: 24rpx;
}

.bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 28rpx;
}

.price {
  color: #ef3f28;
  font-size: 40rpx;
  font-weight: 700;
}

.add-btn {
  width: 220rpx;
  height: 74rpx;
  font-size: 28rpx;
}
</style>
