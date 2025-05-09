# 1、TypeScript

- TypeScript简称TS
- TS和JS之间的关系其实就是Less/Sass和CSS之间的关系：Less/Sass是对CSS进行扩展一样, TS也是对JS进行扩展；Less/Sass最终会转换成CSS一样, 我们编写好的TS代码最终也会换成JS
- TypeScript是JavaScript的超集，因为它扩展了JavaScript，有JavaScript没有的东西。

**作用**：因为JavaScript是弱类型, 很多错误只有在运行时才会被发现，而TypeScript提供了一套静态检测机制, 可以帮助我们在编译时就发现错误

**特点**：

- 支持最新的JavaScript新特特性
- 支持代码静态检查
- 支持诸如C,C++,Java,Go等后端语言中的特性 (枚举、泛型、类型转换、命名空间、声明文件、类、接口等)

> - 中文官网：https://www.tslang.cn/docs/home.html
> - 推荐参考文档：https://ts.xcatliu.com/introduction/what-is-typescript.html

## 1.1、搭建环境

1. 安装TypeScript：`tsc -V` 查看是否安装好

```bash
npm i -g typescript
```

2. 安装 ts-node

```bash
npm i -g ts-node
```

3. 初始化：创建一个 `tsconfig.json` 文件，并且将 `strict` 字段改为 `false`

```bash
tsc --init
```

4. 新建`index.ts`

```typescript
function sayHello(person: string) {
    return 'Hello, ' + person;
}

let user = 'Tom';
console.log(sayHello(user));
```

我们约定使用 TypeScript 编写的文件以 `.ts` 为后缀，用 TypeScript 编写 React 时，以 `.tsx` 为后缀。

5. 执行 `tsc index.js`

6. 这时候会生成一个编译好的文件 `index.js`：

```javascript
function sayHello(person) {
    return 'Hello, ' + person;
}
var user = 'Tom';
console.log(sayHello(user));
```

> 注意：因为我们安装了`ts-node`，所以我们可以直接使用命令`ts-node xx.ts`，这样就不会生成js，而是直接输出结果！

-  TypeScript 中，我们使用 `:` 指定变量的类型，`:` 的前后有没有空格都可以
-  上述例子中，我们用 `:` 指定 `person` 参数类型为 `string`。但是编译为 js 之后，并没有什么检查的代码被插入进来。
-  这是因为 **TypeScript 只会在编译时对类型进行静态检查，如果发现有错误，编译的时候就会报错**。而在运行时，与普通的 JavaScript 文件一样，不会对类型进行检查。

> 注意： **TypeScript 编译的时候即使报错了，还是会生成编译结果**，我们仍然可以使用这个编译之后的文件`index.js`



## 1.2、tsconfig.json

`tsconfig.json` 是 TypeScript 项目的配置文件。如果一个目录下存在一个 tsconfig.json 文件，那么往往意味着这个目录就是 TypeScript 项目的根目录。

- `tsconfig.json` 包含 TypeScript 编译的相关配置，通过更改编译配置项，我们可以让 TypeScript 编译出 ES6、ES5、node 的代码





## 1.3、重要字段

- `files` - 设置要编译的文件的名称
- `include` - 设置需要进行编译的文件，支持路径模式匹配
- `exclude ` -设置无需进行编译的文件，支持路径模式匹配
- `compilerOptions` - 设置与编译流程相关的选项
- `outDir` - 设置编辑的 js 文件的存放目录





## 1.4、compilerOptions选项

