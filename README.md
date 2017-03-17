# Vue.js 学习之路 
```
<html>

<head>
    <title>vue2.0-基础</title>
    <script src="vue.js"></script>
    <script src="https://unpkg.com/axios@0.12.0/dist/axios.min.js"></script>
    <script src="https://unpkg.com/lodash@4.13.1/lodash.min.js"></script>
    <style>
        li p:nth-child(1){
            font-size: 30px;
            color:black;
        }
        .static{
            font-size:20px;
            font-weight: bold;
        }
        .active{
            color: green;
        }
        .text-danger{
            color: rebeccapurple;
            font-size: 20px;
            font-weight: bold;
        }
    </style>
    <script>
        // 全局组件, 不能放在 window.onload 中,否则报错  Vue.component 不是一个方法
        Vue.component('my-item', {
            template: '<div style="color:green">全局组件</div>'
        })

        var data = { counter: 0 }
    </script>
    <script>
        //注意  这里 要放在 DOM 渲染完毕之后
        window.onload = function () {
            // window.onload = function () {
            //实例化 vue 实例
            var app = new Vue({
                //选项
                el: '#app',
                data: {
                    num: 1,
                    message: 'Hello Vue!',
                    message2: '页面加载于' + new Date(),
                    message3: '页面加载毫秒数' + Date.now(),
                    filterMessage:'my name is ',
                    filterNum: 100,
                    seen: true,
                    url:'http://www.baidu.com',
                    todos: [
                        { text: '学习 javascript' },
                        { text: '学习 vue' },
                        { text: '学习...' },
                        { text: '学习...' }
                    ],
                    myHtml: '<button>myButton</button>',
                    question:'',
                    answer:'I cannot give you an answer until you ask a quersiotn!',
                    isActive:true,
                    hasError:true,
                    classObj:{
                        active:true,
                        'text-danger':false
                    },
                    // class 与 style 数组语法
                    activeClass:'active',
                    errorClass:'text-danger',
                    // 绑定内联样式
                    activeColor:'red',
                    fontSize:30,
                    // 绑定内联样式  直接绑定一个对象
                    styleObject:{
                        color:'red',
                        fontSize:'13px'
                    },
                    // v-if
                    ok:true
                },
                // 方法
                methods: {
                    reverseMessage1: function () {
                        this.message = this.message.split('').reverse().join('')
                    },
                    // _.debounce 是一个通过 loadsh 限制操作频率的函数。
                    // 在这个例子中，我们希望限制访问 yesno.wtf/api 的频率
                    // ajax请求直到用户输入完毕才会发出
                    // 学习更多关于 _.debounce function (and its cousion _.throttle ), 参考: https://loadsh.com/docs#debounce
                    getAnswer:_.debounce(
                        function(){
                            var vm = this
                            //检测  输入的 question 中是否有指定字符 ， 返回 -1 则是没有 ， 直接 return 
                            if(this.question.indexOf('a')=== -1 ){
                                vm.answer = "Question usually contain a question mark.;"
                                return
                            }
                            //假如 输入的 question 中有指定字符 ，开始搜索 ， 返回结果
                            vm.answer = "Thinking ..."
                            axios.get('https://yesno.wtf/api')
                            .then(function(response){
                                vm.answer = _.capitalize(response.data.answer)
                            })
                            .catch(function(error){
                                vm.answer = "Error! Could not reach the API." + error
                            })
                        },
                        //这是我们为用户停止输入等待的毫秒数
                        500
                    )
                },
                //组件  局部注册
                components: {
                    'example': {
                        template: '<div style="color:red">局部组件</div>'
                    },
                    // Vue 解析 组件的时候有限制,必须是符合 浏览器和标准化 HTML 的内容, 像 <ul> <ol> <table> <select> 限制了能被它包裹的元素, <option> 只能出现在 其他元素的内部
                    // 有限制的 组件需要通过  is 属性
                    'example2': {
                        template: '<button @click="counter+=1" >有限制的组件{{ counter }}</button>',
                        //这样使用  data 会报错 , data 必须是一个函数
                        // data: {
                        //     message2:"hello hello"
                        // }
                        data: function () {
                            // return data  这种 三个 按钮值相同
                            //由于这三个组件 共享了同一个 data , 因此增加一个 counter会影响所有组件！　这不对。　我们可以通多为每个组件返回　全薪的 data 对象来解决这个问题
                            //这种方式 每个按钮的值都是独立的
                            return {
                                counter: 0
                            }
                        }
                    },
                    // 样式绑定下的 组件
                    'my-compent':{
                        template:'<div class="normal">hi i am  compent</div>'
                    }
                    
                },
                //过滤器
                filters:{
                    // 自定义的过滤器
                    capitalize: function(value){
                        //假如没有 则返回 ''
                        if(!value) return ''
                        //转换成字符串
                        value = value.toString()
                        //将首字符 转换 拼接后面的返回
                        return value.charAt(0).toUpperCase()+value.slice(1)
                    },
                    lower:function(value){
                        if(!value) return ''
                        value = value.toString()
                        return value.charAt(0).toLowerCase()+value.slice(1)
                    },
                    filterA:function(value1, value2,value3){
                        console.log(typeof value1, typeof value2);
                        console.log(value2);
                        console.log(parseInt(value3));
                        return (value1 + value2).toString().substr(parseInt(value3));
                    }
                },
                //计算属性   复杂的运算 不适合 直接在 HTML 中计算,这时 就需要 通过 计算属性 
                //计算属性 和  方法 都可以执行 同样的事情 ,但是  计算属性是基于它们的依赖进行缓存的 . 计算属性只有在它的相关依赖发生改变时才会重新取值. 
                //这就意味着只有  message 还没有发生改变 , 多次访问 reversedMessage 计算属性会立即返回之前的计算结果, 而不必再次 执行函数
                //只要我们重新渲染， method 调用总会执行该函数
                //为什么要缓存？ 假设我们有一个性能开销比较大的计算属性A ， 它需要遍历一个极大的数组和做大量的计算 。然后我们可能有其他的计算属性依赖于A，
                //如果没有缓存， 我们将不可避免的多次执行 A 的 getter ! 如果希望有缓存 ， 请用 methods 替代。
                computed:{
                    //a computed getter
                    // console.log(vm.reversedMessage)
                    // vm.message = 'GoodBye'
                    // console.log(vm.reversedMessage)
                    reversedMessage2:function(){
                        //this points to vem instance
                        return this.message.split('').reverse().join('')
                    },
                    now:function(){
                        return Date.now();
                    },
                    //计算 setter
                    //计算属性默认只有 getter ，不过在需要时你也可以提供一个 setter
                    fullName:{
                        //getter
                        get:function(){
                            return this.firstName + '' + this.lastName
                        },
                        //setter
                        set:function(newValue){
                            var naems = newValue.split('');
                            this.firstName = names[0]
                            this.lastName = names[names.length-1]
                        }
                        //现在在运行 vm.fullName = 'John Doe' 时， setter 会被调用 ， vm.firstName 和 vm.lastName 也相应也会被更新
                    },
                    // 绑定 样式 计算属性
                    classObject:function(){
                        return {
                            active: this.isActive && !this.error,
                            'text-danger':this.error && this.error.type === 'fatal'
                        }
                    }

                },
                // 观察 Wathcers
                // 虽然计算属性在大多数情况下更合适 ， 但有时也需要一个自定义的watcher 。 这是为什么 Vue 提供一个更通用的方法通过 watch 选项 ，来响应数据的变化 。 
                // 当你想要在数据变化响应时， 执行异步操作或开销较大的操作， 这是很有用的。
                watch:{
                    //如果 question 发生改变， 这个函数就会执行
                    question:function(newQuestion){
                        this.answer = "Waiting for you to stop typing..."
                        this.getAnswer()
                    }
                }
            })
        }
    </script>
</head>

<body>
    <div id="app">


        <ul>
            <li>
                <!-- v-once 指令 , 只执行一次 -->
                <div v-once>v-once {{message}}</div>
            </li>
            <li>
                <!-- 双大括号 会将数据解释为纯文本, 而非 HTML. 为了输出真正的HTML, 需要使用  v-html  命令-->
                <div v-html="myHtml"></div>
            </li>
            <li>
                <!-- 双大括号绑定  -->
                {{ message }}
            </li>
            <li>
                <p>使用JavaScript 表达式</p>
                <button>{{num}}</button>
                <p>{{num+1}}</p>
                <p>{{num?'YES':'NO'}}</p>
                <p>{{message.split('').reverse().join('')}}</p>
            </li>
            <li>
                <!-- v-bind 绑定-->
                <span v-bind:title="message2">鼠标悬停几秒查看此处动态绑定的提示信息!</span>
                <p v-bind:title="message3">
                    鼠标悬停几秒查看 毫秒数
                </p>
            </li>
            <li>
                <p>指令</p>
                <p style="color:crimson">指令: 是带有 v- 前缀的特殊属性. 指令属性的值预期是单一 JavaScript 表达式 , 指令的职责就是当其表达式的值改变时相应地将某些行为应用到 DOM 上.</p>
                <a v-bind:href="url">百度</a>
                <!-- v-if 条件与循环-->
                <p v-if="seen">v-if 现在你看到我了</p>

            </li>

            <li>
                <!-- v-for 循环 -->
                <ul>
                    <li>v-for 循环</li>
                    <li v-for="todo in todos">
                        {{todo.text}}
                    </li>
                </ul>
            </li>
            <li>
                <!-- v-on 绑定事件
            	    @click:"show()"   等价于  v-on:click="show()"

                    它们看起来可能与浦头的HTML略有不同 , 但 : 与 @ 对于属性名来说都是合法字符 , 在所有支持 Vue.js 的浏览器都能被正确的计息. 
                    而且, 它们不会出现在最终渲染的标记. 缩写语法是完全可选的 
                -->
                <button v-on:click="reverseMessage1">逆转消息1</button>
                <button @click="reverseMessage1">逆转消息2</button>
            </li>
            <li>
                <!-- 数据绑定  v-model -->
                <input type="text" v-model="message">
            </li>
            <li>
                <!-- 自定义组件 -->
                <ul v-for="item in [1,2,3]">
                    <my-item></my-item>
                    <example></example>
                </ul>
            </li>
            <li>
                <!-- 有限制的组件 需要通过 特殊的 is 属性 -->
                <ul v-for="item in 1,2,3">
                    <li is="example2"></li>
                </ul>
            </li>
            <li>

            </li>
            <li>
                <p style="color:red">过滤器</p>
                <p>vue.js允许自定义过滤器，可被用作一些常见的文本格式化。过滤器可以用在两个地方: mustache 插值 和 v-bind 表达式.
                过滤器应该被添加在 JavaScript 表达式的尾部, 有'管道'符指示:</p>
                <p>
                    {{filterMessage | capitalize}}
                    <br>
                    {{filterMessage | capitalize | lower}}
                    <br>
                    <!-- 这里 message 将传给过滤器 作为第二个参数 , 0 表达式的值将被求值 然后传给过滤器作为第三个参数 -->
                    {{filterNum | filterA( message, 0)}}
                </p>
            </li>
            <li>
                <p>-计算属性</p>
                模板内的表达式是非常 便利的, 但是 它们实际上只用于简单的运算. 在模板中放入 太多的逻辑会让模板过中且难以维护
                <p>Original message:"{{message}}"</p>
                <!-- 通过计算属性的 字符串 反转  -->
                <p>Computed reversed message: "{{reversedMessage2 }}"</p>
                <p>"{{now}}"</p>
            </li>
            <li>
                <p>-观察 Watchers</p>
                <p>
                    Ask a yes/no question:
                    <input v-model="question">
                </p>
                <p>{{answer}}</p>
            </li>
            <li>
                <p>Class 与 Style 绑定</p>
                数据绑定一个常见需求就操作元素的 class 列表和它的内联样式 。 因为它们都是属性，我们要以用 v-bind 处理它们：只需要计算出表达式最终的字符串。 
                不过，字符串拼接麻烦又易错。因此在 v-bind 用于 class 和 style 时， Vue.js 专门增强了它。表达式的结果类型除了字符串之外，还可以是对象或数组。
                
                <p>-绑定 HTML Class</p>
                我们可以传给 v-bind:class 一个对象 ，以动态切换 class
                <span>
                    '<'div v-bind:class="{active:isActive}"'></'div'>'
                </span>
                <div v-bind:class="{active:isActive}">active:isActive ---<span v-html="isActive"></span> </div>
                <p>上面的语法表示 class active 的更新  将取决于数据属性 isActive 是否为 真值</p>
                <p>我们也可以在对象中传入更多属性来动态切换多个class 。 此外 ，v-bind:class 指令可以与普通的 class 属性共存。 </p>
                <div class="static" v-bind:class="{active:!isActive, 'text-danger':hasError }">text-danger:hasError ---<span v-html="hasError"></span> </div>
                当 isActive 或者 hasError 变化时， class 列表将相应地更新。例如 ， 如果 hasError 的值为 true, class列表将变为 'static active text-danger'
                <!-- 直接 绑定 对象 true 就绑定 class -->
                <div v-bind:class="classObj">classObj</div>
                <!-- 绑定 样式 计算属性 -->
                <div v-bind:class="classObject">classObject</div>
                <!-- 数组语法 -->
                <p>-数组语法</p>
                <p>我们可以把一个数组传给 v-bind:class ， 以应用一个class 列表：</p>
                <!-- 这里样式的生效 与 style中样式的先后有关， 与 class 的绑定无关-->
                <div v-bind:class="[activeClass,errorClass]">activeClass errorClass</div>
                <!-- 三目表达式 -->
                <div v-bind:class="[isActive ? activeClass : '' , errorClass]">isActive ? activeClass : '' , errorClass</div>
                <!-- 此例始终添加  errorClass ， 但是只有在 isActive 是 true 时添加 activeClass -->
                <div v-bind:class="[{active:isActive}, errorClass]"> {active:isActive}, errorClass </div>
                <!-- 用在组件上 -->
                <p>-用在组件上</p>
                <!-- 在定制组件时 我们会 给组件 绑定样式 ， 但是这样 当我们需要 再添加样式时 就会很麻烦 ， 所以就要能过 样式绑定 的其他方式-->
                <my-compent v-bind:class="{active:isActive}">my-compent</my-compent>
                
                <!-- 绑定内联样式 -->
                <p>-绑定内联样式</p>
                <p>对象语法</p>
                v-bind:style 的对象方法十分直观-- 看着像CSS， 其实是一个JavaScript 对象 。 CSS 属性名可以用驼峰式 (camelCase) 或 短横分隔命名 (kebab-case):
                <div v-bind:style="{color: activeColor, fontSize: fontSize + 'px'}">color: activeColor, fontSize: fontSize:fontSize  + 'px'</div>
                直接绑定到一个样式对象通常更好， 让模板更清晰
                <div v-bind:style="styleObject">v-bind:style="styleObject"</div>
                同样的，对象语法常常结合返回对象的计算属性使用
                <P>数组语法</P>
                v-bind:style 的数组语法可以将多个样式对象应用到一个元素上
                <div v-bind:style="[baseStyles,overridingStyles]"></div>
                <p>自动添加前缀</p>
                当 v-bind:style 使用需要特定前缀的 CSS 属性时， 如 transform ，Vue.js 会自动侦测并添加相应的前缀。
            </li>
            <li>
                <p>条件渲染</p>
                <p>-v-if</p>
                在字符串模板中， 如 Handlebars ， 我们得像这样写一个条件块：
                <h1 v-if="ok">Yes</h1>
                <h1 v-else>No</h1>

                <!-- template 中 v-if 条件组 -->
                <p>--'<'template'>'' 中 v-if 条件组</p>
                因为 v-if 是一个指令，需要将它添加到一个元素上。 但是如果我们想切换多个元素呢？ 此时我们可以把一个 '<'template'>'' 元素当做包装元素，并在上面使用 v-if。
                最终的渲染结果不会包含　'<'template'>'' 元素。
                <template v-if="ok">
                    <h1>Title</h1>
                    <p>Paragraph 1</p>
                    <p>Paragraph 2</p>
                </template>
                <p>--v-else</p>
                你可以使用 v-else 指令来表示 v-if 的 "else" 块
                <div v-if="Math.random() > 0.5">
                    Now you see me 
                </div>
                <div v-else>
                    Now you don't
                </div>
                <p>--v-else-if</p>
                2.1.0新增  
                v-else-if , 顾名思议， 充当 v-if 的 "else-if" 块。 可以链式地使用多次:
                <div v-if="type ==='A'">
                    A
                </div>
                <div v-else-if="type ==='B'">
                    B
                </div>
                <div v-else-if="type ==='C'">
                    C
                </div>
                <div v-else>
                    Not A/B/C
                </div>

                <p>--用 key 管理可复用的元素</p>
                Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。这么做，除了使 Vue 变得非常快之外，还有一些有用的好处。
                例如，如果你允许用户在不同的登录方式之间切换：
                <br>
                <template v-if="loginType === 'username'">
                    <label>Username</label>
                    <input placeholder="Enter your username">
                </template>
                <template v-else>
                    <label>Email</label>
                    <input placeholder="Enter your email address">
                </template>
                那么在上面的代码中切换 loginType 将不会消除用户已经输入的内容。因为两个模板使用了相同的元素， input 不会被替换掉--仅仅是替换了它的 placeholder.
                <br>
                这样也不总是符合实际需求，所以 Vue 为你提供了一种方式来声明 “这两个元素是完全独立的--不要复用它们”。 只需添加一个具有唯一值的 key 属性即可：
                <br>
                <template v-if="loginType === 'username'">
                    <label>Username</label>
                    <input placeholder="Enter your username" key="username-input">
                </template>
                <template v-else>
                    <label>Email</label>
                    <input placeholder="Enter your email address" key="email-input">
                </template>
                <br>
                这种情况，每次切换时，输入框都将被重新渲染 ， label 元素仍然会被高效 地复用，因为它们没有添加 key 属性。

                <!-- v-show-->
                <p>-v-show</p>
                另一个用于根据条件展示元素的选项是 v-show 指令。用法大致一样：
                <h1 v-show="ok">Hello!</h1>
                不同的是带有 v-show 的元素始终会被渲染并保留在 DOM 中，v-show 是简单地切换元素的 CSS 属性 display。
                <br>
                注意： v-show 不支持 template 语法 ， 也不支持 v-else.

                <p>v-if VS v-show</p>
                

            </li>
        </ul>
    </div> 
</body>

</html>
```
