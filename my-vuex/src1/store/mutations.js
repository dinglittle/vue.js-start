import * as Types from './mutations-types'

const mutations = {
	[Types.INCREMENT](state,count){// state 是自动放入的，默认指的就是当前的state
		state.count+=count;
	},
	[Types.DECREMENT](state,count){
		state.count-=count;
	}
};
// 导出
export default mutations;

// 宏 快捷键