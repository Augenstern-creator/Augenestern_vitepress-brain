# 1、Pyecharts

## 1.1、Json和Python转换

- `json.dumps(data)` 把python数据转化为 json 数据
- `json.loads(data)` 把 json 数据转化为 python 数据
- 如果有中文可以带上：`ensure_ascii=False`参数来确保中文正常转换

```python
# 导入json模块 
import json

# 准备符合格式json格式要求的python数据 
data = [{"name": "老王", "age": 16}, {"name": "张三", "age": 20}]

# 通过 json.dumps(data) 方法把python数据转化为了 json数据
# ensure_ascii=False 表明不是呦acsii码,而是直接将中文输出
data = json.dumps(data, ensure_ascii=False)
print(data)
# [{"name": "老王", "age": 16}, {"name": "张三", "age": 20}]

# 通过 json.loads(data) 方法把json数据转化为了 python数据 
data = json.loads(data)
print(data)
# [{"name": "老王", "age": 16}, {"name": "张三", "age": 20}]
```



## 1.2、PyEcharts模块

1. `pip install pyecharts` 安装 PyEcharts模块

```bash
pip install pyecharts -i https://pypi.tuna.tsinghua.edu.cn/simple
```

2. `pip show pyecharts` 可以查看版本

> Tips:
>
> - `pip show pip` 可以看到 pip install 安装的位置,Location就是安装的位置
> - PyEcharts官网：https://05x-docs.pyecharts.org/#/zh-cn/
> - PyEcharts官方文档: https://gallery.pyecharts.org/#/README
> - 好文推荐: https://zhuanlan.zhihu.com/p/578819628



### 1.2.1、基础折线图



```python
# 导包
from pyecharts.charts import Line

# 得到折线图对象
line = Line()

# 添加x轴数据
line.add_xaxis(["中国","美国","英国"])

# 添加y轴数据
line.add_yaxis("GDP",[30,20,15])

# 生成图表
line.render()
```

在 `PyCharm` 右键运行后，会多出一个`render.html`文件，使用浏览器打开即可

![](python(七).assets/1.png)



> 若是html加载不出来，解决方法如下：https://blog.csdn.net/qq_38972634/article/details/107635546



### 1.2.2、初始化配置

以折线图为例：

```python
# 配置包
from pyecharts import options 

line = Line(
    init_opts=options.InitOpts(
        width='900px',  # 图表画布宽度
        height='500px',  # 图标画布长度
        chart_id=None,  # 图表 ID，图表唯一标识，用于在多图表时区分
        renderer='canvas',  # 渲染风格，可选 "canvas", "svg"
        page_title="Awesome-pyecharts",  # 网页标题
        theme="white",  # 图表主题 white dark
        bg_color=None,  # 图表背景颜色 可用颜色英文或者rgb(0,0,0)通道颜色配置
        animation_opts=AnimationOpts()  # 画图动画初始化配置
    )
)
```











### 1.2.3、PyEcharts模块配置

pyecharts模块中有很多的配置选项, 常用到2个类别的选项:

- 全局配置选项
- 系列配置选项

![](python(七).assets/2.png)









### 1.2.4、全局配置选项set_global_opts

这里全局配置选项可以通过set_global_opts方法来进行配置, 相应的选项和选项的功能如下：

#### 1、标题配置

```python
line.set_global_opts(
    title_opts=options.TitleOpts(
        title="主标题文本",  # 主标题文本，支持使用 \n 换行
        subtitle="副标题文本",  # 副标题
        title_textstyle_opts=None,  # 主标题字体样式配置项，参考局部系列配置-文字样式配置
        subtitle_textstyle_opts=None,  # 副标题字体样式配置项
        pos_left=None,  # title 组件离容器左侧的距离。
        pos_right=None,  # title 组件离容器右侧的距离。
        pos_top=None,  # title 组件离容器上侧的距离
        pos_bottom=None,  # title 组件离容器下侧的距离。
        padding=None,  # 内边距[5,10,5,10]对应[上,右,下,左]
        item_gap=None,  # 主副标题间距
        title_link=None,  # 主标题超链接
        subtitle_link=None,  # 副标题超链接
        title_target=None,  # 跳转方式 'self' 当前窗口打开; 'blank' 新窗口打开
        subtitle_target=None
    )
)
```

