# 1、SpringBoot核心配置

## 1.1、全局配置文件

全局配置文件能够对一些默认配置值进行修改。Spring Boot 使用一个 application.properties 或者 application.yaml 的文件作为全局配置文件，该文件存放在 src/main/resource 目录或者类路径的 /config,==一般配置文件存放在 resource 目录==。



## 1.2、application.properties

- 使用 Spring Initializr 方式构建 Spring Boot 项目时，会在 resource 目录下自动生成一个空的 application.properties 文件，Spring Boot 项目启动时会自动加载 application.propertie 文件。
- 我们可以在 application.properties 配置文件中定义 Spring Boot 项目的相关属性，该属性可以是系统属性、环境变量、命令参数等信息、也可以是自定义配置文件名称和位置，如下代码所示：

```properties
server.address=80
server.port=8080
spring.database.driver-class-name=com.mysql.jdbc.Driver
spring.config.name=application
```



### 1.2.1、服务器配置

Springboot 默认启动的是 8080 端口， Web 上下访问路径是 `/` ，可以通过配置文件 application.properties 来重新配置 springboot

若要更换其他端口，需要在 application.properties 配置文件中重新配置属性 server.port，代码如下：

```properties
# 修改tomcat 服务器端口号
server.port = 8090
```

springboot 默认为应用配置的上下文访问目录是 `/` ，需要在 application.properties 配置文件中重新配置属性 server.servlet.context-path，代码如下：

```properties
#修改应用访问名称
server.servlet.context-path=/springboot
```

> 注意：
>
> 当 application.properties 与 application.yml 文件在同一目录时，相同的属性配置 application.properties 优先级高于 application.yml



## 1.3、配置欢迎页面

配置欢迎页面使用 `直接实现WebMvcConfigurer` 和 `直接继承WebMvcConfigurationSupport` 这两种方法完成。

### 1.3.1、实现WebMvcConfigurer接口

> 添加配置类，实现WebMvcConfigurer

```java
@Configuration
public class MyMvcConfig implements WebMvcConfigurer {
    
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        //可以同时设置多个
        //设置访问路径为/,视图名称为login
        registry.addViewController("/").setViewName("login");
        registry.addViewController("/login.html").setViewName("login");
    }
}
```

> 其中 addViewController() 方法配置访问路径，setViewName() 方法设置视图名称(与 templates 目录下页面同名)，如果模板为 thymeleaf ，则需要在 pom.xml 文件中加入 thymeleaf 模板的依赖代码。==默认访问路径可以配置多个==



### 1.3.2、继承WebMvcConfigurationSupport类









## 1.4、profile多环境配置

在实际开发环境中，我们存在开发环境的配置，部署环境的配置，测试环境的配置等等，里面的配置信息很多时，例如：端口、上下文路径、数据库配置等等，若每次切换环境时，我们都需要进行修改这些配置信息时，会比较麻烦，profile的出现就是为了解决这个问题。它可以让我们针对不同的环境进行不同的配置，然后可以通过激活、指定参数等方式快速切换环境。

### 1.4.1、多配置文件

我们在主配置文件编写的时候，文件名可以是 **application-{profile}.properties/yml** , 用来指定多个环境版本，例如：

- application-test.properties 代表测试环境配置
- application-dev.properties 代表开发环境配置
- application-prod.properties 代表生产环境配置

但是Springboot并不会直接启动这些配置文件，它**默认使用application.properties主配置文件**，我们需要通过一个配置来选择需要激活的环境：

```properties
#比如在配置文件中指定使用dev环境，我们可以通过设置不同的端口号进行测试
#指定环境
spring.profiles.active=dev
```

### 1.4.2、使用步骤



1. **创建 profile 配置文件** 

- 我们可以用**application-xxx.yml**的命名方式 创建配置文件，其中xxx可以根据自己的需求来定义。
  - 我们需要一个测试环境的配置文件，则可以命名为：**application-test.yml**
  - 需要一个生产环境的配置文件，可以命名为：**application-prod.yml**
- 我们可以不同环境下不同的配置放到对应的profile文件中进行配置。然后把不同环境下都相同的配置放到application.yml文件中配置。

2. **激活环境**
   - 我们可以在 **application.yml**文件中使用 **spring.profiles.active** 属性来配置激活哪个环境。 
   - 也可以使用虚拟机参数来指定激活环境。例如 ： **-Dspring.profiles.active=test**
   - 也可以使用命令行参数来激活环境。例如： **--spring.profiles.active =test**

```yml
spring:
 profiles:
  active: prod
```

yml 配置文件中如下：

![](三更SpringBoot(六).assets/9.png)

虚拟机参数：Edit Configurations -> Environment -> VM options

