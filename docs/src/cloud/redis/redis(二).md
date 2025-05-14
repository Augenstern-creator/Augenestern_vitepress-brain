# 1、Redis全局命令

全局命令针对的是所有的key，常用的全局key命令如下：

| 命令格式            | 功能                                       | 案例                 |                           |
| ------------------- | ------------------------------------------ | -------------------- | ------------------------- |
| keys  pattern       | 按照pattern 匹配规则，列表redis中所有的key | keys xxx:*           | 查询符合 xxx:* 格式的key  |
| exists  key         | 判断key是否存在                            | exists name          | 判断 name 字段是否存在    |
| expire key  seconds | 给key设置过期时间，超时：seconds           | expire name 10       | 给 name 设置10s           |
| persist key         | 取消key过期时间                            | persist  name        | 取消name 的过期时间       |
| select  index       | 切换数据库，默认是第0个，共有【0,15】个    | select 0             | 切换第0个数据库           |
| move key   db       | 从当前数据库将key移动到指定db库            | move name 1          | 将 name 移动到第1个数据库 |
| randomkey           | 随机返回一个key                            | randomkey            |                           |
| rename key newkey   | 将key改名为newkey                          | rename name  newname | 将 name 改名为 newname    |
| echo message        | 打印message信息                            | echo  message        |                           |
| dbsize              | 查看key个数                                | dbsize               |                           |
| info                | 查看redis数据库信息                        | info                 |                           |
| config get  *       | 查看所有redis配置信息                      | config get *         |                           |
| flushdb             | 清空当前数据库                             | flushdb              |                           |
| flushall            | 清空所有数据库                             | flushall             |                           |









## 1.2、Redis事务

一个事务从开始到执行会经历以下三个阶段：

- 开始事务。
- 命令入队。
- 执行事务。

它先以 **MULTI** 开始一个事务， 然后将多个命令入队到事务中， 最后由 **EXEC** 命令触发事务， 一并执行事务中的所有命令：

```bash
127.0.0.1:6379> multi
OK
127.0.0.1:6379(TX)> set name dafei
QUEUED
127.0.0.1:6379(TX)> set age 18
QUEUED
127.0.0.1:6379(TX)> incr age 
QUEUED
127.0.0.1:6379(TX)> incr name
QUEUED
127.0.0.1:6379(TX)> get age
QUEUED
127.0.0.1:6379(TX)> get name
QUEUED
127.0.0.1:6379(TX)> exec
1) OK
2) OK
3) (integer) 19
4) (error) ERR value is not an integer or out of range
5) "19"
6) "dafei"
127.0.0.1:6379> 
```

​	单个 Redis 命令的执行是原子性的，但 Redis 没有在事务上增加任何维持原子性的机制，所以 Redis 事务的执行并不是原子性的。Redis事务可以理解为一个**打包的批量执行脚本**，但批量指令并非原子化的操作，中间某条指令的失败不会导致前面已做指令的回滚，也不会造成后续的指令不做。

​	Redis 事务可以一次执行多个命令， 并且带有以下三个重要的保证：

- 批量操作在发送 EXEC 命令前被放入队列缓存。
- 收到 EXEC 命令后进入事务执行，事务中任意命令执行失败，其余的命令依然被执行。
- 在事务执行过程，其他客户端提交的命令请求不会插入到事务执行命令序列中。





# 2、Redis持久化

先来一个小实验：

1. 在Redis中添加2个key-value对

   ```bash
   127.0.0.1:6379> set aa aa
   OK
   127.0.0.1:6379> set bb bb
   OK
   127.0.0.1:6379> keys *
   # 获取redis中所有的key
   ```

2. 重启 redis 

   ```bash
   redis-server restart 
   ```

3. 再次执行`keys *`

   ```bash
   keys *
   ```

