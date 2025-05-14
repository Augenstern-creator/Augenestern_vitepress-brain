# Python

# 1、面向对象

面向对象的三大特征：封装、继承、多态

1. 封装：将属性和方法书写到类的里面的操作即为封装，封装可以为属性和方法添加私有权限。
2. 继承：子类默认继承父类的所有属性和方法，与此同时子类也可以重写父类属性和方法。
3. 多态：多态是同一类事物具有的多种形态。不同的对象调用同一个接口（方法），表现出不同的状态，称为多态。

## 1.1、定义类

- 语法

```python
class 类目():
	代码
```

### 1.1.2、创建对象

- 语法：`对象名 = 类名()`

```python
# 定义类
class Student():
    # 成员变量
    name = None  # 学生的名字
    age = None # 学生的年龄
    
    # 成员方法
    def say_hi(self):
        print(f"大家好，我是{self.name}")

# 创建对象 对象名 = 类名()
stu = Student()
stu.name = "周杰伦"
# 大家好，我是周杰伦
stu.say_hi()
```

> 注意：创建对象的过程也叫实例化对象。
>
> - **类中定义的属性(变量):成员变量**
>
> - **类中定义的行为(函数):成员方法**

### 1.1.3、self

在类中定义成员方法和定义函数基本一致，但仍有细微区别，多了个`self`关键字：

```python
def 方法名(self,形参1,......,形参N)：
  方法体
```



self 关键字是成员方法定义的时候必须填写的，

- 它指的是调用该函数的对象。
- 在方法内部,想要访问类的成员变量,必须使用self

```python
# 定义类
class Student():
    # 成员变量
    name = None  # 学生的名字
    age = None # 学生的年龄
    
    # 成员方法
    def say_hi(self):
        print(f"大家好，我是{self.name}")
     def  say_hi2(self,msg):
        print(f"大家好{msg}")
        
stu = Student()
# 调用的时候,需要传msg参数，但不用传self参数
stu.say_hi2("很高兴认识大家")
```

> self关键字，尽管在参数列表中，但是传参的时候可以忽略它。





## 1.2、添加和获取对象属性

属性即是特征，比如：洗衣机的宽度、高度、重量

对象属性既可以在类外面添加和获取，也能在类里面添加和获取

### 1.2.1、类外面添加对象属性

- 语法

```python
对象名.属性名 = 值
```

- 体验

```python
haier1.width = 500
haier2.height = 800
```

### 1.2.2、类外面获取对象属性

- 语法

```python
对象名.属性名
```

- 体验

```python
print(f'haier洗⾐衣机的宽度是{haier.width}')
print(f'haier洗⾐衣机的⾼高度是{haier.height}')
```

- 完整代码如下：

```python
# 定义类
class Washer():
    def wash(self):
        print('能洗衣服')


# 创建对象 对象名 = 类名()
haier1 = Washer()
haier1.width = 500
haier1.heigh = 300

print(f'洗衣机的宽度是{haier1.width}') #洗衣机的宽度是500
print(f'洗衣机的高度是{haier1.heigh}') #洗衣机的高度是300
```



### 1.2.3、类里面获取对象属性

- 语法

```python
self.属性名
```

- 体验

```python
# 定义类
class Washer():
    def print_info(self):
    # 类里面获取对象属性
        print(f'haier1洗衣机的宽度是{self.width}')
        print(f'haier1洗衣机的⾼高度是{self.height}')

# 创建对象
haier1 = Washer()

# 添加实例属性
haier1.width = 500
haier1.height = 800

haier1.print_info()
# haier1洗衣机的宽度是500
# haier1洗衣机的⾼高度是800
```



## 1.3、魔法方法

在 Python 中 ,`__xx__()` 的函数叫做魔法方法，指的是具有特殊功能的函数

### 1.3.1、`__init__()`构造方法

思考：洗衣机的宽度高度是与生俱来的属性，可不可以在生产过程中就赋予这些属性呢？

答：理应如此

`__init__`方法的作用：初始化对象

```python
class Student:
    name = None # 名称
    age = None # 年龄
    
stu1 = Student()
stu1.name = "周杰伦"
stu1.age = 31

stu2 = Student()
stu2.name = "张三"
stu2.age = 21
```

