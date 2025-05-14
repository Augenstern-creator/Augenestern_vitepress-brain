| 名称              | 解释                                         | 命令                    |
| ----------------- | -------------------------------------------- | ----------------------- |
| DDL(数据定义语言) | 定义和管理数据对象，如数据库，数据表等       | create、drop、alter     |
| DML(数据操作语言) | 用于操作数据库对象中所包含的数据             | insert、update、delete  |
| DQL(数据查询语言) | 用于查询数据库数据                           | select                  |
| DCL(数据控制语言) | 用于管理数据库的语言，包括管理权限及数据更改 | grant、commit、rollback |

# 1、DDL



DDL：Data Definition Language，数据定义语言，定义和管理数据对象，如数据库，数据表等



## 1.1、对数据库的常用操作

| 功能             | SQL                                        |
| ---------------- | ------------------------------------------ |
| 查看所有的数据库 | show databases;                            |
| 创建数据库       | create database [if not exists] 数据库名;  |
| 使用数据库       | use 数据库                                 |
| 删除数据库       | drop database [if exists] 数据库名;        |
| 修改数据库编码   | alter database 数据库名 character set utf8 |

使用SQLyog创建数据库时，需要选择

- 基字符集：`utf8`
- 数据库排序规则：`utf8_unicode_ci`

![](黑马MySQL(二).assets/12.png)

## 1.2、对表结构的常用操作

### 1.2.1、创建表

创建表是构建一张空表，指定这个表的名字，这个表有几列，每一列叫什么名字，以及每一列存储的数据类型。

> 中括号[]内的内容可写可不写，尖括号<>内的必须写

```sql
create table [if not exists] 表名(
	
	字段名1 类型[(宽度)] [约束条件] [comment '字段说明']
	
)[表的一些设置];
```

例如：

- 创建一个school数据库
- 创建学生表
  - 学号int
  - 姓名varchar
  - 密码varchar
  - 性别varchar
  - 出生日期datetime
  - 家庭住址varchar
  - 邮箱varchar

```sql
-- 创建数据库 school
CREATE DATABASE IF NOT EXISTS `school`;
-- 删除数据库 student
DROP DATABASE IF  EXISTS `student`;
-- 注意点:表的名称和字段尽量使用 `` 括起来
-- 创建学生表
CREATE TABLE IF NOT EXISTS `student` (
  `id` INT(4) NOT NULL AUTO_INCREMENT COMMENT '主键',  		-- id 不为空，自增
  `name` VARCHAR(30) NOT NULL DEFAULT '林晓' COMMENT '姓名',	-- name 不为空，默认为林晓
  `pwd` VARCHAR(20) NOT NULL DEFAULT '123456' COMMENT '密码',	-- pwd 不为空，默认为123456
  `sex` VARCHAR(2) NOT NULL DEFAULT '男' COMMENT '性别',	-- sex 不为空，默认为男
  `birthday` DATETIME DEFAULT NULL COMMENT '出生日期',		-- birthdat 默认为空
  `address` VARCHAR(100) DEFAULT NULL COMMENT '家庭住址',	-- address 默认为空
  `email` VARCHAR(50) DEFAULT NULL COMMENT '邮箱',		-- email默认为空
    
  PRIMARY KEY (`id`)  									 -- 主键，一般一个表只有一个唯一的主键
)ENGINE=INNODB DEFAULT CHARSET=utf8;
```

### 1.2.2、数据类型

数据类型是指在创建表的时候为表中字段指定数据类型，只有数据符合类型要求才能存储起来，使用数据类型的原则是:够用就行，尽量使用取值范围小的，而不用大的，这样可以更多的节省存储空间。



#### 1、数值类型

