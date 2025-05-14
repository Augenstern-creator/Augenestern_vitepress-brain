

# 1、视图解析器🔥

如果我们经常需要跳转页面，并且页面所在的路径比较长，我们每次写完整路径会显的有点麻烦。我们可以配置视图解析器，设置跳转路径的前缀和后缀。这样可以简化我们的书写。

## 1.1、使用步骤🔥

1. **配置视图解析器**

   我们需要在SpringMVC容器中注入InternalResourceViewResolver对象。

   即在`spring-config.xml`中增添如下代码

```xml
<!--配置内部资源视图解析器-->
<bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
  <!--要求拼接的前缀-->  
  <property name="prefix" value="/WEB-INF/views/"></property>
  <!--要拼接的后缀-->  
  <property name="suffix" value=".jsp"></property>
</bean>
```

2. **页面跳转**

   视图解析器会在逻辑视图的基础上拼接得到物理视图。

   例如我们需要跳转的路径为：`/WEB-INF/views/test.jsp`

```java
@RequestMapping("/testJumpToJsp")
public String testJumpToJsp(){
//  return "/WEB-INF/views/test.jsp";
    return "test";
}
```

## 1.2、不进行前后缀拼接🔥

如果在配置了视图解析器的情况下，某些方法中并不想拼接前后缀去跳转。这种情况下我们可以在跳转路径前加**forward:** 或者**redirect:**进行标识。这样就不会进行前后缀的拼接了。

例如：

```java
@RequestMapping("/testJumpHtml")
public String testJumpHtml(){
    //如果加了forward:  或者redirect: 就不会进行前后缀的拼接
    return "forward:/hello1.html";
}
```

# 2、RestFul风格🔥

RestFul是一种网络应用程序的设计风格和开发方式 。现在很多互联网企业的网络**接口**定义都会符合其风格。

**主要规则如下**：

- 每一个URI代表1种资源     
- 客户端使用GET、POST、PUT、DELETE 4个表示操作方式的动词对服务端资源进行操作：
  - GET用来获取资源
  - POST用来新建资源
  - PUT用来更新资源
  - DELETE用来删除资源
- 简单参数例如id等写到url路径上  例如：
  - /user/1 HTTP GET：获取id=1的user信息      
  - /user/1 HTTP DELETE ：删除id=1的user信息    
- 复杂的参数转换成json或者xml（现在基本都是json）写到请求体中。



# 3、获取请求参数🔥

## 3.1、获取路径参数🔥

- RestFul风格的接口一些参数是在请求路径上的。类似： /user/1  这里的1就是id。

- 如果我们想获取这种格式的数据可以使用`@PathVariable`来实现。

### 3.1.1、@PathVariable范例一🔥

> 需求：要求定义一个RestFul风格的接口，该接口可以用来根据==id==查询用户。请求路径要求为==/user==，请求方式要求为==GET==，而请求参数id要写在请求路径上，例如  /user/1   这里的1就是id。

**我们可以定义如下方法，通过如下方式来获取路径参数**：

```java
@Controller
public class UserController {
    @RequestMapping(value = "/user/{id}",method = RequestMethod.GET)
    public String findUserById(@PathVariable("id") Integer id){
        System.out.println("findUserById");
        System.out.println(id);
        return "/success.jsp";
    }
}
```

此时我们请求路径：http://localhost:8080/user/1，则可获取到 id 的值为1



### 3.1.2、@PathVariable范例二🔥

> 需求：要求定义一个RestFul风格的接口，该接口可以根据**id**和**username**查询用户。请求路径要求为  **/user**  ，请求方式要求为**GET**。而请求参数id和name要写在请求路径上，例如  /user/1/zs   这里的1就是id，zs是name

**我们可以定义如下方法，通过如下方式来获取路径参数**：

```java
@Controller
public class UserController {
    @RequestMapping(value = "/user/{id}/{name}",method = RequestMethod.GET)
    public String findUser(@PathVariable("id") Integer id,@PathVariable("name") String name){
        System.out.println("findUser");
        System.out.println(id);		
        System.out.println(name);	
        return "/success.jsp";
    }
}
```

此时我们请求路径：http://localhost:8080/user/1/qxl，则可获取到 id 的值为1, name 的值为qxl



## 3.2、获取Json格式参数🔥

RestFul风格的接口一些比较复杂的参数会转换成Json通过请求体传递过来。这种时候我们可以使用`@RequestBody`注解获取请求体中的数据。

### 3.2.1、配置Jackson

