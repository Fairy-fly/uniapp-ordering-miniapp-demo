<template>
  <view class="page">
    <view class="search-row">
      <input
        v-model="keyword"
        class="search-input"
        confirm-type="search"
        placeholder="输入菜品或商家名称"
        @confirm="doSearch"
      />
      <button class="search-btn" @tap="doSearch">搜索</button>
    </view>

    <view class="section">
      <view class="section-head">
        <text class="title">热门搜索</text>
      </view>
      <view class="tag-row">
        <text v-for="item in hotKeywords" :key="item" class="tag" @tap="useKeyword(item)">{{ item }}</text>
      </view>
    </view>

    <view class="section">
      <view class="section-head">
        <text class="title">最近搜索</text>
        <button v-if="recentKeywords.length" class="clear" @tap="clearRecent">清空</button>
      </view>
      <view v-if="recentKeywords.length" class="tag-row">
        <text v-for="item in recentKeywords" :key="item" class="tag recent" @tap="useKeyword(item)">{{ item }}</text>
      </view>
      <empty-state v-else title="暂无搜索记录" desc="试着搜索一道喜欢的菜" />
    </view>

    <view class="section-title">搜索结果</view>
    <view v-if="loading" class="loading card">搜索中...</view>
    <shop-list v-else-if="results.length" :list="results" />
    <empty-state v-else title="暂无结果" desc="换个关键词试试" />
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
  data() {
    return {
      keyword: ''
    }
  },
  computed: {
    hotKeywords() {
      return this.$store.state.search.hotKeywords
    },
    recentKeywords() {
      return this.$store.state.search.recentKeywords
    },
    results() {
      return this.$store.state.search.results
    },
    loading() {
      return this.$store.state.search.loading
    }
  },
  onLoad(options) {
    if (options.keyword) {
      this.keyword = decodeURIComponent(options.keyword)
      this.doSearch()
    } else if (!this.results.length) {
      this.$store.dispatch('search/doSearch', '')
    }
  },
  methods: {
    doSearch() {
      this.$store.dispatch('search/doSearch', this.keyword)
    },
    useKeyword(keyword) {
      this.keyword = keyword
      this.doSearch()
    },
    clearRecent() {
      this.$store.commit('search/CLEAR_RECENT')
    }
  }
}
</script>

<style scoped>
.search-row {
  display: flex;
  gap: 16rpx;
}

.search-input {
  flex: 1;
  height: 82rpx;
  padding: 0 24rpx;
  border-radius: 41rpx;
  background: #ffffff;
  font-size: 28rpx;
}

.search-btn {
  width: 134rpx;
  height: 82rpx;
  border-radius: 41rpx;
  background: #f05a28;
  color: #ffffff;
  font-size: 28rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.section {
  margin-top: 28rpx;
}

.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18rpx;
}

.title {
  font-size: 30rpx;
  font-weight: 700;
}

.clear {
  color: #8a7b72;
  font-size: 24rpx;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 14rpx;
}

.tag {
  padding: 14rpx 22rpx;
  border-radius: 30rpx;
  background: #fff1e8;
  color: #f05a28;
  font-size: 24rpx;
}

.tag.recent {
  background: #ffffff;
  color: #6d5e56;
}

.loading {
  padding: 34rpx;
  color: #8a7b72;
  text-align: center;
}
</style>
