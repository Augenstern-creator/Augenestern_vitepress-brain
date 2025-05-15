# 1、Shiro

Shiro是apache旗下一个开源框架，它将软件系统的安全认证相关的功能抽取出来，实现用户身份认证，权限授权、加密、会话管理等功能，组成了一个通用的**安全认证框架**。

- 官方文档：https://shiro.apache.org/index.html



## 1.0、Shiro与SpringSecurity的对比

1. Spring Security 基于 Spring 开发，项目若使用 Spring 作为基础，配合 Spring 

   Security 做权限更加方便，而 Shiro 需要和 Spring 进行整合开发

2. Spring Security 功能比 Shiro 更加丰富些，例如安全维护方面

3. Spring Security 社区资源相对比 Shiro 更加丰富

4. Shiro 的配置和使用比较简单，Spring Security 上手复杂些

5. Shiro 依赖性低，不需要任何框架和容器，可以独立运行.Spring Security 依赖Spring 容器

6. shiro 不仅仅可以使用在 web 中，它可以工作在任何应用环境中。在集群会话时 Shiro最重要的一个好处或许就是它的会话是独立于容器的

   

   

   

   













## 1.1、基本功能亮点

![](不良人Shiro(一).assets/3.png)

- Authentication：身份认证/登录，验证用户是不是拥有相应的身份
- Authorization：授权，即权限验证，验证某个已认证的用户是否拥有某个权限，即判断用户是否能进行什么操作。
- Session Manager：会话管理，即用户登陆后就是一次会话，在没有退出之前，它的所有信息都在会话中，会话可以是普通的 JavaSE环境，也可以是 Web 环境。
- Cryptography：加密，保护数据的安全性，如密码加密存储到数据库，而不是明文存储。
- Web Support：Web 支持，可以非常容易的集成到 Web 环境
- Caching：缓存，比如用户登录后，其用户信息、拥有的角色/权限不必每次去查，这样可以提高效率。
- Concurrency：Shiro 支持多线程应用的并发验证，即如在一个线程中开启另一个线程，能把权限自动传播过去。
- Testing：提供测试支持
- Run As：允许一个用户假装为另一个用户的身份进行访问
- Remember Me：记住我，这个是非常常见的功能，即一次登录后，下次再来的话不用登录了。

## 1.2、Shiro架构（Shiro外部来看）

从外部来看 Shiro ，即从应用程序角度的来观察如何使用 Shiro 完成工作的

![](不良人Shiro(一).assets/4.png)



1. `Subject` ：应用代码直接交互的对象是 Subject，也就是说 Shiro 的对外 API 核心就是 Subject。 Subject 代表了当前 "用户"，这个用户不一定是一个具体的人，与当前应用交互的任何东西都是 Subject，如网络爬虫、机器人等。与 Subject 的所有交互都会委托给 SecurityManager，Subject 其实是一个门面， SecurityManager 才是实际的执行者。
2. `SecurityManager`: 安全管理器，即所有与安全有关的操作都会与SecurityManager 交互；且其管理着所有 Subject；可以看出它是 Shiro 的核心，它负责与 Shiro 的其他组件进行交互，它相当于 SpringMVC 中 DispatcherServlet 的角色
3. `Realm`：Shiro 从 Realm 获取安全数据（如用户、角色、权限），就是说SecurityManager 要验证用户身份，那么它需要从 Realm 获取相应的用户进行比较以确定用户身份是否合法；也需要从 Realm 得到用户相应的角色/ 权限进行验证用户是否能进行操作；可以把 Realm 看成 DataSource









## 1.3、Shiro架构（Shiro内部来看）

![](不良人Shiro(一).assets/1.png)



- Subject ：任何可以与应用交互的 "用户"

- SecurityManager ：相当于 SpringMVC 中的 DispatcherServlet；是 Shiro 的心脏，所有具体的交互都通过 SecurityManager 进行控制；它管理着所有 Subject、且负责进 行认证、授权、会话及缓存的管理

