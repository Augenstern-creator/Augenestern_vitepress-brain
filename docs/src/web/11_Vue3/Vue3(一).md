# 1、Vue3



# 2、Vue3安装

- 方法一：独立版本：[Vue3 安装 | 菜鸟教程 (runoob.com)](https://www.runoob.com/vue3/vue3-install.html)
- 刚开始学习 Vue，我们不推荐使用 vue-cli 命令行工具来创建项目，更简单的方式是直接在页面引入 vue.global.js 文件来测试学习
- 使用 npm 安装

```bash
# 最新稳定版
$ npm init vue@latest
```

> 1. 官方网站：[Vue.js - 渐进式 JavaScript 框架 | Vue.js (vuejs.org)](https://cn.vuejs.org/)
> 2. 中文文档：[简介 | Vue.js (vuejs.org)](https://cn.vuejs.org/guide/introduction.html)

# 3、Vue指令



## 3.1、配置准备

### 1.1.1、WebStrom配置模板

1. 打开WebStrom，File->Settings->Editor->Code Style->Style Sheets

   将CSS、HTML、JavaScript、TypeScript的样式缩进均改为2，下面图片以CSS为例。

![](Vue3(一).assets/1.png)



2. File->Settings->Editor->Live Templates->Vue

![](Vue3(一).assets/2.png)

![](Vue3(一).assets/3.png)

将下方代码粘贴进模板文件(Template File):

```html
  <div id="app">
    <h1>{{message}}</h1>
  </div>

<script src="../js/vue.js"></script>
<script>
   // 1.创建Vue的实例对象
   const app = Vue.createApp({
    data(){
      return {
        message: '你好Vue3!'
      }
    }
   }).mount('#app');
</script>
```

3. OK，这样我们在HTML文件中输入 `vue` 再按 `tab` 键，那么就会自动生成vue模板了。

> 1. Vue3 中的应用是通过使用 createApp 函数来创建的，语法格式如下：
>
> ```javascript
> const app = Vue.createApp({ /* 选项 */ })
> ```
>
> 2. 传递给 createApp 的选项用于配置根组件。在使用 **mount()** 挂载应用时，该组件被用作渲染的起点。
>
> ```javascript
> Vue.createApp(HelloVueApp).mount('#hello-vue')
> ```

### 1.1.2、配置devtools

- 在 Chrome 应用商店搜索 - vue

![](Vue3(一).assets/4.png)



### 1.1.3、Vue3指令概览

| 指令    | 描述                                                         |
| ------- | ------------------------------------------------------------ |
| v-bind  | 用于将Vue实例的数据绑定到HTML元素的属性上                    |
| v-if    | 用于根据表达式的值来条件性的渲染元素或组件                   |
| v-show  | 用于根据表达式的值来条件性地显示或隐藏元素                   |
| v-for   | 用于根据数组或对象的属性值来循环渲染元素或组件               |
| v-on    | 用于在 HTML 元素上绑定事件监听器，使其能够触发 Vue 实例中的方法或函数 |
| v-model | 用于在**表单控件**和 Vue 实例的数据之间创建双向数据绑定      |









## 3.2、内容渲染指令

### 3.2.1、mustache语法

内容渲染指令就是插值操作，如何将data中的文本数据，插入到HTML中呢？

可以通过Mustache语法（也就是 双大括号{{}}），也叫做插值表达式

1. 双括号里面是**变量**

```html
<div id="app">
  <h1>{{message}}</h1>
</div>

<script src="../js/vue.js"></script>
<script>
   // 1.创建Vue的实例对象
   const app = Vue.createApp({
    data(){
      return {
        message: '你好Vue3!'
      }
    }
   }).mount('#app');
</script>
```

![](Vue3(一).assets/5.png)

2. 双括号里面是**表达式**

```html
<div id="app">
  <h1>{{message}}</h1>
  <h1>{{message+site}}</h1>
  </div>

<script src="../js/vue.js"></script>
<script>
   // 1.创建Vue的实例对象
   const app = Vue.createApp({
    data(){
      return {
        message: '你好Vue3!',
        site: 'www.qindalin.com',
      }
    }
   }).mount('#app');
</script>
```

![](Vue3(一).assets/6.png)

3. 双括号里面**表达式加空格或者字符**

```html
<div id="app">
  <h1>{{message}}</h1>
  <h1>{{message+ '空格或者字符' + site}}</h1>
</div>

<script src="../js/vue.js"></script>
<script>
   // 1.创建Vue的实例对象
   const app = Vue.createApp({
    data(){
      return {
        message: '你好Vue3!',
        site: 'www.qindalin.com',
      }
    }
   }).mount('#app');
</script>
```

![](Vue3(一).assets/7.png)

4. **双括号后加双括号**

```html
<div id="app">
  <h1>{{message}}</h1>
  <h1>{{message}} {{site}}</h1>
</div>

<script src="../js/vue.js"></script>
<script>
   // 1.创建Vue的实例对象
   const app = Vue.createApp({
    data(){
      return {
        message: '你好Vue3!',
        site: 'www.qindalin.com',
      }
    }
   }).mount('#app');
</script>
```

![](Vue3(一).assets/8.png)

5. 双括号后**跟字符**

```html
<div id="app">
  <h1>{{message}}</h1>
  <h1>{{message}},大林dalin</h1>
</div>

<script src="../js/vue.js"></script>
<script>
   // 1.创建Vue的实例对象
   const app = Vue.createApp({
    data(){
      return {
        message: '你好Vue3!',
        site: 'www.qindalin.com',
      }
    }
   }).mount('#app');
</script>
```

![](Vue3(一).assets/9.png)

6. 双括号只能写在标签内部,不能写在标签属性里面

```html
<div id="app">
  <h1>{{message}}</h1>
  <!-- <h1 {{message}}> {{message}},大林dalin </h1> 报错--> 
</div>
```

7. 双括号里面还能进行变量计算

```html
<div id="app">
  <h1>{{message}}</h1>
  <h1>计算{{count * 2}}</h1>
</div>
```

![](Vue3(一).assets/10.png)







### 3.2.2、v-once

我们有时候希望展示的部分数据不会随着Vue的响应式而发生变化，要怎么做呢？先来看一个例子：

```html
<div id="app">
  <h1>会变化{{message}}</h1>
  <h1>不会变化{{message}}</h1>
</div>

<script src="../js/vue.js"></script>
<script>
   // 1.创建Vue的实例对象
   const app = Vue.createApp({
    data(){
      return {
        message: '你好Vue3',
      }
    }
   }).mount('#app');
</script>
```

![](Vue3(一).assets/11.png)

我们在Console控制台修改 `app.messgae="Vue3"`，会发现message都发生了变化

![](Vue3(一).assets/12.png)



要想第二个message不发生变化，我们给第二个h1标签添加`v-once`属性

```html
<div id="app">
  <h1>会变化{{message}}</h1>
  <h1 v-once>不会变化{{message}}</h1>
</div>
```

![](Vue3(一).assets/13.png)

> 注意：
>
> 1. `v-once`指令后面不需要跟任何表达式
> 2. `v-once`该指令表示元素和组件只渲染一次，不会随着数据的改变而改变



### 1.3.2、v-text

`v-text` 作用和 `Mustache` 比较相似：都是用于将数据显示在界面中

1. `v-text` 是放在标签属性中

```html
<div id="app">
  <h1>{{message}}</h1>
  <h1 v-text="message"></h1>
</div>
```

![](Vue3(一).assets/14.png)

对于v-text和mustache语法，我们更推荐使用mustache语法。

> 注意：v-text 指令会==覆盖元素内默认的值==。

### 1.3.3、v-html

某些情况下，我们从服务器请求到的数据本身就是一个HTML代码

- 如果我们直接通过`{{}}` 来输出，会将HTML代码也一起输出
- 但是我们希望是按照HTML格式进行解析，并且显示对应的内容

如果我们希望解析出HTML展示

- 可以使用`v-html`指令
- 该指令后面往往会跟上一个string类型
- 会将string的html解析出来并且进行渲染

我们来看一个mustache例子：

```html
<div id="app">
  <h1>{{site}}</h1>
</div>

<script src="../js/vue.js"></script>
<script>
   // 1.创建Vue的实例对象
   const app = Vue.createApp({
    data(){
      return {
        message: '你好Vue3！',
        site: '<a href="www.qindalin.com">大林博客</a>'
      }
    }
   }).mount('#app');
</script>
```

![](Vue3(一).assets/15.png)

有时候服务器给客户端返回的数据是带标签的数据，我们客户端拿到之后解析肯定不能如上图那样直接使用 mustache 语法，我们要对其进行处理

```html
<div id="app">
  <h1>{{site}}</h1>
  <h1 v-html="site"></h1>
</div>
```

![](Vue3(一).assets/16.png)



### 1.3.4、v-pre

该指令的作用是用于跳过这个元素和它子元素的编译过程，用于显示原本的 Mustache 语法

一般我们的mustache语法会去data里面找对应的变量然后解析，可是如果我们就想让其显示为 `{{message}}` ，这个时候需要加 `v-pre` 属性，如下：

```html
<div id="app">
  <h1>{{message}}</h1>
</div>

<script src="../js/vue.js"></script>
<script>
   // 1.创建Vue的实例对象
   const app = Vue.createApp({
    data(){
      return {
        message: '你好Vue3！',
      }
    }
   }).mount('#app');
</script>
```

![](Vue3(一).assets/17.png)

我们给标签增加 `v-pre` 属性

```html
<div id="app">
  <h1 v-pre>{{message}}</h1>
</div>
```

![](Vue3(一).assets/18.png)



### 1.3.5、v-cloak

在实际开发中，我们data里面的数据可能是从服务器端获取来的，如果网络不好获取的比较慢，浏览器可能会直接显示出未编译的Mustache标签。那么页面在渲染时可能会先显示 `{{message}}` 之后变为 `你好Vue3！`。这种效果不是我们想要的，我们可以给标签添加 `v-cloak` 来避免这种效果。

解决办法：

1. 加上`v-clock` 属性,并加上css。
2. vue解析之前有 `v-clock` 属性时，让其不显示
3. Vue解析之后没有`v-clock` 属性，再让其显示

```html
<style>
    
    [v-cloak] {
      display: none;
    }
</style>

<div id="app">
  <h1 v-cloak>{{message}}</h1>
</div>

<script>
  // 在vue解析之前, div中有一个属性v-cloak
  // 在vue解析之后, div中没有一个属性v-cloak
  setTimeout(function () {
    const app = new Vue({
      el: '#app',
      data: {
        message: '你好Vue3!'
      }
    })
  }, 1000)
</script>
```

这里回顾一下 CSS 中的中括号的用法：

```css
span[class='test']    =>匹配所有带有class类名test的span标签

span[class *='test']  =>匹配所有包含了test字符串的class类名的span标签

span[class]               =>匹配所有带有class属性的span标签

[class='all']               =>匹配页面上所有带有class='all'的标签

[class *='as']             =>匹配页面上所有class类且类名带有as字符串的类的标签
```









## 3.3、属性绑定指令

### 3.3.1、v-bind

前面的指令主要作用是将值插入到我们的模板的内容当中，但是，除了内容需要动态来决定外，某些属性我们也希望动态来绑定。

- 比如动态绑定a元素的 href 属性
- 比如动态绑定img元素的 src 属性



1. **绑定 href、src 用法**

在实际开发中，照片img的url值可能也是由服务器端获取，a标签的href值可能也是由服务器端获取的，那么我们如何动态绑定呢？例如我们看下面的例子：

```html
<div id="app">
  <h1>{{message}}</h1>
  <a href="url">百度</a>
</div>

<script src="../js/vue.js"></script>
<script>
   // 1.创建Vue的实例对象
   const app = Vue.createApp({
    data(){
      return {
        message: '你好Vue3！',
        url: 'http://www.baidu.com'
      }
    }
   }).mount('#app');
</script>
```

![](Vue3(一).assets/19.png)



如上图，我们给a标签的href是不能直接写url的，因为它不会解析。这个时候就需要给href前添加`v-bind`指令了。

```html
<div id="app">
  <h1>{{message}}</h1>
  <a v-bind:href="url">百度</a>
</div>
```

![](Vue3(一).assets/20.png)

**语法糖写法如下**： `:href="url"`

```html
<div id="app">
  <h1>{{message}}</h1>
  <a :href="url">百度</a>
</div>
```

#### 1、v-bind绑定class

2. **绑定 class 用法**

- 绑定class

  我们让 message 的字体颜色为红色，由于是单文件演示，所以将 style 样式写入上方，实际开发中我们的样式可能是由服务器端获取的。例如服务端传给我们的样式是使得文字样式变为红色

```html
<style>
  .red{
    color: red;
  }
  /* 
  	由于是单页面演示，我们可以将style样式的内容认为是服务端传过来的  
  */
</style>



<div id="app">
  <h1 class="red">{{message}}</h1>
</div>

<script src="../js/vue.js"></script>
<script>
   // 1.创建Vue的实例对象
   const app = Vue.createApp({
    data(){
      return {
        message: '你好Vue3！',
      }
    }
   }).mount('#app');
</script>
```

![](Vue3(一).assets/21.png)

例如我们的样式是从服务器端获取的arg1,那么如果我们直接写 `class="arg1"` 是不会解析为 `class=red` 的，如下图：

```html
<div id="app">
  <h1 class="arg1">{{message}}</h1>
</div>

<script src="../js/vue.js"></script>
<script>
   // 1.创建Vue的实例对象
   const app = Vue.createApp({
    data(){
      return {
        message: '你好Vue3！',
        arg1: 'red'
      }
    }
   }).mount('#app');
</script>
```

![](Vue3(一).assets/22.png)



如果我们使用v-bind绑定写为 `:class="arg1"`,那么就会解析为 `class="red"`

```html
<div id="app">
  <h1 :class="arg1">{{message}}</h1>
</div>

<script src="../js/vue.js"></script>
<script>
   // 1.创建Vue的实例对象
   const app = Vue.createApp({
    data(){
      return {
        message: '你好Vue3！',
        arg1: 'red'
      }
    }
   }).mount('#app');
</script>
```

![](Vue3(一).assets/23.png)

- **V-bind 对象语法**
  - 当服务器端传给我们很多样式的时候，我们可以采用**对象语法(class 后面跟的是一个对象)**


```html
<style>
  .red{
    color: red;
  }
  .fontSize{
    font-size: 100px;
  }
  /*
  	由于是单页面演示，我们可以将style样式的内容认为是服务端传过来的
  */
</style>
<body>
  <div id="app">
      <h1>{{message}}</h1>
      <!-- {类名1: 布尔值,类名2: 布尔值,类名3: 布尔值} -->
      <p :class="{red: true, fontSize: true}">{{message}}</p>
    </div>

  <script src="../js/vue.js"></script>
  <script>
     // 1.创建Vue的实例对象
     const app = Vue.createApp({
      data(){
        return {
          message: '你好Vue3!',
          arg1: 'red',
          arg2: 'fontSize'
        }
      }
     }).mount('#app');
  </script>
</body>
```

![](Vue3(一).assets/24.png)



- **v-bind 数组语法(class 后面跟的是一个数组)**

```html
<div id="app">
  <p :class="[arg1,arg2]">{{message}}</p>
</div>


<script src="../js/vue.js"></script>
<script>
   // 1.创建Vue的实例对象
   const app = Vue.createApp({
    data(){
      return {
        message: '你好Vue3！',
        arg1: 'red',
        arg2: 'fontSize'
      }
    }
   }).mount('#app');
</script>
```

![](Vue3(一).assets/25.png)

如果类过于繁杂，我们可以将其放在一个methods或者computed中

```html
<div id="app">
  <p :class="getArgs()">{{message}}</p>
</div>
```



#### 2、v-bind绑定style

我们可以利用 `v-bind: style` 来绑定一些CSS内联样式

在写CSS属性名的时候，比如 font-size

- 我们可以使用驼峰式：`fontSize`
- 或短横线分隔(记得用单引号括起来) `'font-size'`

---



3. **绑定 style 语法**

我们普通的用法如下，这是css的行内式写法：

```html
<div id="app">
  <p style="font-size: 50px;">{{message}}</p>
</div>
```

若我们使用`v-bind`来绑定 style 样式,使用方式如下：

```html
<div id="app">
  <p :style="{fontSize: '50px'}">{{message}}</p>
</div>
```

![](Vue3(一).assets/26.png)

> 注意点：
>
> 1. 需要外面有大括号
> 2. 原始的 font-size，中间有`-`连接符的需要删除连接符并改为驼峰命名法
> 3. {属性名:属性值}，其中的属性值需要加单引号 `''`

如果我们的属性值是由外部服务器传来的，那么我们的属性值可以不用加单引号，示例如下：

```html
<div id="app">
  <p :style="{fontSize: arg1}">{{message}}</p>
</div>


<script src="../js/vue.js"></script>
<script>
   // 1.创建Vue的实例对象
   const app = Vue.createApp({
    data(){
      return {
        message: '你好Vue3！',
        arg1: '50px',
      }
    }
   }).mount('#app');
</script>
```

![](Vue3(一).assets/27.png)

**如果外部传入的样式较多，那么我们的写法如下**：

```html
<div id="app">
  <p :style="{fontSize: arg1,backgroundColor: arg2}">{{message}}</p>
</div>


<script src="../js/vue.js"></script>
<script>
   // 1.创建Vue的实例对象
   const app = Vue.createApp({
    data(){
      return {
        message: '你好Vue3！',
        arg1: '50px',
        arg2: 'red'
      }
    }
   }).mount('#app');
</script>
```

![](Vue3(一).assets/28.png)

当然如果样式过于繁杂，我们可以将其放在一个methods或者computed中，写法如下：

```html
<div id="app">
  <p :style="getStyle()">{{message}}</p>
</div>


<script src="../js/vue.js"></script>
<script>
   // 1.创建Vue的实例对象
   const app = Vue.createApp({
    data(){
      return {
        message: '你好Vue3！',
        arg1: '50px',
        arg2: 'red'
      }
    },
     methods: {
      getStyle(){
        return {fontSize: this.arg1,backgroundColor: this.arg2}
      }
     }
   }).mount('#app');
</script>
```

![](Vue3(一).assets/29.png)

> 注意点：
>
> 1. 抽离为methods中时，属性值前需要加 `this` 关键字，this我们可以理解为实例对象app，我们可以是用 app.message,app.arg1 来打印相关数据
> 2. 在 `v-bind` 绑定style样式时，抽离为methods的方法名后面需要加括号，也就是上面代码的 `getStyle()` ==除了事件方法不用加括号,其他都需要加括号==







### 3.3.2、计算属性computed

计算属性指的是通过一系列运算之后，最终得到一个属性值。这个动态计算出来的属性值可以被模板结构或methods 方法使用。

我们知道，在模板中可以直接通过插值语法显示一些data中的数据。但是在某些情况，我们可能需要对数据进行一些转化后再显示，或者需要将多个数据结合起来进行显示.

例如下代码，我们可以在页面中拼接出： `秦🔥晓`

```html
<body>
<div id="app">
  <!-- 1.常规用法 -->
  <p>{{firstName + '🔥' + lastName}}</p>
</div>


<script src="../js/vue.js"></script>
<script>
   // 1.创建Vue的实例对象
   const app = Vue.createApp({
    data(){
      return {
        firstName: '秦',
        lastName: '晓'
      }
    },
     methods:{

     }
   }).mount('#app');
</script>
</body>
```

![](Vue3(一).assets/41.png)



若要拼接的内容过多，我们使用Mustache语法就会比较复杂，我们可以使用函数来拼接：

```html
<div id="app">
  <!-- 2.函数用法 -->
  <p>{{getFullName()}}</p>
</div>


<script src="../js/vue.js"></script>
<script>
   // 1.创建Vue的实例对象
   const app = Vue.createApp({
    data(){
      return {
        firstName: '秦',
        lastName: '晓'
      }
    },
     methods:{
       getFullName(){
         return this.firstName + '🔥' + this.lastName;
       }
     }
   }).mount('#app');
</script>
</body>
```

![](Vue3(一).assets/41.png)



当然这些拼接比较简单，如果有更复杂的我们建议放在`计算属性computed`中，代码如下：

```html
<body>
<div id="app">
  <!-- 3.计算属性 -->
  <p>{{fullName}}</p>
</div>


<script src="../js/vue.js"></script>
<script>
   // 1.创建Vue的实例对象
   const app = Vue.createApp({
    data(){
      return {
        firstName: '秦',
        lastName: '晓'
      }
    },
    computed:{
      fullName(){
        //注意:计算属性本质上还是属性,所以命名为属性,只是写法为函数
        //属性命名-fullName
        //函数命名-getFullName
        return this.firstName + '🔥' + this.lastName;
      }
    },
     methods:{

     }
   }).mount('#app');
</script>
</body>
```

![](Vue3(一).assets/41.png)

> 注意：
>
> 1. 计算属性写法为函数,命名为属性
> 2. 计算属性在Mustache语法中不需要加括号，因为计算属性本质为属性
> 2. 计算属性会缓存计算的结果，只有计算属性依赖的数据变化时，才会重新进行运算

#### 1、深入使用

假设我们从服务器端返回的是一个数组对象，代码如下：

```html
<div id="app">
  <!-- 1.常规使用 -->
  <p>总积分:{{members[0].score+members[1].score+members[2].score+members[3].score}}</p>
</div>


<script src="../js/vue.js"></script>
<script>
   // 1.创建Vue的实例对象
   const app = Vue.createApp({
    data(){
      return {
        members:[
          {id: '0',name:'张零',score: 1000},
          {id: '1',name:'张一',score: 1001},
          {id: '2',name:'张二',score: 1002},
          {id: '3',name:'张三',score: 1003}
        ]
      }
    }
   }).mount('#app');
</script>
</body>
```

![](Vue3(一).assets/42.png)

我们会发现常规使用Mustache语法会非常复杂，这个时候我们就需要使用计算属性了：

```html
<div id="app">
  <!-- 1.计算属性 -->
  <p>总积分:{{totalScore}}</p>
</div>


<script src="../js/vue.js"></script>
<script>
   // 1.创建Vue的实例对象
   const app = Vue.createApp({
    data(){
      return {
        members:[
          {id: '0',name:'张零',score: 1000},
          {id: '1',name:'张一',score: 1001},
          {id: '2',name:'张二',score: 1002},
          {id: '3',name:'张三',score: 1003}
        ]
      }
    },
    computed:{
      totalScore(){
        let total = 0;
        for(let member of this.members){
          total += member.score;
        }
        return total;
      }
    },
   }).mount('#app');
</script>
```

![](Vue3(一).assets/42.png)





#### 2、内部实现

每一个计算属性都包含一个getter和一个setter，只是我们一般基本不用 setter方法

```html
<body>
<div id="app">
  <!-- 3.计算属性 -->
  <p>{{fullName}}</p>
</div>


<script src="../js/vue.js"></script>
<script>
   // 1.创建Vue的实例对象
   const app = Vue.createApp({
    data(){
      return {
        firstName: '秦',
        lastName: '晓'
      }
    },
    computed:{
      /* 我们的写法如下
      fullName(){
        return this.firstName + '🔥' + this.lastName;
      },
      */
      // 实际上计算属性的完整写法如下,只是我们一般不适用 set 方法,所以可以省略set、get写法
      fullName(){
        set(){
            
        },
        get(){
            return this.firstName + '🔥' + this.lastName;
        }
        
      }
    },
     methods:{

     }
   }).mount('#app');
</script>
</body>
```

![](Vue3(一).assets/41.png)



#### 3、计算属性和methods的区别

我们可能会考虑这样的一个问题：

- methods 和 computed 看起来都可以实现我们的功能，那么为什么还要多一个计算属性这个东西呢？
- 原因：**计算属性会进行缓存，如果多次使用时，计算属性只会调用一次。**

## 3.4、事件监听指令

在前端开发中，我们经常需要监听点击、拖拽、键盘事件等等，这个时候需要使用 `v-on` 

- 作用：绑定事件监听器
- 缩写：`@`

| DOM对象 | vue事件绑定 |
| ------- | ----------- |
| onclick | v-on:click  |
| oninput | v-on:input  |
| onkeyup | v-on:keyup  |

> 注意：通过 v-on 绑定的事件处理函数，需要 在 methods 节点 中进行声明

### 3.4.1、v-on

我们来看下v-on的最基本的用法，这里借用官方demo演示：

```html
<div id="app">
  <h1>{{count}}</h1>
  <button v-on:click="sub">-</button>
  <!--  v-on:click 语法糖为 @click -->
  <button @click="add">+</button>
</div>


<script src="../js/vue.js"></script>
<script>
  // 1.创建Vue的实例对象
  const app = Vue.createApp({
    data(){
      return {
        count: 0,
      }
    },
    methods: {
      add(){
        this.count++;
      },
      sub(){
        this.count--;
      }
    }
  }).mount('#app');
</script>
```

![](Vue3(一).assets/30.png)

> 注意：
>
> 1. v-on绑定的方法名后面可以加括号，也可以不加括号
> 2. v-on的语法糖为`@`，v-on:click 我们可以写为 @click

如果我们的事件要传递参数，代码如下：

```html
<body>
<div id="app">
  <button @click="btn1Click()">按钮一</button>
  <button @click="btn2Click">按钮二</button>
</div>


<script src="../js/vue.js"></script>
<script>
   // 1.创建Vue的实例对象
   const app = Vue.createApp({
    data(){
      return {
        count: 0,
      }
    },
     methods:{
       btn1Click(args){
         console.log(args);   // undefined
       },
       btn2Click(args){
         console.log(args);   // 事件对象
       }
     }
   }).mount('#app');
</script>
</body>
```

![](Vue3(一).assets/31.png)



> 在使用 v-on 绑定事件时：
>
> 1. 如果事件函数后有括号，如：`@click="btn1Click()"`,则默认什么都不传递
> 2. 如果事件函数后无括号，如:`@click="btn1Click"` ,则默认传递事件对象

当然我们也可以传递多个参数,我们可以使用多个参数来接收，也可以使用arguments来接收：

```html
<div id="app">
  <button @click="btn1Click(123,'abc',true)">按钮一</button>
</div>


<script src="../js/vue.js"></script>
<script>
   // 1.创建Vue的实例对象
   const app = Vue.createApp({
    data(){
      return {
        count: 0,
      }
    },
     methods:{
       btn1Click(arg1,arg2,arg3){
         console.log(arg1, arg2, arg3);   // 123 'abc' true
         console.log(arguments);    // 我们也可以使用arguments来接收
         console.log(arguments[0]); // 123
         console.log(arguments[1]); // 'abc'
         console.log(arguments[2]); // true
       }
     }
   }).mount('#app');
</script>
```

![](Vue3(一).assets/32.png)



当然我们也可以传递动态参数，例如传递data实例中的count：

```html
<body>
<div id="app">
  <button @click="btn1Click(123,'abc',true,count)">按钮一</button>
</div>


<script src="../js/vue.js"></script>
<script>
   // 1.创建Vue的实例对象
   const app = Vue.createApp({
    data(){
      return {
        count: 0,
      }
    },
     methods:{
       btn1Click(arg1,arg2,arg3,arg4){
         console.log(arg1, arg2, arg3,arg4);   // 123 'abc' true 0
       }
     }
   }).mount('#app');
</script>
</body>
```

当我们带参数又要带有事件参数时,我们要使用 `$event`：

```html
<body>
<div id="app">
  <button @click="btn1Click(123,'abc',true,count,$event)">按钮一</button>
</div>


<script src="../js/vue.js"></script>
<script>
   // 1.创建Vue的实例对象
   const app = Vue.createApp({
    data(){
      return {
        count: 0,
      }
    },
     methods:{
       btn1Click(arg1,arg2,arg3,arg4,arg5){
         console.log(arg1, arg2, arg3,arg4,arg5);   // 123 'abc' true 0
       }
     }
   }).mount('#app');
</script>
</body>
```

![](Vue3(一).assets/33.png)







### 3.4.2、v-on修饰符

#### 1、阻止冒泡

对于如下代码，我们点击按钮，会冒泡至父盒子，效果如下图：

```html
<body>
<div id="app">
  <!--1.阻止冒泡-->
  <div class="box" @click="boxClick">
    <button @click="btnClick">点我</button>
  </div>
</div>


<script src="../js/vue.js"></script>
<script>
   // 1.创建Vue的实例对象
   const app = Vue.createApp({
    data(){
      return {
        count: 0,
      }
    },
     methods:{
       boxClick(){
         console.log('点击了盒子')
       },
       btnClick(){
         console.log('点击了按钮')
       }
     }
   }).mount('#app');
</script>
</body>
```

![](Vue3(一).assets/34.png)



在我们之前的做法中，我们是拿到事件对象，使用 `event.stopPropagation()`来阻止冒泡的，代码如下：

```js
btnClick(event){
     event.stopPropagation();
     console.log('点击了按钮')
}
```

![](Vue3(一).assets/35.png)

在Vue中我们使用的是给 `v-on`后面加修饰符，`@click.stop`来阻止冒泡，代码如下：

```html
<body>
<div id="app">
  <!--1.阻止冒泡-->
  <div class="box" @click="boxClick">
    <button @click.stop="btnClick">点我</button>
  </div>
</div>


<script src="../js/vue.js"></script>
<script>
   // 1.创建Vue的实例对象
   const app = Vue.createApp({
    data(){
      return {
        count: 0,
      }
    },
     methods:{
       boxClick(){
         console.log('点击了盒子')
       },
       btnClick(){
         console.log('点击了按钮')
       }
     }
   }).mount('#app');
</script>
</body>
```

![](Vue3(一).assets/35.png)



#### 2、阻止默认事件

如下代码，我们点击提交，会先在控制台打印`表单提交`,然后默认跳转`http://www.jd.com`

```html
<body>
<div id="app">
  <!--2.阻止默认事件-->
  <form action="http://www.jd.com">
    <input type="submit" value="提交" @click="doSubmit">
  </form>
</div>


<script src="../js/vue.js"></script>
<script>
   // 1.创建Vue的实例对象
   const app = Vue.createApp({
    data(){
      return {
        count: 0,
      }
    },
     methods:{
       doSubmit(){
         console.log('表单提交')
       }
     }
   }).mount('#app');
</script>
</body>
```

可是如果我们想将表单的数据处理之后再提交，而不是直接提交，这个时候就要阻止表单提交默认事件了,我们之前的做法是先拿到事件对象`event`，然后`event.preventDefault()`

```js
doSubmit(event){
     // 阻止默认事件
     event.preventDefault();
     console.log('表单提交')
}
```

![](Vue3(一).assets/36.png)

在Vue中我们可以在`v-on`之后加修饰符，`@click.prevent`来阻止默认事件

```html
<body>
<div id="app">
  <!--2.阻止默认事件-->
  <form action="http://www.jd.com">
    <input type="submit" value="提交" @click.prevent="doSubmit">
  </form>
</div>


<script src="../js/vue.js"></script>
<script>
   // 1.创建Vue的实例对象
   const app = Vue.createApp({
    data(){
      return {
        count: 0,
      }
    },
     methods:{
       doSubmit(){
         console.log('表单提交')
       }
     }
   }).mount('#app');
</script>
</body>
```

默认事件我们一般处理的还有`a`标签，我们不希望 `a`标签进行跳转，而是处理我们其他数据等

```html
<a href="www.baidu.com" @click.prevent="aClick">百度一下</a>
```



#### 3、响应一次事件

有时候我们希望有些事件只被触发一次，这种情况遇到的很少。要怎么做呢？

```html
<body>
<div id="app">
  <!--2.响应一次事件-->
    <button @click="btnClick">按钮</button>
</div>


<script src="../js/vue.js"></script>
<script>
   // 1.创建Vue的实例对象
   const app = Vue.createApp({
    data(){
      return {
        count: 0,
      }
    },
     methods:{
       btnClick(){
         console.log('点击')
       }
     }
   }).mount('#app');
</script>
</body>
```

![](Vue3(一).assets/37.png)



如果我们只想让其响应一次，需要`@click.once`

```html
<div id="app">
  <!--2.响应一次事件-->
    <button @click.once="btnClick">按钮</button>
</div>
```

![](Vue3(一).assets/38.png)



#### 4、键盘事件修饰符

我们监听键盘的按键

```html
<body>
<div id="app">
  <!--4.键盘事件修饰符-->
  <!-- 键盘按下 -->
  <input type="text" @keydown="getMsg">
  <!-- 键盘抬起 -->
<!--  <input type="text" @keyup="">-->
</div>


<script src="../js/vue.js"></script>
<script>
   // 1.创建Vue的实例对象
   const app = Vue.createApp({
    data(){
      return {
        count: 0,
      }
    },
     methods:{
       getMsg(event){
         console.log(event)
       }
     }
   }).mount('#app');
</script>
</body>
```

![](Vue3(一).assets/39.png)



我们通常会监听 `enter`回车键,写法为`@keydown.enter` ,意思是只有按下`enter`回车键才会触发 getMsg 函数

```html
<!-- 键盘按下 -->
<input type="text" @keydown.enter="getMsg">
```

![](Vue3(一).assets/40.png)



### 3.4.3、小结

- `.stop` - 调用 `event.stopPropagation()`
- `.prevent` - 调用 `event.preventDefault()`
- `.{keyCode|keyAlias}` - 只当事件是从特定键触发时才触发回调
- `.once` - 只触发一次回调



## 3.5、条件渲染指令

条件渲染指令==用来辅助开发者按需控制 DOM 的显示与隐藏== 。

`v - if`、`v-else-if`、`v-else`

- 这三个指令与JavaScript的条件语句 if、else、else if 类似
- Vue 的条件指令可以根据表达式的值在DOM中渲染或销毁元素或组件

### 3.5.1、v-if

```html
<div id="app">
  <p v-if="flag">今天要下雨</p>
  <p v-else>今天不要下雨</p>
</div>


<script src="../js/vue.js"></script>
<script>
   // 1.创建Vue的实例对象
   const app = Vue.createApp({
    data(){
      return{
        flag: true
      }
    }
   }).mount('#app');
</script>

```

![](Vue3(一).assets/43.png)

`v-if`的原理：

- `v-if` 后面的条件为 false时，对应的元素以及子元素不会渲染
- 也就是根本没有对应的标签出现在DOM中

![](Vue3(一).assets/44.png)



### 3.5.2、v-if、v-else-if、v-else

我们一般不会使用 v-else-if，因为这样的代码不美观，我们一般想要切换的话使用如下代码：

```html
<body>
<div id="app">
  <p v-if="flag">今天要下雨</p>
  <p v-else>今天不要下雨</p>
  <button @click="toggle()">切换</button>
</div>


<script src="../js/vue.js"></script>
<script>
   // 1.创建Vue的实例对象
   const app = Vue.createApp({
    data(){
      return{
        flag: true
      }
    },
     methods:{
       toggle(){
         return this.flag = !this.flag;
       }
     }
   }).mount('#app');
</script>
</body>
```

![](Vue3(一).assets/45.png)



### 3.5.3、v-show

`v-show`的用法和`v-if`非常相似，也用于决定一个元素是否渲染：

- `v-if` 指令会 动态地创建或移除 DOM 元素 ，从而控制元素在页面上的显示与隐藏
- `v-show` 指令会动态为元素 ==添加或移除 style="display: none;"== 样式 ，从而控制元素的显示与隐藏

```html
<body>
<div id="app">
  <p v-show="flag">今天要下雨</p>
  <p v-show="!flag">今天不要下雨</p>
  <button @click="toggle()">切换</button>
</div>


<script src="../js/vue.js"></script>
<script>
   // 1.创建Vue的实例对象
   const app = Vue.createApp({
    data(){
      return{
        flag: true
      }
    },
     methods:{
       toggle(){
         return this.flag = !this.flag;
       }
     }
   }).mount('#app');
</script>
</body>
```

![](Vue3(一).assets/45.png)

> 开发中如何选择呢？

- 当需要在显示与隐藏之间切片很频繁时，使用 `v-show`
- 当只有一次切换时，通过 `v-if`





### 3.5.4、条件渲染案例

我们来做一个简单的小案例：

- 用户再登录时，可以切换使用用户账号登录还是邮箱地址登录。我们使用`v-if`来写

```vue
<body>
    <div id="app">
      <span v-if="isUser">
        <label for="username">用户账号</label>
        <input type="text" id="username" placeholder="用户账号">
      </span>
      <span v-else>
        <label for="email">用户邮箱</label>
        <input type="text" id="email" placeholder="用户邮箱">
      </span>
      <button @click="isUser = !isUser">切换类型</button>
    </div>

    <script src="../js/vue.js"></script>
    <script>
      // 1.创建Vue的实例对象
       const app = Vue.createApp({
        data(){
          return{
            isUser: true
          }
        }
       }).mount('#app');
    </script>
</body>
```

![](Vue3(一).assets/2.gif)



我们使用`v-show` 来写：

```html
<body>
<div id="app">
      <span v-show="isUser">
        <label for="username">用户账号</label>
        <input type="text" id="username" placeholder="用户账号">
      </span>
  <span v-show="!isUser">
        <label for="email">用户邮箱</label>
        <input type="text" id="email" placeholder="用户邮箱">
      </span>
  <button @click="isUser = !isUser">切换类型</button>
</div>


<script src="../js/vue.js"></script>
<script>
   // 1.创建Vue的实例对象
   const app = Vue.createApp({
    data(){
      return{
        isUser: true
      }
    }
   }).mount('#app');
</script>
</body>
```

![](Vue3(一).assets/1.gif)



如果使用`v-show`，如果我们在输入内容的情况下，切换了类型，我们会发现文字依然显示之前输入的内容。

**问题解答**：

- 这是因为 Vue 在进行DOM渲染时，出于性能考虑，会尽可能的复用已经存在的元素，而不是重新创建新的元素



## 3.6、列表渲染指令

### 3.6.1、v-for

#### 1、数组遍历

我们将 data 传过来的数组在页面展示

```html
<body>
<div id="app">
  <ul>
    <li v-for="item in personArr">{{item}}</li>
  </ul>
</div>


<script src="../js/vue.js"></script>
<script>
   // 1.创建Vue的实例对象
   const app = Vue.createApp({
    data(){
      return{
        personArr: ['秦晓',20,'Fighting']
      }
    }
   }).mount('#app');
</script>
</body>
```

![](Vue3(一).assets/46.png)





```html
<div id="app">
  <ul>
    <li v-for="(item,index) in personArr">{{index}} -- {{item}}</li>
  </ul>
</div>


<script src="../js/vue.js"></script>
<script>
   // 1.创建Vue的实例对象
   const app = Vue.createApp({
    data(){
      return{
        personArr: ['秦晓',20,'Fighting']
      }
    }
   }).mount('#app');
</script>
```



![](Vue3(一).assets/47.png)



如果我们从服务器端获取的是数组对象

```html
<div id="app">
  <ul>
    <li v-for="(item,index) in person">{{index}} -- {{item.name}} -- {{item.age}} -- {{item.address}}</li>
  </ul>
</div>


<script src="../js/vue.js"></script>
<script>
   // 1.创建Vue的实例对象
   const app = Vue.createApp({
    data(){
      return{
        person: [
          {name: '张三',age : 20,address: '北京'},
          {name: '张四',age : 21,address: '西安'},
          {name: '张五',age : 22,address: '天津'},
        ]
      }
    }
   }).mount('#app');
</script>
```





![](Vue3(一).assets/48.png)



#### 2、对象遍历

如果我们从服务器端获取的是对象

```html
<body>
<div id="app">
  <ul>
    <li v-for="item in person">{{item}}</li>
  </ul>
</div>


<script src="../js/vue.js"></script>
<script>
   // 1.创建Vue的实例对象
   const app = Vue.createApp({
    data(){
      return{
        person: {
          name: '秦',
          age: 20,
          friends: ['张三','李四']
        }
      }
    }
   }).mount('#app');
</script>
</body>
```



![](Vue3(一).assets/49.png)





我们也可以遍历键值

```html
<div id="app">
  <ul>
    <li v-for="(item,key) in person">{{key}}:{{item}}</li>
  </ul>
</div>
```



![](Vue3(一).assets/50.png)



当然我们也可以拿到 index 索引

```html
<div id="app">
  <ul>
    <li v-for="(item,key,index) in person">{{index}} -- {{key}}:{{item}}</li>
  </ul>
</div>
```

![](Vue3(一).assets/51.png)







#### 3、v-if和v-for

2.x 版本中在一个元素上同时使用 `v-if` 和 `v-for` 时，`v-for` 会优先作用

3.x 版中 `v-if` 总是优先于 `v-for` 生效。





### 3.6.2、组件的key属性

官方推荐我们在使用 `v-for`时，给对应的元素或组件加上一个 `:key`属性，**key的作用主要是为了高效的更新虚拟DOM**

当**列表的数据变化**时，默认情况下， vue 会**尽可能的复用**已存在的 DOM 元素，从而**提升渲染的性能** 。但这种
默认的性能优化策略，会导致**有状态的列表无法被正确更新** 。为了给 vue 一个提示，以便它能跟踪每个节点的身份， 从而在保证**有状态的列表被正确更新**的前提下， **提升渲染的性能** 。此时，需要为每项提供一个==唯一的 key 属性== 

```html
<div id="app">
  <ul>
    <li v-for="item in person" :key="item">{{item}}</li>
  </ul>
</div>
```

> key的注意事项

- key 的值只能是字符串或数字类型
- key 的值必须具有唯一性(即：key 的值不能重复)
- 建议把 数据项 id 属性的值 作为 key 的值（因为 id 属性的值具有唯一性)
- 使用 index 的值当作 key 的值==没有任何意义==(因为 index 的值不具有唯一性)
- 建议使用 v-for 指令时一定要指定 key 的值(既提升性能、又防止列表状态紊乱)



#### 1、Diff算法

当页面中进行 li 列表展示时，如果在头部或者中间去插入一个新节点：

![](Vue3(一).assets/52.png)

Diff算法执行：会把C更新成F，D更新成C，E更新成D，最后再插入E，很没有效率。

**当我们绑定key作为唯一标识符，Diff算法就可以正确的识别此结点，找到正确的位置区插入新的结点。**

![](Vue3(一).assets/53.png)





### 3.6.3、检测数组更新

因为Vue是响应式的，所以当数据发生变化时，Vue会自动检测数据变化，视图会发生对应的更新。

Vue中包含了一组观察数组编译的方法，使用它们改变数组也会触发视图的更新。

- push()：在数组后新增一个元素
- pop()：删除数组中的最后一个元素
- shift()：删除数组中的第一个元素
- unshift()：在数组最前面添加元素
- splice()：删除元素/插入元素/替换元素
- sort()：按升序排序数组元素
- reverse()：反转数组元素

1. 我们在向数组尾部添加数值

```html
<body>
  <div id="app">
      <div>
        <label>ID:<input type="text" v-model="id"></label>
        <label>Name:<input type="text" v-model="name"></label>
        <button @click="add">添加</button>
        <hr>
        <ul>
          <li v-for="item in listArr">
            <input type="checkbox">
            {{item.id}} -- {{item.name}}
          </li>
        </ul>
      </div>
  </div>

  <script src="../js/vue.js"></script>
  <script>
     // 1.创建Vue的实例对象
     const app = Vue.createApp({
      data(){
        return {
          id: '',
          name: '',
          listArr:[
            {id:1,name:'张一'},
            {id:2,name:'张二'},
            {id:3,name:'张三'},
            {id:4,name:'张四'},
            {id:5,name:'张五'},
          ]
        }
      },
       methods:{
        add(){
          this.listArr.push({id: this.id,name:this.name});
        }
       }
     }).mount('#app');
  </script>
</body>
```

![](Vue3(一).assets/54.png)



![](Vue3(一).assets/55.png)



> 我们在向数组尾部添加数值，此时不加 key 也是没问题的,因为Diff算法默认就是在最后添加

2. 我们向数组头部添加

```js
add(){
  this.listArr.unshift({id: this.id,name:this.name});
}
```

![](Vue3(一).assets/56.png)

![](Vue3(一).assets/57.png)



3. 我们向数组中间追加数值

```js
add(){
  this.listArr.splice(2,0,{id: this.id,name:this.name});
}
```

![](Vue3(一).assets/58.png)



![](Vue3(一).assets/59.png)





> 上面就是由于没有加 `:key` 属性造成的Bug，所以官方也建议我们在使用 v-for 指令时最好要加上 `:key` 属性

```html
<ul>
    <li v-for="item in listArr" :key="item.id">
        <input type="checkbox">
        {{item.id}} -- {{item.name}}
    </li>
</ul>
```

我们给 li 加上 `:key`,就不会发生上述的Bug了，如下图：

![](Vue3(一).assets/58.png)



![](Vue3(一).assets/60.png)





## 3.7、双向绑定指令

### 3.7.1、v-model

双向绑定指令也叫表单元素绑定，vue提供了 `v-model` 双向数据绑定 指令，用来辅助开发者在 不操作 DOM 的前提下， 快速获取表单的数据。

vue中使用 `v-model` 指令来实现表单元素和数据的==双向绑定==，经常用于表单 input 和 textarea 元素。

```html
<div id="app">
  <!-- v-model 双向数据绑定指令 -->
  <input type="text" v-model="message">
  <h1>{{message}}</h1>
</div>

<script src="../js/vue.js"></script>
<script>
  // 1.创建Vue的实例对象
  const app = Vue.createApp({
    data(){
      return {
        message: '你好Vue3!'
      }
    }
  }).mount('#app');
</script>
```

![](Vue3(一).assets/61.png)



![](Vue3(一).assets/62.png)



![](Vue3(一).assets/63.png)



理解双向绑定：

- 我们来看上述代码，当我们在输入框输入内容时
- 因为 input 中的 v-model 绑定了message，所以会实时的将输入的内容传递给 message，message发生改变。
- 当message 发生改变时，因为上面我们使用 Mustache 语法，将 message 的值插入到 DOM 中，所以 DOM 会发生响应的改变。
- 所以，通过 v-model 实现了 双向的绑定

### 3.7.2、v-model原理

`v-model` 其实是一个语法糖，它的背后本质上是包含两个操作：

- `v-bind` 绑定一个 value 属性
- `v-on` 指令给当前元素绑定 input 事件

也就是说下面的代码，等同于下面的代码：

```html
<input type="text" v-model="message">
<!-- 等同于 -->
<input type="text" v-bind:value="message" v-on:input="message = $event.target.value">
```



### 3.7.3、v-model:radio

使得单选框只能选一个

```html
<div id="app">
  <label><input name="sex" type="radio" value="男" v-model="sex">男</label>
  <label><input name="sex" type="radio" value="女" v-model="sex">女</label>

  <h2>选择的性别是:{{sex}}</h2>
</div>



<script src="../js/vue.js"></script>
<script>
  // 1.创建Vue的实例对象
  const app = Vue.createApp({
    data(){
      return {
        sex: ''
      }
    }
  }).mount('#app');
</script>
```

![](Vue3(一).assets/64.png)



![](Vue3(一).assets/65.png)



### 3.7.4、v-model：checkbox

复选框分为两种情况：单个勾选框和多个勾选框

> 单个勾选框

- `v-moduel` 即为布尔值
- 此时 input 的 value 并不影响`v-model`的值

```html
<body>
  <div id="app">
    <label><input  type="checkbox"  v-model="isAgree">同意会员协议</label>
    <h2>是否同意协议：{{isAgree ? '同意' : '不同意'}}</h2>
  </div>



  <script src="../js/vue.js"></script>
  <script>
     // 1.创建Vue的实例对象
     const app = Vue.createApp({
      data(){
        return {
          isAgree: ''
        }
      }
     }).mount('#app');
  </script>
</body>
```

![](Vue3(一).assets/66.png)



> 多个复选框

- 当是多个复选框时，因为可以选中多个，所以对应的 data 中属性是一个数组
- 当选中某一个时，就会将 input 的 value 添加到数组中

```html
<body>
  <div id="app">
    <input type="checkbox" value="篮球" v-model="hobbies">篮球
    <input type="checkbox" value="足球" v-model="hobbies">足球
    <input type="checkbox" value="乒乓球" v-model="hobbies">乒乓球
    <input type="checkbox" value="羽毛球" v-model="hobbies">羽毛球
    <h2>您的爱好是: {{hobbies}}</h2>
  </div>

  <script src="../js/vue.js"></script>
  <script>
     const app = Vue.createApp({
      data(){
        return {
          hobbies: [], // 多选框,
        }
      }
     }).mount('#app');
  </script>
</body>
```

![](Vue3(一).assets/67.png)



> 值绑定

有时候我们的的数据是从服务器获取的,然后用复选框展示在页面上

```html
<body>
  <div id="app">
    <label v-for="item in originHobbies" :for="item">
      <input type="checkbox" :value="item" :id="item" v-model="likes">{{item}}
    </label>
    <h2>您的爱好是: {{likes}}</h2>
  </div>



  <script src="../js/vue.js"></script>
  <script>
     // 1.创建Vue的实例对象
     const app = Vue.createApp({
      data(){
        return {
          originHobbies: ['篮球', '足球', '乒乓球', '羽毛球', '台球', '高尔夫球'],
          likes: []
        }
      }
     }).mount('#app');
  </script>
</body>
```

![](Vue3(一).assets/68.png)









### 3.7.5、v-model:select

和 checkbox 一样，select 也分单选和多选两种情况

> 单选：只能选中一个值

- `v-model` 绑定的是一个值
- **当我们选中 option 中的一个时，会将它对应的 vaule 赋值到 city 中**

```html
<body>
  <div id="app">
    <p>选择所在的城市:</p>
    <select name="city" v-model="city">
      <option value="上海">上海</option>
      <option value="北京">北京</option>
      <option value="天津">天津</option>
    </select>
    <p>选择的城市是:{{city}}</p>
  </div>



  <script src="../js/vue.js"></script>
  <script>
     // 1.创建Vue的实例对象
     const app = Vue.createApp({
      data(){
        return {
          city: ''
        }
      }
     }).mount('#app');
  </script>
</body>
```

![](Vue3(一).assets/69.png)



> 多选：可以选中多个值

- `v-model` 绑定的是一个数组
- **当选中多个值时，就会将选中的 option 对应的 value 添加到数组 mySelects中**



```html
<body>
  <div id="app">
    <p>选择所在的城市:</p>
    <select name="cities" v-model="cities" multiple>
      <option value="上海">上海</option>
      <option value="北京">北京</option>
      <option value="天津">天津</option>
    </select>
    <p>选择的城市是:{{cities}}</p>
  </div>



  <script src="../js/vue.js"></script>
  <script>
     // 1.创建Vue的实例对象
     const app = Vue.createApp({
      data(){
        return {
          cities: []
        }
      }
     }).mount('#app');
  </script>
</body>
```

![](Vue3(一).assets/70.png)



### 3.7.6、v-model修饰符

为了==方便对用户输入的内容进行处理==，vue 为 v-model 指令提供了 3 个修饰符

| 修饰符  | 作用                              | 示例                               |
| ------- | --------------------------------- | ---------------------------------- |
| .number | 自动将用户的输入值转化为数值类型  | `<input v-model.number = "age" />` |
| .trim   | 自动过滤用户输入的首尾空白字符    | `<input v-module.trim = "msg" />`  |
| .lazy   | 在 `change` 时而非 `input` 时更新 | `<input v-model.lazy = "msg" />`   |

#### 1、lazy修饰符

- 默认情况下， v-model 默认是在 input 事件中同步输入框的数据的。
- 也就是说，一旦有数据发生改变对应的 data 中的数据就会自动发生改变
- `lazy` 修饰符可以让数据在**失去焦点或者回车时**才会更新

```html
<body>
  <div id="app">
    <input type="text" v-model="msg">
    <h2>{{msg}}</h2>
  </div>



  <script src="../js/vue.js"></script>
  <script>
     // 1.创建Vue的实例对象
     const app = Vue.createApp({
      data(){
        return {
          msg: '你好Vue3！'
        }
      }
     }).mount('#app');
  </script>
</body>
```

![](Vue3(一).assets/71.png)



![](Vue3(一).assets/72.png)



我们添加 `.lazy` 修饰符

```html
<div id="app">
    <input type="text" v-model.lazy="msg">
    <h2>{{msg}}</h2>
</div>
```

![](Vue3(一).assets/73.png)



![](Vue3(一).assets/74.png)





#### 2、number修饰符

- **默认情况下，在输入框中无论我们输入的是字母还是数字，都会被当作字符串类型进行处理**
- 但是如果我们希望处理的是数字类型，那么最好直接将内容当做数字处理
- `number` 修饰符可以让在输入框中输入的内容自动转换成数字类型

```html
<body>
  <div id="app">
    <input type="text" v-model="age">
    <h2>{{age}}=={{typeof age}}</h2>
  </div>



  <script src="../js/vue.js"></script>
  <script>
     // 1.创建Vue的实例对象
     const app = Vue.createApp({
      data(){
        return {
          age: 0
        }
      }
     }).mount('#app');
  </script>
</body>
```

![](Vue3(一).assets/75.png)



我们添加 `.number` 修饰符

```html
<div id="app">
    <input type="text" v-model.number="age">
    <h2>{{age}}=={{typeof age}}</h2>
</div>
```

![](Vue3(一).assets/76.png)


这里Vue3.0官方文档还有解释：如果输入类型是 `number`，Vue 能够自动将原始字符串转换为数字，无需为 `v-model` 添加 `.number` 修饰符。代码如下：

```html
<div id="app">
    <input type="number" v-model.number="age">
    <h2>{{age}}=={{typeof age}}</h2>
</div>
```



#### 3、trim修饰符

- 如果输入的内容**首尾**有很多空格，通常我们希望将其去除
- trim 修饰符可以过滤内容左右两边的空格

```html
<body>
  <div id="app">
    <!--3.修饰符: trim-->
    <input type="text" v-model="name">
    <h2>您输入的名字:{{name}}</h2>
  </div>



  <script src="../js/vue.js"></script>
  <script>
     // 1.创建Vue的实例对象
     const app = Vue.createApp({
      data(){
        return {
          name: ''
        }
      }
     }).mount('#app');
  </script>
</body>
```

![](Vue3(一).assets/77.png)



我们添加 `.trim` 修饰符

```html
 <div id="app">
    <!--3.修饰符: trim-->
    <input type="text" v-model.trim="name">
    <h2>您输入的名字:{{name}}</h2>
  </div>
```

![](Vue3(一).assets/78.png)





## 3.8、补充知识点



### 3.8.1、watch侦听器

- 侦听器是计算属性 computed 的底层实现
- computed 和 watch 都能实现的功能，建议使用 computed，因为更简洁
- 我们可以通过 **watch** 来响应数据的变化，**watch** 的作用是用于监测响应式属性的变化，并在属性发生改变时执行特定的操作

```javascript
<div id="app">
    <h1>普通价:{{price}}</h1>
	<h1>会员价:{{memberPrice}}</h1>
</div>

<script src="../js/vue.js"></script>
<script>
    // 1.创建Vue的实例对象
    const app = Vue.createApp({
        data(){
            return {
                price: 5,
            }
        },
        // 计算属性
        computed: {
            memberPrice(){
                return this.price * 0.8;
            }
        },
        // 侦听器
        watch: {
            // 侦听到 price 发生变化就会触发这个函数
            price(newValue,oldValue){
                // newValue 现在的值, oldValue 之前的值
                console.log(newValue,oldValue);
                console.log("price发生了变化");
            }
        }
    });

app.mount('#app');
```

> 计算属性和 wacth 的区别
>
> 1. 计算属性在调用时需要在模板中渲染
> 2. 计算属性适合做筛选，不可异步。watch 适合做异步或者开销较大的操作

上方是watch的简写形式，完整形式要把监视的属性写成一个对象，而不是函数，对象里面有很多的配置，其中最重要的是handler，它同样可以接受到新值和老值两个参数

```javascript
watch: {
    price:{
        immediate: true, // 立即监听
        deep: true, // 深度监听
        handler(newValue,oldValue){
            console.log(`count发生了变化，老值为${oldValue},新值为${newValue}`)
        }
    }
}
```









### 3.8.2、单向数据流

如下代码，意思是父组件将 total 传给子组件，但是子组件是不能修改这个 total 值的

- data 的数据是**自己**的  →   随便改
- prop 的数据是**外部**的  →   不能直接改，要遵循 **单向数据流**

父级props 的数据更新，会向下流动，影响子组件。这个数据流动是单向的

```html
<div id="app"></div>
  <script src="../js/vue.js"></script>
  <script>

    //创建子组件
    const box = {
      props: {
        total: Number,
      },
      template: `
        <div>传递的数据:{{total}}</div>
        <!--单向数据流,这个total是不允许被修改的-->
        <button @click="total++">修改</button>
      `
    }



     // 1.创建Vue的实例对象
     const app = Vue.createApp({
      data(){
        return {
          count: 100,
        }
      },
     //挂载子组件
     components: {
        box,
     },
     template: `
        <!-- 子组件里面有个 total,我们传进来和count绑定-->
        <box :total="count"></box>
     `
     });

     app.mount('#app');
  </script>
```

### 3.8.3、动态绑定传参



父组件给子组件传递参数时的**快捷写法**：

```html
<div id="app"></div>
<script src="../js/vue.js"></script>
<script>

  //创建子组件
  const box = {
    // 子组件接收数组
    props: ['num1','num2','num3','num4'],
    template: `
      <div>数据1:{{num1}}</div>
      <div>数据2:{{num2}}</div>
      <div>数据3:{{num3}}</div>
      <div>数据4:{{num4}}</div>
      `
  }



  // 1.创建Vue的实例对象
  const app = Vue.createApp({
    data(){
      return {
        a: 100,
        b: 200,
        c: 300,
        d: 400,
        numObj: {
          num1: 100,
          num2: 200,
          num3: 300,
          num4: 400,
        }
      }
    },
    //挂载子组件
    components: {
      box,
    },
    template: `
        <!--常规父组件传给子组件的写法-->
        <box :num1="a" :num2="b" :num3="c" :num4="d"></box>
        <!-- 快捷写法我们可以这么写  -->
        <box v-bind="numObj"></box>
        <!-- 快捷写法也可以这么写  -->
        <box :num1="numObj.num1" :num2="numObj.num2" :num3="numObj.num3" :num4="numObj.num4"></box>

    `
  });

  app.mount('#app');
</script>
```





### 3.8.4、scoped解决样式冲突

通常写在组件中的样式会 **全局生效** →  因此很容易造成多个组件之间的样式冲突问题。

1. **全局样式**: 默认组件中的样式会作用到全局，任何一个组件中都会受到此样式的影响


2. **局部样式**: 可以给组件加上**scoped** 属性,可以**让样式只作用于当前组件**

scoped 是 style 标签的一个属性，当在 style 标签中定义了 scoped 时，style 标签中的所有属性就只作用于当前组件的样式，实现组件样式私有化，从而也就不会造成样式全局污染



```css
<style scoped></style>
```

> 推荐加 `scoped` 进行局部样式

































































