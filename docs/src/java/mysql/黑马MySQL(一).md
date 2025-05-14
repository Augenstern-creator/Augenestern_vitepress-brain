# 1、数据库

| 关系型数据库(RDBMS)                 | 非关系型数据库(NoSQL)           |
| ----------------------------------- | ------------------------------- |
| Oracle->老大，最挣钱的数据库        | Redis->最好的缓存数据库         |
| MySQL->最流行中型数据库             | MongoDB->最好的文档行数据库     |
| SQL server-> Windows上最好的数据库  | Elasticsearch->最好的搜索服务   |
| PostgreSQL-> 功能最强大的开源数据库 | Cassandra->最好的列式数据库     |
| SQLite->最流行的嵌入式数据库        | HBase->优秀的分布式、列式数据库 |

## 1.1、MySQL安装

MySQL的安装有两种方式：

- 一种是解压方式
- 一种是安装包方式

### 1.1.1、解压包下载

1. 进入下载地址：https://downloads.mysql.com/archives/community/

![](黑马MySQL(一).assets/1.png)

2. 下载完成后解压，将其解压再没有中文和空格的目录下

![](黑马MySQL(一).assets/2.png)

3. 在解压目录创建 `my.ini` 文件并添加内容如下

![](黑马MySQL(一).assets/3.png)

```ini
[mysqld]
# 设置3306端口
port = 3306
character-set-server = utf8
# 创建新表时将使用的默认存储引擎
default-storage-engine = INNODB
[mysql]
# 设置mysql客户端默认字符集
default-character-set = utf8
[client]
# 设置mysql客户端连接服务端时默认使用的端口
port = 3306
default-character-set = utf8
```

4. 配置系统环境
   1. 新建
   2. 环境变量名：`MYSQL_HOME`,变量值是MySQL的解压路径

![](黑马MySQL(一).assets/4.png)



5. 将`MYSQL_HOME` 添加到 PATH 环境变量
   1. 点击 Path->编辑
   2. 新建： `%MYSQL_HOME%\bin`

![](黑马MySQL(一).assets/5.png)

S4!eg#oiLyPV

6. 使用管理员权限进入DOS，在cmd中，`进入解压目录下的bin目录`依次执行以下命令：     

   1. 对mysql进行初始化，请注意，这里会生产一个临时密码，后边要使用这个临时密码

      ```
      mysqld --initialize --user=mysql --console
      ```

      ![](黑马MySQL(一).assets/23.png)

   2. 安装mysql服务
   
      ```
      mysqld --install 
      ```

   3. 启动mysql服务
   
      ```
      net start mysql
      ```

   4. 登录mysql，这里需要使用之前生产的临时密码
   
      ```
      mysql -uroot –p   
      ```

   5. 修改root用户密码

      **表明，用户名为 ‘root’ ， 密码为‘123456’**
   
      ```
      ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';
      ```

   6. 修改root用户权限
   
      ```
      create user 'root'@'%' IDENTIFIED WITH mysql_native_password BY '123456';
      ```
   
      





### 1.1.2、安装包下载

1. 下载地址：https://downloads.mysql.com/archives/installer/

![](黑马MySQL(一).assets/6.png)



2. 选择默认安装

![](黑马MySQL(一).assets/7.png)

![](黑马MySQL(一).assets/8.png)



![](黑马MySQL(一).assets/9.png)





![](黑马MySQL(一).assets/10.png)





![](黑马MySQL(一).assets/11.png)

![](黑马MySQL(一).assets/12.png)![](黑马MySQL(一).assets/13.png)



![](黑马MySQL(一).assets/14.png)



### 1.1.3、查看 

以管理员启动命令提示符(cmd)，输入`mysql --version`，出现版本号则表示安装成功





## 1.2、MySQL的卸载

1. 停止服务

   打开DOS，使用`net stop mysql`

2. 打开控制面板 -> 右键卸载 mysql==(可选，如果采用第二步安装包方式则需执行这一步)==
3. 进入 mysql 安装位置，删除 mysql 的解压文件夹
4. 删除C盘下的 `C:\ProgramData\MySQL` 所有文件==(可选，如果采用第二步安装包方式则不需执行这一步)==

5. 删除注册表信息

   - Win+R 输入 `regedit` 命令打开注册表窗口，删除以下文件

   - 可能由于电脑原因，下方三个文件有则删除，无则不用管，例如我的电脑只有1、3文件

   - ```
     HKEY_LOCAL_MACHINE\SYSTEM\ControlSet001\Services\EventLog\Application\MySQL
     HKEY_LOCAL_MACHINE\SYSTEM\ControlSet002\Services\EventLog\Application\MySQL
     HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\EventLog\Application\MySQL
     ```

![](黑马MySQL(一).assets/15.png)

6. 删除环境变量

   将高级系统设置->环境变量，删除环境变量的 `MYSQL_HOME`变量和Path变量中的 mysql 路径

7. 删除MYSQL服务

   管理员权限打开cmd -> `sc delete MySQL服务名称`

   这里的`MySQL服务名称`，在任务管理器可以看到，如图，我的是`mysqld`

![](黑马MySQL(一).assets/16.png)





## 1.3、MySQL图形开发管理工具

### 1.3.1、Navicat安装和使用

1. 官网下载页面：http://www.navicat.com.cn/download/navicat-premium

![](黑马MySQL(一).assets/17.png)



![](黑马MySQL(一).assets/18.png)



2. 下载之后直接安装，安装一直点击下一步即可，中间可以更换安装路径、创建桌面快捷方式等
3. 当然上述步骤是官方的试用，如何长久使用，直接在百度搜索方法更新换代很快，但80%都有用，这里就不做记录了😅。

4. 连接

![](黑马MySQL(一).assets/20.png)





### 1.3.2、SQLYog安装和使用



1. 官网下载页面：https://sqlyog.en.softonic.com/

![](黑马MySQL(一).assets/19.png)



2. 下载之后直接安装，安装一直点击下一步即可，中间可以更换安装路径、创建桌面快捷方式等

3. 连接

![](黑马MySQL(一).assets/21.png)



![](黑马MySQL(一).assets/22.png)











