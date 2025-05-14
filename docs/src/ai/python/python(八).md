# 1、Django5

## 1.1、安装

```python
pip install Django -i https://pypi.tuna.tsinghua.edu.cn/simple
```

- `python -m django --version` 查看版本



## 1.2、创建Diango项目

![](python(八).assets/1.png)



这里介绍下默认创建的文件:

- `manage.py` :项目管理命令行工具，内置多种方式与项目进行交互，包括启动项目，创建app，数据管理等。
- `__init__.py `:初始化文件（不用修改）
- `settings.py`:项目的配置文件，项目的所有功能都需要在该文件中进行配置
- `urls.py`:项目的路由设置，设置网站的具体网址内容
- `wsgi.py`:用于Diango项目在服务器上的部署和上线（不用修改）
- `asgi.py`:开启⼀个ASGI服务，ASGI是异步⽹关协议接口（不用修改）





## 1.3、创建Hello应用

上面我们创建的是一个项目，一个项目是由一个或者多个应用组成，我们一般一个项目里面就创建一个应用。所以接下来我们创建`Hello`应用：

1. 点击工具 - 运行 manage.py 任务

![](python(八).assets/2.png)

2. 创建Hello应用：`startapp Hello`

![](python(八).assets/3.png)



3. **注册应用到项目的**`settings.py`：执行完毕后，目录会多出一个 Hello 目录，我们把 Hello 应用的 `apps.py`里的HelloworldConfig类注册到 `settings.py` 里面去

![](python(八).assets/4.png)





4. **编写模版网页代码**：在templates目录下，新建 `index.html`文件，编写模板网页代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<h1>Django！</h1>
</body>
</html>
```

5. **编写视图处理请求层代码**：在`Hello`应用的`views.py`里面编写`index`方法，request是客户端请求对象,render是渲染方法，可以携带数据渲染到指定页面

```python
from django.shortcuts import render


# Create your views here.

def index(request):
    return render(request, 'index.html')
```

6. **编写请求映射函数配置**：在项目的 `urls.py` 里编写应用的`index/`请求，也就是写一个映射关系代码

```python

from django.contrib import admin
from django.urls import path

import Hello.views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('index/', Hello.views.index,

]
```

![](python(八).assets/5.png)



7. 启动项目，`runserver`

![](python(八).assets/6.png)



当然我们可以直接使用PyCharm的右上方小绿三角形运行，然后访问`localhost:8000/index/`

![](python(八).assets/7.png)



执行过程：客户端请求 `index/` ，经过 diango url 请求分发器，执行到应用的 views.py 的 index 方法，index 方法再 render 渲染到 index.html 模板代码 ， 最终显示到用户浏览器终端。



## 1.4、Diango5操作命令

在工具 - > 运行 `manage.py` 里面可以运行Diango5的操作命令：

| 指令                      | 说明                                                         |
| ------------------------- | ------------------------------------------------------------ |
| changepassword            | 修改内置用户表的用户密码                                     |
| createsuperuser           | 为内置用户表创建超级管理员账号                               |
| remove_stale_contenttypes | 删除数据库中已不使用的数据表                                 |
| check                     | 检测整个项目是否存在异常问题                                 |
| compilemessages           | 编译语言文件，用于项目的区域语言设置                         |
| createcachetable          | 创建缓存数据表，为内置的缓存机制提供存储功能                 |
| dbshell                   | 进入Django配置的数据库，可以执行数据库的SOL语句              |
| diffsettings              | 显示当前settings.py的配置信息与默认配置的差异                |
| dumpdata                  | 导出数据表的数据并以JSON格式存储<br>如`python manage.py dumpdata index > data.json` <br>这是index的模型所对应的数据导出，并保存在 data.json文件中 |
| loaddata                  | 将数据文件导入数据表<br>如`python manage.py loaddatadata.json` |
| makemessages              | 创建语言文件，用于项目的区域语言设置                         |
| makemigrations            | 从模型对象创建数据迁移文件并保存在App 的migrations文件夹     |
| migrate                   | 根据迁移文件的内容，在数据库里生成相应的数据表               |
| sendtestemail             | 向指定的收件人发送测试的电子邮件                             |
| shell                     | 进入Django的Shell模式,用于调试项目功能                       |
| showmigrations            | 查看当前项目的所有迁移文件                                   |
| sqlflush                  | 查看清空数据库的SOL语句脚本                                  |
| sqlmigrate                | 根据迁移文件内容输出相应的SQL语句                            |
| sqlsequencereset          | 重置数据表递增字段的索引值                                   |
| squashmigrations          | 对迁移文件进行压缩处理                                       |
| startapp                  | 创建项目应用App                                              |
| optimizemigration         | 允许优化迁移操作                                             |
| startproject              | 创建新的Django项目                                           |
| test                      | 运行App里面的测试程序                                        |
| testserver                | 新建测试数据库并使用该数据库运行项目                         |
| clearsessions             | 清除会话Session数据                                          |
| collectstatic             | 收集所有的静态文件                                           |
| findstatic                | 查找静态文件的路径信息                                       |
| runserver                 | 在本地计算机上启动Django项目                                 |

或者终端直接执行`python manage.py 命令`







# 2、Django5应用配置

## 2.1、MTV模型

Django的MTV分别代表：

- Model：模型，业务对象与数据库的对象ORM
- Template：模板，负责如何把页面展示给用户
- View：视图，负责业务逻辑，并在适当的时候调用 Model 和 Template

此外，Django还有一个urls分发器，它的作用是将一个URI的页面请求分发给不同的view处理，view 再调用响应的Model和Template。Django WEB框架示意图如下：

![](python(八).assets/8.png)





## 2.2、应用结构

我们上面生成的`Hello`应用的结构如下：

![](python(八).assets/9.png)



- `__init__.py` ： 说明目录是一个 python 模块
- `migrations.py` ： 用于存放数据库迁移历史文件
- `models.py`：用于应用操作数据库的模型
- `views.py`：用于编写Web应用视图，接收数据，处理数据，与 Model、Template 进行交互，返回应答
- `apps.py`：应用配置文件
- `tests.py`：做单元测试
- `admin.py`：默认提供了`admin`后台管理，用作网站的后台管理站点配置相关



## 2.3、settings.py文件

Django 的配置文件 settings.py用于配置整个网站的环境和功能，核心配置必须有项目路径、密钥配置、域名访问权限、App列表、中间件、资源文件、模板配置、数据库的连接方式。



### 2.3.1、基本配置

```python
from pathlib import Path
# 项目路径
# 主要通过os模块读取当前项目在计算机系统的具体路径，该代码在创建项目时自动生成，一般情况下无须修改。
BASE_DIR = Path(__file__).resolve().parent.parent

