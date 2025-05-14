# 

# 1、SpringBoot实现Web常用功能

​	通常在Web开发中，会涉及到静态资源的访问支持、视图解析器的配置、转换器和格式化的定制、文件上传和下载等功能，甚至还需要考虑web服务器关联的Servlet相关组件的定制。SpringBoot框架支持整合一些常用的Web技术，从而实现Web开发，并默认支持Web开发中的一些通用功能。



## 1.1、SpringMVC整合支持

​	为了简化Web开发，SpringBoot为一些常用的Web开发技术提供了整合支持，例如SpringMVC框架。使用SpringBoot在进行Web开发时，只需要引入对应的Web开发技术的依赖启动器即可。

​	在SpringBoot应用程序中，一旦引入了Web依赖启动器spring-boot-starter-web，那么SpringBoot整合SpringMVC框架默认实现的一些 xxxAutoConfiguration 自动配置类就会自动生效，几乎可以在无任何额外配置的情况下进行Web开发，SpringBoot为整合SpringMVC框架实现Web开发，主要提供了以下自动化配置功能特性：

1. 内置了两个视图解析器：ContentNegotiationViewResolver 和 BeanNameViewResolver
2. 支持静态资源以及WebJars
3. 自动注册了转换器和格式化器
4. 支持HTTP消息转换器
5. 支持静态项目首页 index.html
6. 支持定制应用图标 favicon.ico
7. 自动初始化Web数据绑定器 ConfigurableWebBindingInitializer



## 1.2、定制视图控制

​	==在SpringBoot项目中，页面放在 template 目录下是无法访问到的，必须通过控制器来跳转==。那么我们如果不想写控制器，也可以通过自定义MVC扩展类来实现。

​	使用SpringBoot整合SpringMVC进行Web开发，页面跳转可以通过自定义MVC扩展配置类的方式实现，自定义配置类需要继承 WebMvcConfigurationSupport类或实现 WebMvcConfigurer 接口，代码如下：

```java
/**
* 自定义MVC扩展类
*/
@Configuration
public class MyMVCConfig implements WebMvcConfigurer{
    /**
    * 添加视图管理
    * @param registry
    */
    @Override
    public void addViewControllers(ViewControllerRegistry registry){
        // 请求/login 或login.html 映射路径都会自动映射到 login.html页面
        registry.addViewController("/login").setViewName("login");
        registry.addViewController("/login.html").setViewName("login");
    }
}
```

上述代码中采用 addViewController() 方法实现视图管理器的注册，改方式相比传统的请求处理方法而言，这种方法更加简洁、直观和方便，但是使用这种方式跳转页面无法获取后台处理的数据，需要注意的是，addViewControllers() 方法定制视图控制，只适合比较简单的无参数视图Get方式的请求跳转，对于有参数或需要处理业务的请求，最好还是采用传统方式处理请求。

​	在SpringBoot2.0版本之前，使用WebMvcConfigurerAdapter类实现视图管理器注册，该类在SpringBoot2.0版本已经过时，推荐使用 WebMvcConfigurationSupport或者实现WebMvcConfigurer接口的方法实现功能扩展开发。

## 1.3、拦截器的使用

​	在SpringBoot整合SpringMVC进行Web开发，实现拦截器的配置与定制视图控制的方式一致，都是采用继承 `WebMvcConfigurationSupport` 类或者实现 `WebMvcConfigurer`接口的方式实现，使用 `addInterceptors()` 方法注册自定义拦截器。















# 2、文件上传与下载

​	在开发Web应用时，文件上传和下载是很常见的一个需求。浏览器通过表单形式将文件以流的形式传递给服务器，服务器再对上传的数据进行解析处理。下载文件通过 IO 流实现，大多数框架并没有对文件下载进行封装处理，并且文件下载时涉及不同浏览器的解析处理，可能会出现中文乱码的情况。

## 2.1、文件上传

 实现文件上传，需要满足三个要素。

- 首先表单提交方式必须是 POST
- 其次是表单需要设置 enctype 属性，且值为 `multipart/form-data`
- 最后表单需要设置一个文件域，也就是表单项 `type = "file"`

需要注意的是，SpringBoot并没有提供文件上传所需要的 jar 包或依赖，需要再项目中加入文件上传的相关 jar 包或 maven 依赖，代码如下所示：

```xml
<!--文件上传-->
<dependency>
    <groupId>commons-io</groupId>
    <artifactId>commons-io</artifactId>
    <version>2.6</version>
</dependency>
<dependency>
    <groupId>commons-fileupload</groupId>
    <artifactId>commons-fileupload</artifactId>
    <version>1.3.3</version>
</dependency>
```