- Authenticator：负责 Subject 认证，是一个扩展点，可以自定义实现，可以使用认

  证策略（Authentication Strategy），即什么情况下算用户认证通过了

- Authorizer：授权器、即访问控制器，用来决定主体是否有权限进行相应的操作，即控制着用户能访问应用中的哪些功能。

- Realm：可以有 1 个或多个 Realm，可以认为是安全实体数据源，即用于获取安全实体的，可以是 JDBC实现，也可以是内存实现等等。由用户提供，所以一般在应用中都需要实现自己的 Realm

- SessionManager：管理 Session 生命周期的组件，而 Shiro 并不仅仅可以用在 Web 环境，也可以用在如普通的 JavaSE 环境

- CacheManager：缓存控制器，来管理如用户、角色、权限等的缓存的。因为这些数据基本上很少改变，放到缓存中后可以提高访问的性能

- Cryptography：密码模块，Shiro 提高了一些常见的加密组件用于如密码加密/解密

  





# 2、Shiro的基本使用



## 2.1、认证流程

![](不良人Shiro(一).assets/2.png)



用户在作认证时，会把身份信息或者凭证信息组装成一个令牌Token去做认证，认证通过则进入系统。

- 在shiro中，用户需要提供principals（身份）和credentials（证明）给shiro，从而应用能验证用户身份

  - principals：身份，即主体的标识属性，可以是任何属性，如用户名、邮箱等，唯一即可。一个主题可以有多个 principals，但只有一个主身份Primary principals ，一般是用户名/邮箱/手机号。
  - credentials：证明/凭证，即只有主体知道的安全值，如密码/数字证书等
  - 最常见的principals和credentials组合就是用户名/密码  

  

## 2.2、基本使用

1. Shiro 不依赖容器，直接创建 Maven 工程即可
2. 添加依赖

```xml
<dependencies>
    <dependency>
        <groupId>org.apache.shiro</groupId>
        <artifactId>shiro-core</artifactId>
        <version>1.12.0</version>
    </dependency>
</dependencies>
```

3. 在`resources`下新建shiro配置文件`shiro.ini` 
   - Shiro 获取权限相关信息可以通过数据库获取，也可以通过 ini 配置文件获取
   - 配置文件：名称随意，以 `.ini` 结尾，放在 resources 目录下
   - **注意**：在实际的项目开发中并不会使用这种方式，这种方法可以用来初学时练手

```ini
[users]
zhangsan=123
lisi=456
```

4. 进行测试

```java
public class TestCommon {
    public static void main(String[] args) {
        // 1.创建安全管理器对象
        DefaultSecurityManager securityManager = new DefaultSecurityManager();
        // 2.给安全管理器设置 realm
        securityManager.setRealm(new IniRealm("classpath:shiro.ini"));
        // 3.SecurityUtils 给全局安全工具类设置安全管理器
        SecurityUtils.setSecurityManager(securityManager);
        // 4.获取Subject对象
        Subject subject = SecurityUtils.getSubject();
        // 5.创建token令牌,web应用用户名密码从页面传递
        UsernamePasswordToken token = new UsernamePasswordToken("zhangsan", "123");
        // 6.完成登录
        try {
            // false
            System.out.println("认证状态:" + subject.isAuthenticated());
            // 用户认证
            subject.login(token);
            // true
            System.out.println("认证状态:" + subject.isAuthenticated());
        } catch (UnknownAccountException e) {
            e.printStackTrace();
            System.out.println("认证失败，用户名不存在");
        }catch (IncorrectCredentialsException e){
            e.printStackTrace();
            System.out.println("认证失败，密码错误");
        }catch (DisabledAccountException e){
            e.printStackTrace();
            System.out.println("账号被禁用");
        }
    }
}
```

常见异常类型：

