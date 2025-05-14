#       1、SpringBoot简介

我们之前的SSM还是使用起来不够爽。

- 还需要写很多的配置才能进行正常的使用。
- 实现一个功能需要引入很多的依赖，尤其是要自己去维护依赖的版本，特别容易出现依赖冲突等问题。
- SpringBoot就能很好的解决上述问题。
- 中文文档：https://doc.springcloud.io/spring-boot/index.html

## 1.1、SpringBoot是什么

Spring Boot是基于Spring开发的全新框架，相当于对Spring做了又一层封装。

- 其设计目的是用来简化Spring应用的初始搭建以及开发过程。该框架使用了特定的方式来进行配置，从
  而使开发人员不再需要定义样板化的配置。（自动配置）
- 并且对第三方依赖的添加也进行了封装简化。（起步依赖）

所以Spring能做的他都能做，并且简化了配置。并且还提供了一些Spring所没有的比如：

- 内嵌web容器，不再需要部署到web容器中
- 提供准备好的特性，如指标、健康检查和外部化配置

> 最大特点：自动配置、起步依赖



## 1.2、快速构建SpringBoot项目

1. 新建 Spring Initializr 

![](三更SpringBoot(一).assets/1.png)

2. 选择版本和 Spring Web 依赖

![](三更SpringBoot(一).assets/2.png)

3. 点击 Finish 即可

![](三更SpringBoot(一).assets/11.png)

### 1.2.1、阿里云镜像

使用 Spring Initializr 方式构建 Spring Boot 项目，当网络不稳定时，经常会出现无法连接或连接超时的问题，导致项目无法创建或创建失败。

我们可以使用 http://start.aliyun.com 镜像地址创建项目，如下图所示

![](三更SpringBoot(一).assets/13.png)

## 1.3、自己构建SpringBoot项目

上述IDEA快速构建项目

1. 新建普通 Maven 项目

![](三更SpringBoot(一).assets/3.png)

2. 继承父工程

   在 pom.xml 中添加一下配置，继承 spring-boot-starter-parent 这个父工程

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.5.4</version>
</parent>
```

3. 添加依赖

   在 pom.xml 导入如下依赖

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
</dependencies>
```

4. 创建启动类

   创建一个类，在其上加上 `@SpringBootApplication` 注解标识为启动类

```java
@SpringBootApplication
public class HelloApplication {
    public static void main(String[] args) {
        SpringApplication.run(HelloApplication.class,args);
    }

}
```

5. 定义 Controller

   创建Controller 包，Controller 要放在启动类所在包

![](三更SpringBoot(一).assets/4.png)

```java
@RestController         // 相当于 @Controller + @ResponseBody
public class HelloController {

    @RequestMapping("/hello")
    public String hello(){
        return "Hello SpringBoot";
    }
}
```

6. 启动测试

   直接运行==启动类的 main 方法==即可，然后访问 localhost:80/hello

![](三更SpringBoot(一).assets/5.png)



## 1.4、打包运行

我们可以把 springboot 的项目打成 jar 包直接去运行。

1. 添加 maven 插件 spring-boot-maven-plugin

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>
    </plugins>
