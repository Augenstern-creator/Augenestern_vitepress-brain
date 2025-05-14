# python

# 1、引用

## 1.1、了解引用

在 python 中，值是靠引用来传递的。

我们可以用 `id() `来判断两个变量是否为同一个值的引用。我们可以将 id 值理解为那块内存的地址标识。

```python
# 1. int类型
a = 1
b = a

print(b) # 1

print(id(a)) # 140708464157520
print(id(b)) # 140708464157520

a = 2
print(b) # 1,说明int类型为不可变类型

print(id(a)) # 140708464157552，此时得到是的数据2的内存地址
print(id(b)) # 140708464157520

# 2. 列表
aa = [10, 20]
bb = aa

print(id(aa)) # 2325297783432
print(id(bb)) # 2325297783432

aa.append(30)
print(bb) # [10, 20, 30], 列表为可变类型

print(id(aa)) # 2325297783432
print(id(bb)) # 2325297783432
```



## 1.2、引用当作实参

代码如下：

```python
def test1(a):
    print(a)
    print(id(a))
    
    a += a
    
    print(a)
    print(id(a))
    
# int:计算前后id值不同
b = 100
test1(b)

# 列表：计算前后id值相同
c = [11, 22]
test1(c)
```

## 1.3、可变和不可变类型

所谓的可变类型与不可变类型是指：数据能够直接进行修改，如果能直接修改那么就是可变，否则是不可变

- 可变类型
  - 列表
  - 字典
  - 集合
- 不可变类型
  - 整型
  - 浮点型
  - 字符串
  - 元组

# 2、函数加强

## 2.1、递归

- 递归内部自己调用自己
- 必须要有出口

例如：**我们计算3以内数字的累加和**

```python
# 3 + 2 + 1
def sum_numbers(num):
    # 1.如果是1,直接返回1 --chu出口
    if num == 1:
        return 1
    # 2.如果不是1,重复执行累加
    result = num + sum_numbers(num-1)

    # 3.返回累加结果
    return result


sum_result =  sum_numbers(3)
# 输出结果为6
print(sum_result)
```



## 2.2、lambda表达式

如果**一个函数**有**一个返回值**，并且**只有一句代码**，那么可以使用 lambda 简化代码。

```python
lambda 参数列表:表达式
```

注意：

> - lambda表达式的参数可有可无，函数的参数在 lambda 表达式中完全适用
> - lambda函数能接收任何数量的参数，但是只能返回一个表达式的值

例如我们来看一个简单例子：

```python
# 函数
def fn1():
    return 200


print(fn1)
print(fn1()) # 200


# lambda表达式
fn2 = lambda: 100
print(fn2)
print(fn2()) # 100
```

> 直接打印lambda表达式,输出的是此lambda的内存地址

我们再来实现一个简单加和计算：

```python
def add(a, b):
    return a + b


result = add(1, 2)
print(result) # 3

# lambda 表达式
# lambda(参数列表:表达式)
print((lambda a,b : a+b)(1,2)) # 3
```



## 2.3、lambda的参数形式

### 2.3.1、无参数

```python
print((lambda :100)()) 
# 100
```

### 2.3.2、一个参数

```python
print((lambda a: a)('hello world')) 
# hello world
```

### 2.3.3、默认参数

```python
print((lambda a, b, c=100: a + b + c)(10, 20))
# 130
```

### 2.3.4、可变参数：*args

```python
print((lambda *args: args)(10, 20, 30))
# (10, 20, 30)
# 注意:这里的可变参数传入到lambda之后,返回值为元组
```



### 2.3.5、可变参数: **kwargs

```python
print((lambda **kwargs: kwargs)(name='python', age=20))
```



## 2.4、lambda的应用

### 2.4.1、带判断的lambda

```python
print((lambda a, b: a if a > b else b)(1000, 500))
# 1000
```



### 2.4.2、列表数据按字典key的值排序

```python
students = [
    {'name':'Tom','age':20},
    {'name':'Rose','age':21},
    {'name':'Jack','age':22},
]

# 按name值升序排列
students.sort(key=lambda x:x['name'])
print(students)
# [{'name': 'Jack', 'age': 22}, {'name': 'Rose', 'age': 21}, {'name': 'Tom', 'age': 20}]

# 按name值降序排列
students.sort(key=lambda x:x['name'],reverse=True)
print(students)
# [{'name': 'Tom', 'age': 20}, {'name': 'Rose', 'age': 21}, {'name': 'Jack', 'age': 22}]

# 按age值升序排列
students.sort(key=lambda x:x['age'])
print(students)
# [{'name': 'Tom', 'age': 20}, {'name': 'Rose', 'age': 21}, {'name': 'Jack', 'age': 22}]
```



