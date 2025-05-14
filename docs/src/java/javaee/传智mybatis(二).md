# 1、分页插件

## 1.1、分页插件介绍

在 MyBatis 种实现分页常用的方式有两种，一是利用数据库的分页SQL语句实现分页(传统分页方式),二是利用第三方插件PageHelper实现分页查询。使用传统方式实现分页查询，需要在SQL语句种使用分页关键字，使用第三方插件实现分页查询，SQL语句无需使用分页关键字。

- 分页可以将很多条结果进行分页显示。 
- 如果当前在第一页，则没有上一页。如果当前在最后一页，则没有下一页。 
- 需要明确当前是第几页，这一页中显示多少条结果。    
- MyBatis分页插件总结
  1. 在企业级开发中，分页也是一种常见的技术。而目前使用的 MyBatis 是不带分页功能的，如果想实现分页的 功能，需要我们手动编写 LIMIT 语句。但是不同的数据库实现分页的 SQL 语句也是不同的，所以手写分页 成本较高。这个时候就可以借助分页插件来帮助我们实现分页功能。 
  2. PageHelper：第三方分页助手。将复杂的分页操作进行封装，从而让分页功能变得非常简单。    

## 1.2、传统方式分页

- `limit`
- 参数
  - 当前页（ **(当前页-1)*每页显示的条数** ）
  - 每页显示的条数

```sql
-- 第一页,每页显示三条
select * from student limit 0,3;
-- 第二页,每页显示三条
select * from student limit 3,3;
-- 第三页,每页显示三条
select * from student limit 6,3;
```



1. mapper

```java
/**
* 分页查询用户列表
* @param map
* @return
*/
List<User> findUserListByPage(Map<String,Object> map);
```

2. mapper.xml

```xml
<!-- 传统方式分页 -->
<select id="findUserListByPage" resultType="com.bdqn.entity.User">
    select * from smbms_user
    <if test="start!=null and size!=null">
    	limit #{start},#{size}
    </if>
</select>
```

3. 测试类

```java
@Test
public void test8(){
    int pageNo =1;//当前页码
    int pageSize = 5;//每页显示数量
    //获取SqlSession
    SqlSession sqlSession = MyBatisUtil.createSqlSession();
    try {
        //获取UserMapper实例
        UserMapper mapper = sqlSession.getMapper(UserMapper.class);
        //创建map集合
        Map<String,Object> map = new HashMap<String,Object>();
        map.put("start",(pageNo-1)*pageSize);//分页公式：（当前页码-1）* 每页显示数量
        map.put("size",pageSize);
        //调用动态查询的方法
        List<User> userList = mapper.findUserListByPage(map);
        //循环遍历
        for (User user : userList) {
        	System.out.println(user);
        }
    } catch (Exception e) {
    	e.printStackTrace();
    } finally {
    //关闭资源
    	MyBatisUtil.closeSqlSession(sqlSession);
    }
}
```





## 1.3、分页插件的使用

MyBatis可以使用第三方的插件来对功能进行扩展，分页助手PageHelper是将分页的复杂操作进行封装，使用简单的方式即可获得分页的相关数据

开发步骤：

1. 导入与PageHelper相关的jar包

```xml
<!-- https://mvnrepository.com/artifact/com.github.jsqlparser/jsqlparser -->
<dependency>
    <groupId>com.github.jsqlparser</groupId>
    <artifactId>jsqlparser</artifactId>
    <version>3.1</version>
</dependency>



<!-- https://mvnrepository.com/artifact/com.github.pagehelper/pagehelper -->
<dependency>
    <groupId>com.github.pagehelper</groupId>
    <artifactId>pagehelper</artifactId>
    <version>5.2.0</version>
</dependency>
```

2. 在mybatis核心配置文件中配置PageHelper插件

```xml
<!--集成分页助手插件-->
<!--注意这里要写成PageInterceptor,5.0之前的版本都是写PageHelper,5.0之后要换成PageInterceptor-->
<plugins>
	<plugin interceptor="com.github.pagehelper.PageInterceptor">
    	<!--reasonable：分页合理化参数，默认值为false。
			当该参数设置为 true 时，pageNum<=0 时会查询第一页，
			pageNum>pages（超过总数时），会查询最后一页。
			默认false 时，直接根据参数进行查询。-->
		<property name="reasonable" value="true"/>
    </plugin>
</plugins>
```

3. 测试分页数据获取

```java
public void selectPaging() throws Exception{
    //1.加载核心配置文件
    InputStream is = Resources.getResourceAsStream("MyBatisConfig.xml");
    //2.获取SqlSession工厂对象
    SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(is);
    //3.通过工厂对象获取SqlSession对象
    SqlSession sqlSession = sqlSessionFactory.openSession("true");
    //4.获取StudentMapper接口的实现类对象
    StudentMapper mapper = sqlSession.getMapper(StudentMapper.class);
    //5.调用实现类的方法,接受结果
    List<Student> list = mapper.selectAll();
    //通过分页助手来实现分页功能
    //第一页:显示3条数据
    PageHelper.startPage(1,3);
    //第二页:显示3条数据
    PageHelper.startPage(2,3);
    //第二页:显示3条数据
    PageHelper.startPage(3,3);
    //6.处理结果
    for(Student student:list){
        System.out.println(student);
    }
}
```



