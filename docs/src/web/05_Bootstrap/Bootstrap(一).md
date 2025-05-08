# 1、Bootstrap

## 1.1、下载与使用

- 英文官网：http://getbootstrap.com/

- 中文网站：https://getbootstrap.net/

1. 进入中文网站，选择版本 v3.4.0

![](Bootstrap(一).assets/1.png)

2. 下载完成后
   - 拷贝 dist 文件夹到项目中
   - 由于我们之后可能还会使用 LayUi 等其他插件，所以我们将 dist 改为 Bootstrap，方便辨认
3. 将 jQuery.js 放入我们的 js目录下
   - 因为 jQuery.js 并不属于 Bootstrap，所以我们放在 js 目录下

![](Bootstrap(一).assets/2.png)

4. 在 html 中模板为

```html
<!DOCTYPE html>
<html lang="en">
	<head>
        <meta charset="utf-8">
        <!--使⽤X-UA-Compatible来设置IE浏览器兼容模式 最新的渲染模式-->
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <!--
        viewport表示⽤户是否可以缩放⻚⾯；
        width指定视区的逻辑宽度；
        device-width指示视区宽度应为设备的屏幕宽度；
        initial-scale指令⽤于设置Web⻚⾯的初始缩放⽐例
        initial-scale=1则将显示未经缩放的Web⽂档
        -->
        <meta name="viewport" content="width=device-width, initial-scale=1">
    	<title>Bootstrap的HTML标准模板</title>
    
        <!--载入 Bootstrap 的css-->
    	<link href="css/bootstrap.min.css" rel="stylesheet">
	</head>
	<body>
        <h1>Hello, world!</h1>
        
        <!-- 如果要使⽤Bootstrap的js插件，必须先调⼊jQuery -->
        <script src="js/jquery-3.4.1.js"></script>
        <!-- 包括所有bootstrap的js插件或者可以根据需要使⽤的js插件调⽤　-->
        <script src="js/bootstrap.min.js"></script>
	</body>
</html>
```

注意：

- 如果要使⽤Bootstrap的js插件，必须先调用 jQuery.js

说明：

- viewport 标记⽤于指定用户是否可以缩放Web页面
- width 和 height 指令分别指定视区的逻辑宽度和⾼度。他们的值要么是以像素为单位的数字，要么
  是⼀个特殊的标记符号。
- width 指令使⽤ device-width 标记可以指示视区宽度应为设备的屏幕宽度。
- height 指令使⽤ device-height 标记指示视区⾼度为设备的屏幕⾼度。
- initial-scale 指令⽤于设置Web页面的初始缩放比例。默认的初始缩放比例值因智能手机浏览器的不
  同而有所差异。通常情况下设备会在浏览器中呈现出整个Web⻚⾯，设为1.0则将显示未经缩放的
  Web⽂档。



# 2、布局容器

## 2.1、.container

- `.container` 类用于固定宽度并支持==响应式布局==的容器（==网页两侧留白==）

```html
<div class="container">
  ...
</div>
```

## 2.2、.container-fluid

- `.container-fluid` 类用于 100% 宽度，占据全部视口 (viewport) 的容器（==网页两侧不留白==）

```html
<div class="container-fluid">
  ...
</div>
```



# 3、栅格网格系统

- Bootstrap 提供了一套==响应式、移动设备优先==的流式栅格系统，随着屏幕或视口（viewport）尺寸的增加，系统会自动分为最多12列。
- 栅格系统用于通过一系列的行（row）与列（column）的组合来创建页面布局，你的内容就可以放入这些创建好的布局中。
- Bootstrap框架中的网格系统就是将容器平分成12份。

- 



```html
<div class="container">
    <div class="row">
        <div class="col-md-4">4列</div>
        <div class="col-md-8">8列</div>
    </div>
</div>
```

注意：

- 行（row）必须包含在 `.container` （固定宽度）或 `.container-fluid` （100% 宽度）中
- 具体内容应该放置在列容器 (column) 之内
- `col-屏幕尺寸-列数`，其中屏幕尺寸有 
  - `xs`(xsmall phones)  超小屏(自动)
  - `sm`(small tablets)  小屏(750px)
  - `md`(middle desktops) 中屏(970px)
  - `lg`(larger desktops) 大屏(1170px)

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="bootstrap-3.3.7-dist/css/bootstrap.min.css">
</head>

<body>
    <!-- 布局容器 -->
    <div class="container">
        <!-- 行元素 -->
        <div class="row">
            <!-- 列元素 col-xs-数值 col-sm-数值 col-md-数值 col-lg-数值-->
            <div class="col-md-4" style="background-color: red;">4列</div>
            <div class="col-md-8" style="background-color: pink;">8列</div>
        </div>

    </div>
</body>

</html>
```

![](Bootstrap(一).assets/3.png)

## 3.1、列组合

列组合简单理解就是更改数字来合并列(==原则：列总和数不能超12，大于12则自动换到下一行==)，有点类似于表格的 colspan 属性

```html
<div class="container">
    <div class="row">
        <div class="col-md-4">4列</div>
        <div class="col-md-8">8列</div>
    </div>
    <div class="row">
        <div class="col-md-2">2列</div>
        <div class="col-md-10">10列</div>
    </div>