SpringMVC 可以帮我们把 json 数据转换成我们需要的类型。但是需要进行一些基本配置。SpringMVC默认会使用jackson来进行json的解析。所以我们需要导入jackson的依赖。

- 在SpringMVC配置文件spring-config.xml中导入依赖
  - Jackson 是 SpringMVC 默认使用的 JSON 工具

```xml
<!-- jackson，帮助进行json转换-->
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.9.0</version>
</dependency>
```

- 还要配置注解驱动

```xml
<mvc:annotation-driven>
</mvc:annotation-driven>
```

### 3.2.2、@RequestBody范例一🔥

> 需求：要求定义个RestFul风格的接口，该接口可以用来新建用户。请求路径要求为  /user  ，请求方式要求为POST，用户数据会转换成json通过请求体传递。

请求体数据如下：

```json
{"name":"张团长","age":18}
```

#### 3.2.2.1、获取参数封装成实体对象🔥

如果我们想把Json数据获取出来封装User对象,我们可以这样定义方法：

```java
@Controller
public class UserController {
    @RequestMapping(value = "/user",method = RequestMethod.POST)
    public String insertUser(@RequestBody User user){
        System.out.println("insertUser");
        System.out.println(user);
        return "/success.jsp";
    }
}
```

User实体类如下：

```java
@Data				// get/set/重写方法 alt+7
@NoArgsConstructor	//无参构造
@AllArgsConstructor	//有参构造
public class User {
    private Integer id;
    private String name;
    private Integer age;
}
```

#### 3.2.2.2、获取参数封装成Map集合🔥

如果我们想把Json数据获取出来封装成Map集合,我们可以这样定义方法：

```java
@Controller
public class UserController {
    @RequestMapping(value = "/user",method = RequestMethod.POST)
    public String insertUser(@RequestBody Map map){
    System.out.println("insertUser");
    System.out.println(map);
    return "/success.jsp";
}
}
```

### 3.2.3、@RequestBody范例二

如果请求体传递过来的数据是一个User集合转换成的json，Json数据可以这样定义：

```json
[{"name":"章鱼1","age":14},{"name":"章鱼2","age":15},{"name":"章鱼3","age":16}]
```

#### 3.2.3.1、获取参数封装成List集合🔥

如果我们想把Json数据获取出来封装成List集合,我们可以这样定义方法：

```java
@Controller
public class UserController {
    @RequestMapping(value = "/users",method = RequestMethod.POST)
    public String insertUsers(@RequestBody List<User> users){
    System.out.println("insertUsers");
    System.out.println(users);
    return "/success.jsp";
    }
}
```

### 3.2.4、总结🔥

如果Json数据格式外边是大括号，那我们可以用对象或者Map集合来接收

如果Json数据格式外边是方括号，那我们可以用 List 集合或者数组来接收

### 3.2.5、注意事项🔥

如果需要使用**@RequestBody**来获取请求体中Json并且进行转换，要求请求头 Content-Type 的值要为： application/json 。

## 3.3、获取QueryString格式参数 🔥

- 如果接口的参数是使用QueryString的格式的话，我们也可以使用SpringMVC快速获取参数。

- 我们可以使用`@RequestParam`来获取QueryString格式的参数。



### 3.3.1、@RequestParam范例一🔥

> 要求定义个接口，该接口请求路径要求为  /testRequestParam，请求方式无要求。参数为id和name和likes。使用QueryString的格式传递。

#### 3.3.1.1、参数单独获取🔥

如果我们想把id，name，likes单独获取出来可以使用如下写法：

- 在方法中定义方法参数，方法参数名要和请求参数名一致，这种情况下我们可以省略`@RequestParam`注解。

```java
@RequestMapping("/testRquestParam")
public String testRquestParam(Integer id, String name, String[] likes){
    System.out.println("testRquestParam");
    System.out.println(id);
    System.out.println(name);
    System.out.println(Arrays.toString(likes));
    return "/success.jsp";
}
```

- 如果方法参数名和请求参数名不一致，我们可以加上`@RequestParam`注解例如：

```java
@RequestMapping("/testRquestParam")
public String testRquestParam(@RequestParam("id") Integer uid,@RequestParam("name") String name, @RequestParam("likes")String[] likes){
    System.out.println("testRquestParam");
    System.out.println(uid);
    System.out.println(name);
    System.out.println(Arrays.toString(likes));
    return "/success.jsp";
}
```



#### 3.3.1.2、获取参数封装成实体对象🔥

如果我们想把这些参数封装到一个User对象中可以使用如下写法：

- 注意：**获取参数封装成实体对象不需要加@RequestBody注解**

