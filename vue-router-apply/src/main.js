import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
	template:'<div>hello</div>'
  // render: h => h(App),
}).$mount('#app')
