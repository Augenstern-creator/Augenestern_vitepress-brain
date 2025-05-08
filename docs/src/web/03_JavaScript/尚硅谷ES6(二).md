# 1、class类

- ES6 提供了更接近传统语言的写法，引入了 Class（类）这个概念，作为对象的模板。
- 通过 class 关键字，可以定义类。
- 基本上，ES6 的 class 可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的 class 写法只是让对象的原型的写法更加清晰，更加像面向对象编程的语法而已。

知识点：

- `class` 声明类
- `constructor` 定义构造函数初始化
- `extends` 继承父类
- `super` 调用父级构造方法
- `static` 定义静态方法和属性
- 父类方法可以重写

我们首先来看 ES5 构造函数实例化对象的语法如下：

```js
//手机
function Phone(brand, price){
    this.brand = brand;
    this.price = price;
}

//添加方法
Phone.prototype.call = function(){
    console.log("我可以打电话!!");
}

//实例化对象
let Huawei = new Phone('华为', 5999);
Huawei.call();		// 调用 call 方法
console.log(Huawei);
```

我们再来看 ES6 实例化对象的语法如下：

```js
//class
class Shouji{
    //构造方法 名字不能修改
    constructor(brand, price){
        this.brand = brand;
        this.price = price;
    }

    //添加方法必须使用该语法, 不能使用 ES5 的对象完整形式
    call(){
        console.log("我可以打电话!!");
    }
}

let onePlus = new Shouji("小米", 1999);

console.log(onePlus);
```

![](尚硅谷ES6(二).assets/1.png)

## 1.1、class的静态成员

- `static` 修饰的属性属于类，而不属于对象

```js
class Phone{
    //静态属性
    static name = '手机';
    //静态方法
    static change(){
        console.log("我可以改变世界");
    }
}

let xiaomi = new Phone();
console.log(xiaomi.name);		// undefined
console.log(Phone.name);		// 手机
console.log(Phone.change());    // 我可以改变世界
```



## 1.2、类的继承

- ES5中是使用构造函数来实现继承,代码如下

```html
<script>
    //手机
    function Phone(brand, price){
        this.brand = brand;
        this.price = price;
    }

    Phone.prototype.call = function(){
        console.log("我可以打电话");
    }

    //智能手机
    function SmartPhone(brand, price, color, size){
        Phone.call(this, brand, price);
        this.color = color;
        this.size = size;
    }

    //设置子级构造函数的原型
    SmartPhone.prototype = new Phone;
    SmartPhone.prototype.constructor = SmartPhone;

    //声明子类的方法
    SmartPhone.prototype.photo = function(){
        console.log("我可以拍照")
    }

    SmartPhone.prototype.playGame = function(){
        console.log("我可以玩游戏");
    }

    const chuizi = new SmartPhone('锤子',2499,'黑色','5.5inch');

    console.log(chuizi);

</script>
```

- **ES6中是使用 extends 来实现继承**,代码如下

```javascript
class Phone{
    //构造方法
    constructor(brand, price){
        this.brand = brand;
        this.price = price;
    }
    //父类的成员属性
    call(){
        console.log("我可以打电话!!");
    }
}

// 子类智能手机继承父类
class SmartPhone extends Phone {
    //构造方法
    constructor(brand, price, color, size){
        super(brand, price);// 相当于调用父类的构造方法:Phone.call(this, brand, price)
        this.color = color;
        this.size = size;
    }

    photo(){
        console.log("拍照");
    }

    playGame(){
        console.log("玩游戏");
    }

    // 子类重写父类方法
    call(){
        console.log('我可以进行视频通话');
    }
}

const xiaomi = new SmartPhone('小米',799,'黑色','4.7inch');
// console.log(xiaomi);
xiaomi.call();				// 	我可以进行视频通话
xiaomi.photo();				//  拍照
xiaomi.playGame();			//  玩游戏
```

## 1.3、类的get和set方法



```javascript
// get 和 set
class Phone {
    // 当访问price属性时候调用 get 函数
    get price() {
        console.log("价格属性被读取了");
        return 'iloveyou';
    }

    // 当对 price 进行赋值时候会调用 set函数
    set price(newVal) {
        console.log('价格属性被修改了');
    }
}

//实例化对象
let s = new Phone();
s.price; // 价格属性被读取了
s.price = 'free'; // 价格属性被修改了
```







# 2、数值扩展

## 2.1、Number.EPSILON