## 2.5、高阶函数

**把函数作为参数传入**，这样的函数称为高阶函数，高阶函数是函数式编程的体现。

例如：我们使用一个函数完成计算任意两个数字的绝对值之和

```python
# 方法一
def add_num(a, b):
    return abs(a) + abs(b)


result = add_num(-1, 2)
print(result) # 3

# 方法二
def sum_num(a, b, f):
    return f(a) + f(b)

result = sum_num(-1, 2, abs)
print(result) # 3
```

两种方法对比之后，发现方法2的代码会更简洁。函数式编程大量使用函数，减少了代码的重复，因此程序比较短，开发速度快。

### 2.5.1、内置高阶函数

#### 1、map()

`map(func,lst)` ：将传入的函数变量func作用到lst变量的每个元素中，并将结果组成新的列表(Python2)/迭代器(Python3)返回

例如：计算`list1`序列中各个数字的2次方

```python
list1 = [1, 2, 3, 4, 5]

def func(x):
    return x ** 2


result = map(func, list1)

print(result) # <map object at 0x000001BE8EA76630>
print(list(result)) # [1, 4, 9, 16, 25]
```



#### 2、reduce()

`reduce(func(x,y),lst)` ：其中func必须有两个参数。每次func计算的结果继续和序列的下一个元素做累积运算。[==reduce()传入的参数func必须接受2个参数==]

例如：计算`list1`序列中各个数字的累加和

```python
import functools

list1 = [1, 2, 3, 4, 5]

def func(a, b):
    return a + b

result = functools.reduce(func, list1)

print(result) # 15
```





#### 3、filter()

filter(func,lst) 函数用于过滤序列，过滤掉不符合条件的元素，返回一个 filter 对象。如果要转换为列表，可以使用 `list()` 来转换。

```python
list1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

def func(x):
    return x % 2 == 0

result = filter(func, list1)

print(result) # <filter object at 0x00000232A64B6630>
print(list(result)) # [2, 4, 6, 8, 10]
```







































































# 3、文件操作

## 3.1、打开文件

在python，使用 open 函数，可以打开⼀个已经存在的文件，或者创建⼀个新文件，语法如下

```python
open(name,mode,encoding)
```

- name : 是要打开的目标文件名的字符串(可以包含文件所在的具体路径)
- mode : 设置打开文件的模式(访问模式):只读 写入 追加 等
- encoding：编码格式，推荐使用UTF-8

示例：

```python
f = open('python.txt','r',encoding="UTF-8")
# encoding的顺序不是第三位，所以不能用位置参数，用关键字参数直接指定
```



## 3.2、打开文件模式

| 模式  | 描述                                                         |
| ----- | ------------------------------------------------------------ |
| **r** | 以只读的方式打开文件，文件的指针将会放在文件的开头。这是默认模式 |
| rb    | 以二进制格式打开一个文件用于只读，文件指针将会放在文件的开头。这是默认模式 |
| r+    | 打开一个文件用于读写，文件指针将会放在文件的开头             |
| rb+   | 以二进制格式打开一个文件用于读写。文件指针将会放在文件的开头。 |
| **w** | 打开一个文件只用于写入。如果该文件已存在则打开文件，并从开头开始编辑，即原有内容会被删除。如果该文件不存在，创建新文件 |
| wb    | 以二进制格式打开一个文件只用于写入。如果该文件已存在则打开文件，并从开头开始编辑，即原有内容会被删除。如果该文件不存在，创建新文件 |
| w+    | 打开一个文件用于读写。如果该文件已存在则打开文件，并从头开始编辑，即原有内容会被删除。如果该文件不存在，创建新文件 |
| wb+   | 以二进制格式打开一个文件用于读写。如果该文件已存在则打开文件，并从开头开始编辑，即原有内容会被删除。如果该⽂文件不存在，创建新文件。 |
| **a** | 打开⼀个文件用于追加。如果该文件已存在，文件指针将会放在文件的结尾。也就是说，新的内容将会被写入到已有内容之后。如果该文件不存在，创建新文件进行写入。 |
| ab    | 以二进制格式打开⼀个文件用于追加。如果该文件已存在，文件指针将会放在文件的结尾。也就是说，新的内容将会被写入到已有内容之后。如果该文件不存在，创建新文件进行写入。 |
| a+    | 打开⼀个文件用于读写。如果该文件已存在，文件指针将会放在文件的结尾。文件打开时会是追加模式。如果该文件不不存在，创建新文件用于读写 |
| ab+   | 以二进制格式打开一个文件用于追加。如果该文件已存在，文件指针将会放在文件的结尾，如果该文件不存在，创建新文件用于读写 |

