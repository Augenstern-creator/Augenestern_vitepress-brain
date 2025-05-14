# 1、Nacos配置管理

Nacos除了可以做注册中心，同样可以做配置管理来使用。



## 1.1、统一配置管理

当微服务部署的实例越来越多，达到数十、数百时，逐个修改微服务配置就会让人抓狂，而且很容易出错。我们需要一种统一配置管理方案，可以集中管理所有实例的配置。

![](SpringCloud(二).assets/1.png)

Nacos一方面可以将配置集中管理，另一方可以在配置变更时，及时通知微服务，实现配置的热更新。





### 1.1.1、在nacos中添加配置文件

如何在nacos中管理配置呢？

![](SpringCloud(二).assets/2.png)



![](SpringCloud(二).assets/3.png)



> **注意**：项目的核心配置，需要热更新的配置才有放到nacos管理的必要。基本不会变更的一些配置还是保存在微服务本地比较好。



### 1.1.2、从微服务拉取配置

微服务要**拉取nacos中管理的配置**，第二步与本地的`application.yml`配置合并，才能完成项目启动。application.yml里面存放的是nacos的地址信息，第二步才读取，可是第一步在拉取nacos中的配置又需要知道这些信息，那么第一步该如何得知nacos地址呢？

因此spring引入了一种新的配置文件：`bootstrap.yaml`文件，会在application.yml之前被读取，流程如下：

![](SpringCloud(二).assets/4.png)



项目启动后，先去读取 `bootstrap.yaml` 文件，我们将nacos的信息都放在 `bootstrap.yaml` ，这样就得知了 nacos 地址，第二步再去读取本地配置文件 `application.yaml` ，二者合并，进行后续动作。

1. 引入nacos-config依赖：首先，在user-service服务中，引入nacos-config的客户端依赖：

```xml
<!--nacos配置管理依赖-->
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
</dependency>
```

2. 添加bootstrap.yaml：然后，在user-service中添加一个bootstrap.yaml文件，内容如下，并且将`application.yml`里面相同的配置删掉：

```yaml
spring:
  application:
    name: userservice # 服务名称
  profiles:
    active: dev #开发环境，这里是dev 
  cloud:
    nacos:
      server-addr: localhost:8848 # Nacos地址
      config:
        file-extension: yaml # 文件后缀名
```

这里会根据`spring.cloud.nacos.server-addr`获取nacos地址，再根据

`${spring.application.name}-${spring.profiles.active}.${spring.cloud.nacos.config.file-extension}`作为文件id，来读取配置。

本例中，就是去读取`userservice-dev.yaml`：

![](SpringCloud(二).assets/5.png)



3. 读取nacos配置：在user-service中的UserController中添加业务逻辑，读取`pattern.dateformat`配置：

![](SpringCloud(二).assets/6.png)



4. 访问：`http://localhost:8081/user/now`

![](SpringCloud(二).assets/7.png)









## 1.2、配置热更新

我们最终的目的，是修改nacos中的配置后，微服务中无需重启即可让配置生效，也就是**配置热更新**。要实现配置热更新，可以使用两种方式：

- 方式一：在`@Value`注入的变量所在类上添加注解`@RefreshScope`
- 方式二：使用`@ConfigurationProperties`注解代替`@Value`注解

### 1.2.1、方式一

方式一：在`@Value`注入的变量所在类上添加注解`@RefreshScope`

![](SpringCloud(二).assets/8.png)







### 1.2.2、方式二

方式二：使用`@ConfigurationProperties`注解代替`@Value`注解

1. 在user-service服务中，添加一个类`cn/itcast/user/config/PatternProperties`，读取`patterrn.dateformat`属性：

```java
@Component
@Data
@ConfigurationProperties(prefix = "pattern")
public class PatternProperties {
    private String dateformat;
}
```

2. 在UserController中使用这个类代替`@Value` ，**也就是通过对象的方法注入当前时间**

![](SpringCloud(二).assets/9.png)



3. 测试，在nacos修改统一配置，配置内容更改为如下，然后发布

```yaml
pattern:
 dateformat: yyyy年MM月dd日 HH:mm:ss
```

![](SpringCloud(二).assets/10.png)



4. 访问：`http://localhost:8081/user/now`

![](SpringCloud(二).assets/11.png)









## 1.3、配置共享

其实微服务启动时，会去nacos读取多个配置文件，例如：

- `[spring.application.name]-[spring.profiles.active].yaml`
  - 例如：`userservice-dev.yaml`
- `[spring.application.name].yaml`
  - 例如：`userservice.yaml`

而`[spring.application.name].yaml`不包含环境，因此可以被多个环境共享。下面我们通过案例来测试配置共享



1. 我们在nacos中添加一个**环境共享配置**`userservice.yaml`文件：

![](SpringCloud(二).assets/12.png)



2. 在user-service中读取共享配置：在`user-service`服务中，修改PatternProperties类，读取新添加的属性

