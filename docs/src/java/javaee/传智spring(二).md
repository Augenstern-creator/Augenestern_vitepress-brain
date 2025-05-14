# 1、面向切面编程AOP

什么是AOP?

- AOP：Aspect Oriented Programming 的缩写，意思为==面向切面编程==，是通过预编译方式和运行期动态代理实现程序功能的统一维护的一种技术。
- AOP 是 OOP 的延续，是软件开发中的一个热点，也是Spring框架中的一个重要内容，是函数式编程的一种衍生范型。
- **利用AOP可以对业务逻辑的各个部分进行隔离，从而使得业务逻辑各部分之间的耦合度降低，提高程序的可重用性，同时提高了开发的效率。**
- **SpringAOP:  批量对Spring容器中bean的方法做增强，并且这种增强不会与原来方法中的代码耦合。**

## 1.1、AOP的作用及其优势

作用：在程序运行期间，在不修改源码的情况下对方法进行功能增强

优势：减少重复代码，提高开发效率，并且便于维护

## 1.2、AOP的底层实现

实际上，AOP 的底层是通过 Spring 提供的动态代理技术实现的。在运行期间，Spring 通过动态代理技术动态的生成代理对象，代理对象方法执行时进行增强功能的介入，再去调用目标对象的方法，从而完成功能的增强。

## 1.3、AOP的动态代理技术

常用的动态代理技术：

- JDK 代理：基于接口的动态代理技术
- cglib 代理：基于父类的动态代理技术

### 1.3.1、JDK动态代理

了解即可，这是底层的代码逻辑

1. 目标类接口

```java
public interface TargetInterface {
    public void save();
}
```

2. 目标类

```java
public class Target implements TargetInterface{
    @Override
    public void save() {
        System.out.println("save running....");
    }
}
```

3. 增强方法

```java
/**
 * 增强方法
 */
public class Advice {
    public void before(){
        System.out.println("前置增强...");
    }
    public void after(){
        System.out.println("后置增强...");
    }
}
```

4. 代理测试类

```java
/**
 * proxy代理测试类
 */
public class ProxyTest {
    public static void main(String[] args) {
        //创建目标对象
        Target target = new Target();
        //增强对象
        Advice advice = new Advice();
        // 返回值,就是动态生成的代理对象
        TargetInterface proxy = (TargetInterface) Proxy.newProxyInstance(
                target.getClass().getClassLoader(), //目标对象类加载器
                target.getClass().getInterfaces(),//目标对象相同的接口字节码对象数组
                new InvocationHandler() {
                    //调用代理对象的任何方法,实质执行的都是invoke方法
                    @Override
                    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                        //前置增强
                        advice.before();
                        Object invoke = method.invoke(target, args);//执行目标方法
                        //后置增强
                        advice.after();
                        return invoke;
                    }
                }
        );
        // 调用代理对象的方法
        proxy.save();
    }
}
```

![image-20210715112437191](传智spring(二).assets/image-20210715112437191.png)



### 1.3.2、cglib动态代理

这里同jdk动态代理一样，只需了解即可。

## 1.4、AOP相关概念

Spring的AOP实现底层就是对上面的动态代理的代码进行了封装，封装后我们只需要对需要关注的部分进行代码编写，并通过配置的方式完成指定目标的方法增强。

常用AOP的术语如下：

- `Target` ：被增强的对象就是目标对象
- `Proxy` ：代理，一个类被 AOP 增强后，就产生一个结果代理类
- `Joinpoint` ：所谓连接点是指那些可以被增强到的点。在spring中,这些点指的是方法
  - **就是可以被增强的方法叫做连接点**

- `Pointcut` ：所谓切入点是指我们要对哪些 `Joinpoint` 进行拦截的定义
  - **所谓切入点是指被增强的连接点（方法）**
