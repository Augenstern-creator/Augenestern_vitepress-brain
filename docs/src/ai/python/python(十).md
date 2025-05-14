# 1、Django5视图

## 1.1、列表视图ListView

为了实现快速开发，Django提供了视图类功能，封装了视图开发常用的代码，这种基于类实现的响应与请求称为CBV （ Class Base Views）,我们先介绍列表视图ListView，该视图类可以将数据库表的数据以列表的形式显示到页面，常用于数据的查询和展示。

首先为了得到数据库数据，我们先定义模型，来映射数据库表；

1. `models.py`里定义`StudentInfo`类

```python
class StudentInfo(models.Model):
    # 表id字段
    id = models.AutoField(primary_key=True)
    # name字段
    name = models.CharField(max_length=20)
    # age字段
    age = models.IntegerField()

    class Meta:
        # 指明数据库表名
        db_table = "t_student"
```

- 之后执行：`python manage.py makemigrations` 生成数据库迁移文件
  - 所谓的迁移文件, 是类似模型类的迁移类,主要是描述了数据表结构的类文件
- 再执行：`python manage.py migrate` 执行迁移文件，同步到数据库中
  - 生成的表名可通过 `db_table`指明数据库表名

2. 之后就可以看到数据库表`t_student`自动生成了，我们插入一些测试数据

```sql
insert into t_student VALUES(null,'张三1',20);
insert into t_student VALUES(null,'张三2',21);
insert into t_student VALUES(null,'张三3',22);
insert into t_student VALUES(null,'张三4',23);
insert into t_student VALUES(null,'张三5',24);
insert into t_student VALUES(null,'张三6',25);
insert into t_student VALUES(null,'张三7',26);
insert into t_student VALUES(null,'张三8',27);
insert into t_student VALUES(null,'张三9',28);
insert into t_student VALUES(null,'张三10',29);
insert into t_student VALUES(null,'张三11',30);
insert into t_student VALUES(null,'张三12',31);
```

![](python(十).assets/1.png)





3. 要使用 ListView，需要继承它并设置一些属性。以下属性是最常用的：
   - `model` ： 指明要使用的模型
   - `template_name` ： 指定要使用的模板名称
   - `context_object_name` ： 指定上下文变量名称，默认为 objetc_list
   - `paginate_by` ： 指定分页大小
   - `extra_context` ：设置模型外的数据

在views.py里，我们可以定义List类：

```python
# List类
class List(ListView):
    # 设置模板文件
    template_name = 'student/list.html'
    # 设置模型外的数据
    extra_context = {'title': '学生信息列表'}
    # 查询结果集(返回所有的数据库表的数据)
    queryset = StudentInfo.objects.all()
    # 每页展示10条数据
    paginate_by = 10
    # 设置上下文对象名称
    context_object_name = 'student_list'
```

除了设置属性之外，还可以重写 ListView 中的方法以进行自定义。以下是一些常见的方法：

- `get_queryset() `：返回要在视图中使用的查询集合。这里可以对查询集合进行筛选、排序等操作。
- `get_context_data()` ：返回要在模板上下文中使用的变量。这里可以添加额外的变量，如表单、过滤器等

4. `urls.py`里，我们定义映射：

```python
path('student/list', Hello.views.List.as_view())
```

在模版页面，Django 给我们提供了分页的功能： Paginator 和 Page 类都是用来做分页的。

Paginator 常用属性和方法：

- `count` ： 总共有多少条数据
- `num_pages` ： 总共有多少页
- `page_range`：页面的区间，比如有三页，那么就是`range(1,4)`

Page 常用属性和方法：

- `has_next` ：是否还有下一页
- `has_previous` ：是否还有上一页
- `next_page_number` ：下一页的页码
- `previous_page_number` ： 上一页的页码
- `number` ：当前页
- `start_index` ：当前页的第一条数据的索引值
- `end_index` ：当前页的最后一条数据的索引值