![](SpringCloud(二).assets/13.png)



在user-service服务中，修改UserController，添加一个方法：

![](SpringCloud(二).assets/14.png)



3. 运行两个UserApplication，使用不同的profile，修改UserApplication2这个启动项，改变其profile值：

![](SpringCloud(二).assets/15.png)



![](SpringCloud(二).assets/16.png)

> 这样，UserApplication(8081)使用的profile是dev，UserApplication2(8082)使用的profile是test。

启动UserApplication和UserApplication2：

- 访问http://localhost:8081/user/prop，结果：

![](SpringCloud(二).assets/17.png)



- 访问http://localhost:8082/user/prop，结果：

![](SpringCloud(二).assets/18.png)



可以看出来，不管是dev，还是test环境，都读取到了envSharedValue这个属性的值。



### 1.3.1、配置共享的优先级

当nacos、服务本地同时出现相同属性时，优先级有高低之分：



![](SpringCloud(二).assets/19.png)







## 1.4、搭建nacos集群

Nacos生产环境下一定要部署为集群状态，官方给出的Nacos集群图：

![](SpringCloud(二).assets/20.png)



其中包含3个nacos节点，然后一个负载均衡器SLB代理3个Nacos。这里负载均衡器可以使用nginx。我们计划的集群结构如下更清晰：

![](SpringCloud(二).assets/21.png)



三个nacos节点的地址：

| 节点   | ip            | port |
| ------ | ------------- | ---- |
| nacos1 | 192.168.1.200 | 8845 |
| nacos2 | 192.168.1.200 | 8846 |
| nacos3 | 192.168.1.200 | 8847 |

搭建集群的基本步骤：

- 搭建数据库，初始化数据库表结构
- 下载nacos安装包
- 配置nacos
- 启动nacos集群
- nginx反向代理

### 1.4.1、初始化数据库

官方推荐的最佳实践是使用带有**主从的高可用数据库集群**，这里我们以单点的数据库为例来讲解。首先新建一个数据库，命名为nacos，而后导入下面的SQL：