# 安全密钥:密钥配置在项目创建的时候自动生成，一般无需修改
SECRET_KEY = 'django-insecure-p=^w0j*^pr=0g64z-s=h8#!ueik(p7snq2p-u0tc__%2rvp0n$'

# 调试模式:如果在开发调试阶段，那么应设置为True，会自动检测代码是否发生更改，根据检测结果执行是否刷新重启系统。项目部署上线则应将其改为False
DEBUG = True

# 域名访问权限:设置可访问的域名,默认值为空列表。
# 当DEBUG为True并且ALLOWED_HOSTS为空列表时，项目只允许以localhost或127.0.0.1在浏览器上访问
# 当DEBUG为False时,ALLOWED_HOSTS为必填项项，否则程序无法启动，
# 如果想允许所有域名访问，可设置ALLOW_HOSTS=['*']
ALLOWED_HOSTS = []

# APP列表：告诉Django有哪些App
# 在项目创建时已有admin、auth和sessions等配置信息，这些都是Django内置的应用功能，各个功能说明如下。
# 1. admin:内置的后台管理系统。
# 2. auth:内置的用户认证系统。
# 3. contenttypes:记录项目中所有model元数据( Django 的ORM框架)
# 4. sessions: Session会话功能，用于标识当前访问网站的用户身份，记录相关用户信息
# 5. messages:消息提示功能
# 6. staticfiles:查找静态资源路径。
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'Hello.apps.HelloConfig'

]
```



### 2.3.2、资源文件配置

资源文件配置分为静态资源和媒体资源。

- 静态资源的配置方式由配置属性STATIC_URL、STATICFILES_DIRS和STATIC_ROOT进行设置
- 媒体资源的配置方式由配置属性MEDIA_URL和MEDIA ROOT决定

#### 1、静态资源配置STATIC_URL

静态资源指的是网站中不会改变的文件。在一般的应用程序中，静态资源包括CSS文件、JavaScript文件以及图片等资源文件。

> 默认配置，app下的static目录为静态资源，可以直接访问。其他目录不行。

```python
# 应用静态资源(包括css、js等)
STATIC_URL = 'static/'
```

- 在`Hello`应用下放一个`static/profile.jpg`的文件
- 访问`localhost:8000/static.profile.jpg`

![](python(八).assets/13.png)

![](python(八).assets/10.png)







#### 2、项目静态资源配置STATICFILES_DIRS

`STATICFILES_DIRS`是用于设置Django项目中存放**静态文件的共用目录**（可以理解为在项目目录下的静态资源，应用目录下也可以访问），这使得Django在查找静态文件时，会首先到这个共用目录里进行查找。如果在这个目录中没有找到所需的文件，Django会继续在STATIC_ROOT设置的目录中进行查找。

```python
# 项目静态资源(公共静态资源)
STATICFILES_DIRS = [BASE_DIR / 'static',BASE_DIR / 'images']
```

- 在`KuangStudy_PyDiango`应用根下放一个`static/JM.jpg`的文件
- 访问`localhost:8000/static.JM.jpg`

![](python(八).assets/11.png)



![](python(八).assets/12.png)











#### 3、静态资源部署配置STATIC_ROOT

静态资源配置还有STATIC_ROOT，其作用是在服务器上部署项目，实现服务器和项目之间的映射。

- STATIC_ROOT 主要收集整个项目的静态资源并存放在一个新的文件夹，然后由该文件夹与服务器之间构建映射关系。STATIC_ROOT配置如下:

```python
# 静态资源部署
STATIC_ROOT = BASE_DIR / 'static'
```

- 当项目的配置属性 DEBUG 设为True的时候，Django 会自动提供静态文件代理服务，此时整个项目处于开发阶段，因此无须使用STATIC_ROOT。
- 当配置属性DEBUG 设为False的时候，意味着项目进入生产环境，Django不再提供静态文件代理服务，此时需要在项目的配置文件中设置STATIC_ROOT。
- 设置STATIC_ROOT需要使用 Django操作指令collectstatic来收集所有静态资源，这些静态资源都会保存在STATIC_ROOT所设置的文件夹里。





#### 4、媒体资源配置MEDIA

一般情况下，`STATIC_URL`是设置静态文件的路由地址，如CSS样式文件、JavaScript文件以及常用图片等。对于一些经常变动的资源，通常将其存放在媒体资源文件夹，如用户头像、歌曲文件等。

媒体资源和静态资源是可以同时存在的，而且两者可以独立运行，互不影响，而媒体资源只需配置属性`MEDIA_URL`和`MEDIA_ROOT`

1. 在项目根目录下放入`media/login-background.jpg`

![](python(八).assets/14.png)

2. 后在配置文件settings.py里设置配置属性`MEDIA_URL`和`MEDIA_ROOT`
   - `MEDIA_URL`用于设置媒体资源的路由地址
   - `MEDIA_ROOT`用于获取 media文件夹在计算机系统的完整路径信息

```python
# 设置媒体路由
MEDIA_URL = 'media/'
# 设置media目录的完整路径
MEDIA_ROOT = BASE_DIR / 'media'
```

3. 配置属性设置后，还需要将media文件夹注册到 Django里，让 Django知道如何找到媒体文件，否则无法在浏览器上访问该文件夹的文件信息。

   打开项目文件夹的`urls.py`文件，为媒体文件夹media添加相应的路由地址，代码如下:

```python
from django.conf import settings
from django.contrib import admin
from django.urls import path, re_path
from django.views.static import serve