4. 分析结果：会出现如下结果

   - 之前的key在，aa  bb 都在（最理想的结果）
   - 之前的key在，aa也在，bb不见了
   - 之前的key在，aa， bb 不在
   - 之前的key， aa， bb 都不在了（最坏的结果）

思考：为啥会这样？以我们对内存的操作理解，按道理重启之后数据应该全丢失了，为啥Redis 可能丢失，也可能不丢失，为何？这里就涉及到Redis的持久化机制了。**Redis不定时将内存中的数据存到硬盘中**

![](redis(二).assets/1.png)



Redis持久化机制目前以后3种，分别为：

1. **快照方式**（RDB, Redis DataBase）

2. **文件追加方式**（AOF, Append Only File）

3. **混合持久化方式**（Redis4版本之后）



## 2.1、RDB方式

Snapshotting(快照)是持久化机制的默认方式，将内存数据中以快照的方式写入到二进制文件(硬盘)中，默认为`dump.rdb`。触发RDB持久化过程分手动触发与自动触发。

- 客户端方式: BGSAVE 和 SAVE指令
- 服务器配置自动触发

### 2.1.1、客户端触发机制

**手动触发**

- 使用`save`命令：会阻塞当前Redis服务器，知道RDB过程完成为主，如果内存数据较多，会造成长时间阻塞，影响其他命令的使用，不建议轻易使用

- 使用`bgsave`命令：Redis进程执行fork指令创建子进程，由子进程实现RDB持久化，有需要时建议使用bgsave命令。

**自动触发**

使用save相关配置，格式： `save m n`      表示m秒内数据集存在n次修改时会自动触发bgsave命令。

```bash
#900秒内如果超过1个Key被修改则发起快照保存
save 900 1  

#300秒内如果超过10个key被修改,则发起快照保存
save 300 10 

#10000秒内如果超过60个key被修改,则发起快照保存
save 60 10000
```

> SAVE命令并不常用,使用SAVE命令在快照创建完毕之 前,redis处于阻塞状态,无法对外服务





### 2.1.2、服务端触发机制

如果用户在`redis.conf`中设置了save配置选项，redis会在save选项 条件满足之后自动触发一次BGSAVE命令,如果设置多个save配置选项，当任意一个save配置选项条件满足，redis也会触发一次BGSAVE命令

```bash
#900秒内如果超过1个Key被修改则发起快照保存
save 900 1  

#300秒内如果超过10个key被修改,则发起快照保存
save 300 10 

#10000秒内如果超过60个key被修改,则发起快照保存
save 60 10000
```



### 2.2.3、配置生成快照名称和位置

```bash
# 1.修改生成快照名称
dbfilename dump.rdb

# 2.修改生成位置
dir ./   # 这个表示redis-cli、redis-server这些命令的同级目录
```





### 2.2.4、优点

- RDB快照文件是一个紧凑压缩的二进制文件，非常使用用于备份，全量复制等场景。开发中可以按照每6小时执行一次bgsave备份，用于容灾备份。

- Redis加载RDB恢复数据远远快于AOF方式

### 2.2.5、缺点

- RDB无法做到实时持久化/秒级持久化(两次存在硬盘有时间差)，每次bgsave时都需要fork子进程，频繁执行有时间成本。
- RDB快照文件不同版本格式不一样，容易引起兼容问题。





## 2.2、AOF方式

AOF与RDB不一样，它是**以独立日志的方式记录每次写命令**，重启时再重新执行AOF文件中命令达到恢复数据的目的。解决了数据持久化的实时性的问题。Redis默认是不开启的，需要使用时，需要配置： 

```bash
# 开启持久化
appendonly yes

# 修改生成文件名称
appendfilename "appendonly.aof"

# 修改日志同步频率 appendfsync everysec|always|no 指定,推荐everysec
appendfsync everysec
```

> 解释一下：就是记录每次的 set、setex等写命令，这样当内存中的数据丢失时，我们将所有的写名字重新执行一遍，这样就恢复了内存的数据。

AOF 有3种文件同步策略：