1. 编写文件上传的表单页面

   在项目中的 resources/templates 目录创建一个名为 upload.html 页面

```html
<form th:action="@{/upload}" method="post" enctype="multipart/form-data">
	<div>
        <label>选择文件：</label>
        <input type="file" name="attach">
    </div>
    <div style="margin-top:20px">
        <input type="submit" value="确认上传">
    </div>
</form>
```

2. 在全局配置文件中添加文件上传的相关配置

   application.properties

```properties
#设置单个文件大小
spring.servlet.multipart.max-file-size=50MB
#设置总上传数据大小
spring.servlet.multipart.max-request-size=50MB

#自定义属性
#设置文件上传位置(绝对路径)
file.upload.path=E:/temp/
#设置文件上传后回显位置(相对路径)
file.upload.path.relative=/images/**
```

需要注意的是，通过 spring.servlet.multipart.max-file-size 属性设置单个上传文件的大小限制，默认1MB，通过 spring.servlet.multipart.max-request-size 属性设置所有上传文件的大小限制，默认为 10MB。开发过程中，需要结合实际需求合理设置文件大小。



3. 进行文件上传处理，实现文件上传功能

   在 controller 包下创建控制器

```java
@Controller
public class FileController{
    // 文件上传位置
    @Value("${file.upload.path}")
    private String filePath;
    
    /**
    * 向文件上传页面跳转
    * @return
    */
    @RequestMapping("/toUpload")
    public String toUpload(){
        return "upload";
    }
    
    
    /**
    * 文件上传
    * @param attach
    * @param model
    * @return
    */
    @RequestMapping("/upload")
    public String upload(MultipartFile attach,Model model){
        // 判断文件是否为空,不为空则进行文件上传
        if(!attach.isEmpty()){
            // 获取源文件名称
            String fileName = attach.getOriginalFilename();
            // 获取源文件后缀名
            String suffix = FilenameUtils.getExtension(fileName);
            // 使用UUID重命名文件名称
            String newFileName = UUID.randomUUID().toString().replace("-","")+(".")+suffix;
            // 使用日期解决同一文件夹中文件过多问题(以当前日期命名文件夹)
            String datePath = new SimpleDateFormat("yyyy-MM-dd").format(new Date());
            // 组装最终文件名
            String finalName = datePath+"/"+newFileName;
            // 构建文件对象
            File dest = new File(filePath + finalName);
            // 判断该文件夹是否存在,不存在则创建
            if(!dest.getParentFile().exists()){
                dest.getParentFile.mkdirs(); // 创建文件夹
            }
            try{
                // 将文件保存到硬盘
                attach.transferTo(dest);
                // 将当前图片放到模型中,便于页面回显
                model.addAttribute("image",finalName);
            }catch(IOException e){
                e.printStackTrace();
            }
        }
        // 返回页面(该页面是templates目录下的页面)
        return "show"
    }
}
```

如果上传的文件是图片，且需要在页面中将图片显示，则需要对图片进行数据回显，需要完成两个步骤，分别是：

1. 创建并编写图片回显页面

   在项目中的 resources/templates 目录下创建 show.html 页面，代码如下所示：

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>图片回显</title>
</head>
<body>
    <img th:src="@{/images/}+${image}"
</body>
</html>
```



2. 创建并编写文件上传配置类

   在项目中的 config 包下新建 UploadConfig 类

```java
@Configuration
public class UploadConfig implements WebMvcConfigurer{
    // 上传地址
    @Value("${file.upload.path}")
    private String filePath;
    
    // 显示相对地址
    @Value("${file.upload.path.relative}")
    private String fileRelativePath;
    
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry){
        // 读取本地文件需要加上 file:/
        registry.addResourceHandler(fileRelativePath).addResourceLoacation("file:/"+filePath;)
    }
}
```



## 2.2、文件下载

在Web开发中，文件下载能够通过IO流实现，所以多数框架并没有对文件下载进行封装处理。文件下载时涉及不同浏览器的解析处理，可能会出现中文乱码情况，并且不同浏览器之间的解析处理方式也会有所不同，例如谷歌和IE浏览器。

1. 添加文件下载依赖

   在 pom.xml 文件中引入文件下载的工具依赖 commons-io

```xml
<dependency>
    <groupId>commons-io</groupId>
    <artifactId>commons-io</artifactId>
    <version>2.6</version>