import Hello.views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('index/', Hello.views.index),
    # 配置媒体文件的路由地址
    re_path('media/(?P<path>.*)', serve, {'document_root': settings.MEDIA_ROOT}, name='media')

]
```

访问`localhos:8000/media/login-background.jpg`

![](python(八).assets/15.png)







#### 5、模板配置

在 Web开发中，模板是一种较为特殊的HTML文档。这个HTML文档嵌入了一些能够让Django识别的变量和指令，然后由Django的模板引擎解析这些变量和指令，生成完整的HTML网页并返回给用户浏览。

模板是Django里面的MTV框架模式的T部分，配置模板路径是告诉Django在解析模板时，如何找到模板所在的位置。创建项目时，Django已有初始的模板配置信息，`settings.py`里面如下所示:

```python
# 模板配置
TEMPLATES = [
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

模板配置是以列表格式呈现的，每个元素具有不同的含义，其含义说明如下。

- `BACKEND`:定义模板引擎，用于识别模板里面的变量和指令。内置的模板引擎有 DjangoTemplates和 jinja2.Jinja2，每个模板引擎都有自己的变量和指令语法。
- `DIRS`::设置模板所在路径，告诉Django在哪个地方查找模板的位置，默认为空列表。
- `APP_DIRS`:是否在App里查找模板文件。
- `OPTIONS`:用于填充在RequestContext 的上下文（模板里面的变量和指令)，一般情况下不做任何修改。





#### 6、数据库配置

数据库配置是选择项目所使用的数据库的类型，不同的数据库需要设置不同的数据库引擎，数据库引擎用于实现项目与数据库的连接，Django提供4种数据库引擎:

- `django.db.backends.postgresql`
- `django.db.backends.mysql`
- `django.db.backends.sqlite3`
- `django.db.backends.oracle`

项目创建时默认使用Sqlite3数据库，这是一款轻型的数据库，常用于嵌入式系统开发，而且占用的资源非常少。Sqlite3数据库配置信息如下:

```python
# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```

如果要把上述的连接信息改成MySQL数据库，首先需要安装MySQL连接模块 mysqlclient

```bash
pip install mysqlclient -i https://pypi.tuna.tsinghua.edu.cn/simple
```

mysqlclient模块安装后，在项目的配置文件settings.py中配置MySQL数据库连接信息

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'kuangstudy_pydjango',
        'USER': 'root',
        'PASSWORD': '123456',
        'HOST': 'localhost',
        'PORT': '3306'
    }
}
```

> django5至少需要MySQL 8.0.11版本

我们首先在 Navicat 里面创建数据库`kuangstudy_pydjango`,然后我们用Django5 manage.py 提供的内置命令 `migrate` 来创建Django内置功能的数据表

![](python(八).assets/16.png)

![](python(八).assets/17.png)

这些是Django内置自带的Admin后台管理系统，Auth用户系统以及会话机制等功能需要用到的表。





#### 7、中间件

中间件(Middleware）是一个用来处理 Django 的请求(Request）和响应（Response）的框架级别的钩子，它是一个轻量、低级别的插件系统，用于在全局范围内改变 Django的输入和输出。

- 当用户在网站中进行某个操作时，这个过程是用户向网站发送HTTP请求(Request);
- 而网站会根据用户的操作返回相关的网页内容，这个过程称为响应处理(Response)
- 从请求到响应的过程中，当 Django接收到用户请求时，首先经过中间件处理请求信息，执行相关的处理，然后将处理结果返回给用户。

Django默认的中间件配置如下:

```python
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
```

django自带的中间件有：

- SecurityMiddleware:内置的安全机制，保护用户与网站的通信安全。
- SessionMiddleware:会话Session功能。
- LocaleMiddleware:国际化和本地化功能。
- CommonMiddleware:处理请求信息，规范化请求内容。
- CsrfViewMiddleware:开启CSRF防护功能。
- AuthenticationMiddleware:开启内置的用户认证系统。
- MessageMiddleware:开启内置的信息提示功能。
- XFrameOptionsMiddleware:防止恶意程序单击劫持。







#### 8、其他配置

还有一些其他settings.py配置我们了解下

```python
# 它指定了当前项目的根 URL，是 Django 路由系统的入口。
ROOT_URLCONF = 'KuangStudy_PyDiango.urls'

# 项目部署时，Django 的内置服务器将使用的 WSGI 应用程序对象的完整 Python 路径。
WSGI_APPLICATION = 'KuangStudy_PyDiango.wsgi.application'

#  这是一个支持插拔的密码验证器，且可以一次性配置多个，Django通过这些内置组件来避免用户设置的密码等级不足的问题
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# 语言配置项 LANGUAGE_CODE 取值是英文：'en-us'或者中文：'zh-Hans'；
LANGUAGE_CODE = 'en-us'
# 和当前服务端时区的配置项 TIME_ZONE 取值是世界时区 'UTC' 或中国时区 'Asia/Shanghai'。
TIME_ZONE = 'UTC'

# 项目开发完成后，可以选择向不同国家的用户提供服务，那么就需要支持国际化和本地化。
USE_I18N = True
# USE_TZ = True 它指对时区的处理方式，当设置为 True 的时候，存储到数据库的时间是世界时间'UTC'。
USE_TZ = True

# 默认主键自增类型
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
```





# 3、路由配置

一个完整的路由包含:路由地址、视图函数（或者视图类)、可选变量和路由命名。

路由称为URL ，互联网上的每个文件都有一个唯一的路由，用于指出网站文件的路径位置。路由可视为我们常说的网址，每个网址代表不同的网页。

我们前面的`Hello`应用，请求的地址是：`http://127.0.0.1:8000/index/`

`index/`请求地址，根据项目`urls.py`配置文件，找到对应的`Hello views`下的`index`视图函数

