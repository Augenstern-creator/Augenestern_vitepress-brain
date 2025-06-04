# 1、Jupyter NoteBook

Jupyter Notebook 是一个基于 Web 的交互式计算环境，主要功能是将代码、文本、数学方程式、可视化和其他相关元素组合在一起，创建一个动态文档，用于数据分析、机器学习、科学计算和数据可视化等方面，Jupyter Notebook 提供了一个交互式的界面，使用户能够以增量和可视化的方式构建和执行代码，同时支持 Markdown 格式的文本和 LaTeX 数学符号。

> 注意，计算机用户名为中文是无法兼容Jupyter。`C:\Users\用户名`如果发现自己的用户名携带有中文，除了更改自己的用户名为英文数字组合外，也可以直接跳过本章，使用后面的 PyCharm 代码编辑器即可。

## 1.0、修改工作路径

Jupyter 初始的工作路径为`C:\Users\用户名`,需要将其转移到`D:\SoftDown\Anaconda\Jupyter`位置。

1. 进入Anaconda Prompt
2. 输入如下命令生成配置文件

```bash
jupyter notebook --generate-config
```

3. 配置文件地址在`C:\Users\用户名\.jupyter`

4. 打开`jupyter_notebook_config.py`，修改如下配置项

```python
# 修改前 
# c.ServerApp.notebook_dir = ''

# 修改后
c.ServerApp.notebook_dir = 'D:\SoftDown\Anaconda\Jupyter'
```

注意目录不能有空格，否则Jupyter打开就闪退！

5. 找到 jupyter notebook 快捷图标，右键 - 属性 -  快捷方式 - 删除`%USERPROFILE%/`

![](小土堆PyTorch(二).assets/16.png)

这样就修改完啦！我们在这个目录下创建文件，也可以启动Jupyter中看到啦！

![](小土堆PyTorch(二).assets/17.png)





## 1.1、安装

在安装Jupyter Notebook之前，可以选择先安装**Anaconda**，Anaconda包含了conda、Python在内的超过180个科学包及其依赖项，其中包括了Jupyter Notebook。

- 建议直接安装Anaconda，Jupyter会随着Anaconda一起安装
- Jupyter 默认安装在 base 环境中，但是base环境中没有安装 Pytorch，导致Jupyter无法使用Pytorch，两种解决方式:
  - 在base环境中再安装一遍Pytorch
  - 在Pytorch环境中安装Jupyter（选择这种）

在`base`中输入`conda list`，从base环境启用Jupyter需要一个`package：ipykernel`,如下图：

![](小土堆PyTorch(二).assets/1.png)



```bash
# 启用Pytorch环境
conda activate KuangStudy_PyTorch_2.4.0
# 查看包（会发现PyTorch环境没有 ipykernel 包）
conda list

# 下载 ipykernel
pip install ipykernel -i https://pypi.tuna.tsinghua.edu.cn/simple

# 将虚拟环境导入Jupyter的Kernel中
python -m ipykernel install --user --name=KuangStudy_PyTorch_2.4.0

# done之后在输入
jupyter notebook
```



- `python -m ipykernel --version` 能显示版本号则代表安装成功

![](小土堆PyTorch(二).assets/18.png)

- `jupyter notebook` 启动 jupyter notebook



1. new Notebook

![](小土堆PyTorch(二).assets/19.png)



2. 选择新建虚拟空间的内核

![](小土堆PyTorch(二).assets/20.png)

3. 输入如下命令，`shift + enter` 运行

![](小土堆PyTorch(二).assets/7.png)





4. 要是想切换内核

![](小土堆PyTorch(二).assets/21.png)

![](小土堆PyTorch(二).assets/22.png)



## 1.2、Cell操作

一对In Out会话被视作一个代码单元，称为cell，也就是代码块。Cell行号前面的[*]号表示代码正在运行。

![](小土堆PyTorch(二).assets/23.png)

Jupyter支持两种模式：

1. 编辑模式：`回车Enter`或`鼠标双击`cell进入编辑模式
2. 命令模式：按`Esc`退出编辑，进入命令模式

## 1.3、鼠标操作

![](小土堆PyTorch(二).assets/24.png)



## 1.4、快捷键操作

- 两种模式通用快捷键
  - **`Shift+Enter`，执行本单元代码，并跳转到下一单元**
  - **`Ctrl+Enter`，执行本单元代码，留在本单元**
  - cell行号前的 * ，表示代码正在运行

- 命令模式，按ESC进入
  - Y，cell切换到Code模式
  - M，cell切换到Markdown模式，使用Markdown语法可以在代码间穿插格式化的文本作为说明文字或笔记
  - A，在当前cell的上面添加cell
  - B，在当前cell的下面添加cell
  - 双击D：删除当前cell

- 编辑模式，按Enter进入
  - 多光标操作：Ctrl键点击鼠标（Mac:CMD+点击鼠标）回退：Ctrl+Z（Mac:CMD+Z）
  - 重做：Ctrl+Y（Mac:CMD+Y)
  - 补全代码：变量、方法后跟Tab键
  - 为一行或多行代码添加/取消注释：Ctrl+/（Mac:CMD+/）









## 1.5、设置中文

在base环境下，`Anacoda Prompt`中安装中文包：

```python
pip install jupyterlab-language-pack-zh-CN
```

![](小土堆PyTorch(二).assets/25.png)





## 1.x、Jupyter Notebook中自动补全代码







## 1.x、Pycharm中创建Jupyter Notebook

1. 新建 Jupyter Notebook

![](小土堆PyTorch(二).assets/39.png)





2. 配置Jupyter

![](小土堆PyTorch(二).assets/40.png)



3. 选择自己的虚拟环境

![](小土堆PyTorch(二).assets/41.png)

4. 输入相关code执行，会自己启动Jupyter server，类似于我们手动启动Jupyter Notebook

![](小土堆PyTorch(二).assets/42.png)

类似于:

![](小土堆PyTorch(二).assets/43.png)



# 2、PyTorch

一个 Python 深度学习框架，它将数据封装成张量（Tensor）来进行处理。PyTorch 中的张量就是元素为同一种数据类型的多维矩阵。在 PyTorch 中，张量以 "类" 的形式封装起来，对张量的一些运算、处理的方法被封装在类中。

- 张量可以理解为数组
- **张量可以有不同的维度，比如零维（标量）、一维（横向量）、二维（矩阵）以及更高维度**
- 提前预打一个知识，有时候创建张量，转化为数学层面，可以用下面的方法

```python
# 创建一维张量(向量)
data = torch.tensor([1, 2])
print("创建的张量为：")
print(data)    # tensor([1, 2])
print("张量的形状为：", data.shape)  # torch.Size([2])
print("张量的维度为：", data.dim())   # 1
```

![](小土堆PyTorch(二).assets/36.png)



