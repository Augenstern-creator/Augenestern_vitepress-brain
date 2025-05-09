# 1、VueX4



Vuex 是一个 Vue 的 **状态管理工具**，状态就是数据。

- 大白话：Vuex 是一个插件，可以帮我们管理 Vue 通用的数据 (多组件共享的数据)。例如：购物车数据 、个人信息数据
- **状态管理模式、集中式存储管理**这些名词听起来就非常高大上，让人捉摸不透。
- 其实，你可以简单的将其看成把**需要多个组件共享的变量全部存储在一个对象**里面。然后，将这个对象放在顶层的Vue实例中，让其他组件可以使用。多个组件就可以共享这个对象中的所有变量属性了。









## 1.1、使用场景

- 某个状态 在 很多个组件 来使用 (个人信息)
- 多个组件 共同维护 一份数据 (购物车)

## 1.2、优势

- 共同维护一份数据，**数据集中化管理**
- **响应式变化**
- 操作简洁 (vuex提供了一些辅助函数)



## 1.3、注意

官方原文：

- 不是所有的场景都适用于vuex，只有在必要的时候才使用vuex
- 使用了vuex之后，会附加更多的框架中的概念进来，增加了项目的复杂度  （数据的操作更便捷，数据的流动更清晰）



# 2、Vuex图解状态流向

![](Vue3(五).assets/1.png)

在Vuex里面也是单向数据流，数据 State 可以直接被 `Vue Components` 组件使用，但是组件要想修改数据 State 是不能直接修改的，必须先 `Dispatch` 派发一个行为 `Actions` ，行为 `Actions` 再 `Commit` 提交一个行为到 `Mutations` ,`Mutations` 再来修改这个 State。🔥-> 上面这句话请

> 数据 State 只有 `Mutations` 可以修改







# 3、vuex4的使用

## 3.1、Vuex获取共享状态

安装vuex与vue-router类似，vuex是一个独立存在的插件，如果脚手架初始化没有选 vuex，就需要额外安装：

```bash
npm install vuex@next --save
```

1. 在创建`src/store/index.js` 文件，我们放入一个共享状态`counter`

```javascript
// 1.引入vuex
import {createStore} from 'vuex'
// 2.创建一个store对象
const store = createStore({
  // 全局共享的状态(数据)存放
  state: {
    counter: 10
  }
    
})

// 3.导出
export default store
```

2. 在 `main.js` 中引入vuex并使用

```javascript
import { createApp } from 'vue'
import App from './App.vue'

// 引入vuex
import store from "./store/index.js";


const app = createApp(App)

// 2.使用vuex
app.use(store)


app.mount('#app')
```



3. 接下来在任何组件中都可以使用 `$store.state.counter` 这个数据，例如 `HelloWorld.vue` 中

```html
<template>
  <div>
    <h2>HelloWorld + {{$store.state.counter}}</h2>
  </div>
</template>

<script>
export default {
  name: "HelloWorld"
}
</script>

<style scoped>

</style>
```

`App.vue`中：

```html
<template>
  <div>
    <h2>App.vue + {{$store.state.counter}}</h2>
  </div>
</template>
```



## 3.2、Vuex修改共享状态

1. 在`src/store/index.js` 中，若要修改`state` 中的数据，必须要按照流程经过 `mutations -> actions`

```javascript
// 1.引入vuex
import {createStore} from 'vuex'
// 2.创建一个store对象
const store = createStore({
  // 全局共享的状态(数据)存放
  state: {
    counter: 10
  },
  // 同步提交状态: mutations 只能是同步的
  mutations: {
    // +1
    INCREMENT(state){
      state.counter++;
    },
    // -1
    DECREMENT(state){
      state.counter--;
    }
  },
    
  // 提交操作给mutations: 可以是同步的,也可以是异步的
  actions: {
    // +1
    increment({commit}){
      commit('INCREMENT')
    },
    // -1
    decrement({commit}){
      commit('DECREMENT')

    }
  },
  getters: {

  },

})

// 3.导出
export default store
```

2. 在`App.vue` 中使用
   - `const store = useStore()` ： 拿到 store 对象
   - `store.dispatch()` ：store 派发

