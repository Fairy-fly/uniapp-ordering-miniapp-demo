<template>
  <view class="empty">
    <image class="empty-image" src="/static/images/empty.svg" mode="aspectFit" />
    <text class="empty-title">{{ title }}</text>
    <text v-if="desc" class="empty-desc">{{ desc }}</text>
  </view>
</template>

<script>
export default {
  name: 'EmptyState',
  props: {
    title: {
      type: String,
      default: '暂无数据'
    },
    desc: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.empty {
  padding: 56rpx 24rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #8a7b72;
}

.empty-image {
  width: 180rpx;
  height: 150rpx;
  margin-bottom: 20rpx;
}

.empty-title {
  font-size: 28rpx;
  color: #5c5048;
}

.empty-desc {
  margin-top: 10rpx;
  font-size: 24rpx;
}
</style>