| 策略                 | 解释                                                    |
| -------------------- | ------------------------------------------------------- |
| appendfsync always   | 收到命令就立即写到磁盘,效率最慢.但是能保证完全的持久化  |
| appendfsync everysec | 每秒写入磁盘一次,在性能和持久化方面做了很好的折中，推荐 |
| appendfsync no       | 完全以依赖os，一般同步周期是30秒                        |

### 2.2.1、优点

- AOF方式数据安全性更高，配置得当，最多损失1秒的数据量
- 在不小心执行flushall命令，也可以通过AOF方式恢复(删除最后一个命令即可)

- AOF 日志是一个增量日志文件，不会存在断电时出现损坏问题。即使出现问题，redis-check-aof 工具也能够轻松修复它。
- 当 AOF 变得太大时，Redis 能够在后台自动重写 AOF



### 2.2.2、缺点

- 相同数据量来说，AOF文件体积通常大于RDB文件
- 数据持久化性能上来说，AOF 比 RDB 慢

## 2.3、RDB-AOF混合方式

混合持久化是结合了 RDB 和 AOF 的优点，在写入的时候，先把当前的数据以 RDB 的形式写入文件的开头，再将后续的操作命令以 AOF 的格式存入文件。即以 RDB 作为全量备份，AOF 作为增量备份，来提高备份效率。这样既能保证 Redis 重启时的速度，又能防止数据丢失的风险， 这就是 Redis 4.0 之后推出的 **RDB-AOF 混合持久化模式，其作为默认配置来使用**。







## 2.4、持久化机制的选择

- 如果对数据安全性有非常高的要求，建议 RDB 和 AOF 同时启用。
- 如果对数据安全性要求不是很高，能够容忍数据的丢失，建议单独使用 RDB。
- 不推荐单独使用 AOF，因为对于进行数据库备份、更快重启以及 AOF 引擎中出现错误的情况来说，RDB 是更好的选择。
- 如果没特殊要求，Redis又是4.x版本以上，可以选择RDB-AOF混合方式。





# 3、Java操作Redis

1. 环境依赖

```xml
```



Jedis本身是线程不安全的,并且频繁的创建和销毁连接会有性能损耗,因此我们推荐使用 Jedis 连接池代替 Jedis 的直连方式。







# 4、SpringBoot整合Redis

Spring Boot Data(数据)Redis中提供了`RedisTemplate`和`StringRedisTemplate`,其中`StringRedisTemplate`是`RedisTemplate`的子类，两个方法基本一致，不同之处主要体现在操作的数据类型不同

- `RedisTemplate`中的两个泛型都是Object,意味着存储的key和value都可以是一个对象
- 而`StringRedisTemplate`的两个泛型都是String,意味着StringRedisTemplate的key和value都只能是字符串。

> 注意: 使用`RedisTemplate`默认是将对象序列化到Redis中，所以放入的对象必须实现对象序列化接口 serilizable

## 3.1、环境准备

1. 引入依赖

```xml
<!--redis依赖-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
<!--redis连接池-->
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-pool2</artifactId>
</dependency>
```



2. 配置application.yaml

```yaml
spring:
  redis:
    host: 192.168.126.132
    port: 6379
    password: 1234
    lettuce:
      pool:
        max-active: 8 # 最大连接
        max-idle: 8   # 最大空闲连接
        min-idle: 0   # 最小空闲连接
        max-wait: 100ms # 连接等待时间
```

3. 写完上述配置,我们启动 SpringBoot 时,会给我们自动创建 `RedisTemplate` 和 `StringRedisTemplate`，我们只需要注入即可

```java
@SpringBootTest
class KuangStudyRedisApplicationTests {


    //注入StringRedisTemplate
    @Autowired
    private StringRedisTemplate stringRedisTemplate;


    // 测试存字符串String
    @Test
    void testSaveString() {
        // 写入一条String数据
        stringRedisTemplate.opsForValue().set("name","虎哥");
        // 获取String数据
        Object name = stringRedisTemplate.opsForValue().get("name");
        System.out.println("name = " + name);

    }

}
```









