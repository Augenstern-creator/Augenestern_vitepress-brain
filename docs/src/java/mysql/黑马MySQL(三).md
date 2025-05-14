# 1、DQL语句练习一

```sql
-- 创建数据库mydb1
create database if not exists mydb1;
-- 使用数据库mydb1
use mydb1;
-- 创建学生表
create table student(
	id int,
	name varchar(20),
	gender varchar(20),
	chinese int,
	english int,
	math int

);
-- 插入数据
insert into student values(1,'张明','男',89,78,90);
insert into student values(2,'李进','男',67,68,90);
insert into student values(3,'王五','女',81,72,91);
insert into student values(4,'李一','女',89,88,88);
insert into student values(5,'李财','女',81,78,90);
insert into student values(6,'张宝','男',80,70,90);
insert into student values(7,'黄蓉','男',70,80,90);
insert into student values(8,'大宝','女',83,73,93);
insert into student values(9,'二宝','男',84,75,96);
insert into student values(10,'三宝','男',84,74,94);
```

![](黑马MySQL(三).assets/2.png)

1. 查询表中所有学生的信息

```sql
select * from student;
```

2. 查询表中所有学生的姓名和对应的英语成绩

```sql
select name,english from student;
```

3. 过滤表中重复数据

```sql
-- 若 distinct 后面跟着的列,表示这一列重复的会被去掉
-- 若 distinct 后面跟着的*,表示这一行所有字段都重复的会被去掉
select distinct * from student;
```

4. 统计每个学生的总分

```sql
-- 正确写法
select name,chinese + english + math as total_score from student;

-- 错误写法(注意,sum() 表示对某一列进行求和)
select name,sum() from student;
```

5. 在所有学生总分数上加10分特长分

```sql
select name,(chinese + english + math + 10) as total_score from student;
```

6. 使用别名表示学生分数

```sql
-- 起别名 as 可以省略
select name,chinese '语文成绩',english '英语成绩', math '数学成绩' from student;
-- 写法二
select name,chinese as '语文成绩',english  as '英语成绩', math as '数学成绩' from student;
```

7. 查询英语成绩大于90分的同学

```sql
select * from student where english > 90;
```

8. 查询总分大于200分的所有同学

```sql
select * from student where (chinese + english + math) > 200;

-- 错误写法(先执行from,再执行 where,所以在执行 where 时别名不存在,这样写会报错)
select *, (chinese + english + math) as total_score from student where total_score > 200;
```

9. 查询英语分数在 80 - 90 之间的同学

```sql
select * from student where english between 80 and 90;


select * from student where english ≥ 80 and english ≤ 90;
```

10. 查询英语分数不在 80 - 90 之间

```sql
select * from student where not (english between 80 and 90);

select * from student where  english not between 80 and 90;

select * from student where not (english ≥ 80 and english ≤ 90);

select * from student where english ＜ 80 or english ＞ 90;
```

11. 查询数学分数为 89，90，91的同学

```sql
select * from student where math in(80,90,91);
```

12. 查询数学分数不为 89，90，91的同学

```sql
select * from student where math not in(80,90,91);

select * from student where not math in(80,90,91);
```

13. 查询所有姓李的学生英语成绩

```sql
select name,english from student where name like '李%';
```

14. 查询数学分80并且语文分80的同学

```sql
select * from student where math = 80 and chinese = 80;
```

15. 查询英语80或者总分两百的同学

```sql
select * from student where english = 80 and (chinese + math + english) = 200;
```

16. 对数学成绩降序排序后输出

```sql
select * from student order by math desc;
```

17. 对总分排序后输出，并且按从高到低的顺序输出

```sql
select * from student order by (chinese + math + english) desc;
```

18. 对姓李的学生总分成绩排序输出

```sql
select * from student where name like '李%' order by (chinese + math + english) desc;
```

19. 查询男生和女生分别有多少人，并将人数降序排序输出

