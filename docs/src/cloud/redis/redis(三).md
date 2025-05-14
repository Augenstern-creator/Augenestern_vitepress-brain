# 1、分布式缓存

mybatis是里面有个`<cache></cache>`便签，可以实现分布式缓存，只要把里面的实现替换成redis的实现，就可以实现分布式缓存。**注意，增删改都会清除缓存。**

## 1.1、什么是缓存

- 定义: 缓存就是定义在**计算机内存**的数据
- 特点: ==读写快、断电立即丢失==
- 优点: 
  - **提高网站吞吐量，提高网站的响应速度**
  - **核心解决问题：通过缓存可以缓解对数据库的访问压力**

- 注意: 使用缓存时一定是**数据库中数据极少发生修改,更多用于查询的情况**。



## 1.2、本地缓存和分布式缓存

- 本地缓存: 存在应用**服务器内存中**的数据为本地缓存（local cache）
  - 例如我们的服务器 Tomcat，存在于 Tomcat 的缓存就是本地缓存。
  - 客户端访问应用Application，应用会去数据库进行查询，将查询结果放入Tomcat缓存。**本地缓存是在应用之内的**。

![](redis(三).assets/1.png)

- 分布式缓存: 存储在当前应用**服务器内存之外**的数据为分布式缓存（distribute cache）
  - 例如缓存放在 redis 中，redis 缓存是应用共享的，**独立于应用Application之外的**。

![](redis(三).assets/2.png)









## 1.3、集群和分布式

- 集群: 将**同一种服务的多个节点放在一起共同对系统提供服务**过程称之为集群。
  - 例如两台Tomcat共同对系统提供服务,这样就是Tomcat集群
- 分布式: 有**多个不同服务集群共同对系统系统提供服务**这个系统称之为分布式系统（distribute system），即**分布式是建立在集群**之上的。
  - 两台Tomcat、两个数据库共同对系统提过服务，这就是分布式系统。



















# 2、Redis实现分布式缓存

mybatis是里面有个`<cache></cache>`便签，开启之后是开启了二级缓存。

- 一级缓存也叫本地缓存，一级缓存是在会话(SqlSession)层面实现的，这就说明一级缓存作用范围只能在同一个SqlSession中，跨SqlSession是无效的。一级缓存是默认实现的
- **二级缓存也是本地缓存**，二级缓存是跨SqlSession的，跨会话共享



mybatis是里面有个`<cache></cache>`便签，开启之后是开启了二级缓存，但是MyBatis可以实现分布式缓存，我们只要把里面的实现替换成redis的实现，就可以实现分布式缓存。



## 2.1、自定义RedisCache

1. 自定义工具类

```java
//用来获取springboot创建好的工厂
@Component
public class ApplicationContextUtils implements ApplicationContextAware {

    //保留下来工厂
    private static ApplicationContext applicationContext;

    //将创建好工厂以参数形式传递给这个类
    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
    }



    //提供在工厂中获取对象的方法 //RedisTemplate  redisTemplate
    public static Object getBean(String beanName){
        return applicationContext.getBean(beanName);
    }

}
```

2. 自定义RedisCache,实现`Cache`接口（复制如下代码即可）

```java
//自定义Redis缓存实现
public class RedisCache implements Cache {


    //当前放入缓存的mapper的namespace
    private final String id;

    //必须存在构造方法
    public RedisCache(String id) {
        System.out.println("id:=====================> " + id);
        this.id = id;
    }

    //返回cache唯一标识
    @Override
    public String getId() {
        return this.id;
    }


    //缓存放入值 
    @Override
    public void putObject(Object key, Object value) {
        //使用redishash类型作为缓存存储模型  key   hashkey  value
        getRedisTemplate().opsForHash().put(id.toString(),getKeyToMD5(key.toString()),value);
    }

    //获取中获取数据
    @Override
    public Object getObject(Object key) {
        //根据key 从redis的hash类型中获取数据
        return getRedisTemplate().opsForHash().get(id.toString(), getKeyToMD5(key.toString()));
    }

    @Override
    public void clear() {
        System.out.println("清空缓存~~~");
        //清空namespace
        getRedisTemplate().delete(id.toString());//清空缓存
    }

    //用来计算缓存数量
    @Override
    public int getSize() {
        //获取hash中key value数量
        return getRedisTemplate().opsForHash().size(id.toString()).intValue();
    }


    //封装redisTemplate
    private RedisTemplate getRedisTemplate(){
        //通过application工具类获取redisTemplate
        RedisTemplate redisTemplate = (RedisTemplate) ApplicationContextUtils.getBean("redisTemplate");
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setHashKeySerializer(new StringRedisSerializer());
        return redisTemplate;
    }


    //封装一个对key进行md5处理方法(这样可以让放入redis中的key长度变小)
    private String getKeyToMD5(String key){
        return DigestUtils.md5DigestAsHex(key.getBytes());
    }

}
```



