# 0、Python数据分析开源库

1. Numpy：是一个运行速度非常快的数学库，主要用于数组计算。
   - 一个强大的N维数组对象 ndarray，线性代数、傅里叶变换、随机数生成等功能

2. Pandas：是一个强大的分析结构化数据的工具集
   - 它的使用基础是Numpy（提供高性能的矩阵运算），用于数据挖掘和数据分析，同时也提供数据清洗功能
   - Pandas利器之 Series，是一种类似于一维数组的对象
   - andas利器之 DataFrame，是Pandas中的一个表格型的数据结构

3. Matplotlib：是一个功能强大的数据可视化开源Python库
   - Python中使用最多的图形绘图库
   - 可以创建静态, 动态和交互式的图表
4. Sklearn ：scikit-learn 是基于 Python 语言的机器学习工具
   - 简单高效的数据挖掘和数据分析工具，建立在 NumPy ，SciPy 和 matplotlib 上
5. Jupyter Notebook：是一个开源Web应用程序
   - 可以创建和共享代码、公式、可视化图表、笔记文档
   - 是数据分析学习和开发的首选开发环境



# 1、Numpy

![](黑马Numpy(一).assets/1.png)



Numpy（Numerical Python）是一个开源的Python科学计算库，**用于快速处理任意维度的数组**。

Numpy**支持常见的数组和矩阵操作**。对于同样的数值计算任务，使用Numpy比直接使用Python要简洁的多。

Numpy**使用ndarray对象来处理多维数组**，该对象是一个快速而灵活的大数据容器。

> 馕派~



## 1.1、ndarray

NumPy提供了一个**N维数组类型ndarray**，它描述了**相同类型**的items的集合

![](黑马Numpy(一).assets/2.png)



```python
import numpy as np

# 创建ndarray
score = np.array(
[[80, 89, 86, 67, 79],
[78, 97, 89, 67, 81],
[90, 94, 78, 67, 74],
[91, 91, 90, 67, 69],
[76, 87, 75, 67, 86],
[70, 79, 84, 67, 84],
[94, 92, 93, 67, 64],
[86, 85, 83, 67, 80]])
```

**提问:**

- **使用Python列表可以存储一维数组，通过列表的嵌套可以实现多维数组，那么为什么还需要使用Numpy的ndarray呢？**
- ndarray的计算速度要快很多
- Numpy专门针对ndarray的操作和运算进行了设计，所以数组的存储效率和输入输出性能远优于Python中的嵌套列表，数组越大，Numpy的优势就越明显。

> 嗯帝array！



## 1.2、ndarray优势

ndarray到底跟原生python列表有什么不同呢，请看一张图：



![](黑马Numpy(一).assets/3.png)

- 从图中我们可以看出ndarray在存储数据的时候，数据与数据的地址都是连续的，这样就给使得批量操作数组元素时速度更快。

- 这是因为ndarray中的所有元素的类型都是相同的，而Python列表中的元素类型是任意的，所以ndarray在存储元素时内存可以连续，而python原生list就只能通过寻址方式找到下一个元素，这虽然也导致了在通用性能方面Numpy的ndarray不及Python原生list，但在科学计算中，Numpy的ndarray就可以省掉很多循环语句，代码使用方面比Python原生list简单的多。

- 同时numpy内置了并行运算功能，当系统有多个核心时，做某种计算时，numpy会自动做并行计算（向量化运算）





## 1.3、ndarray的属性

|     属性名字     |          属性解释          |
| :--------------: | :------------------------: |
|  ndarray.shape   |       数组维度的元组       |
|   ndarray.ndim   |          数组维数          |
|   ndarray.size   |      数组中的元素数量      |
| ndarray.itemsize | 一个数组元素的长度（字节） |
|  ndarray.dtype   |       数组元素的类型       |



![](黑马Numpy(一).assets/4.png)



