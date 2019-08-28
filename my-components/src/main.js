import Vue from 'vue'
import App from './App.vue'
import '../utils/init.js'
import '../utils/rem.js'
import 'normalize.css'

import './plugins/index'
// import router from './router'
// import store from './store'

// 关闭 vue 生产提示
Vue.config.productionTip = false
// router,
//   store,
new Vue({
  render: h => h(App)
}).$mount('#app')