## 1.4、分页插件的参数获取

```java
public void selectPaging() throws Exception{
    //1.加载核心配置文件
    InputStream is = Resources.getResourceAsStream("MyBatisConfig.xml");
    //2.获取SqlSession工厂对象
    SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(is);
    //3.通过工厂对象获取SqlSession对象
    SqlSession sqlSession = sqlSessionFactory.openSession("true");
    //4.获取StudentMapper接口的实现类对象
    StudentMapper mapper = sqlSession.getMapper(StudentMapper.class);
    //5.调用实现类的方法,接受结果
    List<Student> list = mapper.selectAll();
    //其他分页的数据
    PageInfo<Student> pageInfo = new PageInfo<>(list);
    System.out.println("总条数："+pageInfo.getTotal());
    System.out.println("总页数："+pageInfo.getPages());
    System.out.println("当前页："+pageInfo.getPageNum());
    System.out.println("每页显示条数："+pageInfo.getPageSize());
    System.out.println("上一页："+pageInfo.getPrePage());
    System.out.println("下一页："+pageInfo.getNextPage());
    System.out.println("是否第一页："+pageInfo.isIsFirstPage());
    System.out.println("是否最后一页："+pageInfo.isIsLastPage());
    
    
    //6.处理结果
    for(Student student:list){
        System.out.println(student);
    }
}
```



## 1.5、分页插件小结

  分页：可以将很多条结果进行分页显示。 

* 分页插件 jar 包： pagehelper-5.1.10.jar jsqlparser-3.1.jar 

* `<plugins>`：集成插件标签。 

* 分页助手相关 API 

   1.PageHelper：分页助手功能类。

  2. startPage()：设置分页参数 
  3. PageInfo：分页相关参数功能类。 
  4. getTotal()：获取总条数 
  5. getPages()：获取总页数
  6. getPageNum()：获取当前页
  7. getPageSize()：获取每页显示条数
  8. getPrePage()：获取上一页 
  9. getNextPage()：获取下一页 
  10. isIsFirstPage()：获取是否是第一页 
  11. isIsLastPage()：获取是否是最后一页 





# 2、Mybatis多表操作

## 2.0、ResultMap元素

​	在之前的查询案例中，所使用的返回值类型属性采用的是 resultType 属性，使用该属性需要注意的是：==数据库表的列名或别名必须与实体类的属性名保持一致，如果不一致，则无法查询数据==

​	在实际开发中，实体类的属性名和数据库表中的列名是不可能完全一致，该如何解决属性名与列名不一致的问题呢？可以通过定义一个 resultMap 对列名和属性名之间作一个映射。

> resultMap的使用场景

1. 如果查询出来的列名和实体类的属性名不一致，可以定义一个 resultMap 对列名和实体类属性名之间作一个映射关系。
2. mybatis实现高级结果映射(一对一、一对多、多对多)

## 2.1、多表模型介绍

我们之前学习的都是基于单表操作的，而实际开发中，随着业务难度的加深，肯定需要多表操作的。 

*  多表模型分类
   *   一对一：**在任意一方建立外键，关联对方的主键。**
   *  一对多：**在多的一方建立外键，关联一的一方的主键。**
   *  多对多：**借助中间表，中间表至少两个字段，分别关联两张表的主键。**



## 2.2、多表模型一对一操作

1. 一对一模型： 人和身份证，一个人只有一个身份证