```json
{
  "compilerOptions": {
  
    /* 基本选项 */
    "target": "es5",                       // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES6'/'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
    "module": "commonjs",                  // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
    "lib": [],                             // 指定要包含在编译中的库文件
    "allowJs": true,                       // 允许编译 javascript 文件
    "checkJs": true,                       // 报告 javascript 文件中的错误
    "jsx": "preserve",                     // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react'
    "declaration": true,                   // 生成相应的 '.d.ts' 文件
    "sourceMap": true,                     // 生成相应的 '.map' 文件
    "outFile": "./",                       // 将输出文件合并为一个文件
    "outDir": "./",                        // 指定输出目录
    "rootDir": "./",                       // 用来控制输出目录结构 --outDir.
    "removeComments": true,                // 删除编译后的所有的注释
    "noEmit": true,                        // 不生成输出文件
    "importHelpers": true,                 // 从 tslib 导入辅助工具函数
    "isolatedModules": true,               // 将每个文件做为单独的模块 （与 'ts.transpileModule' 类似）.

    /* 严格的类型检查选项 */
    "strict": true,                        // 启用所有严格类型检查选项
    "noImplicitAny": true,                 // 在表达式和声明上有隐含的 any类型时报错
    "strictNullChecks": true,              // 启用严格的 null 检查
    "noImplicitThis": true,                // 当 this 表达式值为 any 类型的时候，生成一个错误
    "alwaysStrict": true,                  // 以严格模式检查每个模块，并在每个文件里加入 'use strict'

    /* 额外的检查 */
    "noUnusedLocals": true,                // 有未使用的变量时，抛出错误
    "noUnusedParameters": true,            // 有未使用的参数时，抛出错误
    "noImplicitReturns": true,             // 并不是所有函数里的代码都有返回值时，抛出错误
    "noFallthroughCasesInSwitch": true,    // 报告 switch 语句的 fallthrough 错误。（即，不允许 switch 的 case 语句贯穿）

    /* 模块解析选项 */
    "moduleResolution": "node",            // 选择模块解析策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6)
    "baseUrl": "./",                       // 用于解析非相对模块名称的基目录
    "paths": {},                           // 模块名到基于 baseUrl 的路径映射的列表
    "rootDirs": [],                        // 根文件夹列表，其组合内容表示项目运行时的结构内容
    "typeRoots": [],                       // 包含类型声明的文件列表
    "types": [],                           // 需要包含的类型声明文件名列表
    "allowSyntheticDefaultImports": true,  // 允许从没有设置默认导出的模块中默认导入。

    /* Source Map Options */
    "sourceRoot": "./",                    // 指定调试器应该找到 TypeScript 文件而不是源文件的位置
    "mapRoot": "./",                       // 指定调试器应该找到映射文件而不是生成文件的位置
    "inlineSourceMap": true,               // 生成单个 soucemaps 文件，而不是将 sourcemaps 生成不同的文件
    "inlineSources": true,                 // 将代码与 sourcemaps 生成到一个文件中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性

    /* 其他选项 */
    "experimentalDecorators": true,        // 启用装饰器
    "emitDecoratorMetadata": true          // 为装饰器提供元数据的支持
  }
}
```











# 2、原始数据类型

JavaScript 的类型分为两种：原始数据类型和对象类型

