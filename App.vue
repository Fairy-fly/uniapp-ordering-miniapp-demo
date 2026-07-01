<script>
export default {
  onLaunch() {
    this.$store.dispatch('user/loadUserFromStorage')
    this.$store.dispatch('order/loadOrdersFromStorage')
  }
}
</script>

<style>
page {
  min-height: 100%;
  background: #f7f5f2;
  color: #2e2520;
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 28rpx;
}

view,
text,
button,
input,
textarea {
  box-sizing: border-box;
}

button {
  padding: 0;
  margin: 0;
  line-height: 1;
  border: 0;
  border-radius: 0;
  background: transparent;
}

button::after {
  border: 0;
}

.page {
  min-height: 100vh;
  padding: 24rpx;
  background: #f7f5f2;
}

.card {
  background: #ffffff;
  border-radius: 20rpx;
  box-shadow: 0 10rpx 28rpx rgba(68, 42, 24, 0.07);
}

.primary-btn {
  height: 88rpx;
  border-radius: 44rpx;
  background: linear-gradient(135deg, #ff7a32, #ef3f28);
  color: #ffffff;
  font-size: 30rpx;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ghost-btn {
  height: 72rpx;
  padding: 0 28rpx;
  border-radius: 36rpx;
  background: #fff1e8;
  color: #f05a28;
  font-size: 26rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.section-title {
  font-size: 34rpx;
  font-weight: 700;
  color: #2e2520;
  margin: 32rpx 0 20rpx;
}

.muted {
  color: #8a7b72;
}
</style>
