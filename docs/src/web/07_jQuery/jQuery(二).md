✍

# 1、jQuery事件🔥

## 1.1、jQuery事件注册🔥

### 1.1.1、单个事件注册🔥

语法：

```js
element.事件(function(){})

$("div").click(function(){事件处理程序})
```

其他事件和原生基本一致。

比如mouseover、mouseout、blur、focus、change、keydown、keyup、resize、scroll 等



## 1.2、jQuery事件处理🔥

### 1.2.1、事件处理 on()绑定事件🔥

- `on()` 方法在匹配元素上绑定一个或多个事件的事件处理函数
- 语法：

```js
element.on(events,[selector],fn)
```

- `events` ：一个或多个空格分隔的事件类型，如 "click" 或 "keydown"
- selector：元素的子元素选择器
- fn：回调函数，即绑定在元素身上的侦听函数

```js
$("div").on({
    mouseenter: function(){
        $(this).css("background","skyblue");
    },
    click: function(){
        $(this).css("background","purple");
    }
})

```

#### ①on() 方法优势1

- 可以绑定多个事件，多个处理事件处理程序。 

```js
$("div").on({
    mouseover: function(){},
    mouseout: function(){},
    click: function(){}
})
```

- 如果事件处理程序相同 

```js
$("div").on("mouseover mouseout",function(){
    $(this.toggleClass("current"));
});
```

#### ②on()方法优势2

可以事件委派操作.事件委派的定义就是，**把原来加给子元素身上的事件绑定在父元素身上，就是把事件委派给父元素**

```js
$("ul").on("click","li",function(){
    alert("hello world!");
});

//事件是绑定在ul身上，只有一个ul 添加了点击事件，但是触发对象是li，会发生事件冒泡，冒泡到父亲身上，父亲就会执行这个函数
```

在此之前有bind(), live() delegate()等方法来处理事件绑定或者事件委派，最新版本的请用on替代他们。

#### ③on()方法优势3

**动态创建的元素，click()没有办法绑定事件**，on() 可以给未来动态生成的元素绑定事件

```js
// 传统方法
$("ol li").click(function(){
    alert(11);
})
var li = $("<li>我是后来创建的</li>")
$("ol").append(li);
// 没有用，动态创建的元素没有办法绑定事件


// on可以给未来动态创建的元素绑定事件
$("ol").on("click","li",function(){
    alert(11);
})
var li = $("<li>我是后来创建的</li>")
$("ol").append(li);
```



```html
<body>
    <div></div>
    <ul>
        <li>我们都是好孩子</li>
        <li>我们都是好孩子</li>
        <li>我们都是好孩子</li>
        <li>我们都是好孩子</li>
        <li>我们都是好孩子</li>
    </ul>
    <ol>

    </ol>
    <script>
        $(function() {
            // 1. 单个事件注册
            // $("div").click(function() {
            //     $(this).css("background", "purple");
            // });
            // $("div").mouseenter(function() {
            //     $(this).css("background", "skyblue");
            // });

            // 2. 事件处理on
            // (1) on可以绑定1个或者多个事件处理程序
            // $("div").on({
            //     mouseenter: function() {
            //         $(this).css("background", "skyblue");
            //     },
            //     click: function() {
            //         $(this).css("background", "purple");
            //     },
            //     mouseleave: function() {
            //         $(this).css("background", "blue");
            //     }
            // });
            $("div").on("mouseenter mouseleave", function() {
                $(this).toggleClass("current");
            });
            // (2) on可以实现事件委托（委派）
            // $("ul li").click();
            $("ul").on("click", "li", function() {
                alert(11);
            });
            // click 是绑定在ul 身上的，但是 触发的对象是 ul 里面的小li
            // (3) on可以给未来动态创建的元素绑定事件
            // $("ol li").click(function() {
            //     alert(11);
            // })
            $("ol").on("click", "li", function() {
                alert(11);
            })
            var li = $("<li>我是后来创建的</li>");
            $("ol").append(li);
        })
    </script>
</body>
```





### 1.2.2、事件处理 off()解绑事件🔥

- off() 方法可以移除通过on()方法添加的事件处理程序。

```js
$("div").off(); // 这个是接除了div身上的所有事件
$("div").off("click");  //这个是解除了div身上的点击事件
$("ul").off("click","li"); //这个是解绑事件委托
```

- 如果有些事件只想执行一次就不再执行，可以使用one() 方法

```js
$("p").one("click",function(){
    alert(11);
})
```



