// 基于 Node 的 , node 不支持 Import 语法
// 默认环境变量 NODE_ENV production development
let path = require('path');
module.exports = {
	// baseUrl
	publicPath:process.env.NODE_ENV === 'production'?'http://www.pro.cn':'/',
	// 静态文件路径
	assetsDir:'assets',
	// 输出目录
	outputDir:'./my-dist',
	// 使用模板方式,默认 false
	/**
	 * [runtimeCompiler description]
	 * @type {Boolean}
	 * new Vue({
			template:'<div>hello</div>'
		  // render: h => h(App),
		}).$mount('#app')
	 */
	runtimeCompiler:true,
	// 是否使用 map, 默认 true
	productionSourceMap:false,
	chainWebpack:config=>{
		// 可以获取到webpack配置,
		// 设置别名
		config.resolve.alias.set('+',path.resolve(__dirname,'src/components'))
	},
	// 假如这个写空 , 不会识别上面的别名配置
	// configuireWebpack:{
	// 	plugins:[],
	// 	module:{

	// 	}
	// }
}