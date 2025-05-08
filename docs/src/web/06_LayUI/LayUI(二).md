# LayUI

# 1、弹出层

## 1.1、弹出层

弹出层官方文档：https://www.layui.com/doc/modules/layer.html#use

layer可以独立使用，也可以通过Layui模块化使用

| 场景               | 用前准备                                                     | 调用方式                                   |
| ------------------ | ------------------------------------------------------------ | ------------------------------------------ |
| 1.作为独立组件使用 | 如果你只是单独想使用 layer，你可以去 [layer](http://layer.layui.com/) 独立版本官网下载组件包。你需要在你的页面引入*jQuery*1.8以上的任意版本，并引入*layer.js*。 | 通过script标签引入layer.js后，直接用即可。 |
| 2.layui 模块化使用 | 如果你使用的是 layui，那么你直接在官网下载 layui 框架即可，无需引入 jQuery 和 layer.js，但需要引入*layui.css*和*layui.js* | 通过*layui.use('layer', callback)*加载模块 |

### 1.1.1、作为独立组件使用

1. 首先去 [layer](http://layer.layui.com/) 独立版本官网下载组件包。

![](LayUI(二).assets/1.png)

2. 下载完成后解压，将 `layer.js` 和 `layer.css` 拷贝到我们的项目中
3. 引入资源

```html
<!-- 引入layer.css -->
<link rel="stylesheet" href="layer/layer.css" />
<!-- 引入jquery.js -->
<script src="js/jquery-3.4.1.js" charset="utf-8"></script>
<!-- 引入layer.js -->
<script src="layer/layer.js"></script>
```

4. 开始使用

```html
<body>
    <script type="text/javascript">
        layer.msg("Hello");
    </script>
</body>
```



### 1.1.2、使用模块化🔥

1. 引入资源

```html
<!-- layui模块化使用 -->
<!-- 引入 layui.css -->
<link rel="stylesheet" href="layui-v2.5.6/layui/css/layui.css" />
<!-- 引入 layui.js -->
<script src="layui-v2.5.6/layui/layui.js"></script>
```

2. 在 script 中使用 layui.use() 加载模块
   - 依赖模块：layer

```html
<body>

    <script type="text/javascript">
        //加载模块
        layui.use('layer', function() {
            var layer = layui.layer;

            layer.msg("Hello World!");
        })
    </script>
</body>
```

## 1.2、基础参数

### 1.2.1、type 基本层类型

- 类型 Number ， 默认为0
- layer 提供了5 种层类型。可传入的值有
  - 0 ➡ 信息框，默认
  - 1 ➡ 页面层
  - 2 ➡ iframe层
  - 3 ➡ 加载层
  - 4 ➡ tips层
- 若采用 `layer.open({type:1})` 方式调用，则 type 为必填项(信息框除外)



### 1.2.2、title标题

- 类型：String/Array/Boolean，默认 =='信息'==
- title 支持三种类型的值
  - 若传入的是普通的字符串，如：`title:'我是标题'` ，那么只会改变标题文本；
  - 若需要自定义标题区域样式，`title:['文本','font-size: 18px']`，数组第二项可以写任意css 样式
  - 若不想显示标题栏，`title: false`

```html
<script type="text/javascript">
    //加载模块
    layui.use('layer', function() {
        var layer = layui.layer;

        /* 信息框 */
        layer.open({
            type: 0,						  // 0为信息框
            title:"系统消息",
            // title: false,  				   //不显示标题
            // title: ['标题', 'color:red;'],   // 自定义标题区域样式
            
            // content可以传入任意的文本或html
            content: "Hello"
        });
    })
</script>
```

### 1.2.3、area宽高

- 类型： String/Array，默认为`auto`
- 在默认状态下，layer是宽高都自适应的
  - 但当你只想定义宽度时，你可以 `area: '500px'`，高度仍然是自适应的
  - 当你宽高都要定义时，你可以 `area: ['500px', '300px']`

### 1.2.4、btn按钮

- 类型：String/Array，默认 '确认'
- 信息框(type = 0)模式时，btn默认是一个确认按钮，其它层类型则默认不显示，加载层和tips层则无效。
- 当您只想自定义一个按钮时，你可以 `btn: '我知道了'`，当你要定义两个按钮时，你可以`btn: ['yes', 'no']`
- 当然，你也可以定义更多按钮，比如：`btn: ['按钮1', '按钮2', '按钮3', …]`，按钮1的回调是yes，而从按钮2开始，则回调为`btn2: function(){}`，以此类推

```html
<body>


    <script type="text/javascript">
        layui.use('layer', function() {
            var layer = layui.layer;

            layer.msg('你愿意和我做朋友么？', {
                time: 0, //不自动关闭
                btn: ['当然愿意', '狠心拒绝'], // [按钮1,按钮2]
                
                // 按钮1的回调函数
                yes: function(index) {
                    layer.close(index); // 关闭当前弹出框
                    layer.msg('新朋友，你好！', {
                        icon: 6, // 图标
                        btn: ['开心', '快乐']
                    });
                },
                
                // 按钮2的回调函数
                btn2: function(index) {
                    layer.close(index); // 关闭当前弹出框
                    layer.msg('好吧,再见!', {
                        icon: 5,
                        btn: '88'
                    })
                }
            });

        })
    </script>
</body>
```

![](LayUI(二).assets/7.png)



### 1.2.5、time自动关闭所需毫秒

- 类型：Number，默认为0
- 默认不会关闭。当你想关闭时，可以 `time:5000` ，即代表 5 s 后自动关闭









### 1.2.6、content内容

- 类型：String/DOM/Array，默认 : " "
- content 可传入的值是灵活多变的，不仅可以传入普通的 html 内容，还可以指定DOM，更可以随着 type 的不同而不同
  - 页面层 ,就是信息提示
  - iframe 弹出来的是页面,例如百度页面
  - tips 就是一个信息提示小框

```html
<script type="text/javascript">
    //加载模块
    layui.use('layer', function() {
        var layer = layui.layer;

        /* 页面层 */
        layer.open({
            type: 1,
            title: "系统消息",
            // content可以传入任意的文本或html
            content: "<div style='height:200px;width:400px'>Hello</div>"
        });
        
        /* iframe层 */
        layer.open({
            type: 2,
            title: "系统消息",
            // content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['url', 'no']
            content: "http://www.baidu.com",
            // content:["http://www.baidu.com",'no'],
            // area: '500px' ,// 设置宽度，高度自适应
            area: ['800px', '400px'] // 设置宽高   
        });
        
        
    })
</script>
```

---

```html
<body>

    <span>内容1</span>
    <span>内容2</span>
    <span>内容3</span>
    <span id="sp">内容4</span>
    <script type="text/javascript">
        layui.use('layer', function() {
            var layer = layui.layer;
            /* tips层 */
            layer.open({
                type: 4,
                content: ['内容', '#sp'] //数组第二项即吸附元素选择器或者DOM
            });

        })
    </script>
</body>
```

![](LayUI(二).assets/2.png)





### 1.2.7、icon图标

* 类型：Number，默认：-1(信息框)  / 0(加载层)
* 信息框默认不显示图标。当你想显示图标时，默认皮肤可以传入*0-6*
* 如果是加载层，可以传入*0-2*

```html
<body>
    <script type="text/javascript">
        layui.use('layer', function() {
            var layer = layui.layer;
            //加载层
            layer.alert('酷毙了', {
                icon: 1				// 0 ~ 6 均可填
            });

        })
    </script>
</body>
```

![](LayUI(二).assets/3.png)



```html
<body>
    <script type="text/javascript">
        layui.use('layer', function() {
            var layer = layui.layer;
            //信息层
            layer.msg('不开心。。', {
                icon: 5				// -1 ~ 6 均可填
            });

        })
    </script>
</body>
```

![](LayUI(二).assets/4.png)

```html
<body>
    <script type="text/javascript">
        layui.use('layer', function() {
            var layer = layui.layer;
			// 加载层
            layer.load(1); 		// 0 ~ 2 均可填

        })
    </script>
</body>
```

![](LayUI(二).assets/5.png)

我们的信息框还可以参与互动响应,会有多个选项可选：

```html
<body>
    <script type="text/javascript">
        layui.use('layer', function() {
            var layer = layui.layer;
            layer.msg('你愿意和我做朋友么？', {
                time: 0, //第一个弹出层不自动关闭(因为默认弹出层会5s自动关闭)
                btn: ['当然愿意', '狠心拒绝'], // 按钮
                yes: function(index) {
                    layer.close(index); // 关闭当前弹出框
                    layer.msg('新朋友，你好！', {
                        icon: 6, // 图标
                        btn: ['开心', '快乐']
                    });
                }
            });

        })
    </script>
</body>
```

![](LayUI(二).assets/6.png)





## 1.3、核心方法

### 1.3.1、layer.open(options)

- 原始核心方法

- 创建任何类型的弹层都会返回一个当前层索引，上述的 *options* 即是基础参数

```html
<body>
    <script type="text/javascript">
        layui.use('layer', function() {
            var layer = layui.layer;

            var index = layer.open({
                content: 'test'
            });
            console.log(index);
            //拿到的index是一个重要的凭据，它是诸如layer.close(index)等方法的必传参数。

        })
    </script>
</body>
```



### 1.3.2、layer.alert()

- 普通信息框

```html
<script type="text/javascript">
    layui.use('layer', function() {
        var layer = layui.layer;

        //eg1
        //layer.alert('只想简单的提示');
        //eg2
        layer.alert('加了个图标', {
            icon: 1
        });


    })
</script>
```



### 1.3.3、layer.msg()

- 提示框
- 默认是 3s 关闭

```html
<script type="text/javascript">
	layui.use('layer', function() {
        var layer = layui.layer;

        //eg1
        layer.msg('只想弱弱提示');
        //eg2
        layer.msg('有表情地提示', {
            icon: 6
        });
        //eg3
        layer.msg('关闭后想做些什么', function() {
            //do something
        });
        //eg
        layer.msg('同上', {
            icon: 1,
            time: 2000 //2秒关闭（如果不配置，默认是3秒）
        }, function() {
            //do something
        });
</script>
```

### 1.3.4、layer.load()

- 加载层
- 加载层默认是不会自动关闭的

```html
<script type="text/javascript">
    layui.use('layer', function() {
        var layer = layui.layer;
        //eg1
        var index = layer.load();
        //eg2
        var index = layer.load(1); //换了种风格
        //eg3
        var index = layer.load(2, {
            time: 10 * 1000
        }); //又换了种风格，并且设定最长等待10秒 
        
        //关闭
        layer.close(index);
</script>
```





# 2、日期与时间选择

日期与时间选择官方文档：https://www.layui.com/doc/modules/laydate.html

和 layer 一样，你可以在 layui 中使用 layDate，也可直接使用 layDate 独立版

| 场景                   | 用前准备                                                     | 调用方式                                                   |
| ---------------------- | ------------------------------------------------------------ | ---------------------------------------------------------- |
| 1. 在 layui 模块中使用 | 下载 layui 后，引入*layui.css*和*layui.js*即可               | 通过*layui.use('laydate', callback)*加载模块后，再调用方法 |
| 2. 作为独立组件使用    | 去 [layDate](http://www.layui.com/laydate/) 独立版本官网下载组件包，引入 laydate.js 即可 | 直接调用方法使用                                           |

我们使用模块化使用

1. 引入资源

```html
<!-- layui模块化使用 -->
<!-- 引入 layui.css -->
<link rel="stylesheet" href="layui-v2.5.6/layui/css/layui.css" />
<!-- 引入 layui.js -->
<script src="layui-v2.5.6/layui/layui.js"></script>
```

2. 在 script 中使用 layui.use() 加载模块
   - 依赖模块：laydate

```html
<body>
    <!-- 用一个容器元素放我们的日期时间选择器 -->
    <div class="layui-inline">
        <input type="text" class="layui-input" id="date1" />
    </div>
    <script type="text/javascript">
        layui.use('laydate', function() {
            var laydate = layui.laydate;
            // 加载 laydate 实例
            laydate.render({
                elem: "#date1" //绑定id为date1的元素
            })

        })
    </script>
</body>
```

![](LayUI(二).assets/8.png)



## 2.1、基础参数

### 2.1.0、基础参数选项

* 通过核心方法：*laydate.render(options)* 来设置基础参数，

### 2.1.1、elem绑定元素

- 类型：String/DOM ，默认值：无
- 必填项，用于执行绑定日期渲染的元素，值一般为选择器，或DOM对象

```html
<script>
	layui.use('laydate',function(){
        var laydate = layui.laydate;
        laydate.render({
            elem: '#test' //或 elem: document.getElementById('test')、elem: lay('#test') 等
        })
    })

</script>
```



### 2.1.2、type控件选择类型

- 类型：String ，默认值：date
- 用于单独提供不同的选择器类型，可选值如下表

| type可选值 | 名称           | 用途                                       |
| ---------- | -------------- | ------------------------------------------ |
| year       | 年选择器       | 只提供年列表选择                           |
| month      | 年月选择器     | 只提供年、月选择                           |
| date       | 日期选择器     | 可选择：年、月、日。type默认值，一般可不填 |
| time       | 时间选择器     | 只提供时、分、秒选择                       |
| datetime   | 日期时间选择器 | 可选择：年、月、日、时、分、秒             |



```html
<body>
    <!-- 用一个容器元素放我们的日期时间选择器 -->
    <div class="layui-inline">
        <input type="text" class="layui-input" id="date1" />
    </div>
    <div class="layui-inline">
        <input type="text" class="layui-input" id="date2" />
    </div>
    <div class="layui-inline">
        <input type="text" class="layui-input" id="date3" />
    </div>
    <div class="layui-inline">
        <input type="text" class="layui-input" id="date4" />
    </div>
    <div class="layui-inline">
        <input type="text" class="layui-input" id="date5" />
    </div>
    <div class="layui-inline">
        <input type="text" class="layui-input" id="date6" />
    </div>


    <script type="text/javascript">
        layui.use('laydate', function() {
            var laydate = layui.laydate;
            // 加载 laydate 实例
            laydate.render({
                elem: "#date1", //绑定id为date1的元素

            });

            laydate.render({
                elem: "#date2", //绑定id为date2的元素
                type: "year", // 年选择器
            });

            laydate.render({
                elem: "#date3", //绑定id为date3的元素
                type: "month" // 年月选择器
            });

            laydate.render({
                elem: "#date4", //绑定id为date4的元素
                type: "date" // 年月日选择器
            });

            laydate.render({
                elem: "#date5", //绑定id为date5的元素
                type: "time" // 时间（时分秒）选择器
            });

            laydate.render({
                elem: "#date6", //绑定id为date6的元素
                type: "datetime" // 年月日时分秒选择器
            });

        })
    </script>
</body>
```





### 2.1.3、format自定义格式

- 类型：String，默认值：yyyy-MM-dd
- 通过日期时间各自的格式符和长度，来设定一个你所需要的日期格式。layDate 支持的格式如下：

| 格式符 | 说明                                             |
| ------ | ------------------------------------------------ |
| yyyy   | 年份，至少四位数。如果不足四位，则前面补零       |
| y      | 年份，不限制位数，即不管年份多少位，前面均不补零 |
| MM     | 月份，至少两位数。如果不足两位，则前面补零。     |
| M      | 月份，允许一位数。                               |
| dd     | 日期，至少两位数。如果不足两位，则前面补零。     |
| d      | 日期，允许一位数。                               |
| HH     | 小时，至少两位数。如果不足两位，则前面补零。     |
| H      | 小时，允许一位数。                               |
| mm     | 分钟，至少两位数。如果不足两位，则前面补零。     |
| m      | 分钟，允许一位数。                               |
| ss     | 秒数，至少两位数。如果不足两位，则前面补零。     |
| s      | 秒数，允许一位数。                               |

通过上述不同的格式符组合成一段日期时间字符串，可任意排版，如下所示

| 格式                         | 示例值                        |
| ---------------------------- | ----------------------------- |
| yyyy-MM-dd HH:mm:ss          | 2017-08-18 20:08:08           |
| yyyy年MM月dd日 HH时mm分ss秒  | 2017年08月18日 20时08分08秒   |
| yyyyMMdd                     | 20170818                      |
| dd/MM/yyyy                   | 18/08/2017                    |
| yyyy年M月                    | 2017年8月                     |
| M月d日                       | 8月18日                       |
| 北京时间：HH点mm分           | 北京时间：20点08分            |
| yyyy年的M月某天晚上，大概H点 | 2017年的8月某天晚上，大概20点 |

```html
<body>
    <!-- 用一个容器元素放我们的日期时间选择器 -->
    <div class="layui-inline">
        <input type="text" class="layui-input" id="date1" />
    </div>


    <script type="text/javascript">
        // 加载laydate模块
        layui.use('laydate', function() {
            var laydate = layui.laydate;
            //自定义日期格式
            laydate.render({
                elem: '#date1',
                format: 'yyyy/MM月dd日' // yyyy年MM月dd日可任意组合
            });
        });
    </script>
</body>
```

![](LayUI(二).assets/9.png)





### 2.1.4、value初始值

- 类型：String，默认值：new Date()
- 支持传入符合format参数设定的日期格式字符，或者 new Date()

```html
<script type="text/javascript">
    // 加载laydate模块
    layui.use('laydate', function() {
        var laydate = layui.laydate;
        // 传入符合format格式的字符给初始值
        laydate.render({
            elem: '#date1',
            value: '2018-08-18' //必须遵循format参数设定的格式
        });
        // 传入Date对象给初始值
        laydate.render({
            elem: '#date2',
            value: new Date(1534766888000) //参数即为：2018-08-20 20:08:08 的时间戳
        });
    });
</script>
```



### 2.1.5、lang语言

- 类型：String，默认：cn
- 内置了两种语言版本：*cn*（中文版）、*en*（国际版，即英文版）。

```html
<script type="text/javascript">
    // 加载laydate模块
    layui.use('laydate', function() {
        var laydate = layui.laydate;
        laydate.render({
            elem: '#date1',
            lang: 'en'
        });

    });
</script>
```



### 2.1.6、theme主题

- 类型：String ，默认值：default
- 内置了多种主题，theme的可选值有：*default*（默认简约）、*molv*（墨绿背景）、*#颜色值*（自定义颜色背景）、*grid*（格子主题）

```html
<script type="text/javascript">
    // 加载laydate模块
    layui.use('laydate', function() {
        var laydate = layui.laydate;
        laydate.render({
            elem: '#date1',
            theme: 'molv'
        });

    });
</script>
```



### 2.1.7、calendar公历节日

- 类型：Boolean，默认值：false
- 内置了一些我国通用的公历重要节日，通过设置 *true* 来开启。国际版不会显示

```html
<script type="text/javascript">
    // 加载laydate模块
    layui.use('laydate', function() {
        var laydate = layui.laydate;
        laydate.render({
            elem: '#date1',
            lang: 'cn',
            calendar: true
        });

    });
</script>
```





# 3、分页

- 分页官方文档：https://www.layui.com/doc/modules/laypage.html

- 模块加载名称：`laypage`

- laypage 的使用非常简单，指向一个用于存放分页的容器，通过服务端得到一些初始值，即可完成分页渲染

```html
<body>
    <div id="page"></div>
    <script type="text/javascript">
        // 加载laypage模块
        layui.use('laypage', function() {
            var laypage = layui.laypage;
            // 加载laypage实例
            laypage.render({
                elem: "page", // elem属性绑定的是容器的ID属性值，不需要加#
                count: 100, // 总数量，一般是从服务器获取
            });

        });
    </script>
</body>
```

![](LayUI(二).assets/10.png)



## 3.1、基础参数

### 3.1.1、基础参数选项

- 通过核心方法：*laypage.render(options)* 来设置基础参数

### 3.1.2、elem绑定元素

- 类型：String/Object，比填项

- elem 指向存放分页的容器，值可以是 容器 ID、DOM对象
  - `elem: 'id'` ==注意==：这里不能加 `#` 号
  - `elem: document.getElementById('id')`



### 3.1.3、count数据总数

- 类型：Number，必填项
- 数据总数，一般通过服务端得到
- `count: 100`

```html
<body>
    <div id="page"></div>
    <script type="text/javascript">
        // 加载laydate模块
        layui.use('laypage', function() {
            var laypage = layui.laypage;
            // 加载laypage实例
            laypage.render({
                elem: "page", // elem属性绑定的是容器的ID属性值，不需要加#
                count: 100, // 总数量，一般是从服务器获取的
            });
        });
    </script>
</body>
```

![](LayUI(二).assets/11.png)

### 3.1.4、limit每页显示条数

- 类型：Number，默认值 10
- laypage将会借助 count 和 limit 计算出分页数。

```html
<body>
    <div id="page"></div>

    <script type="text/javascript">
        // 加载laydate模块
        layui.use('laypage', function() {
            var laypage = layui.laypage;
            // 加载laypage实例
            laypage.render({
                elem: "page", // elem属性绑定的是容器的ID属性值，不需要加#
                count: 100, // 总数量，一般是从服务器获取
                limit: 5, // 每页显示的数量
            });
        });
    </script>
</body>
```

![](LayUI(二).assets/12.png)



### 3.1.5、layout自定义排版

- 类型：Array，默认值：['prev', 'page', 'next']
- 自定义排版，可选值有：
  - count ：总条目输出区域
  - limit：条目选项区域
  - prev：上一页区域
  - page：分页区域
  - next：下一页区域
  - refresh：页面刷新区域(layui 2.3.0新增)
  - skip：快捷跳页区域

```html
<body>
    <div id="page"></div>

    <script type="text/javascript">
        // 加载laydate模块
        layui.use('laypage', function() {
            var laypage = layui.laypage;
            // 加载laypage实例
            laypage.render({
                elem: "page", // elem属性绑定的是容器的ID属性值，不需要加#
                count: 100, // 总数量，一般是从服务器获取
                layout: ['prev', 'page', 'next', 'limit', 'skip', 'count', 'refresh']
            });
        });
    </script>
</body>
```

![](LayUI(二).assets/13.png)



### 3.1.6、limits每页条数的选择项

- 类型：Array，默认值：[10,20,30,40,50]
- 如果 layout 参数开启了 limit，则会出现每页条数的select下拉选择框

```html
<body>
    <div id="page"></div>

    <script type="text/javascript">
        // 加载laydate模块
        layui.use('laypage', function() {
            var laypage = layui.laypage;
            // 加载laypage实例
            laypage.render({
                elem: "page", // elem属性绑定的是容器的ID属性值，不需要加#
                count: 100, // 总数量，一般是从服务器获取
                //limit: 5, // 每页显示的数量
                limits: [5, 10, 20, 30], // 每页条数的选择项
                layout: ['prev', 'page', 'next', 'limit', 'skip', 'count', 'refresh']
            });

        });
    </script>
</body>
```

![](LayUI(二).assets/14.png)



### 3.1.7、groups连续出现的页码个数

- 类型：Number，默认值为5
- 连续出现的页面个数，就是分页区域省略号...之前显示的页面个数

```html

<body>
    <div id="page"></div>

    <script type="text/javascript">
        // 加载laydate模块
        layui.use('laypage', function() {
            var laypage = layui.laypage;
            // 加载laypage实例
            laypage.render({
                elem: "page", // elem属性绑定的是容器的ID属性值，不需要加#
                count: 100, // 总数量，一般是从服务器获取
                groups: 7, // 连续显示的页码数
            });
        });
    </script>
</body>
```

![](LayUI(二).assets/15.png)















## 3.2、jump切换分页的回调

- 当分页被切换时触发，函数返回两个参数：*obj*（当前分页的所有选项值）、first（是否首次，一般用于初始加载的判断）

```html
<body>
    <div id="page"></div>

    <script type="text/javascript">
        // 加载laydate模块
        layui.use('laypage', function() {
            var laypage = layui.laypage;
            // 加载laypage实例
            laypage.render({
                elem: "page", // elem属性绑定的是容器的ID属性值，不需要加#
                count: 100, // 总数量，一般是从服务器获取
                groups: 7, // 连续显示的页码数
                layout: ['prev', 'page', 'next', 'limit', 'skip', 'count', 'refresh'],
            });

            laypage.render({
                elem: 'page',
                count: 100, //数据总数，从服务端得到
                groups: 10, // 连续出现的页码个数
                layout: ['prev', 'page', 'next', 'limit', 'count'], // 自定义排版
                limits: [5, 10, 20], // layout属性设置了limit值，可会出现条数下拉选择框
                jump: function(obj, first) {
                    // obj包含了当前分页的所有参数，比如：
                    console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                    console.log(obj.limit); //得到每页显示的条数
                    //首次不执行
                    if (!first) {
                        //do something
                    }
                }
            });

        });
    </script>
</body>
```

![](LayUI(二).assets/16.png)



# 4、数据表格

- 支持固定表头、固定行、固定列左/列右，支持拖拽改变列宽度，支持排序，支持多级表头，支持单元格的自定义模板，支持对表格重载（比如搜索、条件筛选等），支持复选框，支持分页，支持单元格编辑等等一些列功能。

- 模块加载名称：`table`

1. 引入资源

```html
<!-- layui模块化使用 -->
<!-- 引入 layui.css -->
<link rel="stylesheet" href="layui-v2.5.6/layui/css/layui.css" />
<!-- 引入 layui.js -->
<script src="layui-v2.5.6/layui/layui.js"></script>
```

2. 在页面放置一个元素，然后通过 `table.render()` 方法指定该容器

```html
<body>
    <!-- 准备容器（标签），设置id属性值 -->
    <div id="demo"></div>

    <script type="text/javascript">
        // 加载table模块
        layui.use('table', function() {
            var table = layui.table;
            // 加载table实例
            table.render({
                elem: "#demo", //elem属性用来绑定容器的id属性值
                url: "js/user.json", // 数据接口
                cols: [
                    [{
                        field: 'id',
                        title: '用户编号',
                        sort: true,
                        width: 120
                    }, {
                        field: 'username',
                        title: '用户姓名',
                        width: 100
                    }, {
                        field: 'sex',
                        title: '性别',
                        width: 100,
                        sort: true
                    }, {
                        field: 'city',
                        title: '城市',
                        width: 100
                    }, {
                        field: 'sign',
                        title: '签名'
                    }]
                ],
            })

        })
    </script>
</body>
```

![](LayUI(二).assets/17.png)



注意：上面有一个数据接口 url，通常是从服务器获取。我们这里先本地模拟一些json数据传入

```json
{
	"code": 0,
	"msg": "",
	"count": 50,
	"data": [{
			"id": 10000,
			"username": "user-0",
			"sex": "女",
			"city": "城市-0",
			"sign": "签名-0"			
		},
		{
			"id": 10001,
			"username": "user-1",
			"sex": "男",
			"city": "城市-1",
			"sign": "签名-1"
		},
		{
			"id": 10002,
			"username": "user-2",
			"sex": "女",
			"city": "城市-2",
			"sign": "签名-2"
		},
		{
			"id": 10003,
			"username": "user-3",
			"sex": "女",
			"city": "城市-3",
			"sign": "签名-3"
		},
		{
			"id": 10004,
			"username": "user-4",
			"sex": "男",
			"city": "城市-4",
			"sign": "签名-4"
		}

	]
}
```

## 4.1、三种初始化渲染方式

|      | 方式                                                         | 机制                   | 适用场景                                                     |
| ---- | ------------------------------------------------------------ | ---------------------- | ------------------------------------------------------------ |
| 01.  | [方法渲染](https://www.layui.com/doc/modules/table.html#methodRender) | 用JS方法的配置完成渲染 | （推荐）无需写过多的 HTML，在 JS 中指定原始元素，再设定各项参数即可。 |
| 02.  | [自动渲染](https://www.layui.com/doc/modules/table.html#autoRender) | HTML配置，自动渲染     | 无需写过多 JS，可专注于 HTML 表头部分                        |
| 03.  | [转换静态表格](https://www.layui.com/doc/modules/table.html#parseTable) | 转化一段已有的表格元素 | 无需配置数据接口，在JS中指定表格元素，并简单地给表头加上自定义属性即可 |

### 4.1.1、方法渲染🔥

```html
<body>
    <div id="demo"></div>

    <script type="text/javascript">
        layui.use('table',function(){
            var table = layui.table;

            table.render({
                elem: "#demo",
                url: 'js/user.json', // 数据接口
                height: 315, // 容器高度
                page:true, // 开启分页
                cols: [[  // 设置表头
                    {field: 'id', title: 'ID'},
                    {field: 'username', title: '用户名'},
                    {field: 'sex', title: '性别'}
                ]]
            })
        })
    </script>
</body>
```

![](LayUI(二).assets/18.png)



### 4.1.2、自动渲染

- 所谓的自动渲染，即：在一段 table 容器中配置好相应的参数，由 table 模块内部自动对其完成渲染，而无需写初始的渲染方法。我们需要关注的是以下三点
  - 带有 `class="layui-table"` 的 `<table>` 标签
  - 对标签设置属性 `lay-data=" "` 用于配置一些基础参数
  - 在 `<th>` 标签中设置属性 `lay-data=" "` 用于配置表头信息。

```html
<body>
    <table class="layui-table" lay-data="{height:315, url:'js/user.json', page:true, id:'test'}" lay-filter="test">
        <thead>
            <tr>
                <th lay-data="{field:'id', width:80, sort: true}">ID</th>
                <th lay-data="{field:'username', width:80}">用户名</th>
                <th lay-data="{field:'sex', width:80, sort: true}">性别</th>
                <th lay-data="{field:'city'}">城市</th>
                <th lay-data="{field:'sign'}">签名</th>
                <th lay-data="{field:'experience', sort: true}">积分</th>
                <th lay-data="{field:'score', sort: true}">评分</th>
                <th lay-data="{field:'classify'}">职业</th>
                <th lay-data="{field:'wealth', sort: true}">财富</th>
            </tr>
        </thead>
    </table>


    <script type="text/javascript">
        layui.use('table', function() {
            var table = layui.table;

        })
    </script>
</body>
```

![](LayUI(二).assets/19.png)















## 4.2、基础参数

- 基础参数官方文档：https://www.layui.com/doc/modules/table.html#options
- 官方文档参数很多，我们不必记忆，只要会查会用即可



### 4.2.1、elem绑定元素

- 类型：String/DOM
- 指定原始 table 容器的选择器或 DOM，方法渲染方式为必填

### 4.2.2、cols设置表头

表头参数官方文档：https://www.layui.com/doc/modules/table.html#cols

- 类型：Array

- 设置表头，值是一个二维数组。表头参数设定在数组内，表头部分参数如下：

| 参数     | 类型          | 说明                                                         | 示例值         |
| -------- | ------------- | ------------------------------------------------------------ | -------------- |
| field    | String        | 设定字段名。非常重要，与表格数据列要一一对应                 | username       |
| title    | String        | 设定标题名称                                                 | 用户名         |
| width    | Number/String | 设定列宽，若不填写，则自动分配；若填写，则支持值为：数字、百分比。 | 200<br/>30%    |
| type     | String        | 设定列类型。可选值有：<br />normal（常规列，无需设定）<br />checkbox（复选框列）<br />radio（单选框列，layui 2.4.0 新增）<br />numbers（序号列）<br />space（空列） | 任意一个可选值 |
| sort     | Boolean       | 是否允许排序（默认：false）。如果设置 true，则在对应的表头显示排序icon，从而对列开启排序功能。 | true           |
| unresize | Boolean       | 是否禁用拖拽列宽（默认：false）。默认情况下会根据列类型（type）来决定是否禁用，如复选框列，会自动禁用。而其它普通列，默认允许拖拽列宽，当然你也可以设置 true 来禁用该功能。 | false          |
| edit     | String        | 单元格编辑类型（默认不开启）目前只支持：*text*（输入框）     | text           |



### 4.2.3、url异步数据参数

官方文档：https://www.layui.com/doc/modules/table.html#async

- 还是一句话，不必记忆，会查会用会修改即可



## 4.3、page开启分页

- 类型：Boolean/Object，开启分页(默认为 false)
- 支持传入一个对象，里面可包含 laypage 组件所有支持的参数(jump、elem除外)

```html
<body>
    <!-- 准备一个容器,设置id属性值 -->
    <table id="demo"></table>
    <script type="text/javascript">
        // 加载 table 模块
        layui.use('table', function() {
            var table = layui.table;
            // 加载table 实例
            table.render({
                elem: "#demo",      // elem属性用来绑定容器的 id 属性值
                url: "js/user.json",// 数据接口
                cols:[[
                    // 设置序列号
                    {field:'aa',type:"numbers"},
                    // 设置复选框列
                    {field:'bb',type:"checkbox"},
                    {field:'id',title:'用户编号',sort:true,width:120},
                    {field:'username',title:'用户姓名',width:100},
                    {field:'sex',title:'性别',width:100,sort:true},
                    {field:'city',title:'城市',width:100},
                    {field:'sign',title:'签名'}
                ]],
                // 开启分页
                page: true
            })
        })
    </script>
</body>
```

![](LayUI(二).assets/20.png)



## 4.4、toolbar开启表格头部工具栏

- 类型：String/DOM/Boolean，开启表格头部工具栏，该参数支持四种类型值
  - `toolbar: '#toolbarDemo' ` *指向自定义工具栏模板选择器*
  - `toolbar: '<div>xxx</div>'` *直接传入工具栏模板字符*
  - `toolbar: true ` *仅开启工具栏，不显示左侧模板*
  - `toolbar: 'default'` *让工具栏左侧显示默认的内置模板*



```html
<body>
    <div id="demo"></div>

    <!-- 表格工具栏 -->
    <script type="text/html" id="toolbarDemo">
        <div class="layui-btn-container">
            <!-- lay-event 给元素绑定事件名 -->
            <button class="layui-btn layui-btn-sm" lay-event="getCheckData">
                获取选中行数据
            </button>
            <button class="layui-btn layui-btn-sm" lay-event="getCheckLength">
                获取选中数目
            </button>
            <button class="layui-btn layui-btn-sm" lay-event="isAll">
                验证是否全选
            </button>
        </div>
    </script>

    <!-- 表头工具栏 -->
    <script type="text/html" id="barDemo">
        <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>
        <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
    </script>

    <script type="text/javascript">
        layui.use('table', function() {
            var table = layui.table;

            table.render({
                elem: "#demo",
                url: 'js/user.json', // 数据接口
                cols:[[
						// 设置序列号列
						{field:'aa',type:"numbers"},
						// 设置复选框列
						{field:'aa',type:"checkbox"},
						{field:'id',title:'用户编号',sort:true,width:120,hide:true},
						{field:'username',title:'用户姓名',width:100,edit:'text'},
						{field:'sex',title:'性别',width:100,sort:true},
						{field:'city',title:'城市',width:100},
						{field:'sign',title:'签名',edit:'text'},
						// 设置表头工具栏
						{field:"操作",toolbar:"#barDemo"}
					]],
					// 开启分页
					page:true,
					// 设置表格工具栏
					toolbar:"#toolbarDemo"
            })
        })
    </script>
</body>
```

![](LayUI(二).assets/21.png)



![](LayUI(二).assets/22.png)





### 4.4.1、defaultTooblar头部工具栏右侧图标

- 类型：Array，默认值：["filter","exports","print"]
- 该参数可自由配置头部工具栏右侧的图标按钮，值为一个数组，支持以下可选值：
  - filter: *显示筛选图标*
  - exports: *显示导出图标*
  - print: *显示打印图标*



## 4.5、监听头工具栏事件

官方文档：https://www.layui.com/doc/modules/table.html#on

点击头部工具栏区域设定了属性为 `lay-event=""` 的元素时触发

- 语法：`table.on('event(filter)',callback)`
  - event 为内置事件名，filter 为容器 lay-filter 设定的值
- 回调函数返回一个 object 参数
  - `obj.config`对象中可以获取id属性值，即表示当前容器的ID属性值
  - `obj.event` 对象中可以获取 事件名
  - `table.checkStatus(obj.config.id)`  获取当前表格被选中记录对象，返回数组

> obj 包含如下

![](LayUI(二).assets/26.png)

> obj.event 包含如下

![](LayUI(二).assets/28.png)

> table.checkStatus(obj.config.id)  包含如下

![](LayUI(二).assets/27.png)

```html
<body>
    <div id="demo" lay-filter="test"></div>

    <!-- 表格工具栏 -->
    <script type="text/html" id="toolbarDemo">
        <div class="layui-btn-container">
            <!-- lay-event 给元素绑定事件名 -->
            <button class="layui-btn layui-btn-sm" lay-event="getCheckData">
                获取选中行数据
            </button>
            <button class="layui-btn layui-btn-sm" lay-event="getCheckLength">
                获取选中数目
            </button>
            <button class="layui-btn layui-btn-sm" lay-event="isAll">
                验证是否全选
            </button>
        </div>
    </script>

    <!-- 表头工具栏 -->
    <script type="text/html" id="barDemo">
        <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>
        <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
    </script>

    <script type="text/javascript">
        layui.use('table', function() {
            var table = layui.table;

            table.render({
                elem: "#demo",
                url: 'js/user.json', // 数据接口
                cols: [
                    [
                        // 设置序列号列
                        {
                            field: 'aa',
                            type: "numbers"
                        },
                        // 设置复选框列
                        {
                            field: 'aa',
                            type: "checkbox"
                        }, {
                            field: 'id',
                            title: '用户编号',
                            sort: true,
                            width: 120,
                            hide: true
                        }, {
                            field: 'username',
                            title: '用户姓名',
                            width: 100,
                            
                        }, {
                            field: 'sex',
                            title: '性别',
                            width: 100,
                            sort: true
                        }, {
                            field: 'city',
                            title: '城市',
                            width: 100
                        }, {
                            field: 'sign',
                            title: '签名',
                            
                        },
                        // 设置表头工具栏
                        {
                            field: "操作",
                            toolbar: "#barDemo"
                        }
                    ]
                ],
                // 开启分页
                page: true,
                // 设置表格工具栏
                toolbar: "#toolbarDemo"
            })

            /**
             * 头监听事件
             * 	语法：
             * 		table.on('toolbar(demo)',function(obj){
                 
                    });
                    注:demo表示的是容器上设置的lay-filter属性值
                */
            
            table.on('toolbar(test)', function(obj) {
                // console.log(obj);
                // obj.config对象中可以获取id属性值，即表示当前容器的ID属性值，也就是demo 
                // 获取当前表格被选中记录对象，返回数据
                var checkStatus = table.checkStatus(obj.config.id);
                console.log(checkStatus);
                // 获取事件名
                var eventName = obj.event;
                // 判断事件名，执行对应的代码
                switch (eventName) {
                    case "getCheckData":
                        // 获取被选中的记录的数组
                        var arr = checkStatus.data;
                        // 将数组解析成字符串
                        layer.alert(JSON.stringify(arr));
                        break;
                    case "getCheckLength":
                        // 获取被选中的记录的数组
                        var arr = checkStatus.data;
                        layer.msg("选中了" + arr.length + "条记录！")
                        break;
                    case "isAll":
                        // 通过isAll属性判断是否全选
                        var flag = checkStatus.isAll;
                        var str = flag ? '全选' : '未全选';
                        layer.msg(str);
                        break;
                    case "LAYTABLE_TIPS":
                        layer.alert("这是一个自定义的图标按钮");
                        break;
                }
            });

        })
    </script>
</body>
```

![](LayUI(二).assets/23.png)



![](LayUI(二).assets/24.png)



## 4.6、监听行工具栏事件

- 官方文档：https://www.layui.com/doc/modules/table.html#ontool

- 语法：`table.on('tool(filter)',callback{})`
  - filter 为容器 lay-filter 设定的值
- 回调函数返回一个 object 参数
  - `obj.data` 获取当前行数据
  - `obj.event`  获取 lay-event 对应的值 (也可以是表头 event 参数对应的值)

> obj.data 包含如下

![](LayUI(二).assets/29.png)



```html
<body>
    <div id="demo" lay-filter="test"></div>

    <!-- 表格工具栏 -->
    <script type="text/html" id="toolbarDemo">
        <div class="layui-btn-container">
            <!-- lay-event 给元素绑定事件名 -->
            <button class="layui-btn layui-btn-sm" lay-event="getCheckData">
                获取选中行数据
            </button>
            <button class="layui-btn layui-btn-sm" lay-event="getCheckLength">
                获取选中数目
            </button>
            <button class="layui-btn layui-btn-sm" lay-event="isAll">
                验证是否全选
            </button>
        </div>
    </script>

    <!-- 表头工具栏 -->
    <script type="text/html" id="barDemo">
        <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>
        <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
    </script>

    <script type="text/javascript">
        layui.use('table', function() {
            var table = layui.table;

            table.render({
                elem: "#demo",
                url: 'js/user.json', // 数据接口
                cols: [
                    [
                        // 设置序列号列
                        {
                            field: 'aa',
                            type: "numbers"
                        },
                        // 设置复选框列
                        {
                            field: 'aa',
                            type: "checkbox"
                        }, {
                            field: 'id',
                            title: '用户编号',
                            sort: true,
                            width: 120,
                            hide: true
                        }, {
                            field: 'username',
                            title: '用户姓名',
                            width: 100,
                            
                        }, {
                            field: 'sex',
                            title: '性别',
                            width: 100,
                            sort: true
                        }, {
                            field: 'city',
                            title: '城市',
                            width: 100
                        }, {
                            field: 'sign',
                            title: '签名',
                            
                        },
                        // 设置表头工具栏
                        {
                            field: "操作",
                            toolbar: "#barDemo"
                        }
                    ]
                ],
                // 开启分页
                page: true,
                // 设置表格工具栏
                toolbar: "#toolbarDemo"
            })


            /**
             * 监听行工具栏事件
             */
            table.on('tool(test)', function(obj) {
                // 得到当前操作行的相关信息
                var tr = obj.data;
                console.log(tr);
                // 得到事件名
                var eventName = obj.event;

                // 判断事件名，执行对应的方法
                if (eventName == 'del') { // 删除
                    // 确认框
                    layer.confirm("您确认要删除吗？", function(index) {
                        // 删除指定tr  del()
                        obj.del();
                        // 关闭弹出层（index是当前弹出层的下标）
                        layer.close(index);

                    });

                } else if (eventName == 'edit') { // 编辑
                    // 输出框
                    layer.prompt({
                        // 表单元素的类型 0=文本框  1=密码框 2=文本域
                        formType: 0,
                        value: tr.username // 设置输入框的值
                    }, function(value, index) {
                        // 修改指定单元格的值
                        // value表示输入的值
                        obj.update({
                            username: value
                        });
                        // 关闭弹出层
                        layer.close(index);
                    });
                }
            });

        })
    </script>
</body>
```







## 4.7、监听单元格编辑

官方文档：https://www.layui.com/doc/modules/table.html#onedit

- 监听单元格编辑之前要先打开单元格的编辑 
  - edit 类型String，单元格编辑类型（默认不开启）目前只支持：*text*（输入框）

- 语法：`table.on('edit(filter)',callback)`
  - filter 为容器 lay-filter 设定的值
- 单元格被编辑，且值发生改变时触发，回调函数返回一个 object 参数
  - `obj.value` 获取修改后的值
  - `obj.filed` 获取编辑的字段名
  - `obj.data` 获取所在行的所有相关数据

![](LayUI(二).assets/25.png)

```html
<body>
    <!-- 准备一个容器,设置id属性值 -->
    <table id="demo"></table>
    <!-- 表格工具栏 -->
    <script type="text/html" id="toolbarDemo">
        <div class="layui-btn-container">
            <!-- lay-event 给元素绑定事件名 -->
            <button class="layui-btn layui-btn-sm" lay-event="getCheckData">
					获取选中行数据
		    	</button>
            <button class="layui-btn layui-btn-sm" lay-event="getCheckLength">
					获取选中数目
		    	</button>
            <button class="layui-btn layui-btn-sm" lay-event="isAll">
					验证是否全选
		    	</button>
        </div>
    </script>
    <!-- 表头工具栏 -->
    <script type="text/html" id="barDemo">
        <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>
        <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
    </script>


    <script type="text/javascript">
        // 加载 table 模块
        layui.use('table', function() {
            var table = layui.table;
            // 加载table 实例
            table.render({
                    elem: "#demo", // elem属性用来绑定容器的 id 属性值
                    url: "js/user.json", // 数据接口
                    cols: [
                        [
                            // 设置序列号列
                            {
                                field: 'aa',
                                type: "numbers"
                            },
                            // 设置复选框列
                            {
                                field: 'aa',
                                type: "checkbox"
                            }, {
                                field: 'id',
                                title: '用户编号',
                                sort: true,
                                width: 120,
                                hide: true
                            }, {
                                field: 'username',
                                title: '用户姓名',
                                width: 100,
                                edit: 'text'
                            }, {
                                field: 'sex',
                                title: '性别',
                                width: 100,
                                sort: true
                            }, {
                                field: 'city',
                                title: '城市',
                                width: 100
                            }, {
                                field: 'sign',
                                title: '签名',
                                edit: 'text'
                            },
                            // 设置表头工具栏
                            {
                                field: "操作",
                                toolbar: "#barDemo"
                            }
                        ]
                    ],
                    // 开启分页
                    page: true,
                    // 设置表格工具栏
                    toolbar: "#toolbarDemo"

                })
                /**
                 * 监听单元格编辑事件
                 * 		表头设置edit属性， 单元格编辑类型（默认不开启）目前只支持：text（输入框）
                 */
            table.on('edit(test)', function(obj) {
                console.log(obj);
                // 获取修改后的值
                var value = obj.value;
                // 得到当前修改的tr对象
                var data = obj.data;
                // 得到修改的字段名
                var field = obj.field;

                layer.msg("【ID:" + data.id + "】的" + field + "字段的值修改为：" + value);
            });



        })
    </script>
</body>
```





## 4.8、数据表格重载

官方文档：https://www.layui.com/doc/modules/table.html#reload

视频讲解地址：https://www.bilibili.com/video/BV19V411b7sx?p=24

- 语法：`table.reload(ID,options,deep)`
  - 参数 *ID* 即为基础参数id对应的值
  - 参数 *options* 即为各项基础参数
  - 参数 *deep*：是否采用深度重载（即参数深度克隆，也就是重载时始终携带初始时及上一次重载时的参数），默认 false。注意：deep 参数为 layui 2.6.0 开始新增。

```html
<body>

    <div class="demoTable">
        搜索ID：
        <div class="layui-inline">
            <input class="layui-input" name="id" id="demoReload" autocomplete="off">
        </div>
        <button class="layui-btn" id="searchBtn">搜索</button>
    </div>


    <!-- 准备一个容器,设置id属性值 -->
    <table id="demo"></table>
    <!-- 表格工具栏 -->
    <script type="text/html" id="toolbarDemo">
        <div class="layui-btn-container">
            <!-- lay-event 给元素绑定事件名 -->
            <button class="layui-btn layui-btn-sm" lay-event="getCheckData">
					获取选中行数据
		    	</button>
            <button class="layui-btn layui-btn-sm" lay-event="getCheckLength">
					获取选中数目
		    	</button>
            <button class="layui-btn layui-btn-sm" lay-event="isAll">
					验证是否全选
		    	</button>
        </div>
    </script>
    <!-- 表头工具栏 -->
    <script type="text/html" id="barDemo">
        <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>
        <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
    </script>


    <script type="text/javascript">
        // 加载 table 模块
        layui.use('table', function() {
            var table = layui.table;
            var $ = layui.jquery; // 获取jquery对象
            // 加载table 实例
            table.render({
                    elem: "#demo", // elem属性用来绑定容器的 id 属性值
                    url: "js/user.json", // 数据接口
                    cols: [
                        [
                            // 设置序列号列
                            {
                                field: 'aa',
                                type: "numbers"
                            },
                            // 设置复选框列
                            {
                                field: 'aa',
                                type: "checkbox"
                            }, {
                                field: 'id',
                                title: '用户编号',
                                sort: true,
                                width: 120,
                                hide: true
                            }, {
                                field: 'username',
                                title: '用户姓名',
                                width: 100,
                                edit: 'text'
                            }, {
                                field: 'sex',
                                title: '性别',
                                width: 100,
                                sort: true
                            }, {
                                field: 'city',
                                title: '城市',
                                width: 100
                            }, {
                                field: 'sign',
                                title: '签名',
                                edit: 'text'
                            },
                            // 设置表头工具栏
                            {
                                field: "操作",
                                toolbar: "#barDemo"
                            }
                        ]
                    ],
                    // 开启分页
                    page: true,
                    // 设置表格工具栏
                    toolbar: "#toolbarDemo"

                })
                /**
                 * 监听单元格编辑事件
                 * 		表头设置edit属性， 单元格编辑类型（默认不开启）目前只支持：text（输入框）
                 */
            table.on('edit(test)', function(obj) {
                console.log(obj);
                // 获取修改后的值
                var value = obj.value;
                // 得到当前修改的tr对象
                var data = obj.data;
                // 得到修改的字段名
                var field = obj.field;

                layer.msg("【ID:" + data.id + "】的" + field + "字段的值修改为：" + value);
            });

            /**
             * 给指定元素绑定事件
             */
            $(document).on('click', '#searchBtn', function(data) {
                // 获取搜索文本框对象
                var sreach = $("#demoReload");
                // 调用数据表格的重载方法  table.reload(ID, options)
                table.reload('demo', {
                    where: { // 设置需要传递的参数
                        id: sreach.val(),
                        name: "zhangsan"
                    },
                    page: {
                        // 表示让条件查询从第一页开始；如果未设置则从当前页开始查询，此页前面的所有数据不纳入条件筛选
                        curr: 1 // 从第一页开始
                    }
                });
            });

        })
    </script>
</body>
```





























