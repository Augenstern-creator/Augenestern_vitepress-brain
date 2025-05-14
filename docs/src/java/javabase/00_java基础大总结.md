


# 1、环境配置

## 1.1、DOS命令提示符

| 操作            | 说明                   |
| --------------- | ---------------------- |
| 盘符名称：      | 盘符切换 **E:**  回车  |
| dir             | 查看当前路径下的内容   |
| cd 目录         | 进入单级目录。 cd JAVA |
| cd 目录1\目录2\ | 进入多级目录           |
| cd\             | 回退到盘符目录         |
| cls             | 清屏                   |
| exit            | 退出命令提示符窗口     |

## 1.2、helloworld

```java
public class HelloWorld {
             public static void main(String[] args) 
                   System.out.println("helloWorld");
              }
}
```


![在这里插入图片描述](https://img-blog.csdnimg.cn/20210602204948573.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)






# 2、基本语法

## 2.1、注释

> 单行注释

```java
// 单行注释
```


> 多行注释

```java
/*  注释信息 */
```

> 文档注释

```java
/** 注释信息 **/
```

## 2.2、关键字

1. 关键字的字母**全部都是小写**

2. 常用的代码编辑器，针对关键字有特殊的颜色标记。

## 2.3、标识符

1. Java 对各种变量、方法和类等要素命名时使用的字符序列称为标识符

2. 凡是自己可以起名字的地方都叫标识符

**定义合法标识符规则：**

1. 由26个英文字母大小写，0-9 ，_或 $ 组成

2. **数字不可以开头**

3. 不可以使用关键字和保留字，但能包含关键字和保留字

4. Java中严格区分大小写，长度无限制

5. 标识符不能包含空格

## 2.4、命名规范

1.**包名**：多单词组成时所有字母都小写：xxxyyyzzz

2.**类名、接口名**：多单词组成时，所有单词的首字母大写:XxxYyyZzz

**3.变量名、方法名**：多单词组成时，第一个单词首字母小写，第二个单词开始每个单词首字母大写：xxxYyyZzz

4.**常量名**：所有字母都大写。多单词时每个单词用下划线连接：XXX_YYY_ZZZ

## 2.5、变量

### 2.5.1、整数类型

byte、short、int、long


![在这里插入图片描述](https://img-blog.csdnimg.cn/20210602205206726.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)


1. java的整型常量默认为 int 型，声明long型常量须后加`l`或`L`

### 2.5.2、浮点类型

float、double


![在这里插入图片描述](https://img-blog.csdnimg.cn/20210602205217671.png#pic_center)

1. Java 的浮点型常量默认为double型，声明float型常量，须后加`f`或`F`



### 2.5.3、字符型

1. char 型数据用来表示通常意义上“字符”(2字节)

2. 字符型常量的三种表现形式：

   1. 字符常量是用单引号`''`括起来的单个字符，涵盖世界上所有书面语的字符。例如：

      ```java
      char c1 = 'a';   
      char c2 = '中'; 
      char c3 =  '9';
      ```

   2. Java中还允许使用转义字符`\`来将其后的字符转变为特殊字符型常量。例如：

      ```java
      // '\n'表示换行符
      char c3 = '\n';  
      ```

   3. 直接使用 Unicode 值来表示字符型常量：`\uXXXX`。其中，XXXX代表一个十六进制整数。如：`\u000a` 表示 `\n`

  

3. char类型是可以进行运算的。因为它都对应有Unicode码

| 转义字符 | 说明   |
| -------- | ------ |
| \b       | 退格符 |
| \n       | 换行符 |
| \r       | 回车符 |
| \t       | 制表符 |
| \ ' '    | 双引号 |
| \ '      | 单引号 |
| \ \      | 反斜线 |

### 2.5.4、布尔类型

1. boolean 类型适于逻辑运算，一般用于程序流程控制

2. boolean类型数据只允许取值true和false，无null

3. **不可以0或非 0 的整数替代false和true，这点和C语言不同**

### 2.5.5、字符串

1. 值null可以赋值给任何引用类型（类、接口、数组）的变量，用以表示这个引用类型变量中保存的地址为空

2. String类属于引用类型，可用null赋值

3. String类是一个典型的不可变类，String对象创建出来就不可能被改变

### 2.5.6、变量的注意事项

1. 变量名不允许重复定义

```java
public class Demo {
    /*  1.变量名不允许重复定义 */
    public static void main(String[] args){
        int a = 10;
        // int a = 20; 错误代码
        a = 20;
        System.out.println(a);
    }
}
```

2. 一条语句可以定义多个变量，但需要使用逗号进行分割

```java
public class Demo {
   /* 2.一条语句可以定义多个变量，但需要使用逗号进行分割*/
   /* 一条语句：java当中使用分号作为一条语句的结束 */
    public static void main(String[] args){
        int a = 10,b = 20, c = 30;
        System.out.println(a);
        System.out.println(b);
        System.out.println(c);
    }  
}
```

3. 定义float 和long 变量的注意事项

```java
public class Demo {
    /* 3.变量在使用之前一定要进行赋值 */
    int a;   //使用之前一定赋值
    System.out.println(a);
}
```

4. 变量的作用域范围

```java
public class Demo {
    public statci void main(String[] args){
    /* 4.定义float 和 long 变量的注意事项 */
    /* 定义float类型变量的时候: 需要在数值后面加入F的标识，F可以大写也可以小写 */
    /* 定义long类型变量的时候: 需要在数值后面加入L的标识，L尽量大写 */
    float a = 12.3F;
    long b = 1000L;
    System.out.println(a);
    System.out.println(b);
    }

}
```

5. 变量的作用域范围: 只在它所在的大括号中有效

```java
public class Demo {
    public static void main(String[] args){
       /* 变量的作用域范围: 只在它所在的大括号中有效 */
        int a = 10;
        System.out.println(a);
        {
            int b = 20;
            // 当这个大括号中的代码执行完毕后，内部所[定义]的变量就会从内存中消失
            System.out.println(b);
        }
       /* System.out.println(b); 编译错误*/
    }
}
    

```

### 2.5.7、键盘录入

```java
import java.util.Scanner;




public class DemoScanner {
    /* 步骤1: 导包，需要写在class的上面   
        import java.util.Scanner;   
        步骤2: 创建对象
              Scanner sc = new Scanner(System.in);
              只有sc可以改变，其他属于固定格式
              
         步骤3: 使用变量接收数据
               int i = sc.nextInt();
               只有 i 变量可以改变，其他属于固定格式
      */
               
               
       public static void main(String[] args) {
           // 步骤2: 创建对象
           Scanner sc =new Scanner(System.in);
           
           // 步骤3: 使用[变量]接收数据
           int a = sc.nextInt();
           
           System.out.println(a);
       }
    
    
    
}
```



## 2.6、类型转换

### 2.6.1、隐式转换

将数据类型中，取值范围小的数据，给取值范围大的类型赋值，可以直接赋值

**简单记**：小的给大的，可以直接给

```java
public class Demo {
    public static void main(String[] args){
        int a = 10;      // int 4个字节
        double b = a;    // double 8个字节
        System.out.println(b)  // 10.0 
    }
}
```

### 2.6.2、强制转换

把一个表示数据范围大的数值或变量赋值给另一个表示数据范围小的变量

**简单记忆**：大的给小的，不能直接给，需要强转

```java
int a = 10;        // int 4个字节
byte b = (byte)a;  // byte 1个字节



double num1 = 12.9;
int num2 = (int)num1;
System.out.println(num1);   // 12
```



## 2.7、强制类型转换

1. 自动类型转换的逆过程，将容量大的数据类型转换为容量小的数据类型。使用时要加上强制转换符`(())`，但可能造成精度降低或溢出，格外要注意。

2. 通常，字符串不能直接转换为基本类型，==但通过基本类型对应的包装类则可以实现把字符串转换成基本类型==





## 2.8、运算符

### 2.8.1、算数运算符

| 符号 | 作用 | 说明                         |
| ---- | ---- | ---------------------------- |
| +    | 加   |                              |
| -    | 减   |                              |
| *    | 乘   |                              |
| /    | 除   |                              |
| %    | 取余 | 获取两个数据做除法的**余数** |

### 2.8.2、字符的"+"操作

```java
public class Demo {
    public static void main(String[] args){
        int a = 1;
        char b = 'a';
        // 当(byte short char int)在一起运算的时候，都会提升为int //
        System.out.println(a + b);
    }
}

/* 'a' -- 97
   'A' -- 65
   'o' -- 48
*/
```

### 2.8.3、字符串的"+"操作



```java
pubic class Demo {
    public static void main(String[] args) {
        // 当 + 操作出现字符串时，这个 + 是[字符串连接符]，而不是算数运算
        // 字符串可以使用 + 号，跟[任意数据类型]拼接
        System.out.println("ItHeiMa" + 666);
        // ItHeiMa666
        
        System.out.println(1 + 99 + "年");
        // 100年
        
        System.out.println("5 + 5" + 5 + 5 ) 
        // 5 + 555
        
    }
}
```

### 2.8.4、案例：数值拆分


![在这里插入图片描述](https://img-blog.csdnimg.cn/20210602205317253.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)


```java
import java.util.Scanner;
public class Demo{
    public static void main(String[] args){
        // 1.使用Scanner 键盘录入一个三位数
        Scanner sc = new Scanner(System.in);
        System.out..println("请输入一个三位数:");
        
        int num = sc.nextInt();
        // 2.个位的计算: 数值 % 10
        int ge = num % 10;
        // 3.十位的计算: 数值 / 10 % 10
        int shi = num / 10 % 10;
        // 4.百位的计算: 数值 / 100
        int bai = num / 100;
        System.out.println("整数"+num+"的个位为:"+ge);
        System.out.println("整数"+num+"的十位为:"+shi);
        System.out.println("整数"+num+"的百位为:"+bai);
    }
}
```

> **公式总结:**

**个位: 数值 % 10**

**十位: 数值 / 10 % 10**

**百位: 数值 / 10 / 10 % 10**

**千位: 数值 / 10 / 10 / 10 % 10**

### 2.8.5、自增自减运算符

| 符号 | 作用 | 说明        |
| ---- | ---- | ----------- |
| ++   | 自增 | 变量的值加1 |
| --   | 自减 | 变量的值减1 |

1. **++ 和 --可以放在变量的后边，也可以放在变量的前面**
2. **单独使用的时候，++ 和 -- 无论放在变量的前边和后边，结果是一样的**

```java
public class Demo {
    public static void main(String[] args){
        int a = 10;
        // ++在前，先对该变量做自增或自减,然后再拿变量参与操作
        int a = 10;
        int b = ++a;
        System.out.println(a); // 11
        System.out.println(b); // 11
        
        // ++在后 先将该变量原本的值，取出来参与操作，随后再自增
        int aa = 10;
        int bb = aa++;
        System.out.println(aa); // 11
        System.out.println(bb); // 10
        
        
        
        int num = 123;
        System.out.println(num++); // 123     
    }
}
```

### 2.8.6、赋值运算符

| 符号 | 作用       | 说明                       |
| ---- | ---------- | -------------------------- |
| =    | 赋值       | a = 10,将10赋值给变量a     |
| +=   | 加后赋值   | a + = b，将 a + b 的值给a |
| - =  | 减后赋值   | a - = b，将 a - b的值给a   |
| * =  | 乘后赋值   | a * = b，将a × b 的值给a   |
| / =  | 除后赋值   | a / = b，将a ÷ b 的商给a   |
| % =  | 取余后赋值 | a % = b，将a ÷b 的余数给a  |

### 2.8.7、关系运算符

| 符号 | 说明                           |
| ---- | ------------------------------ |
| = =  | a = =b，判断a 和 b的值是否相等 |
| ! =  |                                |
| >    |                                |
| > =  |                                |
| <    |                                |
| < =  |                                |

### 2.8.8、逻辑运算符

| &    | 与                           |
| ---- | ---------------------------- |
| \|   | 或                           |
| ！   | 非（取反）                   |
| ^    | 异或(相同为false,不同为true) |

```java
public class Demo {
    public static void main(String[] args){
        System.out.println(true ^ true);   // false
        System.out.println(false ^ false); // false
        System.out.println(true ^ false);  // true
        System.out.println(false ^ true);  // true
        /* 两边一样就是false，不一样即为true */
    }
}
```

### 2.8.9、短路逻辑运算符

| 符号 | 作用   | 说明                         |
| ---- | ------ | ---------------------------- |
| &&   | 短路与 | 作用与&相同，但是有短路效果  |
| \|\| | 短路或 | 作用与\|相同，但是有短路效果 |

```java
public class Demo {
    public static void main(String[] args){
        /*
        & 和 && 的区别:
        & :无论符号左边是 true 还是 false,右边都要继续执行
        && :具有短路效果，符号左边为false的时候，右边就不执行
            如果符号左边为true，右边要继续执行
        */
        int x = 3;
        int y = 4;
        // false & true
        System.out.println(++x > 4 & y-- < 5);  //false
        System.out.println("x=" + x); // 4
        System.out.println("y=" + y); // 3
        
        
        
        
        int x = 3;
        int y = 4;
        // false && true
        System.out.println(++x > 4 & y-- < 5);  //false
        System.out.println("x=" + x); // 4
        System.out.println("y=" + y); // 4
    }
}
```

注意事项:

1. 逻辑与 `&`：无论左边真假，右边都要执行

2. 短路与 `&&`：如果左边为真，右边执行，**如果左边为假，右边不执行**

3. 逻辑或 `|` ：无论左边真假，右边都要执行

4. 短语或 `||`：左边为假，右边执行，**如果左边为真，右边不执行**

### 2.8.10、三元运算符

```
关系表达式 ? 表达式1 : 表达式2
```







## 2.9、流程控制语句

### 2.9.1、if

```java
import java.util.Scanner;

public class Demo{
    public static void main(String[] args){
        Scanner score = new Scanner(System.in);
        System.out.println("请输入您的考试成绩:");
        int score = sc.nextInt();
        if(score >= 0 && score <= 100){
            if(score >= 95 && score <= 100){
                System.out.println("666");
            }else if(score >= 90 && score <= 94){
                System.out.println("66");
            }else if(score >= 80 && score <= 89){
                System.out.println("6");
            }else{
                System.out.println("挨顿揍！");
            }
        }else{
            System.out.println("您的成绩输入有误");
        }
        
    }
}
```

### 2.9.2、switch

```java
switch(表达式) {
    case 值1:
        语句体1;
        break;
    case 值2:
        语句体2;
        break;
    default:
        语句体3;
        break;
}
```

#### 1、案例:减肥计划


![在这里插入图片描述](https://img-blog.csdnimg.cn/2021060220533410.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)


```java
import java.util.Scanner;
public class Demo{
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        System.out.println("今天是周几:");
        int week = sc.nextInt();
        switch(week){
            case 1:
                System.out.println("");
                break;
            case 2:
                System.out.println("");
                break;
            case 2:
                System.out.println("");
                break;
            default:
                System.out.println("您的输入有误");
                break;
        }
    }
}
```

### 2.9.3、case穿透

如果switch语句中，case省略了break语句，就会开始case穿透

现象：当开始case穿透，后面的case就不会具有匹配效果，内部的语句都会执行，直到看到break，或者将整体switch语句执行完毕，才会结束

### 2.9.4、for

```java
for(初始化语句;条件判断语句;条件控制语句){
    循环体语句;
}
```

#### 1、案例：输出数据


![在这里插入图片描述](https://img-blog.csdnimg.cn/20210602205345374.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)


```java
public class Demo{
    public static void main(String[] args){
        for(int i = 1; i <= 5;i++){
            System.out.println(i);
        }
        for(int i = 5; i >= 1; i--){
            System.out.println(i);
        }
    }
}
```

#### 2、案例:求1-5数据和

```java
int sum = 0;
for(int i = 1;i <= 5;i++){
    sum += i;
}
System.out.println(sum);
```

#### 3、案例:求1-100偶数和

```java
int sum = 0;
for(int i = 1; i <= 100;i++){
    if(i % 2 == 0){
        sum += i;
    }
}
System.out.println(sum);
```

#### 4、案例:逢7过

```java
for(int i = 1; i <= 100;i++){
    int ge = i % 10;
    int shi =i / 10 % 10;
    if(ge == 7 || shi == 7 || i % 7 == 0){
        System.out.println(i);
    }
}
```

#### 5、案例：水仙花数

```java
for(int i = 100; i <= 999; i++){
    int ge = i % 10;
    int shi = i / 10 % 10;
    int bai = i / 10 / 10 % 10;
    if(ge*ge*ge + shi*shi*shi + bai*bai*bai == i){
        System.out.println(i);
    }
}
```

#### 6、Tips

```java
// 打印后不换行
System.out.print("打印内容");
    
// 打印后换行
System.out.println("打印内容");
```




### 2.9.5、while

```java
初始化语句;
while(条件判断语句){
    循环体语句;
    条件控制语句;
}
```

#### 1、案例:珠穆朗玛峰

```java
public class Demo{
    /*
    需求：世界最高山峰是珠穆朗玛峰(8844.43米=8844430毫米)，假如我有一张足够大的纸，它的厚度是0.1毫米。
	请问，我折叠多少次，可以折成珠穆朗玛峰的高度?
    */
    public static void main(String[] args){
        // 1.定义计数器变量，准备用于统计折叠的次数
        int count = 0;
        // 2.准备纸张厚度变量,珠峰高度变量
        double paper = 0.1;
        int zf = 8844430;
        // 3.不确定循环次数，使用while循环
        while(paper <= zf){
            paper *= 2;
            System.out.println(paper);
            // 每折叠一次,计数器就要自增
            count++;
        }
        System.out.println(count);
        
    }
}
```



### 2.9.6、dowhile

```java
初始化语句;
do{
    循环体语句;
    条件控制语句;
}while(条件判断语句);
```

### 2.9.7、死循环

#### 1、for死循环

```java
public class Demo{
    public static void main(String[] args){
        // for死循环格式
        for(;;){
            System.out.println("我停不下来了");
        }
    }
}
```

#### 2、while死循环

```java
public class Demo{
    public static void main(String[] args){
        while(true){
            System.out.println("我停不下来了");
        }
    }
}
```

#### 3、dowhile死循环

```java
public class Demo{
    public static void main(String[] args){
       do{
           System.out.println("我停不下来了");
       }while(true);
    }
}
```

> 命令提示符窗口中 Ctrl+C 可以结束死循环

### 2.9.8、continue

作用: 跳过某次循环体内容的执行

```java
public class Demo{
    public static void main(String[] args){
        // 模拟电梯上升，1-24层，4层不停
        for(int i = 1;i <= 24 ;i++){
            if(i == 4){
                continue;
            }
            System.out.println(i + "层到了~");
        }
    }
}
```

### 2.9.9、break

作用:终止循环体内容的执行

```java
public class Demo {
    public static void main(String[] args){
        // 模拟20岁工作到80岁，60岁退休
        for(int i = 20; i <= 80; i++){
            if(i == 60){
                break;  //结束整个循环
            }
            System.out.println(i + "岁正在上班");
        }
    }
}
```

#### 1、案例:减肥计划改进

```java
import java.util.Scanner;

public class Test {
	/*
		需求：程序运行后，用户可多次查询星期对应的减肥计划，直到输入0，程序结束
		
		步骤:
			
			1. 不明确用户操作几次, 使用死循环包裹业务逻辑
			2. 匹配到0的时候，使用break结束循环死循环

	*/
	public static void main (String[] args){
		
		lo:while(true){
			System.out.println("请输入您要查看的星期数:");
			System.out.println("(如无需继续查看,请输入0退出程序)");
			
			// 1. 键盘录入星期数据，使用变量接收
			Scanner sc = new Scanner(System.in);
			int week = sc.nextInt();
			// 2. 多情况判断，采用switch语句实现
			switch(week){
				// 3. 在不同的case中，输出对应的减肥计划
				case 0:
					System.out.println("感谢您的使用");
					break lo;
				case 1:
					System.out.println("跑步");
					break;
				case 2:
					System.out.println("游泳");
					break;
				case 3:
					System.out.println("慢走");
					break;
				case 4:
					System.out.println("动感单车");
					break;
				case 5:
					System.out.println("拳击");
					break;
				case 6:
					System.out.println("爬山");
					break;
				case 7:
					System.out.println("好好吃一顿");
					break;
				default:
					System.out.println("您的输入有误");
					break;
			}
		}
		
		
	}
}
```

## 2.10、Random

作用:用于产生一个随机数

```java
     1.导包
import java.util.Random


public class Demo{
    /*
     Random:产生随机数
     1.导包: import java.util.Random;
     2.创建对象: Random r = new Random();
               r 是变量名,可以变，其他的都不允许改变
     3.获取随机数: int numeber = r.nextInt(10);
                获取数据的范围:[0,10)，包括0，不包括10
                number 是变量名，可以变，数字10可以变，其他的不允许变
    public static void main(String[] args){
    */
    2.创建对象
        Random r = new Random();
    3.获取随机数
        int num = r.nextInt(num);
    
}
```

### 2.10.1、案例:猜数字

```java
import java.util.Scanner;
import java.util.Random;



public  static void main(String[] args){
    // 1.准备 Random 和Scanner对象，分别用于产生随机数和键盘录入
    Random r = new Random();
    Scanner sc = new Scanner(System.in);
    // 2.使用Random 产生一个1-100之间的数，作为要猜的数
    int randomNum = r.nextInt(100) + 1;
    while(true){
    // 3.键盘录入用户猜的数据
    System.out.println("请输入您猜的数:");
    int num = sc.nextInt();
    // 4.进行比较
    if(num > randomNum){
        System.out.println("猜大了");
    }else if(num < randomNum){
        System.out.println("猜小了")
    }else{
        System.out.println("猜中了！");
        break;
    }
}
    }
```



# 3、数组

## 3.1、数组定义

```java
// 格式一:数据类型[] 变量名
int[] array;
    
// 格式二:数据类型 变量名[]
int array[];
```



```java
// 定义了一个int类型的数组，数组名叫arr
int[] arr;
System.out.prinln(arr[])
```

## 3.2、数组动态初始化

```java
格式: 数据类型[]变量名 = new 数据类型[数组长度];
int[] arr = new int[3];
System.out.println(arr[0]); // 0 系统自动分配的默认初始值
```

## 3.3、数组静态初始化

```java
格式一: 数据类型[] 变量名 = new 数据类型[]{数据1，数据2，数据3,.....}
int[] arr = new  int[]{1,2,3};

简化格式: 数据类型[] 变量名 = {数据1，数据2，数据3，....}
int[] arr = {1,2,3};
```

动态初始化: 手动**指定数组长度**，由系统给出默认初始化值

静态初始化: 手动**指定数组元素**，系统会根据元素个数，计算出数组的长度

## 3.4、数组遍历

```java
// 动态获取数组元素个数: 数组名.length
int[] arr= {11,22,33,44,55};
for(int i = 0;i < arr.length; i++ ){
    System.out.println(arr[i]);
}
```

## 3.5、获取最值

```java
/*
1.假设数组中的第一个元素为最大值
2.遍历数组，获取每一个元素，准备进行比较
3.如果比较的过程，出现了比max更大的，让max记录更大的值
4.循环结束后，打印最大值
*/

public static void main(String[] args){
    int[] arr = {12,45,98,73,60};
    int max = arr[0];
    for(int i = 1; i < arr.length;i++){
        if(arr[i] > max){
            max = arr[i];
        }
    }
    System.out.println("max" + max);
}
```



# 4、方法

## 4.1、方法定义

```java
public static void 方法名(){
    //方法体
}

public static void eat(){
    //方法体
}
```

## 4.2、方法调用

```java
方法名();

eat();
```

**注意**:

1. 方法必须先定义后调用
2. 方法与方法之间是平级关系，不能**嵌套定义**
3. 方法没有被调用的时候，都在**方法区**中的字节码文件(.class)中存储
4. 方法被调用的时候，需要进入到**栈内存**中运行

## 4.3、奇偶数判断

```java
public class Demo{
    public static void main(String[] args){
        // 3. main 方法中调用method
        method();
    }
    // 1.定义method方法
    public static void method(){
        // 2.方法中定义变量,使用if语句判断是奇数还是偶数
        int num = 10;
        if(num % 2 ==0){
            System.out.println("偶数");
        }else{
            System.out.println("奇数");
        }
    }
}
```

## 4.4、带参数的方法

```java
public static void 方法名(数据类型变量名1,数据类型变量名2,....){.}

    
public static void getMax(int number1,int number2){....}
```



```java
方法名(参数);

方法名(变量名1/常量值1,变量名2,常量值2);
getMax(5,6);
```



```java
public class Demo1 {
    public static  void  main(String[] args){
        IsEvenNumber(10);
    }
    public static void IsEvenNumber(int num){
        if(num % 2 == 0){
            System.out.println("是偶数");
        }else{
            System.out.println("是奇数");
        }
    }
}
```

### 4.4.1、案例 :打印n-m所有的奇数

```java
public class Demo{
    public static void main(String[] args){
        print(10,20);
    }
    // 1.定义方法，方法名为print
    // 2.方法中添加两个int类型的形参
    public static void print(int n,int m){
        System.out.println(n + "到" + m + "之间的奇数为");
        for(int i = n; i <= m;i++){
            if(i % 2 == 1){
                System.out.println(i);
            }
        }
        
    }
}
```

## 4.5、带返回值方法

### 4.5.1、定义

```java
public static 数据类型 方法名(参数){
    return 数据;
}


public static boolean isEvenNumber(int number){
    return true;
}

public static int getMax(int a,int b){
    return 100;
}
```

注意:  方法定义时 return 后面的返回值与方法定义上的数据类型要匹配，否则程序将报错

### 4.5.2、调用

```java
格式一: 方法名(参数);
isEvenNumber(5);

格式二: 数据类型 变量名 = 方法名(参数);
boolean flag = isEvenNumber(5);

```

```java
public static void main(String[] args){
    // 需求: 定义一个方法，计算两个整数相加的和
    int num = add(10, 10);
    System.out.println(num);
}
public static int add(int a, int b){
    int c = a + b;
    return c;
}

```

### 4.5.3、案例

设计一个方法可以获取两个数的较大值，数据来自于参数

```java
public class Demo{
    public static void main(String[] args){
        int result = getMax(10,20);
        System.out.println(result);
        
    }
    public static int getMax(int a, int b){
        if(a > b){
            return a;
        }else{
            return b;
        }
    }
}
```



## 4.6、方法的通用格式

```java
public static 返回值类型 方法名(参数){
    方法体;
    return 数据;
}
```



## 4.7、方法的注意事项

1. 方法不能嵌套定义

2. 方法的返回值类型为 void ，表示该方法没有返回值,没有返回值的方法可以省略 return 语句不写。如果要编写return，后面不能跟具体的数据，执行不到，属于无效的代码


![在这里插入图片描述](https://img-blog.csdnimg.cn/20210602205445297.png#pic_center)

3. return 语句下面，不能编写代码，因为永远执行不到，属于无效的代码

##  4.8、方法重载

简单记:同一个类中，**方法名相同，参数不同的方法**

参数不同: 个数不同，类型不同，顺序不同


![在这里插入图片描述](https://img-blog.csdnimg.cn/20210602205454966.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)


**注意**

**识别方法之间是否是重载关系，只看方法名和参数，跟返回值无关**





### 4.8.1、案例:重载练习

```java
// 需求:使用方法重载的思想，设计比较两个整数是否相同的方法，兼容全整数类型()


public class Demo{
    public static void main(String[] args){
        int a = 10;
        int b = 20;
        System.out.println(compare(a,b));
    }
    
    
    public static boolean compare(int a,int b){
        return a == b;
    }
     public static boolean compare(byte a,byte b){
        return a == b;
    }
     public static boolean compare(short a,short b){
        return a == b;
    }
     public static boolean compare(long a,long b){
        return a == b;
    }
}
```

## 4.9、方法参数传递

### 4.9.1、方法参数传递(基本类型)

```java
public class Demo{
    public static void main(String[] args){
        int number = 100;
        System.out.println("调用change方法前:" + number);
        // 100
        change(number);
        System.out.println("调用change方法后:" + number);
        // 100
    }
}
```



### 4.9.2、方法参数传递(引用类型)

```java
public class Demo{
    /*
      方法参数传递为引用数据类型:传入方法中的，是内存地址
    */
    public static void main(String[] args){
        int[] arr = {10,20,30};
        System.out.println("调用change方法前:" + arr[1]);
        // 20
        change(arr);
        System.out.println("调用change方法后:" + arr[1]);
        // 200
        
    }
    public static void change(int[] arr){
        arr[1] = 200;
    }
}
```

### 4.9.3、案例:数组遍历


![在这里插入图片描述](https://img-blog.csdnimg.cn/20210602205507201.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)


```java
public class Demo{
    public static void main(String[] args){
        int[] arr = {11,22,33,44,55};
        printArray(arr);
        
        
        
    }
    // 定义一个方法，对数组进行遍历
    // 1.参数: int[] arr 
    // 2.返回值类型: void 
    System.out.print("[");
    public static void printArray(int[] arr){
        
        for(int i = 1; i <= arr.length; i++){
            if(i == arr.length - 1){
                //最大索引 = 数组长度 - 1
                System.out.println(arr[i] + "]");
            }else
            {
                System.out.print(arr[i] + ",");   
            }
            
        }
    }
}
```



### 4.9.4、案例:获取数组最大值

```java
public class Demo{
    public static void main(String[] args){
        // 1.定义一个数组
        int[] arr ={11,22,55,44,33};
        int max = getMax(arr);
        System.out.println(max);
    }
    
    
    // 2.定义一个方法，用来获取数组中的最大值
    // 2.1 参数 int[] arr
    // 2.2 返回值类型   int
    public static int getMax(int[] arr){
        int max = arr[0];
        for(int i = 1; i <= arr.length;i++){
            if(max < arr[i]){
                max = arr[i];
            }
        }
        return max;
    }
    
    
    
}
```

### 4.9.5、案例:获取数组最大值和最小值


![在这里插入图片描述](https://img-blog.csdnimg.cn/20210602205518214.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)


```java
public static void main(String[] args){
    int[] arr = {11,55,22,33,44};
    int[] maxAndMin = getMaxAndMin(arr);
}

// 返回值类型:数组类型 int[]
public static int[] getMaxAndMin(int[] arr){
     int max = arr[0];
        for(int i = 1; i <= arr.length;i++){
            if(max < arr[i]){
                max = arr[i];
            }
        }
    
    int min = arr[0];
    for(int i = 1; i <= arr.length;i++){
            if(min > arr[i]){
                min = arr[i];
            }
        }
    int[] maxAndMin = {max,min};
    return maxAndMin;
}
```

# 5、二维数组

```java
格式一 :数据类型[][] 变量名;
int[][] arr;

格式二 :数据类型 变量名[][];
int arr[][];

格式三 :数据类型[] 变量名[];
int[] arr[];
```

## 5.1、动态初始化

```java
格式: 数据类型[][] 变量名 = new 数据类型[m][n];
m 表示这个二维数组，可以存放多少个一维数组
n 表示每一个一维数组，可以存放多少个元素
    
    
int[][] arr = new int[2][3];
// 该数组可以存放 2 个 一维数组，每个一维数组中可以存放 3 个 int 类型元素


```

## 5.2、访问元素

```java
public class Demo{
    public static void main(String[] args){
        /*
        问题:二维数组中存储的是一维数组，那能不能存入[提前创建好的一维数组]呢？
        */
        
        int[] arr1 = {11,22,33};
        int[] arr2 = {44,55,66};
        int[] arr3 = {77,88,99,100};
        
        int[][] arr = new int[3][3];
        
        arr[0] = arr1;
        arr[1] = arr2;
        arr[2] = arr3;
        
        System.out.println(arr[1][2]);
        // 66
        System.out.println(arr[2][3]);
        // 100
        
    }
}
```

## 5.3、静态初始化

```java
// 格式: 数据类型[][] 变量名 = new 数据类型[][] {{元素1，元素2...},{元素1,元素2....}};

int[][] arr = new int[][]{{11,22},{33,44}};

// 简化格式
数据类型[][] 变量名 ={{元素1,元素2},{元素1,元素2....}};

int[][] arr ={{11,22},{33,44}};
```

## 5.4、遍历二维数组



```java
public class Demo{
      /*
        需求:已知一个二维数组 arr = {{11,22,33},{44,55,66}}
        遍历该数组，取出所有元素并打印
        */
    public static void main(String[] args){
      
        int[][] arr = {{11,22,33},{44,55,66}};
        // 遍历二维数组，取出里面每一个一维数组
        for(int i = 0;i < arr.length;i++){
            // 遍历一维数组,arr[i]就是每一个一维数组
            for(int j = 0;j < arr[i].length;j++){
                System.out.println(arr[i][j]);
            }
        }
    }
}
```

## 5.5、二维数组求和


![在这里插入图片描述](https://img-blog.csdnimg.cn/20210602205532588.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)


```java
public static void main(String[] args){
    // 1.定义求和变量
    int sum = 0;
    int[][] arr = {{11,22,33},{44,55,66},{77,88,99}};
    // 2.遍历二维数组，获取所有元素
    for(int i = 0;i < arr.length;i++){
        for(int j = 0;i < arr[i].length;j++){
            sum += arr[i][j];
        }
    }
    System.out.println(sum);
}
```

# 6.面向对象基础

## 6.1、类的定义

类的组成:  **属性** 和 **行为**

1.属性: 在代码中通过**成员变量**来体现(类中方法外的变量)

2.行为: 在代码中通过**成员方法**来体现(和前面的方法相比，去掉static关键字即可)

```java
public class 类名{
    // 成员变量
    变量1的数据类型 变量1;
    变量2的数据类型 变量2;
    .....
    // 成员方法
    方法1;
    方法2;
    .......
}




public class Student{
    // 属性: 姓名,年龄
    // 成员变量:跟之前定义变量的格式一样，只不过位置发生了改变，类中方法外
    String name;
    int age;
    // 在不在Student 类中 ? 在
    // 在不在方法外? 在，因为Student 类中没有方法
    
    
    // 行为: 学习
    // 成员方法:跟之前定义方法的格式一样，只不过去掉了static关键字
    public void study(){
        System.out.println("学习");
    }
}
```

## 6.2、创建对象

```java
创建对象
// 格式: 类名 对象名 = new 类名();
//       Student s = new Student();


使用对象
// 1.使用成员变量
// 格式: 对象名.变量名
        s.name
    
// 2.使用成员方法
// 格式： 对象名.方法名()
         s.study();
```

```java
public class TestStudent {
    /*
      创建对象的格式:
               类名 对象名 = new 类名();
      调用成员变量的格式:
               对象名.变量名
      调用成员方法的格式:
               对象名.方法名();
    */
    public static void main(String[] args){
        // 1.创建对象
        Student stu = new Student();
        // 2.调用成员变量
        stu.name = "张三";
        stu.age = 23;
        
        // 3.调用成员方法
        stu.study();
    }
}
```

### 6.2.1、案例:手机类


![在这里插入图片描述](https://img-blog.csdnimg.cn/20210602205544610.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)


```java
public class Phone {
    // 品牌，价格
    String brand;
    int price;
    
    // 打电话 发短信
    public void call(String name){
        Sout("给" + name + "打电话");
    }
    
    public void sendMessage(){
        Sout("群发短信");
    }
}




public class TestPhone {
    public static void main(Sring[] args){
        Phone p = new Phone();
        p.brand = "iPhone12";
        p.price = 7000;
        p.call();
    }
}
```

## 6.3、成员变量和局部变量


![在这里插入图片描述](https://img-blog.csdnimg.cn/20210602205554624.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)


**区别:**


![在这里插入图片描述](https://img-blog.csdnimg.cn/20210602205604263.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)




## 6.4、封装

### 6.4.1、private关键字

private是一个权限修饰符,可以用来修饰成员(变量，方法)

**特点:被private修饰的成员只能在本类中才能访问**

```java
public class Student {
    private int age;
    
    // 设置值
    public void setAge(int a){
       if(a >= 0 && a <= 120){
            age = a;
       }else {
           System.out.println("您输入的年龄不合理");
       }
    }
    
    // 获取值
    public void getAge(){
        return age;
    }
    
}






public class TestStudent {
    public static void main(String[] args){
        Student stu = new Student();
        stu.setAge(23);
    }
}
```

### 6.4.2、private关键字的使用

```java
public class Student {
    private String name;
    private int age;
    
    //设置姓名值
    public void setName(String n){
        name = n;
    }
    //获取姓名值
    public String getName(){
        return name;
    }
    //设置年龄值
    public void setAge(int a){
        age = a;
    }
    //获取年龄值
    public int getAge(){
        return age;
    }
    
    public void show(){
        System.out.println(name + "..." + age);
    }
}
```

右键-new-Java Class

```java
public class TestStudent {
    public static void main(String[] args){
        Student stu = new Student();
        stu.setName("张三");
        stud.setAge(23);
        
        System.out.println(stu.getName());
        System.out.println(stu.getAge());
        
         
    }
}
```

### 6.4.3、this 关键字


![在这里插入图片描述](https://img-blog.csdnimg.cn/20210602205618253.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)





![在这里插入图片描述](https://img-blog.csdnimg.cn/20210602205626755.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)


### 6.4.4、封装


![在这里插入图片描述](https://img-blog.csdnimg.cn/20210602205638759.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)





![在这里插入图片描述](https://img-blog.csdnimg.cn/20210602205648397.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)



## 6.5、构造方法

构造方法:构建、创建对象的时候，所调用的方法

```java
格式:
 1.方法名与类名相同,大小写也要一致
 2.没有返回值类型，连void都没有
 3.没有具体的返回值(不能由return带回结果数据)
     
     
     
public class Student {    // 类
    
    
    public Student(){     // 构造方法
        System.out.println("我是Student类的构造方法");
        
    }
    
}


```

```java
// 调用方法
public class TestStudent {
    public static void main(String[] args){
        Student stu = new Student();
        // 我是Student类的构造方法
    }
}

// 执行时机
// 1.创建对象的时候调用，每创建一次对象，就会执行一次构造方法
// 2.不能手动调用构造方法
   stu.Student();   // 报错
```

### 6.5.1、StringBuilder

| 方法名                           | 说明                                       |
| -------------------------------- | ------------------------------------------ |
| public StringBuilder()           | 创建一个空白可变字符串对象，不含有任何内容 |
| public StringBuilder(String str) | 根据字符串的内容，来创建可变字符串对象     |

```java
public class Demo {
    public static void main(Srting[] args){
        // public StringBuilder():创建一个空白可变字符串对象，不含有任何内容
        StringBuilder sb = new StringBuilder();
        System.out.println(sb);  // 打印出来是空白
        
        
        // public StringBuilder(String str): 根据字符串的内容，来创建可变字符串对象
        StringBuilder sb2 = new StringBuilder("abc");
        System.out.println(sb);  // 打印出来 abc
    }
}
```

### 6.5.2、注意事项

一.构造方法的创建

1. 如果没有定义构造方法，系统将给出一个**默认的无参数构造方法**

2. 如果定义了构造方法，系统将不再提供默认的构造方法

解决方法：

**无论是否使用，都手动书写无参数构造方法，和带参数构造方法**



## 6.6、案例

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210602205732731.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)






```java
/*
   javaBean类: 封装数据
*/
public class Student {
    // 两个成员变量 私有
    private String name;
    private int age;
    
    
    // 无参数构造方法
    public Student(){
        
    }
    
    
    // 有参数构造方法
    public Student(String name,int age){
        this.name = name;
        this.age = age;
    }
    // 成员方法: setXX \ gerXX
    public void setName(String name){
        this.name = name;        
    }
    public String getName(){
        return name;
    }
    
    
    public void setAge(int age){
        this.age = age
    }
    public int getAge(){
        return age;
    }
    public void show(){
        System.out.print;n(name + "..." + age);
    }
    
}
```



快捷键方法

只需要写一个类

在写私有方法即可

```java
public class Student{
    private String name;
    private int age;
    
    
}
```



无参构造方法  鼠标右键-Generate-Constructor-SelectNone

有参构造方法  鼠标右键-Generate-Constructor-Ctrl+A-OK

setXX\getXX    鼠标右键-Generate-Getter and Setter -Ctrl+A-OK



2.测试，新建一个类，需要有主函数

```java
public class TestStudent{
    public static void main(String[] args){
        // 1. 无参数构造方法创建对象，通过setXX方法给成员变量进行赋值
        Student stu1 = new Student();
        stu1.setName("张三");
        stu1.setAge(23);
        stu1.show();
        
        // 2.通过带参数构造方法，直接给属性进行赋值
        Student stu2 = new Student("李四",24);
        stu2.show();
    }
}
```



# 7、API

## 7.1、Scanner

```java
public class Demo{
    /*
       next(): 遇到了空格，就不再录入数据
       
               结束标记:空格，tab键
       nextLine(): 可以将数据完整的接收过来
       
                结束标记:回车换行符
       
    */
    
    
    
    
    public static void main(String[] args){
        // 1.创建Scanner对象
        Scanner sc = new Scanner(System.in);
        System.out.println("请输入:");
        
        // 2.调用nextLine 方法接收字符串
        // ctrl + alt + v :快速生成方法的返回值
        String s = sc.nextLine();
        System.out.println(s);
    }
}
```



```java
public java.util.Scanner;

public class Demo{
    
    /*
       nextInt 和 nextLine 方法配合使用的时候，nextLine方法就没有键盘录入的机会了
       建议:今后键盘录入数据的时候，如果是字符串和整数一起接收，建议使用next方法接收字符串
    
    */
    public static void main(String[] args){
        Scanner.sc = new Scanner(System.in);
        System.out.println("请输入整数:");
        int num = sc.nextInt();    // 10 + 回车 ,10 记录给num，回车保留
        System.out.println("请输入字符串:");
        String s =sc.next();
    }
}
```

## 7.2、String

String 类 在 java.lang 包下，所以使用的时候不需要导包

```java
public class Demo {
    /*
       java程序种，所有的双引号字符串，都是String这个类的对象，可以通过对象名.的方法点出对象的成员方法
       
       字符串是常量,它们的值在创建后不能更改
    
    */
    public static void main(String[] args){
        String s1 = "abc";
        int length = s1.length();
        System.out.println(length);  // 3
    }
}
```

## 7.3、String常见构造方法

| 方法名                         | 说明                                      |
| ------------------------------ | ----------------------------------------- |
| public String()                | 创建一个空白字符串对象，不含有任何内容    |
| public String(char[] chs)      | 根据字符数组的内容,来创建字符串对象       |
| public String(String original) | 根据传入的字符串内容，来创建字符串对象    |
| String s = “abc”               | 直接赋值的方法创建字符串对象，内容就是abc |

```java
public  statci void main(String[] args){
    // 1. public String()
    String s1 = new String();
    System.out.println(s1);   // 空白
    
    // 2. public String(char[] chs)
    char[] chs = {'a','b','c'};
    String s2 = new String(chs);
    System.out.println(s2);
    
    // 3. public String(String original)
    String s3 = new String("123");
    System.out.println(s3);
    
}
```

## 7.4、区别

>  创建字符串对象的区别对比

问题: 构造方法能创建对象，双引号也能创建字符串对象，有什么区别吗？


![在这里插入图片描述](https://img-blog.csdnimg.cn/20210602205749851.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)



![在这里插入图片描述](https://img-blog.csdnimg.cn/20210602205758994.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)








## 7.5、面试题


![在这里插入图片描述](https://img-blog.csdnimg.cn/20210602205809210.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)





![在这里插入图片描述](https://img-blog.csdnimg.cn/20210602205820210.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)



![在这里插入图片描述](https://img-blog.csdnimg.cn/20210602205829181.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)



![在这里插入图片描述](https://img-blog.csdnimg.cn/20210602205837729.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)



![在这里插入图片描述](https://img-blog.csdnimg.cn/20210602205847326.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)


## 7.6、字符串的比较

字符串是对象，它比较**内容**是否相同，是通过一个方法来实现的，这个方法叫做:  `equals`

```java
public class Demo{
    public static void main(String[] args){
        String s1 = "abc";
        String s2 = "ABC";
        String s3 = "abc";
        System.out.println(s1.equals(s2));    // false
        System.out.println(s1.equals(s3));    // true
        
        
        
        // 忽略字符串大小写来比较
        System.out.println(s1.equalsIgnoreCase(s2)); // true
        
    }
}
```

## 7.7、字符串的遍历

需求：键盘录入一个字符串，使用程序实现在控制台遍历该字符串


![在这里插入图片描述](https://img-blog.csdnimg.cn/20210602205856795.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)


```java
1.public char charAt(int index);


2.public char[] toCharArray();
```



```java
import java.util.Scanner;

public class Demo1 {
    public static void main(String[] args) {
        // 1.键盘录入一个字符串
        Scanner sc = new Scanner(System.in);
        System.out.println("请输入:");
        String s = sc.nextLine();
        // 2.遍历字符串，首先要能够获取到字符串中的每一个字符
        for(int i = 0; i < s.length();i++){
            char c = s.charAt(i);
            System.out.println(c);
        }
    }
}
```




![在这里插入图片描述](https://img-blog.csdnimg.cn/20210602205905649.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)




```java
import java.util.Scanner;

public class Demo1 {
    public static void main(String[] args) {
        // 1.键盘录入一个字符串
        Scanner sc = new Scanner(System.in);
        System.out.println("请输入:");
        String s = sc.nextLine();
        // 2.将字符串拆分为字符数组
        char[] chars = s.toCharArray();
        // 3.遍历字符数组
        for(int i = 0; i < chars.length; i++){
            System.out.println(chars[i]);
        }
        
```

## 7.8、统计字符次数


![在这里插入图片描述](https://img-blog.csdnimg.cn/20210602205915585.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)


```java
import java.util.Scanner;

public class Demo1 {
    public static void main(String[] args) {
        // 1.键盘录入一个字符串
        Scanner sc = new Scanner(System.in);
        System.out.println("请输入:");
        String s = sc.nextLine();
        // 2.统计三种类型的字符个数
        int bigCount = 0;
        int smallCount = 0;
        int numCount = 0;
        // 3.遍历字符串，得到每一个字符
        char[] chars = s.toCharArray();
        for(int i = 0; i < chars.length;i++){
            char c = chars[i];
            // 4.判断该字符属于哪种类型，然后对应类型的统计变量+1
            if(c >= 'A' && c <= 'Z'){
                bigCount++;
            }else if(c >= 'a' && c <= 'z'){
                smallCount++;
            }else if(c >= '0' && c <= '9'){
                numCount++;
            }
            // 5.输出三种类型的字符个数
            System.out.println("大写字母字符" + bigCount);
            System.out.println("小写字母字符" + smallCount);
            System.out.println("数字字母字符" + numCount);
        }
        
```

## 7.9、字符串截取

- public char substring(int beginIndex)
- public char substring(int beginIndx,endIndex)

```java
public class Demo {
    
    /*
       截取字符串:
       String substring(int beginIndex):
        从传入的索引位置处向后截取，一直截取到末尾，得到新字符串并返回
        String substring(int beginIndex, int endIndex):
        从beginIndex索引位置开始截取，截取到endIndex索引位置，得到新字符串并返回(包括头，不包括尾)
    */
    
    
    public static void main(String[] args){
        String s = "itheima";
        
        String ss = s.substring(2);
        System.out.println(ss);
        // heima
        String sss = s.substring(0,2);
        System.out.println(sss);
        // it
    }
}
```




![在这里插入图片描述](https://img-blog.csdnimg.cn/20210602205926945.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)




```java
import java.util.Scanner

public class Demo{
    public static void main(String[] args){
        // 1.键盘录入一个字符串
        Scanner sc = new Scanner(System.in);
        System.out.println("请输入手机号:");
        String telString = sc.nextLine();
        // 2.截取字符串前三位
       String start = telString.substring(0，3);
        // 3.截取字符串后四位
        String end = telString.substring(7);
        // 4.将截取后的两个字符串，中间加上****进行拼接
        System.out.println(start + "****" + end);
        
        
    }
}
```

## 7.10、字符串替换

```java
String replace(CharSequence target,Char Sequense replacement)
    // 第一个参数为target(被替换的旧值)内容
    // 第二个参数为replacement(替换的新值)进行替换
    // 返回新的字符串
    
```


![在这里插入图片描述](https://img-blog.csdnimg.cn/20210602205939217.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)




```java
import java.util.Scanner

public class Demo{
    public static void main(String[] args){
        // 1.键盘录入一个字符串
        Scanner sc = new Scanner(System.in);
        System.out.println("请输入:");
        String s = sc.nextLine();
        // 2.进行敏感提替换
       String result = s.replace("TMD","***");
        // 3.输出结果
        System.out.println(result);
```



## 7.11、切割字符串

```java
String[] split(String regex);
// 根据传入的字符串作为规则进行切割，将切割后的内容存入字符串数组中，并将字符串数组返回
String[] sArr = stuInfo.split(",");
```




![在这里插入图片描述](https://img-blog.csdnimg.cn/20210602205949641.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)






```java
    // 1.编写Student类，用于封装数据
public class Student {
    // 两个成员变量私有
   private String name;
   private String age;
    // 无参数构造方法
    public Student() {
        
    }
    // 有参数构造方法
    public Student(String name,String age){
        this.name = name;
        this.age = age;
    }
    // 成员方法:setXX\ getXX
    public String getName(){
        return name;
    }
    public void setName(String name ){
        this.name = name;
        
    }
    public String getAge() {
        return age;
    }
}
```

```java
public class TestStudent {
    public static void main(String[] args){
        // 2. 键盘录入字符串
        Scanner sc = new Scanner(System.in);
        System.out.println("请输入学生信息:");
        String stuInfo = sc.nextLine();
        // stuInfo = "张三，23";
        // 3.根据逗号切割字符串
        String[] sArr = stuInfo.split(",");
        // 4.从得到的字符串数组中取出元素内容，通过Student类的有参构造方法封装为对象
        Student stu = new Student(sArr[0],sArr[1]);
        
        // 5.调用对象getXXX方法，取出数据并打印
        System.out.println(stu.getName() + "..." + stu.getAge());
    }
}
```

## 7.12、总结

### 1、字符串的比较

| public boolean equals(Object anObject)                | 比较字符串的内容，严格区分大小写 |
| ----------------------------------------------------- | -------------------------------- |
| public boolean equalslgnoreCase(String anotherString) | 比较字符串的内容，忽略大小写     |

### 2、字符串的长度

| public int length() | 返回此字符串的长度 |
| ------------------- | ------------------ |

### 3、字符串的遍历

| public char charAt(int index) | 返回指定索引处的char值       |
| ----------------------------- | ---------------------------- |
| public char[] toCharArray()   | 将字符串拆分为字符数组后返回 |

### 4、字符串的截取

| public String substring(int beginIndex,int endIndex) | 根据开始和结束索引进行截取，得到新的字符串(包含头，不包含尾) |
| ---------------------------------------------------- | ------------------------------------------------------------ |
| public String substring(int beginIndex)              | 从传入的索引处截取，截取到末尾，得到新的字符串               |

### 5、字符串的替换

| public String replacr(CharSequence target,CharSequence replacement) | 使用新值，将字符串中的旧值替换，得到新的字符串 |
| ------------------------------------------------------------ | ---------------------------------------------- |

### 6、字符串的切割

| public String[] split(String regex) | 根据传入的规则切割字符串，得到字符串数组 |
| ----------------------------------- | ---------------------------------------- |

# 8、StringBuilder

StringBuilder是一个可变的字符串类

## 8.1、StringBuilder

| 方法名                                | 说明                                                 |
| ------------------------------------- | ---------------------------------------------------- |
| public StringBuilder append(任意类型) | 添加数据，并返回对象本身                             |
| public StringBuilder reverse()        | 返回相反的字符序列                                   |
| public int length()                   | 返回长度(字符出现的个数)                             |
| public String toString()              | 通过toString()就可以实现把StringBuilder 转换为String |



```java
public class Demo {
    /*
      成员方法:
      public StringBuilder append(任意类型) : 添加数据，并返回对象
      public StringBuilder reverse():返回相反的字符序列
      public int length():返回长度(字符出现的个数)
      public String toString():通过toString()就可以实现把StringBuilder 转换为String
    */
    
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder();
        sb.append(123);
        sb.append("abc");
        sb.append(true);
        System.out.println(sb);
        // 123abctrue
        sb.append("红色").append("蓝色").append("绿色");
        
        
        
        
        System.out.println("反转前:" + sb);
        // 红色蓝色绿色
        sb.reverse();
        System.out.println("反转后:" + sb);
        // 色绿色蓝色红
        
        
        
        System.out.println("sb中字符的个数:" + sb.length());
        // 6
        
        String s = sb.toString();
        System.out.println(s);
        // 色绿色蓝色红
        
        
        
        
    }
}



```

## 8.2、案例


![在这里插入图片描述](https://img-blog.csdnimg.cn/20210602210002824.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)






```java
import java.util.Scanner;

public class Demo {
    public static void main(String[] args){
        // 1.键盘录入一个字符串
        Scanner sc = new Scanner(System.in);
        System.out.println("请输入对称字符串:");
        String s = sc.nextLine();
        // 2.将键盘录入的字符串反转
        // 将字符串封装为StringBuilder对象，目的事为了调用其反转的方法
        StringBuilder sb = new StringBuilder(s);
        sb.reverse();
        // s : String
        // sb: StringBuilder
        String reverseStr = sb.toString();
        
        // 3.使用反转之后的字符串，和原字符串进行比对
       
        if(s.equals(reverseStr)){
            System.out.println("是对称字符串");
        }else{
            System.out.println("不是对称字符串");
        }
    }
}
```


![在这里插入图片描述](https://img-blog.csdnimg.cn/20210602210011917.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)




## 8.3、拼接字符串


![在这里插入图片描述](https://img-blog.csdnimg.cn/20210602210021783.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)




```java
public static void main(String[] args){
    // 1.定义一个 int 类型的数组，用静态初始化完成数组元素的初始化
    int[] arr = {1,2,3};
}
    // 2.定义一个方法，返回值类型 String,参数列表 int[] arr
public static String arrayToString(int[] arr){
    // 3.在方法中用StringBuilder 按照要求进行拼接，并将结果转成 String 返回
    StringBuilder sb = new StringBuilder();
}
```

# 9、集合基础

```java
package com.DL.Demo.domain;

public class Student {
    private String name;
    private int age;

    public Student() {
    }

    public Student(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}

```

```java
package com.DL.Demo;

import com.DL.Demo.domain.Student;

public class Demo {
    /*
       需求:将(张三,23)(李四,24)(王五,25)
       封装为3个学生对象并存入数组
       随后遍历数组，将学生信息输出在控制台

       思路:
           1.定义学生类准备用于封装数据
           2.动态初始化长度为3的数组，类型为Student类型
           3.根据需求创建3个学生对象
           4.将学生对象存入数组
           5.遍历数组，取出每一个学生对象
           6.调用对象的getXXX方法获取学生信息，并输出在控制台
    */
    public static void main(String[] args) {
        //  2.动态初始化长度为3的数组，类型为Student类型
        Student[] arr = new Student[3];
        //  3.根据需求创建3个学生对象
        Student stu1 = new Student("张三",23);
        Student stu2 = new Student("李四",24);
        Student stu3 = new Student("王五",25);
        //  4.将学生对象存入数组
        arr[0] = stu1;
        arr[1] = stu2;
        arr[2] = stu3;
        //  5.遍历数组，取出每一个学生对象
        for(int i = 0;i < arr.length; i++){
            Student temp = arr[i];
            System.out.println(temp.getName() + "..." + temp.getAge());
        }



    }
}

```

## 9.1、集合和数组的对比

1. 集合类的特点:提供一种存储空间可变的存储模型，存储的数据**容量可以发生改变**

2. 集合和数组的区别
   - 共同点:都是存储数据的容器
   - 不同点：数组的容量是**固定的**，集合的容量是**可变的**

如果存储的数据，长度经常发生改变，推荐使用集合

## 9.2、ArrayList

集合类有很多，目前我们先学习一下: **ArrayList**

```java
import java.util.ArrayList;

public class Demo{
    /*
       ArrayList构造方法:
               ArrayList() 构造一个初始容量为 10 的空列表
       成员方法:
           添加:
               boolean add(E e) 将指定的元素添加到此列表的尾部
               void add(int index,E element)将指定的元素插入此列表中的指定位置
               
    */
    public static void main(String[] args){
        // 1.创建集合容器对象
        ArrayList list = new ArrayList();
        // 2.调用对象的add方法，向容器中添加数据
        list.add("abc");
        list.add(123);
        list.add(true);
        // 带尖括号表示只能添加尖括号里面的数据类型
        ArrayList<String> list1 = new ArrayList<>();
        list1.add("abc");
        
        
        list.add(0,"111");
        // [111,abc,123,true]
        
        
    }
}
```

## 9.3、ArrayList集合常用方法

| 方法名                            | 说明                                   |
| --------------------------------- | -------------------------------------- |
| public boolean remove(Object o)   | 删除指定的元素，返回删除是否成功       |
| public E remove(int index)        | 删除指定索引处的元素,返回被删除的元素  |
| public E set(int index,E element) | 修改指定索引处的元素，返回被修改的元素 |
| public E get(int index)           | 返回指定索引处的元素                   |
| public int size()                 | 返回集合中元素的个数                   |

```java
/*
   集合常用成员方法:
   
     1.添加:
         boolean add(E) 将指定的元素添加到此列表的尾部
         void add(int index,E element)将指定的元素插入此列表中的指定位置
     2.删除:
         public boolean remove(Object o) 删除指定的元素，返回删除是否成功
         public E remove(int index) 删除指定索引处的元素，返回被删除的元素
     3.修改:
         public E set(int index,E element) 修改指定索引处的元素，返回被修改的元素
     
     4.查询:
         public E get(int index) 返回指定索引处的元素
         public int size() 返回集合中的元素的个数
*/
```





```java
public static void main(String[] args){
    // 1.创建集合容器对象
    ArrayList<String> list = new ArrayList<>();
    list.add("abc");
    list.add("111");
    list.add("222");
    list.add("333");
    list.add("444");
    list.add("555");
    // 2.删除 
    // 2.1 public boolean remove(Object o) 删除指定的元素，返回删除是否成功
    boolean b1 = list.remove("abc");
    
    boolean b2 = list.remove("zzz");
    
    System.out.println(b1); // true
    System.out.println(b2); // false
    System.out.println(list); //[111,222,333,444,555]
    
    // 2.2 public E remove(int index) 删除指定索引处的元素，返回被删除的元素
    String s = list.remove(0);
    System.out.println(s);     // 111
    System.out.println(list);  //[222,333,444,555]

    
    // 3.修改
    // 3.1 public E set(int index,E element) 修改指定索引处的元素，返回被修改的元素
    list.set("666");
    
    
    
    // 4.查询
    // 4.1 public E get(int index) 返回指定索引处的元素
    String s1 = list.get(0);  
    
    // 4.2 public int size() 返回集合中的元素的个数
    int size = list.size();
    System.out.println(size);   // 6
    
    
    
    
}
```

## 9.4、遍历字符串

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210602210042439.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F1Z2Vuc3Rlcm5fUVhM,size_16,color_FFFFFF,t_70#pic_center)


```java
public static void main(String[] args){
    // 1.创建集合对象
    ArrayList<String> list = new ArrayList<>();
    // 2.往集合中添加字符串
    list.add("张三");
    list.add("李四");
    list.add("王五");
    // 3.遍历集合
    for(int i = 0; i < list.size(); i++){
        // i : 每一个索引值
        list.get(i);
        String s = list.get(i);
        System.out.println(s);
        
    }
    
}
```