</div>
```



## 3.2、列偏移

- 如果我们不希望相邻的两个列紧靠在一起，但又不想使用 margin 或者其他的技术手段来。这个时候就可以使用==列偏移 (offset)== 功能来实现。
- 使用列偏移也非常简单，只需要在列元素上添加类名 `"col-md-offset-*"` (星号代表要偏移的列组合数)，那么具有这个类名的列就会向右偏移。
- 例如，你在列元素上添加 `"col-md-offset-8"` ,表示该列向右移动8个列的宽度(要保证列与偏移列的总数不超过12，不然会导致列 断行|换行 显示)

```html
<body>
    <!-- 布局容器 -->
    <div class="container">
        <!-- 行元素 -->
        <div class="row">
            <!-- 列元素 -->
            <div class="col-md-4 " style="background-color: red;">4</div>
            <div class="col-md-2 col-md-offset-4" style="background-color: pink;">2</div>
        </div>

    </div>
</body>
```

![](Bootstrap(一).assets/4.png)



## 3.3、列排序

```html
<div class="container">
    <div class="row">
        <!--向右浮动10列距离-->
        <div class="col-md-1 col-md-push-10"> 1列 </div>
        <!--向右浮动1列距离-->
        <div class="col-md-1 col-md-push-1"> 1列 </div>
        
    </div>
</div>
```

- 列排序就是改变列的方向，就是改变左右浮动，并且设置浮动的距离。

- 在 Bootstrap 框架的网格系统中是通过 添加类名 `col-md-push-*` 和 `col-md-pull-*` (其中星号代表移动的列组合数)
- 左浮动往前 `pull` ,右浮动往后 `push`

我们让第二个盒子向右浮动1个列的距离

```html

<body>
    <!-- 布局容器 -->
    <div class="container">
        <!-- 行元素 -->
        <div class="row">
            <!-- 列元素 -->
            <div class="col-md-1 " style="background-color: red;">1</div>
            <!-- 第二个盒子向右浮动1个列的距离 -->
            <div class="col-md-1 col-md-push-1" style="background-color: pink;">1</div>
            <div class="col-md-1 " style="background-color: greenyellow;">1</div>
            <div class="col-md-1 " style="background-color:yellow;">1</div>
        </div>

    </div>
</body>
```

![](Bootstrap(一).assets/5.png)

我们让第二个盒子向右浮动3个列的距离

```html
<body>
    <!-- 布局容器 -->
    <div class="container">
        <!-- 行元素 -->
        <div class="row">
            <!-- 列元素 -->
            <div class="col-md-1 " style="background-color: red;">1</div>
            <!-- 第二个盒子向右浮动3个列的距离 -->
            <div class="col-md-1 col-md-push-3" style="background-color: pink;">1</div>
            <div class="col-md-1 " style="background-color: greenyellow;">1</div>
            <div class="col-md-1 " style="background-color:yellow;">1</div>
        </div>

    </div>
</body>
```

![](Bootstrap(一).assets/6.png)





## 3.4、列嵌套

- 列嵌套：你可以在一个列中添加一个或者多个行(row) 容器，然后在这个行容器中插入列。

```html
<body>
    <!-- 布局容器 -->
    <div class="container">
        <div class="row">
            <!--先分一个8列-->
            <div class="col-md-8" style="background-color: white ;">
                <!--再分的8列里面再分3个4列-->
                <div class="col-md-4" style="background-color: red;">4</div>
                <div class="col-md-4" style="background-color: green;">4</div>
                <div class="col-md-4" style="background-color: yellow;">4</div>
            </div>
			
            <!--再分一个4列-->
            <div class="col-md-4" style="background-color: blue ;">4</div>
        </div>

    </div>
</body>
```

![](Bootstrap(一).assets/7.png)





# 4、排版

## 4.1、标题

- Bootstrap 和普通的 HTML 页面一样，定义标题都是使用标签 `<h1> ~ <h6>` ，只不过 Bootstrap 覆盖了其默认的样式，使用其在所有浏览器下显示的效果一样，
- 为了让非标题元素和标题使用相同的样式，还特意定义了 `.h1 ~ .h6` 六个类名。同时后面可以紧跟着一行小的标题 `<small></small>` 或使用 `.small`

```html
<h1>Bootstrap Heading<small>副标题</small></h1>
<div class="h1">
    Bootstrap 标题1
    <span class = "small"> 副标题 </span>
</div>
```

![](Bootstrap(一).assets/8.png)



## 4.2、段落

- 段落是排版中的另一个重要元素之一。
- 通过`.lead` 来突出强调内容(其作用就是增大文本字号，加粗文本，而且对行高和margin也做相应的处理)。可以使用以下标签给文本做突出样式处理。
  - `<small>` ：小号字
  - `<b><strong>`：加粗
  - `<i><em>`: 斜体

```html
<p>以后的你会感谢现在努力的你</p>
<p class="lead">以后的你会感谢现在努力的你</p>
<p class="lead">
    <small>以后的</small><!-- 小号字 -->
    <b>你</b>会		 <!-- 加粗 -->
    <i>感谢</i>现在		<!-- 斜体 -->
    <em>努力</em>的	 <!-- 斜体 -->
    <strong>你</strong><!-- 加粗 -->
</p>
```

## 4.3、强调

定义了一套类名，这里称其为强调类名，这些强调嘞都是通过颜色来表示强调，具体说明如下：

- `.text-muted`： 提示，使用浅灰色(#999)
- `.text.primary` ：主要，使用蓝色(#428bca)
- `.text-success`：成功，使用浅绿色(#3c763d)
- `.text-info`：通知信息，使用浅蓝色(#31708f)
- `text-warning`：警告，使用黄色(#8a6d3n)
- `text-danger`：危险，使用褐色(#a94442)

```html
 <div class="container">
        <div class="text-muted">提示效果</div>
        <div class="text-primary">主要效果</div>
        <div class="text-success">成功效果</div>
        <div class="text-info">信息效果</div>
        <div class="text-warning">警告效果</div>
        <div class="text-danger">危险效果</div>
    </div>
