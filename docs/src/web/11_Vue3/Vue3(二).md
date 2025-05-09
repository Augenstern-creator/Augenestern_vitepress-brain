# Vue3

# 1、组件基础

## 1.1、全局组件

1. 注册一个全局组件语法格式如下：

```javascript
const app = Vue.createApp({...})


                           
// component-a 为组件名                         
app.component('component-a', {
  // 配置项
})

// component-b 为组件名                         
app.component('component-b', {
  // 配置项
})
```

2. 注册后，我们可以使用以下方式来调用组件：

```html
<div id="app">
  <component-a></component-a>
  <component-b></component-b>
</div>
```

示例：

```html
<div id="app">
    <component-a></component-a>
</div>
 
<script>
// 创建一个Vue 应用
const app = Vue.createApp({})
 
// 定义一个名为 component-a 的新全局组件
app.component('component-a', {
    template: '<h1>自定义组件!</h1>'
})
 
app.mount('#app')
</script>
```



## 1.2、局部组件

1. 局部注册语法如下：

```javascript
// 局部注册组件ComponentA
const ComponentA = {
  /* ... */
}

// 局部注册组件ComponentB
const ComponentB = {
  /* ... */
}
```

2. 在 `components` 选项中定义你想要使用的组件：

```javascript
const app = Vue.createApp({
  components: {
    'ComponentA': ComponentA,
    'ComponentA': ComponentB
  }
})
```

3. 在 app 实例中使用

```html
<div id="app">
    <ComponentA></ComponentA>
    <ComponentB></ComponentB>
</div>
```

示例：

```html
<div id="app">
    <runoob-a></runoob-a>
</div>
<script>
var runoobA = {
  template: '<h1>自定义组件!</h1>'
}
 
const app = Vue.createApp({
  components: {
    'runoob-a': runoobA
  }
})
 
app.mount('#app')
</script>
```

> - 全局组件：在整个Vue实例中都可以被调用
> - 局部组件：只能在当前组件中被使用

## 1.3、组件的命名

组件命名分为两种，短横线式和大驼峰式：

1. 短横线式

```html
<div id="app">
    <!-- 调用时也是短横线式 -->
    <my-component-name></my-component-name>
</div>
<script>

// 局部定义组件my-component-name
const my-component-name = {
  template: '<h1>自定义组件!</h1>'
}
 
const app = Vue.createApp({
  components: {
    // 注册组件
    'my-component-name': my-component-name
  }
})
 
app.mount('#app')
</script>
```

2. 大驼峰式

```html
<div id="app">
    <!-- 调用时也是大驼峰式 -->
    <MyComponentName></MyComponentName>
</div>
<script>

// 局部定义组件runoobA
const MyComponentName = {
  template: '<h1>自定义组件!</h1>'
}
 
const app = Vue.createApp({
  components: {
    // 注册组件
    'MyComponentName': MyComponentName
  }
})
 
app.mount('#app')
</script>
```

> 注意：
>
> - 我们直接在DOM(即非字符串的模板)中使用时只有短横线法是有效的。在后面CLI调用两种方法都可以



## 1.4、组件的数据存放

- 问题：组件可以访问Vue实例数据吗？
  - 结论：**组件不能直接访问Vue实例中的 data**，因为组件也有属于自己的数据 data

- 组件对象也有 data 、 methods 

```javascript
// 注册一个局部组件
const Counter = {
  data() {
    return {
      count: 0
    }
  },
  template: `
    <button @click="count++">你点击了{{count}}次</button>
   `,
  methods: {}
}
```



## 1.5、组件标签化

`template` 模块写法不够清晰，如果我们能将其中的HTML分离出来写，然后挂载到对应的组件上，必然结构会变得非常清晰。

```html
<div id="app">
  <Counter></Counter>
</div>

<!-- 局部组件模板 -->
<template id="mycount">
  <button @click="count++">你点击了{{count}}次</button>
</template>

<script src="../js/vue.js"></script>
<script>

  // 定义一个局部组件
  const Counter = {
    data() {
      return {
        count: 0
      }
    },
    template: '#mycount'
  }


  // 创建Vue的实例对象
  const app = Vue.createApp({
    data(){
      return {
        msg: '你好,Vue3！'
      }
    },
    // 组件选项
    components: {
      // 注册局部组件
      'Counter': Counter,
    }
  });


  // 挂载vue实例
  app.mount('#app');
</script>
```