- `Advice` ：通知/增强，所谓通知是指具体增强的代码
- `Aspet` ：切面，**是切入点和通知（引介）的结合**
- `Weaving` ：织入，是指把增强应用到目标对象来创建新的代理对象的过程。



## 1.5、AOP开发明确的事项

1. 需要编写的内容

   - 业务核心业务代码(目标类的目标方法)
   - 编写切面类，切面类中有通知(增强功能方法)
   - 在配置文件中，配置织入关系，即将哪些通知与哪些连接点进行结合

2. AOP技术实现的内容 

   Spring 框架监控切入点方法的执行。一旦监控到切入点方法被运行，使用代理机制，动态创建目标对象的代理对象，根据通知类别，在代理对象的对应位置，将通知对应的功能织入，完成完整的代码逻辑运行。

3. AOP底层使用哪种代理方式

   在 spring 中，框架会根据目标类是否实现了接口来决定采用哪种动态代理的方式。

# 2、基于XML的AOP开发

1. 导入AOP相关坐标

```xml
<!--SpringIOC相关依赖-->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
    <version>5.0.5.RELEASE</version>
</dependency>
<!--AOP相关依赖-->
<dependency>
    <groupId>org.aspectj</groupId>
    <artifactId>aspectjweaver</artifactId>
    <version>1.8.4</version>
</dependency>
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-test</artifactId>
    <version>5.0.2.RELEASE</version>
</dependency>
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.12</version>
</dependency>
```

2. 创建目标接口和目标类(内部有切点)

```java
public interface TargetInterface{
    public void method();
}
```

```java
public class Target implements TargetInterface {
    @Override
    public void method(){
        System.out.println("Target running...");
    }
}
```

3. 创建切面类(内部有增强方法)

```java
public class MyAspect {
    // 前置增强方法
    public void before(){
        System.out.println("前置代码增强....");
    }
}
```

4. 将目标类和切面类的对象创建权交给 spring

```xml
<!--配置目标类-->
<bean id="target" class="com.itheima.aop.Target"></bean>
<!--配置切面类-->
<bean id="myAspect" class="com.itheima.aop.MyAspect"></bean>
```

5. 在 applicationContext.xml 中配置织入关系
   - 导入aop命名空间
   - 配置切点表达式和前置增强的织入关系

![image-20210715191828865](传智spring(二).assets/image-20210715191828865.png)

```xml
<!--配置织入:告诉spring框架,哪些方法(切点)需要进行哪些增强(前置增强、后置增强、...)-->
<aop:config>
<!--引用myAspect的Bean为切面对象-->
    <aop:aspect ref="myAspect">
        <!--配置Target的method方法执行时要进行myAspect的before方法前置增强-->
        <aop:before 
                    method="before" 
                    pointcut="execution(public void com.itheima.aop.Target.method())">		</aop:before>
    </aop:aspect>


</aop:config>
```

6. 测试

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:applicationContext.xml")
public class AopTest {
    @Autowired
    private TargetInterface target;

