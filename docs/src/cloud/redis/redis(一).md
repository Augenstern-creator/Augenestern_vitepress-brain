# 1、redis

- https://blog.csdn.net/unique_perfect/article/details/105515137

- https://blog.csdn.net/qq_42146402/article/details/130204064



## 1.1、数据库分类

- 目前数据库分：关系型数据库与非关系型数据库

- 常用的关系型数据库： Oracle，**MySQL**，SqlServer，DB2

- 常用的非关系数据库：**Redis**，MongoDB，ElasticSearch， Hbase，Neo4j

- 那啥是非关系数据库呢？此处涉及到新名词：NoSQL

- **NoSQL**最常见的解释是"non-relational"， "Not Only SQL"也被很多人接受。NoSQL仅仅是一个概念，泛指非关系型的数据库，区别于关系数据库，它们不保证关系数据的ACID特性。

如商城网站中对商品数据频繁查询、对热搜商品的排行统计、订单超时问题、以及微信朋友圈音频、视频存储等相关使用传统的关系型数据库实现就显得非常复杂，虽然能实现相应功能但是在性能上却不是那么乐观。NoSQL这个技术门类的出现，更好的解决了这些问题，它告诉了世界不仅仅是sql。





## 1.2、NoSQL分类



| 分类                      | 举例           | 典型应用场景                                                 | 数据模型              | 优点                             | 缺点                               |
| ------------------------- | -------------- | ------------------------------------------------------------ | --------------------- | -------------------------------- | ---------------------------------- |
| 键值(key-value)存储数据库 | redis          | 内容缓存，主要用于处理大量数据的高访问负载，也用于一些日志系统等。 | 通常用HashTable来实现 | 查找速度快                       | 数据无结构化                       |
| 列存储数据库              | HBase          | 分布式的文件系统                                             | 将同一列数据存在一起  | 查找速度块，更容易进行分布式扩展 | 功能相对局限                       |
| 文档型数据库              | MongoDB        |                                                              |                       |                                  | 查询性能不高，且缺乏统一的查询语法 |
| 图形数据库                | Infinite Graph | 社交网络，专注于构建关系图谱                                 | 图结构                | 利用图数据结构相关算法           | 对整个图进行计算才能得到需要的信息 |







## 1.3、redis简介

redis是以key-value形式存储，和传统的关系型数据库不一样。不一定遵循传统数据库的一些基本要求。

优点：

- **对数据高并发读写**(直接是内存中进行读写的)
- 对海量数据的高效率存储和访问
- 对数据的可拓展性和高可用性
- **单线程操作**,每个操作都是原子操作,没有并发相关问题

缺点：

- 无法做太复杂的关系数据库模型
- redis(ACID处理非常简单) 

> redis 定位是缓存，提高数据读写速度，减轻对数据库存储和访问压力。**redis是一个内存型的数据库**



## 1.4、redis应用

- 任务队列，如秒杀、抢购、购票排队等
- 即时信息查询，如各位排行榜、各类网站访问统计、公交到站信息
- 为热点数据加速查询（主要场景），如热点商品、热点新闻

- 消息队列、分布式锁



## 1.5、如何学习redis

- redis 在线入门 ： http://try.redis.io/
- redis 中文资料官网： http://www.redis.cn/
- redis 中文教程：https://www.runoob.com/redis/redis-tutorial.html

- redis官网：https://redis.io/download/



# 2、redis的安装



## 2.1、Windows安装

- windows版：https://github.com/microsoftarchive/redis/releases/tag/win-3.2.100

> 傻瓜式安装，一直下一步就可以了，**注意要添加到环境变量中**

![](redis(一).assets/1.png)



默认端口：

![](redis(一).assets/2.png)



最大内存

![](redis(一).assets/3.png)



测试是否成功：

- `win+r` 输入 `redis-cli`

![](redis(一).assets/4.png)





### 2.2.1、客户端redis管理工具

`AnotherRedisDesktopManager` 工具可以用来可视化管理redis，可以理解为 MySQL的 Sqlyog、Navicat等管理工具。

