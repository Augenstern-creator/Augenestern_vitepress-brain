

# 1.拦截器

## 1.1 应用场景

​	在开发一个网站时可能有这样的需求：某些网页只希望几个特定的用户浏览。对于这样的访问权限控制，应该如何实现呢？拦截器就可以实现上述需求。Spring MVC框架提供了拦截器功能。

​	SpringMVC 的拦截器(Interceptor) 与 Servlet 的过滤器(filter) 类似，它主要用于拦截用户的请求并做相应的处理，通常应用在权限验证、记录请求信息的日志、判断用户是否登录等功能上。

​	如果我们想在多个Handler方法执行之前或者之后都进行一些处理，甚至某些情况下需要拦截掉，不让Handler方法执行。那么可以使用SpringMVC为我们提供的拦截器。



## 1.2 拦截器和过滤器的区别

过滤器是在Servlet执行之前或者之后进行处理。而拦截器是对Handler（处理器）执行前后进行处理。

- 归属不同： Filter属于Servlet技术， Interceptor属于SpringMVC技术
- 拦截内容不同： Filter对所有访问进行增强， Interceptor仅针对SpringMVC的访问进行增强  

如图：

![image-20210516215721896](传智springMVC(三).assets/1.png)



## 1.3 创建并配置拦截器

### 1.3.1、创建类实现HandlerInterceptor接口

~~~~java
public class MyInterceptor implements HandlerInterceptor {
}
~~~~

### 1.3.2、实现方法

~~~~java
public class MyInterceptor implements HandlerInterceptor {
    
    //在handler方法执行之前会被调用
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("preHandle");
        //返回值代表是否放行，如果为true则放行，如果为fasle则拦截，目标方法执行不到
        return true;
    }

    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        System.out.println("postHandle");
    }

    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        System.out.println("afterCompletion");
    }
}
~~~~

### 1.3.3、配置拦截器

~~~~xml
<!--配置拦截器-->
<mvc:interceptors>
    <!--开启具体的拦截器的使用，可以配置多个-->
    <mvc:interceptor>
        <!--
                配置拦截器要拦截的路径
                /*    代表当前一级路径，不包含子路径(表示拦截所有/开头的映射)
                /**   代表当前一级路径和多级路径，使用的更多(表示拦截所有映射)

                例如：
                    /test/*   这种会拦截下面这种路径/test/add  /test/delete
                              但是拦截不了多级路径的情况例如  /test/add/abc  /test/add/abc/bcd
                    /test/**  这种可以拦截多级目录的情况，无论    /test/add还是/test/add/abc/bcd 都可以拦截
        -->
        <mvc:mapping path="/**"/>
        <!--配置排除拦截的路径-->
        <mvc:exclude-mapping path="/"/>
        <!--配置拦截器对象注入springmvc容器-->
        <bean class="com.sangeng.interceptor.MyInterceptor"></bean>
    </mvc:interceptor>
</mvc:interceptors>
~~~~

## 1.4、拦截器配置项

```xml
<mvc:interceptors>
    <!--开启具体的拦截器的使用，可以配置多个-->
    <mvc:interceptor>
        <!--设置拦截器的拦截路径，支持*通配-->
        <!--/**         表示拦截所有映射-->
        <!--/*          表示拦截所有/开头的映射-->
        <!--/user/*     表示拦截所有/user/开头的映射-->
        <!--/user/add*  表示拦截所有/user/开头，且具体映射名称以add开头的映射-->
        <!--/user/*All  表示拦截所有/user/开头，且具体映射名称以All结尾的映射-->
        <mvc:mapping path="/*"/>
        <mvc:mapping path="/**"/>
        <mvc:mapping path="/handleRun*"/>
        <!--设置拦截排除的路径，配置/**或/*，达到快速配置的目的-->
        <mvc:exclude-mapping path="/b*"/>
        <!--指定具体的拦截器类-->
        <bean class="MyInterceptor"/>
    </mvc:interceptor>
</mvc:interceptors>
```



## 1.5、 拦截器方法及参数详解

- preHandle方法会在Handler方法执行之前执行，我们可以在其中进行一些前置的判断或者处理。
- postHandle方法会在Handler方法执行之后执行，我们可以在其中对域中的数据进行修改，也可以修改要跳转的页面。
- afterCompletion方法会在最后执行，这个时候已经没有办法对域中的数据进行修改，也没有办法修改要跳转的页面。我们在这个方法中一般进行一些资源的释放。

### 1.5.1、前置处理方法

~~~~java
    /**
     * 在handler方法执行之前会被调用
     * @param request 当前请求对象
     * @param response 响应对象
     * @param handler 相当于是真正能够处理请求的handler方法封装成的对象，对象中有这方法的相关信息
     * @return 返回值代表是否放行，如果为true则放行，如果为fasle则拦截，目标方法执行不到
     * @throws Exception
     */
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("preHandle");
        //返回值代表是否放行，如果为true则放行，如果为fasle则拦截，目标方法执行不到
        return true;
    }
