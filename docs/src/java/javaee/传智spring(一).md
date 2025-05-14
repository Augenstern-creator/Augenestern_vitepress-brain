# 1、Spring

Spring的核心就是 控制反转(IoC)和面向切面(AOP) 。

控制反转IOC：控制反转，之前对象的控制权在类手上，现在反转后到了Spring手上。

面向切面(AOP) ：面向切面编程。是一种可以在不修改原来的核心代码的情况下给程序动态统一进行增强的一种技术。 

SpringAOP：批量对Spring容器中bean的方法做增强，并且这种增强不会与原来方法中的代码耦合。

## 1.0、Spring程序开发步骤

创建一个maven项目

1. **在pom.xml导入Spring开发的基本包坐标**

```xml
<!--导入spring的context坐标，context依赖core、beans、expression-->
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>spring-context</artifactId>
  <version>5.0.5.RELEASE</version>
</dependency>
```

2. **编写Dao接口和实现类**

> UserDao接口

```java
public interface UserDao{
    public void save();
}
```

> UserDaoImpl实现类

```java
public class UserDaoImpl implements UserDao{
    @Override
    public void save(){
        System.out.println("save running....");
    }
}
```

3. 在类路径下(resources)创建`applicationContext.xml`配置

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:p="http://www.springframework.org/schema/p"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    
    <!--
        classs:配置类的全类名
        id:配置一个唯一标识
    -->
    <bean id="userDao" class="com.itheima.dao.impl.UserDaoImpl">

    </bean>
</beans>    
```

4. 创建容器从容器中获取对象并测试

```java
public class UserDaoDemo {
    public static void main(String[] args) {、
        // 创建Spring容器，指定要读取的配置文件路径
        ApplicationContext app = new ClassPathXmlApplicationContext("applicationContext.xml");
        // 从容器中获取对象                                    
        UserDao userDao = (UserDao) app.getBean("userDao");
        // 调用对象的方法进行测试                                   
        userDao.save();
        //save running....
    }
}
```



# 2、Spring配置文件

## 2.1、Bean标签基本配置

默认情况下它调用的是类中的==无参构造函数==，如果没有无参构造函数则不能创建成功

### 2.1.1、bean

- 名称：bean

- 类型：**标签**

- 归属：beans标签

- 作用：定义spring中的资源，受此标签定义的资源将受到spring控制

- 格式：

  ```xml
  <beans>
  	<bean />
  </beans>
  ```

- 基本属性：

  ```xml
  <bean id="beanId" name="beanName1,beanName2" class="ClassName"></bean>
  ```

  `id`：bean的名称，通过id值获取bean。同一个Spring容器中不允许重复。

  `class`：Bean的全限定名称，用于反射创建对象

  `name`：bean的名称，可以通过name值获取bean，用于多人配合时给bean起别名

例如：

```xml
<bean id="userDao" name="userDao1,userDao2"  class="com.itheima.dao.impl.UserDaoImpl" >

</bean>
```

### 2.1.2、bean属性scope

- 名称：scope

- 类型：**属性**

- 归属：bean标签

- 作用：定义bean的作用范围

- 格式：

  ```xml
  <bean scope="singleton"></bean>
  ```

- 取值：

  - `singleton`：设定创建出的对象保存在spring容器中，是一个单例的对象,默认值
  - `prototype`：设定创建出的对象保存在spring容器中，是一个非单例的对象
  - request、session、application、 websocket ：设定创建出的对象放置在web容器对应的位置

#### 2.1.2.1、singleton

- 将scope作用范围设置为单例

```xml
<bean id="userDao" class="com.itheima.dao.impl.UserDaoImpl" scope="singleton">

</bean>
```

- 测试

```java
@Test
// 测试scope属性
public void test1(){
    ClassPathXmlApplicationContext app = new ClassPathXmlApplicationContext("applicationContext.xml");
    UserDao userDao1 = (UserDao) app.getBean("userDao");
    UserDao userDao2 = (UserDao) app.getBean("userDao");
    System.out.println(userDao1 == userDao2);
    // true,两次创建出来的对象是相同的
}
```

#### 2.1.2.2、prototype

- 将scope作用范围设置为多例

```xml
<bean id="userDao" class="com.itheima.dao.impl.UserDaoImpl" scope="prototype">

</bean>
```

- 测试

```java
@Test
// 测试scope属性
public void test1(){
    ClassPathXmlApplicationContext app = new ClassPathXmlApplicationContext("applicationContext.xml");
    UserDao userDao1 = (UserDao) app.getBean("userDao");
    UserDao userDao2 = (UserDao) app.getBean("userDao");
    System.out.println(userDao1 == userDao2);
    // false,两次创建出来的对象是不相同的
}
```

### 2.1.3、bean声明周期

- 名称：init-method，destroy-method

- 类型：**属性**

- 归属：bean标签

- 作用：定义bean对象在初始化或销毁时完成的工作

- 格式：

  ```xml
  <bean init-method="init" destroy-method="destroy"></bean>
  ```

- 取值：bean对应的类中对应的具体方法名

- 注意事项：

  - 当scope=“singleton”时，spring容器中有且仅有一个对象，init方法在创建容器时仅执行一次

  - 当scope=“prototype”时，spring容器要创建同一类型的多个对象，init方法在每个对象创建时均执行一次

  - 当scope=“singleton”时，关闭容器会导致bean实例的销毁，调用destroy方法一次

  - 当scope=“prototype”时，对象的销毁由垃圾回收机制gc()控制，destroy方法将不会被执行





### 2.1.4、总结

1. **当scope的取值为==singleton==时**

- Bean的实例化个数：1个

- Bean的实例化时机：当Spring核心文件被加载时,实例化配置的Bean实例

  - ```java
    ClassPathXmlApplicationContext app = new ClassPathXmlApplicationContext("applicationContext.xml");
    ```

  - 也就是上述代码执行时，实例化配置的Bean实例

- Bean的生命周期
  - 对象创建：当应用加载，创建Spring容器时，对象就被创建了
  - 对象运行：只要Spring容器在，对象一直活着
  - 对象销毁：当应用卸载，销毁容器时，对象就被销毁了

2. **当scope的取值为==prototype==时**

- Bean的实例化个数：多个

- Bean的实例化时机：当调用`getBean()`方法时实例化Bean实例

  - ```java
    ClassPathXmlApplicationContext app = new ClassPathXmlApplicationContext("applicationContext.xml");
    UserDao userDao1 = (UserDao) app.getBean("userDao");
    ```

- Bean的生命周期

  - 对象创建：当使用对象时，创建新的对象实例
  - 对象运行：只要对象在使用中，就一直或者
  - 对象销毁：当对象长时间不用时，被 Java 的垃圾回收期回收

## 2.2、Bean实例化三种方式

- 无参==构造==方法实例化(**重要**)
- 工厂==静态==方法实例化(了解)
- 工厂==实例==方法实例化(了解) 

### 2.2.1、无参==构造==方法实例化

它会根据默认无参构造方法来创建类对象，如果bean中没有默认无参构造函数，将会创建失败

```xml
<!--    无参构造创建对象-->
<bean id="userDao" class="com.itheima.dao.impl.UserDaoImpl" 

