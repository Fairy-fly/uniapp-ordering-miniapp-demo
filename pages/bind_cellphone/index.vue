<template>
  <view class="page">
    <view class="card form-card">
      <text class="title">绑定手机号</text>
      <text class="desc">微信手机号授权能力在课程环境中使用 mock 表单完成演示。</text>
      <view class="field">
        <text class="label">手机号</text>
        <input v-model="cellphone" class="input" type="number" maxlength="11" placeholder="请输入手机号" />
      </view>
      <view class="field code-row">
        <input v-model="code" class="input code-input" type="number" maxlength="6" placeholder="验证码" />
        <button class="ghost-btn code-btn" @tap="sendCode">{{ codeSent ? '已发送' : '发送验证码' }}</button>
      </view>
      <button class="primary-btn" @tap="bindPhone">确认绑定</button>
    </view>
  </view>
</template>

<script>
import { sendVcode } from '@/api/vcode'

export default {
  data() {
    return {
      cellphone: '',
      code: '',
      codeSent: false
    }
  },
  methods: {
    async sendCode() {
      if (!/^1\d{10}$/.test(this.cellphone)) {
        uni.showToast({
          title: '请输入正确手机号',
          icon: 'none'
        })
        return
      }
      const res = await sendVcode(this.cellphone)
      this.codeSent = true
      this.code = res.data.code
      uni.showToast({
        title: '验证码已模拟发送',
        icon: 'success'
      })
    },
    async bindPhone() {
      if (!this.codeSent || this.code !== '123456') {
        uni.showToast({
          title: '请先获取 mock 验证码',
          icon: 'none'
        })
        return
      }
      if (!this.$store.getters['user/isLogin']) {
        await this.$store.dispatch('user/login', {
          cellphone: this.cellphone
        })
      }
      await this.$store.dispatch('user/bindCellphone', {
        cellphone: this.cellphone,
        code: this.code
      })
      uni.showToast({
        title: '绑定成功',
        icon: 'success'
      })
      setTimeout(() => {
        uni.switchTab({
          url: '/pages/my/index'
        })
      }, 500)
    }
  }
}
</script>

<style scoped>
.form-card {
  padding: 34rpx;
}

.title {
  display: block;
  font-size: 38rpx;
  font-weight: 800;
}

.desc {
  display: block;
  margin: 16rpx 0 34rpx;
  color: #6d5e56;
  line-height: 1.6;
}

.field {
  margin-bottom: 24rpx;
}

.label {
  display: block;
  margin-bottom: 12rpx;
  color: #6d5e56;
  font-size: 26rpx;
}

.input {
  height: 84rpx;
  padding: 0 22rpx;
  border-radius: 16rpx;
  background: #f8f2ed;
  color: #2e2520;
  font-size: 28rpx;
}

.code-row {
  display: flex;
  gap: 16rpx;
}

.code-input {
  flex: 1;
}

.code-btn {
  width: 190rpx;
  height: 84rpx;
  flex-shrink: 0;
}
</style>
