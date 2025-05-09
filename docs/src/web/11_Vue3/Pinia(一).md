# 1、Vue3状态管理-Pinia

## 1.1、什么是Pinia

Pinia 是 Vue 的专属的最新状态管理库 ，是 Vuex 状态管理工具的**替代品**

![](pinia(一).assets/1.png)

- 官方文档：[安装 | Pinia 中文文档 (web3doc.top)](https://pinia.web3doc.top/getting-started.html#安装)





## 1.2、安装

1. 使用命令行构建项目引入 Pinia 即可

```bash
npm init vue@latest
```

![](pinia(一).assets/3.png)







## 1.3、Pinia基础使用

1. 在`stores/counter.js`初始化如下代码：

```javascript
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// defineStore('counter') 定义了一个模块 counter
export const useCounterStore = defineStore('counter', () => {
  // 定义数据(state) 相当于Vuex中的 state: {count: 0}
  const count = ref(0)

  // 计算属性
  const doubleCount = computed(() => count.value * 2)

  // 定义修改数据的方法(action)
  const increment = () => {
    count.value++
  }

  return {
    count,
    doubleCount,
    increment
  }
})
```

2. 在其他组件中使用

```html
<template>
  <div>
    <h1>count的值为:{{counterStore.count}}</h1>
    <h1>2*count:{{counterStore.doubleCount}}</h1>
    <button @click="counterStore.increment">+1</button>
  </div>
</template>

<script setup>
// 1.导入
import {useCounterStore} from './store/counter.js'
// 2.执行方法得到 store 实例对象
const counterStore = useCounterStore()
</script>

<style scoped>

</style>
```





## 1.4、getters实现

Pinia中的 getters 直接使用 `computed`函数 进行模拟, 组件中需要使用需要把 getters return出去

```javascript
// 定义数据(state)
const count = ref(0)

// 计算属性
const doubleCount = computed(() => count.value * 2)
```

相当于 Vuex 中的

```javascript
getters: {
    doubleCount(state) {
        return state.count * 2
    }
}
```



## 1.5、action异步实现

异步action函数的写法和组件中获取异步数据的写法完全一致

需求：在Pinia中获取频道 channels 列表数据并把数据渲染App组件的模板中

- 在`src/stores/counter.js` 中定义异步actions

```javascript
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from "axios";

const API_URL = 'http://geek.itheima.net/v1_0/channels'


// defineStore('counter') 定义了一个模块 counter
export const useCounterStore = defineStore('counter', () => {
  // 定义数据(state)
  const count = ref(0)

  // 计算属性
  const doubleCount = computed(() => count.value * 2)

  // 定义修改数据的方法(同步action)
  const increment = () => {
    count.value++
  }

  // 定义异步action的方法
  const list = ref([])
  const getList = async () => {
    const res = await axios.get(API_URL)
    list.value = res.data.data.channels
  }

  return {
    count,
    doubleCount,
    increment,
    list,
    getList
  }
})
```

在其他组件中调用：

```html
<template>
  <div>
    <ul>
      <li v-for="item in counterStore.list" :key="item.id">{{item.name}}</li>
    </ul>
  </div>
</template>

<script setup>
// 1.导入
import {useCounterStore} from '../stores/counter.js'
import {onMounted} from "vue";
// 2.执行方法得到 store 实例对象
const counterStore = useCounterStore()

onMounted(()=> {
  counterStore.getList()
})

</script>


<style>

</style>
```



## 1.6、storeToRefs函数

直接解构的写法会让响应式丢失：

```html
<template>
  <div>
    
    <!--<h1>count的值为:{{counterStore.count}}</h1>-->
    <!--<h1>2*count:{{counterStore.doubleCount}}</h1>-->
    <!-- 直接解构不使用counterStore.xxx -->
    <h1>count的值为:{{count}}</h1>  
    <h1>2*count:{{doubleCount}}</h1> 
     
    <!-- 方法解构 -->  
    <button @click="increment">+1</button>  
  </div>
</template>

<script setup>
// 1.导入
import {useCounterStore} from '../stores/counter.js'
// 2.执行方法得到 store 实例对象
const counterStore = useCounterStore()

// 3.解构赋值(丢失响应式)
const {count,doubleCount} = counterStore


// 4.解构赋值(方法直接解构)
const {increment} = counterStore
</script>
```

上述写法会使得响应式失效，正确写法如下：

```html
<template>
  <div>
    
    <!--<h1>count的值为:{{counterStore.count}}</h1>-->
    <!--<h1>2*count:{{counterStore.doubleCount}}</h1>-->
    <!-- 直接解构不使用counterStore.xxx -->
    <h1>count的值为:{{count}}</h1>  
    <h1>2*count:{{doubleCount}}</h1> 
    <button @click="increment">+1</button>    
  </div>
</template>

<script setup>
// 1.导入
import {useCounterStore} from '../stores/counter.js'
// 2.执行方法得到 store 实例对象
const counterStore = useCounterStore()

// 3.解构赋值(保持数据响应式)
const {count,doubleCount} = storeToRefs(counterStore)

// 4.解构赋值(方法直接解构)
const {increment} = counterStore

</script>
```

> `storeToRefs` 函数只对数据的响应式保持有效，方法可以直接解构赋值







## 1.7、Pinia的调试

Vue官方的 `dev-tools` 调试工具 对 Pinia直接支持，可以直接进行调试

![](pinia(一).assets/4.png)





## 1.8、总结

1. Pinia 是用来做什么的？

> 集中状态管理工具，新一代的vuex

2. Pinia中还需要 mutation 吗？

> 不需要，action 既支持同步也支持异步

3. Pinia如何实现 getter？

> computed 计算属性函数

4. Pinia 产生的 Store 如何解构赋值保持响应式？

> storeToRefs 函数



## 1.9、Pinia持久化插件

官方文档：[快速开始 | pinia-plugin-persistedstate (prazdevs.github.io)](https://prazdevs.github.io/pinia-plugin-persistedstate/zh/guide/)

- 持久化插件是为了持久化数据，也就是将项目的 Store 数据进行持久化存储。

开始：

1. 安装

```bash
npm i pinia-plugin-persistedstate
```

2. 将插件添加到 pinia 实例上

```javascript
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
```

3. 创建 Store 时，将 `persist` 选项设置为 `true`

```javascript
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from "axios";

const API_URL = 'http://geek.itheima.net/v1_0/channels'


// defineStore('counter') 定义了一个模块 counter
export const useCounterStore = defineStore('counter', () => {
  // 定义数据(state)
  const count = ref(0)

  // 计算属性
  const doubleCount = computed(() => count.value * 2)

  // 定义修改数据的方法(同步action)
  const increment = () => {
    count.value++
  }

  // 定义异步action的方法
  const list = ref([])
  const getList = async () => {
    const res = await axios.get(API_URL)
    list.value = res.data.data.channels
  }

  return {
    count,
    doubleCount,
    increment,
    list,
    getList
  }
},{
  // 持久化配置
  persist: true
})
```

































