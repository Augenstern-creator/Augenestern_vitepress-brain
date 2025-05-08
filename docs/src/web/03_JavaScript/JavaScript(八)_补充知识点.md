# 1、元素偏移量 offset系列

## 1.1、offset概述

offset 翻译过来就是偏移量， 我们使用 offset 系列相关属性可以==动态的==得到该元素的位置（偏移）、大小等。

![](JavaScript(八)_补充知识点.assets/1.png)

- 获得元素距离带有定位父元素的位置
- 获得元素自身的大小（宽度高度）
- **注意**： 返回的数值都不带单位

offset 系列常用属性

| offset系列属性       | 作用                                                         |
| -------------------- | ------------------------------------------------------------ |
| element.offsetParent | 返回作为该元素带有定位的父级元素,如果父级都没有定位则返回 body |
| element.offsetTop    | 返回元素相对带有定位父元素上方的偏移                         |
| element.offsetLeft   | 返回元素带有定位元素左边框的偏移                             |
| element.offsetWidth  | 返回自身包括 pdding、边框、内容区的宽度，返回数据不带单位    |
| element.offsetHeight | 返回自身包括 padding、边框、内容区的高度，返回数值不带单位   |

```html
<body>
    <div class="father">
        <div class="son"></div>
    </div>
    <div class="w"></div>
    <script>
        // offset 系列
        var father = document.querySelector('.father');
        var son = document.querySelector('.son');
        // 1.可以得到元素的偏移 位置 返回的不带单位的数值  
        console.log(father.offsetTop);
        console.log(father.offsetLeft);
        // 它以带有定位的父亲为准  如果没有父亲或者父亲没有定位 则以 body 为准
        console.log(son.offsetLeft);
        var w = document.querySelector('.w');
        // 2.可以得到元素的大小 宽度和高度 是包含padding + border + width 
        console.log(w.offsetWidth);
        console.log(w.offsetHeight);
        // 3. 返回带有定位的父亲 否则返回的是body
        console.log(son.offsetParent); // 返回带有定位的父亲 否则返回的是body
        console.log(son.parentNode); // 返回父亲 是最近一级的父亲 亲爸爸 不管父亲有没有定位
    </script>
</body>
```

## 1.2、offset和style区别

| offset                                             | style                                               |
| -------------------------------------------------- | --------------------------------------------------- |
| offset 可以得到任意样式表中的样式值                | style 只能得到行内样式表中的样式值                  |
| offset 系列获得的数值是没有单位的                  | style.width 获得的是带有单位的字符串                |
| offsetWidth 包含 padding + border + width          | style.width 获得不包含 padding 和 border 的值       |
| offsetWidth 等属性是只读属性，只能获取不能赋值     | style.width 是可读写属性，可以获取也可以赋值        |
| ==所以，我们想要获取元素大小位置，用offset更合适== | ==所以，我们想要给元素更改值，则需要用 style 改变== |

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        .box {
            width: 200px;
            height: 200px;
            background-color: pink;
            padding: 10px;
        }
    </style>
</head>

<body>
    <div class="box" style="width: 200px;"></div>
    <script>
        // offset与style的区别
        var box = document.querySelector('.box');
        console.log(box.offsetWidth);
        console.log(box.style.width);
        // box.offsetWidth = '300px';
        box.style.width = '300px';
    </script>
</body>
```





# 2、元素可视区client系列

- client 翻译过来就是客户端，我们使用 client 系列的相关属性来获取元素可视区的相关信息。

- 通过 client 系列的相关属性可以==动态的得到该元素的边框大小、元素大小等==

![](JavaScript(八)_补充知识点.assets/2.png)

| client 系列属性      | 作用                                                         |
| -------------------- | ------------------------------------------------------------ |
| element.clientTop    | 返回元素上边框的大小                                         |
| element.clientLeft   | 返回元素左边框的大小                                         |
| element.clientWidth  | 返回自身包括 padding、内容区的宽度、不包含边框，返回数值不带单位 |
| element.clientHeight | 返回自身包括 padding、内容区的高度、不包含边框，返回数值不带单位 |



```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        div {
            width: 200px;
            height: 200px;
            background-color: pink;
            border: 10px solid red;
            padding: 10px;
        }
    </style>
