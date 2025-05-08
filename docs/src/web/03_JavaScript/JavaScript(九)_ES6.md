# 1、ES6简介

## 1.1、什么是ES6

ES 的全称是 ECMAScript , 它是由 ECMA 国际标准化组织,制定的==一项脚本语言的标准化规范。==

| 年份      | 版本                                                |
| --------- | --------------------------------------------------- |
| 2015年6月 | ES2015                                              |
| 2016年6月 | ES2016                                              |
| 2017年6月 | ES2017                                              |
| 2018年6月 | ES2018                                              |
| ...       | ...ES6 实际上是一个泛指，泛指 ES2015 及后续的版本。 |

## 1.2、为什么使用ES6

每一次标准的诞生都意味着语言的完善，功能的加强。JavaScript语言本身也有一些令人不满意的地方。

- 变量提升特性增加了程序运行时的不可预测性
- 语法过于松散，实现相同的功能，不同的人可能会写出不同的代码



# 2、ES6新增语法

##  2.1、Let 关键字

ES6 中新增的用于声明变量的关键字

- `let` 声明的变量==只在所处的块级有效==

```js
if(true) {
    let a = 10;
}
console.log(a);  // a is not defined
```

使用 let 关键字声明的变量才具有块级作用域，使用var声明的变量不具备块级作用域特性

- 不存在变量提升

```js
console.log(a); // a is not defined
let a = 20;
```

- 暂时性死区

```js
var tmp = 123;
if(true) {
    tmp = 'abc';
    let tmp;
}
```

---

```html
<body>
    <script type="text/javascript">
        /*
        			let关键字就是用来声明变量的

        			使用let关键字声明的变量具有块级作用域

        			在一个大括号中 使用let关键字声明的变量才具有块级作用域 var关键字是不具备这个特点的

        			防止循环变量变成全局变量

        			使用let关键字声明的变量没有变量提升

        			使用let关键字声明的变量具有暂时性死区特性

        		*/

        /* --------let关键字就是用来声明变量的-------- */
        // let a = 10;
        // console.log(a);

        /* --------使用let关键字声明的变量具有块级作用域-------- */
        // if (true) {
        // 	let b = 20;
        // 	console.log(b)
        // 	if (true) {
        // 		let c = 30;
        // 	}
        // 	console.log(c);
        // }
        // console.log(b)

        /* -------在一个大括号中 使用let关键字声明的变量才具有块级作用域 var关键字是不具备这个特点的--------- */

        // if (true) {
        // 	let num = 100;
        // 	var abc = 200;
        // }
        // console.log(abc);
        // console.log(num)


        /* -------防止循环变量变成全局变量--------- */
        // for (let i = 0; i < 2; i++) {}
        // console.log(i);


        /*-----使用let关键字声明的变量没有变量提升------*/
        // console.log(a);
        // let a = 100;


        /* -------使用let关键字声明的变量具有暂时性死区特性------- */
        // var num = 10
        // if (true) {
        // 	console.log(num);
        // 	let num = 20;
        // }
        var arr = [];
        for (var i = 0; i < 2; i++) {
            arr[i] = function() {
                console.log(i);
            }
        }
        arr[0]();
        arr[1]();
    </script>
</body>
```





## 2.2、经典面试题

面试题1：

```js
var arr = [];
for (var i = 0; i < 2; i++){
    arr[i] = function() {
        console.log(i);
    }
}
arr[0](); // 2
arr[1](); // 2
```

![](JavaScript(九)_ES6.assets/1.png)

- ==此题的关键点在于变量i是全局的，函数执行时输出的都是全局作用域下的i值==

面试题2：

```js
let arr = [];
for(let i = 0;i < 2; i++) {
    arr[i] = function() {
        console.log(i);
    }
}
arr[0](); // 0
arr[1](); // 1
```

![2](JavaScript(九)_ES6.assets/2.png)

此题的关键点在于每次循环都会产生一个块级作用域，每个块级作用域中的变量都是不同的，函数执行时输出的是自己上一级（循环产生的块级作用域）作用域下的i值.





## 2.3、const 关键字

作用：声明常量，常量就是值(内存地址) 不能变化的值

- 使用`const`关键字声明的常量具有块级作用域

```js
if(true) {
    const a = 10;
}
 console.log(a); // a is not defined
```

- 声明常量时必须赋值

```js
const PI; // Missing initializer in const declaration
```

- 常量赋值后，值不能修改

