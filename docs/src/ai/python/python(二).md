# ✍python

# 1、容器公共操作

- 运算符
- 公共方法
- 容器类型转换

## 1.1、运算符

| 运算符 | 描述           | 支持的容器类型                           |
| ------ | -------------- | ---------------------------------------- |
| +      | 合并           | 字符串str，列表list，元组tuple           |
| *      | 复制           | 字符串str，列表list，元组tuple           |
| in     | 元素是否存在   | 字符串str，列表list，元组tuple，字典dict |
| not in | 元素是否不存在 | 字符串str，列表list，元组tuple，字典dict |

### 1.1.1、+ 合并

```python
# 1.字符串
str1 = 'aa'
str2 = 'bb'
str3 = str1 + str2
print(str3)
# aabb

# 2.列表
list1 = [1,2]
list2 = [10,20]
list3 = list1 + list2
print(list3)
#[1,2,10,20]

# 3.元组
t1 = (1,2)
t2 = (10,20)
t3 = t1 + t2
print(t3)
# (1,2,10,20)
```

### 1.1.2、* 复制

```python
# 1.字符串
print('-' * 10)
# ----------

# 2.列表
list1 = ['hello']
print(list *4)
# ['hello','hello','hello','hello',]

# 3.元组
t1 = ('world',)
print(t1 * 4)
# ('world','world','world','world',)
```

### 1.1.3、in 或 not in

```python
# 1.字符串
print('a' in 'abcd')
# True

#2.列表
list1 = ['a','b','c','d']
print('a' in list1)
# True

# 3.元组
t1 = ('a','b','c','d')
print('aa' in t1)
# False
print('aa' not in t1)
#True
```

## 1.2、公共方法

| 函数                  | 描述                                                         |
| --------------------- | ------------------------------------------------------------ |
| len()                 | 计算容器中元素个数                                           |
| del 或del()           | 删除                                                         |
| max()                 | 返回容器中元素最大值                                         |
| min()                 | 返回容器中元素最小值                                         |
| range(start,end,step) | 生成从start到end的数字，步长为step，供for循环使用            |
| enumerate()           | 函数用于将一个可遍历的数据对象（如列表，元组和字符串）组合为一个索引序列，同时列出数据和数据下标，一般用在for循环当中。 |

### 1.2.1、len()

```python
#  1.字符串
str1 = 'abcdefg'
print(len(str1))
# 7

#  2.列表
list1 = [10,20,30,40]
print(len(list1))
# 4

#   3.元组
t1 = (10,20,30,40,50)
print(len(t1))
# 5

#   4.集合
s1 ={10,20,30}
print(len(s1))
#  3


#    5.字典
dict1 = {'name':'Rose','age':18}
print(len(dict1))
#   2
```

### 1.2.2、del()

```python
# 1.字符串
str1 = 'abcdefg'
del str1
print(str1) #报错,已经删除str1


# 2.列表
list1 = [10,20,30,40]
del(list[0])
print(list1)
# [20,30,40]
```

### 1.2.3、max()

```python
# 1.字符串
str1 = 'abcdefg'
print(max(str1))
#  g

# 2.列表
list1 =[10,20,30,40]
print(max(list1))
#  40
```

### 1.2.4、min()

```python
# 1. 字符串
str1 = 'abcdefg'
print(min(str1)) # a

# 2. 列表
list1 = [10, 20, 30, 40]
print(min(list1)) # 10
```



### 1.2.5、range()

```python
for i in range(1,10,1):
   print(i)
   
# 1,2,3,4,5,6,7,8,9

for i in range(1,10,2)
      print(i)
# 1 3 5 7 9

for i in range(10):
   print(i)
# 0 1 2 3 4 5 6 7 8 9
```

> 注意: range()生成的序列不包含end数字

> range默认从0开始，默认步长为1，所以range(10),代表0，1，。。。。9

### 1.2.6、ennumerate()

语法：

```
ennumerate(可遍历对象，start = 0)
```

> start参数可以用来设置遍历数据的下标起始值，默认为0

```python
list1 = ['a', 'b', 'c', 'd', 'e']
for i in enumerate(list1):
    print(i)
    '''
    (0, 'a')
    (1, 'b')
    (2, 'c')
    (3, 'd')
    (4, 'e')
    '''
    
    
for index, char in enumerate(list1, start=1):
    print(f'下标是{index}, 对应的字符是{char}')
    
    '''
    下标是1, 对应的字符是a
    下标是2, 对应的字符是b
    下标是3, 对应的字符是c
    下标是4, 对应的字符是d
    下标是5, 对应的字符是e
    '''
```



## 1.3、容器类型转换

### 1.3.1、tuple()

tuple():将某个序列转换成元组