- DisabledAccountException（帐号被禁用）
- LockedAccountException（帐号被锁定）
- ExcessiveAttemptsException（登录失败次数过多）
- ExpiredCredentialsException（凭证过期）等





## 2.3、授权流程

![](不良人Shiro(一).assets/5.png)



> 获取角色信息

1. 给 `shiro.ini` 增加角色配置

```ini
[users]
zhangsan=123,role1,role2
lisi=456
```

2. 添加代码，判断用户是否拥有指定角色

```java
try {
    // 用户认证
    subject.login(token);
    // true
    System.out.println("认证状态:" + subject.isAuthenticated());
    // 判断角色
    boolean role1 = subject.hasRole("role1");
    // 是否拥有role1角色:true
    System.out.println("是否拥有role1角色:" + role1);
}
```

> 判断权限信息

1. 给 `shiro.ini` 增加权限配置

```ini
[users]
zhangsan=123,role1,role2
lisi=456

[roles]
role1=user:insert,user:select
```

2. 判断权限信息

```java
try {
    // 用户认证
    subject.login(token);
    // true
    System.out.println("认证状态:" + subject.isAuthenticated());
    // 判断角色
    boolean role1 = subject.hasRole("role1");
    // 是否拥有role1角色:true
    System.out.println("是否拥有role1角色:" + role1);
    // 判断权限
    boolean permitted = subject.isPermitted("user:insert");
    // 是否拥有此权限:true
    System.out.println("是否拥有此权限:" + permitted);
}
```









## 2.4、Shiro加密

实际系统开发中，一些敏感信息需要进行加密，比如说用户的密码。Shiro 内嵌很多

常用的加密算法，比如 MD5 加密。Shiro 可以很简单的使用信息加密。

```java
public class TestMd5 {
    public static void main(String[] args) {
        // 密码明文
        String password = "123";
        // 使用md5加密
        Md5Hash md5Hash = new Md5Hash(password);
        System.out.println("md5加密:" + md5Hash.toHex());
        // 带盐的md5加密,盐就是在密码明文后拼接新的字符串,然后再加密
        Md5Hash md5Hash2 = new Md5Hash(password, "salt");
        System.out.println("md5带盐加密: " + md5Hash2.toHex());
        //为了保证安全，避免被破解还可以多次迭代加密，保证数据安全
        //md5+salt+hash散列 参数代表要散列多少次
        Md5Hash md5Hash3 = new Md5Hash(password, "salt",1024);
        System.out.println("md5 带盐1024次散列加密" + md5Hash3.toHex());

    }
}
```

> 实际应用：将 盐和散列 后的值存在数据库中，自动realm从数据库取出盐和加密后的值由shiro完成密码校验。

# 3、Shiro自定义登录认证🔥

Shiro 默认的登录认证是不带加密的，如果想要实现加密认证需要自定义登录认证，需要自定义 Realm。

1. 自定义`CustomerRealm` 类，继承  `AuthenticatingRealm` 类，实现 `doGetAuthenticationInfo()` 方法

```java
public class CustomerRealm extends AuthenticatingRealm {
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
        // 获取token中的用户名
        String principal = authenticationToken.getPrincipal().toString();
        System.out.println(principal);
        // 假设这是从数据库中查询到的信息
        String username = "zhangsan";
        String password = "123";

        // 根据用户名查询数据库
        if(username.equals(principal)) {
            //参数1:数据库用户名
            //参数2:数据库md5+salt之后的密码
            //参数3:注册时的随机盐
            //参数4:realm的名字
            SimpleAuthenticationInfo simpleAuthenticationInfo  = new SimpleAuthenticationInfo(principal, password, ByteSource.Util.bytes("salt"), this.getName());
            return simpleAuthenticationInfo;
        }
        return null;
    }
}
```

2. 测试自定义 realm