- 原始数据类型包括：布尔值、数值、字符串、`null`、`undefined` 以及 ES6 中的新类型 [`Symbol`](http://es6.ruanyifeng.com/#docs/symbol) 和 ES10 中的新类型 [`BigInt`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt)。

## 2.1、布尔值

- 在 TypeScript 中，使用 `boolean` 定义布尔值类型：

```typescript
let isDone: boolean = false;
```

- 注意：使用构造函数 `Boolean` 创造的对象**不是**布尔值：
  - 事实上 `new Boolean()` 返回的是一个 `Boolean` 对象，是一个对象：
  - 直接调用 `Boolean` 才可以返回一个 `boolean` 类型：

```typescript
// 报错,返回的是一个 Boolean 对象
// let createdByNewBoolean: boolean = new Boolean(1);

// 返回的是一个boolean类型
let createdByBoolean: boolean = Boolean(1);
```

## 2.2、数值

- 使用 `number` 定义数值类型：

```typescript
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
// ES6 中的二进制表示法
let binaryLiteral: number = 0b1010;
// ES6 中的八进制表示法
let octalLiteral: number = 0o744;

let notANumber: number = NaN;
let infinityNumber: number = Infinity;
```

- 编译结果

```javascript
var decLiteral = 6;
var hexLiteral = 0xf00d;
// ES6 中的二进制表示法
var binaryLiteral = 10;
// ES6 中的八进制表示法
var octalLiteral = 484;

var notANumber = NaN;
var infinityNumber = Infinity;
```

## 2.3、字符串

- 使用 `string` 定义字符串类型：

```typescript
let myName: string = 'Tom';
let myAge: number = 25;

// 模板字符串
let sentence: string = `Hello, my name is ${myName}.
I'll be ${myAge + 1} years old next month.`;
// Hello, my name is Tom.
// I'll be 26 years old next month.
```



> -  其中 ``` 用来定义 ES6中的模板字符串，` `${}` 用来在模板字符串中嵌入表达式



## 2.4、空值

JavaScript 没有空值（Void）的概念，在 TypeScript 中，可以用 `void` 表示没有任何返回值的函数：

```typescript
function alertName(): void {
    console.log('My name is Tom');
}
console.log(alertName()) // My name is Tom
```

声明一个 `void` 类型的变量没有什么用，因为你只能将它赋值为 `undefined` 和 `null`

```typescript
let unusable: void = undefined;
```





## 2.5、Null和Undefined

在 TypeScript 中，可以使用 `null` 和 `undefined` 来定义这两个原始数据类型：

```typescript
let u: undefined = undefined;
let n: null = null;
```

与 `void` 的区别是，`undefined` 和 `null` 是所有类型的子类型。就是说你可以把 `null` 和 `undefined` 赋值给其他类型。

```typescript
// null和undefined赋值给string
let str:string = "666";
str = null
str= undefined

// null和undefined赋值给number
let num:number = 666;
num = null
num= undefined

// null和undefined赋值给object
let obj:object ={};
obj = null
obj= undefined

// null和undefined赋值给Symbol
let sym: symbol = Symbol("me"); 
sym = null
sym= undefined

// null和undefined赋值给boolean
let isDone: boolean = false;
isDone = null
isDone= undefined

// null和undefined赋值给bigint
let big: bigint =  100n;
big = null
big= undefined
```

如果你在`tsconfig.json`指定了`"strictNullChecks":true` ，`null` 和 `undefined` 只能赋值给 `void` 和它们各自的类型。



## 2.6、number和bigint

虽然`number`和`bigint`都表示数字，但是这两个类型不兼容。

```typescript
let big: bigint =  100n;
let num: number = 6;
big = num;
num = big;
// 会抛出一个类型不兼容的 ts(2322) 错误
```



# 3、任意值

任意值（Any）用来表示属性为任意类型。如果是普通类型，在赋值过程中改变类型是不被允许的：

```typescript
let myFavoriteNumber: string = 'seven';
// 报错:error TS2322: Type 'number' is not assignable to type 'string'
myFavoriteNumber = 7;
```

但如果是`any`类型，则允许被赋值为任意类型。

```typescript
let myFavoriteNumber: any = 'seven';
myFavoriteNumber = 7;
```

## 3.1、任意值的属性

在任意值上访问任何属性都是允许的：

```typescript
let anyThing: any = 'hello';
console.log(anyThing.myName); // undefined
console.log(anyThing.myAge); // undefined
```





## 3.2、未声明类型的变量

**变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型**：

```typescript
let something;
something = 'seven';
something = 7;
```

等价于：

```typescript
let something: any;
something = 'seven';
something = 7;
```

在许多场景下，这太宽松了。使用 `any` 类型，可以很容易地编写类型正确但在运行时有问题的代码。如果我们使用 `any` 类型，就无法使用 TypeScript 提供的大量的保护机制。请记住，`any 是魔鬼！`尽量不要用any。

> 为了解决 `any` 带来的问题，TypeScript 3.0 引入了 `unknown` 类型。







## 3.3、unknown

`unknown`与`any`一样，所有类型都可以分配给`unknown`:

```typescript
let notSure: unknown = 4;
notSure = "maybe a string instead"; // OK
notSure = false; // OK
```

`unknown`与`any`的最大区别是：

- 任何类型的值可以赋值给`any`，同时`any`类型的值也可以赋值给任何类型。
- `unknown` 任何类型的值都可以赋值给它，但它只能赋值给`unknown`和`any`

```typescript
let notSure: unknown = 4;
let uncertain: any = notSure; // OK

let notSure: any = 4;
let uncertain: unknown = notSure; // OK

let notSure: unknown = 4;
let uncertain: number = notSure; // Error
```

如果不缩小类型，就无法对`unknown`类型执行任何操作，我们可以使用`typeof`、`类型断言`等方式来缩小未知范围：

```typescript
function getDogName() {
 let x: unknown;
 return x;
};
const dogName = getDogName();
// 直接使用
const upName = dogName.toLowerCase(); // Error
// typeof
if (typeof dogName === 'string') {
  const upName = dogName.toLowerCase(); // OK
}
// 类型断言 
const upName = (dogName as string).toLowerCase(); // OK
```







## 3.4、联合类型

- 联合类型表示取值可以为多种类型中的一种。
- 联合类型使用`|`分隔每个类型。

```typescript
// 允许myFavoriteNumber的类型是string或者number，但不能是其他类型
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;

let myFavoriteNumber: string | number;
myFavoriteNumber = true; // Error
```









# 4、接口

```typescript
interface Person {
    name: string;
    age: number;
}

let tom: Person = {
    name: 'Tom',
    age: 25
};
```

上面的例子中，我们定义了一个接口 `Person`，接着定义了一个变量 `tom`，它的类型是 `Person`。这样，我们就约束了 `tom` 的形状必须和接口 `Person` 一致

- 定义的变量比接口少了一些属性是不允许的，多一些属性也是不允许的

```typescript
interface Person {
    name: string;
    age: number;
}

// error:定义的变量比接口少了一些属性是不允许的：
let tom: Person = {
    name: 'Tom'
};

// error:多一些属性也是不允许的：
let zhangsan: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};
```

## 4.0、可选属性

有时我们希望不要完全匹配一个形状，那么可以用可选属性：

```typescript
interface Person {
    name: string;
    age?: number;
}

