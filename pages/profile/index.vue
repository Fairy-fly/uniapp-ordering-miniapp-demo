<template>
  <view class="page">
    <view class="card form-card">
      <image class="avatar" :src="form.avatar" mode="aspectFit" />
      <view class="field">
        <text class="label">昵称</text>
        <input v-model="form.nickname" class="input" placeholder="请输入昵称" />
      </view>
      <view class="field">
        <text class="label">头像地址</text>
        <input v-model="form.avatar" class="input" placeholder="/static/images/avatar.svg" />
      </view>
      <view class="field">
        <text class="label">性别</text>
        <picker :range="genderOptions" @change="changeGender">
          <view class="picker">{{ form.gender }}</view>
        </picker>
      </view>
      <button class="primary-btn save-btn" @tap="save">保存资料</button>
    </view>
  </view>
</template>

<script>
import { requireLogin } from '@/utils/auth'

export default {
  data() {
    return {
      genderOptions: ['保密', '男', '女'],
      form: {
        nickname: '',
        avatar: '/static/images/avatar.svg',
        gender: '保密'
      }
    }
  },
  onShow() {
    if (!requireLogin('/pages/profile/index')) return
    const userInfo = this.$store.state.user.userInfo || {}
    this.form = {
      nickname: userInfo.nickname || '课程体验用户',
      avatar: userInfo.avatar || '/static/images/avatar.svg',
      gender: userInfo.gender || '保密'
    }
  },
  methods: {
    changeGender(event) {
      this.form.gender = this.genderOptions[event.detail.value]
    },
    async save() {
      await this.$store.dispatch('user/updateProfile', this.form)
      uni.showToast({
        title: '资料已保存',
        icon: 'success'
      })
    }
  }
}
</script>

<style scoped>
.form-card {
  padding: 30rpx;
}

.avatar {
  width: 150rpx;
  height: 150rpx;
  margin: 0 auto 28rpx;
  border-radius: 50%;
  background: #fff1e8;
  display: block;
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

.input,
.picker {
  height: 84rpx;
  padding: 0 22rpx;
  border-radius: 16rpx;
  background: #f8f2ed;
  color: #2e2520;
  font-size: 28rpx;
  display: flex;
  align-items: center;
}

.save-btn {
  margin-top: 34rpx;
}
</style>