```js
const PI = 3.14;
PI = 100; // Assignment to constant variable. 


const ary = [100, 200];
ary[0] = 'a';
ary[1] = 'b';
console.log(ary); // ['a', 'b']; 
ary = ['a', 'b']; // Assignment to constant variable.
```

---

```html
<body>
    <script type="text/javascript">
        // 使用const关键字声明的常量具有块级作用域
        // if (true) {
        // 	const a = 10;
        // 	if (true) {
        // 		const a = 20;
        // 		console.log(a);
        // 	}
        // 	console.log(a);
        // }
        // console.log(a);

        // 使用const关键字声明的常量必须赋初始值
        // const PI = 3.14;

        // 常量声明后值不可更改 
        // const PI = 3.14;
        // // PI = 100;
        // const ary = [100, 200];
        // ary[0] = 123;
        // ary = [1, 2]
        // console.log(ary);
        let arr = [];
        for (let i = 0; i < 2; i++) {
            arr[i] = function() {
                console.log(i);
            }
        }
        arr[0]();
        arr[1]();
    </script>
</body>
```



## 2.4、let,const,var

- 使用**var** 声明的变量，其作用域**为该语句所在的函数内，且存在变量提升现象**
- 使用**let**声明的变量，其作用域**为该语句所在的代码块内，不存在变量提升**
- 使用**const**声明的常量，在**后面出现的代码中不能再修改该常量的值**

| var          | let            | const          |
| ------------ | -------------- | -------------- |
| 函数级作用域 | 块级作用域     | 块级作用域     |
| 变量提升     | 不存在变量提升 | 不存在变量提升 |
| 值可更改     | 值可更改       | 值不可更改     |



## 2.5、解构赋值

ES6允许从数组中提取值，按照对应位置，对变量赋值，对象也可以实现解构

### 2.5.1、数组解构

```js
// 数组解构允许我们按照一一对应的关系从数组中提取值然后将值赋值给变量
let ary = [1,2,3];
let[a,b,c,d,e] = [1,2,3];
console.log(a); // 1
console.log(b); // 2
console.log(c); // 3

// 如果解构不成功，变量的值为undefined
console.log(d); //undefined
console.log(e); //undefined
```

### 2.5.2、对象解构

```js
// 对象解构允许我们使用变量的名字匹配对象的属性 ，匹配成功将对象属性的值赋值给变量
let person = {name: 'zhangsan',age: 20};
let {name,age} = person;
console.log(name); // 'zhangsan'
console.log(age); // 20

//另一种写法
let {name: myName,age: myAge} = person;
console.log(myName); //'zhangsan'
console.log(myAge); //20
```



## 2.6、箭头函数

==ES6 中新增的定义函数的方式==

```js
// 箭头函数是用来简化函数定义语法的
() => { }
const fn = () => { }

const fn = () => {
    console.log(123);
}
```

- ==函数体中只有一句代码，且代码的执行解构就是返回值，可以省略大括号==

```js
function sum(num1,num2) {
    return num1 + num2;
}

const sum = (num1, num2) => num1 + num2;
```

- 如果形参只有一个，可以省略小括号

```js
function fn(v) {
    return v;
}

const fn = v => v;
```

- ==剩余参数语法允许我们将一个不定数量的参数表示为一个数组==

```js
function sum (first, ...args) {
     console.log(first); // 10
     console.log(args); // [20, 30] 
 }
 sum(10, 20, 30);



const sum = (...args) => {
    let total = 0;
    args.forEach(item => {
        total += item;
    })
    return total;
};
sum(10,20);
sum(10,20,30);
```

- ==剩余参数和解构配合使用==

```js
let students = ['wangwu', 'zhangsan', 'lisi'];
let [s1, ...s2] = students; 
console.log(s1);  // 'wangwu' 
console.log(s2);  // ['zhangsan', 'lisi']
```

---

```html
<body>
	<script type="text/javascript">
		// 箭头函数是用来简化函数定义语法的
		// const fn = () => {
		// 	console.log(123)
		// }
		// fn();
		
		// 在箭头函数中 如果函数体中只有一句代码 并且代码的执行结果就是函数的返回值 函数体大括号可以省略
		// const sum = (n1, n2) => n1 + n2;	 
		// const result = sum(10, 20);
		// console.log(result)
		
		// 在箭头函数中 如果形参只有一个 形参外侧的小括号也是可以省略的
		// const fn = v => {
		// 	alert(v);
		// }
		// fn(20)
		
		// 箭头函数不绑定this 箭头函数没有自己的this关键字 如果在箭头函数中使用this this关键字将指向箭头函数定义位置中的this
		
		function fn () {
			console.log(this);
			return () => {
				console.log(this)
			}
		}

		const obj = {name: 'zhangsan'};

		const resFn = fn.call(obj);

		resFn();
	</script>
</body>
```