- Github： [GUI client\], compatible with Linux, Windows, Mac. (github.com)](https://github.com/qishibo/AnotherRedisDesktopManager)
- Gitee：[AnotherRedisDesktopManager 发行版 - Gitee.com](https://gitee.com/qishibo/AnotherRedisDesktopManager/releases)

![](redis(一).assets/5.png)

下载完成后安装即可：

![](redis(一).assets/6.png)





## 2.2、Linux安装🔥

1. 进入Linux官网下载最新稳定版本：https://redis.io/download/

![](redis(一).assets/7.png)

2. 将其上传至 Linux 服务器目录下 `/www/server/redis` 中，并进行解压。

   我这里使用 `wget` 命令下载，和上述步骤作用一致

```bash
# 进入/www/server/redis目录下载
wget https://github.com/redis/redis/archive/7.2.3.tar.gz
http://github.com/redis/redis/archive/7.2.3.tar.gz
# 解压
tar -zxvf 7.2.3.tar.gz
```

3. 进入到解压目录，执行编译命令

```bash
# 进入到解压目录
cd redis-7.2.3/

# 执行编译命令
make
```

4. 进行安装

```bash
# 安装,默认是安装到 /usr/local/bin 目录
make install
```

![](redis(一).assets/8.png)



> 共安装了三个组件：redis server服务器、redis-cli客户端与一个性能测试工具 benchmark

5. 新建一个系统服务文件：

```bash
vi /etc/systemd/system/redis.service
```

内容如下：

```bash
[Unit]
Description=redis-server
After=network.target

[Service]
Type=forking
ExecStart=/usr/local/bin/redis-server /www/server/redis/redis-7.2.3/redis.conf
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

6. 进入`/www/server/redis/redis-7.2.3`，先拷贝`redis.conf`，然后进行修改

```bash
# 拷贝
cp redis.conf redis.conf.back
```

修改`redis.conf`的配置

```bash
# 允许访问的地址，默认是127.0.0.1，会导致只能在本地访问。修改为0.0.0.0则可以在任意IP访问，生产环境不要设置为0.0.0.0
bind 0.0.0.0
# 守护进程，修改为yes后即可后台运行
daemonize yes 
```



7. 然后重载系统服务

```bash
systemctl daemon-reload
```

8. 现在，我们可以用下面这组命令来操作redis了：

```bash
# 启动
systemctl start redis
# 停止
systemctl stop redis
# 重启
systemctl restart redis
# 查看状态
systemctl status redis
```

9. 执行下面的命令，可以让redis开机自启：

```bash
systemctl enable redis
```





![](redis(一).assets/10.png)

10. 查看 redis 版本

```bash
# 查看服务端版本
redis-server -v

# 查看客户端版本
redis-cli -v
```









### 2.2.1、redis核心文件

在 `/usr/local/bin` 目录中，可以看到如下文件：

![](redis(一).assets/11.png)



- `redis-serve` ： 服务器启动命令
- `redis-cli` ： 命令行客户端
- `redis-benchmark` ： redis 性能测试工具
- `redis-check-aof` ：AOF文件修复工具
- `redis-check-dump` ：RDB文件检查工具（快照持久化文件）

通过`echo $PATH` 可以看到，`/usr/local/bin` 目录是存在于该系统变量中的，这样这些命令就可以在任意目录中执行了，这就是为什么我们在任意目录都可以直接使用`redis-cli` 进行命令行

![](redis(一).assets/12.png)







### 2.2.2、启动方式

- 方式一：前台启动，安装完成后，在任意目录输入redis-server命令即可启动Redis

```bash
redis-server
```

这种启动属于`前台启动`，会阻塞整个会话窗口，窗口关闭或者按下`CTRL + C`则Redis停止。不推荐使用。



- 方式二：指定配置文件启动，如果要让Redis以`后台`方式启动，则必须修改Redis配置文件，就在我们之前解压的redis安装包下（`/www/server/redis/redis-7.2.3`），名字叫`redis.conf`

  1. 我们先将这个配置文件备份一份：

     ```bash
     cp redis.conf redis.conf.back
     ```

  2. 然后修改redis.conf文件中的一些配置：

     ```bash
     # 允许访问的地址，默认是127.0.0.1，会导致只能在本地访问。修改为0.0.0.0则可以在任意IP访问，生产环境不要设置为0.0.0.0
     bind 0.0.0.0
     # 守护进程，修改为yes后即可后台运行
     daemonize yes 
     # 密码，设置后访问Redis必须输入密码
     requirepass 1234
     ```

  3. Redis的其它常见配置：

     ```bash
     # 监听的端口
     port 6379
     # 工作目录，默认是当前目录，也就是运行redis-server时的命令，日志.持久化等文件会保存在这个目录
     dir .
     # 数据库数量，设置为1，代表只使用1个库，默认有16个库，编号0~15
     databases 1
     # 设置redis能够使用的最大内存
     maxmemory 512mb
     # 日志文件，默认为空，不记录日志，可以指定日志文件名
     logfile "redis.log"
     ```

  4. 启动Redis：

     ```bash
     # 进入redis安装目录 
     cd /www/server/redis/redis-7.2.3
     # 启动
     redis-server redis.conf
     ```

  5. 停止redis

     ```bash
     # 利用redis-cli来执行 shutdown 命令，即可停止 Redis 服务，
     # 因为之前配置了密码，因此需要通过 -u 来指定密码
     redis-cli -u 1234 shutdown
     ```

- 方式三是开机自启，已经在2.2目录进行了设置

> 当给`redis.conf` 设置了密码`requirepass 1234`，则启动时需要`auth 1234`

![](redis(一).assets/22.png)

### 2.2.3、redis桌面客户端

#### 1、redis命令行客户端

Redis安装完成后就自带了命令行客户端：redis-cli，使用方式如下：

```bash
redis-cli [options] [commonds]
```

其中常见的options有：

- `-h 127.0.0.1`：指定要连接的redis节点的IP地址，默认是127.0.0.1
- `-p 6379`：指定要连接的redis节点的端口，默认是6379
- `-a 1234`：指定redis的访问密码 

其中的commonds就是Redis的操作命令，例如：

- `ping`：与redis服务端做心跳测试，服务端正常会返回`pong`



#### 2、图形化桌面客户端

- [AnotherRedisDesktopManager](https://gitee.com/qishibo/AnotherRedisDesktopManager)

- 进去下载 exe 文件即可
- 使用教程：https://blog.csdn.net/zsewer/article/details/129325846

> 注意：在连接的时候请确保服务器的防火墙端口打开`6379`，否则会连接不上

# 3、数据类型

## 3.1、概况

Redis支持的存储数据类型有很多：

- 常用：**string**（字符串），**hash**（哈希），**list**（列表），**set**（集合）及**zset**(sorted set：有序集合)

- 不常用：HyperLogLog，Bitmap(位图)，Bloom Filter(布隆过滤器)，Geospatial(地理位置) ，Module(模块)， Streams(流信息)



**命令格式**

| 类型命令 | key  | value    |
| -------- | ---- | -------- |
| set      | name | zhangsan |

**操作建议**

- Redis操作有点类似Java的Map集合，都是key-value形式存储数据，在学习过程中，可以进行类比。

- 另外Redis中的key大部分为String类型，value值根据**缓存数据**结构可以选用：string，hash，list，set，zset等类型。

> **注意：下面讲的各种类型，表述的是缓存数据的value类型。**







## 3.2、String类型

String类型包含多种类型的特殊类型，并且是二进制安全的，其值可以是数值，可以是字符串，也可以是二进制数据。

![](redis(一).assets/18.png)

### 3.2.1、常用的命令

| 命令格式                | 功能                                               | 案例                | 说明                             |
| ----------------------- | -------------------------------------------------- | ------------------- | -------------------------------- |
| set key value           | 将key-value缓存redis中                             | set name qxl        | 设置name字段为qxl                |
| get key                 | 从redis中获取key对应value值                        | get name            | 获取name字段对应的value          |
| incr key                | 将key对应value值 + 1                               | incr age            | 给age字段+1                      |
| decr key                | 将key对应value值-1                                 | decr age            | 给age字段-1                      |
| setex key seconds value | 将key-value缓存到redis中，seconds 秒后失效         | setex  sex  10  man | 将sex字段设置为10s的man          |
| ttl key                 | 查看key存活时间                                    | ttl sex             | 查看sex字段对应的 value 存活时间 |
| del  key                | 从redis中删除key                                   | del name            | 删除name字段                     |
| setnx key value         | 如果key已经存，不做任何操作，如果key不存，直接添加 | setnx  name xiaofei |                                  |

普通字符串的基本操作：

```bash
# 设置 key-value 类型的值
> SET name lin
OK

# 根据 key 获得对应的 value
> GET name
"lin"

# 判断某个 key 是否存在
> EXISTS name
(integer) 1

# 返回 key 所储存的字符串值的长度
> STRLEN name
(integer) 3

# 删除某个 key 对应的值
> DEL name
(integer) 1
```



### 3.2.2、非常用命令

| 命令格式                    | 功能                                                      | 案例                   |
| --------------------------- | --------------------------------------------------------- | ---------------------- |
| incrby key increment        | 给key对应值加increment                                    | incrby age 10          |
| mset k1 v1 k2 v2....        | 批量添加k1v1 k2v2 key value对                             | mset name dafei age 18 |
| mget k1  k2....             | 批量获取k1, k2的值                                        | mget name  age         |
| append key  value           | 在key对应的value值中拼+value                              | append name yes        |
| setrange key  offset  value | 修改key对应的value值,替换为指定value,冲offset索引位置开始 | setrange name 2   xx   |

批量设置：

```bash
# 批量设置 key-value 类型的值
> MSET key1 value1 key2 value2 
OK

# 批量获取多个 key 对应的 value
> MGET key1 key2 
1) "value1"
2) "value2"
```

计数器（字符串的内容为整数的时候可以使用）：

```bash
# 设置 key-value 类型的值
> SET number 0
OK

