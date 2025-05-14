



# 1、Spring JdbcTemplate

## 1.1、JdbcTemplate概述

- 它是spring框架中提供的一个对象，是对原始繁琐的Jdbc API对象的简单封装。
- spring框架为我们提供了很多的操作模板类。例如：
  - 操作关系型数据的`JdbcTemplate`和`HibernateTemplate`
  - 操作nosql数据库的`RedisTemplate`
  - 操作消息队列的`JmsTemplate`等等



## 1.2、JdbcTemplate开发步骤

1. 导入 spring-jdbc 和 spring-tx 坐标

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-jdbc</artifactId>
    <version>5.0.5.RELEASE</version>
</dependency>
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-tx</artifactId>
    <version>5.0.5.RELEASE</version>
</dependency>
```

2. 创建数据库account表和Account实体

![image-20210716152341425](传智spring(三).assets/image-20210716152341425.png)

```java
public class Account{
    private String name;
    private double money;
    //省略get和set方法
}
```

3. 创建 JdbcTemplate 对象

4. 执行数据库操作

```java
//测试jdbcTemplate开发步骤
@Test
public void test1() throws Exception {
    //1.创建数据源对象
    ComboPooledDataSource dataSource = new ComboPooledDataSource();
    dataSource.setDriverClass("com.mysql.jdbc.Driver");
    dataSource.setJdbcUrl("jdbc:mysql://localhost:3306/test");
    dataSource.setUser("root");
    dataSource.setPassword("123456");
    //2.创建JdbcTemplate对象
    JdbcTemplate jdbcTemplate = new JdbcTemplate();
    //3.设置数据源给JdbcTemplate
    jdbcTemplate.setDataSource(dataSource);
    //4.执行操作
    jdbcTemplate.update("insert into account value(?,?)","tom",5000);
}
```



## 1.3、Spring产生JdbcTemplate对象

- 我们可以将`JdbcTemplate` 的创建权交给 Spring，将数据源 `DataSource`的创建权也交给Spring
- 在Spring容器内部将数据源`DataSource` 注入到`JdbcTemplate` 模板对象中
- 配置如下：

```xml
<!--    数据源DataSource-->
<bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
    <property name="driverClass" value="com.mysql.jdbc.Driver" />
    <property name="jdbcUrl" value="jdbc:mysql://localhost:3306/test" />
    <property name="user" value="root" />
    <property name="password" value="root" />
</bean>
<!--    JdbcTemplat -->
<bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
    <property name="dataSource" ref="dataSource"></property>
</bean>
```

- 从容器中获得`JdbcTemplate`进行添加操作

```java
@Test
public void test2(){
    ClassPathXmlApplicationContext app = new ClassPathXmlApplicationContext("applicationContext.xml");
    JdbcTemplate jdbcTemplate = app.getBean(JdbcTemplate.class);
    jdbcTemplate.update("insert into account value(?,?)","tom",5000);
}
```



## 1.4、解耦配置

我们在配置数据源和 JdbcTemplate 时，可以将配置文件进行解耦抽取

- 在资源目录下新建`jdbc.properties`

```properties
jdbc.driver=com.mysql.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/test
jdbc.username=root
jdbc.password=root
```

- 修改spring核心配置文件，加载properties
  - 需要引入 context 命名空间

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation=
               "http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">

<!--    加载外部的properties文件-->
<context:property-placeholder location="classpath:jdbc.properties"/>
    
<!--    数据源DataSource-->
<bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
    <property name="driverClass" value="${jdbc.driver}" />
    <property name="jdbcUrl" value="${jdbc.url}" />
    <property name="user" value="${jdbc.username}" />
    <property name="password" value="${jdbc.password}" />
</bean>
<!--    JdbcTemplat -->
<bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
    <property name="dataSource" ref="dataSource"></property>
</bean>
```



# 2、JdbcTemplate常用操作