```python
# 创建二维张量(2×2的矩阵)
tensor = torch.tensor([[1, 2], [3, 4]])
print("创建的张量为：")
print(tensor)
print("张量的形状为：", tensor.shape)  # torch.Size([2, 2])
print("张量的维度为：", tensor.dim())   # 2
```

![](小土堆PyTorch(二).assets/35.png)

```python
#  2 行 3 列的矩阵
data = torch.tensor([[10, 20, 30], [40, 50, 60]])
```



## 2.0、标量、向量、矩阵、张量

- 标量：一个独立存在的数，只有大小没有方向
- 向量：向量指一列顺序排列的元素。默认是列向量。**向量有大小有方向**
  - 向量也是一种特殊的矩阵，只是这个矩阵只有一列或者一行。

$$
\begin{equation}
\mathbf{v} =
\left(
\begin{array}{c}
70 \\
80 \\
90
\end{array}
\right)
\end{equation}
$$

- 矩阵：**二维的数组**(多行多列。只有行列，没有第三个维度)


$$
\begin{equation}
\mathbf{m} =
\left[
\begin{array}{c}
70 \ 80 \ 90 \\
75 \ 85 \ 95 \\
\end{array}
\right]
\end{equation}
$$

- 张量：GPU中计算的数组，张量是基于向量和矩阵的推广
  - 2个 3*4 的矩阵

### 2.0.1、向量

- 可以把向量看作特殊的矩阵即可

![](小土堆PyTorch(二).assets/37.png)





### 2.0.2、矩阵

![](小土堆PyTorch(二).assets/38.png)

- 矩阵@矩阵的转置 = 方阵(行数=列数)





## 2.1、张量的创建

- `torch.Tensor()` : 根据指定形状创建张量，也可以用来创建指定数据的张量

```python
import torch
import numpy as np

# 1、创建2行3列的张量(张量可以在GPU中使用)，默认返回的数据是 float32 类型
data = torch.Tensor(2, 3)
print(data)

# 2、如果传递的是列表(中括号括起来的是list),则创建包含指定元素的张量
data = torch.Tensor([10,20])
print(data)
```

![](小土堆PyTorch(二).assets/26.png)

> 注意：
>
> - `data = torch.IntTensor(2, 3)` : 创建2行3列的张量(括号括起来的是几行几列)
> - `data = torch.IntTensor([2,5])`： 创建1行2列的张量(中括号括起来的是list列表)

当我们不想返回的是默认的float32类型张量，我们要生成指定类型的张量，要怎么做呢？

- `torch.IntTensor()、torch.FloatTensor()、torch.DoubleTensor() `: 创建指定类型的张量

```python
import torch
import numpy as np

# 1、创建2行3列的张量(张量可以在GPU中使用)，返回的数据是 Int32 类型的张量
data = torch.IntTensor(2, 3)
print(data)


# 2、如果传递的是列表(中括号括起来的是list),则创建包含指定元素的张量
data = torch.IntTensor([2,5])
print(data)

# 2.1、如果传递的元素类型不正确, 则会进行类型转换
data = torch.IntTensor([2.5,5.3])
print(data)
```

![](小土堆PyTorch(二).assets/27.png)

```python
# 其他类型
data = torch.ShortTensor()  # int16
data = torch.LongTensor()   # int64
data = torch.FloatTensor()  # float32
data = torch.DoubleTensor() # float64
```



### 2.1.1、创建线性张量(等差数列)

- `torch.arange()`:在指定区间按照**步长**生成元素 `[start, end, step)`
  - 等差数列,指定起始点和终止点和步长
- `torch.linspace()` ： 在指定区间按照**元素个数**生成 `[start, end, steps]`
  - 等差数列，指定起始点和终止点和元素个数，也是可以算出步长

```python
# 1、在指定区间按照步长生成元素 [start, end, step)
# [0,10),步长为2的等差数列
data = torch.arange(0, 10, 2)
print(data)

# 2. 在指定区间按照元素个数生成 [start, end, steps]
# [0,9]，生成10个数
data = torch.linspace(0, 9, 10)
print(data)
```

![](小土堆PyTorch(二).assets/28.png)

---

- `torch.random.init_seed`: 查看当前的随机数种子
- `torch.random.manual_seed`:随机种子设置



### 2.1.2、创建随机张量



```python
import torch
import numpy as np

# 1、创建随机张量(随机张量的数据服从标准正态分布)
data = torch.randn(2, 3)  # 创建2行3列张量
print(data)
print("当前随机数种子为:",torch.random.initial_seed())

# 2、设置随机数种子
torch.random.manual_seed(100)
data = torch.randn(2, 3)  # 创建2行3列张量
print("当前随机数种子为:",torch.random.initial_seed())
```



![](小土堆PyTorch(二).assets/29.png)



### 2.1.3、创建0-1张量

```python
# 创建一个指定形状的全零张量
torch.zeros(*size, out=None, dtype=None, layout=torch.strided, device=None, requires_grad=False)

# 创建一个指定形状的全1张量
torch.ones(*size, out=None, dtype=None, layout=torch.strided, device=None, requires_grad=False)
```

- `*size`：必选参数，代表张量的形状，能够传入多个整数，也可以传入一个元组。
- `out`：可选参数，用于存储输出结果的张量。
- `dtype`：可选参数，指定输出张量的数据类型。
- `layout`：可选参数，指定张量的布局，默认是 `torch.strided`。
- `device`：可选参数，指定张量所在的设备，例如 `'cpu'` 或者 `'cuda'`。
- `requires_grad`：可选参数，指定是否需要对张量进行梯度计算，默认是 `False`。

```python
# 创建一个形状为 (2, 3) 的全零张量
zeros_tensor = torch.zeros(2, 3)
print(zeros_tensor)
```

![](小土堆PyTorch(二).assets/30.png)

```python
# 创建一个和输入张量形状与数据类型相同的全零张量
torch.zeros_like(input, dtype=None, layout=None, device=None, requires_grad=False, memory_format=torch.preserve_format)

# 创建一个和输入张量形状与数据类型相同的全1张量
torch.ones_like(input, dtype=None, layout=None, device=None, requires_grad=False, memory_format=torch.preserve_format)
```

- `input`：必选参数，作为参考的输入张量。
- `dtype`：可选参数，指定输出张量的数据类型，若不指定，就使用输入张量的数据类型。
- `layout`：可选参数，指定张量的布局，默认是 `torch.strided`。
- `device`：可选参数，指定张量所在的设备，例如 `'cpu'` 或者 `'cuda'`。
- `requires_grad`：可选参数，指定是否需要对张量进行梯度计算，默认是 `False`。
- `memory_format`：可选参数，指定输出张量的内存格式，默认是 `torch.preserve_format`。

```python
# 1、创建一个形状为 (2, 3) 的随机张量
data = torch.zeros(2,3)
print(data)


# 创建一个和 data 形状相同的全零张量
zeros_like_tensor = torch.zeros_like(data)
print(zeros_like_tensor)
```

