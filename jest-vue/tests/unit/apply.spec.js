import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'
import GetData from '@/components/GetData'
import Vue from 'vue'
describe('HelloWorld.vue',()=>{
	if('相等',()=>{
		expect(1+1).toBe(2);
		expect({name:'zfpx'}).toEqual({name:'zfpx'});
		expect([1,2,3]).toHaveLength(3)
	})
	it('大于 小于',()=>{
		expect(3).toBeGreaterThan(2);
		expect(2).toBeLessThan(3);
	})

})
// 把所有的 axios 都替换， mock 名字要和文件名保持一致
jest.mock('axios');// 默认再去调用 get方法，就是用我们自己编写的
describe('jest 测试 mock axios',()=>{
	it('mock掉axios',()=>{
		let wrapper = shallowMount(GetData);
		// 等待在下一个队列搞定这个事
		// Vue.nextTick(()=>{

		// })
		return Vue.nextTick().then(()=>{
			expect(wrapper.text()).toContain('zfpx');
		})
	})
})