```python
list1 =[10,20,30,40,50,20] #列表
S1 = {100,200,300,400,500} #集合

print(tuple(list1))
# (10, 20, 30, 40, 50, 20)
print(tuple(s1))
# (100, 200, 300, 400, 500)
```

### 1.3.2、list()

list(): 将某个序列转换成列表

```python
t1 = ('a','b','c','d','e')
s1 = {100,200,300,400,500}

print(list(t1))
# ['a', 'b', 'c', 'd', 'e']
print(list(s1))
# [100, 200, 300, 400, 500]
```

### 1.3.3、set()

set():将某个序列转换成集合

```python
list1 = [10,20,30,40,50,20]
t1 = ('a','b','c','d','e')

print(set(list1))
# {40, 10, 50, 20, 30}
print(set(t1))
# {'e', 'a', 'c', 'd', 'b'}
```

> 集合可以快速完成列表去重

> 集合不支持下标

# 2、推导式

## 2.1、列表推导式

作用：用一个表达式创建一个有规律的列表或控制一个有规律列表。列表推导式又叫列表生成式

需求：创建一个0-10的列表。

1. while循环实现

```python
# 1.准备一个空列表
list1 = []
# 2.书写循环，依次追加数字到空列表list1中
i = 0
while i< 10:
      list1.append(i)
      i += 1
print(list1)
# [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

2. for循环实现

```python
list1 = []
for i in range(10):
    list1.append(i)
print(list1)
# [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

3. 列表推导式实现

```python
for i in range(10):
    print(i)
    # 0、1、2、3、4、5、6、7、8、9


list1 = [i for i in range(10)]
print(list1)
# [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
# 第一个i作为后面式子的返回值
```

### 2.1.1、带if的列表推导式

需求：创建0-10的偶数列表

1. range()步长实现

```python
list1 = [i for i in range(0,10,2)]
print(list1)
# [0, 2, 4, 6, 8]
```

2. if实现

```python
list1 = [i for i in range(10) if i % 2 == 0]
print(list1)
# [0, 2, 4, 6, 8]
```

### 2.1.2、多个for循环实现列表推导式

需求：创建列表如下

```
[(1,0),(1,1),(1,2),(2,0),(2,1),(2,2)]
```

代码如下

```python
list =[]
for i in range(1,3):  #1,2
    for j in range(3): #0,1,2
    #列表里面追加元组
        list.append((i,j))
print(list)
# [(1, 0), (1, 1), (1, 2), (2, 0), (2, 1), (2, 2)]
```

多for的列表推导式等同于for循环嵌套

```python
list1 = [(i,j) for i in range(1,3) for j in range(3)]
print(list1)
# [(1, 0), (1, 1), (1, 2), (2, 0), (2, 1), (2, 2)]
```

## 2.2、字典推导式

作用：快速合并**列表为字典**或提取字典中的目标数据

1. 创建一个字典：字典key是1-5的数字，value是这个数字的2次方

```python
dict1 = {i:i**2  for i in range(1,5)}
#  key: value 
#  因为是字典，所以为大括号
# {1:2, 2:4, 3:9, 4:16}
```

2. 将两个列表合并为一个字典

```python
list1 = ['name','age','gender']
list2 = ['Tom',20,'man']
dict1 = {list1[i]: list2[i] for i in range(len(list1))}
print(dict1)
# {'name': 'Tom', 'age': 20, 'gender': 'man'}
```

3. 提取字典中目标数据

```python
counts = {'MBP': 268, 'HP': 125, 'DELL': 201, 'Lenovo': 199, 'acer': 99}
#需求:提取上述电脑数量大于等于200的字典数据
counts1 = {key:value for key,value in counts.items() if value >=200}
print(counts1)
## {'MBP': 268, 'DELL': 201}
```

## 2.3、集合推导式

需求：创建一个集合，数据为下方列表的2次方

```python
list1 = [1,1,2]
```

代码如下：

```python
list1 = [1,1,2]
set1 = {i ** 2 for i in list1}
print(set1)
# {1,4}
# 注意：集合有数据去重功能
```

## 2.4、总结

```python
# 列表推导式
[xx for xx in range()]

# 字典推导式
{xx1 : xx2 for ... in ....}

# 集合推导式
{xx for xx in ...}
```

# 3、函数

## 3.1、定义函数

```python
def 函数名(参数):
     代码1......
     代码2......
     .........
```

## 3.2、调用函数

```
函数名(参数)
```

1. 不同需求，参数可有可无

2. 在python中，函数必须**先定义后使用**

## 3.3、函数的注意事项

1. 函数先定义后调用，如果先调用会报错

2. 如果没有调用函数，函数里面的代码不会执行

