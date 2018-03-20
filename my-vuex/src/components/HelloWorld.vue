<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul>
    <h2>Vuex</h2>
    <ul>
      <li>
        <Counter></Counter>
      </li>
    </ul>
  </div>
</template>
<script>
import Vue from 'vue'
import Vuex from 'vuex'
// 单一个组件需要获取多个状态时候,将这此状态都声明为计算属性会有些重复和冗余,可以使用 mpaState 辅助函数帮助我们生成计算属性,让你少按几次键
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from 'vuex'
Vue.use(Vuex)
// 通过 store 选项,提供了一种机制将状态从根组件 "注入" 到第一个子组件中(需要调用  Vue.use(Vuex) );
// 如果在模块化构建系统中,请确保开头调用了 Vue.use(Vuex)
const store = new Vuex.Store({
  state:{
    count:0,
    countAlias:0,
    countPlusLocalState:0
  },
  mutations:{
    increment(state){
      state.count++
    }
  }
})
// 通过在根实例中注册 store 选项, 该 store 实例会注入到根组件下的所有子组件中,且子组件能通过 this.$store 访问到.
// Counter 组件
const Counter = {
  template:'<div>{{ count }}</div>',
  computed: {
    count (){
      return store.state.count
    }
  }
}
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      state:{}
    }
  },
  mounted(){
    // store.commit('increment'); // 调用 Conter 组件 increment 方法
    // console.log('vuex-store.state.count',store.state.count)  // 1
    
  },
  components: { 
    Counter 
  },
  // mapState 辅助函数
  // 当一个组件需要获取多个状态时候, 将这些状态都声明为计算属性会有些重复和冗余.
  // 为了解决这个问题, 我们可以使用 mapState 辅助函数帮助我们生成计算属性
  computed: mapState({
    // 箭头函数可使代码更简洁
    count: state => state.count,
    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count', 

    // 为了能够使用 `this` 获取局部状态, 必须使用常规函数
    countPlusLocalState (state){
      return state.count + this.localCount
    }, 
    // 单映射的计算属性的名称与 state 的子节点名称相同， 我们也可以给 mapState 传一个字符串数组
    // 映射 this.count 为 storestate.count
    'count'
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
