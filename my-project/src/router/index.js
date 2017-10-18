import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// 导入新模板
import First from '@/components/First'
import User from '@/components/User'

// 如果使用模块化机制编程,导入Vue和VueRouter,要调用 Vue.use(VueFouter)
// 这里因为 上面 import 名为 Router , 所以 Vue.use(Router)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
    },
    {
      path: '/first',
      name: 'First',
      component: First
    },
    {
      path: '/user/:id/:name',
      name: 'User',
      component: User
    }

  ]
})