</bean>
```



### 2.2.2、工厂==静态==方法实例化

工厂的静态方法返回Bean实例 ：

- 使用`class`属性来指定包含`static`工厂方法的类的全限名
- 使用`factory-method` 属性来指定工厂方法本身的名称

1. 编写工厂静态方法

```java
/**
 * 工厂静态方法
 */
public class StaticFactory {
    public static UserDao getUserDao(){
        return new UserDaoImpl();
    }
}
```

2. 在Spring核心配置文件配置

```xml
<!--    工厂静态方法创建对象-->
<bean id="userDao" class="com.itheima.factory.StaticFactory" factory-method="getUserDao">

</bean>
```

### 2.2.3、工厂==实例==方法实例化

工厂的非静态方法返回Bean实例：

- 使用此机制，请将`class`属性留空，并在`factory-bean`属性中，指定包含要创建对象的实例方法的bean的名称
- 使用`factory-method`属性设置工厂方法本身的名称

1. 编写工厂实例方法

```java
/**
 * 工厂实例方法创建对象
 */
public class DynamicFactory {
    public  UserDao getUserDao(){
        return new UserDaoImpl();
    }
}
```

2. 在Spring核心配置文件配置

```xml
<!--    工厂实例方法创建对象-->
<bean id="factory" class="com.itheima.factory.DynamicFactory"></bean>
<bean id="userDao" factory-bean="factory" factory-method="getUserDao" />
```

## 2.3、Bean的DI依赖注入

- IoC（Inversion Of Control）控制翻转，==Spring反向控制应用程序所需要使用的外部资源==
- DI（Dependency Injection）依赖注入，==应用程序运行依赖的资源由Spring为其提供，资源进入应用程序的方式称为注入==

![image-20210717110553430](传智spring(一).assets/image-20210717110553430.png)



因为UserService和UserDao都在Spring容器中，而最终程序直接使用的是UserService，所以可以在Spring容器中，将UserDao设置到UserService内部。

![image-20210713143019099](传智spring(一).assets/image-20210713143019099.png)



### 2.3.1、依赖注入概念

- 依赖注入 ==Dependency Injection==：它是Spring框架核心IOC的具体实现

- 在编写程序时，通过控制反转，把对象的创建交给了 Spring，但是代码中不可能出现没有依赖的情况。IOC 解耦只是降低他们的依赖关系，但不会消除。例如：业务层(Service)仍会调用持久层(Dao)的方法。

- 简单的说，就是坐等框架把持久层(Dao)对象传入业务层(Service)，而不用我们自己去获取

### 2.3.2、依赖注入方式

怎么将UserDao(持久层)怎样注入到UserService(业务层)内部呢？

- ==构造方法==
- ==set方法==

#### 2.3.2.1、set方法注入(主流)

- 名称：property

- 类型：**标签**

- 归属：bean标签

- 作用：使用set方法的形式为bean提供资源

- 格式：

  ```java
  <bean>
  	<property />
  </bean>
  ```

- 基本属性：

  ```xml
  <property name="propertyName" value="propertyValue" ref="beanId"/>
  ```

​		`name`：对应bean中的属性名，要求该属性必须提供可访问的set方法（严格规范为此名称是set方法对应名称）

​		`value`：设定非引用类型属性对应的值，不能与ref同时使用

​		`ref`：设定引用类型属性对应bean的id ，不能与value同时使用

- 注意：一个bean可以有多个property标签

要求被注入的属性，必须有set方法，set方法的方法名由==set + 属性首字母大写==，

1. 在UserServiceImpl中添加setUserDao方法

```java
public class UserServiceImpl implements UserService {
    private UserDao userDao;
    public void setUserDao(UserDao userDao){
        this.userDao = userDao;
    }
    @Override
    public void save() {
        userDao.save();
    }
}
```

2. 配置Spring容器调用set方法进行注入
   - ==注意点：这里的值是一个引用,ref==

```xml
<bean id="userDao" class="com.itheima.dao.impl.UserDaoImpl"></bean>
<bean id="userService" class="com.itheima.service.impl.UserServiceImpl">
    <!--        name是属性名,也就是setUserDao方法去掉set,之后首字母小写-->
    <!--        Bean引用注入,用ref-->
    <property name="userDao" ref="userDao"></property>
</bean>
```



#### 2.3.2.2、构造方式注入（了解）

- 名称：constructor-arg

- 类型：**标签**

- 归属：bean标签

- 作用：使用构造方法的形式为bean提供资源，兼容早期遗留系统的升级工作

- 格式：

  ```xml
  <bean>
  	<constructor-arg />
  </bean>
  ```

- 基本属性：

  ```xml
  <constructor-arg name="argsName" value="argsValue />
  ```

  ​	`name`：对应bean中的构造方法所携带的参数名

  ​	`value`：设定**非引用类型**构造方法参数对应的值，不能与ref同时使用

- 其他属性：

```xml
<constructor-arg index="arg-index" type="arg-type" ref="beanId"/>
```

​			`ref`：设定**引用类型**构造方法参数对应bean的id ，不能与value同时使用

​		`type` ：设定构造方法参数的类型，用于按类型匹配参数或进行类型校验

​		`index` ：设定构造方法参数的位置，用于按位置匹配参数，参数index值从0开始计数

- **注意**：一个bean可以有多个constructor-arg标签

1. 创建有参构造

```java
public class UserServiceImpl implements UserService {
    private UserDao userDao;

