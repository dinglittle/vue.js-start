// 常规方式
// import './auto-regist'
// import './element'

// 自动化注册插件
const requirePlugin = require.context(
  // 当前 plugins 目录
  '/',
  // 是否查询其子目录
  false,
  // 匹配当前 plugins 目录下的 js 文件
  /.+\.js$/
)

requirePlugin.keys().forEach(fileName => {
  requirePlugin(fileName)
})