~~~~

### 1.5.2、后置处理方法

~~~~java
    /**
     * postHandle方法会在Handler方法执行之后执行
     * @param request 当前请求对象
     * @param response 响应对象
     * @param handler 相当于是真正能够处理请求的handler方法封装成的对象，对象中有这方法的相关信息
     * @param modelAndView handler方法执行后的modelAndView对象，我们可以修改其中要跳转的路径或者是域中的数据
     * @throws Exception
     */
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        System.out.println("postHandle");
    }
~~~~

modelAndView：如果处理器执行完成具有返回结果，可以读取到对应数据与页面信息，并进行调整  

### 1.5.3、完成处理方法

拦截器最后执行的方法，无论原始方法是否执行 

~~~~java
    /**
     * afterCompletion方法会在最后执行
     * @param request 当前请求对象
     * @param response 响应对象
     * @param handler 相当于是真正能够处理请求的handler方法封装成的对象，对象中有这方法的相关信息
     * @param ex 异常对象
     * @throws Exception
     */
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        System.out.println("afterCompletion");
    }
~~~~

ex：如果处理器执行过程中出现异常对象，可以针对异常情况进行单独处理 

## 1.6 案例-登录状态拦截器

### 1.6.1需求

​	我们的接口需要做用户登录状态的校验，如果用户没有登录则跳转到登录页面，登录的情况下则可以正常访问我们的接口。

### 1.6.2 分析

​	怎么判断是否登录？

​			登录时往session写入用户相关信息，然后在其他请求中从session中获取这些信息，如果获取不到说明不是登录状态。

​	很多接口都要去写判断的代码，难道在每个Handler中写判断逻辑？

​			用拦截器，在拦截器中进行登录状态的判断。

​	登录接口是否应该进行拦截？

​			不能拦截

​	静态资源是否要进行拦截？

​			不能拦截

### 1.6.3 步骤分析

​	①登录页面，请求发送给登录接口

​	②登录接口中，校验用户名密码是否正确（模拟校验即可，先不查询数据库）。

​				如果用户名密码正确，登录成功。把用户名写入session中。

​	 ③定义其他请求的Handler方法

​	 ④定义拦截器来进行登录状态判断

​	 			如果能从session中获取用户名则说明是登录的状态，则放行

​				 如果获取不到，则说明未登录，要跳转到登录页面。

### 1.6.4 代码实现

##### 1.6.4.1 登录功能代码实现

###### 	①编写登录页面

~~~~html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <form method="post" action="/login">
        用户名：<input type="text" name="username">
        密码：<input type="password" name="password">
        <input type="submit">
    </form>
</body>
</html>
~~~~

###### 	②编写登录接口

​	接口中，校验用户名密码是否正确（模拟校验即可，先不查询数据库）。如果用户名密码正确，登录成功。把用户名写入session中。

~~~~java
@Controller
public class LoginController {

    @PostMapping("/login")
    public String longin(String username, String password, HttpSession session){
        //往session域中写入用户名用来代表登录成功
        session.setAttribute("username",username);
        return "/WEB-INF/page/success.jsp";
    }
}