```

## 4.4、对齐效果

在CSS中常常使用`text-align` 来实现文本的对齐风格的设置。

其中主要有四种风格

| 值      | 说明     |
| ------- | -------- |
| left    | 左对齐   |
| right   | 右对齐   |
| center  | 居中对齐 |
| justify | 两端对齐 |

- Bootstrap 中通过定义四个类名来控制文本的对齐风格

| 类名         | 说明     |
| ------------ | -------- |
| text-left    | 左对齐   |
| text-right   | 右对齐   |
| text-center  | 居中对齐 |
| text-justify | 两端对齐 |



```html
 <div class="container">
        <p class="text-left">我居左</p>
        <p class="text-center">我居中</p>
        <p class="text-right">我居右</p>
        <p class="text-justify">网格系统的实现原理非常简单，仅仅是通过定义容器大小，平分12份(也有平分成24份或32份，但12份是最常见的)，再调整内外边距，最后结合媒体查询，就制作出了强大的响应式网格系统。Bootstrap框架中的网格系统就是将容器平分成12份
     	</p>

</div>
```

## 4.8、列表

### 4.8.1、无序列表

排列顺序无关紧要的一列元素。

```html
<ul>
  <li>...</li>
</ul>
```

### 4.8.2、有序列表

顺序至关重要的一组元素。

```html
<ol>
  <li>...</li>
</ol>
```

### 4.8.3、自定义列表

```html
<dl>
    <dt>HTML</dt>
    <dd>超文本标记语言</dd>
    <dt>CSS</dt>
    <dd>层叠样式表是一种样式表语言</dd>
</dl>
```





### 4.8.3、水平定义列表

在原有的基础加入了一些样式，使用样式`class="dl-horizontal"` 制作水平定义列表，==当标题宽度超过 160px 时，将会显示三个省略号==。

```html
<div class="container">
        <dl class="dl-horizontal">
            <dt>HTML 超文本标记语言</dt>
            <dd>HTML称为超文本标记语言，是一种标识性的语言。</dd>
            <dt>测试标题不能超过160px的宽度,否则2个点</dt>
            <dd>我在写一个水平定义列表的效果，我在写一个水平定义列表的效果。</dd>
        </dl>
</div>
```

![](Bootstrap(一).assets/9.png)

### 4.8.4、去点列表

移除了默认的 `list-style` 样式，也就是去掉了原无序列表前面的点  (去掉项目符号(编号))

```html
<ul class="list-unstyled">
  <li>...</li>
</ul>
```



### 4.8.5、内联列表

给列表添加`class="list-inline"`，把垂直列表换成水平列表，而且去掉项目符号(编号)，将所有元素放置于同一行。也可以说内联列表就是为了制作水平导航而生的。

```html
<ul>
    <li>首页</li>
    <li>java学院</li>
    <li>在线课堂</li>
</ul>
```



## 4.9、代码

一般在个人博客上使用的较为频繁，用于显示代码的风格。在 Bootstrap 主要提供了三种代码风格：

- 使用`<code></code>` 来显示单行内联代码
- 使用`<pre></pre>` 来显示多行块代码
  - 样式`pre-scrollable`(height，max-height 高度固定为340px，超过则存在滚动条)
- 使用`<kbd></kbd>` 来显示用户输入代码。如快捷键

### 4.9.1、单行内联代码

```html
<code>this is a simple code</code>
```

### 4.9.2、快捷键

```html
<p>
    使用<kbd>ctrl+s</kbd>保存
</p>
```

### 4.9.2、多行块代码

```html
<body>
    <!-- 1.显示代码原本格式,包括空格和换行 -->
    <pre>
        public class HelloWorld {
            public static void main(String[] args){
                System.out.println("helloworld...");
            }
        }
        </pre>
    
    <!-- 
        2.显示html标签的代码需要适应字符实体  
        小于号（<）要使用硬编码“&lt;”来替代，大于号(>)使用“&gt;”来替代 
    -->
    <pre>
         <h2>Hello World</h2>
    </pre>
    
    <pre>
        &lt;h2&gt;Hello World&lt;/h2&gt;
    </pre>
    
    <!-- 3.当高度超过，会存在滚动条 -->
    <pre class="pre-scrollable">
            <ol>
                <li>...........</li>
                <li>...........</li>
                <li>...........</li>
                <li>...........</li>
                <li>...........</li>
                <li>...........</li>
                <li>...........</li>
                <li>...........</li>
                <li>...........</li>
                <li>...........</li>
                <li>...........</li>
                <li>...........</li>
            </ol>
        </pre>
</body>
```

![](Bootstrap(一).assets/10.png)

## 4.10、表格

Bootstrap 为表格提供了1种基础样式和4种附加样式以及1个支持响应式的表格。在使用Bootstrap得到表格过程种，只需要添加对应的类名就可以得到不同的表格风格。

## 4.10.1、基础样式

- `class = "table"` ： 基础表格

### 4.10.2、附加样式

| 类名            | 说明                                               |
| --------------- | -------------------------------------------------- |
| table-striped   | 斑马线表格                                         |
| table-bordered  | 带边框的表格                                       |
| table-hover     | 鼠标悬停高亮的表格                                 |
| table-condensed | 紧凑型表格，单元格没内距或者内距较其他表格的内距小 |

```html
<body>
    <table class="table table-bordered table-striped table-hover table-condensed">
        <tr>
            <th>JavaSE</th>
            <th>数据库</th>
            <th>JavaScript</th>
        </tr>
        <tr>
            <td>面向对象</td>
            <td>oracle</td>
            <td>json</td>
        </tr>
        <tr>
            <td>数组</td>
            <td>mysql</td>
            <td>ajax</td>
        </tr>
        <tr>
            <td>面向对象</td>
            <td>oracle</td>
            <td>json</td>
        </tr>
        <tr>
            <td>数组</td>
            <td>mysql</td>
            <td>ajax</td>
        </tr>
    </table>