上方代码中，为对象的属性赋值需要依次进行，略显繁琐，有没有更加高效的方式，能够一行代码就完成呢？

Python 类可以使用`__init__()`方法，称之为构造方法

可以实现：

- 在创建类对象（构造类）的时候，会自动执行
- 在创建类对象（构造类）的时候，将传入参数自动传递给__init__方法使用

```python
class Student:
    # 省略
    # name = None # 名称
    #  age = None # 年龄
    def __init__(self,name,age):
        self.name = name
        self.age = age

stu = Student("秦晓",21)
```





注意：

- `__init__()`方法，在创建一个对象时默认被调用，不需要手动调用
- `__init__(self)`中的self参数，不需要开发者传递，python解释器会自动把当前的对象引用传递过去。

### 1.3.2、带参数的`__init__()`

思考：一个类可以创建多个对象，如何对不同的对象设置不同的初始化属性呢？

答案：传参数

```python
class Washer():
    def __init__(self, width, height):
        self.width = width
        self.height = height
    def print_info(self):
        print(f'洗衣机的宽度是{self.width}')
        print(f'洗衣机的⾼高度是{self.height}')

haier1 = Washer(10, 20)
haier1.print_info() # 洗衣机的宽度是10 洗衣机的⾼高度是20

haier2 = Washer(30, 40)
haier2.print_info() # # 洗衣机的宽度是30 洗衣机的⾼高度是40
```



### 1.3.3、`__str__()`

当使用 print 输出对象的时候，**默认打印对象的内存地址**。如果类定义了`__str__`方法，那么就会打印从在这个方法中 return 的数据。

```python
class Washer():
    def __init__(self, width, height):
        self.width = width
        self.height = height
    def __str__(self):
        return '这是海尔洗衣机的说明书'


haier1 = Washer(10, 20)
# 这是海尔洗衣机的说明书
print(haier1)
```

### 1.3.4、`__del__()`

当删除对象时，python解释器也会默认调用 `__del__()`方法。

```python
class Washer():
    def __init__(self, width, height):
        self.width = width
        self.height = height
    def __del__(self):
        print(f'{self}对象已经被删除')


haier1 = Washer(10, 20)
# <__main__.Washer object at 0x000001BDAD57F860>对象已经被删除
del haier1
```





### 1.3.5、`__lt__`小于符号比较方法

直接对2个对象进行比较是不可以的:

```python
class Student:
    # 省略
    # name = None # 名称
    #  age = None # 年龄
    def __init__(self,name,age):
        self.name = name
        self.age = age

stu1 = Student("秦晓",21)
stu1 = Student("张三",22)
print(stu1 < stu2)
```

但是在类中实现__lt__方法，即可同时完成：小于符号 和 大于符号 2种比较

```python
class Student:
    # 省略
    # name = None # 名称
    #  age = None # 年龄
    def __init__(self,name,age):
        self.name = name
        self.age = age
    def __lt__(self,other):
        return self.age < other.age

stu1 = Student("秦晓",21)
stu1 = Student("张三",22)
print(stu1 < stu2) # true
print(stu1 > stu2) # false
```

> 同理 `__le__` 可用于 <= 、 >= 两种比较运算符
>
> 同理 `__eq__` 可以按照自己的想法来决定2个对象是否相等了

```python
class Student:
    # 省略
    # name = None # 名称
    #  age = None # 年龄
    def __init__(self,name,age):
        self.name = name
        self.age = age
    def __eq__(self,other):
        return self.age < other.age

stu1 = Student("秦晓",21)
stu1 = Student("张三",21)
print(stu1 == stu2) # true
```







## 1.4、总结

面向对象重要组成部分

- 类

  - 创建类

  ```python
  class 类名():
      代码
  ```

  - 创建对象

  ```python
  对象名 = 类名()
  ```

- 添加对象属性

  - 类外面添加

  ```python
  对象名.属性名 = 值
  ```

  - 类里面

  ```python
  self.属性名 = 值
  ```

- 获取对象属性

  - 类外面

  ```python
  对象名.属性名
  ```

  - 类里面

  ```python
  self.属性名
  ```

- 魔法方法

  - `__init__()` 初始化
  - `__str__()` 输出对象信息
  - `__del__()` 删除对象时调用
  
  
  



## 1.5、封装

### 1.5.1、私有成员