```java
public class TestCustomerRealm {
    public static void main(String[] args) {
        // 1.创建安全管理器对象
        DefaultSecurityManager securityManager = new DefaultSecurityManager();
        // 2.设置自定义 realm
        securityManager.setRealm(new CustomerRealm());
        // 3.SecurityUtils 给全局安全工具类设置安全管理器
        SecurityUtils.setSecurityManager(securityManager);
        // 4.获取Subject对象
        Subject subject = SecurityUtils.getSubject();
        // 5.创建token令牌,web应用用户名密码从页面传递
        UsernamePasswordToken token = new UsernamePasswordToken("zhangsan", "123");
        // 6.完成登录
        try {
            subject.login(token);
            System.out.println(subject.isAuthenticated());
        } catch (AuthenticationException e) {
            e.printStackTrace();
        }
    }
}
```









# 4、Shiro与SpringBoot整合

1. 添加依赖

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.5.4</version>
</parent>
<dependencies>
    <!--shiro-->
    <dependency>
        <groupId>org.apache.shiro</groupId>
        <artifactId>shiro-spring-boot-web-starter</artifactId>
        <version>1.12.0</version>
    </dependency>
    <!--mybatis-plus-->
    <dependency>
        <groupId>com.baomidou</groupId>
        <artifactId>mybatis-plus-boot-starter</artifactId>
        <version>3.5.3</version>
    </dependency>
    <!--mysql-->
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>8.0.26</version>
    </dependency>
    <!--lombok-->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
    </dependency>
    <!--thymeleaf-->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-thymeleaf</artifactId>
    </dependency>
</dependencies>
```

2. 添加配置文件`application.yaml`

```yaml
mybatis-plus:
  configuration:
    # 日志输出
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
  # 配置 xml 文件的存放目录
  mapper-locations: classpath:mapper/*.xml

1. 添加依赖

spring:
  # 数据源
  datasource:
    driver-class-name: com.mysql.jdbc.Driver
    url: jdbc:mysql://localhost:3306/kuangstudy_shiro?characterEncoding=utf-8&serverTimezone=UTC
    username: root
    password: 123456
  # 日期返回格式化
  jackson:
    date-format: yyyy-MM-dd HH:mm:ss
    time-zone: GMT+8
#
shiro:
  loginUrl: /LoginController/userLogin
```

3. 添加启动类:`com.kuang.ShiroApplication.java`

```java
@SpringBootApplication
@MapperScan("com.kuang.shiro.mapper")
public class ShiroApplication {
    public static void main(String[] args) {
        SpringApplication.run(ShiroApplication.class,args);
    }
}
```

4. 运行如下sql文件

```sql
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '编号',
  `name` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户名',
  `pwd` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '密码',
  `rid` bigint NULL DEFAULT NULL COMMENT '角色编号',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '用户表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, '张三', '9c074aff230a802bf52901cddd5c81da', NULL);
INSERT INTO `user` VALUES (2, '李四', '811e0aff3bbcf3f521f8abfe537e5250', NULL);

SET FOREIGN_KEY_CHECKS = 1;
```

5. 创建实体类:`com.kuang.shiro.entity.User.java`

```java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    /**
     * 编号
     */
    private Integer id;

    /**
     * 用户名
     */
    private String name;

    /**
     * 密码
     */
    private String pwd;

    /**
     * 角色编号
     */
    private Integer rid;

}
```

6. 创建mapper接口:`com.kuang.shiro.mapper.UserMapper.java`

```java
@Repository
public interface UserMapper extends BaseMapper<User> {
}
```

7. 创建Service接口:`com.kuang.shiro.service.UserService.java`

```java
public interface UserService {
    /**
     * 用户登录
     * @param name
     * @return
     */
    User getUserInfoByName(String name);
}
```

实现类:`com.kuang.shiro.service.impl.UserServiceImpl`

```java
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;


    /**
     * 用户登录
     * @param name
     * @return
     */
    @Override
    public User getUserInfoByName(String name) {
        QueryWrapper<User> wrapper = new QueryWrapper<>();
        wrapper.eq("name",name);
        User user = userMapper.selectOne(wrapper);
        return user;
    }
}
```

8. 自定义realm:`com.kuang.shiro.realm.CustomerRealm.java`

```java
@Component
public class CustomerRealm extends AuthorizingRealm {

