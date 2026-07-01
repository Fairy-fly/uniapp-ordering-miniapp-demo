export function getToken() {
  try {
    return uni.getStorageSync('token') || ''
  } catch (error) {
    return ''
  }
}

export function requireLogin(redirectUrl = '') {
  const token = getToken()
  if (token) return true

  uni.showToast({
    title: '请先登录',
    icon: 'none'
  })

  const query = redirectUrl ? `?redirect=${encodeURIComponent(redirectUrl)}` : ''
  setTimeout(() => {
    uni.navigateTo({
      url: `/pages/login/index${query}`
    })
  }, 500)

  return false
}