```python
import numpy as np

# 创建ndarray
score = np.array(
[[80, 89, 86, 67, 79],
[78, 97, 89, 67, 81],
[90, 94, 78, 67, 74],
[91, 91, 90, 67, 69],
[76, 87, 75, 67, 86],
[70, 79, 84, 67, 84],
[94, 92, 93, 67, 64],
[86, 85, 83, 67, 80]])

# 数组维度 （8，5）8行5列
score.shape

# 数组维数（2维）
score.ndim

# 数组中元素个数(40)
score.size

# 数组元素的类型（int）
score.dtype
```



## 1.4、ndarray的类型

|     名称      |                       描述                        | 简写  |
| :-----------: | :-----------------------------------------------: | :---: |
|    np.bool    |      用一个字节存储的布尔类型（True或False）      |  'b'  |
|    np.int8    |             一个字节大小，-128 至 127             |  'i'  |
|   np.int16    |               整数，-32768 至 32767               | 'i2'  |
|   np.int32    |              整数，-2^31 至 2^32 -1               | 'i4'  |
|   np.int64    |              整数，-2^63 至 2^63 - 1              | 'i8'  |
|   np.uint8    |               无符号整数，0 至 255                |  'u'  |
|   np.uint16   |              无符号整数，0 至 65535               | 'u2'  |
|   np.uint32   |             无符号整数，0 至 2^32 - 1             | 'u4'  |
|   np.uint64   |             无符号整数，0 至 2^64 - 1             | 'u8'  |
|  np.float16   | 半精度浮点数：16位，正负号1位，指数5位，精度10位  | 'f2'  |
|  np.float32   | 单精度浮点数：32位，正负号1位，指数8位，精度23位  | 'f4'  |
|  np.float64   | 双精度浮点数：64位，正负号1位，指数11位，精度52位 | 'f8'  |
| np.complex64  |     复数，分别用两个32位浮点数表示实部和虚部      | 'c8'  |
| np.complex128 |     复数，分别用两个64位浮点数表示实部和虚部      | 'c16' |
|  np.object_   |                    python对象                     |  'O'  |
|  np.string_   |                      字符串                       |  'S'  |
|  np.unicode_  |                    unicode类型                    |  'U'  |

**创建数组的时候指定类型**

```python
a = np.array([[1, 2, 3],[4, 5, 6]], dtype=np.float32)

arr = np.array(['python', 'tensorflow', 'scikit-learn', 'numpy'], dtype = np.string_)
```

- 注意：若不指定，整数默认int64，小数默认float64
- ndarray 每一个元素的数据类型必须一致





# 2、基本操作

## 2.1、生成数组

### 2.1.1、生成0和1的数组

- **np.ones(shape, dtype)**
- np.ones_like(a, dtype)
- **np.zeros(shape, dtype)**
- np.zeros_like(a, dtype)

```python
import numpy as np

# 生成4行8列的1数组
ones = np.ones([4,8])

ones
```



![](黑马Numpy(一).assets/5.png)

```python
import numpy as np

# 生成4行8列的0数组
ones = np.zeros([4,8])

ones
```

![](黑马Numpy(一).assets/6.png)



### 2.1.2、从现有数组生成

- **np.array(object, dtype)**
- **np.asarray(a, dtype)**

```python
a = np.array([[1,2,3],[4,5,6]])
# 从现有的数组当中创建(深拷贝)
a1 = np.array(a)
# 相当于索引的形式，并没有真正的创建一个新的数组(浅拷贝)
a2 = np.asarray(a)
```



![](黑马Numpy(一).assets/7.png)



### 2.1.3、生成固定范围的数组

#### 1、np.linspace (start, stop, num, endpoint)

- 创建等差数组 — 指定数量
- 参数:
  - start:序列的起始值
  - stop:序列的终止值
  - num:要生成的等间隔样例数量，默认为50
  - endpoint:序列中是否包含stop值，默认为ture

```python
# 生成等间隔的数组
np.linspace(0, 100, 11)
```

![](黑马Numpy(一).assets/8.png)

#### 2、np.arange(start,stop, step, dtype)

- 创建等差数组 — 指定步长
- 参数
  - step:步长,默认值为1

```python
np.arange(10, 50, 2)
```

![](黑马Numpy(一).assets/9.png)