# 2、父组件向子组件传递数据



## 2.1、props

组件中，使用选项 `props` 来声明需要从**父级**接收到的数据

```html
<div id="app">
  <!-- 父级传递数据为Google-->  
  <site-name title="Google"></site-name>
</div>
 
<script>
    
const app = Vue.createApp({})

// 全局注册组件 
app.component('site-name', {
  // 使用 props 接收从父级传来的数据
  props: ['title'],
  template: `<h4>{{ title }}</h4>`
})
 
app.mount('#app')
</script>
```

## 2.2、动态props

可以用 v-bind 动态绑定 props 的值到父组件的数据中。每当父组件的数据变化时，该变化也会传导给子组件：

```html
<div id="app">
    <!--动态绑定props接收的值-->
    <site-name :title="title" :message="message"></site-name>
</div>

<script>
    // 创建Vue的实例对象
    const app = Vue.createApp({
        data(){
            return {
                title: 'Google',
                message: ['西','贝','秦']
            }
        }
    });

    // 全局注册组件
    app.component('site-name', {
        // 使用 props 接收从父级传来的数据
        props: ['title','message'],
        template: `
         <h4>{{ title }}</h4>
         <ul>
            <li v-for="(index,item) in message" :key="item">{{index}} -- {{item}}</li>
    	</ul>
       `
    })

    app.mount('#app');
</script>
```





## 2.3、props传数组

`props` 的值有两种方式：

- 方式一：**字符串数组**，数组中的字符串就是传递时的名称
- 方式二：**对象**，对象可以设置传递时的类型，也可以设置默认值等

方式一传递字符串数组代码如下：

```html
<div id="app">
    <!--动态绑定props接收的值-->
    <site-name :title="title" :message="message"></site-name>
</div>

<script>
    // 创建Vue的实例对象
    const app = Vue.createApp({
        data(){
            return {
                title: 'Google',
                message: ['西','贝','秦']
            }
        }
    });

    // 全局注册组件
    app.component('site-name', {
        // 使用 props 接收从父级传来的数据
        props: ['title','message'],
        template: `
         <h4>{{ title }}</h4>
         <ul>
            <li v-for="(index,item) in message" :key="item">{{index}} -- {{item}}</li>
    	</ul>
       `
    })

    app.mount('#app');
</script>
```



## 2.4、props传对象

- 在前面，我们的 `props` 选项是使用一个数组

- 除了数组之外，我们也可以使用对象，当需要对`props` 进行类型等验证时，就需要对象写法了

- 语法如下：

```javascript
Vue.component('my-component', {
  props: {
    // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
    propA: Number,
    // 多个可能的类型
    propB: [String, Number],
    // 必填的字符串
    propC: {
      type: String,
      required: true
    },
    // 带有默认值的数字
    propD: {
      type: Number,
      default: 100
    },
    // 带有默认值的对象
    propE: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    }
  }
})

```

示例如下：

```html
<div id="app">
    <!--动态绑定props接收的值-->
    <site-name :title="title" :message="message"></site-name>
</div>

<script>
    // 创建Vue的实例对象
    const app = Vue.createApp({
        data(){
            return {
                title: 'Google',
                message: ['西','贝','秦']
            }
        }
    });

    // 全局注册组件
    app.component('site-name', {
        // 使用 props 接收从父级传来的数据
       props: {
         // 类型限制
         title: String, //限制父组件传的是字符串类型
         message: Array,// 限制父组件传的是数组类型
       },
        template: `
         <h4>{{ title }}</h4>
         <ul>
            <li v-for="(index,item) in message" :key="item">{{index}} -- {{item}}</li>
    	</ul>
       `
    })

    app.mount('#app');
</script>
```

### 2.4.1、默认值和必传值

- `type` : 限制的类型
- `default` : 如果没有传值,给一个默认值
  - **注意**:类型是对象或者数组Array时, 默认值必须是一个函数