let tom: Person = {
    name: 'Tom'
};
```

```typescript
interface Person {
    name: string;
    age?: number;
}

let tom: Person = {
    name: 'Tom',
    age: 25
};
```









## 4.1、任意属性

我们在自定义类型的时候，有可能会希望一个接口允许有任意的属性，这时候 `任意属性` 就派上用场了。

任意属性有两种定义的方式：

1. 一种属性签名是 `string` 类型的
2. 另一种属性签名是 `number` 类型的。



### 4.1.1、String类型任意属性

第一种，属性签名是 `string`，比如对象的属性：

```typescript
interface A {
    [prop: string]: number;
}

const obj: A = {
    a: 1,
    b: 3,
};
```

- `[prop: string]: number` 的意思是，`A` 类型的对象可以有任意属性签名，`string` 指的是对象的键都是字符串类型的，`number` 则是指定了属性值的类型。
- `prop` 类似于函数的形参，是可以取其他名字的。



### 4.1.2、number类型任意属性

第二种，属性签名是 `number` 类型的，比如数组下标：

```typescript
interface B {
    [index: number]: string;
}

const arr: B = ['qxl'];
```

- `[index: number]: string` 的意思是，`B` 类型的数组可以有任意的数字下标，而且数组的成员的类型必须是 `string`。
- 同样的，`index` 也只是类似于函数形参的东西，用其他标识符也是完全可以的



### 4.1.3、同时定义两种任意属性

需要注意的是，一个接口可以同时定义这两种任意属性，但是 `number` 类型的签名指定的值类型必须是 `string` 类型的签名指定的值类型的子集，举个例子：

```typescript
interface C {
    [prop: string]: number;
    [index: number]: string;
}
```

上面定义是不成立的，因为 `index` 指定的值类型是 `string`，而 `prop` 指定的值类型是 `number`，`string` 并不是 `number` 的子集。

如果换成下面这样，定义就是成立的，因为 `Function` 是 `object` 的子集：

```typescript
interface C {
    [prop: string]: object;
    [index: number]: Function;
}
```



### 4.1.4、同时定义任意属性和其他类型的属性

另外还有一个需要注意的点，**一旦定义了任意属性，那么其他属性(确定属性、可选属性、只读属性等)的类型都必须是它的类型的子集**。

- 比如说我们想要一个 `Person` 接口，它有一个必选属性 `name` 和一个可选属性 `age`，另外还可以有其他 `string` 类型的任意属性签名。那么 `Person` 接口可能会被定义成这样：

```typescript
interface Person {
    name: string;
    age?: number;
    [prop: string]: string;
}
```

但其实这样子的定义是不成立的，因为 `[prop: string]: string` 的存在，规定了其他属性的类型也必须是 `string`，如果想要解决报错，我们可以使用联合类型：

```typescript
interface Person {
    name: string;
    age?: number;
    [prop: string]: string | number;
}
```







## 4.2、只读属性

有时候我们希望对象中的一些字段只能在创建的时候被赋值，那么可以用 `readonly` 定义只读属性：

```typescript
interface Person {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    id: 89757,
    name: 'Tom',
    gender: 'male'
};

