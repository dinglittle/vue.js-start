<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>Hello App!</h1>
    <!-- 使用 router-link 组件来导航 -->
    <!-- 通过传入 `to` 属性指定链接 -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
    <ul style="list-style: none">
      <li>
        <router-link to="/">Go to / </router-link>
      </li>
      <li>
        <router-link to="/first">Go to first</router-link>
      </li>
      <li>
        <!-- 路由传参   "user/id=1/name=2" -->
        <router-link to="/user/id=1/name=1/age=1">Go User </router-link>
      </li>
      <li>
        <!-- 命名路由,给路由配置 名字,跳转的时候 通过名字跳转 -->
        <router-link :to="{name: 'User',params:{id:123,name:'lwj',age:18}}">命名路由</router-link>
      </li>

    </ul style="type='none'">

    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