~~~~



##### 1.6.4.2 登录状态校验代码实现

###### ①定义拦截器

~~~~java
public class LoginInterceptor implements HandlerInterceptor {
}
~~~~

###### ②重写方法，在preHandle方法中实现状态校验

~~~~java
public class LoginInterceptor implements HandlerInterceptor {

    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        //从session中获取用户名，判断是否存在
        HttpSession session = request.getSession();
        String username = (String) session.getAttribute("username");
        if(StringUtils.isEmpty(username)){
            //如果获取不到说明未登录 ，重定向跳转到登录页面
            String contextPath = request.getServletContext().getContextPath();
            response.sendRedirect(contextPath+"/static/login.html");
        }else{
            //如果获取到了，说明之前登录过。放行。
            return true;
        }
        return false;
    }
}
~~~~

###### ③配置拦截器

- ​	登录相关接口不应该拦截
- ​	静态资源不拦截

~~~~xml
    <mvc:interceptors>
        <mvc:interceptor>
            <!--要拦截的路径-->
            <mvc:mapping path="/**"/>
            <!--排除不拦截的路径-->
            <mvc:exclude-mapping path="/static/**"></mvc:exclude-mapping>
            <mvc:exclude-mapping path="/WEB-INF/page/**"></mvc:exclude-mapping>
            <mvc:exclude-mapping path="/login"></mvc:exclude-mapping>
            <bean class="com.sangeng.interceptor.LoginInterceptor"></bean>
        </mvc:interceptor>
    </mvc:interceptors>
~~~~



## 1.7、单个拦截器执行流程

![](传智springMVC(三).assets/2.png)

## 1.8、多拦截器执行顺序

​	如果我们配置了多个拦截器，拦截器的顺序是**按照配置的先后顺序**的。

​	这些拦截器中方法的执行顺序如图（**preHandler都返回true的情况下**）：

![image-20210517165433983](传智springMVC(三).assets/多拦截器执行顺序.png)

执行顺序为：

preHandle1、preHandle2、preHandle3

testPath

postHandle3、postHandle2、postHandle1

afterCompletion3、afterCompletion2、afterCompletion1

---

如果**拦截器3的preHandle方法返回值为false**。执行顺序如图：

![image-20210519213325101](传智springMVC(三).assets/多拦截器执行顺序2.png)

- ​	只有所有拦截器都放行了，postHandle方法才会被执行。
- ​	只有当前拦截器放行了，当前拦截器的afterCompletion方法才会执行。

执行顺序为：

preHandle1、preHandle2、preHandle3

afterCompletion2、afterCompletion1

# 2.统一异常处理

- 我们在实际项目中Dao层和Service层的异常都会被抛到Controller层。但是如果我们在Controller的方法中都加上异常的try...catch处理也会显的非常的繁琐。
- 所以SpringMVC为我们提供了统一异常处理方案。可以把Controller层的异常进行统一处理。这样既提高了代码的复用性也让异常处理代码和我们的业务代码解耦。
- SpringMVC统一异常处理有以下三种方式：
  - 使用`@ExceptionHandler ` 注解实现异常处理。
  - 使用Spring MVC 提供的简单异常处理器 `SimpleMappingExceptionResolver`
  - 实现 Spring 的异常处理接口 `HandlerExceptionResolver` 自定义自己的异常处理器。

## 2.1、局部异常处理@ExceptionHandler

局部异常处理，只能处理指定 Controller 中的异常，使用 `@Exception` 注解实现

```java
@RequestMapping("/user")
@Controller
public class UserController {
    
    @RequestMapping("/addUser")
    public String addUser(){
        //模拟异常
        int i = 10 / 0 ;
        return "success";
    }
    /**
    * 局部异常处理
    * @param ex
    * @param request
    * @return
    */
    //@ExceptionHandler(value = {RuntimeException.class})
    public String handlerException(RuntimeException ex, HttpServletRequest request){
        //将异常信息保存到Request作用域
        request.setAttribute("errorMessage",ex.getMessage());
        return "error";
    }
}
```

