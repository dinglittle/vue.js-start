<template>
	<div>
		<div class="title" @click="change">
			<!-- v-slot:title === name="title"  -->
			<slot name="title"></slot>
		</div>
		<!-- 点击切换显示 -->
		<div v-show="flag" class="sub"> 
			<slot></slot>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return {flag:false}
		},
		methods:{
			change(){
				this.flag = !this.flag;
			}
		}
	}
</script>
<style>
	.sub{
		margin-left: 20px;
	}
</style>