![](三更SpringBoot(六).assets/10.png)

> **注意：如果yml和properties同时都配置了端口，并且没有激活其他环境 ， 默认会使用properties配置文件的！**



### 1.4.3、yml支持多文档快方式

- 在yml文件中，通过 `---` 分隔多文档块
- 例如：tomcat默认端口为8080，生产环境下端口号为8090，开发环境下端口号为9090，配置如下

```yaml
#默认配置
server:
 port: 8080
#指定激活环境
spring:
 profiles:
  active: prod
  
---
#生产环境
server:
 port: 8090
spring:
 profiles: prod
 
---
#开发环境
server:
 port: 9090
spring:
 profiles: dev
```





## 1.5、日志配置

### 1.5.1、常用的日志框架

- log4j：Apache 的一个开源项目，可以控制日志信息输送的目的地是控制台，文件、GUI组件等，可以控制每一条日志的输出格式，这些可以通过一个配置文件来灵活地进行配置，而不需要修改应用的代码。虽然已经停止维护了，但是目前绝大部分企业都是使用的 log4j
- LogBack：LogBack 是由 log4j 创始人设计的一个开源日志组件，LogBack当前分成三个模块：logback-core,logback-classic 和logback=access。logback-classic 是 Log4j 的一个改良版本。
- Log4j2：Apache Log4j2 是对Log4j的升级！



### 1.5.2、SpringBoot日志支持

默认情况下，SpringBoot 默认使用 LogBack 作为日志的实现，不需要对日志做任何配置就可以使用。

- 日志级别，从低到高分为： TRACE < DEBUG < INFO < WARN < ERROR < FATAL
- 但是在logback日志中，日志级别只有5个，从低到高分为：TRACE < DEBUG < INFO < WARN < ERROR 
- 低级别的会输出高级别信息，高级别不会输出低级别信息。例如：等级设置为 `ERROR` 的话，`WARN、INFO、DEBUG` 的信息是不会输出的。
- 在`SpringBoot` 中默认配置了 `ERROR、WARN、INFO` 级别的日志输出到控制台。 Logback中没有 `FATAL` 级别，它会被当做 `ERROR` 来处理

1. 默认情况下，INFO 级别以上的信息才会打印到控制台，可以自己设定日志输出级别，需要在 application.properties 配置文件中配置如下代码：

```properties
#指定默认级别为info
logging.level.root=info
#设置此包结构下的日志级别为debug级别
logging.level.com.sangeng=debug
```

2. 默认情况下，springboot 不会将日志输出到文件，若想输出到文件，需要加入以下配置

```properties
#日志输出到文件
logging.file=my.log
#设置文件输出目录
#设置到项目根目录
logging.path=/
```

- `logging.file` 设置文件，可以是绝对路径，也可以是相对路径。如： logging.file = my.log
- `logging.path` 设置目录，会在该目录下创建 spring.log 文件，并写入日志内容，如 logging.path = /var/log

- 如果只配置 logging.file,会在项目的当前路径下生成一个 xxx.log 日志文件
- 如果只配置 logging.path,会在 /var/log 文件夹生成一个日志文件为 spring.log

> 注意：==二者不能同时使用，若同时使用，只有 logging.file 生效==
>
> 默认情况下，日志文件的大小达到 10MB 会切分依次，产生新的日志文件，默认级别为：ERROR、WARN、INFO







### 1.5.3、自定义日志配置

​		在 application.properties 或 application.yml 全局配置文件中配置日志信息，只能配置一些简单的场景。如果想配置日志的保存路径、日志格式等复杂的场景(如：区分INFO和ERROR级别的日志，每天产生一个新的日志文件等)则无法满足，只能自定义日志信息。

​		Spring Boot 官方推荐优先使用带有 `-spring` 的文件名作为日志配置(如使用 logback-spring.xml，而不是 logback.xml)，命名为 logback-spring.xml 的日志配置文件，只需要将该配置文件放在项目中的 resources 目录下即可。

​		如果日志配置文件名称不是以 `-spring` 结尾(如： logback-config.xml作为配置文件名称)，则需要在全局配置文件中通过 loggin.config 属性指定自定义的日志配置文件，代码如下：

```properties
logging.config=classpath:logging-config.xml
```

### 1.5.4、logback-spring.xml配置文件

LogBack 配置文件是 `<configuration>` ，该节点有 5 个子节点，分别是 `<root>`、`<contextName>` 、`<property>` 、`<appender>`、`<logger>` 。根节点包含的属性如下所示：

