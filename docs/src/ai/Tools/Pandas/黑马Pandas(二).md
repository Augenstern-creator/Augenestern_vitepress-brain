# 1、缺失值处理

![](黑马Pandas(二).assets/1.png)



如何处理上面的nan呢？

## 1.1、判断缺失值是否存在

- pd.notnull()：检测数组或对象中的非缺失值，如果返回Ture，则说明无缺失值，如果返回False，则说明有缺失值
- pd.isnull()：如果返回Ture，则说明有缺失值，如果返回False，则说明无缺失值

```python
# 读取电影数据
movie = pd.read_csv("./KuangStudy_Data/04_Movie_Data.csv")

# 判断缺失值是否存在
pd.notnull(movie)

# 也可以
pd.isnull(movie)	
```

![](黑马Pandas(二).assets/2.png)

- np.all():all函数用于判断整个数组中的元素的值是否全部满足条件，如果满足条件返回True，否则返回False。
- np.any():any函数用于判断整个数组中的元素的值是否有满足条件的，有满足条件的就返回True。返回False则说明都不满足条件。

```python
# 里面如果有一个缺失值，那么会返回False，说明有缺失值
np.all(pd.notnull(movie))
```



## 1.2、删除缺失值nan

- pandas删除缺失值，使用dropna的前提是，缺失值的类型必须是np.nan

```python
# 不修改原数据
movie.dropna()

# 可以定义新的变量接受或者用原来的变量名
data = movie.dropna()
```

2. 替换缺失值

```python
# 替换存在缺失值的样本的两列
# 替换填充平均值，中位数
# Revenue (Millions)是列名，movie['Revenue (Millions)'] 是取出这一列
# movie['Revenue (Millions)'].mean() 替换 movie['Revenue (Millions)'] 列
# inplace=True，是否在原数据上替换
movie['Revenue (Millions)'].fillna(movie['Revenue (Millions)'].mean(), inplace=True)
```

- fillna(value=None, method=None, axis=None，inplace=boolean)
  - **value**：用于填充的空值的值
  - method： {'backfill', 'bfill', 'pad', 'ffill', None}, default None。定义了填充空值的方法， pad / ffill表示用前面行/列的值，填充当前行/列的空值， backfill / bfill表示用后面行/列的值，填充当前行/列的空值
  - **axis**：轴。0或'index'，表示按行删除；1或'columns'，表示按列删除
  - **inplace**：是否在原数据上替换

替换所有缺失值：

```python
for i in movie.columns:
    if np.all(pd.notnull(movie[i])) == False:
        print(i)
        movie[i].fillna(movie[i].mean(), inplace=True)
```

还有一种情况，数据不是缺失值nan，有默认标记的：

![](黑马Pandas(二).assets/3.png)

上面数据在读取时，可能会报错,解决办法如下：

```python
# 全局取消证书验证
import ssl
ssl._create_default_https_context = ssl._create_unverified_context
```

如果要处理上述数据，思路如下：

1. 先替换`?`为`np.nan`
   - `df.replace(to_replace,value)`
     - to_replace:替换前的值
     - value:替换后的值

```python
# 把一些其它值标记的缺失值，替换成np.nan
wis = wis.replace(to_replace='?', value=np.nan)

# 再进行缺失值的处理
# 删除
wis = wis.dropna()
```



# 2、数据离散化

## 2.1、为什么要离散化

连续属性离散化的目的是为了简化数据结构，**数据离散化技术可以用来减少给定连续属性值的个数**。离散化方法经常作为数据挖掘的工具。

- **连续属性的离散化就是在连续属性的值域上，将值域划分为若干个离散的区间，最后用不同的符号或整数** **值代表落在每个子区间中的属性值。**

离散化有很多种方法，这使用一种最简单的方式去操作

- 原始人的身高数据：165，174，160，180，159，163，192，184
- 假设按照身高分几个区间段：150~165, 165 ~ 180,180 ~ 195

这样我们将数据分到了三个区间段，我可以对应的标记为矮、中、高三个类别，最终要处理成一个"哑变量"矩阵

![](黑马Pandas(二).assets/9.png)

例如我们对股票每日的`p_change`进行离散化，2018/02/27的对应在`rise_(0,3])`，那么写1，其他位置写0





## 2.2、股票涨跌幅离散化

我们对股票每日的涨跌幅`p_change`列进行离散化

```python
# 1.先读取股票的数据，筛选出p_change数据
data = pd.read_csv("./KuangStudy_Data/01_stock_day.csv")
# 2.筛选出p_change列
p_change= data['p_change']
```

