import Vue from 'vue'
import App from './App.vue'
import store from './store'
// 计数器 
new Vue({
	el:'#app',
	...App,
	store // store:store 被注册到实例上， 所有组件都会有一个属性 this.$store
});