3. 在`xxxmapper.xml`中开启二级缓存并指向自定义RedisCache

```xml
<cache type="com.kuang.redis.cache.RedisCache">
```

> 但是当我们增删改的时候,缓存是需要被删除的，然后再放入更新后的数据到缓存。



- 当存在对多表时进行查询SQL语句，如果**增删改**，只会清空当前的nameSpace，其余关联的表的namespace并没有被清空，此时就会出现**脏读**问题。
- 解决办法: 在`xxxmapper.xml`中让多个cache指向同一个namespace

```xml
<cache-ref namespace="com.kuang.dao.UserDao"/>
```







# 3、Redis缓存

## 3.1、缓存雪崩

- 定义: 缓存雪崩就是瞬间过期数据量太大，导致对数据库服务器造成压力。在高并发下，大量缓存key在同一时间失效，导致大量请求直接落在数据库上，导致数据库宕机。
- 解决方案:
  - 根据对不同的业务的数据，根据吞吐量来设置随机因子来生成缓存时间，高并发的业务随机因子较大。
  - **缓存永久存储（不推荐）。**
  - 若是集群部署，可将热点数据均匀分布在不同的Redis库中也能够避免key全部失效问题。







## 3.2、缓存击穿

- 定义: 缓存击穿是指查询**一个数据库存在，Redis缓存不存在的数据（失效）**。单个高热数据过期的瞬间，数据访问量较大， 未命中redis后，发起了大量对同一数据的数据库访问，导致对 数据库服务器造成压力。
- 解决方案:
  - **设置热点数据"永不过期"**
  - **加上互斥锁**：上面的现象是多个线程同时去查询数据库的这条数据，那么我们可以在第一个查询数据的请求上使用一个互斥锁来锁住它，其他的线程走到这一步拿不到锁就等着，等第一个线程查询到了数据，然后将数据放到redis缓存起来。后面的线程进来发现已经有缓存了，就直接走缓存



## 3.3、缓存穿透(恶意)

- 定义: 缓存穿透，是指查询**一个数据库不存在，Redis缓存也不存在的数据**。例如数据库中没有id=-1的数据，这时如果外界疯狂查id=-1这个数据，先查询redis没有这个数据，再查询数据库也不存在这个数据即返回空，因此一直重复这个步骤，导致数据库压力过大，而出现宕机。
- 解决方案:
  - **不存在的数据缓存到redis中，设置key，value值为null**(不管是数据为null还是系统bug问题)，并设置一个短期过期时间段，避免过期时间过长影响正常用户使用。
  - **拉黑该IP地址**











# 4、Redis主从复制

- 主从复制: 是指将一台Redis服务器的数据，复制到其他的Redis服务器。前者称为主节点（Master/Leader）,后者称为从节点（Slave/Follower）， 数据的复制是单向的！只能由主节点复制到从节点（主节点以写为主、从节点以读为主）。
- 默认情况下，每台Redis服务器都是主节点，一个主节点可以有0个或者多个从节点，但每个从节点只能由有一个主节点。

> **主从复制架构仅仅用来解决数据的冗余备份,从节点仅仅用来同步数据**。无法实现主节点宕掉从节点自动顶上的操作。

![](redis(三).assets/3.png)

- 从机只能读，不能写，主机可读可写但是多用于写。
- 当主机断电宕机后，默认情况下从机的角色不会发生变化 ，集群中只是失去了写操作，当主机恢复以后，又会连接上从机恢复原状。
- 主从复制模式不常用,哨兵机制比较常用。

## 4.1、Redis哨兵机制

Sentinel（哨兵）是Redis 的高可用性解决方案: 由一个或多个Sentinel（哨兵）实例 组成的Sentinel（哨兵） 系统可以监视任意多个主服务器,以及这些主服务器属下的所有从服务器，并在被监视的主服务器进入下线状态时，自动将下线主服务器属下的某个从服务器升级为新的主服务器。

> 简单的说哨兵就是带有**自动故障转移功能的主从架构**。



### 4.1.1、单机单个哨兵

![](redis(三).assets/4.png)

哨兵的作用：

- 通过发送命令，让Redis服务器返回监控其运行状态，包括主服务器和从服务器。
- 当哨兵监测到master宕机，会自动将slave切换成master，然后通过**发布订阅模式**通知其他的从服务器，修改配置文件，让它们切换主机。



### 4.1.2、单机多个哨兵

![](redis(三).assets/5.png)



## 4.2、哨兵模式优缺点

优点：

1. 哨兵集群，基于主从复制模式，所有主从复制的优点，它都有
2. 主从可以切换，故障可以转移，系统的可用性更好
3. 哨兵模式是主从模式的升级，手动到自动，更加健壮

缺点：

1. Redis不好在线扩容，集群容量一旦达到上限，在线扩容就十分麻烦
2. 实现哨兵模式的配置其实是很麻烦的，里面有很多配置项













































