- scan：当此属性设置为 true 时，配置文件如果发生改变，将会被重新加载，默认值为 true
- scanPeriod：设置检测配置文件是否有修改的时间间隔，如果没有给出时间单位，默认单位是毫秒。当 scan 为 true 时，此属性生效。默认的时间间隔是1分钟。
- debug：当此属性设置为 true 时，将打印出 logback 内部日志信息，实时查看 logback 运行状态。默认值为 false

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!-- 日志级别从低到高分为TRACE < DEBUG < INFO < WARN < ERROR < FATAL，如果设置为WARN，则低于WARN的信息都不会输出 -->
<!-- scan:当此属性设置为true时，配置文档如果发生改变，将会被重新加载，默认值为true -->
<!-- scanPeriod:设置监测配置文档是否有修改的时间间隔，如果没有给出时间单位，默认单位是毫秒。
                 当scan为true时，此属性生效。默认的时间间隔为1分钟。 -->
<!-- debug:当此属性设置为true时，将打印出logback内部日志信息，实时查看logback运行状态。默认值为false。 -->
<configuration  scan="true" scanPeriod="10 seconds">
    <contextName>logback</contextName>

    <!-- name的值是变量的名称，value的值时变量定义的值。通过定义的值会被插入到logger上下文中。定义后，可以使“${}”来使用变量。 -->
    <property name="log.path" value="./logs/pmp" />
    
    <!--0. 日志格式和颜色渲染 -->
    <!-- 彩色日志依赖的渲染类 -->
    <conversionRule conversionWord="clr" converterClass="org.springframework.boot.logging.logback.ColorConverter" />
    <conversionRule conversionWord="wex" converterClass="org.springframework.boot.logging.logback.WhitespaceThrowableProxyConverter" />
    <conversionRule conversionWord="wEx" converterClass="org.springframework.boot.logging.logback.ExtendedWhitespaceThrowableProxyConverter" />
    <!-- 彩色日志格式 -->
    <property name="CONSOLE_LOG_PATTERN" value="${CONSOLE_LOG_PATTERN:-%clr(%d{yyyy-MM-dd HH:mm:ss.SSS}){faint} %clr(${LOG_LEVEL_PATTERN:-%5p}) %clr(${PID:- }){magenta} %clr(---){faint} %clr([%15.15t]){faint} %clr(%-40.40logger{39}){cyan} %clr(:){faint} %m%n${LOG_EXCEPTION_CONVERSION_WORD:-%wEx}}"/>
    
    <!--1. 输出到控制台-->
    <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
        <!--此日志appender是为开发使用，只配置最底级别，控制台输出的日志级别是大于或等于此级别的日志信息-->
        <filter class="ch.qos.logback.classic.filter.ThresholdFilter">
            <level>debug</level>
        </filter>
        <encoder>
            <Pattern>${CONSOLE_LOG_PATTERN}</Pattern>
            <!-- 设置字符集 -->
            <charset>UTF-8</charset>
        </encoder>
    </appender>
    
    <!--2. 输出到文档-->
    <!-- 2.1 level为 DEBUG 日志，时间滚动输出  -->
    <appender name="DEBUG_FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <!-- 正在记录的日志文档的路径及文档名 -->
        <file>${log.path}/web_debug.log</file>
        <!--日志文档输出格式-->
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} - %msg%n</pattern>
            <charset>UTF-8</charset> <!-- 设置字符集 -->
        </encoder>
        <!-- 日志记录器的滚动策略，按日期，按大小记录 -->
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <!-- 日志归档 -->
            <fileNamePattern>${log.path}/web-debug-%d{yyyy-MM-dd}.%i.log</fileNamePattern>
            <timeBasedFileNamingAndTriggeringPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP">
                <maxFileSize>100MB</maxFileSize>
            </timeBasedFileNamingAndTriggeringPolicy>
            <!--日志文档保留天数-->
            <maxHistory>15</maxHistory>
        </rollingPolicy>
        <!-- 此日志文档只记录debug级别的 -->
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <level>debug</level>
            <onMatch>ACCEPT</onMatch>
            <onMismatch>DENY</onMismatch>
        </filter>
    </appender>
    
    <!-- 2.2 level为 INFO 日志，时间滚动输出  -->
    <appender name="INFO_FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <!-- 正在记录的日志文档的路径及文档名 -->
        <file>${log.path}/web_info.log</file>
        <!--日志文档输出格式-->
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} - %msg%n</pattern>
            <charset>UTF-8</charset>
        </encoder>
        <!-- 日志记录器的滚动策略，按日期，按大小记录 -->
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <!-- 每天日志归档路径以及格式 -->
            <fileNamePattern>${log.path}/web-info-%d{yyyy-MM-dd}.%i.log</fileNamePattern>
            <timeBasedFileNamingAndTriggeringPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP">
                <maxFileSize>100MB</maxFileSize>
            </timeBasedFileNamingAndTriggeringPolicy>
            <!--日志文档保留天数-->
            <maxHistory>15</maxHistory>
        </rollingPolicy>
        <!-- 此日志文档只记录info级别的 -->
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <level>info</level>
            <onMatch>ACCEPT</onMatch>
            <onMismatch>DENY</onMismatch>
        </filter>
    </appender>
    
    <!-- 2.3 level为 WARN 日志，时间滚动输出  -->
    <appender name="WARN_FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <!-- 正在记录的日志文档的路径及文档名 -->
        <file>${log.path}/web_warn.log</file>
        <!--日志文档输出格式-->
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} - %msg%n</pattern>
            <charset>UTF-8</charset> <!-- 此处设置字符集 -->
        </encoder>
        <!-- 日志记录器的滚动策略，按日期，按大小记录 -->
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>${log.path}/web-warn-%d{yyyy-MM-dd}.%i.log</fileNamePattern>
            <timeBasedFileNamingAndTriggeringPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP">
                <maxFileSize>100MB</maxFileSize>
            </timeBasedFileNamingAndTriggeringPolicy>
            <!--日志文档保留天数-->
            <maxHistory>15</maxHistory>
        </rollingPolicy>
        <!-- 此日志文档只记录warn级别的 -->
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <level>warn</level>
            <onMatch>ACCEPT</onMatch>
            <onMismatch>DENY</onMismatch>
        </filter>
    </appender>
    
    <!-- 2.4 level为 ERROR 日志，时间滚动输出  -->
    <appender name="ERROR_FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <!-- 正在记录的日志文档的路径及文档名 -->
        <file>${log.path}/web_error.log</file>
        <!--日志文档输出格式-->
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} - %msg%n</pattern>
            <charset>UTF-8</charset> <!-- 此处设置字符集 -->
        </encoder>
        <!-- 日志记录器的滚动策略，按日期，按大小记录 -->
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>${log.path}/web-error-%d{yyyy-MM-dd}.%i.log</fileNamePattern>
            <timeBasedFileNamingAndTriggeringPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP">
                <maxFileSize>100MB</maxFileSize>
            </timeBasedFileNamingAndTriggeringPolicy>
            <!--日志文档保留天数-->
            <maxHistory>15</maxHistory>
        </rollingPolicy>
        <!-- 此日志文档只记录ERROR级别的 -->
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <level>ERROR</level>
            <onMatch>ACCEPT</onMatch>
            <onMismatch>DENY</onMismatch>
        </filter>
    </appender>
    
    <!--
        <logger>用来设置某一个包或者具体的某一个类的日志打印级别、
        以及指定<appender>。<logger>仅有一个name属性，
        一个可选的level和一个可选的addtivity属性。
        name:用来指定受此logger约束的某一个包或者具体的某一个类。
        level:用来设置打印级别，大小写无关：TRACE, DEBUG, INFO, WARN, ERROR, ALL 和 OFF，
              还有一个特俗值INHERITED或者同义词NULL，代表强制执行上级的级别。
              如果未设置此属性，那么当前logger将会继承上级的级别。
        addtivity:是否向上级logger传递打印信息。默认是true。
        <logger name="org.springframework.web" level="info"/>
        <logger name="org.springframework.scheduling.annotation.ScheduledAnnotationBeanPostProcessor" level="INFO"/>
    -->
    
    <!--
        使用mybatis的时候，sql语句是debug下才会打印，而这里我们只配置了info，所以想要查看sql语句的话，有以下两种操作：
        第一种把<root level="info">改成<root level="DEBUG">这样就会打印sql，不过这样日志那边会出现很多其他消息
        第二种就是单独给dao下目录配置debug模式，代码如下，这样配置sql语句会打印，其他还是正常info级别：
        【logging.level.org.mybatis=debug logging.level.dao=debug】
     -->
    
    <!--
        root节点是必选节点，用来指定最基础的日志输出级别，只有一个level属性
        level:用来设置打印级别，大小写无关：TRACE, DEBUG, INFO, WARN, ERROR, ALL 和 OFF，
        不能设置为INHERITED或者同义词NULL。默认是DEBUG
        可以包含零个或多个元素，标识这个appender将会添加到这个logger。
    -->
    
    <!-- 4. 最终的策略 -->
    <!-- 4.1 开发环境:打印控制台-->
    <springProfile name="dev">
        <logger name="com.sdcm.pmp" level="debug"/>
    </springProfile>
    
    <root level="info">
        <appender-ref ref="CONSOLE" />
        <appender-ref ref="DEBUG_FILE" />
        <appender-ref ref="INFO_FILE" />
        <appender-ref ref="WARN_FILE" />
        <appender-ref ref="ERROR_FILE" />
    </root>
    
    <!-- 4.2 生产环境:输出到文档
    <springProfile name="pro">
        <root level="info">
            <appender-ref ref="CONSOLE" />
            <appender-ref ref="DEBUG_FILE" />
            <appender-ref ref="INFO_FILE" />
            <appender-ref ref="ERROR_FILE" />
            <appender-ref ref="WARN_FILE" />
        </root>
    </springProfile> -->

