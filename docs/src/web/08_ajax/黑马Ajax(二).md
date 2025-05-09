# 1、同源政策

## 1.1、Ajax请求限制

Ajax 只能向自己的服务器发送请求。比如现在有一个A网站、有一个B网站，A网站中的 HTML 文件只能向A网站服务器中发送 Ajax 请求，B网站中的 HTML 文件只能向 B 网站中发送 Ajax 请求，但是 A 网站是不能向 B 网站发送 Ajax请求的，同理，B 网站也不能向 A 网站发送 Ajax请求。



## 1.2、什么是同源

如果两个页面拥有相同的协议、域名和端口，那么这两个页面就属于同一个源，其中只要有一个不相同，就是不同源

![](黑马Ajax(二).assets/1.png)

例如我们开启两个服务器，一个端口是3000，另一个端口是3001

```js
// 引入express框架
const express = require('express');
// 路径处理模块
const path = require('path');
// 创建web服务器
const app = express();
// 静态资源访问服务功能
app.use(express.static(path.join(__dirname, 'public')));
// 监听端口
app.listen(3000);
```



```js
// 引入express框架
const express = require('express');
// 路径处理模块
const path = require('path');
// 创建web服务器
const app = express();
// 静态资源访问服务功能
app.use(express.static(path.join(__dirname, 'public')));
// 创建路由
app.get('/test', (req, res) => {
    res.send("ok");
});
// 监听端口
app.listen(3001);
```

我们在端口为3000的客户端发送ajax请求至端口为3001的服务器

```html
<body>
	<script type="text/javascript" src="/js/ajax.js"></script>
	<script type="text/javascript">
		ajax({
			url: 'http://localhost:3001/test',
			type: 'get',
			success: function (result) {
				console.log(result);
			}
		})
	</script>
</body>
```

![](黑马Ajax(二).assets/2.png)

## 1.3、同源政策的目的

- 同源政策是为了保证用户信息的安全，防止恶意的网站窃取数据。最初的同源政策是指 A 网站在客户端设置的 Cookie，B网站是不能访问的。

- 随着互联网的发展，同源政策也越来越严格，在不同源的情况下，其中有一项规定就是无法向非同源地址发送Ajax 请求，如果请求，浏览器就会报错



## 1.4、使用JSONP解决同源限制问题

jsonp 是 json with padding 的缩写，它不属于 Ajax 请求，但它可以模拟 Ajax 请求

1. 将不同源的服务器端请求地址写在 script 标签的 src 属性中

```js
<script src="www.example.com"></script>
```

```js
<script src=“https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
```

2. ==服务器端==响应数据必须是一个函数的调用，真正要发送给客户端的数据需要作为函数调用的参数。

```js
const data = 'fn({name: "张三", age: "20"})';
res.send(data);
```

3. 在==客户端全局作用域下定义函数 fn==

   注意要将函数定义放在 script 标签的前面，因为 script 标签加载完服务器端的响应内容以后会直接调用这个准备好的函数，如果客户端没有定义这个函数，函数在调用时找不到这个函数的定义部分，代码将会报错

```js
function fn (data) {
    
}
```

4. 在 fn 函数内部对服务器端返回的数据进行处理

```js
function fn (data) { 
    console.log(data); 
}
```

### 1.4.1、示例

我们开启两个服务器，一个端口是3000，另一个端口是3001，我们在端口为3000的客户端发送ajax请求至端口为3001的服务器

```html
<body>
	<script>
		function fn (data) {
            // 在客户端定义函数
			console.log('客户端的fn函数被调用了')
			console.log(data);
		}
	</script>
	<!-- 1.将非同源服务器端的请求地址写在script标签的src属性中 -->
	<script src="http://localhost:3001/test"></script>
</body>
```

在服务器端调用函数