    public UserServiceImpl(UserDao userDao) {
        this.userDao = userDao;
    }
    @Override
    public void save() {
        userDao.save();
    }
}
```

2. 配置Spring容器调用有参构造时进行注入

```xml
<bean id="userDao" class="com.itheima.dao.impl.UserDaoImpl"></bean>
<bean id="userService" class="com.itheima.service.impl.UserServiceImpl">
    <constructor-arg name="userDao" ref="userDao"></constructor-arg>
</bean>
```

### 2.3.3、依赖注入数据类型

上面的操作，都是注入的引用Bean，都是对UserDao对象的引用进行注入的，除了对象的引用可以注入，普通数据类型，集合等都可以在容器中进行注入。

对于**集合数据类型**注入：

- 名称：array，list，set，map，props

- 类型：**标签**

- 归属：property标签 或 constructor-arg标签

- 作用：注入集合数据类型属性

- 格式：

  ```xml
  <property>
  	<list></list>
  </property>
  ```

1. **常量注入**

```xml
<bean id="student" class="com.kuang.pojo.Student">
<!--        第一种,普通值注入,value-->
</bean>
```

2. **Bean注入**
   - ==注意点：这里的值是一个引用,ref==

```xml
<bean id="student" class="com.kuang.pojo.Student">
<!--        第二种,Bean注入,ref-->
    <property name="address" ref="address" />
</bean>
```

3. **数组注入**

```xml
<bean id="student" class="com.kuang.pojo.Student">
<!--        第三种,数组注入-->
    <property name="books">
        <array>
            <value>红楼梦</value>
            <value>西游记</value>
            <value>水浒传</value>
            <value>三国演义</value>
        </array>
    </property>
</bean>
```

4. **List注入**

```xml
<bean id="student" class="com.kuang.pojo.Student">
<!--        第四种,List注入-->
    <property name="hobbys">
        <list>
            <value>听歌</value>
            <value>看木鱼水心</value>
            <value>敲代码</value>
            <value>玩游戏哈哈</value>
        </list>
    </property>
</bean>
```

5. **Map注入**

```xml
<bean id="student" class="com.kuang.pojo.Student">
<!--        第五种,Map注入-->
    <property name="card">
        <map>
            <entry key="身份证" value="123456123456123456" />
            <entry key="银行卡" value="654321654321654321" />
        </map>
    </property>
</bean>
```

6. **set注入**

```xml
<bean id="student" class="com.kuang.pojo.Student">
<!--        第六种,Set注入-->
    <property name="games">
        <set>
            <value>英雄联盟</value>
            <value>刀塔</value>
            <value>刺客信条</value>
            <value>虐杀原型</value>
        </set>
    </property>
</bean>
```

7. **null注入**

```xml
<bean id="student" class="com.kuang.pojo.Student">
<!--        null空值注入-->
    <property name="wife">
        <null />
    </property>
</bean>
```

8. **Properties注入**

```xml
<bean id="student" class="com.kuang.pojo.Student">
<!--        properties
    		key = value
-->
    <property name="info">
        <props>
            <prop key="driver">20190525</prop>
            <prop key="url">男</prop>
            <prop key="username">林晓</prop>
            <prop key="password">123456</prop>
        </props>
    </property>
</bean>   
```



#### 2.3.3.1、普通数据类型注入

```java
public class UserDaoImpl implements UserDao {
    private String username;
    private int age;

    public void setUsername(String username) {
        this.username = username;
    }

    public void setAge(int age) {
        this.age = age;
    }

    @Override
    public void save() {
        System.out.println(username+"===="+age);
        System.out.println("save running....");
    }
}
```

- 在Spring核心配置文件进行配置
  - 普通值的注入,用`value`

```xml
<bean id="userDao" class="com.itheima.dao.impl.UserDaoImpl">
     <!--        name是属性名,也就是setUsername方法去掉set,之后首字母小写-->
     <!--        name是属性名,也就是setAge方法去掉set,之后首字母小写-->
     <!--        普通值的注入,用value-->
    <property name="username" value="zhangsan"/>
    <property name="age" value="18" />
</bean>
```

#### 2.3.3.2、List集合注入

1. 集合数据类型`List<String>`的注入

```java
public class UserDaoImpl implements UserDao {
   privata List<String> strList;
   public void setStrList(List<String> strList){
       this.strList = strList;
   }

    @Override
    public void save() {
        System.out.println("save running....");
    }
}
```

- 在Spring核心配置文件进行配置

```xml
<bean id="userDao" class="com.itheima.dao.impl.UserDaoImpl">
    <!--        name是属性名,也就是setStrList方法去掉set,之后首字母小写-->
    <property name="strList">
        <list>
            <value>aaa</value>
            <value>bbb</value>
            <value>ccc</value>
            <value>ddd</value>
        </list>
    </property>
</bean>
```

2. 集合数据类型`List<User>`的注入
   - 新建一个实体类User，属性有name、addr，包含getter/setter，有/无参构造，toString方法

```java
public class UserDaoImpl implements UserDao {
   privata List<User> strList;
   public void setUserList(List<User> userList){
       this.userList = userList;
   }

    @Override
    public void save() {
        System.out.println(userList);
        System.out.println("save running....");
    }
}
```

- 在Spring核心配置文件进行配置

```xml
<bean id="u1" class="com.itheima.domain.User">
    
<bean id="userDao" class="com.itheima.dao.impl.UserDaoImpl">
    <!--        name是属性名,也就是setStrList方法去掉set,之后首字母小写-->
    <property name="userList">
        <list>
            <bean class = "com.itheima.domain.User" />
            <ref bean="u1">
        </list>
    </property>
</bean>  
```

#### 2.3.3.3、Map集合注入

集合数据类型`Map<String,User>`的注入

```java
public class UserDaoImpl implements UserDao {
   privata Map<String,User> userMap;
   public void setUserMap(Map<String,User> userMap){
       this.userMap = userMap;
   }

