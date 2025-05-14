# SpringBoot场景场景

## 1、登录校验流程介绍

- 前端在登录时会携带用户名和密码发起登录请求，后端进行用户名与密码的校验。
- 如果用户名和密码正确会根据用户 id 生成一个 token，然后把生成的 token 通过响应返回给前端，前端把 token 进行保存。
- 这样前端再发送其他请求时，可以携带这个 token 进行请求，这样后端解析 token 成功就代表你之前登录过了，不需要再进行登录，否则就相当于是未登录。

![](三更SpringBoot(四).assets/1.png)

本案例采用企业中运用比较多的 JWT 来生成 token

1. 使用时先引入 jwt 依赖

```xml
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt</artifactId>
    <version>0.9.1</version>
</dependency>
```

2. 建立 utils 包，建立 jwt 工具类

```java
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;
import java.util.Date;
import java.util.UUID;

/**
 * JWT工具类
 */
public class JwtUtil {

    //有效期为
    public static final Long JWT_TTL = 60 * 60 *1000L;// 60 * 60 *1000  一个小时
    //设置秘钥明文
    public static final String JWT_KEY = "sangeng";

    /**
     * 创建token
     * @param id
     * @param subject
     * @param ttlMillis
     * @return
     */
    public static String createJWT(String id, String subject, Long ttlMillis) {

        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);
        if(ttlMillis==null){
            ttlMillis=JwtUtil.JWT_TTL;
        }
        long expMillis = nowMillis + ttlMillis;
        Date expDate = new Date(expMillis);
        SecretKey secretKey = generalKey();

        JwtBuilder builder = Jwts.builder()
                .setId(id)              //唯一的ID
                .setSubject(subject)   // 主题  可以是JSON数据
                .setIssuer("sg")     // 签发者
                .setIssuedAt(now)      // 签发时间
                .signWith(signatureAlgorithm, secretKey) //使用HS256对称加密算法签名, 第二个参数为秘钥
                .setExpiration(expDate);// 设置过期时间
        return builder.compact();
    }

    /**
     * 生成加密后的秘钥 secretKey
     * @return
     */
    public static SecretKey generalKey() {
        byte[] encodedKey = Base64.getDecoder().decode(JwtUtil.JWT_KEY);
        SecretKey key = new SecretKeySpec(encodedKey, 0, encodedKey.length, "AES");
        return key;
    }
    
    /**
     * 解析
     *
     * @param jwt
     * @return
     * @throws Exception
     */
    public static Claims parseJWT(String jwt) throws Exception {
        SecretKey secretKey = generalKey();
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(jwt)
                .getBody();
    }


}
```

我们可以进行测试

- 创建token：`JwtUtil.createJWT()`
  - 第一个参数：id
  - 第二个参数：携带的数据
  - 第三个参数：token 超时时间
- 解析token：`JwtUtil.parseJWT(token)`

```java
public static void main(String[] args) throws Exception {
    // 创建 token
    String token = JwtUtil.createJWT(UUID.randomUUID().toString(), "sangeng", null);
    System.out.println(token);
    // 解析 token

    Claims claims = JwtUtil.parseJWT(token);
    String subject = claims.getSubject();
    System.out.println(subject);

}
```

![](三更SpringBoot(四).assets/2.png)



### 1.1、登录接口的实现

数据库语句准备：

```sql
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `sys_user` */

insert  into `sys_user`(`id`,`username`,`password`) values (1,'root','root'),(2,'sangeng','caotang');
```

实体类

```java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SystemUser {

    private Integer id;
    private String username;
    private String password;
}
```

- controller层 ：SystemUserController

```java
@RestController
@RequestMapping("/sys_user")
public class SystemUserController {
    @Autowired
    private SystemUserService userService;

    @PostMapping("/login")
    public ResponseResult login(@RequestBody SystemUser user) {
        //校验用户名密码是否正确
        SystemUser loginUser = userService.login(user);
        Map<String, Object> map;
        if (loginUser != null) {
            //如果正确 生成token返回
            map = new HashMap<>();
            String token = JwtUtil.createJWT(UUID.randomUUID().toString(), String.valueOf(loginUser.getId()), null);
            map.put("token", token);
        } else {
            //如果不正确 给出相应的提示
            return new ResponseResult(300, "用户名或密码错误，请重新登录");
        }
        return new ResponseResult(200, "登录成功", map);
    }
}
```

- service层及实现类

```java
public interface SystemUserService {

    public SystemUser login(SystemUser user);
}
```

```java
@Service
public class SystemUserServcieImpl implements SystemUserService {
    @Autowired
    private SystemUserMapper systemUserMapper;

    @Override
    public SystemUser login(SystemUser user) {
        SystemUser loginUser = systemUserMapper.login(user);
        return loginUser;
    }
}
```

