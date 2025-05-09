





# 1、WebPack - VueCLI

- 官网：[安装 | Vue CLI (vuejs.org)](https://cli.vuejs.org/zh/guide/installation.html)

## 1.1、WebPack安装VueCli

1. 全局安装 Vue_CLI

```bash
npm install -g @vue/cli
```

2. 查看 Vue_CLI 版本

```bash
# 查看 Vue_CLI 版本
vue --version

# 升级 Vue_CLI 到最新版
npm update -g @vue/cli
```

## 1.2、vue create 创建项目

1. 在空目录下创建新项目

```bash
vue create hello-vuecli
```

2. 会被提示选取一个 preset 预设

![](Vue3(四).assets/1.png)

```bash
Vue CLI v5.0.8
? Please pick a preset: (Use arrow keys)
> Default ([Vue 3] babel, eslint)
  Default ([Vue 2] babel, eslint)
  Manually select features
```

- Default：默认勾选 babel、eslint 的Vue3/Vue2，回车之后直接进入装包
- `manually`：自定义勾选特性配置，选择完毕之后，才会进入装包

默认的设置非常适合快速创建一个新项目的原型，而手动设置则提供了更多的选项。

![](Vue3(四).assets/2.png)

```bash
? Please pick a preset: Manually select features
? Check the features needed for your project: (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)
 (*) Babel
 ( ) TypeScript
 ( ) Progressive Web App (PWA) Support
 (*) Router
 (*) Vuex
>(*) CSS Pre-processors
 (*) Linter / Formatter
 ( ) Unit Testing
 ( ) E2E Testing
```

分别选择：

- Babel：es6 转 es5
- Router：路由
- Vuex：数据容器，存储共享数据
- CSS Pre-processors：CSS 预处理器，后面会提示你选择 less、sass、stylus 等
- Linter / Formatter：代码格式校验

介绍下所有选项的作用：

| 选项                              | 描述                                                         |
| --------------------------------- | ------------------------------------------------------------ |
| Babel                             | vue项目中普遍使用es6语法，但有时我们的项目需要兼容低版本浏览器，这时就需要引入babel插件，将es6转成es5 |
| TypeScript                        | TypeScript通过添加类型来扩展JavaScript。通过了解JavaScript，TypeScript可以节省您捕获错误的时间并在运行代码之前提供修复。任何浏览器，任何操作系统，任何运行JavaScript的地方。 |
| Progressive Web App (PWA) Support | 渐进式Web应用程序（PWA）支持                                 |
| Router                            | 路由                                                         |
| Vuex                              | Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化 |
| CSS Pre-processors                | CSS预处理器                                                  |
| Linter / Formatter                | 格式化程序                                                   |
| Unit Testing                      | 单元测试                                                     |
| E2E Testing                       | 端到端（end-to-end）                                         |

接着选择Vue的版本：

```bash
? Choose a version of Vue.js that you want to start the project with (Use arrow keys)
> 3.x
  2.x
```

接着选择是否使用 history 路由模式，这种模式兼容不好，所以这里输入 `n` 不使用

```bash
? Use history mode for router? (Requires proper server setup for index fallback in production) (Y/n)
```

选择 CSS 预处理器，这里选择我们熟悉的 Less

```bash
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default):
  Sass/SCSS (with dart-sass)
> Less
  Stylus
```

选择校验工具，这里选择 `ESLint + Standard config` 标准化

```bash
? Pick a linter / formatter config:
  ESLint with error prevention only
  ESLint + Airbnb config
> ESLint + Standard config
  ESLint + Prettier
```

选择在什么时机下触发代码格式校验：

- `Lint on save`：每当保存文件的时候
- `Lint and fix on commit`：每当执行 `git commit` 提交的时候
- 这里建议两个都选上，更严谨

```bash
? Pick additional lint features: (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)
 (*) Lint on save
>(*) Lint and fix on commit (requires Git)
```

Babel、ESLint 等工具会有一些额外的配置文件，这里的意思是问你将这些工具相关的配置文件写到哪里：

- `In dedicated config files`：分别保存到单独的配置文件
- `In package.json`：保存到 package.json 文件中
- 这里建议选择第 1 个，保存到单独的配置文件，这样方便我们做自定义配置

```bash
? Where do you prefer placing config for Babel, ESLint, etc.?
> In dedicated config files
  In package.json
```

这里里是问你是否需要将刚才选择的一系列配置保存起来，然后它可以帮你记住上面的一系列选择，以便下次直接重用。这里根据自己需要输入 y 或者 n，我这里输入 n 不需要。

```bash
Save this as a preset for future projects? (y/N)
```

安装成功后，根据命令行的提示命令输入，来启动项目

![](Vue3(四).assets/3.png)



![](Vue3(四).assets/4.png)





## 1.3、项目目录结构介绍

```html
├── node_modules              第三方包存储目录
├── public                    任何放置在 public 文件夹的静态资源都会被简单的复制，而不经过 webpack。
│   ├── favicon.ico           浏览器收藏夹图标
│   └── index.html            单页面 HTML 文件
├── src
│   ├── assets                公共资源目录，放图片等资源
│   ├── components            公共组件目录
│   ├── router                Vue Router 路由模块
│   ├── store                 Vue 容器模块
│   ├── views                 视图组件存储目录，所有的路由页面都存储到这里
│   ├── App.vue               根组件，最终被替换渲染到 index.html 页面中 #app 入口节点
│   └── main.js               整个项目的启动入口模块
├── .browserslistrc           指定了项目的目标浏览器的范围。这个值会被 @babel/preset-env 和 Autoprefixer 用来确定需要转译的 JavaScript 特性和需要添加的 CSS 浏览器前缀
├── .editorconfig             EditorConfig 帮助开发人员定义和维护跨编辑器（或IDE）的统一的代码风格，详情参考这里：https://editorconfig.org/。
├── .eslintrc.js              ESLint 的配置文件
├── .gitignore                Git 的忽略配置文件，告诉Git项目中要忽略的文件或文件夹
├── README.md                 说明文档
├── babel.config.js           Babel 的配置文件
├── package-lock.json         记录安装时的包的版本号，以保证自己或其他人在 npm install 时大家的依赖能保证一致
└── package.json              包说明文件，记录了项目中使用到的第三方包依赖信息等内容
```

![](Vue3(四).assets/5.png)













# 2、Vite+Vue3

- 与 Vue CLI 类似，Vite 也是一个提供基本项目脚手架和开发服务器的构建工具。
- Vite 并不是基于 Webpack 的，它有自己的开发服务器，速度更快
  - Vite 先启动服务，按需加载
  - Webpack 则是先全部打包 再启动服务

## 2.1、认识create-vue

- create-vue是Vue官方新的脚手架工具，底层切换到了 vite （下一代前端工具链），为开发提供极速响应


![](Vue3(四).assets/6.png)

## 2.2、使用create-vue创建项目

> 前置条件 - 已安装16.0或更高版本的Node.js

- 执行如下命令，这一指令将会安装并执行 create-vue

```bash
npm create vite@latest
```

![](Vue3(四).assets/7.png)



根据提示运行指令，【**第一次体验Vite，构建速度真的好快啊我靠**】

![](Vue3(四).assets/9.png)









## 2.3、项目目录剖析

![](Vue3(四).assets/8.png)



## 2.4、ESlint代码规范及手动修复

在创建项目时，我们使用的是 [JavaScript Standard Style](https://standardjs.com/readme-zhcn.html) 代码风格的规则。

- [JavaScript Standard Style (standardjs.com)](https://standardjs.com/rules-zhcn.html)
- 看一遍，然后在写的时候,  遇到错误就查询解决

下面是这份规则中的一小部分：

- *字符串使用单引号* – 需要转义的地方除外
- *无分号* – [这](http://blog.izs.me/post/2353458699/an-open-letter-to-javascript-leaders-regarding)[没什么不好。](http://inimino.org/~inimino/blog/javascript_semicolons)[不骗你！](https://www.youtube.com/watch?v=gsfbh17Ax9I)
- *关键字后加空格* `if (condition) { ... }`
- *函数名后加空格* `function name (arg) { ... }`
- 坚持使用全等 `===` 摒弃 `==` 一但在需要检查 `null || undefined` 时可以使用 `obj == null`

![](Vue3(四).assets/14.png)



如果你不认识命令行中的语法报错是什么意思，你可以根据错误代码`func-call-spacing 、 space-in-parens` 去 ESLint 规则列表中查找其具体含义。

- 打开 [ESLint 规则表](https://zh-hans.eslint.org/docs/latest/rules/)，使用页面搜索（Ctrl + F）这个代码，查找对该规则的一个释义。

![](Vue3(四).assets/15.png)





## 2.5、通过eslint插件来实现自动修正

1. eslint会自动高亮错误显示
2. 通过配置，eslint会自动帮助我们修复错误

![](Vue3(四).assets/16.png)

- 如何配置：如下图添加如下代码

![](Vue3(四).assets/17.png)

```javascript
// 当保存的时候，eslint自动帮我们修复错误
"editor.codeActionsOnSave": {
    "source.fixAll": true
},
// 保存代码，不自动格式化
"editor.formatOnSave": false
```

- 注意：eslint的配置文件必须在根目录下，这个插件才能才能生效。打开项目必须以根目录打开，一次打开一个项目
- 注意：使用了eslint校验之后，把vscode带的那些格式化工具全禁用了 

settings.json 参考：

```json
{
    "window.zoomLevel": 2,
    "workbench.iconTheme": "vscode-icons",
    "editor.tabSize": 2,
    "emmet.triggerExpansionOnTab": true,
    // 当保存的时候，eslint自动帮我们修复错误
    "editor.codeActionsOnSave": {
        "source.fixAll": true
    },
    // 保存代码，不自动格式化
    "editor.formatOnSave": false
}
```









# 3、VueRouter4

- 官网：[Vue Router (vuejs.org)](https://v3.router.vuejs.org/zh/)

| Vue版本 | VueRouter对应版本 | VueX对应版本 |
| ------- | ----------------- | ------------ |
| Vue2    | VueRouter3.x      | VueX3.x      |
| Vue3    | VueRouter4.x      | VueX4.x      |



- 路由的作用：**修改**地址栏路径时，**切换显示**匹配的**组件**

- `VueRouter` 是 Vue 官方的一个路由插件，是一个第三方包

## 3.1、单页应用程序介绍

单页应用程序：SPA【Single Page Application】是指所有的功能都在**一个html页面**上实现

- 单页应用网站： 网易云音乐  <https://music.163.com/>
- 多页应用网站：京东  https://jd.com/

单页面应用程序，之所以开发效率高，性能好，用户体验好，最大的原因就是：**页面按需更新**





## 3.2、前端路由和后端路由

后端路由：

- 特点：**向服务器发送请求，会刷新页面，前后端不能分离**
- 在浏览器的地址栏中切换不同的url时，每次都向后台服务器发出请求，服务器根据不同的响应不同的数据，浏览器接收到数据后再进行渲染，所以后端路由会刷新页面，如果网速慢的话，就会看到一个空白页面等待服务端返回数据，后台路由最大的问题就是不能 **前后端分离**

前端路由：

- 特点：**不向后台发送请求，不刷新页面，前后端分离**
- 切换路由，并不刷新页面，而是根据路由在虚拟DOM中加载所需要的数据，实现页面内容的改变。





> 









## 3.3、前端路由模式

前端路由有两种模式：hash 模式和 history 模式

### 3.3.1、hash模式

- hash 模式是一种把前端路由的路径用井号 `#` 拼接在真实 URL 后面的模式。

- 当井号 `#` 后面的路径发生变化时，浏览器并不会重新发起请求，而是会触发 `hashchange` 事件。

- 我们可以通过直接赋值 `location.href` 来改变 href , 但是页面不发生刷新

![](Vue3(四).assets/11.png)





### 3.3.2、history 模式

history API 是 H5 提供的新特性，允许开发者直接更改前端路由，即更新浏览器 URL 地址而不重新发起请求。

![](Vue3(四).assets/12.png)









# 4、VueRouter的使用

目前前端流行的三大框架, 都有自己的路由实现:

- Angular的ngRouter
- React的ReactRouter
- Vue的vue-router

我们的重点是vue-router，vue-router是Vue.js官方的路由插件，它和vue.js是深度集成的，适合用于构建单页面应用。

vue-router是基于路由和组件的

- 路由用于设定访问路径, 将路径和组件映射起来
- 在vue-router的单页面应用中, **页面的路径的改变就是组件的切换**

---

使用步骤：

1. 使用`npm create vite@latest ` 创建 Vue 骨架
1. 下载`VueRouter` 包：

```bash
npm install vue-router@4
```

3. 在`src/router/index.js` 下初始化如下代码：
   - 如果我们在使用 vueCLI 初始化项目的时候安装了 router，那么就会自动生成 router 文件夹，里面有 index.js 

```javascript
//所有路由的配置都放在这里

//1.引入组件
import  {createRouter,createWebHistory} from 'vue-router'
import Home from "../components/Home.vue";
import Mine from "../components/Mine.vue";


//2.创建路由对象routes
const routes = [
  //  路由重定向:当路由匹配到 `/` 时候,会重定向到 `/home` 上
  {path: '/', redirect: '/home'},
  {path: '/home',name: 'home',component:Home},
  {path: '/mine',name: 'mine',component:Mine}
]

//配置路由和组件之间的应用关系
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

// 导出路由对象,将 router 对象传入到Vue实例
export default router
```

4. `main.js` 中导入并挂载路由模块

```javascript
import { createApp } from 'vue'
import App from './App.vue'

//1.导入路由模块
import router from "./router/index";

const app = createApp(App);

// 把 VueRouter 安装为 Vue 的插件
app.use(router);

// 挂载路由模块
app.mount('#app')
```

5. 在`App.vue` 中使用路由
   - `<router-link>` 声明路由链接
   - `<router-view>` 定义路由占位符

```html
<template>
  <div>
    <!-- 1.定义路由链接 -->
    <div id="nav">
      <router-link to="/home">首页</router-link>
      <router-link to="/mine">我的</router-link>
    </div>
    <!-- 2.定义路由的占位符 -->
    <router-view></router-view>
  </div>
</template>


<script>
  export default  {
    setup(){

    }
  }
</script>


<style scoped>

</style>
```

![](Vue3(四).assets/10.png)







## 4.1、声明路由匹配规则

在 `src/router/index.js` 路由模块中，通过 `routes` 数组声明路由的匹配规则。示例代码如下：

```javascript
// 在 routes 数组中,声明路由的匹配规则
const routes = [
  //  路由重定向:当路由匹配到 `/` 时候,会重定向到 `/home` 上
  {path: '/', redirect: '/home'},
  // path 表示要匹配的 hash 地址,component 表示要展示的路由组件 
  {path: '/home',name: 'home',component:Home},
  {path: '/mine',name: 'mine',component:Mine}
]
```



## 4.2、不同的历史记录模式

- hash 模式是用 `createWebHashHistory()` 创建的

```javascript
//配置路由和组件之间的应用关系
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});
```

它在内部传递的实际 URL 之前使用了一个哈希字符（`#`）。由于这部分 URL 从未被发送到服务器，所以它不需要在服务器层面上进行任何特殊处理。不过，**它在 SEO 中确实有不好的影响**。

- history 模式是用 `createWebHistory()` 创建的，推荐使用这个模式

```javascript
//配置路由和组件之间的应用关系
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});
```



## 4.3、`<router-link>`补充

- 在前面的 `<router-link>` 中,我们只是使用了一个属性：`to` ，用于指定跳转的路径

- `<router-link>` 还有一些其他属性

  - `tag`可以指定 `<router-link>` 之后渲染成什么组件，比如下面的代码会被渲染成一个 `<li>` 元素,而不是 `<a>`

    ```html
    <router-link to='/home'  tag='li'></router-link> 
    ```

  - `replace` ： replace 不会留下 history 记录，所以指定 replace 的情况下，后退键返回不能返回到上一个页面中

    ```html
    <router-link to="/home" replace >Home</router-link> 
    ```

  - `active-class` ：当 `<router-link>` 对应的路由匹配成功时,会自动给当前元素设置一个 `router-link-active` 的 class，设置 `active-class` 可以修改默认的名称(一般不需要改)

    - 在进行**高亮显示**的导航菜单或者底部tabbar时, 会使用到该类
    - 但是通常不会修改类的属性, 会直接使用默认的`router-link-active`即可

- `<router-link>`的作用：**能跳转、能高亮**

### 4.3.1、样式高亮

使用`router-link`跳转后，我们发现。当前点击的链接默认加了两个class的值 `router-link-exact-active`和`router-link-active`

- `router-link-active`：**模糊匹配**，用的多

```javascript
// 可以匹配 /my 、 /my/a 、/my/b ....
// 只要是 `/my` 开头的路径,都可以匹配到,这样都会加样式高亮
<router-link to="/my">Home</router-link> 
```

- `router-link-exact-active` ：**精准匹配**

```javascript
// 仅可匹配 /my , 匹配到会加样式高亮
<router-link to="/my">Home</router-link> 
```



### 4.3.2、自定义类名

router-link的**两个高亮类名太长了**，我们希望能定制怎么办

- 在创建路由对象时，额外配置两个配置项
  -  `linkActiveClass`
  - `linkExactActiveClass`

```javascript
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
  // 自定义类名
  linkActiveClass: "类名1", // 配置模糊匹配的类名
  linkExactActiveClass: "类名2" // 配置精确匹配的类名
});
```

![](Vue3(四).assets/13.png)





## 4.4、组件的存放目录



 `.vue`文件分为2类：

- **页面组件** （配置路由规则时使用的组件）
- **复用组件** （多个组件中都使用到的组件）

存放目录分开的目的就是为了**更好的维护**：

- `src/views`文件夹
  - 页面组件 - 页面展示 - **配合路由用**
- `src/components`文件夹
  - 复用组件 - 展示数据 - **常用于复用**



> Tips：
>
> - **脚手架环境下** `@`指代`src`目录，可以用于快速引入组件

## 4.5、Vue-router的常见用法

### 4.5.1、路由重定向

路由重定向指的是：用户在访问 **地址 A** 的时候， 强制用户跳转到 **地址 C** ，从而展示特定的组件页面。

- 通过路由规则的 `redirect` 属性，指定一个新的路由地址，可以很方便地设置路由的重定向：

```javascript
const routes = [
  //  路由重定向:当路由匹配到 `/` 时候,会重定向到 `/home` 上
  {path: '/', redirect: '/home'},
  {path: '/home',name: 'home',component:Home},
  {path: '/mine',name: 'mine',component:Mine}
]
```



### 4.5.2、404

404的路由，虽然配置在任何一个位置都可以，但一般都**配置在其他路由规则的最后面**

- 语法：`path: "*"` 任意路径 - 前面不匹配就匹配最后这个

```javascript
//2.创建路由对象
const routes = [
  //  路由重定向:当路由匹配到 `/` 时候,会重定向到 `/home` 上
  {path: '/', redirect: '/home'},
  {path: '/home',name: 'home',component:Home},
  {path: '/mine',name: 'mine',component:Mine},
  // 404   
  {path: '*', component: NotFind}
]
```









### 4.5.3、路由的懒加载

- 首先, 我们知道路由中通常会定义很多不同的页面。这个页面最后被打包在哪里呢? 一般情况下, 是放在一个js文件中。但是, 页面这么多放在一个js文件中, 必然会造成这个页面非常的大。如果我们一次性从服务器请求下来这个页面, 可能需要花费一定的时间, 甚至用户的电脑上还出现了短暂空白的情况。
- 如何避免这种情况呢? 使用**路由懒加载**就可以了

- 路由懒加载的主要作用：
  - **将路由对应的组件打包成一个个的js代码块**
  - **只有在这个路由被访问到的时候, 才加载对应的组件**

```javascript
// 原始路由加载
// import Home from '../components/Home'
// 路由懒加载(推荐)
const Home = () => imports('../components/Home')
```

```javascript
const routes = [
  //  路由重定向:当路由匹配到 `/` 时候,会重定向到 `/home` 上
  {path: '/', redirect: '/home'},
  {path: '/home',name: 'home',component: () => import('../views/Home.vue')},
]
```

### 4.5.4、动态路由

动态路由指的是：**把 Hash 地址中可变的部分定义为参数项 ，从而提高路由规则的复用性** 

在某些情况下，一个页面的path路径可能是不确定的，比如我们进入用户界面时，希望是如下的路径：

- `/user/aaaa` 或 `/user/id`
- 除了有前面的 `/user` 之外，后面还跟上了用户的 ID

- 这种 `path` 和 `Component` 的匹配关系，我们称之为动态路由(也是路由传递数据的一种方式)

---

使用语法：在 `src/router/index.js` 中配置动态路由

```javascript
const routes = [
  {
   // 使用英文冒号 `:` 来定义路由的参数项   
   path: '/user/:id',
   name: 'user',
   component: () => import('../views/User.vue')
  },
]
```

我们可以在主组件 `App.vue` 中模拟服务器传入`userId`，从而我们拼接到url中

```html
<template>
  <div>
    <!-- 1.定义路由链接 -->
      <router-link :to="'/user/' + userId">用户</router-link>
    <!-- 2.定义路由的占位符 -->
    <router-view></router-view>
  </div>
</template>


<script>
import {ref} from 'vue'
  export default  {
    setup(){
      // 服务端获取newsId为001
      const userId = ref('001');

      return {
        userId
      }
    }

  }
</script>


<style scoped>

</style>
```

我们也可以在 `User.vue` 组件中,可以获取到 id 的值，从而展示对应的用户id

```html
<template>
  <div id="user">
    <h2>用户id ------- {{this.$route.params.id}}</h2>
  </div>
</template>

<script>
import {useRoute} from 'vue-router'
export default {
  name: "User",
  setup(){
    // 这里也可以拿到  
    const route = useRoute()
    console.log(route.params.id)
  }
}
</script>

<style scoped>

</style>
```













# 5、编程式导航和声明式导航

在浏览器中，点击链接实现导航的方式，叫做**声明式导航**。例如：

- 普通网页中点击 `<a>` 链接，vue 项目中点击 `<router-link>` 都属于**声明式导航**

在浏览器中，调用API方法实现导航的方式，叫做**编程式导航**。例如：

- 普通网页中调用 `location.href` 跳转到新页面的方式，属于**编程式导航(用JS代码来进行跳转)**



## 5.0、命名路由

除了 `path` 之外，你还可以为任何路由提供 `name`。

```javascript
const routes = [
  {
    path: '/user/:username',
    name: 'user',
    component: User,
  },
]
```

要链接到一个命名的路由，可以向 `router-link` 组件的 `to` 属性传递一个对象:

```html
<router-link :to="{ name: 'user', params: { username: 'erina' }}">
  User
</router-link>
```

这跟代码调用 `router.push()` 是一回事：

```javascript
this.$router.push({ name: 'user', params: { username: 'erina' } })
```

在这两种情况下，路由将导航到路径 `/user/erina`。









## 5.1、编程式导航API

`vue-router` 提供了许多编程式导航的 API，其中最常用的导航 API 分别是：

- `this.$router.push('hash地址')` ：跳转到指定 hash 地址，并增加一条历史记录(当用户点击浏览器后退按钮时，会回到之前的 URL)
- `this.$router.replace('hash地址')` ：跳转到指定的 hash 地址，并替换掉当前的历史记录
- `this.$router.go(数值n)` ：实现导航历史前进、后退

编程式导航有两种路由跳转方式：

- `path` 路径跳转 （简易方便）

- `name` 命名路由跳转 (适合 path 路径长的场景)

### 5.1.1、$router.push

| 声明式导航                | 编程式导航         |
| ------------------------- | ------------------ |
| `<router-link :to="...">` | `router.push(...)` |

#### 1、path跳转方式

语法：

```javascript
//简单写法
this.$router.push('路由路径')

//完整写法
this.$router.push({
  path: '路由路径'
})
```

通过 `this.$router.push()` 方法，可以跳转到指定的 hash 地址，从而展示对应的组件页面。示例代码如下：

Vue2选项式API：

```html
<template>
  <div>
      <h3>Home组件</h3>
      <button @click="gotoMovie">跳转到Movie页面</button>
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
      gotoMovie() {
          this.$router.push('/movie')
      }
  }
}
</script>

<style scoped>

</style>
```

Vue3组合式API：

```html
<template>
  <div>
      <h3>Home组件</h3>
      <button @click="gotoMovie">跳转到Movie页面</button>
  </div>
</template>

<script>
import {useRouter} from 'vue-router'
export default {
    setup(){
        // 跳转到Movie页面
        const movie = () => {
            route.push('/movie')
        }
        return {
            movie,
        }
    }
}
</script>

<style scoped>

</style>
```











#### 2、path路径跳转传参（query传参）



```javascript
//简单写法
this.$router.push('/路径?参数名1=参数值1&参数2=参数值2')

//完整写法
this.$router.push({
  path: '/路径',
  query: {
    参数名1: '参数值1',
    参数名2: '参数值2'
  }
})
```

```javascript
//示例
this.$router.push({
    path:'/home',
    query:{
        id:id，
        name:jack
    }
})


//路由配置
{
    path:'/home',
    name:Home,
    component:Home
}


//组件中获取参数
this.$route.query.id
```

> **注意：**path不能配合params使用
>
> ```javascript
> // `params` 不能与 `path` 一起使用
> this.router.push({ path: '/user', params: { username } }) // -> /user
> ```



 



#### 4、name命名路由跳转

特点：适合 path 路径长的场景

语法：

- 路由规则，必须配置`name`配置项

```javascript
const routes = [
  {
   path: '/path/xxx',
   name: '路由名',
   component: XXX
  },
]
```

- 通过 `name` 来进行跳转

```javascript
this.$router.push({
  name: '路由名'
})
```







#### 5、name命名路由跳转传参 (query传参)

```javascript
this.$router.push({
  name: '路由名字',
  query: {
    参数名1: '参数值1',
    参数名2: '参数值2'
  }
})
```





#### 6、name命名路由跳转传参 (动态路由传参)

```javascript
this.$router.push({
  name: '路由名字',
  params: {
    参数名: '参数值',
  }
})
```

> name 可以 搭配 params 使用















### 5.1.2、$router.replace

调用 `this.$router.replace()` 方法，可以跳转到指定的 hash 地址，从而展示对应的组件页面。

push 和 replace 的区别：

- push 会**增加一条历史记录**
- replace 不会增加历史记录，而是**替换掉当前的历史记录**

| 声明式导航                        | 编程式导航            |
| --------------------------------- | --------------------- |
| `<router-link :to="..." replace>` | `router.replace(...)` |



### 5.1.3、$router.go(n)

```javascript
router.go(-1)  // 返回、后退一步
```

调用 `this.$router.go()` 方法，可以在浏览历史中前进和后退。

> 注意，一般只会前进和后退一层页面，因此 vue-router 提供了如下两个便捷方法：
>
> - ```javascript
>   $router.back()
>   ```
>
>   - 在历史记录中， 后退到上一个页面
>
> - ```javascript
>   $router.forward()
>   ```
>
>   - 在历史记录中， 前进到下一个页面
>
> - `history.back()` 等价于 `history.go(-1)`
>
> - `history.forward()` 等价于 `history.go(1)`













## 5.2、声明式导航



### 5.2.1、跳转传参

我们可以通过两种方式，在跳转的时候把所需要的参数传到其他页面中

- 查询参数传参
- 动态路由传参



#### 1、查询参数传参

- 如何传参？

  ```html
  <router-link to="/path?参数名=值"></router-link>
  ```

- 如何接受参数

  ```javascript
  //固定用法
  $router.query.参数名
  ```


示例：

1. 例如我们在 `App.vue` 里面向其他路由 `/profile` 传递对象参数

```html
<router-link :to="{path:'/profile', query: {name: 'why', age: 18}}"></router-link>
```

2. 在 `Profile.vue` 组件里面也可以取到传递过来的参数

```html
<template>
  <div>
      <h2>我是 Profile 组件</h2>
      <h2>{{this.$route.query}}</h2>
       <h2>{{this.$route.query.name}}</h2>
       <h2>{{this.$route.query.age}}</h2>
  </div>
</template>

<script>
export default {
  name: "Profile"
}
</script>

<style scoped>

</style>
```











#### 2、动态路由传参

- 使用英文的冒号 `:` 来定义路由的参数项

```javascript
// 在 routes 数组中,声明路由的匹配规则
const routes = [
  // 使用英文的冒号 `:` 来定义路由的参数项
  {path: '/user/:id',name: 'user',component: User},
]
```

> `/user/:id` 表示，**必须要传参数**。如果不传参数，也希望匹配，可以加个可选符`?`
>
> ```javascript
> // 在 routes 数组中,声明路由的匹配规则
> const routes = [
>   // 使用英文的冒号 `:` 来定义路由的参数项
>   {path: '/user/:id?',name: 'user',component: User},
> ]
> ```

在 User.vue 组件中,可以获取到 id 的值，从而展示对应的用户详情

```html
<template>
  <div class='User-container'>
    <h2>User组件 ------- {{this.$route.params.id}}</h2>
  </div>
</template>
```

## 5.2.2、使用props接收路由参数

为了**简化路由参数的获取形式**，vue-router 允许在 路由规则中开启 props 传参

-  定义路由规则时，声明 `props: true` 选项

```javascript
{
    path: '/user/:id',
    component: User,
    props: true
}
```

- 在 User.vue 组件中,可以获取到 id 的值，从而展示对应的用户详情

```html
<template>
  <div class='User-container'>
    <!-- 2.直接使用 props 中接收的路由参数 -->  
    <h2>User组件 ------- {{id}}</h2>
  </div>
</template>

<script>
export default {
  name: "User",
  props: ['id']			// 1.使用 props 接收路由规则中匹配到的参数项
}
</script>

<style scoped>

</style>
```

- 在主组件 App.vue 中也可以获取到路由参数

```html
<router-link :to=" '/user' + id ">用户</router-link>
```



# 6、 router和route的区别

- `$router` 为VueRouter实例，想要导航到不同URL，则使用`$router.push`方法
- `$route`为当前 router 跳转对象里面可以获取name、path、query、params等

# 7、嵌套路由

## 7.1、一级路由

```javascript
// 在 routes 数组中,声明路由的匹配规则
const routes = [
  // 一级路由
  {path: '/user',name: 'user',component: User},
]
```



## 7.2、二级路由

二级路由也叫嵌套路由，当然也可以嵌套三级、四级...，嵌套路由是一个很常见的功能，比如在`home`页面中, 我们希望通过 `/home/news` 和 `/home/message` 访问一些内容

> 一个路径映射一个组件, 访问这两个路径也会分别渲染两个组件

语法：

1. 在一级路由下，配置`children`属性即可
2. 配置二级路由的出口：在组件内部使用`<router-view>`标签

```javascript
const routes = [
  {
    path: '/mine',
    component:Mine,
    children: [
      // children中的配置项 跟一级路由中的配置项一模一样 
      {path:'xxxx',component:xxxx.vue},
      {path:'xxxx',component:xxxx.vue},
    ]
  },
]
```

> 1. 在一级路由下，配置`children`属性
> 2. **注意**：一级的路由path 需要加 `/`   二级路由的path不需要加 `/`

配置二级路由的出口：

```html
<template>
    <div class="content">
        <router-view></router-view>
    </div>
</template>
```

> **注意：** 配置了嵌套路由，一定配置对应的路由出口，否则不会渲染出对应的组件
>
> 技巧：二级路由应该配置到哪个一级路由下呢？
>
> - **这些二级路由对应的组件渲染到哪个一级路由下，children就配置到哪个路由下边**







# 8、导航守卫

导航守卫可以控制路由的访问权限：

- vue-router提供的导航守卫主要用来监听路由的进入和离开的
- vue-router提供了`beforeEach`和`afterEach`的钩子函数, 它们会在路由即将改变前和改变后触发



## 8.1、全局前置守卫

每次发生路由的导航跳转时，都会触发全局前置守卫 。因此，在全局前置守卫中，程序员可以对每个路由进行访问权限的控制：

- 你可以使用 `router.beforeEach` 注册一个全局前置守卫：

```javascript
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

// 调用路由实例对象的 beforeEach 方法,即可声明"全局前置守卫"
// 每次发生路由跳转的时候,都会触发这个方法
// 全局前置守卫
router.beforeEach((to,from,next)=> {
    // to 是将要访问的路由的信息对象
    // from 是将要离开的路由的信息对象
    // next 是一个函数,调用 next()表示放行,允许这次路由导航
    // 返回 false 以取消导航
    return false
}) 
```

每个守卫方法接收两个参数：

- to ： 即将要进入的目标的路由对象
- from：当前导航即将要离开的路由对象
- `next`：调用该方法后，才能进入下一个钩子(**可选**)

> 注意：如果是前置钩子beforeEach，必须要调用 next() 函数，如果是后置钩子afterEach，不需要主动调用 next() 函数

可以返回的值如下：

- `false`: 取消当前的导航。
- 一个路由地址：通过一个路由地址跳转到一个不同的地址







### 8.1.1、示例

- 网页标题是通过`<title>`来显示的, 但是SPA只有一个固定的HTML, 切换不同的页面时, 标题并不会改变.
- 但是我们可以通过JavaScript来修改`<title>`的内容 `window.document.title = '新的标题'`
- 那么在Vue项目中, 在哪里修改? 什么时候修改比较合适呢?

```javascript
const routes = [
  {
    path: '',
    // redirect重定向
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta: {
        title: '首页'
    }
  },
  {
    path: '/about',
    component: About,
    meta: {
        title: '关于'
    }
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

// 前置钩子hook(前置回调)
router.beforeEach((to,form,next) => {
    // 从 from 跳转到 to
    window.document.title = to.meta.title
    next()
})
```





### 8.1.2、路由元信息

有时，你可能希望将任意信息附加到路由上，如过渡名称、谁可以访问路由等。这些事情可以通过接收属性对象的`meta`属性来实现，并且它可以在路由地址和导航守卫上都被访问到。



```javascript
const routes = [
  {
    path: '/posts',
    component: PostsLayout,
    children: [
      {
        path: 'new',
        component: PostsNew,
        // 只有经过身份验证的用户才能创建帖子
        meta: { requiresAuth: true }
      },
      {
        path: ':id',
        component: PostsDetail
        // 任何人都可以阅读文章
        meta: { requiresAuth: false }
      }
    ]
  }
]
```

那么如何访问这个 `meta` 字段呢？

- 首先，我们称呼 `routes` 配置中的每个路由对象为 **路由记录**。路由记录可以是嵌套的，因此，当一个路由匹配成功后，它可能匹配多个路由记录。

- 例如，根据上面的路由配置，`/posts/new` 这个 URL 将会匹配父路由记录 (`path: '/posts'`) 以及子路由记录 (`path: 'new'`)。

- 一个路由匹配到的所有路由记录会暴露为 `$route` 对象，Vue Router 还为你提供了一个 `$route.meta` 方法

这意味着你可以简单地写：

```javascript
router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && !auth.isLoggedIn()) {
    // 此路由需要授权，请检查是否已登录
    // 如果没有，则重定向到登录页面
    return {
      path: '/login',
      // 保存我们所在的位置，以便以后再来
      query: { redirect: to.fullPath },
    }
  }
})
```

### 8.1.2、next函数的三种调用方式

- 当前用户拥有后台主页的访问权限，直接放行： `next()`
- 当前用户没有后台主页的访问权限，强制其跳转到登录页面：`next('/login')`
- 当前用户没有后台主页的访问权限，不允许跳转到后台主页：`next(false)`



## 8.2、全局后置守卫

```javascript
router.afterEach((to, from) => {
  window.document.title = to.meta.title
})
```

它们对于分析、更改页面标题、声明页面等辅助功能以及许多其他事情都很有用。









## 8.3、keep-alive缓存组件

- 当路由被**跳转**后，原来所看到的组件就**被销毁**了，**重新返回**后组件又被**重新创建**了

> 解决办法：利用`keep-alive`把原来的组件给缓存下来

- keep-alive 是 Vue 的内置组件，当它包裹动态组件时，**会缓存不活动的组件实例，而不是销毁**它们。
- 优点：在组件切换过程中把切换出去的组件保留在内存中，防止重复渲染DOM，减少加载时间及性能消耗，提高用户体验性。

```html
<template>
  <div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
```



### 8.3.1、keep-alive的三个属性

1. include  ： 组件名数组，只有匹配的组件**会被缓存**
2. exclude ： 组件名数组，任何匹配的组件都**不会被缓存**
3. max ： 最多可以**缓存多少**组件实例

```html
<template>
  <div>
    <keep-alive :include="['LayoutPage']">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
```

















































