![](小土堆PyTorch(二).assets/31.png)





### 2.1.4、创建指定张量

```python
# 创建一个指定形状的张量，并且该张量的所有元素都被设定为同一个值
torch.full(size, fill_value, out=None, dtype=None, layout=torch.strided, device=None, requires_grad=False)
```

- `size`：这是一个必选参数，用来指定张量的形状，可传入一个整数元组。
- `fill_value`：必选参数，即要填充到张量中的值。
- `out`：可选参数，用于存储输出结果的张量。
- `dtype`：可选参数，指定输出张量的数据类型。
- `layout`：可选参数，指定张量的布局，默认是 `torch.strided`。
- `device`：可选参数，指定张量所在的设备，例如 `'cpu'` 或者 `'cuda'`。
- `requires_grad`：可选参数，指定是否需要对张量进行梯度计算，默认是 `False`

```python
import torch

# 创建一个形状为 (2, 3) 且元素全为 5 的张量
full_tensor = torch.full([2, 3], 5)
print(full_tensor)
```

```python
# 创建一个和输入张量形状与数据类型相同的张量，并且该张量的所有元素都被设定为同一个值。
torch.full_like(input, fill_value, dtype=None, layout=None, device=None, requires_grad=False, memory_format=torch.preserve_format)
```

- `input`：必选参数，作为参考的输入张量。
- `fill_value`：必选参数，即要填充到张量中的值。
- `dtype`：可选参数，指定输出张量的数据类型，若不指定，就使用输入张量的数据类型。
- `layout`：可选参数，指定张量的布局，默认是 `torch.strided`。
- `device`：可选参数，指定张量所在的设备，例如 `'cpu'` 或者 `'cuda'`。
- `requires_grad`：可选参数，指定是否需要对张量进行梯度计算，默认是 `False`。
- `memory_format`：可选参数，指定输出张量的内存格式，默认是 `torch.preserve_format`

```python
import torch

# 创建一个形状为 (2, 3) 且元素全为 5 的张量
data = torch.full((2, 3), 5)
print(data)

# 创建一个和 data 形状相同且元素全为 20 的张量
data = torch.full_like(data, 20)
print(data)
```

![](小土堆PyTorch(二).assets/32.png)







## 2.2、张量的类型转换

### 2.2.1、基本类型转换

```python
import torch

# 创建一个形状为 (2, 3) 且元素全为 10 的张量
data = torch.full((2, 3), 10)
print(data.dtype)  # torch.int64
# 将 data 元素类型转换为 float64 类型
data = data.double()
print(data.dtype) # torch.float64
# 转换为其他类型
# data = data.short()
# data = data.int()
# data = data.long()
# data = data.float()
```



### 2.2.2、张量和Numpy数组的转换

- `Tensor.numpy()`: 将张量转换为ndarray数组,但是共享内存
- `Tensor.cope()`：将张量转换为ndarray数组,不共享内存

```python
import torch

# 创建1行3列的张量
data_tensor = torch.tensor([2, 3, 4])
# 将张量转换为Numpy数组(共享内存)
data_numpy = data_tensor.numpy()
print(data_tensor)  # tensor([2, 3, 4])
print(data_numpy)   # [2 3 4]

# 注意:data_tensor 和 data_numpy 共享内存,修改其中的一个，另外一个也会发生改变
data_tensor[0] = 100
print(data_tensor)  # tensor([100,   3,   4])
print(data_numpy)   #  [100   3   4]
```



```python
import torch

# 创建1行3列的张量
data_tensor = torch.tensor([2, 3, 4])
# 将张量转换为Numpy数组(不共享内存)
data_numpy = data_tensor.numpy().copy()
print(data_tensor)  # tensor([2, 3, 4])
print(data_numpy)   # [2 3 4]

# 注意:data_tensor 和 data_numpy 不共享内存,修改其中的一个，另外不会发生改变
data_tensor[0] = 100
print(data_tensor)  # tensor([100,   3,   4])
print(data_numpy)   #  [2 3 4]
```



- `torch.from_numpy`：将 ndarray 数组转换为 Tensor，默认共享内存
- `torch.tensor`：将 ndarray 数组转换为 Tensor，默认不共享内存

```python
import torch
import numpy as np

# 创建1行3列的 Numpy 数组
data_numpy = np.array([2, 3, 4])

# 1、将 numpy 数组转换为张量类型
data_tensor = torch.from_numpy(data_numpy)
# 注意:nunpy 和 tensor 共享内存
# data_numpy[0] = 100
data_tensor[0] = 100
print(data_tensor) # tensor([100,   3,   4], dtype=torch.int32)
print(data_numpy)  # [100   3   4] 
```



```python
import torch
import numpy as np

# 创建1行3列的 Numpy 数组
data_numpy = np.array([2, 3, 4])

# 1、将 numpy 数组转换为张量类型
data_tensor = torch.tensor(data_numpy)
# 注意:nunpy 和 tensor 不共享内存
# data_numpy[0] = 100
data_tensor[0] = 100
print(data_tensor) # tensor([100,   3,   4], dtype=torch.int32)
print(data_numpy)  # [2   3   4]
```



### 2.2.3、标量张量和数字转换

标量张量：只有一个元素的张量

- 对于只有一个元素的张量，使用`item()`函数将该值从张量中提取出来

```python
import torch
import numpy as np

# 当张量只包含一个元素时, 可以通过 item() 函数提取出该值
data = torch.tensor([30,])
print(data.item()) # 30
data = torch.tensor(30)
print(data.item()) # 30
```







## 2.3、张量的数值计算

- `add、sub、mul、div、neg`
- `add_、sub_、mul_、div_、neg_` :带下划线会修改原数据

```python
import torch
import numpy as np

# 生成一个形状为 (2, 3) 的随机整数张量，整数范围在 [0, 10)
data = torch.randint(0,10,(2,3))
print(data)

# 1、不修改原数据
new_data = data.add(10)  # 等价 data + 10
print(new_data)
```

![](小土堆PyTorch(二).assets/33.png)



```python
# 生成一个形状为 2×3矩阵 的随机整数张量，整数范围在 [0, 10)
data = torch.randint(0,10,(2,3))
print(data)

# 2、直接修改原数据
data.add_(10)
print(data)
```

### 2.3.1、点乘

![](小土堆PyTorch(二).assets/34.png)

```python
# 创建2×2矩阵
data1 = torch.tensor([[1, 2], [3, 4]])
data2 = torch.tensor([[5, 6], [7, 8]])
# 第一种方式
data = torch.mul(data1, data2)
print(data)
# 第二种方式
data = data1 * data2
print(data)
```





### 2.3.2、矩阵乘法

