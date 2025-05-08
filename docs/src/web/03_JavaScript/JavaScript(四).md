# 1.offset

-- 元素偏移量offset：

- `offset `翻译过来就是偏移量
- 我们使用offect 系列相关属性可以**动态的**得到该元素的位置(偏移)，大小等。

1. 获得元素距离带有定位父元素的位置
2. 获得元素自身的大小(宽度高度)
3. ==注意： 返回的数值都不带单位==



| offset系列属性       | 作用                                                         |
| -------------------- | ------------------------------------------------------------ |
| element.offsetParent | 返回作为该元素带有定位的**父级元素**，如果父级都没有定位则返回body |
| element.offsetTop    | 返回元素相对带有定位父元素上方的**偏移**                     |
| element.offsetLeft   | 返回元素相对带有定位元素左边框的**偏移**                     |
| element.offsetWidth  | 返回自身包括padding、border、内容区的宽度、返回数值不带单位  |
| element.offsetHeight | 返回自身包括padding、border、内容区的高度、返回数值不带单位  |



## 1.1offset

- `offset`可以得到任意样式表中的样式值
- `offset`系列获得的数值是没有单位的
- `offsetWidth`包含 padding + border + width
- `offsetWidth` 等属性是只读属性，只能获取不能赋值
- ==所以，我们相要获取元素大小和位置，用offset更合适==



## 1.2style

- `style` 只能得到**行内样式表**中的样式值
- `style.width`获得的是带有单位的字符串
- `style.width`获得不包含padding 和 border 的值
- `style.width`是可读写属性，可以获取也可以赋值
- ==所以，我们相要给元素更改值，用style改变==

```js
<body>
    // css行内样式
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









# 2.client

元素可视区client系列：

- **client**翻译过来就是客户端
- 我们使用client系列的相关属性来获取元素可视区的相关信息，==通过client系列的相关属性可以动态的得到该元素的边框大小，元素大小等==

| client系列属性       | 作用                                                         |
| -------------------- | ------------------------------------------------------------ |
| element.clientTop    | 返回元素上边框的大小                                         |
| element.clientLeft   | 返回元素左边框的大小                                         |
| element.clientWidth  | 返回自身包括padding、内容区的宽度，**不含边框**，返回数值不带单位 |
| element.clientHeight | 返回自身包括padding、内容区的高度，**不含边框**，返回数值不带单位 |





# 3.scroll

- **scroll**翻译过来就是滚动的
- 我们使用scroll系列的相关属性可以动态的得到==该元素的大小，滚动距离==等。

| scroll系列属性       | 作用                                           |
| -------------------- | ---------------------------------------------- |
| element.scrollTop    | 返回被卷去的上侧距离，返回数值不带单位         |
| element.scrollLeft   | 返回被卷去的左侧距离，返回数值不带单位         |
| element.scrollWidth  | 返回自身实际的宽度，不含边框，返回数值不带单位 |
| element.scrollHeight | 返回自身实际的高度，不含边框，返回数值不带单位 |

- 页面被卷去的头部：如果浏览器的高/宽度不足以显示整个页面时，会自动出现滚动条
- 档滚动条向下滚动时，页面上面被隐藏掉的高度，我们就称为页面被全局的头部
- 滚动条在滚动时会触发`onscroll`事件



![image-20210418101124796](D:\学习学习学习\JavaScript\JavaScript(四).assets\image-20210418101124796.png)





# 4.总结

| 三大系列大小对比    | 作用                                                         |
| ------------------- | ------------------------------------------------------------ |
| element.offsetWidth | 返回自身包括padding，border，内容区的宽度，返回数值不带单位  |
| element.clientWidth | 返回自身包括padding，内容区的宽度，**不含border**，返回数值不带单位 |
| element.scrollWidth | 返回自身实际的宽度，不含看睹，返回值不带单位                 |

- offset系列 经常用于获取**元素位置**  `offsetLeft offsetTop`
- client 经常用于获取**元素大小**  `clientWidth clientHeight`
- scroll 经常用于获取滚动元素距离 `scrollTop scrollLeft`
- ==注意：==页面滚动的距离 通过`windwo.pageXOffset `获得





# 5.鼠标事件

`mouseenter`鼠标事件和`mouseover`鼠标事件的区别：

1. 当鼠标移动到元素上时就会触发`mouseenter`事件
2. 类似 `mouseover`，它们两者之间的差别是
   - `mouseover `鼠标经过**自身盒子**会触发，经过**子盒子**还会触发
   - `mousennter `只会经过自身盒子触发
3. 之所以这样，就是因为`mouseenter`不会冒泡
4. 通常`mouseenter`鼠标移动和`mouseleave`鼠标离开搭配使用，同样`mouseleave`也不会冒泡





# 6.动画函数封装

## 6.1动画实现原理

 ==核心原理：==通过定时器`setInterval()`不断移动盒子位置

==实现步骤：==

1. 获得盒子当前位置
2. 让盒子在当前位置加上1个移动距离
3. 利用定时器不断重复这个操作
4. 加一个结束定时器的条件
5. 注意此元素需要添加定位，因为我们是使用`element.style.left`让其加上1个移动距离
   - 只有定位，才能使用`element.style.left`

```html
<body>
    <div></div>
    <script>
        // 动画原理
        // 1. 获得盒子当前位置  
        // 2. 让盒子在当前位置加上1个移动距离
        // 3. 利用定时器不断重复这个操作
        // 4. 加一个结束定时器的条件
        // 5. 注意此元素需要添加定位， 才能使用element.style.left
        var div = document.querySelector('div');
        var timer = setInterval(function() {
            if (div.offsetLeft >= 400) {
                // 停止动画 本质是停止定时器
                clearInterval(timer);
            }
            div.style.left = div.offsetLeft + 1 + 'px';
        }, 30);
    </script>