#### 3、np.logspace(start,stop, num)

- 创建等比数列
- 参数:
  - num:要生成的等比数列数量，默认为50

```python
# 生成10^x
np.logspace(0, 2, 3)
```

![](黑马Numpy(一).assets/10.png)





### 2.1.4、生成随机数组

#### 1、正态分布

正态分布是一种概率分布。正态分布是具有两个参数μ和σ的连续型随机变量的分布，第一参数μ是服从正态分布的随机变量的均值，第二个参数σ是此随机变量的标准差，所以正态分布记作**N(μ，σ )**。

![](黑马Numpy(一).assets/11.png)

> - μ决定左右位置，σ决定胖瘦，越小越瘦
> - **μ决定了其位置，其标准差σ**决定了分布的幅度。当μ = 0,σ = 1时的正态分布是标准正态分布。

正态分布创建方式：

1. `np.random.normal(loc=0.0, scale=1.0, size=None)`：生成正态分布
   1. loc为均值μ
   2. scale是标准差σ 
   3. size是形状

```python
import matplotlib.pyplot as plt
import numpy as np

# 生成均值为1.75，标准差为1的正态分布数据，100000000个
x1 = np.random.normal(1.75, 1, 100000000)

# 画图看分布状况
# 1）创建画布
plt.figure(figsize=(20, 10), dpi=100)

# 2）绘制直方图
plt.hist(x1, 1000)

# 3）显示图像
plt.show()
```



![](黑马Numpy(一).assets/12.png)





#### 2、均匀分布

- `np.random.uniform(low=0.0, high=1.0, size=None)`:从一个均匀分布[low,high)中随机采样，注意定义域是左闭右开，即包含low，不包含high
  - low: 采样下界，float类型，默认值为0；
  - high: 采样上界，float类型，默认值为1；
  - size: 输出样本数目，为int或元组(tuple)类型，例如，size=(m,n,k), 则输出m*n*k个样本，缺省时输出1个值。

```python
import matplotlib.pyplot as plt

# 生成均匀分布的随机数
x2 = np.random.uniform(-1, 1, 100000000)

# 画图看分布状况
# 1）创建画布
plt.figure(figsize=(10, 10), dpi=100)

# 2）绘制直方图
plt.hist(x=x2, bins=1000)  # x代表要使用的数据，bins表示要划分区间数

# 3）显示图像
plt.show()
```

![](黑马Numpy(一).assets/13.png)













## 2.2、数组的索引、切片

一维、二维、三维的数组如何索引？

- 一维：直接进行索引,切片
- 多维：`对象[:, :]` : 先行后列

二维数组索引方式：

- 举例：

```python
# 获取二维数组a的第1行，0-2列的元素
a[0, 0:3]
```

![](黑马Numpy(一).assets/14.png)



- 三维数组索引方式：

```python
# 三维(a1 可以想象成是由两个 2x3 的二维数组堆叠而成)
a1 = np.array([ [[1,2,3],[4,5,6]], [[12,3,34],[5,6,7]]])

# 第一个索引 0 选取了最外层列表中的第一个 “二维子数组”（即 [[1,2,3],[4,5,6]]）
# 第二个索引 0 从这个选中的 “二维子数组” 中选取了第一行（即 [1, 2, 3]）
# 第三个索引 1 从这一行中选取了第二个元素（因为索引从 0 开始，所以索引为 1 的元素是 2）
 a1[0, 0, 1]   # 输出: 2
```

![](黑马Numpy(一).assets/31.png)





## 2.3、形状修改

### 2.3.1、ndarray.reshape(shape, order)

- 返回一个具有相同数据域，但shape不一样的**视图**
- 行、列不进行互换

```python
import matplotlib.pyplot as plt
import numpy as np

# 8行5列
score = np.array(
[[80, 89, 86, 67, 79],
[78, 97, 89, 67, 81],
[90, 94, 78, 67, 74],
[91, 91, 90, 67, 69],
[76, 87, 75, 67, 86],
[70, 79, 84, 67, 84],
[94, 92, 93, 67, 64],
[86, 85, 83, 67, 80]])

# 变为4行10列
score.reshape([4,10])

# 自己计算多少行8列，-1表示代码自己计算
score.reshape(-1,8)
```