    @Override
    public void save() {
        System.out.println(userMap);
        System.out.println("save running....");
    }
}
```

- 在Spring核心配置文件进行配置

```xml
<bean id="user1" class="com.itheima.domain.User">
    <!--        name是属性名,也就是setNmae方法去掉set,之后首字母小写-->
    <!--        name是属性名,也就是setAddr方法去掉set,之后首字母小写-->
    <property name="name" value="张三">
    <property name="addr" value="西安">    
</bean>
<bean id="user2" class="com.itheima.domain.User">
    <property name="name" value="李四">
    <property name="addr" value="北京">    
</bean> 
        
<bean id="userDao" class="com.itheima.dao.impl.UserDaoImpl">
    <!--        name是属性名,也就是setUserMap方法去掉set,之后首字母小写-->
    <property name="userMap">
        <map>
            <!--       这里的key可以随便写,但是后面的value-ref代表bean的引用-->
            <entry key="u1" value-ref="user1">
            <entry key="u2" value-ref="user2">
        </map>
    </property>
</bean> 
```



#### 2.3.3.4、Properties注入

集合数据类型`Properties`的注入

```java
public class UserDaoImpl implements UserDao {
   privata Properties properties;
    
   public void setProperties(Properties properties){
       this.properties = properties;
   }

    @Override
    public void save() {
        System.out.println(properties);
        System.out.println("save running....");
    }
}
```

- 在Spring核心配置文件进行配置

```xml
<bean id="userDao" class="com.itheima.dao.impl.UserDaoImpl">
    <!--        name是属性名,也就是setProperties方法去掉set,之后首字母小写-->
    <!--        properties
    			key = value
	-->
    <property name="properties">
        <props>
            <prop key="driver">20190525</prop>
            <prop key="url">男</prop>
            <prop key="username">林晓</prop>
            <prop key="password">123456</prop>
        </props>
    </property>
</bean> 
```

### 2.3.4、使用p命名空间简化配置（了解）

- 名称：p:propertyName，p:propertyName-ref

- 类型：**属性**

- 归属：bean标签

- 作用：为bean注入属性值

- 格式：

  ```xml
  <bean p:propertyName="propertyValue" p:propertyName-ref="beanId"/>
  ```

- 注意：使用p命令空间需要先开启spring对p命令空间的的支持，在beans标签中添加对应空间支持

  ```xml
  <beans xmlns="http://www.springframework.org/schema/beans"    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"    xmlns:p="http://www.springframework.org/schema/p"       xsi:schemaLocation="http://www.springframework.org/schema/beans     https://www.springframework.org/schema/beans/spring-beans.xsd">
  ```

- 例子

```xml
<bean id="userService" class="com.itheima.service.impl.UserServiceImpl">
    <property name="userDao" ref="userDao" />
    <property name="bookDao" ref="bookDao" />
</bean>
```

改为：

```xml
<bean
   id="userService"
   class="com.itheima.service.impl.UserServiceImpl"
   p:userDao-ref="userDao"
   p:bookDao-ref="bookDao"
/>
```



## 2.4、团队开发

import 一般用于团队开发使用，可以将多个 beans.xml 配置文件，导入合并为一个。

- 名称：import

- 类型：**标签**

- 归属：beans标签

- 作用：在当前配置文件中导入其他配置文件中的项

- 格式：

  ```xml
  <beans>
      <import />
  </beans>
  ```

- 基本属性：

  ```xml
  <import resource=“config.xml"/>
  ```

​	resource：加载的配置文件名

- Spring容器加载多个配置文件

  ```java
  new ClassPathXmlApplicationContext("config1.xml","config2.xml");
  ```

- Spring容器中的bean定义冲突问题

  - 同id的bean，后定义的覆盖先定义的

  - 导入配置文件可以理解为将导入的配置文件复制粘贴到对应位置

  - 导入配置文件的顺序与位置不同可能会导致最终程序运行结果不同

假设，现在项目中有多个人开发，这三个人复制不同的类开发，不同的类需要注册在不同的bean中，我们可以利用 import 将所有人的 beans.xml 合并为一个总的！

- 张三
- 李四
- 王五
- applicationContext.xml

```xml
<import resource="{path}/beans.xml"/>
<import resource="{path}/beans1.xml"/>
<import resource="{path}/beans2.xml"/>
```



# 3、Spring配置数据源

## 3.1、数据源的作用

- 数据源就是连接池
- 事先实例化数据源，初始化部分连接资源
- 使用连接资源时从数据源中获取
- 使用完毕后将连接资源归还给数据源

- 常见的数据源(连接池)：DBCP、C3P0、Druid等



## 3.2、数据源开发步骤

1. 导入数据源的坐标和数据库驱动坐标

```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>5.1.47</version>
</dependency>
<dependency>
    <groupId>c3p0</groupId>
    <artifactId>c3p0</artifactId>
    <version>0.9.1.2</version>
</dependency>
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid</artifactId>
    <version>1.1.10</version>
</dependency>
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.11</version>
</dependency>
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
    <version>5.0.5.RELEASE</version>
</dependency>
```

2. 在资源resources目录下新建`jdbc.properties`

```properties
jdbc.driver=com.mysql.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/test
jdbc.username=root
jdbc.password=root
```

3. applicationContext.xml加载jdbc.properties配置文件获得连接信息

   - 首先引入context命名空间和约束路径

   - 命名空间

     ```xml
     xmlns:context="http://www.springframework.org/schema/context"
     ```

   - 约束路径

     ```xml
     http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd
     ```

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
    <bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
        <property name="driverClass" value="${jdbc.driver}"/>
        <property name="jdbcUrl" value="${jdbc.url}"/>
        <property name="user" value="${jdbc.username}"/>
        <property name="password" value="${jdbc.password}"/>
    </bean>
</beans>
```

4. 测试

```java
@Test
//测试手动创建c3p0数据源(加载properties配置文件)
public void test03() throws Exception {
    //加载类路径下的jdbc.properties
    ResourceBundle rb = ResourceBundle.getBundle("jdbc");
    ComboPooledDataSource dataSource = new ComboPooledDataSource();
    dataSource.setDriverClass(rb.getString("jdbc.drier"));
    dataSource.setJdbcUrl(rb.getString("jdbc.url"));
    dataSource.setUser("jdbc.username");
    dataSource.setPassword("jdbc.password");
    Connection connection = dataSource.getConnection();


}
```