```js
// 引入express框架
const express = require('express');
// 路径处理模块
const path = require('path');
// 创建web服务器
const app = express();
// 静态资源访问服务功能
app.use(express.static(path.join(__dirname, 'public')));
// 创建路由
app.get('/test', (req, res) => {
    // 在服务器调用函数
    const result = 'fn({name: "张三"})';
    res.send(result);
});
// 监听端口
app.listen(3001);
```



![](黑马Ajax(二).assets/3.png)







## 1.5、JSONP代码优化

1. 客户端需要将函数名称传递到服务器端
2. 将 script 请求的发送变成动态请求。

```html
<body>
	<script>
		function fn (data) {
			console.log('客户端的fn函数被调用了')
			console.log(data);
		}
	</script>
	<!-- 1.将非同源服务器端的请求地址写在script标签的src属性中 -->
	<script src="http://localhost:3001/better?callback=fn"></script>
</body>
```

在非同源服务器端进行接收客户端传递的函数名称

```js
// 引入express框架
const express = require('express');
// 路径处理模块
const path = require('path');
// 创建web服务器
const app = express();
// 静态资源访问服务功能
app.use(express.static(path.join(__dirname, 'public')));
// 创建路由
app.get('/better', (req, res) => {
    // 接收客户端传递过来的函数的名称
    const fnName = req.query.callback;
    // 将函数名称对应的函数调用代码返回给客户端
    const result = fnName + '({"name": "张三"})';
    res.send(result);
});
// 监听端口
app.listen(3001);
```

![](黑马Ajax(二).assets/4.png)

我们将函数名称进行改变为f1，也使得 callback 的值改变为f1

![](黑马Ajax(二).assets/5.png)

3. 封装 jsonp 函数，方便请求发送

```js
function jsonp (options) {
	// 动态创建script标签
	var script = document.createElement('script');
	// 拼接字符串的变量
	var params = '';

	for (var attr in options.data) {
		params += '&' + attr + '=' + options.data[attr];
	}
	
	// myJsonp0124741
	var fnName = 'myJsonp' + Math.random().toString().replace('.', '');
	// 它已经不是一个全局函数了
	// 我们要想办法将它变成全局函数
	window[fnName] = options.success;
	// 为script标签添加src属性
	script.src = options.url + '?callback=' + fnName + params;
	// 将script标签追加到页面中
	document.body.appendChild(script);
	// 为script标签添加onload事件
	script.onload = function () {
		document.body.removeChild(script);
	}
}
```

我们也可以说是封装了 JSONP 函数，我们可以将 JSONP 抽离为 jsonp.js文件，这样我们在客户端就可以引入 jsonp.js 文件使用了

4. 服务器端代码优化之 res.jsonp 方法。

   服务器端接收客户端传递过来的函数名称，并且拼接函数调用，在函数调用的内部，我们还需要将真实的数据写在里面，如果数据是从数据库查出来的 json 对象，我们还需要先转换成 json 字符串，比较麻烦，express 框架给我们 res 下提供了 res.jsonp 方法

```js
app.get('/better',(req,res)=>{
    res.jsonp({name:"lisi",age:20})
})
```



## 1.6、CORS跨域资源共享

CORS：全称为 Cross-origin resource sharing，即跨域资源共享，它允许浏览器向跨域服务器发送 Ajax 请求，克服了 Ajax 只能同源使用的限制。







## 1.7、访问非同源数据服务器端

同源政策是浏览器给予 Ajax 技术的限制，==服务器端是不存在同源政策限制==，服务器端可以直接访问非同源网站中的数据。

所以对于客户端来讲，如果要获取非同源网站中的数据，可以让自己的服务器端获取非同源网站中的数据，等到自己的服务器端获取到数据之后，自己网站的服务器端再将数据响应到客户端，这样就绕过了浏览器的同源政策限制。

![](黑马Ajax(二).assets/6.png)

我们开启两个服务器，一个端口是3000，另一个端口是3001

客户端代码如下：

- 客户端访问自己的服务器