![](黑马Numpy(一).assets/15.png)

> 会生成一个新的数组





### 2.3.2、ndarray.resize(new_shape)

- 修改数组本身的形状（需要保持元素个数前后相同）
- 行、列不进行互换

```python
import matplotlib.pyplot as plt
import numpy as np

# 8行5列
score = np.array(
[[80, 89, 86, 67, 79],
[78, 97, 89, 67, 81],
[90, 94, 78, 67, 74],
[91, 91, 90, 67, 69],
[76, 87, 75, 67, 86],
[70, 79, 84, 67, 84],
[94, 92, 93, 67, 64],
[86, 85, 83, 67, 80]])

# 变为4行10列
score.resize([4,10])

score
```

> 功能和reshape一样，只是对原数组进行形状修改







### 2.3.3、ndarray.T

- 数组的转置
- 将数组的行、列进行互换

```python
import matplotlib.pyplot as plt
import numpy as np

# 8行5列
score = np.array(
[[80, 89, 86, 67, 79],
[78, 97, 89, 67, 81],
[90, 94, 78, 67, 74],
[91, 91, 90, 67, 69],
[76, 87, 75, 67, 86],
[70, 79, 84, 67, 84],
[94, 92, 93, 67, 64],
[86, 85, 83, 67, 80]])

# 转置
score.T
```

![](黑马Numpy(一).assets/16.png)



## 2.4、类型修改

### 2.4.1、ndarray.astype(type)

- 返回修改了类型之后的数组

```python
import matplotlib.pyplot as plt
import numpy as np

# 8行5列
score = np.array(
[[80, 89, 86, 67, 79],
[78, 97, 89, 67, 81],
[90, 94, 78, 67, 74],
[91, 91, 90, 67, 69],
[76, 87, 75, 67, 86],
[70, 79, 84, 67, 84],
[94, 92, 93, 67, 64],
[86, 85, 83, 67, 80]])

# 类型修改
score.astype(np.float64)
```

![](黑马Numpy(一).assets/17.png)

### 2.4.2、ndarray.tostring()或者ndarray.tobytes()

```python
import matplotlib.pyplot as plt
import numpy as np

# 8行5列
score = np.array(
[[80, 89, 86, 67, 79],
[78, 97, 89, 67, 81],
[90, 94, 78, 67, 74],
[91, 91, 90, 67, 69],
[76, 87, 75, 67, 86],
[70, 79, 84, 67, 84],
[94, 92, 93, 67, 64],
[86, 85, 83, 67, 80]])

# 类型修改
score.tobytes()
```

![](黑马Numpy(一).assets/18.png)

## 2.5、数组去重

### 2.5.1、np.unique()

```python
import matplotlib.pyplot as plt
import numpy as np

# 8行5列
score = np.array(
[[80, 89, 86, 67, 79],
[78, 97, 89, 67, 81],
[90, 94, 78, 67, 74],
[91, 91, 90, 67, 69],
[76, 87, 75, 67, 86],
[70, 79, 84, 67, 84],
[94, 92, 93, 67, 64],
[86, 85, 83, 67, 80]])

# 数组去重
np.unique(score)
```



![](黑马Numpy(一).assets/19.png)





# 3、ndarray运算

## 3.1、逻辑运算

**如果想要操作符合某一条件的数据，应该怎么做？**

```python
# 生成10名同学，5门功课的数据
score = np.random.randint(40, 100, (10, 5))

# 取出最后4名同学的成绩，用于逻辑判断
test_score = score[6:, 0:5]

# 逻辑判断, 如果成绩大于60就标记为True 否则为False
test_score > 60

# BOOL赋值, 将满足条件的设置为指定的值-布尔索引
test_score[test_score > 60] = 1
```

![](黑马Numpy(一).assets/20.png)



## 3.2、通用判断函数

- np.all()
- np.any()