```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        div {
            width: 100px;
            height: 100px;
            background-color: pink;
        }
    </style>
    <script src="jquery.min.js"></script>
    <script>
        $(function() {
            $("div").on({
                click: function() {
                    console.log("我点击了");
                },
                mouseover: function() {
                    console.log('我鼠标经过了');
                }
            });
            $("ul").on("click", "li", function() {
                alert(11);
            });
            // 1. 事件解绑 off 
            // $("div").off();  // 这个是解除了div身上的所有事件
            $("div").off("click"); // 这个是解除了div身上的点击事件
            $("ul").off("click", "li");
            // 2. one() 但是它只能触发事件一次
            $("p").one("click", function() {
                alert(11);
            })
        })
    </script>
</head>

<body>
    <div></div>
    <ul>
        <li>我们都是好孩子</li>
        <li>我们都是好孩子</li>
        <li>我们都是好孩子</li>
    </ul>
    <p>我是屁</p>
</body>
```



### 1.2.3、自动触发事件trigger()🔥

有些事件希望自动触发, 比如轮播图自动播放功能跟点击右侧按钮一致。可以利用定时器自动触发右侧按钮点击事件，不必鼠标点击触发。

```js
// 1.元素.事件()
$("div").click();

// 2.元素.trigger("事件")
$("div").trigger("click");

// 3.元素.triggerHandler("事件") 不会触发元素的默认行为
$("div").triggerHandler("click");
```

- `triggerHandler` 模式不会触发元素的默认行为，这是和前面两种的区别。



```html
 <script>
        $(function() {
            $("div").on("click", function() {
                alert(11);
            });

            // 自动触发事件
            // 1. 元素.事件()
            // $("div").click();会触发元素的默认行为
            
            // 2. 元素.trigger("事件")
            // $("div").trigger("click");会触发元素的默认行为
            $("input").trigger("focus");
            
            // 3. 元素.triggerHandler("事件") 就是不会触发元素的默认行为
            $("div").triggerHandler("click");
            $("input").on("focus", function() {
                $(this).val("你好吗");
            });
            // $("input").triggerHandler("focus");

        });
 </script>
```



## 1.3、jQuery事件对象🔥

事件被触发，就会有事件对象的产生

```js
element.on(events,[selector],function(event){})
```

- 阻止默认行为: event.preventDefault()  或者 return false
- 阻止冒泡 :  event.stopPropagation()

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        div {
            width: 100px;
            height: 100px;
            background-color: pink;
        }
    </style>
    <script src="jquery.min.js"></script>
    <script>
        $(function() {
            $(document).on("click", function() {
                console.log("点击了document");

            })
            $("div").on("click", function(event) {
                // console.log(event);
                console.log("点击了div");
                event.stopPropagation();
            })
        })
    </script>
</head>

<body>
    <div></div>