在 `WEB-INF/jsp` 目录下创建 error.jsp 页面，关键代码如下：

```html
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
<title>error</title>
</head>
<body>
	<h1>错误信息：${errorMessage}</h1>
</body>
</html>
```

使用局部处理异常，只能处理某个 Controller 中的异常，如果相对所有异常进行统一处理，则需要使用全局异常处理，全局异常可以使用 `SimpleMappingExceptionResolver` 或 `HandlerExceptionResolver` 来实现。



## 2.2、全局异常处理之HandlerExceptionResolver

全局异常处理可以使用 `HandlerExceptionResolver` 接口来实现。

### ①实现接口

~~~~java
public class MyHandlerExceptionResolver implements HandlerExceptionResolver {

}
~~~~



### ②重写方法

~~~~java
public class MyHandlerExceptionResolver implements HandlerExceptionResolver {
    
    //如果handler中出现了异常，就会调用到该方法，我们可以在本方法中进行统一的异常处理。
    public ModelAndView resolveException(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
        //获取异常信息，把异常信息放入域对象中
        String msg = ex.getMessage();
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.addObject("msg",msg);
        //跳转到error.jsp
        modelAndView.setViewName("/WEB-INF/page/error.jsp");
        return modelAndView;
    }
}

~~~~



### ③注入容器

​	可以使用注解注入也可以使用xml配置注入。这里使用注解注入的方式。在类上加**@Component**注解，注意要保证类能被组件扫描扫描到。

```xml
<!-- 注入全局异常处理类 -->
<bean class="com.bdqn.exception.MyHandlerExceptionResolver"/>
```



~~~~~java
@Component
public class MyHandlerExceptionResolver implements HandlerExceptionResolver {
	//....省略无关代码
}
~~~~~



## 2.3全局异常处理之SimpleMappingExceptionResolver

​	全局异常可以使用 `SimpleMappingExceptionResolver` 来实现，它将异常类名映射为视图名，即发生异常时使用对应的视图报告异常。

​	使用此方式无需自定义异常处理类，直接在 Spring MVC 配置文件中配置全局异常处理即可，代码如下所示：

```xml
<!-- 注入全局异常处理类 -->
<bean class="org.springframework.web.servlet.handler.SimpleMappingExceptionResolver">
    <property name="exceptionMappings">
        <props>
            <!-- 运行时异常 -->
            <prop key="java.lang.RuntimeException">error</prop>
        </props>
    </property>
</bean>
```

在上述配置中，当控制器发生 `RuntimeException` 异常时，使用 `error` 视图进行异常信息显示，在页面中使用 `${exception.message} `来进行异常信息的显示。



## 2.4、注解开发异常处理器（重要）

#### ①创建类加上@ControllerAdvice注解进行标识

~~~~java
@ControllerAdvice
public class MyControllerAdvice {

}
~~~~



### ②定义异常处理方法	

​	定义异常处理方法，使用**@ExceptionHandler**标识可以处理的异常。

~~~~java
@ControllerAdvice
public class MyControllerAdvice {

    @ExceptionHandler({NullPointerException.class,ArithmeticException.class})
    public ModelAndView handlerException(Exception ex){
        //如果出现了相关的异常，就会调用该方法
        String msg = ex.getMessage();
        ModelAndView modelAndView = new ModelAndView();
        //把异常信息存入域中
        modelAndView.addObject("msg",msg);
        //跳转到error.jsp
        modelAndView.setViewName("/WEB-INF/page/error.jsp");
        return modelAndView;
    }
}
~~~~



### ③注入容器

​	可以使用注解注入也可以使用xml配置注入。这里使用注解注入的方式。在类上加**@Component**注解，注意要保证类能被组件扫描扫描到。

~~~~java
@ControllerAdvice
@Component
public class MyControllerAdvice {
	//省略无关代码
}
~~~~



## 2.5、注解详解

### 2.5.1、@ControllerAdvice

使用注解实现异常分类管理

- 名称： `@ControllerAdvice`
- 类 型： 类注解
- 位置：异常处理器类上方
- 作用：设置当前类为异常处理器类
- 范例：

