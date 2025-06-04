# 1、Matplotlib

![](黑马matplotlib(一).assets/1.png)

- 是专门用于开发2D图表(包括3D图表)

- 以渐进、交互式方式实现数据可视化



## 1.1、matplotlib.pyplot模块

matplotlib.pyplot模块含了一系列类似于matlab的画图函数。

```python
import matplotlib.pyplot as plt

# 1.创建画布
#figsize:指定图的长宽
#dpi:图像的清晰度
#返回fig对象
plt.figure(figsize=(10, 10), dpi=100)

# 2.绘制折线图
#举例：展现上海一周的天气,比如从星期一到星期日的天气温度如下
#plt.plot(x, y)
plt.plot([1, 2, 3, 4, 5, 6 ,7], [17,17,18,15,11,11,13])

# 3.显示图像
plt.show()
```



![](黑马matplotlib(一).assets/2.png)

## 1.2、给图形添加辅助功能

为了更好地理解所有基础绘图功能，我们通过天气温度变化的绘图来融合所有的基础API使用。**画出某城市11点到12点1小时内每分钟的温度变化折线图，温度范围在15度~18度**

```python
import matplotlib.pyplot as plt
import random

# 画出温度变化图

# 0.准备x, y坐标的数据
x = range(60)
y_shanghai = [random.uniform(15, 18) for i in x]

# 1.创建画布
plt.figure(figsize=(20, 8), dpi=80)

# 2.绘制折线图
plt.plot(x, y_shanghai)

# 3.显示图像
plt.show()
```

![](黑马matplotlib(一).assets/3.png)



## 1.3、添加自定义x、y刻度

- `plt.xticks(x, **kwargs)` : x是要显示的刻度值
- `plt.yticks(y, **kwargs)` : y是要显示的刻度值

```python
# 增加以下两行代码

# 构造x轴刻度标签
x_ticks_label = ["11点{}分".format(i) for i in x]
# 构造y轴刻度
y_ticks = range(40)

# 修改x,y轴坐标的刻度显示
plt.xticks(x[::5], x_ticks_label[::5])
plt.yticks(y_ticks[::5])
```

> [开始:结束:步长],[::5]表示从开始到结束，步长为5

![](黑马matplotlib(一).assets/4.png)





## 1.4、设置中文

Matplotlib 中文显示不是特别友好，要让图像中带中文显示，请加入下列代码：

```python
from pylab import mpl
# 设置显示中文字体
mpl.rcParams["font.sans-serif"] = ["SimHei"]
# 设置正常显示符号
mpl.rcParams["axes.unicode_minus"] = False
```



## 1.5、添加网格

为了更加清楚地观察图形对应的值,可以添加网格：

```python
#添加网格
plt.grid(True, linestyle='--', alpha=0.5)
```

`matplotlib.pyplot.grid(b=None, which='major', axis='both', )`参数：

- **b**：可选，默认为 None，可以设置布尔值，true 为显示网格线，false 为不显示，如果设置 **kwargs 参数，则值为 true
- **which**：可选，可选值有 'major'、'minor' 和 'both'，默认为 'major'，表示应用更改的网格线
- **axis**：可选，设置显示哪个方向的网格线，可以是取 'both'（默认），'x' 或 'y'，分别表示两个方向，x 轴方向或 y 轴方向
- **kwargs：可选，设置网格样式，可以是 color='r', linestyle='-' 和 linewidth=2，分别表示网格线的颜色，样式和宽度
- alpha=0.5,表示透明度

![](黑马matplotlib(一).assets/5.png)







## 1.6、添加描述信息

添加x轴、y轴描述信息及标题，通过fontsize参数可以修改图像中字体的大小

```python
plt.xlabel("时间")
plt.ylabel("温度")
plt.title("中午11点0分到12点之间的温度变化图示", fontsize=20)
```

![](黑马matplotlib(一).assets/6.png)

## 1.7、图像保存

```python
# 保存图片到指定路径
plt.savefig("test.png")
```

> - 注意：plt.show()会释放figure资源，如果在显示图像之后保存图片将只能保存空图片。



# 2、在一个坐标系中绘制多个图像

需求：再添加一个城市的温度变化。收集到北京当天温度变化情况，温度在1度到3度。怎么去添加另一个在同一坐标系当中的不同图形，**其实很简单只需要再次plot即可**，但是需要区分线条，如下显示

```python
# 增加北京的温度数据
y_beijing = [random.uniform(1, 3) for i in x]

# 绘制折线图
plt.plot(x, y_shanghai)
# 使用多次plot可以画多个折线
plt.plot(x, y_beijing, color='r', linestyle='--')
```