</body>
```

### 4.10.3、tr、th、td样式

提供了五种不同的类名，每种类名控制了==行的不同背景颜色==

| 类名    | 说明                             |
| ------- | -------------------------------- |
| active  | 将悬停的颜色应用在行或者单元格上 |
| success | 表示成功的操作                   |
| info    | 表示信息变化的操作               |
| warning | 表示一个警告的操作               |
| danger  | 表示一个危险的操作               |

```html
<body>
    <table class="table table-bordered table-striped table-hover table-condensed">
        <tr class="info">
            <th>JavaSE</th>
            <th>数据库</th>
            <th>JavaScript</th>
        </tr>
        <tr class="active">
            <td>面向对象</td>
            <td>oracle</td>
            <td>json</td>
        </tr>
        <tr class="danger">
            <td>数组</td>
            <td>mysql</td>
            <td>ajax</td>
        </tr>
        <tr class="warning">
            <td>面向对象</td>
            <td>oracle</td>
            <td>json</td>
        </tr>
        <tr class="success">
            <td>数组</td>
            <td>mysql</td>
            <td>ajax</td>
        </tr>
    </table>
</body>
```

![](Bootstrap(一).assets/11.png)



# 5、表单

表单主要功能是用来和用户做交流的一个网页控件，良好的表单设计能够让网页与用户更好的沟通。表单中常见的元素主要包括：

- 文本输入框
- 下拉选择框
- 单选按钮
- 复选按钮
- 文本域和按钮等

## 5.1、表单控件

- `class="form-control"` 表单元素的样式
- `class="input-lg"` ：表单控件较大
- `class="input-sm"` ： 表单控件较小





### 5.1.1、输入框text

- 添加`class = "form-controll"`

```html
<div class="container">
        <!--  文本框 -->
        <div class="row">
             <div class="col-sm-3">
                 <!--原格式文本域-->
                 <input type="text" name="" id=""  />
                 <!--表单样式文本域-->
                 <input type="text" name="" id="" class="form-control" />
                 <!--较大文本域-->
                 <input type="text" name="" id="" class="form-control input-lg" />
                 <!--较小文本域-->
                 <input type="text" name="" id="" class="form-control input-sm" />
             </div>
        </div>
</div>
```

![](Bootstrap(一).assets/12.png)





### 5.1.2、下拉选择框select

- 添加`class = "form-controll"`
  - 多个选择设置`multiple="multuple"`

```html
<body>
    <div class="container">
        <!-- 原格式下拉框 -->
        <select>
            <option>北京</option>
            <option>上海</option>
            <option>深圳</option>
        </select>
        <hr>
        <hr>
        <hr>
        <!-- 表单样式下拉框 -->
        <select class="form-control">
            <option>北京</option>
            <option>上海</option>
            <option>深圳</option>
        </select>

        <hr>
        <hr>
        <hr>
        <!-- 表单样式下拉框提供多个选择 -->
        <select class="form-control" multiple="multuple">
            <option >北京</option>
            <option>上海</option>
            <option>深圳</option>
        </select>
    </div>
</body>
```



![](Bootstrap(一).assets/13.png)





### 5.1.3、文本域textarea

- 添加`class = "form-controll"`
- 一般都是用栅格来控制文本域的大小

```html
<div class="container">
    <!-- 占3列的原格式文本域 -->
    <div class="row">
        <div class="col-sm-3">
            <textarea rows="3"></textarea>
        </div>


		<!-- 占6列的文本域 -->
        <div class="col-sm-6">
            <textarea class="form-control" rows="3"></textarea>
        </div>
    </div>
</div>
```

![](Bootstrap(一).assets/14.png)







### 5.1.4、复选框checkbox

- 垂直显示(给input标签加)：`class="checkbox"`
- 水平显示(给label标签加)：`class="checkbox-inline"`

```html
<div class="container">
    <!-- 垂直显示 -->
    <div>
        <div class="checkbox">
            <label><input type="checkbox" >游戏</label>
        </div>
        <div class="checkbox">
            <label><input type="checkbox" >学习</label>
        </div>
    </div>

    <!-- 水平显示 -->
    <div>
        <label class="checkbox-inline">
             <input type="checkbox" >游戏
         </label>
        <label class="checkbox-inline">
             <input type="checkbox" >学习
         </label>
    </div>
</div>
```

![](Bootstrap(一).assets/15.png)





### 5.1.5、单选框radio

- 垂直显示(给input标签加)：`class="radio"`
- 水平显示(给label标签加)：`class="radio-inline"`

```html
<div class="container">
    <div class="row">
        <!-- 垂直显示 -->
        <div>
            <div class="radio">
                <label><input type="radio" >男</label>
            </div>
            <div class="radio">
                <label><input type="radio" >女</label>
            </div>
        </div>


        <!-- 水平显示 -->
        <div>
            <label class="radio-inline">
                     <input type="radio" >男
                 </label>
            <label class="radio-inline">
                     <input type="radio" >女
                 </label>
        </div>
    </div>
