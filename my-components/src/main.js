import Vue from 'vue'
import App from './App.vue'
import '../utils/init.js'
import '../utils/rem.js'
import 'normalize.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