#### 2、图例配置

```python
line.set_global_opts(
    # 图例配置
    legend_opts=options.LegendOpts(
        is_show=True,  # 是否显示图例
        type_=None,  # 图例类型 'plain' 默认图例类型 'scroll'可滚动翻页的图例
        selected_mode=None,  # 图例选择模式 True 可选 'single' 单选 'multiple' 多选
        pos_right=None,  # 图例组件离容器边侧侧的距离
        pos_bottom=None,  # # 可以是 int str 例如 20 '20%'
        pos_left=None,  # 如果 left 的值为'left', 'center', 'right'，组件会根据相应的位置自动对齐
        pos_top=None,  # 'top', 'middle', 'bottom'
        orient=None,  # 图例列表的布局朝向。可选：'horizontal', 'vertical'
        align=None,  # 图例标记和文本的对齐。默认`auto`, `left`, `right`
        padding=5,  # 图例内边距
        item_gap=10,  # 图例每项直接的间隔
        item_width=25,  # 图例标记的图形宽度
        item_height=14,  # 图例标记的图形高度
        inactive_color=None,  # 图例关闭时的颜色。默认是 #ccc
        textstyle_opts=None,  # 图例组件字体样式 参考局部系列配置-文字样式配置
        # 图例项的 icon（也就是echarts图表上方的每个是圆的还是方的）pin 和 rect 比较好看
        # ECharts 提供的标记类型包括 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
        # 可以通过 'image://url' 设置为图片，其中 URL 为图片的链接，或者 dataURI。
        # 可以通过 'path://' 将图标设置为任意的矢量路径。
        legend_icon=None
    )
)
```



#### 3、坐标轴配置

```python
line.set_global_opts(
    # 坐标轴配置
    xaxis_opts=options.AxisOpts(
        type_=None,  # str 坐标轴类型。可选 'value' 'category' 'time' 'log'
        name="国家",  # str 坐标轴名称。
        is_show=True,  # bool 是否显示 x 轴。
        is_scale=False,  # bool 是否是脱离 0 值比例，只在数值轴中（type: 'value'）有效，设置 min 和 max 之后该配置项无效
        is_inverse=False,  # bool 是否反向坐标轴。
        name_location="end",  # str 坐标轴名称显示位置。可选：'start', 'middle' 或者 'center','end'
        name_gap=15,  # Numeric 坐标轴名称与轴线之间的距离
        name_rotate=None,  # Numeric 坐标轴名字旋转，角度值。
        interval=None,  # Numeric 强制设置坐标轴分割间隔 无法在类目轴中使用。在时间轴（type: 'time'）中需要传时间戳，在对数轴（type: 'log'）中需要传指数值
        grid_index=0,  # Numeric x 轴所在的 grid 的索引，默认位于第一个 grid
        position=None,  # str x 轴的位置。可选：'top', 'bottom'
        offset=0,  # Numeric Y 轴相对于默认位置的偏移，在相同的 position 上有多个 Y 轴的时候有用。
        min_interval=0,  # Numeric 最小间隔大小，可以设置成1保证坐标轴分割刻度显示成整数
        max_interval=None,  # Numeric 坐标轴最大间隔大小，时间轴（（type: 'time'））可以设置成 3600 * 24 * 1000 保证坐标轴分割刻度最大为一天
    ),
)
```

坐标轴类型解释：

- `'value'` ：数值轴，适用于连续数据
- `'category'` ：类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据
- `'time'` ： 时间轴，适用于连续的时序数据，与数值轴相比时间轴带有时间的格式化
- `log` : 对数轴，适用于对数数据

#### 4、提示框配置