</div>
```

![](Bootstrap(一).assets/16.png)





### 5.1.6、按钮

#### ①基础样式

- 基础样式(给button标签加)：`class="btn"`

```html
<button class="btn">按钮</button>
```

#### ②附加样式

| 类名                      | 样式            |
| ------------------------- | --------------- |
| `class="btn btn-default"` | 默认样式Default |
| `class="btn btn-primary"` | 首选项Primary   |
| `class="btn btn-success"` | 成功Success     |
| `class="btn btn-info"`    | 一般信息Info    |
| `class="btn btn-warning"` | 警告Warning     |
| `class="btn btn-danger"`  | 危险Danger      |
| `class="btn btn-link"`    | 链接Link        |

```html
 <div class="container">
        <!-- Standard button -->
        <button type="button" class="btn btn-default">（默认样式）Default</button>

        <!-- Provides extra visual weight and identifies the primary action in a set of buttons -->
        <button type="button" class="btn btn-primary">（首选项）Primary</button>

        <!-- Indicates a successful or positive action -->
        <button type="button" class="btn btn-success">（成功）Success</button>

        <!-- Contextual button for informational alert messages -->
        <button type="button" class="btn btn-info">（一般信息）Info</button>

        <!-- Indicates caution should be taken with this action -->
        <button type="button" class="btn btn-warning">（警告）Warning</button>

        <!-- Indicates a dangerous or potentially negative action -->
        <button type="button" class="btn btn-danger">（危险）Danger</button>

        <!-- Deemphasize a button by making it look like a link while maintaining button behavior -->
        <button type="button" class="btn btn-link">（链接）Link</button>
    </div>
```

![](Bootstrap(一).assets/17.png)

#### ③多标签支持

- 多标签支持：使用 a div input 等制作按钮

```html
<div class="container">
        <a class="btn btn-default" href="#" role="button">Link</a>
        <button class="btn btn-default" type="submit">Button</button>
        <input class="btn btn-default" type="button" value="Input">
        <input class="btn btn-default" type="submit" value="Submit">
</div>
```

注意：

- 虽然按钮类可以应用到 `<a>` 和 `<button>` 元素上，但是，导航和导航条组件只支持 `<button>` 元素。
- 如果 `<a>` 元素被作为按钮使用 -- 并用于在当前页面触发某些功能 -- 而不是用于链接其他页面或链接当前页面中的其他部分，那么，务必为其设置 `role="button"` 属性。
- 我们总结的最佳实践是：**强烈建议尽可能使用 `<button>` 元素**来获得在各个浏览器上获得相匹配的绘制效果。

#### ④设置按钮大小

- 使用 `.btn-lg`、`.btn-sm` 或 `.btn-xs` 就可以获得不同尺寸的按钮
  - `class="btn-lg"`  大按钮
  - `class="btn-sm"`  小按钮
  - `class="btn-xs"`  超小按钮

```html
 <div class="container">
        <p>
            <button type="button" class="btn btn-primary btn-lg">（大按钮）Large button</button>
            <button type="button" class="btn btn-default btn-lg">（大按钮）Large button</button>
        </p>
        <p>
            <button type="button" class="btn btn-primary">（默认尺寸）Default button</button>
            <button type="button" class="btn btn-default">（默认尺寸）Default button</button>
        </p>
        <p>
            <button type="button" class="btn btn-primary btn-sm">（小按钮）Small button</button>
            <button type="button" class="btn btn-default btn-sm">（小按钮）Small button</button>
        </p>
        <p>
            <button type="button" class="btn btn-primary btn-xs">（超小尺寸）Extra small button</button>
            <button type="button" class="btn btn-default btn-xs">（超小尺寸）Extra small button</button>
        </p>
    </div>
```

![](Bootstrap(一).assets/18.png)



#### ⑤按钮禁用

- 为 `<button>` 元素添加 `disabled="disabled"` 属性，使其表现出禁用状态。

```html
<div class="container">
        <button type="button" class="btn btn-lg btn-primary" disabled="disabled">Primary button</button>
        <button type="button" class="btn btn-default btn-lg" disabled="disabled">Button</button>
    </div>
```



## 5.2、表单布局

### 5.2.1、垂直表单

基本的表单结构是 Bootstrap 自带的，个别的表单控件自动接收一些全局样式。下面列出了创建基本表单的步骤：

- 向父元素`<form>` 元素 添加 `role="form"`
- 把标签和控件放在一个带有 `class="form-group"` 的`<div>` 中。这是获取最佳间距所必需的
- 向所有的文本元素 `<input>` 、`<textarea>` 、`select` 添加 `class="form-control"`

```html
<body>
    <form action="#" class="form-horizontal" role="form">
        <h2 align="center">用户信息表</h2>
        <!-- 表单中的表单元素组 -->
        <!-- 输入框 -->
        <div class="form-group">
            <label for="uname" class="control-label col-md-2">姓名</label>
            <div class="col-md-8">
                <input type="text" id="uname" class="form-control" placeholder="请输入姓名" />
            </div>
        </div>

        <!-- 输入框 -->
        <div class="form-group">
            <label for="upwd" class="control-label col-md-2">密码</label>
            <div class="col-md-8">
                <input type="password" id="upwd" class="form-control" placeholder="请输入密码" />
            </div>
        </div>

        <!-- 多选框 -->
        <div class="form-group">
            <label class="control-label col-md-2">爱好</label>
            <div class="col-md-8">
                <label class="checkbox-inline">
                    <input type="checkbox" />敲代码
                </label>
                <label class="checkbox-inline">
                    <input type="checkbox" />跳舞
                </label>
            </div>
        </div>

        <!-- 下拉选择框 -->
        <div class="form-group">
            <label class="control-label col-md-2">城市</label>
            <div class="col-md-8">
                <select class="form-control">
                    <option>请选择城市</option>
                    <option>上海</option>
                    <option>北京</option>
                    <option>深圳</option>
                </select>
            </div>
        </div>

        <!-- 文本框 -->
        <div class="form-group">
            <label for="remark" class="control-label col-md-2">简介</label>
            <div class="col-md-8">
                <textarea id="remark" class="form-control"></textarea>
            </div>
        </div>


        <!-- 按钮 -->
        <div class="form-group">
            <div class="col-md-2 col-md-offset-5">
                <button class="btn btn-primary">提交</button>
            </div>
        </div>
    </form>
