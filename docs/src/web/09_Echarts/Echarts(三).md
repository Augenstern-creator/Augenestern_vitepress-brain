✍

# 1、Echarts高级

# 1、显示相关

## 1.1、主题

### 1.1.1、内置主题

- ECharts 中默认内置了两套主题：light、dark

- 在初始化对象方法 init 中可以指明
- init 方法有两个参数，第一个参数代表是一个 dom 节点，第二个参数，代表你需要使用哪一套主题

```js
var chart = echarts.init(dom,'light');
var chart = echarts.init(dom,'dark');
```

---

```html
<body>
    <!-- 1.准备一个具备大小的 DOM 容器 -->
    <div style="width: 600px;height: 400px"></div>

    <script>
        // 2.初始化echarts实例化对象
        var myChart = echarts.init(document.querySelector('div'), 'dark');
        // 3.指定图表的配置项和数据
        var option = {
            series: [{
                type: 'gauge',
                data: [{
                    value: 97,
                    // 指针样式
                }],
                min: 50, // min max 控制仪表盘数值范围

            }]
        }


        // 4.使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    </script>
</body>
```

![](Echarts(三).assets/1.png)



### 1.1.2、自定义主题

1. 在主题编辑器中编辑主题(下载->主题下载->定制主题->下载主题)

   地址：https://echarts.apache.org/zh/theme-builder.html

2. 下载主题，是一个 js 文件

3. 引入主题 js 文件

   ```html
   <script src="theme/itcast.js">
   ```

4. 载 init 方法中引入 主题 js 文件

```html
var myCharts = echarts.init(document.querySelector("div"),'itcast');
```

![](Echarts(三).assets/2.png)

第二个参数要和我们下载的主题中 `echarts.registerTheme` 的第一个参数相同





## 1.2、调色盘

它是一组颜色，图形，系列会自动从其中选择颜色



### 1.2.1、主题调色盘

 主题调色盘就是 1.1 所介绍的



### 1.2.2、全局调色盘

在 option 下设置 color，是一个数组

```
option: {
	color:['red','green','blue'],
}
```

### 1.2.3、局部调色盘

在 series 下 设置 color，是一个数组

```
series:[
	{
	 type: 'bar',
	 color: ['red','green','blue'],
	}
]
```



## 1.3、颜色渐变

### 1.3.1、线性渐变

在 series 下设置 itemStyle

```js
itemStyle: {
	color: {
		type: 'linear',					// 线性渐变
		x: 0,
		y: 0,
		x2: 0,
		y2: 1,
		colorStops: [
			{offset: 0,color: 'red'},	// 0%处的颜色
			{offset: 1,color: 'blue'},	// 100%处的颜色
		],
        globalCoord: false,				// 缺省为 false    
	},
    	
}
```

![](Echarts(三).assets/3.png)







### 1.3.2、径向渐变

在 series 下设置 itemStyle

```js
itemStyle: {
	color: {
		type: 'radial',					// 径向渐变
		x: 0.5,
		y: 0.5,
		r: 0.5,
		colorStops: [
			{offset: 0,color: 'red'},	// 0%处的颜色
			{offset: 1,color: 'blue'},	// 100%处的颜色
		],
        globalCoord: false,				// 缺省为 false    
	},
    	
}
```

![](Echarts(三).assets/4.png)





## 1.4、样式

### 1.4.1、直接样式

itemStyle、textStyle、lineStyle、areaStyle、label

### 1.4.2、高亮样式

在 emphasis 中包裹 itemStyle、textStyle、lineStyle、areaStyle、label

![](Echarts(三).assets/5.png)





## 1.5、自适应

当浏览器的大小发生变化的时候，如果想让图表也能随之适配变化

1. 监听窗口大小变化事件
2. 在事件处理函数中调用 ECharts 实例对象的 resize 即可

```js
windwo.onresize = function(){
    myChart.resize();
}
```



```html
<body>
    <!-- 1.准备一个具备大小的 DOM 容器 -->
    <div style="height: 400px;border:1px solid red"></div>

    <script>
        // 2.初始化echarts实例化对象
        var myChart = echarts.init(document.querySelector('div'));
        // 3.指定图表的配置项和数据
        var option = {

            series: [{
                type: 'gauge',
                data: [{
                    value: 97,
                    // 指针样式
                }],
                min: 50, // min max 控制仪表盘数值范围

            }]
        }


        // 4.使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);

        //监听window窗口大小变化的事件
        window.onresize = function() {

            myChart.resize();
        }
    </script>
</body>
```