![](黑马Pandas(二).assets/4.png)

### 2.2.1、将股票涨跌幅数据进行分组

- `pd.qcut(data, q)`：对数据进行分组将数据分组，一般会与value_counts搭配使用，统计每组的个数
  - data:要分组的数据
  - q：分位数，可以是整数或分位数的数组。整数q表示将数据分为q个等份，而分位数数组则提供了具体的分位数值。
- `series.value_counts()`：统计分组次数

```python
# 自行分组(分10等分)
qcut = pd.qcut(p_change, 10)
# 计算分到每个组数据个数
qcut.value_counts()
```

![](黑马Pandas(二).assets/5.png)

自定义区间分组：

- `pd.cut(data, bins)`

```python
# 自己指定分组区间（指定分几个组，每个组有多少数据）
bins = [-100, -7, -5, -3, 0, 3, 5, 7, 100]
p_counts = pd.cut(p_change, bins)
```

![](黑马Pandas(二).assets/7.png)

```python
# 查看每个组有多少个数据
p_counts.value_counts()
```

![](黑马Pandas(二).assets/10.png)





### 2.2.2、股票涨跌幅分组数据变成one-hot编码

- **什么是one-hot编码**

把每个类别生成一个布尔列，这些列中只有一列可以为这个样本取值为1.其又被称为热编码。把下图中左边的表格转化为使用右边形式进行表示：

![](黑马Pandas(二).assets/6.png)

样本1属于人类Human，则样本1为：1 0 0 0

样本3属于企鹅Penguin，则样本3为：0 1 0 0





例如：人的性别有男女，祖国有中国，美国，法国等。这些特征值并不是连续的，而是离散的，无序的。通常我们需要对其进行特征数字化。

那什么是特征数字化呢？例子如下：

