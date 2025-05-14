# SpringBoot常见场景

## 1、热部署

SpringBoot为我们提供了一个方便我们开发测试的工具dev-tools。使用后可以实现热部署的效果。当我们运行了程序后对程序进行了修改，程序会自动重启。

原理是使用了两个 ClassLoder ,一个 ClassLoader 加载那些不会改变的类(第三方jar包),另一个 ClassLoader 加载会更改的类.称之为 Restart ClassLoader ,这样在有代码更改的时候,原来的 Restart Classloader 被丢弃,重新创建一个 Restart ClassLoader,由于需要加载的类相比较少,所以实现了较快的重启。



### 1.1、准备工作

1. 设置IDEA自动编译

![](三更SpringBoot(二).assets/1.png)





2. 设置允许程序运行时自动启动

   ctrl + shift + alt + / 这组快捷键后会有一个小弹窗，点击Registry 就会进入下面的界面

   或者 ctrl + shift + A 弹出搜索框，然后搜索 Registry

![](三更SpringBoot(二).assets/2.png)



### 1.2、使用

1. 添加依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <optional>true</optional>
</dependency>
```

2. 触发热部署

   当我们在修改完代码或者静态资源后可以切换到其它软件，让IDEA自动进行编译，自动编译后就会触发
   热部署。

   或者使用 Ctrl+F9 手动触发重新编译。（Build -> Build Project）

> 我们平常学习可以使用这个热部署工具，如果在项目中还是推荐不使用





## 2、单元测试

在实际开发中，每当完成一个功能接口或业务方法后，通常都会借助单元测试验证该功能是否正确，Spring Boot 对项目的单元测试提供了良好的支持，在使用时，需要提前在项目的 pom.xml 文件中添加 spring-boot-starter-test 测试依赖启动器，可以通过相关注解实现单元测试。





我们可以使用SpringBoot整合Junit进行单元测试。

Spring Boot 2.2.0 版本开始引入 JUnit 5 作为单元测试默认库。

### 2.1、使用步骤

1. 添加依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
</dependency>
```

需要注意的是，如果是使用 Spring Initializr 方式搭建的 Spring Boot 项目，会自动加入 spring-boot-starter-test 测试依赖启动器，无需开发者再次手动添加。

2. 编写测试类

```java
@SpringBootTest // 标记该类是一个 Spring Boot d
public class ApplicationTest {
    

    @Test
    public void testJunit(){
        System.out.println(1);
    }
}
```

![](三更SpringBoot(二).assets/3.png)

> 注意：测试类所在的包需要和启动类是在同一个包下。

如果不在同一个包下，那么就要使用如下写法指定启动类

```java
//classes属性来指定启动类
@SpringBootTest(classes = HelloApplication.class)
public class ApplicationTest {
    

    @Test
    public void testJunit(){
        System.out.println(1);
    }
}
```



### 2.2、兼容老版本

如果是对 SpringBoot 2.2.0 之前的项目进行版本升级就会发现之前的单元测试代码出现一些问题，这是因为 2.2.0 之前使用的是 junit4 ，而 2.2.0 之后使用的是 junit5 。

我们来看一下 SpringBoot 2.2.0 之前单元测试的写法

```java
@SpringBootTest
@RunWith(SpringRunner.class)
public class ApplicationTest {

    @Test
    public void testJunit(){
        System.out.println(1);
    }
}
```

> junit4 版本，需要搭配 @RunWith 注解来使用。

所以如果我们在依赖中对 SpringBoot 升级，就会出现单元测试代码爆红的问题。如何解决这个问题呢？我们先来看一张图

![](三更SpringBoot(二).assets/4.png)

从上图可以看出 **JUnit 5 = JUnit Platform + JUnit Jupiter + JUnit Vintage**

- JUnit Platform： 这是Junit提供的平台功能模块，通过它，其它的测试引擎也可以接入
- JUnit JUpiter：这是JUnit5的核心，是一个基于JUnit Platform的引擎实现，它包含许多丰富的新特性来使得自动化测试更加方便和强大。
- JUnit Vintage：这个模块是兼容JUnit3、JUnit4版本的测试引擎，使得旧版本的自动化测试也可以在JUnit5下正常运行。