```python
line.set_global_opts(
    # 提示框配置
    tooltip_opts=options.TooltipOpts(
        is_show=True,  # 是否显示提示框组件
        trigger="item",  # 触发类型 'item': 数据项图形触发 axis': 坐标轴触发 'none': 什么都不触发
        trigger_on="mousemove|click",  # str 提示框触发的条件 'mousemove' 'click' 'mousemove|click' 'none'
        axis_pointer_type="cross",  # str 指示器类型。可选'line' 'shadow' 'none' 'cross'
        formatter=None,  # str 标签内容格式器 见部分配置通用参数详解
        background_color=None,  # str 提示框浮层的背景颜色。
        border_color=None,  # str 提示框浮层的边框颜色。
        border_width=0,  # Numeric 提示框浮层的边框宽
        textstyle_opts=TextStyleOpts(font_size=14)  # 文字样式配置项
    )
)
```

#### 5、视觉映射配置

```python
line.set_global_opts(
    # 视觉映射配置
    visualmap_opts=options.VisualMapOpts(
        is_show=False,  # 是否显示视觉映射配置
        type_="color",  # 映射过渡类型，可选，"color", "size"
        min_=0,  # 指定 visualMapPiecewise 组件的最小值
        max_=100,  # 指定 visualMapPiecewise 组件的最大值
        range_text=None,  # 两端的文本，如['High', 'Low']。
        range_color=None,  # visualMap 组件过渡颜色
        range_size=None,  # visualMap 组件过渡 symbol 大小
        range_opacity=None,  # visualMap 图元以及其附属物（如文字标签）的透明度
        orient="vertical",  # 如何放置 visualMap 组件，水平（'horizontal'）或者竖直（'vertical'）
        pos_left=None,  # visualMap 组件离容器左侧的距离,也可以是 'left', 'center', 'right',可是具体像数值也可以是百分比
        pos_right=None,  # visualMap 组件离容器右侧的距离
        pos_top=None,  # visualMap 组件离容器上侧的距离
        pos_bottom=None,  # visualMap 组件离容器下侧的距离
        split_number=5,  # 对于连续型数据，自动平均切分成几段。
        series_index=None,  # 指定取哪个系列的数据，默认取所有系列。
        dimension=None,  # 组件映射维度
        is_calculable=True,  # 是否显示拖拽用的手柄（手柄能拖拽调整选中范围）
        is_piecewise=False,  # 是否为分段型
        is_inverse=False,  # 是否反转 visualMap 组件
        pieces=None,
        # 自定义的每一段的范围，以及每一段的文字，以及每一段的特别的样式。例如 {"min": 1500}；{"min": 900, "max": 1500};{"min": 10, "max": 200, "label": '10 到 200（自定义label）'}
        out_of_range=None,  # 定义 在选中范围外 的视觉元素。（用户可以和 visualMap 组件交互，用鼠标或触摸选择范围）
        item_width=0,  # 图形的宽度，即长条的宽度
        item_height=0,  # 图形的高度，即长条的高度
        background_color=None,  # visualMap 组件的背景色
        border_color=None,  # visualMap 组件的边框颜色
        border_width=0,  # visualMap 边框线宽，单位px
        textstyle_opts=None  # 文字样式配置项
    )
)
```

#### 6、区域缩放