# 将 key 中储存的数字值增一
> INCR number
(integer) 1

# 将key中存储的数字值加 10
> INCRBY number 10
(integer) 11

# 将 key 中储存的数字值减一
> DECR number
(integer) 10

# 将key中存储的数字值键 10
> DECRBY number 10
(integer) 0
```

过期（默认为永不过期）：

```bash
# 设置 key 在 60 秒后过期（该方法是针对已经存在的key设置过期时间）
> EXPIRE name  60 
(integer) 1
# 查看数据还有多久过期
> TTL name 
(integer) 51

#设置 key-value 类型的值，并设置该key的过期时间为 60 秒
> SET key  value EX 60
OK
> SETEX key  60 value
OK
```

不存在就插入：

```bash
# 不存在就插入（not exists）
>SETNX key value
(integer) 1
```





### 3.2.3、应用场景

1. 缓存对象：使用 String 来缓存对象有两种方式：

   - 直接缓存整个对象的 JSON，命令例子： `SET user:1 '{"name":"xiaolin", "age":18}'`。
   - 采用将 key 进行分离为 user:ID:属性，采用 MSET 存储，用 MGET 获取各属性值，命令例子： `MSET user:1:name xiaolin user:1:age 18 user:2:name xiaomei user:2:age 20`。

2. 主页高频访问信息显示控制，例如新浪微博大V主页显示粉丝数与微博数量。这就是常规计数，计算访问次数、点赞次数、转发次数等。

3. 共享session：

   - 通常我们在开发后台管理系统时，会使用 Session 来保存用户的会话(登录)状态，这些 Session 信息会被保存在服务器端，但这只适用于单系统应用，如果是分布式系统此模式将不再适用。

   - 例如用户一的 Session 信息被存储在服务器一，但第二次访问时用户一被分配到服务器二，这个时候服务器并没有用户一的 Session 信息，就会出现需要重复登录的问题，问题在于分布式系统每次会把请求随机分配到不同的服务器。

     ![](redis(一).assets/14.png)

   - 出于负载均衡的考虑，分布式服务会将用户信息的访问均衡到不同服务器上，用户刷新一次访问可能会需要重新登录，为避免这个问题可以用redis将用户session集中管理，  在这种模式下只要保证redis的高可用和扩展性的，每次获取用户更新或查询登录信息都直接从redis中集中获取。

     ![](redis(一).assets/15.png)







## 3.3、Hash类型

Hash 是一个键值对（key - value）集合，其中 value 的形式如： `value=[{field1，value1}，...{fieldN，valueN}]`。Hash类型特别适合存储对象：



![](redis(一).assets/13.png)

类似Java中：**Map<String, Map<String, ?>> map**



### 3.3.0、内部实现

Hash 类型的底层数据结构是由**压缩列表或哈希表**实现的：

- 如果哈希类型元素个数小于 `512` 个，所有值小于 `64` 字节的话，Redis 会使用**压缩列表**作为 Hash 类型的底层数据结构；
- 如果哈希类型元素不满足上面条件，Redis 会使用**哈希表**作为 Hash 类型的 底层数据结构

> **在 Redis 7.0 中，压缩列表数据结构已经废弃了，交由 listpack 数据结构来实现了**。

### 3.3.1、常用的命令

| 命令格式                       | 功能                                                | 案例                 | 说明                          |
| ------------------------------ | --------------------------------------------------- | -------------------- | ----------------------------- |
| hset key field  value          | 将field  value对缓存到redis中hash中，键值为key      | hset user name dafei | 给user中的name字段设置为dafei |
| hget key field                 | 从key对应hash列表中获取field字段                    | hget user  name      | 获取user中的name字段          |
| hexists key  field             | 判断key对应的hash列表是否存在 field字段             | hexists user age     | 判断user中是否存在age字段     |
| hdel key  field                | 删除key对应hash列表中field字段                      | hdel user age        | 删除user中的age字段           |
| hincrby  key  field  increment | 给key对应hash列表中field字段 + increment            | hincrby user  age 10 | 给user中的age字段+10          |
| hlen key                       | 查看key对应的hash列表field的数量                    | hlen user            | 查看user中的所有 key          |
| hkeys  key                     | 获取key对应的hash列表所有的field值                  | hkeys  user          | 获取user中的所有 key          |
| hvals  key                     | 获取key对应的hash列表所有的field对应的value值       | hvals  user          | 获取user中的所有value         |
| hgetall key                    | 获取key对应的hash列表中所有的field及其对应的value值 | hgetall user         | 获取user中的所有 key 和 value |

```bash
# 存储一个哈希表key的键值
HSET key field value   
# 获取哈希表key对应的field键值
HGET key field