| 类型              | 用途               | 存储需求                              |
| ----------------- | ------------------ | ------------------------------------- |
| **tinyint**       | **小整数值**       | **1 byte**                            |
| smallint          | 大整数值           | 2 bytes                               |
| mediumint         | 大整数值           | 3 bytes                               |
| **int / integer** | **大整数值**       | **4 bytes**                           |
| bigint            | 极大整数值         | 8 bytes                               |
| float             | 单精度浮点数值     | 4 bytes                               |
| **double**        | **双精度浮点数值** | **8 bytes**                           |
| **decimal**       | **小数值**         | **金融计算的时候，一般是使用decimal** |

其中的decimal有以下用法

```sql
decimal（5，2）
```

- 其中 5 为最多可以存储的十进制位数为10位，是小数点前后的位数总和
- 2表示小数点后面的位数



#### 2、字符串类型



| 类型        | 用途                          | 大小          |
| ----------- | ----------------------------- | ------------- |
| char        | 定长字符串                    | 0-255 bytes   |
| **varchar** | **变长字符串**                | 0-65535 bytes |
| tinyblob    | 不超过255个字符的二进制字符串 | 0-255 bytes   |
| tinytext    | 短文本字符串                  | 0-255 bytes   |
| blob        | 二进制形式的长文本数据        | 0-65535 bytes |
| text        | 长文本数据                    | 0-65535 bytes |
| mediumblob  | 二进制形式的中等长度文本数据  |               |
| mediumtext  | 中等长度文本数据              |               |
| longblob    | 二进制形式的极大文本数据      |               |



#### 3、日期类型

| 类型          | 格式                    | 用途                         |
| ------------- | ----------------------- | ---------------------------- |
| **date**      | **YYYY-MM-DD**          | **日期值**                   |
| time          | HH:MM:SS                | 时间值或持续时间             |
| year          | YYYY                    | 年份值                       |
| **datetime**  | **YYYY-MM-DD HH:MM:SS** | **混合日期和时间值**         |
| **timestamp** | **YYYYMMDD HHMMSS**     | **混合日期和时间值，时间戳** |



### 1.2.3、其他操作

| 功能                       | SQL                     |
| -------------------------- | ----------------------- |
| 查看当前数据库的所有表名称 | show tables;            |
| 查看指定某个表的创建语句   | show create table 表名; |
| 查看表结构                 | desc 表名               |
| 删除表                     | drop table 表名         |





## 1.3、修改表结构

### 1.3.1、添加列

语法：

```sql
alter table 表名 add 列名 类型(长度)[约束]
```

例如：为 student 表添加一个新的字段为：系别 dept 类型为 varchar(20)

```sql
alter table student add `dept` varchar(20)
```



### 1.3.2、修改列名和类型

语法：

```sql
alter table 表名 change 旧列名 新列名 类型(长度) 约束;
```

例如：为 student 表的 dept 字段更换为 department varchar(30)

```sql
alter table student change `dept` department varchar(30)
```

### 1.3.3、删除列

语法：

```sql
alter table 表名 drop 列名;
```

例子： 删除 student 表中的 department 列

```sql
alter table student drop department;
```

### 1.3.4、修改表名

语法：

```sql
rename table 表名 to 新表名		
```

例子： 将表 student 改名为 stu

```sql
rename table student to stu
```







# 2、DML

DML: Data Manipulation Language,数据操作语言，用来对数据库中表的数据记录进行更新。



## 2.1、数据插入

语法：

```sql
-- 向表中插入某些列
insert into 表(列名1,列名2,列名3...) values ('值1','值2','值3'...)

-- 向表中插入所有列
insert into 表 values(值1,值2,值3....)
```

- 一般写插入语句，我们一定要数据和字段一一对应！
- 字段是可以省略的，但是后面的值必须要一一对应

例子：

```sql
insert into student(sid,name,gender,age,birth,address,score) values(1001,'男',18,'2001-08-09','杭州',90)

insert into student values(1001,'男',18,'2001-08-09','杭州',90)
```





## 2.2、数据修改

语法：

```sql
update 表名 set 字段名=值,字段名=值...;

update 表名 set 字段名=值,字段名=值....where 条件;
```