    @Test
    public void test1(){
        target.save();
    }
}
```

![image-20210715192715164](传智spring(二).assets/image-20210715192715164.png)



## 2.1、AOP配置

### 2.1.1、aop:config

- 名称：`aop:config`

- 类型：**标签**

- 归属：beans标签

- 作用：**设置AOP：设置当前类为切面类**

- 格式：

  ```xml
  <beans>
      <aop:config>……</aop:config>
      <aop:config>……</aop:config>
  </beans>
  ```

- 说明：一个beans标签中可以配置多个aop:config标签



### 2.1.2、aop:aspect

- 名称：`aop:aspect`

- 类型：**标签**

- 归属：aop:config标签

- 作用：**设置具体的AOP通知对应的切入点**

- 格式：

  ```xml
  <aop:config>
      <aop:aspect ref="beanId">……</aop:aspect>
      <aop:aspect ref="beanId">……</aop:aspect>
  </aop:config>
  ```

- 说明：

  一个aop:config标签中可以配置多个aop:aspect标签

- 基本属性：

  - ref ：通知所在的bean的id



### 2.1.3、aop:pointcut

- 名称：`aop:pointcut`

- 类型：**标签**

- 归属：aop:config标签、aop:aspect标签

- 作用：**设置切入点**

- 格式：

  ```xml
  <aop:config>
      <aop:pointcut id="pointcutId" expression="……"/>
      <aop:aspect>
          <aop:pointcut id="pointcutId" expression="……"/>
      </aop:aspect>
  </aop:config>
  ```

- 说明：

  一个aop:config标签中可以配置多个aop:pointcut标签，且该标签可以配置在aop:aspect标签内

- 基本属性：

  - `id` ：识别切入点的名称

  - `expression` ：切入点表达式

## 2.1、切点表达式

**切入点**：

- 切入点描述的是某个方法

- 切入点表达式是一个快速匹配方法描述的通配格式，类似于正则表达式

**表达式语法**：

```java
execution([修饰符] 返回值类型 包名.类名.方法名(参数))
execution(public void com.itheima.aop.Target.save())
```

- 访问修饰符可以省略
- 返回值类型、包名、类名、方法名可以使用星号 * 代表任意
- 包名和类名之间一个点 . 代表当前包下的类，两个点 .. 表示当前包及其子包下的类
- 参数列表可以使用两个点 .. 表示任意个数，任意类型的参数列表

- `*`：单个独立的任意符号，可以独立出现，也可以作为前缀或者后缀的匹配符出现

  ```xml
  execution（public * com.itheima.*.UserService.find*（*））
  ```

​	匹配com.itheima包下的任意包中的UserService类或接口中所有find开头的带有一个参数的方法

- `..` ：多个连续的任意符号，可以独立出现，常用于简化包名与参数的书写

  ```xml
  execution（public User com..UserService.findById（..））
  ```

​	匹配com包下的任意包中的UserService类或接口中所有名称为findById的方法

例如：

```java
execution(* com.sangeng.service.*.*(..))   表示com.sangeng.service包下任意类，方法名任意，参数列表任意，返回值类型任意
   
execution(* com.sangeng.service..*.*(..))   表示com.sangeng.service包及其子包下任意类，方法名任意，参数列表任意，返回值类型任意
    
execution(* com.sangeng.service.*.*())     表示com.sangeng.service包下任意类，方法名任意，要求方法不能有参数，返回值类型任意
    
