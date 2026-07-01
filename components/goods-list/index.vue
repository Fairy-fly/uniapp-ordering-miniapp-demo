<template>
  <view class="goods-layout">
    <scroll-view class="category-list" scroll-y>
      <view
        v-for="category in categories"
        :key="category.id"
        :class="['category-item', activeCategoryId === category.id ? 'active' : '']"
        @tap="$emit('category-change', category.id)"
      >
        {{ category.name }}
      </view>
    </scroll-view>
    <scroll-view class="goods-list" scroll-y>
      <view
        v-for="item in filteredGoods"
        :key="item.id"
        class="goods-card"
        @tap="$emit('detail', item)"
      >
        <image class="goods-image" :src="item.image" mode="aspectFill" />
        <view class="goods-content">
          <text class="goods-name">{{ item.name }}</text>
          <text class="goods-desc">{{ item.desc }}</text>
          <text class="sales">月售 {{ item.sales }} 份</text>
          <view class="bottom-row">
            <text class="price">¥{{ item.price }}</text>
            <view class="stepper" @tap.stop>
              <button v-if="getCount(item) > 0" class="step-btn minus" @tap="$emit('remove', item)">-</button>
              <text v-if="getCount(item) > 0" class="count">{{ getCount(item) }}</text>
              <button class="step-btn plus" @tap="$emit('add', item)">+</button>
            </view>
          </view>
        </view>
      </view>
      <empty-state v-if="filteredGoods.length === 0" title="暂无菜品" desc="换个分类再看看" />
    </scroll-view>
  </view>
</template>

<script>
import EmptyState from '@/components/empty-state/index.vue'

export default {
  name: 'GoodsList',
  components: {
    EmptyState
  },
  props: {
    categories: {
      type: Array,
      default: () => []
    },
    goodsList: {
      type: Array,
      default: () => []
    },
    activeCategoryId: {
      type: String,
      default: ''
    },
    cartItems: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    filteredGoods() {
      return this.goodsList.filter((item) => item.categoryId === this.activeCategoryId)
    }
  },
  methods: {
    getCount(goods) {
      const hit = this.cartItems.find((item) => item.id === goods.id && item.shopId === goods.shopId)
      return hit ? hit.count : 0
    }
  }
}
</script>

<style scoped>
.goods-layout {
  display: flex;
  min-height: 760rpx;
  overflow: hidden;
  border-radius: 20rpx;
  background: #ffffff;
}

.category-list {
  width: 164rpx;
  background: #fff7f1;
}

.category-item {
  min-height: 92rpx;
  padding: 24rpx 12rpx;
  color: #7d6f68;
  font-size: 26rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.category-item.active {
  background: #ffffff;
  color: #f05a28;
  font-weight: 700;
}

.goods-list {
  flex: 1;
  height: 760rpx;
  padding: 6rpx 18rpx 120rpx;
}

.goods-card {
  display: flex;
  gap: 18rpx;
  padding: 24rpx 0;
  border-bottom: 1rpx solid #f0e5dd;
}

.goods-image {
  width: 150rpx;
  height: 150rpx;
  border-radius: 16rpx;
  background: #fff1e8;
  flex-shrink: 0;
}

.goods-content {
  flex: 1;
  min-width: 0;
}

.goods-name {
  display: block;
  font-size: 30rpx;
  font-weight: 700;
  color: #2e2520;
}

.goods-desc {
  display: block;
  margin-top: 8rpx;
  color: #8a7b72;
  font-size: 24rpx;
  line-height: 1.4;
}

.sales {
  display: block;
  margin-top: 8rpx;
  color: #a59890;
  font-size: 22rpx;
}

.bottom-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12rpx;
}

.price {
  color: #ef3f28;
  font-size: 32rpx;
  font-weight: 700;
}

.stepper {
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.step-btn {
  width: 44rpx;
  height: 44rpx;
  border-radius: 50%;
  color: #ffffff;
  font-size: 32rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.plus {
  background: #f05a28;
}

.minus {
  background: #d8c8bd;
}

.count {
  min-width: 32rpx;
  text-align: center;
  color: #2e2520;
  font-size: 26rpx;
}
</style>