- Number.EPSILON  是 JavaScript 中表示的最小精度
- 浮点数的计算往往是不精确的，借助 `Number.EPSILON` 我们可以进行浮点数的计算

```js
// Number.EPSILON 进行浮点数的计算
function equal(a, b) {
    if (Math.abs(a - b) < Number.EPSILON) {
        return true;
    } else {
        return false;
    }
}
console.log(0.1 + 0.2 === 0.3);             // false
console.log(equal(0.1 + 0.2, 0.3))          // true
```



## 2.2、二进制和八进制

ES6 提供了二进制和八进制数值的新的写法，分别用前缀 `0b` 和 `0o` 表示。

```js
//1. 二进制和八进制
let b = 0b1010;
let o = 0o777;
let d = 100;				// 十进制
let x = 0xff;				// 十六进制
console.log(x);
```



## 2.3、Number.isFinite

- `Number.isFinite` 检测一个数值是否为有限数

```js
console.log(Number.isFinite(100));			// true
console.log(Number.isFinite(100/0));		// false
console.log(Number.isFinite(Infinity));		// false
```



## 2.4、Number.isNaN

- `Number.isNaN` 检测一个数值是否为 NaN 

```js
console.log(Number.isNaN(123));   // false
```



## 2.5、Number.parseInt、Number.parseFloat

- `Number.parseInt`、`Number.parseFloat`  字符串转整数

```js
console.log(Number.parseInt('5211314love'));			// 5211314
console.log(Number.parseFloat('3.1415926神奇'));		   // 3.1415926
```



## 2.6、Number.isInteger

- `Number.isInteger` 判断一个数是否为整数

```js
console.log(Number.isInteger(5));					// true
console.log(Number.isInteger(2.5));					// false
```

## 2.7、Math.trunc

- `Math.trunc` 将数字的小数部分抹掉 

```js
console.log(Math.trunc(3.5));				// 3
```

## 2.8、Math.sign

- 判断一个数到底为正数 负数 还是零

```js
console.log(Math.sign(100));				// 1代表整数
console.log(Math.sign(0));					// 0代表零
console.log(Math.sign(-20000));				// -1代表负数
```



# 3、对象方法扩展

## 3.1、Object.js

- Object.is 判断两个值是否严格相等，与 `===` 行为基本一致

```js
console.log(Object.is(120, 120));//true
console.log(Object.is(NaN, NaN));//true
console.log(NaN === NaN);//false 
```

## 3.2、Object.assign 

- `Object.assign`  对象的合并

```js
const config1 = {
    host: 'localhost',
    port: 3306,
    name: 'root',
    pass: 'root',
    test: 'test'
};
const config2 = {
    host: 'http://atguigu.com',
    port: 33060,
    name: 'atguigu.com',
    pass: 'iloveyou',
    test2: 'test2'
}
// config2 对象覆盖 config1 对象,相同属性覆盖,不同属性合并
console.log(Object.assign(config1, config2));
```





## 3.3、Object.setPrototypeOf 和Object.getPrototypeOf 

- `Object.setPrototypeOf` 设置原型对象 
- `Object.getPrototypeOf ` 获取原型对象

```js
const school = {
    name: '尚硅谷'
}
const cities = {
    xiaoqu: ['北京','上海','深圳']
}
// 设置给 school 原型对象加上 cities
Object.setPrototypeOf(school, cities);
// 获取 school 的原型对象
console.log(Object.getPrototypeOf(school));
console.log(school);
```









# 4、ES7

## 4.1、Array.prototype.includes

- `includes` 方法用来检测数组中是否包含某个元素，返回布尔类型值

```javascript
// Array.prototype.includes: 检测数组中是否包含某个元素
const arr = [1,2,3,4,5];
console.log(arr.includes(1)); // true
console.log(arr.includes(6)); // false
```

## 4.2、指数操作符

ES7中引入指数运算符 `**` ，可以用来实现幂运算，功能与 `Math.pow` 结果相同

```javascript
console.log(2 ** 10); // 1024
console.log(Math.pow(2,10)); // 1024
```









# 5、ES8

## 5.1、async和await

async和 await两种语法结合可以让异步代码像同步代码一样

`async`：

- async函数的返回值为 promise 对象
- promise对象的结果由 async 函数执行的返回值决定