    @Autowired
    private UserService userService;


    /**
     * 自定义授权方法
     * @param principalCollection
     * @return
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        return null;
    }

    /**
     * 自定义登录认证方法
     * @param authenticationToken
     * @return
     * @throws AuthenticationException
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
        //1.获取token中的用户名
        String principal = authenticationToken.getPrincipal().toString();
        //2.从数据库查:调用业务层获取用户信息(数据库中)
        User user = userService.getUserInfoByName(principal);
        //3.判断并将数据完成封装
        if(user != null){
            SimpleAuthenticationInfo info = new SimpleAuthenticationInfo(
                    authenticationToken.getPrincipal(),
                    user.getPwd(),
                    ByteSource.Util.bytes("salt"),
                    this.getName()
            );
            return info;
        }

        return null;
    }
}

```

9. 编写配置类:`src/main/java/com/kuang/shiro/config/ShiroConfig.java`

```java
@Configuration
public class ShiroConfig {

    @Autowired
    private CustomerRealm customerRealm;

    //配置 SecurityManager
    @Bean
    public DefaultWebSecurityManager defaultWebSecurityManager(){
        //1.创建defaultWebSecurityManager对象
        DefaultWebSecurityManager defaultWebSecurityManager = new DefaultWebSecurityManager();
        //2.创建加密对象,并设置相关属性
        HashedCredentialsMatcher matcher = new HashedCredentialsMatcher();
        // 2.1 采用md5加密
        matcher.setHashAlgorithmName("md5");
        // 2.2 迭代加密次数
        matcher.setHashIterations(1024);
        //3.将加密对象存储到CustomerRealm中
        customerRealm.setCredentialsMatcher(matcher);
        //4.将CustomerRealm存储到defaultWebSecurityManager中
        defaultWebSecurityManager.setRealm(customerRealm);
        //5.返回
        return defaultWebSecurityManager;

    }


    /**
     * 配置 Shiro 内置过滤器拦截范围
     */
    @Bean
    public DefaultShiroFilterChainDefinition shiroFilterChainDefinition(){
        DefaultShiroFilterChainDefinition definition = new DefaultShiroFilterChainDefinition();
        //1.设置不需要拦截的路径
        definition.addPathDefinition("/LoginController/userLogin","anon");
        definition.addPathDefinition("/login","anon");
        //2.设置拦截所有路径
        definition.addPathDefinition("/**","authc");
        //3.返回
        return definition;
    }
}
```

10. 实现controller

    `src/main/java/com/kuang/shiro/controller/LoginController.java`

```java
@Controller
@RequestMapping("LoginController")
public class LoginController {

    // 登录认证
    @GetMapping("userLogin")
    @ResponseBody
    public String userLogin(String name,String pwd){
        //1.获取Subject对象
        Subject subject = SecurityUtils.getSubject();
        //2.封装请求数据到Token中
        AuthenticationToken token = new UsernamePasswordToken(name, pwd);
        //3.调用login方法进行登录认证
        try {
            subject.login(token);
            return "登录成功";
        }catch (Exception e){
            e.printStackTrace();
            System.out.println("登录失败");
            return "登录失败";
        }
    }
}
```



11. 测试：

    - `http://localhost:8080/LoginController/userLogin?name=张三&pwd=123`

    - 显示登录成功,则OK。

## 4.1、整合Thymeleaf

1. 添加依赖

```xml
<!--thymeleaf-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```

2. 配置`Thymeleaf`相关参数