2. 代码实现

   * 步骤一: sql语句准备

     ~~~sql
     CREATE TABLE person(
     	id INT PRIMARY KEY AUTO_INCREMENT,
     	NAME VARCHAR(20),
     	age INT
     );
     INSERT INTO person VALUES (NULL,'张三',23);
     INSERT INTO person VALUES (NULL,'李四',24);
     INSERT INTO person VALUES (NULL,'王五',25);
     
     
     CREATE TABLE card(
     	id INT PRIMARY KEY AUTO_INCREMENT,
     	number VARCHAR(30),
     	pid INT,
         -- 银行卡表的pid指向person表中的主键id
     	CONSTRAINT cp_fk FOREIGN KEY (pid) REFERENCES person(id)
     );
     INSERT INTO card VALUES (NULL,'12345',1);
     INSERT INTO card VALUES (NULL,'23456',2);
     INSERT INTO card VALUES (NULL,'34567',3);
     ~~~

   * 步骤二：实体类和接口

     ```java
     public class Person{
         private Integer id;		//主键id
         private String name;	//人的姓名
         private Integer age;	//人的年龄
         //省略get/set,有参/无参方法
         
     }
     ```

     ```java
     public class Card{
         private Integer id;		//主键id
         private String number;	//身份证号
         private Person 	p;		//所属人的对象
         //省略get/set,有参/无参方法
     }
     ```

     ```java
     public interface OneToOneMapper{
         //查询全部
         public abstract List<Card> selectAll();
     }
     ```

   * 步骤三:配置文件

     ~~~xml
     <?xml version="1.0" encoding="UTF-8" ?>
     <!DOCTYPE mapper
             PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
             "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
     
     <mapper namespace="com.itheima.table01.OneToOneMapper">
         <!--配置表中字段和实体对象属性的映射关系-->
         <resultMap id="oneToOne" type="card">
             <id column="cid" property="id" />
             <result column="number" property="number" />
             <!--
                 association：配置被包含对象的映射关系
                 property：被包含对象的变量名
                 javaType：被包含对象的数据类型
             -->
             <association property="p" javaType="person">
                 <id column="pid" property="id" />
                 <result column="name" property="name" />
                 <result column="age" property="age" />
             </association>
         </resultMap>
     
         <select id="selectAll" resultMap="oneToOne">
             SELECT c.id cid,number,pid,NAME,age FROM card c,person p WHERE c.pid=p.id
         </select>
     </mapper>
     ~~~

   * 步骤四：在MyBatisConfig.xml中引入配置文件

     ```xml
     <!--mappers引入映射配置文件-->
     <mappers>
         <mapper resource="com/itheima/one_to_one/OneToOneMapper.xml"></mapper>
     </mappers>
     ```

   * 步骤五：测试类

     ~~~java
     @Test
     public void selectAll() throws Exception{
         //1.加载核心配置文件
         InputStream is = Resources.getResourceAsStream("MyBatisConfig.xml");
     
         //2.获取SqlSession工厂对象
         SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(is);
     
         //3.通过工厂对象获取SqlSession对象
         SqlSession sqlSession = sqlSessionFactory.openSession(true);
     
         //4.获取OneToOneMapper接口的实现类对象
         OneToOneMapper mapper = sqlSession.getMapper(OneToOneMapper.class);
     
         //5.调用实现类的方法，接收结果
         List<Card> list = mapper.selectAll();
     
         //6.处理结果
         for (Card c : list) {
             System.out.println(c);
         }
     
         //7.释放资源
         sqlSession.close();
         is.close();
     }
     ~~~

### 2.2.1、ResultMap

- ==当涉及多表操作时，用resultMap==

- ==当只是单表操作时，用resultType==

1. resultMap：用来自定义结果集和实体类的映射

- `id`属性：相当于这个resultMap的唯一标识
- `type` 属性：用来指定映射到哪个实体类

2. id 标签：用来指定**主键列**的映射规则

- `column` 属性：：数据库表的列名

- `property` 属性：:  对应实体类的属性名

3. result 标签：用来指定**普通列**的映射规则

- `column` 属性：：数据库表的列名
- `property`属性： :  对应实体类的属性名

4. association标签：配置被包含**对象**的映射规则

- `property`属性：被包含对象的变量名
- `javaType`属性：被包含对象的数据类型

5. collection标签：配置被包含**集合**对象的映射规则。

- `property`属性：被包含集合对象的变量名
- `ofType`属性：集合中保存的对象数据类型

---



结果集映射ResultMap

要解决的问题：属性名和字段名不一致

### 2.2.2、查询为null问题

1. 例如数据库字段名

![image-20210513094101461](传智mybatis(二).assets/image-20210513094101461.png)



2. Java中实体类设计

```java
public class User {
	private int id; //id
	private String name; //姓名
	private String password; //密码和数据库不一样！
	//构造
	//set/get
	//toString()
}
```

3. UserMapper接口

```java
public interface UserMapper {
    //根据id查询用户
    User selectUserById(int id);
}
```

4. mapper 映射文件

```xml
<select id="selectUserById" resultType="com.kuang.pojo.User">
	select * from user where id = #{id}
</select>
```

5. 测试

```java
@Test
public void testSelectUserById() {
    SqlSession session = MybatisUtils.getSession(); //获取SqlSession连接
    UserMapper mapper = session.getMapper(UserMapper.class);
    User user = mapper.selectUserById(1);
    System.out.println(user);
    session.close();
}
```

**结果**

- `User{id=1,name='狂神',password='null'}`
- password 字段为空，因为实体类和数据库字段不一致，一个是pwd，一个是password

**分析**

- `select * from mybatis.user where id = #{id}` 可以看作
- `select id,name,pwd from mybatisuser where id = #{}`
- mybatis 会根据这些查询的列名(会将列名转化为小写，数据库不区分大小写)，去对应的实体类中查找相应列名的 set 方法设值，由于找不到 setPwd() ,所以password返回null

### 2.2.3、解决方案

**方案一：为列名指定别名，别名和 java 实体类的属性名一致**

```xml
<select id="selectUserById" resultType="com.kuang.pojo.User">
	select id , name , pwd as password from mybatis.user where id = #{id}
</select>
```

