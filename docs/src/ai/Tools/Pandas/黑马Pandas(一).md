# 1、Pandas

![](黑马Pandas(一).assets/1.png)

> 潘哒斯~

## 1.1、Pandas优点

Numpy已经能够帮助我们处理数据，能够结合matplotlib解决部分数据展示等问题，那么pandas学习的目的在什么地方呢？

- **增强图表可读性**
- **便捷的数据处理能力**
- **读取文件方便**
- **封装了Matplotlib、Numpy的画图和计算**

![](黑马Pandas(一).assets/2.png)

# 2、Pandas数据结构



Pandas中一共有三种数据结构，分别为：

1. Series：一维数据结构
2. DataFrame：二维的表格型的数据结构
3. MultiIndex：三维的数据结构(了解)



## 2.1、Series

Series是一个类似于一维数组的数据结构，它能够保存任何类型的数据，比如整数、字符串、浮点数等，**主要由一组数据和与之相关的索引两部分构成。**其实类似于Java的Map结构

![](黑马Pandas(一).assets/3.png)

### 2.1.1、Series的创建

```python
# 导入pandas
import pandas as pd

pd.Series(data=None, index=None, dtype=None)
```

参数：

- data：传入的数据，可以是ndarray、list等
- index：索引，必须是唯一的，且与数据的长度相等。如果没有传入索引参数，则默认会自动创建一个从0-N的整数索引。
- dtype：数据的类型

通过已有数据创建：

- 指定内容，默认索引

```python
# np.arange(10) 生成随机0-10，步长默认为1的数组
pd.Series(np.arange(10))
```

![](黑马Pandas(一).assets/4.png)

- 指定索引

```python
pd.Series([6.7,5.6,3,10,2], index=[1,2,3,4,5])
```

![](黑马Pandas(一).assets/5.png)

- 通过字典数据创建

```python
color_count = pd.Series({'red':100, 'blue':200, 'green': 500, 'yellow':1000})
color_count
```

![](黑马Pandas(一).assets/6.png)

### 2.1.2、Series的属性

为了更方便地操作Series对象中的索引和数据，**Series中提供了两个属性index和values**

- 索引index

```python
import numpy as np
# 导入pandas
import pandas as pd

color_count = pd.Series({'red':100, 'blue':200, 'green': 500, 'yellow':1000})
# 查看全部索引
color_count.index

# 查看全部值
color_count.values
```

![](黑马Pandas(一).assets/7.png)

也可以使用索引来获取数据：

![](黑马Pandas(一).assets/8.png)



## 2.2、DataFrame

DataFrame是一个类似于二维数组或表格(如excel)的对象，既有行索引，又有列索引

- 行索引，表明不同行，横向索引，叫index，0轴，axis=0
- 列索引，表名不同列，纵向索引，叫columns，1轴，axis=1
- 可以把DataFrame看作由Series对象组成的字典，**其中key是列名，值是Series**

### 2.2.1、DataFrame的创建

```python
# 导入pandas
import pandas as pd

pd.DataFrame(data=None, index=None, columns=None)
```

- 参数：
  - index：行标签。如果没有传入索引参数，则默认会自动创建一个从0-N的整数索引。
  - columns：列标签。如果没有传入索引参数，则默认会自动创建一个从0-N的整数索引。

```python
# np.random.randn(2,3)随机生成2行3列的值
pd.DataFrame(np.random.randn(2,3))
```

![](黑马Pandas(一).assets/9.png)

举例二：创建学生成绩表

```python
# 生成10名同学，5门功课的数据
score = np.random.randint(40, 100, (10, 5))

# 使用Pandas中的数据结构
score_df = pd.DataFrame(score)
```

![](黑马Pandas(一).assets/10.png)

但是这样可读性比较差，我们加上行列索引，显示结果更佳：

```python
# 构造行索引序列
subjects = ["语文", "数学", "英语", "政治", "体育"]

# 构造列索引序列
stu = ['同学' + str(i) for i in range(score_df.shape[0])]

# 添加行索引
data = pd.DataFrame(score, columns=subjects, index=stu)
```