![](python(八).assets/18.png)



![](python(八).assets/19.png)



然后最终执行index视图函数，然后到index.html页面。

![](python(八).assets/20.png)



## 3.1、Django5路由变量

在平时开发中，有时候一个路由可以代表多个不同的页面，比如博客系统里面，有1千个博客页面，按照前面学习的方式，需要写1千个路由才能实现，这种做法显然不可取，维护也麻烦。我们可以通过路由变量，来实现一个路由代表多个页面。

路由的变量类型有字符类型、整型、slug 和 uuid，最为常用的是字符类型和整型。各个类型说明如下。

- **字符类型**:匹配任何非空字符串，但不含斜杠。如果没有指定类型，就默认使用该类型
- **整型**:匹配0和正整数
- **slug:**可理解为注释、后缀或附属等概念，常作为路由的解释性字符。可匹配任何ASCII字符以及连接符和下画线，能使路由更加清晰易懂。比如网页的标题是“15岁的孩子”，其路由地址可以设置为"15-sui-de-hai-zi"
- **uuid**:匹配一个uuid格式的对象。为了防止冲突，规定必须使用并且所有字母必须小写，例如:175194d3-6885-437e-a8a8-6c231e272f00

### 3.1.1、博客示例

1. 首先在项目的 `urls.py` 里定义路由映射：

```python
# 配置博客路由变量
path('blog/<int:id>',Hello.views.blog),
```

2. `views.py`里面再定义blog函数实现

```python
def blog(request, id):
    return HttpResponse("id是" + str(id) + "的博客页面")
```

3. 访问：`http://localhost:8000/blog/1` 、`http://localhost:8000/blog/8`

![](python(八).assets/21.png)

![](python(八).assets/22.png)





这样，我们就实现了一个带变量的路由的多个博客页面的实现。当然我们也可以带多个路由变量。让博客的路由地址，再带上年月日变量。

1. 修改在项目的 `urls.py` 里的路由映射：

```python
# 配置博客路由变量
path('blog/<int:id>/<int:year>/<int:month>/<int:day>',Hello.views.blog),
```

2. `views.py`里面再修改blog函数实现

```python
def blog(request, id, year, month, day):
    return HttpResponse("id是" + str(id) + '/' + str(year) + '/' + str(day) + '/' + str(month) + '/' + "的博客页面")
```

3. 访问：`http://localhost:8000/blog/8/2024/4/30`

![](python(八).assets/23.png)







## 3.2、Django5正则路由

有时候我们为了更好的进行路由匹配，可以用正则表达式。比如前面讲的日期的路由变量，其实是有点问题的。我们月份输入333，也是满足条件的。但是不符合实际，实际情况月份最多两位数。所以这时候，我们可以用正则表达式来限制。

1. 修改在项目的 `urls.py` 里的路由映射：

```python
# 正则路由
re_path('blogs/(?P<year>[0-9]{4})/(?P<month>[0-9]{2})/(?P<day>[0-9]{2})', Hello.views.blogs),
```

2. `views.py`里面再增加blogs函数实现

```python
# 正则路由
def blogs(request, year, month, day):
    return HttpResponse(str(year) + '/' + str(month) + '/' + str(day) + '的博客页面')
```

- 注意：正则urls匹配，必须用`re_path`方法

- 注意：正则表达式`?P`开头是固定格式

3. 访问：`http://localhost:8000/blogs/2024/04/30`

![](python(八).assets/24.png)





## 3.3、网页重定向

重定向称为HTTP协议重定向，也可以称为网页跳转，它对应的HTTP状态码为301、302、303、307、308。简单来说，网页重定向就是在浏览器访问某个网页的时候，这个网页不提供响应内容，而是自动跳转到其他网址，由其他网址来生成响应内容。

Django的网页重定向有两种方式:

- 第一种方式是**路由重定向**：是使用Django内置的视图类RedirectView实现的，默认支持HTTP的GET请求
- 第二种方式是**自定义视图的重定向**：在自定义视图的响应状态设置重定向，能让开发者实现多方面的开发需求

### 3.3.1、路由重定向

路由重定向方式，我们用`RedirectView`实现，在`urls.py`里面，我们再加一个路由代码

```python
# 路由重定向（请求redirectTo，直接重定向到 index/ 地址）
path('redirectTo', RedirectView.as_view(url="index/")),
```

访问：`localhost:8000/redirectTo`，会重定向到`index/`地址



![](python(八).assets/25.png)







### 3.3.2、自定义视图重定向

更多的情况，我们平时开发用的是自定义视图重定向，视图代码里，通过逻辑判断，通过redirect方法来实现具体的页面重定向，使用更加灵活。

1. 我们改造下前面的views.py下的blog函数：假如id是0，重定向到错误静态页面

```python
def blog(request, id, year, month, day):
    if id == 0:
        return redirect("/static/error.html")
    else:
        return HttpResponse("id是" + str(id) + '/' + str(year) + '/' + str(month) + '/' + str(day) + '/' + "的博客页面")
```

2. 在项目 static 目录下新建一个`error.html`文件

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<h1>错误页面！</h1>
</body>
</html>
```

> 当然你也可以项目根目录下再新建一个目录，比如common,然后 `STATICFILES_DIRS` 静态资源文件集合里假如 `BASE_DIR/'common'`,然后把 error.html 放到 common 目录下，总之都可以啦，这条Tips可略过...

3. 访问：`localhost:8000/blog/0/2024/4/30`

![](python(八).assets/26.png)



302状态，自动跳转到了error.html错误页面



![](python(八).assets/27.png)





# 4、命名空间namespace

当我们网站项目规模越来越多，子项目很多的时候，为了方便管理路由地址，我们可以采用命名空间namespace来对路由地址根据子项目分类。

我们通过django manage.py自带的startapp命令新建两个项目，分别是user和order

- `startapp user`
- `startapp order`

因为我们要让子项目自己去处理映射，所以在 user 应用下新建`urls.py`，order 应用下新建`urls.py`

- user 应用下的`urls.py`如下

```python
from django.contrib import admin
from django.urls import path
from user import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('index/', views.index),
]
```

- user 应用下的`views.py`如下

```python
def index(request):
    return HttpResponse("用户信息")
