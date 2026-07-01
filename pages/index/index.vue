<template>
  <view class="page home-page">
    <view class="top">
      <view>
        <text class="hello">今天想吃点什么？</text>
        <view class="location">
          <text class="pin">定位</text>
          <text>{{ location }}</text>
        </view>
      </view>
      <button class="ghost-btn my-btn" @tap="goMy">我的</button>
    </view>

    <view class="search-bar" @tap="goSearch">
      <text class="search-icon">搜索</text>
      <text class="placeholder">搜索商家、菜品</text>
    </view>

    <view v-for="banner in banners" :key="banner.id" class="banner card">
      <image class="banner-image" :src="banner.image" mode="aspectFill" />
      <view class="banner-text">
        <text class="banner-title">{{ banner.title }}</text>
        <text class="banner-desc">{{ banner.desc }}</text>
      </view>
    </view>

    <view class="keyword-row">
      <text
        v-for="keyword in hotKeywords"
        :key="keyword"
        class="keyword"
        @tap="searchKeyword(keyword)"
      >
        {{ keyword }}
      </text>
    </view>

    <view class="section-title">附近商家</view>
    <view v-if="loading && shops.length === 0" class="loading card">正在加载附近商家...</view>
    <shop-list v-else-if="shops.length" :list="shops" />
    <empty-state v-else title="附近暂无商家" desc="下拉刷新再试试" />

    <view class="reach-bottom">
      <text>{{ hasMore ? '上拉加载更多' : '已经到底了' }}</text>
    </view>
  </view>
</template>

<script>
import EmptyState from '@/components/empty-state/index.vue'
import ShopList from '@/components/shop-list/index.vue'

export default {
  components: {
    EmptyState,
    ShopList
  },
  computed: {
    location() {
      return this.$store.state.home.location
    },
    banners() {
      return this.$store.state.home.banners
    },
    hotKeywords() {
      return this.$store.state.home.hotKeywords
    },
    shops() {
      return this.$store.state.home.shops
    },
    hasMore() {
      return this.$store.state.home.hasMore
    },
    loading() {
      return this.$store.state.home.loading
    }
  },
  onLoad() {
    this.$store.dispatch('home/fetchHome')
  },
  async onPullDownRefresh() {
    await this.$store.dispatch('home/fetchHome')
    uni.stopPullDownRefresh()
  },
  onReachBottom() {
    this.$store.dispatch('home/loadMore')
  },
  onShareAppMessage() {
    return {
      title: '点餐系统课程小程序',
      path: '/pages/index/index'
    }
  },
  methods: {
    goSearch() {
      uni.navigateTo({
        url: '/pages/search/index'
      })
    },
    searchKeyword(keyword) {
      uni.navigateTo({
        url: `/pages/search/index?keyword=${encodeURIComponent(keyword)}`
      })
    },
    goMy() {
      uni.switchTab({
        url: '/pages/my/index'
      })
    }
  }
}
</script>

<style scoped>
.home-page {
  padding-bottom: 44rpx;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: 10rpx;
}

.hello {
  display: block;
  font-size: 42rpx;
  font-weight: 800;
  color: #2e2520;
}

.location {
  display: flex;
  align-items: center;
  gap: 12rpx;
  margin-top: 14rpx;
  color: #7d6f68;
  font-size: 26rpx;
}

.pin {
  padding: 6rpx 12rpx;
  border-radius: 18rpx;
  background: #fff1e8;
  color: #f05a28;
  font-size: 22rpx;
}

.my-btn {
  width: 120rpx;
}

.search-bar {
  height: 88rpx;
  margin-top: 28rpx;
  padding: 0 24rpx;
  border-radius: 44rpx;
  background: #ffffff;
  display: flex;
  align-items: center;
  gap: 16rpx;
  color: #8a7b72;
  box-shadow: 0 8rpx 24rpx rgba(68, 42, 24, 0.06);
}

.search-icon {
  color: #f05a28;
  font-weight: 600;
}

.placeholder {
  color: #a59890;
}

.banner {
  position: relative;
  height: 210rpx;
  margin-top: 24rpx;
  overflow: hidden;
}

.banner-image {
  width: 100%;
  height: 100%;
}

.banner-text {
  position: absolute;
  left: 28rpx;
  top: 36rpx;
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.banner-title {
  font-size: 38rpx;
  font-weight: 800;
  color: #6d260f;
}

.banner-desc {
  width: 240rpx;
  padding: 10rpx 18rpx;
  border-radius: 26rpx;
  background: rgba(255, 255, 255, 0.78);
  color: #ef3f28;
  font-size: 24rpx;
}

.keyword-row {
  display: flex;
  flex-wrap: wrap;
  gap: 14rpx;
  margin-top: 24rpx;
}

.keyword {
  padding: 12rpx 18rpx;
  border-radius: 28rpx;
  background: #ffffff;
  color: #6d5e56;
  font-size: 24rpx;
}

.loading {
  padding: 34rpx;
  color: #8a7b72;
  text-align: center;
}

.reach-bottom {
  padding: 30rpx 0 10rpx;
  color: #a59890;
  font-size: 24rpx;
  text-align: center;
}
</style>