3. 当调用函数的时候，解释器回到定义函数的地方去执行下方缩进的代码，当这些代码执行完，回到调用函数的地方继续向下执行，定义函数的时候，函数体内部缩进的代码并没有执行

## 3.4、函数的参数

```python
# 定义函数时同时定义了接收用户数据的参数a和b，a和b是形参
def add_num2(a,b):
    result = a + b
    print(result)
    
    
# 调用函数时传入了真实的数据10和20，真实数据为实参
add_num2(10,20)         # 30
```

## 3.5、函数的返回值

```python
def buy():
    return '糖'

# 使用变量保存函数返回值
goods = buy()
print(goods)		# 糖
```



## 3.6、函数的说明文档

思考：如果代码多，我们是不是需要在很多代码中找到这个函数定义的位置才能看到注释？如果想更⽅

便的查看函数的作⽤怎么办？

答：**函数的说明文档**

语法：

```pyth
def 函数名(参数)
        """说明文档的位置"""
        代码
        ..........
```

2. 查看函数的说明文档

```
help(函数名)
```

3. 案例

```python
def sum_num(a, b):
    """求和函数"""
    return a + b


help(sum_num)
```

## 3.7、函数的嵌套使用

1. 打印一条横线

```python
def print_line():
    print('-' * 20)
print_line()
```

2. 打印多条横线

```python
def print_line():
    print('-' * 20)
    
def print_lines(num):
    i = 0
    while i < num:
          print_line()
          i += 1
    
print_lines(5) 
```





# 4、函数提高

## 4.1、变量作用域

变量作用域指的是变量⽣效的范围，主要分为两类：**局部变量**和**全局变量**

#### 4.1.1、局部变量

所谓局部变量是定义在**函数体内部的变量**，即只在函数体内部生效

```python
def testA():
   a = 100
   print(a)
   
testA()  # 100
print(a) # 报错 name 'a' is not defined
```

1. 变量a是定义在 testA 函数内部的变量，在函数外部访问则立即报错

2. 局部变量的作用：在函数体内部，临时保存数据，即当函数调用完成后，则销毁局部变量。

### 4.1.2、全局变量

所谓全局变量，指的是在函数体内、外都能⽣效的变量

思考：如果有⼀个数据，在函数A和函数B中都要使⽤，该怎么办？

答：**将这个数据存储在⼀个全局变量里面。**

```python
# 定义全局变量a
a = 100

def testA():
    print(a) #访问全局变量a，并打印变量a存储的数据
def testB():
    print(a) #访问全局变量a，并打印变量a存储的数据

testA() #100
testB() #100
```

思考： testB 函数需求修改变量a的值为200，如何修改程序？

```python
# 定义全局变量a
a = 100

def testA():
    print(a)
    
    
def testB():
    # 这里是定义了一个局部变量a
    a = 200
    print(a)
    
    
testA() #100
testB() #200
print(f'全局变量a={a}') #全局变量a =100
```

思考：在testB函数内部的 a = 200 中的变量a是修改全局变量a 吗？

答：**最后一行得到a的数据是100，仍然是定义全局变量a时候的值**，没有返回testB函数内部的200

综上：testB函数内部的 a = 200是定义了一个局部变量

**思考：如何在函数体内部修改全局变量？**

```python
# 定义全局变量a
a = 100

def testA():
    print(a)
    
    
def testB():
    # global 关键字声明 a 是全局变量
    global a
    a = 200
    print(a)
    
    
testA() #100
testB() #200
print(f'全局变量a={a}') #全局变量a =200
```



## 4.2、多函数程序执行

一般实际开发中，一个程序往往由多个函数组成，并且多个函数共享某些数据

1. 共享全局变量

```python
# 1. 定义全局变量
glo_num = 0


def test1():
    # 声明 glo_num 是全局变量
    global glo_num
    # 修改全局变量
    glo_num = 100


def test2():
    # 调⽤test1函数中修改后的全局变量
    print(glo_num)


# 2. 调⽤test1函数,执⾏函数内部代码:声明和修改全局变量
test1()
# 3. 调⽤test2函数,执⾏函数内部代码:打印
test2()  # 100
```

2. 返回值作为参数传递

```python
def test1():
 return 50

def test2(num):
 print(num)

# 1. 保存函数test1的返回值
result = test1()

# 2.将函数返回值所在变量作为参数传递到test2函数
test2(result) # 50
```

## 4.3、函数的返回值

```python
def return_num():
 return 1
 return 2
 
 
result = return_num()
print(result) # 1
```

> 如果一个函数有两个return，只会执行第一个return，原因是因为return可以退出当前函数，导致return下⽅的代码不执⾏

```python
def return_num():
 return 1, 2
 
 
result = return_num()
print(result) # (1, 2)
```

注意：

