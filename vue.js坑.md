### 1.路由编写
多个路由之间应该换行 逗号 分隔, 否则报错
任何地方都不能多余空格，比如 最后一个路由  在 】 内 空了一行也报错
```
错误代码
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
    },
    {
      path: '/first',
      name: 'First',
      component: First
    },
    {
      path: '/user/:id/:name',
      name: 'User',
      component: User
    },{ // **这里应该换行,否则报错**
<font color=red>内容</font>
      path: '/user/:id/post/:post_id',
      name: 'User',
      component: User
    }
// **这里换行了编译不通过**
  ]
})
```
#### 路由间未换行
![image](https://user-images.githubusercontent.com/17232138/31698249-1560625a-b3ef-11e7-9a85-eae7d49ccdff.png)


#### 路由后有空行
![image](https://user-images.githubusercontent.com/17232138/31698231-f88e9d22-b3ee-11e7-9652-96c67c6d056e.png)
