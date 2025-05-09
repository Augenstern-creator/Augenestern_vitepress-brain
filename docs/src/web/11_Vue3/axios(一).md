# 1、axios



## 1.1、axios是什么

1. 前端最流行的 ajax 请求库
2. react/vue 官方都推荐使用 axios 发 ajax 请求
3. 中文文档：[起步 | Axios中文文档 | Axios中文网 (axios-http.cn)](https://www.axios-http.cn/docs/intro)





## 1.2、axios特点

1. 基于 xhr + promise 的异步 ajax 请求库
2. 浏览器端/node 端都可以使用
3. 支持请求/响应拦截器
4. 支持请求取消
5. 请求/响应数据转换
6. 批量发送多个请求







## 1.3、json-server

这里可以使用 json-server 来创建服务，模拟后端传来的数据，比较简单也比较方便。

1. 全局安装 `json-server`

```bash
npm i -g json-server
```

2. 创建数据文件 `db.json`

```json
{
  "posts": [
    {
      "title": "印度发生特大火车相撞事故",
      "author": "GoogleNews",
      "id": 1
    },
    {
      "title": "2023年人口出生率将下降到800万",
      "author": "GoogleNews",
      "id": 2
    }
  ]
}
```

3. 创建服务

```bash
json-server --watch db.json --port 3000
```

> 这里我是用 json-server 搭建的服务，其实可以用在线的服务如下：
>
> [前端需要的免费在线api接口 - 掘金 (juejin.cn)](https://juejin.cn/post/7041461420818432030)

## 1.4、安装axios

1. 使用 vite 构建项目，创建完成按照提示安装依赖

```bash
npm create vite@latest
```

2. 安装axios包

```bash
npm install axios
```

2. 使用

```html
<template>
  <div>
    <h1>axios的使用</h1>
    <button @click="getReq()">发起get请求</button>
  </div>
</template>

<script>
import  axios from 'axios'
  export default {
    setup() {
      const getReq = () => {
        // 发起get请求
        axios.get('http://localhost:3000/posts').then((res)=> {
          console.log(res.data)
        }).catch((err)=> {
          console.log(err)
        })
      }
      return {
        getReq
      }
    }
  }

</script>


<style scoped>

</style>
```

![](axios(一).assets/1.png)

















# 2、请求配置

Axios 提供了两种不同的形式来发送 HTTP 请求，一种是通过 axios() 方法，另一种是分别通过 axios 对象提供的与 HTTP 方法对应的方法来发起请求，如：  `axios.get()`  , `axios.post()` , `axios.delete()`



- axios.get(url)
- axios.post(url,data)
- axios.delete(url)
- axios.update(url)
- axios.put(url,data)

> - `axios.get()`等方法在官方文档中被描述为请求方法的别名



示例：

- 语法一：

```javascript
// 发起get请求
axios.get('http://localhost:3000/posts').then((res)=> {
  console.log(res.data)
}).catch((err)=> {
  console.log(err)
})
```

- 语法二：

```javascript
axios({
    method: 'get',
    url: 'http://localhost:3000/posts',
}).then(()=> {
    console.log(res.data)
}).cathc(()=> {
    console.log(err)
})
```



## 2.1、axios API

`axios(config)` 方法接收一个对象，这个对象包含了一些对请求的配置， axios 会根据这些配置来发送对应的 HTTP 请求：

- method 请求的方法（可选值： get , post 等）
- url 请求的地址 （必须项）
- data 请求发送的数据（post等请求需要）

> - 默认的请求方法是get所以如果是get请求可以不设置method
> - 请求响应的处理在 then 和 catch 回调中，请求正常会进入 then ，请求异常则会进 catch

```javascript
// 发送 POST 请求
axios({
  method: 'post',
  url: '/user/1',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
}).then(res => {
    consloe.log(res)
}).catch(err => {
    console.log(err)
})
```

## 2.2、请求别名的使用

- `axios.get(url)`

```javascript
// 为给定 ID 的 user 创建请求
axios.get('/user?ID=1').then(function (response) {
  console.log(response);
}).catch(function (error) {
  console.log(error);
});
```

```javascript
//发送post请求
axios.post('/user', {
  firstName: 'Fred',
  lastName: 'Flintstone'
}).then(function (response) {
  console.log(response);
}).catch(function (error) {
  console.log(error);
});
```

> 注意：在使用别名方法时， url、method、data 这些属性都不必在配置中指定。

## 2.3、响应结构

通过 axios 发出的请求的响应结果中， axios 会加入一些字段，如下：

```javascript
{
  // `data` 由服务器提供的响应
  data: {},
  // `status` 来自服务器响应的 HTTP 状态码
  status: 200,
  // `statusText` 来自服务器响应的 HTTP 状态信息
  statusText: 'OK',
  // `headers` 服务器响应的头
  headers: {},
  // `config` 是为请求提供的配置信息
  config: {},
  // 'request'
  // `request` is the request that generated this response
  // It is the last ClientRequest instance in node.js (in redirects)
  // and an XMLHttpRequest instance the browser
  request: {}
}
```

其中的 data 是后端返回的数据，一般我们也只需要关注 response 中的 data 字段就行

## 2.4、请求配置

- 请求地址：`url: '/user'`
- 请求类型：`method: 'get'`
- 请根路径：`baseURL: 'http://www.mt.com/api'`
- 请求前的数据处理：`transformRequest:[function(data){}]`
- 请求后的数据处理：` transformResponse: [function(data){}]`
- 自定义的请求头：`headers:{'x-Requested-With':'XMLHttpRequest'}`
- URL查询对象：`params:{ id: 12 },`
- 查询对象序列化函数：`paramsSerializer: function(params){ }`
- request body：`data: { key: 'aa'}`
- 超时设置：`timeout: 1000,`
- 跨域是否带Token：`withCredentials: false`
- 自定义请求处理：`adapter: function(resolve, reject, config){}`
- 身份验证信息：`auth: { uname: '', pwd: '12'}`
- 响应的数据格式json / blob /document /arraybuffer / text / stream：`responseType: 'json'`

```javascript
{
   // `url` 是用于请求的服务器 URL
  url: '/user',
  // `method` 是创建请求时使用的方法
  method: 'get', // default
  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL: 'https://some-domain.com/api/',
  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  transformRequest: [function (data, headers) {
    // 对 data 进行任意转换处理
    return data;
  }],
  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理
    return data;
  }],
  // `headers` 是即将被发送的自定义请求头
  headers: {'X-Requested-With': 'XMLHttpRequest'},
  // `params` 是即将与请求一起发送的 URL 参数
  // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
  params: {
    ID: 12345
  },
   // `paramsSerializer` 是一个负责 `params` 序列化的函数
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer: function(params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },
  // `data` 是作为请求主体被发送的数据
  // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
  // 在没有设置 `transformRequest` 时，必须是以下类型之一：
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - 浏览器专属：FormData, File, Blob
  // - Node 专属： Stream
  data: {
    firstName: 'Fred'
  },
  // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
  // 如果请求话费了超过 `timeout` 的时间，请求将被中断
  timeout: 1000,
   // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: false, // default
  // `adapter` 允许自定义处理请求，以使测试更轻松
  // 返回一个 promise 并应用一个有效的响应 (查阅 [response docs](#response-api)).
  adapter: function (config) {
    /* ... */
  },
 // `auth` 表示应该使用 HTTP 基础验证，并提供凭据
  // 这将设置一个 `Authorization` 头，覆写掉现有的任意使用 `headers` 设置的自定义 `Authorization`头
  auth: {
    username: 'janedoe',
    password: 's00pers3cret'
  },
   // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json', // default
  // `responseEncoding` indicates encoding to use for decoding responses
  // Note: Ignored for `responseType` of 'stream' or client-side requests
  responseEncoding: 'utf8', // default
   // `xsrfCookieName` 是用作 xsrf token 的值的cookie的名称
  xsrfCookieName: 'XSRF-TOKEN', // default
  // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
  xsrfHeaderName: 'X-XSRF-TOKEN', // default
   // `onUploadProgress` 允许为上传处理进度事件
  onUploadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },
  // `onDownloadProgress` 允许为下载处理进度事件
  onDownloadProgress: function (progressEvent) {
    // 对原生进度事件的处理
  },
   // `maxContentLength` 定义允许的响应内容的最大尺寸
  maxContentLength: 2000,
  // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
  validateStatus: function (status) {
    return status >= 200 && status < 300; // default
  },
  // `maxRedirects` 定义在 node.js 中 follow 的最大重定向数目
  // 如果设置为0，将不会 follow 任何重定向
  maxRedirects: 5, // default
  // `socketPath` defines a UNIX Socket to be used in node.js.
  // e.g. '/var/run/docker.sock' to send requests to the docker daemon.
  // Only either `socketPath` or `proxy` can be specified.
  // If both are specified, `socketPath` is used.
  socketPath: null, // default
  // `httpAgent` 和 `httpsAgent` 分别在 node.js 中用于定义在执行 http 和 https 时使用的自定义代理。允许像这样配置选项：
  // `keepAlive` 默认没有启用
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),
  // 'proxy' 定义代理服务器的主机名称和端口
  // `auth` 表示 HTTP 基础验证应当用于连接代理，并提供凭据
  // 这将会设置一个 `Proxy-Authorization` 头，覆写掉已有的通过使用 `header` 设置的自定义 `Proxy-Authorization` 头。
  proxy: {
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  },
  // `cancelToken` 指定用于取消请求的 cancel token
  // （查看后面的 Cancellation 这节了解更多）
  cancelToken: new CancelToken(function (cancel) {
  })
}
```







## 2.5、全局配置

第三方框架通过`import axios from axios`引入axios属于全局的axios。使用`default`关键字可以对axios进行一个配置。那么所有的axios请求都会携带default预先定义好的默认设置。对于公共的请求配置可以抽离出来，例如：请求超时时间、服务器地址、设置请求头等。

- 语法格式：`axios实例.default.配置项`

```javascript
axios.defaults.baseURL = 'http://123.207.32.32:8000'
axios.defaults.timeout = 5000
axios.defaults.headers['X-TOKEN'] = '123xxx'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.responseType = 'blob' 

axios('home/multidata',
    {
        params: {
            type: 'pop',
            page: 1
        }
    }
).then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
})
```







## 2.6、创建axios实例

> 思考一下，我们通过`import axios from 'axios'`引入了全局的axios对象，为什么还要再单独创建axios实例呢？

- 在实际项目开发中，我们存在不同的请求默认配置可能不一样，例如，服务器地址、请求超时...默认配置不同，那么全局引进的axios再使用`axios.default.配置项`设置全局的默认统一的配置无法解决这个问题。
- 因此，我们使用`axios.create()`函数创建新的axios实例，不同的axios实例可以设置不同的默认配置，各个axios实例之间的配置是互不影响的。

`axios.create()`接收一个对象参数，使用键值对传入默认的配置，返回axios实例。

```javascript
import axios from 'axios'
// axios实例1
const axiosInstance1 = axios.create({
    baseURL:'http://123.207.32.32:8000',
    timeout:5000
})

axiosInstance1({
    url:'/home/multidata',
    params:{
        type:'pop',
        page:3
    }
}).then(res=>{
    console.log(res)
}).catch(err=>{
    console.log(err)
})


// axios实例2
const axiosInstance2 = axios.create({
    baseURL:'http://192.168.5.110:9001',
    timeout:5000
})

axiosInstance1({
    url:'/home/multidata'',
    params:{
        type:'pop',
        page:3
    }
})
.then(res=>{
    console.log(res)
}).catch(err=>{
    console.log(err)
})
```

也可以对新创建的axios实例使用`.default`方法配置

```javascript
import axios from 'axios'
// axios实例1
const axiosInstance1 = axios.create()
axiosInstance1.default.baseURL = 'http://123.207.32.32:8000'
axiosInstance1.default.timeout = 5000

axiosInstance1({
    url:'/home/multidata',
    params:{
        type:'pop',
        page:3
    }
}).then(res=>{
    console.log(res)
}).catch(err=>{
    console.log(err)
})
```

## 2.7、修改实例配置

```javascript
// 第一种：局限性比较大
axios.defaults.timeout = 1000;
axios.defaults.baseURL = 'xxxxx';

// 第二种：实例配置
let instance = axios.create({
    baseURL: 'xxxxx',
    timeout: 1000,  // 超时，401
})
// 创建完后修改
instance.defaults.timeout = 3000

// 第三种：发起请求时修改配置、
instance.get('/xxx',{
    timeout: 5000
})
```

> 这三种修改配置方法的优先级如下：请求配置 > 实例配置 > 全局配置



# 3、发送Get请求

- 普通发送

```javascript
// 发起get请求
axios.get('http://localhost:3000/posts').then((res)=> {
  console.log(res.data)
}).catch((err)=> {
  console.log(err)
})
```

- 带请求参数发送

```javascript
// 发起get请求
axios.get('http://localhost:3000/posts?id=1').then((res)=> {
  console.log(res.data)
}).catch((err)=> {
  console.log(err)
})
```

- 带多个请求参数发送

```javascript
// 发起get请求
axios.get('http://localhost:3000/posts?id=1',{
  params: {
    id: 1,
    author: 'GoogleNews'
  }
}).then((res)=> {
  console.log(res.data)
}).catch((err)=> {
  console.log(err)
})
```

![](axios(一).assets/2.png)













# 4、发送POST请求

POST请求是为了增加的，会将` "title": "永远跟党走！","author": "GoogleNews"` 增加到`db.json`中

```javascript
// 发起post请求
axios.post('http://localhost:3000/posts',{
  data: {
    "title": "永远跟党走！",
    "author": "GoogleNews",
  }
}).then((res)=> {
  console.log(res.data)
}).catch((err)=> {
  console.log(err)
})
```

```javascript
axios({
    method: 'post',
    url: 'http://localhost:3000/posts',
    data: {
        "title": "永远跟党走！",
    	"author": "GoogleNews",
    }
}).then((res)=> {
  console.log(res.data)
}).catch((err)=> {
  console.log(err)
})
```

> 注意：
>
> - Get请求是使用 `params` 来发送请求参数
> - Post 请求是使用 `data` 来发送请求参数

# 5、发送并发请求

`axios.all` 方法不需要单独发出多个HTTP请求，而是允许我们向我们的端点发出多个HTTP请求。

- `axios.all` 可以放入多个请求的数组
- `axios.all` 返回的结果是一个数组，可以使用 `axios.spread` 将数组的值展开

```javascript
axios.all([
    axios({
        method: 'post',
    	url: 'xxx',
    }),
    axios({
        method: 'get',
    	url: 'xxx',
    }), 
]).then(axios.spread(res1,res2)=> {
    console.log(res1)
    console.log(res2)
}).catch((err)=> {
  console.log(err)
})
```



# 6、axios拦截器

拦截器顾名思义即为拦截，对所有的请求和响应进行拦截。

方法：

- `axios.interceptor.request.use()`请求拦截器
- `axios.interceptor.response.use()`响应拦截器

两个拦截器使用方法一致，都接收两个参数：

- 参数1：拦截成功回调函数

- 参数2：拦截失败回调函数。 

  > 注意，无论请求还是响应拦截，拦截完了要return 返回拦截的请求体和响应体，不然就不会执行后边的请求和响应结果操作了。

```javascript
// 请求拦截器
instance.interceptors.request.use(req=>{}, err=>{});
// 响应拦截器
instance.interceptors.reponse.use(req=>{}, err=>{});
```



## 6.1、请求拦截器

**请求拦截器使用场景:**

- 发送请求时添加`正在加载中`图标
- 某些请求必须用户登陆，判断是否有用户token，没有跳转到登陆页
- 对请求的参数进行序列化

```javascript
// use(两个参数)
axios.interceptors.request.use(req => {
    // 在发送请求前要做的事儿
    ...
    return req
}, err => {
    // 在请求错误时要做的事儿
    ...
    // 该返回的数据则是axios.catch(err)中接收的数据
    return Promise.reject(err)
})
```



## 6.2、响应拦截器

**响应拦截器使用场景：**

- 返回响应的`res.data`数据结果
- 根据响应的status状态码，做出不同的操作。例如：如果status是401，响应拦截失败，那么通常是token失效，没有授权，要跳转至登陆页；status是200，响应拦截成功操作，返回res.data响应数据

```javascript
// use(两个参数)
axios.interceptors.reponse.use(res => {
    // 请求成功对响应数据做处理
    ...
    // 该返回的数据则是axios.then(res)中接收的数据
    return res
}, err => {
    // 在请求错误时要做的事儿
    ...
    // 该返回的数据则是axios.catch(err)中接收的数据
    return Promise.reject(err)
})
```



## 6.3、拦截器案例

```javascript
// 设置请求拦截器
axios.interceptors.request.use(
  config => {
    // console.log(config) // 该处可以将config打印出来看一下，该部分将发送给后端（server端）
    config.headers.Authorization = store.state.token
    return config // 对config处理完后返回，下一步将向后端发送请求
  },
  error => { // 当发生错误时，执行该部分代码
    // console.log(error) // 调试用
    return Promise.reject(error)
  }
)

// 定义响应拦截器 -->token值无效时,清空token,并强制跳转登录页
axios.interceptors.response.use(function (response) {
  // 响应状态码为 2xx 时触发成功的回调，形参中的 response 是“成功的结果”
  return response
}, function (error) {
  // console.log(error)
  // 响应状态码不是 2xx 时触发失败的回调，形参中的 error 是“失败的结果”
  if (error.response.status === 401) {
    // 无效的 token
    // 把 Vuex 中的 token 重置为空，并跳转到登录页面
    // 1.清空token
    store.commit('updateToken', '')
    // 2.跳转登录页
    router.push('/login')
  }
  return Promise.reject(error)
})
```











# 7、axios封装

- 在项目中，我们通常会对请求进行二次封装，在项目中`src/utils`文件下新建`request.js`文件存放封装的请求，导入第三方请求库。

- 那么为什么会二次封装请求呢？
- 因为例如axios请求属于第三方库，如果后期作者不再维护axios库的时候，我们只需要修改`request.js`文件依赖的第三方框架部分，这样不会影响项目中其他需要发送请求的代码。



























































