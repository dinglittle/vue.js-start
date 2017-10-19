
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

#### 高级匹配模式

`vue-router`使用 [path-to-regexp](https://github.com/pillarjs/path-to-regexp) 作为路径匹配引擎,所以支持很多高级的匹配模式,例如: 可选的动态路径参数、匹配零个或多个、一个或多个,甚至是自定义正则匹配. 查看
[demo](https://github.com/vuejs/vue-router/blob/next/examples/route-matching/app.js)

```
const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        { path: '/' },
        // params are denoted with a colon ":"  
        // params用 : 表示
        { path: '/params/:foo/:bar' },
        // a params can be made optional by adding "?"
        // 通过添加 "?" 可以选择一个参数
        { path: '/optional-params/:foo?' },
        // a param can be followed by a regex pattern in parens
        // param 可以后面是一个正则表达式在括号中
        // this route will only be matched if :id is all numbers
        // 这个路由只会匹配 :id 是全部数字
        { path: '/params-with-regex/:id(\\d+)' },
        // asterisk can match anything
        // 星号可以匹配任何东西
        { path: '/asterisk/*' },
        // make part of the path optional by wrapping with parens and add "?"
        // 通过用括号括起来,使路径的一部分可选,然后添加"?"
        { path: '/optional-group/(foo/)?bar' }
    ]
})
```

#### 匹配优先级
有时候,同一个路由可以匹配多个路由,此时,匹配的优先级就按照路由的定义顺序 : **谁先定义的,谁的优先级就最高**.

---
## 嵌套路由

实际生活中的应用界面,通常由多层嵌套胡组建组合而成.同样地, URL中各段动态路径也按某种结构对应嵌套的种层组件,例如:

```
/user/foo/profile                     /user/foo/posts
+------------------+                  +-----------------+
| User             |                  | User            |
| +--------------+ |                  | +-------------+ |
| | Profile      | |  +------------>  | | Posts       | |
| |              | |                  | |             | |
| +--------------+ |                  | +-------------+ |
+------------------+                  +-----------------+
```
借助 `vue-router`,使用嵌套路由配置,就可以很简单地表达这种关系.
接着上面的 app:
```
<div id="app">
    <router-view></router-view>
</div>

const User = {
    template : '<div> User {{ $route.params.id }} </div>'
}

const router = new VueRouter({
    routes: [
        { path: '/user/:id' , component: User }
    ]
})

```
这里的 `<router-view>` 是最顶层的出口,渲染最高级路由匹配到的组件. 同样地,一个被渲染组件同样可能包含自己的嵌套`<router-view>`.例如,在 User 组件的模板添加一个 `<router-view>`:
```
comst User = {
    template: `
        <div class="user">
            <h2>User {{ $route.params.id }}</h2>
            <router-view></router-view>
        </div>
    `
}
```
要在嵌套的出口中渲染组件,需要在 `VueRouter` 的参数中使用 `children` 配置:
```
const router = new VueRouter({
    routes: [
        { path:'/user/:id', component: User,
        children: [
            {
                // 当 /user/:id/profile 匹配成功
                // UserProfile 会渲染在 User 的 <router-view> k 
                path: 'profile',
                component: UserProfile
            },
            {
                // 当 /user/:id/posts 匹配成功
                // UserPosts 会被渲染在 User 的 <router-view> 中
                path: 'posts',
                component: UserPosts
            }
        ]
    ]
})
```
**要注意,以/开头的嵌套路径会被当作根路径. 这让你充分的使用嵌套组件而无须设置嵌套的路径.**

你会发现,`children `配置就是像`routes`配置一样的路由配置数组,所以,可以嵌套多层路由.

此时,基于上面的配置,当你访问 `/user/foo` 时, `User`的出口是不会渲染任何东西,这是因为没有匹配到合适的子路由. 

**_我们定义一个空的路由,当没有匹配到内容的时候不至于白屏，但是这个空路由要放到最后_**

```
const router = new VueRouter({
    routes: [
        path: '/user/:id', component: User,
        children: [
            // 当 /user/:id 匹配成功
            // UserHome 会被渲染在 User 的 <router-view> 中
            { path: '', component: UserHome },
            
            // ...其他子路由
        ]
    ]
})
```

---
## 编程式导航

除了使用 `<router-link>` 创建 a 标签来定义导航链接,我们还可以借助 router 的实例方法,通过编写代码来实现.

```
router.push( location , onComplete?, onAbort?)
```
**注意:在Vue实例内部,你可以通过 `$router` 访问路由实例.因此你可以调用 `this.$router.push`.**

想要导航到不同的 `URL` ,则使用 `router.push` 方法. 这个方法会向 htstory 栈添加一个新的记录,所以,当用户点击浏览器后退按钮时,则回到之前的URL.

当你点击 `<router-link>` 时,这个方法会在内部调用,所以说,点击 `<router-link :to="...">`等同于调用 `<router.push(...)`.


声明式 | 编程式
---|---
`router-link :to="">` | `router.push(...)`

该方法的参数可以是一个字符串路径,或者一个描述地址的对象.例如:

```
//字符串
router.psh('home')

//对象
router.push({path:'home'})

//命名的路由
router.push({ name:'user', params: { userId: 123 }})

//带查询参数,变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
```
**注意:如果提供了 `path`,`params`会被忽略,上述例子中的 `qurey` 并不属于这种情况.取而代之的是下面例子的做法,你需要提供路由的 `name` 或手写完整的带有参数的 `path`:**
```
    const userId = 123
    router.push({ name: 'user', params: { userId }}) // -> /user/123
    router.push({ path: 'user/${userId}` }) // -> /user/123
    // 这里的 params 不生效
    router.push({ path: '/user', params: { userId }}) // -> /user
