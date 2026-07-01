# 页面流程说明

本文档说明点餐小程序课程 Demo 的主要页面流转，方便课程展示、截图和报告撰写。

## 总体流程

```text
首页
  -> 搜索页
  -> 点餐页
      -> 菜品详情
      -> 购物车
      -> 确认订单
      -> 支付成功
      -> 订单详情
个人中心
  -> 登录页
  -> 订单列表
  -> 订单详情
  -> 修改个人资料
  -> 绑定手机号
```

## 首页流程

入口页面：`pages/index/index.vue`

首页展示定位地址、搜索入口、banner 和附近商家列表。用户可以点击搜索入口进入搜索页，也可以点击商家卡片进入点餐页。

相关模块：

- `api/home/index.js`
- `store/modules/home.js`
- `components/shop-list/index.vue`

## 搜索流程

页面：`pages/search/index.vue`

搜索页提供热门搜索和最近搜索。用户输入关键词后，页面通过 mock 接口返回匹配商家列表。点击搜索结果中的商家，可以进入点餐页。

相关模块：

- `api/search/index.js`
- `store/modules/search.js`

## 点餐与菜品详情流程

页面：`pages/goods/index.vue`

点餐页展示商家信息、菜品分类和菜品列表。用户点击菜品可以打开菜品详情，点击加号可以加入购物车。

相关模块：

- `api/goods/index.js`
- `api/shop/index.js`
- `store/modules/goods.js`
- `store/modules/shop.js`
- `components/goods-list/index.vue`
- `components/goods-detail/index.vue`
- `components/shop-info/index.vue`

## 购物车流程

组件：`components/cart/index.vue`

购物车固定在点餐页底部，负责展示已选商品数量和总价。展开后可以增加、减少、清空商品。点击“去结算”进入确认订单页。

相关模块：

- `api/cart/index.js`
- `store/modules/cart.js`

## 订单流程

确认订单页面：`pages/order/submit.vue`

支付成功页面：`pages/order/success.vue`

用户从购物车进入确认订单页，填写配送地址和备注。提交订单后，项目使用 mock 方式生成已付款订单并跳转支付成功页。

真实项目中订单金额应由服务端计算，本项目仅用于课程演示。

相关模块：

- `api/order/index.js`
- `store/modules/order.js`

## 订单列表和详情流程

订单列表页面：`pages/myorder/index.vue`

订单详情页面：`pages/myorder/detail.vue`

用户可以在个人中心进入订单列表，查看已付款订单。点击订单卡片后进入订单详情，订单详情中包含商品、地址、备注、金额和退款申请组件。

## 个人中心流程

个人中心页面：`pages/my/index.vue`

登录页面：`pages/login/index.vue`

资料页面：`pages/profile/index.vue`

手机号绑定页面：`pages/bind_cellphone/index.vue`

个人中心展示登录状态、头像、昵称、手机号、订单入口、资料修改入口和退出登录入口。登录、手机号绑定和验证码均为 mock 演示流程。

相关模块：

- `api/user/index.js`
- `api/vcode/index.js`
- `store/modules/user.js`
- `components/refund_order/index.vue`