虽然 Junit5 包含了 JUnit Vintage 来兼容 JUnit3 和 Junit4 ，但是 SpringBoot 2.4 以上版本对应的 springboot-starter-test 移除了默认对 Vintage 的依赖。所以当我们仅仅依赖 spring-boot-starter-test 时会发现之前我们使用的 @Test 注解和@RunWith 注解都不能使用了。

解决办法就是我们单独依赖 vintage 来进行兼容

```xml
<dependency>
    <groupId>org.junit.vintage</groupId>
    <artifactId>junit-vintage-engine</artifactId>
    <scope>test</scope>
</dependency>
```



## 3、整合mybatis

sql 语句

```sql
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
`id` INT(11) NOT NULL AUTO_INCREMENT,
`username` VARCHAR(50) DEFAULT NULL,
`age` INT(11) DEFAULT NULL,
`address` VARCHAR(50) DEFAULT NULL,
PRIMARY KEY (`id`)
) ENGINE=INNODB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*Data for the table `user` */
INSERT INTO `user`(`id`,`username`,`age`,`address`) VALUES (2,'pdd',25,'上海'),
(3,'UZI',19,'上海11'),(4,'RF',19,NULL),(6,'三更',14,'请问2'),(8,'test1',11,'cc'),
(9,'test2',12,'cc2');
```

实体类

```java
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private Integer id;
    private String username;
    private Integer age;
    private String address;
}
```

### 3.1、整合步骤

1. 添加依赖

```xml
<!--mybatis启动器-->
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>2.2.0</version>
</dependency>
<!--mysql驱动-->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <scope>runtime</scope>
</dependency>
```

这里的 mybatis 启动器的版本 springboot 并没有指定，我们需要自己设置版本号，如何查看自己应该引入什么版本呢？

github: https://github.com/mybatis/spring-boot-starter/

![](三更SpringBoot(二).assets/5.png)

2. 配置数据库信息

```yml
spring:
  datasource:
   url: jdbc:mysql://localhost:3306/springboot?characterEncoding=utf-8&serverTimezone=UTC
   username: root
   password: 123456
   driver-class-name: com.mysql.cj.jdbc.Driver
```

properties 写法如下：

```properties
#加载驱动
spring.datasource.driver-class-name=com.mysql.jdbc.Driver
#数据库连接路径
spring.datasource.url=jdbc:mysql://localhost:3306/test?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai
#数据库用户名
spring.datasource.username=root
#数据库密码
spring.datasource.password=123456
```

数据源类型选择配置，如果需要使用其他数据源，还需要进行额外配置，这里选择阿里巴巴的 Druid 数据源，需要在 pom.xml 配置文件中添加 Druid 数据源的依赖启动器，代码如下所示：

```xml
<!--阿里巴巴数据源(可选)-->
<dependency>
	<groupId>com.alibaba</groupId>
    <artifactId>druid-spring-boot-starter</artifactId>
	<version>1.2.1</version>
</dependency>
```

上述引入的依赖 druid-spring-boot-starter，同样是阿里巴巴为了迎合 Spring boot 项目而适配的 Druid 数据源启动器，当在 pom.xml 文件中引入该启动器后，不需要进行其他额外配置，Spring boot 项目会自动识别配置 Druid 数据源。

需要注意的是，上述配置的 Druid 数据源启动器内部已经初始化了一些运行参数(例如：initialSize，maxActive等)，如果开发过程中需要修改第三方 Druid 的运行参数，则必须在全局配置文件中继修改，代码如下所示：

```properties
#添加并配置第三方数据源
#1.设置数据源类型
spring.databsource.type = com.alibaba.druid.pool.DruidDataSource
#2.设置初始化连接数
spring.databsource.druid.initial-size = 20
#3.设置最小空闲数量
spring.databsource.druid.max-active = 100
#4.设置最大连接量
spring.databsource.druid.max-active = 100
```



3. 配置 mybatis 相关配置

   在项目中编写的 XML 映射文件，Spring Boot并无从知晓，所以无法扫描到该自定义编写的 XML 映射文件，需要在全局配置文件 application.yml / application.properties 中添加 Mybatis映射文件的路径，同时也可以添加实体类的别名设置。

   

   

   

   