**方案二：使用结果集映射 ➡ ResultMap (推荐)**

```xml
<resultMap id="UserMap" type="User">
	<!-- id为主键 -->
	<id column="id" property="id"/>
	<!-- column是数据库表的列名 , property是对应实体类的属性名 -->
	<result column="name" property="name"/>
	<result column="pwd" property="password"/>
</resultMap>

<!--使用我们自定义的映射规则-->
<select id="selectUserById" resultMap="UserMap">
	select id , name , pwd from mybatis.user where id = #{id}
</select>
```





## 2.3、多表模型一对多操作

1. 一对多模型： 一对多模型：班级和学生，一个班级可以有多个学生。    

2. sql语句准备

```sql
-- 班级表
CREATE TABLE classes(
	id INT PRIMARY KEY AUTO_INCREMENT,
	NAME VARCHAR(20)
);
INSERT INTO classes VALUES (NULL,'黑马一班');
INSERT INTO classes VALUES (NULL,'黑马二班');

-- 学生表的cid指向班级表的主键id
CREATE TABLE student(
	id INT PRIMARY KEY AUTO_INCREMENT,
	NAME VARCHAR(30),
	age INT,
	cid INT,
	CONSTRAINT cs_fk FOREIGN KEY (cid) REFERENCES classes(id)
);
INSERT INTO student VALUES (NULL,'张三',23,1);
INSERT INTO student VALUES (NULL,'李四',24,1);
INSERT INTO student VALUES (NULL,'王五',25,2);
INSERT INTO student VALUES (NULL,'赵六',26,2);
```



![image-20210718150546775](传智mybatis(二).assets/image-20210718150546775.png)

3. 实体类和接口

```java
public class Student {
    private Integer id;	//主键id
    private String name;//学生姓名
    private Integer agel//学生年龄
     //省略get/set,有参/无参方法
}
```

```java
public class Classes {
    private Integer id;	//主键id
    private String name;//班级名称
    private List<Student> students;	//班级中所有学生对象
}
```

```java
public interface OneToManyMapper {
    //查询全部
    public abstract List<Classes> selectAll();
}
```

4. 配置文件

```xml
<mapper namespace="com.itheima.table02.OneToManyMapper">
    <resultMap id="oneToMany" type="classes">
        <id column="cid" property="id"/>
        <result column="cname" property="name"/>

        <!--
            collection：配置被包含的集合对象映射关系
            property：被包含对象的变量名
            ofType：被包含对象的实际数据类型
        -->
        <collection property="students" ofType="student">
            <id column="sid" property="id"/>
            <result column="sname" property="name"/>
            <result column="sage" property="age"/>
        </collection>
    </resultMap>
    
    <select id="selectAll" resultMap="oneToMany">
        SELECT c.id cid,c.name cname,s.id sid,s.name sname,s.age sage FROM classes c,student s WHERE c.id=s.cid
    </select>
</mapper>
```

5. 在MyBatisConfig.xml中引入配置文件

```xml
<!--mappers引入映射配置文件-->
<mappers>
    <mapper resource="com/itheima/one_to_many/OneToManyMapper.xml"></mapper>
</mappers>
```

6. 测试类

```java
@Test
public void selectAll() throws Exception{
    //1.加载核心配置文件
    InputStream is = Resources.getResourceAsStream("MyBatisConfig.xml");

    //2.获取SqlSession工厂对象
    SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(is);

    //3.通过工厂对象获取SqlSession对象
    SqlSession sqlSession = sqlSessionFactory.openSession(true);

    //4.获取OneToManyMapper接口的实现类对象
    OneToManyMapper mapper = sqlSession.getMapper(OneToManyMapper.class);

    //5.调用实现类的方法，接收结果
    List<Classes> classes = mapper.selectAll();

    //6.处理结果
    for (Classes cls : classes) {
        System.out.println(cls.getId() + "," + cls.getName());
        List<Student> students = cls.getStudents();
        for (Student student : students) {
            System.out.println("\t" + student);
        }
    }

    //7.释放资源
    sqlSession.close();
    is.close();
}
```

1. resultMap：用来自定义结果集和实体类的映射

- `id`属性：相当于这个resultMap的唯一标识
- `type` 属性：用来指定映射到哪个实体类

2. id 标签：用来指定**主键列**的映射规则

- `column` 属性：：数据库表的列名

- `property` 属性：:  对应实体类的属性名

3. result 标签：用来指定**普通列**的映射规则

- `column` 属性：：数据库表的列名
- `property`属性： :  对应实体类的属性名

4. association标签：配置被包含**对象**的映射规则

- `property`属性：被包含对象的变量名
- `javaType`属性：被包含对象的数据类型

5. collection标签：配置被包含**集合**对象的映射规则。

- `property`属性：被包含集合对象的变量名
- `ofType`属性：集合中保存的对象数据类型



## 2.4、多表模型多对多操作