```html
<template> 
  <div>
    <h2>App.vue + {{$store.state.counter}}</h2>
    <button @click="add()">+1</button>
    <button @click="sub()">-1</button>
  </div>
</template>


<script>

import {useStore} from "vuex"
  export default  {

    setup(){
      // 拿到store对象
      const store = useStore()


      // +1
      const add = ()=> {
        //store.state.counter++;
        // actions -> mutations -> state  
        store.dispatch('increment')
      }
      // -1
      const sub = ()=> {
        // 不能在界面上直接操作 state
        // store.state.counter--;
        // actions -> mutations -> state  
        store.dispatch('decrement')

      }

      return {
        add,
        sub
      }
    }
  }
</script>


<style scoped>

</style>

```

> **宗旨**：全局共享状态(数据) 存放在 `state` 中，要修改这个状态必须经过 `mutations -> actions`
>
> - 我们通过提交 mutation 的方式，而非直接改变 `store.state.count`
> - 这是因为 Vuex 可以更明确的追踪状态的变化，所以不要直接改变 `store.state.count` 的值

## 3.3、严格模式

开启严格模式，仅需在创建 store 的时候传入 `strict: true`

```javascript
const store = createStore({
  // ...
  strict: true
})
```

在严格模式下，无论何时发生了状态变更且不是由 `mutation` 函数引起的，将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到。

> 开发模式打开，生产模式关闭，我们可以让构建工具来处理这种情况：
>
> ```javascript
> const store = createStore({
>   // ...
>   // node_env node环境可以获取到开发还是生产环境
>   strict: process.env.NODE_ENV !== 'production'
> })
> ```



## 3.4、同步操作绕过`Actions`



如果是同步操作，那么可以直接在组件上到 `Mutations` ，可以绕过 `Actions`

![](Vue3(五).assets/2.png)

- 无论同步还是异步：`actions -> mutations -> state`
- 同步可绕过`actions` ：`mutations -> state`



```html
<template>
  <div>
    <h2>App.vue + {{$store.state.counter}}</h2>
    <button @click="add()">+1</button>
    <button @click="sub()">-1</button>
  </div>
</template>


<script>
import {useStore} from "vuex"
  export default  {
    setup(){
      // 拿到store对象
      const store = useStore()


      // +1
      const add = ()=> {
        // store.state.counter++;
        // actions -> mutations -> state
        // store.dispatch('increment')

        // mutations -> state
        store.commit('INCREMENT')
      }
      // -1
      const sub = ()=> {
        // 不能在界面上直接操作 state
        // store.state.counter--;
        // actions -> mutations -> state
        // store.dispatch('decrement')

        // mutations -> state
        store.commit('DECREMENT')
      }

      return {
        add,
        sub
      }
    }
  }
</script>


<style scoped>

</style>

```







## 3.5、`Actions` 进行异步操作

我们强调，不要在 `Mutation` 中进行异步操作，但是某些情况，我们确实希望在 Vuex 中进行一些异步操作，比如网络请求，必然是异步的 。

- `Actions`  是用来代替 `Mutation` 进行异步操作的

示例：

我们希望进行一个异步操作：两秒后让 `state.counter` 加 1999

1. 在`src/store/index.js` 中进行`actions -> mutations -> state`
   - 写代码实际是先写 mutations、再写 actions
   - 在 `actions` 中进行异步操作，延迟两秒

```javascript
// 1.引入
import {createStore} from 'vuex'
// 2.创建一个store对象
const store = createStore({
  // 全局共享的状态(数据)存放
  state: {
    counter: 10
  },
  // 同步提交状态: mutations 只能是同步的
  mutations: {
    // 2s后 + 1999
    INCREMENT_1999(state, num){
      state.counter += num;
    }
  },
  // 提交操作给mutations: 可以是同步的,也可以是异步的
  actions: {
    // 2s后 + 1999
    increment_1999({commit}, num){
      setTimeout(()=> {
        commit('INCREMENT_1999', num)
      },2000)
    }
  },
  getters: {

  },

})

// 3.导出
export default store
```

2. 在`App.vue` 中`dispathc` 派发