</body>
```

![](Bootstrap(一).assets/19.png)



### 5.2.1、内联表单

- 如果需要创建一个表单，它的所有元素是内联的，向左对齐的，标签是并排的，请向 `<form>` 标签添加 `class="form-inline"`。

```html
<body>
    <div class="container">
        <!-- 内联表单 -->
        <form action="#" class="form-inline" role="form">
            <div class="form-group">
                <label for="userName">姓名</label>
                <input type="text" id="userName" class="form-control" placeholder="请输入姓名" />
            </div>

            <div class="form-group">
                <label for="userPwd">密码</label>
                <input type="text" id="userPwd" class="form-control" placeholder="请输入姓名" />
            </div>

            <div class="form-group">
                <label for="userName">姓名</label>
                <input type="text" id="userName" class="form-control" placeholder="请输入密码" />
            </div>

            <div class="form-group">
                <button class="btn btn-warning">提交</button>
            </div>

        </form>
    </div>
</body>

```

![](Bootstrap(一).assets/20.png)

# 6、缩略图

## 6.1、字体图标

- 在我们下载的 Bootstrap 加压文件中有 fonts 文件夹，里面就是我们的字体图标
- 只需将 fonts 文件夹复制到我们的项目红，我们就可以使用字体图标了

- 语法：

```html
<span class="字体图标类名"> 字体图标 </span>
```

- 字体图标类名地址查看，需要时去复制即可：https://www.runoob.com/try/demo_source/bootstrap3-glyph-icons.htm



## 6.2、缩略图使用

- 大多数站点都需要在网格中布局图像、视频、文本等。Bootstrap 通过缩略图为此提供了一种简便的方式
- 使用 Bootstrap 创建缩略图的步骤如下：
  - 在图像周围添加带有 `class="thumbnail"` 的 `<a>` 标签。
  - 这会添加四个像素的内边距（padding）和一个灰色的边框。
  - 当鼠标悬停在图像上时，会动画显示出图像的轮廓。

```html
<body>
    <div class="container">
        <div class="col-sm-6 col-md-3">
            <a href="#" class="thumbnail">
                <img src="img/timg.jpg" alt="通用的占位符缩略图">
            </a>
        </div>
    </div>
</body>
```

![](Bootstrap(一).assets/21.png)





## 6.3、自定义内容

现在我们有了一个基本的缩略图，我们可以向缩略图添加各种 HTML 内容，比如标题、段落或按钮。具体步骤如下：

- 把带有 `class="thumbnail"` 的 `<a>` 标签改为 `<div>`。
- 在该 `<div> `内，您可以添加任何您想要添加的东西。由于这是一个 `<div>`，我们可以使用默认的基于 span 的命名规则来调整大小。

- 如果您想要给多个图像进行分组，请把它们放置在一个无序列表中，且每个列表项向左浮动。

```html
<div class="container">
    <!-- 第一个缩略图 -->
	<div class="col-md-3">
    	<div class="thumbnail">
        	<img src="img/timg.jpg" alt="...">
        	<h3>高圆圆</h3>
        	<p>出生于北京市，中国内地影视女演员、模特。</p>
        	<button class="btn btn-default">
            	<span class="glyphicon glyphicon-heart"></span>喜欢
       		</button>
        	<button class="btn btn-info">
            	<span class="glyphicon glyphicon-pencil"></span>评论
        	</button>
        </div>   
    </div>
    
    <!-- 第二个缩略图 -->
    <div class="col-md-3">
    	<div class="thumbnail">
        	<img src="img/timg.jpg" alt="...">
        	<h3>高圆圆</h3>
        	<p>出生于北京市，中国内地影视女演员、模特。</p>
        	<button class="btn btn-default">
            	<span class="glyphicon glyphicon-heart"></span>喜欢
       		</button>
        	<button class="btn btn-info">
            	<span class="glyphicon glyphicon-pencil"></span>评论
        	</button>
        </div>   
    </div>
    
    <!-- 第三个缩略图 -->
    <div class="col-md-3">
    	<div class="thumbnail">
        	<img src="img/timg.jpg" alt="...">
        	<h3>高圆圆</h3>
        	<p>出生于北京市，中国内地影视女演员、模特。</p>
        	<button class="btn btn-default">
            	<span class="glyphicon glyphicon-heart"></span>喜欢
       		</button>
        	<button class="btn btn-info">
            	<span class="glyphicon glyphicon-pencil"></span>评论
        	</button>
        </div>   
    </div>
    ....
    ....
</div>
```

![](Bootstrap(一).assets/22.png)



## 6.4、面板

- 面板组件用于把 DOM 组件插入到一个盒子中
- 创建一个基本的面板，只需要向 `<div>` 元素添加 `class="panel panel-default"`  即可

```html
<div class="panel panel-default">
    <div class="panel-body">
        这是一个基本的面板
    </div>
