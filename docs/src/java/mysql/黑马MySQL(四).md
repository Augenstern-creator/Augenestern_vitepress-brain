# 1、多表操作

MySQL多表之间的关系可以概括为：一对一、一对多/多对一关系，多对多

## 1.1、一对一

- 一个学生只有一张身份证；一张身份证只能对应一学生。
- 在任一表中添加唯一外键，指向另一方主键，确保一对一关系。
- **一般一对一关系很少见，遇到一对一关系的表最好是合并表。**

如下方两张表，左边表的一行对应右边表的一行。在这种一对一的情况下，我们可以将两张表合二为一：将身份证表的id、number字段覆盖学生表的 cid 字段。

![](黑马MySQL(四).assets/1.png)







## 1.2、一对多/多对一

部门和员工

分析：一个部门有多个员工，一个员工只能对应一个部门

实现原则：==在多的一方建立外键，指向一的一方的主键==

例如下方两张表，我们在员工表建立外键 dept_id, 指向部门表的主键 deptno

![](黑马MySQL(四).assets/2.png)











## 1.3、多对多

学生和课程

分析：一个学生可以选择很多门课程，一个课程也可以被很多学生选择

原则：**多对多关系实现需要借助第三张中间表。中间表至少包含两个字段，将多对多的关系，拆成一对多的关系，中间表至少要有两个外键，这两个外键分别指向原来的那两张表的主键**。

如下表，学生表和课程表是多对多关系，我们使用第三张表作为中间表，中间表有两个外键，指向学生表和课程表的主键。

![](黑马MySQL(四).assets/4.png)



# 2、外键约束

MySQL 外键约束（**FOREIGN KEY**）是表的一个特殊字段，经常与主键约束一起使用。对于两个具有关联关系的表而言，相关联字段中**主键所在的表就是主表（父表），外键所在的表就是从表（子表）。**

外键用来建立主表与从表的关联关系，为两个表的数据建立连接，约束两个表中数据的一致性和完整性。比如，一个水果摊，只有苹果、桃子、李子、西瓜等 4 种水果，那么，你来到水果摊要买水果就只能选择苹果、桃子、李子和西瓜，其它的水果都是不能购买的。



## 2.1、特点

定义一个外键时，需要遵守下列规则：

- 主表必须已经存在于数据库中，或者是当前正在创建的表
- **必须为主表定义主键**
- **主键不能包含空值，但允许在外键中出现空值。**
- 在主表的表名后面指定列名或列名的组合。这个列或列的组合必须是主表的主键或候选键
- 外键中列的数目必须和主表的主键中列的数目相同
- 外键中列的数据类型必须和主表主键中对应列的数据类型相同

![](黑马MySQL(四).assets/3.png)







## 2.2、创建外键

### 2.2.1、方式一

方式一：**在创建表时设置外键约束**

在 create table 语句中，通过 foreign key 关键字来指定外键，格式如下：

```sql
[constraint <外键名>] foreign key 字段名 references <主表名> 主键列
```

实现：

```sql
-- 创建部门表(主表)
CREATE TABLE IF NOT EXISTS dept(
    `deptno` VARCHAR(20) PRIMARY KEY, -- 部门号
    `name` VARCHAR(20) -- 部门名字
);

-- 创建员工表(从表)
CREATE TABLE IF NOT EXISTS emp(
	
    `eid` VARCHAR(20) PRIMARY KEY,	-- 员工编号
    `ename` VARCHAR(20), 		-- 员工姓名
    `age` INT,			-- 员工年龄
    `dept_id` VARCHAR(20), -- 员工所属部门
    
    -- 创建外键名称为 emp_fk , 是从表中的dept_id依赖主表中的deptno 
     constraint emp_fk FOREIGN KEY (dept_id) references dept(deptno) -- 外键约束
);
```

![](黑马MySQL(四).assets/5.png)









### 2.2.2、方式二

方式二：在创建表时设置外键约束。

外键约束也可以在修改表时添加，但是添加外键约束的前提是：从表中外键列中的数据必须与主表中主键列的数据一致或者是没有数据。

语法：

```sql
alter table <数据表名> add constraint <外键名> foreign key (<列名>) references <主表名>(<列名>)
```

实现：