# 在一个哈希表key中存储多个键值对
HMSET key field value [field value...] 
# 批量获取哈希表key中多个field键值
HMGET key field [field ...]       
# 删除哈希表key中的field键值
HDEL key field [field ...]    

# 返回哈希表key中field的数量
HLEN key       
# 返回哈希表key中所有的键值
HGETALL key 

# 为哈希表key中field键的值加上增量n
HINCRBY key field n  
```



> Hash类型数据操作的注意事项：
>
> - Hash类型下的 value 只能存储字符串，不允许存储其他数据类型
> - Hash设计的初衷不是为了存储大量对象的，切记不可滥用。



### 3.3.2、应用场景

- **缓存对象**：Hash 类型的 （key，field， value） 的结构与对象的（对象id， 属性， 值）的结构相似，也可以用来存储对象。我们以用户信息为例，它在关系型数据库中的结构是这样的：

  | uid  | name  | age  |
  | ---- | ----- | ---- |
  | 1    | Tom   | 15   |
  | 2    | Jerry | 13   |

  我们可以使用如下命令，将用户对象的信息存储到 Hash 类型：

  ```bash
  # 存储一个哈希表uid:1的键值
  > HMSET uid:1 name Tom age 15
  2
  # 存储一个哈希表uid:2的键值
  > HMSET uid:2 name Jerry age 13
  2
  # 获取哈希表用户id为1中所有的键值
  > HGETALL uid:1
  1) "name"
  2) "Tom"
  3) "age"
  4) "15
  ```

  > 一般对象用 String + Json 存储，对象中某些频繁变化的属性可以考虑抽出来用 Hash 类型存储。

- **电商网站购物车设计**

  - 以客户id作为key，每位客户创建一个hash存储结构存储对应的购物车信息。将商品编号作为field，购买数量作为value进行存储

    | key  | value                                         |
    | ---- | --------------------------------------------- |
    | id   | {<br>name: dafei<br>field:001<br>value:3<br>} |

  - 添加购物车：追加全新的field与value

  - 浏览购物车：遍历hash

  - 更改购物车数量：自增/自减，设置value值

  - 删除购物车商品：删除field

  - 清空购物车：删除key



## 3.4、List类型

- List类型是一个链表结构的集合，其主要功能有push、pop、获取元素等。
- 类似Java中：**Map<String, List>  map**

![](redis(一).assets/16.png)



### 3.4.0、内部实现

- 如果列表的元素个数小于 `512` 个，列表每个元素的值都小于 `64` 字节，Redis 会使用**压缩列表**作为 List 类型的底层数据结构；
- 如果列表的元素不满足上面的条件，Redis 会使用**双向链表**作为 List 类型的底层数据结构

> 但是**在 Redis 3.2 版本之后，List 数据类型底层数据结构就只由 quicklist 实现了，替代了双向链表和压缩列表**

### 3.4.1、常用的命令

| 命令格式              | 功能                                                 | 案例                                  | 说明                                                         |
| --------------------- | ---------------------------------------------------- | ------------------------------------- | ------------------------------------------------------------ |
| rpush  key  value     | 从右边往key集合中添加value值                         | rpush hobby java                      | 从右边向 hobby 集合中添加 java 字段                          |
| lrange key start stop | 从左边开始列表key集合，从start位置开始，stop位置结束 | lrange hobby 0 3<br>lrange hobby 0 -1 | 从左边开始罗列 hobby 集合下标 0-3 的字段<br>从左边开始罗列 hobby 集合下所有字段 |
| lpush key value       | 从左边往key集合中添加value值                         | lpush hobby c++                       | 从左边向 hobby 集合中添加 c++ 字段                           |
| lpop key              | 弹出key集合中最左边的数据                            | lpop hobby                            | 弹出 hobby 集合中最左边的数据                                |
| rpop key              | 弹出key集合中最右边的数据                            | rpop hobby                            | 弹出 hobby 集合中最右边的数据                                |
| llen key              | 获取列表长度                                         | llen hooby                            | 获取 hobby 集合的长度                                        |



```bash
# 将一个或多个值value插入到key列表的表头(最左边)，最后的值在最前面
LPUSH key value [value ...] 
# 将一个或多个值value插入到key列表的表尾(最右边)
RPUSH key value [value ...]
# 移除并返回key列表的头元素
LPOP key     
# 移除并返回key列表的尾元素
RPOP key 