</div>
```

默认的 `.panel` 组件所做的只是设置基本的边框 border 和 內补 padding 来包含内容

### 6.4.1、面板

- 给盒子添加 `class="panel-heading"` 可以很简单地向面板添加标题。
- 给盒子添加 `class="panel-body"` 可以向面板添加主题内容

```html
<div class="panel panel-warning">
    <div class="panel-heading">
        <h2>明星合集</h2>
    </div>
    <div class="panel-body">
        <div class="col-md-3">
            <div class="thumbnail">
                <img src="img/timg.jpg" alt="...">
                <h3>高圆圆</h3>
                <p>出生于北京市，中国内地影视女演员、模特。</p>
                
                <button class="btn btn-default">
                    <span class="glyphicon glyphicon-heart"></span>喜欢</button>
                <button class="btn btn-info">
                    <span class="glyphicon glyphicon-pencil"></span>评论
                </button>
            </div>
        </div>
    </div>
</div>
```

![](Bootstrap(一).assets/23.png)





# 7、导航元素

## 7.1、标签式的导航菜单

- 给一个无序列表添加 `class="nav nav-tabs"`
- 给任意一个 li  添加 `class="active"`（表示选中这个导航）

```html
<body>
    <div class="container">
        <p>标签式的导航菜单</p>
        <ul class="nav nav-tabs">
            <li> <a href="#">Home</a></li>
            <li><a href="#">SVN</a></li>
            <li><a href="#">iOS</a></li>
            <li><a href="#">VB.Net</a></li>
            <li class="active"><a href="#">Java</a></li>
            <li><a href="#">PHP</a></li>
        </ul>
    </div>
</body>
```

![](Bootstrap(一).assets/24.png)



## 7.2、胶囊式的导航菜单

- 给一个无序列表添加 `class="nav nav-pills"`
- 给任意一个 li  添加 `class="active"`（表示选中这个导航）

```html
<div class="container">
    <p>基本的胶囊式导航菜单</p>
    <ul class="nav nav-pills">
        <li><a href="#">Home</a></li>
        <li><a href="#">SVN</a></li>
        <li><a href="#">iOS</a></li>
        <li><a href="#">VB.Net</a></li>
        <li class="active"><a href="#">Java</a></li>
        <li><a href="#">PHP</a></li>
    </ul>
</div>
```

![](Bootstrap(一).assets/25.png)



### ①垂直的胶囊式导航菜单

- 给一个无序列表添加 `class="nav nav-pills"` 的同时添加`class="nav-stacked"`

- 给任意一个 li  添加 `class="active"`（表示选中这个导航）

```html
<div class="container">
    <p>基本的垂直的胶囊式导航菜单</p>
    <ul class="nav nav-pills nav-stacked">
        <li><a href="#">Home</a></li>
        <li><a href="#">SVN</a></li>
        <li><a href="#">iOS</a></li>
        <li><a href="#">VB.Net</a></li>
        <li class="active"><a href="#">Java</a></li>
        <li><a href="#">PHP</a></li>
    </ul>
</div>
```

![](Bootstrap(一).assets/26.png)



## 7.3、两端对齐导航

- 让标签式导航两端对齐：给一个无序列表添加 `class="nav nav-tabs nav-justified"`
- 让胶囊式导航两端对齐：给一个无序列表添加 `class="nav nav-pills nav-justified"`

```html
<div class="container">
    <p>两端对齐的标签导航元素</p>
    <ul class="nav nav-pills nav-justified">
        <li class="active"><a href="#">Home</a></li>
        <li><a href="#">SVN</a></li>
        <li><a href="#">iOS</a></li>
        <li><a href="#">VB.Net</a></li>
        <li><a href="#">Java</a></li>
        <li><a href="#">PHP</a></li>
    </ul><br><br><br>
    <hr>
    <p>两端对齐的胶囊导航元素</p>
    <ul class="nav nav-tabs nav-justified">
        <li class="active"><a href="#">Home</a></li>
        <li><a href="#">SVN</a></li>
        <li><a href="#">iOS</a></li>
        <li><a href="#">VB.Net</a></li>
        <li><a href="#">Java</a></li>
        <li><a href="#">PHP</a></li>
    </ul>
</div>
```



![](Bootstrap(一).assets/27.png)



## 7.4、总结

| 类                         | 描述                             |
| -------------------------- | -------------------------------- |
| .nav nav-tabs              | 标签页                           |
| .nav nav-pills             | 胶囊式标签页                     |
| .nav nav-pills nav-stacked | 胶囊式标签页以垂直方向堆叠排列的 |
| .nav-justified             | 两端对齐的标签页                 |





# 8、分页

## 8.1、默认的分页

- 给一个无序列表添加`class="pagination"`
- 给任意一个 li  添加 `class="active"`（表示选中这一页）

```html
<div class="container">
    <p>分页导航</p>
    <ul class="pagination">
        <li><a href="#">&laquo;</a></li>
        <li class="active"><a href="#">1</a></li>
        <li><a href="#">2</a></li>
        <li><a href="#">3</a></li>
        <li><a href="#">4</a></li>
        <li><a href="#">5</a></li>
        <li><a href="#">&raquo;</a></li>
    </ul>
</div>
```

## 8.2、翻页

- 给一个无序列表添加`class="pager"`

```html
<div class="container">
    <p>翻页导航</p>
    <ul class="pager">
        <li><a href="#">Previous</a></li>
        <li><a href="#">Next</a></li>
    </ul>