```html
<template>
  <div>
    <h2>App.vue + {{$store.state.counter}}</h2>
    <button @click="add1999(1999)">2s后 + 1999</button>
  </div>
</template>


<script>

import {useStore} from "vuex"
  export default  {
    setup(){
      // 拿到store对象
      const store = useStore()
      // 2s后 + 1999
      const add1999 = (num)=> {
        store.dispatch('increment_1999', num)
      }

      return {
        add1999
      }
    }
  }
</script>


<style scoped>

</style>

```



## 3.6、组合式API写Vuex4



```html
<template>
  <div>
    <h2>App.vue + {{counter}}</h2>
    <button @click="increment()">+1</button>
    <button @click="decrement()">-1</button>
    <button @click="increment_1999(1999)">2s后 + 1999</button>
  </div>
</template>


<script>

import {useStore} from "vuex"
// 引入计算属性
import {computed} from "vue";

export default  {

</script>


<style scoped>

</style>
```

每次都像这样一个个的提供计算属性, 太麻烦了,我们有没有简单的语法帮我们获取state中的值呢？

### 3.6.1、mapState

`mapState`是辅助函数，帮助我们把store中的数据映射到组件的计算属性中, 它属于一种方便的用法。

用法：

1. 导入mapState

```javascript
import { mapState } from 'vuex'
```

2. 采用数组形式引入state属性

```javascript
mapState(['count']) 

// 上面的代码就相当于
counter () {
    return this.$store.state.counter
}
```

3. 利用 **展开运算符** 将导出的状态映射给计算属性

```javascript
computed: {
...mapState(['counter'])
}
```

4. 使用 `state.counter`

```javascript
<div> state的数据:{{ count }}</div>
```













# 4、Vuex核心概念

## 2.1、State

如果你的状态信息(数据)是保存到多个Store对象中的，那么之后的管理和维护等等都会变得特别困难，所以Vuex使用了**State单一状态树**来管理应用层级的全部状态。

> 大白话：Vuex把所有的数据都放在了 `State` 里面



## 2.2、mutations

`mutations`是一个对象，对象中存放修改state的方法

```javascript
mutations: {
    // 方法里参数 第一个参数是当前store的state属性
    // payload 载荷 运输参数 调用mutaiions的时候 可以传递参数 传递载荷
    
    // +1
    INCREMENT(state){
      state.counter++;
    },
    // -1
    DECREMENT(state){
      state.counter--;
    },
    // 2s后 + 1999
    INCREMENT_1999(state, num){
      state.counter += num;
    }
  }
```

在`actions`提交

```javascript
actions: {
    // +1
    increment({commit}){
      commit('INCREMENT')
    },
    // -1
    decrement({commit}){
      commit('DECREMENT')

    },
    // 2s后 + 1999
    increment_1999({commit}, num){
      setTimeout(()=> {
        commit('INCREMENT_1999', num)
      },2000)
    }
  }
```

**小tips: 提交的参数只能是一个, 如果有多个参数要传, 可以传递一个对象**

> Vuex中mutations中要求不能写异步代码，如果有异步的ajax请求，应该放置在actions中

**说明：mutations必须是同步的**





### 2.2.1、mapMutations

mapMutations和mapState很像，它把位于mutations中的方法提取了出来，我们可以将它导入

```javascript
import  { mapMutations } from 'vuex'
methods: {
    ...mapMutations(['addCount'])
}



// 上面代码的含义是将mutations的方法导入了methods中，等价于
methods: {
  // commit(方法名, 载荷参数)
  addCount () {
      this.$store.commit('addCount')
  }
}
```







## 2.3、actions

> state是存放数据的，mutations是同步更新数据 (便于监测数据的变化, 更新视图等, 方便于调试工具查看变化)，actions则负责进行异步操作

```javascript
// 同步提交状态: mutations 只能是同步的
  mutations: {
    // +1
    INCREMENT(state){
      state.counter++;
    },
    // -1
    DECREMENT(state){
      state.counter--;
    },
    // 2s后 + 1999
    INCREMENT_1999(state, num){
      state.counter += num;
    }
  },
  // 提交操作给mutations: 可以是同步的,也可以是异步的
  actions: {
    // +1
    increment({commit}){
      commit('INCREMENT')
    },
    // -1
    decrement({commit}){
      commit('DECREMENT')

    },
    // 2s后 + 1999
    increment_1999({commit}, num){
      setTimeout(()=> {
        commit('INCREMENT_1999', num)
      },2000)
    }
  },
```