# 返回列表key中指定区间内的元素，区间以偏移量start和stop指定，从0开始
LRANGE key start stop

# 从key列表表头弹出一个元素，没有就阻塞timeout秒，如果timeout=0则一直阻塞
BLPOP key [key ...] timeout
# 从key列表表尾弹出一个元素，没有就阻塞timeout秒，如果timeout=0则一直阻塞
BRPOP key [key ...] timeout
```





### 3.4.2、非常用命令

| 命令格式                        | 功能                                    | 案例                          |
| ------------------------------- | --------------------------------------- | ----------------------------- |
| linsert key before pivot value  | 操作key集合，在pivot值之前插入value     | linsert hobby before java  c# |
| linsert key  after  pivot value | 操作key集合，在pivot值之后插入value     | linsert hobby after  java  c# |
| lset key  index  value          | 操作key集合，更新索引index位置值为value | lset hobby 1  go              |
| lrem key count  value           | 操作key集合，删除 count个 value值       | lrem hobby 3   go             |
| ltrim   key  start stop         | 操作key集合，从start到stop截取自列表    | ltrim  hobby 2   4            |
| lindex  key  index              | 操作key集合，获取索引为index位置的数据  | lindex  hobby 1               |



### 3.4.3、应用场景

1. 用户收藏文章列表：

| key                     | value                    |
| ----------------------- | ------------------------ |
| user_favor_article_list | [aid1, aid2, aid3......] |

2. 消息队列：[小林coding](https://xiaolincoding.com/redis/data_struct/command.html#%E5%BA%94%E7%94%A8%E5%9C%BA%E6%99%AF-2)



## 3.5、Set类型

Set 类型是一个无序并唯一的键值集合，它的存储顺序不会按照插入的先后顺序进行存储。

![](redis(一).assets/17.png)

Set 类型和 List 类型的区别如下：

- List 可以存储重复元素，Set 只能存储非重复元素；
- List 是按照元素的先后顺序存储元素的，而 Set 则是无序方式存储元素的。







### 3.5.0、内部实现

Set 类型的底层数据结构是由**哈希表或整数集合**实现的：

- 如果集合中的元素都是整数且元素个数小于 `512` （默认值，`set-maxintset-entries`配置）个，Redis 会使用**整数集合**作为 Set 类型的底层数据结构；
- 如果集合中的元素不满足上面条件，则 Redis 使用**哈希表**作为 Set 类型的底层数据结构。

### 3.5.1、常用的命令

| 命令格式                 | 功能                           | 案例               | 说明                         |
| ------------------------ | ------------------------------ | ------------------ | ---------------------------- |
| sadd key  members [....] | 往key 集合中添加member元素     | sadd myset a  b  c | 给集合 myset 添加 a b c 元素 |
| smembers key             | 遍历key集合中所有的元素        | smembers myset     | 遍历集合 myset               |
| srem  key members [....] | 删除key集合中members元素       | srem myset a       | 删除myset集合中的元素a       |
| spop key count           | 从key集合中随机弹出count个元素 | spop myset 1       |                              |

```bash
# 往集合key中存入元素，元素存在则忽略，若key不存在则新建
SADD key member [member ...]
# 从集合key中删除元素
SREM key member [member ...] 
# 获取集合key中所有元素
SMEMBERS key
# 获取集合key中的元素个数
SCARD key

# 判断member元素是否存在于集合key中
SISMEMBER key member

# 从集合key中随机选出count个元素，元素不从key中删除
SRANDMEMBER key [count]
# 从集合key中随机选出count个元素，元素从key中删除
SPOP key [count]
```



### 3.5.2、非常用命令

| 命令格式                        | 功能                                                 | 案例                         |
| ------------------------------- | ---------------------------------------------------- | ---------------------------- |
| **sdiff key1   key2**           | **返回key1中特有的元素(差集)**                       | **sdiff key1 key2**          |
| sidiffstore  dest  key1 key2    | 返回key1中特有的元素，并将返回值缓存到dest集合中     | sidiffstore  dest  key1 key2 |
| **sinter key1 key2**            | **返回key1跟key2集合的交集**                         | **sinter key1 key2**         |
| sinterstore  dest key1 key2     | 返回key1跟key2集合的交集，并将返回值缓存到dest集合中 | sinterstore  dest key1 key2  |
| **sunion key1  key2**           | **返回key1跟key2集合的并集**                         | **sunion key1  key2**        |
| sunionstore dest key1  key2     | 返回key1跟key2集合的并集，并将返回值缓存到dest集合中 | sunionstore dest key1  key2  |
| smove source destination member | 将source集合中member元素移动到destination集合中      | smove key1  key2 aa          |
| sismember key member            | 判断member元素是否在key集合中                        | sismember key1   aa          |
| srandmember  key  count         | 随机获取set集合中count 个元素                        | srandmem                     |

```bash
# 交集运算
SINTER key [key ...]
# 将交集结果存入新集合destination中
SINTERSTORE destination key [key ...]