## 2.1、修改

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:applicationContext.xml")
public class JdbcTemplateCRUDTest {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    @Test
    //测试修改操作
    public void testUpdate(){
        jdbcTemplate.update("update account set money=? where name = ?",1000,"tom");
    }
}
```



## 2.2、删除

```java
@Test
public void testDelete(){
    jdbcTemplate.update("delete from account where name=?","tom");
}
```



## 2.3、查询

### 2.3.1、查询全部

```java
@Test
public void testQueryAll(){
    List<Account> accounts = jdbcTemplate.query("select * from account",new BeanPropertyRowMapper<Account>(Account.class));
    for(Account account:accounts){
        System.out.println(account.getName());
    }
}
```



### 2.3.1、查询单个数据

```java
@Test
//测试查询单个对象操作
public void testQueryOne(){
    Account account = jdbcTemplate.queryForObject("select * from account where name=?",new BeanPropertyRowMapper<Account>(Account.class),"tom");
    System.out.println(account.getName());
}

@Test
//测试查询单个简单数据操作(聚合查询)
public void testQueryCount(){
    Long count = jdbcTemplate.queryForObject("select count(*) from account",Long.class);
    System.out.println(count);
}
```







## 2.4、知识要点

1. 创建`JdbcTemplate`对象

```java
JdbcTemplate jdbcTemplate = new JdbcTemplate();
jdbcTemplate.setDataSource(dataSource);
```

2. 更新操作

```java
jdbcTemplate.update(sql,params);
```

3. 查询操作

```java
jdbcTemplate.query(sql,Mapper,params);
jdbcTemplate.queryForObject(sql,Mapper,params);
```



# 3、Spring事务

## 3.1、事务回顾

事务：保证一组数据库的操作，要么同时成功，要么同时失败

## 3.2、四大特性

- 隔离性

  多个事务之间要相互隔离，不能互相干扰

- 原子性

  指事务是一个不可分割的整体，类似一个不可分割的原子

- 一致性

  保障事务前后这组数据的状态是一致的。要么都是成功的，要么都是失败的。

- 持久性

  指事务一旦被提交，这组操作修改的数据就真的的发生变化了。即使接下来数据库故障也不应该对其有影响。

## 3.3、事务的隔离级

- 脏读：允许读取未提交的信息

  - 原因：Read uncommitted

  解决方案： （表级读锁）

![1591321851725](传智spring(三).assets/1591321851725.png)

- 不可重复读：读取过程中单个数据发生了变化
  - 解决方案： Repeatable read （行级写锁）

![1591321927034](传智spring(三).assets/1591321927034.png)

- 幻读：读取过程中数据条目发生了变化
  - 解决方案： Serializable（表级写锁）

![1591321959641](传智spring(三).assets/1591321959641.png)

## 3.4、事务管理

Spring在不同的事务管理API之上定义了一个抽象层，使得开发人员不必了解底层的事务管理API就可以
使用Spring的事务管理机制。Spring支持编程式事务管理和声明式的事务管理。

## 3.5、事务控制方式

- 编程式

- 声明式（XML）

- 声明式（注解）

**编程式事务管理**

- 将事务管理代码嵌到业务方法中来控制事务的提交和回滚
- 缺点：必须在每个事务操作业务逻辑中包含额外的事务管理代码

**声明式事务管理**

- 一般情况下比编程式事务好用
- 将事务管理代码从业务方法中分离出来，以声明的方式来实现事务管理。
- 将事务管理作为横切关注点，通过aop方法模块化。Spring中通过Spring AOP框架支持声明式事务
  管理。

## 3.6、事务管理器

- 无论使用Spring的哪种事务管理策略（编程式或者声明式）事务管理器都是必须的。

- 就是 Spring的核心事务管理抽象，管理封装了一组独立于技术的方法。

```xml
<bean id="transactionManager"
class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
<property name="dataSource" ref="dataSource" />
</bean>
```



# 4、实现声明式事务

1. **什么是声明式事务控制？**

- Spring 的声明式事务顾名思义就是==采用声明的方式来处理事务==
- 这里所说的声明，就是指在配置文件中声明，用在 Spring 配置文件中声明式的处理事务来代替代码式的处理事务。

==Spring 声明式事务控制底层就是AOP==

只要简单的加个注解(或者是xml配置)就可以实现事务控制，不需要事务控制的时候只需要去掉相应的注解即可。



## 4.1、案例环境准备

1. sql语句准备

![image-20210722152702971](传智spring(三).assets/image-20210722152702971.png)

```sql
CREATE DATABASE /*!32312 IF NOT EXISTS*/`spring_db` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `spring_db`;
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) DEFAULT NULL,
  `money` DOUBLE DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=INNODB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