## 3.2、SpringBoot操作key

- `stringRedisTemplate.delete("key")` : 删除一个key
- `stringRedisTemplate.hasKey("key")` : 是否有 name 这个key
- `stringRedisTemplate.type("key")` : 查看 key 的类型
- `stringRedisTemplate.keys("*")` : 查看所有的 key

```java
@SpringBootTest
class KuangStudyRedisApplicationTests {


    //注入StringRedisTemplate
    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    // 测试操作redis中的key
    @Test
    void testKey(){
        // 删除一个key
        // stringRedisTemplate.delete("name");
        // 判断某个key是否存在
        Boolean hasKey = stringRedisTemplate.hasKey("name");
        System.out.println(hasKey);
        
        // 判断key所对应value的类型
        DataType type = stringRedisTemplate.type("name");
        System.out.println(type);
        
        // 获取所有的key
        Set<String> keys = stringRedisTemplate.keys("*");
        keys.forEach(key -> System.out.println("key = " + key));
        
	// 测试key的超时时间 -1表示永不超时, -2 表示 key 不存在
        Long expire = stringRedisTemplate.getExpire("name");
        System.out.println(expire);
        
        // 随机获取一个key
        String s = stringRedisTemplate.randomKey();
        System.out.println(s);
        
        //修改key的名字(判断key是否存在,存在才会修改)
        stringRedisTemplate.renameIfAbsent("name","name1");
        
        // 移动key到指定库
        stringRedisTemplate.move("name",1);
    }

}
```



## 3.3、SpringBoot操作String

- 

```java
@SpringBootTest
class KuangStudyRedisApplicationTests {


    //注入StringRedisTemplate
    @Autowired
    private StringRedisTemplate stringRedisTemplate;


    // 测试操作字符串String
    @Test
    void testSaveString() {
        // 写入一条String数据
        stringRedisTemplate.opsForValue().set("name","虎哥");
        // 获取String数据
        Object name = stringRedisTemplate.opsForValue().get("name");
        System.out.println("name = " + name);
        // 设置key的超时时间(设置一个code的key,值value是2357,超时时间是120,单位是TimeUnit.SECONDS 为秒)
        stringRedisTemplate.opsForValue().set("code","2357",120, TimeUnit.SECONDS);
        // 给key对应的value追加值
        stringRedisTemplate.opsForValue().append("name","他是一个好人,单纯少年!");
    }


}
```





## 3.4、SpringBoot操作List

- `stringRedisTemplate.leftPush("key","xxx")` : 创建一个列表  并放入一个元素
- `stringRedisTemplate.leftPushAll("key","xxx,xxx,xxx")` : 创建一个列表  并放入多个元素
- `stringRedisTemplate.opsForList().range("names", 0, -1)` : 获取列表,返回一个List集合
- `stringRedisTemplate.opsForList().index("List", "index")` : 获取列表中指定下标所对应的值
- `stringRedisTemplate.opsForList().leftPop("List")` : 从列表左边弹出一个元素

```java
@SpringBootTest
class KuangStudyRedisApplicationTests {


    //注入StringRedisTemplate
    @Autowired
    private StringRedisTemplate stringRedisTemplate;


    //操作redis中list类型   opsForList 实际操作就是redis中list类型
    @Test
    public void testList(){
        //stringRedisTemplate.opsForList().leftPush("names","小陈");//创建一个列表  并放入一个元素
        //stringRedisTemplate.opsForList().leftPushAll("names","小陈","小张","小王");//创建一个列表 放入多个元素

        List<String> names = new ArrayList<>();
        names.add("xiaoming");
        names.add("xiaosan");
        //stringRedisTemplate.opsForList().leftPushAll("names",names);//创建一个列表 放入多个元素

        // 查看列表
        List<String> stringList = stringRedisTemplate.opsForList().range("names", 0, -1); 
        stringList.forEach(value-> System.out.println("value = " + value));
    }


}
```