# 2、动画的使用

## 2.1、加载动画

 ECharts 已经内置好了加载数据的动画，我们只需要在合适的时机显示或者隐藏即可

- 显示加载动画、隐藏加载动画
- `myCharts.showLoading()`、`myCharts.hideLoading()`
- 一般我们的数据是从服务器获取，当数据过多时，图表加载不出来，此时的界面是不友好的，我们可以在获取数据之前显示加载动画，当数据获取完成，隐藏加载动画

## 2.2、增量动画

当我们的图表已经加载完成，但是此时数据发生了变化，图表就要相应变化，这就是增量动画

- myCharts.setOption(option)

```html
<body>
    <!-- 1.准备一个具备大小的 DOM 容器 -->
    <div style="width: 600px;height: 400px"></div>
    <button id="modify">修改数据</button>
    <button id="add">增加数据</button>


    <script>
        // 2.初始化echarts实例化对象
        var myChart = echarts.init(document.querySelector('div'));
        // 3.指定图表的配置项和数据

        var xDataArr = ['张三', '李四', '王五', '闰土', '小明', '茅台', '蘑菇头', '王炸', ];
        var yDataArr = [88, 92, 63, 77, 94, 80, 72, 86];
        var option = {
            xAxis: {
                type: 'category',
                data: xDataArr,
            },
            yAxis: {
                type: 'value',
            },
            series: [{
                name: '语文',
                type: 'bar',
                data: yDataArr,
            }],
        };

        // 4.使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);


        // 修改数据
        var btnModify = document.querySelector('#modify');
        btnModify.onclick = function() {
            var newYDataArr = [68, 32, 99, 77, 94, 80, 72, 86];

            var option = {
                    series: [{
                        data: newYDataArr,
                    }]
                }
                // setOption 可以设置多次
                // 新的 option 和 旧的 option 是相互整合的关系
                // 我们在设置新的 option的时候，只需要考虑变化的数据
            myChart.setOption(option);
        };

        // 增加数据
        var btnAdd = document.querySelector('#add');
        btnAdd.onclick = function() {
            xDataArr.push('小明');
            yDataArr.push(90);

            var option = {
                xAxis: {
                    data: xDataArr,
                },
                series: [{
                    data: yDataArr,
                }]

            }
            myChart.setOption(option);
        }
    </script>
</body>
```

![](Echarts(三).assets/6.png)





## 2.3、动画配置

设置在 option 之下的

- 开启动画、动画时长、缓动动画、动画阈值（单种形式的元素数量大于这个阈值时会关闭动画）
- `animation:true`、`animationDuration:5000`、`animationEasing:'bounceOut'`、`animationThreshold: 8`

![](Echarts(三).assets/7.png)









# 3、交互API

- 全局 echarts 对象：全局 echarts 对象是引入 echarts.js 文件之后就可以直接使用的对象

- echartsInstance对象：echartsInstance 对象是通过 `echarts.init` 方法调用之后得到的

![](Echarts(三).assets/8.png)

## 3.1、全局 echarts 对象

- init
- registerTheme
- registerMap
- connect

### 3.1.1、init

- 初始化 ECharts 实例对象
- 使用对象

```js
// 2.初始化echarts实例化对象,且使用内置主题
var myChart = echarts.init(document.querySelector('div'), 'dark');
```

### 3.1.2、registerTheme

- 注册主题
- 只有注册过的主题，才能在 init 方法中使用该主题1

### 3.1.2、registerMap

- 注册地图数据

```js
$.get('json/map/china.json',function(chinaJson) {
    echarts.registerMap('china',chinaJson);
})
```

- geo 组件使用地图数据

```js
var option = {
    geo: {
        type: 'map',
        map: 'china',
    }
}
```

### 3.1.4、connect 方法

- 一个页面中可以有多个独立的图表
- 每一个图表对应一个 ECharts 实例对象
- connect 可以实现多图关联，传入联动目标为 ECharts 实例对象，支持数组
  - 保存图片的自动拼接
  - 刷新按钮
  - 重置按钮
  - 提示框联动、图例选择等

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="../js/echarts.min.js"></script>
    <title>Document</title>
    <script src="js/echarts.min.js"></script>
    <script src="js/jquery.min.js"></script>
</head>