```sql
-- 创建部门表(主表)
CREATE TABLE IF NOT EXISTS dept(
    `deptno` VARCHAR(20) PRIMARY KEY, -- 部门号
    `name` VARCHAR(20) -- 部门名字
);

-- 创建员工表(从表)
CREATE TABLE IF NOT EXISTS emp(
	
    `eid` VARCHAR(20) PRIMARY KEY,	-- 员工编号
    `ename` VARCHAR(20), 		-- 员工姓名
    `age` INT,			-- 员工年龄
    `dept_id` VARCHAR(20), -- 员工所属部门
    
);


-- 创建外键约束
-- 给表emp添加外键名为dept_id_fk, 外键dept_id依赖主键deptno
alter table emp add constraint dept_id_fk foreign key(dept_id) references dept(deptno)
```



## 2.3、在外键约束下的数据操作

### 2.3.1、添加数据

首先我们添加数据

```sql
-- 1.必须先给主表先添加数据
insert into dept values('1001','研发部');
insert into dept values('1002','销售部');
insert into dept values('1003','财务部');
insert into dept values('1004','人事部');


-- 2.给从表添加数据
-- 注意给从表添加数据时，外键列的值不能随便写，必须依赖主表的主键列
insert into emp values('1','乔峰',20,'1001');
insert into emp values('2','段誉',20,'1001');
insert into emp values('3','虚竹',20,'1001');
insert into emp values('4','阿紫',20,'1001');
insert into emp values('5','扫地僧',20,'1001');
insert into emp values('1','小林',20,'1005'); -- 这个因为主表的主键列不存在1005,所以此条数据是插入不进去的
```

![](黑马MySQL(四).assets/6.png)





### 2.3.2、删除数据

注意：

1. 主表的数据被从表依赖时，不能删除
2. 从表的数据可以随便删除

```sql
delete from dept where deptno = '1001';		-- 不可以删除(因为1001被从表依赖了)
delete from dept where deptno = '1004';		-- 可以删除(因为1004没有被从表依赖)
delete from emp where eid = '7';			-- 可以删除(删除从表可以随便删除)
```



### 2.3.3、删除外键约束

当一个表中不需要外键约束时，就需要从表中将其删除。外键一旦删除，就会解除主表和从表间的关联关系。

格式：

```sql
alter table <从表名> drop foreign key <外键约束名>;
```

实现：

```sql
-- 删除表emp的外键 emp_fk
alter table emp drop foreign key  emp_fk;
```







## 2.4、外键约束-多对多关系🔥

在多对多关系中，A表的一行对应B的多行，B表的一行对应A表的多行，我们要新增加一个中间表，来建立多对多关系。

![](黑马MySQL(四).assets/7.png)



```sql
-- 创建学生表和课程表(多对多)
-- 1.创建学生表student(左侧主表)
create table if not exists student(
	
    sid int primary key auto_increment,
    name varchar(20),
    age int,
    gender varchar(20)
);


-- 2.创建课程表course(右侧主表)
create table course(

	cid int primary key auto_increment,
    cidname varchar(20)
);

-- 3.创建中间表 student_course/score(从表)
create table score(
	
    sid int,
    cid int,
    score double
);

-- 4.建立外键约束(2次)
-- 给从表score添加外键约束,两个外键约束依赖两个主表
alter table score add foreign key(sid) references student(sid);
alter table score add foreign key(cid) references course(cid);
```

![](黑马MySQL(四).assets/8.png)



- 修改和删除时，中间从表可以随便删除修改，但是两边的主表受从表依赖的数据不能删除或者修改

```sql
-- 给学生表student添加数据
insert into student values(1,'小龙女',18,'女'),(2,'阿紫',19,'女'),(3,'周芷若',20,'男');
-- 给课程表course添加数据
insert into course values(1,'语文'),(2,'数学'),(3,'英语');
-- 给中间表score添加数据
insert into score values(1,1),(1,2),(2,1),(2,3),(3,2),(3,3);

insert into score values(4,1)  -- 报错,因为sid没有4的
```



![](黑马MySQL(四).assets/9.png)











# 3、多表联合查询🔥

多表查询就是同时查询两个或两个以上的表，因为有的时候用户在查看数据的时候,需要显示的数据来自多张表。多表查询有以下分类：

1. 交叉连接查询(了解)

   ```sql
   select * from A,B
   ```