</configuration>
```









---

# 2、YML配置

## 2.1、YML简介

- SpringBoot是基于约定的，所以很多配置都有默认值，但如果想使用自己的配置替换默认配置的话，就可以使用
  application.properties 或者 application.yml application.yaml ）进行配置。
- YAML (YAML Ain't a Markup Language)YAML不是一种标记语言，通常以.yml为后缀的文件，是一种直观的能够被电脑识别的数据序列化格式，并且容易被人类阅读，容易和脚本语言交互的，可以被支持YAML库的不同的编程语言程序导入，一种专门用来写配置文件的语言。
- YAML 试图用一种比XML更敏捷的方式，来完成XML所完成的任务。
- YAML **主要还是给实体类注入值**。

例如：

传统 properties配置:

```properties
server.port=8080
server.address=127.0.0.1
```

传统xml配置：

```xml
<server>
    <port>8080</port>
    <address>127.0.0.1</address>
</server>
```

yaml配置：

```yml
server:
  port: 8080
  address: 127.0.0.1
```

> 可以看出，YAML 易于人们阅读，更加简洁明了,以==数据==为核心

## 2.2、语法

- k: v 表示键值对关系，**冒号后面必须有一个空格**
- 使用空格的缩进表示层级关系，空格数目不重要，**只要是左对齐的一列数据，都是同一个层级的**
- 大小写敏感
- 缩进时**不允许使用Tab键，只允许使用空格。**
- java 中对于驼峰命名法，可用==原名== 或 使 用    `-`  代替驼峰，如 java 中的 lastName 属性,在 yml 中使用 lastName 或 last-name 都可正确映射。
- yml 中注释前面要加 `#`

