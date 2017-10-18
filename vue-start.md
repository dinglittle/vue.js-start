
# 安装

### 1.全局安装 vue-cli
	npm install --global vue-cli
	
### 2.创建一个基于 webpack 模板的新项目
	vue init webpack my-project
	
### 3.安装依赖
	cd my-project
	npm install
	npm run dev
	//访问地址: localhost:8080/#/
	
	
---

### 脚手架详解

src - main.js 
项目的主入口,这里 导入必需的 文件( vue  ./App   ./router)

import Vue from 'vue'    安装的全局 vue 文件

import App from './App'   App.vue  name

import router from './router'    //在router-index.js 定义的 Router

上面三个 cli 自动生成,不用管,只需要添加 内容即可



```
main.js - 基本不用动

component - HelloWorld.vue 模版内容

App.vue - 入口页面

router - index.js - 主路由页面
```

---

## 开始

### 路由模块

https://router.vuejs.org/zh-cn/essentials/getting-started.html

用 Vue.js + vue-router 创建单页应用,是非常简单的. 

我们需要做的是, 将组件(component)映射到路由(routes),然后 告诉 
vue-router 在哪里渲染它们.
	
#### HTML
```
App.Vue

<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
<!-- vue-router 脚手架自动导入,所以不需要手机导入了 -->

    <!-- 使用 router-link 组件来导航 -->
    <!-- 通过传入 `to` 属性指定链接 -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
    <router-link to="/first">Go to first</router-link>
    <router-link to="/">Go to / </router-link>

    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
```	

#### JavaScript
```
router - index.js

// 0.如果使用模块化机制编程,导入 Vue 和 VueRouter

// 1.定义(路由)组件
// 可以从其他文件 import 进来

import Vue from 'vue'
import Router from 'vue-router'
//import 模板
import HelloWorld from '@/components/HelloWorld'

// 2.定义路由
// 每个路由应该映射一个组件.其中 "component" 可以是通过 Vue.extend() 创建的组件构造器
// 或者,只是一个组件配置对象

const routes = [
    { path: '/foo', component: Foo },
    { path: 'bar', component: Bar }
]

// 3.创建 router 实例, 然后传 `routes` 配置
const router = new VueRouter({
    routes // (编写) 相当于 routes: routes
})
    
// 4.创建和挂载根实例
// 记得要通过 router 配置参数注入路由,从而让整个应用都有路由功能
const app = new Vue({
    router
}).$mount('#app')
```

---

## 动态路由匹配

我们经常要把某种模式匹配到的所有路由,全部映射到同个组件. 例如,我们有一个 User 组件,对于所有 ID 各不相同的用户,都要使用这个组件来渲染. 那么,我们可以在 vue-router 的路由路径中使用 【动态路径参数】 (dynamic segment) 来达到这个效果:

```
const User = {
    template: `<div>User</div>`
}

const router = new VueRouter({
    routes: [
        //动态路径参数 以冒号开头
        { paht: '/user/:id/:name', component: User }
    ]
})

--HTML
路由传参 在模板中 使用  `$route.params.<参数名>`  获取
<template>
   <div>User {{ $route.params.id }} {{ $route.params.name}}</div>
</template>


<!-- 路由传参   "user/id=1/name=2" -->
<router-link to="/user/id=1/name=2">Go user </router-link>

一个 【路径参数】使用冒号：标记。当匹配到一个路由时，参数值会被设置到 `this.$route.params`，可以在每个组件内使用。于是，我们可以更新`User`的模板，输出当前用户的ID：

<div> User {{ $route.paams.id }}</div>
```



可以在一个路由中设置多段【路径参数】，对应的值都会设置到`$route.params`中


模式                            | 匹配路径              | $route.params
 ---                            |   ---                 | ---
/user/:username                 | /user/evan            | { username:'evan' }
/user/:username/post/:post_id   | user/evan/post/123    |  { username: 'evan',post_id:123

除了 `$route.params` 外， `$route`对象还提供了其它有用的信息，例如，`$route.query` (如果URL中有查询参数)、`$route.hash`等等。[API文档](https://router.vuejs.org/zh-cn/api/route-object.html)

#### 相应路由参数的变化

当使用路由参数时候，例如 从 `/user/foo` 导航 `user/bar` ，**原来的组件实例会被复用**。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。 **不过，这也意味着组件的生命周期钩子不会再被调用**。

复用组件时，想对路由参数的变化做出响应的话，可以简单地 watch (检测变化) `$route` 对象：

```
const User = {
    template: '...',
    watch: {
        '$route' (to, from){
            // 对路由变化作出响应
        }
    }
}
```

或者使用 2.2 中引入的 `beforeRouteUpdate` 守卫：
```
const User = {
    template: '...',
    beforeRouteUpdate (to, from ,next){
        // react to reoute changes ...
        // don't forget to call next()
    }
}
```