- `required` : 必须的,即意味着这个值是必须要传递的,不传就报错

示例：

```html
<div id="app">
    <!--动态绑定props接收的值-->
    <site-name :title="title" :message="message"></site-name>
</div>

<script>
    // 创建Vue的实例对象
    const app = Vue.createApp({
        data(){
            return {
                title: 'Google',
                message: ['西','贝','秦']
            }
        }
    });

    // 全局注册组件
    app.component('site-name', {
        // 使用 props 接收从父级传来的数据
       props: {
         // 类型限制
         title: {
           type: String,         // 类型限制为 String
           default: '默认Title',  // 如果没有传值,则给一个默认值
           required: true        // required 必须的,即意味着这个值是必须要传递的,不传就报错
         }, 
         // 类型是对象或者数组时, 默认值必须是一个函数
         message: {
           type: Array,           // 类型限制为 Array
           default() {
             return [];
           },
         },
        template: `
         <h4>{{ title }}</h4>
         <ul>
            <li v-for="(index,item) in message" :key="item">{{index}} -- {{item}}</li>
    	</ul>
       `
    })

    app.mount('#app');
</script>
```



# 3、子组件向父组件传递数据

- `props` 用于**父组件向子组件传递数据**，还有一种比较常见的是**子组件传递数据或事件到父组件**去。
- 这个时候，我们需要使用**自定义事件**来完成

自定义事件的流程：

- 在子组件中，通过`$emit()` 来发射事件
- 在父组件中，通过`v-on` 来监听子组件事件

示例：**我们使用子组件发射事件来触发父组件的 appClick 函数，并传递参数秦晓**

```html
<div id="app">
    <!--父组件使用 v-on 来监听自定义事件,发现自定义事件调用了 appClick 函数-->
    <Box @box-click="appClick"></Box>
</div>

<script>
    // 注册局部组件
    const Box = {
        methods: {
            btnClick(){
                // btnClick函数发射事件:第一个参数是自定义事件的名称,第二个参数是自定义事件的参数
                this.$emit('boxClick','秦晓');
            }
        },
        template: `
        <!-- 点击子组件按钮触发 btnClick 函数 -->
        <button @click="btnClick">点击</button>
      `
    }

    // 创建Vue的实例对象
    const app = Vue.createApp({
        data(){
            return {
                message: '',
            }
        },
        components: {
            Box,
        },
        methods: {
            // 接收自定义事件传的参数
            appClick(item) {
                console.log('父组件函数被触发');
                console.log(item);
            }
        }
    });
    app.mount('#app');
</script>
```

![](Vue3(二).assets/1.png)





# 4、父子组件互相访问

有时候我们需要**父组件直接访问子组件**，**子组件直接访问父组件**，或者是子组件访问根组件

- 父组件访问子组件：使用 `$children(Vue3.x已经废弃)` 或 `$refs`
- 子组件访问父组件：使用`$parent` （一般不用）

## 4.1、父组件访问子组件 - $refs

- `$refs` 和 `ref` 指令通常是一起使用的，可以用于获取 dom 元素或组件实例

> 查找范围 →  当前组件内(更精确稳定)

1. 首先，我们通过 `ref` 给某一个子组件绑定一个特定的 `ID`

```html
<div ref="chartRef">我是渲染图表的容器</div>
```

2. 其次，通过 `this.$refs.ID` 就可以访问到该组件了
   - 使用 `this.$refs.ID.xx` 就可以拿到该组件里面的属性数据了

```javascript
mounted () {
  console.log(this.$refs.chartRef)
}
```

示例：

> 我们给子组件使用 `ref="box1"` 绑定ID，在父组件里面使用 `this.$refs.box1` 就可以拿到该组件，接着使用`this.$refs.box1.msg` 拿到该组件的 `msg` 属性数据