2. 内连接查询(inner可以省略)

   ```sql
   select * from A inner join B on 条件;
   ```

3. 外连接查询(outer 可以省略)

   ```sql
   -- 左外连接 left outer join
   select * from A left outer join B on 条件;
   
   -- 右外连接 right outer join
   select * from A right outer join B on 条件;
   
   -- 满外连接 full outer join
   select * from A full outer join B on 条件;
   ```

4. 子查询

   select 的嵌套查询

5. 表自关联

   将一张表当成多张表来用

![](黑马MySQL(四).assets/10.png)

## 3.1、准备查询数据

接下来准备多表查询需要数据，注意，**外键约束对多表查询并无影响**。

```sql
-- 创建部门表
create table if not exists dept(
	
    `deptno` varchar(20) primary key,	-- 部门号
    `name` varchar(20) -- 部门名字
);

-- 创建员工表
creae table if not exusts emp(

    eid varchar(20) primary key,	-- 员工编号
    ename varchar(20),		-- 员工名字
    age int,		-- 员工年龄
    dept_id varchar(20)	 -- 员工所属部门
);

-- 给 dept 表添加数据
insert into dept values('1001','研发部');
insert into dept values('1002','销售部');
insert into dept values('1003','财务部');
insert into dept values('1004','人事部');

-- 给emp表添加数据
insert into emp values('1','乔峰',20,'1001');
insert into emp values('2','段誉',20,'1002');
insert into emp values('3','虚竹',20,'1003');
insert into emp values('4','阿紫',20,'1004');
insert into emp values('5','扫地僧',20,'1001');
```

![](黑马MySQL(四).assets/6.png)



## 3.2、交叉连接查询

**假如A表有m行数据，B表有n行数据，则返回m*n行数据**。例如下面的例子中，就是每个员工和每个部门挨个匹配。

格式：

```sql
select * from 表1,表2,表3...;
```

实现：

```sql
-- 交叉连接查询
select * from dept,emp;
```

![](黑马MySQL(四).assets/11.png)

**交叉连接二查询会产生很多冗余的数据，后期的其他查询可以在该集合的基础上进行条件筛选**



## 3.3、内连接查询

![](黑马MySQL(四).assets/12.png)

格式：

```sql
-- 隐式内连接
select * from A,B where 条件;


-- 显式内连接(常用)
select * from A inner join B on 条件;
```

实现：

```sql
-- 查询每个部门的所属员工(两张表的肯定有一列是相同的)
select * from dept inner join emp on dept.deptno = emp.dept_id;
```

![](黑马MySQL(四).assets/13.png)



```sql
-- 查询研发部和销售部的所属员工
select * from dept join emp on dept.deptno = emp.dept_id and name in('研发部','销售部');
```

![](黑马MySQL(四).assets/14.png)



```sql
-- 查询每个部门的员工数，并升序排序
select 
	deptno,count(*) as total_cnt 
from 
	dept inner join emp on dept.deptno = emp.dept_id 
group by 
	deptno 
order by total_cnt;


-- 查询人数大于等于3的部门,并按照人数降序排序
select deptno,count(*) as total_cnt from dept inner join emp on dept.deptno = emp.dept_id group by deptno having total_cnt >= 3 order by total_cnt desc;
```





## 3.4、外连接查询

**外连接分为左外连接、右外连接**

![](黑马MySQL(四).assets/15.png)



**左外连接：把左表的数据全部输出，右表有对应的数据就输出**

```sql
select * from A left outer join B on 条件;
```

右外连接：

```sql
select * from A right outer join B on 条件;
```

实现：

```sql
-- 查询哪些部门有员工，哪些部门没有员工
select * from dept left outer join emp on dept.deptno = emp.dept_id;
```

![](黑马MySQL(四).assets/16.png)



```sql
-- 查询哪些员工有对应的部门,哪些没有
select * from dept right outer join emp on dept.deptno = emp.dept_id;
```



## 3.5、子查询

子查询就是指的在一个完整的查询语句之中，嵌套若干个不同功能的小查询，从而一起完成复杂查询的一种编写形式，通俗一点就是**包含select嵌套的查询**。

子查询可以返回的数据类型一共分为四种：

