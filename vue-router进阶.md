
## 进阶
### 导航守卫
**导航表示路由正在发生改变**

正如其名,`vue-router`提供的导航守卫主要用来通过跳转或取消的方式守卫导航.有多种机会植入跌幅导航过程中: 全局的,单个路由独享的,或者组件级的.

记住**参数或查询的改变不会触发进入/离开的导航守卫**. 你可以通过 [观察`$route`对象]() 来应对这些变化,或使用 `beforeRouteUPdate` 的组件内守卫.

#### 全局守卫

你可以使用`router.beforeEach`注册一个全局的前置守卫:

```
const router = new VueRouter({...})

router.beforeEach((to , from , next) =>{
    // ...
})
```

当一个导航触发时,全局的前置守卫按照创建顺序调用.守卫是异步解析的执行,此时,导航所在的守卫 `resolve` 完之前一直处于 **等待中** .

每个守卫方法接收三个参数:
- **`to: Route:`** 即将要进入的目标 [路由对象](https://router.vuejs.org/zh-cn/api/route-object.html)
- **`from: Route`** 当前导航正要离开的路由
-  **`next: Function:`** 一定要调用方法来 **resolve** 这个钩子. 执行效果依赖 `next` 方法的调用 参数.

    -- `next():` 进行管道中的下一个金子.如果全部钩子执行完了,则导航的状态就是 **confirmed*8 (确认的).
    
    -- `next(false):` 中断当前的导航.如果浏览器的 URL 改变了(可能是用户手动或浏览器后退按钮)那么URL地址会重置到`from`路由对应的地址.
    
    -- `next('/')` 或者 `next({ path: '/' })` 跳转到一个不同的地址.当前的导航被中断,然后进行一个新的导航.
    
    -- `next(error)`:(2.4.0+)如果传入 `next` 的参数是一个 `Error` 实例,则导航会被终止且该错误会被 传递给 `router.onError()` 注册过的回调.
    
**要确保 `next` 方法,否则钩子就不会被 resolved**


#### 全局解析守卫

在2.和.0+你可用 `router.beforeResolve` 注册 不念旧恶全局守卫. 这和 `router.beforeEach` 类似,区别是在导航被确认之前,**同时在所有组件内守卫和异步路由组件被解析之后**,解析守卫就被调用.

#### 全局后置钩子

你也可以注册全局后置钩子,然而和守卫不同的是,这些钩子不会接受`next`函数也不会改变导航本身:
```
router.afterEach((to, from) =>{
    // ...
})
```

#### 路由独享的守恒

你可以在路由配置上直接定义 `beforeEnter` 守卫:
```
const router = new VueRouter({
    routes: [
        {
            path: '/foo',
            component: Foo,
            beforeEnter: (to ,from, next) => {
                // ...
            }
        }
    ]
})
```
这些守卫与全局前置守卫的方法参数是一样的.

#### 组件内的守卫

最后,你可以在路由组件内直接定义以下路由导航守卫:
- beforeRouteEneter
- beforeRouteUpdate (2.2新增)
- beforeRouteLeave

```
const Foo = {
    template: '...',
    beforeRouteEnter (to, from, next){
        // 在渲染该组件的对应路由被 confirm 前调用
        // 不!能!  获取组件实例 `this`
        // 因为当守卫执行前,组件实例还没被创建
    },
    beforeRouteUpdate (to, from, next){
        // 在当前路由改变,介是该组件被复用是调用 
        // 举例来说,对于一个带有动态参数的路径 /foo?id, 在 /foo/1 和 /foo/2 之间的时候,
        // 由于会同样的 Foo 组件,因此组件实例会被复用. 而这个钩子就会在这个情况下调用.
        // 可以访问组件实例 `this` 
    },
    beforeRouteLeave (to, from, next){
        // 导航离开该组件的对应路由时调用
        // 可以访问组件实例 `this`
    }
}
```

`beforeRouteEneter`守卫**不能**访问 `this` ,因为守卫在导航确认前被调用, 因此即将登场的新组件还没被创建.

不过, 你可以通过传一个回调给 `next` 来访问组件实例. 在导航被确认的时候执行回调, 并且把组件实例作为回调方法的参数.

```
beforeRouteEnter (to, from, next){
    next( vm => {
        // 通过 `vm` 来访问组件实例
    })
}
```
你可以在 `beforeRouteLeave` 中直接访问 `this`. 这个离开守卫通常用来禁止用户在还未保存修改前突然离开.可以通过 `next(false)` 来取消导航.

#### 完整的导航解析流程

1. 导航被触发.
2. 在失活的组件里调用离开守卫.
3. 调用全局的 `beforeEach` 守卫.
4. 在征用的组件里调用 `beforeRouteUpdate` 守卫(2.2+).
5. 在路由配置里调用 `beforeEnter`.
6. 解析异步路由组件.
7. 在被激活的组件里调用 `beforeRouteEnter`.
8. 调用全局的 `beforeResolve`守卫(2.5+).
9. 导航被确认.
10. 调用全局的`afterEach`钩子.
11. 触发 DOM 更新.
12. 用创建好的实例调用  `beforeRouteEnter` 守卫中传给 `next` 的回调函数.



### 路由元信息

定义路由的时候可以配置`meta`字段
```
const router = new VueRouter({
    routes: [
        {
            path: '/foo',
            component: Foo,
            children: [
                {
                    path: 'bar',
                    component: 'Bar',
                    // a meta field  需要认证
                    meta: {requiresAuth: true }
                }
            ]
        }
    ]
})
```

那么如何访问这个 `meta` 字段呢?

首先,我们称呼`routes`配置中的每个路由对象为 **路由记录**.跌幅记录可以是嵌套的,因此,当一个路由匹配成功后,也可能匹配多个路由记录

例如,根据上面的路由配置, `/foo/bar` 这个URL 将会匹配父路由记录以及子路由记录.

一个路由匹配到的所有路由记录会暴露为 `$route` 对象(还有在导航守卫中的路由对象),的 `$route.matched`数组.

因此,我们需要遍历 `$route.matched` 来检查元字段:
```
router.beforeEach((to, from, next ) => {
    if(to.matched.some( record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in 
        // if not ,redirect to login page .
        if( !auth.loggedIn()){
            next({
                path: '/login',
                query: { redirect: to fullPath }
            })
        } else {
            next()
        }
    } else {
        next() // 确保一定要调用 next()
    } 
})
```

### 过渡动效
`<router-view>`是基本的动态组件,所以我们可以用`<trasition>`组件给它添加一些过度效果:
```
<transition>
    <router-view></router-view>
</transition>
```
#### 单个路由的过渡
上面的用法会给所有路由设置一样的过渡效果,如果你想让每个路由组件有各自的过度效果,可以在各路由组件内使用`<transition>` 并设置不同的 name.

```
const  Foo = {
    template: `
        <transition name="slide">
            <div class="foo">...</div>
        </transition>
    `
}

const  Bar = {
    template:`
        <transition name="fade">
            <div class="bar">...</div>
        </transition>
    `
}
```

#### 基于路由的动态过渡

还可以基于当前路由与目标路由的变化关系,动态设置过渡效果:
```
<!-- 使用动态的 transition name -->
<transition :name="transitionName">
    <router-view></router-view>
</transition>

// 接着在父组件内
// watch $route 决定使用哪种过渡
watch: {
    '$route' (to, from) {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        this.transitionName = toDepth < fromDepth ? 'slide-right' ; 'slide-left'
    }
}
```

[完整例子](https://github.com/vuejs/vue-router/blob/next/examples/transitions/app.js)


### 数据获取 

有时候,进入某个路由后,需要从服务器获取数据. 例如,在渲染用户信息时,你需要从服务器用户的数据. 可以通过两种方式来实现:

- **导航完成之后获取:** 先完成导航,然后在接下来的组件生命周期钩子中获取数据. 在数据获取期间显示 【加载】 之类的指示.
-  **导航完成之前获取:** 导航完成前,在跌幅进入的守卫中获取数据,在数据获取成功后执行导航.

从技术角度讲,两咱方式都不错 -- 就看你想要的用户体验是哪种.

#### 导航完成后获取数据

当佻使用这种方式时,我们会马上导航和渲染组件,然后在组件的 `created` 金子中获取数据. 这让我们有机会在数据获取期间展示一个 loading 状态,还可以在不同视图间展示不同的 loading 状态.

假设我们有一个 `Post` 组件,需要基于 `$route.params.id` 获取文章数据:
```
<template>
    <div class="post">
        <div class="loading" v-if="loading">
            Loading...
        </div>
    <div>
    
    <div v-if="error" class="error">
        {{ error }}
    </div>
    
    <div v-if="post" class="content">
        <h2>{{ post.title }}</h2>
        <p>{ post.body }}</p>
    </div>
</template>

export default{
    data () {
        return {
            loading: false,
            post: null,
            error: null
        }
    },
    created (){
        // 组件创建完成获取数据,
        // 此时 data 已经被  observed 了
        this.fetchData()
    },
    watch: {
        // 如果路由有变化,会再次执行该方法
        '$route': 'fetchData'
    },
    methods: {
        fetchData () {
            this.error = this.post = null
            this.loading = true
            // replace getPost with your data fetching util / API wrapper
            getPost(this.Route.params.id, (err, post) => {
                this.loading = false
                if (err) {
                    this.error = err.toString()
                } else {
                    this.post = post
                }
            })
        }
    }
}
```

#### 在导航完成前获取数据

通过这种方式,在导航转入新的路由前获取数据. 可以在接下来的组件的 `beforeRouteEnter` 守卫中获取数据,当数据获取成功后只调用 `next` 方法

```
export default {
    data () {
        return {
            post: null,
            error: null
        }
    },
    beforeRouteEnter (to, from, next) {
        getPost(to.params.id, (err, post) => {
            next(vm => vm.setData(err, post)) 
        }
    },
    // 路由改变前,组件就已经渲染完了
    // 逻辑稍稍不同
    beforeRouteUpdate (to, from, next){
        this.post = null
        getPost(to.params.id, (err, post) =>{
            this.setData(err, post)
            next()
        })
    },
    methods: {
        setData (err, post) {
            if(err) {
                this.error = err.toString()
            } else {
                this.post = post
            }
        }
    }
}
```

在为后面的视图获取数据时,用户会停留在当前的界面,因此建议在数据获取期间,显示一些进度条或者别的指示.

如果数据获取失败,同样有必要展示一些全局的错误提醒.


### 滚动行为

使用前端路由,当切换到新路由时,想要页面滚到顶部,或者是保持原先的滚动位置,就像重新加载页面那样.

`vue-router`能做到,而且更好,它让你可以自定义路由切换时页面如何滚动.

**注意:这个功能只在 HTML5 history 模式下可用.**

当创建一个 Router 实例,你可以提供一个 `scrollBehavior` 方法:
```
const router = new VueRouter({
    routes: [...],
    scrollBehavior (to, from , savedPosition){
        // return 期望滚动到哪个位置
    }
})
```

`scrollBehavior` 方法接收`to` 和 `from` 路由对象. 第三个参数 `savedPosition` 当且仅当 `postate` 导航(通过浏览器的前进/后退按钮触发)时才可用.

这个方法返回滚动位置的对象信息,长这样:
- `{ x: number, y: number }`
- `{ selector: string, offset? : { x: number, y: number}}` (offset 只在2.6.0支持)

如果返回一个 falsy (译者注: falsy 不是 false , [参考这里](https://developer.mozilla.org/zh-CN/docs/Glossary/Falsy)的值,或者是一个空对象,那么不会发生滚动.

举例:
```
scrollBehavior ( to, from, savePosition){
    return { x:0 ,y:0 }
}
```

对于所有路由导航,简单地让页面滚动到顶部.

返回`savePosition`,在按下 后退/前进 按钮时,就会像浏览器的原生表现那样:
```
scrollBheavior( to, from, savedPosition){
    if (savedPosition){
        return savedPosition
    } else {
        return { x:0, y:0 }
    }
}
```

如果你要模拟 【滚动到锚点】 的行为:

```
scrollBehavior (to, from, savedPosition){
    if (to.hash){
        return {
            selector: to.hash
        }
    }
}
```
 我们还可以利用[路由元信息]()更细颗粒度地控制滚动,[完整例子](https://github.com/vuejs/vue-router/blob/next/examples/scroll-behavior/app.js)
 
 
 ### 路由懒加载
 
 当打包构建应用时, JavaScript 包会变得非常大,影响页面加载. 如果我们能把不同路由对应的组件分割成不同的代码块,然后当路由被访问的进修才加载对应组件,这样就更加高效了
 
 结合Vue的 [异步组件](https://cn.vuejs.org/v2/guide/components.html#异步组件) 和 Webpack 的 [代码分割功能](https://doc.webpack-china.org/guides/code-splitting),轻松实现路由组件的懒加载.
 
 首先,可以将异步组件定义为返回一个 Promise 的工厂函数 (该函数返回的 Promise 应该 resolve组件本身):
 ```
 cosnt Foo = () => Promise.resolve({ /* 组件定义对象 */ })
 ```
 
 第二,在Webpack2 中,我们可以使用[动态 import](https://github.com/tc39/proposal-dynamic-import)语法来定义代码分块点(split point);
 
 ```
 import('./Foo.vue') // 返回 Promise
 ```
 
 注意:如果您使用的是 Babel ,你将需要添加 [syntax-dynamic-import](https://babeljs.io/docs/plugins/syntax-dynamic-import/)插件, 才能使 Babel 可以正确地解析语法.

结合这两都,这就是如何定义一个能够被 webpack 自动代码分割的异步组件.

```
const Foo = () => import('./Foo.vue')
```

在路由配置中什么都不需要改变,只需要像往常一样使用 Foo:

```
const router = new VueRouter({
    routes: [
        { path: '/foo', component: Foo }
    ]
})
```

### 把组件按组分块

有时候我们想把某个路由下的所有组件都打包在同个异步块(chunk)中.只需要使用 [命名chunk](https://webpack.js.org/guides/code-splitting-require/#chunkname),一个特殊的注释语法来提供 chunk name (需要 Webpack>2.4)

```
const Foo = () => import(/* webpackChunkNmae: "group-foo" */ ./Foo.vue')
const Bar = () => import(/* webpackChunkNmae: "group-foo" */ ./Bar.vue')
const Baz = () => import(/* webpackChunkNmae: "group-foo" */ ./Baz.vue')
```
Webpack 会将任何一个异步模块与相同的块名称组合到相同的异步块中.