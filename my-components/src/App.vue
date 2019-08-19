<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <MySlider ref="mySlider"></MySlider>

    <div class="my-slider">
      <!-- <vue-slider v-model="value" /> -->

      <vue-slider
        :data="data"
        v-model="value"
        :marks="true"
        :disabled="false"
        :clickable="true"
        :lazy="false"
        @dragging="updateLevel"
        v-show="isSliderDisable"
      ></vue-slider>
      <!-- <vue-slider
        :data="data"
        v-model="value"
        :marks="true"
        :disabled="true"
        :clickable="false"
        :lazy="true"
        @dragging="updateLevel(val)"
        v-show="!isSliderDisable"
      ></vue-slider>-->
    </div>

    <div>
      <span class="btn" @click="changeDisable">切换禁用</span>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import MySlider from './components/MySlider.vue'

import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'

export default {
  name: 'app',
  components: {
    HelloWorld,
    MySlider,
    VueSlider
  },
  data () {
    return {
      isSliderDisable: true,
      value: '低',
      data: ['低', '中', '高']
    }
  },
  watch: {
    'dragging': function (newVal, oldVal) {
      console.log('dragging===', newVal, oldVal)
    },
    // 'value': function (newVal, oldVal) {
    //   // 不能用 watch
    //   console.log('watch==', newVal)
    // }
  },
  mounted () {

  },
  methods: {
    updateLevel () {
      // lazy 触发
      console.log('lazy ===', this.value)
    },
    changeDisable () {
      this.isSliderDisable = !this.isSliderDisable
      console.log(this.isSliderDisable)
    },
    changeFn (value) {
      console.log(value)
      console.log('change fn ')
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.my-slider {
  width: 450px;
  text-align: center;
  margin-left: 100px;
}

.btn {
  font-size: 28px;
  display: inline-block;
  border: 1px solid #ededed;
  padding: 10px;
}
</style>