```java
@RequestMapping("/testRquestParam")
//获取参数封装成实体对象不需要加@RequestBody注解
public String testRquestParam(User user){
    System.out.println("testRquestParam");
    System.out.println(user);
    return "/success.jsp";
}
```

User类定义如下：

```java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private Integer id;
    private String name;
    private Integer age;
    private String[] likes;
}
```

测试时请求url如下：

```java
http://localhost:8080/testRquestParam?id=1&name=三更草堂&likes=编程&likes=录课&likes=LOL
```

**注意：实体类中的成员变量要和请求参数名对应上。并且要提供对应的set/get方法。**



## 3.4、相关注解其他属性🔥

### 3.4.1、required🔥

- 代表是否必须，默认值为true也就是必须要有对应的参数。如果没有就会报错。
- 如果对应的参数可传可不传则可以把去设置为fasle

例如：

```java
@RequestMapping("/testRquestParam")
public String testRquestParam(@RequestParam(value = "id",required = false) Integer uid,@RequestParam("name") Strcing name, @RequestParam("likes")String[] likes){
    System.out.println("testRquestParam");
    System.out.println(uid);
    System.out.println(name);
    System.out.println(Arrays.toString(likes));
    return "/success.jsp";
}
```

此时测试时请求uri如下：

```java
// 可以选择传id
http://localhost:8080/testRquestParam?id=1&name=三更草堂&likes=编程&likes=录课&likes=LOL
// 也可以选择不传id
http://localhost:8080/testRquestParam?name=三更草堂&likes=编程&likes=录课&likes=LOL
```

### 3.4.2、defaultValue🔥

如果对应的参数没有传参，我们可以用defaultValue属性设置默认值。

```java
@RequestMapping("/testRquestParam")
public String testRquestParam(@RequestParam(value = "id",required = false,defaultValue = "777") Integer uid,@RequestParam("name") String name, @RequestParam("likes")String[] likes){
    System.out.println("testRquestParam");
    System.out.println(uid);
    System.out.println(name);
    System.out.println(Arrays.toString(likes));
    return "/success.jsp";
}
```



# 4、类型转换器🔥

虽然我们前面在获取参数时看起来非常轻松，但是在这个过程中是有可能出现一些问题的。

例如，请求参数为success=1 我们期望把这个请求参数获取出来赋值给一个Boolean类型的变量。

这里就会涉及到  Stirng-——>Boolean的类型转换了。实际上SpringMVC中内置了很多类型转换器来进行类型转换。也有专门进行Stirng-——>Boolean类型转换的转换器**StringToBooleanConverter**。

如果是符合SpringMVC内置转换器的转换规则就可以很轻松的实现转换。但是如果不符合转换器的规则呢？

例如，请求参数为birthday=2004-12-12 我们期望把这个请求参数获取出来赋值给一个Date类型的变量。就不符合内置的规则了。内置的可以把 2004/12/12 这种格式进行转换。这种情况下我们就可以选择自定义类型转换。

​	在SpringMVC中，控制器获取Date类型的数据，如果格式是 yyyy-MM-dd 格式，控制器是无法正常获取这种 Date 类型数据的，需要对 Date 进行数据转换才能够正常获取 Date 类型数据。常用的数据转换方法有以下三种，分别是：

- 使用 `@DateTimeFormat` 注解
- 自定义类型转换器
- 使用 `@InitBinder` 注解

## 4.1、自定义类型转换器

#### ①创建类实现Converter接口

字符串String 到 日期类型Date 类型转换

~~~~java
public class StringToDateConverter implements Converter<String, Date> {
    public Date convert(String source) {
        return null;
    }
}
~~~~

#### ②实现convert方法