</body>
```



# 2、jQuery其他方法🔥

## 2.1、jQuery对象拷贝🔥

如果想要把某个对象拷贝(合并)给另外一个对象使用，此时可以使用`$.extend()`方法

```js
$.extend([deep],target,object1,[objectN])
```

- `deep`:如果设为true为深拷贝，默认为false 浅拷贝
- `target`: 要拷贝的目标对象
- `object1`:待拷贝到第一个对象的对象
- `objectN`:待拷贝的第N个对象的对象
- 浅拷贝是把被拷贝的对象复杂数据类型中的地址拷贝给目标对象，修改目标对象会影响被拷贝对象
- 深拷贝，前面加true，完全克隆(拷贝的对象，而不是地址),修改目标对象不会影响被拷贝对象
- 深拷贝把里面的数据完全复制一份给目标对象，如果里面有不冲突的属性，会合并到一起

```js
$(function(){
    var targetObj = {};
    var obj = {
       id: 1,
       name: "andy"
    };
    // $.extend(target,obj);
    $.extend(targetObj,obj);     // 会覆盖targetObj里面原来的数据
    // 把 obj 拷贝给 targetObj
})
```





```js
<script>
    $(function() {
        var targetObj = {
                    id: 0,
                    msg: {
                        sex: '男'
                    }
                };
                var obj = {
                    id: 1,
                    name: "andy",
                    msg: {
                        age: 18
                    }
                };
        // 1. 浅拷贝把原来对象里面的复杂数据类型地址拷贝给目标对象
        // targetObj.msg.age = 20;
        // console.log(targetObj);
        // console.log(obj);
        // 2. 深拷贝把里面的数据完全复制一份给目标对象 如果里面有不冲突的属性,会合并到一起 
        $.extend(true, targetObj, obj);
        // console.log(targetObj); // 会覆盖targetObj 里面原来的数据
        targetObj.msg.age = 20;
        console.log(targetObj); // msg :{sex: "男", age: 20}
        console.log(obj);
```









## 2.2、jQuery多库共存🔥

- jQuery使用$作为标示符，随着jQuery的流行,其他 js 库也会用这$作为标识符， 这样一起使用会引起冲突
- 需要一个解决方案，让jQuery 和其他的js库不存在冲突，可以同时存在，这就叫做多库共存。

解决方案：

1. ==把里面的 $ 符号统一改为 jQuery。 比如 jQuery(''div'')==
2. ==jQuery 变量规定新的名称：$.noConflict()    var xx = $.noConflict();==

```js
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="jquery.min.js"></script>
    <script>
        $(function() {
            function $(ele) {
                return document.querySelector(ele);
            }
            console.log($("div"));
            // 1. 如果$ 符号冲突 我们就使用 jQuery
            jQuery.each();
            // 2. 让jquery 释放对$ 控制权 让用自己决定
            var suibian = jQuery.noConflict();
            console.log(suibian("span"));
            suibian.each();
        })
    </script>
</head>

<body>
    <div></div>
    <span></span>
</body>
```





# 3、jQuery插件🔥

jQuery 功能比较有限，想要更复杂的特效效果，可以借助于 jQuery 插件完成。

**注意**: 这些插件也是依赖于jQuery来完成的，所以必须要先引入jQuery文件，因此也称为 jQuery 插件。



jQuery 插件常用的网站:

1. jQuery插件库  http://www.jq22.com/ (需要登录)

2. jQuery之家  http://www.htmleaf.com/ (不需登录，推荐)



## 3.1、jQuery插件使用步骤🔥

1. 引入相关文件(jQuery文件和插件文件)

2. 复制相关 html，css，js(调用插件)



## 3.2、瀑布流插件🔥

1. 我们打开 jQuery 之家，选择我们需要的 jQuery 插件，直接下载插件即可(这里以瀑布流插件为例)

![](jQuery(二).assets/1.png)

2. 我们下载完是一个压缩包，直接解压即可

![](jQuery(二).assets/2.png)

3. 打开 index.html，右击检查网页源代码

![](jQuery(二).assets/3.png)

4. 我们发现此插件引入了 css ，js。我们将解压好的文件夹中的css、js拷贝到我们自己所需的文件夹中

![](jQuery(二).assets/4.png)

5. 我们接着看我们刚才打开的 index.html ，此插件引入了 css ，js，我们将其引用部分复制粘贴进我们自己的网页中

![](jQuery(二).assets/5.png)



![](jQuery(二).assets/6.png)



![](jQuery(二).assets/8.png)



![](jQuery(二).assets/10.png)

6. 接下来我们只需修改 HTML 部分即可。我们在==下载插件的页面== 下滑查看插件的 ==HTML结构==，在打开的 index.html 中复制展示的段落代码，粘贴进我们自己的 HTML 网页中，并进行图片的更换



![](jQuery(二).assets/11.png)



![](jQuery(二).assets/9.png)



![](jQuery(二).assets/12.png)



最后，完事大成，我们来看看我们自己的效果

![](jQuery(二).assets/13.png)



这样就和插件效果一模一样了，我们在 ==插件下载页面== 下滑，可以看到我们的配置参数，自己也可以在 ==引入内部js== 代码中进行修改

![](jQuery(二).assets/14.png)



## 3.3、jQuery图片懒加载🔥

- 图片懒加载(图片使用延迟加载在可提高网页下载速度。它也能帮助减轻服务器负载)

- 当我们页面滑动到可视区域，再显示图片
- 我们使用 jquery 插件库 EasyLazyload。 ==注意，此时的js引入文件和js调用必须写到 DOM元素（图片）最后面==

![](jQuery(二).assets/15.png)



1. 下载插件，并解压插件
2. 打开 index.html，右键 查看网页源代码

![](jQuery(二).assets/16.png)

3. 将其需要引入的 css、js 文件复制到我们自己的网页文件夹中
4. 将其引入的代码复制进我们自己的网页结构中，
5. 在==下载插件页面== 下滑查看使用方法，将 HTML 结构也复制进我们自己的网页结构中

![](jQuery(二).assets/17.png)





## 3.4、全屏滚动插件fullpage.js🔥

GitHub地址：https://github.com/alvarotrigo/fullPage.js

中文翻译网站：https://www.dowebok.com/demo/2014/77/

和上面插件一样，下载解压，查看使用方法即可食用。









| jQuery             | 地址                                                         |
| ------------------ | ------------------------------------------------------------ |
| ①、jQuery,Hold on! | https://blog.csdn.net/Augenstern_QXL/article/details/117707994 |
| ②、jQuery,Hold on! | https://blog.csdn.net/Augenstern_QXL/article/details/119411810 |































































