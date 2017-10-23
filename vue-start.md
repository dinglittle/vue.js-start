
# 安装

### 1.全局安装 vue-cli
	npm install --global vue-cli
	
### 2.创建一个基于 webpack 模板的新项目
	vue init webpack my-project
	
### 3.安装依赖
	cd my-project
	npm install
	npm run dev
	//访问地址: localhost:8080/#/
	
	
---

### 脚手架详解

src - main.js 
项目的主入口,这里 导入必需的 文件( vue  ./App   ./router)

import Vue from 'vue'    安装的全局 vue 文件

import App from './App'   App.vue  name

import router from './router'    //在router-index.js 定义的 Router

上面三个 cli 自动生成,不用管,只需要添加 内容即可



```
main.js - 基本不用动

component - HelloWorld.vue 模版内容

App.vue - 入口页面

router - index.js - 主路由页面
```

---





# 命名路由
```
<!-- 给路由配置名字,在跳转的时候通过名字跳转 -->
<router-link :to="{name:'Hello',params:{userId: 123, name: 'testName'}"></router-link>
```



# 坑
## 当vsCode 用来 Eslink 的时候,.vue 文件中的  script  里面
- **1.   字符串不能用 双引号 "" , 需要改成单引号 ' '**
- **2.   data_()_{ ... }    data 前后必须有空格 ( function 前后必须有空格 , 必须 是 return 返回对象 )**