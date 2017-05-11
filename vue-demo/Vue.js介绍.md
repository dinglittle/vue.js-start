[返回首页](https://github.com/dinglittle/Vue.js-start) | [Demo](https://github.com/dinglittle/Vue.js-start/blob/master/vue-demo/HelloVue.html)

#Vue.js是什么
---
Vue.js是一套构建用户界面的**-渐进式框架-**. 与其他重量级框架不同给的是，Vue采用自底向上增量开发的设计. Vue的核心库只关注视图层, 它不仅易上手, 还便于与第三方库或既有项目整合. 另一方面, 当与 [单文组件](https://cn.vuejs.org/v2/guide/single-file-components.html) 和 [Vue生态系统支持的库](https://github.com/vuejs/awesome-vue#libraries--plugins)结合使用时,Vue也完全能够为复杂的单页应用程序提供驱动.

如果你是有经验的前端开发者,想知道 Vue.js 与其他库/框架的区别, 查看[对比其他框架](https://cn.vuejs.org/v2/guide/comparison.html).


#起步
---
尝试 Vue.js 最简单的方法是 [JSFiddle Hello World 例子](https://jsfiddle.net/chrisvfritz/50wL7mdz/). 你可以在浏览器新标签页中打开它，跟着例子学习一些基础用法。或者你也可以创建一个本地的 .html 文件, 然后通过如下方式引入 Vue:
`<script scr="https://unpkg.com/vue/dist/vue.js"></script>`
你可以查看[安装教程]()来了解其他安装 Vue 的选项. 注意我们**不推荐**新手直接使用 vue-cli ,尤其椒对 Node.js 构建工具不够了解的同学.


#声明式渲染
---
Vue.js的核心是一个允许腹胀 简洁的模板语法来声明式的将数据渲染进DOM:

![Hello Vue!](http://upload-images.jianshu.io/upload_images/1433759-7c246e29d9666bff.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```
<div id="app">
  {{message}}
</div>
```
```
var app = new Vue({
  el:'#app',
  data:{
    message:'Hello Vue!'
  }
})
```
我们已经生成了我们的第一个 Vue 应用! 看起来这跟单单渲染一个字符串模板非常类似,但是 Vue 在背后做了大量工作. 现在数据和 `DOM` 已经被绑定在一起, 所有的元素都是 响应式的 . 我们如何知道 ? 打开 浏览器的控制台 (就在这个[页面](https://cn.vuejs.org/v2/guide/index.html)打开) ,并修改 app.message, 你将看到上例 相应的更新.

除了文本插值,我们不可以采用 这样的方式绑定DOM元素属性:

![文本插值](http://upload-images.jianshu.io/upload_images/1433759-0c87e20b9113cfd0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```
<div id ="app-2">
  <span v-bind:title="message">
    鼠标悬停几秒查看此处动态绑定胡提示信息!
  </span>
</div>
```
```
var ap2 = new Vue({
  el:'#app-2',
  data:{
    message: '页面加载于' + Date.now()
  }
})
```
这里我们遇到点新东西. 你看到的 `v-bind` 属性被称为 **指令** . 指令带有前缀 `v-` , 能表示它们是 Vue 提供的特殊属性. 可以你已经猜了, 它们会在 渲染的 DOM 上应用特殊的响应行为. 简言这, 这里该指令的作用是:"将这个元素节点的 `title` 发展和 Vue 实例的 `message` 属性保持一致".

再次打开浏览器的 JavaScript 控制台输入 `app2.message = '新消息' `, 就会再一次看到这个绑定了 `title` 属性的 HTML 已经进行了更新.

#条件与循环
---
控制切换一个元素的显示也相当简单
```
<div id="app-3">
  <p v-if="seen">现在你看到我了</p>
</div>
```
```
var app3 = new Vue({
  el:'#app-3',
  date:{
    seen:true
  }
})
```

继续在控制台设置 `app3.seen = false` , 你会发现 "现在你看到我了" 消失了.

这个例子演示了我们不公可以绑定 DOM 文本到数据, 也可以绑定 DOM 结构 到数据 . 而且, Vue 也提供一个强大的过渡效果系统, 可以在 Vue 插入/更新/删除 元素时自动应用 过渡效果.

还有其它很多指令, 每个都有特殊的功能 . 例如 , `v-for` 指令可以绑定数组的数据来渲染一个项目列表:

![v-for](http://upload-images.jianshu.io/upload_images/1433759-eec1d6cec6cb5cd1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```
<div id="app-4">
  <ol>
    <li v-for="todo in todos">
      {{todo.text}}
     </li>
  </ol>
</div>
```
```
var app4= new Vue({
  el:'#app-4',
  data:{
    todos:[
      {text:'学习javascript'},
      {text:'学习javascript'},
      {text:'学习javascript'}
    ]
  }
})
```

#处理用户输入
---
为了让用户和佻的应用进行互动 , 我们可以用 `v-on` 指令绑定一个事件监听器 , 通过它调用我们 Vue 实例中定义的方法:

![逆转前](http://upload-images.jianshu.io/upload_images/1433759-0d48b587941954d6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![逆转后](http://upload-images.jianshu.io/upload_images/1433759-8775c1a28988d41f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```
<div id="app-5">
  <p>{{message}}</p>
  <button v-on:click="reverMessag">逆转消息</button>
</div>
```
```
var app4 = new Vue({
  el:'#app-5',
  methods:{
    reverMessage: function(){
      this.message = this.message.split('').reverse().join('');
    }
  }
})
```

注意在 `reverseMessage` 方法中, 我们更新了应用的状态, 但没有触碰 DOM--所有的DOM操作都由 Vue 来处理, 你编写的代码只需要关注底层逻辑.

Vue还提供了 `v-model` 指令,它能轻松实现表单输入和应用状态之间的双向绑定.
```
<div id="app-6">
  <p>{{message}}</p>
  <input v-model="message">
</div>
```
```
var app6 = new Vue({
  el:'#app-6',
  date:{
    message: 'Hello Vue!'
  }
})
```

#组件化应用构建
---
组件系统是 Vue 的另一个重要概念, 因为它是一种抽象 , 允许我们使用小型 自包含和通常可复用的组件构建大型应用 . 仔细想想,几乎任意类型的应用界面都可以抽象为一个组件树:

![组件树](http://upload-images.jianshu.io/upload_images/1433759-ada2ec106b124fc6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```
//定义名为 todo-item 的新组件
Vue.component('todo-item', {
  template: '<li>这是个待办项</li>'
})
```
现在你可以用它构建另一个组件模板
```
<ol>
  //创建一个 todo-item 组件的实例
  <todo-item></todo-item>
</ol>
```
但是这样会为每个待办项渲染同样的文本,这看起来并不炫酷 , 我们应该能将数据从父作用域传到子组件 . 让我们来修改一个组件的定义 , 使之能够接受一个 属性:
```
Vue.componet('todo-item',{
  //todo-item 组件现在接受一个
  //"prop" , 类似于一个自定义属性
  //这个属性名为 todo
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})
```
现在, 我们可以使用 `v-bind` 指令将待办项传到每一个重复的组件中:
```
<div id="app-7">
  <ol>
    //现在我们为每个 todo-item 提供待办期内对象
    //待办期内对象是变量, 即其内容可以是动态的
    <todo-item v-for="item in grocerList" v-bind:todo="item"></todo-item>
  </ol>
</div>
```
```
Vue.componet('todo-item',{
  props:['todo'],
   template:'<li>{{todo.text}}</li>'
})

var app7 = new Vue({
  el:'#app-7',
  data:{
    groceryList:[
      {text:'apple'},
      {text:'orange'},
      {text:'banana'}
    ]
  }
})
```

![全局组件](http://upload-images.jianshu.io/upload_images/1433759-31dd35adea02bbf3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

这只是一个假设的例子，但是我们已经设法将应用割成了两个更小的单元，子单元通过 `props` 接口实现了与父单元很好的解耦 . 我们现在可以进一步为我们的 `todo-item` 组件实现更复杂的模板和逻辑的改进, 而不会影响到父单元.

在一个大型应用中,有必要将整个应用程序划分为组件 , 以使开发可管理. 在后续教程 我们将详述组件 , 不过这里有一个(假想的)使用了组件的应用模板是什么样的例子:
```
<div id="app">
  <app-view>  
    <app-nav></app-nav>
    <app-content></app-content>
  <app-view>
</div>
```

#自定义元素的关系
---
你可能已经注意到 Vue 组件非常类似于 **自定义元素** --它是 Web组件规范的一部分, 这是因为Vue的组件语法部分参考了该规范. 例如 Vue 组件实现了 Slot API 与 is 特性. 但是, 还是有几个关键差别:
1.Web组件规范仍然处于草案阶段, 并且尚无浏览器原生实现. 相比之下, Vue组件不需要任何补丁, 并且在所有支持的浏览器(IE9及更高版本)之下表现一致. 必要时, Vue组件也可以包装于原生自定义元素之内.

2.Vue组件提供了纯定义元素所不具备的一些重要功能, 最突出的跨组件数据流, 自定义事件通信以及构建工具集成.

#准备好了吗?
---
我们刚才简单介绍了Vue核心最基本的功能--本教程的其余将涵盖这些功能以及 其他高级功能更详细的细节