- 这是yaml写法

```yml
mybatis:
 mapper-locations: classpath:mapper/*Mapper.xml # mapper映射文件路径
 type-aliases-package: com.sangeng.domain # 配置哪个包下的类有默认的别名
```

- 这是 properties 写法

```properties
#mybatis取别名
mybatis.type-aliases-package=com.sangeng.domain
#扫描映射文件
mybatis.mapper-locations=classpath*:mapper/*Mapper.xml
```





![](三更SpringBoot(二).assets/6.png)

4. 编写 Mapper 接口

   注意在接口上加上 `@Mapper`  和 `@Repository` 注解

```java
@Repository
@Mapper
public interface UserMapper {
	public List<User> findAll();
}
```

5. 编写mapper接口对应的xml文件（也可以使用插件一键生成）

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
"http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="com.sangeng.mapper.UserMapper">
    <select id="findAll" resultType="com.sangeng.domain.User">
    	select * from user
    </select>
</mapper>
```

![](三更SpringBoot(二).assets/7.png)

6. 测试

```java
@SpringBootTest(classes = HelloApplication.class)
public class SpringMyTest {
    @Autowired
    UserMapper userMapper;
    
    @Test
    public void tesMapper(){
    	System.out.println(userMapper.findAll());
    }
}
```





### 3.2、加载Mapper接口方式

SpringBoot 整合 MyBatis 加载 Mapper 接口的方式有两种，一是在对应的接口类上添加 `@Mapper` 注解，二是在 Spring Boot 启动器类上添加 `@MapperScan("xxx")` 注解(==推荐使用此方式==)

#### 3.2.1、@Mapper注解

在对应的接口类上添加 `@Mapper` 注解，如果编写的 Mapper 接口过多时，需要重复为每一个 Mapper 接口文件添加 `@Mapper` 注解，代码如下所示：

1. UserMapper接口

```java
@Mapper
public interface UserMapper{
    // 省略接口方法
}
```

2. RoleMapper接口

```java
@Mapper
public interface RoleMapper{
    // 省略接口方法
}
```

#### 3.2.3、@MapperScan注解

为了避免 `@Mapper` 注解重复添加的麻烦，可以直接在 Spring Boot 启动器类上 添加`@MapperScan("xxx")` 注解。不需要再为每一个 Mapper 接口添加 `@Mapper` 注解。

- `@MapperScan("xxx")` 注解的作用和 `@Mapper` 注解类似，但是它必须制定需要扫描的具体包名，例如 @MapperScan("com.xxx.dao")
- 扫描多个包时可以使用英文逗号分隔，例如： @MapperScan("com.xxx.mapper")

```java
@SpringBootApplication
// 扫描mapper接口所在的包
@MapperScan(basePackages = "com.kuang.dao")
public class SpringbootBdqnApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringbootBdqnApplication.class, args);
    }

}
```







## 4、web开发

### 4.1、静态资源访问

由于SpringBoot的项目是打成jar包的所以没有之前web项目的那些web资源目录(webapps)。那么我们的静态资源要放到哪里呢？

从SpringBoot官方文档中我们可以知道，我们可以把静态资源放到 `resources/static` (或者`resources/public` 或者`resources/resources` 或者 `resources/META-INF/resources` ) 中即可。

![](三更SpringBoot(二).assets/19.png)

> static目录

- 该目录存放静态资源，可放置 css、js、图片、html 等静态资源
- 该目录可以直接访问

> templates目录

- 该目录下存放网页模板，如 thymeleaf 等模板
- 该目录是安全的，外界不可直接访问，类似web项目中的WEB-INF文件夹





静态资源放完后

- 例如我们想访问文件：resources/static/index.html 只需要在访问时资源路径写成/index.html即可。

- 例如我们想访问文件：resources/static/pages/login.html 访问的资源路径写成： /pages/login.html

![](三更SpringBoot(二).assets/9.png)





#### 4.1.1、修改静态资源访问路径

SpringBoot默认的静态资源路径匹配为 `/**` 。如果想要修改可以通过 `spring.mvc.static-pathpattern` 这个配置进行修改。

例如想让访问静态资源的url必须前缀有/res。例如/res/index.html 才能访问到static目录中的。我们可以修改如下：

在application.yml中

```yml
spring:
 mvc:
  static-path-pattern: /res/**  #修改静态资源访问路径
```

![](三更SpringBoot(二).assets/8.png)

#### 4.1.2、修改静态资源存放目录

我们可以修改 spring.web.resources.static-locations 这个配置来修改静态资源的存放目录。

例如：

```yml
spring:
 web:
  resources:
   static-location:
    - classpath: /sgstatic/		 # 这也作为我们的静态资源存放目录	resources/sgstatic
    - classpath: /static/        # 这是我们的静态资源存放目录  resources/static
```

这样我们就也可以直接访问 resources/sgstatic 目录下的静态资源了，也可以直接访问 resources/static 目录下的静态资源。

> 注意，static-location 是一个数组，我们可以写一个，也可以写多个静态资源存放目录

#### 4.1.3、网站图标

- 与其他静态资源一样，Spring Boot在配置的静态内容位置中查找 favicon.ico。
- 如果存在这样的文件，它将自动用作应用程序的favicon。

1. 关闭 SpringBoot 默认图标

```yml
#关闭默认图标
spring.mvc.favicon.enabled=false
```

2. 自己放一个图标在静态资源目录 resources 下
3. 清除浏览器缓存！刷新网页，发现图标已经变成自己的了！



### 4.2、模拟前后端分离式开发

我们开启两个 SpringBoot 工程，来模拟我们的前后端分离式开发

- 一个是存放静态目录的 springboot_static，端口是80

- 一个是我们的 springboot_web，端口是81

![](三更SpringBoot(二).assets/10.png)



我们在 springboot_web 工程进行开发

1. 首先导入依赖和继承 spring-boot-starter-parent 这个父工程

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.5.4</version>
</parent>
```



```xml
<dependencies>
    <!--springboot核心依赖-->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <!--mysql驱动-->
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <scope>runtime</scope>
    </dependency>
    <!--mybatis启动器-->
    <dependency>
        <groupId>org.mybatis.spring.boot</groupId>
        <artifactId>mybatis-spring-boot-starter</artifactId>
        <version>2.2.0</version>
    </dependency>
    <!--Lombok-->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
    </dependency>
</dependencies>
```

2. 我们写一个查询查询用户接口测试一下

   数据库语句如下

```sql
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
`id` INT(11) NOT NULL AUTO_INCREMENT,
`username` VARCHAR(50) DEFAULT NULL,
`age` INT(11) DEFAULT NULL,
`address` VARCHAR(50) DEFAULT NULL,
PRIMARY KEY (`id`)
) ENGINE=INNODB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*Data for the table `user` */
INSERT INTO `user`(`id`,`username`,`age`,`address`) VALUES (2,'pdd',25,'上海'),
(3,'UZI',19,'上海11'),(4,'RF',19,NULL),(6,'三更',14,'请问2'),(8,'test1',11,'cc'),
(9,'test2',12,'cc2');
```

​		application.yml 中配置如下

```yml
server:
  port: 81

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/springboot?characterEncoding=utf-8&serverTimezone=UTC
    username: root
    password: 123456
    driver-class-name: com.mysql.cj.jdbc.Driver