- dao 层及其 mapper 映射文件

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
<mapper namespace="com.sangeng.mapper.SystemUserMapper">
    <select id="login" resultType="com.sangeng.domain.SystemUser">
        select * from sys_user where username = #{username} and password = #{password}
    </select>
</mapper>
```

我们使用 Postman 发送 POST 请求进行测试：

![](三更SpringBoot(四).assets/3.png)



### 1.2、登录页面

```html
<div id="app">
    <form>
        <input type="text" v-model="user.username"  placeholder="请输入用户名" />
        <input type="text" v-model="user.password"  placeholder="请输入密码" />
        <button type="submit" @click="handleLogin()">Login</button>
    </form>
</div>


<!-- Vue开发环境版本，包含了有帮助的命令行警告 -->
<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
<!--axios引入-->
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script>
  const app = new Vue({
     el: '#app',
     data: {
        user: {}
     },
     methods: {
        handleLogin(){
           // 请求后台登录接口
           axios.post("http://localhost:81/sys_user/login",this.user).then((res)=>{
              console.log(res);
              // 判断是否成功(code状态码是否为200)
              if(res.data.code == 200){
                 // 登录成功
                 alert("登录成功");
                 // 存储 token
                 localStorage.setItem("token",res.data.token);
                 // 跳转页面到 index.html
                 location.href = "../index.html";
              }else{
                 // 登录失败
                 alert(res.data.msg);
              }
           })
        }
     }
  })
</script>
```

这样就是一个简单的前后端登录校验



## 2、拦截器

如果我们想在多个Handler方法执行之前或者之后都进行一些处理，甚至某些情况下需要拦截掉，不让Handler方法执行。那么可以使用SpringMVC为我们提供的拦截器。

例如上述我们的前后端登录校验的案例，我们知道登录成功之后后端会返回前端 token，前端再次发送请求时携带这个 token，后端解析 token 来达到辨别是否之前登录过。但是如果前端请求很多，我们每次都需要后端解析 token，这种重复又费时的事我们其实可以让拦截器帮我们做。

### 2.1、使用步骤

1. 创建类实现HandlerInterceptor接口

```java
public class LoginInterceptor implements HandlerInterceptor {
}
```

2. 实现类

   包 interceptor 下创建 LoginInterceptor 类

```java
@Component
public class LoginInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        //获取请求头中的token
        String token = request.getHeader("token");
        //判断token是否为空，如果为空也代表未登录 提醒重新登录（401）
        if(!StringUtils.hasText(token)){
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
            return false;
        }
        //解析token看看是否成功
        try {
            Claims claims = JwtUtil.parseJWT(token);
            String subject = claims.getSubject();
            System.out.println(subject);
        } catch (Exception e) {
            e.printStackTrace();
            //如果解析过程中没有出现异常说明是登录状态
            //如果出现了异常，说明未登录，提醒重新登录（401）
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
            return false;
        }
        return true;
    }
}
```

3. 配置拦截器
   - SpringMVC 中我们是在 web.xml 中进行配置
   - SpringBoot 中我们是创建一个类实现 WebMvcConfigurer 接口来进行配置
   - config 包下 创建 LoginConfig 类

```java
@Configuration
public class LoginConfig implements WebMvcConfigurer {

    @Autowired
    private LoginInterceptor loginInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(loginInterceptor)//添加拦截器
            .addPathPatterns("/**")  //配置拦截路径
            .excludePathPatterns("/sys_user/login");//配置排除路径
    }
}
```

好，我们来进行测试：

我们先来进行登录，传入正确的用户名和密码

![](三更SpringBoot(四).assets/4.png)





我们现在进行其他请求，我们先不携带 token 进行请求：

![](三更SpringBoot(四).assets/5.png)

我们将 token 值复制，携带 token 进行请求：

![](三更SpringBoot(四).assets/6.png)





### 2.2、异常统一处理

我们上面出现异常只会响应一个 401 的状态码，这样对用户是很不友好的，所以我们需要将异常进行统一的处理。

1. 创建异常统一处理类，在类上加 `@ControllerAdvice` 注解进行标识

2. 定义异常处理方法，使用 `@ExceptionHandler` 标识可以处理的异常

   Exception 异常包下创建异常类

```java
@ControllerAdvice
public class MyControllerAdvice {