1. 多对多模型：学生和课程，一个学生可以选择多门课程、一个课程也可以被多个学生所选择。

2. 代码实现

   - 步骤一：sql语句准备

     ```sql
     CREATE TABLE course(
     	id INT PRIMARY KEY AUTO_INCREMENT,
     	NAME VARCHAR(20)
     );
     INSERT INTO course VALUES (NULL,'语文');
     INSERT INTO course VALUES (NULL,'数学');
     
     
     CREATE TABLE stu_cr(
     	id INT PRIMARY KEY AUTO_INCREMENT,
     	sid INT,
     	cid INT,
         -- sid指向学生表的主键id
         -- cid指向课程表的主键id
     	CONSTRAINT sc_fk1 FOREIGN KEY (sid) REFERENCES student(id),
     	CONSTRAINT sc_fk2 FOREIGN KEY (cid) REFERENCES course(id)
     );
     INSERT INTO stu_cr VALUES (NULL,1,1);
     INSERT INTO stu_cr VALUES (NULL,1,2);
     INSERT INTO stu_cr VALUES (NULL,2,1);
     INSERT INTO stu_cr VALUES (NULL,2,2);
     ```

   - 步骤二：实体类和接口

     ```java
     public class Course {
         private Integer id;		//主键id
         private String name;	//课程名称
          //省略get/set,有参/无参方法
     }
     ```

     ```java
     //在学生Student实体类当中增添变量，表示当前学生选择了哪些课程
     public class Student {
         private Integer id;		//主键id
         private String name;	//学生姓名
         private Integer age;	//学生年龄
         private List<Course> courses;//学生所选择的课程集合
         //省略get/set,有参/无参方法
     }
     ```

     ```java
     public interface ManyToManyMapper {
         //查询全部
         public abstract List<Student> selectAll();
     }
     ```

   - 步骤三：配置文件

     ```xml
     <?xml version="1.0" encoding="UTF-8" ?>
     <!DOCTYPE mapper
             PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
             "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
     
     <mapper namespace="com.itheima.table03.ManyToManyMapper">
         <resultMap id="manyToMany" type="student">
             <id column="sid" property="id"/>
             <result column="sname" property="name"/>
             <result column="sage" property="age"/>
     
             <collection property="courses" ofType="course">
                 <id column="cid" property="id"/>
                 <result column="cname" property="name"/>
             </collection>
         </resultMap>
         
         <select id="selectAll" resultMap="manyToMany">
             SELECT sc.sid,s.name sname,s.age sage,sc.cid,c.name cname FROM student s,course c,stu_cr sc WHERE sc.sid=s.id AND sc.cid=c.id
         </select>
     </mapper>
     ```

   - 步骤四：在MyBatisConfig.xml中引入配置文件

     ```xml
     <!--mappers引入映射配置文件-->
     <mappers>
         <mapper resource="com/itheima/many_to_many/ManyToManyMapper.xml"></mapper>
     </mappers>
     ```

   - 步骤五：测试

     ```java
      @Test
         public void selectAll() throws Exception{
             //1.加载核心配置文件
             InputStream is = Resources.getResourceAsStream("MyBatisConfig.xml");
     
             //2.获取SqlSession工厂对象
             SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(is);
     
             //3.通过工厂对象获取SqlSession对象
             SqlSession sqlSession = sqlSessionFactory.openSession(true);
     
             //4.获取ManyToManyMapper接口的实现类对象
             ManyToManyMapper mapper = sqlSession.getMapper(ManyToManyMapper.class);
     
             //5.调用实现类的方法，接收结果
             List<Student> students = mapper.selectAll();
     
             //6.处理结果
             for (Student student : students) {
                 System.out.println(student.getId() + "," + student.getName() + "," + student.getAge());
                 List<Course> courses = student.getCourses();
                 for (Course cours : courses) {
                     System.out.println("\t" + cours);
                 }
             }
     
             //7.释放资源
             sqlSession.close();
             is.close();
         }
         
     ```

     



## 2.5、总结

- ==当涉及多表操作时，用resultMap==

- ==当只是单表操作时，用resultType==

1. resultMap：用来自定义结果集和实体类的映射

- `id`属性：相当于这个resultMap的唯一标识
- `type` 属性：用来指定映射到哪个实体类

2. id 标签：用来指定**主键列**的映射规则

- `column` 属性：：数据库表的列名

- `property` 属性：:  对应实体类的属性名

3. result 标签：用来指定**普通列**的映射规则

- `column` 属性：：数据库表的列名
- `property`属性： :  对应实体类的属性名

4. association标签：配置被包含**对象**的映射规则

- `property`属性：被包含对象的变量名
- `javaType`属性：被包含对象的数据类型

5. collection标签：配置被包含**集合**对象的映射规则。

- `property`属性：被包含集合对象的变量名
- `ofType`属性：集合中保存的对象数据类型

## 2.6、ResultMap和ResultType区别