## 2.3、键值关系

### 2.3.1、普通值(字面量)

- k：v 字面量直接写就可以，字符串默认不用加上单引号或者双引号

注意：

- `" "` 双引号，转义字符能够起作用

  比如：`name:"sangeng\n caotang"` ,输出:  sangeng  换行 caotang

- `''` 单引号，转义特殊字符不起作用，特殊字符最终只是一个普通的字符串数据

  比如： `name: 'sangeng\n caotang'`,输出：sangeng \n caotang

```yaml
# 不加单双引号也可以
name1: sangeng
# 加单引号转义特殊字符不起作用
name2: 'sangeng \n caotang'
# 加双引号转义字符起作用
name3: "sangeng \n caotang"

age: 15

flag: true
```









### 2.3.2、日期

```yaml
date: 2019/01/01
```



### 2.3.3、对象、Map

==对象(属性和值)，Map(键值对) 写法如下==：

- 多行写法

```yaml
# 对象、Map格式
k:
  v1:
  v2
  
 
student:
  name: zhangsan
  age: 20
```

- 行内写法

```yaml
students: {name: zhangsan,age: 20}
```





### 2.3.4、数组、list、set

==数组、 list、set 写法如下==：用 `-` 值表示数组中的一个元素

- 多行写法

```yaml
pets:
  - dog
  - pig
  - cat
```

- 行内写法

```yaml
pets: [dog,pig,cat]
```

==对象数组、对象list、对象set写法如下：==

```yaml
students:
  - name: sangeng
    age: 17
  - name: caotang
    age: 14
  - {name: sangeng,age: 14}
```

### 2.3.5、占位符赋值

可以使用 `${key:defaultValue}` 的方式来赋值，若key不存在，则会使用defaultValue来赋值。

- 若没有配置 myPort，则会使用占位符的默认值 88 端口

```yaml
myPort: 80

# 引用上边定义的 myPort 值
server:
  port: ${myPort: 88}
```





## 2.4、SpringBoot读取YML

- 使用 Spring Boot 全局配置文件配置属性时，如果配置的属性是 Spring Boot 默认提供的属性，例如服务器端口 server.port，那么 Spring Boot 内部会自动扫描并读取属性值。

- 如果配置属性是用户自定义属性，例如自定义的 Person 实体类属性，则必须在程序中注入这些配置属性方可生效。Spring Boot 支持多种注入配置文件的方式，分别是使用注解 `@Value` 和 `@ConfigurationProperties` 注入属性。