</head>

<body>
    <div></div>
    <script>
        // client 宽度 和我们offsetWidth 最大的区别就是 不包含边框
        var div = document.querySelector('div');
        console.log(div.clientWidth);
    </script>
</body>
```



## 2.1、立即执行函数

- 立即执行函数: 不需要调用，立马能够自己执行的函数
- 写法：

```js
(function() {})()
```

也可以传递参数进来

```js
(function(){}())
```



```html
<body>
    <script>
        // 1.立即执行函数: 不需要调用，立马能够自己执行的函数
        function fn() {
            console.log(1);

        }
        fn();
        // 2. 写法 也可以传递参数进来
        // 1.(function() {})()    或者  2. (function(){}());
        (function(a, b) {
            console.log(a + b);
            var num = 10;
        })(1, 2); // 第二个小括号可以看做是调用函数
        (function sum(a, b) {
            console.log(a + b);
            var num = 10; // 局部变量
        }(2, 3));
        // 3. 立即执行函数最大的作用就是 独立创建了一个作用域, 里面所有的变量都是局部变量 不会有命名冲突的情况
    </script>
</body>
```



## 2.2、pageShow

下面三种情况都会刷新页面都会触发 load 事件。

1. a标签的超链接

2. F5或者刷新按钮（强制刷新）

3. 前进后退按钮

但是 火狐中，有个特点，有个“往返缓存”，这个缓存中不仅保存着页面数据，还保存了DOM和JavaScript的状态；实际上是将整个页面都保存在了内存里。所以此时后退按钮不能刷新页面。

此时可以使用 pageshow事件来触发。，这个事件在页面显示时触发，无论页面是否来自缓存。在重新加载页面中，pageshow会在load事件触发后触发；根据事件对象中的 ==persisted== 来判断是否是缓存中的页面触发的pageshow事件，注意这个事件给window添加。

```html
<body>

    <script>
        // console.log(window.devicePixelRatio);
        window.addEventListener('pageshow', function() {
            alert(11);
        })
    </script>
    <a href="http://www.itcast.cn">链接</a>
</body>
```

# 3、元素滚动scroll系列

## 3.1、元素 scroll 系列属性

scroll 翻译过来就是滚动的，我们使用 scroll 系列的相关属性可以动态的得到该元素的大小、滚动距离等。

![](JavaScript(八)_补充知识点.assets/3.png)

| scroll 系列属性      | 作用                                             |
| -------------------- | ------------------------------------------------ |
| element.scrollTop    | 返回被卷去的上册距离，返回数值不带单位           |
| element.scrollLeft   | 返回被卷去的左侧距离，返回数值不带单位           |
| element.scrollWidth  | 返回自身实际的宽度，不包含边框，返回数值不带单位 |
| element.scrollHeight | 返回自身实际的高度，不包含边框，返回数值不带单位 |

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        div {
            width: 200px;
            height: 200px;
            background-color: pink;
            border: 10px solid red;
            padding: 10px;
            overflow: auto;
        }
    </style>
</head>

<body>
    <div>
        我是内容 我是内容 我是内容 我是内容 我是内容 我是内容 我是内容 我是内容 我是内容 我是内容 我是内容 我是内容 我是内容 我是内容 我是内容 我是内容 我是内容 我是内容 我是内容 我是内容 我是内容 我是内容 我是内容 我是内容 我是内容 我是内容 我是内容 我是内容 我是内容 我是内容 我是内容 我是内容 我是内容 我是内容
    </div>
    <script>
        // scroll 系列
        var div = document.querySelector('div');
        console.log(div.scrollHeight);
        console.log(div.clientHeight);
        // scroll滚动事件当我们滚动条发生变化会触发的事件
        div.addEventListener('scroll', function() {
            console.log(div.scrollTop);

        })
    </script>
</body>
```



## 3.2、页面被卷去的头部

如果浏览器的高（或宽）度不足以显示整个页面时，会自动出现滚动条。当滚动条向下滚动时，页面上面被隐藏掉的高度，我们就称为页面被卷去的头部。滚动条在滚动时会触发 onscroll 事件。



