1. resultType直接表示返回值类型，包括基础数据类型和复杂数据类型。
2. resultMap 则是对外部 resultMap 定义的引用，对应外部 resultMap 的 id，表示返回结果映射到哪一个 resultMap 上。一般应用在数据库表中的列名和实体类属性名不一致的情况下或者是配置复杂的关联关系中使用。
3. resultType 和 resultMap 都是Map数据结构，但是两者不能同时使用，只能二选一使用。



# 3、Mybatis缓存

​	Mybatis的缓存其实就是把之前查到的数据存入内存（map）,下次如果还是查相同的东西，就可以直接从缓存中取，从而提高效率。

​	Mybatis有一级缓存和二级缓存之分，一级缓存（默认开启）是sqlsession级别的缓存。二级缓存相当于mapper级别的缓存。

- 默认情况下，只有一级缓存开启(SqlSession级别的缓存，也称为本地缓存)
- 二级缓存需要手动开启和配置，它是基于 namespace 级别的缓存

## 3.1、一级缓存

- 测试在一个Session中查询两次相同记录

```java
@Test
public void test(){
    SqlSession sqlSession = MybatisUtils.getSqlSession();
    
    UserMapper mapper = sqlSession.getMapper(UerMapper.class);
    User user1 = mapper.queryUserById(1);
    User user2 = mapper.queryUserById(1);
    System.out.println(user1==user2);
    // true
    
    sqlSession.close();
}
```

几种不会使用一级缓存的情况

1. 调用相同方法但是传入的参数不同
2. 调用相同方法参数也相同，但是使用的是另外一个SqlSession
3. 如果查询完后，对同一个表进行了增，删改的操作，都会清空这sqlSession上的缓存
4. 如果手动调用`SqlSession.clearCache`方法清除缓存了，后面也使用不了缓存

```java
@Test
public void test(){
    SqlSession sqlSession = MybatisUtils.getSqlSession(); 
    UserMapper mapper = sqlSession.getMapper(UerMapper.class);
    User user1 = mapper.queryUserById(1);
    sqlSession.close();
    
    // 不走缓存,一个SqlSession是一个连接
    SqlSession sqlSession = MybatisUtils.getSqlSession();
    UserMapper mapper = sqlSession.getMapper(UerMapper.class);
    User user1 = mapper.queryUserById(1);
    sqlSession.close();
    
}
```

## 3.2、二级缓存

注意：只在sqlsession调用了close或者commit后的数据才会进入二级缓存。



### 3.2.1、开启二级缓存

1. 全局开启：在Mybatis核心配置文件中配置

```xml
<settings>
    <setting name="cacheEnabled" value="true"/>
</settings>
```

2. 局部开启：在要开启二级缓存的mapper映射文件中设置 cache标签

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="com.sangeng.dao.RoleDao">
    <cache></cache>
</mapper>
```



```java
@Test
public void test(){
    SqlSession sqlSession = MybatisUtils.getSqlSession(); 
    UserMapper mapper = sqlSession.getMapper(UerMapper.class);
    User user1 = mapper.queryUserById(1);
    sqlSession.close();
    
    // 走缓存,只要是同一个mapper
    SqlSession sqlSession = MybatisUtils.getSqlSession();
    UserMapper mapper = sqlSession.getMapper(UerMapper.class);
    User user1 = mapper.queryUserById(1);
    sqlSession.close();
    
}
```



### 3.2.2、实际开发

二级缓存在实际开发中基本不会使用。在一些笔试题会出现。





# 4、Mybatis注解实现单表操作

这几年来注解开发越来越流行，Mybatis也可以使用注解开发方式，这样我们就可以减少编写Mapper映射文件了。我们先围绕一些基本的CRUD来学习，再学习复杂映射多表操作。

**注意：利用注解开发就不需要 mapper.xml 映射文件了**

## 4.1、常用注解

| 注解                     | 说明             |
| ------------------------ | ---------------- |
| @Select("查询的SQL语句") | 执行查询操作注解 |
| @Insert("新增的SQL语句") | 执行新增操作注解 |
| @Update("修改的SQL语句") | 执行修改操作注解 |
| @Delete("删除的SQL语句") | 执行删除操作注解 |

## 4.2、Mybatis增删改查

我们完成简单的student表的增删改查的操作

- 步骤一：在接口中添加注解

```java
public interface StudentMapper {
    //查询全部
    @Select("SELECT * FROM student")
    public abstract List<Student> selectAll();

    //新增操作
    @Insert("INSERT INTO student VALUES (#{id},#{name},#{age})")
    public abstract Integer insert(Student stu);

    //修改操作
    @Update("UPDATE student SET name=#{name},age=#{age} WHERE id=#{id}")
    public abstract Integer update(Student stu);

    //删除操作
    @Delete("DELETE FROM student WHERE id=#{id}")
    public abstract Integer delete(Integer id);
}

