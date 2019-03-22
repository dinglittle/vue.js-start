<template>
    <SubMenu :key="data.title">
    	<template #title>
    		{{data.title}}
    	</template>
    	<template v-for="child in data.children">
    		<!-- 如果没有儿子 直接渲染 MenuItem 有儿子 将儿子 -->
    		<MenuItem :key="child.title" v-if="!child.children">
				{{child.title}}    		
    		</MenuItem>
    		<!-- 循环必须有 Key 属性 -->
    		<ReSub v-else :key="child.title" :data="child"></ReSub>
    	</template>
    </SubMenu>
</template>
<script>
	import SubMenu from './SubMenu';
	import MenuItem from './MenuItem';
	export default {
		name:'ReSub',// 可以使用 递归组件
		data(){
			return {msg:123}
		},
		props:{
			// 传参校验 默认Array
			data:{
				type:Object,
				default:()=>([])
			}
		},
		components:{
			SubMenu,
			MenuItem
		}
	}
</script>