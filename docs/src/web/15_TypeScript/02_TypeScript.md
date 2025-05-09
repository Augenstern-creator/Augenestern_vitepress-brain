# 1、类型别名

类型别名用来给一个类型起个新名字。使用 `type` 创建类型别名

```typescript
// 给String类型起别名为s
type s = String;
let str1: s = "123";


let all: string|number|boolean
let a: all = 123
let b: all = true
```

类型别名常用于联合类型。

# 2、字符串字面量类型

字符串字面量类型用来约束取值只能是某几个字符串中的一个。

```typescript
let name = "张三" | "张三丰" | "张大炮"
let a: name = "张三"
```

上例中，我们使用 `type` 定了一个字符串字面量类型`name`，它只能取三种字符串中的一种。

> 注意，**类型别名与字符串字面量类型都是使用 `type` 进行定义。**



# 3、元组

数组合并了相同类型的对象，而元组（Tuple）合并了不同类型的对象。例如定义一对值分别为 `string` 和 `number` 的元组：

```typescript
// 需要按照顺序
let tom: [string, number] = ['Tom', 25];
// 给元组添加内容(不用按照顺序)
tom.push(15888888);
tom.push("秦");
```



# 4、枚举

枚举（Enum）类型用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等。枚举使用 `enum` 关键字来定义：

```typescript
enum Color {
  Red, // 0
  Green, // 1
  Blue, // 2
}
```

上面示例声明了一个 Enum 结构`Color`，里面包含三个成员`Red`、`Green`和`Blue`。第一个成员的值默认为整数`0`，第二个为`1`，第二个为`2`，以此类推。

使用时，调用 Enum 的某个成员，与调用对象属性的写法一样，可以使用点运算符，也可以使用方括号运算符。

```typescript
let c = Color.Green; // 1
// 等同于
let c = Color["Green"]; // 1
```



枚举成员会被赋值为从 `0` 开始递增的数字，同时也会对枚举值到枚举名进行反向映射：

```typescript
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};

console.log(Days["Sun"] === 0); // true
console.log(Days["Mon"] === 1); // true
console.log(Days["Tue"] === 2); // true
console.log(Days["Sat"] === 6); // true

console.log(Days[0] === "Sun"); // true
console.log(Days[1] === "Mon"); // true
console.log(Days[2] === "Tue"); // true
console.log(Days[6] === "Sat"); // true
```





# 5、类

## 5.1、public private protected

TypeScript 可以使用三种访问修饰符，分别是 `public`、`private` 和 `protected`。

- `public` 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 `public` 的
- `private` 修饰的属性或方法是私有的，不能在声明它的类的外部访问
- `protected` 修饰的属性或方法是受保护的，它和 `private` 类似，区别是它在子类中也是允许被访问的

```typescript
class Animal {
  public name;
  // 构造函数,创建类的时候会自动调用  
  public constructor(name) {
    this.name = name;
  }
}

let a = new Animal('Jack');
console.log(a.name); // Jack
a.name = 'Tom';
console.log(a.name); // Tom
```

上面的例子中，`name` 被设置为了 `public`，所以直接访问实例的 `name` 属性是允许的。很多时候，我们希望有的属性是无法直接存取的，这时候就可以用 `private` 了：

```typescript
class Animal {
  private name;
  public constructor(name) {
    this.name = name;
  }
}

let a = new Animal('Jack');
console.log(a.name); // error
```

当构造函数修饰为 `private` 时，该类不允许被继承或者实例化：

```typescript
class Animal {
  public name;
  private constructor(name) {
    this.name = name;
  }
}
class Cat extends Animal {
  constructor(name) {
    super(name);
  }
}

let a = new Animal('Jack');
```

当构造函数修饰为 `protected` 时，该类只允许被继承。



## 5.2、readonly

只读属性关键字，只允许出现在属性声明或索引签名或构造函数中。

```typescript
class Animal {
  readonly name;
  public constructor(name) {
    this.name = name;
  }
}

let a = new Animal('Jack');
console.log(a.name); // Jack
a.name = 'Tom'; // error
```



## 5.3、抽象类

`abstract` 用于定义抽象类和其中的抽象方法

```typescript
abstract class Animal {
  public name;
  public constructor(name) {
    this.name = name;
  }
  public abstract sayHi();
}

class Cat extends Animal {
  public sayHi() {
    console.log(`Meow, My name is ${this.name}`);
  }
}

let cat = new Cat('Tom');
```

- 抽象类是不允许被实例化的
- 抽象类中的抽象方法必须被子类实现