1. 条件，筛选的条件，如果没有指定，则会修改所有的列
2. value ，是一个具体的值，也可以是一个变量
3. 多个设置的属性之间，使用英文逗号隔开

例子：

```sql
-- 将所有学生的地址改为成都
update student set address = '成都'

-- 将 id 为 1004 的学生的地址改为北京
update student set address = '北京' where id = 1004

-- 将 id 为 1005 的学生的地址修改为北京,成绩修改为100
update student set address = '北京',score = 100 where id = 1005

update `student` set `name`='狂神' where id = 1;

-- 不指定条件的情况下，会改动所有表！
update `student` set `name`='长江7号'; 

-- 修改多个属性
update `student` set `name`='狂神',`email`='12123@qq.com' where id between 2 and 5;

-- 通过多个条件定位数据 
update `student` set `name`='长江7号' where `name`='狂神' and `sex`='男';
```

| 操作符           | 含义         | 范围        | 结果  |
| ---------------- | ------------ | ----------- | ----- |
| =                | 等于         | 5=6         | false |
| <>或  !=         | 不等于       | 5<>6        | true  |
| >                | 大于         |             |       |
| <                | 小于         |             |       |
| <=               | 小于等于     |             |       |
| >=               | 大于等于     |             |       |
| between...and... | 在某个范围内 | [2,5]       |       |
| and              | &&           | 5>1 and 1>2 | false |
| or               | \|\|         | 5>1or 1>2   | true  |



## 2.3、数据删除

语法：

```sql
delete from 表名 [where 条件]

truncate table 表名
-- 或者
truncate 表名
```



例如：

```sql
-- 删除sid为1004的学生数据
delete from student where sid = 1004;

-- 删除表中所有数据
delete from student;

-- 清空表数据
truncate table student;
truncate student;
```

> 注意：delete 和 truncate 原理不同,delete只是删除内容,而 truncate 类似于 drop table,可以理解为事将整个表删除,然后再创建该表



> delete 和 truncate 区别

- **相同点**: 都能删除数据，都不会删除表结构，但truncate速度更快
- **不同点**：
  - truncate 重新设置 自增列，计数器会归零
  - truncate 不会影响事务





# 3、约束

约束constraint实际上就是表中数据的限制条件。

作用：表在设计的时候加入约束的目的就是为了保证表中的记录完整性和有效性，比如用户表有些列的值（手机号）不能为空，有些列的值（身份证号）不能重复。

约束的分类

- 主键约束 primary key
- 自增长约束 auto_increment
- 非空约束 not null
- 唯一性约束 unique
- 默认约束 default
- 零填充约束 zerofill
- 外键约束 foreign key

## 3.1、主键约束

- MySQL主键约束是一个列或者多个列的组合，其值能唯一地标识表中的每一行,方便在RDBMS中尽快的找到某一行。

- 主键约束相当于 唯一约束 + 非空约束 的组合，主键约束列不允许重复，也不允许出现空值。

- 每个表最多只允许一个主键
- 主键的关键字是：`primary key`

- 当创建主键的约束时，系统默认会在所在的列和列组合上建立对应的唯一索引。

### 3.1.1、添加单列主键

创建单列主键有两种方式，一种是在定义字段的同时指定主键，一种是定义完字段之后指定主键

方式一语法：

```sql
-- 在 create table 语句中,通过 PRIMARY KEY 关键字来指定主键
create table 表名(

	<字段名> <数据类型> primary key
)
```

方式一实现：

```sql
create table empl(
	
    `id` int primary key,
    `name` varchar(20),
)
```

方式二语法：

```sql
-- 在定义字段之后再指定主键,语法格式如下
create table 表名(

	[constraint<约束名>] primary key [字段名]
)
```

方式二实现：

```sql
create table emp2(
	
    id int,
    name varchar(20),
    
    constraint pk1 primary key(id)
)
```



### 3.1.2、添加多列主键(联合主键)

所谓的联合主键，就是这个主键是由一张表中多个字段组成的。