# 并集运算
SUNION key [key ...]
# 将并集结果存入新集合destination中
SUNIONSTORE destination key [key ...]

# 差集运算
SDIFF key [key ...]
# 将差集结果存入新集合destination中
SDIFFSTORE destination key [key ...]
```

### 3.5.4、应用场景

集合的主要几个特性，无序、不可重复、支持并交差等操作。因此 Set 类型比较适合用来数据去重和保障数据的唯一性，还可以用来统计多个集合的交集、错集和并集等，当我们存储的数据是**无序并且需要去重**的情况下，比较适合使用集合类型进行存储。

> **Set 的差集、并集和交集的计算复杂度较高，在数据量较大的情况下，如果直接执行这些计算，会导致 Redis 实例阻塞**

在主从集群中，为了避免主库因为 Set 做聚合计算（交集、差集、并集）时导致主库被阻塞，我们可以选择一个从库完成聚合统计，或者把数据返回给客户端，由客户端来完成聚合统计。



1. **点赞场景**：Set 类型可以保证一个用户只能点一个赞，这里举例子一个场景，key 是文章id，value 是用户id。

   ```bash
   # uid:1 、uid:2、uid:3 三个用户分别对 article:1 文章点赞了
   # uid:1 用户对文章 article:1 点赞
   > SADD article:1 uid:1
   (integer) 1
   # uid:2 用户对文章 article:1 点赞
   > SADD article:1 uid:2
   (integer) 1
   # uid:3 用户对文章 article:1 点赞
   > SADD article:1 uid:3
   (integer) 1
   ```

   ```bash
   # uid:1 取消了对 article:1 文章点赞。
   > SREM article:1 uid:1
   (integer) 1
   
   # 获取 article:1 文章所有点赞用户 
   > SMEMBERS article:1
   1) "uid:3"
   2) "uid:2"
   
   # 获取 article:1 文章的点赞用户数量
   > SCARD article:1
   (integer) 2
   
   # 判断用户 uid:1 是否对文章 article:1 点赞了
   > SISMEMBER article:1 uid:1
   (integer) 0  # 返回0说明没点赞，返回1则说明点赞了
   ```

   

2. **共同关注**：Set 类型支持交集运算，所以可以用来计算共同关注的好友、公众号等

   ```bash
   # key 可以是用户id，value 则是已关注的公众号的id。
   # uid:1 用户关注公众号 id 为 5、6、7、8、9，uid:2 用户关注公众号 id 为 7、8、9、10、11
   
   # uid:1 用户关注公众号 id 为 5、6、7、8、9
   > SADD uid:1 5 6 7 8 9
   (integer) 5
   # uid:2  用户关注公众号 id 为 7、8、9、10、11
   > SADD uid:2 7 8 9 10 11
   (integer) 5
   
   # 获取共同关注
   > SINTER uid:1 uid:2
   1) "7"
   2) "8"
   3) "9"
   
   # 给 uid:2 推荐 uid:1 关注的公众号
   > SDIFF uid:1 uid:2
   1) "5"
   2) "6"
   
   # 验证某个公众号是否同时被 uid:1 或 uid:2 关注:
   > SISMEMBER uid:1 5
   (integer) 1 # 返回0，说明关注了
   > SISMEMBER uid:2 5
   (integer) 0 # 返回0，说明没关注
   ```

3. **抽奖活动**：存储某活动中中奖的用户名 ，Set 类型因为有去重功能，可以保证同一个用户不会中奖两次

   ```bash
   # key为抽奖活动名，value为员工名称，把所有员工名称放入抽奖箱
   >SADD lucky Tom Jerry John Sean Marry Lindy Sary Mark
   (integer) 5
   
   # 如果允许重复中奖，可以使用 SRANDMEMBER 命令
   # 抽取 1 个一等奖：
   > SRANDMEMBER lucky 1
   1) "Tom"
   # 抽取 2 个二等奖：
   > SRANDMEMBER lucky 2
   1) "Mark"
   2) "Jerry"
   # 抽取 3 个三等奖：
   > SRANDMEMBER lucky 3
   1) "Sary"
   2) "Tom"
   3) "Jerry"
   ```

   如果不允许重复中奖，可以使用 SPOP 命令

   ```bash
   # 抽取一等奖1个
   > SPOP lucky 1
   1) "Sary"
   # 抽取二等奖2个
   > SPOP lucky 2
   1) "Jerry"
   2) "Mark"
   # 抽取三等奖3个
   > SPOP lucky 3
   1) "John"
   2) "Sean"
   3) "Lindy"
   ```

   



## 3.6、Zset类型

- Zset 类型（有序集合类型）相比于 Set 类型多了一个排序属性 score（分值），对于有序集合 ZSet 来说，每个存储元素相当于有两个值组成的，一个是有序集合的元素值，一个是排序值。
- 有序集合保留了集合不能有重复成员的特性（分值可以重复），但不同的是，有序集合中的元素可以排序。

![](redis(一).assets/19.png)



### 3.6.1、内部实现

Zset 类型的底层数据结构是由**压缩列表或跳表**实现的：

- 如果有序集合的元素个数小于 `128` 个，并且每个元素的值小于 `64` 字节时，Redis 会使用**压缩列表**作为 Zset 类型的底层数据结构；
- 如果有序集合的元素不满足上面的条件，Redis 会使用**跳表**作为 Zset 类型的底层数据结构；

> **在 Redis 7.0 中，压缩列表数据结构已经废弃了，交由 listpack 数据结构来实现了。**

### 3.6.1、常用的命令

| 命令格式                                | 功能                                       | 案例                               | 说明                              |
| --------------------------------------- | ------------------------------------------ | ---------------------------------- | --------------------------------- |
| zadd key score member                   | 往key集合中添加member元素，分数为score     | zadd players 100  a                | 向players集合添加a元素，分数为100 |
| zincrby  key increment  member          | 将key集合中的member元素 分数 + increment   | zadd players 100  a                | 向players集合的a元素分数+100      |
| zrange  key  start  stop [withscores]   | 将key集合中的元素按分数升序排列 [显式分数] | zrange players 0 -1  withscores    |                                   |
| zrevrange key  start  stop [withscores] | 将key集合中的元素按分数降序排列 [显式分数] | zrevrange players 0 -1  withscores |                                   |
| zrank  key  member                      | 返回member元素在key结合中的正序排名        | zrank players  a                   | 返回players集合中a元素的正序排名  |
| zrevrank key  member                    | 返回member元素在key结合中的倒序排名        | zrevrank players  a                |                                   |
| zcard  key                              | 返回key集合元素个数                        | zcard  players                     |                                   |

```bash
# 往有序集合key中加入带分值元素
ZADD key score member [[score member]...]   
# 往有序集合key中删除元素
ZREM key member [member...]                 
# 返回有序集合key中元素member的分值
ZSCORE key member
# 返回有序集合key中元素个数
ZCARD key 

