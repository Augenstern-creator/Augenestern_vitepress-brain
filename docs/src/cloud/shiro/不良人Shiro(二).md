https://blog.csdn.net/unique_perfect/article/details/108816114

https://blog.csdn.net/A233666/article/details/113436604





# 1、授权、角色认证

用户登录后，需要验证是否具有指定角色指定权限。Shiro也提供了方便的工具进行判断，这个工具就是Reaml的`doGetAuthorizationInfo`方法进行判断，触发权限判断的有两种方式：

1. 在页面中通过`shiro:****`属性判断
2. 在接口服务中通过注解`@Requires****`进行判断



## 1.1、后端接口服务注解

通过给接口服务方法添加注解可以实现权限校验，可以加在控制器方法上，也可以加在业务方法上，一般加在**控制器方法**上。常用注解如下：

1. `@RequiresAuthentication` : 验证用户是否登录，等同于方法`subject.isAuthenticated()`
2. `@RequiresUser` : 验证用户是否被记忆，登录认证成功`subject.isAuthenticated()` 为true，登录后被记忆`subject.isRemembered()`为true

3. `@RequiresGuest` : 验证是否是一个 guest 游客的请求，此时`subject.getPrincipal()`为 null

4. `@RequiresRoles` ：验证subject是否有相应角色，有角色访问方法，没有则会抛出异常

   `AuthorizationException` ,例如

   ```java
   // 只有subject有aRoleName角色才能访问方法someMethod()
   @RequiresRoles("aRoleName")
   void someMethod();
   ```

5. `@RequiresPermissions`：验证 subject 是否有相应权限，有权限访问方法，没有则会抛出异常 AuthorizationException ，例如

```java
// subject 必须同时含有 file:read 和 write:a.txt 权限才能访问方法 someMethod()
@RequiresPermissions("file:read","write:a.txt")
void someMethod();
```

## 1.2、授权-获取角色

1. 添加`controller`方法

```java
/**
 * 授权admin角色
 * @return
 */
@RequiresRoles({"admin"})
@GetMapping("userLoginRoles")
@ResponseBody
public String userLoginRoles() {
    System.out.println("登录认证验证角色");
    return "验证角色成功";
}
```

2. 修改`main.html`

```html
<h1>Shiro 登录认证后主页面</h1>
<br>
登录用户为：<span th:text="${session.user}"></span>
<a href="/logout">退出登录</a>
<br>
<a href="/LoginController/userLoginRoles">测试授权</a>
```

3. 修改`CustomerRealm`方法

```java
/**
 * 自定义授权方法:获取当前登录用户权限信息,返回给Shiro用来进行授权对比
 * @param principalCollection
 * @return
 */
@Override
protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
    System.out.println("进入自定义授权方法");
    //1.创建对象,存储当前登录的用户的权限和角色
    SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
    //2.存储角色
    info.addRole("admin");
    //3.返回
    return info;
}
```

4. 访问：`localhost:8080/LoginController/login` 输入账号密码，点击测试授权，显示验证角色成功，说明张三具有`admin`的角色

![](不良人Shiro(二).assets/1.png)



> 接下来我们结合数据库

1. 创建库表

```sql
CREATE TABLE `role` (
 `id` BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT '编号',
 `name` VARCHAR(30) DEFAULT NULL COMMENT '角色名',
 `desc` VARCHAR(50) DEFAULT NULL COMMENT '描述',
 `realname` VARCHAR(20) DEFAULT NULL COMMENT '角色显示名',
 PRIMARY KEY (`id`)
) ENGINE=INNODB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='角色表';

INSERT INTO `role` VALUES (1, 'admin', '所有权限', '管理员');
INSERT INTO `role` VALUES (2, 'userManager', '用户管理权限', '用户管理员');

CREATE TABLE `role_user` (
 `id` BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT '编号',
 `uid` BIGINT(20) DEFAULT NULL COMMENT '用户 id',
 `rid` BIGINT(20) DEFAULT NULL COMMENT '角色 id',
 PRIMARY KEY (`id`)
) ENGINE=INNODB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='角色用户映射
表';

INSERT INTO `role_user` VALUES (1, 1, 1);
INSERT INTO `role_user` VALUES (2, 1, 2);
INSERT INTO `role_user` VALUES (3, 2, 2);
```