// 使用 readonly 定义的属性 id 初始化后，又被赋值了，所以报错
tom.id = 9527;
```

**注意，只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候**。







# 5、Array数组









对数组类型的定义有两种方式：

- 方式一：最简单的方法是使用`[类型 + 方括号]`来表示数组：

```typescript
let arr:string[] = ["1","2"];

let arr1:number[] = [1,2]
```

- 方式二：泛型

```typescript
let arr2:Array<string> = ["1","2"];

let arr3: Array<number> = [1, 1, 2, 3, 5];
```

## 5.1、用接口表示数组

接口也可以用来描述数组：

```typescript
// NumberArray 表示：只要索引的类型是数字时，那么值的类型必须是数字
interface NumberArray {
    [index: number]: number;
}
let arr: NumberArray = [1, 1, 2, 3, 5];
```

虽然接口也可以用来描述数组，但是我们一般不会这么做，因为这种方式比前两种方式复杂多了。不过有一种情况例外，那就是它常用来表示**类数组**。





## 5.2、类数组

类数组（Array-like Object）不是数组类型，比如 `arguments`：

```typescript
function sum() {
    let args: number[] = arguments;
}
```

上例中，`arguments` 实际上是一个类数组，不能用普通的数组的方式来描述，而应该用接口：

```typescript
function sum() {
    let args: {
        [index: number]: number;
        length: number;
        callee: Function;
    } = arguments;
}
```

在这个例子中，我们除了约束当索引的类型是数字时，值的类型必须是数字之外，也约束了它还有 `length` 和 `callee` 两个属性。





## 5.3、any在数组中的应用

一个比较常见的做法是，用 `any` 表示数组中允许出现任意类型：

```typescript
let list: any[] = ['xcatliu', 25, { website: 'http://linxiaoqin.netlify.app' }];
```



# 6、函数

在 JavaScript 中，有两种常见的定义函数的方式：

1. 函数声明
2. 函数表达式

```typescript
// 函数声明（Function Declaration）
function sum(x, y) {
    return x + y;
}

// 函数表达式（Function Expression）
let mySum = function (x, y) {
    return x + y;
};
```

在TypeScript中，函数的类型声明，需要在声明函数时，给出**参数的类型和返回值的类型**

```typescript
function sum(x: number, y: number): number {
    return x + y;
}
```

如果变量被赋值为一个函数，变量的类型有两种写法。

```typescript
// 写法一
const hello = function (txt: string) {
  console.log("hello " + txt);
};