~~~~java
public class StringToDateConverter implements Converter<String, Date> {
    public Date convert(String source) {
        //String->Date   2005-12-12 
        Date date = null;
        try {
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
            date = simpleDateFormat.parse(source);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return date;
    }
}
~~~~

#### ③配置让SpringMVC使用自定义转换器

~~~~~xml
<!--解决响应乱码-->
<mvc:annotation-driven conversion-service="myConversionService">
    <mvc:message-converters>
        <bean class="org.springframework.http.converter.StringHttpMessageConverter">
            <constructor-arg value="utf-8"/>
        </bean>
    </mvc:message-converters>
</mvc:annotation-driven>

<!--注册自定义转换器-->
<bean class="org.springframework.context.support.ConversionServiceFactoryBean" id="myConversionService">
    <property name="converters">
        <set>
            <!--注入自定义类型转换器-->
            <bean class="com.sangeng.converter.StringToDateConverter"></bean>
        </set>
    </property>
</bean>
~~~~~



## 4.2、使用@DataTimeFormat注解



使用@DataTimeFormat注解实现数据转换，在实体类中的 Date 类型属性上使用该注解即可，可以自定义转换格式

```java
//pattern属性：指定转换格式
@DateTimeFormat(pattern = "yyyy-MM-dd")
private Date birthday;
```





# 5、响应体响应数据🔥

无论是RestFul风格还是我们之前web阶段接触过的异步请求，都需要把数据转换成Json放入响应体中。

## 5.1、数据放到响应体🔥

SpringMVC为我们提供了`@ResponseBody`来非常方便的把Json放到响应体中。

位置：类上或方法上(查看源码得知)

- 类上：此类中所有方法的返回值都放入响应体中
- 方法上：此方法的返回值放入响应体中

## 5.2、数据转换成Json🔥

SpringMVC可以把我们进行Json的转换，不过需要进行相应配置

### 5.2.1、配置🔥

1. **导入jackson依赖**

```xml
<!-- jackson，帮助进行json转换-->
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.9.0</version>
</dependency>
```

2. **开启mvc的注解驱动**

```xml
<mvc:annotation-driven></mvc:annotation-driven>
```

### 5.2.2、@ResponseBody范例一

- 只要把要转换的数据直接作为方法的返回值返回即可。
- SpringMVC会帮我们把返回值转换成json

> 要求定义个RestFul风格的接口，该接口可以用来根据id查询用户。请求路径要求为  /response/user  ，请求方式要求为GET。而请求参数id要写在请求路径上，例如   /response/user/1   这里的1就是id。要求获取参数id,去查询对应id的用户信息（模拟查询即可，可以选择直接new一个User对象），并且转换成json响应到响应体中。

```java
@Controller
@RequestMapping("/response")
public class ResponseController {
    @GetMapping("/user/{id}")
    @ResponseBody //将这方法的返回值放入响应体中
    public User testResponse(@PathVariable Integer id){
        User user = new User(id,null,null,null);
        return user;//因为做过json配置，所以会把返回值转换成json
    }
}

```



### 5.2.3、@ResponseBody范例二

> 要求定义个RestFul风格的接口，该接口可以查询所有用户。请求路径要求为  /response/user  ，请求方式要求为GET。去查询所有的用户信息（模拟查询即可，可以选择直接创建集合，添加几个User对象），并且转换成json响应到响应体中。

```java
@Controller
@RequestMapping("/response")
@ResponseBody  //此类中所有方法的返回值都会放到响应体中
public class ResponseController {

    @GetMapping("/user/{id}")
    public User testResponse(@PathVariable Integer id){
        User user = new User(id,null,null,null);
        return user;
    }

    @GetMapping("/user")
    public List<User> testResponse2(){
        List<User> list = new ArrayList<User>();
        list.add(new User(1,"三更",15,null));
        list.add(new User(2,"四更",16,null));
        list.add(new User(3,"五更",17,null));
        return list;
    }
}
```

此时`@ResponseBody` 加在类上，表示该类中的所有方法的返回值都会放到响应体中。并且转化为Json格式。

我们可以使用`@RestController`注解替换`@Controller`和`@ResponseBody`两个注解

```java
@RequestMapping("/response")
@RestController //相当于  @Controller+@ResponseBody
public class ResponseController {

    @GetMapping("/user/{id}")
    public User testResponse(@PathVariable Integer id){
        User user = new User(id,null,null,null);
        return user;
    }

    @GetMapping("/user")
    public List<User> testResponse2(){
        List<User> list = new ArrayList<User>();
        list.add(new User(1,"三更",15,null));
        list.add(new User(2,"四更",16,null));
        list.add(new User(3,"五更",17,null));
        return list;
    }
}
```

# 6、获取原生对象🔥

我们之前在web阶段我们经常要使用到request对象，response，session对象等。我们也可以通过SpringMVC获取到这些对象。（不过在MVC中我们很少获取这些对象，因为有更简便的方式，避免了我们使用这些原生对象相对繁琐的API。）

我们只需要在方法上添加对应类型的参数即可，但是注意数据类型不要写错了，SpringMVC会把我们需要的对象传给我们的形参。

例如：

```java
@Controller
public class RequestResponseController {
    @RequestMapping("/getReqAndRes")
    public String getReqAndRes(HttpServletRequest request, HttpServletResponse response, HttpSession session){
        System.out.println();
        return "test";
    }
}
```



# 7、获取请求头和Cookie🔥

## 7.1、获取请求头🔥

在方法中定义一个参数，参数前加上`@RequestHeader`注解，知道要获取的请求头名即可获取对应请求头的值。

例如：

想要获取 device-type 这个请求头则可以按照如下方式定义方法。

```java
@Controller
public class RequestResponseController {
    @RequestMapping("/getHeader")
    public String getHeader(@RequestHeader(value = "device-type") String deviceType){
        System.out.println(deviceType);
        return "test";
    }
}
```



## 7.2、获取Cookie🔥

在方法中定义一个参数，参数前加上`@CookieValue` 注解，知道要获取的cookie名即可获取对应cookie的值。

例如：

想要获取 JSESSIONID 的cookie值。则可以按照如下方式定义方法。

```java
@Controller
public class RequestResponseController {

    @RequestMapping("/getCookie")
    public String getCookie(@CookieValue("JSESSIONID") String sessionId){
        System.out.println(sessionId);
        return "test";
    }
}
```



# 8、JSP开发模式(了解)

如果我们使用JSP进行开发，那我们就需要在域中存数据，然后跳转到对应的JSP页面中，在JSP页面中获取域中的数据然后进行相关处理。

使用如果是类似JSP的开发模式就会涉及到**往域中存数据**和**携带数据跳转页面**的操作。

所以我们来看下如果用SpringMVC进行相关操作。



## 8.1、往Requet域存数据并跳转

### 8.1.1、使用Model

我们可以使用**Model**来往域中存数据。然后使用之前的方式实现页面跳转。

例如：

我们要求访问  **/testRequestScope** 这个路径时能往Request域中存name和title数据，然后跳转到 **/WEB-INF/page/testScope.jsp** 这个页面。在Jsp中获取域中的数据。

则可以使用如下写法：

```java
@Controller
public class JspController {
    @RequestMapping("/testRquestScope")
    public String testRquestScope(Model model){
        //往请求域存数据
        model.addAttribute("name","三更");
        model.addAttribute("title","不知名Java教程UP主");
        return "testScope";
    }
}
```



### 8.1.2、使用ModelAndView

我们可以使用**ModelAndView**来往域中存数据和页面跳转。

例如：

我们要求访问  **/testRequestScope2**  这个路径时能往域中存name和title数据，然后跳转到 **/WEB-INF/page/testScope.jsp** 这个页面。在Jsp中获取域中的数据。

则可以使用如下写法:

```java
@Controller
public class JspController {
    @RequestMapping("/testRquestScope2")
    public ModelAndView testRquestScope2(ModelAndView modelAndView){
        //往域中添加数据
        modelAndView.addObject("name","三更");
        modelAndView.addObject("title","不知名Java教程UP主");
        //页面跳转
        modelAndView.setViewName("testScope");
        return modelAndView;
    }
}
```

- **注意要把modelAndView对象作为方法的返回值返回**





## 8.2、从Request域中获取数据

我们可以使用`@RequestAttribute` 把他加在方法参数上，可以让SpringMVC帮我们从Request域中获取相关数据。

例如：

```java
@Controller
public class JspController {

    @RequestMapping("/testGetAttribute")
    public String testGetAttribute(@RequestAttribute("org.springframework.web.servlet.HandlerMapping.bestMatchingPattern")String value,HttpServletRequest request){
        System.out.println(value);
        return "testScope";
    }
}
```



## 8.3、 往Session域存数据并跳转

我们可以使用`@SessionAttributes`注解来进行标识，用里面的属性来标识哪些数据要存入Session域。

例如

我们要求访问  **/testSessionScope **这个路径时能往域中存**name**和**title**数据，然后跳转到 **/WEB-INF/page/testScope.jsp** 这个页面。在jsp中获取**Session域**中的数据。

位置：类上

则可以使用如下写法

```java
@Controller
@SessionAttributes({"name"})//表示name这个数据也要存储一份到session域中
public class JspController {


    @RequestMapping("/testSessionScope")
    public String testSessionScope(Model model){
        model.addAttribute("name","三更");
        model.addAttribute("title","不知名Java教程UP主");
        return "testScope";
    }
}
```

## 8.4、获取Session域中数据

我们可以使用`@SessionAttribute`**把他加在方法参数上，可以让SpringMVC帮我们从**Session域**中获取相关数据。

例如：

```java
@Controller
@SessionAttributes({"name"})
public class JspController {
    @RequestMapping("/testGetSessionAttr")
    public String testGetSessionAttr(@SessionAttribute("name") String name){
        System.out.println(name);
        return "testScope";
    }
}
```

