execution(* com.sangeng.service.*.delete*(..))     表示com.sangeng.service包下任意类，要求方法不能有参数，返回值类型任意,方法名要求以delete开头
```



## 2.2、通知的类型

通知的配置语法：

```xml
<aop:通知类型 method="切面类中方法名" pointcut="切点表达式"></aop:通知类型>
```

| 名称         | 标签                    | 说明                                                         |
| ------------ | ----------------------- | ------------------------------------------------------------ |
| 前置通知     | `<aop:before>`          | 用于配置前置通知。指定增强的方法在切入点方法之前执行         |
| 后置通知     | `<aop:after-returning>` | 用于配置后置通知。指定增强的方法在切入点方法之后执行         |
| 环绕通知     | `<aop:around>`          | 用于配置环绕通知。指定增强的方法在切入点方法之前和之后都执行 |
| 异常抛出通知 | `<aop:throwing>`        | 用于配置异常抛出通知。指定增强的方法在出现异常时执行         |
| 最终通知     | `<aop:after>`           | 用于配置最终通知。无论增强方式执行是否有异常都会执行         |



### 2.2.1、aop：before

- 名称：`aop:before`

- 类型：**标签**

- 归属：aop:aspect标签

- 作用：**设置前置通知**

- 格式：

  ```xml
  <aop:aspect ref="adviceId">
      <aop:before method="methodName" pointcut="……"/>
  </aop:aspect>
  ```

- 说明：一个aop:aspect标签中可以配置多个aop:before标签

- 基本属性：

  - `method` ：在通知类中设置当前通知类别对应的方法
  - `pointcut `：设置当前通知对应的切入点表达式，与pointcut-ref属性冲突
  - `pointcut-ref `：设置当前通知对应的切入点id，与pointcut属性冲突



### 2.2.2、aop:after-returning

- 名称：`aop:after-returning`

- 类型：**标签**

- 归属：aop:aspect标签

- 作用：设置返回后通知

- 格式：

  ```xml
  <aop:aspect ref="adviceId">
      <aop:after-returning method="methodName" pointcut="……"/>
  </aop:aspect>
  ```

- 说明：一个aop:aspect标签中可以配置多个aop:after-returning标签

- 基本属性：

  - `method` ：在通知类中设置当前通知类别对应的方法

  - `pointcut `：设置当前通知对应的切入点表达式，与pointcut-ref属性冲突

  - `pointcut-ref `：设置当前通知对应的切入点id，与pointcut属性冲突

### 2.2.2、aop:around

- 名称：`aop:around`

- 类型：**标签**

- 归属：aop:aspect标签

- 作用：**设置环绕通知**

- 格式：

  ```xml
  <aop:aspect ref="adviceId">
      <aop:around method="methodName" pointcut="……"/>
  </aop:aspect>
  ```

- 说明：一个aop:aspect标签中可以配置多个aop:around标签

- 基本属性：

  - `method` ：在通知类中设置当前通知类别对应的方法

  - `pointcut` ：设置当前通知对应的切入点表达式，与pointcut-ref属性冲突

  - `pointcut-ref` ：设置当前通知对应的切入点id，与pointcut属性冲突

### 2.2.3、aop:after-throwing

- 名称：`aop:after-throwing`

- 类型：**标签**

- 归属：aop:aspect标签

- 作用：**设置抛出异常后通知**

- 格式：

  ```xml
  <aop:aspect ref="adviceId">
      <aop:after-throwing method="methodName" pointcut="……"/>
  </aop:aspect>
  ```

- 说明：一个aop:aspect标签中可以配置多个aop:after-throwing标签

- 基本属性：

  - `method` ：在通知类中设置当前通知类别对应的方法

  - `pointcut` ：设置当前通知对应的切入点表达式，与pointcut-ref属性冲突

  - `pointcut-ref` ：设置当前通知对应的切入点id，与pointcut属性冲突

### 2.2.4、示例

1. 创建切面类(内部有增强方法)

```java
public class MyAspect {
    //前置增强
    public void before(){
        System.out.println("前置增强....");
    }
    //后置增强
    public void afterReturning(){
        System.out.println("后置增强....");
    }
    //环绕增强
    //Proceeding JoinPoint:正在执行的连接点 == 切点
    public Object around(ProceedingJoinPoint pjp){
        System.out.println("环绕前增强....");
        Object proceed = pjp.proceed();
        System.out.println("环绕后增强....");
        return proceed;
    }
    //异常抛出增强
    public void afterThrowing(){
        System.out.println("异常抛出增强....");
    }
    //最终通知增强
    public void after(){
        System.out.println("最终通知增强....");
    }  
    
}
```

2. 配置切点表达式和增强的织入关系

```xml
<!--配置织入-->
<aop:config>
<!--引用myAspect的Bean为切面对象-->
    <aop:aspect ref="myAspect">
        <!--前置增强-->
        <aop:before method="myPointcut" pointcut="execution(* com.itheima.aop.*.*(..))"/>
        <!--环绕增强-->
        <aop:around method="around" pointcut="execution(* com.itheima.aop.*.*(..))" />
        <!--前置增强-->
        <aop:after-returning method="afterRetruning" pointcut="(* com itheima.aop.*.*(..))" /> 
        <!--异常增强-->
        <aop:after-returning method="afterThrowing" pointcut="(* com itheima.aop.*.*(..))" />
        <!--最终通知增强-->
        <aop:after method="after" pointcut="(* com itheima.aop.*.*(..))" />
    </aop:aspect>
