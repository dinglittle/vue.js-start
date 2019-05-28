// vue 如果是个对象 会使用 Object.defineProperty
// 会把数组的方法重写

function render(){
	console.log('模拟视图渲染')
}

let obj = {
	name:'objName',
	location:{x:100,y:200}
}
function obsrver(obj){// 把所有的属性定义 get/set方法
	// 观察
	// obj 是对象 ， get set 方法
	if(typeof obj =='object'){
		for(let key in obj){
			defineReactive(obj,key,obj[key]);// 定义响应式
		}
	}
}
function defineReactive(data,key,value){
	Object.defineProperty(data,key,value){
		get(){
			return value
		},
		set(newValue){
			render()
			value = newValue;
		}
	}
}
obsrver(obj)
obj.name = 'changeName'