```java
@Component
@ControllerAdvice
public class MyControllerAdvice {

} 
```

### 2.5.2、@ExceptionHandler

- 名称： `@ExceptionHandler`
- 类型： 方法注解
- 位置：异常处理器类中针对指定异常进行处理的方法上方
- 作用：设置指定异常的处理方式
- 说明：处理器方法可以设定多个
- 范例：

```java
@ExceptionHandler(Exception.class)
public String doOtherException(Exception ex){
    return "出错啦，请联系管理员！ ";
}  
```



## 2.6、总结

​	我们在实际项目中一般会选择使用@ControllerAdvice 来进行异常的统一处理。

​	因为如果在前后端不分离的项目中，异常处理一般是跳转到错误页面，让用户有个更好的体验。而前后端分离的项目中，异常处理一般是把异常信息封装到Json中写入响应体。无论是哪种情况，使用@ControllerAdvice的写法都能比较方便的实现。

​	例如下面这种方式就是前后端分离的异常处理方案，把异常信息封装到对 象中，转换成json写入响应体。

~~~~java
@ControllerAdvice
@Component
public class MyControllerAdvice {

    @ExceptionHandler({NullPointerException.class,ArithmeticException.class})
    @ResponseBody
    public Result handlerException(Exception ex){
        Result result = new Result();
        result.setMsg(ex.getMessage());
        result.setCode(500);
        return result;
    }
}

~~~~



# 3.文件上传

## 3.1 文件上传三要素

- Http协议规定了我们在进行文件上传时的请求格式要求。
- 表单项 `type = "file"`
- 表单的提交方式是`post`
- 表单的`enctype` 属性是多部份表单形式，及 `enctype = "multipart/form-data"`

### 3.1.1、请求方式为POST请求

​	如果是使用表单进行提交的话，可以把form标签的**method**属性设置为**POST**。例如:

~~~~html
<form action="/upload" method="post">

</form>
~~~~

### 3.1.2、请求头**Content-Type**必须为**multipart/form-data**

​	如果是使用表单的话可以把表单的**entype**属性设置成**multipart/form-data**。例如：

~~~~html
<form action="/upload" method="post" enctype="multipart/form-data">

</form>
~~~~

## 3.2、SpringMVC接收上传过来的文件

​	SpringMVC使用commons-fileupload的包对文件上传进行了封装，我们只需要引入相关依赖和进行相应配置就可以很轻松的实现文件上传的功能。

### 3.2.1、导入依赖

~~~~xml
<!--commons文件上传，如果需要文件上传功能，需要添加本依赖-->
<dependency>
    <groupId>commons-fileupload</groupId>
    <artifactId>commons-fileupload</artifactId>
    <version>1.4</version>
</dependency>
~~~~

### 3.2.2、配置文件上传解析器

SpringMVC容器中配置文件上传解析器

~~~~xml
<!--
        文件上传解析器
        注意：id 必须为 multipartResolver
    -->
<bean id="multipartResolver" class="org.springframework.web.multipart.commons.CommonsMultipartResolver">
    <!-- 设置默认字符编码 -->
    <property name="defaultEncoding" value="utf-8"/>
    <!-- 一次请求上传的文件的总大小的最大值，单位是字节 100MB-->
    <property name="maxUploadSize" value="#{1024*1024*100}"/>
    <!-- 每个上传文件大小的最大值，单位是字节 50MB-->
    <property name="maxUploadSizePerFile" value="#{1024*1024*50}"/>
</bean>
~~~~



### 3.2.3、接收上传的文件数据并处理

上传表单

~~~~html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <form action="/upload" method="post" enctype="multipart/form-data">
        <input type="file" name="uploadFile">
        <input type="submit">
    </form>
</body>
</html>
~~~~

~~~~java
@Controller
public class UploadController {

    @RequestMapping("/upload")
    public String upload(MultipartFile uploadFile) throws IOException {
        //文件存储 把上传上来的文件存储下来
        uploadFile.transferTo(new File("test.sql"));
        return "/success.jsp";
    }
}
~~~~