- 性别特征：["男"，"女"]
- 祖国特征：["中国"，"美国，"法国"]
- 运动特征：["足球"，"篮球"，"羽毛球"，"乒乓球"]

One-Hot编码是分类变量作为二进制向量的表示。这首先要求将分类值映射到整数值。然后，每个整数值被表示为二进制向量，除了整数的索引之外，它都是零值，它被标记为1。

就拿上面的例子来说吧，性别特征：["男","女"]，按照N位状态寄存器来对N个状态进行编码的原理，咱们处理后应该是这样的（这里只有两个特征，所以N=2）：

- 男 => 10
- 女 => 01

祖国特征：["中国"，"美国，"法国"]（这里N=3）：

- 中国 => 100
- 美国 => 010
- 法国 => 001

运动特征：["足球"，"篮球"，"羽毛球"，"乒乓球"]（这里N=4）：

- 足球 => 1000
- 篮球 => 0100
- 羽毛球 => 0010
- 乒乓球 => 0001

所以，当一个样本为["男","中国","乒乓球"]的时候，完整的特征数字化的结果为：`[1，0，1，0，0，0，0，0，1]`



---

- `pandas.get_dummies(data, prefix=None)`

  - data:需要进行 One-Hot 编码的数据，是分好组的数据
  - prefix：前缀，分组的名字

  ```python
  # 得出one-hot编码矩阵
  dummies = pd.get_dummies(p_counts, prefix="rise")
  dummies
  ```

  ![](黑马Pandas(二).assets/8.png)

新版本改为True和False显示了，如果要显示0和1，则加个参数:

```python
# 得出one-hot编码矩阵
dummies = pd.get_dummies(p_counts, prefix="rise",dtype=int)
dummies
```

![](黑马Pandas(二).assets/11.png)















# 3、合并

## 3.1、pd.concat

如果你的数据由多张表组成，那么有时候需要将不同的内容合并在一起分析。

- `pd.concat([data1, data2], axis=1)`：按照行或列进行合并,axis=0为列索引，axis=1为行索引

比如我们将刚才处理好的one-hot编码与原数据合并

```python
# 按照行索引进行合并
pd.concat([data, dummies], axis=1).head()
```

![](黑马Pandas(二).assets/12.png)



## 3.2、pd.merge

- `pd.merge(left, right, how='inner', on=None)`：可以指定按照两组数据的共同键值对合并或者左右各自
  - `left`: 拼接的左侧DataFrame对象
  - `right`: 拼接的右侧DataFrame对象
  - `on`: 指定的共同键，必须在左侧和右侧DataFrame对象中找到。
  - how:按照什么方式连接
    - `inner`：取交集
    - `outer`: 取并集
    - `left`：取左边

```python
left = pd.DataFrame({'key1': ['K0', 'K0', 'K1', 'K2'],
                        'key2': ['K0', 'K1', 'K0', 'K1'],
                        'A': ['A0', 'A1', 'A2', 'A3'],
                        'B': ['B0', 'B1', 'B2', 'B3']})
right = pd.DataFrame({'key1': ['K0', 'K1', 'K1', 'K2'],
                        'key2': ['K0', 'K0', 'K0', 'K0'],
                        'C': ['C0', 'C1', 'C2', 'C3'],
                        'D': ['D0', 'D1', 'D2', 'D3']})
```



![](黑马Pandas(二).assets/13.png)

```python
# 默认内连接
result = pd.merge(left, right, on=['key1', 'key2'])
```

![](黑马Pandas(二).assets/14.png)

- 内连接

![](黑马Pandas(二).assets/15.png)

- 左连接

```python
result = pd.merge(left, right, how='left', on=['key1', 'key2'])
```

![](黑马Pandas(二).assets/16.png)



- 右连接

```python
result = pd.merge(left, right, how='right', on=['key1', 'key2'])
```



![](黑马Pandas(二).assets/17.png)

- 外连接

```python
result = pd.merge(left, right, how='outer', on=['key1', 'key2'])
```

![](黑马Pandas(二).assets/18.png)





# 4、交叉表与透视表

**探究股票的涨跌与星期几有关？**

以下图当中表示，week代表星期几，1,0代表这一天股票的涨跌幅是好还是坏，里面的数据代表比例。比如星期1的0的概率是0.419847，1的概率是0.580153

![](黑马Pandas(二).assets/19.png)

交叉表：**交叉表用于计算一列数据对于另外一列数据的分组个数(用于统计分组频率的特殊透视表)**



- `pd.crosstab(value1, value2)`

透视表：**透视表是将原有的DataFrame的列分别作为行索引和列索引，然后对指定的列应用聚集函数**

- data.pivot_table(）
- DataFrame.pivot_table([], index=[])



## 4.1、案例

- 准备两列数据，星期数据以及涨跌幅是好是坏数据
- 进行交叉表计算

首先来看数据:

```python
# 1.先读取股票的数据
data = pd.read_csv("./KuangStudy_Data/01_stock_day.csv")
```

![](黑马Pandas(二).assets/20.png)

```python
# 索引
data.index
```



![](黑马Pandas(二).assets/21.png)

```python
# 把索引转化为时间格式并且赋值给time
time = pd.to_datetime(data.index)
time
```

![](黑马Pandas(二).assets/23.png)

```python
# 周几
time.weekday
# 第几天
time.day
```

![](黑马Pandas(二).assets/24.png)

```python
# 给data数据增加一列week,值是周几
data['week'] = time.weekday
```

![](黑马Pandas(二).assets/25.png)

```python
# 2、假如把p_change按照大小去分个类，0为界限，然后加一列posi_neg
data['posi_neg'] = np.where(data['p_change'] > 0, 1, 0)
```

![](黑马Pandas(二).assets/26.png)

```python
# 通过交叉表找寻两列数据的关系
count = pd.crosstab(data['week'], data['posi_neg'])
```

![](黑马Pandas(二).assets/27.png)

```python
# 通过透视表，可以得出所占的比例
data.pivot_table(['posi_neg'], index='week')
```

![](黑马Pandas(二).assets/28.png)

# 5、分组与聚合

**分组与聚合通常是分析数据的一种方式，通常与一些统计函数一起使用，查看数据的分组情况**。想一想其实刚才的交叉表与透视表也有分组的功能，所以算是分组的一种形式，只不过他们主要是计算次数或者计算比例！！



![](黑马Pandas(二).assets/29.png)

- `DataFrame.groupby(key, as_index=False)`
  - key:分组的列数据，可以多个

案例:不同颜色的不同笔的价格数据

```python
col =pd.DataFrame({'color': ['white','red','green','red','green'], 'object': ['pen','pencil','pencil','ashtray','pen'],'price1':[5.56,4.20,1.30,0.56,2.75],'price2':[4.75,4.12,1.60,0.75,3.15]})
col
```

![](黑马Pandas(二).assets/30.png)

- 进行分组，对颜色分组，price进行聚合

```python
# 分组，求平均值
# 根据color颜色分组，分的对象是price1，求聚合后的平均值
col.groupby(['color'])['price1'].mean()
```

![](黑马Pandas(二).assets/31.png)

























































  