1. 单行单列：返回的是一个具体列的内容，可以理解为一个单值数据
2. 单行多列：返回一行数据中多个列的内容
3. 多行单列：返回多行记录之中同一列的内容，相当于给出了一个操作范围
4. 多行多列：查询返回的结果是一张临时表

结果是如下图情况的，我们可以再次查询

![](黑马MySQL(四).assets/17.png)

```sql
-- 查询年龄最大的员工信息,显示信息包含员工号、员工名字、员工年龄
-- select max(age) from emp 找寻最大的员工年龄
select eid,ename,age from emp where age = (select max(age) from emp);

-- 分步解释
select max(age) from emp; -- 20
select eid,ename,age from emp where age = 20;

-- 我们查出最大年龄为20,只要给条件当某个员工年龄匹配到20,我们就当他是最大年龄的员工
select eid,ename,age from emp where age = (select max(age) from emp);
```

![](黑马MySQL(四).assets/18.png)



```sql
-- 查询研发部和销售部的员工信息,包含员工号、员工名字
-- 方式一:多表查询
select * from dept a join emp b on a.deptno = b.dept_id and (name = '研发部' or name = '销售部');

-- 方式二：子查询
select * from emp where dept_id in (select deptno from dept where name = '研发部' or name = '销售部');

-- 方式二步骤解析
-- 1. 先查询研发部和销售部的部门号 1001、1002
select deptno from dept where name = '研发部' or name = '销售部';
-- 2. 查询哪个员工的部门号是 1001、1002
select * from emp where dept_id in ('1001','1002');
```

![](黑马MySQL(四).assets/19.png)



```sql
-- 查询研发部30岁以下的员工信息
-- 方式一:关联查询
select * from dept a join emp b on a.deptno = b.dept_id and (name = '研发部' and age < 20);

-- 子查询
-- 1.在部门表中查询研发部信息
select * from dept where name = '研发部';
-- 2.在员工表中查询年龄小于20岁的员工信息
select * from emp where age < 30;
-- 3.将以上两个查询的结果进行关联查询
select * from (select * from dept where name = '研发部') t1 join (select * from emp where age < 30) t2 on t1.deptno = t2.dept_id;
```



### 3.5.1、子查询关键字

在子查询中，有一些常用的逻辑关键字，这些关键字可以给我们提供更丰富的查询功能，主要关键字如下:

- all 关键字
- any 关键字
- some 关键字
- in 关键字
- exists 关键字

### 3.5.2、all

格式：

```sql
select * from <表名> where c > all(查询语句)
-- 等价于
select * from <表名> where c > result1 and c > result2 and c > result3
```

特点：

- all：与子查询返回的所有值比较，为true则返回true
- all 可以与 =、 > 、>= 、<、<= 、<> 结合来使用，分别表示等于、大于、大于等于、小于、小于等于、不等于其中的的所有数据
- all 表示指定列中的值必须要大于子查询集的每一个值，即必须要大于子查询集的最大值。如果是小于号即小于子查询集的最小值。

实现：

```sql
-- 查询年龄大于 '1003' 部门所有年龄的员工信息
select * from emp where age > all(select age from emp where dept_id = '1003');

-- 查询不属于任何一个部门的员工信息
select * from emp where dept_id != all(select deptno from dept);
```



### 3.5.3、any

```sql
select * from <表名> where c > any(查询语句)
-- 等价于
select * from <表名> where c > result1 or c > result2 or c > result3
```

特点：

- 表示指定列中的值要大于子查询中的任意一个值，即必须要大于子查询集中的最小值。
- **some 和 any 的作用一样， some 可以理解为 any 的别名** (any 用的更多)。

实现：

```sql
-- 查询年龄大于'1001'部门任意一个员工年龄的员工信息
select * from emp where age > all(select age from emp where dept_id = '1001');
```







### 3.5.4、in

```sql
select * from <表名> where c in(查询语句)
-- 等价于
select * from <表名> where c = result1 or c = result2 or c = result3
```

特点：

- IN关键字，用于判断某个记录的值，是否在指定的集合中
- 在IN关键字前边加上not可以将条件反过来

操作：

```sql
-- 查询研发部和销售部的员工信息
select * from emp where dept_id in(select deptno from dept where name = '研发部' or name = '销售部');
```





### 3.5.5、exists