```

- order 应用下的`urls.py`如下

```python
from django.contrib import admin
from django.urls import path
from order import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('index/', views.index),
    path('list/', views.list),
]
```

- oredr 应用下的`views.py`如下

```python
def index(request):
    return HttpResponse("订单信息")


def list(request):
    return HttpResponse("订单列表")
```

- 接下来在主项目里的`urls.py`添加映射

```python
# 命名空间namespace
path('user/',include(('user.urls','user'),namespace='user')),
path('order/',include(('order.urls','order'),namespace='order'))
```

> - `include(('user.urls','user')` ：相当于找到user项目的urls.py文件
> - `namespace='user'`：给这个映射取名是user，一般是根据项目名称来取
> - 第一个参数标识`user/`开头的请求，都由user项目的urls.py去管理处理映射关系

这样就可以自己访问：`localohost:8000/user/admin/`、`localohost:8000/user/index/`、``localohost:8000/order/admin/``、`localohost:8000/order/index/`、`localohost:8000/order/list/` 试试啦

> 了解一下命名空间就好啦，不用深入







# 5、Django路由命名与反向解析

我们在`urls.py`里定义的路由信息，有时候需要动态获取路由信息，然后进行一些处理，统计，日志等操作，这时候我们需要在其他代码里用到路由信息，比如views.py、Admin系统等，因此我们引入路由反向解析reverse与resolve方法，在使用这两个方法前，我们还需要给路由取名，否则我们无法找到我们需要的那个路由的信息。

- **reverse方法根据路由名称得到路由地址**
- **resolve方法根据路由地址得到路由所有信息**

在order项目的urls.py里，我们对index/和list/请求路由分别取名index和list：

```python
urlpatterns = [
    path('admin/', admin.site.urls),
    path('index/', views.index, name="index"),
    path('list/', views.list, name="list"),
]
```

![](python(八).assets/28.png)

然后修改`views.py`里面的`index`方法：

```python
def index(request):
    route_url = reverse('order:index')
    print("reverse反向解析得到路由地址:" + route_url)
    result = resolve(route_url)
    print("resolve通过路由地址得到路由信息:" + str(result))
    return HttpResponse("订单信息")
```



浏览器访问：`localhost:8000/order/index`,控制台输出信息如下：

- reverse反向解析得到路由地址:/order/index/
- resolve通过路由地址得到路由信息:ResolverMatch(func=order.views.index, args=(), kwargs={}, url_name='index', app_names=['order'], namespaces=['order'], route='order/index/')
  - func: 路由的视图函数对象或视图类对象
  - args:以列表格式获取路由的变量信息
  - kwargs:以字典格式获取路由的变量信息
  - url_name:获取路由命名name
  - app names:与app name功能一致，但以列表格式表示
  - namespaces:与namespace功能一致,但以列表格式表示
  - route:获取整个路由的名称，包括命名空间

这里我们在修改下项目，来讲下参数的运用。将`order`的`urls.py`的list请求加上年月日路由变量:

```python
path('list/<int:year>/<int:month>/<int:day>', views.list, name="list"),
```

![](python(八).assets/29.png)

对应的views.py的list方法我们也进行修改，要加上三个路由变量

![](python(八).assets/30.png)

```python
def list(request, year, month, day):
    kwargs = {'year': year, 'month': month, 'day': day}
    args = [year, month, day]
    # route_url = reverse('order:list', args=args)
    route_url = reverse('order:list', kwargs=kwargs)
    print("reverse反向解析得到路由地址:" + route_url)
    result = resolve(route_url)
    print("resolve通过路由地址得到路由信息：" + str(result))
    return HttpResponse("订单列表")
```



进行反向解析路由的时候，我们可以带上路由实参，既可以通过kwargs字典键值对，，也可以通过args元组

浏览器请求：`localhost:8000/order/list/2024/05/01`,控制台输出：

```bash
reverse反向解析得到路由地址:/order/list/2024/5/1

resolve通过路由地址得到路由信息：ResolverMatch(func=order.views.list, args=(), kwargs={'year': 2024, 'month': 5, 'day': 1}, url_name='list', app_names=['order'], namespaces=['order'], route='order/list/<int:year>/<int:month>/<int:day>', captured_kwargs={'year': 2024, 'month': 5, 'day': 1})
```







# 6、Django5视图定义与使用

视图(Views）是 Django的 MTV架构模式的V部分，主要负责处理用户请求和生成相应的响应内容,然后在页面或其他类型文档中显示。



## 6.1、设置视图响应状态

客户端请求后端服务，在view.py视图层方法最终return 返回视图响应。Python内置提供了响应类型，来实现不同的返回不同的http状态码

| 响应类型                           | 解释说明                              |
| ---------------------------------- | ------------------------------------- |
| HttpResponse('Hello world'")       | 状态码200，请求已成功被服务器接收     |
| HttpResponseRedirect('/')          | 状态码302，重定向首页地址             |
| HttpResponsePermanentRedirect('/') | 状态码301，永久重定向首页地址         |
| HttpResponseBadRequest("'400')     | 状态码400，访问的页面不存在或请求错误 |
| HttpResponseNotFound('404")        | 状态码404，网页不存在或网页的URL失效  |
| HttpResponseForbidden('403')       | 状态码403，没有访问权限               |
| HttpResponseNotAllowed('405')      | 状态码405，不允许使用该请求方式       |
| HttpResponseServerError('500'")    | 状态码500，服务器内容错误             |
| JsonResponse( {'foo' : 'bar'})     | 默认状态码200，响应内容为JSON数据     |
| StreamingHttpResponse()            | 默认状态码200，响应内容以流式输出     |

我们来实测一下:进入我们的Hello应用的views.py代码修改 index方法

```python
def index(request):
    copyright_value = {"msg": "秦闪闪"}
    return render(request, 'index.html', context=copyright_value)
```

模板代码`index.html`改写下,模板里面取值:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<h1>Django！</h1>
<h2>Copyright: {{ msg }}</h2>
</body>
</html>
```

![](python(八).assets/31.png)

当然也可以设置响应 Json 数据

```python
def index(request):
	return JsonResponse({'foo': 'bar'})
```

![](python(八).assets/32.png)

或者响应404

```python
def index(request):
	return HttpResponseNotFound() # 404
```



## 6.2、设置重定向响应

Django重定向我们前面讲过一种urls.py里使用RedirectView实现

```python
path('redirectTo', RedirectView.as_view(url="index/"))
```

这种方便书写简单，但是不灵活，我们实际开发，为了能否实现业务上的判断，来进行业务重定向跳转，还是需要用`redirect`方法。

重定向的状态码分为301和302，前者是永久性跳转的，后者是临时跳转的

- 301重定向是永久的重定向，搜索引擎在抓取新内容的同时会将旧的网址替换为重定向之后的网址。
- 302跳转是暂时的跳转，搜索引擎会抓取新内容而保留旧的网址。因为服务器返回302代码，所以搜索引擎认为新的网址只是暂时的。

   

改写Hello里的index方法

```python
def index(request):
    return redirect("/static/new.html")
```

请求`localhost:8000/index/`则302跳转到`new.html`页面

如果加上`permanent=True`参数,就会变成301永久跳转了

```python
def index(request):
    return redirect("/static/new.html", permanent=True)
```



## 6.3、二进制文件下载响应

Django提供三种方式实现文件下载功能，分别是HttpResponse、StreamingHttpResponse和FileResponse,三者的说明如下:

- HttpResponse是所有响应过程的核心类，它的底层功能类是HttpResponseBase
- StreamingHttpResponse是在 HttpResponseBase的基础上进行继承与重写的，它实现流式响应输出，适用于大规模数据响应和文件传输响应
- FileResponse是在StreamingHttpResponse 的基础上进行继承与重写的，它实现文件的流式响应输出，只适用于文件传输响应

示例:我们准备一个`Test.txt`文件，放E盘根目录，在`views.py`里写方法:

```python
def download_file1(request):
    # 打开文件
    file = open(file_path, 'rb')
    # 创建HttpResponse对象
    response = HttpResponse(file)
    response['Content_Type'] = 'application/octet-stream'
    response['Content-Disposition'] = 'attachment;filename=file1.txt'
    return response

def download_file2(request):
    # 打开文件
    file = open(file_path, 'rb')
    # 创建StreamingHttpResponse对象
    response = StreamingHttpResponse(file)
    response['Content_Type'] = 'application/octet-stream'
    response['Content-Disposition'] = 'attachment;filename=file2.txt'
    return response

def download_file3(request):
    # 打开文件
    file = open(file_path, 'rb')
    # 创建FileResponse对象
    response = FileResponse(file)
    response['Content_Type'] = 'application/octet-stream'
    response['Content-Disposition'] = 'attachment;filename=file3.txt'
    return response
```

在`urls.py`里定义映射

```python
# 下载文件
path('download1', Hello.views.download_file1),
path('download2', Hello.views.download_file2),
path('download3', Hello.views.download_file3),
```

在应用static目录下新建 `download.html`文件

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>下载</title>
</head>
<body>
<a href="/download1">下载一:HttpResponse</a><br>
<a href="/download2">下载一:StreamingHttpResponse</a><br>
<a href="/download3">下载一:FileResponse</a><br>
</body>
</html>
```

访问`http://127.0.0.1:8000/static/download.html`，点击链接即可下载

![](python(八).assets/33.png)





## 6.4、HttpRequest请求类

当在浏览器上访问某个网址时，其实质是向网站发送一个HTTP请求，HTTP请求分为8种请求方式，每种请求方式的说明如下：



| 请求方式 | 说明                                                  |
| -------- | ----------------------------------------------------- |
| OPTIONS  | 返回服务器针对特定资源所支持的请求方法                |
| GET      | 向特定资源发出请求（访问网页）                        |
| POST     | 向指定资源提交数据处理请求（提交表单、上传文件)       |
| PUT      | 向指定资源位置上传数据内容                            |
| DELETE   | 请求服务器删除request-URL所标示的资源                 |
| HEAD     | 与GET请求类似，返回的响应中没有具体内容，用于获取报头 |
| TRACE    | 回复和显示服务器收到的请求，用于测试和诊断            |
| CONNECT  | HTTP/1.1协议中能够将连接改为管道方式的代理服务器      |