</body>
```





## 6.2函数封装

-- 注意函数需要传递2个参数

1. **动画对象**
2. **移动到的距离**

```html
<body>
    <div></div>
    <span>夏雨荷</span>
    <script>
        // 简单动画函数封装obj目标对象 target 目标位置
        function animate(obj, target) {
            var timer = setInterval(function() {
                if (obj.offsetLeft >= target) {
                    // 停止动画 本质是停止定时器
                    clearInterval(timer);
                }
                obj.style.left = obj.offsetLeft + 1 + 'px';
            }, 30);
        }
        var div = document.querySelector('div');
        var span = document.querySelector('span');
        // 调用函数
        animate(div, 300);
        animate(span, 200);
    </script>
</body>
```



## 6.3给不同元素记录不同定时器

- 如果多个元素都使用这个动画函数，每次都要var 声明定时器，我们可以给不同的元素使用不同的定时器(自己专门用自己的定时器)
- ==核心原理：利用JS是一门动态语言，可以很方便的给当前对象添加属性==

```html
<body>
    <button>点击夏雨荷才走</button>
    <div></div>
    <span>夏雨荷</span>
    <script>
        // 简单动画函数封装obj目标对象 target 目标位置
        // 给不同的元素指定了不同的定时器
        function animate(obj, target) {
            // 当我们不断的点击按钮，这个元素的速度会越来越快，因为开启了太多的定时器
            // 解决方案就是 让我们元素只有一个定时器执行
            // 先清除以前的定时器，只保留当前的一个定时器执行
            clearInterval(obj.timer);
            obj.timer = setInterval(function() {
                if (obj.offsetLeft >= target) {
                    // 停止动画 本质是停止定时器
                    clearInterval(obj.timer);
                }
                obj.style.left = obj.offsetLeft + 1 + 'px';

            }, 30);
        }

        var div = document.querySelector('div');
        var span = document.querySelector('span');
        var btn = document.querySelector('button');
        // 调用函数
        animate(div, 300);
        btn.addEventListener('click', function() {
            animate(span, 200);
        })
    </script>
