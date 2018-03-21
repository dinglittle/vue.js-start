import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)
// 这里导出 Router
// 在别的地方 可以直接  import Router from '路径'
// import router from './router'  
// 因为 export defult 导出的 new Router , 
// 导入的时候给个变量
// 
// ES6将一个文件视为一个模块,上面的模块通过 export 向外输出了一个变量.
//  一个模块也可以同时往外面输出多个变量
export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})