组件中通过`dispatch`调用

```javascript
<script>

import {useStore} from "vuex"
  export default  {
    setup(){
      // 拿到store对象
      const store = useStore()
      // 2s后 + 1999
      const add1999 = (num)=> {
        store.dispatch('increment_1999', num)
      }

      return {
        add1999
      }
    }
  }
</script>
```





### 2.3.1、mapActions

`mapActions` 是把位于 actions中的方法提取了出来，映射到组件methods中

```javascript
import { mapActions } from 'vuex'
methods: {
   ...mapActions(['changeCountAction'])
}

//mapActions映射的代码 本质上是以下代码的写法
methods: {
  changeCountAction (n) {
    this.$store.dispatch('changeCountAction', n)
  },
}
```

## 2.4、getters

除了state之外，有时我们还需要从state中**筛选出符合条件的一些数据**，这些数据是依赖state的，此时会用到getters

- 例如，state中定义了list，为1-10的数组

```javascript
state: {
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
},
getters: {
    // getters函数的第一个参数是 state
    // 必须要有返回值
    filterList:  state =>  state.list.filter(item => item > 5)
}
```

- 组件中使用

```html
<div>{{ $store.getters.filterList }}</div>
```



### 2.4.1、mapGetters

```javascript
computed: {
    ...mapGetters(['filterList'])
}
```

组件中使用

```html
<div>{{ filterList }}</div>
```





## 2.5、总结

### 2.5.1、state

作用：存数据

定义：

```javascript
state: {
    age: 20,
    username: 'Augenestern_QXL'   
}
```

组件中直接使用：

```html
<template>
  <div>      
	<p>{{$store.state.age}}</p>
  </div>
</template>
```

组件中借助于辅助方法使用：

```html
<template>
	<p>{{age}}</>
</template>
 
<script>  
import {computed} from "vue";    
import {mapState} from 'vuex'
computed: {
    ...mapState('age')
}
</script>
```



### 2.5.2、getters

作用：计算属性

定义：

```javascript
getters: {
   // 获取年龄大于20的学生对象
   more20stu(state){
       return state.students.filter(s => s.age >20)
   },
   // 获取年龄大于20的学生个数
   more20stuLength(state,getters) {
       return getters.more20stu.length
   },
   // 让用户自己决定获取年龄大于多少
   moreAgeStu(state) {
       return function(age){
           return state.students.filter(s => s.age > age)
       }
   }    
}
```

组件中直接使用：

```html
<template>
  <div>
      <h2>{{$store.getters.more20stu}}</h2>
      <h2>{{$store.getters.more20stuLength}}</h2>
      <h2>{{$store.getters.moreAgeStu(8)}}</h2>
  </div>
</template>
```

组件中借助于辅助方法使用：

```html
<template>
  <div>
      <h2>{{more20stu}}</h2>
      <h2>{{more20stuLength}}</h2>
      <h2>{{moreAgeStu(24)}}</h2>
  </div>
</template>

<script>    
import {computed} from "vue";    
import {mapGetters} from 'vuex'
computed: {
    ...mapGetters(['more20stu','more20stuLength','moreAgeStu'])
}
</script>
```



### 2.5.3、mutations

作用：更新state数据的唯一途径

定义：

```javascript
// 同步提交状态: mutations 只能是同步的
  mutations: {
    updateAge(state,val){
        state.age = val
    }
  },
```

在组件中直接使用：

```html
<template>
  <div>
    <button @click="$store.commit('updateAge',30)">30岁</button>
  </div>
</template>
```

组件中借助辅助方法使用：

```html
<template>
  <div>
      <button @click="updateAge(30)">30岁</button>
  </div>
</template>

<script>    
import {computed} from "vue";    
import {mapMutations} from 'vuex'
methods: {
    ...mapMutations(['updateAge'])
}
</script>
```