5. 在templates下新建student目录，再新建list.html

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{ Title }}</title>
</head>
<body>
<h3>{{ title }}</h3>
<table border="1">
    <tr>
        <th>编号</th>
        <th>姓名</th>
        <th>年龄</th>
    </tr>
    {#从上下文对象student_list取数据#}
    {% for student in student_list %}
        <tr>
            <td>{{ student.id }}</td>
            <td>{{ student.name }}</td>
            <td>{{ student.age }}</td>
        </tr>
    {% endfor %}
</table>
<br>
{#是否有分页#}
{% if is_paginated %}
    {#如果有上一页#}
    {% if page_obj.has_previous %}
        <a href="/student/list?page={{ page_obj.previous_page_number }}">上一页</a>
    {% endif %}
    
    {#  让当前页的页码数比醒目   #}
    {% for current in paginator.page_range %}
        {% if current == page_obj.number %}
            <a href="/student/list?page={{ current }}"><b><font color="red">{{ current }}</font></b></a>
        {% else %}
            <a href="/student/list?page={{ current }}">{{ current }}</a>
        {% endif %}
        
    {% endfor %}
    {#是否有下一页#}
    {% if page_obj.has_next %}
        <a href="/student/list?page={{ page_obj.next_page_number }}">下一页</a>
    {% endif %}
{% endif %}


</body>
</html>
```

浏览器访问：`http://localhost:8000/student/list`

![](python(十).assets/2.png)



## 1.2、详细视图DetailView

DetailView多用于展示某一个具体数据对象的详细信息的页面。使用DetailView，你只需要指定要使用的模型和对象的唯一标识符，并可以自定义其他一些属性，例如模型名称、模板名称、上下文数据等。

以下是DetailView的一些常见属性和方法：

- model：指定要使用的模型
- queryset：指定要使用的查询集，用于获取对象。如果未指定，则将使用模型的默认查询集
- pk_url_kwarg：指定URL中用于获取对象的唯一标识符的参数名称，默认为`pk`。
- context_object_name：指定将对象传递给模板时的上下文变量名称，默认为`model`。
- template_name：指定要使用的模板的名称
- get_object(queryset=None)：获取要展示的对象。可以重写这个方法来自定义获取对象的逻辑
- get_context_data(kwargs)：返回要传递给模板的上下文数据。你可以重写这个方法来自定义上下文数据
- get()：处理GET请求的方法，根据配置的对象获取规则执行对象获取和展示逻辑
- dispatch(request, *args, **kwargs)：处理请求的入口方法，根据请求的不同方法（GET、POST等）执行相应的处理逻辑

通过继承DetailView，并根据自己的需求重写这些方法，你可以创建自定义的展示单个对象详细信息的视图，并实现你想要的功能。

总之，DetailView是Django框架中的一个便捷的通用视图，用于展示单个对象的详细信息，并提供了一些有用的属性和方法来简化对象展示逻辑。

通过重新设置model属性来指定需要获取的Model类，默认对象名称为object,也可以通过重新设置context_object_name属性来更改这个名字。

1. views.py 里新建 Detail，继承 DetailView

```python
class Detail(DetailView):
    # 设置模板文件
    template_name = 'student/detail.html'
    # 设置模型外的数据
    extra_context = {'title': '学生信息详情'}
    # 设置查询模型
    model = StudentInfo
    # 设置上下文对象名称
    context_object_name = 'student'
    # 指定URL中用于获取对象的唯一标识符的参数名称，默认为’pk’。
    # pk_url_kwarg = 'id'
```

2. urls.py 里面定义映射

```python
# DetailView详细信息视图
path('student/<int:pk>', Hello.views.Detail.as_view()),
```

3. 新建`student/detail.html`文件

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{ title }}</title>
</head>
<body>
<h3>{{ title }}</h3>
编号: {{ student.id }}
姓名: {{ student.name }}
年龄: {{ student.age }}
</body>
</html>
```

4. 在`list.html`里面加一个查看详情的操作项

![](python(十).assets/3.png)



![](python(十).assets/4.png)



![](python(十).assets/5.png)





## 1.3、新增视图CreateView

视图类CreateView是对模型新增数据的视图类，它是在表单视图类FormView 的基础上加以封装的。简单来说，就是在视图类FormView的基础上加入数据新增的功能。

> 所有涉及到表单视图的功能开发，都需要定义form表单类

1. 在Hello应用下新建forms.py，里面新建StudentForm

```python
from django import forms
from django.forms import ModelForm
from Hello.models import StudentInfo


# 定义学生form表单
class StudentForm(ModelForm):
    # 配置中心
    class Meta:
        model = StudentInfo  # 导入model
        # fields = '__all__' # 代表所有字段
        fields = ['name', 'age']  # 指定字段进行新增操作
        
        # 定义控件
        widgets = {
            # 给Input加个 id=name,class=inputClass
            'name': forms.TextInput(attrs={'id': 'name', 'class': 'inputClass'}),
            # 给Input加个 id=age
            'age': forms.NumberInput(attrs={'id': 'age'})
        }
        labels = {
            # 指定标签
            'name': '姓名',
            'age': '年龄'
        }
```

2. views.py里新建Create类，继承CreateView

```python
class Create(CreateView):
    # 设置模版文件
    template_name = 'student/create.html'
    # 设置模型外的数据
    extra_context = {'title': '学生信息添加'}
    # 指定form
    form_class = StudentForm
    # 执行成功后跳转地址
    success_url = '/student/list'
```

3. student目录下新建create.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{ title }}</title>
    <style>
        .inputClass {
        width: 200px;
        }
    </style>
</head>
<body>
<h3>{{ title }}</h3>
<form method="post">
    {% csrf_token %}
    {{ form.as_p }}
    <input type="submit" value="确定">
</form>
</body>
</html>
```

4. urls.py里加一个映射：

```python
# CreateView新增信息视图
path('student/create', Hello.views.Create.as_view()),
```

5. list.html页面，加一个新增学生链接

![](python(十).assets/6.png)





![](python(十).assets/7.png)













## 1.4、修改视图UpdateView

1. views.py里新建Update类，继承UpdateView

```python
class Update(UpdateView):
    # 设置模版文件
    template_name = 'student/update.html'
    # 设置模型外的数据
    extra_context = {'title': '学生信息修改'}
    # 设置查询模型
    model = StudentInfo
    # 指定form
    form_class = StudentForm
    # 执行成功后跳转地址
    success_url = '/student/list'
```

2. student目录下新建update.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{ title }}</title>
    <style>
        .inputClass {
            width: 200px;
        }
    </style>
</head>
<body>
<h3>{{ title }}</h3>
<form method="post">
    {% csrf_token %}
    {{ form.as_p }}
    <input type="submit" value="确定">
</form>
</body>
</html>
```

3. urls.py里加一个映射：

```python
# UpdateView修改信息视图
path('student/update/<int:pk>', Hello.views.Update.as_view()),
```

4. list.html里加一个修改链接

![](python(十).assets/8.png)



![](python(十).assets/9.png)





## 1.5、删除视图DeleteView

1. views.py里面，我们新建Delete类，继承DeleteView

```python
class Delete(DeleteView):
    # 设置模版文件
    template_name = 'student/delete.html'
    # 设置模型外的数据
    extra_context = {'title': '学生信息删除'}
    # 设置查询模型
    model = StudentInfo
    # 设置上下文对象名称
    context_object_name = 'student'
    # 执行成功后跳转地址
    success_url = '/student/list'
```

2. urls.py 里面加映射

```python
# DeleteView删除信息视图
path('student/delete/<int:pk>', Hello.views.Delete.as_view()),
```

3. student目录下新建delete.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{ title }}</title>
</head>
<body>
<h3>{{ title }}</h3>
<form method="post">
    {% csrf_token %}
    您确定更要删除 id:{{ student.id }} name:{{ student.name }} age:{{ student.age }} 的记录吗?
    <input type="submit" value="确定">
</form>
</body>
</html>
```

4. 在 list.html 里面新增删除链接

![](python(十).assets/10.png)





![](python(十).assets/11.png)













# 2、Django5模板引擎

Django 作为 Web框架，需要一种很便利的方法动态地生成HTML 网页，因此有了模板这个概念。模板包含所需HTML 的部分代码以及一些特殊语法，特殊语法用于描述如何将视图传递的数据动态插入HTML 网页中。

Django可以配置一个或多个模板引擎（甚至是0个，，如前后端分离，Django只提供API接口，无须使用模板引擎）。

模板引擎有Django模板语言（Django Template Language，DTL)和Jinja3。Django模板语言是Django 内置的功能之一，Jinja3是当前Python流行的模板语言。



## 2.1、Django5内置模板引擎

Django 内置的模板引擎包含模板上下文（亦可称为模板变量)、标签和过滤器，各个功能说明如下:

- 模板上下文是以变量的形式写入模板文件里面，变量值由视图函数或视图类传递所得。
- 标签是对模板上下文进行控制输出，比如模板上下文的判断和循环控制等。
- 模板继承隶属于标签，它是将每个模板文件重复的代码抽取出来并写在一个共用的模板文件中，其他模板文件通过继承共用模板文件来实现完整的网页输出
- 过滤器是对模板上下文进行操作处理，比如模板上下文的内容截取、替换或格式转换等。

### 2.1.1、模板上下文

模板上下文是模板中基本的组成单位，上下文的数据由视图函数或视图类传递。

- 它以`{{ variable }}`表示，variable是上下文的名称，它支持 Python 所有的数据类型，如字典、列表、元组、字符串、整型或实例化对象等。上下文的数据格式不同，在模板里的使用方式也有所差异。

使用变量的一些注意点：

- 当模板引擎遇到一个变量，将计算这个变量，然后输出结果
- 变量名必须由字母、数字、下划线、点组成，不能由数字和下划线开头
- 如果变量不存在，不会引发异常，模板会插入空字符串
- 在模板中使用变量或方法时，不能出现 ()、[]、{}
- 调用方法时，不能传递参数

**字符串示例：**

1. `views.py`中，`index`方法：

```python
def index(request):
    str = "秦闪闪"
    content_value = {"msg": str}
    return render(request, 'index.html',context=content_value)
```

2. index.html如下

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
字符串： {{ msg }} <br>
</body>
</html>
```

![](python(十).assets/12.png)



**字典示例：**

1. `views.py`中，`index`方法：

```python
def index(request):
    str = "秦闪闪"
    myDict = {"tom": "666", "cat": "999", "wzw": "333"}
    content_value = {"msg": str, "msg2": myDict}
    return render(request, 'index.html',context=content_value)
```

2. index.html如下

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
字符串： {{ msg }} <br>
字典类型：{{ msg2.tom }},{{ msg2.cat }},{{ msg2.wzw }}
</body>
</html>
```

![](python(十).assets/13.png)





**列表示例：**

1. `views.py`中，`index`方法：

```python
def index(request):
    # 字符串
    str = "秦闪闪"
    # 字典
    myDict = {"tom": "666", "cat": "999", "wzw": "333"}
    # 列表
    myList = ["java", "python", "c"]
    content_value = {"msg": str, "msg2": myDict, "msg3": myList}
    return render(request, 'index.html',context=content_value)
```

2. index.html如下

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
字符串： {{ msg }} <br>
字典类型：{{ msg2.tom }},{{ msg2.cat }},{{ msg2.wzw }}
列表：{{ msg3.0 }},{{ msg3.1 }},{{ msg3.2 }}
</body>
</html>
```

![](python(十).assets/14.png)





**元组示例**：

1. `views.py`中，`index`方法：

```python
def index(request):
    # 字符串
    str = "秦闪闪"
    # 字典
    myDict = {"tom": "666", "cat": "999", "wzw": "333"}
    # 列表
    myList = ["java", "python", "c"]
    # 元组
    myTuple = ("python", 222, 3.14, False)
    content_value = {"msg": str, "msg2": myDict, "msg3": myList, "msg4": myTuple}
    return render(request, 'index.html',context=content_value)
```

2. index.html如下

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
字符串： {{ msg }} <br>
字典类型：{{ msg2.tom }},{{ msg2.cat }},{{ msg2.wzw }}
列表：{{ msg3.0 }},{{ msg3.1 }},{{ msg3.2 }}
元组：{{ msg4.0 }},{{ msg4.1 }},{{ msg4.2 }},{{ msg4.3 }}
</body>
</html>
```

![](python(十).assets/15.png)



**对象示例：**



1. `views.py`中，`index`方法：

```python
def index(request):
    # 字符串
    str = "秦闪闪"
    # 字典
    myDict = {"tom": "666", "cat": "999", "wzw": "333"}
    # 列表
    myList = ["java", "python", "c"]
    # 元组
    myTuple = ("python", 222, 3.14, False)
    # 对象
    zhangsan = Person("张三",21)
    content_value = {"msg": str, "msg2": myDict, "msg3": myList, "msg4": myTuple, "msg5": zhangsan}
    return render(request, 'index.html', context=content_value)
```

2. index.html如下

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
字符串： {{ msg }} <br>
字典类型：{{ msg2.tom }},{{ msg2.cat }},{{ msg2.wzw }}
列表：{{ msg3.0 }},{{ msg3.1 }},{{ msg3.2 }}
元组：{{ msg4.0 }},{{ msg4.1 }},{{ msg4.2 }},{{ msg4.3 }}
对象：{{ msg5.name }},{{ msg5.age }}<br>
</body>
</html>
```

![](python(十).assets/16.png)

















### 2.1.2、模板标签

标签是对模板上下文进行控制输出，它是以`{% tag %}`表示的，其中 tag是标签的名称，Django内置了许多模板标签，比如`{% if %}` 判断标签、`{% for %}` 循环标签、`{% url %}` 路由标签等。

常用内置标签如下：

| 标签              | 描述                                             |
| ----------------- | ------------------------------------------------ |
| {% for %}         | 遍历输出上下文的内容                             |
| {% if %}          | 对上下文进行条件判断                             |
| {% csrf_token %}  | 生成csrf token的标签，用于防护跨站请求伪造攻击   |
| {% url %}         | 引用路由配置的地址，生成相应的路由地址           |
| {% with %}        | 将上下文名重新命名                               |
| {% load %}        | 加载导入 Django的标签库                          |
| {% static %}      | 读取静态资源的文件内容                           |
| {% extends xxx %} | 模板继承，xxx为模板文件名，使当前模板继承xxx模板 |
| {% block xxx %}   | 重写父类模板的代码                               |

在for标签中，模板还提供了一些特殊的变量来获取for标签的循环信息，变量说明如下：

| 变量                | 描述                                        |
| ------------------- | ------------------------------------------- |
| forloop.counter     | 获取当前循环的索引，从1开始计算             |
| forloop.counter0    | 获取当前循环的索引，从0开始计算             |
| forloop.revcounter  | 索引从最大数开始递减，直到索引到1位置       |
| forloop.revcounter0 | 索引从最大数开始递减，直到索引到0位置       |
| forloop.first       | 当遍历的元素为第一项时为真                  |
| forloop.last        | 当遍历的元素为最后一项时为真                |
| forloop.parentloop  | 在嵌套的for循环中，获取上层for循环的forloop |

**遍历for标签示例：**

1. 我们修改`index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
字符串： {{ msg }} <br>
字典类型：{{ msg2.tom }},{{ msg2.cat }},{{ msg2.wzw }}
列表：{{ msg3.0 }},{{ msg3.1 }},{{ msg3.2 }}
元组：{{ msg4.0 }},{{ msg4.1 }},{{ msg4.2 }},{{ msg4.3 }}
对象：{{ msg5.name }},{{ msg5.age }}<br>
    

<h3>模板标签</h3>
<p>遍历for标签</p>
{% for item in msg3 %}
    <p>这是第{{ forloop.counter }}次循环</p>
    {% if forloop.first %}
        <p>这是第一项: {{ item }}</p>
    {% elif forloop.last %}
        <p>这是最后一项: {{ item }}</p>
    {% endif %}
{% endfor %}
</body>
</html>
```

![](python(十).assets/17.png)



**判断if标签示例：**

1. 我们修改`index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
字符串： {{ msg }} <br>
字典类型：{{ msg2.tom }},{{ msg2.cat }},{{ msg2.wzw }}
列表：{{ msg3.0 }},{{ msg3.1 }},{{ msg3.2 }}
元组：{{ msg4.0 }},{{ msg4.1 }},{{ msg4.2 }},{{ msg4.3 }}
对象：{{ msg5.name }},{{ msg5.age }}<br>
    

<h3>模板标签</h3>
<p>遍历for标签</p>
{% for item in msg3 %}
    <p>这是第{{ forloop.counter }}次循环</p>
    {% if forloop.first %}
        <p>这是第一项: {{ item }}</p>
    {% elif forloop.last %}
        <p>这是最后一项: {{ item }}</p>
    {% endif %}
{% endfor %}
    
<br>
<p>判断if标签:</p>
{% if msg == "秦闪闪" %}
    <p>秦闪闪</p>
{% elif msg == "秦闪闪2" %}
    <p>秦闪闪2</p>
{% else %}
    <p>其他</p>
{% endif %}
    
    
</body>
</html>
```

![](python(十).assets/18.png)



**url标签示例：**

1. 我们修改`index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
字符串： {{ msg }} <br>
字典类型：{{ msg2.tom }},{{ msg2.cat }},{{ msg2.wzw }}
列表：{{ msg3.0 }},{{ msg3.1 }},{{ msg3.2 }}
元组：{{ msg4.0 }},{{ msg4.1 }},{{ msg4.2 }},{{ msg4.3 }}
对象：{{ msg5.name }},{{ msg5.age }}<br>
    

<h3>模板标签</h3>
<p>遍历for标签</p>
{% for item in msg3 %}
    <p>这是第{{ forloop.counter }}次循环</p>
    {% if forloop.first %}
        <p>这是第一项: {{ item }}</p>
    {% elif forloop.last %}
        <p>这是最后一项: {{ item }}</p>
    {% endif %}
{% endfor %}
    
<br>
<p>判断if标签:</p>
{% if msg == "秦闪闪" %}
    <p>秦闪闪</p>
{% elif msg == "秦闪闪2" %}
    <p>秦闪闪2</p>
{% else %}
    <p>其他</p>
{% endif %}
    
<br>
<p>url标签</p>
<a href="{% url 'index' %}">请求index</a>
    
</body>
</html>
```

用url标签的时候 第二个参数是路由名称，所以urls.py里，修改下：

```python
path('index/', Hello.views.index, name="index"),
```

![](python(十).assets/19.png)



**with标签示例：**

1. 我们修改`index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
字符串： {{ msg }} <br>
字典类型：{{ msg2.tom }},{{ msg2.cat }},{{ msg2.wzw }}
列表：{{ msg3.0 }},{{ msg3.1 }},{{ msg3.2 }}
元组：{{ msg4.0 }},{{ msg4.1 }},{{ msg4.2 }},{{ msg4.3 }}
对象：{{ msg5.name }},{{ msg5.age }}<br>
    

<h3>模板标签</h3>
<p>遍历for标签</p>
{% for item in msg3 %}
    <p>这是第{{ forloop.counter }}次循环</p>
    {% if forloop.first %}
        <p>这是第一项: {{ item }}</p>
    {% elif forloop.last %}
        <p>这是最后一项: {{ item }}</p>
    {% endif %}
{% endfor %}
    
<br>
<p>判断if标签:</p>
{% if msg == "秦闪闪" %}
    <p>秦闪闪</p>
{% elif msg == "秦闪闪2" %}
    <p>秦闪闪2</p>
{% else %}
    <p>其他</p>
{% endif %}
    
<br>
<p>url标签</p>
<a href="{% url 'index' %}">请求index</a>
 
<p>with标签</p>
{% with info=msg %}
    {{ info }}
{% endwith %}    
</body>
</html>
```

![](python(十).assets/20.png)





### 2.1.3、模板继承

Django模板继承是一个强大的工具，可以将通用页面元素（例如页眉、页脚、侧边栏等）分离出来，并在多个页面之间共享他们。

模板继承是 Django 模板语言中最强大的部分。模板继承使你可以构建基本的“骨架”模板，将通用的功能或者属性写在基础模板中，也叫基类模板或者父模板。子模板可以继承父类模板，子模板继承后将自动拥有父类中的属性和方法，我们还可以在子模板中对父模板进行重写，即重写父模板中方法或者属性，从而实现子模板的定制。模板继承大大提高了代码的可重用性，减轻开发人员的工作量。

在模板继承中最常用了标签就是 `{% block %}` 与 `{% extends %}` 标签，其中 `{% block% }` 标签与 `{% endblock %}` 标签成对出现



示例：

1. 新建一个基础模版base.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>
        {% block title %}
            秦闪闪的小窝
        {% endblock %}
    </title>
</head>
{#加载项目中的静态文件#}
{% load static %}
<body>
<div id="head">
    <img src="{% static 'JM.jpg' %}" alt="">
</div>
<div id="content">
    {% block content %}
        欢迎来到秦闪闪的小窝
    {% endblock %}
</div>

</body>
</html>
```

2. 再写一个course.html，继承base.html

```html
{% extends 'base.html' %}
<!-- 重写title -->
{% block title %}
    小林桑的小窝
{% endblock %}
<!-- 重写content -->
{% block content %}
    欢迎来到小林桑的小窝
{% endblock %}
```

3. views.py里新建一个to_course方法

```python
def to_course(request):
    return render(request,'course.html')
```

4. urls.py里加一个映射

```python
# 模板继承
path('toCourse/',Hello.views.to_course)
```

![](python(十).assets/21.png)







### 2.1.4、过滤器

过滤器的作用是可以对模板中的变量进行加工、过滤或格式化，返回一个新的值供模板使用。

过滤器作用是在变量输出时，对输出的变量值做进一步的处理。我们可以使用过滤器来更改变量的输出显示。

过滤器的语法格式如下：

> `{{ 变量 | 过滤器1:参数值1 | 过滤器2:参数值2 ... }}`

常用内置过滤器如下：

| 过滤器             | 说明                                                  |
| ------------------ | ----------------------------------------------------- |
| add                | 加法                                                  |
| addslashes         | 添加斜杠                                              |
| capfirst           | 首字母大写                                            |
| center             | 文本居中                                              |
| cut                | 切除字符                                              |
| date               | 日期格式化                                            |
| default            | 设置默认值                                            |
| default_if_none    | 为None设置默认值                                      |
| dictsort           | 字典排序                                              |
| dictsortreversed   | 字典反向排序                                          |
| divisibleby        | 整除判断                                              |
| escape             | 转义                                                  |
| escapejs           | 转义js代码                                            |
| filesizeformat     | 文件尺寸人性化显示                                    |
| first              | 第一个元素                                            |
| floatformat        | 浮点数格式化                                          |
| force_escape       | 强制立刻转义                                          |
| get_digit          | 获取数字                                              |
| iriencode          | 转换IRI                                               |
| join               | 字符列表链接                                          |
| last               | 最后一个                                              |
| length             | 长度                                                  |
| length_is          | 长度等于                                              |
| linebreaks         | 行转换                                                |
| linebreaksbr       | 行转换                                                |
| linenumbers        | 行号                                                  |
| ljust              | 左对齐                                                |
| lower              | 小写                                                  |
| make_list          | 分割成字符列表                                        |
| phone2numeric      | 电话号码                                              |
| pluralize          | 复数形式                                              |
| pprint             | 调试                                                  |
| random             | 随机获取                                              |
| rjust              | 右对齐                                                |
| safe               | 安全确认                                              |
| safeseq            | 列表安全确认                                          |
| slice              | 切片                                                  |
| slugify            | 转换成ASCII                                           |
| stringformat       | 字符串格式化                                          |
| striptags          | 去除HTML中的标签                                      |
| time               | 时间格式化                                            |
| timesince          | 从何时开始                                            |
| timeuntil          | 到何时多久                                            |
| title              | 所有单词首字母大写                                    |
| truncatechars      | 截断字符                                              |
| truncatechars_html | 截断字符                                              |
| truncatewords      | 截断单词                                              |
| truncatewords_html | 截断单词                                              |
| unordered_list     | 无序列表                                              |
| upper              | 大写                                                  |
| urlencode          | 转义url                                               |
| urlize             | url转成可点击的链接                                   |
| urlizetrunc        | urlize的截断方式                                      |
| wordcount          | 单词计数                                              |
| wordwrap           | 单词包裹                                              |
| yesno              | 将True，False和None，映射成字符串‘yes’，‘no’，‘maybe’ |

示例：

1. 修改`views.py`的index函数，增加date

```python
def index(request):
    # 字符串
    str = "qinshanshan"
    # 时间
    date = datetime.datetime.now()
    # 字典
    myDict = {"tom": "666", "cat": "999", "wzw": "333"}
    # 列表
    myList = ["java", "python", "c"]
    # 元组
    myTuple = ("python", 222, 3.14, False)
    # 对象
    zhangsan = Person("张三",21)
    content_value = {"msg": str, "msg2": myDict, "msg3": myList, "msg4": myTuple, "msg5": zhangsan,"date": date}
    return render(request, 'index.html', context=content_value)
```

2. `index.html`如下：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

<p>内置过滤器</p>
首字母大写capfirst: {{ msg | capfirst  }}<br>
文本长度:{{ msg | length }}<br>
时间格式化:{{ date }} -> {{ date | date:'Y-m-d H:i:s' }}

</body>
</html>
```

![](python(十).assets/22.png)













## 2.2、Jinja3模板引擎

Jinja(精价)是Python里面被广泛应用的模板引擎， 它的设计思想来源于Django的模板引擎，并扩展了其语法和一系列强大的功能。其中最显著的是增加了沙箱执行功能和可选的自动转义功能，这对大多数应用的安全性来说是非常重要。此外，它还具备以下特性:

- 沙箱执行模式，模板的每个部分都在引擎的监督之下执行，模板将会被明确地标记在白名单或黑名单内，这样对于那些不信任的模板也可以执行
- 强大的自动HTML转义系统，可以有效地阻止跨站脚本攻击
- 模板继承机制，此机制可以使得所有模板具有相似一致的布局，也方便开发人员对模板进行修改和管理
- 高效的执行效率，Jinja3引擎在模板第一次加载时就把源码转换成Python字节码，加快模板执行时间
- 语法配置，可以重新配置Jinja3，使得它更好地适应LaTeX或JavaScript 的输出。

> 官方文档：https://jinja.palletsprojects.com/en/3.1.x/

### 2.2.1、Jinja3的安装与配置

```bash
pip install Jinja2 -i https://pypi.tuna.tsinghua.edu.cn/simple
```

![](python(十).assets/23.png)

Jinja3安装成功后，接着在 Django里配置Jinja3模板。由于 Django的内置功能是使用 Django的模板引擎，如果将整个项目都改为Jinja3模板引擎，就会导致内置功能无法正常使用。在这种情况下，既要保证内置功能能够正常使用,又要使用Jinja3模板引擎，只能将两个模板引擎共存在同一个项目里。

1. 首先我们在Hello应用下新建`Jinja3.py`，用来定义环境参数；

```python
from django.contrib.staticfiles.storage import staticfiles_storage
from django.urls import reverse
from jinja2 import Environment

def environment(**options):
    env = Environment(**options)
    env.globals.update(
        {
            'static': staticfiles_storage.url,
            'url': reverse
        }
    )
    return env
```

2. 然后在项目的配置文件`settings.py`

```python
# 模板配置
TEMPLATES = [
    # JinJa3的配置
    {
        'BACKEND': 'django.template.backends.jinja2.Jinja2',
        'DIRS': [BASE_DIR / 'templates']
        ,
        'APP_DIRS': True,
        'OPTIONS': {
            'environment': 'Hello.Jinja3.environment'
        },
    },

    # Django的内置配置
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates']
        ,
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
```

3. 在views.py新建方法

```python
def jinja(request):
    # 字符串
    str = "qinshanshan"
    # 时间
    date = datetime.datetime.now()
    # 字典
    myDict = {"tom": "666", "cat": "999", "wzw": "333"}
    # 列表
    myList = ["java", "python", "c"]
    # 元组
    myTuple = ("python", 222, 3.14, False)
    # 对象
    zhangsan = Person("张三",21)
    content_value = {"msg": str, "msg2": myDict, "msg3": myList, "msg4": myTuple, "msg5": zhangsan,"date": date}
    return render(request, 'jinja.html', context=content_value)
```

4. urls.py里面定义映射

```python
# jinja3
path('jinja/', Hello.views.jinja),
```

5. 新建`jinja.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
字符串： {{ msg }} <br>
字典类型：{{ msg2.tom }},{{ msg2.cat }},{{ msg2.wzw }}<br>
列表：{{ msg3.0 }},{{ msg3.1 }},{{ msg3.2 }}<br>
元组：{{ msg4.0 }},{{ msg4.1 }},{{ msg4.2 }},{{ msg4.3 }}<br>
对象：{{ msg5.name }},{{ msg5.age }}<br>

<h3>模板标签</h3>
<p>遍历for标签</p>
{% for item in msg3 %}
    {# Django里面是forloop,Jinja3里面是loop   #}
    <p>这是第{{ loop.counter }}次循环</p>
    {% if loop.first %}
        <p>这是第一项: {{ item }}</p>
    {% elif loop.last %}
        <p>这是最后一项: {{ item }}</p>
    {% endif %}
{% endfor %}

<br>
<p>判断if标签:</p>
{% if msg == "秦闪闪" %}
    <p>秦闪闪</p>
{% elif msg == "秦闪闪2" %}
    <p>秦闪闪2</p>
{% else %}
    <p>其他</p>
{% endif %}

<br>
<p>url标签</p>

{#Django写法#}
{#<a href="{% url 'index' %}">请求index</a>#}
{#JinJa3写法#}
<a href="{{ url('index') }}">请求index</a>

<p>with标签</p>
{% with info=msg %}
    {{ info }}
{% endwith %}


</body>
</html>
```

- 在遍历对象，列表，元组的时候，假如元素或者属性不存在，Jinja3会返回具体的报错信息：no such element
- url函数用法不一样
- 在遍历for标签上，属性页不一样，JinJa3内置的对象是loop
- **JinJa3不支持load**，如下：

```html
{# Django5写法如下,但是JinJa3不支持 #}
{% load static %}

<div id="head">
{# Django语法 #}
{# <img src="{% static 'logo.png' %}"/>#}
{# Jinja3语法 #}
<img src="{{ static('logo.png') }}"/>
</div>
```







### 2.2.2、Jinja3过滤器

Jinja3的过滤器与 Django内置过滤器的使用方法有相似之处，也是由管道符号`|`连接模板上下文和过滤器，但是两者的过滤器名称是不同的，而且过滤器的参数设置方式也不同。Jinja3常用过滤器如下表格：

| 过滤器    | 说明                           |
| --------- | ------------------------------ |
| abs       | 设置数值的绝对值               |
| default   | 设置默认值                     |
| escape    | 转义字符，转成HTML语法         |
| first     | 获取上下文的第一个元素         |
| last      | 获取上下文的最后一个元素       |
| length    | 获取上下文的长度               |
| join      | 功能与Python的join语法一致     |
| safe      | 将上下文转义处理               |
| int       | 将上下文转换为int类型          |
| float     | 将上下文转换为float类型        |
| lower     | 将字符串转换为小写             |
| upper     | 将字符串转换为大写             |
| replace   | 字符串的替换                   |
| truncate  | 字符串的截断                   |
| striptags | 删除字符串中所有的HTML标签     |
| trim      | 截取字符串前面和后面的空白字符 |
| string    | 将上下文转换成字符串           |
| wordcount | 计算长字符串的单词个数         |

示例：

```html
<p>Jinja3过滤器</p>
first: {{ msg | first }}<br>
last:{{ msg | last }}<br>
length:{{ msg | length }}<br>
upper:{{ msg | upper }}
```



