</div>
```

![](Bootstrap(一).assets/28.png)





# 9、插件

我们在使用 Bootstrap 插件时

- 引入 Bootstrap 的核心 CSS 文件
- 引入 jquery 的核心 js 文件,需要在 bootstrap 的 js 之前引入
- 引入 Bootstrap 的核心 js 文件

```html
<head>
    <meta charset="utf-8" />
    <title>Document</title>
    <!-- 引入Bootstrap 的核心CSS文件 -->
    <link rel="stylesheet" href="bootstrap-3.3.7-dist/css/bootstrap.min.css">
    <!-- 引入jquery的核心js文件,需要在bootstrap的js之前引入 -->
    <script src="js/jquery-3.4.1.js" type="text/javascript" charset="utf-8"></script>
    <!-- 引入Bootstrap 的核心js文件 -->
    <script src="bootstrap-3.3.7-dist/js/bootstrap.min.js" type="text/javascript" charset="utf-8"></script>
</head>
```



## 9.1、下拉菜单

- 使用一个 `class="dropdown"` 的`div` 包裹整个下拉框
- 使用一个 `class="dropdown-toggle" data-toggle="dropdown"` 的按钮作为父菜单
  - 给父菜单后设置一个下拉箭头

- 使用一个 `class="dropdown-menu"` 的 ul 列表作为下拉菜单项
  - 使用 `class="dropdown-header"` 的 li 作为分组的标题
  - 使用 `class="driver"` 的 li 作为下拉分割线



```html
<body>
    <!-- 1.使用一个类名为dropdown 或 btn-group 的div包裹整个下拉框
		 <div class="dropdown"></div>
		 默认下拉框向上为 dropup ,向下为 dropdown
	 -->
    <div class="dropdown">
        <!-- 
			 使用 button 作为父菜单,使用类名: dropdown-toggle 和自定义 data-toggle属性
		  -->
        <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">
			喜欢的频道
			<!-- 设置下拉箭头 -->
			<span class="caret"></span>
		  </button>

        <!-- 下拉菜单项使用一个 ul 列表,并且定义一个类名为 dropdown-menu -->
        <ul class="dropdown-menu">
            <!-- 分组标题: li 添加类名 dropdown-header  来实现分组的功能-->
            <li class="dropdown-header">科普</li>
            <li><a href="#">人与自然</a></li>

            <!-- 分割线: li 添加类名 driver 来实现下拉分割线的功能 -->
            <li class="driver"></li>
            <li class="dropdown-header">影视</li>
            <li class="active"><a href="#">快乐大本营</a></li>
            <li class="disabled"><a href="#">暴走大事件</a></li>
            <li><a href="#">木鱼水心</a></li>

        </ul>
    </div>
</body>
```

![](Bootstrap(一).assets/29.png)



## 9.2、模态框

- 使用方式一：**通过 data 属性**：在控制器元素（比如按钮或者链接）上设置属性`data-toggle="modal"` ，同时设置 `data-target="#identifier"` 或`href="#identifier"` 来指定要切换的特定的模态框(带有 `id ="identifier"` )
- 使用方式二：**通过 JavaScript**：使用这种技术，可以通过简单的一行 JavaScript 来调用带有 `id="identifier"` 的模态框：

### 9.2.1、方式一

```html
<!-- 按钮触发模态框 -->
<button class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">开始演示模态框</button>
<!-- 模态框（Modal） -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">模态框（Modal）标题</h4>
            </div>
            <div class="modal-body">在这里添加一些文本</div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary">提交更改</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
```

![](Bootstrap(一).assets/30.png)





### 9.2.2、方式二

调用带有 `id="identifier"` 的模态框：

- 打开模态框：`$('#identifier').modal('show')`
- 关闭模态框：`$('#identifier').modal('hide')`

```html
</body>
<button class="btn btn-primary btn-lg" id="btn">开始演示模态框</button>
<!-- 模态框（Modal） -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">模态框（Modal）标题</h4>
            </div>
            <div class="modal-body">在这里添加一些文本</div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" id="submit_btn">提交更改</button>
            </div>
        </div>
    </div>
</div>

<script>
    // 绑定按钮的点击事件
    $("#btn").click(function() {
        //手动打开模态框
        $('#myModal').modal('show');
    })

    //关闭模态框
    $("#submit_btn").click(function() {
        //手动关闭模态框
        $('#myModal').modal('hide');
    })
</script>
```

![](Bootstrap(一).assets/31.png)





![](Bootstrap(一).assets/32.png)





## 9.3、模态框常用改法

提供一个模态框的常用改法模板：以添加用户为例(直接复制修改即可)

```html
</body>
<button class="btn btn-primary btn-lg" id="btn">开始演示模态框</button>
<!-- 模态框（Modal） -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">添加用户</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" role="form">
                    <div class="form-group">
                        <label for="uname" class="control-label col-md-2">姓名</label>
                        <div class="col-md-8">
                            <input type="text" id="uname" class="form-control" placeholder="请输入姓名" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="upwd" class="control-label col-md-2">密码</label>
                        <div class="col-md-8">
                            <input type="text" id="upwd" class="form-control" placeholder="请输入密码" />
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" id="submit_btn">提交更改</button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal -->
</div>

<script>
    // 绑定按钮的点击事件
    $("#btn").click(function() {
        //手动打开模态框
        $('#myModal').modal('show');
    })

    //关闭模态框
    $("#submit_btn").click(function() {
        //手动关闭模态框
        $('#myModal').modal('hide');
    })
</script>
```

![](Bootstrap(一).assets/33.png)