## 3.3、Spring相关API

### 3.3.1、applicationContext接口

- `applicationContext` ：接口类型，代表应用上下文，可以通过其实例获得Spring容器中的Bean对象

### 3.3.2、applicationContext实现类

- `ClassPathXmlApplicationContext` : 它是从类的根路径下加载配置文件，推荐使用这种
- `FileSystemXmlApplicationContext` : 它是从磁盘路径上加载配置文件，配置文件可以在磁盘的任意位置
- `AnnotationConfigApplicationContext` : 当使用注解配置容器对象时，需要使用此类来创建 spring 容器。它用来读取注解



### 3.3.3、getBean()方法

- `getBean("id")` : 当参数的数据类型是字符串时，表示根据 Bean 的 id 从容器中获得Bean实例，返回是Object，需要强转。
- `getBean(class)` ：当参数的数据类型是Class字节码类型时，表示根据类型从容器中匹配Bean实例，当容器中相同类型的Bean有多个时，则此方法会报错



### 3.3.4、重点API

```java
ApplicationContext app = new ClasspathXmlApplicationContext("xml文件");
app.getBean("id");
app.getBean(class);
```

# 4、Spring注解开发

Spring是轻代码而重配置的框架，配置比较繁重，影响开发效率，所以注解开发是一种趋势，注解代替xml配置文件可以简化配置，提高开发效率。 

## 4.1、Spring原始注解

Spring原始注解主要是替代Bean的配置

==注意==：

- 使用注解进行开发时，需要在applicationContext.xml中配置组件扫描，作用是指定哪个包及其子包下的Bean需要进行扫描以便识别使用注解配置的类、字段和方法

```xml
<!--指定要扫描的包，这个包下的注解就会生效-->
<context:component-scan base-package="com.itheima"/>
```

- 说明
  - 在进行包所扫描时，会对配置的包及其子包中所有文件进行扫描
  - 扫描过程是以文件夹递归迭代的形式进行的
  - 扫描过程仅读取合法的java文件
  - 扫描时仅读取spring可识别的注解
  - 扫描结束后会将可识别的有效注解转化为spring对应的资源加入IoC容器
- 注意
  - 无论是注解格式还是XML配置格式，最终都是将资源加载到IoC容器中，差别仅仅是数据读取方式不同
  - 从加载效率上来说注解优于XML配置文件

- 我们也可以开启属性注解支持，这样所有注解都可生效

```xml
<!--开启属性注解支持-->
<context: annotation-config/>
```

| 注解           | 说明                                            |
| -------------- | ----------------------------------------------- |
| @Component     | 使用在类上个用于实例化Bean                      |
| @Controller    | 使用在web层类上用于实例化Bean                   |
| @Service       | 使用在service层类上用于实例化Bean               |
| @Repository    | 使用在dao层类上用于实例化Bean                   |
| @Autowired     | 使用在字段上上用于根据类型依赖注入              |
| @Qualifier     | 结合@Autowired一起使用用于根据名称进行依赖注入  |
| @Resource      | 相当于@Autowired + @Qualifier，按照名称进行注入 |
| @Value         | 注入普通属性                                    |
| @Scope         | 标注Bean的作用范围                              |
| @PostConstruct | 使用在方法上标注方法是Bean的初始化方法          |
| @PreDestroy    | 使用在方法上标注该方法是Bean的销毁方法          |

## 4.2、Bean的定义

我们之前都是使用 bean 的标签进行bean注入，但是实际开发中，我们一般都会使用注解！

- 名称：@Component    @Controller    @Service    @Repository

- 类型：**类注解**

- 位置：**类定义上方**

- 作用：设置该类为spring管理的bean

- 范例：

  ```java
  @Component
  public class ClassName{}
  ```

- 说明：

  - @Controller、@Service 、@Repository是@Component的衍生注解，功能同@Component，如果是其他类可以使用@Component。

- 相关属性

  - value（默认）：定义bean的访问id

---

使用`@Component`标识UserDaoImpl需要Spring进行实例化

```java
// 等价于<bean id="userDao" class="com.itheima.Dao.impl.UserDaoImpl"></bean>
@Component("userDao")
public class UserDaoImpl implements UserDao {
    @Override
    public void save() {
        System.out.println("save running...");
    }
}
```



## 4.3、作用域注解

使用`@Scope`标注Bean的范围

- 名称：`@Scope`

- 类型：**类注解**

- 位置：**类定义上方**

- 作用：设置该类作为bean对应的scope属性

- 范例：

  ```java
  @Scope
  public class ClassName{}
  ```

- 相关属性

  - value（默认）：定义bean的作用域，默认为singleton

```java
//@Scope("prototype")
@Scope("singleton")
public class UserDaoImpl implements UserDao{
    
}
```

## 4.4、衍生注解

`@Component` 有几个衍生注解，我们在 web 开发中，会按照mvc三层架构分层！

- dao层： `@Repository` 
- service层： `@Service`
- controller层：`@Controller`

这四个注解功能都是一样的，都是代表将某个类注册到Spring中，装配Bean

```java
@Repository
public class UserDao {
}
```

```java
@Service
public class UserService {
}
```

```java
@Controller
public class UserController {
}
```

写上这些注解，就相当于将这个类交给Spring管理装配了！



## 4.5、bean的生命周期

- 名称：`@PostConstruct`、`@PreDestroy`

- 类型：**方法注解**

- 位置：**方法定义上方**

- 作用：设置该类作为bean对应的生命周期方法

- 范例：

```java
@PostConstruct
public void init() { 
    System.out.println("初始化方法..."); 
}

@PreDestory
public void destroy(){
    System.out.println("销毁方法..."); 
}
```

## 4.6、加载第三方资源

- 名称：`@Bean`

- 类型：**方法注解**

- 位置：**方法定义上方**

- 作用：设置该方法的返回值作为spring管理的bean

- 范例：

  ```java
  @Bean("dataSource")
  public DruidDataSource createDataSource() {    return ……;    }
  ```

- 说明：

  - 因为第三方bean无法在其源码上进行修改，使用@Bean解决第三方bean的引入问题

  - 该注解用于替代XML配置中的静态工厂与实例工厂创建bean，不区分方法是否为静态或非静态

  - @Bean所在的类必须被spring扫描加载，否则该注解无法生效