注意：

1. 当主键是由多个字段组成时，不能直接在字段名后面声明主键约束
2. 一张表只能有一个主键，联合主键也是一个主键

语法：

```sql
create table 表名(

	primary key(字段1,字段2....)

)
```

实现：

```sql
create table emp3(

	name varchar(20),
    id int,
    
    primary key(name,id)
)
```

### 3.1.3、通过修改表结构添加主键

主键约束不仅可以在创建表的同时创建，也可以在修改表时添加。

语法：

```sql
create table 表名(

);

alter table <表名> add primary key(字段列表);
```

实现：

```sql
-- 添加单列主键
create table emp4(
	
    id int,
    name varchar(20)

);

alter table emp4 add primary key(id);
```





### 3.1.4、删除主键约束

一个表中不需要主键约束时，就需要从表中将其删除。删除主键约束的方法要比创建主键约束容易的多。

语法：

```sql
alter table <数据表名> drop primary key;
```

实现：

```sql
-- 删除单列主键
alter table emp1 drop primary key;

-- 删除联合主键
alter table emp5 drop primary key;
```





## 3.2、自增长约束

在 MySQL 中，当主键定义为自增长后，这个主键的值就不再需要用户输入数据了，而由数据库系统根据定义自动赋值。每增加一条记录，主键会自动以相同的步长进行增长。

通过给字段添加 `auto_increment` 属性来实现主键自增长。

语法：

```sql
字段名 数据类型 auto_increment
```

实现：

```sql
create table student(
	
    id int primary key auto_increment,
    name varchar(20)
);
```

特点：

- 默认情况下，auto_increment的初始值是 1，每新增一条记录，字段值自动加 1。
- 一个表中只能有一个字段使用 auto_increment约束，且该字段必须有唯一索引，以避免序号重复（即为主键或主键的一部分）。
- auto_increment约束的字段必须具备 NOT NULL 属性。
- auto_increment约束的字段只能是整数类型（TINYINT、SMALLINT、INT、BIGINT 等)。
- auto_increment约束字段的最大值受该字段的数据类型约束，如果达到上限，auto_increment就会失效。



### 3.2.1、指定自增字段初始值

如果第一条记录设置了该字段的初始值，那么新增加的记录就从这个初始值开始自增。例如，如果表中插入的第一条记录的 id 值设置为 5，那么再插入记录时，id 值就会从 5 开始往上增加

方式一：创建表时指定

```sql
create table student(

    id int primary key auto_increment,
    name varchar(20)
)auto_increment=100;
```

方式二：指定自增字段初始值

```sql
create table student(

    id int primary key auto_increment,
    name varchar(20)
);

alter table student auto_increment=100;
```

> delete和truncate在删除后自增列的变化

- delete 数据之后自动增长从断点开始
- truncate 数据之后自动增长从默认起始值开始





## 3.3、非空约束

MySQL 非空约束（not null）指字段的值不能为空。对于使用了非空约束的字段，如果用户在添加数据时没有指定值，数据库系统就会报错。

语法：

```sql
-- 方式一🔥
<字段名><数据类型> not null;

-- 方式二
alter table 表名 modify 字段 类型 not null;
```

实现：

```sql
-- 方式一🔥
create table student(
	
    id int,
    name varchar(20) not null,
    address varchar(20) not null
);

-- 方式二
create table student(
	
    id int,
    name varchar(20),
    address varchar(20)
);

alter table student modify name varchar(20) not null;
alter table student modify address varchar(20) not null;
```

### 3.3.1、删除非空约束

语法：

```sql
alter table 表名 modify 字段 类型
```

实现：

```sql
alter table student modify name varchar(20);

alter table student modify address varchar(20);
```





## 3.4、唯一约束

唯一约束（Unique Key）是指所有记录中字段的值不能重复出现。例如，为 id 字段加上唯一性约束后，每条记录的 id 值都是唯一的，不能出现重复的情况。

语法：