- **矩阵点乘**：参与运算的两个矩阵必须具有相同的形状，即行数和列数都分别相等。
- **矩阵乘法**：前一个矩阵的列数必须等于后一个矩阵的行数。(m×n n×p = m×p)

- `@` 用于进行两个矩阵的乘积运算
- `torch.matmul`也可以

```python
# 矩阵乘法运算
data1 = torch.tensor([[1, 2], [3, 4], [5, 6]])
data2 = torch.tensor([[5, 6], [7, 8]])
# 方式一:
data3 = data1 @ data2
print("data3-->", data3)
# 方式二:
data4 = torch.matmul(data1, data2)
print("data4-->", data4)
```



## 2.4、张量的运算函数

PyTorch 为每个张量封装很多实用的计算函数：

- 均值
- 平方根
- 求和
- 指数计算
- 对数计算等等 

```python
# 生成一个形状为2×3矩阵 的随机整数张量，整数范围在 [0, 10)
data = torch.randint(0, 10, (2, 3), dtype=torch.float64)
print(data)
# 1. 计算均值
# 注意: tensor 必须为 Float 或者 Double 类型
print(data.mean())
print(data.mean(dim=0))  # 按列计算均值
print(data.mean(dim=1))  # 按行计算均值
# 2. 计算总和
print(data.sum())
print(data.sum(dim=0))
print(data.sum(dim=1))
# 3. 计算平方
print(torch.pow(data,2))

# 4. 计算平方根
print(data.sqrt())

# 5. 指数计算, e^n 次方
print(data.exp())

# 6. 对数计算
print(data.log())  # 以 e 为底
print(data.log2())
print(data.log10())
```



## 2.5、张量的索引操作

我们在操作张量时，经常需要去获取某些元素就进行处理或者修改操作，在这里我们需要了解在torch中的索引操作。

### 2.5.1、简单行、列索引

```python
# 生成一个形状为 4×5矩阵 的随机整数张量，整数范围在 [0, 10)
data = torch.randint(0, 10, (4, 5))
# 打印矩阵 data 的第一行元素
print(data[0])
# 打印矩阵 data 的第一列元素
print(data[:, 0])
```







### 2.5.2、列表索引

```python
# 返回 (0, 1)、(1, 2) 两个位置的元素
print(data[[0, 1], [1, 2]])

# 返回 0、1 行的 1、2 列共4个元素
print(data[[[0], [1]], [1, 2]])
```







### 2.5.3、范围索引

```python
# 前3行的前2列数据
print(data[:3, :2])

# 第2行到最后的前2列数据
print(data[2:, :2])
```







### 2.5.4、布尔索引

```python
# 第三列大于5的行数据
print(data[data[:, 2] > 5])

# 第二行大于5的列数据
print(data[:, data[1] > 5])
```









### 2.5.5、多维索引

```python
data = torch.randint(0, 10, [3, 4, 5])
print(data)
# 获取0轴上的第一个数据
print(data[0, :, :])
# 获取1轴上的第一个数据
print(data[:, 0, :])
# 获取2轴上的第一个数据
print(data[:, :, 0])
```







## 2.6、张量的形状操作

### 2.6.1、reshape()

- `reshape` 函数可以在保证张量数据不变的前提下改变数据的维度，将其转换成指定的形状

```python
# 导入PyTorch库，用于处理张量数据
import torch

# 创建一个2行3列的二维张量(矩阵)，数据为[[10, 20, 30], [40, 50, 60]]
data = torch.tensor([[10, 20, 30], [40, 50, 60]])

# 1. 使用 shape 属性或者 size 方法都可以获得张量的形状
# shape是属性，直接返回张量维度信息；size()是方法，功能与shape相同
# data.shape 返回 torch.Size([2, 3])，表示2行3列
# data.shape[0] 获取第一个维度大小（行数），结果为2
# data.shape[1] 获取第二个维度大小（列数），结果为3
print(data.shape)     # 输出: torch.Size([2, 3])
print(data.shape[0])  # 2
print(data.shape[1])  # 3

# size()方法的使用方式与shape属性完全一致
print(data.size(), data.size(0), data.size(1))   # 输出: torch.Size([2, 3]) 2 3

# 2. 使用 reshape 函数修改张量形状
# 将原始2x3的张量重新塑形为1x6的新形状（总元素数必须保持一致，2 * 3=1 * 6=6）
# reshape参数(1,6)表示目标维度：1个样本，6个特征/元素
new_data = data.reshape(1, 6)

# 验证新张量的形状，输出应为torch.Size([1, 6])
print(new_data.shape)  # 输出: torch.Size([1, 6])
```







### 2.6.2、squeeze()和unsqueeze()

- `torch.unsqueeze(A,N)`函数的作用减少数组A指定位置N的维度，如果不指定位置参数N，如果数组A的维度为（1，1，3）那么执行 torch.squeeze(A，1) 后A的维度变为 （1，3），中间的维度被删除
  - 如果指定的维度大于1，那么将操作无效
  - 如果不指定维度N，那么将删除所有维度为1的维度

```python
a=torch.randn(1,1,3)
print(a.shape)				# torch.Size([1, 1, 3])
b=torch.squeeze(a)
print(b.shape)				# torch.Size([3])
c=torch.squeeze(a,0)
print(c.shape)				# torch.Size([1, 3])
d=torch.squeeze(a,1)
print(d.shape)				# torch.Size([1, 3])
e=torch.squeeze(a,2)		#如果去掉第三维，则数不够放了，所以直接保留
print(e.shape)				# torch.Size([1, 1, 3])
```

- `torch.unsqueeze(A,N)`函数的作用增加数组A指定位置N的维度，例如两行三列的数组A维度为(2，3)，那么这个数组就有三个位置可以增加维度，分别是（ [位置0] 2，[位置1] 3 [位置2] ）或者是 （ [位置-3] 2，[位置-2] 3 [位置-1] ），如果执行 torch.unsqueeze(A，1)，数据的维度就变为了 （2，1，3）

```python
a=torch.randn(1,3)
print(a.shape)		# torch.Size([1, 3])
b=torch.unsqueeze(a,0)
print(b.shape)		# torch.Size([1, 1, 3])
c=torch.unsqueeze(a,1)
print(c.shape)		# torch.Size([1, 1, 3])
d=torch.unsqueeze(a,2)
print(d.shape)		# torch.Size([1, 3, 1])
```









### 2.6.3、transpose()和permute()

transpose 函数可以实现交换张量形状的指定维度, 例如: 一个张量的形状为 (2, 3, 4) 可以通过 transpose 函数把 3 和 4 进行交换, 将张量的形状变为 (2, 4, 3) 。 permute 函数可以一次交换更多的维度。

