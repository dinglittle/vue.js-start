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
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state:{
    count:0
  },
  mutations:{
    increment(state){
      state.count++
    }
  }
})
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
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted(){
    // store.commit('increment');
    // console.log('vuex-store.state.count',store.state.count)  // 1
    
  },
  components: { Counter },
  // mapState 辅助函数
  computed: mapState({
    // 箭头函数可使代码更简洁
    count: state => state.count,
    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count', 

    // 为了能够使用 `this` 获取局部状态, 必须使用常规函数
    countPlusLocalState (state){
      return state.count + this.localCount
    }
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
