# 1、概览

## 1.0、GPU基础

对计算机而言，**中央处理器 CPU 是主板上的芯片，图形处理器 GPU 是显卡上的芯片。**每台计算机必有主板，但少数计算机可能没有显卡。显卡可以用来加速深度学习的运算速度（GPU 比 CPU 快 10-100 倍）

- 深度学习所需要的显卡是NVIDIA，没有英特尔显卡的无法进行GPU加速。(只能使用CPU版本的PyTorch)



## 1.1、显卡GPU与CUDA

显卡，也就是GPU，主要就是用于在屏幕上显示图像，用于与视频、图像处理相关的任务。

- 独立显卡，性能更强，独立于CPU之外的图形处理单元
- 核显，一般是集成在CPU内部，与CPU共享内存，性能较弱。
- 驱动：让计算机识别特定的硬件

**CUDA是英伟达开发的一个编码平台，有了CUDA，我们就可以操作英伟达品牌的显卡。**





## 1.2、Windows判断是否有NVIDIA GPU

- 检查任务管理器 - 如果GPU中带有 NVIDIA 关键字，则说明有 NVIDIA GPU

![](小土堆PyTorch(一).assets/1.png)

- NVIDIA 显卡中的运算平台是 CUDA，不过，即使您的计算机有 NVIDIA 显卡，但您的显卡中也不一定含有 CUDA，没有的话就要下载 CUDA。
- 而 PyTorch 的下载组件里也会包含一个内置的 cuda。为了区分，**显卡内的 CUDA 用大写，PyTorch 内置的 cuda 用小写**。
- 一般来讲，要满足：CUDA 版本 ≥ cuda 版本。
- 查看 CUDA 版本的方法是：Win+R 后输入 cmd，进入命令提示符，我们需要输入 `nvcc -V`，如果显示 **nvcc -V 不是内部或者外部命令，则说明需要[安装CUDA](#2.5、下载安装/升级大CUDA)**。

![](小土堆PyTorch(一).assets/32.png)



如上图，CUDA的版本是11.8。

# 2、GPU版本-安装Pytorch

GPU版本的前提是确保你的显卡是英伟达 NVIDIA 的。



## 2.1、下载大蟒蛇Anaconda

> 如果自己电脑有Python的解释器和环境变量，最好先卸载掉，使用Geek卸载即可，这里不多赘述。

1. 进入[Anaconda官网](https://www.anaconda.com/)

2. 选择 Products - Anaconda Distribution

![](小土堆PyTorch(一).assets/2.png)





3. 填写电子邮件，获得下载链接



![](小土堆PyTorch(一).assets/3.png)



4. 我这里使用清华镜像站下载：https://mirrors.tuna.tsinghua.edu.cn/anaconda/archive/

![](小土堆PyTorch(一).assets/4.png)



> 对于下载哪个版本，我这里是参考的官网的 Realease Notes 表：Python3.9版本比较稳定一些
>
> - **后悔了，还是直接下载2024年最新的，要玩就玩最新的。**
>
> - [release-notes](https://docs.anaconda.com/anaconda/release-notes/)
>
> ![](小土堆PyTorch(一).assets/5.png)



## 2.2、安装大蟒蛇Anaconda

1. 开始安装

![](小土堆PyTorch(一).assets/6.png)





2. 注意安装路径别带中文

![](小土堆PyTorch(一).assets/7.png)



3. 勾选如下选项

![](小土堆PyTorch(一).assets/8.png)



4. 点击Finish

![](小土堆PyTorch(一).assets/9.png)





5. 添加环境变量（三个全加上），比如我的是：
   - `D:\Develop\Anaconda`
   - `D:\Develop\Anaconda\Scripts`
   - `D:\Develop\Anaconda\Library\bin`

![](小土堆PyTorch(一).assets/10.png)



6. cmd 打开命令窗口行，输入`conda --version`

![image-20240910133507339](小土堆PyTorch(一).assets/11.png)



## 2.3、换清华源

> 参考：官网可换国内源：[Anaconda换镜像源](https://mirrors.tuna.tsinghua.edu.cn/help/anaconda/?eqid=8be486690009fff000000002647c948f)

1. Windows 用户无法直接创建名为 `.condarc` 的文件，可先执行 `conda config --set show_channel_urls yes` 生成该文件之后再修改。

```bash
conda config --set show_channel_urls yes
```

![](小土堆PyTorch(一).assets/14.png)



2. 将如下代码复制进`.condarc`中

```yaml
channels:
  - defaults
show_channel_urls: true
default_channels:
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/msys2
custom_channels:
  conda-forge: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  pytorch: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
envs_dirs:
  - D://HappyDevelop//Anaconda//envs
```

> 注意：一定要空格啥的检查下，我因为多了个空格，浪费了好久时间

3. 使用下列命令清除索引缓存

```bash
conda clean -i
```











## 2.4、更新驱动

1. 进入NVIDIA 驱动官网：https://www.nvidia.cn/geforce/drivers/

![](小土堆PyTorch(一).assets/16.png)



2. 下载Game Ready驱动程序

![](小土堆PyTorch(一).assets/17.png)



3. 安装位置选择默认

![](小土堆PyTorch(一).assets/18.png)



4. 选择NVIDIA图形驱动程序

![](小土堆PyTorch(一).assets/19.png)



5. 选择自定义安装

![](小土堆PyTorch(一).assets/20.png)



6. 执行清洁安装

![](小土堆PyTorch(一).assets/21.png)



7. 安装完成！

![](小土堆PyTorch(一).assets/22.png)



8. 查看显卡驱动版本

```bash
nvidia-smi
```

![](小土堆PyTorch(一).assets/23.png)



## 2.5、下载安装/升级大CUDA

我们显卡的CUDA 版本是11.8，所以下载 ≤ 11.8版本的就可以

- [Cuda toolkit Archive](https://developer.nvidia.com/cuda-toolkit-archive)

![](小土堆PyTorch(一).assets/24.png)



![](小土堆PyTorch(一).assets/25.png)



1. 下载完成后安装

![](小土堆PyTorch(一).assets/26.png)

> 这个目录不需要更改，是一个临时目录，安装完成后它会自动删除。

2. 点击同意并继续

![](小土堆PyTorch(一).assets/27.png)



3. 选择自定义

![](小土堆PyTorch(一).assets/28.png)



4. 只需要选择第一个CUDA

![](小土堆PyTorch(一).assets/29.png)



并且第一个CUDA里面的第四个VS不勾选

![](小土堆PyTorch(一).assets/30.png)

5. 选择安装位置

![](小土堆PyTorch(一).assets/31.png)



> 安装完成后可以回头查看临时解压文件夹,会发现已经消失，就可以删除目录啦。

6. 配置环境变量
   - `D:\SoftDown\CUDA\CUDA Development`
   - `D:\SoftDown\CUDA\CUDA Docunmentation`
   - `D:\SoftDown\CUDA\CUDA Development\bin`
   - `D:\SoftDown\CUDA\CUDA Development\lib\x64`
   - `D:\SoftDown\CUDA\CUDA Development\libnvvp`

7. cmd 打开`nvcc -V`,检查 CUDA 是否安装成功

![](小土堆PyTorch(一).assets/32.png)



## 2.6、安装PyTorch

PyTorch 一分为三：torch、torchvision 与 torchaudio。这三个库中，torch 有 2G左右，而 torchvision 与 torchaudio 只有2M左右，因此一般代码中只会`import torch`，当 torch 的版本给定后，另外两个附件的版本也唯一确定了。

安装 torch 前，先给出一张安装表如下：

- **cu113 即为 cuda 11.3，cp39 极为 Python 3.9**
- 注：NVIDIA 显卡30系列（如 NVIDIA GeForce RTX 3050）只能安全 cu110 及其之后的版本。



![](小土堆PyTorch(一).assets/47.png)

> 在[Links for torch](https://download.pytorch.org/whl/torch/)这个网站，`ctrl+f`搜索`cuxxx`，就可以看到其相关对应关系。例如：
>
> 1. cmd 打开`nvcc -V`,看到我的机器的显卡CUDA版本是`11.8`，那么我的小cuda必须要 ≤ 11.8
>
> ![](小土堆PyTorch(一).assets/32.png)
>
> 2. 在在[Links for torch](https://download.pytorch.org/whl/torch/)这个网站，搜索`cu118`(只要小于cu118即可)可以看到所支持的**torch版本、Python所需要的版本**,由此在创建虚拟环境的时候来指定Python解释器的版本。
>
>    例如解释几个：torch2.5.0 支持的 cuda 是11.8，其中Python是3.9。torch2.4.0 支持的 cuda 是11.8，其中Python是3.9。
>
> ![](小土堆PyTorch(一).assets/48.png)







1. 创建虚拟环境 `KuangStudy_PyTorch_2.4.0`,在`Anaconda Prompt`里面

```bash
conda create -n KuangStudy_PyTorch_2.4.0 python=3.9
```

> Tips：
>
> - 在创建虚拟环境时，我这边一直卡在 `solve environment` 下一步，开始是使用 `Anaconda Prompt` 执行的一直创建不了，之后使用管理员的cmd窗口执行成功，这里我推荐将`Anaconda Prompt` 也使用管理员运行。
> - 如果还是不行，最好把梯子也打开。

2. 激活虚拟环境

```bash
conda activate KuangStudy_PyTorch_2.4.0
```

3. 安装PyTorch
   - [进入官网](https://pytorch.org/get-started/previous-versions/)，`CTRL+F`搜索`pip install torch==2.4.0`

![](小土堆PyTorch(一).assets/33.png)

```bash
pip install torch==2.4.0 torchvision==0.19.0 torchaudio==2.4.0 --index-url https://download.pytorch.org/whl/cu118
```

- 注意：这里使用 pip安装，记得在新建的虚拟环境中执行。
- 看代码的意思：使用pip安装三个库，分别是torch2.4.0、torchvision0.19.0、torchaudio2.4.0，后面的url也就是要下载的地方，先下载后安装的意思。

> 上述安装如果网络不好很容易失败，根据代码我们可以进入上面的url`https://download.pytorch.org/whl/cu18`
>
> ![](小土堆PyTorch(一).assets/49.png)
>
> 比如torch的版本是`2.4.0+cu118`，下载windows下的whl轮子文件即可。
>
> ![](小土堆PyTorch(一).assets/50.png)
>
> 比如torchvision的版本是`0.19.0+cu118`，下载windows下的whl轮子文件即可。
>
> ![](小土堆PyTorch(一).assets/51.png)
>
> 下载好后安装，安装命令为`pip install 路径\轮子名.whl`，比如我的都在`D:\HappyDevelop\Anaconda\whl`目录下，将下列命令放在新建虚拟环境后执行即可。
>
> ```bash
> pip install D:\HappyDevelop\Anaconda\whl\torch-2.4.0+cu118-cp39-cp39-win_amd64.whl
> pip install D:\HappyDevelop\Anaconda\whl\torchvision-0.19.0+cu118-cp39-cp39-win_amd64.whl
> pip install D:\HappyDevelop\Anaconda\whl\torchaudio-2.4.0+cu118-cp39-cp39-win_amd64.whl
> ```
>

4. 安装完毕后可查看当前环境的所有库

```bash
conda list
```

![](小土堆PyTorch(一).assets/54.png)



可以看到torch三大组件的版本，并且其版本后有`+cu118`。

或者

```bash
python

import torch

torch.cuda.is_available()
```

![](小土堆PyTorch(一).assets/34.png)







## 2.7、配置PyCharm

1. 添加本地解释器

![](小土堆PyTorch(一).assets/35.png)







2. 选择`Conda环境`，目录选择`D:\Develop\Anaconda\Library\bin\conda.bat`

![](小土堆PyTorch(一).assets/36.png)

3. 运行

```python
import torch

print(torch.cuda.is_available())
```

![](小土堆PyTorch(一).assets/37.png)

这样我们就搞定了！









## 2.8、启动Anaconda

1. 在开始菜单点击 Anaconda Navigator

![](小土堆PyTorch(一).assets/12.png)



2. 若能打开如下页面，则说明安装成功

![](小土堆PyTorch(一).assets/13.png)





# 3、CPU版本-安装Pytorch

## 3.1、AMD卡前置动作

CPU版本的前置动作和GPU版本是一致的，如果你看到这里，大概率你是AMD卡哈哈哈哈，害，博主两个卡都有，都记录一下：

1. [下载大蟒蛇Anaconda](#2.1、下载大蟒蛇Anaconda)
2. [安装大蟒蛇Anaconda](2.2、安装大蟒蛇Anaconda)
3. [换清华源](2.3、换清华源)
4. AMD卡别更乱驱动哈
5. 安装PyTorch见下面





## 3.2、安装PyTorch

1. 创建虚拟环境 `KuangStudy_PyTorch_2.4.0`,在`Anaconda Prompt`里面

```bash
conda create -n KuangStudy_PyTorch_2.4.0 python=3.9
```

2. 激活虚拟环境

```bash
conda activate KuangStudy_PyTorch_2.4.0
```

3. 安装PyTorch（🔥**注意：这一点命令不一样**）

- [官网命令](https://pytorch.org/get-started/previous-versions/)

```python
pip install torch==2.4.0 torchvision==0.19.0 torchaudio==2.4.0 --index-url https://download.pytorch.org/whl/cpu
```

![](小土堆PyTorch(一).assets/52.png)

> 当然上述命令如果网络差可能出问题，所以可参照GPU版本的情况，其他将whl轮子文件下载下来，这里就不作赘述啦，不记得请返回看[2.6、安装PyTorch](#2.6、安装PyTorch)

4. 安装完成后可`conda list`查看库,可以看到三个库都是`+cpu`版本的

![](小土堆PyTorch(一).assets/53.png)

```bash
python

import torch

# cpu版本的是false，因为本来A卡就没有CUDA
torch.cuda.is_available()

torch.__version__
```





# 4、创建虚拟环境

1. 利用 conda create 指令创建新的虚拟环境

```bash
conda create -n 虚拟环境名字 python=版本

# 添加镜像加速
conda create -n 虚拟环境名字 python=版本 -c 镜像地址

# 使用虚拟环境
conda activate 虚拟环境名字
```

镜像地址如下：

- 清华镜像：https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main

```bash
# 删除虚拟环境
conda remove -n 虚拟环境名字 --all

# 持久添加通道(可以理解为增加镜像地址)
conda config --add channels 通道地址

# 删除通道(删除镜像)
conda config --remove channels 通道地址

# 查看镜像地址
conda config --get
```

![](小土堆PyTorch(一).assets/38.png)

越向后镜像优先级越高。

> conda list 查看虚拟环境下的包

# 5、踩坑记录

## 5.1、新建虚拟环境总存在C盘

> Tips：`conda env list` 如果发现新建的虚拟环境是在C盘，如下：
>
> ![](小土堆PyTorch(一).assets/39.png)
>
> 则需要进行设置：
>
> - [新建的虚拟环境总是在c盘怎么解决](https://blog.csdn.net/weixin_48373309/article/details/127830801)
>
> 



## 5.2、删除虚拟环境后仍然可以看到虚拟环境

`conda remove -n env_name --all`删除虚拟环境使用`conda env list`发现仍可以看见该虚拟环境。

所以删除虚拟环境可以使用两条命令：

```bash
conda remove -n env_name --all

conda env remove -n env_name
```







## 5.3、删除anaconda中创建的虚拟环境后c盘的空间没有增多

安装PyTorch配置环境的时候因为下载了一些包，C盘大概少了10个GB，在5.2删除虚拟空间和包后C盘空间并未增加，还需使用命令：

```bash
conda clean -p
```

该命令可以删除没用的包.

![](小土堆PyTorch(一).assets/40.png)







## 5.4、安装Pytorch出现ClobberError

ClobberError : This transaction has incompatible packages due to a shared path.

- conda 和 pip 等相关包的版本太低，自动更新不能用
- 解决方案：在命令行中输入以下命令

```bash
conda clean --all
conda update --all
```





## 5.5、Multiple Errors Encountered

在使用`Anaconda Navigator`安装第三方库时报这个错误。

1. cmd输入`conda info`,显示`base environmental`为 read only

![](小土堆PyTorch(一).assets/41.png)

2. 找到Anaconda的安装目录，右键 - 属性 - 安全 - 选择 Users 权限为全勾选



![](小土堆PyTorch(一).assets/42.png)



3. OK

![](小土堆PyTorch(一).assets/43.png)





## 5.6、启动Jupyter notebook无法访问文件夹

启动Jupyter notebook无法访问目标文件夹，或者提示`Permission Denied`，解决办法和上面一样，将无法访问的目标文件夹给加权限即可。







## 5.7、Jupyter Notebook没有Python [conda env:pytorch]

在 Jupyter Notebook 主页新建没有 Python [conda env:pytorch]。

1. conda activate 虚拟环境名称
2. conda install jupyter ipykernel 安装ipykernel

事实上前两步之前已经做过了，重要的是第三步，激活内核：

```bash
# python -m ipykernel install --user --name xxx --display-name xxx
# xxx 最好还是和虚拟环境名称一致，例如我的就是
python -m ipykernel install --user --name KuangStudy_PyTorch_2.4.0 --display-name KuangStudy_PyTorch_2.4.0
```

![](小土堆PyTorch(一).assets/44.png)













## 5.8、新建虚拟环境报CondaVerificationError: The package for python located at`xxxx`

新建环境时候报`CondaVerificationError: The package for python located at C:\Users\Augenestern\.conda\pkgs\python-3.9.20-h8205438_1
appears to be corrupted. The path 'tcl/tix8.4.3/pref/TK.cs'
specified in the package manifest cannot be found.`



> 解决办法：按上方的提示把`C:\Users\Augenestern\.conda\pkgs`**下所有的包删掉就可以了**







## 5.9、pip install 时出现Fatal error in launcher: Unable to create process using

在刚创建完虚拟环境使用 pip install 下载包时，出现Fatal error in launcher: Unable to create process using，解决办法如下：

1. 下载当前环境下的pip

```python
python -m pip uninstall pip
```

2. 重新下载pip

```python
conda install pip
```





## 5.10、conda list 和 pip list

我们有时候需要看某个虚拟环境下是否安装了某些包：

```bash
# 查看虚拟环境
conda env list

# 激活虚拟环境
conda activate KuangStudy_Ai

# 查看虚拟环境安装的包
conda list 
pip list
```

- `conda list`：`conda list` 列出的是通过 Conda 安装的所有包，这些包可以是 Python 包，也可以是其他语言的库或者系统依赖项。而 `pip list` 只列出通过 `pip` 安装的 Python 包。
- `conda list` 列出的是当前激活环境中的包。你可以通过 `conda activate` 命令切换不同的环境，然后使用 `conda list` 查看对应环境的包。

> 大白话：
>
> - 在某个虚拟环境A中，使用 `conda list` 可以查看此虚拟环境中通过 Conda 安装的包
> - `pip list` 是列出通过 `pip` 安装的包，没有什么环境之分。
> - 所以我这边发现的一个问题是我在虚拟环境A中 `import xxx`，这个xxx包在虚拟环境中并没有，但是依然可以导入，这说明导入的是 `pip` 的包。

```bash
# Windows
conda list | findstr numpy

pip list | findstr numpy
```











