const fs = require('fs')
const path = require('path')

const root = process.cwd()
const requiredFiles = [
  'App.vue',
  'main.js',
  'manifest.json',
  'pages.json',
  'utils/request.js',
  'utils/mock.js',
  'utils/auth.js',
  'utils/format.js',
  'store/index.js',
  'store/modules/home.js',
  'store/modules/search.js',
  'store/modules/goods.js',
  'store/modules/shop.js',
  'store/modules/user.js',
  'store/modules/cart.js',
  'store/modules/order.js',
  'api/home/index.js',
  'api/shop/index.js',
  'api/search/index.js',
  'api/goods/index.js',
  'api/user/index.js',
  'api/cart/index.js',
  'api/order/index.js',
  'api/vcode/index.js',
  'components/shop-list/index.vue',
  'components/shop-info/index.vue',
  'components/goods-list/index.vue',
  'components/goods-detail/index.vue',
  'components/cart/index.vue',
  'components/refund_order/index.vue',
  'components/empty-state/index.vue'
]

const requiredPages = [
  'pages/index/index',
  'pages/search/index',
  'pages/goods/index',
  'pages/login/index',
  'pages/map/index',
  'pages/order/submit',
  'pages/order/success',
  'pages/my/index',
  'pages/myorder/index',
  'pages/myorder/detail',
  'pages/profile/index',
  'pages/bind_cellphone/index'
]

function exists(relPath) {
  return fs.existsSync(path.join(root, relPath))
}

function read(relPath) {
  return fs.readFileSync(path.join(root, relPath), 'utf8')
}

const errors = []

for (const file of requiredFiles) {
  if (!exists(file)) errors.push(`缺少文件：${file}`)
}

for (const page of requiredPages) {
  if (!exists(`${page}.vue`)) errors.push(`缺少页面：${page}.vue`)
}

let pagesJson
try {
  pagesJson = JSON.parse(read('pages.json'))
} catch (error) {
  errors.push(`pages.json 无法解析：${error.message}`)
}

if (pagesJson) {
  const registered = new Set((pagesJson.pages || []).map((item) => item.path))
  for (const page of requiredPages) {
    if (!registered.has(page)) errors.push(`pages.json 未配置页面：${page}`)
  }

  const tabPages = new Set((pagesJson.tabBar && pagesJson.tabBar.list || []).map((item) => item.pagePath))
  for (const tabPage of ['pages/index/index', 'pages/my/index']) {
    if (!tabPages.has(tabPage)) errors.push(`tabBar 未配置：${tabPage}`)
  }
}

const aliasImportPattern = /from ['"]@\/([^'"]+)['"]/g
const relativeImportPattern = /from ['"](\.{1,2}\/[^'"]+)['"]/g
const vueAndJsFiles = []

function collect(dir) {
  for (const item of fs.readdirSync(path.join(root, dir), { withFileTypes: true })) {
    const relPath = path.join(dir, item.name).replace(/\\/g, '/')
    if (item.isDirectory()) collect(relPath)
    if (item.isFile() && /\.(vue|js)$/.test(item.name)) vueAndJsFiles.push(relPath)
  }
}

for (const dir of ['api', 'components', 'pages', 'store', 'utils']) {
  if (exists(dir)) collect(dir)
}

function resolveImport(importPath, currentFile) {
  const candidates = []
  if (importPath.startsWith('@/')) {
    candidates.push(importPath.replace('@/', ''))
  } else {
    candidates.push(path.join(path.dirname(currentFile), importPath).replace(/\\/g, '/'))
  }

  const expanded = []
  for (const candidate of candidates) {
    expanded.push(candidate)
    expanded.push(`${candidate}.js`)
    expanded.push(`${candidate}.vue`)
    expanded.push(`${candidate}/index.js`)
    expanded.push(`${candidate}/index.vue`)
  }
  return expanded.some((candidate) => exists(candidate))
}

for (const file of vueAndJsFiles) {
  const text = read(file)
  for (const forbidden of ['pinia', 'taro', 'react']) {
    if (new RegExp(`from ['"].*${forbidden}.*['"]`, 'i').test(text)) {
      errors.push(`${file} 引入了禁止技术栈：${forbidden}`)
    }
  }

  for (const match of text.matchAll(aliasImportPattern)) {
    if (!resolveImport(`@/${match[1]}`, file)) {
      errors.push(`${file} 中 @/${match[1]} 引用不存在`)
    }
  }

  for (const match of text.matchAll(relativeImportPattern)) {
    if (!resolveImport(match[1], file)) {
      errors.push(`${file} 中 ${match[1]} 引用不存在`)
    }
  }
}

if (errors.length) {
  console.error('项目检查未通过：')
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log('项目检查通过：文件结构、pages.json、组件/store/api 引用和基础技术栈检查正常。')
