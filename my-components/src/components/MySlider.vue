<template>
  <!-- 自定义的滑块组件 -->
  <div class="wrap">
    <p>自定义的滑块组件</p>
    <input type="range" :defaultValue="0" @change="changeFn" />
  </div>
</template>
<script>
export default {
  data () {
    return {
      name: 'my-slider'
    }
  },
  mounted () {
    console.log('渲染 my-slider')
    console.log(document.getElementsByTagName('input')[0].value)
  },
  methods: {
    changeFn (e) {

      console.log('change', e.value)
    }
  }
}
</script>
<style>
p {
  font-size: 32px;
}

.wrap {
  width: 100%;
  height: 100%;
}

input[type="range"] {
  display: inline-block;
  width: 100%;
  height: 50px;
  width: 100px;
}
input[type="range"] {
  -webkit-appearance: none;
  width: 300px;
  border-radius: 10px; /*这个属性设置使填充进度条时的图形为圆角*/
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
}

input[type="range"]::-webkit-slider-runnable-track {
  height: 15px;
  border-radius: 10px; /*将轨道设为圆角的*/
  box-shadow: 0 1px 1px #def3f8, inset 0 0.125em 0.125em #0d1112; /*轨道内置阴影效果*/
}

input[type="range"]:focus {
  outline: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 25px;
  width: 25px;
  margin-top: -5px; /*使滑块超出轨道部分的偏移量相等*/
  background: #ffffff;
  border-radius: 50%; /*外观设置为圆形*/
  border: solid 0.125em rgba(205, 224, 230, 0.5); /*设置边框*/
  box-shadow: 0 0.125em 0.125em #3b4547; /*添加底部阴影*/
}
</style>