### 2.5.4、actions

作用：放异步方法

定义：

```javascript
actions: {
    abc(store,val){
        setTimeout(()=> {
            store.commit('updateAge',val)
        },2000)
    }
}
```

组件中直接使用：

```html
<template>
  <div>
    <button @click="$store.dispatch('abc',30)">延长两秒更新为30岁</button>
  </div>
</template>
```

组件中借助辅助方法使用：

```html
<template>
  <div>
    <button @click="('abc(30)">延长两秒更新为30岁</button>
  </div>
</template>


<script>       
import {mapActions} from 'vuex'
methods: {
    ...mapActions(['abc'])
}
</script>
```





## 2.6、module

如果把所有的状态都放在state中，当项目变得越来越大的时候，Vuex会变得越来越难以维护，由此，又有了Vuex的模块化

示例：

1. 定义两个模块   **user** 和  **setting**

   user中管理用户的信息状态  userInfo  `src/modules/user.js`

```javascript
const state = {
  userInfo: {
    name: 'zs',
    age: 18
  }
}

const mutations = {}

const actions = {}

const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
```

setting中管理项目应用的  主题色 theme，描述 desc， `modules/setting.js`

```javascript
const state = {
  theme: 'dark'
  desc: '描述真呀真不错'
}

const mutations = {}

const actions = {}

const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
```

在`store/index.js`文件中的modules配置项中，注册这两个模块



```javascript
import user from './modules/user'
import setting from './modules/setting'

const store = new Vuex.Store({
    modules:{
        user,
        setting
    }
})
```

使用模块中的数据,  可以直接通过模块名访问 `$store.state.模块名.xxx`  

- 示例：`$store.state.setting.desc`





# 5、子模块

## 5.1、使用模块中的数据

分模块后如何获取子模块的的数据呢？

1. 直接通过模块名访问 `$store.state.模块名.xxx`
2. 通过 mapState 映射：
   1. 默认根级别的映射  `mapState([ 'xxx' ])`
   2. 子模块的映射 ：`mapState('模块名', ['xxx'])` - 需要开启命名空间 **namespaced:true**      

示例：

- user子模块： `modules/user.js`

```javascript
const state = {
  userInfo: {
    name: 'zs',
    age: 18
  },
  myMsg: '我的数据'
}

const mutations = {
  updateMsg (state, msg) {
    state.myMsg = msg
  }
}

const actions = {}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
```

在其他组件使用这个子模块的配置：

1. 方法一：直接通过模块名访问 `$store.state.模块名.xxx`

```html
<template>
  <div>
      <p>{{$store.state.user.userInfo.name}}</p>
      <p>{{$store.state.user.userInfo.age}}</p>
      <p>{{$store.state.user.myMsg}}</p>
  </div>
</template>
```

2. 方法二：mapState辅助函数访问

```javascript
<script>       
import {mapState} from 'vuex'

...mapState('user', ['userInfo']),
...mapState('age', ['userInfo']),
...mapState('setting', ['theme', 'desc']),
</script>
```



## 5.2、获取模块内的getters数据

使用模块中 getters 中的数据：

1. 直接通过模块名访问` $store.getters['模块名/xxx ']`
2. 通过 mapGetters 映射      
   1. 默认根级别的映射  `mapGetters([ 'xxx' ]) `
   2. 子模块的映射  `mapGetters('模块名', ['xxx'])` -  需要开启命名空间

示例：

`modules/user.js`

```javascript
const state = {
  userInfo: {
    name: 'zs',
    age: 18
  },
  myMsg: '我的数据'
}

const mutations = {
  updateMsg (state, msg) {
    state.myMsg = msg
  }
}

const actions = {}

const getters = {
  // 分模块后，state指代子模块的state
  UpperCaseName (state) {
    return state.userInfo.name.toUpperCase()
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
```

其他组件访问 getters：

1. 方法一：直接通过模块名访问` $store.getters['模块名/xxx ']`

```html
<template>
  <div>
      <p>{{ $store.getters['user/UpperCaseName'] }}</p>
  </div>
</template>
```

2. 方法二：通过命名空间访问