```html
<div id="app">
    <!-- 给子组件绑定 box1 的ID -->
    <Box ref="box1"></Box>
    <button @click="getChildComponent">访问子组件</button>
</div>

<script>


    // 注册局部组件
    const Box = {
        data(){
            return {
                msg: '春风十里'
            }
        },
        methods: {
            btnClick(){
                alert('点击了按钮')
            }
        },
        template: `
        <button @click="btnClick">点我</button>
      `
    }

    // 创建Vue的实例对象
    const app = Vue.createApp({
        data(){
            return {
                message: '秦晓',
            }
        },
        components: {
            Box,
        },
        methods: {
            // 父组件可访问子组件
            getChildComponent(){
                // this.$refs.box1 相当于拿到了子组件
                // this.$refs.box1.msg 就是拿到了子组件里面的 msg 数据
                // this.$refs.box1.btnClick 就是拿到了子组件里面的 btnClick 方法
                console.log(this.$refs.box1.msg);
            }
        }
    });

    app.mount('#app');
</script>
```









# 5、插槽

## 5.1、普通插槽

1. 在**子组件**中，使用特殊的元素 `<slot></slot> `就可以为子组件开启一个插槽

```javascript
<!--子组件模板-->
<template id="box">
    <slot>默认内容</slot>
</template>
```

2. **父组件**可以在这个标签中填充任何模板代码，如 HTML、组件等

```html
<!--父组件-->
<div id="app">
  <Box>
    <!-- 填充一个button -->
    <button>按钮</button>
  </Box>
</div>


<!-- Box 组件模板 -->
<div>
	
</div>
```

3. 填充的内容会替换子组件的 `<slot></slot>` 标签





## 5.2、具名插槽

当子组件的功能复杂时，子组件的插槽可能并非是一个。

- 比如我们封装一个导航栏的子组件，可能就需要三个插槽，分别代表左边、中间、右边。
- 那么，外面在给插槽插入内容时，如何区分插入的是哪一个呢？这个时候，我们就需要**给插槽起一个名字**

如何给插槽起名字呢？

1. 给插槽起一个名字，**只要给 slot 元素一个 name 属性即可**

```html
<slot name="header">头部的内容</slot>
```

2. 在调用插槽时候使用 `template` 标签,并且增加 `v-slot:name` 属性即可

```html
<template v-slot:header>
    <!-- 给 name 为 header 的插槽插入button -->
    <button>我是头部</button>
</template>
```

示例：

1. 在**子组件**中放置三个具名插槽

```html
<!--子组件模板-->
<template id="box">
  <div>
    <header>
      <!--放头部的内容-->
      <slot name="header">头部的内容</slot>
    </header>
    <main>
      <!--放主要的内容-->
      <slot name="main">主要的内容</slot>
    </main>
    <footer>
      <!--放尾部的内容-->
      <slot name="footer">尾部的内容</slot>
    </footer>
  </div>
</template>
```

2. 在**父组件**中填充插槽

```html
<!--父组件-->
<div id="app">
  <Box>
    <template v-slot:header>
      <!-- 给 name 为 header 的插槽插入button -->
      <button>我是头部</button>
    </template>
      
    <template v-slot:main>
      <!-- 给 name 为 main 的插槽插入input -->
      <input type="text" placeholder="我是主要内容" />
    </template>
      
    <template v-slot:footer>
      <!-- 给 name 为 footer 的插槽不插入内容,则默认显示插槽本身的内容 -->
    </template>
  </Box>
</div>
```







## 5.3、渲染作用域

假设：`isShow` 属性包含在**组件**中，也包含在 Vue **实例**中。

```html
<!--父组件-->
<div id="app">
    <!--调用子组件-->
    <Box v-show="isShow"></Box>
</div>
```

> 提问：既然子组件和父组件(Vue实例)都有 `isShow` 属性，那么使用哪个呢？
>
> - 回答：**父组件模板的所有东西都会在父级作用域内编译；子组件模板的所有东西都会在级作用域内编译**
> - 我们在使用 `<Box v-show="isShow"></Box>` 的时候，整个组件的使用过程相当于在**父组件**中出现的
> - 那么它的作用域就是父组件，使用的属性也是属于父组件的属性
> - 因此 ,`isShow` 使用的**是 Vue 实例中的属性，而不是子组件的属性**





## 5.4、作用域插槽

- **我们的子组件都在父组件里面调用，这样子组件就会在父级作用域内编译**
- **如果我们想让子组件在父级作用域内编译，但是又能拿到子组件作用域的值，就需要使用作用域插槽**