</build>
```

2. maven 打包

![](三更SpringBoot(一).assets/6.png)

3. 在 cmd 命令行中启动 jar 包

![](三更SpringBoot(一).assets/7.png)



4. 在浏览器访问 localhost:80/hello 即可





## 1.5、修改banner

也就是更改启动时显示的字符拼成的字母，也就是 banner 图案

1. 百度SpringBoot banner 在线生成工具：https://www.bootschool.net/ascii ，这个网站生成

2. 到项目下的 resources 目录下新建一个 banner.txt 即可
3. 将生成的拷贝到 banner.txt 中即可

![](三更SpringBoot(一).assets/8.png)





# 2、SpringBoot国际化

在 Web 开发中，国际化支持通常是做国际化网站都需要考虑的一个问题，应用程序会涉及到页面的多语言化支持，例如页面可以切换中文简体、英文、日文等语言。Spring Boot 为国际化提供了强有力的支持，同时在开发 Web 应用程序的时候，请求处理过程中发生错误也是非常常见的情况、往往是需要通过一个统一的异常处理来保证客户端能够收到友好的提示。

## 2.1、SpringBoot国际化支持

国际化是一个使应用程序适应不同语言和区域而无需对源代码进行工程更改的过程。用它来说，国际化是对本地化的准备。国际化实际上就是在利用浏览器语言，或者页面中的中英文切换，将页面的文字在其他语言和中文进行切换。

SpringBoot实现国际化的步骤如下：

1. **编写多语言国际化文件**

   在项目的 resources 目录创建名称为 i18n的文件夹，并在该文件夹中根据需要编写对应的多语言国际化文件 login.properties、login_zh_CN.properties 和 login_en_US.properties 文件，代码如下所示：

- login.properties

```properties
login.password=密码
login.remeber=记住我
login.btn=登录
login.tip=请登录
login.username=用户名
```

- login_zh_CN.properties

```properties
login.password=密码
login.remeber=记住我
login.btn=登录
login.tip=请登录
login.username=用户名
```

- login_en_US.properties

```properties
login.password=Password
login.remeber=Remember Me
login.btn=sign in
login.tip=Please sign in
login.username=UserName
```

![](三更SpringBoot(一).assets/15.png)

​	如图方式，我们创建3个文件，分别是无语言配置时候生效的 `login.properties` ；中文生效的 `login_zh_CN.properties` ，英文生效的 `login_en_US.properties`

​	以下划线的组合：==文件名 _ 区域 _语言.properties==，当我们这样命名生成文件后，IDEA也会帮我们识别这是个国际化配置包，自动转换成如下的模式：

![](三更SpringBoot(一).assets/16.png)



​	当变成如上图所描述的模式时，我们再需要添加配置文件，直接选中包右键 new 即可，如下图所示：

![](三更SpringBoot(一).assets/17.png)

![](三更SpringBoot(一).assets/18.png)

​	我们需要在这些配置文件里做些改动，先点击 login_zh_CN的配置文件，然后点击下边如图所示的 Resource Bundle 的按钮，切换编辑模式

![](三更SpringBoot(一).assets/19.png)

​	按照如图的方法，点击加号，添加一个 key，命名为 `login.tip` (在页面中使用)

![](三更SpringBoot(一).assets/20.png)



​	接下来按照我们页面需要转换的量，来做配置，如下图

![](三更SpringBoot(一).assets/21.png)



2. **指定国际化参数设置**

   在 `application.properties` 配置文件中指定国际化参数设置

```properties
#指定国际化基类名
spring.message.basename=i18n.login
```

上述代码中，根据国际化配置文件位置和名称，在项目全局配置文件中使用 `spring.message.basename=i18n.login` 设置了自定义国际化文件的基础名。其中，i18n表示国际化文件相对项目类路径 resources 的位置，login 表示多语言文件的前缀名。如果开发者完全按照 SpringBoot 默认识别机制，在项目类路径 resources 下编写 message.properties 等国际化文件，可以省略国际化文件基础名的设置。

3. **使用国际化属性**

   在 html页面中使用 `#{}` 引用国际化属性

```html
<title th:text="#{login.tip}">Signin Template for Bootstrap</title>

<h1 th:text="#{login.tip}">
    Please Sign in
</h1>
```

4. 中文乱码解决方案

   若在切换语言的过程中出现中文乱码，在 settings 设置 File Encoding 编码格式

![](三更SpringBoot(一).assets/22.png)



5. 在项目中定义区域解析器,在项目中创建名为 com.xxx.config 的包,并在该包下创建一个用于定制国际化功能区域信息解析器的自定义配置类 MyLocaResolver

```java
@Configuration
public class MyLocalResolver implements LocaleResolver{
    /**
    * 自定义区域解析方式
    * @param request
    * @return
    */
    @Override
    public Locale resolveLocale(HttpServletRequest request){
        // 获取页面手动切换传递的语言参数l
        String l = request.getParameter("l");
        // 获取请求头自动传递的语言参数Accept-Language
        String header = request.getHeader("Accept-Language");
        Local locale = null;
        // 如果手动切换参数不为空,就根据手动参数进行语言切换,否则默认根据请求头信息切换
        if(!StringUtils.isEmpty){
            // 拆分语言代码_国家代码
            String[] split = l.split("_");
            // 创建Locale对象
            locale = new Locale(split[0],split[1]);
        }else{
            // 拆分默认语言代码_国家代码
            String[] split = header.split(",");
            locale = new Locale(split[0],split[1]);
        }
        return locale;
    }
    
    @Override
    public void setLocale(HttpServletRequest request, HttpServletResponse response, Locale locale) {
        
    }
    
    // 将自定义的MyLocalResolver类重新注册为一个类型LocaleResolver的Bean组件
    @Bean
    public LocaleResolver localeResolver(){
        return new MyLocalResolver();
    }
}
```

上述代码中，MyLocalResovler 配置类实现类LocaleResolver接口，并重写了 LocaleResolver 接口的 resolveLocale() 方法解析自定义语言。使用`@Bean` 注解将当前配置类注册成Spring容器中的一个Bean组件。这样就可以覆盖默认的LocaleResolver组件。在重写 resolveLocale() 方法中，可以根据不同的需求切换语言信息从而获取请求的参数，只有请求参数不为空时，才可以进行语言切换。

最后，只需要修改login.html页面的"中文"、"English"超链接提交路径即可

```html
<a th:href="@{/login.html(l='zh_CN')}">中文</a>
<a th:href="@{/login.html(l='en_US')}">English</a>
```







# 3、SpringBoot全局异常处理