```sql
-- 方式一
<字段名><数据类型> unique

-- 方式二
alter table 表名 add constraint 约束名 unique(列);
```

实现：

```sql
-- 方式一 创建表时指定

create table student(
	
    id int,
    name varchar(20),
    address varchar(20) unique -- 指定唯一约束
);


-- 方式二
create table student(
	
    id int,
    name varchar(20),
    address varchar(20)
);

alter table student add constraint unique_ad unique(address);
```

### 3.4.1、删除唯一约束

语法：

```sql
-- alter table <表名> drop index <唯一约束名>
alter table student drop index unique_ad;
```





## 3.5、默认约束

MySQL 默认值约束用来指定某列的默认值。

语法：

```sql
-- 方式一
<字段名><数据类型> default <默认值>

-- 方式二
alter table 表名 modify 列名 类型 default 默认值;
```

实现：

```sql
-- 方式一
create table student(
	
    id int,
    name varchar(20) default '小林' -- 指定默认约束

)；


-- 方式二
create table student(
	
    id int,
    name varchar(20) 
)；

alter table student modify name varchar(20) default '小林'
```





### 3.5.1、删除默认约束

语法：

```sql
alter table <表名> modify column <字段名><类型> default null;
```

实现：

```sql
alter table student modify column name varchar(20) default null;
```







## 3.6、零填充约束

1. 插入数据时，当该字段的值的长度小于定义的长度时，会在该值的前面补上相应的0
2. zerofill默认为int(10)
3. 当使用zerofill 时，默认会自动加unsigned（无符号）属性，使用unsigned属性后，数值范围是原值的2倍，例如，有符号为-128 ~ +127，无符号为0~256。

实现：

```sql
create table student(

	id int zerofill,   -- 零填充约束
    name varchar(20)
);
```

### 3.6.1、删除零填充约束

语法：

```sql
alter table <表名> modify <字段><数据类型>
```

实现：

```sql
alter table <表名> modify <id><int>
```







# 4、DQL

## 4.1、基本查询

语法格式：

```sql
select [all|distinct]
	<目标列的表达式1> [别名],
	<目标列的表达式2> [别名]
from <表名或视图名> [别名],<表名或视图名> [别名]
[where<条件表达式>]
[group by <列名>]
[having <条件表达式>]
[order by <列名> [asc|desc]]
[limit <数字或者列表>]
```

1. 创建数据库和表

```sql
-- 创建数据库
CREATE DATABASE IF NOT EXISTS mydb2;
USE mydb2;
-- 创建商品表：
CREATE TABLE product(
 pid INT PRIMARY KEY AUTO_INCREMENT, -- 商品编号
 pname VARCHAR(20) NOT NULL , -- 商品名字
 price DOUBLE,  -- 商品价格
 category_id VARCHAR(20) -- 商品所属分类
);
INSERT INTO product VALUES(NULL,'海尔洗衣机',5000,'c001');
INSERT INTO product VALUES(NULL,'美的冰箱',3000,'c001');
INSERT INTO product VALUES(NULL,'格力空调',5000,'c001');
INSERT INTO product VALUES(NULL,'九阳电饭煲',200,'c001');
                           
INSERT INTO product VALUES(NULL,'啄木鸟衬衣',300,'c002');
INSERT INTO product VALUES(NULL,'恒源祥西裤',800,'c002');
INSERT INTO product VALUES(NULL,'花花公子夹克',440,'c002');
INSERT INTO product VALUES(NULL,'劲霸休闲裤',266,'c002');
INSERT INTO product VALUES(NULL,'海澜之家卫衣',180,'c002');
INSERT INTO product VALUES(NULL,'杰克琼斯运动裤',430,'c002');
 
INSERT INTO product VALUES(NULL,'兰蔻面霜',300,'c003');
INSERT INTO product VALUES(NULL,'雅诗兰黛精华水',200,'c003');
INSERT INTO product VALUES(NULL,'香奈儿香水',350,'c003');
INSERT INTO product VALUES(NULL,'SK-II神仙水',350,'c003');
INSERT INTO product VALUES(NULL,'资生堂粉底液',180,'c003');
 
INSERT INTO product VALUES(NULL,'老北京方便面',56,'c004');
INSERT INTO product VALUES(NULL,'良品铺子海带丝',17,'c004');
INSERT INTO product VALUES(NULL,'三只松鼠坚果',88,NULL); 
```

