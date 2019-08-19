const pxtorem = require('postcss-pxtorem')

module.exports = {
  publicPath: '/', // 部署应用时的基本 URL
  outputDir: 'dist', // 构建生成的目录
  assetsDir: 'static', // 放置生成的静态资源 (js,css,img,fonts) 相对于 outputDir 的目录
  filenameHashing: true, // 默认 true , hash 设置
  lintOnSave: true, // 是否在开发环境下通过 eslint-loader 保存时 lint 代码
  // lintOnSave: process.env.NODE_ENV !== 'production',
  runtimeCompiler: false, // 是否使用包含运行时编译器的 Vue 构建版本
  transpileDependencies: [], // babel-loader 默认忽略所有 node_modules 的文件,如果想要通过 Babel 显示转译一个依赖,可以在选项中列出来
  productionSourceMap: false, // 关闭 source map
  crossorigin: undefined, // crossorigin 支持,默认 undefined
  configureWebpack: {}, // 做额外的配置
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          pxtorem({
            rootValue: 100,
            minPixelValue: 2,
            propList: ['*'],
            selectorBlackList: []
          })
        ]
      }
    }
  }
}