    @ExceptionHandler(RuntimeException.class)
    @ResponseBody
    public ResponseResult handlerException(Exception e){
        //获取异常信息，存放如ResponseResult的msg属性
        String message = e.getMessage();
        ResponseResult result = new ResponseResult(300,message);
        //把ResponseResult作为返回值返回，要求到时候转换成json存入响应体中
        return result;
    }
}
```

这样的话我们在拦截器中只需要抛出异常，就会被异常类捕获并进行统一处理,我们将之前的拦截器类修改如下：

```java
@Component
public class LoginInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        //获取请求头中的token
        String token = request.getHeader("token");
        //判断token是否为空，如果为空也代表未登录 提醒重新登录（401）
        if(!StringUtils.hasText(token)){
//            response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
            throw new RuntimeException("未登录,请登录后重试");

        }
        //解析token看看是否成功
        try {
            Claims claims = JwtUtil.parseJWT(token);
            String subject = claims.getSubject();
            System.out.println(subject);
        } catch (Exception e) {
            e.printStackTrace();
            //如果解析过程中没有出现异常说明是登录状态
            //如果出现了异常，说明未登录，提醒重新登录（401）
//            response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
            throw new RuntimeException("未登录,请登录后重试");
        }
        return true;
    }
}
```

这样我们进行测试，我们首先不携带 token 进行请求

![](三更SpringBoot(四).assets/7.png)



我们携带 token 进行请求

![](三更SpringBoot(四).assets/8.png)



## 3、获取web原生对象

我们之前在web阶段我们经常要使用到request对象，response，session对象等。我们也可以通过SpringMVC获取到这些对象。（不过在MVC中我们很少获取这些对象，因为有更简便的方式，避免了我们使用这些原生对象相对繁琐的API。）

**我们只需要在方法上添加对应类型的参数即可，但是注意数据类型不要写错了，SpringMVC会把我们需要的对象传给我们的形参。**

```java
@RestController
public class TestController {

    @RequestMapping("/getRequestAndResponse")
    public ResponseResult getRequestAndResponse(HttpServletRequest request, HttpServletResponse response, HttpSession session){
        System.out.println(request);
        return new ResponseResult(200,"成功");
    }
}
```



## 4、自定义参数解析

例如我们现在想要获取用户的 id, 那我们可以通过获取请求头中的 token ，通过解析 token 来获取用户 id，那如果我们有很多请求都需要获取用户的 id，我们能不能实现像获取请求体中的数据那样，在 Handler 方法的参数上增加一个`@RepuestBody`注解就可以获取到对应的数据？

答案当然是可以的，我们可以实现 HandlerMethodArgumentResolver 接口来实现自定义的参数解析。



1. 创建一个注解类，定义用来标识的注解

```java
@Target(ElementType.PARAMETER)
@Retention(RetentionPolicy.RUNTIME)
public @interface CurrentUserId {

}
```

2. 创建一个 resolver 包，包下建立 UserIdArgumentResolver 用户ID参数处理类实现 HandlerMethodArgumentResolver 接口

```java
@Component
public class UserIdArgumentResolver implements HandlerMethodArgumentResolver {

    // 判断方法参数是否能使用当前的参数解析器进行解析
    @Override
    public boolean supportsParameter(MethodParameter methodParameter) {
        // 如果方法参数有加上 CurrentUserId 注解,就能被我们的解析器解析
        return methodParameter.hasMethodAnnotation(CurrentUserId.class);
    }


    // 真正去进行参数解析的方法,可以在方法中获取对应的数据,然后把数据作为返回值返回。方法的返回值就会赋值给对应的方法参数
    @Override
    public Object resolveArgument(MethodParameter methodParameter, ModelAndViewContainer modelAndViewContainer, NativeWebRequest nativeWebRequest, WebDataBinderFactory webDataBinderFactory) throws Exception {
        // 获取请求头中的 token
        String token = nativeWebRequest.getHeader("token");
        if(StringUtils.hasText(token)){
            // 解析 token,获取 userId
            Claims claims = JwtUtil.parseJWT(token);
            String userId = claims.getSubject();
            // 返回结果
            return userId;
        }

        return null;
    }
}

```

> **注意加上@Component注解注入Spring容器**

3. 配置参数解析器，在 config 包下配置我们的解析器

```java
@Configuration
public class ArgumentResolveConfig implements WebMvcConfigurer {

    @Autowired
    private UserIdArgumentResolver userIdArgumentResolver;

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(userIdArgumentResolver);

    }
}
```

4. 测试

   在需要获取 UserId 的方法中增加对应的方法参数然后使用 `@CurrentUserId` 进行标识即可获取到数据

```java
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserServcie userServcie;

    @RequestMapping("/findAll")
    public ResponseResult findAll(@CurrentUserId String userId) throws Exception {
        System.out.println(userId);
        //调用service查询数据 ，进行返回s
        List<User> users = userServcie.findAll();

        return new ResponseResult(200,users);
    }
}
```





## 5、声明式事务

直接在需要事务控制的方法上加上对应的注解`@Transactional`

```java
@Service
public class UserServiceImpl implements UserServcie {