![](黑马MySQL(二).assets/1.png)



1. 查询所有的商品

```sql
select * from product;
```

2. 查询商品名和商品价格

```sql
select pname,price from product;
```

3. 别名查询

   1. 表别名

      ```sql
      select * from product as p;
      ```

   2. 列别名

      ```sql
      select pname as pn from product;
      ```

4. 去掉重复值

```sql
select distinct price from product;
```

![](黑马MySQL(二).assets/2.png)



5. 查询结果是表达式(运算查询)：将所有商品的价格+10元进行显示

```sql
select pname,price+10 from product;
```

![](黑马MySQL(二).assets/3.png)





## 4.2、运算符

数据库中的表结构确立后，表中的数据代表的意义就已经确定。通过MySQL运算符进行运算，就可以获取到表结构以外的另一种数据。

例如，学生表中存在一个birth字段，这个字段表示学生的出生年份。而运用MySQL的算术运算符用当前的年份减学生出生的年份，那么得到的就是这个学生的实际年龄数据。

MySQL支持4种运算符：

- 算术运算符
- 比较运算符
- 逻辑运算符
- 位运算符

### 4.2.1、算术运算符

| 算术运算符 | 说明               |
| ---------- | ------------------ |
| +          | 加法运算           |
| -          | 减法运算           |
| *          | 乘法运算           |
| / 或者 DIV | 除法运算，返回商   |
| % 或者 MOD | 求余运算，返回余数 |

```sql
select 6 + 2;
select 6 - 2;
select 6 * 2;
select 6 / 2;
select 6 % 2;


-- 将每件商品的价格加10
select name,price+10 as new_price from product;
```





### 4.2.2、比较运算符

| 比较运算符          | 说明                                                         |
| ------------------- | ------------------------------------------------------------ |
| =                   | 等于                                                         |
| < 和 <=             | 小于和小于等于                                               |
| > 和 >=             | 大于和大于等于                                               |
| <=>                 | 安全的等于，两个操作码均为NULL时，其所得值为1；而当一个操作码为NULL时，其所得值为0 |
| <> 或 !=            | 不等于                                                       |
| isnull 或者 is null | 判断一个值是否为null                                         |
| is not null         | 判断一个值是否不为null                                       |
| least               | 当有两个或多个参数时，返回最小值                             |
| greatest            | 当有两个或多个参数时，返回最大值                             |
| between and         | 判断一个值是否落在两个值之间                                 |
| in                  | 判断一个值是in列表中的任意一个值                             |
| not in              | 判断一个值不是in列表中的任意一个值                           |
| like                | 通配符匹配                                                   |
| regexp              | 正则表达式匹配                                               |

```sql
-- 查询商品名称为“海尔洗衣机”的商品所有信息：
select * from product where pname = '海尔洗衣机';
 
-- 查询价格为800商品
select * from product where price = 800;
 
-- 查询价格不是800的所有商品
select * from product where price != 800;
select * from product where price <> 800;
select * from product where not(price = 800);
 
-- 查询商品价格大于60元的所有商品信息
select * from product where price > 60;
 
 
-- 查询商品价格在200到1000之间所有商品
select * from product where price >= 200 and price <=1000;
select * from product where price between 200 and 1000;
```



### 4.2.3、逻辑运算符

| 逻辑运算符   | 说明                                               |
| ------------ | -------------------------------------------------- |
| not 或者 ！  | 逻辑非                                             |
| and 或者 &&  | 逻辑与                                             |
| or 或者 \|\| | 逻辑或                                             |
| **like**     | a like b，SQL匹配，如果a匹配b，则结果为真          |
| **in**       | a in(a1,a2,a3...)，假设a在a1或者a2....，则结果为真 |