在上述的HTTP请求方式里，最基本的是GET请求和POST 请求，网站开发者关心的也只有GET请求和POST请求。GET请求和 POST请求是可以设置请求参数的，两者的设置方式如下:

- GET请求的请求参数是在路由地址后添加`?`和参数内容，参数内容以key=value 形式表示，等号前面的是参数名，后面的是参数值，如果涉及多个参数，每个参数之间就使用`&`隔开,如`127.0.0.1:8000/?name=qinshanshan&age=23`
- POST请求的请求参数一般以表单的形式传递，常见的表单使用HTML的 form标签，并且form标签的method 属性设为POST

在Django5中，Http请求信息都被封装到了HttpRequest类中。**HttpRequest类的常用属性如下**：

- COOKIE:获取客户端（浏览器）的Cookie信息，以字典形式表示，并且键值对都是字符串类型
- FILES: django.http.request.QueryDict对象，包含所有的文件上传信息
- GET:获取GET请求的请求参数，它是django.http.request.QueryDict对象，操作起来类似于字典
- POST:获取POST请求的请求参数，它是django.http.request.QueryDict对象，操作起来类似于字典
- META:获取客户端（浏览器）的请求头信息，以字典形式存储
- method:获取当前请求的请求方式(GET请求或POST请求)
- path:获取当前请求的路由地址
- session:一个类似于字典的对象，用来操作服务器的会话信息，可临时存放用户信息
- user:当 Django启用AuthenticationMiddleware中间件时才可用。它的值是内置数据模型User的对象，表示当前登录的用户。如果用户当前没有登录，那么user将设为django.contrib.auth.models.AnonymousUser的一个实例