```sql
select 
  gender,count(*) as total_cnt 
from 
  student 
group by 
  gender 
order by 
  total_cnt 
desc;
```



# 2、DQL语句练习二

```sql
-- 创建员工表
create table emp(
 empno int,  -- 员工编号
 ename varchar(50), -- 员工名字
 job varchar(50), -- 工作名字
 mgr int, -- 上级领导编号
 hiredate date, -- 入职日期
 sal int, -- 薪资
 comm int, -- 奖金
 deptno int  -- 部门编号

);
-- 插入数据
insert into emp values(7369,'SMITH','CLERK',7902,'1980-12-17',1800,NULL,20);
insert into emp values(7469,'RED','AUGENSE',7692,'1981-12-17',2800,200,30);
insert into emp values(7569,'PINK','OPKUO',7839,'1982-12-17',3800,300,40);
insert into emp values(7669,'YELLOW','WEWQS',8921,'1983-12-17',4800,NULL,50);
insert into emp values(7769,'KING','QWERQ',7902,'1984-12-17',5800,500,60);
insert into emp values(7869,'HACK','ZXCMK',7902,'1985-12-17',6800,NULL,70);
insert into emp values(7969,'JACK','SDAWD',7902,'1986-12-17',7800,600,80);
insert into emp values(7169,'ADAMS','SAAWQ',7902,'1987-12-17',8800,NULL,90);
insert into emp values(7269,'FORD','CLERK',7902,'1988-12-17',9800,NULL,10);
insert into emp values(7844,'SCOTT','CLERK',7902,'1989-12-17',1800,NULL,20);
insert into emp values(7969,'SMITH','CLERK',7902,'1980-12-17',2800,900,20);
insert into emp values(7069,'SMITH','CLERK',7902,'1981-12-17',3800,NULL,20);
```

![](黑马MySQL(三).assets/3.png)



1. 按员工编号升序排列不在10号部门工作的员工信息

```sql
select * from emp where deptno != 10 order by empno asc;
```

2. 查询姓名的第二个字母不是A，且薪资大于1000的员工信息，并按年薪降序排列

```sql
-- 年薪 = 薪资 × 12 + 奖金 ,奖金里面有 null 值存在,所以不能直接加null
-- ifnull(comm,0)  此函数的作用:如果奖金comm为null,将其看作0来处理
select 
  * 
from 
  emp 
where 
  ename 
not like 
  '_A%' 
and 
  sal > 1000 
order by 
  (sal*12+ ifnull(comm,0)) desc;
```

3. 求每个部门的平均薪水(**每个部门**，分组查询)

```sql
select deptno,avg(sal) from emp group by deptno;
```

4. 求各个部门的最高薪水

```sql
select deptno,max(sal) from emp group by deptno;
```

5. 求每个部门每个岗位的最高薪水

```sql
-- 两个分组,同一个岗位且属于同一个部门分组
select deptno,job,max(sal) from emp group by deptno,job;
```

6. 求平均薪水大于2000的部门编号

```sql
-- 对分组之后的结果进行筛选用 having 
-- select deptno,avg(sal) avg_sal from emp group by deptno 这查出来就是分组之后的结果
select deptno,avg(sal) avg_sal from emp group by deptno having avg_sal > 2000;
```

7. 将部门平均薪水大于1500的部门编号列出来，按部门平均薪水降序排列

```sql
select deptno,avg(sal) avg_sal from emp group by deptno having avg_sal > 1500 order by avg_sal desc;
```

8. 选择公司中有奖金的员工姓名、薪资

```sql
select * from emp where comm is not null;
```

9. 查询员工最高工资和最低工资的差距

```sql
select max(sal) - min(sal) as '薪资差距' from emp;
```













# 3、DQL正则表达式

正则表达式(regular expression)描述了一种字符串匹配的规则，正则表达式本身就是一个字符串，使用这个字符串来描述、用来定义匹配规则，匹配一系列符合某个句法规则的字符串。在开发中，正则表达式通常被用来检索、替换那些符合某个规则的文本。