```python
# 导入PyTorch和NumPy库
import torch
import numpy as np

# 创建一个3维张量，形状为[3,4,5]，元素为0-9的随机整数
# 使用numpy生成随机数组后转换为PyTorch张量
data = torch.tensor(np.random.randint(0, 10, [3, 4, 5]))
print('data shape:', data.size())  # 输出原始形状 torch.Size([3, 4, 5])

# 1. 交换维度1（第2个维度）和维度2（第3个维度）
# 原始形状： [3,4,5] -> 交换后形状：[3,5,4]
mydata2 = torch.transpose(data, 1, 2)  # transpose参数：输入张量，维度1，维度2
print('mydata2.shape--->', mydata2.shape)  # 输出 torch.Size([3, 5, 4])

# 2. 通过多次转置将形状从[3,4,5]转换为[4,5,3]
# 第一步：交换维度0和1（将原始第一维和第二维交换）
mydata3 = torch.transpose(data, 0, 1)  # [3,4,5] -> [4,3,5]
# 第二步：交换新维度1和2（将第二维和第三维交换）
mydata4 = torch.transpose(mydata3, 1, 2)  # [4,3,5] -> [4,5,3]
print('mydata4.shape--->', mydata4.shape)  # 最终形状 torch.Size([4, 5, 3])

# 3. 使用permute函数一步完成维度重排（推荐方法）
# permute参数是新的维度顺序列表
# 3-1 方法1：使用torch.permute函数式写法
# 将原始维度[0,1,2]重新排列为[1,2,0]，即把原维度1放到最前面
mydata5 = torch.permute(data, [1, 2, 0])  # [3,4,5] -> [4,5,3]
print('mydata5.shape--->', mydata5.shape)

# 3-2 方法2：直接调用张量的permute方法
# 功能与上述方法完全相同，只是调用方式不同
mydata6 = data.permute([1, 2, 0])  # 更简洁的链式调用写法
print('mydata6.shape--->', mydata6.shape)
```





### 2.6.4、view()和contiguous()

view 函数也可以用于修改张量的形状，只能用于存储在整块内存中的张量。在 PyTorch 中，有些张量是由不同的数据块组成的，它们并没有存储在整块的内存中，view 函数无法对这样的张量进行变形处理，例如: 一个张量经过了 transpose 或者 permute 函数的处理之后，就无法使用 view 函数进行形状操作。

- 一个张量经过了 transpose 或者 permute 函数的处理之后，就无法使用 view 函数进行形状操作。
- 若要使用view函数, 需要使用contiguous() 变成连续以后再使用view函数

```python
# 导入PyTorch库
import torch

data = torch.tensor( [[10, 20, 30],[40, 50, 60]])
print('data--->', data, data.shape)
# 1 判断是否使用整块内存
print(data.is_contiguous()) # True
# 2 view
mydata2 = data.view(3, 2)
print('mydata2--->', mydata2, mydata2.shape)
# 3 判断是否使用整块
print('mydata2.is_contiguous()--->', mydata2.is_contiguous())
# 4 使用 transpose 函数修改形状
mydata3 = torch.transpose(data, 0, 1)
print('mydata3--->', mydata3, mydata3.shape)
print('mydata3.is_contiguous()--->', mydata3.is_contiguous())
# 5 需要先使用 contiguous 函数转换为整块内存的张量，再使用 view 函数print (mydata3.contiguous().is_contiguous())
mydata4 = mydata3.contiguous().view(2, 3)
print('mydata4--->', mydata4.shape, mydata4)
```

- view 函数也可以用于修改张量的形状, 但是它要求被转换的张量内存必须连续，所以一般配合 contiguous 函数使用







## 2.7、张量拼接操作

- `torch.cat()` 函数可以将两个张量根据指定的维度拼接起来，不改变维度数

```python
# 生成两个形状为[1,2,3]的三维随机整数张量，数值范围0-9
data1 = torch.randint(0, 10, [1, 2, 3])  # 维度含义：[batch_size, 特征数, 序列长度]
data2 = torch.randint(0, 10, [1, 2, 3])
print(data1)  # 示例输出：tensor([[[6, 2, 7], [5, 9, 1]]])
print(data2)  # 示例输出：tensor([[[3, 8, 4], [7, 0, 2]]])

# 1. 在第0维度（最外层/batch维度）拼接
# 原始形状：data1([1,2,3]) + data2([1,2,3]) = [2,2,3]
new_data = torch.cat([data1, data2], dim=0)
print(new_data)  # 输出形状：torch.Size([2, 2, 3])
print(new_data.shape)  # 示例：tensor([[[6,2,7],[5,9,1]], [[3,8,4],[7,0,2]]])

# 2. 在第1维度（中间/特征维度）拼接
# 原始形状：data1([1,2,3]) + data2([1,2,3]) = [1,4,3]
new_data = torch.cat([data1, data2], dim=1)
print(new_data)  # 输出形状：torch.Size([1, 4, 3])
print(new_data.shape)  # 示例：tensor([[[6,2,7], [5,9,1], [3,8,4], [7,0,2]]])

# 3. 在第2维度（最内层/序列维度）拼接
# 原始形状：data1([1,2,3]) + data2([1,2,3]) = [1,2,6]
new_data = torch.cat([data1, data2], dim=2)
print(new_data)  # 输出形状：torch.Size([1, 2, 6])
print(new_data.shape)  # 示例：tensor([[[6,2,7,3,8,4], [5,9,1,7,0,2]]])
```





## 2.8、自动微分模块

```python
# 1. 当X为标量时梯度的计算
def test01():
    # 创建输入张量 x，值为标量5（注意：这里实际上创建的是0维张量，即标量）
    x = torch.tensor(5)
    
    # 目标值设为0（实际应用中通常是训练数据的标签）
    y = torch.tensor(0.)
    
    # 初始化需要训练的参数
    w = torch.tensor(1., requires_grad=True, dtype=torch.float32)  # 权重
    b = torch.tensor(3., requires_grad=True, dtype=torch.float32)  # 偏置
    
    # 前向传播计算
    z = x * w + b  # 线性回归模型公式：y_pred = x*w + b
    
    # 定义损失函数
    loss = torch.nn.MSELoss()  # 创建均方误差损失函数实例
    loss_value = loss(z, y)          # 计算实际损失值
    
    # 反向传播计算梯度
    loss.backward()  # 自动微分核心操作
    
    # 打印梯度结果
    print("W的梯度:", w.grad)  # 预期值：2*x*(z-y) = 2 * 5*(8-0) = 80
    print("b的梯度", b.grad)   # 预期值：2*(z-y) = 2*(8-0) = 16

# 实际执行结果：
# W的梯度: tensor(80.)
# b的梯度 tensor(16.)
```





## 2.9、线性回归案例







## 2.1、数据读取

读取数据涉及两个类：Dataset 和 Dataloader

- `Dataset`：提供一种方式，获取其中需要的数据及其对应的真实的 label 值，并完成编号。主要实现以下两个功能：
  - 如何获取每一个数据及其label
  - 告诉我们总共有多少的数据