- 相关属性

  - value（默认）：定义bean的访问id



## 4.7、bean的非引用类型属性注入

- 名称：`@Value`

- 类型：**属性注解、方法注解**

- 位置：**属性定义上方，方法定义上方**

- 作用：设置对应属性的值或对方法进行传参

- 范例：

  ```java
  @Value("${jdbc.username}")
  private String username;
  ```

- 说明：

  - value值仅支持非引用类型数据，赋值时对方法的所有参数全部赋值

  - value值支持读取properties文件中的属性值，通过类属性将properties中数据传入类中

  - @value注解如果添加在属性上方，可以省略set方法（set方法的目的是为属性赋值）

- 相关属性

  - value（默认）：定义对应的属性值或参数值

```java
@Component("userDao")
public class UserDaoImpl implements UserDao {
    @Value("注入普通数据")
    private String str;
    @Value("${jdbc.driver}")
    private String driver;
    
    @Override
    public void save() {
        System.out.println("save running...");
    }
}
```



## 4.8、bean的引用类型属性注入

- 名称：`@Autowired`、`@Qualifier`

- 类型：**属性注解、方法注解**

- 位置：**属性定义上方，方法定义上方**

- 作用：设置对应属性的对象或对方法进行引用类型传参

- 范例：

  ```java
  @Autowired(required = false)
  @Qualifier("userDao")
  private UserDao userDao;
  ```

- 说明：

  - @Autowired默认按类型装配，指定@Qualifier后可以指定自动装配的bean的id

- 相关属性

  - required：定义该属性是否允许为null



---

**自动装配注解感觉视频没有讲解到位，这里引用狂神的案例来进行记录**

## 4.6、Bean的自动装配

- 自动装配是Spring满足bean依赖的一种方式
- Spring 会在上下文中自动寻找，并自动给 bean 装配属性！

在Spring中有三种装配的方式

1. 在xml中显示的配置
2. 在java中显示配置
3. 隐式的自动装配bean【重要】下面主要记录第三种

### 4.6.1、测试环境搭建

1. 新建两个实体类,Cat、Dog 都有一个叫的方法

```java
public class Cat {
    public void shout(){
        System.out.println("喵~");
    }
}
```

```java
public class Dog {
    public void shout(){
        System.out.println("汪~");
    }
}
```

2. 新建一个人类，人类含有狗、猫两个变量

```java
public class People {
    private Cat cat;
    private Dog dog;
    private String name;

    public Cat getCat() {
        return cat;
    }

    public void setCat(Cat cat) {
        this.cat = cat;
    }

    public Dog getDog() {
        return dog;
    }

    public void setDog(Dog dog) {
        this.dog = dog;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "People{" +
                "cat=" + cat +
                ", dog=" + dog +
                ", name='" + name + '\'' +
                '}';
    }
}
```

3. 编写Spring核心配置文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="cat" class="com.kuang.pojo.Cat" />
    <bean id="dog" class="com.kuang.pojo.Dog" />
    
    <bean id="people" class="com.kuang.pojo.People" >
        <property name="name" value="小林子呀~" />
        <property name="cat" ref="cat" />
        <property name="dog" ref="dog" />
    </bean>
    
</beans>
```

4. 测试类测试

```java
public class Mytest {
    @Test
    public void test01(){
        ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
        People people = (People) context.getBean("people");
        people.getDog().shout();//汪~
        people.getCat().shout();//喵~

    }
}
```

### 4.6.2、byName自动装配

-  `autowire="byName"`**（按名称自动装配）**

- 由于在手动配置xml过程中，常常发生字母缺漏和大小写等错误，而无法对其进行检查，使得开发效率降低，采用自动装配将避免这些错误，并且使配置简单化。

1. 修改bean配置，增加一个属性 `autowire="byName"`

```xml
<bean id="cat" class="com.kuang.pojo.Cat" />
<bean id="dog" class="com.kuang.pojo.Dog" />

<bean id="people" class="com.kuang.pojo.People" autowire="byName">
    <property name="name" value="小林子呀~" />
	<property name="cat" ref="cat" />
	<property name="dog" ref="dog" />
</bean>
```

2. 我们将 cat 的bean id 修改为 catXXX，如下

```xml
<bean id="cat123" class="com.kuang.pojo.Cat" />
```

3. 再次测试，报错

**解释**：

当一个 bean 节点带有 `autowire="byName"`的属性时。

1. 将查找其类中所有的 set 方法名，例如 set Cat，获得将 set 去掉并且首字母小写的字符串，即 cat。
2. 去Spring容器中寻找是否有此字符串名称 id 的对象，例如去找 cat
3. 如果有，就取出注入；如果没有，就报空指针异常



### 4.6.3、byType自动装配

- `autowire="byType" ` (按类型自动装配)

- 使用 `autowire="byType"` 首先需要保证：同一类型的对象，在Spring容器中唯一（也就是bean中class属性必须只有一个）。如果不唯一，则报错

**测试：**

1. 将people的bean配置修改一下：`autowire="byType"`

```xml
<bean id="cat" class="com.kuang.pojo.Cat" />
<bean id="dog" class="com.kuang.pojo.Dog" />

<bean id="people" class="com.kuang.pojo.People" autowire="byType">
    <property name="str" value="qinjiang"/>
</bean>
```

2. 测试,正常输出
3. 再注册一个 cat 的bean 对象！

```xml
<bean id="dog" class="com.kuang.pojo.Dog"/>
<bean id="cat" class="com.kuang.pojo.Cat"/>
<bean id="cat2" class="com.kuang.pojo.Cat"/>

<bean id="user" class="com.kuang.pojo.User" autowire="byType">
    <property name="str" value="qinjiang"/>