## 3.5、SpringBoot操作Set



```java
@SpringBootTest
class KuangStudyRedisApplicationTests {


    //注入StringRedisTemplate
    @Autowired
    private StringRedisTemplate stringRedisTemplate;


    //操作redis中set类型   opsForSet 实际操作就是redis中set类型
    @Test
    public void testSet(){
        //创建set 并放入多个元素
        stringRedisTemplate.opsForSet().add("sets","张三","张三","小陈","xiaoming");
        //查看set中成员
        Set<String> sets = stringRedisTemplate.opsForSet().members("sets");
        sets.forEach(value-> System.out.println("value = " + value));

        //获取set集合元素个数
        Long size = stringRedisTemplate.opsForSet().size("sets");
        System.out.println("size = " + size);
    }


}
```





## 3.6、SpringBoot操作ZSet



```java
@SpringBootTest
class KuangStudyRedisApplicationTests {


    //注入StringRedisTemplate
    @Autowired
    private StringRedisTemplate stringRedisTemplate;


     @Test
    public void testZset(){
        //创建ZSet并放入元素(小黑的分数是20)
        stringRedisTemplate.opsForZSet().add("zsets","小黑",20);

        //指定范围查询
        Set<String> zsets = stringRedisTemplate.opsForZSet().range("zsets", 0, -1);
        zsets.forEach(value-> System.out.println(value));
        
        System.out.println("=====================================");
        
        //获取指定元素以及分数(分数在0-1000之间)
        Set<ZSetOperations.TypedTuple<String>> zsets1 = stringRedisTemplate.opsForZSet().rangeByScoreWithScores("zsets", 0, 1000);

        zsets1.forEach(typedTuple ->{
            System.out.println(typedTuple.getValue());
            System.out.println(typedTuple.getScore());
        });

    }


}
```







## 3.7、SpringBoot操作Hash



```java
@SpringBootTest
class KuangStudyRedisApplicationTests {


    //注入StringRedisTemplate
    @Autowired
    private StringRedisTemplate stringRedisTemplate;


    //操作redis中Hash类型   opsForHash 实际操作就是redis中Hash类型
    @Test
    public void testHash(){

        //创建一个hash类型 并放入key value
        stringRedisTemplate.opsForHash().put("maps","name","张三");

        Map<String,String> map =  new HashMap<String,String>();
        map.put("age","12");
        map.put("bir","2012-12-12");
        //放入多个key value
        stringRedisTemplate.opsForHash().putAll("maps",map);


        //获取多个key的value
        List<Object> values = stringRedisTemplate.opsForHash().multiGet("maps", Arrays.asList("name", "age"));
        values.forEach(value-> System.out.println(value));

        //获取hash中某个key的值
        String value  = (String) stringRedisTemplate.opsForHash().get("maps", "name");

        //获取所有values
        List<Object> vals = stringRedisTemplate.opsForHash().values("maps");

        //获取所有keys
        Set<Object> keys = stringRedisTemplate.opsForHash().keys("maps");


    }


}
```









## 3.8、SpringBoot操作对象

SpringBoot操作对象是采用`RedisTemplate`,`RedisTemplate`默认是将对象序列化到 Redis 中，所以放入的对象必须实现对象序列化接口。

> 在存对象时，我们会让key采用`StringRedisSerializer`方式，而value采用默认的`JdkSerializationRedisSerializer`序列化方式。
>
> - `redisTemplate.setKeySerializer(new StringRedisSerializer())` : 修改key的序列化,使得存key的序列化采用StringRedisSerializer方式
> - `redisTemplate.setHashKeySerializer(new StringRedisSerializer())` : 在我们操作Hash类型时,也要加上这一句，使得修改hash key 的序列化（**因为Hash有两个key**）