类中提供了私有成员的形式来支持：

- 私有成员变量
- 私有成员方法

定义私有成员的方式非常简单，只需要：

- 私有成员变量：变量名以`__`开头
- 私有成员方法：方法名以`__`开头

```python
class Student:
    name = None 
    # 私有成员变量
    __age = None
    
    # 私有成员方法
    def __study(self):
        print("学习")
        
# 私有变量无法赋值,也无法获取值
stu = Student()
stu.age = 33    # 不报错,但无效
print(stu.age)  # 获取私有变量值,报错

# 私有方法无法直接被类对象使用
stu.__study()   # 报错
```

私有成员无法被类对象使用，但是可以被其它的成员使用

```python
class Student:
    name = None 
    # 私有成员变量
    __age = None
    
    # 私有成员方法
    def __study(self):
        print("学习")
    
    def call(slef):
        # 在成员方法内可以访问其他私有成员
        print(self.name)
```







# 2、面向对象-继承

## 2.1、继承的基本语法

```python
# 父类
class Father(object):
    pass

# 子类，继承父类
class Son(Father):
    pass
```

> 在Python中，所有类默认继承object类，object类是顶级类或基类；其他子类叫做派生类。

## 2.2、继承相关概念

- 继承：一个类从另一个已有的类获得其成员的相关特性，就叫作继承！
- 派生：从一个已有的类产生一个新的类，称为派生！

> 很显然，继承和派生其实就是从不同的方向来描述的相同的概念而已，本质上是一样的！

- 父类：也叫作基类，就是指已有被继承的类！
- 子类：也叫作派生类或扩展类
- 扩展：在子类中增加一些自己特有的特性，就叫作扩展，没有扩展，继承也就没有意义了！
- 单继承：一个类只能继承自一个其他的类，不能继承多个类，单继承也是大多数面向对象语言的特性！
- 多继承：一个类同时继承了多个父类， （C++、Python、Java等语言都支持多继承）[**注意：当一个类有多个父类的时候，默认使用第一个父类的同名属性和方法**]

Python中的继承指的是多个类之间的所属关系，即子类默认继承父类的所有属性和方法，如下：

```python
# 父类A
class A(object):
    # 私有成员方法
    def __init__(self):
        self.num = 1

    # 成员方法
    def info_print(self):
        print(self.num)

# 子类B继承A类
class B(A):
    pass


result = B()
result.info_print() # 1
```





## 2.3、单继承

单继承：一个类只能继承自一个其他的类，不能继承多个类。这个类会有具有父类的属性和方法。

例如：猫，狗 都属于动物，它们行为相似性高。都会吃、会睡

```python
# 动物类
class Animal(object):
    def eat(self):
        print("吃...")
    def sleep(self):
        print("睡...")
    def call(self):
        print("叫...")
        
# 狗类
class Dog(Animal):
    pass

# 猫类
class Cat(Animal):
    pass
```





## 2.4、重写方法

**重写也叫覆盖，就是当子类成员与父类成员名字相同的时候，从父类继承下来的成员会重新定义**。

子类重写父类同名方法和属性，上面的例子中Animal 的子类 Cat和Dog 继承了父类的属性和方法，但是我们狗类Dog 有自己的叫声'汪汪叫'，猫类 Cat 有自己的叫声 '喵喵叫' ，这时我们需要对父类的 call() 方法进行重构：

```python
class Animal(object):
    def eat(self):
        print("吃...")
    def sleep(self):
        print("睡...")
    def call(self):
        print("叫...")


class Dog(Animal):
    def call(self):
        print("汪汪叫...")

class Cat(Animal):
    def call(self):
        print("喵喵叫...")

# Dog实例对象
dog = Dog()
dog.call()  # 汪汪叫...

# Cat实例对象
cat = Cat()
cat.call()  # 喵喵叫...
```

> 子类和父类具有同名属性和方法，默认使用子类的同名属性和方法

思考：此时父类中的 call 方法还在不在？

答：还在，只不过是在其子类中找不到了。类方法的调用顺序，当我们在子类中重构父类的方法后，Cat 子类的实例先会在自己的类Cat中查找该方法，当找不到该方法时才会去父类Animal中查找对应的方法。

## 2.5、调用父类属性和方法