MySQL通过`REGEXP`关键字支持正则表达式进行字符串匹配。

| 模式       | 描述                                                         |
| ---------- | ------------------------------------------------------------ |
| ^          | 匹配输入字符串的开始位置                                     |
| $          | 匹配输入字符串的结束位置                                     |
| .          | 匹配除 "\n" 之外的任何**单个**字符。                         |
| [...]      | 字符集合。匹配所包含的任意一个字符。例如， '[abc]' 可以匹配 "plain" 中的 'a'。 |
| [^...]     | 负值字符集合。匹配未包含的任意字符。例如，`'[^abc]'`可以匹配 "plain" 中的 'p'。 |
| p1\|p2\|p3 | 匹配p1或p2或p3。例如：'z\|food' 能匹配 "z" 或 "food"。 '(z\|f)ood' 则匹配 "zood" 或者 "food" |
| *          | 匹配前面的子表达式零次或多次。例如：`zo*` 能匹配 "z" 以及 "zoo" 。* 等价于{0,} |
| +          | 匹配前面的子表达式一次或多次。例如：`zo+ ` 能匹配 "zo" 以及 "zoo",但是不能匹配 "z"。+等价于 {1，} |
| {n}        | n 是一个非负整数。匹配确定的 n 次。例如，'o{2}' 不能匹配 "Bob" 中的 'o'，但是能匹配 "food" 中的两个 o。 |
| {n,m}      | m 和 n 均为非负整数，其中n <= m。最少匹配 n 次且最多匹配 m 次 |

```sql
-- ^ 在字符串开始处进行匹配
-- 含义: abc 是否以 a 开头
select 'abc' regexp '^a';  -- 结果为1,表示结果为真

-- 判断哪些商品的名字是以海开头
select * from product where pname regexp '^海';
```

![](黑马MySQL(三).assets/1.png)



```sql
-- $ 在字符串末尾开始匹配
-- 含义: abc 是否以 a 结尾
select 'abc' regexp 'a$';  -- 结果为0,表示否

-- 判断哪些商品的名字是以水结尾
select * from product where pname regexp '水$';
```



```sql
-- .匹配任意单个字符(除了换行符之外)
-- 含义: abc 中是否 b 前面有一个字符
select 'abc' regexp '.b';  -- 1

select 'abc' regexp 'a.';  -- 1
```



```sql
-- [...]匹配括号内的任意单个字符
-- 含义: xyz 中任意单个字符是否有在 abc 中出现呢
select 'abc' regexp '[xyz]'; -- 0
select 'abc' regexp '[xaz]'; -- 1
```





```sql
-- [^...] 注意 ^ 符合只有在 [] 内才是取反的意思,在别的地方都是表示开始处匹配
-- 含义: abc 里面任意单个字符都没有在前面出现
select 'a' regexp '[^abc]';   -- 0
select 'x' regexp '[^abc]';   -- 1


select 'abc' regexp '[^a]';   -- 1
```



```sql
-- a* 匹配0个或多个a,包括空字符串。可以作为占位符使用,有没有指定字符都可以匹配到数据
select 'stab' regexp '.ta*b'; -- 1
select 'stb' regexp '.ta*b'; -- 1
select '' regexp 'a*'; -- 1
```



```sql
-- a+ 匹配1个或多个a,但是不包括空字符
select 'stab' regexp '.ta+b';  -- 1
select 'stb' regexp '.ta+b';   -- 0
```



```sql
-- a? 匹配0个或一个a(只能出现一个或者0个)

select 'stab' regexp '.ta?b';  -- 1
select 'stb' regexp '.ta?b';   -- 1
select 'staab' regexp '.ta?b';   -- 0
```



```sql
-- a1|a2 匹配a1或者a2

select 'a' regexp 'a|b';  -- 1

```





