![](不良人Shiro(二).assets/2.png)



2. 根据用户名查询对应角色信息

```sql
SELECT NAME FROM role WHERE id IN (SELECT rid FROM role_user WHERE 
uid=(SELECT id FROM USER WHERE NAME='张三'));
```

3. mapper方法

```java
@Repository
public interface UserMapper extends BaseMapper<User> {

    /**
     * 根据用户查询对应角色信息
     * @param principal
     * @return
     */
    @Select("select name from role where id in(select rid from role_user where uid=(select id from user where name = #{principal}))")
    List<String> getUserRoleInfoMapper(@Param("principal")String principal);

}
```

4. service接口

```java
public interface UserService {
    /**
     * 用户登录
     * @param name
     * @return
     */
    User getUserInfoByName(String name);

    /**
     * 根据用户查询角色信息
     * @param principal
     * @return
     */
    List<String> getUserRoleInfo(String principal);
}
```

实现类：

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

    /**
     * 根据用户查询角色信息
     * @param principal
     * @return
     */
    @Override
    public List<String> getUserRoleInfo(String principal) {
        return userMapper.getUserRoleInfoMapper(principal);
    }
}
```

5. CustomerRealm自定义Realm改造，改为从数据库中获取信息

```java
/**
 * 自定义授权方法:获取当前登录用户权限信息,返回给Shiro用来进行授权对比
 * @param principalCollection
 * @return
 */
@Override
protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
    System.out.println("进入自定义授权方法");
    //1.获取当前用户身份信息
    String principal = principalCollection.getPrimaryPrincipal().toString();
    //2.调用接口方法获取用户的角色信息(从数据库)
    List<String> roles = userService.getUserRoleInfo(principal);
    System.out.println("当前用户角色信息:" + roles);
    //3.创建对象,存储当前登录的用户的权限和角色
    SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
    //4. 存储角色
    info.addRole("admin");
    //3.返回
    return info;
}
```

6. 访问：`localhost:8080/LoginController/login` 输入账号密码，点击测试授权，显示验证角色成功

![](不良人Shiro(二).assets/3.png)







## 1.3、授权-获取权限

1. 创建数据库表

```sql
CREATE TABLE `permissions` (
 `id` BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT '编号',
 `name` VARCHAR(30) DEFAULT NULL COMMENT '权限名',
 `info` VARCHAR(30) DEFAULT NULL COMMENT '权限信息',
 `desc` VARCHAR(50) DEFAULT NULL COMMENT '描述',
 PRIMARY KEY (`id`)
) ENGINE=INNODB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='权限表';

INSERT INTO `permissions` VALUES (1, '删除用户', 'user:delete', '删除用户');
INSERT INTO `permissions` VALUES (2, '新增用户', 'user:add', '新增用户');
INSERT INTO `permissions` VALUES (3, '修改用户', 'user:edit', '修改用户');

CREATE TABLE `role_ps` (
 `id` BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT '编号',
 `rid` BIGINT(20) DEFAULT NULL COMMENT '角色 id',
 `pid` BIGINT(20) DEFAULT NULL COMMENT '权限 id',
 PRIMARY KEY (`id`)
) ENGINE=INNODB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='角色权限映射
表';
INSERT INTO `role_ps` VALUES (1, 1, 1);
INSERT INTO `role_ps` VALUES (2, 1, 2);
INSERT INTO `role_ps` VALUES (3, 1, 3);
```

![](不良人Shiro(二).assets/4.png)



2. 根据角色名查询对应权限信息

```sql
SELECT info FROM permissions WHERE id IN (SELECT pid FROM role_ps WHERE rid 
IN (SELECT id FROM role WHERE NAME IN('admin','userMag')));
```

3. mapper方法

```java
/**
 * 根据角色名查询对应权限信息
 * @param roles
 * @return
 */
@Select({
        "<script>",
        "select info from permissions where id in",
        "(select pid from role_ps where rid in (",
        "select id from role where name in",
        "<foreach collection='roles' item='name' open='(' separator=',' close=')'>",
        "#{name}",
        "</foreach>",
        "))",
        "</script>"
})
List<String> getUserPermissionInfoMapper(@Param("roles")List<String> roles);
```

4. Service接口

```java
/**
* 根据用户获取用户角色的权限信息
* @return
*/
List<String> getUserPermissionInfo(List<String> roles);
```

实现类：

```java
/**
 * 根据用户获取用户角色的权限信息
 */