INSERT  INTO `account`(`id`,`name`,`money`) VALUES 
(1,'三更',100),
(2,'草堂',100);
```

2. 创建实体类
   - com.sangeng.domain.Account.java

```java
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Account {
    private Integer id;
    private String name;
    private Double money;
}
```

3. 数据持久层接口和对应xml文件
   - com.sangeng.dao.AccountDao

```java
public interface AccountDao {
    public void updateMoney(@Param("id") Integer id, @Param("updatemoney") Double updatemoney);
}
```

resourecs/com/sangeng/dao.AccountDao.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.sangeng.dao.AccountDao">

    <update id="updateMoney" >
        update account set money = money + #{updatemoney} where id = #{id}
    </update>

</mapper>
```

3. 业务层接口和实现类
   - com.sangeng.service.AccountService
   - com.sangeng.service.impl.AccounttServiceImpl

```java
public interface AccountService {
    /**
     * 转账
     * @param outId 转出账户的id
     * @param inId  转入账户的id
     * @param money 转账金额
     */
    public void transfer(Integer outId,Integer inId,Double money);
}
```

```java
@Service
public class AccountServiceImpl implements AccountService {
    
    @Autowired
    private AccountDao accountDao;

    @Override
    public void transfer(Integer outId, Integer inId, Double money) {
        //增加
        accountDao.updateMoney(inId,money);
        //减少
        accountDao.updateMoney(outId,-money);

    }
}
```

4. spring整合mybatis

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="
       http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">
<!--    组件扫描,扫描com.sangeng包下的所有注解-->
    <context:component-scan base-package="com.sangeng"></context:component-scan>
<!--    读取properties文件-->
    <context:property-placeholder location="classpath:jdbc.properties"></context:property-placeholder>
<!--   创建连接池注入容器-->
    <bean class="com.alibaba.druid.pool.DruidDataSource" id="dataSource">
        <property name="driverClassName" value="${jdbc.driver}"/>
        <property name="url" value="${jdbc.url}"/>
        <property name="username" value="${jdbc.username}"/>
        <property name="password" value="${jdbc.password}"/>
   </bean>

    <bean class="org.mybatis.spring.SqlSessionFactoryBean" id="sessionFactoryBean">
        <property name="dataSource" ref="dataSource"/>
<!--        配置mybatis配置文件的路径-->
        <property name="configLocation" value="classpath:mybatis-config.xml"></property>
    </bean>

    <!--mapper扫描配置，扫描到的mapper对象会被注入Spring容器中-->
    <bean class="org.mybatis.spring.mapper.MapperScannerConfigurer" id="mapperScannerConfigurer">
        <property name="basePackage" value="com.sangeng.dao"></property>
    </bean>
</beans>
```

5. mybatis-config.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>


</configuration>
```

6. 测试类
   - test.java.com.sangeng.AccountTest

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(value = "classpath:applicationContext.xml")
public class AccountTest {

    @Autowired
    private AccountService accountService;