```sql
select * from <表名> where  exists(查询语句)
```

特点：

- 该子查询如果“有数据结果”(至少返回一行数据)， 则该EXISTS() 的结果为“true”，外层查询执行
- 该子查询如果“没有数据结果”（没有任何数据返回），则该EXISTS()的结果为“false”，外层查询不执行
- EXISTS后面的子查询不返回任何实际数据，只返回真或假，当返回真时 where条件成立
- 注意，EXISTS关键字，比IN关键字的运算效率高，因此，在实际开发中，特别是大数据量时，推荐使用EXISTS关键字

实现：

```sql
-- 查询公司是否有大于18岁的员工，有则输出
select * from emp a where exists(select * from emp b where a.age > 18); 

-- 解析
select * from emp b where a.age > 18； -- 这个结果如果有数据,则外层查询语句 select * from emp 才执行

-- 所以实际上如果exists() 有数据,相当于执行了 select * from emp
-- 如果 exists() 没有数据,则相当于不执行
```







# 4、自关联查询

MySQL有时在信息查询时需要进行对表自身进行关联查询，即一张表自己和自己关联，一张表当成多张表来用。**注意自关联时表必须给表起别名。**

格式：

```sql
select 字段列表 from 表1 a [left] join 表1 b on 条件;
```

实现：

```sql
-- 创建表,并建立自关联约束
create table t_sanguo(
	
    eid int primary key,   -- 员工编号
    ename varchar(20),     -- 员工名字
    manager_id int,        -- 上级领导编号
    -- manager_id 是外键,受到主键 eid 的约束.领导编号也属于员工编号
    foreign key(manager_id) references t_sanguo(eid) -- 添加自关联约束
);

-- 添加数据
insert into t_sangguo values(1,'刘备',NULL);
insert into t_sangguo values(2,'关羽',1);
insert into t_sangguo values(3,'张飞',2);
insert into t_sangguo values(4,'曹操',2);
insert into t_sangguo values(5,'许诸',1);
insert into t_sangguo values(6,'典韦',5);
insert into t_sangguo values(7,'孙权',5);

-- 进行关联查询
-- 1.查询每个三国人物及他的上级领导信息
select a.ename,b.ename from t_sanguo a join t_sanguo b on a.manager_id = b.eid;

-- 2.查询所有人物、上级、上上级
select 
	a.ename,b.ename,c.ename 
from t_sanguo a 
	left join t_sanguo b on a.manager_id = b.eid
	left join t_sanguo c on b.manager_id = c.eid;
```







# 5、多表查询练习









































# 6、MySQL函数

## 6.1、聚合函数

`group_concat()` 函数首先根据 group by 指定的列进行分组，并且用分隔符分隔，将同一个分组中的值连接起来，返回一个字符串结果。

格式：

```sql
group_concat([distinct] 字段名 [order by 排序字段 asc/desc] [separator '分隔符']) 
```

说明：

- 使用distinct可以排除重复值；
- 如果需要对结果中的值进行排序，可以使用 order by子句
- separator是一个字符串值，默认为逗号

```sql
create table emp(
    emp_id int primary key auto_increment comment '编号',
    emp_name char(20) not null default '' comment '姓名',
    salary decimal(10,2) not null default 0 comment '工资',
    department char(20) not null default '' comment '部门'
);

insert into emp(emp_name,salary,department) 
values('张晶晶',5000,'财务部'),('王飞飞',5800,'财务部'),('赵刚',6200,'财务部'),('刘小贝',5700,'人事部'),('王大鹏',6700,'人事部'),('张小斐',5200,'人事部'),('刘云云',7500,'销售部'),('刘云鹏',7200,'销售部'),('刘云鹏',7800,'销售部');

-- 将所有员工的名字合并成一行
select group_concat(emp_name) from emp;

-- 指定分隔符合并
select department,group_concat(emp_name separator ';' ) from emp group by department; 

-- 指定排序方式和分隔符 
select department,group_concat(emp_name order by salary desc separator ';' ) from emp group by department;
```

![](黑马MySQL(四).assets/20.png)





## 6.2、数学函数

