# 1、PyQt6

PyQt是一个创建GUI应用程序的工具包。它是Python编程语言和Qt库的成功融合。

- QtCore模块包含核心的非GUI功能。该模块用于时间、文件和目录、各种数据类型、流、网址、MIME类型、线程或进程。
- QtGui模块包含图形组件和相关的类，例如按钮、窗体、状态栏、工具栏、滚动条、位图、颜色、字体等
- QtNetwork模块包含了网络编程的类，这些类允许编写TCP/IP和UDP的客户端和服务器，他们使网络编程更简单，更轻便。
- QtXml包含使用XML文件的类，这个模块提供了SAX和DOM API的实现
- QtSvg模块提供显示的SVG文件的类，可缩放矢量图形（SVG）是一种用于描述二维图形和图形应用程序的XML语言。
- QtOpenGL模块使用OpenGL库渲染3D和2D图形，该模块能够无缝集成Qt的GUI库和OpenGL库。QtSql模块提供用于数据库的类。





## 1.1、安装

1. PyQt6库是PyQt的开发库，pyqt6-tools库是QTDesigner设计器工具支持库

```python
# 安装PyQt6
pip install PyQt6 -i https://pypi.tuna.tsinghua.edu.cn/simple

# 安装PyQt6-tools
pip install pyqt6-tools -i https://pypi.tuna.tsinghua.edu.cn/simple
```



2. 配置外部工具QTDesigner

   QTDesigner是QT界面设计器，打开Pycharm - Settings - Tools - External Tools，点击 + 号创建工具，

![](python(九).assets/1.png)

- Name写QTDesigner
- Tool Settings -> Program: 写你Python3的安装目录下designer.exe路径

![](python(九).assets/2.png)

我的本地路径如下:

```bash
D:\HappyDevelop\Python3.9\Lib\site-packages\qt6_applications\Qt\bin\designer.exe
```



3. 配置外部工具PyUIC

   PyUIC是用于将designer生成的ui文件转换成py文件，再点击 + 号创建工具

![](python(九).assets/3.png)

- program填Python路径：我的是`D:\HappyDevelop\Python3.9\python.exe`
- arguments填：`-m PyQt6.uic.pyuic $FileName$ -o $FileNameWithoutExtension$.py`
- working directory填：`$FileDir$`

这样扩展工具里面就有这两个工具了

![](python(九).assets/4.png)





## 1.2、验证

1. 工具 - External Tools - QTDesigner 打开设计器

![](python(九).assets/5.png)



能显示这个 说明 QTDesigner 安装成功,选中 Widget，点击创建

![](python(九).assets/6.png)

拖进来一个 Push Button，然后右下角可以修改属性

![](python(九).assets/7.png)

`Ctrl + R` 可以预览

![](python(九).assets/8.png)



`Ctrl+S`保存，然后选中这个`Demo.ui`，再选择我们的PyUIC，就会在目录下生成一个`Demo.py`的文件

![](python(九).assets/9.png)

















# 2、开始使用

简单玩玩是这样:

![](python(九).assets/10.png)

```python
from PyQt6.QtWidgets import QWidget, QApplication, QLabel
import sys

# 创建一个应用
app = QApplication(sys.argv)

# 创建QWidget控件
window = QWidget()
# 设置标题
window.setWindowTitle("父窗口标题")
# 设置窗口大小
window.resize(600, 600)
# 默认QWidget隐藏,必须显示出来
window.show()

# 创建QLabel控件
label = QLabel()
# 设置QLabel标题
label.setText("子窗口标题")
# 让QLabel在QWidget里面
label.setParent(window)
# 设置QLabel距离父窗口的距离
label.move(100, 100)
# 设置QLabel的样式
label.setStyleSheet("background-color:pink")
# 设置显示
label.show()

# 退出时的模板代码
sys.exit(app.exec())
```

## 2.1、运行ui文件

对于生成的`.ui`文件，怎么运行呢，如下：

```python
import sys

from PyQt6.QtWidgets import QApplication
from PyQt6 import uic

if __name__ == '__main__':
    app = QApplication(sys.argv)
    ui = uic.loadUi("./UI/Demo.ui")
    ui.show()
    sys.exit(app.exec())
```







> 对QT一般般使用啦，待更新....













