mybatis:
  mapper-locations: classpath:mapper/*Mapper.xml # mapper映射文件路径
  type-aliases-package: com.sangeng.domain # 配置哪个包下的类有默认的别名
```

​		实体类如下

```java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private Integer id;
    private String username;
    private Integer age;
    private String address;
}
```



3. 首先写 dao 层接口，并用插件生成对应的 Mapper.xml 文件

```java
@Mapper
@Repository
public interface UserMapper {

    List<User> findAll();

}
```

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="com.kuang.mapper.UserMapper">
    <!--查询所有用户-->
    <select id="findAll" resultType="com.kuang.domain.User">
        select * from user
    </select>
    
</mapper>

```

4. 接着写 service 层接口和其实现类，并在实现类中注入 dao

```java
@Service
public interface UserService {

    List<User> findAll();
}
```



```java
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;


    @Override
    public List<User> findAll() {
        return userMapper.findAll();
    }
}
```

5. 最后编写 controller 层，并在 controller 层中注入 service 

```java
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping("/findAll")
    public List<User> findAll(){
        // 调用 service 查询数据,进行返回
        return userService.findAll();
    }
}
```

6. 启动测试

![](三更SpringBoot(二).assets/11.png)



![](三更SpringBoot(二).assets/12.png)



我们查到的结果是 List 集合，List 集合会转换为 json 放入到响应体当中，但是我们如果是根据 id 查询，那么只会查出一个用户，是对象格式。我们要保证一个项目中==所有接口返回的数据格式的统一==。这样无论是前端还是移动端开发获取到我们的数据后都能更方便的进行统一处理。我们这里是将所有的数据格式统一为 json 格式。

所以我们定义一下结果封装类 ResponseResult，由于格式统一是公用的，所以我们可以在 com.sangeng 下创建一个公共 common 包，在包下创建结果封装类 ResponseResult

```java
// 加上此注解,如果某个属性的值不为NULL,才会将其转化为Json格式
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseResult<T> {
    /**
     * 状态码
     */
    private Integer code;
    /**
     * 提示信息，如果有错误时，前端可以获取该字段进行提示
     */
    private String msg;
    /**
     * 查询到的结果数据(不同接口查询的类型不一样,所以我们可以设为泛型)
     */
    private T data;

    // 三个参数的有参构造(查询操作需要返回查询的数据data)
    public ResponseResult(Integer code, String msg, T data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }
    // 两个参数的有参构造(状态码和提示信息)
    public ResponseResult(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    // 两个参数的有参构造(状态码和数据)
    public ResponseResult(Integer code, T data) {
        this.code = code;
        this.data = data;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
```

我们修改我们的查询用户 controller 层代码，让其返回的是我们封装好的 ResponseResult 格式，而不是 List 集合

```java
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping("/findAll")
    public ResponseResult findAll(){
        // 调用 service 查询数据,进行返回
        List<User> users = userService.findAll();
        return new ResponseResult(200,users);
    }
}
```

再次启动测试

![](三更SpringBoot(二).assets/13.png)





### 4.3、跨域请求

1. 什么是跨域？

   浏览器出于安全的考虑，使用 XMLHttpRequest 对象发起 HTTP 请求时必须遵守同源策略，否则就是跨域的 HTTP 请求，默认情况下是被禁止的。同源策略要求源相同才能进行正常通信，即协议、域名、端口号都完全一样。

   参考博客：[Ajax前后端交互利器详解(二)](https://blog.csdn.net/Augenstern_QXL/article/details/120116401)

例如我们想要渲染一个表格里面的数据，前端请求后端的数据，然后将后端传输过来的数据渲染到前端表格页面上。

- 前端页面中我们使用 axios 发起请求，请求后台接口，前端页面请求代码如下：

```html
<!-- Vue开发环境版本，包含了有帮助的命令行警告 -->
<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
<!--axios引入-->
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

<script>
  const app = new Vue({
     el: '#app',
     created(){
        this.findAll();
     },
     methods: {
        findAll(){
           // 请求后台接口,把接收到的数据渲染展示在页面中
           axios.get("http://localhost:81/user/findAll").then((res)=>{
              console.log(res);
           })
        }
     }
  })
</script>
```

![](三更SpringBoot(二).assets/14.png)

那我们如何解决上述问题呢？

2. CORS 解决跨域

   CORS 是一个 W3C 标准，全称是 "跨域资源共享"，允许浏览器向跨源服务器发出 XMLHttpRequest 请求，从而克服了 Ajax 只能同源使用的限制。

   它通过服务器增加一个特殊的 `Header[Access-Control-Allow-Origin]` 来告诉客户端跨域的限制，如果浏览器支持 CORS，并且判断 Origin 通过的话，就会允许 XMLHttpRequest 发起跨域请求。

### 4.4、SpringBoot使用CORS解决跨域

​	在Web开发中，经常会遇到跨域开发的问题，常用的跨域解决方案有 JSNOP、IFRAME、CORS等。CORS(Cross-OriginResource Sharing 跨域资源共享),当一个请求url的协议、域名、端口三者之间任意一与当前页面地址不同即为跨域。

​	CORS(Cross-OriginResource Sharing 跨域资源共享)，是一个W3C标准，它允许浏览器向跨域服务器发生Ajax请求，打破了Ajax只能访问本站内的资源限制。

​	在Spring4.2开始，SpringMVC支持开箱即用的CORS。在SpringBoot应用程序中使用带有 `@CrossOrigin` 注解，该注解可标记在控制器的类上或具体的某个方法上实现跨域请求，也可以通过自定义方法注册Bean来定义全局的CORS配置。    

#### 4.4.1、加注解@CrossOrigin

1. 使用 `@CrossOrigin`  ，给 controller 层的方法加上此注解

   这个注解可以加在类上，也可以加在方法上

   - 加在类上，指明这个类中的所有方法都可以进行跨域请求
   - 加在方法上，指明这个方法可以进行跨域请求

```java
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping("/findAll")
    @CrossOrigin
    public ResponseResult findAll(){
        // 调用 service 查询数据,进行返回
        List<User> users = userService.findAll();
        return new ResponseResult(200,users);
    }
}
```

这样我们再次使用前端页面请求后台接口，发现请求成功

![](三更SpringBoot(二).assets/15.png)



#### 4.4.2、使用WebMvcConfigurer的addCorsMappings方法配置CorsInterceptor

上述方法使用注解加在类上或者方法上虽然看起来方便，但是如果我们有很多的 controller 方法，那么就需要加很多个注解，所以其实并不方便。

1. 我们创建一个包，包下创建类，让类实现 WebMvcConfigurer 接口，并重写 addCorsMappings 方法，如下：

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // 设置允许跨域的路径
        registry.addMapping("/**")
            // 设置允许跨域请求的域名
            .allowedOriginPatterns("*")
            // 是否允许cookie
            .allowCredentials(true)
            // 设置允许的请求方式
            .allowedMethods("GET","POST","DELETE","PUT")
            // 跨域允许时间
            .maxAge(3600);
    }

}
```