@Override
public List<String> getUserPermissionInfo(List<String> roles) {
    return userMapper.getUserPermissionInfoMapper(roles);
}
```

5. CustomerRealm自定义Realm改造

```java
/**
 * 自定义授权方法:获取当前登录用户权限信息,返回给Shiro用来进行授权对比
 * @param principalCollection
 * @return
 */
@Override
protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
    System.out.println("进入自定义授权方法");
    //1.获取当前用户身份信息
    String principal = principalCollection.getPrimaryPrincipal().toString();
    //2.调用接口方法获取用户的角色信息(从数据库)
    List<String> roles = userService.getUserRoleInfo(principal);
    System.out.println("当前用户角色信息:" + roles);
    //调用接口方法获取用户角色的权限信息
    List<String> permissions = userService.getUserPermissionInfo(roles);
    System.out.println("当前用户权限信息:" + permissions);
    //3.创建对象,存储当前登录的用户的权限和角色
    SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
    //4. 存储角色
    info.addRole("admin");
    //5. 存储权限
    info.addStringPermissions(permissions);
    //3.返回
    return info;
}
```

6. 添加`controller`方法，注解设置角色权限

```java
/**
 * 根据用户获取用户角色的权限信息,验证是否具有 user:delete 权限
 * @return
 */
@RequiresPermissions("user:delete")
@GetMapping("userPermissions")
@ResponseBody
public String userLoginPermissions() {
    System.out.println("登录认证验证权限");
    return "验证权限成功";
}
```

7. 改造main.html

```html
<h1>Shiro 登录认证后主页面</h1>
<br>
登录用户为：<span th:text="${session.user}"></span>
<a href="/logout">退出登录</a>
<br>
<a href="/LoginController/userLoginRoles">测试授权-角色验证</a>
<a href="/LoginController/userPermissions">测试授权-权限验证</a>
```

8. 访问：`localhost:8080/LoginController/login` 输入账号密码，点击测试授权-权限授权，

![](不良人Shiro(二).assets/5.png)







## 1.4、授权-异常处理

- 创建认证异常处理类 

  `src/main/java/com/kuang/shiro/controller/PermissionsException.java`

  使用`@ControllerAdvice`加`@ExceptionHandler`实现特殊异常处理。

```java
@ControllerAdvice
public class PermissionsException {

    @ResponseBody
    @ExceptionHandler(UnauthorizedException.class)
    public String unauthorizedException(Exception e){
        return "无权限";
    }

    @ResponseBody
    @ExceptionHandler(AuthorizationException.class)
    public String authorizationException(Exception e){
        return "权限认证失败";
    }
}
```

这样就会在网页直接显示无权限，权限认证失败，而不是一堆异常。但是我们思考一个问题，**我们如果展示了所有功能，只有部分用户可以点进来查看，其他没有权限的用户点进来是无权限，这显然体验感不好，我们要求对不同权限用户展示不同的功能。**







## 1.5、前端页面授权

1. 添加依赖

```xml
<!--配置 Thymeleaf 与 Shiro 的整合依赖-->
<dependency>
    <groupId>com.github.theborakompanioni</groupId>
    <artifactId>thymeleaf-extras-shiro</artifactId>
    <version>2.1.0</version>
</dependency>
```

2. `ShiroConfig`添加新配置

```java
/**
 * 用于解析thymeleaf中的  shiro:相关属性
 */
@Bean
public ShiroDialect shiroDialect() {
    return new ShiroDialect();
}
```

3. Thymeleaf中常用的 `shiro:属性`

```html
<!--guest标签:用户没有身份验证时显示相应信息，即游客访问信息-->
<shiro:guest>
</shiro:guest>

<!--user标签:用户已经身份验证/记住我登录后显示相应的信息-->
<shiro:user>
</shiro:user>

<!--authenticated标签:用户已经身份验证通过，即 Subject.login 登录成功，不是记住我登录的-->
<shiro:authenticated>
</shiro:authenticated>

<!--notAuthenticated标签:用户已经身份验证通过，即没有调用 Subject.login 进行登录，包括记住我自动登录的也属于未进行身份验证-->
<shiro:notAuthenticated>
</shiro:notAuthenticated>