> 一句话总结：==父组件替换插槽的标签，但是内容由子组件来提供==

作用域插槽语法如下：

1. 在子组件插槽中使用 `:data` 动态绑定数据

```html
<!--子组件-->
<template id="box">
    <!-- 使用 :data="nameArr" ,动态绑定子组件的 nameArr -->
    <slot :data="nameArr"></slot>
</template>
```

2. 在父组件调用子组件插槽标签中使用`template`标签，并附带属性 `v-slot:default="slotProps"` 接收数据，`slotProps.data` 就是我们的``nameArr`数据

```html
<!--父组件-->
<div id="app">
  <Box>
    <template v-slot:default="slotProps"></template>
  </Box>
</div>
```

示例：

```html
<!--父组件-->
<div id="app">
    <Box>
        <template v-slot:default="slotProps">
            <span>{{slotProps.data.join('---')}}</span>
        </template>
    </Box>
</div>

<!--子组件-->
<template id="box">
    <!-- 使用 :data="nameArr" ,动态绑定子组件的 nameArr -->
    <slot :data="nameArr">
        <ul>
            <li v-for="name in nameArr">{{name}}</li>
        </ul>
    </slot>
</template>
```

上述我们使用子组件，虽然在父级作用域内编译，但是通过动态数据绑定拿到了子级作用域的值，这样就实现了子组件在父级作用域内编译，但是拿到了子级作用域的值





# 6、动态组件和异步组件

## 6.1、动态组件

动态组件，就是实现动态切换的组件：它的用途是可以**动态绑定**我们的组件,根据数据不同更换不同的组件。

- `＜component>` 用来动态地挂载不同的组件 使用 `is` 属性来选择要挂载的组件

```html
<!-- 组件会在 `currentTabComponent` 改变时改变 -->
<component v-bind:is="currentTabComponent"></component>
```

`currentTabComponent` 可以包括：

- **已注册组件的名字**

示例：

1. `is` 属性绑定已注册组件的名字

```html
<div id="app">
  <button @click="changeView('A')">切换到组件A</button>
  <button @click="changeView('B')">切换到组件B</button>
  <button @click="changeView('C')">切换到组件C</button>
  <component :is="currentView"></component>
</div>

<script>
  let vm = new createApp({
    
    data: {
      currentView: 'comA'
    },
    components: {
      comA: {
        template: '<div>组件A</div>'
      },
      comB: {
        template: '<div>组件B</div>'
      },
      comC: {
        template: '<div>组件C</div>'
      }
    },
    methods: {
      changeView(component) {
        this.currentView = 'com' + component;
      }
    }
  });
</script>

```

![](Vue3(二).assets/1.gif)





### 6.1.1、在动态组件上使用 keep-alive

我们上方在一个多标签的界面中使用 `is` 属性来切换不同的组件，当在这些组件之间切换的时候，我们有时会想保持这些组件的状态，**以避免反复重渲染导致的性能问题。**

> 失活问题：动态组件有一个问题就是不会缓存，也称为失活，假使现在有这样一个情况：我们有一个切换按钮可以在输入框和按钮之间切换，**当我们给输入框输入数据，然后切换为按钮，再切换为输入框，发现我们之前输入的数据被清空了**

![](Vue3(二).assets/2.png)



解决方法是给 `component` 标签外加一个 `keep-alive`：

```html
<keep-alive>
	<component :is="currentTabComponent"></component>
</keep-alive>
```



## 6.2、异步组件

当我们的项目达到一定的规模时，对于某些组件来说，**我们并不希望一开始全部加载，而是需要的时候进行加载**；这样的做得目的可以很好的提高用户体验。

- Vue3中为我们提供了一个方法，即`defineAsyncComponent`，这个方法可以传递两种类型的参数，分别是函数类型和对象类型

语法如下：

```javascript
// 注册一个全局异步组件
Vue.component('async-example', function (resolve, reject) {
    setTimeout(function () {
        // 向 `resolve` 回调传递组件定义
        resolve({
            template: '<div>I am async!</div>'
        })
    }, 1000)
})
```

上面的例子，采用 `setTimeout` 模拟异步获取组件，真实情况，甚至可以通过ajax请求组件编译之后的`template`，然后调用 `resolve` 方法；如果加载失败，可以调用 `reject` 方法

大部分情况下，我们的组件都是单独分割成一个 `.vue` 文件，那么我们可以这么做：

```javascript
Vue.component('async-webpack-example', function (resolve) {
    require(['./my-async-component'], resolve)
})
```

示例：

```javascript
// 定义异步组件
const AsyncComponent = defineAsyncComponent(() => import('./AsyncComponent.vue'));