```html
<body>
	<button id="btn">点我发送请求</button>
	<script src="/js/ajax.js"></script>
	<script>
		// 获取按钮
		var btn = document.getElementById('btn');
		// 为按钮添加点击事件
		btn.onclick = function () {
			ajax({
				type: 'get',
				url: 'http://localhost:3000/server',
				success: function (data) {
					console.log(data);
				}
			})
		};
	</script>
</body>
```

服务器3000端代码如下:

- 服务器端获取非同源网站的数据，需要引入第三方模块 request

```js
// 引入express框架
const express = require('express');
// 路径处理模块
const path = require('path');
// 向其他服务器端请求数据的模块
const request = require('request');
// 创建web服务器
const app = express();
// 静态资源访问服务功能
app.use(express.static(path.join(__dirname, 'public')));

app.get('/server', (req, res) => {
    request('http://localhost:3001/cross', (err, response, body) => {
        /**
         * 第一个参数是请求地址
         * 第二个参数是回调函数
         */
        res.send(body);
    })
});

// 监听端口
app.listen(3000);
```

服务器3001端的代码如下：

```js
// 引入express框架
const express = require('express');
// 路径处理模块
const path = require('path');
// 创建web服务器
const app = express();
// 静态资源访问服务功能
app.use(express.static(path.join(__dirname, 'public')));
// 创建路由
app.get('/cross', (req, res) => {
    res.send('ok')
});
// 监听端口
app.listen(3001);
```

![](黑马Ajax(二).assets/7.png)











## 6.6 CORS跨域资源共享







```
origin: http://localhost:3000
```



```js
Access-Control-Allow-Origin: 'http://localhost:3000'
 Access-Control-Allow-Origin: '*'
```



Node 服务器端设置响应头示例代码：

```js
app.use((req, res, next) => {
     res.header('Access-Control-Allow-Origin', '*');
     res.header('Access-Control-Allow-Methods', 'GET, POST');
     next();
 })
```











## 6.9 withCredentials属性

使用Ajax技术发送跨域请求时，默认情况下不会在请求中携带cookie信息。但是如果两台服务器都是我们自己的，我们想要实现跨域请求，需要在客户端和服务器端进行处理

在客户端 ajax 对象下有一个属性：

- withCredentials：指定在涉及到跨域请求时，是否携带cookie信息，默认值为false

在服务器端响应头中设置字段

- Access-Control-Allow-Credentials：true 允 许客户端发送请求时携带cookie



# 2、jQuery中的Ajax

## 2.1、$.ajax()方法概述

$.ajax()方法作用：发送 Ajax 请求

## 2.2、发送Ajax请求

```js
$.ajax({
     type: 'get',
     url: 'http://www.example.com',
     data: { name: 'zhangsan', age: '20' },
     contentType: 'application/x-www-form-urlencoded',
     beforeSend: function () { 
         return false
     },
     success: function (response) {},
     error: function (xhr) {}
});
```

- type：代表请求方式

- url：代表请求地址

- data：代表向服务器端发送的请求参数，它可以是一个对象，在内部会将其转化为参数字符串，除了传递对象以外，我们也可以传递字符串参数值,在内部都会将其转化为参数字符串进行发送

  ```js
  {
  	data: 'name=zhangsan&age=20'
  }
  ```

- contentType：告诉服务器端客户端要向服务器端传递的参数格式类型，默认是`application/x-www-form-urlencoded`,也就是 参数名 = 参数值，多个参数之间用 & 分隔的参数字符串，如果传递的是 json 格式的请求参数,需要将 contentType 进行如下替换

  ```js
  {
       contentType: 'application/json'
  }
  ```

  然后在 data 中传递 json 格式字符串,需要通过 `JSON.stringify` 将json对象转换为字符串

  ```js
  JSON.stringfy({ name: 'zhangsan', age: '20' })
  ```

- beforeSend：允许我们在请求发送之前做一些事，是一个函数，比如在请求发送之前我们可以对请求参数进行格式验证，格式不正确，`return false` 请求便不会发送了