注意：**方法参数名要和提交上来的表单参数名一致**。



## 3.3、MultipartFile常见用法

- 获取上传文件的原名

  ~~~~java
  uploadFile.getOriginalFilename()
  ~~~~

- 获取文件类型的MIME类型

  ~~~~java
  uploadFile.getContentType()
  ~~~~

- 获取上传文件的大小

  ~~~~java
  uploadFile.getSize()
  ~~~~

- 获取对应上传文件的输入流

  ~~~~java
  uploadFile.getInputStream()
  ~~~~

  

## 3.4、文件上传注意事项

1. 文件命名问题， 获取上传文件名，并解析文件名与扩展名
2. 文件名过长问题
3. 文件保存路径
4. 重名问题

```java
@RequestMapping(value = "/fileupload")
//参数中定义MultipartFile参数，用于接收页面提交的type=file类型的表单，要求表单名称与参数名相同
public String fileupload(MultipartFile file,MultipartFile file1,MultipartFile file2, HttpServletRequest request) throws IOException {
    //首先判断是否是空文件，也就是存储空间占用为0的文件
    if(!file.isEmpty()){
        //如果大小在范围要求内正常处理，否则抛出自定义异常告知用户（未实现）
        //获取原始上传的文件名，可以作为当前文件的真实名称保存到数据库中备用
        String fileName = file.getOriginalFilename();
        //设置保存的路径
        String realPath = request.getServletContext().getRealPath("/images");
        //保存文件的方法，指定保存的位置和文件名即可，通常文件名使用随机生成策略产生，避免文件名冲突问题
        file.transferTo(new File(realPath,file.getOriginalFilename()));
    }
    //测试一次性上传多个文件
    if(!file1.isEmpty()){
        String fileName = file1.getOriginalFilename();
        //可以根据需要，对不同种类的文件做不同的存储路径的区分，修改对应的保存位置即可
        String realPath = request.getServletContext().getRealPath("/images");
        file1.transferTo(new File(realPath,file1.getOriginalFilename()));
    }
    if(!file2.isEmpty()){
        String fileName = file2.getOriginalFilename();
        String realPath = request.getServletContext().getRealPath("/images");
        file2.transferTo(new File(realPath,file2.getOriginalFilename()));
    }
    return "page.jsp";
}
```





# 4.文件下载

## 4.1 文件下载要求

​	如果我们想提供文件下载的功能。HTTP协议要求我们的必须满足如下规则。

### ①设置响应头Content-Type

​	要求把提供下载文件的MIME类型作为响应头Content-Type的值

### ②设置响应头Content-disposition

​	要求把文件名经过URL编码后的值写入响应头Content-disposition。但是要求符合以下格式，因为这样可以解决不同浏览器中文文件名 乱码问题。

~~~~java
Content-disposition: attachment; filename=%E4%B8%8B%E6%B5%B7%E5%81%9Aup%E4%B8%BB%E9%82%A3%E4%BA%9B%E5%B9%B4.txt;filename*=utf-8''%E4%B8%8B%E6%B5%B7%E5%81%9Aup%E4%B8%BB%E9%82%A3%E4%BA%9B%E5%B9%B4.txt
~~~~

### ③文件数据写入响应体中

## 4.2 代码实现

​	我们可以使用之前封装的下载工具类实现文件下载

工具类代码：

~~~~java
import javax.servlet.ServletContext;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.net.URLEncoder;

public class DownLoadUtils {
    /**
     * 该方法可以快速实现设置两个下载需要的响应头和把文件数据写入响应体
     * @param filePath 该文件的相对路径
     * @param context  ServletContext对象
     * @param response
     * @throws Exception
     */
    public static void downloadFile(String filePath, ServletContext context, HttpServletResponse response) throws Exception {
        String realPath = context.getRealPath(filePath);
        File file = new File(realPath);
        String filename = file.getName();
        FileInputStream fis = new FileInputStream(realPath);
        String mimeType = context.getMimeType(filename);//获取文件的mime类型
        response.setHeader("content-type",mimeType);
        String fname= URLEncoder.encode(filename,"UTF-8");
        response.setHeader("Content-disposition","attachment; filename="+fname+";"+"filename*=utf-8''"+fname);
        ServletOutputStream sos = response.getOutputStream();
        byte[] buff = new byte[1024 * 8];
        int len = 0;
        while((len = fis.read(buff)) != -1){
            sos.write(buff,0,len);
        }
        sos.close();
        fis.close();
    }
}