![](黑马Pandas(一).assets/11.png)



### 2.2.2、DataFrame的属性

- **shape**：查看是几行几列

![](黑马Pandas(一).assets/12.png)

- **index**:DataFrame的行索引列表

![](黑马Pandas(一).assets/13.png)

- **columns**:DataFrame的列索引列表

![](黑马Pandas(一).assets/14.png)

- **values**:直接获取其中array的值

![](黑马Pandas(一).assets/15.png)

- T：转置

![](黑马Pandas(一).assets/16.png)

- **head(5)**：显示前5行内容.如果不补充参数，默认5行。填入参数N则显示前N行

![](黑马Pandas(一).assets/17.png)

- **tail(5)**:显示后5行内容。如果不补充参数，默认5行。填入参数N则显示后N行

### 2.2.3、DataFrame索引的设置

例如我们想要行索引值为：`学生_x`

![](黑马Pandas(一).assets/18.png)

```python
stu = ["学生_" + str(i) for i in range(score_df.shape[0])]

# 必须整体全部修改
data.index = stu
```

注意：以下修改方式是错误的

```python
# 错误修改方式
data.index[3] = '学生_3'
```



#### 1、重设索引

- reset_index(drop=False)
  - 设置新的下标索引
  - drop:默认为False，不删除原来索引，如果为True,删除原来的索引值

```python
# 重置索引,drop=False
data.reset_index()
```

![](黑马Pandas(一).assets/19.png)

```python
# 重置索引,drop=True
data.reset_index(drop=True)
```



![](黑马Pandas(一).assets/20.png)

#### 2、以某列值设置为新的索引

- set_index(keys, drop=True)
  - **keys** : 列索引名成或者列索引名称的列表
  - **drop** : boolean, default True.当做新的索引，删除原来的列

1. 以月份设置新的索引:

```python
import numpy as np
# 导入pandas
import pandas as pd

df = pd.DataFrame({'month': [1, 4, 7, 10],
                    'year': [2012, 2014, 2013, 2014],
                    'sale':[55, 40, 84, 31]})

#以月份设置新的索引
df.set_index('month')
```

![](黑马Pandas(一).assets/21.png)



2. 设置多个索引，以年和月份为索引

![](黑马Pandas(一).assets/22.png)

> 注：通过刚才的设置，这样DataFrame就变成了一个具有MultiIndex的DataFrame





## 2.3、MultiIndex

MultiIndex是三维的数据结构;多级索引（也称层次化索引）是pandas的重要功能，可以在Series、DataFrame对象上拥有2个以及2个以上的索引。

### 2.3.1、创建MultiIndex

- `MultiIndex.from_arrays()`：传入一个数组列表

```python
arrays = [[1, 1, 2, 2], ['red', 'blue', 'red', 'blue']]
pd.MultiIndex.from_arrays(arrays, names=('number', 'color'))
```

![](黑马Pandas(一).assets/23.png)

> 忙忒Index



### 2.3.2、MultiIndex的属性

- index属性
  - names:levels的名称
  - levels：每个level的元组值

> 待补充





# 3、基本数据操作

为了更好的理解这些基本操作，我们将读取一个真实的股票数据。关于文件操作，后面在介绍，这里只先用一下API

```python
import numpy as np
# 导入pandas
import pandas as pd

# 读取文件
data = pd.read_csv("./KuangStudy_Data/01_stock_day.csv")

# 删除一些列，让数据更简单些，再去做后面的操作
data = data.drop(["ma5","ma10","ma20","v_ma5","v_ma10","v_ma20"], axis=1)
data
```

![](黑马Pandas(一).assets/24.png)

## 3.1、索引操作

Numpy当中我们已经讲过使用索引选取序列和切片选择，pandas也支持类似的操作，也可以直接使用列名、行名称，甚至组合使用。

### 3.1.1、直接使用行列索引(先列后行)