<body>
<div style="width: 600px;height:400px;border: 1px solid red"></div>
  <div style="width: 600px;height:400px;border: 1px solid green" id="div1"></div>
  <script>
    var mCharts = echarts.init(document.querySelector("div"), 'itcast')
    var xDataArr = ['张三', '李四', '王五', '闰土', '小明', '茅台', '二妞', '大强']
    var yDataArr = [88, 92, 63, 77, 94, 80, 72, 86]
    var option = {
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        data: xDataArr
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          type: 'bar',
          data: yDataArr,
          markPoint: {
            data: [
              {
                type: 'max', name: '最大值'
              },
              {
                type: 'min', name: '最小值'
              }
            ]
          },
          markLine: {
            data: [
              {
                type: 'average', name: '平均值'
              }
            ]
          },
          label: {
            show: true,
            rotate: 60
          },
          barWidth: '30%'
        }
      ]
    }
    mCharts.setOption(option)

    var mCharts2 = echarts.init(document.querySelector('#div1'))
    $.get('json/map/china.json', function(ret){
      echarts.registerMap('aa', ret)
      var option2 = {
        geo: {
          type: 'map',
          map: 'aa'
        }
      }
      mCharts2.setOption(option2)
      // echarts.connect([mCharts, mCharts2]) // 将柱状图和地图关联起来
    })
    

  </script>
</body>

</html>
```





## 3.2、echartsInstance对象

### 3.2.1、setOption方法

- 设置或修改图表实例的配置项以及数据
- 多次调用 setOption 方法
  - 合并新的配置和旧的配置
  - 增量动画

```html
<body>
  <div style="width: 600px;height:400px"></div>
  <button id="modify">修改数据</button>
  <button id="add">增加数据</button>
  <script>
    var mCharts = echarts.init(document.querySelector("div"))
    var xDataArr = ['张三', '李四', '王五', '闰土', '小明', '茅台', '二妞', '大强']
    var yDataArr = [88, 92, 63, 77, 94, 80, 72, 86]
    var option = {
      xAxis: {
        type: 'category',
        data: xDataArr
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          type: 'bar',
          data: yDataArr,
          markPoint: {
            data: [
              {
                type: 'max', name: '最大值'
              },
              {
                type: 'min', name: '最小值'
              }
            ]
          },
          markLine: {
            data: [
              {
                type: 'average', name: '平均值'
              }
            ]
          },
          label: {
            show: true,
            rotate: 60
          },
          barWidth: '30%'
        }
      ]
    }
    mCharts.setOption(option)

    var btnModify = document.querySelector('#modify')
    btnModify.onclick = function () {
      var newYDataArr = [68, 32, 99, 77, 94, 80, 72, 86]
      // setOption 可以设置多次
      // 新的option 和 旧的option
      // 新旧option的关系并不是相互覆盖的关系, 是相互整合的关系
      // 我们在设置新的option的时候, 只需要考虑到变化的部分就可以
      var option = {
        series: [
          {
            data: newYDataArr
          }
        ]
      }
      mCharts.setOption(option)
    }
    var btnAdd = document.querySelector('#add')
    btnAdd.onclick = function(){
      xDataArr.push('小明')
      yDataArr.push(90)
      var option = {
        xAxis: {
          data: xDataArr
        },
        series: [
          {
            data: yDataArr
          }
        ]
      }
      mCharts.setOption(option)
    }
  </script>
</body>
```



### 3.2.2、resize方法

- 重新计算和绘制图表
- 一般和 window 对象的 resize 事件结合使用

```html
<div style="height:400px;border: 1px solid red"></div>
  <script>
    var mCharts = echarts.init(document.querySelector("div"))
    var xDataArr = ['张三', '李四', '王五', '闰土', '小明', '茅台', '二妞', '大强']
    var yDataArr = [88, 92, 63, 77, 94, 80, 72, 86]
    var option = {
      xAxis: {
        type: 'category',
        data: xDataArr
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          type: 'bar',
          data: yDataArr,
          markPoint: {
            data: [
              {
                type: 'max', name: '最大值'
              },
              {
                type: 'min', name: '最小值'
              }
            ]
          },
          markLine: {
            data: [
              {
                type: 'average', name: '平均值'
              }
            ]
          },
          label: {
            show: true,
            rotate: 60
          },
          barWidth: '30%'
        }
      ]
    }
    mCharts.setOption(option)
    // 监听window窗口大小变化的事件
    window.onresize = function(){
      // console.log('window.onresize...')
      // 调用echarts实例对象的resize方法
      mCharts.resize()
    }
    // window.onresize = mCharts.resize

  </script>