</bean>
```

4. 测试，报错

5. 删掉cat2，将cat的bean的id属性该掉

   ```xml
   <bean id="dog" class="com.kuang.pojo.Dog"/>
   <bean id="cat123" class="com.kuang.pojo.Cat"/>
   
   <bean id="user" class="com.kuang.pojo.User" autowire="byType">
       <property name="str" value="qinjiang"/>
   </bean>
   ```

6. 测试，无报错

**解释**：

- 按照类型自动装配不需要管bean的id属性，只要保证bean的class属性唯一即可

### 4.6.4、总结

**小结：**

- `byName` 的时候，==需要保证所有的 bean 的 id 唯一，并且这个 bean 需要和自动注入的属性的 set 方法的值一致！==
- `byType` 的时候，==需要保证所有的 bean 的 class 唯一，并且这个 bean 需要和自动注入的属性的类型一致！==

- `byName`:会自动在容器上下文中查找,和自己对象set方法后面的值对应的 beanid！
- `byType`:会自动在容器上下文中查找,和自己对象属性类型相同bean！



### 4.6.5、注解实现自动装配

#### 4.6.5.1、@Autowired

- `@Autowired` 是按类型自动转配的，不支持 id 匹配
- 直接在属性上使用即可，也可以在set方式上使用！
- 使用 `@Autowired` 我们可以不用编写Set方法了

```java
public class People {
    @Autowired
    private Cat cat;
    @Autowired
    private Dog dog;
    private String name;

    public Cat getCat() {
        return cat;
    }
    
    public Dog getDog() {
        return dog;
    }
    
    public String getName() {
        return name;
    }
    @Override
    public String toString() {
        return "People{" +
                "cat=" + cat +
                ", dog=" + dog +
                ", name='" + name + '\'' +
                '}';
    }
}
```



#### 4.6.5.2、@Qualifier

- `@Autowired` 是根据==类型==自动装配的，加上`@Qualifier` 则可以根据==名称==的方式自动装配
- `@Qualifier` 不能单独使用。

**测试实验步骤：**

1. 配置文件修改内容，保证类型存在对象。且名字不为类的默认名字

```xml
<bean id="dog1" class="com.kuang.pojo.Dog"/>
<bean id="dog2" class="com.kuang.pojo.Dog"/>
<bean id="cat1" class="com.kuang.pojo.Cat"/>
<bean id="cat2" class="com.kuang.pojo.Cat"/>
```

2. 没有加`Qualifier` 测试，直接报错
3. 在属性上添加`Qualifier` 注解

```java
@Autowired
@Qualifier(value = "cat2")
private Cat cat;
@Autowired
@Qualifier(value = "dog2")
private Dog dog;
```

4. 测试，成功输出

#### 4.6.5.3、@Resource

- `@Resource` 如有指定的 name 属性，先按该属性进行 byName 方式查找装配；
- 其次再进行默认的 byName 方式装配
- 如果以上都不成功，则按 byType 的方式自动装配
- 都不成功，则报异常。

1. 在类上加注解

```java
public class User {
    @Resource(name = "cat2")
    private Cat cat;
    @Resource
    private Dog dog;
    private String str;
}
```

2. 在Spring核心配置文件中配置bean

```xml
<bean id="dog" class="com.kuang.pojo.Dog"/>
<bean id="cat1" class="com.kuang.pojo.Cat"/>
<bean id="cat2" class="com.kuang.pojo.Cat"/>
<bean id="People" class="com.kuang.pojo.People"/>
```

测试：结果OK

3. 修改核心配置文件

```xml
<bean id="dog" class="com.kuang.pojo.Dog"/>
<bean id="cat1" class="com.kuang.pojo.Cat"/>
```

4. 实体类上只保留注解

```java
@Resource
private Cat cat;
@Resource
private Dog dog;
```

测试：结果OK

#### 4.6.5.4、小结

`@Autowired` 与`@Resource` 异同

1. `@Autowired`  与 `@Resource`  都可以用来装配 bean，都可以写在属性上，或写在 setter 方法上
2. `@Autowired`  通过 byType 的方式实现，而且必须要求这个对象存在！【常用】
3. `@Resource` 默认通过 byname 的方式实现，如果找不到名字，则通过 byType 实现！如果两个都找不到的情况下，就报错。【常用】
4. 执行顺序不同：`@Autowired`  通过 byType 的方式实现。`@Resource`  默认通过 byname 的方式实现



## 4.7、Spring新注解

使用上面的注解还不能全部替代xml配置文件，还需要使用注解替代的配置如下：

- 非自定义的Bean的配置：`<bean>`
- 加载properties文件的配置：`context:property-placeholder`
- 组件扫描的配置：`<context:component-scan>`
- 引入其他文件：`<import>`

| 注解            | 说明                                                         |
| --------------- | ------------------------------------------------------------ |
| @Configuration  | 用于指定当前类是一个Spring配置类，当创建容器时会从该类上加载注解 |
| @ComponentScan  | 用于指定Spring在初始化容器时要扫描的包。等价于`<context:component-scan base-package="com.itheima"/>` |
| @Bean           | 使用在方法上，标注将该方法的返回值存储到Spring               |
| @PropertySource | 用于加载.properties文件中的配置                              |
| @Import         | 用于导入其他配置类                                           |

## 4.8、加载properties文件

- 名称：`@PropertySource`

- 类型：**类注解**

- 位置：**类定义上方**

- 作用：加载properties文件中的属性值

- 范例：

  ```java
  @PropertySource(value = "classpath:filename.properties")
  public class ClassName {
      @Value("${propertiesAttributeName}")
      private String attributeName;
  }
  ```

- 说明：

  - 不支持*通配格式，一旦加载，所有spring控制的bean中均可使用对应属性值

- 相关属性

  - value（默认）：设置加载的properties文件名

  - ignoreResourceNotFound：如果资源未找到，是否忽略，默认为false



## 4.9、纯注解格式

- 名称：@Configuration、@ComponentScan

- 类型：**类注解**

- 位置：**类定义上方**

- 作用：设置当前类为spring核心配置加载类

- 范例：

  ```java
  @Configuration
  @ComponentScan("scanPackageName")
  public class SpringConfigClassName{
  }
  ```

- 说明：

  - 核心配合类用于替换spring核心配置文件，此类可以设置空的，不设置变量与属性

  - bean扫描工作使用注解@ComponentScan替代

**AnnotationConfigApplicationContext**

- 加载纯注解格式上下文对象，需要使用AnnotationConfigApplicationContext

```java
AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext(SpringConfig.class);
```

## 4.10、第三方bean配置与管理

- 名称：`@Import`

- 类型：**类注解**

- 位置：**类定义上方**

- 作用：导入第三方bean作为spring控制的资源

- 范例：

  ```java
  @Configuration
  @Import(OtherClassName.class)
  public class ClassName {
  }
  ```

- 说明：

  - @Import注解在同一个类上，仅允许添加一次，如果需要导入多个，使用数组的形式进行设定

  - 在被导入的类中可以继续使用@Import导入其他资源（了解）

  - @Bean所在的类可以使用导入的形式进入spring容器，无需声明为bean

### 4.10.1、案例搭建

- 手动创建c3p0数据源

```java
@Test
public DataSource getDataSource() throws Exception {
    //创建数据源
    ComboPooledDataSource dataSource = new ComboPooledDataSource();
    //设置数据库连接参数
    dataSource.setDriverClass("com.mysql.jdbc.Driver");
    dataSource.setJdbcUrl("jdbc:mysql://localhost:3306/test");
    dataSource.setUser("root");
    dataSource.setPassword("123456");
    return dataSource ;
}
```

- 在Spring核心配置文件进行配置

```xml
<!--    加载外部的properties文件-->
<context:property-placeholder location="classpath:jdbc.properties"/>
<bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
    <property name="driverClass" value="${jdbc.driver}"/>
    <property name="jdbcUrl" value="${jdbc.url}"/>
    <property name="user" value="${jdbc.username}"/>
    <property name="password" value="${jdbc.password}"/>