获取'2018-02-27'这天的'close'的结果

```python
# 直接使用行列索引名字的方式（先列后行）
data['open']['2018-02-27']

# 不支持的操作
# 错误
data['2018-02-27']['open']
# 错误
data[:1, :2]
```

![](黑马Pandas(一).assets/25.png)



### 3.1.2、结合loc或者iloc使用索引

```python
# 使用loc:只能指定行列索引的名字
data.loc['2018-02-27':'2018-02-22', 'open']
```

![](黑马Pandas(一).assets/26.png)

```python
# 使用iloc可以通过索引的下标去获取
# 获取前3天数据,前5列的结果
data.iloc[:3, :5]
```

![](黑马Pandas(一).assets/27.png)











### 3.1.3、组合索引



获取前四行的open、close、volume这三个指标的结果

```python
data.loc[data.index[0:4], ['open', 'close', 'volume',]]
```

![](黑马Pandas(一).assets/28.png)



```python
data.iloc[0:4, data.columns.get_indexer(['open', 'close', 'volume'])]
```





## 3.2、赋值操作

对DataFrame当中的close列进行重新赋值为1

```python
# 直接修改原来的值
data['close'] = 1
# 或者
data.close = 1
```

![](黑马Pandas(一).assets/29.png)



## 3.3、排序

排序有两种形式，一种对于索引进行排序，一种对于内容进行排序

### 3.3.1、DataFrame排序

使用`df.sort_values(by=, ascending=)`单个键或者多个键进行排序

- by：指定排序参考的键
- ascending:默认升序
  - ascending=False:降序
  - ascending=True:升序

```python
# 按照开盘价大小进行排序 , 使用ascending指定按照大小排序
data.sort_values(by="open", ascending=True).head()

# 按照多个键进行排序
data.sort_values(by=['open', 'high'])
```



![](黑马Pandas(一).assets/30.png)

- 使用df.sort_index给索引进行排序

这个股票的日期索引原来是从大到小，现在重新排序，从小到大

```python
# 对索引进行排序
data.sort_index()
```



![](黑马Pandas(一).assets/31.png)





### 3.3.2、Series排序

- 使用series.sort_values(ascending=True)进行排序

series排序时，只有一列，不需要参数

```python
data['p_change'].sort_values(ascending=True).head()
```



![](黑马Pandas(一).assets/32.png)



- 使用series.sort_index()对索引进行排序





# 4、DataFrame运算

## 4.1、算术运算

- add(other)

比如进行数学运算加上具体的一个数字

```python
data['open'].add(1)
```

![](黑马Pandas(一).assets/33.png)

- sub(other):减法





## 4.2、逻辑运算

例如筛选data["open"] > 23的日期数据

```python
# 逻辑判断的结果可以作为筛选的依据
data[data["open"] > 23].head()


# 完成多个逻辑判断
data[(data["open"] > 23) & (data["open"] < 24)].head()
```



- query(expr)
  - expr:查询字符串

```python
# 通过query使得刚才的过程更加方便简单
data.query("open<24 & open>23").head()
```



- isin(values)

```python
# 例如判断'open'是否为23.53和23.85
# 可以指定值进行一个判断，从而进行筛选操作
data[data["open"].isin([23.53, 23.85])]
```





## 4.3、统计运算

### 4.3.1、describe

综合分析: 能够直接得出很多统计结果,`count`, `mean`, `std`, `min`, `max` 等

```python
# 计算平均值、标准差、最大值、最小值
data.describe()
```

![](黑马Pandas(一).assets/34.png)



### 4.3.2、统计函数

Numpy当中已经详细介绍，在这里我们演示min(最小值), max(最大值), mean(平均值), median(中位数), var(方差), std(标准差),mode(众数)结果:

|      | 常用接口                   | 参数              | 返回值           | 说明                                                         |
| ---- | -------------------------- | ----------------- | ---------------- | ------------------------------------------------------------ |
| 1    | data.mean()                | axis=0/1默认值为0 | Series           | 求**列**平均值                                               |
| 2    | data.std()                 | axis=0/1默认值为0 | Series           | 求每**列**的标准差                                           |
| 3    | data.var()                 | axis=0/1默认值为0 | Series           | 求每**列**的方差                                             |
| 4    | data.median()              | axis=0/1默认值为0 | Series           | 求每**列**的中位数                                           |
| 5    | data.min()                 | axis=0/1默认值为0 | Series           | 求每**列**的最小值                                           |
| 6    | data.max()                 | axis=0/1默认值为0 | Series           | 求每**列**的最大值                                           |
| 7    | data.sum()                 | axis=0/1默认值为0 | DataFrame/Series | 对每**列**求和                                               |
| 8    | data.cumsum()              | axis=0/1默认值为0 | DataFrame/Series | 对每**行**进行累加                                           |
| 9    | data.count()               | axis=0/1默认值为0 | DataFrame/Series | 按**列**统计非空元素个数                                     |
| 10   | data.nunique()             | axis=0/1默认值为0 | int/Series       | 统计Series中不同值的个数／统计DataFrame中每**列**中几个不同值 |
| 11   | data_series.mode()         |                   | Series           | 常用在返回对Series中出现最多的元素                           |
| 12   | data_series.unique()       |                   | ndarray          | 只能用在统计Series中存在的不重复元素                         |
| 13   | data_series.value_counts() |                   | Series           | 只能用在统计Series中每个元素出现的次数                       |



> **对于单个函数去进行统计的时候，坐标轴还是按照默认列“columns” (axis=0, default)，如果要对行“index” 需要指定(axis=1)**



```python
# 使用统计函数：0 代表列求结果， 1 代表行求统计结果
data.max(0)

data.min(0)
```

![](黑马Pandas(一).assets/35.png)

- 标准差std()、方差var()

```python
# 对列求方差
data.var(0)

# 对列求标准差
data.std(0)
```

- **median()：中位数**：中位数为将数据从小到大排列，在最中间的那个数为中位数。如果没有中间数，取中间两个数的平均值。

```python
data.median(0)
```



- 求出最大值的位置idxmax()、求出最小值的位置idxmin()

```python
# 求每列的最大值的位置
data.idxmax(axis=0)
```

![](黑马Pandas(一).assets/36.png)



### 4.3.3、累计统计函数

| 函数      | 作用                        |
| --------- | --------------------------- |
| `cumsum`  | **计算前1/2/3/…/n个数的和** |
| `cummax`  | 计算前1/2/3/…/n个数的最大值 |
| `cummin`  | 计算前1/2/3/…/n个数的最小值 |
| `cumprod` | 计算前1/2/3/…/n个数的积     |

**那么这些累计统计函数怎么用？**

![](黑马Pandas(一).assets/37.png)

这里我们按照时间的从前往后来进行累计：

```python
# 按照索引排序(刚好索引就是时间)
data = data.sort_index()

# 对p_change列进行求和
stock_rise = data['p_change']
stock_rise.cumsum()
```

![](黑马Pandas(一).assets/38.png)

为了让更好的显示，我们可以使用plot函数：

```python
# 导入matplotlib
import matplotlib.pyplot as plt

# plot显示图形
stock_rise.cumsum().plot()
# 需要调用show，才能显示出结果
plt.show()
```

![](黑马Pandas(一).assets/39.png)



## 4.4、自定义运算

- apply(func, axis=0)
  - func:自定义函数
  - axis=0:默认是列，axis=1为行进行运算

- 定义一个对**列的最大值-最小值**的函数

```python
data[['open', 'close']].apply(lambda x: x.max() - x.min(), axis=0)
```







# 5、Pandas画图

使用pandas.DataFrame的plot方法绘制图像会**按照数据的每一列绘制一条曲线**，默认按照列columns的名称在适当的位置展示图例，比matplotlib绘制节省时间，且DataFrame格式的数据更规范，方便向量化及计算。