`super()`：调用父类属性和方法，完整写法为：`super(当前类名，self).属性或方法()`

```python
class Animal(object):
    def __init__(self,name,age):
        self.name = name
        self.age = age

    def eat(self):
        print("吃...")
    def sleep(self):
        print("睡...")
    def call(self):
        print("叫...")


class Dog(Animal):
    def __init__(self,name,age,sex):
        # 调用父类的 init 方法
        # super(Dog,self).__init__(name,age)
        super().__init__(name,age)
        self.sex = sex


class Cat(Animal):
    def __init__(self,name,age,sex):
        # 调用父类的 init 方法
        # super(Cat,self).__init__(name,age)
        super().__init__(name,age)
        self.sex = sex
```



## 2.6、多继承

多继承：一个类同时继承了多个父类，并且同时具有所有父类的属性和方法例如：孩子会继承父亲 和 母亲的方法

```python
class Father(object):
    pass

class Mother(object):
    pass

class Child(Father,Mother):
    pass
```



# 3、面向对象-多态

定义：**多态是一种使用对象的方式，子类重写父类方法，调用不同子类对象的相同父类方法，可以产生不同的执行结果**

1. 多态依赖继承
2. 子类方法必须要重写父类方法

## 3.1、多态的实现步骤

1. 定义父类，并提供公共方法
2. 定义子类，并重写父类方法
3. 传递子类对象给调用者，可以看到不同子类执行效果不同



## 3.2、多态实现

类具有继承关系，并且子类类型可以向上转型可看做父类类型，如果我们从 Animal 派生出 Cat 和 Dog，并且都写了一个 `call()` 方法，如下示例：

```python
# 动物类
class Animal(object):
    def __init__(self,name,age):
        self.name = name
        self.age = age
    def call(self):
        print(self.name,'会叫')

# 狗类继承动物类
class Dog(Animal):
    def __init__(self,name,age,sex):
        # 调用父类的 init 方法
        super(Dog,self).__init__(name,age)
        self.sex = sex
    def call(self):
        print(self.name,'会汪汪叫')

# 猫类继承动物类
class Cat(Animal):
    def __init__(self,name,age,sex):
        # 调用父类的 init 方法
        super(Cat,self).__init__(name,age)
        self.sex = sex

    def call(self):
        print(self.name,'会喵喵叫')


# 定义一个do函数
def do(all):
    all.call()

# 创建实例
A = Animal('动物',4)
C = Cat('猫',2,'男')
D = Dog('狗',2,'女')

for x in (A,C,D):
    do(x)
    '''
    动物 会叫
    猫 会喵喵叫
    狗 会汪汪叫
    '''
```

上述这种行为称为多态，也就是说，方法调用将作用在 all 的实际类型上。

- C 是 Cat 类型，它实际上上拥有自己的 call() 方法以及从 Animal 继承的 call 方法，但调用 C.call() 总是先查找它自身的定义，如果没有定义，则顺着继承链向上查找，直到在某个父类中找到为止。
- 传递给函数 do(all) 的参数 all 不一定是 Animal 或 Animal 的子类型。任何数据类型的实例都可以，只要它有一个 call() 的方法即可。
- 其他类不继承于 Animal，具备 call 方法也可以使用 do 函数。
- 这就是动态语言，动态语言调用实例方法，不检查类型，只要方法存在，参数正确，就可以调用。

再来看一个例子：

```python
class Dog(object):
    # 父类提供统一的方法,哪怕是空方法
    def work(self):
        print("指哪打哪")

class ArmyDog(Dog):
    # 子类重写父类同名方法
    def work(self):
        print("追击敌人")


class DrugDog(Dog):
    # 子类重写父类同名方法
    def work(self):
        print("追查毒品")

class Person(object):
    def work_with_dog(self,dog):
        dog.work()

ad = ArmyDog()
dd = DrugDog()

police = Person()
police.work_with_dog(ad)    # 追击敌人
police.work_with_dog(dd)    # 追查毒品
```

`def work_with_dog(self,dog)`： 传入不同的对象,执行不同的代码,即不同的work函数。







# 4、面向对象-其他特性

## 4.1、私有属性和私有方法

在Python中，可以为实例属性和方法设置私有权限，即设置某个实例属性或实例方法不继承给子类。