    @Autowired
    private UserMapper userMapper;

    @Override
    public List<User> findAll() {
        return userMapper.findAll();
    }

    @Override
    @Transactional
    public void insertUser() {
        //添加2个用户到数据库
        User user = new User(null,"sg666",15,"上海");
        User user2 = new User(null,"sg777",16,"北京");
        userMapper.insertUser(user);
        System.out.println(1/0);			// 手动制造错误
        userMapper.insertUser(user2);
    }


}
```



## 6、AOP

在SpringBoot中默认是开启AOP功能的。如果不想开启AOP功能可以使用如下配置设置为false

```yml
spring:
  aop:
    auto: false
```

### 6.1、使用步骤

1. 添加依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-aop</artifactId>
</dependency>
```

2. 自定义注解类

   aop 包下 创建注解类

```java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface InvokeLog {
    
}
```

3. 定义切面类

   

```java
@Aspect  //标识这是一个切面类
@Component
public class InvokeLogAspect {

    //确定切点
    @Pointcut("@annotation(com.sangeng.aop.InvokeLog)")
    public void pt(){
    }

    @Around("pt()")
    public Object printInvokeLog(ProceedingJoinPoint joinPoint){
        //目标方法调用前
        Object proceed = null;
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        String methodName = signature.getMethod().getName();
        System.out.println(methodName+"即将被调用");
        try {
            proceed = joinPoint.proceed();
            //目标方法调用后
            System.out.println(methodName+"被调用完了");
        } catch (Throwable throwable) {
            throwable.printStackTrace();
            //目标方法出现异常了
            System.out.println(methodName+"出现了异常");
        }
        return proceed;
    }
}

```

4. 在需要增强的 service 实现类方法上增加对应的注解

```java
@Service
public class UserServiceImpl implements UserServcie {

    @Autowired
    private UserMapper userMapper;

    @Override
    @InvokeLog  //需要被增强方法需要加上对应的注解
    public List<User> findAll() {
        return userMapper.findAll();
    }
}
```















### 6.2、切换动态代理

有的时候我们需要修改 AOP 的代理方式，我们可以使用以下方式修改：

- 配置文件中配置 `spring.aop.proxy-target-class` 为 false 切换为 jdk 动态代理。该配置默认值为true，代表使用cglib动态代理。

1. 在启动类中添加 `EnableAspectJAutoProxy` 注解

```java
@SpringBootApplication
@EnableAspectJAutoProxy(proxyTargetClass = false)//修改代理方式
public class WebApplication {
    public static void main(String[] args) {
        ConfigurableApplicationContext context = SpringApplication.run(WebApplication.class, args);
    }
}
```

2. 在 yml 配置文件中配置

```yml
spring:
  aop:
    proxy-target-class: false #切换动态代理的方式
```













## 7、模板引擎Thymeleaf

1. 添加依赖

```xml
<!--thymeleaf依赖-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```

2. 在controller中往域中存数据，并且跳转

```java
@Controller
public class ThymeleafController {

    @Autowired
    private UserServcie userServcie;

    @RequestMapping("/thymeleaf/users")
    public String users(Model model){
        //获取数据
        List<User> users = userServcie.findAll();
        //望域中存入数据
        model.addAttribute("users",users);
        model.addAttribute("msg","hello thymeleaf");
        //页面跳转
        return "table-standard";
    }
}
```

3. 准备 `table-standard.html`

   - 在**resources\templates**下存放模板页面。

   - 在html标签中加上 `xmlns:th="http://www.thymeleaf.org"`

   - 获取域中的name属性的值可以使用： ${name}    注意要在th开头的属性中使用

```html
<html xmlns:th="http://www.thymeleaf.org">
    
    
<div class="panel-heading" th:text="${msg}">Kitchen Sink</div>
```



## 8、









## 10、日志

开启日志： 将 com.sangeng 包下的日志级别设置为 debug 级别

```yml
debug: true #开启日志
logging:
  level:
    com.sangeng: debug #设置日志级别
```





## 11、指标监控

我们在日常开发中需要对程序内部的运行情况进行监控， 比如：健康度、运行指标、日志信息、线程状况等等 。而SpringBoot的监控Actuator就可以帮我们解决这些问题。

1. 添加依赖

```xml
<dependency>
 	<groupId>org.springframework.boot</groupId>
 	<artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

2. 访问监控接口

```
http://localhost:81/actuator
```

返回的结果是一串 json ，我们可以在 json 解析网站解析此 json 数据

3. 配置启用监控端点

```yml
management:
  endpoints:
    enabled-by-default: true #配置启用所有端点
	web:
      exposure:
        include: "*" #web端暴露所有端点
```



