</aop:config>
```



## 2.3、切点表达式的抽取

当多个增强的切点表达式相同时，可以将切点表达式进行抽取，在增强中使用 `pointcut-ref` 属性代替 `pointcut` 属性来引用抽取后的切点表达式

```xml
<!--配置织入-->
<aop:config>
<!--引用myAspect的Bean为切面对象-->
    <aop:aspect ref="myAspect">
        <!--抽取切点表达式-->
        <aop:pointcut id="myPointcut" expression="execution(* com.itheima.aop.*.*(..))"></aop:pointcut>
                                                                                      
                                                                                      
        <!--前置增强-->
        <aop:before method="myPointcut" pointcut-ref="myPointcut"/>
        <!--环绕增强-->
        <aop:around method="around" pointcut-ref="myPointcut" />
        <!--前置增强-->
        <aop:after-returning method="afterRetruning" pointcut-ref="myPointcut" /> 
        <!--异常增强-->
        <aop:after-returning method="afterThrowing" pointcut-ref="myPointcut" />
        <!--最终通知增强-->
        <aop:after method="after" pointcut-ref="myPointcut" />
    </aop:aspect>
</aop:config>
```

## 2.4、知识要点

- aop 织入的配置

```xml
<aop:config>
    <aop:aspect ref="切面类">
        <aop:before method="通知方法名称" pointcut="切点表达式"></aop:before>
    </aop:aspect>
</aop:config>
```

- 通知的类型：前置通知、后置通知、环绕通知、异常抛出通知、最终通知
- 切点表达式的写法：

```xml
execution([修饰符] 返回值类型 包名.类名.方法名(参数))
```



# 3、基于注解的AOP开发

com.sangeng.service 包下有两个方法

```java
public class PhoneService {

    public void deleteAll(){
        System.out.println("PhoneService中deleteAll的核心代码");
    }
}
```

```java
public class UserService {


    public void deleteAll(){
        System.out.println("UserService中deleteAll的核心代码");
    }
}
```

需求：com.sangeng.service 包下所有类的所有方法在调用前都输出：方法被调用了。

## 3.1、注解开发AOP制作步骤

### 3.1.1、添加依赖

需要添加SpringIOC相关依赖和AOP相关依赖。

```xml
<!--SpringIOC相关依赖-->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
    <version>5.1.9.RELEASE</version>
</dependency>
<!--AOP相关依赖-->
<dependency>
    <groupId>org.aspectj</groupId>
    <artifactId>aspectjweaver</artifactId>
    <version>1.8.13</version>
</dependency>
```

### 3.1.2、相关bean要注入spring容器中

加`@Service` 注解

```java
@Service
public class PhoneService {

    public void deleteAll(){
        System.out.println("PhoneService中deleteAll的核心代码");
    }
}
```

```java
@Service
public class UserService {


    public void deleteAll(){
        System.out.println("UserService中deleteAll的核心代码");
    }
}
```

### 3.1.3、开启AOP注解支持和组件扫描

- `<aop:aspectj-autoproxy>` 标签开启aop注解支持
- `<context:component-scan>` 标签开启组件扫描

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:aop="http://www.springframework.org/schema/aop"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/aop https://www.springframework.org/schema/aop/spring-aop.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd">
    <!--开启组件扫描-->
    <context:component-scan base-package="com.sangeng"></context:component-scan>
    <!--开启aop注解支持-->
    <aop:aspectj-autoproxy></aop:aspectj-autoproxy>

</beans>
```

### 3.1.4、创建切面类

创建一个类，在类上加上@Component和@Aspect

使用@Pointcut注解来指定要被增强的方法

使用@Before注解来给我们的增强代码所在的方法进行标识，并且指定了增强代码是在被增强方法执行之前执行的。