### 2.4.1、@Value注解

`@Value` 注解是 Spring 框架提供的，用来读取配置文件中的属性值并逐个注入 Bean 对象对应的属性中。Spring Boot框架对 Spring 框架中的 `@Value` 注解进行了默认继承，所以在 Spring Boot 框架中还可以使用该注解读取和注入配置文件属性值。

注意使用此注解只能获取简单类型的值（8种基本数据类型及其包装类，String,Date）

```java
@Component // 用于将Person类作为Bean注入Spring容器中
@Data
public class Student {
    @Value("${student.id}")
    private int id;
    @Value("${student.lastName}")
    private String lastName;
}
```

> 注意：加了 @Value 的类必须是交由 Spring 容器管理的

上述代码中，`@Component` 和 `@Value` 用于注入 Student 的 id 属性，其中 `@Value` 不仅支持注入 Student 的 id 属性，而且还可以直接为 id 属性赋值，这是 `@ConfigurationProperties` 注解不支持的。

### 2.4.2、@ConfigurationProperties 注解

IDEA 中 resiurces 目录下右键 new -> file，文件名为 application.yml

yml 配置如下：

```yml
student1:
  lastName: zhangsan
  age: 17
student2:
  lastName: zhangsan
  age: 15
```



在实体类上添加注解 `@Component` 和`@ConfigurationProperties(prefix = "配置前缀")`

- 实体类一般是放在 domain/entity/pojo 包下

- `@Component` 注解是将这个类给 spring 容器去管理
- `@ConfigurationProperties(prefix = "配置前缀")` 读取 yml 中以配置前缀开头的数据

```java
@Data
@AllArgsConstructor
@NoArgsConstructor
@Component // 用于将Student类作为Bean注入Spring容器中
@ConfigurationProperties(prefix = "student1")// 将配置文件中以student1开头的属性注入到该类中
public class Student {
    private String lastName;
    private Integer age;
}
```

上述代码中，使用 `@Component` 和 `@ConfigurationProperties(prefix="student1")` 将配置文件中的每个属性映射到 Student 类属性中。

> 需要值得注意的是，使用 `@ConfigurationProperties` 注解批量注入属性值时，要保证配置文件中的属性和实体类的属性一致，否则无法正确获取并注入属性值。

从 spring 容器中获取 Student 对象

```java
@RestController
public class TestController {
    @Autowired
    private Student student;
    @RequestMapping("/test")
    public String test(){
        System.out.println(student);
        return "hi"
    }
}
```

> 注意事项：要求对应的属性要有set/get方法，并且key要和成员变量名一致才可以对应的上。



### 2.4.3、加载指定的配置文件

Spring Boot 支持自定义配置，加载指定的配置文件。Spring Boot 免除了项目中的大部分的手动配置，对于一些特定的情况，我们可以通过修改全局配置文件来适应具体的开发环境，几乎所有的配置都可以写在全局配置文件中，Spring Boot 会自动加载全局配置文件。但是，如果我们在项目中自定义配置文件，Spring Boot 是无法识别这些配置文件的，此时需要手动加载。

如果需要加载自定义配置文件，可以使用 `@PropertySource` 和 `@Configuration` 注解实现。 `@PropertySource`  注解可以指定自定义配置文件的位置和名称，`@Configuration` 注解可以将实体类指定为自定义配置类，如果需要将自定义配置文件中的属性值注入到实体类属性中，可以使用 `@ConfigurationProperties` 或`@Value` 注解注入属性值。

#### ①使用 `@PropertySource` 加载配置文件

- `@PropertySource` ： 加载指定的配置文件
- `@ConfigurationProperties(prefix = "配置前缀")` ：默认从全局配置文件中获取值

1. 在resources目录下新建一个**test.properties**文件

```properties
#实体对象MyProperties进行属性配置
test.id = 1
test.name = 李四
test.age = 20
```

yaml 写法如下

```yaml
test:
  age: 20
  id: 1
  name: 李四
```



2. 在 entity 包下自定义一个配置类 MyProperties

```java
@Configuration  // 自定义配置类
@EnableConfigurationProperties(MyProperties.class) // 开启对于配置类的属性注入功能
@PropertySource("classpath:test.properties") // 指定自定义配置文件位置和文件名称
@ConfigurationProperties(prefux="test")
@Data
public class MyProperties{
    private Integer id;
    private String name;
    private Integer age;
}
```

上述代码中， MyProperties 类是一个自定义配置类，用于借助相关注解引入自定义配置文件并注入自定义属性值，关于 MyProperties 类中使用的核心注解如下所示：