- success：是一个函数，请求发送成功之后就会被调用，有一个形参，这个形参就是服务器端返回的数据
- error：是一个函数，请求失败之后就会被调用，接收一个 ajax 对象，我们可以在对象中获取错误信息，并且根据错误信息做出错误处理

例如，点击按钮发送 ajax 请求,客户端代码如下：

```html
<body>
	<button id="btn">发送请求</button>
	<script src="/js/jquery.min.js"></script>
	<script>
		$('#btn').on('click', function () {
			$.ajax({
				// 请求方式
				type: 'get',
				// 请求地址
				url: 'http://localhost:3000/base',
				// 请求成功以后函数被调用
				success: function (response) {
					// response为服务器端返回的数据
					// 方法内部会自动将json字符串转换为json对象
					console.log(response);
				},
				// 请求失败以后函数被调用
				error: function (xhr) {
					console.log(xhr)
				}
			})
		});
	</script>
</body>
```

服务器端代码如下：

```js
// 引入express框架
const express = require('express');
// 路径处理模块
const path = require('path');
// 创建web服务器
const app = express();
// 静态资源访问服务功能
app.use(express.static(path.join(__dirname, 'public')));
app.get('/base', (req, res) => {
    res.send({
        name: 'zhangsan',
        age: 30
    })
});

// 监听端口
app.listen(3000);
```

![](黑马Ajax(二).assets/8.png)

如果我们是 post 请求方式:

客户端代码如下：

```html
<body>
    <button id="btn">发送请求</button>
    <script src="/js/jquery.min.js"></script>
    <script>
        $('#btn').on('click', function() {
            $.ajax({
                // 请求方式
                type: 'post',
                // 请求地址
                url: 'http://localhost:3000/base',
                // 请求成功以后函数被调用
                success: function(response) {
                    // response为服务器端返回的数据
                    // 方法内部会自动将json字符串转换为json对象
                    console.log(response);
                },
                // 请求失败以后函数被调用
                error: function(xhr) {
                    console.log(xhr)
                }
            })
        });
    </script>
</body>
```

服务器端代码如下：

```js
// 引入express框架
const express = require('express');
// 路径处理模块
const path = require('path');
// 创建web服务器
const app = express();
// 静态资源访问服务功能
app.use(express.static(path.join(__dirname, 'public')));

app.post('/base', (req, res) => {
    res.send({
        name: 'zhaoliu',
        age: 35
    })
});

// 监听端口
app.listen(3000);
```

![](黑马Ajax(二).assets/9.png)

**若我们请求地址的协议，域名，端口都一样，我们请求地址url也可以省略,只用书写路由即可**

```html
<body>
    <button id="btn">发送请求</button>
    <script src="/js/jquery.min.js"></script>
    <script>
        $('#btn').on('click', function() {
            $.ajax({
                // 请求方式
                type: 'post',
                // 请求地址
                url: '/base',
                // 请求成功以后函数被调用
                success: function(response) {
                    // response为服务器端返回的数据
                    // 方法内部会自动将json字符串转换为json对象
                    console.log(response);
                },
                // 请求失败以后函数被调用
                error: function(xhr) {
                    console.log(xhr)
                }
            })
        });
    </script>
</body>
```



## 2.3、$.ajax方法传递请求参数

客户端代码如下：

```html
<body>
	<button id="btn">发送请求</button>
	<script src="/js/jquery.min.js"></script>
	<script>
		$('#btn').on('click', function () {
			$.ajax({
				// 请求方式
				type: 'post',
				// 请求地址
				url: '/user',
				// 向服务器端发送的请求参数
				data: {
					name: 'zhangsan',
					age: 100
				},
                // data: 'name=zhangsan&age=100'  也可以这样传递
				// 请求成功以后函数被调用
				success: function (response) {
					// response为服务器端返回的数据
					// 方法内部会自动将json字符串转换为json对象
					console.log(response);
				}
			})
		});
	</script>
</body>
```

