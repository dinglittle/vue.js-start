// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// 当前目录下的 App.vue 导出(export default)的  赋值给 App
import App from './App'
// 当前目录下的 router/index.js 导出(export default)的 赋值给 router
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