```

同样的规则也适用于 `router-link` 组件的 `to` 属性.

在2.2.0+ ,可选的在 `router.push` 或 `router.replace` 中提供 `onComplete` 和 `onAbort` 回调作为第二个和第三个参数. 这些回调将会在导航成功完成(在所有的异步钩子被解析之后)或终止(导航到相同的路由、或在当前导航完成之前导航到另一个不同的路由)的时候进行相应的调用。

**注意：**如果目的地和当前路由相同，只有参数发生了改变（比如从一个用户资料到另一个 `/users/1` -> `/users/2` 你需要使用 [berforeRouteUpdate]() 来响应这个变化(比如抓取用户信息).

**`router.replace(laction, onComplete?, onAbort?)`**

跟 `router.push` 很像,唯一的不同就是,它不会向 history 添加新记录,而是跟它的方法名一样 -- 替换当前的 history 记录.

声明式|编程式
--|--
 `<router-link : to="... relpace>`|`router.replace(...)`

**`router.go(n)`**
这个方法的参数是一个整数,意思是在 history 记录中向前或者后退多少步,类似 `window.history.go(n)`.

例子
```
// 在浏览器记录中前进一步,等同于 history.forward()
router.go(1)

// 后退一步记录,等同于 history.back()
router.go(-1)

// 前进3步记录
router.go(3)

// 如果 history 记录不够用,那就默默地失败呗
router.go(-100)
router.go(100)
```
#### 操作 History
你也许注意到 `router.push`、`router.replace` 和 `router.go` 跟 [windwo.history.pushState、window.hostory.replaceState 和 window.history.go](https://developer.mozilla.org/en-US/docs/Web/API/History) 好像,实际上它们确实是效仿 `window.history` API 的.

因此 ,如果你已经熟悉 [Browser History APIs]() , 那么在 vue-router 中操作 history 就是超级简单的.

还有值得提及的 , vue-router 的导航方法( `push`、`replace`、`go`) 在各类路由模式( `history`、`hash` 和 `abstract`) 下表现一致.


---
## 命名路由

有时候,通过一个名称来标识一个路由显得方便一些, 特别是在链接一个路由,或者是执行一些跳转的时候. 你可以在创建 Router 实例的时候,在 `routes` 配置中给某个路由设置名称.

```
const router = new VueRouter({
    routes: [
        path: '/user/:userId',
        name: 'user',
        component: User
    ]
})
```

要链接到一个命名路由,可以给 `router-link` 的 `to` 属性传一个对象:

```
<router-link :to="{ name: 'user', params: {userId: 123 }}">User</router-link>
```

这跟代码调用 `router.push()` 是一回事:

```
router.push({ name: 'user', params: {userId: 123}})
```
这两种方式都会把路由导航到 `/user/123` 路径.  [完整例子](https://github.com/vuejs/vue-router/blob/next/examples/named-routes/app.js)


---

## 命名视图

有时候想同时(同级)展示多个视图,而不是嵌套展示,例如创建一个布局,有`sidebar`(侧导航)和`main`(主内容)两个视图,这个时候命名视图就派上用场了.你可以在界面中拥有多个单独命名的视图,而不是只有一个单独 的出口.如果 `router-view` 没有设置名字,那么默认为 `default`.

```
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>
```
一个视图使用一个组件渲染,因此对于同个路由,多个 视图就需要多个组件. 确保正确使用 `component` 配置(带上s);
```
const router = new VueRouter({
    routes: [
        {
            path: '/',
            components: {
                default: Foo,
                a: Bar,
                b: Baz
            }
        }
    ]
})
```

## 重定向和别名

#### 重定向

重定向也是通过 `routes` 配置来完成,下面例子是从 `/a` 重定向到 `/b`:
```
const router = new VueRouter({
    routes: [
        { path: '/a', redirect: '/b' }
    ]
})
```
重定向的目标也可以是一个命名的路由:
```
const router = enw VueRouter({
    routes: [
        { path: '/', redirect: { name: 'foo' }}
    ]
})
```
甚至是一个方法,动态返回重定向目标:
```
const router = new VueRouter({
    routes: [
        { path: '/a'. redirect: to =>{
            // 方法接收 目标路由 作为参数
            // return 重定向的 字符串路径/路径对象
        }}
    ]
})
```
其它高级 用法,[例子](https://github.com/vuejs/vue-router/blob/next/examples/redirect/app.js)


#### 别名
【重定向】的意思是，当用户访问 `/a`时,URL 将会被替换成 `/b` ,然后匹配路由为 `/b`,那么【别名】又是什么呢?
**`/a`的别名是`/b`,意味着,当用户访问`/b`时,URL会保持为 `/b`,但是路由匹配则为`/a`,就像用户访问`/a`一样.**
```
const router = new VueRouter({
    routes: [
        { path: '/a', component: A, alias: '/b' }
    ]
})
```
【别名】的功能让你可以自由地将UI结构映射到任意的URL，而不是受限于配置的嵌套路由结构。

高级用法 [例子](https://github.com/vuejs/vue-router/blob/next/examples/route-alias/app.js)

---
## 路由组件传参

在组件中使用 `$route` 会使之与其对应路由形成高度耦合,从而使组件只能在某些特定的url上使用,限制了其灵活性.

使用props将组件和路由解耦:

![image](https://user-images.githubusercontent.com/17232138/31766074-258f676a-b4f9-11e7-965b-855e84c6b6e1.png)**与$toute耦合**

```
const User = {
    template: '<div> User {{ $route.params.id }}</div>'
}

const router = new VueRouter({
    routes: [
        { path: '/user/:id', component: User }
    ]
})
```
![image](https://user-images.githubusercontent.com/17232138/31766276-a96cc4ec-b4f9-11e7-9f23-e6ede550a226.png)**使用props解耦**

```
const User = {
    props: ['id'],
    template: '<div>User {{ id }} </div>'
}

const router = new VueRouter({
    routes: [
        { path: '/user/:id', component: User, props: true} 
        
        // 对于包含命名视图的路由,必须分别为每个命名视图添加 props 选项:
        {
            path: '/user/:id',
            components: { default: User, sidebar: Sidebar },
            props: { default: true, sidebar: fase }
        }
    ]
})
```
这样便可能在任何地方使用该组件,使得该组件更易于重用和测试.

#### 布尔模式

如果 props 被设置为 御前, `route.params` 将会被设置为组件属性.

#### 对象模式

如果props是一个对象,它会被原样设置为组件属性. 当 props 是静态的时候有用.

```
const router = new VueRouter({
    routes: [
        { path: '/paromotion/from-newsletter', component: Promotion, props: { newsletterPopup: fase }}
    ]
})
```

#### 函数模式

可以创建一个函数返回 props. 这样便 可以将参数转换成另一种类型,将静态值与基于路由的值结合等等.

```
const router = new VueRouter({
    routes: [
        { path: '/search', component: SearchUser, props: (route) => ({query: route.query.q }) }
    ]
})
```

Url: `/search?q=vue` 会将 `{query: "vue"}` 作为属传递给 SearchUser 组件.


请尽可能保持 props 函数为无状态的,因为它只会路由发生变化时起作用. 如果你需要状态来定义 props ,请使用包装组件,这样vue才可以对状态变化做出反应.




## HTML5 History 模式
`vue-router`默认 hash 模式 -- 使用URL 的 hash 来模拟一个完整的URL,于是当URL改变时,页面不会重新加载.

如果不想要很丑的 has, 我们可以用路由的 **histroy模式** ,这种模式充分利用 `history.pushState` API 来完成 URL跳转而无须重新加载页面.

```
const router = new VueRouter({
    mode: 'history',
    routes: [...]
})
```
当使用history械时,URL 就像正常的url, 例如 `http://yoursite.com/user/id` ,也好看!

不过这种模式要玩好,还需要后台配置支持.因为我们的应用 是页客户端应用,如果后台没能正确的配置,当用户在浏览器直接访问 `http://outsite.com/user/id` 就会返回  404,这是就好看了.

所以呢,你要在服务端增加一个覆盖所有病况的候选资源: 如果 URL匹配不到任何静态资源,则应该返回同一个 `index.html` 页面,这个页面就是你 app 依赖的页面.

#### 后端配置例子

##### Apache
```
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>
```

##### nginx
```
location /{
    try_files $uri $uri/ /index.html;
}
```

##### 原生 Node.js
```
const http = require('http')
const fs = require('fs')
const httpPort = 80

http.createServer((req,res)=>{
    fs.readFile('index.htm','uft-8',(err,content) =>{
        if( err ){
            console.log('We cannot open' index.htm ' file. ')
        }
        
        res.writeHead( 200, {
            'Content-Type': 'text/html; charset=utf-8'
        })
        
        res.end(content)
    }
}).listen( httpPort, ()=>{
    console.log('Server listening on: http://localhost:%s', httpPort)
})
```

##### 基于Node.js的Express

对于 Node.js/Express ,请考虑使用 [connect-history-api-fallback中间件](https://github.com/bripkens/connect-history-api-fallback)

**Internet Infomation Service( IIS )**
1.安装 [ISS UrlRewrite](https://www.iis.net/downloads/microsoft/url-rewrite)

2.在你的网站根目录中创建一个`web.config`文件,内容如下:

```
</xml version="1.0" encoding="UTF-8"?>
<configuration>
    <system.webServer>
        <rewrite>
            <rules>
                <rule name="Handle History Mode and custom 404/500" stopProcessing="true">
                    <match url="(.*)" />
                    <conditions logicalGrouping="MatchAll">
                        <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
                        <add input="{REQUEST_FILENAME}" mat
                    </conditions>
                </rule>
            </rules>
        </rewrite>
    </system.webServer>
</configuration>
```

##### Caddy
```
rewrite {
    regexp .*
    to { path} /
}
```

#### 警告

给个警告,因为这么做以后,你的服务器就不再返回 404 错误页面,因为这对于所有路径都会返回 `index.html`文件.
为了避免这种情况,你应该在 vue 应用里面覆盖所有的路由情况, 然后在给了一个404页面.

```
const router = new VueRouter({
    routes:[
        { path: '*', component: NotFoundComponent }
    ]
})
```
或者,如果你使用 Node.js 服务器,你可以用服务器端路由匹配到来的URL,并没有匹配到路由的时候返回 404 ,以实现回退. [Vue服务端渲染文档](https://ssr.vuejs.org/zh/)

# 命名路由
```
<!-- 给路由配置名字,在跳转的时候通过名字跳转 -->
<router-link :to="{name:'Hello',params:{userId: 123, name: 'testName'}"></router-link>
```