![](黑马Ajax(二).assets/10.png)



如果我们要传递json格式的字符串，

- 改变 contentType 为 `application/json`

- 需要通过 `JSON.stringify` 将json对象转换为字符串传递，请求成功服务器端响应回来 success 方法内部又会自动将 json字符串 转换为 json对象

客户端代码如下：

```html
<body>
    <button id="btn">发送请求</button>
    <script src="/js/jquery.min.js"></script>
    <script>
        // json 对象
        var params = {name: 'wangwu', age: 300}
        $('#btn').on('click', function() {
            $.ajax({
                // 请求方式
                type: 'post',
                // 请求地址
                url: '/user',
                data: JSON.stringify(params),
                // 指定参数的格式类型
                // 将json对象转换为字符串传递
                contentType: 'application/json',
                // 请求成功以后函数被调用
                success: function(response) {
                    // response为服务器端返回的数据
                    // 方法内部会自动将json字符串转换为json对象
                    console.log(response);
                }
            })
        });
    </script>
</body>
```



![](黑马Ajax(二).assets/11.png)











## 2.4、serialize方法

作用：==将表单中的数据自动拼接成 参数名 = 参数值且多个参数之间用&连接的字符串 类型的参数==

```js
var params = $('#form').serialize();
// name=zhangsan&age=30
```

客户端代码如下：

```html
<body>
    <form id="form">
        <input type="text" name="username">
        <input type="password" name="password">
        <input type="submit" value="提交">
    </form>
    <script src="/js/jquery.min.js"></script>
    <script type="text/javascript">
        $('#form').on('submit', function() {
            // 将表单内容拼接成字符串类型的参数
            var params = $('#form').serialize();
            console.log(params);
            return false;

        });
    </script>
</body>
```

![](黑马Ajax(二).assets/12.png)

此时我们将表单内容拼接成字符串类型的参数，但是如果我们需要将表单用户输入的内容转换为对象类型，jquery 并没有给我们封装，我们需要自己封装

视频讲解地址：https://www.bilibili.com/video/BV1ji4y1876Y?p=49

```html
<body>
    <form id="form">
        <input type="text" name="username">
        <input type="password" name="password">
        <input type="submit" value="提交">
    </form>
    <script src="/js/jquery.min.js"></script>
    <script type="text/javascript">
        $('#form').on('submit', function() {
            // 将表单中用户输入的内容转换为对象类型
            var params = $('#form').serialize();
            serializeObject($(this));
            return false;
        });

        // 将表单中用户输入的内容转换为对象类型
        function serializeObject(obj) {
            // 处理结果对象
            var result = {};
            // [{name: 'username', value: '用户输入的内容'}, {name: 'password', value: '123456'}]
            var params = obj.serializeArray();

            // 循环数组 将数组转换为对象类型
            $.each(params, function(index, value) {
                    result[value.name] = value.value;
                })
            // 将处理的结果返回到函数外部
            return result;
        }
    </script>
</body>
```



## 2.5、发送jsonp请求

```js
$.ajax({
    url: 'http://www.example.com',
    // 指定当前发送jsonp请求
    dataType: 'jsonp',
    // 修改callback参数名称
    jsonp: 'cb',
    // 指定函数名称
    jsonCallback: 'fnName',
    success: function (response) {} 
})
```

- dataType：`jsonp` 表示指定当前发送jsonp请求
- jsonp：`cb` 表示修改callback参数名称(可选)
- jsonCallback：`fnName`  表示指定函数名称(可选)

例如，客户端代码如下：

```html
<body>
    <button id="btn">发送请求</button>
    <script src="/js/jquery.min.js"></script>
    <script>
        $('#btn').on('click', function() {
            $.ajax({
                url: '/jsonp',
                // 代表现在要发送的是jsonp请求
                dataType: 'jsonp',
                // 请求成功会调用success函数,形参是服务器端传给我们的数据
                success: function(response) {
                    console.log(response)
                }
            })
        });
    </script>
</body>
```