```python
line.set_global_opts(
    # 区域缩放
    datazoom_opts=options.DataZoomOpts(
        is_show=True,  # 是否显示 组件。如果设置为 false，不会显示，但是数据过滤的功能还存在
        type_="slider",  # 组件类型，可选 "slider", "inside"
        is_realtime=True,  # 拖动时，是否实时更新系列的视图。如果设置为 false，则只在拖拽结束的时候更新。
        range_start=20,  # 数据窗口范围的起始百分比。范围是：0 ~ 100。表示 0% ~ 100%
        range_end=80,  # 数据窗口范围的结束百分比。范围是：0 ~ 100
        start_value=None,  # 数据窗口范围的起始数值。如果设置了 start 则 startValue 失效。
        end_value=None,  # 数据窗口范围的结束数值。如果设置了 end 则 endValue 失效
        orient="horizontal",  # 布局方式是横还是竖。可选值为：'horizontal', 'vertical'
        xaxis_index=None,
        # 设置 dataZoom-inside 组件控制的 x 轴。不指定时，当 dataZoom-inside.orient 为 'horizontal'时，默认控制和 dataZoom 平行的第一个 xAxis 。如果是 number 表示控制一个轴，如果是 Array 表示控制多个轴
        yaxis_index=None,  # 设置 dataZoom-inside 组件控制的 y 轴
        is_zoom_lock=False,  # 是否锁定选择区域（或叫做数据窗口）的大小。如果设置为 true 则锁定选择区域的大小，也就是说，只能平移，不能缩放。
        pos_left=None,  # dataZoom-slider 组件离容器左侧的距离。可以是20 或者 '20%'也可以是 'left', 'center', 'right'
        pos_top=None,  # dataZoom-slider 组件离容器上侧的距离 也可以是 'top', 'middle', 'bottom'
        pos_right=None,  # dataZoom-slider 组件离容器右侧的距离
        pos_bottom=None,  # dataZoom-slider组件离容器下侧的距离。
    )
)
```



#### 7、工具箱

```python
line.set_global_opts(
  # 工具箱配置
    toolbox_opts=options.ToolboxOpts(
        is_show=True,  # 是否显示工具箱   
    )
)
```







#### 8、通用模板

```python
# 导包
from pyecharts.charts import Line
# 配置
from pyecharts import options

# 得到折线图对象
line = Line(
    init_opts=options.InitOpts(
        width='900px',  # 图表画布宽度
        height='500px',  # 图标画布长度
    )
)

# 添加x轴数据
line.add_xaxis(["中国", "美国", "英国"])

# 添加y轴数据
line.add_yaxis(
    series_name="GDP",  # 设置图例名称
    y_axis=[30, 20, 15],  # 设置y轴数据
    symbol_size=10,  # 设置图例点的大小
)

# 全局设置
line.set_global_opts(
    # 标题配置项
    title_opts=options.TitleOpts(
        title="主标题文本",
        subtitle="副标题文本"
    ),
    # 图例配置项
    legend_opts=options.LegendOpts(
        is_show=True,  # 是否显示图例
        legend_icon='pin'  # 图例项的 pin 和 roundRect 比较好看
    ),
    # 坐标轴配置项
    xaxis_opts=options.AxisOpts(
        is_show=True,  # 是否显示x轴
    ),
    yaxis_opts=options.AxisOpts(
        is_show=True,  # 是否显示y轴
    ),
    # 视觉映射配置项
    visualmap_opts=options.VisualMapOpts(
        is_show=True,  # 是否显示
        type_="color",  # 映射过渡类型，可选，"color", "size"
        orient="vertical",  # 如何放置 visualMap 组件，水平（'horizontal'）或者竖直（'vertical'）
    ),
    # 提示框配置
    tooltip_opts=options.TooltipOpts(
        is_show=True,
        trigger_on="mousemove|click",  # 提示框触发的条件
        axis_pointer_type="cross",  # 指示器类型
    ),
    # 区域缩放
    datazoom_opts=options.DataZoomOpts(
        is_show=True,  # 是否显示组件
        type_="slider",  # 组件类型，可选 "slider", "inside"
    ),
    # 工具箱配置
    toolbox_opts=options.ToolboxOpts(
        is_show=True,  # 是否显示工具箱

    )
)

# 生成图表
line.render()
```











# 2、PyMysql

## 2.1、安装

1. 安装

```bash
pip install pymysql -i https://pypi.tuna.tsinghua.edu.cn/simple
```









## 2.2、使用

```python
from pymysql import Connection

# 创建数据库链接
con = Connection(
    host="localhost",  # 主机名
    port=3306,  # 端口
    user="root",  # 账户
    password="123456",  # 密码
)

# MySQL的版本
print(con.get_server_info())  # 8.0.26

# 关闭连接
con.close()
```

防止出现异常,我们加上 try except finally

