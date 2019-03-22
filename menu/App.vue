<template>
    <div id="app">
        <!-- 递归组件 树结构  -->
        <Menu>
        	<!-- 遍历菜单数据 -->
            <template v-for="menu in menuList">
                <!-- 把重复的部分 先抽离出去 -->
                <MenuItem :key="menu.title" v-if="!menu.children">
                {{menu.title}}
                </MenuItem>
                <!-- 有子 children 的选项,第一层 -->
                <ReSubMenu :key="menu.title" v-else :data="menu">
                </ReSubMenu>
            </template>
        </Menu>
    </div>
</template>
<script>
import Menu from './Menu';
import MenuItem from './MenuItem';
import ReSubMenu from './ReSubMenu';
export default {

    data() {
        return {
            msg: 'hello',
            menuList: [{
                    title: '菜单1',
                    children: [{
                            title: '1-1',
                            children: [{
                                    title: '1-1-1',
                                    children: [
                                        { title: '1-1-1-1' },
                                        { title: '1-1-1-2' },
                                        { title: '1-1-1-3' },
                                    ]
                                },
                                { title: '1-1-2' },
                                { title: '1-1-3' },
                            ]
                        },
                        { title: '1-2' },
                        { title: '1-3' },
                    ]
                },
                {
                    title: '菜单2'
                },
                {
                    title: '菜单3'
                },
                {
                    title: '菜单4'
                }
            ]
        }
    },
    components: {
        Menu,
        MenuItem,
        ReSubMenu
    }
}
</script>
<style>
#app {
    color: red;
}
</style>