<!--principal标签:相当于((User)Subject.getPrincipals()).getUsername()-->
<shiro:principal>
</shiro:principal>

<!--hasRole标签:如果当前 Subject 有角色将显示 body 体内容-->
<shiro:hasRole name="admin">
</shiro:hasRole>

<!--hasAnyRoles标签:如果当前 Subject 有任意一个角色(或的关系)将显示 body 体内容-->
<shiro:hasAnyRoles name="admin,user">
</shiro:hasAnyRoles>

<!--hasPermission标签:如果当前 Subject 有权限将显示 body 体内容-->
<shiro:hasPermission name="user:create">
</shiro:hasPermission>
```

4. 改造`main.html`

```html
<!DOCTYPE html>
<!--导入Shiro的命名空间-->
<html lang="en" xmlns:th="http://www.thymeleaf.org" xmlns:shiro="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<h1>Shiro 登录认证后主页面</h1>
<br>
登录用户为：<span th:text="${session.user}"></span>
<a href="/logout">退出登录</a>
<br>
<!--如果有admin的角色,则展示这个a链接-->
<a href="/LoginController/userLoginRoles" shiro:hasRole="admin">测试授权-角色验证</a>
<!--如果有user:delete权限,则展示这个a链接-->
<a href="/LoginController/userPermissions" shiro:hasPermission="user:delete">测试授权-权限验证</a>
</body>
```

5. 测试
   - 张三有admin角色，`user:delete`权限，则展示两个 a 标签
   - 李四只有admin角色，没有`user:delete`权限，则展示 测试授权-角色验证 标签









# 2、EhCache

EhCache是一种广泛使用的开源Java分布式缓存。主要面向通用缓存,Java EE和轻量级容器。可以和大部分Java项目无缝整合。EhCache支持内存和磁盘存储，默认存储在内存中，如内存不够时把缓存数据同步到磁盘中。EhCache支持基于Filter的Cache实现，也支持Gzip压缩算法。

- EhCache直接在JVM虚拟机中缓存，速度快，效率高
- EhCache缺点是缓存共享麻烦，集群分布式应用使用不方便

## 2.1、Shiro整合EhCache

Shiro官方提供了shiro-ehcache，实现了整合EhCache作为Shiro的缓存工具。可以缓存认证执行的Realm方法，减少对数据库的访问，提高认证效率。

1. 添加依赖

```xml
<!--Shiro整合EhCache-->
<dependency>
    <groupId>org.apache.shiro</groupId>
    <artifactId>shiro-ehcache</artifactId>
    <version>1.13.0</version>
</dependency>
<dependency>
    <groupId>commons-io</groupId>
    <artifactId>commons-io</artifactId>
    <version>2.13.0</version>
</dependency>
```

2. 在 resources 下添加配置文件 `ehcache/ehcache-shiro.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ehcache name="ehcache" updateCheck="false">
    <!--磁盘的缓存位置-->
    <diskStore path="java.io.tmpdir"/>
    <!--默认缓存-->
    <defaultCache
            maxEntriesLocalHeap="1000"
            eternal="false"
            timeToIdleSeconds="3600"
            timeToLiveSeconds="3600"
            overflowToDisk="false">
    </defaultCache>
    <!--登录认证信息缓存：缓存用户角色权限-->
    <cache name="loginRolePsCache"
           maxEntriesLocalHeap="2000"
           eternal="false"
           timeToIdleSeconds="600"
           timeToLiveSeconds="0"
           overflowToDisk="false"
           statistics="true"/>
</ehcache>
```

3. 修改配置类`ShiroConfig`

```java
/**
 * 配置 SecurityManager
 */
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
    //5.设置缓存管理器
    defaultWebSecurityManager.setCacheManager(getEhCacheManager());
    //6.返回
    return defaultWebSecurityManager;

}


/**
 * 缓存管理器
 */
public EhCacheManager getEhCacheManager() {
    EhCacheManager ehCacheManager = new EhCacheManager();
    InputStream is = null;

    try {
        is = ResourceUtils.getInputStreamForPath("classpath:ehcache/ehcache-shiro.xml");
    } catch (IOException e) {
        e.printStackTrace();
    }
    CacheManager cacheManager = new CacheManager(is);
    ehCacheManager.setCacheManager(cacheManager);
    return ehCacheManager;
}
```























































