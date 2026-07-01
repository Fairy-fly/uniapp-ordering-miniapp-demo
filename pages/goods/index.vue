<template>
  <view class="page goods-page">
    <shop-info v-if="shop" :shop="shop" />
    <view v-else class="loading card">正在加载商家信息...</view>

    <view class="section-title">菜单</view>
    <goods-list
      :categories="categories"
      :goods-list="goodsList"
      :active-category-id="activeCategoryId"
      :cart-items="cartItems"
      @category-change="setActiveCategory"
      @detail="showDetail"
      @add="addGoods"
      @remove="removeGoods"
    />

    <goods-detail
      :visible="Boolean(currentGoods)"
      :goods="currentGoods"
      @close="showDetail(null)"
      @add="addGoods"
    />

    <cart-box
      :items="cartItems"
      :total-count="totalCount"
      :total-price="totalPrice"
    />
  </view>
</template>

<script>
import CartBox from '@/components/cart/index.vue'
import GoodsDetail from '@/components/goods-detail/index.vue'
import GoodsList from '@/components/goods-list/index.vue'
import ShopInfo from '@/components/shop-info/index.vue'

export default {
  components: {
    CartBox,
    GoodsDetail,
    GoodsList,
    ShopInfo
  },
  data() {
    return {
      shopId: 'shop_001'
    }
  },
  computed: {
    shop() {
      return this.$store.state.goods.shop
    },
    categories() {
      return this.$store.state.goods.categories
    },
    goodsList() {
      return this.$store.state.goods.goodsList
    },
    activeCategoryId() {
      return this.$store.state.goods.activeCategoryId
    },
    currentGoods() {
      return this.$store.state.goods.currentGoods
    },
    cartItems() {
      return this.$store.state.cart.items
    },
    totalCount() {
      return this.$store.getters['cart/totalCount']
    },
    totalPrice() {
      return this.$store.getters['cart/totalPrice']
    }
  },
  onLoad(options) {
    this.shopId = options.shopId || 'shop_001'
    this.$store.dispatch('goods/fetchGoods', this.shopId)
  },
  methods: {
    setActiveCategory(id) {
      this.$store.commit('goods/SET_ACTIVE_CATEGORY', id)
    },
    showDetail(goods) {
      this.$store.commit('goods/SET_CURRENT_GOODS', goods)
    },
    addGoods(goods) {
      this.$store.dispatch('cart/addGoods', {
        ...goods,
        shop: this.shop,
        shopName: this.shop ? this.shop.name : '默认商家'
      })
      uni.showToast({
        title: '已加入购物车',
        icon: 'success'
      })
    },
    removeGoods(goods) {
      this.$store.dispatch('cart/removeGoods', goods)
    }
  }
}
</script>

<style scoped>
.goods-page {
  padding-bottom: 150rpx;
}

.loading {
  padding: 32rpx;
  color: #8a7b72;
  text-align: center;
}
</style>