**HttpRequest类常用方法如下**：

- `is_secure()`:是否是采用HTTPS协议
- `get_host()`:获取服务器的域名。如果在访问的时候设有端口，就会加上端口号，如127.0.0.1:8000
- `get_full path()`:返回路由地址。如果该请求为GET请求并且设有请求参数，返回路由地址就会将请求参数返回，如/?name=qinshanshan&age=23

示例：先views.py里定义两个方法，分别测试get和post：

```python
def get_test(request):
    # 请求方式
    print(request.method)  # GET
    # 常用属性
    print(request.content_type)  # text/plain
    print(request.content_params)  # {}
    print(request.COOKIES)
    print(request.scheme)  # http
    # 常用方法
    print(request.is_secure())  # False
    print(request.get_host())  # localhost:8000
    print(request.get_full_path())  # /get?name=qinshanshan&age=23
    print(request.GET.get("name"))  # qinshanshan
    print(request.GET.get("age"))  # 23
    print(request.GET.get("aaa", "666"))  # 获取key为aaa的value,假如没获取到,则默认获取到666
    return HttpResponse("http get ok")


def post_test(request):
    # 请求方式
    print(request.method)  # POST
    # 常用方法
    print(request.POST.get("name"))  # 张三
    print(request.POST.get("age"))  # 21
    print(request.POST.get("aaa", "666"))  # 666
    return HttpResponse("http post ok")

def index(request):
    return render(request, 'index.html')
```

`urls.py`里定义映射

```python
# get和post请求
path('get', Hello.views.get_test),
path('post', Hello.views.post_test),
```

修改`index.html`,这里我们不能用静态页面，需要一个csrf安全机制token 需要后端server来提供，需要使用模板

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<h1>Django！</h1>
<a href="/get?name=qinshanshan&age=23" target="_blank">http get请求测试</a><br>
<br>
<form action="/post" method="post">
    {% csrf_token %}
    name: <input type="text" name="name"><br>
    age: <input type="text" name="age"><br>
    <input type="submit" value="提交">
</form>
</body>
</html>
```



访问：`http://localhost:8000/index/`

![](python(八).assets/34.png)

点击控制台会输出：

![](python(八).assets/35.png)

![](python(八).assets/36.png)





## 6.5、会话管理Cookies&Session

HTTP是一种无状态协议，每次客户端访问web页面时，客户端打开一个单独的浏览器窗口连接到web服务器，由于服务器不会自动保存之前客户端请求的相关信息，所有无法识别一个HTTP请求是否为第一次访问。这就引进了web客户端和服务器端之间的会话，这就是会话管理。

常用的会话跟踪技术是Cookie与Session。

- Cookie通过在客户端记录信息确定用户身份
- Session通过在服务器端记录信息确定用户身份。





### 6.5.1、关于Cookie

cookie是某些网站为了辨别用户身份，进行Session跟踪而储存在用户本地终端上的数据（通常经过加密），由用户客户端计算机暂时或永久保存的信息。

Cookie定义了一些HTTP请求头和HTTP响应头，通过这些HTTP头信息使服务器可以与客户进行状态交互。

客户端请求服务器后，如果服务器需要记录用户状态，服务器会在响应信息中包含一个Set-Cookie的响应头，客户端会根据这个响应头存储Cookie信息。再次请求服务器时，客户端会在请求信息中包含一个Cookie请求头，而服务器会根据这个请求头进行用户身份、状态等较验。

![](python(八).assets/37.png)







### 6.5.2、关于Session

Session是另一种记录客户状态的机制，不同的是Cookie保存在客户端浏览器中，而Session保存在服务器上。

- 客户端浏览器访问服务器的时候，服务器把客户端信息以某种形式记录在服务器上。这就是Session
- 客户端浏览器再次访问时只需要从该Session中查找该客户的状态就可以了

当程序需要为某个客户端的请求创建一个session的时候，服务器首先检查这个客户端的请求里是否已包含了一个session标识，称为session id，如果已包含一个session id则说明以前已经为此客户端创建过session，服务器就按照session id把这个session检索出来使用（如果检索不到，可能会新建一个），如果客户端请求不包含session id，则为此客户端创建一个session并且生成一个与此session相关联的session id，session id的值应该是一个既不会重复，又不容易被找到规律以仿造的字符串，这个session id将被在本次响应中返回给客户端保存。

![](python(八).assets/38.png)

### 6.5.3、二者区别

1. 数据存储位置：cookie 数据存放在客户的浏览器上，session 数据放在服务器上。
2. 安全性：cookie不是很安全，别人可以分析存放在本地的cookie并进行cookie欺骗，考虑到安全应当使用session
3. 服务器性能：session会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能，考虑到减轻服务器性能方面，应当使用cookie
4. 数据大小：单个cookie保存的数据不能超过4K，很多浏览器都限制一个站点最多保存20个cookie
5. 信息重要程度：可以考虑将用户信息等重要信息存放为session，其他信息如果需要保留，可以放在cookie中



### 6.5.4、获取cookie

- `request.COOKIES.get('key')` ： 获取指定键名的cookie
- `request.COOKIES['key']` ：获取指定键名的cookie
- `request.get_signed_cookie(key,default=RAISE_ERROR,salt='',max_age=None)`
  - default: 默认值
  - salt: 加密盐
  - max_age: 后台控制过期时间，默认是秒数
  - expires: 专门针对IE浏览器设置超时时间



### 6.5.5、设置cookie

- `rep.set_cookie(key,value,....)`

```python
# 获取HttpResponse对象
rep = HttpResponse(...)
# 设置cookie
rep.set_cookie(key,value,...)
```

`rep.set_signed_cookie(key,value,salt='加密盐', max_age=None, ...)`

参数：