```yml
spring:
  # Thymeleaf
  thymeleaf:
    # 模板缓存
    cache: false
    # 设置模板编码
    encoding: UTF-8
    # 设置模板模式
    mode: HTML5
    # 指定模板页面存放路径
    prefix: classpath:/templates/
    # 指定模板页面名称后缀
    suffix: .html
```



3. 新建登录页面:`src/main/resources/templates/login.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<h1>Shiro 登录认证</h1>
<br>
<form action="/LoginController/userLogin">
    <div>用户名：<input type="text" name="name" value=""></div>
    <div>密码：<input type="password" name="pwd" value=""></div>
    <div><input type="submit" value="登录"></div>
</form>
</body>
</html>
```

4. 新建main页面:`src/main/resources/templates/main.html`

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<h1>Shiro 登录认证后主页面</h1>
<br>
登录用户为：<span th:text="${session.user}"></span>
</body>
```

5. 添加`controller`方法，改造登录认证方法

```java
@Controller
@RequestMapping("LoginController")
public class LoginController {

    /**
     * 跳转到登录页面
     */
    @GetMapping("login")
    public String login() {
        return "login";
    }



    /**
     * 登录认证:登录成功后从login.html跳转到main.html,并且把信息放到Session里面
     * 因为不需要返回数据,所以去掉@ResponseBody注解
     * @param name
     * @param pwd
     * @return
     */
    @GetMapping("userLogin")
    public String userLogin(String name, String pwd, HttpSession session){
        //1.获取Subject对象
        Subject subject = SecurityUtils.getSubject();
        //2.封装请求数据到Token中
        AuthenticationToken token = new UsernamePasswordToken(name, pwd);
        //3.调用login方法进行登录认证
        try {
            subject.login(token);
            //将用户信息放入session
            session.setAttribute("user",token.getPrincipal().toString());
            //跳转到main.html
            return "main";
        }catch (Exception e){
            e.printStackTrace();
            System.out.println("登录失败");
            return "登录失败";
        }
    }
}
```

6. 修改配置文件

```yaml
shiro:
  # 登录路径
  loginUrl: /LoginController/login
```

7. 修改配置类`ShiroConfig.java`

```java
//1.设置不需要拦截的路径(设置不认证就可以访问的资源)
definition.addPathDefinition("/LoginController/userLogin","anon");
definition.addPathDefinition("/LoginController/login","anon");
```

![](不良人Shiro(一).assets/6.png)



8. 访问：`http://localhost:80/LoginControl/login`

![](不良人Shiro(一).assets/7.png)







## 4.2、多个realm的认证策略设置

Shiro中定义了3种认证策略的实现：

| AuthenticationStrategy class | 描述                                                         |
| ---------------------------- | ------------------------------------------------------------ |
| AtLeastOneSuccessfulStrategy | 只要有一个（或更多）的 Realm 验证成功，那么认证将视为成功    |
| FirstSuccessfulStrategy      | 第一个 Realm 验证成功，整体认证将视为成功，且后续 Realm 将被忽略 |
| AllSuccessfulStrategy        | 所有 Realm 成功，认证才视为成功                              |

默认认证策略是`AtLeastOneSuccessfulStrategy `方式，可以通过配置修改策略。





## 4.3、Remember me 功能

Shiro 提供了记住我（RememberMe）的功能，比如访问一些网站时，关闭了浏览器，下次再打开时还是能记住你是谁， 下次访问时无需再登录即可访问。

流程如下：

1. 首先在登录页面选中`RememberMe`然后登录成功，如果是浏览器登录，一般会把`RememberMe`的Cookie写到客户端并保存下来。
2. 关闭浏览器再重新打开，会发现浏览器还是记住你的。
3. 访问一般的网页服务器端，仍然知道你是谁，且能正常访问。
4. 但是，如果我们访问电商平台时，如果要查看我的订单或者进行支付时，此时还是需要再进行身份认证的，以确保当前用户还是你。