​	SpringBoot 默认的处理异常的机制，SpringBoot 默认的提供了一套处理异常的机制。一旦程序中出现了异常，SpringBoot 会向 /error 的 url 发送请求。在 SpringBoot 中提供了一个叫做 BasicExceptionController 来处理 /error 请求，然后跳转到默认显示异常的页面来显示异常信息。

​	在SpringBoot框架中，局部处理异常的方式与 SpringMVC 方式一致。实现全局异常的常用的方法有自定义错误页面和`@ControllerAdvice` 注解

## 3.1、自定义错误页面处理异常

在SpringBoot框架中，在浏览器输入不存在的请求地址会出现如下图的错误：

![](三更SpringBoot(一).assets/14.png)



上述的错误在SpringBoot开发中十分常见，虽然 SpringBoot 为我们提供了默认的错误页面映射，但是实际开发中，上图的错误页面对用户来说并不友好，所以我们需要自己来实现异常提示。

如果我们需要将所有的异常统一跳转到自定义的错误页面，需要在 src/main/resources/templates 目录下创建 error.html 页面，并且页面名称必须是 error。

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www/thymeleaf.org">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="libs/three.min.js"></script>
    <title>错误页面</title>
</head>

<body>
    <h1>
        错误页面！
    </h1>
</body>

</html>
```





## 3.2、@ControllerAdvice+@ExceptionHandler

在 SpringBoot 框架中，可以使用 `@ControllerAdvice` 注解和`@ExceptionHandler` 注解实现全局异常统一处理。@ControllerAdvice 注解用于标识某个类是控制器的切面类；@ExceptionHandler 注解用于标识在异常处理的方法上。如果要实现 Ajax 异常处理，可以使用 `@RestControllerAdvice` 注解,该注解用于标识某个类是控制器的切面类，支持 restful 风格及ajax返回json。

1. **定义GlobalException异常处理类**

   在项目中创建名为 com.manong.exception 的包,并在该包下定义 GlobalException 异常处理类，代码如下：

```java
@ControllerAdvice
public class GlobalException{
    
    @ExceptionHandler(value={Exception.class})
    public Object exceptionHandler(HttpServletRequest request,Exception e){
        ModelAndView modelandView = new ModelAndView();
        modelandView.addObject("exception",e.getMessage()); // 设置异常信息
        modelandView.addObject("url",request.getRequestURL()); //设置异常路径
        modelandView.setViewName("error"); //设置页面视图
        return modelAndView;
    }
}
```

2. **修改 error.html 页面**

   添加异常信息和异常路径显示：

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www/thymeleaf.org">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="libs/three.min.js"></script>
    <title>错误页面</title>
</head>

<body>
    <h1>
        错误页面！
    </h1>
    <h1>
        错误信息：<font color='red' th:text="${exception}"></font>
    </h1>
    <h1>
        错误信息：<font color='red' th:text="${url}"></font>
    </h1>
</body>

</html>
```

3. 测试

   编写控制器,测试web页面跳转的全局异常处理

```java
@RestController
public class HelloController{
    @RequestMapping("/hello")
    public String hello(){
        int i =  10/0;
        return "测试异常处理";
    }
}
```

在浏览器输入 http://localhost:8080/hello 测试，就会出现下图的错误

![](三更SpringBoot(一).assets/23.png)



## 3.3、兼容web与ajax

上方的注解只能处理普通请求，如果我们发起无刷新的 ajax 请求,则需要另外处理

1. **定义GlobalException异常处理类**

```java
@ControllerAdvice
public class GlobalException{
    
    @ExceptionHandler(value={Exception.class})
    public Object exceptionHandler(HttpServletRequest request,Exception e){
        ModelAndView modelandView = new ModelAndView();
        modelandView.addObject("exception",e.getMessage()); // 设置异常信息
        modelandView.addObject("url",request.getRequestURL()); //设置异常路径
        modelandView.setViewName("error"); //设置页面视图
        return modelAndView;
    }
    
    /**
    * 判断是否是ajax异步提交
    */
    public static boolean isAjax(HttpServletRequest httpRequest){
        return (httpRequest.getHeader("X-Requested-With") != null && "XMLHttpRequest".equals(httpRequest.getHeader("X-Requested-With").toString()));
    }
}
```

2. 编写控制器

```java
@RequestMapping("/ajaxexception")
public Object ajaxexception(){
    int i = 10/0;
    return true;
}
```

3. 编写测试页面

   在 static 目录下创建 test.html页面，发送ajax请求到控制器

```html
<script>
	$(function(){
      $.get
      $.get("/ajaxexception",function(data){
            if(!data.success){
                console.log("错误信息"+data.exception);
                console.log("错误路径"+data.url);
            }
    },"json");
      });
</script>
```

> 注意：在响应 ajax 形式的异常处理中，本案例仅在控制台打印输出异常信息和异常路径等，在实际开发中，需要将这些异常处理数据显示到页面中展示。











