设置私有属性和私有方法的方式非常简单：在属性名和方法名前面加上两个下划线 `"__"` 即可。

```python
class Girl():
    def __init__(self):
        self.name = '小美'
        self.age = 18

    def __showinfo(self):
        print(f'姓名:{self.name},年龄:{self.age}')

girl = Girl()
print(girl.name)    # 小美
print(girl.age)     # 18

#外界不能直接访问私有属性和私有方法
girl.showinfo()  # 报错
```



## 4.2、私有属性和私有方法与继承的关系

**私有属性和私有方法也不能被子类继承**

```python
class Cat(object):
    def __init__(self):
        self.name = '猫大师'
        self.kungfu = '闪、展、腾、挪'
        # 私有属性
        self.__skill = '爬树'

class Tiger(Cat):
    pass

tiger = Tiger()
tiger.name = '学徒虎'
print(f'{tiger.name},功夫:{tiger.kungfu}') # 学徒虎,功夫:闪、展、腾、挪
print(f'{tiger.__skill}') # 报错,私有属性不能被子类继承
```



## 4.3、获取和设置私有属性值

在Python中，一般定义函数名 `get_xx` 用来获取私有属性，定义 `set_xx` 用来修改私有属性值

```python
class Girl():
    def __init__(self):
        self.name = '小美'
        self.age = 18
    def get_age(self):
        return self.age
    def set_age(self,age):
        self.age = age


girl = Girl()
girl.set_age(19)
print(girl.get_age()) # 19
```



## 4.4、类属性和实例属性

### 4.4.1、类属性

**类属性**就是**类对象中定义的属性**，它是**该类的所有实例对象所共有**。

```python
class Tool(object):
    # 定义类属性,用于记录创建了多少个工具对象
    count = 0
```

### 4.4.2、类方法

**类方法**：类方法就是针对类对象定义的方法，在类方法中可以直接访问类属性或者调用其他类方法。

基本语法：

```python
@classmethod
def 类名称(cls):
    pass
```

- 类方法需要用修饰器 `@classmethod` 来标识，告诉解释器这是一个类方法，类方法的第一个参数是 `cls`
  - 有哪一个类调用的方法，方法内的 " cls " 就是哪一个类的引用
  - 这个参数和示例方法的第一个参数是 "self" 类似
  - 提示使用其他名称也可以，不过习惯使用 " cls " 通过`类名.`调用类方法，调用方法时，不需要传递" cls "参数

- 在方法内部
  - 可以通过 `cls.` 访问类的属性
  - 也可以通过 `cls.` 调用其他的类方法



```python
class Tool(object):
    # 定义类属性,用于记录创建了多少个对象
    count = 0

    def __init__(self, name):
        self.name = name
        # 针对类属性做一个计数+1的操作
        Tool.count += 1

    # 类方法,类方法需要用 @classmethod 修饰，并且第一个参数为cls
    @classmethod
    def show_tools_count(cls):
        # 使用 cls.count 访问类的属性
        print(f'对象的数量：{cls.count}')

tool1 = Tool('斧子')
tool2 = Tool('榔头')
tool3 = Tool('铁锹')

# 输出对象的总数
Tool.show_tools_count() # 对象的数量：3
```







## 4.5、静态方法

在开发时，如果需要在类中封装一个方法，这个方法：

1. 既**不需要**访问**实例属性**或者调用**实例方法**
2. 也**不需要**访问**类属性**或者调用**类方法** 

这个时候，可以把这个方法封装成一个**静态方法**

基本语法：

```python
@staticmethod
def 静态方法名():
    pass
```

静态方法需要用修饰器 `@staticmethod` 来标识，告诉解释器这是一个静态方法。

通过`类名.`调用 静态方法

```python
class Game:
    # 静态方法
    @staticmethod
    def menu():
        print('开始[1]')
        print('暂停[2]')
        print('退出[3]')
        
# 直接通过 类名.静态方法() 调用
Game.menu()
```







## 4.6、类型注解

### 4.6.1、变量的类型注解

在PyCharm中编写代码，经常可以自动提示，为什么PyCharm知道这一点？因为PyCharm确定这个对象是什么类型！

Python在3.5版本的时候引入了类型注解，以方便静态类型检查工具，IDE等第三方工具。主要功能：