代码实现：

1. 修改配置类

```java
//配置 SecurityManager
@Bean
public DefaultWebSecurityManager defaultWebSecurityManager(){
    //1.创建defaultWebSecurityManager对象
    DefaultWebSecurityManager defaultWebSecurityManager = new DefaultWebSecurityManager();
    //2.创建加密对象,并设置相关属性
    HashedCredentialsMatcher matcher = new HashedCredentialsMatcher();
    // 2.1 采用md5加密
    matcher.setHashAlgorithmName("md5");
    // 2.2 迭代加密次数
    matcher.setHashIterations(1024);
    //3.将加密对象存储到CustomerRealm中
    customerRealm.setCredentialsMatcher(matcher);
    //4.将CustomerRealm存储到defaultWebSecurityManager中
    defaultWebSecurityManager.setRealm(customerRealm);
    //4.1 设置RememberMe
    defaultWebSecurityManager.setRememberMeManager(rememberMeManager());
    //5.返回
    return defaultWebSecurityManager;

}

/**
 * cookie属性设置
 */
public SimpleCookie rememberMeCookie() {
    SimpleCookie cookie = new SimpleCookie("rememberMe");
    // 设置跨域
    //cookie.setDomain(domain);
    cookie.setPath("/");
    cookie.setHttpOnly(true);
    cookie.setMaxAge(30*24*60*60);
    return cookie;
}

/**
 * 创建 Shiro 的 cookie 管理对象
 */
public CookieRememberMeManager rememberMeManager(){
    CookieRememberMeManager cookieRememberMeManager = new CookieRememberMeManager();
    cookieRememberMeManager.setCookie(rememberMeCookie());
    cookieRememberMeManager.setCipherKey("1234567890987654".getBytes());
    return cookieRememberMeManager;
}
```

2. 改造`login.html`，使得其有记住用户的按钮

```html
<form action="/LoginController/userLogin">
    <div>用户名：<input type="text" name="name" value=""></div>
    <div>密码：<input type="password" name="pwd" value=""></div>
    <div>记住用户:<input type="checkbox" name="rememberMe" value="true"></div>
    <div><input type="submit" value="登录"></div>
</form>
```

3. 改造`LoginController.java`，使得其传递多一个Boolean的`rememberMe`

```java
/**
 * 登录认证:登录成功后从login.html跳转到main.html,并且把信息放到Session里面
 * 因为不需要返回数据,所以去掉@ResponseBody注解
 * @return
 */
@GetMapping("userLogin")
public String userLogin(String name, String pwd, HttpSession session,@RequestParam(defaultValue = "false")Boolean rememberMe){
    //1.获取Subject对象
    Subject subject = SecurityUtils.getSubject();
    //2.封装请求数据到Token中
    AuthenticationToken token = new UsernamePasswordToken(name, pwd,rememberMe);
    //3.调用login方法进行登录认证
    try {
        subject.login(token);
        //将用户信息放入session
        session.setAttribute("user",token.getPrincipal().toString());
        //跳转到main.html
        return "main";
    }catch (Exception e){
        e.printStackTrace();
        System.out.println("登录失败");
        return "登录失败";
    }
}
```

4. 最后在配置类中配置`RememberMe`

```java
//添加RememberMe存在用户的过滤器
definition.addPathDefinition("/**","user");
```

> 这样记住我功能就实现了。







## 4.4、Logout 功能

用户登录后，配套的有登出操作。直接通过Shiro过滤器即可实现登出

1. 修改登录后的`main.html`

```html
<h1>Shiro 登录认证后主页面</h1>
	登录用户为：<span th:text="${session.user}"></span>
<a href="/logout">退出登录</a>
```

2. 修改配置类，添加 logout 过滤器

```java
//2.2 配置登出过滤器
definition.addPathDefinition("/logout","logout");
```

























