- `Dataloader`:打包（batch_size），为后面的神经网络提供不同的数据形式



### 2.1.1、Dataset类

我们可以使用Jupyter查看Dataset类的介绍和使用说明：

```bash
from torch.utils.data import Dataset

help(Dataset)
```

![](小土堆PyTorch(二).assets/10.png)



### 2.1.2、图像处理库Pillow

python 拥有丰富的第三方扩展库，Pillow 是 Python3 最常用的图像处理库，虽然是pillow，但是导入包的写法依然是from PIL。

`from PIL import Image` 导入 Image 模块。然后通过 Image 类中的 open 函数即可载入图像文件, open 函数会自动判断图片格式，只需指定文件位置即可。成功，open 函数返回一个 Image 对象；载入文件失败，则会引起 IOError 异常 。

```python
from PIL import Image

# 打开图像
img = Image.open("profile.jpg")

# 要显示图像需要调用 show()方法 
img.show()
```



#### 1、Image对象属性

```python
from PIL import Image

im = Image.open("profile.jpg")
# 查看尺寸
print(im.width,im.height)
# 查看大小,宽高
print(im.size)
# 查看格式 JPEG
print(im.format)
# 图片是否为只读的(该属性的返回为 0 或者 1，分别对应着是和否，输出结果如下)
print(im.readonly)
# 查看图像模式(RGB)
print(im.mode)
```

常用的图片模式做简单的总结:

| mode  | 描述                                                      |
| ----- | --------------------------------------------------------- |
| 1     | 1 位像素（取值范围 0-1），0表示黑，1 表示白，单色通道。   |
| L     | 8 位像素（取值范围 0 -255），灰度图，单色通道。           |
| P     | 8 位像素，使用调色板映射到任何其他模式，单色通道。        |
| RGB   | 3 x 8位像素，真彩色，三色通道，每个通道的取值范围 0-255。 |
| RGBA  | 4 x 8位像素，真彩色+透明通道，四色通道。                  |
| CMYK  | 4 x 8位像素，四色通道，可以适应于打印图片。               |
| YCbCr | 3 x 8位像素，彩色视频格式，三色通道。                     |
| LAB   | 3 x 8位像素，L * a * b颜色空间，三色通道                  |
| HSV   | 3 x 8位像素，色相，饱和度，值颜色空间，三色通道。         |
| I     | 32 位有符号整数像素，单色通道。                           |
| F     | 32 位浮点像素，单色通道。                                 |



#### 2、Pillow图片格式转换

save() 方法用于保存图像，当不指定文件格式时，它会以默认的图片格式来存储；如果指定图片格式，则会以指定的格式存储图片。save() 的语法格式如下：

```python
Image.save(fp, format=None)
```

- fp：图片的存储路径，包含图片的名称，字符串格式；
- format：可选参数，可以指定图片的格式。

注意，并非所有的图片格式都可以用 save() 方法转换完成，比如将 PNG 格式的图片保存为 JPG 格式，如果直接使用 save() 方法就会出现错误`OSError: cannot write mode RGBA as JPEG`。引发错误的原因是由于 PNG 和 JPG 图像模式不一致导致的。其中 PNG 是四通道 RGBA 模式，即红色、绿色、蓝色、Alpha 透明色；JPG 是三通道 RGB 模式。因此要想实现图片格式的转换，就要将 PNG 转变为三通道 RGB 模式。

Image 类提供的 convert() 方法可以实现图像模式的转换，语法如下：

```python
convert(mode)
```

- mode：指的是要转换成的图像模式

```python
from PIL import Image
im = Image.open("profile.png")
#此时返回一个新的image对象，转换图片模式
image=im.convert('RGB')
#调用save()保存
image.save('Newprofile.jpg')
```

通过以上代码，成功将 PNG 格式的图片转换为了 JPG 格式。 

#### 3、Pillow图像缩放操作

在图像处理过程中经常会遇到缩小或放大图像的情况，Image 类提供的 resize() 方法能够实现任意缩小和放大图像。

```python
resize(size, resample=image.BICUBIC, box=None, reducing_gap=None)
```

- size：元组参数 (width,height)，图片缩放后的尺寸；
- resample：可选参数，指图像重采样滤波器，与 thumbnail() 的 resample 参数类似，默认为 Image.BICUBIC；
- box：对指定图片区域进行缩放，box 的参数值是长度为 4 的像素坐标元组，即 (左,上,右,下)。注意，被指定的区域必须在原图的范围内，如果超出范围就会报错。当不传该参数时，默认对整个原图进行缩放；
- reducing_gap：可选参数，浮点参数值，用于优化图片的缩放效果，常用参数值有 3.0 和 5.0。

注意，resize() 会返回一个新的 image 对象。下面是一组对图像进行修改的示例：

```python
from PIL import Image

im = Image.open("profile.jpg")

# 将图像大小修改为550×550
image = im.resize((550,550))
# 将新图像保存
image.save("newProfile.jpg")
```

也可以对图片进行局部放大：

```python
from PIL import Image

im = Image.open("profile.jpg")

#选择放大的局部位置，并选择图片重采样方式
# box四元组指的是像素坐标 (左,上,右,下)
#(0,0,120,180)，表示以原图的左上角为原点，选择宽和高分别是(120,180)的图像区域
image = im.resize((550,550),resample=Image.LANCZOS,box=(0,0,120,180))
image.show()
```



#### 4、Pillow创建缩略图

缩略图（thumbnail image）指的是将原图缩小至一个指定大小（size）的图像。通过创建缩略图可以使图像更易于展示和浏览。

Image 对象提供了一个 thumbnail() 方法用来生图像的缩略图，该函数的语法格式如下：

```python
thumbnail(size,resample)
```

- size：元组参数，指的是缩小后的图像大小；
- resample：可选参数，指图像重采样滤波器，有四种过滤方式，分别是 Image.BICUBIC（双立方插值法）、PIL.Image.NEAREST（最近邻插值法）、PIL.Image.BILINEAR（双线性插值法）、PIL.Image.LANCZOS（下采样过滤插值法），默认为 Image.BICUBIC。

```python
from PIL import Image

im = Image.open("profile.jpg")

im.thumbnail((150,150))

im.show()
```



#### 5、批量修改图片尺寸

在图像处理过程中，对于某些不需要精细处理的环节，我们往往采用批量处理方法，比如批量转换格式，批量修改尺寸，批量添加水印，批量创建缩略图等，这是一种提升工作效率的有效途径，它避免了单一、重复的操作。通过 Pillow 提供的 Image.resize() 方法可以批量地修改图片尺寸，下面看一组简单的示例。

1. 首先找一些类型相同，但尺寸不一的图片，并把它们放入桌面的 image01 文件夹中。
2. 编写代码

