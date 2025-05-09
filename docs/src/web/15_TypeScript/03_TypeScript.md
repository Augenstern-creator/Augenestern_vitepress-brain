# 1、模块

任何包含 import 或 export 语句的文件，就是一个模块（module）。相应地，如果文件不包含 export 语句，就是一个全局的脚本文件。

- **模块本身就是一个作用域，不属于全局作用域。**
- **模块内部的变量、函数、类只在内部可见，对于模块外部是不可见的。**
- **暴露给外部的接口，必须用 export 命令声明；如果其他文件要使用模块的接口，必须用 import 命令来输入。**



```typescript
type Bool = true | false;

export { Bool };
```

上面示例中，当前脚本输出一个类型别名`Bool`。假定上面的模块文件为`a.ts`，另一个文件`b.ts`就可以使用 import 语句，输入这个类型。

```typescript
import { Bool } from "./a";

let foo: Bool = true;
```

上面示例中，import 语句加载的是一个类型。注意，加载文件写成`./a`，没有写脚本文件的后缀名。TypeScript 允许加载模块时，省略模块文件的后缀名，它会自动定位，将`./a`定位到`./a.ts`。



## 1.1、import type 语句

import 在一条语句中，可以同时输入类型和正常接口。

```typescript
// a.ts
export interface A {
  foo: string;
}

export let a = 123;

// b.ts
import { A, a } from "./a";
```

上面示例中，文件`a.ts`的 export 语句输出了一个类型`A`和一个正常接口`a`，另一个文件`b.ts`则在同一条语句中输入了类型和正常接口。



这样很不利于区分类型和正常接口，容易造成混淆。为了解决这个问题，TypeScript 引入了解决方法。

- 使用`import type` 语句引入类型
- 使用`import`语句引入接口

```typescript
// 引入类型
import type { A } from "./a";

// 引入接口
import { a } from "./a";
```

同样的，export 语句

- 使用`export type` 语句输出类型
- 使用`export`语句输出接口

```typescript
type A = "a";
type B = "b";

// 输出类型
export type { A, B };
```

下面是 export type 将一个类作为类型输出的例子

```typescript
class Point {
  x: number;
  y: number;
}

// 由于使用了 export type 语句，输出的并不是 Point 这个类，而是 Point 代表的实例类型
export type { Point };
```

由于使用了 export type 语句，输出的并不是 Point 这个类，而是 Point 代表的实例类型。输入时，只能作为类型输入。

```typescript
import type { Point } from "./module";

const p: Point = { 
    x: 0, 
    y: 0 
};
```

上面示例中，`Point`只能作为类型输入，不能当作正常接口使用。



## 1.2、CommonJS模块

### 1.2.1、`import=` 语句

TypeScript 使用`import =`语句输入 CommonJS 模块。

```typescript
import fs = require("fs");
const code = fs.readFileSync("hello.ts", "utf8");
```

上面示例中，使用`import =`语句和`require()`命令输入了一个 CommonJS 模块。模块本身的用法跟 Node.js 是一样的。

除了使用`import =`语句，TypeScript 还允许使用`import * as [接口名] from "模块文件"`输入 CommonJS 模块。

```typescript
import * as fs from "fs";
// 等同于
import fs = require("fs");
```

### 1.2.2、`export=`语句

ypeScript 使用`export =`语句，输出 CommonJS 模块的对象，等同于 CommonJS 的`module.exports`对象。

```typescript
let obj = { 
    foo: 123 
};

export = obj;
```

`export = `语句输出的对象，只能使用`import =`语句加载。

```typescript
import obj = require("./a");

console.log(obj.foo); // 123
```





# 2、declare关键字





