```javascript
// async 使得异步操作更加方便,在方法前面加上 async 关键字
// async 会返回一个 Promise 对象
async function f1(){
    // 返回字符串,只要返回的不是 Promise 类型,则这个结果就是一个成功状态的 Promise 对象
    return  '林晓';
}

async function f2(){
    // 返回的若是成功状态的 Promise 类型,则 result2 就是一个成功状态的 Promise 对象
    return new Promise((resolve,reject) => {
        resolve('成功');
    })
}

// result1 是一个 Promise 对象
const result1 = f1();
const result2 = f2();
```



`await`:

- await必须写在 async函数中
- await右侧的表达式一般为 promise对象
- **await返回的是 promise成功的值**
- await的 promise失败了 , 就会抛出异常 , 需要通过 try...catch捕获处理

```javascript
// 一般 async 函数返回的都是 Promise 对象,所以我们这里创建Promise对象
const p = new Promise(((resolve, reject) => {
    resolve("成功状态");
}));
// await 要放在 async 函数中
async function  main(){
    // await返回的是 promise成功的值
    let result = await p;
    console.log(result); // 成功状态
}
// 调用函数
main();
```







## 5.2、Object.values 和 Object.entries

- `Object.keys()` 方法返回对象所有的键
- `Object.values()` 方法返回对象所有的值
- `Object.entries()` 方法返回

```javascript
// 声明对象
const school = {
    name: "尚硅谷",
    cities: ['北京','上海','深圳'],
}

// 获取对象所有的键
console.log(Object.keys(school)); // [ 'name', 'cities' ]
// 获取对象所有的值
console.log(Object.values(school)); // [ '尚硅谷', [ '北京', '上海', '深圳' ] ]
// entries 获取对象所有的键和值,是一个数组
console.log(Object.entries(school)); // [ [ 'name', '尚硅谷' ], [ 'cities', [ '北京', '上海', '深圳' ] ] ]

// 创建Map,我们可以把 entries 获取的数组放入 Map 中
const m = new Map(Object.entries(school));
console.log(m.get('cities')); // [ '北京', '上海', '深圳' ]
```







## 5.3、Object.getOwnPropertyDescriptors

- `Object.getOwnPropertyDescriptors` ： 该方法返回指定对象所有自身属性的描述对象

```javascript
// Object.getOwnPropertyDescriptors 返回对象属性的描述对象
console.log(Object.getOwnPropertyDescriptors(school));
/**
 *
 * {
      name: {
        value: '尚硅谷',
        writable: true,
        enumerable: true,
        configurable: true
      },
      cities: {
        value: [ '北京', '上海', '深圳' ],
        writable: true,
        enumerable: true,
        configurable: true
      }
    }
 */
```







# 6、ES9

## 6.1、Rest/Spread属性

Rest 参数与 Spread 扩展运算符在 ES6 中已经引入，不过 ES6中只针对数组，在ES9中为对象提供了像数组一样的 rest 参数和扩展运算符

```javascript
function connect({host,port,...user}){
    console.log(host); //127.0.0.1
    console.log(port); //3306
    console.log(user); //{ username: 'root', password: 'root', type: 'master' }
}

connect({
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'root',
    type: 'master'
});
```









# 7、ES10

## 7.1、Object.fromEntries

- `Object.entries()` : 将对象转化为二维数组

```javascript
// 先回顾一下 ES8 的 `Object.entries` 可以将一个对象转化为二维数组
let people = {
    'name': '贺欣',
    'age': 20
}
// 将 people 对象转化为二维数组
const arr = Object.entries(people);
console.log(arr); // [ [ 'name', '贺欣' ], [ 'age', 20 ] ]
```

- `Object.fromEntries()` ：将二维数组转化为对象
  - 参数为二维数组或者一个map对象

```javascript
// Map
const m = new Map();
m.set('name','林晓');
m.set('age',20);
// ES10 中的 Object.fromEntries 可以将二维数组转化为对象
const result = Object.fromEntries(m);
console.log(result);
// { name: '林晓', age: 20 }
```







## 7.2、trimStart和trimEnd

- `trim` : 清除两侧空白字符

- `trimStart`：清除左侧空白字符
- `trimEnd`：清除右侧空白字符

```javascript
let str = '    iloveyou   ';

console.log(str);
// 清除左侧空白
console.log(str.trimStart());
// 清除右侧空白
console.log(str.trimEnd());
```







## 7.3、flat和flatMap

- `flat()` ： 将多维数组转化为低维数组
  - 参数是深度

