# 1、OpenCV简介

## 1.1、模拟图像和数字图像

- 模拟图像又称**连续图像**，它通过某种物理量（如光、电等）的强弱变化来记录图像亮度信息，所以是连续变换的。模拟信号的特点是容易受干扰，如今已经基本全面被数字图像替代。**成像过程是连续的**，比如传统照相方法所用到的胶片拍出来的相片就是一种模拟图像。
- 数字图像成像过程是从连续到离散，成像结果就是离散的。它是基于传感器的。

## 1.2、数字图像的表示

计算机采用0/1编码的系统，数字图像也是利用0/1来记录信息，我们平常接触的图像都是8位数图像，包含0～255灰度，其中0，代表最黑，1，表示最白。

- 灰度值：0~255
- 像素值：0~1

![](黑马OpenCV(一).assets/1.png)



## 1.3、图像的分类

- 二值图像：二值图像就是将图像上的像素点的灰度值设置为0或者255，也就是将整个图像呈现出明显的黑白效果。
- 灰度图像：有不同深度的灰色和黑白两色
- 彩色图像：彩色图像是每个像素由R、G、B分量构成的图像，其中R、G、B是由不同的灰度级来描述的，有255 * 255 * 255种颜色。

## 1.4、OpenCV安装

OpenCV是一款由Intel公司俄罗斯团队发起并参与和维护的一个**计算机视觉处理开源软件库**，支持与计算机视觉和机器学习相关的众多算法，并且正在日益扩展。

- OpenCV基于C++实现，同时提供python, Ruby, Matlab等语言的接口。OpenCV-Python是OpenCV的Python API，结合了OpenCV C++ API和Python语言的最佳特性。

> 这里可以使用Anaconda创建个虚拟环境，然后在虚拟环境里面安装。当然如果不使用也没关系。

1. 安装`numpy 、matplotlib、opencv-python`

```bash
# OpenCV依赖一些库，比如Numpy和matplotlib
pip install numpy matplotlib
pip install opencv-python
```

2. 查看安装版本

```python
# 安装的是opencv-python，但在导入的时候是import cv2。
import cv2

print(cv2.__version__)
```

3. 安装`opencv-contrib-python`

```bash
pip install opencv-contrib-python
```

- opencv-python 包含最基本的opencv
- opencv-contrib-python 是高配版，带一些收费或者专利的算法。
- 如果报` Could not install packages due to an OSError`问题，则在上述命令后面添加`--user`选项。

> 对于指定版本安装问题，可以去[清华镜像源opencv库](https://pypi.tuna.tsinghua.edu.cn/simple/opencv-python/)查看opencv 和 python 的对应关系。如下图所示，可以看出 opencv-python==3.4.1.15 所对应的 python 版本可以为 `2.7`, `3.4`, `3.5`, `3.6`几个版本
>
> ![](黑马OpenCV(一).assets/2.png)



## 1.5、OpenCV的模块

![](黑马OpenCV(一).assets/3.png)

其中core、highgui、imgproc是最基础的模块，分别介绍如下：

- **core模块**实现了最核心的数据结构及其基本运算，如绘图函数、数组操作相关函数等
- **highgui模块**实现了视频与图像的读取、显示、存储等接口
- **imgproc模块**实现了图像处理的基础方法，包括图像滤波、图像的几何变换、平滑、阈值分割、形态学处理、边缘检测、目标检测、运动分析和对象跟踪等

对于图像处理其他更高层次的方向及应用，OpenCV也有相关的模块实现：

- **features2d模块**用于提取图像特征以及特征匹配，nonfree模块实现了一些专利算法，如sift特征
- **objdetect模块**实现了一些目标检测的功能，经典的基于Haar、LBP特征的人脸检测，基于HOG的行人、汽车等目标检测，分类器使用Cascade Classification（级联分类）和Latent SVM等。
- **stitching模块**实现了图像拼接功能。
- **FLANN模块**（Fast Library for Approximate Nearest Neighbors），包含快速近似最近邻搜索FLANN 和聚类Clustering算法。
- **ml模块**机器学习模块（SVM，决策树，Boosting等等）。
- **photo模块**包含图像修复和图像去噪两部分。
- **video模块**针对视频处理，如背景分离，前景检测、对象跟踪等。
- **calib3d模块**即Calibration（校准）3D，这个模块主要是相机校准和三维重建相关的内容。包含了基本的多视角几何算法，单个立体摄像头标定，物体姿态估计，立体相似性算法，3D信息的重建等等。
- **G-API模块**包含超高效的图像处理pipeline引擎



# 2、OpenCV基本操作

## 2.1、读取图像

```python
import cv2 as cv

cv.imread()
```

参数：

1. 要读取的图像
2. 读取方式的标志
   - 1：以彩色模式加载图像，任何图像的透明度都将被忽略。这是默认参数
   - 0：以灰度模式加载图像
   - -1：包括alpha通道的加载图像模式

**注意：如果加载的路径有错误，不会报错，会返回一个None值**



## 2.2、显示图像

```python
import cv2 as cv

cv.imshow()
```

参数：

1. 显示图像的窗口名称，以字符串类型表示
2. 要加载的图像

> **注意：在调用显示图像的API后，要调用cv.waitKey()给图像绘制留下时间，否则窗口会出现无响应情况，并且图像无法显示出来**。

```python
import cv2 

# 以灰度图的形式读取图像
img=cv2.imread("profile.jpg",0)
cv2.imshow("XiaoLin_image",img)
cv2.waitKey(0)
```

![](黑马OpenCV(一).assets/4.png)







## 2.3、保存图像

```python
import cv2

# 保存
cv2.imwrite("LinXiao.png",img)
```

参数：

- 文件名，要保存在哪里
- 要保存的图像



## 2.4、绘制直线

```python
cv2.line(img,start,end,color,thickness)
```

参数：

- img:要绘制直线的图像
- Start,end: 直线的起点和终点
- color: 线条的颜色
- Thickness: 线条宽度



## 2.5、绘制圆形

```python
cv2.circle(img,centerpoint, r, color, thickness)
```

参数：

- img:要绘制圆形的图像
- Centerpoint, r: 圆心和半径
- color: 线条的颜色
- Thickness: 线条宽度，为-1时生成闭合图案并填充颜色

## 2.6、绘制矩形

```python
cv2.rectangle(img,leftupper,rightdown,color,thickness)
```

参数：

- img:要绘制矩形的图像
- Leftupper, rightdown: 矩形的左上角和右下角坐标
- color: 线条的颜色
- Thickness: 线条宽度



## 2.7、向图像中添加文字

```python
cv2.putText(img,text,station, font, fontsize,color,thickness,cv.LINE_AA)
```

参数：

- img: 图像
- text：要写入的文本数据
- station：文本的放置位置
- font：字体
- Fontsize :字体大小























































