```sql
CREATE TABLE `config_info` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `data_id` varchar(255) NOT NULL COMMENT 'data_id',
  `group_id` varchar(255) DEFAULT NULL,
  `content` longtext NOT NULL COMMENT 'content',
  `md5` varchar(32) DEFAULT NULL COMMENT 'md5',
  `gmt_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `gmt_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
  `src_user` text COMMENT 'source user',
  `src_ip` varchar(50) DEFAULT NULL COMMENT 'source ip',
  `app_name` varchar(128) DEFAULT NULL,
  `tenant_id` varchar(128) DEFAULT '' COMMENT '租户字段',
  `c_desc` varchar(256) DEFAULT NULL,
  `c_use` varchar(64) DEFAULT NULL,
  `effect` varchar(64) DEFAULT NULL,
  `type` varchar(64) DEFAULT NULL,
  `c_schema` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_configinfo_datagrouptenant` (`data_id`,`group_id`,`tenant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='config_info';

/******************************************/
/*   数据库全名 = nacos_config   */
/*   表名称 = config_info_aggr   */
/******************************************/
CREATE TABLE `config_info_aggr` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `data_id` varchar(255) NOT NULL COMMENT 'data_id',
  `group_id` varchar(255) NOT NULL COMMENT 'group_id',
  `datum_id` varchar(255) NOT NULL COMMENT 'datum_id',
  `content` longtext NOT NULL COMMENT '内容',
  `gmt_modified` datetime NOT NULL COMMENT '修改时间',
  `app_name` varchar(128) DEFAULT NULL,
  `tenant_id` varchar(128) DEFAULT '' COMMENT '租户字段',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_configinfoaggr_datagrouptenantdatum` (`data_id`,`group_id`,`tenant_id`,`datum_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='增加租户字段';


/******************************************/
/*   数据库全名 = nacos_config   */
/*   表名称 = config_info_beta   */
/******************************************/
CREATE TABLE `config_info_beta` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `data_id` varchar(255) NOT NULL COMMENT 'data_id',
  `group_id` varchar(128) NOT NULL COMMENT 'group_id',
  `app_name` varchar(128) DEFAULT NULL COMMENT 'app_name',
  `content` longtext NOT NULL COMMENT 'content',
  `beta_ips` varchar(1024) DEFAULT NULL COMMENT 'betaIps',
  `md5` varchar(32) DEFAULT NULL COMMENT 'md5',
  `gmt_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `gmt_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
  `src_user` text COMMENT 'source user',
  `src_ip` varchar(50) DEFAULT NULL COMMENT 'source ip',
  `tenant_id` varchar(128) DEFAULT '' COMMENT '租户字段',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_configinfobeta_datagrouptenant` (`data_id`,`group_id`,`tenant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='config_info_beta';

/******************************************/
/*   数据库全名 = nacos_config   */
/*   表名称 = config_info_tag   */
/******************************************/
CREATE TABLE `config_info_tag` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `data_id` varchar(255) NOT NULL COMMENT 'data_id',
  `group_id` varchar(128) NOT NULL COMMENT 'group_id',
  `tenant_id` varchar(128) DEFAULT '' COMMENT 'tenant_id',
  `tag_id` varchar(128) NOT NULL COMMENT 'tag_id',
  `app_name` varchar(128) DEFAULT NULL COMMENT 'app_name',
  `content` longtext NOT NULL COMMENT 'content',
  `md5` varchar(32) DEFAULT NULL COMMENT 'md5',
  `gmt_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `gmt_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
  `src_user` text COMMENT 'source user',
  `src_ip` varchar(50) DEFAULT NULL COMMENT 'source ip',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_configinfotag_datagrouptenanttag` (`data_id`,`group_id`,`tenant_id`,`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='config_info_tag';

/******************************************/
/*   数据库全名 = nacos_config   */
/*   表名称 = config_tags_relation   */
/******************************************/
CREATE TABLE `config_tags_relation` (
  `id` bigint(20) NOT NULL COMMENT 'id',
  `tag_name` varchar(128) NOT NULL COMMENT 'tag_name',
  `tag_type` varchar(64) DEFAULT NULL COMMENT 'tag_type',
  `data_id` varchar(255) NOT NULL COMMENT 'data_id',
  `group_id` varchar(128) NOT NULL COMMENT 'group_id',
  `tenant_id` varchar(128) DEFAULT '' COMMENT 'tenant_id',
  `nid` bigint(20) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`nid`),
  UNIQUE KEY `uk_configtagrelation_configidtag` (`id`,`tag_name`,`tag_type`),
  KEY `idx_tenant_id` (`tenant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='config_tag_relation';

/******************************************/
/*   数据库全名 = nacos_config   */
/*   表名称 = group_capacity   */
/******************************************/
CREATE TABLE `group_capacity` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `group_id` varchar(128) NOT NULL DEFAULT '' COMMENT 'Group ID，空字符表示整个集群',
  `quota` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '配额，0表示使用默认值',
  `usage` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '使用量',
  `max_size` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '单个配置大小上限，单位为字节，0表示使用默认值',
  `max_aggr_count` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '聚合子配置最大个数，，0表示使用默认值',
  `max_aggr_size` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '单个聚合数据的子配置大小上限，单位为字节，0表示使用默认值',
  `max_history_count` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '最大变更历史数量',
  `gmt_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `gmt_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_group_id` (`group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='集群、各Group容量信息表';

/******************************************/
/*   数据库全名 = nacos_config   */
/*   表名称 = his_config_info   */
/******************************************/
CREATE TABLE `his_config_info` (
  `id` bigint(64) unsigned NOT NULL,
  `nid` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `data_id` varchar(255) NOT NULL,
  `group_id` varchar(128) NOT NULL,
  `app_name` varchar(128) DEFAULT NULL COMMENT 'app_name',
  `content` longtext NOT NULL,
  `md5` varchar(32) DEFAULT NULL,
  `gmt_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `gmt_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `src_user` text,
  `src_ip` varchar(50) DEFAULT NULL,
  `op_type` char(10) DEFAULT NULL,
  `tenant_id` varchar(128) DEFAULT '' COMMENT '租户字段',
  PRIMARY KEY (`nid`),
  KEY `idx_gmt_create` (`gmt_create`),
  KEY `idx_gmt_modified` (`gmt_modified`),
  KEY `idx_did` (`data_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='多租户改造';


/******************************************/
/*   数据库全名 = nacos_config   */
/*   表名称 = tenant_capacity   */
/******************************************/
CREATE TABLE `tenant_capacity` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `tenant_id` varchar(128) NOT NULL DEFAULT '' COMMENT 'Tenant ID',
  `quota` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '配额，0表示使用默认值',
  `usage` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '使用量',
  `max_size` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '单个配置大小上限，单位为字节，0表示使用默认值',
  `max_aggr_count` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '聚合子配置最大个数',
  `max_aggr_size` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '单个聚合数据的子配置大小上限，单位为字节，0表示使用默认值',
  `max_history_count` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '最大变更历史数量',
  `gmt_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `gmt_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_tenant_id` (`tenant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='租户容量信息表';


CREATE TABLE `tenant_info` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `kp` varchar(128) NOT NULL COMMENT 'kp',
  `tenant_id` varchar(128) default '' COMMENT 'tenant_id',
  `tenant_name` varchar(128) default '' COMMENT 'tenant_name',
  `tenant_desc` varchar(256) DEFAULT NULL COMMENT 'tenant_desc',
  `create_source` varchar(32) DEFAULT NULL COMMENT 'create_source',
  `gmt_create` bigint(20) NOT NULL COMMENT '创建时间',
  `gmt_modified` bigint(20) NOT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_tenant_info_kptenantid` (`kp`,`tenant_id`),
  KEY `idx_tenant_id` (`tenant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='tenant_info';

CREATE TABLE `users` (
	`username` varchar(50) NOT NULL PRIMARY KEY,
	`password` varchar(500) NOT NULL,
	`enabled` boolean NOT NULL
);

CREATE TABLE `roles` (
	`username` varchar(50) NOT NULL,
	`role` varchar(50) NOT NULL,
	UNIQUE INDEX `idx_user_role` (`username` ASC, `role` ASC) USING BTREE
);

CREATE TABLE `permissions` (
    `role` varchar(50) NOT NULL,
    `resource` varchar(255) NOT NULL,
    `action` varchar(8) NOT NULL,
    UNIQUE INDEX `uk_role_permission` (`role`,`resource`,`action`) USING BTREE
);

INSERT INTO users (username, password, enabled) VALUES ('nacos', '$2a$10$EuWPZHzz32dJN7jexM34MOeYirDdFAZm2kuWj7VEOJhhZkDrxfvUu', TRUE);

INSERT INTO roles (username, role) VALUES ('nacos', 'ROLE_ADMIN');
```

### 1.4.2、下载nacos

GitHub地址：https://github.com/alibaba/nacos/tags



### 1.4.3、配置nacos

1. 进入nacos的conf目录，修改配置文件`cluster.conf.example`，重命名为`cluster.conf`，然后添加内容

```
127.0.0.1:8845
127.0.0.1.8846
127.0.0.1.8847
```

2. 然后修改`application.properties`文件，添加数据库配置

```properties
spring.datasource.platform=mysql

db.num=1

db.url.0=jdbc:mysql://127.0.0.1:3306/nacos?characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true&useUnicode=true&useSSL=false&serverTimezone=UTC
db.user.0=root
db.password.0=123456
```

### 1.4.4、启动nacos集群

1. 将nacos文件夹复制三份，分别命名为：nacos1、nacos2、nacos3
2. 然后分别修改三个文件夹中的`application.properties`

nacos1：

```properties
server.port=8845
```

nacos2：

```properties
server.port=8846
```

nacos3：

```properties
server.port=8847
```

然后分别启动三个nacos节点：

```bash
# 集群启动
startup.cmd
```



### 1.4.5、nginx反向代理

1. 修改nginx的`conf/nginx.conf`文件，配置如下：

```nginx
# 配置 nacos-cluster 集群
upstream nacos-cluster {
    server 127.0.0.1:8845;
	server 127.0.0.1:8846;
	server 127.0.0.1:8847;
}

# 反向代理
server {
    # 以后访问nacos不用8848了,直接是80端口
    listen       80;
    server_name  localhost;

    # 只要访问了 /nacos 路径,就代理到nacos集群
    location /nacos {
        proxy_pass http://nacos-cluster;
    }
}
```

2. 代码中application.yml文件配置如下：

```yaml
spring:
  cloud:
    nacos:
      server-addr: localhost:80 # Nacos地址
```

3. 而后在浏览器访问：http://localhost/nacos 即可，这样会在三个 nacos 作负载均衡





### 1.4.6、优化

- 实际部署时，需要给做反向代理的nginx服务器设置一个域名，这样后续如果有服务器迁移nacos的客户端也无需更改配置.

- Nacos的各个节点应该部署到多个不同服务器，做好容灾和隔离







# 2、Feign远程调用

- Feign 读音：`粪~`

先来看我们以前利用RestTemplate发起远程调用的代码：

```java
String url = "http://userservice/user/" + order.getUserId();
User user = restTemplate.getForObject(url,User.class);
```

存在下面的问题：

- 代码可读性差，编程体验不统一

- 参数复杂URL难以维护

Feign是一个声明式的http客户端，官方地址：https://github.com/OpenFeign/feign

其作用就是帮助我们优雅的实现http请求的发送，解决上面提到的问题。



## 2.1、Feign远程调用替代RestTemplate

1. 引入依赖：我们在`order-service`服务的pom文件中引入feign的依赖：

```xml
<!--Feign-->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
```

2. 添加注解：在order-service的启动类添加注解开启Feign的功能：

![](SpringCloud(二).assets/22.png)

3. 编写Feign的客户端：在order-service中新建一个接口`roder/client/UserClient`，内容如下：

```java
@FeignClient("userservice")
public interface UserClient {
    @GetMapping("/user/{id}")
    User findById(@PathVariable("id") Long id);
}
```

这个客户端主要是基于SpringMVC的注解来声明远程调用的信息，比如：

- 服务名称：userservice
- 请求方式：GET
- 请求路径：/user/{id}
- 请求参数：Long id
- 返回值类型：User

这样，Feign就可以帮助我们发送http请求，无需自己使用RestTemplate来发送了。



4. 测试：修改order-service中的OrderService类中的queryOrderById方法，使用Feign客户端代替RestTemplate

![](SpringCloud(二).assets/23.png)

这样看起来就优雅多了。

5. 访问：`http://localhost:8080/order/101`

![](SpringCloud(二).assets/24.png)









## 2.2、Feign自定义配置

Feign可以支持很多的自定义配置，如下表所示：

| 类型                   | 作用             | 说明                                                   |
| ---------------------- | ---------------- | ------------------------------------------------------ |
| **feign.Logger.Level** | 修改日志级别     | 包含四种不同的级别：NONE、BASIC、HEADERS、FULL         |
| feign.codec.Decoder    | 响应结果的解析器 | http远程调用的结果做解析，例如解析json字符串为java对象 |
| feign.codec.Encoder    | 请求参数编码     | 将请求参数编码，便于通过http请求发送                   |
| feign. Contract        | 支持的注解格式   | 默认是SpringMVC的注解                                  |
| feign. Retryer         | 失败重试机制     | 请求失败的重试机制，默认是没有，不过会使用Ribbon的重试 |



一般情况下，默认值就能满足我们使用，如果要自定义时，只需要创建自定义的@Bean覆盖默认Bean即可。下面以日志为例来演示如何自定义配置。

- 方式一：配置文件方式
- 方式二：Java代码方式

### 2.2.1、配置文件方式

基于配置文件修改feign的日志级别可以针对单个服务：

```yaml
feign:  
  client:
    config: 
      userservice: # 针对某个微服务的配置
        loggerLevel: FULL #  日志级别 
```

也可以针对所有服务：

```yaml
feign:  
  client:
    config: 
      default: # 这里用default就是全局配置，如果是写服务名称，则是针对某个微服务的配置
        loggerLevel: BASIC #  日志级别 
```

而日志的级别分为四种：

- NONE：不记录任何日志信息，这是默认值。
- BASIC：仅记录请求的方法，URL以及响应状态码和执行时间
- HEADERS：在BASIC的基础上，额外记录了请求和响应的头信息
- FULL：记录所有请求和响应的明细，包括头信息、请求体、元数据。

![](SpringCloud(二).assets/25.png)







### 2.2.2、Java代码方式

也可以基于Java代码来修改日志级别，先声明一个类，然后声明一个`Logger.Level`的对象：

```java
public class DefaultFeignConfiguration  {
    @Bean
    public Logger.Level feignLogLevel(){
        return Logger.Level.BASIC; // 日志级别为BASIC
    }
}
```

- 如果要**全局生效**，将其放到启动类的@EnableFeignClients这个注解中：

```java
@EnableFeignClients(defaultConfiguration = DefaultFeignConfiguration .class) 
```

- 如果是**局部生效**，则把它放到对应的@FeignClient这个注解中：

```java
@FeignClient(value = "userservice", configuration = DefaultFeignConfiguration .class) 
```



## 2.3、Feign使用优化

提高Feign的性能主要手段就是使用**连接池**

1. 在order-service的pom文件引入依赖

```xml
<!--httpClient的依赖 -->
<dependency>
    <groupId>io.github.openfeign</groupId>
    <artifactId>feign-httpclient</artifactId>
</dependency>
```

2. 配置连接池：在order-service的`application.yml`中添加配置：

```yaml
feign:
  client:
    config:
      default: # default全局的配置
        loggerLevel: BASIC # 日志级别，BASIC就是基本的请求和响应信息
  httpclient:
    enabled: true # 开启feign对HttpClient的支持
    max-connections: 200 # 最大的连接数
    max-connections-per-route: 50 # 每个路径的最大连接数
```

总结：

1. 日志级别尽量用basic
2. 使用连接池
3. **真实情况下连接池的参数需要经过压测才能确定最合适的参数值**



## 2.4、最佳实践

Feign的客户端与服务提供者的controller代码非常相似，有没有一种办法简化这种重复的代码编写呢？

![](SpringCloud(二).assets/26.png)





### 2.4.1、抽取Client模块

将Feign的Client抽取为独立模块，并且把接口有关的POJO、默认的Feign配置都放到这个模块中，提供给所有消费者使用。

例如，将UserClient、User、Feign的默认配置都抽取到一个feign-api包中，所有微服务引用该依赖包，即可直接使用。

![](SpringCloud(二).assets/27.png)





1. 首先创建一个module，命名为feign-api：

![](SpringCloud(二).assets/28.png)

2. 然后，order-service中编写的UserClient、User都复制到feign-api项目中
3. 删除order-service中的UserClient、User等类或接口

4. 在order-service的pom文件中中引入feign-api的依赖：

```xml
<!--feign-api-->
<dependency>
    <groupId>cn.itcast.demo</groupId>
    <artifactId>feign-api</artifactId>
    <version>1.0</version>
</dependency>
```

5. 修改order-service中的所有与上述三个组件有关的导包部分，改成导入feign-api中的包
6. 注意：order-service的`@EnableFeignClients`注解是在cn.itcast.order包下，而 UserClient 是在 `cn.itcast.feign` 包下，所以需要解决扫描包问题

```java
// 指定需要加载的Client接口
@EnableFeignClients(clients = {UserClient.class})
```











# 3、Gateway服务网关

Spring Cloud Gateway 是 Spring Cloud 的一个全新项目，该项目是基于 Spring 5.0，Spring Boot 2.0 和 Project Reactor 等响应式编程和事件流技术开发的网关，它旨在为微服务架构提供一种简单有效的统一的 API 路由管理方式。







## 3.1、为什么需要网关

Gateway网关是我们服务的守门神，所有微服务的统一入口。

网关的**核心功能特性**：

- 请求路由
- 权限控制
- 限流

架构图：

我们有很多个微服务业务，每个微服务有自己的数据库，每个微服务都可以去Nacos进行服务注册和配置的管理，各个微服务之间若有相互调用关系，采用Feign远程调用。

但是若外部想要访问微服务，则需要先经过网关gateway，进行身份认证，认证成功后通过路由和负载均衡将其转发到对应微服务服务。

![](SpringCloud(二).assets/29.png)





- **权限控制**：网关作为微服务入口，需要校验用户是是否有请求资格，如果没有则进行拦截。
- **路由和负载均衡**：一切请求都必须先经过gateway，但网关不处理业务，而是根据某种规则，把请求转发到某个微服务，这个过程叫做路由。当然路由的目标服务有多个时，还需要做负载均衡。
- **限流**：当请求流量过高时，在网关中按照下流的微服务能够接受的速度来放行请求，避免服务压力过大。

在SpringCloud中网关的实现包括两种：

- gateway
- zuul

Zuul是基于Servlet的实现，属于阻塞式编程。而SpringCloudGateway则是基于Spring5中提供的WebFlux，属于响应式编程的实现，具备更好的性能。



## 3.2、gateway快速入门

下面，我们就演示下网关的基本路由功能。基本步骤如下：

1. 创建SpringBoot工程gateway，引入网关依赖
2. 编写启动类
3. 编写基础配置和路由规则
4. 启动网关服务进行测试

> 我们来实现一下：

1. 新建Maven模块，继承 cloud-demo 工程

![](SpringCloud(二).assets/30.png)



2. 引入依赖

```xml
<!--网关-->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-gateway</artifactId>
</dependency>
<!--nacos服务发现依赖-->
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
</dependency>
```

3. 编写启动类：`src/main/java/cn/itcast/gateway/GatewayApplication.java`

```java
@SpringBootApplication
public class GatewayApplication {
    public static void main(String[] args) {
        SpringApplication.run(GatewayApplication.class, args);
    }
}
```

4. 创建application.yml文件，编写基础配置和路由规则，内容如下：

```yaml
server:
  port: 10010 # 网关端口
spring:
  application:
    name: gateway # 服务名称
  cloud:
    nacos:
      server-addr: localhost:8848 # nacos地址
    gateway:
      routes: # 网关路由配置
        - id: user-service # 路由id，自定义，只要唯一即可
          # uri: http://127.0.0.1:8081 # 路由的目标地址 http就是固定地址(不推荐)
          uri: lb://userservice # 路由的目标地址 lb就是负载均衡，后面跟服务名称
          predicates: # 路由断言，也就是判断请求是否符合路由规则的条件
            - Path=/user/** # 这个是按照路径匹配，只要以/user/开头就符合要求
```

- 我们将符合`Path` 规则的一切请求，都代理到 `uri`参数指定的地址。

- 本例中，我们将 `/user/**`开头的请求，代理到`lb://userservice`，lb是负载均衡，根据服务名拉取服务列表，实现负载均衡。

如下，我们也可以将`/order/**` 开头的请求，代理到`lb://orderservice`

```yaml
server:
  port: 10010 # 网关端口
spring:
  application:
    name: gateway # 服务名称
  cloud:
    nacos:
      server-addr: localhost:8848 # nacos地址
    gateway:
      routes: # 网关路由配置
        - id: user-service # 路由id，自定义，只要唯一即可
          # uri: http://127.0.0.1:8081 # 路由的目标地址 http就是固定地址
          uri: lb://userservice # 路由的目标地址 lb就是负载均衡，后面跟服务名称
          predicates: # 路由断言，也就是判断请求是否符合路由规则的条件
            - Path=/user/** # 这个是按照路径匹配，只要以/user/开头就符合要求
            
        - id: order-service
          uri: lb://orderservice
          predicates:
            - Path=/order/**
```





5. 重启网关，访问：`http://localhost:10010/user/1` ，符合`/user/**`规则，请求转发到uri：`http://userservice/user/1`，得到了结果：

![](SpringCloud(二).assets/31.png)



### 3.2.1、网关路由的流程图

![](SpringCloud(二).assets/32.png)



用户发起了`http://127.0.0.1:10010/user/1` 请求，网关端口也是10010，所以请求会先经过网关，网关基于路由规则判断，把`/user/**`请求的路径代理到`userservice`，把`/order/**`请求的路径代理到`orderservice`，网关会去Nacos注册中心拉取微服务列表，找到`userservice`，负载均衡，发送请求







### 3.2.2、总结

网关搭建步骤：

1. 创建项目，引入nacos服务发现和gateway依赖

2. 配置application.yml，包括服务基本信息、nacos地址、路由

路由配置包括：

1. 路由id：路由的唯一标示

2. 路由目标（uri）：路由的目标地址，http代表固定地址，lb代表根据服务名负载均衡

3. 路由断言（predicates）：判断路由的规则，

4. 路由过滤器（filters）：对请求或响应做处理



接下来，就重点来学习路由断言和路由过滤器的详细知识







## 3.3、断言工厂 

我们在配置文件中写的断言规则只是字符串，这些字符串会被Predicate Factory读取并处理，转变为路由判断的条件。例如Path=/user/**是按照路径匹配，这个规则是由 Path 断言工厂来处理的，像这样的断言工厂在 SpringCloudGateway 还有十几个：

![](SpringCloud(二).assets/33.png)



我们只需要掌握Path这种路由工程就可以了。例如其他配置：

```yaml
spring:
  application:
    name: gateway # 服务名称
  cloud:
    nacos:
      server-addr: localhost:8848 # nacos地址
    gateway:
      routes: # 网关路由配置
        - id: user-service # 路由id，自定义，只要唯一即可
          # uri: http://127.0.0.1:8081 # 路由的目标地址 http就是固定地址
          uri: lb://userservice # 路由的目标地址 lb就是负载均衡，后面跟服务名称
          predicates: # 路由断言，也就是判断请求是否符合路由规则的条件
            - Path=/user/** # 这个是按照路径匹配，只要以/user/开头就符合要求
            - After=2017-01-20T17:42:47.789-07:00[America/Denver] 
            # 请求的时间必须是 JAN20,2017 年 17:42 山区时间（丹佛） 之后
```





## 3.4、过滤器工厂

GatewayFilter是网关中提供的一种过滤器，可以对进入网关的请求和微服务返回的响应做处理：

![](SpringCloud(二).assets/34.png)





### 3.4.1、路由过滤器的种类

Spring提供了31种不同的路由过滤器工厂。例如：

| **名称**             | **说明**                     |
| -------------------- | ---------------------------- |
| AddRequestHeader     | 给当前请求添加一个请求头     |
| RemoveRequestHeader  | 移除请求中的一个请求头       |
| AddResponseHeader    | 给响应结果中添加一个响应头   |
| RemoveResponseHeader | 从响应结果中移除有一个响应头 |
| RequestRateLimiter   | 限制请求的流量               |



### 3.4.2、请求头过滤器

下面我们以AddRequestHeader 为例来讲解

> **需求**：给所有进入userservice的请求添加一个请求头：Truth=itcast is freaking awesome!

只需要修改gateway服务的`application.yml`文件，添加路由过滤即可：

```yaml
spring:
  application:
    name: gateway # 服务名称
  cloud:
    nacos:
      server-addr: localhost:8848 # nacos地址
    gateway:
      routes: # 网关路由配置
        - id: user-service #   路由id，自定义，只要唯一即可
          # uri: http://127.0.0.1:8081 # 路由的目标地址 http就是固定地址
          uri: lb://userservice # 路由的目标地址 lb就是负载均衡，后面跟服务名称
          predicates: # 路由断言，也就是判断请求是否符合路由规则的条件
            - Path=/user/** # 这个是按照路径匹配，只要以/user/开头就符合要求
          filters:
            - AddRequestHeader=name,Augenestern! # 添加请求头
```

- 当前过滤器写在userservice路由下，因此仅仅对访问userservice的请求有效。

**测试**：改造 uservice 的controller下的方法来接收请求头：

```java
 @GetMapping("/{id}")
    public User queryById(@PathVariable("id") Long id,
                          @RequestHeader(value = "name",required = false) String name) {
        System.out.println("name: " + name);
        return userService.queryById(id);
    }
```

重启服务，访问：http://localhost:10010/user/1，在控制台可以看到设置的请求头

![](SpringCloud(二).assets/35.png)





### 3.4.3、默认过滤器

如果要对所有的路由都生效，则可以将过滤器工厂写到default下。格式如下：

```yaml
spring:
  application:
    name: gateway # 服务名称
  cloud:
    nacos:
      server-addr: localhost:8848 # nacos地址
    gateway:
      routes: # 网关路由配置
        - id: user-service # 路由id，自定义，只要唯一即可
          # uri: http://127.0.0.1:8081 # 路由的目标地址 http就是固定地址
          uri: lb://userservice # 路由的目标地址 lb就是负载均衡，后面跟服务名称
          predicates: # 路由断言，也就是判断请求是否符合路由规则的条件
            - Path=/user/** # 这个是按照路径匹配，只要以/user/开头就符合要求
#          filters: # 默认过滤项
#            - AddRequestHeader=name,Augenestern!  # 添加请求头
        - id: order-service
          uri: lb://orderservice
          predicates:
            - Path=/order/**
      default-filters: 
        - AddRequestHeader=name,Augenestern!  # 添加请求头
```

### 3.4.4、总结

过滤器的作用是什么？

1. 对路由的请求或响应做加工处理，比如添加请求头
2. 配置在路由下的过滤器只对当前路由的请求生效

defaultFilters的作用是什么？

1. 对所有路由都生效的过滤器







## 3.5、全局过滤器

上一节学习的过滤器，网关提供了31种，但每一种过滤器的作用都是固定的。如果我们希望拦截请求，做自己的业务逻辑则没办法实现。全局过滤器的作用也是处理一切进入网关的请求和微服务响应，与GatewayFilter的作用一样。区别如下：

- GatewayFilter通过配置定义，处理逻辑是固定的
- GlobalFilter的逻辑需要自己写代码实现。定义方式是实现GlobalFilter接口：

```java
public interface GlobalFilter {
    /**
     *  处理当前请求，有必要的话通过{@link GatewayFilterChain}将请求交给下一个过滤器处理
     *
     * @param exchange 请求上下文，里面可以获取Request、Response等信息
     * @param chain 用来把请求委托给下一个过滤器 
     * @return {@code Mono<Void>} 返回标示当前过滤器业务结束
     */
    Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain);
}
```



### 3.5.1、自定义全局过滤器

需求：定义全局过滤器，拦截请求，判断请求的参数是否满足下面条件：

- 参数中是否有authorization，
- authorization参数值是否为admin

如果同时满足则放行，否则拦截。

实现：

1. 在gateway中定义一个过滤器，加上`@Order()`注解

```java
// Order顺序注解,过滤器的顺序,越小优先级越高
@Order(-1)
@Component
public class AuthorizeFilter implements GlobalFilter {

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        // 1.获取请求参数
        MultiValueMap<String, String> params = exchange.getRequest().getQueryParams();
        // 2.获取第一个匹配的authorization参数
        String auth = params.getFirst("authorization");
        // 3.校验
        if ("admin".equals(auth)) {
            // 放行
            return chain.filter(exchange);
        }
        // 4.拦截
        // 4.1.禁止访问，设置状态码
        exchange.getResponse().setStatusCode(HttpStatus.FORBIDDEN);
        // 4.2.结束处理
        return exchange.getResponse().setComplete();
    }
}
```

测试：

1. 重启网关服务，访问：`http://localhost:10010/user/1`

![](SpringCloud(二).assets/36.png)



2. 访问：`http://localhost:10010/user/1?authorization=admin`

![](SpringCloud(二).assets/37.png)







### 3.5.2、过滤器执行顺序

请求进入网关会碰到三类过滤器：当前路由的过滤器、DefaultFilter默认过滤器、GlobalFilter全局过滤器。**请求路由后**，会将当前路由过滤器和DefaultFilter、GlobalFilter，合并到一个过滤器链（集合）中，排序后依次执行每个过滤器：

![](SpringCloud(二).assets/38.png)



排序的规则是什么呢？

- 每一个过滤器都必须指定一个int类型的order值，**order值越小，优先级越高，执行顺序越靠前**。
- GlobalFilter通过实现Ordered接口，或者添加`@Order`注解来指定order值，由我们自己指定
- 路由过滤器和defaultFilter的order由Spring指定，默认是按照声明顺序从1递增。
- 当过滤器的order值一样时，会按照 defaultFilter > 路由过滤器 > GlobalFilter的顺序执行。







## 3.6、跨域问题

### 3.6.1、什么是跨域问题

跨域：**域名不一致就是跨域**，主要包括：

- 域名不同： www.taobao.com 和 www.taobao.org 和 www.jd.com 
- 域名相同，端口不同：localhost:8080和localhost8081

跨域问题：浏览器禁止请求的发起者与服务端发生跨域ajax请求，请求被浏览器拦截的问题

> 解决方案：CORS，https://www.ruanyifeng.com/blog/2016/04/cors.html







### 3.6.2、解决跨域问题

网关处理跨域采用的同样是CORS方案，只需简单配置即可实现：

```yaml
server:
  port: 10010 # 网关端口
spring:
  application:
    name: gateway # 服务名称
  cloud:
    nacos:
      server-addr: localhost:8848 # nacos地址
    gateway:
      # 全局的跨域处理
      globalcors:
        add-to-simple-url-handler-mapping: true # 解决options请求被拦截问题
        corsConfigurations:
          '[/**]':         # 拦截所有的请求
            allowedOrigins: # 允许哪些网站的跨域请求
              - "http://localhost:8090"
            allowedMethods: # 允许的跨域ajax的请求方式
              - "GET"
              - "POST"
              - "DELETE"
              - "PUT"
              - "OPTIONS"
            allowedHeaders: "*" # 允许在请求中携带的头信息
            allowCredentials: true # 是否允许携带cookie
            maxAge: 360000 # 这次跨域检测的有效期
```





