### 2.6.1、箭头函数的this

箭头函数不绑定 `this`关键字，箭头函数中的`this`，指的是函数定义位置的上下文`this`

```js
const obj = { name: '张三'} 
 function fn () { 
     console.log(this);
     return () => { 
         console.log(this); // 这个this在fn里面，fn又指向obj，则this指向obj
     } 
 } 
 const resFn = fn.call(obj); 
 resFn();
```

来看一道面试题：

```js
var obj = {
    age: 20;
    say: () => {
        alert(this.age);
    }
}
obj.say();  // ?
// 弹出的是undefined
```

### 2.6.2、剩余参数

剩余参数语法允许我们将一个不定数量的参数表示为一个数组。

```js
function sum(first,...args) {
    console.log(first);			// 10
    console.log(args);			// [20,30]
}
sum(10,20,30);
```

### 2.6.3、剩余参数和解构配合使用

```js
let students = ['wangwu','zhangsan','lisi'];
let [s1,...s2] = students;

console.log(s1);	//'wangwu'
console.log(s2);	//['zhangsan','lisi']
```





# 3、ES6内置对象扩展

## 3.1、Array的扩展方法

### 3.1.1、扩展运算符(展开语法)

- ==扩展运算符可以将数组或者对象转为用逗号分隔的参数序列==

```js
let ary = [1, 2, 3];
 ...ary  // 1, 2, 3
 console.log(...ary);    // 1 2 3
 console.log(1, 2, 3)    // 1 2 3
```

- ==扩展运算符可以应用于合并数组==

```js
// 方法一 
let ary1 = [1, 2, 3];
let ary2 = [3, 4, 5];
let ary3 = [...ary1, ...ary2];
// 方法二 
ary1.push(...ary2);
```

- ==利用扩展运算符将伪数组转换为真正的数组==

```js
var oDivs = document.getElementsByTagName('div');
// 这个 API 拿到的是伪数组
var ary = [...oDivs];
ary.push('a');
```

---

```html
<body>
	<div>1</div>
	<div>4</div>
	<div>3</div>
	<div>6</div>
	<div>2</div>
	<div>5</div>
    
	<script type="text/javascript">
		// 扩展运算符可以将数组拆分成以逗号分隔的参数序列
		// let ary = ["a", "b", "c"];
		// ...ary // "a", "b", "c"
		// console.log(...ary)
		// console.log("a", "b", "c")
		
		// 扩展运算符应用于数组合并
		// let ary1 = [1, 2, 3];
		// let ary2 = [4, 5, 6];
		// // ...ary1 // 1, 2, 3
		// // ...ary1 // 4, 5, 6
		// let ary3 = [...ary1, ...ary2];
		// console.log(ary3)

		// 合并数组的第二种方法
		// let ary1 = [1, 2, 3];
		// let ary2 = [4, 5, 6];

		// ary1.push(...ary2);
		// console.log(ary1)
		
		// 利用扩展运算符将伪数组转换为真正的数组
		var oDivs = document.getElementsByTagName('div');
		console.log(oDivs)
		var ary = [...oDivs];
		ary.push('a');
		console.log(ary);
	</script>
</body>
```







### 3.1.2、构造函数方法

`Array.from()`

- ==将类数组或可遍历对象转换为真正的数组==

```js
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
}; 
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
```

- ==方法还可以接收第二个参数，作用类似于数组的`map`方法，用来对每个元素进行处理，将处理后的值放入返回的数组==

```js
let arrayLike = { 
     "0": 1,
     "1": 2,
     "length": 2
 }
let newAry = Array.from(aryLike, item => item *2)
let newAry = Array.from(aryLike,item => {
    return item * 2;
})
```



### 3.1.3、实例方法

#### ① find()

- ==用于找出第一个符合条件的数组成员，如果没有找到返回 undefined==

```js
let ary = [{
     id: 1,
     name: '张三'
	 }, { 
     id: 2,
     name: '李四'
 }]; 
// 查找返回 id 为 2 的对象
let target = ary.find((item, index) => item.id == 2);
```

#### ②findIndex()