1. return a ，b 写法，返回多个数据的时候，默认是**元组类型**

2. return 后面可以连接列表，元组或字典，以返回多个值

## 4.4、函数的参数

### 4.4.1、位置参数

位置参数：调⽤函数时根据函数定义的参数位置来传递参数。

```python
def user_info(name,age,gender):
    print(f'您的名字是{name},年龄是{age},性别是{gender')
    
user_info('TOM',20,'男')
```

> 注意：传递和定义参数的顺序及个数必须⼀致

### 4.4.2、关键字参数

函数调用，通过“键=值”形式加以指定。可以让函数更加清晰、容易使⽤，同时也清除了参数的顺序需求。

```python
def user_info(name,age,gender)
    print(f'您的名字是{name}, 年龄是{age}, 性别是{gender}')
    
    
user_info('Rose', age=20, gender='⼥')
user_info('⼩明', gender='男', age=16)
```

注意：**函数调用时，如果有位置参数时，位置参数必须在关键字参数的前面，但关键字参数之间不存在先后顺序。**

### 4.4.3、缺省参数

缺省参数也叫默认参数，⽤于定义函数，为参数提供默认值，调⽤函数时可不传该默认参数的值（注意：**所有位置参数必须出现在默认参数前，包括函数定义和调用**）

```python
def user_info(name, age, gender='男'):
 print(f'您的名字是{name}, 年龄是{age}, 性别是{gender}')
user_info('TOM', 20)
# 您的名字是TOM, 年龄是20, 性别是男

user_info('Rose', 18, '⼥')
# 您的名字是Rose, 年龄是18, 性别是⼥
```

> 函数调用时，如果为缺省参数传值则修改默认参数值；否则使用这个默认值。



### 4.4.4、不定长参数

不定长参数也叫可变参数。⽤于不确定调用的时候会传递多少个参数(不传参也可以)的场景

此时，可⽤包裹(packing)位置参数，或者包裹关键字参数，来进行参数传递，会显得非常方便。

1. 包裹位置传递

```python
def user_info(*args):
  print(args)


# ('TOM',)
user_info('TOM')
# ('TOM', 18)
user_info('TOM', 18)
```

> 注意：**传进的所有参数都会被args变量收集，它会根据传进参数的位置合并为⼀个元组(tuple)，args是元组类型，这就是包裹位置传递**。



2. 包裹关键字传递

```python
def user_info(**kwargs):
 print(kwargs)


# {'name': 'TOM', 'age': 18, 'id': 110}
user_info(name='TOM', age=18, id=110)
```

> 综上：⽆论是包裹位置传递还是包裹关键字传递，都是⼀个组包的过程

## 4.5、拆包

### 4.5.1、拆包元组

```python
def return_num():
 return 100, 200


num1, num2 = return_num()
print(num1) # 100
print(num2) # 200
```

### 4.5.2、拆包字典

```python
dict1 = {'name': 'TOM', 'age': 18}
a, b = dict1
# 对字典进⾏拆包，取出来的是字典的key



print(a) # name
print(b) # age
print(dict1[a]) # TOM
print(dict1[b]) # 18
```

#### 3.交换变量的值

需求：有变量为 a=10 和 b=20,交换两个变量的值

方法一：

```python
# 1. 定义中间变量
c = 0

# 2. 将a的数据存储到c 
c = a

# 3. 将b的数据20赋值到a，此时a = 20
a = b

# 4. 将之前c的数据10赋值到b，此时b = 10
b = c
print(a) # 20
print(b) # 10
```

方法二:

```python
a, b = 1, 2 
# 将1赋值给a 将2赋值给b

a, b = b, a
# 把b的数值赋值给a ，把a的数值赋值给b
print(a) # 2
print(b) # 1
```





## 4.6、匿名函数

### 4.6.1、函数作为参数传递



```python
# 函数compute，作为参数，传入了test_func函数中使用
def test_func(compute):
    result = compute(1,2)
    print(result)

def compute(x,y):
    return x + y
```



### 4.6.2、lambda匿名函数

函数的定义中：

- def 关键字，可以定义**带有名称**的函数
  - 有名称的函数，可以基于名称**重复使用**。
- lambda 关键字，可以定义**匿名**函数（没有名称）
  - 无名称的匿名函数，只可**临时使用一次**

匿名函数定义语法：

```python
lambda 传入参数: 函数体(一行代码)

# lambda 是关键字，表示定义匿名函数
# 传入参数表示匿名函数的形式参数，如：x, y 表示接收2个形式参数
# 函数体，就是函数的执行逻辑，要注意：只能写一行，无法写多行代码
```

示例：

```python
def test_func(compute):
    result = compute(1,2)
    print(result)
    
# 3    
test_func(lambda x,y: x + y)
```



