```

- 步骤二：在核心配置文件中配置mapper接口所在的包名

  修改MyBatis的核心配置文件，我们使用了注解替代的映射文件，所以我们只需要加载使用了注解的Mapper接口即可

```xml
<mappers>
    <!--扫描使用注解的类-->
    <mapper class="com.itheima.mapper.UserMapper"></mapper>
</mappers>
```

​		或者指定扫描包含映射关系的接口所在的包也可以

```xml
<mappers>
    <!--扫描使用注解的类所在的包-->
    <package name="com.itheima.mapper"></package>
</mappers>
```

- 步骤三：测试类



```java
public class Test01 {
    @Test
    public void selectAll() throws Exception{
        //1.加载核心配置文件
        InputStream is = Resources.getResourceAsStream("MyBatisConfig.xml");

        //2.获取SqlSession工厂对象
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(is);

        //3.通过工厂对象获取SqlSession对象
        SqlSession sqlSession = sqlSessionFactory.openSession(true);

        //4.获取StudentMapper接口的实现类对象
        StudentMapper mapper = sqlSession.getMapper(StudentMapper.class);

        //5.调用实现类对象中的方法，接收结果
        List<Student> list = mapper.selectAll();

        //6.处理结果
        for (Student student : list) {
            System.out.println(student);
        }

        //7.释放资源
        sqlSession.close();
        is.close();
    }

    @Test
    public void insert() throws Exception{
        //1.加载核心配置文件
        InputStream is = Resources.getResourceAsStream("MyBatisConfig.xml");

        //2.获取SqlSession工厂对象
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(is);

        //3.通过工厂对象获取SqlSession对象
        SqlSession sqlSession = sqlSessionFactory.openSession(true);

        //4.获取StudentMapper接口的实现类对象
        StudentMapper mapper = sqlSession.getMapper(StudentMapper.class);

        //5.调用实现类对象中的方法，接收结果
        Student stu = new Student(4,"赵六",26);
        Integer result = mapper.insert(stu);

        //6.处理结果
        System.out.println(result);

        //7.释放资源
        sqlSession.close();
        is.close();
    }

    @Test
    public void update() throws Exception{
        //1.加载核心配置文件
        InputStream is = Resources.getResourceAsStream("MyBatisConfig.xml");

        //2.获取SqlSession工厂对象
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(is);

        //3.通过工厂对象获取SqlSession对象
        SqlSession sqlSession = sqlSessionFactory.openSession(true);

        //4.获取StudentMapper接口的实现类对象
        StudentMapper mapper = sqlSession.getMapper(StudentMapper.class);

        //5.调用实现类对象中的方法，接收结果
        Student stu = new Student(4,"赵六",36);
        Integer result = mapper.update(stu);

        //6.处理结果
        System.out.println(result);

        //7.释放资源
        sqlSession.close();
        is.close();
    }

    @Test
    public void delete() throws Exception{
        //1.加载核心配置文件
        InputStream is = Resources.getResourceAsStream("MyBatisConfig.xml");

        //2.获取SqlSession工厂对象
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(is);

        //3.通过工厂对象获取SqlSession对象
        SqlSession sqlSession = sqlSessionFactory.openSession(true);

        //4.获取StudentMapper接口的实现类对象
        StudentMapper mapper = sqlSession.getMapper(StudentMapper.class);

        //5.调用实现类对象中的方法，接收结果
        Integer result = mapper.delete(4);

        //6.处理结果
        System.out.println(result);

        //7.释放资源
        sqlSession.close();
        is.close();
    }
}
```

---

面向接口编程其实就是Mybatis的注解开发，这里引用狂神说的案例，更易于理解注解开发增删改查！

视频地址：https://www.bilibili.com/video/BV1NE411Q7Nx?p=17

# 5、面向接口编程

- 大家之前都学过面向对象编程，也学习过接口，但在真正的开发中，很多时候我们会选择面向接口编程

三个面向区别

- 面向对象是指，我们考虑问题时，以对象为单位，考虑它的属性及方法 .
- 面向过程是指，我们考虑问题时，以一个具体的流程（事务过程）为单位，考虑它的实现 
- 接口设计与非接口设计是针对复用技术而言的，与面向对象（过程）不是一个问题.更多的体现就是对系统整体的架构

## 5.1、使用注解开发

- mybatis 最初配置信息是基于 XML，映射语句（SQL）也是定义在 XML 中的。而到了 MyBatis 3 提供了新的基于注解的配置
- sql 类型主要分成
  - @select()
  - @update()
  - @Insert()
  - @delete()

**注意：利用注解开发就不需要 mapper.xml 映射文件了**

步骤：

1. **在接口中添加注解**

```java
public interface UserMapper {
    @Select("select * from user")
    List<User> getUsers();
}
```

2. **在核心配置文件中绑定接口**

```xml
<!--    绑定接口-->
<mappers>
    <mapper class="com.kuang.dao.UserMapper" />