```python
# 批量修改图片尺寸
import os
from PIL import Image


#读取图片目录
fileName = os.listdir('C:/Users/Augenestern/Desktop/image/')
# ['ChatGPT-copy.png', 'profile.jpg']
print(fileName)

#设定尺寸
width = 350
height = 350

# 如果目录不存在，则创建目录
if not os.path.exists('C:/Users/Augenestern/Desktop/NewImage/'):
    os.mkdir('C:/Users/Augenestern/Desktop/NewImage/')

# 循环读取每一张图片
for img in fileName:
    # ChatGPT-copy.png
    print(img)
    old_pic = Image.open("C:/Users/Augenestern/Desktop/image/" + img)
    new_image = old_pic.resize((width, height), Image.BILINEAR)
    new_image.save("C:/Users/Augenestern/Desktop/NewImage/" + img)
```



#### 6、Pillow图像分离与合并

我们知道，图像（指数字图像）由许多像素点组成，像素是组成图像的基本单位，而每一个像素点又可以使用不同的颜色，最终呈现出了绚丽多彩的图像。图像模式Mode，它们的本质就是图片呈现颜色时需要遵循的规则，比如 RGB、RGBA、CYMK 等，而图像的分离与合并，指的就是图像颜色的分离和合并。

Image 类提供了用于分离图像和合并图像的方法 split() 和 merge() 方法，通常情况下，这两个方法会一起使用。

- split() 的使用方法比较简单，用来分离颜色通道。我们使用它来处理图片：

```python
# 批量修改图片尺寸
import os
from PIL import Image

im = Image.open("profile.jpg")
#分离颜色通道，产生三个 Image对象
r,g,b = im.split()
r.show()
g.show()
b.show()
```

Image 类提供的 merge() 方法可以实现图像的合并操作。注意，图像合并，可以是单个图像合并，也可以合并两个以上的图像。

```python
Image.merge(mode, bands)
```

- mode：指定输出图片的模式
- bands：参数类型为元组或者列表序列，其元素值是组成图像的颜色通道，比如 RGB 分别代表三种颜色通道，可以表示为 (r,g,b)

注意，该函数会返回一个新的 Image 对象。

1. 单个图像的合并指的是将颜色通道进行重新组合，从而得到不一样的图片效果，代码如下所示：

```python
from PIL import Image

im = Image.open("profile.jpg")
#修改图像大小，以适应图像处理
image=im.resize((450,400))
#分离颜色通道，产生三个 Image对象
r,g,b = image.split()
#重新组合颜色通道，返回先的Image对象
image_merge=Image.merge('RGB',(b,g,r))

image_merge.show()
```

![](小土堆PyTorch(二).assets/11.png)

> 我的麦麦变蓝了！



2. 两张图片的合并操作也并不复杂，但是要求两张图片的模式、图像大小必须要保持一致，否则不能合并。因此，对于那些模式、大小不同的图片要进行预处理。

```python
from PIL import Image

# 1.两张图片格式保持转化为一致,均转成RGB
im_1 = Image.open("profile.jpg").convert("RGB")
im_2 = Image.open("chatgpt.jpg").convert("RGB")


# 2.让 im_2 的图像尺寸与 im_1 一致,注意此处新生成了 Image 对象
image = im_2.resize(im_1.size)

# 3.接下来，对图像进行颜色分离操作
r1, g1 ,b1 = im_1.split()
r2, g2 , b2 = image.split()

# 合并图像
im_3 = Image.merge('RGB',[r2,g1,b2])
im_3.show()
```

![](小土堆PyTorch(二).assets/12.png)

> 我的麦麦变邪了！



#### 7、Pillow混合图片

Image 类也提供了 blend() 方法来混合 RGBA 模式的图片（PNG 格式），函数的语法格式如下：

> - jpg 格式的模式是 RGB
> - png 格式的模式是 RGBA

```python
Image.blend(image1,image2, alpha)
```

- image1，image2：表示两个 Image 对象。
- alpha：表示透明度，取值范围为 0 到 1，当取值为 0 时，输出图像相当于 image1 的拷贝，而取值为 1 时，则是 image2 的拷贝，只有当取值为 0.5 时，才为两个图像的中合。因此改值的大小决定了两个图像的混合程度。

与 RGB 模式相比，RGBA 在 RGB 的基础上增加了透明度，通过 Alpha 取值来决定两个图像的混合程度。

```python
from PIL import Image

# 1.两张图片格式保持转化为一致,均转成RGBA
im_1 = Image.open("profile.jpg").convert("RGBA")
im_2 = Image.open("chatgpt.jpg").convert("RGBA")


# 2.让 im_2 的图像尺寸与 im_1 一致,注意此处新生成了 Image 对象
image = im_2.resize(im_1.size)
# 3.混合图片
Image.blend(im_1,image,0.5).show()
```

![](小土堆PyTorch(二).assets/13.png)

> 我的暗黑麦麦！

#### 8、Pillow图像裁剪

Image 类提供的 crop() 函数允许我们以矩形区域的方式对原图像进行裁剪，函数的语法格式如下：

```python
crop(box=None)
```

- box：表示裁剪区域，默认为 None，表示拷贝原图像。
- 注意：box 是一个有四个数字的元组参数 (x左上,y左下,x1右上,y1右下)，分别表示**被裁剪矩形区域的左上角 x、y 坐标和右下角 x，y 坐标**。默认 (0,0) 表示坐标原点，宽度的方向为 x 轴，高度的方向为 y 轴，每个像素点代表一个单位。

```python
from PIL import Image


im= Image.open("profile.jpg")

box = (0,0,500,500)
im_crop = im.crop(box).show()
```

![](小土堆PyTorch(二).assets/14.png)



> 蒙面麦麦！

#### 9、图像拷贝与粘贴

拷贝、粘贴操作几乎是成对出现的，Image 类提供了 copy() 和 paste() 方法来实现图像的复制和粘贴。其中复制操作（即 copy() 方法）比较简单，下面主要介绍 paste() 粘贴方法，语法格式如下所示：

```python
paste(image, box=None, mask=None)
```

该函数的作用是将一张图片粘贴至另一张图片中。注意，粘贴后的图片模式将自动保持一致，不需要进行额外的转换。参数说明如下：

- image：指被粘贴的图片；
- box：指定图片被粘贴的位置或者区域，其参数值是长度为 2 或者 4 的元组序列，长度为 2 时，表示具体的某一点 (x,y)；长度为 4 则表示图片粘贴的区域，此时区域的大小必须要和被粘贴的图像大小保持一致。
- mask：可选参数，为图片添加蒙版效果。

```python
```



#### 10、Pillow图像几何变换

图像的几何变换主要包括图像翻转、图像旋转和图像变换操作，Image 类提供了处理这些操作的函数 transpose()、rotate() 和 transform()，下面分别对它们进行讲解。

```python
# 该函数可以实现图像的垂直、水平翻转，语法格式如下：
Image.transpose(method)
```