- key, 键
- value='', 值
- max_age=None, 超时时间
- path='/', Cookie生效的路径，/ 表示根路径，特殊的：根路径的cookie可以被任何url的页面访问
- domain=None, Cookie生效的域名
- secure=False, https传输
- httponly=False 只能http协议传输，无法被JavaScript获取

### 6.5.6、删除cookie

- `rep.delete_cookie(key)` ：删除浏览器上之前设置的cookie值



## 6.6、Django操作session

1. 获取、设置、删除 Session 中的数据

```python
# 可以设置多组
request.session.get('key1','key2',...)
# 存在则不设置
request.session.setdefault('k1',123)
```

2. 所有键、值、键值对

```python
request.session.keys()

request.session.values()

request.session.items()

request.session.iterkeys()

request.session.itervalues()

request.session.iteritems()
```

3. 会话session的key

```python
request.session.session_key
```

4. 将所有Session失效日期小于当前日期的数据删除

```python
request.session.clear_expired()
```

5. 检查会话session的key在数据库中是否存在

```python
request.session.exists("session_key")
```

6.  删除当前会话的所有Session数据

```python
request.session.delete() # 只删客户端
```

7. 删除当前的会话数据并删除会话的Cookie

```python
request.session.flush() # 服务端、客户端都删
```

9. 设置会话Session和Cookie的超时时间

```python
request.session.set_expiry(value)
# 如果value是个整数，session会在些秒数后失效。
# 如果value是个datatime或timedelta，session就会在这个时间后失效。
# 如果value是0,用户关闭浏览器session就会失效。
# 如果value是None,session会依赖全局session失效策略
# django默认的session失效时间是14天
```



### 6.6.1、示例

下面通过一个具体Django事例来深入体验下Django项目里的Cookie&Session操作，views.py里定义两个方法，分别是登录页面跳转，以及登录逻辑处理

```python
# 登录跳转页面
def to_login(request):
    return render(request, 'login.html')


# 登录逻辑
def login(request):
    userName = request.POST.get("userName")
    password = request.POST.get("password")
    if userName == 'qinshanshan' and password == '123456':
        # 设置session: session中存一个key为currentUserName，value为userName
        request.session['currentUserName'] = userName
        # 获取session
        print("session获取", request.session['currentUserName'])
        # 跳转到主页面
        response = render(request, 'main.html')
        # 设置cookie
        response.set_cookie("remember_me", True)
        return response
    else:
        return render(request, 'login.html')
```

在`urls.py`里面进行路径映射

```python
# cookie&session
path('toLogin/',Hello.views.to_login),
path('login/',Hello.views.login),
```

新建`login.html`和`main.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>登录页面</title>
</head>
<body>
<form action="/login" method="post">
    {% csrf_token %}
    <table>
        <tr>
            <th>用户登录</th>
        </tr>
        <tr>
            <td>用户名:</td>
            <td><input type="text" name="userName"></td>
        </tr>
        <tr>
            <td>密码:</td>
            <td><input type="password" name="password"></td>
        </tr>
        <tr>
            <td><input type="submit" value="提交"></td>
        </tr>
    </table>

</form>

</body>
</html>
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>主页面</title>
</head>
<body>
<!--在页面上可以获取到session值-->    
欢迎: {{ request.session.currentUserName }}
</body>
</html>
```

访问：`http://127.0.0.1:8000/login/`

![](python(八).assets/39.png)



![](python(八).assets/40.png)





假如我们要设置cookie，则：

![](python(八).assets/41.png)



![](python(八).assets/42.png)











## 6.7、Django文件上传

文件上传功能是网站开发或者业务系统常见的功能之一，比如上传图片（用户头像或文章配图）和导入文件（压缩包，视频，音乐)。无论上传的文件是什么格式的，其上传原理都是将文件以二进制的数据格式读取并写入网站或者业务系统指定的目录里。

1. 首先先templates下新建upload.html ，前端上传文件模版页面

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>文件上传</title>
</head>
<body>
<form action="/upload" enctype="multipart/form-data" method="post">
    {% csrf_token %}
    <input type="file" name="myfile"><br><br>
    <input type="submit" value="上传文件">
</form>
</body>
</html>
```

2. views.py里定义to_upload和upload两个方法，分别是跳转文件页面，和文件上传处理

```python
# 跳转文件上传页面
def to_upload(request):
    return render(request, 'upload.html')


# 文件上传逻辑
def upload(request):
    # 获取上传的文件，如果没有文件，就默认为None
    myFile = request.FILES.get("myfile", None)
    if myFile:
        # 将上传的文件放入D:\\myFile目录下
        f = open(os.path.join("D:\\myFile", myFile.name), "wb+")
        # 分块写入文件
        for chunk in myFile.chunks():
            f.write(chunk)
        f.close()
        return HttpResponse("文件上传成功!")
    else:
        return HttpResponse("没发现文件！")
```

3. urls.py里面进行路径映射

```python
# 文件上传
path('toUpload/', Hello.views.to_upload),
path('upload/', Hello.views.upload),
```

4. 浏览器输入：`http://localhost:8000/toUpload/`

![](python(八).assets/43.png)



![](python(八).assets/44.png)



文件对象myFile提供一下属性来获取文件信息:

- `myFile.name`:获取上传文件的文件名，包含文件后缀名。
- `myFile.size`:获取上传文件的文件大小。
- `myFile.content_type`:获取文件类型，通过后续名判断文件类型。

从文件对象myFile获取文件内容，Django提供了以下读取方式，每种方式说明如下。

- `myFile.read()`:从文件对象里读取整个文件上传的数据，这个方法只适合小文件
- `myFile.chunks()`:按流式响应方式读取文件，在for 循环中进行迭代，将大文件分块写入服务器所指定的保存位置
- `myFile.multiple_chunks()`:判断文件对象的文件大小,返回True或者False,当文件大于2.5MB（默认值为2.5MB）时，该方法返回True，否则返回False。因此，可以根据该方法来选择选用read方法读取还是采用chunks方法。





