</body>
```

### 3.2.3、on方法

- 绑定或者解绑事件处理函数
- 鼠标事件
  - 常见事件：'click'、'dblclick'、'mousedown'、'mousemove'、'mouseup' 等
  - 事件参数 arg：和事件相关的数据信息

- ECharts 事件
  - 常见事件：legendselectchanged、'datazoom'、'pieselectchanged'、'mapselectchanged' 等
  - 事件参数arg：和事件相关的数据信息

```html
<body>
  <div style="width: 600px;height:400px"></div>
  <script>
    var mCharts = echarts.init(document.querySelector("div"))
    var pieData = [
      {
        value: 11231,
        name: "淘宝",
      },
      {
        value: 22673,
        name: "京东"
      },
      {
        value: 6123,
        name: "唯品会"
      },
      {
        value: 8989,
        name: "1号店"
      },
      {
        value: 6700,
        name: "聚美优品"
      }
    ]
    var option = {
      legend: {
        data: ['淘宝', '京东', '唯品会', '1号店', '聚美优品']
      },
      tooltip: {
        show: true
      },
      series: [
        {
          type: 'pie',
          data: pieData
        }
      ]
    }
    mCharts.setOption(option)
    mCharts.on('click', function (arg) {
      console.log(arg)
      console.log('click...')
    }) // 对事件进行监听
  </script>
</body>
```

![](Echarts(三).assets/9.png)

在官网如图我们可以看到 echartsInstance 的方法

![](Echarts(三).assets/10.png)



```html
<body>
    <div style="width: 600px;height:400px"></div>
    <script>
        var mCharts = echarts.init(document.querySelector("div"))
        var pieData = [{
            value: 11231,
            name: "淘宝",
        }, {
            value: 22673,
            name: "京东"
        }, {
            value: 6123,
            name: "唯品会"
        }, {
            value: 8989,
            name: "1号店"
        }, {
            value: 6700,
            name: "聚美优品"
        }]
        var option = {
            legend: {
                data: ['淘宝', '京东', '唯品会', '1号店', '聚美优品']
            },
            tooltip: {
                show: true
            },
            series: [{
                type: 'pie',
                data: pieData
            }]
        }
        mCharts.setOption(option)
        mCharts.on('click', function(arg) {
                console.log(arg)
                console.log('click...')
            }) // 对事件进行监听

        // 对图例组件进行监听
        mCharts.on('legendselectchanged', function(arg) {
            console.log(arg)
            console.log('legendselectchanged')
        })
    </script>
</body>
```

![](Echarts(三).assets/11.png)











### 3.2.4、off方法

```html
<body>
  <div style="width: 600px;height:400px"></div>
  <button id="btn1">触发行为</button>
  <button id="btn2">clear</button>
  <button id="btn3">setOption</button>
  <button id="btn4">dispose</button>
  <script>
    var mCharts = echarts.init(document.querySelector("div"))
    var pieData = [
      {
        value: 11231,
        name: "淘宝",
      },
      {
        value: 22673,
        name: "京东"
      },
      {
        value: 6123,
        name: "唯品会"
      },
      {
        value: 8989,
        name: "1号店"
      },
      {
        value: 6700,
        name: "聚美优品"
      }
    ]
    var option = {
      legend: {
        data: ['淘宝', '京东', '唯品会', '1号店', '聚美优品']
      },
      tooltip: {
        show: true
      },
      series: [
        {
          type: 'pie',
          data: pieData
        }
      ]
    }
    mCharts.setOption(option)
    mCharts.on('click', function (arg) {
      console.log(arg)
      console.log('click...')
    }) // 对事件进行监听

    mCharts.off('click') // 解绑click的事件
   </script>