| 函数名                      | 描述                                             | 实例                                                         |
| --------------------------- | ------------------------------------------------ | ------------------------------------------------------------ |
| abs(x)                      | 返回x的绝对值                                    | 返回-1的绝对值<br>select ABS(-1)  -- 1                       |
| celf(x)                     | 返回大于或等于x的最小整数(向上取整)              | select celf(1.5) -- 2                                        |
| floor(x)                    | 返回小于或等于x的最大整数(向下取整)              | select floor(1.5) -- 1                                       |
| greatest(expr1,expr2......) | 返回列表中的最大值                               | select greatest(3,12,34) -- 34<br>返回以下字符串列表的最大值<br>select greatest("Google","Runoob") -- Runoob |
| least(expr1,expr2......)    | 返回列表中的最小值                               | select greatest(3,12,34) -- 3<br/>返回以下字符串列表的最小值<br/>select greatest("Google","Runoob","Apple") -- Apple |
| max(expression)             | 返回字段 expression 中的最大值                   | select max(price) from products;                             |
| min(expression)             | 返回字段 expression 中的最小值                   |                                                              |
| mod(x，y)                   | 返回 x 除以 y 以后的余数                         | select mod(5,2) -- 1                                         |
| pi()                        | 返回圆周率                                       | select pi()                                                  |
| pow(x,y)                    | 返回 x 的 y 次方                                 | select pow(2,3) -- 8                                         |
| rand()                      | 返回0到1的随机数                                 | select rand()                                                |
| round()                     | 返回离x最近的整数(遵循四舍五入)                  | select round(1.2323) -- 1                                    |
| round(x,y)                  | 返回指定位数的小数(遵循四舍五入)                 | select round(1.23456,3) -- 1.235                             |
| truncate(x,y)               | 返回数值 x 保留到小数点后 y 位的值(不会四舍五入) | select truncate(1.23456,3) --1.234                           |





## 6.3、字符串函数

| 函数                   | 描述                                                         | 实例                                                         |
| ---------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| char_length(s)         | 返回字符串 s 的字符数                                        | select char_length("RUNOOB") -- 6                            |
| character_length(s)    | 返回字符串 s 的字符数                                        | select character_length("RUNOOB")                            |
| concat(s1,s2....)      | 字符串 s1,s2 等多个字符串合并为一个字符串                    | select concat("SQL","Runoob")                                |
| concat_ws(x,s1,s2....) | 同 concat 函数一样，但是每个字符串之间要加上 x，x可以是分隔符 | select concat_ws("-","SQL","is")                             |
| field(s,s1,s2....)     | 返回第一个字符串s在字符串列表(s1，s2...)中的位置             | 返回字符串 c 在列表值中的位置：<br>select field("c","a","b","c") -- 3 |
| ltrim(s)               | 去掉字符串 s 开始处的空格                                    | select ltrim("    RUNOOB")                                   |
| mid(s,n,len)           | 从字符串 s 的 n 位置截取长度为 len 的子字符串                | 从字符串 RUNOOB 中的第 2 个位置截取<br>select mid("RUNOOB", 2, 3) -- UNO |
| position(s1 in s)      | 从字符串 s 中获取 s1 的开始位置                              | 返回字符串 abc 中 b 的位置<br>select position('b' in 'abc') -- 2 |
| replace(s,s1,s2)       | 将字符串 s2 替代字符串 s 中的字符串 s1                       | 将字符串 abc 中的字符 a 替换为字符 x<br>select replace('abc','a','x') --xbc |
| reverse(s)             | 将字符串s的顺序反过来                                        | 将字符串 abc 的顺序反过来<br>select reverse('abc') -- cba    |
| right(s,n)             | 返回字符串 s 的后 n 个字符                                   | 返回字符串 runoob 的后两个字符<br>select right('runoob',2) -- ob |
| rtrim(s)               | 去掉字符串 s 结尾处的空格                                    | select rtrim("RUNOOB    ")                                   |
| strcmp(s1,s2)          | 比较字符串 s1 和 s2，如果 s1 与 s2 相等返回 0 ，如果 s1>s2 返回 1，如果 s1<s2 返回 -1 | select strcmp("runoob","runoob") -- 0                        |
| substr(s,start,length) | 从字符串 s 的 strat 位置截取长度为 length 的子字符串         |                                                              |
| trim(s)                | 去掉字符串 s 开始和结尾处的空格                              |                                                              |
| ucase                  | 将字符串转换为大写                                           |                                                              |
| upper(s)               | 将字符串转换为大写                                           |                                                              |
| lcase(s)               | 将字符串 s 的所有字母变成小写字母                            |                                                              |
| lower(s)               | 将字符串 s 的所有字母变成小写字母                            |                                                              |