</dependency>
```

2. 创建文件下载页面

   在 resuources/templates 目录下创建 download.html 页面，代码如下：

```html
<h2>文件下载</h2>
<a href= "#" th:href="@{/download{filename='MyBatis.pdf'}}">文件下载(英文)</a>
<hr>
<a href= "#" th:href="@{/download{filename='SQL映射文件.pdf'}}">文件下载(中文)</a>
```

3. 创建控制器

   在 controller 包下创建 DownloadController 控制器

```java
```



# 3、SpringBoot应用的打包和部署

​	传统的Web应用进行打包部署时，通常会打成War包的形式，然后将War包部署到 Tomcat 等服务器中，而 SpringBoot 应用使用的是嵌入式Servlet容器。默认以 jar 包方式进行打包部署。

​	由于SpringBoot应用已经嵌入了Tomcat服务器，所以将SpringBoot应用以默认jar包形式进行打包部署则非常简便。

1. 创建 SpringBoot 应用程序时，打包方式设置为 jar

![](三更SpringBoot(三).assets/1.png)



2. 创建HelloController

```java
@RestController
public class HelloController{
    @GetMapping("/hello")
    public String hello(){
        return "Hello,SpringBoot";
    }
    
    @GetMapping("/index")
    public String index(){
        return "Hello,Spring MVC";
    }
}
```

3. 修改 Tomcat 端口号

   在 application.properties 全局配置文件中修改 Tomcat 端口的目的是避免多个 Spring Boot 同时运行导致端口冲突的异常。

```properties
#修改端口号
server.port = 8888
```

4. 添加springmvc支持及maven打包插件

```xml
<dependency>
	<groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

<build>
    <plugins>
    	<plugin>
        	<groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>
    </plugins>
</build>
```

5. 打开IDEA开发工具界面右侧边栏，单击右侧边框 Maven 视图，在对应项目目录选择 Lifecycle 下的 package 选项，双击运行即可

6. 打包完成可以使用IDEA开发工具提供的Terminal终端界面或者利用系统自带的终端窗口进行项目 jar 部署运行，运行命令如下：

```
java -jar jar包名称
java -jar springboot.jar
```

7. 启动成功后，我们进行测试： localhost:8888/hello









# 4、SpringBoot缓存管理

​	缓存是分布式系统中的重要组件，主要解决数据库数据的高并发访问，在实际开发中，尤其是用户访问量较大的网站，用户对高频热点数据的访问非常频繁，为了提高服务器的访问性能，减少数据库的压力、提高用户体验，使用缓存显得尤为重要。

​	Spring框架支持透明地向应用程序添加缓存并对缓存进行管理，其管理缓存的核心是将缓存应用于操作数据的方法中，从而减少操作数据的次数，同时不会对程序本身造成任何影响。

​	SpringBoot继承了Spring框架的缓存管理功能，通过使用 `@EnableCaching` 注解开启基于注解的缓存支持，SpringBoot可以启动缓存管理的自动化配置。

​	使用SpringBoot默认缓存的步骤如下所示：

1. 在项目启动器类上使用 `@EnableCaching` 注解开启基于注解的缓存支持。
2. 在 Service 类的查询方法上使用 `@Cacheable` 注解对数据操作方法进行缓存管理。

- 开启注解缓存支持

```java
@EnableCaching // 开启缓存配置
@SpringBootApplication
public class Springboot{
    public static void main(String[] args){
        SpringApplication.run(SpringBoot.class,args);
    }
}
```

- 使用 `@Cacheable` 注解进行缓存管理

  在Service类的查询方法上使用 `@Cacheable` 注解对数据操作方法进行缓存管理



```java
// 使用注解进行缓存管理
@Cacheable(cacheNames="user")
public User findById(Integer id){
    return userMapper.findById(id);
}
```

上述代码中，在 UserServiceImpl 实现类中的 findById() 方法上添加了缓存注解`@Cacheable`，该注解的作用是将查询结果 User 放在SpringBoot默认缓存中名称为 user 的命名空间中，对应缓存的唯一标识默认为方法的参数id的值。









# 获取请求体的Json格式参数

RestFul风格的接口一些比较复杂的参数会转换成Json通过请求体传递过来。这种时候我们可以使用`@RequestBody`注解获取请求体中的数据。

- SpringMVC 中我们还需要配置 jackson-databind 依赖，帮我们进行 json 转换
- **SpringBoot 的 web 启动器已经默认导入了 jackson 的依赖，不需要再额外导入依赖了。**







