```java
@SpringBootTest
public class KuangStudyRedisTemplateTests {

    // 注入RedisTemplate
    @Autowired
    private RedisTemplate redisTemplate;

    void testRedisTemplate(){
        // 修改key的序列化,使得存key的序列化采用StringRedisSerializer方式
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        // 修改hash key 的序列化
        redisTemplate.setHashKeySerializer(new StringRedisSerializer());

        // 创建一个User对象
        User user = new User();
        user.setId(UUID.randomUUID().toString());
        user.setName("林晓");
        user.setAge(23);
        user.setBir(new Date());
        // 将对象序列化后存入redis
        redisTemplate.opsForValue().set("user",user);
        // 获取对象需要进行反序列化
        User user1 = (User) redisTemplate.opsForValue().get("user");
        System.out.println(user1);


        // 创建一个列表并放入user对象
        redisTemplate.opsForList().leftPush("list",user);
        // 创建一个Set并放入user对象
        redisTemplate.opsForSet().add("set",user);
        // 创建一个ZSet并放入user对象
        redisTemplate.opsForZSet().add("zset",user,10);
        // 创建一个Hash并放入user对象(注意需要序列化两个key)
        redisTemplate.opsForHash().put("map","name",user);

    }
}
```













## 3.9、BoundAPI

BoundAPI可以绑定某个key，后续的所有操作都是针对这个key进行操作的。

```java
@SpringBootTest
public class KuangStudyBoundAPITests {
    @Autowired
    private RedisTemplate redisTemplate;

    @Autowired
    private StringRedisTemplate stringRedisTemplate;


    // spring data 为了方便我们对redis进行更友好的操作 因此有提供了bound api 简化操作
    @Test
    public void testBound(){

        // 对key序列化
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        // 对Hash key 序列化
        redisTemplate.setHashKeySerializer(new StringRedisSerializer());


        //对字符串类型key进行绑定 后续所有操作都是基于这个key的操作
        BoundValueOperations<String, String> nameValueOperations = stringRedisTemplate.boundValueOps("name");
        // 对name设置value为张三
        nameValueOperations.set("张三");
        // 对name的value追加
        nameValueOperations.append("是一个好人");
        // 获取name的value
        String s1 = nameValueOperations.get();
        System.out.println(s1);

        //对list set zset hash
        //对list类型key进行绑定 后续所有操作都是基于这个key的操作
        BoundListOperations<String, String> listsOperations = stringRedisTemplate.boundListOps("lists");
        // 对lists设置value
        listsOperations.leftPushAll("张三","李四","小陈");
        // 获取lists
        List<String> lists = listsOperations.range(0, -1);
        lists.forEach(list-> System.out.println(list));

      
        //set
        //redisTemplate.boundSetOps();
        //stringRedisTemplate.boundSetOps()
        
        //zset
        //stringRedisTemplate.boundZSetOps();
        //redisTemplate.boundZSetOps();
        
        //hash
        //stringRedisTemplate.boundHashOps();
        //redisTemplate.boundHashOps()

}
```

## 3.10、总结

1. 针对于日后处理key value 都是 String 使用 `StringRedisTemplate`
2. 针对于日后处理的key value 存在对象 使用 `RedisTemplate`
3. 针对于同一个key多次操作可以使用`boundXXXOps()`
   - XXX包含: Value List Set Zset Hash的 api 简化书写



## 5、Redis的应用场景

1. 利用redis 中字符串类型完成项目中手机验证码存储的实现
2. 利用redis 中字符串类型完成具有失效性业务功能。  例如12306，淘宝的订单还有:40分钟
3. 利用redis 分布式集群系统中: Session共享
4. 利用redis zset类型:可排序set类型,元素,分数,排行榜之类功能   
5. 利用redis 实现分布式缓存  
6. 利用redis 存储认证之后token信息
7. 利用redis 解决分布式集群系统中分布式锁问题

























































