- 帮助第三方IDE工具（如PyCharm）对代码进行类型推断，协助做代码提示
- 帮助开发者自身对变量进行类型注释

示例：为变量设置类型注解

```python
# 语法
变量: 类型

# 基础数据类型注解
var_1: int = 10
var_2: float = 3.14
    
# 类对象类型注解
class Student:
    pass
stu: Student = Student()
    
# 基础容器类型注解
my_list: list = [1,2,3]
my_tuple: tuple = (1,2,3)
    
# 容器类型详细注解
my_list: list[int] = [1,2,3]
my_tuple: tuple[str,int,bool] = ("it",666,True)
my_set: set[int] = {1,2,3}
my_dict: dict[str,int] = {"it": 666}
```

> 元组类型设置类型详细注解，需要将每一个元素都标记出来
>
> 字典类型设置类型详细注解，需要2个类型，第一个是key第二个是value





### 4.6.2、函数类型注解

```python
# 语法
def 函数方法名(形参: 类型,......,形参: 类型) -> 返回值类型:
    pass

# 示例
def add(x: int,y: int) -> int:
    return x + y
```









# 5、异常

当检测到一个错误时，解释器就无法继续执行了，反而出现了一些错误的提示，这就是所谓的"异常"。

## 5.1、异常的写法

```python
try:
    可能发生错误的代码
except:
    可能出现异常执行的代码
```

例如：

````python
try:
    print(name)
except NameError:
    print('name变量名称未定义错误')
````

> 1. 如果尝试执行的代码的异常类型和要捕获的异常类型不一致，则无法捕获异常。
> 2. 一般try下方只放一行尝试执行的代码。



## 5.2、捕获多个异常

当捕获多个异常时，可以把要捕获的异常类型的名字，放到except 后，并使用元组的方式进行书写。

```python
try:
    print(1/0)
except(NameError,ZeroDivisionError):
    print('有错误')
```



## 5.3、捕获异常并输出描述信息



```python
try:
    print(num)
except(NameError,ZeroDivisionError) as e:
    print(e)
```



## 5.4、捕获所有异常

Exception是所有程序异常类的⽗父类。

```python
try:
    print(num)
except Exception as e:
    print(e)
```

## 5.5、异常的else

else表示的是如果没有异常要执行的代码

```python
try:
    print(1)
except Exception as e:
    print(e)
    
else:
    print('我是else，是没有异常的时候执行的代码')
```



## 5.5、异常的finally

finally表示的是无论是否异常都要执行的代码，例如关闭文件。

```python
try:
    f = open('text.txt','r')
except Exception as e:
    f = open('text.txt','w')
else:
    print('没有异常可真好')
finally:
    f.close()
```



## 5.6、抛出自定义异常

在Python中，抛出自定义异常的语法为 `raise 异常类对象`

例如：密码长度不足，则报异常(用户输入密码，如果输入的长度不足3位，则报错，即抛出自定义异常，并捕获该异常)

```python
class ShortInputError(Exception):
    def __init__(self,length,min_length):
        self.length = length
        self.min_len = min_len
        
    def __str__(self):
        return f'你输入的密码长度位{self.length}位,不能少于{self.min_length}个字符'
 
def main():
    try:
        password = input('请输入你的密码')
        if len(password) < 6:
            # 抛出异常类对象
            raise ShortInputError(len(passwoprd,6))
     except Exception as e:
        print(e)
     else:
        print('密码输入完成')

 main()       
```





# 6、模块

Python模块，是一个Python文件，以.py结尾，包含了Python对象定义和Python语句。模块能定义函数，类和变量，模块里面也能包含可执行的代码。



## 6.1、模块的导入方式

- import 模块名
- from 模块名 import 功能名
- from 模块名 import*
- import 模块名 as 别名
- from 模块名 import 功能名 as 别名

### 6.1.1、import 模块名

基本语法：

```python
import 模块名
import 模块名1,模块名2

模块名.功能名()
```

例如：导入 math 模块，求数字 9 的平方根

```python
import math
print(math.sqrt(9)) # 3.0
```



### 6.1.2、from 模块名 import 功能名

基本语法：

```python
from 模块名 import 功能名

功能名()
```

例如：导入os模块，新建文件夹

```python
from os import mkdir
mkdir('images')
```

### 6.1.3、from 模块名 import*

基本语法：