给类加上 TypeScript 的类型很简单，与接口类似：

```typescript
class Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  sayHi(): string {
    return `My name is ${this.name}`;
  }
}

let a: Animal = new Animal('Jack');
console.log(a.sayHi()); // My name is Jack
```

## 5.4、静态成员

类的内部可以使用`static`关键字，定义静态成员。静态成员是只能通过类本身使用的成员，不能通过实例对象使用。

```typescript
class MyClass {
  static x = 0;
  static printX() {
    console.log(MyClass.x);
  }
}

MyClass.x; // 0
MyClass.printX(); // 0
```

上面示例中，`x`是静态属性，`printX()`是静态方法。它们都必须通过`MyClass`获取，而不能通过实例对象调用。

`static`关键字前面可以使用 public、private、protected 修饰符。

```typescript
class MyClass {
  private static x = 0;
}

MyClass.x; // 报错
```

上面示例中，静态属性`x`前面有`private`修饰符，表示只能在`MyClass`内部使用，如果在外部调用这个属性就会报错。



## 5.5、类实现接口

实现（implements）是面向对象中的一个重要概念。一般来讲，一个类只能继承自另一个类，有时候不同类之间可以有一些共有的特性，这时候就可以把特性提取成接口（interfaces），用 `implements` 关键字来实现。这个特性大大提高了面向对象的灵活性。



一个类可以实现多个接口：

```typescript
interface Alarm {
    alert(): void;
}

interface Light {
    lightOn(): void;
    lightOff(): void;
}

class Car implements Alarm, Light {
    alert() {
        console.log('Car alert');
    }
    lightOn() {
        console.log('Car light on');
    }
    lightOff() {
        console.log('Car light off');
    }
}
```

上例中，`Car` 实现了 `Alarm` 和 `Light` 接口，既能报警，也能开关车灯。



## 5.6、接口继承接口

接口与接口之间可以是继承关系：

```typescript
interface Alarm {
    alert(): void;
}

interface LightableAlarm extends Alarm {
    lightOn(): void;
    lightOff(): void;
}
```

这很好理解，`LightableAlarm` 继承了 `Alarm`，除了拥有 `alert` 方法之外，还拥有两个新方法 `lightOn` 和 `lightOff`。





## 5.7、接口继承类

常见的面向对象语言中，接口是不能继承类的，但是在 TypeScript 中却是可以的：

```typescript
class Point {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

interface Point3d extends Point {
    z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};
```





# 6、泛型

泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。

```typescript
function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray<string>(3, 'x'); // ['x', 'x', 'x']
```

上例中，我们在函数名后添加了 `<T>`，其中 `T` 用来指代任意输入的类型，在后面的输入 `value: T` 和输出 `Array<T>` 中即可使用了。接着在调用的时候，可以指定它具体的类型为 `string`。

## 6.1、多个类型参数

定义泛型的时候，可以一次定义多个类型参数：

```typescript
function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]];
}

swap([7, 'seven']); // ['seven', 7]
```

上例中，我们定义了一个 `swap` 函数，用来交换输入的元组。





## 6.2、泛型约束

在函数内部使用泛型变量的时候，由于事先不知道它是哪种类型，所以不能随意的操作它的属性或方法：

```typescript
function loggingIdentity<T>(arg: T): T {
    // error
    console.log(arg.length);
    return arg;
}
```

上例中，泛型 `T` 不一定包含属性 `length`，所以编译的时候报错了。

这时，我们可以对泛型进行约束，只允许这个函数传入那些包含 `length` 属性的变量。这就是泛型约束：

```typescript
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}
```

上例中，我们使用了 `extends` 约束了泛型 `T` 必须符合接口 `Lengthwise` 的形状，也就是必须包含 `length` 属性。



## 6.3、泛型接口

可以使用含有泛型的接口来定义函数的形状：

```typescript
interface CreateArrayFunc<T> {
    (length: number, value: T): Array<T>;
}
```

## 6.4、泛型类

与泛型接口类似，泛型也可以用于类的类型定义中：

```typescript
// 泛型数字类
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

// 新创建泛型数字类,给泛型的类型是 number
let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { 
    return x + y; 
};
```

## 6.5、泛型参数的默认类型

在 TypeScript 2.3 以后，我们可以为泛型中的类型参数指定默认类型。当使用泛型时没有在代码中直接指定类型参数，从实际值参数中也无法推测出时，这个默认类型就会起作用。

```typescript
function createArray<T = string>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
```