```javascript
<script>       
import {computed} from "vue"; 
computed:{
  ...mapGetters('user', ['UpperCaseName'])
}
</script>
```

## 5.3、获取模块内的mutations方法

默认模块中的 mutation 和 actions 会被挂载到全局，**需要开启命名空间**，才会挂载到子模块。

调用方式：

1. 直接通过 store 调用   `$store.commit('模块名/xxx ',  额外参数)`
2. 通过 mapMutations 映射  
   1. 默认根级别的映射  `mapMutations([ 'xxx' ])`
   2. 子模块的映射 `mapMutations('模块名', ['xxx'])`  -  **需要开启命名空间**    

示例：

- `modules/user.js`

```javascript
const state = {
  userInfo: {
    name: 'zs',
    age: 18
  },
  myMsg: '我的数据'
}

const mutations = {
  setUser (state, newUserInfo) {
    state.userInfo = newUserInfo
  }
}

const actions = {}

const getters = {
  // 分模块后，state指代子模块的state
  UpperCaseName (state) {
    return state.userInfo.name.toUpperCase()
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
```

- `modules/setting.js`

```javascript
const mutations = {
  setTheme (state, newTheme) {
    state.theme = newTheme
  }
}
```

其他组件访问：

```html
<template>
  <div>
     <button @click="updateUser">更新个人信息</button> 
	 <button @click="updateTheme">更新主题色</button>
  </div>
</template>


<script>
export default {
  methods: {
    updateUser () {
      // $store.commit('模块名/mutation名', 额外传参)
      this.$store.commit('user/setUser', {
        name: 'xiaowang',
        age: 25
      })
    }, 
    updateTheme () {
      this.$store.commit('setting/setTheme', 'pink')
    }
  }
}
</script>
```

辅助函数访问：

```html
<template>
  <div>
     <button @click="updateUser">更新个人信息</button> 
	 <button @click="updateTheme">更新主题色</button>
  </div>
</template>


<script>
export default {
  methods:{
    // 分模块的映射
    ...mapMutations('setting', ['setTheme']),
    ...mapMutations('user', ['setUser']),
  }
}
</script>
```





## 5.4、获取模块内的actions方法

1. 直接通过 store 调用   `$store.dispatch('模块名/xxx ',  额外参数)`

2. 通过 mapActions 映射
   1. 默认根级别的映射  `mapActions([ 'xxx' ])`
   2. 子模块的映射 `mapActions('模块名', ['xxx'])`  -  需要开启命名空间   

示例：

- `modules/user.js`

```javascript
const actions = {
  setUserSecond (context, newUserInfo) {
    // 将异步在action中进行封装
    setTimeout(() => {
      // 调用mutation   context上下文，默认提交的就是自己模块的action和mutation
      context.commit('setUser', newUserInfo)
    }, 1000)
  }
}
```

其他组件调用：

```html
<template>
  <div>
     <button @click="updateUser2">一秒后更新信息</button>
  </div>
</template>


<script>
export default {
 methods:{
    updateUser2 () {
      // 调用action dispatch
      this.$store.dispatch('user/setUserSecond', {
        name: 'xiaohong',
        age: 28
      })
    },
 }
}
</script>
```

辅助方法调用：

```html
<template>
  <div>
     <button @click="setUserSecond({ name: 'xiaoli', age: 80 })">一秒后更新信息</button>
  </div>
</template>


<script>
export default {
 
    methods:{
      ...mapActions('user', ['setUserSecond'])
    }
}
</script>
```













## 5.5、小结

1. 直接调用
   - state --> $store.state.**模块名**.数据项名
   - getters --> $store.getters['**模块名**/属性名']
   - mutations --> $store.commit('**模块名**/方法名', 其他参数)
   - actions --> $store.dispatch('**模块名**/方法名', 其他参数)

2. 借助辅助方法使用

```javascript
import { mapXxxx, mapXxx } from 'vuex'

computed、methods: {

     // ...mapState、...mapGetters放computed中
     //  ...mapMutations、...mapActions放methods中
     ...mapXxxx('模块名', ['数据项|方法']),
     ...mapXxxx('模块名', { 新的名字: 原来的名字 }),

}
```















