```python
from 模块名 import*
功能名()
```

例如：导入sys模块，获取操作系统信息

```python
from sys import *
print(platform)
```



### 6.1.4、as定义别名

基本语法：

```python
# 模块定义别名
import 模块名 as 别名

# 功能定义别名
from 模块名 import 功能 as 别名
```

例如：

```python
# 模块别名
import time as tt

tt.sleep(2)
print('hello')


# 功能别名
from time import sleep as sl
sl(2)
print('hello')
```

## 6.2、制作自定义模块

在Python中，每个Python文件都可以作为一个模块，模块的名字就是文件的名字。

**也就是说自定义模块名必须要符合标识符命名规则。**

例如：新建一个Python文件，命名为`my_module1.py`，并定义test函数。

```python
def test(a, b):    
    print(a + b)
```

### 6.2.1、测试模块

添加一些测试信息，例如，在实际开发中，当一个开发人员编写完一个模块后，为了让模块能够在项目中达到想要的效果，这个开发人员会自行在py文件`my_module1.py`文件中添加测试代码。

```python
def test(a, b):
    print(a + b)


test(1, 1)
```

此时，无论是当前文件，还是其他已经导入了该模块的文件，在运行的时候都会自动执行`test`函数的调用。

怎么让其他导入该模块的文件运行不执行 `test` 函数调用呢？

```python
def test(a, b):
    print(a + b)

# 只在当前文件中调用该函数，其他导入的文件内不符合该条件，则不执行testA函数调用
if __name__ == '__main__':
    test (1, 1)
```

调用方式：

```python
import my_module1
my_module1.test (1, 1)
```

> 如果使用from .. import ..或from .. import *导入多个模块的时候，且模块内有同名功能。当调用这个同名功能的时候，调用到的是后面导入的模块的功能。

```python
# 模块1代码
def my_test(a, b):
    print(a + b)

# 模块2代码
def my_test(a, b):
    print(a - b)
    
# 导入模块和调用功能代码
from my_module1 import my_test
from my_module2 import my_test

# my_test函数是模块2中的函数
my_test(1, 1)
```

注意：

- 自己的文件名不要和已有模块名重复，否则导致模块功能无法使用 
- 使用`from 模块名 import 功能`的时候，如果功能名字重复，调用到的是最后定义或导入的功能

## 6.3、`__all__`

如果一个模块文件中有`__all__`变量，当使用`from xxx import *`导入时，只能导入这个列表中的元素。

![](python(四).assets/1.png)

























# 7、包



## 7.1、Python包

包将有联系的模块组织在一起，即放到同一个文件夹下，并且在这个文件夹创建一个名字为`__init__.py` 文件，那么这个文件夹就称之为包。

![](python(四).assets/2.png)

## 7.2、制作包

在 PyCharm 中， [new] - [Python Package] - [输入包名] - [OK] 

新建包后，包内部会自动创建 `__init__.py` 文件，这个文件控制着包的导入行为。



## 7.3、入手

1. 新建包 `Demo`
2. 新建包内模块 `my_module1` 和 `my_module2`
3. 模块内代码如下：

```python
# my_module1
print(1)


def info_print1():
    print('my_module1')
```

```python
# my_module2
print(2)


def info_print2():
    print('my_module2')
```

4. 导入包方法一

```python
# import 包名.模块名
import Demo.my_module1
Demo.my_module1.info_print1()
'''
1
my_module1
'''
```

4. 导入包方法二

   注意：必须在 `__init__.py` 文件中添加 `__all__=[]` ，控制允许导入的模块列表

```python
# from 包名 import *
from Demo import *
Demo.info_print1()
```



## 7.4、第三方包

第三方包的安装非常简单，我们只需要使用Python内置的pip程序即可，只需要打开命令提示符窗口：

```bash
pip install 包名称
```

由于pip是连接的国外的网站进行包的下载，所以有的时候会速度很慢，我们可以通过如下命令，让其连接国内的网站进行包的安装：

```python
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple 包名称
```

https://pypi.tuna.tsinghua.edu.cn/simple 是清华大学提供的一个网站，可供pip程序下载第三方包



## 7.5、PyCharm安装第三方包

- File - Setting - Python Interpreter
- 点击右方 + 号
- 选择自己需要的库， install Package