- ==用于找出第一个符合条件的数组成员的位置，如果没有找到返回 -1==

```js
let ary = [1, 5, 10, 15];
let index = ary.findIndex((value, index) => value > 9); 
console.log(index); // 2
```



#### includes()

- ==表示某个数组是否包含给定的值，返回布尔值==

```js
[1, 2, 3].includes(2) // true 
[1, 2, 3].includes(4) // false
```









## 3.2、String的扩展方法

### 3.2.1、模板字符串

- ==ES6新增的创建字符串的方式，使用反引号定义==

```js
let name = `zhangsan`;
```

- ==模板字符串可以解析变量==

```js
let name = '张三';
let say Hello = `hello,my name is ${name}`;
// hello, my name is zhangsan
```

- ==模板字符串可以换行==

```js
let result = { 
     name: 'zhangsan', 
     age: 20, 
     sex: '男' 
 } 
 let html = ` <div>
     <span>${result.name}</span>
     <span>${result.age}</span>
     <span>${result.sex}</span>
 </div> `;
```

- ==模板字符串可以调用函数==

```js
const sayHello = function () { 
    return '哈哈哈哈 追不到我吧 我就是这么强大';
 }; 
let greet = `${sayHello()} 哈哈哈哈`; 
console.log(greet); 
// 哈哈哈哈 追不到我吧 我就是这么强大 哈哈哈哈
```



### 3.2.2、实例方法

#### ①startsWith()

`startsWith() `： 表示参数字符串是否在原字符串的头部，返回布尔值

#### ②endsWith()

`endsWith()`:  表示参数字符串是否在原字符串的尾部，返回布尔值

```js
let str = 'Hello world!';
str.startsWith('Hello') // true 
str.endsWith('!')       // true
```

#### ③repeat()

`repeat()` : 该方法表示将原字符串重复n次，返回一个新字符串

```js
'x'.repeat(3)      // "xxx" 
'hello'.repeat(2)  // "hellohello"
```



## 3.3、Set数据结构

ES6 提供了新的数据结构 Set

- ==它类似于数组，但是成员的值都是唯一的，没有重复的值==
- Set 本身是一个构造函数，用来生成 Set 数据结构

```js
const s = new Set();
```

- ==Set函数可以接受一个数组作为参数，用来初始化==

```js
const set = new Set([1,2,3,4,4]);
```



### 3.3.1、实例方法

- `add(value)`: 添加某个值，返回 Set 结构本身
- `delete(value)`: 删除某个值，返回一个布尔值，表示删除是否成功
- `has(value)`: 返回一个布尔值，表示该值是否为 `Set`的成员
- `clear()`: 清除所有成员，没有返回值

```js
const s = new Set();
s.add(1).add(2).add(3); // 向 set 结构中添加值 
s.delete(2)             // 删除 set 结构中的2值 
s.has(1)                // 表示 set 结构中是否有1这个值 返回布尔值 
s.clear()               // 清除 set 结构中的所有值
```

---

```html

<body>
    <script type="text/javascript">
        // const s1 = new Set();
        // console.log(s1.size)

        // const s2 = new Set(["a", "b"]);
        // console.log(s2.size)

        // const s3 = new Set(["a","a","b","b"]);
        // console.log(s3.size)
        // const ary = [...s3];
        // console.log(ary)

        // const s4 = new Set();
        // 向set结构中添加值 使用add方法
        // s4.add('a').add('b');
        // console.log(s4.size)

        // 从set结构中删除值 用到的方法是delete
        // const r1 = s4.delete('c');
        // console.log(s4.size)
        // console.log(r1);

        // 判断某一个值是否是set数据结构中的成员 使用has
        // const r2 = s4.has('d');
        // console.log(r2)

        // 清空set数据结构中的值 使用clear方法
        // s4.clear();
        // console.log(s4.size);

        // 遍历set数据结构 从中取值
        // const s5 = new Set(['a', 'b', 'c']);
        // s5.forEach(value => {
        // 	console.log(value)
        // })
        const set = new Set([1, 2, 3, 4, 4]);
        const ary = [...s3];
        console.log(ary); // 1,2,3,4
    </script>
</body>
```



### 3.3.2、遍历

Set 结构的实例与数组一样，也拥有forEach方法，用于对每个成员执行某种操作，没有返回值

```js
s.forEach(value =>console.log(value))
```

```js
const s5 = new Set(['a','b','c']);
s5.forEach(value => {
    console.log(value);
})
```