## 5.1、折线图Line

1. 普通用法

```python
ts = pd.Series(np.random.randn(1000), index=pd.date_range("1/1/2000", periods=1000))
ts = ts.cumsum().plot()
```

- `np.random.randn(1000)`: 这部分是利用NumPy库生成一个包含1000个元素的数组，这些元素是从标准正态分布（均值为0，标准差为1的正态分布）中随机抽取的。
- `pd.Series(...)`: 这部分是将上述生成的随机数组转换为一个Pandas的Series对象。Pandas的Series是一种一维数组结构，它可以存储任何数据类型（整数、字符串、浮点数、Python对象等），每个元素都有一个标签（索引）。
- `index=pd.date_range("1/1/2000", periods=1000)`: 这里为Series对象指定了一个索引。`pd.date_range`函数生成了一个日期范围，从"1/1/2000"（即2000年1月1日）开始，总共生成1000个日期。这意味着每个随机生成的数值都会与一个特定的日期相关联。

![](黑马Pandas(一).assets/40.png)

2. 展示多列数据

```python
df = pd.DataFrame(np.random.randn(1000, 4), index=pd.date_range("1/1/2000", periods=1000), columns=list("ABCD"))
df = df.cumsum().plot()
```

- `np.random.randn(1000, 4)`: 这部分生成了一个1000行4列的数组，数组中的每个元素都是从标准正态分布中随机抽取的。这意味着你将有1000个观测值，每个观测值都有4个特征或变量。
- `pd.DataFrame(...)`: 这部分将上述生成的随机数组转换为一个Pandas的DataFrame对象。DataFrame是Pandas中用于存储和操作结构化数据的主要数据结构。
- `index=pd.date_range("1/1/2000", periods=1000)`: 与之前的示例类似，这里为DataFrame指定了一个索引。`pd.date_range`函数生成了一个从"1/1/2000"（即2000年1月1日）开始的日期范围，总共1000个日期。这些日期将作为DataFrame的行索引。
- `columns=list("ABCD")`: 这里为DataFrame指定了列标签。`list("ABCD")`创建了一个包含四个字符串（"A", "B", "C", "D"）的列表，这些字符串将作为DataFrame的列名。

![](黑马Pandas(一).assets/41.png)

![](黑马Pandas(一).assets/42.png)

若要让时间刻度良好展示，可以：

```python
plot(x_compat=True)
```

![](黑马Pandas(一).assets/43.png)







## 5.2、条形图bar

```python
df = pd.DataFrame(np.random.rand(10, 4), columns=["a", "b", "c", "d"])
df.plot.bar()
```

![](黑马Pandas(一).assets/44.png)

若要生成堆积条形图，可加参数

```python
bar(stacked=True)
```

![](黑马Pandas(一).assets/45.png)



若要生成水平条形图：

```python
df.plot.barh()
```

![](黑马Pandas(一).assets/46.png)