```javascript
// 二维数组
const arr = [1,2,3,4,[5,6]];
// 将二维数组转化为一维数组
console.log(arr.flat(1)); //[ 1, 2, 3, 4, 5, 6 ]

// 三维数组
const arr1 = [1,2,3,4,[5,6,[7,8,9]]];
// 将三维数组转化为二维数组
console.log(arr1.flat(1)); // [ 1, 2, 3, 4, 5, 6, [ 7, 8, 9 ] ]
// 将三维数组转化为一维数组
console.log(arr1.flat(2)); // [1,2,3,4,5,6,7,8,9]
```





## 7.4、Symbol.prototype.description

- 返回 Symbol 的字符串描述

```javascript
// 创建Symbol
let s = Symbol('小林');
console.log(s.description); // 小林
```











# 8、ES11

## 8.1、私有属性

- `#` ： 私有属性

```javascript
class Person{
  // 公有属性
  name;
  // 私有属性
  #age;
  #weight;
  // 构造方法
  constructor(name,age,weight) {
    this.name = name;
    this.#age = age;
    this.#weight = weight;
  }

  // 对外暴露私有属性
  introduce(){
    console.log(this.name);
    console.log(this.#age);
    console.log(this.#weight);
}
}

// 实例化
const girl = new Person("小红",18,"45Kg");
console.log(girl.name);
//console.log(girl.#age); // 报错,私有成员不可访问
//console.log(girl.#weight); // 报错,私有成员不可访问
girl.introduce(); // 私有属性只有在类内部写有方法来调用
```



## 8.2、Promise.allSettled()

`Promise.allSettled()` 可用于并行执行独立的异步操作，并收集这些异步操作的结果，函数接受一个 `promise` 数组作为参数

```javascript
const p1 = new Promise((resolve,reject) => {
  setTimeout(() => {
    resolve('商品数据 - 1')
  },1000)
});

const p2 = new Promise((resolve,reject) => {
  setTimeout(() => {
    resolve('商品数据 - 2')
  },1000)
});

// 调用 allSettled() 方法
const result = Promise.allSettled([p1,p2]);
console.log(result);
```

> **Promise.allSettled永远不会被reject**

![](尚硅谷ES6(二).assets/2.png)

即使我们将其中的一个 Promise 状态变成失败， 调用 `allSettled` 后依然是成功的状态。









## 8.3、动态import

**动态导入**是JavaScript ES2019中新增的语法特性，它可以通过将代码按需导入，从而实现更加**高效的加载方式**。动态导入允许用户在运行时动态地加载模块，这是ES6中静态导入所无法实现的。



通过动态导入，我们可以在**代码运行时才加载需要的模块**，而不是将所有的模块一次性加载，这样一来，我们就可以避免因为页面过于庞大而导致的页面加载缓慢的问题。在实际应用中，我们可以通过如下方式进行动态导入：

```javascript
import(模块路径).then((模块) => {
    // 使用导入的模块
}).catch((error) => {
    // 捕获错误
});
```



## 8.4、BigInt类型



```javascript
//大整形
let n = 521n;
console.log(n,typeof(n)); // 521n bigint

// BigInt()函数:将普通整型转化为大整型
let n1 = 123;
console.log(BigInt(n));

// 主要用于大数值运算
let max = Number.MAX_SAFE_INTEGER;
console.log(BigInt(max) + BigInt(3)); // 9007199254740994n
```





## 8.5、绝对全局对象globalThis

- JavaScript 可以在不同的环境下执行，常见的有浏览器，Web Worker, Node, Deno 等等。
- 在不同的环境下，访问全局变量的方法不一样
- 比如，在浏览器上，就有 window, self, frames 等方式

```javascript
/* 浏览器环境 */
window === self       // true
window === frames     // true

// 最顶层的窗口
window === parent     // true
window === window.top // true

window.msg = 'hello,world' // ok
console.log(msg).          // hello,world
```

同样的代码，在 Web Worker 环境，或 Node 环境下运行就会报错。

```javascript
/* Node */
window.msg = 'hello,world' // Uncaught ReferenceError: window is not defined
console.log(msg)           // Uncaught ReferenceError: msg is not defined

global.msg = 'hello,world' // ok
console.log(msg)           // hello,world
```

`globalThis` 提供了一种统一的访问全局变量的方案，比如在浏览器环境，它会指向 window，在 Node 环境，它会指向 global

```javascript
/* 在绝大多数 JavaScript 运行环境下都能运行 */
globalThis.msg = 'hello,world'
console.log(msg);
```









































