</body>
```





## 6.4缓动动画

-- 缓动动画就是让元素运动速度有所变化，最常见的是让速度慢慢停下来

思路：

1. 让盒子每次移动的距离慢慢变小，速度就会慢慢落下来
2. ==核心算法：（目标值 - 现在的位置）/ 10 作为每次移动的距离 步长==

3. 停止的条件：让当前盒子位置等于目标位置就停止定时器
4. 注意步长值需要取整

```html
<body>
    <button>点击夏雨荷才走</button>
    <span>夏雨荷</span>
    <script>
        // 缓动动画函数封装obj目标对象 target 目标位置
        // 思路：
        // 1. 让盒子每次移动的距离慢慢变小， 速度就会慢慢落下来。
        // 2. 核心算法：(目标值 - 现在的位置) / 10 做为每次移动的距离 步长
        // 3. 停止的条件是： 让当前盒子位置等于目标位置就停止定时器
        function animate(obj, target) {
            // 先清除以前的定时器，只保留当前的一个定时器执行
            clearInterval(obj.timer);
            obj.timer = setInterval(function() {
                // 步长值写到定时器的里面
                var step = (target - obj.offsetLeft) / 10;
                if (obj.offsetLeft == target) {
                    // 停止动画 本质是停止定时器
                    clearInterval(obj.timer);
                }
     // 把每次加1 这个步长值改为一个慢慢变小的值  步长公式：(目标值 - 现在的位置) / 10
     //            
                obj.style.left = obj.offsetLeft + step + 'px';

            }, 15);
        }
        var span = document.querySelector('span');
        var btn = document.querySelector('button');

        btn.addEventListener('click', function() {
                // 调用函数
                animate(span, 500);
            })
    </script>
</body>
```

- 匀速动画 就是 盒子是当前的位置 +  固定的值 10
- 缓动动画就是  盒子当前的位置 + 变化的值(**目标值 - 现在的位置) / 10**）
        



## 6.5缓存动画多个目标值之间移动

```html
<body>
    <button class="btn500">点击夏雨荷到500</button>
    <button class="btn800">点击夏雨荷到800</button>
    <span>夏雨荷</span>
    <script>
        // 缓动动画函数封装obj目标对象 target 目标位置
        // 思路：
        // 1. 让盒子每次移动的距离慢慢变小， 速度就会慢慢落下来。
        // 2. 核心算法：(目标值 - 现在的位置) / 10 做为每次移动的距离 步长
        // 3. 停止的条件是： 让当前盒子位置等于目标位置就停止定时器
        function animate(obj, target) {
            // 先清除以前的定时器，只保留当前的一个定时器执行
            clearInterval(obj.timer);
            obj.timer = setInterval(function() {
                // 步长值写到定时器的里面
                // 把我们步长值改为整数 不要出现小数的问题
                // var step = Math.ceil((target - obj.offsetLeft) / 10);
                var step = (target - obj.offsetLeft) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                if (obj.offsetLeft == target) {
                    // 停止动画 本质是停止定时器
                    clearInterval(obj.timer);
                }
                // 把每次加1 这个步长值改为一个慢慢变小的值  步长公式：(目标值 - 现在的位置) / 10
                obj.style.left = obj.offsetLeft + step + 'px';

            }, 15);
        }
        var span = document.querySelector('span');
        var btn500 = document.querySelector('.btn500');
        var btn800 = document.querySelector('.btn800');

        btn500.addEventListener('click', function() {
            // 调用函数
            animate(span, 500);
        })
        btn800.addEventListener('click', function() {
                // 调用函数
                animate(span, 800);
            })
            // 匀速动画 就是 盒子是当前的位置 +  固定的值 10 
            // 缓动动画就是  盒子当前的位置 + 变化的值(目标值 - 现在的位置) / 10）
    </script>
</body>
```



## 6.6缓存动画添加回调函数

==回调函数原理：==

- 函数可以作为一个参数，将这个函数作为参数传到另一个函数里面
- 当那个函数执行完之后，再执行传进去的这个函数，这个过程就叫做回调
- 回调函数写的位置：==定时器结束的位置==

```js
<body>
    <button class="btn500">点击夏雨荷到500</button>
    <button class="btn800">点击夏雨荷到800</button>
    <span>夏雨荷</span>
    <script>
        function animate(obj, target, callback) {
            // console.log(callback);  相当于callback = function() {}  调用的时候写 callback() 即可

            // 先清除以前的定时器，只保留当前的一个定时器执行
            clearInterval(obj.timer);
            obj.timer = setInterval(function() {
                // 步长值写到定时器的里面
                // 把我们步长值改为整数 不要出现小数的问题
                // var step = Math.ceil((target - obj.offsetLeft) / 10);
                var step = (target - obj.offsetLeft) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                if (obj.offsetLeft == target) {
                    // 停止动画 本质是停止定时器
                    clearInterval(obj.timer);
                    // 回调函数写到定时器结束里面
                    if (callback) {
                        // 调用函数
                        callback();
                    }
                }
                obj.style.left = obj.offsetLeft + step + 'px';
            }, 15);
        }

        var span = document.querySelector('span');
        var btn500 = document.querySelector('.btn500');
        var btn800 = document.querySelector('.btn800');
        btn500.addEventListener('click', function() {
            // 调用函数
            animate(span, 500);
        })
        btn800.addEventListener('click', function() {
                // 调用函数
                animate(span, 800, function() {
                    // alert('你好吗');
                    span.style.backgroundColor = 'red';
                });
            })
    </script>