```sql
-- 查询商品价格是200或800的所有商品
select * from product where price = 200 or price = 800;
select * from product where price in (200,800);

-- 查询含有'裤'字的所有产品
select * from product where pname like '%裤%';

-- 查询以'海'开头的所有商品
select * from product where pname like '海%';

-- 查询第二个字为'寇'的所有商品
select * from product where pname like '_寇%';

-- 查询category_id为null的商品
select * from product where category_id is null;

-- 查询category_id不为null分类的商品
select * from product where category_id is not null;

-- 使用least求最小值
select least(10,20,30); -- 10
select least(10,null,30); -- null

-- 使用greatest求最大值
select greatest(10,20,30); -- 30
select greatest(10,null,30); -- null
```

- like结合使用的通配符 : `%` (代表0到任意个字符) `_` (一个字符)
- 注意： `% _`只能在like里面使用
- `in` 里面是确切的集合

### 4.2.4、位运算符

| 位运算符 | 说明                   |
| -------- | ---------------------- |
| \|       | 按位或                 |
| &        | 按位与                 |
| ^        | 按位异或               |
| <<       | 按位左移               |
| >>       | 按位右移               |
| ~        | 按位取反，反转所有比特 |

位运算符是在二进制数上进行计算的运算符。位运算会先将操作数变成二进制数，进行位运算。然后再将计算结果从二进制数变回十进制数。

```sql
select 3&5; -- 位与 
select 3|5; -- 位或 
select 3^5; -- 位异或 
select 3>>1; -- 位左移
select 3<<1; -- 位右移
select ~3;   -- 位取反
```







## 4.3、排序查询

如果我们需要对读取的数据进行排序，我们就可以使用 MySQL 的 `order by` 子句来设定你想按哪个字段哪种方式来进行排序，再返回搜索结果。

语法：

```sql
select
	字段名1,字段名2
from 表名
order by 字段名1 [asc|desc],字段名2[asc|desc]
```

特点：

- asc 代表升序，desc 代表降序，如果不写默认升序

- order by 用于子句中可以支持单个字段，多个字段，表达式，函数，别名
- order by 子句，放在查询语句的最后面。LIMIT子句除外

```sql
-- 使用价格排序(降序)
select * from product order by price desc;

-- 在价格排序(降序)的基础上,以分类排序(降序)
select * from product order by price desc,category_id asc;

-- 显示商品的价格(去重复),并排序(降序)
select distinct price from product order by price desc;
```



## 4.4、聚合查询

之前我们做的查询都是横向查询，它们都是根据条件一行一行的进行判断，而使用聚合函数查询是纵向查询，它是对**一列**的值进行计算，然后返回一个单一的值；另外聚合函数会忽略空值。

| 聚合函数 | 作用                                                         |
| -------- | ------------------------------------------------------------ |
| count()  | 统计指定列不为null的`记录行数`                               |
| sum()    | 计算指定列的`数值和`，如果指定列类型不是数值类型，那么计算结果为0 |
| max()    | 计算指定列的`最大值`，如果指定列是字符串类型，那么使用字符串排序运算 |
| min()    | 计算指定列的`最小值`，如果指定列是字符串类型，那么使用字符串排序运算 |
| avg()    | 计算指定列的`平均值`，如果指定列类型不是数值类型，那么计算结果为0 |



```sql
-- 查询商品的总条数:统计product表有多少行
select count(*) from product;
```

![](黑马MySQL(二).assets/4.png)





```sql
-- 查询价格大于200商品的总条数
select count(*) from product where price > 200;
```

![](黑马MySQL(二).assets/5.png)





```sql
-- 查询分类为'c001'的所有商品的总和
select sum(price) from product where category_id = 'c001';
```

![](黑马MySQL(二).assets/6.png)