> 剩余图形请参考更好的文章：[pandas plot绘图详解：一文教会你各种绘图](https://blog.csdn.net/weixin_45698637/article/details/122788909?ops_request_misc=%257B%2522request%255Fid%2522%253A%25220415f071bbd91a7efbe488bb10842834%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=0415f071bbd91a7efbe488bb10842834&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_positive~default-1-122788909-null-null.142^v100^pc_search_result_base1&utm_term=Pandas%E7%94%BB%E5%9B%BE&spm=1018.2226.3001.4187)







# 6、文件读取与存储

我们的数据大部分存在于文件当中，所以pandas会支持复杂的IO操作，pandas的API支持众多的文件格式，如CSV、SQL、XLS、JSON、HDF5。

> 注：最常用的HDF5和CSV文件

- `pandas.read_csv(filepath_or_buffer, sep =',', usecols )`
  - filepath_or_buffer:文件路径
  - sep :分隔符，默认用","隔开
  - usecols:指定读取的列名，列表形式

```python
# 读取文件,并且指定只获取'open', 'close'指标
data = pd.read_csv("./KuangStudy_Data/01_stock_day.csv", usecols=['open', 'close'])
```

![](黑马Pandas(一).assets/47.png)

- `DataFrame.to_csv(path_or_buf=None, sep=', ’, columns=None, header=True, index=True, mode='w', encoding=None)`:保存文件
  - path_or_buf :文件路径
  - sep :分隔符，默认用","隔开
  - columns :选择需要的列索引
  - header :boolean or list of string, default True,是否写进列索引值
  - index:是否写进行索引
  - mode:'w'：重写, 'a' 追加

- 举例：保存读取出来的股票数据
  - 保存'open'列的数据，然后读取查看结果

```python
# 选取10行数据保存,便于观察数据
data[:10].to_csv("./KuangStudy_Data/02_stock_save.csv", columns=['open'])
```

![](黑马Pandas(一).assets/48.png)

会发现将索引(也就是时间)存入到文件当中，变成单独的一列数据。如果需要删除，可以指定index参数,删除原来的文件，重新保存一次。

```python
# index:存储不会将索引值变成一列数据
data[:10].to_csv("./KuangStudy_Data/02_stock_save.csv", columns=['open'], index=False)
```

![](黑马Pandas(一).assets/49.png)





## 6.1、HDF5

### 6.1.1、read_hdf与to_hdf

**HDF5文件的读取和存储需要指定一个键，值为要存储的DataFrame**

- `pandas.read_hdf(path_or_buf，key =None，** kwargs)`：从h5文件当中读取数据
  - path_or_buffer:文件路径
  - key:读取的键
  - return:Theselected object
- `DataFrame.to_hdf(path_or_buf, key, ** kwargs)`

```python
# 读取文件
day_close = pd.read_hdf("./KuangStudy_Data/02_day_close.h5")
```

![](黑马Pandas(一).assets/50.png)

- 存储文件

```python
# 存储的时候需要给个key
day_close.to_hdf("./KuangStudy_Data/02_day_close_save.h5", key="day_close")
```



再次读取的时候, 需要指定键的名字

```python
new_close = pd.read_hdf("./data/test.h5", key="day_close")
```

**注意：优先选择使用HDF5文件存储**

- HDF5在存储的时候支持压缩，**使用的方式是blosc，这个是速度最快**的也是pandas默认支持的
- 使用压缩可以**提磁盘利用率，节省空间**
- HDF5还是跨平台的，可以轻松迁移到hadoop 上面





## 6.2、JSON

- `pandas.read_json(path_or_buf=None, orient=None, typ='frame', lines=False)`:将JSON格式准换成默认的Pandas DataFrame格式
  - path_or_buf: json文件的路径
  - orient
    - split：index -> [index], columns -> [columns], data -> [values]。split 将索引总结到索引，列名到列名，数据到数据。将三部分都分开了
    - records：records 以`columns：values`的形式输出
    - index：ndex 以`index：{columns：values}...`的形式输出
    - columns：colums 以`columns:{index:values}`的形式输出
    - values：values 直接输出值
  - typ : default ‘frame’， 指定转换成的对象类型series或者dataframe
  - lines : boolean, default False。按照每行读取json对象

```python
# orient指定存储的json格式，lines指定按照行去变成一个样本
json_read = pd.read_json("./KuangStudy_Data/03_Dataset.json", orient="records", lines=True)
```

其中03_Dataset.json里面的数据如下:

![](黑马Pandas(一).assets/51.png)

![](黑马Pandas(一).assets/52.png)



- `DataFrame.to_json(path_or_buf=None, orient=None, lines=False)` ： 将Pandas 对象存储为json格式
  - path_or_buf=None：文件地址
  - orient:存储的json形式，{‘split’,’records’,’index’,’columns’,’values’}
  - lines:一个对象存储为一行

```python
# 存储文件
json_read.to_json("./KuangStudy_Data/03_Dataset_save.json", orient='records')
```













































































































































