# uniapp-ordering-miniapp-demo

本项目为《跨端应用开发》课程实验作品，使用 uni-app + Vue + Vuex 实现点餐小程序端。

项目中的商家、菜品、订单、登录、支付、验证码等数据均为 mock 演示数据，未接入真实支付、真实手机号授权和生产后端接口。

## 项目简介

`uniapp-ordering-miniapp-demo` 是一个点餐小程序课程 Demo，围绕“浏览商家 - 选择菜品 - 加入购物车 - 确认订单 - 模拟支付 - 查看订单 - 个人中心”这一条完整流程进行实现。项目重点展示 uni-app 跨端页面开发、Vue 页面组件拆分、Vuex 状态管理、购物车联动、订单流程和 mock 数据模拟。

项目适合作为跨端应用开发课程作业、实验报告截图素材和 uni-app 小程序端学习案例。

## 课程设计背景

本课程设计要求使用 HBuilderX、微信开发者工具和 uni-app 完成一个小程序端应用。点餐系统场景比较适合练习移动端常见交互：列表展示、详情弹窗、购物车、订单确认、登录拦截和个人中心。

由于课程实验环境通常没有真实后端、微信支付商户号、手机号授权权限等条件，本项目统一采用 mock 数据和模拟流程，保证页面能够完整运行、演示和截图。

## 核心功能

- 首页：定位展示、搜索入口、banner 推荐、附近商家列表、下拉刷新、上拉加载。
- 商家列表：商家卡片展示评分、月售、起送价、配送费、距离和标签。
- 搜索页：热门搜索、最近搜索、搜索结果列表。
- 点餐页：商家信息、菜品分类、菜品列表、菜品详情弹窗。
- 购物车：加入商品、增加数量、减少数量、清空购物车、自动统计总价。
- 订单流程：确认订单、填写地址和备注、计算金额、生成 mock 订单。
- 支付模拟：提交订单后模拟支付成功，跳转支付成功页。
- 订单管理：已付款订单列表、订单详情、退款申请演示。
- 个人中心：登录状态展示、资料修改、手机号绑定、退出登录。

## 技术栈

- uni-app：跨端应用开发框架，目标端为微信小程序。
- Vue：页面与组件开发。
- Vuex：统一管理首页、搜索、菜品、购物车、订单和用户状态。
- pages.json：配置页面路由、导航栏和 tabBar。
- utils/request.js：统一封装请求入口。
- utils/mock.js：集中管理课程演示 mock 数据。
- HBuilderX / 微信开发者工具：运行、预览和截图。

## 项目结构

```text
.
├── api/                  # 接口封装，统一通过 utils/request.js 调用
├── components/           # 页面组件，如商家卡片、菜品列表、购物车等
├── docs/                 # 课程报告、页面流程、mock 数据说明
├── pages/                # uni-app 页面
├── screenshots/          # 截图占位说明，后续补充运行截图
├── static/               # 本地 SVG 图片和静态资源
├── store/                # Vuex 状态管理模块
├── utils/                # request、mock、auth、format 等工具
├── App.vue
├── main.js
├── manifest.json
├── pages.json
├── package.json
└── README.md
```

## 本地运行方式

安装依赖：

```bash
npm install
```

检查项目结构和引用：

```bash
npm run check
```

构建微信小程序端：

```bash
npm run build:mp-weixin
```

构建产物目录：

```text
dist/build/mp-weixin
```

## HBuilderX 运行说明

1. 使用 HBuilderX 打开项目根目录。
2. 确认 `manifest.json` 中的小程序配置。
3. 选择“运行到小程序模拟器 / 微信开发者工具”。
4. 如果需要真实 AppID，可在 HBuilderX 或微信开发者工具中填写自己的测试 AppID。
5. 本项目不依赖真实后端，运行后即可查看 mock 演示流程。

## 微信开发者工具预览说明

方式一：先执行构建命令，再导入构建目录。

```bash
npm run build:mp-weixin
```

微信开发者工具导入：

```text
dist/build/mp-weixin
```

方式二：通过 HBuilderX 运行到微信开发者工具。

导入后可以按下面流程预览：

```text
首页 -> 商家/点餐页 -> 菜品详情 -> 购物车 -> 确认订单 -> 支付成功 -> 我的订单 -> 订单详情 -> 个人中心
```

## Mock 数据说明

项目中的演示数据集中在 `utils/mock.js`：

- 商家数据：店名、评分、地址、电话、营业时间、经纬度。
- 菜品数据：分类、名称、价格、销量、库存、图片。
- 搜索数据：热门关键词、搜索结果。
- 登录数据：mock uid、token、openid、昵称和头像。
- 订单数据：订单号、已付款状态、商品明细、配送地址、实付款。
- 验证码：使用 mock 验证码 `123456`。
- 支付：提交订单后直接模拟支付成功。

真实项目中，登录、支付、手机号授权、订单金额计算都应由后端和微信官方能力完成。本项目为了课程演示，只保留前端流程和 mock 降级。

## 页面截图占位

截图后可放入 `screenshots/` 目录，并在 README 中替换为真实图片。

| 页面 | 截图占位 |
| --- | --- |
| 首页 | `screenshots/home.png` |
| 商家列表 | `screenshots/shop-list.png` |
| 菜品详情 | `screenshots/goods-detail.png` |
| 购物车 | `screenshots/cart.png` |
| 确认订单 | `screenshots/order-submit.png` |
| 支付成功 | `screenshots/pay-success.png` |
| 订单列表 | `screenshots/order-list.png` |
| 个人中心 | `screenshots/profile.png` |

## 项目亮点

- 使用 uni-app 完成微信小程序端页面，保留跨端项目结构。
- 采用 Vue 组件化拆分商家、菜品、购物车、空状态和退款申请。
- 使用 Vuex 管理多个业务模块，页面之间状态联动清晰。
- 购物车流程完整，支持增减数量、清空和总价统计。
- 订单流程完整，从购物车到确认订单、模拟支付、订单列表和详情页可以跑通。
- mock 数据集中管理，适合课程环境演示和截图。
- 文档包含报告素材、截图清单、测试记录和发布流程。

## 后续优化计划

- 补充真实运行截图到 `screenshots/`。
- 增加更多商家和菜品分类数据。
- 优化移动端细节交互，例如订单状态筛选和购物车动画。
- 接入真实后端接口前，补充接口字段说明。
- 在具备条件时接入微信登录、手机号授权和微信支付。
- 增加自动化测试或页面截图测试。

## 相关文档

- 页面流程说明：`docs/PAGE_FLOW.md`
- Mock 数据说明：`docs/MOCK_DATA.md`
- 课程报告素材：`docs/COURSE_REPORT_MATERIALS.md`
- 原实验报告素材：`docs/report-materials.md`
- 截图清单：`docs/screenshot-checklist.md`
- 测试记录：`docs/test-record.md`
- 发布流程：`docs/release.md`