</mappers>
```

3. **在测试类中测试**

```java
@Test
public void test(){
    SqlSession sqlSession = MybatisUtils.getSqlSession();
    UserMapper mapper = sqlSession.getMapper(UserMapper.class);
    List<User> users = mapper.getUsers();
    for(User user : users){
        System.out.println(users);
    }
    sqlSession.close();
}
```



## 5.2、CRUD

改造MybatisUtils工具类的getSession( ) 方法，重载实现。

【**注意点：增删改一定记得对事务的处理**】

```java
public static SqlSession getSqlSession(){
    // 添加参数为 true,则不需要自动再手动提交事务，会自动提交事务
    return sqlSessionFactory.openSession(true);
}
```

## 5.3、select

1. 在接口中添加注解

```java
public interface UserMapper {
    // 方法存在多个参数,所有的参数前面必须加上 @Param("id")注解
    @Select("select * from user where id = #{id}")
    User getUserByID(@Param("id") int id);
}
```

2. 在核心配置文件中注入

```xml
<!--    绑定接口-->
<mappers>
    <mapper class="com.kuang.dao.UserMapper" />
</mappers>
```

3. 在测试类中测试

```java
@Test
public void test2(){
    SqlSession sqlSession = MybatisUtils.getSqlSession();
    UserMapper mapper = sqlSession.getMapper(UserMapper.class);

    User userByID = mapper.getUserByID(1);
    System.out.println(userByID);
    sqlSession.close();
}
```



## 5.4、insert

1. 在接口中添加注解

```java
public interface UserMapper {
    @Insert("insert into user(id,name,pwd) values (#{id},#{name},#{password})")
    int addUser(User user);
}
```

2. 在核心配置文件中注入

```xml
<!--    绑定接口-->
<mappers>
    <mapper class="com.kuang.dao.UserMapper" />
</mappers>
```

3. 在测试类中测试

```java
// addUser
@Test
public void test3(){
    SqlSession sqlSession = MybatisUtils.getSqlSession();
    UserMapper mapper = sqlSession.getMapper(UserMapper.class);

    mapper.addUser(new User(5,"hello","132123"));
    sqlSession.close();
}
```

## 5.5、update

1. 在接口中添加注解

```java
public interface UserMapper {
    @Update("update user set name=#{name},pwd=#{password} where id = #{id}")
    int updateUser(User user);
}
```

2. 在核心配置文件中注入

```xml
<!--    绑定接口-->
<mappers>
    <mapper class="com.kuang.dao.UserMapper" />
</mappers>
```

3. 在测试类中测试

```java
// updateUser
@Test
public void test4(){
    SqlSession sqlSession = MybatisUtils.getSqlSession();
    UserMapper mapper = sqlSession.getMapper(UserMapper.class);

    mapper.updateUser(new User(5,"to","231545"));
    sqlSession.close();
}
```



## 5.6、delete

1. 在接口中添加注解

```java
public interface UserMapper {
    @Delete("delete from user where id = #{uid}")
    // 以 Param 里面的参数为准
    int deleteUser(@Param("uid") int id);
}
```

2. 在核心配置文件中注入

```xml
<!--    绑定接口-->
<mappers>
    <mapper class="com.kuang.dao.UserMapper" />
</mappers>
```

3. 在测试类中测试

```java
// delete
@Test
public void test5(){
    SqlSession sqlSession = MybatisUtils.getSqlSession();
    UserMapper mapper = sqlSession.getMapper(UserMapper.class);

    mapper.deleteUser(5);
    sqlSession.close();
}
```

## 5.7、@Param()

**关于 @ Param()注解**

- 基本类型的参数 或者 String类型，需要加上@Param

- 引用类型不需要加

- 如果只有一个基本类型的话，可以忽略，但是建议加上

  

## 5.7、 #和$的区别

- `#{}` 的作用主要是 替换预编译语句(PrepareStatement) 中的占位符 ?(推荐使用)

```sql
INSERT INTO user (name) VALUES (#{name});
INSERT INTO user (name) VALUES (?);
```

- `#{}` 的作用是直接进行字符串替换

```sql
INSERT INTO user (name) VALUES ('${name}');
INSERT INTO user (name) VALUES ('kuangshen');
```

# 6、Mybatis高效编程

关于Mybatis的高效编程，可以提高我们的开发速度，以下两个插件或许有用。

## 6.1、Mybatis插件

下载安装Free Mybatis plugin，安装完后重启IDEA

具体视频讲解：https://www.bilibili.com/video/BV1wy4y1H7wu?p=6

## 6.2、Lombok插件

1. IDEA 安装 Lombok 插件
2. 引入 Maven 依赖

```xml
<!-- https://mvnrepository.com/artifact/org.projectlombok/lombok -->
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.12</version>
    <scope>provided</scope>
</dependency>
```

3. 在代码中增加注释

```java
@Data //GET,SET,ToString，有参，无参构造
public class User {
    private int id;
    private String name;
    private String password;
}
```

具体视频讲解：https://www.bilibili.com/video/BV1NE411Q7Nx?p=18































