    @Test
    public void testTransfer(){
        accountService.transfer(1,2,new Double(10));
    }
}
```



## 4.2、注解实现声明式事务

```java
@Service
public class AccountServiceImpl implements AccountService {
    
    @Autowired
    private AccountDao accountDao;

    @Override
    public void transfer(Integer outId, Integer inId, Double money) {
        //增加
        accountDao.updateMoney(inId,money);
        int i = 1/0; //手动制造错误
        //减少
        accountDao.updateMoney(outId,-money);

    }
}
```

如果我们在业务层实现类出现错误，那么就会造成转入钱增加，但是因为执行不到后续代码，会造成转出的钱没有减少，解决方法就是在业务层实现类增加事务。

### 4.2.1、导入依赖

因为声明式事务底层是通过AOP实现的，所以最好把AOP相关依赖都加上。

```xml
<dependency>
    <groupId>org.aspectj</groupId>
    <artifactId>aspectjweaver</artifactId>
    <version>1.9.6</version>
</dependency>
```

### 4.2.2、配置事务管理器和事务注解驱动

在spring的配置文件中添加如下配置：

```xml
<!--把事务管理器注入Spring容器，需要配置一个连接池-->
<bean id="txManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
    <property name="dataSource" ref="dataSource"/>
</bean>
<!--开启事务注解驱动，配置使用的事务管理器-->
<tx:annotation-driven transaction-manager="txManager"/>
```

### 4.2.2、添加@Transactional注解

在需要进行事务控制的方法或者类上添加`@Transactional`注解就可以实现事务控制。

- 类上：如果加在类上，这个类的所有方法都会受事务控制
- 方法上：如果加在方法上，就是那一个方法受事务控制

```java
@Service
public class AccountServiceImpl implements AccountService {
    
    @Autowired
    private AccountDao accountDao;
	
    @Transactional
    @Override
    public void transfer(Integer outId, Integer inId, Double money) {
        //增加
        accountDao.updateMoney(inId,money);
        int i = 1/0; //手动制造错误
        //减少
        accountDao.updateMoney(outId,-money);

    }
}
```

**注意**：一般`@Transactional` 注解都是加在 service 层

## 4.3、xml实现声明式事务

### 4.3.1、导入依赖

因为声明式事务底层是通过AOP实现的，所以最好把AOP相关依赖都加上。

```xml
<dependency>
    <groupId>org.aspectj</groupId>
    <artifactId>aspectjweaver</artifactId>
    <version>1.9.6</version>
</dependency>
```

### 4.3.2、配置事务管理器

```xml
<bean id="txManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
    <property name="dataSource" ref="dataSource"/>
</bean>
```

### 4.3.3、配置事务切面

- 导入tx命名空间

```xml
<!--定义事务管理的通知类-->
<tx:advice transaction-manager="txManager" id="txAdvice">
    <tx:attributes>
        <tx:method name="transfer"/>
    </tx:attributes>
</tx:advice>

<aop:config>
    <aop:pointcut id="pt" expression="execution(* com.sangeng.service..*.*(..))"></aop:pointcut>
    <aop:advisor advice-ref="txAdvice" pointcut-ref="pt"></aop:advisor>