// 写法二
const hello: (txt: string) => void = function (txt) {
  console.log("hello " + txt);
};
```

上面示例中，变量`hello`被赋值为一个函数，它的类型有两种写法。写法一是通过等号右边的函数类型，推断出变量`hello`的类型；写法二则是使用箭头函数的形式，为变量`hello`指定类型，**参数的类型写在箭头左侧，返回值的类型写在箭头右侧。**

写法二有两个地方需要注意：

- 首先，函数的参数要放在圆括号里面，不放会报错。
- 其次，类型里面的参数名（本例是`txt`）是必须的。

函数类型里面的参数名与实际参数名，可以不一致。

```typescript
let f: (x: number) => number;

f = function (y: number) {
  return y;
};
```

上面示例中，函数类型里面的参数名为`x`，实际的函数定义里面，参数名为`y`，两者并不相同。

如果函数的类型定义很冗长，或者多个函数使用同一种类型，写法二用起来就很麻烦。因此，往往用`type`命令为函数类型定义一个别名，便于指定给其他变量。

```typescript
type MyFunc = (txt: string) => void;

const hello: MyFunc = function (txt) {
  console.log("hello " + txt);
};
```

上面示例中，`type`命令为函数类型定义了一个别名`MyFunc`，后面使用就很方便，变量可以指定为这个类型。

函数的实际参数个数，可以少于类型指定的参数个数，但是不能多于，即 TypeScript 允许省略参数。

```typescript
let myFunc: (a: number, b: number) => number;

myFunc = (a: number) => a; // 正确

myFunc = (a: number, b: number, c: number) => a + b + c; // 报错
```

上面示例中，变量`myFunc`的类型只能接受两个参数，如果被赋值为只有一个参数的函数，并不报错。但是，被赋值为有三个参数的函数，就会报错。



## 6.1、可选参数

与接口中的可选属性类似，我们用 `?` 表示可选的参数：

```typescript
function buildName(firstName: string, lastName?: string) {
    if (lastName) {
        return firstName + ' ' + lastName;
    } else {
        return firstName;
    }
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');
```

需要注意的是，可选参数必须接在必需参数后面。换句话说，**可选参数后面不允许再出现必需参数了**。





## 6.2、参数默认值

在 ES6 中，我们允许给函数的参数添加默认值，**TypeScript 会将添加了默认值的参数识别为可选参数**：

```typescript
function buildName(firstName: string, lastName: string = 'Cat') {
    return firstName + ' ' + lastName;
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');
```

## 6.3、剩余参数

ES6 中，可以使用 `...rest` 的方式获取函数中的剩余参数（rest 参数）：

```typescript
function push(array, ...items) {
    items.forEach(function(item) {
        array.push(item);
    });
}

let a: any[] = [];
push(a, 1, 2, 3);
```

事实上，`items` 是一个数组。所以我们可以用数组的类型来定义它：



```typescript
function push(array: any[], ...items: any[]) {
    items.forEach(function(item) {
        array.push(item);
    });
}

let a = [];
push(a, 1, 2, 3);
```



## 6.4、只读参数

如果函数内部不能修改某个参数，可以在函数定义时，在参数类型前面加上`readonly`关键字，表示这是只读参数。

```typescript
function arraySum(arr: readonly number[]) {
  // ...
  arr[0] = 0; // 报错
}
```

上面示例中，参数`arr`的类型是`readonly number[]`，表示为只读参数。如果函数体内部修改这个数组，就会报错。





## 6.5、局部类型

函数内部允许声明其他类型，该类型只在函数内部有效，称为局部类型。

```typescript
function hello(txt: string) {
  type message = string;
  let newTxt: message = "hello " + txt;
  return newTxt;
}

const newTxt: message = hello("world"); // 报错
```

上面示例中，类型`message`是在函数`hello()`内部定义的，只能在函数内部使用。在函数外部使用，就会报错。







# 7、类型断言