</body>
```





### 3.2.5、dispathAction方法

- 触发某些行为
- 使用代码模拟用户的行为

```js
myCharts.dispatchAction({
    type: 'highlight',		// 事件类型
    seriesIndex: 0,			// 图表索引
    dataIndex: 1			// 图表中的哪一项高亮
})
```





```html
<body>
  <div style="width: 600px;height:400px"></div>
  <button id="btn1">触发行为</button>
  <script>
    var mCharts = echarts.init(document.querySelector("div"))
    var pieData = [
      {
        value: 11231,
        name: "淘宝",
      },
      {
        value: 22673,
        name: "京东"
      },
      {
        value: 6123,
        name: "唯品会"
      },
      {
        value: 8989,
        name: "1号店"
      },
      {
        value: 6700,
        name: "聚美优品"
      }
    ]
    var option = {
      legend: {
        data: ['淘宝', '京东', '唯品会', '1号店', '聚美优品']
      },
      tooltip: {
        show: true
      },
      series: [
        {
          type: 'pie',
          data: pieData
        }
      ]
    }
    mCharts.setOption(option)
    $('#btn1').click(function () {
      // 模拟用户的行为
      mCharts.dispatchAction({
        type: 'highlight',
        seriesIndex: 0, // 系列的索引
        dataIndex: 1 // 数据的索引
      })
      mCharts.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: 2
      })
    })
    </script>
</body>
```

![](Echarts(三).assets/12.png)





### 3.2.6、clear方法

- 清空当前实例，会移除实例中所有的组件和图表
- 清空之后可以再次 setOption

```html
<body>
    <div style="width: 600px;height:400px"></div>
    <button id="btn1">触发行为</button>
    <button id="btn2">clear</button>
    <button id="btn3">setOption</button>
    <script>
        var mCharts = echarts.init(document.querySelector("div"))
        var pieData = [{
            value: 11231,
            name: "淘宝",
        }, {
            value: 22673,
            name: "京东"
        }, {
            value: 6123,
            name: "唯品会"
        }, {
            value: 8989,
            name: "1号店"
        }, {
            value: 6700,
            name: "聚美优品"
        }]
        var option = {
            legend: {
                data: ['淘宝', '京东', '唯品会', '1号店', '聚美优品']
            },
            tooltip: {
                show: true
            },
            series: [{
                type: 'pie',
                data: pieData
            }]
        }
        mCharts.setOption(option)
        $('#btn1').click(function() {
            // 模拟用户的行为
            mCharts.dispatchAction({
                type: 'highlight',
                seriesIndex: 0, // 系列的索引
                dataIndex: 1 // 数据的索引
            })
            mCharts.dispatchAction({
                type: 'showTip',
                seriesIndex: 0,
                dataIndex: 2
            })
        })
        $('#btn2').click(function() {
            // 清空图表的实例
            mCharts.clear()
        })

        $('#btn3').click(function() {
            // 重新设置option
            mCharts.setOption(option)
        })
    </script>
</body>
```







![](Echarts(三).assets/13.png)





### 3.2.7、dispose方法

- 销毁实例,展示的效果和 clear 一样，但是无法再 setOption() 展示
- 销毁后实例无法再被使用

```html
<body>
  <div style="width: 600px;height:400px"></div>
  <button id="btn1">触发行为</button>
  <button id="btn2">clear</button>
  <button id="btn3">setOption</button>
  <button id="btn4">dispose</button>
  <script>
    var mCharts = echarts.init(document.querySelector("div"))
    var pieData = [
      {
        value: 11231,
        name: "淘宝",
      },
      {
        value: 22673,
        name: "京东"
      },
      {
        value: 6123,
        name: "唯品会"
      },
      {
        value: 8989,
        name: "1号店"
      },
      {
        value: 6700,
        name: "聚美优品"
      }
    ]
    var option = {
      legend: {
        data: ['淘宝', '京东', '唯品会', '1号店', '聚美优品']
      },
      tooltip: {
        show: true
      },
      series: [
        {
          type: 'pie',
          data: pieData
        }
      ]
    }
    mCharts.setOption(option)
    mCharts.on('click', function (arg) {
      console.log(arg)
      console.log('click...')
    }) // 对事件进行监听

    mCharts.off('click') // 解绑click的事件

    mCharts.on('legendselectchanged', function (arg) {
      console.log(arg)
      console.log('legendselectchanged')
    })

    $('#btn1').click(function () {
      // 模拟用户的行为
      mCharts.dispatchAction({
        type: 'highlight',
        seriesIndex: 0, // 系列的索引
        dataIndex: 1 // 数据的索引
      })
      mCharts.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: 2
      })
    })

    $('#btn2').click(function () {
      // 清空图表的实例
      mCharts.clear()
    })

    $('#btn3').click(function () {
      // 重新设置option
      mCharts.setOption(option)
    })

    $('#btn4').click(function () {
      // 销毁mCharts
      mCharts.dispose()
    })
  </script>
</body>
```