</body>
```



## 6.7动画函数封装到JS文件

1. 新建一个JS文件： `animate.js`
2. HTML文件引入JS文件











# 7.本地存储

-- 本地存储特性：

1. 数据存储在用户浏览器中
2. 设置、读取方便、甚至页面刷新不丢失数据
3. 容量较大、sessionStrorage 约5M，localStrage约20M
4. 只能存储字符串，可以讲对象JSON。stringfy()编码后存储



- 生命周期为关闭浏览器窗口
- 在同一个窗口(页面)下数据可以共享
- 以键值对的形式存储使用





## 7.1window.sessionStorage

1. **存储数据**

   ```js
   sessionStorage.setItem(key,value)
   ```

2. **获取数据**

   ```js
   sessionStorage.getItem(key)
   ```

3. **删除数据**

   ```js
   sessionStorage.removeItem(key)
   ```

4. **删除所有数据**

   ```js
   sessionStorage.clear()
   ```

   

```js
<body>
    <input type="text">
    <button class="set">存储数据</button>
    <button class="get">获取数据</button>
    <button class="remove">删除数据</button>
    <button class="del">清空所有数据</button>
    <script>
        console.log(localStorage.getItem('username'));

        var ipt = document.querySelector('input');
        var set = document.querySelector('.set');
        var get = document.querySelector('.get');
        var remove = document.querySelector('.remove');
        var del = document.querySelector('.del');
        set.addEventListener('click', function() {
            // 当我们点击了之后，就可以把表单里面的值存储起来
            var val = ipt.value;
            sessionStorage.setItem('uname', val);
            sessionStorage.setItem('pwd', val);
        });
        get.addEventListener('click', function() {
            // 当我们点击了之后，就可以把表单里面的值获取过来
            console.log(sessionStorage.getItem('uname'));

        });
        remove.addEventListener('click', function() {
            // 
            sessionStorage.removeItem('uname');

        });
        del.addEventListener('click', function() {
            // 当我们点击了之后，清除所有的
            sessionStorage.clear();

        });
    </script>
</body>
```



## 7.2window.localStorage

1. 声明周期永久生效，除非手动删除，否则关闭页面也会存在

2. 可以多窗口（页面）共享（同一浏览器可以共享）

3. 以键值对的形式存储使用





1. **存储数据：**

```
localStorage.setltem(key,value)
```

2. **获取数据：**

```
localStorage.getltem(key)
```

3. **删除数据：**

```
localStorage.removeltem(key)
```

4. **删除所有数据：**

```
localStorage.clear()
```



```js
<body>
    <input type="text">
    <button class="set">存储数据</button>
    <button class="get">获取数据</button>
    <button class="remove">删除数据</button>
    <button class="del">清空所有数据</button>
    <script>
        var ipt = document.querySelector('input');
        var set = document.querySelector('.set');
        var get = document.querySelector('.get');
        var remove = document.querySelector('.remove');
        var del = document.querySelector('.del');
        set.addEventListener('click', function() {
            var val = ipt.value;
            localStorage.setItem('username', val);
        })
        get.addEventListener('click', function() {
            console.log(localStorage.getItem('username'));

        })
        remove.addEventListener('click', function() {
            localStorage.removeItem('username');

        })
        del.addEventListener('click', function() {
            localStorage.clear();

        })
    </script>
</body>
```