// 创建Vue应用程序
const app = createApp({
  // 在模板中使用异步组件
  template: `
    <div>
      <h1>异步组件示例</h1>
      <Suspense>
        <AsyncComponent />
      </Suspense>
    </div>
  `
});

// 挂载应用程序
app.mount('#app');
```

- 在上述案例中，首先使用`defineAsyncComponent`函数定义了一个异步组件`AsyncComponent`，它通过动态导入`./AsyncComponent.vue`模块来异步加载组件
- 然后，在Vue应用程序中的模板中使用了异步组件。使用`Suspense`组件包裹异步组件，它负责在异步组件加载期间显示一个加载状态。一旦异步组件加载完成，它将被渲染并替换`Suspense`组件。
- 这样，当应用程序运行时，异步组件会在需要的时候进行延迟加载。这种方式可以提高应用程序的性能，特别是当异步组件较大或在初始加载时不需要时。







# 7、组件的生命周期

[Vue 3 生命周期完整指南 - 掘金 (juejin.cn)](https://juejin.cn/post/6945606524987244558#heading-1)



## 7.1、在选项式API中使用Vue生命周期钩子

使用 选项API，生命周期钩子是被暴露 Vue实例上的选项。我们不需要导入任何东西，只需要调用这个方法并为这个生命周期钩子编写代码。

- 例如，假设我们想访问`mounted()`和`updated()`生命周期钩子，可以这么写

```javascript
// 选项 API
<script>     
   export default {         
      mounted() {             
         console.log('mounted!')         
      },         
      updated() {             
         console.log('updated!')         
      }     
   }
</script> 
```



## 7.2、在组合式API中使用Vue3生命周期钩子

在组合API中，我们需要将生命周期钩子导入到项目中，才能使用，这有助于保持项目的轻量性。

```javascript
// 组合 API
import { onMounted } from 'vue'
```

除了`beforecate`和`created`(它们被`setup`方法本身所取代)，我们可以在`setup`方法中访问的API生命周期钩子有9个选项：

- `onBeforeMount` – 在挂载开始之前被调用
- `onMounted` – 组件挂载时调用
- `onBeforeUpdate` – 数据更新时调用，发生在虚拟 DOM 打补丁之前。这里适合在更新之前访问现有的 DOM，比如手动移除已添加的事件监听器
- `onUpdated` – 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子
- `onBeforeUnmount` – 在卸载组件实例之前调用。在这个阶段，实例仍然是完全正常的
- `onUnmounted` – 卸载组件实例后调用。调用此钩子时，组件实例的所有指令都被解除绑定，所有事件侦听器都被移除，所有子组件实例被卸载
- `onActivated` – 被 `keep-alive` 缓存的组件激活时调用
- `onDeactivated` – 被 `keep-alive` 缓存的组件停用时调用
- `onErrorCaptured` – 当捕获一个来自子孙组件的错误时被调用。此钩子会收到三个参数：错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。此钩子可以返回 `false` 以阻止该错误继续向上传播

示例：

```javascript
// 组合 API
<script>
import { onMounted } from 'vue'

