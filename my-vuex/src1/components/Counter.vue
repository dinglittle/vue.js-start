<template>
	<div>
		计数器：<button @click="minu">-</button>
		<br>
		当前：{{$store.state.count}}
		<br>
		计数器：<button @click="add">+</button>
	</div>
</template>
<script>
	import * as Types from '../store/mutations-types'
	// 导出
	export default{
		data(){
			return {
				
			}
		},
		created(){},
		methods:{
			add(){
				// 这里调的是  mutations 方法， 只能通过 mutations 来更改视图
				// 提交 add 的 mutation
				// 载荷 payload
				this.$store.commit(Types.INCREMENT,2)
			},
			minu(){
				// 提交 minu 的 mutation
				this.$store.commit(Types.DECREMENT,1)
			}
		},
		computed:{},
		components:{}
	}
</script>