# 为有序集合key中元素member的分值加上increment
ZINCRBY key increment member 

# 正序获取有序集合key从start下标到stop下标的元素
ZRANGE key start stop [WITHSCORES]
# 倒序获取有序集合key从start下标到stop下标的元素
ZREVRANGE key start stop [WITHSCORES]

# 返回有序集合中指定分数区间内的成员，分数由低到高排序。
ZRANGEBYSCORE key min max [WITHSCORES] [LIMIT offset count]

# 返回指定成员区间内的成员，按字典正序排列, 分数必须相同。
ZRANGEBYLEX key min max [LIMIT offset count]
# 返回指定成员区间内的成员，按字典倒序排列, 分数必须相同
ZREVRANGEBYLEX key max min [LIMIT offset count]
```

Zset 运算操作（相比于 Set 类型，ZSet 类型没有支持差集运算）:

```bash
# 并集计算(相同元素分值相加)，numberkeys一共多少个key，WEIGHTS每个key对应的分值乘积
ZUNIONSTORE destkey numberkeys key [key...] 
# 交集计算(相同元素分值相加)，numberkeys一共多少个key，WEIGHTS每个key对应的分值乘积
ZINTERSTORE destkey numberkeys key [key...]
```



### 3.6.2、非常用命令

| 命令格式                                     | 功能                                          | 案例                                           |
| -------------------------------------------- | --------------------------------------------- | ---------------------------------------------- |
| zrangebyscore  key  min  max  [withscores]   | 按[min, max) 分数范围返回key集合中元素(正序)  | zrangebyscore players  200 300  withscores     |
| zrevrangebyscore key  min  max  [withscores] | 按[min, max) 分数范围返回key集合中元素(倒序)  | zrevrangebyscore players  200 300  withscores  |
| zrem key member                              | 删除key集合中member元素与分数                 | zrem players  a                                |
| zremrangebyscore  key min max  withscores    | 按[min, max) 分数范围删除key集合中元素        | zremrangebyscore  players  200 300  withscores |
| zremrangebyrank  key start  stop             | 删除key集合正序排名落在[start, stop) 范围元素 | zremrangebyrank  players  10  20               |
| zcount key min max                           | 按照分数范围[min, max]统计key集合中元素个数   | zcount  players  100 300                       |



### 3.6.4、应用场景

​	Zset 类型（Sorted Set，有序集合） 可以根据元素的权重来排序，我们可以自己来决定每个元素的权重值。比如说，我们可以根据元素插入 Sorted Set 的时间确定权重值，先插入的元素权重小，后插入的元素权重大。

​	在面对需要展示**最新列表、排行榜**等场景时，如果数据更新频繁或者需要分页显示，可以优先考虑使用 Sorted Set。

1. 排行榜：我们以博文点赞排名为例，小林发表了五篇博文，分别获得赞为 200、40、100、50、150。

   ```bash
   # arcticle:1 文章获得了200个赞
   > ZADD user:xiaolin:ranking 200 arcticle:1
   (integer) 1
   # arcticle:2 文章获得了40个赞
   > ZADD user:xiaolin:ranking 40 arcticle:2
   (integer) 1
   # arcticle:3 文章获得了100个赞
   > ZADD user:xiaolin:ranking 100 arcticle:3
   (integer) 1
   # arcticle:4 文章获得了50个赞
   > ZADD user:xiaolin:ranking 50 arcticle:4
   (integer) 1
   # arcticle:5 文章获得了150个赞
   > ZADD user:xiaolin:ranking 150 arcticle:5
   (integer) 1
   ```

   文章 arcticle:4 新增一个赞，可以使用 ZINCRBY 命令（为有序集合key中元素member的分值加上increment）：

   ```bash
   > ZINCRBY user:xiaolin:ranking 1 arcticle:4
   "51"
   ```

   查看某篇文章的赞数，可以使用 ZSCORE 命令（返回有序集合key中元素个数）:

   ```bash
   > ZSCORE user:xiaolin:ranking arcticle:4
   "50"
   ```

   获取小林文章赞数最多的 3 篇文章，可以使用 ZREVRANGE 命令（倒序获取有序集合 key 从start下标到stop下标的元素）：

   ```bash
   # WITHSCORES 表示把 score 也显示出来
   > ZREVRANGE user:xiaolin:ranking 0 2 WITHSCORES
   1) "arcticle:1"
   2) "200"
   3) "arcticle:5"
   4) "150"
   5) "arcticle:3"
   6) "100"
   ```

   获取小林 100 赞到 200 赞的文章，可以使用 ZRANGEBYSCORE 命令（返回有序集合中指定分数区间内的成员，分数由低到高排序）：

   ```bash
   > ZRANGEBYSCORE user:xiaolin:ranking 100 200 WITHSCORES
   1) "arcticle:3"
   2) "100"
   3) "arcticle:5"
   4) "150"
   5) "arcticle:1"
   6) "200"
   ```

   







# 4、Key的设计

Redis 的key 设计讲究4个性：

## 4.1、唯一性

Redis 类似Map集合，key必须保证唯一，缓存同一个key时，后者会覆盖前者，所以必须要求唯一，那如何保证唯一呢？最常用的方式：**使用缓存数据的主键作为key**。

比如：缓存员工信息

| key  | value |
| ---- | ----- |
| 1    | 员工1 |
| 2    | 员工2 |

其中的1， 2 是员工的id

## 4.2、可读性

可读性是保证Redis的key能做到见名知意，上面的员工id1， 员工id2 虽说能保证key唯一，但可读性非常差，维护key时，无法从1， 2中快速判断该key对应value值。所以一一般在保证key唯一的前提下，给key加上前缀：

| key               | value |
| ----------------- | ----- |
| employee_info:id1 | 员工1 |
| employee_info:id2 | 员工2 |

`employee_info:id1`  、 `employee_info:id2`   这样子设计key，可读性就好多了。

- 通用玩法：**业务模块名:业务逻辑含义:其他:value类型**

| key                          | value        |
| ---------------------------- | ------------ |
| employee :base.info:id1:hash | 员工对象信息 |

**业务模块名**：表示该key属于哪个功能模块

**业务逻辑含义段**：这里可以使用  **.**  分开， 具体业务逻辑表示

- 比如：缓存员工权限：`employee:auth.permission:id1:set`     员工权限集合

**其他**：一般设置唯一标识，比如主键

**value类型**：key对应value类型值，提高可读性。





## 4.3、时效性

redis key一定要设置过期时间。要跟自己的业务场景，需要对key设置合理的过期时间。可以在写入key时，就要追加过期时间；也可以在按照需要动态设置。

这里要注意：

- 不设置过期时间，这种key为永久key，会一直占用内存不释放，时间久了，数量一多，就容易达到服务器的内存上限，导致宕机，开发时一般配合Key过期策略使用哦。
- key的时效性设置，必须根据业务场景进行评估，设置合理有效期；





## 4.4、灵活性

这个难介绍，一般key保证唯一时，可以使用主键，有的使用一个主键不能表达出全部意思，可以使用联合主键。

比如：id为1的朋友圈下id为A的评论。

| key            | value    |
| -------------- | -------- |
| post:1:reply:A | 评论内容 |
| post:1:reply:B | 评论内容 |











# 5、设置密码

下面我们将介绍两种常用的方法来为Redis设置密码：

## 5.1、通过配置文件设置密码

在Redis的配置文件`redis.conf`中，可以通过以下步骤来设置密码：

1. 打开`redis.conf`文件(我的是在`./www/server/redis/redis-7.2.3`目录下)
2. 找到并取消注释`requirepass`项

![](redis(一).assets/20.png)

3. 在`requirepass`后面添加你想要设置的密码，如`requirepass 1234`。

4. 保存并关闭配置文件。

5. 重新启动Redis服务器，使密码生效。







## 5.2、通过命令行设置密码

除了通过配置文件，还可以直接通过命令行来为Redis设置密码。打开终端并输入以下命令：

```bash
redis-cli
```

接着，在命令行中输入以下命令来设置密码：

```bash
config set requirepass mypassword
```



运行上述命令后，Redis将返回`OK`表示密码设置成功。

验证:

- 在redis命令行中，使用`auth mypassword`来验证密码
- 如果密码正确，Redis将返回`OK`，表示密码验证成功。



## 5.3、更改密码

1. 在redis命令行中更改

```bash
config set requirepass newpassword
```



替换`newpassword`为你想要设置的新密码。

![](redis(一).assets/21.png)





## 5.4、取消密码

1. 在redis命令行中更改

```bash
config set requirepass ""
```

运行上述命令后，Redis将返回`OK`，表示密码已成功取消。