export default {
   setup () {
     onMounted(() => {
       console.log('mounted in the composition api!')
     })
   }
}
</script>
```





## 7.3、将Vue2的生命周期钩子代码更新到Vue3

- `beforeCreate` -> 使用 `setup()`
- `created` -> 使用 `setup()`
- `beforeMount` -> `onBeforeMount`
- `mounted` -> `onMounted`
- `beforeUpdate` -> `onBeforeUpdate`
- `updated` -> `onUpdated`
- `beforeDestroy` -> `onBeforeUnmount`
- `destroyed` -> `onUnmounted`
- `errorCaptured` -> `onErrorCaptured`

| 选项式API                | 组合式API           |
| ------------------------ | ------------------- |
| **beforeCreate/created** | **setup**           |
| beforeMount              | onBeforeMount       |
| mounted                  | onMounted           |
| beforeUpdate             | onBeforeUpdate      |
| update                   | onUpdated           |
| **beforeUnmount**        | **onBeforeUnmount** |
| **unmounted**            | **onUnmounted**     |



## 7.4、深入了解每个生命周期钩子

### 7.4.1、beforeCreate() – 选项 API

由于**创建**的挂钩是用于初始化所有响应数据和事件的事物，因此`beforeCreate`无法访问组件的任何响应数据和事件。

```javascript
// 选项 API
export default {
   data() { 
     return { 
       val: 'hello'    
     }
   },
   beforeCreate() {     
     console.log('Value of val is: ' + this.val)   
   }
}
```

`val`的输出值是 `undefined`，因为尚未初始化数据，我们也不能在这调用组件方法。

### 7.4.2、created() – 选项式 API

如果我们要在组件创建时访问组件的数据和事件，可以把上面的 `beforeCreate` 用 `created`代替。

```javascript
// 选项API
export default {
   data() { 
     return { 
       val: 'hello'    
     }
   },
   created() {     
     console.log('Value of val is: ' + this.val)   
   }
}
```

其输出为`Value of val is: hello`，因为我们已经初始化了数据。



### 7.4.3、setup() - 组合式API

对于使用 组合API 的 Vue3 生命周期钩子，使用`setup()`方法替换`beforecate`和`created`。这意味着，在这些方法中放入的任何代码现在都只在`setup`方法中。

```javascript
// 组合API
import { ref } from 'vue'

export default {
   setup() {    
     const val = ref('hello') 
     console.log('Value of val is: ' + val.value)       
     return {         
       val
     }
   }
}
```

### 7.4.4、beforeMount() 和 onBeforeMount()

在组件DOM实际渲染安装之前调用。在这一步中，根元素还不存在。

- 在选项API中，可以使用`this.$els` 来访问。
- 在组合API中，为了做到这一点，必须在根元素上使用`ref`

```javascript
// 选项 API
export default {
   beforeMount() {
     console.log(this.$el)
   }
 }
```

组合式API中使用 `ref` ：

```javascript
// 组合 API
<template>
   <div ref='root'>
     Hello World
   </div>
</template> 

import { ref, onBeforeMount } from 'vue'

export default {
   setup() {
      const root = ref(null) 
      onBeforeMount(() => {   
         console.log(root.value) 
      }) 
      return { 
         root
      }
    },
    // 兼容选项式API
    beforeMount() {
      console.log(this.$el)
    }
 }

```

因为`app.$el`还没有创建，所以输出将是`undefined`。



### 7.4.5、mounted() 和onMounted()

在组件的第一次渲染后调用，该元素现在可用，允许直接DOM访问。

- 在 选项API中，我们可以使用`this.$el`来访问我们的DOM
- 在组合API中，我们需要使用`refs`来访问Vue生命周期钩子中的DOM

```javascript
import { ref, onMounted } from 'vue'
 

 export default {
   setup() {    /* 组合 API */
 
     const root = ref(null)
 
     onMounted(() => {
       console.log(root.value)
     })
 

     return {
       root
     }
   },
   mounted() { /* 选项 API */
     console.log(this.$el)
   }
 } 

```







### 7.4.6、beforeUpdate() 和onBeforeUpdate()

`beforeUpdate`对于跟踪对组件的编辑次数，甚至跟踪创建“撤消”功能的操作很有用



### 7.4.7、updated() 和onUpdated()

DOM更新后，`updated`的方法即会调用。

```html
<template>
    <div>
      <p>{{val}} | 编辑 {{ count }} 次</p>
      <button @click='val = Math.random(0, 100)'>点击改变</button>
    </div>
 </template> 