```python
from pymysql import Connection

con = None

try:
    # 创建数据库链接
    con = Connection(
        host="localhost",  # 主机名
        port=3306,  # 端口
        user="root",  # 账户
        password="123456",  # 密码
    )
    # MySQL的版本
    print(con.get_server_info())  # 8.0.26
except Exception as e:
    print(e)
finally:
    if con:
        # 关闭连接
        con.close()
```



### 2.2.1、pymysql执行查询语句

连接MySQL数据库后，可以使用cursor()方法创建一个游标对象。游标对象用于执行MySQL语句并返回结果。

- 游标对象使用fetchall()方法，得到的是全部的查询结果，是一个元组
- 这个元组内部嵌套了元组，嵌套的元组就是一行查询结果

```python
from pymysql import Connection

con = None

try:
    # 创建数据库链接
    con = Connection(
        host="localhost",  # 主机名
        port=3306,  # 端口
        user="root",  # 账户
        password="123456",  # 密码
        database="springboot_layui"  # 指定要操作的数据库
    )
    # 创建游标对象
    cursor = con.cursor()
    # sql语句
    sql = "select * from student"
    # 使用游标对象,执行sql
    cursor.execute(sql)
    # 获取查询结果
    result: tuple = cursor.fetchall()
    for row in result:
        print(row)
except Exception as e:
    print(e)
finally:
    if con:
        # 关闭连接
        con.close()
```



![](python(七).assets/3.png)



### 2.2.2、pymysql执行插入语句

执行修改操作，需要通过Connection对象调用commit()方法确认提交，`autocommit=True ` 设置自动提交

```python
from pymysql import Connection

con = None

try:
    # 创建数据库链接
    con = Connection(
        host="localhost",  # 主机名
        port=3306,  # 端口
        user="root",  # 账户
        password="123456",  # 密码
        database="springboot_layui",  # 指定要操作的数据库
        autocommit=True  # 自动提交
    )
    # 创建游标对象
    cursor = con.cursor()
    # sql语句
    sql = "INSERT INTO `springboot_layui`.`student` (`id`, `student_no`, `student_name`, `student_start_year`, `student_finish_year`) VALUES (20, '20230020', '杨二十', '2023', '2027')"
    # 使用游标对象,执行sql
    cursor.execute(sql)
    # 获取查询结果
    result: tuple = cursor.fetchall()
    for row in result:
        print(row)
except Exception as e:
    print(e)
finally:
    if con:
        # 关闭连接
        con.close()

```



### 2.2.3、pymysql执行update语句

```python
from pymysql import Connection

con = None

try:
    # 创建数据库链接
    con = Connection(
        host="localhost",  # 主机名
        port=3306,  # 端口
        user="root",  # 账户
        password="123456",  # 密码
        database="springboot_layui",  # 指定要操作的数据库
        autocommit=True  # 自动提交
    )
    # 创建游标对象
    cursor = con.cursor()
    # sql语句
    sql = "UPDATE `springboot_layui`.`student` SET `student_sex` = '男' WHERE `id` = 20"
    # 使用游标对象,执行sql
    cursor.execute(sql)
    # 获取查询结果
    result: tuple = cursor.fetchall()
    for row in result:
        print(row)
except Exception as e:
    print(e)
finally:
    if con:
        # 关闭连接
        con.close()

```



### 2.2.4、pymysql执行delete语句

```python
from pymysql import Connection

con = None

try:
    # 创建数据库链接
    con = Connection(
        host="localhost",  # 主机名
        port=3306,  # 端口
        user="root",  # 账户
        password="123456",  # 密码
        database="springboot_layui",  # 指定要操作的数据库
        autocommit=True  # 自动提交
    )
    # 创建游标对象
    cursor = con.cursor()
    # sql语句
    sql = "delete from student where id = 20"
    # 使用游标对象,执行sql
    cursor.execute(sql)
    # 获取查询结果
    result: tuple = cursor.fetchall()
    for row in result:
        print(row)
except Exception as e:
    print(e)
finally:
    if con:
        # 关闭连接
        con.close()

```











