~~~~



Handler方法定义

~~~~java
@Controller
public class DownLoadController {

    @RequestMapping("/download")
    public void download(HttpServletRequest request, HttpServletResponse response) throws Exception {
        //文件下载
        DownLoadUtils.downloadFile("/WEB-INF/file/下海做UP主那些年.txt",request.getServletContext(),response);
    }
}
~~~~





# 5.SpringMVC执行流程

​	因为我们有两种开发模式，我们分别来讲解两种模式在SpringMVC中的执行流程。

​	一种是类似JSP的开发流程:

​					 把数据放入域对象中，然后进行页面跳转。

​	另外一种是前后端分离的开发模式，这也是目前市场上主流的模式：

​					 把数据转化为json放入响应体中。

​	完整流程图如下：

![image-20210519191100685](传智springMVC(三).assets/SpringMVC执行流程.png)

## 5.1 类JSP开发模式执行流程

​	1.用户发送请求至前端控制器DispatcherServlet。

​	2.DispatcherServlet收到请求调用HandlerMapping处理器映射器。DispatchServlet通过HandlerMapping根据具体的请求查找能处理这个请求的Handler。**（HandlerMapping主要是处理请求和Handler方法的映射关系的）**

​	3.HandlerMapping处理器映射器返回一个能够处理请求的执行链给DispatchServlet，这个链中除了包含Handler方法也包含拦截器。

​	4.DispatchServlet拿着执行链去找HandlerAdater执行链中的方法。

​	5.HandlerAdater会去执行对应的Handler方法，把数据处理转换成合适的类型然后作为方法参数传入 

​	6.Handler方法执行完后的返回值会被HandlerAdapter转换成ModelAndView类型。**（HandlerAdater主要进行Handler方法参数和返回值的处理。）**

​	7.返回ModelAndView给DispatchServlet.

​	8.如果对于的ModelAndView对象不为null，则DispatchServlet把ModelAndView交给 ViewResolver 也就是视图解析器解析。

​	9.ViewResolver 也就是视图解析器把ModelAndView中的viewName转换成对应的View对象返回给DispatchServlet。**（ViewResolver 主要负责把String类型的viewName转换成对应的View对象）**

​	10.DispatchServlet使用View对象进行页面的展示。

## 5.2 前后端分离开发模式执行流程

​	前后端分离的开发模式中我们会使用@ResponseBody来把数据写入到响应体中。所以不需要进行页面的跳转。

故流程如下：

​	1.用户发送请求至前端控制器DispatcherServlet。

​	2.DispatcherServlet收到请求调用HandlerMapping处理器映射器。DispatchServlet通过HandlerMapping根据具体的请求查找能处理这个请求的Handler。**（HandlerMapping主要是处理请求和Handler方法的映射关系的）**

​	3.HandlerMapping处理器映射器返回一个能够处理请求的执行链给DispatchServlet，这个链中除了包含Handler方法也包含拦截器。

​	4.DispatchServlet拿着执行链去找HandlerAdater执行链中的方法。

​	5.HandlerAdater会去执行对应的Handler方法，把数据处理转换成合适的类型然后作为方法参数传入 

​	6.Handler方法执行完后的返回值会被HandlerAdapter转换成ModelAndView类型。由于使用了@ResponseBody注解，返回的ModelAndView会为null ，并且HandlerAdapter会把方法返回值放到响应体中。**（HandlerAdater主要进行Handler方法参数和返回值的处理。）**

​	7.返回ModelAndView给DispatchServlet。

​	8.因为返回的ModelAndView为null,所以不用去解析视图解析和其后面的操作。

 