```

选项式API：

```javascript
 export default {
   data() {
      return {
        val: 0
      }
   },
   beforeUpdate() {
      console.log("beforeUpdate() val: " + this.val)
   },
   updated() {
      console.log("updated() val: " + this.val
   }
 } 
```

组合式API：

```javascript
import { ref, onBeforeUpdate, onUpdated } from 'vue'

export default {
    setup () {
        const count = ref(0)
        const val = ref(0)

        onBeforeUpdate(() => {
            count.value++;
            console.log("beforeUpdate");
        })

        onUpdated(() => {
            console.log("updated() val: " + val.value)
        })

        return {
            count, val
        }
    }
}
```

这些方法很有用，但是对于更多场景，我们需要使用的`watch`方法检测这些数据更改。 `watch` 之所以好用，是因为它给出了更改后的数据的旧值和新值。



### 7.4.8、beforeUnmount() 和 onBeforeUnmounted()



**在卸载组件实例之前调用。在这个阶段，实例仍然是完全正常的。**

在 选项 API中，删除事件侦听器的示例如下所示：

```javascript
// 选项 API
export default {
   mounted() {
     console.log('mount')
     window.addEventListener('resize', this.someMethod);
   },
   beforeUnmount() {
     console.log('unmount')
     window.removeEventListener('resize', this.someMethod);
   },
   methods: {
      someMethod() {
         // do smth
      }
   }
} 
```

```javascript
// 组合API
import { onMounted, onBeforeUnmount } from 'vue' 

 export default {
   setup () {
 
     const someMethod = () => {
       // do smth
     }
 
     onMounted(() => {
       console.log('mount')
       window.addEventListener('resize', someMethod);
     })
 
     onBeforeUnmount(() => {
       console.log('unmount')
       window.removeEventListener('resize', someMethod);
     })
 
   }
 }
```



### 7.4.9、unmounted() 和 onUnmounted()



卸载组件实例后调用。调用此钩子时，组件实例的所有指令都被解除绑定，所有事件侦听器都被移除，所有子组件实例被卸载。

```javascript
import { onUnmounted } from 'vue'

export default {
  setup () { /* 组合 API */

    onUnmounted(() => {
      console.log('unmounted')
    })

  },
  unmounted() { /* 选项 API */
    console.log('unmounted')
  }
}
```



### 7.4.10、activated() and onActivated()

- 被` keep-alive` 缓存的组件激活时调用。
- 例如，如果我们使用`keep-alive`组件来管理不同的选项卡视图，每次在选项卡之间切换时，当前选项卡将运行这个 `activated` 钩子。
- 假设我们使用keep-alive包装器进行以下动态组件

```html
<template>
   <div>
     <span @click='tabName = "Tab1"'>Tab 1 </span>
     <span @click='tabName = "Tab2"'>Tab 2</span>
     <keep-alive>
       <component :is='tabName' class='tab-area'/>
     </keep-alive>
   </div>
</template>

<script>
import Tab1 from './Tab1.vue'
import Tab2 from './Tab2.vue'

import { ref } from 'vue'

export default {
  components: {
    Tab1,
    Tab2
  },
  setup () { /* 组合 API */
    const tabName = ref('Tab1')

    return {
      tabName
    }
  }
}
</script>
```

在**Tab1.vue**组件内部，我们可以像这样访问`activated`钩子。

```html
<template>
 <div>
 <h2>Tab 1</h2>
 <input type='text' placeholder='this content will persist!'/>
 </div>
</template>

<script>
import { onActivated } from 'vue'

export default {
 setup() {
    onActivated(() => {
       console.log('Tab 1 Activated')
    })
 }
} 
</script>
```

### 7.4.11、deactivated() 和 onDeactivated()



- 被 `keep-alive` 缓存的组件停用时调用。
- 这个钩子在一些用例中很有用，比如当一个**特定视图失去焦点时保存用户数据和触发动画**。

```javascript
import { onActivated, onDeactivated } from 'vue'

export default {
  setup() {
    onActivated(() => {
       console.log('Tab 1 Activated')
    })

    onDeactivated(() => {
       console.log('Tab 1 Deactivated')
    })
  }
}
```

现在，当我们在选项卡之间切换时，每个动态组件的状态都将被缓存和保存。



















