设置图形风格如下：

| 颜色字符 |    风格字符    |
| :------: | :------------: |
|  r 红色  |     - 实线     |
|  g 绿色  |    - - 虚线    |
|  b 蓝色  |   -. 点划线    |
|  w 白色  |    : 点虚线    |
|  c 青色  | ' ' 留空、空格 |
|  m 洋红  |                |
|  y 黄色  |                |
|  k 黑色  |                |

显示图例：如果只在plt.plot()中设置label还不能最终显示出图例，还需要通过plt.legend()将图例显示出来。

```python
# 绘制折线图
plt.plot(x, y_shanghai, label="上海")
# 使用多次plot可以画多个折线
plt.plot(x, y_beijing, color='r', linestyle='--', label="北京")

# 显示图例
plt.legend(loc="best")
```

| Location String | Location Code |
| --------------- | ------------- |
| 'best'          | 0             |
| 'upper right'   | 1             |
| 'upper left'    | 2             |
| 'lower left'    | 3             |
| 'lower right'   | 4             |
| 'right'         | 5             |
| 'center left'   | 6             |
| 'center right'  | 7             |
| 'lower center'  | 8             |
| 'upper center'  | 9             |
| 'center'        | 10            |

完整代码：

```python
# 0.准备数据
x = range(60)
y_shanghai = [random.uniform(15, 18) for i in x]
y_beijing = [random.uniform(1,3) for i in x]

# 1.创建画布
plt.figure(figsize=(20, 8), dpi=100)

# 2.绘制图像
plt.plot(x, y_shanghai, label="上海")
plt.plot(x, y_beijing, color="r", linestyle="--", label="北京")

# 2.1 添加x,y轴刻度
# 构造x,y轴刻度标签
x_ticks_label = ["11点{}分".format(i) for i in x]
y_ticks = range(40)

# 刻度显示
plt.xticks(x[::5], x_ticks_label[::5])
plt.yticks(y_ticks[::5])

# 2.2 添加网格显示
plt.grid(True, linestyle="--", alpha=0.5)

# 2.3 添加描述信息
plt.xlabel("时间")
plt.ylabel("温度")
plt.title("中午11点--12点某城市温度变化图", fontsize=20)

# 2.4 图像保存
plt.savefig("./test.png")

# 2.5 添加图例
plt.legend(loc=0)


# 3.图像显示
plt.show()
```

![](黑马matplotlib(一).assets/7.png)





# 3、多个坐标系显示

如果我们想要将上海和北京的天气图显示在同一个图的不同坐标系当中，效果如下：

![](黑马matplotlib(一).assets/8.png)



可以通过subplots函数实现：`matplotlib.pyplot.subplots(nrows, ncols, index, **kwargs)`创建一个带有多个axes(坐标系/绘图区)的图。

- 以上函数将整个绘图区域分成 nrows 行和 ncols 列，然后从左到右，从上到下的顺序对每个子区域进行编号 **1...N** ，左上的子区域的编号为 1、右下的区域编号为 N，编号可以通过参数 **index** 来设置。
- 设置nrows=1，ncols=2，就是将图表绘制成1×2的图片区域。对应的坐标为：(1,1)、(1,2)

```python
# 0.准备数据
x = range(60)
y_shanghai = [random.uniform(15, 18) for i in x]
y_beijing = [random.uniform(1, 5) for i in x]

# 1.创建画布
# plt.figure(figsize=(20, 8), dpi=100)
fig, axes = plt.subplots(nrows=1, ncols=2, figsize=(20, 8), dpi=100)


# 2.绘制图像
# plt.plot(x, y_shanghai, label="上海")
# plt.plot(x, y_beijing, color="r", linestyle="--", label="北京")
axes[0].plot(x, y_shanghai, label="上海")
axes[1].plot(x, y_beijing, color="r", linestyle="--", label="北京")

# 2.1 添加x,y轴刻度
# 构造x,y轴刻度标签
x_ticks_label = ["11点{}分".format(i) for i in x]
y_ticks = range(40)

# 刻度显示
# plt.xticks(x[::5], x_ticks_label[::5])
# plt.yticks(y_ticks[::5])
axes[0].set_xticks(x[::5])
axes[0].set_yticks(y_ticks[::5])
axes[0].set_xticklabels(x_ticks_label[::5])
axes[1].set_xticks(x[::5])
axes[1].set_yticks(y_ticks[::5])
axes[1].set_xticklabels(x_ticks_label[::5])

# 2.2 添加网格显示
# plt.grid(True, linestyle="--", alpha=0.5)
axes[0].grid(True, linestyle="--", alpha=0.5)
axes[1].grid(True, linestyle="--", alpha=0.5)

# 2.3 添加描述信息
# plt.xlabel("时间")
# plt.ylabel("温度")
# plt.title("中午11点--12点某城市温度变化图", fontsize=20)
axes[0].set_xlabel("时间")
axes[0].set_ylabel("温度")
axes[0].set_title("中午11点--12点某城市温度变化图", fontsize=20)
axes[1].set_xlabel("时间")
axes[1].set_ylabel("温度")
axes[1].set_title("中午11点--12点某城市温度变化图", fontsize=20)


# # 2.5 添加图例
# plt.legend(loc=0)
axes[0].legend(loc=0)
axes[1].legend(loc=0)


# 3.图像显示
plt.show()
```