这样我们再次使用前端页面请求后台接口，发现请求成功。

这样我们就解决了跨域请求，我们就可以真正让前面页面请求后台数据来渲染我们的表格数据了.

---

我们先来看请求成功之后箭头函数返回的 res 对象里面的内容，我们可以在浏览器中打断点调试

![](三更SpringBoot(二).assets/16.png)

当然我们也可以在控制台打印 res 对象

![](三更SpringBoot(二).assets/17.png)

这样我们就可以拿到前端页面请求返回的后台数据对象 res，而 res 里面又有我们的数据，我们可以通过遍历来拿到数据，然后放在前端页面表格里面

```html
<!--省略代码-->

<!-- START table-responsive-->
<div class="table-responsive">
   <table class="table table-striped table-bordered table-hover">
      <thead>
         <tr>
            <th>学号</th>
            <th>姓名</th>
            <th>年龄</th>
            <th>地址</th>
         </tr>
      </thead>
      <tbody>
         <tr v-for="user in users">
            <td>{{user.id}}</td>
            <td>{{user.username}}</td>
            <td>{{user.age}}</td>
            <td>{{user.address}}</td>
         </tr>
      </tbody>
   </table>
</div>
<!-- END table-responsive-->

<!--省略代码-->

<!-- Vue开发环境版本，包含了有帮助的命令行警告 -->
<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
<!--axios引入-->
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script>
  const app = new Vue({
     el: '#app',
     data: {
        users: []
     },
     created(){
        this.findAll();
     },
     methods: {
        findAll(){
           // 请求后台接口,把接收到的数据渲染展示在页面中
           axios.get("http://localhost:81/user/findAll").then((res)=>{
              console.log(res);
              // 判断是否成功(code状态码是否为200)
              if(res.data.code == 200){
                 this.users = res.data.data;
              }
           })
        }
     }
  })
</script>
```

![](三更SpringBoot(二).assets/18.png)



这就是前后端分离式开发。























































