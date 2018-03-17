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
    <p>多选 子原因</p>
    <el-select v-model="value1" multiple placeholder='请选择'>
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
    <p>单选 子原因</p>
    <!-- 单选 子原因 -->
    <el-select v-model="reason">
      <el-option
        v-for="item in reasons"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      // el-select 多选数据
      options:[
        {
          value:'选项1',
          label:'黄金糕'
        },
        {
          value:'选项2',
          label:'黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕'
        },
        {
          value:'选项3',
          label:'黄金糕3'
        },
        {
          value:'选项4',
          label:'黄金糕4'
        },
        {
          value:'选项5',
          label:'黄金5'
        },
        {
          value:'选项6',
          label:'黄金糕6'
        }
      ],
      value1:[],// 多选绑定的数据
      value2:[],
      // 原因
      reasons:[
        {
          value:1,
          label:'原因1'
        },
        {
          value:2,
          label:'原因2'
        },
        {
          value:3,
          label:'原因3'
        }
      ],
      reason:'', // 绑定的原因
    }
  },
  mounted(){
    setTimeout(function(){
      this.reason = 2
    },5000)

    // setTimeout(()=this.reason=3)
  }
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