![](黑马matplotlib(一).assets/9.png)





# 4、常见图形绘制

Matplotlib能够绘制**折线图、散点图、柱状图、直方图、饼图。**

## 4.1、折线图

- **折线图**：以折线的上升或下降来表示统计数量的增减变化的统计图
- **特点：能够显示数据的变化趋势，反映事物的变化情况。(变化)**

- `plt.plot(x, y)`



## 4.2、散点图

- **散点图：**用两组数据构成多个坐标点，考察坐标点的分布,判断两变量之间是否存在某种关联或总结坐标点的分布模式。
- **特点：判断变量之间是否存在数量关联趋势,展示离群点(分布规律)**

- api：plt.scatter(x, y)

需求：探究房屋面积和房屋价格的关系

```python
# 0.准备数据
# 房屋面积数据：
x = [225.98, 247.07, 253.14, 457.85, 241.58, 301.01,  20.67, 288.64,
       163.56, 120.06, 207.83, 342.75, 147.9 ,  53.06, 224.72,  29.51,
        21.61, 483.21, 245.25, 399.25, 343.35]
# 房屋价格数据：
y = [196.63, 203.88, 210.75, 372.74, 202.41, 247.61,  24.9 , 239.34,
       140.32, 104.15, 176.84, 288.23, 128.79,  49.64, 191.74,  33.1 ,
        30.74, 400.02, 205.35, 330.64, 283.45]

# 1.创建画布
plt.figure(figsize=(20, 8), dpi=100)

# 2.绘制散点图
plt.scatter(x, y)

# 3.显示图像
plt.show()
```

![](黑马matplotlib(一).assets/10.png)





## 4.3、柱状图

- **柱状图：**排列在工作表的列或行中的数据可以绘制到柱状图中。
- **特点：绘制连离散的数据,能够一眼看出各个数据的大小,比较数据之间的差别。(统计/对比)**
- api：plt.bar(x, width, align='center', **kwargs)
  - x : 需要传递的数据
  - width : 柱状图的宽度
  - align : 每个柱状图的位置对齐方式
        {‘center’, ‘edge’}, optional, default: ‘center’
  - **kwargs :
    color:选择柱状图的颜色

**需求-对比每部电影的票房收入**

```python
# 0.准备数据
# 电影名字
movie_name = ['雷神3：诸神黄昏','正义联盟','东方快车谋杀案','寻梦环游记','全球风暴','降魔传','追捕','七十七天','密战','狂兽','其它']
# 横坐标
x = range(len(movie_name))
# 票房数据
y = [73853,57767,22354,15969,14839,8725,8716,8318,7916,6764,52222]

# 1.创建画布
plt.figure(figsize=(20, 8), dpi=100)

# 2.绘制柱状图
plt.bar(x, y, width=0.5, color=['b','r','g','y','c','m','y','k','c','g','b'])

# 2.1b修改x轴的刻度显示
plt.xticks(x, movie_name)

# 2.2 添加网格显示
plt.grid(linestyle="--", alpha=0.5)

# 2.3 添加标题
plt.title("电影票房收入对比")

# 3.显示图像
plt.show()
```

![](黑马matplotlib(一).assets/11.png)







## 4.4、直方图

- **直方图：**由一系列高度不等的纵向条纹或线段表示数据分布的情况。 一般用横轴表示数据范围，纵轴表示分布情况。
- **特点：绘制连续性的数据展示一组或者多组数据的分布状况(统计)**
- api：matplotlib.pyplot.hist(x, bins=None)
  - x : 需要传递的数据
  - bins : 组距



## 4.5、饼图

- **饼图：**用于表示不同分类的占比情况，通过弧度大小来对比各种分类。

- **特点：分类数据的占比情况(占比)**
- api：plt.pie(x, labels=,autopct=,colors)
  - x:数量，自动算百分比
  - labels:每部分名称
  - autopct:占比显示指定%1.2f%%
  - colors:每部分颜色































