```python
f = open('test.txt','w')
```

> 注意：此时的  f  是 open 函数的文件对象

## 3.3、写

语法：`对象.write('内容')`

```python
# 1. 打开⽂件
f = open('test.txt', 'w')

# 2.⽂件写⼊
f.write('hello world')

# 3.内容刷新
f.flush()

# 4. 关闭⽂件
f.close()
```

注意：

1. w  和  a 模式：**如果文件不存在则创建该文件，如果文件存在， w 模式先清空再写入，a 模式直接末尾追加**
2. r 模式： 如果文件不存在则报错
2. 直接调用write，内容并未真正写入文件，而是会积攒在程序的内存中，称之为缓冲区
2. 当调用flush的时候，内容会真正写入文件
2. 这样做是避免频繁的操作硬盘，导致效率下降（攒一堆，一次性写磁盘）

## 3.4、读

语法：`文件对象.read(num)`

> num 表示要从文件中读取的数据的长度(单位是字节)，如果没有传入num，那么就表示读取文件中所有的数据

### 3.4.1、readlines()

readlines可以按照行的方式把整个文件中的内容进行一次性读取，并且返回的是⼀个列表，其中每一行的数据为⼀个元素。

test.txt 如下：

```txt
hello world

lin xiao qin, hold on
```

读文件：

```python
f = open('test.txt')
content = f.readlines()

# ['hello world\n', '\n', 'lin xiao qin, hold on\n', '\n']
print(content)

# 关闭文件
f.close()
```

### 3.4.2、readline()

readline()一次读取一行的内容

```python
f = open('test.txt')

content = f.readline()
print(f'第一行：{content}')

content = f.readline()
print(f'第二行：{content}')

# 关闭文件
f.close()

'''
第一行：hello world

第二行：

第三行：lin xiao qin, hold on
'''
```

### 3.4.3、for循环读取文件行

```python
for line in open("python.txt","r"):
    print(line)
    
# 每一个line临时变量，就记录了文件的一行数据
```



### 3.4.4、with open语法

```python
with open("python.txt","r") as f:
    f.readlines()
# 通过在with open的语句块中对文件进行操作
# with open 会自动关闭文件,避免遗忘调用 close 方法
```











## 3.5、关闭

```python
文件对象.close()
```

## 3.6、文件备份

有一份`bili.txt`文件，请备份：

1. 读取`bili.txt`文件
2. 将文件写出到`bili.txt.bak`文件作为备份
3. 同时，将文件内标记为测试的数据行丢失

实现思路：

- open和r模式打开一个文件对象，并读取文件
- open和w模式打开另一个文件对象，用于文件写出
- for循环内容，判断是否是测试不是测试就write写出，是测试就continue跳过
- 将2个文件对象均close()

### 3.6.1、备份文件写入数据

1. 打开源文件和备份文件
2. 将源文件数据写入备份文件
3. 关闭文件

```python
# 1.打开文件
old_f = open(old_name,'rb')
new_f = open(new_name,'wb')

# 2.将源文件数据写入备份文件
while True:
    con = old_f.read(1024)
    if len(con) == 0:
        break
        new_f.write(con)
        
 # 3.关闭文件
old_f.close()
new_f.close()
```

## 3.7、文件和文件夹的操作

在Python中文件和文件夹的操作要借助OS模块里面的相关功能，步骤如下：

1. 导入OS模块

```python
import os
```

2. 使用`os`模块相关功能

```python
os.函数名()
```

### 3.7.1、文件重命名

```python
os.rename(目标文件名,新文件名)
```

### 3.7.2、删除文件

```python
os.remove(目标文件名)
```

### 3.7.3、创建文件夹

```python
os.mkdir(文件夹名字)
```

### 3.7.4、删除文件夹

```python
os.rmdir(文件夹名字)
```



### 3.7.5、获取当前目录

```python
os.getcwd()
```



### 3.7.6、改变默认目录

```python
os.chdir(目录)
```



### 3.7.7、获取目录列表

```python
os.listdir(目录)
```



