## 6.4、日期函数

| 函数名                                          | 描述                                  | 实例                                                         |
| ----------------------------------------------- | ------------------------------------- | ------------------------------------------------------------ |
| unix_timestamp()                                | 返回从1970-01-01 00:00:00到当前毫秒值 | select unix_timestamp()                                      |
| unix_timestamp(date_string)                     | 将制定日期转为毫秒值时间戳            | select unix_timestamp('2001-08-09 13:01:03')                 |
| from_unixtime(bigint unixtime [,string format]) | 将毫秒值时间戳转为指定格式日期        | select from_unixtime(997333263,'%Y-%m-%d %H:%i:%s')          |
| curdate()                                       | 返回当前日期                          | select curdate()                                             |
| current_time                                    | 返回当前时间                          | select current_time                                          |
| current_timestamp()                             | 返回当前日期和时间                    | select current_timestamp()                                   |
| date()                                          | 从日期或日期时间表达式中提取日期值    | select date("2023-01-01") -- 2023-01-01                      |
| datediff(d1,d2)                                 | 计算日期d1 -> d2 之间相隔的天数       |                                                              |
| timediff(time1,time2)                           | 计算时间差值                          |                                                              |
| data_format(d,f)                                | 按表达式 f 的要求显示日期 d           | select date_format('2011-11-11 11:11:11','%Y-%m-%d %r') -- 2011-11-11 11:11:11 AM |
| str_to_date(string,format_mask)                 | 将字符串转变为日期                    | select str_to_date("August 10 2017","%M %d %Y") -- 2017-08-10 |
| date_sub(date,interval expr type)               | 函数从日期减去指定的时间间隔          | Orders 表中 OrderDate 字段减去 2 天<br>select OrderId,date_sub(OrderDate,interval 2 day) from Orders |



## 6.5、控制流函数

### 6.5.1、if

| 格式                | 解释                                                         | 案例                             |
| ------------------- | ------------------------------------------------------------ | -------------------------------- |
| if(expr,v1,v2)      | 如果表达式 expr 成立，返回结果 v1；否则，返回结果 v2         | select if(1>0,'正确','错误')     |
| ifnull(v1,v2)       | 如果 v1 的值不为 NULL，则返回 v1，否则返回 v2                | select ifnull(null,'Hello Word') |
| isnull(expression)  | 判断表达式是否为 NULL                                        | select isnull(null) -- 1         |
| nullif(expr1,expr2) | 比较两个字符串，如果字符串 expr1 与 expr2 相等 返回 NULL，否则返回 expr1 | select nullif(25,25)             |









### 6.5.2、case when 语句

```sql
case expression
	when condition1 then result1
	when condition2 then result2
	...
	else result
end
```

- case 表示函数开始，end 表示函数结束。
- 如果 condition1 成立，则返回 result1 。如果 condition2 成立，则返回 result2，当全部不成立则返回 result。而当有一个成立之后，后面的就不执行了

```sql
select case 100
	when 50 then 'tom' 
	when 100 then 'mary'
	else 'tim'
end
```

---

实际案例：

```sql
-- 创建订单表
create table orders(
 oid int primary key, -- 订单id
 price double, -- 订单价格
 payType int -- 支付类型(1:微信支付 2:支付宝支付 3:银行卡支付 4：其他)
);

insert into orders values(1,1200,1);
insert into orders values(2,1000,2);
insert into orders values(3,200,3);
insert into orders values(4,3000,1);
insert into orders values(5,1500,2);

-- 方式一
select 
*  ,
case 
  when payType=1 then '微信支付' 
    when payType=2 then '支付宝支付' 
    when payType=3 then '银行卡支付' 
    else '其他支付方式' 
end  as payTypeStr
from orders;

-- 方式二
select 
*  ,
case payType
  when 1 then '微信支付' 
    when 2 then '支付宝支付' 
    when 3 then '银行卡支付' 
    else '其他支付方式' 
end  as payTypeStr
from orders;

```



































































