- `@Configuration` 注解用于表示当前类是一个自定义配置类，该类会作为Bean组件添加到 Spring 容器中，等同于 `@Component`  注解
- `@EnableConfigurationProperties(MyProperties.class)` 注解表示开启对应配置类 MyProperties 的属性注入功能，该注解是配合 `@ConfigurationProperties` 使用的，如果自定义配置类使用了 `@Component` 注解而不是 `@Configuration` 注解，那么 `@EnableConfigurationProperties(MyProperties.class)`  注解可以省略。
- `@PropertySource("classpath:test.properties")` 注解制定了自定义配置文件的位置和名称
- `@ConfigurationProperties(prefux="test")` 注解将上述的 test.properties 自定义配置文件中以 test 开头的属性值注入到该配置类的属性中。





### 2.4.4、使用@ImportResource加载XML配置文件

传统的Spring项目配置主要是基于 XML 文件的，SpringBoot 框架在 Spring4.x 基础上进行了改进，默认不再使用 XML 文件配置项目，且 XML 配置文件不会加载到 Spring 容器中。如果希望将外部的XML文件加载到程序中，可以使用 `@ImportResource` 注解加载配置文件。`@ImportResource` 注解标注在一个配置类上，通常放置在应用启动器类上，使用时需要指定 XML 配置文件的路径和名称。

#### ①创建User类

在 entity 包下创建 User 实体类

```java
@Data
public class User{
    private String userName; // 姓名
    private Integer age;	// 年龄
}
```

#### ②创建Spring配置文件

在 resources 目录下创建一个名为 MyBean.xml 的XML 自定义配置文件，代码如下：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
	
    <!--注入User类-->
	<bean id="userBean" class="com.kuang.entity.User">
        <property name="userName" value="李明"></property>
        <property name="age" value="20"></property>
    </bean>
</beans>
```



#### ③在启动器类加载自定义配置文件

编写完 Spring 的 XML 配置文件后，Spring Boot 默认是无法识别的，为了确保 Spring 配置文件生效，需要在启动器类上添加 `@ImportResource` 注解来指定 XML 文件位置，代码如下：

```java
@SpringBootApplication
// 加载自定义XML配置文件的位置
@ImportResource("classpath:MyBean.xml")
public class SpringBoot{
    public static void main(String[] args){
        SpringApplication.run(SpringBoot.class,args);
    }
}
```

#### ④测试自定义XML配置文件

在测试类中引入 ApplicationContext 实体类的 Bean,并新增一个测试方法进行输出测试，代码如下：

```java
// 注入ApplicationContext
@Resource
private ApplicationContext applicationContext;

@Test
public void testIoc(){
    // 获取User实例
    User user = (User)applicationContext.getBean("userBean");
    System.out.println(user);
}
```





### 2.4.5、使用@Configuration编写自定义配置类🔥

前面介绍了如何在 Spring Boot 中引入自定义的XML配置文件，这种配置方式在实际开发中的特殊情况下才会使用，在 Spring Boot 开发中，"约定大于配置"的思想，更推荐使用配置类的方式代替XML配置。

使用 `@Configuration` 注解可以指定配置类，它的作用和 XML 配置是一样的，配置类中的 `@Bean` 注解方法返回的对象都将作为Bean注入Spring容器，并且默认情况下，使用 `@Bean` 注解的方法名就是组件名。

#### ①创建自定义配置类

在config包创建一个名为 MyConfig 的自定义配置类，并使用 `@Configuration` 注解将该类声明为一个配置类，代码如下：

```java
@Configuration // 定义该类是一个配置类,等同于xml文件
public class MyConfig{
    @Bean // 将返回值对象作为组件添加到Spring容器中,该组件id默认为方法名,等同于xml文件中的<bean>标签,方法名就是bean标签的id值
    public User user(){
        return new User();
    }
}
```

上述代码中，MyConfig是 `@Configuration`注解声明的配置类(类似声明了一个XML配置文件)，该配置类会被 Spring Boot 自动扫描识别，使用 `@Bean` 注解的 user() 方法，其返回值对象会作为组件添加到 Spring 容器中(类似于XML文件中的`<bean>`标签配置),并且该组件的id默认是方法名user



### 2.4.6、练习

要求把下面实体类中的各个属性在yml文件中进行赋值。然后想办法读取yml配置的属性值，进行输出测试。

```java
@Data
@NoArgsConstructor
@AllArgsConstructor
@Component
@ConfigurationProperties(prefix = "student")
public class Student {
    private String lastName;
    private Integer age;
    private Boolean boss;


    private Date birthday;
    private Map<String,String> maps;
    private Map<String,String> maps2;
    private List<Dog> list;

    private Dog dog;
    private String[] arr;
    private String[] arr2;