```sql
-- 查询商品的最小价格
select min(price) from product;

-- 查询分类为'c002'所有商品的平均价格
select avg(price) from product where category_id = 'c002';
```







### 4.4.1、null值处理

1. count 函数对null值的处理

   如果 count 函数的参数为星号 `*` ,则统计所有记录的个数。而如果参数为某字段，则不统计含 null 值的记录个数

2. sum 和 avg 函数对 null 值的处理

   这两个函数忽略 null 值的存在，就好像该条记录不存在一样

3. max 和 min 函数对null值的处理

   max 和 min 两个函数同样忽略null值的存在。

我们可以进行测试：

```sql
-- 创建表
CREATE TABLE test_null( 
 c1 VARCHAR(20), 
 c2 INT 
);

-- 插入数据
INSERT INTO test_null VALUES('aaa',3);
INSERT INTO test_null VALUES('bbb',3);
INSERT INTO test_null VALUES('ccc',NULL);
INSERT INTO test_null VALUES('ddd',6);
```



```sql
-- 测试
SELECT COUNT(*), COUNT(1), COUNT(c2) FROM test_null;
```

![](黑马MySQL(二).assets/7.png)

- count(*) 统计所有记录的个数为4
- count(1) 统计所有记录的个数为4
- count(c2) 统计不统计含 null 值的记录个数为3

```sql
-- 测试
SELECT SUM(c2),MAX(c2),MIN(c2),AVG(c2) FROM test_null;
```

![](黑马MySQL(二).assets/8.png)



- sum(c2) 忽略 null值
- max(c2) 忽略 null值
- min(c2) 忽略 null值
- avg(c2) 忽略 null值



## 4.5、分组查询

分组查询是指使用`group by`字句对查询信息进行分组。

语法：

```sql
select 
	字段1,字段2 
from 表名 
group by 分组字段 
having 分组条件;
```

实现：

```sql
-- 统计各个分类商品的个数
select category_id,count(*) from product group by category_id;
```

![](黑马MySQL(二).assets/9.png)



如果要进行分组的话，则SELECT子句之后，只能出现分组的字段和统计函数，其他的字段不能出现：



#### 4.5.1、having

分组之后的条件筛选-having

- 分组之后对统计结果进行筛选的话必须使用having，不能使用where
- where子句用来筛选 FROM 子句中指定的操作所产生的行
- group by 子句用来分组 WHERE 子句的输出。
- having 子句用来从分组的结果中筛选行

```sql
-- 统计各个分类商品的个数,且只显示个数大于4的信息
SELECT category_id,COUNT(*) FROM product GROUP BY category_id HAVING COUNT(*) > 1;
```

![](黑马MySQL(二).assets/10.png)









## 4.6、分页查询

分页查询在项目开发中常见，由于数据量很大，显示屏长度有限，因此对数据需要采取分页显示方式。例如数据共有30条，每页显示5条，第一页显示1-5条，第二页显示6-10条。 

语法：

```sql
-- 方式一：显示前n条
select 字段1,字段2 from 表名 limit n

-- 方式二：分页显示
-- m:整数，表示从第几条索引开始,计算方式 :(当前页-1)*每页显示条数
-- n:整数,表示查询多少条数据
select 字段1,字段2 from 表名 limit m,n
```

实现：

```sql
-- 查询product表的前5条记录
select * from product limit 5;

-- 从第4条开始显示,显示5条(从0开始)
select * from product limit 3,5;
```

![=](黑马MySQL(二).assets/11.png)





## 4.7、insert into select

将一张表的数据导入到另一张表中，可以使用INSERT INTO SELECT语句 。

语法：

```sql
-- 把后面的查询结果插入前面的Table2表,且Table2表的字段和后面查询的字段要一致
insert into Table2(field1,field2) select value1,value2 from Table1

-- 或者(要求二者的列必须一致)
insert into Table2 select * from Table1
```

要求目标表 Table2 必须存在





