```python
# 判断前两名同学的成绩[0:2, :]是否全及格
np.all(score[0:2, :] > 60)

# 判断前两名同学的成绩[0:2, :]是否有大于90分的
np.any(score[0:2, :] > 80)
```

![](黑马Numpy(一).assets/21.png)



## 3.3、三元运算符

- np.where()

```python
# 判断前四名学生,前四门课程中，成绩中大于60的置为1，否则为0
temp = score[:4, :4]

np.where(temp > 60, 1, 0)
```

- 复合逻辑需要结合np.logical_and和np.logical_or使用

```python
# 判断前四名学生,前四门课程中，成绩中大于60且小于90的换为1，否则为0
np.where(np.logical_and(temp > 60, temp < 90), 1, 0)

# 判断前四名学生,前四门课程中，成绩中大于90或小于60的换为1，否则为0
np.where(np.logical_or(temp > 90, temp < 60), 1, 0)
```



## 3.4、统计运算

**如果想要知道学生成绩最大的分数，或者做小分数应该怎么做？**

- axis=0代表按列进行统计，axis=1代表按行去进行统计

```python
# 接下来对于前四名学生,进行一些统计运算
# 指定前4列去统计
temp = score[:4, 0:5]
print("前四名学生,各科成绩的最大分：{}".format(np.max(temp, axis=0)))
print("前四名学生,各科成绩的最小分：{}".format(np.min(temp, axis=0)))
print("前四名学生,各科成绩波动情况：{}".format(np.std(temp, axis=0)))
print("前四名学生,各科成绩的平均分：{}".format(np.mean(temp, axis=0)))
```

![](黑马Numpy(一).assets/22.png)



如果需要统计出某科最高分对应的是哪个同学？-

- np.argmax(temp, axis=)
- np.argmin(temp, axis=)

```python
print("前四名学生，各科成绩最高分对应的学生列下标：{}".format(np.argmax(temp, axis=0)))
```

![](黑马Numpy(一).assets/23.png)



# 4、数组间运算

## 4.1、数组与数的运算

```python
arr = np.array([[1, 2, 3, 2, 1, 4], [5, 6, 1, 2, 3, 1]])
arr + 1
arr / 2
```

![](黑马Numpy(一).assets/24.png)



## 4.2、数组与数组的运算

数组在进行矢量化运算时，**要求数组的形状是相等的**。当形状不相等的数组执行算术运算的时候，就会出现广播机制，该机制会对数组进行扩展，使数组的shape属性值一样，这样，就可以进行矢量化运算了。下面通过一个例子进行说明：

```python
arr1 = np.array([[0],[1],[2],[3]])
arr1.shape
# (4, 1)

arr2 = np.array([1,2,3])
arr2.shape
# (3,)

arr1+arr2
```



![](黑马Numpy(一).assets/25.png)

上述代码中，数组arr1是4行1列，arr2是1行3列。这两个数组要进行相加，按照广播机制会对数组arr1和arr2都进行扩展，使得数组arr1和arr2都变成4行3列。

![](黑马Numpy(一).assets/26.png)



广播机制实现了时两个或两个以上数组的运算，即使这些数组的shape不是完全相同的，只需要满足如下任意一个条件即可。

- **数组的某一维度等长。**
- **其中一个数组的某一维度为1**。

广播机制需要**扩展维度小的数组**，使得它与维度最大的数组的shape值相同，以便使用元素级函数或者运算符进行运算。







# 5、矩阵

## 5.1、加法与常量乘法

![](黑马Numpy(一).assets/27.png)





## 5.2、矩阵向量乘法

![](黑马Numpy(一).assets/28.png)







## 5.3、矩阵乘法api

- np.matmul
- np.dot🔥

![](黑马Numpy(一).assets/30.png)

```python
 a = np.array([[80, 86],
[82, 80],
[85, 78],
[90, 90],
[86, 82],
[82, 90],
[78, 80],
[92, 94]])

b = np.array([[0.7], [0.3]])

np.dot(a,b)
```

![](黑马Numpy(一).assets/29.png)























































