    private Map<String,Dog> dogMap;
}
@Data
@AllArgsConstructor
@NoArgsConstructor
class Dog {
    private String name;
    private Integer age;
}
```

答案：

```yml
student:
  lastName: sangeng
  age: 15
  boss: true
  birthday: 2006/2/3
  maps:
    name: sangeng
    age: 11
  maps2: {name: caotang,age: 199}
  lists:
    - name: 小白
      age: 3
    - name: 小黄
      age: 4
    - {name:小黑,age: 1}
  dog:
    name: 小红
    age: 5
  arr:
    - sangeng
    - caotang
  arr2: [sangeng,caotang]
  dogMap:
    xb: {name: 小白,age: 9}
    xh:
      name: 小红
      age: 6
```

![](三更SpringBoot(六).assets/9-16340021117421.png)

![](三更SpringBoot(六).assets/10-16340021117432.png)









### 2.4.7、JSR303数据校验

​	JSR303是Java为Bean数据合法性校验所提供的标准框架。JSR303不需要编写验证器，它定义了一套可标注在成员变量、属性方法上的校验注解。

Springboot中可以用`@validated`来校验数据，如果数据异常则会统一抛出异常，方便异常中心统一处理。我们这里来写个注解让我们的name只能支持Email格式；

```java
@Component //注册bean
@ConfigurationProperties(prefix = "person")
@Validated  //数据校验
public class Person {

    @Email(message="邮箱格式错误") //name必须是邮箱格式
    private String name;
}
```

如果 yml 注入 name 变量不是邮箱格式，则会报 "邮箱格式错误" 。

> **使用数据校验，可以保证数据的正确性；**

常见参数：

```java
@NotNull(message="名字不能为空")
private String userName;
@Max(value=120,message="年龄最大不能超过120")
private int age;
@Email(message="邮箱格式错误")
private String email;

空检查
@Null       验证对象是否为null
@NotNull    验证对象是否不为null, 无法查检长度为0的字符串
@NotBlank   检查约束字符串是不是Null还有被Trim的长度是否大于0,只对字符串,且会去掉前后空格.
@NotEmpty   检查约束元素是否为NULL或者是EMPTY.
    
Booelan检查
@AssertTrue     验证 Boolean 对象是否为 true  
@AssertFalse    验证 Boolean 对象是否为 false  
    
长度检查
@Size(min=, max=) 验证对象（Array,Collection,Map,String）长度是否在给定的范围之内  
@Length(min=, max=) string is between min and max included.

日期检查
@Past       验证 Date 和 Calendar 对象是否在当前时间之前  
@Future     验证 Date 和 Calendar 对象是否在当前时间之后  
@Pattern    验证 String 对象是否符合正则表达式的规则
```











## 2.5、YML和properties配置的转换

我们可以使用一些网站非常方便的实现YML和properties格式配置的相互转换。

转换网站：https://www.toyaml.com/index.html



> 【注意】properties配置文件在写中文的时候，会有乱码 ， 我们需要去IDEA中设置编码格式为UTF-8；

- settings-->FileEncodings 中配置

![](三更SpringBoot(六).assets/12.png)



## 2.6、配置提示

如果使用了`@ConfigurationProperties`注解，可以增加以下依赖，让我们在书写配置时有相应的提示。

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-configuration-processor</artifactId>
    <optional>true</optional>
</dependency>
```

> 注意：添加完依赖加完注解后要运行一次程序才会有相应的提示。





## 2.7、对比



| 对比点            | @ConfigurationProperties | @Value   |
| ----------------- | ------------------------ | -------- |
| 底层框架          | Spring Boot              | Spring   |
| 功能              | 批量注入配置文件中的属性 | 单个注入 |
| 属性 setXX() 方法 | 需要                     | 不需要   |
| 复杂类型属性注入  | 支持                     | 不支持   |
| 松散绑定          | 支持                     | 不支持   |
| JSR303数据检验    | 支持                     | 不支持   |
| SpEL表达式        | 不支持                   | 支持     |

- `@ConfigurationProperties`只需要写一次即可 ，`@Value`则需要每个字段都添加

- 松散绑定：比如 yml 中写的 last-name，这个就相当于 lastName

- JSR303数据校验 ， 这个就是我们可以在字段是增加一层过滤器验证 ， 可以保证数据的合法性
- 复杂类型封装，yml中可以封装对象 ， 使用value就不支持

总结：

- 如果只是针对某一个业务需求，要引入配置文件中的个别属性值，推荐使用 `@Value` 注解
- 如果针对某个 JavaBean 类，需要批量注入属性值，则推荐使用 `@ConfigurationProperties` 注解







































