```java
@Component
@Aspect
public class MyAspect {

	// 用Pointcut注解中的属性来指定对哪些方法进行增强
    @Pointcut("execution(* com.sangeng.service.*.*(..))")
    public void pt(){}

    /*
        用@Before注解来指定该方法中是增强的代码，并且是在被增强方法执行前执行的
        @Before的属性写上加了@Pointcut注解的方法: 方法名()
    */
    @Before("pt()")
    public void methodbefore(){
        System.out.println("方法被调用了");
    }

}
```

## 3.2、注解通知的类型

通知的配置语法：`@通知注解("切点表达式")`

| 名称         | 注解            | 说明                                                         |
| ------------ | --------------- | ------------------------------------------------------------ |
| 前置通知     | @Before         | 用于配置前置通知。指定增强的方法在切入点方法之前执行         |
| 后置通知     | @AfterReturning | 用于配置后置通知。指定增强的方法在切入点方法之后执行         |
| 环绕通知     | @Around         | 用于配置环绕通知。指定增强的方法在切入点方法之前和之后都执行 |
| 异常抛出通知 | @AfterThrowing  | 用于配置异常抛出通知。指定增强的方法在出现异常时执行         |
| 最终通知     | @After          | 用于配置最终通知。无论增强方式执行是否有异常都会执行         |



### 3.1.1、@Aspect

- 名称：`@Aspect`

- 类型：**注解**

- 位置：**类定义上方**

- 作用：**设置当前类为切面类**

- 格式：

  ```java
  @Aspect
  public class AopAdvice {
  }
  ```

- 说明：一个beans标签中可以配置多个aop:config标签



### 3.1.2、@Pointcut

- 名称：`@Pointcut`

- 类型：**注解**

- 位置：**方法定义上方**

- 作用：**使用当前方法名作为切入点引用名称**

- 格式：

  ```java
  @Pointcut("execution(* *(..))")
  public void pt() {
  }
  ```

- 说明：被修饰的方法忽略其业务功能，格式设定为无参无返回值的方法，方法体内空实现（非抽象）

### 3.1.3、示例

```java
public class MyAspect {
    //前置增强
    @Before("execution(* com.itheima.aop.*.*(..))")
    public void before(){
        System.out.println("前置增强....");
    }
    //后置增强
    @AfterReturning("execution(* com.itheima.aop.*.*(..))")
    public void afterReturning(){
        System.out.println("后置增强....");
    }
    //环绕增强
    //Proceeding JoinPoint:正在执行的连接点 == 切点
    @Around("execution(* com.itheima.aop.*.*(..))")
    public Object around(ProceedingJoinPoint pjp){
        System.out.println("环绕前增强....");
        Object proceed = pjp.proceed();
        System.out.println("环绕后增强....");
        return proceed;
    }
    //异常抛出增强
    @AfterThrowing("execution(* com.itheima.aop.*.*(..))")
    public void afterThrowing(){
        System.out.println("异常抛出增强....");
    }
    //最终通知增强
    @After("execution(* com.itheima.aop.*.*(..))")
    public void after(){
        System.out.println("最终通知增强....");
    }  
    
}
```



## 3.2、切点表达式的抽取

同 xml 配置 aop，我们可以将切点表达式抽取。抽取方式是在切点内定义方法，在该方法上使用`@Pointcut` 注解定义切点表达式，然后在增强注解中进行引用。具体如下：

```java
@Component("myAspect")
@Aspect
public class MyAspect {
    //前置增强
    @Before("pointcut()")
    public void before(){
        System.out.println("前置增强....");
    }
    //后置增强
    @AfterReturning("MyAspect.pointcut()")
    public void afterReturning(){
        System.out.println("后置增强....");
    }
    
    //定义切点表达式
    @Pointcut("execution(* com.itheima.aop.*.*(..))")
    public void pointcut(){
        
    }
    
}
```















