method 参数决定了图片要如何翻转，参数值如下：

- Image.FLIP_LEFT_RIGHT：左右水平翻转；
- Image.FLIP_TOP_BOTTOM：上下垂直翻转；
- Image.ROTATE_90：图像旋转 90 度；
- Image.ROTATE_180：图像旋转 180 度；
- Image.ROTATE_270：图像旋转 270 度；
- Image.TRANSPOSE：图像转置；
- Image.TRANSVERSE：图像横向翻转。

```python
from PIL import Image


im= Image.open("profile.jpg")
# 左右翻转
im.transpose(Image.FLIP_LEFT_RIGHT).show()
```

当我们想把图像旋转任意角度时，可以使用 rotate() 函数，语法格式如下：

```python
Image.rotate(angle, resample=PIL.Image.NEAREST, expand=None, center=None, translate=None, fillcolor=None)
```

参数说明如下：

- angle：表示任意旋转的角度；
- resample：重采样滤波器，默认为 PIL.Image.NEAREST 最近邻插值方法；
- expand：可选参数，表示是否对图像进行扩展，如果参数值为 True 则扩大输出图像，如果为 False 或者省略，则表示按原图像大小输出；
- center：可选参数，指定旋转中心，参数值是长度为 2 的元组，默认以图像中心进行旋转；
- translate：参数值为二元组，表示对旋转后的图像进行平移，以左上角为原点；
- fillcolor：可选参数，填充颜色，图像旋转后，对图像之外的区域进行填充。

```python
from PIL import Image


im= Image.open("profile.jpg")

#旋转45°并将旋转图之外的区域填充为绿色
im_out = im.rotate(45,fillcolor="green").show()
```

![](小土堆PyTorch(二).assets/15.png)

> 我的旋转绿麦麦！



transform 该函数能够对图像进行变换操作，通过指定的变换方式，产生一张规定大小的新图像，语法格式如下：

```
Image.transform(size, method, data=None, resample=0) 
```

参数说明：

- size：指定新图片的大小；
- method：指定图片的变化方式，比如 Image.EXTENT 表示矩形变换；
- data：该参数用来给变换方式提供所需数据；
- resample：图像重采样滤波器，默认参数值为 PIL.Image.NEAREST



#### 11、Pillow图像降噪处理

由于成像设备、传输媒介等因素的影响，图像总会或多或少的存在一些不必要的干扰信息，我们将这些干扰信息统称为“噪声”，比如数字图像中常见的“椒盐噪声”，指的是图像会随机出现的一些白、黑色的像素点。图像噪声既影响了图像的质量，又妨碍人们的视觉观赏。因此，噪声处理是图像处理过程中必不可少的环节之一，我们把处理图像噪声的过程称为“图像降噪”。

随着数字图像技术的不断发展，图像降噪方法也日趋成熟，通过某些算法来构造滤波器是图像降噪的主要方式。滤波器能够有效抑制噪声的产生，并且不影响被处理图像的形状、大小以及原有的拓扑结构。

Pillow 通过 ImageFilter 类达到图像降噪的目的，该类中集成了不同种类的滤波器，通过调用它们从而实现图像的平滑、锐化、边界增强等图像降噪操作。常见的降噪滤波器如下表所示：

| 名称                           | 说明                                                         |
| ------------------------------ | ------------------------------------------------------------ |
| ImageFilter.BLUR               | 模糊滤波，即均值滤波                                         |
| ImageFilter.CONTOUR            | 轮廓滤波，寻找图像轮廓信息                                   |
| ImageFilter.DETAIL             | 细节滤波，使得图像显示更加精细                               |
| ImageFilter.FIND_EDGES         | 寻找边界滤波（找寻图像的边界信息）                           |
| ImageFilter.EMBOSS             | 浮雕滤波，以浮雕图的形式显示图像                             |
| ImageFilter.EDGE_ENHANCE       | 边界增强滤波                                                 |
| ImageFilter.EDGE_ENHANCE_MORE  | 深度边缘增强滤波                                             |
| ImageFilter.SMOOTH             | 平滑滤波                                                     |
| ImageFilter.SMOOTH_MORE        | 深度平滑滤波                                                 |
| ImageFilter.SHARPEN            | 锐化滤波                                                     |
| ImageFilter.GaussianBlur()     | 高斯模糊                                                     |
| ImageFilter.UnsharpMask()      | 反锐化掩码滤波                                               |
| ImageFilter.Kernel()           | 卷积核滤波                                                   |
| ImageFilter.MinFilter(size)    | 最小值滤波器，从 size 参数指定的区域中选择最小像素值，然后将其存储至输出图像中。 |
| ImageFilter.MedianFilter(size) | 中值滤波器，从 size 参数指定的区域中选择中值像素值，然后将其存储至输出图像中。 |
| ImageFilter.MaxFilter(size)    | 最大值滤波器                                                 |
| ImageFilter.ModeFilter()       | 模式滤波                                                     |

```python
from PIL import Image,ImageFilter


im= Image.open("profile.jpg")

#图像模糊处理
im.filter(ImageFilter.BLUR).show()

# 轮廓图
im.filter(ImageFilter.CONTOUR).show()

# 边缘检测
im.filter(ImageFilter.FIND_EDGES).show()

# 浮雕图
im.filter(ImageFilter.EMBOSS).show()

# 平滑图像
im.filter(ImageFilter.SMOOTH).show()
```

如果您使用过 PhotoShop或者手机美图软件的话，其实不难发现，上述操作就是给图片添加一个“滤镜”，通过添加滤镜来改变图片的外观，从而影响了我们对于图片的感官体验。

> Pillow还可以添加水印、生成GIF动态图等。
>
> - [Pillow](https://c.weixueyuan.net/pillow/image-color.html)



### 2.2.3、opencv





















## 2.2、数据集

数据集也就是我们的训练数据，数据集有很多种**组织形式**。比较常见的有：

1. 文件夹的名称就是label
   - 比如两个文件夹：ants和bees，蚂蚁和蜜蜂，两个文件夹的名称就是label，文件夹里面的图片就是数据集
2. 分别给两个文件夹，文件夹的名称上写着数据集和label
   - 文件夹名称为`train_images`，文件夹label是`train_labels`
3. 只给一个文件夹，里面图片名就是label
   - 文件夹名称为`train_images`，里面的图片名就是label，比如`1.png`、`2.png`



## 2.3、自学函数

PyTorch中有两个自学函数，`dir()`和`help()`

- `dir()` 函数能让我们知道工具箱以及工具箱里面有什么东西
- `help()` 函数能让我们知道每个工具是如何使用的，工具的说明书

```bash
import torch

dir(torch)
```

![](小土堆PyTorch(二).assets/8.png)

```bash
# 注意不加括号
help(torch.cuda.is_available)
```



![](小土堆PyTorch(二).assets/9.png)







































