</aop:config>
```

## 4.4、切点方法的事务参数的配置

### 4.4.1、tx:advice

- 名称：`tx:advice`

- 类型：**标签**

- 归属：beans标签

- 作用：**专用于声明事务通知**

- 格式：

  ```xml
  <beans>
      <tx:advice id="txAdvice" transaction-manager="txManager">
      </tx:advice>
  </beans>
  ```

- 基本属性：

  - `id `：用于配置aop时指定通知器的id

  - `transaction-manager `：指定事务管理器bean



### 4.4.2、tx:attributes

- 名称：`tx:attributes`

- 类型：**标签**

- 归属：tx:advice标签

- 作用：**定义通知属性**

- 格式：

  ```xml
  <tx:advice id="txAdvice" transaction-manager="txManager">
      <tx:attributes>
      </tx:attributes>
  </tx:advice>
  ```

- 基本属性：

  - 无

### 4.4.3、tx:method

- 名称：`tx:method`

- 类型：**标签**

- 归属：tx:attribute标签

- 作用：**设置具体的事务属性**

- 格式：

  ```xml
  <tx:attributes>
      <tx:method name="*" read-only="false" />
      <tx:method name="get*" read-only="true" />
  </tx:attributes>
  ```

- 说明：

  通常事务属性会配置多个，包含1个读写的全事务属性，1个只读的查询类事务属性

- ·`tx:method` 属性

![image-20210717210335174](传智spring(三).assets/image-20210717210335174.png)

### 4.4.4、aop:advice与aop:advisor区别

- aop:advice配置的通知类可以是普通java对象，不实现接口，也不使用继承关系
- aop:advisor配置的通知类必须实现通知接口







## 4.5、属性配置

### 4.5.1、事务传播行为propagation

当事务方法嵌套调用时，需要控制是否开启新事务，可以使用事务传播行为来控制。

测试案例：

```java
@Service
public class TestServiceImpl {
    @Autowired
    AccountService accountService;

    @Transactional
    public void test(){
        accountService.transfer(1,2,10);
        accountService.log();
    }
}
```

```java
public class AccountServiceImpl implements AccountService {
	//...省略其他不相关代码
    @Transactional
    public void log() {
        System.out.println("打印日志");
        int i = 1/0;
    }
}
```

例如上述代码，我们转账方法 transfer 加上了事务控制注解，日志方法 log 也加上了事务控制注解，那如果我们转账方法成功运行，但是在日志方法出现错误，那么不光回滚日志方法，也会回滚转账方法。这就是事务方法嵌套使用时，我们需要用事务传播行为来控制是否需要开启新事务。

- 事务传播行为 `propagation`

| 属性值                             | 行为                                                     |
| ---------------------------------- | -------------------------------------------------------- |
| **REQUIRED（必须要有）默认值**     | **外层方法有事务，内层方法就加入。外层没有，内层就新建** |
| **REQUIRES_NEW（必须要有新事务）** | **外层方法有事务，内层方法新建。外层没有，内层也新建**   |
| SUPPORTS（支持有）                 | 外层方法有事务，内层方法就加入。外层没有，内层就也没有   |
| NOT_SUPPORTED（支持没有）          | 外层方法有事务，内层方法没有。外层没有，内层也没有       |
| MANDATORY（强制要求外层有）        | 外层方法有事务，内层方法加入。外层没有。内层就报错       |
| NEVER(绝不允许有)                  | 外层方法有事务，内层方法就报错。外层没有。内层就也没有   |

例如：

```java
@Transactional(propagation = Propagation.REQUIRES_NEW)
public void transfer(Integer outId, Integer inId, Double money) {
    //增加
    accoutDao.updateMoney(inId,money);
    //减少
    accoutDao.updateMoney(outId,-money);
}
```





### 4.5.2、隔离级别isolation

Isolation.DEFAULT 使用数据库默认隔离级别

Isolation.READ_UNCOMMITTED 

Isolation.READ_COMMITTED

Isolation.REPEATABLE_READ

Isolation.SERIALIZABLE

```java
@Transactional(propagation = Propagation.REQUIRES_NEW,isolation = Isolation.READ_COMMITTED)
public void transfer(Integer outId, Integer inId, Double money) {
    //增加
    accoutDao.updateMoney(inId,money);
    //减少
    accoutDao.updateMoney(outId,-money);
}
```



### 4.5.3、只读readOnly

如果事务中的操作都是读操作，没涉及到对数据的写操作可以设置readOnly为true。这样可以提高效率。

```java
@Transactional(readOnly = true)
public void log() {
    System.out.println("打印日志");
    int i = 1/0;
}
```