服务器端路由如下：

```js
app.get('/jsonp', (req, res) => {
    res.jsonp({
        name: 'lisi',
        age: 50
    })
});
```

![](黑马Ajax(二).assets/13.png)

- 有的服务器端不是通过 callback 来接收客户端传递过来的函数名称，而是换成了简写 cb，这样我们就需要传递 `jsonp:cb`
- jsonCallback：`fnName`  表示指定函数名称，正常来说，请求成功后会调用 success 函数，但是如果我们不想调用它，我们也可以自己传递函数名字，然后在客户端自己准备好这个函数的定义部分

例如：客户端代码如下：

```html
<body>
    <button id="btn">发送请求</button>
    <script src="/js/jquery.min.js"></script>
    <script>
        function fn(response) {
            console.log(response)
        }

        $('#btn').on('click', function() {
            $.ajax({
                url: '/jsonp',
                // 向服务器端传递函数名字的参数名称
                jsonp: 'cb',
                // 指定函数名称
                jsonpCallback: 'fn',
                // 代表现在要发送的是jsonp请求
                dataType: 'jsonp',
                success: function(response) {
                    console.log(response)
                }
            })
        });
    </script>
</body>
```

服务器端路由如下：

```js
app.get('/jsonp', (req, res) => {
    const cb = req.query.cb
    const data = cb + "({name: 'zhaoliu'})"
    res.send(data);
});
```

![](黑马Ajax(二).assets/14.png)

## 2.6、$.get()、$.post()方法概述

作用：`$.get`方法用于发送get请求，`$.post`方法用于发送post请求

```js
$.get('http://www.example.com', {name: 'zhangsan', age: 30}, function (response) {}) 

$.post('http://www.example.com', {name: 'lisi', age: 22}, function (response) {})
```

例如：

```html
<body>
	<button id="btn">发送请求</button>
	<script src="/js/jquery.min.js"></script>
	<script>
		$('#btn').on('click', function () {
			$.get('/base', 'name=zhangsan&age=30', function (response) {
				console.log(response)
			})
			
			//$.post('/base', function (response) {
			//	console.log(response)
			//})
		});
	</script>
</body>
```

















# 3、RESTful风格的API

## 3.1、传统请求地址回顾

![](黑马Ajax(二).assets/15.png)

这样的请求地址在使用上是没有问题的，但是语义比较混乱，例如：删除用户信息问号后面还要跟获取用户信息的 id，又比如删除用户有些人开发使用 remove、有的人开发使用 delete，这样就没有一套统一的请求地址。而 RESTful 就是为了解决这样的问题。

## 8.2 RESTful API概述

一套关于设计请求的规范。

**我们看请求方式的设置如下**：

- GET请求方式：      获取数据
- POST请求方式：    添加数据
- PUT请求方式：      更新数据
- DELETE请求方式： 删除数据

> 注意：传统的HTML表单是不支持 PUT请求方式 和DELETE请求方式的，但是在Ajax中是支持的

**我们看请求地址的设置如下**：

- users => /users
- articles => /articles 

## 8.3 RESTful API的实现

![](黑马Ajax(二).assets/16.png)



```html
<body>
	<script src="/js/jquery.min.js"></script>
	<script type="text/javascript">
		// 获取用户列表信息
		$.ajax({
			type: 'get',
			url: '/users',
			success: function (response) {
				console.log(response)
			}
		})

		// 获取id为1的用户信息
		$.ajax({
			type: 'get',
			url: '/users/1',
			success: function (response) {
				console.log(response)
			}
		})

		// 获取id为1的用户信息
		$.ajax({
			type: 'delete',
			url: '/users/10',
			success: function (response) {
				console.log(response)
			}
		})

		// 获取id为1的用户信息
		$.ajax({
			type: 'put',
			url: '/users/10',
			success: function (response) {
				console.log(response)
			}
		})
	</script>
</body>
```





# 

