</bean>
<!--    配置组件扫描-->
<context:component-scan base-package="com.itheima"/>
```

- 当我们使用注解代替applicationContext.xml时，如下：

```java
//标志该类是Spring的核心配置类
@Configuration
//<context:component-scan base-package="com.itheima"/>
//配置组件扫描
@ComponentScan("com.itheima")
//<context:property-placeholder location="classpath:jdbc.properties"/>
//加载外部的properties
@PropertySource("classpath:jdbc.properties")
public class SpringCofiguration {
    @Value("${jdbc.driver}")
    private String driver;
    @Value("${jdbc.url}")
    private String url;
    @Value("${jdbc.username}")
    private String username;
    @Value("${jdbc.password}")
    private String password;
    
    
    @Bean("dataSource")//Spring会将当前方法的返回值以指定名称存储到Spring容器中
    public DataSource getDataSource() throws Exception {
        //创建数据源
        ComboPooledDataSource dataSource = new ComboPooledDataSource();
        //设置数据库连接参数
        dataSource.setDriverClass(driver);
        dataSource.setJdbcUrl(url);
        dataSource.setUser(username);
        dataSource.setPassword(password);
        return dataSource;
    }
}

```





### 4.10.2、案例分析

我们在实际开发中，并不会将所有注解都配置到一个类中，例如我们将与数据源相关的类单独进行注解配置，之后再集成到Spring核心配置文件。

- DataSourceConfiguration.java	数据源配置
- SpringCongiguration.java            总的核心配置

> DataSourceConfiguration.java

```java
//<context:property-placeholder location="classpath:jdbc.properties"/>
//加载外部的properties
@PropertySource("classpath:jdbc.properties")
public class DataSourceConfiguration{
    @Value("${jdbc.driver}")
    private String driver;
    @Value("${jdbc.url}")
    private String url;
    @Value("${jdbc.username}")
    private String username;
    @Value("${jdbc.password}")
    private String password;
    
    
    @Bean("dataSource")//Spring会将当前方法的返回值以指定名称存储到Spring容器中
    public DataSource getDataSource() throws Exception {
        //创建数据源
        ComboPooledDataSource dataSource = new ComboPooledDataSource();
        //设置数据库连接参数
        dataSource.setDriverClass(driver);
        dataSource.setJdbcUrl(url);
        dataSource.setUser(username);
        dataSource.setPassword(password);
        return dataSource;
    }
}
```

> SpringCongiguration.java

```java
//<import resource="">
@Import(DataSourceConfiguration.class)
public class SpringCongiguration{
    
}
```

当我们还有其他配置需要集成到总核心配置文件时，使用注解规则如下：

```java
@Import({DataSourceConfiguration.class,XXX.class,XXX.class})
public class SpringCongiguration{
    
}
```

# 5、Spring集成Junit

## 5.1、原始Junit测试Spring问题

在测试类中，每个测试方法都有以下两行代码：

```java
ApplicationContext app = new ClasspathXmlApplicationContext("xml文件");
app.getBean("id");
```

这两行代码的作用是获取容器，如果不写的话，直接会提示空指针异常，所以不能轻易删掉。

**解决思路**：

- 让 SpringJunit 负责创建Spring容器，但是需要将配置文件的名称告诉它
- 将需要进行测试Bean直接在测试类中进行注入

## 5.2、Spring集成Junit步骤

1. 导入spring集成junit的坐标

```xml
<!--此处需要注意的是，spring5 及以上版本要求 junit 的版本必须是 4.12 及以上-->
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.12</version>
</dependency>
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-test</artifactId>
    <version>5.0.2.RELEASE</version>
</dependency>
```

2. 使用`@RunWith`注解替换原来的运行期

```java
@RunWith(SpringJUnit4ClassRunner.class)
public class SpringJunitTest {
    
}
```

3. 使用`@ContextConfiguration`指定配置文件或配置类

```java
@RunWith(SpringJUnit4ClassRunner.class)
//加载spring核心配置文件
//@ContextConfiguration(value = {"classpath:applicationContext.xml"})
//加载spring核心配置类
@ContextConfiguration(classes = {SpringConfiguration.class})
public class SpringJunitTest {
    
}
```

4. 使用`@Autowired`注入需要测试的对象

```java
@RunWith(SpringJUnit4ClassRunner.class)
//加载spring核心配置类
@ContextConfiguration(classes = {SpringConfiguration.class})
public class SpringJunitTest {
    @Autowired
    private UserService userService;
}
```

5. 创建测试方法进行测试

```java
@RunWith(SpringJUnit4ClassRunner.class)
//加载spring核心配置类
@ContextConfiguration(classes = {SpringConfiguration.class})
public class SpringJunitTest {
     // 想测哪个对象，就注入哪个对象
    @Autowired
    private UserService userService;
    
    // 定义测试方法
    @Test
    public void testUserService(){
        userService.save();
    }
}
```

































































