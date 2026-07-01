# 测试记录

本文件记录项目检查和构建过程。最终结果以最后一次执行为准。

## 已执行命令

### 1. 初始化 git

```bash
git init
```

结果：通过。当前目录原本不是 git 仓库，已初始化为本地仓库。

### 2. 安装依赖

```bash
npm install
```

第一次结果：失败。原因是 `@dcloudio/uni-app` 使用 `latest` 时解析到了 Vue 2 相关依赖，和 Vue 3 冲突。

处理方式：

- 将 `@dcloudio/uni-app`、`@dcloudio/uni-components`、`@dcloudio/uni-mp-weixin`、`@dcloudio/vite-plugin-uni` 统一固定为 `3.0.0-5000720260410001`。
- 根据 uni 插件 peer dependency，把 `vite` 固定为 `5.2.8`。
- 重新执行 `npm install` 后通过。

补充说明：`npm install` 后 npm audit 显示部分依赖包有安全提示，这些来自 uni-app 构建工具链依赖，不影响课程演示构建。没有使用 `--force` 强制安装。

### 3. 项目结构与引用检查

```bash
node scripts/check-project.js
```

结果：通过。

检查内容：

- 必需目录和文件是否存在。
- `pages.json` 是否配置全部页面。
- tabBar 是否包含首页和个人中心。
- 组件引用路径是否存在。
- store 模块和 api 模块引用是否存在。
- 是否误引入 React、Taro、Pinia 等不符合要求的技术栈。

### 4. npm 脚本检查

```bash
npm run check
```

结果：通过。

### 5. 微信小程序端构建

```bash
npm run build:mp-weixin
```

第一次结果：失败。原因是 uni CLI 默认读取 `src/manifest.json`，而本项目按 HBuilderX 常见结构把 `manifest.json`、`pages.json`、`App.vue` 放在项目根目录。

处理方式：

- 新增 `scripts/run-uni.js`，在执行 uni CLI 前设置 `UNI_INPUT_DIR` 和 `VITE_ROOT_DIR` 为项目根目录。
- 新增 `index.html` 和 `vite.config.js`，补齐 CLI 构建入口。
- 重新执行 `npm run build:mp-weixin` 后通过。

最终结果：通过。构建产物目录：

```text
D:\跨端应用开发\dist\build\mp-weixin
```

微信开发者工具可导入该目录运行。

## 降级与 mock 记录

- 商家、菜品、搜索、订单数据使用 `utils/mock.js`。
- 微信登录优先调用 `uni.login`，不可用时使用 `mock_code`。
- 手机号绑定使用 mock 验证码 `123456`。
- 支付流程提交订单后直接生成已付款订单。
- 地图页使用 mock 经纬度和模拟地图页面。

## git 与远程仓库

已完成本地 git commits。当前仓库未配置 remote，所以没有执行 push。后续如果需要上传到 gitee 或 GitHub，可以先添加远程仓库地址，再执行 `git push -u origin master`。
